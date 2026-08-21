/* ============================================================
   CẤM THƯ — MẸO PHÒNG THI
   Hai nhóm: ① thủ thuật máy tính Casio (fx-580VNX / fx-880BTG,
   có ghi kèm phím tương ứng của fx-570VN Plus) ② kỹ thuật nhìn ra
   đáp án của câu dễ mà không phải giải hết.
   Đây là mẹo LÀM BÀI, không thay được kiến thức. Dùng để tiết kiệm
   thời gian cho câu khó và để soát lại kết quả đã tính.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

(function () {
const cam = (mon, ds) => { TD.KHO[mon + '_cam'] = ds.map(x => (x.cd = '*', x)); };

/* ---------------- TOÁN ---------------- */
cam('toan', [
{ nhom: '⌨️ Casio', ten: 'Bốn phím sống còn: CALC, SOLVE, TABLE, ∫', cap: 1,
  ct: '<b>CALC</b> — thay số vào biểu thức. Nhập biểu thức chứa X rồi bấm CALC, máy hỏi X? thì nhập giá trị.<br>'
    + '<b>SOLVE</b> (SHIFT + CALC) — dò nghiệm của phương trình. Nhập vế trái − vế phải rồi SOLVE.<br>'
    + '<b>TABLE</b> (MENU 8 trên fx-580VNX; MODE 7 trên fx-570VN Plus) — lập bảng giá trị f(x), dùng để dò nghiệm, tìm GTLN–GTNN, xét dấu.<br>'
    + '<b>∫ và d/dx</b> — tính tích phân xác định và đạo hàm tại một điểm.',
  khi: 'Mọi câu trắc nghiệm có thể thử đáp án hoặc cần dò nghiệm.',
  vd: 'Hỏi x = 2 có phải nghiệm của x³ − 3x² + 4 = 0 không: nhập biểu thức, CALC, X = 2 ⇒ máy trả 0 ⇒ đúng là nghiệm.',
  bay: 'SOLVE chỉ trả về MỘT nghiệm gần giá trị khởi tạo. Phương trình nhiều nghiệm phải đổi giá trị khởi tạo '
     + '(nhập −5, 0, 5 …) rồi SOLVE lại mới gom đủ.' },

{ nhom: '⌨️ Casio', ten: 'Thử đáp án ngược — vũ khí mạnh nhất của trắc nghiệm', cap: 2,
  ct: 'Thay vì GIẢI xuôi, hãy thay bốn phương án vào đề rồi xem cái nào thoả.<br>'
    + '· Phương trình, bất phương trình: CALC từng đáp án.<br>'
    + '· Bài tìm m: thay từng giá trị m vào rồi kiểm tra điều kiện.<br>'
    + '· Nguyên hàm: <b>đạo hàm ngược lại</b> đáp án bằng d/dx tại một điểm bất kì rồi so với hàm đề cho.',
  khi: 'Câu tính nguyên hàm, giải phương trình, tìm tham số — nhanh hơn giải xuôi rất nhiều.',
  vd: 'Tìm ∫(2x+1)⁵dx. Lấy từng đáp án, bấm d/dx tại x = 1 rồi so với (2·1+1)⁵ = 243. Đáp án nào cho 243 là đúng.',
  bay: 'Chọn điểm thử tránh các giá trị đặc biệt (0, 1, −1) vì nhiều đáp án sai vẫn trùng nhau tại đó. '
     + 'Nên thử x = 0,7 hoặc x = 2,3.' },

{ nhom: '⌨️ Casio', ten: 'TABLE để tìm GTLN–GTNN, xét dấu và đếm nghiệm', cap: 2,
  ct: 'Vào TABLE, nhập f(X), chọn Start – End – Step theo đoạn đề cho.<br>'
    + '· <b>GTLN–GTNN trên [a;b]</b>: Start = a, End = b, Step = (b−a)/30 rồi dò cột f(X).<br>'
    + '· <b>Đếm nghiệm</b>: chỗ nào f(X) ĐỔI DẤU giữa hai dòng liên tiếp là có một nghiệm ở giữa.<br>'
    + '· <b>Xét đơn điệu</b>: cột f(X) tăng đều hay giảm đều thì hàm đồng biến hay nghịch biến trên đoạn đó.',
  khi: 'Câu hỏi khoảng đơn điệu, số nghiệm, giá trị lớn nhất – nhỏ nhất.',
  vd: 'y = x³ − 3x trên [0; 2], Step = 0,1: cột f(X) nhỏ nhất tại X = 1 (−2), lớn nhất tại X = 2 (2).',
  bay: 'Step quá lớn sẽ BỎ SÓT nghiệm nằm lọt giữa hai dòng. Nghi ngờ thì thu hẹp đoạn và giảm Step.' },

{ nhom: '⌨️ Casio', ten: 'Tích phân, diện tích và thể tích bằng một phím', cap: 2,
  ct: 'Bấm thẳng ∫ với cận đề cho.<br>'
    + '· <b>Diện tích</b> giữa hai đường: ∫|f(x) − g(x)|dx — nhớ dấu trị tuyệt đối, máy tính được.<br>'
    + '· <b>Thể tích quanh Ox</b>: π∫f²(x)dx.<br>'
    + '· <b>Quãng đường</b> từ vận tốc: ∫|v(t)|dt.<br>'
    + 'Kết quả lẻ thì bấm tiếp <b>÷ π</b> hoặc <b>÷ √2</b> để nhận ra dạng đáp án.',
  khi: 'Toàn bộ câu ứng dụng tích phân.',
  vd: 'Ra 25,13274123. Chia cho π được 8 ⇒ đáp án là 8π.',
  bay: 'Máy chỉ tính được tích phân XÁC ĐỊNH (có cận số). Bài chứa tham số phải rút gọn về số trước.' },

{ nhom: '⌨️ Casio', ten: 'Thống kê, tổ hợp và Oxyz trên máy', cap: 3,
  ct: '<b>Thống kê</b> (MENU 6 → 1-Var): nhập bảng tần số, máy trả x̄, σ (độ lệch chuẩn), Σx, Σx².<br>'
    + '<b>Tổ hợp – chỉnh hợp</b>: nCr và nPr nằm ngay trên bàn phím.<br>'
    + '<b>Vector</b> (MENU 5): nhập hai vector rồi dùng tích vô hướng (Dot) và tích có hướng (×) để tính '
    + 'góc, diện tích tam giác, thể tích tứ diện.<br>'
    + '<b>Giải hệ phương trình</b> (MENU 9 → Simul Equation): giải hệ 2, 3, 4 ẩn — dùng cho bài tương giao, bài hỗn hợp.',
  khi: 'Câu thống kê mẫu ghép nhóm, xác suất, hình Oxyz.',
  vd: 'Diện tích tam giác ABC = ½|[AB→, AC→]| — nhập hai vector rồi bấm tích có hướng, lấy Abs rồi chia 2.',
  bay: 'Máy trả độ lệch chuẩn theo hai kí hiệu: σₓ (của tổng thể) và sₓ (của mẫu). '
     + 'Chương trình phổ thông dùng σₓ — chọn nhầm là lệch đáp án.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Loại đáp án bằng miền giá trị và dấu', cap: 2,
  ct: 'Trước khi tính, hỏi ba câu:<br>'
    + '① Đáp án có thể ÂM không? (diện tích, thể tích, xác suất, khoảng cách, độ dài luôn ≥ 0)<br>'
    + '② Xác suất có nằm trong [0; 1] không?<br>'
    + '③ Kết quả có nằm trong khoảng hợp lí không? (tỉ lệ % phải ≤ 100)<br>'
    + 'Thường loại được ngay 1–2 phương án, xác suất đoán đúng tăng từ 25% lên 50%.',
  khi: 'Câu tính toán mà không kịp giải hết.',
  vd: 'Câu hỏi xác suất có phương án 1,25 ⇒ loại ngay, vì xác suất không thể lớn hơn 1.',
  bay: 'Đây là mẹo LOẠI TRỪ, không phải mẹo chọn. Loại xong vẫn phải cân nhắc giữa các phương án còn lại.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Đọc đồ thị và bảng biến thiên trong 5 giây', cap: 1,
  ct: '<b>Hàm bậc ba</b>: nhánh phải đi lên ⇒ a &gt; 0; đi xuống ⇒ a &lt; 0. Có 2 cực trị ⇒ y′ = 0 có 2 nghiệm.<br>'
    + '<b>Trùng phương</b>: ba cực trị (chữ W hoặc M) ⇒ a·b &lt; 0; một cực trị ⇒ a·b ≥ 0.<br>'
    + '<b>Phân thức bậc nhất</b>: hai nhánh hypebol, KHÔNG có cực trị; giao Oy tại b/d, giao Ox tại −b/a.<br>'
    + 'Xét dấu c và d qua vị trí giao điểm với các trục.',
  khi: 'Câu cho hình vẽ hỏi dấu các hệ số — câu này gần như cho không điểm.',
  vd: 'Đồ thị bậc ba đi xuống ở nhánh phải, cắt Oy tại điểm dương ⇒ a &lt; 0 và d &gt; 0.',
  bay: 'Giao điểm với Oy chính là hệ số tự do d (thay x = 0). Nhiều bạn nhìn nhầm sang giao điểm với Ox.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Nhận dạng đáp án đối xứng và đáp án lạc loài', cap: 3,
  ct: 'Người ra đề dựng phương án nhiễu từ những lỗi sai điển hình, nên bộ đáp án có cấu trúc:<br>'
    + '· Hai đáp án ĐỐI DẤU nhau (ví dụ 3 và −3) ⇒ đề đang gài lỗi dấu, đáp án gần như chắc nằm trong cặp đó.<br>'
    + '· Hai đáp án hơn kém nhau đúng 2 lần hoặc đúng π lần ⇒ gài lỗi quên hệ số.<br>'
    + '· Một đáp án khác hẳn ba cái còn lại về đơn vị hay bậc độ lớn ⇒ thường là mồi nhử, loại trước.',
  khi: 'Khi đã tính ra kết quả và muốn kiểm tra nhanh, hoặc khi hết giờ.',
  vd: 'Bốn phương án 8π, 16π, 8, 16: cặp có π và cặp không π ⇒ đề gài chỗ quên nhân π trong công thức thể tích.',
  bay: 'Mẹo này chỉ để ƯU TIÊN thứ tự kiểm tra, tuyệt đối không dùng thay cho việc tính. '
     + 'Đề chuẩn hoá hiện nay cố tình phá vỡ các mẫu này.' }
]);

