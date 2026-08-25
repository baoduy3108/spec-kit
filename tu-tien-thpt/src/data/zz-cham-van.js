/* ============================================================
   SOI BÀI VIẾT NGỮ VĂN BẰNG LUẬT
   Máy không đọc hiểu được nội dung, nhưng những gì ĐẾM ĐƯỢC thì đếm cho đủ:
   dung lượng, bố cục, liên kết, dẫn chứng, lặp từ, LỖI CHÍNH TẢ, lỗi dấu câu,
   mức bám đề, sáo ngữ. Đó đúng là mấy ô điểm hình thức trong đáp án của Bộ —
   gộp lại vẫn tới 0,75/2,0 điểm với đoạn và 1,0/4,0 điểm với bài.
   ============================================================ */
window.TD = window.TD || {};

/* Cặp SAI → ĐÚNG chỉ gồm những lỗi chắc chắn, không phụ thuộc ngữ cảnh.
   Những cặp mà cả hai đều là từ có thật (dành/giành, yếu điểm/điểm yếu,
   bàng quan/bàng quang) để riêng ở nhóm NHAC vì phải xét nghĩa mới biết sai. */
TD.LOI_CHINH_TA = [
  ['xuất xắc', 'xuất sắc'], ['suất sắc', 'xuất sắc'], ['chia sẽ', 'chia sẻ'],
  ['sử lý', 'xử lí'], ['sử lí', 'xử lí'], ['cọ sát', 'cọ xát'],
  ['chín mùi', 'chín muồi'], ['vô hình chung', 'vô hình trung'],
  ['sáng lạng', 'xán lạn'], ['sáng lạn', 'xán lạn'], ['tựu chung', 'tựu trung'],
  ['chau chuốt', 'trau chuốt'], ['sát nhập', 'sáp nhập'], ['thăm quan', 'tham quan'],
  ['khắc khe', 'khắt khe'], ['suông sẻ', 'suôn sẻ'], ['xúc tích', 'súc tích'],
  ['chuẩn đoán', 'chẩn đoán'], ['đường xá', 'đường sá'], ['bổ xung', 'bổ sung'],
  ['khoảng khắc', 'khoảnh khắc'], ['lỗ lực', 'nỗ lực'], ['chăn trở', 'trăn trở'],
  ['trân thành', 'chân thành'], ['chân trọng', 'trân trọng'], ['sâu xắc', 'sâu sắc'],
  ['dữ gìn', 'giữ gìn'], ['dàn dụa', 'giàn giụa'], ['nhân tiễn', 'nhân tiện'],
  ['xán lạng', 'xán lạn'], ['bắt trước', 'bắt chước'], ['dấu diếm', 'giấu giếm']
];
/* Cặp phải xét nghĩa: chỉ NHẮC chứ không tính là lỗi */
TD.NHAC_DUNG_TU = [
  ['yếu điểm', '"yếu điểm" nghĩa là điểm quan trọng; muốn nói mặt hạn chế thì viết "điểm yếu"'],
  ['bàng quang', '"bàng quang" là bộ phận cơ thể; thái độ thờ ơ là "bàng quan"'],
  ['giả thuyết', '"giả thuyết" là điều nêu ra để chứng minh; điều kiện cho sẵn của bài toán là "giả thiết"'],
  ['cứu cánh', '"cứu cánh" nghĩa gốc là mục đích cuối cùng, không phải phao cứu sinh']
];

/* ------------------------------------------------------------
   KHUNG Ý MÀ GIÁO VIÊN CHẤM THEO
   Hướng dẫn chấm không chấm cảm tính: nó liệt kê các Ý phải có, thiếu ý nào
   trừ ý đó. Đoạn nghị luận xã hội 200 chữ có năm bước chuẩn; bài nghị luận
   văn học cũng có năm phần. Máy dò được bài đã CHẠM tới bước nào chưa qua dấu
   hiệu ngôn ngữ của bước đó — nhưng KHÔNG kiểm được ý viết ra có đúng không,
   nên con số rút ra chỉ là TRẦN điểm, không phải điểm thật.
   ------------------------------------------------------------ */
