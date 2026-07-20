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
# Tin tức cũ rất nhanh — hạn ngắn hơn nhiều.
NEWS_MAX_AGE_DAYS = 3

# ── TẦNG 1 (chống bịp): độ tin theo NGUỒN ───────────────────────────────────
# Mọi tri thức "học" được đều PHẢI kèm nhãn độ tin để bộ não biết tin tới đâu.
# Không nguồn nào được coi là chân lý tuyệt đối — nhất là Wikipedia (ai cũng sửa
# được) và tin tức (giật tít/thiên lệch/chưa kiểm chứng).
_SOURCE_TRUST = {
    "user":      ("⚠️ THẤP", "bạn cung cấp — CHƯA kiểm chứng, chỉ là bối cảnh, không phải sự thật đã xác minh"),
    "news":      ("⚠️ THẤP-VỪA", "tin tức thời gian thực — có thể sai/giật tít/thiên lệch/chưa xác nhận; PHẢI đối chiếu nhiều nguồn"),
    "wikipedia": ("◐ VỪA", "bách khoa cộng đồng — AI CŨNG SỬA ĐƯỢC nên có thể bị phá hoại/lỗi thời; đối chiếu trước khi tin"),
    "manual":    ("● KHÁ", "biên tập tuyển chọn sẵn"),
    "primary":   ("● CAO", "nguồn sơ cấp/chính thống"),
}


def source_trust(source: str) -> tuple[str, str]:
    """Trả (nhãn mức tin, mô tả) cho một nguồn — dùng ở Tầng 1 chống bịp."""
    return _SOURCE_TRUST.get((source or "").lower(), ("? KHÔNG RÕ", "nguồn không xác định — hết sức thận trọng"))


# Câu hỏi mang tính TIN TỨC/THỜI SỰ → kích hoạt học tin tức thời gian thực.
_NEWS_CUES = (
    "tin tức", "thời sự", "mới nhất", "gần đây", "hôm nay", "hôm qua", "hiện nay",
    "hiện tại", "cập nhật", "diễn biến", "sự kiện", "vừa xảy ra", "đang xảy ra",
    "news", "latest", "today", "breaking", "recent", "update",
)


def is_news_query(query: str) -> bool:
    """Câu hỏi có tính thời sự không (để bổ sung nguồn tin tức thời gian thực)."""
    low = (query or "").lower()
    if any(cue in low for cue in _NEWS_CUES):
        return True
    # Có năm gần đây (2024/2025/2026...) cũng coi là thời sự
    return bool(re.search(r"\b20(2[4-9]|3\d)\b", low))

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


# Cụm từ mệnh lệnh "dạy LUMINA" — người dùng chủ động cung cấp tri thức để AI tiếp thu.
# Phải nằm ở ĐẦU câu (mệnh lệnh) để tránh bắt nhầm "tôi không nhớ nổi"...
_TEACH_TRIGGERS = (
    "ghi nhớ rằng", "ghi nhớ là", "ghi nhớ:", "ghi nhớ ", "hãy nhớ rằng", "hãy nhớ là",
    "nhớ giúp tôi", "nhớ giùm", "nhớ dùm", "học điều này", "học kiến thức này",
    "lưu ý rằng", "remember that", "please remember", "note that",
)


def learn_from_user(text: str, source: str = "user") -> str | None:
    """"Dạy LUMINA": nếu người dùng RA LỆNH ghi nhớ một điều gì đó ở đầu câu, tách nội
    dung đó và lưu vào kho tri thức (source="user") để tái sử dụng ở các lượt sau —
    workflow tự tiến hoá theo kiến thức người dùng cung cấp. Trả về mẩu đã học, hoặc None.

    An toàn/khiêm tốn: chỉ kích hoạt khi có cụm mệnh lệnh rõ ràng ở ~20 ký tự đầu,
    nội dung đủ dài (≥8 ký tự). Không bao giờ raise (phụ trợ, hỏng thì bỏ qua)."""
    t = (text or "").strip()
    if len(t) < 10:
        return None
    low = t.lower()
    try:
        for trig in _TEACH_TRIGGERS:
            idx = low.find(trig)
            if idx != -1 and idx <= 20:  # mệnh lệnh phải ở đầu câu
                fact = t[idx + len(trig):].lstrip(" :,-–—\t").strip()
                if len(fact) >= 8:
                    kws = extract_keywords(fact, 6)
                    topic = " ".join(kws) if kws else fact[:60]
                    remember(topic=topic, summary=fact, source=source)
                    return fact[:160]
    except Exception:  # noqa: BLE001 — học từ người dùng là phụ trợ, không được làm hỏng chat
        return None
    return None


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


