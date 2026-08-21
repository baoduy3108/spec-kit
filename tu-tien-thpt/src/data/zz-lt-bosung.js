/* ============================================================
   BỔ SUNG MỆNH ĐỀ CHO CÁC CHUYÊN ĐỀ CÒN MỎNG
   Nạp sau các file lt-*.js nên chỉ nối thêm, không ghi đè.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO_LT = TD.KHO_LT || {};

(function () {
const bu = (mon, ds) => { TD.KHO_LT[mon] = (TD.KHO_LT[mon] || []).concat(ds); };

bu('hoa', [
{ cd: 'Điện phân – Pin điện', m: 2, a: true,  t: 'Trong pin điện hoá, anode là cực âm và xảy ra quá trình oxi hoá.', v: 'Ngược lại, trong bình điện phân thì anode nối với cực dương của nguồn nhưng vẫn xảy ra oxi hoá.' },
{ cd: 'Điện phân – Pin điện', m: 2, a: false, t: 'Trong bình điện phân, cathode là cực dương của nguồn điện.', v: 'Cathode nối với cực ÂM của nguồn; tại đó xảy ra sự khử. Chỉ có tên quá trình là giống pin, còn dấu điện cực thì ngược.' },
{ cd: 'Điện phân – Pin điện', m: 2, a: true,  t: 'Điện phân dung dịch NaCl có màng ngăn thu được khí H₂ ở cathode, khí Cl₂ ở anode và dung dịch NaOH.', v: 'Na⁺ không bị khử trong dung dịch nên nước bị khử tạo H₂ và OH⁻.' },
{ cd: 'Điện phân – Pin điện', m: 2, a: false, t: 'Điện phân dung dịch NaCl thu được kim loại natri bám ở cathode.', v: 'Muốn thu Na phải điện phân NaCl NÓNG CHẢY. Trong dung dịch, nước bị khử trước Na⁺.' },
{ cd: 'Điện phân – Pin điện', m: 3, a: true,  t: 'Thứ tự bị khử ở cathode khi điện phân dung dịch là Ag⁺ > Fe³⁺ > Cu²⁺ > H⁺ > H₂O, còn K⁺, Na⁺, Al³⁺ không bị khử.', v: 'Ion kim loại càng yếu về tính khử thì càng dễ bị khử trước.' },
{ cd: 'Điện phân – Pin điện', m: 3, a: true,  t: 'Với điện cực trơ, thứ tự bị oxi hoá ở anode là S²⁻ > I⁻ > Br⁻ > Cl⁻ > H₂O.', v: 'Khi các anion đó hết thì nước bị oxi hoá tạo O₂ và H⁺.' },
{ cd: 'Điện phân – Pin điện', m: 3, a: false, t: 'Số mol electron ở cathode và anode trong cùng một bình điện phân có thể khác nhau.', v: 'Luôn BẰNG nhau vì dòng điện đi qua hai điện cực là một. Đây là điểm tựa để lập phương trình cho mọi bài điện phân.' },
{ cd: 'Điện phân – Pin điện', m: 3, a: true,  t: 'Trong ăn mòn điện hoá, kim loại có tính khử mạnh hơn đóng vai trò anode và bị ăn mòn trước.', v: 'Đây là nguyên lí bảo vệ vỏ tàu thép bằng cách gắn các khối kẽm.' },
{ cd: 'Điện phân – Pin điện', m: 4, a: true,  t: 'Ăn mòn điện hoá cần đủ ba điều kiện: hai điện cực khác bản chất, tiếp xúc với nhau và cùng nhúng trong dung dịch chất điện li.', v: 'Thiếu một trong ba điều kiện thì chỉ còn ăn mòn hoá học, tốc độ chậm hơn nhiều.' },
{ cd: 'Điện phân – Pin điện', m: 4, a: false, t: 'Ăn mòn hoá học xảy ra nhanh hơn ăn mòn điện hoá.', v: 'Ngược lại. Ăn mòn điện hoá có dòng electron chuyển dời thành dòng nên tốc độ nhanh hơn hẳn.' },
{ cd: 'Polymer', m: 1, a: true,  t: 'Tơ visco và tơ acetate là tơ bán tổng hợp vì được chế biến từ cellulose thiên nhiên.', v: 'Khác với tơ tổng hợp (nylon, nitron) được tổng hợp hoàn toàn từ monome nhân tạo.' },
{ cd: 'Polymer', m: 2, a: false, t: 'Tơ tằm và tơ nilon-6,6 đều là tơ tổng hợp.', v: 'Tơ tằm là tơ THIÊN NHIÊN (protein), chỉ nilon-6,6 mới là tơ tổng hợp.' },
{ cd: 'Polymer', m: 2, a: true,  t: 'Cao su buna-S được điều chế bằng phản ứng đồng trùng hợp buta-1,3-diene với styrene.', v: 'Chữ S trong tên gọi chính là styrene; buna-N thì đồng trùng hợp với acrylonitrile.' },
{ cd: 'Polymer', m: 2, a: false, t: 'Polymer nào cũng tan tốt trong nước.', v: 'Hầu hết polymer không tan trong nước và các dung môi thông thường; đó là lí do chúng bền và dùng làm vật liệu.' },
{ cd: 'Polymer', m: 3, a: true,  t: 'Nhựa phenol formaldehyde được điều chế bằng phản ứng trùng ngưng, có giải phóng nước.', v: 'Mọi phản ứng trùng ngưng đều giải phóng phân tử nhỏ, thường là H₂O.' },
{ cd: 'Polymer', m: 3, a: false, t: 'Poly(vinyl chloride) được điều chế bằng phản ứng trùng ngưng vinyl chloride.', v: 'PVC điều chế bằng TRÙNG HỢP vì vinyl chloride có liên kết đôi C=C.' },
{ cd: 'Polymer', m: 3, a: true,  t: 'Điều kiện để một monome tham gia trùng hợp là phân tử phải có liên kết bội hoặc vòng kém bền.', v: 'Ethylene, vinyl chloride, styrene có nối đôi; caprolactam có vòng kém bền.' },
{ cd: 'Polymer', m: 4, a: true,  t: 'Cao su lưu hoá bền hơn cao su thô vì các mạch polymer được nối với nhau bằng cầu nối disulfide tạo mạng không gian.', v: 'Lưu hoá làm cao su đàn hồi tốt hơn, chịu nhiệt và ít tan trong dung môi hữu cơ.' },
{ cd: 'Polymer', m: 4, a: false, t: 'Hệ số polymer hoá của một polymer là một hằng số xác định cho mọi phân tử của polymer đó.', v: 'Polymer là hỗn hợp các phân tử có độ dài mạch khác nhau; hệ số polymer hoá chỉ là giá trị TRUNG BÌNH.' }
]);

bu('toan', [
{ cd: 'Dãy số – Cấp số', m: 1, a: true,  t: 'Trong cấp số cộng, hiệu của hai số hạng liên tiếp bất kì luôn bằng công sai d.', v: 'u_{n+1} − u_n = d với mọi n. Đây là dấu hiệu nhận biết nhanh nhất.' },
{ cd: 'Dãy số – Cấp số', m: 1, a: false, t: 'Trong cấp số nhân, hiệu của hai số hạng liên tiếp luôn không đổi.', v: 'Cấp số NHÂN có THƯƠNG không đổi. Hiệu không đổi là dấu hiệu của cấp số cộng.' },
{ cd: 'Dãy số – Cấp số', m: 2, a: true,  t: 'Ba số a, b, c theo thứ tự lập thành cấp số cộng khi và chỉ khi 2b = a + c.', v: 'Số hạng giữa bằng trung bình cộng hai số kề. Với cấp số nhân thì b² = ac.' },
{ cd: 'Dãy số – Cấp số', m: 2, a: true,  t: 'Biết số hạng đầu và công sai thì tính được mọi số hạng của cấp số cộng mà không cần liệt kê lần lượt.', v: 'u_n = u₁ + (n − 1)d. Chú ý hệ số là (n − 1) chứ không phải n — đây là chỗ sai vặt hay gặp.' },
{ cd: 'Dãy số – Cấp số', m: 3, a: true,  t: 'Cấp số nhân lùi vô hạn có công bội thoả |q| < 1 và tổng của nó bằng u₁/(1 − q).', v: 'Điều kiện |q| < 1 là bắt buộc; nếu không tổng sẽ phân kì.' },
{ cd: 'Dãy số – Cấp số', m: 3, a: false, t: 'Công bội của một cấp số nhân có thể bằng 0.', v: 'Công bội phải khác 0, nếu không mọi số hạng từ số hạng thứ hai trở đi đều bằng 0 và tỉ số không xác định.' },
{ cd: 'Dãy số – Cấp số', m: 3, a: true,  t: 'Bài toán tăng trưởng theo phần trăm cố định mỗi kì là một cấp số nhân với công bội q = 1 + r.', v: 'Lãi kép, tăng dân số, khấu hao đều thuộc dạng này; giảm r% thì q = 1 − r.' },
{ cd: 'Dãy số – Cấp số', m: 4, a: true,  t: 'Một dãy số tăng vẫn có thể bị chặn trên.', v: 'Ví dụ u_n = n/(n+1) luôn tăng nhưng luôn nhỏ hơn 1. Tăng và bị chặn là hai tính chất độc lập.' },
{ cd: 'Dãy số – Cấp số', m: 4, a: false, t: 'Nếu dãy số có mọi số hạng dương thì dãy đó luôn là dãy tăng.', v: 'Dương và tăng là hai chuyện khác nhau: dãy 1/n có mọi số hạng dương nhưng lại GIẢM.' }
]);

bu('sinh', [
{ cd: 'Di truyền quần thể', m: 2, a: true,  t: 'Quần thể tự thụ phấn qua nhiều thế hệ có tỉ lệ dị hợp giảm dần còn tỉ lệ đồng hợp tăng dần.', v: 'Sau n thế hệ, Aa = (1/2)ⁿ phần dị hợp ban đầu; phần giảm chia đều cho AA và aa.' },
{ cd: 'Di truyền quần thể', m: 2, a: false, t: 'Tự thụ phấn làm thay đổi tần số allele của quần thể.', v: 'Tự thụ phấn KHÔNG đổi tần số allele, chỉ đổi cấu trúc kiểu gene. Đây là bẫy hay gặp nhất của chuyên đề này.' },
{ cd: 'Di truyền quần thể', m: 3, a: true,  t: 'Một quần thể ngẫu phối đạt trạng thái cân bằng di truyền chỉ sau một thế hệ.', v: 'Đó là nội dung định luật Hardy – Weinberg, với điều kiện không có đột biến, chọn lọc, di nhập gene.' },
{ cd: 'Di truyền quần thể', m: 3, a: true,  t: 'Quần thể cân bằng thoả hệ thức p² · q² = (2pq/2)².', v: 'Đây là cách kiểm tra nhanh xem cấu trúc đề cho đã cân bằng hay chưa, khỏi phải tính lại tần số allele.' },
{ cd: 'Di truyền quần thể', m: 3, a: false, t: 'Với gene nằm trên vùng không tương đồng của NST X, có thể áp dụng công thức p² + 2pq + q² cho cả hai giới.', v: 'Chỉ áp dụng cho giới XX. Giới XY chỉ có một allele nên tần số kiểu hình bằng luôn tần số allele.' },
{ cd: 'Di truyền quần thể', m: 4, a: true,  t: 'Bệnh do allele lặn trên NST X biểu hiện ở nam nhiều hơn nữ rất nhiều khi tần số allele bệnh nhỏ.', v: 'Nam bệnh với tần số q, nữ bệnh với tần số q². Với q = 0,01 thì nam bệnh gấp 100 lần nữ.' },
{ cd: 'Di truyền quần thể', m: 4, a: true,  t: 'Trong nhóm cá thể mang kiểu hình trội của quần thể cân bằng, tỉ lệ cá thể dị hợp bằng 2pq/(p² + 2pq).', v: 'Đây là xác suất CÓ ĐIỀU KIỆN, mẫu số chỉ gồm nhóm trội chứ không phải cả quần thể.' }
]);

bu('anh', [
{ cd: 'Mệnh đề quan hệ', m: 2, a: true,  t: 'Có thể lược bỏ đại từ quan hệ khi nó làm TÂN NGỮ trong mệnh đề quan hệ xác định.', v: 'The book (which) I bought yesterday — bỏ được vì "which" là tân ngữ của "bought".' },
{ cd: 'Mệnh đề quan hệ', m: 2, a: false, t: 'Có thể lược bỏ đại từ quan hệ khi nó làm chủ ngữ của mệnh đề quan hệ.', v: 'Làm chủ ngữ thì KHÔNG bỏ được, trừ khi rút gọn thành V-ing hoặc V3.' },
{ cd: 'Mệnh đề quan hệ', m: 3, a: true,  t: 'Trong câu "He passed the exam, which made his parents happy", từ "which" thay cho cả mệnh đề đứng trước.', v: 'Đây là mệnh đề quan hệ không xác định thay cho toàn bộ ý ở vế trước, luôn có dấu phẩy và luôn dùng "which".' },
{ cd: 'Mệnh đề quan hệ', m: 3, a: true,  t: 'Sau "the first", "the last", "the only" và các so sánh nhất, người ta ưu tiên dùng "that" hơn "who" hoặc "which".', v: 'She is the only person that can help us — đây là quy ước dùng từ trong tiếng Anh chuẩn.' },
{ cd: 'Mệnh đề quan hệ', m: 4, a: true,  t: 'Trong câu "I have three friends, all of whom are engineers", cụm "all of whom" là dạng lượng từ kết hợp đại từ quan hệ.', v: 'Cấu trúc: lượng từ (all, some, none, both, most) + of + whom/which. Sau giới từ "of" không dùng "who" hay "that".' },
{ cd: 'Mệnh đề quan hệ', m: 4, a: false, t: 'Sau "where" trong mệnh đề quan hệ, mệnh đề theo sau có thể thiếu chủ ngữ hoặc tân ngữ.', v: 'Sau "where" luôn là mệnh đề ĐẦY ĐỦ. Nếu mệnh đề thiếu thành phần thì phải dùng "which" chứ không phải "where".' }
]);

bu('dia', [
{ cd: 'Dân cư', m: 2, a: true,  t: 'Dân số nước ta phân bố rất không đều giữa đồng bằng với miền núi và giữa thành thị với nông thôn.', v: 'Đồng bằng chiếm khoảng 1/4 diện tích nhưng tập trung khoảng 3/4 dân số.' },
{ cd: 'Dân cư', m: 3, a: true,  t: 'Nguồn lao động nước ta dồi dào nhưng tỉ lệ lao động đã qua đào tạo còn thấp.', v: 'Đó là lí do năng suất lao động chưa cao dù chi phí lao động rẻ.' },
{ cd: 'Dân cư', m: 3, a: false, t: 'Tỉ lệ dân thành thị của nước ta hiện đã cao hơn mức trung bình của thế giới.', v: 'Tỉ lệ dân thành thị nước ta khoảng 38–40%, vẫn THẤP hơn mức trung bình thế giới (trên 55%).' },
{ cd: 'Dân cư', m: 3, a: true,  t: 'Chuyển cư từ nông thôn ra thành thị làm giảm sức ép việc làm ở nông thôn nhưng lại tăng sức ép hạ tầng ở đô thị.', v: 'Đây là tác động hai mặt điển hình của quá trình đô thị hoá nhanh.' },
{ cd: 'Dân cư', m: 4, a: true,  t: 'Thời kì cơ cấu dân số vàng chỉ kéo dài trong vài thập niên nên phải tận dụng bằng đào tạo và tạo việc làm.', v: 'Bỏ lỡ giai đoạn này thì khi dân số già đi, gánh nặng an sinh sẽ rất lớn mà năng suất lại chưa kịp nâng lên.' }
]);

bu('su', [
{ cd: 'Biển Đông', m: 2, a: true,  t: 'Nhà nước phong kiến Việt Nam đã xác lập và thực thi chủ quyền với Hoàng Sa, Trường Sa từ thế kỉ XVII một cách liên tục và hoà bình.', v: 'Các chúa Nguyễn lập đội Hoàng Sa và đội Bắc Hải để khai thác và quản lí hai quần đảo này.' },
{ cd: 'Biển Đông', m: 3, a: true,  t: 'Việt Nam chủ trương giải quyết tranh chấp ở Biển Đông bằng biện pháp hoà bình trên cơ sở luật pháp quốc tế.', v: 'Cụ thể là trên cơ sở Công ước Luật Biển 1982 và Tuyên bố về ứng xử của các bên ở Biển Đông.' },
{ cd: 'Biển Đông', m: 3, a: false, t: 'Việc một quốc gia chiếm đóng bằng vũ lực có thể tạo ra cơ sở pháp lí về chủ quyền lãnh thổ.', v: 'Luật pháp quốc tế hiện đại KHÔNG thừa nhận việc thụ đắc lãnh thổ bằng vũ lực.' },
{ cd: 'Biển Đông', m: 4, a: true,  t: 'Biển Đông có vị trí chiến lược vì là tuyến hàng hải huyết mạch và giàu tài nguyên dầu khí, thuỷ sản.', v: 'Khoảng một phần ba lượng hàng hoá thương mại đường biển của thế giới đi qua Biển Đông.' },
{ cd: 'Biển Đông', m: 4, a: true,  t: 'Phát triển kinh tế biển gắn với bảo vệ chủ quyền là chủ trương nhất quán của Việt Nam.', v: 'Ngư dân bám biển vừa là hoạt động kinh tế vừa góp phần khẳng định sự hiện diện dân sự trên vùng biển của ta.' }
]);

/* Chuyên đề mới thay cho Ngữ âm – Trọng âm (đã bị loại khỏi đề từ 2025) */
bu('anh', [
{ cd: 'Dạng bài & chiến thuật 2025', m: 1, a: true,  t: 'Đề Tiếng Anh tốt nghiệp THPT từ năm 2025 gồm 40 câu trắc nghiệm làm trong 50 phút, mỗi câu 0,25 điểm.', v: 'Không còn phần tự luận và không có câu trả lời ngắn; tất cả đều là trắc nghiệm bốn phương án.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 1, a: false, t: 'Đề Tiếng Anh từ năm 2025 vẫn có phần hỏi về ngữ âm và trọng âm.', v: 'Dạng ngữ âm và trọng âm ĐÃ BỊ LOẠI khỏi cấu trúc đề từ năm 2025. Ôn phần này là mất thời gian vô ích.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 1, a: false, t: 'Dạng tìm lỗi sai và dạng chọn câu gần nghĩa nhất vẫn nằm trong đề Tiếng Anh từ 2025.', v: 'Cả hai dạng đó đều đã bị loại, cùng với dạng chọn từ đồng nghĩa – trái nghĩa và hoàn thành hội thoại.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 2, a: true,  t: 'Phần đọc hiểu chiếm 18 trên 40 câu, gần một nửa toàn bộ đề.', v: 'Vì vậy luyện kĩ năng đọc quan trọng hơn hẳn việc học thuộc mẹo ngữ pháp lẻ.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 2, a: true,  t: 'Đề có dạng bài sắp xếp các câu cho sẵn thành một đoạn văn hoặc một lá thư hoàn chỉnh.', v: 'Đây là dạng MỚI xuất hiện từ 2025, chiếm khoảng 5 câu.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 2, a: true,  t: 'Đề có dạng bài chèn một câu cho sẵn vào vị trí thích hợp trong đoạn văn.', v: 'Dạng mới, khoảng 5 câu; kiểm tra khả năng nắm mạch lạc và liên kết của đoạn.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 2, a: true,  t: 'Ngữ pháp và từ vựng vẫn được kiểm tra nhưng đặt trong ĐOẠN VĂN chứ không hỏi bằng câu rời.', v: 'Phần điền từ và cụm ngắn khoảng 12 câu, luôn nằm trong một đoạn có ngữ cảnh.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 3, a: true,  t: 'Trong dạng sắp xếp câu, câu chứa lời chào hoặc câu nêu chủ đề luôn đứng đầu, câu kí tên hoặc câu kết luận luôn đứng cuối.', v: 'Xác định được đầu và cuối là đã khoanh vùng được phần lớn thứ tự.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 3, a: true,  t: 'Đại từ như it, they, this, such phải có danh từ tương ứng xuất hiện ở câu ĐỨNG TRƯỚC.', v: 'Đây là mỏ neo mạnh nhất để sắp xếp câu và để chèn câu vào đúng vị trí.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 3, a: true,  t: 'Từ nối đầu câu như However, Therefore, As a result, For this reason cho biết quan hệ với câu liền trước.', v: 'Trái chiều dùng However; nhân quả dùng Therefore hoặc As a result; bổ sung dùng Moreover.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 3, a: false, t: 'Trong bài đọc hiểu, câu hỏi "According to the passage" cho phép suy luận thêm ngoài bài.', v: '"According to the passage" đòi hỏi đáp án nằm NGUYÊN trong bài. Chỉ câu "can be inferred" mới cần suy luận.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 3, a: true,  t: 'Câu hỏi dạng "The word ... is closest in meaning to" phải đoán nghĩa theo ngữ cảnh của bài chứ không theo nghĩa quen thuộc nhất của từ.', v: 'Nhiều từ có nhiều nghĩa; đề luôn chọn từ mà nghĩa trong bài khác nghĩa thông dụng.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 3, a: true,  t: 'Câu hỏi "The word it/they refers to" giải bằng cách tìm danh từ gần nhất phía trước khớp cả nghĩa lẫn số ít – số nhiều.', v: 'Thử thay danh từ đó vào vị trí đại từ, nếu câu vẫn hợp nghĩa thì đúng.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 4, a: true,  t: 'Câu tóm tắt đoạn văn phải bao được mọi ý chính, không thêm ý ngoài và không đổi mức độ khẳng định của bài.', v: 'Phương án chứa completely, every, only, should be banned thường quá mạnh so với giọng điệu thận trọng của bài đọc.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 4, a: false, t: 'Phương án đúng cho câu ý chính thường là phương án có nhiều chi tiết cụ thể nhất.', v: 'Ý chính phải KHÁI QUÁT cả bài. Phương án quá chi tiết chỉ đúng một đoạn nên là bẫy.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 4, a: true,  t: 'Với câu hỏi "Which of the following is NOT mentioned", phải đối chiếu từng phương án với bài để loại dần.', v: 'Ba phương án tìm được trong bài, phương án còn lại chính là đáp án. Không được chọn theo cảm tính.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 2, a: true,  t: 'Trung bình mỗi câu chỉ có 75 giây, nên câu nào quá hai phút thì nên đánh dấu và bỏ qua để quay lại sau.', v: '40 câu trong 50 phút. Sa đà một câu khó là mất nhiều câu dễ ở phía sau.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 2, a: true,  t: 'Nên đọc câu hỏi trước rồi mới quét bài đọc để tìm thông tin, thay vì đọc kĩ toàn bài từ đầu.', v: 'Kĩ năng skimming và scanning giúp tiết kiệm thời gian ở phần đọc hiểu 18 câu.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 1, a: false, t: 'Nếu không biết đáp án thì nên bỏ trống để tránh bị trừ điểm.', v: 'Bài thi KHÔNG trừ điểm câu sai. Bỏ trống là chắc chắn mất điểm, còn đoán vẫn có 25% cơ hội.' },
{ cd: 'Dạng bài & chiến thuật 2025', m: 3, a: true,  t: 'Trong bài điền từ vào đoạn văn, nhiều chỗ trống là TỪ NỐI nên phải hiểu quan hệ giữa hai câu mới chọn đúng.', v: 'Đọc trọn câu chứa chỗ trống và cả câu liền trước, đừng chỉ nhìn vài từ quanh chỗ trống.' }
]);

