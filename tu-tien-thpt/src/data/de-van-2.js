/* ============================================================
   NGỮ LIỆU NGỮ VĂN — MỞ RỘNG
   Đề Ngữ văn 2025 có một đặc điểm rất tiện: Câu 1 phần Viết bám
   vào ngữ liệu đọc hiểu, còn Câu 2 (nghị luận xã hội 600 chữ) là
   một vấn đề đời sống ĐỘC LẬP. Nhờ vậy mỗi ngữ liệu ghép được với
   bất kì đề nghị luận xã hội nào ⇒ số bộ đề nhân lên rất nhiều.
   Ngữ liệu đều NGOÀI sách giáo khoa, đúng yêu cầu của đề thật.
   ============================================================ */
window.TD = window.TD || {};

/* 6 bộ đề viết trước trở thành 6 ngữ liệu đầu tiên */
TD.NGU_LIEU_VAN = (TD.DE_VAN || []).slice();

const BD_DOAN = '0,25 hình thức đoạn · 0,25 xác định đúng vấn đề · 1,0 triển khai (dẫn chứng + phân tích) · 0,25 chính tả, ngữ pháp · 0,25 sáng tạo';

TD.NGU_LIEU_VAN = TD.NGU_LIEU_VAN.concat([

/* ---------------------------------------------------------- 7 */
{
  ten: 'Bánh trôi nước — Hồ Xuân Hương',
  loai: 'Thơ trữ tình',
  nguLieu: `Thân em vừa trắng lại vừa tròn,
Bảy nổi ba chìm với nước non.
Rắn nát mặc dầu tay kẻ nặn,
Mà em vẫn giữ tấm lòng son.`,
  xuatXu: '(Hồ Xuân Hương, <i>Bánh trôi nước</i>, in trong <i>Thơ Hồ Xuân Hương</i>, NXB Văn học)',
  doc: [
    { d: 0.5, q: 'Xác định thể thơ của văn bản.',
      a: 'Thất ngôn tứ tuyệt Đường luật: bài gồm 4 câu, mỗi câu 7 chữ, gieo vần chân ở câu 1, 2, 4 (tròn – non – son).' },
    { d: 0.5, q: 'Chỉ ra thành ngữ dân gian được vận dụng trong bài thơ.',
      a: 'Thành ngữ "bảy nổi ba chìm" (biến thể của "ba chìm bảy nổi"), chỉ cuộc đời long đong, lận đận, nhiều chìm nổi.' },
    { d: 1.0, q: 'Phân tích tác dụng của cách mở đầu bằng mô-típ "Thân em…".',
      a: 'Mô-típ "Thân em…" vốn quen thuộc trong ca dao than thân của người phụ nữ ("Thân em như tấm lụa đào…").\n'
       + 'Tác dụng: · lập tức đặt bài thơ vào mạch nguồn dân gian, gợi cả một truyền thống tiếng nói than thân;\n'
       + '· "thân" nhấn vào thân phận nhỏ bé, bị định đoạt; · tạo giọng điệu vừa tự hào ("vừa trắng lại vừa tròn") '
       + 'vừa xót xa, khiến cái riêng của chiếc bánh trôi hoá thành cái chung của bao người phụ nữ.' },
    { d: 1.0, q: 'Nêu hiệu quả nghệ thuật của biện pháp ẩn dụ được sử dụng trong toàn bài.',
      a: 'Toàn bài là một ẩn dụ lớn: hình ảnh chiếc bánh trôi nước ẩn dụ cho thân phận và phẩm chất người phụ nữ.\n'
       + 'Mọi chi tiết đều mang hai lớp nghĩa: "trắng, tròn" là màu bột và vẻ đẹp hình thể; '
       + '"bảy nổi ba chìm" là bánh luộc trong nồi và là cuộc đời lận đận; '
       + '"rắn nát mặc dầu tay kẻ nặn" là người làm bánh và là số phận bị người khác định đoạt; '
       + '"tấm lòng son" là nhân đường đỏ và là lòng thuỷ chung son sắt.\n'
       + 'Hiệu quả: bài thơ vừa kín đáo vừa sâu sắc, nói được điều khó nói trong xã hội phong kiến; '
       + 'lớp nghĩa tả thực càng chính xác thì lớp nghĩa ẩn dụ càng thuyết phục.' },
    { d: 1.0, q: 'Anh/chị hiểu như thế nào về chữ "mà" trong câu cuối? Trả lời trong 5–7 dòng.',
      a: 'Gợi ý: Ba câu đầu là chuỗi bị động — em bị nặn, bị luộc, bị chìm nổi, tất cả do "tay kẻ nặn". '
       + 'Chữ "mà" ở câu cuối tạo một bước ngoặt, chuyển giọng từ than thân sang khẳng định.\n'
       + '⇒ Nó nói rằng: hoàn cảnh có thể quyết định hình hài, nhưng không quyết định được phẩm giá. '
       + 'Chủ thể trữ tình chấp nhận cái không đổi được ("mặc dầu") để giữ lấy cái mình còn quyền giữ ("vẫn giữ"). '
       + 'Một chữ "mà" mà làm cả bài thơ ngẩng đầu lên — đó là bản lĩnh của Hồ Xuân Hương.' }
  ],
  nlvh: {
    q: 'Viết đoạn văn nghị luận (khoảng 200 chữ) phân tích vẻ đẹp của người phụ nữ được thể hiện trong bài thơ <i>Bánh trôi nước</i> của Hồ Xuân Hương.',
    dan: '· Mở đoạn: giới thiệu bài thơ và vấn đề — vẻ đẹp hình thức lẫn phẩm chất của người phụ nữ.\n'
       + '· Thân đoạn:\n'
       + '   – Vẻ đẹp hình thể: "vừa trắng lại vừa tròn" — cặp phụ từ "vừa… lại vừa" mang giọng tự hào, đầy đặn, phúc hậu.\n'
       + '   – Thân phận: "bảy nổi ba chìm", "rắn nát mặc dầu tay kẻ nặn" — bị động hoàn toàn trước số phận.\n'
       + '   – Phẩm chất: "vẫn giữ tấm lòng son" — thuỷ chung, kiên định, không để hoàn cảnh làm biến chất.\n'
       + '   – Nghệ thuật: ẩn dụ toàn bài, mô-típ "thân em", thành ngữ dân gian, kết cấu đối lập bị động – chủ động.\n'
       + '· Kết đoạn: bài thơ là tiếng nói thương cảm và trân trọng, đưa Hồ Xuân Hương thành tiếng nói bênh vực phụ nữ sớm nhất trong văn học dân tộc.',
    diem: BD_DOAN
  }
},

/* ---------------------------------------------------------- 8 */
{
  ten: 'Qua Đèo Ngang — Bà Huyện Thanh Quan',
  loai: 'Thơ trữ tình',
  nguLieu: `Bước tới Đèo Ngang bóng xế tà,
Cỏ cây chen đá, lá chen hoa.
Lom khom dưới núi tiều vài chú,
Lác đác bên sông chợ mấy nhà.
Nhớ nước đau lòng con quốc quốc,
Thương nhà mỏi miệng cái gia gia.
Dừng chân đứng lại trời non nước,
Một mảnh tình riêng ta với ta.`,
  xuatXu: '(Bà Huyện Thanh Quan, <i>Qua Đèo Ngang</i>, in trong <i>Hợp tuyển thơ văn Việt Nam</i>, NXB Văn học)',
  doc: [
    { d: 0.5, q: 'Xác định thời điểm và không gian được miêu tả trong bài thơ.',
      a: 'Thời điểm: "bóng xế tà" — lúc chiều muộn, mặt trời sắp lặn. Không gian: Đèo Ngang — nơi hoang vu, heo hút, có núi, sông, cỏ cây chen đá.' },
    { d: 0.5, q: 'Chỉ ra các từ láy được sử dụng trong bài thơ.',
      a: 'Các từ láy: "lom khom", "lác đác". Có thể kể thêm cách láy âm trong "quốc quốc", "gia gia".' },
    { d: 1.0, q: 'Phân tích tác dụng của phép đảo ngữ trong hai câu: "Lom khom dưới núi tiều vài chú, / Lác đác bên sông chợ mấy nhà."',
      a: 'Phép đảo ngữ đưa từ láy tượng hình lên đầu câu ("lom khom", "lác đác") thay vì để sau chủ ngữ.\n'
       + 'Tác dụng: · nhấn mạnh ngay dáng vẻ nhỏ bé, lom khom của con người và sự thưa thớt của xóm chợ; '
       + '· con người xuất hiện nhưng chỉ như một nét chấm phá, càng làm nổi bật sự mênh mông hoang vắng của cảnh; '
       + '· kết hợp phép đối chuẩn mực của thơ Đường luật, tạo nhịp cân xứng, trang nhã. '
       + 'Cảnh có người mà vẫn quạnh — đó là cái tài của tác giả.' },
    { d: 1.0, q: 'Nêu hiệu quả nghệ thuật của cách chơi chữ trong hai câu luận.',
      a: '"Quốc quốc" vừa là tiếng chim cuốc kêu vừa đồng âm với "quốc" (nước); '
       + '"gia gia" vừa là tiếng chim đa đa vừa đồng âm với "gia" (nhà).\n'
       + 'Hiệu quả: · biến âm thanh của tự nhiên thành tiếng lòng người — "nhớ nước", "thương nhà"; '
       + '· mượn điển tích vua Thục mất nước hoá thành chim cuốc để gửi nỗi hoài cổ, tiếc nhớ triều đại đã qua; '
       + '· lối chơi chữ kín đáo, đúng phong cách trang nhã, hàm súc của Bà Huyện Thanh Quan.' },
    { d: 1.0, q: 'Anh/chị hiểu như thế nào về cụm từ "ta với ta" ở câu kết? Trả lời trong 5–7 dòng.',
      a: 'Gợi ý: "Ta với ta" ở đây chỉ có MỘT người — tác giả đối diện với chính mình. '
       + 'Trước mặt là "trời non nước" bao la, sau lưng là quê nhà xa ngái, giữa khoảng ấy chỉ còn "một mảnh tình riêng".\n'
       + '⇒ Cụm từ diễn tả nỗi cô đơn tuyệt đối: không ai để chia sẻ, tâm sự chỉ có thể giữ trong lòng. '
       + 'Đối lập giữa cái vô cùng của thiên nhiên và cái nhỏ nhoi của "một mảnh tình riêng" đẩy nỗi cô đơn lên đỉnh điểm. '
       + '(Có thể so sánh với "ta với ta" trong <i>Bạn đến chơi nhà</i> của Nguyễn Khuyến — ở đó là hai người mà thành một, ấm áp; '
       + 'ở đây là một người mà vẫn trơ trọi.)' }
  ],
  nlvh: {
    q: 'Viết đoạn văn nghị luận (khoảng 200 chữ) phân tích tâm trạng của nhân vật trữ tình trong bài thơ <i>Qua Đèo Ngang</i>.',
    dan: '· Mở đoạn: giới thiệu bài thơ và tâm trạng chủ đạo — nỗi buồn hoài cổ và sự cô đơn.\n'
       + '· Thân đoạn:\n'
       + '   – Thời điểm "bóng xế tà": thời khắc dễ gợi buồn, gợi cảm giác tàn lụi, kết thúc.\n'
       + '   – Cảnh vật hoang sơ, chen chúc mà vẫn vắng: "cỏ cây chen đá, lá chen hoa".\n'
       + '   – Con người thưa thớt, nhỏ bé qua đảo ngữ và từ láy "lom khom", "lác đác".\n'
       + '   – Âm thanh chim cuốc, chim đa đa cùng lối chơi chữ đồng âm ⇒ nỗi nhớ nước, thương nhà.\n'
       + '   – Câu kết "một mảnh tình riêng ta với ta": cô đơn tuyệt đối giữa trời non nước.\n'
       + '   – Nghệ thuật: thể Đường luật chỉnh, phép đối, từ láy, tả cảnh ngụ tình.\n'
       + '· Kết đoạn: bài thơ là tiếng lòng của một tâm hồn nữ sĩ hoài cổ, trang nhã mà sâu lắng.',
    diem: BD_DOAN
  }
},

/* ---------------------------------------------------------- 9 */
{
  ten: 'Bạn đến chơi nhà — Nguyễn Khuyến',
  loai: 'Thơ trữ tình',
  nguLieu: `Đã bấy lâu nay bác tới nhà,
Trẻ thời đi vắng, chợ thời xa.
Ao sâu nước cả, khôn chài cá,
Vườn rộng rào thưa, khó đuổi gà.
Cải chửa ra cây, cà mới nụ,
Bầu vừa rụng rốn, mướp đương hoa.
Đầu trò tiếp khách, trầu không có,
Bác đến chơi đây, ta với ta.`,
  xuatXu: '(Nguyễn Khuyến, <i>Bạn đến chơi nhà</i>, in trong <i>Thơ văn Nguyễn Khuyến</i>, NXB Văn học)',
  doc: [
    { d: 0.5, q: 'Xác định đề tài của bài thơ.',
      a: 'Đề tài: tình bạn — cụ thể là chuyện tiếp đãi bạn khi bạn tới chơi nhà.' },
    { d: 0.5, q: 'Chỉ ra hai chi tiết cho thấy chủ nhà không có gì để đãi khách.',
      a: 'Có thể nêu bất kì hai chi tiết: trẻ đi vắng, chợ xa; ao sâu không chài được cá; vườn rào thưa khó bắt gà; '
       + 'cải chưa ra cây, cà mới nụ, bầu vừa rụng rốn, mướp đương hoa; đến miếng trầu cũng không có.' },
    { d: 1.0, q: 'Phân tích tác dụng của thủ pháp liệt kê tăng tiến trong sáu câu giữa bài thơ.',
      a: 'Tác giả liệt kê lần lượt: cá → gà → cải → cà → bầu → mướp → trầu. Thứ tự đi từ món quý tới món rẻ nhất, '
       + 'và mỗi thứ đều "có mà như không" vì vướng một lí do rất hợp lí.\n'
       + 'Tác dụng: · tạo tiếng cười hóm hỉnh, nhẹ nhàng — càng liệt kê càng thấy trống;\n'
       + '· dồn tới cực điểm ở câu 7 khi cả miếng trầu (lễ tối thiểu của người Việt) cũng không có, để câu 8 bật ra ý nghĩa;\n'
       + '· qua cái nghèo vật chất làm nổi bật cái giàu của tình bạn — đây mới là điều tác giả muốn nói.' },
    { d: 1.0, q: 'Nhận xét về giọng điệu của bài thơ.',
      a: 'Giọng điệu hóm hỉnh, đùa vui, tự trào mà ấm áp. Nhà thơ không than nghèo mà "khoe" cái nghèo một cách dí dỏm, '
       + 'lấy chính sự thiếu thốn của mình làm chất liệu gây cười.\n'
       + 'Cách nói giả vờ phân trần ("thời… thời…", "khôn…", "khó…") tạo cảm giác thân mật như đang trò chuyện. '
       + 'Chính giọng điệu ấy khiến bài thơ không sa vào than thân, mà trở thành một lời bày tỏ tình bạn chân thành, tự nhiên.' },
    { d: 1.0, q: 'Cụm từ "ta với ta" ở câu cuối gợi cho anh/chị suy nghĩ gì về tình bạn? Trả lời trong 5–7 dòng.',
      a: 'Gợi ý: "Ta với ta" ở đây là HAI người — chủ và khách — nhưng lại hoà làm một, không còn khoảng cách. '
       + 'Câu thơ đặt sau bảy câu kể về cái không có, nên nó khẳng định: cái duy nhất có, và cũng là cái đủ, chính là hai con người.\n'
       + '⇒ Tình bạn đích thực không cần mâm cao cỗ đầy, không đo bằng lễ nghi hay vật chất, '
       + 'mà đo bằng sự thấu hiểu và niềm vui khi được ở bên nhau. '
       + 'Trong đời sống hôm nay — khi các mối quan hệ dễ bị quy đổi thành lợi ích — bài học ấy càng đáng nhớ.' }
  ],
  nlvh: {
    q: 'Viết đoạn văn nghị luận (khoảng 200 chữ) phân tích quan niệm về tình bạn của Nguyễn Khuyến qua bài thơ <i>Bạn đến chơi nhà</i>.',
    dan: '· Mở đoạn: giới thiệu bài thơ và quan niệm — tình bạn cao hơn mọi lễ nghi, vật chất.\n'
       + '· Thân đoạn:\n'
       + '   – Câu 1: lời chào reo vui "Đã bấy lâu nay bác tới nhà" — chữ "bác" thân kính, giọng mừng rỡ.\n'
       + '   – Sáu câu giữa: liệt kê tăng tiến những thứ "có mà như không", tạo tình huống trớ trêu đầy dụng ý.\n'
       + '   – Câu 7: đến miếng trầu — lễ tối thiểu — cũng không, đẩy cái thiếu tới tận cùng.\n'
       + '   – Câu 8: "Bác đến chơi đây, ta với ta" — cú lật ngược, khẳng định cái đủ nằm ở con người.\n'
       + '   – Nghệ thuật: kết cấu 1/6/1 độc đáo, giọng tự trào hóm hỉnh, ngôn ngữ thuần Việt, đậm chất nông thôn.\n'
       + '· Kết đoạn: bài thơ là một định nghĩa đẹp và bền về tình bạn trong văn học dân tộc.',
    diem: BD_DOAN
  }
},

/* ---------------------------------------------------------- 10 */
{
  ten: 'Chiếc xe đạp của cha',
  loai: 'Truyện ngắn',
  nguLieu: `      Nhà tôi có một chiếc xe đạp cũ, khung sơn xanh đã tróc, yên bọc nhựa nứt được cha vá lại bằng băng dính đen. Suốt mười hai năm đi học, tôi ngồi sau chiếc xe ấy.
      Có lần, một đứa bạn cùng lớp hỏi tôi: "Sao cha mày không mua xe máy?" Tôi im. Chiều hôm đó tôi bảo cha dừng xe ở đầu ngõ, tôi tự đi bộ vào trường. Cha không hỏi gì, chỉ gật đầu. Từ đó, sáng nào cha cũng dừng ở đúng chỗ ấy, cách cổng trường hai trăm mét.
      Mãi tới năm tôi lên lớp mười hai, một buổi sáng mưa, tôi chạy vội quên áo mưa. Quay lại thì thấy cha vẫn đứng đó, dưới gốc bàng, tay cầm chiếc áo mưa gấp vuông vắn. Cha đứng đó bao lâu rồi? Tôi hỏi. Cha cười: "Cũng chẳng lâu. Cha đứng đây mấy năm nay rồi, sáng nào cũng nhìn con vào tới cổng mới đi làm."
      Tôi đứng chết lặng giữa cơn mưa. Hoá ra suốt ba năm tôi cố giấu chiếc xe đạp của cha, thì cha vẫn ở đó — chỉ là tôi chưa từng quay đầu lại.`,
  xuatXu: '(Truyện ngắn dùng làm ngữ liệu ôn tập)',
  doc: [
    { d: 0.5, q: 'Xác định ngôi kể của văn bản.',
      a: 'Ngôi thứ nhất, người kể chuyện xưng "tôi" và đồng thời là nhân vật chính.' },
    { d: 0.5, q: 'Chỉ ra chi tiết cho thấy nhân vật "tôi" từng mặc cảm về hoàn cảnh gia đình.',
      a: 'Chi tiết: sau khi bị bạn hỏi "Sao cha mày không mua xe máy?", nhân vật "tôi" bảo cha dừng xe ở đầu ngõ '
       + 'rồi tự đi bộ vào trường, cách cổng trường hai trăm mét.' },
    { d: 1.0, q: 'Nêu tác dụng của chi tiết "chiếc áo mưa gấp vuông vắn" trong tay người cha.',
      a: 'Đây là chi tiết đắt giá. Tác dụng:\n'
       + '· Cho thấy tình thương của cha là sự chuẩn bị lặng lẽ, chu đáo — áo mưa không vo tròn mà GẤP VUÔNG VẮN, '
       + 'nghĩa là đã cầm sẵn từ lâu, cầm rất cẩn thận;\n'
       + '· Đối lập với sự vội vàng, vô tâm của người con — con quên, cha thì nhớ;\n'
       + '· Là điểm nút để nhân vật "tôi" vỡ lẽ, đẩy truyện tới cao trào cảm xúc mà không cần một lời thuyết giáo nào.' },
    { d: 1.0, q: 'Phân tích ý nghĩa của câu kết: "chỉ là tôi chưa từng quay đầu lại".',
      a: 'Câu kết mang hai lớp nghĩa. Nghĩa đen: suốt ba năm, người con đi thẳng vào cổng trường, không một lần ngoái nhìn.\n'
       + 'Nghĩa bóng: "quay đầu lại" là nhìn nhận, là thấu hiểu, là biết ơn. Người con đã mải chạy theo ánh nhìn của người ngoài '
       + 'mà bỏ quên người đứng sau lưng mình.\n'
       + '⇒ Câu văn là lời tự trách nhẹ nhàng mà thấm thía, đồng thời là thông điệp cho người đọc: '
       + 'tình thương của cha mẹ luôn ở đó, chỉ là ta có chịu quay lại nhìn hay không.' },
    { d: 1.0, q: 'Từ văn bản, anh/chị rút ra bài học gì cho bản thân? Trả lời trong 5–7 dòng.',
      a: 'Học sinh tự rút ra, miễn hợp lí. Một số hướng: · Đừng để ánh nhìn của người khác làm mình xấu hổ về gia đình mình — '
       + 'cái đáng xấu hổ là vô ơn chứ không phải nghèo;\n'
       + '· Tình thương của cha mẹ thường không nói ra, phải chủ động quan sát mới thấy;\n'
       + '· Hãy bày tỏ lòng biết ơn khi còn kịp, bằng việc làm cụ thể chứ không đợi tới lúc hối tiếc;\n'
       + '· Liên hệ bản thân bằng một việc cụ thể sẽ làm cho cha mẹ.' }
  ],
  nlvh: {
    q: 'Viết đoạn văn nghị luận (khoảng 200 chữ) phân tích nhân vật người cha trong đoạn trích trên.',
    dan: '· Mở đoạn: giới thiệu truyện và nhân vật người cha — một người thương con lặng lẽ.\n'
       + '· Thân đoạn:\n'
       + '   – Hoàn cảnh: nghèo, đi chiếc xe đạp cũ vá bằng băng dính, đưa con đi học suốt mười hai năm.\n'
       + '   – Cách ứng xử khi con xấu hổ: "không hỏi gì, chỉ gật đầu" — im lặng chấp nhận, không trách móc, '
       + 'giữ thể diện cho con. Đây là chi tiết bộc lộ chiều sâu nhân cách.\n'
       + '   – Hành động thầm lặng: sáng nào cũng đứng dưới gốc bàng nhìn con vào tới cổng mới đi làm; chuẩn bị sẵn áo mưa.\n'
       + '   – Lời nói nhẹ tênh "Cũng chẳng lâu" — càng nhẹ càng nặng, càng làm người đọc xúc động.\n'
       + '   – Nghệ thuật: khắc hoạ qua hành động và chi tiết chọn lọc, ngôn ngữ giản dị, không một lời triết lí.\n'
       + '· Kết đoạn: người cha là hiện thân của tình phụ tử âm thầm — thứ tình thương không cần được thấy vẫn cứ tồn tại.',
    diem: BD_DOAN
  }
},

/* ---------------------------------------------------------- 11 */
{
  ten: 'Thất bại không phải điều ngược lại của thành công',
  loai: 'Văn bản nghị luận',
  nguLieu: `      Chúng ta quen xếp thất bại và thành công vào hai đầu đối lập của một trục: hoặc thắng, hoặc thua. Cách xếp ấy tiện cho việc chấm điểm, nhưng sai với cách con người thật sự tiến bộ.
      Điều ngược lại của thành công không phải là thất bại, mà là không làm gì cả. Một người thi trượt vẫn biết nhiều hơn về đề thi, về sức mình, về cách học sai chỗ nào — so với người chưa từng nộp hồ sơ. Thất bại có nội dung; sự né tránh thì rỗng.
      Vấn đề là phần lớn chúng ta không được dạy cách đọc thất bại. Ta chỉ được dạy cách tránh nó. Vì thế khi thất bại xảy ra, phản xạ đầu tiên thường là giấu đi, đổ lỗi hoặc tự trách mình thậm tệ — ba cách chắc chắn nhất để không học được gì từ nó.
      Người tiến xa không phải người ít vấp, mà là người biết đứng lại đủ lâu sau mỗi lần vấp để hỏi: mình đã sai ở giả định nào? Câu hỏi ấy biến một lần ngã thành một bậc thang.`,
  xuatXu: '(Bài viết dùng làm ngữ liệu ôn tập)',
  doc: [
    { d: 0.5, q: 'Xác định luận đề của văn bản.',
      a: 'Luận đề: thất bại không phải là đối lập của thành công mà là một phần của quá trình tiến bộ; '
       + 'điều thật sự đối lập với thành công là không hành động.' },
    { d: 0.5, q: 'Theo tác giả, ba phản xạ nào khiến con người không học được gì từ thất bại?',
      a: 'Ba phản xạ: giấu đi, đổ lỗi và tự trách mình thậm tệ. Theo tác giả, đây là "ba cách chắc chắn nhất để không học được gì từ nó" — vì cả ba đều khiến người ta không nhìn thẳng vào nguyên nhân thật sự.' },
    { d: 1.0, q: 'Chỉ ra và nêu tác dụng của thao tác lập luận bác bỏ được sử dụng trong văn bản.',
      a: 'Thao tác bác bỏ: tác giả nêu quan niệm quen thuộc ("xếp thất bại và thành công vào hai đầu đối lập"), '
       + 'thừa nhận nó có lí ở một mặt ("tiện cho việc chấm điểm"), rồi bác bỏ ("nhưng sai với cách con người thật sự tiến bộ") '
       + 'và đưa ra quan niệm thay thế.\n'
       + 'Tác dụng: · tạo bất ngờ, buộc người đọc xem lại điều mình vẫn mặc nhiên tin; '
       + '· cách bác bỏ có nhượng bộ nên không áp đặt, dễ thuyết phục; '
       + '· dọn đường tự nhiên cho luận điểm chính của bài.' },
    { d: 1.0, q: 'Anh/chị hiểu như thế nào về câu: "Thất bại có nội dung; sự né tránh thì rỗng."?',
      a: 'Câu văn ngắn, dùng phép đối để so sánh hai lựa chọn. "Có nội dung" nghĩa là thất bại để lại dữ liệu thật: '
       + 'ta biết mình yếu chỗ nào, phương pháp sai ở đâu, sức mình tới đâu. Còn "né tránh" thì không sinh ra thông tin nào cả — '
       + 'người không thử thì mãi mãi không biết gì hơn về bản thân.\n'
       + '⇒ Câu văn định giá lại thất bại: nó là cái giá phải trả để có tri thức về chính mình, '
       + 'và cái giá ấy rẻ hơn nhiều so với việc đứng yên.' },
    { d: 1.0, q: 'Anh/chị có đồng tình với ý kiến "Người tiến xa không phải người ít vấp" không? Vì sao? Trả lời trong 5–7 dòng.',
      a: 'Học sinh tự do bày tỏ, miễn lí giải thuyết phục.\n'
       + 'Hướng ĐỒNG TÌNH: người dám thử nhiều thì tất yếu vấp nhiều; điều quyết định là năng lực rút kinh nghiệm; '
       + 'dẫn chứng từ khoa học, thể thao, khởi nghiệp.\n'
       + 'Hướng ĐỒNG TÌNH MỘT PHẦN: không phải mọi vấp ngã đều đáng giá — có những sai lầm hậu quả quá lớn '
       + '(sức khoẻ, pháp luật, mất mát không hoàn lại) nên phải phòng tránh chứ không thể "học từ nó"; '
       + 'người khôn ngoan còn biết học từ thất bại của người khác để khỏi phải trả giá.' }
  ],
  nlvh: {
    q: 'Viết đoạn văn nghị luận (khoảng 200 chữ) phân tích sức thuyết phục trong cách lập luận của tác giả ở văn bản trên.',
    dan: '· Mở đoạn: nhận định — một văn bản ngắn nhưng lật ngược được một định kiến phổ biến.\n'
       + '· Thân đoạn:\n'
       + '   – Mở đầu bằng cách nêu và bác bỏ quan niệm quen thuộc, có nhượng bộ nên không gây phản ứng.\n'
       + '   – Đưa ra luận điểm mới bằng một mệnh đề gọn, dễ nhớ: điều ngược lại của thành công là không làm gì cả.\n'
       + '   – Chứng minh bằng phép so sánh cụ thể: người thi trượt so với người chưa từng nộp hồ sơ.\n'
       + '   – Chỉ ra nguyên nhân sâu xa (không được dạy cách đọc thất bại) rồi liệt kê ba phản xạ sai.\n'
       + '   – Kết bằng một câu hỏi hành động ("mình đã sai ở giả định nào?") — biến lí thuyết thành việc làm được ngay.\n'
       + '   – Ngôn ngữ giàu hình ảnh mà chính xác: "thất bại có nội dung", "một lần ngã thành một bậc thang".\n'
       + '· Kết đoạn: nhờ lập luận chặt và giọng điềm tĩnh, văn bản thuyết phục bằng lí trí chứ không bằng hô hào.',
    diem: BD_DOAN
  }
},

/* ---------------------------------------------------------- 12 */
{
  ten: 'Cái giá của sự tiện lợi',
  loai: 'Văn bản thông tin',
  nguLieu: `      Một chiếc túi ni lông được dùng trung bình trong khoảng mười hai phút, rồi bị vứt đi. Mười hai phút ấy đổi lấy hàng trăm năm tồn tại của nó trong đất, trong nước, trong bụng những con cá mà cuối cùng quay trở lại bàn ăn của chính chúng ta.
      Nhựa không biến mất. Nó chỉ vỡ nhỏ dần thành các hạt vi nhựa, đủ nhỏ để lọt qua mọi hệ thống lọc và đủ bền để đi khắp chuỗi thức ăn. Các nhà khoa học đã tìm thấy vi nhựa trong muối ăn, trong nước đóng chai, trong máu người.
      Điều đáng nói là phần lớn lượng nhựa ấy không đến từ sự cần thiết, mà đến từ sự tiện lợi: chiếc ống hút cho một cốc nước uống trong năm phút, lớp màng bọc cho quả chuối vốn đã có vỏ, cái túi lồng trong cái túi.
      Không ai đòi hỏi mỗi người phải sống không nhựa. Nhưng giữa "không thể thiếu" và "tiện thì dùng" là một khoảng rất rộng — và phần lớn rác thải nhựa của thế giới nằm trọn trong khoảng ấy.`,
  xuatXu: '(Bài viết dùng làm ngữ liệu ôn tập)',
  doc: [
    { d: 0.5, q: 'Xác định phương thức biểu đạt chính của văn bản.',
      a: 'Nghị luận (có kết hợp thuyết minh, sử dụng số liệu và dẫn chứng khoa học).' },
    { d: 0.5, q: 'Theo văn bản, vì sao nhựa được gọi là thứ "không biến mất"?',
      a: 'Vì nhựa không phân huỷ hoàn toàn mà chỉ vỡ nhỏ dần thành các hạt vi nhựa — đủ nhỏ để lọt qua mọi hệ thống lọc '
       + 'và đủ bền để đi khắp chuỗi thức ăn.' },
    { d: 1.0, q: 'Nêu tác dụng của việc đối chiếu "mười hai phút" với "hàng trăm năm" trong đoạn mở đầu.',
      a: 'Đây là phép đối lập về thời gian, kèm số liệu cụ thể.\n'
       + 'Tác dụng: · làm bật sự chênh lệch phi lí giữa lợi ích tức thời và hậu quả lâu dài; '
       + '· con số "mười hai phút" nhỏ tới mức gây sốc, khiến người đọc lập tức hình dung được mức độ lãng phí; '
       + '· mở đầu bằng một hình ảnh cụ thể thay vì lời kêu gọi chung chung nên có sức thuyết phục ngay từ câu đầu tiên.' },
    { d: 1.0, q: 'Phân tích hiệu quả của cách liệt kê trong câu: "chiếc ống hút cho một cốc nước uống trong năm phút, lớp màng bọc cho quả chuối vốn đã có vỏ, cái túi lồng trong cái túi."',
      a: 'Liệt kê ba ví dụ rất đời thường, được sắp theo mức độ vô lí tăng dần, kết thúc bằng hình ảnh "cái túi lồng trong cái túi" '
       + 'gần như phi lí hoàn toàn.\n'
       + 'Hiệu quả: · biến một vấn đề toàn cầu trừu tượng thành những cảnh ai cũng từng thấy, ai cũng từng làm; '
       + '· tạo giọng châm biếm nhẹ, khiến người đọc tự thấy mình trong đó mà không bị chỉ trích trực tiếp; '
       + '· chuẩn bị cho luận điểm cuối: phần lớn rác nhựa sinh ra từ tiện lợi chứ không từ nhu cầu thật.' },
    { d: 1.0, q: 'Anh/chị hãy đề xuất một việc làm cụ thể mà học sinh có thể thực hiện để giảm rác thải nhựa. Lí giải trong 5–7 dòng.',
      a: 'Học sinh tự đề xuất, miễn cụ thể và khả thi. Bài làm tốt cần: nêu rõ việc làm '
       + '(mang bình nước cá nhân; từ chối ống hút và túi ni lông khi mua đồ; dùng hộp cơm thay hộp xốp; '
       + 'phân loại rác tại lớp; vận động căng tin bỏ cốc nhựa dùng một lần);\n'
       + 'giải thích vì sao nó hiệu quả (giảm được bao nhiêu, dễ duy trì, tạo hiệu ứng lan toả trong lớp);\n'
       + 'và nêu khó khăn cùng cách khắc phục. Tránh trả lời chung chung kiểu "cần nâng cao ý thức".' }
  ],
  nlvh: {
    q: 'Viết đoạn văn nghị luận (khoảng 200 chữ) phân tích cách tác giả sử dụng dẫn chứng và số liệu để thuyết phục người đọc trong văn bản trên.',
    dan: '· Mở đoạn: nhận định — văn bản thuyết phục bằng sự thật cụ thể chứ không bằng lời kêu gọi.\n'
       + '· Thân đoạn:\n'
       + '   – Số liệu mở đầu ("mười hai phút" / "hàng trăm năm") gây sốc và định khung cho cả bài.\n'
       + '   – Dẫn chứng khoa học (vi nhựa trong muối ăn, nước đóng chai, máu người) nâng độ tin cậy, chạm tới nỗi lo sức khoẻ.\n'
       + '   – Dẫn chứng đời thường (ống hút, màng bọc quả chuối, túi lồng túi) kéo vấn đề về sát người đọc.\n'
       + '   – Cách sắp xếp từ xa tới gần, từ vĩ mô tới hành vi cá nhân, khiến kết luận trở nên tất yếu.\n'
       + '   – Giọng điềm tĩnh, không lên án ("Không ai đòi hỏi mỗi người phải sống không nhựa") nên dễ được tiếp nhận.\n'
       + '· Kết đoạn: sự kết hợp giữa số liệu, dẫn chứng khoa học và trải nghiệm quen thuộc làm nên sức nặng của bài viết.',
    diem: BD_DOAN
  }
}

]);
