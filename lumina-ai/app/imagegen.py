"""✦ LUMINA AI — Tạo ảnh (kế thừa ý tưởng PHẦN 32 khung mẫu, bản chạy được trên web).

Khung mẫu dùng DALL-E (cần OpenAI key có phí) hoặc Stable Diffusion local (cần GPU).
Web miễn phí không có GPU, nên LUMINA mặc định dùng **Pollinations.ai** — API tạo ảnh
MIỄN PHÍ, KHÔNG cần key: ảnh sinh ngay khi trình duyệt tải URL, không tốn băng thông
máy chủ. Nếu chủ web có OPENAI_API_KEY thì tự ưu tiên DALL-E 3 (chất lượng cao hơn).

Không bao giờ lộ tên nhà cung cấp ra người dùng — tất cả là "LUMINA vẽ".
"""

import logging
import urllib.parse

import httpx

from .config import CONFIG

logger = logging.getLogger("lumina.imagegen")

_POLLINATIONS = "https://image.pollinations.ai/prompt/"


def _pollinations_url(prompt: str, seed: int = 0) -> str:
    """URL ảnh Pollinations — trình duyệt tải là sinh ảnh (miễn phí, không key)."""
    enc = urllib.parse.quote(prompt[:400], safe="")
    params = urllib.parse.urlencode({
        "width": 1024, "height": 1024, "nologo": "true", "seed": seed, "model": "flux",
    })
    return f"{_POLLINATIONS}{enc}?{params}"


async def _dalle(prompt: str) -> str | None:
    """Dùng DALL-E 3 nếu chủ web có OpenAI key. Trả về URL ảnh, hoặc None nếu lỗi."""
    if not CONFIG["OPENAI_API_KEY"]:
        return None
    try:
        async with httpx.AsyncClient(timeout=60) as client:
            resp = await client.post(
                f"{CONFIG['OPENAI_BASE_URL']}/images/generations",
                headers={"Authorization": f"Bearer {CONFIG['OPENAI_API_KEY']}"},
                json={"model": "dall-e-3", "prompt": prompt[:1000], "n": 1, "size": "1024x1024"},
            )
            resp.raise_for_status()
            data = resp.json()
            items = data.get("data") or []
            if items and items[0].get("url"):
                return items[0]["url"]
    except Exception as exc:  # noqa: BLE001 — hỏng thì rơi về Pollinations
        logger.warning("DALL-E lỗi (%s) — dùng Pollinations", exc)
    return None


async def generate_image(prompt: str, seed: int = 0) -> dict:
    """Sinh ảnh từ mô tả. Luôn trả về dict {url, prompt} — không bao giờ raise.

    Ưu tiên DALL-E (nếu có key) → Pollinations (miễn phí, luôn có).
    """
    prompt = (prompt or "").strip() or "một bức tranh đẹp"
    url = await _dalle(prompt)
    if not url:
        url = _pollinations_url(prompt, seed)
    return {"url": url, "prompt": prompt}
