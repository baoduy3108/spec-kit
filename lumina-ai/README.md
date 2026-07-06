<div align="center">

# ✦ LUMINA AI

### *Tư duy sâu, tri thức rộng*

**Một AI hợp nhất — tự chọn bộ não tốt nhất cho từng câu hỏi.**

</div>

---

LUMINA là web chatbot AI "bù trừ": bạn chỉ cần gõ câu hỏi, hệ thống tự phân tích và chọn chế độ tối ưu — **không cần chọn model**:

| Chế độ | Khi nào | Bộ não |
|---|---|---|
| ⚡ Phản hồi nhanh | Câu ngắn, chào hỏi | Claude Haiku 4.5 |
| ✨ Cân bằng | Trò chuyện thông thường | Claude Sonnet 5 |
| 🧠 Tư duy sâu | Code, toán, phân tích | Claude Opus 4.8 (effort cao) |
| 🔍 Tìm kiếm web | Tin tức, giá cả, thông tin mới | Claude Opus 4.8 + Web Search (có trích nguồn) |
| 🌌 Đỉnh cao | Tác vụ khó nhất (gói trả phí, tùy chọn) | Claude Fable 5 |

**Độ bền kiểu ChatGPT:** circuit breaker + fallback chain — Claude gặp sự cố sẽ tự chuyển sang Gemini rồi OpenAI (nếu bạn điền key), người dùng không phải làm gì.

**Bảo mật:** bắt buộc đăng nhập Google; API key nằm ở server (không lộ ra trình duyệt); giới hạn lượt mỗi người dùng để bảo vệ chi phí.

**Gói Miễn phí / Tháng / Năm:** ai đăng nhập cũng dùng được miễn phí (giới hạn lượt/ngày để bạn kiểm soát chi phí); gói trả phí tăng giới hạn và mở khóa 🌌 Đỉnh cao. Chưa cần tích hợp cổng thanh toán — người dùng chuyển khoản/Momo thủ công, bạn xác nhận rồi tạo **mã kích hoạt** gửi cho họ (mục 6 bên dưới).

Kiến trúc kế thừa khung "Unified AI Core" (Router thông minh · Circuit Breaker · Cache · Context Memory · Rate limiter · Metrics), viết lại theo Claude API hiện hành: adaptive thinking, web search server-side, streaming SSE thật.

---

## 1. Chuẩn bị (một lần, ~10 phút)

### a) Lấy API key Claude (bắt buộc)
1. Vào <https://console.anthropic.com> → đăng ký/đăng nhập → nạp credit (vài đô là chạy được).
2. **Settings → API Keys → Create Key** → sao chép chuỗi `sk-ant-...`.

### b) Tạo Google Client ID (bắt buộc — cho nút đăng nhập Google)
1. Vào <https://console.cloud.google.com/apis/credentials> → tạo Project mới.
2. **Create Credentials → OAuth client ID** (nếu được hỏi, cấu hình *OAuth consent screen* trước: chọn *External*, điền tên app "LUMINA AI", email của bạn).
3. Application type: **Web application**.
4. Mục **Authorized JavaScript origins** thêm:
   - `http://localhost:8000` (chạy thử trên máy)
   - Domain web thật sau khi deploy, ví dụ `https://lumina-ai.onrender.com`
5. Sao chép **Client ID** dạng `xxxxx.apps.googleusercontent.com`.

### c) (Tùy chọn) Key dự phòng
- Gemini: <https://aistudio.google.com/apikey> — Claude sự cố sẽ tự chuyển sang.
- OpenAI: <https://platform.openai.com/api-keys> — lớp dự phòng cuối.

### d) Cấu hình gói trả phí (tùy chọn)
Trong `.env`, đặt `ADMIN_EMAILS=email-cua-ban@gmail.com` (email Google bạn dùng để đăng nhập) để mở khóa mục **🛠 Quản trị mã kích hoạt** trên web. Điền thêm `PAYMENT_BANK_NAME`, `PAYMENT_BANK_ACCOUNT`, `PAYMENT_BANK_OWNER`, `PAYMENT_MOMO` để hiển thị thông tin chuyển khoản khi người dùng bấm "✦ Nâng cấp". Xem mục 6 để biết cách vận hành.

## 2. Chạy thử trên máy

```bash
cd lumina-ai
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Mở .env điền ANTHROPIC_API_KEY, GOOGLE_CLIENT_ID, SECRET_KEY
# (chạy thử nhanh chưa cần Google: đặt DEV_MODE=true)

export $(grep -v '^#' .env | xargs)     # Windows PowerShell: dùng $env:TÊN="giá trị"
uvicorn app.main:app --reload
```

Mở <http://localhost:8000> — đăng nhập Google (hoặc nút "chạy thử DEV") và chat.

Chạy test: `pip install pytest && pytest tests/ -v`

## 3. Đưa lên web thật (miễn phí, có link công khai)

GitHub chứa code; **Render** chạy web (free tier, hỗ trợ streaming SSE — Vercel Python không hợp vì thiếu hỗ trợ SSE/process bền):

1. Đẩy code lên GitHub (repo này).
2. Vào <https://render.com> → đăng nhập bằng GitHub → **New → Blueprint** → chọn repo → Render tự đọc `lumina-ai/render.yaml`.
3. Điền `ANTHROPIC_API_KEY` và `GOOGLE_CLIENT_ID` khi được hỏi (`SECRET_KEY` tự sinh).
4. Nhấn **Apply** — vài phút sau bạn có link dạng `https://lumina-ai-xxxx.onrender.com`.
5. Quay lại Google Cloud Console → thêm link đó vào **Authorized JavaScript origins** → lưu.

