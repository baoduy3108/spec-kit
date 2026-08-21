/* ============================================================
   TIẾNG ANH — MẪU ĐỀ BÀI TẬP TỰ SINH
   Bám cấu trúc đề TỪ NĂM 2025: 40 câu / 50 phút, gồm điền từ – cụm ngắn
   (12 câu), sắp xếp câu (5), điền câu – cụm dài (5) và đọc hiểu (18).
   Các dạng NGỮ ÂM, TRỌNG ÂM, TÌM LỖI SAI, VIẾT LẠI CÂU, chọn từ đồng
   nghĩa – trái nghĩa và hoàn thành hội thoại ĐÃ BỊ LOẠI khỏi đề, nên
   không dựng mẫu đề cho chúng nữa.
   Ba nguồn: kho 1000+ từ vựng · kho collocation · các bảng ngữ pháp
   dựng riêng cho từng chuyên đề (thì, điều kiện, bị động, tường thuật,
   mệnh đề quan hệ, đảo ngữ, word form, ngữ âm, trọng âm, tìm lỗi sai).
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const MC = (R, de, it, meo) => {
  const opts = TD.xaoR(R, [it.d].concat(it.s));
  return { q: de, opts: opts, ans: opts.indexOf(it.d),
    giai: `Đáp án: ${it.d}\n${it.v}`, meo: meo };
};

/* ---------- 1. Từ vựng: từ → nghĩa và nghĩa → từ ---------- */
const theoCD = {};
(TD.KHO_TU || []).forEach(x => { (theoCD[x.cd] = theoCD[x.cd] || []).push(x); });

const nhieuTu = (R, x, lay) => {
  /* phương án nhiễu: cùng chủ đề và cùng loại từ trước, thiếu thì mở rộng ra cả kho */
  let bo = (theoCD[x.cd] || []).filter(y => y.w !== x.w && y.l === x.l && y.n !== x.n);
  if (bo.length < 3) bo = (TD.KHO_TU || []).filter(y => y.w !== x.w && y.l === x.l && y.n !== x.n);
  if (bo.length < 3) bo = (TD.KHO_TU || []).filter(y => y.w !== x.w && y.n !== x.n);
  if (bo.length < 3) return null;
  /* Kho hơn 2000 từ nên có những từ khác nhau mà nghĩa tiếng Việt trùng nhau.
     Phải lọc để bốn phương án đôi một khác nhau, nếu không câu hỏi có hai đáp án đúng. */
  const ra = [], daCo = { [lay(x)]: 1 };
  for (const y of TD.xaoR(R, bo)) {
    const v = lay(y);
    if (daCo[v]) continue;
    daCo[v] = 1; ra.push(v);
    if (ra.length === 3) return ra;
  }
  return null;
};