/* ===== TOÁN: năm mảng kiến thức lớp 10–11 vẫn nằm trong phạm vi thi ===== */
bu('toan', [
{ cd: 'Lượng giác', m: 1, a: true,  t: 'Với mọi số thực x luôn có sin²x + cos²x = 1.', v: 'Hệ thức cơ bản nhất, suy ra 1 + tan²x = 1/cos²x và 1 + cot²x = 1/sin²x.' },
{ cd: 'Lượng giác', m: 1, a: false, t: 'Hàm số y = sin x có tập giá trị là toàn bộ tập số thực.', v: 'Tập giá trị của sin x và cos x đều là đoạn [−1; 1], không phải toàn bộ ℝ.' },
{ cd: 'Lượng giác', m: 2, a: true,  t: 'Hàm số y = sin x và y = cos x đều tuần hoàn với chu kì 2π, còn y = tan x tuần hoàn với chu kì π.', v: 'Chu kì của y = sin(ax + b) là 2π/|a|; của y = tan(ax + b) là π/|a|.' },
{ cd: 'Lượng giác', m: 2, a: true,  t: 'Phương trình sin x = m có nghiệm khi và chỉ khi −1 ≤ m ≤ 1.', v: 'Ngoài khoảng đó phương trình vô nghiệm vì vượt tập giá trị của hàm sin.' },
{ cd: 'Lượng giác', m: 2, a: false, t: 'Phương trình cos x = 2 có hai nghiệm phân biệt trong khoảng (0; 2π).', v: 'Vô nghiệm vì 2 nằm ngoài đoạn [−1; 1].' },
{ cd: 'Lượng giác', m: 2, a: true,  t: 'Nghiệm của phương trình sin x = sin α là x = α + k2π hoặc x = π − α + k2π.', v: 'Còn cos x = cos α cho x = ±α + k2π; tan x = tan α cho x = α + kπ.' },
{ cd: 'Lượng giác', m: 3, a: true,  t: 'Công thức nhân đôi cho cos2a có ba dạng tương đương: cos²a − sin²a, 2cos²a − 1 và 1 − 2sin²a.', v: 'Ba dạng này là nguồn của công thức hạ bậc, dùng nhiều khi tính tích phân lượng giác.' },
{ cd: 'Lượng giác', m: 3, a: true,  t: 'Công thức hạ bậc sin²a = (1 − cos2a)/2 giúp đưa bậc hai về bậc nhất để lấy tích phân.', v: 'Tương tự cos²a = (1 + cos2a)/2. Không hạ bậc thì không lấy nguyên hàm trực tiếp được.' },
{ cd: 'Lượng giác', m: 3, a: false, t: 'Công thức cộng góc cho cos(a + b) = cos a·cos b + sin a·sin b.', v: 'Dấu bị ngược: cos(a + b) = cos a·cos b − sin a·sin b. Chỉ cos(a − b) mới mang dấu cộng.' },
{ cd: 'Lượng giác', m: 3, a: true,  t: 'Phương trình a·sin x + b·cos x = c có nghiệm khi và chỉ khi a² + b² ≥ c².', v: 'Vì vế trái viết được thành √(a²+b²)·sin(x + φ), có tập giá trị [−√(a²+b²); √(a²+b²)].' },
{ cd: 'Lượng giác', m: 3, a: true,  t: 'Hàm số y = sin x là hàm lẻ còn y = cos x là hàm chẵn.', v: 'sin(−x) = −sin x nên đồ thị đối xứng qua gốc toạ độ; cos(−x) = cos x nên đối xứng qua trục tung.' },
{ cd: 'Lượng giác', m: 4, a: true,  t: 'Giá trị lớn nhất của biểu thức 3sin x + 4cos x bằng 5.', v: 'Vì 3sin x + 4cos x = 5·sin(x + φ) với √(3² + 4²) = 5, mà sin không vượt quá 1.' },
{ cd: 'Lượng giác', m: 4, a: false, t: 'Số nghiệm của phương trình sin x = 1/2 trên đoạn [0; 2π] là bốn.', v: 'Chỉ có hai nghiệm là π/6 và 5π/6. Muốn đếm nghiệm phải vẽ đường tròn lượng giác hoặc thay k lần lượt.' },
{ cd: 'Lượng giác', m: 4, a: true,  t: 'Khi giải phương trình lượng giác có mẫu số hoặc chứa tan, cot thì phải đặt điều kiện xác định trước.', v: 'Ví dụ tan x đòi hỏi cos x ≠ 0, tức x ≠ π/2 + kπ. Bỏ qua điều kiện là nhận nghiệm ngoại lai.' },
{ cd: 'Lượng giác', m: 2, a: true,  t: 'Một cung lượng giác có số đo 1 radian ứng với cung có độ dài bằng bán kính đường tròn.', v: 'Đổi đơn vị: π radian = 180°, nên 1 rad ≈ 57,3°.' },
{ cd: 'Lượng giác', m: 2, a: false, t: 'Trên máy tính, chế độ độ và chế độ radian cho cùng một kết quả khi tính sin.', v: 'Khác hoàn toàn: sin(π/6) ở chế độ R là 0,5 nhưng ở chế độ D chỉ khoảng 0,0091. Chọn sai chế độ là sai cả bài.' },

{ cd: 'Giới hạn – Liên tục', m: 1, a: true,  t: 'Dãy số (qⁿ) có giới hạn bằng 0 khi và chỉ khi |q| < 1.', v: 'Nếu |q| > 1 thì dãy phân kì; q = 1 cho dãy hằng bằng 1; q = −1 thì dãy không có giới hạn.' },
{ cd: 'Giới hạn – Liên tục', m: 1, a: true,  t: 'lim(1/nᵏ) = 0 với mọi k > 0 khi n tiến tới vô cực.', v: 'Đây là giới hạn nền để tính mọi giới hạn phân thức bằng cách chia cho luỹ thừa bậc cao nhất.' },
{ cd: 'Giới hạn – Liên tục', m: 2, a: true,  t: 'Khi x tiến tới vô cực, giới hạn của phân thức hữu tỉ phụ thuộc vào việc so bậc của tử với bậc của mẫu.', v: 'Bậc tử nhỏ hơn cho 0; bằng nhau cho tỉ số hệ số cao nhất; lớn hơn cho vô cực.' },
{ cd: 'Giới hạn – Liên tục', m: 2, a: true,  t: 'Với dạng vô định 0/0 của phân thức, cách xử lí là phân tích thành nhân tử rồi rút gọn.', v: 'Nếu chứa căn thì nhân liên hợp để khử dạng vô định.' },
{ cd: 'Giới hạn – Liên tục', m: 2, a: false, t: 'Mọi hàm số đều liên tục tại mọi điểm thuộc tập xác định của nó.', v: 'Hàm cho bởi nhiều công thức có thể gián đoạn tại điểm nối dù điểm đó vẫn thuộc tập xác định.' },
{ cd: 'Giới hạn – Liên tục', m: 3, a: true,  t: 'Hàm số f liên tục tại x₀ khi và chỉ khi giới hạn của f khi x tiến tới x₀ tồn tại và bằng f(x₀).', v: 'Phải đủ ba điều: f(x₀) xác định · giới hạn tồn tại · hai giá trị đó bằng nhau.' },
{ cd: 'Giới hạn – Liên tục', m: 3, a: true,  t: 'Với hàm cho bởi nhiều công thức, muốn xét liên tục tại điểm nối phải tính cả giới hạn trái và giới hạn phải.', v: 'Hai giới hạn một bên phải bằng nhau và bằng giá trị hàm tại điểm đó.' },
{ cd: 'Giới hạn – Liên tục', m: 3, a: true,  t: 'Nếu f liên tục trên đoạn [a; b] và f(a)·f(b) < 0 thì phương trình f(x) = 0 có ít nhất một nghiệm trong khoảng (a; b).', v: 'Đây là hệ quả của định lí giá trị trung gian, dùng để chứng minh phương trình có nghiệm.' },
{ cd: 'Giới hạn – Liên tục', m: 3, a: false, t: 'Nếu f(a)·f(b) > 0 thì chắc chắn phương trình f(x) = 0 vô nghiệm trên (a; b).', v: 'Không suy ra được. Hàm có thể cắt trục hoành hai lần rồi quay lại, ví dụ parabol.' },
{ cd: 'Giới hạn – Liên tục', m: 3, a: true,  t: 'Hàm đa thức liên tục trên toàn bộ tập số thực.', v: 'Hàm phân thức hữu tỉ liên tục trên tập xác định, tức trừ các điểm làm mẫu bằng 0.' },
{ cd: 'Giới hạn – Liên tục', m: 4, a: true,  t: 'Giới hạn một bên khác nhau tại một điểm chứng tỏ hàm số không có giới hạn tại điểm đó.', v: 'Đó cũng là dấu hiệu của điểm gián đoạn loại nhảy, hay gặp ở hàm chứa dấu giá trị tuyệt đối.' },
{ cd: 'Giới hạn – Liên tục', m: 4, a: true,  t: 'Đường thẳng x = x₀ là tiệm cận đứng của đồ thị khi ít nhất một giới hạn một bên tại x₀ bằng vô cực.', v: 'Đây là cầu nối giữa chương giới hạn với bài toán tiệm cận trong khảo sát hàm số.' },
{ cd: 'Giới hạn – Liên tục', m: 4, a: false, t: 'Mẫu số triệt tiêu tại x₀ thì chắc chắn đồ thị có tiệm cận đứng x = x₀.', v: 'Nếu tử cũng triệt tiêu thì phải rút gọn trước; sau khi rút gọn có thể không còn tiệm cận đứng nữa.' },
{ cd: 'Giới hạn – Liên tục', m: 2, a: true,  t: 'Tổng của cấp số nhân lùi vô hạn chính là một giới hạn và bằng u₁/(1 − q) khi |q| < 1.', v: 'Đây là chỗ chương giới hạn nối với chương dãy số.' },
{ cd: 'Giới hạn – Liên tục', m: 2, a: false, t: 'Giới hạn của một tổng luôn bằng tổng các giới hạn trong mọi trường hợp.', v: 'Chỉ đúng khi từng giới hạn tồn tại hữu hạn. Với dạng vô định ∞ − ∞ thì quy tắc này không áp dụng được.' },
{ cd: 'Giới hạn – Liên tục', m: 3, a: true,  t: 'Có thể dùng chức năng lập bảng giá trị của máy tính để dự đoán giới hạn bằng cách cho x tiến dần tới điểm cần xét.', v: 'Cho x = 1,9 · 1,99 · 1,999 để dự đoán giới hạn khi x tiến tới 2 từ bên trái.' },

{ cd: 'Vecto và hệ thức lượng', m: 1, a: true,  t: 'Hai vecto bằng nhau khi chúng cùng hướng và cùng độ dài.', v: 'Vecto không phụ thuộc điểm đặt, nên hai vecto bằng nhau có thể nằm ở hai vị trí khác nhau.' },
{ cd: 'Vecto và hệ thức lượng', m: 1, a: true,  t: 'Quy tắc ba điểm cho AB→ + BC→ = AC→ với ba điểm A, B, C bất kì.', v: 'Kèm quy tắc trừ: AB→ − AC→ = CB→.' },
{ cd: 'Vecto và hệ thức lượng', m: 2, a: true,  t: 'Điểm I là trung điểm của AB khi và chỉ khi với mọi điểm M có MA→ + MB→ = 2MI→.', v: 'Với trọng tâm G của tam giác ABC thì MA→ + MB→ + MC→ = 3MG→.' },
{ cd: 'Vecto và hệ thức lượng', m: 2, a: true,  t: 'Tích vô hướng của hai vecto bằng tích độ dài nhân với cosin góc giữa chúng.', v: 'u→·v→ = |u||v|cos(u,v) = x₁x₂ + y₁y₂ trong toạ độ. Hai vecto vuông góc khi tích vô hướng bằng 0.' },
{ cd: 'Vecto và hệ thức lượng', m: 2, a: false, t: 'Tích vô hướng của hai vecto là một vecto.', v: 'Tích vô hướng là một SỐ. Chỉ tích có hướng trong không gian mới cho ra một vecto.' },
{ cd: 'Vecto và hệ thức lượng', m: 2, a: true,  t: 'Định lí cosin cho a² = b² + c² − 2bc·cos A trong tam giác ABC.', v: 'Dùng khi biết hai cạnh và góc XEN GIỮA, hoặc biết cả ba cạnh để tìm góc.' },
{ cd: 'Vecto và hệ thức lượng', m: 2, a: true,  t: 'Định lí sin cho a/sin A = b/sin B = c/sin C = 2R với R là bán kính đường tròn ngoại tiếp.', v: 'Dùng khi biết một cạnh và góc ĐỐI DIỆN nó.' },
{ cd: 'Vecto và hệ thức lượng', m: 3, a: true,  t: 'Diện tích tam giác tính được bằng nhiều cách: ½ab·sin C, abc/4R, pr và công thức Heron.', v: 'Chọn công thức theo dữ kiện đề cho; p là nửa chu vi, r là bán kính đường tròn nội tiếp.' },
{ cd: 'Vecto và hệ thức lượng', m: 3, a: true,  t: 'Công thức đường trung tuyến cho m_a² = (2b² + 2c² − a²)/4.', v: 'Hay dùng trong bài toán thực tế đo khoảng cách gián tiếp.' },
{ cd: 'Vecto và hệ thức lượng', m: 3, a: false, t: 'Định lí cosin chỉ áp dụng được cho tam giác vuông.', v: 'Áp dụng cho MỌI tam giác. Với góc A vuông thì cos A = 0 và công thức trở về định lí Pythagore.' },
{ cd: 'Vecto và hệ thức lượng', m: 3, a: true,  t: 'Ba điểm A, B, C thẳng hàng khi và chỉ khi hai vecto AB→ và AC→ cùng phương.', v: 'Trong toạ độ, cùng phương nghĩa là x₁y₂ − x₂y₁ = 0.' },
{ cd: 'Vecto và hệ thức lượng', m: 4, a: true,  t: 'Bài toán đo chiều cao hoặc khoảng cách không tới được thường giải bằng định lí sin kết hợp định lí cosin.', v: 'Đây là dạng bài thực tế được chương trình mới rất ưa dùng.' },
{ cd: 'Vecto và hệ thức lượng', m: 4, a: true,  t: 'Trong không gian, tích có hướng của hai vecto vuông góc với cả hai vecto đó và có độ dài bằng diện tích hình bình hành dựng trên chúng.', v: 'Nhờ vậy diện tích tam giác bằng nửa độ dài tích có hướng của hai vecto cạnh.' },
{ cd: 'Vecto và hệ thức lượng', m: 2, a: false, t: 'Vecto AB→ và vecto BA→ là hai vecto bằng nhau.', v: 'Chúng ngược hướng: AB→ = −BA→. Nhầm chiều là sai dấu toàn bộ phép tính về sau.' },
{ cd: 'Vecto và hệ thức lượng', m: 3, a: true,  t: 'Góc giữa hai vecto luôn nằm trong đoạn từ 0° đến 180°.', v: 'Khác với góc giữa hai đường thẳng vốn chỉ nằm trong khoảng từ 0° đến 90°.' },
{ cd: 'Vecto và hệ thức lượng', m: 2, a: true,  t: 'Trong tam giác vuông, hệ thức lượng cho b² = a·b′ và h² = b′·c′ với b′, c′ là hình chiếu hai cạnh góc vuông lên cạnh huyền.', v: 'Kèm hệ thức 1/h² = 1/b² + 1/c² dùng nhiều trong hình không gian.' },

{ cd: 'Bất phương trình bậc hai', m: 1, a: true,  t: 'Tam thức bậc hai f(x) = ax² + bx + c với Δ < 0 luôn cùng dấu với hệ số a trên toàn bộ tập số thực.', v: 'Đây là nền của mọi bài "tìm m để biểu thức luôn dương" hoặc "luôn âm".' },
{ cd: 'Bất phương trình bậc hai', m: 1, a: true,  t: 'Khi Δ > 0, tam thức bậc hai trái dấu với a giữa hai nghiệm và cùng dấu với a ngoài khoảng hai nghiệm.', v: 'Câu thần chú quen thuộc: "trong trái, ngoài cùng".' },
{ cd: 'Bất phương trình bậc hai', m: 2, a: true,  t: 'Bất phương trình ax² + bx + c > 0 nghiệm đúng với mọi x khi a > 0 và Δ < 0.', v: 'Nếu đề cho "nghiệm đúng với mọi x" thì phải xét thêm trường hợp a = 0.' },
{ cd: 'Bất phương trình bậc hai', m: 2, a: false, t: 'Bất phương trình ax² + bx + c ≥ 0 nghiệm đúng với mọi x khi a > 0 và Δ > 0.', v: 'Phải là Δ ≤ 0. Khi Δ > 0 tam thức đổi dấu nên không thể luôn không âm.' },
{ cd: 'Bất phương trình bậc hai', m: 2, a: true,  t: 'Khi Δ = 0, tam thức bậc hai cùng dấu với a với mọi x khác nghiệm kép và bằng 0 tại nghiệm kép.', v: 'Vì vậy bất phương trình ngặt "> 0" không nghiệm đúng với mọi x, nhưng "≥ 0" thì có.' },
{ cd: 'Bất phương trình bậc hai', m: 3, a: true,  t: 'Muốn giải bất phương trình bậc hai, ta tìm nghiệm của tam thức rồi lập bảng xét dấu.', v: 'Lập bảng xét dấu vẫn nhanh và ít sai hơn nhẩm miệng, nhất là khi hệ số a âm.' },
{ cd: 'Bất phương trình bậc hai', m: 3, a: true,  t: 'Bất phương trình chứa căn thức luôn phải đặt điều kiện xác định trước khi bình phương hai vế.', v: 'Bình phương khi chưa biết dấu hai vế là nguồn nghiệm ngoại lai phổ biến nhất.' },
{ cd: 'Bất phương trình bậc hai', m: 3, a: false, t: 'Nhân hai vế bất phương trình với một biểu thức chứa ẩn thì giữ nguyên chiều bất phương trình.', v: 'Chỉ giữ nguyên chiều khi biểu thức đó DƯƠNG. Biểu thức âm thì phải đổi chiều, chưa biết dấu thì phải chia trường hợp.' },
{ cd: 'Bất phương trình bậc hai', m: 3, a: true,  t: 'Phương trình bậc hai có hai nghiệm trái dấu khi và chỉ khi a·c < 0.', v: 'Suy từ định lí Viète: tích hai nghiệm bằng c/a nên âm khi a và c trái dấu.' },
{ cd: 'Bất phương trình bậc hai', m: 3, a: true,  t: 'Định lí Viète cho tổng hai nghiệm bằng −b/a và tích hai nghiệm bằng c/a.', v: 'Dùng để tính biểu thức đối xứng của hai nghiệm mà không cần giải phương trình.' },
{ cd: 'Bất phương trình bậc hai', m: 4, a: true,  t: 'Phương trình bậc hai có hai nghiệm dương phân biệt khi Δ > 0, tổng hai nghiệm dương và tích hai nghiệm dương.', v: 'Ba điều kiện phải đồng thời. Thiếu điều kiện Δ > 0 là hay quên nhất.' },
{ cd: 'Bất phương trình bậc hai', m: 4, a: false, t: 'Nếu tích hai nghiệm dương thì cả hai nghiệm đều dương.', v: 'Tích dương chỉ nghĩa là hai nghiệm CÙNG dấu; muốn cả hai dương thì tổng cũng phải dương.' },
{ cd: 'Bất phương trình bậc hai', m: 2, a: true,  t: 'Bất phương trình bậc nhất hai ẩn có miền nghiệm là một nửa mặt phẳng giới hạn bởi đường thẳng tương ứng.', v: 'Xác định nửa mặt phẳng bằng cách thay toạ độ một điểm bất kì không nằm trên đường thẳng, thường lấy gốc O.' },
{ cd: 'Bất phương trình bậc hai', m: 3, a: true,  t: 'Bài toán tối ưu tuyến tính tìm giá trị lớn nhất, nhỏ nhất của biểu thức trên miền đa giác đạt cực trị tại ĐỈNH của miền.', v: 'Nên chỉ cần thay toạ độ các đỉnh vào rồi so sánh, không phải quét toàn miền.' },
{ cd: 'Bất phương trình bậc hai', m: 2, a: false, t: 'Miền nghiệm của hệ bất phương trình bậc nhất hai ẩn luôn là một đa giác bị chặn.', v: 'Có thể là miền không bị chặn, khi đó biểu thức tối ưu có thể không có giá trị lớn nhất.' },
{ cd: 'Bất phương trình bậc hai', m: 4, a: true,  t: 'Khi cô lập tham số m về dạng m ≥ f(x) đúng với mọi x thuộc D, ta cần m ≥ giá trị LỚN NHẤT của f trên D.', v: 'Ngược lại, m ≥ f(x) có nghiệm thì chỉ cần m ≥ giá trị NHỎ NHẤT. Phân biệt "với mọi" và "tồn tại" là chỗ mất điểm nhiều nhất.' }
]);

