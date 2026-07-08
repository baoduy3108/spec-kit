"""✦ LUMINA AI — Đọc nội dung tệp đính kèm (PDF / Word / Excel / văn bản thuần).

Người dùng gửi tệp → tách chữ ra → đưa vào ngữ cảnh cho bộ não đọc. Không lưu
tệp gốc lại (chỉ dùng cho lượt chat hiện tại), giống cách xử lý ảnh ở media.py.
"""

import base64
import io
import re

_DATA_URL_RE = re.compile(r"^data:(?P<mt>[\w./+-]+);base64,(?P<data>.+)$", re.DOTALL)

# Giới hạn ký tự đưa vào ngữ cảnh — tệp dài sẽ bị cắt bớt (tránh tốn quá nhiều token).
MAX_CHARS_PER_FILE = 15000
MAX_FILES = 3


def _decode(data_url: str) -> bytes | None:
    m = _DATA_URL_RE.match((data_url or "").strip())
    if not m:
        return None
    try:
        return base64.b64decode(m.group("data"))
    except Exception:  # noqa: BLE001
        return None


def _extract_pdf(raw: bytes) -> str:
    from pypdf import PdfReader
    reader = PdfReader(io.BytesIO(raw))
    parts = []
    for page in reader.pages[:60]:  # chặn PDF quá dài (sách trăm trang) làm chậm
        parts.append(page.extract_text() or "")
    return "\n".join(parts)


def _extract_docx(raw: bytes) -> str:
    import docx
    doc = docx.Document(io.BytesIO(raw))
    return "\n".join(p.text for p in doc.paragraphs)


def _extract_xlsx(raw: bytes) -> str:
    import openpyxl
    wb = openpyxl.load_workbook(io.BytesIO(raw), data_only=True, read_only=True)
    lines = []
    for ws in wb.worksheets[:10]:
        lines.append(f"[Sheet: {ws.title}]")
        for row in ws.iter_rows(max_row=500, values_only=True):
            cells = [str(c) for c in row if c is not None]
            if cells:
                lines.append(" | ".join(cells))
    return "\n".join(lines)


def _extract_text(raw: bytes) -> str:
    return raw.decode("utf-8", errors="ignore")


_EXTRACTORS = {
    "application/pdf": _extract_pdf,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": _extract_docx,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": _extract_xlsx,
    "text/plain": _extract_text,
    "text/csv": _extract_text,
    "text/markdown": _extract_text,
}


def extract_text(name: str, data_url: str) -> dict:
    """Trả về {name, text, error}. Không bao giờ raise — lỗi thì trả error, chat vẫn tiếp tục."""
    m = _DATA_URL_RE.match((data_url or "").strip())
    if not m:
        return {"name": name, "text": "", "error": "Định dạng tệp không hợp lệ."}
    media_type = m.group("mt").lower()
    raw = _decode(data_url)
    if raw is None:
        return {"name": name, "text": "", "error": "Không đọc được tệp."}

    extractor = _EXTRACTORS.get(media_type)
    if not extractor and name.lower().endswith((".txt", ".md", ".csv")):
        extractor = _extract_text
    if not extractor:
        return {"name": name, "text": "",
                "error": f"LUMINA chưa đọc được định dạng này ({media_type or 'không rõ'})."}

    try:
        text = extractor(raw).strip()
    except Exception as exc:  # noqa: BLE001 — tệp hỏng/định dạng lạ không được làm sập chat
        return {"name": name, "text": "", "error": f"Không đọc được nội dung tệp: {exc}"}

    if not text:
        return {"name": name, "text": "", "error": "Tệp rỗng hoặc không trích được chữ (có thể là ảnh scan)."}

    truncated = len(text) > MAX_CHARS_PER_FILE
    return {"name": name, "text": text[:MAX_CHARS_PER_FILE], "error": "", "truncated": truncated}


def build_context(files: list[dict]) -> str:
    """Ghép nội dung các tệp đã đọc thành khối ngữ cảnh cho bộ não."""
    blocks = []
    for f in files:
        if f.get("error"):
            continue
        note = " (đã cắt bớt vì quá dài)" if f.get("truncated") else ""
        blocks.append(f"--- Tệp: {f['name']}{note} ---\n{f['text']}")
    if not blocks:
        return ""
    return "\n\n[NỘI DUNG TỆP NGƯỜI DÙNG GỬI:\n" + "\n\n".join(blocks) + "\n]"
