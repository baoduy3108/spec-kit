/* ============================================================
   THIÊN ĐẠO LỘ — Cấu hình cốt lõi
   Game tu tiên = lộ trình ôn thi tốt nghiệp THPT (CT GDPT 2018)
   ============================================================ */
window.TD = window.TD || {};

/* ---------- 1. CẢNH GIỚI TU LUYỆN ---------- */
/* exp: linh khí tích luỹ. Mỗi câu đúng = exp theo mức độ. */
TD.CANH_GIOI = [
  { id: 0, ten: 'Phàm Nhân',    tang: 'Chưa dẫn khí',        exp: 0,     mau: '#8a8f98', mo_ta: 'Chưa mở linh mạch. Bắt đầu từ lý thuyết nền.' },
  { id: 1, ten: 'Luyện Khí',    tang: 'Tầng 1–3',            exp: 300,   mau: '#7fb3d5', mo_ta: 'Dẫn khí nhập thể — nắm định nghĩa, công thức gốc.' },
  { id: 2, ten: 'Luyện Khí',    tang: 'Tầng 4–9',            exp: 900,   mau: '#5dade2', mo_ta: 'Khí lưu chuyển — làm trọn vẹn câu nhận biết.' },
  { id: 3, ten: 'Trúc Cơ',      tang: 'Sơ kỳ → Hậu kỳ',      exp: 2000,  mau: '#48c9b0', mo_ta: 'Xây nền vững — thông hiểu, đọc đề không sợ.' },
  { id: 4, ten: 'Kim Đan',      tang: 'Kết đan',             exp: 4000,  mau: '#f5c76b', mo_ta: 'Ngưng đan — vận dụng, giải bài tập chuẩn.' },
  { id: 5, ten: 'Nguyên Anh',   tang: 'Xuất khiếu',          exp: 7000,  mau: '#e59866', mo_ta: 'Nguyên anh xuất thế — xử lý câu đúng/sai 4 ý.' },
  { id: 6, ten: 'Hóa Thần',     tang: 'Thần niệm',           exp: 11000, mau: '#bb8fce', mo_ta: 'Thần thức bao trùm — trả lời ngắn, tính nhanh.' },
  { id: 7, ten: 'Luyện Hư',     tang: 'Phá hư',              exp: 16000, mau: '#af7ac5', mo_ta: 'Phá vỡ giới hạn — vận dụng cao, câu phân hoá.' },
  { id: 8, ten: 'Hợp Thể',      tang: 'Thiên nhân hợp nhất', exp: 22000, mau: '#ec7063', mo_ta: 'Hợp nhất kiến thức liên môn, tốc độ ổn định.' },
  { id: 9, ten: 'Đại Thừa',     tang: 'Viên mãn',            exp: 30000, mau: '#e74c3c', mo_ta: 'Viên mãn — đề nào cũng giữ được nhịp.' },
  { id: 10, ten: 'Độ Kiếp',     tang: 'Cửu Trọng Lôi Kiếp',  exp: 40000, mau: '#f39c12', mo_ta: 'Vượt kiếp = vượt kỳ thi thật. 28+ điểm trong tầm tay.' },
  { id: 11, ten: 'Phi Thăng',   tang: 'Thượng Giới',         exp: 55000, mau: '#ffd700', mo_ta: 'Đăng khoa. Chúc mừng đạo hữu.' }
];

/* ---------- 1b. CẤP ĐỘ LÔI KIẾP ----------
   Cảnh giới càng cao thì thiên kiếp càng nặng: đề dồn về vận dụng
   và vận dụng cao, thời gian bị rút ngắn, ngưỡng vượt kiếp nâng lên.
   CẤP 2 là mốc chuẩn — đúng độ khó và đúng thời gian của đề thi thật;
   các cấp trên là đề phân hoá, cấp dưới là đề làm quen.
   tong: tỉ lệ mức độ cho CẢ ĐỀ (không phải riêng Phần I) — vì Phần II và Phần III
   luôn là câu khó, nếu chỉ đặt trọng số cho Phần I thì cả đề bị lệch nặng về phía khó.
   gio: hệ số thời gian · nguong: điểm vượt kiếp */
