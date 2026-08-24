/* ============================================================
   NGỮ VĂN — BỘ SINH ĐỀ NGHỊ LUẬN
   Tra lại đề thật thì thấy hai chuyện:

   ① BỐ CỤC PHẦN VIẾT ĐÃ ĐẢO GIỮA HAI NĂM.
      2025: câu 1 viết ĐOẠN nghị luận VĂN HỌC ~200 chữ (2,0đ)
            câu 2 viết BÀI  nghị luận XÃ HỘI  ~600 chữ (4,0đ)
      2026: câu 1 viết ĐOẠN nghị luận XÃ HỘI  ~200 chữ (2,0đ)
            câu 2 viết BÀI  nghị luận VĂN HỌC ~600 chữ (4,0đ)
      Đề 2026 lấy bài thơ làm ngữ liệu cho câu 4 điểm, còn câu 2 điểm hỏi
      về chuyện khởi nghiệp công nghệ. Không ai biết 2027 ra chiều nào,
      nên phải luyện CẢ HAI, không được đóng đinh một kiểu.

   ② ĐỀ RA THEO TỔ HỢP CHỨ KHÔNG THEO DANH SÁCH.
      Học tủ vài chục đề mẫu là vô ích. Cùng một chủ đề, đề có thể hỏi
      thành nhiều dạng lệnh khác nhau, mỗi dạng đòi một khung bài khác.
      Nên chỗ này sinh đề bằng cách ghép CHỦ ĐỀ × DẠNG LỆNH, và trả kèm
      khung dàn ý đúng của dạng lệnh ấy.
   ============================================================ */
window.TD = window.TD || {};

