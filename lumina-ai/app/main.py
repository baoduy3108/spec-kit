"""✦ LUMINA AI — FastAPI server (kế thừa PHẦN 18 khung mẫu, viết lại hoàn chỉnh).

Endpoints:
  GET  /                    → giao diện chat (static)
  GET  /api/config          → cấu hình public cho frontend (tên app, Google Client ID)
  POST /api/auth/google     → đăng nhập bằng Google ID token → cookie phiên
  POST /api/auth/dev        → đăng nhập khách (chỉ khi DEV_MODE=true)
  POST /api/auth/logout     → đăng xuất
  GET  /api/me              → thông tin người dùng hiện tại (kèm gói đang dùng)
  GET  /api/conversations   → danh sách hội thoại
  GET  /api/conversations/{id} → tin nhắn của một hội thoại
  DELETE /api/conversations/{id}
  POST /api/chat/stream     → chat streaming SSE (bắt buộc đăng nhập)
  GET  /api/plans           → danh sách gói (Miễn phí/Tháng/Năm) + thông tin chuyển khoản
  POST /api/redeem          → nhập mã kích hoạt để nâng cấp gói
  GET  /api/admin/codes     → (quản trị) xem danh sách mã đã tạo
  POST /api/admin/codes     → (quản trị) tạo mã kích hoạt mới
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
from .config import CONFIG, PLANS, validate_config
from .memory import trim_history
from .monitor import monitor
from .orchestrator import orchestrator
from .ratelimit import UserRateLimiter
from .router import decide_route
from .schemas import AdminCreateCodesRequest, ChatRequest, RedeemRequest

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
    plan = db.get_effective_plan(user["id"])
    return {"user": user, "plan": plan}


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


# ─── Gói & mã kích hoạt ──────────────────────────────────────────────────────

@app.get("/api/plans")
async def plans():
    return {
        "plans": list(PLANS.values()),
        "payment": {
            "bank_name": CONFIG["PAYMENT_BANK_NAME"],
            "bank_account": CONFIG["PAYMENT_BANK_ACCOUNT"],
            "bank_owner": CONFIG["PAYMENT_BANK_OWNER"],
            "momo": CONFIG["PAYMENT_MOMO"],
            "note": CONFIG["PAYMENT_NOTE"],
        },
    }


@app.post("/api/redeem")
async def redeem(body: RedeemRequest, user: dict = Depends(auth.require_user)):
    ok, message, plan = db.redeem_activation_code(body.code, user["id"])
    if not ok:
        raise HTTPException(status_code=400, detail=message)
    return {"message": message, "plan": plan}


@app.get("/api/admin/codes")
async def admin_list_codes(user: dict = Depends(auth.require_user)):
    auth.require_admin(user)
    return {"codes": db.list_activation_codes()}


@app.post("/api/admin/codes")
async def admin_create_codes(body: AdminCreateCodesRequest, user: dict = Depends(auth.require_user)):
    auth.require_admin(user)
    if body.plan not in ("monthly", "yearly"):
        raise HTTPException(status_code=400, detail="Gói không hợp lệ — chỉ 'monthly' hoặc 'yearly'.")
    if not (1 <= body.count <= 100):
        raise HTTPException(status_code=400, detail="Số lượng mã phải từ 1 đến 100.")
    duration = PLANS[body.plan]["duration_days"]
    codes = db.create_activation_codes(body.plan, duration, body.count, user["email"])
    return {"codes": codes}


# ─── Chat streaming (SSE) ────────────────────────────────────────────────────

def _sse(data: dict) -> str:
    return f"data: {json.dumps(data, ensure_ascii=False)}\n\n"


@app.post("/api/chat/stream")
async def chat_stream(body: ChatRequest, user: dict = Depends(auth.require_user)):
    plan = db.get_effective_plan(user["id"])

    # Giới hạn lượt/phút theo gói — bảo vệ API key của chủ web
    allowed, wait = rate_limiter.check(user["id"], plan["rpm"], plan["burst"])
    if not allowed:
        raise HTTPException(status_code=429, detail=f"Bạn gửi quá nhanh — chờ {wait} giây rồi thử lại.")

    # Quyết định tầng bộ não: còn lượt cao cấp → Claude; hết → engine free; chạm tổng → chặn.
    daily_ok, use_premium, _ = db.consume_daily_usage(
        user["id"], plan["premium_daily_cap"], plan["total_daily_cap"]
    )
    if not daily_ok:
        raise HTTPException(
            status_code=429,
            detail=f"Bạn đã dùng hết {plan['total_daily_cap']} tin nhắn hôm nay của gói {plan['label']}. "
                   f"Nâng cấp gói Tháng/Năm để chat nhiều hơn (xem mục ✦ Nâng cấp).",
        )
    # Nếu tầng cao cấp không khả dụng (chưa cấu hình Claude) mà có engine free → vẫn chạy free.
    if use_premium and not orchestrator.engines["claude"].available() and orchestrator.has_free_engine():
        use_premium = False

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

    # Tầng free chỉ có 2 "chế độ": tìm kiếm hay không (engine free không có tư duy sâu như Claude).
    apex_allowed = plan["apex_allowed"] and use_premium
    route = decide_route(body.message, history_len=len(history), apex_allowed=apex_allowed)
    # Ẩn nhãn chế độ "cao cấp" khi đang chạy tầng free — để không lộ là đã tụt bộ não.
    display_label = route.label if use_premium else ("🔍 Tìm kiếm web" if route.use_web_search else "✨ LUMINA")
    logger.info("Router: mode=%s premium=%s user=%s", route.mode, use_premium, user["email"])

    async def event_stream():
        yield _sse({
            "type": "router", "mode": route.mode, "label": display_label,
            "conversation_id": conv_id,
        })
        if route.apex_locked:
            yield _sse({
                "type": "upsell",
                "message": "Câu hỏi này hợp với 🌌 Đỉnh cao — nâng cấp gói Tháng/Năm để mở khóa.",
            })
        answer_parts: list[str] = []
        citations: list[dict] = []
        try:
            async for event in orchestrator.run(messages, route, use_premium=use_premium):
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
