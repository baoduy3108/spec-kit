"""✦ LUMINA AI — Engine chung cho mọi API tương thích OpenAI.

DeepSeek, Groq, Ollama và OpenAI đều dùng chung chuẩn `/chat/completions`,
nên một lớp duy nhất phục vụ được cả bốn — chỉ khác base_url + model + key.
Đây là các bộ não MIỄN PHÍ / RẺ mà LUMINA tụt xuống khi hết lượt cao cấp.

Có streaming thật (SSE). Không có web search riêng → khi cần tìm kiếm sẽ chèn
kết quả Tavily/DuckDuckGo vào ngữ cảnh (giống khung mẫu PHẦN 10).
"""

import json
import logging
from typing import AsyncIterator

import httpx

from ..config import CONFIG
from ..schemas import RouteDecision
from ..search.engines import web_search
from .base import BaseEngine, EngineError

logger = logging.getLogger("lumina.oai")


class OpenAICompatibleEngine(BaseEngine):
    """Cấu hình qua thuộc tính lớp con: name, base_url, model, api_key, is_local."""

    base_url = ""
    model = ""
    api_key = ""
    is_local = False  # Ollama chạy nội bộ — không cần key
    extra_headers: dict = {}  # header phụ (ví dụ OpenRouter khuyến nghị Referer/Title)

    def available(self) -> bool:
        if self.is_local:
            return bool(self.base_url)
        return bool(self.api_key and self.base_url)

    async def stream_chat(
        self, messages: list[dict], route: RouteDecision, system: str
    ) -> AsyncIterator[dict]:
        chat_messages = [{"role": "system", "content": system}]
        chat_messages += [{"role": m["role"], "content": m["content"]} for m in messages]

        citations: list[dict] = []
        if route.use_web_search and messages:
            results = await web_search(messages[-1]["content"][:300])
            if results:
                context = "\n".join(f"- {r.title} ({r.url}): {r.snippet}" for r in results)
                chat_messages.insert(1, {
                    "role": "system",
                    "content": f"Kết quả tìm kiếm web (dùng để trả lời, trích nguồn khi phù hợp):\n{context}",
                })
                citations = [{"title": r.title, "url": r.url} for r in results if r.url]
                yield {"type": "search_status", "tool": "web_search", "query": messages[-1]["content"][:80]}

        # Code/phân tích/nghiên cứu cần output dài hơn để không bị cắt cụt giữa chừng.
        max_out = 16384 if route.mode in ("deep", "apex", "search", "research") else 8192
        payload = {
            "model": self.model,
            "messages": chat_messages,
            "max_tokens": max_out,
            "stream": True,
        }
        headers = dict(self.extra_headers)
        if self.api_key:
            headers["Authorization"] = f"Bearer {self.api_key}"

        got_text = False
        try:
            async with httpx.AsyncClient(timeout=120) as client:
                async with client.stream(
                    "POST", f"{self.base_url}/chat/completions", headers=headers, json=payload
                ) as resp:
                    if resp.status_code in (401, 403):
                        raise EngineError(f"Khóa API của bộ não '{self.name}' không hợp lệ.", retryable=False)
                    if resp.status_code >= 400:
                        body = (await resp.aread()).decode(errors="ignore")[:200]
                        logger.error("%s HTTP %s: %s", self.name, resp.status_code, body)
                        raise EngineError(f"Bộ não '{self.name}' gặp lỗi ({resp.status_code}).")
                    async for line in resp.aiter_lines():
                        if not line.startswith("data:"):
                            continue
                        data_str = line[5:].strip()
                        if data_str == "[DONE]":
                            break
                        try:
                            chunk = json.loads(data_str)
                        except json.JSONDecodeError:
                            continue
                        delta = (chunk.get("choices") or [{}])[0].get("delta", {})
                        piece = delta.get("content")
                        if piece:
                            got_text = True
                            yield {"type": "text", "text": piece}
        except EngineError:
            raise
        except httpx.HTTPError:
            raise EngineError(f"Không kết nối được tới bộ não '{self.name}'.")

        if not got_text:
            raise EngineError(f"Bộ não '{self.name}' trả về nội dung rỗng.")

        if citations:
            yield {"type": "citations", "items": citations}
        yield {"type": "final", "usage": {}, "stop_reason": "end_turn"}


class DeepSeekEngine(OpenAICompatibleEngine):
    name = "deepseek"

    def __init__(self):
        super().__init__()
        self.base_url = CONFIG["DEEPSEEK_BASE_URL"]
        self.model = CONFIG["DEEPSEEK_MODEL"]
        self.api_key = CONFIG["DEEPSEEK_API_KEY"]


class GroqEngine(OpenAICompatibleEngine):
    name = "groq"

    def __init__(self):
        super().__init__()
        self.base_url = CONFIG["GROQ_BASE_URL"]
        self.model = CONFIG["GROQ_MODEL"]
        self.api_key = CONFIG["GROQ_API_KEY"]


class OllamaEngine(OpenAICompatibleEngine):
    name = "ollama"
    is_local = True

    def __init__(self):
        super().__init__()
        self.base_url = CONFIG["OLLAMA_BASE_URL"].rstrip("/")
        self.model = CONFIG["OLLAMA_MODEL"]
        self.api_key = ""


class OpenRouterEngine(OpenAICompatibleEngine):
    name = "openrouter"

    def __init__(self):
        super().__init__()
        self.base_url = CONFIG["OPENROUTER_BASE_URL"]
        self.model = CONFIG["OPENROUTER_MODEL"]
        self.api_key = CONFIG["OPENROUTER_API_KEY"]
        # OpenRouter khuyến nghị (không bắt buộc) gửi 2 header này
        self.extra_headers = {
            "HTTP-Referer": "https://lumina-ai.app",
            "X-Title": CONFIG["APP_NAME"],
        }


class OpenAIEngine(OpenAICompatibleEngine):
    name = "openai"

    def __init__(self):
        super().__init__()
        self.base_url = CONFIG["OPENAI_BASE_URL"]
        self.model = CONFIG["OPENAI_MODEL"]
        self.api_key = CONFIG["OPENAI_API_KEY"]
