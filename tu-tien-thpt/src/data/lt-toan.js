/* ============================================================
   TOÁN — KHO MỆNH ĐỀ LÝ THUYẾT TRỌNG ĐIỂM (Tà Đạo)
   Bám CT GDPT 2018. Chủ yếu là mệnh đề về điều kiện áp dụng và
   công thức — đúng kiểu câu Đúng/Sai của đề thi thật.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO_LT = TD.KHO_LT || {};

TD.KHO_LT.toan = [
/* ========== ĐẠO HÀM – KHẢO SÁT HÀM SỐ ========== */
{ cd: 'Đạo hàm – Khảo sát', m: 1, a: true,  t: 'Nếu y′ > 0 trên khoảng K thì hàm số đồng biến trên khoảng K.', v: 'Dấu của đạo hàm quyết định chiều biến thiên của hàm số.' },
{ cd: 'Đạo hàm – Khảo sát', m: 1, a: false, t: 'Nếu y′ > 0 trên khoảng K thì hàm số nghịch biến trên khoảng K.', v: 'y′ > 0 ứng với hàm ĐỒNG biến. Nghịch biến ứng với y′ < 0.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: true,  t: 'Điểm x₀ là điểm cực trị của hàm số khi và chỉ khi đạo hàm đổi dấu khi đi qua x₀.', v: 'Chỉ y′(x₀) = 0 thì chưa đủ — ví dụ y = x³ có y′(0) = 0 nhưng x = 0 không phải cực trị.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: false, t: 'Nếu y′(x₀) = 0 thì x₀ chắc chắn là điểm cực trị của hàm số.', v: 'Chưa đủ — đạo hàm phải ĐỔI DẤU qua x₀. Hàm y = x³ là phản ví dụ.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: true,  t: 'Hàm số bậc ba y = ax³ + bx² + cx + d có hai điểm cực trị khi và chỉ khi phương trình y′ = 0 có hai nghiệm phân biệt.', v: 'Tức là Δ của tam thức y′ = 3ax² + 2bx + c phải dương.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: true,  t: 'Hàm số bậc ba luôn có ít nhất một điểm cực trị hoặc không có điểm cực trị nào.', v: 'Cụ thể là có đúng 2 cực trị khi Δ(y′) > 0 và không có cực trị nào khi Δ(y′) ≤ 0.' },
{ cd: 'Đạo hàm – Khảo sát', m: 3, a: true,  t: 'Hàm trùng phương y = ax⁴ + bx² + c có ba điểm cực trị khi và chỉ khi a·b < 0.', v: 'Khi a·b ≥ 0 thì hàm chỉ có một điểm cực trị.' },
{ cd: 'Đạo hàm – Khảo sát', m: 3, a: false, t: 'Hàm số y = ax⁴ + bx² + c luôn có ba điểm cực trị.', v: 'Chỉ khi a·b < 0. Nếu a·b ≥ 0 thì hàm chỉ có MỘT điểm cực trị.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: true,  t: 'Hàm số y = (ax + b)/(cx + d) không có điểm cực trị nào.', v: 'Đạo hàm y′ = (ad − bc)/(cx + d)² luôn giữ nguyên dấu trên từng khoảng xác định.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: false, t: 'Hàm số y = (2x + 1)/(x − 3) có một điểm cực đại và một điểm cực tiểu.', v: 'Hàm phân thức bậc nhất trên bậc nhất KHÔNG có cực trị.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: true,  t: 'Đồ thị hàm số y = (ax + b)/(cx + d) có tiệm cận đứng x = −d/c và tiệm cận ngang y = a/c.', v: 'Điều kiện c ≠ 0 và ad − bc ≠ 0.' },
{ cd: 'Đạo hàm – Khảo sát', m: 3, a: true,  t: 'Đồ thị hàm số có tiệm cận xiên khi bậc của tử lớn hơn bậc của mẫu đúng một đơn vị.', v: 'Khi đó đồ thị không có tiệm cận ngang.' },
{ cd: 'Đạo hàm – Khảo sát', m: 3, a: false, t: 'Một đồ thị hàm số có thể vừa có tiệm cận ngang vừa có tiệm cận xiên ở cùng một phía.', v: 'Không thể — ở mỗi phía chỉ có hoặc tiệm cận ngang hoặc tiệm cận xiên.' },
{ cd: 'Đạo hàm – Khảo sát', m: 3, a: true,  t: 'Có thể tìm tiệm cận xiên của hàm phân thức bằng cách chia đa thức tử cho đa thức mẫu.', v: 'Phần nguyên của phép chia chính là phương trình tiệm cận xiên.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: true,  t: 'Để tìm giá trị lớn nhất và nhỏ nhất của hàm số trên đoạn [a; b], ta so sánh giá trị hàm tại các điểm tới hạn trong khoảng và tại hai đầu mút.', v: 'Bỏ sót hai đầu mút là lỗi phổ biến nhất của dạng bài này.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: false, t: 'Giá trị lớn nhất của hàm số trên đoạn [a; b] luôn đạt tại điểm cực đại của hàm số.', v: 'Có thể đạt tại đầu mút của đoạn. Phải so sánh cả giá trị tại a và b.' },
{ cd: 'Đạo hàm – Khảo sát', m: 3, a: true,  t: 'Số giao điểm của đồ thị hàm số y = f(x) với đường thẳng y = m bằng số nghiệm của phương trình f(x) = m.', v: 'Dựa vào bảng biến thiên để biện luận số nghiệm theo m.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: true,  t: 'Phương trình tiếp tuyến của đồ thị hàm số tại điểm M(x₀; y₀) là y = f′(x₀)(x − x₀) + y₀.', v: 'Hệ số góc của tiếp tuyến chính là đạo hàm tại tiếp điểm.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: true,  t: 'Đạo hàm của tích hai hàm số được tính theo công thức (uv)′ = u′v + uv′.', v: 'Còn thương thì (u/v)′ = (u′v − uv′)/v².' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: false, t: 'Đạo hàm của tích hai hàm số bằng tích các đạo hàm: (uv)′ = u′·v′.', v: 'Sai — công thức đúng là (uv)′ = u′v + uv′.' },

/* ========== MŨ – LOGARIT ========== */
{ cd: 'Mũ – Logarit', m: 1, a: true,  t: 'Điều kiện của cơ số logarit là a > 0 và a ≠ 1.', v: 'Đồng thời biểu thức dưới dấu logarit phải dương.' },
{ cd: 'Mũ – Logarit', m: 2, a: true,  t: 'Công thức log_a(xy) = log_a x + log_a y đúng khi x > 0 và y > 0.', v: 'Bỏ qua điều kiện dương là nguồn sai lầm phổ biến khi biến đổi.' },
{ cd: 'Mũ – Logarit', m: 2, a: false, t: 'Ta luôn có log_a(x + y) = log_a x + log_a y.', v: 'Sai hoàn toàn — công thức đúng là cho TÍCH: log_a(xy) = log_a x + log_a y.' },
{ cd: 'Mũ – Logarit', m: 2, a: true,  t: 'Công thức đổi cơ số: log_a b = log_c b / log_c a với các cơ số hợp lệ.', v: 'Hệ quả: log_a b = 1/log_b a.' },
{ cd: 'Mũ – Logarit', m: 2, a: true,  t: 'Ta có log_a(xⁿ) = n·log_a x với x > 0.', v: 'Nếu x có thể âm thì phải viết log_a(xⁿ) = n·log_a|x| với n chẵn.' },
{ cd: 'Mũ – Logarit', m: 3, a: true,  t: 'Khi giải bất phương trình logarit với cơ số 0 < a < 1, phải đổi chiều bất đẳng thức.', v: 'Vì hàm logarit cơ số nhỏ hơn 1 là hàm nghịch biến.' },
{ cd: 'Mũ – Logarit', m: 3, a: false, t: 'Khi giải bất phương trình logarit, luôn giữ nguyên chiều bất đẳng thức sau khi bỏ dấu logarit.', v: 'Chỉ giữ nguyên khi cơ số a > 1. Nếu 0 < a < 1 thì phải ĐỔI CHIỀU.' },
{ cd: 'Mũ – Logarit', m: 2, a: true,  t: 'Hàm số y = aˣ với a > 1 là hàm đồng biến trên toàn bộ tập số thực.', v: 'Với 0 < a < 1 thì hàm nghịch biến.' },
{ cd: 'Mũ – Logarit', m: 2, a: true,  t: 'Đồ thị hàm số y = aˣ luôn đi qua điểm (0; 1) và nằm hoàn toàn phía trên trục hoành.', v: 'Vì aˣ > 0 với mọi x.' },
{ cd: 'Mũ – Logarit', m: 3, a: true,  t: 'Công thức lãi kép sau n kì là A = P(1 + r)ⁿ với P là số tiền gốc và r là lãi suất mỗi kì.', v: 'Khác lãi đơn A = P(1 + rn).' },
{ cd: 'Mũ – Logarit', m: 3, a: false, t: 'Công thức tính số tiền cả gốc lẫn lãi theo lãi kép sau n kì là A = P(1 + rn).', v: 'Đó là công thức lãi ĐƠN. Lãi kép dùng luỹ thừa: A = P(1 + r)ⁿ.' },
{ cd: 'Mũ – Logarit', m: 2, a: true,  t: 'Tập xác định của hàm số y = log_a x là khoảng (0; +∞).', v: 'Còn tập giá trị là toàn bộ tập số thực.' },

/* ========== NGUYÊN HÀM – TÍCH PHÂN ========== */
{ cd: 'Nguyên hàm – Tích phân', m: 1, a: true,  t: 'Nguyên hàm của hàm số f(x) = 1/x là ln|x| + C.', v: 'Phải có dấu giá trị tuyệt đối vì hàm 1/x xác định cả với x âm.' },
{ cd: 'Nguyên hàm – Tích phân', m: 2, a: false, t: 'Nguyên hàm của hàm số f(x) = 1/x là ln x + C với mọi x.', v: 'Thiếu dấu giá trị tuyệt đối — công thức đúng là ln|x| + C.' },
{ cd: 'Nguyên hàm – Tích phân', m: 2, a: true,  t: 'Công thức ∫xⁿ dx = xⁿ⁺¹/(n+1) + C chỉ đúng khi n ≠ −1.', v: 'Trường hợp n = −1 phải dùng ∫(1/x)dx = ln|x| + C.' },
{ cd: 'Nguyên hàm – Tích phân', m: 2, a: true,  t: 'Ta có ∫f(ax + b)dx = (1/a)·F(ax + b) + C với F là một nguyên hàm của f.', v: 'Quên nhân hệ số 1/a là lỗi sai kinh điển.' },
{ cd: 'Nguyên hàm – Tích phân', m: 2, a: false, t: 'Ta có ∫f(ax + b)dx = F(ax + b) + C.', v: 'Thiếu hệ số 1/a. Công thức đúng là (1/a)·F(ax + b) + C.' },
{ cd: 'Nguyên hàm – Tích phân', m: 2, a: true,  t: 'Công thức Newton–Leibniz: tích phân từ a đến b của f(x) bằng F(b) − F(a).', v: 'F là một nguyên hàm bất kì của f trên đoạn [a; b].' },
{ cd: 'Nguyên hàm – Tích phân', m: 2, a: true,  t: 'Tích phân của hàm số lẻ trên đoạn đối xứng [−a; a] luôn bằng 0.', v: 'Còn hàm chẵn thì tích phân trên [−a; a] bằng hai lần tích phân trên [0; a].' },
{ cd: 'Nguyên hàm – Tích phân', m: 3, a: false, t: 'Tích phân của hàm số chẵn trên đoạn đối xứng [−a; a] luôn bằng 0.', v: 'Đó là tính chất của hàm LẺ. Hàm chẵn cho kết quả bằng 2 lần tích phân trên [0; a].' },
{ cd: 'Nguyên hàm – Tích phân', m: 3, a: true,  t: 'Công thức tích phân từng phần là ∫u dv = uv − ∫v du.', v: 'Thứ tự ưu tiên chọn u: nhất log, nhì đa thức, tam lượng giác, tứ hàm mũ.' },
{ cd: 'Nguyên hàm – Tích phân', m: 3, a: true,  t: 'Khi đổi biến trong tích phân xác định, phải đổi cả cận tích phân theo biến mới.', v: 'Nếu không đổi cận thì kết quả sẽ sai.' },
{ cd: 'Nguyên hàm – Tích phân', m: 3, a: false, t: 'Khi dùng phương pháp đổi biến cho tích phân xác định, có thể giữ nguyên cận rồi trả biến về cuối cùng.', v: 'Được về mặt kỹ thuật nhưng phải trả biến, còn nếu giữ cận cũ mà thay biến mới thì SAI.' },
{ cd: 'Nguyên hàm – Tích phân', m: 3, a: true,  t: 'Diện tích hình phẳng giới hạn bởi hai đường y = f(x) và y = g(x) được tính bằng tích phân của |f(x) − g(x)| trên đoạn giữa hai hoành độ giao điểm.', v: 'Phải lấy trị tuyệt đối hoặc chia khoảng theo dấu của hiệu.' },
{ cd: 'Nguyên hàm – Tích phân', m: 3, a: false, t: 'Diện tích hình phẳng giới hạn bởi hai đường cong bằng tích phân của hiệu hai hàm, không cần lấy trị tuyệt đối.', v: 'Nếu không lấy trị tuyệt đối, phần nằm dưới sẽ cho diện tích âm và kết quả sai.' },
{ cd: 'Nguyên hàm – Tích phân', m: 3, a: true,  t: 'Thể tích khối tròn xoay khi quay hình phẳng quanh trục Ox được tính bằng π nhân tích phân của f²(x).', v: 'Vì bình phương nên không cần lấy trị tuyệt đối.' },

/* ========== HÌNH HỌC OXYZ ========== */
{ cd: 'Oxyz', m: 2, a: true,  t: 'Tích vô hướng của hai vectơ cho kết quả là một số thực còn tích có hướng cho kết quả là một vectơ.', v: 'Đây là điểm phân biệt cơ bản nhất giữa hai phép toán.' },
{ cd: 'Oxyz', m: 2, a: false, t: 'Tích có hướng của hai vectơ trong không gian cho kết quả là một số thực.', v: 'Tích CÓ HƯỚNG cho một VECTƠ vuông góc với cả hai vectơ ban đầu.' },
{ cd: 'Oxyz', m: 2, a: true,  t: 'Hai vectơ vuông góc với nhau khi và chỉ khi tích vô hướng của chúng bằng 0.', v: 'Còn hai vectơ cùng phương khi tích có hướng bằng vectơ không.' },
{ cd: 'Oxyz', m: 2, a: true,  t: 'Vectơ tích có hướng của hai vectơ luôn vuông góc với cả hai vectơ đó.', v: 'Nhờ tính chất này ta tìm được vectơ pháp tuyến của mặt phẳng đi qua ba điểm.' },
{ cd: 'Oxyz', m: 2, a: true,  t: 'Mặt phẳng có phương trình Ax + By + Cz + D = 0 nhận vectơ (A; B; C) làm vectơ pháp tuyến.', v: 'Hệ số của x, y, z chính là toạ độ vectơ pháp tuyến.' },
{ cd: 'Oxyz', m: 2, a: false, t: 'Mặt phẳng Ax + By + Cz + D = 0 nhận vectơ (A; B; C) làm vectơ chỉ phương.', v: 'Đó là vectơ PHÁP TUYẾN. Mặt phẳng không có "vectơ chỉ phương" duy nhất.' },
{ cd: 'Oxyz', m: 3, a: true,  t: 'Khoảng cách từ điểm M(x₀; y₀; z₀) đến mặt phẳng Ax + By + Cz + D = 0 bằng trị tuyệt đối của (Ax₀ + By₀ + Cz₀ + D) chia cho căn bậc hai của (A² + B² + C²).', v: 'Quên trị tuyệt đối ở tử sẽ cho khoảng cách âm.' },
{ cd: 'Oxyz', m: 2, a: true,  t: 'Mặt cầu có phương trình x² + y² + z² − 2ax − 2by − 2cz + d = 0 có tâm I(a; b; c) và bán kính R = √(a² + b² + c² − d).', v: 'Điều kiện tồn tại mặt cầu là a² + b² + c² − d > 0.' },
{ cd: 'Oxyz', m: 3, a: true,  t: 'Mặt phẳng tiếp xúc với mặt cầu khi và chỉ khi khoảng cách từ tâm mặt cầu đến mặt phẳng bằng bán kính.', v: 'Nếu khoảng cách nhỏ hơn bán kính thì mặt phẳng cắt mặt cầu theo một đường tròn.' },
{ cd: 'Oxyz', m: 3, a: false, t: 'Mặt phẳng cắt mặt cầu khi khoảng cách từ tâm đến mặt phẳng lớn hơn bán kính.', v: 'Ngược lại — cắt khi khoảng cách NHỎ HƠN bán kính. Lớn hơn thì không giao nhau.' },
{ cd: 'Oxyz', m: 3, a: true,  t: 'Bán kính đường tròn giao tuyến của mặt phẳng và mặt cầu bằng căn bậc hai của (R² − d²).', v: 'Với d là khoảng cách từ tâm mặt cầu đến mặt phẳng.' },
{ cd: 'Oxyz', m: 2, a: true,  t: 'Điểm M nằm bên trong mặt cầu tâm I bán kính R khi và chỉ khi IM < R.', v: 'Nằm trên mặt cầu khi IM = R và nằm ngoài khi IM > R.' },
{ cd: 'Oxyz', m: 3, a: true,  t: 'Diện tích tam giác ABC bằng một nửa độ dài tích có hướng của hai vectơ AB và AC.', v: 'Còn thể tích tứ diện ABCD bằng một phần sáu trị tuyệt đối của tích hỗn tạp.' },

/* ========== THỐNG KÊ – XÁC SUẤT ========== */
{ cd: 'Thống kê – Xác suất', m: 2, a: true,  t: 'Với mẫu số liệu ghép nhóm, giá trị đại diện của mỗi nhóm là trung điểm của nhóm đó.', v: 'Mọi phép tính trung bình, phương sai đều dùng giá trị đại diện này.' },
{ cd: 'Thống kê – Xác suất', m: 2, a: false, t: 'Với mẫu số liệu ghép nhóm, số trung bình được tính từ chính các số liệu gốc.', v: 'Số liệu gốc đã bị mất khi ghép nhóm. Phải dùng GIÁ TRỊ ĐẠI DIỆN là trung điểm nhóm.' },
{ cd: 'Thống kê – Xác suất', m: 2, a: true,  t: 'Khoảng tứ phân vị được tính bằng hiệu giữa tứ phân vị thứ ba và tứ phân vị thứ nhất.', v: 'Δ_Q = Q₃ − Q₁, đo độ phân tán và ít bị ảnh hưởng bởi giá trị bất thường.' },
{ cd: 'Thống kê – Xác suất', m: 2, a: true,  t: 'Tứ phân vị thứ hai Q₂ chính là trung vị của mẫu số liệu.', v: 'Q₁ và Q₃ chia phần dưới và phần trên của mẫu.' },
{ cd: 'Thống kê – Xác suất', m: 3, a: true,  t: 'Khoảng tứ phân vị ít chịu ảnh hưởng bởi các giá trị bất thường hơn khoảng biến thiên.', v: 'Vì nó chỉ dựa vào 50% số liệu ở giữa.' },
{ cd: 'Thống kê – Xác suất', m: 3, a: false, t: 'Khoảng biến thiên là số đo độ phân tán ít bị ảnh hưởng nhất bởi giá trị bất thường.', v: 'Ngược lại — khoảng biến thiên chỉ phụ thuộc giá trị lớn nhất và nhỏ nhất nên rất nhạy với giá trị bất thường.' },
{ cd: 'Thống kê – Xác suất', m: 2, a: true,  t: 'Độ lệch chuẩn bằng căn bậc hai của phương sai.', v: 'Độ lệch chuẩn có cùng đơn vị với số liệu nên dễ diễn giải hơn phương sai.' },
{ cd: 'Thống kê – Xác suất', m: 3, a: true,  t: 'Xác suất có điều kiện P(A|B) được tính bằng P(A ∩ B) chia cho P(B) với P(B) > 0.', v: 'Đây là nền tảng của công thức nhân xác suất và công thức Bayes.' },
{ cd: 'Thống kê – Xác suất', m: 3, a: false, t: 'Xác suất có điều kiện P(A|B) luôn bằng P(B|A).', v: 'Hai đại lượng này hoàn toàn khác nhau, chỉ bằng nhau khi P(A) = P(B).' },
{ cd: 'Thống kê – Xác suất', m: 3, a: true,  t: 'Hai biến cố A và B độc lập khi và chỉ khi P(A ∩ B) = P(A)·P(B).', v: 'Tương đương với P(A|B) = P(A), tức việc B xảy ra không ảnh hưởng đến khả năng của A.' },
{ cd: 'Thống kê – Xác suất', m: 3, a: false, t: 'Hai biến cố xung khắc thì luôn độc lập với nhau.', v: 'Ngược lại — hai biến cố xung khắc có P(A ∩ B) = 0 nên KHÔNG độc lập nếu cả hai đều có xác suất dương.' },
{ cd: 'Thống kê – Xác suất', m: 2, a: true,  t: 'Công thức cộng xác suất: P(A ∪ B) = P(A) + P(B) − P(A ∩ B).', v: 'Nếu A và B xung khắc thì P(A ∩ B) = 0 nên P(A ∪ B) = P(A) + P(B).' },
{ cd: 'Thống kê – Xác suất', m: 2, a: true,  t: 'Xác suất của biến cố đối được tính bằng P(Ā) = 1 − P(A).', v: 'Rất hữu ích với các bài toán "có ít nhất một".' },
{ cd: 'Thống kê – Xác suất', m: 2, a: true,  t: 'Số cách chọn k phần tử từ n phần tử mà không quan tâm thứ tự là tổ hợp chập k của n.', v: 'Nếu có quan tâm thứ tự thì dùng chỉnh hợp.' },
{ cd: 'Thống kê – Xác suất', m: 2, a: false, t: 'Số cách chọn k phần tử từ n phần tử mà không quan tâm thứ tự là chỉnh hợp chập k của n.', v: 'Không quan tâm thứ tự thì dùng TỔ HỢP. Chỉnh hợp dùng khi có thứ tự.' },

/* ========== HÌNH KHÔNG GIAN ========== */
{ cd: 'Hình không gian', m: 2, a: true,  t: 'Thể tích khối chóp bằng một phần ba tích của diện tích đáy và chiều cao.', v: 'Còn khối lăng trụ thì bằng diện tích đáy nhân chiều cao.' },
{ cd: 'Hình không gian', m: 2, a: false, t: 'Thể tích khối chóp bằng tích của diện tích đáy và chiều cao.', v: 'Thiếu hệ số một phần ba. Công thức đó là của khối LĂNG TRỤ.' },
{ cd: 'Hình không gian', m: 3, a: true,  t: 'Công thức tỉ số thể tích chỉ áp dụng được cho khối chóp có đáy là tam giác.', v: 'Với chóp tứ giác phải chia thành hai chóp tam giác trước.' },
{ cd: 'Hình không gian', m: 3, a: false, t: 'Công thức tỉ số thể tích áp dụng được cho mọi khối chóp bất kể hình dạng đáy.', v: 'Chỉ áp dụng cho chóp TAM GIÁC. Đây là hạn chế quan trọng phải nhớ.' },
{ cd: 'Hình không gian', m: 2, a: true,  t: 'Diện tích xung quanh hình nón bằng π nhân bán kính đáy nhân đường sinh.', v: 'Chú ý dùng đường sinh l chứ không phải chiều cao h.' },
{ cd: 'Hình không gian', m: 2, a: false, t: 'Diện tích xung quanh hình nón bằng π nhân bán kính đáy nhân chiều cao.', v: 'Phải dùng ĐƯỜNG SINH l chứ không phải chiều cao h. Chỉ thể tích mới dùng h.' },
{ cd: 'Hình không gian', m: 2, a: true,  t: 'Với hình nón, đường sinh, bán kính đáy và chiều cao liên hệ bởi l² = r² + h².', v: 'Đó là định lí Pythagore trong tam giác vuông tạo bởi trục, bán kính và đường sinh.' },
{ cd: 'Hình không gian', m: 2, a: true,  t: 'Thể tích khối cầu bằng bốn phần ba nhân π nhân lập phương bán kính.', v: 'Còn diện tích mặt cầu bằng 4πR².' },
{ cd: 'Hình không gian', m: 2, a: false, t: 'Diện tích mặt cầu bán kính R bằng πR².', v: 'Đó là diện tích HÌNH TRÒN. Diện tích mặt cầu là 4πR².' },
{ cd: 'Hình không gian', m: 3, a: true,  t: 'Góc giữa đường thẳng và mặt phẳng là góc giữa đường thẳng đó và hình chiếu vuông góc của nó trên mặt phẳng.', v: 'Góc này luôn nằm trong khoảng từ 0° đến 90°.' },
{ cd: 'Hình không gian', m: 3, a: true,  t: 'Có thể tính khoảng cách từ một điểm đến mặt phẳng bằng công thức d = 3V/S, với V là thể tích khối chóp và S là diện tích mặt đáy tương ứng.', v: 'Kỹ thuật "đổi đỉnh" này giải được đa số bài khoảng cách khó mà không cần dựng hình.' },
{ cd: 'Hình không gian', m: 2, a: true,  t: 'Hai mặt phẳng vuông góc với nhau khi mặt phẳng này chứa một đường thẳng vuông góc với mặt phẳng kia.', v: 'Đây là dấu hiệu nhận biết hai mặt phẳng vuông góc.' },

/* ========== DÃY SỐ – CẤP SỐ ========== */
{ cd: 'Dãy số – Cấp số', m: 2, a: true,  t: 'Trong cấp số cộng, ba số hạng liên tiếp a, b, c thoả mãn 2b = a + c.', v: 'Còn cấp số nhân thì b² = a·c.' },
{ cd: 'Dãy số – Cấp số', m: 2, a: false, t: 'Trong cấp số nhân, ba số hạng liên tiếp a, b, c thoả mãn 2b = a + c.', v: 'Đó là tính chất của cấp số CỘNG. Cấp số nhân có b² = a·c.' },
{ cd: 'Dãy số – Cấp số', m: 2, a: true,  t: 'Số hạng tổng quát của cấp số cộng là uₙ = u₁ + (n − 1)d.', v: 'Còn cấp số nhân là uₙ = u₁·q^(n−1).' },
{ cd: 'Dãy số – Cấp số', m: 3, a: true,  t: 'Công thức tổng n số hạng đầu của cấp số nhân Sₙ = u₁(1 − qⁿ)/(1 − q) chỉ dùng được khi q ≠ 1.', v: 'Nếu q = 1 thì Sₙ = n·u₁.' },
{ cd: 'Dãy số – Cấp số', m: 3, a: true,  t: 'Cấp số nhân lùi vô hạn có tổng S = u₁/(1 − q) khi |q| < 1.', v: 'Nếu |q| ≥ 1 thì tổng vô hạn không tồn tại hữu hạn.' },
{ cd: 'Dãy số – Cấp số', m: 3, a: false, t: 'Mọi cấp số nhân đều có tổng vô hạn hữu hạn.', v: 'Chỉ khi |q| < 1. Nếu |q| ≥ 1 thì tổng phân kì.' }
];

