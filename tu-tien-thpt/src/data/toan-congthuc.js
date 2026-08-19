/* ============================================================
   TOÁN — BÍ KÍP CÔNG THỨC (Kiếm Tông)
   Bám Chương trình GDPT 2018. Có đánh dấu [MỚI] cho nội dung
   chỉ xuất hiện ở chương trình mới.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

TD.KHO.toan_ct = [
/* ============ I. ỨNG DỤNG ĐẠO HÀM & KHẢO SÁT HÀM SỐ ============ */
{ nhom: 'I. Đạo hàm – Khảo sát', ten: 'Bảng đạo hàm cơ bản', cap: 1,
  ct: '(xⁿ)′ = n·xⁿ⁻¹ &nbsp;·&nbsp; (√x)′ = 1/(2√x) &nbsp;·&nbsp; (1/x)′ = −1/x²<br>(sin x)′ = cos x &nbsp;·&nbsp; (cos x)′ = −sin x &nbsp;·&nbsp; (tan x)′ = 1/cos²x<br>(eˣ)′ = eˣ &nbsp;·&nbsp; (aˣ)′ = aˣ·ln a &nbsp;·&nbsp; (ln x)′ = 1/x &nbsp;·&nbsp; (log<sub>a</sub>x)′ = 1/(x·ln a)<br><b>(u·v)′ = u′v + uv′</b> &nbsp;·&nbsp; <b>(u/v)′ = (u′v − uv′)/v²</b> &nbsp;·&nbsp; [f(u)]′ = f′(u)·u′',
  khi: 'Nền tảng cho toàn bộ chương I.',
  vd: 'y = (2x+1)/(x−1) ⇒ y′ = [2(x−1) − (2x+1)]/(x−1)² = <b>−3/(x−1)²</b> &lt; 0 ⇒ nghịch biến.',
  bay: 'Hàm y = (ax+b)/(cx+d) có y′ = (ad − bc)/(cx+d)² — dấu chỉ phụ thuộc <b>ad − bc</b>, không có cực trị.' },

{ nhom: 'I. Đạo hàm – Khảo sát', ten: 'Đơn điệu & cực trị', cap: 2,
  ct: '<b>y′ &gt; 0 trên K ⇒ hàm đồng biến; y′ &lt; 0 ⇒ nghịch biến.</b><br>Điểm cực trị: y′ đổi dấu qua x₀ (y′ = 0 chưa đủ!).<br>Dấu hiệu 2: y′(x₀) = 0 và y″(x₀) &gt; 0 ⇒ <b>cực tiểu</b>; y″(x₀) &lt; 0 ⇒ <b>cực đại</b>.<br><b>Hàm bậc 3</b> y = ax³+bx²+cx+d có 2 cực trị ⇔ y′ = 0 có 2 nghiệm phân biệt ⇔ <b>Δ<sub>y′</sub> &gt; 0</b>.<br><b>Hàm trùng phương</b> y = ax⁴+bx²+c có 3 cực trị ⇔ <b>ab &lt; 0</b>; có 1 cực trị ⇔ ab ≥ 0.',
  khi: 'Câu hỏi về khoảng đơn điệu, số điểm cực trị, tìm m.',
  vd: 'y = x⁴ − 2mx² có 3 cực trị ⇔ 1·(−2m) &lt; 0 ⇔ <b>m &gt; 0</b>.',
  bay: 'y′ = 0 tại x₀ nhưng KHÔNG đổi dấu (VD y = x³ tại x = 0) ⇒ không phải cực trị.' },

