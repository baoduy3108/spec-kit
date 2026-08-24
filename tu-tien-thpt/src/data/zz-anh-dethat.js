/* ============================================================
   TIẾNG ANH — DỰNG LẠI THEO ĐÚNG BỐN DẠNG CỦA ĐỀ THẬT
   Đề tốt nghiệp từ 2025 (và giữ nguyên ở 2026) KHÔNG còn một câu
   ngữ pháp đơn lẻ nào. Bốn mươi câu chia đúng như sau:
     ① Điền từ vào quảng cáo – thông báo – email … 12 câu
     ② Sắp xếp câu thành đoạn                        5 câu
     ③ Hoàn thành đoạn văn (điền CẢ CÂU vào chỗ trống) 5 câu
     ④ Đọc hiểu, hai bài 8 và 10 câu                 18 câu
   Kho cũ có 92 trên 96 bộ sinh là câu rời — luyện ngữ pháp thì tốt,
   nhưng không giống một câu nào trong đề. File này bù đúng bốn dạng
   trên; bộ sinh câu rời được đánh dấu _luyen để chỉ dùng trong Luyện
   Công, không lọt vào đề Độ Kiếp nữa.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const MC = (R, de, it, meo) => {
  const opts = TD.xaoR(R, [it.d].concat(it.s));
  const loai = opts.filter(o => o !== it.d)
    .map(o => `• ${o} — ${(it.sv && it.sv[o]) || 'không hợp với ngữ cảnh của chỗ trống này.'}`).join('\n');
  return { q: de, opts: opts, ans: opts.indexOf(it.d),
    giai: `Đáp án đúng: ${it.d}\n${it.v}\n\nVì sao các phương án còn lại bị loại:\n${loai}`, meo: meo };
};
const khungVB = (tieuDe, than) =>
  `<div style="border:1px solid var(--vien);border-radius:10px;padding:12px 14px;margin:10px 0;`
  + `background:var(--nen2);font-size:14.5px;line-height:1.75">`
  + (tieuDe ? `<div style="font-weight:700;color:var(--kim);margin-bottom:8px">${tieuDe}</div>` : '')
  + than + `</div>`;

/* ============================================================
   ① ĐIỀN TỪ VÀO VĂN BẢN THẬT — 12 câu trong đề
   Mỗi văn bản là một mẩu quảng cáo, thông báo, email hoặc tờ rơi
   đúng kiểu đề ra: ngữ pháp và từ vựng nằm TRONG ngữ cảnh.
   ============================================================ */