TD.GEN.anh = (TD.GEN.anh || []).concat([

{ ma: 'anh-nghia', chuong: 'Từ loại', muc: 1, dang: 'mc',
  tao(R) {
    const kho = TD.KHO_TU || [];
    if (kho.length < 8) return null;
    const x = R.chon(kho);
    const s = nhieuTu(R, x, y => y.n);
    if (!s) return null;
    return MC(R, `Từ "<b>${x.w}</b>" (${x.l}) có nghĩa là gì?`,
      { d: x.n, s: s, v: `${x.w} (${x.l}) = ${x.n}. Thuộc chủ đề: ${x.cd}.` },
      'Học từ theo CHỦ ĐỀ và theo CỤM, đừng học rời từng từ — đề đọc hiểu luôn xoay quanh một chủ đề nhất định.');
  } },

{ ma: 'anh-tu', chuong: 'Từ loại', muc: 2, dang: 'mc',
  tao(R) {
    const kho = TD.KHO_TU || [];
    if (kho.length < 8) return null;
    const x = R.chon(kho);
    const s = nhieuTu(R, x, y => y.w);
    if (!s) return null;
    return MC(R, `Từ tiếng Anh nào mang nghĩa "<b>${x.n}</b>"? (${x.l})`,
      { d: x.w, s: s, v: `${x.n} = ${x.w} (${x.l}). Thuộc chủ đề: ${x.cd}.` },
      'Nhớ được nghĩa Việt → Anh mới viết được câu. Chỉ nhận ra mặt chữ thì chỉ đủ cho phần đọc hiểu.');
  } },

{ ma: 'anh-colloc', chuong: 'Ngữ pháp khác', muc: 3, dang: 'mc',
  tao(R) {
    const kho = (TD.KHO_COLLOC || []).filter(x => x.nhom === 'make / do / take / have');
    if (kho.length < 8) return null;
    const x = R.chon(kho);
    const s = ['make', 'do', 'take', 'have'].filter(v => v !== x.tu);
    return MC(R, `Chọn động từ đúng: "____ ${x.cum}" (${x.n})`,
      { d: x.tu, s: s, v: `Cụm chuẩn là "<b>${x.tu} ${x.cum}</b>" = ${x.n}.\n`
        + `make/do/take/have là bốn động từ đi kèm rất nhiều danh từ khác nhau, phải học thuộc theo cụm.` },
      'make thiên về TẠO RA cái mới (a decision, progress); do thiên về THỰC HIỆN công việc '
      + '(homework, research); take thiên về NHẬN/CHIẾM (part in, care of, place).');
  } },

{ ma: 'anh-colloc-cum', chuong: 'Ngữ pháp khác', muc: 3, dang: 'mc',
  tao(R) {
    /* mọi nhóm collocation trừ hai nhóm đã có mẫu riêng */
    const kho = (TD.KHO_COLLOC || []).filter(x =>
      x.nhom !== 'make / do / take / have' &&
      x.nhom.indexOf('giới từ') < 0);
    if (kho.length < 8) return null;
    const x = R.chon(kho);
    const cung = kho.filter(y => y.nhom === x.nhom && y.tu !== x.tu && y.cum !== x.cum);
    if (cung.length < 3) return null;
    const s = R.chonNhieu(cung, 3).map(y => y.tu);
    if (new Set(s.concat([x.tu])).size !== 4) return null;
    return MC(R, `Chọn từ đúng để hoàn thành cụm: "____ ${x.cum}" (${x.n})`,
      { d: x.tu, s: s, v: `Cụm chuẩn: <b>${x.tu} ${x.cum}</b> = ${x.n}.\nNhóm: ${x.nhom}.` },
      'Collocation là chỗ người Việt hay dịch từng chữ rồi ghép sai. '
      + 'Học theo CỤM và theo NHÓM, đừng học từng từ rời.');
  } },

{ ma: 'anh-colloc-nghia', chuong: 'Ngữ pháp khác', muc: 2, dang: 'mc',
  tao(R) {
    const kho = TD.KHO_COLLOC || [];
    if (kho.length < 8) return null;
    const x = R.chon(kho);
    const khac = kho.filter(y => y.n !== x.n);
    if (khac.length < 3) return null;
    const s = R.chonNhieu(khac, 3).map(y => y.n);
    if (new Set(s.concat([x.n])).size !== 4) return null;
    return MC(R, `Cụm "<b>${x.tu} ${x.cum}</b>" có nghĩa là gì?`,
      { d: x.n, s: s, v: `${x.tu} ${x.cum} = ${x.n}. Nhóm: ${x.nhom}.` },
      'Biết nghĩa của cụm mới dùng đúng trong bài điền từ. '
      + 'Nhiều cụm nghĩa không suy ra được từ nghĩa các từ thành phần.');
  } },

{ ma: 'anh-gioitu', chuong: 'Ngữ pháp khác', muc: 2, dang: 'mc',
  tao(R) {
    const kho = (TD.KHO_COLLOC || []).filter(x => x.nhom === 'Tính từ + giới từ' || x.nhom === 'Động từ + giới từ');
    if (kho.length < 8) return null;
    const x = R.chon(kho);
    const moi = ['at', 'in', 'on', 'of', 'for', 'to', 'with', 'from', 'about'];
    const s = R.chonNhieu(moi.filter(g => g !== x.cum), 3);
    return MC(R, `Điền giới từ đúng: "${x.tu} ____" (${x.n})`,
      { d: x.cum, s: s, v: `Cụm chuẩn: <b>${x.tu} ${x.cum}</b> = ${x.n}.` },
      'Giới từ không suy luận được, phải học thuộc theo cụm. Nhóm hay ra thi nhất: '
      + 'good AT · interested IN · afraid OF · famous FOR · similar TO · satisfied WITH · different FROM.');
  } },

/* ---------- 2. Ngữ pháp theo chuyên đề ---------- */
{ ma: 'anh-thi', chuong: 'Thì động từ', muc: 2, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'She ____ in this company since 2019.', d: 'has worked', s: ['worked', 'works', 'is working'],
        v: '"since + mốc thời gian" là dấu hiệu của thì hiện tại hoàn thành: has/have + V3.' },
      { q: 'By the time we arrived, the film ____.', d: 'had already started', s: ['already started', 'has already started', 'was already starting'],
        v: 'Hành động xảy ra TRƯỚC một mốc quá khứ khác ⇒ quá khứ hoàn thành: had + V3.' },
      { q: 'Look at those clouds! It ____ rain.', d: 'is going to', s: ['will', 'would', 'is raining'],
        v: 'Có DẤU HIỆU nhìn thấy được ở hiện tại ⇒ dự đoán bằng "be going to", không dùng "will".' },
      { q: 'This time next week I ____ on the beach.', d: 'will be lying', s: ['will lie', 'am lying', 'have lain'],
        v: '"This time next week" là mốc trong tương lai ⇒ tương lai tiếp diễn: will be + V-ing.' },
      { q: 'He ____ his homework before his mother came home.', d: 'had finished', s: ['finished', 'has finished', 'was finishing'],
        v: 'Xong TRƯỚC một hành động quá khứ khác ⇒ quá khứ hoàn thành.' },
      { q: 'Water ____ at 100 degrees Celsius.', d: 'boils', s: ['is boiling', 'boiled', 'has boiled'],
        v: 'Chân lí, sự thật hiển nhiên luôn dùng hiện tại đơn.' },
      { q: 'I ____ English for five years and I still find it hard.', d: 'have been learning', s: ['learn', 'learned', 'am learning'],
        v: 'Nhấn mạnh quá trình KÉO DÀI từ quá khứ tới hiện tại ⇒ hiện tại hoàn thành tiếp diễn.' },
      { q: 'When I ____ him yesterday, he was reading a book.', d: 'saw', s: ['have seen', 'was seeing', 'had seen'],
        v: '"yesterday" là mốc quá khứ xác định ⇒ quá khứ đơn cắt ngang hành động đang diễn ra.' },
      { q: 'She said she ____ me the next day.', d: 'would call', s: ['will call', 'calls', 'called'],
        v: 'Lời nói gián tiếp lùi thì: will → would; tomorrow → the next day.' },
      { q: 'It is the first time I ____ such a beautiful place.', d: 'have visited', s: ['visited', 'visit', 'had visited'],
        v: 'Sau "It is the first time" bắt buộc dùng hiện tại hoàn thành.' }
    ]);
    return MC(R, `Chọn dạng đúng của động từ:\n\n${it.q}`, it,
      'Tìm DẤU HIỆU thời gian trước khi chọn thì: since/for/already ⇒ hoàn thành · '
      + 'yesterday/ago ⇒ quá khứ đơn · by the time + quá khứ ⇒ quá khứ hoàn thành.');
  } },

