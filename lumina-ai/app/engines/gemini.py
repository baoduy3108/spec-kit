"""✦ LUMINA AI — Gemini engine (dự phòng, tùy chọn — kế thừa PHẦN 9 khung mẫu).

Chỉ hoạt động khi có GEMINI_API_KEY. Dùng Google Search grounding khi cần
tìm kiếm. Là engine dự phòng nên trả lời một lần (không stream chi tiết) —
nội dung được đẩy về client thành một khối.
"""

import logging
from typing import AsyncIterator

import httpx

from ..config import CONFIG
from ..media import parse_data_url, parse_video_data_url
from ..schemas import RouteDecision
from .base import BaseEngine, EngineError

logger = logging.getLogger("lumina.gemini")

_BASE = "https://generativelanguage.googleapis.com/v1beta/models"

# Chế độ cần output dài (tránh cắt cụt): code, phân tích, tìm kiếm, nghiên cứu.
_LONG_MODES = ("deep", "apex", "search", "research")


class GeminiEngine(BaseEngine):
    name = "gemini"

    def available(self) -> bool:
        return bool(CONFIG["GEMINI_API_KEY"])

    def supports_vision(self) -> bool:
        return True

    def supports_video(self) -> bool:
        return True

    async def stream_chat(
        self, messages: list[dict], route: RouteDecision, system: str
    ) -> AsyncIterator[dict]:
        contents = []
        has_video = False
        for m in messages:
            parts: list[dict] = [{"text": m["content"]}]
            # Ảnh đính kèm (LUMINA "xem" ảnh) — Gemini nhận inlineData base64.
            for img in m.get("images") or []:
                parsed = parse_data_url(img)
                if parsed:
                    media_type, b64 = parsed
                    parts.append({"inlineData": {"mimeType": media_type, "data": b64}})
            # Video đính kèm (LUMINA "xem" video) — chỉ Gemini hỗ trợ.
            for vid in m.get("videos") or []:
                parsed = parse_video_data_url(vid)
                if parsed:
                    media_type, b64 = parsed
                    parts.append({"inlineData": {"mimeType": media_type, "data": b64}})
                    has_video = True
            contents.append({"role": "user" if m["role"] == "user" else "model", "parts": parts})
        # Câu hỏi code/phân tích cần output dài hơn (tránh cắt cụt); câu thường thì vừa phải.
        max_out = 32768 if route.mode in _LONG_MODES else 8192
        payload: dict = {
            "contents": contents,
            "systemInstruction": {"parts": [{"text": system}]},
            "generationConfig": {"maxOutputTokens": max_out},
        }
        if route.use_web_search:
            payload["tools"] = [{"google_search": {}}]  # Search grounding

        url = f"{_BASE}/{CONFIG['GEMINI_MODEL']}:generateContent?key={CONFIG['GEMINI_API_KEY']}"
        # Video cần nhiều thời gian xử lý khung hình hơn hẳn ảnh/chữ.
        timeout = 240 if has_video else 120
        try:
            async with httpx.AsyncClient(timeout=timeout) as client:
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
