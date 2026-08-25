/* ============================================================
   GỘP CÁC THẺ TRÙNG TÊN
   Tám thẻ Toán – Lí bị viết hai lần dưới cùng một cái tên: file
   gốc một bản, file bổ sung nạp sau một bản. Hai bản chồng nhau
   khoảng 70 % nhưng bản nào cũng giữ riêng một hai ý mà bản kia
   không có, nên xoá thẳng một bản là mất kiến thức.
   Ở đây viết lại thành MỘT thẻ lấy hợp của cả hai — mọi công
   thức, ví dụ, bẫy của cả hai bản đều còn — rồi bỏ bản thừa.
   Phải nạp TRƯỚC zz-bo-sung-the.js: thẻ trùng tên còn nguyên hai
   bản thì bảng "Đề hay hỏi những ý sau" bị dán vào cả hai.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

(function () {
  const GOP = [

{ kho: 'toan_ct', ten: 'Phương trình & bất phương trình mũ – log', cap: 3,
  ct: 'a<sup>f(x)</sup> = a<sup>g(x)</sup> ⇔ f(x) = g(x) &nbsp;(0 &lt; a ≠ 1)'
    + '<br>log<sub>a</sub>f(x) = log<sub>a</sub>g(x) ⇔ f(x) = g(x) &gt; 0'
    + '<br><b>Bất phương trình — nhớ chiều:</b>'
    + '<br>· a &gt; 1: a<sup>f</sup> &gt; a<sup>g</sup> ⇔ f &gt; g (giữ chiều)'
    + '<br>· 0 &lt; a &lt; 1: a<sup>f</sup> &gt; a<sup>g</sup> ⇔ f &lt; g (<b>đổi chiều</b>)'
    + '<br>Đặt ẩn phụ t = aˣ &gt; 0 cho dạng bậc hai theo aˣ.'
    + '<br>Lãi kép: <b>A = P(1 + r)ⁿ</b> · Tăng trưởng liên tục: A = P·e^(rt)',
  khi: 'Giải phương trình / bất phương trình mũ – log, đếm nghiệm nguyên, bài lãi suất – tăng trưởng dân số – phóng xạ.',
  vd: '4ˣ − 5·2ˣ + 4 = 0, đặt t = 2ˣ &gt; 0: t² − 5t + 4 = 0 ⇒ t = 1 hoặc 4 ⇒ <b>x = 0 hoặc x = 2</b>.'
    + ' · Gửi 100 triệu, lãi 6%/năm, sau 5 năm: A = 100·(1,06)⁵ ≈ <b>133,82 triệu</b>.',
  bay: 'Cơ số nhỏ hơn 1 mà quên đổi chiều bất phương trình — lỗi kinh điển.'
    + ' Luôn đặt điều kiện t &gt; 0 và điều kiện xác định của log TRƯỚC khi giải, nếu không sẽ nhận nghiệm ngoại lai.' },

{ kho: 'toan_ct', ten: 'Phương trình mặt phẳng', cap: 3,
  ct: 'Mặt phẳng qua M(x₀;y₀;z₀), pháp tuyến n⃗ = (A; B; C):'
    + '<br><b>A(x−x₀) + B(y−y₀) + C(z−z₀) = 0 ⇔ Ax + By + Cz + D = 0</b>'
    + '<br>Mặt phẳng qua 3 điểm A, B, C: n⃗ = <b>[AB⃗, AC⃗]</b>'
    + '<br>Mặt phẳng theo đoạn chắn: x/a + y/b + z/c = 1'
    + '<br>Song song ⇔ n⃗ cùng phương; vuông góc ⇔ n⃗₁·n⃗₂ = 0'
    + '<br><b>Khoảng cách từ M(x₀;y₀;z₀) đến (P):</b>'
    + '<br>&nbsp;&nbsp;<b>d = |Ax₀+By₀+Cz₀+D| / √(A²+B²+C²)</b>'
    + '<br>Góc giữa 2 mặt phẳng: cos φ = |n⃗₁·n⃗₂|/(|n⃗₁||n⃗₂|)',
  khi: 'Viết phương trình mặt phẳng — hầu như đề nào cũng có — và bài tính khoảng cách, tính góc.',
  vd: 'Mp qua M(1;2;3) và ⊥ đường thẳng có u⃗ = (2;−1;1): 2(x−1) − (y−2) + (z−3) = 0 ⇔ <b>2x − y + z − 3 = 0</b>.'
    + ' · d từ O(0;0;0) đến (P): x + 2y + 2z − 6 = 0 là |−6|/√9 = <b>2</b>.',
  bay: 'Hai mặt phẳng song song ⇔ n⃗ cùng phương và D khác nhau.'
    + ' Mặt phẳng ⊥ đường thẳng thì n⃗ của mặt phẳng chính là u⃗ của đường thẳng; mặt phẳng ∥ đường thẳng thì n⃗·u⃗ = 0.'
    + ' Nhớ lấy trị tuyệt đối ở tử công thức khoảng cách.' },

{ kho: 'toan_ct', ten: 'Phương trình đường thẳng & mặt cầu', cap: 3,
  ct: '<b>Đường thẳng</b> qua M(x₀;y₀;z₀), vectơ chỉ phương u⃗ = (a;b;c):'
    + '<br>&nbsp;&nbsp;Tham số: x = x₀+at, y = y₀+bt, z = z₀+ct'
    + '<br>&nbsp;&nbsp;Chính tắc: (x−x₀)/a = (y−y₀)/b = (z−z₀)/c &nbsp;(abc ≠ 0)'
    + '<br><b>Mặt cầu</b> tâm I(a;b;c), bán kính R: (x−a)² + (y−b)² + (z−c)² = R²'
    + '<br>&nbsp;&nbsp;Dạng khai triển: x²+y²+z²−2ax−2by−2cz+d = 0, <b>R = √(a²+b²+c²−d)</b>'
    + '<br>&nbsp;&nbsp;Điều kiện tồn tại mặt cầu: a²+b²+c²−d &gt; 0'
    + '<br>(P) tiếp xúc mặt cầu ⇔ <b>d(I, (P)) = R</b>; cắt ⇔ d &lt; R; bán kính đường tròn giao tuyến r = √(R² − d²)',
  khi: 'Viết phương trình đường thẳng, mặt cầu, tìm tâm và bán kính; câu vận dụng cao Oxyz về vị trí tương đối.',
  vd: 'x²+y²+z²−2x+4y−6z+5 = 0 ⇒ I(1;−2;3), R = √(1+4+9−5) = <b>3</b>.'
    + ' · Mặt cầu tâm I(1;2;3) tiếp xúc mp Oxy ⇒ R = d(I, Oxy) = |z<sub>I</sub>| = <b>3</b>.',
  bay: 'Dấu: hệ số là −2a nên a = −(hệ số x)/2 — nhầm dấu tâm là lỗi phổ biến nhất ở dạng này.'
    + ' Điều kiện tồn tại mặt cầu: a²+b²+c²−d &gt; 0.' },

{ kho: 'ly_ct', ten: 'Ba định luật chất khí', cap: 2,
  ct: '<b>Boyle (đẳng nhiệt, T = const):</b> p·V = const ⇒ p₁V₁ = p₂V₂'
    + '<br><b>Charles (đẳng tích, V = const):</b> p/T = const ⇒ p₁/T₁ = p₂/T₂'
    + '<br><b>Gay-Lussac (đẳng áp, p = const):</b> V/T = const ⇒ V₁/T₁ = V₂/T₂'
    + '<br>Tổng quát: <b>p₁V₁/T₁ = p₂V₂/T₂</b>. T luôn tính bằng Kelvin: T = t(°C) + 273.',
  khi: 'Mọi bài biến đổi trạng thái khí, kể cả khi một trong ba đại lượng p, V, T được giữ không đổi.',
  vd: 'Nén khí từ 2 L xuống 0,5 L ở nhiệt độ không đổi, áp suất tăng <b>4 lần</b>.'
    + ' · Nén đẳng nhiệt V còn 1/3 ⇒ p tăng <b>3 lần</b>.',
  bay: 'T phải dùng đơn vị <b>Kelvin</b>, không được dùng °C — lỗi sai phổ biến nhất chương này. 27 °C = 300 K, không phải 27.' },

{ kho: 'ly_ct', ten: 'Thuyết động học phân tử', cap: 3,
  ct: '<b>Động năng tịnh tiến trung bình 1 phân tử:</b> <b>W̄<sub>đ</sub> = (3/2)·k·T</b>'
    + '<br>k = <b>1,38·10⁻²³</b> J/K (hằng số Boltzmann); R = k·N<sub>A</sub>'
    + '<br><b>Áp suất khí:</b> p = (1/3)·μ·m·v̄² &nbsp;(μ: mật độ phân tử) = (2/3)·(N/V)·W̄<sub>đ</sub> = n₀kT'
    + '<br>Tốc độ căn quân phương: v = √(3kT/m) = √(3RT/M) ⇒ <b>v ∝ 1/√M</b>',
  khi: 'Câu hỏi về bản chất vi mô của áp suất và nhiệt độ, câu lí thuyết định lượng của chương khí.',
  vd: 'Ở 300 K, W̄<sub>đ</sub> = 1,5·1,38·10⁻²³·300 ≈ <b>6,21·10⁻²¹ J</b>.'
    + ' · Cùng T, H₂ (M = 2) chuyển động nhanh hơn O₂ (M = 32) √16 = <b>4 lần</b>.',
  bay: '<b>Nhiệt độ tuyệt đối tỉ lệ THUẬN với động năng trung bình phân tử</b> — không phụ thuộc loại khí, đây là kết luận hay ra ở câu đúng/sai.'
    + ' Cùng nhiệt độ thì mọi khí có W̄<sub>đ</sub> như nhau, nhưng TỐC ĐỘ thì khác vì khối lượng phân tử khác.' },

{ kho: 'ly_ct', ten: 'Từ thông & cảm ứng điện từ', cap: 3,
  ct: '<b>Φ = B·S·cosα</b> qua MỘT vòng &nbsp;(α: góc giữa B⃗ và <b>pháp tuyến</b> n⃗) [Φ: weber (Wb)]'
    + '<br><b>Định luật Faraday: e<sub>c</sub> = −N·ΔΦ/Δt</b> &nbsp;(dấu − là định luật Lenz)'
    + '<br>Độ lớn: |e<sub>c</sub>| = N·|ΔΦ|/Δt'
    + '<br><b>Định luật Lenz:</b> dòng cảm ứng có chiều chống lại nguyên nhân sinh ra nó.'
    + '<br>Cường độ dòng cảm ứng: i = e<sub>c</sub>/R'
    + '<br>Thanh dẫn chuyển động: e = Bℓv·sinθ',
  khi: 'Khung dây quay hoặc biến dạng trong từ trường, nam châm chuyển động qua ống dây; bài tính suất điện động cảm ứng và xác định chiều dòng cảm ứng.',
  vd: 'N = 100 vòng, ΔΦ = 0,02 Wb mỗi vòng trong 0,1 s ⇒ |e| = 100·0,02/0,1 = <b>20 V</b>.',
  bay: 'α là góc với <b>pháp tuyến</b>, không phải với mặt phẳng khung dây — khung song song B⃗ ⇒ α = 90° ⇒ Φ = 0.'
    + ' ΔΦ là biến thiên qua MỘT vòng; nhân N mới ra suất điện động của cả cuộn.' },

{ kho: 'ly_ct', ten: 'Định luật phóng xạ', cap: 3,
  ct: '<b>N = N₀·2^(−t/T) = N₀·e^(−λt)</b> &nbsp;·&nbsp; <b>m = m₀·2^(−t/T)</b>'
    + '<br><b>λ = ln2/T = 0,693/T</b> (hằng số phóng xạ)'
    + '<br><b>Độ phóng xạ: H = λN = H₀·2^(−t/T)</b> [Bq; 1 Ci = 3,7·10¹⁰ Bq]'
    + '<br>Số hạt đã phân rã: ΔN = N₀(1 − 2^(−t/T))'
    + '<br>Tỉ lệ còn/đã rã sau t: N/ΔN = 2^(−t/T)/(1 − 2^(−t/T))'
    + '<br>Tỉ số hạt con / hạt mẹ: ΔN/N = 2^(t/T) − 1',
  khi: 'Bài tính lượng chất phóng xạ còn lại, xác định tuổi cổ vật (C-14), tính tỉ lệ mẹ/con.',
  vd: 'Sau 3 chu kì bán rã, còn lại 1/2³ = <b>1/8 = 12,5 %</b> lượng ban đầu; đã phân rã <b>7/8 = 87,5 %</b>.',
  bay: 'Đề hỏi "đã phân rã bao nhiêu" ⇒ lấy N₀ − N, đừng trả lời phần còn lại.'
    + ' Tỉ số hạt con / hạt mẹ = 2^(t/T) − 1 chứ không phải 2^(t/T).' },

{ kho: 'ly_ct', ten: 'Năng lượng phản ứng hạt nhân', cap: 3,
  ct: '<b>ΔE = (m<sub>trước</sub> − m<sub>sau</sub>)·c²</b> = (Σm<sub>trước</sub> − Σm<sub>sau</sub>)·931,5 (MeV)'
    + '<br>Hoặc: <b>ΔE = ΣW<sub>lk sau</sub> − ΣW<sub>lk trước</sub></b> = ΣΔm<sub>sau</sub>·931,5 − ΣΔm<sub>trước</sub>·931,5'
    + '<br>ΔE &gt; 0: <b>toả</b> năng lượng · ΔE &lt; 0: <b>thu</b> năng lượng'
    + '<br><b>Bảo toàn:</b> số nuclon A, điện tích Z, động lượng, năng lượng toàn phần.',
  khi: 'Phản ứng phân hạch, nhiệt hạch, bắn phá hạt nhân; tính năng lượng toả ra của 1 kg nhiên liệu.',
  vd: 'Δm = 0,2 u ⇒ ΔE = 0,2·931,5 ≈ <b>186,3 MeV</b> toả ra.'
    + ' · Phản ứng toả năng lượng khi sản phẩm có <b>ε lớn hơn</b> ⇒ bền vững hơn.',
  bay: 'Trong phản ứng hạt nhân, khối lượng KHÔNG bảo toàn (chỉ bảo toàn A và Z) — bẫy đúng/sai kinh điển.'
    + ' Khối lượng GIẢM thì toả năng lượng, nhớ chiều: "hụt khối thì sinh năng lượng".' }

  ];

  let daGop = 0, daBo = 0, thieu = [];
  GOP.forEach(g => {
    const kho = TD.KHO[g.kho] || [];
    const vt = [];
    kho.forEach((x, i) => { if ((x.chu_de || x.ten) === g.ten) vt.push(i); });
    if (!vt.length) { thieu.push(g.kho + ' · ' + g.ten); return; }
    /* giữ bản đầu làm chỗ đứng để không xáo trộn thứ tự thẻ trong nhóm */
    const giu = kho[vt[0]];
    giu.ct = g.ct; giu.khi = g.khi; giu.vd = g.vd; giu.bay = g.bay;
    if (g.cap) giu.cap = g.cap;
    daGop++;
    for (let j = vt.length - 1; j >= 1; j--) { kho.splice(vt[j], 1); daBo++; }
  });
  TD._gopThe = { gop: daGop, bo: daBo, thieu: thieu };
})();
