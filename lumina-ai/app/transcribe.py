"""✦ LUMINA AI — Chép lời (transcription) audio bằng Whisper.

Dùng để "nghe" được lời thoại trong video (kể cả khi bộ não không xem video
trực tiếp). Gọi endpoint tương thích OpenAI `audio/transcriptions`:
  • Groq (miễn phí, nhanh) — ưu tiên, model whisper-large-v3-turbo.
  • OpenAI (whisper-1) — dự phòng nếu có OPENAI_API_KEY.

Không có key nào → trả "" để phần gọi tự lùi về chỉ dùng khung hình.
"""

import logging
import os

import httpx

from .config import CONFIG

logger = logging.getLogger("lumina.transcribe")

TIMEOUT_SECONDS = 120
_MAX_AUDIO_BYTES = 25 * 1024 * 1024   # giới hạn API Whisper (~25MB)


def whisper_enabled() -> bool:
    return bool(CONFIG.get("GROQ_API_KEY") or CONFIG.get("OPENAI_API_KEY"))


async def _post_whisper(base_url: str, api_key: str, model: str, path: str) -> str:
    with open(path, "rb") as f:
        files = {"file": (os.path.basename(path), f, "audio/mpeg")}
        data = {"model": model, "response_format": "text"}
        async with httpx.AsyncClient(timeout=TIMEOUT_SECONDS) as client:
            resp = await client.post(
                f"{base_url}/audio/transcriptions",
                headers={"Authorization": f"Bearer {api_key}"},
                files=files, data=data,
            )
    resp.raise_for_status()
    # response_format=text → thân phản hồi là chuỗi thuần; JSON thì lấy khóa "text".
    text = resp.text.strip()
    if text.startswith("{"):
        try:
            text = (resp.json().get("text") or "").strip()
        except Exception:  # noqa: BLE001
            pass
    return text


async def transcribe_audio(path: str) -> str:
    """Chép lời file audio → chữ. Trả "" nếu không có key hoặc lỗi (không raise)."""
    if not path or not os.path.exists(path):
        return ""
    if os.path.getsize(path) > _MAX_AUDIO_BYTES:
        logger.warning("Audio quá lớn để chép lời (%d bytes) — bỏ qua.", os.path.getsize(path))
        return ""

    providers = []
    if CONFIG.get("GROQ_API_KEY"):
        providers.append((CONFIG["GROQ_BASE_URL"], CONFIG["GROQ_API_KEY"], CONFIG["GROQ_WHISPER_MODEL"]))
    if CONFIG.get("OPENAI_API_KEY"):
        base = CONFIG.get("OPENAI_BASE_URL") or "https://api.openai.com/v1"
        providers.append((base, CONFIG["OPENAI_API_KEY"], CONFIG["OPENAI_WHISPER_MODEL"]))

    for base_url, api_key, model in providers:
        try:
            text = await _post_whisper(base_url, api_key, model, path)
            if text:
                logger.info("Chép lời thành công (%d ký tự) qua %s.", len(text), base_url)
                return text
        except Exception as e:  # noqa: BLE001
            logger.warning("Chép lời qua %s thất bại: %s", base_url, e)
    return ""
