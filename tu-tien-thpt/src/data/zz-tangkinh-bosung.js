/* ============================================================
   TÀNG KINH CÁC — BỔ SUNG KIẾN THỨC THEO TỪNG CHUYÊN ĐỀ
   Mỗi chuyên đề trước đây chỉ có một thẻ tổng hợp, không đủ để học sâu.
   Các thẻ dưới đây khai rõ `cd` để gắn đúng chuyên đề.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

(function () {
const them = (khoa, ds) => { TD.KHO[khoa] = (TD.KHO[khoa] || []).concat(ds); };

/* ---------------- LỊCH SỬ ---------------- */
them('su_ct', [
{ nhom: 'A. Thế giới', cd: 'Liên hợp quốc', ten: 'Liên hợp quốc — cơ cấu và nguyên tắc', cap: 2,
  ct: '<b>Thành lập:</b> 24/10/1945, trụ sở New York. Hiện có 193 thành viên; Việt Nam gia nhập năm <b>1977</b>.<br>'
    + '<b>Sáu cơ quan chính:</b> Đại hội đồng · Hội đồng Bảo an · Hội đồng Kinh tế – Xã hội · Hội đồng Quản thác · '
    + 'Toà án Quốc tế · Ban Thư kí.<br>'
    + '<b>Hội đồng Bảo an</b> giữ vai trò quan trọng nhất về hoà bình và an ninh; 5 uỷ viên thường trực '
    + '(Nga, Mỹ, Anh, Pháp, Trung Quốc) có <b>quyền phủ quyết</b>.<br>'
    + '<b>Năm nguyên tắc:</b> bình đẳng chủ quyền · tôn trọng toàn vẹn lãnh thổ và độc lập chính trị · '
    + 'không can thiệp nội bộ · giải quyết tranh chấp bằng biện pháp hoà bình · chung sống hoà bình và nhất trí '
    + 'giữa năm nước lớn.',
  khi: 'Câu hỏi về vai trò, cơ cấu, nguyên tắc hoạt động và đóng góp của Việt Nam.',
  vd: 'Việt Nam hai lần làm Uỷ viên không thường trực Hội đồng Bảo an: nhiệm kì 2008–2009 và 2020–2021.',
  bay: 'Nguyên tắc "nhất trí giữa năm nước lớn" chính là cơ chế phủ quyết — vừa giữ được sự đồng thuận '
     + 'vừa khiến Hội đồng Bảo an dễ bị bế tắc. Đề hay hỏi mặt trái này.' },

{ nhom: 'A. Thế giới', cd: 'ASEAN', ten: 'ASEAN — quá trình mở rộng và ba trụ cột', cap: 2,
  ct: '<b>Ra đời 8/8/1967</b> tại Bangkok với 5 nước: Indonesia, Malaysia, Philippines, Singapore, Thái Lan.<br>'
    + '<b>Mở rộng:</b> Brunei 1984 · <b>Việt Nam 1995</b> · Lào và Myanmar 1997 · Campuchia 1999 ⇒ đủ 10 nước.<br>'
    + '<b>Cộng đồng ASEAN</b> hình thành 31/12/2015 với ba trụ cột: Chính trị – An ninh · Kinh tế · Văn hoá – Xã hội.<br>'
    + '<b>Nguyên tắc nền tảng</b> (Hiệp ước Bali 1976): tôn trọng độc lập chủ quyền · không can thiệp nội bộ · '
    + 'giải quyết tranh chấp bằng hoà bình · hợp tác cùng phát triển · <b>đồng thuận</b>.',
  khi: 'Câu về quá trình phát triển, nguyên tắc và ý nghĩa việc Việt Nam gia nhập.',
  vd: 'Gia nhập ASEAN năm 1995 giúp Việt Nam phá thế bao vây cấm vận, mở đầu thời kì hội nhập khu vực.',
  bay: 'Nguyên tắc ĐỒNG THUẬN vừa bảo vệ nước nhỏ vừa khiến ASEAN khó ra quyết định mạnh trong vấn đề Biển Đông — '
     + 'đây là điểm đánh giá mức vận dụng cao.' },

{ nhom: 'A. Thế giới', cd: 'Chiến tranh lạnh', ten: 'Chiến tranh lạnh — bốn giai đoạn và hệ quả', cap: 3,
  ct: '<b>1947</b> Học thuyết Truman mở đầu → <b>1949</b> NATO, <b>1955</b> Vacsava: hai khối đối đầu.<br>'
    + '<b>Đối đầu căng thẳng</b> qua các cuộc chiến tranh cục bộ (Triều Tiên, Việt Nam, Trung Đông) nhưng hai siêu '
    + 'cường KHÔNG trực tiếp giao chiến.<br>'
    + '<b>Hoà hoãn từ đầu thập niên 1970:</b> Hiệp ước ABM, SALT-1 (1972), Định ước Helsinki (1975).<br>'
    + '<b>1989</b> tuyên bố chấm dứt tại cuộc gặp Manta → <b>1991</b> Liên Xô tan rã, trật tự hai cực sụp đổ.<br>'
    + '<b>Hệ quả:</b> thế giới chuyển sang xu thế đa cực, lấy phát triển kinh tế làm trọng tâm.',
  khi: 'Câu về nguyên nhân, biểu hiện, tác động của Chiến tranh lạnh tới Việt Nam.',
  vd: 'Chiến tranh lạnh khiến Việt Nam trở thành nơi đụng độ gián tiếp giữa hai phe, đồng thời là lí do ta nhận '
    + 'được sự giúp đỡ của Liên Xô và Trung Quốc.',
  bay: 'Ba mốc phải tách bạch: 1947 MỞ ĐẦU · 1989 CHẤM DỨT Chiến tranh lạnh · 1991 SỤP ĐỔ trật tự hai cực.' },

{ nhom: 'B. Việt Nam', cd: 'Cách mạng tháng Tám', ten: 'Cách mạng tháng Tám — thời cơ và bài học', cap: 3,
  ct: '<b>Chuẩn bị:</b> 1930 Đảng ra đời → 1941 Mặt trận Việt Minh → 1944 Đội Việt Nam Tuyên truyền Giải phóng quân.<br>'
    + '<b>Thời cơ "ngàn năm có một":</b> Nhật đầu hàng Đồng minh (15/8/1945), quân Nhật ở Đông Dương hoang mang, '
    + 'quân Đồng minh chưa vào — khoảng trống quyền lực.<br>'
    + '<b>Diễn biến:</b> 14–18/8 khởi nghĩa từng phần · 19/8 Hà Nội · 23/8 Huế · 25/8 Sài Gòn · '
    + '2/9/1945 Tuyên ngôn Độc lập.<br>'
    + '<b>Ý nghĩa:</b> phá tan xiềng xích Pháp – Nhật – phong kiến, mở ra <b>kỉ nguyên độc lập, tự do</b>, '
    + 'nhân dân làm chủ đất nước.',
  khi: 'Câu về thời cơ, nguyên nhân thắng lợi, bài học kinh nghiệm.',
  vd: 'Bài học lớn nhất: kết hợp sức mạnh đại đoàn kết dân tộc với việc CHỚP ĐÚNG thời cơ — thời cơ chỉ tồn tại '
    + 'khoảng nửa tháng.',
  bay: 'Thời cơ là điều kiện KHÁCH QUAN; sự chuẩn bị suốt 15 năm của Đảng mới là nhân tố CHỦ QUAN quyết định. '
     + 'Đề hay hỏi "nguyên nhân quyết định" — đáp án luôn là nhân tố chủ quan.' },

{ nhom: 'B. Việt Nam', cd: 'Kháng chiến chống Pháp', ten: 'Kháng chiến chống Pháp — các mốc chiến dịch', cap: 2,
  ct: '<b>19/12/1946</b> Toàn quốc kháng chiến, đường lối: toàn dân, toàn diện, trường kì, tự lực cánh sinh.<br>'
    + '<b>Việt Bắc thu – đông 1947:</b> làm phá sản chiến lược "đánh nhanh thắng nhanh".<br>'
    + '<b>Biên giới thu – đông 1950:</b> khai thông biên giới, ta giành thế CHỦ ĐỘNG trên chiến trường chính Bắc Bộ.<br>'
    + '<b>Điện Biên Phủ 7/5/1954:</b> đập tan tập đoàn cứ điểm mạnh nhất, quyết định thắng lợi trên bàn đàm phán.<br>'
    + '<b>Hiệp định Genève 21/7/1954:</b> Pháp công nhận độc lập, chủ quyền của ba nước Đông Dương; '
    + 'lấy vĩ tuyến 17 làm giới tuyến quân sự TẠM THỜI.',
  khi: 'Câu sắp xếp trình tự chiến dịch và ý nghĩa từng mốc.',
  vd: 'Chiến dịch Biên giới 1950 là lần đầu ta CHỦ ĐỘNG mở chiến dịch tiến công quy mô lớn.',
  bay: 'Vĩ tuyến 17 là giới tuyến quân sự TẠM THỜI, không phải ranh giới chính trị hay biên giới quốc gia — '
     + 'đây là câu chữ đề rất hay gài.' },

{ nhom: 'B. Việt Nam', cd: 'Kháng chiến chống Mỹ', ten: 'Bốn chiến lược chiến tranh của Mỹ', cap: 3,
  ct: '<b>Chiến tranh đơn phương (1954–1960):</b> dùng chính quyền Sài Gòn, ta đáp lại bằng phong trào Đồng khởi.<br>'
    + '<b>Chiến tranh đặc biệt (1961–1965):</b> quân đội Sài Gòn + cố vấn Mỹ + vũ khí Mỹ, gom dân lập ấp chiến lược.<br>'
    + '<b>Chiến tranh cục bộ (1965–1968):</b> <b>quân viễn chinh Mỹ trực tiếp tham chiến</b>; ta đáp lại bằng '
    + 'Tổng tiến công Xuân Mậu Thân 1968.<br>'
    + '<b>Việt Nam hoá chiến tranh (1969–1973):</b> rút dần quân Mỹ, "dùng người Việt đánh người Việt"; '
    + 'ta đáp lại bằng cuộc tiến công 1972 và "Điện Biên Phủ trên không".<br>'
    + '<b>27/1/1973</b> Hiệp định Paris → <b>30/4/1975</b> Đại thắng mùa Xuân.',
  khi: 'Câu so sánh các chiến lược — dạng phân loại điểm cao của đề Sử.',
  vd: 'Điểm khác biệt CĂN BẢN giữa Chiến tranh cục bộ và Chiến tranh đặc biệt: quân viễn chinh Mỹ trực tiếp tham chiến.',
  bay: 'Cả bốn chiến lược đều là chiến tranh xâm lược thực dân kiểu mới; khác nhau ở LỰC LƯỢNG chủ yếu và QUY MÔ, '
     + 'không khác nhau về bản chất.' },

{ nhom: 'B. Việt Nam', cd: 'Công cuộc Đổi mới', ten: 'Đổi mới — nội dung và thành tựu', cap: 3,
  ct: '<b>Đại hội VI (12/1986)</b> khởi xướng: đổi mới toàn diện, đồng bộ, <b>trọng tâm là kinh tế</b>, '
    + 'giữ vững định hướng xã hội chủ nghĩa.<br>'
    + '<b>Kinh tế:</b> xoá bỏ cơ chế tập trung quan liêu bao cấp → kinh tế thị trường định hướng XHCN, '
    + 'nhiều thành phần; mở cửa thu hút đầu tư.<br>'
    + '<b>Thành tựu:</b> từ nước thiếu lương thực thành nước xuất khẩu gạo hàng đầu; thoát khỏi nhóm nước '
    + 'thu nhập thấp; hội nhập sâu (ASEAN 1995, APEC 1998, WTO 2007).<br>'
    + '<b>Đối ngoại:</b> đa phương hoá, đa dạng hoá; "là bạn, là đối tác tin cậy" của cộng đồng quốc tế.',
  khi: 'Câu về nội dung, thành tựu và bài học của Đổi mới.',
  vd: 'Đổi mới không phải là thay đổi MỤC TIÊU mà là tìm hình thức và bước đi phù hợp để đạt mục tiêu đó.',
  bay: 'Đổi mới bắt đầu từ KINH TẾ chứ không phải chính trị — đây là điểm khác biệt căn bản so với cải tổ ở Liên Xô, '
     + 'và cũng là lí do Việt Nam giữ được ổn định.' },

{ nhom: 'B. Việt Nam', cd: 'Hồ Chí Minh', ten: 'Hồ Chí Minh — hành trình và cống hiến', cap: 2,
  ct: '<b>1911</b> ra đi tìm đường cứu nước · <b>1920</b> đọc Luận cương của Lênin, bỏ phiếu tán thành Quốc tế Cộng sản '
    + '— chuyển từ chủ nghĩa yêu nước sang chủ nghĩa cộng sản.<br>'
    + '<b>1925</b> lập Hội Việt Nam Cách mạng Thanh niên · <b>1930</b> chủ trì hợp nhất ba tổ chức cộng sản, '
    + 'sáng lập Đảng và soạn Cương lĩnh chính trị đầu tiên.<br>'
    + '<b>1941</b> về nước, chủ trì Hội nghị Trung ương 8, lập Mặt trận Việt Minh, đặt nhiệm vụ giải phóng dân tộc lên hàng đầu.<br>'
    + '<b>2/9/1945</b> đọc Tuyên ngôn Độc lập · <b>1969</b> qua đời, để lại bản Di chúc.',
  khi: 'Câu về vai trò của Hồ Chí Minh trong từng giai đoạn lịch sử.',
  vd: 'Cống hiến lớn nhất về lí luận: tìm ra con đường cứu nước theo khuynh hướng vô sản, gắn độc lập dân tộc với chủ nghĩa xã hội.',
  bay: 'Phân biệt hai mốc 1920 (tìm THẤY con đường) và 1930 (sáng lập Đảng). Nhiều bạn gộp làm một.' },

{ nhom: 'B. Việt Nam', cd: 'Biển Đông', ten: 'Chủ quyền biển đảo — cơ sở pháp lí và lịch sử', cap: 3,
  ct: '<b>Cơ sở lịch sử:</b> Nhà nước phong kiến Việt Nam đã xác lập và thực thi chủ quyền liên tục, hoà bình '
    + 'đối với Hoàng Sa và Trường Sa từ thế kỉ XVII (đội Hoàng Sa, đội Bắc Hải thời chúa Nguyễn).<br>'
    + '<b>Cơ sở pháp lí:</b> Công ước Luật Biển 1982 (UNCLOS) — Việt Nam phê chuẩn năm 1994; '
    + 'Luật Biển Việt Nam 2012.<br>'
    + '<b>Các vùng biển:</b> nội thuỷ · lãnh hải 12 hải lí (chủ quyền đầy đủ) · vùng tiếp giáp 12 hải lí tiếp theo · '
    + '<b>vùng đặc quyền kinh tế 200 hải lí</b> (quyền chủ quyền về kinh tế) · thềm lục địa.<br>'
    + '<b>Chủ trương:</b> giải quyết tranh chấp bằng biện pháp HOÀ BÌNH trên cơ sở luật pháp quốc tế.',
  khi: 'Câu về chủ quyền biển đảo và cách ứng xử của Việt Nam.',
  vd: 'Phán quyết của Toà Trọng tài năm 2016 bác bỏ yêu sách "đường chín đoạn" vì không có cơ sở pháp lí theo UNCLOS.',
  bay: 'Phân biệt CHỦ QUYỀN (lãnh hải — đầy đủ như trên đất liền) với QUYỀN CHỦ QUYỀN (vùng đặc quyền kinh tế — '
     + 'chỉ về thăm dò, khai thác tài nguyên; nước khác vẫn được tự do hàng hải, hàng không).' }
]);