const VAN_BAN = [

{ ten: 'GREEN CAMPUS VOLUNTEER PROGRAMME',
  than: 'Are you looking for a way to make a difference? The Green Campus Programme (1)____ students '
      + 'to join our tree-planting weekends. No experience (2)____ — we will train you on the first day. '
      + 'Volunteers who take part in at least five sessions (3)____ a certificate from the university. '
      + 'Places are limited, (4)____ apply before 30 September.',
  cho: [
  { so: 1, d: 'invites', m: 2, s: ['inviting', 'to invite', 'invited'],
    v: 'Chủ ngữ "The Green Campus Programme" là số ít, câu ở hiện tại đơn nên động từ chia "invites".',
    sv: { inviting: 'V-ing không thể làm động từ chính khi câu chưa có trợ động từ',
          'to invite': 'to V không làm động từ chính của mệnh đề',
          invited: 'quá khứ đơn lệch với các thì hiện tại còn lại của thông báo' } },
  { so: 2, d: 'is required', m: 3, s: ['requires', 'is requiring', 'required'],
    v: '"Experience" là vật, không tự yêu cầu ai — phải dùng BỊ ĐỘNG "is required" (không đòi hỏi kinh nghiệm).',
    sv: { requires: 'chủ động — kinh nghiệm không thể "yêu cầu" điều gì',
          'is requiring': 'tiếp diễn không dùng cho trạng thái này',
          required: 'thiếu "is", không thành dạng bị động' } },
  { so: 3, d: 'will receive', m: 2, s: ['receive', 'received', 'have received'],
    v: 'Điều kiện loại 1: mệnh đề điều kiện ở hiện tại, mệnh đề chính dùng "will + V" nói việc sẽ xảy ra.',
    sv: { receive: 'hiện tại đơn diễn tả thói quen, không hợp với lời hứa trong tương lai',
          received: 'quá khứ đơn nói việc đã xảy ra rồi',
          'have received': 'hoàn thành nói việc đã hoàn tất trước hiện tại' } },
  { so: 4, d: 'so', m: 1, s: ['but', 'although', 'because'],
    v: '"Chỗ có hạn" là NGUYÊN NHÂN, "hãy nộp đơn sớm" là KẾT QUẢ ⇒ dùng "so".',
    sv: { but: 'nối hai ý trái chiều, ở đây hai vế cùng chiều',
          although: 'là liên từ nhượng bộ, phải đứng đầu mệnh đề phụ',
          because: 'đảo ngược quan hệ nhân quả — vế sau không phải nguyên nhân' } }] },

{ ten: 'NOTICE — LIBRARY OPENING HOURS',
  than: 'From 1 October, the Central Library (1)____ open until 10 p.m. on weekdays. '
      + 'Readers are reminded (2)____ their student cards at the entrance. '
      + 'Books borrowed during the exam period must (3)____ within two weeks. '
      + 'For (4)____ information, please contact the front desk.',
  cho: [
  { so: 1, d: 'will be', m: 2, s: ['is being', 'has been', 'was'],
    v: '"From 1 October" là mốc TƯƠNG LAI nên dùng "will be".',
    sv: { 'is being': 'tiếp diễn không dùng với tính từ trạng thái "open" theo nghĩa này',
          'has been': 'hoàn thành nói việc đã kéo dài tới hiện tại, trái với mốc tương lai',
          was: 'quá khứ đơn trái hẳn với "from 1 October"' } },
  { so: 2, d: 'to show', m: 3, s: ['showing', 'show', 'shown'],
    v: 'Cấu trúc "be reminded TO DO something" — nhắc ai làm gì luôn đi với to V.',
    sv: { showing: '"remind" không đi với V-ing ở cấu trúc này',
          show: 'thiếu "to" sau be reminded',
          shown: 'quá khứ phân từ không hợp sau "reminded" ở đây' } },
  { so: 3, d: 'be returned', m: 3, s: ['return', 'be returning', 'have returned'],
    v: 'Sách là vật bị trả nên sau "must" phải dùng BỊ ĐỘNG: must be returned.',
    sv: { return: 'chủ động — sách không tự trả',
          'be returning': 'không có dạng "must be V-ing" mang nghĩa bị động',
          'have returned': 'chủ động hoàn thành, sai nghĩa' } },
  { so: 4, d: 'further', m: 1, s: ['farther', 'far', 'furthest'],
    v: '"Further information" là cụm cố định nghĩa "thông tin thêm". "Farther" chỉ dùng cho khoảng cách vật lí.',
    sv: { farther: 'chỉ dùng cho khoảng cách địa lí, không dùng cho thông tin',
          far: 'nguyên thể không đứng trước danh từ theo nghĩa "thêm"',
          furthest: 'so sánh nhất, không hợp với một lời mời chung' } }] },

{ ten: 'PART-TIME JOB ADVERTISEMENT — CAFÉ ASSISTANT',
  than: 'Sunrise Café is looking for a part-time assistant (1)____ can work two evenings a week. '
      + 'The successful applicant will be responsible (2)____ serving customers and keeping the '
      + 'counter tidy. Training (3)____ provided, so students with no experience are welcome. '
      + 'If you are interested, send your CV (4)____ Friday.',
  cho: [
  { so: 1, d: 'who', m: 2, s: ['which', 'whose', 'whom'],
    v: 'Đại từ quan hệ thay cho NGƯỜI và làm CHỦ NGỮ của mệnh đề quan hệ ⇒ "who".',
    sv: { which: 'chỉ dùng cho vật',
          whose: 'chỉ sở hữu, phải có danh từ theo sau',
          whom: 'chỉ dùng khi làm TÂN NGỮ, ở đây nó làm chủ ngữ của "can work"' } },
  { so: 2, d: 'for', m: 1, s: ['of', 'to', 'with'],
    v: '"Be responsible FOR + V-ing" là cụm cố định: chịu trách nhiệm làm gì.',
    sv: { of: 'không có cụm "responsible of"',
          to: '"responsible to" nghĩa là chịu trách nhiệm TRƯỚC ai, không hợp',
          with: 'không có cụm "responsible with"' } },
  { so: 3, d: 'is', m: 2, s: ['are', 'has', 'have'],
    v: '"Training" ở đây là danh từ KHÔNG đếm được nên đi với động từ số ít "is".',
    sv: { are: 'training không phải danh từ số nhiều',
          has: 'sai nghĩa, câu cần dạng bị động "is provided"',
          have: 'vừa sai số vừa sai nghĩa' } },
  { so: 4, d: 'by', m: 1, s: ['until', 'in', 'since'],
    v: '"By Friday" nghĩa là HẠN CHÓT — gửi chậm nhất vào thứ Sáu.',
    sv: { until: 'nghĩa "cho tới khi", dùng cho hành động kéo dài chứ không phải hạn chót',
          in: 'đi với tháng, năm hoặc khoảng thời gian, không đi với thứ',
          since: 'chỉ mốc bắt đầu trong quá khứ' } }] },

{ ten: 'EMAIL — SCHOOL TRIP CONFIRMATION',
  than: 'Dear parents,<br>I am writing to confirm the details of the field trip (1)____ will take place '
      + 'on 12 November. The coach (2)____ at 7 a.m. sharp, so please make sure your child arrives early. '
      + 'Students should bring a packed lunch and (3)____ clothing, as part of the day will be spent outdoors. '
      + 'We look forward (4)____ a rewarding day with the class.',
  cho: [
  { so: 1, d: 'which', m: 2, s: ['who', 'where', 'whose'],
    v: 'Thay cho "the field trip" — một sự việc, không phải người ⇒ "which".',
    sv: { who: 'chỉ dùng cho người',
          where: 'chỉ nơi chốn, mà "trip" ở đây là sự kiện chứ không phải địa điểm',
          whose: 'chỉ sở hữu, phải có danh từ theo sau' } },
  { so: 2, d: 'leaves', m: 2, s: ['is leaving', 'left', 'has left'],
    v: 'Lịch trình cố định (xe chạy đúng giờ) dùng HIỆN TẠI ĐƠN, dù nói về tương lai.',
    sv: { 'is leaving': 'tiếp diễn dùng cho kế hoạch cá nhân, không dùng cho thời gian biểu cố định',
          left: 'quá khứ đơn trái với mốc 12 tháng 11 sắp tới',
          'has left': 'hoàn thành nói việc đã xảy ra' } },
  { so: 3, d: 'suitable', m: 1, s: ['suit', 'suitably', 'suitability'],
    v: 'Trước danh từ "clothing" phải là TÍNH TỪ ⇒ "suitable".',
    sv: { suit: 'là danh từ hoặc động từ, không bổ nghĩa cho danh từ khác',
          suitably: 'trạng từ, không đứng trước danh từ',
          suitability: 'danh từ, hai danh từ ghép ở đây không thành nghĩa' } },
  { so: 4, d: 'to having', m: 3, s: ['to have', 'having', 'have'],
    v: '"Look forward TO" là giới từ nên theo sau phải là V-ing ⇒ "to having".',
    sv: { 'to have': '"to" ở đây là giới từ chứ không phải to-infinitive',
          having: 'thiếu giới từ "to" bắt buộc của cụm',
          have: 'vừa thiếu "to" vừa sai dạng' } }] },

{ ten: 'FLYER — CITY MARATHON 2026',
  than: 'Join thousands of runners at the City Marathon! Registration (1)____ online until 15 March. '
      + 'All participants (2)____ receive a T-shirt and a finisher medal. The route passes through the old '
      + 'quarter, (3)____ makes it one of the most scenic races in the region. Proceeds will go to a charity '
      + '(4)____ supports children with disabilities.',
  cho: [
  { so: 1, d: 'is open', m: 3, s: ['opens', 'has opened', 'is opening'],
    v: '"Registration is open until…" là cách nói chuẩn của thông báo: việc đăng ký đang mở tới hạn đó.',
    sv: { opens: '"open" làm động từ chỉ hành động mở ra một lần, không hợp với "until"',
          'has opened': 'nhấn việc đã mở xong, không diễn tả trạng thái còn mở',
          'is opening': 'tiếp diễn chỉ hành động đang diễn ra tại thời điểm nói' } },
  { so: 2, d: 'will', m: 2, s: ['would', 'should have', 'used to'],
    v: 'Nói việc chắc chắn xảy ra trong tương lai ⇒ "will receive".',
    sv: { would: 'dùng cho giả định hoặc quá khứ trong tương lai',
          'should have': 'nói điều đáng lẽ đã xảy ra mà không xảy ra',
          'used to': 'nói thói quen trong quá khứ' } },
  { so: 3, d: 'which', m: 2, s: ['that', 'what', 'it'],
    v: 'Mệnh đề quan hệ KHÔNG XÁC ĐỊNH thay cho cả ý đứng trước, sau dấu phẩy chỉ dùng "which".',
    sv: { that: 'không bao giờ dùng sau dấu phẩy trong mệnh đề không xác định',
          what: 'không phải đại từ quan hệ',
          it: 'sẽ tạo thành hai mệnh đề độc lập dính nhau bằng dấu phẩy — lỗi câu' } },
  { so: 4, d: 'that', m: 2, s: ['who', 'what', 'where'],
    v: 'Thay cho "a charity" — một tổ chức, dùng "that" hoặc "which" trong mệnh đề xác định.',
    sv: { who: 'chỉ dùng cho người',
          what: 'không phải đại từ quan hệ',
          where: 'chỉ nơi chốn, tổ chức ở đây là chủ thể hành động chứ không phải địa điểm' } }] },

{ ten: 'ANNOUNCEMENT — SCHOOL CLUB FAIR',
  than: 'The annual Club Fair (1)____ in the main hall next Tuesday. Over twenty clubs will set up stalls '
      + 'so that new students can find an activity (2)____ suits their interests. Members of the organising '
      + 'team have been working hard (3)____ last month to prepare the event. '
      + 'Refreshments will be (4)____ free of charge to all visitors.',
  cho: [
  { so: 1, d: 'will be held', m: 3, s: ['will hold', 'is holding', 'held'],
    v: 'Hội chợ là vật bị tổ chức nên phải bị động: will be held.',
    sv: { 'will hold': 'chủ động — hội chợ không tự tổ chức chính nó',
          'is holding': 'chủ động tiếp diễn, sai nghĩa',
          held: 'thiếu trợ động từ chỉ tương lai' } },
  { so: 2, d: 'that', m: 2, s: ['what', 'whose', 'where'],
    v: 'Mệnh đề quan hệ xác định cho "an activity" ⇒ "that" (hoặc which).',
    sv: { what: 'không phải đại từ quan hệ',
          whose: 'chỉ sở hữu, phải có danh từ theo sau',
          where: 'chỉ nơi chốn' } },
  { so: 3, d: 'since', m: 3, s: ['for', 'from', 'during'],
    v: '"Since + MỐC thời gian" (last month). "For" mới đi với KHOẢNG thời gian.',
    sv: { for: 'phải đi với khoảng: for a month',
          from: 'chỉ dùng khi có "to" đi kèm nêu điểm cuối',
          during: 'đi với danh từ chỉ giai đoạn, không dùng với hiện tại hoàn thành tiếp diễn kiểu này' } },
  { so: 4, d: 'served', m: 3, s: ['serving', 'serve', 'to serve'],
    v: 'Sau "will be" cần quá khứ phân từ để tạo bị động: will be served.',
    sv: { serving: 'sẽ thành tiếp diễn chủ động, sai nghĩa',
          serve: 'không có dạng "will be serve"',
          'to serve': 'không có dạng "will be to serve" ở nghĩa này' } }] },

{ ten: 'NOTICE — RECYCLING RULES IN THE DORMITORY',
  than: 'Students are asked (1)____ separate their waste into three bins. Paper and cardboard go in the blue '
      + 'bin, (2)____ plastic bottles belong in the yellow one. Anyone who leaves rubbish in the corridor '
      + '(3)____ be fined. The new system aims to cut the amount of waste sent to landfill (4)____ half '
      + 'by the end of the year.',
  cho: [
  { so: 1, d: 'to', m: 1, s: ['for', 'that', 'about'],
    v: '"Be asked TO DO something" — được yêu cầu làm gì.',
    sv: { for: '"ask for" nghĩa là xin cái gì, phải theo sau bởi danh từ',
          that: 'sau "be asked" ở dạng bị động này không dùng mệnh đề that',
          about: '"ask about" nghĩa là hỏi về, sai nghĩa' } },
  { so: 2, d: 'while', m: 3, s: ['so', 'because', 'unless'],
    v: '"While" ở đây nối hai vế ĐỐI CHIẾU: loại rác này thùng này, loại kia thùng kia.',
    sv: { so: 'chỉ kết quả, hai vế ở đây song song chứ không nhân quả',
          because: 'chỉ nguyên nhân, sai quan hệ',
          unless: 'nghĩa "trừ khi", sai hẳn' } },
  { so: 3, d: 'will', m: 2, s: ['would', 'might have', 'is'],
    v: 'Cảnh báo về hậu quả chắc chắn trong tương lai ⇒ "will be fined".',
    sv: { would: 'dùng cho giả định không có thật',
          'might have': 'nói khả năng trong quá khứ',
          is: 'thì hiện tại không diễn tả hậu quả sẽ áp dụng' } },
  { so: 4, d: 'by', m: 1, s: ['in', 'at', 'to'],
    v: '"Cut something BY half" — giảm ĐI một nửa. Giới từ "by" chỉ mức chênh lệch.',
    sv: { in: 'không có cụm "cut in half" theo nghĩa giảm sản lượng (cut in half chỉ việc cắt đôi vật thể)',
          at: 'không có cụm này',
          to: '"cut to half" nói mức CÒN LẠI, khác nghĩa với mức giảm' } }] },

{ ten: 'ADVERTISEMENT — ONLINE ENGLISH COURSE',
  than: 'Want to improve your English (1)____ leaving home? Our ten-week online course is designed for '
      + 'learners (2)____ want to build confidence in speaking. Each lesson lasts fifty minutes and '
      + '(3)____ by an experienced teacher. Sign up today and you (4)____ a twenty per cent discount '
      + 'on your first month.',
  cho: [
  { so: 1, d: 'without', m: 1, s: ['despite', 'although', 'instead'],
    v: '"Without + V-ing" — mà không cần làm gì.',
    sv: { despite: 'nghĩa "mặc dù", sai quan hệ ý',
          although: 'là liên từ, phải nối một mệnh đề có chủ ngữ và động từ',
          instead: 'phải có "of" mới đi được với V-ing, và nghĩa "thay vì" cũng sai' } },
  { so: 2, d: 'who', m: 2, s: ['which', 'whom', 'whose'],
    v: 'Thay cho "learners" (người) và làm chủ ngữ của "want" ⇒ "who".',
    sv: { which: 'chỉ dùng cho vật',
          whom: 'chỉ dùng khi làm tân ngữ',
          whose: 'chỉ sở hữu, phải có danh từ theo sau' } },
  { so: 3, d: 'is taught', m: 3, s: ['teaches', 'is teaching', 'teaching'],
    v: 'Bài học là vật được dạy ⇒ bị động "is taught".',
    sv: { teaches: 'chủ động — bài học không tự dạy',
          'is teaching': 'chủ động tiếp diễn, sai nghĩa',
          teaching: 'thiếu trợ động từ' } },
  { so: 4, d: 'will get', m: 2, s: ['get', 'got', 'would get'],
    v: 'Cấu trúc "mệnh lệnh + and + will": Sign up today AND you will get… (điều kiện loại 1 ẩn).',
    sv: { get: 'hiện tại đơn không diễn tả hệ quả sẽ xảy ra',
          got: 'quá khứ đơn, sai thì',
          'would get': 'giả định không có thật, không hợp với lời mời chào' } }] }
];

