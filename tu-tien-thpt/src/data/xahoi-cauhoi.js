/* ============================================================
   LỊCH SỬ – ĐỊA LÍ – GDKT&PL – TIẾNG ANH : NGÂN HÀNG CÂU HỎI
   (Ngữ văn thi tự luận nên dùng thẻ kỹ năng, không có trắc nghiệm)
   ============================================================ */
/* Từ 2025 đề Tiếng Anh đã BỎ dạng ngữ âm và trọng âm, nên hai câu viết tay
   thuộc hai dạng đó đã được gỡ khỏi kho — giữ lại là bắt học sinh ôn thứ
   không thi, trái với chính thẻ Cấm Thư trong app. */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

/* ==================== LỊCH SỬ ==================== */
TD.KHO.su = [
{ chuong: 'Liên hợp quốc', dang: 'mc', muc: 1,
  q: 'Việt Nam chính thức gia nhập Liên hợp quốc vào thời gian nào?',
  opts: ['20/9/1977', '28/7/1995', '11/1/2007', '24/10/1945'], ans: 0,
  giai: 'Việt Nam gia nhập Liên hợp quốc ngày 20/9/1977, trở thành thành viên thứ 149. Các mốc còn lại: 28/7/1995 gia nhập ASEAN, 11/1/2007 gia nhập WTO, 24/10/1945 là ngày Liên hợp quốc thành lập.',
  meo: 'Ba mốc hội nhập phải thuộc: LHQ 1977 – ASEAN 1995 – WTO 2007.' },

{ chuong: 'ASEAN', dang: 'mc', muc: 1,
  q: 'Tổ chức ASEAN được thành lập năm 1967 với bao nhiêu nước thành viên sáng lập?',
  opts: ['3', '5', '6', '10'], ans: 1,
  giai: 'ASEAN thành lập ngày 8/8/1967 tại Bangkok với 5 nước: Indonesia, Malaysia, Philippines, Singapore và Thái Lan.',
  meo: 'Nhớ "5 nước – 1967 – Bangkok". Đến nay ASEAN có 10 thành viên.' },

{ chuong: 'Cách mạng tháng Tám', dang: 'mc', muc: 2,
  q: 'Nội dung nào phản ánh đúng nhất về thời cơ của Cách mạng tháng Tám năm 1945?',
  opts: [
    'Quân Đồng minh đã vào Đông Dương giải giáp quân Nhật',
    'Phát xít Nhật đầu hàng Đồng minh, quân Nhật ở Đông Dương rệu rã, quân Đồng minh chưa vào',
    'Thực dân Pháp đã hoàn toàn rút khỏi Đông Dương',
    'Chiến tranh thế giới thứ hai vừa mới bùng nổ'
  ], ans: 1,
  giai: 'Thời cơ "ngàn năm có một" xuất hiện khi Nhật đầu hàng Đồng minh (15/8/1945): kẻ thù chính đã gục ngã, chính quyền tay sai hoang mang, còn quân Đồng minh thì chưa kịp vào Đông Dương. Đây là khoảng trống quyền lực để ta giành chính quyền.',
  meo: 'Thời cơ chỉ là điều kiện KHÁCH QUAN. Nhân tố quyết định vẫn là sự chuẩn bị chủ quan suốt 15 năm của Đảng.' },

{ chuong: 'Kháng chiến chống Pháp', dang: 'mc', muc: 2,
  q: 'Chiến dịch nào đánh dấu quân ta giành được thế chủ động trên chiến trường chính Bắc Bộ?',
  opts: ['Việt Bắc thu – đông 1947', 'Biên giới thu – đông 1950', 'Điện Biên Phủ 1954', 'Hoà Bình 1951'], ans: 1,
  giai: 'Chiến dịch Biên giới thu – đông 1950 là chiến dịch đầu tiên ta chủ động mở, khai thông biên giới Việt – Trung và giành thế chủ động chiến lược trên chiến trường chính Bắc Bộ. Việt Bắc 1947 chỉ làm phá sản kế hoạch "đánh nhanh thắng nhanh".',
  meo: '1947 = phá sản đánh nhanh thắng nhanh; 1950 = giành thế chủ động; 1954 = kết thúc chiến tranh.' },

{ chuong: 'Chiến tranh lạnh', dang: 'mc', muc: 2,
  q: 'Sự kiện nào đánh dấu trật tự thế giới hai cực Ianta sụp đổ hoàn toàn?',
  opts: [
    'Cuộc gặp gỡ tại Malta năm 1989',
    'Bức tường Berlin sụp đổ năm 1989',
    'Liên Xô tan rã năm 1991',
    'Tổ chức Hiệp ước Warsaw giải thể năm 1991'
  ], ans: 2,
  giai: 'Chiến tranh lạnh chấm dứt năm 1989 (cuộc gặp Malta), nhưng trật tự hai cực chỉ thực sự sụp đổ khi một trong hai cực không còn tồn tại — tức khi Liên Xô tan rã ngày 25/12/1991.',
  meo: '1989 kết thúc Chiến tranh lạnh ≠ 1991 sụp đổ trật tự hai cực. Hai mốc, hai ý nghĩa.' },

{ chuong: 'Hồ Chí Minh', dang: 'mc', muc: 3,
  q: 'Sự kiện nào đánh dấu Nguyễn Ái Quốc tìm ra con đường cứu nước đúng đắn cho dân tộc Việt Nam?',
  opts: [
    'Ra đi tìm đường cứu nước năm 1911',
    'Gửi bản Yêu sách của nhân dân An Nam năm 1919',
    'Đọc Sơ thảo Luận cương của Lênin tháng 7/1920',
    'Tham gia sáng lập Đảng Cộng sản Pháp tháng 12/1920'
  ], ans: 2,
  giai: 'Tháng 7/1920, khi đọc "Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa" của Lênin, Nguyễn Ái Quốc khẳng định con đường giải phóng dân tộc Việt Nam là con đường cách mạng vô sản. Tháng 12/1920 mới là mốc trở thành người cộng sản Việt Nam đầu tiên.',
  meo: '7/1920 = tìm ra con đường; 12/1920 = trở thành người cộng sản. Đừng đảo hai mốc này.' },

{ chuong: 'Kháng chiến chống Mỹ', dang: 'ds', muc: 3,
  q: 'Về Hiệp định Paris năm 1973 về chấm dứt chiến tranh, lập lại hoà bình ở Việt Nam, xét các phát biểu sau:',
  items: [
    { t: 'Hiệp định được kí kết ngày 27/1/1973.', a: true },
    { t: 'Hoa Kỳ cam kết tôn trọng độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của Việt Nam.', a: true },
    { t: 'Theo Hiệp định, quân đội Sài Gòn phải rút khỏi miền Nam Việt Nam.', a: false },
    { t: 'Hiệp định tạo thời cơ thuận lợi để nhân dân ta tiến lên giải phóng hoàn toàn miền Nam.', a: true }
  ],
  giai: 'Ý a ĐÚNG: Hiệp định kí ngày 27/1/1973 tại Paris.\nÝ b ĐÚNG: đây là điều khoản quan trọng nhất về mặt pháp lí.\nÝ c SAI: Hiệp định quy định HOA KỲ và quân đồng minh phải rút hết quân, còn quân đội Sài Gòn vẫn ở lại miền Nam.\nÝ d ĐÚNG: "Mỹ cút" tạo điều kiện để ta tiến tới "nguỵ nhào" trong Đại thắng mùa Xuân 1975.',
  meo: 'Ý nghĩa cốt lõi của Hiệp định Paris: Mỹ rút quân, so sánh lực lượng thay đổi có lợi cho ta.' },

{ chuong: 'Đổi mới', dang: 'ds', muc: 3,
  q: 'Về công cuộc Đổi mới ở Việt Nam từ năm 1986, xét các phát biểu sau:',
  items: [
    { t: 'Đường lối Đổi mới được đề ra tại Đại hội đại biểu toàn quốc lần thứ VI của Đảng (12/1986).', a: true },
    { t: 'Đổi mới bắt đầu và trọng tâm là đổi mới về kinh tế.', a: true },
    { t: 'Đổi mới có nghĩa là thay đổi mục tiêu chủ nghĩa xã hội.', a: false },
    { t: 'Việt Nam từ một nước thiếu lương thực đã trở thành nước xuất khẩu gạo hàng đầu thế giới.', a: true }
  ],
  giai: 'Ý a ĐÚNG: Đại hội VI (12/1986) khởi xướng Đổi mới.\nÝ b ĐÚNG: trọng tâm là đổi mới kinh tế, chuyển sang kinh tế thị trường định hướng XHCN.\nÝ c SAI: Đổi mới KHÔNG thay đổi mục tiêu CNXH mà thay đổi cách thức, biện pháp thực hiện mục tiêu đó.\nÝ d ĐÚNG: đây là thành tựu nổi bật nhất của ba chương trình kinh tế lớn.',
  meo: 'Câu "Đổi mới là thay đổi mục tiêu CNXH" luôn SAI — đây là điểm mấu chốt về bản chất của Đổi mới.' }
];

