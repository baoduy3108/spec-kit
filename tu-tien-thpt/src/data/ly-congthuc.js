/* ============================================================
   VẬT LÍ — BÍ KÍP CÔNG THỨC (Lôi Đình Điện)
   Trọng tâm: Vật lí 12 CT GDPT 2018 (4 chương) + phần 10, 11 hay ra.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

TD.KHO.ly_ct = [
/* ================= CHƯƠNG I: VẬT LÍ NHIỆT ================= */
{ nhom: 'I. Vật lí nhiệt', ten: 'Thang nhiệt độ & nội năng', cap: 1,
  ct: '<b>T(K) = t(°C) + 273</b> &nbsp;·&nbsp; ΔT(K) = Δt(°C)<br>t(°F) = 1,8·t(°C) + 32<br><b>Nội năng U</b> = tổng động năng chuyển động nhiệt + thế năng tương tác của các phân tử.<br>Nội năng phụ thuộc <b>nhiệt độ và thể tích</b>.',
  khi: 'Câu lý thuyết mở đầu, đổi đơn vị.',
  vd: '27 °C = 300 K. Tăng 20 °C cũng chính là tăng 20 K.',
  bay: 'Độ chênh lệch nhiệt độ trong thang K và °C là BẰNG NHAU — nhưng giá trị tuyệt đối thì khác 273.' },

{ nhom: 'I. Vật lí nhiệt', ten: 'Nhiệt lượng & phương trình cân bằng nhiệt', cap: 2,
  ct: '<b>Q = m·c·Δt</b> &nbsp;(c: nhiệt dung riêng, J/kg·K)<br><b>Cân bằng nhiệt: Q<sub>toả</sub> = Q<sub>thu</sub></b><br>Nhiệt dung: C = m·c (J/K)<br>c<sub>nước</sub> = <b>4200</b> J/kg·K · c<sub>nhôm</sub> = 880 · c<sub>đồng</sub> = 380 · c<sub>sắt</sub> = 460',
  khi: 'Bài trộn các chất ở nhiệt độ khác nhau, đun nóng.',
  vd: 'Thả 0,5 kg đồng ở 100 °C vào 2 kg nước ở 20 °C: 0,5·380·(100−t) = 2·4200·(t−20) ⇒ t ≈ <b>21,1 °C</b>.',
  bay: 'Nếu có chuyển thể (đá tan, nước sôi) thì phải cộng thêm Q = λm hoặc Q = Lm.' },

{ nhom: 'I. Vật lí nhiệt', ten: 'Nhiệt nóng chảy & nhiệt hoá hơi riêng', cap: 2,
  ct: '<b>Q = λ·m</b> &nbsp;(nóng chảy / đông đặc; λ: nhiệt nóng chảy riêng, J/kg)<br><b>Q = L·m</b> &nbsp;(hoá hơi / ngưng tụ; L: nhiệt hoá hơi riêng, J/kg)<br>λ<sub>nước đá</sub> = <b>3,34·10⁵</b> J/kg &nbsp;·&nbsp; L<sub>nước</sub> = <b>2,26·10⁶</b> J/kg',
  khi: 'Bài có đá tan, nước sôi bay hơi — nhiệt độ KHÔNG đổi trong quá trình chuyển thể.',
  vd: 'Làm tan hoàn toàn 0,2 kg nước đá ở 0 °C cần Q = 3,34·10⁵ · 0,2 = <b>66,8 kJ</b>.',
  bay: 'Trong lúc chuyển thể, nhiệt độ đứng yên ⇒ KHÔNG dùng công thức mcΔt cho giai đoạn đó.' },

{ nhom: 'I. Vật lí nhiệt', ten: 'Định luật I nhiệt động lực học', cap: 3,
  ct: '<b>ΔU = A + Q</b><br>Q &gt; 0: hệ <b>nhận</b> nhiệt · Q &lt; 0: hệ <b>toả</b> nhiệt<br>A &gt; 0: hệ <b>nhận</b> công (bị nén) · A &lt; 0: hệ <b>sinh</b> công (giãn nở)<br>Công khí thực hiện khi giãn đẳng áp: A = −p·ΔV',
  khi: 'Mọi bài về quá trình biến đổi trạng thái khí.',
  vd: 'Khí nhận 200 J nhiệt và sinh công 80 J: ΔU = −80 + 200 = <b>+120 J</b> (nội năng tăng).',
  bay: 'Quy ước dấu là chỗ mất điểm nhiều nhất. Quá trình <b>đẳng nhiệt</b>: ΔU = 0 ⇒ Q = −A. Quá trình <b>đoạn nhiệt</b>: Q = 0 ⇒ ΔU = A. Quá trình <b>đẳng tích</b>: A = 0 ⇒ ΔU = Q.' },

/* ================= CHƯƠNG II: KHÍ LÍ TƯỞNG ================= */
{ nhom: 'II. Khí lí tưởng', ten: 'Ba định luật chất khí', cap: 2,
  ct: '<b>Boyle (đẳng nhiệt, T = const):</b> p·V = const ⇒ p₁V₁ = p₂V₂<br><b>Charles (đẳng tích, V = const):</b> p/T = const ⇒ p₁/T₁ = p₂/T₂<br><b>Gay-Lussac (đẳng áp, p = const):</b> V/T = const ⇒ V₁/T₁ = V₂/T₂',
  khi: 'Khi một trong ba đại lượng p, V, T được giữ không đổi.',
  vd: 'Nén khí từ 2 L xuống 0,5 L ở nhiệt độ không đổi, áp suất tăng <b>4 lần</b>.',
  bay: 'T phải dùng đơn vị <b>Kelvin</b>, không được dùng °C. Đây là lỗi sai phổ biến nhất chương này.' },

{ nhom: 'II. Khí lí tưởng', ten: 'Phương trình trạng thái & Clapeyron–Mendeleev', cap: 3,
  ct: '<b>p₁V₁/T₁ = p₂V₂/T₂</b> &nbsp;(cùng một lượng khí)<br><b>pV = nRT</b> &nbsp;với n = m/M<br>R = <b>8,31</b> J/(mol·K) &nbsp;[p: Pa, V: m³, T: K]<br>Khối lượng riêng: ρ = m/V = pM/(RT)',
  khi: 'Bài đổi cả 3 thông số, hoặc bài cho khối lượng/số mol khí.',
  vd: 'n = 0,5 mol khí ở 300 K, V = 10 L = 0,01 m³ ⇒ p = nRT/V = 0,5·8,31·300/0,01 ≈ <b>1,25·10⁵ Pa</b>.',
  bay: 'Đơn vị: 1 atm = 1,013·10⁵ Pa; 1 L = 10⁻³ m³. Sai đơn vị là sai cả bài.' },

{ nhom: 'II. Khí lí tưởng', ten: 'Thuyết động học phân tử', cap: 3,
  ct: '<b>Áp suất khí:</b> p = (1/3)·μ·m·v̄² &nbsp;(μ: mật độ phân tử)<br><b>Động năng trung bình 1 phân tử:</b> <b>W̄<sub>đ</sub> = (3/2)·k·T</b><br>k = <b>1,38·10⁻²³</b> J/K (hằng số Boltzmann); R = k·N<sub>A</sub><br>Vận tốc căn quân phương: v = √(3kT/m) = √(3RT/M)',
  khi: 'Câu hỏi về bản chất vi mô của áp suất và nhiệt độ.',
  vd: 'Ở 300 K, W̄<sub>đ</sub> = 1,5·1,38·10⁻²³·300 ≈ <b>6,21·10⁻²¹ J</b>.',
  bay: '<b>Nhiệt độ tuyệt đối tỉ lệ THUẬN với động năng trung bình phân tử</b> — không phụ thuộc loại khí. Đây là kết luận hay ra ở câu đúng/sai.' },