TD.KHUNG_NLXH = [
  { ten: 'Giải thích khái niệm',
    dau: /(là gì|được hiểu là|có nghĩa là|nghĩa là|hiểu một cách|khái niệm|chính là|ta có thể hiểu|vốn là|là sự |là thái độ|là phẩm chất|là sợi dây|là khả năng)/i,
    sua: 'Mở đoạn nên nói rõ vấn đề đó LÀ GÌ trước khi bàn. Một câu thôi cũng được.' },
  { ten: 'Biểu hiện hoặc thực trạng',
    dau: /(biểu hiện|thể hiện qua|thực trạng|trong cuộc sống|trong đời sống|hằng ngày|hàng ngày|ta thấy|ta bắt gặp|không ít|từ việc|những việc|thực tế cho thấy|nhiều người|có những người|xung quanh|biết bao)/i,
    sua: 'Nêu vấn đề đó hiện ra thế nào trong đời sống — người đọc mới hình dung được.' },
  { ten: 'Ý nghĩa hoặc nguyên nhân',
    dau: /(ý nghĩa|vai trò|giúp|mang lại|đem lại|nhờ đó|nhờ |bởi vì|bởi lẽ|nguyên nhân|lí do|lý do|sở dĩ|giữ cho|làm nên|tạo nên|nuôi dưỡng|bồi đắp|động lực|sức mạnh|khiến cho|để rồi|chính vì)/i,
    sua: 'Nên lí giải VÌ SAO — đây là phần ăn điểm nhất, không được bỏ.' },
  { ten: 'Phản đề hoặc phê phán',
    dau: /(tuy nhiên|thế nhưng|song|bên cạnh đó vẫn|đáng buồn|đáng tiếc|phê phán|lên án|đáng trách|ngược lại|không ít người|một bộ phận|vô ơn|thờ ơ|vẫn còn)/i,
    sua: 'Thiếu phản đề là mất điểm rõ nhất. Chỉ cần một câu phê phán mặt trái.' },
  { ten: 'Bài học và liên hệ bản thân',
    dau: /(bài học|mỗi chúng ta|mỗi người|bản thân (em|tôi|mình)|cần phải|cần |hãy |rèn luyện|nhận thức|hành động|trách nhiệm|từ những việc nhỏ|tóm lại)/i,
    sua: 'Kết đoạn nên rút ra bài học và liên hệ chính mình, không được bỏ lửng.' }
];
TD.KHUNG_NLVH = [
  { ten: 'Giới thiệu tác giả và tác phẩm',
    dau: /(nhà thơ|nhà văn|tác giả|tác phẩm|bài thơ|truyện ngắn|đoạn trích|sáng tác)/i,
    sua: 'Mở bài phải giới thiệu tác giả, tác phẩm rồi mới nêu vấn đề cần bàn.' },
  { ten: 'Nêu vấn đề nghị luận',
    dau: /(vấn đề|nội dung chính|chủ đề|thông điệp|tư tưởng|cảm hứng chủ đạo)/i,
    sua: 'Phải nói rõ bài viết sẽ bàn về điều gì, nếu không giám khảo không biết chấm theo hướng nào.' },
  { ten: 'Phân tích theo đặc trưng thể loại',
    dau: /(hình ảnh|nhịp thơ|vần|biện pháp tu từ|so sánh|ẩn dụ|nhân hoá|điệp|nhân vật|tình huống|ngôi kể|chi tiết|ngôn ngữ|giọng điệu|kết cấu)/i,
    sua: 'Phân tích phải bám ĐẶC TRƯNG THỂ LOẠI: thơ thì hình ảnh, nhịp, tu từ; truyện thì nhân vật, tình huống, ngôi kể.' },
  { ten: 'Đánh giá nghệ thuật',
    dau: /(nghệ thuật|thành công|đặc sắc|tài năng|bút pháp|phong cách|góp phần)/i,
    sua: 'Sau khi phân tích nội dung phải có một đoạn đánh giá nghệ thuật.' },
  { ten: 'Đánh giá chung và mở rộng',
    dau: /(khẳng định|tóm lại|nhìn chung|liên hệ|ngày nay|đối với (em|tôi)|giá trị|sức sống)/i,
    sua: 'Kết bài khẳng định lại giá trị và mở rộng liên hệ — chỗ lấy điểm sáng tạo.' }
];

