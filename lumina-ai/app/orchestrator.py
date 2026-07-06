"""✦ LUMINA AI — Bộ điều phối: router + engines + circuit breaker + fallback chain.

"Ổn định như ChatGPT": engine chính lỗi → tự chuyển engine dự phòng còn key,
người dùng không phải làm gì.
"""

import logging
import time
from typing import AsyncIterator

from .config import CONFIG
from .engines.base import BaseEngine, EngineError
from .engines.claude import ClaudeEngine
from .engines.gemini import GeminiEngine
from .engines.openai_engine import OpenAIEngine
from .monitor import monitor
from .schemas import RouteDecision

logger = logging.getLogger("lumina.orchestrator")

SYSTEM_PROMPT = """Bạn là LUMINA — trợ lý AI hợp nhất ("Tư duy sâu, tri thức rộng").
Bạn trả lời bằng ngôn ngữ người dùng sử dụng (mặc định tiếng Việt), rõ ràng, chính xác và thân thiện.
Khi dùng kết quả tìm kiếm web, hãy tổng hợp thông tin và nêu nguồn khi phù hợp.
Với câu hỏi về sự kiện, giá cả, tin tức mang tính thời sự — ưu tiên tìm kiếm web thay vì trả lời từ trí nhớ.
Trình bày bằng Markdown khi có lợi (danh sách, bảng, khối code có tên ngôn ngữ).
Không bịa đặt thông tin; điều gì không chắc hãy nói rõ là không chắc."""


class Orchestrator:
    def __init__(self):
        self.engines: dict[str, BaseEngine] = {
            "claude": ClaudeEngine(),
            "gemini": GeminiEngine(),
            "openai": OpenAIEngine(),
        }
        self.chain = CONFIG["FALLBACK_CHAIN"]

    def available_engines(self) -> list[str]:
        return [name for name in self.chain if self.engines[name].available()]

    async def run(
        self, messages: list[dict], route: RouteDecision
    ) -> AsyncIterator[dict]:
        """Chạy qua fallback chain; phát event dict như BaseEngine.stream_chat."""
        started_output = False
        last_error = "Chưa có engine nào được cấu hình — kiểm tra API key trong file .env."

        for idx, name in enumerate(self.chain):
            engine = self.engines[name]
            if not engine.available():
                continue
            if not engine.breaker.allow_request():
                logger.warning("Circuit breaker đang MỞ cho %s — bỏ qua", name)
                continue

            if idx > 0 or name != "claude":
                yield {"type": "router", "notice": f"Đang dùng engine dự phòng: {name}"}

            start = time.monotonic()
            try:
                async for event in engine.stream_chat(messages, route, SYSTEM_PROMPT):
                    if event["type"] in ("text", "thinking"):
                        started_output = True
                    yield event
                engine.breaker.record_success()
                monitor.log(name, route.mode, int((time.monotonic() - start) * 1000), True)
                return
            except EngineError as exc:
                engine.breaker.record_failure()
                monitor.log(name, route.mode, int((time.monotonic() - start) * 1000), False)
                last_error = exc.friendly_message
                logger.error("Engine %s lỗi: %s", name, exc.friendly_message)
                if started_output:
                    # Đã phát một phần nội dung — không thể chuyển engine giữa chừng
                    yield {"type": "error", "message": f"Kết nối bị gián đoạn: {exc.friendly_message}"}
                    return
                # Chưa phát gì → thử engine kế tiếp trong chain
                continue
            except Exception as exc:  # lỗi bất ngờ — vẫn phải fallback được
                engine.breaker.record_failure()
                monitor.log(name, route.mode, int((time.monotonic() - start) * 1000), False)
                logger.exception("Engine %s lỗi bất ngờ", name)
                last_error = "Lỗi hệ thống không xác định."
                if started_output:
                    yield {"type": "error", "message": "Kết nối bị gián đoạn giữa chừng — hãy gửi lại."}
                    return
                continue

        yield {"type": "error", "message": last_error}


orchestrator = Orchestrator()
