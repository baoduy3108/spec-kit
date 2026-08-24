/* ============================================================
   NGỮ VĂN — BÙ CÁC THỂ LOẠI MỚI CỦA SGK 12 (CT 2018)
   Ngữ liệu đọc hiểu lấy hoàn toàn NGOÀI sách giáo khoa, nhưng THỂ LOẠI
   thì vẫn nằm trong danh mục chương trình. Kho cũ thiếu hẳn bốn thể loại
   mà cả ba bộ sách lớp 12 đều dạy: truyện truyền kì · hài kịch · văn tế ·
   tuỳ bút. Không nhận ra thể loại là hỏng ngay câu đầu phần Đọc hiểu.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {}; TD.KHO_LT = TD.KHO_LT || {}; TD.GEN = TD.GEN || {};

(function () {
const CD = 'Thể loại';

TD.KHO.van_ct = (TD.KHO.van_ct || []).concat([

{ nhom: 'Đọc hiểu', cd: CD, ten: 'Bốn thể loại của SGK 12 mà đề hay lấy ngữ liệu', cap: 2,
  ct: '<b>① TRUYỆN TRUYỀN KÌ</b><br>'
    + '&nbsp;&nbsp;Dấu hiệu: có yếu tố <b>KÌ ẢO</b> (thần tiên, ma quỷ, hoá thân, báo mộng) đan xen với chuyện đời thực.<br>'
    + '&nbsp;&nbsp;Cốt truyện thường theo trục: gặp nạn → yếu tố kì ảo can thiệp → kết thúc có tính răn dạy.<br>'
    + '&nbsp;&nbsp;Chức năng của cái kì ảo: KHÔNG phải để doạ, mà để nói điều hiện thực không nói thẳng được — '
    + 'phê phán bất công, bênh vực người yếu thế.<br>'
    + '&nbsp;&nbsp;Khi phân tích phải chỉ ra: yếu tố kì ảo là gì · nó xuất hiện lúc nào · nó phục vụ ý nghĩa nào.<br>'
    + '<b>② HÀI KỊCH</b><br>'
    + '&nbsp;&nbsp;Dấu hiệu: viết bằng LỜI THOẠI, có chỉ dẫn sân khấu đặt trong ngoặc đơn.<br>'
    + '&nbsp;&nbsp;Cốt lõi là <b>XUNG ĐỘT giữa cái đáng cười với chuẩn mực</b>: nhân vật tự cho mình là gì đó '
    + 'mà thực chất không phải.<br>'
    + '&nbsp;&nbsp;Thủ pháp gây cười: phóng đại · tương phản giữa lời nói và hành động · hiểu lầm · lặp lại.<br>'
    + '&nbsp;&nbsp;Mục đích: cười để SỬA, nên bao giờ cũng có ý phê phán một thói tật xã hội.<br>'
    + '<b>③ VĂN TẾ</b><br>'
    + '&nbsp;&nbsp;Là bài văn đọc khi tế người đã mất, viết theo lối biền ngẫu, có vần và đối.<br>'
    + '&nbsp;&nbsp;Bố cục bốn phần: <b>Lung khởi</b> (mở đầu khái quát lẽ sống chết) → <b>Thích thực</b> '
    + '(kể lại cuộc đời, công đức người mất) → <b>Ai vãn</b> (bày tỏ niềm thương tiếc) → '
    + '<b>Kết</b> (lời cầu nguyện, khẳng định).<br>'
    + '&nbsp;&nbsp;Giọng điệu: bi tráng — vừa xót thương vừa ngợi ca.<br>'
    + '<b>④ TUỲ BÚT và TẢN VĂN</b><br>'
    + '&nbsp;&nbsp;Đều thuộc loại KÍ, ghi chép người thật việc thật nhưng đậm chất trữ tình.<br>'
    + '&nbsp;&nbsp;Tuỳ bút: mạch theo <b>CẢM XÚC</b> của cái tôi tác giả, tự do liên tưởng, ngôn ngữ giàu hình ảnh.<br>'
    + '&nbsp;&nbsp;Tản văn: ngắn hơn, bám vào một sự việc hoặc một đối tượng cụ thể rồi bàn rộng ra.<br>'
    + '&nbsp;&nbsp;Cả hai đều KHÔNG có cốt truyện hoàn chỉnh — đó là dấu hiệu phân biệt với truyện ngắn.',
  khi: 'Câu đầu phần Đọc hiểu gần như luôn hỏi thể loại hoặc đặc điểm thể loại.',
  vd: 'Ngữ liệu có lời thoại kèm chỉ dẫn "(cười khẩy, quay sang khán giả)" ⇒ hài kịch, không phải truyện ngắn.',
  bay: 'Có yếu tố kì ảo CHƯA CHẮC là truyện truyền kì — truyện ngắn hiện đại cũng dùng. Phải xem cái kì ảo có '
     + 'đóng vai trò chuyển hướng số phận nhân vật và mang ý răn dạy hay không.' },

{ nhom: 'Đọc hiểu', cd: CD, ten: 'Ba loại văn bản của đề và cách soi mỗi loại', cap: 1,
  ct: 'Đề chỉ lấy ngữ liệu thuộc <b>ba loại</b>, nhận ra loại nào là biết ngay phải soi cái gì.<br>'
    + '<b>① VĂN BẢN VĂN HỌC</b> (thơ, truyện, kí, kịch)<br>'
    + '&nbsp;&nbsp;Soi: nhân vật · tình huống · hình ảnh · biện pháp tu từ · giọng điệu · thông điệp.<br>'
    + '&nbsp;&nbsp;Với thơ soi thêm: thể thơ, vần, nhịp, chủ thể trữ tình.<br>'
    + '<b>② VĂN BẢN NGHỊ LUẬN</b><br>'
    + '&nbsp;&nbsp;Soi: <b>luận đề</b> (vấn đề bàn) → <b>luận điểm</b> (các ý lớn) → <b>lí lẽ</b> → <b>bằng chứng</b>.<br>'
    + '&nbsp;&nbsp;Hay hỏi: mục đích của tác giả · cách lập luận (diễn dịch, quy nạp, tổng – phân – hợp) · '
    + 'yếu tố biểu cảm dùng để làm gì.<br>'
    + '<b>③ VĂN BẢN THÔNG TIN</b><br>'
    + '&nbsp;&nbsp;Soi: cách trình bày (theo trình tự thời gian, theo quan hệ nhân quả, theo mức độ quan trọng) · '
    + 'phương tiện phi ngôn ngữ (sơ đồ, bảng, số liệu, ảnh) · tính chính xác và khách quan của dữ liệu.<br>'
    + '&nbsp;&nbsp;Hay hỏi: số liệu trong bài có tác dụng gì · nhan đề và sa-pô cho biết điều gì.<br>'
    + '<b>Ba câu hỏi luôn xuất hiện dù là loại nào:</b> ① xác định thể loại hoặc phương thức biểu đạt · '
    + '② tìm chi tiết có sẵn trong văn bản · ③ nêu tác dụng của một yếu tố ngôn ngữ.',
  khi: 'Ngay khi đọc dòng đầu ngữ liệu — nhận loại rồi mới đọc kỹ.',
  vd: 'Ngữ liệu 2026 là văn bản THÔNG TIN về quyền lực công nghệ, nên câu hỏi xoay quanh số liệu và cách trình bày '
    + 'chứ không hỏi hình ảnh thơ.',
  bay: 'Văn bản thông tin vẫn có thể dùng biện pháp tu từ, nhưng đừng phân tích nó như văn bản văn học — '
     + 'phải trả lời theo hướng "giúp thông tin dễ hiểu, tăng sức thuyết phục".' }

]);

TD.KHO_LT.van = (TD.KHO_LT.van || []).concat([
{ cd: CD, m: 2, a: true,  t: 'Yếu tố kì ảo trong truyện truyền kì thường dùng để phản ánh hiện thực và gửi gắm thái độ của tác giả.', v: 'Cái kì ảo là phương tiện nói điều hiện thực không nói thẳng được.' },
{ cd: CD, m: 2, a: false, t: 'Truyện truyền kì chỉ nhằm mục đích gây sợ hãi cho người đọc.', v: 'Mục đích chính là phê phán bất công và bênh vực người yếu thế thông qua yếu tố kì ảo.' },
{ cd: CD, m: 1, a: true,  t: 'Hài kịch được viết chủ yếu bằng lời thoại kèm chỉ dẫn sân khấu.', v: 'Đây là dấu hiệu hình thức để nhận ra kịch ngay từ cái nhìn đầu tiên.' },
{ cd: CD, m: 2, a: true,  t: 'Xung đột trong hài kịch nảy sinh giữa cái đáng cười và chuẩn mực xã hội.', v: 'Nhân vật tự cho mình là gì đó mà thực chất không phải — mâu thuẫn đó tạo tiếng cười.' },
{ cd: CD, m: 2, a: true,  t: 'Bố cục bài văn tế gồm bốn phần: lung khởi, thích thực, ai vãn và kết.', v: 'Đây là bố cục cố định của thể văn tế.' },
{ cd: CD, m: 2, a: false, t: 'Văn tế là thể loại viết để ca ngợi người đang sống.', v: 'Văn tế đọc trong lễ tế NGƯỜI ĐÃ MẤT, giọng bi tráng.' },
{ cd: CD, m: 2, a: true,  t: 'Tuỳ bút triển khai theo mạch cảm xúc của cái tôi tác giả chứ không theo cốt truyện.', v: 'Đó là điểm phân biệt tuỳ bút với truyện ngắn.' },
{ cd: CD, m: 2, a: false, t: 'Tuỳ bút bắt buộc phải có cốt truyện hoàn chỉnh với mở đầu, cao trào và kết thúc.', v: 'Tuỳ bút KHÔNG có cốt truyện hoàn chỉnh; nó đi theo mạch cảm xúc và liên tưởng.' },
{ cd: CD, m: 1, a: true,  t: 'Ngữ liệu đọc hiểu của đề tốt nghiệp được lấy hoàn toàn ngoài sách giáo khoa.', v: 'Nhằm triệt tiêu học tủ và văn mẫu; nhưng THỂ LOẠI vẫn nằm trong chương trình.' },
{ cd: CD, m: 2, a: true,  t: 'Văn bản thông tin thường dùng phương tiện phi ngôn ngữ như sơ đồ, bảng, số liệu.', v: 'Chúng làm thông tin trực quan và tăng độ tin cậy.' },
{ cd: CD, m: 2, a: true,  t: 'Khi đọc văn bản nghị luận cần xác định luận đề, luận điểm, lí lẽ và bằng chứng.', v: 'Đó là bốn thành tố của một văn bản nghị luận.' }
]);

TD.GEN.van = (TD.GEN.van || []).concat([
{ ma: 'van-theloai-moi', chuong: 'Thể loại', muc: 2, dang: 'mc',
  tao(R) {
    const ds = [
    { q: 'Một ngữ liệu có lời thoại nhân vật kèm chỉ dẫn đặt trong ngoặc đơn như "(cười khẩy, quay sang khán giả)". Ngữ liệu đó nhiều khả năng thuộc thể loại nào?',
      d: 'Hài kịch', s: ['Truyện ngắn', 'Tuỳ bút', 'Văn tế'],
      v: 'Lời thoại kèm CHỈ DẪN SÂN KHẤU là dấu hiệu hình thức của kịch; chi tiết "quay sang khán giả" và giọng giễu cho biết là hài kịch.' },
    { q: 'Phần "ai vãn" trong bài văn tế có nội dung gì?',
      d: 'Bày tỏ niềm thương tiếc đối với người đã mất',
      s: ['Khái quát lẽ sống chết ở đời', 'Kể lại cuộc đời và công đức người mất', 'Lời cầu nguyện kết thúc'],
      v: 'Bố cục văn tế: lung khởi (khái quát) – thích thực (kể công đức) – ai vãn (thương tiếc) – kết (cầu nguyện).' },
    { q: 'Đặc điểm nào KHÔNG phải của tuỳ bút?',
      d: 'Có cốt truyện hoàn chỉnh với cao trào và kết thúc',
      s: ['Triển khai theo mạch cảm xúc của tác giả', 'Ghi chép người thật việc thật', 'Ngôn ngữ giàu hình ảnh, đậm chất trữ tình'],
      v: 'Tuỳ bút không có cốt truyện hoàn chỉnh — đó chính là điểm phân biệt với truyện ngắn.' },
    { q: 'Yếu tố kì ảo trong truyện truyền kì chủ yếu có tác dụng gì?',
      d: 'Phản ánh hiện thực và gửi gắm thái độ của tác giả',
      s: ['Chỉ để gây sợ hãi cho người đọc', 'Làm cho câu chuyện dài thêm', 'Thay thế cho việc xây dựng nhân vật'],
      v: 'Cái kì ảo là phương tiện nói điều mà hiện thực không cho phép nói thẳng: phê phán bất công, bênh vực người yếu.' },
    { q: 'Với một văn bản THÔNG TIN, câu hỏi đọc hiểu thường xoay quanh điều gì?',
      d: 'Cách trình bày thông tin và tác dụng của số liệu, sơ đồ',
      s: ['Hình ảnh thơ và nhịp điệu', 'Diễn biến tâm lí nhân vật', 'Xung đột kịch giữa các tuyến nhân vật'],
      v: 'Văn bản thông tin được soi ở cách tổ chức thông tin và các phương tiện phi ngôn ngữ.' },
    { q: 'Bốn thành tố cần xác định khi đọc một văn bản nghị luận là',
      d: 'luận đề, luận điểm, lí lẽ, bằng chứng',
      s: ['nhân vật, tình huống, cốt truyện, chủ đề', 'vần, nhịp, hình ảnh, giọng điệu',
          'sa-pô, tiêu đề, sơ đồ, chú thích'],
      v: 'Luận đề là vấn đề bàn; luận điểm là các ý lớn; lí lẽ và bằng chứng làm sáng tỏ luận điểm.' }];
    const it = R.chon(ds);
    const opts = TD.xaoR(R, [it.d].concat(it.s));
    return { q: it.q, opts: opts, ans: opts.indexOf(it.d), giai: `Đáp án: ${it.d}\n${it.v}`,
      meo: 'Câu số 1 phần Đọc hiểu gần như luôn hỏi thể loại hoặc phương thức biểu đạt — đó là điểm cho không, '
        + 'miễn là thuộc dấu hiệu hình thức của từng thể loại.' };
  } }
]);
})();
