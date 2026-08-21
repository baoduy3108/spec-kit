/* ============================================================
   CẤM THƯ — PHẦN BỔ SUNG
   Nạp sau cam-thu.js nên chỉ NỐI THÊM, không ghi đè.
   Bổ sung ba mảng còn thiếu hẳn:
     ① Hoá: bảng tuần hoàn, hoá trị, dãy hoạt động, nguyên tử khối
     ② Toán: nhìn ra tiệm cận đứng – ngang – xiên trong vài giây
     ③ Chiến thuật câu ĐÚNG/SAI 4 ý cho mọi môn, kèm bảng kỳ vọng
        điểm tính từ chính thang chấm 0,1 – 0,25 – 0,5 – 1,0
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

(function () {
const them = (mon, ds) => {
  const k = mon + '_cam';
  TD.KHO[k] = (TD.KHO[k] || []).concat(ds.map(x => (x.cd = '*', x)));
};

/* Thẻ chiến thuật câu đúng/sai — mọi môn trắc nghiệm đều dùng chung,
   nhưng ví dụ phải riêng từng môn nên nhận vào một mẩu nội dung. */
const theDS = (vd) => ({
  nhom: '👁 Nhìn là biết', ten: 'Câu Đúng/Sai 4 ý: bảng kỳ vọng điểm và luật không bỏ trống', cap: 3,
  ct: 'Thang chấm Phần II: đúng <b>1 ý = 0,1</b> · <b>2 ý = 0,25</b> · <b>3 ý = 0,5</b> · <b>4 ý = 1,0</b> điểm. '
    + 'Ý sai KHÔNG bị trừ. Từ đúng thang này tính ra kỳ vọng điểm khi đoán:<br>'
    + '<table class="kq"><tr><th>Tình huống</th><th>Kỳ vọng điểm</th></tr>'
    + '<tr><td>Đoán mò cả 4 ý</td><td><b>0,306</b></td></tr>'
    + '<tr><td>Chắc 1 ý, đoán 3</td><td><b>0,419</b></td></tr>'
    + '<tr><td>Chắc 2 ý, đoán 2</td><td><b>0,563</b></td></tr>'
    + '<tr><td>Chắc 3 ý, đoán 1</td><td><b>0,750</b></td></tr>'
    + '<tr><td>Bỏ trống hoàn toàn</td><td>0</td></tr></table>'
    + 'Ba điều rút ra:<br>'
    + '① <b>Không bao giờ bỏ trống một ý nào</b> — đoán mò cả câu vẫn được 0,306 điểm, nhiều hơn một câu Phần I (0,25 điểm).<br>'
    + '② <b>Ý thứ tư đáng giá bằng cả ba ý đầu cộng lại</b> (3 ý = 0,5 nhưng 4 ý = 1,0). Nếu đã chắc 3 ý thì '
    + 'đáng bỏ thêm một phút để nghĩ cho ra ý còn lại.<br>'
    + '③ Bốn ý được xếp theo độ khó tăng dần: ý a) và b) thường ở mức nhận biết – thông hiểu. '
    + 'Ăn chắc hai ý đầu trước rồi mới quay lại ý c), d).',
  khi: 'Mọi câu Phần II của mọi môn.',
  vd: vd,
  bay: 'Bốn ý xét ĐỘC LẬP với nhau. Đừng nghĩ "chắc phải có 2 đúng 2 sai" — cả bốn ý cùng đúng hoặc cùng sai '
     + 'là hoàn toàn có thể, và đề rất hay dùng đúng cái định kiến đó để gài.',
  meo: 'Đọc lướt cả bốn ý TRƯỚC khi trả lời ý nào. Nhiều khi ý d) chứa dữ kiện giúp giải ý b).'
});

/* ==========================================================
   TOÁN
   ========================================================== */
