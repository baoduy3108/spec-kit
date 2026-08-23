/* ============================================================
   TÀNG KINH CÁC — ĐỢT DÀY THÊM
   Đo được trung bình chỉ 4,4 thẻ mỗi chuyên đề, 50 trên 84 chuyên đề
   có từ ba thẻ trở xuống. File này bù thêm cho từng chuyên đề mỏng,
   mỗi thẻ mang nội dung MỚI chứ không nhắc lại thẻ đã có.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

(function () {
const them = (khoa, ds) => { TD.KHO[khoa] = (TD.KHO[khoa] || []).concat(ds); };

/* ---------------------------------------------------------- LỊCH SỬ */
them('su_ct', [
{ nhom: 'A. Thế giới', cd: 'Liên hợp quốc', ten: 'Việt Nam tại Liên hợp quốc — từ thành viên tới Hội đồng Bảo an', cap: 3,
  ct: '<b>20/9/1977:</b> Việt Nam trở thành thành viên thứ <b>149</b> của Liên hợp quốc, ngay sau khi đất nước thống nhất về mặt nhà nước.<br>'
    + '<b>Hai nhiệm kỳ Uỷ viên không thường trực Hội đồng Bảo an:</b> 2008 – 2009 và 2020 – 2021. '
    + 'Ghế này do Đại hội đồng bầu, phải đạt đa số hai phần ba, nên là thước đo uy tín quốc tế.<br>'
    + '<b>Từ năm 2014</b> Việt Nam cử lực lượng tham gia hoạt động <b>gìn giữ hoà bình</b> của Liên hợp quốc '
    + '(bệnh viện dã chiến, đội công binh tại Nam Sudan và Cộng hoà Trung Phi).<br>'
    + '<b>Các tổ chức chuyên môn Việt Nam tham gia:</b> UNESCO (giáo dục – khoa học – văn hoá) · WHO (y tế) · '
    + 'UNICEF (trẻ em) · FAO (lương thực) · IMF và WB (tài chính).<br>'
    + '<b>Đóng góp nổi bật:</b> thực hiện các Mục tiêu Phát triển Bền vững, đi đầu về xoá đói giảm nghèo; '
    + 'chủ trì nhiều nghị quyết về ứng phó biến đổi khí hậu và về phụ nữ, hoà bình, an ninh.',
  khi: 'Câu hỏi vai trò và đóng góp của Việt Nam trong tổ chức quốc tế — dạng vận dụng của chuyên đề này.',
  vd: 'Việt Nam được bầu làm Uỷ viên không thường trực nhiệm kỳ 2020 – 2021 với 192/193 phiếu, mức gần như tuyệt đối.',
  bay: 'Uỷ viên KHÔNG thường trực nhiệm kỳ hai năm, không có quyền phủ quyết. Quyền phủ quyết chỉ thuộc năm uỷ viên '
     + 'thường trực là Nga, Mỹ, Anh, Pháp, Trung Quốc.' },

{ nhom: 'A. Thế giới', cd: 'Chiến tranh lạnh', ten: 'Biểu hiện của Chiến tranh lạnh — các cuộc đối đầu cụ thể', cap: 3,
  ct: '<b>Đối đầu về kinh tế:</b> Mỹ lập Kế hoạch Marshall viện trợ Tây Âu (1947); Liên Xô và Đông Âu lập '
    + 'Hội đồng Tương trợ Kinh tế SEV (1949).<br>'
    + '<b>Đối đầu về quân sự:</b> NATO (1949) và Tổ chức Hiệp ước Vacsava (1955) — thế giới chia thành hai khối.<br>'
    + '<b>Ba điểm nóng phải nhớ:</b>'
    + '<table class="kq">'
    + '<tr><td>Chiến tranh Triều Tiên<br>1950 – 1953</td><td>kết thúc bằng hiệp định đình chiến, bán đảo bị chia đôi ở vĩ tuyến 38</td></tr>'
    + '<tr><td>Khủng hoảng tên lửa Caribe<br>1962</td><td>thế giới cận kề chiến tranh hạt nhân, hai bên nhượng bộ và rút tên lửa</td></tr>'
    + '<tr><td>Chiến tranh Việt Nam<br>1954 – 1975</td><td>cuộc chiến cục bộ lớn nhất, Mỹ thất bại</td></tr>'
    + '</table>'
    + '<b>Đặc trưng cốt lõi:</b> hai siêu cường <b>không bao giờ đụng độ quân sự trực tiếp</b> với nhau, '
    + 'mà đối đầu qua chạy đua vũ trang, chiến tranh cục bộ ở nước thứ ba và cạnh tranh ý thức hệ.<br>'
    + '<b>Hệ quả:</b> ngân sách khổng lồ đổ vào vũ khí, nhiều dân tộc bị cuốn vào chiến tranh, '
    + 'nhưng cũng thúc đẩy khoa học kỹ thuật và cuộc chạy đua vào vũ trụ.',
  khi: 'Câu hỏi biểu hiện, đặc trưng hoặc hệ quả của Chiến tranh lạnh.',
  vd: 'Khủng hoảng Caribe 1962 cho thấy đặc trưng của Chiến tranh lạnh: căng tới sát bờ vực nhưng cả hai đều lùi lại vì không bên nào muốn chiến tranh trực tiếp.',
  bay: '"Chiến tranh lạnh" nghĩa là không có chiến tranh nóng GIỮA HAI SIÊU CƯỜNG, chứ không phải thế giới không có chiến tranh. '
     + 'Giai đoạn này có rất nhiều cuộc chiến cục bộ đẫm máu.' },

{ nhom: 'A. Thế giới', cd: 'ASEAN', ten: 'Cộng đồng ASEAN — ba trụ cột, nguyên tắc và thách thức', cap: 3,
  ct: '<b>Cộng đồng ASEAN thành lập 31/12/2015</b> với ba trụ cột:<br>'
    + '· <b>Chính trị – An ninh (APSC):</b> giữ hoà bình, giải quyết tranh chấp bằng biện pháp hoà bình.<br>'
    + '· <b>Kinh tế (AEC):</b> thị trường và cơ sở sản xuất thống nhất, tự do lưu chuyển hàng hoá, dịch vụ, đầu tư, lao động có tay nghề.<br>'
    + '· <b>Văn hoá – Xã hội (ASCC):</b> hướng tới người dân, thu hẹp khoảng cách phát triển.<br>'
    + '<b>Nguyên tắc hoạt động (từ Hiệp ước Bali 1976):</b> tôn trọng độc lập chủ quyền · không can thiệp công việc nội bộ · '
    + 'giải quyết tranh chấp bằng hoà bình · hợp tác cùng phát triển. Quyết định theo <b>đồng thuận</b>.<br>'
    + '<b>Bốn thách thức lớn:</b> chênh lệch trình độ phát triển giữa các nước · tranh chấp ở Biển Đông · '
    + 'cạnh tranh ảnh hưởng của các nước lớn · nguyên tắc đồng thuận khiến việc ra quyết định chậm.<br>'
    + '<b>Việt Nam:</b> gia nhập 1995, đảm nhiệm Chủ tịch ASEAN các năm 1998, 2010 và 2020.',
  khi: 'Câu hỏi vai trò, nguyên tắc và triển vọng của ASEAN — thường ở mức vận dụng.',
  vd: 'Cộng đồng Kinh tế ASEAN không phải liên minh tiền tệ: các nước vẫn giữ đồng tiền riêng, khác hẳn khu vực đồng euro.',
  bay: 'ASEAN KHÔNG phải liên minh quân sự và cũng không phải nhà nước liên bang — các thành viên giữ nguyên chủ quyền. '
     + 'Nguyên tắc đồng thuận vừa là điểm mạnh (không nước nào bị áp đặt) vừa là điểm yếu (một nước phản đối là bế tắc).' },

{ nhom: 'B. Việt Nam', cd: 'Cách mạng tháng Tám', ten: 'Mười lăm ngày tổng khởi nghĩa — diễn biến theo mốc', cap: 3,
  ct: '<b>Bối cảnh:</b> 9/3/1945 Nhật đảo chính Pháp; Đảng ra chỉ thị <i>"Nhật – Pháp bắn nhau và hành động của chúng ta"</i>, '
    + 'phát động cao trào kháng Nhật cứu nước.<br>'
    + '<b>Thời cơ:</b> 15/8/1945 Nhật đầu hàng Đồng minh — kẻ thù chính đã gục, quân Đồng minh chưa vào, '
    + 'chính quyền tay sai hoang mang. Đây là <b>thời cơ ngàn năm có một</b>.<br>'
    + '<table class="kq">'
    + '<tr><td>13 – 15/8/1945</td><td>Hội nghị toàn quốc của Đảng tại Tân Trào, quyết định Tổng khởi nghĩa</td></tr>'
    + '<tr><td>16 – 17/8/1945</td><td>Đại hội Quốc dân Tân Trào, lập Uỷ ban Dân tộc giải phóng</td></tr>'
    + '<tr><td><b>19/8/1945</b></td><td>khởi nghĩa thắng lợi ở <b>Hà Nội</b></td></tr>'
    + '<tr><td>23/8/1945</td><td>Huế</td></tr>'
    + '<tr><td>25/8/1945</td><td>Sài Gòn</td></tr>'
    + '<tr><td><b>2/9/1945</b></td><td>Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hoà</td></tr>'
    + '</table>'
    + '<b>Bài học:</b> chuẩn bị lực lượng lâu dài · nắm chắc và chớp đúng thời cơ · kết hợp đấu tranh chính trị với vũ trang · '
    + 'xây dựng khối đại đoàn kết trong Mặt trận Việt Minh.',
  khi: 'Câu hỏi thời cơ, diễn biến hoặc bài học của Cách mạng tháng Tám.',
  vd: 'Thời cơ chỉ tồn tại khoảng hai tuần: từ khi Nhật đầu hàng (15/8) đến khi quân Đồng minh vào Đông Dương (đầu tháng 9).',
  bay: 'Thời cơ là điều kiện KHÁCH QUAN, còn lực lượng chuẩn bị suốt mười lăm năm mới là điều kiện CHỦ QUAN. '
     + 'Chỉ có thời cơ mà không có lực lượng thì không giành được chính quyền — đó là ý đề hay hỏi ở mức vận dụng cao.' },

{ nhom: 'B. Việt Nam', cd: 'Kháng chiến chống Pháp', ten: 'Đường lối kháng chiến và vai trò của hậu phương', cap: 3,
  ct: '<b>Đường lối:</b> kháng chiến <b>toàn dân · toàn diện · trường kỳ · tự lực cánh sinh</b> và tranh thủ sự ủng hộ quốc tế.<br>'
    + '· <b>Toàn dân:</b> mỗi người dân là một chiến sĩ, "ai có súng dùng súng, ai có gươm dùng gươm".<br>'
    + '· <b>Toàn diện:</b> đánh địch trên mọi mặt — quân sự, chính trị, kinh tế, văn hoá, ngoại giao.<br>'
    + '· <b>Trường kỳ:</b> ta yếu hơn về trang bị nên phải đánh lâu dài để chuyển hoá so sánh lực lượng.<br>'
    + '<b>Đại hội II của Đảng (2/1951)</b> tại Tuyên Quang: Đảng ra hoạt động công khai với tên Đảng Lao động Việt Nam, '
    + 'thông qua Chính cương mới; lập Mặt trận Liên Việt.<br>'
    + '<b>Hậu phương:</b> tăng gia sản xuất, giảm tô, cải cách ruộng đất từ 1953 để bồi dưỡng sức dân; '
    + 'phong trào bình dân học vụ xoá nạn mù chữ; hàng vạn dân công phục vụ chiến dịch.<br>'
    + '<b>Con số của Điện Biên Phủ:</b> hơn 26 vạn lượt dân công, hàng vạn xe đạp thồ vận chuyển lương thực đạn dược '
    + 'vượt hàng trăm cây số đường rừng.',
  khi: 'Câu hỏi tính chất, đường lối kháng chiến hoặc vai trò hậu phương.',
  vd: 'Xe đạp thồ ở Điện Biên Phủ chở được 200 – 300 kg mỗi chuyến, gấp nhiều lần sức mang vác của một người.',
  bay: '"Trường kỳ" không có nghĩa là kéo dài vô hạn mà là đánh lâu dài để làm thay đổi tương quan lực lượng, '
     + 'rồi mới tập trung cho trận quyết chiến chiến lược. Đề hay hỏi vì sao ta chọn đánh lâu dài.' },

{ nhom: 'B. Việt Nam', cd: 'Kháng chiến chống Mỹ', ten: 'Miền Bắc — hậu phương lớn của tiền tuyến lớn', cap: 3,
  ct: '<b>Vai trò:</b> miền Bắc vừa xây dựng chủ nghĩa xã hội vừa là hậu phương chi viện sức người sức của cho miền Nam.<br>'
    + '<b>Hai tuyến chi viện chiến lược:</b><br>'
    + '· <b>Đường Trường Sơn</b> (đường Hồ Chí Minh trên bộ), mở từ <b>19/5/1959</b>, kéo dài hàng nghìn cây số.<br>'
    + '· <b>Đường Hồ Chí Minh trên biển</b>, dùng "tàu không số" vận chuyển vũ khí vào các bến ở miền Nam.<br>'
    + '<b>Chống hai lần chiến tranh phá hoại của Mỹ:</b><br>'
    + '· Lần một 1965 – 1968, sau sự kiện vịnh Bắc Bộ.<br>'
    + '· Lần hai 1972, đỉnh cao là cuộc tập kích bằng máy bay B-52 vào Hà Nội và Hải Phòng cuối tháng 12, '
    + 'bị đánh bại — trận <b>"Điện Biên Phủ trên không"</b>.<br>'
    + '<b>Khẩu hiệu thời kỳ này:</b> "Thóc không thiếu một cân, quân không thiếu một người", '
    + '"Xe chưa qua, nhà không tiếc".',
  khi: 'Câu hỏi vai trò miền Bắc, tuyến chi viện, hoặc ý nghĩa trận Điện Biên Phủ trên không.',
  vd: 'Thắng lợi cuối tháng 12/1972 buộc Mỹ phải trở lại bàn đàm phán và ký Hiệp định Paris ngày 27/1/1973.',
  bay: 'Đường Trường Sơn mở năm 1959, tức là TRƯỚC khi Mỹ đưa quân viễn chinh vào miền Nam. '
     + 'Đề hay hỏi ngược thứ tự này để bẫy.' },

{ nhom: 'B. Việt Nam', cd: 'Công cuộc Đổi mới', ten: 'Ba chặng của Đổi mới và những con số biết nói', cap: 3,
  ct: '<b>Chặng 1 (1986 – 1995) — khởi đầu và thoát khủng hoảng:</b> Đại hội VI (12/1986) khởi xướng Đổi mới; '
    + 'Khoán 10 trong nông nghiệp; từ nước thiếu lương thực, Việt Nam thành nước <b>xuất khẩu gạo</b> từ năm 1989.<br>'
    + '<b>Chặng 2 (1996 – 2006) — đẩy mạnh công nghiệp hoá, hiện đại hoá:</b> phát triển kinh tế nhiều thành phần, '
    + 'ký Hiệp định Thương mại Việt – Mỹ năm 2000.<br>'
    + '<b>Chặng 3 (2007 đến nay) — hội nhập sâu rộng:</b> gia nhập WTO năm 2007; tham gia các hiệp định thương mại '
    + 'thế hệ mới như CPTPP và EVFTA.<br>'
    + '<b>Nội dung cốt lõi của Đổi mới kinh tế:</b> chuyển từ cơ chế tập trung quan liêu bao cấp sang '
    + '<b>kinh tế thị trường định hướng xã hội chủ nghĩa</b>; thừa nhận nhiều thành phần kinh tế; mở cửa thu hút đầu tư.<br>'
    + '<b>Bài học:</b> đổi mới phải toàn diện nhưng có trọng tâm là kinh tế · lấy dân làm gốc · '
    + 'kết hợp sức mạnh dân tộc với sức mạnh thời đại · giữ vững độc lập tự chủ khi hội nhập.',
  khi: 'Câu hỏi nội dung, thành tựu hoặc bài học của Đổi mới.',
  vd: 'Năm 1988 Việt Nam còn phải nhập khẩu lương thực; đến năm 1989 đã xuất khẩu được hơn một triệu tấn gạo.',
  bay: 'Đổi mới KHÔNG phải là đổi mục tiêu xã hội chủ nghĩa, mà là đổi CÁCH LÀM để đạt mục tiêu đó. '
     + 'Đây là ý phân loại ở câu vận dụng cao.' },

{ nhom: 'B. Việt Nam', cd: 'Hồ Chí Minh', ten: 'Di sản Hồ Chí Minh và sự tôn vinh của thế giới', cap: 3,
  ct: '<b>Năm 1987, UNESCO</b> ra nghị quyết tôn vinh Hồ Chí Minh là <b>Anh hùng giải phóng dân tộc và Nhà văn hoá kiệt xuất của Việt Nam</b>.<br>'
    + '<b>Ba trụ cột trong tư tưởng Hồ Chí Minh:</b><br>'
    + '· <b>Độc lập dân tộc gắn liền với chủ nghĩa xã hội</b> — giành độc lập rồi phải đem lại ấm no tự do cho dân, '
    + '"nước độc lập mà dân không được hưởng hạnh phúc tự do thì độc lập cũng chẳng có nghĩa lý gì".<br>'
    + '· <b>Đại đoàn kết dân tộc</b> — "Đoàn kết, đoàn kết, đại đoàn kết. Thành công, thành công, đại thành công."<br>'
    + '· <b>Xây dựng nhà nước của dân, do dân, vì dân</b> và chăm lo đạo đức cách mạng: cần, kiệm, liêm, chính, chí công vô tư.<br>'
    + '<b>Các tác phẩm lớn:</b> Bản án chế độ thực dân Pháp (1925) · Đường Kách mệnh (1927) · '
    + 'Chính cương vắn tắt và Sách lược vắn tắt (1930) · Tuyên ngôn Độc lập (1945) · Di chúc (1969).<br>'
    + '<b>Vai trò lịch sử:</b> tìm ra con đường cứu nước · sáng lập Đảng · sáng lập Mặt trận Việt Minh · '
    + 'sáng lập nước Việt Nam Dân chủ Cộng hoà · lãnh đạo hai cuộc kháng chiến.',
  khi: 'Câu hỏi vai trò, tư tưởng hoặc sự tôn vinh dành cho Hồ Chí Minh.',
  vd: 'UNESCO tôn vinh năm 1987, nhân dịp kỷ niệm 100 năm ngày sinh của Người sắp tới vào năm 1990.',
  bay: 'Nghị quyết của UNESCO ghi nhận HAI danh hiệu cùng lúc — anh hùng giải phóng dân tộc VÀ nhà văn hoá kiệt xuất. '
     + 'Nhiều bạn chỉ nhớ một vế.' },

{ nhom: 'B. Việt Nam', cd: 'Biển Đông', ten: 'Quá trình xác lập chủ quyền qua các thời kỳ', cap: 3,
  ct: '<b>Thời chúa Nguyễn (thế kỷ XVII – XVIII):</b> lập <b>đội Hoàng Sa</b> và <b>đội Bắc Hải</b> ra khai thác sản vật, '
    + 'đo đạc hải trình — hoạt động của NHÀ NƯỚC, liên tục và hoà bình.<br>'
    + '<b>Thời nhà Nguyễn (thế kỷ XIX):</b> vua Gia Long và vua Minh Mạng cho cắm mốc, dựng bia, vẽ bản đồ, '
    + 'ghi chép trong các bộ sử và địa chí chính thức.<br>'
    + '<b>Thời Pháp thuộc:</b> Pháp nhân danh Việt Nam tiếp tục quản lý, đặt trạm khí tượng trên đảo.<br>'
    + '<b>Sau 1975:</b> Nhà nước Việt Nam thống nhất tiếp tục quản lý; năm 1982 lập huyện đảo Hoàng Sa (Đà Nẵng) '
    + 'và huyện đảo Trường Sa (Khánh Hoà).<br>'
    + '<b>Cơ sở pháp lý quốc tế:</b> <b>Công ước Liên hợp quốc về Luật Biển 1982 (UNCLOS)</b> — Việt Nam phê chuẩn năm 1994. '
    + 'Vùng biển gồm nội thuỷ, lãnh hải 12 hải lí, tiếp giáp lãnh hải 24 hải lí, đặc quyền kinh tế 200 hải lí và thềm lục địa.<br>'
    + '<b>Chủ trương:</b> giải quyết tranh chấp bằng biện pháp hoà bình trên cơ sở luật pháp quốc tế; '
    + 'thực hiện Tuyên bố DOC (2002) và hướng tới Bộ quy tắc COC.',
  khi: 'Câu hỏi cơ sở lịch sử và pháp lý của chủ quyền biển đảo.',
  vd: 'Đội Hoàng Sa là bằng chứng chủ quyền mạnh vì đó là hoạt động do nhà nước tổ chức, diễn ra liên tục và không bị tranh chấp.',
  bay: 'Chủ quyền được khẳng định bằng HAI cơ sở song song: cơ sở lịch sử (chiếm hữu thật sự, liên tục, hoà bình) '
     + 'và cơ sở pháp lý (UNCLOS 1982). Đề hay hỏi tách riêng từng cơ sở.' },

{ nhom: 'B. Việt Nam', cd: 'Chiến tranh bảo vệ Tổ quốc', ten: 'Hai cuộc chiến tranh biên giới sau năm 1975', cap: 3,
  ct: '<b>Biên giới Tây Nam (1975 – 1979):</b> tập đoàn Khmer Đỏ liên tục xâm lấn, tàn sát dân thường Việt Nam. '
    + 'Quân dân ta phản công, và theo yêu cầu của Mặt trận Đoàn kết dân tộc cứu nước Campuchia, '
    + 'quân tình nguyện Việt Nam đã giúp bạn lật đổ chế độ diệt chủng ngày <b>7/1/1979</b>.<br>'
    + '<b>Biên giới phía Bắc (17/2 – 18/3/1979):</b> quân dân sáu tỉnh biên giới chiến đấu bảo vệ từng tấc đất; '
    + 'sau đó tình hình biên giới còn căng thẳng kéo dài tới cuối thập niên 1980.<br>'
    + '<b>Ý nghĩa:</b> bảo vệ vững chắc độc lập chủ quyền và toàn vẹn lãnh thổ; làm tròn nghĩa vụ quốc tế cao cả '
    + 'khi giúp nhân dân Campuchia thoát hoạ diệt chủng.<br>'
    + '<b>Bài học:</b> luôn cảnh giác, giữ vững độc lập tự chủ, kết hợp sức mạnh dân tộc với sức mạnh thời đại, '
    + 'và kiên trì đường lối đối ngoại hoà bình, hữu nghị với các nước láng giềng.',
  khi: 'Câu hỏi các cuộc chiến tranh bảo vệ Tổ quốc sau 1975 và ý nghĩa của chúng.',
  vd: 'Ngày 7/1/1979 được nhân dân Campuchia coi là ngày hồi sinh của dân tộc mình.',
  bay: 'Đây là các cuộc chiến tranh BẢO VỆ Tổ quốc — ta bị xâm lấn trước rồi mới phản công. '
     + 'Việc giúp Campuchia là thực hiện nghĩa vụ quốc tế theo yêu cầu của lực lượng cách mạng nước bạn.' },

{ nhom: 'A. Thế giới', cd: 'Chủ nghĩa xã hội từ 1917', ten: 'Thành tựu của chủ nghĩa xã hội và con đường cải cách', cap: 3,
  ct: '<b>Thành tựu của Liên Xô:</b> từ nước nông nghiệp lạc hậu trở thành cường quốc công nghiệp trong hai kế hoạch năm năm; '
    + 'là lực lượng chủ chốt tiêu diệt chủ nghĩa phát xít trong Chiến tranh thế giới thứ hai; '
    + 'phóng vệ tinh nhân tạo đầu tiên năm <b>1957</b> và đưa con người đầu tiên bay vào vũ trụ năm <b>1961</b>.<br>'
    + '<b>Mở rộng ra thế giới:</b> nước Cộng hoà Nhân dân Trung Hoa ra đời năm 1949; cách mạng Cuba thắng lợi năm 1959; '
    + 'hệ thống xã hội chủ nghĩa trở thành chỗ dựa cho phong trào giải phóng dân tộc, trong đó có Việt Nam.<br>'
    + '<b>Vì sao Liên Xô sụp đổ:</b> mô hình quản lý tập trung quan liêu bao cấp trì trệ, chậm đổi mới công nghệ; '
    + 'công cuộc cải tổ mắc sai lầm, buông lỏng vai trò lãnh đạo; cùng sự chống phá từ bên ngoài.<br>'
    + '<b>Con đường cải cách thành công:</b> Trung Quốc cải cách mở cửa từ năm <b>1978</b>, Việt Nam đổi mới từ năm <b>1986</b> — '
    + 'đều giữ vững định hướng xã hội chủ nghĩa nhưng thay đổi cơ chế kinh tế.',
  khi: 'Câu hỏi thành tựu, nguyên nhân sụp đổ và bài học của chủ nghĩa xã hội thế giới.',
  vd: 'Vệ tinh Sputnik 1 (1957) và chuyến bay của Yuri Gagarin (1961) là hai cột mốc mở đầu kỷ nguyên chinh phục vũ trụ.',
  bay: 'Cái sụp đổ năm 1991 là một MÔ HÌNH cụ thể ở Liên Xô và Đông Âu, không phải toàn bộ con đường xã hội chủ nghĩa. '
     + 'Trung Quốc và Việt Nam vẫn tiếp tục bằng cách cải cách kịp thời — đó là ý so sánh mà đề rất hay hỏi.' }
]);

