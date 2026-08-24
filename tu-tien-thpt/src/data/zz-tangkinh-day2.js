/* ============================================================
   TÀNG KINH CÁC — ĐỢT DÀY THÊM SỐ 2
   Đo lại lượng chữ theo TỪNG chuyên đề (chứ không theo từng thẻ) thì lộ ra
   bảy chuyên đề mỏng hẳn so với phần còn lại: có chuyên đề chỉ MỘT thẻ,
   trong khi trung vị là 2 858 chữ. Mở thẻ ra thấy trống là vì thế.
   File này bù đúng bảy chỗ đó, mỗi thẻ mang nội dung mới.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

(function () {
const them = (khoa, ds) => { TD.KHO[khoa] = (TD.KHO[khoa] || []).concat(ds); };

/* ---------------------------------------------------------- TOÁN */
them('toan_ct', [

{ nhom: 'VIII. Bất phương trình', cd: 'Bất phương trình bậc hai', ten: 'Dấu tam thức bậc hai — bảng xét dấu đầy đủ', cap: 2,
  ct: 'Cho f(x) = ax<sup>2</sup> + bx + c (a ≠ 0), Δ = b<sup>2</sup> − 4ac.<br>'
    + '<b>Δ &lt; 0:</b> f(x) cùng dấu với a với mọi x. Không có nghiệm, đồ thị không cắt trục hoành.<br>'
    + '<b>Δ = 0:</b> f(x) cùng dấu với a với mọi x ≠ −b/(2a), tại đó f = 0. Đồ thị tiếp xúc trục hoành.<br>'
    + '<b>Δ &gt; 0:</b> gọi x<sub>1</sub> &lt; x<sub>2</sub> là hai nghiệm. Trong khoảng (x<sub>1</sub>; x<sub>2</sub>) '
    + 'thì f trái dấu với a; ngoài đoạn đó f cùng dấu với a. Câu thần chú: <b>"trong trái, ngoài cùng"</b>.<br>'
    + '<b>Điều kiện luôn dương – luôn âm:</b><br>'
    + '&nbsp;&nbsp;f(x) &gt; 0 ∀x ⇔ a &gt; 0 và Δ &lt; 0<br>'
    + '&nbsp;&nbsp;f(x) ≥ 0 ∀x ⇔ a &gt; 0 và Δ ≤ 0<br>'
    + '&nbsp;&nbsp;f(x) &lt; 0 ∀x ⇔ a &lt; 0 và Δ &lt; 0<br>'
    + '&nbsp;&nbsp;f(x) ≤ 0 ∀x ⇔ a &lt; 0 và Δ ≤ 0<br>'
    + '<b>Bất phương trình tích – thương:</b> đưa hết về một vế, phân tích thành nhân tử, lập bảng xét dấu chung. '
    + 'Nghiệm của MẪU luôn bị loại và trên bảng phải đánh dấu hai gạch.',
  khi: 'Mọi bài xét dấu, giải bất phương trình, tìm tập xác định có căn hoặc có mẫu.',
  vd: 'x<sup>2</sup> − 5x + 6 ≤ 0. Hai nghiệm 2 và 3, a = 1 &gt; 0 nên "trong trái": nghiệm là đoạn [2; 3].',
  bay: 'Bất phương trình có MẪU thì tuyệt đối không nhân chéo, vì chưa biết dấu của mẫu. Chuyển vế rồi quy đồng, '
     + 'xét dấu cả tử lẫn mẫu. Đây là lỗi mất điểm nhiều nhất của chuyên đề này.' },

{ nhom: 'VIII. Bất phương trình', cd: 'Bất phương trình bậc hai', ten: 'Bài toán tham số m — điều kiện nghiệm và định lí Viète', cap: 3,
  ct: '<b>Định lí Viète:</b> nếu ax<sup>2</sup> + bx + c = 0 có hai nghiệm x<sub>1</sub>, x<sub>2</sub> thì<br>'
    + '&nbsp;&nbsp;S = x<sub>1</sub> + x<sub>2</sub> = −b/a &nbsp;và&nbsp; P = x<sub>1</sub>x<sub>2</sub> = c/a<br>'
    + '<b>Các biểu thức đối xứng quy về S và P:</b><br>'
    + '&nbsp;&nbsp;x<sub>1</sub><sup>2</sup> + x<sub>2</sub><sup>2</sup> = S<sup>2</sup> − 2P<br>'
    + '&nbsp;&nbsp;x<sub>1</sub><sup>3</sup> + x<sub>2</sub><sup>3</sup> = S<sup>3</sup> − 3PS<br>'
    + '&nbsp;&nbsp;(x<sub>1</sub> − x<sub>2</sub>)<sup>2</sup> = S<sup>2</sup> − 4P<br>'
    + '&nbsp;&nbsp;1/x<sub>1</sub> + 1/x<sub>2</sub> = S/P<br>'
    + '<b>Dấu của hai nghiệm</b> (luôn kèm điều kiện Δ ≥ 0):<br>'
    + '&nbsp;&nbsp;hai nghiệm trái dấu ⇔ P &lt; 0 (chỉ cần thế, không cần Δ)<br>'
    + '&nbsp;&nbsp;hai nghiệm cùng dương ⇔ Δ ≥ 0, S &gt; 0, P &gt; 0<br>'
    + '&nbsp;&nbsp;hai nghiệm cùng âm ⇔ Δ ≥ 0, S &lt; 0, P &gt; 0<br>'
    + '<b>So sánh nghiệm với số α:</b> đặt t = x − α rồi quay về xét dấu S, P của phương trình theo t.',
  khi: 'Câu vận dụng có chữ m: tìm m để phương trình có hai nghiệm thoả một hệ thức.',
  vd: 'x<sup>2</sup> − 2mx + m − 1 = 0 có hai nghiệm trái dấu ⇔ P = m − 1 &lt; 0 ⇔ m &lt; 1.',
  bay: 'Quên điều kiện Δ ≥ 0 là bẫy số một. Riêng trường hợp TRÁI DẤU thì P &lt; 0 đã kéo theo Δ &gt; 0, '
     + 'nên viết thêm Δ không sai nhưng thừa; các trường hợp còn lại thiếu Δ là mất điểm.' },

{ nhom: 'V. Vecto & hệ thức lượng', cd: 'Vecto và hệ thức lượng', ten: 'Tích vô hướng trong mặt phẳng — bốn kiểu bài hay ra', cap: 2,
  ct: '<b>Định nghĩa:</b> a·b = |a||b|cos(a, b) — kết quả là một SỐ.<br>'
    + '<b>Theo toạ độ</b> a = (x<sub>1</sub>; y<sub>1</sub>), b = (x<sub>2</sub>; y<sub>2</sub>):<br>'
    + '&nbsp;&nbsp;a·b = x<sub>1</sub>x<sub>2</sub> + y<sub>1</sub>y<sub>2</sub><br>'
    + '&nbsp;&nbsp;|a| = √(x<sub>1</sub><sup>2</sup> + y<sub>1</sub><sup>2</sup>)<br>'
    + '&nbsp;&nbsp;cos(a, b) = (x<sub>1</sub>x<sub>2</sub> + y<sub>1</sub>y<sub>2</sub>) / (|a||b|)<br>'
    + '<b>Bốn kiểu bài:</b><br>'
    + '&nbsp;&nbsp;① Vuông góc: a ⊥ b ⇔ a·b = 0.<br>'
    + '&nbsp;&nbsp;② Tính góc: lấy cos rồi bấm shift cos.<br>'
    + '&nbsp;&nbsp;③ Độ dài: |AB| = √((x<sub>B</sub>−x<sub>A</sub>)<sup>2</sup> + (y<sub>B</sub>−y<sub>A</sub>)<sup>2</sup>).<br>'
    + '&nbsp;&nbsp;④ Hình chiếu: độ dài hình chiếu của a lên b bằng (a·b)/|b|.<br>'
    + '<b>Tính chất dùng để biến đổi:</b> a·a = |a|<sup>2</sup>; (a ± b)<sup>2</sup> = a<sup>2</sup> ± 2a·b + b<sup>2</sup>.',
  khi: 'Bài toạ độ phẳng lớp 10 và mọi bài phải chứng minh vuông góc, tính góc, tính độ dài.',
  vd: 'a = (1; 2), b = (−2; 1): a·b = 1(−2) + 2(1) = 0 nên a ⊥ b.',
  bay: 'Tích vô hướng ra SỐ chứ không ra vectơ, nên viết "a·b = 0" (số không) chứ không viết vectơ-không. '
     + 'Và a·b = 0 không có nghĩa là a = 0 hoặc b = 0.' },

{ nhom: 'V. Vecto & hệ thức lượng', cd: 'Vecto và hệ thức lượng', ten: 'Giải tam giác — chọn định lí nào cho nhanh', cap: 2,
  ct: '<b>Định lí cosin</b> (dùng khi biết hai cạnh và góc xen giữa, hoặc biết cả ba cạnh):<br>'
    + '&nbsp;&nbsp;a<sup>2</sup> = b<sup>2</sup> + c<sup>2</sup> − 2bc·cos A ⇒ cos A = (b<sup>2</sup> + c<sup>2</sup> − a<sup>2</sup>)/(2bc)<br>'
    + '<b>Định lí sin</b> (dùng khi biết một cạnh và hai góc, hoặc hai cạnh và góc đối một cạnh):<br>'
    + '&nbsp;&nbsp;a/sin A = b/sin B = c/sin C = 2R<br>'
    + '<b>Bốn công thức diện tích:</b><br>'
    + '&nbsp;&nbsp;S = ½ab·sin C&nbsp;&nbsp;·&nbsp;&nbsp;S = abc/(4R)<br>'
    + '&nbsp;&nbsp;S = p·r (r là bán kính đường tròn nội tiếp)<br>'
    + '&nbsp;&nbsp;S = √(p(p−a)(p−b)(p−c)) với p = (a+b+c)/2 — công thức Heron<br>'
    + '<b>Độ dài trung tuyến:</b> m<sub>a</sub><sup>2</sup> = (2b<sup>2</sup> + 2c<sup>2</sup> − a<sup>2</sup>)/4<br>'
    + '<b>Chọn nhanh:</b> đề cho ba cạnh → cosin. Đề cho góc và cạnh đối diện nhau → sin. '
    + 'Đề hỏi bán kính R → định lí sin hoặc S = abc/4R. Đề hỏi r → S = p·r.',
  khi: 'Bài giải tam giác, tính diện tích, tính bán kính đường tròn nội – ngoại tiếp.',
  vd: 'Tam giác có a = 7, b = 5, c = 3: cos A = (25 + 9 − 49)/(2·5·3) = −½ ⇒ A = 120°.',
  bay: 'Dùng định lí sin để tìm GÓC thì có thể ra hai đáp số (góc nhọn và góc tù bù nhau) vì sin của hai góc bù '
     + 'bằng nhau. Muốn chắc chắn một đáp số thì dùng cosin, vì cos phân biệt được nhọn với tù bằng dấu.' },

{ nhom: 'IX. Lượng giác', cd: 'Lượng giác', ten: 'Cung liên kết — bảng nhớ bằng một câu', cap: 1,
  ct: '<b>Câu thần chú:</b> "cos đối, sin bù, phụ chéo, khác pi tan".<br>'
    + '<b>Hai cung đối nhau</b> (−α và α): cos(−α) = cos α; sin(−α) = −sin α; tan(−α) = −tan α.<br>'
    + '<b>Hai cung bù nhau</b> (π − α và α): sin(π − α) = sin α; cos(π − α) = −cos α; tan(π − α) = −tan α.<br>'
    + '<b>Hai cung phụ nhau</b> (π/2 − α và α): sin(π/2 − α) = cos α; cos(π/2 − α) = sin α; tan(π/2 − α) = cot α.<br>'
    + '<b>Hai cung hơn kém π</b>: sin(π + α) = −sin α; cos(π + α) = −cos α; tan(π + α) = tan α.<br>'
    + '<b>Bảng giá trị phải thuộc:</b><br>'
    + '&nbsp;&nbsp;sin: 0 · ½ · √2/2 · √3/2 · 1 ứng với 0° · 30° · 45° · 60° · 90°<br>'
    + '&nbsp;&nbsp;cos đọc NGƯỢC bảng sin: 1 · √3/2 · √2/2 · ½ · 0<br>'
    + '&nbsp;&nbsp;tan: 0 · √3/3 · 1 · √3 · không xác định<br>'
    + '<b>Dấu theo góc phần tư</b> — "nhất cả, nhị sin, tam tan, tứ cos": phần tư thứ nhất mọi giá trị dương, '
    + 'thứ hai chỉ sin dương, thứ ba chỉ tan dương, thứ tư chỉ cos dương.',
  khi: 'Rút gọn biểu thức lượng giác, tính giá trị khi biết một giá trị và góc phần tư.',
  vd: 'sin 150° = sin(180° − 30°) = sin 30° = ½.',
  bay: 'Đổi độ sang radian phải nhân π/180, không phải 180/π. Và khi bấm máy nhớ chỉnh chế độ D hay R cho khớp '
     + 'với đơn vị của đề — sai chế độ là sai toàn bộ bài.' },

{ nhom: 'IX. Lượng giác', cd: 'Lượng giác', ten: 'Phương trình lượng giác cơ bản — viết nghiệm không sót họ', cap: 2,
  ct: '<b>sin x = m</b> (điều kiện |m| ≤ 1). Đặt sin α = m thì<br>'
    + '&nbsp;&nbsp;x = α + k2π &nbsp;hoặc&nbsp; x = π − α + k2π &nbsp;(k ∈ ℤ)<br>'
    + '<b>cos x = m</b> (điều kiện |m| ≤ 1). Đặt cos α = m thì<br>'
    + '&nbsp;&nbsp;x = ±α + k2π<br>'
    + '<b>tan x = m</b> (không có điều kiện): x = α + kπ, với điều kiện x ≠ π/2 + kπ.<br>'
    + '<b>cot x = m</b>: x = α + kπ, với điều kiện x ≠ kπ.<br>'
    + '<b>Bốn trường hợp đặc biệt phải thuộc:</b><br>'
    + '&nbsp;&nbsp;sin x = 0 ⇔ x = kπ&nbsp;&nbsp;·&nbsp;&nbsp;sin x = 1 ⇔ x = π/2 + k2π<br>'
    + '&nbsp;&nbsp;cos x = 0 ⇔ x = π/2 + kπ&nbsp;&nbsp;·&nbsp;&nbsp;cos x = 1 ⇔ x = k2π<br>'
    + '<b>Đếm số nghiệm trên một đoạn:</b> viết họ nghiệm, cho k chạy các số nguyên rồi lọc những giá trị '
    + 'rơi vào đoạn đề cho. Cách nhanh: giải bất phương trình theo k.',
  khi: 'Câu nhận biết – thông hiểu về phương trình lượng giác, và câu đếm nghiệm trên đoạn.',
  vd: 'cos x = ½ ⇒ x = ±π/3 + k2π. Trên [0; 2π] có hai nghiệm: π/3 và 5π/3.',
  bay: 'Với sin phải viết ĐỦ hai họ nghiệm, chỉ viết x = α + k2π là mất một nửa số nghiệm. '
     + 'Với cos thì dấu ± đã gộp sẵn hai họ, đừng tách ra rồi lại thêm họ π − α.' }

]);