/* ==================== ĐỊA LÍ ==================== */
TD.KHO.dia = [
{ chuong: 'Vị trí địa lí', dang: 'mc', muc: 1,
  q: 'Lãnh thổ Việt Nam nằm hoàn toàn trong khu vực nào sau đây?',
  opts: ['Ngoại chí tuyến bán cầu Bắc', 'Nội chí tuyến bán cầu Bắc', 'Nội chí tuyến bán cầu Nam', 'Vùng ôn đới'], ans: 1,
  giai: 'Việt Nam kéo dài từ 8°34′B đến 23°23′B, tức nằm hoàn toàn trong vùng nội chí tuyến bán cầu Bắc (giữa Xích đạo và chí tuyến Bắc 23°27′B). Đây là nguyên nhân khiến thiên nhiên nước ta mang tính chất nhiệt đới.',
  meo: 'Nội chí tuyến ⇒ nhiệt đới. Kết hợp gió mùa và Biển Đông ⇒ nhiệt đới ẨM GIÓ MÙA.' },

{ chuong: 'Khí hậu', dang: 'mc', muc: 2,
  q: 'Gió gây hiệu ứng phơn khô nóng cho vùng Bắc Trung Bộ vào đầu mùa hạ là',
  opts: ['gió mùa Đông Bắc', 'gió Tây Nam từ vịnh Bengal', 'gió Tín phong bán cầu Bắc', 'gió mùa Tây Nam từ Nam bán cầu'], ans: 1,
  giai: 'Đầu mùa hạ, khối khí nhiệt đới ẩm từ Bắc Ấn Độ Dương (vịnh Bengal) thổi theo hướng tây nam, gây mưa cho Nam Bộ và Tây Nguyên. Khi vượt dãy Trường Sơn, khối khí bị biến tính trở nên khô nóng — đó là gió phơn Tây Nam (gió Lào) ở Bắc Trung Bộ.',
  meo: 'Gió Lào không phải bản chất khô nóng, mà khô nóng do bị chắn bởi dãy Trường Sơn (hiệu ứng phơn).' },

{ chuong: 'Vùng kinh tế', dang: 'mc', muc: 2,
  q: 'Vùng nào sau đây có sản lượng lúa và thuỷ sản lớn nhất cả nước?',
  opts: ['Đồng bằng sông Hồng', 'Đông Nam Bộ', 'Đồng bằng sông Cửu Long', 'Duyên hải Nam Trung Bộ'], ans: 2,
  giai: 'Đồng bằng sông Cửu Long là vựa lúa và vựa thuỷ sản số 1 cả nước nhờ diện tích đất phù sa rộng, mạng lưới sông ngòi kênh rạch dày đặc và khí hậu cận xích đạo ổn định.',
  meo: 'ĐBSCL dẫn đầu nông nghiệp – thuỷ sản; Đông Nam Bộ dẫn đầu công nghiệp – dịch vụ.' },

{ chuong: 'Vùng kinh tế', dang: 'mc', muc: 2,
  q: 'Vùng kinh tế nào của nước ta không giáp biển?',
  opts: ['Tây Nguyên', 'Bắc Trung Bộ', 'Đông Nam Bộ', 'Trung du và miền núi Bắc Bộ'], ans: 0,
  giai: 'Tây Nguyên là vùng duy nhất của nước ta không giáp biển. Trung du và miền núi Bắc Bộ tuy chủ yếu là núi nhưng vẫn có Quảng Ninh giáp biển (theo phân vùng có tỉnh này).',
  meo: 'Nhớ một câu: "Tây Nguyên — vùng duy nhất không giáp biển" ⇒ không có thế mạnh kinh tế biển.' },

{ chuong: 'Kỹ năng biểu đồ', dang: 'mc', muc: 3,
  q: 'Cho bảng số liệu về cơ cấu GDP phân theo khu vực kinh tế của nước ta các năm 2010, 2015, 2020, 2023 (đơn vị %). Biểu đồ nào thích hợp nhất để thể hiện sự chuyển dịch cơ cấu GDP?',
  opts: ['Biểu đồ tròn', 'Biểu đồ miền', 'Biểu đồ cột ghép', 'Biểu đồ đường'], ans: 1,
  giai: 'Từ khoá "cơ cấu" + "chuyển dịch" + số năm ≥ 4 ⇒ chọn biểu đồ MIỀN. Biểu đồ tròn chỉ dùng khi có 1–2 (tối đa 3) mốc thời gian. Biểu đồ đường dùng cho tốc độ tăng trưởng.',
  meo: 'Quy tắc vàng: cơ cấu + ít năm ⇒ tròn; cơ cấu + nhiều năm (≥ 4) ⇒ miền; tốc độ tăng trưởng ⇒ đường.' },

{ chuong: 'Kỹ năng số liệu', dang: 'tln', muc: 3,
  q: 'Năm 2020 một tỉnh có tổng sản lượng lúa là 2 400 nghìn tấn trên diện tích gieo trồng 400 nghìn ha. Tính năng suất lúa của tỉnh đó (đơn vị tạ/ha).',
  ans: '60',
  giai: 'Năng suất = Sản lượng / Diện tích = 2400 nghìn tấn / 400 nghìn ha = 6 tấn/ha.\nĐổi đơn vị: 1 tấn = 10 tạ ⇒ 6 tấn/ha = 60 tạ/ha.',
  meo: 'Năng suất lúa ở Việt Nam thường ghi bằng tạ/ha (khoảng 50–70). Nếu tính ra 6 thì phải đổi sang tạ.' },

{ chuong: 'Dân cư', dang: 'ds', muc: 2,
  q: 'Về đặc điểm dân cư và nguồn lao động nước ta hiện nay, xét các phát biểu sau:',
  items: [
    { t: 'Nước ta đang trong thời kì cơ cấu dân số vàng.', a: true },
    { t: 'Dân cư phân bố đồng đều giữa đồng bằng và miền núi.', a: false },
    { t: 'Nguồn lao động dồi dào nhưng tỉ lệ lao động qua đào tạo còn thấp.', a: true },
    { t: 'Cơ cấu lao động đang chuyển dịch theo hướng giảm tỉ trọng khu vực nông – lâm – thuỷ sản.', a: true }
  ],
  giai: 'Ý a ĐÚNG: tỉ lệ người trong độ tuổi lao động cao, nhưng thời kì này sắp kết thúc do già hoá.\nÝ b SAI: dân cư phân bố rất KHÔNG đều — tập trung ở đồng bằng, ven biển, đô thị; thưa thớt ở miền núi.\nÝ c ĐÚNG: đây là hạn chế lớn nhất của lao động nước ta.\nÝ d ĐÚNG: phù hợp với quá trình công nghiệp hoá, hiện đại hoá.',
  meo: '"Cơ cấu dân số vàng" (cơ hội) và "già hoá dân số" (thách thức) đang diễn ra ĐỒNG THỜI ở nước ta.' }
];

