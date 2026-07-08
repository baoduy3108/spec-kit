"""✦ LUMINA AI — 🗣 Tự động lồng tiếng + gắn phụ đề video (tính năng nặng nhất).

Khác hẳn các tính năng khác (chat/vẽ ảnh/xem ảnh) — đây là một PIPELINE xử lý
video thật, chạy NỀN (không đợi trong 1 request HTTP vì có thể mất vài phút):

  1. 🎧 Nghe video → tách lời thoại kèm mốc thời gian + dịch sang ngôn ngữ đích
     (gọi Gemini — bộ não duy nhất "xem" được video).
  2. 🗣 Sinh giọng đọc mới cho từng câu bằng edge-tts (MIỄN PHÍ, không cần key,
     giọng Microsoft chất lượng cao, có tiếng Việt tự nhiên).
  3. 🎬 Dùng ffmpeg (qua gói imageio-ffmpeg — mang sẵn binary tĩnh, KHÔNG cần cài
     đặt gì thêm trên máy chủ, chạy được cả trên Render free) để: ghép các đoạn
     giọng mới đúng mốc thời gian, thay thế audio gốc, và gắn cứng phụ đề.

Giới hạn có chủ đích (bảo vệ máy chủ free): video tối đa ~3 phút. Đây là tính
năng NẶNG NHẤT trong LUMINA — có thể mất 1-3 phút xử lý tùy độ dài video.
"""

import asyncio
import json
import logging
import os
import re
import tempfile
import time
import uuid
from dataclasses import dataclass, field

import httpx
import imageio_ffmpeg

from .config import CONFIG

logger = logging.getLogger("lumina.video_dub")

_FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
_GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models"

MAX_VIDEO_SECONDS = 180          # ~3 phút — giới hạn bảo vệ máy chủ free
JOB_TTL_SECONDS = 2 * 3600       # dọn file/job sau 2 giờ

_VOICE_MAP = {
    "vi": "vi-VN-HoaiMyNeural",
    "en": "en-US-AriaNeural",
}

_jobs: dict[str, "DubJob"] = {}
_jobs_lock = asyncio.Lock()


@dataclass
class DubJob:
    id: str
    user_id: str
    status: str = "pending"   # pending|transcribing|voicing|muxing|done|error
    progress: int = 0
    error: str = ""
    output_path: str = ""
    work_dir: str = ""
    created_at: float = field(default_factory=time.time)


class DubError(Exception):
    """Lỗi pipeline lồng tiếng kèm thông báo thân thiện cho người dùng."""


def get_job(job_id: str) -> DubJob | None:
    return _jobs.get(job_id)


async def _run_ffmpeg(args: list[str]) -> str:
    """Chạy ffmpeg bất đồng bộ (không chặn event loop); raise DubError nếu lỗi."""
    proc = await asyncio.create_subprocess_exec(
        _FFMPEG, *args, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE,
    )
    stdout, stderr = await proc.communicate()
    if proc.returncode != 0:
        logger.error("ffmpeg lỗi (%s): %s", proc.returncode, stderr.decode(errors="ignore")[-800:])
        raise DubError("Xử lý video gặp lỗi kỹ thuật (ffmpeg).")
    return stdout.decode(errors="ignore")


async def _probe_duration(path: str) -> float:
    """Lấy độ dài video (giây) — dùng chính ffmpeg (không cần ffprobe riêng)."""
    proc = await asyncio.create_subprocess_exec(
        _FFMPEG, "-i", path, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE,
    )
    _, stderr = await proc.communicate()
    text = stderr.decode(errors="ignore")
    m = re.search(r"Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)", text)
    if not m:
        raise DubError("Không đọc được thông tin video (định dạng lạ hoặc file hỏng).")
    h, mnt, s = m.groups()
    return int(h) * 3600 + int(mnt) * 60 + float(s)


def _extract_json_array(text: str) -> list[dict]:
    """Lấy mảng JSON từ output của bộ não (có thể kèm ```json ... ``` hoặc chữ thừa)."""
    text = text.strip()
    fence = re.search(r"```(?:json)?\s*(\[.*?\])\s*```", text, re.DOTALL)
    if fence:
        text = fence.group(1)
    else:
        start, end = text.find("["), text.rfind("]")
        if start != -1 and end != -1:
            text = text[start:end + 1]
    try:
        data = json.loads(text)
        return data if isinstance(data, list) else []
    except json.JSONDecodeError:
        return []