/* ===== HOÁ: hai mảng còn thiếu ===== */
bu('hoa', [
{ cd: 'Phức chất', m: 1, a: true,  t: 'Phức chất gồm một nguyên tử hoặc ion kim loại trung tâm liên kết với các phối tử bao quanh.', v: 'Liên kết giữa nguyên tử trung tâm và phối tử là liên kết cho – nhận.' },
{ cd: 'Phức chất', m: 1, a: true,  t: 'Phối tử là phân tử hoặc anion còn cặp electron chưa liên kết, ví dụ H₂O, NH₃, Cl⁻, CN⁻, OH⁻.', v: 'Cặp electron đó được cho vào orbital trống của ion kim loại trung tâm.' },
{ cd: 'Phức chất', m: 2, a: true,  t: 'Số phối trí là số liên kết cho – nhận giữa nguyên tử trung tâm và các phối tử.', v: 'Số phối trí thường gặp là 4 (tứ diện hoặc vuông phẳng) và 6 (bát diện).' },
{ cd: 'Phức chất', m: 2, a: true,  t: 'Ion [Cu(H₂O)₆]²⁺ trong dung dịch có màu xanh lam đặc trưng.', v: 'Đây là dạng tồn tại thật của ion Cu²⁺ trong nước, giải thích màu xanh của dung dịch muối đồng.' },
{ cd: 'Phức chất', m: 2, a: true,  t: 'Cho dung dịch NH₃ dư vào dung dịch muối Cu²⁺ thu được phức [Cu(NH₃)₄]²⁺ màu xanh lam đậm.', v: 'Kết tủa Cu(OH)₂ tạo ra ban đầu tan trở lại trong NH₃ dư nhờ tạo phức tan.' },
{ cd: 'Phức chất', m: 2, a: false, t: 'Kết tủa Cu(OH)₂ không tan trong dung dịch NH₃ dư.', v: 'Cu(OH)₂ TAN trong NH₃ dư tạo phức xanh lam đậm. Đây là phản ứng nhận biết ion Cu²⁺.' },
{ cd: 'Phức chất', m: 3, a: true,  t: 'Kim loại chuyển tiếp dễ tạo phức chất vì có orbital d trống để nhận cặp electron của phối tử.', v: 'Đó cũng là lí do hợp chất của chúng thường có màu và có nhiều số oxi hoá.' },
{ cd: 'Phức chất', m: 3, a: true,  t: 'Màu của phức chất phụ thuộc vào ion kim loại trung tâm và cả loại phối tử bao quanh nó.', v: 'Cùng ion Cu²⁺ nhưng phức với H₂O màu xanh nhạt còn phức với NH₃ màu xanh đậm hơn hẳn.' },
{ cd: 'Phức chất', m: 3, a: true,  t: 'AgCl không tan trong nước nhưng tan trong dung dịch NH₃ dư nhờ tạo phức [Ag(NH₃)₂]⁺.', v: 'Ứng dụng trong phản ứng tráng bạc và trong việc tách bạc.' },
{ cd: 'Phức chất', m: 3, a: false, t: 'Mọi kim loại đều tạo được phức chất bền như nhau.', v: 'Kim loại chuyển tiếp tạo phức dễ và bền hơn hẳn kim loại nhóm IA, IIA vì có orbital d.' },
{ cd: 'Phức chất', m: 4, a: true,  t: 'Phức chất có vai trò quan trọng trong sinh học: hemoglobin là phức của sắt, còn chlorophyll là phức của magnesium.', v: 'Hemoglobin vận chuyển oxygen; chlorophyll hấp thụ ánh sáng cho quang hợp.' },
{ cd: 'Phức chất', m: 4, a: true,  t: 'Trong công nghiệp, phức chất được dùng để tách và tinh chế kim loại, làm chất xúc tác và làm chất tạo màu.', v: 'Ví dụ dùng phức cyanide để tách vàng, dùng phức làm xúc tác trong tổng hợp hữu cơ.' },
{ cd: 'Phức chất', m: 3, a: true,  t: 'Trong công thức phức chất, phần nằm trong dấu ngoặc vuông là cầu nội, phần ngoài ngoặc là cầu ngoại.', v: 'Ví dụ K₃[Fe(CN)₆] có cầu nội là [Fe(CN)₆]³⁻ và cầu ngoại là ba ion K⁺.' },
{ cd: 'Phức chất', m: 2, a: true,  t: 'Điện tích của ion phức bằng tổng điện tích của ion trung tâm và của các phối tử.', v: 'Với [Cu(NH₃)₄]²⁺: Cu²⁺ mang +2, NH₃ trung hoà nên ion phức mang +2.' },
{ cd: 'Phức chất', m: 4, a: false, t: 'Khi tạo phức, số oxi hoá của ion kim loại trung tâm thay đổi.', v: 'Tạo phức là liên kết CHO – NHẬN, không phải phản ứng oxi hoá khử, nên số oxi hoá giữ nguyên.' },
{ cd: 'Phức chất', m: 3, a: true,  t: 'Nhận biết ion Fe³⁺ bằng dung dịch KSCN cho phức màu đỏ máu.', v: 'Phản ứng rất nhạy, dùng phổ biến trong phân tích định tính.' },

{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 1, a: true,  t: 'Phản ứng toả nhiệt có biến thiên enthalpy chuẩn mang dấu âm.', v: 'Δ_rH° < 0 là toả nhiệt; Δ_rH° > 0 là thu nhiệt.' },
{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 1, a: true,  t: 'Enthalpy tạo thành chuẩn của đơn chất bền nhất ở trạng thái chuẩn bằng 0.', v: 'Ví dụ Δ_fH° của O₂(g), N₂(g), C(graphite) đều bằng 0.' },
{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 2, a: true,  t: 'Biến thiên enthalpy của phản ứng bằng tổng enthalpy tạo thành của sản phẩm trừ tổng của chất đầu.', v: 'Δ_rH = ΣΔ_fH(sản phẩm) − ΣΔ_fH(chất đầu).' },
{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 2, a: false, t: 'Tính theo năng lượng liên kết thì cũng lấy tổng của sản phẩm trừ tổng của chất đầu.', v: 'NGƯỢC lại: theo năng lượng liên kết thì lấy tổng chất ĐẦU trừ tổng sản phẩm. Hai công thức ngược chiều nhau.' },
{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 2, a: true,  t: 'Phản ứng đốt cháy nhiên liệu luôn là phản ứng toả nhiệt.', v: 'Đó là lí do nhiên liệu được dùng để cung cấp năng lượng.' },
{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 2, a: true,  t: 'Tốc độ phản ứng tăng khi tăng nồng độ, tăng nhiệt độ, tăng áp suất chất khí, tăng diện tích bề mặt hoặc dùng chất xúc tác.', v: 'Năm yếu tố này là câu hỏi lí thuyết quen thuộc.' },
{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 3, a: true,  t: 'Chất xúc tác làm tăng tốc độ phản ứng nhưng không bị tiêu hao sau phản ứng.', v: 'Xúc tác hạ năng lượng hoạt hoá, làm cả chiều thuận và chiều nghịch nhanh lên như nhau.' },
{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 3, a: false, t: 'Chất xúc tác làm cân bằng hoá học chuyển dịch theo chiều thuận.', v: 'Xúc tác KHÔNG làm chuyển dịch cân bằng, chỉ giúp hệ đạt cân bằng nhanh hơn.' },
{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 3, a: true,  t: 'Cân bằng hoá học là cân bằng động: phản ứng thuận và nghịch vẫn xảy ra nhưng với tốc độ bằng nhau.', v: 'Nồng độ các chất không đổi chứ không phải phản ứng dừng lại.' },
{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 3, a: true,  t: 'Theo nguyên lí Le Chatelier, tăng nhiệt độ làm cân bằng chuyển dịch theo chiều thu nhiệt.', v: 'Hệ luôn chuyển dịch theo chiều CHỐNG LẠI tác động từ bên ngoài.' },
{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 3, a: true,  t: 'Tăng áp suất làm cân bằng chuyển dịch theo chiều làm giảm số mol khí.', v: 'Nếu hai vế có số mol khí bằng nhau thì áp suất không ảnh hưởng tới cân bằng.' },
{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 3, a: false, t: 'Trong biểu thức hằng số cân bằng có mặt cả chất rắn và dung môi.', v: 'Chất rắn và dung môi KHÔNG xuất hiện trong biểu thức hằng số cân bằng vì nồng độ của chúng coi như không đổi.' },
{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 4, a: true,  t: 'Với phản ứng tổng hợp ammonia toả nhiệt và giảm số mol khí, muốn tăng hiệu suất phải tăng áp suất và giảm nhiệt độ.', v: 'Thực tế vẫn phải giữ nhiệt độ khá cao để tốc độ đủ nhanh — đó là sự đánh đổi giữa hiệu suất và tốc độ.' },
{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 4, a: true,  t: 'Hằng số cân bằng chỉ phụ thuộc bản chất phản ứng và nhiệt độ, không phụ thuộc nồng độ ban đầu.', v: 'Đổi nồng độ ban đầu chỉ đổi vị trí cân bằng chứ không đổi giá trị K.' },
{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 2, a: true,  t: 'Nhiệt lượng toả ra khi đốt cháy hoàn toàn một lượng chất tính bằng tích số mol với trị tuyệt đối của enthalpy đốt cháy.', v: 'Q = n × |Δ_cH|. Đây là cầu nối giữa Hoá và bài toán năng lượng thực tế.' },
{ cd: 'Nhiệt động – Tốc độ – Cân bằng', m: 4, a: false, t: 'Phản ứng có Δ_rH âm thì luôn xảy ra nhanh ở điều kiện thường.', v: 'Toả nhiệt nói về mặt NĂNG LƯỢNG, còn xảy ra nhanh hay chậm là chuyện TỐC ĐỘ. Than cháy toả nhiệt mạnh nhưng vẫn cần mồi lửa.' }
]);

