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
import re
import time
from typing import Optional

from fastapi import Depends, FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from . import auth, config, db, docgen, files, knowledge, media, payments, recall, skill_search, skills, video_dub, video_link, webpage
from .embeddings import embeddings_enabled
from .cache import ResponseCache
from .config import CONFIG, PLANS, validate_config
from .memory import trim_history
from .monitor import monitor
from .orchestrator import orchestrator
from .ratelimit import UserRateLimiter
from .router import decide_route
from .schemas import ChatRequest, ComposeRequest, CreateOrderRequest, DubRequest, PaypalCaptureRequest

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
    # Dựng index ngữ nghĩa cho khớp kỹ năng (chạy NỀN, chỉ khi có key embeddings).
    if embeddings_enabled():
        asyncio.create_task(skill_search.build_index())


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


@app.get("/api/widget/{wtype}")
async def widget_data(wtype: str, q: str = "", user: dict = Depends(auth.require_user)):
    """📊 Nguồn dữ liệu cho WIDGET SỐNG trong chat — poll định kỳ từ frontend.

    Chỉ trả dữ liệu LUMINA thật sự có (không bịa): tin tức trực tiếp, kho tri
    thức đã học, trạng thái app. KHÔNG bao giờ lộ tên model/nhà cung cấp.
    """
    q = (q or "").strip()[:120]
    now = int(time.time())
    if wtype == "news":
        items = await knowledge.news_items(q or "tin nóng", limit=6)
        return {"type": "news", "query": q, "updated_at": now, "items": items}
    if wtype == "knowledge":
        items = knowledge.lookup_local(q, limit=6) if q else []
        return {"type": "knowledge", "query": q, "updated_at": now,
                "items": [{"topic": it.get("topic", ""), "summary": (it.get("summary") or "")[:240],
                           "url": it.get("url", "")} for it in items]}
    raise HTTPException(status_code=404, detail="Loại widget không hỗ trợ")


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


class _ConvProjectBody(BaseModel):
    project_id: Optional[str] = None


@app.post("/api/conversations/{conv_id}/project")
async def set_conversation_project(conv_id: str, body: _ConvProjectBody,
                                   user: dict = Depends(auth.require_user)):
    if not db.assign_conversation_project(conv_id, user["id"], body.project_id):
        raise HTTPException(status_code=404, detail="Không tìm thấy hội thoại")
    return {"ok": True}


# ─── Projects (mặt bàn riêng: nhóm hội thoại + bảng widget sống) ──────────────

class _ProjectCreate(BaseModel):
    name: str = ""


class _ProjectUpdate(BaseModel):
    name: Optional[str] = None
    widgets: Optional[list] = None       # danh sách spec widget của mặt bàn
    memory: Optional[str] = None         # trí nhớ dự án (kiến trúc/quyết định/file/lý do bỏ)


def _load_project(project_id: str, user_id: str) -> dict:
    proj = db.get_project(project_id, user_id)
    if not proj:
        raise HTTPException(status_code=404, detail="Không tìm thấy project")
    try:
        proj["widgets"] = json.loads(proj.get("widgets") or "[]")
    except (ValueError, TypeError):
        proj["widgets"] = []
    return proj


@app.get("/api/projects")
async def projects_list(user: dict = Depends(auth.require_user)):
    return {"projects": db.list_projects(user["id"])}


@app.post("/api/projects")
async def project_create(body: _ProjectCreate, user: dict = Depends(auth.require_user)):
    pid = db.create_project(user["id"], body.name or "Project mới")
    return _load_project(pid, user["id"])


@app.get("/api/projects/{project_id}")
async def project_detail(project_id: str, user: dict = Depends(auth.require_user)):
    proj = _load_project(project_id, user["id"])
    return {"project": proj, "conversations": db.list_project_conversations(project_id, user["id"])}


