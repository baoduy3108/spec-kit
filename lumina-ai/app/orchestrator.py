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
from .imagegen import generate_image
from .media import has_images
from .monitor import monitor
from .schemas import RouteDecision

logger = logging.getLogger("lumina.orchestrator")

# Bộ não "nhìn" được ảnh (đa phương thức). Groq/DeepSeek/Ollama chỉ đọc chữ.
_VISION_ENGINES = {"claude", "gemini"}

# Chỉ thị thêm khi người dùng yêu cầu 🔬 Nghiên cứu sâu — buộc bộ não tìm nhiều
# nguồn, đối chiếu và viết báo cáo có cấu trúc kèm trích dẫn.
_RESEARCH_DIRECTIVE = (
    "\n\n[Chế độ NGHIÊN CỨU SÂU: Hãy tìm kiếm web nhiều lần từ nhiều góc độ khác nhau, "
    "đối chiếu các nguồn, và viết một BÁO CÁO có cấu trúc rõ ràng (mở đầu, các phần chính "
    "với tiêu đề, kết luận). Trích dẫn nguồn cho mọi thông tin quan trọng.]"
)

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

    async def _run_image_gen(self, messages: list[dict]) -> AsyncIterator[dict]:
        """🎨 Vẽ ảnh — không dùng bộ não chat, gọi dịch vụ tạo ảnh (miễn phí/ DALL-E)."""
        prompt = ""
        for m in reversed(messages):
            if m.get("role") == "user" and m.get("content"):
                prompt = m["content"]
                break
        yield {"type": "search_status", "tool": "image_gen", "query": prompt[:80]}
        result = await generate_image(prompt)
        # Đẩy về cả sự kiện ảnh (hiển thị ngay) lẫn text markdown (lưu lại, tải lại vẫn thấy).
        yield {"type": "image", "url": result["url"], "prompt": result["prompt"]}
        yield {"type": "text",
               "text": f'🎨 Đây là ảnh LUMINA vẽ theo yêu cầu **"{result["prompt"]}"**:\n\n'
                       f'![{result["prompt"]}]({result["url"]})'}
        yield {"type": "final", "usage": {}, "stop_reason": "end_turn"}

    async def run(
        self, messages: list[dict], route: RouteDecision, use_premium: bool = True
    ) -> AsyncIterator[dict]:
        """Chạy qua chuỗi engine của tầng tương ứng; phát event như BaseEngine.stream_chat.

        KHÔNG bao giờ lộ tên engine ra ngoài — mọi thông báo đều dưới tên LUMINA.
        """
        # 🎨 Chế độ vẽ ảnh — xử lý riêng, không qua bộ não chat.
        if route.mode == "image_gen":
            async for event in self._run_image_gen(messages):
                yield event
            return

        # 🔬 Chế độ nghiên cứu sâu — chèn chỉ thị vào câu hỏi cuối để bộ não tìm nhiều nguồn.
        if route.mode == "research":
            messages = list(messages)
            for i in range(len(messages) - 1, -1, -1):
                if messages[i].get("role") == "user":
                    messages[i] = {**messages[i], "content": messages[i]["content"] + _RESEARCH_DIRECTIVE}
                    break

        started_output = False
        chain = self._chain_for(use_premium)
        # Có ảnh đính kèm → chỉ dùng bộ não "nhìn" được (Claude/Gemini).
        if has_images(messages):
            chain = [n for n in chain if n in _VISION_ENGINES]
        tried_any = False
        no_engine_msg = "Chưa có bộ não nào được cấu hình — kiểm tra API key trong file .env."
        # Thông báo lỗi cho người dùng KHÔNG bao giờ nêu tên model/nhà cung cấp.
        busy_msg = "Xin lỗi, LUMINA đang bận hoặc gặp sự cố tạm thời — hãy thử lại sau giây lát."
        if not chain:
            yield {"type": "error", "message":
                   "Để LUMINA xem được ảnh, cần bật bộ não Gemini (miễn phí) hoặc Claude — "
                   "kiểm tra API key trong file .env."}
            return

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
