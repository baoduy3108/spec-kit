"""✦ LUMINA AI — OpenAI engine (dự phòng cuối, tùy chọn — kế thừa PHẦN 10 khung mẫu).

"Ổn định như ChatGPT": retry + backoff sẵn trong lớp gọi. Không có web search
riêng nên khi cần tìm kiếm sẽ chèn kết quả Tavily/DuckDuckGo vào ngữ cảnh.
"""

import asyncio
import logging
from typing import AsyncIterator

import httpx

from ..config import CONFIG
from ..schemas import RouteDecision
from ..search.engines import web_search
from .base import BaseEngine, EngineError

logger = logging.getLogger("lumina.openai")


class OpenAIEngine(BaseEngine):
    name = "openai"

    def available(self) -> bool:
        return bool(CONFIG["OPENAI_API_KEY"])

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
                chat_messages.append({
                    "role": "system",
                    "content": f"Kết quả tìm kiếm web (dùng để trả lời, trích nguồn khi phù hợp):\n{context}",
                })
                citations = [{"title": r.title, "url": r.url} for r in results if r.url]
                yield {"type": "search_status", "tool": "web_search", "query": messages[-1]["content"][:80]}

        payload = {
            "model": CONFIG["OPENAI_MODEL"],
            "messages": chat_messages,
            "max_tokens": 8192,
        }
        headers = {"Authorization": f"Bearer {CONFIG['OPENAI_API_KEY']}"}

        last_error: Exception | None = None
        for attempt in range(3):
            try:
                async with httpx.AsyncClient(timeout=120) as client:
                    resp = await client.post(
                        "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
                    )
                    resp.raise_for_status()
                    data = resp.json()
                break
            except httpx.HTTPStatusError as exc:
                if exc.response.status_code in (401, 403):
                    raise EngineError("API key OpenAI không hợp lệ.", retryable=False)
                last_error = exc
            except httpx.HTTPError as exc:
                last_error = exc
            await asyncio.sleep(2 ** attempt)
        else:
            logger.error("OpenAI thất bại sau retry: %s", last_error)
            raise EngineError("OpenAI không phản hồi sau nhiều lần thử.")

        choice = (data.get("choices") or [{}])[0]
        text = (choice.get("message") or {}).get("content") or ""
        if not text:
            raise EngineError("OpenAI trả về nội dung rỗng.")

        yield {"type": "text", "text": text}
        if citations:
            yield {"type": "citations", "items": citations}
        usage = data.get("usage", {})
        yield {
            "type": "final",
            "usage": {
                "input_tokens": usage.get("prompt_tokens", 0),
                "output_tokens": usage.get("completion_tokens", 0),
            },
            "stop_reason": choice.get("finish_reason", "stop"),
        }