{ ma: 'anh-dieukien', chuong: 'Câu điều kiện', muc: 3, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'If it ____ tomorrow, we will cancel the trip.', d: 'rains', s: ['will rain', 'rained', 'would rain'],
        v: 'Điều kiện loại 1: If + hiện tại đơn, S + will + V. Sau "if" KHÔNG dùng "will".' },
      { q: 'If I ____ you, I would accept the offer.', d: 'were', s: ['am', 'will be', 'had been'],
        v: 'Điều kiện loại 2 (giả định trái hiện tại) dùng "were" cho mọi ngôi.' },
      { q: 'If she had studied harder, she ____ the exam.', d: 'would have passed', s: ['would pass', 'will pass', 'passed'],
        v: 'Điều kiện loại 3 (trái với quá khứ): If + had + V3, S + would have + V3.' },
      { q: 'If he had taken the medicine, he ____ fine now.', d: 'would be', s: ['would have been', 'will be', 'is'],
        v: 'Điều kiện HỖN HỢP: vế if loại 3 (quá khứ) nhưng kết quả ở HIỆN TẠI ("now") ⇒ would + V.' },
      { q: '____ I known about the meeting, I would have come.', d: 'Had', s: ['If', 'Should', 'Were'],
        v: 'Đảo ngữ điều kiện loại 3: bỏ "if", đưa "had" lên trước chủ ngữ.' },
      { q: '____ you need any help, please call me.', d: 'Should', s: ['Had', 'Were', 'Would'],
        v: 'Đảo ngữ điều kiện loại 1: Should + S + V (nguyên thể).' },
      { q: 'I wish I ____ how to swim.', d: 'knew', s: ['know', 'have known', 'will know'],
        v: 'Wish về HIỆN TẠI dùng thì quá khứ đơn (giả định trái thực tế).' },
      { q: 'She wishes she ____ harder last year.', d: 'had studied', s: ['studied', 'has studied', 'would study'],
        v: 'Wish về QUÁ KHỨ dùng quá khứ hoàn thành: had + V3.' },
      { q: '____ you hurry, you will miss the bus.', d: 'Unless', s: ['If', 'Provided', 'As long as'],
        v: '"Unless" = "If … not". Câu mang nghĩa "nếu bạn KHÔNG nhanh lên".' }
    ]);
    return MC(R, `Chọn phương án đúng:\n\n${it.q}`, it,
      'Ba loại chuẩn: ① có thật ở tương lai · ② trái hiện tại · ③ trái quá khứ. '
      + 'Thấy trạng từ "now" trong vế chính mà vế if ở quá khứ hoàn thành ⇒ câu HỖN HỢP.');
  } },

{ ma: 'anh-bidong', chuong: 'Bị động – Tường thuật', muc: 3, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'They built this bridge in 1990.', d: 'This bridge was built in 1990.',
        s: ['This bridge is built in 1990.', 'This bridge has been built in 1990.', 'This bridge was build in 1990.'],
        v: 'Quá khứ đơn chủ động → bị động: was/were + V3. "build" phải chia thành "built".' },
      { q: 'People say that he is very rich.', d: 'He is said to be very rich.',
        s: ['He is said to being very rich.', 'He said to be very rich.', 'He is saying to be very rich.'],
        v: 'Bị động kép: S + be + V3(say/think/believe) + to V.' },
      { q: 'They made him work overtime.', d: 'He was made to work overtime.',
        s: ['He was made work overtime.', 'He was make to work overtime.', 'He made to work overtime.'],
        v: 'Với "make", chủ động bỏ "to" nhưng bị động PHẢI thêm "to".' },
      { q: 'Someone is cleaning the room now.', d: 'The room is being cleaned now.',
        s: ['The room is cleaned now.', 'The room has been cleaned now.', 'The room was being cleaned now.'],
        v: 'Hiện tại tiếp diễn bị động: is/are + being + V3.' },
      { q: 'They have completed the project.', d: 'The project has been completed.',
        s: ['The project has completed.', 'The project was been completed.', 'The project is completed by them.'],
        v: 'Hiện tại hoàn thành bị động: has/have + been + V3.' },
      { q: 'You must finish the report today.', d: 'The report must be finished today.',
        s: ['The report must finished today.', 'The report must to be finished today.', 'The report must been finished today.'],
        v: 'Sau động từ khuyết thiếu: modal + be + V3.' },
      { q: 'They will announce the results tomorrow.', d: 'The results will be announced tomorrow.',
        s: ['The results will announced tomorrow.', 'The results will been announced tomorrow.', 'The results are announced tomorrow.'],
        v: 'Tương lai đơn bị động: will + be + V3.' }
    ]);
    return MC(R, `Chọn câu bị động ĐÚNG NGHĨA với câu sau:\n\n"${it.q}"`, it,
      'Công thức chung: be + V3, trong đó "be" chia đúng thì của động từ chính ở câu chủ động. '
      + 'Nhớ hai ngoại lệ: make (bị động thêm to) và let (bị động thành be allowed to).');
  } },