{ nhom: 'I. Đạo hàm – Khảo sát', ten: 'GTLN – GTNN', cap: 2,
  ct: '<b>Trên đoạn [a; b]:</b> tính y tại các nghiệm y′ = 0 thuộc (a;b) và tại 2 đầu mút a, b ⇒ so sánh, chọn lớn nhất/nhỏ nhất.<br><b>Trên khoảng:</b> lập bảng biến thiên rồi kết luận.<br>Bất đẳng thức AM–GM: a + b ≥ 2√(ab), dấu "=" khi a = b.',
  khi: 'Bài toán tối ưu thực tế (hộp, bể nước, chi phí) — dạng rất hay ra ở phần trả lời ngắn.',
  vd: 'Tìm max của y = x(6 − x) ⇒ y′ = 6 − 2x = 0 ⇒ x = 3 ⇒ <b>y<sub>max</sub> = 9</b>.',
  bay: 'Với bài thực tế phải kiểm tra <b>điều kiện của biến</b> (độ dài &gt; 0…) trước khi kết luận.' },

{ nhom: 'I. Đạo hàm – Khảo sát', ten: 'Tiệm cận (có tiệm cận xiên) [MỚI]', cap: 3, moi: true,
  ct: '<b>Tiệm cận đứng:</b> x = x₀ nếu lim<sub>x→x₀</sub> y = ±∞ (mẫu = 0 mà tử ≠ 0).<br><b>Tiệm cận ngang:</b> y = y₀ nếu lim<sub>x→±∞</sub> y = y₀.<br><b>Tiệm cận xiên y = ax + b</b> [MỚI — CT 2018]:<br>&nbsp;&nbsp;a = lim<sub>x→∞</sub> y/x &nbsp;;&nbsp; b = lim<sub>x→∞</sub> (y − ax)<br>&nbsp;&nbsp;Hoặc <b>chia đa thức</b>: y = (ax²+bx+c)/(dx+e) = (mx + n) + k/(dx+e) ⇒ TCX là y = mx + n.',
  khi: 'Hàm phân thức bậc hai trên bậc nhất — dạng MỚI của chương trình 2018.',
  vd: 'y = (x² + x + 1)/(x − 1) = x + 2 + 3/(x−1) ⇒ TCĐ x = 1, <b>TCX y = x + 2</b>.',
  bay: 'Hàm chỉ có TCX khi bậc tử <b>lớn hơn bậc mẫu đúng 1 đơn vị</b>. Có TCX thì KHÔNG có tiệm cận ngang.' },

{ nhom: 'I. Đạo hàm – Khảo sát', ten: 'Tương giao & tiếp tuyến', cap: 3,
  ct: 'Số giao điểm của y = f(x) và y = g(x) = số nghiệm của f(x) = g(x).<br><b>Tiếp tuyến tại M(x₀; y₀):</b> y = f′(x₀)(x − x₀) + y₀<br>Hai đồ thị tiếp xúc ⇔ hệ { f(x) = g(x) ; f′(x) = g′(x) } có nghiệm.',
  khi: 'Bài tìm m để đường thẳng cắt đồ thị tại 3 điểm phân biệt…',
  vd: 'Tiếp tuyến của y = x³ tại x₀ = 1: y′(1) = 3, y(1) = 1 ⇒ <b>y = 3x − 2</b>.',
  bay: '"Tiếp tuyến đi qua điểm A" khác "tiếp tuyến tại điểm A" — phải gọi tiếp điểm rồi giải.' },

/* ============ II. MŨ – LOGARIT ============ */
{ nhom: 'II. Mũ – Logarit', ten: 'Công thức mũ – logarit', cap: 2,
  ct: 'aᵐ·aⁿ = aᵐ⁺ⁿ · aᵐ/aⁿ = aᵐ⁻ⁿ · (aᵐ)ⁿ = aᵐⁿ · a^(m/n) = ⁿ√(aᵐ)<br><b>log<sub>a</sub>(xy) = log<sub>a</sub>x + log<sub>a</sub>y</b> · log<sub>a</sub>(x/y) = log<sub>a</sub>x − log<sub>a</sub>y<br><b>log<sub>a</sub>xⁿ = n·log<sub>a</sub>x</b> · log<sub>aⁿ</sub>x = (1/n)log<sub>a</sub>x<br><b>Đổi cơ số: log<sub>a</sub>b = log<sub>c</sub>b / log<sub>c</sub>a = 1/log<sub>b</sub>a</b><br>a^(log<sub>a</sub>b) = b · log<sub>a</sub>(aˣ) = x',
  khi: 'Rút gọn biểu thức, giải phương trình mũ – logarit.',
  vd: 'log₂40 − log₂5 = log₂8 = <b>3</b>.',
  bay: 'Điều kiện: cơ số a &gt; 0, a ≠ 1; biểu thức dưới log phải &gt; 0. Quên điều kiện là mất điểm.' },

