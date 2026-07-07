"""
✦ LUMINA AI — Cấu hình trung tâm
Đọc toàn bộ cấu hình từ biến môi trường (không hardcode secret).
Kiến trúc kế thừa khung mẫu "Unified AI Core" (PHẦN 1), model ID cập nhật 2026.
"""

import os

# Tự động nạp file .env (nếu có) ở thư mục lumina-ai — người dùng chỉ cần tạo .env
# và chạy, KHỎI phải gõ lệnh export. Trên Render thì dùng biến môi trường của Render.
try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))
except ImportError:
    pass  # chưa cài python-dotenv cũng không sao — vẫn đọc biến môi trường bình thường


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

    # ── Engine MIỄN PHÍ / RẺ (tự bật khi có key) ────────────────
    # Khi người dùng hết lượt cao cấp (Claude), LUMINA tự tụt xuống các engine
    # này để vẫn trả lời được mà không tốn tiền — tất cả giấu dưới tên "LUMINA".
    "GEMINI_API_KEY": os.getenv("GEMINI_API_KEY", ""),   # gói FREE tại aistudio.google.com
    "GEMINI_MODEL": os.getenv("GEMINI_MODEL", "gemini-2.5-flash"),
    "GROQ_API_KEY": os.getenv("GROQ_API_KEY", ""),       # FREE tại console.groq.com
    "GROQ_MODEL": os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile"),
    "GROQ_BASE_URL": "https://api.groq.com/openai/v1",
    "OPENROUTER_API_KEY": os.getenv("OPENROUTER_API_KEY", ""),  # FREE (nhiều model) tại openrouter.ai/keys
    "OPENROUTER_MODEL": os.getenv("OPENROUTER_MODEL", "meta-llama/llama-3.3-70b-instruct:free"),
    "OPENROUTER_BASE_URL": "https://openrouter.ai/api/v1",
    "DEEPSEEK_API_KEY": os.getenv("DEEPSEEK_API_KEY", ""),  # cực rẻ tại platform.deepseek.com
    "DEEPSEEK_MODEL": os.getenv("DEEPSEEK_MODEL", "deepseek-chat"),
    "DEEPSEEK_BASE_URL": "https://api.deepseek.com/v1",
    "OLLAMA_BASE_URL": os.getenv("OLLAMA_BASE_URL", ""),  # ví dụ http://localhost:11434/v1 (model chạy trên máy bạn)
    "OLLAMA_MODEL": os.getenv("OLLAMA_MODEL", "llama3.1"),
    "OPENAI_API_KEY": os.getenv("OPENAI_API_KEY", ""),
    "OPENAI_MODEL": os.getenv("OPENAI_MODEL", "gpt-4o"),
    "OPENAI_BASE_URL": "https://api.openai.com/v1",

    # ── Tìm kiếm cho engine phụ (Claude/Gemini có web search tích hợp sẵn)
    "TAVILY_API_KEY": os.getenv("TAVILY_API_KEY", ""),

    # ── Đăng nhập Google (BẮT BUỘC khi chạy công khai) ──────────
    "GOOGLE_CLIENT_ID": os.getenv("GOOGLE_CLIENT_ID", ""),
    "SECRET_KEY": os.getenv("SECRET_KEY", ""),
    "SESSION_TTL_HOURS": int(os.getenv("SESSION_TTL_HOURS", "720")),  # 30 ngày
    # DEV_MODE=true: cho phép đăng nhập khách khi chưa cấu hình Google
    # (chỉ dùng khi chạy thử trên máy — đừng bật trên web công khai)
    "DEV_MODE": _bool("DEV_MODE", False),

    # ── Độ bền / hiệu năng (kế thừa khung mẫu) ──────────────────
    # Chuỗi engine MIỄN PHÍ/RẺ — dùng khi hết lượt cao cấp hoặc khi engine chính lỗi.
    # Thứ tự ưu tiên: Gemini free → Groq free → DeepSeek rẻ → Ollama (máy bạn) → OpenAI.
    "FREE_FALLBACK_CHAIN": ["gemini", "groq", "openrouter", "deepseek", "ollama", "openai"],
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

    # ── Thanh toán TỰ ĐỘNG ──────────────────────────────────────
    # (A) SePay — khách VN quét VietQR chuyển khoản, tiền về thẳng tài khoản bạn.
    #     Đăng ký free tại sepay.vn → nối ngân hàng → lấy API key (dùng xác thực webhook).
    "SEPAY_API_KEY": os.getenv("SEPAY_API_KEY", ""),
    "PAYMENT_BANK_BIN": os.getenv("PAYMENT_BANK_BIN", ""),      # mã BIN ngân hàng cho VietQR (vd 970436 = Vietcombank)
    "PAYMENT_BANK_ACCOUNT": os.getenv("PAYMENT_BANK_ACCOUNT", ""),
    "PAYMENT_BANK_OWNER": os.getenv("PAYMENT_BANK_OWNER", ""),  # tên chủ TK, IN HOA không dấu
    "PAYMENT_BANK_NAME": os.getenv("PAYMENT_BANK_NAME", ""),    # tên ngân hàng hiển thị

    # (B) PayPal — khách quốc tế trả thẻ/PayPal, tiền về thẳng PayPal của bạn.
    #     Tạo REST App tại developer.paypal.com → lấy Client ID + Secret.
    "PAYPAL_CLIENT_ID": os.getenv("PAYPAL_CLIENT_ID", ""),
    "PAYPAL_SECRET": os.getenv("PAYPAL_SECRET", ""),
    "PAYPAL_MODE": os.getenv("PAYPAL_MODE", "live"),           # "live" hoặc "sandbox" (test)

    # Đơn hàng hết hạn sau (phút) nếu chưa thanh toán
    "ORDER_TTL_MINUTES": int(os.getenv("ORDER_TTL_MINUTES", "30")),
}