/* ================= CHƯƠNG III: TỪ TRƯỜNG ================= */
{ nhom: 'III. Từ trường', ten: 'Cảm ứng từ & lực từ', cap: 2,
  ct: '<b>F = B·I·L·sinα</b> &nbsp;(α: góc giữa dây dẫn và B⃗)<br>⇒ B = F/(I·L·sinα) &nbsp;[B: tesla (T)]<br><b>Lực Lorentz:</b> f = |q|·v·B·sinθ<br>Bán kính quỹ đạo hạt trong từ trường: R = mv/(|q|B)',
  khi: 'Bài dây dẫn mang dòng điện đặt trong từ trường; hạt mang điện chuyển động.',
  vd: 'Dây dài 0,2 m, I = 5 A, B = 0,4 T, vuông góc ⇒ F = 0,4·5·0,2·1 = <b>0,4 N</b>.',
  bay: 'Dây dẫn <b>song song</b> với B⃗ (α = 0) ⇒ F = 0. Quy tắc bàn tay trái xác định chiều lực.' },

{ nhom: 'III. Từ trường', ten: 'Từ thông & cảm ứng điện từ', cap: 3,
  ct: '<b>Φ = N·B·S·cosα</b> &nbsp;(α: góc giữa B⃗ và <b>pháp tuyến</b> n⃗) [Φ: weber (Wb)]<br><b>Định luật Faraday: e<sub>c</sub> = −N·ΔΦ/Δt</b> &nbsp;(dấu − là định luật Lenz)<br>Độ lớn: |e<sub>c</sub>| = N·|ΔΦ|/Δt<br>Cường độ dòng cảm ứng: i = e<sub>c</sub>/R',
  khi: 'Khung dây quay/biến dạng trong từ trường, nam châm chuyển động qua ống dây.',
  vd: 'N = 100 vòng, ΔΦ = 0,02 Wb trong 0,1 s ⇒ |e| = 100·0,02/0,1 = <b>20 V</b>.',
  bay: 'α là góc với <b>pháp tuyến</b>, không phải với mặt phẳng khung dây. Khung song song B⃗ ⇒ α = 90° ⇒ Φ = 0.' },

{ nhom: 'III. Từ trường', ten: 'Định luật Lenz', cap: 2,
  ct: '<b>Dòng điện cảm ứng có chiều sao cho từ trường nó sinh ra CHỐNG LẠI sự biến thiên từ thông đã sinh ra nó.</b><br>Φ <b>tăng</b> → B⃗<sub>cảm ứng</sub> <b>ngược chiều</b> B⃗<br>Φ <b>giảm</b> → B⃗<sub>cảm ứng</sub> <b>cùng chiều</b> B⃗',
  khi: 'Xác định chiều dòng điện cảm ứng.',
  vd: 'Đưa cực Bắc nam châm lại gần ống dây ⇒ Φ tăng ⇒ ống dây sinh cực Bắc để đẩy nam châm ra.',
  bay: 'Lenz là hệ quả của bảo toàn năng lượng — "chống lại" chứ không phải "triệt tiêu".' },

{ nhom: 'III. Từ trường', ten: 'Dòng điện xoay chiều & máy biến áp', cap: 3,
  ct: 'e = E₀cos(ωt + φ); <b>E₀ = NBSω</b> · <b>U = U₀/√2 ; I = I₀/√2</b><br><b>Máy biến áp:</b> U₁/U₂ = N₁/N₂ = I₂/I₁<br>Công suất hao phí trên đường dây: <b>P<sub>hp</sub> = P²R/(U²cos²φ)</b><br>Hiệu suất truyền tải: H = (P − P<sub>hp</sub>)/P',
  khi: 'Bài máy phát, máy biến áp, truyền tải điện năng.',
  vd: 'N₁ = 1000, N₂ = 200, U₁ = 220 V ⇒ U₂ = 220·200/1000 = <b>44 V</b> (máy hạ áp).',
  bay: 'Tăng U lên k lần thì hao phí giảm <b>k²</b> lần — đây là lý do phải truyền tải điện cao thế.' },

/* ================= CHƯƠNG IV: VẬT LÍ HẠT NHÂN ================= */
{ nhom: 'IV. Hạt nhân', ten: 'Cấu tạo hạt nhân & độ hụt khối', cap: 2,
  ct: 'Hạt nhân <sup>A</sup><sub>Z</sub>X có <b>Z proton</b>, <b>(A − Z) neutron</b>, A nuclon.<br><b>Độ hụt khối: Δm = Z·m<sub>p</sub> + (A−Z)·m<sub>n</sub> − m<sub>hn</sub></b><br>m<sub>p</sub> = 1,00728 u · m<sub>n</sub> = 1,00866 u · <b>1u = 931,5 MeV/c²</b>',
  khi: 'Mọi bài tính năng lượng hạt nhân.',
  vd: 'Δm = 0,03 u ⇒ W<sub>lk</sub> = 0,03·931,5 ≈ <b>27,9 MeV</b>.',
  bay: 'Khối lượng hạt nhân LUÔN nhỏ hơn tổng khối lượng các nuclon riêng lẻ — phần thiếu chính là năng lượng liên kết.' },

{ nhom: 'IV. Hạt nhân', ten: 'Năng lượng liên kết & độ bền vững', cap: 2,
  ct: '<b>W<sub>lk</sub> = Δm·c² = Δm(u)·931,5 (MeV)</b><br><b>Năng lượng liên kết riêng: ε = W<sub>lk</sub>/A</b><br>Hạt nhân có <b>ε càng lớn càng bền vững</b>. Bền nhất: A ≈ 50–80 (Fe, Ni, ε ≈ 8,8 MeV/nuclon).',
  khi: 'So sánh độ bền vững các hạt nhân.',
  vd: '<sup>4</sup><sub>2</sub>He có W<sub>lk</sub> = 28,3 MeV ⇒ ε = 28,3/4 = <b>7,08 MeV/nuclon</b>.',
  bay: 'So sánh độ bền phải dùng <b>ε (W<sub>lk</sub>/A)</b>, KHÔNG dùng W<sub>lk</sub>. Hạt nhân nặng có W<sub>lk</sub> lớn nhưng chưa chắc bền hơn.' },

{ nhom: 'IV. Hạt nhân', ten: 'Định luật phóng xạ', cap: 3,
  ct: '<b>N = N₀·2^(−t/T) = N₀·e^(−λt)</b> &nbsp;·&nbsp; <b>m = m₀·2^(−t/T)</b><br><b>λ = ln2/T = 0,693/T</b> (hằng số phóng xạ)<br><b>Độ phóng xạ: H = λN = H₀·2^(−t/T)</b> [Bq; 1 Ci = 3,7·10¹⁰ Bq]<br>Số hạt đã phân rã: ΔN = N₀(1 − 2^(−t/T))<br>Tỉ lệ còn/đã rã sau t: N/ΔN = 2^(−t/T)/(1 − 2^(−t/T))',
  khi: 'Bài tính lượng chất phóng xạ còn lại, xác định tuổi cổ vật (C-14).',
  vd: 'Sau 3 chu kì bán rã, còn lại 1/2³ = <b>1/8</b> lượng ban đầu; đã phân rã <b>7/8</b>.',
  bay: 'Đề hỏi "đã phân rã bao nhiêu" ⇒ lấy N₀ − N, đừng trả lời phần còn lại.' },

{ nhom: 'IV. Hạt nhân', ten: 'Các loại phóng xạ', cap: 2,
  ct: '<b>α</b> (<sup>4</sup><sub>2</sub>He): A giảm 4, Z giảm 2 — đâm xuyên yếu, ion hoá mạnh<br><b>β⁻</b> (<sup>0</sup><sub>−1</sub>e): A không đổi, <b>Z tăng 1</b> (n → p + e⁻ + ν̄)<br><b>β⁺</b> (<sup>0</sup><sub>+1</sub>e): A không đổi, <b>Z giảm 1</b> (p → n + e⁺ + ν)<br><b>γ</b>: sóng điện từ, A và Z <b>không đổi</b> — đâm xuyên mạnh nhất',
  khi: 'Xác định hạt nhân con, viết phương trình phân rã.',
  vd: '<sup>238</sup><sub>92</sub>U → α → <sup>234</sup><sub>90</sub>Th.',
  bay: 'β⁻ làm Z TĂNG (không phải giảm), vì neutron biến thành proton.' },