{ nhom: 'II. Mũ – Logarit', ten: 'Phương trình & bất phương trình mũ – log', cap: 3,
  ct: 'a^f(x) = a^g(x) ⇔ f(x) = g(x) &nbsp;(0 &lt; a ≠ 1)<br>log<sub>a</sub>f(x) = log<sub>a</sub>g(x) ⇔ f(x) = g(x) &gt; 0<br><b>Bất phương trình:</b> nếu <b>a &gt; 1</b> giữ nguyên chiều; nếu <b>0 &lt; a &lt; 1</b> thì <b>ĐỔI CHIỀU</b>.<br>Lãi kép: <b>A = P(1 + r)ⁿ</b> · Tăng trưởng liên tục: A = P·e^(rt)',
  khi: 'Giải phương trình, bài toán lãi suất / tăng trưởng dân số / phóng xạ.',
  vd: 'Gửi 100 triệu, lãi 6%/năm, sau 5 năm: A = 100·(1,06)⁵ ≈ <b>133,82 triệu</b>.',
  bay: 'Cơ số nhỏ hơn 1 mà quên đổi chiều bất phương trình — lỗi kinh điển.' },

/* ============ III. NGUYÊN HÀM – TÍCH PHÂN ============ */
{ nhom: 'III. Nguyên hàm – Tích phân', ten: 'Bảng nguyên hàm', cap: 2,
  ct: '∫xⁿdx = xⁿ⁺¹/(n+1) + C (n ≠ −1) &nbsp;·&nbsp; <b>∫(1/x)dx = ln|x| + C</b><br>∫eˣdx = eˣ + C &nbsp;·&nbsp; ∫aˣdx = aˣ/ln a + C<br>∫sin x dx = −cos x + C &nbsp;·&nbsp; ∫cos x dx = sin x + C<br>∫(1/cos²x)dx = tan x + C &nbsp;·&nbsp; ∫(1/sin²x)dx = −cot x + C<br><b>Mở rộng:</b> ∫f(ax+b)dx = (1/a)·F(ax+b) + C',
  khi: 'Nền tảng của cả chương.',
  vd: '∫(2x+1)⁵dx = (1/2)·(2x+1)⁶/6 + C = <b>(2x+1)⁶/12 + C</b>.',
  bay: 'Nhớ nhân hệ số <b>1/a</b> khi biến trong ngoặc là ax + b. Quên là sai toàn bộ.' },

{ nhom: 'III. Nguyên hàm – Tích phân', ten: 'Tích phân & tính chất', cap: 2,
  ct: '<b>Newton–Leibniz: ∫<sub>a</sub><sup>b</sup>f(x)dx = F(b) − F(a)</b><br>∫<sub>a</sub><sup>b</sup> = −∫<sub>b</sub><sup>a</sup> &nbsp;·&nbsp; ∫<sub>a</sub><sup>b</sup> = ∫<sub>a</sub><sup>c</sup> + ∫<sub>c</sub><sup>b</sup><br>∫<sub>a</sub><sup>b</sup>[f ± g] = ∫f ± ∫g &nbsp;·&nbsp; ∫<sub>a</sub><sup>b</sup>k·f = k∫<sub>a</sub><sup>b</sup>f<br><b>Hàm lẻ trên [−a; a]: ∫ = 0</b> · Hàm chẵn: ∫<sub>−a</sub><sup>a</sup> = 2∫<sub>0</sub><sup>a</sup>',
  khi: 'Mọi bài tích phân.',
  vd: '∫<sub>−1</sub><sup>1</sup>x³dx = <b>0</b> (hàm lẻ) — không cần tính.',
  bay: 'Mẹo hàm chẵn/lẻ tiết kiệm rất nhiều thời gian ở câu trả lời ngắn.' },

