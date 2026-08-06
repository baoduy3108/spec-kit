"""✦ LUMINA AI — Worldmonitor: dữ liệu THẾ GIỚI cập nhật theo thời gian thực.

Bổ sung cho knowledge.py (Wikipedia/tin tức): module này lấy DỮ LIỆU QUỐC GIA
TƯƠI (dân số, thủ đô, tiền tệ, ngôn ngữ, khu vực…) từ REST Countries API —
MIỄN PHÍ, KHÔNG cần key. Câu hỏi kiểu "dân số Việt Nam", "thủ đô Pháp" sẽ được
trả lời bằng số liệu MỚI thay vì kiến thức cũ trong trọng số model.

Mỗi lần lấy được, ta LƯU vào kho tri thức (knowledge.remember) → "trọng số" của
LUMINA về thế giới tự dày lên theo thời gian. Có cache trong RAM (TTL) để đỡ gọi
mạng lặp. Best-effort: lỗi/không mạng → trả None, chat vẫn chạy bình thường.
"""

from __future__ import annotations

import logging
import time

import httpx

logger = logging.getLogger("lumina.worldmonitor")

_TTL = 6 * 3600  # số liệu quốc gia đổi chậm → cache 6 giờ là hợp lý
_cache: dict[str, tuple[float, dict]] = {}

# Tên nước tiếng Việt (thường gặp) → tên tiếng Anh để hỏi REST Countries.
# Không cần đủ mọi nước — chỉ cần phủ các nước hay được hỏi; nước khác vẫn nhận
# nếu người dùng gõ tên tiếng Anh.
_VI_EN = {
    "việt nam": "Vietnam", "vietnam": "Vietnam", "mỹ": "United States",
    "hoa kỳ": "United States", "trung quốc": "China", "nhật bản": "Japan",
    "nhật": "Japan", "hàn quốc": "South Korea", "triều tiên": "North Korea",
    "pháp": "France", "đức": "Germany", "anh": "United Kingdom", "nga": "Russia",
    "ý": "Italy", "tây ban nha": "Spain", "bồ đào nha": "Portugal",
    "ấn độ": "India", "thái lan": "Thailand", "lào": "Laos",
    "campuchia": "Cambodia", "singapore": "Singapore", "malaysia": "Malaysia",
    "indonesia": "Indonesia", "philippines": "Philippines", "myanmar": "Myanmar",
    "úc": "Australia", "canada": "Canada", "brazil": "Brazil", "brasil": "Brazil",
    "mexico": "Mexico", "argentina": "Argentina", "ai cập": "Egypt",
    "nam phi": "South Africa", "ả rập xê út": "Saudi Arabia",
    "các tiểu vương quốc ả rập": "United Arab Emirates", "thổ nhĩ kỳ": "Turkey",
    "hà lan": "Netherlands", "bỉ": "Belgium", "thụy sĩ": "Switzerland",
    "thụy điển": "Sweden", "na uy": "Norway", "đan mạch": "Denmark",
    "phần lan": "Finland", "ba lan": "Poland", "hy lạp": "Greece",
    "áo": "Austria", "cộng hòa séc": "Czech Republic", "new zealand": "New Zealand",
}

_TRIGGER_WORDS = (
    "dân số", "thủ đô", "diện tích", "tiền tệ", "đơn vị tiền", "quốc gia", "đất nước",
    "population", "capital", "currency", "country", "nước nào", "thuộc châu",
)


def detect_country(query: str) -> str | None:
    """Nếu câu hỏi có tên một quốc gia (Việt/Anh) → trả tên tiếng Anh, else None."""
    q = " " + (query or "").lower().strip() + " "
    # Ưu tiên tên dài (khớp cụ thể) trước để "hàn quốc" không bị "hà" nuốt.
    for vi in sorted(_VI_EN, key=len, reverse=True):
        if f" {vi} " in q or f" {vi}." in q or f" {vi}?" in q or q.strip() == vi:
            return _VI_EN[vi]
    return None


def is_world_query(query: str) -> bool:
    """Câu hỏi có VẺ hỏi số liệu quốc gia (để quyết định có gọi worldmonitor không)."""
    q = (query or "").lower()
    return detect_country(query) is not None and any(w in q for w in _TRIGGER_WORDS)


def _parse_country(data: dict, lang: str = "vi") -> dict | None:
    """REST Countries JSON (1 nước) → 'fact' hợp với knowledge.remember."""
    try:
        name = (data.get("name") or {}).get("common") or ""
        if not name:
            return None
        cap = ", ".join(data.get("capital") or []) or "?"
        pop = data.get("population")
        area = data.get("area")
        region = data.get("region") or ""
        sub = data.get("subregion") or ""
        curr = ", ".join(
            f"{v.get('name','')} ({k})" for k, v in (data.get("currencies") or {}).items()
        ) or "?"
        langs = ", ".join((data.get("languages") or {}).values()) or "?"
        pop_s = f"{pop:,}".replace(",", ".") if isinstance(pop, int) else "?"
        area_s = f"{area:,.0f} km²".replace(",", ".") if isinstance(area, (int, float)) else "?"
        summary = (
            f"{name}: thủ đô {cap}; dân số ~{pop_s}; diện tích {area_s}; "
            f"khu vực {region}{' - ' + sub if sub else ''}; tiền tệ {curr}; ngôn ngữ {langs}."
        )
        return {
            "topic": name.lower(),
            "summary": summary,
            "url": "https://restcountries.com",
            "source": "worldmonitor",
            "lang": lang,
        }
    except Exception:  # noqa: BLE001
        return None


async def fetch_country(en_name: str, lang: str = "vi") -> dict | None:
    """Lấy số liệu quốc gia tươi từ REST Countries (cache TTL). Best-effort."""
    key = en_name.lower()
    now = time.time()
    hit = _cache.get(key)
    if hit and now - hit[0] < _TTL:
        return hit[1]
    url = f"https://restcountries.com/v3.1/name/{en_name}"
    params = {"fullText": "true",
              "fields": "name,capital,population,area,region,subregion,currencies,languages"}
    try:
        async with httpx.AsyncClient(timeout=10, headers={"User-Agent": "LUMINA-AI/1.0"}) as client:
            resp = await client.get(url, params=params)
            if resp.status_code == 404:  # fullText miss → thử khớp mờ
                resp = await client.get(f"https://restcountries.com/v3.1/name/{en_name}",
                                        params={"fields": params["fields"]})
            resp.raise_for_status()
            arr = resp.json()
            if not isinstance(arr, list) or not arr:
                return None
            fact = _parse_country(arr[0], lang)
            if fact:
                _cache[key] = (now, fact)
            return fact
    except Exception as exc:  # noqa: BLE001 — nguồn phụ, hỏng thì bỏ qua êm
        logger.debug("Worldmonitor %s lỗi: %s", en_name, exc)
        return None


async def gather(query: str, lang: str = "vi") -> dict | None:
    """Điểm vào cho knowledge.gather: nếu câu hỏi về một quốc gia → số liệu tươi.

    Trả về 'fact' (đã hợp định dạng) hoặc None. Người gọi tự quyết remember().
    """
    en = detect_country(query)
    if not en:
        return None
    return await fetch_country(en, lang)