@app.put("/api/projects/{project_id}")
async def project_update(project_id: str, body: _ProjectUpdate,
                         user: dict = Depends(auth.require_user)):
    if not db.get_project(project_id, user["id"]):
        raise HTTPException(status_code=404, detail="Không tìm thấy project")
    if body.name is not None:
        db.rename_project(project_id, user["id"], body.name)
    if body.widgets is not None:
        # Chỉ giữ các widget hợp lệ (loại widget LUMINA hỗ trợ) để không lưu rác.
        valid = {"news", "knowledge", "clock"}
        clean = [w for w in body.widgets if isinstance(w, dict) and w.get("type") in valid][:12]
        db.set_project_widgets(project_id, user["id"], json.dumps(clean, ensure_ascii=False))
    if body.memory is not None:
        db.set_project_memory(project_id, user["id"], body.memory)
    return _load_project(project_id, user["id"])


@app.delete("/api/projects/{project_id}")
async def project_delete(project_id: str, user: dict = Depends(auth.require_user)):
    if not db.delete_project(project_id, user["id"]):
        raise HTTPException(status_code=404, detail="Không tìm thấy project")
    return {"ok": True}


# ─── Agent tùy chỉnh (persona người dùng tạo — "môi trường tạo agent") ────────

class _AgentCreate(BaseModel):
    name: str = ""
    emoji: str = "🤖"
    instructions: str = ""


class _AgentUpdate(BaseModel):
    name: Optional[str] = None
    emoji: Optional[str] = None
    instructions: Optional[str] = None


@app.get("/api/agents")
async def agents_list(user: dict = Depends(auth.require_user)):
    return {"agents": db.list_agents(user["id"])}


@app.post("/api/agents")
async def agent_create(body: _AgentCreate, user: dict = Depends(auth.require_user)):
    if not body.instructions.strip():
        raise HTTPException(status_code=400, detail="Agent cần có phần hướng dẫn (instructions).")
    aid = db.create_agent(user["id"], body.name or "Agent mới", body.instructions, body.emoji or "🤖")
    return db.get_agent(aid, user["id"])


@app.put("/api/agents/{agent_id}")
async def agent_update(agent_id: str, body: _AgentUpdate, user: dict = Depends(auth.require_user)):
    if not db.update_agent(agent_id, user["id"], name=body.name,
                           instructions=body.instructions, emoji=body.emoji):
        raise HTTPException(status_code=404, detail="Không tìm thấy agent")
    return db.get_agent(agent_id, user["id"])


@app.delete("/api/agents/{agent_id}")
async def agent_delete(agent_id: str, user: dict = Depends(auth.require_user)):
    if not db.delete_agent(agent_id, user["id"]):
        raise HTTPException(status_code=404, detail="Không tìm thấy agent")
    return {"ok": True}


# ─── Goal Engine (giao mục tiêu: AI chia nhỏ + theo dõi tiến độ) ──────────────

class _GoalCreate(BaseModel):
    title: str = ""
    target_date: str = ""


class _GoalUpdate(BaseModel):
    title: Optional[str] = None
    target_date: Optional[str] = None
    steps: Optional[list] = None       # [{"text":..., "done":bool}]


def _load_goal(row: dict) -> dict:
    try:
        steps = json.loads(row.get("steps") or "[]")
    except (ValueError, TypeError):
        steps = []
    steps = [{"text": str(s.get("text", "")).strip(), "done": bool(s.get("done"))}
             for s in steps if isinstance(s, dict) and str(s.get("text", "")).strip()]
    done = sum(1 for s in steps if s["done"])
    progress = round(done / len(steps) * 100) if steps else 0
    return {"id": row["id"], "title": row["title"], "target_date": row.get("target_date", ""),
            "steps": steps, "progress": progress}


