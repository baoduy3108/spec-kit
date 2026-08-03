"""✦ LUMINA AI — Xoay vòng nhiều API key cho một nhà cung cấp.

Chủ web có thể điền GROQ_API_KEYS=key1,key2,...,key15 (hoặc GEMINI_API_KEYS,
OPENROUTER_API_KEYS...) để GỘP hạn mức FREE của nhiều tài khoản. Module này giữ
điểm bắt đầu round-robin cho từng nhà cung cấp (bền qua các request trong cùng
tiến trình) để:

  1. Cân bằng tải — mỗi request bắt đầu ở một key khác nhau, không dồn hết vào key đầu.
  2. Chuyển tiếp khi lỗi — nếu key hiện tại 429 (hết lượt) / 401-403 (hỏng),
     engine thử lần lượt các key còn lại theo thứ tự này.

Chỉ là bộ đếm trong RAM (không cần DB) — an toàn luồng bằng Lock. Reset khi khởi
động lại tiến trình (không sao — chỉ là điểm cân bằng tải, không phải trạng thái
quan trọng).
"""

import threading

_counters: dict[str, int] = {}
_lock = threading.Lock()


def rotation_order(provider: str, n: int) -> list[int]:
    """Trả về thứ tự chỉ số key để thử (0..n-1), bắt đầu từ điểm round-robin hiện
    tại của `provider`, rồi tự tăng điểm bắt đầu cho lần gọi sau.

    Ví dụ n=3: lần 1 → [0,1,2], lần 2 → [1,2,0], lần 3 → [2,0,1], lần 4 → [0,1,2]...
    Engine thử key theo đúng thứ tự này, dừng ở key đầu tiên trả lời thành công.
    """
    if n <= 0:
        return []
    if n == 1:
        return [0]
    with _lock:
        start = _counters.get(provider, 0) % n
        _counters[provider] = (start + 1) % n
    return [(start + i) % n for i in range(n)]


def reset() -> None:
    """Xóa toàn bộ bộ đếm (dùng cho test)."""
    with _lock:
        _counters.clear()
