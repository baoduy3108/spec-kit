"""✦ LUMINA AI — Tiện ích xử lý ảnh đính kèm (đa phương thức).

Frontend gửi ảnh dưới dạng data URL: `data:image/png;base64,AAAA...`.
Ở đây tách thành (media_type, base64) để đưa vào Gemini/Claude vision.
"""

import re

_DATA_URL_RE = re.compile(r"^data:(?P<mt>image/[a-zA-Z0-9.+-]+);base64,(?P<data>.+)$", re.DOTALL)

# Các định dạng ảnh Gemini + Claude đều nhận
_ALLOWED_TYPES = {"image/png", "image/jpeg", "image/webp", "image/gif"}


def parse_data_url(data_url: str) -> tuple[str, str] | None:
    """Trả về (media_type, base64_data) hoặc None nếu không hợp lệ."""
    if not isinstance(data_url, str):
        return None
    m = _DATA_URL_RE.match(data_url.strip())
    if not m:
        return None
    media_type = m.group("mt").lower()
    if media_type not in _ALLOWED_TYPES:
        return None
    return media_type, m.group("data")


def has_images(messages: list[dict]) -> bool:
    """Có tin nhắn nào kèm ảnh không (để giới hạn chuỗi engine sang loại nhìn được)."""
    return any(m.get("images") for m in messages)