/* ---------------- ĐỊA LÍ ---------------- */
them('dia_ct', [
{ nhom: 'A. Tự nhiên', cd: 'Vị trí địa lí', ten: 'Vị trí, giới hạn và ý nghĩa', cap: 2,
  ct: '<b>Hệ toạ độ đất liền:</b> Bắc 23°23′B (Lũng Cú, Hà Giang) · Nam 8°34′B (Đất Mũi, Cà Mau) · '
    + 'Tây 102°09′Đ (Sín Thầu, Điện Biên) · Đông 109°24′Đ (Vạn Thạnh, Khánh Hoà).<br>'
    + '<b>Nằm hoàn toàn trong vùng nội chí tuyến</b> bán cầu Bắc, trong khu vực gió mùa châu Á, tiếp giáp Biển Đông.<br>'
    + '<b>Ý nghĩa tự nhiên:</b> quy định tính chất nhiệt đới ẩm gió mùa; tài nguyên sinh vật, khoáng sản phong phú; '
    + 'thiên nhiên phân hoá đa dạng; nhiều thiên tai.<br>'
    + '<b>Ý nghĩa kinh tế – xã hội:</b> nằm trên ngã tư đường hàng hải và hàng không quốc tế, thuận lợi giao lưu '
    + 'và phát triển kinh tế biển; đồng thời đặt ra yêu cầu cao về quốc phòng an ninh.',
  khi: 'Câu về đặc điểm vị trí và hệ quả của nó — thường mở đầu đề Địa.',
  vd: 'Nhờ tiếp giáp Biển Đông mà thiên nhiên nước ta khác hẳn các nước cùng vĩ độ ở Tây Nam Á và Bắc Phi vốn khô hạn.',
  bay: 'Lãnh thổ gồm cả vùng ĐẤT, vùng BIỂN và vùng TRỜI. Vùng biển rộng khoảng 1 triệu km², gấp ba lần diện tích đất liền.' },

{ nhom: 'A. Tự nhiên', cd: 'Phân hoá thiên nhiên', ten: 'Ba chiều phân hoá và ba đai cao', cap: 3,
  ct: '<b>Bắc – Nam:</b> ranh giới dãy Bạch Mã. Miền Bắc có mùa đông lạnh, biên độ nhiệt năm lớn; '
    + 'miền Nam nóng quanh năm, hai mùa mưa – khô rõ rệt.<br>'
    + '<b>Đông – Tây:</b> vùng biển và thềm lục địa → đồng bằng ven biển → đồi núi; do ảnh hưởng của biển '
    + 'giảm dần và địa hình chắn gió.<br>'
    + '<b>Theo độ cao — ba đai:</b><br>'
    + '· Nhiệt đới gió mùa: dưới 600–700 m (miền Bắc), dưới 900–1000 m (miền Nam)<br>'
    + '· Cận nhiệt đới gió mùa trên núi: tới 2600 m<br>'
    + '· <b>Ôn đới gió mùa trên núi: từ 2600 m trở lên, chỉ có ở Hoàng Liên Sơn</b>',
  khi: 'Câu về sự phân hoá thiên nhiên và nguyên nhân.',
  vd: 'Ranh giới đai nhiệt đới ở miền Bắc thấp hơn miền Nam 300–400 m vì miền Bắc có nền nhiệt thấp hơn do mùa đông lạnh.',
  bay: 'Đai ôn đới là đai HẸP NHẤT và DUY NHẤT chỉ có ở một dãy núi. Nói "nước ta có đai ôn đới ở nhiều vùng núi cao" là sai.' },

{ nhom: 'A. Tự nhiên', cd: 'Khí hậu', ten: 'Thiên nhiên nhiệt đới ẩm gió mùa — biểu hiện', cap: 2,
  ct: '<b>Khí hậu:</b> nhiệt độ trung bình năm trên 20 °C, tổng bức xạ lớn; lượng mưa 1500–2000 mm, độ ẩm trên 80%.<br>'
    + '<b>Địa hình:</b> xâm thực mạnh ở đồi núi (đất trượt, đá lở, địa hình cacxtơ) và bồi tụ nhanh ở đồng bằng hạ lưu.<br>'
    + '<b>Sông ngòi:</b> mạng lưới dày đặc, nhiều nước, giàu phù sa, chế độ nước theo mùa.<br>'
    + '<b>Đất:</b> quá trình feralit là quá trình hình thành đất chủ yếu ở vùng đồi núi thấp.<br>'
    + '<b>Sinh vật:</b> hệ sinh thái rừng nhiệt đới ẩm lá rộng thường xanh là cảnh quan tiêu biểu.',
  khi: 'Câu về biểu hiện của thiên nhiên nhiệt đới ẩm gió mùa qua các thành phần tự nhiên.',
  vd: 'Đất feralit chiếm phần lớn diện tích đồi núi thấp — hệ quả trực tiếp của khí hậu nóng ẩm mưa nhiều.',
  bay: 'Tính chất nhiệt đới ẩm gió mùa biểu hiện qua TẤT CẢ các thành phần tự nhiên, không chỉ riêng khí hậu. '
     + 'Đề hay hỏi biểu hiện ở địa hình, sông ngòi hay đất.' },

{ nhom: 'A. Tự nhiên', cd: 'Dân cư', ten: 'Đặc điểm dân cư và nguồn lao động', cap: 2,
  ct: '<b>Quy mô lớn, tăng còn nhanh về số tuyệt đối</b> dù tỉ lệ gia tăng đã giảm.<br>'
    + '<b>Cơ cấu:</b> đang trong thời kì cơ cấu dân số VÀNG nhưng đồng thời đã bước vào giai đoạn GIÀ HOÁ.<br>'
    + '<b>Phân bố không đều:</b> tập trung ở đồng bằng và đô thị, thưa ở miền núi; chênh lệch lớn giữa '
    + 'Đồng bằng sông Hồng và Tây Nguyên.<br>'
    + '<b>Lao động:</b> dồi dào, cần cù, tiếp thu nhanh nhưng tỉ lệ qua đào tạo còn thấp; '
    + 'năng suất lao động chưa cao.<br>'
    + '<b>Đô thị hoá:</b> tỉ lệ dân thành thị khoảng 38–40%, diễn ra chưa tương xứng với công nghiệp hoá.',
  khi: 'Câu về dân số, lao động, đô thị hoá và các vấn đề đặt ra.',
  vd: 'Cơ cấu dân số vàng là cơ hội nhưng chỉ kéo dài vài thập niên — phải tận dụng bằng đào tạo và tạo việc làm.',
  bay: 'Tỉ lệ gia tăng GIẢM nhưng số dân tăng thêm mỗi năm vẫn LỚN, vì quy mô dân số nền đã rất cao.' },

{ nhom: 'B. Kinh tế', cd: 'Vùng kinh tế', ten: 'Bảy vùng — thế mạnh và hạn chế đối chiếu', cap: 3,
  ct: '<b>Trung du – miền núi Bắc Bộ:</b> khoáng sản, thuỷ điện, cây cận nhiệt · thiếu lao động kĩ thuật, giao thông khó.<br>'
    + '<b>Đồng bằng sông Hồng:</b> lao động dồi dào, hạ tầng tốt · đất chật người đông, thiên tai.<br>'
    + '<b>Bắc Trung Bộ:</b> rừng, khoáng sản, cảng biển · nhiều thiên tai, gió phơn khô nóng.<br>'
    + '<b>Duyên hải Nam Trung Bộ:</b> nghề cá, du lịch biển, cảng nước sâu · khô hạn nhất cả nước.<br>'
    + '<b>Tây Nguyên:</b> đất badan, cây công nghiệp lâu năm, thuỷ điện · mùa khô sâu sắc, thiếu lao động.<br>'
    + '<b>Đông Nam Bộ:</b> dầu khí, công nghiệp, thu hút FDI dẫn đầu · thiếu nước mùa khô, ô nhiễm.<br>'
    + '<b>Đồng bằng sông Cửu Long:</b> lúa, thuỷ sản, cây ăn quả · xâm nhập mặn, thiếu nước ngọt.',
  khi: 'Câu về thế mạnh, hạn chế và hướng phát triển của từng vùng.',
  vd: 'Câu hỏi "vùng nào có thế mạnh về…" giải được ngay nếu nhớ cặp THẾ MẠNH – HẠN CHẾ của bảy vùng.',
  bay: 'Tây Nguyên là vùng DUY NHẤT không giáp biển. Đề hay gán nhầm thế mạnh thuỷ sản cho vùng này.' },

{ nhom: 'B. Kinh tế', cd: 'Ngành kinh tế', ten: 'Các ngành kinh tế trọng điểm', cap: 2,
  ct: '<b>Nông nghiệp:</b> lúa là cây lương thực chính (Đồng bằng sông Cửu Long dẫn đầu); cây công nghiệp lâu năm '
    + 'tập trung ở Tây Nguyên và Đông Nam Bộ; chăn nuôi tăng tỉ trọng nhưng chưa vượt trồng trọt.<br>'
    + '<b>Thuỷ sản:</b> nuôi trồng tăng nhanh hơn khai thác; Đồng bằng sông Cửu Long dẫn đầu cả hai.<br>'
    + '<b>Công nghiệp:</b> năng lượng (than Quảng Ninh, dầu khí thềm lục địa phía Nam, thuỷ điện, điện gió – mặt trời); '
    + 'chế biến lương thực thực phẩm; dệt may, da giày.<br>'
    + '<b>Dịch vụ:</b> giao thông đường biển giữ vai trò quan trọng nhất với hàng xuất nhập khẩu; du lịch biển đảo '
    + 'và du lịch di sản là hai hướng mũi nhọn.',
  khi: 'Câu về phân bố, cơ cấu và xu hướng chuyển dịch của các ngành.',
  vd: 'Hướng chuyển dịch trọng tâm hiện nay: đẩy mạnh CHẾ BIẾN SÂU để tăng giá trị gia tăng, giảm xuất khẩu thô.',
  bay: 'Chăn nuôi TĂNG tỉ trọng nhưng vẫn CHƯA vượt trồng trọt; nuôi trồng thuỷ sản đã VƯỢT khai thác. '
     + 'Hai kết luận này ngược nhau nên rất dễ nhớ nhầm.' },

{ nhom: 'C. Kỹ năng', cd: 'Kỹ năng', ten: 'Khai thác Atlat Địa lí Việt Nam', cap: 2,
  ct: '<b>Bước 1 — đọc trang 3 (kí hiệu chung) TRƯỚC.</b> Nắm được bảng chú giải là đọc được mọi trang chuyên đề.<br>'
    + '<b>Các trang hay dùng:</b> 4–5 hành chính · 6–7 hình thể · 9 khí hậu · 10 sông ngòi · 11 đất · '
    + '12 thực vật động vật · 15 dân số · 17 kinh tế chung · 18 nông nghiệp chung · 21 công nghiệp chung · '
    + '23 giao thông · 25 du lịch · 26–30 các vùng.<br>'
    + '<b>Mẹo đọc:</b> câu hỏi có từ khoá gì thì tra trang chuyên đề tương ứng; câu hỏi về một vùng thì tra trang vùng đó.',
  khi: 'Toàn bộ câu hỏi cho phép sử dụng Atlat.',
  vd: 'Hỏi "tỉnh nào có sản lượng thuỷ sản lớn nhất" ⇒ mở trang nông nghiệp, xem biểu đồ cột theo tỉnh.',
  bay: 'Nhiều câu chỉ cần ĐỌC Atlat là ra, không cần thuộc lòng. Bỏ qua Atlat là tự làm khó mình.' }
]);