/* ===== SINH: hai mảng còn thiếu ===== */
bu('sinh', [
{ cd: 'Di truyền người', m: 1, a: true,  t: 'Nghiên cứu di truyền người gặp khó khăn vì người sinh sản chậm, ít con và không thể áp dụng phương pháp lai hay gây đột biến.', v: 'Vì vậy phải dùng các phương pháp gián tiếp như phả hệ, trẻ đồng sinh và di truyền tế bào.' },
{ cd: 'Di truyền người', m: 2, a: true,  t: 'Phương pháp phả hệ dùng để xác định gene gây bệnh là trội hay lặn và nằm trên nhiễm sắc thể thường hay giới tính.', v: 'Bố mẹ bình thường sinh con bệnh thì bệnh do gene lặn; bệnh chủ yếu ở nam thì gene lặn nằm trên X.' },
{ cd: 'Di truyền người', m: 2, a: true,  t: 'Hội chứng Down do thừa một nhiễm sắc thể số 21, tức có ba chiếc thay vì hai.', v: 'Đây là thể ba nhiễm, phát hiện được bằng phương pháp nghiên cứu nhiễm sắc thể.' },
{ cd: 'Di truyền người', m: 2, a: true,  t: 'Hội chứng Turner có bộ nhiễm sắc thể giới tính XO còn hội chứng Klinefelter là XXY.', v: 'Cả hai đều là đột biến số lượng nhiễm sắc thể giới tính.' },
{ cd: 'Di truyền người', m: 2, a: false, t: 'Bệnh mù màu và bệnh máu khó đông do gene trội nằm trên nhiễm sắc thể X quy định.', v: 'Do gene LẶN trên X. Vì thế nam giới chỉ cần một allele lặn đã biểu hiện bệnh.' },
{ cd: 'Di truyền người', m: 3, a: true,  t: 'Bệnh phenylketone niệu là bệnh do đột biến gene lặn trên nhiễm sắc thể thường, có thể hạn chế tác hại bằng chế độ ăn kiêng.', v: 'Ví dụ điển hình cho thấy kiểu hình là kết quả tương tác giữa kiểu gene và môi trường.' },
{ cd: 'Di truyền người', m: 3, a: true,  t: 'Trẻ đồng sinh cùng trứng có kiểu gene giống hệt nhau nên khác biệt giữa chúng chủ yếu do môi trường.', v: 'Nghiên cứu trẻ đồng sinh giúp tách vai trò của kiểu gene và môi trường lên từng tính trạng.' },
{ cd: 'Di truyền người', m: 3, a: true,  t: 'Tư vấn di truyền giúp các cặp vợ chồng dự đoán nguy cơ sinh con mắc bệnh di truyền.', v: 'Dựa trên phả hệ, xét nghiệm gene và các chỉ số sàng lọc trước sinh.' },
{ cd: 'Di truyền người', m: 3, a: false, t: 'Mọi bệnh di truyền đều biểu hiện ngay từ khi mới sinh.', v: 'Nhiều bệnh chỉ biểu hiện ở tuổi trưởng thành, ví dụ bệnh Huntington.' },
{ cd: 'Di truyền người', m: 4, a: true,  t: 'Kết hôn gần huyết thống làm tăng nguy cơ sinh con mắc bệnh di truyền lặn.', v: 'Vì làm tăng khả năng hai allele lặn hiếm cùng gặp nhau trong một hợp tử.' },
{ cd: 'Di truyền người', m: 4, a: true,  t: 'Sàng lọc trước sinh và sàng lọc sơ sinh giúp phát hiện sớm để can thiệp kịp thời.', v: 'Chọc ối và sinh thiết tua nhau thai cho phép phân tích bộ nhiễm sắc thể của thai nhi.' },
{ cd: 'Di truyền người', m: 4, a: true,  t: 'Trong phả hệ, nếu bố bị bệnh mà tất cả con gái đều bị bệnh còn con trai bình thường thì gene bệnh là trội trên nhiễm sắc thể X.', v: 'Bố truyền X cho toàn bộ con gái và truyền Y cho toàn bộ con trai.' },
{ cd: 'Di truyền người', m: 3, a: true,  t: 'Bệnh chỉ truyền theo dòng mẹ là dấu hiệu của gene nằm trong ti thể.', v: 'Hợp tử nhận ti thể gần như hoàn toàn từ trứng của mẹ.' },
{ cd: 'Di truyền người', m: 2, a: true,  t: 'Ung thư là bệnh do đột biến ở các gene kiểm soát chu kì tế bào, phần lớn là đột biến ở tế bào sinh dưỡng nên không di truyền cho đời sau.', v: 'Chỉ một tỉ lệ nhỏ ung thư mang yếu tố di truyền qua tế bào sinh dục.' },
{ cd: 'Di truyền người', m: 4, a: false, t: 'Xét nghiệm gene có thể khẳng định chắc chắn một người sẽ mắc mọi bệnh mà họ mang allele nguy cơ.', v: 'Nhiều bệnh là đa gene và chịu ảnh hưởng môi trường, nên xét nghiệm chỉ cho biết NGUY CƠ chứ không khẳng định.' },
{ cd: 'Di truyền người', m: 2, a: false, t: 'Người mang gene bệnh lặn ở trạng thái dị hợp thì luôn biểu hiện bệnh.', v: 'Người dị hợp là người LÀNH MANG GENE, không biểu hiện nhưng vẫn truyền allele bệnh cho con.' },

{ cd: 'Công nghệ di truyền', m: 1, a: true,  t: 'Công nghệ gene là quy trình chuyển gene từ tế bào cho sang tế bào nhận nhằm tạo sinh vật biến đổi gene.', v: 'Ba khâu chính: tạo DNA tái tổ hợp, đưa vào tế bào nhận, phân lập dòng tế bào chứa DNA tái tổ hợp.' },
{ cd: 'Công nghệ di truyền', m: 2, a: true,  t: 'Thể truyền thường dùng là plasmid của vi khuẩn hoặc virus đã được biến đổi.', v: 'Thể truyền phải tự nhân đôi được trong tế bào nhận và mang dấu chuẩn để nhận biết.' },
{ cd: 'Công nghệ di truyền', m: 2, a: true,  t: 'Enzyme cắt giới hạn cắt DNA tại trình tự nhận biết đặc hiệu còn enzyme ligase nối các đoạn DNA lại.', v: 'Cả gene cần chuyển và thể truyền đều được cắt bằng CÙNG một loại enzyme để đầu dính khớp nhau.' },
{ cd: 'Công nghệ di truyền', m: 2, a: false, t: 'Enzyme ligase có chức năng cắt phân tử DNA thành các đoạn nhỏ.', v: 'Ligase NỐI, còn enzyme cắt giới hạn mới cắt. Hai enzyme có chức năng ngược nhau.' },
{ cd: 'Công nghệ di truyền', m: 3, a: true,  t: 'Vi khuẩn E. coli được dùng phổ biến làm tế bào nhận vì sinh sản rất nhanh và dễ nuôi cấy.', v: 'Nhờ vậy sản xuất được insulin, hormone sinh trưởng và nhiều protein người với giá rẻ.' },
{ cd: 'Công nghệ di truyền', m: 3, a: true,  t: 'Nhân bản vô tính động vật bằng cách chuyển nhân tế bào sinh dưỡng vào trứng đã loại bỏ nhân.', v: 'Cừu Dolly là ví dụ nổi tiếng nhất; con sinh ra có kiểu gene nhân giống hệt cá thể cho nhân.' },
{ cd: 'Công nghệ di truyền', m: 3, a: true,  t: 'Cấy truyền phôi cho phép tạo nhiều cá thể có cùng kiểu gene từ một phôi ban đầu.', v: 'Ứng dụng để nhân nhanh giống vật nuôi quý.' },
{ cd: 'Công nghệ di truyền', m: 3, a: true,  t: 'Nuôi cấy mô tế bào thực vật tạo ra hàng loạt cây con đồng nhất về kiểu gene từ một mô ban đầu.', v: 'Dựa trên tính toàn năng của tế bào thực vật.' },
{ cd: 'Công nghệ di truyền', m: 3, a: true,  t: 'Dung hợp tế bào trần cho phép lai xa giữa hai loài mà lai hữu tính thông thường không thực hiện được.', v: 'Phải loại bỏ thành cellulose trước khi cho hai tế bào dung hợp.' },
{ cd: 'Công nghệ di truyền', m: 3, a: false, t: 'Sinh vật biến đổi gene luôn nhận thêm gene mới từ loài khác.', v: 'Có thể là làm bất hoạt một gene có sẵn hoặc tăng cường biểu hiện gene của chính loài đó, không nhất thiết nhận gene ngoại lai.' },
{ cd: 'Công nghệ di truyền', m: 4, a: true,  t: 'Ưu điểm của công nghệ gene là tạo được giống có đặc tính mong muốn trong thời gian ngắn hơn hẳn chọn giống truyền thống.', v: 'Chọn giống truyền thống phải qua nhiều thế hệ lai và chọn lọc.' },
{ cd: 'Công nghệ di truyền', m: 4, a: true,  t: 'Việc tạo và sử dụng sinh vật biến đổi gene đặt ra các vấn đề về an toàn sinh học và đạo đức sinh học.', v: 'Cần đánh giá tác động lên hệ sinh thái, lên sức khoẻ và tuân thủ quy định pháp lí.' },
{ cd: 'Công nghệ di truyền', m: 2, a: true,  t: 'Insulin dùng cho người bệnh tiểu đường hiện nay chủ yếu được sản xuất bằng vi khuẩn mang gene người.', v: 'Trước đây phải chiết từ tuỵ động vật, vừa đắt vừa dễ gây dị ứng.' },
{ cd: 'Công nghệ di truyền', m: 4, a: false, t: 'Cá thể nhân bản vô tính giống hệt cá thể cho nhân về mọi mặt.', v: 'Giống về kiểu gene NHÂN, nhưng gene ti thể đến từ trứng và kiểu hình còn chịu ảnh hưởng môi trường.' },
{ cd: 'Công nghệ di truyền', m: 3, a: true,  t: 'Kĩ thuật PCR cho phép nhân bản một đoạn DNA lên hàng triệu bản chỉ trong vài giờ.', v: 'Ứng dụng trong xét nghiệm bệnh, giám định gene và nghiên cứu.' },
{ cd: 'Công nghệ di truyền', m: 2, a: true,  t: 'Gây đột biến nhân tạo bằng tác nhân vật lí hoặc hoá học là phương pháp tạo giống có hiệu quả cao ở vi sinh vật và thực vật.', v: 'Ít dùng cho động vật vì dễ gây rối loạn sinh lí và tử vong.' }
]);

