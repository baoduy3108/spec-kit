/* ============================================================
   BỔ SUNG MỆNH ĐỀ MỨC 1 — NHẬN BIẾT
   Bộ GD&ĐT công bố tỉ lệ cấp độ tư duy của đề thi tốt nghiệp từ
   2025 là BIẾT : HIỂU : VẬN DỤNG = 4 : 3 : 3, tức 40% đề là câu
   nhận biết thuần tuý. Kho mệnh đề trước đây gần như không có mức
   này (Địa 2%, Sinh 3%, Sử 3%, Anh 4%) nên đề Độ Kiếp dựng ra
   luôn khó hơn đề thật, và người học không có chỗ luyện phần dễ
   ăn điểm nhất. File này bù đúng phần đó.
   Mức 1 = nhớ lại một định nghĩa, một đơn vị, một mốc, một công
   thức — không cần suy luận.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO_LT = TD.KHO_LT || {};

(function () {
const bu = (mon, ds) => { TD.KHO_LT[mon] = (TD.KHO_LT[mon] || []).concat(ds); };
const M1 = (cd, a, t, v) => ({ cd: cd, m: 1, a: a, t: t, v: v });

/* ---------------- TOÁN ---------------- */
bu('toan', [
M1('Đạo hàm – Khảo sát', true,  'Đạo hàm của hàm số y = xⁿ là y′ = n·xⁿ⁻¹.', 'Công thức đạo hàm cơ bản nhất, dùng cho mọi hàm đa thức.'),
M1('Đạo hàm – Khảo sát', false, 'Đạo hàm của một hằng số là chính hằng số đó.', 'Đạo hàm của hằng số luôn bằng 0 vì giá trị hàm không đổi.'),
M1('Đạo hàm – Khảo sát', true,  'Hàm số đồng biến trên một khoảng khi đạo hàm của nó không âm trên khoảng đó.', 'y′ ≥ 0 và chỉ bằng 0 tại hữu hạn điểm thì hàm đồng biến.'),
M1('Đạo hàm – Khảo sát', true,  'Đồ thị hàm số y = (ax + b)/(cx + d) có tiệm cận ngang là đường thẳng y = a/c.', 'Bậc tử bằng bậc mẫu nên giới hạn khi x → ±∞ bằng tỉ số hai hệ số bậc nhất.'),
M1('Mũ – Logarit', true,  'Điều kiện xác định của logₐb là a > 0, a ≠ 1 và b > 0.', 'Thiếu một trong ba điều kiện thì biểu thức logarit không tồn tại.'),
M1('Mũ – Logarit', true,  'log(a·b) = log a + log b với a, b dương.', 'Logarit của tích bằng tổng các logarit — công thức nền của mọi biến đổi logarit.'),
M1('Mũ – Logarit', false, 'log(a + b) = log a + log b.', 'Công thức đúng chỉ áp dụng cho TÍCH, không phải cho tổng. Đây là lỗi sai kinh điển.'),
M1('Nguyên hàm – Tích phân', true,  'Nguyên hàm của xⁿ (với n ≠ −1) là xⁿ⁺¹/(n + 1) + C.', 'Ngược với công thức đạo hàm; nhớ cộng hằng số C.'),
M1('Nguyên hàm – Tích phân', false, 'Tích phân xác định luôn cho kết quả là một hàm số theo biến x.', 'Tích phân XÁC ĐỊNH cho ra một SỐ; tích phân bất định mới cho ra họ hàm số.'),
M1('Oxyz', true,  'Trong không gian Oxyz, mặt phẳng có phương trình tổng quát dạng Ax + By + Cz + D = 0 với vectơ pháp tuyến n = (A; B; C).', 'Ba hệ số đứng trước x, y, z chính là toạ độ vectơ pháp tuyến.'),
M1('Oxyz', true,  'Mặt cầu tâm I(a; b; c) bán kính R có phương trình (x − a)² + (y − b)² + (z − c)² = R².', 'Dạng chính tắc của mặt cầu, suy trực tiếp từ định nghĩa khoảng cách.'),
M1('Thống kê – Xác suất', true,  'Xác suất của một biến cố luôn là một số thuộc đoạn từ 0 đến 1.', 'P = 0 là biến cố không thể, P = 1 là biến cố chắc chắn.'),
M1('Thống kê – Xác suất', true,  'Khoảng biến thiên của mẫu số liệu bằng hiệu giữa giá trị lớn nhất và giá trị nhỏ nhất.', 'Đây là số đo độ phân tán đơn giản nhất, rất nhạy với giá trị bất thường.'),
M1('Thống kê – Xác suất', false, 'Độ lệch chuẩn có thể nhận giá trị âm.', 'Độ lệch chuẩn là căn bậc hai của phương sai nên luôn không âm.'),
M1('Hình không gian', true,  'Thể tích khối chóp bằng một phần ba tích của diện tích đáy với chiều cao.', 'V = (1/3)·S·h — công thức phải thuộc lòng.'),
M1('Hình không gian', true,  'Thể tích khối lăng trụ bằng tích của diện tích đáy với chiều cao.', 'V = S·h, gấp ba lần khối chóp có cùng đáy và cùng chiều cao.'),
M1('Dãy số – Cấp số', true,  'Trong một cấp số cộng, hiệu của hai số hạng liên tiếp bất kì luôn là một hằng số gọi là công sai.', 'Đây chính là định nghĩa của cấp số cộng.'),
M1('Dãy số – Cấp số', true,  'Số hạng tổng quát của cấp số nhân là uₙ = u₁·qⁿ⁻¹.', 'q là công bội, bằng thương của hai số hạng liên tiếp.'),
M1('Vecto và hệ thức lượng', true,  'Hai vectơ bằng nhau khi chúng cùng hướng và cùng độ dài.', 'Điểm đặt không ảnh hưởng tới việc hai vectơ có bằng nhau hay không.'),
M1('Bất phương trình bậc hai', true,  'Tam thức bậc hai ax² + bx + c luôn cùng dấu với hệ số a khi biệt thức Δ âm.', 'Δ < 0 nên tam thức không có nghiệm, đồ thị không cắt trục hoành.')
]);

