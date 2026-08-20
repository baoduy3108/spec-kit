/* ============================================================
   TIẾNG ANH — KHO MỆNH ĐỀ NGỮ PHÁP & CHIẾN THUẬT (Tà Đạo)
   Mệnh đề viết bằng tiếng Việt về quy tắc tiếng Anh — học quy tắc
   nhanh hơn học từng câu lẻ.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO_LT = TD.KHO_LT || {};

TD.KHO_LT.anh = [
/* ========== THÌ ========== */
{ cd: 'Thì động từ', m: 1, a: true,  t: 'Dấu hiệu "since" đi với mốc thời gian và "for" đi với khoảng thời gian, cả hai đều báo hiệu thì hiện tại hoàn thành.', v: 'Ví dụ: since 2018, for three years → have/has + V3.' },
{ cd: 'Thì động từ', m: 1, a: false, t: 'Dấu hiệu "since" và "for" báo hiệu thì quá khứ đơn.', v: 'Chúng báo hiệu thì HIỆN TẠI HOÀN THÀNH (have/has + V3).' },
{ cd: 'Thì động từ', m: 2, a: true,  t: 'Các trạng từ "already", "yet", "just", "ever", "never" thường đi với thì hiện tại hoàn thành.', v: '"yet" thường ở cuối câu phủ định hoặc nghi vấn.' },
{ cd: 'Thì động từ', m: 2, a: true,  t: 'Cụm "ago", "last week", "yesterday", "in 1990" báo hiệu thì quá khứ đơn.', v: 'Mốc thời gian đã xác định trong quá khứ thì dùng V2/V-ed.' },
{ cd: 'Thì động từ', m: 2, a: false, t: 'Có thể dùng thì hiện tại hoàn thành với trạng ngữ "yesterday".', v: 'Hiện tại hoàn thành KHÔNG đi với mốc thời gian quá khứ xác định. Phải dùng quá khứ đơn.' },
{ cd: 'Thì động từ', m: 2, a: true,  t: 'Thì quá khứ hoàn thành diễn tả hành động xảy ra trước một hành động khác trong quá khứ.', v: 'Thường đi với "before", "after", "by the time".' },
{ cd: 'Thì động từ', m: 2, a: true,  t: 'Trong câu có "while", hành động kéo dài dùng thì quá khứ tiếp diễn.', v: 'Hành động xen vào ngắn hơn dùng quá khứ đơn.' },
{ cd: 'Thì động từ', m: 2, a: true,  t: 'Sau các liên từ chỉ thời gian như "when", "as soon as", "until", không dùng "will" mà dùng thì hiện tại.', v: 'Ví dụ: I will call you when I arrive (không phải "will arrive").' },
{ cd: 'Thì động từ', m: 2, a: false, t: 'Sau "when" chỉ tương lai, ta dùng "will + V" để diễn tả hành động tương lai.', v: 'Sau liên từ thời gian phải dùng thì HIỆN TẠI dù ý nghĩa là tương lai.' },
{ cd: 'Thì động từ', m: 2, a: true,  t: 'Thì hiện tại đơn dùng với các trạng từ tần suất như always, usually, often, sometimes, every day.', v: 'Chủ ngữ số ít ngôi thứ ba thì động từ thêm -s/-es.' },
{ cd: 'Thì động từ', m: 2, a: true,  t: '"Be going to" diễn tả dự định đã có kế hoạch từ trước hoặc dự đoán có căn cứ.', v: 'Còn "will" dùng cho quyết định tức thời hoặc dự đoán chủ quan.' },

