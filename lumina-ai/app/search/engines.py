"""✦ LUMINA AI — Search cho engine phụ (kế thừa PHẦN 11 khung mẫu).

Claude có web search tích hợp trên hạ tầng Anthropic nên KHÔNG cần phần này.
Chỉ dùng khi fallback sang OpenAI (không có search riêng):
Tavily (nếu có key) → DuckDuckGo (miễn phí, không cần key).
"""

import logging

import httpx

from ..config import CONFIG
from ..schemas import SearchResult

logger = logging.getLogger("lumina.search")


async def web_search(query: str, max_results: int = 5) -> list[SearchResult]:
    if CONFIG["TAVILY_API_KEY"]:
        try:
            return await _tavily(query, max_results)
        except Exception as exc:
            logger.warning("Tavily lỗi (%s) — chuyển DuckDuckGo", exc)
    try:
        return await _duckduckgo(query, max_results)
    except Exception as exc:
        logger.warning("DuckDuckGo lỗi: %s", exc)
        return []


async def _tavily(query: str, max_results: int) -> list[SearchResult]:
    async with httpx.AsyncClient(timeout=15) as client:
        resp = await client.post(
            "https://api.tavily.com/search",
            json={"api_key": CONFIG["TAVILY_API_KEY"], "query": query, "max_results": max_results},
        )
        resp.raise_for_status()
        data = resp.json()
    return [
        SearchResult(
            title=item.get("title", ""),
            url=item.get("url", ""),
            snippet=item.get("content", item.get("snippet", "")),
            source="tavily",
        )
        for item in data.get("results", [])
    ]


async def _duckduckgo(query: str, max_results: int) -> list[SearchResult]:
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(
            "https://api.duckduckgo.com/",
            params={"q": query, "format": "json", "no_html": 1, "skip_disambig": 1},
        )
        resp.raise_for_status()
        data = resp.json()
    results: list[SearchResult] = []
    for topic in data.get("RelatedTopics", []):
        if "Text" in topic and "FirstURL" in topic:
            results.append(SearchResult(
                title=topic["Text"].split(" - ")[0],
                url=topic["FirstURL"],
                snippet=topic["Text"],
                source="duckduckgo",
            ))
        if len(results) >= max_results:
            break
    if not results and data.get("Abstract"):
        results.append(SearchResult(
            title=data.get("Heading", ""),
            url=data.get("AbstractURL", ""),
            snippet=data.get("Abstract", ""),
            source="duckduckgo",
        ))
    return results[:max_results]
