"""✦ LUMINA AI — "Xem video qua LINK".

Khi người dùng dán link video (YouTube, Vimeo, TikTok...) vào chat, module này:
  1. Dùng yt-dlp lấy metadata + phụ đề gốc (miễn phí, chính xác) nếu có.
  2. Tải một bản độ phân giải thấp (giới hạn thời lượng/dung lượng) để tách
     khung hình bằng ffmpeg → MỌI bộ não "nhìn" được video.
  3. Nếu không có phụ đề: trích audio → chép lời bằng Whisper (Groq/OpenAI).
→ Trả về khung hình + transcript để bộ não hiểu cả HÌNH lẫn TIẾNG và dựng sơ đồ.

An toàn: chỉ nhận các host video đã biết (giảm rủi ro SSRF/lạm dụng), chặn
video quá dài/quá nặng, và LUÔN lùi an toàn (trả error, không raise).

Lưu ý: tải video từ link công khai phụ thuộc điều khoản (ToS)/bản quyền của
nền tảng nguồn — người vận hành tự chịu trách nhiệm tuân thủ.
"""

import asyncio
import logging
import os
import re
import tempfile
from urllib.parse import urlparse

import httpx

from . import media, transcribe
from .config import CONFIG

logger = logging.getLogger("lumina.video_link")

# Host video được phép (khớp phần đuôi tên miền). Giữ hẹp cho an toàn.
_VIDEO_HOSTS = (
    "youtube.com", "youtu.be", "m.youtube.com", "music.youtube.com",
    "vimeo.com", "dailymotion.com", "dai.ly",
    "tiktok.com", "facebook.com", "fb.watch",
    "twitter.com", "x.com", "instagram.com",
    "twitch.tv", "streamable.com",
)
_VIDEO_EXT_RE = re.compile(r"\.(mp4|webm|mov|mkv|m4v)(\?|#|$)", re.I)
_SUB_LANGS = ("vi", "en", "en-US", "en-GB")   # ưu tiên tiếng Việt rồi tiếng Anh
MAX_TRANSCRIPT_CHARS = 8000


def is_video_link(url: str) -> bool:
    """Có phải link video (host đã biết hoặc đuôi file video) không."""
    if not isinstance(url, str):
        return False
    try:
        host = (urlparse(url).hostname or "").lower()
    except ValueError:
        return False
    if any(host == h or host.endswith("." + h) for h in _VIDEO_HOSTS):
        return True
    return bool(_VIDEO_EXT_RE.search(url))


def _vtt_to_text(vtt: str) -> str:
    """Chuyển phụ đề WebVTT/SRT → văn bản thuần, bỏ mốc thời gian & dòng trùng lặp."""
    lines: list[str] = []
    for raw in vtt.splitlines():
        line = raw.strip()
        if (not line or line == "WEBVTT" or line.startswith("NOTE")
                or "-->" in line or re.match(r"^\d+$", line)):
            continue
        # Bỏ thẻ định dạng inline kiểu <00:00:01.000> hoặc <c>...</c>.
        line = re.sub(r"<[^>]+>", "", line).strip()
        if line and (not lines or lines[-1] != line):   # bỏ dòng lặp liên tiếp (auto-caption)
            lines.append(line)
    text = " ".join(lines)
    return text[:MAX_TRANSCRIPT_CHARS]


async def _fetch_caption_text(info: dict) -> str:
    """Lấy phụ đề gốc (thủ công ưu tiên hơn tự động) theo ngôn ngữ ưu tiên."""
    for pool in (info.get("subtitles") or {}, info.get("automatic_captions") or {}):
        for lang in _SUB_LANGS:
            tracks = pool.get(lang)
            if not tracks:
                continue
            track = next((t for t in tracks if t.get("ext") == "vtt"), tracks[0])
            url = track.get("url")
            if not url:
                continue
            try:
                async with httpx.AsyncClient(timeout=20) as client:
                    resp = await client.get(url)
                resp.raise_for_status()
                text = _vtt_to_text(resp.text)
                if text:
                    return text
            except Exception as e:  # noqa: BLE001
                logger.warning("Tải phụ đề (%s) lỗi: %s", lang, e)
    return ""


def _ydl_extract(url: str) -> dict:
    """Chạy yt-dlp lấy metadata (blocking — gọi qua asyncio.to_thread)."""
    import yt_dlp
    opts = {"quiet": True, "no_warnings": True, "skip_download": True,
            "socket_timeout": 20, "noplaylist": True}
    with yt_dlp.YoutubeDL(opts) as ydl:
        return ydl.extract_info(url, download=False)


