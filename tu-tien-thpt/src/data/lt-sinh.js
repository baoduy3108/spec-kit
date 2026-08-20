/* ============================================================
   SINH HỌC — KHO MỆNH ĐỀ LÝ THUYẾT TRỌNG ĐIỂM (Tà Đạo)
   Bám Sinh học 12 CT GDPT 2018: Di truyền · Tiến hoá · Sinh thái
   ============================================================ */
window.TD = window.TD || {}; TD.KHO_LT = TD.KHO_LT || {};

TD.KHO_LT.sinh = [
/* ========== DI TRUYỀN PHÂN TỬ ========== */
{ cd: 'Di truyền phân tử', m: 1, a: true,  t: 'Đơn phân cấu tạo nên phân tử DNA là các nucleotide.', v: 'Gồm bốn loại A, T, G, C; mỗi nucleotide có đường deoxyribose, nhóm phosphate và một base nitơ.' },
{ cd: 'Di truyền phân tử', m: 1, a: false, t: 'Đơn phân cấu tạo nên phân tử DNA là các amino acid.', v: 'Amino acid là đơn phân của PROTEIN. DNA cấu tạo từ nucleotide.' },
{ cd: 'Di truyền phân tử', m: 1, a: true,  t: 'Trong phân tử DNA mạch kép, A liên kết với T bằng 2 liên kết hydrogen và G liên kết với C bằng 3 liên kết hydrogen.', v: 'Nhờ vậy DNA giàu G–C thì bền nhiệt hơn.' },
{ cd: 'Di truyền phân tử', m: 2, a: false, t: 'Trong phân tử DNA, A liên kết với G và T liên kết với C.', v: 'Nguyên tắc bổ sung là A–T và G–C, tức purine luôn bắt cặp với pyrimidine.' },
{ cd: 'Di truyền phân tử', m: 2, a: true,  t: 'Quá trình nhân đôi DNA diễn ra theo nguyên tắc bổ sung và nguyên tắc bán bảo toàn.', v: 'Mỗi DNA con giữ lại một mạch của DNA mẹ.' },
{ cd: 'Di truyền phân tử', m: 2, a: false, t: 'Sau nhiều lần nhân đôi, tất cả các phân tử DNA con đều chứa mạch của DNA mẹ ban đầu.', v: 'Chỉ đúng 2 phân tử chứa mạch mẹ, do nguyên tắc bán bảo toàn.' },
{ cd: 'Di truyền phân tử', m: 2, a: true,  t: 'Mạch mới trong quá trình nhân đôi DNA luôn được tổng hợp theo chiều 5′ → 3′.', v: 'Đó là lý do một mạch tổng hợp liên tục còn mạch kia tổng hợp gián đoạn thành các đoạn Okazaki.' },
{ cd: 'Di truyền phân tử', m: 2, a: true,  t: 'Mã di truyền có tính thoái hoá, nghĩa là nhiều bộ ba khác nhau cùng mã hoá một loại amino acid.', v: 'Nhờ vậy nhiều đột biến thay thế nucleotide không làm thay đổi protein.' },
{ cd: 'Di truyền phân tử', m: 2, a: false, t: 'Mã di truyền có tính thoái hoá nghĩa là một bộ ba có thể mã hoá nhiều amino acid khác nhau.', v: 'Ngược lại — nhiều bộ ba cùng mã hoá MỘT amino acid. Mỗi bộ ba chỉ mã hoá một amino acid, đó là tính đặc hiệu.' },
{ cd: 'Di truyền phân tử', m: 2, a: true,  t: 'Bộ ba mở đầu trên mRNA là AUG, mã hoá amino acid methionine.', v: 'Ba bộ ba kết thúc là UAA, UAG, UGA và không mã hoá amino acid nào.' },
{ cd: 'Di truyền phân tử', m: 2, a: false, t: 'Ba bộ ba UAA, UAG, UGA đều mã hoá cho các amino acid đặc biệt.', v: 'Chúng là bộ ba KẾT THÚC, không mã hoá amino acid nào.' },
{ cd: 'Di truyền phân tử', m: 2, a: true,  t: 'Mã di truyền có tính phổ biến, nghĩa là hầu hết các loài đều dùng chung một bộ mã.', v: 'Đây là bằng chứng cho nguồn gốc chung của sinh giới.' },
{ cd: 'Di truyền phân tử', m: 3, a: true,  t: 'Đột biến thay thế một cặp nucleotide không làm thay đổi chiều dài của gene.', v: 'Chỉ đột biến thêm hoặc mất nucleotide mới làm thay đổi chiều dài.' },
{ cd: 'Di truyền phân tử', m: 3, a: true,  t: 'Đột biến thêm hoặc mất một cặp nucleotide gây hậu quả nghiêm trọng nhất vì làm dịch khung đọc.', v: 'Toàn bộ các bộ ba từ vị trí đột biến trở đi đều bị thay đổi.' },
{ cd: 'Di truyền phân tử', m: 3, a: false, t: 'Đột biến thay thế một cặp nucleotide luôn làm thay đổi cấu trúc protein.', v: 'Do mã di truyền thoái hoá, nhiều trường hợp bộ ba mới vẫn mã hoá cùng amino acid (đột biến câm).' },
{ cd: 'Di truyền phân tử', m: 2, a: true,  t: 'Phiên mã là quá trình tổng hợp RNA dựa trên mạch khuôn của gene, còn dịch mã là quá trình tổng hợp protein.', v: 'Phiên mã diễn ra trong nhân, dịch mã diễn ra ở ribosome trong tế bào chất.' },
{ cd: 'Di truyền phân tử', m: 2, a: true,  t: 'RNA khác DNA ở chỗ có đường ribose và chứa base uracil thay cho thymine.', v: 'RNA cũng thường có mạch đơn thay vì mạch kép.' },
{ cd: 'Di truyền phân tử', m: 2, a: true,  t: 'Gene là một đoạn của phân tử DNA mang thông tin mã hoá cho một sản phẩm xác định.', v: 'Sản phẩm có thể là chuỗi polypeptide hoặc một phân tử RNA.' },

/* ========== DI TRUYỀN NHIỄM SẮC THỂ ========== */
{ cd: 'Di truyền NST', m: 2, a: true,  t: 'Thể ba nhiễm có bộ nhiễm sắc thể dạng 2n + 1.', v: 'Ví dụ hội chứng Down ở người là thể ba cặp số 21, có 47 nhiễm sắc thể.' },
{ cd: 'Di truyền NST', m: 2, a: false, t: 'Thể ba nhiễm có bộ nhiễm sắc thể dạng 3n.', v: '3n là thể TAM BỘI (đột biến đa bội). Thể ba là 2n + 1, chỉ thừa một chiếc ở một cặp.' },
{ cd: 'Di truyền NST', m: 2, a: true,  t: 'Đột biến đa bội lẻ như 3n thường làm cây bất thụ nên tạo quả không hạt.', v: 'Bộ nhiễm sắc thể lẻ không phân li đều trong giảm phân. Ứng dụng tạo dưa hấu, chuối không hạt.' },
{ cd: 'Di truyền NST', m: 2, a: true,  t: 'Đột biến đa bội phổ biến ở thực vật hơn ở động vật.', v: 'Ở động vật đa bội thường gây rối loạn cơ chế xác định giới tính và gây chết.' },
{ cd: 'Di truyền NST', m: 2, a: true,  t: 'Hội chứng Turner ở người có bộ nhiễm sắc thể giới tính XO với tổng số 45 nhiễm sắc thể.', v: 'Còn hội chứng Klinefelter là XXY với 47 nhiễm sắc thể.' },
{ cd: 'Di truyền NST', m: 3, a: true,  t: 'Trao đổi chéo giữa các chromatid xảy ra ở kì đầu của giảm phân I và là cơ sở của hoán vị gene.', v: 'Sự kiện này tạo ra các tổ hợp gene mới trên cùng một nhiễm sắc thể.' },
{ cd: 'Di truyền NST', m: 3, a: false, t: 'Hoán vị gene xảy ra do trao đổi chéo giữa các nhiễm sắc thể không tương đồng.', v: 'Trao đổi chéo xảy ra giữa các chromatid của cặp nhiễm sắc thể TƯƠNG ĐỒNG.' },
{ cd: 'Di truyền NST', m: 3, a: true,  t: 'Tần số hoán vị gene không bao giờ vượt quá 50%.', v: 'Vì chỉ hai trong bốn chromatid tham gia trao đổi chéo tại một điểm.' },
{ cd: 'Di truyền NST', m: 3, a: false, t: 'Tần số hoán vị gene có thể lớn hơn 50% nếu hai gene nằm rất xa nhau.', v: 'Tối đa là 50%; khi đó hai gene coi như phân li độc lập.' },
{ cd: 'Di truyền NST', m: 3, a: true,  t: 'Tần số hoán vị gene phản ánh khoảng cách tương đối giữa hai gene trên nhiễm sắc thể.', v: 'Hai gene càng xa nhau thì tần số hoán vị càng lớn — đây là cơ sở lập bản đồ di truyền.' },
{ cd: 'Di truyền NST', m: 2, a: true,  t: 'Liên kết gene hoàn toàn làm hạn chế sự xuất hiện của biến dị tổ hợp.', v: 'Các gene trên cùng nhiễm sắc thể di truyền cùng nhau thành một nhóm.' },
{ cd: 'Di truyền NST', m: 3, a: true,  t: 'Bệnh mù màu và bệnh máu khó đông do gene lặn nằm trên nhiễm sắc thể X quy định nên biểu hiện nhiều ở nam giới.', v: 'Nam chỉ có một nhiễm sắc thể X nên chỉ cần một allele lặn là biểu hiện bệnh.' },
{ cd: 'Di truyền NST', m: 3, a: false, t: 'Bệnh mù màu biểu hiện ở nữ nhiều hơn ở nam.', v: 'Ngược lại — nam giới chỉ có một X nên dễ biểu hiện hơn nhiều.' },
{ cd: 'Di truyền NST', m: 3, a: true,  t: 'Di truyền qua tế bào chất cho kết quả lai thuận khác lai nghịch và đời con luôn có kiểu hình giống mẹ.', v: 'Gene nằm trong ti thể hoặc lục lạp, được truyền qua tế bào chất của trứng.' },
{ cd: 'Di truyền NST', m: 3, a: false, t: 'Gene nằm trong ti thể tuân theo các quy luật di truyền của Mendel.', v: 'Không — di truyền ngoài nhân theo dòng mẹ, không phân li theo quy luật Mendel.' },
{ cd: 'Di truyền NST', m: 2, a: true,  t: 'Phép lai phân tích là phép lai giữa cá thể mang kiểu hình trội với cá thể đồng hợp lặn.', v: 'Dùng để xác định kiểu gene của cá thể trội là đồng hợp hay dị hợp.' },
{ cd: 'Di truyền NST', m: 2, a: true,  t: 'Cơ thể dị hợp về n cặp gene phân li độc lập tạo ra 2ⁿ loại giao tử.', v: 'Đời con tự thụ cho 3ⁿ loại kiểu gene và 2ⁿ loại kiểu hình nếu trội hoàn toàn.' },
{ cd: 'Di truyền NST', m: 3, a: false, t: 'Trong trường hợp trội không hoàn toàn, số loại kiểu hình vẫn bằng 2ⁿ.', v: 'Trội không hoàn toàn thì mỗi kiểu gene cho một kiểu hình riêng, nên số kiểu hình bằng số kiểu GENE là 3ⁿ.' },
{ cd: 'Di truyền NST', m: 2, a: true,  t: 'Thường biến là những biến đổi kiểu hình phát sinh do môi trường, không di truyền được.', v: 'Kiểu gene không đổi nên thường biến không phải nguyên liệu của tiến hoá.' },
{ cd: 'Di truyền NST', m: 2, a: false, t: 'Thường biến là nguồn nguyên liệu chủ yếu cho quá trình chọn giống và tiến hoá.', v: 'Thường biến KHÔNG di truyền nên không phải nguyên liệu. Nguyên liệu là đột biến và biến dị tổ hợp.' },

/* ========== DI TRUYỀN QUẦN THỂ ========== */
{ cd: 'Di truyền quần thể', m: 2, a: true,  t: 'Quần thể tự thụ phấn qua nhiều thế hệ có tỉ lệ kiểu gene dị hợp giảm dần và đồng hợp tăng dần.', v: 'Sau n thế hệ, tỉ lệ dị hợp còn (1/2)ⁿ so với ban đầu.' },
{ cd: 'Di truyền quần thể', m: 3, a: true,  t: 'Tự thụ phấn làm thay đổi thành phần kiểu gene nhưng không làm thay đổi tần số allele của quần thể.', v: 'Allele chỉ được sắp xếp lại chứ không bị thêm bớt.' },
{ cd: 'Di truyền quần thể', m: 3, a: false, t: 'Tự thụ phấn qua nhiều thế hệ làm thay đổi tần số allele của quần thể.', v: 'Tần số allele KHÔNG đổi; chỉ thành phần kiểu gene thay đổi theo hướng tăng đồng hợp.' },
{ cd: 'Di truyền quần thể', m: 2, a: true,  t: 'Quần thể ở trạng thái cân bằng di truyền có cấu trúc p²AA + 2pqAa + q²aa = 1.', v: 'Đó là nội dung định luật Hardy–Weinberg.' },
{ cd: 'Di truyền quần thể', m: 3, a: true,  t: 'Định luật Hardy–Weinberg chỉ nghiệm đúng khi quần thể có kích thước lớn, giao phối ngẫu nhiên, không đột biến, không chọn lọc và không di nhập gene.', v: 'Đủ năm điều kiện thì tần số allele mới không đổi qua các thế hệ.' },
{ cd: 'Di truyền quần thể', m: 3, a: false, t: 'Định luật Hardy–Weinberg vẫn nghiệm đúng khi quần thể chịu tác động mạnh của chọn lọc tự nhiên.', v: 'Chọn lọc tự nhiên làm thay đổi tần số allele nên phá vỡ trạng thái cân bằng.' },
{ cd: 'Di truyền quần thể', m: 3, a: true,  t: 'Trong quần thể cân bằng, nếu biết tỉ lệ kiểu hình lặn thì tính được tần số allele lặn bằng cách lấy căn bậc hai.', v: 'Vì tỉ lệ kiểu hình lặn chính là q².' },

/* ========== TIẾN HOÁ ========== */
{ cd: 'Tiến hoá', m: 2, a: true,  t: 'Đột biến gene là nguồn nguyên liệu sơ cấp của quá trình tiến hoá.', v: 'Biến dị tổ hợp phát sinh qua sinh sản hữu tính là nguyên liệu thứ cấp.' },
{ cd: 'Tiến hoá', m: 2, a: false, t: 'Biến dị tổ hợp là nguồn nguyên liệu sơ cấp của quá trình tiến hoá.', v: 'Biến dị tổ hợp là nguyên liệu THỨ CẤP. Sơ cấp là đột biến.' },
{ cd: 'Tiến hoá', m: 3, a: true,  t: 'Chọn lọc tự nhiên là nhân tố tiến hoá duy nhất làm thay đổi tần số allele theo một hướng xác định.', v: 'Các nhân tố còn lại đều tác động vô hướng.' },
{ cd: 'Tiến hoá', m: 3, a: true,  t: 'Chọn lọc tự nhiên tác động trực tiếp lên kiểu hình và gián tiếp làm biến đổi tần số kiểu gene.', v: 'Kiểu hình mới là thứ tiếp xúc với môi trường.' },
{ cd: 'Tiến hoá', m: 3, a: false, t: 'Chọn lọc tự nhiên tác động trực tiếp lên kiểu gene của sinh vật.', v: 'Tác động trực tiếp lên KIỂU HÌNH, chỉ gián tiếp làm đổi tần số kiểu gene.' },
{ cd: 'Tiến hoá', m: 3, a: true,  t: 'Giao phối không ngẫu nhiên là nhân tố tiến hoá duy nhất không làm thay đổi tần số allele của quần thể.', v: 'Nó chỉ làm tăng tỉ lệ đồng hợp và giảm dị hợp.' },
{ cd: 'Tiến hoá', m: 3, a: false, t: 'Giao phối không ngẫu nhiên làm thay đổi tần số allele theo hướng xác định.', v: 'Nó KHÔNG làm thay đổi tần số allele, chỉ thay đổi thành phần kiểu gene.' },
{ cd: 'Tiến hoá', m: 3, a: true,  t: 'Các yếu tố ngẫu nhiên có thể loại bỏ hoàn toàn một allele có lợi ra khỏi quần thể.', v: 'Tác động vô hướng và mạnh nhất ở quần thể có kích thước nhỏ.' },
{ cd: 'Tiến hoá', m: 2, a: true,  t: 'Đột biến gene tuy có tần số thấp nhưng vẫn là nguồn biến dị quan trọng vì số lượng gene trong quần thể rất lớn.', v: 'Tần số đột biến mỗi gene khoảng 10⁻⁶ đến 10⁻⁴.' },
{ cd: 'Tiến hoá', m: 2, a: true,  t: 'Hai loài khác nhau được phân biệt bằng tiêu chuẩn cách li sinh sản.', v: 'Chúng không giao phối được với nhau hoặc con lai bất thụ.' },
{ cd: 'Tiến hoá', m: 2, a: true,  t: 'Con la sinh ra từ lừa và ngựa bất thụ, chứng tỏ lừa và ngựa là hai loài khác nhau.', v: 'Đây là ví dụ về cách li sau hợp tử.' },
{ cd: 'Tiến hoá', m: 3, a: true,  t: 'Hình thành loài bằng con đường lai xa kèm đa bội hoá diễn ra nhanh và phổ biến ở thực vật.', v: 'Loài mới xuất hiện gần như ngay lập tức và cách li sinh sản với loài bố mẹ.' },
{ cd: 'Tiến hoá', m: 3, a: false, t: 'Hình thành loài bằng con đường địa lí thường diễn ra rất nhanh chóng.', v: 'Con đường địa lí diễn ra CHẬM, qua nhiều thế hệ. Nhanh nhất là lai xa kèm đa bội hoá.' },
{ cd: 'Tiến hoá', m: 2, a: true,  t: 'Cơ quan tương đồng là bằng chứng cho nguồn gốc chung của các loài.', v: 'Ví dụ chi trước của mèo, cánh dơi và tay người có cùng cấu trúc xương.' },
{ cd: 'Tiến hoá', m: 2, a: false, t: 'Cơ quan tương tự là bằng chứng cho nguồn gốc chung của các loài.', v: 'Cơ quan tương tự phản ánh tiến hoá ĐỒNG QUY do môi trường giống nhau, không phản ánh nguồn gốc chung.' },

/* ========== SINH THÁI HỌC ========== */
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Trong tự nhiên, quần thể sinh vật tăng trưởng theo đường cong hình chữ S.', v: 'Nguồn sống có hạn nên kích thước quần thể tiệm cận sức chứa của môi trường.' },
{ cd: 'Sinh thái học', m: 2, a: false, t: 'Trong tự nhiên, quần thể sinh vật luôn tăng trưởng theo đường cong hình chữ J.', v: 'Đường chữ J chỉ xảy ra khi nguồn sống dồi dào vô hạn — điều không tồn tại lâu trong tự nhiên.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Kiểu phân bố theo nhóm là kiểu phân bố phổ biến nhất của các cá thể trong quần thể.', v: 'Giúp các cá thể hỗ trợ nhau chống lại điều kiện bất lợi.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Cạnh tranh cùng loài là động lực giúp quần thể tồn tại và phát triển ổn định.', v: 'Nó giúp duy trì mật độ phù hợp với nguồn sống của môi trường.' },
{ cd: 'Sinh thái học', m: 2, a: false, t: 'Cạnh tranh cùng loài luôn có hại và làm quần thể bị tiêu diệt.', v: 'Cạnh tranh cùng loài là động lực điều chỉnh mật độ, giúp quần thể tồn tại bền vững.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Mật độ cá thể là đặc trưng cơ bản nhất của quần thể vì ảnh hưởng tới mọi đặc trưng khác.', v: 'Mật độ chi phối mức sinh sản, tử vong và khả năng khai thác nguồn sống.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Quan hệ cộng sinh là quan hệ trong đó cả hai loài đều có lợi và sự gắn bó là bắt buộc.', v: 'Ví dụ vi khuẩn Rhizobium sống trong nốt sần rễ cây họ Đậu.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Quan hệ hội sinh là quan hệ trong đó một loài có lợi còn loài kia không lợi cũng không hại.', v: 'Ví dụ cây phong lan bám trên thân cây gỗ lớn.' },
{ cd: 'Sinh thái học', m: 2, a: false, t: 'Cây phong lan bám trên thân cây gỗ là ví dụ về quan hệ kí sinh.', v: 'Phong lan chỉ lấy chỗ bám chứ không hút chất dinh dưỡng nên đây là HỘI SINH.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Ức chế – cảm nhiễm là quan hệ trong đó một loài vô tình gây hại cho loài khác mà bản thân không lợi cũng không hại.', v: 'Ví dụ tảo giáp nở hoa tiết độc tố làm chết cá và tôm.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Ổ sinh thái của một loài khác với nơi ở của loài đó.', v: 'Nơi ở là "địa chỉ" còn ổ sinh thái là "nghề nghiệp" — cách loài khai thác nguồn sống.' },
{ cd: 'Sinh thái học', m: 3, a: true,  t: 'Cạnh tranh khác loài dẫn tới sự phân li ổ sinh thái, giúp các loài cùng tồn tại.', v: 'Mỗi loài thu hẹp và chuyên hoá cách khai thác nguồn sống của mình.' },
{ cd: 'Sinh thái học', m: 3, a: true,  t: 'Dòng năng lượng trong hệ sinh thái là dòng một chiều và giảm dần qua các bậc dinh dưỡng.', v: 'Khoảng 90% năng lượng bị mất qua hô hấp, bài tiết và nhiệt ở mỗi bậc.' },
{ cd: 'Sinh thái học', m: 3, a: false, t: 'Năng lượng trong hệ sinh thái được tuần hoàn qua các bậc dinh dưỡng.', v: 'Chỉ VẬT CHẤT mới tuần hoàn. Năng lượng đi một chiều và mất dần dưới dạng nhiệt.' },
{ cd: 'Sinh thái học', m: 3, a: true,  t: 'Chuỗi thức ăn trong tự nhiên thường không quá 5 mắt xích vì năng lượng hao hụt lớn qua mỗi bậc.', v: 'Hiệu suất sinh thái trung bình chỉ khoảng 10%.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Sinh vật sản xuất là bậc dinh dưỡng cấp 1 trong chuỗi thức ăn.', v: 'Sinh vật tiêu thụ bậc 1 nằm ở bậc dinh dưỡng cấp 2.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Diễn thế nguyên sinh khởi đầu từ môi trường chưa từng có sinh vật.', v: 'Ví dụ trên đảo núi lửa mới hình thành hoặc bãi bồi mới nổi.' },
{ cd: 'Sinh thái học', m: 2, a: false, t: 'Diễn thế thứ sinh khởi đầu từ môi trường chưa từng có sinh vật sinh sống.', v: 'Đó là diễn thế NGUYÊN SINH. Thứ sinh xảy ra ở nơi đã từng có quần xã nhưng bị huỷ diệt.' },
{ cd: 'Sinh thái học', m: 3, a: true,  t: 'Trong quá trình diễn thế, độ đa dạng loài và tổng sinh khối của quần xã thường tăng lên.', v: 'Đồng thời lưới thức ăn phức tạp hơn và ổ sinh thái của mỗi loài hẹp lại.' },
{ cd: 'Sinh thái học', m: 3, a: true,  t: 'Nguyên nhân bên trong quan trọng nhất gây ra diễn thế là sự cạnh tranh giữa các loài trong quần xã.', v: 'Cùng với đó là tác động của ngoại cảnh và của con người.' },

/* ========== SINH HỌC 10 – 11 ========== */
{ cd: 'Sinh 10 – 11', m: 2, a: true,  t: 'Khí oxygen thải ra trong quang hợp có nguồn gốc từ phân tử nước.', v: 'Quá trình quang phân li nước ở pha sáng: 2H₂O → 4H⁺ + 4e⁻ + O₂.' },
{ cd: 'Sinh 10 – 11', m: 2, a: false, t: 'Khí oxygen thải ra trong quang hợp có nguồn gốc từ khí carbon dioxide.', v: 'O₂ đến từ NƯỚC, đã được chứng minh bằng thí nghiệm đồng vị đánh dấu.' },
{ cd: 'Sinh 10 – 11', m: 2, a: true,  t: 'Pha sáng của quang hợp tạo ra ATP, NADPH và O₂; pha tối sử dụng chúng để cố định CO₂.', v: 'Pha sáng diễn ra ở màng thylakoid, pha tối ở chất nền stroma.' },
{ cd: 'Sinh 10 – 11', m: 2, a: true,  t: 'Thực vật C4 và CAM thích nghi với điều kiện nóng, khô và có năng suất cao hơn thực vật C3.', v: 'Chúng có cơ chế cố định CO₂ sơ bộ giúp giảm hô hấp sáng.' },
{ cd: 'Sinh 10 – 11', m: 2, a: true,  t: 'Chuỗi truyền electron trong hô hấp tế bào tạo ra nhiều ATP nhất và diễn ra ở màng trong ti thể.', v: 'Đường phân ở tế bào chất chỉ tạo 2 ATP.' },
{ cd: 'Sinh 10 – 11', m: 2, a: false, t: 'Giai đoạn đường phân của hô hấp tế bào diễn ra trong ti thể.', v: 'Đường phân diễn ra ở TẾ BÀO CHẤT. Các giai đoạn sau mới diễn ra trong ti thể.' },
{ cd: 'Sinh 10 – 11', m: 2, a: true,  t: 'Nguyên phân tạo ra hai tế bào con có bộ nhiễm sắc thể giống hệt tế bào mẹ.', v: 'Đây là cơ sở của sinh trưởng, tái sinh mô và sinh sản vô tính.' },
{ cd: 'Sinh 10 – 11', m: 2, a: true,  t: 'Giảm phân tạo ra bốn tế bào con có bộ nhiễm sắc thể giảm đi một nửa so với tế bào mẹ.', v: 'Kết hợp với thụ tinh, giảm phân giúp duy trì bộ nhiễm sắc thể đặc trưng của loài.' },
{ cd: 'Sinh 10 – 11', m: 2, a: false, t: 'Một tế bào sinh trứng giảm phân bình thường tạo ra bốn trứng.', v: 'Chỉ tạo MỘT trứng và ba thể cực thoái hoá. Tế bào sinh tinh mới cho bốn tinh trùng.' },
{ cd: 'Sinh 10 – 11', m: 2, a: true,  t: 'Enzyme làm tăng tốc độ phản ứng bằng cách hạ thấp năng lượng hoạt hoá.', v: 'Enzyme có tính đặc hiệu cao với cơ chất và hoạt động tối ưu ở một khoảng nhiệt độ, pH nhất định.' },
{ cd: 'Sinh 10 – 11', m: 2, a: false, t: 'Enzyme làm tăng tốc độ phản ứng bằng cách cung cấp thêm năng lượng cho phản ứng.', v: 'Enzyme HẠ THẤP năng lượng hoạt hoá chứ không cung cấp năng lượng.' }
];