{ nhom: 'III. Nguyên hàm – Tích phân', ten: 'Đổi biến & từng phần', cap: 3,
  ct: '<b>Đổi biến:</b> đặt t = u(x) ⇒ dt = u′(x)dx, <b>đổi luôn cận</b>.<br><b>Từng phần: ∫u dv = uv − ∫v du</b><br>Thứ tự ưu tiên chọn u: <b>"Nhất log, nhì đa, tam lượng, tứ mũ"</b><br>&nbsp;&nbsp;(logarit → đa thức → lượng giác → hàm mũ)',
  khi: 'Tích phân có tích 2 loại hàm khác nhau.',
  vd: '∫x·eˣdx: u = x, dv = eˣdx ⇒ = x·eˣ − ∫eˣdx = <b>eˣ(x − 1) + C</b>.',
  bay: 'Đổi biến mà quên đổi cận là lỗi phổ biến nhất. Đổi biến rồi thì không được trả về x nữa.' },

{ nhom: 'III. Nguyên hàm – Tích phân', ten: 'Ứng dụng hình học của tích phân', cap: 3,
  ct: '<b>Diện tích dưới đường cong:</b> S = ∫<sub>a</sub><sup>b</sup>|f(x)|dx<br><b>Diện tích giữa 2 đường:</b> <b>S = ∫<sub>a</sub><sup>b</sup>|f(x) − g(x)|dx</b> (a, b là hoành độ giao điểm)<br><b>Thể tích tròn xoay quanh Ox:</b> <b>V = π∫<sub>a</sub><sup>b</sup>f²(x)dx</b><br><b>Thể tích vật thể biết thiết diện S(x):</b> V = ∫<sub>a</sub><sup>b</sup>S(x)dx',
  khi: 'Câu vận dụng: tính diện tích mảnh đất, thể tích bồn chứa, chi tiết máy.',
  vd: 'S giữa y = x² và y = x: giao tại 0 và 1 ⇒ S = ∫₀¹(x − x²)dx = 1/2 − 1/3 = <b>1/6</b>.',
  bay: 'Phải lấy <b>trị tuyệt đối</b> hoặc chia khoảng theo dấu. Thể tích thì bình phương nên không cần trị tuyệt đối.' },

/* ============ IV. HÌNH HỌC OXYZ ============ */
{ nhom: 'IV. Oxyz', ten: 'Vectơ trong không gian', cap: 2,
  ct: 'AB⃗ = (x<sub>B</sub>−x<sub>A</sub>; y<sub>B</sub>−y<sub>A</sub>; z<sub>B</sub>−z<sub>A</sub>) · |AB⃗| = √(Δx² + Δy² + Δz²)<br><b>Tích vô hướng:</b> u⃗·v⃗ = x₁x₂ + y₁y₂ + z₁z₂ = |u⃗||v⃗|cos(u⃗,v⃗)<br>&nbsp;&nbsp;u⃗ ⊥ v⃗ ⇔ u⃗·v⃗ = 0<br><b>Tích có hướng:</b> [u⃗, v⃗] = (y₁z₂−y₂z₁ ; z₁x₂−z₂x₁ ; x₁y₂−x₂y₁)<br>&nbsp;&nbsp;[u⃗,v⃗] ⊥ cả u⃗ và v⃗; u⃗ ∥ v⃗ ⇔ [u⃗,v⃗] = 0⃗<br>S<sub>ΔABC</sub> = ½|[AB⃗, AC⃗]| · V<sub>tứ diện</sub> = (1/6)|[AB⃗,AC⃗]·AD⃗|',
  khi: 'Nền tảng của toàn chương Oxyz.',
  vd: 'Trung điểm AB: M((x<sub>A</sub>+x<sub>B</sub>)/2; …). Trọng tâm ΔABC: G((x<sub>A</sub>+x<sub>B</sub>+x<sub>C</sub>)/3; …).',
  bay: 'Tích vô hướng cho SỐ, tích có hướng cho VECTƠ. Đừng nhầm.' },

