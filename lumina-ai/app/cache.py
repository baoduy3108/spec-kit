"""✦ LUMINA AI — Response cache nén zlib + TTL (kế thừa PHẦN 5 khung mẫu)."""

import base64
import hashlib
import json
import threading
import time
import zlib
from typing import Optional


class ResponseCache:
    def __init__(self, ttl: int = 3600, max_entries: int = 500):
        self.ttl = ttl
        self.max_entries = max_entries
        self._store: dict[str, tuple[str, float]] = {}
        self._lock = threading.RLock()

    @staticmethod
    def make_key(messages: list[dict], model: str) -> str:
        raw = json.dumps({"messages": messages, "model": model}, sort_keys=True, ensure_ascii=False)
        return hashlib.sha256(raw.encode()).hexdigest()

    def get(self, key: str) -> Optional[dict]:
        with self._lock:
            item = self._store.get(key)
            if not item:
                return None
            data, ts = item
            if time.time() - ts >= self.ttl:
                del self._store[key]
                return None
            try:
                return json.loads(zlib.decompress(base64.b64decode(data)).decode())
            except Exception:
                del self._store[key]
                return None

    def set(self, key: str, value: dict):
        with self._lock:
            if len(self._store) >= self.max_entries:
                # Bỏ mục cũ nhất
                oldest = min(self._store, key=lambda k: self._store[k][1])
                del self._store[oldest]
            compressed = base64.b64encode(zlib.compress(json.dumps(value, ensure_ascii=False).encode())).decode()
            self._store[key] = (compressed, time.time())

    def clear(self):
        with self._lock:
            self._store.clear()