/* ===== SỬ, ĐỊA, GDKT ===== */
bu('su', [
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 1, a: true,  t: 'Sau năm 1975, nhân dân ta còn phải tiến hành hai cuộc chiến tranh bảo vệ Tổ quốc ở biên giới Tây Nam và biên giới phía Bắc.', v: 'Đó là sự tiếp nối của truyền thống giữ nước ngay sau khi vừa thống nhất đất nước.' },
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 2, a: true,  t: 'Cuộc chiến tranh bảo vệ biên giới Tây Nam diễn ra từ năm 1975 đến năm 1979 trước hành động xâm lấn của tập đoàn Pol Pot.', v: 'Quân tình nguyện Việt Nam sau đó giúp nhân dân Campuchia thoát khỏi hoạ diệt chủng.' },
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 2, a: true,  t: 'Cuộc chiến đấu bảo vệ biên giới phía Bắc bùng nổ tháng 2 năm 1979.', v: 'Quân dân các tỉnh biên giới đã chiến đấu kiên cường bảo vệ từng tấc đất Tổ quốc.' },
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 2, a: true,  t: 'Các cuộc chiến tranh bảo vệ Tổ quốc sau 1975 đều mang tính chất chính nghĩa, tự vệ.', v: 'Việt Nam buộc phải cầm súng để bảo vệ độc lập, chủ quyền và toàn vẹn lãnh thổ.' },
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 3, a: true,  t: 'Thắng lợi trong các cuộc chiến tranh bảo vệ Tổ quốc đã giữ vững độc lập chủ quyền và tạo điều kiện cho công cuộc Đổi mới sau này.', v: 'Ổn định biên giới là tiền đề để tập trung phát triển kinh tế.' },
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 3, a: true,  t: 'Bài học lớn nhất rút ra là phải luôn cảnh giác, xây dựng thế trận quốc phòng toàn dân gắn với phát triển kinh tế.', v: 'Không được lơ là nhiệm vụ bảo vệ Tổ quốc ngay cả trong thời bình.' },
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 3, a: false, t: 'Sau khi thống nhất năm 1975, đất nước ta bước vào thời kì hoà bình hoàn toàn, không còn phải chiến đấu bảo vệ biên giới.', v: 'Ngay sau 1975 ta đã phải tiến hành chiến tranh bảo vệ biên giới Tây Nam rồi biên giới phía Bắc.' },
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 3, a: true,  t: 'Trong lịch sử, các cuộc kháng chiến chống ngoại xâm của dân tộc đều dựa trên sức mạnh đoàn kết toàn dân và nghệ thuật lấy nhỏ đánh lớn.', v: 'Từ Bạch Đằng, Chi Lăng tới Điện Biên Phủ đều thể hiện truyền thống này.' },
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 4, a: true,  t: 'Ngày nay bảo vệ Tổ quốc không chỉ là bảo vệ lãnh thổ mà còn gồm bảo vệ chủ quyền biển đảo, an ninh mạng và an ninh kinh tế.', v: 'Khái niệm bảo vệ Tổ quốc đã mở rộng theo bối cảnh mới.' },
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 4, a: true,  t: 'Việt Nam kiên trì đường lối quốc phòng hoà bình, tự vệ và chủ trương không tham gia liên minh quân sự chống lại nước khác.', v: 'Đây là nội dung cốt lõi của chính sách quốc phòng "bốn không".' },
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 2, a: true,  t: 'Nghĩa vụ quân sự là trách nhiệm vẻ vang của công dân trong sự nghiệp bảo vệ Tổ quốc.', v: 'Gắn quyền lợi với nghĩa vụ, là biểu hiện cụ thể của lòng yêu nước trong thời bình.' },
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 3, a: true,  t: 'Chiến thắng biên giới Tây Nam mang ý nghĩa quốc tế vì đã góp phần cứu nhân dân Campuchia khỏi chế độ diệt chủng.', v: 'Đó là hành động nhân đạo được nhiều nước ghi nhận.' },
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 2, a: false, t: 'Việt Nam chủ động phát động các cuộc chiến tranh ở biên giới sau năm 1975.', v: 'Việt Nam ở thế BỊ TẤN CÔNG và buộc phải tự vệ. Đây là điểm mấu chốt về tính chất của các cuộc chiến này.' },
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 4, a: true,  t: 'Kết hợp sức mạnh dân tộc với sức mạnh thời đại là bài học xuyên suốt của lịch sử giữ nước Việt Nam.', v: 'Vừa dựa vào nội lực vừa tranh thủ sự ủng hộ của dư luận tiến bộ thế giới.' },
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 3, a: true,  t: 'Việc bình thường hoá quan hệ với các nước láng giềng sau các cuộc xung đột thể hiện chính sách đối ngoại hoà hiếu của Việt Nam.', v: 'Khép lại quá khứ, hướng tới tương lai là phương châm nhất quán.' },
{ cd: 'Chiến tranh bảo vệ Tổ quốc', m: 2, a: true,  t: 'Xây dựng nền quốc phòng toàn dân gắn với thế trận an ninh nhân dân là chủ trương lâu dài của Đảng và Nhà nước.', v: 'Mọi người dân đều là một phần của thế trận bảo vệ Tổ quốc.' }
]);

