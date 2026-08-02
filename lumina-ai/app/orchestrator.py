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
    MistralEngine,
    KimiEngine,
    GitHubModelsEngine,
    GroqEngine,
    OllamaEngine,
    OpenAIEngine,
    OpenRouterEngine,
)
from . import knowledge
from . import skills
from . import skill_search
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

_CRITIQUE_DIRECTIVE = (
    "\n\n[Chế độ PHẢN BIỆN NỘI BỘ: trước khi chốt câu trả lời, hãy TỰ ĐÓNG HAI VAI trong đầu:\n"
    "1) NGƯỜI ĐỀ XUẤT: soạn câu trả lời tốt nhất cho yêu cầu.\n"
    "2) NGƯỜI PHẢN BIỆN: cố tình tìm lỗ hổng — chỗ sai, giả định thiếu căn cứ, thiếu trường hợp biên, "
    "rủi ro bảo mật/hiệu năng, điểm mơ hồ, phản ví dụ.\n"
    "Nếu người phản biện bắt được vấn đề THỰC SỰ, hãy SỬA ngay và lặp lại tới khi vững.\n"
    "CHỈ xuất BẢN ĐÃ CẢI THIỆN (không in ra phần tranh luận nội bộ dài dòng). Kết thúc bằng một mục ngắn "
    "\"🔎 Đã tự phản biện & sửa:\" liệt kê 1-3 điểm đã vá (nếu không có vấn đề gì, ghi \"đã rà, không thấy lỗ hổng đáng kể\").]"
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
    "GAME / ĐỒ HOẠ / TƯƠNG TÁC (khi yêu cầu là dựng game, demo tương tác, hiệu ứng, hoặc UI động): "
    "áp dụng đầy đủ các kỹ năng chuyên môn được nạp kèm bên dưới (vòng lặp game dt cố định, va chạm, "
    "điều khiển nhân vật có coyote-time/jump-buffer, hệ hạt, ánh sáng 2D, HUD, game feel & juice — "
    "squash&stretch, screen shake, âm thanh). Ưu tiên xuất một demo CHẠY ĐƯỢC NGAY: bọc mã trong khối "
    "```lumina-run (một tệp HTML/JS/canvas tự chứa, KHÔNG thư viện ngoài) để người dùng bấm chơi liền "
    "trong khung chat; tự chịu trách nhiệm về hiệu năng (chỉ vẽ phần thấy được) và trải nghiệm (điều "
    "khiển rõ, phản hồi tức thì). Sau khi viết, TỰ PHẢN BIỆN như một reviewer: rà lỗi biên/bug rồi sửa "
    "trước khi giao.\n"
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
SƠ ĐỒ ĐỘNG: khi một sơ đồ giúp người dùng hiểu nhanh hơn (kiến trúc hệ thống, luồng xử lý,
tuần tự, sơ đồ tư duy, ERD, quy trình, cây quyết định, timeline), hãy vẽ bằng khối code ```mermaid
— giao diện LUMINA sẽ tự render thành sơ đồ tương tác (phóng to/kéo được). Dùng cú pháp Mermaid hợp lệ
(flowchart, sequenceDiagram, classDiagram, stateDiagram-v2, erDiagram, mindmap, gantt, journey);
nhãn tiếng Việt nên đặt trong ngoặc kép để tránh lỗi cú pháp. Nếu người dùng gửi kèm ảnh/mô tả và muốn
sơ đồ, hãy chuyển ý đó thành Mermaid.
BẢN ĐỒ TRI THỨC/TƯ DUY: khi người dùng muốn "bản đồ" một chủ đề rộng (vd "bản đồ Crypto", "map kiến thức AI",
"sơ đồ tư duy X") — dùng Mermaid `mindmap` phân cấp (gốc → nhánh → nhánh con); giao diện cho zoom/kéo như bản đồ. Khi nhận nhiều ảnh là các KHUNG HÌNH trích từ một video (theo thứ tự
thời gian), hãy coi chúng như một chuỗi diễn biến — mô tả/So sánh các bước và có thể dựng sơ đồ luồng/tuần tự
từ đó. Chỉ vẽ khi thực sự hữu ích, đừng lạm dụng.
WIDGET SỐNG: khi người dùng muốn một thẻ TỰ CẬP NHẬT trong chat (theo dõi tin tức, đồng hồ/đếm ngược,
tri thức đã học), hãy xuất khối code ```lumina-widget chứa JSON — giao diện sẽ render
thành thẻ sống tự làm mới. Chỉ dùng các "type" LUMINA thật sự cấp dữ liệu (KHÔNG bịa nguồn khác):
  • "news"      → {"type":"news","title":"…","query":"từ khoá","interval":60}  (tin mới nhất, tự làm mới)
  • "knowledge" → {"type":"knowledge","title":"…","query":"chủ đề","interval":60}  (tri thức LUMINA đã học)
  • "clock"     → {"type":"clock","mode":"clock"}  hoặc  {"type":"clock","mode":"countdown","target":"2026-12-31T23:59:59","title":"Đếm ngược"}
Chỉ tạo widget khi người dùng thực sự muốn thứ cập nhật liên tục; câu hỏi thường thì trả lời bình thường.
BẢN ĐỒ QUYẾT ĐỊNH: khi câu hỏi có NHIỀU HƯỚNG LỰA CHỌN và người dùng cần cân nhắc hệ quả (nên chọn A/B/C,
"đánh đổi", "phương án nào"), ngoài phần phân tích, hãy xuất khối code ```lumina-decision chứa JSON để giao
diện render thành CÂY QUYẾT ĐỊNH bấm mở từng nhánh xem hậu quả. Dạng:
{"question":"...","options":[{"label":"Hướng A","consequence":"chọn A được/mất gì","pros":["..."],"cons":["..."],
"best_for":"tối ưu cho ai/khi nào","children":[{...lựa chọn con...}]}]}. Mỗi option nên có consequence + pros/cons +
best_for; children (tuỳ chọn) cho nhánh con. Chỉ dùng khi thực sự có nhiều lựa chọn cần cân nhắc, đừng lạm dụng.
QUY TRÌNH SỐNG: khi người dùng mô tả một QUY TRÌNH/WORKFLOW bằng lời (vd "lấy dữ liệu, lọc lỗi, tóm tắt,
gửi cho tôi 8h sáng"), hãy xuất khối code ```lumina-workflow chứa JSON để giao diện render thành các NODE
nối tiếp bấm mở xem chi tiết. Dạng: {"title":"...","steps":[{"type":"source|filter|transform|schedule|output|
condition|action","label":"tên bước ngắn","detail":"mô tả cụ thể bước này làm gì"}]}. Đây là BẢN THIẾT KẾ để
người dùng chỉnh bằng cách nhắn tiếp — LUMINA KHÔNG tự chạy/tự lập lịch/tự gửi; nói rõ điều đó khi phù hợp.
BẢN CHẠY THỬ (live preview): khi người dùng muốn một thứ CHẠY ĐƯỢC NGAY (game 2D, demo web, canvas,
visualization, đồ hoạ tương tác, mini-app HTML/CSS/JS), hãy xuất khối code ```lumina-run chứa MỘT trang
HTML TỰ CHỨA hoàn chỉnh (gồm cả <style>/<script> nội tuyến, không phụ thuộc mạng ngoài) — giao diện sẽ chạy
nó trong iframe sandbox an toàn (bấm ↺ chạy lại, </> xem mã, ⤢ toàn màn hình). Chỉ dùng khi tạo thứ chạy được;
giải thích/code lẻ vẫn dùng khối ```html hoặc ```js bình thường (không tự chạy). Viết code gọn, chạy được ngay.
MÔ PHỎNG "WHAT-IF" (Sandbox): với câu hỏi kịch bản/dự phóng ("nếu Bitcoin giảm 30% thì sao", "mở quán cafe
doanh thu 3 năm", "nếu lãi suất tăng…"), ngoài phần phân tích bằng lời, hãy dựng MỘT MÔ PHỎNG TƯƠNG TÁC bằng
khối ```lumina-run: trang HTML tự chứa có **thanh trượt/ô nhập** cho các giả định (giá, tăng trưởng, chi phí…),
tự tính lại kết quả và vẽ **biểu đồ** (canvas thuần, không thư viện ngoài) khi người dùng chỉnh — để họ tự
"chạy thử" nhiều kịch bản. Nêu rõ đây là mô hình minh họa dựa trên giả định người dùng nhập, không phải dự báo chắc chắn.
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
            "mistral": MistralEngine(),
            "kimi": KimiEngine(),
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

        # ── ~30 bộ não phụ MIỄN PHÍ qua OpenRouter (một key, nhiều model) ──
        # Đăng ký mỗi model trong OPENROUTER_MODELS thành 1 engine (openrouter-2,3…)
        # và chèn ngay sau "openrouter" trong chuỗi free. Chỉ available() khi có
        # OPENROUTER_API_KEY → không tốn gì nếu chưa cấu hình. Model đầu tiên đã là
        # "openrouter" gốc nên bỏ qua nó ở đây để khỏi trùng.
        or_names: list[str] = []
        base_or = CONFIG.get("OPENROUTER_MODEL")
        for i, model in enumerate(CONFIG.get("OPENROUTER_MODELS", []), start=2):
            if model == base_or:
                continue
            ename = f"openrouter-{i}"
            self.engines[ename] = OpenRouterEngine(model=model, name=ename)
            or_names.append(ename)
        if or_names and "openrouter" in self.free_chain:
            pos = self.free_chain.index("openrouter") + 1
            self.free_chain[pos:pos] = or_names
        elif or_names:
            self.free_chain += or_names

        # ── Chế độ 100% LOCAL ───────────────────────────────────────
        # LOCAL_ONLY=true: chỉ giữ lại các bộ não CHẠY TRÊN MÁY (Ollama + model local),
        # loại mọi engine gọi API bên ngoài → không bao giờ tốn token / phụ thuộc API.
        self.local_only = bool(CONFIG.get("LOCAL_ONLY"))
        if self.local_only:
            local_set = {"ollama", *local_names}
            self.free_chain = [n for n in self.free_chain if n in local_set]
            if not self.free_chain and "ollama" in self.engines:
                self.free_chain = ["ollama", *local_names]

    def _chain_for(self, use_premium: bool) -> list[str]:
        """Chuỗi engine theo tầng. Cao cấp: Claude trước rồi mới tới free (dự phòng khi lỗi).
        Ở chế độ LOCAL_ONLY: KHÔNG bao giờ dùng Claude/API ngoài, chỉ chuỗi local."""
        if use_premium and not self.local_only:
            return ["claude"] + self.free_chain
        return list(self.free_chain)

    def available_engines(self) -> list[str]:
        names = self.free_chain if self.local_only else ["claude"] + self.free_chain
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
        self, messages: list[dict], route: RouteDecision, use_premium: bool = True,
        system_extra: str = "",
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
            else _AGENT_DIRECTIVE if route.mode == "agent" \
            else _CRITIQUE_DIRECTIVE if route.mode == "critique" else None
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
        # 🤖 Agent tùy chỉnh của người dùng: chèn hướng dẫn/persona đã lưu (nếu có).
        if system_extra:
            system_prompt += (
                "\n\n[HƯỚNG DẪN AGENT TÙY CHỈNH của người dùng — tuân theo trong khi vẫn giữ "
                "các nguyên tắc an toàn/thành thật của LUMINA và KHÔNG lộ tên model:\n"
                f"{system_extra.strip()[:4000]}\n]"
            )
        # 🧠 "Dạy LUMINA": nếu người dùng RA LỆNH ghi nhớ điều gì đó → tiếp thu vào kho
        # tri thức (source="user") để tái dùng về sau — workflow tiến hoá theo người dùng.
        # Chạy ở MỌI chế độ (không phụ thuộc web_search) và không bao giờ làm hỏng chat.
        if messages:
            try:
                learned = knowledge.learn_from_user(original_last_user)
            except Exception:  # noqa: BLE001
                learned = None
            if learned:
                yield {"type": "search_status", "tool": "learned", "query": learned[:80]}
        if route.use_web_search and messages:
            try:
                facts = await knowledge.gather(original_last_user[:200])
            except Exception:  # noqa: BLE001 — kho tri thức là phụ trợ, không được làm hỏng chat
                facts = []
            if facts:
                yield {"type": "search_status", "tool": "knowledge",
                       "query": ", ".join(f["topic"] for f in facts)[:80]}
                # NỐI (không ghi đè) để không mất hướng dẫn Agent tùy chỉnh đã chèn ở trên.
                system_prompt += knowledge.build_context(facts)

        # 🧩 Thư viện kỹ năng nội bộ (toàn bộ ~741 kỹ năng): tự áp dụng khi ở chế độ
        # ⚙️ Lumina Forge HOẶC khi đang chat với một Agent tùy chỉnh (system_extra) —
        # cùng một thư viện, "nhúng" vào cả agent lẫn Forge (không cắt cái nào). So khớp
        # tin nhắn, tiêm kỹ năng khớp nhất nếu có (0 chi phí nếu không khớp).
        if messages and (route.mode == "agent" or system_extra):
            # Yêu cầu lớn (dựng game/hệ thống nhiều phần) thường chạm nhiều lĩnh vực →
            # nạp tối đa 3 kỹ năng liên quan cùng lúc (mỗi cái cắt ngắn hơn để giữ ngân
            # sách token). Yêu cầu ngắn thường chỉ khớp 1 kỹ năng nên vẫn như cũ.
            matched = skills.find_matching_skills(original_last_user, limit=3)
            if not matched:
                # Từ khóa không trúng → thử khớp NGỮ NGHĨA (chỉ khi có key embeddings;
                # không có key thì trả rỗng, giữ nguyên hành vi cũ).
                matched = await skill_search.semantic_match(original_last_user, limit=2)
            if matched:
                per_cap = 5000 if len(matched) == 1 else 2600
                for skill in matched:
                    yield {"type": "search_status", "tool": "skill", "query": skill.name}
                    system_prompt += skills.build_skill_context(skill, max_chars=per_cap)

        started_output = False
        chain = self._chain_for(use_premium)
        # Có video đính kèm → chỉ Gemini xem được (giới hạn chặt hơn ảnh).
        # Có ảnh đính kèm → chỉ dùng bộ não "nhìn" được (Claude/Gemini).
        no_capability_msg = ""
        if has_videos(messages):
            # Gemini xem video trực tiếp; nếu đã tách được khung hình (đính kèm dạng ảnh)
            # thì Claude cũng phân tích video được → nới chuỗi sang cả bộ não nhìn ảnh.
            allowed = set(_VIDEO_ENGINES)
            if has_images(messages):
                allowed |= set(_VISION_ENGINES)
            chain = [n for n in chain if n in allowed]
            no_capability_msg = ("Để LUMINA xem được video, cần bật bộ não Gemini (miễn phí) hoặc Claude — "
                                 "kiểm tra API key trong file .env.")
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
