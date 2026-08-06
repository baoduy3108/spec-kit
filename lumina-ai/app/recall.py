"""✦ LUMINA AI — Trí nhớ dài hạn: nhớ lại các hội thoại CŨ khi mở cuộc trò chuyện MỚI.

Vấn đề: mỗi hội thoại trong sidebar bị cô lập — LUMINA chỉ thấy tin nhắn trong
đúng hội thoại đang mở. Mở hội thoại mới thì "quên sạch" mọi thứ đã trao đổi
trước đó, người dùng phải nhắc lại từ đầu.

Giải pháp (giống ý tưởng RAG-lite ở knowledge.py, nhưng tìm trên CHÍNH lịch sử
chat của người dùng thay vì Wikipedia): câu hỏi đầu tiên của hội thoại mới →
tìm từ khóa trong các hội thoại cũ của CHÍNH người dùng đó → nếu khớp, âm thầm
đưa đoạn liên quan vào ngữ cảnh. Không tốn API ngoài (chỉ là câu SQL nội bộ),
không lộ dữ liệu giữa các người dùng khác nhau (luôn lọc theo user_id ở db.py).
"""

from . import db
from .knowledge import extract_keywords

MAX_SNIPPET_CHARS = 400


def gather(user_id: str, query: str, exclude_conv_id: str = "", limit_conversations: int = 3) -> list[dict]:
    """Tìm các đoạn liên quan trong hội thoại CŨ của người dùng. Không bao giờ raise."""
    try:
        keywords = extract_keywords(query, max_keywords=6)
        rows = db.search_messages(user_id, keywords, exclude_conv_id=exclude_conv_id)
    except Exception:  # noqa: BLE001 — trí nhớ là tính năng phụ trợ, hỏng thì bỏ qua êm
        return []
    if not rows:
        return []

    # Gộp theo hội thoại, tính điểm bằng tổng số từ khóa khớp trong hội thoại đó,
    # chọn tin nhắn khớp nhiều nhất làm đoạn trích tiêu biểu cho hội thoại.
    best_per_conv: dict[str, dict] = {}
    for row in rows:
        content_lower = row["content"].lower()
        score = sum(1 for kw in keywords if kw in content_lower)
        conv_id = row["conversation_id"]
        current = best_per_conv.get(conv_id)
        if current is None or score > current["_score"]:
            best_per_conv[conv_id] = {**row, "_score": score}

    ranked = sorted(best_per_conv.values(), key=lambda r: -r["_score"])[:limit_conversations]
    return [
        {
            "conversation_id": r["conversation_id"],
            "title": r["title"] or "(không tiêu đề)",
            "role": r["role"],
            "snippet": r["content"][:MAX_SNIPPET_CHARS],
            "created_at": r["created_at"],
        }
        for r in ranked
    ]


def build_context(items: list[dict]) -> str:
    """Ghép các đoạn nhớ lại thành khối ngữ cảnh cho bộ não — không hiện ra UI dạng thô."""
    if not items:
        return ""
    lines = []
    for it in items:
        who = "Người dùng từng hỏi" if it["role"] == "user" else "Bạn (LUMINA) từng trả lời"
        lines.append(f"• [Hội thoại \"{it['title']}\"] {who}: {it['snippet']}")
    return (
        "\n\n[TRÍ NHỚ — trích từ các cuộc trò chuyện TRƯỚC ĐÂY của CHÍNH người dùng này "
        "(không phải hội thoại hiện tại). Dùng nếu liên quan tới câu hỏi mới; đừng nhắc lại "
        "nếu không liên quan; không bịa thêm chi tiết ngoài những gì được trích ở đây:\n"
        + "\n".join(lines) + "\n]"
    )