async def _ai_goal_steps(title: str, target_date: str) -> list[str]:
    """Dùng bộ não chia mục tiêu thành các bước cụ thể. Best-effort → [] nếu lỗi."""
    prompt = (
        "Chia mục tiêu sau thành 4-7 bước hành động CỤ THỂ, khả thi, ngắn gọn, theo thứ tự thực hiện. "
        "CHỈ trả về một mảng JSON các chuỗi tiếng Việt (không giải thích, không đánh số).\n"
        f"Mục tiêu: {title}" + (f" (hạn hoàn thành: {target_date})" if target_date else "")
    )
    route = decide_route(prompt, history_len=0, apex_allowed=False, force_mode=None)
    use_premium = not orchestrator.has_free_engine()   # ưu tiên engine free cho việc nhẹ
    text = ""
    try:
        async for ev in orchestrator.run([{"role": "user", "content": prompt}], route,
                                         use_premium=use_premium):
            if ev.get("type") == "text":
                text += ev["text"]
    except Exception as e:  # noqa: BLE001
        logger.warning("AI chia mục tiêu lỗi: %s", e)
        return []
    m = re.search(r"\[.*\]", text, re.DOTALL)
    if not m:
        return []
    try:
        arr = json.loads(m.group(0))
    except (ValueError, TypeError):
        return []
    return [str(s).strip() for s in arr if isinstance(s, str) and str(s).strip()][:10]


@app.get("/api/goals")
async def goals_list(user: dict = Depends(auth.require_user)):
    return {"goals": [_load_goal(g) for g in db.list_goals(user["id"])]}


@app.post("/api/goals")
async def goal_create(body: _GoalCreate, user: dict = Depends(auth.require_user)):
    if not body.title.strip():
        raise HTTPException(status_code=400, detail="Mục tiêu cần có tiêu đề.")
    gid = db.create_goal(user["id"], body.title, body.target_date)
    return _load_goal(db.get_goal(gid, user["id"]))


@app.put("/api/goals/{goal_id}")
async def goal_update(goal_id: str, body: _GoalUpdate, user: dict = Depends(auth.require_user)):
    steps_json = None
    if body.steps is not None:
        clean = [{"text": str(s.get("text", "")).strip()[:300], "done": bool(s.get("done"))}
                 for s in body.steps if isinstance(s, dict) and str(s.get("text", "")).strip()][:30]
        steps_json = json.dumps(clean, ensure_ascii=False)
    if not db.update_goal(goal_id, user["id"], title=body.title,
                          target_date=body.target_date, steps_json=steps_json):
        raise HTTPException(status_code=404, detail="Không tìm thấy mục tiêu")
    return _load_goal(db.get_goal(goal_id, user["id"]))


@app.post("/api/goals/{goal_id}/breakdown")
async def goal_breakdown(goal_id: str, user: dict = Depends(auth.require_user)):
    goal = db.get_goal(goal_id, user["id"])
    if not goal:
        raise HTTPException(status_code=404, detail="Không tìm thấy mục tiêu")
    steps = await _ai_goal_steps(goal["title"], goal.get("target_date", ""))
    if steps:
        db.update_goal(goal_id, user["id"],
                       steps_json=json.dumps([{"text": s, "done": False} for s in steps], ensure_ascii=False))
    return _load_goal(db.get_goal(goal_id, user["id"]))


@app.delete("/api/goals/{goal_id}")
async def goal_delete(goal_id: str, user: dict = Depends(auth.require_user)):
    if not db.delete_goal(goal_id, user["id"]):
        raise HTTPException(status_code=404, detail="Không tìm thấy mục tiêu")
    return {"ok": True}


class _FeedbackBody(BaseModel):
    conversation_id: Optional[str] = None
    rating: int = 1                      # 1 hữu ích | -1 chưa tốt
    note: str = ""


@app.post("/api/feedback")
async def submit_feedback(body: _FeedbackBody, user: dict = Depends(auth.require_user)):
    """👍/👎 cho câu trả lời — LUMINA đo độ hữu dụng theo hành vi thật để tiến hoá."""
    db.add_feedback(user["id"], body.conversation_id, body.rating, body.note)
    return {"ok": True, "summary": db.feedback_summary(user["id"])}


# ─── Version hóa suy nghĩ (lưu v1..vN của một artifact/câu trả lời, quay lại) ──

class _VersionCreate(BaseModel):
    conversation_id: str
    content: str
    label: str = ""


@app.post("/api/versions")
async def version_create(body: _VersionCreate, user: dict = Depends(auth.require_user)):
    if not body.content.strip():
        raise HTTPException(status_code=400, detail="Không có nội dung để lưu phiên bản.")
    return db.add_version(user["id"], body.conversation_id, body.content, body.label)


