"""✦ LUMINA AI — Thanh toán tự động: SePay (chuyển khoản VN) + PayPal (quốc tế).

Không giữ tiền hộ: SePay chỉ báo "có tiền vào tài khoản bạn" qua webhook; PayPal
thu tiền về thẳng ví PayPal của bạn. Code chỉ xác thực rồi kích hoạt gói.
"""

import base64
import logging
import urllib.parse

import httpx

from .config import CONFIG, paypal_api_base

logger = logging.getLogger("lumina.payments")


# ─── SePay (VietQR + webhook) ────────────────────────────────────────────────

def build_vietqr_url(bin_code: str, account: str, owner: str, amount_vnd: int, content: str) -> str:
    """Tạo link ảnh VietQR động (miễn phí, không cần key). Khách quét là ra sẵn số tiền + nội dung."""
    params = urllib.parse.urlencode({
        "amount": amount_vnd,
        "addInfo": content,
        "accountName": owner,
    })
    return f"https://img.vietqr.io/image/{bin_code}-{account}-compact2.png?{params}"


def verify_sepay_authorization(auth_header: str) -> bool:
    """SePay gửi header 'Authorization: Apikey <SEPAY_API_KEY>'. So khớp chính xác."""
    expected = f"Apikey {CONFIG['SEPAY_API_KEY']}"
    return bool(CONFIG["SEPAY_API_KEY"]) and auth_header == expected


def extract_order_id_from_content(content: str, known_ids: list[str]) -> str | None:
    """Tìm mã đơn (LUMxxxxxx) trong nội dung chuyển khoản. So với danh sách đơn đang chờ."""
    if not content:
        return None
    up = content.upper().replace(" ", "")
    for oid in known_ids:
        if oid.upper() in up:
            return oid
    return None


# ─── PayPal (Orders API v2) ──────────────────────────────────────────────────

async def _paypal_token() -> str:
    creds = f"{CONFIG['PAYPAL_CLIENT_ID']}:{CONFIG['PAYPAL_SECRET']}"
    basic = base64.b64encode(creds.encode()).decode()
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            f"{paypal_api_base()}/v1/oauth2/token",
            headers={"Authorization": f"Basic {basic}"},
            data={"grant_type": "client_credentials"},
        )
        resp.raise_for_status()
        return resp.json()["access_token"]


async def create_paypal_order(order_id: str, amount_usd: float, description: str) -> str:
    """Tạo đơn PayPal, gắn custom_id = mã đơn của ta. Trả về PayPal order id."""
    token = await _paypal_token()
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            f"{paypal_api_base()}/v2/checkout/orders",
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            json={
                "intent": "CAPTURE",
                "purchase_units": [{
                    "custom_id": order_id,
                    "description": description[:127],
                    "amount": {"currency_code": "USD", "value": f"{amount_usd:.2f}"},
                }],
            },
        )
        resp.raise_for_status()
        return resp.json()["id"]


async def capture_paypal_order(paypal_order_id: str) -> tuple[bool, str, float]:
    """Thu tiền đơn PayPal. Trả về (thành công, custom_id = mã đơn của ta, số tiền USD)."""
    token = await _paypal_token()
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            f"{paypal_api_base()}/v2/checkout/orders/{paypal_order_id}/capture",
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        )
        resp.raise_for_status()
        data = resp.json()

    if data.get("status") != "COMPLETED":
        return False, "", 0.0
    try:
        unit = data["purchase_units"][0]
        custom_id = unit.get("custom_id", "")
        cap = unit["payments"]["captures"][0]
        amount = float(cap["amount"]["value"])
        return True, custom_id, amount
    except (KeyError, IndexError, ValueError):
        logger.error("PayPal capture trả về cấu trúc lạ: %s", str(data)[:300])
        return False, "", 0.0