/* ---------------- GDKT & PHÁP LUẬT ---------------- */
them('gdkt_ct', [
{ nhom: 'B. Pháp luật', cd: 'Pháp luật quốc tế', ten: 'Công ước Luật Biển 1982 và các vùng biển', cap: 3,
  ct: '<b>Đường cơ sở</b> — mốc để tính chiều rộng mọi vùng biển.<br>'
    + '<b>Nội thuỷ:</b> phía trong đường cơ sở, chủ quyền hoàn toàn như trên đất liền.<br>'
    + '<b>Lãnh hải:</b> 12 hải lí, là bộ phận lãnh thổ quốc gia trên biển; tàu nước ngoài được "đi qua không gây hại".<br>'
    + '<b>Vùng tiếp giáp lãnh hải:</b> 12 hải lí tiếp theo, quốc gia ven biển kiểm soát về hải quan, thuế, y tế, nhập cư.<br>'
    + '<b>Vùng đặc quyền kinh tế:</b> 200 hải lí tính từ đường cơ sở — QUYỀN CHỦ QUYỀN về kinh tế, '
    + 'nước khác vẫn tự do hàng hải và hàng không.<br>'
    + '<b>Thềm lục địa:</b> tối thiểu 200 hải lí, có thể mở rộng tới 350 hải lí nếu đáp ứng điều kiện địa chất.',
  khi: 'Câu tình huống về chủ quyền biển đảo và quyền của quốc gia ven biển.',
  vd: 'Tàu cá nước ngoài đánh bắt trong vùng đặc quyền kinh tế của Việt Nam mà không được phép là vi phạm quyền chủ quyền.',
  bay: 'Phân biệt CHỦ QUYỀN (nội thuỷ, lãnh hải — đầy đủ) với QUYỀN CHỦ QUYỀN (đặc quyền kinh tế, thềm lục địa — '
     + 'chỉ về tài nguyên). Nói "vùng đặc quyền kinh tế thuộc chủ quyền hoàn toàn" là sai.' },

{ nhom: 'A. Kinh tế', cd: 'Bảo hiểm – An sinh', ten: 'Hệ thống bảo hiểm và an sinh xã hội', cap: 2,
  ct: '<b>Bảo hiểm xã hội</b> — bắt buộc và tự nguyện; chế độ: ốm đau, thai sản, tai nạn lao động – bệnh nghề nghiệp, '
    + 'hưu trí, tử tuất.<br>'
    + '<b>Bảo hiểm y tế</b> — chi trả chi phí khám chữa bệnh; mức hưởng tuỳ nhóm đối tượng và có đúng tuyến hay không.<br>'
    + '<b>Bảo hiểm thất nghiệp</b> — trợ cấp và hỗ trợ học nghề, tìm việc.<br>'
    + '<b>Mức đóng bắt buộc:</b> người lao động 10,5% (8% BHXH + 1,5% BHYT + 1% BHTN); '
    + 'người sử dụng lao động 21,5%.<br>'
    + '<b>Khác bảo hiểm thương mại:</b> bảo hiểm xã hội PHI LỢI NHUẬN, do Nhà nước tổ chức thực hiện.',
  khi: 'Câu tình huống về quyền lợi và nghĩa vụ tham gia bảo hiểm.',
  vd: 'Người làm việc theo hợp đồng từ đủ 1 tháng trở lên đã thuộc diện tham gia bảo hiểm xã hội bắt buộc.',
  bay: 'Bảo hiểm y tế KHÔNG chi trả 100% trong mọi trường hợp — mức hưởng phụ thuộc nhóm đối tượng, tuyến khám '
     + 'và danh mục được chi trả.' },

{ nhom: 'A. Kinh tế', cd: 'Quản lí thu chi', ten: 'Kế hoạch tài chính cá nhân', cap: 2,
  ct: '<b>Bốn bước:</b> ① xác định mục tiêu (ngắn hạn, trung hạn, dài hạn) ② thống kê thu nhập và chi tiêu thực tế '
    + '③ lập kế hoạch phân bổ ④ theo dõi và điều chỉnh.<br>'
    + '<b>Quy tắc 50/30/20:</b> 50% chi thiết yếu · 30% chi linh hoạt · 20% tiết kiệm và đầu tư.<br>'
    + '<b>Nguyên tắc "trả cho mình trước":</b> trích tiết kiệm NGAY khi có thu nhập, không đợi cuối tháng.<br>'
    + '<b>Quỹ dự phòng khẩn cấp:</b> đủ chi phí sinh hoạt thiết yếu 3–6 tháng.<br>'
    + '<b>Nợ:</b> phân biệt nợ tốt (đầu tư sinh lời, học tập) với nợ xấu (tiêu dùng không thiết yếu, lãi cao).',
  khi: 'Câu tình huống về lập kế hoạch chi tiêu và ứng xử với các khoản vay.',
  vd: 'Thu nhập 20 triệu ⇒ chi thiết yếu 10 triệu, chi linh hoạt 6 triệu, tiết kiệm và đầu tư 4 triệu.',
  bay: 'Khi thu nhập giảm thì cắt khoản KHÔNG THIẾT YẾU trước, giữ khoản thiết yếu và cố giữ tỉ lệ tiết kiệm.' },

{ nhom: 'A. Kinh tế', cd: 'Hội nhập quốc tế', ten: 'Hội nhập kinh tế — cấp độ, cơ hội và thách thức', cap: 3,
  ct: '<b>Các cấp độ:</b> song phương → tiểu vùng và khu vực (ASEAN, AEC) → liên khu vực và toàn cầu (APEC, WTO).<br>'
    + '<b>Hình thức:</b> thương mại tự do (FTA), đầu tư quốc tế, hợp tác lao động, du lịch, chuyển giao công nghệ.<br>'
    + '<b>Cơ hội:</b> mở rộng thị trường xuất khẩu, thu hút vốn và công nghệ, tạo việc làm, nâng vị thế quốc gia.<br>'
    + '<b>Thách thức:</b> cạnh tranh gay gắt ngay trên sân nhà; phụ thuộc thị trường bên ngoài; '
    + 'yêu cầu khắt khe về xuất xứ, lao động, môi trường; nguy cơ tụt hậu nếu không nâng năng lực.<br>'
    + '<b>Mốc của Việt Nam:</b> ASEAN 1995 · APEC 1998 · WTO 2007 · CPTPP và EVFTA những năm gần đây.',
  khi: 'Câu về tác động hai mặt của hội nhập và trách nhiệm công dân.',
  vd: 'Thuế nhập khẩu về 0% giúp hàng ta rẻ hơn ở nước bạn, nhưng hàng nước bạn cũng rẻ hơn ngay tại thị trường ta.',
  bay: 'Hội nhập luôn có HAI MẶT. Phương án nói hội nhập "chỉ mang lại lợi ích" gần như chắc chắn sai.' }
]);

/* ---------------- NGỮ VĂN ---------------- */
them('van_ct', [
{ nhom: 'B. Đọc hiểu', cd: 'Biện pháp tu từ', ten: 'Bảng biện pháp tu từ và tác dụng', cap: 2,
  ct: '<b>So sánh</b> — đối chiếu hai sự vật có nét tương đồng (có từ so sánh: như, tựa, là) ⇒ gợi hình cụ thể.<br>'
    + '<b>Ẩn dụ</b> — gọi tên sự vật này bằng tên sự vật khác có nét TƯƠNG ĐỒNG ⇒ hàm súc, gợi liên tưởng.<br>'
    + '<b>Hoán dụ</b> — gọi bằng tên sự vật có quan hệ GẦN GŨI (bộ phận – toàn thể, dấu hiệu – sự vật) ⇒ ngắn gọn, giàu sức gợi.<br>'
    + '<b>Nhân hoá</b> — gán đặc điểm của người cho vật ⇒ sinh động, gần gũi.<br>'
    + '<b>Điệp ngữ / điệp cấu trúc</b> — lặp từ ngữ hoặc lặp mô hình cú pháp ⇒ nhấn mạnh, tạo nhịp điệu.<br>'
    + '<b>Liệt kê</b> ⇒ diễn tả đầy đủ, dồn dập. <b>Nói quá</b> ⇒ nhấn mạnh, gây ấn tượng. '
    + '<b>Nói giảm nói tránh</b> ⇒ giảm đau thương, thể hiện tế nhị. <b>Câu hỏi tu từ</b> ⇒ khẳng định, buộc người đọc tự vấn. '
    + '<b>Đối</b> ⇒ cân xứng, làm nổi bật sự tương phản.',
  khi: 'Câu 3 hoặc 4 phần Đọc hiểu và cả phần phân tích thơ trong bài viết.',
  vd: '"Áo chàm đưa buổi phân li" — HOÁN DỤ, lấy dấu hiệu trang phục để chỉ người dân Việt Bắc.',
  bay: 'Ranh giới ẩn dụ – hoán dụ: hỏi "hai sự vật GIỐNG nhau hay ĐI LIỀN nhau?". '
     + 'Giống nhau ⇒ ẩn dụ; đi liền, gắn bó ⇒ hoán dụ.' },

{ nhom: 'C. Viết', cd: 'Kĩ năng làm bài', ten: 'Năm tiêu chí chấm và cách không mất điểm', cap: 2,
  ct: '<b>① Đảm bảo cấu trúc</b> — đoạn viết liền mạch; bài có đủ mở, thân, kết.<br>'
    + '<b>② Xác định đúng vấn đề nghị luận</b> — lạc đề bộ phận là mất phần lớn điểm nội dung.<br>'
    + '<b>③ Triển khai nội dung</b> — có luận điểm, lí lẽ, dẫn chứng; mỗi luận điểm một đoạn có câu chủ đề.<br>'
    + '<b>④ Chính tả, dùng từ, đặt câu</b> — lỗi nhiều là mất điểm dù nội dung tốt.<br>'
    + '<b>⑤ Sáng tạo</b> — có cách nhìn riêng, diễn đạt mới mẻ, liên hệ mở rộng.<br>'
    + 'Hai tiêu chí ④ và ⑤ chiếm khoảng 0,5 điểm — đủ để đổi một bậc điểm.',
  khi: 'Toàn bộ phần Viết, chiếm 6,0 trên 10 điểm.',
  vd: 'Bài không có kết bài mất điểm tiêu chí ①. Thà viết hai câu kết còn hơn bỏ trống.',
  bay: 'Đoạn văn 200 chữ mà XUỐNG DÒNG chia ba phần là biến đoạn thành bài — mất điểm cấu trúc ngay lập tức.' },

{ nhom: 'C. Viết', cd: 'Nghị luận văn học', ten: 'Khung phân tích thơ và văn xuôi', cap: 3,
  ct: '<b>Phân tích thơ:</b> ① hoàn cảnh và vị trí đoạn thơ ② mạch cảm xúc ③ phân tích theo từng khổ hoặc từng hình ảnh, '
    + 'bám từ ngữ – hình ảnh – nhịp điệu – biện pháp tu từ ④ đặc sắc nghệ thuật ⑤ đánh giá, mở rộng.<br>'
    + '<b>Phân tích nhân vật:</b> ① vị trí, hoàn cảnh ② ngoại hình, hành động ③ nội tâm, tính cách '
    + '④ nghệ thuật xây dựng nhân vật (tình huống, ngôn ngữ, chi tiết đắt) ⑤ ý nghĩa tư tưởng.<br>'
    + '<b>Đề so sánh:</b> phải có đủ ba tầng — điểm tương đồng · điểm khác biệt · <b>lí giải nguyên nhân khác biệt</b> '
    + '(hoàn cảnh sáng tác, phong cách tác giả, đặc trưng thể loại).',
  khi: 'Câu viết bài văn 4,0 điểm.',
  vd: 'Phân tích một chi tiết đắt: gọi tên chi tiết → đặt vào mạch truyện → nêu ý nghĩa biểu tượng.',
  bay: 'DIỄN XUÔI (kể lại nội dung bằng lời khác) là lỗi mất điểm nặng nhất. Phải phân tích CHẤT LIỆU nghệ thuật.' },

{ nhom: 'B. Đọc hiểu', cd: 'Tiếng Việt', ten: 'Kiến thức Tiếng Việt hay hỏi', cap: 2,
  ct: '<b>Phép liên kết:</b> lặp · thế · nối · liên tưởng (dùng từ cùng trường nghĩa).<br>'
    + '<b>Nghĩa của từ:</b> nghĩa gốc và nghĩa chuyển; từ đồng âm, đồng nghĩa, trái nghĩa, từ nhiều nghĩa.<br>'
    + '<b>Nghĩa hàm ẩn:</b> điều người nói muốn truyền đạt nhưng không nói trực tiếp, phải suy từ ngữ cảnh.<br>'
    + '<b>Thành phần câu:</b> chủ ngữ, vị ngữ, trạng ngữ; thành phần biệt lập (tình thái, cảm thán, gọi đáp, phụ chú).<br>'
    + '<b>Câu theo mục đích nói:</b> trần thuật, nghi vấn, cầu khiến, cảm thán.<br>'
    + '<b>Lỗi thường gặp:</b> thiếu chủ ngữ hoặc vị ngữ · dùng từ sai nghĩa · lặp từ · câu mơ hồ về logic.',
  khi: 'Câu Tiếng Việt trong phần Đọc hiểu và tiêu chí diễn đạt của phần Viết.',
  vd: '"Trời hôm nay lạnh đấy" nói với người sắp ra ngoài — nghĩa hàm ẩn là nhắc mặc thêm áo.',
  bay: 'Phân biệt PHÉP LẶP (chủ ý nghệ thuật, có tác dụng nhấn mạnh) với LỖI LẶP TỪ (do vốn từ nghèo). '
     + 'Cùng hiện tượng lặp nhưng một bên được điểm, một bên bị trừ.' },

{ nhom: 'B. Đọc hiểu', cd: 'Thể loại', ten: 'Đặc trưng các thể loại hay ra đề', cap: 2,
  ct: '<b>Thơ:</b> nhận diện qua số chữ mỗi dòng và cách gieo vần — lục bát · song thất lục bát · '
    + 'thất ngôn bát cú · thất ngôn tứ tuyệt · năm chữ · tự do.<br>'
    + '<b>Truyện ngắn:</b> tình huống truyện · nhân vật · ngôi kể và điểm nhìn · chi tiết nghệ thuật. '
    + 'Truyện hiện đại có thể "không có chuyện", thiên về dòng tâm trạng.<br>'
    + '<b>Kí:</b> cái tôi tác giả xuất hiện trực tiếp; sự thật đời sống là chất liệu chính.<br>'
    + '<b>Kịch:</b> xung đột và tính cách bộc lộ qua hành động và lời thoại; có chỉ dẫn sân khấu.<br>'
    + '<b>Văn nghị luận:</b> luận đề, luận điểm, lí lẽ, bằng chứng và cách lập luận.',
  khi: 'Câu nhận diện thể loại và câu phân tích theo đặc trưng thể loại.',
  vd: 'Phân tích kí phải chỉ ra được CÁI TÔI quan sát và cảm nhận của tác giả, khác hẳn phân tích truyện.',
  bay: 'Phân tích truyện mà chỉ kể lại cốt truyện, phân tích kịch mà bỏ qua lời thoại — đều là bỏ sót '
     + 'đặc trưng thể loại, bị trừ điểm nội dung.' }
]);