them('toan', [

{ nhom: '👁 Nhìn là biết', ten: 'Tiệm cận đứng – ngang – xiên: nhìn bậc là ra, không cần tính giới hạn', cap: 2,
  ct: 'Với hàm phân thức y = P(x)/Q(x), chỉ cần so BẬC của tử và mẫu:<br>'
    + '<table class="kq"><tr><th>Quan hệ bậc</th><th>Tiệm cận ngang</th><th>Tiệm cận xiên</th></tr>'
    + '<tr><td>bậc P &lt; bậc Q</td><td>y = 0</td><td>không có</td></tr>'
    + '<tr><td>bậc P = bậc Q</td><td>y = (hệ số cao nhất của P)/(hệ số cao nhất của Q)</td><td>không có</td></tr>'
    + '<tr><td>bậc P = bậc Q + 1</td><td>không có</td><td>có — lấy thương của phép chia</td></tr>'
    + '<tr><td>bậc P ≥ bậc Q + 2</td><td>không có</td><td>không có</td></tr></table>'
    + '<b>Tiệm cận đứng</b>: nghiệm của mẫu mà KHÔNG đồng thời là nghiệm của tử. '
    + 'Nếu là nghiệm chung thì phải rút gọn rồi mới kết luận.<br>'
    + '<b>Tiệm cận xiên</b>: chia đa thức P cho Q, được y = ax + b + M/Q(x); đường y = ax + b chính là tiệm cận xiên.',
  khi: 'Câu tiệm cận của đề thi — gần như năm nào cũng có, và luôn nằm ở mức nhận biết hoặc thông hiểu.',
  vd: 'y = (x² − 2x + 3)/(x + 1): bậc tử 2 = bậc mẫu 1 + 1 ⇒ có tiệm cận xiên. '
    + 'Chia được x − 3 + 6/(x + 1) ⇒ tiệm cận xiên y = x − 3. Mẫu x + 1 = 0 ⇒ x = −1, thay vào tử được 6 ≠ 0 ⇒ '
    + 'tiệm cận đứng x = −1. Vậy đồ thị có 1 tiệm cận đứng và 1 tiệm cận xiên, KHÔNG có tiệm cận ngang.',
  bay: 'Một đồ thị hàm phân thức <b>không bao giờ có đồng thời tiệm cận ngang và tiệm cận xiên</b> — '
     + 'phương án nào nói có cả hai là loại ngay. Bẫy thứ hai: mẫu có nghiệm nhưng tử cũng có nghiệm đó '
     + '(ví dụ y = (x² − 1)/(x − 1)) thì x = 1 KHÔNG phải tiệm cận đứng, đồ thị chỉ bị khuyết một điểm.',
  meo: 'Bấm nhanh trên Casio: nhập hàm rồi CALC với x = 10⁹ và x = −10⁹. Máy trả về một số hữu hạn ⇒ đó là tiệm cận ngang. '
     + 'Máy báo tràn số hoặc trả số rất lớn ⇒ không có tiệm cận ngang, chuyển sang xét tiệm cận xiên bằng cách '
     + 'CALC biểu thức y/x tại x = 10⁹ để lấy hệ số a, rồi CALC (y − ax) tại x = 10⁹ để lấy b.' },

{ nhom: '👁 Nhìn là biết', ten: 'Đọc đồ thị hàm bậc ba và bậc bốn trùng phương ra dấu của hệ số', cap: 3,
  ct: '<b>Hàm bậc ba y = ax³ + bx² + cx + d</b><br>'
    + '· Nhánh cuối đi LÊN ⇒ a &gt; 0; đi XUỐNG ⇒ a &lt; 0.<br>'
    + '· d là tung độ giao điểm với trục Oy — nhìn thẳng trên hình.<br>'
    + '· Có hai điểm cực trị ⇒ y′ = 3ax² + 2bx + c có hai nghiệm phân biệt ⇒ b² &gt; 3ac.<br>'
    + '· Hai điểm cực trị nằm cùng phía trục Oy ⇒ x₁x₂ = c/(3a) &gt; 0; khác phía ⇒ c/(3a) &lt; 0.<br>'
    + '· Điểm uốn có hoành độ x = −b/(3a) và luôn là tâm đối xứng của đồ thị.<br>'
    + '<b>Hàm trùng phương y = ax⁴ + bx² + c</b><br>'
    + '· Ba điểm cực trị ⇒ a·b &lt; 0 (trái dấu). Một điểm cực trị ⇒ a·b ≥ 0 (cùng dấu).<br>'
    + '· Đồ thị luôn nhận trục Oy làm trục đối xứng.',
  khi: 'Câu cho hình vẽ rồi hỏi dấu của các hệ số — dạng ăn điểm nhanh nhất nếu thuộc bảng này.',
  vd: 'Đồ thị bậc ba có nhánh phải đi xuống, cắt Oy tại điểm dương, có hai cực trị nằm hai bên trục Oy '
    + '⇒ a &lt; 0, d &gt; 0, và c/(3a) &lt; 0 nên c &gt; 0.',
  bay: 'Nhớ "ba cực trị thì a và b TRÁI dấu" chứ không phải cùng dấu. Rất nhiều bạn nhớ ngược. '
     + 'Kiểm nhanh bằng y = x⁴ − 2x² (a = 1 &gt; 0, b = −2 &lt; 0) có đúng ba cực trị.' },

theDS('Câu đúng/sai về khảo sát hàm số thường có ý a) hỏi số cực trị (nhận biết), '
    + 'ý d) hỏi số nghiệm của f(x) = m (vận dụng). Lập một bảng biến thiên rồi soi cả bốn ý vào đó là xong.'),

{ nhom: '⌨️ Casio', ten: 'Ba phím tắt cho thống kê và xác suất — dạng mới của chương trình 2018', cap: 2,
  ct: '<b>Thống kê một biến</b>: MENU 6 → 1 (fx-580VN X) hoặc MODE 3 → 1 (fx-570VN Plus). '
    + 'Nhập cột x và cột tần số, bấm AC rồi OPTN để lấy x̄ (số trung bình), σ (độ lệch chuẩn), σ² (phương sai).<br>'
    + '· Mẫu số liệu GHÉP NHÓM: nhập giá trị đại diện là TRUNG ĐIỂM mỗi nhóm vào cột x, tần số vào cột freq.<br>'
    + '· Nhớ bật cột tần số: SHIFT MENU → Statistics → Frequency ON.<br>'
    + '<b>Tổ hợp – chỉnh hợp</b>: nCr là SHIFT ÷ , nPr là SHIFT × . Gõ 12 SHIFT ÷ 5 = ra C(12;5).<br>'
    + '<b>Phân số xác suất</b>: bấm phím a b/c hoặc SHIFT S⇔D để đổi qua lại giữa phân số và số thập phân — '
    + 'đề hay yêu cầu ghi phân số tối giản.',
  khi: 'Toàn bộ chuyên đề Thống kê và Xác suất, kể cả xác suất có điều kiện.',
  vd: 'Mẫu ghép nhóm [30;40) tần số 5, [40;50) tần số 8: nhập x = 35 freq = 5, x = 45 freq = 8, '
    + 'rồi OPTN lấy x̄ và σ, khỏi phải cộng tay.',
  bay: 'Casio cho hai loại độ lệch chuẩn: σ (chia cho n) và s (chia cho n − 1). '
     + 'Chương trình phổ thông dùng <b>σ, chia cho n</b>. Lấy nhầm s là sai đáp án dù bấm đúng máy.' },

{ nhom: '👁 Nhìn là biết', ten: 'Loại đáp án bằng miền giá trị và tính chất, không cần giải', cap: 2,
  ct: '· <b>Xác suất</b> phải thuộc [0; 1] — thấy đáp án âm hoặc lớn hơn 1 là loại ngay.<br>'
    + '· <b>Diện tích, thể tích, khoảng cách, bán kính</b> luôn dương.<br>'
    + '· <b>Phương sai, độ lệch chuẩn</b> không âm; độ lệch chuẩn phải nhỏ hơn nửa khoảng biến thiên của mẫu.<br>'
    + '· <b>Số nghiệm, số cực trị, số điểm chung</b> là số nguyên không âm.<br>'
    + '· <b>Logarit</b> chỉ xác định khi cơ số dương khác 1 và biểu thức trong log dương — đáp án làm biểu thức âm là loại.<br>'
    + '· <b>Hàm bậc ba</b> có 0 hoặc 2 cực trị, không bao giờ có đúng 1 hay 3.<br>'
    + '· <b>Hàm trùng phương</b> có 1 hoặc 3 cực trị, không bao giờ có 2.',
  khi: 'Khi hết giờ và phải chọn nhanh, hoặc khi muốn soát lại đáp án vừa tính.',
  vd: 'Câu hỏi thể tích khối chóp mà có phương án âm ⇒ loại. Còn ba phương án, xác suất đoán trúng lên 1/3.',
  bay: 'Đây chỉ là cách LOẠI phương án chứ không phải cách chọn. Loại xong còn hai phương án thì vẫn phải tính.' }

]);

/* ==========================================================
   HOÁ HỌC
   ========================================================== */