/* ---------------------------------------------------------- TIẾNG ANH */
them('anh_ct', [

{ nhom: 'Ngữ pháp', cd: 'Thì động từ', ten: 'Bảng 12 thì — công thức và dấu hiệu nhận biết', cap: 1,
  ct: '<b>HIỆN TẠI</b><br>'
    + '&nbsp;&nbsp;Đơn: V / V-s. Dấu hiệu: always, usually, often, every day, sometimes.<br>'
    + '&nbsp;&nbsp;Tiếp diễn: am/is/are + V-ing. Dấu hiệu: now, at the moment, right now, Look!, Listen!<br>'
    + '&nbsp;&nbsp;Hoàn thành: have/has + V3. Dấu hiệu: already, just, yet, since, for, recently, ever, never.<br>'
    + '&nbsp;&nbsp;Hoàn thành tiếp diễn: have/has been + V-ing. Dấu hiệu: since, for kèm ý nhấn quá trình kéo dài.<br>'
    + '<b>QUÁ KHỨ</b><br>'
    + '&nbsp;&nbsp;Đơn: V2/V-ed. Dấu hiệu: yesterday, ago, last, in + năm quá khứ.<br>'
    + '&nbsp;&nbsp;Tiếp diễn: was/were + V-ing. Dấu hiệu: while, at + giờ + quá khứ, when kèm hành động cắt ngang.<br>'
    + '&nbsp;&nbsp;Hoàn thành: had + V3. Dấu hiệu: before, after, by the time, when kèm hai mốc quá khứ.<br>'
    + '&nbsp;&nbsp;Hoàn thành tiếp diễn: had been + V-ing.<br>'
    + '<b>TƯƠNG LAI</b><br>'
    + '&nbsp;&nbsp;Đơn: will + V. Dấu hiệu: tomorrow, next, in + tương lai, I think, probably.<br>'
    + '&nbsp;&nbsp;Gần: be going to + V — dự định đã có, hoặc có căn cứ nhìn thấy được.<br>'
    + '&nbsp;&nbsp;Tiếp diễn: will be + V-ing. Dấu hiệu: at this time tomorrow.<br>'
    + '&nbsp;&nbsp;Hoàn thành: will have + V3. Dấu hiệu: by + mốc tương lai, by the time.',
  khi: 'Câu chia động từ và câu điền từ vào đoạn — chiếm phần lớn số câu ngữ pháp của đề.',
  vd: 'By the time he arrived, the train <b>had left</b>. Hai mốc quá khứ, cái xảy ra trước dùng quá khứ hoàn thành.',
  bay: 'Since đi với hiện tại hoàn thành, nhưng mệnh đề sau since lại dùng quá khứ đơn: '
     + '"I have lived here since I <b>was</b> a child." Đây là chỗ đề hay gài.' },

{ nhom: 'Ngữ pháp', cd: 'Thì động từ', ten: 'Phối hợp thì và hoà hợp chủ ngữ — hai luật hay bị bỏ quên', cap: 2,
  ct: '<b>① Phối hợp thì trong câu có hai mệnh đề</b><br>'
    + '&nbsp;&nbsp;Mệnh đề thời gian (when, before, after, as soon as, until, by the time) KHÔNG dùng will; '
    + 'thay bằng hiện tại đơn hoặc hiện tại hoàn thành: "I will call you when I <b>arrive</b>."<br>'
    + '&nbsp;&nbsp;Mệnh đề điều kiện loại 1 cũng vậy: "If it <b>rains</b>, we will stay home."<br>'
    + '&nbsp;&nbsp;Động từ tường thuật ở quá khứ thì mệnh đề sau lùi một thì.<br>'
    + '<b>② Hoà hợp chủ ngữ – động từ</b><br>'
    + '&nbsp;&nbsp;Danh từ số nhiều luôn đi động từ số nhiều, nhưng chú ý các trường hợp lệch:<br>'
    + '&nbsp;&nbsp;Each, every, either, neither + danh từ số ít → động từ SỐ ÍT.<br>'
    + '&nbsp;&nbsp;Either A or B / Neither A nor B → động từ chia theo B (danh từ GẦN nhất).<br>'
    + '&nbsp;&nbsp;A number of + số nhiều → số nhiều; The number of + số nhiều → SỐ ÍT.<br>'
    + '&nbsp;&nbsp;Danh từ tập hợp (team, family, government) chia số ít khi coi là một khối.<br>'
    + '&nbsp;&nbsp;Cụm chen giữa (together with, as well as, along with, including) KHÔNG đổi số của chủ ngữ.',
  khi: 'Câu tìm lỗi sai và câu chia động từ có chủ ngữ dài.',
  vd: 'The manager, along with his assistants, <b>is</b> attending the meeting. Chủ ngữ vẫn là "the manager".',
  bay: 'Thấy danh từ số nhiều ngay trước động từ là chia số nhiều — sai. Phải lần ngược tìm chủ ngữ THẬT, '
     + 'bỏ qua mọi cụm giới từ và mệnh đề chen giữa.' }

]);