/* ---------------- LÝ ---------------- */
cam('ly', [
{ nhom: '⌨️ Casio', ten: 'Đổi đơn vị và hằng số có sẵn trong máy', cap: 1,
  ct: '<b>CONST</b> (SHIFT + 7) — tra hằng số: c, h, e, N<sub>A</sub>, k, u, g. Không cần nhớ số lẻ.<br>'
    + '<b>CONV</b> (SHIFT + 8) — đổi đơn vị.<br>'
    + '<b>ENG / ENG◄</b> — dịch dấu phẩy theo bội số 10³, đọc nhanh kết quả dạng ×10ⁿ.<br>'
    + 'Nhập luỹ thừa 10 bằng phím <b>×10ˣ</b>, đừng gõ "× 10 ^" vì dễ sai thứ tự ưu tiên.',
  khi: 'Mọi bài có hằng số vật lí hoặc số rất lớn, rất nhỏ.',
  vd: 'Bài hạt nhân cần u = 931,5 MeV/c² và N<sub>A</sub> = 6,022·10²³ — lấy thẳng từ CONST, khỏi nhớ.',
  bay: 'Nhập 6,022 × 10 ^ 23 mà quên ngoặc là máy hiểu thành (6,022 × 10)^23. Luôn dùng phím ×10ˣ.' },

{ nhom: '⌨️ Casio', ten: 'SOLVE cho phương trình vật lí và bài hai trạng thái', cap: 3,
  ct: 'Nhập nguyên công thức vật lí có ẩn X rồi SOLVE — khỏi phải biến đổi đại số.<br>'
    + '· Cân bằng nhiệt: nhập m₁c₁(t₁ − X) − m₂c₂(X − t₂) rồi SOLVE tìm nhiệt độ cân bằng X.<br>'
    + '· Bài khí: nhập p₁V₁/T₁ − p₂V₂/X = 0 rồi SOLVE.<br>'
    + '· Phóng xạ: nhập N₀·2^(−X/T) − N rồi SOLVE tìm thời gian X.<br>'
    + '<b>Giải hệ</b> (MENU 9) cho bài hai ẩn như bài toán ghép nguồn, mạch điện.',
  khi: 'Bài cho một phương trình một ẩn nhưng biến đổi tay dễ sai dấu.',
  vd: 'Định tuổi: 5730 năm, còn 25% ⇒ nhập 2^(−X/5730) − 0,25, SOLVE ⇒ X = 11460 năm.',
  bay: 'Trước khi SOLVE phải đổi hết về ĐƠN VỊ CHUẨN (SI). Trộn K với °C hay mm với m là ra số vô nghĩa.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Kiểm tra thứ nguyên để loại đáp án', cap: 3,
  ct: 'Đơn vị của đáp án phải khớp với đơn vị suy ra từ công thức.<br>'
    + '· Công, nhiệt lượng, năng lượng ⇒ J (hoặc kJ, MeV)<br>'
    + '· Công suất ⇒ W = J/s<br>'
    + '· Nếu đề hỏi W mà đáp án ra cỡ 10⁶ trong bài đun ấm nước gia đình thì chắc chắn sai bậc độ lớn.<br>'
    + 'Ước lượng bậc độ lớn trước, rồi mới tính chính xác.',
  khi: 'Bài nhiều bước, dễ lệch 10ⁿ do đổi đơn vị.',
  vd: 'Ấm điện gia đình có công suất cỡ 1 000 – 2 000 W. Ra 150 000 W là đã nhân dư 100 lần ở đâu đó.',
  bay: 'Bậc độ lớn quen thuộc: c = 3·10⁸ m/s · g = 9,8 m/s² · c<sub>nước</sub> = 4200 J/(kg·K) · '
     + 'λ<sub>nước đá</sub> = 3,34·10⁵ J/kg · L<sub>nước</sub> = 2,26·10⁶ J/kg.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Suy đoán bằng tỉ lệ thay vì tính số', cap: 2,
  ct: 'Rất nhiều câu chỉ hỏi "tăng bao nhiêu lần", không cần con số cụ thể:<br>'
    + '· Hao phí truyền tải ΔP ∝ 1/U² ⇒ U tăng 10 lần thì ΔP giảm 100 lần.<br>'
    + '· Chu kì con lắc đơn T ∝ √ℓ ⇒ ℓ tăng 4 lần thì T tăng 2 lần.<br>'
    + '· Cường độ âm I ∝ 1/r² ⇒ r tăng gấp đôi thì I giảm 4 lần.<br>'
    + '· Lực Coulomb, lực hấp dẫn ∝ 1/r².',
  khi: 'Câu hỏi so sánh hai trạng thái mà không cho đủ số liệu để tính tuyệt đối.',
  vd: 'Giảm bước sóng đi một nửa ⇒ năng lượng photon ε = hc/λ TĂNG gấp đôi.',
  bay: 'Phân biệt tỉ lệ thuận với tỉ lệ nghịch, và nhớ số MŨ. Nhầm 1/r với 1/r² là sai gấp bội.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Chốt nhanh các câu lý thuyết quen mặt', cap: 1,
  ct: 'Những phát biểu sau LUÔN sai, thấy là loại ngay:<br>'
    + '· "Nội năng chỉ phụ thuộc nhiệt độ" (còn phụ thuộc thể tích)<br>'
    + '· "0 °C bằng 0 K" (0 °C = 273 K)<br>'
    + '· "Máy biến áp làm tăng công suất" (bảo toàn công suất)<br>'
    + '· "Hạt nhân có năng lượng liên kết lớn hơn thì bền hơn" (phải so năng lượng liên kết RIÊNG)<br>'
    + '· "Cường độ sáng lớn thì dễ gây quang điện" (phụ thuộc bước sóng)<br>'
    + '· "Lực Lorentz sinh công" (luôn vuông góc vận tốc nên công bằng 0)',
  khi: 'Phần I và phần II của đề, nơi tập trung câu lý thuyết.',
  vd: 'Ý "Trong quá trình nóng chảy, nhiệt độ của chất tăng đều" ⇒ SAI, nhiệt độ giữ nguyên.',
  bay: 'Cẩn thận với từ tuyệt đối hoá: "luôn luôn", "chỉ", "mọi trường hợp". '
     + 'Phát biểu vật lí có tính tuyệt đối rất dễ sai, nhưng không phải lúc nào cũng sai.' }
]);