/* ========== CÂU ĐIỀU KIỆN – GIẢ ĐỊNH ========== */
{ cd: 'Câu điều kiện', m: 2, a: true,  t: 'Câu điều kiện loại 2 diễn tả điều không có thật ở hiện tại, dùng V2 ở mệnh đề If và "would + V" ở mệnh đề chính.', v: 'Với động từ "to be" thì dùng "were" cho mọi ngôi.' },
{ cd: 'Câu điều kiện', m: 2, a: true,  t: 'Câu điều kiện loại 3 diễn tả điều không có thật trong quá khứ, dùng "had + V3" và "would have + V3".', v: 'Hàm ý điều đã xảy ra trái ngược với mệnh đề If.' },
{ cd: 'Câu điều kiện', m: 3, a: false, t: 'Câu "If I had studied harder, I would have passed" hàm ý rằng tôi đã học rất chăm.', v: 'Điều kiện loại 3 NGƯỢC với thực tế: thực tế là tôi đã KHÔNG học chăm và đã trượt.' },
{ cd: 'Câu điều kiện', m: 3, a: true,  t: 'Đảo ngữ của câu điều kiện loại 3 là "Had + S + V3, S + would have + V3".', v: 'Loại 1 đảo thành "Should + S + V", loại 2 thành "Were + S + to V".' },
{ cd: 'Câu điều kiện', m: 2, a: true,  t: 'Câu ước ở hiện tại dùng "wish + S + V2/were", câu ước ở quá khứ dùng "wish + S + had + V3".', v: 'Câu ước cho tương lai dùng "wish + S + would + V".' },
{ cd: 'Câu điều kiện', m: 2, a: false, t: 'Câu "I wish I were taller" diễn tả điều đã xảy ra trong quá khứ.', v: 'Đó là câu ước ở HIỆN TẠI, trái với thực tế hiện tại (thực tế là tôi không cao).' },
{ cd: 'Câu điều kiện', m: 2, a: true,  t: 'Câu điều kiện loại 1 diễn tả điều có thể xảy ra ở hiện tại hoặc tương lai.', v: 'Cấu trúc: If + S + V(s/es), S + will + V.' },

/* ========== BỊ ĐỘNG – TƯỜNG THUẬT – MỆNH ĐỀ QUAN HỆ ========== */
{ cd: 'Bị động – Tường thuật', m: 2, a: true,  t: 'Câu bị động có dạng "be + V3", trong đó "be" được chia theo thì của câu chủ động.', v: 'Tân ngữ của câu chủ động trở thành chủ ngữ của câu bị động.' },
{ cd: 'Bị động – Tường thuật', m: 3, a: true,  t: 'Cấu trúc "People say that..." có thể đổi thành "It is said that..." hoặc "S + is said to + V".', v: 'Đây là dạng bị động kép, rất hay ra ở câu viết lại.' },
{ cd: 'Bị động – Tường thuật', m: 2, a: true,  t: 'Khi tường thuật, thì của động từ thường được lùi một bậc so với câu trực tiếp.', v: 'Present simple → past simple, present perfect → past perfect, will → would.' },
{ cd: 'Bị động – Tường thuật', m: 3, a: true,  t: 'Khi tường thuật câu hỏi có từ để hỏi, phải bỏ trợ động từ do/does/did và đưa về trật tự câu kể.', v: 'Ví dụ: "Where do you live?" → She asked where I lived.' },
{ cd: 'Bị động – Tường thuật', m: 3, a: false, t: 'Khi tường thuật câu hỏi, ta giữ nguyên trật tự đảo ngữ của câu hỏi trực tiếp.', v: 'Phải đưa về trật tự CÂU KỂ (S + V) và bỏ trợ động từ.' },
{ cd: 'Bị động – Tường thuật', m: 2, a: true,  t: 'Tường thuật câu hỏi Yes/No dùng "asked if/whether + S + V".', v: 'Cũng phải lùi thì và đổi trạng từ chỉ thời gian, nơi chốn.' },
{ cd: 'Bị động – Tường thuật', m: 2, a: true,  t: 'Khi tường thuật, "this" đổi thành "that", "now" thành "then", "tomorrow" thành "the next day", "ago" thành "before".', v: 'Đổi cả đại từ nhân xưng cho phù hợp ngữ cảnh.' },
{ cd: 'Bị động – Tường thuật', m: 2, a: true,  t: 'Tường thuật câu mệnh lệnh dùng "told/asked + O + to V" và phủ định là "not to V".', v: 'Ví dụ: "Close the door" → He told me to close the door.' },
{ cd: 'Mệnh đề quan hệ', m: 2, a: true,  t: 'Đại từ quan hệ "who" dùng cho người, "which" dùng cho vật, "that" dùng cho cả hai.', v: '"whose" chỉ sở hữu, "where/when/why" là trạng từ quan hệ.' },
{ cd: 'Mệnh đề quan hệ', m: 2, a: true,  t: 'Không dùng "that" trong mệnh đề quan hệ không xác định (đứng sau dấu phẩy).', v: 'Mệnh đề không xác định chỉ bổ sung thông tin, có thể lược bỏ mà câu vẫn đủ nghĩa.' },
{ cd: 'Mệnh đề quan hệ', m: 2, a: false, t: 'Có thể dùng "that" thay cho "which" trong mệnh đề quan hệ đứng sau dấu phẩy.', v: 'KHÔNG được — sau dấu phẩy chỉ dùng which/who/whom, không dùng that.' },
{ cd: 'Mệnh đề quan hệ', m: 3, a: true,  t: 'Rút gọn mệnh đề quan hệ chủ động dùng V-ing, rút gọn bị động dùng V3.', v: 'Ví dụ: The man standing there / The book written by him.' },
{ cd: 'Mệnh đề quan hệ', m: 3, a: false, t: 'Rút gọn mệnh đề quan hệ ở dạng bị động dùng V-ing.', v: 'Bị động rút gọn bằng V3 (quá khứ phân từ), chủ động mới dùng V-ing.' },
{ cd: 'Mệnh đề quan hệ', m: 2, a: true,  t: 'Nếu sau đại từ quan hệ là động từ ngay lập tức thì đại từ đó đóng vai trò chủ ngữ.', v: 'Nếu sau nó là một chủ ngữ mới thì đại từ đóng vai trò tân ngữ và có thể lược bỏ.' },