/* ---------------- TIẾNG ANH ---------------- */
them('anh_ct', [
{ nhom: 'B. Ngữ pháp', cd: 'Mệnh đề quan hệ', ten: 'Mệnh đề quan hệ — đủ dạng và cách rút gọn', cap: 2,
  ct: '<b>Đại từ quan hệ:</b> who (người, chủ ngữ) · whom (người, tân ngữ) · which (vật) · that (cả hai) · '
    + 'whose (sở hữu) · where (nơi chốn) · when (thời gian) · why (lí do).<br>'
    + '<b>Xác định</b> (không dấu phẩy): bổ nghĩa bắt buộc, có thể dùng "that", có thể lược bỏ khi làm tân ngữ.<br>'
    + '<b>Không xác định</b> (có dấu phẩy): bổ sung thông tin, <b>KHÔNG dùng "that"</b>, không lược bỏ được.<br>'
    + '<b>Sau giới từ</b> chỉ dùng whom hoặc which: the man to whom I spoke.<br>'
    + '<b>Rút gọn:</b> chủ động → V-ing (the man standing there) · bị động → V3 (the book written by him) · '
    + 'chỉ mục đích → to V (the first person to arrive).',
  khi: 'Khoảng 2–3 câu mỗi đề, cả ở phần ngữ pháp lẫn phần tìm lỗi sai.',
  vd: 'The book, ____ I bought yesterday, is interesting ⇒ phải là "which" vì có dấu phẩy.',
  bay: 'Có DẤU PHẨY hoặc có GIỚI TỪ đứng trước ⇒ loại ngay "that". Đây là bẫy hay gặp nhất của chuyên đề này.' },

{ nhom: 'B. Ngữ pháp', cd: 'Ngữ pháp khác', ten: 'Đảo ngữ, câu chẻ và cấu trúc nhấn mạnh', cap: 4,
  ct: '<b>No sooner had</b> S + V3 <b>THAN</b> S + V(quá khứ)<br>'
    + '<b>Hardly / Scarcely had</b> S + V3 <b>WHEN</b> S + V(quá khứ)<br>'
    + '<b>Never / Rarely / Seldom / Little</b> + trợ động từ + S + V<br>'
    + '<b>Not only</b> + trợ động từ + S + V <b>but also</b>…<br>'
    + '<b>Only when / Only after / Only by</b> + … + trợ động từ + S + V (đảo ở mệnh đề CHÍNH)<br>'
    + '<b>Under no circumstances / On no account</b> + modal + S + V<br>'
    + '<b>Câu chẻ:</b> It is/was + thành phần nhấn mạnh + that/who + phần còn lại.<br>'
    + '<b>Đảo ngữ điều kiện:</b> Should… (loại 1) · Were… (loại 2) · Had… (loại 3).',
  khi: 'Câu phân loại điểm 9–10 và câu viết lại câu.',
  vd: 'It was not until 1990 that she started her career ⇔ Not until 1990 DID SHE START her career.',
  bay: 'Sau khi đảo ngữ, động từ chính luôn ở dạng NGUYÊN THỂ vì thì đã nằm ở trợ động từ. '
     + 'Viết "did she started" là sai.' },

{ nhom: 'B. Ngữ pháp', cd: 'Câu điều kiện', ten: 'Câu điều kiện, câu ước và biến thể', cap: 3,
  ct: '<b>Loại 0</b> (chân lí): If + hiện tại đơn, hiện tại đơn.<br>'
    + '<b>Loại 1</b> (có thật ở tương lai): If + hiện tại đơn, S + will/can/may + V.<br>'
    + '<b>Loại 2</b> (trái hiện tại): If + quá khứ đơn (were cho mọi ngôi), S + would + V.<br>'
    + '<b>Loại 3</b> (trái quá khứ): If + had + V3, S + would have + V3.<br>'
    + '<b>Hỗn hợp:</b> vế if loại 3 + vế chính loại 2 (dấu hiệu: "now" ở vế chính).<br>'
    + '<b>Câu ước:</b> wish/if only + quá khứ đơn (hiện tại) · + had V3 (quá khứ) · + would V (mong đổi tương lai).<br>'
    + '<b>Thay thế "if":</b> unless (= if not) · provided that · as long as · in case · suppose.',
  khi: 'Khoảng 2 câu mỗi đề, thường có một câu đảo ngữ điều kiện ở mức vận dụng cao.',
  vd: 'If he had taken the medicine, he WOULD BE fine NOW ⇒ câu hỗn hợp, nhận ra nhờ chữ "now".',
  bay: '"Unless" đã mang nghĩa phủ định nên mệnh đề theo sau phải KHẲNG ĐỊNH. '
     + 'Viết "Unless you do not hurry" là phủ định hai lần, sai nghĩa.' },

{ nhom: 'B. Ngữ pháp', cd: 'Bị động – Tường thuật', ten: 'Bị động và tường thuật — các dạng đặc biệt', cap: 3,
  ct: '<b>Bị động cơ bản:</b> be + V3, chia "be" đúng thì của câu chủ động.<br>'
    + '<b>Bị động kép:</b> People say that he is rich ⇒ He <b>is said to be</b> rich / It is said that he is rich.<br>'
    + '<b>Với make / let:</b> make ⇒ bị động thêm "to"; let ⇒ chuyển thành "be allowed to".<br>'
    + '<b>Với động từ tri giác</b> (see, hear, watch): bị động luôn có "to" — He was seen to enter.<br>'
    + '<b>Tường thuật:</b> lùi thì · đổi đại từ · đổi trạng từ (now→then, today→that day, tomorrow→the following day, '
    + 'here→there, this→that).<br>'
    + '<b>KHÔNG lùi thì</b> với: chân lí, sự thật hiển nhiên, điều kiện loại 2 và 3.<br>'
    + '<b>Mệnh lệnh:</b> told/asked + O + (not) to V. <b>Câu hỏi Yes/No:</b> asked + if/whether + S + V.',
  khi: 'Khoảng 3–4 câu mỗi đề, cả ở phần ngữ pháp lẫn phần viết lại câu.',
  vd: 'They made him work overtime ⇒ He was made TO work overtime.',
  bay: 'Câu hỏi tường thuật phải trở về trật tự KHẲNG ĐỊNH và bỏ trợ động từ do/does/did. '
     + 'Viết "She asked me where did I live" là lỗi kinh điển.' },

{ nhom: 'C. Từ vựng', cd: 'Từ loại', ten: 'Word formation — bảng hậu tố và tiền tố', cap: 2,
  ct: '<b>Hậu tố danh từ:</b> -tion, -sion, -ment, -ness, -ity, -ance, -ence, -ship, -hood, -ism, -er, -or, -ist.<br>'
    + '<b>Hậu tố tính từ:</b> -ful, -less, -able, -ible, -ive, -ous, -al, -ic, -y, -ent, -ant.<br>'
    + '<b>Hậu tố động từ:</b> -ise/-ize, -ify, -en, -ate.<br>'
    + '<b>Hậu tố trạng từ:</b> -ly.<br>'
    + '<b>Tiền tố phủ định:</b> un- · in- · <b>im-</b> (trước m, p) · <b>il-</b> (trước l) · <b>ir-</b> (trước r) · dis- · non-.<br>'
    + '<b>Tiền tố khác:</b> re- (lại) · over- (quá) · under- (thiếu) · mis- (sai) · pre- (trước) · post- (sau) · co- (cùng).<br>'
    + '<b>Tính từ -ed / -ing:</b> -ed tả CẢM XÚC của người, -ing tả TÍNH CHẤT của vật gây ra cảm xúc.',
  khi: 'Câu word form và câu điền từ vào đoạn văn — khoảng 5–6 câu mỗi đề.',
  vd: 'possible ⇒ impossible (trước p dùng im-); legal ⇒ illegal (trước l dùng il-); regular ⇒ irregular.',
  bay: 'Chọn dạng từ theo VỊ TRÍ trong câu chứ không theo nghĩa: sau to be dùng tính từ, bổ nghĩa động từ dùng '
     + 'trạng từ, sau mạo từ dùng danh từ, sau modal dùng động từ nguyên thể.' },

{ nhom: 'B. Ngữ pháp', cd: 'Thì động từ', ten: 'Sự hoà hợp chủ ngữ – động từ', cap: 3,
  ct: '<b>Số ít:</b> The number of + N số nhiều · Each / Every / Either / Neither of + N số nhiều · '
    + 'danh từ không đếm được · mệnh đề danh ngữ · khoảng cách, thời gian, tiền bạc coi là một khối.<br>'
    + '<b>Số nhiều:</b> A number of + N số nhiều · Both / Several / Many / A few of + N số nhiều · '
    + 'people, police, cattle.<br>'
    + '<b>Theo danh từ gần nhất:</b> either… or… · neither… nor… · not only… but also… · there is/are.<br>'
    + '<b>Danh từ tập hợp</b> (family, team, government): số ít khi coi là một khối, số nhiều khi nhấn từng thành viên.<br>'
    + '<b>Cụm chen giữa</b> (with, together with, as well as, along with) KHÔNG làm đổi số của chủ ngữ.',
  khi: 'Câu tìm lỗi sai — chủ đề bị gài nhiều nhất.',
  vd: 'The number of students IS increasing (số ít) ≠ A number of students ARE waiting (số nhiều).',
  bay: '"The teacher, together with his students, IS going" — cụm "together with…" chỉ chen vào, '
     + 'chủ ngữ thật vẫn là "The teacher" số ít.' }
]);

