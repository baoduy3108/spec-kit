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

TD.KHO.toan_ct.push(
{ nhom: 'I. Đạo hàm – Khảo sát', ten: 'Đạo hàm hàm hợp & bảng mở rộng', cap: 2,
  ct: '<b>[f(u)]′ = f′(u)·u′</b> — quy tắc dây chuyền, gốc của mọi bài đạo hàm phức tạp.<br>' +
      '(uⁿ)′ = n·uⁿ⁻¹·u′ &nbsp;·&nbsp; (√u)′ = u′/(2√u) &nbsp;·&nbsp; (1/u)′ = −u′/u²<br>' +
      '(e^u)′ = u′·e^u &nbsp;·&nbsp; (a^u)′ = u′·a^u·ln a &nbsp;·&nbsp; <b>(ln u)′ = u′/u</b><br>' +
      '(sin u)′ = u′·cos u &nbsp;·&nbsp; (cos u)′ = −u′·sin u &nbsp;·&nbsp; (tan u)′ = u′/cos²u<br>' +
      '<b>Đạo hàm cấp hai:</b> y″ = (y′)′ — dùng để xét cực trị và điểm uốn.',
  khi: 'Mọi bài có hàm lồng trong hàm.',
  vd: 'y = ln(x² + 1) ⇒ y′ = (x² + 1)′/(x² + 1) = <b>2x/(x² + 1)</b>.',
  bay: 'Quên nhân u′ là lỗi phổ biến nhất. Luôn tự hỏi "bên trong là gì?" trước khi đạo hàm.' },

{ nhom: 'I. Đạo hàm – Khảo sát', ten: 'Điểm uốn & tính lồi lõm', cap: 3,
  ct: '<b>y″ > 0</b> trên khoảng K ⇒ đồ thị <b>lõm</b> (quay bề lõm lên trên) trên K.<br>' +
      '<b>y″ < 0</b> ⇒ đồ thị <b>lồi</b>.<br>' +
      '<b>Điểm uốn:</b> điểm mà y″ đổi dấu khi đi qua.<br>' +
      'Hàm bậc ba y = ax³+bx²+cx+d luôn có <b>đúng một điểm uốn</b> tại x = −b/(3a), và điểm uốn chính là <b>tâm đối xứng</b> của đồ thị.',
  khi: 'Câu hỏi về dạng đồ thị, tâm đối xứng, hoặc dùng dấu hiệu 2 để xét cực trị.',
  vd: 'y = x³ − 3x² + 2 ⇒ y″ = 6x − 6 = 0 ⇒ x = 1 là điểm uốn và là tâm đối xứng.',
  bay: 'y″(x₀) = 0 chưa đủ để x₀ là điểm uốn — y″ phải ĐỔI DẤU qua x₀.' },

{ nhom: 'I. Đạo hàm – Khảo sát', ten: 'Nhận dạng đồ thị hàm số', cap: 2,
  ct: '<table class="kq small"><tr><th>Đồ thị</th><th>Dấu hiệu nhận biết</th></tr>' +
      '<tr><td>Bậc ba</td><td>Hai "khúc uốn"; a > 0 thì nhánh phải đi lên; có 2 hoặc 0 cực trị</td></tr>' +
      '<tr><td>Trùng phương</td><td><b>Đối xứng qua trục tung</b>; hình chữ W (a>0, 3 cực trị) hoặc chữ U (1 cực trị)</td></tr>' +
      '<tr><td>Phân thức bậc nhất/bậc nhất</td><td>Hai nhánh hypebol, có TCĐ và TCN, <b>không có cực trị</b></td></tr>' +
      '<tr><td>Phân thức bậc hai/bậc nhất</td><td>Có TCĐ và <b>TCX</b>; có thể có 2 cực trị</td></tr></table>' +
      '<b>Đọc hệ số từ đồ thị:</b> giao với Oy cho d (hoặc c); nhánh cuối bên phải đi lên ⇒ a > 0.',
  khi: 'Câu cho hình vẽ đồ thị rồi hỏi dấu các hệ số hoặc số nghiệm phương trình.',
  vd: 'Đồ thị đối xứng qua trục tung ⇒ hàm chẵn ⇒ chỉ chứa luỹ thừa bậc chẵn ⇒ hàm trùng phương.',
  bay: 'Số nghiệm của f(x) = m chính là số giao điểm của đồ thị với đường thẳng NGANG y = m.' },

{ nhom: 'II. Mũ – Logarit', ten: 'Bài toán thực tế mũ – logarit', cap: 3,
  ct: '<b>Lãi kép:</b> A = P(1 + r)ⁿ &nbsp;·&nbsp; <b>Lãi đơn:</b> A = P(1 + rn)<br>' +
      '<b>Tăng trưởng/phân rã liên tục:</b> A = P·e^(rt)<br>' +
      '<b>Vay trả góp</b> (trả đều mỗi kì số tiền m): m = P·r(1+r)ⁿ / [(1+r)ⁿ − 1]<br>' +
      '<b>Tìm số kì n:</b> lấy logarit hai vế — n = log<sub>(1+r)</sub>(A/P) = ln(A/P)/ln(1+r)<br>' +
      '<b>Thang đo logarit:</b> pH = −log[H⁺] · độ Richter · decibel L = 10·log(I/I₀)',
  khi: 'Câu vận dụng thực tế — dạng ra rất đều ở phần trả lời ngắn.',
  vd: 'Gửi 100 triệu lãi 6%/năm, sau bao lâu được 200 triệu? n = ln2/ln(1,06) ≈ <b>11,9 năm</b> ⇒ 12 năm.',
  bay: 'Đề hỏi "sau ít nhất bao nhiêu năm" thì phải làm tròn LÊN, không làm tròn thông thường.' },

{ nhom: 'III. Nguyên hàm – Tích phân', ten: 'Bảng nguyên hàm mở rộng', cap: 3,
  ct: '∫(1/(ax+b))dx = (1/a)·ln|ax+b| + C<br>' +
      '∫e^(ax+b)dx = (1/a)·e^(ax+b) + C<br>' +
      '∫sin(ax+b)dx = −(1/a)·cos(ax+b) + C &nbsp;·&nbsp; ∫cos(ax+b)dx = (1/a)·sin(ax+b) + C<br>' +
      '∫tan x dx = −ln|cos x| + C &nbsp;·&nbsp; ∫cot x dx = ln|sin x| + C<br>' +
      '<b>Hạ bậc:</b> sin²x = (1 − cos2x)/2 ; cos²x = (1 + cos2x)/2 — dùng khi gặp sin²x, cos²x.',
  khi: 'Tích phân có hàm lượng giác hoặc hàm hợp bậc nhất.',
  vd: '∫₀^(π/2) sin²x dx = ∫₀^(π/2)(1 − cos2x)/2 dx = <b>π/4</b>.',
  bay: 'Luôn nhớ hệ số 1/a khi biến bên trong là ax + b. Với sin²/cos² phải hạ bậc trước, không tích phân trực tiếp.' },

{ nhom: 'III. Nguyên hàm – Tích phân', ten: 'Tích phân hàm cho bởi đồ thị / bảng', cap: 4,
  ct: '<b>Tích phân = diện tích đại số</b> dưới đồ thị: phần trên trục hoành tính dương, phần dưới tính âm.<br>' +
      '⇒ Nhìn đồ thị, chia thành các hình tam giác/hình thang/nửa đường tròn quen thuộc rồi cộng đại số.<br>' +
      '<b>Diện tích hình phẳng</b> thì ngược lại: mọi phần đều tính DƯƠNG (lấy trị tuyệt đối).<br>' +
      'Nếu đề cho f′(x) và biết f(a), thì <b>f(b) = f(a) + ∫<sub>a</sub><sup>b</sup>f′(x)dx</b>.',
  khi: 'Câu cho đồ thị của f hoặc f′ rồi hỏi giá trị tích phân hoặc so sánh f tại các điểm.',
  vd: 'Đồ thị f′ nằm trên trục hoành trên (a;b) ⇒ f tăng trên (a;b) ⇒ f(b) > f(a).',
  bay: 'Phân biệt rõ TÍCH PHÂN (có dấu) và DIỆN TÍCH (luôn dương) — đây là bẫy chính của dạng này.' },

{ nhom: 'IV. Oxyz', ten: 'Vị trí tương đối trong Oxyz', cap: 3,
  ct: '<b>Hai mặt phẳng:</b> song song ⇔ n⃗₁ ∥ n⃗₂ và D₁ ≠ D₂ · trùng ⇔ n⃗₁ ∥ n⃗₂ và D₁ = D₂ · vuông góc ⇔ n⃗₁·n⃗₂ = 0<br>' +
      '<b>Đường thẳng và mặt phẳng:</b> d ∥ (P) ⇔ u⃗·n⃗ = 0 và M ∉ (P) · d ⊥ (P) ⇔ u⃗ ∥ n⃗<br>' +
      '<b>Đường thẳng và mặt cầu:</b> so d(I, d) với R<br>' +
      '<b>Hai đường thẳng:</b> chéo nhau ⇔ [u⃗₁, u⃗₂]·M₁M₂⃗ ≠ 0<br>' +
      '<b>Góc:</b> giữa hai đường thẳng cos φ = |u⃗₁·u⃗₂|/(|u⃗₁||u⃗₂|) · giữa đường thẳng và mặt phẳng <b>sin</b> φ = |u⃗·n⃗|/(|u⃗||n⃗|)',
  khi: 'Câu xét vị trí tương đối, tính góc.',
  vd: 'Góc giữa đường thẳng và mặt phẳng dùng SIN chứ không dùng COS — đây là điểm khác biệt bắt buộc nhớ.',
  bay: 'Mọi công thức góc đều lấy TRỊ TUYỆT ĐỐI ở tử để góc nằm trong [0°; 90°].' },

{ nhom: 'IV. Oxyz', ten: 'Hình chiếu & điểm đối xứng', cap: 4,
  ct: '<b>Hình chiếu H của M lên mặt phẳng (P):</b> viết đường thẳng qua M, vuông góc (P) (nhận n⃗ làm vectơ chỉ phương), rồi tìm giao với (P).<br>' +
      '<b>Điểm M′ đối xứng M qua (P):</b> H là trung điểm MM′ ⇒ M′ = 2H − M.<br>' +
      '<b>Hình chiếu lên các mặt phẳng toạ độ:</b> M(a;b;c) → (Oxy): (a;b;0) · (Oyz): (0;b;c) · (Oxz): (a;0;c)<br>' +
      '<b>Đối xứng qua trục Ox:</b> (a;−b;−c) · <b>qua gốc O:</b> (−a;−b;−c)',
  khi: 'Câu vận dụng cao Oxyz về khoảng cách, cực trị hình học.',
  vd: 'd(M, (Oxy)) = |z<sub>M</sub>| — dùng rất nhiều khi xét mặt cầu tiếp xúc mặt phẳng toạ độ.',
  bay: 'Nhớ M′ = 2H − M chứ không phải H − M.' },

{ nhom: 'V. Thống kê', ten: 'Trung vị, mốt & tứ phân vị mẫu ghép nhóm [MỚI]', cap: 3, moi: true,
  ct: '<b>Trung vị M<sub>e</sub> = Q₂</b>, tính theo công thức tứ phân vị với k = 2.<br>' +
      '<b>Q<sub>k</sub> = u<sub>m</sub> + [(k·n/4 − C)/n<sub>m</sub>]·(u<sub>m+1</sub> − u<sub>m</sub>)</b><br>' +
      '&nbsp;&nbsp;• u<sub>m</sub>: đầu mút trái nhóm chứa Q<sub>k</sub> · n<sub>m</sub>: tần số nhóm đó<br>' +
      '&nbsp;&nbsp;• C: tần số tích luỹ của các nhóm ĐỨNG TRƯỚC nhóm đó<br>' +
      '<b>Mốt M₀</b> nằm ở nhóm có tần số lớn nhất:<br>' +
      '&nbsp;&nbsp;M₀ = u<sub>m</sub> + [(n<sub>m</sub> − n<sub>m−1</sub>)/((n<sub>m</sub>−n<sub>m−1</sub>)+(n<sub>m</sub>−n<sub>m+1</sub>))]·(u<sub>m+1</sub> − u<sub>m</sub>)',
  khi: 'Câu thống kê mẫu ghép nhóm — nội dung mới, ra rất đều.',
  vd: 'Tìm nhóm chứa Q₁: cộng dồn tần số tới khi vượt n/4.',
  bay: 'C là tần số tích luỹ của các nhóm TRƯỚC nhóm chứa Q, không bao gồm chính nhóm đó.' },

{ nhom: 'V. Xác suất', ten: 'Biến ngẫu nhiên rời rạc [MỚI]', cap: 3, moi: true,
  ct: '<b>Bảng phân bố xác suất:</b> liệt kê các giá trị x₁, x₂,… kèm xác suất p₁, p₂,… với <b>Σpᵢ = 1</b>.<br>' +
      '<b>Kỳ vọng:</b> E(X) = Σ xᵢ·pᵢ — giá trị trung bình mà X nhận được về lâu dài.<br>' +
      '<b>Phương sai:</b> V(X) = Σ xᵢ²·pᵢ − [E(X)]²<br>' +
      '<b>Độ lệch chuẩn:</b> σ(X) = √(V(X))',
  khi: 'Câu về trò chơi may rủi, bảo hiểm, đầu tư — dạng thực tế mới.',
  vd: 'Tung một con xúc xắc cân đối: E(X) = (1+2+3+4+5+6)/6 = <b>3,5</b>.',
  bay: 'Luôn kiểm tra Σpᵢ = 1 trước khi tính. Công thức phương sai là "trung bình của bình phương trừ bình phương của trung bình".' },

{ nhom: 'VI. Hình không gian', ten: 'Mặt cầu ngoại tiếp khối đa diện', cap: 4, cd: 'Hình không gian',
  ct: '<b>Hình hộp chữ nhật a×b×c:</b> R = ½√(a² + b² + c²)<br>' +
      '<b>Chóp có cạnh bên vuông góc đáy (SA ⊥ đáy):</b> R = ½√(R<sub>đ</sub>² ·4 + SA²) với R<sub>đ</sub> là bán kính đường tròn ngoại tiếp đáy.<br>' +
      '&nbsp;&nbsp;Viết gọn: <b>R = √(R<sub>đ</sub>² + SA²/4)</b><br>' +
      '<b>Chóp đều:</b> R = (cạnh bên)²/(2·chiều cao)<br>' +
      '<b>Tam giác vuông:</b> R<sub>đ</sub> = ½·cạnh huyền · <b>Tam giác đều cạnh a:</b> R<sub>đ</sub> = a/√3',
  khi: 'Câu vận dụng cao về khối tròn xoay ngoại tiếp.',
  vd: 'Hình lập phương cạnh a: R = ½·a√3 ⇒ V mặt cầu = (4/3)π(a√3/2)³.',
  bay: 'Phân biệt mặt cầu NGOẠI tiếp (đi qua các đỉnh) và NỘI tiếp (tiếp xúc các mặt).' },

{ nhom: 'VI. Hình không gian', ten: 'Diện tích & hệ thức lượng tam giác', cap: 2,
  ct: '<b>S = ½·a·h<sub>a</sub> = ½·ab·sinC = abc/(4R) = p·r = √[p(p−a)(p−b)(p−c)]</b><br>' +
      '<b>Định lí cosin:</b> a² = b² + c² − 2bc·cosA<br>' +
      '<b>Định lí sin:</b> a/sinA = b/sinB = c/sinC = 2R<br>' +
      '<b>Tam giác đều cạnh a:</b> S = a²√3/4, đường cao a√3/2<br>' +
      '<b>Hình thang:</b> S = ½(a+b)·h · <b>Hình bình hành:</b> S = a·h = ab·sinα',
  khi: 'Tính diện tích đáy trong bài khối đa diện.',
  vd: 'Tam giác vuông cân cạnh góc vuông a: S = a²/2.',
  bay: 'Nhớ tam giác ĐỀU cạnh a có S = a²√3/4 — công thức xuất hiện dày đặc trong hình không gian.' },

{ nhom: 'VII. Dãy số', ten: 'Bất đẳng thức & giá trị lớn nhất nhỏ nhất', cap: 3, cd: 'Đạo hàm – Khảo sát',
  ct: '<b>AM–GM (Cauchy) hai số:</b> a + b ≥ 2√(ab), dấu "=" khi a = b (a, b ≥ 0)<br>' +
      '<b>Ba số:</b> a + b + c ≥ 3∛(abc)<br>' +
      '<b>Hệ quả hay dùng:</b> a + 1/a ≥ 2 với a > 0<br>' +
      '<b>Tổng không đổi ⇒ tích lớn nhất khi các số bằng nhau.</b><br>' +
      '<b>Tích không đổi ⇒ tổng nhỏ nhất khi các số bằng nhau.</b>',
  khi: 'Bài toán tối ưu thực tế — kiểm tra nhanh đáp án trước khi giải bằng đạo hàm.',
  vd: 'Hình chữ nhật có chu vi không đổi ⇒ diện tích lớn nhất khi là HÌNH VUÔNG.',
  bay: 'Điều kiện a, b ≥ 0 là bắt buộc. Luôn chỉ ra dấu "=" xảy ra khi nào.' },

{ nhom: 'VII. Dãy số', ten: 'Lượng giác cơ bản phải thuộc', cap: 2,
  ct: '<b>sin²x + cos²x = 1</b> · tan x = sin x/cos x · 1 + tan²x = 1/cos²x<br>' +
      '<b>Công thức nhân đôi:</b> sin2x = 2sinx·cosx · cos2x = cos²x − sin²x = 2cos²x − 1 = 1 − 2sin²x<br>' +
      '<b>Cộng góc:</b> sin(a±b) = sina·cosb ± cosa·sinb · cos(a±b) = cosa·cosb ∓ sina·sinb<br>' +
      '<b>Giá trị đặc biệt:</b> sin30° = ½ · sin45° = √2/2 · sin60° = √3/2 · cos60° = ½',
  khi: 'Tích phân lượng giác, hình học, phương trình lượng giác.',
  vd: 'cos2x = 1 − 2sin²x ⇒ sin²x = (1 − cos2x)/2 — công thức hạ bậc dùng cho tích phân.',
  bay: 'Nhớ dấu trong công thức cộng góc: cos đảo dấu (cos(a+b) có dấu TRỪ).' }
);

