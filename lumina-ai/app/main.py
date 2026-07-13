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
  POST /api/chat/stream     → chat streaming SSE (bắt buộc đăng nhập) — nhận cả ảnh/video/tệp
  POST /api/dub             → 🗣 lồng tiếng + gắn phụ đề video (job nền)
  GET  /api/dub/{job_id}    → poll trạng thái job lồng tiếng
  GET  /api/dub/{job_id}/download → tải video đã lồng tiếng
  GET  /api/plans           → danh sách gói + cổng thanh toán đang bật
  POST /api/orders          → tạo đơn mua gói (SePay → QR; PayPal → order id)
  GET  /api/orders/{id}     → poll trạng thái đơn (pending/paid)
  POST /api/orders/{id}/paypal-capture → thu tiền PayPal sau khi khách duyệt
  POST /api/webhook/sepay   → SePay báo có tiền vào → tự kích hoạt gói
  GET  /api/admin/orders    → (quản trị) xem danh sách đơn hàng
  POST /api/admin/orders/{id}/confirm → (quản trị) xác nhận tay 1 đơn khi webhook lỗi
  GET  /health              → kiểm tra sức khỏe
  GET  /api/metrics         → thống kê hiệu năng
"""

import asyncio
import json
import logging
import os

from fastapi import Depends, FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from . import auth, config, db, files, media, payments, recall, video_dub, webpage
from .cache import ResponseCache
from .config import CONFIG, PLANS, validate_config
from .memory import trim_history
from .monitor import monitor
from .orchestrator import orchestrator
from .ratelimit import UserRateLimiter
from .router import decide_route
from .schemas import ChatRequest, CreateOrderRequest, DubRequest, PaypalCaptureRequest

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


# ─── Gói & thanh toán tự động ────────────────────────────────────────────────

@app.get("/api/plans")
async def plans():
    return {
        "plans": list(PLANS.values()),
        "providers": {
            "sepay": config.sepay_enabled(),
            "paypal": config.paypal_enabled(),
            "paypal_client_id": CONFIG["PAYPAL_CLIENT_ID"] if config.paypal_enabled() else "",
        },
    }


@app.post("/api/orders")
async def create_order(body: CreateOrderRequest, user: dict = Depends(auth.require_user)):
    """Tạo đơn mua gói. SePay → trả link QR + nội dung; PayPal → trả paypal_order_id."""
    if body.plan not in ("monthly", "yearly"):
        raise HTTPException(status_code=400, detail="Gói không hợp lệ.")
    plan = PLANS[body.plan]

    if body.provider == "sepay":
        if not config.sepay_enabled():
            raise HTTPException(status_code=503, detail="Chưa cấu hình chuyển khoản VN (SePay).")
        order = db.create_order(user["id"], body.plan, "sepay", plan["price_vnd"], 0.0)
        qr = payments.build_vietqr_url(
            CONFIG["PAYMENT_BANK_BIN"], CONFIG["PAYMENT_BANK_ACCOUNT"],
            CONFIG["PAYMENT_BANK_OWNER"], plan["price_vnd"], order["id"],
        )
        return {
            "order_id": order["id"], "provider": "sepay",
            "qr_url": qr, "amount_vnd": plan["price_vnd"], "content": order["id"],
            "bank_name": CONFIG["PAYMENT_BANK_NAME"], "bank_account": CONFIG["PAYMENT_BANK_ACCOUNT"],
            "bank_owner": CONFIG["PAYMENT_BANK_OWNER"],
        }

    if body.provider == "paypal":
        if not config.paypal_enabled():
            raise HTTPException(status_code=503, detail="Chưa cấu hình PayPal.")
        order = db.create_order(user["id"], body.plan, "paypal", 0, plan["price_usd"])
        try:
            pp_id = await payments.create_paypal_order(
                order["id"], plan["price_usd"], f"{CONFIG['APP_NAME']} {plan['label']}"
            )
        except Exception:
            logger.exception("Tạo đơn PayPal lỗi")
            raise HTTPException(status_code=502, detail="Không tạo được đơn PayPal — thử lại sau.")
        return {"order_id": order["id"], "provider": "paypal", "paypal_order_id": pp_id,
                "amount_usd": plan["price_usd"]}

    raise HTTPException(status_code=400, detail="Cổng thanh toán không hợp lệ.")


@app.get("/api/orders/{order_id}")
async def order_status(order_id: str, user: dict = Depends(auth.require_user)):
    """Frontend poll cái này tới khi status='paid'."""
    order = db.get_order(order_id)
    if not order or order["user_id"] != user["id"]:
        raise HTTPException(status_code=404, detail="Không tìm thấy đơn.")
    return {"order_id": order["id"], "status": order["status"]}


@app.post("/api/orders/{order_id}/paypal-capture")
async def paypal_capture(order_id: str, body: PaypalCaptureRequest, user: dict = Depends(auth.require_user)):
    """Frontend gọi sau khi khách duyệt trên PayPal (onApprove). Server thu tiền + kích hoạt."""
    order = db.get_order(order_id)
    if not order or order["user_id"] != user["id"]:
        raise HTTPException(status_code=404, detail="Không tìm thấy đơn.")
    try:
        ok, custom_id, amount = await payments.capture_paypal_order(body.paypal_order_id)
    except Exception:
        logger.exception("Capture PayPal lỗi")
        raise HTTPException(status_code=502, detail="Không thu được tiền PayPal.")
    # Chống gian lận: custom_id phải khớp đơn + số tiền đủ
    if not ok or custom_id != order["id"] or amount + 1e-6 < order["amount_usd"]:
        raise HTTPException(status_code=400, detail="Thanh toán PayPal không hợp lệ.")
    activated, plan = db.mark_order_paid(order["id"], provider_ref=body.paypal_order_id)
    return {"status": "paid", "plan": plan}


@app.post("/api/webhook/sepay")
async def sepay_webhook(request: Request):
    """SePay gọi khi có tiền vào tài khoản. Xác thực Apikey → khớp đơn → kích hoạt."""
    if not payments.verify_sepay_authorization(request.headers.get("authorization", "")):
        raise HTTPException(status_code=401, detail="Sai xác thực SePay.")
    data = await request.json()
    if (data.get("transferType") or "").lower() not in ("in", "money_in", ""):
        return {"ok": True}  # chỉ xử lý tiền VÀO
    content = data.get("content") or data.get("description") or ""
    amount = float(data.get("transferAmount") or data.get("amount") or 0)

    pending = [o["id"] for o in db.list_orders(limit=300) if o["status"] == "pending" and o["provider"] == "sepay"]
    oid = payments.extract_order_id_from_content(content, pending)
    if not oid:
        logger.warning("SePay: không khớp đơn nào. content=%r", content[:80])
        return {"ok": True}  # trả 200 để SePay không gửi lại mãi
    order = db.get_order(oid)
    if order and amount + 1 >= order["amount_vnd"]:  # +1 phòng lệch lẻ
        db.mark_order_paid(oid, provider_ref=str(data.get("id") or data.get("referenceCode") or ""))
        logger.info("SePay: kích hoạt đơn %s (%.0f đ)", oid, amount)
    else:
        logger.warning("SePay: đơn %s tiền không đủ (%.0f < %s)", oid, amount, order and order["amount_vnd"])
    return {"ok": True}


@app.get("/api/admin/orders")
async def admin_orders(user: dict = Depends(auth.require_user)):
    auth.require_admin(user)
    return {"orders": db.list_orders()}


@app.post("/api/admin/orders/{order_id}/confirm")
async def admin_confirm_order(order_id: str, user: dict = Depends(auth.require_user)):
    """Lưới an toàn: khách đã trả nhưng webhook lỗi → chủ web xác nhận tay 1 đơn cụ thể."""
    auth.require_admin(user)
    order = db.get_order(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Không tìm thấy đơn.")
    activated, plan = db.mark_order_paid(order_id, provider_ref="admin-confirm")
    return {"activated": activated, "plan": plan}


# ─── Chat streaming (SSE) ────────────────────────────────────────────────────

def _sse(data: dict) -> str:
    return f"data: {json.dumps(data, ensure_ascii=False)}\n\n"


@app.post("/api/chat/stream")
async def chat_stream(body: ChatRequest, user: dict = Depends(auth.require_user)):
    # Chế độ 📝 Phụ đề BẮT BUỘC có video — nếu không, chặn sớm (đừng để bộ não
    # "bịa" phụ đề từ hư không khi người dùng lỡ bấm nút mà quên đính kèm).
    if body.mode == "subtitle" and not body.videos:
        raise HTTPException(
            status_code=400,
            detail="Hãy đính kèm 📎 video trước khi bấm chế độ 📝 Phụ đề nhé.",
        )

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
        # KHÔNG nêu con số / tên gói — chỉ mời nâng cấp một cách thân thiện.
        raise HTTPException(
            status_code=429,
            detail="Hôm nay bạn đã trò chuyện khá nhiều rồi 😊 — Nâng cấp gói Tháng/Năm "
                   "để tiếp tục thoải mái hơn (xem mục ✦ Nâng cấp).",
        )
    # Nếu tầng cao cấp không khả dụng (chưa cấu hình Claude) mà có engine free → vẫn chạy free.
    if use_premium and not orchestrator.engines["claude"].available() and orchestrator.has_free_engine():
        use_premium = False

    # Hội thoại: tạo mới hoặc nối tiếp
    is_new_conversation = not body.conversation_id
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

    # Tệp đính kèm (PDF/Word/Excel/txt) → tách chữ ra, chèn vào nội dung câu hỏi.
    # Xử lý ngay ở đây (không cần bộ não "nhìn" đặc biệt) vì mọi engine đều đọc chữ được.
    file_notes: list[str] = []
    effective_message = body.message
    if body.files:
        extracted = [files.extract_text(f.name or "tệp", f.data_url) for f in body.files]
        for result in extracted:
            file_notes.append(f"⚠️ {result['name']}: {result['error']}" if result.get("error")
                              else f"✅ đã đọc {result['name']}")
        effective_message = body.message + files.build_context(extracted)

    # 🌐 Link trong câu hỏi → TỰ TẢI và đọc nội dung trang — hoạt động với MỌI
    # bộ não (trước đây chỉ Claude ở chế độ 🔍 tìm kiếm mới đọc được link).
    webpage_notes: list[str] = []
    fetched_pages: list[dict] = []
    urls = webpage.extract_urls(body.message)
    if urls:
        fetched_pages = await asyncio.gather(*(webpage.fetch_page(u) for u in urls))
        for p in fetched_pages:
            webpage_notes.append(f"⚠️ {p['url']}: {p['error']}" if p.get("error")
                                 else f"✅ đã đọc {p['url']}")
        effective_message += webpage.build_context(fetched_pages)

    # 🧠 Trí nhớ dài hạn: chỉ khi mở hội thoại MỚI (đã có lịch sử trong hội thoại
    # hiện tại thì không cần — nó tự thấy trong `history` rồi), tìm trong các hội
    # thoại CŨ của CHÍNH người dùng này xem có liên quan không, âm thầm đưa vào.
    recall_items: list[dict] = []
    if is_new_conversation:
        recall_items = recall.gather(user["id"], body.message, exclude_conv_id=conv_id)
        if recall_items:
            effective_message += recall.build_context(recall_items)

    # Lưu tin nhắn người dùng; ghi chú đính kèm (không lưu ảnh/video/tệp thô vào DB).
    attach_notes = []
    if body.images:
        attach_notes.append(f"đã gửi {len(body.images)} ảnh")
    if body.videos:
        attach_notes.append("đã gửi 1 video")
    attach_notes.extend(file_notes)
    attach_notes.extend(webpage_notes)
    stored = body.message + (f"\n\n_({'; '.join(attach_notes)})_" if attach_notes else "")
    db.add_message(conv_id, "user", stored)

    # Ảnh/video chỉ gắn vào lượt hiện tại để bộ não "nhìn"; lịch sử cũ chỉ có chữ.
    current_turn = {"role": "user", "content": effective_message}
    if body.images:
        current_turn["images"] = [img for img in body.images if img]
    if body.videos:
        current_turn["videos"] = [v for v in body.videos if v]
    messages = trim_history(history + [current_turn], CONFIG["MAX_CONTEXT_TOKENS"])

    # Tầng free chỉ có 2 "chế độ": tìm kiếm hay không (engine free không có tư duy sâu như Claude).
    apex_allowed = plan["apex_allowed"] and use_premium
    force_mode = body.mode if body.mode in ("image", "research", "subtitle") else None
    # Có video mà chưa ép chế độ + câu hỏi rỗng-ý (kiểu chỉ gửi video) → ưu tiên phân tích thường,
    # người dùng bấm nút 📝 riêng khi muốn phụ đề (tránh đoán nhầm ý định).
    route = decide_route(body.message, history_len=len(history),
                         apex_allowed=apex_allowed, force_mode=force_mode)
    # Ẩn nhãn chế độ "cao cấp" khi đang chạy tầng free — để không lộ là đã tụt bộ não.
    # Nhãn TÍNH NĂNG (vẽ ảnh / nghiên cứu / phụ đề) là an toàn (không phải tên model) → luôn hiện.
    if route.mode in ("image_gen", "research", "subtitle"):
        display_label = route.label
    else:
        display_label = route.label if use_premium else ("🔍 Tìm kiếm web" if route.use_web_search else "✨ LUMINA")
    logger.info("Router: mode=%s premium=%s user=%s", route.mode, use_premium, user["email"])

    async def event_stream():
        yield _sse({
            "type": "router", "mode": route.mode, "label": display_label,
            "conversation_id": conv_id,
        })
        ok_pages = [p for p in fetched_pages if not p.get("error")]
        if ok_pages:
            yield _sse({
                "type": "search_status", "tool": "web_fetch",
                "query": ", ".join(p["title"] for p in ok_pages)[:80],
            })
        if recall_items:
            yield _sse({
                "type": "search_status", "tool": "recall",
                "query": ", ".join(it["title"] for it in recall_items)[:80],
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


# ─── 🗣 Lồng tiếng + gắn phụ đề video (job chạy nền — có thể mất 1-3 phút) ────

@app.post("/api/dub")
async def create_dub_job(body: DubRequest, user: dict = Depends(auth.require_user)):
    """Chỉ gói TRẢ PHÍ được dùng — tính năng nặng nhất, tốn tài nguyên máy chủ nhất."""
    plan = db.get_effective_plan(user["id"])
    if not plan["apex_allowed"]:
        raise HTTPException(
            status_code=403,
            detail="Lồng tiếng & phụ đề tự động cần gói Tháng/Năm (tính năng tốn nhiều tài nguyên xử lý).",
        )
    if not config.CONFIG["GEMINI_API_KEY"]:
        raise HTTPException(status_code=503, detail="Chưa bật bộ não Gemini — cần để LUMINA nghe video.")
    video_bytes = media.decode_video(body.video)
    if not video_bytes:
        raise HTTPException(
            status_code=400,
            detail="Video không hợp lệ hoặc quá lớn (tối đa ~18MB — hãy nén hoặc cắt ngắn video).",
        )
    if body.target_lang not in ("vi", "en"):
        raise HTTPException(status_code=400, detail="Ngôn ngữ lồng tiếng chỉ hỗ trợ 'vi' hoặc 'en'.")
    video_dub.cleanup_expired_jobs()
    job_id = await video_dub.start_job(user["id"], video_bytes, body.target_lang, body.burn_subtitles)
    return {"job_id": job_id, "status": "pending"}


@app.get("/api/dub/{job_id}")
async def dub_job_status(job_id: str, user: dict = Depends(auth.require_user)):
    job = video_dub.get_job(job_id)
    if not job or job.user_id != user["id"]:
        raise HTTPException(status_code=404, detail="Không tìm thấy job.")
    return {"job_id": job.id, "status": job.status, "progress": job.progress, "error": job.error}


@app.get("/api/dub/{job_id}/download")
async def dub_job_download(job_id: str, user: dict = Depends(auth.require_user)):
    job = video_dub.get_job(job_id)
    if not job or job.user_id != user["id"]:
        raise HTTPException(status_code=404, detail="Không tìm thấy job.")
    if job.status != "done" or not job.output_path or not os.path.isfile(job.output_path):
        raise HTTPException(status_code=409, detail="Video chưa xử lý xong.")
    return FileResponse(job.output_path, media_type="video/mp4",
                        filename=f"lumina_dubbed_{job_id}.mp4")


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
