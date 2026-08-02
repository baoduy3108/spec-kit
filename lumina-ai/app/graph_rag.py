"""✦ LUMINA AI — GraphRAG-lite: RAG trên KNOWLEDGE GRAPH thay vì vector phẳng.

Khác RAG vector (tìm đoạn giống nhau về nghĩa), GraphRAG dựng một ĐỒ THỊ TRI THỨC
từ tài liệu — nút = thực thể (người/nơi/khái niệm), cạnh = quan hệ (đồng xuất hiện) —
rồi trả lời bằng cách:
  • local  — bám vào thực thể trong câu hỏi, mở rộng ra hàng xóm (quan hệ trực tiếp).
  • global — nhìn toàn cục: các "hub" (thực thể trung tâm) + liên kết mạnh nhất, để
             trả lời câu hỏi tổng thể mà RAG vector khó (vì không có đoạn nào chứa cả).

Trích thực thể MẶC ĐỊNH là NHẸ (không tốn token): bắt chuỗi danh từ riêng viết hoa
(hợp cả tiếng Việt: "Đạo Đức Kinh", "Lão Tử", "Hà Nội") + đồng xuất hiện trong câu.
Muốn CHẤT LƯỢNG cao hơn: cắm hàm trích bằng LLM vào `set_llm_extractor()` — API giữ
nguyên. Xem skill `how-graphrag-works` để hiểu cơ chế đầy đủ.
"""

from __future__ import annotations

import os
import re
import sqlite3
import threading
import time
from collections import defaultdict

from .config import CONFIG

_conn: sqlite3.Connection | None = None
_lock = threading.Lock()
_llm_extractor = None  # optional: callable(text) -> list[(entity, entity, relation)]

# Chuỗi từ viết hoa (danh từ riêng) — liệt kê RÕ hoa/thường tiếng Việt vì dải
# "À-Ỹ" lỡ gồm cả chữ THƯỜNG có dấu (ế, ố…) → sẽ bắt trúng mảnh giữa từ.
_UP = "A-ZÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ"
_LO = "a-zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ"
_ENTITY_RE = re.compile(
    f"[{_UP}][{_LO}]+(?:\\s+[{_UP}0-9][{_LO}]*){{0,4}}"
)
_SENT_SPLIT = re.compile(r"[.!?;\n]+|(?<=[一-鿿])。")
# Từ hay đứng đầu câu bị viết hoa nhầm thành "thực thể" — loại bớt nhiễu.
_STOP = {
    "the", "a", "an", "this", "that", "these", "those", "it", "he", "she", "they", "we", "i",
    "và", "là", "của", "một", "các", "những", "này", "đó", "khi", "nếu", "vì", "cho", "với",
    "trong", "trên", "dưới", "để", "được", "có", "không", "the", "in", "on", "of", "and", "but",
}


def _get_conn() -> sqlite3.Connection:
    global _conn
    with _lock:
        if _conn is None:
            path = os.path.join(os.path.dirname(os.path.abspath(CONFIG["DB_PATH"])), "graph.db")
            os.makedirs(os.path.dirname(path), exist_ok=True)
            _conn = sqlite3.connect(path, check_same_thread=False)
            _conn.execute(
                """CREATE TABLE IF NOT EXISTS gnodes(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL UNIQUE,   -- tên thường hóa (key)
                    label TEXT NOT NULL,         -- tên hiển thị gốc
                    mentions INTEGER DEFAULT 0,
                    updated_at INTEGER NOT NULL
                )"""
            )
            _conn.execute(
                """CREATE TABLE IF NOT EXISTS gedges(
                    src INTEGER NOT NULL,
                    dst INTEGER NOT NULL,
                    relation TEXT DEFAULT '',
                    weight INTEGER DEFAULT 1,
                    updated_at INTEGER NOT NULL,
                    PRIMARY KEY(src, dst)
                )"""
            )
            _conn.execute("CREATE INDEX IF NOT EXISTS idx_edge_src ON gedges(src)")
            _conn.execute("CREATE INDEX IF NOT EXISTS idx_edge_dst ON gedges(dst)")
            _conn.commit()
        return _conn