/* ---------------------------------------------------------- ĐỊA LÍ */
them('dia_ct', [
{ nhom: 'Tự nhiên', cd: 'Vị trí địa lí', ten: 'Toạ độ, phạm vi lãnh thổ và hệ quả của vị trí', cap: 2,
  ct: '<b>Toạ độ phần đất liền:</b> cực Bắc 23°23′B (Hà Giang) · cực Nam 8°34′B (Cà Mau) · '
    + 'cực Tây 102°09′Đ (Điện Biên) · cực Đông 109°24′Đ (Khánh Hoà).<br>'
    + '<b>Ba bộ phận của lãnh thổ:</b> vùng đất (hơn 331 nghìn km², đường bờ biển 3 260 km, đường biên giới trên bộ hơn 4 600 km) · '
    + 'vùng biển (khoảng 1 triệu km²) · vùng trời.<br>'
    + '<b>Hệ quả tự nhiên:</b> nằm trọn trong vùng nội chí tuyến bán cầu Bắc ⇒ khí hậu <b>nhiệt đới</b>; '
    + 'tiếp giáp Biển Đông ⇒ <b>ẩm</b>; nằm trong khu vực gió mùa châu Á ⇒ có <b>gió mùa</b>. '
    + 'Ba yếu tố đó cộng lại thành khí hậu nhiệt đới ẩm gió mùa.<br>'
    + '<b>Hệ quả kinh tế – xã hội:</b> nằm trên ngã tư đường hàng hải và hàng không quốc tế ⇒ thuận lợi giao lưu, hội nhập; '
    + 'nằm trong khu vực kinh tế năng động Đông Nam Á.<br>'
    + '<b>Khó khăn:</b> nhiều thiên tai (bão, lũ, hạn); phải thường xuyên chú trọng bảo vệ chủ quyền vùng biển.',
  khi: 'Câu nhận biết toạ độ, phạm vi; hoặc câu giải thích vì sao nước ta có khí hậu nhiệt đới ẩm gió mùa.',
  vd: 'Lãnh thổ kéo dài trên khoảng 15 vĩ độ nên thiên nhiên phân hoá rõ rệt theo chiều Bắc – Nam.',
  bay: 'Nước ta nằm trong vùng nội chí tuyến nên có khí hậu nhiệt đới, nhưng KHÔNG khô hạn như các nước cùng vĩ độ ở Tây Á '
     + 'và Bắc Phi — nhờ Biển Đông và gió mùa. Đây là câu so sánh đề rất hay ra.' },

{ nhom: 'Tự nhiên', cd: 'Phân hoá thiên nhiên', ten: 'Ba miền địa lí tự nhiên', cap: 3,
  ct: '<b>Miền Bắc và Đông Bắc Bắc Bộ:</b> địa hình đồi núi thấp, hướng vòng cung; '
    + 'gió mùa Đông Bắc xâm nhập mạnh nhất nên có <b>mùa đông lạnh nhất cả nước</b>, nhiều tháng dưới 18 °C.<br>'
    + '<b>Miền Tây Bắc và Bắc Trung Bộ:</b> địa hình cao nhất nước, hướng tây bắc – đông nam; '
    + 'mùa đông đến muộn và kết thúc sớm; có <b>gió phơn Tây Nam</b> khô nóng ở Bắc Trung Bộ vào đầu mùa hạ.<br>'
    + '<b>Miền Nam Trung Bộ và Nam Bộ:</b> khí hậu cận xích đạo gió mùa, nền nhiệt cao quanh năm, '
    + 'phân thành <b>hai mùa mưa – khô rõ rệt</b>; biên độ nhiệt năm nhỏ.<br>'
    + '<b>Ba đai cao (phân hoá theo độ cao):</b>'
    + '<table class="kq">'
    + '<tr><td>Nhiệt đới gió mùa</td><td>dưới 600 – 700 m (miền Bắc) hoặc dưới 900 – 1000 m (miền Nam)</td></tr>'
    + '<tr><td>Cận nhiệt đới gió mùa trên núi</td><td>tới 2 600 m</td></tr>'
    + '<tr><td>Ôn đới gió mùa trên núi</td><td>trên 2 600 m — chỉ có ở Hoàng Liên Sơn</td></tr>'
    + '</table>',
  khi: 'Câu so sánh đặc điểm tự nhiên giữa các miền, hoặc giải thích nguyên nhân phân hoá.',
  vd: 'Cùng vĩ độ nhưng Sa Pa mát quanh năm còn Lào Cai nóng — đó là phân hoá theo ĐỘ CAO, không phải theo vĩ độ.',
  bay: 'Ba nguyên nhân phân hoá phải phân biệt rạch ròi: theo Bắc – Nam là do VĨ ĐỘ và gió mùa Đông Bắc; '
     + 'theo Đông – Tây là do ĐỊA HÌNH chắn gió; theo độ cao là do nhiệt độ giảm khi lên cao.' },

{ nhom: 'Kinh tế – xã hội', cd: 'Dân cư', ten: 'Cơ cấu dân số và vấn đề việc làm', cap: 2,
  ct: '<b>Cơ cấu dân số theo tuổi:</b> nước ta đang trong thời kỳ <b>cơ cấu dân số vàng</b> — '
    + 'số người trong tuổi lao động chiếm tỉ trọng lớn, nhưng đồng thời dân số đang <b>già hoá</b> nhanh.<br>'
    + '<b>Phân bố:</b> rất không đều — đồng bằng chiếm khoảng một phần tư diện tích nhưng tập trung khoảng ba phần tư dân số; '
    + 'Đồng bằng sông Hồng có mật độ cao nhất, Tây Nguyên và Tây Bắc thấp nhất.<br>'
    + '<b>Đô thị hoá:</b> tỉ lệ dân thành thị tăng nhanh nhưng vẫn thấp hơn mức trung bình thế giới; '
    + 'đô thị hoá diễn ra không đồng đều giữa các vùng.<br>'
    + '<b>Vấn đề việc làm:</b> nguồn lao động dồi dào, giá nhân công rẻ, tiếp thu nhanh khoa học kỹ thuật; '
    + 'nhưng tỉ lệ lao động qua đào tạo còn thấp, năng suất chưa cao, thiếu việc làm ở nông thôn và thất nghiệp ở thành thị.<br>'
    + '<b>Hướng giải quyết:</b> phân bố lại dân cư và lao động · đa dạng hoá ngành nghề ở nông thôn · '
    + 'đẩy mạnh đào tạo nghề · xuất khẩu lao động có tổ chức.',
  khi: 'Câu hỏi đặc điểm dân cư, thế mạnh và hạn chế của nguồn lao động.',
  vd: 'Cơ cấu dân số vàng là cơ hội nhưng chỉ kéo dài vài chục năm; không tận dụng kịp thì sẽ "già trước khi giàu".',
  bay: 'Dân số đông vừa là thế mạnh (thị trường lớn, lao động dồi dào) vừa là sức ép (việc làm, y tế, giáo dục, môi trường). '
     + 'Câu vận dụng thường bắt phân tích cả hai mặt.' },

{ nhom: 'Kinh tế – xã hội', cd: 'Ngành kinh tế', ten: 'Ba nhóm ngành và hướng chuyển dịch', cap: 2,
  ct: '<b>Nông – lâm – thuỷ sản:</b> tỉ trọng trong GDP GIẢM dần; chuyển từ trồng trọt sang chăn nuôi và thuỷ sản; '
    + 'trong trồng trọt giảm tỉ trọng cây lương thực, tăng cây công nghiệp và cây ăn quả.<br>'
    + '<b>Công nghiệp – xây dựng:</b> tỉ trọng TĂNG; chuyển từ công nghiệp khai thác sang <b>công nghiệp chế biến, chế tạo</b>; '
    + 'các ngành trọng điểm gồm chế biến lương thực thực phẩm, dệt may – da giày, điện tử, năng lượng, hoá chất.<br>'
    + '<b>Dịch vụ:</b> tỉ trọng cao và ngày càng đa dạng — thương mại, du lịch, giao thông vận tải, tài chính ngân hàng, viễn thông.<br>'
    + '<b>Ba hướng chuyển dịch phải nhớ:</b><br>'
    + '· giữa các NGÀNH: giảm nông nghiệp, tăng công nghiệp và dịch vụ<br>'
    + '· trong NỘI BỘ ngành: từ khai thác thô sang chế biến sâu, từ sản phẩm giá trị thấp sang giá trị cao<br>'
    + '· theo THÀNH PHẦN kinh tế: giảm tỉ trọng khu vực nhà nước, tăng khu vực ngoài nhà nước và khu vực có vốn đầu tư nước ngoài',
  khi: 'Câu nhận xét bảng số liệu hoặc biểu đồ về chuyển dịch cơ cấu kinh tế.',
  vd: 'Tỉ trọng nông nghiệp giảm KHÔNG có nghĩa là sản lượng nông nghiệp giảm — giá trị tuyệt đối vẫn tăng, chỉ là các ngành khác tăng nhanh hơn.',
  bay: 'Đây là bẫy kinh điển: giảm TỈ TRỌNG khác hẳn giảm GIÁ TRỊ. Đọc kỹ đề hỏi cái nào.' },

{ nhom: 'Kinh tế – xã hội', cd: 'Vùng kinh tế', ten: 'Ba vùng kinh tế trọng điểm', cap: 3,
  ct: '<b>Vùng kinh tế trọng điểm</b> là vùng hội tụ đầy đủ nhất các điều kiện phát triển, có ý nghĩa quyết định '
    + 'đối với nền kinh tế cả nước và có tính chất động lực kéo các vùng khác đi lên.<br>'
    + '<b>Vùng trọng điểm phía Bắc:</b> hạt nhân là Hà Nội – Hải Phòng – Quảng Ninh. '
    + 'Thế mạnh: nguồn lao động chất lượng cao, cơ sở hạ tầng tốt, lịch sử khai thác lâu đời.<br>'
    + '<b>Vùng trọng điểm miền Trung:</b> trải từ Thừa Thiên Huế tới Bình Định. '
    + 'Thế mạnh: vị trí trung chuyển, cảng biển nước sâu, du lịch biển đảo và di sản.<br>'
    + '<b>Vùng trọng điểm phía Nam:</b> hạt nhân là TP Hồ Chí Minh – Bình Dương – Đồng Nai – Bà Rịa – Vũng Tàu. '
    + '<b>Đây là vùng phát triển năng động nhất</b>: dẫn đầu về GDP, giá trị công nghiệp và thu hút đầu tư nước ngoài. '
    + 'Thế mạnh riêng: dầu khí thềm lục địa, hạ tầng và nguồn nhân lực tốt nhất nước.<br>'
    + '<b>Về sau còn hình thành thêm vùng trọng điểm Đồng bằng sông Cửu Long</b>, hạt nhân là Cần Thơ, '
    + 'với thế mạnh lúa gạo và thuỷ sản.',
  khi: 'Câu so sánh thế mạnh giữa các vùng, hoặc giải thích vì sao một vùng phát triển nhất.',
  vd: 'Vùng trọng điểm phía Nam dẫn đầu vì hội tụ cùng lúc ba yếu tố: hạ tầng tốt nhất, lao động chất lượng cao và tài nguyên dầu khí.',
  bay: 'Phân biệt VÙNG KINH TẾ (bảy vùng, chia theo lãnh thổ) với VÙNG KINH TẾ TRỌNG ĐIỂM (chia theo vai trò động lực). '
     + 'Một tỉnh có thể thuộc cả hai cách chia.' },

{ nhom: 'Kinh tế – xã hội', cd: 'Kinh tế biển đảo', ten: 'Năm ngành kinh tế biển và vấn đề khai thác bền vững', cap: 2,
  ct: '<b>Năm ngành kinh tế biển:</b><br>'
    + '· <b>Khai thác và nuôi trồng thuỷ sản:</b> bốn ngư trường trọng điểm là Cà Mau – Kiên Giang, Ninh Thuận – Bình Thuận – Bà Rịa – Vũng Tàu, '
    + 'Hải Phòng – Quảng Ninh, và quần đảo Hoàng Sa – Trường Sa.<br>'
    + '· <b>Khai thác khoáng sản:</b> dầu khí ở thềm lục địa phía Nam là ngành mũi nhọn; ngoài ra có titan, cát thuỷ tinh, muối.<br>'
    + '· <b>Du lịch biển đảo:</b> bãi biển đẹp trải dài, nhiều di sản và vịnh nổi tiếng.<br>'
    + '· <b>Giao thông vận tải biển:</b> nằm gần tuyến hàng hải quốc tế, có nhiều vũng vịnh làm cảng nước sâu.<br>'
    + '· <b>Năng lượng tái tạo trên biển:</b> điện gió ngoài khơi đang được đẩy mạnh.<br>'
    + '<b>Vì sao phải khai thác TỔNG HỢP:</b> tài nguyên biển đa dạng nhưng gắn bó với nhau; khai thác riêng lẻ một ngành '
    + 'dễ làm hỏng điều kiện của ngành khác. Môi trường biển lại rất nhạy cảm, ô nhiễm một chỗ lan ra cả vùng.<br>'
    + '<b>Ý nghĩa của đảo và quần đảo:</b> vừa là căn cứ hậu cần cho khai thác xa bờ, vừa là <b>cơ sở khẳng định chủ quyền</b> '
    + 'đối với vùng biển và thềm lục địa.',
  khi: 'Câu hỏi thế mạnh kinh tế biển, hoặc ý nghĩa của đảo và quần đảo.',
  vd: 'Nếu chỉ lo khai thác dầu khí mà để tràn dầu thì du lịch biển và nuôi trồng thuỷ sản cùng thiệt hại — đó là lí do phải khai thác tổng hợp.',
  bay: 'Ý nghĩa của đảo luôn có HAI mặt: kinh tế và quốc phòng – chủ quyền. Câu vận dụng thường yêu cầu nêu đủ cả hai.' }
]);

