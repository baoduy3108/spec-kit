"""✦ LUMINA AI — Kho tri thức nội bộ (RAG-lite): "học dần" từ nguồn mở, giảm token.

Ý tưởng của chủ web: không thể tải cả Wikipedia/CommonCrawl (hàng TB→PB) về web
free, nhưng làm được bản THÔNG MINH hơn — kho tri thức TỰ LỚN DẦN:

  1. Người dùng hỏi câu kiến thức → tra KHO NỘI BỘ trước (file trong thư mục
     data/, đọc từ đĩa = 0 token, 0 mạng).
  2. Kho chưa có → gọi Wikipedia API (MIỄN PHÍ, không cần key, tiếng Việt →
     tiếng Anh) → LƯU vào kho → lần sau ai hỏi lại là có sẵn.
  3. Tư liệu được đưa vào ngữ cảnh cho bộ não KÈM LINK NGUỒN, với chỉ thị
     ĐỐI CHIẾU CHÉO — vì Wikipedia ai cũng sửa được nên không tin mù quáng:
     bộ não phải so với kiến thức đã huấn luyện + kết quả tìm kiếm, thấy
     mâu thuẫn thì nói rõ.

Tiết kiệm token thật: bộ não nhận tư liệu cô đọng sẵn → ít vòng tìm kiếm
hơn, trả lời ngắn gọn đúng trọng tâm hơn; chủ đề hỏi lại nhiều thì đọc thẳng
từ đĩa không tốn lượt tìm kiếm nào.
"""

import logging
import os
import re
import sqlite3
import threading
import time
import urllib.parse

import httpx

from .config import CONFIG

logger = logging.getLogger("lumina.knowledge")

_conn: sqlite3.Connection | None = None
_lock = threading.RLock()

# Tư liệu để lâu sẽ cũ (nhất là số liệu) — quá hạn thì bỏ qua và tra lại.
MAX_AGE_DAYS = 90

# Từ dừng tiếng Việt/Anh tối giản — bỏ khi rút từ khóa chủ đề.
_STOPWORDS = {
    "là", "gì", "của", "và", "các", "những", "một", "cho", "với", "về", "có",
    "không", "như", "thế", "nào", "tại", "sao", "vì", "ai", "ở", "đâu", "bao",
    "nhiêu", "hãy", "giúp", "mình", "tôi", "bạn", "cái", "này", "đó", "được",
    "the", "a", "an", "is", "are", "what", "who", "where", "when", "why", "how",
    "of", "in", "on", "to", "and", "or", "for", "about", "tell", "me",
}


def _get_conn() -> sqlite3.Connection:
    global _conn
    with _lock:
        if _conn is None:
            path = os.path.join(os.path.dirname(os.path.abspath(CONFIG["DB_PATH"])), "knowledge.db")
            os.makedirs(os.path.dirname(path), exist_ok=True)
            _conn = sqlite3.connect(path, check_same_thread=False)
            _conn.execute(
                """CREATE TABLE IF NOT EXISTS facts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    topic TEXT NOT NULL,           -- tiêu đề chủ đề (thường hóa)
                    summary TEXT NOT NULL,         -- đoạn tóm tắt tri thức
                    url TEXT DEFAULT '',           -- link nguồn để trích dẫn
                    source TEXT DEFAULT '',        -- wikipedia | manual | ...
                    lang TEXT DEFAULT 'vi',
                    created_at INTEGER NOT NULL
                )"""
            )
            _conn.execute("CREATE INDEX IF NOT EXISTS idx_facts_topic ON facts(topic)")
            _conn.commit()
        return _conn


def extract_keywords(query: str, max_keywords: int = 6) -> list[str]:
    """Rút từ khóa chủ đề từ câu hỏi (bỏ từ dừng, giữ từ >=2 ký tự)."""
    words = re.findall(r"[\wÀ-ỹ]+", (query or "").lower())
    seen: list[str] = []
    for w in words:
        if len(w) >= 2 and w not in _STOPWORDS and w not in seen:
            seen.append(w)
        if len(seen) >= max_keywords:
            break
    return seen


def remember(topic: str, summary: str, url: str = "", source: str = "manual", lang: str = "vi") -> None:
    """Lưu một mẩu tri thức vào kho (bỏ qua nếu chủ đề+nguồn đã có)."""
    topic = (topic or "").strip().lower()
    summary = (summary or "").strip()
    if not topic or not summary:
        return
    conn = _get_conn()
    with _lock:
        row = conn.execute(
            "SELECT id FROM facts WHERE topic = ? AND source = ?", (topic, source)
        ).fetchone()
        if row:  # cập nhật bản mới nhất thay vì nhân bản
            conn.execute(
                "UPDATE facts SET summary = ?, url = ?, lang = ?, created_at = ? WHERE id = ?",
                (summary[:3000], url, lang, int(time.time()), row[0]),
            )
        else:
            conn.execute(
                "INSERT INTO facts (topic, summary, url, source, lang, created_at) VALUES (?,?,?,?,?,?)",
                (topic, summary[:3000], url, source, lang, int(time.time())),
            )
        conn.commit()