them('hoa', [

{ nhom: '📖 Phải thuộc', ten: 'Bảng tuần hoàn: nhớ 20 nguyên tố đầu và bốn quy luật biến đổi', cap: 1,
  ct: '<b>20 nguyên tố đầu theo thứ tự số hiệu nguyên tử:</b><br>'
    + 'H · He · Li · Be · B · C · N · O · F · Ne · Na · Mg · Al · Si · P · S · Cl · Ar · K · Ca<br>'
    + 'Một câu để nhớ theo âm đầu: <i>"<b>H</b>ai <b>He</b> <b>Li</b>ền <b>Be</b>n <b>B</b>ờ <b>C</b>át, '
    + '<b>N</b>ước <b>O</b>ằn <b>F</b>ố <b>Ne</b>o, <b>Na</b>y <b>Mg</b> (Ma-giê) <b>Al</b> (Nhôm) <b>Si</b>nh '
    + '<b>P</b>hố <b>S</b>ắt <b>Cl</b>o <b>Ar</b>(Agon) <b>K</b>hông <b>Ca</b>"</i><br>'
    + '<b>Vị trí ⇄ cấu hình:</b> số thứ tự ô = số proton = số electron · số thứ tự chu kì = số lớp electron · '
    + 'số thứ tự nhóm A = số electron lớp ngoài cùng.<br>'
    + '<b>Bốn quy luật (chỉ cần nhớ chiều của bán kính, ba cái còn lại suy ra):</b><br>'
    + '· Trong một <b>chu kì</b>, từ trái sang phải: bán kính GIẢM ⇒ độ âm điện TĂNG, tính phi kim TĂNG, tính kim loại GIẢM.<br>'
    + '· Trong một <b>nhóm A</b>, từ trên xuống dưới: bán kính TĂNG ⇒ độ âm điện GIẢM, tính kim loại TĂNG, tính phi kim GIẢM.',
  khi: 'Câu so sánh bán kính, độ âm điện, tính kim loại – phi kim; câu xác định vị trí nguyên tố từ cấu hình.',
  vd: 'So sánh tính kim loại Na, Mg, K: Na và Mg cùng chu kì 3, Na đứng trước nên tính kim loại mạnh hơn Mg. '
    + 'Na và K cùng nhóm IA, K ở dưới nên mạnh hơn Na. Vậy thứ tự tăng dần là Mg &lt; Na &lt; K.',
  bay: 'Quy luật chỉ đúng trong CÙNG chu kì hoặc CÙNG nhóm. Hai nguyên tố ở chéo nhau thì phải bắc cầu qua '
     + 'một nguyên tố trung gian như ví dụ trên, không so trực tiếp được.',
  meo: 'Nhớ mốc: bán kính giảm theo chiều tăng của điện tích hạt nhân trong cùng chu kì vì hạt nhân hút electron mạnh hơn '
     + 'mà số lớp không đổi. Hiểu một câu này là suy ra được cả bốn quy luật, khỏi học thuộc.' },

{ nhom: '📖 Phải thuộc', ten: 'Hoá trị và quy tắc chéo — viết đúng công thức trong 5 giây', cap: 1,
  ct: '<b>Bài ca hoá trị (phần cần thuộc nhất):</b><br>'
    + '<i>Kali, Iot, Hidro / Natri với Bạc, Clo một loài / Là hoá trị I hỡi ai / Nhớ ghi cho kỹ khỏi hoài phân vân.<br>'
    + 'Magie, Kẽm với Thuỷ ngân / Oxi, Đồng, Thiếc thêm phần Bari / Cuối cùng thêm chữ Canxi / Hoá trị II nhớ có gì khó khăn.<br>'
    + 'Bác Nhôm hoá trị III lần / Ghi sâu trí nhớ khi cần có ngay.</i><br>'
    + '<b>Hoá trị thường gặp của gốc acid:</b> −OH, −NO₃, −Cl (I) · =SO₄, =CO₃, =SO₃ (II) · ≡PO₄ (III).<br>'
    + '<b>Quy tắc chéo</b> — dựng công thức AₓB_y: lấy hoá trị của A làm chỉ số của B và ngược lại, rồi rút gọn.',
  khi: 'Viết công thức hợp chất, cân bằng phương trình, tính khối lượng mol.',
  vd: 'Al (III) với SO₄ (II) ⇒ chéo lại được Al₂(SO₄)₃. Ca (II) với PO₄ (III) ⇒ Ca₃(PO₄)₂. '
    + 'Mg (II) với O (II) ⇒ Mg₂O₂, rút gọn thành MgO.',
  bay: 'Quên RÚT GỌN sau khi chéo là lỗi phổ biến: Ca với SO₄ đều hoá trị II, chéo ra Ca₂(SO₄)₂ '
     + 'nhưng công thức đúng là CaSO₄. Cứ chéo xong là kiểm ước chung.' },

{ nhom: '📖 Phải thuộc', ten: 'Dãy hoạt động hoá học và dãy điện hoá — một câu nhớ cả hai', cap: 1,
  ct: '<b>Dãy hoạt động hoá học của kim loại:</b><br>'
    + 'K · Na · Ca · Mg · Al · Zn · Fe · Ni · Sn · Pb · <b>H</b> · Cu · Hg · Ag · Pt · Au<br>'
    + 'Câu nhớ: <i>"<b>K</b>hi <b>Na</b>̀o <b>Ca</b>̂̀n <b>M</b>ay <b>A</b>́o <b>Z</b>áp <b>S</b>ắt (Fe) '
    + '<b>N</b>hớ <b>S</b>ang <b>P</b>hố <b>H</b>ỏi <b>C</b>ửa <b>H</b>àng <b>Á</b> <b>P</b>hi <b>Â</b>u"</i><br>'
    + '<b>Ba hệ quả dùng được ngay:</b><br>'
    + '① Kim loại đứng TRƯỚC H đẩy được H₂ ra khỏi dung dịch HCl và H₂SO₄ loãng; đứng sau H thì không.<br>'
    + '② Kim loại đứng trước đẩy được kim loại đứng sau ra khỏi dung dịch muối '
    + '(trừ K, Na, Ca, Ba vì chúng tan trong nước trước).<br>'
    + '③ Càng về bên trái tính khử càng mạnh; ion kim loại càng về bên phải tính oxi hoá càng mạnh.<br>'
    + '<b>Dãy điện hoá</b> chính là dãy trên viết dưới dạng cặp Mⁿ⁺/M, xếp theo thế điện cực chuẩn E° TĂNG dần từ trái sang phải. '
    + 'Trong pin điện hoá: cặp có E° NHỎ hơn làm anode (cực âm, bị oxi hoá), cặp có E° LỚN hơn làm cathode.',
  khi: 'Câu về ăn mòn, pin điện hoá, điện phân, phản ứng kim loại với acid và với dung dịch muối.',
  vd: 'Cu đứng sau H nên không tan trong HCl loãng, nhưng Cu đứng trước Ag nên Cu đẩy được Ag ra khỏi dung dịch AgNO₃. '
    + 'Nhúng thanh Cu vào AgNO₃ thì Ag bám vào thanh và khối lượng thanh TĂNG.',
  bay: 'Ngoại lệ quan trọng: Na vào dung dịch CuSO₄ KHÔNG đẩy Cu ra, mà Na phản ứng với nước trước tạo NaOH, '
     + 'sau đó NaOH mới kết tủa Cu(OH)₂. Đây là bẫy gần như đề nào cũng có.' },

{ nhom: '📖 Phải thuộc', ten: 'Nguyên tử khối phải thuộc lòng và mẹo kiểm tra bằng máy', cap: 1,
  ct: 'Đề cho sẵn nguyên tử khối nhưng dò lại mất thời gian. Mười bảy con số này phải bật ra ngay:<br>'
    + '<b>H</b> 1 · <b>C</b> 12 · <b>N</b> 14 · <b>O</b> 16 · <b>Na</b> 23 · <b>Mg</b> 24 · <b>Al</b> 27 · '
    + '<b>S</b> 32 · <b>Cl</b> 35,5 · <b>K</b> 39 · <b>Ca</b> 40 · <b>Fe</b> 56 · <b>Cu</b> 64 · <b>Zn</b> 65 · '
    + '<b>Br</b> 80 · <b>Ag</b> 108 · <b>Ba</b> 137<br>'
    + '<b>Khối lượng mol hay dùng:</b> H₂O 18 · CO₂ 44 · NaOH 40 · HCl 36,5 · H₂SO₄ 98 · HNO₃ 63 · '
    + 'CaCO₃ 100 · NaCl 58,5 · KOH 56 · Na₂CO₃ 106 · glucose C₆H₁₂O₆ 180 · saccharose C₁₂H₂₂O₁₁ 342.<br>'
    + '<b>Mẹo Casio</b>: lưu các hằng số hay dùng vào ô nhớ A, B, C bằng SHIFT + RCL + tên ô, gọi lại bằng ALPHA + tên ô. '
    + 'Đỡ phải gõ lại 22,4 hay 96500 hàng chục lần.',
  khi: 'Mọi bài tính toán hoá học.',
  vd: 'Thấy M = 180 nghĩ ngay tới glucose hoặc fructose; M = 342 là saccharose hoặc maltose; '
    + 'M = 60 là CH₃COOH hoặc C₃H₈O (propanol); M = 46 là C₂H₅OH hoặc HCOOH.',
  bay: 'Cl là 35,5 chứ không phải 35 — làm tròn thành 35 là lệch kết quả ngay từ bước đầu. '
     + 'Tương tự Cu là 64, không phải 63,5 trong đề thi phổ thông.' },

{ nhom: '👁 Nhìn là biết', ten: 'Bảng thuốc thử nhận biết — dò ngược từ hiện tượng ra chất', cap: 2,
  ct: '<table class="kq"><tr><th>Hiện tượng</th><th>Kết luận</th></tr>'
    + '<tr><td>Kết tủa trắng với dung dịch BaCl₂</td><td>có ion SO₄²⁻</td></tr>'
    + '<tr><td>Kết tủa trắng với AgNO₃, hoá đen ngoài ánh sáng</td><td>có ion Cl⁻</td></tr>'
    + '<tr><td>Sủi bọt khí không màu, làm đục nước vôi trong</td><td>có ion CO₃²⁻ hoặc HCO₃⁻</td></tr>'
    + '<tr><td>Kết tủa xanh lam</td><td>Cu(OH)₂ ⇒ có ion Cu²⁺</td></tr>'
    + '<tr><td>Kết tủa trắng xanh hoá nâu đỏ ngoài không khí</td><td>Fe(OH)₂ ⇒ có ion Fe²⁺</td></tr>'
    + '<tr><td>Kết tủa nâu đỏ</td><td>Fe(OH)₃ ⇒ có ion Fe³⁺</td></tr>'
    + '<tr><td>Kết tủa keo trắng, tan trong NaOH dư</td><td>Al(OH)₃ ⇒ có ion Al³⁺</td></tr>'
    + '<tr><td>Dung dịch xanh lam khi hoà tan Cu(OH)₂</td><td>chất có nhiều nhóm OH kề nhau: glycerol, glucose, saccharose</td></tr>'
    + '<tr><td>Kết tủa bạc trắng bám thành ống với AgNO₃/NH₃</td><td>có nhóm CHO: aldehyde, glucose, maltose, HCOOH và ester của nó</td></tr>'
    + '<tr><td>Dung dịch iod hoá xanh tím</td><td>có tinh bột</td></tr>'
    + '<tr><td>Quỳ tím hoá xanh</td><td>amine bậc một, amino acid nhiều nhóm NH₂ hơn COOH</td></tr></table>',
  khi: 'Câu nhận biết, câu đúng/sai về tính chất, và để loại phương án ở các câu hỗn hợp.',
  vd: 'Đề nói "thu được kết tủa nâu đỏ" ⇒ chắc chắn có Fe³⁺, loại ngay mọi phương án chỉ có Fe²⁺.',
  bay: 'Saccharose hoà tan được Cu(OH)₂ cho dung dịch xanh lam nhưng KHÔNG tráng bạc — vì không có nhóm CHO tự do. '
     + 'Đây là cặp bẫy kinh điển với glucose.' },

theDS('Câu đúng/sai môn Hoá hay cho một sơ đồ phản ứng rồi hỏi bốn ý về sản phẩm, hiện tượng, vai trò chất. '
    + 'Viết hết phương trình ra nháp một lần rồi soi cả bốn ý — nhanh hơn nhiều so với xét từng ý.')

]);


