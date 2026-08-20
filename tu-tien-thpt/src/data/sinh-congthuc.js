/* ============================================================
   SINH HỌC — BÍ KÍP CÔNG THỨC (Vạn Dược Cốc)
   Bám CT GDPT 2018: Di truyền – Tiến hoá – Sinh thái.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

TD.KHO.sinh_ct = [
/* ============ I. DI TRUYỀN PHÂN TỬ ============ */
{ nhom: 'I. Di truyền phân tử', ten: 'Cấu trúc DNA – các công thức gốc', cap: 2,
  ct: '<b>N = A + T + G + C = 2A + 2G</b> &nbsp;(N: tổng nucleotide)<br><b>A = T ; G = C</b> &nbsp;·&nbsp; %A + %G = 50%<br><b>Chiều dài: L = (N/2)·3,4 Å</b> &nbsp;(1 Å = 10⁻¹ nm = 10⁻⁷ mm)<br><b>Số chu kì xoắn: C = N/20</b> &nbsp;(mỗi chu kì 10 cặp nu, dài 34 Å)<br><b>Khối lượng: M = N × 300 đvC</b><br><b>Số liên kết hydrogen: H = 2A + 3G</b><br>Số liên kết phosphodiester = N − 2 (mạch thẳng)',
  khi: 'Bài tính toán về gene, DNA — dạng cơ bản chắc chắn có.',
  vd: 'Gene dài 5100 Å ⇒ N = 2·5100/3,4 = <b>3000 nu</b>; C = 150 chu kì; M = 9·10⁵ đvC.',
  bay: 'L tính theo <b>N/2</b> (số cặp nu), không phải N. Nhân đôi lỗi này là sai gấp đôi.' },

{ nhom: 'I. Di truyền phân tử', ten: 'Nhân đôi DNA (tái bản)', cap: 3,
  ct: 'Sau k lần nhân đôi từ 1 phân tử DNA mẹ:<br>&nbsp;&nbsp;• Số DNA con tạo ra: <b>2ᵏ</b><br>&nbsp;&nbsp;• Số DNA con <b>hoàn toàn mới</b> (không chứa mạch mẹ): <b>2ᵏ − 2</b><br>&nbsp;&nbsp;• Số nu môi trường cung cấp: <b>N·(2ᵏ − 1)</b><br>&nbsp;&nbsp;• Số nu loại A môi trường cung cấp: A·(2ᵏ − 1)<br>&nbsp;&nbsp;• Số liên kết hydrogen bị phá vỡ: H·(2ᵏ − 1)<br><b>Nguyên tắc:</b> bổ sung + <b>bán bảo toàn</b>; mạch mới tổng hợp theo chiều <b>5′ → 3′</b>.',
  khi: 'Bài về tái bản DNA.',
  vd: 'Gene có 3000 nu nhân đôi 3 lần: môi trường cung cấp 3000·(2³−1) = <b>21 000 nu</b>.',
  bay: 'Luôn có đúng <b>2</b> phân tử con chứa mạch của DNA mẹ ban đầu (bán bảo toàn) — dù nhân đôi bao nhiêu lần.' },

{ nhom: 'I. Di truyền phân tử', ten: 'Phiên mã & dịch mã', cap: 3,
  ct: '<b>mRNA:</b> rN = N/2 &nbsp;·&nbsp; L<sub>mRNA</sub> = rN × 3,4 Å<br>&nbsp;&nbsp;A<sub>gốc</sub> = U<sub>m</sub> ; T<sub>gốc</sub> = A<sub>m</sub> ; G<sub>gốc</sub> = C<sub>m</sub> ; C<sub>gốc</sub> = G<sub>m</sub><br><b>Số bộ ba trên mRNA = rN/3</b><br><b>Số amino acid trong chuỗi polypeptide hoàn chỉnh = rN/3 − 2</b><br>&nbsp;&nbsp;(trừ 1 bộ ba kết thúc và 1 methionine mở đầu bị cắt)<br>Số phân tử nước giải phóng = số liên kết peptide = <b>số aa − 1</b><br>Mã di truyền: <b>64 bộ ba</b>, 61 mã hoá aa, 3 bộ ba kết thúc (UAA, UAG, UGA), mở đầu <b>AUG</b>.',
  khi: 'Bài tính số amino acid, số bộ ba.',
  vd: 'Gene 3000 nu ⇒ mRNA 1500 nu ⇒ 500 bộ ba ⇒ chuỗi hoàn chỉnh có <b>498 aa</b>.',
  bay: 'Đề hỏi "chuỗi polypeptide <b>hoàn chỉnh</b>" thì trừ 2; hỏi "số aa môi trường cung cấp" thì trừ 1 (rN/3 − 1).' },