TD.KHO_LT.toan.push(
/* --- Dãy số – Cấp số (bổ sung) --- */
{ cd: 'Dãy số – Cấp số', m: 2, a: true,  t: 'Tổng n số hạng đầu của cấp số cộng bằng n nhân trung bình cộng của số hạng đầu và số hạng thứ n.', v: 'Sₙ = n(u₁ + uₙ)/2.' },
{ cd: 'Dãy số – Cấp số', m: 2, a: false, t: 'Trong cấp số cộng, công sai d luôn là số dương.', v: 'd có thể âm (dãy giảm) hoặc bằng 0 (dãy hằng).' },
{ cd: 'Dãy số – Cấp số', m: 2, a: false, t: 'Trong cấp số nhân, công bội q có thể bằng 0.', v: 'q phải khác 0, nếu không thì từ số hạng thứ hai trở đi đều bằng 0 và dãy không còn là cấp số nhân.' },
{ cd: 'Dãy số – Cấp số', m: 2, a: true,  t: 'Một dãy số là cấp số cộng khi hiệu của hai số hạng liên tiếp bất kì là một hằng số.', v: 'Hằng số đó chính là công sai d.' },
{ cd: 'Dãy số – Cấp số', m: 3, a: false, t: 'Nếu dãy số có tỉ số hai số hạng liên tiếp không đổi thì đó là cấp số cộng.', v: 'Tỉ số không đổi là cấp số NHÂN. Cấp số cộng có HIỆU không đổi.' },
{ cd: 'Dãy số – Cấp số', m: 2, a: true,  t: 'Bài toán tăng trưởng dân số và lãi kép đều dẫn tới mô hình cấp số nhân.', v: 'Vì mỗi kì lượng mới bằng lượng cũ nhân với một hệ số không đổi.' },

/* --- Mũ – Logarit (bổ sung) --- */
{ cd: 'Mũ – Logarit', m: 2, a: false, t: 'Ta luôn có log_a(x/y) = log_a x / log_a y.', v: 'Sai — công thức đúng là log_a(x/y) = log_a x − log_a y.' },
{ cd: 'Mũ – Logarit', m: 2, a: false, t: 'Hàm số y = log_a x với 0 < a < 1 là hàm đồng biến.', v: 'Với cơ số nhỏ hơn 1 thì hàm logarit NGHỊCH biến.' },
{ cd: 'Mũ – Logarit', m: 2, a: true,  t: 'Ta có a^(log_a b) = b với a > 0, a ≠ 1 và b > 0.', v: 'Hàm mũ và hàm logarit cùng cơ số là hai hàm ngược nhau.' },
{ cd: 'Mũ – Logarit', m: 3, a: true,  t: 'Khi giải phương trình logarit, phải đặt điều kiện xác định trước rồi mới đối chiếu nghiệm.', v: 'Bỏ qua bước này dễ nhận nghiệm ngoại lai.' },
{ cd: 'Mũ – Logarit', m: 2, a: true,  t: 'Đồ thị hàm số y = log_a x luôn đi qua điểm (1; 0).', v: 'Vì log_a 1 = 0 với mọi cơ số hợp lệ.' },
{ cd: 'Mũ – Logarit', m: 2, a: false, t: 'Đồ thị hàm số y = log_a x cắt trục tung tại điểm (0; 1).', v: 'Hàm logarit không xác định tại x = 0 nên đồ thị KHÔNG cắt trục tung.' },

/* --- Oxyz (bổ sung) --- */
{ cd: 'Oxyz', m: 2, a: false, t: 'Hai mặt phẳng song song khi hai vectơ pháp tuyến của chúng vuông góc với nhau.', v: 'Song song khi hai vectơ pháp tuyến CÙNG PHƯƠNG. Vuông góc thì hai mặt phẳng vuông góc.' },
{ cd: 'Oxyz', m: 2, a: true,  t: 'Đường thẳng đi qua điểm M và có vectơ chỉ phương u có phương trình tham số x = x₀ + at, y = y₀ + bt, z = z₀ + ct.', v: 'Trong đó (a; b; c) là toạ độ vectơ chỉ phương.' },
{ cd: 'Oxyz', m: 3, a: true,  t: 'Đường thẳng vuông góc với mặt phẳng khi vectơ chỉ phương của nó cùng phương với vectơ pháp tuyến của mặt phẳng.', v: 'Còn đường thẳng song song mặt phẳng thì hai vectơ đó vuông góc.' },
{ cd: 'Oxyz', m: 2, a: false, t: 'Toạ độ trung điểm của đoạn thẳng AB bằng hiệu toạ độ của A và B chia đôi.', v: 'Là TỔNG toạ độ chia đôi, không phải hiệu.' },
{ cd: 'Oxyz', m: 2, a: true,  t: 'Toạ độ trọng tâm tam giác ABC bằng trung bình cộng toạ độ ba đỉnh.', v: 'G((x_A+x_B+x_C)/3; (y_A+y_B+y_C)/3; (z_A+z_B+z_C)/3).' },
{ cd: 'Oxyz', m: 3, a: true,  t: 'Góc giữa hai mặt phẳng được tính qua trị tuyệt đối của cosin góc giữa hai vectơ pháp tuyến.', v: 'Lấy trị tuyệt đối để góc luôn nằm trong khoảng từ 0° đến 90°.' },
{ cd: 'Oxyz', m: 3, a: false, t: 'Góc giữa hai mặt phẳng có thể lớn hơn 90°.', v: 'Theo quy ước, góc giữa hai mặt phẳng luôn thuộc đoạn từ 0° đến 90°.' },

/* --- Nguyên hàm – Tích phân (bổ sung) --- */
{ cd: 'Nguyên hàm – Tích phân', m: 2, a: true,  t: 'Mọi hàm số liên tục trên một khoảng đều có nguyên hàm trên khoảng đó.', v: 'Tuy nhiên không phải nguyên hàm nào cũng biểu diễn được bằng hàm sơ cấp.' },
{ cd: 'Nguyên hàm – Tích phân', m: 2, a: true,  t: 'Hai nguyên hàm của cùng một hàm số chỉ sai khác nhau một hằng số.', v: 'Đó là lý do luôn phải thêm hằng số C.' },
{ cd: 'Nguyên hàm – Tích phân', m: 2, a: false, t: 'Tích phân của tích hai hàm bằng tích hai tích phân.', v: 'Sai — không có công thức như vậy. Phải dùng đổi biến hoặc tích phân từng phần.' },
{ cd: 'Nguyên hàm – Tích phân', m: 2, a: true,  t: 'Đổi cận tích phân thì đổi dấu: tích phân từ a đến b bằng trừ tích phân từ b đến a.', v: 'Đây là tính chất cơ bản của tích phân xác định.' },
{ cd: 'Nguyên hàm – Tích phân', m: 2, a: true,  t: 'Nguyên hàm của sin x là −cos x + C.', v: 'Còn nguyên hàm của cos x là sin x + C — chú ý dấu trừ chỉ xuất hiện ở sin.' },
{ cd: 'Nguyên hàm – Tích phân', m: 2, a: false, t: 'Nguyên hàm của sin x là cos x + C.', v: 'Thiếu dấu trừ. Đúng là −cos x + C.' },
{ cd: 'Nguyên hàm – Tích phân', m: 3, a: true,  t: 'Tích phân của một hàm số không âm trên đoạn [a; b] với a < b luôn không âm.', v: 'Vì tích phân khi đó biểu diễn diện tích hình phẳng dưới đồ thị.' },

/* --- Đạo hàm – Khảo sát (bổ sung) --- */
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: true,  t: 'Nếu hàm số có đạo hàm tại một điểm thì hàm số liên tục tại điểm đó.', v: 'Chiều ngược lại không đúng — hàm y = |x| liên tục tại 0 nhưng không có đạo hàm tại đó.' },
{ cd: 'Đạo hàm – Khảo sát', m: 3, a: false, t: 'Nếu hàm số liên tục tại một điểm thì hàm số có đạo hàm tại điểm đó.', v: 'Sai — hàm y = |x| liên tục tại x = 0 nhưng không có đạo hàm tại đó.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: true,  t: 'Nếu y′(x₀) = 0 và y″(x₀) > 0 thì x₀ là điểm cực tiểu của hàm số.', v: 'Ngược lại, y″(x₀) < 0 thì x₀ là điểm cực đại.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: false, t: 'Nếu y′(x₀) = 0 và y″(x₀) > 0 thì x₀ là điểm cực đại của hàm số.', v: 'y″ dương ứng với điểm CỰC TIỂU (đồ thị lõm lên).' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: true,  t: 'Đồ thị hàm số bậc ba luôn có đúng một điểm uốn và nhận điểm uốn làm tâm đối xứng.', v: 'Điểm uốn là nghiệm của phương trình y″ = 0.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: true,  t: 'Đồ thị hàm trùng phương y = ax⁴ + bx² + c nhận trục tung làm trục đối xứng.', v: 'Vì hàm chỉ chứa các luỹ thừa bậc chẵn nên là hàm chẵn.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: false, t: 'Đồ thị hàm số y = ax⁴ + bx² + c nhận gốc toạ độ làm tâm đối xứng.', v: 'Hàm này là hàm CHẴN nên nhận TRỤC TUNG làm trục đối xứng, không phải tâm đối xứng.' },
{ cd: 'Đạo hàm – Khảo sát', m: 3, a: true,  t: 'Hàm số bậc ba y = ax³ + bx² + cx + d với a > 0 và không có cực trị thì đồng biến trên toàn bộ tập số thực.', v: 'Khi đó y′ ≥ 0 với mọi x.' },
{ cd: 'Đạo hàm – Khảo sát', m: 2, a: true,  t: 'Tiệm cận đứng của đồ thị hàm phân thức là các giá trị làm mẫu bằng 0 nhưng tử khác 0.', v: 'Nếu cả tử và mẫu cùng bằng 0 thì phải rút gọn trước khi kết luận.' },

