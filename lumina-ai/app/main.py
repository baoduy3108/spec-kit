"""✦ LUMINA AI — FastAPI server (kế thừa PHẦN 18 khung mẫu, viết lại hoàn chỉnh).

Endpoints:
  GET  /                    → giao diện chat (static)
  GET  /api/config          → cấu hình public cho frontend (tên app, Google Client ID)
  POST /api/auth/google     → đăng nhập bằng Google ID token → cookie phiên
  POST /api/auth/dev        → đăng nhập khách (chỉ khi DEV_MODE=true)
  POST /api/auth/logout     → đăng xuất
  GET  /api/me              → thông tin người dùng hiện tại
  GET  /api/conversations   → danh sách hội thoại
  GET  /api/conversations/{id} → tin nhắn của một hội thoại
  DELETE /api/conversations/{id}
  POST /api/chat/stream     → chat streaming SSE (bắt buộc đăng nhập)
  GET  /health              → kiểm tra sức khỏe
  GET  /api/metrics         → thống kê hiệu năng
"""

import json
import logging
import os

from fastapi import Depends, FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from . import auth, db
from .cache import ResponseCache
from .config import CONFIG, validate_config
from .memory import trim_history
from .monitor import monitor
from .orchestrator import orchestrator
from .ratelimit import UserRateLimiter
from .router import decide_route
from .schemas import ChatRequest

logging.basicConfig(level=getattr(logging, CONFIG["LOG_LEVEL"], logging.INFO))
logger = logging.getLogger("lumina")