bu('dia', [
{ cd: 'Kinh tế biển đảo', m: 1, a: true,  t: 'Vùng biển nước ta rộng khoảng một triệu km², gấp khoảng ba lần diện tích đất liền.', v: 'Đường bờ biển dài 3260 km với 28 tỉnh, thành phố giáp biển.' },
{ cd: 'Kinh tế biển đảo', m: 2, a: true,  t: 'Các ngành kinh tế biển chủ yếu gồm khai thác và nuôi trồng thuỷ sản, khai thác dầu khí, du lịch biển đảo và giao thông vận tải biển.', v: 'Bốn ngành này được xác định là mũi nhọn trong chiến lược phát triển kinh tế biển.' },
{ cd: 'Kinh tế biển đảo', m: 2, a: true,  t: 'Dầu khí nước ta tập trung chủ yếu ở thềm lục địa phía Nam, thuộc các bể trầm tích Cửu Long và Nam Côn Sơn.', v: 'Các mỏ tiêu biểu là Bạch Hổ, Rồng, Đại Hùng.' },
{ cd: 'Kinh tế biển đảo', m: 2, a: true,  t: 'Du lịch biển đảo là thế mạnh nhờ có nhiều bãi biển đẹp và hai di sản thiên nhiên thế giới là vịnh Hạ Long và quần đảo Cát Bà.', v: 'Du lịch biển chiếm tỉ trọng lớn trong tổng lượt khách du lịch cả nước.' },
{ cd: 'Kinh tế biển đảo', m: 2, a: false, t: 'Nuôi trồng thuỷ sản nước ta hiện vẫn chiếm tỉ trọng nhỏ hơn khai thác.', v: 'Nuôi trồng đã VƯỢT khai thác về sản lượng và tiếp tục tăng nhanh hơn.' },
{ cd: 'Kinh tế biển đảo', m: 3, a: true,  t: 'Các đảo và quần đảo có vai trò vừa là cơ sở để khai thác biển vừa là căn cứ bảo vệ chủ quyền.', v: 'Hệ thống đảo tạo thành tuyến phòng thủ và là điểm tựa cho ngư dân bám biển.' },
{ cd: 'Kinh tế biển đảo', m: 3, a: true,  t: 'Phát triển tổng hợp kinh tế biển giúp khai thác hiệu quả hơn và hạn chế suy thoái tài nguyên so với phát triển riêng lẻ từng ngành.', v: 'Vì các ngành kinh tế biển có quan hệ chặt chẽ, phát triển một ngành hỗ trợ các ngành còn lại.' },
{ cd: 'Kinh tế biển đảo', m: 3, a: true,  t: 'Cảng nước sâu và các khu kinh tế ven biển là động lực thu hút đầu tư cho vùng duyên hải.', v: 'Ví dụ Dung Quất, Nghi Sơn, Vũng Áng gắn với công nghiệp lọc hoá dầu và luyện kim.' },
{ cd: 'Kinh tế biển đảo', m: 3, a: false, t: 'Khai thác thuỷ sản xa bờ kém hiệu quả hơn khai thác ven bờ nên cần hạn chế.', v: 'Ngược lại, phải đẩy mạnh khai thác XA BỜ để giảm áp lực lên nguồn lợi ven bờ vốn đã cạn kiệt, đồng thời khẳng định sự hiện diện trên biển.' },
{ cd: 'Kinh tế biển đảo', m: 4, a: true,  t: 'Thách thức lớn của kinh tế biển là ô nhiễm môi trường biển, suy giảm nguồn lợi thuỷ sản và tác động của biến đổi khí hậu.', v: 'Nước biển dâng và axit hoá đại dương ảnh hưởng trực tiếp tới nuôi trồng và hệ sinh thái rạn san hô.' },
{ cd: 'Kinh tế biển đảo', m: 4, a: true,  t: 'Phát triển kinh tế biển phải gắn chặt với bảo vệ chủ quyền và giữ gìn môi trường biển.', v: 'Đây là quan điểm xuyên suốt của Chiến lược phát triển bền vững kinh tế biển Việt Nam.' },
{ cd: 'Kinh tế biển đảo', m: 2, a: true,  t: 'Giao thông vận tải biển đảm nhận phần lớn khối lượng hàng hoá xuất nhập khẩu của nước ta.', v: 'Nhờ giá cước rẻ, khối lượng lớn và bờ biển dài với nhiều cảng.' },
{ cd: 'Kinh tế biển đảo', m: 3, a: true,  t: 'Nghề làm muối phát triển mạnh ở ven biển Nam Trung Bộ nhờ nắng nhiều, ít mưa và độ mặn nước biển cao.', v: 'Cà Ná và Sa Huỳnh là hai vùng muối nổi tiếng.' },
{ cd: 'Kinh tế biển đảo', m: 2, a: true,  t: 'Rừng ngập mặn ven biển vừa chắn sóng, chống xói lở vừa là nơi sinh sản của nhiều loài thuỷ sản.', v: 'Phá rừng ngập mặn để nuôi tôm là nguyên nhân làm tăng xói lở và giảm nguồn lợi.' },
{ cd: 'Kinh tế biển đảo', m: 4, a: true,  t: 'Điện gió ngoài khơi là hướng phát triển mới của kinh tế biển nhờ tiềm năng gió lớn ở vùng biển Nam Trung Bộ và Nam Bộ.', v: 'Góp phần chuyển dịch cơ cấu năng lượng theo hướng sạch và bền vững.' },
{ cd: 'Kinh tế biển đảo', m: 2, a: false, t: 'Toàn bộ 63 tỉnh, thành phố của nước ta đều giáp biển.', v: 'Chỉ có 28 tỉnh, thành phố giáp biển. Tây Nguyên là vùng duy nhất không có tỉnh nào giáp biển.' }
]);