/* ==========================================================
   VẬT LÍ
   ========================================================== */
them('ly', [

{ nhom: '📖 Phải thuộc', ten: 'Bảng hằng số và đổi đơn vị của Vật lí 12 chương trình mới', cap: 1,
  ct: '<b>Hằng số phải nhớ:</b> nhiệt dung riêng của nước c = 4200 J/(kg·K) · nhiệt nóng chảy riêng của nước đá '
    + 'λ = 3,34·10⁵ J/kg · nhiệt hoá hơi riêng của nước L = 2,26·10⁶ J/kg · hằng số khí R = 8,31 J/(mol·K) · '
    + 'số Avogadro N_A = 6,02·10²³ · hằng số Boltzmann k = 1,38·10⁻²³ J/K · 1u = 931,5 MeV/c².<br>'
    + '<b>Đổi đơn vị hay quên:</b> 1 lít = 10⁻³ m³ · 1 atm = 1,013·10⁵ Pa · T(K) = t(°C) + 273 · '
    + '1 kWh = 3,6·10⁶ J · 1 MeV = 1,6·10⁻¹³ J · 1 amu = 1,66·10⁻²⁷ kg.<br>'
    + '<b>Ba công thức nhiệt dùng nhiều nhất:</b> Q = mcΔt (đổi nhiệt độ) · Q = mλ (nóng chảy) · Q = mL (hoá hơi).',
  khi: 'Toàn bộ chuyên đề Vật lí nhiệt và Khí lí tưởng — chiếm phần lớn Phần III của đề Lí.',
  vd: 'Đun 2 lít nước từ 25 °C lên 100 °C: m = 2 kg (vì 1 lít nước ≈ 1 kg), Q = 2 × 4200 × 75 = 630 000 J.',
  bay: 'Trong các định luật chất khí phải dùng nhiệt độ KELVIN. Còn trong Q = mcΔt thì dùng ĐỘ CHÊNH LỆCH '
     + 'nên °C hay K đều được vì hiệu hai nhiệt độ là như nhau. Nhớ đúng chỗ nào dùng cái nào.' },

{ nhom: '👁 Nhìn là biết', ten: 'Suy đáp án bằng tỉ lệ thuận – nghịch, không cần thay số', cap: 2,
  ct: 'Nhiều câu chỉ hỏi "đại lượng thay đổi bao nhiêu lần", không cần tính giá trị cụ thể:<br>'
    + '· Công suất hao phí trên đường dây ΔP = P²R/(U²cos²φ) ⇒ tỉ lệ NGHỊCH với BÌNH PHƯƠNG hiệu điện thế. '
    + 'Tăng U lên 10 lần thì hao phí giảm 100 lần.<br>'
    + '· Máy biến áp: U₂/U₁ = N₂/N₁ ⇒ tỉ lệ thuận với số vòng dây.<br>'
    + '· Định luật phóng xạ: sau n chu kì bán rã còn lại 1/2ⁿ. Sau 3T còn 12,5%, sau 4T còn 6,25%.<br>'
    + '· Động năng trung bình phân tử khí tỉ lệ THUẬN với nhiệt độ tuyệt đối, không phụ thuộc loại khí.<br>'
    + '· Lực từ F = BIl·sinα đạt cực đại khi dây vuông góc đường sức (α = 90°) và bằng 0 khi song song.',
  khi: 'Câu hỏi dạng "tăng/giảm bao nhiêu lần", "thay đổi thế nào" — thường ở mức thông hiểu, làm trong 20 giây.',
  vd: 'Giữ nguyên công suất truyền tải, tăng hiệu điện thế từ 20 kV lên 100 kV (gấp 5) thì hao phí giảm 5² = 25 lần.',
  bay: 'Đọc kỹ "bình phương". Rất nhiều bạn trả lời hao phí giảm 5 lần thay vì 25 lần.' },

theDS('Câu đúng/sai môn Lí hay cho một quá trình nhiệt hoặc một phản ứng hạt nhân rồi hỏi bốn ý. '
    + 'Quy hết về hệ đơn vị SI ngay từ đầu rồi mới xét — sai đơn vị là sai cả bốn ý.')

]);

/* ==========================================================
   SINH HỌC
   ========================================================== */