TD.KHO_LT.sinh.push(
/* --- Di truyền quần thể (bổ sung) --- */
{ cd: 'Di truyền quần thể', m: 3, a: false, t: 'Trong quần thể cân bằng, tần số kiểu gene dị hợp luôn lớn hơn tổng hai kiểu gene đồng hợp.', v: 'Không đúng — 2pq đạt cực đại 0,5 khi p = q = 0,5, còn p² + q² khi đó cũng bằng 0,5.' },
{ cd: 'Di truyền quần thể', m: 2, a: false, t: 'Quần thể giao phối ngẫu nhiên có tần số allele thay đổi liên tục qua các thế hệ.', v: 'Nếu đủ các điều kiện Hardy–Weinberg thì tần số allele KHÔNG đổi qua các thế hệ.' },
{ cd: 'Di truyền quần thể', m: 2, a: false, t: 'Giao phối gần làm tăng tỉ lệ kiểu gene dị hợp trong quần thể.', v: 'Ngược lại — giao phối gần làm tăng ĐỒNG HỢP và giảm dị hợp, dễ bộc lộ allele lặn có hại.' },
{ cd: 'Di truyền quần thể', m: 2, a: true,  t: 'Giao phối gần qua nhiều thế hệ có thể gây thoái hoá giống do các allele lặn có hại được biểu hiện.', v: 'Tỉ lệ đồng hợp lặn tăng lên nên các tính trạng xấu bộc lộ.' },
{ cd: 'Di truyền quần thể', m: 3, a: true,  t: 'Ưu thế lai thường biểu hiện cao nhất ở đời F₁ và giảm dần ở các đời sau.', v: 'Do tỉ lệ dị hợp giảm dần qua các thế hệ tự thụ hoặc giao phối gần.' },
{ cd: 'Di truyền quần thể', m: 2, a: true,  t: 'Quần thể là tập hợp các cá thể cùng loài, cùng sống trong một khoảng không gian xác định và có khả năng sinh sản tạo thế hệ mới.', v: 'Đây là đơn vị cơ sở của quá trình tiến hoá.' },

/* --- Di truyền phân tử (bổ sung) --- */
{ cd: 'Di truyền phân tử', m: 2, a: true,  t: 'Trong operon Lac của vi khuẩn E. coli, gene điều hoà R nằm ngoài operon.', v: 'Gene R tổng hợp protein ức chế bám vào vùng vận hành O để ngăn phiên mã.' },
{ cd: 'Di truyền phân tử', m: 3, a: true,  t: 'Khi môi trường có lactose, lactose đóng vai trò chất cảm ứng làm protein ức chế mất khả năng bám vào vùng vận hành.', v: 'Nhờ đó các gene cấu trúc được phiên mã.' },
{ cd: 'Di truyền phân tử', m: 2, a: false, t: 'Vùng khởi động P của operon là nơi protein ức chế bám vào.', v: 'Protein ức chế bám vào vùng VẬN HÀNH O. Vùng P là nơi RNA polymerase bám vào.' },
{ cd: 'Di truyền phân tử', m: 2, a: true,  t: 'Một gene có thể nhân đôi nhiều lần nhưng số lần phiên mã của các gene khác nhau trong cùng tế bào có thể rất khác nhau.', v: 'Đó là biểu hiện của điều hoà hoạt động gene.' },
{ cd: 'Di truyền phân tử', m: 2, a: true,  t: 'Ở sinh vật nhân thực, quá trình phiên mã và dịch mã diễn ra tách biệt về không gian và thời gian.', v: 'Phiên mã trong nhân, dịch mã ở tế bào chất. Ở sinh vật nhân sơ thì hai quá trình gần như đồng thời.' },
{ cd: 'Di truyền phân tử', m: 2, a: false, t: 'Ở sinh vật nhân sơ, quá trình dịch mã chỉ bắt đầu sau khi phiên mã đã hoàn tất.', v: 'Ở nhân sơ không có màng nhân nên dịch mã có thể bắt đầu ngay khi mRNA còn đang được phiên mã.' },
{ cd: 'Di truyền phân tử', m: 3, a: true,  t: 'Nhiều ribosome có thể cùng dịch mã trên một phân tử mRNA tạo thành polysome.', v: 'Nhờ vậy tế bào tổng hợp nhanh nhiều chuỗi polypeptide giống nhau.' },

/* --- Di truyền NST (bổ sung) --- */
{ cd: 'Di truyền NST', m: 2, a: true,  t: 'Đột biến mất đoạn nhiễm sắc thể thường gây hậu quả nghiêm trọng vì làm mất cân bằng gene.', v: 'Được ứng dụng để loại bỏ gene xấu hoặc lập bản đồ gene.' },
{ cd: 'Di truyền NST', m: 2, a: true,  t: 'Đột biến lặp đoạn làm tăng số lượng bản sao của gene trên nhiễm sắc thể.', v: 'Ví dụ lặp đoạn ở lúa mạch làm tăng hoạt tính enzyme amylase, có lợi cho công nghiệp bia.' },
{ cd: 'Di truyền NST', m: 2, a: true,  t: 'Đột biến đảo đoạn làm thay đổi trật tự gene nhưng không làm thay đổi số lượng gene trên nhiễm sắc thể.', v: 'Có thể gây giảm khả năng sinh sản ở thể dị hợp đảo đoạn.' },
{ cd: 'Di truyền NST', m: 2, a: false, t: 'Đột biến chuyển đoạn giữa hai nhiễm sắc thể không tương đồng không ảnh hưởng đến khả năng sinh sản.', v: 'Chuyển đoạn thường làm giảm mạnh khả năng sinh sản do rối loạn phân li trong giảm phân.' },
{ cd: 'Di truyền NST', m: 2, a: true,  t: 'Nhiễm sắc thể ở sinh vật nhân thực được cấu tạo từ DNA và protein histone.', v: 'Đơn vị cơ bản là nucleosome gồm đoạn DNA quấn quanh khối 8 phân tử histone.' },
{ cd: 'Di truyền NST', m: 3, a: true,  t: 'Nếu một cặp nhiễm sắc thể không phân li trong giảm phân I thì tạo ra giao tử thừa hoặc thiếu một nhiễm sắc thể.', v: 'Giao tử n+1 và n−1 kết hợp với giao tử bình thường sẽ tạo thể ba hoặc thể một.' },
{ cd: 'Di truyền NST', m: 2, a: true,  t: 'Ở người, bộ nhiễm sắc thể lưỡng bội có 46 chiếc, gồm 44 nhiễm sắc thể thường và 2 nhiễm sắc thể giới tính.', v: 'Nữ là XX, nam là XY.' },
{ cd: 'Di truyền NST', m: 2, a: false, t: 'Ở chim và bướm, con đực có cặp nhiễm sắc thể giới tính XY.', v: 'Ngược lại — ở chim, bướm thì con ĐỰC là XX (ZZ) còn con CÁI là XY (ZW).' },

/* --- Tiến hoá (bổ sung) --- */
{ cd: 'Tiến hoá', m: 2, a: true,  t: 'Theo Darwin, chọn lọc tự nhiên giữ lại những cá thể thích nghi nhất với môi trường sống.', v: 'Kết quả là hình thành các đặc điểm thích nghi và loài mới.' },
{ cd: 'Tiến hoá', m: 3, a: true,  t: 'Di – nhập gene làm cho vốn gene của hai quần thể trở nên giống nhau hơn.', v: 'Sự trao đổi cá thể làm giảm khác biệt di truyền giữa các quần thể.' },
{ cd: 'Tiến hoá', m: 3, a: false, t: 'Di – nhập gene luôn làm tăng sự khác biệt di truyền giữa các quần thể.', v: 'Ngược lại — nó làm các quần thể GIỐNG nhau hơn về vốn gene.' },
{ cd: 'Tiến hoá', m: 3, a: true,  t: 'Chọn lọc tự nhiên chống lại allele lặn diễn ra chậm hơn nhiều so với chống lại allele trội.', v: 'Allele lặn ẩn trong thể dị hợp nên không bị chọn lọc đào thải trực tiếp.' },
{ cd: 'Tiến hoá', m: 2, a: true,  t: 'Cách li địa lí không trực tiếp tạo ra loài mới mà chỉ duy trì sự khác biệt về vốn gene giữa các quần thể.', v: 'Loài mới chỉ hình thành khi xuất hiện cách li sinh sản.' },
{ cd: 'Tiến hoá', m: 2, a: false, t: 'Cách li địa lí luôn dẫn đến hình thành loài mới.', v: 'Không nhất thiết — chỉ khi tích luỹ đủ khác biệt để dẫn tới cách li SINH SẢN.' },
{ cd: 'Tiến hoá', m: 2, a: true,  t: 'Cách li trước hợp tử ngăn cản sự thụ tinh tạo hợp tử, còn cách li sau hợp tử làm con lai không sống được hoặc bất thụ.', v: 'Cách li tập tính, thời gian, nơi ở, cơ học đều thuộc trước hợp tử.' },
{ cd: 'Tiến hoá', m: 2, a: true,  t: 'Bằng chứng tế bào học cho thấy mọi sinh vật đều được cấu tạo từ tế bào.', v: 'Kết hợp với bằng chứng sinh học phân tử về mã di truyền chung, đây là chứng cứ mạnh cho nguồn gốc chung.' },

/* --- Sinh thái (bổ sung) --- */
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Giới hạn sinh thái là khoảng giá trị của một nhân tố sinh thái mà trong đó sinh vật có thể tồn tại và phát triển.', v: 'Ngoài giới hạn đó sinh vật sẽ chết.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Loài có giới hạn sinh thái rộng với nhiều nhân tố thường có vùng phân bố rộng.', v: 'Ngược lại, loài hẹp sinh thái chỉ phân bố ở vùng hạn chế.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Nhân tố sinh thái hữu sinh gồm các mối quan hệ giữa sinh vật với sinh vật, trong đó con người là nhân tố có ảnh hưởng lớn nhất.', v: 'Nhân tố vô sinh gồm khí hậu, thổ nhưỡng, nước, địa hình.' },
{ cd: 'Sinh thái học', m: 3, a: true,  t: 'Lưới thức ăn càng phức tạp thì hệ sinh thái càng ổn định.', v: 'Nhiều đường truyền năng lượng thay thế nhau khi một mắt xích bị suy giảm.' },
{ cd: 'Sinh thái học', m: 3, a: false, t: 'Hệ sinh thái có chuỗi thức ăn càng dài thì hiệu suất truyền năng lượng càng cao.', v: 'Ngược lại — chuỗi càng dài thì năng lượng đến bậc cuối càng ít do hao hụt qua mỗi bậc.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Hệ sinh thái gồm quần xã sinh vật và sinh cảnh, có khả năng tự điều chỉnh.', v: 'Khả năng tự điều chỉnh có giới hạn nhất định.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Sinh vật phân giải có vai trò chuyển hoá chất hữu cơ thành chất vô cơ trả lại môi trường.', v: 'Nhờ vậy chu trình vật chất được khép kín.' },
{ cd: 'Sinh thái học', m: 2, a: false, t: 'Trong hệ sinh thái, sinh vật phân giải thuộc bậc dinh dưỡng cấp 1.', v: 'Bậc dinh dưỡng cấp 1 là sinh vật SẢN XUẤT. Sinh vật phân giải không xếp vào bậc dinh dưỡng của chuỗi.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Hiệu ứng nhà kính tăng lên chủ yếu do lượng khí CO₂ trong khí quyển tăng.', v: 'Nguyên nhân là đốt nhiên liệu hoá thạch và phá rừng.' },
{ cd: 'Sinh thái học', m: 2, a: true,  t: 'Phát triển bền vững đòi hỏi khai thác tài nguyên hợp lí đi đôi với bảo vệ môi trường.', v: 'Đáp ứng nhu cầu hiện tại mà không làm tổn hại khả năng đáp ứng của thế hệ tương lai.' },

/* --- Sinh 10 – 11 (bổ sung) --- */
{ cd: 'Sinh 10 – 11', m: 2, a: true,  t: 'Nước được vận chuyển từ rễ lên lá chủ yếu nhờ lực hút do thoát hơi nước ở lá.', v: 'Kết hợp với lực đẩy của rễ và lực liên kết giữa các phân tử nước trong mạch gỗ.' },
{ cd: 'Sinh 10 – 11', m: 2, a: true,  t: 'Khí khổng đóng lại khi cây thiếu nước, làm giảm thoát hơi nước nhưng cũng làm giảm quang hợp.', v: 'Vì CO₂ không vào được lá.' },
{ cd: 'Sinh 10 – 11', m: 2, a: true,  t: 'Ở thực vật, mạch gỗ vận chuyển nước và muối khoáng còn mạch rây vận chuyển chất hữu cơ.', v: 'Mạch gỗ đi lên, mạch rây đi từ lá xuống các cơ quan khác.' },
{ cd: 'Sinh 10 – 11', m: 2, a: false, t: 'Mạch rây ở thực vật có chức năng vận chuyển nước và muối khoáng từ rễ lên lá.', v: 'Đó là chức năng của MẠCH GỖ. Mạch rây vận chuyển chất hữu cơ.' },
{ cd: 'Sinh 10 – 11', m: 2, a: true,  t: 'Tế bào nhân thực có màng nhân bao bọc vật chất di truyền còn tế bào nhân sơ thì không.', v: 'Tế bào nhân sơ cũng không có các bào quan có màng như ti thể, lục lạp.' },
{ cd: 'Sinh 10 – 11', m: 2, a: true,  t: 'Vận chuyển chủ động các chất qua màng sinh chất cần tiêu tốn năng lượng ATP và protein vận chuyển.', v: 'Khác với khuếch tán thụ động đi theo chiều gradient nồng độ và không tốn năng lượng.' },
{ cd: 'Sinh 10 – 11', m: 2, a: false, t: 'Khuếch tán thụ động qua màng tế bào cần tiêu tốn năng lượng ATP.', v: 'Khuếch tán thụ động đi theo chiều gradient nồng độ nên KHÔNG tốn năng lượng.' }
);
