# ☯ Thiên Đạo Lộ — Game tu tiên hoá thành lộ trình ôn thi THPT

Một game tu tiên chạy trên trình duyệt, nhưng thứ bạn thật sự luyện là **kiến thức ôn thi tốt nghiệp THPT** theo **Chương trình GDPT 2018** (chương trình mới, thi từ 2025).

Mục tiêu thiết kế: đi từ lý thuyết nền đến bài tập vận dụng cao, đủ vững để nhắm **28/30 điểm** tổ hợp 3 môn trong **5 tháng**.

## Chạy thế nào

**Cách nhanh nhất** — mở file đã đóng gói sẵn, không cần cài gì:

```
tu-tien-thpt/thien-dao-lo.html
```

Một file HTML duy nhất, tự chứa toàn bộ. Nhấp đúp là chạy. Copy sang điện thoại, USB, gửi Zalo cho bạn bè đều được. Chạy hoàn toàn offline.

**Cách phát triển** — mở `index.html` (nạp các file rời), sửa xong thì dựng lại:

```bash
node build.mjs          # gộp lại thành thien-dao-lo.html
node check.mjs src/config.js src/data/*.js    # kiểm tra tính hợp lệ dữ liệu
```

Tiến độ lưu bằng `localStorage` ngay trên máy, không gửi đi đâu.

## Cơ chế game

| Trong game | Thật ra là |
|---|---|
| **Cảnh giới** Phàm Nhân → Luyện Khí → Trúc Cơ → Kim Đan → Nguyên Anh → Hoá Thần → Luyện Hư → Hợp Thể → Đại Thừa → Độ Kiếp → **Phi Thăng** | 12 mốc tiến độ theo tổng linh khí tích luỹ |
| **Linh khí** | Điểm kinh nghiệm — câu càng khó cho càng nhiều (Nhận biết 6 → Vận dụng cao 50) |
| **Tâm ma** | Câu trả lời sai, quay lại theo **thuật toán ôn giãn cách** (biến thể SM-2): đúng thì giãn 1 → 3 → 8 → 20 ngày, sai thì quay lại ngay |
| **Độ kiếp** | Thi thử **đúng cấu trúc và thang điểm thật**, có bấm giờ. Đạt 8,0 là vượt kiếp |
| **Linh thạch & túi càn khôn** | Tiền trong game, mua Thiên Cơ Phù (loại 2 đáp án sai), Hồi Xuân Đan (giữ chuỗi)… |
| **Thiên Mệnh Bảng** | Lộ trình 20 tuần chia 4 giai đoạn, tự tính theo ngày bạn bắt đầu |

## Nội dung

Ngân hàng bám đúng **3 dạng thức đề thi**: trắc nghiệm 4 lựa chọn (0,25đ) · đúng/sai 4 ý (thang 0,1 – 0,25 – 0,5 – 1,0) · trả lời ngắn.

**Hoá học** — trọng tâm, theo yêu cầu:
- **88 khẩu quyết trọng điểm**: 72 khối kiến thức số hoá từ bảng ôn tập kinh điển, cộng 16 khối **chỉ có ở chương trình mới** (danh pháp IUPAC, enthalpy ΔH, thế điện cực chuẩn & pin Galvani, phức chất, tách – tinh chế, an toàn thí nghiệm…).
- **Đính chính**: những chỗ tài liệu photo gốc ghi sai đều được đánh dấu ⚠ và sửa lại — ví dụ Cu(OH)₂ không phải hiđroxit lưỡng tính (phải là Cr(OH)₃), but-2-ene + H₂O chỉ cho 1 sản phẩm, propane + Cl₂ cho 2 sản phẩm.
- **19 bí kíp giải nhanh** cho câu vận dụng cao: bốn định luật bảo toàn, quy đổi hỗn hợp, tăng giảm khối lượng, đồ thị CO₂–kiềm và OH⁻–Al³⁺, công thức HNO₃ tổng quát, quy đổi peptide về {C₂H₃NO; CH₂; H₂O}…