/* ---------------- TOÁN ---------------- */
them('toan_ct', [
{ nhom: 'VII. Dãy số', cd: 'Dãy số – Cấp số', ten: 'Cấp số cộng và cấp số nhân — bộ công thức đủ', cap: 2,
  ct: '<b>Cấp số cộng</b> công sai d:<br>'
    + '  u<sub>n</sub> = u₁ + (n − 1)d &nbsp;·&nbsp; S<sub>n</sub> = n(u₁ + u<sub>n</sub>)/2 = n[2u₁ + (n−1)d]/2<br>'
    + '  Ba số liên tiếp: 2u<sub>k</sub> = u<sub>k−1</sub> + u<sub>k+1</sub><br>'
    + '<b>Cấp số nhân</b> công bội q:<br>'
    + '  u<sub>n</sub> = u₁·q^(n−1) &nbsp;·&nbsp; S<sub>n</sub> = u₁(qⁿ − 1)/(q − 1) với q ≠ 1<br>'
    + '  Ba số liên tiếp: u<sub>k</sub>² = u<sub>k−1</sub>·u<sub>k+1</sub><br>'
    + '  <b>Tổng vô hạn</b> khi |q| &lt; 1: S = u₁/(1 − q)',
  khi: 'Bài lãi suất, bài xếp gạch, bài chia đôi liên tiếp và mọi bài có quy luật đều đặn.',
  vd: 'Dãy 3, 6, 12, 24… là cấp số nhân q = 2 ⇒ u₁₀ = 3·2⁹ = 1536.',
  bay: 'Nhận diện nhanh: hiệu hai số liên tiếp KHÔNG đổi ⇒ cấp số cộng; thương hai số liên tiếp không đổi ⇒ cấp số nhân.' },

{ nhom: 'VII. Dãy số', cd: 'Dãy số – Cấp số', ten: 'Dãy số — tính đơn điệu và bị chặn', cap: 3,
  ct: '<b>Tăng:</b> u<sub>n+1</sub> &gt; u<sub>n</sub> với mọi n ⇔ u<sub>n+1</sub> − u<sub>n</sub> &gt; 0 '
    + '(hoặc u<sub>n+1</sub>/u<sub>n</sub> &gt; 1 khi mọi số hạng dương).<br>'
    + '<b>Giảm:</b> ngược lại.<br>'
    + '<b>Bị chặn trên</b> nếu tồn tại M với u<sub>n</sub> ≤ M mọi n; <b>bị chặn dưới</b> nếu có m ≤ u<sub>n</sub>; '
    + '<b>bị chặn</b> khi có cả hai.<br>'
    + '<b>Dãy cho bởi hệ thức truy hồi:</b> u₁ cho trước và u<sub>n+1</sub> = f(u<sub>n</sub>) — '
    + 'tính vài số hạng đầu để đoán quy luật, hoặc dùng TABLE trên máy tính.',
  khi: 'Câu lí thuyết về dãy số và bài truy hồi mức vận dụng.',
  vd: 'u<sub>n</sub> = n/(n+1): u<sub>n+1</sub> − u<sub>n</sub> = 1/[(n+1)(n+2)] > 0 ⇒ dãy TĂNG và bị chặn trên bởi 1.',
  bay: 'Dãy tăng chưa chắc không bị chặn. Ví dụ n/(n+1) tăng nhưng luôn nhỏ hơn 1.' },

{ nhom: 'VII. Dãy số', cd: 'Dãy số – Cấp số', ten: 'Ứng dụng cấp số vào bài toán thực tế', cap: 3,
  ct: '<b>Tăng đều mỗi kì một lượng cố định</b> ⇒ cấp số CỘNG (lương tăng 500 nghìn/năm, mỗi hàng ghế thêm 2 ghế).<br>'
    + '<b>Tăng/giảm theo tỉ lệ phần trăm mỗi kì</b> ⇒ cấp số NHÂN (lãi kép, dân số, phóng xạ, khấu hao).<br>'
    + '  Tăng r% mỗi kì ⇒ q = 1 + r; giảm r% mỗi kì ⇒ q = 1 − r.<br>'
    + '<b>Bài "sau bao nhiêu kì thì vượt ngưỡng"</b> ⇒ giải bất phương trình mũ bằng logarit rồi làm tròn LÊN.<br>'
    + '<b>Bài tổng tích luỹ</b> ⇒ dùng công thức S<sub>n</sub>.',
  khi: 'Bài toán thực tế trong phần trả lời ngắn.',
  vd: 'Dân số tăng 1,5%/năm ⇒ q = 1,015; sau n năm dân số là N₀·1,015ⁿ.',
  bay: 'Đề hỏi "sau bao nhiêu NĂM thì vượt" thì phải làm tròn LÊN số nguyên, dù phần thập phân rất nhỏ.' }
]);

/* ---------------- SINH HỌC ---------------- */
them('sinh_ct', [
{ nhom: 'IV. Tiến hoá', cd: 'Tiến hoá', ten: 'Năm nhân tố tiến hoá — vai trò và hướng tác động', cap: 3,
  ct: '<b>Đột biến</b> — tạo allele mới, là nguồn nguyên liệu SƠ CẤP; tần số thấp nhưng vô hướng.<br>'
    + '<b>Di – nhập gene</b> — làm thay đổi tần số allele, có thể mang allele mới tới; vô hướng.<br>'
    + '<b>Chọn lọc tự nhiên</b> — nhân tố duy nhất có HƯỚNG, quy định chiều tiến hoá; tác động trực tiếp lên '
    + 'KIỂU HÌNH, gián tiếp lên kiểu gene.<br>'
    + '<b>Các yếu tố ngẫu nhiên</b> (biến động di truyền) — làm thay đổi tần số allele đột ngột, không theo hướng '
    + 'xác định; mạnh ở quần thể nhỏ, có thể loại bỏ cả allele có lợi.<br>'
    + '<b>Giao phối không ngẫu nhiên</b> — KHÔNG làm đổi tần số allele, chỉ làm thay đổi thành phần kiểu gene '
    + 'theo hướng tăng đồng hợp, giảm dị hợp.',
  khi: 'Câu lí thuyết về tiến hoá — có mặt ở hầu hết các đề.',
  vd: 'Chọn lọc tự nhiên chống allele TRỘI làm tần số allele đó giảm rất nhanh; chống allele LẶN thì giảm chậm '
    + 'vì allele lặn còn ẩn trong thể dị hợp.',
  bay: 'Chỉ CHỌN LỌC TỰ NHIÊN là có hướng. Giao phối không ngẫu nhiên KHÔNG đổi tần số allele — '
     + 'đây là hai kết luận đề hay đảo để gài.' },

{ nhom: 'IV. Tiến hoá', cd: 'Tiến hoá', ten: 'Loài và các con đường hình thành loài', cap: 3,
  ct: '<b>Tiêu chuẩn loài quan trọng nhất</b> với sinh vật sinh sản hữu tính: CÁCH LI SINH SẢN.<br>'
    + '<b>Cách li trước hợp tử</b> — ngăn không cho giao phối xảy ra: cách li nơi ở, tập tính, thời gian, cơ học.<br>'
    + '<b>Cách li sau hợp tử</b> — giao phối được nhưng con lai không sống hoặc bất thụ (ví dụ con la).<br>'
    + '<b>Hình thành loài khác khu</b> (cách li địa lí) — chậm, qua nhiều giai đoạn, phổ biến ở động vật.<br>'
    + '<b>Hình thành loài cùng khu:</b> cách li tập tính · cách li sinh thái · <b>lai xa kèm đa bội hoá</b> '
    + '(nhanh nhất, phổ biến ở thực vật).',
  khi: 'Câu về khái niệm loài và cơ chế hình thành loài.',
  vd: 'Lai xa kèm đa bội hoá tạo ra loài mới NGAY trong một vài thế hệ vì con lai đa bội có bộ NST tương đồng, '
    + 'trở nên hữu thụ và cách li sinh sản với bố mẹ.',
  bay: 'Cách li ĐỊA LÍ không trực tiếp tạo ra loài mới — nó chỉ ngăn dòng gene, tạo điều kiện cho các nhân tố '
     + 'tiến hoá phân hoá vốn gene. Nói "cách li địa lí tạo loài mới" là sai bản chất.' },

{ nhom: 'II. Di truyền NST', cd: 'Di truyền NST', ten: 'Bộ công thức lai và quy luật di truyền', cap: 3,
  ct: '<b>Số loại giao tử</b> của cơ thể có n cặp gene dị hợp: 2ⁿ.<br>'
    + '<b>Phân li độc lập:</b> tách riêng từng cặp tính trạng rồi NHÂN kết quả.<br>'
    + '<b>Số kiểu gene tối đa</b> của một gene có n allele trên NST thường: n(n+1)/2.<br>'
    + '<b>Tương tác gene</b> — tổng tỉ lệ luôn là 16: 9:7 · 9:6:1 · 9:3:4 · 12:3:1 · 13:3 · 15:1.<br>'
    + '<b>Hoán vị gene:</b> giao tử liên kết (1 − f)/2 mỗi loại, giao tử hoán vị f/2 mỗi loại; '
    + 'aabb = (ab)² · A-B- = 0,5 + aabb · A-bb = aaB- = 0,25 − aabb.<br>'
    + '<b>Gene trên X:</b> tỉ lệ kiểu hình khác nhau ở hai giới; bệnh lặn trên X biểu hiện ở nam nhiều hơn hẳn nữ.',
  khi: 'Toàn bộ bài tập quy luật di truyền, kể cả câu vận dụng cao.',
  vd: 'Thấy tỉ lệ đời con có tổng bằng 16 mà không phải 9:3:3:1 ⇒ gần như chắc chắn là tương tác gene.',
  bay: 'Luôn RÚT GỌN tỉ lệ trước khi kết luận: 18:14 chính là 9:7 chứ không phải một quy luật mới.' }
]);

/* ---------------- HOÁ HỌC ---------------- */
them('hoa_ct', [
{ nhom: 'Hữu cơ', cd: 'Polymer', ten: 'Polymer — phân loại vật liệu và ứng dụng', cap: 2,
  ct: '<b>Chất dẻo:</b> PE (túi, màng) · PVC (ống nước) · PP (bao bì) · PS (xốp) · '
    + 'PMMA hay thuỷ tinh hữu cơ (kính máy bay) · nhựa phenol formaldehyde (đồ điện).<br>'
    + '<b>Tơ thiên nhiên:</b> bông, len, tơ tằm. <b>Tơ tổng hợp:</b> nylon-6,6, nitron (olon), capron. '
    + '<b>Tơ bán tổng hợp:</b> tơ visco, tơ acetate (chế biến từ cellulose).<br>'
    + '<b>Cao su:</b> thiên nhiên (isoprene) · buna · buna-S (với styrene) · buna-N (với acrylonitrile).<br>'
    + '<b>Keo dán:</b> epoxy, ure formaldehyde.<br>'
    + '<b>Hệ số polymer hoá:</b> n = M<sub>polymer</sub> / M<sub>mắt xích</sub>',
  khi: 'Câu nhận biết loại vật liệu và phản ứng điều chế.',
  vd: 'Tơ visco và tơ acetate là tơ BÁN TỔNG HỢP vì chế biến từ cellulose thiên nhiên.',
  bay: 'Nylon-6,6 và tơ lapsan điều chế bằng TRÙNG NGƯNG (giải phóng H₂O); nitron và cao su buna bằng TRÙNG HỢP. '
     + 'Đề rất hay hỏi phân loại phản ứng điều chế.' },

{ nhom: 'Kỹ thuật', cd: 'Điện phân – Pin điện', ten: 'Ăn mòn kim loại và cách chống', cap: 2,
  ct: '<b>Ăn mòn hoá học:</b> kim loại phản ứng trực tiếp với chất oxi hoá, electron chuyển TRỰC TIẾP, '
    + 'không phát sinh dòng điện; tốc độ chậm.<br>'
    + '<b>Ăn mòn điện hoá:</b> cần đủ ba điều kiện — hai điện cực khác bản chất · tiếp xúc trực tiếp hoặc qua dây dẫn · '
    + 'cùng nhúng trong dung dịch chất điện li. Phát sinh dòng điện, tốc độ NHANH hơn nhiều.<br>'
    + '<b>Trong ăn mòn điện hoá, kim loại MẠNH hơn đóng vai anot và bị ăn mòn trước.</b><br>'
    + '<b>Chống ăn mòn:</b> ① cách li (sơn, mạ, tráng men, bôi dầu mỡ) ② dùng chất ức chế '
    + '③ <b>bảo vệ điện hoá</b> — gắn kim loại hoạt động hơn (khối kẽm gắn vào vỏ tàu thép).',
  khi: 'Câu lí thuyết và câu tình huống thực tiễn về bảo vệ kim loại.',
  vd: 'Thép (Fe–C) để trong không khí ẩm bị ăn mòn điện hoá: Fe là anot bị ăn mòn, C là catot.',
  bay: 'Gắn kẽm vào vỏ tàu thép thì KẼM bị ăn mòn thay cho sắt vì kẽm hoạt động mạnh hơn — '
     + 'nhiều bạn nhầm tưởng kẽm chỉ có tác dụng che phủ.' }
]);