/* --- Hình không gian (bổ sung) --- */
{ cd: 'Hình không gian', m: 2, a: true,  t: 'Thể tích khối trụ bằng diện tích đáy nhân chiều cao, tức πr²h.', v: 'Diện tích xung quanh là 2πrh.' },
{ cd: 'Hình không gian', m: 2, a: true,  t: 'Thể tích khối nón bằng một phần ba thể tích khối trụ có cùng đáy và cùng chiều cao.', v: 'V_nón = (1/3)πr²h.' },
{ cd: 'Hình không gian', m: 2, a: false, t: 'Thể tích khối nón bằng một nửa thể tích khối trụ có cùng đáy và chiều cao.', v: 'Là một phần BA, không phải một nửa.' },
{ cd: 'Hình không gian', m: 3, a: true,  t: 'Đường thẳng vuông góc với hai đường thẳng cắt nhau nằm trong một mặt phẳng thì vuông góc với mặt phẳng đó.', v: 'Đây là định lí điều kiện để đường thẳng vuông góc với mặt phẳng.' },
{ cd: 'Hình không gian', m: 3, a: false, t: 'Đường thẳng vuông góc với một đường thẳng nằm trong mặt phẳng thì vuông góc với mặt phẳng đó.', v: 'Cần vuông góc với HAI đường thẳng CẮT NHAU trong mặt phẳng.' },
{ cd: 'Hình không gian', m: 3, a: true,  t: 'Khoảng cách giữa hai đường thẳng chéo nhau bằng độ dài đoạn vuông góc chung của chúng.', v: 'Có thể tính bằng cách dựng mặt phẳng chứa đường này và song song đường kia.' },