{ nhom: 'IV. Oxyz', ten: 'Phương trình mặt phẳng', cap: 3,
  ct: '<b>(P): A(x−x₀) + B(y−y₀) + C(z−z₀) = 0 ⇔ Ax + By + Cz + D = 0</b><br>Vectơ pháp tuyến n⃗ = (A; B; C).<br>Mặt phẳng qua 3 điểm A, B, C: n⃗ = <b>[AB⃗, AC⃗]</b><br><b>Khoảng cách từ M(x₀;y₀;z₀) đến (P):</b><br>&nbsp;&nbsp;<b>d = |Ax₀+By₀+Cz₀+D| / √(A²+B²+C²)</b><br>Góc giữa 2 mặt phẳng: cos φ = |n⃗₁·n⃗₂|/(|n⃗₁||n⃗₂|)',
  khi: 'Bài viết phương trình mặt phẳng, tính khoảng cách.',
  vd: 'd từ O(0;0;0) đến (P): x + 2y + 2z − 6 = 0 là |−6|/√9 = <b>2</b>.',
  bay: 'Hai mặt phẳng song song ⇔ n⃗ cùng phương và D khác nhau. Nhớ lấy trị tuyệt đối ở tử công thức khoảng cách.' },

{ nhom: 'IV. Oxyz', ten: 'Phương trình đường thẳng & mặt cầu', cap: 3,
  ct: '<b>Đường thẳng</b> qua M(x₀;y₀;z₀), vectơ chỉ phương u⃗=(a;b;c):<br>&nbsp;&nbsp;Tham số: x = x₀+at, y = y₀+bt, z = z₀+ct<br>&nbsp;&nbsp;Chính tắc: (x−x₀)/a = (y−y₀)/b = (z−z₀)/c &nbsp;(abc ≠ 0)<br><b>Mặt cầu:</b> (x−a)² + (y−b)² + (z−c)² = R², tâm I(a;b;c)<br>&nbsp;&nbsp;Dạng khai triển: x²+y²+z²−2ax−2by−2cz+d = 0, <b>R = √(a²+b²+c²−d)</b><br>(P) tiếp xúc mặt cầu ⇔ <b>d(I, (P)) = R</b>; cắt ⇔ d &lt; R; bán kính đường tròn giao tuyến r = √(R² − d²)',
  khi: 'Câu vận dụng cao Oxyz.',
  vd: 'Mặt cầu tâm I(1;2;3) tiếp xúc mp Oxy ⇒ R = d(I, Oxy) = |z<sub>I</sub>| = <b>3</b>.',
  bay: 'Điều kiện tồn tại mặt cầu: a²+b²+c²−d &gt; 0.' },

/* ============ V. THỐNG KÊ & XÁC SUẤT [MỚI NHIỀU] ============ */
{ nhom: 'V. Thống kê', ten: 'Mẫu số liệu ghép nhóm [MỚI]', cap: 3, moi: true,
  ct: '<b>Số trung bình:</b> x̄ = Σ(nᵢ·cᵢ)/n &nbsp;(cᵢ = giá trị đại diện = trung điểm nhóm)<br><b>Khoảng biến thiên:</b> R = đầu mút phải nhóm cuối − đầu mút trái nhóm đầu<br><b>Tứ phân vị Q<sub>k</sub></b> = u<sub>m</sub> + [(k·n/4 − C)/n<sub>m</sub>]·(u<sub>m+1</sub> − u<sub>m</sub>)<br>&nbsp;&nbsp;(u<sub>m</sub>: đầu mút trái nhóm chứa Q<sub>k</sub>; C: tần số tích luỹ trước nhóm đó; n<sub>m</sub>: tần số nhóm đó)<br><b>Khoảng tứ phân vị: Δ<sub>Q</sub> = Q₃ − Q₁</b><br><b>Phương sai: S² = Σnᵢ(cᵢ − x̄)²/n = Σ(nᵢcᵢ²)/n − x̄²</b> &nbsp;·&nbsp; Độ lệch chuẩn S = √(S²)',
  khi: 'Chắc chắn có trong đề — chương hoàn toàn mới của CT 2018.',
  vd: 'Q₂ chính là <b>trung vị</b>. Khoảng tứ phân vị đo độ phân tán, ít bị ảnh hưởng bởi giá trị bất thường.',
  bay: 'Với mẫu ghép nhóm, mọi số liệu đều tính qua <b>giá trị đại diện</b> (trung điểm nhóm) — không dùng số liệu gốc.' },