/* ---------------------------------------------------- GDKT & PHÁP LUẬT */
them('gdkt_ct', [
{ nhom: 'Kinh tế', cd: 'Tăng trưởng – Phát triển', ten: 'Phân biệt tăng trưởng với phát triển, và phát triển bền vững', cap: 2,
  ct: '<b>Tăng trưởng kinh tế</b> là sự gia tăng về LƯỢNG của nền kinh tế trong một thời kỳ, đo bằng GDP, GNI hoặc GDP bình quân đầu người.<br>'
    + '<b>Phát triển kinh tế</b> rộng hơn, gồm ba nội dung: tăng trưởng kinh tế · chuyển dịch cơ cấu kinh tế theo hướng tiến bộ · '
    + 'tiến bộ xã hội (giảm nghèo, nâng cao y tế, giáo dục, tuổi thọ).<br>'
    + '<b>Quan hệ:</b> tăng trưởng là ĐIỀU KIỆN CẦN của phát triển, nhưng tăng trưởng cao mà bất bình đẳng tăng, '
    + 'môi trường suy thoái thì chưa gọi là phát triển.<br>'
    + '<b>Phát triển bền vững</b> đứng trên ba trụ cột đồng thời: <b>kinh tế · xã hội · môi trường</b>. '
    + 'Nghĩa là đáp ứng nhu cầu hiện tại mà không làm tổn hại khả năng đáp ứng nhu cầu của thế hệ tương lai.<br>'
    + '<b>Chỉ số phát triển con người HDI</b> gộp ba mặt: sức khoẻ (tuổi thọ) · tri thức (số năm đi học) · '
    + 'mức sống (thu nhập bình quân đầu người).',
  khi: 'Câu phân biệt khái niệm, hoặc tình huống đánh giá một mô hình tăng trưởng.',
  vd: 'Một địa phương tăng GDP nhờ khai thác cạn kiệt rừng thì có tăng trưởng nhưng không phát triển bền vững.',
  bay: 'Tăng trưởng đo bằng SỐ; phát triển còn đo bằng CHẤT. Đề rất hay cho một tình huống GDP tăng nhưng ô nhiễm nặng '
     + 'rồi hỏi đó là tăng trưởng hay phát triển bền vững.' },

{ nhom: 'Kinh tế', cd: 'Bảo hiểm – An sinh', ten: 'Các loại bảo hiểm và chế độ được hưởng', cap: 2,
  ct: '<b>Bảo hiểm xã hội</b> — bù đắp thu nhập khi người lao động bị giảm hoặc mất thu nhập.<br>'
    + '· <b>Bắt buộc:</b> gồm ốm đau · thai sản · tai nạn lao động và bệnh nghề nghiệp · hưu trí · tử tuất.<br>'
    + '· <b>Tự nguyện:</b> người tham gia tự chọn mức đóng, được hưởng chế độ hưu trí và tử tuất.<br>'
    + '<b>Bảo hiểm y tế</b> — chi trả chi phí khám chữa bệnh; nhiều nhóm được ngân sách nhà nước đóng hoặc hỗ trợ.<br>'
    + '<b>Bảo hiểm thất nghiệp</b> — trợ cấp thất nghiệp, hỗ trợ học nghề và tư vấn giới thiệu việc làm.<br>'
    + '<b>Bảo hiểm thương mại</b> khác hẳn ba loại trên: do doanh nghiệp bảo hiểm cung cấp, tham gia theo hợp đồng '
    + 'trên nguyên tắc tự nguyện và có mục tiêu lợi nhuận.<br>'
    + '<b>An sinh xã hội</b> là hệ thống rộng hơn, gồm bốn tầng: việc làm và thu nhập · bảo hiểm xã hội · '
    + 'trợ giúp xã hội cho nhóm yếu thế · bảo đảm dịch vụ xã hội cơ bản (y tế, giáo dục, nhà ở, nước sạch, thông tin).',
  khi: 'Câu tình huống: một người gặp rủi ro, hỏi được hưởng chế độ nào hoặc thuộc loại bảo hiểm nào.',
  vd: 'Người lao động nghỉ sinh con được hưởng chế độ thai sản của bảo hiểm xã hội BẮT BUỘC, không phải bảo hiểm y tế.',
  bay: 'Bảo hiểm xã hội TỰ NGUYỆN chỉ có hai chế độ là hưu trí và tử tuất — không có ốm đau, thai sản, tai nạn lao động. '
     + 'Đây là chỗ đề bẫy nhiều nhất.' },

{ nhom: 'Kinh tế', cd: 'Quản lí thu chi', ten: 'Nguyên tắc lập kế hoạch chi tiêu cá nhân', cap: 1,
  ct: '<b>Bốn bước lập kế hoạch tài chính cá nhân:</b> xác định mục tiêu và thời hạn · xác định nguồn thu nhập · '
    + 'phân bổ các khoản chi · theo dõi và điều chỉnh.<br>'
    + '<b>Phân loại chi tiêu:</b> khoản chi <b>thiết yếu</b> (ăn, ở, đi lại, học hành, y tế) và khoản chi '
    + '<b>không thiết yếu</b> (giải trí, mua sắm theo sở thích). Khi thu nhập giảm thì cắt khoản không thiết yếu trước.<br>'
    + '<b>Quy tắc 50 – 30 – 20 thường được nhắc tới:</b> 50% thu nhập cho nhu cầu thiết yếu, 30% cho mong muốn cá nhân, '
    + '20% để tiết kiệm và đầu tư.<br>'
    + '<b>Ba loại mục tiêu theo thời hạn:</b> ngắn hạn (dưới 1 năm) · trung hạn (1 – 5 năm) · dài hạn (trên 5 năm). '
    + 'Mục tiêu tốt phải cụ thể, đo được và có mốc thời gian.<br>'
    + '<b>Quỹ dự phòng:</b> nên có khoản tiết kiệm đủ chi tiêu khoảng ba tới sáu tháng để phòng rủi ro mất thu nhập.',
  khi: 'Câu tình huống về lập kế hoạch chi tiêu hoặc đánh giá thói quen tài chính.',
  vd: 'Thu nhập 10 triệu một tháng, theo quy tắc 50 – 30 – 20 thì dành 5 triệu cho thiết yếu, 3 triệu cho mong muốn, 2 triệu tiết kiệm.',
  bay: 'Tiết kiệm nên được TRÍCH RA NGAY khi có thu nhập, chứ không phải chờ cuối tháng còn dư mới để dành — '
     + 'đây là nguyên tắc mà đề hay hỏi dưới dạng tình huống.' },

{ nhom: 'Kinh tế', cd: 'Doanh nghiệp – Thuế', ten: 'Các loại thuế phổ biến và nghĩa vụ của doanh nghiệp', cap: 2,
  ct: '<b>Thuế trực thu</b> — người nộp thuế đồng thời là người chịu thuế: thuế thu nhập cá nhân, thuế thu nhập doanh nghiệp.<br>'
    + '<b>Thuế gián thu</b> — người nộp là doanh nghiệp nhưng người chịu là người tiêu dùng qua giá hàng hoá: '
    + 'thuế giá trị gia tăng (VAT), thuế tiêu thụ đặc biệt, thuế xuất nhập khẩu.<br>'
    + '<b>Thuế tiêu thụ đặc biệt</b> đánh vào hàng hoá dịch vụ nhà nước không khuyến khích tiêu dùng: '
    + 'rượu bia, thuốc lá, ô tô, xăng, kinh doanh vũ trường, casino.<br>'
    + '<b>Bốn vai trò của thuế:</b> nguồn thu chủ yếu của ngân sách · công cụ điều tiết vĩ mô · '
    + 'công cụ phân phối lại thu nhập, giảm chênh lệch giàu nghèo · công cụ hướng dẫn tiêu dùng và sản xuất.<br>'
    + '<b>Nghĩa vụ của doanh nghiệp:</b> đăng ký kinh doanh và đăng ký thuế · kê khai và nộp thuế đầy đủ, đúng hạn · '
    + 'thực hiện chế độ kế toán, hoá đơn chứng từ · bảo đảm quyền lợi người lao động · bảo vệ môi trường.',
  khi: 'Câu phân loại thuế hoặc tình huống doanh nghiệp vi phạm nghĩa vụ thuế.',
  vd: 'Mua một chai rượu, người tiêu dùng gián tiếp chịu cả thuế giá trị gia tăng lẫn thuế tiêu thụ đặc biệt nằm trong giá bán.',
  bay: 'Phân biệt trực thu với gián thu bằng câu hỏi: người NỘP tiền cho nhà nước có phải người CHỊU gánh nặng thuế không? '
     + 'Nếu doanh nghiệp nộp hộ rồi tính vào giá bán thì đó là gián thu.' },

{ nhom: 'Pháp luật', cd: 'Pháp luật quốc tế', ten: 'Đặc điểm của pháp luật quốc tế và cách áp dụng', cap: 3,
  ct: '<b>Khái niệm:</b> pháp luật quốc tế là hệ thống các nguyên tắc và quy phạm do các quốc gia và chủ thể khác '
    + 'thoả thuận xây dựng, điều chỉnh quan hệ giữa họ với nhau.<br>'
    + '<b>Ba đặc điểm khác hẳn pháp luật quốc gia:</b><br>'
    + '· được hình thành bằng <b>thoả thuận</b> giữa các chủ thể bình đẳng, không có cơ quan lập pháp đứng trên<br>'
    + '· không có bộ máy cưỡng chế tập trung; việc thực hiện chủ yếu dựa vào <b>tự nguyện</b> và các biện pháp tập thể<br>'
    + '· chủ thể chủ yếu là <b>quốc gia</b>, ngoài ra có tổ chức quốc tế liên chính phủ và một số chủ thể đặc biệt<br>'
    + '<b>Bảy nguyên tắc cơ bản:</b> bình đẳng chủ quyền · không can thiệp nội bộ · cấm dùng vũ lực hoặc đe doạ dùng vũ lực · '
    + 'giải quyết tranh chấp bằng biện pháp hoà bình · các quốc gia có nghĩa vụ hợp tác · dân tộc tự quyết · '
    + 'tận tâm thực hiện cam kết quốc tế.<br>'
    + '<b>Quan hệ với pháp luật Việt Nam:</b> khi điều ước quốc tế mà Việt Nam là thành viên có quy định khác với '
    + 'luật trong nước thì áp dụng <b>điều ước quốc tế</b>, trừ Hiến pháp.',
  khi: 'Câu phân biệt pháp luật quốc tế với pháp luật quốc gia, hoặc tình huống về điều ước.',
  vd: 'Công ước Liên hợp quốc về Luật Biển 1982 là cơ sở pháp lý để Việt Nam xác định các vùng biển của mình.',
  bay: 'Pháp luật quốc tế KHÔNG có cảnh sát quốc tế cưỡng chế thi hành — đó là điểm khác biệt lớn nhất so với pháp luật quốc gia. '
     + 'Nhưng vi phạm vẫn phải chịu trách nhiệm pháp lý quốc tế.' },

{ nhom: 'Kinh tế', cd: 'Lập kế hoạch kinh doanh', ten: 'Từ ý tưởng tới bản kế hoạch — các bước và công cụ', cap: 2,
  ct: '<b>Ý tưởng kinh doanh tốt</b> phải xuất phát từ một NHU CẦU có thật của thị trường và phải có tính khả thi.<br>'
    + '<b>Cơ hội kinh doanh</b> là điều kiện thuận lợi của hoàn cảnh để biến ý tưởng thành lợi nhuận: '
    + 'nhu cầu mới xuất hiện, công nghệ mới, chính sách hỗ trợ, đối thủ rút lui.<br>'
    + '<b>Phân tích SWOT — bốn ô phải điền đúng chỗ:</b>'
    + '<table class="kq">'
    + '<tr><td>S — Điểm mạnh</td><td>bên TRONG, có lợi</td></tr>'
    + '<tr><td>W — Điểm yếu</td><td>bên TRONG, bất lợi</td></tr>'
    + '<tr><td>O — Cơ hội</td><td>bên NGOÀI, có lợi</td></tr>'
    + '<tr><td>T — Thách thức</td><td>bên NGOÀI, bất lợi</td></tr>'
    + '</table>'
    + '<b>Các phần của bản kế hoạch kinh doanh:</b> ý tưởng và mục tiêu · khách hàng mục tiêu · '
    + 'sản phẩm và lợi thế cạnh tranh · kế hoạch tài chính (vốn, doanh thu, chi phí) · kế hoạch nhân sự và marketing · '
    + 'đánh giá rủi ro.<br>'
    + '<b>Điểm hoà vốn</b> là mức sản lượng mà doanh thu vừa đủ bù đắp tổng chi phí; bán vượt mức đó mới bắt đầu có lãi.',
  khi: 'Câu tình huống phân tích SWOT hoặc nhận diện cơ hội kinh doanh.',
  vd: '"Mặt bằng thuê giá rẻ ở gần trường học" là CƠ HỘI (bên ngoài), còn "chủ quán có tay nghề pha chế" là ĐIỂM MẠNH (bên trong).',
  bay: 'Bẫy SWOT quen thuộc nhất: nhầm cơ hội với điểm mạnh. Hỏi một câu là ra — yếu tố này thuộc về BẢN THÂN doanh nghiệp '
     + 'hay thuộc về MÔI TRƯỜNG bên ngoài?' },

{ nhom: 'Kinh tế', cd: 'Trách nhiệm xã hội của doanh nghiệp', ten: 'Lợi ích của trách nhiệm xã hội và các vi phạm thường gặp', cap: 2,
  ct: '<b>Bốn cấp độ (mô hình kim tự tháp), từ dưới lên:</b> trách nhiệm <b>kinh tế</b> (làm ăn có lãi, tạo việc làm) → '
    + 'trách nhiệm <b>pháp lý</b> (tuân thủ pháp luật) → trách nhiệm <b>đạo đức</b> (làm điều đúng dù luật chưa buộc) → '
    + 'trách nhiệm <b>từ thiện</b> (đóng góp cho cộng đồng).<br>'
    + '<b>Doanh nghiệp được gì khi làm tốt:</b> xây dựng uy tín và thương hiệu · giữ chân người lao động giỏi · '
    + 'tạo lòng tin với khách hàng và đối tác · giảm rủi ro pháp lý · phát triển lâu dài.<br>'
    + '<b>Các vi phạm thường gặp trong đề:</b> xả thải chưa qua xử lý ra sông · sản xuất hàng giả, hàng kém chất lượng · '
    + 'quảng cáo sai sự thật · nợ lương và không đóng bảo hiểm cho người lao động · trốn thuế.<br>'
    + '<b>Trách nhiệm pháp lý tương ứng:</b> tuỳ mức độ có thể bị xử phạt hành chính, bồi thường thiệt hại dân sự, '
    + 'hoặc bị truy cứu trách nhiệm hình sự (pháp nhân thương mại cũng có thể bị truy cứu hình sự).',
  khi: 'Câu tình huống doanh nghiệp làm sai, hỏi vi phạm trách nhiệm nào và chịu hậu quả gì.',
  vd: 'Doanh nghiệp xả thải chưa xử lý vừa vi phạm trách nhiệm PHÁP LÝ vừa vi phạm trách nhiệm ĐẠO ĐỨC với cộng đồng.',
  bay: 'Trách nhiệm KINH TẾ nằm ở đáy kim tự tháp — làm ăn có lãi cũng là một trách nhiệm xã hội, '
     + 'vì doanh nghiệp thua lỗ thì không tạo được việc làm và không đóng góp ngân sách. Nhiều bạn nghĩ trách nhiệm xã hội chỉ là từ thiện.' }
]);