/* ---------------- HOÁ ---------------- */
cam('hoa', [
{ nhom: '⌨️ Casio', ten: 'Giải hệ phương trình cho bài hỗn hợp', cap: 3,
  ct: 'Bài hỗn hợp hai chất hầu như luôn quy về hệ hai ẩn (số mol mỗi chất):<br>'
    + '① phương trình khối lượng ② phương trình về mol khí, mol electron hoặc mol NaOH.<br>'
    + 'Vào <b>MENU 9 → Simul Equation → 2 unknowns</b>, nhập hệ số, máy trả ngay x và y.<br>'
    + 'Ba chất thì chọn 3 ẩn — vẫn giải được trong 20 giây.',
  khi: 'Mọi bài "hỗn hợp X gồm A và B".',
  vd: 'Hỗn hợp Fe và Cu nặng 12 g, tác dụng HCl dư thu 0,1 mol H₂. Hệ: 56x + 64y = 12 và x = 0,1.',
  bay: 'Nghiệm âm hoặc bằng 0 nghĩa là đã lập sai phương trình, KHÔNG phải máy sai. '
     + 'Kiểm tra lại xem có bỏ sót chất nào không phản ứng không.' },

{ nhom: '⌨️ Casio', ten: 'TABLE dò công thức phân tử', cap: 3,
  ct: 'Bài biện luận công thức phân tử: đặt số nguyên tử C là X rồi cho máy chạy bảng.<br>'
    + 'Vào TABLE, nhập f(X) = biểu thức khối lượng mol theo X, Start = 1, End = 10, Step = 1.<br>'
    + 'Dò cột f(X) xem giá trị nào khớp M đề cho.<br>'
    + 'Cách này thay hẳn việc thử tay từng giá trị.',
  khi: 'Bài tìm CTPT của ester, amine, amino acid, hydrocarbon.',
  vd: 'Ester no đơn hở C<sub>n</sub>H<sub>2n</sub>O₂ có M = 88 ⇒ nhập 14X + 32, chạy bảng, thấy X = 4 cho 88 ⇒ C₄H₈O₂.',
  bay: 'Nghiệm phải là SỐ NGUYÊN DƯƠNG và thoả điều kiện tồn tại (số H chẵn, k ≥ 0). '
     + 'Ra X = 3,5 nghĩa là hỗn hợp hai chất đồng đẳng kế tiếp chứ không phải một chất.' },

{ nhom: '⌨️ Casio', ten: 'Đường chéo và giá trị trung bình bằng máy', cap: 2,
  ct: 'M trung bình = tổng khối lượng ÷ tổng số mol. Bấm thẳng, đừng biến đổi.<br>'
    + 'Quy tắc đường chéo cho tỉ lệ hai chất: n₁/n₂ = |M₂ − M̄| / |M̄ − M₁|.<br>'
    + 'Với hỗn hợp khí, dùng <b>tỉ khối</b>: M̄ = d × 29 (so với không khí) hoặc M̄ = d × 2 (so với H₂).',
  khi: 'Bài hỗn hợp hai chất mà đề cho tỉ khối hoặc khối lượng mol trung bình.',
  vd: 'Hỗn hợp có d/H₂ = 15 ⇒ M̄ = 30. Nếu hai chất là CH₄ (16) và C₂H₆ (30) thì tỉ lệ mol là 0 : 1 — tức chỉ có C₂H₆.',
  bay: 'M̄ luôn nằm GIỮA hai giá trị M₁ và M₂. Tính ra M̄ nằm ngoài khoảng đó là đã sai đề hoặc sai phép tính.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Loại đáp án bằng bảo toàn khối lượng thô', cap: 2,
  ct: 'Trước khi giải, ước lượng bằng bảo toàn khối lượng: khối lượng sản phẩm không thể lớn hơn '
    + 'tổng khối lượng các chất tham gia.<br>'
    + '· Muối tạo thành luôn NẶNG hơn kim loại ban đầu (thêm gốc acid).<br>'
    + '· Kim loại thu được luôn NHẸ hơn oxide ban đầu.<br>'
    + '· Số mol sản phẩm khử không vượt quá số mol electron ÷ số electron trao đổi.',
  khi: 'Chốt nhanh những câu tính khối lượng muối, khối lượng chất rắn.',
  vd: '5 g kim loại tác dụng HCl thu muối clorua ⇒ khối lượng muối phải &gt; 5 g. Đáp án 4,2 g loại ngay.',
  bay: 'Ước lượng chỉ loại được phương án phi lí. Hai phương án còn lại vẫn phải tính đàng hoàng.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Câu lý thuyết Hoá — những phát biểu luôn sai', cap: 1,
  ct: 'Thấy các ý sau là loại ngay:<br>'
    + '· "Cu(OH)₂ là hydroxide lưỡng tính" (SAI — Al(OH)₃, Zn(OH)₂, Cr(OH)₃ mới lưỡng tính)<br>'
    + '· "Saccharose tham gia phản ứng tráng bạc" (SAI — không có nhóm CHO tự do)<br>'
    + '· "Trùng ngưng không giải phóng phân tử nhỏ" (SAI — luôn giải phóng, thường là H₂O)<br>'
    + '· "Fe tan được trong HNO₃ đặc nguội" (SAI — Fe, Al, Cr bị thụ động hoá)<br>'
    + '· "Điện phân dung dịch NaCl thu được Na" (SAI — thu H₂ và NaOH ở catot)<br>'
    + '· "Tinh bột và cellulose là đồng phân của nhau" (SAI — khác hệ số n, không cùng CTPT)',
  khi: 'Phần I và phần II — chiếm tới 70% số điểm của đề Hoá.',
  vd: 'Ý "Glucose và fructose đều tráng bạc được" ⇒ ĐÚNG (fructose chuyển hoá thành glucose trong môi trường base).',
  bay: 'Đừng học vẹt danh sách này. Mỗi ý phải hiểu VÌ SAO sai, nếu không đề đảo chữ một chút là mắc bẫy.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Chiến thuật cho câu đúng/sai bốn ý', cap: 2,
  ct: 'Thang điểm phần II: đúng 1 ý 0,1đ · 2 ý 0,25đ · 3 ý 0,5đ · 4 ý 1,0đ.<br>'
    + '⇒ Chênh lệch giữa 3 ý và 4 ý là 0,5 điểm — lớn hơn cả ba bậc dưới cộng lại.<br>'
    + '<b>Không bao giờ bỏ trống ý nào</b>: đoán 1 ý vẫn có kì vọng dương.<br>'
    + 'Làm ý dễ trước, ý nào chắc chắn thì chốt, ý mơ hồ để cuối và suy từ ba ý đã chắc.',
  khi: 'Toàn bộ phần II của Hoá, Lý, Sinh, Sử, Địa, GDKT.',
  vd: 'Đã chắc 3 ý, ý còn lại phân vân ⇒ vẫn phải đánh, vì đánh sai chỉ mất phần thưởng 0,5 chứ không bị trừ.',
  bay: 'Bốn ý của một câu đúng/sai KHÔNG nhất thiết có tỉ lệ đúng–sai cố định. '
     + 'Đừng suy "chắc phải có 2 đúng 2 sai" — đề hoàn toàn có thể cho cả 4 ý đúng.' }
]);

