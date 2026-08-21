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

})();
