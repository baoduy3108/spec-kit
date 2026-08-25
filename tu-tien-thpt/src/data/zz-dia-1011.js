/* ============================================================
   ĐỊA LÍ 10 – 11 — MẢNG KHO CŨ THIẾU HẲN
   Đề tốt nghiệp 2026 có câu nằm ngoài chương trình lớp 12: kiến thức
   Địa lí 10 (tự nhiên đại cương, dân cư, các ngành kinh tế) và Địa lí 11
   (nhóm nước, toàn cầu hoá, các tổ chức khu vực, địa lí khu vực – quốc gia).
   Các câu đó ở mức nhận biết nhưng đủ làm học sinh chỉ ôn lớp 12 lúng túng.
   File này bù đúng mảng đó: thẻ Tàng Kinh Các, mệnh đề cho Tà Đạo và
   Phần II, cùng bộ sinh câu hỏi.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {}; TD.KHO_LT = TD.KHO_LT || {}; TD.GEN = TD.GEN || {};

(function () {
const CD = 'Địa 10 – 11';

/* ---------------------------------------------------------- THẺ */
TD.KHO.dia_ct = (TD.KHO.dia_ct || []).concat([

{ nhom: 'Địa lí 10 – 11', cd: CD, ten: 'Địa lí tự nhiên đại cương — bốn quyển phải nhớ', cap: 1,
  ct: `<table class="kq">
<tr><td>Nội lực</td><td>sinh ra từ bên trong Trái Đất, làm địa hình gồ ghề thêm qua uốn nếp, đứt gãy, động đất, núi lửa</td></tr>
<tr><td>Ngoại lực</td><td>sinh ra từ bên ngoài do nước, gió, sinh vật, làm địa hình san bằng qua phong hoá, bóc mòn, vận chuyển, bồi tụ</td></tr>
<tr><td>Quan hệ hai lực</td><td>tác động đồng thời và ngược chiều nhau</td></tr>
<tr><td>Đai khí áp cao</td><td>hai đai áp cao cực và hai đai áp cao cận chí tuyến</td></tr>
<tr><td>Đai khí áp thấp</td><td>một đai áp thấp xích đạo và hai đai áp thấp ôn đới</td></tr>
<tr><td>Gió Mậu dịch</td><td>thổi từ áp cao cận chí tuyến về áp thấp xích đạo</td></tr>
<tr><td>Gió Tây ôn đới</td><td>thổi từ áp cao cận chí tuyến về áp thấp ôn đới</td></tr>
<tr><td>Nhiệt độ theo độ cao</td><td>giảm trung bình 0,6 °C mỗi 100 m lên cao</td></tr>
<tr><td>Chế độ nước sông nhiệt đới</td><td>phụ thuộc chủ yếu vào chế độ mưa</td></tr>
<tr><td>Chế độ nước sông ôn đới lạnh</td><td>phụ thuộc chủ yếu vào băng tuyết tan</td></tr>
<tr><td>Dòng biển nóng</td><td>chảy từ vĩ độ thấp lên vĩ độ cao, gây mưa ở nơi nó đi qua</td></tr>
<tr><td>Dòng biển lạnh</td><td>chảy từ vĩ độ cao về vĩ độ thấp, gây khô hạn nên có hoang mạc ven biển</td></tr>
<tr><td>Quy luật của sinh quyển</td><td>sinh vật phân bố theo vĩ độ và độ cao tạo ra quy luật địa đới và đai cao</td></tr></table>`,
  khi: 'Câu nhận biết lấy từ Địa lí 10 — thường rơi vào Phần I của đề.',
  vd: 'Hoang mạc Atacama nằm ngay ven biển vì có dòng biển LẠNH Pêru chảy qua, hơi nước không bốc lên được.',
  bay: 'Nội lực làm địa hình gồ ghề, ngoại lực làm bằng phẳng — hai vế này rất hay bị tráo cho nhau trong phương án nhiễu.' },

{ nhom: 'Địa lí 10 – 11', cd: CD, ten: 'Nhóm nước, toàn cầu hoá và các tổ chức khu vực', cap: 2,
  ct: '<b>HAI NHÓM NƯỚC</b><br>'
    + '&nbsp;&nbsp;Nước PHÁT TRIỂN: GNI/người cao, HDI cao, tỉ trọng dịch vụ lớn, cơ cấu dân số GIÀ, đô thị hoá cao.<br>'
    + '&nbsp;&nbsp;Nước ĐANG PHÁT TRIỂN: GNI/người thấp hoặc trung bình, tỉ trọng nông nghiệp còn lớn, cơ cấu dân số TRẺ.<br>'
    + '&nbsp;&nbsp;Ba chỉ tiêu đánh giá: GNI bình quân đầu người · cơ cấu kinh tế · chỉ số phát triển con người HDI.<br>'
    + '<b>TOÀN CẦU HOÁ</b> — biểu hiện: thương mại phát triển, đầu tư nước ngoài tăng, thị trường tài chính mở rộng, '
    + 'các công ty xuyên quốc gia có vai trò lớn. Hệ quả: thúc đẩy tăng trưởng nhưng làm gia tăng khoảng cách giàu nghèo.<br>'
    + '<b>KHU VỰC HOÁ</b> — các tổ chức phải phân biệt:<br>'
    + '&nbsp;&nbsp;<b>EU</b> — Liên minh châu Âu, mức liên kết SÂU nhất (có đồng tiền chung euro, thị trường chung).<br>'
    + '&nbsp;&nbsp;<b>ASEAN</b> — Hiệp hội các quốc gia Đông Nam Á, 10 thành viên, ba trụ cột Cộng đồng.<br>'
    + '&nbsp;&nbsp;<b>APEC</b> — Diễn đàn Hợp tác Kinh tế châu Á – Thái Bình Dương, là DIỄN ĐÀN chứ không phải liên minh.<br>'
    + '&nbsp;&nbsp;<b>WTO</b> — Tổ chức Thương mại Thế giới, phạm vi TOÀN CẦU chứ không phải khu vực.<br>'
    + '&nbsp;&nbsp;<b>USMCA</b> — hiệp định Bắc Mỹ (Hoa Kỳ – Mexico – Canada), thay cho NAFTA cũ.<br>'
    + '<b>AN NINH TOÀN CẦU</b> — an ninh lương thực, an ninh nguồn nước, an ninh năng lượng, an ninh mạng.',
  khi: 'Câu Địa lí 11 trong đề, và câu so sánh hai nhóm nước.',
  vd: 'EU có đồng tiền chung nên mức liên kết sâu hơn ASEAN; APEC chỉ là diễn đàn nên không có ràng buộc pháp lí như EU.',
  bay: 'WTO là tổ chức TOÀN CẦU, đừng xếp chung nhóm với EU hay ASEAN khi đề hỏi về tổ chức KHU VỰC.' },

{ nhom: 'Địa lí 10 – 11', cd: CD, ten: 'Địa lí các ngành kinh tế và các khu vực trên thế giới', cap: 2,
  ct: '<b>NÔNG NGHIỆP</b> — nhân tố quyết định phân bố: đất, khí hậu, nguồn nước (tự nhiên); thị trường, khoa học công nghệ, chính sách (kinh tế – xã hội). '
    + 'Cây lương thực chính: lúa gạo ở vùng nhiệt đới ẩm châu Á; lúa mì ở ôn đới; ngô ở cận nhiệt và ôn đới nóng.<br>'
    + '<b>CÔNG NGHIỆP</b> — công nghiệp khai thác đứng gần nguồn nguyên liệu; công nghiệp chế biến đứng gần thị trường và lao động. '
    + 'Xu hướng hiện nay: phát triển công nghiệp xanh, kinh tế tuần hoàn.<br>'
    + '<b>DỊCH VỤ</b> — chia ba nhóm: dịch vụ kinh doanh (giao thông, tài chính), dịch vụ tiêu dùng (bán lẻ, du lịch), dịch vụ công (hành chính, y tế, giáo dục). '
    + 'Tỉ trọng dịch vụ càng cao thì trình độ phát triển càng cao.<br>'
    + '<b>MỘT SỐ KHU VỰC – QUỐC GIA hay ra đề</b><br>'
    + '&nbsp;&nbsp;<b>Hoa Kỳ:</b> nền kinh tế quy mô lớn nhất thế giới, dịch vụ chiếm tỉ trọng rất cao.<br>'
    + '&nbsp;&nbsp;<b>Trung Quốc:</b> dân số đông, công nghiệp chế biến chế tạo mạnh, chênh lệch lớn giữa miền Đông và miền Tây.<br>'
    + '&nbsp;&nbsp;<b>Nhật Bản:</b> nghèo khoáng sản, dân số GIÀ, kinh tế dựa vào công nghệ cao và nhập nguyên liệu.<br>'
    + '&nbsp;&nbsp;<b>Đông Nam Á:</b> vị trí cầu nối, khí hậu nhiệt đới gió mùa, thế mạnh nông nghiệp nhiệt đới và biển.<br>'
    + '&nbsp;&nbsp;<b>Tây Nam Á:</b> trữ lượng dầu mỏ lớn nhất thế giới, khí hậu khô hạn, bất ổn chính trị kéo dài.<br>'
    + '&nbsp;&nbsp;<b>Mỹ Latinh:</b> giàu tài nguyên nhưng chênh lệch giàu nghèo và đô thị hoá tự phát lớn.<br>'
    + '&nbsp;&nbsp;<b>Cộng hoà Nam Phi:</b> nền kinh tế phát triển nhất châu Phi, giàu khoáng sản quý.',
  khi: 'Câu nhận biết về các ngành và các khu vực trong đề — phần lớn học sinh chỉ ôn lớp 12 nên bỏ trống.',
  vd: 'Đề hỏi "khu vực có trữ lượng dầu mỏ lớn nhất thế giới" — đáp án là Tây Nam Á, kiến thức Địa lí 11.',
  bay: 'Nhật Bản dân số GIÀ còn Đông Nam Á dân số TRẺ; đừng nhớ ngược. Và Nam Phi phát triển nhất CHÂU PHI, '
     + 'không phải nước phát triển theo phân loại thế giới.' }

]);

