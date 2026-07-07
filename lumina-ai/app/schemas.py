"""✦ LUMINA AI — Data models (kế thừa PHẦN 3 khung mẫu, chuyển sang Pydantic)."""

from typing import Any, Optional

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: str  # "user" | "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=32000)
    conversation_id: Optional[str] = None
    # Ảnh đính kèm (data URL base64) để LUMINA "xem" — tối đa 4 tấm cho 1 lượt.
    images: list[str] = Field(default_factory=list, max_length=4)
    # Ép chế độ từ nút bấm ở giao diện: "image" (vẽ ảnh) | "research" (nghiên cứu sâu).
    # None → Router tự đoán theo nội dung câu hỏi.
    mode: Optional[str] = None


class SearchResult(BaseModel):
    title: str = ""
    url: str = ""
    snippet: str = ""
    source: str = ""


class Citation(BaseModel):
    title: str = ""
    url: str = ""


class EngineReply(BaseModel):
    """Kết quả cuối cùng từ một engine (dùng cho engine phụ không stream)."""
    content: str
    provider: str
    model: str
    citations: list[Citation] = []
    usage: dict[str, Any] = {}


class RouteDecision(BaseModel):
    """Quyết định của Auto-Router 'bù trừ'."""
    mode: str            # fast | deep | search | apex
    label: str           # nhãn hiển thị trên UI, ví dụ "🧠 Tư duy sâu"
    model: str           # model ID thực tế
    use_web_search: bool = False
    effort: Optional[str] = None  # None | "high"
    apex_locked: bool = False     # câu hỏi đáng lẽ dùng Đỉnh cao nhưng gói chưa cho phép


class PlanInfo(BaseModel):
    key: str
    label: str
    price_vnd: int
    duration_days: int
    rpm: int
    burst: int
    price_usd: float = 0.0
    premium_daily_cap: int
    total_daily_cap: int
    apex_allowed: bool
    features: list[str] = []
    expires_at: int = 0


class CreateOrderRequest(BaseModel):
    plan: str       # monthly | yearly
    provider: str   # sepay | paypal


class PaypalCaptureRequest(BaseModel):
    paypal_order_id: str