/* ---------------------------------------------------------- SINH HỌC */
them('sinh_ct', [

{ nhom: 'Di truyền quần thể', cd: 'Di truyền quần thể', ten: 'Ngẫu phối và tự phối — bảng đối chiếu và công thức qua n thế hệ', cap: 3,
  ct: '<b>Quần thể TỰ PHỐI (tự thụ phấn, giao phối gần)</b><br>'
    + '&nbsp;&nbsp;Tần số allele KHÔNG đổi qua các thế hệ.<br>'
    + '&nbsp;&nbsp;Tỉ lệ dị hợp giảm một nửa mỗi thế hệ: Aa sau n thế hệ = Aa<sub>0</sub> × (1/2)<sup>n</sup><br>'
    + '&nbsp;&nbsp;Đồng hợp tăng lên: AA<sub>n</sub> = AA<sub>0</sub> + Aa<sub>0</sub>(1 − (1/2)<sup>n</sup>)/2, '
    + 'aa tính tương tự.<br>'
    + '&nbsp;&nbsp;Hệ quả: quần thể phân hoá thành các dòng thuần, độ đa dạng di truyền giảm.<br>'
    + '<b>Quần thể NGẪU PHỐI</b><br>'
    + '&nbsp;&nbsp;Cả tần số allele lẫn thành phần kiểu gene đều không đổi nếu đủ điều kiện cân bằng.<br>'
    + '&nbsp;&nbsp;Cấu trúc cân bằng: p<sup>2</sup>AA + 2pq·Aa + q<sup>2</sup>aa = 1, với p + q = 1.<br>'
    + '&nbsp;&nbsp;Kiểm tra cân bằng chỉ bằng một phép nhân: quần thể cân bằng ⇔ AA × aa = (Aa/2)<sup>2</sup>.<br>'
    + '&nbsp;&nbsp;Duy trì đa dạng di truyền, tạo nguồn nguyên liệu cho chọn lọc.<br>'
    + '<b>Năm điều kiện của định luật Hardy – Weinberg:</b> kích thước quần thể lớn · ngẫu phối · '
    + 'không đột biến · không di – nhập gene · không chọn lọc tự nhiên.',
  khi: 'Câu vận dụng của chuyên đề, nhất là dạng cho cấu trúc rồi hỏi sau n thế hệ.',
  vd: 'Quần thể 0,2AA : 0,8Aa tự thụ phấn 3 thế hệ: Aa = 0,8 × (1/2)<sup>3</sup> = 0,1; '
    + 'AA = 0,2 + (0,8 − 0,1)/2 = 0,55; aa = 0,35.',
  bay: 'Tự phối làm đổi TỈ LỆ KIỂU GENE nhưng KHÔNG đổi tần số allele — đây là câu đúng/sai kinh điển. '
     + 'Nhiều bạn nhớ nhầm thành "tự phối làm giảm tần số allele lặn".' }

]);

