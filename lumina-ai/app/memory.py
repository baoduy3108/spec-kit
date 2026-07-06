"""✦ LUMINA AI — Bộ nhớ ngữ cảnh sliding-window (kế thừa PHẦN 4 khung mẫu).

API là stateless — mỗi lượt chat gửi lại toàn bộ lịch sử. Lớp này cắt lịch sử
cho vừa cửa sổ ngữ cảnh, ưu tiên giữ các tin nhắn mới nhất.
"""


def estimate_tokens(text: str) -> int:
    # Ước lượng nhanh ~4 ký tự / token (đủ dùng để cắt cửa sổ, không dùng để tính tiền)
    return max(1, len(text) // 4)


def trim_history(messages: list[dict], max_tokens: int) -> list[dict]:
    """Giữ lại đuôi lịch sử sao cho tổng token ước lượng <= max_tokens.

    messages: [{"role": "user"|"assistant", "content": str}, ...]
    Luôn giữ ít nhất tin nhắn cuối cùng (lượt hỏi hiện tại).
    """
    if not messages:
        return []
    kept: list[dict] = []
    total = 0
    for msg in reversed(messages):
        cost = estimate_tokens(msg.get("content") or "")
        if kept and total + cost > max_tokens:
            break
        kept.append(msg)
        total += cost
    kept.reverse()
    # API yêu cầu tin nhắn đầu tiên là "user" — bỏ assistant mồ côi ở đầu
    while kept and kept[0]["role"] != "user":
        kept.pop(0)
    return kept
