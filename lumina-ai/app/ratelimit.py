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

    def check(self, user_id: str, rate_per_minute: int | None = None, burst: int | None = None) -> tuple[bool, int]:
        """Trả về (được phép, số giây cần chờ nếu bị chặn).

        Truyền rate_per_minute/burst để áp giới hạn theo gói của người dùng
        (gói trả phí có hạn mức cao hơn mặc định). Nếu hạn mức gói thay đổi
        (vừa nâng cấp), bucket được cấp lại dung lượng mới ngay lập tức.
        """
        rpm = rate_per_minute if rate_per_minute is not None else self.rate_per_minute
        cap = burst if burst is not None else self.burst
        with self._lock:
            bucket = self._buckets.get(user_id)
            if bucket is None:
                bucket = TokenBucket(rpm, cap)
                self._buckets[user_id] = bucket
            elif bucket.capacity != cap:
                extra = cap - bucket.capacity
                bucket.capacity = cap
                bucket.rate = rpm / 60.0
                if extra > 0:
                    bucket.tokens += extra
            if bucket.try_consume():
                return True, 0
            return False, bucket.seconds_until_available()
