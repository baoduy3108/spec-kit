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
    "RATE_LIMIT_REQUESTS_PER_MINUTE": int(os.getenv("RATE_LIMIT_RPM", "10")),
    "RATE_LIMIT_BURST": int(os.getenv("RATE_LIMIT_BURST", "15")),

    # ── Lưu trữ ─────────────────────────────────────────────────
    "DB_PATH": os.getenv("DB_PATH", os.path.join(os.path.dirname(__file__), "..", "data", "lumina.db")),

    "LOG_LEVEL": os.getenv("LOG_LEVEL", "INFO"),
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