{ nhom: 'IV. Hạt nhân', ten: 'Năng lượng phản ứng hạt nhân', cap: 3,
  ct: '<b>ΔE = (m<sub>trước</sub> − m<sub>sau</sub>)·c²</b> = (Σm<sub>trước</sub> − Σm<sub>sau</sub>)·931,5 (MeV)<br>Hoặc: <b>ΔE = W<sub>lk sau</sub> − W<sub>lk trước</sub></b> = ΣΔm<sub>sau</sub>·931,5 − ΣΔm<sub>trước</sub>·931,5<br>ΔE &gt; 0: <b>toả</b> năng lượng · ΔE &lt; 0: <b>thu</b> năng lượng<br><b>Bảo toàn:</b> số nuclon A, điện tích Z, động lượng, năng lượng toàn phần.',
  khi: 'Phản ứng phân hạch, nhiệt hạch, bắn phá hạt nhân.',
  vd: 'Phản ứng toả năng lượng khi sản phẩm có <b>ε lớn hơn</b> ⇒ bền vững hơn.',
  bay: 'Trong phản ứng hạt nhân, khối lượng KHÔNG bảo toàn (chỉ bảo toàn A và Z). Đây là bẫy đúng/sai kinh điển.' },

{ nhom: 'IV. Hạt nhân', ten: 'Phân hạch & nhiệt hạch', cap: 2,
  ct: '<b>Phân hạch:</b> hạt nhân <b>nặng</b> (U-235, Pu-239) hấp thụ neutron chậm → 2 hạt trung bình + 2–3 neutron + ~200 MeV. Điều kiện duy trì: <b>k ≥ 1</b> (hệ số nhân neutron).<br><b>Nhiệt hạch:</b> 2 hạt nhân <b>rất nhẹ</b> (D, T) hợp lại → hạt nặng hơn. Điều kiện: nhiệt độ <b>~10⁸ K</b>.<br>Nhiệt hạch toả năng lượng <b>nhiều hơn trên mỗi nuclon</b> và <b>sạch hơn</b> phân hạch.',
  khi: 'Câu lý thuyết về năng lượng hạt nhân, nhà máy điện nguyên tử, Mặt Trời.',
  vd: 'Mặt Trời phát năng lượng nhờ phản ứng <b>nhiệt hạch</b> (4 H → He).',
  bay: 'Nhiệt hạch toả nhiều năng lượng hơn TÍNH TRÊN MỖI NUCLON; còn 1 phản ứng phân hạch đơn lẻ (~200 MeV) lại toả nhiều hơn 1 phản ứng nhiệt hạch (~17,6 MeV).' },

/* ================= PHẦN LỚP 10 – 11 HAY RA ================= */
{ nhom: 'V. Lớp 10–11', ten: 'Động học & động lực học (lớp 10)', cap: 2,
  ct: 'v = v₀ + at · s = v₀t + ½at² · <b>v² − v₀² = 2as</b><br>Rơi tự do: v = gt; h = ½gt² (g ≈ 9,8 m/s²)<br><b>Định luật II Newton: F⃗ = m·a⃗</b><br>Lực ma sát: F<sub>ms</sub> = μN · Lực đàn hồi: F = k·|Δl|<br><b>Động lượng: p⃗ = m·v⃗</b> — bảo toàn trong hệ kín',
  khi: 'Câu về chuyển động, va chạm.',
  vd: 'Vật rơi tự do 2 s: h = ½·9,8·4 = <b>19,6 m</b>.',
  bay: 'Va chạm mềm: động lượng bảo toàn nhưng động năng KHÔNG bảo toàn.' },

{ nhom: 'V. Lớp 10–11', ten: 'Công – Năng lượng (lớp 10)', cap: 2,
  ct: '<b>A = F·s·cosα</b> [J] · <b>P = A/t = F·v</b> [W]<br>Động năng: W<sub>đ</sub> = ½mv² · Thế năng: W<sub>t</sub> = mgh<br><b>Cơ năng W = W<sub>đ</sub> + W<sub>t</sub></b> — bảo toàn khi chỉ có lực thế<br>Hiệu suất: H = A<sub>có ích</sub>/A<sub>toàn phần</sub>',
  khi: 'Bài chuyển hoá năng lượng, tính công suất.',
  vd: 'Vật 2 kg rơi từ 5 m: v = √(2gh) = √(2·9,8·5) ≈ <b>9,9 m/s</b>.',
  bay: 'α là góc giữa lực và <b>độ dịch chuyển</b>. Lực vuông góc với chuyển động sinh công bằng 0.' },

{ nhom: 'V. Lớp 10–11', ten: 'Điện trường & dòng điện (lớp 11)', cap: 2,
  ct: '<b>Coulomb: F = k·|q₁q₂|/(εr²)</b>, k = 9·10⁹<br>Cường độ điện trường: E = F/q = kQ/(εr²) [V/m]<br>Hiệu điện thế: U = E·d · Công lực điện: A = qU<br><b>Định luật Ohm: I = U/R</b> · Toàn mạch: <b>I = ξ/(R + r)</b><br>Điện năng: A = UIt · Nhiệt Joule–Lenz: <b>Q = I²Rt</b>',
  khi: 'Bài mạch điện, tụ điện, điện tích.',
  vd: 'ξ = 12 V, r = 1 Ω, R = 5 Ω ⇒ I = 12/6 = <b>2 A</b>; U<sub>mạch ngoài</sub> = 10 V.',
  bay: 'Nối tiếp: R = ΣRᵢ, I chung. Song song: 1/R = Σ(1/Rᵢ), U chung.' },

{ nhom: 'V. Lớp 10–11', ten: 'Dao động & sóng (lớp 11)', cap: 3,
  ct: 'x = Acos(ωt + φ) · v = −ωAsin(ωt+φ) · a = −ω²x<br><b>v<sub>max</sub> = ωA</b> · <b>a<sub>max</sub> = ω²A</b> · Hệ thức độc lập: <b>A² = x² + v²/ω²</b><br>Con lắc lò xo: ω = √(k/m), T = 2π√(m/k)<br>Con lắc đơn: T = 2π√(l/g)<br><b>Sóng: v = λf = λ/T</b> · Độ lệch pha: Δφ = 2πd/λ',
  khi: 'Câu dao động điều hoà, sóng cơ, sóng âm.',
  vd: 'A = 5 cm, ω = 10 rad/s ⇒ v<sub>max</sub> = <b>50 cm/s</b>, a<sub>max</sub> = <b>500 cm/s²</b>.',
  bay: 'a luôn NGƯỢC dấu với x và hướng về vị trí cân bằng. Tại biên: v = 0, a cực đại. Tại VTCB: v cực đại, a = 0.' }
];