def set_llm_extractor(fn) -> None:
    """Cắm hàm trích quan hệ bằng LLM: fn(text) -> [(entityA, entityB, relation), ...]."""
    global _llm_extractor
    _llm_extractor = fn


def _norm(name: str) -> str:
    return re.sub(r"\s+", " ", name.strip()).lower()


def _extract_entities(sentence: str) -> list[str]:
    """Trích danh từ riêng trong 1 câu (bản nhẹ, không LLM)."""
    out, seen = [], set()
    for m in _ENTITY_RE.finditer(sentence):
        ent = m.group(0).strip()
        key = _norm(ent)
        if len(key) < 2 or key in _STOP or key.isdigit():
            continue
        if key not in seen:
            seen.add(key)
            out.append(ent)
    return out


def _upsert_node(conn, label: str) -> int:
    key = _norm(label)
    now = int(time.time())
    cur = conn.execute("SELECT id FROM gnodes WHERE name=?", (key,)).fetchone()
    if cur:
        conn.execute("UPDATE gnodes SET mentions=mentions+1, updated_at=? WHERE id=?", (now, cur[0]))
        return cur[0]
    cur = conn.execute(
        "INSERT INTO gnodes(name,label,mentions,updated_at) VALUES(?,?,1,?)", (key, label, now)
    )
    return cur.lastrowid


def _upsert_edge(conn, a: int, b: int, relation: str) -> None:
    if a == b:
        return
    src, dst = (a, b) if a < b else (b, a)  # vô hướng: chuẩn hóa thứ tự
    now = int(time.time())
    cur = conn.execute("SELECT weight FROM gedges WHERE src=? AND dst=?", (src, dst)).fetchone()
    if cur:
        conn.execute("UPDATE gedges SET weight=weight+1, updated_at=?, relation=CASE WHEN relation='' THEN ? ELSE relation END WHERE src=? AND dst=?",
                     (now, relation, src, dst))
    else:
        conn.execute("INSERT INTO gedges(src,dst,relation,weight,updated_at) VALUES(?,?,?,1,?)",
                     (src, dst, relation, now))


def ingest_text(text: str, source: str = "") -> dict:
    """Dựng/cập nhật đồ thị từ một đoạn văn bản (tài liệu). Trả thống kê thêm được."""
    if not (text or "").strip():
        return {"nodes": 0, "edges": 0}
    conn = _get_conn()
    n_nodes = n_edges = 0
    with _lock:
        # 1) nếu có LLM extractor → dùng quan hệ chuẩn; else đồng xuất hiện theo câu.
        triples = None
        if _llm_extractor is not None:
            try:
                triples = _llm_extractor(text)
            except Exception:  # noqa: BLE001 — LLM lỗi → lùi về bản nhẹ
                triples = None
        if triples is not None:
            for a, b, rel in triples:
                ia, ib = _upsert_node(conn, a), _upsert_node(conn, b)
                _upsert_edge(conn, ia, ib, (rel or "")[:40]); n_edges += 1
            n_nodes = len({_norm(a) for a, _, _ in triples} | {_norm(b) for _, b, _ in triples})
        else:
            for sent in _SENT_SPLIT.split(text):
                ents = _extract_entities(sent)[:8]  # chặn câu quá nhiều thực thể
                ids = [_upsert_node(conn, e) for e in ents]
                n_nodes += len(ids)
                for i in range(len(ids)):
                    for j in range(i + 1, len(ids)):
                        _upsert_edge(conn, ids[i], ids[j], "")
                        n_edges += 1
        conn.commit()
    return {"nodes": n_nodes, "edges": n_edges, "source": source}


def _node_by_query(conn, term: str) -> list[tuple[int, str, int]]:
    key = _norm(term)
    rows = conn.execute(
        "SELECT id,label,mentions FROM gnodes WHERE name=? OR name LIKE ? ORDER BY mentions DESC LIMIT 4",
        (key, f"%{key}%"),
    ).fetchall()
    return rows