them('sinh', [

{ nhom: '📖 Phải thuộc', ten: 'Bảng công thức di truyền phân tử — sáu dòng giải được hầu hết câu Phần III', cap: 1,
  ct: '<b>Gene và DNA:</b><br>'
    + '· Tổng nucleotide N = A + T + G + C, mà A = T và G = C ⇒ N = 2A + 2G.<br>'
    + '· Chiều dài L = (N/2) × 3,4 Å.<br>'
    + '· Số liên kết hydrogen H = 2A + 3G.<br>'
    + '<b>Nhân đôi k lần:</b><br>'
    + '· Số phân tử DNA con = 2ᵏ · Số nucleotide môi trường cung cấp = N(2ᵏ − 1).<br>'
    + '· Số phân tử con hoàn toàn mới = 2ᵏ − 2 (vì bán bảo toàn luôn giữ lại 2 phân tử mang mạch mẹ).<br>'
    + '<b>Phiên mã và dịch mã:</b><br>'
    + '· Số ribonucleotide của mRNA = N/2 · Số amino acid của chuỗi hoàn chỉnh = N/6 − 2 '
    + '(trừ bộ ba kết thúc và trừ methionine mở đầu bị cắt).<br>'
    + '· Số liên kết peptide = số amino acid − 1.',
  khi: 'Gần như mọi câu trả lời ngắn của môn Sinh đều dùng ít nhất một dòng trong bảng này.',
  vd: 'Gene có 3000 nucleotide, nhân đôi 3 lần: môi trường cung cấp 3000 × (2³ − 1) = 21 000 nucleotide, '
    + 'tạo 8 phân tử DNA con trong đó 6 phân tử hoàn toàn mới.',
  bay: 'Phân biệt N(2ᵏ − 1) là số nucleotide MÔI TRƯỜNG cung cấp với N·2ᵏ là tổng số nucleotide có trong tất cả '
     + 'các phân tử con. Đề hỏi cái nào phải trả lời cái đó.' },

{ nhom: '👁 Nhìn là biết', ten: 'Nhìn tỉ lệ kiểu hình là ra quy luật di truyền', cap: 2,
  ct: '<table class="kq"><tr><th>Tỉ lệ đời con</th><th>Quy luật</th></tr>'
    + '<tr><td>3 : 1</td><td>Một cặp gene, trội hoàn toàn, bố mẹ đều Aa</td></tr>'
    + '<tr><td>1 : 2 : 1</td><td>Trội KHÔNG hoàn toàn (trung gian)</td></tr>'
    + '<tr><td>1 : 1</td><td>Lai phân tích Aa × aa</td></tr>'
    + '<tr><td>9 : 3 : 3 : 1</td><td>Hai cặp gene phân li độc lập, trội hoàn toàn</td></tr>'
    + '<tr><td>9 : 6 : 1 · 9 : 7 · 12 : 3 : 1 · 13 : 3 · 15 : 1</td><td>Tương tác gene (biến dạng của 9:3:3:1, tổng vẫn bằng 16)</td></tr>'
    + '<tr><td>1 : 2 : 1 khác 9:3:3:1 ở F₂ hai cặp gene</td><td>Liên kết gene hoàn toàn</td></tr>'
    + '<tr><td>Tỉ lệ lẻ, không rút gọn được về 16 phần</td><td>Hoán vị gene</td></tr>'
    + '<tr><td>Kiểu hình phân bố khác nhau ở hai giới</td><td>Gene nằm trên NST giới tính X</td></tr>'
    + '<tr><td>Đời con luôn giống mẹ</td><td>Di truyền ngoài nhân (ti thể, lục lạp)</td></tr></table>',
  khi: 'Câu cho kết quả phép lai rồi hỏi quy luật — nhận ra tỉ lệ là xong nửa bài.',
  vd: 'F₂ cho 9 : 7 ⇒ tổng 16 phần ⇒ hai cặp gene phân li độc lập nhưng có TƯƠNG TÁC BỔ SUNG: '
    + 'chỉ khi có cả A và B mới cho kiểu hình trội.',
  bay: 'Trước khi kết luận, luôn cộng các phần lại. Tổng bằng 16 thì vẫn là phân li độc lập (có tương tác); '
     + 'tổng KHÔNG về được 16 mới là liên kết hoặc hoán vị.' },

{ nhom: '👁 Nhìn là biết', ten: 'Ba chốt chặn để soát kết quả bài di truyền', cap: 2,
  ct: '· <b>Tần số hoán vị gene</b> luôn nằm trong khoảng 0% đến 50%. Ra hơn 50% là đã lấy nhầm nhóm giao tử.<br>'
    + '· <b>Tổng tần số các allele</b> của một locus luôn bằng 1; tổng tần số các kiểu gene cũng bằng 1.<br>'
    + '· <b>Quần thể cân bằng Hardy–Weinberg</b> phải thoả p² · 2pq · q² với p + q = 1. '
    + 'Kiểm nhanh: (tần số Aa)² có bằng 4 × (tần số AA) × (tần số aa) không. Bằng thì cân bằng.<br>'
    + '· <b>Mọi xác suất</b> phải thuộc [0; 1]; cộng xác suất của các trường hợp đầy đủ phải ra đúng 1.<br>'
    + '· <b>Số loại giao tử</b> của cơ thể có n cặp gene dị hợp phân li độc lập là 2ⁿ — không bao giờ lớn hơn.',
  khi: 'Sau khi tính xong bất kì bài di truyền nào, soát lại bằng ba chốt này trước khi tô đáp án.',
  vd: 'Quần thể 0,36 AA : 0,48 Aa : 0,16 aa. Kiểm tra: 0,48² = 0,2304 và 4 × 0,36 × 0,16 = 0,2304 ⇒ cân bằng.',
  bay: 'Quần thể tự thụ phấn KHÔNG cân bằng Hardy–Weinberg dù tần số allele không đổi, vì tỉ lệ kiểu gene thay đổi qua các thế hệ.' },

theDS('Câu đúng/sai môn Sinh hay cho một phép lai hoặc một phả hệ rồi hỏi bốn ý. '
    + 'Vẽ sơ đồ lai một lần ra nháp, tính đủ tỉ lệ giao tử, rồi soi cả bốn ý vào cùng sơ đồ đó.')

]);

/* ==========================================================
   LỊCH SỬ
   ========================================================== */