/* ---------------- VẬT LÍ ---------------- */
bu('ly', [
M1('Vật lí nhiệt', true,  'Đơn vị của nhiệt lượng trong hệ SI là jun (J).', 'Calo là đơn vị ngoài hệ SI, 1 cal ≈ 4,18 J.'),
M1('Vật lí nhiệt', true,  'Nhiệt độ theo thang Kelvin bằng nhiệt độ theo thang Celsius cộng 273.', 'T(K) = t(°C) + 273; 0 K là độ không tuyệt đối.'),
M1('Vật lí nhiệt', true,  'Nhiệt dung riêng cho biết nhiệt lượng cần cung cấp để làm 1 kg chất tăng thêm 1 K.', 'Đơn vị J/(kg·K); công thức Q = m·c·Δt.'),
M1('Vật lí nhiệt', false, 'Trong quá trình nóng chảy, nhiệt độ của chất rắn kết tinh tăng dần.', 'Nhiệt độ giữ NGUYÊN trong suốt quá trình nóng chảy dù vẫn thu nhiệt.'),
M1('Vật lí nhiệt', true,  'Nội năng của một vật gồm động năng chuyển động nhiệt của các phân tử và thế năng tương tác giữa chúng.', 'Định nghĩa nội năng trong chương trình Vật lí 12.'),
M1('Khí lí tưởng', true,  'Định luật Boyle phát biểu rằng ở nhiệt độ không đổi, tích áp suất và thể tích của một lượng khí xác định là hằng số.', 'p·V = hằng số — quá trình đẳng nhiệt.'),
M1('Khí lí tưởng', true,  'Ở thể tích không đổi, áp suất của một lượng khí xác định tỉ lệ thuận với nhiệt độ tuyệt đối.', 'Định luật Charles cho quá trình đẳng tích: p/T = hằng số.'),
M1('Khí lí tưởng', false, 'Trong các định luật chất khí, nhiệt độ được tính theo thang Celsius.', 'Phải dùng nhiệt độ TUYỆT ĐỐI theo Kelvin, nếu không mọi tỉ lệ đều sai.'),
M1('Khí lí tưởng', true,  'Phương trình trạng thái khí lí tưởng có dạng pV = nRT.', 'n là số mol, R là hằng số khí lí tưởng.'),
M1('Từ trường', true,  'Đơn vị của từ thông trong hệ SI là vêbe, kí hiệu Wb.', 'Một vêbe bằng một tesla nhân một mét vuông.'),
M1('Từ trường', true,  'Từ thông qua một khung dây được tính bằng công thức Φ = N·B·S·cosα.', 'α là góc giữa vectơ pháp tuyến của mặt phẳng khung và vectơ cảm ứng từ.'),
M1('Từ trường', true,  'Lực từ tác dụng lên đoạn dây dẫn mang dòng điện đặt trong từ trường có độ lớn F = B·I·l·sinα.', 'α là góc giữa dây dẫn và đường sức từ; α = 90° cho lực lớn nhất.'),
M1('Từ trường', false, 'Đường sức từ là những đường cong có điểm đầu và điểm cuối.', 'Đường sức từ luôn KHÉP KÍN, không có điểm bắt đầu hay kết thúc.'),
M1('Vật lí hạt nhân', true,  'Hạt nhân nguyên tử được cấu tạo từ proton và neutron, gọi chung là nucleon.', 'Số proton là Z, tổng số nucleon là A.'),
M1('Vật lí hạt nhân', true,  'Chu kì bán rã là khoảng thời gian để một nửa số hạt nhân của một lượng chất phóng xạ bị phân rã.', 'Sau mỗi chu kì T, số hạt nhân còn lại giảm đi một nửa.'),
M1('Vật lí hạt nhân', true,  'Tia α chính là hạt nhân nguyên tử helium.', 'Kí hiệu ⁴₂He, mang điện tích dương, khả năng đâm xuyên yếu nhất trong ba loại tia phóng xạ.'),
M1('Vật lí hạt nhân', false, 'Tia β⁻ là dòng các hạt proton.', 'Tia β⁻ là dòng ELECTRON phát ra từ hạt nhân khi một neutron biến thành proton.'),
M1('Vật lí hạt nhân', true,  'Độ hụt khối của hạt nhân là hiệu giữa tổng khối lượng các nucleon riêng lẻ và khối lượng hạt nhân.', 'Δm = Z·mp + (A − Z)·mn − m(hạt nhân); năng lượng liên kết Wlk = Δm·c².'),
M1('Lớp 10 – 11', true,  'Đơn vị của cường độ dòng điện trong hệ SI là ampe (A).', 'Một ampe ứng với điện lượng một culông đi qua tiết diện dây trong một giây.'),
M1('Lớp 10 – 11', true,  'Định luật Ohm cho đoạn mạch phát biểu rằng cường độ dòng điện tỉ lệ thuận với hiệu điện thế và tỉ lệ nghịch với điện trở.', 'I = U/R.')
]);