/* ========== TỪ LOẠI – TỪ VỰNG ========== */
{ cd: 'Từ loại', m: 2, a: true,  t: 'Các hậu tố -tion, -sion, -ment, -ness, -ity, -ance thường tạo thành danh từ.', v: 'Còn -er, -or, -ist thường chỉ người thực hiện hành động.' },
{ cd: 'Từ loại', m: 2, a: true,  t: 'Các hậu tố -ful, -less, -ous, -ive, -able, -al, -ic thường tạo thành tính từ.', v: 'Hậu tố -ly thường tạo trạng từ.' },
{ cd: 'Từ loại', m: 2, a: true,  t: 'Sau mạo từ a/an/the hoặc sau tính từ thường là danh từ.', v: 'Đây là mẹo xác định từ loại mà không cần biết nghĩa.' },
{ cd: 'Từ loại', m: 2, a: true,  t: 'Sau động từ "be", "seem", "become", "look" thường là tính từ.', v: 'Còn sau động từ thường là trạng từ.' },
{ cd: 'Từ loại', m: 2, a: false, t: 'Sau động từ thường như "work", "run", "speak" phải dùng tính từ để bổ nghĩa.', v: 'Phải dùng TRẠNG TỪ (thường có đuôi -ly) để bổ nghĩa cho động từ.' },
{ cd: 'Từ loại', m: 3, a: true,  t: 'Tính từ đuôi -ing mô tả tính chất của sự vật, tính từ đuôi -ed mô tả cảm xúc của người.', v: 'Ví dụ: an interesting book nhưng I am interested in it.' },
{ cd: 'Từ loại', m: 3, a: false, t: 'Câu "I am very boring in this lesson" là câu đúng ngữ pháp và ngữ nghĩa.', v: 'Phải là "bored" — đuôi -ed cho cảm xúc của người. "boring" nghĩa là bản thân người đó gây chán.' },
{ cd: 'Từ loại', m: 2, a: true,  t: 'Các hậu tố -ise/-ize, -ify, -en thường tạo thành động từ.', v: 'Ví dụ: modernise, simplify, strengthen.' },

/* ========== NGỮ ÂM – TRỌNG ÂM ========== */
{ cd: 'Ngữ âm – Trọng âm', m: 2, a: true,  t: 'Đuôi -ed đọc là /ɪd/ khi động từ nguyên thể kết thúc bằng âm /t/ hoặc /d/.', v: 'Ví dụ: wanted, needed, decided.' },
{ cd: 'Ngữ âm – Trọng âm', m: 2, a: false, t: 'Đuôi -ed đọc là /ɪd/ khi động từ kết thúc bằng âm /k/ hoặc /p/.', v: 'Kết thúc bằng âm vô thanh như /k/, /p/ thì đuôi -ed đọc là /t/.' },
{ cd: 'Ngữ âm – Trọng âm', m: 2, a: true,  t: 'Đuôi -s/-es đọc là /ɪz/ sau các âm s, x, z, ch, sh, ge, ce.', v: 'Sau âm vô thanh đọc /s/, còn lại đọc /z/.' },
{ cd: 'Ngữ âm – Trọng âm', m: 2, a: true,  t: 'Với từ hai âm tiết, danh từ và tính từ thường nhấn âm tiết thứ nhất, động từ thường nhấn âm tiết thứ hai.', v: 'Ví dụ: REcord (danh từ) và reCORD (động từ).' },
{ cd: 'Ngữ âm – Trọng âm', m: 2, a: true,  t: 'Các đuôi -ic, -tion, -sion, -ial, -ian kéo trọng âm về âm tiết ngay trước nó.', v: 'Ví dụ: ecoNOmic, inforMAtion, deCIsion.' },
{ cd: 'Ngữ âm – Trọng âm', m: 2, a: false, t: 'Đuôi -ic khiến trọng âm rơi vào chính âm tiết chứa đuôi đó.', v: 'Trọng âm rơi vào âm tiết NGAY TRƯỚC đuôi -ic.' },
{ cd: 'Ngữ âm – Trọng âm', m: 3, a: true,  t: 'Các đuôi -ment, -ness, -ful, -less, -er, -ly, -ing, -ed không làm thay đổi trọng âm của từ gốc.', v: 'Đó là các hậu tố trung tính về trọng âm.' },
{ cd: 'Ngữ âm – Trọng âm', m: 3, a: true,  t: 'Các đuôi -ity, -ify, -graphy, -logy thường khiến trọng âm rơi vào âm tiết thứ ba từ cuối đếm lên.', v: 'Ví dụ: aBIlity, phoTOgraphy, biOlogy.' },