def lookup_local(query: str, limit: int = 3) -> list[dict]:
    """Tra kho nội bộ theo từ khóa — đọc từ đĩa, 0 token, 0 mạng."""
    keywords = extract_keywords(query)
    if not keywords:
        return []
    conn = _get_conn()
    cutoff = int(time.time()) - MAX_AGE_DAYS * 86400
    scored: dict[int, tuple[int, dict]] = {}
    with _lock:
        for kw in keywords:
            rows = conn.execute(
                "SELECT id, topic, summary, url, source FROM facts "
                "WHERE topic LIKE ? AND created_at >= ? LIMIT 20",
                (f"%{kw}%", cutoff),
            ).fetchall()
            for fid, topic, summary, url, source in rows:
                score, item = scored.get(fid, (0, {"topic": topic, "summary": summary,
                                                   "url": url, "source": source}))
                scored[fid] = (score + 1, item)
    ranked = sorted(scored.values(), key=lambda x: -x[0])
    return [item for _, item in ranked[:limit]]


async def _fetch_wikipedia(query: str, lang: str) -> dict | None:
    """Tìm bài Wikipedia khớp nhất và lấy đoạn tóm tắt (API miễn phí, không key)."""
    base = f"https://{lang}.wikipedia.org"
    try:
        async with httpx.AsyncClient(timeout=10, headers={"User-Agent": "LUMINA-AI/1.0"}) as client:
            # 1) Tìm tiêu đề bài khớp nhất
            resp = await client.get(
                f"{base}/w/api.php",
                params={"action": "opensearch", "search": query, "limit": 1, "format": "json"},
            )
            resp.raise_for_status()
            titles = resp.json()[1] if len(resp.json()) > 1 else []
            if not titles:
                return None
            title = titles[0]
            # 2) Lấy tóm tắt bài đó
            resp = await client.get(f"{base}/api/rest_v1/page/summary/{urllib.parse.quote(title)}")
            resp.raise_for_status()
            data = resp.json()
            extract = (data.get("extract") or "").strip()
            if not extract:
                return None
            return {
                "topic": title.lower(),
                "summary": extract,
                "url": data.get("content_urls", {}).get("desktop", {}).get("page", ""),
                "source": "wikipedia",
                "lang": lang,
            }
    except Exception as exc:  # noqa: BLE001 — nguồn phụ, hỏng thì bỏ qua êm
        logger.debug("Wikipedia %s lỗi: %s", lang, exc)
        return None


async def gather(query: str, max_items: int = 3) -> list[dict]:
    """Thu thập tư liệu: kho nội bộ trước (0 token) → Wikipedia (miễn phí) → lưu kho.

    Không bao giờ raise — nguồn tri thức là phụ trợ, hỏng thì trả về rỗng
    và bộ não vẫn tự trả lời/tìm kiếm như thường.
    """
    query = (query or "").strip()
    if len(query) < 4:
        return []
    items = lookup_local(query, limit=max_items)
    if items:
        return items
    # Kho chưa có → "học" từ Wikipedia (tiếng Việt trước, thiếu thì tiếng Anh)
    for lang in ("vi", "en"):
        fact = await _fetch_wikipedia(query[:100], lang)
        if fact:
            remember(**fact)
            return [fact]
    return []


def build_context(items: list[dict]) -> str:
    """Ghép tư liệu thành khối ngữ cảnh cho bộ não — kèm chỉ thị ĐỐI CHIẾU CHÉO
    (Wikipedia ai cũng sửa được nên không được tin mù quáng)."""
    if not items:
        return ""
    lines = []
    for it in items:
        src = f" (nguồn: {it['url']})" if it.get("url") else ""
        lines.append(f"• {it['topic']}: {it['summary'][:800]}{src}")
    return (
        "\n\n[TƯ LIỆU THAM KHẢO từ kho tri thức mở — LƯU Ý: nguồn cộng đồng có thể bị "
        "sửa sai, hãy ĐỐI CHIẾU với hiểu biết của bạn và kết quả tìm kiếm; nếu mâu thuẫn "
        "hãy nói rõ. Trích link nguồn khi dùng:\n" + "\n".join(lines) + "\n]"
    )


def stats() -> dict:
    """Thống kê kho (cho trang quản trị/tò mò)."""
    conn = _get_conn()
    with _lock:
        total = conn.execute("SELECT COUNT(*) FROM facts").fetchone()[0]
    return {"facts": total}