async def _transcribe_and_translate(video_path: str, target_lang: str) -> list[dict]:
    """Gọi Gemini để nghe video → transcript kèm mốc thời gian + bản dịch.

    Trả về list [{start, end, original, translated}] (giây, float).
    """
    if not CONFIG["GEMINI_API_KEY"]:
        raise DubError("Cần bật bộ não Gemini (miễn phí) để nghe video — thiếu GEMINI_API_KEY.")

    import base64
    with open(video_path, "rb") as fh:
        video_b64 = base64.b64encode(fh.read()).decode()

    lang_name = "tiếng Việt" if target_lang == "vi" else "English"
    prompt = (
        "Hãy nghe kỹ video này và trích xuất TOÀN BỘ lời thoại thành các đoạn ngắn "
        "(mỗi câu/cụm một đoạn). Với mỗi đoạn, cho biết thời điểm bắt đầu và kết thúc "
        f"(giây, có thể lẻ), lời thoại gốc, và bản dịch sang {lang_name}. "
        "CHỈ trả lời bằng một mảng JSON, không thêm chữ nào khác, đúng định dạng:\n"
        '[{"start": 0.0, "end": 2.5, "original": "...", "translated": "..."}, ...]'
    )
    payload = {
        "contents": [{"role": "user", "parts": [
            {"text": prompt},
            {"inlineData": {"mimeType": "video/mp4", "data": video_b64}},
        ]}],
        "generationConfig": {"maxOutputTokens": 32768, "temperature": 0.2},
    }
    url = f"{_GEMINI_BASE}/{CONFIG['GEMINI_MODEL']}:generateContent?key={CONFIG['GEMINI_API_KEY']}"
    try:
        async with httpx.AsyncClient(timeout=240) as client:
            resp = await client.post(url, json=payload)
            resp.raise_for_status()
            data = resp.json()
    except httpx.HTTPError as exc:
        raise DubError("Không nghe được nội dung video (lỗi kết nối bộ não).") from exc

    candidates = data.get("candidates") or []
    if not candidates:
        raise DubError("Bộ não không nghe được nội dung video này.")
    parts = candidates[0].get("content", {}).get("parts", [])
    text = "".join(p.get("text", "") for p in parts)
    segments = _extract_json_array(text)
    segments = [s for s in segments if isinstance(s, dict) and s.get("translated")]
    if not segments:
        raise DubError("Không tách được lời thoại từ video (có thể video không có tiếng nói rõ).")
    return segments


async def _synthesize_segment(text: str, lang: str, out_path: str, target_seconds: float) -> float:
    """Sinh giọng đọc cho 1 đoạn bằng edge-tts (miễn phí). Trả về độ dài audio thật (giây)."""
    import edge_tts

    voice = _VOICE_MAP.get(lang, _VOICE_MAP["vi"])
    communicator = edge_tts.Communicate(text[:600], voice)
    try:
        await communicator.save(out_path)
    except Exception as exc:  # noqa: BLE001 — mạng TTS lỗi thì báo rõ, không sập cả job
        raise DubError("Không tạo được giọng đọc (dịch vụ giọng nói tạm gián đoạn).") from exc
    return await _probe_duration(out_path)


