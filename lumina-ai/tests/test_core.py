"""✦ LUMINA AI — unit tests cho phần lõi (không cần API key / mạng)."""

import os
import sys
import tempfile
import time
import uuid

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

os.environ.setdefault("DEV_MODE", "true")
# DB riêng cho test — không đụng vào lumina.db thật (phải set TRƯỚC khi import app.config)
os.environ.setdefault("DB_PATH", os.path.join(tempfile.mkdtemp(prefix="lumina_test_"), "test.db"))

from app import db  # noqa: E402
from app.cache import ResponseCache  # noqa: E402
from app.circuit_breaker import BreakerState, CircuitBreaker  # noqa: E402
from app.memory import trim_history  # noqa: E402
from app.ratelimit import UserRateLimiter  # noqa: E402
from app.router import decide_route  # noqa: E402
from app.config import CONFIG  # noqa: E402


def _new_user_id() -> str:
    uid = f"test-{uuid.uuid4().hex[:8]}"
    db.upsert_user(uid, f"{uid}@example.com", "Test User", "")
    return uid


# ── Router: "mô hình bù trừ" chọn đúng chế độ ───────────────────────────────

def test_router_search_intent():
    route = decide_route("Tin tức AI mới nhất hôm nay là gì?")
    assert route.mode == "search"
    assert route.use_web_search is True


def test_router_deep_intent():
    route = decide_route("Viết hàm Python kiểm tra số nguyên tố và giải thích thuật toán")
    assert route.mode == "deep"
    assert route.model == CONFIG["CLAUDE_MODEL_DEEP"]
    assert route.effort == "high"


def test_router_fast_for_greeting():
    route = decide_route("xin chào")
    assert route.mode == "fast"
    assert route.model == CONFIG["CLAUDE_MODEL_FAST"]


def test_router_balanced_default():
    route = decide_route(
        "Kể cho mình nghe một câu chuyện ngắn về tình bạn giữa chú mèo và chú chó nhé, giọng văn ấm áp",
        history_len=2,
    )
    assert route.mode == "balanced"


def test_router_apex_disabled_by_default():
    route = decide_route("Đây là một bài toán cực khó cần suy luận sâu")
    assert route.mode != "apex"  # ENABLE_FABLE mặc định false → không dùng Fable


# ── Router: chế độ đa phương thức (vẽ ảnh / nghiên cứu) ─────────────────────

def test_router_image_intent():
    for q in ["vẽ cho tôi một con mèo", "tạo ảnh hoàng hôn trên biển", "draw a robot"]:
        assert decide_route(q).mode == "image_gen", q


def test_router_research_intent():
    route = decide_route("nghiên cứu sâu về tác động của AI tới việc làm")
    assert route.mode == "research"
    assert route.use_web_search is True


def test_router_force_mode_overrides():
    # Nút bấm giao diện ép chế độ dù nội dung không có từ khóa
    assert decide_route("con mèo", force_mode="image").mode == "image_gen"
    assert decide_route("biến đổi khí hậu", force_mode="research").mode == "research"


def test_router_no_false_positive_image():
    for q in ["Đà Lạt có gì chơi", "cách tạo file excel", "tạo thói quen tốt"]:
        assert decide_route(q).mode != "image_gen", q


def test_router_apex_locked_for_free_plan():
    """Bật ENABLE_FABLE tạm thời để kiểm tra gói Miễn phí bị khóa Đỉnh cao."""
    original = CONFIG["ENABLE_FABLE"]
    CONFIG["ENABLE_FABLE"] = True
    try:
        route = decide_route("Đây là một bài toán cực khó cần suy luận sâu", apex_allowed=False)
        assert route.mode == "deep"
        assert route.apex_locked is True

        route_paid = decide_route("Đây là một bài toán cực khó cần suy luận sâu", apex_allowed=True)
        assert route_paid.mode == "apex"
        assert route_paid.apex_locked is False
    finally:
        CONFIG["ENABLE_FABLE"] = original


# ── Memory: cắt cửa sổ ngữ cảnh ─────────────────────────────────────────────

def test_trim_history_keeps_recent():
    msgs = [{"role": "user" if i % 2 == 0 else "assistant", "content": "x" * 400} for i in range(50)]
    trimmed = trim_history(msgs, max_tokens=1000)
    assert len(trimmed) < 50
    assert trimmed[-1] == msgs[-1]          # luôn giữ tin nhắn cuối
    assert trimmed[0]["role"] == "user"     # tin đầu phải là user


def test_trim_history_always_keeps_last():
    msgs = [{"role": "user", "content": "y" * 100000}]
    trimmed = trim_history(msgs, max_tokens=10)
    assert len(trimmed) == 1


# ── Cache ───────────────────────────────────────────────────────────────────

def test_cache_roundtrip_and_ttl():
    cache = ResponseCache(ttl=1)
    key = ResponseCache.make_key([{"role": "user", "content": "hi"}], "claude-opus-4-8")
    cache.set(key, {"content": "xin chào", "usage": {"output_tokens": 3}})
    assert cache.get(key)["content"] == "xin chào"
    time.sleep(1.1)
    assert cache.get(key) is None  # hết hạn TTL


# ── Circuit breaker ─────────────────────────────────────────────────────────

def test_circuit_breaker_opens_and_recovers():
    breaker = CircuitBreaker(threshold=3, timeout=1)
    assert breaker.allow_request()
    for _ in range(3):
        breaker.record_failure()
    assert breaker.state == BreakerState.OPEN
    assert not breaker.allow_request()
    time.sleep(1.1)
    assert breaker.allow_request()  # HALF_OPEN thử lại
    breaker.record_success()
    assert breaker.state == BreakerState.CLOSED


# ── Rate limiter ────────────────────────────────────────────────────────────

def test_rate_limiter_blocks_after_burst():
    limiter = UserRateLimiter(rate_per_minute=60, burst=3)
    for _ in range(3):
        ok, _ = limiter.check("user-1")
        assert ok
    ok, wait = limiter.check("user-1")
    assert not ok
    assert wait >= 1
    # Người dùng khác không bị ảnh hưởng
    ok, _ = limiter.check("user-2")
    assert ok


def test_rate_limiter_upgrades_capacity_on_plan_change():
    """Khi gói của người dùng đổi (nâng cấp), bucket phải cập nhật dung lượng mới ngay."""
    limiter = UserRateLimiter(rate_per_minute=60, burst=15)
    ok, _ = limiter.check("user-3", rate_per_minute=10, burst=2)  # gói free: burst nhỏ
    assert ok
    ok, _ = limiter.check("user-3", rate_per_minute=10, burst=2)
    assert ok
    ok, _ = limiter.check("user-3", rate_per_minute=10, burst=2)
    assert not ok  # hết burst của gói free

    # Nâng cấp gói trả phí — burst cao hơn phải cho phép thêm ngay
    ok, _ = limiter.check("user-3", rate_per_minute=30, burst=50)
    assert ok


# ── Gói & đơn hàng / thanh toán (DB) ─────────────────────────────────────────

def test_new_user_defaults_to_free_plan():
    uid = _new_user_id()
    plan = db.get_effective_plan(uid)
    assert plan["key"] == "free"
    assert plan["apex_allowed"] is False
    assert plan["expires_at"] == 0


def test_create_order_and_mark_paid_activates_plan():
    uid = _new_user_id()
    order = db.create_order(uid, "monthly", "sepay", 500000, 0.0)
    assert order["status"] == "pending"
    assert order["id"].startswith("LUM")

    activated, plan = db.mark_order_paid(order["id"], provider_ref="tx1")
    assert activated is True
    assert plan["key"] == "monthly"
    assert plan["apex_allowed"] is True
    assert plan["expires_at"] > time.time()

    assert db.get_order(order["id"])["status"] == "paid"
    assert db.get_effective_plan(uid)["key"] == "monthly"


def test_mark_order_paid_idempotent():
    uid = _new_user_id()
    order = db.create_order(uid, "monthly", "sepay", 500000, 0.0)
    activated1, plan1 = db.mark_order_paid(order["id"])
    expires1 = plan1["expires_at"]
    # Webhook bắn trùng — không kích hoạt lại, không cộng dồn thời hạn
    activated2, plan2 = db.mark_order_paid(order["id"])
    assert activated1 is True
    assert activated2 is False
    assert plan2 is None
    assert db.get_effective_plan(uid)["expires_at"] == expires1


def test_mark_nonexistent_order():
    activated, plan = db.mark_order_paid("LUMZZZZZZ")
    assert activated is False
    assert plan is None


def test_sepay_auth_and_content_matching():
    from app import payments
    from app.config import CONFIG
    CONFIG["SEPAY_API_KEY"] = "secret-key"
    try:
        assert payments.verify_sepay_authorization("Apikey secret-key") is True
        assert payments.verify_sepay_authorization("Apikey wrong") is False
        assert payments.verify_sepay_authorization("") is False
    finally:
        CONFIG["SEPAY_API_KEY"] = ""

    # Tìm mã đơn trong nội dung chuyển khoản (kể cả lẫn chữ khác)
    pending = ["LUMABC123", "LUMDEF456"]
    assert payments.extract_order_id_from_content("chuyen tien LUMABC123 cam on", pending) == "LUMABC123"
    assert payments.extract_order_id_from_content("khong co ma", pending) is None


def test_vietqr_url_builder():
    from app import payments
    url = payments.build_vietqr_url("970436", "0123456789", "NGUYEN VAN A", 500000, "LUMABC123")
    assert "970436-0123456789" in url
    assert "amount=500000" in url
    assert "LUMABC123" in url


def test_premium_then_free_then_blocked():
    """2 lượt đầu = cao cấp, tới total_cap thì tụt free, vượt total_cap thì chặn."""
    uid = _new_user_id()
    # premium_cap=2, total_cap=4
    a1, p1, _ = db.consume_daily_usage(uid, premium_cap=2, total_cap=4)
    a2, p2, _ = db.consume_daily_usage(uid, premium_cap=2, total_cap=4)
    assert (a1, p1) == (True, True)   # lượt 1 — cao cấp
    assert (a2, p2) == (True, True)   # lượt 2 — cao cấp
    a3, p3, _ = db.consume_daily_usage(uid, premium_cap=2, total_cap=4)
    a4, p4, _ = db.consume_daily_usage(uid, premium_cap=2, total_cap=4)
    assert (a3, p3) == (True, False)  # lượt 3 — free (hết cao cấp)
    assert (a4, p4) == (True, False)  # lượt 4 — free
    a5, p5, used5 = db.consume_daily_usage(uid, premium_cap=2, total_cap=4)
    assert a5 is False               # lượt 5 — chạm total_cap, chặn
    assert used5 == 4

    premium_used, total_used = db.get_daily_usage(uid)
    assert premium_used == 2
    assert total_used == 4


def test_daily_usage_unlimited_when_cap_zero():
    uid = _new_user_id()
    for _ in range(5):
        allowed, use_premium, _ = db.consume_daily_usage(uid, premium_cap=0, total_cap=0)
        assert allowed is True
        assert use_premium is True  # premium_cap<=0 → luôn cao cấp


def test_orchestrator_chain_tiers():
    """Chuỗi cao cấp có Claude đứng đầu; chuỗi free không có Claude."""
    from app.orchestrator import orchestrator
    premium_chain = orchestrator._chain_for(use_premium=True)
    free_chain = orchestrator._chain_for(use_premium=False)
    assert premium_chain[0] == "claude"
    assert "claude" not in free_chain
    # Các engine free phải nằm trong danh sách đã đăng ký
    for name in free_chain:
        assert name in orchestrator.engines


def test_local_models_registered_as_fallback():
    """LOCAL_MODELS được đăng ký thành ≥5 bộ não local (dự phòng khi hết token API),
    nằm trong chuỗi free, và KHÔNG kích hoạt khi chưa tự host (thiếu OLLAMA_BASE_URL)."""
    from app.orchestrator import Orchestrator
    from app.config import CONFIG
    o = Orchestrator()
    local_names = [n for n in o.engines if getattr(o.engines[n], "is_local", False)]
    # ollama chính + ≥5 model local từ LOCAL_MODELS
    assert len(local_names) >= 5
    assert len(CONFIG["LOCAL_MODELS"]) >= 5
    # mỗi model local có model riêng và nằm trong chuỗi free
    for n in local_names:
        assert o.engines[n].model
    assert any(n.startswith("ollama-") for n in o.free_chain)
    # Không có OLLAMA_BASE_URL trong test → tất cả local đều không available (không tốn tài nguyên)
    if not CONFIG["OLLAMA_BASE_URL"]:
        assert all(not o.engines[n].available() for n in local_names)