/* ========== CẤU TRÚC – CHIẾN THUẬT ========== */
{ cd: 'Cấu trúc – Chiến thuật', m: 1, a: true,  t: 'Đề Tiếng Anh tốt nghiệp THPT gồm 40 câu trắc nghiệm làm trong 50 phút, mỗi câu 0,25 điểm.', v: 'Trung bình chỉ hơn một phút cho mỗi câu.' },
{ cd: 'Cấu trúc – Chiến thuật', m: 2, a: true,  t: 'Đề thi theo cấu trúc mới có các dạng bài điền vào thông báo/quảng cáo, sắp xếp câu, hoàn thành đoạn văn và đọc hiểu.', v: 'Giảm mạnh các câu ngữ pháp thuần tuý, tăng câu đặt trong ngữ cảnh.' },
{ cd: 'Cấu trúc – Chiến thuật', m: 3, a: true,  t: 'Trong dạng bài sắp xếp câu, câu mở đầu thường không chứa đại từ thay thế như "it", "this", "they".', v: 'Vì câu đầu phải tự đứng độc lập được, chưa thể tham chiếu tới thứ gì phía trước.' },
{ cd: 'Cấu trúc – Chiến thuật', m: 3, a: true,  t: 'Với câu hỏi dạng NOT mentioned hoặc EXCEPT, đáp án là phương án KHÔNG xuất hiện trong bài đọc.', v: 'Cách làm là tìm ba phương án có trong bài rồi loại.' },
{ cd: 'Cấu trúc – Chiến thuật', m: 3, a: false, t: 'Với câu hỏi dạng EXCEPT, ta chọn phương án đầu tiên tìm thấy trong bài đọc.', v: 'Ngược lại — phương án CÓ trong bài là loại; đáp án là phương án KHÔNG có.' },
{ cd: 'Cấu trúc – Chiến thuật', m: 3, a: true,  t: 'Thông tin trả lời các câu hỏi đọc hiểu thường xuất hiện theo đúng thứ tự các câu hỏi.', v: 'Nhờ vậy có thể quét bài theo trình tự thay vì đọc lại từ đầu.' },
{ cd: 'Cấu trúc – Chiến thuật', m: 3, a: true,  t: 'Nên đọc câu hỏi và gạch chân từ khoá trước khi đọc bài đọc hiểu.', v: 'Giúp định hướng và tiết kiệm thời gian đáng kể.' },
{ cd: 'Cấu trúc – Chiến thuật', m: 2, a: false, t: 'Trong bài đọc hiểu nên dịch kĩ từng câu để hiểu trọn vẹn bài đọc.', v: 'Không đủ thời gian. Chỉ đọc kĩ đoạn chứa từ khoá của câu hỏi.' },
{ cd: 'Cấu trúc – Chiến thuật', m: 2, a: true,  t: 'Không nên bỏ trống câu nào trong bài thi trắc nghiệm vì không bị trừ điểm khi trả lời sai.', v: 'Đoán ngẫu nhiên vẫn có xác suất 25%.' },
{ cd: 'Cấu trúc – Chiến thuật', m: 3, a: true,  t: 'Các phương án chứa từ tuyệt đối như always, never, all, only thường không phải đáp án đúng trong bài đọc hiểu.', v: 'Vì văn bản học thuật thường diễn đạt có mức độ.' },
{ cd: 'Cấu trúc – Chiến thuật', m: 3, a: true,  t: 'Từ nối chỉ trình tự như First, Then, After that, Finally là manh mối quan trọng để làm dạng bài sắp xếp.', v: 'Cùng với đại từ thay thế và các cặp hỏi – đáp trong hội thoại.' },

