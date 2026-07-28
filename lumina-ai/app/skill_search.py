"""✦ LUMINA AI — Khớp kỹ năng theo NGỮ NGHĨA (embeddings), làm lớp DỰ PHÒNG.

Bộ khớp chính vẫn là so khớp từ khóa trong `skills.find_matching_skills` (nhanh,
0 chi phí, tất định — mọi test dựa vào nó). Module này chỉ bổ sung khi:
  1. có GEMINI_API_KEY / OPENAI_API_KEY (embeddings_enabled), VÀ
  2. bộ khớp từ khóa KHÔNG tìm được gì (người dùng diễn đạt lệch từ vựng skill).

Khi đó ta nhúng câu hỏi + so cosine với vector từng kỹ năng (đã dựng sẵn & cache
ra đĩa) để tìm kỹ năng LIÊN QUAN VỀ NGHĨA. Không có key → tắt, lùi về từ khóa,
không đổi hành vi, không tốn gì. Việc dựng index chạy NỀN (không chặn chat);
lượt đầu chưa có index thì trả rỗng và tự lùi về từ khóa.
"""
from __future__ import annotations

import asyncio
import hashlib
import json
import logging
import os

from . import skills as skills_mod
from .embeddings import cosine, embed_text, embeddings_enabled

logger = logging.getLogger("lumina.skill_search")

_CACHE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "skill_vectors.json")
_MIN_SIM = 0.62          # ngưỡng cosine tối thiểu để coi là "liên quan"
_index: dict[str, dict] = {}   # slug -> {"hash": str, "vec": list[float]}
_loaded = False
_building = False


def _embed_text_for(skill) -> str:
    return f"{skill.name}. {skill.description} Từ khóa: {', '.join(skill.keywords)}"


def _content_hash(skill) -> str:
    return hashlib.sha1(_embed_text_for(skill).encode("utf-8")).hexdigest()[:12]


def _load_cache() -> None:
    global _loaded
    _loaded = True
    try:
        if os.path.exists(_CACHE_PATH):
            with open(_CACHE_PATH, encoding="utf-8") as f:
                data = json.load(f)
            if isinstance(data, dict):
                _index.update(data)
    except Exception as e:  # noqa: BLE001 — cache hỏng thì bỏ qua, dựng lại
        logger.warning("Không đọc được cache vector kỹ năng: %s", e)


def _save_cache() -> None:
    try:
        os.makedirs(os.path.dirname(_CACHE_PATH), exist_ok=True)
        tmp = _CACHE_PATH + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(_index, f)
        os.replace(tmp, _CACHE_PATH)  # ghi nguyên tử
    except Exception as e:  # noqa: BLE001
        logger.warning("Không lưu được cache vector kỹ năng: %s", e)


async def build_index() -> None:
    """Nhúng các kỹ năng còn thiếu / đã đổi nội dung, cache ra đĩa. Chạy nền, một lần."""
    global _building
    if _building or not embeddings_enabled():
        return
    _building = True
    try:
        if not _loaded:
            _load_cache()
        changed = 0
        for sk in skills_mod.all_skills():
            h = _content_hash(sk)
            cur = _index.get(sk.slug)
            if cur and cur.get("hash") == h and cur.get("vec"):
                continue
            vec = await embed_text(_embed_text_for(sk))
            if vec:
                _index[sk.slug] = {"hash": h, "vec": vec}
                changed += 1
                if changed % 50 == 0:
                    _save_cache()  # lưu dần, tránh mất khi gián đoạn
        if changed:
            _save_cache()
            logger.info("Dựng index ngữ nghĩa kỹ năng: cập nhật %d vector", changed)
    finally:
        _building = False


async def semantic_match(text: str, limit: int = 2, min_sim: float = _MIN_SIM) -> list:
    """Trả tối đa `limit` kỹ năng gần nghĩa nhất (cosine ≥ min_sim). Rỗng nếu tắt
    embeddings, chưa có index, hoặc không đủ giống. KHÔNG bao giờ raise."""
    if not embeddings_enabled():
        return []
    if not _loaded:
        _load_cache()
    # Chưa dựng index → kích hoạt dựng NỀN, lượt này trả rỗng (lùi về từ khóa).
    if not _index:
        try:
            asyncio.create_task(build_index())
        except RuntimeError:
            pass
        return []
    try:
        qv = await embed_text(text)
    except Exception:  # noqa: BLE001
        qv = None
    if not qv:
        return []
    scored = []
    for slug, rec in _index.items():
        v = rec.get("vec")
        if v:
            scored.append((cosine(qv, v), slug))
    scored.sort(reverse=True)
    out = []
    for sim, slug in scored[:limit]:
        if sim >= min_sim:
            sk = skills_mod.get_skill(slug)
            if sk:
                out.append(sk)
    return out