/* ---------------- SINH ---------------- */
cam('sinh', [
{ nhom: '⌨️ Casio', ten: 'nCr, luỹ thừa và phân số cho bài xác suất di truyền', cap: 3,
  ct: '<b>nCr</b> — tính số tổ hợp, dùng cho bài xác suất trong phả hệ và bài "trong n người con có k người bị bệnh".<br>'
    + 'Công thức: P = C<sup>k</sup><sub>n</sub> × p^k × q^(n−k).<br>'
    + '<b>Phím a b/c</b> — giữ kết quả ở dạng phân số, khớp với đáp án thường cho dạng 9/16, 3/8.<br>'
    + '<b>Luỹ thừa</b> — tự thụ phấn n đời: Aa còn (1/2)ⁿ.',
  khi: 'Bài xác suất kiểu gene, kiểu hình, bài phả hệ.',
  vd: 'Bố mẹ Aa × Aa, sinh 3 con. Xác suất đúng 1 con bị bệnh (aa) = C¹₃ × (1/4)¹ × (3/4)² = 27/64.',
  bay: 'Đề hay hỏi "ít nhất một" — tính bằng 1 trừ xác suất KHÔNG có ai, đừng cộng từng trường hợp.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Nhận dạng quy luật di truyền qua tỉ lệ', cap: 3,
  ct: 'Nhìn tổng mẫu số là ra ngay quy luật:<br>'
    + '· Tổng <b>16</b> mà không phải 9:3:3:1 ⇒ <b>tương tác gene</b> (9:7 · 9:6:1 · 9:3:4 · 12:3:1 · 13:3 · 15:1)<br>'
    + '· Tổng <b>4</b> với 3:1 ⇒ một cặp gene trội lặn hoàn toàn<br>'
    + '· Tỉ lệ 1:2:1 ở kiểu hình ⇒ trội KHÔNG hoàn toàn<br>'
    + '· Tỉ lệ khác nhau giữa hai giới ⇒ gene nằm trên NST giới tính<br>'
    + '· Đời con giống hệt mẹ ⇒ gene ngoài nhân (ti thể, lục lạp)',
  khi: 'Câu vận dụng về quy luật di truyền — luôn có trong đề.',
  vd: 'F₂ cho 9 : 7 ⇒ tương tác BỔ SUNG, cần cả A và B mới biểu hiện kiểu hình trội.',
  bay: 'Rút gọn tỉ lệ trước khi đoán. 18:14 chính là 9:7, không phải một quy luật mới.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Ba con số phải nhớ để soát kết quả', cap: 2,
  ct: '· <b>Tần số hoán vị f ≤ 50%</b> — tính ra hơn 50% là đã nhầm nhóm tái tổ hợp với nhóm liên kết.<br>'
    + '· <b>p + q = 1</b> và <b>p² + 2pq + q² = 1</b> — cộng lại không tròn 1 là sai.<br>'
    + '· <b>Hiệu suất sinh thái ≈ 10%</b> mỗi bậc — nên chuỗi thức ăn chỉ 4–5 mắt xích.<br>'
    + '· Trong DNA mạch kép: <b>A = T, G = X</b> và A + G = 50% tổng số nucleotide.',
  khi: 'Soát lại mọi bài tính toán Sinh trước khi tô đáp án.',
  vd: 'Tính ra %A = 30% ⇒ %G phải là 20%, vì A + G = 50%.',
  bay: 'Quy tắc A = T, G = X chỉ đúng cho DNA MẠCH KÉP. Với một mạch đơn hoặc với RNA thì không áp dụng.' }
]);

