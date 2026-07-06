"""✦ LUMINA AI — Data models (kế thừa PHẦN 3 khung mẫu, chuyển sang Pydantic)."""

from typing import Any, Optional

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: str  # "user" | "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=32000)
    conversation_id: Optional[str] = None


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
