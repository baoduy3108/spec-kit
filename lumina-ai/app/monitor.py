"""✦ LUMINA AI — Thống kê hiệu năng (kế thừa PHẦN 17 khung mẫu)."""

import threading
import time


class PerformanceMonitor:
    def __init__(self, max_history: int = 10000):
        self.max_history = max_history
        self.history: list[dict] = []
        self._lock = threading.RLock()

    def log(self, provider: str, mode: str, latency_ms: int, success: bool):
        with self._lock:
            self.history.append({
                "ts": int(time.time() * 1000),
                "provider": provider,
                "mode": mode,
                "latency": latency_ms,
                "success": success,
            })
            if len(self.history) > self.max_history:
                self.history = self.history[-self.max_history // 2:]

    def stats(self) -> dict:
        with self._lock:
            total = len(self.history)
            if total == 0:
                return {"total_requests": 0, "success_rate": 1.0, "avg_latency_ms": 0, "providers": {}, "modes": {}}
            successes = sum(1 for h in self.history if h["success"])
            avg_latency = sum(h["latency"] for h in self.history) / total
            providers: dict[str, int] = {}
            modes: dict[str, int] = {}
            for h in self.history:
                providers[h["provider"]] = providers.get(h["provider"], 0) + 1
                modes[h["mode"]] = modes.get(h["mode"], 0) + 1
            return {
                "total_requests": total,
                "success_rate": round(successes / total, 4),
                "avg_latency_ms": round(avg_latency),
                "providers": providers,
                "modes": modes,
            }


monitor = PerformanceMonitor()
