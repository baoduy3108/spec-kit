"""✦ LUMINA AI — Circuit Breaker (kế thừa PHẦN 7 khung mẫu).

Một engine lỗi liên tiếp quá ngưỡng → "mở cầu dao" tạm thời, để router
chuyển sang engine dự phòng thay vì đập đầu vào API đang chết.
"""

import threading
import time
from enum import Enum


class BreakerState(Enum):
    CLOSED = "closed"        # bình thường
    OPEN = "open"            # đang chặn
    HALF_OPEN = "half_open"  # thử lại dò đường


class CircuitBreaker:
    def __init__(self, threshold: int = 5, timeout: int = 60):
        self.threshold = threshold
        self.timeout = timeout
        self.failure_count = 0
        self.last_failure_time = 0.0
        self.state = BreakerState.CLOSED
        self._lock = threading.RLock()

    def record_success(self):
        with self._lock:
            self.failure_count = 0
            self.state = BreakerState.CLOSED

    def record_failure(self):
        with self._lock:
            self.failure_count += 1
            self.last_failure_time = time.time()
            if self.failure_count >= self.threshold:
                self.state = BreakerState.OPEN

    def allow_request(self) -> bool:
        with self._lock:
            if self.state == BreakerState.CLOSED:
                return True
            if self.state == BreakerState.OPEN:
                if time.time() - self.last_failure_time > self.timeout:
                    self.state = BreakerState.HALF_OPEN
                    return True
                return False
            return True  # HALF_OPEN: cho 1 request thử