**Toán · Vật lí · Sinh học** — bộ công thức đầy đủ kèm điều kiện áp dụng, ví dụ mẫu và bẫy thường gặp. Có đánh dấu `[MỚI]` cho phần chỉ chương trình 2018 mới có: tiệm cận xiên, thống kê mẫu ghép nhóm, xác suất có điều kiện & Bayes.

**Lịch sử · Địa lí · GDKT&PL** — mốc sự kiện, bảng so sánh, thế mạnh 7 vùng kinh tế, mẹo chọn biểu đồ, các con số pháp luật hay ra đề.

**Ngữ văn · Tiếng Anh** — Văn thi tự luận nên là khung kỹ năng: bản đồ đề 120 phút, công thức 3 bước trả lời tác dụng biện pháp tu từ, dàn ý đoạn NLXH 200 chữ, khung phân tích theo 5 thể loại. Anh gồm ngữ pháp trọng tâm và chiến thuật cho các dạng bài mới (sắp xếp câu, điền đoạn văn).

**Bí Lục** — chiến thuật phòng thi: phân bổ điểm để đạt 28/30, khai thác thang điểm luỹ tiến của câu đúng/sai, trình tự làm bài theo mốc phút, kỹ thuật loại trừ, cách dùng sổ lỗi sai.

## Cấu trúc đề thi (đã đối chiếu)

| Môn | Phần I | Phần II | Phần III | Thời gian |
|---|---|---|---|---|
| Toán | 12 câu × 0,25 | 4 câu (4,0đ) | 6 câu × 0,5 | 90 phút |
| Lí · Hoá · Sinh | 18 câu × 0,25 | 4 câu (4,0đ) | 6 câu × 0,25 | 50 phút |
| Sử · Địa · GDKT&PL | 24 câu × 0,25 | 4 câu (4,0đ) | — | 50 phút |
| Tiếng Anh | 40 câu × 0,25 | — | — | 50 phút |
| Ngữ văn | Đọc hiểu 4,0đ + Viết 6,0đ (tự luận) | | | 120 phút |

Câu đúng/sai chấm luỹ tiến: đúng 1 ý 0,10 · 2 ý 0,25 · 3 ý 0,50 · **4 ý 1,00**.

## Lưu ý về ngày thi

Mặc định game đếm ngược tới **12/06/2027**. Kỳ thi thường rơi vào giữa tháng 6 — vào **Cài Đặt** để chỉnh đúng ngày thi và ngày bắt đầu lộ trình của bạn. Lộ trình 20 tuần tự sinh lại theo mốc đó.

## Tự thêm nội dung

Mỗi câu hỏi là một object trong `src/data/*.js`:

```js
{ chuong: 'Ester – Lipid', dang: 'mc', muc: 3,
  q: 'Đề bài…',
  opts: ['A','B','C','D'], ans: 1,        // dang 'mc'
  // items: [{t:'ý a', a:true}, …]        // dang 'ds' — đúng 4 ý
  // ans: '20,4'                          // dang 'tln'
  giai: 'Lời giải từng bước…',
  meo: 'Mẹo hoặc bẫy cần nhớ.' }
```

`muc`: 1 Nhận biết · 2 Thông hiểu · 3 Vận dụng · 4 Vận dụng cao.

Thêm xong chạy `node check.mjs src/config.js src/data/*.js` — bộ kiểm tra sẽ bắt các lỗi thường gặp: thiếu đáp án, câu đúng/sai không đủ 4 ý, và **đáp án trả lời ngắn không khớp với lời giải**.

## Bản đóng gói

`node build.mjs` xuất ra hai file:

- `thien-dao-lo.html` — bản đầy đủ, mở trực tiếp bằng trình duyệt, chạy offline.
- `thien-dao-lo.artifact.html` — cùng nội dung nhưng bỏ khung `<html>/<head>/<body>` để đăng lên nền tảng tự bọc khung.
