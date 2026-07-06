"""
✦ LUMINA AI — Cấu hình trung tâm
Đọc toàn bộ cấu hình từ biến môi trường (không hardcode secret).
Kiến trúc kế thừa khung mẫu "Unified AI Core" (PHẦN 1), model ID cập nhật 2026.
"""

import os


def _bool(name: str, default: bool = False) -> bool:
    return os.getenv(name, str(default)).strip().lower() in ("1", "true", "yes", "on")


CONFIG = {
    # ── Thương hiệu ─────────────────────────────────────────────
    "APP_NAME": "LUMINA AI",
    "APP_TAGLINE": "Tư duy sâu, tri thức rộng",
    "APP_VERSION": "1.0.0",

    # ── Claude (bộ não chính — BẮT BUỘC) ────────────────────────
    "ANTHROPIC_API_KEY": os.getenv("ANTHROPIC_API_KEY", ""),
    # Model ID hiện hành (KHÔNG thêm hậu tố ngày tháng)
    "CLAUDE_MODEL_DEEP": "claude-opus-4-8",      # tư duy sâu, code, phân tích
    "CLAUDE_MODEL_APEX": "claude-fable-5",       # đỉnh cao (bật qua ENABLE_FABLE)
    "CLAUDE_MODEL_BALANCED": "claude-sonnet-5",  # cân bằng tốc độ/chất lượng
    "CLAUDE_MODEL_FAST": "claude-haiku-4-5",     # nhanh, tiết kiệm
    "ENABLE_FABLE": _bool("ENABLE_FABLE", False),

    # ── Gemini / OpenAI (engine phụ — TÙY CHỌN, tự bật khi có key)
    "GEMINI_API_KEY": os.getenv("GEMINI_API_KEY", ""),
    "GEMINI_MODEL": os.getenv("GEMINI_MODEL", "gemini-2.5-pro"),
    "OPENAI_API_KEY": os.getenv("OPENAI_API_KEY", ""),
    "OPENAI_MODEL": os.getenv("OPENAI_MODEL", "gpt-4o"),

    # ── Tìm kiếm cho engine phụ (Claude có web search tích hợp sẵn)
    "TAVILY_API_KEY": os.getenv("TAVILY_API_KEY", ""),

    # ── Đăng nhập Google (BẮT BUỘC khi chạy công khai) ──────────
    "GOOGLE_CLIENT_ID": os.getenv("GOOGLE_CLIENT_ID", ""),
    "SECRET_KEY": os.getenv("SECRET_KEY", ""),
    "SESSION_TTL_HOURS": int(os.getenv("SESSION_TTL_HOURS", "720")),  # 30 ngày
    # DEV_MODE=true: cho phép đăng nhập khách khi chưa cấu hình Google
    # (chỉ dùng khi chạy thử trên máy — đừng bật trên web công khai)
    "DEV_MODE": _bool("DEV_MODE", False),

    # ── Độ bền / hiệu năng (kế thừa khung mẫu) ──────────────────
    "FALLBACK_CHAIN": ["claude", "gemini", "openai"],
    "CIRCUIT_BREAKER_THRESHOLD": int(os.getenv("CIRCUIT_BREAKER_THRESHOLD", "5")),
    "CIRCUIT_BREAKER_TIMEOUT": int(os.getenv("CIRCUIT_BREAKER_TIMEOUT", "60")),
    "CACHE_TTL": int(os.getenv("CACHE_TTL", "3600")),
    "MAX_CONTEXT_TOKENS": int(os.getenv("MAX_CONTEXT_TOKENS", "160000")),
    "MAX_PAUSE_TURN_CONTINUATIONS": 5,

    # Giới hạn lượt theo người dùng (token bucket) — bảo vệ API key
    # (đây là giới hạn của gói MIỄN PHÍ; gói trả phí dùng PLANS["monthly"/"yearly"] bên dưới)
    "RATE_LIMIT_REQUESTS_PER_MINUTE": int(os.getenv("RATE_LIMIT_RPM", "10")),
    "RATE_LIMIT_BURST": int(os.getenv("RATE_LIMIT_BURST", "15")),

    # ── Lưu trữ ─────────────────────────────────────────────────
    "DB_PATH": os.getenv("DB_PATH", os.path.join(os.path.dirname(__file__), "..", "data", "lumina.db")),

    "LOG_LEVEL": os.getenv("LOG_LEVEL", "INFO"),

    # ── Quản trị (tạo mã kích hoạt gói trả phí) ──────────────────
    # Danh sách email được quyền vào trang quản trị, cách nhau bởi dấu phẩy
    "ADMIN_EMAILS": [e.strip().lower() for e in os.getenv("ADMIN_EMAILS", "").split(",") if e.strip()],

    # ── Thông tin chuyển khoản thủ công (hiển thị khi người dùng nâng cấp) ──
    # Vì chưa tích hợp cổng thanh toán tự động (VNPay/PayOS/Momo), người dùng
    # chuyển khoản thủ công theo thông tin này, bạn xác nhận rồi tạo mã kích
    # hoạt gửi cho họ qua trang /admin.
    "PAYMENT_BANK_NAME": os.getenv("PAYMENT_BANK_NAME", ""),
    "PAYMENT_BANK_ACCOUNT": os.getenv("PAYMENT_BANK_ACCOUNT", ""),
    "PAYMENT_BANK_OWNER": os.getenv("PAYMENT_BANK_OWNER", ""),
    "PAYMENT_MOMO": os.getenv("PAYMENT_MOMO", ""),
    "PAYMENT_NOTE": os.getenv("PAYMENT_NOTE", "Ghi nội dung chuyển khoản: email đăng nhập của bạn"),
}

