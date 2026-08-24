/* ============================================================
   CÂU HỎI CÓ HÌNH — ĐỢT 4: TRỤC THỜI GIAN CHO LỊCH SỬ
   Sử là môn duy nhất còn trống hẳn phần hình. Đề thật không có đồ
   thị hay sơ đồ thí nghiệm, nhưng RẤT hay cho một trục thời gian
   (hoặc bảng niên biểu) rồi bắt đọc – so sánh – nhận định. Ở đây
   dựng tám trục theo tám chủ đề lớn, mỗi trục ra được cả bốn mức.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const MC = (R, de, it, meo) => {
  const opts = TD.xaoR(R, [it.d].concat(it.s));
  return { q: de, opts: opts, ans: opts.indexOf(it.d),
    giai: `Đáp án đúng: ${it.d}\n${it.v}\n\nVì sao các phương án còn lại bị loại:\n`
      + TD.khoiLoai(opts, it.d, it.sv, 'không khớp với các mốc trên trục thời gian.'),
    meo: meo };
};
const baNhieu = (dung, ung) => {
  const ra = [];
  for (const x of ung) if (x !== dung && ra.indexOf(x) < 0) ra.push(x);
  return ra.length >= 3 ? ra.slice(0, 3) : null;
};

/* ------------------------------------------------------------
   TÁM TRỤC THỜI GIAN
   moc : các mốc vẽ lên hình (đã kiểm theo sách giáo khoa)
   nx  : nhận định mức 3 — d là đúng, s là ba nhận định sai
   yn  : nhận định mức 4 — nhìn cả trục để rút ra quy luật
   ------------------------------------------------------------ */
