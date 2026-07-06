"""✦ LUMINA AI — Claude engine (bộ não chính).

Khác với khung mẫu (gọi httpx thô, model cũ, streaming giả lập), engine này:
- Dùng SDK chính thức `anthropic` (AsyncAnthropic)
- Adaptive thinking (`{"type": "adaptive", "display": "summarized"}`) —
  KHÔNG gửi temperature/top_p/top_k (model 4.7+ trả 400)
- Web search + web fetch server-side (`web_search_20260209` / `web_fetch_20260209`)
  chạy trên hạ tầng Anthropic, trả trích dẫn nguồn
- Streaming thật token-by-token, kèm sự kiện thinking / search / citations
- Xử lý pause_turn (server tool chạy nhiều vòng) và refusal (Fable 5),
  Fable 5 bật server-side fallbacks sang Opus 4.8
"""

import json
import logging
from typing import AsyncIterator

import anthropic

from ..config import CONFIG
from ..schemas import RouteDecision
from .base import BaseEngine, EngineError

logger = logging.getLogger("lumina.claude")

# Model không hỗ trợ adaptive thinking / effort
_NO_THINKING_MODELS = {CONFIG["CLAUDE_MODEL_FAST"]}  # haiku-4-5

_WEB_TOOLS = [
    {"type": "web_search_20260209", "name": "web_search", "max_uses": 8},
    {"type": "web_fetch_20260209", "name": "web_fetch", "max_uses": 8},
]


class ClaudeEngine(BaseEngine):
    name = "claude"

    def __init__(self):
        super().__init__()
        self._client: anthropic.AsyncAnthropic | None = None

    def available(self) -> bool:
        return bool(CONFIG["ANTHROPIC_API_KEY"])

    def _get_client(self) -> anthropic.AsyncAnthropic:
        if self._client is None:
            self._client = anthropic.AsyncAnthropic(api_key=CONFIG["ANTHROPIC_API_KEY"])
        return self._client

    def _build_params(self, messages: list[dict], route: RouteDecision, system: str) -> dict:
        is_fable = route.model == CONFIG["CLAUDE_MODEL_APEX"]
        params: dict = {
            "model": route.model,
            "max_tokens": 64000 if route.mode in ("deep", "apex", "search") else 16000,
            "system": system,
            "messages": messages,
        }
        if route.model not in _NO_THINKING_MODELS:
            params["thinking"] = {"type": "adaptive", "display": "summarized"}
        if route.effort and route.model not in _NO_THINKING_MODELS:
            params["output_config"] = {"effort": route.effort}
        if route.use_web_search:
            params["tools"] = _WEB_TOOLS
        if is_fable:
            # Fable 5: classifier có thể từ chối — tự động cứu bằng Opus 4.8
            params["betas"] = ["server-side-fallback-2026-06-01"]
            params["fallbacks"] = [{"model": CONFIG["CLAUDE_MODEL_DEEP"]}]
        return params

    async def stream_chat(
        self, messages: list[dict], route: RouteDecision, system: str
    ) -> AsyncIterator[dict]:
        client = self._get_client()
        is_fable = route.model == CONFIG["CLAUDE_MODEL_APEX"]
        convo = list(messages)
        continuations = 0

        try:
            while True:
                params = self._build_params(convo, route, system)
                streamer = (client.beta.messages if is_fable else client.messages).stream(**params)

                # Gom input JSON của server_tool_use để đọc câu truy vấn tìm kiếm
                tool_inputs: dict[int, dict] = {}

                async with streamer as stream:
                    async for event in stream:
                        etype = getattr(event, "type", "")
                        if etype == "content_block_start":
                            block = event.content_block
                            if getattr(block, "type", "") == "server_tool_use":
                                tool_inputs[event.index] = {"name": block.name, "json": ""}
                        elif etype == "content_block_delta":
                            delta = event.delta
                            dtype = getattr(delta, "type", "")
                            if dtype == "thinking_delta" and delta.thinking:
                                yield {"type": "thinking", "text": delta.thinking}
                            elif dtype == "text_delta" and delta.text:
                                yield {"type": "text", "text": delta.text}
                            elif dtype == "input_json_delta" and event.index in tool_inputs:
                                tool_inputs[event.index]["json"] += delta.partial_json or ""
                        elif etype == "content_block_stop" and event.index in tool_inputs:
                            info = tool_inputs.pop(event.index)
                            query = ""
                            try:
                                query = json.loads(info["json"] or "{}").get("query", "") or \
                                        json.loads(info["json"] or "{}").get("url", "")
                            except (json.JSONDecodeError, AttributeError):
                                pass
                            yield {
                                "type": "search_status",
                                "tool": info["name"],
                                "query": query,
                            }

                    final = await stream.get_final_message()

                # Trích dẫn nguồn từ kết quả web search
                citations = _extract_citations(final)
                if citations:
                    yield {"type": "citations", "items": citations}

                if final.stop_reason == "refusal":
                    yield {
                        "type": "error",
                        "message": "LUMINA từ chối trả lời câu hỏi này vì lý do an toàn. Hãy thử diễn đạt lại.",
                    }
                    return

                if final.stop_reason == "pause_turn" and continuations < CONFIG["MAX_PAUSE_TURN_CONTINUATIONS"]:
                    # Server tool cần thêm vòng xử lý — gửi lại để tiếp tục
                    continuations += 1
                    convo = list(messages) + [{"role": "assistant", "content": final.content}]
                    continue

                usage = getattr(final, "usage", None)
                yield {
                    "type": "final",
                    "usage": {
                        "input_tokens": getattr(usage, "input_tokens", 0),
                        "output_tokens": getattr(usage, "output_tokens", 0),
                    },
                    "stop_reason": final.stop_reason,
                }
                return

        except anthropic.AuthenticationError:
            raise EngineError("API key Claude không hợp lệ — kiểm tra ANTHROPIC_API_KEY.", retryable=False)
        except anthropic.PermissionDeniedError:
            raise EngineError("API key Claude không có quyền dùng model này.", retryable=False)
        except anthropic.NotFoundError:
            raise EngineError("Model Claude không tồn tại — kiểm tra cấu hình.", retryable=False)
        except anthropic.RateLimitError:
            raise EngineError("Claude đang quá tải lượt gọi — thử lại sau ít phút.")
        except anthropic.APIStatusError as exc:
            logger.error("Claude APIStatusError %s: %s", exc.status_code, exc.message)
            raise EngineError(f"Claude gặp lỗi máy chủ ({exc.status_code}).")
        except anthropic.APIConnectionError:
            raise EngineError("Không kết nối được tới Claude — kiểm tra mạng máy chủ.")


def _extract_citations(message) -> list[dict]:
    """Lấy danh sách nguồn từ các block web_search_tool_result (và citations trên text)."""
    items: list[dict] = []
    seen: set[str] = set()
    for block in getattr(message, "content", []) or []:
        btype = getattr(block, "type", "")
        if btype == "web_search_tool_result":
            content = getattr(block, "content", None)
            # content là list khi thành công, là object lỗi khi thất bại
            if isinstance(content, list):
                for result in content:
                    url = getattr(result, "url", "") or ""
                    title = getattr(result, "title", "") or url
                    if url and url not in seen:
                        seen.add(url)
                        items.append({"title": title, "url": url})
        elif btype == "text":
            for cit in getattr(block, "citations", None) or []:
                url = getattr(cit, "url", "") or ""
                title = getattr(cit, "title", "") or getattr(cit, "cited_text", "")[:80] or url
                if url and url not in seen:
                    seen.add(url)
                    items.append({"title": title, "url": url})
    return items[:10]