# ── Định nghĩa các gói ───────────────────────────────────────────
# CÁCH HOẠT ĐỘNG (giấu model dưới thương hiệu LUMINA — người dùng không thấy tên model):
#   • premium_daily_cap  = số lượt "cao cấp" mỗi ngày dùng bộ não mạnh nhất (Claude).
#   • Hết lượt cao cấp → LUMINA TỰ tụt xuống chuỗi engine MIỄN PHÍ (Gemini/Groq/
#     DeepSeek/Ollama) — người dùng vẫn chat tiếp được, không bị chặn cứng.
#   • total_daily_cap    = tổng số tin nhắn/ngày (kể cả engine free) — chặn lạm dụng.
#   • Gói trả phí = NHIỀU lượt cao cấp hơn + tổng lượt cao hơn (chỉ là "thêm token").
# Sửa giá/giới hạn tại đây hoặc qua biến môi trường.
PLANS: dict[str, dict] = {
    "free": {
        "key": "free",
        "label": "Miễn phí",
        "price_vnd": 0,
        "price_usd": 0.0,
        "duration_days": 0,          # 0 = không hết hạn (mặc định của mọi tài khoản)
        "rpm": CONFIG["RATE_LIMIT_REQUESTS_PER_MINUTE"],
        "burst": CONFIG["RATE_LIMIT_BURST"],
        # Lượt cao cấp (Claude) rất thấp có chủ đích — bảo vệ ngân sách API nhỏ.
        # Hết lượt này thì chuyển sang engine free, vẫn chat được.
        "premium_daily_cap": int(os.getenv("FREE_PREMIUM_CAP", "3")),
        "total_daily_cap": int(os.getenv("FREE_TOTAL_CAP", "120")),
        "apex_allowed": False,
        # KHÔNG hiển thị con số giới hạn cho gói Miễn phí (tránh làm người dùng ngại).
        "features": [
            "Trò chuyện thoải mái mỗi ngày với LUMINA",
            "Tự động chọn bộ não tốt nhất cho từng câu hỏi",
            "Xem ảnh · vẽ ảnh · tìm kiếm web · nghiên cứu sâu",
        ],
    },
    "monthly": {
        "key": "monthly",
        "label": "Gói Tháng",
        "price_vnd": int(os.getenv("PRICE_MONTHLY_VND", "500000")),
        "price_usd": float(os.getenv("PRICE_MONTHLY_USD", "20")),
        "duration_days": 30,
        "rpm": int(os.getenv("PAID_RPM", "30")),
        "burst": int(os.getenv("PAID_BURST", "50")),
        "premium_daily_cap": int(os.getenv("PAID_PREMIUM_CAP", "200")),
        "total_daily_cap": int(os.getenv("PAID_TOTAL_CAP", "1000")),
        "apex_allowed": True,
        "features": [
            f"{os.getenv('PAID_PREMIUM_CAP', '200')} lượt bộ não cao cấp / ngày (gấp nhiều lần gói Miễn phí)",
            f"Tối đa {os.getenv('PAID_TOTAL_CAP', '1000')} tin nhắn / ngày",
            "Mở khóa chế độ 🌌 Đỉnh cao cho tác vụ khó nhất",
            "Ưu tiên xử lý, phản hồi nhanh hơn",
        ],
    },
    "yearly": {
        "key": "yearly",
        "label": "Gói Năm",
        "price_vnd": int(os.getenv("PRICE_YEARLY_VND", "5000000")),
        "price_usd": float(os.getenv("PRICE_YEARLY_USD", "200")),
        "duration_days": 365,
        "rpm": int(os.getenv("PAID_RPM", "30")),
        "burst": int(os.getenv("PAID_BURST", "50")),
        "premium_daily_cap": int(os.getenv("PAID_PREMIUM_CAP", "200")),
        "total_daily_cap": int(os.getenv("PAID_TOTAL_CAP", "2000")),
        "apex_allowed": True,
        "features": [
            "Mọi tính năng gói Tháng",
            "Tổng lượt/ngày cao gấp đôi",
            "Tiết kiệm ~27% so với đóng theo tháng",
        ],
    },
}