TD.KHO.ly_ct.push(
{ nhom: 'I. Vật lí nhiệt', ten: 'Số mol, khối lượng & số phân tử', cap: 2,
  ct: '<b>n = m/M = N/N<sub>A</sub></b> với N<sub>A</sub> = 6,02·10²³ phân tử/mol<br>' +
      'Số phân tử: N = n·N<sub>A</sub> = (m/M)·N<sub>A</sub><br>' +
      'Khối lượng một phân tử: m₀ = M/N<sub>A</sub><br>' +
      '<b>Liên hệ hằng số:</b> R = k·N<sub>A</sub> ⇒ 8,31 = 1,38·10⁻²³ × 6,02·10²³',
  khi: 'Bài nối giữa vĩ mô (khối lượng, áp suất) và vi mô (số phân tử, động năng).',
  vd: '2 g khí H₂ (M = 2) là 1 mol, chứa 6,02·10²³ phân tử.',
  bay: 'Đừng nhầm khối lượng mol M (g/mol) với khối lượng một phân tử m₀ (kg).' },

{ nhom: 'I. Vật lí nhiệt', ten: 'Hiệu suất & động cơ nhiệt', cap: 3,
  ct: '<b>H = A/Q₁ = (Q₁ − Q₂)/Q₁</b><br>' +
      '&nbsp;&nbsp;Q₁: nhiệt nhận từ nguồn nóng · Q₂: nhiệt nhả cho nguồn lạnh · A: công sinh ra<br>' +
      '<b>Hiệu suất cực đại (chu trình Carnot):</b> H<sub>max</sub> = 1 − T₂/T₁ (nhiệt độ tính bằng K)<br>' +
      'Hiệu suất luôn nhỏ hơn 100% — hệ quả của nguyên lí II nhiệt động lực học.',
  khi: 'Câu về động cơ nhiệt, hiệu suất chuyển hoá năng lượng.',
  vd: 'Nguồn nóng 500 K, nguồn lạnh 300 K ⇒ H<sub>max</sub> = 1 − 300/500 = <b>40%</b>.',
  bay: 'Không thể có động cơ nhiệt hiệu suất 100% — mọi phương án ghi 100% đều sai.' },

{ nhom: 'II. Khí lí tưởng', ten: 'Đồ thị các đẳng quá trình', cap: 3,
  ct: '<table class="kq small"><tr><th>Quá trình</th><th>p–V</th><th>p–T</th><th>V–T</th></tr>' +
      '<tr><td>Đẳng nhiệt (T const)</td><td><b>hypebol</b></td><td>đường thẳng đứng</td><td>đường thẳng đứng</td></tr>' +
      '<tr><td>Đẳng tích (V const)</td><td>đường thẳng đứng</td><td><b>đường thẳng qua gốc O</b></td><td>đường thẳng ngang</td></tr>' +
      '<tr><td>Đẳng áp (p const)</td><td>đường thẳng ngang</td><td>đường thẳng ngang</td><td><b>đường thẳng qua gốc O</b></td></tr></table>' +
      'Đường đẳng nhiệt ở nhiệt độ càng cao thì càng xa gốc toạ độ trên đồ thị p–V.',
  khi: 'Câu cho đồ thị rồi hỏi quá trình nào, hoặc so sánh trạng thái.',
  vd: 'Đường thẳng kéo dài đi qua gốc toạ độ trên đồ thị p–T ⇒ đó là quá trình ĐẲNG TÍCH.',
  bay: 'Đường thẳng qua gốc toạ độ chỉ đúng khi trục nhiệt độ là KELVIN. Với trục °C thì đường thẳng cắt trục tại −273.' },

{ nhom: 'III. Từ trường', ten: 'Cảm ứng từ của dòng điện', cap: 3,
  ct: '<b>Dây dẫn thẳng dài:</b> B = 2·10⁻⁷·I/r<br>' +
      '<b>Tâm vòng dây tròn</b> bán kính R, N vòng: B = 2π·10⁻⁷·N·I/R<br>' +
      '<b>Trong lòng ống dây dài:</b> <b>B = 4π·10⁻⁷·n·I</b> với n = N/ℓ (số vòng trên mỗi mét)<br>' +
      '<b>Nguyên lí chồng chất:</b> B⃗ = B⃗₁ + B⃗₂ + … (cộng vectơ)',
  khi: 'Bài tính từ trường do dòng điện sinh ra.',
  vd: 'Ống dây dài 50 cm có 1000 vòng, I = 2 A ⇒ n = 2000 vòng/m ⇒ B = 4π·10⁻⁷·2000·2 ≈ <b>5,03·10⁻³ T</b>.',
  bay: 'Trong công thức ống dây, n là số vòng TRÊN MỖI MÉT, không phải tổng số vòng N.' },

{ nhom: 'III. Từ trường', ten: 'Chuyển động của hạt trong từ trường', cap: 3,
  ct: '<b>Lực Lorentz: f = |q|·v·B·sinθ</b><br>' +
      'Hạt bay <b>vuông góc</b> với B⃗ ⇒ chuyển động <b>tròn đều</b> với:<br>' +
      '&nbsp;&nbsp;<b>Bán kính R = mv/(|q|B)</b><br>' +
      '&nbsp;&nbsp;Chu kì T = 2πm/(|q|B) — <b>không phụ thuộc vận tốc</b><br>' +
      'Lực Lorentz luôn vuông góc vận tốc ⇒ <b>không sinh công</b>, không đổi độ lớn vận tốc.',
  khi: 'Câu về máy gia tốc, ống phóng điện tử, khối phổ kế.',
  vd: 'Hạt bay SONG SONG với B⃗ (θ = 0) ⇒ f = 0 ⇒ chuyển động thẳng đều.',
  bay: 'Chu kì chuyển động tròn KHÔNG phụ thuộc vào vận tốc hạt — kết quả phản trực giác nhưng hay được hỏi.' },

{ nhom: 'III. Từ trường', ten: 'Dòng điện xoay chiều — công suất', cap: 3,
  ct: '<b>Máy phát điện xoay chiều:</b> tần số f = n·p/60 (n vòng/phút, p số cặp cực) hoặc f = n·p (n vòng/giây)<br>' +
      '<b>Suất điện động cực đại:</b> E₀ = NBSω với ω = 2πf<br>' +
      '<b>Giá trị hiệu dụng:</b> U = U₀/√2 ; I = I₀/√2 ; E = E₀/√2<br>' +
      '<b>Công suất tiêu thụ:</b> P = U·I·cosφ &nbsp;·&nbsp; <b>Công suất toả nhiệt:</b> P = I²R<br>' +
      '<b>Hiệu suất truyền tải:</b> H = (P − P<sub>hp</sub>)/P với P<sub>hp</sub> = P²R/(U²cos²φ)',
  khi: 'Bài máy phát, truyền tải điện năng.',
  vd: 'Máy phát có 4 cặp cực quay 750 vòng/phút ⇒ f = 750·4/60 = <b>50 Hz</b>.',
  bay: 'Số cặp cực p khác số cực (số cực = 2p). Đọc kỹ đề cho cái nào.' },

{ nhom: 'IV. Hạt nhân', ten: 'Số hạt nhân trong một mẫu chất', cap: 3,
  ct: '<b>N = (m/A)·N<sub>A</sub></b> với A là số khối (coi như khối lượng mol tính bằng g/mol)<br>' +
      '<b>Độ phóng xạ: H = λ·N</b> với λ = ln2/T<br>' +
      '&nbsp;&nbsp;H = H₀·2^(−t/T), đơn vị becquerel (Bq); 1 Ci = 3,7·10¹⁰ Bq<br>' +
      '<b>Số hạt đã phân rã:</b> ΔN = N₀(1 − 2^(−t/T))<br>' +
      '<b>Tỉ số còn lại / đã rã:</b> N/ΔN = 2^(−t/T)/(1 − 2^(−t/T))',
  khi: 'Bài tính số hạt, độ phóng xạ, xác định tuổi cổ vật.',
  vd: '1 g ²³⁸U chứa N = (1/238)·6,02·10²³ ≈ <b>2,53·10²¹</b> hạt nhân.',
  bay: 'Chu kì bán rã T và hằng số phóng xạ λ tỉ lệ NGHỊCH: λ = ln2/T ≈ 0,693/T.' },

{ nhom: 'IV. Hạt nhân', ten: 'Năng lượng phân hạch & nhiệt hạch', cap: 3,
  ct: '<b>Năng lượng toả ra của N phản ứng:</b> E = N·ΔE<br>' +
      'Với m gam nhiên liệu: N = (m/A)·N<sub>A</sub> ⇒ <b>E = (m/A)·N<sub>A</sub>·ΔE</b><br>' +
      '<b>Phân hạch ²³⁵U:</b> mỗi phản ứng toả ≈ <b>200 MeV</b><br>' +
      '<b>Nhiệt hạch D–T:</b> mỗi phản ứng toả ≈ <b>17,6 MeV</b><br>' +
      'Đổi đơn vị: 1 MeV = 1,6·10⁻¹³ J · 1 eV = 1,6·10⁻¹⁹ J',
  khi: 'Bài tính năng lượng nhà máy điện hạt nhân, so sánh với nhiên liệu hoá thạch.',
  vd: '1 g ²³⁵U phân hạch hết toả ≈ (1/235)·6,02·10²³·200 MeV ≈ <b>8,2·10¹⁰ J</b> — tương đương gần 3 tấn than.',
  bay: 'Tính trên MỖI NUCLON thì nhiệt hạch toả nhiều hơn; nhưng một phản ứng phân hạch đơn lẻ lại toả nhiều hơn.' },

{ nhom: 'IV. Hạt nhân', ten: 'Bảo toàn trong phản ứng hạt nhân', cap: 3,
  ct: 'Với phản ứng A + B → C + D, các đại lượng <b>bảo toàn</b>:<br>' +
      '&nbsp;&nbsp;① <b>Số nuclon A</b> (số khối) &nbsp;② <b>Điện tích Z</b><br>' +
      '&nbsp;&nbsp;③ <b>Động lượng</b> p⃗ &nbsp;④ <b>Năng lượng toàn phần</b><br>' +
      '<b>KHÔNG bảo toàn:</b> khối lượng nghỉ, số proton riêng, số neutron riêng.<br>' +
      '<b>Năng lượng phản ứng:</b> ΔE = (m<sub>trước</sub> − m<sub>sau</sub>)·931,5 (MeV) = W<sub>lk sau</sub> − W<sub>lk trước</sub><br>' +
      'Liên hệ động lượng – động năng: <b>p² = 2mW<sub>đ</sub></b>',
  khi: 'Viết phương trình phản ứng, tính năng lượng, tính động năng các hạt.',
  vd: 'Cân bằng ²³⁵U + n → ¹⁴⁴Ba + ⁸⁹Kr + x·n ⇒ theo số khối: 236 = 144 + 89 + x ⇒ <b>x = 3</b>.',
  bay: 'Số proton và số neutron riêng lẻ KHÔNG bảo toàn, chỉ tổng số nuclon mới bảo toàn.' },

{ nhom: 'V. Lớp 10–11', ten: 'Momen lực & cân bằng vật rắn', cap: 2,
  ct: '<b>M = F·d</b> (d là cánh tay đòn — khoảng cách từ trục quay đến giá của lực), đơn vị N·m<br>' +
      '<b>Điều kiện cân bằng của vật có trục quay:</b> ΣM<sub>thuận</sub> = ΣM<sub>nghịch</sub><br>' +
      '<b>Điều kiện cân bằng của chất điểm:</b> ΣF⃗ = 0⃗<br>' +
      '<b>Quy tắc hợp lực song song cùng chiều:</b> F = F₁ + F₂ và F₁/F₂ = d₂/d₁',
  khi: 'Bài đòn bẩy, cân, thanh chịu lực.',
  vd: 'Lực có giá đi qua trục quay thì cánh tay đòn d = 0 ⇒ momen bằng 0, không làm vật quay.',
  bay: 'Cánh tay đòn là khoảng cách VUÔNG GÓC từ trục quay tới giá của lực, không phải tới điểm đặt lực.' },

{ nhom: 'V. Lớp 10–11', ten: 'Sóng cơ & giao thoa', cap: 3,
  ct: '<b>v = λf = λ/T</b><br>' +
      '<b>Độ lệch pha giữa hai điểm</b> cách nhau d: Δφ = 2πd/λ<br>' +
      '&nbsp;&nbsp;Cùng pha ⇔ d = kλ · Ngược pha ⇔ d = (k + ½)λ<br>' +
      '<b>Giao thoa hai nguồn cùng pha:</b><br>' +
      '&nbsp;&nbsp;Cực đại (dao động mạnh nhất): d₂ − d₁ = <b>kλ</b><br>' +
      '&nbsp;&nbsp;Cực tiểu (đứng yên): d₂ − d₁ = <b>(k + ½)λ</b><br>' +
      '<b>Sóng dừng:</b> khoảng cách giữa hai nút liên tiếp = λ/2',
  khi: 'Câu về sóng cơ, sóng âm, giao thoa.',
  vd: 'Sóng có f = 50 Hz, v = 20 m/s ⇒ λ = v/f = <b>0,4 m</b>.',
  bay: 'Khi sóng truyền sang môi trường khác, TẦN SỐ không đổi còn v và λ thay đổi.' },

{ nhom: 'V. Lớp 10–11', ten: 'Điện trường & tụ điện', cap: 2,
  ct: '<b>Coulomb:</b> F = k·|q₁q₂|/(ε·r²) với k = 9·10⁹ N·m²/C²<br>' +
      '<b>Cường độ điện trường:</b> E = F/q = k·|Q|/(ε·r²), đơn vị V/m<br>' +
      '<b>Hiệu điện thế:</b> U = E·d (điện trường đều) · <b>Công lực điện:</b> A = q·U<br>' +
      '<b>Tụ điện:</b> C = Q/U (đơn vị fara) · Năng lượng W = ½CU² = ½QU = Q²/(2C)<br>' +
      '&nbsp;&nbsp;Ghép nối tiếp: 1/C = Σ1/Cᵢ · Ghép song song: C = ΣCᵢ',
  khi: 'Câu về điện tích, điện trường, tụ điện (Vật lí 11).',
  vd: 'Điện trường đều giữa hai bản cách nhau 2 cm, U = 100 V ⇒ E = 100/0,02 = <b>5000 V/m</b>.',
  bay: 'Ghép tụ NGƯỢC với ghép điện trở: tụ song song thì cộng điện dung, tụ nối tiếp thì cộng nghịch đảo.' },

{ nhom: 'V. Lớp 10–11', ten: 'Năng lượng trong dao động điều hoà', cap: 3,
  ct: '<b>Cơ năng: W = ½kA² = ½mω²A² = const</b><br>' +
      'Động năng W<sub>đ</sub> = ½mv² · Thế năng W<sub>t</sub> = ½kx²<br>' +
      '<b>W = W<sub>đ</sub> + W<sub>t</sub></b> — không đổi theo thời gian.<br>' +
      'W<sub>đ</sub> và W<sub>t</sub> biến thiên tuần hoàn với tần số <b>gấp đôi</b> tần số dao động (chu kì T/2).<br>' +
      'Tại vị trí W<sub>đ</sub> = W<sub>t</sub>: <b>x = ±A/√2</b><br>' +
      'Hệ thức độc lập: <b>A² = x² + v²/ω²</b>',
  khi: 'Câu về năng lượng dao động, tìm li độ theo điều kiện năng lượng.',
  vd: 'Tại biên: W = W<sub>t</sub> (động năng bằng 0). Tại vị trí cân bằng: W = W<sub>đ</sub> (thế năng bằng 0).',
  bay: 'Cơ năng KHÔNG đổi, nhưng động năng và thế năng thì biến thiên với tần số GẤP ĐÔI tần số dao động.' }
);