/* ========== CÁC ĐIỂM NGỮ PHÁP KHÁC ========== */
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Sau các động từ enjoy, avoid, finish, mind, suggest, practise phải dùng V-ing.', v: 'Còn sau want, decide, hope, promise, agree thì dùng to V.' },
{ cd: 'Ngữ pháp khác', m: 2, a: false, t: 'Sau động từ "enjoy" ta dùng "to V".', v: 'Sau "enjoy" phải dùng V-ing: I enjoy reading books.' },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Sau giới từ luôn dùng danh từ hoặc V-ing, không dùng động từ nguyên thể.', v: 'Ví dụ: interested in learning, good at swimming.' },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Cấu trúc so sánh hơn với tính từ ngắn là "adj + -er + than", với tính từ dài là "more + adj + than".', v: 'So sánh nhất: the + adj-est hoặc the most + adj.' },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Cấu trúc so sánh kép "the + comparative, the + comparative" diễn tả càng… càng…', v: 'Ví dụ: The harder you study, the better your results will be.' },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Danh từ không đếm được đi với "much", "a little", còn danh từ đếm được số nhiều đi với "many", "a few".', v: '"a lot of" và "plenty of" dùng được cho cả hai loại.' },
{ cd: 'Ngữ pháp khác', m: 2, a: false, t: 'Ta dùng "many" với danh từ không đếm được như "information" hay "advice".', v: 'Phải dùng "much" hoặc "a lot of". "information" và "advice" là danh từ không đếm được.' },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Câu hỏi đuôi có mệnh đề chính khẳng định thì phần đuôi ở dạng phủ định và ngược lại.', v: "Ví dụ: You are a student, aren't you?" },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Các liên từ although, though, even though đi với một mệnh đề đầy đủ, còn despite và in spite of đi với danh từ hoặc V-ing.', v: 'Ví dụ: Although it rained / Despite the rain.' },
{ cd: 'Ngữ pháp khác', m: 2, a: false, t: 'Sau "despite" và "in spite of" ta dùng một mệnh đề đầy đủ có chủ ngữ và động từ.', v: 'Sau chúng phải dùng DANH TỪ hoặc V-ing. Mệnh đề đầy đủ đi sau although/though.' },
{ cd: 'Ngữ pháp khác', m: 3, a: true,  t: 'Đảo ngữ với các cụm phủ định như Never, Rarely, Hardly, No sooner đòi hỏi đảo trợ động từ lên trước chủ ngữ.', v: 'Ví dụ: Never have I seen such a beautiful place.' },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Mạo từ "a" dùng trước phụ âm, "an" dùng trước nguyên âm — xét theo ÂM chứ không theo chữ cái.', v: 'Ví dụ: an hour (h câm), a university (âm /juː/).' },
{ cd: 'Ngữ pháp khác', m: 2, a: false, t: 'Mạo từ "an" luôn được dùng trước các từ bắt đầu bằng chữ cái u.', v: 'Xét theo ÂM: "a university" vì bắt đầu bằng âm /juː/, nhưng "an umbrella" vì bắt đầu bằng /ʌ/.' },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Động từ khiếm khuyết như can, must, should luôn đi với động từ nguyên thể không "to".', v: 'Ngoại lệ: ought to, have to, be able to.' },
{ cd: 'Ngữ pháp khác', m: 3, a: true,  t: 'Cấu trúc "used to + V" diễn tả thói quen trong quá khứ, còn "be/get used to + V-ing" nghĩa là quen với việc gì.', v: 'Hai cấu trúc dễ nhầm nhất trong đề thi.' },
{ cd: 'Ngữ pháp khác', m: 3, a: false, t: 'Cấu trúc "be used to + V" nghĩa là đã từng làm gì trong quá khứ.', v: 'Nhầm hai cấu trúc: "used to + V" mới là thói quen quá khứ; "be used to + V-ing" là quen với việc gì.' }
];