/* ---------------- CHUNG CHO KHỐI XÃ HỘI ---------------- */
/* Hai thẻ dưới đây dùng chung cho các môn trắc nghiệm khối xã hội, nhưng
   MỖI MÔN phải tự cấp ví dụ và bảng từ khoá của mình. Viết dưới dạng hàm
   nhận `r` (phần riêng của môn) để không thể thêm thẻ chung mà quên phần
   riêng — đó chính là lỗi khiến Cấm Thư Tiếng Anh từng chứa ví dụ Lịch sử. */
const chungXH = (r) => [
{ nhom: '👁️ Nhìn là biết', ten: 'Từ tuyệt đối hoá — dấu hiệu của phát biểu sai', cap: 2,
  ct: 'Phát biểu chứa <b>"luôn luôn", "duy nhất", "mọi", "tất cả", "chỉ", "không bao giờ", "hoàn toàn"</b> '
    + 'có xác suất sai cao hơn hẳn.<br>'
    + 'Ngược lại, phát biểu chứa <b>"thường", "chủ yếu", "một trong những", "góp phần", "phần lớn"</b> '
    + 'có xác suất đúng cao hơn.<br>'
    + 'Đây là hệ quả của cách viết học thuật: kết luận tuyệt đối rất khó đúng trong mọi trường hợp.',
  khi: `Câu lý thuyết ${r.ten} khi không nhớ chắc kiến thức.`,
  vd: r.vdTuyetDoi,
  bay: r.bayTuyetDoi },

{ nhom: '👁️ Nhìn là biết', ten: 'Đọc từ khoá trong câu hỏi trước khi đọc phương án', cap: 1,
  ct: '<b>Từ khoá dùng chung cho mọi môn trắc nghiệm:</b><br>'
    + '· <b>"KHÔNG phải", "NGOẠI TRỪ"</b> ⇒ ba phương án đúng, phải tìm cái SAI<br>'
    + '· <b>"chủ yếu", "quan trọng nhất", "trực tiếp"</b> ⇒ nhiều phương án cùng đúng, chọn cái trọng yếu nhất<br>'
    + '· <b>"theo đoạn trích", "theo bảng số liệu"</b> ⇒ bám dữ liệu đề cho, không suy diễn ngoài<br>'
    + `<b>Từ khoá riêng của ${r.ten}:</b><br>${r.tuKhoa}`,
  khi: `Mọi câu trắc nghiệm ${r.ten}.`,
  vd: r.vdTuKhoa,
  bay: 'Chữ "không" và "ngoại trừ" thường in thường, không in đậm. Đọc chậm lại ở những câu này — '
     + 'đọc lướt rồi chọn phương án ĐÚNG là mất điểm oan.' }
];

const RIENG_XH = {
  su: { ten: 'Lịch sử',
    vdTuyetDoi: '"Đây là nguyên nhân DUY NHẤT dẫn tới thắng lợi" ⇒ gần như chắc chắn sai; '
      + 'thắng lợi luôn do nhiều nguyên nhân hợp lại.',
    bayTuyetDoi: 'Có ngoại lệ thật: "Cách mạng tháng Tám 1945 mở ra kỉ nguyên độc lập, tự do" là phát biểu '
      + 'tuyệt đối mà ĐÚNG. Mẹo này chỉ để xếp thứ tự ưu tiên khi đã bí.',
    tuKhoa: '· <b>"nguyên nhân quyết định"</b> ⇒ nhân tố CHỦ QUAN (sự lãnh đạo của Đảng, sức mạnh đại đoàn kết)<br>'
      + '· <b>"nguyên nhân khách quan"</b> ⇒ yếu tố bên ngoài (bối cảnh quốc tế, sự giúp đỡ của bạn bè)<br>'
      + '· <b>"ý nghĩa lớn nhất"</b> ⇒ bước ngoặt, mở ra thời kì hoặc kỉ nguyên mới<br>'
      + '· <b>"điểm khác biệt căn bản"</b> ⇒ khác ở BẢN CHẤT, không phải khác ở hình thức hay qui mô',
    vdTuKhoa: 'Hỏi "nguyên nhân quyết định thắng lợi kháng chiến chống Mỹ" ⇒ chọn sự lãnh đạo của Đảng, '
      + 'không chọn sự giúp đỡ của Liên Xô và Trung Quốc (đó là điều kiện khách quan).' },

  dia: { ten: 'Địa lí',
    vdTuyetDoi: '"Vùng này KHÔNG gặp bất kì khó khăn nào về tài nguyên" ⇒ gần như chắc chắn sai; '
      + 'vùng nào cũng có hạn chế riêng.',
    bayTuyetDoi: 'Có ngoại lệ thật: "Tây Nguyên là vùng DUY NHẤT không giáp biển" là phát biểu tuyệt đối mà ĐÚNG. '
      + 'Mẹo này chỉ dùng khi đã bí.',
    tuKhoa: '· <b>"nhân tố chủ yếu", "nguyên nhân chủ yếu"</b> ⇒ thường là địa hình, hoàn lưu khí quyển hoặc vị trí<br>'
      + '· <b>"nhằm mục đích chủ yếu"</b> ⇒ chọn mục tiêu kinh tế trọng tâm, không chọn mục tiêu phụ<br>'
      + '· <b>"thể hiện rõ nhất"</b> ⇒ chọn dạng biểu đồ khớp với động từ trong yêu cầu<br>'
      + '· <b>"theo bảng số liệu, nhận xét nào đúng"</b> ⇒ phải TÍNH rồi mới kết luận, không đoán',
    vdTuKhoa: 'Hỏi "nhân tố chủ yếu khiến Bắc Trung Bộ khô nóng đầu mùa hạ" ⇒ chọn hiệu ứng phơn do dãy Trường Sơn, '
      + 'không chọn "vị trí gần chí tuyến".' },

  gdkt: { ten: 'GDKT & Pháp luật',
    vdTuyetDoi: '"Hội nhập kinh tế CHỈ mang lại lợi ích" ⇒ chắc chắn sai; hội nhập luôn có hai mặt.',
    bayTuyetDoi: 'Có ngoại lệ thật: "Mọi công dân đều bình đẳng trước pháp luật" là phát biểu tuyệt đối mà ĐÚNG '
      + 'vì đó là nguyên tắc hiến định. Mẹo này không thay được việc nắm luật.',
    tuKhoa: '· <b>"vi phạm loại nào"</b> ⇒ xác định quan hệ bị xâm phạm: quản lí nhà nước, tài sản, nội quy hay tội phạm<br>'
      + '· <b>"quyền nào bị xâm phạm"</b> ⇒ bám ĐỐI TƯỢNG bị xâm phạm: thư từ, chỗ ở, thân thể hay danh dự<br>'
      + '· <b>"phải chịu trách nhiệm gì"</b> ⇒ một hành vi có thể kéo theo NHIỀU loại trách nhiệm cùng lúc<br>'
      + '· <b>"trực tiếp thực hiện"</b> ⇒ tìm chủ thể hành động, không tìm chủ thể xúi giục hay bao che',
    vdTuKhoa: 'Tình huống vượt đèn đỏ gây tai nạn chết người ⇒ vừa vi phạm hành chính vừa vi phạm hình sự '
      + 'và phải bồi thường dân sự.' },

  anh: { ten: 'Tiếng Anh',
    vdTuyetDoi: 'Trong bài đọc hiểu, phương án chứa "always", "never", "all", "only" thường quá mạnh so với '
      + 'giọng điệu thận trọng của bài; phương án đúng hay dùng "often", "may", "tend to", "most".',
    bayTuyetDoi: 'Mẹo này chỉ áp dụng cho câu SUY LUẬN và câu ý chính của bài đọc. '
      + 'Câu ngữ pháp thì đúng sai do quy tắc, không liên quan tới mức độ mạnh yếu của từ ngữ.',
    tuKhoa: '· <b>"According to the passage"</b> ⇒ đáp án nằm NGUYÊN trong bài, không suy diễn<br>'
      + '· <b>"can be inferred", "implies"</b> ⇒ đáp án KHÔNG có sẵn, phải suy từ dữ kiện trong bài<br>'
      + '· <b>"closest in meaning to"</b> ⇒ đoán nghĩa theo NGỮ CẢNH, không theo nghĩa quen thuộc nhất<br>'
      + '· <b>"refers to"</b> ⇒ tìm danh từ gần nhất phía trước, khớp cả nghĩa lẫn số ít/số nhiều<br>'
      + '· <b>"The word/phrase … in line X"</b> ⇒ quay lại đúng dòng đó rồi đọc trọn câu chứa nó',
    vdTuKhoa: 'Câu "What can be inferred about the author\'s attitude?" ⇒ tác giả không nói thẳng thái độ, '
      + 'phải suy từ cách trình bày (nêu cả ưu lẫn nhược ⇒ thái độ trung lập, cân bằng).' }
};