@app.get("/api/versions")
async def versions_list(conversation_id: str, user: dict = Depends(auth.require_user)):
    return {"versions": db.list_versions(user["id"], conversation_id)}


@app.get("/api/versions/{version_id}")
async def version_get(version_id: str, user: dict = Depends(auth.require_user)):
    v = db.get_version(version_id, user["id"])
    if not v:
        raise HTTPException(status_code=404, detail="Không tìm thấy phiên bản")
    return {"id": v["id"], "label": v["label"], "content": v["content"], "created_at": v["created_at"]}


@app.delete("/api/versions/{version_id}")
async def version_delete(version_id: str, user: dict = Depends(auth.require_user)):
    if not db.delete_version(version_id, user["id"]):
        raise HTTPException(status_code=404, detail="Không tìm thấy phiên bản")
    return {"ok": True}


# ─── AI Time Capsule (nhật ký tiến hoá) + Evolution report ───────────────────

class _JournalCreate(BaseModel):
    kind: str = "note"        # idea | decision | rejected | milestone | note
    title: str = ""
    note: str = ""
    project_id: Optional[str] = None


@app.get("/api/journal")
async def journal_list(project_id: str = "", user: dict = Depends(auth.require_user)):
    return {"entries": db.list_journal(user["id"], project_id or None)}


@app.post("/api/journal")
async def journal_create(body: _JournalCreate, user: dict = Depends(auth.require_user)):
    if not body.title.strip():
        raise HTTPException(status_code=400, detail="Mục nhật ký cần tiêu đề.")
    return db.add_journal(user["id"], body.kind, body.title, body.note, body.project_id or None)


@app.delete("/api/journal/{entry_id}")
async def journal_delete(entry_id: str, user: dict = Depends(auth.require_user)):
    if not db.delete_journal(entry_id, user["id"]):
        raise HTTPException(status_code=404, detail="Không tìm thấy mục nhật ký")
    return {"ok": True}


@app.post("/api/evolution/report")
async def evolution_report(user: dict = Depends(auth.require_user)):
    """✨ LUMINA tự đánh giá từ dữ liệu feedback THẬT → đề xuất cải tiến (chỉ gợi ý,
    KHÔNG tự sửa code). Không có feedback → trả thông báo."""
    summary = db.feedback_summary(user["id"])
    notes = db.recent_feedback_notes(user["id"], 20)
    if summary["total"] == 0:
        return {"summary": summary, "report": "Chưa có đủ dữ liệu phản hồi (👍/👎) để đánh giá. "
                "Hãy dùng LUMINA và bấm 👍/👎 dưới các câu trả lời — mình sẽ tổng hợp và đề xuất cải tiến."}
    prompt = (
        "Bạn đang tự đánh giá để tiến hoá. Dựa trên DỮ LIỆU PHẢN HỒI THẬT dưới đây, hãy: "
        "(1) nhận xét ngắn về mức độ hữu ích, (2) đề xuất 3-5 CẢI TIẾN cụ thể, ưu tiên theo tác động. "
        "Ngắn gọn, thực tế, tiếng Việt.\n"
        f"- 👍 hữu ích: {summary['up']} · 👎 chưa tốt: {summary['down']}\n"
        + ("- Ghi chú 'chưa tốt' gần đây:\n" + "\n".join(f"  • {n}" for n in notes) if notes else "- (không có ghi chú chi tiết)")
    )
    route = decide_route(prompt, history_len=0, apex_allowed=False, force_mode=None)
    use_premium = not orchestrator.has_free_engine()
    text = ""
    try:
        async for ev in orchestrator.run([{"role": "user", "content": prompt}], route, use_premium=use_premium):
            if ev.get("type") == "text":
                text += ev["text"]
    except Exception as e:  # noqa: BLE001
        logger.warning("Evolution report lỗi: %s", e)
    return {"summary": summary, "report": text.strip() or "Chưa tạo được báo cáo (cần bật ít nhất một bộ não)."}