{ nhom: 'I. Di truyền phân tử', ten: 'Đột biến gene', cap: 3,
  ct: '<b>Thay thế 1 cặp nu:</b> chiều dài không đổi.<br>&nbsp;&nbsp;• A–T → G–C: H <b>tăng 1</b> &nbsp;·&nbsp; G–C → A–T: H <b>giảm 1</b><br><b>Thêm/mất 1 cặp nu:</b> gây <b>dịch khung</b> ⇒ hậu quả nghiêm trọng nhất (thay đổi toàn bộ aa từ điểm đột biến).<br><b>Đột biến câm (đồng nghĩa):</b> thay nu nhưng bộ ba mới vẫn mã hoá cùng aa (do tính <b>thoái hoá</b> của mã di truyền).<br><b>Đột biến vô nghĩa:</b> tạo bộ ba kết thúc sớm ⇒ chuỗi ngắn lại.',
  khi: 'Câu về đột biến gene và hậu quả.',
  vd: 'Gene có H = 3600, sau đột biến H = 3601, chiều dài không đổi ⇒ <b>thay 1 cặp A–T bằng G–C</b>.',
  bay: 'Đột biến <b>thay thế</b> thường ít nghiêm trọng nhất; <b>thêm/mất</b> gây dịch khung nghiêm trọng nhất.' },

/* ============ II. DI TRUYỀN NHIỄM SẮC THỂ ============ */
{ nhom: 'II. Di truyền NST', ten: 'Đột biến số lượng NST', cap: 3,
  ct: '<b>Lệch bội</b> (thay đổi số NST ở 1 hoặc vài cặp):<br>&nbsp;&nbsp;• Thể một: 2n − 1 · Thể ba: <b>2n + 1</b> · Thể không: 2n − 2 · Thể bốn: 2n + 2<br><b>Đa bội</b> (thay đổi cả bộ):<br>&nbsp;&nbsp;• Tự đa bội: 3n, 4n… &nbsp;·&nbsp; Dị đa bội (song nhị bội): từ lai xa + đa bội hoá<br><b>Số loại thể ba khác nhau ở loài 2n = n</b> (mỗi cặp NST cho 1 loại)<br>Cây đa bội lẻ (3n) <b>bất thụ</b> ⇒ không hạt (dưa hấu, chuối nhà).',
  khi: 'Câu về hội chứng di truyền, giống cây trồng.',
  vd: 'Người 2n = 46. Hội chứng Down = thể ba cặp 21 ⇒ <b>47 NST</b>. Turner: XO (45). Klinefelter: XXY (47).',
  bay: 'Thể ba là 2n + 1 (thừa 1 chiếc); thể tam bội là 3n (thừa cả bộ) — hoàn toàn khác nhau.' },

{ nhom: 'II. Di truyền NST', ten: 'Quy luật Mendel & số loại giao tử', cap: 3,
  ct: '<b>Cơ thể dị hợp n cặp gene</b> (phân li độc lập):<br>&nbsp;&nbsp;• Số loại giao tử: <b>2ⁿ</b><br>&nbsp;&nbsp;• Số kiểu tổ hợp giao tử: 2ⁿ × 2ⁿ = 4ⁿ<br>&nbsp;&nbsp;• Số loại kiểu gene ở F₁: <b>3ⁿ</b> · Số loại kiểu hình: <b>2ⁿ</b><br><b>Với 1 gene có r allele:</b> số kiểu gene = <b>r(r+1)/2</b>; số kiểu gene đồng hợp = r; dị hợp = r(r−1)/2<br>Phép lai phân tích: lai với cơ thể <b>đồng hợp lặn</b> để xác định kiểu gene.',
  khi: 'Bài lai, đếm kiểu gene/kiểu hình.',
  vd: 'AaBbCc (3 cặp dị hợp) tự thụ ⇒ 2³ = <b>8 loại giao tử</b>, 3³ = <b>27 kiểu gene</b>, 2³ = <b>8 kiểu hình</b>.',
  bay: 'Công thức 3ⁿ, 2ⁿ chỉ đúng khi các gene <b>phân li độc lập</b> và <b>trội hoàn toàn</b>. Trội không hoàn toàn thì số kiểu hình = số kiểu gene.' },

