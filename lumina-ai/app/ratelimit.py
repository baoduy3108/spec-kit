"""✦ LUMINA AI — Rate limiter token-bucket theo người dùng (kế thừa PHẦN 21 khung mẫu).

Bảo vệ API key của chủ web: mỗi tài khoản Google chỉ được N lượt/phút.
"""

import threading
import time


class TokenBucket:
    def __init__(self, rate_per_minute: int, burst: int):
        self.rate = rate_per_minute / 60.0  # token/giây
        self.capacity = burst
        self.tokens = float(burst)
        self.last_refill = time.monotonic()

    def try_consume(self) -> bool:
        now = time.monotonic()
        self.tokens = min(self.capacity, self.tokens + (now - self.last_refill) * self.rate)
        self.last_refill = now
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False

    def seconds_until_available(self) -> int:
        if self.tokens >= 1:
            return 0
        return int((1 - self.tokens) / self.rate) + 1


class UserRateLimiter:
    def __init__(self, rate_per_minute: int, burst: int):
        self.rate_per_minute = rate_per_minute
        self.burst = burst
        self._buckets: dict[str, TokenBucket] = {}
        self._lock = threading.RLock()

    def check(self, user_id: str) -> tuple[bool, int]:
        """Trả về (được phép, số giây cần chờ nếu bị chặn)."""
        with self._lock:
            bucket = self._buckets.get(user_id)
            if bucket is None:
                bucket = TokenBucket(self.rate_per_minute, self.burst)
                self._buckets[user_id] = bucket
            if bucket.try_consume():
                return True, 0
            return False, bucket.seconds_until_available()