{ ma: 'anh-tuongthuat', chuong: 'Bị động – Tường thuật', muc: 3, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'She said, "I am tired."', d: 'She said she was tired.',
        s: ['She said she is tired.', 'She said I was tired.', 'She said that she has been tired.'],
        v: 'Lùi thì: am → was; đại từ "I" đổi theo chủ ngữ tường thuật thành "she".' },
      { q: 'He said, "I will come tomorrow."', d: 'He said he would come the following day.',
        s: ['He said he will come tomorrow.', 'He said he would come tomorrow.', 'He said he comes the following day.'],
        v: 'will → would và tomorrow → the following day / the next day.' },
      { q: 'The teacher said, "Close your books."', d: 'The teacher told us to close our books.',
        s: ['The teacher said to close your books.', 'The teacher told us close our books.', 'The teacher said us to close our books.'],
        v: 'Tường thuật câu mệnh lệnh: told + tân ngữ + to V. "said" không đi trực tiếp với tân ngữ.' },
      { q: 'She asked, "Where do you live?"', d: 'She asked me where I lived.',
        s: ['She asked me where did I live.', 'She asked me where do I live.', 'She asked where I live.'],
        v: 'Câu hỏi tường thuật trở về trật tự KHẲNG ĐỊNH (S + V), bỏ trợ động từ "do" và lùi thì.' },
      { q: 'He said, "Don\'t touch that."', d: 'He told me not to touch that.',
        s: ['He told me to not touch that.', 'He said me not to touch that.', 'He told me don\'t touch that.'],
        v: 'Mệnh lệnh phủ định: told + O + NOT to V.' },
      { q: 'She asked, "Are you a student?"', d: 'She asked me if I was a student.',
        s: ['She asked me if was I a student.', 'She asked me that I was a student.', 'She asked me if I am a student.'],
        v: 'Câu hỏi Yes/No tường thuật dùng "if/whether" và trở về trật tự khẳng định.' }
    ]);
    return MC(R, `Chọn câu tường thuật ĐÚNG:\n\n${it.q}`, it,
      'Ba việc phải làm cùng lúc: LÙI THÌ · đổi ĐẠI TỪ · đổi TRẠNG TỪ chỉ thời gian và nơi chốn. '
      + 'Không lùi thì khi tường thuật chân lí hoặc điều kiện loại 2, 3.');
  } },

{ ma: 'anh-menhdeqh', chuong: 'Mệnh đề quan hệ', muc: 2, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'The man ____ helped me yesterday is my neighbour.', d: 'who', s: ['which', 'whose', 'whom'],
        v: 'Thay cho NGƯỜI và làm CHỦ NGỮ của mệnh đề quan hệ ⇒ "who".' },
      { q: 'The book ____ I bought last week is very interesting.', d: 'which', s: ['who', 'whose', 'where'],
        v: 'Thay cho VẬT và làm tân ngữ ⇒ "which" (hoặc "that", hoặc lược bỏ).' },
      { q: 'That is the girl ____ father is a doctor.', d: 'whose', s: ['who', 'which', 'whom'],
        v: '"whose" chỉ quan hệ SỞ HỮU, đứng ngay trước danh từ bị sở hữu.' },
      { q: 'This is the house ____ I was born.', d: 'where', s: ['which', 'that', 'when'],
        v: 'Thay cho NƠI CHỐN và theo sau là mệnh đề đầy đủ ⇒ "where" (= in which).' },
      { q: 'I still remember the day ____ we first met.', d: 'when', s: ['where', 'which', 'whose'],
        v: 'Thay cho THỜI GIAN ⇒ "when" (= on which).' },
      { q: 'My father, ____ is 60 years old, still works every day.', d: 'who', s: ['that', 'which', 'whom'],
        v: 'Mệnh đề quan hệ KHÔNG XÁC ĐỊNH (có dấu phẩy) thì tuyệt đối không dùng "that".' },
      { q: 'The house ____ was built in 1990 belongs to my uncle.', d: 'which', s: ['who', 'whose', 'where'],
        v: 'Chủ ngữ là VẬT ⇒ "which"; ở đây không thể dùng "where" vì sau đó là động từ chứ không phải mệnh đề đầy đủ.' },
      { q: 'The man to ____ I spoke is our new manager.', d: 'whom', s: ['who', 'that', 'which'],
        v: 'Sau GIỚI TỪ chỉ được dùng "whom" (người) hoặc "which" (vật), không dùng "who" hay "that".' }
    ]);
    return MC(R, `Chọn đại từ quan hệ đúng:\n\n${it.q}`, it,
      'Hai câu hỏi tự đặt: đại từ thay cho NGƯỜI hay VẬT? nó làm CHỦ NGỮ, TÂN NGỮ hay chỉ SỞ HỮU? '
      + 'Có dấu phẩy hoặc có giới từ đứng trước ⇒ loại ngay "that".');
  } },