/* ==================== GDKT & PL ==================== */
TD.KHO.gdkt = [
{ chuong: 'Tăng trưởng – Phát triển', dang: 'mc', muc: 1,
  q: 'Chỉ tiêu nào sau đây được dùng để đo lường tăng trưởng kinh tế?',
  opts: ['Chỉ số phát triển con người (HDI)', 'Tổng sản phẩm quốc nội (GDP)', 'Hệ số Gini', 'Tỉ lệ hộ nghèo'], ans: 1,
  giai: 'Tăng trưởng kinh tế đo bằng sự gia tăng quy mô sản lượng: GDP, GNI, GDP/người, tốc độ tăng GDP. HDI, Gini, tỉ lệ hộ nghèo là chỉ tiêu của tiến bộ xã hội — thuộc về PHÁT TRIỂN kinh tế.',
  meo: 'Tăng trưởng = "to ra" (GDP). Phát triển = "to ra + tốt lên" (GDP + cơ cấu + xã hội).' },

{ chuong: 'Bảo hiểm', dang: 'mc', muc: 1,
  q: 'Loại bảo hiểm nào sau đây mang tính bắt buộc toàn dân và hoạt động không vì mục tiêu lợi nhuận?',
  opts: ['Bảo hiểm nhân thọ', 'Bảo hiểm y tế', 'Bảo hiểm xe cơ giới', 'Bảo hiểm cháy nổ tự nguyện'], ans: 1,
  giai: 'Bảo hiểm y tế do Nhà nước tổ chức thực hiện, mang tính bắt buộc toàn dân và không vì mục tiêu lợi nhuận. Các loại còn lại thuộc bảo hiểm thương mại, do doanh nghiệp cung cấp nhằm mục tiêu lợi nhuận.',
  meo: 'BHXH – BHYT – BH thất nghiệp: Nhà nước, phi lợi nhuận. Bảo hiểm thương mại: doanh nghiệp, vì lợi nhuận.' },

{ chuong: 'Quyền công dân', dang: 'mc', muc: 2,
  q: 'Công dân Việt Nam đủ bao nhiêu tuổi trở lên thì có quyền ứng cử đại biểu Quốc hội và Hội đồng nhân dân?',
  opts: ['Đủ 18 tuổi', 'Đủ 20 tuổi', 'Đủ 21 tuổi', 'Đủ 25 tuổi'], ans: 2,
  giai: 'Công dân đủ 18 tuổi trở lên có quyền BẦU CỬ; đủ 21 tuổi trở lên có quyền ỨNG CỬ vào Quốc hội và Hội đồng nhân dân.',
  meo: 'Cặp số 18 – 21 (bầu cử – ứng cử) là con số ra đề nhiều nhất. Cùng với 20 – 18 (tuổi kết hôn nam – nữ).' },

{ chuong: 'Thuế', dang: 'mc', muc: 2,
  q: 'Loại thuế nào sau đây là thuế gián thu?',
  opts: ['Thuế thu nhập cá nhân', 'Thuế thu nhập doanh nghiệp', 'Thuế giá trị gia tăng', 'Thuế sử dụng đất phi nông nghiệp'], ans: 2,
  giai: 'Thuế giá trị gia tăng (VAT) là thuế gián thu: doanh nghiệp nộp thuế nhưng người tiêu dùng mới là người thực sự chịu thuế (đã tính vào giá bán). Thuế TNCN và TNDN là thuế trực thu.',
  meo: 'Trực thu: người nộp = người chịu. Gián thu: người nộp ≠ người chịu (VAT, tiêu thụ đặc biệt, xuất nhập khẩu).' },

{ chuong: 'Quản lí thu chi', dang: 'tln', muc: 3,
  q: 'Gia đình anh A có tổng thu nhập 25 triệu đồng/tháng và áp dụng quy tắc phân bổ 50/30/20. Số tiền dành cho tiết kiệm và đầu tư mỗi tháng là bao nhiêu triệu đồng?',
  ans: '5',
  giai: 'Quy tắc 50/30/20: 50% cho nhu cầu thiết yếu, 30% cho mong muốn cá nhân, 20% cho tiết kiệm và đầu tư.\nSố tiền tiết kiệm = 25 × 20% = 25 × 0,2 = 5 triệu đồng.',
  meo: 'Đọc kỹ đề hỏi khoản nào: 50% thiết yếu (12,5 triệu), 30% mong muốn (7,5 triệu), 20% tiết kiệm (5 triệu).' },

{ chuong: 'Quản lí thu chi', dang: 'tln', muc: 3,
  q: 'Gia đình chị B thu nhập 20 triệu đồng/tháng, chi tiêu 15 triệu đồng/tháng. Gia đình muốn mua một chiếc xe máy giá 30 triệu đồng bằng tiền tiết kiệm. Cần ít nhất bao nhiêu tháng để đủ tiền?',
  ans: '6',
  giai: 'Tiết kiệm mỗi tháng = Thu nhập − Chi tiêu = 20 − 15 = 5 triệu đồng.\nSố tháng cần = 30 / 5 = 6 tháng.',
  meo: 'Công thức nền: Tiết kiệm = Thu − Chi. Nếu ra số lẻ thì phải làm tròn LÊN (vì chưa đủ tiền thì chưa mua được).' },

{ chuong: 'Hôn nhân – Gia đình', dang: 'ds', muc: 3,
  q: 'Anh M (20 tuổi) và chị N (19 tuổi) yêu nhau và muốn đăng kí kết hôn. Xét các phát biểu sau:',
  items: [
    { t: 'Cả anh M và chị N đều đã đủ tuổi kết hôn theo quy định của pháp luật.', a: true },
    { t: 'Việc kết hôn phải dựa trên sự tự nguyện của cả hai bên.', a: true },
    { t: 'Anh M có quyền quyết định mọi vấn đề trong gia đình vì là chồng.', a: false },
    { t: 'Tài sản chung của vợ chồng phải được ghi tên cả hai người khi đăng kí quyền sở hữu.', a: true }
  ],
  giai: 'Ý a ĐÚNG: nam từ đủ 20 tuổi, nữ từ đủ 18 tuổi ⇒ M (20) và N (19) đều đủ tuổi.\nÝ b ĐÚNG: hôn nhân tự nguyện là nguyên tắc cơ bản của chế độ hôn nhân nước ta.\nÝ c SAI: vợ chồng BÌNH ĐẲNG, cùng bàn bạc và quyết định các vấn đề của gia đình.\nÝ d ĐÚNG: quy định nhằm bảo đảm quyền bình đẳng về tài sản giữa vợ và chồng.',
  meo: 'Tuổi kết hôn: nam đủ 20, nữ đủ 18. Đừng nhầm sang tuổi thành niên 18 cho cả hai.' }
];

