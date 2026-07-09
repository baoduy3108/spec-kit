"""✦ LUMINA AI — Lưu trữ SQLite: người dùng, hội thoại, tin nhắn, gói & mã kích hoạt."""

import os
import secrets
import sqlite3
import threading
import time
import uuid

from .config import CONFIG, PLANS

_lock = threading.RLock()
_conn: sqlite3.Connection | None = None


def get_conn() -> sqlite3.Connection:
    global _conn
    with _lock:
        if _conn is None:
            path = os.path.abspath(CONFIG["DB_PATH"])
            os.makedirs(os.path.dirname(path), exist_ok=True)
            _conn = sqlite3.connect(path, check_same_thread=False)
            _conn.row_factory = sqlite3.Row
            _init_schema(_conn)
        return _conn


def _init_schema(conn: sqlite3.Connection):
    conn.executescript("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,          -- Google 'sub'
        email TEXT,
        name TEXT,
        picture TEXT,
        plan TEXT NOT NULL DEFAULT 'free',
        plan_expires_at INTEGER NOT NULL DEFAULT 0,  -- 0 = không hết hạn
        created_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS conversations (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT,
        created_at INTEGER,
        updated_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conversation_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        mode TEXT,
        citations TEXT,
        created_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,                  -- mã đơn ngắn, dùng làm nội dung chuyển khoản SePay
        user_id TEXT NOT NULL,
        plan TEXT NOT NULL,                   -- monthly | yearly
        provider TEXT NOT NULL,               -- sepay | paypal
        amount_vnd INTEGER NOT NULL DEFAULT 0,
        amount_usd REAL NOT NULL DEFAULT 0,
        status TEXT NOT NULL DEFAULT 'pending', -- pending | paid | expired
        provider_ref TEXT,                    -- mã giao dịch cổng (PayPal order id / SePay tx)
        created_at INTEGER,
        paid_at INTEGER
    );
    CREATE TABLE IF NOT EXISTS usage_daily (
        user_id TEXT NOT NULL,
        day TEXT NOT NULL,                   -- 'YYYY-MM-DD' (UTC)
        premium_count INTEGER NOT NULL DEFAULT 0,  -- số lượt dùng bộ não cao cấp (Claude)
        total_count INTEGER NOT NULL DEFAULT 0,    -- tổng số tin nhắn (kể cả engine free)
        PRIMARY KEY (user_id, day)
    );
    CREATE INDEX IF NOT EXISTS idx_conv_user ON conversations(user_id, updated_at DESC);
    CREATE INDEX IF NOT EXISTS idx_msg_conv ON messages(conversation_id, id);
    CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id, created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status, created_at DESC);
    """)
    # Thêm cột an toàn cho DB tạo từ phiên bản cũ (bỏ qua nếu cột đã tồn tại)
    for stmt in (
        "ALTER TABLE users ADD COLUMN plan TEXT NOT NULL DEFAULT 'free'",
        "ALTER TABLE users ADD COLUMN plan_expires_at INTEGER NOT NULL DEFAULT 0",
        "ALTER TABLE usage_daily ADD COLUMN premium_count INTEGER NOT NULL DEFAULT 0",
        "ALTER TABLE usage_daily ADD COLUMN total_count INTEGER NOT NULL DEFAULT 0",
    ):
        try:
            conn.execute(stmt)
        except sqlite3.OperationalError:
            pass  # cột đã tồn tại
    conn.commit()


def upsert_user(user_id: str, email: str, name: str, picture: str):
    with _lock:
        conn = get_conn()
        conn.execute(
            """INSERT INTO users(id, email, name, picture, created_at) VALUES(?,?,?,?,?)
               ON CONFLICT(id) DO UPDATE SET email=excluded.email, name=excluded.name, picture=excluded.picture""",
            (user_id, email, name, picture, int(time.time())),
        )
        conn.commit()


def create_conversation(user_id: str, title: str) -> str:
    with _lock:
        conn = get_conn()
        conv_id = uuid.uuid4().hex
        now = int(time.time())
        conn.execute(
            "INSERT INTO conversations(id, user_id, title, created_at, updated_at) VALUES(?,?,?,?,?)",
            (conv_id, user_id, title[:80], now, now),
        )
        conn.commit()
        return conv_id


def get_conversation(conv_id: str, user_id: str) -> dict | None:
    with _lock:
        row = get_conn().execute(
            "SELECT * FROM conversations WHERE id=? AND user_id=?", (conv_id, user_id)
        ).fetchone()
        return dict(row) if row else None


def list_conversations(user_id: str, limit: int = 50) -> list[dict]:
    with _lock:
        rows = get_conn().execute(
            "SELECT id, title, updated_at FROM conversations WHERE user_id=? ORDER BY updated_at DESC LIMIT ?",
            (user_id, limit),
        ).fetchall()
        return [dict(r) for r in rows]


def delete_conversation(conv_id: str, user_id: str) -> bool:
    with _lock:
        conn = get_conn()
        cur = conn.execute("DELETE FROM conversations WHERE id=? AND user_id=?", (conv_id, user_id))
        conn.execute("DELETE FROM messages WHERE conversation_id=?", (conv_id,))
        conn.commit()
        return cur.rowcount > 0


def add_message(conv_id: str, role: str, content: str, mode: str = "", citations: str = ""):
    with _lock:
        conn = get_conn()
        now = int(time.time())
        conn.execute(
            "INSERT INTO messages(conversation_id, role, content, mode, citations, created_at) VALUES(?,?,?,?,?,?)",
            (conv_id, role, content, mode, citations, now),
        )
        conn.execute("UPDATE conversations SET updated_at=? WHERE id=?", (now, conv_id))
        conn.commit()


def get_messages(conv_id: str, limit: int = 200) -> list[dict]:
    with _lock:
        rows = get_conn().execute(
            "SELECT role, content, mode, citations, created_at FROM messages WHERE conversation_id=? ORDER BY id LIMIT ?",
            (conv_id, limit),
        ).fetchall()
        return [dict(r) for r in rows]


def search_messages(user_id: str, keywords: list[str], exclude_conv_id: str = "", limit: int = 40) -> list[dict]:
    """Tìm tin nhắn cũ của CHÍNH người dùng này (ở các hội thoại KHÁC) khớp từ khóa —
    phục vụ tính năng 'nhớ lại cuộc trò chuyện cũ' khi mở hội thoại mới.

    Luôn lọc theo user_id — không bao giờ trộn dữ liệu giữa hai người dùng khác nhau.
    """
    if not keywords:
        return []
    with _lock:
        conditions = " OR ".join(["m.content LIKE ?"] * len(keywords))
        params: list = [kw for kw in ([f"%{k}%" for k in keywords])]
        rows = get_conn().execute(
            f"""SELECT m.id, m.conversation_id, c.title, m.role, m.content, m.created_at
                FROM messages m JOIN conversations c ON m.conversation_id = c.id
                WHERE c.user_id = ? AND c.id != ? AND ({conditions})
                ORDER BY m.created_at DESC LIMIT ?""",
            [user_id, exclude_conv_id] + params + [limit],
        ).fetchall()
        return [dict(r) for r in rows]


# ─── Gói & mã kích hoạt ──────────────────────────────────────────────────────

def get_effective_plan(user_id: str) -> dict:
    """Trả về thông tin gói đang hiệu lực của người dùng (tự hạ về 'free' nếu hết hạn)."""
    with _lock:
        conn = get_conn()
        row = conn.execute("SELECT plan, plan_expires_at FROM users WHERE id=?", (user_id,)).fetchone()
        plan_key = row["plan"] if row else "free"
        expires_at = row["plan_expires_at"] if row else 0
        now = int(time.time())
        if plan_key != "free" and expires_at and expires_at < now:
            # Hết hạn — hạ về free và ghi lại
            conn.execute("UPDATE users SET plan='free', plan_expires_at=0 WHERE id=?", (user_id,))
            conn.commit()
            plan_key, expires_at = "free", 0
        plan = dict(PLANS.get(plan_key, PLANS["free"]))
        plan["expires_at"] = expires_at
        return plan


def set_user_plan(user_id: str, plan_key: str, expires_at: int):
    with _lock:
        conn = get_conn()
        conn.execute("UPDATE users SET plan=?, plan_expires_at=? WHERE id=?", (plan_key, expires_at, user_id))
        conn.commit()


def _activate_plan_locked(conn, user_id: str, plan_key: str, duration_days: int) -> int:
    """Kích hoạt/cộng dồn gói cho user (gọi bên trong _lock). Trả về mốc hết hạn mới."""
    now = int(time.time())
    current = conn.execute("SELECT plan, plan_expires_at FROM users WHERE id=?", (user_id,)).fetchone()
    base = now
    if current and current["plan"] == plan_key and current["plan_expires_at"] > now:
        base = current["plan_expires_at"]  # cùng gói còn hạn → cộng dồn
    new_expires = base + duration_days * 86400
    conn.execute("UPDATE users SET plan=?, plan_expires_at=? WHERE id=?", (plan_key, new_expires, user_id))
    return new_expires


# ─── Đơn hàng (thanh toán tự động) ──────────────────────────────────────────

def _generate_order_id() -> str:
    # Ngắn gọn, chỉ chữ HOA + số — dễ gõ làm nội dung chuyển khoản
    return "LUM" + secrets.token_hex(3).upper()


def create_order(user_id: str, plan_key: str, provider: str, amount_vnd: int, amount_usd: float) -> dict:
    with _lock:
        conn = get_conn()
        # Tránh trùng id
        for _ in range(5):
            oid = _generate_order_id()
            if not conn.execute("SELECT 1 FROM orders WHERE id=?", (oid,)).fetchone():
                break
        now = int(time.time())
        conn.execute(
            "INSERT INTO orders(id, user_id, plan, provider, amount_vnd, amount_usd, status, created_at) "
            "VALUES(?,?,?,?,?,?, 'pending', ?)",
            (oid, user_id, plan_key, provider, amount_vnd, amount_usd, now),
        )
        conn.commit()
        return {"id": oid, "user_id": user_id, "plan": plan_key, "provider": provider,
                "amount_vnd": amount_vnd, "amount_usd": amount_usd, "status": "pending", "created_at": now}


def get_order(order_id: str) -> dict | None:
    with _lock:
        row = get_conn().execute("SELECT * FROM orders WHERE id=?", (order_id.strip().upper(),)).fetchone()
        return dict(row) if row else None


def list_orders(limit: int = 100) -> list[dict]:
    with _lock:
        rows = get_conn().execute(
            "SELECT o.*, u.email FROM orders o LEFT JOIN users u ON u.id=o.user_id "
            "ORDER BY o.created_at DESC LIMIT ?", (limit,),
        ).fetchall()
        return [dict(r) for r in rows]


def mark_order_paid(order_id: str, provider_ref: str = "") -> tuple[bool, dict | None]:
    """Đánh dấu đơn đã trả + kích hoạt gói. IDEMPOTENT: gọi lại đơn đã paid không cộng thêm.

    Trả về (vừa_kích_hoạt, thông_tin_gói). vừa_kích_hoạt=False nếu đơn không tồn tại
    hoặc đã paid từ trước (webhook bắn trùng).
    """
    order_id = order_id.strip().upper()
    with _lock:
        conn = get_conn()
        row = conn.execute("SELECT * FROM orders WHERE id=?", (order_id,)).fetchone()
        if not row or row["status"] == "paid":
            return False, None
        plan_key = row["plan"]
        duration = PLANS.get(plan_key, {}).get("duration_days", 30)
        now = int(time.time())
        new_expires = _activate_plan_locked(conn, row["user_id"], plan_key, duration)
        conn.execute(
            "UPDATE orders SET status='paid', paid_at=?, provider_ref=? WHERE id=?",
            (now, provider_ref, order_id),
        )
        conn.commit()
        plan = dict(PLANS.get(plan_key, PLANS["free"]))
        plan["expires_at"] = new_expires
        return True, plan


def get_daily_usage(user_id: str) -> tuple[int, int]:
    """Trả về (premium_used, total_used) trong ngày hôm nay (UTC)."""
    day = time.strftime("%Y-%m-%d", time.gmtime())
    with _lock:
        row = get_conn().execute(
            "SELECT premium_count, total_count FROM usage_daily WHERE user_id=? AND day=?",
            (user_id, day),
        ).fetchone()
        if not row:
            return 0, 0
        return row["premium_count"], row["total_count"]


def consume_daily_usage(user_id: str, premium_cap: int, total_cap: int) -> tuple[bool, bool, int]:
    """Ghi nhận 1 lượt chat và quyết định dùng tầng nào.

    Trả về (allowed, use_premium, total_used_sau_khi_tăng):
      • allowed=False  → đã chạm total_cap, chặn cứng (gợi ý nâng cấp).
      • use_premium=True  → còn lượt cao cấp → dùng Claude.
      • use_premium=False → hết lượt cao cấp nhưng chưa chạm total_cap → dùng engine free.
    cap <= 0 nghĩa là không giới hạn.
    """
    day = time.strftime("%Y-%m-%d", time.gmtime())
    with _lock:
        conn = get_conn()
        row = conn.execute(
            "SELECT premium_count, total_count FROM usage_daily WHERE user_id=? AND day=?",
            (user_id, day),
        ).fetchone()
        premium_used = row["premium_count"] if row else 0
        total_used = row["total_count"] if row else 0

        if total_cap > 0 and total_used >= total_cap:
            return False, False, total_used

        use_premium = premium_cap <= 0 or premium_used < premium_cap
        conn.execute(
            """INSERT INTO usage_daily(user_id, day, premium_count, total_count) VALUES(?,?,?,1)
               ON CONFLICT(user_id, day) DO UPDATE SET
                   premium_count = premium_count + ?,
                   total_count = total_count + 1""",
            (user_id, day, 1 if use_premium else 0, 1 if use_premium else 0),
        )
        conn.commit()
        return True, use_premium, total_used + 1
