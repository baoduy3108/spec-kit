/* ============================================================
   TIẾNG ANH — BỔ SUNG BỘ SINH CÂU NGỮ PHÁP
   Luyện Công môn Anh trước đây 76% là câu "phát biểu nào sau đây
   đúng về Mệnh đề quan hệ" — tức đọc NHẬN ĐỊNH về ngữ pháp chứ
   không làm ngữ pháp. Đề thi thật không có lấy một câu như vậy:
   toàn bộ là câu tiếng Anh phải điền, phải chọn, phải đọc.
   File này bù mười mảng ngữ pháp trọng tâm còn thiếu hẳn bộ sinh:
   mạo từ · lượng từ · hoà hợp chủ vị · câu hỏi đuôi · liên từ ·
   động từ khuyết thiếu · cụm động từ · câu ước · mệnh đề rút gọn ·
   danh từ đếm được và không đếm được.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
/* Khuôn trắc nghiệm: luôn nêu vì sao từng phương án còn lại bị loại */
const MC = (R, de, it, meo, pt) => {
  const opts = TD.xaoR(R, [it.d].concat(it.s));
  const loai = opts.filter(x => x !== it.d)
    .map(x => `· ${x}\n  → ${(it.sv && it.sv[x]) || 'không đúng ngữ pháp trong ngữ cảnh này.'}`).join('\n');
  const them = (it.pt || pt) ? `\n\nCách phân tích từng bước:\n${it.pt || pt}` : '';
  return { q: de, opts: opts, ans: opts.indexOf(it.d),
    giai: `Đáp án đúng: ${it.d}\n${it.v}${them}\n\nVì sao các phương án còn lại bị loại:\n${loai}`, meo: meo };
};
const bo = (ma, chuong, muc, de, ds, meo, pt) => ({
  ma: ma, chuong: chuong, muc: muc, dang: 'mc',
  tao(R) { const it = R.chon(ds); return MC(R, `${de}\n\n${it.q}`, it, meo, pt); }
});