{ ma: 'anh-vinging', chuong: 'Ngữ pháp khác', muc: 2, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'She enjoys ____ novels in her free time.', d: 'reading', s: ['to read', 'read', 'to reading'],
        v: 'Sau "enjoy" luôn dùng V-ing.' },
      { q: 'He decided ____ abroad next year.', d: 'to study', s: ['studying', 'study', 'studied'],
        v: 'Sau "decide" dùng to V.' },
      { q: 'I look forward to ____ from you soon.', d: 'hearing', s: ['hear', 'to hear', 'heard'],
        v: '"look forward TO" có "to" là GIỚI TỪ nên theo sau phải là V-ing.' },
      { q: 'He stopped ____ because it was bad for his health.', d: 'smoking', s: ['to smoke', 'smoke', 'to smoking'],
        v: '"stop V-ing" = dừng hẳn việc gì; "stop to V" = dừng lại ĐỂ làm việc khác. Ngữ cảnh ở đây là bỏ hẳn.' },
      { q: 'Remember ____ the door before you leave.', d: 'to lock', s: ['locking', 'lock', 'locked'],
        v: '"remember to V" = nhớ SẼ làm; "remember V-ing" = nhớ ĐÃ làm. Câu này nói về việc sắp làm.' },
      { q: 'My teacher suggested ____ more English books.', d: 'reading', s: ['to read', 'read', 'us to read'],
        v: 'Sau "suggest" dùng V-ing hoặc "that + S + (should) + V", KHÔNG dùng to V.' },
      { q: 'She is used to ____ up early.', d: 'getting', s: ['get', 'to get', 'got'],
        v: '"be used to" (đã quen với) + V-ing; khác hẳn "used to + V" (thói quen trong quá khứ).' },
      { q: 'They avoided ____ about the problem.', d: 'talking', s: ['to talk', 'talk', 'to talking'],
        v: 'Sau "avoid" luôn dùng V-ing.' },
      { q: 'He managed ____ the exam despite being ill.', d: 'to pass', s: ['passing', 'pass', 'passed'],
        v: 'Sau "manage" dùng to V (xoay xở làm được việc gì).' }
    ]);
    return MC(R, `Chọn dạng đúng của động từ:\n\n${it.q}`, it,
      'Nhóm + to V: want, decide, hope, promise, agree, refuse, plan, manage, expect. '
      + 'Nhóm + V-ing: enjoy, avoid, mind, finish, suggest, consider, practise, deny, admit. '
      + 'Sau GIỚI TỪ (kể cả chữ "to" là giới từ) luôn là V-ing.');
  } },

{ ma: 'anh-daongu', chuong: 'Ngữ pháp khác', muc: 4, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'No sooner had he left ____ the phone rang.', d: 'than', s: ['when', 'then', 'as'],
        v: '"No sooner … THAN" là cặp cố định. Đừng lẫn với "Hardly … WHEN".' },
      { q: 'Hardly had she sat down ____ the bell rang.', d: 'when', s: ['than', 'then', 'that'],
        v: '"Hardly/Scarcely … WHEN" là cặp cố định.' },
      { q: 'Not only ____ well, but he also writes beautifully.', d: 'does he speak', s: ['he speaks', 'speaks he', 'he does speak'],
        v: 'Sau "Not only" đầu câu phải đảo ngữ: trợ động từ + S + V nguyên thể.' },
      { q: 'Only when the sun set ____ home.', d: 'did they go', s: ['they went', 'went they', 'they did go'],
        v: 'Sau "Only when + mệnh đề" thì MỆNH ĐỀ CHÍNH mới đảo ngữ.' },
      { q: 'Never ____ such a beautiful sunset.', d: 'have I seen', s: ['I have seen', 'I saw', 'saw I'],
        v: 'Trạng từ phủ định "Never" đầu câu ⇒ đảo trợ động từ lên trước chủ ngữ.' },
      { q: 'Under no circumstances ____ this door.', d: 'should you open', s: ['you should open', 'open you should', 'you open should'],
        v: 'Cụm phủ định "Under no circumstances" đầu câu ⇒ đảo ngữ: modal + S + V.' }
    ]);
    return MC(R, `Chọn phương án đúng:\n\n${it.q}`, it,
      'Đảo ngữ là câu phân loại điểm 9–10. Nhớ hai cặp bẫy: No sooner … THAN và Hardly … WHEN. '
      + 'Sau khi đảo, động từ chính luôn ở dạng nguyên thể.');
  } },