def _neighbors(conn, node_id: int, limit: int = 6) -> list[tuple[str, str, int]]:
    rows = conn.execute(
        """SELECT n.label, e.relation, e.weight FROM gedges e
           JOIN gnodes n ON n.id = CASE WHEN e.src=? THEN e.dst ELSE e.src END
           WHERE e.src=? OR e.dst=? ORDER BY e.weight DESC LIMIT ?""",
        (node_id, node_id, node_id, limit),
    ).fetchall()
    return rows


def local_search(query: str, hops: int = 1, max_seeds: int = 4) -> dict:
    """Bám thực thể trong câu hỏi → mở rộng hàng xóm (quan hệ trực tiếp)."""
    conn = _get_conn()
    terms = _extract_entities(query) or re.findall(r"\w[\wà-ỹ]{2,}", query)
    seeds, seen = [], set()
    with _lock:
        for t in terms:
            for nid, label, ment in _node_by_query(conn, t):
                if nid not in seen:
                    seen.add(nid); seeds.append((nid, label, ment))
        seeds = sorted(seeds, key=lambda x: -x[2])[:max_seeds]
        result = []
        for nid, label, ment in seeds:
            result.append({"entity": label, "mentions": ment,
                           "links": [{"to": r[0], "relation": r[1], "weight": r[2]}
                                     for r in _neighbors(conn, nid)]})
    return {"scope": "local", "seeds": [s[1] for s in seeds], "entities": result}


def global_overview(limit: int = 8) -> dict:
    """Nhìn toàn cục: các hub (bậc/đề cập cao nhất) + liên kết mạnh — cho câu hỏi tổng thể."""
    conn = _get_conn()
    with _lock:
        deg = defaultdict(int)
        for src, dst, w in conn.execute("SELECT src,dst,weight FROM gedges").fetchall():
            deg[src] += w; deg[dst] += w
        rows = conn.execute("SELECT id,label,mentions FROM gnodes").fetchall()
        ranked = sorted(rows, key=lambda r: -(deg.get(r[0], 0) * 2 + r[2]))[:limit]
        hubs = []
        for nid, label, ment in ranked:
            hubs.append({"entity": label, "degree": deg.get(nid, 0), "mentions": ment,
                         "links": [{"to": r[0], "weight": r[2]} for r in _neighbors(conn, nid, 4)]})
    return {"scope": "global", "hubs": hubs}


def build_context(res: dict) -> str:
    """Ghép kết quả đồ thị thành khối ngữ cảnh cho bộ não (giống knowledge.build_context)."""
    lines = []
    if res.get("scope") == "local":
        for e in res.get("entities", []):
            links = ", ".join(f"{l['to']}" + (f" ({l['relation']})" if l['relation'] else "")
                              for l in e["links"])
            lines.append(f"• {e['entity']} — liên quan: {links or '(chưa có)'}")
    else:
        for h in res.get("hubs", []):
            links = ", ".join(l["to"] for l in h["links"])
            lines.append(f"• {h['entity']} (trung tâm, bậc {h['degree']}) — {links}")
    if not lines:
        return ""
    tag = "cục bộ quanh thực thể" if res.get("scope") == "local" else "toàn cục"
    return ("\n\n[ĐỒ THỊ TRI THỨC (GraphRAG — " + tag + "):\n" + "\n".join(lines) + "\n]")


def stats() -> dict:
    conn = _get_conn()
    with _lock:
        n = conn.execute("SELECT COUNT(*) FROM gnodes").fetchone()[0]
        e = conn.execute("SELECT COUNT(*) FROM gedges").fetchone()[0]
    return {"nodes": n, "edges": e}


def reset() -> None:
    """Xóa toàn bộ đồ thị (dùng cho test/khởi tạo lại)."""
    conn = _get_conn()
    with _lock:
        conn.execute("DELETE FROM gnodes"); conn.execute("DELETE FROM gedges"); conn.commit()