/* ---------------- BÙ NỐT NHỮNG CHUYÊN ĐỀ CÒN MỎNG ---------------- */
them('van_ct', [
{ nhom: 'B. Đọc hiểu', cd: 'Biện pháp tu từ', ten: 'Phân tích tác dụng — mẫu câu trả lời', cap: 3,
  ct: 'Công thức ba tầng, viết liền một mạch 3–5 câu:<br>'
    + '<b>① Gọi tên + chỉ ra biểu hiện:</b> "Tác giả sử dụng biện pháp … qua hình ảnh/từ ngữ …"<br>'
    + '<b>② Tác dụng nghệ thuật:</b> "…làm cho câu thơ giàu hình ảnh / tạo nhịp điệu … / gây ấn tượng mạnh"<br>'
    + '<b>③ Tác dụng nội dung và tình cảm:</b> "…qua đó nhấn mạnh … và thể hiện … của tác giả"<br>'
    + 'Với ngữ liệu có NHIỀU biện pháp, chọn biện pháp NỔI BẬT nhất rồi phân tích sâu, đừng liệt kê dàn trải.',
  khi: 'Câu 3 hoặc 4 của phần Đọc hiểu, và cả phần phân tích thơ trong bài viết.',
  vd: '"Điệp ngữ *nhớ* lặp lại bốn lần tạo nhịp điệu day dứt, nhấn mạnh nỗi nhớ chồng chất và thể hiện tình '
    + 'cảm gắn bó sâu nặng của người ra đi với mảnh đất Việt Bắc."',
  bay: 'Gọi tên biện pháp mà không nêu tác dụng thường chỉ đạt NỬA số điểm của câu. '
     + 'Ngược lại, nêu tác dụng chung chung kiểu "làm câu thơ hay hơn" cũng không được tính.' },

{ nhom: 'C. Viết', cd: 'Kĩ năng làm bài', ten: 'Phân bổ thời gian và thứ tự làm bài', cap: 1,
  ct: '<b>Lịch chuẩn cho 120 phút:</b><br>'
    + '  · 20–25 phút — Đọc hiểu (4,0đ)<br>'
    + '  · 25 phút — viết đoạn 200 chữ (2,0đ)<br>'
    + '  · 65–70 phút — viết bài văn (4,0đ)<br>'
    + '  · 5 phút — soát chính tả, bổ sung ý thiếu<br>'
    + '<b>Thứ tự:</b> làm Đọc hiểu TRƯỚC vì đây là phần ăn điểm cao nhất trên mỗi phút bỏ ra.<br>'
    + '<b>Trước khi viết:</b> dành 3 phút gạch dàn ý ra nháp — luận điểm nào, dẫn chứng nào, kết ra sao.<br>'
    + '<b>Ghi mốc giờ</b> lên góc tờ nháp ngay khi nhận đề.',
  khi: 'Ngay phút đầu tiên của buổi thi Ngữ văn.',
  vd: 'Bắt đầu 7h30 ⇒ ghi: 7h55 xong Đọc hiểu · 8h20 xong đoạn văn · 9h25 xong bài văn · 9h30 nộp.',
  bay: 'Sa đà vào một câu Đọc hiểu khó là ăn mất thời gian của câu 4 điểm. '
     + 'Bí quá thì viết một ý rồi đi tiếp, quay lại sau nếu còn giờ.' }
]);

them('gdkt_ct', [
{ nhom: 'B. Pháp luật', cd: 'Pháp luật quốc tế', ten: 'Điều ước quốc tế và quan hệ với pháp luật quốc gia', cap: 3,
  ct: '<b>Điều ước quốc tế</b> — thoả thuận bằng văn bản giữa các chủ thể của luật quốc tế, làm phát sinh '
    + 'quyền và nghĩa vụ pháp lí.<br>'
    + '<b>Nguyên tắc nền tảng:</b> bình đẳng chủ quyền · không dùng vũ lực hoặc đe doạ dùng vũ lực · '
    + 'không can thiệp công việc nội bộ · giải quyết tranh chấp bằng biện pháp hoà bình · '
    + '<b>tận tâm thực hiện cam kết quốc tế</b> (pacta sunt servanda) · dân tộc tự quyết.<br>'
    + '<b>Quan hệ với pháp luật quốc gia:</b> Việt Nam nội luật hoá điều ước bằng cách sửa đổi, ban hành văn bản '
    + 'trong nước cho phù hợp; khi có xung đột với văn bản dưới luật thì áp dụng điều ước đã kí kết.<br>'
    + '<b>Lĩnh vực hay ra đề:</b> luật biển · quyền con người · thương mại quốc tế · môi trường.',
  khi: 'Câu về nghĩa vụ quốc gia thành viên và tình huống chủ quyền biển đảo.',
  vd: 'Việt Nam phê chuẩn UNCLOS năm 1994 rồi ban hành Luật Biển Việt Nam 2012 — đó là quá trình nội luật hoá.',
  bay: 'Điều ước quốc tế KHÔNG tự động thay thế pháp luật trong nước; phải qua phê chuẩn và nội luật hoá. '
     + 'Nói "kí điều ước là luật trong nước hết hiệu lực" là sai.' }
]);

them('anh_ct', [
{ nhom: 'B. Ngữ pháp', cd: 'Mệnh đề quan hệ', ten: 'Mệnh đề quan hệ — bài tập nối câu và bẫy thường gặp', cap: 3,
  ct: '<b>Nối hai câu:</b> tìm danh từ lặp lại ở câu sau, thay bằng đại từ quan hệ rồi đặt ngay sau danh từ đó ở câu trước.<br>'
    + '<b>Lược bỏ được</b> khi đại từ quan hệ làm TÂN NGỮ trong mệnh đề xác định: The book (which) I bought…<br>'
    + '<b>Không lược bỏ được</b> khi làm chủ ngữ, khi có dấu phẩy, hoặc khi có giới từ đứng trước.<br>'
    + '<b>"which" thay cả mệnh đề:</b> He passed the exam, which made his parents happy.<br>'
    + '<b>Lượng từ + of + whom/which:</b> I have three friends, all of whom are engineers.<br>'
    + '<b>where vs which:</b> "where" theo sau là mệnh đề đầy đủ; "which" theo sau thiếu chủ ngữ hoặc tân ngữ.',
  khi: 'Câu nối câu, câu viết lại và câu tìm lỗi sai.',
  vd: 'The house WHERE I live is old (sau where có đủ S + V) ≠ The house WHICH I bought is old (sau which thiếu tân ngữ).',
  bay: 'Ba trường hợp loại ngay "that": có dấu phẩy · có giới từ đứng trước · thay cho cả mệnh đề. '
     + 'Ngược lại, sau "the first/the last/the only/so sánh nhất" thì ưu tiên dùng "that".' },

{ nhom: 'B. Ngữ pháp', cd: 'Ngữ pháp khác', ten: 'So sánh, nhượng bộ và các cấu trúc hay ra thi', cap: 2,
  ct: '<b>So sánh:</b> ngắn -er/-est · dài more/the most · bằng as…as · phủ định not so/as…as · '
    + 'kép The + comp…, the + comp… · gấp bội twice/three times as…as.<br>'
    + '<b>Bất quy tắc:</b> good–better–best · bad–worse–worst · far–further–furthest · little–less–least.<br>'
    + '<b>Nhượng bộ:</b> although / though / even though + MỆNH ĐỀ ≠ despite / in spite of + DANH TỪ hoặc V-ing.<br>'
    + '<b>Mục đích:</b> to V · in order to V · so as to V · so that + S + can/will · in order that.<br>'
    + '<b>Kết quả:</b> so + adj/adv + that · such + (a/an) + adj + N + that · too…to · adj + enough + to.<br>'
    + '<b>Nguyên nhân:</b> because + mệnh đề · because of / due to / owing to + danh từ.',
  khi: 'Chiếm nhiều câu nhất trong phần ngữ pháp và phần viết lại câu.',
  vd: 'It is so hot that we cannot go out ⇔ It is TOO hot for us TO go out ⇔ It is NOT cool ENOUGH for us to go out.',
  bay: 'Cặp bẫy số một: because + MỆNH ĐỀ, because of + DANH TỪ. Tương tự although + mệnh đề, despite + danh từ. '
     + 'Đề luôn cho một vế rồi bắt điền vế kia.' }
]);

/* ===== THẺ CHO CÁC CHUYÊN ĐỀ VỪA BỔ SUNG ===== */
them('toan_ct', [
{ nhom: 'VII. Dãy số', cd: 'Giới hạn – Liên tục', ten: 'Giới hạn — bảng quy tắc xử lí dạng vô định', cap: 3,
  ct: '<b>Dạng ∞/∞ (phân thức khi x → ∞):</b> chia cả tử và mẫu cho luỹ thừa bậc cao nhất của mẫu.<br>'
    + '&nbsp;&nbsp;· bậc tử &lt; bậc mẫu ⇒ giới hạn 0 · bậc bằng nhau ⇒ tỉ số hệ số cao nhất · bậc tử &gt; bậc mẫu ⇒ ±∞<br>'
    + '<b>Dạng 0/0:</b> phân tích thành nhân tử rồi rút gọn; nếu có căn thì nhân liên hợp.<br>'
    + '<b>Dạng ∞ − ∞:</b> nhân liên hợp hoặc quy đồng để đưa về hai dạng trên.<br>'
    + '<b>Giới hạn nền:</b> lim(1/nᵏ) = 0 · lim qⁿ = 0 khi |q| &lt; 1 · tổng cấp số nhân lùi vô hạn u₁/(1 − q).',
  khi: 'Câu giới hạn và câu tìm tiệm cận của đồ thị.',
  vd: 'lim (√(x²+1) − x) khi x → +∞: nhân liên hợp được 1/(√(x²+1) + x) → 0.',
  bay: 'Với x → −∞ thì √(x²) = |x| = −x chứ không phải x. Quên dấu ở đây là sai ngay từ bước đầu.' }
]);

them('hoa_ct', [
{ nhom: 'Kỹ thuật', cd: 'Phức chất', ten: 'Phức chất — cấu tạo và phản ứng nhận biết', cap: 2,
  ct: '<b>Cấu tạo:</b> nguyên tử hoặc ion kim loại trung tâm + các phối tử bao quanh bằng liên kết cho – nhận.<br>'
    + '<b>Phối tử thường gặp:</b> H₂O, NH₃, Cl⁻, OH⁻, CN⁻, SCN⁻ — đều còn cặp electron chưa liên kết.<br>'
    + '<b>Số phối trí</b> hay gặp là 4 và 6. Trong công thức, phần trong ngoặc vuông là cầu nội.<br>'
    + '<b>Phản ứng nhận biết quan trọng:</b><br>'
    + '&nbsp;&nbsp;· Cu²⁺ + NH₃ dư ⇒ [Cu(NH₃)₄]²⁺ <b>xanh lam đậm</b><br>'
    + '&nbsp;&nbsp;· AgCl + NH₃ dư ⇒ [Ag(NH₃)₂]⁺ <b>tan</b><br>'
    + '&nbsp;&nbsp;· Fe³⁺ + SCN⁻ ⇒ phức <b>đỏ máu</b><br>'
    + '&nbsp;&nbsp;· Al(OH)₃, Zn(OH)₂ tan trong NaOH dư (tạo phức hydroxide)',
  khi: 'Nội dung [MỚI] của Hoá 12 CT 2018, thường hỏi ở phần nhận biết và lí thuyết.',
  vd: 'Nhỏ NH₃ từ từ tới dư vào dung dịch CuSO₄: đầu tiên có kết tủa xanh, sau đó kết tủa TAN tạo dung dịch xanh đậm.',
  bay: 'Tạo phức là liên kết CHO – NHẬN nên số oxi hoá của ion trung tâm KHÔNG đổi. Đây không phải phản ứng oxi hoá khử.' },

{ nhom: 'Kỹ thuật', cd: 'Nhiệt động – Tốc độ – Cân bằng', ten: 'Enthalpy, tốc độ và cân bằng — ba công cụ lớp 10–11', cap: 3,
  ct: '<b>Enthalpy:</b> Δ_rH = ΣΔ_fH(sản phẩm) − ΣΔ_fH(chất đầu). Theo năng lượng liên kết thì NGƯỢC LẠI: '
    + 'Δ_rH = ΣE_lk(chất đầu) − ΣE_lk(sản phẩm).<br>'
    + '&nbsp;&nbsp;Δ_rH &lt; 0 toả nhiệt · Δ_rH &gt; 0 thu nhiệt · Δ_fH của đơn chất bền = 0<br>'
    + '<b>Tốc độ phản ứng</b> tăng khi tăng: nồng độ · nhiệt độ · áp suất khí · diện tích bề mặt · dùng xúc tác.<br>'
    + '<b>Cân bằng hoá học:</b> K_C chỉ chứa chất khí và chất tan, KHÔNG chứa chất rắn và dung môi.<br>'
    + '&nbsp;&nbsp;Le Chatelier: tăng nhiệt độ ⇒ chuyển theo chiều THU nhiệt · tăng áp suất ⇒ chuyển theo chiều '
    + 'GIẢM số mol khí · xúc tác KHÔNG làm chuyển dịch cân bằng.',
  khi: 'Câu lí thuyết định lượng và bài toán năng lượng nhiên liệu.',
  vd: 'N₂ + 3H₂ ⇌ 2NH₃ toả nhiệt và giảm số mol khí ⇒ tăng áp suất và giảm nhiệt độ đều làm tăng hiệu suất.',
  bay: 'Toả nhiệt nói về NĂNG LƯỢNG, nhanh hay chậm nói về TỐC ĐỘ — hai chuyện khác nhau. '
     + 'Than cháy toả nhiệt rất mạnh nhưng vẫn cần mồi lửa.' }
]);