/* ---------------------------------------------------------- NGỮ VĂN */
them('van_ct', [
{ nhom: 'Cấu trúc đề', cd: 'Cấu trúc đề', ten: 'Thang điểm từng câu và cách không mất điểm oan', cap: 1,
  ct: '<b>Đề Ngữ văn 2025 — 120 phút, hai phần:</b><br>'
    + '· <b>Phần Đọc hiểu (4,0 điểm)</b> — 5 câu hỏi trên một ngữ liệu ngoài sách giáo khoa.<br>'
    + '· <b>Phần Viết (6,0 điểm)</b> — một đoạn nghị luận (2,0đ) và một bài nghị luận (4,0đ).<br>'
    + '<b>Thang điểm câu Đọc hiểu:</b> hai câu đầu thường 0,5đ mỗi câu (nhận biết, trả lời một dòng là đủ); '
    + 'các câu sau 1,0đ (phân tích tác dụng, nêu suy nghĩ) cần trả lời thành ý rõ ràng.<br>'
    + '<b>Bốn lỗi mất điểm oan:</b><br>'
    + '· trả lời câu nhận biết mà viết lan man, không gạch được ý chính<br>'
    + '· hỏi "tác dụng" mà chỉ gọi tên biện pháp, không nêu hiệu quả<br>'
    + '· viết đoạn văn nhưng lại xuống dòng nhiều lần thành nhiều đoạn<br>'
    + '· không đúng dung lượng yêu cầu (đoạn 200 chữ, bài khoảng 600 chữ)<br>'
    + '<b>Điểm hình thức luôn có:</b> chính tả, dùng từ, đặt câu, bố cục — viết sạch và đúng cấu trúc là ăn sẵn phần điểm này.',
  khi: 'Trước khi làm bài, để phân bổ thời gian và biết câu nào cần viết dài.',
  vd: 'Câu 0,5đ hỏi "xác định thể thơ" thì trả lời đúng một dòng: "Thể thơ tự do." Viết thêm không được thêm điểm.',
  bay: 'Đoạn văn 200 chữ phải là MỘT đoạn — không xuống dòng, không tách ý thành nhiều khối. '
     + 'Xuống dòng là mất điểm hình thức ngay dù nội dung tốt.' },

{ nhom: 'Đọc hiểu', cd: 'Biện pháp tu từ', ten: 'Nhận diện nhanh và công thức nêu tác dụng', cap: 2,
  ct: '<b>Dấu hiệu nhận diện nhanh:</b>'
    + '<table class="kq">'
    + '<tr><td>So sánh</td><td>có từ so sánh: như, tựa, giống, bao nhiêu… bấy nhiêu</td></tr>'
    + '<tr><td>Ẩn dụ</td><td>gọi tên vật này bằng tên vật khác có nét GIỐNG nhau, không có từ so sánh</td></tr>'
    + '<tr><td>Hoán dụ</td><td>gọi bằng tên vật GẦN nhau về quan hệ: bộ phận – toàn thể, dấu hiệu – sự vật</td></tr>'
    + '<tr><td>Nhân hoá</td><td>gán hoạt động, tính chất của người cho vật</td></tr>'
    + '<tr><td>Điệp</td><td>lặp lại từ, ngữ hoặc cấu trúc câu</td></tr>'
    + '<tr><td>Liệt kê</td><td>kể hàng loạt sự vật cùng loại, thường ngăn bằng dấu phẩy</td></tr>'
    + '<tr><td>Nói quá</td><td>phóng đại mức độ để nhấn mạnh</td></tr>'
    + '<tr><td>Nói giảm nói tránh</td><td>diễn đạt nhẹ đi để tránh thô hoặc tránh đau buồn</td></tr>'
    + '</table>'
    + '<b>Công thức trả lời tác dụng — luôn đủ ba ý:</b><br>'
    + '① Gọi TÊN biện pháp và chỉ rõ nó nằm ở từ ngữ, hình ảnh nào.<br>'
    + '② Tác dụng về NỘI DUNG: làm nổi bật điều gì, gợi ra hình ảnh hay cảm xúc nào.<br>'
    + '③ Tác dụng về NGHỆ THUẬT và thái độ tác giả: câu văn sinh động, giàu hình ảnh, thể hiện tình cảm gì.',
  khi: 'Câu 1,0 điểm phần Đọc hiểu — dạng hỏi tác dụng, gần như đề nào cũng có.',
  vd: '"Mặt trời của mẹ, em nằm trên lưng" — ẩn dụ, ví đứa con với mặt trời, nhấn mạnh con là nguồn sống và niềm tin của mẹ.',
  bay: 'Chỉ gọi tên biện pháp thì thường chỉ được nửa số điểm. Phải nêu bằng được TÁC DỤNG, '
     + 'và tác dụng phải bám vào chính câu văn trong ngữ liệu chứ không nói chung chung.' },

{ nhom: 'Viết', cd: 'Nghị luận xã hội', ten: 'Hai kiểu đề nghị luận xã hội và cách triển khai', cap: 2,
  ct: '<b>Kiểu 1 — nghị luận về một TƯ TƯỞNG, ĐẠO LÍ</b> (lòng biết ơn, ý chí, sự tử tế…):<br>'
    + 'giải thích khái niệm → phân tích biểu hiện và ý nghĩa → dẫn chứng → bàn luận mở rộng, phê phán mặt trái → bài học hành động.<br>'
    + '<b>Kiểu 2 — nghị luận về một HIỆN TƯỢNG ĐỜI SỐNG</b> (nghiện mạng xã hội, rác thải nhựa…):<br>'
    + 'nêu thực trạng → chỉ ra nguyên nhân → phân tích hậu quả → đề xuất giải pháp → liên hệ bản thân.<br>'
    + '<b>Cách phân biệt nhanh:</b> đề nói về một PHẨM CHẤT hay quan niệm sống thì là tư tưởng đạo lí; '
    + 'đề nói về một SỰ VIỆC đang diễn ra trong xã hội thì là hiện tượng đời sống.<br>'
    + '<b>Dẫn chứng:</b> nên lấy từ thực tế gần gũi và có tính thời sự, nêu ngắn gọn rồi phân tích — '
    + 'kể dài mà không phân tích thì dẫn chứng thành thừa.<br>'
    + '<b>Với đoạn 200 chữ:</b> viết liền một đoạn, khoảng 5 – 7 câu, mỗi ý một câu, câu cuối là bài học hoặc thông điệp.',
  khi: 'Câu viết đoạn 2,0 điểm và bài nghị luận xã hội.',
  vd: 'Đề "Suy nghĩ về giá trị của sự tử tế" là tư tưởng đạo lí; đề "Hiện tượng học sinh nghiện điện thoại" là hiện tượng đời sống.',
  bay: 'Nhận nhầm kiểu đề là lệch cả dàn ý. Hiện tượng đời sống mà đi giải thích khái niệm dài dòng '
     + 'thì thiếu mất phần thực trạng và giải pháp — mất điểm nội dung nặng.' },

{ nhom: 'Viết', cd: 'Thể loại', ten: 'Đọc thơ, truyện và kí — mỗi thể loại soi cái gì', cap: 2,
  ct: '<b>Thơ — soi bốn thứ:</b> thể thơ và cách gieo vần, ngắt nhịp · hình ảnh và biện pháp tu từ · '
    + 'mạch cảm xúc của chủ thể trữ tình · giọng điệu.<br>'
    + '<b>Truyện — soi bốn thứ:</b> cốt truyện và tình huống truyện · nhân vật (ngoại hình, hành động, lời nói, nội tâm) · '
    + 'ngôi kể và điểm nhìn · không gian, thời gian nghệ thuật.<br>'
    + '<b>Kí và tản văn — soi:</b> cái tôi tác giả · chất liệu đời sống thật · sự kết hợp tự sự với trữ tình.<br>'
    + '<b>Kịch — soi:</b> xung đột kịch · hành động và lời thoại · chỉ dẫn sân khấu.<br>'
    + '<b>Tình huống truyện</b> là hoàn cảnh đặc biệt buộc nhân vật bộc lộ bản chất — '
    + 'phân tích truyện mà bỏ qua tình huống là bỏ mất chìa khoá.<br>'
    + '<b>Ngôi kể:</b> ngôi thứ nhất (xưng tôi) tạo cảm giác chân thực, gần gũi; '
    + 'ngôi thứ ba giúp bao quát rộng và khách quan hơn.',
  khi: 'Bài nghị luận văn học 4,0 điểm — biết soi đúng đặc trưng thể loại thì bài mới có chiều sâu.',
  vd: 'Phân tích một truyện ngắn mà không nói tới tình huống truyện và điểm nhìn thì mới chỉ là kể lại nội dung.',
  bay: 'Đề 2025 dùng ngữ liệu NGOÀI sách giáo khoa, nên không thể học thuộc bài mẫu. '
     + 'Cái ăn điểm là KỸ NĂNG đọc theo đặc trưng thể loại — đó mới là thứ mang vào phòng thi được.' },

{ nhom: 'Tiếng Việt', cd: 'Tiếng Việt', ten: 'Phong cách ngôn ngữ và phương thức biểu đạt', cap: 2,
  ct: '<b>Sáu phương thức biểu đạt:</b>'
    + '<table class="kq">'
    + '<tr><td>Tự sự</td><td>kể chuỗi sự việc có nhân vật, diễn biến</td></tr>'
    + '<tr><td>Miêu tả</td><td>tái hiện đặc điểm, hình ảnh cho người đọc hình dung</td></tr>'
    + '<tr><td>Biểu cảm</td><td>bộc lộ tình cảm, cảm xúc</td></tr>'
    + '<tr><td>Nghị luận</td><td>nêu ý kiến, lí lẽ, dẫn chứng để thuyết phục</td></tr>'
    + '<tr><td>Thuyết minh</td><td>cung cấp tri thức khách quan, có số liệu, định nghĩa</td></tr>'
    + '<tr><td>Hành chính – công vụ</td><td>văn bản có thể thức: đơn, báo cáo, nghị định</td></tr>'
    + '</table>'
    + '<b>Sáu phong cách ngôn ngữ:</b> sinh hoạt (lời nói hằng ngày) · nghệ thuật (văn thơ) · '
    + 'báo chí (tin, phóng sự) · chính luận (bài bình luận chính trị) · khoa học (bài nghiên cứu) · hành chính (văn bản nhà nước).<br>'
    + '<b>Mẹo nhận diện:</b> có số liệu và thuật ngữ ⇒ khoa học hoặc thuyết minh · có nhân vật và diễn biến ⇒ tự sự · '
    + 'có lí lẽ và dẫn chứng để bảo vệ quan điểm ⇒ nghị luận · có hình ảnh, nhịp điệu, biện pháp tu từ ⇒ nghệ thuật.',
  khi: 'Câu nhận biết 0,5 điểm mở đầu phần Đọc hiểu.',
  vd: 'Một đoạn trích có số liệu thống kê về rác thải nhựa và lời kêu gọi hành động — phương thức chính là NGHỊ LUẬN, có kết hợp thuyết minh.',
  bay: 'Một văn bản thường dùng NHIỀU phương thức; đề hỏi "phương thức biểu đạt CHÍNH" thì chỉ chọn một — '
     + 'cái chi phối toàn bộ đoạn, không phải cái xuất hiện thoáng qua.' },

{ nhom: 'Kỹ năng', cd: 'Kĩ năng làm bài', ten: 'Chiến thuật 120 phút và thứ tự làm bài', cap: 1,
  ct: '<b>Phân bổ thời gian gợi ý:</b>'
    + '<table class="kq">'
    + '<tr><td>Đọc hiểu (4,0đ)</td><td>25 – 30 phút</td></tr>'
    + '<tr><td>Đoạn nghị luận (2,0đ)</td><td>20 – 25 phút</td></tr>'
    + '<tr><td>Bài nghị luận (4,0đ)</td><td>55 – 60 phút</td></tr>'
    + '<tr><td>Soát lại</td><td>5 – 10 phút</td></tr>'
    + '</table>'
    + '<b>Thứ tự nên làm:</b> Đọc hiểu trước (điểm chắc, làm nhanh) → đoạn nghị luận → bài nghị luận. '
    + 'Không để bài dài chiếm hết thời gian rồi bỏ dở câu dễ.<br>'
    + '<b>Ba phút đầu:</b> đọc lướt toàn đề, gạch chân yêu cầu của từng câu, xác định kiểu bài của phần Viết.<br>'
    + '<b>Luôn lập dàn ý ra nháp</b> trước khi viết bài lớn — chỉ cần ba tới bốn gạch đầu dòng, mất hai phút '
    + 'nhưng tránh được lạc đề và thiếu ý.<br>'
    + '<b>Nguyên tắc vàng:</b> thà mỗi câu viết đủ ý còn hơn một câu viết thật hay mà bỏ trống câu khác. '
    + 'Điểm chấm theo Ý, không theo độ dài.',
  khi: 'Áp dụng ngay khi nhận đề.',
  vd: 'Còn 15 phút mà chưa viết bài lớn thì viết ngay mở bài, thân bài gạch các luận điểm chính rồi kết bài — vẫn được điểm ý.',
  bay: 'Bỏ trống hoàn toàn một câu là mất trắng phần điểm đó. Viết được ý nào chấm ý đó, nên không bao giờ để giấy trắng.' }
]);

