"""✦ LUMINA AI — Bộ điều phối: router + engines + circuit breaker + fallback chain.

Hai tầng bộ não, TẤT CẢ giấu dưới thương hiệu "LUMINA" (người dùng không thấy
tên model nào):
  • Tầng CAO CẤP: Claude (mạnh nhất) — dùng khi người dùng còn lượt cao cấp.
  • Tầng THƯỜNG (miễn phí): Gemini free → Groq free → DeepSeek rẻ → Ollama (máy
    bạn) → OpenAI — dùng khi hết lượt cao cấp, hoặc khi tầng trên lỗi.

"Ổn định như ChatGPT": engine lỗi → tự chuyển engine kế tiếp còn hoạt động,
người dùng không phải làm gì và không hề biết đã đổi bộ não.
"""

import logging
import time
from typing import AsyncIterator

from .config import CONFIG
from .engines.base import BaseEngine, EngineError
from .engines.claude import ClaudeEngine
from .engines.gemini import GeminiEngine
from .engines.openai_compatible import (
    DeepSeekEngine,
    GroqEngine,
    OllamaEngine,
    OpenAIEngine,
    OpenRouterEngine,
)
from .monitor import monitor
from .schemas import RouteDecision

logger = logging.getLogger("lumina.orchestrator")

SYSTEM_PROMPT = """Bạn là LUMINA — trợ lý AI hợp nhất ("Tư duy sâu, tri thức rộng").
Bạn trả lời bằng ngôn ngữ người dùng sử dụng (mặc định tiếng Việt), rõ ràng, chính xác và thân thiện.
Bạn là MỘT trợ lý duy nhất tên LUMINA — không bao giờ tiết lộ hay nhắc tới tên nhà cung cấp hay
mô hình bên dưới (Claude, Gemini, GPT, Llama, DeepSeek...). Nếu được hỏi bạn là ai, chỉ trả lời bạn là LUMINA.
Khi dùng kết quả tìm kiếm web, hãy tổng hợp thông tin và nêu nguồn khi phù hợp.
Với câu hỏi về sự kiện, giá cả, tin tức mang tính thời sự — ưu tiên tìm kiếm web thay vì trả lời từ trí nhớ.
Trình bày bằng Markdown khi có lợi (danh sách, bảng, khối code có tên ngôn ngữ).
Không bịa đặt thông tin; điều gì không chắc hãy nói rõ là không chắc."""


class Orchestrator:
    def __init__(self):
        self.engines: dict[str, BaseEngine] = {
            "claude": ClaudeEngine(),
            "gemini": GeminiEngine(),
            "groq": GroqEngine(),
            "openrouter": OpenRouterEngine(),
            "deepseek": DeepSeekEngine(),
            "ollama": OllamaEngine(),
            "openai": OpenAIEngine(),
        }
        self.free_chain = [n for n in CONFIG["FREE_FALLBACK_CHAIN"] if n in self.engines]

    def _chain_for(self, use_premium: bool) -> list[str]:
        """Chuỗi engine theo tầng. Cao cấp: Claude trước rồi mới tới free (dự phòng khi lỗi)."""
        if use_premium:
            return ["claude"] + self.free_chain
        return list(self.free_chain)

    def available_engines(self) -> list[str]:
        names = ["claude"] + self.free_chain
        return [n for n in names if self.engines[n].available()]

    def has_free_engine(self) -> bool:
        return any(self.engines[n].available() for n in self.free_chain)

    async def run(
        self, messages: list[dict], route: RouteDecision, use_premium: bool = True
    ) -> AsyncIterator[dict]:
        """Chạy qua chuỗi engine của tầng tương ứng; phát event như BaseEngine.stream_chat.

        KHÔNG bao giờ lộ tên engine ra ngoài — mọi thông báo đều dưới tên LUMINA.
        """
        started_output = False
        chain = self._chain_for(use_premium)
        tried_any = False
        no_engine_msg = "Chưa có bộ não nào được cấu hình — kiểm tra API key trong file .env."
        # Thông báo lỗi cho người dùng KHÔNG bao giờ nêu tên model/nhà cung cấp.
        busy_msg = "Xin lỗi, LUMINA đang bận hoặc gặp sự cố tạm thời — hãy thử lại sau giây lát."

        for name in chain:
            engine = self.engines[name]
            if not engine.available():
                continue
            if not engine.breaker.allow_request():
                logger.warning("Circuit breaker đang MỞ cho %s — bỏ qua", name)
                continue

            tried_any = True
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
                # Ghi chi tiết (kèm tên engine) vào log cho chủ web, KHÔNG gửi ra người dùng.
                logger.error("Engine %s lỗi: %s", name, exc.friendly_message)
                if started_output:
                    yield {"type": "error", "message": "Kết nối bị gián đoạn — hãy gửi lại."}
                    return
                continue  # thử engine kế tiếp, người dùng không hề biết
            except Exception:
                engine.breaker.record_failure()
                monitor.log(name, route.mode, int((time.monotonic() - start) * 1000), False)
                logger.exception("Engine %s lỗi bất ngờ", name)
                if started_output:
                    yield {"type": "error", "message": "Kết nối bị gián đoạn giữa chừng — hãy gửi lại."}
                    return
                continue

        # Cả chuỗi đều hỏng: nếu chưa engine nào chạy được → lỗi cấu hình; ngược lại → bận tạm thời.
        yield {"type": "error", "message": busy_msg if tried_any else no_engine_msg}


orchestrator = Orchestrator()