/* ==================== TIẾNG ANH ==================== */
TD.KHO.anh = [
{ chuong: 'Verb tense', dang: 'mc', muc: 1,
  q: 'Mark the letter to indicate the correct answer: "She ______ in Ha Noi since 2018."',
  opts: ['lives', 'lived', 'has lived', 'is living'], ans: 2,
  giai: 'Dấu hiệu "since + mốc thời gian" báo hiệu thì hiện tại hoàn thành (present perfect): have/has + V3. Chủ ngữ "She" ⇒ has lived.',
  meo: 'since + mốc thời gian (2018, Monday); for + khoảng thời gian (3 years). Cả hai đều dùng hiện tại hoàn thành.' },

{ chuong: 'Word form', dang: 'mc', muc: 2,
  q: 'Mark the letter to indicate the correct answer: "He always drives ______, so he has never had an accident."',
  opts: ['care', 'careful', 'carefully', 'careless'], ans: 2,
  giai: 'Sau động từ thường (drives) cần một TRẠNG TỪ để bổ nghĩa cho hành động ⇒ carefully. "careful" là tính từ, "care" là danh từ/động từ, "careless" nghĩa ngược lại và cũng sai từ loại.',
  meo: 'Vị trí quyết định từ loại: sau động từ thường ⇒ trạng từ (-ly); sau to be/seem ⇒ tính từ; sau mạo từ ⇒ danh từ.' },

{ chuong: 'Conditional', dang: 'mc', muc: 3,
  q: 'Choose the sentence closest in meaning: "If I had studied harder, I would have passed the exam."',
  opts: [
    'I studied hard and passed the exam.',
    'I didn\'t study hard, so I failed the exam.',
    'I will study hard to pass the exam.',
    'I always study hard for exams.'
  ], ans: 1,
  giai: 'Câu điều kiện loại 3 diễn tả điều KHÔNG có thật trong quá khứ. "If I had studied..." hàm ý thực tế là tôi đã KHÔNG học chăm, và kết quả là tôi đã trượt.',
  meo: 'Điều kiện loại 3 luôn ngược với thực tế quá khứ: khẳng định trong mệnh đề If ⇒ thực tế là phủ định.' },

{ chuong: 'Reported speech', dang: 'mc', muc: 3,
  q: 'Choose the correct reported speech: "Where do you live?" she asked me.',
  opts: [
    'She asked me where did I live.',
    'She asked me where I lived.',
    'She asked me where do I live.',
    'She asked me where I live.'
  ], ans: 1,
  giai: 'Khi tường thuật câu hỏi có từ để hỏi: giữ từ để hỏi, BỎ trợ động từ do/does/did, đưa về trật tự câu kể (S + V), và lùi thì một bậc (do you live → I lived).',
  meo: 'Lỗi phổ biến nhất: giữ nguyên trật tự đảo ngữ của câu hỏi. Tường thuật xong phải đọc như một câu kể.' },

{ chuong: 'Relative clause', dang: 'mc', muc: 2,
  q: 'Mark the letter to indicate the correct answer: "The woman ______ helped me yesterday is my neighbour."',
  opts: ['which', 'whom', 'who', 'whose'], ans: 2,
  giai: 'Từ được thay thế là "the woman" (người) và đóng vai trò CHỦ NGỮ của mệnh đề quan hệ (helped me) ⇒ dùng "who". "whom" chỉ dùng khi làm tân ngữ; "which" dùng cho vật; "whose" chỉ sở hữu.',
  meo: 'Sau đại từ quan hệ mà là ĐỘNG TỪ ngay ⇒ nó làm chủ ngữ ⇒ who/which/that. Nếu sau đó là chủ ngữ mới ⇒ nó làm tân ngữ ⇒ whom/which.' },

{ chuong: 'Reading strategy', dang: 'ds', muc: 3,
  q: 'Về chiến thuật làm phần Đọc hiểu và Sắp xếp trong đề Tiếng Anh, xét các nhận định sau:',
  items: [
    { t: 'Nên đọc câu hỏi và gạch chân từ khoá trước khi đọc bài đọc.', a: true },
    { t: 'Thông tin trả lời các câu hỏi đọc hiểu thường xuất hiện theo đúng thứ tự các câu hỏi.', a: true },
    { t: 'Với câu hỏi dạng NOT mentioned/EXCEPT, cần tìm phương án CÓ xuất hiện trong bài.', a: false },
    { t: 'Trong dạng sắp xếp, câu mở đầu thường không chứa đại từ thay thế như "it", "this", "they".', a: true }
  ],
  giai: 'Ý a ĐÚNG: giúp định hướng, tiết kiệm thời gian.\nÝ b ĐÚNG: đề đọc hiểu thường thiết kế theo trình tự nội dung bài.\nÝ c SAI: cần tìm 3 phương án CÓ trong bài rồi loại, phương án CÒN LẠI (không có trong bài) mới là đáp án.\nÝ d ĐÚNG: câu đầu tiên phải tự đứng độc lập được, chưa thể tham chiếu tới thứ gì phía trước.',
  meo: 'Câu NOT/EXCEPT: đáp án là cái KHÔNG có. Nhiều bạn chọn nhầm cái đầu tiên tìm thấy trong bài.' }
];