{ nhom: 'V. Xác suất', ten: 'Xác suất có điều kiện & Bayes [MỚI]', cap: 4, moi: true,
  ct: '<b>P(A|B) = P(A∩B)/P(B)</b> &nbsp;(P(B) &gt; 0)<br><b>Công thức nhân: P(A∩B) = P(B)·P(A|B) = P(A)·P(B|A)</b><br>A, B <b>độc lập</b> ⇔ P(A|B) = P(A) ⇔ P(A∩B) = P(A)·P(B)<br><b>Xác suất toàn phần:</b> P(B) = P(A)·P(B|A) + P(Ā)·P(B|Ā)<br><b>Bayes: P(A|B) = P(A)·P(B|A) / P(B)</b>',
  khi: 'Chương mới, rất hay ra ở câu đúng/sai và trả lời ngắn.',
  vd: 'Hộp 1 có 3 đỏ/2 xanh, hộp 2 có 1 đỏ/4 xanh. Chọn ngẫu nhiên 1 hộp rồi lấy 1 bi. P(đỏ) = ½·3/5 + ½·1/5 = <b>2/5</b>.',
  bay: 'Vẽ <b>sơ đồ hình cây</b> là cách an toàn nhất. P(A|B) và P(B|A) hoàn toàn khác nhau — đừng đảo.' },

{ nhom: 'V. Xác suất', ten: 'Tổ hợp – xác suất cổ điển', cap: 2,
  ct: '<b>Hoán vị:</b> P<sub>n</sub> = n! &nbsp;·&nbsp; <b>Chỉnh hợp:</b> A<sup>k</sup><sub>n</sub> = n!/(n−k)! &nbsp;·&nbsp; <b>Tổ hợp:</b> C<sup>k</sup><sub>n</sub> = n!/[k!(n−k)!]<br><b>P(A) = n(A)/n(Ω)</b> &nbsp;·&nbsp; P(Ā) = 1 − P(A)<br>P(A∪B) = P(A) + P(B) − P(A∩B)<br>Nhị thức Newton: (a+b)ⁿ = Σ C<sup>k</sup><sub>n</sub>·a<sup>n−k</sup>·b<sup>k</sup>',
  khi: 'Bài đếm, chọn người, xếp chỗ.',
  vd: 'Chọn 3 trong 10 người: C³₁₀ = <b>120</b> cách (không phân biệt thứ tự).',
  bay: 'Có thứ tự ⇒ chỉnh hợp A; không thứ tự ⇒ tổ hợp C. Bài "ít nhất/nhiều nhất" nên dùng <b>biến cố đối</b>.' },

/* ============ VI. HÌNH KHÔNG GIAN ============ */
{ nhom: 'VI. Hình không gian', ten: 'Thể tích khối đa diện', cap: 3,
  ct: '<b>V<sub>chóp</sub> = (1/3)·S<sub>đáy</sub>·h</b> &nbsp;·&nbsp; <b>V<sub>lăng trụ</sub> = S<sub>đáy</sub>·h</b><br>V<sub>hộp chữ nhật</sub> = abc · V<sub>lập phương</sub> = a³<br><b>Tỉ số thể tích (chóp tam giác S.ABC):</b><br>&nbsp;&nbsp;V<sub>S.A′B′C′</sub>/V<sub>S.ABC</sub> = (SA′/SA)·(SB′/SB)·(SC′/SC)<br>Tam giác đều cạnh a: S = a²√3/4, đường cao a√3/2',
  khi: 'Câu vận dụng hình học không gian.',
  vd: 'Chóp có đáy vuông cạnh a, chiều cao a: V = (1/3)·a²·a = <b>a³/3</b>.',
  bay: 'Công thức tỉ số thể tích CHỈ áp dụng cho khối chóp <b>tam giác</b>. Chóp tứ giác phải chia thành 2 chóp tam giác.' },