/* --- Thống kê – Xác suất (bổ sung) --- */
{ cd: 'Thống kê – Xác suất', m: 3, a: true,  t: 'Công thức xác suất toàn phần cho phép tính P(B) qua các trường hợp phân chia của không gian mẫu.', v: 'P(B) = P(A)·P(B|A) + P(Ā)·P(B|Ā).' },
{ cd: 'Thống kê – Xác suất', m: 3, a: true,  t: 'Sơ đồ hình cây là công cụ trực quan để giải các bài toán xác suất có điều kiện nhiều giai đoạn.', v: 'Nhân dọc theo nhánh, cộng các nhánh cùng dẫn tới kết quả cần tìm.' },
{ cd: 'Thống kê – Xác suất', m: 2, a: false, t: 'Xác suất của một biến cố có thể lớn hơn 1 nếu biến cố rất có khả năng xảy ra.', v: 'Xác suất luôn nằm trong đoạn từ 0 đến 1.' },
{ cd: 'Thống kê – Xác suất', m: 2, a: true,  t: 'Với bài toán "có ít nhất một", thường tính qua biến cố đối sẽ nhanh hơn tính trực tiếp.', v: 'P(ít nhất một) = 1 − P(không có cái nào).' },
{ cd: 'Thống kê – Xác suất', m: 2, a: false, t: 'Phương sai của mẫu số liệu có thể nhận giá trị âm.', v: 'Phương sai là trung bình của các bình phương độ lệch nên luôn không âm.' }
);