/* ---------------------------------------------------------- GDKT & PHÁP LUẬT */
them('gdkt_ct', [

{ nhom: 'Pháp luật', cd: 'Quyền & nghĩa vụ', ten: 'Quyền và nghĩa vụ trong hôn nhân, gia đình và bầu cử', cap: 2,
  ct: '<b>Điều kiện kết hôn</b> (Luật Hôn nhân và Gia đình 2014):<br>'
    + '&nbsp;&nbsp;Nam từ đủ <b>20 tuổi</b>, nữ từ đủ <b>18 tuổi</b> trở lên.<br>'
    + '&nbsp;&nbsp;Do hai bên tự nguyện quyết định, không bị mất năng lực hành vi dân sự.<br>'
    + '&nbsp;&nbsp;Không thuộc các trường hợp cấm: đang có vợ hoặc chồng; cùng dòng máu về trực hệ; '
    + 'giữa những người có họ trong phạm vi ba đời; giữa cha mẹ nuôi với con nuôi.<br>'
    + '<b>Quan hệ vợ chồng:</b> bình đẳng về quyền và nghĩa vụ; tài sản tạo ra trong thời kỳ hôn nhân là '
    + 'tài sản chung, được định đoạt theo thoả thuận.<br>'
    + '<b>Bốn nguyên tắc bầu cử:</b> phổ thông · bình đẳng · trực tiếp · bỏ phiếu kín.<br>'
    + '&nbsp;&nbsp;Quyền bầu cử: công dân đủ <b>18 tuổi</b> trở lên.<br>'
    + '&nbsp;&nbsp;Quyền ứng cử: công dân đủ <b>21 tuổi</b> trở lên.<br>'
    + '<b>Quyền khiếu nại</b> dành cho người bị chính quyết định hành chính xâm phạm quyền lợi của mình; '
    + '<b>quyền tố cáo</b> thì mọi công dân đều có, khi phát hiện hành vi vi phạm pháp luật.',
  khi: 'Câu tình huống về hôn nhân, bầu cử, khiếu nại – tố cáo.',
  vd: 'Anh A 19 tuổi muốn kết hôn: chưa đủ điều kiện vì nam phải từ đủ 20 tuổi.',
  bay: 'Bầu cử 18 tuổi nhưng ứng cử 21 tuổi — hai con số này hay bị tráo cho nhau. '
     + 'Và khiếu nại là cho quyền lợi của CHÍNH MÌNH, tố cáo là về hành vi vi phạm của người khác.' }

]);

