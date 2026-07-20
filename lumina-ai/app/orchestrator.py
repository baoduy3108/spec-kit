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
    GitHubModelsEngine,
    GroqEngine,
    OllamaEngine,
    OpenAIEngine,
    OpenRouterEngine,
)
from . import knowledge
from . import skills
from .imagegen import generate_image
from .media import has_images, has_videos
from .monitor import monitor
from .schemas import RouteDecision

logger = logging.getLogger("lumina.orchestrator")

# Bộ não "nhìn" được ảnh (đa phương thức). Groq/DeepSeek/Ollama chỉ đọc chữ.
_VISION_ENGINES = {"claude", "gemini"}
# Bộ não xem được VIDEO — hiện chỉ Gemini (Anthropic API chưa hỗ trợ video).
_VIDEO_ENGINES = {"gemini"}

# Chỉ thị thêm khi người dùng yêu cầu 🔬 Nghiên cứu sâu — buộc bộ não tìm nhiều
# nguồn, đối chiếu và viết báo cáo có cấu trúc kèm trích dẫn.
_RESEARCH_DIRECTIVE = (
    "\n\n[Chế độ NGHIÊN CỨU SÂU: Hãy tìm kiếm web nhiều lần từ nhiều góc độ khác nhau, "
    "đối chiếu các nguồn, và viết một BÁO CÁO có cấu trúc rõ ràng (mở đầu, các phần chính "
    "với tiêu đề, kết luận). Trích dẫn nguồn cho mọi thông tin quan trọng.]"
)

# Chỉ thị khi người dùng cần 📝 Phụ đề — buộc bộ não xuất transcript đúng
# định dạng SRT kèm mốc thời gian, để người dùng tải về dùng ngay.
_SUBTITLE_DIRECTIVE = (
    "\n\n[Chế độ TẠO PHỤ ĐỀ: Hãy nghe kỹ lời thoại/âm thanh trong video và xuất ra "
    "TOÀN BỘ transcript theo đúng định dạng phụ đề SRT chuẩn (số thứ tự, mốc thời gian "
    "dạng 00:00:01,000 --> 00:00:04,000, rồi tới câu thoại), đặt trong một khối code "
    "```srt ... ```. Nếu video có nhiều người nói, ghi rõ tên/nhân vật trước lời thoại "
    "nếu phân biệt được. Không thêm bình luận ngoài khối code.]"
)