/* ---------------- SINH HỌC ---------------- */
bu('sinh', [
M1('Di truyền phân tử', true,  'Phân tử DNA được cấu tạo từ bốn loại nucleotide là A, T, G và C.', 'Trong RNA, thymine (T) được thay bằng uracil (U).'),
M1('Di truyền phân tử', true,  'Trong phân tử DNA mạch kép, A liên kết với T bằng hai liên kết hydrogen còn G liên kết với C bằng ba liên kết hydrogen.', 'Nguyên tắc bổ sung — nền tảng để tính số liên kết hydrogen của gene.'),
M1('Di truyền phân tử', false, 'Trong phân tử DNA, adenine liên kết bổ sung với guanine.', 'A chỉ bắt cặp với T, còn G bắt cặp với C. Nhớ nhầm cặp là sai toàn bộ bài tính.'),
M1('Di truyền phân tử', true,  'Đơn phân cấu tạo nên phân tử DNA là nucleotide.', 'Mỗi nucleotide gồm ba thành phần: đường deoxyribose, nhóm phosphate và một base nitrogen.'),
M1('Di truyền phân tử', true,  'Mã di truyền là mã bộ ba, mỗi bộ ba nucleotide mã hoá cho một amino acid.', 'Có 64 bộ ba, trong đó 3 bộ ba kết thúc không mã hoá amino acid nào.'),
M1('Di truyền phân tử', true,  'Quá trình phiên mã tổng hợp phân tử RNA từ mạch khuôn của gene.', 'Dịch mã mới là quá trình tổng hợp chuỗi polypeptide từ mRNA.'),
M1('Di truyền NST', true,  'Bộ nhiễm sắc thể lưỡng bội của người bình thường gồm 46 nhiễm sắc thể.', 'Gồm 44 NST thường và 2 NST giới tính.'),
M1('Di truyền NST', true,  'Nhiễm sắc thể được cấu tạo từ DNA và protein histone.', 'Đơn vị cơ bản của NST là nucleosome.'),
M1('Di truyền NST', false, 'Đột biến lệch bội là dạng đột biến làm thay đổi số lượng nhiễm sắc thể ở tất cả các cặp.', 'Lệch bội chỉ thay đổi số lượng ở MỘT hoặc MỘT SỐ cặp; thay đổi toàn bộ là đa bội.'),
M1('Di truyền quần thể', true,  'Tần số allele của một quần thể là tỉ lệ của allele đó trên tổng số allele của locus tương ứng.', 'Tổng tần số các allele của một locus luôn bằng 1.'),
M1('Di truyền quần thể', true,  'Quần thể tự thụ phấn qua nhiều thế hệ làm tăng tỉ lệ kiểu gene đồng hợp và giảm tỉ lệ dị hợp.', 'Tần số allele không đổi, chỉ thành phần kiểu gene thay đổi.'),
M1('Tiến hoá', true,  'Theo Darwin, chọn lọc tự nhiên là quá trình giữ lại những cá thể thích nghi và đào thải những cá thể kém thích nghi.', 'Chọn lọc tác động lên kiểu hình, qua đó gián tiếp làm thay đổi tần số allele.'),
M1('Tiến hoá', true,  'Đột biến là nguồn nguyên liệu sơ cấp của quá trình tiến hoá.', 'Biến dị tổ hợp là nguồn nguyên liệu thứ cấp.'),
M1('Sinh thái học', true,  'Quần xã sinh vật là tập hợp các quần thể thuộc nhiều loài khác nhau cùng sống trong một sinh cảnh.', 'Quần thể chỉ gồm các cá thể của CÙNG một loài.'),
M1('Sinh thái học', true,  'Trong chuỗi thức ăn, sinh vật sản xuất luôn là bậc dinh dưỡng cấp một.', 'Thường là thực vật hoặc vi sinh vật tự dưỡng.'),
M1('Sinh thái học', false, 'Năng lượng được truyền theo vòng tuần hoàn khép kín trong hệ sinh thái.', 'Năng lượng truyền theo MỘT CHIỀU và mất dần; chỉ vật chất mới tuần hoàn.'),
M1('Sinh 10 – 11', true,  'Quang hợp là quá trình cây xanh sử dụng năng lượng ánh sáng để tổng hợp chất hữu cơ từ CO₂ và H₂O.', 'Sản phẩm gồm carbohydrate và khí oxygen.'),
M1('Sinh 10 – 11', true,  'Hô hấp tế bào là quá trình phân giải chất hữu cơ để giải phóng năng lượng tích luỹ trong phân tử ATP.', 'Diễn ra chủ yếu ở ti thể, gồm ba giai đoạn chính.'),
M1('Di truyền người', true,  'Bệnh mù màu và bệnh máu khó đông ở người do gene lặn nằm trên nhiễm sắc thể giới tính X quy định.', 'Vì thế nam giới chỉ cần một allele lặn đã biểu hiện bệnh.'),
M1('Công nghệ di truyền', true,  'Thể truyền (vector) thường dùng trong kĩ thuật chuyển gene là plasmid hoặc virus.', 'Thể truyền giúp đưa gene cần chuyển vào tế bào nhận và nhân lên cùng với nó.')
]);

