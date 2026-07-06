"""✦ LUMINA AI — unit tests cho phần lõi (không cần API key / mạng)."""

import os
import sys
import time

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

os.environ.setdefault("DEV_MODE", "true")

from app.cache import ResponseCache  # noqa: E402
from app.circuit_breaker import BreakerState, CircuitBreaker  # noqa: E402
from app.memory import trim_history  # noqa: E402
from app.ratelimit import UserRateLimiter  # noqa: E402
from app.router import decide_route  # noqa: E402
from app.config import CONFIG  # noqa: E402


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