def _ydl_download(url: str, out_path: str) -> None:
    """Tải bản độ phân giải thấp về out_path (blocking)."""
    import yt_dlp
    max_bytes = CONFIG["VIDEO_LINK_MAX_FILESIZE_MB"] * 1024 * 1024
    opts = {
        "quiet": True, "no_warnings": True, "noplaylist": True, "socket_timeout": 20,
        "format": "worst[ext=mp4]/worst[height<=360]/worst",
        "max_filesize": max_bytes, "outtmpl": out_path, "overwrites": True,
    }
    with yt_dlp.YoutubeDL(opts) as ydl:
        ydl.download([url])


async def _extract_audio(video_path: str) -> str | None:
    """Trích audio mono 16kHz mp3 (nhẹ) để chép lời. None nếu lỗi/không có ffmpeg."""
    exe = media._ffmpeg_exe()
    if not exe:
        return None
    audio_path = video_path + ".mp3"
    proc = await asyncio.create_subprocess_exec(
        exe, "-y", "-i", video_path, "-vn", "-ac", "1", "-ar", "16000",
        "-b:a", "64k", audio_path,
        stdout=asyncio.subprocess.DEVNULL, stderr=asyncio.subprocess.DEVNULL,
    )
    await proc.communicate()
    return audio_path if (proc.returncode == 0 and os.path.exists(audio_path)) else None


async def fetch_video_link(url: str) -> dict:
    """Tải + hiểu 1 video từ link. Không bao giờ raise.

    Trả dict: {url, title, duration, frames: [data_url...], transcript, transcript_source, error}
    """
    result = {"url": url, "title": "", "duration": 0, "frames": [],
              "transcript": "", "transcript_source": "", "error": ""}
    try:
        info = await asyncio.to_thread(_ydl_extract, url)
    except Exception as e:  # noqa: BLE001
        logger.warning("yt-dlp không đọc được link %s: %s", url, e)
        result["error"] = "Không đọc được video từ link này."
        return result

    result["title"] = info.get("title") or ""
    duration = int(info.get("duration") or 0)
    result["duration"] = duration
    if duration and duration > CONFIG["VIDEO_LINK_MAX_DURATION"]:
        mins = CONFIG["VIDEO_LINK_MAX_DURATION"] // 60
        result["error"] = f"Video dài quá (LUMINA chỉ xử lý video ≤ {mins} phút qua link)."
        return result

    # 1) Phụ đề gốc trước (miễn phí, không cần key).
    transcript = await _fetch_caption_text(info)
    if transcript:
        result["transcript"] = transcript
        result["transcript_source"] = "phụ đề gốc"

    # 2) Tải bản nhẹ để tách khung hình (và trích audio nếu cần chép lời).
    tmpdir = tempfile.mkdtemp()
    video_path = os.path.join(tmpdir, "video.mp4")
    try:
        try:
            await asyncio.to_thread(_ydl_download, url, video_path)
        except Exception as e:  # noqa: BLE001
            logger.warning("Tải video từ link lỗi %s: %s", url, e)
            # Vẫn có thể còn transcript từ phụ đề — trả phần đó.
            if not result["transcript"]:
                result["error"] = "Không tải được video từ link (có thể bị chặn/giới hạn dung lượng)."
            return result

        if os.path.exists(video_path):
            result["frames"] = await media.extract_frames_from_path(video_path)

        # 3) Chưa có transcript + có Whisper → chép lời từ audio.
        if not result["transcript"] and transcribe.whisper_enabled():
            audio_path = await _extract_audio(video_path)
            if audio_path:
                text = await transcribe.transcribe_audio(audio_path)
                if text:
                    result["transcript"] = text[:MAX_TRANSCRIPT_CHARS]
                    result["transcript_source"] = "chép lời (Whisper)"
        return result
    finally:
        # Dọn temp.
        for p in (video_path, video_path + ".mp3"):
            if os.path.exists(p):
                try:
                    os.remove(p)
                except OSError:
                    pass
        try:
            os.rmdir(tmpdir)
        except OSError:
            pass


def build_context(res: dict) -> str:
    """Ghép transcript video thành đoạn ngữ cảnh cho bộ não (kèm nguồn)."""
    if not res.get("transcript"):
        return ""
    title = res.get("title") or res.get("url")
    src = res.get("transcript_source") or "transcript"
    return (f"\n\n[Nội dung lời trong video \"{title}\" ({src})]:\n"
            f"{res['transcript']}\n[Hết transcript video]")
