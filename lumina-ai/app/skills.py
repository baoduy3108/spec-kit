"""✦ LUMINA AI — Thư viện Kỹ năng nội bộ (tuyển chọn từ Claude Skills công khai).

Khác với `knowledge.py` (RAG-lite học DẦN từ Wikipedia, lưu SQLite), đây là nội
dung TĨNH đã tuyển chọn sẵn, nạp từ `data/skills/*.md` lúc khởi động — không
ghi/học thêm lúc chạy. Chỉ áp dụng trong chế độ ⚙️ Lumina Forge (mode "agent"):
so khớp tin nhắn người dùng với từ khóa kích hoạt tiếng Việt (`keywords_vi`,
tự viết khi tuyển chọn) của từng kỹ năng, tiêm kỹ năng khớp nhất (nếu có) vào
system prompt kèm chỉ thị rõ đây là tài liệu tham khảo — LUMINA không có công
cụ chạy bash/git/browser/MCP thật như một coding agent thật.

Nguồn + giấy phép từng kỹ năng: xem `data/skills/ATTRIBUTION.md`.
"""

import os
import re
from typing import NamedTuple

_SKILLS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "skills")
_INJECT_MAX_CHARS = 5000
_MIN_MATCH_SCORE = 1

_FRONTMATTER_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)


class Skill(NamedTuple):
    slug: str
    name: str
    description: str
    category: str
    keywords: tuple[str, ...]
    body: str


def _parse_skill_file(path: str) -> Skill | None:
    with open(path, encoding="utf-8") as f:
        content = f.read()
    m = _FRONTMATTER_RE.match(content)
    if not m:
        return None
    fm: dict[str, str] = {}
    for line in m.group(1).split("\n"):
        if ":" in line:
            k, _, v = line.partition(":")
            fm[k.strip()] = v.strip()
    slug = os.path.splitext(os.path.basename(path))[0]
    keywords = tuple(k.strip().lower() for k in fm.get("keywords_vi", "").split(",") if k.strip())
    return Skill(
        slug=slug,
        name=fm.get("name", slug),
        description=fm.get("description", ""),
        category=fm.get("category", ""),
        keywords=keywords,
        body=content[m.end():].strip(),
    )


def load_skills() -> list[Skill]:
    """Quét data/skills/*.md một lần — nạp thư viện kỹ năng tĩnh vào bộ nhớ."""
    if not os.path.isdir(_SKILLS_DIR):
        return []
    skills = []
    for fn in sorted(os.listdir(_SKILLS_DIR)):
        if not fn.endswith(".md") or fn == "ATTRIBUTION.md":
            continue
        skill = _parse_skill_file(os.path.join(_SKILLS_DIR, fn))
        if skill:
            skills.append(skill)
    return skills


_SKILLS: list[Skill] = load_skills()


def find_matching_skill(text: str) -> Skill | None:
    """So khớp tin nhắn với từ khóa kích hoạt (`keywords_vi`) của từng kỹ năng bằng
    SUBSTRING (không so token chính xác — mô tả gốc là tiếng Anh, so token với câu
    tiếng Việt gần như không bao giờ trúng). Trả kỹ năng điểm cao nhất nếu đạt
    ngưỡng tối thiểu, ngược lại None. Chỉ lấy 1 kỹ năng/lượt để giữ chi phí token
    thấp và tránh trộn nhiều hướng dẫn không liền mạch."""
    t = (text or "").strip().lower()
    if len(t) < 4:
        return None
    best: Skill | None = None
    best_score = 0
    for skill in _SKILLS:
        score = sum(1 for kw in skill.keywords if kw in t)
        if score > best_score:
            best_score = score
            best = skill
    return best if best_score >= _MIN_MATCH_SCORE else None


def build_skill_context(skill: Skill) -> str:
    """Bọc thân kỹ năng trong chỉ thị THAM KHẢO + cắt độ dài để kiểm soát chi phí token."""
    body = skill.body
    if len(body) > _INJECT_MAX_CHARS:
        body = body[:_INJECT_MAX_CHARS].rstrip() + "\n[...cắt bớt...]"
    return (
        f"\n\n[TÀI LIỆU KỸ NĂNG THAM KHẢO — \"{skill.name}\": LUMINA KHÔNG có công cụ chạy "
        "bash/git/browser/MCP thật như một coding agent thật (vd Claude Code) — nếu tài liệu "
        "dưới đây giả định có công cụ đó (vd chạy script, đọc git history, GHI FILE thật ra đĩa), "
        "hãy BỎ QUA phần đó. Nếu tài liệu mô tả việc TẠO/GHI file (vd tài liệu hóa codebase thành "
        "nhiều file), hãy trình bày kết quả dưới dạng NỘI DUNG NGAY TRONG KHUNG CHAT — tuyệt đối "
        "không khẳng định đã tạo/ghi file thật lên hệ thống. Chỉ áp dụng phần kiến thức/phương "
        f"pháp luận diễn đạt được bằng lời, dựa trên những gì người dùng đã dán/đính kèm trong "
        f"cuộc trò chuyện này:\n{body}\n]"
    )