{ nhom: 'II. Di truyền NST', ten: 'Liên kết gene & hoán vị gene', cap: 4,
  ct: '<b>Tần số hoán vị: f = (số cá thể tái tổ hợp / tổng số cá thể) × 100%</b> &nbsp;(0% ≤ f ≤ 50%)<br><b>Tỉ lệ giao tử ở cơ thể dị hợp 2 cặp có hoán vị:</b><br>&nbsp;&nbsp;• 2 giao tử <b>liên kết</b> (giống bố mẹ): mỗi loại = <b>(1 − f)/2</b><br>&nbsp;&nbsp;• 2 giao tử <b>hoán vị</b>: mỗi loại = <b>f/2</b><br><b>Khoảng cách gene trên NST = f (đơn vị cM — centiMorgan)</b><br>Liên kết hoàn toàn (f = 0): AB/ab chỉ cho 2 loại giao tử AB và ab.',
  khi: 'Câu VDC di truyền — dạng khó nhất.',
  vd: 'f = 20% ⇒ giao tử AB = ab = 40%; Ab = aB = <b>10%</b> (nếu kiểu gene AB/ab).',
  bay: 'f ≤ 50%. Nếu tính ra f &gt; 50% là sai. Phải xác định đúng kiểu gene <b>dị hợp đều (AB/ab)</b> hay <b>dị hợp chéo (Ab/aB)</b> để biết đâu là giao tử liên kết.' },

{ nhom: 'II. Di truyền NST', ten: 'Di truyền liên kết giới tính', cap: 3,
  ct: 'Người, thú: <b>XX = cái, XY = đực</b>. Chim, bướm: <b>XX (ZZ) = đực, XY (ZW) = cái</b>.<br><b>Gene trên X không có allele trên Y:</b> di truyền <b>chéo</b> (bố → con gái, mẹ → con trai) ⇒ bệnh biểu hiện <b>nhiều ở nam</b> (mù màu, máu khó đông).<br><b>Gene trên Y:</b> di truyền <b>thẳng</b> 100% cho con trai.<br><b>Di truyền ngoài nhân (ti thể, lục lạp):</b> di truyền theo <b>dòng mẹ</b>, kết quả lai thuận ≠ lai nghịch, không tuân theo Mendel.',
  khi: 'Bài phả hệ, xác định quy luật di truyền.',
  vd: 'Mẹ X^A X^a × Bố X^A Y ⇒ con trai có 1/2 bị bệnh, con gái không ai biểu hiện.',
  bay: 'Dấu hiệu nhận biết gene ngoài nhân: <b>đời con luôn giống mẹ</b> và lai thuận nghịch cho kết quả khác nhau.' },

/* ============ III. DI TRUYỀN QUẦN THỂ ============ */
{ nhom: 'III. Di truyền quần thể', ten: 'Cấu trúc di truyền & tần số allele', cap: 3,
  ct: 'Quần thể có cấu trúc <b>x·AA + y·Aa + z·aa = 1</b>:<br>&nbsp;&nbsp;<b>p(A) = x + y/2</b> &nbsp;·&nbsp; <b>q(a) = z + y/2</b> &nbsp;·&nbsp; p + q = 1<br><b>Tự thụ phấn qua n thế hệ</b> (bắt đầu từ 100% Aa):<br>&nbsp;&nbsp;• Aa = <b>(1/2)ⁿ</b><br>&nbsp;&nbsp;• AA = aa = <b>[1 − (1/2)ⁿ]/2</b><br>⇒ Tự thụ làm <b>tăng đồng hợp, giảm dị hợp</b>, tần số allele KHÔNG đổi.',
  khi: 'Bài quần thể tự thụ, giao phối gần.',
  vd: 'Quần thể 0,36AA + 0,48Aa + 0,16aa ⇒ p = 0,36 + 0,24 = <b>0,6</b>; q = <b>0,4</b>.',
  bay: 'Tự thụ phấn làm thay đổi <b>thành phần kiểu gene</b> nhưng KHÔNG làm thay đổi <b>tần số allele</b>.' },

{ nhom: 'III. Di truyền quần thể', ten: 'Định luật Hardy – Weinberg', cap: 3,
  ct: 'Quần thể cân bằng: <b>p² AA + 2pq Aa + q² aa = 1</b>, với p + q = 1.<br><b>Kiểm tra cân bằng: (2pq/2)² = p²·q²</b> ⇔ <b>y² = 4xz</b><br><b>5 điều kiện nghiệm đúng:</b> ① kích thước quần thể lớn ② giao phối ngẫu nhiên ③ không đột biến ④ không chọn lọc tự nhiên ⑤ không di – nhập gene.<br>Với gene trên X: p²X^AX^A + 2pqX^AX^a + q²X^aX^a (giới XX) và pX^AY + qX^aY (giới XY).',
  khi: 'Bài tính tỉ lệ người mang gene bệnh, xác suất sinh con bệnh.',
  vd: 'Bệnh do gene lặn, tỉ lệ người bệnh q² = 0,01 ⇒ q = 0,1; p = 0,9 ⇒ tỉ lệ mang gene (Aa) = 2·0,9·0,1 = <b>18%</b>.',
  bay: 'Từ q² tính q phải <b>căn bậc hai</b>. Người "mang gene" nghĩa là dị hợp Aa, không tính người bệnh aa.' },

