/* ============================================================
   SINH HỌC — BÙ BỐN MẢNG CÒN THIẾU HẲN SO VỚI SGK 12 (CT 2018)
   Dò lại mục lục Sinh học 12 chương trình mới thì kho đang trống bốn chỗ:
     ① Bằng chứng tiến hoá (giải phẫu so sánh, tế bào học, sinh học phân tử)
     ② Chu trình sinh địa hoá và sinh quyển
     ③ Sinh thái phục hồi và bảo tồn
     ④ Chọn – tạo giống, ưu thế lai
   Cả bốn đều nằm trong yêu cầu cần đạt của chương trình nên đề ra được.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {}; TD.KHO_LT = TD.KHO_LT || {}; TD.GEN = TD.GEN || {};

(function () {

TD.KHO.sinh_ct = (TD.KHO.sinh_ct || []).concat([

{ nhom: 'Tiến hoá', cd: 'Tiến hoá', ten: 'Bằng chứng tiến hoá — bốn loại và cách phân biệt', cap: 2,
  ct: '<b>① BẰNG CHỨNG GIẢI PHẪU SO SÁNH</b> — mạnh nhất trong đề.<br>'
    + '&nbsp;&nbsp;<b>Cơ quan TƯƠNG ĐỒNG:</b> cùng NGUỒN GỐC, có thể khác chức năng. '
    + 'Ví dụ: chi trước của mèo, cánh dơi, vây cá voi, tay người. Chứng minh tiến hoá PHÂN LI.<br>'
    + '&nbsp;&nbsp;<b>Cơ quan TƯƠNG TỰ:</b> khác nguồn gốc, cùng CHỨC NĂNG. '
    + 'Ví dụ: cánh sâu bọ với cánh dơi; mang cá với mang tôm. Chứng minh tiến hoá ĐỒNG QUY.<br>'
    + '&nbsp;&nbsp;<b>Cơ quan THOÁI HOÁ:</b> là cơ quan tương đồng đã tiêu giảm. '
    + 'Ví dụ: ruột thừa và xương cụt ở người, di tích chi sau ở trăn.<br>'
    + '<b>② BẰNG CHỨNG TẾ BÀO HỌC</b> — mọi sinh vật đều cấu tạo từ tế bào, tế bào chỉ sinh ra từ tế bào có trước.<br>'
    + '<b>③ BẰNG CHỨNG SINH HỌC PHÂN TỬ</b> — <b>bằng chứng THUYẾT PHỤC nhất</b>: mọi loài đều dùng chung '
    + 'DNA, chung bộ mã di truyền, chung 20 loại amino acid. Loài càng gần nhau thì trình tự nucleotide và '
    + 'trình tự amino acid càng giống nhau — đây là cơ sở để dựng cây phát sinh chủng loại.<br>'
    + '<b>④ BẰNG CHỨNG HOÁ THẠCH</b> — cho biết TUỔI và trình tự xuất hiện của các nhóm loài; xác định bằng '
    + 'đồng vị phóng xạ (carbon-14 cho mẫu vài chục nghìn năm, uranium-238 cho mẫu hàng trăm triệu năm).',
  khi: 'Câu nhận biết và thông hiểu ở đầu phần Tiến hoá; cũng hay thành một ý trong câu Đúng/Sai.',
  vd: 'Cánh dơi và tay người là cơ quan TƯƠNG ĐỒNG (cùng nguồn gốc chi trước); cánh dơi và cánh bướm là '
    + 'cơ quan TƯƠNG TỰ (khác nguồn gốc, cùng chức năng bay).',
  bay: 'Tương ĐỒNG là cùng NGUỒN GỐC, tương TỰ là cùng CHỨC NĂNG — hai chữ gần giống nhau nên rất hay bị tráo. '
     + 'Mẹo nhớ: "đồng nguồn, tự việc".' },

{ nhom: 'Sinh thái học', cd: 'Sinh thái học', ten: 'Chu trình sinh địa hoá và sinh quyển', cap: 3,
  ct: '<b>Chu trình sinh địa hoá</b> là vòng tuần hoàn vật chất từ môi trường vào cơ thể sinh vật rồi trở lại '
    + 'môi trường. Khác với dòng NĂNG LƯỢNG chỉ đi một chiều và mất dần, vật chất được TÁI SỬ DỤNG.<br>'
    + '<b>CHU TRÌNH CARBON</b><br>'
    + '&nbsp;&nbsp;Vào: thực vật lấy CO₂ qua QUANG HỢP. Ra: hô hấp của sinh vật, phân giải xác, cháy rừng, '
    + 'đốt nhiên liệu hoá thạch.<br>'
    + '&nbsp;&nbsp;Một phần carbon lắng đọng thành than đá, dầu mỏ, đá vôi — bị rút khỏi vòng tuần hoàn lâu dài.<br>'
    + '<b>CHU TRÌNH NITƠ</b><br>'
    + '&nbsp;&nbsp;N₂ trong khí quyển chiếm 78% nhưng thực vật KHÔNG dùng trực tiếp được.<br>'
    + '&nbsp;&nbsp;Cố định đạm: vi khuẩn Rhizobium cộng sinh ở nốt sần cây họ Đậu, vi khuẩn lam, và sấm sét.<br>'
    + '&nbsp;&nbsp;Amôn hoá → nitrat hoá → thực vật hấp thụ NH₄⁺ và NO₃⁻ → phản nitrat hoá trả N₂ về khí quyển.<br>'
    + '<b>CHU TRÌNH NƯỚC</b> — bốc hơi, ngưng tụ, mưa, dòng chảy; điều hoà khí hậu và là dung môi của mọi phản ứng sống.<br>'
    + '<b>SINH QUYỂN</b> là toàn bộ sinh vật cùng môi trường sống của chúng, gồm phần dưới khí quyển, '
    + 'toàn bộ thuỷ quyển và phần trên thạch quyển. Chia thành các khu sinh học (biome) trên cạn và dưới nước.',
  khi: 'Câu vận dụng về hệ sinh thái, và câu hỏi vì sao trồng cây họ Đậu lại cải tạo được đất.',
  vd: 'Trồng xen cây họ Đậu làm giàu đạm cho đất nhờ vi khuẩn Rhizobium ở nốt sần cố định N₂ thành dạng cây dùng được.',
  bay: 'Vật chất TUẦN HOÀN còn năng lượng thì KHÔNG — năng lượng đi một chiều từ ánh sáng qua các bậc dinh dưỡng '
     + 'rồi thoát ra dạng nhiệt. Câu Đúng/Sai rất hay hỏi ngược chỗ này.' },

{ nhom: 'Sinh thái học', cd: 'Sinh thái học', ten: 'Sinh thái phục hồi và bảo tồn', cap: 2,
  ct: '<b>SINH THÁI PHỤC HỒI</b> là dùng hiểu biết sinh thái để đưa một hệ sinh thái đã suy thoái trở lại '
    + 'gần với trạng thái ban đầu.<br>'
    + '&nbsp;&nbsp;Ba cách làm: <b>phục hồi tự nhiên</b> (khoanh nuôi, để hệ tự diễn thế) · '
    + '<b>phục hồi có hỗ trợ</b> (trồng bổ sung loài bản địa, cải tạo đất) · '
    + '<b>tái tạo hoàn toàn</b> khi hệ đã mất hẳn.<br>'
    + '&nbsp;&nbsp;Nguyên tắc: ưu tiên LOÀI BẢN ĐỊA, khôi phục cả cấu trúc lẫn chức năng, có giám sát lâu dài.<br>'
    + '<b>BẢO TỒN ĐA DẠNG SINH HỌC</b><br>'
    + '&nbsp;&nbsp;<b>Bảo tồn NGUYÊN VỊ (in situ):</b> giữ loài ngay trong môi trường sống tự nhiên — '
    + 'vườn quốc gia, khu bảo tồn thiên nhiên, khu dự trữ sinh quyển. Đây là cách hiệu quả nhất.<br>'
    + '&nbsp;&nbsp;<b>Bảo tồn CHUYỂN VỊ (ex situ):</b> đưa ra khỏi nơi sống tự nhiên — vườn thú, vườn thực vật, '
    + 'ngân hàng hạt giống, ngân hàng gene. Dùng khi loài đã quá nguy cấp.<br>'
    + '<b>Nguyên nhân suy giảm đa dạng sinh học:</b> mất và chia cắt nơi sống · khai thác quá mức · '
    + 'ô nhiễm · loài ngoại lai xâm hại · biến đổi khí hậu.',
  khi: 'Câu vận dụng cuối phần Sinh thái, và câu tình huống về môi trường.',
  vd: 'Trồng lại rừng ngập mặn bằng chính loài đước bản địa là phục hồi CÓ HỖ TRỢ và là bảo tồn NGUYÊN VỊ.',
  bay: 'Vườn quốc gia là bảo tồn NGUYÊN VỊ; vườn thú và ngân hàng hạt giống là CHUYỂN VỊ. '
     + 'Đừng nhớ ngược, và nhớ rằng nguyên vị luôn được ưu tiên hơn.' },

{ nhom: 'Di truyền', cd: 'Công nghệ di truyền', ten: 'Chọn – tạo giống và ưu thế lai', cap: 3,
  ct: '<b>TẠO GIỐNG BẰNG LAI HỮU TÍNH</b><br>'
    + '&nbsp;&nbsp;Tạo dòng thuần bằng tự thụ phấn hoặc giao phối gần qua nhiều thế hệ, rồi lai các dòng thuần '
    + 'khác nhau để chọn tổ hợp gene mong muốn.<br>'
    + '<b>ƯU THẾ LAI</b> — con lai F₁ vượt trội cha mẹ về sức sống, năng suất, khả năng chống chịu.<br>'
    + '&nbsp;&nbsp;<b>Giả thuyết siêu trội</b> giải thích: kiểu gene DỊ HỢP Aa cho ưu thế hơn cả AA lẫn aa.<br>'
    + '&nbsp;&nbsp;Ưu thế lai <b>cao nhất ở F₁ rồi GIẢM DẦN</b> ở các thế hệ sau, vì tỉ lệ dị hợp giảm một nửa mỗi '
    + 'thế hệ khi tự thụ. Nên chỉ dùng F₁ làm giống thương phẩm, không giữ lại làm giống cho vụ sau.<br>'
    + '&nbsp;&nbsp;Phép lai tạo ưu thế lai: lai khác dòng đơn, lai khác dòng kép, lai thuận nghịch.<br>'
    + '<b>TẠO GIỐNG BẰNG GÂY ĐỘT BIẾN</b> — dùng tia phóng xạ, tia tử ngoại, consixin (gây đa bội). '
    + 'Chủ yếu áp dụng cho VI SINH VẬT và THỰC VẬT, rất ít dùng cho động vật vì dễ gây chết.<br>'
    + '<b>CÔNG NGHỆ TẾ BÀO</b> — nuôi cấy mô tế bào cho hàng loạt cây con đồng nhất về kiểu gene; '
    + 'dung hợp tế bào trần tạo cây lai khác loài; nhân bản vô tính và cấy truyền phôi ở động vật.',
  khi: 'Câu vận dụng phần Ứng dụng di truyền học.',
  vd: 'Ngô lai F₁ cho năng suất cao nhưng nông dân phải mua giống mới mỗi vụ, vì đời F₂ ưu thế lai đã giảm rõ.',
  bay: 'Ưu thế lai KHÔNG di truyền ổn định. Và consixin gây ĐA BỘI chứ không gây đột biến gene — '
     + 'hai chuyện khác nhau, đề hay gài.' }

]);

TD.KHO_LT.sinh = (TD.KHO_LT.sinh || []).concat([
{ cd: 'Tiến hoá', m: 2, a: true,  t: 'Cơ quan tương đồng là những cơ quan có cùng nguồn gốc, dù chức năng có thể khác nhau.', v: 'Ví dụ chi trước của mèo, cánh dơi và tay người.' },
{ cd: 'Tiến hoá', m: 2, a: false, t: 'Cơ quan tương tự là những cơ quan có cùng nguồn gốc.', v: 'Cơ quan tương TỰ khác nguồn gốc nhưng cùng CHỨC NĂNG, ví dụ cánh sâu bọ và cánh dơi.' },
{ cd: 'Tiến hoá', m: 2, a: true,  t: 'Cánh dơi và cánh bướm là cơ quan tương tự.', v: 'Khác hẳn nguồn gốc nhưng cùng chức năng bay — bằng chứng của tiến hoá đồng quy.' },
{ cd: 'Tiến hoá', m: 2, a: true,  t: 'Ruột thừa ở người là một cơ quan thoái hoá.', v: 'Là di tích của manh tràng phát triển ở tổ tiên ăn thực vật.' },
{ cd: 'Tiến hoá', m: 3, a: true,  t: 'Bằng chứng sinh học phân tử là bằng chứng thuyết phục nhất về nguồn gốc chung của sinh giới.', v: 'Mọi loài đều dùng chung DNA, chung bộ mã di truyền và chung 20 loại amino acid.' },
{ cd: 'Tiến hoá', m: 3, a: true,  t: 'Hai loài càng có quan hệ họ hàng gần thì trình tự nucleotide của cùng một gene càng giống nhau.', v: 'Đây là cơ sở để dựng cây phát sinh chủng loại bằng dữ liệu phân tử.' },
{ cd: 'Tiến hoá', m: 2, a: false, t: 'Hoá thạch chỉ cho biết hình dạng chứ không cho biết tuổi của sinh vật.', v: 'Tuổi hoá thạch xác định được bằng đồng vị phóng xạ như carbon-14 hay uranium-238.' },
{ cd: 'Sinh thái học', m: 3, a: true,  t: 'Trong hệ sinh thái, vật chất được tuần hoàn còn năng lượng thì không.', v: 'Năng lượng đi một chiều từ ánh sáng qua các bậc dinh dưỡng rồi thoát ra dưới dạng nhiệt.' },
{ cd: 'Sinh thái học', m: 3, a: false, t: 'Năng lượng trong hệ sinh thái được tuần hoàn giống như vật chất.', v: 'Năng lượng đi MỘT CHIỀU và hao hụt dần, không quay lại.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Thực vật không sử dụng trực tiếp được khí nitơ tự do trong khí quyển.', v: 'Phải qua cố định đạm thành NH₄⁺ hoặc NO₃⁻ mới hấp thụ được.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Vi khuẩn Rhizobium cộng sinh ở nốt sần cây họ Đậu có khả năng cố định nitơ.', v: 'Vì thế trồng xen cây họ Đậu làm giàu đạm cho đất.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Quang hợp là con đường chính đưa carbon từ khí quyển vào chuỗi thức ăn.', v: 'Thực vật lấy CO₂ tổng hợp chất hữu cơ, mở đầu chu trình carbon trong hệ sinh thái.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Vườn quốc gia là hình thức bảo tồn nguyên vị.', v: 'Loài được giữ ngay trong môi trường sống tự nhiên của nó.' },
{ cd: 'Sinh thái học', m: 2, a: false, t: 'Ngân hàng hạt giống là hình thức bảo tồn nguyên vị.', v: 'Đó là bảo tồn CHUYỂN VỊ, vì hạt được đưa ra khỏi nơi sống tự nhiên.' },
{ cd: 'Sinh thái học', m: 3, a: true,  t: 'Bảo tồn nguyên vị được ưu tiên hơn bảo tồn chuyển vị.', v: 'Giữ được cả loài lẫn mối quan hệ sinh thái và khả năng tiến hoá của nó trong tự nhiên.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Loài ngoại lai xâm hại là một trong các nguyên nhân làm suy giảm đa dạng sinh học.', v: 'Chúng cạnh tranh, ăn thịt hoặc mang mầm bệnh cho loài bản địa.' },
{ cd: 'Công nghệ di truyền', m: 3, a: true,  t: 'Ưu thế lai biểu hiện cao nhất ở đời F₁ rồi giảm dần ở các thế hệ sau.', v: 'Tỉ lệ kiểu gene dị hợp giảm một nửa mỗi thế hệ khi tự thụ phấn.' },
{ cd: 'Công nghệ di truyền', m: 3, a: false, t: 'Ưu thế lai được duy trì ổn định qua nhiều thế hệ nên có thể giữ F₂ làm giống.', v: 'Ưu thế lai GIẢM DẦN, nên chỉ dùng F₁ làm giống thương phẩm.' },
{ cd: 'Công nghệ di truyền', m: 3, a: true,  t: 'Giả thuyết siêu trội giải thích ưu thế lai bằng ưu thế của kiểu gene dị hợp.', v: 'Aa cho sức sống vượt cả AA lẫn aa.' },
{ cd: 'Công nghệ di truyền', m: 2, a: true,  t: 'Consixin gây đột biến đa bội chứ không gây đột biến gene.', v: 'Nó cản trở hình thành thoi phân bào nên nhiễm sắc thể nhân đôi mà không phân li.' },
{ cd: 'Công nghệ di truyền', m: 2, a: true,  t: 'Nuôi cấy mô tế bào tạo ra hàng loạt cây con đồng nhất về kiểu gene.', v: 'Vì đều xuất phát từ cùng một mô của một cây mẹ.' },
{ cd: 'Công nghệ di truyền', m: 2, a: false, t: 'Phương pháp gây đột biến được áp dụng phổ biến cho động vật bậc cao.', v: 'Chủ yếu dùng cho VI SINH VẬT và THỰC VẬT; động vật bậc cao rất dễ chết hoặc bất thụ.' }
]);

TD.GEN.sinh = (TD.GEN.sinh || []).concat([
{ ma: 'sinh-bangchung', chuong: 'Tiến hoá', muc: 2, dang: 'mc',
  tao(R) {
    const ds = [
    { q: 'Cặp cơ quan nào sau đây là cơ quan TƯƠNG ĐỒNG?', d: 'Cánh dơi và tay người',
      s: ['Cánh dơi và cánh bướm', 'Mang cá và mang tôm', 'Gai xương rồng và gai hoa hồng'],
      v: 'Cánh dơi và tay người đều biến đổi từ chi trước của động vật có xương sống ⇒ cùng NGUỒN GỐC.' },
    { q: 'Cặp cơ quan nào sau đây là cơ quan TƯƠNG TỰ?', d: 'Cánh chim và cánh côn trùng',
      s: ['Cánh chim và chi trước của mèo', 'Tay người và vây cá voi', 'Ruột thừa ở người và manh tràng ở thỏ'],
      v: 'Cùng chức năng bay nhưng khác hẳn nguồn gốc phát sinh ⇒ cơ quan TƯƠNG TỰ.' },
    { q: 'Bằng chứng nào sau đây được xem là thuyết phục nhất về nguồn gốc chung của sinh giới?',
      d: 'Bằng chứng sinh học phân tử',
      s: ['Bằng chứng giải phẫu so sánh', 'Bằng chứng hoá thạch', 'Bằng chứng tế bào học'],
      v: 'Mọi loài đều dùng chung DNA, chung bộ mã di truyền và chung 20 loại amino acid.' },
    { q: 'Cơ quan nào sau đây ở người là cơ quan thoái hoá?', d: 'Ruột thừa',
      s: ['Lá lách', 'Tuyến giáp', 'Tuyến tuỵ'],
      v: 'Ruột thừa là di tích của manh tràng phát triển ở tổ tiên ăn thực vật.' },
    { q: 'Sự giống nhau về trình tự amino acid của cùng một loại protein ở hai loài cho phép kết luận',
      d: 'hai loài có quan hệ họ hàng càng gần nếu trình tự càng giống nhau',
      s: ['hai loài có cùng số lượng nhiễm sắc thể', 'hai loài sống trong cùng một môi trường',
          'hai loài có cùng kích thước cơ thể'],
      v: 'Đây chính là nguyên tắc dựng cây phát sinh chủng loại bằng dữ liệu phân tử.' }];
    const it = R.chon(ds);
    const opts = TD.xaoR(R, [it.d].concat(it.s));
    return { q: it.q, opts: opts, ans: opts.indexOf(it.d), giai: `Đáp án: ${it.d}\n${it.v}`,
      meo: 'Tương ĐỒNG là cùng NGUỒN GỐC (phân li) · tương TỰ là cùng CHỨC NĂNG (đồng quy). Nhớ: "đồng nguồn, tự việc".' };
  } },

{ ma: 'sinh-chutrinh', chuong: 'Sinh thái học', muc: 3, dang: 'mc',
  tao(R) {
    const ds = [
    { q: 'Phát biểu nào sau đây đúng về hệ sinh thái?', d: 'Vật chất được tuần hoàn còn năng lượng thì không',
      s: ['Cả vật chất lẫn năng lượng đều được tuần hoàn', 'Năng lượng tuần hoàn còn vật chất thì không',
          'Cả vật chất lẫn năng lượng đều đi một chiều'],
      v: 'Năng lượng đi một chiều và hao hụt dần thành nhiệt; vật chất quay vòng qua chu trình sinh địa hoá.' },
    { q: 'Vì sao trồng xen cây họ Đậu lại làm giàu đạm cho đất?',
      d: 'Vi khuẩn cộng sinh ở nốt sần cố định được nitơ tự do',
      s: ['Rễ cây họ Đậu tiết ra đạm trực tiếp', 'Lá cây họ Đậu hấp thụ nitơ qua khí khổng',
          'Cây họ Đậu hút ít đạm nên đất còn dư'],
      v: 'Vi khuẩn Rhizobium ở nốt sần biến N₂ thành dạng cây hấp thụ được.' },
    { q: 'Con đường chính đưa carbon từ khí quyển vào chuỗi thức ăn là', d: 'quang hợp của sinh vật sản xuất',
      s: ['hô hấp của động vật', 'phân giải xác sinh vật', 'đốt nhiên liệu hoá thạch'],
      v: 'Thực vật lấy CO₂ tổng hợp chất hữu cơ, mở đầu chu trình carbon trong hệ sinh thái.' },
    { q: 'Hình thức nào sau đây thuộc bảo tồn CHUYỂN VỊ?', d: 'Ngân hàng hạt giống',
      s: ['Vườn quốc gia', 'Khu bảo tồn thiên nhiên', 'Khu dự trữ sinh quyển'],
      v: 'Chuyển vị là đưa loài RA KHỎI môi trường sống tự nhiên để bảo quản.' },
    { q: 'Nguyên nhân nào sau đây KHÔNG làm suy giảm đa dạng sinh học?', d: 'Thành lập thêm khu bảo tồn thiên nhiên',
      s: ['Loài ngoại lai xâm hại', 'Mất và chia cắt nơi sống', 'Khai thác quá mức'],
      v: 'Lập khu bảo tồn là biện pháp BẢO VỆ đa dạng sinh học, không phải nguyên nhân suy giảm.' }];
    const it = R.chon(ds);
    const opts = TD.xaoR(R, [it.d].concat(it.s));
    return { q: it.q, opts: opts, ans: opts.indexOf(it.d), giai: `Đáp án: ${it.d}\n${it.v}`,
      meo: 'Câu hỏi hệ sinh thái hay xoay quanh một đối lập duy nhất: VẬT CHẤT tuần hoàn, NĂNG LƯỢNG một chiều.' };
  } },

{ ma: 'sinh-uuthelai', chuong: 'Ứng dụng di truyền', muc: 3, dang: 'mc',
  tao(R) {
    const ds = [
    { q: 'Vì sao nông dân trồng ngô lai F₁ phải mua giống mới mỗi vụ?',
      d: 'Vì ưu thế lai giảm dần từ đời F₂ trở đi',
      s: ['Vì hạt F₁ không nảy mầm được', 'Vì cây F₁ bị bất thụ hoàn toàn',
          'Vì F₂ bị đột biến gene hàng loạt'],
      v: 'Tỉ lệ kiểu gene dị hợp giảm một nửa mỗi thế hệ nên ưu thế lai tụt nhanh.' },
    { q: 'Giả thuyết siêu trội giải thích ưu thế lai dựa trên', d: 'ưu thế của kiểu gene dị hợp',
      s: ['ưu thế của kiểu gene đồng hợp trội', 'sự tích luỹ đột biến có lợi',
          'sự tăng số lượng nhiễm sắc thể'],
      v: 'Theo giả thuyết siêu trội, Aa cho sức sống vượt cả AA lẫn aa.' },
    { q: 'Consixin được dùng để', d: 'gây đột biến đa bội',
      s: ['gây đột biến gene', 'gây đột biến mất đoạn', 'chuyển gene giữa hai loài'],
      v: 'Consixin cản trở hình thành thoi phân bào nên nhiễm sắc thể nhân đôi mà không phân li.' },
    { q: 'Phương pháp nào tạo ra hàng loạt cây con đồng nhất về kiểu gene?', d: 'Nuôi cấy mô tế bào',
      s: ['Lai khác dòng', 'Gây đột biến bằng tia phóng xạ', 'Dung hợp tế bào trần'],
      v: 'Mọi cây con đều xuất phát từ cùng một mô của một cây mẹ nên kiểu gene giống hệt nhau.' },
    { q: 'Phương pháp gây đột biến ít được áp dụng cho động vật bậc cao vì',
      d: 'động vật bậc cao rất dễ chết hoặc bất thụ khi bị xử lí tác nhân đột biến',
      s: ['động vật không có vật chất di truyền là DNA', 'đột biến ở động vật không di truyền được',
          'động vật không sinh sản hữu tính'],
      v: 'Hệ cơ quan phức tạp nên chịu tác nhân đột biến rất kém.' }];
    const it = R.chon(ds);
    const opts = TD.xaoR(R, [it.d].concat(it.s));
    return { q: it.q, opts: opts, ans: opts.indexOf(it.d), giai: `Đáp án: ${it.d}\n${it.v}`,
      meo: 'Ưu thế lai KHÔNG di truyền ổn định · consixin gây ĐA BỘI chứ không gây đột biến gene.' };
  } }
]);
})();