# ── Đa phương thức: xử lý ảnh (media) ───────────────────────────────────────

def test_parse_data_url_valid():
    from app.media import parse_data_url
    assert parse_data_url("data:image/png;base64,AAAA") == ("image/png", "AAAA")
    assert parse_data_url("data:image/jpeg;base64,/9j/xyz") == ("image/jpeg", "/9j/xyz")


def test_parse_data_url_rejects_non_image():
    from app.media import parse_data_url
    assert parse_data_url("data:text/plain;base64,AAAA") is None
    assert parse_data_url("không phải data url") is None
    assert parse_data_url("") is None


def test_has_images_detection():
    from app.media import has_images
    assert has_images([{"role": "user", "content": "hi"}]) is False
    assert has_images([{"role": "user", "content": "hi", "images": ["data:image/png;base64,AA"]}]) is True


# ── Đa phương thức: tạo ảnh (imagegen) ──────────────────────────────────────

def test_imagegen_pollinations_url():
    import asyncio
    from app.imagegen import generate_image
    result = asyncio.get_event_loop().run_until_complete(generate_image("con rồng lửa"))
    assert result["url"].startswith("https://image.pollinations.ai/prompt/")
    assert result["prompt"] == "con rồng lửa"


def test_imagegen_empty_prompt_has_fallback():
    import asyncio
    from app.imagegen import generate_image
    result = asyncio.get_event_loop().run_until_complete(generate_image("   "))
    assert result["url"].startswith("https://image.pollinations.ai/")


# ── Kho tri thức nội bộ (RAG-lite — "học dần", giảm token) ──────────────────

def test_knowledge_remember_and_lookup():
    from app import knowledge
    knowledge.remember("trà xanh", "Trà xanh là loại trà làm từ lá Camellia sinensis...",
                       url="https://vi.wikipedia.org/wiki/Tr%C3%A0_xanh", source="wikipedia")
    hits = knowledge.lookup_local("lợi ích của trà xanh là gì")
    assert hits and hits[0]["topic"] == "trà xanh"
    assert "Camellia" in hits[0]["summary"]


def test_knowledge_remember_updates_not_duplicates():
    from app import knowledge
    knowledge.remember("hà nội", "Bản cũ.", source="wikipedia")
    knowledge.remember("hà nội", "Bản mới hơn.", source="wikipedia")
    hits = knowledge.lookup_local("hà nội")
    same_topic = [h for h in hits if h["topic"] == "hà nội"]
    assert len(same_topic) == 1
    assert same_topic[0]["summary"] == "Bản mới hơn."


def test_knowledge_keywords_skip_stopwords():
    from app.knowledge import extract_keywords
    kws = extract_keywords("trà xanh là gì và có lợi ích gì cho sức khỏe")
    assert "trà" in kws and "xanh" in kws
    assert "là" not in kws and "gì" not in kws


def test_knowledge_build_context_warns_cross_check():
    from app.knowledge import build_context
    ctx = build_context([{"topic": "trà xanh", "summary": "abc", "url": "https://x", "source": "wikipedia"}])
    assert "ĐỐI CHIẾU" in ctx          # bắt bộ não đối chiếu chéo (chống nguồn bị sửa bịp)
    assert "https://x" in ctx           # kèm link nguồn để trích dẫn


def test_knowledge_gather_prefers_local_no_network():
    import asyncio
    from app import knowledge
    knowledge.remember("số nguyên tố", "Số nguyên tố là số tự nhiên lớn hơn 1...", source="wikipedia")
    items = asyncio.get_event_loop().run_until_complete(knowledge.gather("số nguyên tố là gì"))
    assert items and items[0]["topic"] == "số nguyên tố"


def test_knowledge_gather_never_raises_offline():
    import asyncio
    from app import knowledge
    # Chủ đề không có trong kho + mạng bị chặn → phải trả [] êm, không nổ lỗi
    items = asyncio.get_event_loop().run_until_complete(knowledge.gather("zzzz-khong-ton-tai-9999"))
    assert items == []


# ── Thư viện Kỹ năng nội bộ (tuyển chọn từ Claude Skills công khai) ──────────

def test_skills_library_loads_non_empty():
    from app import skills
    assert len(skills._SKILLS) >= 40  # đã tuyển chọn 53 skill, cho biên độ an toàn


def test_skills_find_matching_skill_hits_expected():
    from app import skills
    skill = skills.find_matching_skill("làm sao viết test trước khi code cho tính năng mới")
    assert skill is not None
    assert skill.slug == "test-driven-development"


def test_skills_acquire_codebase_knowledge_matches_and_warns_no_real_files():
    from app import skills
    skill = skills.find_matching_skill("giúp mình tài liệu hóa codebase này")
    assert skill is not None
    assert skill.slug == "acquire-codebase-knowledge"
    ctx = skills.build_skill_context(skill)
    assert "không khẳng định đã tạo/ghi file thật" in ctx


def test_skills_dashmotion_matches_diagram_request():
    from app import skills
    skill = skills.find_matching_skill("vẽ sơ đồ kiến trúc động cho hệ thống này")
    assert skill is not None
    assert skill.slug == "dashmotion"


def test_skills_library_has_at_least_65():
    from app import skills
    assert len(skills._SKILLS) >= 65