{ ma: 'anh-wordform', chuong: 'Từ loại', muc: 2, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'He spoke ____ about his plan. (confident)', d: 'confidently', s: ['confident', 'confidence', 'confidences'],
        v: 'Bổ nghĩa cho ĐỘNG TỪ "spoke" ⇒ dùng trạng từ "confidently".' },
      { q: 'Her ____ to the project was significant. (contribute)', d: 'contribution', s: ['contribute', 'contributive', 'contributing'],
        v: 'Sau tính từ sở hữu "Her" và trước giới từ ⇒ cần DANH TỪ "contribution".' },
      { q: 'The film was really ____. (impress)', d: 'impressive', s: ['impress', 'impression', 'impressively'],
        v: 'Sau động từ nối "was" và trạng từ "really" ⇒ cần TÍNH TỪ.' },
      { q: 'We must ____ our energy consumption. (reduction)', d: 'reduce', s: ['reduction', 'reduced', 'reducible'],
        v: 'Sau động từ khuyết thiếu "must" phải là ĐỘNG TỪ nguyên thể.' },
      { q: 'She felt ____ after the long journey. (exhaust)', d: 'exhausted', s: ['exhausting', 'exhaust', 'exhaustion'],
        v: 'Mô tả CẢM XÚC của người ⇒ dùng đuôi -ed. Đuôi -ing mô tả tính chất của sự vật gây ra cảm xúc.' },
      { q: 'The instructions were very ____. (confuse)', d: 'confusing', s: ['confused', 'confuse', 'confusion'],
        v: 'Sự vật GÂY RA cảm xúc ⇒ dùng đuôi -ing.' },
      { q: 'It is ____ to finish the work on time. (possible)', d: 'impossible', s: ['possibly', 'possibility', 'unpossible'],
        v: 'Tiền tố phủ định của "possible" là "im-" (đứng trước p). "unpossible" không tồn tại.' },
      { q: 'His answer was completely ____. (correct)', d: 'incorrect', s: ['uncorrect', 'correctly', 'correction'],
        v: 'Tiền tố phủ định của "correct" là "in-".' }
    ]);
    return MC(R, `Chọn dạng đúng của từ trong ngoặc:\n\n${it.q}`, it,
      'Nhìn VỊ TRÍ chỗ trống: sau to be/linking verb ⇒ tính từ · bổ nghĩa động từ ⇒ trạng từ · '
      + 'sau mạo từ hoặc tính từ sở hữu ⇒ danh từ · sau modal ⇒ động từ nguyên thể.');
  } },

{ ma: 'anh-soanh', chuong: 'Ngữ pháp khác', muc: 2, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'This exercise is ____ than the last one.', d: 'more difficult', s: ['difficulter', 'most difficult', 'as difficult'],
        v: 'Tính từ dài (3 âm tiết) so sánh hơn dùng "more + adj + than".' },
      { q: 'He runs ____ than his brother.', d: 'faster', s: ['more fast', 'fastest', 'more faster'],
        v: 'Tính/trạng từ ngắn thêm "-er"; không dùng đồng thời "more" và "-er".' },
      { q: 'She is not ____ her sister.', d: 'as tall as', s: ['as taller as', 'so tall than', 'tall as'],
        v: 'So sánh bằng phủ định: not + as/so + adj + as.' },
      { q: '____ you study, the better results you will get.', d: 'The harder', s: ['Harder', 'The hardest', 'More hard'],
        v: 'So sánh kép: The + comparative …, the + comparative …' },
      { q: 'This is ____ film I have ever seen.', d: 'the most boring', s: ['the boringest', 'more boring', 'most boring'],
        v: 'So sánh nhất của tính từ dài: the most + adj. Phải có mạo từ "the".' },
      { q: 'His car is ____ expensive as mine.', d: 'twice as', s: ['twice more', 'two times more', 'as twice'],
        v: 'So sánh gấp bội: twice/three times + as + adj + as.' }
    ]);
    return MC(R, `Chọn phương án đúng:\n\n${it.q}`, it,
      'Đếm ÂM TIẾT trước: 1–2 âm tiết dùng -er/-est; từ 3 âm tiết trở lên dùng more/the most. '
      + 'Bất quy tắc: good–better–best, bad–worse–worst, far–further–furthest.');
  } }

]);

/* ==========================================================
   BA DẠNG BÀI MỚI CỦA ĐỀ TỪ NĂM 2025
   Cấu trúc 40 câu / 50 phút: điền từ – cụm ngắn 12 · sắp xếp câu 5 ·
   điền câu – cụm dài 5 · đọc hiểu 18.
   Các dạng ngữ âm, trọng âm, tìm lỗi sai, viết lại câu đã bị loại bỏ.
   ========================================================== */