them('su', [

{ nhom: '📖 Phải thuộc', ten: 'Trục thời gian tối giản — vẽ ra nháp là làm được nửa đề', cap: 1,
  ct: '<b>1911</b> Nguyễn Tất Thành ra đi tìm đường cứu nước · <b>1925</b> Hội Việt Nam Cách mạng Thanh niên · '
    + '<b>1930</b> Đảng ra đời · <b>1941</b> Mặt trận Việt Minh · <b>1945</b> Cách mạng tháng Tám và Tuyên ngôn Độc lập · '
    + '<b>1946</b> Toàn quốc kháng chiến · <b>1954</b> Điện Biên Phủ và Genève · <b>1959</b> Đường Trường Sơn · '
    + '<b>1960</b> Đồng khởi và Mặt trận Dân tộc Giải phóng · <b>1968</b> Mậu Thân · <b>1972</b> Điện Biên Phủ trên không · '
    + '<b>1973</b> Hiệp định Pari · <b>1975</b> Chiến dịch Hồ Chí Minh · <b>1976</b> Đổi tên nước · '
    + '<b>1986</b> Đại hội VI và Đổi mới · <b>1995</b> Gia nhập ASEAN, bình thường hoá với Hoa Kỳ · <b>2007</b> Gia nhập WTO.<br>'
    + '<b>Thế giới:</b> 1945 Liên hợp quốc · 1947 Học thuyết Truman mở màn Chiến tranh lạnh · 1967 ASEAN · '
    + '1989 Manta chấm dứt Chiến tranh lạnh · 1991 Liên Xô tan rã · 2015 Cộng đồng ASEAN.',
  khi: 'Câu sắp xếp trình tự, câu hỏi "sự kiện nào diễn ra trước", câu tính khoảng cách thời gian.',
  vd: 'Hỏi sự kiện nào sớm nhất trong: Đồng khởi, Điện Biên Phủ, Mậu Thân, Hiệp định Pari. '
    + 'Nhìn trục: 1954 &lt; 1960 &lt; 1968 &lt; 1973 ⇒ Điện Biên Phủ.',
  meo: 'Ngay khi phát đề, dành 60 giây vẽ trục này ra giấy nháp. Cả buổi thi sẽ tra lại được nhiều lần, '
     + 'và tâm lí cũng vững hơn hẳn.' },

{ nhom: '👁 Nhìn là biết', ten: 'Bốn cặp khái niệm Sử hay bị tráo trong phương án nhiễu', cap: 2,
  ct: '· <b>Nguyên nhân</b> (cái có trước, gây ra) khác <b>Ý nghĩa</b> (cái đến sau, do sự kiện tạo ra) — '
    + 'đề hỏi ý nghĩa mà phương án lại nêu nguyên nhân là bẫy phổ biến nhất.<br>'
    + '· <b>Nguyên nhân sâu xa</b> (mâu thuẫn tích tụ lâu dài) khác <b>Nguyên nhân trực tiếp / duyên cớ</b> (giọt nước tràn ly).<br>'
    + '· <b>Điều kiện khách quan</b> (hoàn cảnh bên ngoài) khác <b>Nhân tố chủ quan</b> (sự chuẩn bị của ta) — '
    + 'câu hỏi "nhân tố quyết định" gần như luôn chọn nhân tố CHỦ QUAN.<br>'
    + '· <b>Tính chất</b> (bản chất cuộc cách mạng) khác <b>Nhiệm vụ</b> (việc phải làm) khác <b>Mục tiêu</b> (đích hướng tới).<br>'
    + 'Thêm một cặp nữa: <b>bước ngoặt</b> (đổi chiều hẳn) khác <b>mốc đánh dấu</b> (ghi nhận một giai đoạn kết thúc).',
  khi: 'Câu mức vận dụng và vận dụng cao — chiếm phần lớn số câu bị mất điểm oan của môn Sử.',
  vd: 'Hỏi "nhân tố quyết định thắng lợi của Cách mạng tháng Tám": chọn sự lãnh đạo của Đảng và sự chuẩn bị suốt 15 năm '
    + '(chủ quan), không chọn việc Nhật đầu hàng Đồng minh (khách quan, chỉ là THỜI CƠ).',
  bay: 'Phương án nêu điều kiện khách quan thường ĐÚNG về mặt lịch sử nên rất dễ chọn nhầm. '
     + 'Đọc kỹ chữ "quyết định" hay "thời cơ" trong câu hỏi để biết đề đang hỏi vế nào.' },

{ nhom: '👁 Nhìn là biết', ten: 'Dạng câu tư liệu: chỉ được dùng chữ trong đoạn trích', cap: 3,
  ct: 'Từ 2025 đề Sử có nhiều câu cho một đoạn tư liệu rồi hỏi rút ra được gì. Ba luật khi làm dạng này:<br>'
    + '① <b>Chỉ căn cứ vào chữ trong tư liệu.</b> Phương án đúng về lịch sử nhưng KHÔNG có trong đoạn trích thì vẫn sai. '
    + 'Đây là bẫy chiếm phần lớn số câu tư liệu.<br>'
    + '② <b>Đọc xuất xứ trước khi đọc nội dung.</b> Tên văn bản và năm tháng ở dưới đoạn trích cho biết ngay '
    + 'tư liệu thuộc giai đoạn nào, loại được vài phương án lệch thời kì.<br>'
    + '③ <b>Bám vào từ nối và cấu trúc lập luận</b> trong tư liệu: "vì thế", "nhưng", "cho nên" chỉ ra đâu là nguyên nhân, '
    + 'đâu là kết luận mà người viết muốn nhấn.',
  khi: 'Mọi câu bắt đầu bằng "Đọc đoạn tư liệu sau".',
  vd: 'Tư liệu Lời kêu gọi toàn quốc kháng chiến có trình tự: muốn hoà bình → đã nhân nhượng → Pháp lấn tới → phải đứng lên. '
    + 'Trình tự đó chính là câu trả lời: kháng chiến là lựa chọn bắt buộc, không phải chủ trương từ đầu.',
  bay: 'Đừng vội chọn phương án nghe "hùng hồn" nhất. Đề thường cài một phương án đúng tinh thần chung của lịch sử '
     + 'nhưng vượt quá điều đoạn trích nói.' },

theDS('Câu đúng/sai môn Sử thường có ý về xuất xứ tư liệu và ý về nội dung. '
    + 'Ý sai về XUẤT XỨ dễ phát hiện nhất — đọc dòng ghi nguồn dưới đoạn trích là loại được ngay.')

]);

/* ==========================================================
   ĐỊA LÍ
   ========================================================== */
them('dia', [

{ nhom: '📖 Phải thuộc', ten: 'Sáu công thức tính của môn Địa và đơn vị đi kèm', cap: 1,
  ct: '<table class="kq"><tr><th>Đại lượng</th><th>Công thức</th><th>Đơn vị</th></tr>'
    + '<tr><td>Mật độ dân số</td><td>Số dân ÷ Diện tích</td><td>người/km²</td></tr>'
    + '<tr><td>Gia tăng dân số tự nhiên</td><td>(Tỉ suất sinh − Tỉ suất tử) ÷ 10</td><td>%</td></tr>'
    + '<tr><td>Năng suất</td><td>Sản lượng ÷ Diện tích</td><td>tạ/ha hoặc tấn/ha</td></tr>'
    + '<tr><td>Bình quân đầu người</td><td>Sản lượng ÷ Số dân</td><td>kg/người</td></tr>'
    + '<tr><td>Tỉ trọng</td><td>Giá trị thành phần ÷ Tổng × 100</td><td>%</td></tr>'
    + '<tr><td>Tốc độ tăng trưởng</td><td>Giá trị năm sau ÷ Giá trị năm gốc × 100</td><td>% (năm gốc = 100%)</td></tr></table>'
    + 'Lưu ý đơn vị: tỉ suất sinh và tử cho theo ‰ nên chia 10 mới ra %; 1 tấn = 10 tạ = 1000 kg; 1 ha = 10 000 m².',
  khi: 'Toàn bộ câu tính toán của đề Địa — thường chiếm 4 đến 6 câu.',
  vd: 'Tỉ suất sinh 21,3‰, tử 8,9‰ ⇒ gia tăng tự nhiên = (21,3 − 8,9)/10 = 1,24%.',
  bay: 'Phân biệt TỐC ĐỘ TĂNG TRƯỞNG (năm gốc = 100%, kết quả 145% nghĩa là tăng 45%) với TỐC ĐỘ TĂNG '
     + '(năm gốc = 0%, kết quả 45%). Đề hỏi kiểu nào phải trả lời đúng kiểu đó.' },

{ nhom: '👁 Nhìn là biết', ten: 'Chọn dạng biểu đồ chỉ bằng từ khoá, không cần nhìn số', cap: 2,
  ct: '<table class="kq"><tr><th>Từ khoá trong đề</th><th>Biểu đồ</th></tr>'
    + '<tr><td>cơ cấu / tỉ trọng, từ 1 đến 3 mốc năm</td><td><b>TRÒN</b></td></tr>'
    + '<tr><td>chuyển dịch cơ cấu, từ 4 mốc năm trở lên</td><td><b>MIỀN</b></td></tr>'
    + '<tr><td>tốc độ tăng trưởng / tốc độ phát triển</td><td><b>ĐƯỜNG</b></td></tr>'
    + '<tr><td>tình hình / so sánh / quy mô giữa các đối tượng</td><td><b>CỘT</b></td></tr>'
    + '<tr><td>hai đơn vị đo khác nhau trên cùng bảng</td><td><b>KẾT HỢP cột và đường</b></td></tr></table>'
    + 'Ba dấu hiệu phụ: có chữ "và" nối hai đại lượng khác đơn vị ⇒ kết hợp · '
    + 'bảng đã cho sẵn số liệu dạng % và tổng bằng 100 ⇒ tròn hoặc miền · '
    + 'đề nói "giai đoạn 2010 – 2022" với nhiều mốc ⇒ miền hoặc đường.',
  khi: 'Câu chọn biểu đồ — mỗi đề Địa gần như luôn có một câu, và làm được trong 10 giây.',
  vd: 'Đề: "thể hiện sự chuyển dịch cơ cấu GDP giai đoạn 2010 – 2022" với 5 mốc năm ⇒ biểu đồ MIỀN.',
  bay: 'Ranh giới giữa tròn và miền là SỐ MỐC NĂM chứ không phải nội dung. Cùng một chữ "cơ cấu" nhưng '
     + '2 năm thì tròn, 5 năm thì miền.' },

theDS('Câu đúng/sai môn Địa hay cho bảng số liệu rồi hỏi bốn nhận xét. '
    + 'Tính hết các con số cần thiết ra nháp trước, đặc biệt là tỉ trọng và tốc độ tăng trưởng, rồi mới đọc từng ý.')

]);