TD.KHO_LT.anh.push(
{ cd: 'Thì động từ', m: 2, a: false, t: 'Thì hiện tại tiếp diễn dùng để diễn tả thói quen lặp đi lặp lại hằng ngày.', v: 'Đó là thì hiện tại ĐƠN. Hiện tại tiếp diễn diễn tả hành động đang xảy ra lúc nói.' },
{ cd: 'Thì động từ', m: 2, a: true,  t: 'Các động từ chỉ trạng thái như know, like, want, believe thường không dùng ở thì tiếp diễn.', v: 'Chúng diễn tả trạng thái chứ không phải hành động đang diễn ra.' },
{ cd: 'Thì động từ', m: 2, a: false, t: 'Câu "I am knowing the answer" là câu đúng ngữ pháp.', v: '"know" là động từ trạng thái, không dùng ở thì tiếp diễn. Phải là "I know the answer".' },
{ cd: 'Thì động từ', m: 2, a: true,  t: 'Thì tương lai hoàn thành "will have + V3" diễn tả hành động sẽ hoàn tất trước một mốc trong tương lai.', v: 'Thường đi với "by + mốc thời gian tương lai".' },
{ cd: 'Thì động từ', m: 2, a: true,  t: 'Thì hiện tại hoàn thành tiếp diễn nhấn mạnh tính liên tục và kéo dài của hành động từ quá khứ đến hiện tại.', v: 'Cấu trúc: have/has been + V-ing.' },
{ cd: 'Thì động từ', m: 2, a: false, t: 'Trong câu "By the time he arrived, the film had started", hành động "arrived" xảy ra trước "had started".', v: 'Ngược lại — "had started" (quá khứ hoàn thành) xảy ra TRƯỚC "arrived".' },

{ cd: 'Câu điều kiện', m: 3, a: true,  t: 'Câu điều kiện hỗn hợp có thể dùng "had + V3" ở mệnh đề If và "would + V" ở mệnh đề chính.', v: 'Diễn tả điều kiện trong quá khứ nhưng kết quả ở hiện tại.' },
{ cd: 'Câu điều kiện', m: 2, a: true,  t: 'Câu điều kiện loại 0 dùng thì hiện tại đơn ở cả hai mệnh đề, diễn tả chân lí hoặc thói quen.', v: 'Ví dụ: If you heat water to 100°C, it boils.' },
{ cd: 'Câu điều kiện', m: 2, a: false, t: 'Trong câu điều kiện loại 1, mệnh đề If dùng "will + V".', v: 'Mệnh đề If dùng thì HIỆN TẠI ĐƠN. "will" chỉ xuất hiện ở mệnh đề chính.' },
{ cd: 'Câu điều kiện', m: 2, a: true,  t: 'Cụm "unless" tương đương với "if... not" và mệnh đề sau nó luôn ở dạng khẳng định.', v: 'Ví dụ: Unless you hurry = If you do not hurry.' },
{ cd: 'Câu điều kiện', m: 3, a: false, t: 'Sau "unless" ta dùng động từ ở dạng phủ định.', v: '"unless" đã mang nghĩa phủ định rồi nên mệnh đề sau nó ở dạng KHẲNG ĐỊNH.' },

{ cd: 'Bị động – Tường thuật', m: 2, a: false, t: 'Mọi động từ trong tiếng Anh đều có thể chuyển sang thể bị động.', v: 'Chỉ động từ có tân ngữ (ngoại động từ) mới chuyển được. Nội động từ như "sleep", "arrive" thì không.' },
{ cd: 'Bị động – Tường thuật', m: 3, a: true,  t: 'Trong câu bị động, cụm "by + tác nhân" có thể lược bỏ khi tác nhân không quan trọng hoặc không xác định.', v: 'Ví dụ: The window was broken (không cần nói ai làm vỡ).' },
{ cd: 'Bị động – Tường thuật', m: 3, a: true,  t: 'Bị động của động từ khiếm khuyết có dạng "modal + be + V3".', v: 'Ví dụ: The work must be finished today.' },
{ cd: 'Bị động – Tường thuật', m: 2, a: true,  t: 'Khi tường thuật lời khuyên, thường dùng "advised + O + to V".', v: 'Còn lời mời dùng "invited + O + to V", lời nhắc dùng "reminded + O + to V".' },

{ cd: 'Mệnh đề quan hệ', m: 2, a: true,  t: 'Đại từ quan hệ làm tân ngữ có thể được lược bỏ trong mệnh đề quan hệ xác định.', v: 'Ví dụ: The book (that) I read was interesting.' },
{ cd: 'Mệnh đề quan hệ', m: 2, a: false, t: 'Đại từ quan hệ làm chủ ngữ có thể được lược bỏ tuỳ ý.', v: 'Chỉ đại từ làm TÂN NGỮ mới lược bỏ được. Làm chủ ngữ thì bắt buộc giữ.' },
{ cd: 'Mệnh đề quan hệ', m: 2, a: true,  t: '"whose" dùng để chỉ sự sở hữu và đi kèm ngay một danh từ phía sau.', v: 'Ví dụ: The man whose car was stolen.' },
{ cd: 'Mệnh đề quan hệ', m: 2, a: true,  t: 'Trạng từ quan hệ "where" thay cho nơi chốn, "when" thay cho thời gian, "why" thay cho lí do.', v: 'Chúng có thể thay bằng "giới từ + which".' },

{ cd: 'Từ loại', m: 2, a: true,  t: 'Tiền tố un-, im-, in-, dis-, il-, ir- mang nghĩa phủ định.', v: 'Ví dụ: unhappy, impossible, incorrect, dislike, illegal, irregular.' },
{ cd: 'Từ loại', m: 2, a: false, t: 'Tiền tố re- mang nghĩa phủ định.', v: 'Tiền tố "re-" nghĩa là LẠI, LẦN NỮA (rewrite, rebuild). Phủ định là un-, im-, in-, dis-.' },
{ cd: 'Từ loại', m: 3, a: true,  t: 'Một số trạng từ như hard, fast, late không có đuôi -ly và giữ nguyên hình thức như tính từ.', v: '"hardly" và "lately" có nghĩa hoàn toàn khác: hầu như không, và gần đây.' },
{ cd: 'Từ loại', m: 3, a: false, t: '"hardly" là dạng trạng từ của tính từ "hard" và có nghĩa là một cách chăm chỉ.', v: '"hardly" nghĩa là HẦU NHƯ KHÔNG. Trạng từ của "hard" chính là "hard".' },
{ cd: 'Từ loại', m: 2, a: true,  t: 'Trong cụm danh từ, trật tự tính từ thường là: ý kiến – kích thước – tuổi – hình dáng – màu sắc – nguồn gốc – chất liệu.', v: 'Ví dụ: a beautiful small old round brown Italian wooden table.' },

{ cd: 'Ngữ âm – Trọng âm', m: 2, a: true,  t: 'Đuôi -s/-es đọc là /s/ sau các âm vô thanh như /p/, /t/, /k/, /f/.', v: 'Ví dụ: books, cats, maps.' },
{ cd: 'Ngữ âm – Trọng âm', m: 3, a: true,  t: 'Với từ ghép, danh từ ghép thường nhấn ở từ thứ nhất còn tính từ ghép và động từ ghép thường nhấn ở từ thứ hai.', v: 'Ví dụ: BLACKboard (bảng đen) và black BOARD (tấm ván màu đen).' },
{ cd: 'Ngữ âm – Trọng âm', m: 2, a: false, t: 'Trong tiếng Anh, mọi từ hai âm tiết đều nhấn trọng âm ở âm tiết đầu.', v: 'Danh từ và tính từ thường nhấn âm đầu, nhưng ĐỘNG TỪ thường nhấn âm thứ hai.' },
{ cd: 'Ngữ âm – Trọng âm', m: 2, a: true,  t: 'Các tiền tố như un-, im-, dis-, re- thường không mang trọng âm chính.', v: 'Trọng âm thường rơi vào phần gốc của từ.' },

{ cd: 'Cấu trúc – Chiến thuật', m: 2, a: true,  t: 'Nên dành khoảng 5 phút cuối giờ để soát và tô kín đáp án trên phiếu trả lời trắc nghiệm.', v: 'Tránh tình trạng hết giờ mà chưa kịp tô.' },
{ cd: 'Cấu trúc – Chiến thuật', m: 2, a: true,  t: 'Với câu tìm từ đồng nghĩa hoặc trái nghĩa, nên đoán nghĩa từ ngữ cảnh của cả câu.', v: 'Ngay cả khi không biết chính xác nghĩa của từ được gạch chân.' },
{ cd: 'Cấu trúc – Chiến thuật', m: 3, a: true,  t: 'Với dạng bài điền vào đoạn văn, cần đọc cả câu trước và câu sau chỗ trống để xác định nghĩa và từ loại.', v: 'Từ nối và đại từ trong câu lân cận thường là manh mối quyết định.' },
{ cd: 'Cấu trúc – Chiến thuật', m: 2, a: false, t: 'Với câu hỏi tìm lỗi sai, chỉ cần nhìn vào phần được gạch chân mà không cần đọc cả câu.', v: 'Phải đọc cả câu vì lỗi thường nằm ở sự hoà hợp chủ ngữ – động từ, thì, hoặc từ loại trong ngữ cảnh.' },
{ cd: 'Cấu trúc – Chiến thuật', m: 2, a: true,  t: 'Với câu tìm lỗi sai, nên kiểm tra lần lượt: hoà hợp chủ ngữ – động từ, thì, từ loại, giới từ và số ít số nhiều.', v: 'Đây là năm nhóm lỗi phổ biến nhất.' },
{ cd: 'Cấu trúc – Chiến thuật', m: 3, a: true,  t: 'Trong dạng bài sắp xếp hội thoại, nên bám vào các cặp hỏi – đáp và lời chào mở đầu.', v: 'Hội thoại thường bắt đầu bằng lời chào hoặc đề nghị.' },

{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Cấu trúc "It is/was + phần nhấn mạnh + that/who..." dùng để nhấn mạnh một thành phần trong câu.', v: 'Gọi là câu chẻ (cleft sentence).' },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Cấu trúc "too + adj + to V" mang nghĩa quá... đến nỗi không thể, còn "adj + enough + to V" nghĩa là đủ... để.', v: 'Hai cấu trúc hay được dùng để viết lại câu cho nhau.' },
{ cd: 'Ngữ pháp khác', m: 3, a: false, t: 'Câu "He is too strong to lift the box" nghĩa là anh ấy đủ khoẻ để nâng chiếc hộp.', v: '"too... to" mang nghĩa PHỦ ĐỊNH: quá khoẻ đến nỗi không nâng được — câu này vô lí. Phải dùng "strong enough to lift".' },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Cấu trúc "S + spend + thời gian/tiền + V-ing" diễn tả dành bao nhiêu thời gian hoặc tiền để làm gì.', v: 'Tương đương "It takes + O + thời gian + to V".' },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Sau "make" và "let" ở thể chủ động, ta dùng động từ nguyên thể không "to".', v: 'Nhưng bị động của "make" lại là "be made to V".' },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Chủ ngữ số ít đi với động từ chia số ít, kể cả khi giữa chủ ngữ và động từ có cụm giới từ chen vào.', v: 'Ví dụ: The box of tools is heavy (không phải "are").' },
{ cd: 'Ngữ pháp khác', m: 3, a: false, t: 'Trong câu "The box of tools ___ heavy", ta điền "are" vì "tools" là số nhiều.', v: 'Chủ ngữ chính là "The box" (số ít) nên phải dùng "is". Cụm "of tools" chỉ bổ nghĩa.' },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Các danh từ như news, information, advice, furniture, luggage là danh từ không đếm được.', v: 'Không thêm -s và không dùng với "many" hay "a/an".' },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Cấu trúc "have/get + something + done" diễn tả nhờ ai làm việc gì cho mình.', v: 'Ví dụ: I had my hair cut yesterday.' },
{ cd: 'Ngữ pháp khác', m: 3, a: true,  t: 'Cấu trúc "It is + adj + for someone + to V" dùng cho tính chất của việc, còn "of someone" dùng cho tính cách của người.', v: 'Ví dụ: It is difficult for me to do this / It is kind of you to help.' },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Giới từ chỉ thời gian: "in" dùng cho tháng, năm, mùa; "on" cho ngày; "at" cho giờ.', v: 'Ví dụ: in May, on Monday, at 7 o\'clock.' },
{ cd: 'Ngữ pháp khác', m: 2, a: false, t: 'Giới từ "at" được dùng trước tên tháng và năm.', v: 'Trước tháng và năm dùng "in". "at" dùng cho giờ và một số cụm cố định như at night.' },
{ cd: 'Ngữ pháp khác', m: 2, a: true,  t: 'Mạo từ "the" dùng khi danh từ đã được xác định hoặc là duy nhất.', v: 'Ví dụ: the sun, the moon, the book I bought yesterday.' },
{ cd: 'Ngữ pháp khác', m: 3, a: true,  t: '"Neither... nor" và "Either... or" chia động từ theo chủ ngữ đứng GẦN động từ nhất.', v: 'Ví dụ: Neither he nor his friends are here.' }
);
