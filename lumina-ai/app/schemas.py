"""✦ LUMINA AI — Data models (kế thừa PHẦN 3 khung mẫu, chuyển sang Pydantic)."""

from typing import Any, Optional

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: str  # "user" | "assistant"
    content: str


class FileAttachment(BaseModel):
    name: str = ""
    data_url: str = ""  # data:<mime>;base64,...


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=32000)
    conversation_id: Optional[str] = None
    # Gán hội thoại mới vào một project (mặt bàn riêng). None → không thuộc project nào.
    project_id: Optional[str] = None
    # Chat với một Agent tùy chỉnh (persona người dùng tạo). None → LUMINA mặc định.
    agent_id: Optional[str] = None
    # Ảnh đính kèm (data URL base64) để LUMINA "xem" — tối đa 4 tấm cho 1 lượt.
    images: list[str] = Field(default_factory=list, max_length=4)
    # Video đính kèm (data URL base64, chỉ Gemini xem được) — tối đa 1 video/lượt.
    videos: list[str] = Field(default_factory=list, max_length=1)
    # Tệp đính kèm (PDF/Word/Excel/txt) — tối đa 3 tệp/lượt.
    files: list[FileAttachment] = Field(default_factory=list, max_length=3)
    # Ép chế độ từ nút bấm ở giao diện: "image" (vẽ ảnh) | "research" (nghiên cứu sâu)
    # | "subtitle" (tạo phụ đề/transcript từ video) | "agent" (⚙️ Lumina Forge — tự co giãn:
    # gọn cho việc nhỏ, đủ 6 giai đoạn cho việc lớn). None → Router tự đoán.
    mode: Optional[str] = None


class ComposeRequest(BaseModel):
    """📚 Tổng hợp nhiều tệp thành 1 FILE mới (đọc → nghĩ → tổng hợp → xuất file)."""
    # Tệp nguồn (PDF/Word/Excel/txt) để LUMINA đọc và tổng hợp — tối đa 3 tệp.
    files: list[FileAttachment] = Field(default_factory=list, max_length=3)
    # Yêu cầu/ý muốn của người dùng (vd "tổng hợp thành một cuốn sách mạch lạc").
    instruction: str = Field(default="", max_length=8000)
    # Tiêu đề của tài liệu/sách đầu ra.
    title: str = Field(default="Tài liệu tổng hợp", max_length=300)
    # Định dạng file xuất ra: "docx" (khuyên dùng, mọi ngôn ngữ) | "pdf" | "html".
    format: str = "docx"


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
    mode: str            # fast | balanced | deep | search | apex | image_gen | research | subtitle | agent
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


class DubRequest(BaseModel):
    video: str = Field(min_length=1)          # data URL base64
    target_lang: str = "vi"                    # ngôn ngữ lồng tiếng: vi | en
    burn_subtitles: bool = True                 # có gắn phụ đề cứng vào video không