/* ==========================================================
   GDKT & PHÁP LUẬT
   ========================================================== */
them('gdkt', [

{ nhom: '👁 Nhìn là biết', ten: 'Tách chủ thể trước khi đọc câu hỏi — luật làm câu tình huống', cap: 2,
  ct: 'Câu tình huống của GDKT&PL luôn có 3 đến 5 nhân vật, trong đó chỉ một vài người thực sự liên quan tới câu hỏi. '
    + 'Quy trình bốn bước:<br>'
    + '① <b>Gạch tên từng người</b> và ghi cạnh đó hành vi của họ, mỗi người một dòng ở nháp.<br>'
    + '② <b>Đọc câu hỏi</b>, xác định đang hỏi về quyền nào hoặc nghĩa vụ nào.<br>'
    + '③ <b>Đối chiếu từng dòng</b> với đúng quyền đó, đánh dấu ai vi phạm.<br>'
    + '④ Chú ý các cụm giới hạn phạm vi: "<b>vừa… vừa…</b>", "<b>đồng thời</b>", "<b>chỉ</b>", "<b>những ai</b>" — '
    + 'chúng quyết định đáp án gồm mấy người.<br>'
    + 'Đề luôn cài ít nhất một người CÓ vi phạm nhưng vi phạm quyền KHÁC với quyền câu hỏi nhắc tới.',
  khi: 'Mọi câu bắt đầu bằng một tình huống có nhiều nhân vật.',
  vd: 'Anh K giữ người trái phép, bà M đập vỡ tủ kính, anh P đứng nhìn. Hỏi ai xâm phạm quyền bất khả xâm phạm về THÂN THỂ '
    + '⇒ chỉ anh K. Bà M xâm phạm TÀI SẢN, anh P không hành động nên không phải chủ thể của quyền này.',
  bay: 'Người "biết mà không ngăn" thường không phải chủ thể vi phạm, trừ khi họ có nghĩa vụ pháp lí phải hành động '
     + '(ví dụ người có chức vụ, quyền hạn).' },

{ nhom: '📖 Phải thuộc', ten: 'Bảng phân biệt các cặp khái niệm kinh tế – pháp luật hay bị tráo', cap: 2,
  ct: '<table class="kq"><tr><th>Cặp</th><th>Phân biệt</th></tr>'
    + '<tr><td>Tăng trưởng / Phát triển</td><td>Tăng trưởng chỉ là quy mô sản lượng tăng; phát triển còn cần tiến bộ xã hội và bảo vệ môi trường</td></tr>'
    + '<tr><td>Thuế trực thu / gián thu</td><td>Trực thu đánh vào thu nhập, người nộp cũng là người chịu (TNCN, TNDN); gián thu nằm trong giá bán, người tiêu dùng chịu (VAT, tiêu thụ đặc biệt)</td></tr>'
    + '<tr><td>Khiếu nại / Tố cáo</td><td>Khiếu nại là đòi lại quyền lợi CỦA MÌNH bị xâm phạm; tố cáo là báo về hành vi vi phạm, có thể không liên quan tới mình</td></tr>'
    + '<tr><td>BHXH / BHYT</td><td>BHXH lo hưu trí, ốm đau, thai sản, thất nghiệp; BHYT lo chi phí khám chữa bệnh. Hai loại khác nhau, không thay thế nhau</td></tr>'
    + '<tr><td>Vi phạm hành chính / hình sự</td><td>Mức độ nguy hiểm cho xã hội thấp thì hành chính; đủ yếu tố cấu thành tội phạm mới là hình sự</td></tr>'
    + '<tr><td>Bình đẳng / Cào bằng</td><td>Bình đẳng là cùng quyền và nghĩa vụ theo pháp luật, không phải ai cũng nhận phần giống hệt nhau</td></tr></table>',
  khi: 'Câu lý thuyết và câu tình huống của cả phần kinh tế lẫn phần pháp luật.',
  vd: 'Doanh nghiệp kê khai doanh thu thấp để bớt thuế ⇒ trốn thuế thu nhập doanh nghiệp, mà đó là thuế TRỰC THU.',
  bay: 'Thuế giá trị gia tăng do doanh nghiệp NỘP nhưng người tiêu dùng CHỊU. Câu hỏi "ai là người chịu thuế" '
     + 'và "ai là người nộp thuế" cho hai đáp án khác nhau.' },

theDS('Câu đúng/sai môn GDKT hay cho một tình huống kinh doanh hoặc một bảng thu chi rồi hỏi bốn ý. '
    + 'Tính ra các tỉ lệ (tỉ lệ trả nợ, tỉ lệ tiết kiệm, thuế suất thực tế) trước rồi mới xét từng ý.')

]);

/* ==========================================================
   NGỮ VĂN
   ========================================================== */
