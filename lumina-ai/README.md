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

**Gói Miễn phí / Tháng / Năm:** gói trả phí = **nhiều lượt cao cấp hơn + tổng lượt/ngày cao hơn** (chỉ là "thêm token", không phải model khác) + mở khóa 🌌 Đỉnh cao. **Thanh toán tự động** — khách VN quét QR chuyển khoản (SePay), khách quốc tế trả thẻ/PayPal; tiền vào là gói tự lên (mục 6).

Kiến trúc kế thừa khung "Unified AI Core" (Router · Circuit Breaker · Cache · Memory · Rate limiter · Metrics), viết lại theo Claude API hiện hành + tầng engine miễn phí.

**Đa phương thức (không chỉ chat chữ) — tất cả chạy được trên web miễn phí:**

| Tính năng | Cách dùng | Cần gì |
|---|---|---|
| 🖼 **Xem / hiểu ảnh** | Bấm 📎 đính kèm ảnh → hỏi "ảnh này là gì?" | Gemini (free) hoặc Claude — có sẵn |
| 🎬 **Xem / hiểu video** | Bấm 📎 đính kèm video (≤~18MB) → hỏi về nội dung | Chỉ **Gemini** xem được video (Claude/OpenAI chưa hỗ trợ) |
| 📄 **Đọc tệp** | Bấm 📎 đính kèm PDF/Word/Excel/txt → hỏi về nội dung | Đọc chữ trực tiếp — mọi bộ não đều dùng được |
| 🌐 **Đọc link dán trong chat** | Dán bất kỳ link http(s) nào vào câu hỏi → LUMINA tự tải và đọc nội dung trang | **Mọi bộ não** (server tự tải trang, không phụ thuộc Claude/chế độ tìm kiếm) |
| 🔬 **Nghiên cứu sâu** | Bấm nút **🔬 Nghiên cứu sâu** hoặc gõ "nghiên cứu sâu về…" → LUMINA tìm nhiều nguồn, viết báo cáo có trích dẫn | Bộ não có tìm kiếm (Gemini/Claude) |
| 🎨 **Vẽ ảnh** | Bấm nút **🎨 Vẽ ảnh** hoặc gõ "vẽ con mèo…" → ra ảnh | **Miễn phí, không cần key** (Pollinations); tự dùng DALL-E nếu có `OPENAI_API_KEY` |
| 📝 **Tạo phụ đề video** | Đính kèm video + bấm nút **📝 Phụ đề** → LUMINA xuất transcript chuẩn SRT (kèm mốc thời gian) | Gemini (nghe video) |
| ⚙️ **Lumina Forge** | Bấm nút **⚙️ Lumina Forge** → LUMINA trả lời ở mức kỹ sư cấp cao, TỰ CO GIÃN theo quy mô: việc nhỏ (1 hàm, sửa lỗi) trả lời gọn (chọn ngôn ngữ phù hợp, kiến trúc ngắn gọn, bảo mật, test, Dockerfile/CI-CD nếu liên quan — hỗ trợ Python/TypeScript/JavaScript/Rust/Go/Java/C#/C++/SQL/Bash); việc lớn (kiến trúc hệ thống, nhiều bước) tự dùng đủ quy trình 6 giai đoạn nghiêm ngặt (SPEC → Design Review → Implementation → Validation → Review → Handover). Tự động áp dụng thêm kỹ năng chuyên môn phù hợp từ thư viện nội bộ khi khớp (xem bên dưới). Nếu chưa có code/tài liệu trong hội thoại, LUMINA sẽ hỏi bạn dán vào hoặc dùng 📎/dán link trước khi phân tích | Bộ não có tìm kiếm (Gemini/Claude) |
| 🗣 **Lồng tiếng tự động** | Nút **🗣 Lồng tiếng phim** ở sidebar → chọn video, chọn ngôn ngữ → chờ 1-3 phút → tải video đã lồng tiếng + gắn phụ đề | Chỉ gói **Tháng/Năm** (tốn nhiều tài nguyên xử lý) — xem chi tiết bên dưới |
| 🎤 **Nói bằng giọng** | Bấm 🎤 → nói → ra chữ | Chạy ngay trong trình duyệt (Chrome/Edge/Android), không cần server |

> Router tự nhận ra ý định ("vẽ…", "nghiên cứu sâu…") nên thường **không cần bấm nút**; các nút chỉ để ép chế độ khi muốn.

**🌐 Đọc link dán trong chat:** trước đây chỉ Claude ở chế độ 🔍 tìm kiếm mới đọc được link người dùng dán vào — Gemini/Groq/DeepSeek/OpenAI thì không. Giờ máy chủ **tự tải link** (httpx, không cần key) và tách nội dung đọc được (bỏ menu/quảng cáo/script bằng BeautifulSoup) trước khi đưa cho bộ não — hoạt động với **mọi bộ não, mọi chế độ**. Giới hạn 2 link/tin nhắn, trang nặng hơn 3MB hoặc không phải HTML thì báo lỗi thân thiện thay vì treo.

**🧩 Thư viện Kỹ năng nội bộ:** LUMINA đã tích hợp sẵn 78 kỹ năng chuyên môn tuyển chọn từ các bộ Claude Skills mã nguồn mở (kỹ thuật phần mềm: TDD, code review, bảo mật (IDOR/XSS/SQLi/SSRF), CI/CD, spec-driven development, domain modeling, chẩn đoán bug, giải quyết merge conflict, OAuth, TypeScript nâng cao... + gu thiết kế UI/UX: banner, brand, design system, phong cách brutalist/minimalist, sơ đồ kỹ thuật động, chuẩn accessibility web (WCAG), Material Design 3 Android, Nielsen heuristics, information architecture, color science (OKLCH) + kiến trúc AI agent: multi-agent, memory system, tool design, context degradation, chọn model theo chi phí...). Khi bấm ⚙️ Lumina Forge và nội dung khớp một kỹ năng, LUMINA tự động áp dụng — không cần thao tác gì thêm, không có nút riêng. Chỉ đưa vào các kỹ năng THUẦN VĂN BẢN/PHƯƠNG PHÁP LUẬN (không cần tool/MCP/browser thật, vì LUMINA là chatbot API không có hạ tầng chạy công cụ như một coding agent thật). Xem `data/skills/ATTRIBUTION.md` để biết nguồn + giấy phép từng repo.

**🧠 Trí nhớ dài hạn (nhớ chat cũ):** mỗi hội thoại trong sidebar vốn tách biệt — nhưng khi bạn **mở hội thoại MỚI**, LUMINA tự tìm trong các hội thoại CŨ của **chính bạn** xem có liên quan không, rồi âm thầm đưa vào ngữ cảnh (không hiện ra dạng thô, chỉ là chip nhỏ "🧠 Nhớ lại cuộc trò chuyện"). Không cần bạn nhắc lại từ đầu mỗi lần mở chat mới. Tìm kiếm bằng SQL nội bộ (không gọi API ngoài, gần như không tốn gì) và **luôn lọc theo tài khoản** — tuyệt đối không trộn dữ liệu giữa hai người dùng khác nhau.

### 🗣 Về tính năng Lồng tiếng & Phụ đề tự động (nặng nhất hệ thống)

Đây là pipeline xử lý video THẬT (không phải giả lập): LUMINA **nghe** video (Gemini) → **dịch** lời thoại → **sinh giọng đọc mới** bằng [edge-tts](https://github.com/rany2/edge-tts) (giọng Microsoft, MIỄN PHÍ, không cần key) → **ghép** giọng mới vào đúng mốc thời gian và **gắn cứng phụ đề** bằng ffmpeg (qua gói `imageio-ffmpeg` — mang sẵn binary tĩnh, **không cần cài đặt gì thêm** trên máy chủ, chạy được cả trên Render free).

Giới hạn có chủ đích: video tối đa **~3 phút, ~18MB**; xử lý mất **1-3 phút** (chạy nền, không giữ kết nối HTTP); chỉ mở cho gói **Tháng/Năm** vì đây là tính năng tốn tài nguyên máy chủ nhất trong toàn bộ LUMINA.

> ⚠️ **Lưu ý khi tự deploy:** dịch vụ giọng đọc edge-tts gọi ra máy chủ Microsoft — hoạt động bình thường trên Render/máy cá nhân, nhưng có thể bị chặn bởi một số mạng doanh nghiệp/proxy hạn chế. Hãy thử tính năng này ngay sau khi deploy để chắc chắn mạng máy chủ của bạn kết nối được.

**📚 Kho tri thức tự học (giảm token):** câu hỏi cần tra cứu → LUMINA đọc **kho nội bộ** trong thư mục `data/knowledge.db` trước (0 token, 0 mạng); chưa có thì "học" từ **Wikipedia API miễn phí** (tiếng Việt → tiếng Anh) rồi **lưu vào kho** — càng nhiều người hỏi, kho càng lớn, càng ít tốn lượt tìm kiếm. Vì nguồn mở ai cũng sửa được, tư liệu luôn kèm **link nguồn** và bộ não bị bắt **đối chiếu chéo** với hiểu biết + kết quả tìm kiếm, mâu thuẫn thì phải nói rõ. (Không thể tải cả Wikipedia/CommonCrawl về — hàng TB đến PB — nên "học dần theo câu hỏi thật" là bản khả thi và hiệu quả nhất của ý tưởng này.)

---

## 1. Chuẩn bị (một lần, ~10 phút)

### a) Lấy ÍT NHẤT MỘT key bộ não
Cần tối thiểu một trong số này (khuyến nghị điền **Gemini free** trước, thêm Claude sau nếu muốn chất lượng cao):
- 🆓 **Gemini (miễn phí)** — <https://aistudio.google.com/apikey> → tạo key. Đây là bộ não free chính.
- 🆓 **Groq (miễn phí, rất nhanh)** — <https://console.groq.com/keys>.
- 🆓 **OpenRouter (miễn phí, 1 key nhiều model)** — <https://openrouter.ai/keys>.
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
Bán gói thì cần cổng thanh toán — xem **mục 6** (SePay cho khách VN, PayPal cho khách quốc tế). Đặt `ADMIN_EMAILS=email-cua-ban@gmail.com` để mở mục **🛠 Đơn hàng** trên web. Không bán gói cũng được — web vẫn chạy free bình thường.

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
│   ├── main.py             # FastAPI: auth, hội thoại, /api/chat/stream (SSE), gói, đơn hàng/webhook, health
│   ├── payments.py         # SePay (VietQR + webhook) + PayPal (tạo đơn/capture)
│   ├── router.py           # ✦ Auto-Router "bù trừ" — trái tim của LUMINA (gate 🌌 Đỉnh cao theo gói)
│   ├── orchestrator.py     # Điều phối 2 tầng bộ não + fallback + chế độ vẽ ảnh/nghiên cứu + giấu tên model
│   ├── imagegen.py         # 🎨 Vẽ ảnh (Pollinations free, hoặc DALL-E nếu có OpenAI key)
│   ├── knowledge.py        # 📚 Kho tri thức tự học (data/knowledge.db + Wikipedia free) — giảm token
│   ├── recall.py           # 🧠 Trí nhớ dài hạn — nhớ hội thoại CŨ khi mở hội thoại MỚI (cách ly theo user)
│   ├── webpage.py          # 🌐 Đọc link dán trong chat (httpx + BeautifulSoup) — mọi bộ não dùng được
│   ├── media.py            # 🖼🎬 Xử lý ảnh/video đính kèm (data URL) cho bộ não nhìn được
│   ├── files.py            # 📄 Đọc PDF/Word/Excel/txt đính kèm → tách chữ đưa vào ngữ cảnh
│   ├── video_dub.py        # 🗣 Pipeline lồng tiếng + gắn phụ đề video (Gemini + edge-tts + ffmpeg)
│   ├── engines/claude.py   # Tầng cao cấp: adaptive thinking, web search, xem ảnh, streaming
│   ├── engines/gemini.py   # Tầng free: Gemini + search grounding + xem ảnh/video
│   ├── engines/openai_compatible.py # Tầng free: Groq / DeepSeek / Ollama / OpenAI (chung 1 lớp)
│   ├── auth.py             # Đăng nhập Google → JWT cookie, kiểm tra quyền quản trị
│   ├── db.py               # SQLite: users (+ gói), hội thoại, tin nhắn, đơn hàng, lượt cao cấp/tổng/ngày
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

## 6. Bán gói — thanh toán TỰ ĐỘNG (tiền về thẳng tài khoản bạn)

Người dùng bấm **"✦ Nâng cấp"** → chọn gói → chọn cách trả. Tiền vào là gói **tự kích hoạt**, bạn không phải làm gì. Hai cổng (điền cổng nào thì hiện cổng đó):

### 🇻🇳 Khách VN — SePay (quét QR chuyển khoản)
1. Đăng ký miễn phí tại <https://sepay.vn> → **nối tài khoản ngân hàng** của bạn (chỉ đọc biến động số dư).
2. Trong SePay, đặt **Webhook URL** = `https://<web-cua-ban>/api/webhook/sepay`, lấy **API key**.
3. Điền vào `.env`: `SEPAY_API_KEY`, `PAYMENT_BANK_BIN` (mã BIN ngân hàng, tra tại vietqr.io), `PAYMENT_BANK_ACCOUNT`, `PAYMENT_BANK_OWNER` (IN HOA không dấu), `PAYMENT_BANK_NAME`.
4. Khách bấm "Chuyển khoản VN" → hệ thống **tự sinh mã QR** đúng số tiền + nội dung (mã đơn) → khách quét chuyển → tiền về **thẳng tài khoản bạn** → SePay báo webhook → gói tự lên. Xong.

### 🌍 Khách quốc tế — PayPal (thẻ Visa/MC hoặc PayPal)
1. Có **tài khoản PayPal Business** → vào <https://developer.paypal.com/dashboard> tạo **REST App** → lấy **Client ID + Secret**.
2. Điền vào `.env`: `PAYPAL_CLIENT_ID`, `PAYPAL_SECRET`, `PAYPAL_MODE=live` (dùng `sandbox` để test trước).
3. Khách bấm "Thẻ quốc tế" → trả qua nút PayPal → tiền về **thẳng ví PayPal của bạn** → gói tự lên.

### Vận hành
- Giá gói: `PRICE_MONTHLY_VND`/`PRICE_MONTHLY_USD`/`PRICE_YEARLY_VND`/`PRICE_YEARLY_USD` trong `.env`.
- Gói trả phí tự tăng lượt cao cấp + tổng lượt/ngày (`PAID_PREMIUM_CAP`, `PAID_TOTAL_CAP`) + mở 🌌 Đỉnh cao. **Hết hạn tự hạ về Miễn phí.**
- **Vẫn chỉ 1 key Claude của bạn** — tiền khách trả để bạn nạp token cho key đó. Không có Claude thì gói trả phí vẫn chạy bằng bộ não free (chỉ là không có tầng "cao cấp").
- **Trang quản trị đơn hàng:** đăng nhập bằng email trong `ADMIN_EMAILS` → nút **🛠 Đơn hàng** ở sidebar → xem mọi đơn; nếu khách đã trả mà webhook lỗi, bấm **"Xác nhận"** để kích hoạt tay đơn đó (lưới an toàn).

> ⚠️ **Bảo mật:** mọi khóa (`SEPAY_API_KEY`, `PAYPAL_SECRET`…) chỉ nằm trong `.env`/dashboard Render, **không** đưa lên GitHub. Webhook SePay được xác thực bằng API key; thanh toán PayPal được xác nhận lại phía server (chống giả mạo).