Xong — gửi link cho bạn bè dùng, ai vào cũng phải đăng nhập Google.

> 💡 Free tier của Render ngủ sau 15 phút không ai dùng; lần mở lại đầu tiên chờ ~30 giây. Nâng gói trả phí nếu muốn chạy 24/7.
>
> 🔎 Muốn web "lên Google tìm kiếm": sau khi có domain, vào [Google Search Console](https://search.google.com/search-console) đăng ký domain để Google lập chỉ mục.

Có Docker? `docker build -t lumina-ai . && docker run -p 8000:8000 --env-file .env lumina-ai` — chạy được trên Railway, Fly.io, VPS bất kỳ.

## 4. Cấu trúc code

```
lumina-ai/
├── app/
│   ├── main.py             # FastAPI: auth, hội thoại, /api/chat/stream (SSE), gói/mã kích hoạt, health, metrics
│   ├── router.py           # ✦ Auto-Router "bù trừ" — trái tim của LUMINA (gate 🌌 Đỉnh cao theo gói)
│   ├── orchestrator.py     # Điều phối engine + fallback chain + system prompt
│   ├── engines/claude.py   # Bộ não chính: adaptive thinking, web search, streaming
│   ├── engines/gemini.py   # Dự phòng 1 (tùy chọn)
│   ├── engines/openai_engine.py # Dự phòng 2 (tùy chọn)
│   ├── auth.py             # Đăng nhập Google → JWT cookie, kiểm tra quyền quản trị
│   ├── db.py               # SQLite: users (+ gói), hội thoại, tin nhắn, mã kích hoạt, lượt dùng/ngày
│   ├── memory.py / cache.py / circuit_breaker.py / ratelimit.py / monitor.py
│   └── search/             # Tavily/DuckDuckGo cho engine dự phòng
├── static/                 # Giao diện chat + modal Nâng cấp/Quản trị (HTML/CSS/JS thuần, không cần build)
├── tests/test_core.py
├── render.yaml / Dockerfile / requirements.txt / .env.example
```

## 5. Câu hỏi thường gặp

**Tốn bao nhiêu tiền?** Chỉ tốn phí API theo lượng dùng (Claude tính theo token). Router đã tối ưu: câu ngắn dùng Haiku rẻ, chỉ câu khó mới dùng Opus. `RATE_LIMIT_RPM`/`FREE_DAILY_CAP` trong `.env` giới hạn lượt mỗi người để kiểm soát chi phí.

**Ngân sách ban đầu chỉ vài chục đô thì sao?** Mặc định `FREE_DAILY_CAP=2` — gói Miễn phí chỉ cho chat thử 1-2 lượt/ngày, không đủ để ai đó "cày" hết tiền API của bạn. Muốn dùng nhiều hơn, người dùng phải mua gói Tháng/Năm (mục 6) — tiền đó bạn dùng để mua thêm token API. Khi ngân sách rộng hơn, tăng `FREE_DAILY_CAP` lên tùy ý.

**Bật Fable 5 thế nào?** Đặt `ENABLE_FABLE=true` trong env. Lưu ý Fable 5 giá cao hơn Opus và yêu cầu tổ chức có chế độ lưu dữ liệu 30 ngày; nếu bị từ chối vì an toàn, hệ thống tự chuyển câu trả lời sang Opus 4.8.

**Đổi tên/giao diện?** Sửa `APP_NAME` trong `app/config.py` và màu sắc trong `static/style.css` (biến `--accent`, `--gradient`).

## 6. Vận hành gói trả phí (Tháng/Năm)

Vì bạn chưa có tài khoản merchant (VNPay/PayOS/Stripe) để tự động xác nhận thanh toán, LUMINA dùng cách thủ công — rất phổ biến với người làm sản phẩm một mình tại Việt Nam:

1. **Người dùng bấm "✦ Nâng cấp"** trong sidebar → thấy giá 2 gói (sửa tại `PRICE_MONTHLY_VND`/`PRICE_YEARLY_VND` trong `.env`) và thông tin chuyển khoản/Momo của bạn.
2. Họ chuyển khoản, gửi ảnh chụp + **email đăng nhập** cho bạn (qua Zalo/Messenger/email — tự thỏa thuận).
3. Bạn kiểm tra đã nhận tiền → đăng nhập LUMINA bằng tài khoản có trong `ADMIN_EMAILS` → bấm **🛠 Quản trị mã kích hoạt** ở sidebar → chọn gói (Tháng/Năm) + số lượng → **Tạo mã**.
4. Gửi mã dạng `LUMINA-XXXX-XXXX` cho người dùng → họ dán vào ô "Nhập mã kích hoạt" trong màn Nâng cấp → được nâng cấp **ngay lập tức**, không cần chờ bạn thao tác gì thêm phía họ.

Gói trả phí tự động: tăng giới hạn lượt/phút và tin nhắn/ngày (`PAID_RPM`, `PAID_BURST`, `PAID_DAILY_CAP`), mở khóa chế độ 🌌 Đỉnh cao (nếu `ENABLE_FABLE=true`). Hết hạn tự động hạ về gói Miễn phí, không cần bạn can thiệp.

**Đa quản trị viên:** liệt kê nhiều email cách nhau dấu phẩy trong `ADMIN_EMAILS`.

**Muốn tự động hóa thanh toán sau này?** Có thể tích hợp thêm PayOS hoặc VNPay (phổ biến, hỗ trợ QR chuyển khoản, có API đơn giản) — khi đó bước 2-3 ở trên sẽ tự động, không cần bạn tạo mã tay. Đây là hướng mở rộng, chưa có trong bản hiện tại.