async def _fetch_news(query: str, lang: str = "vi", limit: int = 4) -> dict | None:
    """Học TIN TỨC THỜI GIAN THỰC từ Google News RSS (MIỄN PHÍ, không cần key) —
    tinh thần worldmonitor: theo dõi thời sự theo thời gian thực. Trả về một 'fact'
    gộp các tiêu đề mới nhất + link nguồn, source='news' (Tầng 1 = độ tin thấp-vừa).
    Best-effort, không bao giờ raise."""
    hl = "vi" if lang == "vi" else "en-US"
    gl = "VN" if lang == "vi" else "US"
    url = (
        "https://news.google.com/rss/search?q="
        + urllib.parse.quote(query)
        + f"&hl={hl}&gl={gl}&ceid={gl}:{hl.split('-')[0]}"
    )
    try:
        async with httpx.AsyncClient(timeout=10, headers={"User-Agent": "LUMINA-AI/1.0"}) as client:
            resp = await client.get(url)
            resp.raise_for_status()
            xml = resp.text
        # Parse RSS <item> tối giản bằng regex (tránh phụ thuộc thư viện XML).
        items = re.findall(r"<item>(.*?)</item>", xml, re.DOTALL)[:limit]
        headlines: list[str] = []
        first_link = ""
        for it in items:
            m_title = re.search(r"<title>(.*?)</title>", it, re.DOTALL)
            m_link = re.search(r"<link>(.*?)</link>", it, re.DOTALL)
            if not m_title:
                continue
            title = re.sub(r"<[^>]+>", "", m_title.group(1)).strip()
            title = title.replace("&amp;", "&").replace("&#39;", "'").replace("&quot;", '"')
            if title:
                headlines.append(f"– {title}")
                if not first_link and m_link:
                    first_link = m_link.group(1).strip()
        if not headlines:
            return None
        return {
            "topic": f"tin tức: {query[:60].lower()}",
            "summary": "Tiêu đề tin mới nhất (CHƯA kiểm chứng — đối chiếu nhiều nguồn):\n"
                       + "\n".join(headlines),
            "url": first_link or "https://news.google.com",
            "source": "news",
            "lang": lang,
        }
    except Exception as exc:  # noqa: BLE001 — nguồn phụ, hỏng thì bỏ qua êm
        logger.debug("News RSS lỗi: %s", exc)
        return None


async def gather(query: str, max_items: int = 3) -> list[dict]:
    """Thu thập tư liệu: kho nội bộ trước (0 token) → [tin tức nếu câu thời sự] →
    Wikipedia (miễn phí) → lưu kho. Mọi mẩu đều kèm nhãn NGUỒN để chống bịp.

    Không bao giờ raise — nguồn tri thức là phụ trợ, hỏng thì trả về rỗng
    và bộ não vẫn tự trả lời/tìm kiếm như thường.
    """
    query = (query or "").strip()
    if len(query) < 4:
        return []

    # Câu THỜI SỰ → luôn học tin mới (không cache lâu; tin tức cũ rất nhanh).
    if is_news_query(query):
        results: list[dict] = []
        news = await _fetch_news(query, "vi")
        if news:
            results.append(news)
        # Kèm nền tảng bách khoa để đối chiếu (Tầng 2) nếu kho đã có.
        local = lookup_local(query, limit=max_items - 1)
        results.extend(local)
        if results:
            return results[:max_items]

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
    """Ghép tư liệu thành khối ngữ cảnh, gắn HỆ THỐNG 3 TẦNG CHỐNG BỊP.

    Vì LUMINA học từ nguồn mở (Wikipedia ai cũng sửa được) + tin tức thời gian
    thực (giật tít/thiên lệch), tri thức "học" được KHÔNG được coi là chân lý.
    Ba tầng bảo vệ:
      • TẦNG 1 — Nhãn NGUỒN & độ tin: mỗi mẩu ghi rõ nguồn + mức tin.
      • TẦNG 2 — Đối chiếu chéo: bắt buộc xác chứng qua ≥2 nguồn độc lập; nêu rõ
        mâu thuẫn/đơn nguồn; tin tức chưa xác nhận phải nói là "chưa kiểm chứng".
      • TẦNG 3 — Phán đoán độc lập: đối chiếu với kiến thức đã huấn luyện + tìm
        kiếm trực tiếp; TUYỆT ĐỐI không trình bày điều chưa kiểm chứng như sự thật;
        thấy nghi ngờ/mâu thuẫn phải nói thẳng cho người dùng.
    """
    if not items:
        return ""
    lines = []
    for it in items:
        tier, desc = source_trust(it.get("source", ""))
        src = f" [link: {it['url']}]" if it.get("url") else ""
        lines.append(
            f"• ({tier} — {desc}) {it['topic']}: {it['summary'][:800]}{src}"
        )
    return (
        "\n\n[TƯ LIỆU LUMINA HỌC ĐƯỢC — áp dụng HỆ THỐNG 3 TẦNG CHỐNG BỊP, "
        "KHÔNG tin mù quáng bất kỳ mẩu nào:\n"
        "  ① NGUỒN & ĐỘ TIN — mỗi dòng đã ghi rõ mức tin (THẤP→CAO). Nguồn cộng "
        "đồng (Wikipedia) có thể bị phá hoại/lỗi thời; tin tức có thể sai/giật tít; "
        "điều người dùng dạy là bối cảnh CHƯA kiểm chứng.\n"
        "  ② ĐỐI CHIẾU CHÉO — chỉ khẳng định khi có ≥2 nguồn độc lập ủng hộ; nếu "
        "chỉ 1 nguồn hoặc các nguồn mâu thuẫn → nói rõ 'chưa chắc chắn/đang tranh cãi'; "
        "tin tức chưa được xác nhận phải gắn nhãn 'chưa kiểm chứng'.\n"
        "  ③ PHÁN ĐOÁN ĐỘC LẬP — đối chiếu với hiểu biết của bạn + kết quả tìm kiếm; "
        "KHÔNG trình bày điều chưa kiểm chứng như sự thật; thấy nghi ngờ/mâu thuẫn/"
        "lỗi thời hãy nói thẳng. Trích link nguồn khi dùng.\n\n"
        + "\n".join(lines) + "\n]"
    )


def stats() -> dict:
    """Thống kê kho (cho trang quản trị/tò mò)."""
    conn = _get_conn()
    with _lock:
        total = conn.execute("SELECT COUNT(*) FROM facts").fetchone()[0]
    return {"facts": total}