def test_skills_agent_architecture_topics_match():
    from app import skills
    cases = {
        "có nên dùng nhiều AI agent phối hợp không": "multi-agent-patterns",
        "làm sao cho AI agent nhớ được across session": "memory-systems",
        "viết mô tả tool cho MCP server sao cho AI hiểu đúng": "tool-design",
        "đừng làm quá tay, chỉ sửa đúng cái tôi yêu cầu thôi": "anti-over-engineering",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_library_has_at_least_72():
    from app import skills
    assert len(skills._SKILLS) >= 72


def test_skills_platform_and_language_topics_match():
    from app import skills
    cases = {
        "review giao diện web này có đạt chuẩn accessibility không": "platform-design-web",
        "thiết kế app android theo material design 3": "platform-design-android",
        "nên dùng model nào cho tác vụ rẻ, model nào cho tác vụ khó": "model-hierarchy",
        "lỗi typescript any type sửa sao đây": "typescript-magician",
        "implement oauth pkce cho app này": "oauth-security",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_library_has_at_least_78():
    from app import skills
    assert len(skills._SKILLS) >= 78


def test_skills_design_and_security_topics_match():
    from app import skills
    cases = {
        "đánh giá giao diện này theo nguyên tắc usability": "nielsen-usability-heuristics",
        "kiểm tra code này có bị sql injection hay xss không": "vibesec",
        "chọn bảng màu oklch cho design system": "color-expert",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_library_has_at_least_82():
    from app import skills
    assert len(skills._SKILLS) >= 82


def test_skills_writing_and_platform_topics_match():
    from app import skills
    cases = {
        "sửa lại đoạn văn này cho bớt giống văn phong AI viết": "unslop",
        "review code swiftui này giúp tôi": "swiftui-expert",
        "thiết lập eslint 9 cho dự án javascript": "eslint-neostandard-linting",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_library_has_at_least_90():
    from app import skills
    assert len(skills._SKILLS) >= 90


def test_skills_ux_patterns_match():
    from app import skills
    cases = {
        "dạy tôi học python từ đầu, đi từng bước một": "teaching-framework",
        "thiết kế trạng thái loading cho trang này": "loading-states-perceived-performance",
        "màu báo lỗi nên dùng sao cho đúng": "status-colors-and-errors",
        "validate form này khi nào thì hợp lý": "form-design",
        "thêm animation nút bấm cho mượt hơn": "micro-interactions",
        "responsive design cho mobile với desktop khác nhau sao": "responsive-paradigms",
        "thiết kế toast notification cho app": "notifications-and-recovery",
        "làm bảng dữ liệu có chọn nhiều item được không": "data-display-and-selection",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_find_matching_skill_irrelevant_returns_none():
    from app import skills
    assert skills.find_matching_skill("hôm nay trời đẹp không, đi chơi đâu nhỉ") is None


def test_skills_build_skill_context_has_caveat_and_cap():
    from app import skills
    skill = skills.Skill(
        slug="test-slug", name="Test Skill", description="", category="engineering",
        keywords=("test",), body="x" * 20000,
    )
    ctx = skills.build_skill_context(skill)
    assert "KHÔNG có công cụ chạy bash/git/browser/MCP thật" in ctx
    assert len(ctx) < 20000  # đã cắt bớt, không tiêm nguyên bản dài


# ── Router: chế độ 📝 Phụ đề (video → transcript SRT) ────────────────────────

def test_router_subtitle_force_mode():
    route = decide_route("bất kỳ nội dung gì", force_mode="subtitle")
    assert route.mode == "subtitle"
    assert route.label == "📝 Phụ đề"


# ── Router: chế độ ⚙️ Lumina Forge (quy trình 6 giai đoạn) ──────────────────

def test_router_agent_force_mode():
    route = decide_route("bất kỳ nội dung gì", force_mode="agent")
    assert route.mode == "agent"
    assert route.label == "⚙️ Lumina Forge"
    assert route.use_web_search is True
    assert route.effort == "high"


def test_router_agent_not_auto_detected():
    # Lumina Forge CHỈ kích hoạt qua nút bấm (force_mode) — không có regex tự đoán,
    # để tránh vô tình chạy quy trình 6 giai đoạn nặng nề trên câu hỏi thường.
    for q in ["phân tích giúp mình đoạn code này", "thiết kế hệ thống mới", "review code giúp mình"]:
        assert decide_route(q).mode != "agent", q


# ── Media: video đính kèm ────────────────────────────────────────────────────

def test_media_parse_video_data_url():
    from app.media import parse_video_data_url
    import base64
    small = base64.b64encode(b"x" * 100).decode()
    assert parse_video_data_url(f"data:video/mp4;base64,{small}") == ("video/mp4", small)
    assert parse_video_data_url("data:image/png;base64,AAAA") is None  # không phải video


def test_media_parse_video_rejects_oversized():
    from app.media import parse_video_data_url, MAX_VIDEO_BYTES
    import base64
    huge = base64.b64encode(b"x" * (MAX_VIDEO_BYTES + 1000)).decode()
    assert parse_video_data_url(f"data:video/mp4;base64,{huge}") is None


def test_media_has_videos():
    from app.media import has_videos
    assert has_videos([{"role": "user", "content": "hi"}]) is False
    assert has_videos([{"role": "user", "content": "hi", "videos": ["data:video/mp4;base64,AA"]}]) is True


def test_media_decode_video_roundtrip():
    from app.media import decode_video
    import base64
    raw = b"video bytes here"
    b64 = base64.b64encode(raw).decode()
    assert decode_video(f"data:video/mp4;base64,{b64}") == raw
    assert decode_video("không phải data url") is None


# ── Tệp đính kèm: đọc PDF/Word/Excel/txt ─────────────────────────────────────

def test_files_extract_docx_and_xlsx_and_txt():
    import base64
    import io
    from app.files import build_context, extract_text

    import docx
    d = docx.Document()
    d.add_paragraph("Xin chào LUMINA, đây là tài liệu thử nghiệm.")
    buf = io.BytesIO(); d.save(buf)
    r_docx = extract_text(
        "bao_cao.docx",
        "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,"
        + base64.b64encode(buf.getvalue()).decode(),
    )
    assert r_docx["error"] == ""
    assert "LUMINA" in r_docx["text"]

    import openpyxl
    wb = openpyxl.Workbook(); ws = wb.active
    ws.append(["Tên", "Điểm"]); ws.append(["An", 9])
    buf2 = io.BytesIO(); wb.save(buf2)
    r_xlsx = extract_text(
        "diem.xlsx",
        "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"
        + base64.b64encode(buf2.getvalue()).decode(),
    )
    assert r_xlsx["error"] == ""
    assert "An" in r_xlsx["text"]

    r_txt = extract_text("note.txt", "data:text/plain;base64," + base64.b64encode(b"ghi chu test").decode())
    assert r_txt["text"] == "ghi chu test"

    ctx = build_context([r_docx, r_xlsx, r_txt])
    assert "bao_cao.docx" in ctx and "diem.xlsx" in ctx and "note.txt" in ctx


def test_files_extract_rejects_bad_input():
    from app.files import extract_text
    assert extract_text("x.pdf", "không phải data url")["error"] != ""
    assert extract_text("x.bin", "data:application/octet-stream;base64,AAAA")["error"] != ""


def test_files_build_context_skips_errors():
    from app.files import build_context
    ok = {"name": "a.txt", "text": "nội dung", "error": ""}
    bad = {"name": "b.pdf", "text": "", "error": "hỏng"}
    ctx = build_context([ok, bad])
    assert "a.txt" in ctx
    assert "b.pdf" not in ctx  # tệp lỗi không được đưa vào ngữ cảnh


# ── Lồng tiếng & phụ đề video: các hàm thuần túy + ffmpeg thật ──────────────

def test_video_dub_srt_formatting():
    from app.video_dub import _fmt_srt_time, build_srt
    assert _fmt_srt_time(0) == "00:00:00,000"
    assert _fmt_srt_time(65.5) == "00:01:05,500"
    segs = [{"start": 0, "end": 2.5, "original": "hi", "translated": "chào"}]
    srt = build_srt(segs)
    assert "00:00:00,000 --> 00:00:02,500" in srt
    assert "chào" in srt


def test_video_dub_extract_json_array_variants():
    from app.video_dub import _extract_json_array
    fenced = '```json\n[{"start": 0.0, "end": 1.0, "original": "a", "translated": "b"}]\n```'
    assert _extract_json_array(fenced)[0]["translated"] == "b"
    bare = 'noise [{"start":0,"end":1,"original":"a","translated":"b"}] noise'
    assert _extract_json_array(bare)[0]["translated"] == "b"
    assert _extract_json_array("không có json") == []


def test_video_dub_ffmpeg_pipeline_real():
    """Kiểm thử thật bằng ffmpeg: tạo video test → ghép audio mới → không bị cắt ngắn."""
    import asyncio
    import os
    import tempfile
    from app.video_dub import _build_dubbed_audio, _mux_final, _probe_duration, _run_ffmpeg

    async def go():
        work = tempfile.mkdtemp()
        test_video = os.path.join(work, "test.mp4")
        await _run_ffmpeg(["-f", "lavfi", "-i", "testsrc=duration=3:size=160x120:rate=10",
                           "-f", "lavfi", "-i", "sine=frequency=1000:duration=3",
                           "-c:v", "libx264", "-c:a", "aac", "-y", test_video])
        duration = await _probe_duration(test_video)
        assert abs(duration - 3.0) < 0.2

        seg_audio = os.path.join(work, "seg_0.mp3")
        await _run_ffmpeg(["-f", "lavfi", "-i", "sine=frequency=440:duration=1.0", "-y", seg_audio])
        segments = [{"start": 0.0, "end": 1.0, "original": "hi", "translated": "chào"}]
        # Đoạn 0 rỗng (giả lập lỗi TTS) rồi mới tới đoạn có audio thật — kiểm tra
        # KHÔNG bị lệch chỉ số input khi ghép (bug đã phát hiện + sửa khi phát triển).
        dubbed = await _build_dubbed_audio(segments, [seg_audio], work, duration)
        audio_dur = await _probe_duration(dubbed)
        assert abs(audio_dur - duration) < 0.3  # audio phải khớp ĐỦ độ dài video, không bị cắt

        out_path = os.path.join(work, "output.mp4")
        await _mux_final(test_video, dubbed, None, out_path)
        assert os.path.getsize(out_path) > 1000
        out_dur = await _probe_duration(out_path)
        assert abs(out_dur - duration) < 0.3  # video cuối KHÔNG bị cắt ngắn so với gốc

    asyncio.get_event_loop().run_until_complete(go())


# ── Trí nhớ dài hạn: nhớ lại hội thoại CŨ khi mở hội thoại MỚI ──────────────

def test_recall_finds_relevant_past_conversation():
    from app import recall
    uid = _new_user_id()
    conv1 = db.create_conversation(uid, "Dự án LUMINA")
    db.add_message(conv1, "user", "Dự án LUMINA AI của tôi deadline là ngày 20 tháng 8 nhé")
    db.add_message(conv1, "assistant", "Đã ghi nhận, deadline là 20/8.")
    conv2 = db.create_conversation(uid, "Nấu ăn")
    db.add_message(conv2, "user", "Cách nấu phở bò ngon")

    conv3 = db.create_conversation(uid, "Hội thoại mới")
    items = recall.gather(uid, "deadline dự án LUMINA AI là khi nào", exclude_conv_id=conv3)
    assert items
    assert any("20" in it["snippet"] for it in items)
    assert not any("phở" in it["snippet"].lower() for it in items)


def test_recall_isolated_between_users():
    """Bảo mật quan trọng nhất: KHÔNG BAO GIỜ được lộ dữ liệu giữa 2 người dùng khác nhau."""
    from app import recall
    uid_a = _new_user_id()
    uid_b = _new_user_id()
    conv_a = db.create_conversation(uid_a, "Bí mật A")
    db.add_message(conv_a, "user", "Dự án LUMINA bí mật của tôi có mật khẩu SECRET-AAA")
    conv_b = db.create_conversation(uid_b, "Bí mật B")
    db.add_message(conv_b, "user", "Dự án LUMINA bí mật của tôi có mật khẩu SECRET-BBB")

    items_b = recall.gather(uid_b, "mật khẩu dự án LUMINA của tôi là gì", exclude_conv_id="")
    joined = " ".join(it["snippet"] for it in items_b)
    assert "SECRET-BBB" in joined       # thấy đúng dữ liệu của chính mình
    assert "SECRET-AAA" not in joined   # TUYỆT ĐỐI không thấy dữ liệu của người khác


def test_recall_excludes_current_conversation():
    from app import recall
    uid = _new_user_id()
    conv1 = db.create_conversation(uid, "Hội thoại hiện tại")
    db.add_message(conv1, "user", "Từ khóa đặc biệt XYZKEYWORD nằm trong chính hội thoại này")
    items = recall.gather(uid, "XYZKEYWORD", exclude_conv_id=conv1)
    assert items == []  # bị loại vì exclude_conv_id — history của hội thoại hiện tại đã có sẵn rồi


def test_recall_build_context_has_anti_hallucination_directive():
    from app import recall
    ctx = recall.build_context([{"conversation_id": "c1", "title": "T", "role": "user",
                                 "snippet": "nội dung", "created_at": 0}])
    assert "không bịa" in ctx
    assert "T" in ctx


def test_recall_no_keywords_returns_empty():
    from app import recall
    uid = _new_user_id()
    assert recall.gather(uid, "là gì và có", exclude_conv_id="") == []  # toàn từ dừng


def test_db_search_messages_empty_keywords():
    assert db.search_messages("any-user", [], exclude_conv_id="") == []


# ── 🌐 Đọc trang web khi người dùng dán link (mọi bộ não, không chỉ Claude) ──

def test_webpage_extract_urls():
    from app.webpage import extract_urls
    msg = "đọc giúp tôi https://example.com/page?a=1 nói về gì, còn cả http://test.org/x nữa."
    urls = extract_urls(msg)
    assert urls == ["https://example.com/page?a=1", "http://test.org/x"]


def test_webpage_extract_urls_dedupe_and_limit():
    from app.webpage import extract_urls
    msg = "https://a.com https://a.com https://b.com https://c.com https://d.com"
    urls = extract_urls(msg, limit=2)
    assert urls == ["https://a.com", "https://b.com"]  # loại trùng + giới hạn số lượng


def test_webpage_extract_urls_none():
    from app.webpage import extract_urls
    assert extract_urls("không có link nào ở đây cả") == []


def test_webpage_parses_html_strips_boilerplate():
    """Kiểm tra tách nội dung: loại script/nav/header/footer, giữ đúng nội dung chính."""
    from bs4 import BeautifulSoup
    html = """
    <html><head><title>Bai viet hay</title></head>
    <body>
    <nav>Menu dieu huong</nav>
    <script>alert("xau")</script>
    <header>Header quang cao</header>
    <article><h1>Tieu de</h1><p>Noi dung chinh ve LUMINA AI.</p></article>
    <footer>Footer ban quyen</footer>
    </body></html>
    """
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "header", "noscript", "svg"]):
        tag.decompose()
    text = soup.get_text(separator="\n", strip=True)
    assert "dieu huong" not in text
    assert "xau" not in text
    assert "quang cao" not in text
    assert "ban quyen" not in text
    assert "LUMINA AI" in text


def test_webpage_fetch_page_never_raises_on_bad_url():
    import asyncio
    from app.webpage import fetch_page
    result = asyncio.get_event_loop().run_until_complete(fetch_page("https://khong-ton-tai-9999.invalid"))
    assert result["error"] != ""  # báo lỗi thân thiện, không raise


def test_webpage_build_context_skips_errors():
    from app.webpage import build_context
    ok = {"url": "https://a.com", "title": "Trang A", "text": "nội dung A", "error": ""}
    bad = {"url": "https://b.com", "title": "", "text": "", "error": "hỏng"}
    ctx = build_context([ok, bad])
    assert "Trang A" in ctx
    assert "b.com" not in ctx  # trang lỗi không được đưa vào ngữ cảnh


def test_webpage_build_context_empty_when_no_pages():
    from app.webpage import build_context
    assert build_context([]) == ""
    assert build_context([{"url": "x", "title": "", "text": "", "error": "lỗi"}]) == ""


def test_skills_library_has_at_least_110():
    from app import skills
    assert len(skills._SKILLS) >= 110


def test_skills_library_has_at_least_115():
    from app import skills
    assert len(skills._SKILLS) >= 115


def test_skills_library_has_at_least_119():
    from app import skills
    assert len(skills._SKILLS) >= 119


def test_skills_library_has_at_least_126():
    from app import skills
    assert len(skills._SKILLS) >= 126


def test_skills_library_has_at_least_127():
    from app import skills
    assert len(skills._SKILLS) >= 127


def test_skills_library_has_at_least_129():
    from app import skills
    assert len(skills._SKILLS) >= 129


def test_skills_library_has_at_least_131():
    from app import skills
    assert len(skills._SKILLS) >= 131


def test_skills_library_has_at_least_136():
    from app import skills
    assert len(skills._SKILLS) >= 136


def test_skills_library_has_at_least_138():
    from app import skills
    assert len(skills._SKILLS) >= 138


def test_skills_library_has_at_least_142():
    from app import skills
    assert len(skills._SKILLS) >= 142


def test_skills_library_has_at_least_144():
    from app import skills
    assert len(skills._SKILLS) >= 144


def test_skills_library_has_at_least_146():
    from app import skills
    assert len(skills._SKILLS) >= 146


def test_skills_library_has_at_least_156():
    from app import skills
    assert len(skills._SKILLS) >= 156


def test_skills_library_has_at_least_168():
    from app import skills
    assert len(skills._SKILLS) >= 168


def test_skills_library_has_at_least_182():
    from app import skills
    assert len(skills._SKILLS) >= 182


def test_skills_library_has_at_least_194():
    from app import skills
    assert len(skills._SKILLS) >= 194


def test_skills_library_has_at_least_207():
    from app import skills
    assert len(skills._SKILLS) >= 207


def test_skills_library_has_at_least_221():
    from app import skills
    assert len(skills._SKILLS) >= 221


def test_skills_library_has_at_least_235():
    from app import skills
    assert len(skills._SKILLS) >= 235


def test_skills_library_has_at_least_250():
    from app import skills
    assert len(skills._SKILLS) >= 250


def test_skills_library_has_at_least_264():
    from app import skills
    assert len(skills._SKILLS) >= 264


def test_skills_library_has_at_least_280():
    from app import skills
    assert len(skills._SKILLS) >= 280


def test_skills_library_has_at_least_300():
    from app import skills
    assert len(skills._SKILLS) >= 300


def test_skills_library_has_at_least_310():
    from app import skills
    assert len(skills._SKILLS) >= 310


def test_skills_library_has_at_least_321():
    from app import skills
    assert len(skills._SKILLS) >= 321


def test_skills_library_has_at_least_335():
    from app import skills
    assert len(skills._SKILLS) >= 335


def test_skills_library_has_at_least_350():
    from app import skills
    assert len(skills._SKILLS) >= 350


def test_skills_library_has_at_least_365():
    from app import skills
    assert len(skills._SKILLS) >= 365


def test_skills_library_has_at_least_380():
    from app import skills
    assert len(skills._SKILLS) >= 380


def test_skills_library_has_at_least_395():
    from app import skills
    assert len(skills._SKILLS) >= 395


def test_skills_library_has_at_least_410():
    from app import skills
    assert len(skills._SKILLS) >= 410


def test_skills_library_has_at_least_425():
    from app import skills
    assert len(skills._SKILLS) >= 425


def test_skills_library_has_at_least_440():
    from app import skills
    assert len(skills._SKILLS) >= 440


def test_skills_library_has_at_least_455():
    from app import skills
    assert len(skills._SKILLS) >= 455


def test_skills_library_has_at_least_470():
    from app import skills
    assert len(skills._SKILLS) >= 470


def test_skills_library_has_at_least_485():
    from app import skills
    assert len(skills._SKILLS) >= 485


def test_skills_library_has_at_least_500():
    from app import skills
    assert len(skills._SKILLS) >= 500


def test_skills_library_has_at_least_514():
    from app import skills
    assert len(skills._SKILLS) >= 514


def test_skills_library_has_at_least_529():
    from app import skills
    assert len(skills._SKILLS) >= 529


def test_skills_library_has_at_least_544():
    from app import skills
    assert len(skills._SKILLS) >= 544


def test_skills_library_has_at_least_559():
    from app import skills
    assert len(skills._SKILLS) >= 559


def test_skills_library_has_at_least_574():
    from app import skills
    assert len(skills._SKILLS) >= 574


def test_skills_library_has_at_least_589():
    from app import skills
    assert len(skills._SKILLS) >= 589


def test_skills_library_has_at_least_604():
    from app import skills
    assert len(skills._SKILLS) >= 604


def test_skills_library_has_at_least_608():
    from app import skills
    assert len(skills._SKILLS) >= 608


def test_skills_library_has_at_least_618():
    from app import skills
    assert len(skills._SKILLS) >= 618


def test_skills_library_has_at_least_628():
    from app import skills
    assert len(skills._SKILLS) >= 628


def test_skills_library_has_at_least_638():
    from app import skills
    assert len(skills._SKILLS) >= 638


def test_skills_library_has_at_least_646():
    from app import skills
    assert len(skills._SKILLS) >= 646


def test_skills_library_has_at_least_654():
    from app import skills
    assert len(skills._SKILLS) >= 654


def test_skills_gsap_and_frameworks_match():
    from app import skills
    cases = {
        "gsap greensock tween timeline easing animate web stagger": "gsap-animation",
        "scrolltrigger gsap hoạt hình theo cuộn pin scrub reveal on scroll": "gsap-scrolltrigger",
        "django orm queryset select_related n+1 migration": "django-patterns",
        "angular rxjs observable async pipe dependency injection onpush": "angular-patterns",
        "dotnet c# asp.net core async await dependency injection linq ef core": "dotnet-csharp-patterns",
        "spring boot java controller service repository jpa transactional dto": "spring-boot-patterns",
        "vue 3 composition api ref reactive computed composable": "vue-patterns",
        "flutter dart widget stateless stateful provider riverpod const": "flutter-patterns",
        "react native core component view text stylesheet flexbox flatList": "react-native-patterns",
        "kotlin android jetpack compose viewmodel coroutines flow lifecycle": "kotlin-android",
        "laravel php eloquent orm eager loading blade mass assignment queue": "laravel-php",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_repos_and_game_topics_match():
    from app import skills
    cases = {
        "email smtp imap mx record spf dkim dmarc": "how-email-works",
        "webrtc gọi video trình duyệt peer to peer stun turn ice": "how-webrtc-works",
        "captcha chống bot recaptcha thử thách hình ảnh behavioral": "how-captcha-works",
        "single sign-on sso identity provider saml oidc": "how-single-sign-on-works",
        "quy trình sparc specification pseudocode architecture refinement": "sparc-methodology",
        "goap goal oriented action planning ai game npc precondition effect": "goap-planning",
        "thiết kế game mda framework core loop động lực người chơi flow": "game-design-fundamentals",
        "game feel juice phản hồi tức thì screen shake hit-stop": "game-feel-and-juice",
        "cân bằng game đường cong độ khó economy sink source": "game-balancing",
        "tạo video ngắn ai tiktok script visual voiceover phụ đề": "ai-short-video-generation",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_milestone300_topics_match():
    from app import skills
    cases = {
        "qr code module đen trắng finder pattern sửa lỗi reed-solomon": "how-qr-codes-work",
        "gps định vị vệ tinh trilateration cần 4 vệ tinh": "how-gps-works",
        "dịch máy neural machine translation transformer attention": "how-machine-translation-works",
        "nhận dạng giọng nói speech to text spectrogram whisper": "how-speech-recognition-works",
        "định dạng ảnh jpeg png webp svg raster vector": "how-image-formats-work",
        "package manager npm pip giải quyết phụ thuộc transitive": "how-package-managers-work",
        "serverless faas lambda cold start tự scale trả theo lần chạy": "how-serverless-works",
        "reinforcement learning agent reward policy exploration exploitation": "reinforcement-learning-basics",
        "data pipeline etl elt batch streaming orchestration incremental": "data-pipelines-etl",
        "giải quyết xung đột mâu thuẫn nhóm tách người khỏi vấn đề": "conflict-resolution",
        "giao việc ủy quyền không ôm hết việc tránh micromanage": "delegation",
        "brainstorming động não tạo ý tưởng scamper phân kỳ hội tụ": "brainstorming-techniques",
        "mentoring coaching cố vấn huấn luyện hỏi thay vì bảo grow": "mentoring-and-coaching",
        "nhận diện khuôn mặt faceprint embedding bias quyền riêng tư": "how-face-recognition-works",
        "bộ lọc spam bayesian sender reputation spf dkim dmarc": "how-spam-filters-work",
        "graph database node edge neo4j cypher dữ liệu nhiều liên kết": "graph-databases",
        "stream processing xử lý luồng event time watermark windowing": "stream-processing",
        "trí tuệ cảm xúc eq tự nhận thức kiểm soát cảm xúc đồng cảm": "emotional-intelligence",
        "hệ thống ghi chú zettelkasten para tóm tắt bằng lời mình": "note-taking-systems",
        "feature engineering tạo đặc trưng encode categorical tránh data leakage": "feature-engineering",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_systems_and_life_topics_match():
    from app import skills
    cases = {
        "http method get post status code 404 500 header": "how-http-works",
        "cookie session duy trì đăng nhập httponly secure samesite": "how-cookies-and-sessions-work",
        "vpn mạng riêng ảo tunnel mã hóa ẩn ip có an toàn không": "how-vpns-work",
        "2fa xác thực hai yếu tố totp authenticator security key fido": "how-2fa-works",
        "thanh toán thẻ gateway authorization capture pci tokenization": "how-payment-processing-works",
        "video streaming adaptive bitrate hls dash buffering codec": "how-video-streaming-works",
        "webassembly wasm compile rust sang wasm sandbox tốc độ": "how-webassembly-works",
        "bloom filter kiểm tra tồn tại tiết kiệm bộ nhớ false positive": "how-bloom-filters-work",
        "consistent hashing băm nhất quán hash ring virtual node": "how-consistent-hashing-works",
        "nlp xử lý ngôn ngữ tự nhiên tokenization tf-idf word embedding": "nlp-basics",
        "computer vision thị giác máy tính cnn convolution object detection": "computer-vision-basics",
        "mlops đưa model lên production drift dữ liệu retrain monitor": "mlops-basics",
        "copywriting viết quảng cáo lợi ích vs tính năng aida pas headline": "copywriting-basics",
        "xây dựng thói quen tốt cue routine reward habit stacking": "habit-formation",
        "đặt mục tiêu okr objective key result smart goal": "goal-setting-okrs",
        "tài chính cá nhân lập ngân sách quỹ khẩn cấp trả nợ lãi cao lãi kép": "personal-finance-basics",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_professional_and_ml_topics_match():
    from app import skills
    cases = {
        "async await event loop microtask không chặn luồng": "how-async-await-works",
        "machine learning cơ bản supervised overfitting train test split": "machine-learning-basics",
        "hệ thống gợi ý collaborative filtering cold start": "how-recommendation-systems-work",
        "quản lý thời gian sắp xếp ưu tiên ma trận eisenhower": "time-management-and-prioritization",
        "ra quyết định khó reversible irreversible tránh phân tích tê liệt": "decision-making-frameworks",
        "cách góp ý feedback cho người khác và nhận phê bình sbi": "giving-and-receiving-feedback",
        "họp hiệu quả agenda action item có nên họp không": "effective-meetings",
        "viết email công việc hiệu quả subject bluf": "writing-effective-emails",
        "thuyết trình kể chuyện làm slide một ý một slide pitch": "presentations-and-storytelling",
        "đàm phán batna lợi ích vs lập trường win-win": "negotiation-basics",
        "học cách học active recall spaced repetition feynman": "learning-how-to-learn",
        "tư duy phản biện đánh giá lập luận ngụy biện thiên kiến bias": "critical-thinking",
        "sql join inner left outer bị nhân đôi dòng fan-out": "sql-joins-explained",
        "trực quan hóa dữ liệu chọn loại biểu đồ tránh chart gây hiểu lầm": "data-visualization-principles",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_network_crypto_ai_topics_match():
    from app import skills
    cases = {
        "tcp hoạt động thế nào three-way handshake retransmit flow control": "how-tcp-works",
        "dns phân giải tên miền recursive resolver bản ghi a cname ttl": "how-dns-works",
        "https tls handshake chứng chỉ ca đối xứng bất đối xứng": "how-https-tls-works",
        "hash table bảng băm hàm băm va chạm collision load factor": "how-hash-tables-work",
        "cdn edge server cache cache-control purge": "how-cdns-work",
        "load balancer cân bằng tải round-robin health check sticky session": "how-load-balancers-work",
        "nén dữ liệu lossless lossy huffman gzip jpeg": "how-compression-works",
        "mã hóa bất đối xứng khóa công khai riêng tư chữ ký số": "how-public-key-crypto-works",
        "jwt json web token header payload signature ký hmac": "how-jwt-works",
        "làm chatbot rag trên tài liệu riêng chunking embedding retrieval": "rag-fundamentals",
        "embedding vector tìm kiếm ngữ nghĩa cosine similarity vector database": "vector-embeddings",
        "khi nào fine-tune hay rag hay prompt để chỉnh llm": "fine-tuning-vs-rag-vs-prompting",
        "thống kê cơ bản mean median độ lệch chuẩn tương quan nhân quả": "statistics-fundamentals",
        "xác suất bayes cập nhật niềm tin base rate dương tính giả": "probability-and-bayes",
        "làm sạch dữ liệu xử lý missing outlier trùng lặp chuẩn hóa": "data-cleaning",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_backend_devops_topics_match():
    from app import skills
    cases = {
        "thiết kế xử lý lỗi exception vs result, fail fast không nuốt lỗi": "error-handling-patterns",
        "phân trang api dùng cursor keyset thay offset và lọc filter": "api-pagination-and-filtering",
        "giới hạn tần suất api bằng token bucket sliding window chống spam": "rate-limiting-algorithms",
        "thiết kế webhook gửi sự kiện có retry và ký hmac xác thực": "webhooks-design",
        "làm thao tác idempotent với idempotency key tránh xử lý trùng": "idempotency",
        "thử lại retry với exponential backoff và circuit breaker": "retries-and-resilience",
        "truy vết phân tán trace span correlation id tìm nút thắt latency": "distributed-tracing",
        "quản lý secret api key không commit dùng env và vault": "secrets-management",
        "kiểm thử tải load test đo latency p99 percentile tìm bottleneck": "load-testing",
        "chaos engineering tiêm lỗi có chủ đích kiểm thử độ bền": "chaos-engineering",
        "event sourcing cqrs lưu trạng thái bằng sự kiện tách read write": "event-sourcing-cqrs",
        "clean architecture phân tầng dependency rule hexagonal": "clean-architecture",
        "nhận biết code smell god class trùng lặp khi nào refactor": "code-smells",
        "quản lý nợ kỹ thuật khi nào refactor hay làm tính năng": "technical-debt",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_algorithm_patterns_match():
    from app import skills
    cases = {
        "tìm chuỗi con liên tiếp dài nhất dùng sliding window cửa sổ trượt": "sliding-window-pattern",
        "dùng hai con trỏ two pointers tìm cặp tổng trên mảng sorted": "two-pointers-pattern",
        "tìm kiếm nhị phân binary search vị trí đầu cuối": "binary-search-patterns",
        "liệt kê hoán vị tổ hợp bằng backtracking quay lui": "backtracking-pattern",
        "quy hoạch động dp knapsack với memoization": "dynamic-programming-patterns",
        "thuật toán tham lam greedy interval scheduling": "greedy-algorithms",
        "union find disjoint set đếm thành phần liên thông": "union-find",
        "dùng monotonic stack ngăn xếp đơn điệu next greater element": "monotonic-stack",
        "duyệt đồ thị bfs dfs tìm đường ngắn nhất không trọng số đếm đảo": "graph-traversal",
        "tìm đường đi ngắn nhất có trọng số dijkstra bellman-ford": "shortest-paths",
        "sắp xếp topo thứ tự phụ thuộc dependency kahn": "topological-sort",
        "dùng trie cây tiền tố làm autocomplete": "trie-prefix-tree",
        "dùng heap priority queue tìm top k phần tử lớn nhất": "heap-priority-queue",
        "thao tác bit bitwise xor tìm số xuất hiện lẻ lần và bitmask": "bit-manipulation",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_how_x_works_and_llm_topics_match():
    from app import skills
    cases = {
        "công cụ tìm kiếm hoạt động thế nào, inverted index và tf-idf bm25": "how-search-engines-work",
        "cpu bộ xử lý hoạt động thế nào, fetch decode execute pipeline cache": "how-cpus-work",
        "render đồ họa 3d thế nào, rasterization ray tracing shader z-buffer": "how-3d-rendering-works",
        "game engine hoạt động thế nào, game loop delta time entity component system": "how-game-engines-work",
        "react vue hoạt động thế nào, virtual dom diffing reactivity": "how-frontend-frameworks-work",
        "malloc cấp phát bộ nhớ thế nào, free list phân mảnh": "how-memory-allocators-work",
        "emulator giả lập máy thế nào, thông dịch opcode fetch decode": "how-emulators-work",
        "consensus phân tán thế nào, raft bầu leader replication quorum": "how-distributed-consensus-works",
        "trình soạn thảo lưu văn bản thế nào, gap buffer rope piece table": "how-text-editors-work",
        "bittorrent chia sẻ p2p thế nào, torrent seeder dht swarm": "how-bittorrent-works",
        "physics engine mô phỏng thế nào, tích phân euler va chạm collision": "how-physics-engines-work",
        "chạy llm trên máy local, ollama gguf quantization theo vram": "running-llms-locally",
        "serve llm nhiều người dùng, vllm continuous batching kv cache": "llm-inference-optimization",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_how_x_works_topics_match():
    from app import skills
    cases = {
        "git lưu trữ dữ liệu thế nào, cơ chế object blob tree commit bên trong": "how-git-works-internally",
        "database hoạt động bên trong ra sao, b-tree wal mvcc buffer pool": "how-databases-work",
        "container hoạt động thế nào, namespace cgroup overlay filesystem": "how-docker-containers-work",
        "web server xử lý request thế nào, event loop vs thread pool socket": "how-web-servers-work",
        "trình duyệt render trang thế nào, dom cssom layout reflow paint": "how-browsers-work",
        "compiler và interpreter hoạt động thế nào, lexer parser ast bytecode": "how-compilers-work",
        "shell chạy lệnh thế nào bên trong, fork exec pipe file descriptor": "how-shells-work",
        "regex engine khớp thế nào, nfa dfa backtracking redos": "how-regex-engines-work",
        "blockchain hoạt động thế nào, proof of work merkle hàm băm chuỗi khối": "how-blockchain-works",
        "mạng nơ-ron học thế nào, backpropagation gradient descent activation": "how-neural-networks-work",
        "hệ điều hành hoạt động thế nào, process scheduler virtual memory syscall": "how-operating-systems-work",
        "llm mô hình ngôn ngữ hoạt động thế nào, transformer attention dự đoán token": "how-llms-work",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_architecture_and_product_topics_match():
    from app import skills
    cases = {
        "lỡ tay git reset hard mất commit, dùng reflog khôi phục": "git-advanced",
        "thiết kế schema graphql, xử lý n+1 bằng dataloader": "graphql-design",
        "nên tách microservice không, ranh giới service và database per service": "microservices-and-boundaries",
        "quản lý dependency, semver lockfile và cập nhật thư viện an toàn": "dependency-management",
        "dùng feature flag triển khai dần canary và kill switch": "feature-flags-and-rollouts",
        "mô hình dữ liệu nosql mongodb, chọn partition key": "nosql-data-modeling",
        "app bị rò rỉ bộ nhớ memory leak, tốn ram tăng dần": "memory-management",
        "làm chat realtime, chọn websocket hay sse": "websockets-and-realtime",
        "hỗ trợ đa ngôn ngữ i18n, số nhiều plural theo locale": "i18n-and-localization",
        "hệ thống production sập, ứng phó sự cố và mitigate rollback": "incident-response",
        "kiểm chứng ý tưởng bằng mvp trước khi xây": "mvp-and-validation",
        "phỏng vấn khách hàng hỏi đúng câu hỏi không dẫn dắt để research": "user-research",
        "chạy a/b testing đúng cách, sample size và tránh p-hacking": "ab-testing",
        "nên test cái gì và bao nhiêu, test pyramid": "testing-strategy",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_infra_and_language_topics_match():
    from app import skills
    cases = {
        "pod bị crashloopbackoff trên kubernetes, sửa manifest sao": "kubernetes-basics",
        "lỗi kết nối mạng timeout, dns không resolve được host": "networking-fundamentals",
        "làm đăng nhập bảo mật, hash mật khẩu và session vs jwt": "authentication-and-authorization",
        "thêm cache nhưng dữ liệu cũ stale, invalidate cache sao cho đúng": "caching-strategies",
        "dùng message queue kafka, xử lý tin nhắn trùng lặp at-least-once": "message-queues-and-events",
        "viết python chuẩn pythonic, tránh mutable default argument": "python-best-practices",
        "component react bị render lại nhiều lần, useeffect chạy vô hạn": "react-patterns",
        "dàn trang css responsive dùng flexbox grid, căn giữa phần tử": "css-layout",
        "lập trình hàm pure function và immutable map filter reduce": "functional-programming",
        "thiết kế hướng đối tượng theo solid, composition over inheritance": "object-oriented-design",
        "lưu thời gian sai múi giờ, xử lý timezone utc và dst": "datetime-and-timezones",
        "chữ bị lỗi font mojibake ký tự lạ, encoding utf-8 sai": "encoding-and-unicode",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_core_engineering_topics_match():
    from app import skills
    cases = {
        "viết prompt cho ai sao cho ra kết quả đúng, tối ưu system prompt": "prompt-engineering",
        "query sql chạy chậm quá, đánh index và explain plan sao": "sql-query-optimization",
        "viết regex biểu thức chính quy để bắt chuỗi email": "regular-expressions",
        "viết dockerfile multi-stage cho image nhẹ hơn": "docker-containers",
        "dùng grep sed awk xử lý text trên terminal linux": "linux-command-line",
        "thiết kế schema database chuẩn hóa với khóa ngoại quan hệ": "database-schema-design",
        "thiết kế hệ thống chịu tải cao với load balancing và caching": "system-design-fundamentals",
        "code đa luồng bị race condition và deadlock, xử lý sao": "concurrency-and-parallelism",
        "phân tích dữ liệu bằng pandas, groupby và merge dataframe": "data-analysis-pandas",
        "tối ưu độ phức tạp big-o, chọn cấu trúc dữ liệu phù hợp": "algorithms-and-complexity",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_writing_process_topics_match():
    from app import skills
    cases = {
        "trả lời ngắn gọn thôi, bớt dài dòng lan man đi": "communicating-concisely",
        "viết sop quy trình chuẩn hướng dẫn từng bước cho nhân viên": "sop-writing",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_finance_and_product_topics_match():
    from app import skills
    cases = {
        "quản lý dòng tiền và unit economics ltv cac cho startup": "bootstrapped-cfo",
        "viết prd cho tính năng mới, ưu tiên p0 sao cho đúng": "prd-writing",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_career_topics_match():
    from app import skills
    cases = {
        "cv của tôi bị loại tự động qua ats, tối ưu từ khóa sao": "resume-ats-optimizer",
        "viết lại gạch đầu dòng cv cho mạnh, định lượng thành tích": "resume-bullet-writer",
        "chuẩn bị phỏng vấn xin việc, luyện star story trả lời câu hỏi hành vi": "interview-prep",
        "nên deal lương bao nhiêu, đàm phán lương khi nhận offer": "salary-negotiation",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_playwright_and_email_topics_match():
    from app import skills
    cases = {
        "test playwright bị flaky, nên dùng getByRole và web-first assertion": "playwright-testing",
        "cải thiện tỉ lệ mở email và deliverability cho chiến dịch email": "email-marketing",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_marketing_and_upgrade_topics_match():
    from app import skills
    cases = {
        "nâng cấp rails lên phiên bản mới mà giữ tùy biến, đừng chạy app:update": "rails-upgrade",
        "chiến lược marketing cho sản phẩm mới, tư duy marketing hệ thống": "marketing-principles",
        "làm rõ định vị thương hiệu và value proposition sản phẩm": "positioning-basics",
        "đánh giá landing page tối ưu chuyển đổi, headline chưa tốt": "homepage-audit",
        "viết chuỗi email cold outreach tiếp cận khách hàng linkedin": "cold-outreach-sequence",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_rails_and_creative_topics_match():
    from app import skills
    cases = {
        "review code rails 8 theo đúng quy ước native hotwire": "rails-conventions",
        "nghĩ ý tưởng sáng tạo cho chiến dịch quảng cáo dùng scamper": "creative-director",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_codebase_understanding_topics_match():
    from app import skills
    cases = {
        "giải thích hàm này làm gì và nó thuộc tầng nào liên kết với gì": "explaining-code-in-context",
        "viết tài liệu onboarding cho người mới vào team, lộ trình học codebase": "codebase-onboarding-guide",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_verification_topic_matches():
    from app import skills
    skill = skills.find_matching_skill("đừng tuyên bố hoàn thành khi chưa kiểm chứng, phải xác minh trước khi báo")
    assert skill is not None
    assert skill.slug == "verification-before-completion"


def test_skills_backend_and_method_topics_match():
    from app import skills
    cases = {
        "viết node.js bằng typescript dùng type stripping không cần build": "nodejs-typescript",
        "debug native crash segfault trong node.js core với v8": "nodejs-core",
        "xây rest api bằng fastify với schema validation và plugin": "fastify-best-practices",
        "chia nhỏ tính năng thành các lát dọc vertical slice có ticket": "vertical-slice-tickets",
        "review module terraform và tổ chức state backend": "terraform-and-opentofu",
        "có nhiều hướng giải chưa rõ chọn cái nào, review theo nguyên lý gốc": "first-principles-review",
        "xác định mục tiêu và điều kiện dừng trước khi bắt đầu làm": "goal-framing",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_context_engineering_topics_match():
    from app import skills
    cases = {
        "giải thích attention budget và cửa sổ ngữ cảnh hoạt động thế nào": "context-fundamentals",
        "phiên chat dài quá agent quên mất đã sửa file nào, nén ngữ cảnh sao": "context-compression",
        "giảm chi phí token bằng observation masking và kv-cache": "context-optimization",
        "xây dựng rubric nhiều chiều để đánh giá agent": "evaluation",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_dembrandt_advanced_topics_match():
    from app import skills
    cases = {
        "ảnh sản phẩm nên dùng dữ liệu thật hay lorem ipsum": "authentic-product-representation",
        "đặt bộ chọn ngôn ngữ và tiền tệ ở đâu trên header": "global-toolbar-controls",
        "mấy card này khác chiều cao so le nhau nhìn lệch": "repeated-component-alignment",
        "thêm breadcrumb cho điều hướng nhiều tầng": "ui-context-and-scope",
        "thiết kế tool điều phối kho vận cho nhân viên chuyên nghiệp": "operational-expert-tool-ui",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_accessibility_and_layout_topics_match():
    from app import skills
    cases = {
        "kiểm tra website này có đạt chuẩn wcag không": "wcag-accessibility",
        "nút bấm này thiếu trạng thái hover disabled": "button-states",
        "làm chế độ tối dark mode cho web": "color-mode-and-theme",
        "dùng shadow đổ bóng thế nào cho hợp lý": "elevation-and-depth",
        "nên dùng modal hay drawer cho tính năng này": "modal-and-overlay-patterns",
        "thiết kế thanh tab điều hướng": "tab-navigation",
        "vùng cuộn nội dung dài xử lý sao": "scroll-areas",
        "thanh header dính cố định khi cuộn trang": "sticky-and-fixed-elements",
        "giao diện quá chật hay quá thưa": "ui-density",
        "viết html ngữ nghĩa chuẩn seo": "semantic-html-and-seo",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_visual_and_data_topics_match():
    from app import skills
    cases = {
        "phân cấp thị giác nhấn mạnh nội dung quan trọng": "visual-emphasis-and-hierarchy",
        "thiết kế luồng người dùng dẫn dắt từng bước": "user-flows-and-guided-paths",
        "bố cục trang nhất quán xuyên suốt": "layout-paradigms-and-consistency",
        "các thành phần giao diện đồng bộ với nhau": "component-family-consistency",
        "ẩn dụ thực tế trong thiết kế giao diện": "real-world-metaphors",
        "tạo bảng màu tự động bằng thuật toán": "algorithmic-color-palette",
        "ngôn ngữ hình ảnh thương hiệu nhất quán": "brand-visual-language",
        "tối ưu core web vitals cho trang web": "performance-web-vitals",
        "chuyển động kể chuyện trong giao diện": "motion-and-storytelling",
        "nhiều view dữ liệu đồng bộ liên kết với nhau": "coordinated-data-views",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_languages_security_business_topics_match():
    from app import skills
    cases = {
        "giải thích ownership và borrow checker trong rust": "rust-ownership",
        "goroutine channel trong go bị leak thì sao": "go-concurrency",
        "discriminated union và utility type trong typescript": "typescript-advanced-types",
        "next.js app router server client component render thế nào": "nextjs-patterns",
        "làm sao mô hình hóa mối đe dọa stride khi thiết kế": "threat-modeling",
        "sveltekit runes state derived load function": "svelte-patterns",
        "xây dựng api node.js với express middleware": "express-and-node-apis",
        "owasp top 10 lỗ hổng web phổ biến broken access control": "owasp-top-10",
        "thêm content security policy csp và header bảo mật http": "security-headers",
        "tor hoạt động thế nào onion routing": "how-tor-works",
        "mã hóa dữ liệu lưu trữ encryption at rest envelope": "how-encryption-at-rest-works",
        "chỉ số saas mrr churn ltv cac": "saas-metrics",
        "phân tích phễu funnel và cohort retention": "cohort-and-funnel-analysis",
        "viết tài liệu kỹ thuật readme diataxis": "technical-writing",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_systems_how_x_topics_match():
    from app import skills
    cases = {
        "garbage collection hoạt động thế nào mark and sweep": "how-garbage-collection-works",
        "bộ nhớ ảo virtual memory page table mmu": "how-virtual-memory-works",
        "filesystem inode thư mục lưu file trên đĩa": "how-filesystems-work",
        "database transaction acid isolation level mvcc": "how-database-transactions-work",
        "b-tree chỉ mục database index cây cân bằng": "how-b-trees-work",
        "write ahead log wal durability crash recovery": "how-write-ahead-logging-works",
        "interpreter thông dịch bytecode máy ảo": "how-interpreters-work",
        "chữ ký số digital signature ký bằng khóa riêng": "how-digital-signatures-work",
        "certificate authority pki chain of trust tls": "how-certificate-authorities-work",
        "ntp đồng bộ thời gian clock skew": "how-ntp-time-sync-works",
        "raid gộp nhiều ổ đĩa striping mirroring parity": "how-raid-works",
        "mapreduce xử lý dữ liệu lớn map shuffle reduce": "how-mapreduce-works",
        "antivirus phát hiện malware signature behavioral": "how-antivirus-works",
        "text rendering hiển thị chữ font glyph shaping": "how-text-rendering-works",
        "audio codec nén âm thanh mp3 opus psychoacoustic": "how-audio-codecs-work",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_hardware_how_x_topics_match():
    from app import skills
    cases = {
        "ssd nand flash wear leveling trim hoạt động": "how-ssds-work",
        "ổ cứng từ hdd platter seek time sequential random": "how-hard-drives-work",
        "dram ram tụ điện refresh row buffer": "how-dram-works",
        "cpu cache l1 l2 l3 locality cache miss false sharing": "how-cpu-caches-work",
        "máy tính khởi động bios uefi bootloader nạp kernel": "how-computers-boot",
        "virtualization ảo hóa hypervisor máy ảo vm vs container": "how-virtualization-works",
        "cpu scheduling lập lịch tiến trình context switch round robin": "how-cpu-scheduling-works",
        "transistor logic gate cổng logic công tắc nhị phân": "how-transistors-and-logic-gates-work",
        "usb enumeration endpoint device class power delivery": "how-usb-works",
        "wifi mạng không dây băng tần kênh csma nhiễu": "how-wifi-works",
        "bluetooth ble frequency hopping pairing gatt": "how-bluetooth-works",
        "màn hình cảm ứng capacitive điện dung multi-touch": "how-touchscreens-work",
        "màn hình lcd oled pixel subpixel refresh rate": "how-displays-work",
        "máy ảnh số cảm biến cmos bayer raw jpeg phơi sáng": "how-digital-cameras-work",
        "gpu xử lý song song simt warp tăng tốc ml": "how-gpus-work",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_networking_how_x_topics_match():
    from app import skills
    cases = {
        "nat network address translation chia sẻ ip riêng port forwarding": "how-nat-works",
        "firewall tường lửa lọc gói tin stateful default deny": "how-firewalls-work",
        "proxy forward reverse proxy nginx tls termination": "how-proxies-work",
        "định tuyến internet bgp autonomous system router bảng": "how-internet-routing-works",
        "arp ánh xạ ip sang mac broadcast arp spoofing": "how-arp-works",
        "dhcp cấp phát ip tự động dora lease gateway dns": "how-dhcp-works",
        "địa chỉ ip subnet mask cidr ipv4 ipv6 private": "how-ip-addressing-works",
        "switch mạng forward theo mac address table vlan": "how-network-switches-work",
        "ssh shell từ xa an toàn key host key public key tunnel": "how-ssh-works",
        "grpc protocol buffers protobuf rpc http2 streaming": "how-grpc-works",
        "quic http3 udp head of line blocking 0-rtt": "how-quic-and-http3-work",
        "mqtt iot publish subscribe broker topic qos": "how-mqtt-works",
        "mạng di động cellular cell base station handoff sim 5g": "how-cellular-networks-work",
        "multicast gửi một tới nhiều igmp group": "how-multicast-works",
        "internet vệ tinh geo leo starlink độ trễ ground station": "how-satellite-internet-works",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_ai_ml_how_x_topics_match():
    from app import skills
    cases = {
        "transformer self-attention query key value multi-head": "how-transformers-work",
        "backpropagation lan truyền ngược chain rule gradient": "how-backpropagation-works",
        "gradient descent learning rate sgd adam optimizer": "how-gradient-descent-works",
        "tokenizer token hóa subword bpe vocabulary": "how-tokenizers-work",
        "diffusion model sinh ảnh khử nhiễu text to image": "how-diffusion-models-work",
        "gan generator discriminator huấn luyện đối kháng mode collapse": "how-gans-work",
        "cnn convolutional mạng tích chập bộ lọc pooling": "how-convolutional-networks-work",
        "rnn lstm mạng hồi quy hidden state vanishing gradient": "how-recurrent-networks-work",
        "vector database tìm kiếm tương đồng ann hnsw semantic": "how-vector-databases-work",
        "decision tree cây quyết định random forest gradient boosting": "how-decision-trees-work",
        "clustering phân cụm k-means dbscan không giám sát": "how-clustering-works",
        "overfitting quá khớp regularization dropout bias variance": "how-overfitting-and-regularization-work",
        "quantization lượng tử hóa int8 int4 nén mô hình chạy llm nhẹ": "how-model-quantization-works",
        "dimensionality reduction giảm chiều pca t-sne umap": "how-dimensionality-reduction-works",
        "anomaly detection phát hiện bất thường isolation forest outlier": "how-anomaly-detection-works",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_data_and_web_how_x_topics_match():
    from app import skills
    cases = {
        "columnar storage lưu trữ theo cột parquet olap nén": "how-columnar-storage-works",
        "data warehouse kho dữ liệu olap oltp star schema etl": "how-data-warehouses-work",
        "database replication sao chép leader follower replication lag": "how-database-replication-works",
        "database sharding phân mảnh shard key horizontal partition": "how-database-sharding-works",
        "lsm tree memtable sstable compaction tối ưu ghi rocksdb": "how-lsm-trees-work",
        "change data capture cdc tail transaction log debezium": "how-change-data-capture-works",
        "time series database chuỗi thời gian metrics downsampling retention": "how-time-series-databases-work",
        "serialization tuần tự hóa json vs binary protobuf schema evolution": "how-json-serialization-works",
        "http caching cache-control etag 304 cache busting": "how-http-caching-works",
        "cors same-origin policy preflight options access-control-allow-origin": "how-cors-works",
        "server-sent events sse eventsource text/event-stream reconnect": "how-server-sent-events-work",
        "graphql single endpoint resolver n+1 dataloader query mutation": "how-graphql-works",
        "oauth2 authorization code pkce access token refresh scope": "how-oauth2-flows-work",
        "websocket protocol upgrade handshake framing full-duplex ping pong": "how-websocket-protocol-works",
        "service worker offline pwa cache proxy chặn request push": "how-service-workers-work",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_algorithms_and_cs_topics_match():
    from app import skills
    cases = {
        "cryptographic hash sha-256 md5 collision băm mật khẩu salt": "how-cryptographic-hashing-works",
        "string matching tìm chuỗi con kmp rabin-karp boyer-moore": "string-matching-algorithms",
        "divide and conquer chia để trị merge sort master theorem": "divide-and-conquer",
        "sorting algorithm sắp xếp quicksort merge heapsort stability": "sorting-algorithms",
        "random number generation sinh số ngẫu nhiên prng csprng seed": "how-random-number-generation-works",
        "floating point số thực dấu phẩy động 0.1 + 0.2 ieee 754 nan": "floating-point-arithmetic",
        "segment tree fenwick binary indexed range query o(log n)": "segment-and-fenwick-trees",
        "minimum spanning tree cây khung nhỏ nhất kruskal prim": "minimum-spanning-tree",
        "maximum flow min cut luồng cực đại ford-fulkerson bipartite matching": "maximum-flow-and-min-cut",
        "skip list danh sách bỏ qua nhiều tầng redis sorted set": "skip-lists",
        "reservoir sampling lấy mẫu ngẫu nhiên từ luồng k phần tử một lần duyệt": "reservoir-sampling",
        "sweep line đường quét interval overlap meeting rooms": "sweep-line-algorithms",
        "lru cache hash map doubly linked list eviction o(1)": "lru-cache-design",
        "number theory gcd euclid modular exponentiation sieve nguyên tố": "number-theory-for-programmers",
        "game theory lý thuyết trò chơi nash equilibrium prisoner dilemma minimax": "game-theory-basics",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_product_business_topics_match():
    from app import skills
    cases = {
        "product discovery khám phá sản phẩm phỏng vấn khách hàng jobs to be done": "product-discovery",
        "user story mapping bản đồ câu chuyện backbone slice mvp": "user-story-mapping",
        "roadmap prioritization ưu tiên lộ trình rice moscow": "roadmap-prioritization",
        "pricing strategy chiến lược định giá value-based willingness to pay": "pricing-strategy",
        "go-to-market gtm đưa sản phẩm ra thị trường icp product-led": "go-to-market-strategy",
        "competitive analysis phân tích đối thủ cạnh tranh ma trận": "competitive-analysis",
        "b2b sales bán hàng doanh nghiệp pipeline qualify champion": "b2b-sales-fundamentals",
        "content strategy chiến lược nội dung pillar phễu phân phối": "content-strategy",
        "seo content nghiên cứu từ khóa search intent backlink": "seo-content-strategy",
        "growth loop vòng lặp tăng trưởng viral k-factor": "growth-loops-and-virality",
        "community building xây dựng cộng đồng belonging seed moderation": "community-building",
        "stakeholder management quản lý các bên liên quan power interest buy-in": "stakeholder-management",
        "agile scrum kanban sprint standup retrospective wip": "agile-and-scrum",
        "project risk management quản lý rủi ro dự án likelihood impact register": "project-risk-management",
        "career growth engineer phát triển sự nghiệp ic vs management promotion": "career-growth-for-engineers",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_engineering_practices_topics_match():
    from app import skills
    cases = {
        "database migration di trú schema zero-downtime expand contract backfill": "database-migrations",
        "deployment strategy triển khai blue-green canary rolling rollback": "deployment-strategies",
        "slo sli error budget mục tiêu độ tin cậy sre": "slos-and-error-budgets",
        "capacity planning lập kế hoạch dung lượng peak headroom autoscaling": "capacity-planning",
        "connection pooling gộp kết nối database too many connections": "connection-pooling",
        "n+1 query problem orm lazy loading eager join dataloader": "n-plus-one-query-problem",
        "saga pattern giao dịch phân tán microservices compensating orchestration": "saga-pattern",
        "two-phase commit 2pc prepare commit coordinator blocking": "two-phase-commit",
        "distributed locking khóa phân tán redis ttl fencing token": "distributed-locking",
        "leader election bầu chọn leader raft split-brain quorum failover": "leader-election",
        "object storage lưu trữ đối tượng s3 bucket presigned url": "object-storage",
        "materialized view khung nhìn cụ thể hóa precompute refresh": "materialized-views",
        "contract testing kiểm thử hợp đồng api pact consumer provider": "contract-testing",
        "property-based testing sinh input ngẫu nhiên hypothesis shrinking": "property-based-testing",
        "test double mocking stub mock fake over-mocking cô lập": "test-doubles-and-mocking",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_devops_cloud_topics_match():
    from app import skills
    cases = {
        "gitops git nguồn sự thật argocd flux reconcile declarative": "gitops",
        "service mesh sidecar proxy mtls istio linkerd data plane": "service-mesh",
        "api gateway cổng api điểm vào duy nhất bff routing auth": "api-gateway-patterns",
        "event-driven architecture kiến trúc hướng sự kiện kafka pub sub decoupling": "event-driven-architecture",
        "cloud cost optimization tối ưu chi phí đám mây finops reserved spot": "cloud-cost-optimization",
        "disaster recovery backup rpo rto 3-2-1 restore": "disaster-recovery-and-backups",
        "immutable infrastructure hạ tầng bất biến cattle pets config drift golden image": "immutable-infrastructure",
        "configuration management quản lý cấu hình env var tách config ansible": "configuration-management",
        "container image optimization tối ưu image docker multi-stage layer caching distroless": "container-image-optimization",
        "kubernetes networking service clusterip ingress dns pod ip": "kubernetes-networking",
        "monitoring alerting golden signals alert fatigue actionable symptom": "monitoring-and-alerting",
        "runbook oncall ca trực rotation escalation toil blameless": "runbooks-and-oncall",
        "serverless architecture faas cold start stateless lambda": "serverless-architecture-patterns",
        "edge computing tính toán tại biên edge function giảm độ trễ cdn": "edge-computing",
        "policy as code opa rego admission controller guardrail tuân thủ": "policy-as-code",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_frontend_web_topics_match():
    from app import skills
    cases = {
        "css cascade specificity độ ưu tiên quy tắc nào thắng important": "css-cascade-and-specificity",
        "state management frontend local global server state redux signals": "state-management-patterns",
        "virtual dom reconciliation diff key trong list react": "virtual-dom-and-reconciliation",
        "browser storage localstorage cookie indexeddb lưu token": "browser-storage",
        "css architecture bem tailwind utility-first css modules scoped": "css-architecture",
        "web bundler webpack vite tree shaking code splitting": "web-build-tools-and-bundlers",
        "tối ưu ảnh web webp avif responsive srcset lazy loading": "web-image-optimization",
        "progressive enhancement html trước baseline graceful degradation": "progressive-enhancement",
        "webauthn passkey đăng nhập không mật khẩu fido2 chống phishing": "webauthn-and-passkeys",
        "data fetching react query swr caching optimistic loading state": "data-fetching-patterns",
        "debounce throttle giới hạn tần suất search scroll": "debouncing-and-throttling",
        "web worker luồng nền offload việc nặng giữ ui mượt postmessage": "web-workers",
        "rendering patterns csr ssr ssg isr hydration islands": "rendering-patterns",
        "micro-frontends chia nhỏ frontend module federation đội độc lập": "micro-frontends",
        "design tokens biến thiết kế semantic primitive theming dark mode": "design-tokens",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_osint_monitoring_topics_match():
    from app import skills
    cases = {
        "osint tình báo nguồn mở thu thập thông tin công khai chu trình": "osint-fundamentals",
        "news aggregation rss feed tổng hợp tin tức polling dedup": "news-aggregation-and-rss",
        "web scraping cào dữ liệu parse html trang động robots.txt": "web-scraping-fundamentals",
        "event detection alerting phát hiện sự kiện spike burst breaking news": "event-detection-and-alerting",
        "data source reliability độ tin cậy nguồn tin corroboration primary": "data-source-reliability",
        "information verification fact-check xác minh reverse image geolocation": "information-verification",
        "media monitoring social listening giám sát mention share of voice bot": "media-monitoring-and-social-listening",
        "sentiment analysis trend phân tích cảm xúc xu hướng aspect sarcasm": "sentiment-and-trend-analysis",
        "geospatial mapping geocoding tọa độ projection geojson spatial index": "geospatial-mapping-and-geocoding",
        "real-time dashboard bảng giám sát thời gian thực glanceable live update": "real-time-monitoring-dashboards",
        "entity resolution deduplication khử trùng lặp fuzzy matching blocking": "entity-resolution-and-deduplication",
        "geopolitical risk analysis rủi ro địa chính trị scenario indicators warnings": "geopolitical-risk-analysis",
        "crisis monitoring giám sát khủng hoảng cảnh báo sớm situational awareness": "crisis-monitoring",
        "monitoring pipeline ingest normalize enrich detect alert backpressure": "monitoring-pipeline-design",
        "data journalism storytelling kể chuyện bằng dữ liệu tránh biểu đồ gây hiểu lầm": "data-journalism-and-storytelling",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_llm_app_topics_match():
    from app import skills
    cases = {
        "agentic rag agent lập luận truy xuất nhiều bước multi-hop self-correct": "agentic-rag",
        "rag chunking chia nhỏ tài liệu kích thước chunk overlap semantic": "rag-chunking-strategies",
        "rag retrieval reranking hybrid search bm25 cross-encoder top-k": "rag-retrieval-and-reranking",
        "rag evaluation đánh giá faithfulness groundedness llm as judge": "rag-evaluation",
        "structured output llm json schema constrained decoding validate": "structured-output-from-llms",
        "llm function calling tool definition arguments agent loop": "llm-function-calling",
        "prompt injection defense tiêm lệnh indirect injection jailbreak least privilege": "prompt-injection-defense",
        "hallucination mitigation giảm ảo giác grounding citation không biết": "hallucination-mitigation",
        "llm guardrails safety lọc input output moderation pii": "llm-guardrails-and-safety",
        "llm cost latency optimization giảm chi phí model routing prompt caching streaming": "llm-cost-and-latency-optimization",
        "semantic caching cache theo ngữ nghĩa embedding similarity threshold": "semantic-caching",
        "agent planning react plan and execute reflection lập kế hoạch": "agent-planning-patterns",
        "document parsing rag trích xuất pdf bảng ocr layout ingest": "document-parsing-for-rag",
        "llm observability tracing chuỗi agent log token cost quality": "llm-observability",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_trading_topics_match():
    from app import skills
    cases = {
        "technical analysis indicators chỉ báo moving average rsi macd bollinger": "technical-analysis-indicators",
        "algorithmic trading strategies trend following mean reversion arbitrage": "algorithmic-trading-strategies",
        "backtesting trading lookahead survivorship overfitting slippage out-of-sample": "backtesting-trading-strategies",
        "risk management trading position sizing stop-loss kelly drawdown": "risk-management-in-trading",
        "order types execution market limit stop slippage twap vwap": "order-types-and-execution",
        "market microstructure order book bid ask spread liquidity depth": "market-microstructure",
        "portfolio theory diversification correlation sharpe efficient frontier": "portfolio-theory-and-diversification",
        "quantitative trading signals alpha beta factor model signal decay": "quantitative-trading-signals",
        "crypto defi trading dex amm liquidity pool impermanent loss gas mev": "crypto-and-defi-trading",
        "options derivatives call put greeks delta theta vega leverage": "options-and-derivatives-basics",
        "high frequency trading hft latency colocation speed arms race": "high-frequency-trading-concepts",
        "trading psychology tâm lý fear greed loss aversion revenge fomo": "trading-psychology",
        "trading bot architecture kiến trúc bot data signal risk execution kill-switch": "trading-bot-architecture",
        "market data ohlcv tick candle level 2 order book split adjusted": "market-data-fundamentals",
        "sentiment-driven trading news social signal already priced in manipulation": "sentiment-driven-trading",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_edtech_tutoring_topics_match():
    from app import skills
    cases = {
        "intelligent tutoring systems its mô hình miền học viên sư phạm adaptive": "intelligent-tutoring-systems",
        "socratic method dạy bằng câu hỏi thay vì trả lời dẫn dắt": "socratic-method-teaching",
        "spaced repetition srs đường cong quên anki khoảng cách tăng dần": "spaced-repetition-systems",
        "adaptive personalized learning điều chỉnh độ khó tốc độ lộ trình": "adaptive-and-personalized-learning",
        "formative assessment feedback đánh giá quá trình phản hồi kịp thời": "formative-assessment-and-feedback",
        "scaffolding zpd giàn giáo vùng phát triển gần fading": "scaffolding-and-zpd",
        "cognitive load theory tải nhận thức bộ nhớ làm việc worked example": "cognitive-load-theory",
        "mastery learning học theo thành thạo trước khi tiến remediation": "mastery-learning",
        "blooms taxonomy learning objectives thang bloom mục tiêu động từ đo được": "blooms-taxonomy-and-objectives",
        "knowledge tracing mô hình hóa kiến thức bayesian deep student model": "knowledge-tracing",
        "building an ai tutor gia sư llm dẫn dắt không cho đáp án grounding": "building-an-ai-tutor",
        "misconception diagnosis chẩn đoán quan niệm sai lỗi có hệ thống đối chất": "misconception-diagnosis",
        "learner motivation engagement động lực growth mindset gamification": "learner-motivation-and-engagement",
        "curriculum sequencing sắp xếp chương trình tiên quyết spiral interleaving": "curriculum-sequencing",
        "retrieval practice testing effect luyện truy hồi active recall đọc lại yếu": "retrieval-practice-and-testing-effect",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_generative_media_topics_match():
    from app import skills
    cases = {
        "how video generation works sinh video ai temporal consistency diffusion": "how-video-generation-works",
        "image to video animation làm ảnh tĩnh chuyển động motion conditioning": "image-to-video-and-animation",
        "motion capture pose estimation bắt chuyển động keypoint retargeting": "motion-capture-and-pose-estimation",
        "keyframe animation interpolation khung chính tween easing timing": "keyframe-animation-and-interpolation",
        "camera cinematography cỡ cảnh góc máy chuyển động bố cục": "camera-and-cinematography-basics",
        "storyboarding shot planning dựng storyboard lập kế hoạch cảnh continuity": "storyboarding-and-shot-planning",
        "video editing dựng phim cut pacing transition j-cut audio": "video-editing-fundamentals",
        "color grading chỉnh màu white balance lut mood consistency": "color-grading-basics",
        "prompt engineering visual media viết prompt sinh ảnh style lighting camera": "prompt-engineering-for-visual-media",
        "controllable image generation controlnet pose depth inpainting lora reference": "controllable-image-generation",
        "audio music generation sinh âm thanh nhạc tts voice cloning": "audio-and-music-generation",
        "lip-sync talking heads đồng bộ môi khuôn mặt nói viseme uncanny": "lip-sync-and-talking-heads",
        "3d scene representation nerf gaussian splatting dựng 3d từ ảnh": "3d-scene-representation",
        "generative media pipeline quy trình sản xuất video ai consistency cross-shot": "generative-media-pipeline",
        "ai avatar character animation rig skeleton vtuber điều khiển bằng motion": "ai-avatar-and-character-animation",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_spec_driven_and_agent_topics_match():
    from app import skills
    cases = {
        "writing a project constitution hiến pháp nguyên tắc nền tảng ràng buộc agent": "writing-a-project-constitution",
        "writing executable specifications viết đặc tả what why acceptance criteria": "writing-executable-specifications",
        "spec clarification ambiguity làm rõ đặc tả mơ hồ câu hỏi trước khi build": "spec-clarification-and-ambiguity-resolution",
        "technical planning from specs lập kế hoạch kỹ thuật kiến trúc từ đặc tả": "technical-planning-from-specs",
        "task decomposition implementation chia kế hoạch thành task vertical slice": "task-decomposition-for-implementation",
        "spec plan consistency analysis đối chiếu spec plan tasks phủ sóng traceability": "spec-plan-consistency-analysis",
        "working with ai coding agents làm việc agent lập trình review giữ kiểm soát": "working-with-ai-coding-agents",
        "prompting coding agents viết chỉ thị cho agent intent constraint done criteria": "prompting-coding-agents",
        "reviewing ai generated code review code ai hallucinate api plausible sai": "reviewing-ai-generated-code",
        "context for coding agents claude.md agents.md ngữ cảnh quy ước": "context-for-coding-agents",
        "iterative development with agents lặp instruct review refine phản hồi cụ thể": "iterative-development-with-agents",
        "preventing agent over-engineering ngăn agent làm quá phức tạp yagni gold-plating": "preventing-agent-over-engineering",
        "human in the loop development con người quyết định checkpoint hành động hệ trọng": "human-in-the-loop-development",
        "intent-driven development tách intent what why khỏi how nguồn sự thật": "intent-driven-development",
        "living documentation tài liệu sống đồng bộ code docs-as-code sinh từ nguồn": "living-documentation",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_build_your_own_x_extra_topics_match():
    from app import skills
    cases = {
        "template engine placeholder parse compile render autoescape": "how-template-engines-work",
        "uuid guid định danh 128 bit v4 v7 không cần phối hợp": "how-uuids-work",
        "diff algorithm longest common subsequence myers so sánh khác biệt": "how-diff-algorithms-work",
        "augmented reality ar slam visual inertial theo dõi vị trí": "how-augmented-reality-works",
        "voxel engine thế giới khối chunking meshing procedural minecraft": "how-voxel-engines-work",
        "chess engine cờ vua minimax alpha-beta evaluation transposition": "how-chess-engines-work",
        "spreadsheet excel công thức đồ thị phụ thuộc tính lại topological": "how-spreadsheet-engines-work",
        "parser biến token thành cây recursive descent grammar precedence": "how-parsers-work",
        "terminal emulator pty escape ansi sequence shell vs terminal": "how-terminal-emulators-work",
        "key-value store get put log index lsm redis": "how-key-value-stores-work",
        "ray tracing mô phỏng ánh sáng tia phản xạ khúc xạ bóng": "how-ray-tracing-works",
        "container runtime namespaces cgroups overlay filesystem tiến trình cô lập": "how-container-runtimes-work",
        "network stack phân tầng link ip tcp application encapsulation": "how-network-stacks-work",
        "syntax highlighting tô màu cú pháp lexing token textmate tree-sitter": "how-syntax-highlighting-works",
        "url shortener mã ngắn base62 redirect 301 302 cache đọc nhiều": "how-url-shorteners-work",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_advanced_llm_ml_topics_match():
    from app import skills
    cases = {
        "rlhf là gì reward model ppo và dpo căn chỉnh": "how-rlhf-works",
        "giải thích mixture of experts moe router sparse": "how-mixture-of-experts-works",
        "lora fine-tuning adapter low-rank qlora peft": "how-lora-fine-tuning-works",
        "knowledge distillation student teacher dark knowledge": "how-knowledge-distillation-works",
        "beam search giữ top-k chuỗi khi giải mã dịch máy": "how-beam-search-works",
        "temperature top-p top-k tham số sinh llm ngẫu nhiên": "how-llm-sampling-works",
        "speculative decoding draft model tăng tốc suy luận": "how-speculative-decoding-works",
        "word embedding word2vec glove vector nghĩa": "how-word-embeddings-work",
        "positional encoding rope sinusoidal mã hóa vị trí": "how-positional-encoding-works",
        "batch norm layer norm chuẩn hóa activation mạng sâu": "how-normalization-in-networks-works",
        "relu gelu sigmoid hàm kích hoạt phi tuyến": "how-activation-functions-work",
        "kv cache bộ nhớ suy luận llm prefill decode": "how-kv-cache-works",
        "multimodal đa phương thức vision language ảnh văn bản": "how-multimodal-models-work",
        "model context protocol mcp tools resources prompts": "how-model-context-protocol-works",
        "vision transformer vit chia ảnh thành patch token": "how-vision-transformers-work",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_messaging_reliability_topics_match():
    from app import skills
    cases = {
        "backpressure áp lực ngược producer nhanh consumer chậm bounded queue": "backpressure-and-flow-control",
        "dead letter queue dlq poison message hàng đợi thư chết": "dead-letter-queues",
        "transactional outbox tránh dual write phát sự kiện tin cậy": "transactional-outbox",
        "delivery semantics at-least-once exactly-once ngữ nghĩa phân phối": "delivery-semantics",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_fintech_payments_topics_match():
    from app import skills
    cases = {
        "double entry accounting kế toán kép ghi nợ ghi có bằng nhau": "how-double-entry-accounting-works",
        "thiết kế ledger sổ cái ví tiền entry bất biến append-only": "designing-a-ledger",
        "xử lý tiền tệ không dùng float lưu số nguyên cents đa tiền tệ": "money-and-currency-handling",
        "payment reconciliation đối soát khớp sổ với sao kê ngân hàng settlement": "payment-reconciliation",
        "subscription billing thanh toán định kỳ proration dunning đổi gói": "subscription-billing-design",
        "ach wire transfer chuyển khoản ngân hàng gom lô không đảo": "how-ach-and-wire-transfers-work",
        "thuế và hóa đơn sales tax vat gst hóa đơn tuần tự credit note": "tax-and-invoicing-basics",
        "pci dss không lưu số thẻ tokenization hosted field saq a": "pci-dss-basics",
        "3d secure sca xác thực mạnh chuyển trách nhiệm gian lận": "how-3d-secure-works",
        "fraud detection phát hiện gian lận velocity false positive review queue": "fraud-detection-basics",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_web_platform_topics_match():
    from app import skills
    cases = {
        "spf dkim dmarc xác thực email chống giả mạo spoofing": "how-spf-dkim-dmarc-work",
        "email deliverability khả năng vào inbox warm-up reputation list hygiene": "email-deliverability",
        "browser rendering critical rendering path dom cssom layout paint composite": "how-browser-rendering-works",
        "web workers luồng nền javascript tính toán nặng không đơ ui": "how-web-workers-work",
        "progressive web app pwa cài được chạy offline manifest service worker": "how-progressive-web-apps-work",
        "source map ánh xạ code minified về source gốc debug stack trace": "how-source-maps-work",
        "lazy loading tải lười code splitting hoãn tải ảnh ngoài màn hình": "how-lazy-loading-works",
        "content security policy csp chặn script nội tuyến chống xss nonce": "how-content-security-policy-works",
        "slowly changing dimensions scd type 2 lưu lịch sử phiên bản chiều": "slowly-changing-dimensions",
        "window function sql running total xếp hạng row_number over partition by": "window-functions-in-sql",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_mobile_topics_match():
    from app import skills
    cases = {
        "kiến trúc app di động tách ui khỏi logic mvvm mvi repository": "mobile-app-architecture",
        "push notification thông báo đẩy device token apns fcm": "how-push-notifications-work",
        "offline-first local db nguồn sự thật đồng bộ hai chiều conflict": "offline-first-mobile-sync",
        "hiệu năng app di động khởi động nhanh cold start cuộn mượt 60fps jank": "mobile-app-performance",
        "app store optimization aso từ khóa icon screenshot đánh giá ranking": "app-store-optimization",
        "deep linking universal link app link mở màn hình app deferred": "how-deep-linking-works",
        "điều hướng di động tab bar drawer stack back stack nút back": "mobile-navigation-patterns",
        "responsive vs adaptive nhiều kích thước màn hình tablet foldable notch": "responsive-vs-adaptive-mobile",
        "tiết kiệm pin và mạng gom việc nền doze giảm đánh thức radio": "battery-and-network-efficiency",
        "khôi phục trạng thái process death os giết app xoay màn hình instance state": "mobile-state-restoration",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_game_dev_topics_match():
    from app import skills
    cases = {
        "quản lý trạng thái game scene menu chơi tạm dừng game over state stack": "game-state-management",
        "sprite animation game sprite sheet atlas máy trạng thái idle run jump": "sprite-and-animation-systems",
        "pathfinding trong game tìm đường npc navmesh a-star steering tránh va chạm": "how-pathfinding-in-games-works",
        "netcode multiplayer server authoritative client prediction interpolation rollback": "game-networking-and-netcode",
        "procedural generation sinh nội dung địa hình noise perlin seed wave function collapse": "procedural-generation-in-games",
        "game camera theo người chơi damping dead zone look-ahead va chạm 3d": "how-game-cameras-work",
        "game ai npc behavior finite state machine behavior tree utility ai đáng tin": "game-ai-behavior",
        "object pooling tái sử dụng đạn particle tránh giật garbage collection": "object-pooling-in-games",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)


def test_skills_privacy_crypto_topics_match():
    from app import skills
    cases = {
        "gdpr quyền riêng tư dữ liệu cơ sở pháp lý tối thiểu hóa quyền xóa": "gdpr-and-data-privacy",
        "xử lý pii tối thiểu hóa thu thập cô lập mã hóa loại khỏi log": "pii-handling-and-minimization",
        "lưu giữ và xóa dữ liệu retention hard soft delete xóa lan tỏa backup": "data-retention-and-deletion",
        "quản lý đồng ý consent opt-in granular ghi bằng chứng cookie rút lại": "consent-management",
        "ẩn danh và bí danh hóa anonymization pseudonymization tái định danh k-anonymity": "data-anonymization-and-pseudonymization",
        "mã hóa đối xứng vs bất đối xứng khóa công khai riêng tư hybrid": "symmetric-vs-asymmetric-encryption",
        "băm và lưu mật khẩu bcrypt argon2 salt hash chậm không plaintext": "password-hashing-and-storage",
        "nhật ký kiểm toán bảo mật audit log append-only chống giả mạo ai làm gì": "security-audit-logging",
    }
    for text, expected_slug in cases.items():
        skill = skills.find_matching_skill(text)
        assert skill is not None, text
        assert skill.slug == expected_slug, (text, skill.slug)