/* ============ IV. TIẾN HOÁ ============ */
{ nhom: 'IV. Tiến hoá', ten: 'Các nhân tố tiến hoá', cap: 2,
  ct: '<table class="kq small"><tr><th>Nhân tố</th><th>Thay đổi tần số allele</th><th>Đặc điểm</th></tr>' +
      '<tr><td><b>Đột biến</b></td><td>rất chậm, vô hướng</td><td>tạo <b>nguyên liệu sơ cấp</b></td></tr>' +
      '<tr><td>Di – nhập gene</td><td>nhanh/chậm, vô hướng</td><td>làm 2 quần thể giống nhau hơn</td></tr>' +
      '<tr><td><b>Chọn lọc tự nhiên</b></td><td>có <b>hướng</b></td><td>nhân tố <b>định hướng</b> duy nhất</td></tr>' +
      '<tr><td>Yếu tố ngẫu nhiên (phiêu bạt)</td><td>nhanh, vô hướng</td><td>mạnh ở quần thể <b>nhỏ</b>; có thể loại allele có lợi</td></tr>' +
      '<tr><td>Giao phối không ngẫu nhiên</td><td><b>KHÔNG đổi</b> tần số allele</td><td>chỉ thay đổi thành phần kiểu gene (tăng đồng hợp)</td></tr></table>' +
      '<b>Biến dị tổ hợp</b> = nguyên liệu <b>thứ cấp</b> của tiến hoá.',
  khi: 'Câu lý thuyết tiến hoá, xuất hiện đều đặn mỗi năm.',
  vd: 'CLTN tác động trực tiếp lên <b>kiểu hình</b>, gián tiếp làm biến đổi tần số kiểu gene.',
  bay: 'Giao phối không ngẫu nhiên là nhân tố tiến hoá DUY NHẤT không làm thay đổi tần số allele.' },

{ nhom: 'IV. Tiến hoá', ten: 'Loài & hình thành loài', cap: 2,
  ct: '<b>Loài sinh học:</b> nhóm cá thể có khả năng giao phối tạo đời con <b>hữu thụ</b>, cách li sinh sản với nhóm khác.<br><b>Cách li trước hợp tử:</b> nơi ở, tập tính, thời gian, cơ học ⇒ ngăn giao phối.<br><b>Cách li sau hợp tử:</b> con lai bất thụ/chết ⇒ ngăn tạo con lai hữu thụ.<br><b>Con đường hình thành loài:</b><br>&nbsp;&nbsp;• Khác khu (địa lí) — phổ biến ở động vật, <b>chậm</b><br>&nbsp;&nbsp;• Cùng khu: sinh thái, tập tính, <b>lai xa + đa bội hoá</b> (nhanh nhất, phổ biến ở thực vật)',
  khi: 'Câu lý thuyết tiến hoá.',
  vd: 'Lừa × Ngựa → la <b>bất thụ</b> ⇒ đây là cách li <b>sau hợp tử</b> ⇒ lừa và ngựa là 2 loài khác nhau.',
  bay: 'Lai xa + đa bội hoá hình thành loài mới <b>ngay lập tức</b> — nhanh nhất trong các con đường.' },

/* ============ V. SINH THÁI HỌC ============ */
{ nhom: 'V. Sinh thái', ten: 'Quần thể sinh vật', cap: 2,
  ct: '<b>Kích thước quần thể: N<sub>t</sub> = N₀ + B − D + I − E</b><br>&nbsp;&nbsp;(B: sinh, D: tử, I: nhập cư, E: xuất cư)<br><b>Mật độ = số cá thể / đơn vị diện tích (thể tích)</b> — đặc trưng quan trọng nhất.<br><b>Tăng trưởng:</b> đường cong <b>J</b> (môi trường lí tưởng, không giới hạn) · đường cong <b>S</b> (có giới hạn, tiệm cận sức chứa K).<br>3 kiểu phân bố: đồng đều (cạnh tranh gay gắt) · <b>theo nhóm (phổ biến nhất)</b> · ngẫu nhiên.<br>3 dạng tháp tuổi: phát triển · ổn định · suy thoái.',
  khi: 'Câu về quần thể, biểu đồ tăng trưởng.',
  vd: 'Tăng trưởng thực tế của quần thể luôn theo <b>đường cong chữ S</b> vì nguồn sống có hạn.',
  bay: 'Cạnh tranh cùng loài là động lực giúp quần thể tồn tại và phát triển — KHÔNG phải chỉ có hại.' },

