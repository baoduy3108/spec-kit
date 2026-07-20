"""✦ LUMINA AI — Đăng nhập Google (bắt buộc).

Luồng: frontend dùng Google Identity Services → nhận ID token → POST lên
/api/auth/google → backend xác thực chữ ký với Google → phát session JWT
trong cookie HttpOnly. Mọi endpoint chat đều yêu cầu cookie hợp lệ.
"""

import secrets
import time

import jwt
from fastapi import HTTPException, Request
from google.auth.transport import requests as google_requests
from google.oauth2 import id_token as google_id_token

from .config import CONFIG
from . import db

_SECRET = CONFIG["SECRET_KEY"] or secrets.token_hex(32)
COOKIE_NAME = "lumina_session"


def verify_google_token(credential: str) -> dict:
    """Xác thực ID token với Google, trả về thông tin người dùng."""
    if not CONFIG["GOOGLE_CLIENT_ID"]:
        raise HTTPException(status_code=503, detail="Máy chủ chưa cấu hình GOOGLE_CLIENT_ID")
    try:
        info = google_id_token.verify_oauth2_token(
            credential, google_requests.Request(), CONFIG["GOOGLE_CLIENT_ID"]
        )
    except ValueError as exc:
        raise HTTPException(status_code=401, detail=f"Token Google không hợp lệ: {exc}")
    return {
        "id": info["sub"],
        "email": info.get("email", ""),
        "name": info.get("name", info.get("email", "Người dùng")),
        "picture": info.get("picture", ""),
    }


def issue_session(user: dict) -> str:
    """Phát JWT phiên đăng nhập, đồng thời lưu user vào DB."""
    db.upsert_user(user["id"], user["email"], user["name"], user["picture"])
    payload = {
        "sub": user["id"],
        "email": user["email"],
        "name": user["name"],
        "picture": user["picture"],
        "exp": int(time.time()) + CONFIG["SESSION_TTL_HOURS"] * 3600,
    }
    return jwt.encode(payload, _SECRET, algorithm="HS256")


def dev_guest_user() -> dict:
    """Chế độ DEV_MODE: tài khoản khách để chạy thử khi chưa có Google Client ID."""
    return {"id": "dev-guest", "email": "guest@localhost", "name": "Khách (DEV)", "picture": ""}


def require_user(request: Request) -> dict:
    """FastAPI dependency: đọc cookie phiên, trả về user hoặc 401."""
    token = request.cookies.get(COOKIE_NAME)
    if not token:
        raise HTTPException(status_code=401, detail="Chưa đăng nhập")
    try:
        payload = jwt.decode(token, _SECRET, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Phiên đăng nhập đã hết hạn")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Phiên đăng nhập không hợp lệ")
    email = payload.get("email", "")
    return {
        "id": payload["sub"],
        "email": email,
        "name": payload.get("name", ""),
        "picture": payload.get("picture", ""),
        "is_admin": bool(email) and email.lower() in CONFIG["ADMIN_EMAILS"],
    }


def require_admin(user: dict) -> dict:
    """Chặn truy cập nếu không phải email quản trị (danh sách ADMIN_EMAILS)."""
    if not user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Chỉ quản trị viên mới truy cập được.")
    return user
