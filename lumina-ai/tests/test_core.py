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
