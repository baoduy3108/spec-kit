"""✦ LUMINA AI — Open Library: tra cứu SÁCH thật (miễn phí, không cần key).

Bổ sung cho knowledge.py: câu hỏi về một CUỐN SÁCH / TÁC GIẢ (vd "sách Đắc Nhân
Tâm của ai", "tác giả cuốn Nhà Giả Kim", "tiểu thuyết 1984") được trả lời bằng
METADATA THẬT từ Open Library (openlibrary.org) — tựa, tác giả, năm xuất bản đầu,
số ấn bản, chủ đề — thay vì phỏng đoán từ trọng số model.

Mỗi lần lấy được ta LƯU vào kho tri thức (knowledge.remember) → kho sách của LUMINA
dày lên. Có cache RAM (TTL). Best-effort: lỗi/không mạng → None, chat vẫn chạy.
"""

from __future__ import annotations

import logging
import time

import httpx

logger = logging.getLogger("lumina.openlibrary")

_TTL = 24 * 3600  # metadata sách gần như bất biến → cache 1 ngày
_cache: dict[str, tuple[float, dict]] = {}

# Dấu hiệu câu hỏi về SÁCH (Việt + Anh). Cần ít nhất một từ mới kích hoạt.
_BOOK_CUES = (
    "cuốn sách", "quyển sách", "cuốn tiểu thuyết", "tiểu thuyết", "tác giả",
    "tác phẩm", "đầu sách", "sách", "book by", "author of", "novel", "who wrote",
    "ai viết", "ai là tác giả", "xuất bản năm nào", "cuốn", "quyển",
)
# Chặn nhầm: các từ có "sách"/"cuốn" nhưng KHÔNG phải hỏi tra cứu sách.
_BOOK_ANTI = ("sách lược", "chính sách", "sạch sẽ")


def is_book_query(query: str) -> bool:
    """Câu hỏi có VẺ hỏi về một cuốn sách/tác giả (để quyết định gọi Open Library)."""
    q = (query or "").lower()
    if any(a in q for a in _BOOK_ANTI):
        # còn cứu được nếu có từ khoá sách rõ ràng khác
        if not any(c in q for c in ("cuốn sách", "quyển sách", "tiểu thuyết", "tác giả", "tác phẩm")):
            return False
    return any(c in q for c in _BOOK_CUES)


def _clean(query: str) -> str:
    """Bỏ vài cụm hỏi để tăng khớp tựa/tác giả khi tìm Open Library."""
    q = (query or "").strip()
    for junk in ("là ai", "của ai", "ai viết", "ai là tác giả", "xuất bản năm nào",
                 "cho tôi biết", "hãy", "?", "cuốn sách", "quyển sách"):
        q = q.replace(junk, " ")
    return " ".join(q.split())[:120]


def _parse_book(doc: dict, lang: str = "vi") -> dict | None:
    """1 doc từ Open Library search.json → 'fact' hợp knowledge.remember."""
    try:
        title = (doc.get("title") or "").strip()
        if not title:
            return None
        authors = ", ".join((doc.get("author_name") or [])[:3]) or "?"
        year = doc.get("first_publish_year")
        editions = doc.get("edition_count")
        subjects = ", ".join((doc.get("subject") or [])[:5])
        key = doc.get("key") or ""
        url = f"https://openlibrary.org{key}" if key else "https://openlibrary.org"
        parts = [f"“{title}”"]
        parts.append(f"tác giả {authors}")
        if isinstance(year, int):
            parts.append(f"xuất bản đầu năm {year}")
        if isinstance(editions, int) and editions:
            parts.append(f"{editions} ấn bản")
        if subjects:
            parts.append(f"chủ đề: {subjects}")
        summary = "; ".join(parts) + "."
        return {
            "topic": title.lower(),
            "summary": summary,
            "url": url,
            "source": "openlibrary",
            "lang": lang,
        }
    except Exception:  # noqa: BLE001
        return None


async def fetch_book(query: str, lang: str = "vi") -> dict | None:
    """Tra Open Library search.json (miễn phí, không key), cache TTL. Best-effort."""
    q = _clean(query)
    if not q:
        return None
    key = q.lower()
    now = time.time()
    hit = _cache.get(key)
    if hit and now - hit[0] < _TTL:
        return hit[1]
    url = "https://openlibrary.org/search.json"
    params = {
        "q": q, "limit": "1",
        "fields": "title,author_name,first_publish_year,edition_count,subject,key",
    }
    try:
        async with httpx.AsyncClient(timeout=10, headers={"User-Agent": "LUMINA-AI/1.0"}) as client:
            resp = await client.get(url, params=params)
            resp.raise_for_status()
            data = resp.json()
            docs = data.get("docs") or []
            if not docs:
                return None
            fact = _parse_book(docs[0], lang)
            if fact:
                _cache[key] = (now, fact)
            return fact
    except Exception as exc:  # noqa: BLE001 — nguồn phụ, hỏng thì bỏ qua êm
        logger.debug("Open Library '%s' lỗi: %s", q, exc)
        return None


async def gather(query: str, lang: str = "vi") -> dict | None:
    """Điểm vào cho knowledge.gather: câu hỏi về sách → metadata thật, else None."""
    if not is_book_query(query):
        return None
    return await fetch_book(query, lang)