TD.KHO.toan_ct.push(

/* ============ BỔ SUNG: PHỦ KÍN CÔNG THỨC CÓ THỂ RA THI ============ */
{ nhom: 'I. Đạo hàm – Khảo sát', ten: 'GTLN – GTNN trên đoạn [a; b]', cap: 2,
  ct: 'Bước 1: tính y′, giải y′ = 0 lấy các nghiệm x<sub>i</sub> ∈ [a; b].<br>Bước 2: tính y(a), y(b), y(x<sub>i</sub>).<br>Bước 3: <b>max</b> = số lớn nhất, <b>min</b> = số nhỏ nhất trong các giá trị đó.<br>Trên khoảng mở hoặc ℝ: phải lập bảng biến thiên, không được chỉ so đầu mút.',
  khi: 'Câu hỏi tìm GTLN/GTNN, bài toán tối ưu thực tế (hộp, bể, quãng đường).',
  vd: 'y = x³ − 3x trên [0; 2]: y′ = 3x² − 3 = 0 ⇒ x = 1. y(0) = 0, y(1) = −2, y(2) = 2 ⇒ <b>max = 2, min = −2</b>.',
  bay: 'Loại nghiệm y′ = 0 nằm NGOÀI đoạn. Rất nhiều bạn tính cả nghiệm ngoài đoạn rồi chọn nhầm.' },

{ nhom: 'I. Đạo hàm – Khảo sát', ten: 'Tiệm cận đứng – ngang – xiên', cap: 2,
  ct: '<b>Tiệm cận đứng</b> x = x₀ ⇔ lim<sub>x→x₀</sub> y = ±∞ (mẫu = 0 mà tử ≠ 0).<br><b>Tiệm cận ngang</b> y = L ⇔ lim<sub>x→±∞</sub> y = L (hữu hạn).<br><b>Tiệm cận xiên</b> y = ax + b với a = lim y/x, b = lim (y − ax) — chỉ có khi bậc tử hơn bậc mẫu đúng 1.<br>Hàm y = (ax+b)/(cx+d): TCĐ x = −d/c, TCN y = a/c.',
  khi: 'Đếm số tiệm cận, nhận dạng đồ thị, bài toán chứa tham số m.',
  vd: 'y = (x² + 1)/(x − 1): TCĐ x = 1; chia đa thức được y = x + 1 + 2/(x−1) ⇒ <b>TCX: y = x + 1</b>.',
  bay: 'Nếu tử và mẫu cùng triệt tiêu tại x₀ thì <b>rút gọn trước</b> — có thể mất tiệm cận đứng.' },

{ nhom: 'I. Đạo hàm – Khảo sát', ten: 'Tương giao & biện luận số nghiệm', cap: 3,
  ct: 'Số giao điểm của y = f(x) và y = g(x) = số nghiệm của f(x) = g(x).<br>Dạng chuẩn: cô lập tham số về <b>m = h(x)</b> rồi đếm số giao của đường thẳng ngang y = m với đồ thị h(x) qua bảng biến thiên.<br>Hàm bậc 3 cắt Ox tại 3 điểm phân biệt ⇔ có 2 cực trị và <b>y<sub>CĐ</sub>·y<sub>CT</sub> &lt; 0</b>.<br>Trùng phương cắt Ox tại 4 điểm ⇔ ax⁴+bx²+c = 0 có 2 nghiệm dương phân biệt theo t = x².',
  khi: 'Câu vận dụng cao về số nghiệm phương trình chứa m.',
  vd: 'x³ − 3x = m có 3 nghiệm phân biệt ⇔ y<sub>CĐ</sub> = 2 &gt; m &gt; y<sub>CT</sub> = −2 ⇒ <b>−2 &lt; m &lt; 2</b>.',
  bay: 'Với f(|x|) hay |f(x)|, số nghiệm đổi hoàn toàn — phải vẽ lại đồ thị đối xứng/lật rồi mới đếm.' },

{ nhom: 'I. Đạo hàm – Khảo sát', ten: 'Đọc bảng biến thiên & đồ thị', cap: 1,
  ct: 'Mũi tên lên = đồng biến (y′ &gt; 0); mũi tên xuống = nghịch biến.<br>Số điểm cực trị = số lần y′ ĐỔI DẤU.<br>Bậc 3: a &gt; 0 thì nhánh cuối đi lên; a &lt; 0 thì đi xuống.<br>Trùng phương: a &gt; 0 và 3 cực trị thì dạng chữ W.<br>y = (ax+b)/(cx+d): đồ thị hai nhánh hypebol, không cực trị.',
  khi: 'Câu nhận biết cho sẵn BBT hoặc hình vẽ — điểm dễ nhất của đề.',
  vd: 'BBT có y′ đổi dấu + → − tại x = 1 ⇒ x = 1 là điểm <b>cực đại</b>.',
  bay: 'y′(x₀) = 0 mà KHÔNG đổi dấu (ví dụ y = x³ tại 0) thì x₀ không phải điểm cực trị.' },

{ nhom: 'II. Mũ – Logarit', ten: 'Bảng công thức logarit đầy đủ', cap: 1,
  ct: 'log<sub>a</sub>(xy) = log<sub>a</sub>x + log<sub>a</sub>y &nbsp;·&nbsp; log<sub>a</sub>(x/y) = log<sub>a</sub>x − log<sub>a</sub>y<br>log<sub>a</sub>xⁿ = n·log<sub>a</sub>x &nbsp;·&nbsp; log<sub>aⁿ</sub>x = (1/n)·log<sub>a</sub>x<br><b>Đổi cơ số:</b> log<sub>a</sub>x = log<sub>b</sub>x / log<sub>b</sub>a &nbsp;·&nbsp; log<sub>a</sub>b · log<sub>b</sub>c = log<sub>a</sub>c &nbsp;·&nbsp; log<sub>a</sub>b = 1/log<sub>b</sub>a<br>a^(log<sub>a</sub>x) = x &nbsp;·&nbsp; log<sub>a</sub>aˣ = x. ĐK: a &gt; 0, a ≠ 1, x &gt; 0.',
  khi: 'Mọi bài rút gọn, biểu diễn log theo a, b.',
  vd: 'log₂6 = log₂(2·3) = 1 + log₂3. Nếu log₂3 = a thì log₆2 = 1/(1+a).',
  bay: 'log<sub>a</sub>x² = 2log<sub>a</sub>|x| chứ không phải 2log<sub>a</sub>x — mất nghiệm âm là lỗi kinh điển.' },

{ nhom: 'II. Mũ – Logarit', ten: 'Phương trình & bất phương trình mũ – log', cap: 2,
  ct: 'aᶠ⁽ˣ⁾ = a^g(x) ⇔ f(x) = g(x). &nbsp; log<sub>a</sub>f = log<sub>a</sub>g ⇔ f = g &gt; 0.<br><b>Bất phương trình — nhớ chiều:</b><br>· a &gt; 1: aᶠ &gt; a^g ⇔ f &gt; g (giữ chiều)<br>· 0 &lt; a &lt; 1: aᶠ &gt; a^g ⇔ f &lt; g (<b>đổi chiều</b>)<br>Đặt ẩn phụ t = aˣ &gt; 0 cho dạng bậc hai theo aˣ.',
  khi: 'Câu giải phương trình/bất phương trình, đếm nghiệm nguyên.',
  vd: '4ˣ − 5·2ˣ + 4 = 0, đặt t = 2ˣ &gt; 0: t² − 5t + 4 = 0 ⇒ t = 1 hoặc 4 ⇒ <b>x = 0 hoặc x = 2</b>.',
  bay: 'Luôn đặt điều kiện t &gt; 0 và điều kiện xác định của log TRƯỚC khi giải, nếu không sẽ nhận nghiệm ngoại lai.' },

{ nhom: 'II. Mũ – Logarit', ten: 'Lãi kép & mô hình tăng trưởng', cap: 3,
  ct: '<b>Lãi kép:</b> A = P(1 + r)ⁿ &nbsp;⇒&nbsp; n = log<sub>(1+r)</sub>(A/P)<br><b>Gửi góp đều đầu mỗi kì:</b> A = P·[(1+r)ⁿ − 1]/r · (1+r)<br><b>Tăng trưởng/phân rã liên tục:</b> N = N₀·e^(kt); chu kì bán rã T ⇒ N = N₀·2^(−t/T)<br><b>Trả góp:</b> số tiền trả mỗi kì m = P·r(1+r)ⁿ/[(1+r)ⁿ − 1]',
  khi: 'Câu vận dụng thực tế — dạng chắc chắn có trong đề CT 2018.',
  vd: 'Gửi 100 triệu, lãi 6 %/năm. Sau bao lâu được 150 triệu? n = log₁,₀₆1,5 ≈ <b>6,96 năm ⇒ 7 năm</b>.',
  bay: 'Đọc kĩ lãi theo NĂM hay theo THÁNG. Lãi 6 %/năm ghép tháng thì r = 0,06/12 và n tính bằng tháng.' },

{ nhom: 'III. Nguyên hàm – Tích phân', ten: 'Bảng nguyên hàm cơ bản', cap: 1,
  ct: '∫xⁿdx = xⁿ⁺¹/(n+1) + C (n ≠ −1) &nbsp;·&nbsp; ∫(1/x)dx = ln|x| + C<br>∫eˣdx = eˣ + C &nbsp;·&nbsp; ∫aˣdx = aˣ/ln a + C<br>∫sin x dx = −cos x + C &nbsp;·&nbsp; ∫cos x dx = sin x + C<br>∫(1/cos²x)dx = tan x + C &nbsp;·&nbsp; ∫(1/sin²x)dx = −cot x + C<br><b>Dạng hợp:</b> ∫f(ax+b)dx = (1/a)·F(ax+b) + C',
  khi: 'Nền tảng mọi câu nguyên hàm – tích phân.',
  vd: '∫(2x+1)⁵dx = (1/2)·(2x+1)⁶/6 + C = <b>(2x+1)⁶/12 + C</b>.',
  bay: 'Đừng quên hệ số 1/a khi biến trong ngoặc là ax + b. Đây là lỗi mất điểm nhiều nhất của chương này.' },

{ nhom: 'III. Nguyên hàm – Tích phân', ten: 'Đổi biến & tích phân từng phần', cap: 2,
  ct: '<b>Đổi biến:</b> đặt t = u(x) ⇒ dt = u′(x)dx, đổi luôn cận theo t.<br><b>Từng phần:</b> ∫u dv = uv − ∫v du.<br>Thứ tự ưu tiên chọn u (thần chú <b>"Nhất log, nhì đa, tam lượng, tứ mũ"</b>):<br>· có ln x ⇒ u = ln x<br>· đa thức × (sin, cos, eˣ) ⇒ u = đa thức.',
  khi: 'Tích phân có ln, có đa thức nhân hàm mũ hoặc lượng giác.',
  vd: '∫₀¹ x·eˣdx: u = x, dv = eˣdx ⇒ = [x·eˣ]₀¹ − ∫₀¹eˣdx = e − (e − 1) = <b>1</b>.',
  bay: 'Khi đổi biến trong tích phân xác định, PHẢI đổi cận. Quên đổi cận là sai ngay từ dòng đầu.' },

{ nhom: 'III. Nguyên hàm – Tích phân', ten: 'Thể tích khối tròn xoay', cap: 3,
  ct: '<b>Quay quanh Ox:</b> V = π∫<sub>a</sub><sup>b</sup> f²(x)dx.<br>Giữa hai đường (f ở ngoài, g ở trong): V = π∫<sub>a</sub><sup>b</sup> |f² − g²|dx.<br><b>Quay quanh Oy:</b> V = π∫<sub>c</sub><sup>d</sup> x²(y)dy — phải biểu diễn x theo y và đổi cận sang y.',
  khi: 'Câu tích phân ứng dụng, thường ở mức vận dụng.',
  vd: 'y = √x, 0 ≤ x ≤ 4 quay quanh Ox: V = π∫₀⁴x dx = π·[x²/2]₀⁴ = <b>8π</b>.',
  bay: 'Là ∫f² chứ không phải (∫f)². Và với hai đường thì lấy ∫(f² − g²), không phải ∫(f − g)².' },

{ nhom: 'III. Nguyên hàm – Tích phân', ten: 'Ứng dụng vật lí của tích phân', cap: 2,
  ct: 'v(t) = ∫a(t)dt &nbsp;·&nbsp; s(t) = ∫v(t)dt<br><b>Quãng đường đi được</b> từ t₁ đến t₂: s = ∫<sub>t₁</sub><sup>t₂</sup>|v(t)|dt<br><b>Độ dịch chuyển:</b> Δs = ∫<sub>t₁</sub><sup>t₂</sup>v(t)dt (có thể âm)<br>Lượng nước/lượng chất tích luỹ: Q = ∫ tốc độ dt.',
  khi: 'Bài toán thực tế về chuyển động, dòng chảy, tốc độ tăng trưởng.',
  vd: 'v = 3t² (m/s), từ t = 0 đến t = 2: s = ∫₀²3t²dt = [t³]₀² = <b>8 m</b>.',
  bay: 'Quãng đường dùng |v|. Nếu v đổi dấu trong khoảng thì phải tách tích phân tại điểm v = 0.' },

{ nhom: 'IV. Oxyz', ten: 'Vecto, tích vô hướng & tích có hướng', cap: 1,
  ct: 'AB→ = (x<sub>B</sub>−x<sub>A</sub>; y<sub>B</sub>−y<sub>A</sub>; z<sub>B</sub>−z<sub>A</sub>) &nbsp;·&nbsp; |u→| = √(x²+y²+z²)<br><b>Tích vô hướng</b> u→·v→ = x₁x₂ + y₁y₂ + z₁z₂ = |u||v|cos(u,v) ⇒ vuông góc ⇔ tích = 0.<br><b>Tích có hướng</b> [u→,v→] = (y₁z₂−y₂z₁; z₁x₂−z₂x₁; x₁y₂−x₂y₁) ⊥ cả hai vecto.<br>Diện tích tam giác S = ½|[AB→,AC→]| &nbsp;·&nbsp; Thể tích tứ diện V = (1/6)|[AB→,AC→]·AD→|.',
  khi: 'Nền tảng mọi bài Oxyz; tính diện tích, thể tích, xét đồng phẳng.',
  vd: 'A(1;0;0), B(0;1;0), C(0;0;1): [AB→,AC→] = (1;1;1) ⇒ S = ½√3.',
  bay: 'Bốn điểm đồng phẳng ⇔ [AB→,AC→]·AD→ = 0. Đây cũng là điều kiện thể tích tứ diện bằng 0.' },

{ nhom: 'IV. Oxyz', ten: 'Phương trình mặt phẳng', cap: 2,
  ct: 'Mặt phẳng qua M(x₀;y₀;z₀), pháp tuyến n→ = (A;B;C):<br><b>A(x−x₀) + B(y−y₀) + C(z−z₀) = 0</b> ⇔ Ax + By + Cz + D = 0.<br>Mặt phẳng qua 3 điểm A, B, C: n→ = [AB→, AC→].<br>Mặt phẳng theo đoạn chắn: x/a + y/b + z/c = 1.<br>Song song ⇔ cùng phương n→; vuông góc ⇔ n₁→·n₂→ = 0.',
  khi: 'Viết phương trình mặt phẳng — hầu như đề nào cũng có.',
  vd: 'Mp qua M(1;2;3) và ⊥ đường thẳng có u→ = (2;−1;1): 2(x−1) − (y−2) + (z−3) = 0 ⇔ <b>2x − y + z − 3 = 0</b>.',
  bay: 'Mặt phẳng ⊥ đường thẳng thì n→ mp = u→ đường thẳng. Mặt phẳng ∥ đường thẳng thì n→·u→ = 0.' },

{ nhom: 'IV. Oxyz', ten: 'Phương trình đường thẳng & mặt cầu', cap: 2,
  ct: '<b>Đường thẳng</b> qua M(x₀;y₀;z₀), chỉ phương u→ = (a;b;c):<br>Tham số: x = x₀+at, y = y₀+bt, z = z₀+ct.<br>Chính tắc: (x−x₀)/a = (y−y₀)/b = (z−z₀)/c (khi abc ≠ 0).<br><b>Mặt cầu</b> tâm I(a;b;c), bán kính R: (x−a)² + (y−b)² + (z−c)² = R².<br>Dạng khai triển x²+y²+z²−2ax−2by−2cz+d = 0 với <b>R = √(a²+b²+c²−d)</b> (cần a²+b²+c²−d &gt; 0).',
  khi: 'Viết phương trình đường thẳng, mặt cầu, tìm tâm và bán kính.',
  vd: 'x²+y²+z²−2x+4y−6z+5 = 0 ⇒ I(1;−2;3), R = √(1+4+9−5) = <b>3</b>.',
  bay: 'Dấu: hệ số −2a nên a = −(hệ số x)/2. Nhầm dấu tâm là lỗi phổ biến nhất ở dạng này.' },

{ nhom: 'IV. Oxyz', ten: 'Khoảng cách, góc & vị trí tương đối', cap: 3,
  ct: '<b>d(M, (P))</b> = |Ax₀+By₀+Cz₀+D| / √(A²+B²+C²)<br><b>d(M, Δ)</b> = |[AM→, u→]| / |u→| với A ∈ Δ<br><b>Góc hai mặt phẳng:</b> cosφ = |n₁·n₂|/(|n₁||n₂|)<br><b>Góc đường thẳng & mặt phẳng:</b> sinφ = |u·n|/(|u||n|)<br>Mặt cầu và mặt phẳng: d &gt; R rời nhau, d = R tiếp xúc, d &lt; R cắt theo đường tròn bán kính r = √(R²−d²).',
  khi: 'Câu vận dụng: tìm bán kính đường tròn giao tuyến, viết mp tiếp xúc mặt cầu.',
  vd: 'I(1;1;1), R = 3, mp x+y+z−1 = 0: d = |1+1+1−1|/√3 = 2/√3 ⇒ cắt, r = √(9 − 4/3).',
  bay: 'Góc giữa đường và mặt dùng <b>sin</b>, góc giữa hai mặt/hai đường dùng <b>cos</b>. Nhớ trị tuyệt đối ở tử.' },

{ nhom: 'V. Thống kê', ten: 'Số đo xu thế trung tâm — mẫu ghép nhóm', cap: 2,
  ct: '<b>Trung bình:</b> x̄ = Σn<sub>i</sub>c<sub>i</sub>/n với c<sub>i</sub> là giá trị đại diện (trung điểm nhóm).<br><b>Trung vị:</b> M<sub>e</sub> = a<sub>m</sub> + [(n/2 − C)/n<sub>m</sub>]·h<br><b>Tứ phân vị Q<sub>k</sub>:</b> thay n/2 bằng kn/4 trong công thức trên.<br><b>Mốt:</b> M<sub>o</sub> = a<sub>m</sub> + [(n<sub>m</sub>−n<sub>m−1</sub>)/((n<sub>m</sub>−n<sub>m−1</sub>)+(n<sub>m</sub>−n<sub>m+1</sub>))]·h<br>(a<sub>m</sub>: đầu mút trái nhóm chứa, h: độ dài nhóm, C: tần số tích luỹ trước nhóm đó.)',
  khi: 'Nội dung [MỚI] của CT 2018 — chắc chắn có trong đề.',
  vd: 'n = 40, nhóm chứa trung vị [20;30) có C = 15, n<sub>m</sub> = 10, h = 10 ⇒ M<sub>e</sub> = 20 + (20−15)/10·10 = <b>25</b>.',
  bay: 'Giá trị đại diện c<sub>i</sub> là TRUNG ĐIỂM của nhóm, không phải đầu mút trái.' },

{ nhom: 'V. Thống kê', ten: 'Phương sai, độ lệch chuẩn & ngoại lệ', cap: 3,
  ct: '<b>Phương sai:</b> s² = (1/n)Σn<sub>i</sub>(c<sub>i</sub> − x̄)² = (1/n)Σn<sub>i</sub>c<sub>i</sub>² − x̄²<br><b>Độ lệch chuẩn:</b> s = √(s²) — cùng đơn vị với số liệu.<br><b>Khoảng biến thiên:</b> R = max − min<br><b>Khoảng tứ phân vị:</b> Δ<sub>Q</sub> = Q₃ − Q₁ (ít bị ảnh hưởng bởi giá trị bất thường)<br><b>Ngoại lệ:</b> x &lt; Q₁ − 1,5Δ<sub>Q</sub> hoặc x &gt; Q₃ + 1,5Δ<sub>Q</sub>.',
  khi: 'So sánh độ phân tán hai mẫu, phát hiện giá trị bất thường.',
  vd: 'Q₁ = 4, Q₃ = 10 ⇒ Δ<sub>Q</sub> = 6; ngưỡng ngoại lệ: dưới 4 − 9 = −5 hoặc trên 10 + 9 = 19.',
  bay: 'Độ lệch chuẩn nhỏ hơn = số liệu đồng đều hơn. Đừng so phương sai của hai mẫu khác đơn vị.' },

{ nhom: 'V. Xác suất', ten: 'Quy tắc đếm – Hoán vị – Chỉnh hợp – Tổ hợp', cap: 1,
  ct: '<b>Quy tắc cộng</b> (hoặc): n₁ + n₂. <b>Quy tắc nhân</b> (và, liên tiếp): n₁·n₂.<br>Hoán vị: P<sub>n</sub> = n! &nbsp;·&nbsp; Chỉnh hợp: A<sup>k</sup><sub>n</sub> = n!/(n−k)! &nbsp;·&nbsp; Tổ hợp: C<sup>k</sup><sub>n</sub> = n!/[k!(n−k)!]<br><b>Có thứ tự dùng A, không thứ tự dùng C.</b><br>C<sup>k</sup><sub>n</sub> = C<sup>n−k</sup><sub>n</sub> &nbsp;·&nbsp; C<sup>k</sup><sub>n</sub> + C<sup>k+1</sup><sub>n</sub> = C<sup>k+1</sup><sub>n+1</sub>.',
  khi: 'Mọi bài đếm và xác suất cổ điển.',
  vd: 'Chọn 3 trong 10 người vào một tổ (không phân vai): C³₁₀ = <b>120</b>. Nếu chọn tổ trưởng, tổ phó, thư kí: A³₁₀ = <b>720</b>.',
  bay: 'Câu hỏi có phân biệt vai trò/vị trí ⇒ dùng A. Chỉ lấy ra một nhóm ⇒ dùng C.' },

{ nhom: 'V. Xác suất', ten: 'Nhị thức Newton', cap: 2,
  ct: '(a + b)ⁿ = Σ<sub>k=0</sub><sup>n</sup> C<sup>k</sup><sub>n</sub>·a<sup>n−k</sup>·b<sup>k</sup><br>Số hạng tổng quát: <b>T<sub>k+1</sub> = C<sup>k</sup><sub>n</sub>·a<sup>n−k</sup>·b<sup>k</sup></b> (có n+1 số hạng).<br>Tổng hệ số = giá trị biểu thức khi a = b = 1. Σ C<sup>k</sup><sub>n</sub> = 2ⁿ.',
  khi: 'Tìm hệ số của xᵐ, tìm số hạng không chứa x.',
  vd: '(x + 2/x)⁶: T<sub>k+1</sub> = C<sup>k</sup>₆·x^(6−k)·(2/x)^k = C<sup>k</sup>₆·2^k·x^(6−2k). Không chứa x ⇒ k = 3 ⇒ C³₆·8 = <b>160</b>.',
  bay: 'Số hạng thứ k+1 ứng với chỉ số k. Hỏi "số hạng thứ 4" nghĩa là k = 3.' },

{ nhom: 'V. Xác suất', ten: 'Xác suất có điều kiện & công thức Bayes', cap: 3,
  ct: '<b>P(A|B) = P(A∩B)/P(B)</b> (với P(B) &gt; 0)<br><b>Nhân xác suất:</b> P(A∩B) = P(B)·P(A|B)<br>Độc lập ⇔ P(A∩B) = P(A)·P(B) ⇔ P(A|B) = P(A).<br><b>Xác suất toàn phần:</b> P(B) = P(A)P(B|A) + P(Ā)P(B|Ā)<br><b>Bayes:</b> P(A|B) = P(A)·P(B|A) / P(B)',
  khi: 'Nội dung [MỚI] của CT 2018 — dạng sơ đồ hình cây, bài toán chẩn đoán.',
  vd: 'Hộp 1 (60 %) có 20 % phế phẩm; hộp 2 (40 %) có 5 %. P(phế) = 0,6·0,2 + 0,4·0,05 = <b>0,14</b>. Nếu lấy được phế phẩm, xác suất từ hộp 1 là 0,12/0,14 ≈ <b>0,857</b>.',
  bay: 'Vẽ sơ đồ hình cây trước: nhánh 1 là nguyên nhân, nhánh 2 là kết quả. Bayes chính là đi ngược cây.' },

{ nhom: 'VI. Hình không gian', ten: 'Góc trong không gian', cap: 2,
  ct: '<b>Góc đường thẳng & mặt phẳng:</b> góc giữa đường thẳng và hình chiếu của nó lên mặt phẳng (0° ≤ φ ≤ 90°).<br><b>Góc hai mặt phẳng:</b> dựng trong mặt phẳng vuông góc với giao tuyến, đo góc giữa hai đường cùng ⊥ giao tuyến.<br><b>Góc hai đường chéo nhau:</b> dời song song về cùng một điểm.<br>Mẹo toạ độ hoá: gắn hệ trục vào đỉnh có 3 cạnh đôi một vuông góc rồi dùng công thức Oxyz.',
  khi: 'Bài hình không gian tổng hợp, thường mức vận dụng.',
  vd: 'Chóp S.ABCD, SA ⊥ (ABCD): góc giữa SC và (ABCD) là góc SCA, tan = SA/AC.',
  bay: 'Xác định hình chiếu sai là mất trọn câu. Với SA ⊥ đáy thì hình chiếu của S luôn là A.' },

{ nhom: 'VI. Hình không gian', ten: 'Khoảng cách — kĩ thuật thể tích', cap: 3,
  ct: '<b>d(A, (P)) = 3V / S<sub>(P)</sub></b> — cách nhanh nhất khi biết thể tích khối chóp.<br>Nếu AB ∥ (P) thì d(A,(P)) = d(B,(P)).<br>Nếu AB cắt (P) tại I thì d(A,(P))/d(B,(P)) = IA/IB.<br><b>Khoảng cách hai đường chéo nhau:</b> dựng đoạn vuông góc chung, hoặc d(a,b) = d(a, (P)) với (P) chứa b và ∥ a.',
  khi: 'Dạng khó nhất của hình không gian — luôn thử hướng thể tích trước.',
  vd: 'V = 6, S<sub>BCD</sub> = 9 ⇒ d(A, (BCD)) = 3·6/9 = <b>2</b>.',
  bay: 'Đổi đỉnh để tính V cho dễ: V<sub>A.BCD</sub> = V<sub>D.ABC</sub>. Chọn mặt đáy nào tính diện tích dễ nhất.' },

{ nhom: 'VI. Hình không gian', ten: 'Nón – Trụ – Cầu: diện tích & thể tích', cap: 1,
  ct: '<b>Nón:</b> S<sub>xq</sub> = πrl, S<sub>tp</sub> = πrl + πr², V = (1/3)πr²h, l² = r² + h²<br><b>Trụ:</b> S<sub>xq</sub> = 2πrh, S<sub>tp</sub> = 2πrh + 2πr², V = πr²h<br><b>Cầu:</b> S = 4πR², V = (4/3)πR³<br>Nón cụt: V = (πh/3)(R² + Rr + r²).',
  khi: 'Câu nhận biết – thông hiểu về khối tròn xoay.',
  vd: 'Nón r = 3, h = 4 ⇒ l = 5, S<sub>xq</sub> = 15π, V = <b>12π</b>.',
  bay: 'S<sub>xq</sub> nón dùng đường sinh l, còn V dùng chiều cao h. Lẫn l với h là bẫy số một.' },

{ nhom: 'VII. Dãy số', ten: 'Giới hạn & tính liên tục', cap: 2,
  ct: 'lim (uⁿ) = 0 khi |u| &lt; 1. lim (1/nᵏ) = 0 với k &gt; 0.<br>Giới hạn phân thức khi x → ∞: chia cho luỹ thừa bậc cao nhất; so bậc tử với bậc mẫu.<br>Dạng 0/0: phân tích nhân tử hoặc nhân liên hợp.<br><b>Liên tục tại x₀ ⇔ lim<sub>x→x₀</sub>f(x) = f(x₀)</b> (tồn tại và bằng giá trị hàm).<br>f liên tục trên [a;b] và f(a)·f(b) &lt; 0 ⇒ phương trình f(x) = 0 có nghiệm trong (a;b).',
  khi: 'Câu về giới hạn, tìm m để hàm liên tục, chứng minh có nghiệm.',
  vd: 'lim<sub>x→2</sub>(x²−4)/(x−2) = lim (x+2) = <b>4</b>.',
  bay: 'Hàm cho theo nhiều công thức: phải kiểm tra giới hạn TRÁI và PHẢI tại điểm nối, cả hai phải bằng f(x₀).' },

{ nhom: 'VIII. Lượng giác', ten: 'Công thức lượng giác trọng tâm', cap: 2,
  ct: 'sin²x + cos²x = 1 &nbsp;·&nbsp; 1 + tan²x = 1/cos²x<br><b>Cộng:</b> sin(a±b) = sin a cos b ± cos a sin b; cos(a±b) = cos a cos b ∓ sin a sin b<br><b>Nhân đôi:</b> sin2a = 2sin a cos a; cos2a = cos²a − sin²a = 2cos²a − 1 = 1 − 2sin²a<br><b>Hạ bậc:</b> sin²a = (1−cos2a)/2; cos²a = (1+cos2a)/2<br><b>Biến đổi tích ⇄ tổng</b> khi cần gộp hai hàm cùng loại.',
  khi: 'Rút gọn biểu thức, giải phương trình lượng giác, tính tích phân lượng giác.',
  vd: '∫sin²x dx = ∫(1−cos2x)/2 dx = x/2 − sin2x/4 + C.',
  bay: 'Nhớ dấu ∓ trong công thức cos(a+b) = cos a cos b − sin a sin b — ngược dấu so với sin.' },

{ nhom: 'VIII. Lượng giác', ten: 'Phương trình lượng giác cơ bản', cap: 2,
  ct: 'sin x = sin α ⇔ x = α + k2π hoặc x = π − α + k2π<br>cos x = cos α ⇔ x = ±α + k2π<br>tan x = tan α ⇔ x = α + kπ<br><b>Đặc biệt:</b> sin x = 0 ⇔ x = kπ; cos x = 0 ⇔ x = π/2 + kπ; sin x = 1 ⇔ x = π/2 + k2π.<br>a·sin x + b·cos x = c có nghiệm ⇔ a² + b² ≥ c².',
  khi: 'Giải phương trình lượng giác, đếm nghiệm trên một khoảng.',
  vd: '2sin x − 1 = 0 ⇒ sin x = 1/2 ⇒ x = π/6 + k2π hoặc x = 5π/6 + k2π.',
  bay: 'Đếm nghiệm trên khoảng cho trước: thay k = 0, ±1, ±2… rồi lọc, đừng đoán.' },

{ nhom: 'IX. Vecto & hệ thức lượng', ten: 'Hệ thức lượng trong tam giác', cap: 2,
  ct: '<b>Định lí cosin:</b> a² = b² + c² − 2bc·cos A<br><b>Định lí sin:</b> a/sin A = b/sin B = c/sin C = 2R<br><b>Diện tích:</b> S = ½ab·sin C = abc/(4R) = pr = √[p(p−a)(p−b)(p−c)]<br>Trung tuyến: m<sub>a</sub>² = (2b² + 2c² − a²)/4.',
  khi: 'Bài toán thực tế đo đạc khoảng cách, chiều cao — dạng ưa thích của CT 2018.',
  vd: 'b = 5, c = 8, A = 60° ⇒ a² = 25 + 64 − 2·5·8·0,5 = 49 ⇒ <b>a = 7</b>.',
  bay: 'Định lí cosin dùng khi biết 2 cạnh + góc XEN GIỮA hoặc biết 3 cạnh. Biết góc đối diện thì dùng định lí sin.' },

{ nhom: 'IX. Vecto & hệ thức lượng', ten: 'Vecto trong không gian & phân tích vecto', cap: 2,
  ct: 'Quy tắc ba điểm: AB→ + BC→ = AC→. Quy tắc hình bình hành: AB→ + AD→ = AC→.<br>Quy tắc hình hộp: AB→ + AD→ + AA′→ = AC′→.<br><b>Trung điểm:</b> MA→ + MB→ = 2MI→. <b>Trọng tâm:</b> GA→ + GB→ + GC→ = 0→.<br>Ba vecto đồng phẳng ⇔ tồn tại m, n để c→ = m·a→ + n·b→.',
  khi: 'Chứng minh vuông góc, tính góc, toạ độ hoá bài hình không gian.',
  vd: 'G là trọng tâm ABC ⇒ với mọi M: MA→ + MB→ + MC→ = 3MG→.',
  bay: 'AB→ = −BA→. Sai chiều vecto làm sai toàn bộ dấu của phép tính về sau.' }
);
