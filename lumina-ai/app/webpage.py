"""✦ LUMINA AI — Đọc nội dung trang web khi người dùng dán link vào chat.

Vấn đề: trước đây chỉ Claude ở chế độ 🔍 tìm kiếm mới đọc được link (qua
server tool web_fetch của Anthropic) — Gemini/Groq/DeepSeek/OpenAI thì
KHÔNG đọc được link dù người dùng dán vào, kể cả Claude ở chế độ thường.

Giải pháp: tự phát hiện link trong câu hỏi, TỰ TẢI trang (httpx, không cần
key), tách tiêu đề + nội dung đọc được (BeautifulSoup, bỏ script/style/nav),
đưa thẳng vào ngữ cảnh — hoạt động với MỌI bộ não, không phụ thuộc chế độ.
"""

import logging
import re

import httpx
from bs4 import BeautifulSoup

logger = logging.getLogger("lumina.webpage")

_URL_RE = re.compile(r"https?://[^\s<>\)\]\"']+")

MAX_URLS_PER_MESSAGE = 2       # tránh lạm dụng / chậm phản hồi
MAX_PAGE_BYTES = 3 * 1024 * 1024  # 3MB — chặn trang quá nặng
MAX_TEXT_CHARS = 6000          # cắt bớt nội dung dài để không tốn quá nhiều token
TIMEOUT_SECONDS = 12

_HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; LUMINA-AI/1.0; +https://lumina-ai)",
}


def extract_urls(text: str, limit: int = MAX_URLS_PER_MESSAGE) -> list[str]:
    """Tìm các URL http(s) trong câu hỏi, loại trùng, giữ thứ tự xuất hiện."""
    seen: list[str] = []
    for url in _URL_RE.findall(text or ""):
        url = url.rstrip(".,;:!?")  # bỏ dấu câu dính liền cuối link
        if url not in seen:
            seen.append(url)
        if len(seen) >= limit:
            break
    return seen


async def fetch_page(url: str) -> dict:
    """Tải và tách nội dung đọc được của 1 trang. Không bao giờ raise."""
    try:
        async with httpx.AsyncClient(
            timeout=TIMEOUT_SECONDS, follow_redirects=True, headers=_HEADERS,
        ) as client:
            async with client.stream("GET", url) as resp:
                if resp.status_code >= 400:
                    return {"url": url, "title": "", "text": "",
                            "error": f"Trang trả lỗi {resp.status_code}."}
                content_type = resp.headers.get("content-type", "")
                if "text/html" not in content_type and "text" not in content_type:
                    return {"url": url, "title": "", "text": "",
                            "error": "Không phải trang HTML (có thể là file/ảnh)."}
                raw = b""
                async for chunk in resp.aiter_bytes():
                    raw += chunk
                    if len(raw) > MAX_PAGE_BYTES:
                        break
        html = raw.decode(resp.encoding or "utf-8", errors="ignore")
    except httpx.TimeoutException:
        return {"url": url, "title": "", "text": "", "error": "Trang tải quá lâu (hết thời gian chờ)."}
    except httpx.HTTPError as exc:
        return {"url": url, "title": "", "text": "", "error": f"Không tải được trang: {exc}"}
    except Exception as exc:  # noqa: BLE001 — không được làm hỏng cả lượt chat
        return {"url": url, "title": "", "text": "", "error": f"Lỗi không xác định: {exc}"}

    try:
        soup = BeautifulSoup(html, "html.parser")
        for tag in soup(["script", "style", "nav", "footer", "header", "noscript", "svg"]):
            tag.decompose()
        title = (soup.title.string or "").strip() if soup.title else ""
        text = soup.get_text(separator="\n", strip=True)
        text = re.sub(r"\n{3,}", "\n\n", text)
    except Exception as exc:  # noqa: BLE001
        return {"url": url, "title": "", "text": "", "error": f"Không tách được nội dung: {exc}"}

    if not text:
        return {"url": url, "title": title, "text": "", "error": "Trang không có nội dung chữ đọc được."}
    return {"url": url, "title": title or url, "text": text[:MAX_TEXT_CHARS], "error": ""}


def build_context(pages: list[dict]) -> str:
    """Ghép nội dung các trang đã đọc thành khối ngữ cảnh cho bộ não."""
    blocks = []
    for p in pages:
        if p.get("error"):
            continue
        blocks.append(f"--- Trang: {p['title']} ({p['url']}) ---\n{p['text']}")
    if not blocks:
        return ""
    return "\n\n[NỘI DUNG TRANG WEB người dùng gửi link — trích dẫn nguồn khi dùng thông tin này:\n" \
        + "\n\n".join(blocks) + "\n]"