['su', 'dia', 'gdkt', 'anh'].forEach(m => cam(m, chungXH(RIENG_XH[m])));

/* Thẻ riêng cho từng môn — trước đây thiếu nên phải mượn tạm thẻ của Lịch sử */
TD.KHO.su_cam = (TD.KHO.su_cam || []).concat([
{ nhom: '👁️ Nhìn là biết', ten: 'Loại phương án bằng mốc thời gian và logic nhân quả', cap: 3, cd: '*',
  ct: 'Một phương án chỉ đúng nếu nó KHẢ THI về mặt thời gian:<br>'
    + '· Kết quả không thể xảy ra TRƯỚC nguyên nhân.<br>'
    + '· Tổ chức chưa ra đời thì không thể tham gia sự kiện.<br>'
    + '· Đặt câu hỏi "cái này có trước hay sau mốc đề cho?"<br>'
    + 'Chỉ cần thuộc trục thời gian là loại được 1–2 phương án của phần lớn câu Sử.',
  khi: 'Câu Sử về nguyên nhân, ý nghĩa, tác động.',
  vd: 'Câu hỏi về Cách mạng tháng Tám 1945 mà phương án nhắc tới "gia nhập ASEAN" (1995) ⇒ loại ngay.',
  bay: 'Cẩn thận với sự kiện diễn ra CÙNG NĂM — lúc đó phải nhớ tới tháng, ví dụ Hiệp định Genève (7/1954) '
     + 'diễn ra SAU chiến thắng Điện Biên Phủ (5/1954).' }
]);

TD.KHO.dia_cam = (TD.KHO.dia_cam || []).concat([
{ nhom: '👁️ Nhìn là biết', ten: 'Bẫy số liệu: giá trị tăng nhưng tỉ trọng giảm', cap: 3, cd: '*',
  ct: 'Đây là bẫy xuất hiện gần như mọi đề Địa:<br>'
    + '· <b>Giá trị tuyệt đối TĂNG</b> mà <b>tỉ trọng vẫn GIẢM</b> — xảy ra khi tổng tăng nhanh hơn thành phần đó.<br>'
    + '· Ngược lại, tỉ trọng tăng chưa chắc giá trị tăng.<br>'
    + 'Khi nhận xét cơ cấu phải dùng chữ <b>"tỉ trọng"</b>; khi nhận xét bảng giá trị mới dùng chữ '
    + '<b>"giá trị", "sản lượng"</b>.<br>'
    + 'Gặp câu "nhận xét nào đúng" ⇒ tính nhanh cả HAI năm rồi mới kết luận.',
  khi: 'Câu nhận xét bảng số liệu và biểu đồ — chiếm nhiều điểm của đề Địa.',
  vd: 'Nông nghiệp từ 20 lên 25 nghìn tỉ nhưng tổng GDP từ 100 lên 150 ⇒ giá trị TĂNG mà tỉ trọng GIẢM từ 20% xuống 16,7%.',
  bay: 'Đọc kĩ đơn vị của bảng: "%" là cơ cấu, "nghìn tỉ đồng" hay "nghìn tấn" là giá trị. '
     + 'Nhận xét sai loại là mất điểm dù tính đúng.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Nhận dạng vùng qua đặc điểm độc nhất', cap: 2, cd: '*',
  ct: 'Mỗi vùng có một dấu hiệu KHÔNG vùng nào khác có — thấy là chốt ngay:<br>'
    + '· <b>Tây Nguyên</b> — vùng duy nhất KHÔNG giáp biển; đất badan lớn nhất<br>'
    + '· <b>Đồng bằng sông Hồng</b> — mật độ dân số cao nhất; có mùa đông lạnh ở đồng bằng<br>'
    + '· <b>Trung du miền núi Bắc Bộ</b> — mùa đông lạnh nhất; trữ năng thuỷ điện lớn nhất<br>'
    + '· <b>Duyên hải Nam Trung Bộ</b> — khô hạn nhất cả nước<br>'
    + '· <b>Đông Nam Bộ</b> — dẫn đầu công nghiệp, FDI và GRDP/người<br>'
    + '· <b>Đồng bằng sông Cửu Long</b> — dẫn đầu lúa, thuỷ sản, cây ăn quả; xâm nhập mặn nặng nhất',
  khi: 'Câu "vùng nào có…" và câu nhận dạng vùng qua Atlat.',
  vd: 'Đề nhắc "vùng có thế mạnh nuôi trồng thuỷ sản nước lợ lớn nhất" ⇒ Đồng bằng sông Cửu Long, '
    + 'loại ngay Tây Nguyên và Trung du miền núi Bắc Bộ.',
  bay: 'Đề hay gán thế mạnh của vùng NÀY sang vùng KHÁC. Nhớ dấu hiệu độc nhất là loại được ngay.' }
]);