TD.GEN.anh = (TD.GEN.anh || []).concat([

/* ---------- 1. MẠO TỪ ---------- */
bo('anh-maotu', 'Ngữ pháp khác', 1, 'Chọn mạo từ đúng để điền vào chỗ trống:', [
{ q: 'She is ____ honest person, so everyone trusts her.', d: 'an', s: ['a', 'the', 'no article'],
  v: '"Honest" bắt đầu bằng phụ âm h CÂM nên âm đầu là nguyên âm /ɒ/ ⇒ dùng "an".',
  sv: { a: 'chỉ dùng trước âm phụ âm; ở đây h câm nên âm đầu là nguyên âm', the: 'đây là lần nhắc đầu tiên, chưa xác định', 'no article': 'danh từ đếm được số ít bắt buộc phải có mạo từ' } },
{ q: 'He plays ____ guitar in a band.', d: 'the', s: ['a', 'an', 'no article'],
  v: 'Trước tên NHẠC CỤ khi nói về việc chơi nhạc cụ đó, luôn dùng "the": play the guitar, play the piano.',
  sv: { a: 'nhạc cụ trong ngữ cảnh chơi nhạc luôn đi với "the"', an: 'vừa sai mạo từ vừa sai âm đầu', 'no article': 'chỉ bỏ mạo từ trước tên MÔN THỂ THAO: play football' } },
{ q: 'My brother plays ____ football every weekend.', d: 'no article', s: ['the', 'a', 'an'],
  v: 'Trước tên MÔN THỂ THAO không dùng mạo từ: play football, play tennis.',
  sv: { the: 'chỉ dùng "the" với nhạc cụ, không dùng với môn thể thao', a: 'football là danh từ không đếm được ở nghĩa môn thể thao', an: 'sai cả mạo từ lẫn âm đầu' } },
{ q: '____ Sun rises in the east.', d: 'The', s: ['A', 'An', 'No article'],
  v: 'Trước những vật DUY NHẤT trên đời (the Sun, the Moon, the Earth, the sky) luôn dùng "the".',
  sv: { A: 'chỉ dùng khi vật đó có nhiều cái để chọn', An: 'vừa sai loại mạo từ vừa sai âm đầu', 'No article': 'vật duy nhất bắt buộc có "the"' } },
{ q: 'I need ____ umbrella because it is raining.', d: 'an', s: ['a', 'the', 'no article'],
  v: '"Umbrella" bắt đầu bằng nguyên âm /ʌ/ ⇒ dùng "an".',
  sv: { a: 'chỉ dùng trước âm phụ âm', the: 'chưa xác định cái ô nào cụ thể', 'no article': 'danh từ đếm được số ít cần mạo từ' } },
{ q: 'He is ____ university student in Hanoi.', d: 'a', s: ['an', 'the', 'no article'],
  v: '"University" phát âm là /ˌjuːnɪˈvɜːsəti/, bắt đầu bằng âm /j/ là PHỤ ÂM ⇒ dùng "a" dù chữ cái đầu là nguyên âm.',
  sv: { an: 'bẫy kinh điển — nhìn chữ u tưởng nguyên âm, nhưng phải nghe ÂM chứ không nhìn chữ', the: 'chưa xác định người nào cụ thể', 'no article': 'danh từ đếm được số ít cần mạo từ' } },
{ q: 'She went to ____ school by bike when she was young.', d: 'no article', s: ['the', 'a', 'an'],
  v: 'Khi nói tới CHỨC NĂNG của nơi chốn (đi học, nằm viện, đi tù) thì bỏ mạo từ: go to school, go to bed, go to hospital.',
  sv: { the: 'dùng "the school" khi nói tới toà nhà cụ thể, không phải việc đi học', a: 'không dùng với nghĩa chức năng', an: 'sai cả mạo từ lẫn âm đầu' } },
{ q: 'This is ____ best film I have ever seen.', d: 'the', s: ['a', 'an', 'no article'],
  v: 'Trước SO SÁNH NHẤT luôn dùng "the": the best, the most beautiful.',
  sv: { a: 'so sánh nhất chỉ có một nên phải xác định bằng "the"', an: 'sai cả mạo từ lẫn âm đầu', 'no article': 'so sánh nhất bắt buộc có "the"' } },
{ q: 'There is ____ old man waiting outside.', d: 'an', s: ['a', 'the', 'no article'],
  v: '"Old" bắt đầu bằng nguyên âm /əʊ/ ⇒ dùng "an".',
  sv: { a: 'chỉ dùng trước âm phụ âm', the: '"There is" giới thiệu cái mới, chưa xác định', 'no article': 'danh từ đếm được số ít cần mạo từ' } },
{ q: 'We had ____ dinner at a Vietnamese restaurant.', d: 'no article', s: ['the', 'a', 'an'],
  v: 'Trước tên BỮA ĂN không dùng mạo từ: have breakfast, have lunch, have dinner.',
  sv: { the: 'chỉ thêm "the" khi có bổ ngữ xác định: the dinner we had yesterday', a: 'chỉ dùng khi có tính từ đi kèm: a delicious dinner', an: 'sai cả mạo từ lẫn âm đầu' } },
{ q: 'He is ____ most hard-working student in my class.', d: 'the', s: ['a', 'an', 'no article'],
  v: 'So sánh nhất của tính từ dài dùng "the most".',
  sv: { a: 'so sánh nhất phải xác định', an: 'sai mạo từ', 'no article': 'thiếu "the" thì cụm so sánh nhất không hoàn chỉnh' } },
{ q: 'I bought ____ book yesterday. ____ book is about climate change.', d: 'a / The', s: ['the / A', 'a / A', 'the / The'],
  v: 'Lần nhắc ĐẦU dùng "a" (chưa xác định), lần nhắc SAU dùng "the" (đã xác định).',
  sv: { 'the / A': 'ngược hoàn toàn quy tắc xác định', 'a / A': 'lần nhắc thứ hai phải xác định bằng "the"', 'the / The': 'lần nhắc đầu chưa thể xác định được' } }
], 'Ba luật của mạo từ: ① a hay an xét theo ÂM chứ không theo chữ cái (a university, an hour) ② lần nhắc đầu a/an, lần nhắc sau the ③ bỏ mạo từ trước bữa ăn, môn thể thao, và nơi chốn dùng theo chức năng.'),

/* ---------- 2. LƯỢNG TỪ ---------- */
bo('anh-luongtu', 'Ngữ pháp khác', 1, 'Chọn lượng từ đúng để điền vào chỗ trống:', [
{ q: 'There isn\'t ____ milk left in the fridge.', d: 'much', s: ['many', 'a few', 'few'],
  v: '"Milk" là danh từ KHÔNG đếm được, dùng "much" trong câu phủ định.',
  sv: { many: 'chỉ đi với danh từ đếm được số nhiều', 'a few': 'chỉ đi với danh từ đếm được', few: 'chỉ đi với danh từ đếm được' } },
{ q: 'How ____ students are there in your class?', d: 'many', s: ['much', 'a little', 'little'],
  v: '"Students" là danh từ đếm được số nhiều ⇒ dùng "many".',
  sv: { much: 'chỉ đi với danh từ không đếm được', 'a little': 'chỉ đi với danh từ không đếm được', little: 'chỉ đi với danh từ không đếm được' } },
{ q: 'She has ____ friends, so she often feels lonely.', d: 'few', s: ['a few', 'little', 'a little'],
  v: '"Few" mang nghĩa PHỦ ĐỊNH — rất ít, gần như không có; hợp với vế sau "feels lonely".',
  sv: { 'a few': 'mang nghĩa tích cực "có một vài", mâu thuẫn với việc thấy cô đơn', little: 'chỉ đi với danh từ không đếm được', 'a little': 'chỉ đi với danh từ không đếm được' } },
{ q: 'Don\'t worry, we still have ____ time before the train leaves.', d: 'a little', s: ['a few', 'little', 'few'],
  v: '"Time" không đếm được, và câu mang sắc thái TÍCH CỰC (vẫn còn) ⇒ "a little".',
  sv: { 'a few': 'chỉ đi với danh từ đếm được', little: 'mang nghĩa phủ định "hầu như không còn", trái với "Don\'t worry"', few: 'chỉ đi với danh từ đếm được' } },
{ q: 'There were ____ people at the concert that we could hardly move.', d: 'so many', s: ['so much', 'such many', 'too much'],
  v: 'Cấu trúc "so + many + danh từ đếm được số nhiều + that".',
  sv: { 'so much': 'much chỉ đi với danh từ không đếm được', 'such many': 'sau "such" không dùng many, phải là "such a lot of"', 'too much': 'sai cả lượng từ lẫn cấu trúc so… that' } },
{ q: '____ of the students in my class enjoy learning English.', d: 'Most', s: ['Almost', 'Every', 'Each'],
  v: '"Most of + the + danh từ số nhiều" nghĩa là "hầu hết".',
  sv: { Almost: '"almost" là trạng từ, phải nói "almost all of the students"', Every: 'sau "every" là danh từ số ít và không có "of the"', Each: 'sau "each of the" thì động từ chia số ít, và ở đây là "enjoy" số nhiều' } },
{ q: 'I have ____ money to buy that laptop.', d: 'enough', s: ['many', 'a few', 'several'],
  v: '"Money" không đếm được; "enough" đi được với cả hai loại danh từ.',
  sv: { many: 'chỉ đi với danh từ đếm được', 'a few': 'chỉ đi với danh từ đếm được', several: 'chỉ đi với danh từ đếm được số nhiều' } },
{ q: 'She spent ____ of her free time reading books.', d: 'much', s: ['many', 'a lot', 'several'],
  v: '"Much of + danh từ không đếm được" — "time" không đếm được.',
  sv: { many: 'chỉ đi với danh từ đếm được', 'a lot': 'phải là "a lot of", thiếu "of" thì sai cấu trúc', several: 'chỉ đi với danh từ đếm được số nhiều' } },
{ q: 'There is ____ information about this topic on the Internet.', d: 'plenty of', s: ['plenty', 'many', 'a number of'],
  v: '"Plenty of" đi với cả danh từ đếm được lẫn không đếm được; "information" không đếm được.',
  sv: { plenty: 'thiếu "of" nên không nối được với danh từ', many: 'chỉ đi với danh từ đếm được, mà information không đếm được', 'a number of': 'chỉ đi với danh từ đếm được số nhiều' } },
{ q: 'Neither of the two answers ____ correct.', d: 'is', s: ['are', 'were', 'have been'],
  v: '"Neither of + danh từ số nhiều" thì động từ chia số ÍT trong văn viết trang trọng.',
  sv: { are: 'bị hút theo "answers" số nhiều — đây chính là bẫy', were: 'sai cả số lẫn thì, câu đang ở hiện tại', 'have been': 'sai thì, câu không có dấu hiệu hoàn thành' } },
{ q: 'Each of the students ____ a different opinion.', d: 'has', s: ['have', 'are having', 'having'],
  v: '"Each of + danh từ số nhiều" thì động từ chia số ÍT.',
  sv: { have: 'bị hút theo "students" số nhiều', 'are having': 'sai số, và "have" nghĩa sở hữu không dùng tiếp diễn', having: 'thiếu động từ chính, câu không có vị ngữ' } },
{ q: 'A number of visitors ____ waiting outside the museum.', d: 'are', s: ['is', 'was', 'has been'],
  v: '"A number of + danh từ số nhiều" thì động từ chia số NHIỀU. Phân biệt với "the number of" đi động từ số ít.',
  sv: { is: 'nhầm với "the number of" — cặp bẫy quen thuộc nhất của chủ điểm này', was: 'sai cả số lẫn thì', 'has been': 'sai số, và câu không có dấu hiệu hoàn thành' } }
], 'Chia hai nhánh trước: danh từ ĐẾM ĐƯỢC đi với many, a few, few, several; KHÔNG đếm được đi với much, a little, little. '
 + 'Rồi xét sắc thái: "a few / a little" là tích cực (có một ít), "few / little" là phủ định (hầu như không có). '
 + 'Nhớ cặp bẫy: a number of + số nhiều, the number of + số ít.'),

/* ---------- 3. HOÀ HỢP CHỦ NGỮ – ĐỘNG TỪ ---------- */
bo('anh-hoahop', 'Ngữ pháp khác', 2, 'Chọn dạng động từ đúng:', [
{ q: 'The list of items ____ on the desk.', d: 'is', s: ['are', 'were', 'have been'],
  v: 'Chủ ngữ chính là "the list" (số ít); "of items" chỉ là cụm giới từ bổ nghĩa, không quyết định số của động từ.',
  sv: { are: 'bị hút theo "items" đứng ngay trước động từ — bẫy phổ biến nhất', were: 'sai cả số lẫn thì', 'have been': 'sai số' } },
{ q: 'Either my parents or my brother ____ going to pick me up.', d: 'is', s: ['are', 'were', 'have'],
  v: 'Với "either… or", động từ chia theo chủ ngữ ĐỨNG GẦN NÓ NHẤT — ở đây là "my brother" số ít.',
  sv: { are: 'chia theo "my parents" ở xa, sai quy tắc gần nhất', were: 'sai cả số lẫn thì', have: 'sai cấu trúc, "going" cần động từ to be' } },
{ q: 'Mathematics ____ my favourite subject at school.', d: 'is', s: ['are', 'were', 'have been'],
  v: 'Các môn học kết thúc bằng -ics (mathematics, physics, economics) tuy có chữ s nhưng là danh từ SỐ ÍT.',
  sv: { are: 'nhìn chữ s ở cuối tưởng số nhiều — đây đúng là bẫy đề muốn gài', were: 'sai cả số lẫn thì', 'have been': 'sai số' } },
{ q: 'The police ____ investigating the accident at the moment.', d: 'are', s: ['is', 'was', 'has been'],
  v: '"The police" luôn là danh từ SỐ NHIỀU trong tiếng Anh, dù không có s.',
  sv: { is: 'không có chữ s nên tưởng số ít — ngược lại với bẫy mathematics', was: 'sai cả số lẫn thì, câu có "at the moment"', 'has been': 'sai số' } },
{ q: 'Twenty kilometres ____ a long distance to walk.', d: 'is', s: ['are', 'were', 'have been'],
  v: 'Khi số nhiều chỉ một ĐƠN VỊ đo (khoảng cách, tiền, thời gian) coi như một khối, động từ chia số ít.',
  sv: { are: 'bị hút theo "kilometres" số nhiều', were: 'sai cả số lẫn thì', 'have been': 'sai số' } },
{ q: 'Not only the students but also the teacher ____ excited about the trip.', d: 'is', s: ['are', 'were', 'have been'],
  v: '"Not only… but also" chia theo chủ ngữ đứng SAU "but also" — ở đây là "the teacher" số ít.',
  sv: { are: 'chia theo "the students" ở trước, sai quy tắc', were: 'sai cả số lẫn thì', 'have been': 'sai số' } },
{ q: 'Everyone in the two classes ____ to join the contest.', d: 'wants', s: ['want', 'are wanting', 'have wanted'],
  v: 'Các đại từ bất định everyone, everybody, someone, nobody luôn chia động từ số ÍT.',
  sv: { want: 'bị hút theo "the two classes"', 'are wanting': 'sai số, và "want" không dùng ở thì tiếp diễn', 'have wanted': 'sai số' } },
{ q: 'Half of the cake ____ already been eaten.', d: 'has', s: ['have', 'is', 'are'],
  v: 'Với "half of / most of / some of", động từ chia theo danh từ SAU "of" — "cake" không đếm được nên số ít.',
  sv: { have: 'sai số, cake là danh từ không đếm được', is: 'sai cấu trúc, "been eaten" cần trợ động từ have', are: 'sai cả số lẫn cấu trúc' } },
{ q: 'Half of the students ____ already submitted their assignments.', d: 'have', s: ['has', 'is', 'was'],
  v: 'Cùng cấu trúc "half of" nhưng danh từ sau "of" là "students" số nhiều ⇒ động từ số nhiều.',
  sv: { has: 'sai số, students là số nhiều', is: 'sai cấu trúc, "submitted" cần trợ động từ have', was: 'sai cả số lẫn cấu trúc' } },
{ q: 'The number of road accidents ____ decreased significantly.', d: 'has', s: ['have', 'are', 'were'],
  v: '"The number of" nghĩa là "số lượng", bản thân là số ÍT.',
  sv: { have: 'nhầm với "a number of" đi động từ số nhiều', are: 'sai cấu trúc, "decreased" cần trợ động từ have', were: 'sai cả số lẫn cấu trúc' } },
{ q: 'My family ____ going on holiday next week.', d: 'is', s: ['are being', 'have', 'has been'],
  v: 'Danh từ tập hợp như family, team, government coi cả nhóm là một khối thì chia số ít.',
  sv: { 'are being': 'sai cấu trúc, thừa "being"', have: 'sai cấu trúc, "going" cần động từ to be', 'has been': 'sai thì, câu nói về tương lai gần' } },
{ q: 'There ____ a lot of problems that we need to discuss.', d: 'are', s: ['is', 'was', 'has been'],
  v: 'Trong cấu trúc "There + be", động từ chia theo danh từ đứng SAU nó — "problems" số nhiều.',
  sv: { is: 'chia theo "a lot" thay vì theo "problems"', was: 'sai cả số lẫn thì', 'has been': 'sai số' } }
], 'Ba bẫy hay gặp nhất: ① cụm giới từ chen giữa chủ ngữ và động từ (the list OF ITEMS is) ② either…or và not only…but also chia theo chủ ngữ GẦN động từ nhất '
 + '③ cặp đối lập a number of (số nhiều) với the number of (số ít). Luôn tìm chủ ngữ CHÍNH trước khi chia.'),

/* ---------- 4. CÂU HỎI ĐUÔI ---------- */
bo('anh-cauhoiduoi', 'Ngữ pháp khác', 2, 'Chọn câu hỏi đuôi đúng:', [
{ q: 'She has finished her homework, ____', d: 'hasn\'t she?', s: ['didn\'t she?', 'doesn\'t she?', 'isn\'t she?'],
  v: 'Mệnh đề chính dùng trợ động từ "has" ⇒ đuôi phủ định dùng đúng trợ động từ đó.',
  sv: { 'didn\'t she?': 'sai thì, câu ở hiện tại hoàn thành chứ không phải quá khứ đơn', 'doesn\'t she?': 'sai trợ động từ, "has" ở đây là trợ động từ chứ không phải động từ thường', 'isn\'t she?': 'sai trợ động từ hoàn toàn' } },
{ q: 'Let\'s go out for dinner, ____', d: 'shall we?', s: ['will you?', 'don\'t we?', 'do we?'],
  v: 'Sau "Let\'s" luôn dùng đuôi "shall we?".',
  sv: { 'will you?': 'dùng cho câu mệnh lệnh (Open the door, will you?), không dùng cho Let\'s', 'don\'t we?': 'không có cấu trúc này với Let\'s', 'do we?': 'không có cấu trúc này với Let\'s' } },
{ q: 'Close the window, ____', d: 'will you?', s: ['shall we?', 'do you?', 'won\'t you?'],
  v: 'Câu MỆNH LỆNH dùng đuôi "will you?".',
  sv: { 'shall we?': 'chỉ dùng sau Let\'s', 'do you?': 'không dùng cho câu mệnh lệnh', 'won\'t you?': 'dùng được nhưng mang sắc thái mời mọc, không phải đáp án chuẩn của dạng này' } },
{ q: 'I am late, ____', d: 'aren\'t I?', s: ['amn\'t I?', 'am not I?', 'isn\'t it?'],
  v: '"I am" có dạng đuôi phủ định đặc biệt là "aren\'t I?" — tiếng Anh không có dạng "amn\'t".',
  sv: { 'amn\'t I?': 'dạng này không tồn tại trong tiếng Anh chuẩn', 'am not I?': 'sai trật tự và không phải dạng rút gọn', 'isn\'t it?': 'sai chủ ngữ, phải nhắc lại "I"' } },
{ q: 'Nobody called me this morning, ____', d: 'did they?', s: ['didn\'t they?', 'did he?', 'didn\'t it?'],
  v: 'Chủ ngữ "nobody, everyone, someone" được thay bằng "they" ở đuôi; mệnh đề chính mang nghĩa PHỦ ĐỊNH nên đuôi ở dạng khẳng định.',
  sv: { 'didn\'t they?': 'mệnh đề chính đã phủ định (nobody) nên đuôi phải khẳng định', 'did he?': 'phải dùng "they" cho đại từ bất định', 'didn\'t it?': 'sai cả đại từ lẫn dấu' } },
{ q: 'There is nothing wrong with the machine, ____', d: 'is there?', s: ['isn\'t there?', 'is it?', 'does it?'],
  v: 'Với "There is/are", đuôi nhắc lại "there"; "nothing" đã mang nghĩa phủ định nên đuôi khẳng định.',
  sv: { 'isn\'t there?': 'mệnh đề chính đã phủ định bởi "nothing"', 'is it?': 'phải nhắc lại "there" chứ không phải "it"', 'does it?': 'sai cả trợ động từ lẫn chủ ngữ' } },
{ q: 'You have never been to Japan, ____', d: 'have you?', s: ['haven\'t you?', 'did you?', 'do you?'],
  v: '"Never" là từ mang nghĩa phủ định ⇒ mệnh đề chính coi như phủ định, đuôi ở dạng khẳng định.',
  sv: { 'haven\'t you?': 'quên rằng "never" đã phủ định rồi', 'did you?': 'sai thì, câu ở hiện tại hoàn thành', 'do you?': 'sai trợ động từ' } },
{ q: 'He rarely eats out, ____', d: 'does he?', s: ['doesn\'t he?', 'is he?', 'did he?'],
  v: 'Các trạng từ tần suất phủ định (rarely, seldom, hardly, scarcely) làm câu mang nghĩa phủ định ⇒ đuôi khẳng định.',
  sv: { 'doesn\'t he?': 'quên rằng "rarely" đã mang nghĩa phủ định', 'is he?': 'sai trợ động từ với động từ thường', 'did he?': 'sai thì' } },
{ q: 'Everything is ready for the party, ____', d: 'isn\'t it?', s: ['aren\'t they?', 'isn\'t everything?', 'is it?'],
  v: '"Everything, something, nothing" được thay bằng "it" ở đuôi.',
  sv: { 'aren\'t they?': '"they" chỉ dùng cho đại từ chỉ NGƯỜI như everybody', 'isn\'t everything?': 'đuôi phải dùng đại từ, không lặp lại danh từ', 'is it?': 'mệnh đề chính khẳng định nên đuôi phải phủ định' } },
{ q: 'They won\'t come to the meeting, ____', d: 'will they?', s: ['won\'t they?', 'do they?', 'did they?'],
  v: 'Mệnh đề chính phủ định ⇒ đuôi khẳng định, dùng đúng trợ động từ "will".',
  sv: { 'won\'t they?': 'cả hai vế cùng phủ định là sai quy tắc', 'do they?': 'sai trợ động từ', 'did they?': 'sai cả thì lẫn trợ động từ' } },
{ q: 'Your sister used to live in Da Nang, ____', d: 'didn\'t she?', s: ['usedn\'t she?', 'doesn\'t she?', 'wasn\'t she?'],
  v: '"Used to" chia như động từ thường ở quá khứ ⇒ đuôi dùng "didn\'t".',
  sv: { 'usedn\'t she?': 'dạng cổ, không dùng trong tiếng Anh hiện đại và không phải đáp án chuẩn', 'doesn\'t she?': 'sai thì, "used to" là quá khứ', 'wasn\'t she?': 'sai trợ động từ với động từ thường' } },
{ q: 'I think he will pass the exam, ____', d: 'won\'t he?', s: ['don\'t I?', 'do I?', 'will I?'],
  v: 'Khi mệnh đề chính là "I think / I believe", đuôi lấy theo MỆNH ĐỀ SAU chứ không theo "I think".',
  sv: { 'don\'t I?': 'lấy theo "I think" là sai — đây chính là bẫy của dạng này', 'do I?': 'vừa lấy sai mệnh đề vừa sai dấu', 'will I?': 'sai chủ ngữ' } }
], 'Bốn luật: ① khẳng định thì đuôi phủ định và ngược lại ② never, rarely, hardly, nobody, nothing đã là phủ định rồi '
 + '③ Let\'s → shall we, câu mệnh lệnh → will you, I am → aren\'t I ④ sau "I think" thì lấy đuôi theo mệnh đề SAU.'),

/* ---------- 5. LIÊN TỪ ---------- */
bo('anh-lientu', 'Ngữ pháp khác', 3, 'Chọn liên từ phù hợp nhất:', [
{ q: '____ the heavy rain, they decided to continue the journey.', d: 'Despite', s: ['Although', 'Because of', 'However'],
  v: '"Despite / In spite of + DANH TỪ hoặc V-ing" diễn tả sự nhượng bộ. "The heavy rain" là cụm danh từ.',
  sv: { Although: 'là liên từ, phía sau phải là MỆNH ĐỀ có chủ ngữ và động từ', 'Because of': 'chỉ nguyên nhân, sai logic — mưa to thì không phải lí do để đi tiếp', However: 'là trạng từ nối, phải đứng sau dấu chấm hoặc chấm phẩy' } },
{ q: '____ it was raining heavily, they decided to continue the journey.', d: 'Although', s: ['Despite', 'In spite of', 'Because of'],
  v: '"Although / Though / Even though + MỆNH ĐỀ". Ở đây "it was raining" là mệnh đề đầy đủ.',
  sv: { Despite: 'là giới từ, phía sau phải là danh từ hoặc V-ing', 'In spite of': 'cũng là giới từ, không nối được mệnh đề', 'Because of': 'vừa là giới từ vừa sai logic' } },
{ q: 'He was absent ____ he was seriously ill.', d: 'because', s: ['because of', 'despite', 'in spite of'],
  v: '"Because + MỆNH ĐỀ" chỉ nguyên nhân. "He was seriously ill" là mệnh đề.',
  sv: { 'because of': 'là giới từ, phía sau phải là danh từ', despite: 'sai logic, đây là quan hệ nhân quả chứ không nhượng bộ', 'in spite of': 'sai cả loại từ lẫn logic' } },
{ q: 'The match was cancelled ____ the bad weather.', d: 'because of', s: ['because', 'although', 'so that'],
  v: '"Because of + DANH TỪ". "The bad weather" là cụm danh từ.',
  sv: { because: 'là liên từ, phía sau phải là mệnh đề', although: 'sai logic, đây là nhân quả', 'so that': 'chỉ mục đích, không phải nguyên nhân' } },
{ q: 'She studies hard ____ she can pass the entrance exam.', d: 'so that', s: ['so as to', 'in order', 'because'],
  v: '"So that + MỆNH ĐỀ" chỉ mục đích.',
  sv: { 'so as to': 'phía sau phải là động từ nguyên thể, không phải mệnh đề có chủ ngữ', 'in order': 'thiếu "to" hoặc "that" nên không hoàn chỉnh', because: 'chỉ nguyên nhân chứ không phải mục đích' } },
{ q: 'He got up early ____ catch the first bus.', d: 'in order to', s: ['in order that', 'so that', 'because of'],
  v: '"In order to + ĐỘNG TỪ NGUYÊN THỂ" chỉ mục đích khi hai vế cùng chủ ngữ.',
  sv: { 'in order that': 'phía sau phải là mệnh đề có chủ ngữ và động từ chia', 'so that': 'cũng cần mệnh đề đầy đủ phía sau', 'because of': 'chỉ nguyên nhân và cần danh từ theo sau' } },
{ q: 'It was raining hard; ____, we still went camping.', d: 'however', s: ['although', 'despite', 'because'],
  v: '"However" là trạng từ nối, đứng sau dấu chấm phẩy hoặc dấu chấm và có dấu phẩy theo sau.',
  sv: { although: 'là liên từ, không đứng sau dấu chấm phẩy theo kiểu này', despite: 'là giới từ, cần danh từ theo sau', because: 'sai logic, hai vế đối lập nhau' } },
{ q: 'She is not only intelligent ____ also very hard-working.', d: 'but', s: ['and', 'or', 'so'],
  v: 'Cặp liên từ tương liên cố định "not only… but also".',
  sv: { and: 'không tạo thành cặp với "not only"', or: 'không tạo thành cặp với "not only"', so: 'chỉ kết quả, không phải cặp tương liên' } },
{ q: '____ you leave now, you will miss the last train.', d: 'Unless', s: ['If', 'Although', 'Because'],
  v: '"Unless" = "if… not". Câu nghĩa: nếu bạn KHÔNG đi ngay thì sẽ lỡ chuyến tàu.',
  sv: { If: 'làm câu sai logic — đi ngay thì đâu có lỡ tàu', Although: 'sai logic, đây là quan hệ điều kiện', Because: 'sai logic, chưa xảy ra nên không phải nguyên nhân' } },
{ q: 'He kept working ____ he was very tired.', d: 'even though', s: ['even', 'despite', 'due to'],
  v: '"Even though + MỆNH ĐỀ", nhấn mạnh hơn "although".',
  sv: { even: 'là trạng từ nhấn mạnh, không nối được hai mệnh đề', despite: 'là giới từ, cần danh từ theo sau', 'due to': 'chỉ nguyên nhân và cần danh từ theo sau' } },
{ q: 'The project failed ____ a lack of funding.', d: 'due to', s: ['due', 'because', 'so'],
  v: '"Due to + DANH TỪ" chỉ nguyên nhân, đồng nghĩa với "because of".',
  sv: { due: 'thiếu "to" nên không nối được với danh từ', because: 'là liên từ, cần mệnh đề theo sau', so: 'chỉ kết quả, ngược chiều logic' } },
{ q: '____ hard he tried, he could not solve the problem.', d: 'However', s: ['Whatever', 'Although', 'Despite'],
  v: 'Cấu trúc "However + tính từ/trạng từ + chủ ngữ + động từ" nghĩa "dù… đến đâu".',
  sv: { Whatever: 'đi với danh từ chứ không với tính từ hay trạng từ', Although: 'không dùng được với trật tự "Although hard he tried"', Despite: 'là giới từ, cần danh từ theo sau' } }
], 'Phân loại theo cái ĐỨNG SAU: cần MỆNH ĐỀ thì dùng although, even though, because, so that, unless; '
 + 'cần DANH TỪ hoặc V-ing thì dùng despite, in spite of, because of, due to. '
 + 'Nhớ cặp: although ⇄ despite và because ⇄ because of — cùng nghĩa nhưng khác loại từ, đề gài chỗ này nhiều nhất.')

,

/* ---------- 6. ĐỘNG TỪ KHUYẾT THIẾU ---------- */
bo('anh-modal', 'Ngữ pháp khác', 3, 'Chọn động từ khuyết thiếu phù hợp nhất:', [
{ q: 'You ____ be tired after such a long flight.', d: 'must', s: ['can\'t', 'needn\'t', 'shouldn\'t'],
  v: '"Must" ở đây không phải nghĩa bắt buộc mà là SUY ĐOÁN CHẮC CHẮN: hẳn là bạn mệt.',
  sv: { 'can\'t': 'nghĩa "chắc chắn không", trái logic với chuyến bay dài', 'needn\'t': 'nghĩa "không cần", không phải suy đoán', 'shouldn\'t': 'nghĩa lời khuyên, không hợp ngữ cảnh' } },
{ q: 'He ____ be at home now — I saw him at the office five minutes ago.', d: 'can\'t', s: ['must', 'may', 'should'],
  v: '"Can\'t" là suy đoán PHỦ ĐỊNH chắc chắn: không thể nào đang ở nhà.',
  sv: { must: 'nghĩa chắc chắn có, trái với dữ kiện vừa thấy ở văn phòng', may: 'nghĩa có thể, quá yếu so với bằng chứng đã có', should: 'nghĩa lời khuyên hoặc dự kiến, không phải suy đoán phủ định' } },
{ q: 'She ____ have missed the bus; that\'s why she is late.', d: 'must', s: ['can\'t', 'needn\'t', 'would'],
  v: '"Must have + V3" suy đoán chắc chắn về QUÁ KHỨ dựa trên bằng chứng.',
  sv: { 'can\'t': 'nghĩa chắc chắn không xảy ra, trái với việc cô ấy đến muộn', 'needn\'t': '"needn\'t have + V3" nghĩa đã làm nhưng không cần thiết', would: 'không dùng để suy đoán quá khứ theo cách này' } },
{ q: 'You ____ have told me earlier; I would have helped you.', d: 'should', s: ['must', 'can', 'will'],
  v: '"Should have + V3" trách móc một việc đáng lẽ phải làm mà đã không làm.',
  sv: { must: 'nghĩa suy đoán chắc chắn, không mang sắc thái trách móc', can: 'không có cấu trúc "can have + V3" với nghĩa này', will: 'sai thì, câu nói về quá khứ' } },
{ q: 'We ____ hurry; there is still plenty of time.', d: 'needn\'t', s: ['mustn\'t', 'can\'t', 'shouldn\'t have'],
  v: '"Needn\'t" nghĩa KHÔNG CẦN THIẾT, hợp với vế "vẫn còn nhiều thời gian".',
  sv: { 'mustn\'t': 'nghĩa CẤM, mạnh hơn hẳn và sai sắc thái', 'can\'t': 'nghĩa không thể, sai nghĩa', 'shouldn\'t have': 'sai thì, câu ở hiện tại' } },
{ q: 'Passengers ____ smoke anywhere on the aircraft.', d: 'mustn\'t', s: ['needn\'t', 'don\'t have to', 'may not have'],
  v: '"Mustn\'t" diễn tả điều CẤM theo quy định.',
  sv: { 'needn\'t': 'nghĩa không cần, trong khi đây là cấm tuyệt đối', 'don\'t have to': 'cũng nghĩa không bắt buộc, không phải cấm', 'may not have': 'sai cấu trúc trong ngữ cảnh nội quy' } },
{ q: 'When I was a child, I ____ swim across the river easily.', d: 'could', s: ['can', 'was able to swim', 'might'],
  v: '"Could" diễn tả KHẢ NĂNG chung trong quá khứ.',
  sv: { can: 'sai thì, câu nói về thời thơ ấu', 'was able to swim': 'lặp động từ swim hai lần nên câu sai ngữ pháp', might: 'nghĩa có thể xảy ra, không phải năng lực' } },
{ q: 'The road is wet. It ____ rained last night.', d: 'may have', s: ['may', 'must be', 'should'],
  v: '"May have + V3" suy đoán KHÔNG chắc chắn về quá khứ.',
  sv: { may: 'thiếu "have + V3" nên không diễn tả được quá khứ', 'must be': 'thiếu have và sai mức độ chắc chắn', should: 'nghĩa lời khuyên hoặc dự kiến' } },
{ q: 'You ____ have watered the plants — it rained all night.', d: 'needn\'t', s: ['mustn\'t', 'couldn\'t', 'shouldn\'t'],
  v: '"Needn\'t have + V3" nghĩa đã làm rồi nhưng hoá ra không cần thiết.',
  sv: { 'mustn\'t': 'nghĩa cấm, không đi với "have + V3" theo nghĩa này', 'couldn\'t': 'nghĩa không thể làm được', 'shouldn\'t': 'mang sắc thái trách móc là sai, tưới cây đâu có gì sai' } },
{ q: '____ I use your phone for a moment?', d: 'May', s: ['Must', 'Should', 'Would'],
  v: '"May I…?" là cách XIN PHÉP lịch sự.',
  sv: { Must: 'nghĩa bắt buộc, không dùng để xin phép', Should: 'nghĩa nên, dùng để hỏi lời khuyên', Would: 'phải là "Would you mind if I…" mới đúng cấu trúc' } },
{ q: 'Students ____ wear uniforms on Mondays; it is a school rule.', d: 'have to', s: ['might', 'could', 'needn\'t'],
  v: '"Have to" diễn tả sự bắt buộc đến từ QUY ĐỊNH bên ngoài.',
  sv: { might: 'nghĩa có thể, quá yếu so với nội quy', could: 'nghĩa khả năng, không phải bắt buộc', 'needn\'t': 'nghĩa không cần, ngược hoàn toàn' } },
{ q: 'I ____ finish this report by tomorrow, or my boss will be angry.', d: 'must', s: ['can', 'may', 'used to'],
  v: '"Must" diễn tả sự bắt buộc xuất phát từ chính người nói, kèm hậu quả nếu không làm.',
  sv: { can: 'nghĩa khả năng, không phải bắt buộc', may: 'nghĩa có thể hoặc được phép', 'used to': 'nói về thói quen trong quá khứ' } }
], 'Chia hai nhóm: NGHĨA GỐC (must bắt buộc, can khả năng, may xin phép) và NGHĨA SUY ĐOÁN '
 + '(must chắc chắn có, can\'t chắc chắn không, may/might có thể). Thêm "have + V3" là chuyển hết sang quá khứ. '
 + 'Nhớ ba cặp dễ lẫn: mustn\'t (cấm) ≠ needn\'t (không cần) · should have (đáng lẽ phải làm mà không làm) ≠ needn\'t have (đã làm nhưng không cần).'),

/* ---------- 7. CỤM ĐỘNG TỪ ---------- */
bo('anh-phrasal', 'Ngữ pháp khác', 3, 'Chọn cụm động từ có nghĩa phù hợp:', [
{ q: 'The meeting was ____ because of the storm. (bị huỷ)', d: 'called off', s: ['called on', 'called up', 'called for'],
  v: '"Call off" nghĩa là huỷ bỏ.',
  sv: { 'called on': 'nghĩa ghé thăm hoặc kêu gọi ai làm gì', 'called up': 'nghĩa gọi điện thoại hoặc triệu tập nhập ngũ', 'called for': 'nghĩa đòi hỏi, yêu cầu' } },
{ q: 'She ____ smoking last year. (bỏ, từ bỏ)', d: 'gave up', s: ['gave in', 'gave away', 'gave off'],
  v: '"Give up" nghĩa là từ bỏ một thói quen.',
  sv: { 'gave in': 'nghĩa nhượng bộ, chịu thua', 'gave away': 'nghĩa cho đi hoặc để lộ bí mật', 'gave off': 'nghĩa toả ra mùi hoặc khí' } },
{ q: 'We need to ____ this problem before the deadline. (giải quyết)', d: 'deal with', s: ['deal in', 'do with', 'put up with'],
  v: '"Deal with" nghĩa là xử lí, giải quyết.',
  sv: { 'deal in': 'nghĩa buôn bán mặt hàng gì', 'do with': 'phải là "have something to do with" mới có nghĩa liên quan', 'put up with': 'nghĩa chịu đựng chứ không phải giải quyết' } },
{ q: 'I can\'t ____ his rude behaviour any longer. (chịu đựng)', d: 'put up with', s: ['put off', 'put on', 'put down'],
  v: '"Put up with" nghĩa là chịu đựng.',
  sv: { 'put off': 'nghĩa hoãn lại', 'put on': 'nghĩa mặc vào hoặc tăng cân', 'put down': 'nghĩa đặt xuống hoặc hạ thấp ai đó' } },
{ q: 'The plane will ____ in ten minutes. (cất cánh)', d: 'take off', s: ['take up', 'take over', 'take after'],
  v: '"Take off" nghĩa là máy bay cất cánh (hoặc cởi đồ ra).',
  sv: { 'take up': 'nghĩa bắt đầu một sở thích hoặc chiếm chỗ', 'take over': 'nghĩa tiếp quản', 'take after': 'nghĩa giống ai đó trong nhà' } },
{ q: 'He ____ his father — they have the same eyes. (giống)', d: 'takes after', s: ['takes on', 'takes in', 'takes off'],
  v: '"Take after" nghĩa là giống một người thân trong gia đình.',
  sv: { 'takes on': 'nghĩa nhận thêm việc hoặc thuê người', 'takes in': 'nghĩa tiếp thu hoặc lừa gạt', 'takes off': 'nghĩa cất cánh hoặc cởi ra' } },
{ q: 'Please ____ the light before leaving the room. (tắt)', d: 'turn off', s: ['turn on', 'turn up', 'turn down'],
  v: '"Turn off" nghĩa là tắt thiết bị.',
  sv: { 'turn on': 'nghĩa bật lên, ngược hoàn toàn', 'turn up': 'nghĩa vặn to lên hoặc xuất hiện', 'turn down': 'nghĩa vặn nhỏ lại hoặc từ chối' } },
{ q: 'She ____ the job offer because the salary was too low. (từ chối)', d: 'turned down', s: ['turned up', 'turned into', 'turned out'],
  v: '"Turn down" nghĩa là từ chối một lời đề nghị.',
  sv: { 'turned up': 'nghĩa xuất hiện hoặc vặn to', 'turned into': 'nghĩa biến thành', 'turned out': 'nghĩa hoá ra là' } },
{ q: 'The doctor advised him to ____ on sugar. (cắt giảm)', d: 'cut down', s: ['cut off', 'cut out', 'cut in'],
  v: '"Cut down on" nghĩa là giảm bớt lượng tiêu thụ.',
  sv: { 'cut off': 'nghĩa cắt đứt, ngắt kết nối', 'cut out': 'nghĩa bỏ hẳn, và không đi với "on"', 'cut in': 'nghĩa chen ngang lời người khác' } },
{ q: 'Scientists are trying to ____ a cure for the disease. (tìm ra)', d: 'come up with', s: ['come across', 'come along', 'come over'],
  v: '"Come up with" nghĩa là nghĩ ra, tìm ra một ý tưởng hay giải pháp.',
  sv: { 'come across': 'nghĩa tình cờ bắt gặp, không có chủ đích', 'come along': 'nghĩa đi cùng hoặc tiến triển', 'come over': 'nghĩa ghé qua nhà ai' } },
{ q: 'I ____ an old photo while cleaning my room. (tình cờ thấy)', d: 'came across', s: ['came up with', 'came out', 'came round'],
  v: '"Come across" nghĩa là tình cờ bắt gặp.',
  sv: { 'came up with': 'nghĩa nghĩ ra, có chủ đích', 'came out': 'nghĩa xuất bản hoặc lộ ra', 'came round': 'nghĩa tỉnh lại hoặc ghé thăm' } },
{ q: 'The company had to ____ fifty workers last month. (sa thải)', d: 'lay off', s: ['lay out', 'lay down', 'lay up'],
  v: '"Lay off" nghĩa là cho thôi việc vì lí do kinh tế.',
  sv: { 'lay out': 'nghĩa bố trí, sắp xếp', 'lay down': 'nghĩa đặt ra quy định', 'lay up': 'nghĩa dự trữ hoặc nằm liệt giường' } }
], 'Cụm động từ phải học theo CẢ CỤM, không suy từ nghĩa của từng từ. '
 + 'Mẹo giới hạn phạm vi: off thường mang nghĩa tách rời hoặc dừng lại (call off, turn off, take off, lay off); '
 + 'up thường mang nghĩa hoàn tất hoặc tăng lên (give up, turn up, come up with); '
 + 'down thường mang nghĩa giảm hoặc hạ (turn down, cut down, lay down).'),

/* ---------- 8. CÂU ƯỚC ---------- */
bo('anh-cauuoc', 'Ngữ pháp khác', 3, 'Chọn phương án đúng:', [
{ q: 'I wish I ____ more time to finish this project.', d: 'had', s: ['have', 'will have', 'had had'],
  v: 'Ước ở HIỆN TẠI dùng quá khứ đơn sau "wish".',
  sv: { have: 'sau wish không dùng hiện tại đơn', 'will have': 'sau wish không dùng will', 'had had': 'quá khứ hoàn thành dùng cho ước ở QUÁ KHỨ' } },
{ q: 'She wishes she ____ to the party last night.', d: 'had gone', s: ['went', 'goes', 'would go'],
  v: 'Ước về QUÁ KHỨ dùng quá khứ hoàn thành "had + V3".',
  sv: { went: 'quá khứ đơn dùng cho ước ở hiện tại', goes: 'sai hoàn toàn về thì', 'would go': 'dùng cho mong muốn về tương lai' } },
{ q: 'I wish it ____ raining so I could go out.', d: 'would stop', s: ['stops', 'stopped', 'had stopped'],
  v: '"Wish + would" diễn tả mong muốn một việc THAY ĐỔI trong tương lai, thường kèm sự khó chịu.',
  sv: { stops: 'sau wish không dùng hiện tại đơn', stopped: 'diễn tả ước trái hiện tại, không phải mong muốn thay đổi', 'had stopped': 'diễn tả tiếc nuối về quá khứ' } },
{ q: 'If only I ____ harder for the exam last year!', d: 'had studied', s: ['studied', 'study', 'would study'],
  v: '"If only" dùng như "wish"; có "last year" nên đây là tiếc nuối QUÁ KHỨ ⇒ quá khứ hoàn thành.',
  sv: { studied: 'quá khứ đơn dùng cho ước ở hiện tại', study: 'sai thì hoàn toàn', 'would study': 'dùng cho mong muốn tương lai' } },
{ q: 'I wish I ____ taller.', d: 'were', s: ['am', 'was going to be', 'will be'],
  v: 'Sau "wish", động từ to be dùng "were" cho MỌI chủ ngữ trong văn viết chuẩn.',
  sv: { am: 'sau wish không dùng hiện tại', 'was going to be': 'sai cấu trúc và sai nghĩa', 'will be': 'sau wish không dùng will' } },
{ q: 'He wishes he ____ so much money on that car.', d: 'hadn\'t spent', s: ['didn\'t spend', 'doesn\'t spend', 'wouldn\'t spend'],
  v: 'Tiếc nuối về hành động đã làm trong quá khứ ⇒ "hadn\'t + V3".',
  sv: { 'didn\'t spend': 'quá khứ đơn dùng cho ước trái hiện tại', 'doesn\'t spend': 'sai thì hoàn toàn', 'wouldn\'t spend': 'dùng cho mong muốn tương lai' } },
{ q: 'I wish my neighbours ____ so much noise every night.', d: 'wouldn\'t make', s: ['didn\'t make', 'don\'t make', 'hadn\'t made'],
  v: 'Phàn nàn về hành vi lặp lại của NGƯỜI KHÁC và mong họ đổi ⇒ "wish + wouldn\'t".',
  sv: { 'didn\'t make': 'diễn tả trạng thái trái hiện tại chứ không phải mong người khác thay đổi', 'don\'t make': 'sau wish không dùng hiện tại', 'hadn\'t made': 'diễn tả tiếc nuối quá khứ, mà đây là chuyện vẫn đang xảy ra' } },
{ q: 'It\'s time we ____ home; it\'s getting dark.', d: 'went', s: ['go', 'will go', 'had gone'],
  v: 'Cấu trúc "It\'s time + chủ ngữ + QUÁ KHỨ ĐƠN" nghĩa đã đến lúc phải làm gì.',
  sv: { go: 'sau "It\'s time + S" phải dùng quá khứ đơn', 'will go': 'không dùng will trong cấu trúc này', 'had gone': 'quá khứ hoàn thành không dùng ở đây' } },
{ q: 'I\'d rather you ____ smoke in this room.', d: 'didn\'t', s: ['don\'t', 'won\'t', 'hadn\'t'],
  v: '"Would rather + chủ ngữ khác + QUÁ KHỨ ĐƠN" diễn tả mong muốn ở hiện tại.',
  sv: { 'don\'t': 'sau "would rather + S" phải dùng quá khứ đơn', 'won\'t': 'không dùng will trong cấu trúc này', 'hadn\'t': 'quá khứ hoàn thành dùng khi nói về quá khứ' } },
{ q: 'Suppose you ____ a million dollars, what would you do?', d: 'won', s: ['win', 'will win', 'had won'],
  v: '"Suppose / What if + quá khứ đơn" giả định trái với hiện tại, hợp với "would do" ở vế sau.',
  sv: { win: 'không tạo được giả định trái hiện tại', 'will win': 'không dùng will trong mệnh đề giả định', 'had won': 'sẽ hợp nếu vế sau là "would have done"' } },
{ q: 'She talks as if she ____ everything about the subject.', d: 'knew', s: ['knows', 'has known', 'will know'],
  v: '"As if / as though + quá khứ đơn" diễn tả điều KHÔNG có thật ở hiện tại.',
  sv: { knows: 'diễn tả điều có thật, mất sắc thái nghi ngờ mà câu muốn truyền tải', 'has known': 'sai thì cho cấu trúc giả định', 'will know': 'không dùng will sau as if theo nghĩa này' } },
{ q: 'He behaved as though nothing ____ the day before.', d: 'had happened', s: ['happened', 'happens', 'would happen'],
  v: 'Sự việc giả định xảy ra TRƯỚC thời điểm quá khứ đang nói ⇒ quá khứ hoàn thành.',
  sv: { happened: 'chỉ dùng khi hai việc cùng thời điểm', happens: 'sai thì hoàn toàn', 'would happen': 'diễn tả tương lai trong quá khứ, sai nghĩa' } }
], 'Một quy tắc chung cho cả nhóm giả định (wish, if only, it\'s time, would rather, as if): '
 + 'lùi một thì so với thực tế. Trái HIỆN TẠI thì lùi về quá khứ đơn; trái QUÁ KHỨ thì lùi về quá khứ hoàn thành; '
 + 'muốn người khác THAY ĐỔI thì dùng would. Sau wish, to be luôn là "were" với mọi chủ ngữ.'),

/* ---------- 9. MỆNH ĐỀ RÚT GỌN ---------- */
bo('anh-rutgon', 'Ngữ pháp khác', 4, 'Chọn phương án đúng để hoàn thành câu:', [
{ q: '____ the exam, the students went home happily.', d: 'Having finished', s: ['Finishing', 'Finished', 'To finish'],
  v: 'Hành động "làm xong bài thi" xảy ra TRƯỚC hành động "về nhà" ⇒ dùng phân từ hoàn thành "Having + V3".',
  sv: { Finishing: 'chỉ dùng khi hai hành động xảy ra ĐỒNG THỜI', Finished: 'dạng bị động, mà chủ ngữ students là người chủ động làm bài', 'To finish': 'chỉ mục đích, sai logic thời gian' } },
{ q: '____ in 1990, the bridge is now over thirty years old.', d: 'Built', s: ['Building', 'Having built', 'To build'],
  v: 'Cây cầu ĐƯỢC xây nên dùng dạng bị động rút gọn là phân từ hai "Built".',
  sv: { Building: 'dạng chủ động, mà cây cầu không tự xây được', 'Having built': 'cũng là chủ động', 'To build': 'chỉ mục đích, sai nghĩa' } },
{ q: 'The man ____ next to my father is my uncle.', d: 'sitting', s: ['sat', 'sits', 'to sit'],
  v: 'Rút gọn mệnh đề quan hệ chủ động "who is sitting" thành phân từ hiện tại "sitting".',
  sv: { sat: 'dạng bị động, mà "ngồi" là hành động chủ động', sits: 'động từ chia, không rút gọn được mệnh đề quan hệ', 'to sit': 'chỉ dùng sau so sánh nhất hoặc số thứ tự' } },
{ q: 'The letters ____ yesterday will arrive next week.', d: 'sent', s: ['sending', 'to send', 'send'],
  v: 'Những lá thư ĐƯỢC gửi ⇒ rút gọn bị động, dùng phân từ hai "sent".',
  sv: { sending: 'dạng chủ động, mà thư không tự gửi được', 'to send': 'chỉ mục đích, sai nghĩa', send: 'động từ nguyên thể không rút gọn được' } },
{ q: '____ by the heavy traffic, we arrived at the airport very late.', d: 'Delayed', s: ['Delaying', 'Having delayed', 'To delay'],
  v: 'Chúng tôi BỊ giao thông làm chậm ⇒ dạng bị động, dùng phân từ hai.',
  sv: { Delaying: 'dạng chủ động, sai nghĩa vì chúng tôi không làm chậm ai', 'Having delayed': 'cũng chủ động', 'To delay': 'chỉ mục đích, sai nghĩa' } },
{ q: 'She is the only student ____ the scholarship this year.', d: 'to receive', s: ['receiving', 'received', 'to be received'],
  v: 'Sau "the only, the first, the last" và so sánh nhất, mệnh đề quan hệ rút gọn thành "to + V".',
  sv: { receiving: 'không dùng phân từ hiện tại sau "the only"', received: 'dạng bị động, mà sinh viên chủ động nhận học bổng', 'to be received': 'dạng bị động, sai nghĩa' } },
{ q: '____ hard all morning, he felt exhausted at noon.', d: 'Having worked', s: ['Working', 'Worked', 'To work'],
  v: 'Việc làm suốt buổi sáng xảy ra TRƯỚC cảm giác mệt lúc trưa ⇒ phân từ hoàn thành.',
  sv: { Working: 'dùng khi hai việc đồng thời, ở đây có mốc thời gian tách bạch', Worked: 'dạng bị động, sai nghĩa', 'To work': 'chỉ mục đích' } },
{ q: 'Not ____ the answer, he decided to ask his teacher.', d: 'knowing', s: ['known', 'to know', 'having known'],
  v: 'Rút gọn mệnh đề chỉ nguyên nhân chủ động, dạng phủ định đặt "not" TRƯỚC phân từ.',
  sv: { known: 'dạng bị động, sai nghĩa vì anh ta chủ động không biết', 'to know': 'chỉ mục đích, sai logic', 'having known': 'phân từ hoàn thành diễn tả việc đã hoàn tất trước, không hợp nghĩa "không biết"' } },
{ q: 'The house ____ on the hill belongs to my grandmother.', d: 'standing', s: ['stood', 'stands', 'to stand'],
  v: 'Rút gọn "which stands" thành phân từ hiện tại vì đây là hành động chủ động của chủ ngữ.',
  sv: { stood: 'dạng bị động, mà "stand" ở đây là nội động từ chủ động', stands: 'động từ chia, không rút gọn được', 'to stand': 'chỉ dùng sau so sánh nhất hoặc số thứ tự' } },
{ q: '____ the truth, she would have forgiven him.', d: 'Had she known', s: ['If she knew', 'Should she know', 'Were she to know'],
  v: 'Đảo ngữ câu điều kiện loại ba: "Had + S + V3" thay cho "If + S + had + V3"; vế sau "would have forgiven" xác nhận loại ba.',
  sv: { 'If she knew': 'là loại hai, không khớp với "would have forgiven" ở vế sau', 'Should she know': 'đảo ngữ của loại một, sai loại', 'Were she to know': 'đảo ngữ của loại hai, sai loại' } },
{ q: 'The report ____ by the committee last week has been published.', d: 'approved', s: ['approving', 'to approve', 'approves'],
  v: 'Báo cáo ĐƯỢC uỷ ban phê duyệt ⇒ rút gọn bị động bằng phân từ hai.',
  sv: { approving: 'dạng chủ động, mà báo cáo không tự phê duyệt', 'to approve': 'chỉ mục đích, sai nghĩa', approves: 'động từ chia, không rút gọn được' } },
{ q: '____ finished the report, she sent it to her manager immediately.', d: 'Having', s: ['After', 'When', 'While'],
  v: '"Having + V3" mở đầu mệnh đề rút gọn chỉ việc đã hoàn tất trước.',
  sv: { After: 'là liên từ, phía sau phải là mệnh đề đầy đủ hoặc V-ing chứ không phải V3', When: 'cũng cần mệnh đề đầy đủ phía sau', While: 'cần mệnh đề đầy đủ hoặc V-ing' } }
], 'Ba câu hỏi tự đặt khi gặp dạng rút gọn: ① chủ ngữ CHỦ ĐỘNG hay BỊ ĐỘNG — chủ động dùng V-ing, bị động dùng V3 '
 + '② hai hành động ĐỒNG THỜI hay TRƯỚC SAU — trước sau thì dùng Having + V3 '
 + '③ có "the only / the first / so sánh nhất" đứng trước không — có thì dùng "to + V".',
 'Bước 1 — khôi phục mệnh đề đầy đủ: chỗ trống vốn là một mệnh đề có chủ ngữ và động từ chia, '
 + 'hãy viết lại nó ra nháp để nhìn rõ chủ ngữ thật sự là ai.\n'
 + 'Bước 2 — xác định chủ ngữ đó CHỦ ĐỘNG làm hay BỊ ĐỘNG chịu hành động: chủ động rút thành V-ing, '
 + 'bị động rút thành V3/V-ed. Đây là chỗ mất điểm nhiều nhất vì hai dạng nhìn na ná nhau.\n'
 + 'Bước 3 — so mốc thời gian giữa hai vế: cùng lúc thì giữ V-ing, vế rút xảy ra xong trước rồi mới tới vế chính '
 + 'thì phải nâng lên "Having + V3".\n'
 + 'Bước 4 — soát lại danh từ đứng ngay trước chỗ trống, vì phân từ rút gọn luôn bổ nghĩa cho danh từ gần nhất; '
 + 'nếu ghép vào mà nghĩa vô lí thì phương án đó sai dù đúng dạng.'),

/* ---------- 10. DANH TỪ ĐẾM ĐƯỢC VÀ KHÔNG ĐẾM ĐƯỢC ---------- */
bo('anh-danhtu', 'Từ loại', 1, 'Chọn phương án đúng:', [
{ q: 'She gave me some useful ____ about the exam.', d: 'advice', s: ['advices', 'an advice', 'advice\'s'],
  v: '"Advice" là danh từ KHÔNG đếm được nên không có dạng số nhiều và không đi với a/an.',
  sv: { advices: 'danh từ không đếm được không thêm s', 'an advice': 'không đếm được nên không đi với mạo từ a/an', 'advice\'s': 'dạng sở hữu cách, sai ngữ cảnh' } },
{ q: 'I need to buy a new pair of ____.', d: 'trousers', s: ['trouser', 'trouserses', 'a trousers'],
  v: 'Các danh từ chỉ vật có hai phần (trousers, glasses, scissors, jeans) luôn ở dạng SỐ NHIỀU.',
  sv: { trouser: 'không có dạng số ít trong nghĩa cái quần', trouserses: 'không tồn tại', 'a trousers': 'không đi với a vì luôn số nhiều' } },
{ q: 'How much ____ do you need for the project?', d: 'money', s: ['moneys', 'a money', 'monies'],
  v: '"Money" không đếm được nên đi với "how much" và không có s.',
  sv: { moneys: 'không đếm được nên không thêm s', 'a money': 'không đi với mạo từ a', monies: 'chỉ dùng trong văn bản pháp lí, không phải tiếng Anh phổ thông' } },
{ q: 'There are three ____ standing at the gate.', d: 'children', s: ['childs', 'childrens', 'child'],
  v: '"Child" có dạng số nhiều bất quy tắc là "children".',
  sv: { childs: 'child là danh từ bất quy tắc, không thêm s', childrens: 'children đã là số nhiều rồi, không thêm s nữa', child: 'sau "three" phải là số nhiều' } },
{ q: 'The ____ of this news is not reliable.', d: 'source', s: ['sources are', 'source are', 'sources'],
  v: 'Chủ ngữ số ít "the source" đi với động từ "is" đã có sẵn trong câu.',
  sv: { 'sources are': 'thừa động từ vì câu đã có "is"', 'source are': 'thừa động từ và sai số', sources: 'số nhiều không hợp với "is" trong câu' } },
{ q: 'He bought two ____ of bread this morning.', d: 'loaves', s: ['loafs', 'loaf', 'breads'],
  v: '"Loaf" đổi f thành v khi số nhiều: loaves. "Bread" không đếm được nên phải đếm qua đơn vị.',
  sv: { loafs: 'sai quy tắc, f phải đổi thành v', loaf: 'sau "two" phải là số nhiều', breads: 'bread không đếm được nên không thêm s' } },
{ q: 'Could you give me some ____ about the new policy?', d: 'information', s: ['informations', 'an information', 'informations\''],
  v: '"Information" không đếm được, không có dạng số nhiều.',
  sv: { informations: 'không đếm được nên không thêm s', 'an information': 'không đi với mạo từ a/an', 'informations\'': 'sai cả số nhiều lẫn sở hữu cách' } },
{ q: 'The ____ in this museum are very valuable.', d: 'pieces of art', s: ['arts', 'art', 'piece of art'],
  v: '"Art" không đếm được; muốn đếm phải qua đơn vị "piece of", và "are" đòi chủ ngữ số nhiều.',
  sv: { arts: 'với nghĩa nghệ thuật thì art không đếm được', art: 'không hợp với động từ "are" số nhiều', 'piece of art': 'số ít, không hợp với "are"' } },
{ q: 'My ____ are getting old; I need a new pair.', d: 'glasses', s: ['glass', 'a glass', 'glasses is'],
  v: '"Glasses" nghĩa là cái kính, luôn ở dạng số nhiều và đi với động từ số nhiều.',
  sv: { glass: 'nghĩa là cái cốc hoặc thuỷ tinh, không phải cái kính đeo mắt', 'a glass': 'sai cả nghĩa lẫn số', 'glasses is': 'thừa động từ vì câu đã có "are"' } },
{ q: 'A lot of ____ was damaged in the flood.', d: 'furniture', s: ['furnitures', 'a furniture', 'furnitures were'],
  v: '"Furniture" không đếm được nên đi với động từ số ít "was".',
  sv: { furnitures: 'không đếm được nên không thêm s', 'a furniture': 'không đi với mạo từ a', 'furnitures were': 'sai cả dạng số nhiều lẫn động từ' } },
{ q: 'There are many ____ in the countryside.', d: 'sheep', s: ['sheeps', 'a sheep', 'sheepes'],
  v: '"Sheep" có dạng số nhiều giống hệt số ít, cùng nhóm với fish, deer, series.',
  sv: { sheeps: 'sheep không đổi khi số nhiều', 'a sheep': 'sau "many" phải là số nhiều', sheepes: 'không tồn tại' } },
{ q: 'She has made great ____ in learning English.', d: 'progress', s: ['progresses', 'a progress', 'progressions'],
  v: '"Progress" không đếm được.',
  sv: { progresses: 'không đếm được nên không thêm s', 'a progress': 'không đi với mạo từ a', progressions: 'nghĩa là các chuỗi tiến trình, không phải sự tiến bộ' } }
], 'Danh sách không đếm được hay bị gài nhất: advice, information, news, furniture, luggage, equipment, knowledge, progress, money, work. '
 + 'Muốn đếm thì mượn đơn vị: a piece of advice, a piece of furniture, two loaves of bread. '
 + 'Nhóm luôn số nhiều: trousers, jeans, glasses, scissors. Nhóm không đổi: sheep, fish, deer, series, species.')

]);
})();