app = FastAPI(title=CONFIG["APP_NAME"], version=CONFIG["APP_VERSION"], docs_url=None, redoc_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("ALLOWED_ORIGIN", "*")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rate_limiter = UserRateLimiter(CONFIG["RATE_LIMIT_REQUESTS_PER_MINUTE"], CONFIG["RATE_LIMIT_BURST"])
cache = ResponseCache(ttl=CONFIG["CACHE_TTL"])

_STATIC_DIR = os.path.join(os.path.dirname(__file__), "..", "static")


@app.on_event("startup")
async def startup():
    for warning in validate_config():
        logger.warning("⚠️  %s", warning)
    db.get_conn()
    logger.info("✦ %s v%s sẵn sàng — engines: %s",
                CONFIG["APP_NAME"], CONFIG["APP_VERSION"],
                ", ".join(orchestrator.available_engines()) or "CHƯA CÓ (thiếu API key)")


# ─── Auth ────────────────────────────────────────────────────────────────────

class GoogleLoginBody(BaseModel):
    credential: str


def _set_session_cookie(response: Response, token: str):
    response.set_cookie(
        auth.COOKIE_NAME, token,
        max_age=CONFIG["SESSION_TTL_HOURS"] * 3600,
        httponly=True, samesite="lax",
        secure=not CONFIG["DEV_MODE"],
    )


@app.post("/api/auth/google")
async def login_google(body: GoogleLoginBody, response: Response):
    user = auth.verify_google_token(body.credential)
    token = auth.issue_session(user)
    _set_session_cookie(response, token)
    return {"user": user}


@app.post("/api/auth/dev")
async def login_dev(response: Response):
    if not CONFIG["DEV_MODE"]:
        raise HTTPException(status_code=403, detail="Chế độ DEV không được bật")
    user = auth.dev_guest_user()
    token = auth.issue_session(user)
    _set_session_cookie(response, token)
    return {"user": user}


@app.post("/api/auth/logout")
async def logout(response: Response):
    response.delete_cookie(auth.COOKIE_NAME)
    return {"ok": True}


@app.get("/api/me")
async def me(user: dict = Depends(auth.require_user)):
    return {"user": user}


@app.get("/api/config")
async def public_config():
    return {
        "app_name": CONFIG["APP_NAME"],
        "tagline": CONFIG["APP_TAGLINE"],
        "version": CONFIG["APP_VERSION"],
        "google_client_id": CONFIG["GOOGLE_CLIENT_ID"],
        "dev_mode": CONFIG["DEV_MODE"],
    }


# ─── Hội thoại ───────────────────────────────────────────────────────────────

@app.get("/api/conversations")
async def conversations(user: dict = Depends(auth.require_user)):
    return {"conversations": db.list_conversations(user["id"])}


@app.get("/api/conversations/{conv_id}")
async def conversation_messages(conv_id: str, user: dict = Depends(auth.require_user)):
    conv = db.get_conversation(conv_id, user["id"])
    if not conv:
        raise HTTPException(status_code=404, detail="Không tìm thấy hội thoại")
    return {"conversation": conv, "messages": db.get_messages(conv_id)}


@app.delete("/api/conversations/{conv_id}")
async def remove_conversation(conv_id: str, user: dict = Depends(auth.require_user)):
    if not db.delete_conversation(conv_id, user["id"]):
        raise HTTPException(status_code=404, detail="Không tìm thấy hội thoại")
    return {"ok": True}


# ─── Chat streaming (SSE) ────────────────────────────────────────────────────

def _sse(data: dict) -> str:
    return f"data: {json.dumps(data, ensure_ascii=False)}\n\n"


@app.post("/api/chat/stream")
async def chat_stream(body: ChatRequest, user: dict = Depends(auth.require_user)):
    # Giới hạn lượt theo người dùng — bảo vệ API key của chủ web
    allowed, wait = rate_limiter.check(user["id"])
    if not allowed:
        raise HTTPException(status_code=429, detail=f"Bạn gửi quá nhanh — chờ {wait} giây rồi thử lại.")

    # Hội thoại: tạo mới hoặc nối tiếp
    conv_id = body.conversation_id
    if conv_id:
        if not db.get_conversation(conv_id, user["id"]):
            raise HTTPException(status_code=404, detail="Không tìm thấy hội thoại")
    else:
        conv_id = db.create_conversation(user["id"], body.message)

    history = [
        {"role": m["role"], "content": m["content"]}
        for m in db.get_messages(conv_id)
        if m["role"] in ("user", "assistant") and m["content"]
    ]
    db.add_message(conv_id, "user", body.message)
    messages = trim_history(history + [{"role": "user", "content": body.message}],
                            CONFIG["MAX_CONTEXT_TOKENS"])

    route = decide_route(body.message, history_len=len(history))
    logger.info("Router: mode=%s model=%s user=%s", route.mode, route.model, user["email"])

    async def event_stream():
        yield _sse({
            "type": "router", "mode": route.mode, "label": route.label,
            "conversation_id": conv_id,
        })
        answer_parts: list[str] = []
        citations: list[dict] = []
        try:
            async for event in orchestrator.run(messages, route):
                if event["type"] == "text":
                    answer_parts.append(event["text"])
                elif event["type"] == "citations":
                    citations.extend(event.get("items", []))
                yield _sse(event)
        except Exception:
            logger.exception("Lỗi stream")
            yield _sse({"type": "error", "message": "Lỗi máy chủ không xác định."})
        finally:
            answer = "".join(answer_parts)
            if answer:
                db.add_message(conv_id, "assistant", answer, mode=route.mode,
                               citations=json.dumps(citations, ensure_ascii=False))
            yield _sse({"type": "done", "conversation_id": conv_id})

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


# ─── Giám sát ────────────────────────────────────────────────────────────────

@app.get("/health")
async def health():
    engines = orchestrator.available_engines()
    return JSONResponse({
        "status": "ok" if engines else "degraded",
        "app": CONFIG["APP_NAME"],
        "version": CONFIG["APP_VERSION"],
        "engines": engines,
        "warnings": validate_config(),
    })


@app.get("/api/metrics")
async def metrics():
    return monitor.stats()


# ─── Frontend tĩnh ───────────────────────────────────────────────────────────

@app.get("/")
async def index():
    return FileResponse(os.path.join(_STATIC_DIR, "index.html"))


app.mount("/static", StaticFiles(directory=_STATIC_DIR), name="static")
