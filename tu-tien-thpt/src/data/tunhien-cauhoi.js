/* ============================================================
   TOÁN – VẬT LÍ – SINH HỌC : NGÂN HÀNG CÂU HỎI
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

/* ==================== TOÁN ==================== */
TD.KHO.toan = [
{ chuong: 'Khảo sát hàm số', dang: 'mc', muc: 1,
  q: 'Đường tiệm cận đứng của đồ thị hàm số y = (2x − 1)/(x + 3) là',
  opts: ['x = −3', 'x = 2', 'y = 2', 'y = −3'], ans: 0,
  giai: 'Tiệm cận đứng là nghiệm của mẫu làm mẫu bằng 0 mà tử khác 0: x + 3 = 0 ⇒ x = −3.',
  meo: 'Hàm y = (ax+b)/(cx+d): TCĐ là x = −d/c, TCN là y = a/c. Ở đây TCN là y = 2.' },

{ chuong: 'Mũ – Logarit', dang: 'mc', muc: 2,
  q: 'Giá trị của biểu thức log₂40 − log₂5 bằng',
  opts: ['2', '3', '8', 'log₂35'], ans: 1,
  giai: 'log₂40 − log₂5 = log₂(40/5) = log₂8 = 3.',
  meo: 'Hiệu hai logarit cùng cơ số = logarit của thương. Đừng nhầm thành log₂(40−5).' },

{ chuong: 'Nguyên hàm', dang: 'mc', muc: 3,
  q: 'Họ nguyên hàm ∫(2x + 1)⁵dx bằng',
  opts: ['(2x+1)⁶/6 + C', '(2x+1)⁶/12 + C', '5(2x+1)⁴ + C', '(2x+1)⁶/2 + C'], ans: 1,
  giai: '∫(ax+b)ⁿdx = (1/a)·(ax+b)ⁿ⁺¹/(n+1) + C. Ở đây a = 2, n = 5 ⇒ (1/2)·(2x+1)⁶/6 = (2x+1)⁶/12 + C.',
  meo: 'Luôn nhớ nhân thêm hệ số 1/a khi biến bên trong là ax + b.' },

{ chuong: 'Cấp số – Lãi kép', dang: 'mc', muc: 2,
  q: 'Gửi tiết kiệm 100 triệu đồng với lãi suất 6%/năm theo hình thức lãi kép. Sau 5 năm, số tiền cả gốc lẫn lãi gần nhất với giá trị nào?',
  opts: ['130,00 triệu', '133,82 triệu', '136,00 triệu', '106,00 triệu'], ans: 1,
  giai: 'Công thức lãi kép: A = P(1 + r)ⁿ = 100·(1,06)⁵ = 100·1,33823 ≈ 133,82 triệu đồng.',
  meo: 'Lãi kép dùng luỹ thừa; lãi đơn thì chỉ nhân: 100·(1 + 0,06·5) = 130 triệu (đáp án nhiễu A).' },

{ chuong: 'Tích phân – Ứng dụng', dang: 'tln', muc: 3,
  q: 'Tính diện tích hình phẳng giới hạn bởi hai đường y = x và y = x². Kết quả viết dưới dạng phân số tối giản a/b (nhập theo dạng a/b).',
  ans: '1/6',
  giai: 'Hoành độ giao điểm: x = x² ⇒ x(x−1) = 0 ⇒ x = 0 hoặc x = 1.\nTrên [0;1] ta có x ≥ x².\nS = ∫₀¹(x − x²)dx = [x²/2 − x³/3]₀¹ = 1/2 − 1/3 = 1/6.',
  meo: 'Luôn tìm cận bằng cách cho hai hàm bằng nhau, rồi lấy hàm lớn trừ hàm nhỏ trên khoảng đó.' },

{ chuong: 'Oxyz', dang: 'tln', muc: 3,
  q: 'Trong không gian Oxyz, tính khoảng cách từ điểm M(2; 1; −1) đến mặt phẳng (P): x + 2y − 2z + 3 = 0.',
  ans: '3',
  giai: 'd(M,(P)) = |x₀ + 2y₀ − 2z₀ + 3| / √(1² + 2² + (−2)²)\n= |2 + 2·1 − 2·(−1) + 3| / √9\n= |2 + 2 + 2 + 3| / 3 = 9/3 = 3.',
  meo: 'Nhớ lấy trị tuyệt đối ở tử và căn tổng bình phương các hệ số A, B, C ở mẫu.' },

{ chuong: 'Thống kê ghép nhóm', dang: 'tln', muc: 3,
  q: 'Khảo sát thời gian tự học (giờ/tuần) của 10 học sinh thu được mẫu ghép nhóm: [0;10) có 2 học sinh, [10;20) có 3 học sinh, [20;30) có 5 học sinh. Tính số trung bình của mẫu số liệu ghép nhóm này.',
  ans: '18',
  giai: 'Giá trị đại diện mỗi nhóm là trung điểm: c₁ = 5, c₂ = 15, c₃ = 25.\nx̄ = (n₁c₁ + n₂c₂ + n₃c₃)/n = (2·5 + 3·15 + 5·25)/10\n= (10 + 45 + 125)/10 = 180/10 = 18.',
  meo: 'Với mẫu ghép nhóm, mọi phép tính đều dùng trung điểm nhóm làm giá trị đại diện.' },

{ chuong: 'Xác suất có điều kiện', dang: 'tln', muc: 4,
  q: 'Hộp I có 3 bi đỏ và 2 bi xanh; hộp II có 1 bi đỏ và 4 bi xanh. Chọn ngẫu nhiên một hộp rồi lấy ngẫu nhiên một viên bi từ hộp đó. Biết viên bi lấy được màu đỏ, tính xác suất viên bi đó lấy từ hộp I (viết dưới dạng số thập phân).',
  ans: '0,75',
  giai: 'Gọi A: "chọn hộp I", B: "lấy được bi đỏ".\nP(A) = P(Ā) = 1/2; P(B|A) = 3/5; P(B|Ā) = 1/5.\nXác suất toàn phần: P(B) = 1/2·3/5 + 1/2·1/5 = 3/10 + 1/10 = 4/10 = 2/5.\nCông thức Bayes: P(A|B) = P(A)·P(B|A)/P(B) = (1/2·3/5)/(2/5) = (3/10)/(4/10) = 3/4 = 0,75.',
  meo: 'Vẽ sơ đồ hình cây: nhánh 1 là chọn hộp, nhánh 2 là màu bi. Bayes chính là "nhánh mong muốn chia tổng các nhánh cho kết quả đó".' },

{ chuong: 'GTLN – GTNN', dang: 'tln', muc: 4,
  q: 'Từ một tấm tôn hình vuông cạnh 12 cm, người ta cắt bỏ ở bốn góc bốn hình vuông bằng nhau cạnh x cm rồi gấp lên thành một cái hộp không nắp. Tìm thể tích lớn nhất của hộp (đơn vị cm³).',
  ans: '128',
  giai: 'Hộp có đáy vuông cạnh (12 − 2x) và chiều cao x, với 0 < x < 6.\nV(x) = x(12 − 2x)².\nV′(x) = (12−2x)² + x·2(12−2x)·(−2) = (12−2x)[(12−2x) − 4x] = (12−2x)(12−6x).\nV′ = 0 ⇒ x = 6 (loại) hoặc x = 2.\nLập bảng biến thiên: V đạt cực đại tại x = 2.\nV(2) = 2·(12−4)² = 2·64 = 128 cm³.',
  meo: 'Bài tối ưu thực tế: đặt biến, tìm điều kiện, lập hàm, đạo hàm, lập bảng biến thiên. Đừng quên loại nghiệm không thoả điều kiện.' },

{ chuong: 'Cấp số nhân', dang: 'tln', muc: 3,
  q: 'Cho cấp số nhân (uₙ) có u₁ = 2 và công bội q = 3. Tính tổng 5 số hạng đầu tiên S₅.',
  ans: '242',
  giai: 'S₅ = u₁(1 − q⁵)/(1 − q) = 2(1 − 3⁵)/(1 − 3) = 2(1 − 243)/(−2) = 2·(−242)/(−2) = 242.\nKiểm tra trực tiếp: 2 + 6 + 18 + 54 + 162 = 242. ✓',
  meo: 'Luôn thử cộng tay vài số hạng đầu để kiểm tra — mất 10 giây nhưng tránh sai dấu.' },

{ chuong: 'Khảo sát hàm số', dang: 'ds', muc: 3,
  q: 'Cho hàm số y = x³ − 3x. Xét các phát biểu sau:',
  items: [
    { t: 'Hàm số có hai điểm cực trị.', a: true },
    { t: 'Hàm số đồng biến trên khoảng (−1; 1).', a: false },
    { t: 'Giá trị cực đại của hàm số bằng 2.', a: true },
    { t: 'Đồ thị hàm số cắt trục hoành tại ba điểm phân biệt.', a: true }
  ],
  giai: 'y′ = 3x² − 3 = 3(x² − 1) ⇒ y′ = 0 ⇔ x = ±1.\nÝ a ĐÚNG: y′ đổi dấu qua cả x = −1 và x = 1 ⇒ có 2 cực trị.\nÝ b SAI: trên (−1; 1) thì x² < 1 ⇒ y′ < 0 ⇒ hàm NGHỊCH biến.\nÝ c ĐÚNG: cực đại tại x = −1, y(−1) = −1 + 3 = 2.\nÝ d ĐÚNG: x³ − 3x = 0 ⇔ x(x² − 3) = 0 ⇔ x = 0; x = ±√3 ⇒ 3 nghiệm phân biệt.',
  meo: 'Hàm bậc ba có 2 cực trị ⇔ y′ = 0 có 2 nghiệm phân biệt ⇔ Δ(y′) > 0.' },

{ chuong: 'Oxyz', dang: 'ds', muc: 4,
  q: 'Trong không gian Oxyz, cho mặt cầu (S): x² + y² + z² − 2x + 4y − 6z + 5 = 0. Xét các phát biểu sau:',
  items: [
    { t: 'Mặt cầu (S) có tâm I(1; −2; 3).', a: true },
    { t: 'Mặt cầu (S) có bán kính bằng 3.', a: true },
    { t: 'Mặt cầu (S) tiếp xúc với mặt phẳng (Oxy).', a: true },
    { t: 'Gốc toạ độ O nằm bên trong mặt cầu (S).', a: false }
  ],
  giai: 'Dạng x²+y²+z²−2ax−2by−2cz+d = 0 ⇒ tâm I(a;b;c), R = √(a²+b²+c²−d).\nSo sánh: −2a = −2 ⇒ a = 1; −2b = 4 ⇒ b = −2; −2c = −6 ⇒ c = 3; d = 5.\nÝ a ĐÚNG: I(1; −2; 3).\nÝ b ĐÚNG: R = √(1 + 4 + 9 − 5) = √9 = 3.\nÝ c ĐÚNG: d(I, (Oxy)) = |z_I| = 3 = R ⇒ tiếp xúc.\nÝ d SAI: OI = √(1² + (−2)² + 3²) = √14 ≈ 3,74 > R = 3 ⇒ O nằm NGOÀI mặt cầu.',
  meo: 'Điểm M nằm trong mặt cầu ⇔ IM < R; trên mặt cầu ⇔ IM = R; ngoài ⇔ IM > R.' }
];