def has_any_engine() -> bool:
    """Có ít nhất một bộ não được cấu hình không (cao cấp hoặc free)."""
    return bool(
        CONFIG["ANTHROPIC_API_KEY"] or CONFIG["GEMINI_API_KEY"] or CONFIG["GROQ_API_KEY"]
        or CONFIG["OPENROUTER_API_KEY"] or CONFIG["DEEPSEEK_API_KEY"]
        or CONFIG["OLLAMA_BASE_URL"] or CONFIG["OPENAI_API_KEY"]
    )


def sepay_enabled() -> bool:
    """SePay (chuyển khoản VN) đã cấu hình đủ để nhận thanh toán chưa."""
    return bool(CONFIG["SEPAY_API_KEY"] and CONFIG["PAYMENT_BANK_BIN"] and CONFIG["PAYMENT_BANK_ACCOUNT"])


def paypal_enabled() -> bool:
    """PayPal (thẻ quốc tế) đã cấu hình chưa."""
    return bool(CONFIG["PAYPAL_CLIENT_ID"] and CONFIG["PAYPAL_SECRET"])


def paypal_api_base() -> str:
    return "https://api-m.paypal.com" if CONFIG["PAYPAL_MODE"] == "live" else "https://api-m.sandbox.paypal.com"


def validate_config() -> list[str]:
    """Trả về danh sách cảnh báo cấu hình (không chặn khởi động)."""
    warnings = []
    if not has_any_engine():
        warnings.append("Chưa có bộ não nào — điền ít nhất một key: ANTHROPIC_API_KEY (cao cấp) "
                        "hoặc GEMINI_API_KEY / GROQ_API_KEY (miễn phí). Xem README.")
    elif not CONFIG["ANTHROPIC_API_KEY"]:
        warnings.append("Chưa có ANTHROPIC_API_KEY — LUMINA sẽ chạy hoàn toàn bằng bộ não miễn phí "
                        "(Gemini/Groq/DeepSeek/Ollama). Thêm Claude nếu muốn chất lượng cao nhất.")
    if not CONFIG["GOOGLE_CLIENT_ID"] and not CONFIG["DEV_MODE"]:
        warnings.append("Thiếu GOOGLE_CLIENT_ID — không ai đăng nhập được. Tạo tại https://console.cloud.google.com (hoặc đặt DEV_MODE=true khi chạy thử).")
    if not CONFIG["SECRET_KEY"]:
        warnings.append("Thiếu SECRET_KEY — phiên đăng nhập sẽ mất khi khởi động lại (đang dùng key ngẫu nhiên tạm).")
    return warnings