/* ---------------------------------------------------------- MỆNH ĐỀ */
TD.KHO_LT.dia = (TD.KHO_LT.dia || []).concat([
{ cd: CD, m: 1, a: true,  t: 'Nội lực có xu hướng làm cho bề mặt Trái Đất gồ ghề hơn.', v: 'Nội lực sinh ra uốn nếp, đứt gãy, núi lửa — đều làm địa hình nhô cao và chia cắt.' },
{ cd: CD, m: 1, a: false, t: 'Ngoại lực làm cho bề mặt Trái Đất gồ ghề hơn.', v: 'Ngoại lực SAN BẰNG địa hình: phong hoá, bóc mòn, vận chuyển, bồi tụ.' },
{ cd: CD, m: 1, a: true,  t: 'Nhiệt độ không khí giảm trung bình 0,6 °C khi lên cao 100 m.', v: 'Đây là gradient nhiệt theo độ cao ở tầng đối lưu.' },
{ cd: CD, m: 2, a: true,  t: 'Dòng biển lạnh chảy ven bờ là một nguyên nhân hình thành hoang mạc ven biển.', v: 'Nước lạnh làm hơi nước khó bốc lên, không tạo mưa — ví dụ hoang mạc Atacama và Namib.' },
{ cd: CD, m: 2, a: false, t: 'Dòng biển nóng đi qua thường gây khô hạn cho vùng ven bờ.', v: 'Ngược lại — dòng NÓNG làm tăng bốc hơi nên gây MƯA; dòng LẠNH mới gây khô hạn.' },
{ cd: CD, m: 1, a: true,  t: 'Gió Mậu dịch (Tín phong) thổi từ áp cao cận chí tuyến về áp thấp xích đạo.', v: 'Gió thổi từ nơi áp cao về nơi áp thấp.' },
{ cd: CD, m: 2, a: true,  t: 'HDI là một trong các chỉ tiêu dùng để phân chia hai nhóm nước.', v: 'Ba chỉ tiêu: GNI bình quân đầu người, cơ cấu kinh tế và HDI.' },
{ cd: CD, m: 2, a: true,  t: 'Các nước phát triển thường có cơ cấu dân số già.', v: 'Tỉ suất sinh thấp, tuổi thọ cao nên tỉ lệ người trên 65 tuổi lớn.' },
{ cd: CD, m: 2, a: false, t: 'Các nước đang phát triển thường có tỉ trọng ngành dịch vụ cao nhất thế giới.', v: 'Tỉ trọng dịch vụ cao là đặc trưng của nhóm nước PHÁT TRIỂN.' },
{ cd: CD, m: 2, a: true,  t: 'EU là tổ chức khu vực có mức độ liên kết sâu nhất thế giới hiện nay.', v: 'EU có thị trường chung, đồng tiền chung euro và nhiều thiết chế siêu quốc gia.' },
{ cd: CD, m: 2, a: false, t: 'WTO là một tổ chức liên kết kinh tế khu vực.', v: 'WTO là tổ chức thương mại TOÀN CẦU, không giới hạn theo khu vực địa lí.' },
{ cd: CD, m: 2, a: true,  t: 'APEC là một diễn đàn hợp tác kinh tế, không có tính ràng buộc pháp lí như EU.', v: 'APEC hoạt động theo nguyên tắc tự nguyện và đồng thuận.' },
{ cd: CD, m: 2, a: true,  t: 'Tây Nam Á là khu vực có trữ lượng dầu mỏ lớn nhất thế giới.', v: 'Tập trung quanh vịnh Péc-xích.' },
{ cd: CD, m: 2, a: false, t: 'Nhật Bản có nguồn khoáng sản phong phú nên ít phải nhập nguyên liệu.', v: 'Nhật Bản NGHÈO khoáng sản, phải nhập phần lớn nguyên – nhiên liệu.' },
{ cd: CD, m: 2, a: true,  t: 'Nhật Bản đang đối mặt với vấn đề dân số già và thiếu lao động.', v: 'Tỉ suất sinh rất thấp, tuổi thọ cao nhất thế giới.' },
{ cd: CD, m: 2, a: true,  t: 'Kinh tế Trung Quốc có sự chênh lệch lớn giữa miền Đông và miền Tây.', v: 'Miền Đông giáp biển, tập trung công nghiệp và đô thị; miền Tây núi cao, hoang mạc, thưa dân.' },
{ cd: CD, m: 2, a: true,  t: 'Cộng hoà Nam Phi là nước có nền kinh tế phát triển nhất châu Phi.', v: 'Giàu khoáng sản quý, công nghiệp khai khoáng và dịch vụ tài chính phát triển.' },
{ cd: CD, m: 3, a: true,  t: 'Toàn cầu hoá vừa thúc đẩy tăng trưởng vừa làm gia tăng khoảng cách giàu nghèo.', v: 'Lợi ích phân bố không đều giữa các nước và giữa các nhóm dân cư trong một nước.' },
{ cd: CD, m: 2, a: true,  t: 'An ninh lương thực, an ninh nguồn nước và an ninh năng lượng đều thuộc nhóm vấn đề an ninh toàn cầu.', v: 'Đây là ba trong các vấn đề an ninh phi truyền thống được nêu trong chương trình Địa lí 11.' },
{ cd: CD, m: 2, a: true,  t: 'Trong ngành công nghiệp, các cơ sở khai thác thường phân bố gần nguồn nguyên liệu.', v: 'Nguyên liệu thô cồng kềnh, vận chuyển xa thì chi phí lớn.' }
]);

