/* ============================================================
   NGỮ LIỆU NGỮ VĂN — PHẦN 3 + KHO ĐỀ NGHỊ LUẬN XÃ HỘI
   ============================================================ */
window.TD = window.TD || {};

(function () {
const BD_DOAN = '0,25 hình thức đoạn · 0,25 xác định đúng vấn đề · 1,0 triển khai (dẫn chứng + phân tích) · 0,25 chính tả, ngữ pháp · 0,25 sáng tạo';

TD.NGU_LIEU_VAN = (TD.NGU_LIEU_VAN || []).concat([

/* ---------------------------------------------------------- 13 */
{
  ten: 'Người gác đèn biển',
  loai: 'Truyện ngắn',
  nguLieu: `      Đảo chỉ có ba người: ông Tần, thằng Sáu và con chó tên Mực. Ngọn hải đăng cao ba mươi hai mét, mỗi tối phải leo hai trăm mười bảy bậc để thắp đèn.
      Thằng Sáu ra đảo được nửa năm thì chán. Nó bảo: "Chú ơi, giờ tàu nào cũng có định vị vệ tinh cả rồi. Cái đèn này còn ai nhìn nữa đâu."
      Ông Tần không cãi. Ông chỉ kể, một đêm tháng Chạp năm nào đó, có chiếc thuyền câu hỏng máy trôi dạt ba ngày. Người trên thuyền nói với ông rằng suốt ba đêm ấy họ chẳng biết mình ở đâu, chỉ thấy phía chân trời có một chấm sáng cứ quay đều, đều đặn đến mức họ tin là mình chưa bị bỏ quên.
      "Chú không biết ai còn nhìn," ông nói, tay vẫn lau bóng đèn. "Nhưng nếu tối nay chú không thắp, mà đúng tối nay có người đang tìm — thì chú lấy gì đền cho người ta?"
      Đêm ấy thằng Sáu leo hết hai trăm mười bảy bậc. Nó không hỏi nữa.`,
  xuatXu: '(Truyện ngắn dùng làm ngữ liệu ôn tập)',
  doc: [
    { d: 0.5, q: 'Xác định không gian và các nhân vật xuất hiện trong văn bản.',
      a: 'Không gian: một hòn đảo nhỏ có ngọn hải đăng cao ba mươi hai mét. Nhân vật: ông Tần, thằng Sáu và con chó Mực.' },
    { d: 0.5, q: 'Chỉ ra lí do khiến nhân vật thằng Sáu chán công việc gác đèn.',
      a: 'Vì nó cho rằng tàu thuyền ngày nay đều có định vị vệ tinh nên ngọn hải đăng trở nên vô ích, không còn ai nhìn tới nữa.' },
    { d: 1.0, q: 'Nêu tác dụng của chi tiết "hai trăm mười bảy bậc" được lặp lại hai lần trong văn bản.',
      a: 'Con số cụ thể, lặp ở đầu và cuối truyện, tạo kết cấu vòng tròn.\n'
       + 'Tác dụng: · lượng hoá sự vất vả — mỗi tối là hai trăm mười bảy bậc, không hơn không kém, ngày nào cũng vậy;\n'
       + '· lần đầu nó là gánh nặng khiến thằng Sáu chán, lần sau nó là hành động tự nguyện ⇒ đánh dấu sự thay đổi trong nhận thức nhân vật;\n'
       + '· việc leo vẫn y hệt, chỉ ý nghĩa của việc leo là đổi — đó chính là điều truyện muốn nói.' },
    { d: 1.0, q: 'Phân tích ý nghĩa của câu hỏi: "Nhưng nếu tối nay chú không thắp, mà đúng tối nay có người đang tìm — thì chú lấy gì đền cho người ta?"',
      a: 'Ông Tần không tranh luận bằng lí lẽ kỹ thuật mà đặt một câu hỏi về TRÁCH NHIỆM.\n'
       + 'Ý nghĩa: · thừa nhận xác suất có người cần là rất nhỏ, nhưng chỉ ra rằng với người đang cần thì xác suất ấy là 100%;\n'
       + '· có những công việc không được phép tính theo hiệu quả trung bình, vì cái giá của một lần bỏ sót là không thể đền;\n'
       + '· câu hỏi khiến thằng Sáu tự trả lời bằng hành động, thuyết phục hơn mọi lời răn dạy. '
       + 'Đây cũng là cách nhà văn gửi thông điệp mà không thuyết giáo.' },
    { d: 1.0, q: 'Từ văn bản, anh/chị suy nghĩ gì về ý nghĩa của những công việc thầm lặng? Trả lời trong 5–7 dòng.',
      a: 'Gợi ý: Ngọn hải đăng không biết ai nhìn mình, người gác đèn không được ai cảm ơn. Nhưng chính sự đều đặn '
       + 'không điều kiện ấy mới làm nên chỗ dựa cho người khác.\n'
       + '⇒ Nhiều công việc trong xã hội cũng vậy: người quét rác lúc bốn giờ sáng, nhân viên trực tổng đài cấp cứu, '
       + 'người kiểm tra chất lượng nước sạch. Giá trị của họ chỉ lộ ra khi họ ngừng làm.\n'
       + 'Bài học: đừng đo giá trị công việc bằng mức độ được chú ý; và hãy biết ơn những chấm sáng lặng lẽ quanh mình.' }
  ],
  nlvh: {
    q: 'Viết đoạn văn nghị luận (khoảng 200 chữ) phân tích nhân vật ông Tần trong đoạn trích trên.',
    dan: '· Mở đoạn: giới thiệu truyện và nhân vật ông Tần — người gác đèn biển tận tuỵ.\n'
       + '· Thân đoạn:\n'
       + '   – Hoàn cảnh: sống ở đảo hẻo lánh, mỗi tối leo 217 bậc thắp đèn, không ai giám sát.\n'
       + '   – Cách phản ứng trước sự hoài nghi: "không cãi", chỉ kể một câu chuyện — điềm đạm, hiểu người, biết dạy bằng trải nghiệm.\n'
       + '   – Chi tiết đắt: "tay vẫn lau bóng đèn" khi nói — hành động song song lời nói, cho thấy niềm tin đã thành nếp sống.\n'
       + '   – Quan niệm sống: đo công việc bằng trách nhiệm với người có thể đang cần, không đo bằng số người nhìn thấy.\n'
       + '   – Nghệ thuật: khắc hoạ qua đối thoại và hành động, ngôn ngữ mộc mạc, chi tiết chọn lọc.\n'
       + '· Kết đoạn: ông Tần là biểu tượng đẹp cho những con người bền bỉ giữ ánh sáng cho người khác.',
    diem: BD_DOAN
  }
},

/* ---------------------------------------------------------- 14 */
{
  ten: 'So mình với người khác',
  loai: 'Văn bản nghị luận',
  nguLieu: `      Mạng xã hội đã làm được một việc mà loài người chưa từng làm nổi trong suốt lịch sử: cho mỗi người thấy phần đẹp nhất trong đời sống của hàng nghìn người khác, mỗi ngày, miễn phí.
      Hệ quả là một phép so sánh rất lệch. Ta đem hậu trường của mình — những buổi sáng dậy muộn, những bài kiểm tra dưới trung bình, những lần cãi nhau với bố mẹ — ra so với sân khấu của người khác. Phép so ấy không sai vì ta kém, mà sai vì hai vế không cùng loại.
      Nhưng bỏ hẳn việc so sánh cũng không phải là lời khuyên tốt. Con người vốn học bằng cách nhìn người khác; không có đối chiếu thì cũng không có tiến bộ. Vấn đề nằm ở chỗ so với ai và so cái gì.
      So với người giỏi hơn về phương pháp thì ta học được cách làm. So với người giỏi hơn về kết quả thì ta chỉ thấy mình kém. Và mốc so sánh đáng tin nhất vẫn là chính ta của sáu tháng trước — bởi đó là người duy nhất mà ta biết trọn cả sân khấu lẫn hậu trường.`,
  xuatXu: '(Bài viết dùng làm ngữ liệu ôn tập)',
  doc: [
    { d: 0.5, q: 'Xác định vấn đề chính được bàn luận trong văn bản.',
      a: 'Vấn đề: cách so sánh bản thân với người khác trong thời đại mạng xã hội — so sánh thế nào cho đúng để tiến bộ '
       + 'thay vì tự làm mình tổn thương.' },
    { d: 0.5, q: 'Theo tác giả, mốc so sánh đáng tin nhất là gì?',
      a: 'Là chính bản thân mình của sáu tháng trước — bởi đó là người duy nhất mà ta biết trọn cả sân khấu lẫn hậu trường.' },
    { d: 1.0, q: 'Chỉ ra và nêu tác dụng của hình ảnh "hậu trường" và "sân khấu" trong văn bản.',
      a: 'Đây là cặp hình ảnh ẩn dụ: "hậu trường" là đời sống thật với đủ khuyết điểm, "sân khấu" là phần được chọn lọc để trưng ra.\n'
       + 'Tác dụng: · biến một cơ chế tâm lí trừu tượng thành hình ảnh cụ thể, ai cũng hình dung được ngay; '
       + '· chỉ rõ chỗ sai của phép so sánh không phải ở năng lực mà ở việc "hai vế không cùng loại"; '
       + '· giúp người đọc bớt tự trách mà nhìn vấn đề một cách tỉnh táo.' },
    { d: 1.0, q: 'Phân tích cách lập luận của tác giả ở đoạn thứ ba và thứ tư.',
      a: 'Đoạn ba dùng thao tác BÁC BỎ một giải pháp tưởng chừng hiển nhiên ("bỏ hẳn việc so sánh"), '
       + 'với lí lẽ rằng con người vốn học bằng cách nhìn người khác. Nhờ vậy bài viết không rơi vào lời khuyên sáo rỗng.\n'
       + 'Đoạn bốn chuyển sang PHÂN LOẠI: so về phương pháp thì học được, so về kết quả thì chỉ thấy mình kém, '
       + 'rồi đưa ra mốc so sánh thay thế.\n'
       + '⇒ Lập luận đi theo trình tự: chỉ ra sai lầm → bác bỏ giải pháp cực đoan → nêu tiêu chí phân biệt → đề xuất cách làm. '
       + 'Chặt chẽ, thực tế và có thể áp dụng ngay.' },
    { d: 1.0, q: 'Anh/chị có đồng tình rằng "so với người giỏi hơn về kết quả thì ta chỉ thấy mình kém" không? Vì sao? Trả lời trong 5–7 dòng.',
      a: 'Học sinh tự bày tỏ, miễn lí giải hợp lí.\n'
       + 'Hướng ĐỒNG TÌNH: kết quả là điểm đến, không cho biết con đường; nhìn vào kết quả dễ sinh mặc cảm hoặc ganh tị.\n'
       + 'Hướng KHÔNG HOÀN TOÀN ĐỒNG TÌNH: với người có tâm thế vững, kết quả của người khác lại là bằng chứng '
       + '"điều đó làm được" nên trở thành động lực; nhiều người tiến bộ nhờ đặt hình mẫu trước mặt. '
       + 'Điều quyết định là thái độ khi so sánh chứ không chỉ là so cái gì.' }
  ],
  nlvh: {
    q: 'Viết đoạn văn nghị luận (khoảng 200 chữ) phân tích cách tác giả nêu và giải quyết vấn đề trong văn bản trên.',
    dan: '· Mở đoạn: nhận định — văn bản chạm đúng một vấn đề rất thời sự của người trẻ.\n'
       + '· Thân đoạn:\n'
       + '   – Mở đầu bằng một nhận định nghịch lí về mạng xã hội, tạo chú ý.\n'
       + '   – Dùng cặp ẩn dụ hậu trường / sân khấu để chỉ ra bản chất lệch lạc của phép so sánh.\n'
       + '   – Bác bỏ giải pháp cực đoan "bỏ hẳn so sánh" ⇒ tránh sáo rỗng, tăng độ tin cậy.\n'
       + '   – Phân loại rành mạch: so phương pháp / so kết quả; rồi đưa mốc so sánh thay thế.\n'
       + '   – Câu kết vừa gọn vừa có sức nặng, biến bài viết thành một lời khuyên dùng được.\n'
       + '· Kết đoạn: bố cục nêu vấn đề – phản biện – giải pháp làm nên sức thuyết phục của văn bản.',
    diem: BD_DOAN
  }
},

/* ---------------------------------------------------------- 15 */
{
  ten: 'Mùi Tết',
  loai: 'Tản văn',
  nguLieu: `      Tết của tôi không bắt đầu bằng ngày, mà bắt đầu bằng mùi.
      Đầu tiên là mùi lá dong rửa ở giếng, thứ mùi ngai ngái, tươi và lạnh. Rồi tới mùi gạo nếp ngâm qua đêm, ngọt nhạt, nở ra trong chậu như một thứ ánh sáng trắng. Đến hai mươi tám, cả xóm dậy mùi khói. Không phải khói bếp thường ngày mà là khói của nồi bánh chưng luộc suốt đêm, thứ khói đặc, ám vào áo, ba ngày sau vẫn còn.
      Bà tôi bảo, cái gì cũng có mùi của nó, chỉ là mình có chịu ngửi hay không. Bà nói xong lại cúi xuống lật từng chiếc lá, chọn lá to lót đáy, lá nhỏ gấp góc.
      Bây giờ bánh chưng đặt một cuộc gọi là có, nóng hổi, vuông vức, đẹp hơn bánh nhà gói. Chỉ có điều nó không có mùi khói. Mà tôi thì đã hiểu, cái tôi nhớ suốt bao năm không phải là chiếc bánh.`,
  xuatXu: '(Tản văn dùng làm ngữ liệu ôn tập)',
  doc: [
    { d: 0.5, q: 'Xác định thể loại và ngôi kể của văn bản.',
      a: 'Thể loại: tản văn (văn xuôi trữ tình). Ngôi kể: ngôi thứ nhất, người viết xưng "tôi".' },
    { d: 0.5, q: 'Chỉ ra ba mùi hương gắn với Tết được nhắc tới trong văn bản.',
      a: 'Mùi lá dong rửa ở giếng; mùi gạo nếp ngâm qua đêm; mùi khói của nồi bánh chưng luộc suốt đêm.' },
    { d: 1.0, q: 'Nêu tác dụng của cách mở đầu: "Tết của tôi không bắt đầu bằng ngày, mà bắt đầu bằng mùi."',
      a: 'Câu mở đầu dùng phép đối lập bất ngờ giữa "ngày" (cách đo thời gian thông thường) và "mùi" (cảm giác cá nhân).\n'
       + 'Tác dụng: · lập tức xác lập điểm nhìn riêng, gây tò mò; '
       + '· báo trước mạch tổ chức của cả bài — kể theo trình tự các mùi hương chứ không theo trình tự sự việc; '
       + '· khẳng định Tết trong bài không phải là dịp lễ trên lịch mà là một kí ức thuộc về riêng người viết.' },
    { d: 1.0, q: 'Phân tích hiệu quả nghệ thuật của câu văn: "Rồi tới mùi gạo nếp ngâm qua đêm, ngọt nhạt, nở ra trong chậu như một thứ ánh sáng trắng."',
      a: 'Biện pháp: so sánh kết hợp ẩn dụ chuyển đổi cảm giác — mùi và hình khối của hạt gạo được chuyển thành ÁNH SÁNG.\n'
       + 'Hiệu quả: · làm một chi tiết rất đời thường trở nên lung linh, thiêng liêng; '
       + '· các giác quan hoà vào nhau (khứu giác "ngọt nhạt", thị giác "ánh sáng trắng", xúc giác "nở ra") '
       + 'khiến câu văn giàu chất thơ; · gợi cảm giác chờ đợi, tinh khôi rất đặc trưng của những ngày giáp Tết.' },
    { d: 1.0, q: 'Anh/chị hiểu như thế nào về câu kết: "cái tôi nhớ suốt bao năm không phải là chiếc bánh"? Trả lời trong 5–7 dòng.',
      a: 'Gợi ý: Chiếc bánh đặt mua "đẹp hơn bánh nhà gói", nghĩa là về mặt vật chất không hề thua kém. '
       + 'Cái thiếu là mùi khói — tức là cả quá trình: rửa lá, ngâm gạo, cả xóm thức trắng đêm, bà ngồi lật từng chiếc lá.\n'
       + '⇒ Điều người viết nhớ là sự có mặt của người thân, là nhịp sống chậm và sự chờ đợi, là công sức con người bỏ vào. '
       + 'Sự tiện lợi mua được sản phẩm nhưng không mua được kí ức. '
       + 'Câu kết vì thế là một nỗi tiếc nhẹ trước những giá trị đang mất đi trong đời sống hiện đại.' }
  ],
  nlvh: {
    q: 'Viết đoạn văn nghị luận (khoảng 200 chữ) phân tích nét đặc sắc trong cách cảm nhận về Tết của tác giả ở văn bản trên.',
    dan: '· Mở đoạn: giới thiệu tản văn và nét riêng — cảm nhận Tết bằng khứu giác.\n'
       + '· Thân đoạn:\n'
       + '   – Chọn điểm nhìn độc đáo: "Tết bắt đầu bằng mùi" ⇒ mạch bài đi theo chuỗi hương thay vì chuỗi sự việc.\n'
       + '   – Hệ thống mùi được sắp theo trình tự thời gian và tăng dần độ đậm: lá dong → gạo nếp → khói bánh chưng.\n'
       + '   – Ngôn ngữ giàu chất thơ, dùng ẩn dụ chuyển đổi cảm giác ("nở ra… như một thứ ánh sáng trắng").\n'
       + '   – Hình ảnh người bà với hành động tỉ mỉ và lời nói giản dị mà thấm ⇒ neo cảm xúc vào con người cụ thể.\n'
       + '   – Đối lập kết bài: bánh đặt mua đẹp hơn nhưng "không có mùi khói" ⇒ chiều sâu suy ngẫm.\n'
       + '· Kết đoạn: bài tản văn đánh thức kí ức chung của nhiều người về một cái Tết đang dần đổi khác.',
    diem: BD_DOAN
  }
},

/* ---------------------------------------------------------- 16 */
{
  ten: 'Giấc ngủ — tài sản bị đánh cắp',
  loai: 'Văn bản thông tin',
  nguLieu: `      Trong nhiều thế kỷ, ngủ bị coi là khoảng thời gian chết. Người ta tự hào vì ngủ ít, xem đó là bằng chứng của sự chăm chỉ. Khoa học thần kinh của ba mươi năm gần đây đã lật ngược hoàn toàn cách nhìn ấy.
      Ngủ không phải lúc bộ não tắt đi, mà là lúc nó chuyển sang một ca làm việc khác. Trong giấc ngủ sâu, những gì học được trong ngày mới được chuyển từ vùng nhớ tạm sang vùng lưu trữ dài hạn — nghĩa là kiến thức chỉ thật sự "thuộc" sau khi ta ngủ. Cũng trong lúc ấy, hệ thống dẫn lưu của não hoạt động mạnh gấp nhiều lần để dọn đi các chất thải chuyển hoá tích tụ khi ta thức.
      Vì vậy, việc thức trắng đêm trước ngày thi là một cách đầu tư rất kém: ta đổi vài giờ ôn thêm lấy toàn bộ quá trình củng cố những gì đã học suốt nhiều tháng, kèm theo sự sụt giảm trí nhớ làm việc, khả năng tập trung và tốc độ phản xạ ngay hôm sau.
      Nói cách khác, giấc ngủ không phải phần thưởng sau khi học xong. Nó là một phần của việc học.`,
  xuatXu: '(Bài viết dùng làm ngữ liệu ôn tập)',
  doc: [
    { d: 0.5, q: 'Xác định luận đề của văn bản.',
      a: 'Luận đề: giấc ngủ là một phần thiết yếu của quá trình học tập chứ không phải khoảng thời gian lãng phí hay phần thưởng sau khi học.' },
    { d: 0.5, q: 'Theo văn bản, hai việc quan trọng nào diễn ra trong giấc ngủ sâu?',
      a: 'Thứ nhất: chuyển những gì học được trong ngày từ vùng nhớ tạm sang vùng lưu trữ dài hạn. '
       + 'Thứ hai: hệ thống dẫn lưu của não hoạt động mạnh để dọn các chất thải chuyển hoá tích tụ khi thức.' },
    { d: 1.0, q: 'Nêu tác dụng của cách nói "bộ não chuyển sang một ca làm việc khác".',
      a: 'Đây là ẩn dụ lấy từ đời sống lao động ("ca làm việc").\n'
       + 'Tác dụng: · phủ nhận trực tiếp quan niệm cũ rằng ngủ là lúc não "tắt"; '
       + '· biến một cơ chế sinh học phức tạp thành hình ảnh quen thuộc, dễ hiểu với mọi người đọc; '
       + '· đặt giấc ngủ ngang hàng với lao động, nhờ đó thay đổi thái độ của người đọc: ngủ không còn là lười biếng.' },
    { d: 1.0, q: 'Phân tích cách tác giả lập luận để bác bỏ thói quen thức trắng đêm trước ngày thi.',
      a: 'Tác giả không lên án mà dùng lối lập luận theo LỢI – HẠI, như một phép tính đầu tư:\n'
       + '· Cái được: "vài giờ ôn thêm" — cố ý dùng lượng từ nhỏ.\n'
       + '· Cái mất: toàn bộ quá trình củng cố kiến thức của "nhiều tháng", cộng thêm sụt giảm trí nhớ làm việc, '
       + 'khả năng tập trung và tốc độ phản xạ ngay hôm sau.\n'
       + '⇒ Sự chênh lệch tự nó nói lên kết luận, người đọc tự thấy vô lí mà bỏ thói quen, không cần bị răn dạy. '
       + 'Đây là cách bác bỏ bằng dữ kiện, thuyết phục hơn nhiều so với lời khuyên suông.' },
    { d: 1.0, q: 'Từ văn bản, anh/chị hãy nêu một thay đổi cụ thể trong thói quen học tập của bản thân. Lí giải trong 5–7 dòng.',
      a: 'Học sinh tự đề xuất, miễn cụ thể và khả thi. Bài làm tốt cần nêu rõ thay đổi '
       + '(cố định giờ đi ngủ; ôn bài quan trọng vào buổi tối rồi ngủ luôn thay vì thức thêm; '
       + 'chia nhỏ việc ôn ra nhiều ngày thay vì dồn một đêm; bỏ điện thoại khỏi giường),\n'
       + 'gắn với lí lẽ của văn bản (kiến thức chỉ được củng cố sau khi ngủ), '
       + 'và nêu khó khăn dự kiến cùng cách khắc phục.' }
  ],
  nlvh: {
    q: 'Viết đoạn văn nghị luận (khoảng 200 chữ) phân tích sức thuyết phục của văn bản trên đối với người đọc là học sinh cuối cấp.',
    dan: '· Mở đoạn: nhận định — bài viết đánh trúng một thói quen phổ biến của học sinh cuối cấp.\n'
       + '· Thân đoạn:\n'
       + '   – Mở đầu bằng việc nêu định kiến cũ (tự hào vì ngủ ít) rồi lật lại bằng khoa học ⇒ tạo bất ngờ.\n'
       + '   – Dùng ẩn dụ "ca làm việc khác" để giải thích cơ chế sinh học một cách dễ hiểu.\n'
       + '   – Cung cấp bằng chứng khoa học cụ thể (chuyển vùng nhớ, dọn chất thải chuyển hoá) nên có độ tin cậy.\n'
       + '   – Lập luận lợi – hại về việc thức trắng đêm, đặt đúng vào tình huống người đọc đang gặp.\n'
       + '   – Câu kết ngắn, mang tính định nghĩa lại: "Nó là một phần của việc học".\n'
       + '· Kết đoạn: bài viết thuyết phục vì nói đúng chỗ đau, nói bằng dữ kiện và không lên giọng dạy dỗ.',
    diem: BD_DOAN
  }
},

/* ---------------------------------------------------------- 17 */
{
  ten: 'Tử tế trong thời đại ẩn danh',
  loai: 'Văn bản nghị luận',
  nguLieu: `      Có một thí nghiệm xã hội cũ: người ta đặt một hộp tiền không người trông ở phòng trà chung của công ty, kèm bảng giá. Khi bên trên hộp có dán hình một đôi mắt, số tiền thu được cao gấp gần ba lần so với khi dán hình một bông hoa. Đôi mắt ấy chỉ là hình vẽ, không ai bị theo dõi cả.
      Thí nghiệm đó nói lên một điều không dễ chịu: phần lớn hành vi tử tế của chúng ta được duy trì bởi cảm giác đang bị nhìn. Và Internet, với khả năng cho phép người ta ẩn danh tuyệt đối, đã gỡ bỏ đôi mắt ấy. Kết quả là những lời lẽ mà không ai dám nói trực diện lại được viết ra hàng loạt dưới một cái tên giả.
      Nhưng cũng chính sự ẩn danh ấy lại làm lộ ra một thứ quý hơn: khi không còn ai nhìn mà một người vẫn tử tế, thì đó mới đúng là tử tế. Người trả lại chiếc ví nhặt được ở nơi không có camera, người bênh vực một nạn nhân bị công kích dù chẳng ai biết mình là ai — họ không cư xử đẹp để được ghi nhận.
      Vậy nên câu hỏi của thời đại này không phải "bạn tử tế đến đâu", mà là "bạn tử tế được bao lâu sau khi không ai còn nhìn".`,
  xuatXu: '(Bài viết dùng làm ngữ liệu ôn tập)',
  doc: [
    { d: 0.5, q: 'Xác định vấn đề nghị luận của văn bản.',
      a: 'Vấn đề: lòng tử tế thật sự — được kiểm chứng khi con người không bị ai quan sát, đặc biệt trong môi trường ẩn danh của Internet.' },
    { d: 0.5, q: 'Chỉ ra bằng chứng mà tác giả sử dụng để mở đầu văn bản.',
      a: 'Một thí nghiệm xã hội: hộp tiền tự giác ở phòng trà công ty; khi dán hình đôi mắt lên hộp, '
       + 'số tiền thu được cao gấp gần ba lần so với khi dán hình bông hoa.' },
    { d: 1.0, q: 'Nêu tác dụng của hình ảnh "đôi mắt" trong văn bản.',
      a: '"Đôi mắt" ban đầu là chi tiết có thật trong thí nghiệm, sau đó được nâng thành hình ảnh biểu tượng cho '
       + 'sự giám sát của cộng đồng.\n'
       + 'Tác dụng: · làm sợi chỉ xuyên suốt, nối thí nghiệm với vấn đề Internet ("Internet đã gỡ bỏ đôi mắt ấy"); '
       + '· cụ thể hoá một áp lực vô hình, giúp người đọc hình dung ngay; '
       + '· tạo tình huống suy ngẫm: nếu đạo đức chỉ tồn tại dưới đôi mắt thì nó là đạo đức thật hay chỉ là sự diễn.' },
    { d: 1.0, q: 'Phân tích cách chuyển ý của tác giả từ đoạn hai sang đoạn ba.',
      a: 'Đoạn hai nêu mặt tiêu cực: ẩn danh khiến người ta buông bỏ sự tử tế. Đoạn ba mở đầu bằng liên từ "Nhưng" '
       + 'để lật sang mặt tích cực: chính ẩn danh mới là phép thử để nhận ra lòng tử tế thật.\n'
       + 'Cách chuyển ý này có tác dụng: · giữ bài viết khỏi rơi vào bi quan một chiều; '
       + '· biến cùng một hoàn cảnh từ nguy cơ thành thước đo; '
       + '· dẫn chứng đi kèm rất cụ thể (trả ví ở nơi không camera, bênh vực nạn nhân bị công kích) nên đủ sức nâng đỡ luận điểm. '
       + 'Nhờ vậy câu kết mang tính khẳng định chứ không phải lời than.' },
    { d: 1.0, q: 'Anh/chị trả lời thế nào cho câu hỏi cuối văn bản: "bạn tử tế được bao lâu sau khi không ai còn nhìn"? Trả lời trong 5–7 dòng.',
      a: 'Học sinh tự bày tỏ, miễn chân thành và có lí lẽ. Bài làm tốt nên: '
       + 'thừa nhận thẳng thắn rằng ai cũng có lúc cư xử khác đi khi không bị nhìn; '
       + 'chỉ ra điều giúp giữ được sự tử tế lâu dài là hình thành thói quen và niềm tin nội tại '
       + '(tự trọng, nguyên tắc sống) thay vì dựa vào sự giám sát bên ngoài; '
       + 'nêu một ví dụ cụ thể của bản thân trên mạng hoặc trong đời thường; '
       + 'kết bằng cam kết thiết thực chứ không hô hào.' }
  ],
  nlvh: {
    q: 'Viết đoạn văn nghị luận (khoảng 200 chữ) phân tích cách tác giả sử dụng bằng chứng và cách đặt vấn đề trong văn bản trên.',
    dan: '· Mở đoạn: nhận định — một bài nghị luận mở bằng thí nghiệm và khép bằng câu hỏi, rất có sức gợi.\n'
       + '· Thân đoạn:\n'
       + '   – Bằng chứng mở đầu là một thí nghiệm xã hội có số liệu ⇒ khách quan, gây bất ngờ, tránh giáo huấn.\n'
       + '   – Từ chi tiết "đôi mắt", tác giả nâng lên thành biểu tượng và dùng xuyên suốt bài như một sợi chỉ đỏ.\n'
       + '   – Kết cấu hai mặt: ẩn danh làm lộ cái xấu — ẩn danh cũng làm lộ cái tốt, nhờ liên từ "Nhưng" chuyển ý.\n'
       + '   – Dẫn chứng đời thường (trả ví nơi không camera, bênh vực nạn nhân) khiến luận điểm trừu tượng trở nên có thật.\n'
       + '   – Kết bằng câu hỏi thay vì lời khuyên ⇒ trao quyền suy nghĩ cho người đọc, dư âm kéo dài.\n'
       + '· Kết đoạn: chính lối đặt vấn đề ấy làm bài viết vừa sắc vừa khiêm nhường.',
    diem: BD_DOAN
  }
},

/* ---------------------------------------------------------- 18 */
{
  ten: 'Học để làm gì?',
  loai: 'Văn bản nghị luận',
  nguLieu: `      Hỏi một học sinh lớp mười hai học để làm gì, câu trả lời thường là: để thi đỗ. Hỏi tiếp đỗ để làm gì, câu trả lời là: để có việc làm tốt. Hỏi thêm một bậc nữa thì phần lớn dừng lại.
      Chuỗi trả lời ấy không sai, chỉ ngắn. Nó biến việc học thành một phương tiện, mà phương tiện thì dùng xong là bỏ. Đó là lí do rất nhiều người sau khi có tấm bằng liền ngừng đọc, ngừng hỏi, ngừng thay đổi — họ đã tới đích mà họ tự đặt ra.
      Có một câu trả lời dài hơn: học để mở rộng số cách mà mình có thể nhìn một sự việc. Người biết thêm một môn khoa học thì nhìn tin đồn bằng con mắt khác. Người đọc thêm một cuốn tiểu thuyết thì hiểu thêm một kiểu người mà mình chưa từng gặp. Mỗi tri thức mới là một cánh cửa mở ra một góc nhìn, và người có nhiều góc nhìn thì khó bị dắt đi hơn.
      Thi cử rồi sẽ qua. Cái ở lại là cách ta suy nghĩ khi không còn ai chấm điểm nữa.`,
  xuatXu: '(Bài viết dùng làm ngữ liệu ôn tập)',
  doc: [
    { d: 0.5, q: 'Xác định luận đề của văn bản.',
      a: 'Luận đề: mục đích thật sự của việc học không dừng ở thi đỗ hay có việc làm, '
       + 'mà là mở rộng cách nhìn và cách suy nghĩ của con người.' },
    { d: 0.5, q: 'Theo tác giả, vì sao nhiều người sau khi có bằng liền ngừng đọc, ngừng hỏi?',
      a: 'Vì họ coi việc học chỉ là phương tiện để đạt mục tiêu (thi đỗ, có việc làm); '
       + 'khi đã đạt được mục tiêu tự đặt ra thì họ coi như đã tới đích, không còn lí do để học tiếp.' },
    { d: 1.0, q: 'Nêu tác dụng của cách mở đầu bằng chuỗi hỏi – đáp ở đoạn thứ nhất.',
      a: 'Tác giả mô phỏng một cuộc hỏi thật, mỗi câu đẩy sâu thêm một bậc, tới bậc thứ ba thì "phần lớn dừng lại".\n'
       + 'Tác dụng: · tái hiện đúng trải nghiệm quen thuộc, khiến người đọc thấy mình trong đó; '
       + '· chỗ "dừng lại" chính là vấn đề của bài, được phát hiện một cách tự nhiên chứ không phải do tác giả áp đặt; '
       + '· tạo nhịp dồn, gây tò mò cho phần sau.' },
    { d: 1.0, q: 'Chỉ ra và phân tích hiệu quả của biện pháp tu từ trong câu: "Mỗi tri thức mới là một cánh cửa mở ra một góc nhìn, và người có nhiều góc nhìn thì khó bị dắt đi hơn."',
      a: 'Biện pháp: ẩn dụ ("tri thức" – "cánh cửa"; "bị dắt đi" chỉ sự bị thao túng, bị dẫn dắt bởi thông tin sai).\n'
       + 'Hiệu quả: · hình ảnh cánh cửa gợi sự mở ra, gợi rằng tri thức không phải để chất đống mà để dẫn tới đâu đó; '
       + '· cụm "khó bị dắt đi" mang sắc thái đời thường, hơi mỉa mai, nói được vấn đề nghiêm túc bằng lời nhẹ nhàng; '
       + '· nêu bật một lợi ích rất thiết thực của học vấn trong thời đại tin giả — bảo vệ sự độc lập trong suy nghĩ.' },
    { d: 1.0, q: 'Anh/chị hiểu như thế nào về câu kết: "Cái ở lại là cách ta suy nghĩ khi không còn ai chấm điểm nữa."? Trả lời trong 5–7 dòng.',
      a: 'Gợi ý: "Không còn ai chấm điểm" là lúc rời ghế nhà trường — không còn bài kiểm tra, không còn thầy cô đánh giá. '
       + 'Khi ấy, điểm số, thứ hạng, thậm chí phần lớn kiến thức chi tiết đều phai đi.\n'
       + '⇒ Thứ còn lại là thói quen tư duy: biết đặt câu hỏi, biết kiểm chứng, biết nhìn một việc từ nhiều phía, '
       + 'biết tự học điều mình chưa biết. Đó mới là kết quả thật của mười hai năm đi học. '
       + 'Câu kết vì thế vừa an ủi người lo lắng về điểm số, vừa nhắc rằng cách học quan trọng hơn kết quả một kỳ thi.' }
  ],
  nlvh: {
    q: 'Viết đoạn văn nghị luận (khoảng 200 chữ) phân tích quan niệm về mục đích học tập được tác giả trình bày trong văn bản trên.',
    dan: '· Mở đoạn: giới thiệu văn bản và quan niệm — học để mở rộng cách nhìn chứ không chỉ để thi đỗ.\n'
       + '· Thân đoạn:\n'
       + '   – Tác giả trước hết chỉ ra quan niệm phổ biến qua chuỗi hỏi – đáp, và nhận xét công bằng: "không sai, chỉ ngắn".\n'
       + '   – Vạch ra hệ quả: coi học là phương tiện thì học xong sẽ bỏ ⇒ lí giải hiện tượng ngừng đọc, ngừng hỏi sau khi có bằng.\n'
       + '   – Đề xuất câu trả lời dài hơn, kèm hai dẫn chứng cụ thể về khoa học và tiểu thuyết.\n'
       + '   – Dùng ẩn dụ "cánh cửa", "khó bị dắt đi" để gắn học vấn với sự độc lập trong tư duy.\n'
       + '   – Câu kết đối lập cái tạm thời (thi cử) với cái ở lại (cách suy nghĩ), tạo dư âm.\n'
       + '· Kết đoạn: quan niệm ấy vừa sâu sắc vừa thiết thực với học sinh đang đứng trước kỳ thi.',
    diem: BD_DOAN
  }
}

]);

/* ============================================================
   KHO ĐỀ NGHỊ LUẬN XÃ HỘI — CÂU 2, 4,0 ĐIỂM, KHOẢNG 600 CHỮ
   Câu này độc lập với ngữ liệu đọc hiểu nên ghép được với mọi
   ngữ liệu ⇒ số bộ đề = số ngữ liệu × số đề xã hội.
   ============================================================ */
const BD_BAI = '0,25 hình thức bài · 0,5 xác định đúng vấn đề · 2,5 triển khai luận điểm + lí lẽ + dẫn chứng · 0,25 chính tả, ngữ pháp · 0,5 sáng tạo';
const xh = (q, dan) => ({ q: q, dan: dan, diem: BD_BAI });

/* các đề đã có sẵn trong 6 bộ đề gốc, gom lại thành kho chung */
TD.DE_NLXH = (TD.DE_VAN || []).map(d => d.nlxh).filter(Boolean).concat([

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về ý kiến: tuổi trẻ cần dám thử và dám sai.',
  '· Mở bài: tuổi trẻ là quãng đời có quyền sai nhiều nhất mà mất mát ít nhất.\n'
+ '· Giải thích: "dám thử" là chủ động bước vào việc mình chưa chắc làm được; "dám sai" là chấp nhận rủi ro thất bại kèm theo.\n'
+ '· Bàn luận:\n'
+ '   – Vì sao tuổi trẻ nên thử: chi phí sai lầm còn thấp, thời gian sửa còn dài, khả năng học còn nhanh.\n'
+ '   – Thử mới biết mình hợp gì; ngồi nghĩ mãi không thay được một lần làm.\n'
+ '   – Dẫn chứng: học sinh tham gia dự án, cuộc thi, câu lạc bộ; những người đổi ngành và thành công.\n'
+ '   – Phản đề: dám sai KHÔNG phải liều lĩnh vô trách nhiệm; phải lường hậu quả, tránh sai lầm không hoàn lại '
+ '(sức khoẻ, pháp luật, lòng tin của người khác).\n'
+ '· Bài học: thử có kế hoạch, sai thì rút kinh nghiệm và ghi lại.\n'
+ '· Kết bài: tuổi trẻ không sợ vấp, chỉ sợ đứng yên.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về vai trò của tính tự lập đối với người trẻ hôm nay.',
  '· Mở bài: từ thực tế nhiều bạn trẻ vào đại học mới lần đầu tự nấu ăn, tự quản lí chi tiêu.\n'
+ '· Giải thích: tự lập là tự lo được việc của mình và tự chịu trách nhiệm về quyết định của mình.\n'
+ '· Bàn luận:\n'
+ '   – Biểu hiện: tự học, tự quản thời gian, tự quản tiền, tự giải quyết mâu thuẫn.\n'
+ '   – Ý nghĩa: tạo sự tự tin, giúp thích nghi nhanh, tránh phụ thuộc và bị dẫn dắt.\n'
+ '   – Nguyên nhân của sự thiếu tự lập: được bao bọc quá kỹ, học quá tải nên không còn việc gì khác để làm.\n'
+ '   – Phản đề: tự lập không có nghĩa là từ chối mọi giúp đỡ; biết nhờ đúng lúc, đúng người cũng là một năng lực.\n'
+ '· Bài học: bắt đầu từ những việc nhỏ ngay trong nhà và trong lớp.\n'
+ '· Kết bài: tự lập là hành trang không thể thiếu khi rời vòng tay gia đình.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về hiện tượng sống ảo trên mạng xã hội của giới trẻ.',
  '· Mở bài: từ những bức ảnh chỉnh sửa kỹ lưỡng trên trang cá nhân → nêu hiện tượng.\n'
+ '· Giải thích: sống ảo là xây dựng một hình ảnh khác xa thực tế trên mạng và lấy phản hồi ảo làm thước đo giá trị bản thân.\n'
+ '· Bàn luận:\n'
+ '   – Biểu hiện: chỉnh ảnh quá đà, khoe của, dựng chuyện gây chú ý, chạy theo lượt thích.\n'
+ '   – Nguyên nhân: nhu cầu được công nhận; thuật toán ưu ái nội dung gây chú ý; áp lực so sánh.\n'
+ '   – Hậu quả: lệch lạc giá trị, lo âu và tự ti khi đối chiếu, tốn thời gian, có khi vi phạm pháp luật.\n'
+ '   – Phản đề: dùng mạng xã hội để chia sẻ, học tập, kinh doanh là chính đáng; '
+ 'vấn đề nằm ở việc lấy thế giới ảo thay cho đời sống thật.\n'
+ '· Giải pháp và liên hệ bản thân: giới hạn thời gian, chọn lọc nội dung theo dõi, đầu tư cho giá trị thật.\n'
+ '· Kết bài: mạng là công cụ, đừng để nó trở thành thước đo con người mình.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về ý nghĩa của lòng biết ơn trong cuộc sống.',
  '· Mở bài: từ một lời cảm ơn tưởng như nhỏ nhặt → nêu vấn đề.\n'
+ '· Giải thích: biết ơn là nhận ra mình đã nhận được gì từ ai và bày tỏ điều đó bằng thái độ, hành động.\n'
+ '· Bàn luận:\n'
+ '   – Với người nhận: giúp sống tích cực, bớt oán trách, thấy đủ đầy hơn.\n'
+ '   – Với người cho: được ghi nhận nên có động lực tiếp tục tử tế.\n'
+ '   – Với cộng đồng: biết ơn là nền của đạo lí "uống nước nhớ nguồn", giữ gắn kết giữa các thế hệ.\n'
+ '   – Dẫn chứng: tri ân thầy cô, cha mẹ; tưởng nhớ những người ngã xuống; ghi nhận công của người lao động thầm lặng.\n'
+ '   – Phản đề: biết ơn không phải mắc nợ hay phục tùng vô điều kiện; '
+ 'cũng không dừng ở lời nói suông trong một dịp lễ.\n'
+ '· Bài học: biến biết ơn thành việc làm cụ thể, thường xuyên.\n'
+ '· Kết bài: người biết ơn là người biết mình đứng trên vai ai.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về sự cần thiết của tư duy phản biện đối với học sinh.',
  '· Mở bài: từ thực tế tin giả lan tràn trên mạng → nêu vấn đề.\n'
+ '· Giải thích: tư duy phản biện là khả năng xem xét một thông tin hay ý kiến bằng lí lẽ và bằng chứng trước khi tin theo.\n'
+ '· Bàn luận:\n'
+ '   – Vì sao cần: lượng thông tin quá lớn, thật giả lẫn lộn; học thuộc không còn đủ.\n'
+ '   – Lợi ích: học sâu hơn, tránh bị dắt mũi, biết bảo vệ quan điểm bằng lí lẽ, làm việc nhóm hiệu quả.\n'
+ '   – Cách rèn: đặt câu hỏi "căn cứ ở đâu", tìm nguồn gốc thông tin, thử đứng về phía đối lập, viết ra lập luận của mình.\n'
+ '   – Phản đề: phản biện KHÁC với cãi lấy được hay hoài nghi mọi thứ; '
+ 'phản biện phải dựa trên tôn trọng và bằng chứng, phải sẵn sàng đổi ý khi mình sai.\n'
+ '· Liên hệ bản thân: một thói quen cụ thể trong việc học và dùng mạng.\n'
+ '· Kết bài: người biết nghi ngờ đúng cách là người khó bị lừa nhất.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về trách nhiệm của tuổi trẻ đối với quê hương, đất nước.',
  '· Mở bài: từ hình ảnh những người trẻ tình nguyện, khởi nghiệp ở quê → nêu vấn đề.\n'
+ '· Giải thích: trách nhiệm với quê hương không chỉ là những việc lớn lao mà bắt đầu từ việc sống tử tế và có ích ở nơi mình đang ở.\n'
+ '· Bàn luận:\n'
+ '   – Biểu hiện: học tập nghiêm túc để có năng lực thật; giữ gìn môi trường, văn hoá; tuân thủ pháp luật; '
+ 'tham gia hoạt động cộng đồng; quảng bá hình ảnh đất nước một cách trung thực.\n'
+ '   – Vì sao cần: mỗi thế hệ đều nhận một di sản và có nghĩa vụ bàn giao lại tốt hơn.\n'
+ '   – Dẫn chứng: người trẻ đưa nông sản quê ra thị trường lớn; các đội hình tình nguyện; vận động viên, học sinh mang thành tích về cho đất nước.\n'
+ '   – Phản đề: yêu nước không phải hô khẩu hiệu hay công kích người khác trên mạng; '
+ 'đi làm việc ở nước ngoài cũng không đồng nghĩa với quay lưng.\n'
+ '· Liên hệ bản thân: một việc cụ thể sẽ làm ngay trong năm nay.\n'
+ '· Kết bài: đất nước mạnh lên từ chất lượng của từng người trẻ.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về giá trị của sự kiên trì trong hành trình chinh phục mục tiêu.',
  '· Mở bài: từ chuyện ôn thi kéo dài nhiều tháng → nêu vấn đề.\n'
+ '· Giải thích: kiên trì là duy trì nỗ lực đều đặn theo hướng đã chọn, kể cả khi chưa thấy kết quả.\n'
+ '· Bàn luận:\n'
+ '   – Vì sao quan trọng: hầu hết kết quả lớn đều tới chậm; giai đoạn khó nhất là lúc chưa thấy tiến bộ.\n'
+ '   – Kiên trì tạo ra lợi thế cộng dồn: mỗi ngày một chút, nhiều tháng thành khoảng cách lớn.\n'
+ '   – Dẫn chứng: vận động viên, người học ngoại ngữ, nhà nghiên cứu; chính việc ôn thi của bản thân.\n'
+ '   – Điều kiện: kiên trì phải đi kèm phương pháp đúng và biết điều chỉnh, nếu không sẽ thành cố chấp.\n'
+ '   – Phản đề: có lúc từ bỏ đúng lúc mới là khôn ngoan, khi mục tiêu đã sai hoặc cái giá quá lớn.\n'
+ '· Bài học: chia mục tiêu thành mốc nhỏ, theo dõi tiến độ để duy trì động lực.\n'
+ '· Kết bài: người đi chậm mà đều thường tới trước người chạy rồi bỏ cuộc.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về ý nghĩa của việc lắng nghe trong các mối quan hệ.',
  '· Mở bài: từ những cuộc trò chuyện mà ai cũng chỉ chờ tới lượt mình nói → nêu vấn đề.\n'
+ '· Giải thích: lắng nghe là chú ý để hiểu người khác, khác với nghe cho có hoặc nghe để phản bác.\n'
+ '· Bàn luận:\n'
+ '   – Với người nói: được lắng nghe là được thừa nhận, giúp giải toả và tin cậy.\n'
+ '   – Với người nghe: thu được thông tin thật, tránh hiểu lầm, học được góc nhìn mới.\n'
+ '   – Trong gia đình, lớp học, tập thể: phần lớn mâu thuẫn bắt nguồn từ việc không ai chịu nghe hết câu.\n'
+ '   – Cách rèn: không cắt lời, hỏi lại để xác nhận, quan sát cả điều không nói ra, bỏ điện thoại xuống.\n'
+ '   – Phản đề: lắng nghe không đồng nghĩa với đồng ý hay im lặng chịu đựng; '
+ 'nghe xong vẫn cần nói ra chính kiến của mình.\n'
+ '· Liên hệ bản thân: một mối quan hệ mình sẽ lắng nghe nhiều hơn.\n'
+ '· Kết bài: biết nghe là bước đầu tiên của mọi sự thấu hiểu.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về việc giữ gìn bản sắc văn hoá dân tộc trong thời hội nhập.',
  '· Mở bài: từ hình ảnh giới trẻ vừa mê phim nước ngoài vừa mặc áo dài chụp ảnh Tết → nêu vấn đề.\n'
+ '· Giải thích: bản sắc văn hoá là những giá trị làm nên căn cước riêng của dân tộc — ngôn ngữ, phong tục, lối sống, nghệ thuật truyền thống.\n'
+ '· Bàn luận:\n'
+ '   – Vì sao phải giữ: mất bản sắc là mất chỗ đứng riêng; hội nhập mà giống hệt người khác thì không còn gì để đóng góp.\n'
+ '   – Thực trạng: nhiều nét đẹp mai một; nhưng cũng có làn sóng người trẻ làm mới truyền thống '
+ '(âm nhạc dân gian kết hợp hiện đại, thời trang lấy cảm hứng dân tộc, du lịch làng nghề).\n'
+ '   – Cách giữ đúng: hiểu trước khi giữ; đưa truyền thống vào đời sống hôm nay chứ không đóng khung trong bảo tàng.\n'
+ '   – Phản đề: giữ bản sắc không phải bài xích cái mới hay khước từ văn hoá nước ngoài; '
+ 'cũng không phải giữ cả những hủ tục lạc hậu.\n'
+ '· Liên hệ bản thân: giữ gìn tiếng Việt trong sáng, tìm hiểu văn hoá quê mình.\n'
+ '· Kết bài: hoà nhập chứ không hoà tan — câu ấy vẫn đúng cho hôm nay.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về ý nghĩa của việc chấp nhận sự khác biệt của người khác.',
  '· Mở bài: từ chuyện một bạn trong lớp bị trêu vì khác số đông → nêu vấn đề.\n'
+ '· Giải thích: chấp nhận khác biệt là tôn trọng những lựa chọn, hoàn cảnh, tính cách không giống mình, miễn không gây hại cho ai.\n'
+ '· Bàn luận:\n'
+ '   – Vì sao cần: không ai giống ai; áp một khuôn cho tất cả sẽ triệt tiêu cá tính và sáng tạo.\n'
+ '   – Lợi ích: tập thể đa dạng thì giải quyết vấn đề tốt hơn; cá nhân được là chính mình thì phát triển được thế mạnh.\n'
+ '   – Hậu quả của việc không chấp nhận: kỳ thị, bắt nạt học đường, tổn thương tâm lí lâu dài.\n'
+ '   – Cách rèn: đặt mình vào hoàn cảnh người khác, hỏi trước khi phán xét, không hùa theo đám đông.\n'
+ '   – Phản đề: chấp nhận khác biệt KHÔNG có nghĩa dung túng cái sai, cái vi phạm pháp luật hay xâm hại người khác.\n'
+ '· Liên hệ bản thân: thay đổi cách ứng xử với một người mình từng thấy "khác thường".\n'
+ '· Kết bài: một xã hội trưởng thành là nơi người ta khác nhau mà vẫn sống cạnh nhau được.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về tác hại của thói quen trì hoãn.',
  '· Mở bài: từ câu "để mai làm" quen thuộc của học sinh → nêu vấn đề.\n'
+ '· Giải thích: trì hoãn là biết việc cần làm nhưng cứ đẩy sang sau, thường để làm việc dễ chịu hơn.\n'
+ '· Bàn luận:\n'
+ '   – Biểu hiện: dồn bài tới sát hạn, mở sách ra rồi lướt điện thoại, lập kế hoạch thay vì bắt tay làm.\n'
+ '   – Nguyên nhân: sợ làm không tốt, việc quá lớn nên không biết bắt đầu từ đâu, phần thưởng tức thì từ giải trí.\n'
+ '   – Hậu quả: chất lượng kém, căng thẳng kéo dài, mất lòng tin của người khác, tự trách bản thân rồi lại trì hoãn tiếp.\n'
+ '   – Cách khắc phục: chia việc thành bước nhỏ, quy tắc bắt tay làm trong năm phút, đặt hạn nội bộ sớm hơn hạn thật, '
+ 'tách nguồn gây phân tán.\n'
+ '   – Phản đề: có lúc hoãn là hợp lí khi cần thêm thông tin hoặc cần nghỉ để hồi sức; khác hẳn với né tránh.\n'
+ '· Liên hệ bản thân: một việc sẽ làm ngay hôm nay thay vì để mai.\n'
+ '· Kết bài: thứ đắt nhất mà trì hoãn lấy đi không phải thời gian, mà là bản thiết kế cuộc đời mình.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về vai trò của ước mơ đối với con người.',
  '· Mở bài: từ câu hỏi quen thuộc "lớn lên em muốn làm gì" → nêu vấn đề.\n'
+ '· Giải thích: ước mơ là hình dung về điều mình muốn trở thành hoặc muốn làm được, đủ lớn để dẫn đường cho hành động hôm nay.\n'
+ '· Bàn luận:\n'
+ '   – Vai trò: cho ta lí do để cố gắng khi mệt; giúp sắp xếp thứ tự ưu tiên; nuôi dưỡng bản lĩnh trước khó khăn.\n'
+ '   – Ước mơ và mục tiêu: ước mơ chỉ có giá trị khi được cắt nhỏ thành các mục tiêu có thời hạn và hành động cụ thể.\n'
+ '   – Dẫn chứng: những người xuất phát từ hoàn cảnh khó khăn vẫn theo đuổi được điều mình chọn.\n'
+ '   – Phản đề: mơ mà không làm thì chỉ là mộng tưởng; ngược lại, ép mình theo ước mơ của cha mẹ '
+ 'hay của đám đông cũng khiến người ta lạc đường.\n'
+ '· Liên hệ bản thân: ước mơ của mình và bước đi gần nhất để tới đó.\n'
+ '· Kết bài: ước mơ không làm cuộc đời dễ hơn, nhưng làm nó có hướng.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về ý nghĩa của việc dám nhận lỗi.',
  '· Mở bài: từ phản xạ chối quanh khi bị bắt lỗi → nêu vấn đề.\n'
+ '· Giải thích: dám nhận lỗi là thừa nhận phần trách nhiệm của mình và sẵn sàng khắc phục hậu quả.\n'
+ '· Bàn luận:\n'
+ '   – Vì sao khó: sợ mất thể diện, sợ bị phạt, sợ bị đánh giá.\n'
+ '   – Ý nghĩa: chấm dứt tổn thất sớm; giữ được lòng tin; là điều kiện để sửa và để tiến bộ.\n'
+ '   – Với tập thể: một người dám nhận lỗi giúp cả nhóm tìm đúng nguyên nhân thay vì mất thời gian đổ lỗi.\n'
+ '   – Dẫn chứng: doanh nghiệp thu hồi sản phẩm lỗi và giữ được uy tín; ngược lại là những vụ che giấu khiến hậu quả lớn hơn.\n'
+ '   – Phản đề: nhận lỗi không phải nhận bừa mọi thứ về mình, cũng không dừng ở lời xin lỗi mà phải kèm hành động sửa chữa.\n'
+ '· Liên hệ bản thân: một lần mình từng chối lỗi và bài học rút ra.\n'
+ '· Kết bài: người dám nhận lỗi là người đủ mạnh để không cần che giấu.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về áp lực thi cử của học sinh hiện nay.',
  '· Mở bài: từ không khí căng thẳng của mùa thi → nêu vấn đề.\n'
+ '· Giải thích: áp lực thi cử là căng thẳng nảy sinh từ kỳ vọng của bản thân, gia đình và xã hội quanh một kỳ thi.\n'
+ '· Bàn luận:\n'
+ '   – Hai mặt: áp lực vừa phải tạo động lực và sự tập trung; áp lực quá mức gây mất ngủ, lo âu, thậm chí trầm cảm.\n'
+ '   – Nguyên nhân: coi một kỳ thi là cánh cửa duy nhất; so sánh giữa các gia đình; thiếu thông tin về những con đường khác.\n'
+ '   – Giải pháp từ bản thân: lập kế hoạch sớm, chia nhỏ mục tiêu, ngủ đủ, vận động, chia sẻ với người tin cậy.\n'
+ '   – Giải pháp từ gia đình và nhà trường: đồng hành thay vì gây thêm kỳ vọng; giúp học sinh biết nhiều lựa chọn.\n'
+ '   – Phản đề: không nên đổ mọi trách nhiệm cho hoàn cảnh; thái độ chủ động của người học vẫn là yếu tố quyết định.\n'
+ '· Liên hệ bản thân: cách mình đang xử lí áp lực trong năm cuối cấp.\n'
+ '· Kết bài: một kỳ thi quan trọng nhưng không phải là toàn bộ cuộc đời.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về ý nghĩa của sự sẻ chia trong cuộc sống.',
  '· Mở bài: từ những chuyến hàng cứu trợ trong mùa bão lũ → nêu vấn đề.\n'
+ '· Giải thích: sẻ chia là cho đi một phần cái mình có — vật chất, thời gian, sự quan tâm — để người khác bớt khó khăn.\n'
+ '· Bàn luận:\n'
+ '   – Với người nhận: được nâng đỡ đúng lúc, có thêm niềm tin để đứng dậy.\n'
+ '   – Với người cho: thấy đời sống có ý nghĩa, mở rộng lòng mình, gắn kết với cộng đồng.\n'
+ '   – Với xã hội: là chất keo giữ cộng đồng lại với nhau trong biến cố.\n'
+ '   – Dẫn chứng: các phong trào thiện nguyện, bếp ăn không đồng, những người hiến máu, hiến tạng.\n'
+ '   – Phản đề: sẻ chia phải đúng cách và tôn trọng người nhận; tránh làm từ thiện phô trương, '
+ 'tránh giúp kiểu tạo ra sự lệ thuộc.\n'
+ '· Liên hệ bản thân: bắt đầu từ việc chia sẻ trong lớp, trong gia đình.\n'
+ '· Kết bài: cho đi không làm ta ít đi, mà làm ta lớn lên.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về việc lựa chọn nghề nghiệp của học sinh cuối cấp.',
  '· Mở bài: từ thời điểm chọn ngành, chọn trường của học sinh lớp 12 → nêu vấn đề.\n'
+ '· Giải thích: chọn nghề là quyết định gắn với phần lớn thời gian sống của một đời người, không chỉ là chọn một mã ngành.\n'
+ '· Bàn luận:\n'
+ '   – Ba yếu tố cần cân nhắc: mình thích gì, mình làm được gì, xã hội cần gì. Thiếu một là dễ chọn sai.\n'
+ '   – Sai lầm thường gặp: chạy theo ngành "hot", theo bạn bè, theo áp đặt của gia đình, chọn vì điểm chuẩn vừa tầm.\n'
+ '   – Cách chuẩn bị: tìm hiểu công việc thật của nghề, trò chuyện với người trong nghề, thử làm việc liên quan.\n'
+ '   – Phản đề: chọn sai không phải dấu chấm hết; nhiều người thành công sau khi đổi hướng, '
+ 'điều quan trọng là năng lực tự học.\n'
+ '· Liên hệ bản thân: hướng đi mình đang cân nhắc và lí do.\n'
+ '· Kết bài: chọn nghề là chọn cách mình sẽ sống, nên đáng để tìm hiểu nghiêm túc.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về vai trò của thói quen đọc sách đối với người trẻ.',
  '· Mở bài: từ số liệu người Việt đọc trung bình rất ít sách mỗi năm → nêu vấn đề.\n'
+ '· Giải thích: đọc sách là tiếp nhận tri thức và trải nghiệm được tổ chức có hệ thống, khác với đọc tin vụn vặt.\n'
+ '· Bàn luận:\n'
+ '   – Lợi ích: mở rộng vốn từ và khả năng diễn đạt; rèn sức chú ý; nuôi dưỡng đồng cảm qua văn học; cung cấp nền tri thức để phản biện.\n'
+ '   – Vì sao người trẻ ít đọc: nội dung ngắn hấp dẫn hơn; áp lực học; không được hướng dẫn chọn sách.\n'
+ '   – Cách tạo thói quen: bắt đầu từ sách mỏng và đúng sở thích, đọc cố định mỗi ngày một quãng ngắn, ghi lại điều tâm đắc, tham gia nhóm đọc.\n'
+ '   – Phản đề: đọc nhiều mà không suy ngẫm thì cũng chỉ là sưu tầm chữ; và sách nói, sách điện tử vẫn là đọc.\n'
+ '· Liên hệ bản thân: cuốn sách gần nhất và kế hoạch đọc của mình.\n'
+ '· Kết bài: mỗi cuốn sách là một cuộc đời được sống thêm.'),

xh('Viết bài văn nghị luận (khoảng 600 chữ) trình bày suy nghĩ của anh/chị về ý nghĩa của việc sống có kỉ luật với bản thân.',
  '· Mở bài: từ khoảng cách giữa kế hoạch đầu năm và thực tế cuối năm → nêu vấn đề.\n'
+ '· Giải thích: kỉ luật với bản thân là làm điều mình đã quyết ngay cả khi hết hứng thú.\n'
+ '· Bàn luận:\n'
+ '   – Vì sao cần: cảm hứng đến rồi đi, chỉ kỉ luật mới duy trì được kết quả đều đặn.\n'
+ '   – Biểu hiện: giữ đúng giờ học, hoàn thành việc trước hạn, kiểm soát thời gian dùng mạng, giữ lời hứa với chính mình.\n'
+ '   – Lợi ích lâu dài: tạo lòng tự trọng, tạo uy tín, tích luỹ được lợi thế cộng dồn.\n'
+ '   – Cách rèn: đặt mục tiêu nhỏ và dễ thắng, tạo môi trường ít cám dỗ, theo dõi tiến độ, tự thưởng hợp lí.\n'
+ '   – Phản đề: kỉ luật không phải hành hạ bản thân hay cầu toàn; nghỉ ngơi đúng lúc cũng là một phần của kỉ luật.\n'
+ '· Liên hệ bản thân: một nguyên tắc mình sẽ giữ trong mùa ôn thi.\n'
+ '· Kết bài: tự do thật sự thuộc về người điều khiển được chính mình.')

]);

/* ============================================================
   LẮP ĐỀ NGỮ VĂN
   Mỗi ngữ liệu ghép với ${TD.DE_NLXH.length} đề nghị luận xã hội.
   Hạt giống cố định theo số đề ⇒ "đề số 7" lúc nào cũng là đúng đề đó.
   ============================================================ */
TD.SO_DE_MOI_NGU_LIEU = 6;

TD.soDeVan = function () {
  return (TD.NGU_LIEU_VAN || []).length * TD.SO_DE_MOI_NGU_LIEU;
};

TD.deVan = function (so) {
  const bo = TD.NGU_LIEU_VAN || [], xhBo = TD.DE_NLXH || [];
  if (!bo.length || !xhBo.length) return null;
  const i = so % bo.length;                    /* ngữ liệu đọc hiểu */
  const bienThe = Math.floor(so / bo.length);  /* lần làm lại thứ mấy của ngữ liệu đó */
  const nl = bo[i];
  /* Điểm xuất phát băm theo ngữ liệu, rồi bước đều với bước nguyên tố cùng nhau
     với số đề xã hội ⇒ mọi biến thể của cùng một ngữ liệu chắc chắn ra câu 2 KHÁC nhau. */
  const buoc = 7;
  const k = (TD.bam('van-nlxh|' + nl.ten) + bienThe * buoc) % xhBo.length;
  return {
    so: so, bienThe: bienThe + 1,
    ten: nl.ten, loai: nl.loai, nguLieu: nl.nguLieu, xuatXu: nl.xuatXu,
    doc: nl.doc, nlvh: nl.nlvh, nlxh: xhBo[k]
  };
};

})();
