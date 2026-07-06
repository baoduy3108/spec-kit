"""✦ LUMINA AI — Gemini engine (dự phòng, tùy chọn — kế thừa PHẦN 9 khung mẫu).

Chỉ hoạt động khi có GEMINI_API_KEY. Dùng Google Search grounding khi cần
tìm kiếm. Là engine dự phòng nên trả lời một lần (không stream chi tiết) —
nội dung được đẩy về client thành một khối.
"""

import logging
from typing import AsyncIterator

import httpx

from ..config import CONFIG
from ..schemas import RouteDecision
from .base import BaseEngine, EngineError

logger = logging.getLogger("lumina.gemini")

_BASE = "https://generativelanguage.googleapis.com/v1beta/models"


class GeminiEngine(BaseEngine):
    name = "gemini"

    def available(self) -> bool:
        return bool(CONFIG["GEMINI_API_KEY"])

    async def stream_chat(
        self, messages: list[dict], route: RouteDecision, system: str
    ) -> AsyncIterator[dict]:
        contents = [
            {"role": "user" if m["role"] == "user" else "model", "parts": [{"text": m["content"]}]}
            for m in messages
        ]
        payload: dict = {
            "contents": contents,
            "systemInstruction": {"parts": [{"text": system}]},
            "generationConfig": {"maxOutputTokens": 8192},
        }
        if route.use_web_search:
            payload["tools"] = [{"google_search": {}}]  # Search grounding

        url = f"{_BASE}/{CONFIG['GEMINI_MODEL']}:generateContent?key={CONFIG['GEMINI_API_KEY']}"
        try:
            async with httpx.AsyncClient(timeout=120) as client:
                resp = await client.post(url, json=payload)
                resp.raise_for_status()
                data = resp.json()
        except httpx.HTTPStatusError as exc:
            logger.error("Gemini HTTP %s: %s", exc.response.status_code, exc.response.text[:300])
            raise EngineError(f"Gemini gặp lỗi ({exc.response.status_code}).")
        except httpx.HTTPError:
            raise EngineError("Không kết nối được tới Gemini.")

        candidates = data.get("candidates") or []
        if not candidates:
            raise EngineError("Gemini không trả về kết quả.")
        parts = candidates[0].get("content", {}).get("parts", [])
        text = "".join(p.get("text", "") for p in parts)
        if not text:
            raise EngineError("Gemini trả về nội dung rỗng.")

        yield {"type": "text", "text": text}

        # Trích dẫn từ grounding metadata (nếu có)
        grounding = candidates[0].get("groundingMetadata", {})
        chunks = grounding.get("groundingChunks", [])
        citations = []
        for chunk in chunks[:10]:
            web = chunk.get("web", {})
            if web.get("uri"):
                citations.append({"title": web.get("title", web["uri"]), "url": web["uri"]})
        if citations:
            yield {"type": "citations", "items": citations}

        usage = data.get("usageMetadata", {})
        yield {
            "type": "final",
            "usage": {
                "input_tokens": usage.get("promptTokenCount", 0),
                "output_tokens": usage.get("candidatesTokenCount", 0),
            },
            "stop_reason": "end_turn",
        }