/* ---------------------------------------------------------- BỘ SINH */
TD.GEN.dia = (TD.GEN.dia || []).concat([
{ ma: 'dia-1011-tunhien', chuong: 'Địa 10 – 11', muc: 1, dang: 'mc',
  tao(R) {
    const ds = [
    { q: 'Quá trình nào sau đây thuộc tác động của NGOẠI lực?', d: 'Phong hoá đá',
      s: ['Uốn nếp địa tầng', 'Động đất', 'Núi lửa phun trào'],
      v: 'Phong hoá do nước, nhiệt độ, sinh vật gây ra — đều là tác nhân bên ngoài.' },
    { q: 'Loại gió nào thổi từ áp cao cận chí tuyến về áp thấp xích đạo?', d: 'Gió Mậu dịch',
      s: ['Gió Tây ôn đới', 'Gió Đông cực', 'Gió mùa'],
      v: 'Gió Mậu dịch (Tín phong) thổi quanh năm về phía xích đạo.' },
    { q: 'Nhiệt độ không khí ở tầng đối lưu giảm trung bình bao nhiêu khi lên cao 100 m?', d: '0,6 °C',
      s: ['1,0 °C', '0,1 °C', '6,0 °C'],
      v: 'Gradient nhiệt theo độ cao trong tầng đối lưu là khoảng 0,6 °C trên 100 m.' },
    { q: 'Hoang mạc ven biển như Atacama hình thành chủ yếu do', d: 'dòng biển lạnh chảy ven bờ',
      s: ['dòng biển nóng chảy ven bờ', 'địa hình núi cao chắn gió biển', 'vĩ độ quá cao nên ít bức xạ'],
      v: 'Nước biển lạnh làm hơi nước khó bốc lên, không tạo được mưa dù ngay sát biển.' },
    { q: 'Quy luật nào giải thích sự thay đổi của thảm thực vật theo độ cao của núi?', d: 'Quy luật đai cao',
      s: ['Quy luật địa đới', 'Quy luật địa ô', 'Quy luật thống nhất'],
      v: 'Lên cao nhiệt độ giảm nên thảm thực vật đổi theo tầng — đó là quy luật đai cao.' }];
    const it = R.chon(ds);
    const opts = TD.xaoR(R, [it.d].concat(it.s));
    return { q: it.q, opts: opts, ans: opts.indexOf(it.d),
      giai: `Đáp án: ${it.d}\n${it.v}`,
      meo: 'Kiến thức Địa lí 10. Đề 2026 có câu ngoài chương trình lớp 12 — chỉ ở mức nhận biết nhưng ai bỏ qua là mất điểm dễ.' };
  } },

{ ma: 'dia-1011-thegioi', chuong: 'Địa 10 – 11', muc: 2, dang: 'mc',
  tao(R) {
    const ds = [
    { q: 'Tổ chức nào sau đây có mức độ liên kết SÂU nhất?', d: 'EU',
      s: ['ASEAN', 'APEC', 'WTO'],
      v: 'EU có thị trường chung, đồng tiền chung euro và các thiết chế siêu quốc gia.' },
    { q: 'Tổ chức nào sau đây KHÔNG phải tổ chức liên kết kinh tế khu vực?', d: 'WTO',
      s: ['EU', 'ASEAN', 'USMCA'],
      v: 'WTO là tổ chức thương mại TOÀN CẦU, không giới hạn theo khu vực.' },
    { q: 'Khu vực nào có trữ lượng dầu mỏ lớn nhất thế giới?', d: 'Tây Nam Á',
      s: ['Đông Nam Á', 'Mỹ Latinh', 'Tây Âu'],
      v: 'Trữ lượng tập trung quanh vịnh Péc-xích.' },
    { q: 'Đặc điểm nổi bật về dân số của Nhật Bản hiện nay là', d: 'dân số già, thiếu lao động',
      s: ['dân số trẻ, tăng nhanh', 'dân số đông nhất thế giới', 'tỉ suất sinh cao nhất châu Á'],
      v: 'Tỉ suất sinh rất thấp trong khi tuổi thọ cao nhất thế giới.' },
    { q: 'Chỉ tiêu nào sau đây KHÔNG dùng để phân chia hai nhóm nước phát triển và đang phát triển?', d: 'Diện tích lãnh thổ',
      s: ['GNI bình quân đầu người', 'Cơ cấu kinh tế', 'Chỉ số HDI'],
      v: 'Diện tích không phản ánh trình độ phát triển — nước nhỏ vẫn có thể rất phát triển.' },
    { q: 'Nước có nền kinh tế phát triển nhất châu Phi là', d: 'Cộng hoà Nam Phi',
      s: ['Ai Cập', 'Nigeria', 'Kenya'],
      v: 'Giàu khoáng sản quý, công nghiệp khai khoáng và dịch vụ tài chính phát triển.' }];
    const it = R.chon(ds);
    const opts = TD.xaoR(R, [it.d].concat(it.s));
    return { q: it.q, opts: opts, ans: opts.indexOf(it.d),
      giai: `Đáp án: ${it.d}\n${it.v}`,
      meo: 'Kiến thức Địa lí 11. Nhớ ba mức: WTO toàn cầu · EU liên minh sâu · APEC chỉ là diễn đàn.' };
  } }
]);

/* luật ghép chuyên đề cho các thẻ và câu mới */
if (TD.BAN_DO_CD && TD.BAN_DO_CD.dia)
  TD.BAN_DO_CD.dia.unshift([/dia 10|dia 11|noi luc|ngoai luc|thach quyen|khi quyen|thuy quyen|sinh quyen|nhom nuoc|toan cau hoa|khu vuc hoa|hoa ky|trung quoc|nhat ban|tay nam a|my latinh|nam phi|apec|\bwto\b|\beu\b/, CD]);
})();