{ nhom: 'V. Sinh thái', ten: 'Quần xã & mối quan hệ', cap: 2,
  ct: '<table class="kq small"><tr><th>Quan hệ</th><th>Loài A</th><th>Loài B</th><th>Ví dụ</th></tr>' +
      '<tr><td>Cộng sinh</td><td>+</td><td>+</td><td>vi khuẩn Rhizobium – rễ đậu</td></tr>' +
      '<tr><td>Hợp tác</td><td>+</td><td>+</td><td>chim sáo – trâu rừng (không bắt buộc)</td></tr>' +
      '<tr><td>Hội sinh</td><td>+</td><td>0</td><td>phong lan bám thân gỗ</td></tr>' +
      '<tr><td>Cạnh tranh</td><td>−</td><td>−</td><td>cú và chồn cùng săn chuột</td></tr>' +
      '<tr><td>Kí sinh</td><td>+</td><td>−</td><td>giun sán trong ruột</td></tr>' +
      '<tr><td>Ức chế – cảm nhiễm</td><td>0</td><td>−</td><td>tảo giáp nở hoa gây độc cá</td></tr>' +
      '<tr><td>Sinh vật ăn sinh vật</td><td>+</td><td>−</td><td>hổ ăn thỏ</td></tr></table>' +
      '<b>Ổ sinh thái</b> khác <b>nơi ở</b>: nơi ở là "địa chỉ", ổ sinh thái là "nghề nghiệp".',
  khi: 'Câu nhận biết mối quan hệ — điểm dễ ăn.',
  vd: 'Cộng sinh và hợp tác đều (+ +), khác nhau ở chỗ cộng sinh là <b>bắt buộc</b>.',
  bay: 'Phân biệt hội sinh (+ 0) và hợp tác (+ +). Cạnh tranh khác loài làm phân li ổ sinh thái.' },

{ nhom: 'V. Sinh thái', ten: 'Hệ sinh thái & dòng năng lượng', cap: 3,
  ct: '<b>Hiệu suất sinh thái: H = (năng lượng bậc sau / năng lượng bậc trước) × 100%</b><br>&nbsp;&nbsp;Trung bình chỉ <b>~10%</b> năng lượng được chuyển lên bậc kế tiếp (quy tắc 10%).<br><b>Dòng năng lượng: một chiều, không tuần hoàn</b> — giảm dần qua các bậc dinh dưỡng.<br><b>Chu trình vật chất: tuần hoàn</b> (C, N, nước).<br>Chuỗi thức ăn thường ngắn (4–5 mắt xích) vì năng lượng hao hụt lớn.<br>Bậc dinh dưỡng: SV sản xuất (cấp 1) → SV tiêu thụ bậc 1 (cấp 2) → …',
  khi: 'Bài tính năng lượng qua các bậc dinh dưỡng.',
  vd: 'Bậc 1 có 10⁶ kcal, H = 10% mỗi bậc ⇒ bậc 3 còn 10⁶·0,1·0,1 = <b>10⁴ kcal</b>.',
  bay: 'Năng lượng KHÔNG tuần hoàn (khác vật chất). Đây là điểm phân biệt hay hỏi ở câu đúng/sai.' },

{ nhom: 'V. Sinh thái', ten: 'Diễn thế sinh thái', cap: 2,
  ct: '<b>Diễn thế nguyên sinh:</b> khởi đầu từ môi trường <b>chưa có sinh vật</b> (đảo núi lửa mới) → quần xã đỉnh cực.<br><b>Diễn thế thứ sinh:</b> khởi đầu từ môi trường <b>đã có quần xã</b> nhưng bị huỷ diệt (rừng bị cháy, nương rẫy bỏ hoang).<br><b>Xu hướng:</b> đa dạng loài <b>tăng</b>, lưới thức ăn <b>phức tạp hơn</b>, ổ sinh thái <b>hẹp lại</b>, tổng sinh khối <b>tăng</b>.<br>Nguyên nhân: tác động của ngoại cảnh + <b>cạnh tranh nội bộ quần xã</b> (nguyên nhân bên trong quan trọng nhất).',
  khi: 'Câu lý thuyết sinh thái.',
  vd: 'Rừng ngập mặn hình thành trên bãi bồi mới = diễn thế <b>nguyên sinh</b>.',
  bay: 'Diễn thế thứ sinh CÓ THỂ dẫn đến quần xã suy thoái (nếu tác động quá mạnh), không phải luôn tiến tới đỉnh cực.' },