/* ==================== VẬT LÍ ==================== */
TD.KHO.ly = [
{ chuong: 'Từ trường', dang: 'mc', muc: 1,
  q: 'Đơn vị của cảm ứng từ B trong hệ SI là',
  opts: ['Weber (Wb)', 'Tesla (T)', 'Henry (H)', 'Vôn (V)'], ans: 1,
  giai: 'Cảm ứng từ B có đơn vị tesla (T). Weber là đơn vị của từ thông Φ, henry là độ tự cảm, vôn là hiệu điện thế.',
  meo: 'Φ = B·S ⇒ 1 Wb = 1 T·m². Nhớ cặp này để không nhầm B với Φ.' },

{ chuong: 'Vật lí nhiệt', dang: 'mc', muc: 1,
  q: 'Nhiệt độ 27 °C tương ứng với bao nhiêu kelvin?',
  opts: ['246 K', '273 K', '300 K', '327 K'], ans: 2,
  giai: 'T(K) = t(°C) + 273 = 27 + 273 = 300 K.',
  meo: 'Độ CHÊNH LỆCH nhiệt độ trong hai thang là như nhau: Δt(°C) = ΔT(K).' },

{ chuong: 'Khí lí tưởng', dang: 'mc', muc: 2,
  q: 'Nén đẳng nhiệt một lượng khí từ thể tích 2 L xuống 0,5 L. Áp suất của khí sẽ',
  opts: ['giảm 4 lần', 'tăng 4 lần', 'tăng 2 lần', 'không đổi'], ans: 1,
  giai: 'Định luật Boyle (T không đổi): p₁V₁ = p₂V₂ ⇒ p₂/p₁ = V₁/V₂ = 2/0,5 = 4 ⇒ áp suất tăng 4 lần.',
  meo: 'Đẳng nhiệt: p và V tỉ lệ NGHỊCH. Thể tích giảm bao nhiêu lần thì áp suất tăng bấy nhiêu lần.' },

{ chuong: 'Vật lí nhiệt', dang: 'tln', muc: 2,
  q: 'Cần cung cấp bao nhiêu kJ nhiệt lượng để đun 2 kg nước từ 20 °C lên 100 °C? Biết nhiệt dung riêng của nước là 4200 J/(kg·K). (làm tròn đến hàng đơn vị)',
  ans: '672',
  giai: 'Q = m·c·Δt = 2 · 4200 · (100 − 20) = 2 · 4200 · 80 = 672 000 J = 672 kJ.',
  meo: 'Đọc kỹ đơn vị đề yêu cầu: J hay kJ. Đây là chỗ mất điểm oan nhiều nhất.' },

{ chuong: 'Nhiệt động lực học', dang: 'tln', muc: 3,
  q: 'Một khối khí nhận nhiệt lượng 200 J và thực hiện công 80 J lên môi trường ngoài. Độ biến thiên nội năng của khối khí bằng bao nhiêu J?',
  ans: '120',
  giai: 'Định luật I nhiệt động lực học: ΔU = A + Q.\nKhí NHẬN nhiệt ⇒ Q = +200 J.\nKhí SINH công (thực hiện công lên ngoài) ⇒ A = −80 J.\nΔU = (−80) + 200 = +120 J ⇒ nội năng tăng 120 J.',
  meo: 'Quy ước dấu: nhận nhiệt Q > 0, toả nhiệt Q < 0; nhận công A > 0, sinh công A < 0.' },

{ chuong: 'Từ trường', dang: 'tln', muc: 3,
  q: 'Một đoạn dây dẫn dài 0,2 m mang dòng điện 5 A đặt vuông góc với các đường sức của từ trường đều có cảm ứng từ 0,4 T. Lực từ tác dụng lên đoạn dây bằng bao nhiêu N? (làm tròn đến hàng phần mười)',
  ans: '0,4',
  giai: 'F = B·I·L·sinα với α = 90° ⇒ sinα = 1.\nF = 0,4 · 5 · 0,2 · 1 = 0,4 N.',
  meo: 'Nếu dây SONG SONG với B thì α = 0 ⇒ F = 0. Luôn kiểm tra góc trước khi tính.' },

{ chuong: 'Cảm ứng điện từ', dang: 'tln', muc: 3,
  q: 'Một khung dây gồm 100 vòng. Từ thông qua mỗi vòng biến thiên một lượng 0,02 Wb trong thời gian 0,1 s. Độ lớn suất điện động cảm ứng xuất hiện trong khung bằng bao nhiêu V?',
  ans: '20',
  giai: '|e_c| = N·|ΔΦ|/Δt = 100 · 0,02 / 0,1 = 100 · 0,2 = 20 V.',
  meo: 'Dấu trừ trong công thức Faraday chỉ thể hiện định luật Lenz (chiều); khi hỏi ĐỘ LỚN thì bỏ dấu trừ.' },

{ chuong: 'Vật lí hạt nhân', dang: 'tln', muc: 3,
  q: 'Một mẫu chất phóng xạ ban đầu có khối lượng 64 g, chu kì bán rã T. Sau khoảng thời gian t = 3T, khối lượng chất phóng xạ còn lại là bao nhiêu gam?',
  ans: '8',
  giai: 'm = m₀ · 2^(−t/T) = 64 · 2^(−3) = 64/8 = 8 g.',
  meo: 'Sau k chu kì bán rã, còn lại 1/2ᵏ và ĐÃ phân rã (1 − 1/2ᵏ). Đọc kỹ đề hỏi phần nào.' },

{ chuong: 'Vật lí hạt nhân', dang: 'tln', muc: 4,
  q: 'Hạt nhân ⁴₂He có khối lượng 4,0015 u. Biết m_p = 1,00728 u, m_n = 1,00866 u, 1u = 931,5 MeV/c². Tính năng lượng liên kết riêng của hạt nhân này (MeV/nuclon, làm tròn đến hàng phần trăm).',
  ans: '7,07',
  giai: 'Hạt nhân ⁴₂He có Z = 2 proton và A − Z = 2 neutron.\nĐộ hụt khối: Δm = 2·1,00728 + 2·1,00866 − 4,0015\n= 2,01456 + 2,01732 − 4,0015 = 0,03038 u.\nNăng lượng liên kết: W_lk = 0,03038 · 931,5 = 28,299 MeV.\nNăng lượng liên kết riêng: ε = W_lk/A = 28,299/4 = 7,0748 ≈ 7,07 MeV/nuclon.',
  meo: 'So sánh độ bền các hạt nhân phải dùng ε = W_lk/A, KHÔNG dùng W_lk.' },

{ chuong: 'Máy biến áp', dang: 'ds', muc: 3,
  q: 'Một máy biến áp lí tưởng có cuộn sơ cấp 1000 vòng, cuộn thứ cấp 200 vòng. Đặt vào hai đầu cuộn sơ cấp điện áp xoay chiều có giá trị hiệu dụng 220 V. Xét các phát biểu sau:',
  items: [
    { t: 'Điện áp hiệu dụng ở hai đầu cuộn thứ cấp là 44 V.', a: true },
    { t: 'Đây là máy hạ áp.', a: true },
    { t: 'Cường độ dòng điện hiệu dụng ở cuộn thứ cấp nhỏ hơn ở cuộn sơ cấp.', a: false },
    { t: 'Máy biến áp hoạt động dựa trên hiện tượng cảm ứng điện từ.', a: true }
  ],
  giai: 'Ý a ĐÚNG: U₂ = U₁·N₂/N₁ = 220·200/1000 = 44 V.\nÝ b ĐÚNG: N₂ < N₁ ⇒ U₂ < U₁ ⇒ máy hạ áp.\nÝ c SAI: với máy lí tưởng, U₁I₁ = U₂I₂ ⇒ I₂/I₁ = U₁/U₂ = 5 ⇒ dòng thứ cấp LỚN hơn 5 lần.\nÝ d ĐÚNG: nguyên tắc hoạt động của máy biến áp là hiện tượng cảm ứng điện từ.',
  meo: 'Hạ áp thì hạ điện áp nhưng TĂNG dòng điện (công suất bảo toàn). Đây là bẫy hay gặp nhất.' },

{ chuong: 'Vật lí hạt nhân', dang: 'ds', muc: 3,
  q: 'Về các loại phóng xạ và phản ứng hạt nhân, xét các phát biểu sau:',
  items: [
    { t: 'Trong phóng xạ β⁻, số khối A không đổi còn số hiệu nguyên tử Z tăng 1 đơn vị.', a: true },
    { t: 'Tia γ có khả năng đâm xuyên mạnh nhất trong ba loại tia α, β, γ.', a: true },
    { t: 'Trong phản ứng hạt nhân, tổng khối lượng nghỉ của các hạt luôn được bảo toàn.', a: false },
    { t: 'Phản ứng nhiệt hạch xảy ra khi hai hạt nhân rất nhẹ kết hợp thành hạt nhân nặng hơn.', a: true }
  ],
  giai: 'Ý a ĐÚNG: n → p + e⁻ + ν̄ ⇒ A giữ nguyên, Z tăng 1.\nÝ b ĐÚNG: γ là sóng điện từ có năng lượng lớn, đâm xuyên mạnh nhất; α đâm xuyên yếu nhất.\nÝ c SAI: chỉ bảo toàn số nuclon A, điện tích Z, năng lượng toàn phần và động lượng. Khối lượng NGHỈ không bảo toàn — phần chênh lệch chuyển thành năng lượng.\nÝ d ĐÚNG: đó là định nghĩa nhiệt hạch (như phản ứng trong lòng Mặt Trời).',
  meo: 'Câu "khối lượng được bảo toàn trong phản ứng hạt nhân" luôn SAI — đây là hệ quả trực tiếp của E = mc².' }
];

