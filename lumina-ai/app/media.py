"""✦ LUMINA AI — Tiện ích xử lý ảnh/video đính kèm (đa phương thức).

Frontend gửi ảnh/video dưới dạng data URL: `data:image/png;base64,AAAA...`.
Ở đây tách thành (media_type, base64) để đưa vào Gemini (Claude chỉ nhận ảnh,
KHÔNG nhận video — Anthropic API chưa hỗ trợ video trực tiếp).
"""

import base64
import re

_DATA_URL_RE = re.compile(r"^data:(?P<mt>[\w./+-]+);base64,(?P<data>.+)$", re.DOTALL)

_IMAGE_TYPES = {"image/png", "image/jpeg", "image/webp", "image/gif"}
_VIDEO_TYPES = {"video/mp4", "video/webm", "video/quicktime", "video/mpeg", "video/x-m4v"}

# Video nặng hơn ảnh nhiều — chặn base64 quá lớn để không làm sập request
# (Gemini inline giới hạn ~20MB/request; giữ dư an toàn).
MAX_VIDEO_BYTES = 18 * 1024 * 1024


def parse_data_url(data_url: str) -> tuple[str, str] | None:
    """Trả về (media_type, base64_data) nếu là ẢNH hợp lệ, None nếu không."""
    if not isinstance(data_url, str):
        return None
    m = _DATA_URL_RE.match(data_url.strip())
    if not m:
        return None
    media_type = m.group("mt").lower()
    if media_type not in _IMAGE_TYPES:
        return None
    return media_type, m.group("data")


def parse_video_data_url(data_url: str) -> tuple[str, str] | None:
    """Trả về (media_type, base64_data) nếu là VIDEO hợp lệ và không quá lớn."""
    if not isinstance(data_url, str):
        return None
    m = _DATA_URL_RE.match(data_url.strip())
    if not m:
        return None
    media_type = m.group("mt").lower()
    if media_type not in _VIDEO_TYPES:
        return None
    b64 = m.group("data")
    # Ước lượng dung lượng gốc từ độ dài base64 (mỗi 4 ký tự ~ 3 byte).
    if len(b64) * 3 / 4 > MAX_VIDEO_BYTES:
        return None
    return media_type, b64


def decode_video(data_url: str) -> bytes | None:
    """Giải mã video ra bytes thô (dùng cho pipeline lồng tiếng/phụ đề)."""
    parsed = parse_video_data_url(data_url)
    if not parsed:
        return None
    try:
        return base64.b64decode(parsed[1])
    except Exception:  # noqa: BLE001
        return None


def has_images(messages: list[dict]) -> bool:
    """Có tin nhắn nào kèm ảnh không (để giới hạn chuỗi engine sang loại nhìn được)."""
    return any(m.get("images") for m in messages)


def has_videos(messages: list[dict]) -> bool:
    """Có tin nhắn nào kèm video không — hiện chỉ Gemini xem được video."""
    return any(m.get("videos") for m in messages)