/* ---------------------------------------------------------- ĐỊA LÍ */
them('dia_ct', [

{ nhom: 'Tự nhiên', cd: 'Khí hậu', ten: 'Hai mùa gió — nguồn gốc, hướng và hệ quả từng miền', cap: 2,
  ct: '<b>GIÓ MÙA MÙA ĐÔNG</b> (tháng 11 đến tháng 4)<br>'
    + '&nbsp;&nbsp;Nguồn gốc: áp cao Xibia, hướng đông bắc.<br>'
    + '&nbsp;&nbsp;Nửa đầu mùa đông lạnh KHÔ vì đi qua lục địa; nửa sau lạnh ẨM có mưa phùn '
    + 'vì lệch ra biển rồi mới vào đất liền.<br>'
    + '&nbsp;&nbsp;Bị chặn ở dãy Bạch Mã nên hầu như chỉ tác động từ vĩ tuyến 16°B trở ra.<br>'
    + '&nbsp;&nbsp;Miền Nam lúc này chịu Tín phong bán cầu Bắc, gây mùa khô sâu sắc ở Nam Bộ và Tây Nguyên.<br>'
    + '<b>GIÓ MÙA MÙA HẠ</b> (tháng 5 đến tháng 10)<br>'
    + '&nbsp;&nbsp;Đầu mùa: khối khí nhiệt đới ẩm từ Bắc Ấn Độ Dương, hướng tây nam. Vượt Trường Sơn gây '
    + 'hiệu ứng phơn — <b>gió Lào</b> khô nóng ở Bắc Trung Bộ và tây nam Bắc Bộ.<br>'
    + '&nbsp;&nbsp;Giữa và cuối mùa: gió mùa Tây Nam từ áp cao cận chí tuyến bán cầu Nam, nóng ẩm, '
    + 'gây mưa lớn cho cả nước. Vào Bắc Bộ thì đổi hướng thành ĐÔNG NAM do áp thấp Bắc Bộ hút vào.<br>'
    + '<b>Hệ quả chung:</b> khí hậu phân mùa rõ rệt, miền Bắc có mùa đông lạnh còn miền Nam nóng quanh năm.',
  khi: 'Câu về gió mùa, mùa mưa – mùa khô, và câu giải thích sự khác nhau giữa hai miền.',
  vd: 'Huế mưa vào thu đông vì gió đông bắc thổi qua biển gặp dãy Trường Sơn chắn ngang gây mưa địa hình.',
  bay: 'Gió Lào là gió TÂY NAM bị biến tính khi vượt núi, không phải một loại gió riêng. '
     + 'Và gió mùa Tây Nam khi vào Bắc Bộ thổi theo hướng đông nam — đây là chi tiết đề rất hay hỏi.' }

]);
})();