/* ------------------------------------------------------- TIẾNG ANH */
them('anh_ct', [
{ nhom: 'Ngữ pháp', cd: 'Câu điều kiện', ten: 'Câu điều kiện hỗn hợp và đảo ngữ trong câu điều kiện', cap: 3,
  ct: '<b>Điều kiện hỗn hợp — loại đề hay ra để phân loại:</b><br>'
    + '· <b>Quá khứ ảnh hưởng hiện tại:</b> If + had P2, S + would + V.<br>'
    + '<i>If I had studied harder, I would be a doctor now.</i><br>'
    + '· <b>Hiện tại ảnh hưởng quá khứ:</b> If + V2/V-ed, S + would have + P2.<br>'
    + '<i>If she were more careful, she would not have made that mistake.</i><br>'
    + '<b>Đảo ngữ — bỏ if, đưa trợ động từ lên đầu:</b>'
    + '<table class="kq">'
    + '<tr><td>Loại 1</td><td>Should + S + V… <i>Should you need help, call me.</i></td></tr>'
    + '<tr><td>Loại 2</td><td>Were + S + to V / Were + S + … <i>Were I you, I would go.</i></td></tr>'
    + '<tr><td>Loại 3</td><td>Had + S + P2 <i>Had he known, he would have come.</i></td></tr>'
    + '</table>'
    + '<b>Dạng thay thế if:</b> unless = if not · provided that / as long as = miễn là · '
    + 'in case = phòng khi · but for + N = nếu không có.<br>'
    + '<b>Câu ước:</b> wish + V2/were (ước hiện tại) · wish + had P2 (ước quá khứ) · '
    + 'wish + would V (ước ai đó thay đổi thói quen, thường mang ý phàn nàn).',
  khi: 'Câu ngữ pháp mức vận dụng và câu viết lại nghĩa không đổi.',
  vd: 'Had it not been for your help, I would have failed. = If it had not been for your help… = But for your help…',
  bay: 'Trong đảo ngữ loại 3, dạng phủ định KHÔNG rút gọn: viết "Had he not come" chứ không viết "Hadn\\u2019t he come". '
     + 'Đây là bẫy rất hay gặp.' },

{ nhom: 'Ngữ pháp', cd: 'Bị động – Tường thuật', ten: 'Bị động đặc biệt và tường thuật câu hỏi, mệnh lệnh', cap: 3,
  ct: '<b>Bị động với động từ tường thuật:</b> People say that he is rich → <i>It is said that he is rich</i> '
    + 'hoặc <i>He is said to be rich</i>. Nếu hành động xảy ra TRƯỚC thì dùng to have P2: <i>He is said to have been rich</i>.<br>'
    + '<b>Bị động của have/get:</b> have something done = nhờ ai làm gì. <i>I had my car repaired.</i><br>'
    + '<b>Bị động với hai tân ngữ:</b> They gave me a book → <i>I was given a book</i> hoặc <i>A book was given to me</i>.<br>'
    + '<b>Tường thuật — lùi thì và đổi từ chỉ định:</b> now → then · today → that day · tomorrow → the next day · '
    + 'yesterday → the previous day · here → there · this → that.<br>'
    + '<b>Tường thuật câu hỏi:</b><br>'
    + '· Có từ hỏi: S + asked + (O) + <b>từ hỏi</b> + S + V (trật tự khẳng định).<br>'
    + '· Không có từ hỏi: dùng <b>if / whether</b>. <i>He asked if I was busy.</i><br>'
    + '<b>Tường thuật mệnh lệnh:</b> told / asked + O + <b>to V</b>; phủ định là <b>not to V</b>.<br>'
    + '<b>Không lùi thì</b> khi câu nói là chân lý, hoặc động từ tường thuật ở hiện tại.',
  khi: 'Câu viết lại và câu chọn dạng đúng của động từ.',
  vd: '"Where do you live?" she asked. → She asked me where I lived. (bỏ do, đưa về trật tự khẳng định)',
  bay: 'Lỗi kinh điển của tường thuật câu hỏi: vẫn giữ trật tự đảo ngữ và giữ trợ động từ do/does/did. '
     + 'Sau khi tường thuật thì mệnh đề trở về trật tự CÂU KỂ.' },

{ nhom: 'Ngữ pháp', cd: 'Mệnh đề quan hệ', ten: 'Rút gọn mệnh đề quan hệ và mệnh đề không xác định', cap: 3,
  ct: '<b>Ba cách rút gọn:</b><br>'
    + '· Chủ động ⇒ <b>V-ing</b>: The man who is <b>standing</b> there → The man <b>standing</b> there is my father.<br>'
    + '· Bị động ⇒ <b>V3/V-ed</b>: The book which was <b>written</b> by him → The book <b>written</b> by him is famous.<br>'
    + '· Có to be + tính từ hoặc chỉ mục đích ⇒ <b>to V</b>: He was the first man <b>to come</b>.<br>'
    + '<b>Mệnh đề xác định</b> (không dấu phẩy): cần thiết để xác định danh từ, bỏ đi là câu mất nghĩa. '
    + 'Dùng được that, và có thể lược bỏ đại từ khi nó là tân ngữ.<br>'
    + '<b>Mệnh đề không xác định</b> (có dấu phẩy): chỉ bổ sung thông tin. '
    + '<b>KHÔNG dùng that</b>, <b>KHÔNG lược bỏ</b> đại từ quan hệ.<br>'
    + '<b>Which thay cho cả mệnh đề:</b> He passed the exam, <b>which</b> made his parents happy.<br>'
    + '<b>Giới từ + whom / which:</b> The man <b>to whom</b> I spoke is my boss. Sau giới từ không dùng who và không dùng that.',
  khi: 'Câu nối hai câu thành một, câu rút gọn và câu tìm lỗi sai.',
  vd: 'My father, who is a doctor, works here. — có dấu phẩy nên không được thay who bằng that.',
  bay: 'Hai bẫy đắt nhất: sau DẤU PHẨY không dùng that; sau GIỚI TỪ không dùng who mà phải dùng whom.' },

{ nhom: 'Từ vựng', cd: 'Từ loại', ten: 'Vị trí từ loại trong câu — suy ra đáp án không cần biết nghĩa', cap: 2,
  ct: '<b>Quy tắc vị trí — đây mới là thứ ăn điểm word form:</b>'
    + '<table class="kq">'
    + '<tr><td>Sau mạo từ a/an/the, sau tính từ, sau sở hữu</td><td>cần <b>danh từ</b></td></tr>'
    + '<tr><td>Sau to be, sau linking verb (seem, become, look, feel)</td><td>cần <b>tính từ</b></td></tr>'
    + '<tr><td>Trước danh từ</td><td>cần <b>tính từ</b></td></tr>'
    + '<tr><td>Bổ nghĩa cho động từ, tính từ hoặc cả câu</td><td>cần <b>trạng từ</b></td></tr>'
    + '<tr><td>Sau chủ ngữ, chưa có động từ chính</td><td>cần <b>động từ</b></td></tr>'
    + '</table>'
    + '<b>Danh từ chỉ người thường tận cùng:</b> -er, -or, -ist, -ant, -ee. '
    + '<b>Danh từ trừu tượng:</b> -tion, -ment, -ness, -ity, -ship, -ance.<br>'
    + '<b>Tính từ:</b> -ful, -less, -ive, -able, -ous, -al, -ic, -y. <b>Trạng từ:</b> hầu hết là -ly.<br>'
    + '<b>Tiền tố phủ định:</b> un-, in-, im- (trước m, p), il- (trước l), ir- (trước r), dis-, mis-.<br>'
    + '<b>Bẫy tính từ đuôi -ly:</b> friendly, lovely, lonely, likely, ugly là TÍNH TỪ chứ không phải trạng từ.',
  khi: 'Câu word form — mỗi đề có vài câu, ăn điểm chắc nếu thuộc quy tắc vị trí.',
  vd: 'His ______ surprised everyone. → sau sở hữu "his" phải là danh từ ⇒ chọn dạng danh từ, khỏi cần biết nghĩa.',
  bay: 'Đừng dịch nghĩa để chọn — hãy nhìn TỪ ĐỨNG TRƯỚC và TỪ ĐỨNG SAU chỗ trống. '
     + 'Quy tắc vị trí đúng trong đại đa số trường hợp và nhanh hơn nhiều.' },

{ nhom: 'Chiến thuật', cd: 'Cấu trúc – Chiến thuật', ten: 'Thứ tự làm bài và cách xử lý câu không chắc', cap: 1,
  ct: '<b>Đề 2025: 40 câu / 50 phút</b> ⇒ trung bình 1 phút 15 giây một câu, nhưng không nên chia đều.<br>'
    + '<b>Thứ tự nên làm:</b><br>'
    + '① Ngữ pháp và từ vựng câu đơn — nhanh nhất, làm trước để lấy đà (khoảng 15 phút).<br>'
    + '② Bài đọc điền từ (cloze) — 10 phút.<br>'
    + '③ Bài đọc hiểu — 20 phút, đây là phần nặng nhất.<br>'
    + '④ Sắp xếp câu và chèn câu — 5 phút cuối.<br>'
    + '<b>Nguyên tắc câu khó:</b> quá 90 giây chưa ra thì đánh dấu, chọn tạm một đáp án rồi đi tiếp. '
    + 'Không bao giờ để trống — không có điểm âm.<br>'
    + '<b>Mẹo đọc hiểu:</b> đọc CÂU HỎI trước, rồi quét tìm từ khoá trong bài; '
    + 'câu hỏi thường theo đúng thứ tự các đoạn của bài.<br>'
    + '<b>Câu hỏi ý chính:</b> đáp án đúng thường bao quát cả bài — phương án nào chỉ nói về một đoạn thường là bẫy.',
  khi: 'Trước khi vào phòng thi, để quyết định thứ tự làm bài.',
  vd: 'Gặp một từ vựng lạ trong bài đọc, đừng dừng lại tra nghĩa từng chữ — đoán qua ngữ cảnh và đi tiếp.',
  bay: 'Sai lầm chết người là làm bài đọc trước: mất 25 phút cho hai bài đọc rồi cuống với phần ngữ pháp vốn dễ ăn điểm hơn.' },

{ nhom: 'Chiến thuật', cd: 'Dạng bài & chiến thuật 2025', ten: 'Sắp xếp câu, chèn câu và cách bám từ nối', cap: 3,
  ct: '<b>Dạng sắp xếp câu thành đoạn hoàn chỉnh:</b><br>'
    + '· Tìm câu MỞ ĐẦU: câu nêu chủ đề chung, không chứa đại từ thay thế (it, they, this) và không có từ nối.<br>'
    + '· Bám <b>đại từ và từ nối</b> để xâu chuỗi: this, that, these, such ⇒ phải có câu đứng trước để chỉ về.<br>'
    + '· Từ nối chỉ trình tự: First, Then, After that, Finally.<br>'
    + '· Câu KẾT thường có: In conclusion, Therefore, As a result.<br>'
    + '<b>Dạng chèn câu vào vị trí thích hợp:</b><br>'
    + '· Đọc câu cần chèn, tìm <b>manh mối liên kết</b>: đại từ, từ nối, từ lặp lại.<br>'
    + '· Thử từng vị trí, kiểm tra xem câu trước và câu sau có nối mạch không.<br>'
    + '· Nếu câu chèn bắt đầu bằng However thì câu trước phải mang ý TRÁI NGƯỢC.<br>'
    + '<b>Bảng từ nối theo quan hệ ý:</b> tương phản — however, nevertheless, on the other hand · '
    + 'bổ sung — moreover, furthermore, in addition · nguyên nhân kết quả — therefore, consequently, as a result · '
    + 'ví dụ — for instance, for example.',
  khi: 'Hai dạng bài mới của đề 2025, mỗi dạng vài câu.',
  vd: 'Câu chứa "However, this method has drawbacks" phải đứng sau một câu nói về ưu điểm của phương pháp đó.',
  bay: 'Đừng dịch cả đoạn rồi sắp theo cảm giác. Bám vào TÍN HIỆU NGỮ PHÁP — đại từ chỉ về đâu, từ nối báo quan hệ gì — '
     + 'vừa nhanh vừa chắc hơn nhiều.' }
]);