# Chỉ thị khi người dùng bật ⚙️ Lumina Forge — TỰ CO GIÃN theo quy mô yêu cầu:
# việc nhỏ trả lời gọn ở mức chuyên gia (kiến trúc/bảo mật/test), việc lớn dùng
# đủ quy trình 6 giai đoạn (SPEC trước, code sau). Kèm THÀNH THẬT về việc không
# có quyền truy cập trực tiếp file hệ thống / kho mã nguồn của người dùng.
_AGENT_DIRECTIVE = (
    "\n\n[Chế độ LUMINA FORGE — trước tiên tự đánh giá quy mô yêu cầu:\n"
    "• NHỎ (1 hàm/đoạn code cụ thể, sửa lỗi nhỏ, giải thích, câu hỏi kỹ thuật đơn lẻ): trả lời "
    "TRỰC TIẾP, KHÔNG dùng tiêu đề PHASE, nhưng vẫn giữ chất lượng kỹ sư cấp cao:\n"
    "  1. Nếu chưa rõ ngôn ngữ/framework, chọn lựa phù hợp nhất với ngữ cảnh và nêu rõ vì sao "
    "(hỗ trợ tốt: Python, TypeScript, JavaScript, Rust, Go, Java, C#, C++, SQL, Bash).\n"
    "  2. Code đúng convention/idiom chuẩn của ngôn ngữ đó, đặt tên rõ ràng, xử lý lỗi hợp lý — "
    "không thêm phần thừa ngoài phạm vi yêu cầu.\n"
    "  3. Chủ động nêu rủi ro bảo mật liên quan (injection, auth, input không tin cậy, secret lộ "
    "ra client...) nếu có, và cách kiểm thử/edge case cần lưu ý.\n"
    "  4. Nếu liên quan Docker/CI-CD, đưa kèm Dockerfile/pipeline mẫu súc tích. Nếu liên quan "
    "Prompt Engineering, áp dụng best practice hiện hành (system/user tách biệt, ví dụ cụ thể).\n"
    "• LỚN (≥2 file/thành phần, kiến trúc hệ thống, API, database, AI Agent/MCP/RAG/Vector DB, "
    "tính năng nhiều bước): trình bày theo đúng 6 giai đoạn, mỗi giai đoạn một tiêu đề riêng:\n"
    "  PHASE 1 — SPEC ANALYSIS: mục tiêu, phạm vi, ràng buộc, dependency, thành phần bị ảnh "
    "hưởng — chỉ dựa trên những gì đã có trong cuộc trò chuyện này.\n"
    "  PHASE 2 — DESIGN REVIEW: tối thiểu 3 phương án, so sánh độ phức tạp/hiệu năng/khả năng "
    "mở rộng/bảo trì/bảo mật, chọn phương án tối ưu kèm lý do, tự phản biện điểm yếu.\n"
    "  PHASE 3 — IMPLEMENTATION: các bước thay đổi nhỏ, đánh giá ảnh hưởng sau mỗi bước.\n"
    "  PHASE 4 — VALIDATION: cách kiểm thử, edge case, khả năng gây regression.\n"
    "  PHASE 5 — REVIEW: tự rà soát như reviewer độc lập, nêu rõ điểm còn yếu.\n"
    "  PHASE 6 — HANDOVER: chỉ kết luận 'hoàn thành' khi thật sự tự tin cao (~95%) và không còn "
    "lỗi đã biết; nếu chưa đạt, nói rõ lý do và KHÔNG kết luận đã xong.\n"
    "THÀNH THẬT (bắt buộc, áp dụng cả 2 trường hợp): bạn KHÔNG có quyền truy cập trực tiếp hệ "
    "thống tệp hay kho mã nguồn thật của người dùng — bạn chỉ thấy nội dung cuộc trò chuyện này "
    "cùng các tệp/trang web mà người dùng đã đính kèm hoặc dán link. TUYỆT ĐỐI không giả vờ đã "
    "'đọc toàn bộ source code' nếu chưa được cung cấp. Nếu thiếu mã nguồn/tài liệu/bối cảnh cần "
    "thiết, hãy DỪNG LẠI và yêu cầu người dùng dán trực tiếp vào khung chat, hoặc dùng nút 📎 "
    "đính kèm tệp / dán link — tuyệt đối không suy đoán hay bịa. Nếu yêu cầu mơ hồ hoặc xung "
    "đột, hỏi lại thay vì đoán.]"
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
            "github": GitHubModelsEngine(),
            "openrouter": OpenRouterEngine(),
            "deepseek": DeepSeekEngine(),
            "ollama": OllamaEngine(),
            "openai": OpenAIEngine(),
        }
        self.free_chain = [n for n in CONFIG["FREE_FALLBACK_CHAIN"] if n in self.engines]

        # ── Lớp dự phòng LOCAL đa model ─────────────────────────────
        # Đăng ký thêm mỗi model trong LOCAL_MODELS thành một bộ não local riêng
        # (cùng endpoint Ollama, khác model) và chèn ngay sau "ollama" trong chuỗi
        # free — để khi hết token API, LUMINA lần lượt thử nhiều model local.
        # Không tốn tài nguyên khi chưa tự host: available()=False nếu thiếu OLLAMA_BASE_URL.
        local_names: list[str] = []
        for i, model in enumerate(CONFIG.get("LOCAL_MODELS", []), start=1):
            ename = f"ollama-{i}"
            self.engines[ename] = OllamaEngine(model=model, name=ename)
            local_names.append(ename)
        if local_names:
            if "ollama" in self.free_chain:
                pos = self.free_chain.index("ollama") + 1
                self.free_chain[pos:pos] = local_names
            else:
                self.free_chain += local_names

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

        # Tin nhắn GỐC của người dùng (trước khi chèn bất kỳ chỉ thị nào) — dùng cho
        # kho tri thức + thư viện kỹ năng, tránh nội dung chỉ thị (vd "bảo mật",
        # "injection" trong _AGENT_DIRECTIVE) tự khớp ngược lại chính nó.
        original_last_user = next((m["content"] for m in reversed(messages) if m.get("role") == "user"), "")

        # 🔬 Chế độ nghiên cứu sâu — chèn chỉ thị vào câu hỏi cuối để bộ não tìm nhiều nguồn.
        # 📝 Chế độ tạo phụ đề — chèn chỉ thị buộc xuất đúng định dạng SRT.
        # ⚙️ Chế độ Lumina Forge — chèn chỉ thị tự co giãn (nhỏ: gọn chuyên gia, lớn: 6 giai đoạn).
        directive = _RESEARCH_DIRECTIVE if route.mode == "research" \
            else _SUBTITLE_DIRECTIVE if route.mode == "subtitle" \
            else _AGENT_DIRECTIVE if route.mode == "agent" else None
        if directive:
            messages = list(messages)
            for i in range(len(messages) - 1, -1, -1):
                if messages[i].get("role") == "user":
                    messages[i] = {**messages[i], "content": messages[i]["content"] + directive}
                    break

        # 📚 Kho tri thức nội bộ (RAG-lite, giảm token): câu cần tra cứu → đọc kho
        # trong thư mục data/ trước (0 token), thiếu thì "học" từ Wikipedia (miễn phí)
        # rồi lưu lại. Tư liệu kèm link nguồn + chỉ thị đối chiếu chéo (chống bịp).
        system_prompt = SYSTEM_PROMPT
        if route.use_web_search and messages:
            try:
                facts = await knowledge.gather(original_last_user[:200])
            except Exception:  # noqa: BLE001 — kho tri thức là phụ trợ, không được làm hỏng chat
                facts = []
            if facts:
                yield {"type": "search_status", "tool": "knowledge",
                       "query": ", ".join(f["topic"] for f in facts)[:80]}
                system_prompt = SYSTEM_PROMPT + knowledge.build_context(facts)

            # 🧩 Thư viện kỹ năng nội bộ: chỉ áp dụng trong ⚙️ Lumina Forge — so khớp
            # tin nhắn với ~53 kỹ năng tuyển chọn (phương pháp luận kỹ thuật + gu
            # thiết kế UI/UX), tiêm kỹ năng khớp nhất nếu có (0 chi phí nếu không khớp).
            if route.mode == "agent":
                skill = skills.find_matching_skill(original_last_user)
                if skill:
                    yield {"type": "search_status", "tool": "skill", "query": skill.name}
                    system_prompt += skills.build_skill_context(skill)

        started_output = False
        chain = self._chain_for(use_premium)
        # Có video đính kèm → chỉ Gemini xem được (giới hạn chặt hơn ảnh).
        # Có ảnh đính kèm → chỉ dùng bộ não "nhìn" được (Claude/Gemini).
        no_capability_msg = ""
        if has_videos(messages):
            chain = [n for n in chain if n in _VIDEO_ENGINES]
            no_capability_msg = ("Để LUMINA xem được video, cần bật bộ não Gemini (miễn phí) — "
                                 "kiểm tra GEMINI_API_KEY trong file .env.")
        elif has_images(messages):
            chain = [n for n in chain if n in _VISION_ENGINES]
            no_capability_msg = ("Để LUMINA xem được ảnh, cần bật bộ não Gemini (miễn phí) hoặc Claude — "
                                 "kiểm tra API key trong file .env.")
        tried_any = False
        no_engine_msg = "Chưa có bộ não nào được cấu hình — kiểm tra API key trong file .env."
        # Thông báo lỗi cho người dùng KHÔNG bao giờ nêu tên model/nhà cung cấp.
        busy_msg = "Xin lỗi, LUMINA đang bận hoặc gặp sự cố tạm thời — hãy thử lại sau giây lát."
        if not chain:
            yield {"type": "error", "message": no_capability_msg or no_engine_msg}
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
                async for event in engine.stream_chat(messages, route, system_prompt):
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