TD.KHO.gdkt_cam = (TD.KHO.gdkt_cam || []).concat([
{ nhom: '👁️ Nhìn là biết', ten: 'Giải tình huống pháp luật theo ba câu hỏi', cap: 3, cd: '*',
  ct: '<b>① Hành vi xâm phạm QUAN HỆ nào?</b> quản lí nhà nước ⇒ hành chính · tài sản, nhân thân ⇒ dân sự · '
    + 'nội quy cơ quan ⇒ kỉ luật · nguy hiểm cho xã hội ⇒ hình sự.<br>'
    + '<b>② Mức độ đã tới ngưỡng TỘI PHẠM chưa?</b> cùng một hành vi, nhẹ thì hành chính, nặng thành hình sự.<br>'
    + '<b>③ Chủ thể đã đủ TUỔI chịu trách nhiệm chưa?</b> đủ 14 đến dưới 16 chịu trách nhiệm hình sự về tội rất '
    + 'nghiêm trọng và đặc biệt nghiêm trọng · đủ 16 chịu trách nhiệm về mọi tội · '
    + 'đủ 14 đến dưới 16 chỉ bị phạt hành chính về vi phạm CỐ Ý · đủ 16 chịu trách nhiệm hành chính về mọi vi phạm.<br>'
    + 'Một hành vi có thể kéo theo NHIỀU loại trách nhiệm cùng lúc.',
  khi: 'Câu tình huống — dạng phổ biến nhất của đề GDKT & Pháp luật.',
  vd: 'Học sinh 15 tuổi đi xe máy trên 50 cm³ ⇒ vi phạm hành chính (lỗi cố ý nên vẫn bị xử phạt).',
  bay: 'Đừng chọn loại vi phạm theo cảm tính "nghe nghiêm trọng". Phải bám QUAN HỆ bị xâm phạm và MỨC ĐỘ.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Cặp khái niệm kinh tế hay bị đảo', cap: 2, cd: '*',
  ct: '· <b>Tăng trưởng</b> (tăng về lượng) ≠ <b>phát triển</b> (kèm chuyển dịch cơ cấu và tiến bộ xã hội)<br>'
    + '· <b>GDP</b> (theo lãnh thổ) ≠ <b>GNI</b> (theo sở hữu, quốc tịch)<br>'
    + '· <b>Thuế trực thu</b> (người nộp = người chịu: TNCN, TNDN) ≠ <b>thuế gián thu</b> (nộp hộ: VAT, tiêu thụ đặc biệt)<br>'
    + '· <b>CPI</b> (chỉ số, năm gốc = 100) ≠ <b>tỉ lệ lạm phát</b> (phần vượt trên 100)<br>'
    + '· <b>Khiếu nại</b> (người bị ảnh hưởng trực tiếp, đòi lại quyền lợi) ≠ <b>tố cáo</b> (mọi công dân, ngăn hành vi vi phạm)<br>'
    + '· <b>Bảo hiểm xã hội</b> (phi lợi nhuận, Nhà nước tổ chức) ≠ <b>bảo hiểm thương mại</b> (doanh nghiệp, vì lợi nhuận)',
  khi: 'Câu lý thuyết và câu tình huống — đề luôn khai thác chỗ dễ đảo này.',
  vd: 'Thuế tiêu thụ đặc biệt đánh vào hàng xa xỉ nhưng vẫn là thuế GIÁN thu, không phải trực thu.',
  bay: 'Đừng suy luận theo cảm tính "đánh vào người giàu nên là trực thu". Phân loại dựa trên việc '
     + 'người NỘP và người CHỊU thuế có phải một hay không.' }
]);

/* Ngữ văn thi TỰ LUẬN nên mẹo loại phương án trắc nghiệm không dùng được.
   Cấm Thư của Văn là mẹo ăn điểm trong bài viết. */