TD.KIEP = [
  { cap: 1, ten: 'Nhất Trọng Lôi Kiếp', tuId: 0, nhan: 'đề làm quen, nhẹ hơn đề thật',
    tong: { 1: 0.50, 2: 0.28, 3: 0.18, 4: 0.04 }, gio: 1.15, nguong: 6.5 },
  { cap: 2, ten: 'Tam Trọng Lôi Kiếp', tuId: 3, nhan: 'đúng tỉ lệ 4:3:3 và thời gian của đề thật',
    tong: { 1: 0.40, 2: 0.30, 3: 0.21, 4: 0.09 }, gio: 1.00, nguong: 8.0 },
  { cap: 3, ten: 'Ngũ Trọng Lôi Kiếp', tuId: 5, nhan: 'cỡ đề thi thử trường chuyên',
    tong: { 1: 0.28, 2: 0.30, 3: 0.27, 4: 0.15 }, gio: 0.92, nguong: 8.5 },
  { cap: 4, ten: 'Thất Trọng Lôi Kiếp', tuId: 7, nhan: 'đề phân hoá để lấy 9+',
    tong: { 1: 0.10, 2: 0.22, 3: 0.33, 4: 0.35 }, gio: 0.85, nguong: 9.0 },
  { cap: 5, ten: 'Cửu Trọng Lôi Kiếp', tuId: 9, nhan: 'cỡ đề học sinh giỏi, không có câu cho không',
    tong: { 1: 0.00, 2: 0.10, 3: 0.35, 4: 0.55 }, gio: 0.78, nguong: 9.5 }
];

/* Cấp lôi kiếp mặc định ứng với cảnh giới hiện tại */
TD.kiepTheoCanhGioi = function (exp) {
  const id = TD.canhGioi(exp).id;
  let ra = TD.KIEP[0];
  for (const k of TD.KIEP) if (id >= k.tuId) ra = k;
  return ra;
};

/* ---------- 2. MÔN THI & CẤU TRÚC ĐỀ (TN THPT — CT 2018) ---------- */
/* p1: trắc nghiệm 4 lựa chọn (0,25đ/câu)
   p2: đúng/sai, mỗi câu 4 ý — 1 ý đúng 0,1 | 2 ý 0,25 | 3 ý 0,5 | 4 ý 1,0
   p3: trả lời ngắn (Toán 0,5đ/câu; môn khác 0,25đ/câu) */
TD.MON = {
  toan: { ten: 'Toán',        icon: '⚔️', phai: 'Kiếm Tông',    mau: '#5dade2',
          p1: 12, p2: 4, p3: 6, phut: 90, d1: 0.25, d3: 0.5,
          slogan: 'Một kiếm phá vạn pháp — nhanh, chuẩn, không do dự.' },
  ly:   { ten: 'Vật lí',      icon: '⚡', phai: 'Lôi Đình Điện', mau: '#f4d03f',
          p1: 18, p2: 4, p3: 6, phut: 50, d1: 0.25, d3: 0.25,
          slogan: 'Nắm quy luật trời đất, mượn lực mà thắng.' },
  hoa:  { ten: 'Hoá học',     icon: '⚗️', phai: 'Đan Đỉnh Các',  mau: '#48c9b0',
          p1: 18, p2: 4, p3: 6, phut: 50, d1: 0.25, d3: 0.25,
          slogan: 'Luyện đan cần đúng liều — bảo toàn là đạo.' },
  sinh: { ten: 'Sinh học',    icon: '🌿', phai: 'Vạn Dược Cốc',  mau: '#82e0aa',
          p1: 18, p2: 4, p3: 6, phut: 50, d1: 0.25, d3: 0.25,
          slogan: 'Vạn vật sinh trưởng đều có đạo lý của nó.' },
  su:   { ten: 'Lịch sử',     icon: '📜', phai: 'Tàng Sử Lâu',   mau: '#e59866',
          p1: 24, p2: 4, p3: 0, phut: 50, d1: 0.25, d3: 0,
          slogan: 'Đọc sử ngàn năm, biết hưng vong thiên hạ.' },
  dia:  { ten: 'Địa lí',      icon: '🗺️', phai: 'Sơn Hà Môn',    mau: '#7dcea0',
          p1: 24, p2: 4, p3: 0, phut: 50, d1: 0.25, d3: 0,
          slogan: 'Atlat trong tay, thiên hạ trong lòng.' },
  gdkt: { ten: 'GDKT & PL',   icon: '⚖️', phai: 'Chấp Pháp Đường', mau: '#bb8fce',
          p1: 24, p2: 4, p3: 0, phut: 50, d1: 0.25, d3: 0,
          slogan: 'Luật là giới, hiểu giới mới đi xa.' },
  van:  { ten: 'Ngữ văn',     icon: '🖌️', phai: 'Văn Tâm Các',   mau: '#f1948a',
          p1: 0, p2: 0, p3: 0, phut: 120, tuluan: true, d1: 0, d3: 0,
          slogan: 'Tự luận 120 phút — đọc hiểu 4đ, viết 6đ.' },
  anh:  { ten: 'Tiếng Anh',   icon: '🌐', phai: 'Dịch Ngữ Cung',  mau: '#85c1e9',
          p1: 40, p2: 0, p3: 0, phut: 50, d1: 0.25, d3: 0,
          slogan: '40 câu, 50 phút — 1 phút 1 câu, không luyến tiếc.' }
};