/* ---------------- LỊCH SỬ ---------------- */
bu('su', [
M1('Liên hợp quốc', true,  'Liên hợp quốc được thành lập năm 1945.', 'Hội nghị San Francisco thông qua Hiến chương, có hiệu lực từ 24 – 10 – 1945.'),
M1('Liên hợp quốc', true,  'Việt Nam gia nhập Liên hợp quốc năm 1977.', 'Việt Nam trở thành thành viên thứ 149 của tổ chức này.'),
M1('Liên hợp quốc', false, 'Cơ quan giữ vai trò chính trong duy trì hoà bình và an ninh quốc tế của Liên hợp quốc là Đại hội đồng.', 'Đó là HỘI ĐỒNG BẢO AN. Đại hội đồng là cơ quan thảo luận gồm toàn bộ thành viên.'),
M1('Chiến tranh lạnh', true,  'Chiến tranh lạnh chính thức chấm dứt năm 1989 sau cuộc gặp giữa lãnh đạo Liên Xô và Hoa Kỳ tại đảo Manta.', 'Hai bên tuyên bố chấm dứt tình trạng đối đầu.'),
M1('Chiến tranh lạnh', true,  'Liên bang Xô viết tan rã vào năm 1991.', 'Sự kiện này chấm dứt trật tự thế giới hai cực Ianta.'),
M1('ASEAN', true,  'Hiệp hội các quốc gia Đông Nam Á (ASEAN) được thành lập năm 1967 tại Băng Cốc.', 'Năm nước sáng lập gồm Indonesia, Malaysia, Philippines, Singapore và Thái Lan.'),
M1('ASEAN', true,  'Việt Nam gia nhập ASEAN năm 1995.', 'Việt Nam là thành viên thứ bảy của tổ chức.'),
M1('ASEAN', true,  'Cộng đồng ASEAN chính thức được thành lập vào cuối năm 2015.', 'Gồm ba trụ cột: chính trị – an ninh, kinh tế và văn hoá – xã hội.'),
M1('Cách mạng tháng Tám', true,  'Đảng Cộng sản Việt Nam ra đời năm 1930.', 'Hội nghị hợp nhất ba tổ chức cộng sản diễn ra đầu năm 1930 tại Hương Cảng.'),
M1('Cách mạng tháng Tám', true,  'Mặt trận Việt Minh được thành lập năm 1941.', 'Ra đời tại Hội nghị Trung ương lần thứ tám do Nguyễn Ái Quốc chủ trì.'),
M1('Cách mạng tháng Tám', true,  'Bản Tuyên ngôn Độc lập được Chủ tịch Hồ Chí Minh đọc ngày 2 – 9 – 1945 tại Quảng trường Ba Đình.', 'Khai sinh nước Việt Nam Dân chủ Cộng hoà.'),
M1('Kháng chiến chống Pháp', true,  'Cuộc kháng chiến toàn quốc chống thực dân Pháp bùng nổ ngày 19 – 12 – 1946.', 'Mở đầu bằng Lời kêu gọi toàn quốc kháng chiến của Chủ tịch Hồ Chí Minh.'),
M1('Kháng chiến chống Pháp', true,  'Chiến dịch Điện Biên Phủ toàn thắng năm 1954.', 'Buộc Pháp kí Hiệp định Genève, công nhận độc lập của ba nước Đông Dương.'),
M1('Kháng chiến chống Mỹ', true,  'Hiệp định Pari về chấm dứt chiến tranh, lập lại hoà bình ở Việt Nam được kí năm 1973.', 'Buộc Hoa Kỳ rút hết quân khỏi miền Nam Việt Nam.'),
M1('Kháng chiến chống Mỹ', true,  'Cuộc Tổng tiến công và nổi dậy mùa Xuân năm 1975 kết thúc bằng Chiến dịch Hồ Chí Minh.', 'Miền Nam được giải phóng, đất nước thống nhất.'),
M1('Kháng chiến chống Mỹ', false, 'Nước Cộng hoà xã hội chủ nghĩa Việt Nam được thành lập ngay trong năm 1975.', 'Phải tới năm 1976, sau Tổng tuyển cử bầu Quốc hội chung, nước ta mới mang tên gọi này.'),
M1('Công cuộc Đổi mới', true,  'Đường lối Đổi mới được đề ra tại Đại hội đại biểu toàn quốc lần thứ VI của Đảng năm 1986.', 'Trọng tâm là đổi mới kinh tế, chuyển sang kinh tế hàng hoá nhiều thành phần.'),
M1('Công cuộc Đổi mới', true,  'Việt Nam gia nhập Tổ chức Thương mại Thế giới (WTO) năm 2007.', 'Đánh dấu bước hội nhập kinh tế quốc tế sâu rộng.'),
M1('Hồ Chí Minh', true,  'Nguyễn Tất Thành ra đi tìm đường cứu nước năm 1911 từ bến cảng Nhà Rồng.', 'Người sang phương Tây để tìm hiểu rồi trở về giúp đồng bào.'),
M1('Biển Đông', true,  'Công ước của Liên hợp quốc về Luật Biển được thông qua năm 1982, viết tắt là UNCLOS.', 'Đây là cơ sở pháp lí quốc tế để giải quyết các tranh chấp trên biển.')
]);