TD.GEN.anh = (TD.GEN.anh || []).concat([

{ ma: 'anh-sapxep', chuong: 'Cấu trúc – Chiến thuật', muc: 3, dang: 'mc',
  tao(R) {
    const bo = R.chon([
      { t: 'một lá thư xin việc', c: [
        'a. Dear Sir or Madam,',
        'b. I am writing to apply for the position of sales assistant advertised on your website.',
        'c. I have worked part-time in a bookshop for two years, so I am used to dealing with customers.',
        'd. I would be grateful if you could consider my application.',
        'e. Yours faithfully, Nam Tran'],
        v: 'Thư trang trọng đi theo trình tự: lời chào → nêu lí do viết → trình bày kinh nghiệm → đề nghị → kí tên. '
         + '"Dear Sir or Madam" luôn đi cặp với "Yours faithfully".' },
      { t: 'một đoạn văn về rác thải nhựa', c: [
        'a. Plastic waste has become one of the most serious problems of our time.',
        'b. Every year, millions of tonnes of plastic end up in the ocean.',
        'c. As a result, sea animals mistake plastic bags for food and die.',
        'd. To deal with this, many countries have banned single-use plastic bags.',
        'e. However, real change will only come when each of us reduces what we throw away.'],
        v: 'Cấu trúc chuẩn: nêu vấn đề → dẫn chứng số liệu → hậu quả (As a result) → giải pháp (To deal with this) → '
         + 'kết luận phản biện (However).' },
      { t: 'một đoạn văn về học trực tuyến', c: [
        'a. Online learning has grown rapidly over the past few years.',
        'b. It allows students to study at their own pace and save travelling time.',
        'c. On the other hand, it requires a high level of self-discipline.',
        'd. Many learners give up simply because no one is there to remind them.',
        'e. Therefore, the best approach seems to be a combination of online and classroom lessons.'],
        v: 'Nêu hiện tượng → ưu điểm → nhược điểm (On the other hand) → giải thích nhược điểm → kết luận (Therefore).' },
      { t: 'một đoạn văn về thói quen đọc sách', c: [
        'a. Reading is one of the cheapest ways to broaden your mind.',
        'b. A single book can take you to places you will never visit in person.',
        'c. Unfortunately, fewer and fewer young people read for pleasure nowadays.',
        'd. Most of them spend their free time scrolling through short videos instead.',
        'e. Setting aside just fifteen minutes a day would be enough to change that habit.'],
        v: 'Khẳng định lợi ích → mở rộng lợi ích → nêu thực trạng trái ngược (Unfortunately) → giải thích → đề xuất.' },
      { t: 'một email mời bạn đi chơi', c: [
        'a. Hi Mai,',
        'b. How have you been? I have not heard from you for ages.',
        'c. I am writing to invite you to my birthday party this Saturday.',
        'd. It will start at six in the evening at my house, and a few of our old classmates are coming.',
        'e. Let me know if you can make it. Love, Linh'],
        v: 'Email thân mật: chào → hỏi thăm → nêu mục đích → chi tiết thời gian địa điểm → đề nghị phản hồi và kí tên.' },
      { t: 'một đoạn văn về làm thêm khi còn đi học', c: [
        'a. More and more students take part-time jobs while studying at university.',
        'b. Such jobs teach them how to manage money and communicate with people.',
        'c. Nevertheless, working too many hours can affect their academic results.',
        'd. Some students even fail their exams because they are simply too tired to study.',
        'e. The key, then, is to keep a sensible balance between earning and learning.'],
        v: 'Hiện tượng → lợi ích → mặt trái (Nevertheless) → hậu quả cụ thể → kết luận cân bằng.' }
    ]);
    /* thứ tự đúng là a-b-c-d-e; ba phương án nhiễu là các hoán vị sai rõ ràng */
    const dung = 'a – b – c – d – e';
    const s = ['a – c – b – e – d', 'b – a – d – c – e', 'a – d – b – c – e'];
    return MC(R, `Sắp xếp các câu sau thành ${bo.t} hoàn chỉnh:\n\n${bo.c.join('\n')}`,
      { d: dung, s: s, v: bo.v }, 
      'Bốn mỏ neo để sắp xếp: ① câu chào hoặc câu nêu chủ đề đứng ĐẦU ② từ nối (As a result, However, Therefore) '
      + 'chỉ chỗ đặt câu ③ đại từ (it, this, such) phải có danh từ đứng trước ④ câu kí tên hoặc câu kết luận đứng CUỐI.');
  } },

{ ma: 'anh-chencau', chuong: 'Cấu trúc – Chiến thuật', muc: 4, dang: 'mc',
  tao(R) {
    const bo = R.chon([
      { doan: 'Many cities are now building separate lanes for bicycles. [1] Cycling produces no emissions and '
            + 'costs almost nothing to run. [2] It also keeps people healthier than sitting in a car. [3] '
            + 'Yet in heavy rain or extreme heat, cycling becomes far less attractive. [4]',
        cau: 'For this reason, some cities have begun to cover their busiest bicycle lanes.',
        d: 'Vị trí [4]',
        v: 'Câu cần chèn bắt đầu bằng "For this reason" nên phải đứng NGAY SAU lí do — chính là câu nói mưa và nắng '
         + 'làm việc đạp xe kém hấp dẫn. Vậy chèn vào [4].',
        s: ['Vị trí [1]', 'Vị trí [2]', 'Vị trí [3]'] },
      { doan: 'Homework has been part of school life for over a century. [1] Supporters argue that it helps '
            + 'students revise what they have learnt. [2] Critics reply that it eats into the time children '
            + 'need for sport and family. [3] Recent studies suggest that short, focused tasks work best. [4]',
        cau: 'Both sides, however, agree that the amount matters more than the existence of homework itself.',
        d: 'Vị trí [3]',
        v: 'Câu chứa "Both sides" nên phải đứng SAU khi đã nêu đủ CẢ HAI phía (supporters và critics) và TRƯỚC câu '
         + 'nói về nghiên cứu. Vậy chèn vào [3].',
        s: ['Vị trí [1]', 'Vị trí [2]', 'Vị trí [4]'] },
      { doan: 'Street food is a familiar part of life in Vietnamese cities. [1] A bowl of noodles on the pavement '
            + 'often costs less than a coffee in a chain café. [2] Tourists love it because it lets them taste '
            + 'the city the way local people do. [3] Hygiene, on the other hand, is not always guaranteed. [4]',
        cau: 'Choosing a stall that is crowded with local customers is usually the safest bet.',
        d: 'Vị trí [4]',
        v: 'Câu này đưa ra CÁCH XỬ LÍ cho vấn đề vệ sinh vừa nêu, nên phải đứng ngay sau câu về hygiene ⇒ [4].',
        s: ['Vị trí [1]', 'Vị trí [2]', 'Vị trí [3]'] },
      { doan: 'Learning a second language changes the way you think. [1] Bilingual people often switch between '
            + 'two sets of cultural habits without noticing. [2] Research also links bilingualism to a later '
            + 'onset of memory problems in old age. [3] None of these benefits, though, appear overnight. [4]',
        cau: 'They take years of steady, everyday practice.',
        d: 'Vị trí [4]',
        v: 'Đại từ "They" thay cho "these benefits" ở câu trước nên phải đứng NGAY SAU câu đó ⇒ [4].',
        s: ['Vị trí [1]', 'Vị trí [2]', 'Vị trí [3]'] },
      { doan: 'Volunteering is becoming popular among Vietnamese teenagers. [1] Some spend their summer teaching '
            + 'children in remote villages. [2] Others join clean-up campaigns along rivers and beaches. [3] '
            + 'What they gain is often more than what they give. [4]',
        cau: 'Such experiences build confidence and teach them how to work with strangers.',
        d: 'Vị trí [4]',
        v: '"Such experiences" thay cho hai hoạt động vừa liệt kê (dạy học, dọn rác) và câu này giải thích cho '
         + 'câu "gain more than they give" nên đặt ở [4] là hợp mạch nhất.',
        s: ['Vị trí [1]', 'Vị trí [2]', 'Vị trí [3]'] }
    ]);
    return MC(R, `Chọn vị trí thích hợp nhất để chèn câu cho sẵn vào đoạn văn.\n\n`
      + `<b>Câu cần chèn:</b> "${bo.cau}"\n\n<b>Đoạn văn:</b> ${bo.doan}`, bo,
      'Ba dấu hiệu quyết định vị trí: ① TỪ NỐI đầu câu (For this reason, However, Therefore) chỉ quan hệ với câu '
      + 'liền trước ② ĐẠI TỪ (they, this, such) phải có danh từ tương ứng ở câu ngay trước ③ câu chèn vào không được '
      + 'cắt đứt mạch giữa hai câu vốn dính nhau.');
  } },

{ ma: 'anh-tomtat', chuong: 'Cấu trúc – Chiến thuật', muc: 4, dang: 'mc',
  tao(R) {
    const bo = R.chon([
      { doan: '電... ',
        skip: true },
      { doan: 'Fast fashion offers cheap, trendy clothes that are replaced every few weeks. Shoppers enjoy the low '
            + 'prices, but the industry now produces more textile waste than almost any other. Some brands have '
            + 'started take-back schemes, yet the volume they recycle is tiny compared with what they sell.',
        d: 'Fast fashion is popular because it is cheap, but it creates huge waste that current recycling efforts barely reduce.',
        v: 'Bản tóm tắt phải gồm CẢ BA ý của đoạn: rẻ và hợp mốt · gây rác thải lớn · nỗ lực tái chế chưa đáng kể. '
         + 'Ba phương án còn lại chỉ lấy MỘT ý hoặc nói sai kết luận.',
        s: ['Fast fashion brands have successfully solved the problem of textile waste through take-back schemes.',
            'Shoppers should stop buying clothes altogether in order to protect the environment.',
            'Clothes today are cheaper than they have ever been in history.'] },
      { doan: 'Working from home saves commuting time and lets employees plan their own day. Managers, however, '
            + 'report that new staff learn much more slowly when they never sit beside experienced colleagues. '
            + 'Most companies have therefore settled on a mix of office and home days.',
        d: 'Remote work brings flexibility but slows down the training of new staff, so most firms now combine both ways of working.',
        v: 'Đoạn có ba tầng: ưu điểm → nhược điểm cụ thể → giải pháp thoả hiệp. Tóm tắt đúng phải giữ đủ ba tầng.',
        s: ['Working from home is better than working in an office in every respect.',
            'New employees are no longer needed in companies that allow remote work.',
            'Managers dislike remote work because they cannot control their staff.'] },
      { doan: 'Electric cars produce no exhaust fumes on the road, which makes city air cleaner. Producing their '
            + 'batteries, however, requires mining rare metals and a great deal of energy. Whether they are truly '
            + 'greener depends on how the electricity that charges them is generated.',
        d: 'Electric cars clean up city air but their overall benefit depends on how batteries are made and how the electricity is produced.',
        v: 'Đoạn không kết luận xe điện tốt hay xấu mà đặt điều kiện. Tóm tắt phải giữ chữ "depends on".',
        s: ['Electric cars are completely harmless to the environment.',
            'Electric cars pollute more than petrol cars in every situation.',
            'Mining rare metals is the only environmental issue worth discussing.'] },
      { doan: 'Social media lets people keep in touch across long distances and share news in seconds. At the same '
            + 'time, constantly comparing your life with carefully edited photographs can damage self-esteem. '
            + 'Researchers suggest that how long you spend online matters less than what you do while you are there.',
        d: 'Social media connects people but can harm self-esteem, and researchers say the way it is used matters more than the time spent on it.',
        v: 'Ý chốt của đoạn nằm ở câu cuối: CÁCH dùng quan trọng hơn THỜI LƯỢNG. Tóm tắt bỏ ý này là mất trọng tâm.',
        s: ['Social media should be banned for young people because it harms self-esteem.',
            'The longer people stay online, the more damage social media does.',
            'Social media is only useful for keeping in touch with distant friends.'] }
    ].filter(x => !x.skip));
    return MC(R, `Đọc đoạn văn rồi chọn câu TÓM TẮT đúng nhất.\n\n${bo.doan}`, bo,
      'Tóm tắt đúng phải bao được MỌI ý chính của đoạn, không thêm ý ngoài và không đổi mức độ khẳng định. '
      + 'Phương án chứa "completely", "every", "only", "should be banned" thường quá mạnh so với giọng điệu của bài.');
  } }

]);

})();
