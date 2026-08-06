"""✦ LUMINA AI — Tiện ích xử lý ảnh/video đính kèm (đa phương thức).

Frontend gửi ảnh/video dưới dạng data URL: `data:image/png;base64,AAAA...`.
Ở đây tách thành (media_type, base64) để đưa vào Gemini (Claude chỉ nhận ảnh,
KHÔNG nhận video — Anthropic API chưa hỗ trợ video trực tiếp).
"""

import asyncio
import base64
import logging
import os
import re
import tempfile

logger = logging.getLogger("lumina.media")

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


# ─── 🎞 Tách khung hình video → ảnh (để MỌI bộ não "nhìn" video + dựng sơ đồ) ──
#
# Anthropic API chưa nhận video trực tiếp, chỉ nhận ảnh. Để LUMINA hiểu được video
# bằng bất kỳ bộ não nhìn được (Claude/Gemini) và có thể dựng sơ đồ từ video, ta
# tách vài khung hình đại diện rải đều theo thời lượng rồi gửi kèm như ẢNH.
# Dùng ffmpeg tĩnh mang sẵn qua imageio-ffmpeg (KHÔNG cần cài đặt hệ thống) —
# cùng cơ chế đã dùng cho lồng tiếng/phụ đề.

FRAME_COUNT = 6          # số khung hình lấy ra (đủ để nắm nội dung, không tốn quá nhiều token)
FRAME_MAX_DIM = 768      # cạnh dài tối đa mỗi khung (thu nhỏ để giảm payload)
_DURATION_RE = re.compile(r"Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)")


def _ffmpeg_exe() -> str | None:
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception as e:  # noqa: BLE001
        logger.warning("Không tìm thấy ffmpeg (imageio-ffmpeg): %s", e)
        return None


async def _probe_duration(exe: str, path: str) -> float:
    """Đọc thời lượng video (giây) từ stderr của ffmpeg. 0 nếu không xác định."""
    proc = await asyncio.create_subprocess_exec(
        exe, "-i", path,
        stdout=asyncio.subprocess.DEVNULL, stderr=asyncio.subprocess.PIPE,
    )
    _, stderr = await proc.communicate()
    m = _DURATION_RE.search(stderr.decode(errors="ignore"))
    if not m:
        return 0.0
    h, mnt, sec = m.groups()
    return int(h) * 3600 + int(mnt) * 60 + float(sec)


async def _grab_frame(exe: str, path: str, ts: float) -> str | None:
    """Lấy 1 khung hình tại mốc `ts` giây → data URL JPEG (thu nhỏ). None nếu lỗi."""
    args = [
        exe, "-ss", f"{ts:.2f}", "-i", path, "-frames:v", "1",
        "-vf", f"scale='min({FRAME_MAX_DIM},iw)':-2",
        "-q:v", "5", "-f", "mjpeg", "pipe:1",
    ]
    proc = await asyncio.create_subprocess_exec(
        exe, *args[1:], stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.DEVNULL,
    )
    out, _ = await proc.communicate()
    if proc.returncode != 0 or not out:
        return None
    return "data:image/jpeg;base64," + base64.b64encode(out).decode("ascii")


async def extract_frames_from_path(path: str, count: int = FRAME_COUNT) -> list[str]:
    """Tách `count` khung hình rải đều từ một FILE video trên đĩa → data URL JPEG.

    Trả [] nếu thiếu ffmpeg hoặc lỗi. Dùng chung cho video upload (đã ghi ra temp)
    lẫn video tải từ link (yt-dlp).
    """
    exe = _ffmpeg_exe()
    if not exe or not os.path.exists(path):
        return []
    try:
        duration = await _probe_duration(exe, path)
        if duration and duration > 0.3:
            # Rải đều, tránh sát đầu/cuối (dễ dính khung đen).
            timestamps = [duration * (i + 0.5) / count for i in range(count)]
        else:
            # Không đọc được thời lượng → dùng mốc cố định tăng dần.
            timestamps = [0.5 + i * 2.0 for i in range(count)]
        frames: list[str] = []
        for ts in timestamps:
            frame = await _grab_frame(exe, path, ts)
            if frame:
                frames.append(frame)
        if frames:
            logger.info("Đã tách %d khung hình từ video (thời lượng ~%.1fs).", len(frames), duration)
        return frames
    except Exception as e:  # noqa: BLE001
        logger.warning("Tách khung hình video thất bại: %s", e)
        return []


async def extract_video_frames(video_data_url: str, count: int = FRAME_COUNT) -> list[str]:
    """Tách khung hình từ VIDEO dạng data URL (video upload) → data URL JPEG.

    Trả [] nếu thiếu ffmpeg, video hỏng, hoặc bất kỳ lỗi nào — để phần gọi tự lùi
    về hành vi cũ (chỉ Gemini xem video trực tiếp) mà không vỡ luồng.
    """
    data = decode_video(video_data_url)
    if not data:
        return []
    tmp_path = None
    try:
        fd, tmp_path = tempfile.mkstemp(suffix=".mp4")
        with os.fdopen(fd, "wb") as f:
            f.write(data)
        return await extract_frames_from_path(tmp_path, count)
    except Exception as e:  # noqa: BLE001
        logger.warning("Tách khung hình video thất bại: %s", e)
        return []
    finally:
        if tmp_path and os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)
            except OSError:
                pass