/* ------------------------------------------------------------- TOÁN */
them('toan_ct', [
{ nhom: 'Nền tảng', cd: 'Giới hạn – Liên tục', ten: 'Giới hạn một bên và điểm gián đoạn', cap: 2,
  ct: '<b>Giới hạn một bên:</b> hàm số có giới hạn tại x₀ khi và chỉ khi giới hạn trái và giới hạn phải TỒN TẠI và BẰNG NHAU.<br>'
    + '<b>Hàm liên tục tại x₀</b> khi thoả cả ba điều: f(x₀) xác định · tồn tại giới hạn khi x tiến tới x₀ · '
    + 'giới hạn đó bằng f(x₀). Thiếu một điều là gián đoạn.<br>'
    + '<b>Ứng dụng quan trọng nhất — chứng minh phương trình có nghiệm:</b> nếu f liên tục trên đoạn [a; b] và '
    + '<b>f(a)·f(b) &lt; 0</b> thì phương trình f(x) = 0 có ít nhất một nghiệm trong khoảng (a; b).<br>'
    + '<b>Bốn dạng vô định phải nhận ra:</b> 0/0 · ∞/∞ · ∞ − ∞ · 0·∞. Gặp dạng vô định thì phải khử: '
    + 'phân tích thành nhân tử, nhân liên hợp, hoặc chia cho luỹ thừa cao nhất.<br>'
    + '<b>Liên hệ với tiệm cận:</b> giới hạn tại vô cực cho tiệm cận NGANG; '
    + 'giới hạn bằng vô cực khi x tiến tới một số cho tiệm cận ĐỨNG.',
  khi: 'Câu tính giới hạn, xét tính liên tục, hoặc chứng minh phương trình có nghiệm.',
  vd: 'f(x) = x³ − 3x + 1 liên tục, f(0) = 1 và f(1) = −1 nên f(0)·f(1) < 0 ⇒ phương trình có nghiệm trong (0; 1).',
  bay: 'f(a)·f(b) < 0 chỉ khẳng định CÓ ÍT NHẤT một nghiệm, không nói có đúng một nghiệm. '
     + 'Và bắt buộc phải kiểm tra hàm LIÊN TỤC trên đoạn đó trước.' },

{ nhom: 'Nền tảng', cd: 'Bất phương trình bậc hai', ten: 'Xét dấu tam thức và bài toán tham số', cap: 2,
  ct: '<b>Định lí dấu tam thức</b> f(x) = ax² + bx + c:<br>'
    + '· Δ &lt; 0 ⇒ f(x) LUÔN cùng dấu với a với mọi x.<br>'
    + '· Δ = 0 ⇒ f(x) cùng dấu với a, trừ tại nghiệm kép thì bằng 0.<br>'
    + '· Δ &gt; 0 ⇒ f(x) trái dấu với a khi x nằm TRONG khoảng hai nghiệm, cùng dấu với a khi ở NGOÀI. '
    + 'Nhớ theo câu "trong trái, ngoài cùng".<br>'
    + '<b>Điều kiện thường gặp với tham số:</b>'
    + '<table class="kq">'
    + '<tr><td>f(x) &gt; 0 với mọi x</td><td>a &gt; 0 và Δ &lt; 0</td></tr>'
    + '<tr><td>f(x) ≥ 0 với mọi x</td><td>a &gt; 0 và Δ ≤ 0</td></tr>'
    + '<tr><td>f(x) &lt; 0 với mọi x</td><td>a &lt; 0 và Δ &lt; 0</td></tr>'
    + '</table>'
    + '<b>Định lí Viète:</b> x₁ + x₂ = −b/a và x₁·x₂ = c/a. '
    + 'Hai nghiệm trái dấu ⇔ a·c &lt; 0. Hai nghiệm cùng dương ⇔ Δ ≥ 0, tổng &gt; 0 và tích &gt; 0.<br>'
    + '<b>Với bất phương trình chứa căn hoặc chứa mẫu:</b> luôn đặt điều kiện xác định TRƯỚC khi biến đổi.',
  khi: 'Câu giải bất phương trình, hoặc tìm tham số m để bất phương trình luôn đúng.',
  vd: 'x² − 2mx + 4 > 0 với mọi x ⇔ a = 1 > 0 và Δ′ = m² − 4 < 0 ⇔ −2 < m < 2.',
  bay: 'Nếu hệ số a chứa tham số thì phải xét riêng trường hợp a = 0 trước — lúc đó không còn là tam thức bậc hai nữa. '
     + 'Quên trường hợp này là mất trọn câu.' }
]);

