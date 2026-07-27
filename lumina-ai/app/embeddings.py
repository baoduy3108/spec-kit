"""✦ LUMINA AI — Embeddings cho RAG THẬT (tìm theo ngữ nghĩa, không chỉ từ khóa).

Nhúng văn bản thành vector rồi so cosine để tìm tri thức LIÊN QUAN VỀ NGHĨA
(khác hẳn tra khớp chuỗi trong `knowledge.lookup_local`). Ưu tiên Gemini
(miễn phí, text-embedding-004); dự phòng OpenAI (text-embedding-3-small).

Không có key nào → embeddings_enabled()=False, mọi thứ tự lùi về tra từ khóa
cũ (không thay đổi hành vi, không tốn gì).
"""

import logging

import httpx

from .config import CONFIG

logger = logging.getLogger("lumina.embeddings")

_GEMINI_EMBED_URL = (
    "https://generativelanguage.googleapis.com/v1beta/models/"
    "{model}:embedContent?key={key}"
)
TIMEOUT_SECONDS = 20


def embeddings_enabled() -> bool:
    return bool(CONFIG.get("GEMINI_API_KEY") or CONFIG.get("OPENAI_API_KEY"))


async def embed_text(text: str) -> list[float] | None:
    """Nhúng 1 đoạn văn bản → vector. Trả None nếu không có key hoặc lỗi (không raise)."""
    text = (text or "").strip()
    if not text:
        return None
    text = text[:8000]  # cắt để an toàn giới hạn API

    if CONFIG.get("GEMINI_API_KEY"):
        model = CONFIG.get("GEMINI_EMBED_MODEL", "text-embedding-004")
        url = _GEMINI_EMBED_URL.format(model=f"models/{model}", key=CONFIG["GEMINI_API_KEY"])
        try:
            async with httpx.AsyncClient(timeout=TIMEOUT_SECONDS) as client:
                resp = await client.post(url, json={"content": {"parts": [{"text": text}]}})
            resp.raise_for_status()
            vals = (resp.json().get("embedding") or {}).get("values")
            if vals:
                return [float(v) for v in vals]
        except Exception as e:  # noqa: BLE001
            logger.warning("Gemini embed lỗi: %s", e)

    if CONFIG.get("OPENAI_API_KEY"):
        base = CONFIG.get("OPENAI_BASE_URL") or "https://api.openai.com/v1"
        model = CONFIG.get("OPENAI_EMBED_MODEL", "text-embedding-3-small")
        try:
            async with httpx.AsyncClient(timeout=TIMEOUT_SECONDS) as client:
                resp = await client.post(
                    f"{base}/embeddings",
                    headers={"Authorization": f"Bearer {CONFIG['OPENAI_API_KEY']}"},
                    json={"model": model, "input": text},
                )
            resp.raise_for_status()
            data = resp.json().get("data") or []
            if data and data[0].get("embedding"):
                return [float(v) for v in data[0]["embedding"]]
        except Exception as e:  # noqa: BLE001
            logger.warning("OpenAI embed lỗi: %s", e)

    return None


def cosine(a: list[float], b: list[float]) -> float:
    """Độ tương đồng cosine giữa 2 vector (thuần Python, không cần numpy). 0 nếu lệch chiều."""
    if not a or not b or len(a) != len(b):
        return 0.0
    dot = na = nb = 0.0
    for x, y in zip(a, b):
        dot += x * y
        na += x * x
        nb += y * y
    if na == 0.0 or nb == 0.0:
        return 0.0
    return dot / ((na ** 0.5) * (nb ** 0.5))