them('van', [

{ nhom: '📖 Phải thuộc', ten: 'Bảng nhận diện thể loại và phong cách ngôn ngữ trong 10 giây', cap: 1,
  ct: '<b>Thể thơ</b> — đếm số chữ mỗi dòng:<br>'
    + '· 6 chữ rồi 8 chữ xen kẽ ⇒ <b>lục bát</b> · 7 chữ, 8 dòng ⇒ <b>thất ngôn bát cú Đường luật</b> · '
    + '7 chữ, 4 dòng ⇒ <b>thất ngôn tứ tuyệt</b> · 5 chữ đều ⇒ <b>ngũ ngôn</b> · số chữ không đều ⇒ <b>tự do</b>.<br>'
    + '<b>Phương thức biểu đạt</b>: kể việc ⇒ tự sự · tả cảnh tả người ⇒ miêu tả · bộc lộ cảm xúc ⇒ biểu cảm · '
    + 'bàn luận có lí lẽ dẫn chứng ⇒ nghị luận · cung cấp tri thức khách quan ⇒ thuyết minh · kêu gọi, đề nghị ⇒ hành chính.<br>'
    + '<b>Phong cách ngôn ngữ</b>: có hình ảnh, nhịp điệu ⇒ nghệ thuật · có số liệu, thuật ngữ ⇒ khoa học · '
    + 'có sự kiện thời sự ⇒ báo chí · có lí lẽ tranh luận ⇒ chính luận · lời ăn tiếng nói hằng ngày ⇒ sinh hoạt.',
  khi: 'Câu 1 và câu 2 phần Đọc hiểu — mỗi câu 0,5 điểm, cho không nếu thuộc bảng này.',
  vd: 'Văn bản có "theo số liệu thống kê", "các nhà khoa học đã chỉ ra" ⇒ phong cách khoa học, '
    + 'phương thức chính là thuyết minh hoặc nghị luận.',
  bay: 'Phương thức biểu đạt CHÍNH chỉ có một. Thấy vừa tả vừa kể thì xét xem cả văn bản hướng tới việc gì: '
     + 'nếu để kể một câu chuyện thì chính là tự sự, tả chỉ là phụ trợ.' },

{ nhom: '👁 Nhìn là biết', ten: 'Công thức trả lời câu hỏi tác dụng — đúng ba ý là trọn điểm', cap: 2,
  ct: 'Mọi câu hỏi "nêu tác dụng của biện pháp X" đều chấm theo ba ý, thiếu ý nào mất điểm ý đó:<br>'
    + '① <b>Gọi tên và chỉ ra</b>: biện pháp gì, nằm ở từ ngữ hình ảnh nào (trích nguyên văn ra).<br>'
    + '② <b>Tác dụng về nội dung</b>: làm nổi bật điều gì, gợi ra hình ảnh hay cảm xúc nào.<br>'
    + '③ <b>Tác dụng về hình thức và thái độ</b>: làm câu văn sinh động, giàu nhịp điệu; thể hiện tình cảm gì của tác giả.<br>'
    + 'Viết thành 3 đến 5 dòng, không viết một dòng cụt và cũng không viết cả trang.',
  khi: 'Câu 3 hoặc câu 4 phần Đọc hiểu, thường 1,0 điểm.',
  vd: '"Chỉ ra và nêu tác dụng của phép so sánh trong câu: Vườn ai mướt quá xanh như ngọc." ⇒ '
    + '① So sánh: khu vườn được ví với ngọc. ② Gợi màu xanh mượt mà, trong trẻo, lấp lánh của vườn thôn Vĩ buổi sớm. '
    + '③ Làm câu thơ giàu hình ảnh, đồng thời bộc lộ sự trầm trồ và tình yêu tha thiết của tác giả với xứ Huế.',
  bay: 'Chỉ gọi tên biện pháp mà không trích dẫn từ ngữ cụ thể thì mất ý ①. Chỉ nói "làm câu văn sinh động" '
     + 'mà không nói nội dung được nhấn mạnh thì mất ý ② — đây là chỗ mất điểm nhiều nhất.' },

{ nhom: '👁 Nhìn là biết', ten: 'Dàn ý khung cho nghị luận xã hội 600 chữ — lắp vào đề nào cũng chạy', cap: 2,
  ct: '<b>Mở bài (khoảng 60 chữ)</b>: dẫn dắt từ một hiện tượng đời sống rồi nêu thẳng vấn đề nghị luận.<br>'
    + '<b>Giải thích (khoảng 80 chữ)</b>: vấn đề đó nghĩa là gì, biểu hiện ra sao.<br>'
    + '<b>Bàn luận (khoảng 300 chữ)</b> — ba lớp:<br>'
    + '  · Vì sao nó quan trọng, đem lại gì cho cá nhân và cho xã hội (kèm 1–2 dẫn chứng cụ thể).<br>'
    + '  · Thực trạng hiện nay ra sao, nguyên nhân từ đâu.<br>'
    + '  · <b>Phản đề</b> — phân biệt với cái dễ nhầm, hoặc nêu mặt trái, hoặc phê phán quan niệm sai lệch. '
    + 'Bài thiếu phản đề gần như không được điểm sáng tạo.<br>'
    + '<b>Bài học và liên hệ (khoảng 100 chữ)</b>: một việc CỤ THỂ bản thân sẽ làm, không nói chung chung.<br>'
    + '<b>Kết bài (khoảng 60 chữ)</b>: khẳng định lại, khép bằng một câu có sức nặng.',
  khi: 'Câu 2 phần Viết, 4,0 điểm — chiếm 40% tổng điểm bài thi Ngữ văn.',
  vd: 'Đề "suy nghĩ về giá trị của sự kiên trì": phản đề chính là "kiên trì khác cố chấp — '
    + 'có lúc từ bỏ đúng lúc mới là khôn ngoan, khi mục tiêu đã sai hoặc cái giá quá lớn".',
  bay: 'Dung lượng 600 chữ là khoảng 2 trang giấy thi. Viết 300 chữ bị trừ điểm hình thức, '
     + 'viết 1200 chữ vừa mất thời gian của câu khác vừa loãng ý.',
  meo: 'Dành đúng 5 phút gạch dàn ý ra nháp trước khi viết. Bài có dàn ý luôn được điểm cao hơn bài viết tuỳ hứng, '
     + 'kể cả khi cùng lượng chữ.' }

]);

/* ==========================================================
   TIẾNG ANH
   ========================================================== */
them('anh', [

{ nhom: '👁 Nhìn là biết', ten: 'Bảng dấu hiệu thì — nhìn trạng từ là chọn được thì', cap: 1,
  ct: '<table class="kq"><tr><th>Dấu hiệu</th><th>Thì</th></tr>'
    + '<tr><td>always, usually, often, every day, sometimes</td><td>hiện tại đơn</td></tr>'
    + '<tr><td>now, at the moment, right now, Look!, Listen!</td><td>hiện tại tiếp diễn</td></tr>'
    + '<tr><td>already, just, yet, ever, never, so far, recently, since, for</td><td>hiện tại hoàn thành</td></tr>'
    + '<tr><td>yesterday, ago, last…, in + năm quá khứ</td><td>quá khứ đơn</td></tr>'
    + '<tr><td>while, when + quá khứ đơn, at 8 pm yesterday</td><td>quá khứ tiếp diễn</td></tr>'
    + '<tr><td>by the time + quá khứ, before/after + quá khứ đơn</td><td>quá khứ hoàn thành</td></tr>'
    + '<tr><td>tomorrow, next…, in + năm tương lai, soon</td><td>tương lai đơn</td></tr>'
    + '<tr><td>by + mốc tương lai, by the end of…</td><td>tương lai hoàn thành</td></tr></table>'
    + 'Hai dấu hiệu mạnh nhất: <b>since / for</b> luôn kéo về hiện tại hoàn thành; <b>ago</b> luôn kéo về quá khứ đơn.',
  khi: 'Câu chia động từ — đề nào cũng có vài câu, ăn điểm trong 10 giây.',
  vd: '"She ____ in Hanoi since 2010" ⇒ thấy since ⇒ hiện tại hoàn thành ⇒ has lived.',
  bay: 'Bẫy kinh điển: "It is the first time I ____" cũng dùng hiện tại hoàn thành (have + V3) '
     + 'dù không có since hay for. Tương tự sau "This is the best… I have ever…".' },

{ nhom: '👁 Nhìn là biết', ten: 'Bốn bước làm bài đọc hiểu khi không kịp đọc hết', cap: 3,
  ct: '① <b>Đọc CÂU HỎI trước, đọc bài sau.</b> Biết cần tìm gì rồi mới quét bài, tiết kiệm được nửa thời gian.<br>'
    + '② <b>Câu hỏi thường bám theo thứ tự đoạn văn</b>: câu 1 tìm ở đoạn đầu, câu cuối tìm ở đoạn cuối. '
    + 'Riêng câu hỏi ý chính và câu hỏi thái độ tác giả thì phải nhìn cả bài.<br>'
    + '③ <b>Câu từ vựng</b> (closest in meaning / opposite in meaning): đọc trọn CÂU chứa từ đó và câu liền trước, '
    + 'đoán theo ngữ cảnh chứ không theo nghĩa quen thuộc nhất của từ.<br>'
    + '④ <b>Câu NOT mentioned</b>: gạch chân từng phương án trong bài, gạch được ba cái thì cái còn lại là đáp án. '
    + 'Đây là câu tốn thời gian nhất, nên để làm cuối cùng.',
  khi: 'Phần đọc hiểu của đề Tiếng Anh — chiếm số câu lớn nhất và cũng là chỗ dễ hết giờ nhất.',
  vd: 'Câu hỏi "What is the main idea?" mà phương án chỉ nói về một chi tiết trong một đoạn ⇒ loại, '
    + 'vì ý chính phải bao trùm cả bài.',
  bay: 'Phương án nào chứa từ tuyệt đối (all, never, only, always, completely) trong bài đọc hiểu thường sai, '
     + 'vì văn bản học thuật hiếm khi khẳng định tuyệt đối.' },

theDS('Đề Tiếng Anh 2025 không có Phần II đúng/sai, nhưng dạng tư duy này vẫn xuất hiện ở câu '
    + '"Which of the following is TRUE according to the passage?" — cách xử lí giống hệt: xét từng phương án độc lập.')

]);

})();