bu('gdkt', [
{ cd: 'Lập kế hoạch kinh doanh', m: 1, a: true,  t: 'Kế hoạch kinh doanh là bản mô tả mục tiêu, chiến lược và các bước triển khai hoạt động kinh doanh.', v: 'Nó vừa là công cụ định hướng cho chủ doanh nghiệp vừa là cơ sở để thuyết phục nhà đầu tư.' },
{ cd: 'Lập kế hoạch kinh doanh', m: 2, a: true,  t: 'Một kế hoạch kinh doanh cơ bản gồm ý tưởng, mục tiêu, phân tích thị trường, kế hoạch tài chính và kế hoạch nhân sự.', v: 'Thiếu phần tài chính thì kế hoạch chỉ là mong muốn chứ không khả thi.' },
{ cd: 'Lập kế hoạch kinh doanh', m: 2, a: true,  t: 'Phân tích SWOT xem xét điểm mạnh, điểm yếu, cơ hội và thách thức của hoạt động kinh doanh.', v: 'Điểm mạnh và điểm yếu là yếu tố BÊN TRONG; cơ hội và thách thức là yếu tố BÊN NGOÀI.' },
{ cd: 'Lập kế hoạch kinh doanh', m: 2, a: false, t: 'Trong phân tích SWOT, cơ hội và thách thức là các yếu tố thuộc nội bộ doanh nghiệp.', v: 'Cơ hội và thách thức đến từ MÔI TRƯỜNG BÊN NGOÀI như thị trường, chính sách, đối thủ.' },
{ cd: 'Lập kế hoạch kinh doanh', m: 3, a: true,  t: 'Mục tiêu kinh doanh tốt phải cụ thể, đo lường được, khả thi, phù hợp và có thời hạn rõ ràng.', v: 'Đây chính là nguyên tắc SMART.' },
{ cd: 'Lập kế hoạch kinh doanh', m: 3, a: true,  t: 'Nghiên cứu thị trường giúp xác định khách hàng mục tiêu, nhu cầu của họ và mức độ cạnh tranh.', v: 'Bỏ qua bước này là nguyên nhân thất bại phổ biến nhất của người mới khởi nghiệp.' },
{ cd: 'Lập kế hoạch kinh doanh', m: 3, a: true,  t: 'Kế hoạch tài chính phải dự tính được vốn đầu tư ban đầu, chi phí vận hành, doanh thu dự kiến và điểm hoà vốn.', v: 'Điểm hoà vốn là mức doanh thu mà tại đó tổng doanh thu bằng tổng chi phí.' },
{ cd: 'Lập kế hoạch kinh doanh', m: 3, a: false, t: 'Kế hoạch kinh doanh một khi đã lập thì không nên thay đổi để giữ tính nhất quán.', v: 'Kế hoạch phải được rà soát và điều chỉnh theo biến động thị trường; cứng nhắc là rủi ro.' },
{ cd: 'Lập kế hoạch kinh doanh', m: 4, a: true,  t: 'Ý tưởng kinh doanh tốt thường xuất phát từ một nhu cầu chưa được đáp ứng hoặc một vấn đề chưa được giải quyết tốt.', v: 'Không phải cứ mới lạ là tốt; phải có người sẵn sàng trả tiền cho giải pháp đó.' },
{ cd: 'Lập kế hoạch kinh doanh', m: 4, a: true,  t: 'Người kinh doanh cần các năng lực cốt lõi: nắm bắt cơ hội, quản lí tài chính, giao tiếp và chấp nhận rủi ro có tính toán.', v: 'Chấp nhận rủi ro khác hẳn liều lĩnh: phải dựa trên đánh giá và có phương án dự phòng.' },
{ cd: 'Lập kế hoạch kinh doanh', m: 2, a: true,  t: 'Khách hàng mục tiêu là nhóm khách hàng mà doanh nghiệp tập trung phục vụ.', v: 'Cố phục vụ tất cả mọi người thường dẫn tới không phục vụ tốt cho ai.' },
{ cd: 'Lập kế hoạch kinh doanh', m: 3, a: true,  t: 'Lợi thế cạnh tranh là điều doanh nghiệp làm tốt hơn hoặc khác biệt so với đối thủ.', v: 'Có thể đến từ giá, chất lượng, dịch vụ, công nghệ hoặc thương hiệu.' },
{ cd: 'Lập kế hoạch kinh doanh', m: 4, a: false, t: 'Chỉ cần sản phẩm tốt là hoạt động kinh doanh sẽ thành công.', v: 'Sản phẩm tốt là điều kiện cần. Còn phải có kênh phân phối, giá phù hợp và cách tiếp cận đúng khách hàng.' },
{ cd: 'Lập kế hoạch kinh doanh', m: 2, a: true,  t: 'Vốn kinh doanh có thể huy động từ vốn tự có, vay ngân hàng, gọi vốn từ nhà đầu tư hoặc huy động cộng đồng.', v: 'Mỗi nguồn có chi phí và ràng buộc khác nhau, cần cân nhắc theo giai đoạn phát triển.' },
{ cd: 'Lập kế hoạch kinh doanh', m: 3, a: true,  t: 'Rủi ro trong kinh doanh cần được nhận diện và có phương án ứng phó ngay trong kế hoạch.', v: 'Rủi ro thị trường, rủi ro tài chính, rủi ro pháp lí và rủi ro vận hành là bốn nhóm cơ bản.' },
{ cd: 'Lập kế hoạch kinh doanh', m: 2, a: false, t: 'Doanh thu càng cao thì lợi nhuận chắc chắn càng lớn.', v: 'Lợi nhuận bằng doanh thu trừ chi phí. Doanh thu tăng mà chi phí tăng nhanh hơn thì lợi nhuận vẫn giảm.' },

{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 1, a: true,  t: 'Trách nhiệm xã hội của doanh nghiệp là cam kết đóng góp vào sự phát triển bền vững của cộng đồng và xã hội.', v: 'Không chỉ là làm từ thiện mà là cách doanh nghiệp vận hành hằng ngày.' },
{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 2, a: true,  t: 'Trách nhiệm xã hội gồm bốn cấp độ: kinh tế, pháp lí, đạo đức và nhân văn.', v: 'Trách nhiệm kinh tế là nền tảng vì doanh nghiệp phải tồn tại được mới thực hiện được các trách nhiệm còn lại.' },
{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 2, a: true,  t: 'Trách nhiệm pháp lí đòi hỏi doanh nghiệp tuân thủ pháp luật về thuế, lao động, môi trường và cạnh tranh.', v: 'Đây là mức tối thiểu bắt buộc, không phải sự lựa chọn.' },
{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 2, a: false, t: 'Trách nhiệm xã hội của doanh nghiệp chỉ là hoạt động từ thiện và tài trợ.', v: 'Từ thiện chỉ là một phần ở cấp độ nhân văn. Trả lương đúng hạn, nộp thuế đầy đủ, không xả thải trái phép mới là phần cốt lõi.' },
{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 3, a: true,  t: 'Thực hiện tốt trách nhiệm xã hội giúp doanh nghiệp nâng cao uy tín thương hiệu và giữ chân người lao động.', v: 'Lợi ích dài hạn thường lớn hơn chi phí ngắn hạn bỏ ra.' },
{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 3, a: true,  t: 'Doanh nghiệp có trách nhiệm bảo đảm an toàn lao động và điều kiện làm việc cho người lao động.', v: 'Đây vừa là trách nhiệm pháp lí vừa là trách nhiệm đạo đức.' },
{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 3, a: true,  t: 'Doanh nghiệp phải xử lí chất thải đạt chuẩn trước khi thải ra môi trường.', v: 'Xả thải trái phép có thể bị xử phạt hành chính, buộc bồi thường và trong trường hợp nghiêm trọng bị truy cứu hình sự.' },
{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 3, a: false, t: 'Doanh nghiệp chỉ cần chịu trách nhiệm với cổ đông, không cần quan tâm tới cộng đồng.', v: 'Doanh nghiệp có nhiều bên liên quan: cổ đông, người lao động, khách hàng, nhà cung cấp, cộng đồng và Nhà nước.' },
{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 4, a: true,  t: 'Trách nhiệm xã hội và lợi nhuận không đối lập mà có thể hỗ trợ nhau trong dài hạn.', v: 'Doanh nghiệp có uy tín thu hút được khách hàng, nhân sự giỏi và vốn đầu tư rẻ hơn.' },
{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 4, a: true,  t: 'Trung thực trong quảng cáo và bảo vệ quyền lợi người tiêu dùng là biểu hiện của trách nhiệm đạo đức.', v: 'Quảng cáo sai sự thật vừa vi phạm pháp luật vừa huỷ hoại niềm tin lâu dài.' },
{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 2, a: true,  t: 'Nộp thuế đầy đủ và đúng hạn là trách nhiệm pháp lí cơ bản nhất của doanh nghiệp với Nhà nước.', v: 'Thuế là nguồn thu để Nhà nước chi cho giáo dục, y tế, hạ tầng và an sinh xã hội.' },
{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 3, a: true,  t: 'Doanh nghiệp cần tôn trọng quyền lợi của người lao động về tiền lương, thời giờ làm việc và bảo hiểm.', v: 'Ép tăng ca quá quy định hoặc trốn đóng bảo hiểm là vi phạm pháp luật lao động.' },
{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 4, a: false, t: 'Doanh nghiệp nhỏ thì không cần thực hiện trách nhiệm xã hội.', v: 'Trách nhiệm xã hội áp dụng cho mọi quy mô; chỉ khác nhau ở mức độ và hình thức thực hiện.' },
{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 2, a: true,  t: 'Cạnh tranh lành mạnh là một biểu hiện của trách nhiệm xã hội trong hoạt động kinh doanh.', v: 'Cạnh tranh không lành mạnh như bán phá giá, nói xấu đối thủ đều bị pháp luật cấm.' },
{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 3, a: true,  t: 'Sản xuất xanh và tiết kiệm năng lượng vừa giảm chi phí vừa thể hiện trách nhiệm với môi trường.', v: 'Đây là ví dụ rõ nhất cho việc trách nhiệm xã hội và lợi ích kinh tế đi cùng nhau.' },
{ cd: 'Trách nhiệm xã hội của doanh nghiệp', m: 2, a: false, t: 'Doanh nghiệp thực hiện trách nhiệm xã hội thì được miễn hoàn toàn nghĩa vụ thuế.', v: 'Không có quy định nào như vậy. Nộp thuế là nghĩa vụ pháp lí độc lập.' }
]);

})();