TD.KHO.ly_ct.push(

/* ============ BỔ SUNG: PHỦ KÍN CÔNG THỨC CÓ THỂ RA THI ============ */
{ nhom: 'I. Vật lí nhiệt', ten: 'Phương trình cân bằng nhiệt', cap: 2,
  ct: '<b>Q<sub>toả</sub> = Q<sub>thu</sub></b><br>m₁c₁(t₁ − t) = m₂c₂(t − t₂)<br>⇒ t = (m₁c₁t₁ + m₂c₂t₂)/(m₁c₁ + m₂c₂)<br>Nếu có chuyển thể thì cộng thêm Q = λm (nóng chảy) hoặc Q = Lm (hoá hơi).',
  khi: 'Bài trộn chất, thả vật nóng vào nước, nhiệt lượng kế.',
  vd: 'Trộn 1 kg nước 20 °C với 1 kg nước 80 °C: t = (20+80)/2 = <b>50 °C</b>.',
  bay: 'Phải kiểm tra xem đá có tan hết chưa TRƯỚC khi lập phương trình. So Q toả với λm.' },

{ nhom: 'I. Vật lí nhiệt', ten: 'Nhiệt nóng chảy – nhiệt hoá hơi', cap: 1,
  ct: '<b>Q = λm</b> (nóng chảy, λ: nhiệt nóng chảy riêng, J/kg)<br><b>Q = Lm</b> (hoá hơi, L: nhiệt hoá hơi riêng, J/kg)<br>Nước đá: λ = 3,34·10⁵ J/kg. Nước: L = 2,26·10⁶ J/kg, c = 4200 J/(kg·K).<br>Trong quá trình chuyển thể, <b>nhiệt độ không đổi</b>.',
  khi: 'Bài đun nước, làm tan đá, tính năng lượng toàn quá trình.',
  vd: 'Làm tan 0,5 kg nước đá ở 0 °C: Q = 3,34·10⁵·0,5 = <b>167 kJ</b>.',
  bay: 'Quá trình nhiều giai đoạn phải cộng đủ: nóng lên (mcΔt) + chuyển thể (λm hoặc Lm) + nóng tiếp.' },

{ nhom: 'I. Vật lí nhiệt', ten: 'Hiệu suất động cơ nhiệt', cap: 3,
  ct: '<b>H = A/Q₁ = (Q₁ − Q₂)/Q₁</b><br>Giới hạn Carnot: <b>H<sub>max</sub> = 1 − T₂/T₁</b> (T tính bằng Kelvin)<br>Không động cơ thực nào vượt được H<sub>max</sub>.',
  khi: 'Câu vận dụng cao về nhiệt động lực học.',
  vd: 'T₁ = 600 K, T₂ = 300 K ⇒ H<sub>max</sub> = 1 − 0,5 = <b>50 %</b>.',
  bay: 'Bắt buộc đổi sang Kelvin. Dùng °C trong công thức Carnot là sai hoàn toàn.' },

{ nhom: 'II. Khí lí tưởng', ten: 'Ba định luật chất khí', cap: 1,
  ct: '<b>Đẳng nhiệt (Boyle):</b> p₁V₁ = p₂V₂ (T không đổi)<br><b>Đẳng tích (Charles):</b> p₁/T₁ = p₂/T₂<br><b>Đẳng áp (Gay-Lussac):</b> V₁/T₁ = V₂/T₂<br>Tổng quát: <b>p₁V₁/T₁ = p₂V₂/T₂</b>. T luôn tính bằng Kelvin: T = t(°C) + 273.',
  khi: 'Mọi bài biến đổi trạng thái khí.',
  vd: 'Nén đẳng nhiệt V còn 1/3 ⇒ p tăng <b>3 lần</b>.',
  bay: 'Quên đổi °C sang K là lỗi phổ biến nhất của chương này. 27 °C = 300 K, không phải 27.' },

{ nhom: 'II. Khí lí tưởng', ten: 'Phương trình Clapeyron – Mendeleev', cap: 2,
  ct: '<b>pV = nRT = (m/M)RT</b><br>R = 8,31 J/(mol·K) khi p tính bằng Pa, V bằng m³.<br>Khối lượng riêng: ρ = m/V = pM/(RT).<br>Ở điều kiện chuẩn (0 °C, 1 atm): 1 mol khí chiếm 22,4 lít.',
  khi: 'Bài tính khối lượng khí, số mol, khối lượng riêng của khí.',
  vd: 'n = 2 mol, T = 300 K, V = 0,05 m³ ⇒ p = nRT/V = 2·8,31·300/0,05 ≈ <b>9,97·10⁴ Pa</b>.',
  bay: 'Kiểm tra đơn vị: 1 lít = 10⁻³ m³; 1 atm ≈ 1,013·10⁵ Pa. Sai đơn vị lệch cả nghìn lần.' },

{ nhom: 'II. Khí lí tưởng', ten: 'Thuyết động học phân tử', cap: 3,
  ct: '<b>Động năng tịnh tiến trung bình:</b> W̄<sub>đ</sub> = (3/2)kT với k = 1,38·10⁻²³ J/K<br><b>Áp suất khí:</b> p = (2/3)·(N/V)·W̄<sub>đ</sub> = n<sub>0</sub>kT<br>Tốc độ căn quân phương: v = √(3kT/m) = √(3RT/M) ⇒ <b>v ∝ 1/√M</b>.',
  khi: 'Câu lí thuyết định lượng về bản chất nhiệt độ và áp suất.',
  vd: 'Cùng T, H₂ (M = 2) chuyển động nhanh hơn O₂ (M = 32) √16 = <b>4 lần</b>.',
  bay: 'Cùng nhiệt độ thì mọi khí có W̄đ như nhau, nhưng TỐC ĐỘ thì khác vì khối lượng phân tử khác.' },

{ nhom: 'III. Từ trường', ten: 'Lực từ & lực Lorentz', cap: 2,
  ct: '<b>Lực từ lên dây dẫn:</b> F = BIℓ·sinα (α là góc giữa dây và B→)<br>Quy tắc bàn tay trái xác định chiều.<br><b>Lực Lorentz:</b> f = |q|vB·sinα<br>Hạt chuyển động ⊥ B: quỹ đạo tròn bán kính <b>R = mv/(|q|B)</b>, chu kì T = 2πm/(|q|B).',
  khi: 'Bài lực từ, khung dây trong từ trường, hạt tích điện bay vào từ trường.',
  vd: 'B = 0,2 T, I = 5 A, ℓ = 0,4 m, α = 90° ⇒ F = 0,2·5·0,4 = <b>0,4 N</b>.',
  bay: 'Dây song song B thì F = 0. Lực Lorentz luôn ⊥ v→ nên không sinh công, chỉ đổi hướng chuyển động.' },

{ nhom: 'III. Từ trường', ten: 'Từ thông & cảm ứng điện từ', cap: 2,
  ct: '<b>Từ thông:</b> Φ = NBS·cosα (α là góc giữa B→ và pháp tuyến), đơn vị Weber.<br><b>Định luật Faraday:</b> e<sub>c</sub> = −N·ΔΦ/Δt ⇒ độ lớn |e| = N|ΔΦ|/Δt<br><b>Định luật Lenz:</b> dòng cảm ứng có chiều chống lại nguyên nhân sinh ra nó.<br>Thanh dẫn chuyển động: e = Bℓv·sinθ.',
  khi: 'Bài tính suất điện động cảm ứng, xác định chiều dòng cảm ứng.',
  vd: 'N = 100, ΔΦ = 0,02 Wb mỗi vòng, Δt = 0,1 s ⇒ |e| = 100·0,02/0,1 = <b>20 V</b>.',
  bay: 'ΔΦ là biến thiên qua MỘT vòng; nhân N mới ra suất điện động của cả cuộn.' },

{ nhom: 'III. Từ trường', ten: 'Máy biến áp & truyền tải điện năng', cap: 3,
  ct: '<b>Máy biến áp lí tưởng:</b> U₁/U₂ = N₁/N₂ = I₂/I₁ (công suất bảo toàn)<br><b>Hao phí trên đường dây:</b> ΔP = P²R/(U²cos²φ) — tỉ lệ nghịch với U²<br><b>Hiệu suất truyền tải:</b> H = (P − ΔP)/P<br>Tăng U lên k lần ⇒ ΔP giảm k² lần.',
  khi: 'Câu vận dụng về truyền tải điện đi xa.',
  vd: 'Tăng điện áp truyền tải 10 lần ⇒ hao phí giảm <b>100 lần</b>.',
  bay: 'Máy biến áp KHÔNG làm tăng công suất. Tăng áp thì dòng giảm đúng bấy nhiêu lần.' },

{ nhom: 'IV. Hạt nhân', ten: 'Hệ thức Einstein & năng lượng liên kết', cap: 2,
  ct: '<b>E = mc²</b>; 1 u = 931,5 MeV/c²<br><b>Độ hụt khối:</b> Δm = Z·m<sub>p</sub> + (A−Z)·m<sub>n</sub> − m<sub>hn</sub><br><b>Năng lượng liên kết:</b> W<sub>lk</sub> = Δm·c²<br><b>Năng lượng liên kết riêng:</b> ε = W<sub>lk</sub>/A — đại lượng đo độ BỀN VỮNG.',
  khi: 'So sánh độ bền hạt nhân, tính năng lượng liên kết.',
  vd: 'Δm = 0,03 u ⇒ W<sub>lk</sub> = 0,03·931,5 ≈ <b>27,9 MeV</b>.',
  bay: 'So sánh độ bền phải dùng ε chứ không dùng W<sub>lk</sub>. Fe-56 có ε lớn nhất (≈ 8,8 MeV/nucleon).' },

{ nhom: 'IV. Hạt nhân', ten: 'Định luật phóng xạ', cap: 2,
  ct: '<b>N = N₀·2^(−t/T) = N₀·e^(−λt)</b> với <b>λ = ln2/T</b><br>Khối lượng: m = m₀·2^(−t/T)<br><b>Độ phóng xạ:</b> H = λN = H₀·2^(−t/T), đơn vị Bq (1 Ci = 3,7·10¹⁰ Bq)<br>Số hạt đã phân rã: ΔN = N₀(1 − 2^(−t/T)).',
  khi: 'Bài tính lượng còn lại, tuổi cổ vật (C-14), tỉ lệ mẹ/con.',
  vd: 'Sau 3T còn N₀/8 = <b>12,5 %</b>; đã phân rã 87,5 %.',
  bay: 'Tỉ số hạt con / hạt mẹ = 2^(t/T) − 1 chứ không phải 2^(t/T).' },

{ nhom: 'IV. Hạt nhân', ten: 'Năng lượng phản ứng hạt nhân', cap: 3,
  ct: '<b>ΔE = (m<sub>trước</sub> − m<sub>sau</sub>)·c²</b><br>ΔE &gt; 0: phản ứng TOẢ năng lượng; ΔE &lt; 0: THU năng lượng.<br>Tính theo năng lượng liên kết: ΔE = ΣW<sub>lk sau</sub> − ΣW<sub>lk trước</sub><br><b>Bảo toàn:</b> số khối A và điện tích Z luôn bảo toàn; động lượng và năng lượng toàn phần bảo toàn.',
  khi: 'Bài phân hạch, nhiệt hạch, tính năng lượng toả ra của 1 kg nhiên liệu.',
  vd: 'Δm = 0,2 u ⇒ ΔE = 0,2·931,5 ≈ <b>186,3 MeV</b> toả ra.',
  bay: 'Khối lượng GIẢM thì toả năng lượng. Nhớ chiều: "hụt khối thì sinh năng lượng".' },

{ nhom: 'V. Lớp 10–11', ten: 'Động học: thẳng đều, biến đổi đều, rơi tự do', cap: 1,
  ct: '<b>Thẳng đều:</b> s = vt<br><b>Biến đổi đều:</b> v = v₀ + at; s = v₀t + ½at²; <b>v² − v₀² = 2as</b><br><b>Rơi tự do:</b> v = gt; h = ½gt² ⇒ t = √(2h/g), v = √(2gh)<br><b>Ném ngang:</b> tầm bay xa L = v₀√(2h/g)<br><b>Ném xiên:</b> tầm xa L = v₀²sin2α/g, độ cao cực đại H = v₀²sin²α/(2g).',
  khi: 'Nền tảng cơ học lớp 10, vẫn xuất hiện trong đề dưới dạng câu vận dụng thực tế.',
  vd: 'Rơi từ h = 20 m, g = 10 ⇒ t = √4 = 2 s, v chạm đất = <b>20 m/s</b>.',
  bay: 'Ném ngang: chuyển động ngang ĐỀU, chuyển động đứng là rơi tự do. Hai chuyển động độc lập.' },

{ nhom: 'V. Lớp 10–11', ten: 'Các lực cơ học', cap: 2,
  ct: '<b>Định luật II Newton:</b> F→ = ma→<br><b>Ma sát trượt:</b> F<sub>ms</sub> = μN<br><b>Đàn hồi (Hooke):</b> F<sub>đh</sub> = k·|Δℓ|<br><b>Hấp dẫn:</b> F = G·m₁m₂/r², G = 6,67·10⁻¹¹<br><b>Hướng tâm:</b> F<sub>ht</sub> = mv²/r = mω²r; a<sub>ht</sub> = v²/r; v = ωr = 2πr/T.',
  khi: 'Bài vật trượt trên mặt phẳng nghiêng, chuyển động tròn, vệ tinh.',
  vd: 'm = 2 kg, μ = 0,2, mặt ngang ⇒ F<sub>ms</sub> = 0,2·2·10 = <b>4 N</b>.',
  bay: 'Trên mặt nghiêng góc α: N = mg·cosα chứ không phải mg. Đây là bẫy số một của dạng này.' },

{ nhom: 'V. Lớp 10–11', ten: 'Công – Năng lượng – Động lượng', cap: 2,
  ct: '<b>Công:</b> A = F·s·cosα &nbsp;·&nbsp; <b>Công suất:</b> P = A/t = F·v<br><b>Động năng:</b> W<sub>đ</sub> = ½mv² &nbsp;·&nbsp; <b>Thế năng:</b> W<sub>t</sub> = mgh (trọng trường), ½kx² (đàn hồi)<br><b>Định lí động năng:</b> A<sub>ngoại lực</sub> = ΔW<sub>đ</sub><br><b>Động lượng:</b> p→ = mv→; bảo toàn khi hệ kín: m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′<br>Hiệu suất: H = A<sub>có ích</sub>/A<sub>toàn phần</sub>.',
  khi: 'Bài va chạm, bài tính công của động cơ, bảo toàn cơ năng.',
  vd: 'Va chạm mềm: v′ = (m₁v₁ + m₂v₂)/(m₁ + m₂).',
  bay: 'Va chạm mềm KHÔNG bảo toàn động năng (một phần chuyển thành nhiệt), nhưng động lượng vẫn bảo toàn.' },

{ nhom: 'V. Lớp 10–11', ten: 'Dao động điều hoà', cap: 2,
  ct: 'x = A·cos(ωt + φ); v = −ωA·sin(ωt + φ); a = −ω²x<br>v<sub>max</sub> = ωA (ở VTCB); a<sub>max</sub> = ω²A (ở biên)<br><b>Hệ thức độc lập:</b> A² = x² + v²/ω²<br><b>Cơ năng:</b> W = ½kA² = ½mω²A², bảo toàn.<br><b>Con lắc lò xo:</b> T = 2π√(m/k). <b>Con lắc đơn:</b> T = 2π√(ℓ/g).',
  khi: 'Chương dao động — nền tảng cho sóng và điện xoay chiều.',
  vd: 'ℓ tăng 4 lần ⇒ T tăng <b>2 lần</b> (T ∝ √ℓ).',
  bay: 'Chu kì con lắc đơn không phụ thuộc khối lượng; chu kì con lắc lò xo không phụ thuộc g.' },

{ nhom: 'V. Lớp 10–11', ten: 'Dao động tắt dần – cưỡng bức – cộng hưởng', cap: 3,
  ct: '<b>Tắt dần:</b> biên độ và cơ năng giảm dần do ma sát; tần số coi như không đổi.<br><b>Cưỡng bức:</b> dao động với tần số của NGOẠI LỰC, biên độ phụ thuộc |f<sub>ngoại</sub> − f₀| và lực cản.<br><b>Cộng hưởng:</b> xảy ra khi <b>f<sub>ngoại</sub> = f₀</b> (tần số riêng) ⇒ biên độ cực đại.<br>Lực cản càng nhỏ, đỉnh cộng hưởng càng nhọn và cao.',
  khi: 'Câu lí thuyết về dao động, bài xe chạy qua các mối nối đường ray.',
  vd: 'Con lắc có T₀ = 2 s; xe qua mối ray cách nhau 12 m thì cộng hưởng khi v = 12/2 = <b>6 m/s</b>.',
  bay: 'Dao động duy trì giữ nguyên tần số riêng f₀; dao động cưỡng bức lấy tần số ngoại lực. Đừng lẫn hai loại.' },

{ nhom: 'V. Lớp 10–11', ten: 'Sóng cơ – Giao thoa – Sóng dừng', cap: 3,
  ct: '<b>v = λf = λ/T</b><br><b>Độ lệch pha</b> hai điểm cách nhau d: Δφ = 2πd/λ<br><b>Giao thoa hai nguồn cùng pha:</b> cực đại d₂ − d₁ = kλ; cực tiểu d₂ − d₁ = (k + 0,5)λ<br><b>Sóng dừng:</b> hai đầu cố định ℓ = kλ/2 (k bó, k+1 nút); một đầu tự do ℓ = (2k+1)λ/4<br>Khoảng cách hai nút liên tiếp = λ/2; nút đến bụng gần nhất = λ/4.',
  khi: 'Bài đếm số cực đại, số nút/bụng, tính tốc độ truyền sóng.',
  vd: 'Dây hai đầu cố định ℓ = 60 cm có 3 bó ⇒ λ = 2ℓ/3 = <b>40 cm</b>.',
  bay: 'Số bó sóng = số bụng; số nút = số bụng + 1 (hai đầu cố định). Đếm nhầm là mất câu.' },

{ nhom: 'V. Lớp 10–11', ten: 'Sóng âm & mức cường độ âm', cap: 2,
  ct: '<b>Cường độ âm:</b> I = P/(4πr²) ⇒ I ∝ 1/r²<br><b>Mức cường độ âm:</b> L = 10·log(I/I₀) dB, với I₀ = 10⁻¹² W/m²<br>⇒ L₁ − L₂ = 10·log(I₁/I₂) = 20·log(r₂/r₁)<br>Khoảng cách tăng 10 lần ⇒ L giảm 20 dB.',
  khi: 'Bài về âm thanh, so sánh độ to tại hai vị trí.',
  vd: 'r tăng gấp đôi ⇒ L giảm 20·log2 ≈ <b>6 dB</b>.',
  bay: 'Cường độ âm giảm theo 1/r² nhưng MỨC cường độ âm giảm theo log — đừng nhân chia trực tiếp trên dB.' },

{ nhom: 'V. Lớp 10–11', ten: 'Dòng điện không đổi & ghép nguồn', cap: 2,
  ct: '<b>Định luật Ohm toàn mạch:</b> I = ξ/(R<sub>N</sub> + r); U = ξ − I·r<br><b>Nối tiếp:</b> R = R₁ + R₂; <b>song song:</b> 1/R = 1/R₁ + 1/R₂<br><b>Ghép nguồn nối tiếp:</b> ξ<sub>b</sub> = nξ, r<sub>b</sub> = nr<br><b>Ghép song song</b> (n nguồn giống nhau): ξ<sub>b</sub> = ξ, r<sub>b</sub> = r/n<br><b>Công suất:</b> P = UI = I²R = U²/R; điện năng A = UIt.',
  khi: 'Bài mạch điện một chiều, tính hiệu suất nguồn.',
  vd: 'ξ = 12 V, r = 1 Ω, R = 5 Ω ⇒ I = 12/6 = 2 A, U = 12 − 2 = <b>10 V</b>.',
  bay: 'Công suất cực đại trên mạch ngoài khi R<sub>N</sub> = r, khi đó hiệu suất chỉ đạt 50 %.' },

{ nhom: 'V. Lớp 10–11', ten: 'Điện trường – Điện thế – Tụ điện', cap: 2,
  ct: '<b>Coulomb:</b> F = k·|q₁q₂|/(εr²), k = 9·10⁹<br><b>Cường độ điện trường:</b> E = F/q = k|Q|/(εr²); điện trường đều E = U/d<br><b>Công của lực điện:</b> A = qEd = q(V₁ − V₂) = qU<br><b>Tụ điện:</b> Q = CU; năng lượng W = ½CU² = Q²/(2C)<br>Ghép tụ song song C = C₁ + C₂; nối tiếp 1/C = 1/C₁ + 1/C₂.',
  khi: 'Bài điện trường, chuyển động của điện tích trong điện trường.',
  vd: 'U = 100 V, d = 2 cm ⇒ E = 100/0,02 = <b>5000 V/m</b>.',
  bay: 'Ghép tụ ngược với ghép điện trở: tụ SONG SONG thì cộng điện dung, NỐI TIẾP thì cộng nghịch đảo.' },

{ nhom: 'V. Lớp 10–11', ten: 'Điện xoay chiều & mạch RLC', cap: 3,
  ct: 'U = U₀/√2; I = I₀/√2<br>Z<sub>L</sub> = ωL; Z<sub>C</sub> = 1/(ωC); <b>Z = √(R² + (Z<sub>L</sub> − Z<sub>C</sub>)²)</b><br>tanφ = (Z<sub>L</sub> − Z<sub>C</sub>)/R; <b>P = UI·cosφ = I²R</b><br><b>Cộng hưởng:</b> Z<sub>L</sub> = Z<sub>C</sub> ⇔ ω² = 1/(LC) ⇒ Z<sub>min</sub> = R, I<sub>max</sub> = U/R, cosφ = 1.',
  khi: 'Chương điện xoay chiều — bài toán cực trị, cộng hưởng.',
  vd: 'R = 30, Z<sub>L</sub> = 80, Z<sub>C</sub> = 40 ⇒ Z = √(900 + 1600) = <b>50 Ω</b>.',
  bay: 'Cuộn cảm thuần và tụ KHÔNG tiêu thụ công suất. P chỉ toả trên R.' },

{ nhom: 'V. Lớp 10–11', ten: 'Sóng ánh sáng & lượng tử ánh sáng', cap: 3,
  ct: '<b>Giao thoa khe Young:</b> khoảng vân i = λD/a; vân sáng bậc k tại x = k·i; vân tối tại x = (k + 0,5)i<br><b>Năng lượng photon:</b> ε = hf = hc/λ, h = 6,625·10⁻³⁴ J·s<br><b>Quang điện:</b> hc/λ = A + W<sub>đmax</sub>; <b>giới hạn quang điện λ₀ = hc/A</b>; điều kiện xảy ra: λ ≤ λ₀<br>Thang sóng điện từ (bước sóng giảm dần): vô tuyến → hồng ngoại → ánh sáng nhìn thấy → tử ngoại → tia X → tia gamma.',
  khi: 'Bài giao thoa ánh sáng, hiện tượng quang điện.',
  vd: 'λ = 0,6 μm, D = 2 m, a = 1 mm ⇒ i = 0,6·10⁻⁶·2/10⁻³ = <b>1,2 mm</b>.',
  bay: 'Quang điện phụ thuộc BƯỚC SÓNG, không phụ thuộc cường độ sáng. Cường độ chỉ quyết định số electron bật ra.' }
);
