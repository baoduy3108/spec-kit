/* ============================================================
   NGỮ VĂN — NHẬN DIỆN THỂ LOẠI TRONG MƯỜI GIÂY
   Câu 1 phần Đọc hiểu gần như năm nào cũng hỏi "xác định thể thơ" hoặc
   "xác định thể loại / phương thức biểu đạt". Đó là 0,5 điểm cho không,
   nhưng chỉ ăn được nếu nhận ra ngay mà không phải đọc hết bài.
   Bốn thẻ dưới đây là quy trình đếm — nhìn hình dáng văn bản là ra.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

(function () {
const them = (khoa, ds) => { TD.KHO[khoa] = (TD.KHO[khoa] || []).concat(ds); };

them('van_ct', [

{ nhom: 'A. Đọc hiểu', cd: 'Thể loại', ten: 'Nhận diện thể thơ — đếm chữ trước, đếm câu sau', cap: 1,
  ct: '<b>Bước 1 — đếm số chữ của DÒNG ĐẦU.</b> Đó là dấu hiệu mạnh nhất.<br>'
    + '&nbsp;&nbsp;<b>6 chữ rồi 8 chữ xen kẽ</b> → <b>lục bát</b>. Kiểm lại: chữ thứ 6 dòng sáu vần với chữ thứ 6 dòng tám.<br>'
    + '&nbsp;&nbsp;<b>7 – 7 – 6 – 8</b> lặp thành khổ bốn dòng → <b>song thất lục bát</b>.<br>'
    + '&nbsp;&nbsp;<b>Mọi dòng đều 7 chữ</b> → xuống bước 2 để tách Đường luật với thất ngôn hiện đại.<br>'
    + '&nbsp;&nbsp;<b>Mọi dòng đều 5 chữ</b> → <b>thơ năm chữ</b> (ngũ ngôn).<br>'
    + '&nbsp;&nbsp;<b>Mọi dòng đều 4 chữ</b> → <b>thơ bốn chữ</b>.<br>'
    + '&nbsp;&nbsp;<b>Mọi dòng đều 8 chữ</b> → <b>thơ tám chữ</b>.<br>'
    + '&nbsp;&nbsp;<b>Số chữ mỗi dòng KHÁC nhau</b>, không theo khuôn → <b>thơ tự do</b>.<br>'
    + '<b>Bước 2 — nếu toàn dòng 7 chữ thì đếm số DÒNG:</b><br>'
    + '&nbsp;&nbsp;<b>đúng 8 dòng</b> → <b>thất ngôn bát cú Đường luật</b>.<br>'
    + '&nbsp;&nbsp;<b>đúng 4 dòng</b> → <b>thất ngôn tứ tuyệt</b>.<br>'
    + '&nbsp;&nbsp;<b>chia thành nhiều khổ 4 dòng</b>, dài hơn 8 dòng → <b>thơ bảy chữ hiện đại</b>.<br>'
    + '<b>Bước 3 — kiểm chứng bằng vần.</b> Đường luật gieo vần CHÂN, chỉ một vần bằng, ở các dòng 1, 2, 4, 6, 8.',
  khi: 'Câu 1 phần Đọc hiểu. Làm trong 10 giây rồi sang câu khác.',
  vd: 'Dòng đầu 6 chữ, dòng sau 8 chữ, hết khổ lại 6 rồi 8 ⇒ lục bát. Không cần đọc hiểu nội dung mới trả lời được.',
  bay: 'Đừng gọi "thơ thất ngôn bát cú" là "thơ Đường" — <b>thơ Đường</b> là thơ đời Đường của Trung Quốc, còn '
     + '<b>thơ Đường luật</b> là thể thơ làm theo luật ấy. Người Việt viết thì phải gọi là thơ Đường luật, hoặc '
     + 'nói đủ "thất ngôn bát cú Đường luật".' },

{ nhom: 'A. Đọc hiểu', cd: 'Thể loại', ten: 'Thơ Đường luật — bố cục, niêm, luật, đối', cap: 2,
  ct: '<b>Bố cục bốn phần</b> của bài thất ngôn bát cú:<br>'
    + '&nbsp;&nbsp;dòng 1 – 2 <b>đề</b> (mở ra) · dòng 3 – 4 <b>thực</b> (tả cụ thể) · dòng 5 – 6 <b>luận</b> (bàn rộng) · '
    + 'dòng 7 – 8 <b>kết</b> (khép lại, thường là chỗ gửi tình).<br>'
    + '<b>Đối:</b> bắt buộc ở hai cặp <b>3 – 4</b> và <b>5 – 6</b>. Đối là: cùng vị trí thì cùng từ loại, ngược hoặc '
    + 'song song về nghĩa, và trái thanh bằng – trắc. Thấy hai dòng cân nhau như hai vế câu đối là nhận ra ngay.<br>'
    + '<b>Luật bằng – trắc:</b> xét chữ thứ HAI của dòng đầu — thanh bằng thì bài "luật bằng", thanh trắc thì "luật trắc". '
    + 'Quy ước cho phép co giãn: <i>nhất – tam – ngũ bất luận, nhị – tứ – lục phân minh</i> (chữ 1, 3, 5 tự do; chữ 2, 4, 6 phải đúng luật).<br>'
    + '<b>Niêm:</b> các dòng dính nhau về thanh theo cặp 1–8, 2–3, 4–5, 6–7.<br>'
    + '<b>Vần:</b> một vần bằng duy nhất, gieo ở cuối các dòng 1, 2, 4, 6, 8.<br>'
    + '<b>Tứ tuyệt</b> là nửa bài bát cú: 4 dòng, vần ở dòng 1, 2, 4; không bắt buộc đối.',
  khi: 'Câu hỏi về bố cục, về phép đối, hoặc câu yêu cầu phân tích một cặp câu trong bài Đường luật.',
  vd: 'Đề hỏi "chỉ ra phép đối trong bài" thì cứ tìm ở cặp 3 – 4 và 5 – 6, gần như luôn có.',
  bay: 'Nhiều bạn nhầm bố cục thành "mở – thân – kết" ba phần. Đường luật là BỐN phần: đề – thực – luận – kết. '
     + 'Và đối chỉ bắt buộc ở hai cặp giữa, không phải cả bài.' },

{ nhom: 'A. Đọc hiểu', cd: 'Thể loại', ten: 'Truyện — tuỳ bút — tản văn: phân biệt bằng ba câu hỏi', cap: 2,
  ct: 'Đọc bốn năm dòng đầu rồi hỏi lần lượt:<br>'
    + '<b>① Có nhân vật có tên và có việc xảy ra nối tiếp nhau không?</b><br>'
    + '&nbsp;&nbsp;Có → <b>truyện</b> (truyện ngắn, truyện dài, tiểu thuyết). Dấu hiệu kèm theo: có lời thoại đặt sau '
    + 'dấu gạch ngang, có mốc thời gian đẩy sự việc đi, có mở đầu – diễn biến – kết thúc.<br>'
    + '<b>② Không có cốt truyện, người viết xưng "tôi" và đang kể một trải nghiệm rồi từ đó nghĩ ngợi?</b><br>'
    + '&nbsp;&nbsp;Có → <b>tuỳ bút</b> hoặc <b>tản văn</b>. Phân biệt tiếp: <b>tuỳ bút</b> nghiêng về cảm xúc và cái tôi trữ '
    + 'tình, mạch viết tuỳ theo dòng cảm nghĩ, thường dài; <b>tản văn</b> ngắn hơn, bám một sự việc đời thường nhỏ và '
    + 'chốt lại một ý.<br>'
    + '<b>③ Không kể chuyện, không tả cảm xúc, mà đang thuyết phục người đọc tin một điều?</b><br>'
    + '&nbsp;&nbsp;Có luận điểm, lí lẽ, dẫn chứng → <b>văn bản nghị luận</b>.<br>'
    + '&nbsp;&nbsp;Chỉ cung cấp thông tin, số liệu, quy trình, không bàn luận → <b>văn bản thông tin</b>.<br>'
    + '<b>Ký</b> là tên gọi chung của nhóm ghi chép người thật việc thật: bút ký, phóng sự, hồi ký, tuỳ bút.',
  khi: 'Câu "xác định thể loại của văn bản" và câu "xác định phương thức biểu đạt chính".',
  vd: 'Văn bản mở bằng "Tôi nhớ những buổi chiều mẹ tôi nhóm bếp…", không có sự việc nối tiếp, chỉ có hồi tưởng và '
    + 'cảm xúc ⇒ tản văn hoặc tuỳ bút, phương thức biểu đạt chính là biểu cảm.',
  bay: 'Thể loại và phương thức biểu đạt là HAI câu hỏi khác nhau. Một truyện ngắn có thể loại là truyện ngắn nhưng '
     + 'phương thức biểu đạt chính là tự sự. Trả lời nhầm ô là mất trọn 0,5 điểm.' },

{ nhom: 'A. Đọc hiểu', cd: 'Thể loại', ten: 'Sáu phương thức biểu đạt — nhận ra bằng động từ trung tâm', cap: 1,
  ct: '<b>Tự sự</b> — kể lại chuỗi sự việc. Động từ trung tâm: kể, xảy ra, rồi, sau đó. Có nhân vật và diễn biến.<br>'
    + '<b>Miêu tả</b> — dựng lại hình ảnh cho người đọc thấy. Dày đặc tính từ chỉ màu sắc, âm thanh, hình khối.<br>'
    + '<b>Biểu cảm</b> — bộc lộ tình cảm. Nhiều câu cảm thán, câu hỏi tu từ, đại từ "tôi", "ta".<br>'
    + '<b>Nghị luận</b> — thuyết phục. Có luận điểm, có lí lẽ, có dẫn chứng, có từ nối lập luận (vì vậy, tuy nhiên, trước hết).<br>'
    + '<b>Thuyết minh</b> — cung cấp tri thức khách quan. Có định nghĩa, phân loại, số liệu, quy trình; không có cái tôi.<br>'
    + '<b>Hành chính – công vụ</b> — đơn, biên bản, thông báo, nghị quyết. Có quốc hiệu, số văn bản, nơi nhận.<br>'
    + '<b>Cách trả lời cho chắc điểm:</b> đề hỏi "phương thức biểu đạt CHÍNH" thì chỉ ghi MỘT; hỏi "các phương thức" '
    + 'thì ghi từ hai trở lên, xếp cái chính lên trước.',
  khi: 'Câu 1 hoặc câu 2 phần Đọc hiểu.',
  vd: 'Đoạn văn có nhân vật, có đối thoại, có sự việc nối nhau ⇒ phương thức chính là tự sự, kèm miêu tả và biểu cảm.',
  bay: 'Thơ trữ tình thì phương thức chính là BIỂU CẢM chứ không phải miêu tả, dù bài có tả cảnh. Cảnh trong thơ trữ '
     + 'tình là để chở tình, tả chỉ là phương tiện.' },

{ nhom: 'A. Đọc hiểu', cd: 'Thể loại', ten: 'Ngôi kể và điểm nhìn — hai thứ đề hay hỏi mà dễ nhầm', cap: 2,
  ct: '<b>Ngôi kể</b> — người kể tự xưng thế nào:<br>'
    + '&nbsp;&nbsp;<b>Ngôi thứ nhất:</b> người kể xưng "tôi", "tớ", "chúng tôi" và có mặt trong truyện.<br>'
    + '&nbsp;&nbsp;<b>Ngôi thứ ba:</b> người kể đứng ngoài, gọi nhân vật bằng tên hoặc "hắn", "nàng", "ông ấy".<br>'
    + '<b>Điểm nhìn</b> — câu chuyện được nhìn qua mắt AI:<br>'
    + '&nbsp;&nbsp;<b>Điểm nhìn bên ngoài:</b> chỉ thuật hành động và lời nói, không vào được ý nghĩ ai.<br>'
    + '&nbsp;&nbsp;<b>Điểm nhìn bên trong:</b> biết ý nghĩ, cảm giác của một nhân vật.<br>'
    + '&nbsp;&nbsp;<b>Điểm nhìn toàn tri:</b> biết hết mọi nhân vật, mọi nơi, mọi lúc.<br>'
    + '<b>Tác dụng thường gặp</b> — dùng luôn mấy ý này khi đề hỏi "nêu tác dụng":<br>'
    + '&nbsp;&nbsp;ngôi thứ nhất ⇒ tăng độ tin cậy, tạo cảm giác thân mật, bộc lộ nội tâm trực tiếp; nhưng bị giới hạn '
    + 'ở những gì "tôi" biết.<br>'
    + '&nbsp;&nbsp;ngôi thứ ba toàn tri ⇒ bao quát được nhiều tuyến, khách quan hơn, dựng được bức tranh rộng.<br>'
    + '<b>Dịch chuyển điểm nhìn</b> là khi truyện kể ngôi ba nhưng có đoạn chui hẳn vào ý nghĩ một nhân vật — đây là '
    + 'chi tiết đắt, nêu ra là được điểm sáng tạo.',
  khi: 'Câu hỏi "xác định ngôi kể", "nhận xét điểm nhìn", và câu phân tích nhân vật.',
  vd: 'Truyện gọi nhân vật là "ông Tần", "thằng Sáu" ⇒ ngôi thứ ba; nhưng có câu cho biết thằng Sáu "chán" ⇒ '
    + 'điểm nhìn đã dịch vào bên trong nhân vật.',
  bay: 'Ngôi kể và điểm nhìn KHÔNG phải một. Truyện kể ngôi thứ ba vẫn có thể mang điểm nhìn bên trong của một nhân '
     + 'vật — trả lời gộp hai khái niệm là mất ý.' },

{ nhom: 'A. Đọc hiểu', cd: 'Thể loại', ten: 'Nhận diện thơ trung đại và thơ hiện đại', cap: 2,
  ct: '<b>Dấu hiệu thơ trung đại</b> (từ thế kỷ X đến hết thế kỷ XIX):<br>'
    + '&nbsp;&nbsp;· thể Đường luật hoặc lục bát, song thất lục bát — khuôn rất chặt;<br>'
    + '&nbsp;&nbsp;· nhiều từ Hán Việt, điển cố, ước lệ (tùng – cúc – trúc – mai, ngư – tiều – canh – mục);<br>'
    + '&nbsp;&nbsp;· cái tôi ẩn đi, nói chí, tỏ lòng, gửi gắm đạo lí;<br>'
    + '&nbsp;&nbsp;· thiên nhiên mang tính tượng trưng cho phẩm chất con người.<br>'
    + '<b>Dấu hiệu thơ hiện đại</b> (từ đầu thế kỷ XX):<br>'
    + '&nbsp;&nbsp;· thể tự do hoặc số chữ đều nhưng không theo niêm luật;<br>'
    + '&nbsp;&nbsp;· từ ngữ đời thường, hình ảnh cụ thể, cá biệt;<br>'
    + '&nbsp;&nbsp;· cái tôi hiện rõ, xưng "tôi", nói cảm xúc riêng;<br>'
    + '&nbsp;&nbsp;· có thể vắt dòng, xuống dòng bất thường, dùng dấu câu để tạo nhịp.<br>'
    + '<b>Chú ý:</b> lục bát có ở CẢ hai thời kỳ, nên thấy lục bát thì phải xét thêm từ ngữ và cái tôi mới kết luận được.',
  khi: 'Câu hỏi về đặc điểm ngôn ngữ, về cái tôi trữ tình, và khi cần đặt bài thơ vào đúng bối cảnh để phân tích.',
  vd: 'Bài thơ lục bát nhưng dùng từ "xe máy", "điện thoại", xưng "tôi" và kể chuyện riêng ⇒ thơ hiện đại viết theo '
    + 'thể lục bát, không phải thơ trung đại.',
  bay: 'Không suy ra thời kỳ chỉ từ THỂ THƠ. Người hiện đại vẫn làm Đường luật, và ngược lại thơ trung đại cũng có '
     + 'bài rất đời thường. Phải xét cả ngôn ngữ lẫn cách bộc lộ cái tôi.' },

{ nhom: 'B. Cấu trúc đề', cd: 'Cấu trúc đề', ten: 'Phần Viết đã ĐẢO giữa hai năm — phải luyện cả hai chiều', cap: 1,
  ct: '<b>Đề 2025:</b><br>'
    + '&nbsp;&nbsp;Câu 1 — viết <b>ĐOẠN</b> nghị luận <b>VĂN HỌC</b>, khoảng 200 chữ, <b>2,0 điểm</b><br>'
    + '&nbsp;&nbsp;Câu 2 — viết <b>BÀI</b> nghị luận <b>XÃ HỘI</b>, khoảng 600 chữ, <b>4,0 điểm</b><br>'
    + '<b>Đề 2026 thì ngược lại:</b><br>'
    + '&nbsp;&nbsp;Câu 1 — viết <b>ĐOẠN</b> nghị luận <b>XÃ HỘI</b>, khoảng 200 chữ, <b>2,0 điểm</b><br>'
    + '&nbsp;&nbsp;Câu 2 — viết <b>BÀI</b> nghị luận <b>VĂN HỌC</b>, khoảng 600 chữ, <b>4,0 điểm</b><br>'
    + '<b>Phần Đọc hiểu không đổi:</b> 4,0 điểm, 5 câu, ngữ liệu hoàn toàn ngoài sách giáo khoa.<br>'
    + '<b>Hệ quả phải nhớ:</b> vào phòng thi ĐỌC KỸ lệnh đề trước khi viết. Nhìn thấy "Câu 1" mà tưởng chắc chắn là '
    + 'văn học rồi lao vào phân tích tác phẩm, trong khi đề hỏi xã hội, là mất trọn 2,0 điểm.<br>'
    + '<b>Ba thứ phải nhận ra ngay ở lệnh đề:</b><br>'
    + '&nbsp;&nbsp;① <b>ĐOẠN</b> hay <b>BÀI</b> — đoạn thì viết liền một khối, không xuống dòng; bài thì phải tách rõ mở, thân, kết.<br>'
    + '&nbsp;&nbsp;② <b>200</b> hay <b>600</b> chữ — lệch quá hai mươi phần trăm là mất điểm hình thức.<br>'
    + '&nbsp;&nbsp;③ hỏi về <b>tác phẩm</b> (văn học) hay về <b>đời sống</b> (xã hội).',
  khi: 'Đọc trước khi bước vào phòng thi, và mỗi lần bắt đầu một đề luyện.',
  vd: 'Đề 2026 lấy bài thơ làm ngữ liệu cho câu 4 điểm, còn câu 2 điểm hỏi làm thế nào để có những Steve Jobs Việt Nam — '
    + 'đúng kiểu đảo so với năm trước.',
  bay: 'Đừng học tủ một bố cục. Không có gì bảo đảm năm sau giữ nguyên kiểu của năm nay — hai năm đầu tiên đã đảo một '
     + 'lần rồi. Trong app này đề luân phiên cả hai bố cục để không quen tay một kiểu.' },

{ nhom: 'B. Cấu trúc đề', cd: 'Cấu trúc đề', ten: 'Năm dạng lệnh đề nghị luận xã hội — mỗi dạng một khung khác', cap: 2,
  ct: 'Nhầm dạng là lạc khung, mất phần lớn điểm triển khai. Nhận dạng bằng chính chữ trong lệnh đề:<br>'
    + '<b>① "trình bày suy nghĩ về ý kiến…"</b> → <b>tư tưởng, đạo lí</b>.<br>'
    + '&nbsp;&nbsp;Khung: giải thích → vì sao đúng (lí lẽ + dẫn chứng) → phản đề → bài học.<br>'
    + '<b>② "trình bày suy nghĩ về hiện tượng…"</b> → <b>hiện tượng đời sống</b>.<br>'
    + '&nbsp;&nbsp;Khung: thực trạng → nguyên nhân (chủ quan và khách quan) → hậu quả hoặc ý nghĩa → giải pháp theo từng chủ thể.<br>'
    + '<b>③ "làm thế nào để…?"</b> → <b>câu hỏi giải pháp</b>.<br>'
    + '&nbsp;&nbsp;Khung: chỉ ra GỐC RỄ trước đã (vì sao chưa làm được), rồi mới nhóm giải pháp. Bỏ bước gốc rễ là kê đơn suông.<br>'
    + '<b>④ "anh/chị có đồng tình… không?"</b> → <b>bày tỏ quan điểm</b>.<br>'
    + '&nbsp;&nbsp;Khung: nói lập trường NGAY ở mở bài → lí giải → đối thoại với ý kiến trái chiều → giới hạn của chính mình.<br>'
    + '<b>⑤ "từ nội dung văn bản ở phần Đọc hiểu…"</b> → <b>tích hợp</b>.<br>'
    + '&nbsp;&nbsp;Khung: bắt buộc nhắc một chi tiết của ngữ liệu làm điểm tựa, nhưng DẪN CHỨNG phải lấy ngoài văn bản.<br>'
    + '<b>Chung cho mọi dạng:</b> phần triển khai chiếm 1,0 điểm ở đoạn và 2,5 điểm ở bài — đó là chỗ nặng nhất, phải có '
    + 'dẫn chứng cụ thể chứ không nói chay.',
  khi: 'Ngay khi đọc lệnh đề câu nghị luận xã hội, trước khi đặt bút.',
  vd: 'Lệnh đề có chữ "làm thế nào" mà viết theo khung tư tưởng đạo lí thì cả bài đi giải thích khái niệm, '
    + 'không đưa ra giải pháp nào — mất gần hết điểm triển khai.',
  bay: 'Dạng ④ hay bị viết một chiều: chỉ khen ý kiến mà không hề nhắc tới phía đối lập. Thiếu phần đối thoại là '
     + 'gần như không có điểm sáng tạo (0,25 ở đoạn, 0,5 ở bài).' },

{ nhom: 'B. Cấu trúc đề', cd: 'Cấu trúc đề', ten: 'Năm dạng lệnh đề nghị luận văn học', cap: 2,
  ct: '<b>① Phân tích, đánh giá chủ đề và nét đặc sắc nghệ thuật</b> — dạng phổ biến nhất, hỏi cả bài.<br>'
    + '&nbsp;&nbsp;Khung: gọi tên chủ đề bằng một câu → phân tích theo mạch văn bản → nghệ thuật theo đặc trưng thể loại → đánh giá.<br>'
    + '<b>② Phân tích nhân vật</b> — chỉ ra với ngữ liệu truyện.<br>'
    + '&nbsp;&nbsp;Khung: hoàn cảnh → tính cách qua hành động, lời nói, quan hệ → chi tiết đắt nhất → nghệ thuật xây dựng → ý nghĩa.<br>'
    + '<b>③ Phân tích một hình ảnh, hình tượng</b>.<br>'
    + '&nbsp;&nbsp;Khung: nghĩa thực → nghĩa biểu tượng → SỰ VẬN ĐỘNG của hình ảnh từ đầu tới cuối → đóng góp vào chủ đề.<br>'
    + '<b>④ Phân tích đặc sắc nghệ thuật</b>.<br>'
    + '&nbsp;&nbsp;Khung: đi từng phương diện, mỗi phương diện một dẫn chứng và một câu chỉ ra TÁC DỤNG.<br>'
    + '<b>⑤ Phân tích thông điệp</b>.<br>'
    + '&nbsp;&nbsp;Khung: gọi tên thông điệp → CĂN CỨ rút ra từ chi tiết nào → cách tác giả gửi gắm → giá trị hôm nay.<br>'
    + '<b>Điều bắt buộc ở mọi dạng:</b> phải trích dẫn chứng từ chính ngữ liệu. Viết chung chung về "tình yêu quê hương" '
    + 'mà không dẫn được một câu nào trong bài là bài lạc, chấm rất thấp.',
  khi: 'Ngay khi đọc lệnh đề câu nghị luận văn học.',
  vd: 'Đề bảo "phân tích một hình ảnh giàu ý nghĩa" mà viết cả bài phân tích toàn tác phẩm thì lạc yêu cầu, '
    + 'mất điểm xác định vấn đề.',
  bay: 'Dạng ④ rất hay bị viết thành bản LIỆT KÊ biện pháp tu từ. Kể tên mười biện pháp mà không câu nào nói "để làm gì" '
     + 'thì vẫn không có điểm — người chấm tính điểm ở chỗ phân tích tác dụng.' }

]);
})();