cam('van', [
{ nhom: '👁️ Nhìn là biết', ten: 'Ba câu đầu phần Đọc hiểu là điểm cho không', cap: 1,
  ct: 'Câu 1–2 luôn ở mức NHẬN BIẾT, trả lời thẳng một dòng, không cần phân tích:<br>'
    + '· Thể thơ ⇒ ĐẾM số chữ mỗi dòng.<br>'
    + '· Phương thức biểu đạt ⇒ nhìn xem văn bản đang kể, tả, bày tỏ cảm xúc hay lập luận.<br>'
    + '· Phong cách ngôn ngữ ⇒ nhìn nguồn trích: báo, tác phẩm văn học, bài phát biểu hay bài khoa học.<br>'
    + '· "Theo tác giả, …" ⇒ CHÉP lại đúng ý trong văn bản, không được nêu ý riêng.<br>'
    + 'Ba câu này gọn trong 5 phút mà đã được khoảng 1,5–2,0 điểm.',
  khi: 'Ngay khi mở đề — làm phần Đọc hiểu trước.',
  vd: 'Hỏi "Theo tác giả, điều gì làm nên hạnh phúc?" ⇒ tìm đúng câu văn chứa ý đó rồi dẫn lại, không diễn giải dài.',
  bay: 'Phân biệt "Theo tác giả" (bám văn bản) với "Theo anh/chị" (nêu ý kiến riêng). '
     + 'Trả lời nhầm vai là mất trọn điểm câu đó dù viết hay.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Công thức trả lời tác dụng biện pháp tu từ', cap: 2,
  ct: 'Luôn viết đủ BA tầng, thiếu tầng nào mất điểm tầng đó:<br>'
    + '① <b>Gọi tên</b> biện pháp và chỉ ra biểu hiện cụ thể trong ngữ liệu.<br>'
    + '② <b>Tác dụng nghệ thuật</b>: tạo hình ảnh sinh động / tạo nhịp điệu / gây ấn tượng.<br>'
    + '③ <b>Tác dụng nội dung</b>: làm nổi bật điều gì và thể hiện tình cảm gì của tác giả.<br>'
    + 'Chỉ gọi tên mà không nêu tác dụng thường chỉ được nửa số điểm.',
  khi: 'Câu 3 hoặc câu 4 phần Đọc hiểu — câu này gần như đề nào cũng có.',
  vd: '"Điệp ngữ X lặp 3 lần, tạo nhịp điệu dồn dập, nhấn mạnh nỗi nhớ da diết và thể hiện tình cảm gắn bó của tác giả."',
  bay: 'Đừng nhầm ẩn dụ với hoán dụ: ẩn dụ dựa trên nét TƯƠNG ĐỒNG, hoán dụ dựa trên quan hệ GẦN GŨI.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Những lỗi hình thức mất điểm oan', cap: 2,
  ct: '· Đoạn văn 200 chữ mà <b>xuống dòng</b> chia ba phần ⇒ mất điểm cấu trúc (đoạn phải viết liền mạch).<br>'
    + '· Bài văn <b>không có kết bài</b> ⇒ mất điểm bố cục. Thà kết hai câu còn hơn bỏ trống.<br>'
    + '· Mở bài dài lê thê ⇒ không được tính điểm nội dung mà lại ngốn thời gian.<br>'
    + '· Viết sai chính tả nhiều ⇒ mất điểm tiêu chí diễn đạt dù nội dung tốt.<br>'
    + '· Mỗi luận điểm nên tách một đoạn có câu chủ đề mở đầu để giám khảo thấy rõ ý.',
  khi: 'Phần Viết — chiếm 6,0 trên 10 điểm.',
  vd: 'Còn 3 phút mà chưa xong thân bài ⇒ dừng lại viết ngay hai câu kết bài rồi mới quay lại bổ sung nếu kịp.',
  bay: 'Điểm hình thức và sáng tạo chiếm khoảng 0,5 điểm — đủ để đổi một bậc điểm số. Đừng coi thường.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Quản lí thời gian 120 phút', cap: 1,
  ct: '<b>20–25 phút</b> Đọc hiểu (4,0đ) → <b>25 phút</b> viết đoạn (2,0đ) → <b>65–70 phút</b> viết bài (4,0đ) → <b>5 phút</b> soát.<br>'
    + 'Làm Đọc hiểu TRƯỚC vì đây là phần dễ ăn điểm nhất trên mỗi phút bỏ ra.<br>'
    + 'Đặt mốc giờ cụ thể ngay khi phát đề, ghi lên góc nháp.',
  khi: 'Ngay phút đầu tiên của buổi thi.',
  vd: 'Bắt đầu 7h30 ⇒ ghi: 7h55 xong Đọc hiểu · 8h20 xong đoạn văn · 9h25 xong bài văn · 9h30 nộp.',
  bay: 'Sa đà vào một câu đọc hiểu khó là mất thời gian của câu 4 điểm. Bí quá thì viết một ý rồi đi tiếp.' }
]);

/* thêm phần riêng cho Địa và Anh */
TD.KHO.dia_cam = (TD.KHO.dia_cam || []).concat([
{ nhom: '⌨️ Casio', ten: 'Bấm nhanh bảng số liệu Địa lí', cap: 2, cd: '*',
  ct: 'Dùng chức năng <b>thống kê</b> (MENU 6) nhập cả cột số liệu một lần, máy trả tổng Σx — '
    + 'khỏi cộng tay khi tính cơ cấu.<br>'
    + 'Tính tốc độ tăng trưởng hàng loạt: lưu năm gốc vào biến A (SHIFT + STO), rồi nhập X ÷ A × 100 và bấm CALC cho từng năm.<br>'
    + 'Bán kính biểu đồ tròn: R₂ = R₁ × √(Tổng₂ ÷ Tổng₁) — bấm một lần bằng phím căn.',
  khi: 'Câu xử lí bảng số liệu, chọn biểu đồ, nhận xét.',
  vd: 'Ba thành phần 250, 480, 370 ⇒ Σ = 1100; tỉ trọng thành phần đầu = 250 ÷ 1100 × 100 = 22,73%.',
  bay: 'Cộng tay ba số rồi chia là chỗ sai vặt hay gặp nhất. Ba tỉ trọng phải cộng đúng 100%.' }
]);

TD.KHO.anh_cam = (TD.KHO.anh_cam || []).concat([
{ nhom: '👁️ Nhìn là biết', ten: 'Nhận đáp án ngữ pháp qua VỊ TRÍ chỗ trống', cap: 2, cd: '*',
  ct: 'Không cần hiểu nghĩa cả câu, chỉ cần nhìn từ ĐỨNG TRƯỚC và ĐỨNG SAU chỗ trống:<br>'
    + '· sau mạo từ a/an/the hoặc tính từ sở hữu ⇒ <b>danh từ</b><br>'
    + '· sau to be, seem, become, feel ⇒ <b>tính từ</b><br>'
    + '· bổ nghĩa cho động từ, hoặc đứng đầu/cuối câu tách bởi dấu phẩy ⇒ <b>trạng từ</b><br>'
    + '· sau modal (can, must, should) ⇒ <b>động từ nguyên thể</b><br>'
    + '· sau giới từ (kể cả "to" là giới từ) ⇒ <b>V-ing</b>',
  khi: 'Câu word form và câu điền từ — chiếm khoảng 8–10 câu mỗi đề.',
  vd: '"He spoke ____ about his plan" — sau động từ "spoke" nên phải là trạng từ: confidently.',
  bay: '"to" có hai vai: trợ từ nguyên thể (want TO go) và giới từ (look forward TO going). '
     + 'Phân biệt bằng cách xem cụm cố định đứng trước.' },

{ nhom: '👁️ Nhìn là biết', ten: 'Bốn cặp bẫy chốt điểm 9–10 Tiếng Anh', cap: 4, cd: '*',
  ct: '① <b>No sooner … THAN</b> ≠ <b>Hardly … WHEN</b><br>'
    + '② <b>used to + V</b> (thói quen quá khứ) ≠ <b>be used to + V-ing</b> (đã quen với)<br>'
    + '③ <b>despite / in spite of + N, V-ing</b> ≠ <b>although / though + mệnh đề</b><br>'
    + '④ <b>The number of + N số nhiều + động từ SỐ ÍT</b> ≠ <b>A number of + N số nhiều + động từ SỐ NHIỀU</b><br>'
    + 'Bốn cặp này gần như đề nào cũng có ít nhất một.',
  khi: 'Câu ngữ pháp mức vận dụng và câu tìm lỗi sai.',
  vd: '"The number of students ARE increasing" ⇒ sai, phải là "IS increasing".',
  bay: 'Học theo CẶP chứ đừng học lẻ từng vế — đề luôn cho vế này rồi bắt điền vế kia.' }
]);

})();
