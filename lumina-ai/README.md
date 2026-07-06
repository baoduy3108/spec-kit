<div align="center">

# ✦ LUMINA AI

### *Tư duy sâu, tri thức rộng*

**Một AI hợp nhất — tự chọn bộ não tốt nhất cho từng câu hỏi.**

</div>

---

LUMINA là web chatbot AI "bù trừ": bạn chỉ cần gõ câu hỏi, hệ thống tự phân tích và chọn chế độ tối ưu — **không cần chọn model**:

**Bộ não NHIỀU TẦNG (điểm mấu chốt để chạy gần như miễn phí):**

1. 🥇 **Tầng cao cấp — Claude** (chất lượng cao nhất): dùng cho N lượt đầu mỗi ngày của mỗi người (gói Miễn phí = 2 lượt). Router tự chọn Haiku / Sonnet / Opus / Fable theo độ khó câu hỏi.
2. 🆓 **Tầng thường — miễn phí**: hết lượt cao cấp, LUMINA **tự tụt xuống** Gemini (free) → Groq (free) → DeepSeek (rẻ) → Ollama (máy bạn) → OpenAI. Người dùng vẫn chat tiếp bình thường, **không hề biết đã đổi bộ não**.

→ Bạn chỉ tốn tiền Claude cho vài lượt cao cấp; phần còn lại chạy bằng API miễn phí. **Không có Claude cũng được** — LUMINA chạy 100% bằng bộ não free.

Router tự chọn chế độ theo câu hỏi (⚡ nhanh · ✨ cân bằng · 🧠 tư duy sâu · 🔍 tìm kiếm web · 🌌 đỉnh cao) — nhưng **người dùng chỉ thấy tên "LUMINA"**, không thấy tên model.

**Độ bền kiểu ChatGPT:** bộ não nào lỗi → tự nhảy sang cái kế tiếp (circuit breaker + fallback), người dùng không thấy gì.

**Bảo mật:** bắt buộc đăng nhập Google; API key nằm ở server (không lộ ra trình duyệt); giới hạn lượt/người để bảo vệ chi phí; hệ thống **không bao giờ lộ tên model** ra người dùng.

**Gói Miễn phí / Tháng / Năm:** gói trả phí = **nhiều lượt cao cấp hơn + tổng lượt/ngày cao hơn** (chỉ là "thêm token", không phải model khác) + mở khóa 🌌 Đỉnh cao. Chưa cần cổng thanh toán — người dùng chuyển khoản/Momo, bạn xác nhận rồi tạo **mã kích hoạt** (mục 6).

Kiến trúc kế thừa khung "Unified AI Core" (Router · Circuit Breaker · Cache · Memory · Rate limiter · Metrics), viết lại theo Claude API hiện hành + tầng engine miễn phí.

---

## 1. Chuẩn bị (một lần, ~10 phút)

### a) Lấy ÍT NHẤT MỘT key bộ não
Cần tối thiểu một trong số này (khuyến nghị điền **Gemini free** trước, thêm Claude sau nếu muốn chất lượng cao):
- 🆓 **Gemini (miễn phí)** — <https://aistudio.google.com/apikey> → tạo key. Đây là bộ não free chính.
- 🆓 **Groq (miễn phí, rất nhanh)** — <https://console.groq.com/keys>.
- 🥇 **Claude (cao cấp, có phí)** — <https://console.anthropic.com/settings/keys>, nạp vài đô. Chỉ dùng cho các lượt "cao cấp"; không bắt buộc.
- 💰 **DeepSeek (cực rẻ)** — <https://platform.deepseek.com>; **Ollama (free, tự host)** — <https://ollama.com>.

Điền key nào có vào `.env` (mục 2) — LUMINA tự dùng cái nào sẵn có.

### b) Tạo Google Client ID (bắt buộc — cho nút đăng nhập Google)
1. Vào <https://console.cloud.google.com/apis/credentials> → tạo Project mới.
2. **Create Credentials → OAuth client ID** (nếu được hỏi, cấu hình *OAuth consent screen* trước: chọn *External*, điền tên app "LUMINA AI", email của bạn).
3. Application type: **Web application**.
4. Mục **Authorized JavaScript origins** thêm:
   - `http://localhost:8000` (chạy thử trên máy)
   - Domain web thật sau khi deploy, ví dụ `https://lumina-ai.onrender.com`
5. Sao chép **Client ID** dạng `xxxxx.apps.googleusercontent.com`.

### c) (Tùy chọn) Thêm bộ não dự phòng
Điền càng nhiều key thì càng bền (bộ não này lỗi/hết hạn mức thì nhảy sang cái khác): `GROQ_API_KEY`, `DEEPSEEK_API_KEY`, `OPENAI_API_KEY`, hoặc `OLLAMA_BASE_URL` (tự host model trên máy riêng).

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
│   ├── orchestrator.py     # Điều phối 2 tầng bộ não (cao cấp/free) + fallback + giấu tên model
│   ├── engines/claude.py   # Tầng cao cấp: adaptive thinking, web search, streaming
│   ├── engines/gemini.py   # Tầng free: Gemini + search grounding
│   ├── engines/openai_compatible.py # Tầng free: Groq / DeepSeek / Ollama / OpenAI (chung 1 lớp)
│   ├── auth.py             # Đăng nhập Google → JWT cookie, kiểm tra quyền quản trị
│   ├── db.py               # SQLite: users (+ gói), hội thoại, tin nhắn, mã kích hoạt, lượt cao cấp/tổng/ngày
│   ├── memory.py / cache.py / circuit_breaker.py / ratelimit.py / monitor.py
│   └── search/             # Tavily/DuckDuckGo cho engine free khi cần tìm kiếm
├── static/                 # Giao diện chat + modal Nâng cấp/Quản trị (HTML/CSS/JS thuần, không cần build)
├── tests/test_core.py
├── render.yaml / Dockerfile / requirements.txt / .env.example
```

## 5. Câu hỏi thường gặp

**Tốn bao nhiêu tiền?** Nếu chỉ điền key **Gemini/Groq free** (không điền Claude) → **gần như $0**, người dùng chat thoải mái trong hạn mức free của Google/Groq. Điền thêm Claude thì chỉ tốn tiền cho các lượt "cao cấp" (mặc định 2 lượt/người/ngày với gói Miễn phí).

**Ngân sách chỉ vài chục đô thì sao?** Đúng bài toán này: `FREE_PREMIUM_CAP=2` — mỗi người chỉ được 2 lượt Claude/ngày, hết thì tự tụt xuống bộ não free (không tốn tiền), tối đa `FREE_TOTAL_CAP=30` tin nhắn/ngày. Muốn nhiều lượt cao cấp hơn → mua gói Tháng/Năm (mục 6), tiền đó bạn dùng nạp thêm token Claude. Khi ngân sách rộng hơn, tăng các con số này trong `.env`.

**Model nào đang trả lời?** Người dùng không biết và không cần biết — mọi câu trả lời đều dưới tên "LUMINA". Bạn (chủ web) xem log server sẽ thấy engine thực tế.

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