def _fmt_srt_time(seconds: float) -> str:
    ms = int(round(seconds * 1000))
    h, ms = divmod(ms, 3600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def build_srt(segments: list[dict], use_translated: bool = True) -> str:
    """Ghép segments thành nội dung file .srt chuẩn."""
    lines = []
    for i, seg in enumerate(segments, start=1):
        text = seg.get("translated" if use_translated else "original", "").strip()
        if not text:
            continue
        lines.append(str(i))
        lines.append(f"{_fmt_srt_time(seg['start'])} --> {_fmt_srt_time(seg['end'])}")
        lines.append(text)
        lines.append("")
    return "\n".join(lines)


async def _build_dubbed_audio(segments: list[dict], voice_paths: list[str], work_dir: str,
                              total_duration: float) -> str:
    """Ghép các đoạn giọng mới vào đúng mốc thời gian bằng ffmpeg filter_complex."""
    out_path = os.path.join(work_dir, "dubbed_audio.m4a")
    inputs: list[str] = []
    filters: list[str] = []
    mix_labels: list[str] = []
    input_idx = 0  # chỉ số input THỰC TẾ trong ffmpeg — lệch với chỉ số segment khi có đoạn bị bỏ qua
    for seg, vp in zip(segments, voice_paths):
        if not vp:
            continue
        inputs += ["-i", vp]
        delay_ms = max(0, int(seg["start"] * 1000))
        filters.append(f"[{input_idx}:a]adelay={delay_ms}|{delay_ms}[a{input_idx}]")
        mix_labels.append(f"[a{input_idx}]")
        input_idx += 1
    if not mix_labels:
        raise DubError("Không sinh được giọng đọc nào cho video này.")
    # apad kéo dài khoảng lặng cho khớp ĐỦ độ dài video gốc (amix một mình sẽ cắt ngắn
    # nếu đoạn thoại cuối kết thúc trước khi video kết thúc).
    filter_complex = (
        ";".join(filters) + ";" + "".join(mix_labels) +
        f"amix=inputs={len(mix_labels)}:duration=longest:dropout_transition=0[mixed];"
        f"[mixed]apad=whole_dur={total_duration}[aout]"
    )
    args = inputs + [
        "-filter_complex", filter_complex, "-map", "[aout]",
        "-t", str(total_duration), "-c:a", "aac", "-y", out_path,
    ]
    await _run_ffmpeg(args)
    return out_path


async def _mux_final(video_path: str, audio_path: str, srt_path: str | None,
                     out_path: str) -> None:
    """Ghép video gốc + audio lồng tiếng mới (+ gắn cứng phụ đề nếu có).

    Audio đã được đệm đúng độ dài video (_build_dubbed_audio) nên KHÔNG dùng
    -shortest — tránh cắt mất đoạn cuối video nếu lời thoại kết thúc sớm hơn.
    """
    if srt_path:
        # ffmpeg subtitles filter cần escape dấu ':' trên Linux — bọc trong nháy đơn.
        vf = f"subtitles='{srt_path}':force_style='FontName=Arial,FontSize=20,Outline=1'"
        args = ["-i", video_path, "-i", audio_path, "-map", "0:v:0", "-map", "1:a:0",
                "-vf", vf, "-c:v", "libx264", "-preset", "veryfast", "-c:a", "aac", "-y", out_path]
    else:
        args = ["-i", video_path, "-i", audio_path, "-map", "0:v:0", "-map", "1:a:0",
                "-c:v", "copy", "-c:a", "aac", "-y", out_path]
    await _run_ffmpeg(args)


async def _run_pipeline(job: DubJob, video_bytes: bytes, target_lang: str, burn_subtitles: bool) -> None:
    work_dir = job.work_dir
    input_path = os.path.join(work_dir, "input.mp4")
    with open(input_path, "wb") as fh:
        fh.write(video_bytes)

    try:
        duration = await _probe_duration(input_path)
        if duration > MAX_VIDEO_SECONDS:
            raise DubError(f"Video dài {int(duration)}s — LUMINA chỉ xử lý video tối đa "
                           f"{MAX_VIDEO_SECONDS}s để đảm bảo tốc độ cho mọi người.")

        job.status = "transcribing"; job.progress = 15
        segments = await _transcribe_and_translate(input_path, target_lang)

        job.status = "voicing"; job.progress = 40
        voice_paths: list[str] = []
        n = len(segments)
        for i, seg in enumerate(segments):
            vp = os.path.join(work_dir, f"seg_{i}.mp3")
            target_len = max(0.3, seg.get("end", 0) - seg.get("start", 0))
            try:
                await _synthesize_segment(seg.get("translated", ""), target_lang, vp, target_len)
                voice_paths.append(vp)
            except DubError:
                voice_paths.append("")  # đoạn lỗi thì bỏ qua, không hỏng cả video
            job.progress = 40 + int(40 * (i + 1) / max(n, 1))

        job.status = "muxing"; job.progress = 85
        audio_path = await _build_dubbed_audio(segments, voice_paths, work_dir, duration)

        srt_path = None
        if burn_subtitles:
            srt_path = os.path.join(work_dir, "subs.srt")
            with open(srt_path, "w", encoding="utf-8") as fh:
                fh.write(build_srt(segments, use_translated=True))

        out_path = os.path.join(work_dir, "output.mp4")
        await _mux_final(input_path, audio_path, srt_path, out_path)

        job.output_path = out_path
        job.status = "done"; job.progress = 100
    except DubError as exc:
        job.status = "error"; job.error = str(exc)
    except Exception:  # noqa: BLE001 — job nền, tuyệt đối không được để sập tiến trình
        logger.exception("Lỗi bất ngờ trong pipeline lồng tiếng (job %s)", job.id)
        job.status = "error"; job.error = "LUMINA gặp lỗi không xác định khi xử lý video."


async def start_job(user_id: str, video_bytes: bytes, target_lang: str, burn_subtitles: bool) -> str:
    job_id = uuid.uuid4().hex[:12]
    work_dir = os.path.join(tempfile.gettempdir(), "lumina_dub", job_id)
    os.makedirs(work_dir, exist_ok=True)
    job = DubJob(id=job_id, user_id=user_id, work_dir=work_dir)
    async with _jobs_lock:
        _jobs[job_id] = job
    asyncio.create_task(_run_pipeline(job, video_bytes, target_lang, burn_subtitles))
    return job_id


def cleanup_expired_jobs() -> None:
    """Dọn job/file cũ quá hạn — gọi định kỳ (hoặc mỗi lần có job mới) để không đầy đĩa."""
    import shutil
    now = time.time()
    expired = [jid for jid, j in _jobs.items() if now - j.created_at > JOB_TTL_SECONDS]
    for jid in expired:
        job = _jobs.pop(jid, None)
        if job and job.work_dir and os.path.isdir(job.work_dir):
            shutil.rmtree(job.work_dir, ignore_errors=True)