/* ============ VI. SINH 10–11 ============ */
{ nhom: 'VI. Sinh 10–11', ten: 'Quang hợp & hô hấp', cap: 2,
  ct: '<b>Quang hợp:</b> 6CO₂ + 12H₂O <span class="ar">ánh sáng, diệp lục</span> C₆H₁₂O₆ + 6O₂ + 6H₂O<br>&nbsp;&nbsp;• Pha sáng (màng thylakoid): tạo <b>ATP, NADPH, O₂</b>; O₂ có nguồn gốc từ <b>H₂O</b>.<br>&nbsp;&nbsp;• Pha tối (chất nền stroma): chu trình <b>Calvin</b>, cố định CO₂.<br><b>Hô hấp tế bào:</b> C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + <b>~30–32 ATP</b><br>&nbsp;&nbsp;Đường phân (tế bào chất) → Oxi hoá pyruvate & chu trình Krebs (ti thể) → Chuỗi truyền electron (màng trong ti thể, tạo nhiều ATP nhất).',
  khi: 'Câu sinh học 11 xuất hiện trong đề.',
  vd: 'Thực vật <b>C4</b> và <b>CAM</b> thích nghi vùng nóng khô, có điểm bù CO₂ thấp, năng suất cao hơn C3.',
  bay: 'O₂ thải ra trong quang hợp có nguồn gốc từ <b>nước</b> (quang phân li H₂O), không phải từ CO₂.' },

{ nhom: 'VI. Sinh 10–11', ten: 'Nguyên phân & giảm phân', cap: 2,
  ct: '<b>Nguyên phân:</b> 1 tế bào 2n → <b>2</b> tế bào con <b>2n</b> (giống hệt mẹ). Sau k lần: <b>2ᵏ</b> tế bào.<br><b>Giảm phân:</b> 1 tế bào 2n → <b>4</b> tế bào con <b>n</b>.<br>&nbsp;&nbsp;• Kì đầu I: <b>tiếp hợp và trao đổi chéo</b> ⇒ nguồn gốc của hoán vị gene.<br>&nbsp;&nbsp;• Kì sau I: phân li cặp NST <b>tương đồng</b> ⇒ tạo biến dị tổ hợp.<br><b>Số loại giao tử tối đa</b> của loài 2n (không trao đổi chéo): <b>2ⁿ</b>.<br>Ở người 2n = 46, n = 23 ⇒ 2²³ ≈ 8,4 triệu loại giao tử.',
  khi: 'Bài tính số tế bào, số giao tử.',
  vd: '5 tế bào sinh tinh giảm phân ⇒ <b>20 tinh trùng</b>. 5 tế bào sinh trứng ⇒ <b>5 trứng</b> + 15 thể cực.',
  bay: 'Tế bào sinh tinh cho 4 tinh trùng, nhưng tế bào sinh trứng chỉ cho <b>1 trứng</b> — bẫy hay gặp.' }
];