them('sinh_ct', [
{ nhom: 'II. Di truyền NST', cd: 'Di truyền người', ten: 'Di truyền người — phương pháp và bệnh thường gặp', cap: 3,
  ct: '<b>Ba phương pháp nghiên cứu:</b> phả hệ · trẻ đồng sinh · nghiên cứu tế bào (bộ nhiễm sắc thể).<br>'
    + '<b>Đọc phả hệ:</b><br>'
    + '&nbsp;&nbsp;· Bố mẹ bình thường sinh con bệnh ⇒ gene LẶN, bố mẹ đều dị hợp<br>'
    + '&nbsp;&nbsp;· Bệnh chủ yếu ở nam ⇒ gene lặn trên X · Bố bệnh truyền cho TẤT CẢ con gái ⇒ gene trội trên X<br>'
    + '&nbsp;&nbsp;· Chỉ truyền theo dòng mẹ ⇒ gene trong ti thể<br>'
    + '<b>Bệnh và hội chứng phải nhớ:</b> Down (ba nhiễm sắc thể 21) · Turner (XO) · Klinefelter (XXY) · '
    + 'mù màu và máu khó đông (gene lặn trên X) · phenylketone niệu (lặn trên NST thường, hạn chế được bằng ăn kiêng).',
  khi: 'Bài phả hệ và câu lí thuyết về di truyền y học.',
  vd: 'Bố mẹ bình thường sinh con bệnh ⇒ cả hai đều Aa; người con BÌNH THƯỜNG có xác suất 2/3 là Aa (đã loại aa).',
  bay: 'Người dị hợp là người LÀNH MANG GENE — không biểu hiện bệnh nhưng vẫn truyền allele bệnh cho con.' },

{ nhom: 'II. Di truyền NST', cd: 'Công nghệ di truyền', ten: 'Công nghệ gene và công nghệ tế bào', cap: 3,
  ct: '<b>Công nghệ gene — ba khâu:</b> ① tạo DNA tái tổ hợp ② đưa vào tế bào nhận ③ phân lập dòng tế bào chứa DNA tái tổ hợp.<br>'
    + '&nbsp;&nbsp;· <b>Thể truyền:</b> plasmid hoặc virus đã biến đổi, phải tự nhân đôi được trong tế bào nhận<br>'
    + '&nbsp;&nbsp;· <b>Enzyme cắt giới hạn</b> cắt tại trình tự đặc hiệu; <b>ligase</b> nối lại. Gene và thể truyền phải '
    + 'cắt bằng CÙNG một loại enzyme để đầu dính khớp nhau<br>'
    + '&nbsp;&nbsp;· Tế bào nhận phổ biến là E. coli vì sinh sản nhanh, dễ nuôi<br>'
    + '<b>Công nghệ tế bào:</b> nuôi cấy mô (thực vật) · dung hợp tế bào trần (lai xa) · nhân bản vô tính bằng '
    + 'chuyển nhân tế bào sinh dưỡng · cấy truyền phôi.<br>'
    + '<b>PCR</b> nhân một đoạn DNA lên hàng triệu bản trong vài giờ.',
  khi: 'Câu lí thuyết về ứng dụng di truyền học — luôn có trong đề.',
  vd: 'Insulin cho người tiểu đường hiện được sản xuất bằng vi khuẩn mang gene người, rẻ và an toàn hơn chiết từ tuỵ động vật.',
  bay: 'Cá thể nhân bản vô tính chỉ giống về gene trong NHÂN; gene ti thể đến từ trứng và kiểu hình vẫn chịu ảnh hưởng môi trường.' }
]);

them('su_ct', [
{ nhom: 'B. Việt Nam', cd: 'Chiến tranh bảo vệ Tổ quốc', ten: 'Chiến tranh bảo vệ Tổ quốc sau năm 1975', cap: 3,
  ct: '<b>Biên giới Tây Nam (1975 – 1979):</b> tập đoàn Pol Pot xâm lấn biên giới; quân dân ta phản công tự vệ, '
    + 'sau đó quân tình nguyện Việt Nam giúp nhân dân Campuchia thoát khỏi hoạ diệt chủng.<br>'
    + '<b>Biên giới phía Bắc (2/1979):</b> quân dân sáu tỉnh biên giới chiến đấu kiên cường bảo vệ lãnh thổ.<br>'
    + '<b>Tính chất:</b> cả hai đều là chiến tranh CHÍNH NGHĨA, TỰ VỆ — Việt Nam ở thế bị tấn công.<br>'
    + '<b>Ý nghĩa:</b> giữ vững độc lập chủ quyền, ổn định biên giới, tạo tiền đề cho công cuộc Đổi mới.<br>'
    + '<b>Bài học:</b> luôn cảnh giác · xây dựng nền quốc phòng toàn dân gắn với phát triển kinh tế · '
    + 'kết hợp sức mạnh dân tộc với sức mạnh thời đại.',
  khi: 'Chủ đề "Cách mạng tháng Tám, chiến tranh giải phóng và chiến tranh bảo vệ Tổ quốc" của Lịch sử 12.',
  vd: 'Câu hỏi về tính chất các cuộc chiến này ⇒ đáp án luôn là chính nghĩa, tự vệ, không phải chủ động gây chiến.',
  bay: 'Nhiều bạn tưởng sau 1975 là hoà bình hoàn toàn. Thực tế ta phải chiến đấu bảo vệ biên giới ngay sau khi vừa thống nhất.' },

{ nhom: 'B. Việt Nam', cd: 'Chiến tranh bảo vệ Tổ quốc', ten: 'Quốc phòng Việt Nam trong thời bình', cap: 2,
  ct: '<b>Chính sách quốc phòng "bốn không":</b> không tham gia liên minh quân sự · không liên kết với nước này '
    + 'chống nước kia · không cho nước ngoài đặt căn cứ quân sự · không dùng vũ lực hoặc đe doạ dùng vũ lực.<br>'
    + '<b>Nền quốc phòng toàn dân</b> gắn với thế trận an ninh nhân dân — mọi người dân là một phần của thế trận.<br>'
    + '<b>Nghĩa vụ quân sự</b> là trách nhiệm vẻ vang của công dân.<br>'
    + '<b>Nội hàm mở rộng:</b> ngày nay bảo vệ Tổ quốc còn gồm bảo vệ chủ quyền biển đảo, an ninh mạng, '
    + 'an ninh kinh tế và an ninh văn hoá.',
  khi: 'Câu vận dụng liên hệ lịch sử với hiện tại.',
  vd: 'Bình thường hoá quan hệ với các nước láng giềng sau xung đột thể hiện phương châm "khép lại quá khứ, hướng tới tương lai".',
  bay: 'Quốc phòng "bốn không" là chính sách HOÀ BÌNH, TỰ VỆ — không phải trung lập thụ động hay từ bỏ khả năng phòng thủ.' }
]);

them('dia_ct', [
{ nhom: 'B. Kinh tế', cd: 'Kinh tế biển đảo', ten: 'Phát triển tổng hợp kinh tế biển đảo', cap: 3,
  ct: '<b>Tiềm năng:</b> vùng biển rộng khoảng 1 triệu km² (gấp ba lần đất liền) · bờ biển dài 3260 km · '
    + '28 tỉnh, thành phố giáp biển.<br>'
    + '<b>Bốn ngành mũi nhọn:</b><br>'
    + '&nbsp;&nbsp;· <b>Thuỷ sản</b> — nuôi trồng đã vượt khai thác; đẩy mạnh khai thác XA BỜ<br>'
    + '&nbsp;&nbsp;· <b>Dầu khí</b> — thềm lục địa phía Nam, bể Cửu Long và Nam Côn Sơn<br>'
    + '&nbsp;&nbsp;· <b>Du lịch biển đảo</b> — vịnh Hạ Long, Cát Bà là di sản thiên nhiên thế giới<br>'
    + '&nbsp;&nbsp;· <b>Giao thông vận tải biển</b> — đảm nhận phần lớn hàng hoá xuất nhập khẩu<br>'
    + '<b>Hướng mới:</b> điện gió ngoài khơi, cảng nước sâu và khu kinh tế ven biển.<br>'
    + '<b>Thách thức:</b> ô nhiễm biển · suy giảm nguồn lợi · nước biển dâng và xói lở bờ.',
  khi: 'Chủ đề kinh tế biển đảo của Địa lí 12 — luôn có câu hỏi trong đề.',
  vd: 'Đẩy mạnh khai thác xa bờ vừa giảm áp lực lên nguồn lợi ven bờ vừa khẳng định sự hiện diện trên biển.',
  bay: 'Phát triển TỔNG HỢP nghĩa là các ngành hỗ trợ nhau, không phải phát triển riêng lẻ từng ngành. '
     + 'Và luôn phải gắn với bảo vệ chủ quyền cùng môi trường biển.' },

{ nhom: 'B. Kinh tế', cd: 'Kinh tế biển đảo', ten: 'Đảo, quần đảo và vai trò kép', cap: 2,
  ct: '<b>Vai trò kinh tế:</b> là cơ sở hậu cần cho khai thác biển, nơi neo đậu tránh bão, điểm phát triển du lịch.<br>'
    + '<b>Vai trò quốc phòng:</b> là điểm tựa để khẳng định chủ quyền, tạo thành tuyến phòng thủ từ xa.<br>'
    + '<b>Các huyện đảo cần nhớ:</b> Vân Đồn và Cô Tô (Quảng Ninh) · Cát Hải và Bạch Long Vĩ (Hải Phòng) · '
    + 'Cồn Cỏ (Quảng Trị) · Hoàng Sa (Đà Nẵng) · Lý Sơn (Quảng Ngãi) · Trường Sa (Khánh Hoà) · '
    + 'Phú Quý (Bình Thuận) · Côn Đảo (Bà Rịa – Vũng Tàu) · Kiên Hải và Phú Quốc (Kiên Giang).<br>'
    + '<b>Rừng ngập mặn</b> ven biển chắn sóng, chống xói lở và là nơi sinh sản của nhiều loài thuỷ sản.',
  khi: 'Câu hỏi về hệ thống đảo và ý nghĩa của chúng.',
  vd: 'Phá rừng ngập mặn để nuôi tôm làm tăng xói lở bờ và giảm chính nguồn lợi thuỷ sản mà người dân sống nhờ.',
  bay: 'Đảo và quần đảo có vai trò KÉP — vừa kinh tế vừa quốc phòng. Câu hỏi thường yêu cầu nêu đủ cả hai mặt.' }
]);