TD.GEN.anh = (TD.GEN.anh || []).concat([

{ ma: 'anh-that-dienvb', chuong: 'Điền từ vào văn bản', muc: 2, dang: 'mc', _dethat: 'dienvb',
  tao(R) {
    const vb = R.chon(VAN_BAN);
    const c = R.chon(vb.cho);
    /* làm nổi chỗ trống đang hỏi, các chỗ còn lại để nguyên số thứ tự */
    const than = vb.than.replace(new RegExp('\\(' + c.so + '\\)____', 'g'),
      '<b style="color:var(--kim)">(' + c.so + ') ______</b>');
    const o = MC(R,
      `Đọc văn bản sau và chọn phương án đúng cho chỗ trống <b>(${c.so})</b>:`
      + khungVB(vb.ten, than), c,
      'Dạng này chiếm 12 trên 40 câu của đề. Ngữ pháp nằm TRONG ngữ cảnh: đọc cả câu trước và câu sau '
      + 'rồi mới chọn, vì cùng một chỗ trống có thể hợp ngữ pháp mà lệch nghĩa của văn bản.');
    /* mỗi chỗ trống một mức khác nhau — mạo từ là nhận biết, bị động và cụm
       cố định là vận dụng — nên mức phải trả theo TỪNG câu, không phải theo bộ */
    o.muc = c.m || 2;
    return o;
  } },

/* ============================================================
   ③ HOÀN THÀNH ĐOẠN VĂN — điền CẢ CÂU vào chỗ trống, 5 câu trong đề
   ============================================================ */
{ ma: 'anh-that-hoanthanh', chuong: 'Hoàn thành đoạn văn', muc: 3, dang: 'mc', _dethat: 'hoanthanh',
  tao(R) {
    const ds = [

{ ten: 'Working from home',
  than: 'Working from home has become common in many countries. ______ For example, employees save the time '
      + 'and money they used to spend on commuting, and they can arrange their day around family duties. '
      + 'Employers benefit too, since they need less office space.',
  m: 3, d: 'The arrangement brings clear advantages to both sides.',
  s: ['Most companies have therefore banned it completely.',
      'Commuting by train is cheaper than driving in most cities.',
      'Office rents rose sharply during the last decade.'],
  v: 'Chỗ trống đứng trước "For example" nêu lợi ích cho CẢ nhân viên lẫn chủ — nên câu điền phải là câu '
   + 'khái quát nói về lợi ích của cả hai bên.',
  sv: { 'Most companies have therefore banned it completely.': 'trái hẳn với các ví dụ về lợi ích ở sau',
        'Commuting by train is cheaper than driving in most cities.': 'là một chi tiết lạc, không khái quát được đoạn',
        'Office rents rose sharply during the last decade.': 'chỉ liên quan tới một ý nhỏ ở cuối, không mở đầu được đoạn' } },

{ ten: 'Plastic waste',
  than: 'Every year millions of tonnes of plastic end up in the ocean. Bags and bottles break down into tiny '
      + 'pieces that fish mistake for food. ______ Scientists warn that these particles then travel up the food '
      + 'chain and reach the meals on our own plates.',
  m: 3, d: 'Once swallowed, the fragments stay in their bodies for years.',
  s: ['Plastic was first produced on a large scale in the 1950s.',
      'Many countries now export their waste to other regions.',
      'Glass bottles are heavier and cost more to transport.'],
  v: 'Câu sau bắt đầu bằng "these particles then travel up the food chain", nên câu điền phải nói về '
   + 'chuyện các mảnh nhựa NẰM LẠI trong cơ thể cá — đó là bước nối giữa "cá nuốt nhầm" và "đi lên chuỗi thức ăn".',
  sv: { 'Plastic was first produced on a large scale in the 1950s.': 'thông tin lịch sử, không nối được hai câu',
        'Many countries now export their waste to other regions.': 'đổi chủ đề sang xuất khẩu rác',
        'Glass bottles are heavier and cost more to transport.': 'so sánh với thuỷ tinh, lạc đề' } },

{ ten: 'Learning a second language',
  than: 'Learning a second language does more than open doors to travel. Studies suggest that bilingual people '
      + 'switch between tasks more easily and remember instructions better. ______ In other words, the effort '
      + 'you put into vocabulary lists may pay off in ways you never expected.',
  m: 3, d: 'Some research even links it to a later onset of memory decline in old age.',
  s: ['Grammar rules are the hardest part for most beginners.',
      'English is spoken by more than a billion people worldwide.',
      'Travelling abroad is the fastest way to become fluent.'],
  v: 'Câu sau tổng kết "may pay off in ways you never expected" — nên câu điền phải nêu thêm một lợi ích BẤT NGỜ '
   + 'nữa, tiếp mạch các lợi ích về trí nhớ ở câu trước.',
  sv: { 'Grammar rules are the hardest part for most beginners.': 'nói về khó khăn, trái mạch lợi ích',
        'English is spoken by more than a billion people worldwide.': 'là số liệu lạc, không phải lợi ích nhận thức',
        'Travelling abroad is the fastest way to become fluent.': 'nói về cách học, không phải lợi ích' } },

{ ten: 'Night-time light pollution',
  than: 'City lights make streets safer, but they also hide the night sky. ______ Migrating birds, which navigate '
      + 'by the stars, become disoriented above brightly lit cities and collide with buildings. '
      + 'Some cities have begun dimming their lights during migration season.',
  m: 3, d: 'The glow affects wildlife as much as it affects astronomers.',
  s: ['Street lamps were once powered by gas rather than electricity.',
      'Astronomers prefer to build observatories on high mountains.',
      'Birds usually build their nests in early spring.'],
  v: 'Câu sau nói về chim di cư bị ảnh hưởng, còn câu trước nói về bầu trời đêm bị che. Câu điền phải bắc cầu: '
   + 'ánh sáng ảnh hưởng tới ĐỘNG VẬT chứ không chỉ tới người quan sát sao.',
  sv: { 'Street lamps were once powered by gas rather than electricity.': 'chi tiết lịch sử, không bắc cầu được',
        'Astronomers prefer to build observatories on high mountains.': 'chỉ nối được với vế thiên văn, bỏ rơi vế chim',
        'Birds usually build their nests in early spring.': 'nói về làm tổ, không liên quan tới ánh sáng' } },

{ ten: 'The four-day week',
  than: 'Several companies have tested a four-day working week with no cut in pay. ______ Staff reported lower '
      + 'stress levels, and in most trials output stayed the same or rose slightly. Critics argue, however, that '
      + 'the model suits office work far better than hospitals or factories.',
  m: 3, d: 'The results have surprised many managers who expected productivity to fall.',
  s: ['Weekends were introduced in Britain in the nineteenth century.',
      'Most employees would prefer a higher salary to extra time off.',
      'Factories usually run three shifts a day to meet demand.'],
  v: 'Câu sau nêu KẾT QUẢ thử nghiệm (bớt căng thẳng, năng suất không giảm), nên câu điền phải giới thiệu '
   + 'chính kết quả đó và tương phản với dự đoán ban đầu.',
  sv: { 'Weekends were introduced in Britain in the nineteenth century.': 'thông tin lịch sử, không dẫn vào kết quả',
        'Most employees would prefer a higher salary to extra time off.': 'trái với mạch ủng hộ ở sau',
        'Factories usually run three shifts a day to meet demand.': 'chỉ nối được với câu cuối, không nối câu trước' } },

{ ten: 'Street food and tourism',
  than: 'For many visitors, a bowl of noodles on a plastic stool is the highlight of the trip. ______ '
      + 'Local authorities in several cities have responded by mapping food streets and offering hygiene '
      + 'training to vendors, so that the tradition survives without putting anyone at risk.',
  m: 3, d: 'Yet the same stalls raise questions about food safety and street order.',
  s: ['Noodles are usually served with fresh herbs and lime.',
      'Hotels in the old quarter are fully booked every summer.',
      'Cooking at home is generally cheaper than eating out.'],
  v: 'Câu sau nói chính quyền PHẢN ỨNG bằng cách tập huấn vệ sinh — nên câu điền phải nêu VẤN ĐỀ '
   + '(an toàn thực phẩm, trật tự đường phố) để có cái mà phản ứng.',
  sv: { 'Noodles are usually served with fresh herbs and lime.': 'là chi tiết ẩm thực, không nêu vấn đề',
        'Hotels in the old quarter are fully booked every summer.': 'lạc sang chuyện lưu trú',
        'Cooking at home is generally cheaper than eating out.': 'so sánh chi phí, không liên quan' } }

    ];
    const it = R.chon(ds);
    const than = it.than.replace('______', '<b style="color:var(--kim)">______</b>');
    const o = MC(R, 'Đọc đoạn văn sau và chọn câu thích hợp nhất điền vào chỗ trống:'
      + khungVB(it.ten, than), it,
      'Dạng này 5 câu trong đề. Luôn đọc CÂU NGAY SAU chỗ trống trước: từ nối (For example, In other words, '
      + 'Yet, therefore) và đại từ (these, the same, it) sẽ chỉ thẳng ra câu cần điền.');
    o.muc = it.m || 3;
    return o;
  } },

/* ============================================================
   ④ ĐỌC HIỂU — 18 câu trong đề, chia hai bài 8 và 10 câu
   ============================================================ */
{ ma: 'anh-that-dochieu', chuong: 'Đọc hiểu', muc: 3, dang: 'mc', _dethat: 'dochieu',
  tao(R) {
    const BAI = [

{ ten: 'Reading Passage — Urban farming',
  than: 'In cities around the world, rooftops and empty lots are being turned into farms. Urban farming began '
      + 'as a hobby for a handful of enthusiasts, but it has grown into a small industry. Supporters point out '
      + 'that food grown a few streets away needs no refrigerated lorry, so it arrives fresher and with a much '
      + 'smaller carbon footprint. City farms also give neighbours a shared project, and several studies have '
      + 'found that people who garden together report stronger ties to the place where they live.<br><br>'
      + 'Not everyone is convinced. Land in the centre of a city is expensive, and a rooftop plot can rarely '
      + 'produce enough to feed even the building below it. Critics argue that the same money spent on rural '
      + 'farms would yield far more food. Defenders reply that the point is not to replace the countryside '
      + 'but to change how city dwellers think about what they eat. A child who has pulled a carrot out of the '
      + 'soil, they say, is unlikely to see vegetables the same way again.',
  hoi: [
  { q: 'What is the passage mainly about?',
    m: 4, d: 'The benefits and the limits of growing food in cities',
    s: ['A step-by-step guide to starting a rooftop garden',
        'The reasons rural farms are becoming less productive',
        'How refrigerated transport changed the food industry'],
    v: 'Đoạn một nêu lợi ích, đoạn hai nêu phản đối và lời đáp lại — tức bài bàn cả MẶT LỢI lẫn GIỚI HẠN.',
    sv: { 'A step-by-step guide to starting a rooftop garden': 'bài không hướng dẫn bước nào cả',
          'The reasons rural farms are becoming less productive': 'bài không nói nông thôn kém năng suất đi',
          'How refrigerated transport changed the food industry': 'xe lạnh chỉ được nhắc một lần làm ví dụ' } },
  { q: 'According to paragraph 1, food grown in the city arrives fresher because it', 
    m: 1, d: 'does not need to be transported over long distances',
    s: ['is harvested by professional farmers',
        'is stored in refrigerated lorries',
        'is grown only during the summer'],
    v: 'Bài viết: "needs no refrigerated lorry, so it arrives fresher" — vì không phải chở xa.',
    sv: { 'is harvested by professional farmers': 'bài nói người trồng là dân nghiệp dư và hàng xóm',
          'is stored in refrigerated lorries': 'ngược hẳn — bài nói KHÔNG cần xe lạnh',
          'is grown only during the summer': 'bài không nhắc tới mùa vụ' } },
  { q: 'According to paragraph 2, what do critics of urban farming say about the money spent on it?',
    m: 1, d: 'The same money would produce more food on rural farms',
    s: ['It should be spent on refrigerated transport instead',
        'It is usually provided by the city council',
        'It has already been repaid by ticket sales'],
    v: 'Bài viết: "Critics argue that the same money spent on rural farms would yield far more food."',
    sv: { 'It should be spent on refrigerated transport instead': 'xe lạnh chỉ được nhắc ở đoạn 1 làm ví dụ',
          'It is usually provided by the city council': 'bài không nhắc tới nguồn tiền',
          'It has already been repaid by ticket sales': 'bài không nhắc tới bán vé' } },
  { q: 'According to paragraph 1, what did several studies find about people who garden together?',
    m: 1, d: 'They feel more strongly connected to their neighbourhood',
    s: ['They eat more vegetables than other city dwellers',
        'They spend less money on food each month',
        'They are more likely to move to the countryside'],
    v: 'Bài viết: "people who garden together report stronger ties to the place where they live."',
    sv: { 'They eat more vegetables than other city dwellers': 'bài không so sánh lượng rau ăn vào',
          'They spend less money on food each month': 'bài không nói tới chi tiêu',
          'They are more likely to move to the countryside': 'bài không nhắc tới việc chuyển đi' } },
  { q: 'The word "yield" in paragraph 2 is closest in meaning to',
    d: 'produce', m: 2, s: ['waste', 'cost', 'store'],
    v: '"Would yield far more food" nghĩa là "sẽ cho ra nhiều lương thực hơn" ⇒ produce.',
    sv: { waste: 'nghĩa lãng phí, trái với mạch so sánh hiệu quả',
          cost: 'nghĩa tốn kém, không thay được vào chỗ đó',
          store: 'nghĩa cất trữ, sai nghĩa' } },
  { q: 'The word "they" in the last sentence of paragraph 2 refers to',
    d: 'defenders of urban farming', m: 2, s: ['critics', 'children', 'city dwellers'],
    v: 'Câu trước là "Defenders reply that…", nên "they say" ở câu cuối vẫn là những người BẢO VỆ nông nghiệp đô thị.',
    sv: { critics: 'người phản đối đã hết lượt nói ở câu trước đó',
          children: 'đứa trẻ là ví dụ được nói TỚI, không phải người nói',
          'city dwellers': 'là đối tượng được bàn, không phải chủ thể của "say"' } },
  { q: 'Which of the following can be inferred from the passage?',
    m: 4, d: 'Urban farming is valued for its social and educational effects as much as for its output',
    s: ['Urban farms now supply most of the vegetables eaten in large cities',
        'City councils have banned farming on rooftops for safety reasons',
        'Rural farmers have started moving their businesses into cities'],
    v: 'Bài nhấn mạnh gắn kết hàng xóm và chuyện đứa trẻ nhổ củ cà rốt — tức giá trị XÃ HỘI và GIÁO DỤC '
     + 'được coi trọng ngang sản lượng.',
    sv: { 'Urban farms now supply most of the vegetables eaten in large cities': 'trái hẳn — bài nói sân thượng khó nuôi nổi chính toà nhà',
          'City councils have banned farming on rooftops for safety reasons': 'bài không nhắc tới lệnh cấm nào',
          'Rural farmers have started moving their businesses into cities': 'bài không nói tới việc này' } }] },

{ ten: 'Reading Passage — The rise of the second-hand market',
  than: 'A decade ago, buying used clothes was mostly a way to save money. Today it has become a statement. '
      + 'Online platforms let sellers photograph a jacket in the morning and post it to a buyer in another city '
      + 'by the evening, and the market for second-hand fashion is now growing several times faster than the '
      + 'market for new clothes.<br><br>'
      + 'Two forces explain the shift. The first is price: young shoppers facing high rents are quick to notice '
      + 'that a used coat costs a fraction of a new one. The second is conscience. Textile production consumes '
      + 'enormous quantities of water and dye, and a garment worn twice before being thrown away is hard to '
      + 'defend. Buying second-hand lets shoppers keep up with fashion without adding to that pile.<br><br>'
      + 'The trend is not without its critics. Some argue that cheap resale simply encourages people to buy '
      + 'more overall, because a wardrobe that can be sold on feels less like a commitment. Others note that '
      + 'the most worn-out items still end up in landfill, merely a little later than before.',
  hoi: [
  { q: 'What is the main purpose of the passage?',
    m: 4, d: 'To explain why second-hand shopping has grown and what doubts remain about it',
    s: ['To advise readers on how to sell clothes online',
        'To compare the prices of new and used coats in detail',
        'To describe the technology behind delivery services'],
    v: 'Đoạn 2 giải thích hai lí do tăng trưởng, đoạn 3 nêu các ý kiến phản biện — đúng cấu trúc "vì sao tăng '
     + 'và còn nghi ngại gì".',
    sv: { 'To advise readers on how to sell clothes online': 'bài không đưa lời khuyên bán hàng nào',
          'To compare the prices of new and used coats in detail': 'giá chỉ được nhắc một câu làm lí do',
          'To describe the technology behind delivery services': 'chuyện giao hàng chỉ là chi tiết minh hoạ' } },
  { q: 'According to paragraph 2, the second reason for the shift is',
    m: 1, d: 'concern about the environmental cost of making clothes',
    s: ['the rising rent that young people have to pay',
        'the speed of modern delivery services',
        'the poor quality of newly made garments'],
    v: '"The second is conscience" rồi giải thích nước và thuốc nhuộm — tức mối lo về MÔI TRƯỜNG.',
    sv: { 'the rising rent that young people have to pay': 'đó là lí do THỨ NHẤT (giá cả)',
          'the speed of modern delivery services': 'nằm ở đoạn 1, không phải một trong hai lí do',
          'the poor quality of newly made garments': 'bài không chê chất lượng đồ mới' } },
  { q: 'According to paragraph 1, how fast is the second-hand fashion market growing?',
    m: 1, d: 'Several times faster than the market for new clothes',
    s: ['At about the same speed as the market for new clothes',
        'Slightly more slowly than a decade ago',
        'Twice as fast as the online delivery business'],
    v: 'Bài viết: "growing several times faster than the market for new clothes."',
    sv: { 'At about the same speed as the market for new clothes': 'bài nói nhanh hơn NHIỀU LẦN',
          'Slightly more slowly than a decade ago': 'trái hẳn với mạch tăng trưởng',
          'Twice as fast as the online delivery business': 'bài không so sánh với ngành giao hàng' } },
  { q: 'According to paragraph 3, what do some critics say about cheap resale?',
    m: 1, d: 'It may encourage people to buy more clothes overall',
    s: ['It makes new clothes more expensive to produce',
        'It has been banned on most online platforms',
        'It only works for expensive designer items'],
    v: 'Bài viết: "cheap resale simply encourages people to buy more overall."',
    sv: { 'It makes new clothes more expensive to produce': 'bài không nói tới giá sản xuất đồ mới',
          'It has been banned on most online platforms': 'bài không nhắc tới lệnh cấm',
          'It only works for expensive designer items': 'bài không giới hạn ở hàng hiệu' } },
  { q: 'The phrase "that pile" in paragraph 2 refers to',
    d: 'discarded clothing', m: 2, s: ['unsold stock in shops', 'water used in factories', 'money saved by shoppers'],
    v: '"A garment worn twice before being thrown away" — đống ở đây là đống quần áo BỊ VỨT ĐI.',
    sv: { 'unsold stock in shops': 'bài không nhắc tới hàng tồn',
          'water used in factories': 'nước là tài nguyên bị tiêu tốn, không tạo thành "đống"',
          'money saved by shoppers': 'tiền tiết kiệm không phải thứ chất đống theo nghĩa này' } },
  { q: 'Which of the following best describes the tone of the last paragraph?',
    d: 'Cautious', m: 2, s: ['Enthusiastic', 'Angry', 'Humorous'],
    v: 'Đoạn cuối nêu hai lời phản biện một cách điềm đạm ("Some argue…", "Others note…") ⇒ giọng THẬN TRỌNG.',
    sv: { Enthusiastic: 'không có từ ngữ hào hứng nào ở đoạn cuối',
          Angry: 'không có lời chỉ trích gay gắt',
          Humorous: 'không có yếu tố hài hước' } },
  { q: 'It can be inferred from the passage that the writer believes second-hand shopping',
    m: 4, d: 'helps but does not solve the problem of textile waste',
    s: ['will soon replace the market for new clothes entirely',
        'is chosen mainly by people who cannot afford new items',
        'has no measurable effect on the environment'],
    v: 'Tác giả ghi nhận lợi ích ở đoạn 2 nhưng kết bằng ý "đồ rách vẫn ra bãi rác, chỉ muộn hơn một chút" — '
     + 'tức giúp được nhưng không giải quyết triệt để.',
    sv: { 'will soon replace the market for new clothes entirely': 'bài chỉ nói tăng nhanh hơn, không nói thay thế',
          'is chosen mainly by people who cannot afford new items': 'trái với câu mở đầu "today it has become a statement"',
          'has no measurable effect on the environment': 'trái với cả đoạn 2' } }] },

{ ten: 'Reading Passage — Sleep and the teenage brain',
  than: 'Parents often complain that teenagers cannot get out of bed. Sleep researchers say the problem is not '
      + 'laziness but biology. During adolescence the body clock shifts by one to two hours, so a teenager who '
      + 'feels wide awake at eleven at night is not being stubborn; the hormone that triggers sleepiness simply '
      + 'arrives later than it did in childhood.<br><br>'
      + 'The trouble is that school still starts early. A student who falls asleep at midnight and is woken at '
      + 'six loses around two hours of the sleep the brain uses to store what was learned the day before. '
      + 'Several districts in the United States moved their start times back by an hour and reported fewer late '
      + 'arrivals, better attendance and, in some schools, higher grades.<br><br>'
      + 'Changing the timetable, however, is not simple. Later starts push sports practice into the evening and '
      + 'clash with the working hours of parents who drive their children to school. For now, most researchers '
      + 'advise families to protect the hour before bed instead: no bright screens, no heavy homework, and a '
      + 'consistent time to switch off the light.',
  hoi: [
  { q: 'According to paragraph 1, teenagers stay up late mainly because',
    m: 1, d: 'their internal body clock shifts during adolescence',
    s: ['they choose to ignore their parents',
        'they have too much homework to finish',
        'they drink caffeine in the evening'],
    v: 'Bài nói rõ "the body clock shifts by one to two hours" và hormone gây buồn ngủ đến muộn hơn.',
    sv: { 'they choose to ignore their parents': 'bài bác bỏ hẳn cách hiểu "lười hay bướng"',
          'they have too much homework to finish': 'bài tập chỉ được nhắc ở đoạn 3 như lời khuyên',
          'they drink caffeine in the evening': 'bài không nhắc tới caffeine' } },
  { q: 'According to paragraph 2, how much sleep does a student lose in the example given?',
    m: 1, d: 'About two hours', s: ['About four hours', 'About thirty minutes', 'A whole night'],
    v: 'Bài viết: "falls asleep at midnight and is woken at six loses around two hours of the sleep".',
    sv: { 'About four hours': 'bài ghi rõ khoảng hai tiếng',
          'About thirty minutes': 'quá ít so với con số trong bài',
          'A whole night': 'bài không nói mất trắng cả đêm' } },
  { q: 'According to paragraph 1, how much does the body clock shift during adolescence?',
    m: 1, d: 'By one to two hours', s: ['By three to four hours', 'By about ten minutes', 'It does not shift at all'],
    v: 'Bài viết: "the body clock shifts by one to two hours".',
    sv: { 'By three to four hours': 'lớn hơn con số trong bài',
          'By about ten minutes': 'nhỏ hơn hẳn con số trong bài',
          'It does not shift at all': 'trái hẳn với luận điểm chính của đoạn' } },
  { q: 'The word "it" in paragraph 1 refers to',
    d: 'the hormone that triggers sleepiness', m: 2, s: ['the body clock', 'adolescence', 'the teenager'],
    v: 'Cụm đầy đủ là "the hormone … simply arrives later than IT did in childhood" — "it" thay cho chính hormone đó.',
    sv: { 'the body clock': 'đồng hồ sinh học là thứ dịch chuyển, không phải thứ "arrives"',
          adolescence: 'là giai đoạn, không "đến muộn hơn"',
          'the teenager': 'người không phải chủ thể của động từ "arrive" ở đây' } },
  { q: 'What did some American school districts find after starting classes later?',
    m: 1, d: 'Attendance improved and some schools saw better grades',
    s: ['Students went to bed even later than before',
        'Parents refused to send their children to school',
        'Sports practice had to be cancelled altogether'],
    v: 'Bài viết: "reported fewer late arrivals, better attendance and, in some schools, higher grades".',
    sv: { 'Students went to bed even later than before': 'bài không nêu kết quả này',
          'Parents refused to send their children to school': 'bài chỉ nói giờ làm của phụ huynh bị lệch',
          'Sports practice had to be cancelled altogether': 'bài nói tập thể thao bị đẩy sang buổi tối, không bị huỷ' } },
  { q: 'Which of the following is NOT mentioned as a difficulty of starting school later?',
    m: 3, d: 'Teachers would need to be paid more',
    s: ['Sports practice moves into the evening',
        'Parents\u2019 working hours no longer match',
        'Families have to rearrange the school run'],
    v: 'Bài nêu tập thể thao buổi tối và giờ làm của phụ huynh; chuyện TRẢ LƯƠNG giáo viên không hề được nhắc.',
    sv: { 'Sports practice moves into the evening': 'có nêu ở đoạn 3',
          'Parents\u2019 working hours no longer match': 'có nêu ở đoạn 3',
          'Families have to rearrange the school run': 'chính là ý "parents who drive their children to school"' } },
  { q: 'What do most researchers currently recommend?',
    m: 1, d: 'Keeping the last hour before bed calm and screen-free',
    s: ['Moving every school start time back by two hours',
        'Allowing students to sleep during the first lesson',
        'Giving teenagers coffee in the morning'],
    v: 'Đoạn cuối: "protect the hour before bed instead: no bright screens, no heavy homework, and a consistent time".',
    sv: { 'Moving every school start time back by two hours': 'bài nói việc đổi giờ KHÔNG đơn giản nên mới khuyên cách khác',
          'Allowing students to sleep during the first lesson': 'bài không đề xuất điều này',
          'Giving teenagers coffee in the morning': 'bài không nhắc tới cà phê' } }] }

    ];
    const bai = R.chon(BAI);
    const h = R.chon(bai.hoi);
    const o = MC(R, 'Đọc bài sau và chọn phương án đúng:' + khungVB(bai.ten, bai.than)
      + `<div style="margin-top:8px"><b>${h.q}</b></div>`, h,
      'Đọc hiểu chiếm 18 trên 40 câu — gần một nửa đề. Thứ tự câu hỏi thường bám theo thứ tự đoạn văn, '
      + 'trừ câu hỏi ý chính và câu hỏi suy luận. Câu hỏi từ vựng thì thay từng phương án vào đúng chỗ đó '
      + 'rồi đọc lại cả câu, đừng dịch từ rời.');
    /* câu chi tiết là thông hiểu, câu từ vựng và tham chiếu là vận dụng,
       câu ý chính và suy luận là vận dụng cao — mức phải theo LOẠI câu hỏi */
    o.muc = h.m || 3;
    return o;
  } }

]);

/* ============================================================
   BỘ SINH CÂU RỜI CHỈ DÙNG ĐỂ LUYỆN, KHÔNG VÀO ĐỀ
   Ngữ pháp vẫn phải học — đề vẫn kiểm tra nó, chỉ là kiểm tra bên
   trong văn bản. Nên giữ nguyên các bộ sinh câu rời cho Luyện Công
   và Tà Đạo, nhưng chặn không cho vào đề Độ Kiếp.
   ============================================================ */
(function () {
  const VAO_DE = ['anh-that-dienvb', 'anh-that-hoanthanh', 'anh-that-dochieu',
                  'anh-sapxep', 'anh-chencau', 'anh-tomtat', 'anh-vdc-cloze', 'anh-vdc-doanvan'];
  (TD.GEN.anh || []).forEach(t => { if (VAO_DE.indexOf(t.ma) < 0) t._luyen = true; });
})();
})();