/* ---------------- ĐỊA LÍ ---------------- */
bu('dia', [
M1('Vị trí địa lí', true,  'Nước ta nằm hoàn toàn trong vùng nội chí tuyến bán cầu Bắc.', 'Đây là nguyên nhân cơ bản khiến thiên nhiên nước ta mang tính chất nhiệt đới.'),
M1('Vị trí địa lí', true,  'Việt Nam có đường bờ biển dài khoảng 3260 km.', 'Kéo dài từ Móng Cái (Quảng Ninh) đến Hà Tiên (Kiên Giang).'),
M1('Vị trí địa lí', true,  'Nước ta tiếp giáp với ba quốc gia trên đất liền là Trung Quốc, Lào và Campuchia.', 'Trong đó đường biên giới với Lào là dài nhất.'),
M1('Khí hậu', true,  'Khí hậu nước ta mang tính chất nhiệt đới ẩm gió mùa.', 'Ba đặc điểm này chi phối toàn bộ các thành phần tự nhiên khác.'),
M1('Khí hậu', true,  'Gió mùa mùa đông ở nước ta thổi theo hướng đông bắc.', 'Xuất phát từ áp cao Xibia, gây lạnh cho miền Bắc.'),
M1('Khí hậu', false, 'Gió mùa mùa hạ ở nước ta thổi theo hướng đông bắc.', 'Gió mùa mùa hạ thổi theo hướng TÂY NAM, mang mưa lớn cho cả nước.'),
M1('Phân hoá thiên nhiên', true,  'Thiên nhiên nước ta phân hoá theo ba chiều: bắc – nam, đông – tây và theo độ cao.', 'Ba chiều phân hoá này là khung sườn của toàn bộ phần địa lí tự nhiên.'),
M1('Phân hoá thiên nhiên', true,  'Ranh giới phân chia hai miền khí hậu bắc và nam của nước ta là dãy Bạch Mã.', 'Phía bắc có mùa đông lạnh, phía nam nóng quanh năm.'),
M1('Dân cư', true,  'Mật độ dân số được tính bằng số dân chia cho diện tích, đơn vị là người trên kilômét vuông.', 'Đây là chỉ tiêu cơ bản nhất khi phân tích phân bố dân cư.'),
M1('Dân cư', true,  'Tỉ lệ gia tăng dân số tự nhiên bằng hiệu của tỉ suất sinh thô và tỉ suất tử thô.', 'Kết quả thường quy đổi từ phần nghìn sang phần trăm.'),
M1('Dân cư', true,  'Cơ cấu dân số theo tuổi của nước ta đang chuyển dịch theo hướng già hoá.', 'Tỉ trọng nhóm 0 – 14 tuổi giảm, nhóm từ 65 tuổi trở lên tăng.'),
M1('Vùng kinh tế', true,  'Tây Nguyên là vùng chuyên canh cây cà phê lớn nhất nước ta.', 'Nhờ đất badan màu mỡ và khí hậu cận xích đạo phân hai mùa rõ rệt.'),
M1('Vùng kinh tế', true,  'Đồng bằng sông Cửu Long là vùng sản xuất lương thực lớn nhất nước ta.', 'Đóng góp hơn một nửa sản lượng lúa và phần lớn lượng gạo xuất khẩu.'),
M1('Vùng kinh tế', false, 'Đồng bằng sông Hồng là vùng có diện tích lớn nhất trong các vùng kinh tế của nước ta.', 'Đồng bằng sông Hồng có diện tích NHỎ; Trung du và miền núi Bắc Bộ mới là vùng rộng nhất.'),
M1('Ngành kinh tế', true,  'Bình quân lương thực theo đầu người được tính bằng sản lượng lương thực chia cho số dân.', 'Đơn vị thường dùng là kilôgam trên người.'),
M1('Ngành kinh tế', true,  'Cơ cấu kinh tế nước ta đang chuyển dịch theo hướng giảm tỉ trọng nông – lâm – thuỷ sản, tăng tỉ trọng công nghiệp – xây dựng và dịch vụ.', 'Đây là hướng chuyển dịch phù hợp với công nghiệp hoá, hiện đại hoá.'),
M1('Kỹ năng', true,  'Biểu đồ tròn thích hợp nhất để thể hiện cơ cấu khi số mốc thời gian không quá ba năm.', 'Nhiều mốc hơn thì phải dùng biểu đồ miền.'),
M1('Kỹ năng', true,  'Biểu đồ đường thích hợp nhất để thể hiện tốc độ tăng trưởng.', 'Số liệu phải quy về phần trăm với năm gốc bằng 100%.'),
M1('Kinh tế biển đảo', true,  'Vùng đặc quyền kinh tế của nước ta rộng 200 hải lí tính từ đường cơ sở.', 'Theo quy định của Công ước Luật Biển năm 1982.'),
M1('Kinh tế biển đảo', true,  'Hai quần đảo xa bờ thuộc chủ quyền Việt Nam là Hoàng Sa và Trường Sa.', 'Hoàng Sa thuộc thành phố Đà Nẵng, Trường Sa thuộc tỉnh Khánh Hoà.')
]);