TD.KHO.sinh_ct.push(

/* ============ BỔ SUNG: PHỦ KÍN CÔNG THỨC CÓ THỂ RA THI ============ */
{ nhom: 'II. Di truyền NST', ten: 'Số loại kiểu gene & kiểu hình', cap: 2,
  ct: '<b>Một gene có n allele</b> ⇒ số kiểu gene = n(n+1)/2 (trên NST thường)<br>Nhiều gene phân li độc lập: nhân số kiểu gene của từng gene.<br>Gene trên X (không có allele trên Y): số KG = n(n+1)/2 (giới XX) + n (giới XY).<br>Phép lai nhiều cặp tính trạng PLĐL: tách riêng từng cặp rồi NHÂN kết quả.',
  khi: 'Bài đếm số kiểu gene tối đa trong quần thể.',
  vd: 'Gene có 3 allele trên NST thường ⇒ 3·4/2 = <b>6 kiểu gene</b>.',
  bay: 'Gene trên vùng tương đồng X–Y thì công thức khác. Đọc kĩ đề nói gene nằm ở vùng nào.' },

{ nhom: 'II. Di truyền NST', ten: 'Tương tác gene & tỉ lệ biến dạng', cap: 3,
  ct: 'F₂ của phép lai 2 cặp gene (AaBb × AaBb) luôn có nền 9 : 3 : 3 : 1, các kiểu tương tác chỉ gộp lại:<br>· <b>9 : 7</b> bổ sung · <b>9 : 6 : 1</b> bổ sung · <b>9 : 3 : 4</b> át chế lặn<br>· <b>12 : 3 : 1</b> át chế trội · <b>13 : 3</b> át chế trội · <b>15 : 1</b> cộng gộp<br>Tổng luôn bằng 16 ⇒ nhận ra ngay là tương tác gene.',
  khi: 'Câu vận dụng cao về quy luật di truyền.',
  vd: 'F₂ có tỉ lệ 9 : 7 ⇒ tương tác BỔ SUNG, cần cả A và B mới cho kiểu hình trội.',
  bay: 'Thấy tỉ lệ có tổng 16 mà không phải 9:3:3:1 thì gần như chắc chắn là tương tác gene, không phải PLĐL thường.' },

{ nhom: 'II. Di truyền NST', ten: 'Tần số hoán vị & bản đồ di truyền', cap: 3,
  ct: '<b>f = (số cá thể tái tổ hợp / tổng số cá thể) × 100 %</b>, 0 &lt; f ≤ 50 %<br>Giao tử liên kết mỗi loại = (1 − f)/2; giao tử hoán vị mỗi loại = f/2.<br>1 % hoán vị = 1 cM (centiMorgan) trên bản đồ di truyền.<br>Hoán vị chỉ xảy ra ở kì đầu giảm phân I, ở cặp NST tương đồng.',
  khi: 'Bài lai phân tích, xác định kiểu gene bố mẹ và tần số hoán vị.',
  vd: 'Lai phân tích cho 4 kiểu hình 40 % : 40 % : 10 % : 10 % ⇒ f = 10 + 10 = <b>20 %</b>.',
  bay: 'f không bao giờ vượt 50 %. Ra kết quả &gt; 50 % nghĩa là đã nhầm nhóm tái tổ hợp với nhóm liên kết.' },

{ nhom: 'II. Di truyền NST', ten: 'Di truyền phả hệ & xác suất', cap: 3,
  ct: 'Bố mẹ bình thường sinh con bệnh ⇒ bệnh do gene <b>LẶN</b>, bố mẹ đều dị hợp.<br>Bệnh xuất hiện ở mọi thế hệ, bố bệnh truyền cho tất cả con gái ⇒ gene trội trên X.<br>Bệnh chủ yếu ở nam, mẹ mang gene ⇒ gene lặn trên X.<br>Bệnh chỉ truyền theo dòng mẹ ⇒ gene ngoài nhân (ti thể).<br>Xác suất tổng hợp = tích xác suất các sự kiện độc lập.',
  khi: 'Bài phả hệ — luôn có trong đề, thường ở phần trả lời ngắn.',
  vd: 'Bố mẹ Aa × Aa, con bình thường ⇒ xác suất con đó là Aa = <b>2/3</b> (đã loại aa).',
  bay: 'Khi đề nói "người bình thường" thì phải LOẠI kiểu gene bệnh rồi mới tính xác suất — mẫu số đổi từ 4 thành 3.' },

{ nhom: 'III. Di truyền quần thể', ten: 'Quần thể tự thụ phấn', cap: 2,
  ct: 'Sau n thế hệ tự thụ, từ 100 % Aa:<br><b>Aa = (1/2)ⁿ</b> &nbsp;·&nbsp; <b>AA = aa = [1 − (1/2)ⁿ]/2</b><br>Tần số allele KHÔNG đổi; chỉ có tỉ lệ kiểu gene thay đổi theo hướng tăng đồng hợp, giảm dị hợp.<br>Quần thể ban đầu có xAA : yAa : zaa thì áp dụng công thức trên cho phần y.',
  khi: 'Bài tự thụ phấn, giao phối gần.',
  vd: 'Aa tự thụ 3 thế hệ ⇒ Aa = 1/8 = <b>12,5 %</b>, AA = aa = 43,75 %.',
  bay: 'Tự thụ phấn KHÔNG làm đổi tần số allele — chỉ đổi cấu trúc kiểu gene. Nhiều bạn nhầm chỗ này.' },

{ nhom: 'III. Di truyền quần thể', ten: 'Hardy – Weinberg cho gene trên X', cap: 3,
  ct: 'Giới XY: tần số kiểu hình = tần số allele (X^A Y và X^a Y ⇒ p và q).<br>Giới XX: p² X^A X^A + 2pq X^A X^a + q² X^a X^a.<br>Tần số allele chung của quần thể: p = (2·p<sub>XX</sub> + p<sub>XY</sub>)/3 khi tỉ lệ giới 1 : 1.<br>Vì vậy bệnh lặn trên X biểu hiện ở nam nhiều hơn nữ rất nhiều khi q nhỏ.',
  khi: 'Bài quần thể có gene trên NST giới tính.',
  vd: 'q = 0,1 ⇒ nam bệnh 10 %, nữ bệnh chỉ q² = <b>1 %</b>.',
  bay: 'Đừng áp p² + 2pq + q² cho giới XY — giới đó chỉ có một allele nên tần số kiểu hình bằng luôn tần số allele.' },

{ nhom: 'V. Sinh thái', ten: 'Tăng trưởng & kích thước quần thể', cap: 2,
  ct: '<b>N<sub>t</sub> = N₀ + B − D + I − E</b> (sinh − tử + nhập cư − xuất cư)<br>Tăng trưởng theo tiềm năng sinh học (đường cong J): dN/dt = rN<br>Tăng trưởng thực tế (đường cong S): dN/dt = rN(K − N)/K, K là sức chứa môi trường.<br>Mật độ = số cá thể / đơn vị diện tích (hoặc thể tích).',
  khi: 'Bài về biến động số lượng cá thể, khai thác hợp lí.',
  vd: 'Khai thác hợp lí nên giữ quần thể ở khoảng <b>N = K/2</b> — nơi tốc độ tăng trưởng lớn nhất.',
  bay: 'Đường cong J chỉ xảy ra khi nguồn sống dồi dào vô hạn — thực tế hầu như luôn là đường cong S.' },

{ nhom: 'V. Sinh thái', ten: 'Hiệu suất sinh thái & tháp sinh thái', cap: 2,
  ct: '<b>Hiệu suất sinh thái</b> = (năng lượng bậc sau / năng lượng bậc trước) × 100 %, trung bình chỉ khoảng <b>10 %</b>.<br>Vì vậy chuỗi thức ăn thường chỉ 4–5 mắt xích.<br>Tháp năng lượng LUÔN có đáy rộng đỉnh hẹp; tháp số lượng và tháp sinh khối có thể bị lộn ngược.<br>Năng lượng đi qua chuỗi theo một chiều, không tuần hoàn; vật chất thì tuần hoàn.',
  khi: 'Bài tính năng lượng qua các bậc dinh dưỡng.',
  vd: 'Sinh vật sản xuất có 10⁶ kcal, hiệu suất 10 % mỗi bậc ⇒ bậc 3 còn <b>10⁴ kcal</b>.',
  bay: 'Chỉ tháp NĂNG LƯỢNG là không bao giờ lộn ngược. Hai loại tháp kia thì có thể.' },

{ nhom: 'V. Sinh thái', ten: 'Chuỗi & lưới thức ăn', cap: 1,
  ct: 'Chuỗi thức ăn khởi đầu bằng sinh vật SẢN XUẤT hoặc bằng mùn bã hữu cơ.<br>Bậc dinh dưỡng cấp 1 = sinh vật sản xuất; cấp 2 = sinh vật tiêu thụ bậc 1…<br>Một loài có thể tham gia nhiều chuỗi ⇒ tạo LƯỚI thức ăn.<br>Lưới càng phức tạp thì hệ sinh thái càng ổn định.',
  khi: 'Câu nhận biết – thông hiểu về hệ sinh thái.',
  vd: 'Cỏ → châu chấu → ếch → rắn: rắn là sinh vật tiêu thụ bậc 3, bậc dinh dưỡng cấp <b>4</b>.',
  bay: 'Bậc dinh dưỡng luôn lớn hơn bậc tiêu thụ đúng 1 đơn vị. Đừng lẫn hai cách đếm.' },

{ nhom: 'VI. Sinh 10–11', ten: 'Tuần hoàn & cân bằng nội môi', cap: 2,
  ct: '<b>Huyết áp</b> giảm dần từ động mạch chủ → mao mạch → tĩnh mạch.<br><b>Vận tốc máu</b> nhỏ nhất ở mao mạch (tổng tiết diện lớn nhất) ⇒ thuận lợi trao đổi chất.<br>Chu kì tim người ≈ 0,8 s (nhĩ co 0,1 · thất co 0,3 · dãn chung 0,4). Nhịp tim = 60/chu kì.<br>Cân bằng nội môi do gan, thận và hệ nội tiết điều hoà; insulin hạ đường huyết, glucagon tăng đường huyết.',
  khi: 'Câu vận dụng về sinh lí người và động vật.',
  vd: 'Chu kì tim 0,8 s ⇒ nhịp tim = 60/0,8 = <b>75 lần/phút</b>.',
  bay: 'Vận tốc máu tỉ lệ NGHỊCH với tổng tiết diện mạch, không phải với tiết diện một mạch riêng lẻ.' },

{ nhom: 'VI. Sinh 10–11', ten: 'Trao đổi nước & dinh dưỡng khoáng ở thực vật', cap: 2,
  ct: 'Nước đi vào rễ theo cơ chế thẩm thấu, vận chuyển trong mạch gỗ nhờ: áp suất rễ + lực hút do thoát hơi nước + lực liên kết giữa các phân tử nước.<br><b>Thoát hơi nước</b> chủ yếu qua khí khổng, là "tai hoạ tất yếu" — vừa mất nước vừa tạo động lực hút.<br>Nguyên tố đa lượng: N, P, K, S, Ca, Mg. Thiếu N ⇒ lá vàng; thiếu Mg ⇒ vàng giữa gân lá.',
  khi: 'Câu về sinh lí thực vật, ứng dụng trong trồng trọt.',
  vd: 'Cây héo vào trưa nắng do tốc độ thoát hơi nước lớn hơn tốc độ hút nước của rễ.',
  bay: 'Khí khổng ĐÓNG khi cây thiếu nước, kéo theo giảm quang hợp — đó là lí do hạn làm giảm năng suất.' }
);