{ nhom: 'VI. Hình không gian', ten: 'Khối tròn xoay', cap: 2,
  ct: '<b>Trụ:</b> S<sub>xq</sub> = 2πrh · S<sub>tp</sub> = 2πrh + 2πr² · <b>V = πr²h</b><br><b>Nón:</b> S<sub>xq</sub> = πrl · S<sub>tp</sub> = πrl + πr² · <b>V = (1/3)πr²h</b> · l² = r² + h²<br><b>Cầu:</b> <b>S = 4πR²</b> · <b>V = (4/3)πR³</b>',
  khi: 'Câu tính thể tích, diện tích vật thể tròn xoay.',
  vd: 'Nón r = 3, h = 4 ⇒ l = 5, S<sub>xq</sub> = π·3·5 = <b>15π</b>, V = (1/3)π·9·4 = <b>12π</b>.',
  bay: 'l (đường sinh) khác h (chiều cao). S<sub>xq</sub> nón dùng l, còn V dùng h.' },

{ nhom: 'VI. Hình không gian', ten: 'Góc & khoảng cách', cap: 4,
  ct: '<b>Góc giữa đường thẳng và mặt phẳng</b> = góc giữa đường thẳng và <b>hình chiếu</b> của nó trên mặt phẳng (0° ≤ φ ≤ 90°).<br><b>Góc nhị diện</b> = góc giữa 2 nửa mặt phẳng, đo bằng góc phẳng nhị diện.<br><b>Khoảng cách từ điểm đến mặt phẳng:</b> dựng hình chiếu vuông góc, hoặc dùng <b>công thức thể tích d = 3V/S<sub>đáy</sub></b>.<br>Khoảng cách 2 đường chéo nhau: dựng đoạn vuông góc chung, hoặc d(a,b) = d(a, (P)) với (P) ⊃ b và (P) ∥ a.',
  khi: 'Câu VDC hình không gian.',
  vd: 'd(A, (SBC)) = 3·V<sub>S.ABC</sub>/S<sub>ΔSBC</sub> — kỹ thuật "đổi đỉnh" rất mạnh.',
  bay: 'Mẹo <b>d = 3V/S</b> giải được đa số bài khoảng cách khó mà không cần dựng hình. Hoặc gắn hệ trục Oxyz nếu hình có góc vuông.' },

/* ============ VII. CẤP SỐ & DÃY SỐ ============ */
{ nhom: 'VII. Dãy số', ten: 'Cấp số cộng – cấp số nhân', cap: 2,
  ct: '<b>Cấp số cộng</b> (công sai d): u<sub>n</sub> = u₁ + (n−1)d · <b>S<sub>n</sub> = n(u₁+u<sub>n</sub>)/2 = n[2u₁+(n−1)d]/2</b><br>&nbsp;&nbsp;3 số liên tiếp: 2b = a + c<br><b>Cấp số nhân</b> (công bội q): u<sub>n</sub> = u₁·q<sup>n−1</sup> · <b>S<sub>n</sub> = u₁(1−qⁿ)/(1−q)</b> (q ≠ 1)<br>&nbsp;&nbsp;3 số liên tiếp: b² = a·c<br>&nbsp;&nbsp;Tổng vô hạn (|q| &lt; 1): <b>S = u₁/(1−q)</b>',
  khi: 'Bài toán lãi suất, dãy số, mô hình tăng trưởng.',
  vd: 'CSN u₁ = 2, q = 3: u₅ = 2·3⁴ = <b>162</b>; S₅ = 2(1−243)/(1−3) = <b>242</b>.',
  bay: 'Công thức S<sub>n</sub> của CSN chỉ dùng khi q ≠ 1. Nếu q = 1 thì S<sub>n</sub> = n·u₁.' }
];