(function () {

/* ---------- biểu điểm chính thức ---------- */
const BD_DOAN = '0,25 hình thức đoạn · 0,25 xác định đúng vấn đề · 1,0 triển khai (dẫn chứng + phân tích) · 0,25 chính tả, ngữ pháp · 0,25 sáng tạo';
const BD_BAI = '0,25 bố cục bài · 0,5 xác định đúng vấn đề · 2,5 triển khai luận điểm + lí lẽ + dẫn chứng · 0,25 chính tả, ngữ pháp · 0,5 sáng tạo';

/* ============================================================
   A. NGHỊ LUẬN XÃ HỘI
   ============================================================ */

/* Chủ đề: mỗi cái gồm tên gọi, một mệnh đề để hỏi kiểu tư tưởng đạo lí,
   một hiện tượng đời sống tương ứng, và vài từ khoá để gợi dẫn chứng. */
const CHU_DE_XH = [
  { ten: 'dám thử và dám sai', gp: 'người trẻ dám thử và dám chấp nhận sai', md: 'tuổi trẻ cần dám thử và dám sai',
    ht: 'nhiều người trẻ sợ sai đến mức không dám bắt đầu bất cứ việc gì',
    dc: 'học sinh ngại đăng ký cuộc thi vì sợ trượt · người đổi nghề ở tuổi ba mươi · các dự án khởi nghiệp thất bại rồi làm lại' },
  { ten: 'tính tự lập', gp: 'rèn tính tự lập cho người trẻ', md: 'tự lập là điều kiện đầu tiên của trưởng thành',
    ht: 'không ít bạn trẻ vào đại học mới lần đầu tự nấu một bữa cơm',
    dc: 'sinh viên năm nhất xa nhà · học sinh tự lên kế hoạch ôn thi · cha mẹ làm hộ bài tập' },
  { ten: 'giá trị của thất bại', gp: 'người trẻ không còn sợ thất bại', md: 'thất bại không phải điều ngược lại của thành công',
    ht: 'tâm lí sợ điểm kém khiến học sinh chọn cách an toàn thay vì cách đúng',
    dc: 'vận động viên thua rồi vô địch · nhà khoa học thử hàng trăm lần · bài kiểm tra sai được sửa lại' },
  { ten: 'lòng tử tế', gp: 'lan toả lòng tử tế trong cộng đồng', md: 'tử tế với người lạ là thước đo thật của một con người',
    ht: 'những hành động giúp người dưng được lan truyền trên mạng xã hội',
    dc: 'người nhặt được của rơi trả lại · quán cơm hai nghìn · người dừng xe đỡ cụ già qua đường' },
  { ten: 'trách nhiệm cá nhân', gp: 'mỗi người sống có trách nhiệm hơn với việc mình làm', md: 'trách nhiệm bắt đầu từ những việc không ai kiểm tra',
    ht: 'thói quen đổ lỗi cho hoàn cảnh khi công việc không thành',
    dc: 'người gác đèn biển · nhân viên trực đêm · học sinh tự giác học khi không ai giám sát' },
  { ten: 'sức mạnh của thói quen nhỏ', gp: 'duy trì được những thói quen tốt mỗi ngày', md: 'việc nhỏ làm mỗi ngày mạnh hơn việc lớn làm một lần',
    ht: 'phong trào hô hào rầm rộ rồi tắt sau vài tuần',
    dc: 'đọc mười trang sách mỗi tối · chạy bộ đều đặn · tiết kiệm mỗi ngày một khoản nhỏ' },
  { ten: 'thời gian', gp: 'người trẻ dùng thời gian của mình hiệu quả hơn', md: 'thời gian là tài sản duy nhất không ai vay được của ai',
    ht: 'nhiều người trẻ dành hàng giờ mỗi ngày lướt mạng mà không nhớ mình đã xem gì',
    dc: 'thống kê thời gian dùng điện thoại · người học thêm ngoại ngữ lúc chờ xe · deadline dồn cuối kỳ' },
  { ten: 'công nghệ và con người', gp: 'dùng công nghệ mà không bị công nghệ dùng lại mình', md: 'công nghệ mở rộng khả năng nhưng không thay được sự lựa chọn của con người',
    ht: 'học sinh dùng trí tuệ nhân tạo làm hộ bài tập',
    dc: 'máy dịch và người học ngoại ngữ · công cụ vẽ tự động và hoạ sĩ · xe tự lái' },
  { ten: 'mạng xã hội và bản thân', gp: 'người trẻ thôi tự ti khi dùng mạng xã hội', md: 'so sánh mình với hình ảnh của người khác trên mạng là cách nhanh nhất để bất hạnh',
    ht: 'tâm lí tự ti sau khi lướt mạng xã hội ở người trẻ',
    dc: 'ảnh chỉnh sửa · thành tích được khoe chọn lọc · những người rời mạng xã hội một tháng' },
  { ten: 'lắng nghe', gp: 'rèn được khả năng lắng nghe người khác', md: 'biết nghe khó hơn biết nói',
    ht: 'các cuộc tranh luận trên mạng nơi ai cũng nói mà không ai nghe',
    dc: 'người hoà giải · bác sĩ hỏi bệnh · cha mẹ và con cái nói chuyện' },
  { ten: 'bản lĩnh trước đám đông', gp: 'giữ được chính kiến trước áp lực của số đông', md: 'đứng về phía đúng khó hơn đứng về phía đông',
    ht: 'hùa theo số đông khi bình luận trên mạng',
    dc: 'người dám nói khác trong lớp · nhân chứng dám lên tiếng · các trào lưu bị cuốn theo' },
  { ten: 'sự trung thực', gp: 'xây dựng thói quen trung thực trong học tập và công việc', md: 'trung thực không phải đức tính, mà là nền móng',
    ht: 'gian lận trong thi cử và trong công việc',
    dc: 'bài thi chép · số liệu bị làm đẹp · người nhận lỗi trước khi bị phát hiện' },
  { ten: 'lòng biết ơn', gp: 'nuôi dưỡng lòng biết ơn ở người trẻ', md: 'biết ơn là cách nhìn thấy phần công sức của người khác trong thành quả của mình',
    ht: 'thói quen coi mọi tiện nghi quanh mình là chuyện đương nhiên',
    dc: 'người thu gom rác lúc rạng sáng · thầy cô cũ · nông dân làm ra hạt gạo' },
  { ten: 'học suốt đời', gp: 'duy trì việc học sau khi đã rời ghế nhà trường', md: 'tấm bằng là điểm xuất phát chứ không phải đích đến',
    ht: 'nhiều người ngừng đọc hoàn toàn sau khi rời ghế nhà trường',
    dc: 'người đi làm học thêm kỹ năng mới · nghề bị máy móc thay thế · các khoá học trực tuyến' },
  { ten: 'giữ lời hứa', gp: 'tạo được thói quen giữ đúng lời hứa', md: 'một lời hứa nhỏ được giữ đáng giá hơn một lời cam kết lớn bị quên',
    ht: 'văn hoá hẹn rồi sai giờ, nhận rồi không làm',
    dc: 'hẹn nhóm làm bài tập · giao hàng đúng hẹn · cha mẹ hứa với con' },
  { ten: 'sống chậm', gp: 'sống chậm lại giữa một nhịp sống gấp gáp', md: 'không phải việc nào làm nhanh cũng là làm tốt',
    ht: 'nhịp sống gấp gáp khiến người ta ăn vội, học vội, quyết định vội',
    dc: 'bữa cơm gia đình · đọc kỹ một cuốn sách · quyết định chọn ngành học' },
  { ten: 'môi trường sống', gp: 'giảm rác thải nhựa trong sinh hoạt hằng ngày', md: 'giữ môi trường là giữ chính điều kiện sống của mình',
    ht: 'rác thải nhựa dùng một lần trong sinh hoạt hằng ngày',
    dc: 'ống hút nhựa · túi ni lông đi chợ · phong trào dọn bãi biển' },
  { ten: 'gia đình', gp: 'giữ được sự gắn kết trong gia đình thời công nghệ', md: 'gia đình là nơi người ta được phép yếu đuối',
    ht: 'các thành viên trong nhà ngồi cùng bàn nhưng mỗi người một màn hình',
    dc: 'bữa cơm tối · cuộc gọi về nhà · cha mẹ đi làm xa' },
  { ten: 'tôn trọng khác biệt', gp: 'học cách tôn trọng những lựa chọn khác mình', md: 'khác mình không có nghĩa là sai',
    ht: 'thói quen chê bai những lựa chọn không giống số đông',
    dc: 'chọn nghề không theo ý cha mẹ · người hướng nội · phong cách sống tối giản' },
  { ten: 'ý chí vượt hoàn cảnh', gp: 'vượt lên hoàn cảnh xuất phát của bản thân', md: 'hoàn cảnh quyết định điểm xuất phát chứ không quyết định đích đến',
    ht: 'những học sinh vùng khó vẫn đỗ đại học',
    dc: 'học sinh nghèo vượt khó · người khuyết tật lập nghiệp · vùng sâu vùng xa' },
  { ten: 'giá trị của lao động', gp: 'thay đổi cái nhìn lệch lạc về nghề nghiệp', md: 'không có nghề nào thấp, chỉ có cách làm nghề thấp',
    ht: 'tâm lí chọn nghề theo danh tiếng thay vì theo năng lực',
    dc: 'thợ lành nghề · người làm dịch vụ · nghề thủ công truyền thống' },
  { ten: 'khiêm tốn', gp: 'giữ được sự khiêm tốn khi đã có chút hiểu biết', md: 'người biết mình chưa biết gì mới học được nhiều nhất',
    ht: 'vừa đọc vài bài đã tự cho mình là chuyên gia',
    dc: 'người mới vào nghề · chuyên gia thật vẫn nói "tôi chưa chắc"' },
  { ten: 'sức khoẻ tinh thần', gp: 'chăm sóc sức khoẻ tinh thần cho lứa tuổi học sinh', md: 'xin giúp đỡ là dấu hiệu của sức mạnh chứ không phải yếu đuối',
    ht: 'áp lực học tập và tâm lí giấu bệnh ở lứa tuổi học sinh',
    dc: 'phòng tham vấn học đường · bạn bè lắng nghe nhau · thi cử căng thẳng' },
  { ten: 'đọc sách', gp: 'gây dựng lại thói quen đọc sách ở người trẻ', md: 'đọc chậm một cuốn hơn lướt qua trăm bài',
    ht: 'thói quen đọc theo tiêu đề và bỏ qua nội dung',
    dc: 'tin giả lan nhanh · người đọc kỹ trước khi chia sẻ · thư viện trường' },
  { ten: 'giữ gìn tiếng Việt', gp: 'giữ gìn sự trong sáng của tiếng Việt', md: 'giữ tiếng nói là giữ cách nghĩ của dân tộc mình',
    ht: 'thói quen chêm tiếng nước ngoài tuỳ tiện trong giao tiếp',
    dc: 'ngôn ngữ mạng · từ điển tiếng Việt · người nước ngoài học tiếng Việt' },
  { ten: 'giá trị của sự kiên trì', gp: 'rèn sự kiên trì khi kết quả chưa tới ngay', md: 'phần lớn thất bại xảy ra ngay trước lúc sắp thành công',
    ht: 'tâm lí bỏ cuộc sớm khi kết quả chưa tới',
    dc: 'luyện một kỹ năng qua nhiều tháng · vận động viên tập luyện · học ngoại ngữ' },
  { ten: 'trách nhiệm với cộng đồng', gp: 'người trẻ tham gia nhiều hơn vào việc chung', md: 'không ai sống một mình mà an toàn được',
    ht: 'các hoạt động tình nguyện của người trẻ',
    dc: 'hiến máu · dọn rác nơi công cộng · giúp đỡ vùng thiên tai' },
  { ten: 'chọn nghề', gp: 'chọn nghề đúng với năng lực của mình', md: 'chọn nghề là chọn cách mình sẽ sống mỗi ngày trong ba mươi năm',
    ht: 'nhiều sinh viên bỏ ngành sau năm nhất vì chọn theo trào lưu',
    dc: 'ngành hot rồi bão hoà · người làm trái ngành · hướng nghiệp ở trường phổ thông' },
  { ten: 'ứng xử trên mạng', gp: 'xây dựng văn hoá ứng xử tử tế trên mạng', md: 'một lời viết ra trên mạng đi xa hơn và ở lại lâu hơn lời nói',
    ht: 'những cuộc công kích tập thể nhắm vào một cá nhân trên mạng xã hội',
    dc: 'bình luận ác ý · tin đồn lan truyền · người xin lỗi công khai' },
  { ten: 'giá trị truyền thống trong đời sống hiện đại', gp: 'giữ được giá trị truyền thống giữa đời sống hiện đại', md: 'cái cũ hết công dụng không có nghĩa là hết giá trị',
    ht: 'các nghề thủ công và lễ hội truyền thống dần mai một',
    dc: 'làng nghề · Tết cổ truyền · nhà cổ trong đô thị mới' }
];

/* Dạng lệnh đề. Mỗi dạng có cách đặt câu hỏi riêng VÀ khung dàn ý riêng —
   nhầm dạng là lạc khung, mất điểm triển khai. */
const DANG_XH = [
  { ma: 'tt', ten: 'tư tưởng, đạo lí',
    hoi: (c, so) => `Viết ${so === 200 ? 'đoạn văn (khoảng 200 chữ)' : 'bài văn nghị luận (khoảng 600 chữ)'} `
      + `trình bày suy nghĩ của anh/chị về ý kiến: ${c.md}.`,
    dan: c => `KHUNG DẠNG TƯ TƯỞNG – ĐẠO LÍ\n`
      + `· Mở: dẫn vào vấn đề "${c.ten}" rồi nêu ý kiến cần bàn.\n`
      + `· Giải thích: cắt nghĩa các từ khoá trong ý kiến, rồi nêu cách hiểu chung cả câu.\n`
      + `· Bàn luận — vì sao đúng: ít nhất hai lí lẽ, mỗi lí lẽ một dẫn chứng.\n`
      + `   Dẫn chứng có thể lấy từ: ${c.dc}.\n`
      + `· Phản đề: chỉ ra cách hiểu sai hoặc trường hợp ý kiến không đúng tuyệt đối — đây là chỗ ăn điểm sáng tạo.\n`
      + `· Bài học nhận thức và hành động: rút ra cho bản thân, phải CỤ THỂ, tránh hô khẩu hiệu.\n`
      + `· Kết: khẳng định lại, mở rộng bằng một liên hệ ngắn.` },

  { ma: 'ht', ten: 'hiện tượng đời sống',
    hoi: (c, so) => `Viết ${so === 200 ? 'đoạn văn (khoảng 200 chữ)' : 'bài văn nghị luận (khoảng 600 chữ)'} `
      + `trình bày suy nghĩ của anh/chị về hiện tượng: ${c.ht}.`,
    dan: c => `KHUNG DẠNG HIỆN TƯỢNG ĐỜI SỐNG\n`
      + `· Mở: nêu hiện tượng, cho thấy nó đang phổ biến.\n`
      + `· Thực trạng: mô tả hiện tượng bằng biểu hiện cụ thể, có số liệu hoặc quan sát thực tế thì càng tốt.\n`
      + `   Chất liệu có thể dùng: ${c.dc}.\n`
      + `· Nguyên nhân: tách rõ nguyên nhân CHỦ QUAN (từ chính con người) và KHÁCH QUAN (từ môi trường, xã hội).\n`
      + `· Hậu quả hoặc ý nghĩa: nếu là hiện tượng xấu thì nêu tác hại; nếu tốt thì nêu giá trị lan toả.\n`
      + `· Giải pháp: chia theo chủ thể — bản thân · gia đình và nhà trường · xã hội. Mỗi chủ thể một việc làm được.\n`
      + `· Kết: chốt lại thái độ nên có.` },

  { ma: 'gp', ten: 'câu hỏi giải pháp',
    hoi: (c, so) => `Viết ${so === 200 ? 'đoạn văn (khoảng 200 chữ)' : 'bài văn nghị luận (khoảng 600 chữ)'} `
      + `trả lời câu hỏi: làm thế nào để ${c.gp}?`,
    dan: c => `KHUNG DẠNG CÂU HỎI GIẢI PHÁP\n`
      + `· Mở: chỉ ra khoảng cách giữa điều mong muốn và thực tế, để câu hỏi trở nên cần thiết.\n`
      + `· Xác định gốc rễ: trả lời được "vì sao chưa làm được" thì mới đề ra giải pháp trúng. Đây là phần nhiều bài bỏ qua.\n`
      + `· Nhóm giải pháp, sắp theo chủ thể hoặc theo mức độ:\n`
      + `   – từ bản thân người trẻ: việc làm được ngay, cụ thể;\n`
      + `   – từ gia đình và nhà trường: cách nuôi dưỡng, cách đánh giá;\n`
      + `   – từ xã hội: chính sách, dư luận, môi trường.\n`
      + `· Điều kiện để giải pháp có tác dụng: nêu một điều kiện — cho thấy mình hiểu vấn đề chứ không kê đơn suông.\n`
      + `   Chất liệu tham khảo: ${c.dc}.\n`
      + `· Kết: khẳng định giải pháp khả thi nhất và bắt đầu từ đâu.` },

  { ma: 'pb', ten: 'bày tỏ quan điểm, phản biện',
    hoi: (c, so) => `Anh/chị có đồng tình với ý kiến "${c.md.charAt(0).toUpperCase() + c.md.slice(1)}" không? `
      + `Viết ${so === 200 ? 'đoạn văn (khoảng 200 chữ)' : 'bài văn nghị luận (khoảng 600 chữ)'} trình bày quan điểm của mình.`,
    dan: c => `KHUNG DẠNG BÀY TỎ QUAN ĐIỂM\n`
      + `· Mở: nêu ý kiến và nói NGAY lập trường của mình — đồng tình, không đồng tình, hay đồng tình một phần.\n`
      + `· Giải thích ngắn để hai bên hiểu cùng một nghĩa.\n`
      + `· Lí giải lập trường: hai đến ba luận điểm, mỗi luận điểm một dẫn chứng.\n`
      + `   Chất liệu: ${c.dc}.\n`
      + `· Đối thoại với ý kiến trái chiều: nêu lí lẽ của phía kia rồi trả lời lại. Bỏ bước này là bài một chiều, khó có điểm sáng tạo.\n`
      + `· Giới hạn của chính lập trường mình: chỉ ra trường hợp mà quan điểm của mình không áp dụng được.\n`
      + `· Kết: chốt lập trường, không lấp lửng.` },

  { ma: 'tp', ten: 'tích hợp từ văn bản đọc hiểu',
    hoi: (c, so) => `Từ nội dung văn bản ở phần Đọc hiểu, hãy viết `
      + `${so === 200 ? 'đoạn văn (khoảng 200 chữ)' : 'bài văn nghị luận (khoảng 600 chữ)'} `
      + `trình bày suy nghĩ của anh/chị về ${c.ten}.`,
    dan: c => `KHUNG DẠNG TÍCH HỢP\n`
      + `· Mở: dẫn từ chi tiết hoặc thông điệp của văn bản đọc hiểu sang vấn đề "${c.ten}".\n`
      + `· BẮT BUỘC: nhắc lại đúng một chi tiết của văn bản để làm điểm tựa. Không nhắc là mất điểm xác định vấn đề.\n`
      + `· Giải thích và bàn luận về vấn đề, tách khỏi văn bản để bàn ra đời sống.\n`
      + `· Dẫn chứng phải LẤY NGOÀI văn bản, không lặp lại chuyện trong ngữ liệu.\n`
      + `   Chất liệu: ${c.dc}.\n`
      + `· Phản đề hoặc giới hạn.\n`
      + `· Kết: nối trở lại thông điệp của văn bản, tạo kết cấu vòng tròn.` }
];

/* ============================================================
   B. NGHỊ LUẬN VĂN HỌC
   ============================================================ */

/* Dạng lệnh phân theo thể loại của ngữ liệu — hỏi phân tích nhân vật cho
   một bài thơ trữ tình là lệch, nên phải lọc theo loại. */
const DANG_VH = [
  { ma: 'toanbai', hop: () => true,
    hoi: (nl, so) => `Viết ${so === 200 ? 'đoạn văn (khoảng 200 chữ)' : 'bài văn nghị luận (khoảng 600 chữ)'} `
      + `phân tích, đánh giá chủ đề và những nét đặc sắc về nghệ thuật của văn bản "${nl.ten}" ở phần Đọc hiểu.`,
    dan: nl => `KHUNG PHÂN TÍCH – ĐÁNH GIÁ TOÀN VĂN BẢN (${nl.loai})\n`
      + `· Mở: giới thiệu văn bản, nêu ấn tượng chung và hướng phân tích.\n`
      + `· Chủ đề: gọi tên vấn đề trung tâm bằng MỘT câu, rồi chứng minh bằng các chi tiết trong bài.\n`
      + `· Phân tích theo mạch của văn bản, chia thành hai đến ba luận điểm; mỗi luận điểm phải trích dẫn chứng cụ thể.\n`
      + `· Nghệ thuật — bám đặc trưng thể loại:\n`
      + `   ${nl.loai.indexOf('Thơ') === 0
            ? 'thể thơ và nhịp · hình ảnh và biện pháp tu từ · từ ngữ đắt · cấu tứ và mạch cảm xúc'
            : (nl.loai.indexOf('Truyện') === 0
              ? 'tình huống truyện · nhân vật · chi tiết đắt · ngôi kể và điểm nhìn · giọng kể'
              : 'cách nêu vấn đề · lối lập luận · giọng điệu · hình ảnh và câu văn')}.\n`
      + `· Đánh giá: đóng góp riêng của văn bản và điều nó gợi cho người đọc hôm nay.\n`
      + `· Kết: khẳng định giá trị nội dung và nghệ thuật.` },

  { ma: 'nhanvat', hop: nl => nl.loai.indexOf('Truyện') === 0,
    hoi: (nl, so) => `Viết ${so === 200 ? 'đoạn văn (khoảng 200 chữ)' : 'bài văn nghị luận (khoảng 600 chữ)'} `
      + `phân tích nhân vật mà anh/chị ấn tượng nhất trong văn bản "${nl.ten}" ở phần Đọc hiểu.`,
    dan: nl => `KHUNG PHÂN TÍCH NHÂN VẬT\n`
      + `· Mở: giới thiệu truyện và nhân vật được chọn.\n`
      + `· Hoàn cảnh của nhân vật: nghề nghiệp, vị trí, tình thế đang gặp.\n`
      + `· Tính cách, phẩm chất — mỗi nét phải gắn với một chi tiết cụ thể:\n`
      + `   – qua HÀNH ĐỘNG (nhân vật làm gì trong tình huống then chốt);\n`
      + `   – qua LỜI NÓI (nói thế nào, nói với ai, im lặng lúc nào);\n`
      + `   – qua mối quan hệ với nhân vật khác.\n`
      + `· Chi tiết đắt nhất: chọn một chi tiết rồi phân tích kỹ — đây là chỗ tạo khác biệt giữa bài khá và bài giỏi.\n`
      + `· Nghệ thuật xây dựng nhân vật: đặt vào tình huống nào, khắc hoạ bằng cách nào, ngôn ngữ ra sao.\n`
      + `· Ý nghĩa: nhân vật đại diện cho kiểu người nào, gửi thông điệp gì.\n`
      + `· Kết: đánh giá vị trí của nhân vật trong tác phẩm.` },

  { ma: 'hinhtuong', hop: nl => nl.loai.indexOf('Thơ') === 0 || nl.loai.indexOf('Truyện') === 0,
    hoi: (nl, so) => `Viết ${so === 200 ? 'đoạn văn (khoảng 200 chữ)' : 'bài văn nghị luận (khoảng 600 chữ)'} `
      + `phân tích một hình ảnh (hoặc hình tượng) giàu ý nghĩa trong văn bản "${nl.ten}" ở phần Đọc hiểu.`,
    dan: nl => `KHUNG PHÂN TÍCH HÌNH ẢNH – HÌNH TƯỢNG\n`
      + `· Mở: giới thiệu văn bản và hình ảnh được chọn, nói ngay vì sao nó đáng phân tích.\n`
      + `· Nghĩa thực: hình ảnh ấy là gì trong đời sống, hiện ra ở những câu nào.\n`
      + `· Nghĩa biểu tượng: nó đại diện cho điều gì. Phải bám chữ trong văn bản để chứng minh, không suy diễn.\n`
      + `· Sự vận động: hình ảnh có thay đổi ý nghĩa từ đầu tới cuối bài không — nếu có thì đây là ý hay nhất để viết.\n`
      + `· Cách nhà văn, nhà thơ dựng hình ảnh: đặt ở vị trí nào, lặp lại mấy lần, đi kèm biện pháp tu từ gì.\n`
      + `· Đóng góp của hình ảnh vào chủ đề chung.\n`
      + `· Kết: khẳng định sức gợi của hình ảnh.` },

  { ma: 'nghethuat', hop: () => true,
    hoi: (nl, so) => `Viết ${so === 200 ? 'đoạn văn (khoảng 200 chữ)' : 'bài văn nghị luận (khoảng 600 chữ)'} `
      + `phân tích những nét đặc sắc về nghệ thuật của văn bản "${nl.ten}" ở phần Đọc hiểu.`,
    dan: nl => `KHUNG PHÂN TÍCH NGHỆ THUẬT (${nl.loai})\n`
      + `· Mở: giới thiệu văn bản, khẳng định giá trị nghệ thuật là điều làm nên sức sống của nó.\n`
      + `· Lần lượt từng phương diện, mỗi phương diện một dẫn chứng và một câu chỉ ra TÁC DỤNG:\n`
      + `   ${nl.loai.indexOf('Thơ') === 0
            ? '– thể thơ, nhịp, vần và tác dụng với giọng điệu;\n   – hình ảnh và các biện pháp tu từ;\n   – ngôn từ: từ nào đắt, vì sao;\n   – cấu tứ: bài đi từ đâu tới đâu'
            : (nl.loai.indexOf('Truyện') === 0
              ? '– tình huống truyện và vai trò của nó;\n   – nghệ thuật xây dựng nhân vật;\n   – chi tiết nghệ thuật đắt;\n   – ngôi kể, điểm nhìn và giọng kể'
              : '– cách nêu và triển khai vấn đề;\n   – hệ thống lí lẽ và dẫn chứng;\n   – các biện pháp làm mạnh lập luận (điệp, đối lập, câu hỏi tu từ);\n   – giọng điệu')}.\n`
      + `· Lưu ý ăn điểm: KHÔNG được liệt kê suông. Cứ mỗi biện pháp phải trả lời "để làm gì" thì mới có điểm.\n`
      + `· Đánh giá chung: nghệ thuật ấy phục vụ nội dung như thế nào.\n`
      + `· Kết: khẳng định tài năng và phong cách thể hiện qua văn bản.` },

  { ma: 'thongdiep', hop: () => true,
    hoi: (nl, so) => `Viết ${so === 200 ? 'đoạn văn (khoảng 200 chữ)' : 'bài văn nghị luận (khoảng 600 chữ)'} `
      + `phân tích thông điệp mà tác giả gửi gắm qua văn bản "${nl.ten}" ở phần Đọc hiểu và ý nghĩa của thông điệp ấy.`,
    dan: nl => `KHUNG PHÂN TÍCH THÔNG ĐIỆP\n`
      + `· Mở: giới thiệu văn bản và gọi tên thông điệp bằng một câu rõ ràng.\n`
      + `· Căn cứ rút ra thông điệp: chỉ ra chi tiết, câu văn, câu thơ nào dẫn tới cách hiểu đó. Đây là phần bắt buộc — không có căn cứ thì thành áp đặt.\n`
      + `· Cách tác giả gửi thông điệp: nói thẳng hay để hình ảnh tự nói; đặt ở đầu, giữa hay cuối; có dùng khoảng lặng không.\n`
      + `· Vì sao thông điệp ấy có giá trị: đặt vào bối cảnh chung của con người, và bối cảnh hôm nay.\n`
      + `· Liên hệ bản thân: ngắn thôi, một hai câu, nhưng phải cụ thể.\n`
      + `· Kết: khẳng định sức sống của thông điệp.` }
];

/* ============================================================
   C. HAI HÀM SINH ĐỀ
   ============================================================ */

/* Sinh đề nghị luận xã hội. so = 200 (đoạn) hoặc 600 (bài). */
TD.sinhDeNLXH = function (seed, so) {
  const R = TD.rng(seed >>> 0);
  const c = R.chon(CHU_DE_XH);
  const d = R.chon(DANG_XH);
  return {
    q: d.hoi(c, so),
    dan: d.dan(c),
    diem: so === 200 ? BD_DOAN : BD_BAI,
    _dang: d.ten, _chuDe: c.ten, _sinh: true
  };
};

/* Sinh đề nghị luận văn học bám vào ngữ liệu đọc hiểu. */
TD.sinhDeNLVH = function (nl, seed, so) {
  const R = TD.rng(seed >>> 0);
  const hop = DANG_VH.filter(x => x.hop(nl));
  const d = R.chon(hop.length ? hop : [DANG_VH[0]]);
  return {
    q: d.hoi(nl, so),
    dan: d.dan(nl),
    diem: so === 200 ? BD_DOAN : BD_BAI,
    _dang: d.ma, _sinh: true
  };
};

TD.SO_CHU_DE_XH = CHU_DE_XH.length;
TD.SO_DANG_XH = DANG_XH.length;
TD.SO_DANG_VH = DANG_VH.length;
})();