const TRUC = [

{ cd: 'Kháng chiến chống Pháp', ten: 'Việt Nam 1945 – 1954',
  moc: [
    { nam: 1945, ten: 'Cách mạng tháng Tám thành công' },
    { nam: 1946, ten: 'Toàn quốc kháng chiến' },
    { nam: 1947, ten: 'Chiến dịch Việt Bắc' },
    { nam: 1950, ten: 'Chiến dịch Biên giới' },
    { nam: 1954, ten: 'Chiến thắng Điện Biên Phủ' }],
  nx: {
    d: 'Ta giành được thế chủ động trên chiến trường chính Bắc Bộ kể từ chiến dịch Biên giới năm 1950.',
    s: ['Ta giành được thế chủ động ngay từ ngày Toàn quốc kháng chiến năm 1946.',
        'Chiến dịch Việt Bắc năm 1947 là chiến dịch tiến công lớn đầu tiên do ta chủ động mở.',
        'Chiến thắng Điện Biên Phủ năm 1954 mở đầu cuộc kháng chiến toàn quốc chống Pháp.'],
    sv: {
      'Ta giành được thế chủ động ngay từ ngày Toàn quốc kháng chiến năm 1946.':
        'cuối năm 1946 ta còn yếu hơn hẳn về trang bị, chủ trương lúc đó là giam chân địch trong các đô thị để hậu phương kịp di chuyển, tức là thế phòng ngự',
      'Chiến dịch Việt Bắc năm 1947 là chiến dịch tiến công lớn đầu tiên do ta chủ động mở.':
        'Việt Bắc 1947 là chiến dịch PHẢN CÔNG — Pháp mở cuộc tiến công lên căn cứ địa trước, ta đánh trả; Biên giới 1950 mới là chiến dịch đầu tiên ta chủ động chọn hướng và mở màn',
      'Chiến thắng Điện Biên Phủ năm 1954 mở đầu cuộc kháng chiến toàn quốc chống Pháp.':
        'Điện Biên Phủ nằm ở cuối trục, là trận quyết chiến chiến lược KẾT THÚC cuộc kháng chiến, không phải mở đầu' },
    v: 'Đọc trục theo thế trận: 1946 – 1947 ta ở thế phòng ngự và phản công, 1950 ta lần đầu chủ động chọn hướng mở chiến dịch, '
      + 'từ đó thế chủ động chiến lược trên chiến trường chính thuộc về ta cho đến 1954.' },
  yn: {
    d: 'Chín năm kháng chiến đi theo trình tự phòng ngự – cầm cự – phản công, và thắng lợi quân sự ở Điện Biên Phủ mới tạo ra cơ sở quyết định cho thắng lợi ngoại giao ở Hội nghị Genève.',
    s: ['Thắng lợi tại Hội nghị Genève là nguyên nhân dẫn tới chiến thắng Điện Biên Phủ.',
        'Cuộc kháng chiến kết thúc bằng một cuộc tổng khởi nghĩa giành chính quyền trong cả nước.',
        'Trong suốt chín năm, ta luôn ở thế tiến công chiến lược nên không cần giai đoạn cầm cự.'],
    sv: {
      'Thắng lợi tại Hội nghị Genève là nguyên nhân dẫn tới chiến thắng Điện Biên Phủ.':
        'đảo ngược quan hệ nhân quả và cả thứ tự thời gian: Điện Biên Phủ kết thúc ngày 7/5/1954, Hội nghị Genève bàn về Đông Dương khai mạc ngày 8/5/1954, tức là một ngày sau đó',
      'Cuộc kháng chiến kết thúc bằng một cuộc tổng khởi nghĩa giành chính quyền trong cả nước.':
        'lẫn với Cách mạng tháng Tám 1945 ở đầu trục; kháng chiến chống Pháp kết thúc bằng trận quyết chiến chiến lược và một hiệp định quốc tế, không phải bằng khởi nghĩa',
      'Trong suốt chín năm, ta luôn ở thế tiến công chiến lược nên không cần giai đoạn cầm cự.':
        'trái với chính các mốc trên trục — 1946 rút khỏi đô thị, 1947 phản công ở Việt Bắc đều là những bước lùi có tính toán của giai đoạn phòng ngự và cầm cự' },
    v: 'Nhìn cả trục sẽ thấy hai tuyến đi song song. Tuyến quân sự: giữ chính quyền non trẻ (1945) → rút lui để bảo toàn lực lượng (1946) → '
      + 'phản công đánh bại cuộc tiến công của Pháp (1947) → chủ động mở chiến dịch, khai thông biên giới (1950) → quyết chiến chiến lược (1954). '
      + 'Tuyến ngoại giao đi sau và ăn theo tuyến quân sự: chỉ khi tập đoàn cứ điểm mạnh nhất Đông Dương bị tiêu diệt thì Pháp mới chấp nhận '
      + 'ký kết công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của ba nước Đông Dương. Đây chính là bài học "thực lực là cái chiêng, '
      + 'ngoại giao là cái tiếng" — trên bàn đàm phán chỉ nhận được cái mà chiến trường đã giành được.' } },

{ cd: 'Kháng chiến chống Mỹ', ten: 'Việt Nam 1954 – 1975',
  moc: [
    { nam: 1954, ten: 'Hiệp định Genève' },
    { nam: 1959, ten: 'Mở đường Trường Sơn' },
    { nam: 1968, ten: 'Tổng tiến công Mậu Thân' },
    { nam: 1972, ten: 'Điện Biên Phủ trên không' },
    { nam: 1973, ten: 'Hiệp định Paris' },
    { nam: 1975, ten: 'Chiến dịch Hồ Chí Minh' }],
  nx: {
    d: 'Hai đòn quân sự năm 1968 và năm 1972 là nguyên nhân trực tiếp buộc Mỹ phải ngồi vào bàn đàm phán rồi ký Hiệp định Paris.',
    s: ['Hiệp định Paris năm 1973 lập tức chấm dứt chiến tranh, miền Nam được giải phóng ngay trong năm đó.',
        'Đường Trường Sơn được mở sau khi Hiệp định Paris được ký kết.',
        'Mỹ rút hết quân viễn chinh khỏi miền Nam ngay sau Tết Mậu Thân năm 1968.'],
    sv: {
      'Hiệp định Paris năm 1973 lập tức chấm dứt chiến tranh, miền Nam được giải phóng ngay trong năm đó.':
        'trục còn một mốc nữa ở phía sau — Hiệp định Paris chỉ buộc Mỹ rút quân, phải đến Chiến dịch Hồ Chí Minh năm 1975 miền Nam mới được giải phóng',
      'Đường Trường Sơn được mở sau khi Hiệp định Paris được ký kết.':
        'ngược thứ tự trên trục: mốc 1959 đứng trước mốc 1973 tới mười bốn năm',
      'Mỹ rút hết quân viễn chinh khỏi miền Nam ngay sau Tết Mậu Thân năm 1968.':
        'sau Mậu Thân Mỹ mới chỉ chấp nhận đàm phán và chuyển sang "Việt Nam hoá chiến tranh"; việc rút hết quân là điều khoản của Hiệp định Paris 1973' },
    v: 'Ghép mốc quân sự với mốc ngoại giao sẽ thấy rất rõ: đánh Mậu Thân 1968 ⇒ Mỹ chịu ngồi vào bàn Paris; '
      + 'đập tan cuộc tập kích chiến lược bằng B-52 cuối 1972 ⇒ Mỹ chịu ký Hiệp định Paris đầu 1973.' },
  yn: {
    d: 'Trục thời gian cho thấy mỗi bước tiến trên bàn đàm phán đều đi ngay sau một thắng lợi quân sự, theo đúng phương châm đánh cho Mỹ cút rồi mới đánh cho nguỵ nhào.',
    s: ['Thắng lợi năm 1975 là kết quả trực tiếp của Hiệp định Genève năm 1954 chứ không liên quan tới Hiệp định Paris.',
        'Ta giành thắng lợi hoàn toàn bằng con đường đàm phán, không cần đến các đòn tiến công quân sự.',
        'Việc Mỹ rút quân năm 1973 và việc chính quyền Sài Gòn sụp đổ năm 1975 là một sự kiện duy nhất.'],
    sv: {
      'Thắng lợi năm 1975 là kết quả trực tiếp của Hiệp định Genève năm 1954 chứ không liên quan tới Hiệp định Paris.':
        'bỏ qua toàn bộ phần giữa của trục; Genève 1954 chỉ tạm chia hai miền ở vĩ tuyến 17, còn điều kiện trực tiếp cho năm 1975 là việc quân Mỹ đã rút theo Hiệp định Paris 1973',
      'Ta giành thắng lợi hoàn toàn bằng con đường đàm phán, không cần đến các đòn tiến công quân sự.':
        'trái với chính các mốc trên trục — 1968, 1972 và 1975 đều là mốc quân sự, và đàm phán chỉ tiến triển ngay sau các mốc đó',
      'Việc Mỹ rút quân năm 1973 và việc chính quyền Sài Gòn sụp đổ năm 1975 là một sự kiện duy nhất.':
        'trên trục là hai mốc cách nhau hai năm, ứng với hai nhiệm vụ khác nhau: đánh cho Mỹ cút rồi mới đánh cho nguỵ nhào' },
    v: 'Đặt các mốc cạnh nhau sẽ thấy một quy luật lặp lại: 1968 tổng tiến công ⇒ Mỹ chịu đàm phán; cuối 1972 đập tan cuộc tập kích bằng B-52 ⇒ '
      + 'đầu 1973 Mỹ chịu ký; Mỹ rút quân xong thì so sánh lực lượng ở miền Nam thay đổi hẳn ⇒ 1975 ta mở cuộc Tổng tiến công và nổi dậy. '
      + 'Trục cũng cho thấy vì sao phải mở đường Trường Sơn từ 1959: không có tuyến vận chuyển chiến lược suốt mười sáu năm đó thì không thể '
      + 'dồn lực lượng cho những đòn quyết định về sau. Toàn bộ hai mươi mốt năm vì thế là một quá trình vừa đánh vừa đàm, trong đó chiến trường '
      + 'luôn quyết định bàn đàm phán chứ không phải ngược lại.' } },

{ cd: 'Chiến tranh lạnh', ten: 'Chiến tranh lạnh 1947 – 1991',
  moc: [
    { nam: 1947, ten: 'Học thuyết Truman' },
    { nam: 1949, ten: 'NATO thành lập' },
    { nam: 1955, ten: 'Tổ chức Hiệp ước Vacsava' },
    { nam: 1989, ten: 'Tuyên bố chấm dứt Chiến tranh lạnh' },
    { nam: 1991, ten: 'Liên Xô tan rã' }],
  nx: {
    d: 'Chiến tranh lạnh được tuyên bố chấm dứt năm 1989, trước khi Liên Xô tan rã năm 1991 — đó là hai sự kiện khác nhau.',
    s: ['Chiến tranh lạnh chấm dứt đúng vào lúc Liên Xô tan rã năm 1991.',
        'Tổ chức Hiệp ước Vacsava ra đời trước khi NATO được thành lập.',
        'Học thuyết Truman là văn kiện tuyên bố chấm dứt Chiến tranh lạnh.'],
    sv: {
      'Chiến tranh lạnh chấm dứt đúng vào lúc Liên Xô tan rã năm 1991.':
        'trên trục là hai mốc riêng biệt, cách nhau hai năm',
      'Tổ chức Hiệp ước Vacsava ra đời trước khi NATO được thành lập.':
        'ngược thứ tự: NATO năm 1949, Vacsava năm 1955 — Vacsava ra đời để đối trọng với NATO chứ không phải ngược lại',
      'Học thuyết Truman là văn kiện tuyên bố chấm dứt Chiến tranh lạnh.':
        'Học thuyết Truman đứng ở đầu trục, là mốc KHỞI ĐẦU của Chiến tranh lạnh' },
    v: 'Cuộc gặp cấp cao Xô – Mỹ tại đảo Malta cuối năm 1989 tuyên bố chấm dứt Chiến tranh lạnh; '
      + 'Liên Xô chỉ tan rã cuối năm 1991, do khủng hoảng kéo dài trong nội bộ và công cuộc cải tổ thất bại.' },
  yn: {
    d: 'Trục cho thấy Chiến tranh lạnh mở đầu bằng đối đầu ý thức hệ, được thể chế hoá bằng hai khối quân sự đối lập rồi kết thúc bằng một thoả thuận chính trị; sự tan rã của Liên Xô là hệ quả về sau chứ không phải điều kiện để chấm dứt Chiến tranh lạnh.',
    s: ['Chiến tranh lạnh chỉ là cuộc chạy đua vũ trang thuần tuý, không có nội dung đối đầu về ý thức hệ.',
        'Hai khối quân sự NATO và Vacsava ra đời cùng một năm và cùng giải thể một lúc.',
        'Chiến tranh lạnh kết thúc bằng một cuộc chiến tranh nóng trực tiếp giữa Liên Xô và Mỹ.'],
    sv: {
      'Chiến tranh lạnh chỉ là cuộc chạy đua vũ trang thuần tuý, không có nội dung đối đầu về ý thức hệ.':
        'ngay mốc mở đầu đã là một học thuyết chính trị công khai nêu mục tiêu ngăn chặn chủ nghĩa cộng sản, tức là đối đầu ý thức hệ có trước và chi phối chạy đua vũ trang',
      'Hai khối quân sự NATO và Vacsava ra đời cùng một năm và cùng giải thể một lúc.':
        'trục ghi rõ 1949 và 1955, cách nhau sáu năm; hơn nữa Vacsava giải thể năm 1991 còn NATO vẫn tồn tại đến nay',
      'Chiến tranh lạnh kết thúc bằng một cuộc chiến tranh nóng trực tiếp giữa Liên Xô và Mỹ.':
        'đúng đặc trưng của Chiến tranh lạnh là hai siêu cường không bao giờ đụng độ quân sự trực tiếp; mốc cuối trục là một cuộc gặp cấp cao, tức là kết thúc bằng thoả thuận' },
    v: 'Đọc trục theo ba tầng sẽ thấy toàn bộ logic của thời kỳ này. Tầng ý thức hệ: một bên nêu mục tiêu ngăn chặn chủ nghĩa cộng sản, '
      + 'bên kia tập hợp các nước xã hội chủ nghĩa. Tầng tổ chức: mỗi bên dựng một khối quân sự, khối sau ra đời để đối trọng với khối trước, '
      + 'khiến thế giới bị chia đôi trong hơn ba mươi năm. Tầng kết thúc: cuộc đối đầu không tan bằng chiến tranh mà tan bằng đàm phán, '
      + 'khi cả hai bên đều kiệt sức vì chạy đua vũ trang và Liên Xô lâm vào khủng hoảng. Vì vậy phải tách bạch hai mốc cuối: 1989 là mốc của '
      + 'quan hệ quốc tế, còn 1991 là mốc của lịch sử nội bộ Liên Xô.' } },

{ cd: 'ASEAN', ten: 'ASEAN 1967 – 2015',
  moc: [
    { nam: 1967, ten: 'ASEAN thành lập tại Bangkok' },
    { nam: 1976, ten: 'Hiệp ước Bali' },
    { nam: 1995, ten: 'Việt Nam gia nhập ASEAN' },
    { nam: 1999, ten: 'ASEAN đủ mười thành viên' },
    { nam: 2015, ten: 'Cộng đồng ASEAN thành lập' }],
  nx: {
    d: 'Việt Nam gia nhập ASEAN năm 1995, tức là hai mươi tám năm sau khi tổ chức này ra đời.',
    s: ['Việt Nam là một trong năm nước sáng lập ASEAN năm 1967.',
        'Cộng đồng ASEAN được thành lập cùng năm với tổ chức ASEAN.',
        'ASEAN đã có đủ mười thành viên ngay từ khi ký Hiệp ước Bali năm 1976.'],
    sv: {
      'Việt Nam là một trong năm nước sáng lập ASEAN năm 1967.':
        'năm nước sáng lập là Indonesia, Malaysia, Philippines, Singapore và Thái Lan; Việt Nam đứng ở mốc 1995 trên trục',
      'Cộng đồng ASEAN được thành lập cùng năm với tổ chức ASEAN.':
        'trục ghi rõ hai mốc cách nhau bốn mươi tám năm — tổ chức ra đời trước, Cộng đồng là nấc phát triển cao hơn về sau',
      'ASEAN đã có đủ mười thành viên ngay từ khi ký Hiệp ước Bali năm 1976.':
        'mốc đủ mười thành viên nằm ở năm 1999, sau Hiệp ước Bali tới hai mươi ba năm' },
    v: 'Lấy 1995 trừ 1967 được 28. Trục cũng cho thấy Việt Nam gia nhập ở giai đoạn ASEAN mở rộng, '
      + 'sau khi Chiến tranh lạnh đã kết thúc và quan hệ trong khu vực chuyển từ đối đầu sang đối thoại.' },
  yn: {
    d: 'Trục phản ánh ba bước trưởng thành của ASEAN: ra đời trong bối cảnh Chiến tranh lạnh, xác lập nguyên tắc ứng xử chung bằng Hiệp ước Bali, rồi mở rộng đủ mười nước và nâng cấp thành Cộng đồng.',
    s: ['ASEAN ngay từ khi thành lập đã là một liên minh quân sự nhằm chống lại một nước lớn trong khu vực.',
        'Việc kết nạp đủ mười thành viên diễn ra trước khi ASEAN có văn kiện quy định nguyên tắc ứng xử chung.',
        'Cộng đồng ASEAN là một nhà nước liên bang có chung chính phủ, quân đội và đồng tiền.'],
    sv: {
      'ASEAN ngay từ khi thành lập đã là một liên minh quân sự nhằm chống lại một nước lớn trong khu vực.':
        'ASEAN được lập ra với mục tiêu hợp tác kinh tế – văn hoá – xã hội và giữ ổn định khu vực, chưa bao giờ là liên minh quân sự',
      'Việc kết nạp đủ mười thành viên diễn ra trước khi ASEAN có văn kiện quy định nguyên tắc ứng xử chung.':
        'ngược thứ tự trên trục: Hiệp ước Bali năm 1976 đứng trước mốc đủ mười thành viên năm 1999',
      'Cộng đồng ASEAN là một nhà nước liên bang có chung chính phủ, quân đội và đồng tiền.':
        'Cộng đồng ASEAN là liên kết khu vực dựa trên ba trụ cột chính trị – an ninh, kinh tế và văn hoá – xã hội, các nước thành viên vẫn giữ nguyên chủ quyền' },
    v: 'Đọc dọc trục sẽ thấy ASEAN lớn lên theo ba nấc rõ rệt. Nấc thứ nhất là ra đời: năm nước lập tổ chức giữa lúc khu vực bị chia rẽ vì '
      + 'Chiến tranh lạnh, mục tiêu ban đầu chỉ là hợp tác và giữ hoà bình. Nấc thứ hai là định luật chơi: Hiệp ước Bali đưa ra các nguyên tắc '
      + 'tôn trọng chủ quyền, không can thiệp vào công việc nội bộ của nhau và giải quyết tranh chấp bằng biện pháp hoà bình, nhờ đó những nước '
      + 'từng ở hai chiến tuyến mới có thể ngồi chung một bàn. Nấc thứ ba là mở rộng và nâng cấp: có luật chơi chung rồi thì kết nạp thêm thành viên '
      + 'mới thuận lợi, đủ mười nước rồi mới đủ tầm để lập Cộng đồng với ba trụ cột. Trình tự lập luật trước, mở rộng sau chính là kinh nghiệm '
      + 'đáng chú ý nhất của tổ chức này.' } },

{ cd: 'Liên hợp quốc', ten: 'Việt Nam với Liên hợp quốc',
  moc: [
    { nam: 1945, ten: 'Liên hợp quốc thành lập' },
    { nam: 1977, ten: 'Việt Nam gia nhập Liên hợp quốc' },
    { nam: 2008, ten: 'Lần đầu là Uỷ viên không thường trực Hội đồng Bảo an' },
    { nam: 2020, ten: 'Lần thứ hai là Uỷ viên không thường trực' }],
  nx: {
    d: 'Việt Nam gia nhập Liên hợp quốc năm 1977, sau khi đất nước đã hoàn thành thống nhất về mặt nhà nước.',
    s: ['Việt Nam gia nhập Liên hợp quốc ngay khi tổ chức này ra đời năm 1945.',
        'Việt Nam là Uỷ viên thường trực Hội đồng Bảo an từ năm 2008.',
        'Việt Nam mới chỉ một lần được bầu vào Hội đồng Bảo an Liên hợp quốc.'],
    sv: {
      'Việt Nam gia nhập Liên hợp quốc ngay khi tổ chức này ra đời năm 1945.':
        'năm 1945 nước Việt Nam Dân chủ Cộng hoà vừa mới ra đời và chưa được các nước công nhận; trục ghi mốc gia nhập là năm 1977',
      'Việt Nam là Uỷ viên thường trực Hội đồng Bảo an từ năm 2008.':
        'Hội đồng Bảo an chỉ có năm uỷ viên thường trực cố định; Việt Nam được bầu làm uỷ viên KHÔNG thường trực theo nhiệm kỳ hai năm',
      'Việt Nam mới chỉ một lần được bầu vào Hội đồng Bảo an Liên hợp quốc.':
        'trên trục có hai mốc — nhiệm kỳ 2008 – 2009 và nhiệm kỳ 2020 – 2021' },
    v: 'Đất nước thống nhất về mặt nhà nước năm 1976, sang năm 1977 Việt Nam trở thành thành viên thứ 149 của Liên hợp quốc. '
      + 'Đây là bước mở đầu cho quá trình hội nhập quốc tế.' },
  yn: {
    d: 'Trục cho thấy vị thế Việt Nam đi lên theo ba nấc: từ chỗ chưa phải thành viên, trở thành thành viên, rồi được các nước tín nhiệm bầu vào cơ quan giữ trọng trách hàng đầu về hoà bình và an ninh quốc tế tới hai nhiệm kỳ.',
    s: ['Việc được bầu vào Hội đồng Bảo an chỉ là thủ tục luân phiên, không phản ánh uy tín quốc tế của một nước.',
        'Việt Nam gia nhập Liên hợp quốc trước khi đất nước được thống nhất.',
        'Là uỷ viên không thường trực, Việt Nam có quyền phủ quyết đối với các nghị quyết của Hội đồng Bảo an.'],
    sv: {
      'Việc được bầu vào Hội đồng Bảo an chỉ là thủ tục luân phiên, không phản ánh uy tín quốc tế của một nước.':
        'ghế uỷ viên không thường trực do Đại hội đồng bỏ phiếu bầu và phải đạt đa số hai phần ba, tức là kết quả của sự tín nhiệm chứ không phải luân phiên tự động',
      'Việt Nam gia nhập Liên hợp quốc trước khi đất nước được thống nhất.':
        'ngược thứ tự: thống nhất về mặt nhà nước năm 1976, gia nhập Liên hợp quốc năm 1977',
      'Là uỷ viên không thường trực, Việt Nam có quyền phủ quyết đối với các nghị quyết của Hội đồng Bảo an.':
        'quyền phủ quyết chỉ thuộc về năm uỷ viên thường trực' },
    v: 'Khoảng cách giữa các mốc nói lên rất nhiều điều. Từ 1945 đến 1977 là ba mươi hai năm chiến tranh và bị bao vây, Việt Nam đứng ngoài '
      + 'tổ chức lớn nhất hành tinh. Năm 1977, ngay sau khi đất nước thống nhất, Việt Nam trở thành thành viên — hội nhập quốc tế bắt đầu từ '
      + 'chỗ có hoà bình và có một nhà nước thống nhất. Ba mươi mốt năm tiếp theo là quá trình đổi mới và mở cửa, đến năm 2008 Việt Nam lần đầu '
      + 'được bầu vào Hội đồng Bảo an với số phiếu rất cao, rồi lặp lại điều đó năm 2020. Như vậy trục không chỉ ghi các mốc rời rạc mà cho thấy '
      + 'một đường đi lên: hoà bình và thống nhất là điều kiện của hội nhập, còn hội nhập sâu và có trách nhiệm mới đem lại vị thế.' } },

{ cd: 'Hồ Chí Minh', ten: 'Hành trình Hồ Chí Minh 1911 – 1945',
  moc: [
    { nam: 1911, ten: 'Ra đi tìm đường cứu nước' },
    { nam: 1920, ten: 'Đọc Luận cương của Lênin' },
    { nam: 1930, ten: 'Sáng lập Đảng Cộng sản Việt Nam' },
    { nam: 1941, ten: 'Về nước trực tiếp lãnh đạo cách mạng' },
    { nam: 1945, ten: 'Đọc Tuyên ngôn Độc lập' }],
  nx: {
    d: 'Từ khi ra đi tìm đường cứu nước đến khi tìm thấy con đường cứu nước, Nguyễn Ái Quốc đã trải qua chín năm.',
    s: ['Nguyễn Ái Quốc tìm thấy ngay con đường cứu nước vào năm rời bến cảng Nhà Rồng.',
        'Người sáng lập Đảng Cộng sản Việt Nam trước khi đọc Luận cương của Lênin.',
        'Người trở về nước trực tiếp lãnh đạo cách mạng ngay từ năm thành lập Đảng.'],
    sv: {
      'Nguyễn Ái Quốc tìm thấy ngay con đường cứu nước vào năm rời bến cảng Nhà Rồng.':
        'trục có hai mốc riêng: ra đi năm 1911, còn bước ngoặt tư tưởng là năm 1920',
      'Người sáng lập Đảng Cộng sản Việt Nam trước khi đọc Luận cương của Lênin.':
        'ngược thứ tự: 1920 đứng trước 1930; phải có lý luận dẫn đường thì mới có cơ sở lập chính đảng',
      'Người trở về nước trực tiếp lãnh đạo cách mạng ngay từ năm thành lập Đảng.':
        'Hội nghị thành lập Đảng năm 1930 họp ở nước ngoài; mốc về nước trên trục là năm 1941' },
    v: 'Lấy 1920 trừ 1911 được 9. Chín năm ấy Người đi qua nhiều châu lục để khảo sát các cuộc cách mạng, '
      + 'đến khi đọc Luận cương của Lênin mới khẳng định con đường cách mạng vô sản.' },
  yn: {
    d: 'Trục thể hiện một logic chặt chẽ: khảo sát thực tiễn thế giới, tìm ra con đường cách mạng vô sản, chuẩn bị rồi lập ra chính đảng, xây dựng lực lượng trong nước và cuối cùng mới giành chính quyền, khai sinh nhà nước.',
    s: ['Thắng lợi năm 1945 là kết quả của thời cơ bên ngoài, không cần đến quá trình chuẩn bị lâu dài trước đó.',
        'Người lập ra chính đảng ngay trong năm ra đi tìm đường cứu nước.',
        'Việc về nước năm 1941 chỉ là một chuyến đi bình thường, không gắn với việc chuẩn bị lực lượng cho khởi nghĩa.'],
    sv: {
      'Thắng lợi năm 1945 là kết quả của thời cơ bên ngoài, không cần đến quá trình chuẩn bị lâu dài trước đó.':
        'thời cơ chỉ biến thành thắng lợi khi đã có sẵn đường lối, chính đảng và lực lượng — đó chính là bốn mốc đứng trước năm 1945 trên trục',
      'Người lập ra chính đảng ngay trong năm ra đi tìm đường cứu nước.':
        'trục ghi rõ hai mốc cách nhau mười chín năm',
      'Việc về nước năm 1941 chỉ là một chuyến đi bình thường, không gắn với việc chuẩn bị lực lượng cho khởi nghĩa.':
        'ngay sau khi về nước, Người chủ trì hội nghị đặt nhiệm vụ giải phóng dân tộc lên hàng đầu, lập mặt trận và xây dựng căn cứ địa — tức là bước chuẩn bị trực tiếp cho khởi nghĩa' },
    v: 'Bốn khoảng cách trên trục ứng với bốn nhiệm vụ khác nhau. Chín năm đầu là đi và nhìn: khảo sát các nước tư bản để hiểu vì sao ở đâu '
      + 'người lao động cũng khổ. Mười năm tiếp theo là chuẩn bị về tư tưởng và tổ chức: truyền bá lý luận, đào tạo cán bộ, lập các tổ chức tiền '
      + 'thân, để năm 1930 hợp nhất được ba tổ chức cộng sản thành một chính đảng duy nhất. Mười một năm sau đó là chuẩn bị lực lượng ngay trong '
      + 'nước: mặt trận, căn cứ địa và lực lượng vũ trang. Đến năm 1945, khi thời cơ xuất hiện thì mọi điều kiện bên trong đã sẵn sàng, nên chỉ '
      + 'trong hơn hai tuần cả nước giành được chính quyền. Trục vì thế bác bỏ cách nghĩ cho rằng thắng lợi năm 1945 là chuyện may mắn.' } },

{ cd: 'Chủ nghĩa xã hội từ 1917', ten: 'Chủ nghĩa xã hội 1917 – 1991',
  moc: [
    { nam: 1917, ten: 'Cách mạng tháng Mười Nga' },
    { nam: 1922, ten: 'Liên Xô được thành lập' },
    { nam: 1949, ten: 'Nước Cộng hoà Nhân dân Trung Hoa ra đời' },
    { nam: 1959, ten: 'Cách mạng Cuba thắng lợi' },
    { nam: 1991, ten: 'Liên Xô tan rã' }],
  nx: {
    d: 'Nước Nga Xô viết ra đời năm 1917, còn Liên Xô — nhà nước liên bang gồm nhiều nước cộng hoà — mãi năm 1922 mới được thành lập.',
    s: ['Liên Xô được thành lập ngay trong năm nổ ra Cách mạng tháng Mười.',
        'Cách mạng Cuba thắng lợi trước khi nước Cộng hoà Nhân dân Trung Hoa ra đời.',
        'Chủ nghĩa xã hội chấm dứt hoàn toàn trên thế giới vào năm 1991.'],
    sv: {
      'Liên Xô được thành lập ngay trong năm nổ ra Cách mạng tháng Mười.':
        'trục ghi hai mốc cách nhau năm năm — giữa hai mốc đó là nội chiến và can thiệp của nước ngoài',
      'Cách mạng Cuba thắng lợi trước khi nước Cộng hoà Nhân dân Trung Hoa ra đời.':
        'ngược thứ tự: 1949 đứng trước 1959',
      'Chủ nghĩa xã hội chấm dứt hoàn toàn trên thế giới vào năm 1991.':
        'chỉ mô hình ở Liên Xô và Đông Âu sụp đổ; Trung Quốc, Việt Nam, Cuba và Lào vẫn tiếp tục con đường xã hội chủ nghĩa với những cải cách riêng' },
    v: 'Cách mạng tháng Mười lập ra chính quyền Xô viết ở nước Nga; sau khi nội chiến kết thúc, '
      + 'các nước cộng hoà Xô viết mới hợp lại thành Liên bang Cộng hoà xã hội chủ nghĩa Xô viết vào cuối năm 1922.' },
  yn: {
    d: 'Trục cho thấy chủ nghĩa xã hội đi từ thắng lợi ở một nước, mở rộng thành hệ thống thế giới, rồi khủng hoảng và sụp đổ ở nơi khởi đầu, trong khi một số nước khác vẫn tiếp tục con đường ấy bằng cách cải cách, đổi mới.',
    s: ['Sự sụp đổ năm 1991 chứng tỏ mọi nước xã hội chủ nghĩa đều đã từ bỏ con đường của mình.',
        'Chủ nghĩa xã hội chỉ tồn tại trong phạm vi châu Âu, không lan sang châu Á và châu Mỹ.',
        'Liên Xô tan rã do bị một nước ngoài tiến công quân sự trực tiếp.'],
    sv: {
      'Sự sụp đổ năm 1991 chứng tỏ mọi nước xã hội chủ nghĩa đều đã từ bỏ con đường của mình.':
        'cái sụp đổ là một mô hình cụ thể ở Liên Xô và Đông Âu, không phải toàn bộ con đường; nhiều nước vẫn kiên trì và điều chỉnh bằng cải cách, đổi mới',
      'Chủ nghĩa xã hội chỉ tồn tại trong phạm vi châu Âu, không lan sang châu Á và châu Mỹ.':
        'trái với chính các mốc trên trục — năm 1949 ở châu Á và năm 1959 ở khu vực Mỹ Latinh',
      'Liên Xô tan rã do bị một nước ngoài tiến công quân sự trực tiếp.':
        'nguyên nhân là khủng hoảng kinh tế – xã hội kéo dài, mô hình quản lý quan liêu bao cấp trì trệ và công cuộc cải tổ mắc sai lầm, không có cuộc tiến công quân sự nào từ bên ngoài' },
    v: 'Đọc trục theo hình vòng cung sẽ thấy ba đoạn. Đoạn đi lên: từ một nước duy nhất năm 1917, chủ nghĩa xã hội trở thành nhà nước liên bang '
      + 'rộng lớn năm 1922 rồi lan sang châu Á và khu vực Mỹ Latinh trong các mốc 1949 và 1959, trở thành một hệ thống thế giới. Đoạn chững lại: '
      + 'mô hình quản lý tập trung quan liêu bao cấp phát huy tác dụng trong chiến tranh và công nghiệp hoá ban đầu nhưng ngày càng trì trệ khi '
      + 'kinh tế đòi hỏi năng suất và đổi mới công nghệ. Đoạn sụp đổ: cải tổ mắc sai lầm khiến Liên Xô tan rã năm 1991. Bài học rút ra không phải '
      + 'là con đường sai, mà là mô hình cụ thể phải được đổi mới kịp thời — điều mà những nước còn lại đã làm.' } },

{ cd: 'Công cuộc Đổi mới', ten: 'Đổi mới và hội nhập 1986 – 2007',
  moc: [
    { nam: 1986, ten: 'Đại hội VI khởi xướng Đổi mới' },
    { nam: 1991, ten: 'Cương lĩnh xây dựng đất nước' },
    { nam: 1995, ten: 'Gia nhập ASEAN, bình thường hoá quan hệ với Mỹ' },
    { nam: 2007, ten: 'Gia nhập Tổ chức Thương mại Thế giới' }],
  nx: {
    d: 'Đổi mới bắt đầu từ bên trong đất nước, sau đó mới dẫn tới hội nhập khu vực rồi hội nhập toàn cầu.',
    s: ['Việt Nam gia nhập Tổ chức Thương mại Thế giới trước khi gia nhập ASEAN.',
        'Đường lối Đổi mới được đề ra tại Đại hội VII năm 1991.',
        'Đổi mới chỉ là đổi mới về chính trị, không đụng chạm tới cơ chế kinh tế.'],
    sv: {
      'Việt Nam gia nhập Tổ chức Thương mại Thế giới trước khi gia nhập ASEAN.':
        'ngược thứ tự trên trục: 1995 đứng trước 2007',
      'Đường lối Đổi mới được đề ra tại Đại hội VII năm 1991.':
        'mốc mở đầu trên trục là Đại hội VI cuối năm 1986; Đại hội VII năm 1991 thông qua Cương lĩnh, tức là bước tiếp theo chứ không phải bước khởi xướng',
      'Đổi mới chỉ là đổi mới về chính trị, không đụng chạm tới cơ chế kinh tế.':
        'nội dung trung tâm của Đổi mới chính là chuyển từ cơ chế tập trung quan liêu bao cấp sang kinh tế hàng hoá nhiều thành phần vận hành theo cơ chế thị trường' },
    v: 'Ba mốc sau đều là hệ quả của mốc đầu: có đổi mới cơ chế kinh tế trong nước thì mới có cơ sở để mở cửa, '
      + 'gia nhập tổ chức khu vực rồi tổ chức thương mại toàn cầu.' },
  yn: {
    d: 'Trục cho thấy một trình tự có tính quy luật: đổi mới tư duy kinh tế trong nước tạo ra nội lực, nội lực đủ mạnh mới mở cửa hội nhập khu vực, và hội nhập khu vực là bước tập dượt cho hội nhập toàn cầu.',
    s: ['Việt Nam hội nhập toàn cầu trước, nhờ đó mới có động lực đổi mới ở trong nước.',
        'Đổi mới là công việc làm một lần vào năm 1986 rồi kết thúc, các mốc sau không liên quan.',
        'Việc gia nhập các tổ chức quốc tế đòi hỏi Việt Nam phải từ bỏ độc lập, tự chủ trong đường lối.'],
    sv: {
      'Việt Nam hội nhập toàn cầu trước, nhờ đó mới có động lực đổi mới ở trong nước.':
        'đảo ngược trục: mốc toàn cầu nằm ở cuối, cách mốc khởi xướng Đổi mới hai mươi mốt năm',
      'Đổi mới là công việc làm một lần vào năm 1986 rồi kết thúc, các mốc sau không liên quan.':
        'chính các mốc 1991, 1995 và 2007 cho thấy Đổi mới là quá trình liên tục, mỗi mốc bổ sung một nội dung mới',
      'Việc gia nhập các tổ chức quốc tế đòi hỏi Việt Nam phải từ bỏ độc lập, tự chủ trong đường lối.':
        'phương châm nhất quán là chủ động hội nhập trên cơ sở giữ vững độc lập, tự chủ; hội nhập là mở rộng quan hệ chứ không phải lệ thuộc' },
    v: 'Khoảng cách giữa các mốc chính là thời gian tích luỹ điều kiện. Từ 1986 đến 1991 là năm năm để cơ chế mới chứng minh hiệu quả: '
      + 'từ chỗ thiếu lương thực, đất nước đã tự cân đối được và bắt đầu xuất khẩu gạo, đủ cơ sở thực tiễn để đại hội tiếp theo khái quát thành '
      + 'cương lĩnh. Từ 1991 đến 1995 là bốn năm phá thế bao vây cấm vận, kết quả là cùng một năm vừa gia nhập tổ chức khu vực vừa bình thường '
      + 'hoá quan hệ với đối thủ cũ. Từ 1995 đến 2007 là mười hai năm sửa luật, cải cách thủ tục và làm quen với luật chơi quốc tế trước khi bước '
      + 'vào sân chơi thương mại toàn cầu. Trục vì thế cho thấy hội nhập không phải là mở cửa ào ạt mà là quá trình chuẩn bị nội lực từng bước.' } }

];