/* ---------------- GDKT & PHÁP LUẬT ---------------- */
bu('gdkt', [
M1('Tăng trưởng – Phát triển', true,  'Tổng sản phẩm quốc nội (GDP) là tổng giá trị của toàn bộ hàng hoá và dịch vụ cuối cùng được tạo ra trong phạm vi lãnh thổ một quốc gia trong một thời kì nhất định.', 'Khác với GNI là tổng thu nhập của công dân quốc gia đó dù ở đâu.'),
M1('Tăng trưởng – Phát triển', true,  'Chỉ số phát triển con người được viết tắt là HDI.', 'HDI tổng hợp ba mặt: sức khoẻ, giáo dục và mức sống.'),
M1('Tăng trưởng – Phát triển', true,  'Phát triển bền vững gồm ba trụ cột là kinh tế, xã hội và môi trường.', 'Thiếu một trụ cột thì chưa gọi là phát triển bền vững.'),
M1('Hội nhập quốc tế', true,  'Hội nhập kinh tế quốc tế là quá trình một quốc gia gắn kết nền kinh tế của mình với kinh tế khu vực và thế giới.', 'Diễn ra ở ba cấp độ: song phương, khu vực và toàn cầu.'),
M1('Hội nhập quốc tế', true,  'Tổ chức Thương mại Thế giới được viết tắt là WTO.', 'Đây là tổ chức thương mại đa phương lớn nhất thế giới.'),
M1('Bảo hiểm – An sinh', true,  'Bảo hiểm xã hội bắt buộc áp dụng đối với người lao động có hợp đồng lao động từ đủ một tháng trở lên.', 'Đây là nghĩa vụ của cả người lao động lẫn người sử dụng lao động.'),
M1('Bảo hiểm – An sinh', true,  'Bảo hiểm y tế giúp chi trả một phần chi phí khám chữa bệnh cho người tham gia.', 'Mức hưởng phụ thuộc vào nhóm đối tượng và việc khám đúng tuyến hay không.'),
M1('Bảo hiểm – An sinh', false, 'Bảo hiểm y tế và bảo hiểm xã hội là hai tên gọi của cùng một loại hình bảo hiểm.', 'Đây là HAI loại hình khác nhau, có loại này không thay thế được loại kia.'),
M1('Quản lí thu chi', true,  'Kế hoạch tài chính cá nhân là bản kế hoạch về thu chi, tiết kiệm và đầu tư nhằm đạt mục tiêu tài chính của mỗi người.', 'Gồm kế hoạch ngắn hạn, trung hạn và dài hạn.'),
M1('Quản lí thu chi', true,  'Quỹ dự phòng nên đủ trang trải chi phí thiết yếu trong khoảng ba đến sáu tháng.', 'Đây là lớp đệm khi thu nhập bị gián đoạn.'),
M1('Doanh nghiệp – Thuế', true,  'Thuế là khoản nộp bắt buộc vào ngân sách nhà nước theo quy định của pháp luật.', 'Tính bắt buộc và không hoàn trả trực tiếp là hai đặc điểm cơ bản của thuế.'),
M1('Doanh nghiệp – Thuế', true,  'Thuế giá trị gia tăng là loại thuế gián thu.', 'Người tiêu dùng chịu thuế nhưng doanh nghiệp là bên nộp thay vào ngân sách.'),
M1('Doanh nghiệp – Thuế', true,  'Thuế thu nhập cá nhân đối với tiền lương, tiền công được tính theo biểu thuế luỹ tiến từng phần.', 'Chỉ phần thu nhập vượt ngưỡng của mỗi bậc mới chịu thuế suất cao hơn.'),
M1('Doanh nghiệp – Thuế', false, 'Thuế thu nhập doanh nghiệp là loại thuế gián thu.', 'Đó là thuế TRỰC THU, đánh trực tiếp vào thu nhập chịu thuế của doanh nghiệp.'),
M1('Quyền & nghĩa vụ', true,  'Quyền bất khả xâm phạm về thân thể có nghĩa là không ai bị bắt nếu không có quyết định của Toà án hoặc phê chuẩn của Viện kiểm sát, trừ trường hợp phạm tội quả tang.', 'Đây là một trong các quyền tự do cơ bản của công dân.'),
M1('Quyền & nghĩa vụ', true,  'Công dân bình đẳng trước pháp luật nghĩa là mọi công dân đều được hưởng quyền và phải thực hiện nghĩa vụ như nhau theo quy định của pháp luật.', 'Không phân biệt dân tộc, giới tính, tôn giáo, địa vị xã hội.'),
M1('Quyền & nghĩa vụ', true,  'Khiếu nại là việc công dân đề nghị xem xét lại quyết định hành chính khi cho rằng quyết định đó xâm phạm quyền lợi của mình.', 'Còn tố cáo là báo cho cơ quan có thẩm quyền về hành vi vi phạm pháp luật.'),
M1('Pháp luật quốc tế', true,  'Điều ước quốc tế là thoả thuận bằng văn bản được kí kết giữa các quốc gia và chịu sự điều chỉnh của pháp luật quốc tế.', 'Có thể mang tên hiệp ước, công ước, hiệp định hoặc nghị định thư.'),
M1('Lập kế hoạch kinh doanh', true,  'Ý tưởng kinh doanh là bước khởi đầu của quá trình lập kế hoạch kinh doanh.', 'Ý tưởng phải xuất phát từ nhu cầu có thật của thị trường.'),
M1('Trách nhiệm xã hội của doanh nghiệp', true,  'Trách nhiệm xã hội của doanh nghiệp là cam kết đóng góp vào sự phát triển bền vững thông qua các hoạt động nâng cao chất lượng đời sống người lao động và cộng đồng.', 'Gồm trách nhiệm kinh tế, pháp lí, đạo đức và nhân văn.')
]);

