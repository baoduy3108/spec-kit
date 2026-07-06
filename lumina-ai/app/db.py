"""✦ LUMINA AI — Lưu trữ SQLite: người dùng, hội thoại, tin nhắn."""

import os
import sqlite3
import threading
import time
import uuid

from .config import CONFIG

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
    CREATE INDEX IF NOT EXISTS idx_conv_user ON conversations(user_id, updated_at DESC);
    CREATE INDEX IF NOT EXISTS idx_msg_conv ON messages(conversation_id, id);
    """)
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
