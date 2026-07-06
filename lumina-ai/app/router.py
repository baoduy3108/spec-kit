"""✦ LUMINA AI — Auto-Router "bù trừ" (trái tim của hệ thống).

Kế thừa PHẦN 12 khung mẫu và mở rộng: người dùng KHÔNG chọn model.
Router đọc câu lệnh, đoán ý định và tự chọn chế độ tối ưu:

  ⚡ fast     — câu ngắn/chào hỏi        → claude-haiku-4-5 (nhanh, tiết kiệm)
  ✨ balanced — trò chuyện thông thường   → claude-sonnet-5
  🧠 deep     — code / toán / phân tích   → claude-opus-4-8 + effort cao
  🔍 search   — cần thông tin mới từ web  → claude-opus-4-8 + web search tool
  🌌 apex     — tác vụ khó nhất           → claude-fable-5 (khi ENABLE_FABLE=true)

Engine lỗi liên tiếp → circuit breaker mở → fallback chain claude → gemini → openai.
"""

import re

from .config import CONFIG
from .schemas import RouteDecision

# ── Bộ nhận dạng ý định (tiếng Việt + tiếng Anh) ────────────────────────────

_SEARCH_PATTERNS = [
    r"\btìm kiếm\b", r"\btra cứu\b", r"\bsearch\b", r"\bgoogle\b",
    r"\bmới nhất\b", r"\bhôm nay\b", r"\bhiện tại\b", r"\bhiện nay\b",
    r"\btin tức\b", r"\bthời sự\b", r"\bcập nhật\b", r"\bgiá\b.*\b(vàng|đô|usd|bitcoin|btc|cổ phiếu|xăng)\b",
    r"\bthời tiết\b", r"\btỷ giá\b", r"\bkết quả\b.*\b(trận|bóng|xổ số)\b",
    r"\blatest\b", r"\btoday\b", r"\bcurrent\b", r"\bnews\b", r"\bnăm 202[5-9]\b",
    r"\blà ai\b", r"\bwho is\b", r"\bxảy ra\b",
]

_DEEP_PATTERNS = [
    r"\bcode\b", r"\blập trình\b", r"\bviết hàm\b", r"\bfunction\b", r"\bdebug\b",
    r"\bsửa lỗi\b", r"\bbug\b", r"\bpython\b", r"\bjavascript\b", r"\bjava\b", r"\bc\+\+\b",
    r"\bsql\b", r"\bhtml\b", r"\bcss\b", r"\bapi\b", r"\bthuật toán\b", r"\balgorithm\b",
    r"\bphân tích\b", r"\bchứng minh\b", r"\bgiải\b.*\b(toán|phương trình|bài)\b",
    r"\btính\b.*\d", r"\bso sánh chi tiết\b", r"\bthiết kế hệ thống\b", r"\bkiến trúc\b",
    r"\bviết bài luận\b", r"\bnghiên cứu\b", r"\bdịch\b.*\bvăn bản\b",
    r"\bexplain\b.*\bdetail\b", r"\bstep by step\b", r"\btừng bước\b",
]

_APEX_PATTERNS = [
    r"\bcực khó\b", r"\bphức tạp\b", r"\bsuy luận sâu\b", r"\btư duy sâu\b",
    r"\bnghĩ kỹ\b", r"\bdeep think\b", r"\bhardest\b", r"\btoàn diện\b",
    r"\bviết cả (dự án|chương trình|hệ thống)\b",
]

_search_re = [re.compile(p, re.IGNORECASE) for p in _SEARCH_PATTERNS]
_deep_re = [re.compile(p, re.IGNORECASE) for p in _DEEP_PATTERNS]
_apex_re = [re.compile(p, re.IGNORECASE) for p in _APEX_PATTERNS]


def _matches(regexes: list[re.Pattern], text: str) -> bool:
    return any(r.search(text) for r in regexes)


def decide_route(message: str, history_len: int = 0, apex_allowed: bool = True) -> RouteDecision:
    """Phân loại câu lệnh và trả về quyết định định tuyến.

    apex_allowed: gói của người dùng có được dùng chế độ 🌌 Đỉnh cao (Fable)
    không — gói Miễn phí sẽ False, gói Tháng/Năm True. Khi câu hỏi đáng lẽ
    dùng Đỉnh cao nhưng người dùng chưa được phép, hạ xuống 🧠 Tư duy sâu và
    đánh dấu apex_locked để giao diện gợi ý nâng cấp.
    """
    text = message.strip()

    # 1) Cần thông tin từ web → ưu tiên cao nhất (search + AI phân tích)
    if _matches(_search_re, text):
        return RouteDecision(
            mode="search", label="🔍 Tìm kiếm web",
            model=CONFIG["CLAUDE_MODEL_DEEP"], use_web_search=True, effort="high",
        )

    # 2) Tác vụ khó nhất → Fable 5 (nếu được bật và gói cho phép)
    wants_apex = CONFIG["ENABLE_FABLE"] and (_matches(_apex_re, text) or len(text) > 4000)
    if wants_apex and apex_allowed:
        return RouteDecision(
            mode="apex", label="🌌 Đỉnh cao",
            model=CONFIG["CLAUDE_MODEL_APEX"], use_web_search=True, effort="high",
        )
    if wants_apex and not apex_allowed:
        return RouteDecision(
            mode="deep", label="🧠 Tư duy sâu",
            model=CONFIG["CLAUDE_MODEL_DEEP"], effort="high", apex_locked=True,
        )

    # 3) Code / toán / phân tích → tư duy sâu
    if _matches(_deep_re, text) or len(text) > 1200:
        return RouteDecision(
            mode="deep", label="🧠 Tư duy sâu",
            model=CONFIG["CLAUDE_MODEL_DEEP"], effort="high",
        )

    # 4) Câu rất ngắn / chào hỏi → phản hồi nhanh
    if len(text) < 60 and history_len == 0:
        return RouteDecision(
            mode="fast", label="⚡ Phản hồi nhanh",
            model=CONFIG["CLAUDE_MODEL_FAST"],
        )

    # 5) Mặc định: cân bằng
    return RouteDecision(
        mode="balanced", label="✨ Cân bằng",
        model=CONFIG["CLAUDE_MODEL_BALANCED"],
    )
