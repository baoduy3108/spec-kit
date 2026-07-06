"""✦ LUMINA AI — Engine trừu tượng (kế thừa PHẦN 6 khung mẫu)."""

from abc import ABC, abstractmethod
from typing import AsyncIterator

from ..circuit_breaker import CircuitBreaker
from ..config import CONFIG
from ..schemas import RouteDecision


class EngineError(Exception):
    """Lỗi engine kèm thông báo thân thiện cho người dùng."""

    def __init__(self, friendly_message: str, retryable: bool = True):
        super().__init__(friendly_message)
        self.friendly_message = friendly_message
        self.retryable = retryable


class BaseEngine(ABC):
    """Mỗi engine nhận (messages, route) và phát ra chuỗi event dict:

    {"type": "thinking", "text": ...}     — tóm tắt tư duy (delta)
    {"type": "text", "text": ...}         — nội dung trả lời (delta)
    {"type": "search_status", "query"}    — đang tìm kiếm web
    {"type": "citations", "items": [...]} — nguồn trích dẫn
    {"type": "final", "usage": {...}}     — kết thúc thành công
    """

    name = "base"

    def __init__(self):
        self.breaker = CircuitBreaker(
            threshold=CONFIG["CIRCUIT_BREAKER_THRESHOLD"],
            timeout=CONFIG["CIRCUIT_BREAKER_TIMEOUT"],
        )

    @abstractmethod
    def available(self) -> bool:
        """Engine có key/cấu hình để hoạt động không."""

    @abstractmethod
    def stream_chat(
        self, messages: list[dict], route: RouteDecision, system: str
    ) -> AsyncIterator[dict]:
        """Sinh chuỗi event; raise EngineError khi thất bại."""