# ── Định nghĩa các gói ───────────────────────────────────────────
# Sửa giá/giới hạn tại đây cho phù hợp — đây chỉ là gợi ý mặc định.
PLANS: dict[str, dict] = {
    "free": {
        "key": "free",
        "label": "Miễn phí",
        "price_vnd": 0,
        "duration_days": 0,          # 0 = không hết hạn (mặc định của mọi tài khoản)
        "rpm": CONFIG["RATE_LIMIT_REQUESTS_PER_MINUTE"],
        "burst": CONFIG["RATE_LIMIT_BURST"],
        # Mặc định RẤT thấp có chủ đích — ngân sách API ban đầu nhỏ, chỉ đủ cho
        # khách dùng thử 1-2 lượt rồi phải mua gói mới chat tiếp được. Tăng dần
        # qua FREE_DAILY_CAP trong .env khi ngân sách API rộng hơn.
        "daily_message_cap": int(os.getenv("FREE_DAILY_CAP", "2")),
        "apex_allowed": False,
        "features": [
            "⚡ Phản hồi nhanh / ✨ Cân bằng / 🧠 Tư duy sâu / 🔍 Tìm kiếm web",
            f"Dùng thử {os.getenv('FREE_DAILY_CAP', '2')} tin nhắn / ngày",
        ],
    },
    "monthly": {
        "key": "monthly",
        "label": "Gói Tháng",
        "price_vnd": int(os.getenv("PRICE_MONTHLY_VND", "79000")),
        "duration_days": 30,
        "rpm": int(os.getenv("PAID_RPM", "30")),
        "burst": int(os.getenv("PAID_BURST", "50")),
        "daily_message_cap": int(os.getenv("PAID_DAILY_CAP", "500")),
        "apex_allowed": True,
        "features": [
            "Mọi tính năng gói Miễn phí",
            f"Tối đa {os.getenv('PAID_DAILY_CAP', '500')} tin nhắn / ngày",
            "Mở khóa 🌌 Đỉnh cao (Fable) cho tác vụ khó nhất",
            "Ưu tiên xử lý, phản hồi nhanh hơn",
        ],
    },
    "yearly": {
        "key": "yearly",
        "label": "Gói Năm",
        "price_vnd": int(os.getenv("PRICE_YEARLY_VND", "690000")),
        "duration_days": 365,
        "rpm": int(os.getenv("PAID_RPM", "30")),
        "burst": int(os.getenv("PAID_BURST", "50")),
        "daily_message_cap": int(os.getenv("PAID_DAILY_CAP", "500")),
        "apex_allowed": True,
        "features": [
            "Mọi tính năng gói Tháng",
            "Tiết kiệm ~27% so với đóng theo tháng",
        ],
    },
}


def validate_config() -> list[str]:
    """Trả về danh sách cảnh báo cấu hình (không chặn khởi động)."""
    warnings = []
    if not CONFIG["ANTHROPIC_API_KEY"]:
        warnings.append("Thiếu ANTHROPIC_API_KEY — LUMINA chưa thể trả lời. Lấy key tại https://console.anthropic.com")
    if not CONFIG["GOOGLE_CLIENT_ID"] and not CONFIG["DEV_MODE"]:
        warnings.append("Thiếu GOOGLE_CLIENT_ID — không ai đăng nhập được. Tạo tại https://console.cloud.google.com (hoặc đặt DEV_MODE=true khi chạy thử).")
    if not CONFIG["SECRET_KEY"]:
        warnings.append("Thiếu SECRET_KEY — phiên đăng nhập sẽ mất khi khởi động lại (đang dùng key ngẫu nhiên tạm).")
    return warnings