/* van: bài làm · cf = {chuan, laDoan, tuKhoa, tong} */
TD.soiVan = function (van, cf) {
  const c = cf || {};
  const t = String(van || '').trim();
  const chuan = c.chuan || 200, laDoan = !!c.laDoan;
  const tong = c.tong || (laDoan ? 2 : 4);
  if (!t) return { muc: [{ dat: false, y: 'Chưa viết gì.' }], diem: 0, tranDiem: 0, tong: tong };

  const chu = (t.match(/\S+/g) || []).length;
  const cau = t.split(/[.!?…]+[\s"”)]|[.!?…]+$/).map(x => x.trim()).filter(x => x.length > 3);
  const doan = t.split(/\n+/).map(x => x.trim()).filter(Boolean);
  const thuong = t.toLowerCase();
  const muc = [];
  const them = (dat, y) => { muc.push({ dat: dat, y: y }); return dat; };

  /* ---------- 1. Dung lượng ---------- */
  const lech = Math.round((chu - chuan) / chuan * 100);
  const duDai = Math.abs(lech) <= 20;
  them(duDai, duDai
    ? `Dung lượng ${chu} chữ — nằm trong khoảng chấp nhận (chuẩn khoảng ${chuan} chữ).`
    : `Dung lượng ${chu} chữ, lệch ${lech > 0 ? '+' : ''}${lech}% so với chuẩn ${chuan} chữ. `
      + (lech > 0 ? 'Viết dài quá dễ lan man và hết giờ cho câu sau.'
                  : 'Viết ngắn quá thì không đủ ý để giám khảo cho điểm triển khai.'));

  /* ---------- 2. Bố cục ---------- */
  const dungBoCuc = laDoan ? doan.length === 1 : doan.length >= 3;
  them(dungBoCuc, laDoan
    ? (doan.length === 1 ? 'Viết liền một đoạn, đúng yêu cầu đoạn văn.'
       : `Đề yêu cầu MỘT đoạn văn nhưng bài đang tách ${doan.length} đoạn — mất luôn 0,25 điểm hình thức.`)
    : (doan.length >= 3 ? `Bài chia ${doan.length} đoạn, có bố cục mở – thân – kết.`
       : `Bài chỉ có ${doan.length} đoạn. Bài văn phải tách rõ mở bài, thân bài, kết bài.`));

  /* ---------- 3. Chính tả ---------- */
  const saiCT = [];
  TD.LOI_CHINH_TA.forEach(([sai, dung]) => {
    if (thuong.indexOf(sai) >= 0) saiCT.push(`"${sai}" → <b>${dung}</b>`);
  });
  them(saiCT.length === 0, saiCT.length === 0
    ? 'Không dính lỗi chính tả nào trong danh sách hay sai.'
    : `Sai chính tả ${saiCT.length} chỗ: ${saiCT.join(' · ')}`);
  const nhac = [];
  TD.NHAC_DUNG_TU.forEach(([tu, y]) => { if (thuong.indexOf(tu) >= 0) nhac.push(y); });

  /* ---------- 4. Dấu câu và viết hoa ---------- */
  const loiDau = [];
  if (/\s+[,.;:!?]/.test(t)) loiDau.push('có khoảng trắng đứng trước dấu câu');
  if (/[,.;:](?=[A-Za-zÀ-ỹ])/.test(t)) loiDau.push('thiếu dấu cách sau dấu câu');
  if (/ {2,}/.test(t)) loiDau.push('có chỗ gõ hai dấu cách liền nhau');
  if (!/[.!?…]["”)]?$/.test(t)) loiDau.push('bài chưa kết thúc bằng dấu chấm');
  const hoa = cau.filter(x => /^[a-zà-ỹ]/.test(x)).length;
  if (hoa > 0) loiDau.push(`${hoa} câu không viết hoa chữ đầu`);
  them(loiDau.length === 0, loiDau.length === 0
    ? 'Dấu câu và viết hoa đúng quy tắc.'
    : `Lỗi trình bày: ${loiDau.join(' · ')}.`);

  /* ---------- 5. Bám đề ---------- */
  const khoa = (c.tuKhoa || []).filter(w => String(w).length >= 4);
  let bamDe = true;
  if (khoa.length) {
    const thieu = khoa.filter(w => TD.khongDau(thuong).indexOf(TD.khongDau(String(w).toLowerCase())) < 0);
    bamDe = thieu.length <= Math.floor(khoa.length / 3);
    them(bamDe, bamDe
      ? `Bài có nhắc lại ${khoa.length - thieu.length}/${khoa.length} từ khoá của đề — không lạc đề.`
      : `Bài KHÔNG nhắc tới ${thieu.length}/${khoa.length} từ khoá của đề (${thieu.slice(0, 4).join(', ')}). `
        + 'Không nêu trúng vấn đề thì mất luôn ô điểm "xác định đúng vấn đề nghị luận".');
  }

  /* ---------- 6. Liên kết ---------- */
  const NOI = /(tuy nhiên|mặt khác|hơn nữa|bên cạnh đó|vì vậy|do đó|trước hết|không chỉ|ngược lại|thật vậy|nói cách khác|chẳng những|thứ nhất|thứ hai|đầu tiên|cuối cùng|tóm lại)/gi;
  const soNoi = (t.match(NOI) || []).length;
  them(soNoi >= (laDoan ? 2 : 4), soNoi >= (laDoan ? 2 : 4)
    ? `Dùng ${soNoi} từ ngữ liên kết — lập luận có mạch.`
    : `Mới ${soNoi} từ ngữ liên kết (cần ít nhất ${laDoan ? 2 : 4}). Thiếu từ nối thì các ý rời rạc.`);

  /* ---------- 7. Dẫn chứng ---------- */
  const DAN = /(ví dụ|chẳng hạn|nhà văn|nhà thơ|tác giả|câu thơ|khổ thơ|chi tiết|hình ảnh|dẫn chứng|thực tế|số liệu|nhân vật)/gi;
  const soDan = (t.match(DAN) || []).length;
  them(soDan >= 2, soDan >= 2
    ? 'Có dấu hiệu đưa dẫn chứng, không nói suông.'
    : 'Chưa thấy dẫn chứng cụ thể. Phần triển khai là ô điểm lớn nhất, nói chay là mất phần lớn số đó.');

  /* ---------- 8. Lặp từ ---------- */
  const dem = {};
  (thuong.match(/[a-zà-ỹ]{4,}/g) || []).forEach(w => { dem[w] = (dem[w] || 0) + 1; });
  const nguong = Math.max(5, Math.round(chu / 40));
  const lap = Object.keys(dem).filter(w => dem[w] >= nguong)
    .sort((a, b) => dem[b] - dem[a]).slice(0, 3);
  them(lap.length === 0, lap.length === 0
    ? 'Không có từ nào bị lặp quá dày.'
    : `Lặp từ: ${lap.map(w => `"${w}" ${dem[w]} lần`).join(' · ')} — nên thay bằng từ đồng nghĩa.`);

  /* ---------- 9. Sáo ngữ ---------- */
  const SAO = /(rất là|vô cùng|hết sức|cực kỳ|cực kì|thật sự rất|theo em nghĩ thì|nói chung là)/gi;
  const soSao = (t.match(SAO) || []).length;
  them(soSao <= Math.max(2, Math.round(chu / 120)), soSao <= Math.max(2, Math.round(chu / 120))
    ? 'Không lạm dụng từ nhấn mạnh sáo rỗng.'
    : `Dùng ${soSao} lần các cụm nhấn mạnh chung chung ("rất là", "vô cùng", "hết sức"). `
      + 'Thay bằng từ ngữ cụ thể thì mới được điểm sáng tạo.');

  /* ---------- 10. Câu quá dài ---------- */
  const dai = cau.filter(x => (x.match(/\S+/g) || []).length > 45).length;
  them(dai === 0, dai === 0 ? 'Không có câu nào dài quá 45 chữ.'
    : `Có ${dai} câu dài trên 45 chữ — câu dài dễ sai ngữ pháp và khó chấm.`);

  /* ---------- 11. Khung ý theo hướng dẫn chấm ---------- */
  const khung = laDoan ? TD.KHUNG_NLXH : TD.KHUNG_NLVH;
  const coBuoc = khung.map(b => ({ ten: b.ten, co: b.dau.test(t), sua: b.sua }));
  const duBuoc = coBuoc.filter(b => b.co).length;
  /* Nói cho đúng bản chất: máy dò DẤU HIỆU NGÔN NGỮ của từng bước, nên bài có
     ý mà diễn đạt khác kiểu vẫn có thể bị báo nhầm là thiếu. */
  them(duBuoc === khung.length,
    duBuoc === khung.length
      ? `Thấy đủ dấu hiệu của cả ${khung.length} bước lập luận mà hướng dẫn chấm đòi hỏi.`
      : `Máy chỉ thấy dấu hiệu của ${duBuoc}/${khung.length} bước lập luận. Không thấy: `
        + coBuoc.filter(b => !b.co).map(b => `<b>${b.ten}</b>`).join(' · ')
        + '. Nếu bài đã có mấy ý này mà diễn đạt theo cách khác thì bỏ qua nhắc nhở.');

  /* ---------- Quy ra điểm cho phần ĐẾM ĐƯỢC ----------
     Thang của Bộ: đoạn NLXH 2,0 điểm gồm 0,25 hình thức + 0,25 xác định vấn đề
     + 1,0 triển khai + 0,25 chính tả ngữ pháp + 0,25 sáng tạo. Bài NLVH 4,0
     điểm gồm 0,25 hình thức + 0,5 xác định vấn đề + 2,5 triển khai + 0,25
     chính tả + 0,5 sáng tạo. Máy chỉ dám chấm ba ô đầu tiên. */
  const oHinhThuc = 0.25;
  const oVanDe = laDoan ? 0.25 : 0.5;
  const oChinhTa = 0.25;
  let diem = 0;
  if (duDai && dungBoCuc) diem += oHinhThuc;
  if (bamDe) diem += oVanDe;
  if (saiCT.length === 0 && loiDau.length === 0) diem += oChinhTa;
  /* Ô triển khai: máy chỉ đo được bài đã CHẠM tới bao nhiêu bước trong khung,
     không đọc được ý viết ra có đúng hay không. Vì vậy trả về TRẦN điểm —
     mức tối đa có thể đạt nếu các ý ấy viết đúng — chứ không phải điểm thật. */
  const oTrienKhai = laDoan ? 1 : 2.5;
  const tranTrienKhai = Math.round(oTrienKhai * duBuoc / khung.length * 100) / 100;
  return {
    muc: muc, nhac: nhac, khung: coBuoc, duBuoc: duBuoc, soBuoc: khung.length,
    diem: Math.round(diem * 100) / 100,
    tranDiem: Math.round((oHinhThuc + oVanDe + oChinhTa) * 100) / 100,
    tranTrienKhai: tranTrienKhai, oTrienKhai: oTrienKhai,
    tong: tong, chu: chu, soCau: cau.length, soDoan: doan.length
  };
};