@app.get("/api/agents/{agent_id}/conversations")
async def agent_conversations(agent_id: str, user: dict = Depends(auth.require_user)):
    """Các session (hội thoại) thuộc 1 agent — 'forge' là agent dựng sẵn.
    Agent như một workspace: bấm vào → xem/tạo session của riêng nó (kiểu Claude Code)."""
    if agent_id != "forge" and not db.get_agent(agent_id, user["id"]):
        raise HTTPException(status_code=404, detail="Không tìm thấy agent")
    return {"conversations": db.list_agent_conversations(agent_id, user["id"])}


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

    # 🤖 Agent tùy chỉnh: nạp hướng dẫn/persona của agent (nếu người dùng chọn) để chèn vào system prompt.
    agent_extra = ""
    agent_obj = db.get_agent(body.agent_id, user["id"]) if body.agent_id else None
    if agent_obj:
        agent_extra = agent_obj.get("instructions") or ""

    # Hội thoại: tạo mới hoặc nối tiếp
    is_new_conversation = not body.conversation_id
    conv_id = body.conversation_id
    existing_conv = None
    if conv_id:
        existing_conv = db.get_conversation(conv_id, user["id"])
        if not existing_conv:
            raise HTTPException(status_code=404, detail="Không tìm thấy hội thoại")
    else:
        conv_id = db.create_conversation(user["id"], body.message,
                                         project_id=body.project_id, agent_id=body.agent_id)

    # 📌 Trí nhớ dự án: nếu hội thoại thuộc một project, chèn "bộ nhớ dự án" (kiến trúc/
    # quyết định/file/lý do bỏ) vào ngữ cảnh — TÁCH biệt với chuyện cá nhân của người dùng.
    proj_id = (existing_conv or {}).get("project_id") or body.project_id
    if proj_id:
        proj = db.get_project(proj_id, user["id"])
        if proj and (proj.get("memory") or "").strip():
            agent_extra = (agent_extra + "\n\n[TRÍ NHỚ DỰ ÁN — bối cảnh cố định của dự án này "
                           "(kiến trúc, quyết định đã chốt, file quan trọng, lý do đã bỏ phương án cũ); "
                           "ưu tiên nhất quán với nó, KHÔNG lẫn với dự án/chuyện khác:\n"
                           + proj["memory"].strip()[:6000] + "\n]").strip()

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
    # 🔗 Tách link VIDEO (YouTube/Vimeo/TikTok...) khỏi link trang thường —
    # link video đi vào pipeline "xem video qua link" (khung hình + transcript).
    video_urls = [u for u in urls if video_link.is_video_link(u)]
    page_urls = [u for u in urls if u not in video_urls]
    if page_urls:
        fetched_pages = await asyncio.gather(*(webpage.fetch_page(u) for u in page_urls))
        for p in fetched_pages:
            webpage_notes.append(f"⚠️ {p['url']}: {p['error']}" if p.get("error")
                                 else f"✅ đã đọc {p['url']}")
        effective_message += webpage.build_context(fetched_pages)

    # 🎬 Xem video qua LINK: chỉ xử lý 1 video/lượt (tốn tài nguyên). Bỏ qua ở chế
    # độ 📝 Phụ đề (chế độ đó cần video/âm thanh gốc, dùng đường Gemini riêng).
    link_frames: list[str] = []
    link_video: dict = {}
    if video_urls and body.mode != "subtitle":
        link_video = await video_link.fetch_video_link(video_urls[0])
        link_frames = link_video.get("frames") or []
        if link_video.get("transcript"):
            effective_message += video_link.build_context(link_video)
        if link_video.get("error"):
            webpage_notes.append(f"⚠️ video {video_urls[0]}: {link_video['error']}")
        elif link_frames or link_video.get("transcript"):
            bits = []
            if link_frames:
                bits.append(f"{len(link_frames)} khung hình")
            if link_video.get("transcript"):
                bits.append(link_video.get("transcript_source") or "transcript")
            webpage_notes.append(f"✅ đã xem video ({', '.join(bits)})")

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
    turn_images = [img for img in body.images if img] if body.images else []
    n_video_frames = 0
    if body.videos:
        current_turn["videos"] = [v for v in body.videos if v]
        # 🎞 Tách khung hình để MỌI bộ não nhìn được video (không chỉ Gemini) và để
        # dựng được sơ đồ từ video. Bỏ qua ở chế độ 📝 Phụ đề (cần video/âm thanh gốc).
        if body.mode != "subtitle" and current_turn["videos"]:
            frames = await media.extract_video_frames(current_turn["videos"][0])
            if frames:
                n_video_frames = len(frames)
                turn_images = (turn_images + frames)[:8]   # giới hạn tổng số ảnh/lượt
    # Khung hình từ video-link cũng gắn như ảnh để bộ não "nhìn" được.
    if link_frames:
        n_video_frames += len(link_frames)
        turn_images = (turn_images + link_frames)[:8]
    if turn_images:
        current_turn["images"] = turn_images
    messages = trim_history(history + [current_turn], CONFIG["MAX_CONTEXT_TOKENS"])

    # Tầng free chỉ có 2 "chế độ": tìm kiếm hay không (engine free không có tư duy sâu như Claude).
    apex_allowed = plan["apex_allowed"] and use_premium
    force_mode = body.mode if body.mode in ("image", "research", "subtitle", "agent", "critique") else None
    # Có video mà chưa ép chế độ + câu hỏi rỗng-ý (kiểu chỉ gửi video) → ưu tiên phân tích thường,
    # người dùng bấm nút 📝 riêng khi muốn phụ đề (tránh đoán nhầm ý định).
    route = decide_route(body.message, history_len=len(history),
                         apex_allowed=apex_allowed, force_mode=force_mode)
    # Ẩn nhãn chế độ "cao cấp" khi đang chạy tầng free — để không lộ là đã tụt bộ não.
    # Nhãn TÍNH NĂNG (vẽ ảnh / nghiên cứu / phụ đề) là an toàn (không phải tên model) → luôn hiện.
    if route.mode in ("image_gen", "research", "subtitle", "agent", "critique"):
        display_label = route.label
    else:
        display_label = route.label if use_premium else ("🔍 Tìm kiếm web" if route.use_web_search else "✨ LUMINA")
    logger.info("Router: mode=%s premium=%s user=%s", route.mode, use_premium, user["email"])

    async def event_stream():
        yield _sse({
            "type": "router", "mode": route.mode, "label": display_label,
            "conversation_id": conv_id,
        })
        if link_video.get("transcript") or (link_video and link_frames):
            label = (link_video.get("title") or "video")[:60]
            src = link_video.get("transcript_source")
            yield _sse({
                "type": "search_status", "tool": "video_link",
                "query": label + (f" ({src})" if src else ""),
            })
        if n_video_frames:
            yield _sse({
                "type": "search_status", "tool": "video_frames",
                "query": f"{n_video_frames} khung hình",
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
            async for event in orchestrator.run(messages, route, use_premium=use_premium,
                                                system_extra=agent_extra):
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


# ─── 📚 Tổng hợp nhiều tệp → 1 FILE mới (đọc → nghĩ → tổng hợp → xuất sách) ────

_COMPOSE_DIRECTIVE = (
    "\n\n[NHIỆM VỤ TỔNG HỢP TÀI LIỆU — hãy ĐỌC KỸ toàn bộ nội dung các tệp nguồn ở "
    "trên, SUY NGHĨ, rồi TỔNG HỢP thành MỘT tài liệu/cuốn sách MỚI mạch lạc, văn phong "
    "hay, có chiều sâu — KHÔNG chỉ ghép nối. Hãy chắt lọc, đối chiếu, kết nối kiến thức "
    "từ TẤT CẢ các nguồn thành một chỉnh thể thống nhất. Xuất ra Markdown thuần: dùng "
    "'# ' cho tiêu đề chương, '## '/'### ' cho mục con, '- ' cho gạch đầu dòng, '> ' cho "
    "trích dẫn, dòng trống giữa các đoạn. Viết đầy đủ, chi tiết, có mở đầu và kết luận. "
    "CHỈ xuất nội dung tài liệu (không lời dẫn, không giải thích thêm ngoài lề).]"
)

# Giới hạn độ dài Markdown tổng hợp để tránh file khổng lồ / tốn bộ nhớ.
_COMPOSE_MAX_CHARS = 120_000


@app.post("/api/compose")
async def compose_document(body: ComposeRequest, user: dict = Depends(auth.require_user)):
    """Đọc nhiều tệp → bộ não tổng hợp thành 1 tài liệu → trả FILE (docx/pdf/html) để tải.

    Ví dụ: gửi 2 file PDF Đạo Đức Kinh → LUMINA đọc cả hai, nghĩ, tổng hợp kiến thức
    thành một cuốn sách mới và xuất ra file tải về được.
    """
    if body.format not in ("docx", "pdf", "html"):
        raise HTTPException(status_code=400, detail="Định dạng chỉ hỗ trợ docx, pdf hoặc html.")
    if not body.files:
        raise HTTPException(status_code=400, detail="Cần ít nhất 1 tệp nguồn để tổng hợp.")

    # Đọc chữ từ các tệp nguồn (giống luồng chat) và chèn vào ngữ cảnh.
    extracted = [files.extract_text(f.name or "tệp", f.data_url) for f in body.files]
    read_notes = [e["name"] for e in extracted if not e.get("error")]
    if not read_notes:
        raise HTTPException(status_code=400, detail="Không đọc được tệp nào (định dạng không hỗ trợ hoặc tệp lỗi).")

    instruction = body.instruction.strip() or "Tổng hợp toàn bộ kiến thức từ các tệp trên thành một tài liệu hoàn chỉnh."
    prompt = instruction + files.build_context(extracted) + _COMPOSE_DIRECTIVE

    # Chọn tầng bộ não theo gói (dùng chung hạn mức ngày với chat): còn lượt cao cấp
    # → Claude; hết → engine free; chạm tổng → chặn (mời nâng cấp).
    plan = db.get_effective_plan(user["id"])
    daily_ok, use_premium, _ = db.consume_daily_usage(
        user["id"], plan["premium_daily_cap"], plan["total_daily_cap"]
    )
    if not daily_ok:
        raise HTTPException(
            status_code=429,
            detail="Hôm nay bạn đã dùng khá nhiều rồi 😊 — Nâng cấp gói Tháng/Năm để tiếp tục.",
        )
    if use_premium and not orchestrator.engines["claude"].available() and orchestrator.has_free_engine():
        use_premium = False
    route = decide_route(prompt, history_len=0, apex_allowed=plan["apex_allowed"])

    parts: list[str] = []
    try:
        async for event in orchestrator.run(
            [{"role": "user", "content": prompt}], route, use_premium=use_premium,
        ):
            if event.get("type") == "text":
                parts.append(event["text"])
                if sum(len(p) for p in parts) > _COMPOSE_MAX_CHARS:
                    break
    except Exception:
        logger.exception("Lỗi tổng hợp tài liệu")
        raise HTTPException(status_code=502, detail="Bộ não gặp lỗi khi tổng hợp — thử lại sau.")

    markdown = "".join(parts).strip()
    if not markdown:
        raise HTTPException(status_code=502, detail="Không tạo được nội dung tổng hợp — thử lại.")

    try:
        data, mime, ext = docgen.generate(body.format, body.title.strip() or "Tài liệu tổng hợp", markdown)
    except Exception:
        logger.exception("Lỗi sinh file %s", body.format)
        raise HTTPException(status_code=500, detail=f"Không tạo được file {body.format}. Hãy thử định dạng docx.")

    from urllib.parse import quote
    # filename= phải là ASCII (header là latin-1); tên tiếng Việt đầy đủ đặt ở filename*.
    unicode_name = (re.sub(r"[^\w\-. ]+", "", body.title.strip())[:60].strip() or "tai-lieu")
    ascii_name = (re.sub(r"[^A-Za-z0-9\-_. ]+", "", unicode_name).strip() or "document")
    disposition = (f"attachment; filename=\"{ascii_name}.{ext}\"; "
                   f"filename*=UTF-8''{quote(unicode_name + '.' + ext)}")
    logger.info("Compose: %d tệp → %s (%d bytes) user=%s", len(read_notes), ext, len(data), user["email"])
    return Response(content=data, media_type=mime, headers={"Content-Disposition": disposition})


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