/* ---------------- TIẾNG ANH ---------------- */
bu('anh', [
M1('Thì động từ', true,  'Thì hiện tại đơn dùng để diễn tả thói quen, sự thật hiển nhiên hoặc lịch trình cố định.', 'Dấu hiệu thường gặp: always, usually, often, every day.'),
M1('Thì động từ', true,  'Ở thì hiện tại đơn, động từ thêm đuôi -s hoặc -es khi chủ ngữ là ngôi thứ ba số ít.', 'He works, she goes, it rains.'),
M1('Thì động từ', true,  'Thì hiện tại hoàn thành có công thức have hoặc has cộng với động từ ở dạng quá khứ phân từ.', 'Dấu hiệu: already, just, yet, since, for, ever, never.'),
M1('Thì động từ', false, 'Thì quá khứ đơn dùng với các trạng từ since và for để chỉ khoảng thời gian kéo dài đến hiện tại.', 'Since và for là dấu hiệu của thì HIỆN TẠI HOÀN THÀNH, không phải quá khứ đơn.'),
M1('Câu điều kiện', true,  'Câu điều kiện loại một dùng để nói về một sự việc có thể xảy ra ở hiện tại hoặc tương lai.', 'If + hiện tại đơn, will + động từ nguyên thể.'),
M1('Câu điều kiện', true,  'Câu điều kiện loại hai diễn tả điều không có thật ở hiện tại.', 'If + quá khứ đơn, would + động từ nguyên thể; động từ to be luôn dùng were.'),
M1('Câu điều kiện', true,  'Câu điều kiện loại ba diễn tả điều trái với thực tế trong quá khứ.', 'If + quá khứ hoàn thành, would have + quá khứ phân từ.'),
M1('Bị động – Tường thuật', true,  'Câu bị động được lập bằng động từ to be chia theo thì cộng với quá khứ phân từ của động từ chính.', 'Tân ngữ của câu chủ động trở thành chủ ngữ của câu bị động.'),
M1('Bị động – Tường thuật', true,  'Khi chuyển sang câu tường thuật, đại từ và trạng từ chỉ thời gian, nơi chốn phải được đổi cho phù hợp.', 'Ví dụ: now → then, today → that day, here → there.'),
M1('Bị động – Tường thuật', false, 'Động từ say luôn đi kèm tân ngữ chỉ người ngay sau nó trong câu tường thuật.', 'Say KHÔNG có tân ngữ người đi liền sau; tell mới bắt buộc có (tell me, tell him).'),
M1('Mệnh đề quan hệ', true,  'Đại từ quan hệ who dùng để thay thế cho danh từ chỉ người.', 'Which thay cho vật, that thay cho cả người lẫn vật.'),
M1('Mệnh đề quan hệ', true,  'Đại từ quan hệ whose dùng để chỉ sự sở hữu.', 'Đứng ngay trước danh từ mà nó bổ nghĩa, ví dụ the man whose car was stolen.'),
M1('Mệnh đề quan hệ', true,  'Trạng từ quan hệ when dùng cho danh từ chỉ thời gian, where dùng cho danh từ chỉ nơi chốn.', 'Ví dụ: the day when we met, the place where we live.'),
M1('Từ loại', true,  'Hậu tố -ment, -tion và -ness thường tạo thành danh từ.', 'Ví dụ: development, information, happiness.'),
M1('Từ loại', true,  'Hậu tố -ful và -less thường tạo thành tính từ.', 'Careful nghĩa là cẩn thận, careless nghĩa là bất cẩn — hai hậu tố cho nghĩa ngược nhau.'),
M1('Từ loại', true,  'Trạng từ chỉ cách thức thường được tạo bằng cách thêm đuôi -ly vào tính từ.', 'Quick trở thành quickly; lưu ý các trường hợp bất quy tắc như good – well.'),
M1('Ngữ pháp khác', true,  'So sánh hơn của tính từ ngắn được tạo bằng cách thêm đuôi -er và đi với than.', 'Tính từ dài dùng more đứng trước.'),
M1('Ngữ pháp khác', true,  'So sánh nhất của tính từ ngắn được tạo bằng cách thêm đuôi -est và đứng sau mạo từ the.', 'Tính từ dài dùng the most.'),
M1('Cấu trúc – Chiến thuật', true,  'Đề thi tốt nghiệp môn Tiếng Anh từ năm 2025 gồm 40 câu trắc nghiệm và làm bài trong 50 phút.', 'Trung bình mỗi câu chỉ có khoảng 75 giây.'),
M1('Dạng bài & chiến thuật 2025', true,  'Từ năm 2025, đề thi Tiếng Anh không còn dạng bài phát âm và trọng âm.', 'Thay vào đó là các dạng bài gắn với ngữ cảnh như điền từ vào đoạn văn, sắp xếp câu và đọc hiểu.')
]);

})();