/* ------------------------------------------------------------ SINH */
them('sinh_ct', [
{ nhom: 'Di truyền', cd: 'Di truyền người', ten: 'Các bệnh, tật di truyền thường gặp trong đề', cap: 2,
  ct: '<b>Bệnh do đột biến GENE:</b>'
    + '<table class="kq">'
    + '<tr><td>Bạch tạng, phenylketonuria</td><td>gene lặn trên nhiễm sắc thể thường</td></tr>'
    + '<tr><td>Máu khó đông, mù màu đỏ – lục</td><td>gene lặn trên vùng không tương đồng của X</td></tr>'
    + '<tr><td>Thiếu máu hồng cầu hình liềm</td><td>đột biến thay thế một cặp nucleotide ở gene mã hoá chuỗi beta</td></tr>'
    + '</table>'
    + '<b>Hội chứng do đột biến SỐ LƯỢNG nhiễm sắc thể:</b>'
    + '<table class="kq">'
    + '<tr><td>Down</td><td>ba nhiễm sắc thể số 21 — thể ba nhiễm</td></tr>'
    + '<tr><td>Turner</td><td>chỉ một nhiễm sắc thể X (XO), nữ</td></tr>'
    + '<tr><td>Klinefelter</td><td>XXY, nam</td></tr>'
    + '<tr><td>Siêu nữ</td><td>XXX</td></tr>'
    + '</table>'
    + '<b>Bốn phương pháp nghiên cứu di truyền người:</b> phả hệ · trẻ đồng sinh · tế bào (quan sát bộ nhiễm sắc thể) · '
    + 'di truyền phân tử.<br>'
    + '<b>Vì sao không dùng phương pháp lai và gây đột biến ở người:</b> vướng đạo đức, người sinh sản chậm và ít con, '
    + 'bộ nhiễm sắc thể nhiều và khó phân biệt.<br>'
    + '<b>Bảo vệ vốn gene:</b> tư vấn di truyền và sàng lọc trước sinh · hạn chế tác nhân gây đột biến · '
    + 'không kết hôn gần huyết thống.',
  khi: 'Câu nhận biết bệnh, tật di truyền và cơ chế phát sinh.',
  vd: 'Hội chứng Down có 47 nhiễm sắc thể do thừa một chiếc số 21; Turner chỉ có 45 do thiếu một X.',
  bay: 'Phân biệt cho rõ BỆNH do đột biến gene với HỘI CHỨNG do đột biến số lượng nhiễm sắc thể. '
     + 'Down, Turner, Klinefelter không phải bệnh do gene lặn — không giải bằng phép lai được.' },

{ nhom: 'Ứng dụng', cd: 'Công nghệ di truyền', ten: 'Quy trình tạo sinh vật biến đổi gene', cap: 3,
  ct: '<b>Ba bước của kỹ thuật chuyển gene:</b><br>'
    + '① <b>Tạo DNA tái tổ hợp</b> — cắt gene cần chuyển và cắt thể truyền bằng CÙNG một enzyme giới hạn '
    + '(restrictase) để tạo đầu dính khớp nhau, rồi nối bằng enzyme <b>ligase</b>.<br>'
    + '② <b>Đưa DNA tái tổ hợp vào tế bào nhận</b> — thường dùng muối calcium chloride hoặc xung điện làm dãn màng.<br>'
    + '③ <b>Phân lập dòng tế bào chứa DNA tái tổ hợp</b> — nhờ <b>gene đánh dấu</b> trên thể truyền '
    + '(kháng kháng sinh hoặc phát huỳnh quang) để nhận ra tế bào nào đã nhận gene.<br>'
    + '<b>Thể truyền</b> thường dùng: plasmid của vi khuẩn, hoặc virus. Thể truyền phải có: '
    + 'điểm khởi đầu sao chép · vị trí cắt của enzyme giới hạn · gene đánh dấu.<br>'
    + '<b>Thành tựu:</b> vi khuẩn sản xuất insulin và hormone sinh trưởng · lúa gạo vàng giàu beta-carotene · '
    + 'cây bông kháng sâu · cà chua chín chậm.<br>'
    + '<b>Công nghệ tế bào:</b> nuôi cấy mô tạo hàng loạt cây giống đồng nhất về kiểu gene · '
    + 'nhân bản vô tính bằng chuyển nhân tế bào sinh dưỡng (cừu Dolly) · cấy truyền phôi.',
  khi: 'Câu hỏi quy trình chuyển gene và vai trò của từng enzyme.',
  vd: 'Phải dùng CÙNG một loại enzyme giới hạn cắt cả gene lẫn plasmid, vì chỉ khi đó hai đầu dính mới bổ sung được với nhau.',
  bay: 'Hai enzyme khác nhau về vai trò: restrictase để CẮT, ligase để NỐI. '
     + 'Và nhân bản vô tính cho cơ thể giống hệt về nhân, KHÔNG phải là chuyển gene.' }
]);
})();