/* ==================== SINH HỌC ==================== */
TD.KHO.sinh = [
{ chuong: 'Di truyền phân tử', dang: 'mc', muc: 1,
  q: 'Đơn phân cấu tạo nên phân tử DNA là',
  opts: ['Amino acid', 'Nucleotide', 'Glucose', 'Ribonucleotide'], ans: 1,
  giai: 'DNA được cấu tạo từ các nucleotide (A, T, G, C). Amino acid là đơn phân của protein; ribonucleotide là đơn phân của RNA.',
  meo: 'DNA – nucleotide (có T) · RNA – ribonucleotide (có U) · Protein – amino acid.' },

{ chuong: 'Giảm phân', dang: 'mc', muc: 2,
  q: 'Một tế bào sinh trứng của động vật tiến hành giảm phân bình thường sẽ tạo ra',
  opts: ['4 trứng', '1 trứng và 3 thể cực', '2 trứng và 2 thể cực', '4 tinh trùng'], ans: 1,
  giai: 'Tế bào sinh trứng giảm phân tạo 4 tế bào con nhưng chỉ 1 phát triển thành trứng, 3 tế bào còn lại thoái hoá thành thể cực (thể định hướng).',
  meo: '1 tế bào sinh tinh → 4 tinh trùng, nhưng 1 tế bào sinh trứng → chỉ 1 trứng. Bẫy kinh điển.' },

{ chuong: 'Di truyền phân tử', dang: 'tln', muc: 2,
  q: 'Một gene có chiều dài 5100 Å. Tổng số nucleotide của gene này là bao nhiêu?',
  ans: '3000',
  giai: 'L = (N/2)·3,4 Å ⇒ N = 2L/3,4 = 2·5100/3,4 = 10200/3,4 = 3000 nucleotide.',
  meo: 'Nhớ: chiều dài tính theo SỐ CẶP nu (N/2), mỗi cặp dài 3,4 Å.' },

{ chuong: 'Nhân đôi DNA', dang: 'tln', muc: 3,
  q: 'Một gene có 3000 nucleotide tiến hành nhân đôi 3 lần liên tiếp. Số nucleotide môi trường nội bào cần cung cấp là bao nhiêu?',
  ans: '21000',
  giai: 'Số nu môi trường cung cấp = N·(2ᵏ − 1) = 3000·(2³ − 1) = 3000·7 = 21 000 nucleotide.',
  meo: 'Nhớ trừ 1: gene mẹ ban đầu không cần môi trường cung cấp, nên là (2ᵏ − 1) chứ không phải 2ᵏ.' },

{ chuong: 'Phiên mã – Dịch mã', dang: 'tln', muc: 3,
  q: 'Một gene có 3000 nucleotide. Chuỗi polypeptide hoàn chỉnh do gene này mã hoá có bao nhiêu amino acid?',
  ans: '498',
  giai: 'Số nu trên mRNA: rN = N/2 = 1500.\nSố bộ ba trên mRNA: 1500/3 = 500 bộ ba.\nTrừ 1 bộ ba kết thúc ⇒ 499 amino acid được đưa vào chuỗi.\nChuỗi HOÀN CHỈNH bị cắt bỏ methionine mở đầu ⇒ 499 − 1 = 498 amino acid.',
  meo: 'Công thức nhanh: số aa chuỗi hoàn chỉnh = N/6 − 2. Ở đây 3000/6 − 2 = 498.' },

{ chuong: 'Di truyền quần thể', dang: 'tln', muc: 3,
  q: 'Ở một quần thể người cân bằng di truyền, một bệnh do allele lặn nằm trên nhiễm sắc thể thường quy định, tỉ lệ người mắc bệnh là 1%. Tỉ lệ người mang gene bệnh nhưng không biểu hiện (thể dị hợp) là bao nhiêu phần trăm?',
  ans: '18',
  giai: 'Quần thể cân bằng: p²AA + 2pqAa + q²aa = 1.\nNgười bệnh (aa) chiếm q² = 0,01 ⇒ q = 0,1 ⇒ p = 1 − 0,1 = 0,9.\nNgười mang gene (Aa) = 2pq = 2·0,9·0,1 = 0,18 = 18%.',
  meo: 'Từ tỉ lệ người bệnh phải CĂN BẬC HAI để ra tần số allele lặn q. Người "mang gene" là dị hợp, không tính người bệnh.' },

{ chuong: 'Quy luật di truyền', dang: 'tln', muc: 3,
  q: 'Cơ thể có kiểu gene AaBbCc tự thụ phấn (các gene phân li độc lập). Đời con F₁ có tối đa bao nhiêu loại kiểu gene?',
  ans: '27',
  giai: 'Mỗi cặp dị hợp Aa × Aa cho 3 loại kiểu gene (AA, Aa, aa).\nBa cặp phân li độc lập ⇒ số kiểu gene = 3 × 3 × 3 = 3³ = 27.',
  meo: 'n cặp dị hợp phân li độc lập, tự thụ: 3ⁿ kiểu gene, 2ⁿ kiểu hình (trội hoàn toàn), 2ⁿ loại giao tử.' },

{ chuong: 'Hoán vị gene', dang: 'tln', muc: 4,
  q: 'Một cơ thể có kiểu gene AB/ab, xảy ra hoán vị gene với tần số 20%. Tỉ lệ giao tử Ab được tạo ra là bao nhiêu phần trăm?',
  ans: '10',
  giai: 'Kiểu gene AB/ab là dị hợp ĐỀU ⇒ giao tử liên kết là AB và ab; giao tử hoán vị là Ab và aB.\nTổng giao tử hoán vị = f = 20% ⇒ mỗi loại = f/2 = 10%.\nTổng giao tử liên kết = 100% − 20% = 80% ⇒ mỗi loại = 40%.\nVậy Ab = 10%.',
  meo: 'Giao tử hoán vị mỗi loại = f/2; giao tử liên kết mỗi loại = (1 − f)/2. Phải xác định đúng dị hợp đều hay chéo.' },

{ chuong: 'Sinh thái học', dang: 'tln', muc: 3,
  q: 'Trong một chuỗi thức ăn, sinh vật sản xuất tích luỹ được 10⁶ kcal. Biết hiệu suất sinh thái giữa các bậc dinh dưỡng liền kề đều là 10%. Năng lượng tích luỹ ở bậc dinh dưỡng cấp 3 là bao nhiêu kcal?',
  ans: '10000',
  giai: 'Bậc dinh dưỡng cấp 1 (sinh vật sản xuất): 10⁶ kcal.\nBậc cấp 2: 10⁶ × 10% = 10⁵ kcal.\nBậc cấp 3: 10⁵ × 10% = 10⁴ = 10 000 kcal.',
  meo: 'Sinh vật sản xuất là bậc dinh dưỡng cấp 1. Từ cấp 1 lên cấp 3 phải nhân hiệu suất HAI lần.' },

{ chuong: 'Giảm phân', dang: 'tln', muc: 3,
  q: 'Có 5 tế bào sinh tinh của một loài tiến hành giảm phân bình thường. Số tinh trùng được tạo ra là bao nhiêu?',
  ans: '20',
  giai: 'Mỗi tế bào sinh tinh giảm phân tạo ra 4 tinh trùng.\nSố tinh trùng = 5 × 4 = 20.',
  meo: 'Tế bào sinh tinh → 4 tinh trùng (đều hoạt động). Tế bào sinh trứng → 1 trứng + 3 thể cực.' },

{ chuong: 'Tiến hoá', dang: 'ds', muc: 3,
  q: 'Về các nhân tố tiến hoá theo thuyết tiến hoá tổng hợp hiện đại, xét các phát biểu sau:',
  items: [
    { t: 'Đột biến gene tạo ra nguồn nguyên liệu sơ cấp cho quá trình tiến hoá.', a: true },
    { t: 'Chọn lọc tự nhiên là nhân tố duy nhất làm thay đổi tần số allele theo một hướng xác định.', a: true },
    { t: 'Giao phối không ngẫu nhiên làm thay đổi tần số allele của quần thể.', a: false },
    { t: 'Các yếu tố ngẫu nhiên có thể loại bỏ hoàn toàn một allele có lợi ra khỏi quần thể.', a: true }
  ],
  giai: 'Ý a ĐÚNG: đột biến tạo allele mới ⇒ nguyên liệu sơ cấp; biến dị tổ hợp là nguyên liệu thứ cấp.\nÝ b ĐÚNG: CLTN là nhân tố ĐỊNH HƯỚNG duy nhất; các nhân tố khác đều vô hướng.\nÝ c SAI: giao phối không ngẫu nhiên chỉ làm thay đổi THÀNH PHẦN KIỂU GENE (tăng đồng hợp, giảm dị hợp), không làm thay đổi tần số allele.\nÝ d ĐÚNG: yếu tố ngẫu nhiên tác động vô hướng, đặc biệt mạnh ở quần thể nhỏ, có thể loại cả allele có lợi.',
  meo: 'Giao phối không ngẫu nhiên là nhân tố tiến hoá DUY NHẤT không làm thay đổi tần số allele — nhớ kỹ điểm này.' },

{ chuong: 'Sinh thái học', dang: 'ds', muc: 2,
  q: 'Về mối quan hệ giữa các loài trong quần xã sinh vật, xét các phát biểu sau:',
  items: [
    { t: 'Quan hệ giữa vi khuẩn Rhizobium và cây họ Đậu là quan hệ cộng sinh.', a: true },
    { t: 'Phong lan bám trên thân cây gỗ là quan hệ kí sinh.', a: false },
    { t: 'Trong quan hệ ức chế – cảm nhiễm, một loài bị hại còn loài kia không lợi cũng không hại.', a: true },
    { t: 'Cạnh tranh khác loài có thể dẫn đến sự phân li ổ sinh thái.', a: true }
  ],
  giai: 'Ý a ĐÚNG: cả hai đều có lợi và quan hệ bắt buộc ⇒ cộng sinh.\nÝ b SAI: phong lan chỉ lấy chỗ bám, không hút chất dinh dưỡng từ cây gỗ ⇒ đây là HỘI SINH (+ 0), không phải kí sinh (+ −).\nÝ c ĐÚNG: đúng định nghĩa ức chế – cảm nhiễm (0 −), ví dụ tảo giáp nở hoa tiết độc làm chết cá.\nÝ d ĐÚNG: cạnh tranh khiến các loài thu hẹp và tách biệt ổ sinh thái để cùng tồn tại.',
  meo: 'Ghi nhớ bằng dấu: cộng sinh/hợp tác (+ +) · hội sinh (+ 0) · kí sinh và SV ăn SV (+ −) · cạnh tranh (− −) · ức chế cảm nhiễm (0 −).' }
];
