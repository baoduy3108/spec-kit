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


# ── Gói & mã kích hoạt (DB) ──────────────────────────────────────────────────

def test_new_user_defaults_to_free_plan():
    uid = _new_user_id()
    plan = db.get_effective_plan(uid)
    assert plan["key"] == "free"
    assert plan["apex_allowed"] is False
    assert plan["expires_at"] == 0


def test_redeem_activation_code_upgrades_plan():
    uid = _new_user_id()
    codes = db.create_activation_codes("monthly", 30, 1, "admin@example.com")
    assert len(codes) == 1

    ok, message, plan = db.redeem_activation_code(codes[0], uid)
    assert ok is True
    assert plan["key"] == "monthly"
    assert plan["apex_allowed"] is True
    assert plan["expires_at"] > time.time()

    effective = db.get_effective_plan(uid)
    assert effective["key"] == "monthly"


def test_redeem_code_twice_fails():
    uid1, uid2 = _new_user_id(), _new_user_id()
    codes = db.create_activation_codes("yearly", 365, 1, "admin@example.com")
    ok, _, _ = db.redeem_activation_code(codes[0], uid1)
    assert ok is True
    ok2, message2, plan2 = db.redeem_activation_code(codes[0], uid2)
    assert ok2 is False
    assert plan2 is None
    assert "đã được sử dụng" in message2


def test_redeem_invalid_code_fails():
    uid = _new_user_id()
    ok, message, plan = db.redeem_activation_code("LUMINA-0000-0000", uid)
    assert ok is False
    assert plan is None
    assert "không tồn tại" in message


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
