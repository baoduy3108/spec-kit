/* ============================================================
   TIẾNG ANH — MẪU ĐỀ BÀI TẬP TỰ SINH
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
  return R.chonNhieu(bo, 3).map(lay);
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

{ ma: 'anh-trongam', chuong: 'Ngữ âm – Trọng âm', muc: 2, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { d: 'engineer', s: ['hospital', 'family', 'beautiful'], v: '"engineer" trọng âm âm tiết CUỐI (en-gi-NEER); ba từ còn lại trọng âm âm tiết ĐẦU.' },
      { d: 'develop', s: ['organise', 'estimate', 'demonstrate'], v: '"develop" trọng âm âm tiết THỨ HAI (de-VE-lop); ba từ còn lại trọng âm âm tiết đầu.' },
      { d: 'economic', s: ['comfortable', 'interesting', 'necessary'], v: 'Hậu tố -ic kéo trọng âm về âm tiết ngay trước nó (e-co-NO-mic); ba từ kia trọng âm âm tiết đầu.' },
      { d: 'photograph', s: ['photographer', 'photography', 'geography'], v: '"photograph" trọng âm âm tiết ĐẦU (PHO-to-graph); ba từ còn lại đều trọng âm âm tiết THỨ HAI (pho-TOG-ra-pher, pho-TOG-ra-phy, ge-OG-ra-phy).' },
      { d: 'polite', s: ['careful', 'happy', 'silent'], v: 'Tính từ hai âm tiết "polite" trọng âm âm tiết thứ hai (po-LITE); ba từ kia trọng âm âm tiết đầu.' },
      { d: 'volunteer', s: ['gentleman', 'furniture', 'atmosphere'], v: 'Hậu tố -eer luôn nhận trọng âm (vo-lun-TEER).' },
      { d: 'Japanese', s: ['difficult', 'popular', 'accurate'], v: 'Hậu tố -ese luôn nhận trọng âm (Ja-pa-NESE); ba từ còn lại trọng âm âm tiết đầu.' },
      { d: 'employee', s: ['employer', 'important', 'develop'], v: 'Hậu tố -ee nhận trọng âm (em-ploy-EE); ba từ còn lại trọng âm âm tiết THỨ HAI.' }
    ]);
    return MC(R, `Chọn từ có vị trí trọng âm KHÁC với ba từ còn lại:`, it,
      'Quy tắc nhanh: hậu tố -ic, -ical, -ion, -ity, -ive kéo trọng âm về âm tiết NGAY TRƯỚC nó. '
      + 'Hậu tố -ee, -eer, -ese, -ique tự nhận trọng âm. Danh từ hai âm tiết thường trọng âm đầu, '
      + 'động từ hai âm tiết thường trọng âm sau.');
  } },

{ ma: 'anh-phatam', chuong: 'Ngữ âm – Trọng âm', muc: 2, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { h: 'đuôi -ed', d: 'wanted', s: ['worked', 'stopped', 'watched'], v: '"wanted" đuôi -ed đọc /ɪd/ (sau /t/); ba từ kia đọc /t/ vì đứng sau âm vô thanh.' },
      { h: 'đuôi -ed', d: 'needed', s: ['laughed', 'washed', 'helped'], v: '"needed" đọc /ɪd/ (sau /d/); ba từ kia đọc /t/.' },
      { h: 'đuôi -ed', d: 'played', s: ['asked', 'missed', 'looked'], v: '"played" đọc /d/ (sau âm hữu thanh); ba từ kia đọc /t/.' },
      { h: 'đuôi -es', d: 'watches', s: ['books', 'cats', 'maps'], v: '"watches" đuôi -es đọc /ɪz/ (sau âm xuýt /tʃ/); ba từ kia đọc /s/.' },
      { h: 'đuôi -es', d: 'boxes', s: ['lamps', 'hats', 'shops'], v: '"boxes" đọc /ɪz/ (sau /ks/); ba từ kia đọc /s/.' },
      { h: 'đuôi -s', d: 'dogs', s: ['ships', 'cakes', 'roofs'], v: '"dogs" đọc /z/ (sau âm hữu thanh /g/); ba từ kia đọc /s/.' },
      { h: 'chữ ch', d: 'chemistry', s: ['children', 'church', 'cheese'], v: '"chemistry" có "ch" đọc /k/; ba từ kia đọc /tʃ/.' },
      { h: 'chữ th', d: 'thought', s: ['though', 'these', 'those'], v: '"thought" có "th" đọc vô thanh /θ/; ba từ kia đọc hữu thanh /ð/.' }
    ]);
    return MC(R, `Chọn từ có <b>${it.h}</b> được phát âm KHÁC với ba từ còn lại:`, it,
      'Đuôi -ed: /ɪd/ sau /t/ và /d/ · /t/ sau âm vô thanh · /d/ sau âm hữu thanh. '
      + 'Đuôi -s/-es: /ɪz/ sau âm xuýt · /s/ sau âm vô thanh · /z/ sau âm hữu thanh.');
  } },

{ ma: 'anh-timloi', chuong: 'Cấu trúc – Chiến thuật', muc: 3, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'The number of students <b>are</b> increasing every year.', d: '"are" phải là "is"',
        s: ['"number" phải là "numbers"', '"increasing" phải là "increased"', '"every" phải là "each"'],
        v: '"The number of + N số nhiều" luôn đi với động từ SỐ ÍT. (Còn "A number of" mới đi với số nhiều.)' },
      { q: 'She is one of the <b>most tallest</b> girls in her class.', d: '"most tallest" phải là "tallest"',
        s: ['"one of" phải là "one in"', '"girls" phải là "girl"', '"her" phải là "his"'],
        v: 'Không dùng đồng thời "most" và đuôi "-est". Tính từ ngắn chỉ cần thêm -est.' },
      { q: 'Despite <b>it was raining</b>, we went out.', d: '"it was raining" phải là "the rain"',
        s: ['"Despite" phải là "Although"', '"went" phải là "go"', '"out" phải là "outside"'],
        v: 'Sau "Despite / In spite of" dùng DANH TỪ hoặc V-ing, không dùng mệnh đề. (Đổi "Despite" thành "Although" cũng đúng nhưng đề gạch chân vế sau.)' },
      { q: 'He suggested <b>to go</b> to the cinema.', d: '"to go" phải là "going"',
        s: ['"suggested" phải là "suggest"', '"the cinema" phải là "cinema"', '"He" phải là "Him"'],
        v: 'Sau "suggest" dùng V-ing hoặc "that + S + (should) + V", không dùng to V.' },
      { q: 'If I <b>will have</b> time, I will visit you.', d: '"will have" phải là "have"',
        s: ['"will visit" phải là "visit"', '"If" phải là "Unless"', '"you" phải là "your"'],
        v: 'Mệnh đề "if" của điều kiện loại 1 dùng hiện tại đơn, không dùng "will".' },
      { q: 'The book <b>who</b> I borrowed from the library is very useful.', d: '"who" phải là "which"',
        s: ['"borrowed" phải là "borrow"', '"is" phải là "are"', '"useful" phải là "usefully"'],
        v: '"The book" là VẬT nên phải dùng "which" hoặc "that", không dùng "who".' },
      { q: 'Each of the students <b>have</b> a laptop.', d: '"have" phải là "has"',
        s: ['"students" phải là "student"', '"Each" phải là "Every"', '"a laptop" phải là "laptops"'],
        v: '"Each of + N số nhiều" đi với động từ SỐ ÍT.' },
      { q: 'She has been working here <b>since</b> five years.', d: '"since" phải là "for"',
        s: ['"has been" phải là "was"', '"working" phải là "worked"', '"here" phải là "there"'],
        v: '"since" đi với MỐC thời gian, "for" đi với KHOẢNG thời gian. "five years" là khoảng.' }
    ]);
    return MC(R, `Tìm lỗi sai trong câu sau và chọn cách sửa đúng:\n\n${it.q}`, it,
      'Bốn ổ lỗi hay bị gài: sự hoà hợp CHỦ NGỮ – ĐỘNG TỪ · THÌ của động từ · '
      + 'đại từ quan hệ người/vật · giới từ và dạng từ theo sau.');
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

})();