them('gdkt_ct', [
{ nhom: 'A. Kinh tế', cd: 'Lập kế hoạch kinh doanh', ten: 'Kế hoạch kinh doanh — cấu trúc và công cụ', cap: 3,
  ct: '<b>Năm phần của một kế hoạch:</b> ý tưởng · mục tiêu · phân tích thị trường · kế hoạch tài chính · kế hoạch nhân sự.<br>'
    + '<b>Mục tiêu SMART:</b> cụ thể · đo lường được · khả thi · phù hợp · có thời hạn.<br>'
    + '<b>Phân tích SWOT:</b> Điểm mạnh và Điểm yếu là yếu tố BÊN TRONG; Cơ hội và Thách thức là yếu tố BÊN NGOÀI.<br>'
    + '<b>Kế hoạch tài chính</b> phải có: vốn đầu tư ban đầu · chi phí vận hành · doanh thu dự kiến · điểm hoà vốn.<br>'
    + '<b>Nguồn vốn:</b> vốn tự có · vay ngân hàng · gọi vốn nhà đầu tư · huy động cộng đồng.<br>'
    + '<b>Bốn nhóm rủi ro:</b> thị trường · tài chính · pháp lí · vận hành.',
  khi: 'Bài "Lập kế hoạch kinh doanh" của GDKT&PL 12.',
  vd: 'Điểm hoà vốn là mức doanh thu mà tại đó tổng doanh thu vừa đúng bằng tổng chi phí.',
  bay: 'Doanh thu cao chưa chắc lợi nhuận lớn — lợi nhuận bằng doanh thu TRỪ chi phí. '
     + 'Và kế hoạch phải điều chỉnh theo thị trường, cứng nhắc là rủi ro.' },

{ nhom: 'A. Kinh tế', cd: 'Trách nhiệm xã hội của doanh nghiệp', ten: 'Bốn cấp độ trách nhiệm xã hội', cap: 3,
  ct: '<b>① Kinh tế</b> — làm ăn có lãi, tồn tại được thì mới thực hiện được các trách nhiệm khác. Đây là NỀN TẢNG.<br>'
    + '<b>② Pháp lí</b> — tuân thủ pháp luật về thuế, lao động, môi trường, cạnh tranh. Đây là mức TỐI THIỂU bắt buộc.<br>'
    + '<b>③ Đạo đức</b> — trung thực trong quảng cáo, bảo vệ quyền lợi người tiêu dùng, đối xử công bằng với người lao động.<br>'
    + '<b>④ Nhân văn</b> — đóng góp cho cộng đồng, từ thiện, hỗ trợ giáo dục và y tế.<br>'
    + '<b>Các bên liên quan:</b> cổ đông · người lao động · khách hàng · nhà cung cấp · cộng đồng · Nhà nước.<br>'
    + '<b>Lợi ích:</b> nâng uy tín thương hiệu · giữ chân nhân sự · huy động vốn dễ hơn.',
  khi: 'Bài "Trách nhiệm xã hội của doanh nghiệp" của GDKT&PL 12 và các câu tình huống.',
  vd: 'Sản xuất xanh và tiết kiệm năng lượng vừa giảm chi phí vừa thể hiện trách nhiệm với môi trường — '
    + 'ví dụ rõ nhất cho việc trách nhiệm và lợi nhuận đi cùng nhau.',
  bay: 'Trách nhiệm xã hội KHÔNG chỉ là từ thiện. Nộp thuế đủ, trả lương đúng hạn, không xả thải trái phép '
     + 'mới là phần cốt lõi — và áp dụng cho mọi quy mô doanh nghiệp.' }
]);

them('hoa_ct', [
{ nhom: 'Kỹ thuật', cd: 'Phức chất', ten: 'Kim loại chuyển tiếp — vì sao dễ tạo phức và có màu', cap: 3,
  ct: '<b>Đặc điểm chung:</b> có orbital d chưa bão hoà nên có nhiều số oxi hoá, hợp chất thường có màu, '
    + 'dễ tạo phức chất và nhiều kim loại có tính xúc tác tốt.<br>'
    + '<b>Vì sao tạo phức dễ:</b> orbital d còn TRỐNG để nhận cặp electron của phối tử qua liên kết cho – nhận.<br>'
    + '<b>Vì sao có màu:</b> phức hấp thụ một phần ánh sáng nhìn thấy do chênh lệch mức năng lượng của orbital d; '
    + 'màu quan sát được là màu bù của phần bị hấp thụ.<br>'
    + '<b>Màu phụ thuộc cả hai:</b> ion trung tâm và loại phối tử. Cùng Cu²⁺ nhưng phức với H₂O xanh nhạt, '
    + 'với NH₃ xanh đậm hơn hẳn.<br>'
    + '<b>Vai trò sinh học:</b> hemoglobin là phức của Fe, chlorophyll là phức của Mg.',
  khi: 'Câu lí thuyết về kim loại chuyển tiếp và phức chất.',
  vd: 'Dung dịch muối Fe³⁺ có màu vàng nâu; nhỏ KSCN vào chuyển ngay sang đỏ máu do đổi phối tử.',
  bay: 'Kim loại nhóm IA, IIA tạo phức rất kém vì không có orbital d thích hợp. '
     + 'Nói "mọi kim loại đều tạo phức bền như nhau" là sai.' },

{ nhom: 'Kỹ thuật', cd: 'Nhiệt động – Tốc độ – Cân bằng', ten: 'Bài toán năng lượng nhiên liệu và hiệu suất', cap: 4,
  ct: '<b>Nhiệt lượng toả ra:</b> Q = n × |Δ_cH| với n là số mol nhiên liệu.<br>'
    + '<b>Nhiệt lượng nước nhận:</b> Q = m·c·Δt (c của nước = 4200 J/(kg·K)).<br>'
    + '<b>Có hiệu suất H:</b> Q<sub>toả</sub> = Q<sub>ích</sub> ÷ (H/100) — hiệu suất nằm ở MẪU khi tính lượng đầu vào.<br>'
    + '<b>Điều kiện chuẩn của CT 2018:</b> 25 °C và 1 bar ⇒ 1 mol khí chiếm <b>24,79 lít</b>, KHÔNG phải 22,4 lít.<br>'
    + '<b>Enthalpy đốt cháy cần nhớ:</b> CH₄ −890,3 kJ/mol · C₂H₅OH −1366,9 · C₃H₈ −2220.',
  khi: 'Bài toán thực tế nối Hoá với năng lượng — dạng ưa thích của đề CT 2018.',
  vd: 'Đun 2 lít nước từ 20 °C lên 100 °C cần 672 kJ; bếp hiệu suất 50% thì nhiên liệu phải toả 1344 kJ.',
  bay: 'Điều kiện chuẩn mới dùng 24,79 L/mol. Dùng 22,4 L/mol là lệch khoảng 10% — đủ để trượt đáp án.' }
]);

them('sinh_ct', [
{ nhom: 'II. Di truyền NST', cd: 'Di truyền người', ten: 'Bài toán xác suất trong phả hệ', cap: 4,
  ct: '<b>Bước 1 — xác định quy luật:</b> đọc phả hệ để biết gene trội hay lặn, nằm trên NST thường hay X.<br>'
    + '<b>Bước 2 — suy kiểu gene của từng người</b>, chú ý người BÌNH THƯỜNG trong gia đình có người bệnh:<br>'
    + '&nbsp;&nbsp;· Bố mẹ Aa × Aa, người con bình thường ⇒ xác suất là Aa bằng <b>2/3</b> (đã loại aa nên mẫu số từ 4 xuống 3)<br>'
    + '<b>Bước 3 — người ngoài lấy từ quần thể cân bằng:</b><br>'
    + '&nbsp;&nbsp;· Xác suất người bình thường đó là Aa bằng <b>2pq/(p² + 2pq)</b>, không phải 2pq<br>'
    + '<b>Bước 4 — nhân các xác suất độc lập</b>; với "có ít nhất một" thì lấy 1 trừ xác suất "không có ai".<br>'
    + '<b>Với n người con:</b> đều bệnh là (1/4)ⁿ · đúng một người bệnh là C¹ₙ × (1/4) × (3/4)ⁿ⁻¹.',
  khi: 'Câu vận dụng cao của phần di truyền — hầu như đề nào cũng có.',
  vd: 'Câu "sinh 2 con đều bình thường" phải cộng cả trường hợp bố mẹ KHÔNG cùng dị hợp, '
    + 'vì khi đó mọi con đều bình thường.',
  bay: 'Hai chỗ đổi mẫu số (người bình thường trong nhà, người bình thường trong quần thể) là nơi mất điểm nhiều nhất.' },

{ nhom: 'II. Di truyền NST', cd: 'Công nghệ di truyền', ten: 'Ứng dụng và mặt trái của công nghệ di truyền', cap: 3,
  ct: '<b>Ứng dụng trong y học:</b> sản xuất insulin, hormone sinh trưởng, vaccine tái tổ hợp; '
    + 'xét nghiệm gene và liệu pháp gene.<br>'
    + '<b>Trong nông nghiệp:</b> giống kháng sâu bệnh, chịu hạn, chịu mặn, tăng hàm lượng dinh dưỡng.<br>'
    + '<b>Trong pháp y:</b> giám định DNA xác định huyết thống và truy tìm thủ phạm.<br>'
    + '<b>Ưu điểm so với chọn giống truyền thống:</b> nhanh hơn nhiều, chuyển được gene giữa các loài xa nhau, '
    + 'kiểm soát được đặc tính muốn có.<br>'
    + '<b>Vấn đề đặt ra:</b> an toàn sinh học (phát tán gene ra tự nhiên) · đa dạng sinh học · '
    + 'đạo đức sinh học · quyền sở hữu giống.',
  khi: 'Câu lí thuyết và câu liên hệ thực tiễn về ứng dụng di truyền học.',
  vd: 'Gây đột biến nhân tạo hiệu quả cao ở vi sinh vật và thực vật nhưng ít dùng cho động vật vì dễ gây tử vong.',
  bay: 'Sinh vật biến đổi gene KHÔNG nhất thiết phải nhận gene từ loài khác — có thể chỉ là bất hoạt hoặc '
     + 'tăng cường biểu hiện một gene sẵn có của chính loài đó.' }
]);

them('gdkt_ct', [
{ nhom: 'A. Kinh tế', cd: 'Lập kế hoạch kinh doanh', ten: 'Ý tưởng, cơ hội kinh doanh và năng lực người kinh doanh', cap: 3,
  ct: '<b>Ý tưởng kinh doanh tốt</b> xuất phát từ một nhu cầu chưa được đáp ứng hoặc một vấn đề chưa được giải quyết tốt. '
    + 'Mới lạ chưa đủ — phải có người sẵn sàng trả tiền.<br>'
    + '<b>Nguồn hình thành ý tưởng:</b> lợi thế nội tại (kĩ năng, quan hệ, vốn) và cơ hội bên ngoài '
    + '(nhu cầu thị trường, chính sách mới, công nghệ mới).<br>'
    + '<b>Bốn năng lực cốt lõi:</b> nắm bắt cơ hội · quản lí tài chính · giao tiếp và thuyết phục · '
    + 'chấp nhận rủi ro CÓ TÍNH TOÁN.<br>'
    + '<b>Lợi thế cạnh tranh</b> đến từ giá, chất lượng, dịch vụ, công nghệ hoặc thương hiệu — '
    + 'phải trả lời được "vì sao khách hàng chọn mình chứ không chọn đối thủ".',
  khi: 'Câu tình huống về khởi nghiệp và năng lực kinh doanh.',
  vd: 'Nhận thấy khu trọ sinh viên thiếu chỗ giặt sấy giá rẻ ⇒ đó là một cơ hội kinh doanh từ nhu cầu chưa được đáp ứng.',
  bay: 'Chấp nhận rủi ro KHÁC liều lĩnh: phải dựa trên đánh giá và có phương án dự phòng. '
     + 'Và cố phục vụ tất cả mọi người thường dẫn tới không phục vụ tốt cho ai.' },

{ nhom: 'A. Kinh tế', cd: 'Trách nhiệm xã hội của doanh nghiệp', ten: 'Tình huống trách nhiệm xã hội hay ra đề', cap: 4,
  ct: '<b>Cách giải một tình huống:</b> ① hành vi thuộc cấp độ trách nhiệm nào ② có vi phạm pháp luật không '
    + '③ hậu quả với bên liên quan nào ④ doanh nghiệp nên làm gì.<br>'
    + '<b>Các tình huống điển hình:</b><br>'
    + '&nbsp;&nbsp;· Xả thải chưa xử lí ⇒ vi phạm pháp lí về môi trường, bị xử phạt và buộc bồi thường<br>'
    + '&nbsp;&nbsp;· Quảng cáo sai sự thật ⇒ vi phạm pháp luật và huỷ hoại niềm tin lâu dài<br>'
    + '&nbsp;&nbsp;· Trốn đóng bảo hiểm cho người lao động ⇒ vi phạm pháp luật lao động<br>'
    + '&nbsp;&nbsp;· Ép tăng ca quá quy định ⇒ vi phạm về thời giờ làm việc<br>'
    + '&nbsp;&nbsp;· Bán phá giá, nói xấu đối thủ ⇒ cạnh tranh không lành mạnh, bị pháp luật cấm<br>'
    + '&nbsp;&nbsp;· Tài trợ học bổng, trồng cây ⇒ trách nhiệm nhân văn, khuyến khích chứ không bắt buộc',
  khi: 'Câu tình huống và câu đúng/sai của phần kinh tế.',
  vd: 'Doanh nghiệp xả thải chưa xử lí ra sông ⇒ vừa vi phạm hành chính vừa phải bồi thường dân sự; '
    + 'nếu gây hậu quả nghiêm trọng có thể bị truy cứu hình sự.',
  bay: 'Làm từ thiện nhiều KHÔNG bù được cho việc vi phạm pháp luật. '
     + 'Trách nhiệm pháp lí là mức tối thiểu bắt buộc, không đánh đổi bằng trách nhiệm nhân văn được.' }
]);

})();