/* Thứ tự hiển thị */
TD.THU_TU_MON = ['toan', 'van', 'hoa', 'ly', 'sinh', 'su', 'dia', 'gdkt', 'anh'];

/* ---------- 3. MỨC ĐỘ CÂU HỎI ---------- */
TD.MUC = {
  1: { ten: 'Nhận biết',     ky: 'Dẫn Khí',   exp: 6,  mau: '#7fb3d5' },
  2: { ten: 'Thông hiểu',    ky: 'Ngưng Thần', exp: 12, mau: '#48c9b0' },
  3: { ten: 'Vận dụng',      ky: 'Ngự Kiếm',  exp: 24, mau: '#f5c76b' },
  4: { ten: 'Vận dụng cao',  ky: 'Độ Kiếp',   exp: 50, mau: '#e74c3c' }
};

/* ---------- 4. CẤU HÌNH MẶC ĐỊNH ---------- */
TD.MAC_DINH = {
  ngay_thi: '2027-06-11',        // đổi được trong phần Cài đặt
  to_hop: ['toan', 'hoa', 'ly'], // tổ hợp xét tuyển (mục tiêu 28đ)
  muc_tieu: 28,
  chi_tieu_ngay: 30              // số câu/ngày
};

/* ---------- 5. VẬT PHẨM ---------- */
TD.VAT_PHAM = {
  thien_co:   { ten: 'Thiên Cơ Phù',  icon: '🔮', gia: 30,  mo_ta: 'Loại bỏ 2 đáp án sai.' },
  hoi_xuan:   { ten: 'Hồi Xuân Đan',  icon: '💊', gia: 60,  mo_ta: 'Bị động: tự nổ khi trả lời sai để giữ nguyên chuỗi liên kích.' },
  ngo_dao:    { ten: 'Ngộ Đạo Trà',   icon: '🍵', gia: 80,  mo_ta: 'Nhân đôi linh khí nhận được trong 10 câu kế.' },
  truy_hon:   { ten: 'Truy Hồn Kính', icon: '🪞', gia: 45,  mo_ta: 'Soi lời giải + mẹo trước khi trả lời (câu đó không tính linh khí).' }
};

/* ---------- 6. THANG QUY ĐỔI ĐIỂM ---------- */
/* Ước lượng điểm từ độ chính xác theo mức độ, có trọng số theo cấu trúc đề. */
/* Bộ GD&ĐT công bố tỉ lệ cấp độ tư duy của đề thi từ 2025 là BIẾT : HIỂU : VẬN DỤNG = 4 : 3 : 3.
   Khung chính thức chỉ có BA cấp; game vẫn tách mức 3 và mức 4 để luyện riêng phần khó,
   nhưng cộng lại phải đúng 30% thì ước lượng điểm mới sát thực tế. */
/* ============================================================
   HẠN NGẠCH CÂU CÓ HÌNH
   Đề thi thật câu nào cũng có hình: Toán vài câu đồ thị và bảng biến
   thiên, Sinh gần như luôn có một câu phả hệ, Lý có mạch điện và đồ
   thị p–V, Hoá có đồ thị kết tủa, Địa có biểu đồ.
   Nếu chỉ thả mẫu có hình vào chung một rổ với hơn tám trăm mẫu khác
   thì xác suất gặp gần bằng không — đo thực tế trước khi đặt hạn
   ngạch: đề Toán trung bình 0,01 câu có hình mỗi đề. Nên phải cấp
   phát chỗ riêng, đúng như cách Bộ ra đề.
   ============================================================ */
TD.SO_CAU_HINH = { toan: 3, ly: 2, hoa: 1, sinh: 1, dia: 2 };
/* tỉ lệ câu có hình trong một phiên Luyện Công của môn có hình */
TD.TY_LE_HINH = 0.18;

TD.TRONG_SO_MUC = { 1: 0.40, 2: 0.30, 3: 0.21, 4: 0.09 };

TD.hamMucTieu = function (diem) {
  if (diem >= 9.5) return 'Thủ khoa cấp tỉnh';
  if (diem >= 9.0) return 'Top trường Y – Bách khoa';
  if (diem >= 8.0) return 'Đại học tốp đầu';
  if (diem >= 7.0) return 'Đại học khá';
  if (diem >= 5.0) return 'Đủ tốt nghiệp';
  return 'Cần cày thêm';
};