/* Ba mốc trở lên mới đủ chỗ ra bốn phương án đọc mốc */
const veTruc = t => TD.hinhTrucThoiGian(t.moc, t.ten);

/* Năm bộ dưới đây dùng chung kho trục thời gian, mỗi trục gắn với một chuyên
   đề. Khai danh sách đó ra để Luyện Công biết bộ này phục vụ chuyên đề nào. */
const CD_TRUC = TRUC.map(x => x.cd).filter((x, i, a) => x && a.indexOf(x) === i);

TD.GEN.su = (TD.GEN.su || []).concat([

/* ---------- MỨC 1: đọc thẳng một mốc trên trục ---------- */
{ ma: 'su-hinh-docmoc', chuong: 'Tư liệu lịch sử', muc: 1, dang: 'mc', _cdHoTro: CD_TRUC,
  tao(R, cd) {
    /* Bộ này phục vụ nhiều chuyên đề. Khi Luyện Công truyền chuyên đề vào thì
       chỉ được lấy trục thuộc đúng chuyên đề đó, không thì câu ra lạc đề. */
    const bo = TRUC.filter(x => !cd || x.cd === cd);
    const t = R.chon(bo.length ? bo : TRUC);
    const i = R.nguyen(0, t.moc.length - 1);
    const dung = t.moc[i].ten;
    const nhieu = baNhieu(dung, TD.xaoR(R, t.moc.map(m => m.ten)));
    if (!nhieu) return null;
    const sv = {};
    t.moc.forEach(m => { if (m.ten !== dung) sv[m.ten] = `sự kiện này nằm ở mốc năm ${m.nam} trên trục, không phải năm ${t.moc[i].nam}`; });
    const oo = MC(R, `Cho trục thời gian sau:${veTruc(t)}Theo trục thời gian trên, sự kiện nào diễn ra vào năm ${t.moc[i].nam}?`,
      { d: dung, s: nhieu, sv: sv,
        v: `Dò theo trục tới vạch ghi năm ${t.moc[i].nam}, nhãn tương ứng là "${dung}".` },
      'Câu đọc mốc chỉ cần dóng đúng vạch năm với nhãn sự kiện — đừng vội nhớ theo trí nhớ mà bỏ qua hình.');
    /* Nhãn chương phải là tên chuyên đề của chính trục vừa chọn, không thì
       người học đang ôn Liên hợp quốc lại thấy chương ghi "Tư liệu lịch sử". */
    return oo ? Object.assign(oo, { chuong: t.cd }) : null;
  } },

/* ---------- MỨC 2: khoảng cách năm và thứ tự trước sau ---------- */
{ ma: 'su-hinh-khoangcach', chuong: 'Tư liệu lịch sử', muc: 2, dang: 'mc', _cdHoTro: CD_TRUC,
  tao(R, cd) {
    /* Bộ này phục vụ nhiều chuyên đề. Khi Luyện Công truyền chuyên đề vào thì
       chỉ được lấy trục thuộc đúng chuyên đề đó, không thì câu ra lạc đề. */
    const bo = TRUC.filter(x => !cd || x.cd === cd);
    const t = R.chon(bo.length ? bo : TRUC);
    const kieu = R.chon(['cach', 'sau']);
    if (kieu === 'cach') {
      let i = R.nguyen(0, t.moc.length - 2);
      let j = R.nguyen(i + 1, t.moc.length - 1);
      const dung = String(t.moc[j].nam - t.moc[i].nam) + ' năm';
      /* nhiễu lấy từ chính các khoảng cách khác trên trục cho hợp lý */
      const ung = [];
      for (let a = 0; a < t.moc.length; a++)
        for (let b = a + 1; b < t.moc.length; b++) ung.push(String(t.moc[b].nam - t.moc[a].nam) + ' năm');
      const nhieu = baNhieu(dung, TD.xaoR(R, ung));
      if (!nhieu) return null;
      const oo = MC(R, `Cho trục thời gian sau:${veTruc(t)}Theo trục thời gian trên, sự kiện "${t.moc[i].ten}" và sự kiện "${t.moc[j].ten}" cách nhau bao nhiêu năm?`,
        { d: dung, s: nhieu,
          sv: (() => { const s = {}; nhieu.forEach(x => { s[x] = 'đây là khoảng cách của một cặp mốc khác trên trục, không phải cặp mà đề hỏi'; }); return s; })(),
          v: `Lấy năm của mốc sau trừ năm của mốc trước: ${t.moc[j].nam} − ${t.moc[i].nam} = ${t.moc[j].nam - t.moc[i].nam}.` },
        'Khoảng cách hai mốc luôn là phép trừ hai con số ghi ngay dưới vạch — đừng nhẩm theo cảm giác "lâu" hay "gần".');
    }
    const i = R.nguyen(0, t.moc.length - 2);
    const dung = t.moc[i + 1].ten;
    const nhieu = baNhieu(dung, TD.xaoR(R, t.moc.map(m => m.ten)));
    if (!nhieu) return null;
    const sv = {};
    t.moc.forEach((m, k) => {
      if (m.ten === dung) return;
      sv[m.ten] = k <= i ? `mốc năm ${m.nam} nằm TRƯỚC mốc mà đề hỏi` : `mốc năm ${m.nam} có đứng sau, nhưng còn một mốc khác xen vào giữa nên không phải sự kiện kế tiếp`;
    });
    const oo = MC(R, `Cho trục thời gian sau:${veTruc(t)}Theo trục thời gian trên, sự kiện nào diễn ra ngay sau sự kiện "${t.moc[i].ten}"?`,
      { d: dung, s: nhieu, sv: sv,
        v: `Trên trục, mốc đứng liền sau năm ${t.moc[i].nam} là năm ${t.moc[i + 1].nam} — ứng với "${dung}".` },
      'Hỏi "ngay sau" là hỏi mốc LIỀN KỀ, không phải mốc cuối cùng của trục.');
    /* Nhãn chương phải là tên chuyên đề của chính trục vừa chọn, không thì
       người học đang ôn Liên hợp quốc lại thấy chương ghi "Tư liệu lịch sử". */
    return oo ? Object.assign(oo, { chuong: t.cd }) : null;
  } },

/* ---------- MỨC 3: nhận định về mối liên hệ giữa các mốc ---------- */
{ ma: 'su-hinh-nhandinh', chuong: 'Tư liệu lịch sử', muc: 3, dang: 'mc', _cdHoTro: CD_TRUC,
  tao(R, cd) {
    /* Bộ này phục vụ nhiều chuyên đề. Khi Luyện Công truyền chuyên đề vào thì
       chỉ được lấy trục thuộc đúng chuyên đề đó, không thì câu ra lạc đề. */
    const bo = TRUC.filter(x => !cd || x.cd === cd);
    const t = R.chon(bo.length ? bo : TRUC);
    const oo = MC(R, `Cho trục thời gian sau:${veTruc(t)}Nhận định nào sau đây đúng khi khai thác trục thời gian trên?`,
      { d: t.nx.d, s: t.nx.s, sv: t.nx.sv, v: t.nx.v },
      'Câu nhận định luôn giấu bẫy ở THỨ TỰ và ở việc gộp hai sự kiện khác nhau làm một — cứ dóng lại từng mốc trên hình là loại được.');
    /* Nhãn chương phải là tên chuyên đề của chính trục vừa chọn, không thì
       người học đang ôn Liên hợp quốc lại thấy chương ghi "Tư liệu lịch sử". */
    return oo ? Object.assign(oo, { chuong: t.cd }) : null;
  } },

/* ---------- MỨC 4: rút ra quy luật của cả giai đoạn ---------- */
{ ma: 'su-hinh-quyluat', chuong: 'Tư liệu lịch sử', muc: 4, dang: 'mc', _cdHoTro: CD_TRUC,
  tao(R, cd) {
    /* Bộ này phục vụ nhiều chuyên đề. Khi Luyện Công truyền chuyên đề vào thì
       chỉ được lấy trục thuộc đúng chuyên đề đó, không thì câu ra lạc đề. */
    const bo = TRUC.filter(x => !cd || x.cd === cd);
    const t = R.chon(bo.length ? bo : TRUC);
    const oo = MC(R, `Cho trục thời gian sau:${veTruc(t)}Từ toàn bộ các mốc trên trục thời gian, có thể rút ra nhận xét khái quát nào sau đây?`,
      { d: t.yn.d, s: t.yn.s, sv: t.yn.sv, v: t.yn.v },
      'Câu khái quát không hỏi từng mốc mà hỏi SỢI DÂY nối các mốc: điều kiện nào dẫn tới điều kiện nào. '
      + 'Phương án nào chỉ đúng với một mốc lẻ, hoặc đảo ngược quan hệ nhân quả, thì loại.');
    /* Nhãn chương phải là tên chuyên đề của chính trục vừa chọn, không thì
       người học đang ôn Liên hợp quốc lại thấy chương ghi "Tư liệu lịch sử". */
    return oo ? Object.assign(oo, { chuong: t.cd }) : null;
  } },

/* ---------- MỨC 3: đúng/sai bốn ý trên cùng một trục ---------- */
{ ma: 'su-hinh-dungsai', chuong: 'Tư liệu lịch sử', muc: 3, dang: 'ds', _cdHoTro: CD_TRUC,
  tao(R, cd) {
    /* Bộ này phục vụ nhiều chuyên đề. Khi Luyện Công truyền chuyên đề vào thì
       chỉ được lấy trục thuộc đúng chuyên đề đó, không thì câu ra lạc đề. */
    const bo = TRUC.filter(x => !cd || x.cd === cd);
    const t = R.chon(bo.length ? bo : TRUC);
    const sai = TD.xaoR(R, t.nx.s.concat(t.yn.s)).slice(0, 2);
    const y = TD.xaoR(R, [
      { t: t.nx.d, a: true }, { t: t.yn.d, a: true },
      { t: sai[0], a: false }, { t: sai[1], a: false }]);
    const nhan = ['a', 'b', 'c', 'd'];
    const giai = y.map((x, k) => `Ý ${nhan[k]} ${x.a ? 'ĐÚNG' : 'SAI'}: `
      + (x.a ? (x.t === t.nx.d ? t.nx.v : t.yn.v)
             : ((t.nx.sv && t.nx.sv[x.t]) || (t.yn.sv && t.yn.sv[x.t]) || 'không khớp với các mốc trên trục.'))).join('\n');
    return { q: `Cho trục thời gian sau:${veTruc(t)}Xét các phát biểu sau:`,
      items: y, giai: giai,
      /* nhãn chương lấy theo trục vừa chọn, không để trơ "Tư liệu lịch sử" */
      chuong: t.cd,
      meo: 'Dạng đúng/sai bốn ý thường có hai ý đọc mốc và hai ý khái quát. '
        + 'Làm chắc hai ý đọc mốc trước để ăn điểm, rồi mới cân nhắc hai ý còn lại.' };
  } }

]);

/* Đánh dấu mẫu có hình */
(function () {
  const MA = ['su-hinh-docmoc', 'su-hinh-khoangcach', 'su-hinh-nhandinh',
              'su-hinh-quyluat', 'su-hinh-dungsai'];
  for (const mon of Object.keys(TD.GEN))
    for (const t of TD.GEN[mon]) if (MA.indexOf(t.ma) >= 0) t._hinh = true;
})();
})();
