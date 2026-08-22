/* ============================================================
   BÙ LỖ HỔNG KHỐI XÃ HỘI
   Rà lại theo SGK chương trình 2018 thì lòi ra ba chỗ hụt:
     ① Lịch sử 12 có hẳn một chủ đề "Chủ nghĩa xã hội từ năm 1917
        đến nay" mà kho mệnh đề không có — Liên Xô chỉ bị nhắc rải
        rác trong bài Chiến tranh lạnh.
     ② Luyện Công môn Văn mức 3 (Vận dụng) có ĐÚNG 0 bộ sinh, bấm
        vào là rơi hết về câu lý thuyết.
     ③ Sử mức 3 chỉ 1 bộ sinh, GDKT mức 1 không có bộ sinh nào.
   File này vá cả ba, đặt tên zz- để nạp sau và chỉ nối thêm.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {}; TD.KHO_LT = TD.KHO_LT || {};

(function () {
const S = TD.soVN, D = TD.dapSo;
const bu = (mon, ds) => { TD.KHO_LT[mon] = (TD.KHO_LT[mon] || []).concat(ds); };
const MC = (R, de, it, meo) => {
  const opts = TD.xaoR(R, [it.d].concat(it.s));
  const loai = TD.khoiLoai(opts, it.d, it.sv, 'không phù hợp với dữ kiện đề đưa ra.');
  return { q: de, opts: opts, ans: opts.indexOf(it.d),
    giai: `Đáp án đúng: ${it.d}\n${it.v}\n\nVì sao các phương án còn lại bị loại:\n${loai}`, meo: meo };
};

/* ============================================================
   ① LỊCH SỬ — CHỦ NGHĨA XÃ HỘI TỪ NĂM 1917 ĐẾN NAY
   ============================================================ */
const CD = 'Chủ nghĩa xã hội từ 1917';
bu('su', [
{ cd: CD, m: 1, a: true,  t: 'Cách mạng tháng Mười Nga năm 1917 thắng lợi đã đưa đến sự ra đời của Nhà nước Xô viết — nhà nước xã hội chủ nghĩa đầu tiên trên thế giới.', v: 'Đây là mốc mở đầu cho sự hình thành chủ nghĩa xã hội với tư cách một chế độ xã hội hiện thực, không còn là lí thuyết.' },
{ cd: CD, m: 1, a: false, t: 'Liên bang Cộng hoà xã hội chủ nghĩa Xô viết được thành lập ngay trong năm 1917.', v: 'Liên Xô được thành lập tháng 12 – 1922, tức 5 năm sau Cách mạng tháng Mười, trên cơ sở liên hiệp bốn nước cộng hoà Xô viết đầu tiên.' },
{ cd: CD, m: 1, a: true,  t: 'Nước Cộng hoà Nhân dân Trung Hoa ra đời ngày 1 – 10 – 1949.', v: 'Sự kiện này nối liền chủ nghĩa xã hội từ châu Âu sang châu Á, làm tăng mạnh vị thế của hệ thống xã hội chủ nghĩa.' },
{ cd: CD, m: 1, a: true,  t: 'Cách mạng Cuba thắng lợi ngày 1 – 1 – 1959, đưa Cuba trở thành nước xã hội chủ nghĩa đầu tiên ở khu vực Mỹ Latinh.', v: 'Cuba do Phi-đen Ca-xtơ-rô lãnh đạo, lật đổ chế độ độc tài Ba-ti-xta.' },
{ cd: CD, m: 2, a: true,  t: 'Trong những năm 1945 – 1949, các nước dân chủ nhân dân Đông Âu lần lượt ra đời, đánh dấu chủ nghĩa xã hội vượt khỏi phạm vi một nước và trở thành một hệ thống thế giới.', v: 'Từ chỗ chỉ có Liên Xô, chủ nghĩa xã hội mở rộng thành hệ thống trải từ Đông Âu sang châu Á.' },
{ cd: CD, m: 2, a: true,  t: 'Hội đồng tương trợ kinh tế (SEV) thành lập năm 1949 và Tổ chức Hiệp ước Vác-sa-va thành lập năm 1955 là hai trụ cột liên kết các nước xã hội chủ nghĩa về kinh tế và quân sự.', v: 'SEV lo hợp tác kinh tế, Vác-sa-va là liên minh phòng thủ đối trọng với khối NATO.' },
{ cd: CD, m: 2, a: false, t: 'Tổ chức Hiệp ước Vác-sa-va ra đời trước khi khối quân sự NATO được thành lập.', v: 'NATO ra đời năm 1949, Vác-sa-va mãi năm 1955 mới thành lập — tức là để ĐÁP LẠI việc NATO kết nạp Cộng hoà Liên bang Đức, chứ không phải đi trước.' },
{ cd: CD, m: 2, a: true,  t: 'Năm 1957 Liên Xô phóng thành công vệ tinh nhân tạo đầu tiên của Trái Đất, năm 1961 đưa I. Ga-ga-rin bay vòng quanh Trái Đất.', v: 'Hai thành tựu này chứng minh sức mạnh khoa học – kĩ thuật của chủ nghĩa xã hội, mở đầu kỉ nguyên chinh phục vũ trụ của loài người.' },
{ cd: CD, m: 2, a: false, t: 'Sau Chiến tranh thế giới thứ hai, Liên Xô là cường quốc công nghiệp đứng đầu thế giới.', v: 'Liên Xô vươn lên đứng thứ HAI thế giới, sau Mỹ. Đó vẫn là kì tích vì Liên Xô phải khôi phục từ đống đổ nát chiến tranh.' },
{ cd: CD, m: 2, a: true,  t: 'Liên Xô là chỗ dựa của phong trào giải phóng dân tộc và là lực lượng đi đầu ủng hộ cuộc kháng chiến của nhân dân Việt Nam.', v: 'Sự giúp đỡ về vũ khí, kinh tế và ngoại giao của Liên Xô là một nhân tố quốc tế quan trọng của cách mạng Việt Nam.' },
{ cd: CD, m: 3, a: true,  t: 'Chế độ xã hội chủ nghĩa ở các nước Đông Âu sụp đổ trong những năm 1989 – 1991, còn Liên Xô chính thức tan rã cuối năm 1991.', v: 'Đây là sự sụp đổ của một MÔ HÌNH chủ nghĩa xã hội cụ thể chứ không phải sự phá sản của lí tưởng xã hội chủ nghĩa.' },
{ cd: CD, m: 3, a: true,  t: 'Nguyên nhân sâu xa khiến chủ nghĩa xã hội ở Liên Xô và Đông Âu sụp đổ là duy trì quá lâu mô hình kinh tế kế hoạch hoá tập trung, quan liêu bao cấp, chậm cải cách.', v: 'Mô hình này từng phù hợp thời chiến và thời khôi phục kinh tế, nhưng kìm hãm sản xuất khi thế giới bước vào cách mạng khoa học – kĩ thuật.' },
{ cd: CD, m: 3, a: false, t: 'Nguyên nhân quyết định dẫn tới sự sụp đổ của Liên Xô là sự chống phá từ bên ngoài của các thế lực thù địch.', v: 'Sự chống phá bên ngoài chỉ là nguyên nhân KHÁCH QUAN, tác động thêm vào. Nguyên nhân quyết định là những sai lầm bên trong: mô hình lỗi thời và đường lối cải tổ sai lầm.' },
{ cd: CD, m: 3, a: true,  t: 'Công cuộc cải tổ ở Liên Xô từ năm 1985 mắc sai lầm khi chuyển trọng tâm sang cải cách chính trị, xa rời nguyên tắc và làm mất vai trò lãnh đạo của Đảng.', v: 'Cải tổ vốn đúng ở chỗ thừa nhận phải đổi mới, nhưng đi chệch hướng nên đẩy khủng hoảng thành sụp đổ.' },
{ cd: CD, m: 3, a: true,  t: 'Từ năm 1978, Trung Quốc tiến hành công cuộc cải cách mở cửa, lấy phát triển kinh tế làm trung tâm.', v: 'Đường lối do Đặng Tiểu Bình khởi xướng tại Hội nghị Trung ương 3 khoá XI, đưa Trung Quốc thành nền kinh tế lớn thứ hai thế giới từ năm 2010.' },
{ cd: CD, m: 4, a: true,  t: 'Điểm chung trong đường lối đổi mới của Trung Quốc và Việt Nam là lấy phát triển kinh tế làm trọng tâm, đồng thời kiên trì giữ vững vai trò lãnh đạo của Đảng Cộng sản.', v: 'Chính điểm khác biệt này so với cải tổ của Liên Xô đã giúp hai nước vượt qua khủng hoảng thay vì sụp đổ.' },
{ cd: CD, m: 4, a: false, t: 'Sự sụp đổ của Liên Xô năm 1991 đồng nghĩa với việc chủ nghĩa xã hội chấm dứt tồn tại trên thế giới.', v: 'Trung Quốc, Việt Nam, Lào, Cuba vẫn kiên định con đường xã hội chủ nghĩa và tiến hành đổi mới thành công. Cái sụp đổ là một mô hình cụ thể, không phải cả con đường.' },
{ cd: CD, m: 4, a: true,  t: 'Bài học lớn nhất mà Việt Nam rút ra từ sự sụp đổ của Liên Xô là phải kiên trì đổi mới kinh tế đi đôi với giữ vững ổn định chính trị và sự lãnh đạo của Đảng.', v: 'Đại hội VI (12 – 1986) mở đầu Đổi mới ở Việt Nam theo đúng tinh thần đó: đổi mới toàn diện nhưng có nguyên tắc, không đổi màu.' }
]);

/* ============================================================
   ② LỊCH SỬ — HAI BỘ SINH MỨC 3
   ============================================================ */
TD.GEN.su = (TD.GEN.su || []).concat([

{ ma: 'su-m3-nguyennhan', chuong: CD, muc: 3, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { sk: 'chế độ xã hội chủ nghĩa ở Liên Xô và Đông Âu sụp đổ (1989 – 1991)',
        d: 'Duy trì quá lâu mô hình kinh tế kế hoạch hoá tập trung, quan liêu bao cấp, chậm sửa chữa khuyết tật',
        s: ['Sự bao vây, cấm vận về kinh tế của các nước tư bản phương Tây',
            'Sự thất bại của Liên Xô trong cuộc chạy đua vũ trang với Mỹ',
            'Sự can thiệp trực tiếp bằng quân sự của Mỹ vào các nước Đông Âu'],
        sv: { 'Sự bao vây, cấm vận về kinh tế của các nước tư bản phương Tây': 'chỉ là tác động bên ngoài, không quyết định — Việt Nam cũng bị cấm vận mà không sụp đổ',
              'Sự thất bại của Liên Xô trong cuộc chạy đua vũ trang với Mỹ': 'chạy đua vũ trang làm kiệt quệ ngân sách nhưng là HỆ QUẢ của mô hình kinh tế yếu, không phải gốc rễ',
              'Sự can thiệp trực tiếp bằng quân sự của Mỹ vào các nước Đông Âu': 'không hề có cuộc can thiệp quân sự nào của Mỹ vào Đông Âu năm 1989 – 1991' },
        v: 'Câu hỏi hỏi nguyên nhân SÂU XA, tức cái gốc bên trong. Mô hình kế hoạch hoá tập trung từng phát huy tác dụng thời chiến tranh và khôi phục kinh tế, '
          + 'nhưng khi thế giới bước vào cách mạng khoa học – kĩ thuật thì nó triệt tiêu động lực sản xuất mà vẫn không được sửa.' },
      { sk: 'Việt Nam tiến hành công cuộc Đổi mới từ năm 1986',
        d: 'Đất nước lâm vào khủng hoảng kinh tế – xã hội kéo dài, đòi hỏi phải đổi mới để thoát ra',
        s: ['Liên Xô yêu cầu các nước xã hội chủ nghĩa đồng loạt cải tổ',
            'Việt Nam đã hoàn thành công nghiệp hoá và cần chuyển sang giai đoạn mới',
            'Mỹ tuyên bố bình thường hoá quan hệ và xoá bỏ cấm vận với Việt Nam'],
        sv: { 'Liên Xô yêu cầu các nước xã hội chủ nghĩa đồng loạt cải tổ': 'Đổi mới là quyết định độc lập của Đảng Cộng sản Việt Nam xuất phát từ thực tiễn trong nước',
              'Việt Nam đã hoàn thành công nghiệp hoá và cần chuyển sang giai đoạn mới': 'thời điểm 1986 Việt Nam còn rất nghèo, chưa hề hoàn thành công nghiệp hoá',
              'Mỹ tuyên bố bình thường hoá quan hệ và xoá bỏ cấm vận với Việt Nam': 'Mỹ xoá bỏ cấm vận năm 1994 và bình thường hoá quan hệ năm 1995, tức là SAU Đổi mới gần mười năm' },
        v: 'Nguyên nhân trực tiếp và quyết định nằm ở bên trong: khủng hoảng kinh tế – xã hội từ cuối những năm 1970, lạm phát phi mã, sản xuất đình đốn. '
          + 'Đại hội VI (12 – 1986) nhìn thẳng vào sự thật đó và đề ra đường lối đổi mới toàn diện.' },
      { sk: 'Trung Quốc tiến hành cải cách mở cửa từ năm 1978',
        d: 'Đất nước rơi vào tình trạng trì trệ, khủng hoảng sau hai mươi năm với nhiều sai lầm về đường lối',
        s: ['Trung Quốc muốn liên minh quân sự với Liên Xô để chống Mỹ',
            'Trung Quốc bị các nước ASEAN cô lập hoàn toàn về ngoại giao',
            'Trung Quốc cần vốn để thực hiện chương trình vũ trụ'],
        sv: { 'Trung Quốc muốn liên minh quân sự với Liên Xô để chống Mỹ': 'quan hệ Trung – Xô thời điểm đó đang căng thẳng, hoàn toàn ngược lại',
              'Trung Quốc bị các nước ASEAN cô lập hoàn toàn về ngoại giao': 'không có chuyện đó, và ngoại giao không phải nguyên nhân của một cuộc cải cách kinh tế',
              'Trung Quốc cần vốn để thực hiện chương trình vũ trụ': 'chi tiết bịa, chương trình vũ trụ không liên quan tới quyết định cải cách mở cửa' },
        v: 'Sau "Đại nhảy vọt" và "Đại cách mạng văn hoá", kinh tế Trung Quốc kiệt quệ. Hội nghị Trung ương 3 khoá XI (12 – 1978) quyết định lấy '
          + 'xây dựng kinh tế làm trung tâm, thực hiện cải cách mở cửa — cùng một logic "khủng hoảng buộc phải đổi mới" như Việt Nam năm 1986.' }
    ]);
    return MC(R, `Nguyên nhân sâu xa dẫn đến việc ${it.sk} là gì?`, it,
      'Phân biệt nguyên nhân SÂU XA (gốc rễ, bên trong, lâu dài) với nguyên nhân TRỰC TIẾP (giọt nước tràn ly) và '
      + 'nguyên nhân KHÁCH QUAN (tác động từ bên ngoài). Đề hay đặt sẵn cả ba loại vào bốn phương án để xem học sinh có đọc kĩ chữ trong câu hỏi không.');
  } },

{ ma: 'su-m3-sosanh', chuong: CD, muc: 3, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'Điểm khác biệt căn bản giữa công cuộc cải tổ ở Liên Xô (1985 – 1991) với công cuộc Đổi mới ở Việt Nam (từ 1986) là gì?',
        d: 'Liên Xô chuyển trọng tâm sang cải cách chính trị và xa rời vai trò lãnh đạo của Đảng, còn Việt Nam lấy đổi mới kinh tế làm trọng tâm và giữ vững vai trò lãnh đạo của Đảng',
        s: ['Liên Xô đổi mới toàn diện còn Việt Nam chỉ đổi mới trong lĩnh vực nông nghiệp',
            'Liên Xô tiến hành trước còn Việt Nam tiến hành sau nên học được kinh nghiệm',
            'Liên Xô có sự giúp đỡ của phương Tây còn Việt Nam thì không'],
        sv: { 'Liên Xô đổi mới toàn diện còn Việt Nam chỉ đổi mới trong lĩnh vực nông nghiệp': 'Đổi mới ở Việt Nam là toàn diện trên mọi lĩnh vực, chỉ lấy kinh tế làm TRỌNG TÂM chứ không bó hẹp ở nông nghiệp',
              'Liên Xô tiến hành trước còn Việt Nam tiến hành sau nên học được kinh nghiệm': 'chỉ là khác biệt về thời điểm, không phải khác biệt CĂN BẢN về đường lối',
              'Liên Xô có sự giúp đỡ của phương Tây còn Việt Nam thì không': 'sai thực tế và cũng không phải điểm khác biệt về bản chất đường lối' },
        v: 'Cùng xuất phát từ khủng hoảng và cùng thừa nhận phải đổi mới, nhưng hai nước chọn hai trọng tâm khác nhau. '
          + 'Liên Xô sa vào cải cách chính trị, thực hiện đa nguyên đa đảng, làm mất vai trò lãnh đạo của Đảng nên khủng hoảng biến thành sụp đổ. '
          + 'Việt Nam đổi mới kinh tế trước, đổi mới chính trị từng bước và luôn giữ nguyên tắc, nên vượt qua được khủng hoảng.' },
      { q: 'Điểm giống nhau cơ bản giữa Cách mạng tháng Mười Nga (1917) và Cách mạng tháng Tám ở Việt Nam (1945) là gì?',
        d: 'Đều giành chính quyền về tay nhân dân và mở ra một kỉ nguyên mới cho dân tộc',
        s: ['Đều do giai cấp tư sản lãnh đạo',
            'Đều nổ ra khi đất nước đang bị nước ngoài chiếm đóng hoàn toàn',
            'Đều lật đổ chế độ phong kiến chuyên chế và thiết lập chế độ cộng hoà tư sản'],
        sv: { 'Đều do giai cấp tư sản lãnh đạo': 'cả hai đều do chính đảng của giai cấp vô sản lãnh đạo — Đảng Bôn-sê-vích và Đảng Cộng sản Đông Dương',
              'Đều nổ ra khi đất nước đang bị nước ngoài chiếm đóng hoàn toàn': 'nước Nga năm 1917 không bị nước ngoài chiếm đóng, đang là một đế quốc tham chiến',
              'Đều lật đổ chế độ phong kiến chuyên chế và thiết lập chế độ cộng hoà tư sản': 'chế độ Nga hoàng đã bị lật đổ từ Cách mạng tháng Hai; tháng Mười lật đổ Chính phủ tư sản lâm thời chứ không lập ra nó' },
        v: 'Nét chung bản chất nhất của hai cuộc cách mạng là kết quả: chính quyền về tay nhân dân lao động, mở ra kỉ nguyên độc lập – tự do và đi lên chủ nghĩa xã hội. '
          + 'Còn về hoàn cảnh và nhiệm vụ cụ thể thì hai cuộc cách mạng khác nhau nhiều.' },
      { q: 'Vì sao nói sự ra đời của các nước dân chủ nhân dân Đông Âu và nước Cộng hoà Nhân dân Trung Hoa đã làm cho chủ nghĩa xã hội trở thành một hệ thống thế giới?',
        d: 'Vì chủ nghĩa xã hội không còn giới hạn trong một nước mà đã nối liền từ châu Âu sang châu Á thành một hệ thống các nước gắn bó với nhau',
        s: ['Vì các nước này đều gia nhập Liên hợp quốc cùng một năm',
            'Vì các nước này đã vượt qua Mỹ về tổng sản lượng công nghiệp',
            'Vì các nước này cùng tuyên bố xoá bỏ hoàn toàn kinh tế tư nhân'],
        sv: { 'Vì các nước này đều gia nhập Liên hợp quốc cùng một năm': 'sai thực tế, và tư cách thành viên Liên hợp quốc không tạo nên một hệ thống xã hội',
              'Vì các nước này đã vượt qua Mỹ về tổng sản lượng công nghiệp': 'Liên Xô chỉ đứng thứ hai thế giới, chưa nước xã hội chủ nghĩa nào vượt Mỹ về công nghiệp',
              'Vì các nước này cùng tuyên bố xoá bỏ hoàn toàn kinh tế tư nhân': 'không phải tiêu chí xác định một hệ thống thế giới, và cũng không đồng loạt như vậy' },
        v: 'Chữ "hệ thống" nói tới không gian địa lí và sự liên kết: từ chỗ chỉ có Liên Xô đơn độc, sau năm 1949 chủ nghĩa xã hội trải dài từ Đông Âu sang châu Á, '
          + 'các nước liên kết với nhau bằng SEV (1949) về kinh tế và Hiệp ước Vác-sa-va (1955) về quân sự.' }
    ]);
    return MC(R, it.q, it,
      'Câu so sánh luôn có một phương án đúng bản chất và ba phương án đúng vụn vặt hoặc sai sự thật. '
      + 'Đọc kĩ chữ "căn bản", "cơ bản", "chủ yếu" — chúng yêu cầu chọn cái thuộc về BẢN CHẤT, không phải chi tiết bề mặt.');
  } }

]);

/* ============================================================
   ③ NGỮ VĂN — NĂM BỘ SINH MỨC 3 (VẬN DỤNG)
   Mức 3 của Văn trong đề thật chính là câu 3, 4, 5 phần Đọc hiểu:
   không hỏi "gọi tên biện pháp gì" nữa mà hỏi TÁC DỤNG, THÔNG ĐIỆP,
   GIỌNG ĐIỆU, Ý NGHĨA CHI TIẾT — phải hiểu rồi mới trả lời được.
   ============================================================ */
TD.GEN.van = (TD.GEN.van || []).concat([

{ ma: 'van-m3-tacdung', chuong: 'Biện pháp tu từ', muc: 3, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { nl: 'Mặt trời của bắp thì nằm trên đồi\nMặt trời của mẹ, em nằm trên lưng', bp: 'ẩn dụ',
        d: 'Khẳng định con là nguồn sống, nguồn hạnh phúc và niềm tin của mẹ, đồng thời làm câu thơ giàu sức gợi hơn cách nói trực tiếp',
        s: ['Miêu tả chính xác vị trí của mặt trời và của em bé trên lưng mẹ',
            'Nhấn mạnh nỗi vất vả của người mẹ khi phải địu con lên nương',
            'Tạo nhịp điệu cân đối giữa hai dòng thơ cho dễ thuộc'],
        sv: { 'Miêu tả chính xác vị trí của mặt trời và của em bé trên lưng mẹ': 'đó là nghĩa đen, mà biện pháp tu từ thì phải nói tới lớp nghĩa được gợi ra',
              'Nhấn mạnh nỗi vất vả của người mẹ khi phải địu con lên nương': 'nỗi vất vả có trong bài thơ nhưng không phải điều mà riêng hình ảnh ẩn dụ này tạo ra',
              'Tạo nhịp điệu cân đối giữa hai dòng thơ cho dễ thuộc': 'nhịp điệu là tác dụng của phép điệp cấu trúc, không phải của ẩn dụ' },
        v: '"Mặt trời" ở dòng hai là ẩn dụ chỉ đứa con. Mặt trời với cây bắp là nguồn sống, thì đứa con với mẹ cũng vậy — '
          + 'phép ẩn dụ chuyển toàn bộ ý nghĩa thiêng liêng của mặt trời sang đứa con, khiến tình mẫu tử được nâng lên tầm vũ trụ.' },
      { nl: 'Ta đi ta nhớ những ngày\nMình đây ta đó, đắng cay ngọt bùi', bp: 'cặp từ đối lập',
        d: 'Khái quát trọn vẹn mọi cung bậc của mười lăm năm gắn bó, khẳng định nghĩa tình son sắt qua cả gian khổ lẫn hạnh phúc',
        s: ['Cho thấy người ra đi chỉ nhớ những kỉ niệm vui',
            'Miêu tả cụ thể các món ăn của người dân Việt Bắc',
            'Nhấn mạnh khoảng cách địa lí giữa hai miền xuôi ngược'],
        sv: { 'Cho thấy người ra đi chỉ nhớ những kỉ niệm vui': 'ngược lại, cặp đối lập cho thấy nhớ CẢ đắng cay lẫn ngọt bùi',
              'Miêu tả cụ thể các món ăn của người dân Việt Bắc': 'hiểu "đắng cay ngọt bùi" theo nghĩa đen là bỏ mất lớp nghĩa biểu tượng',
              'Nhấn mạnh khoảng cách địa lí giữa hai miền xuôi ngược': 'ý này thuộc về cặp đại từ mình – ta, không phải cặp đắng cay – ngọt bùi' },
        v: 'Hai cặp đối lập "mình – ta" và "đắng cay – ngọt bùi" đặt cạnh nhau tạo thế đối xứng. '
          + 'Cặp thứ hai gói cả quãng đời kháng chiến vào bốn chữ: có gian khổ, có sum vầy, và đã cùng nhau đi qua tất cả.' },
      { nl: 'Súng bên súng, đầu sát bên đầu\nĐêm rét chung chăn thành đôi tri kỉ', bp: 'điệp từ kết hợp hình ảnh sóng đôi',
        d: 'Diễn tả sự gắn bó khăng khít của những người lính từ chung nhiệm vụ đến chung gian khổ, làm nổi bật cơ sở hình thành tình đồng chí',
        s: ['Miêu tả điều kiện sinh hoạt thiếu thốn của bộ đội trong kháng chiến',
            'Nhấn mạnh sức mạnh của vũ khí trong chiến đấu',
            'Thể hiện nỗi nhớ quê hương của người lính nông dân'],
        sv: { 'Miêu tả điều kiện sinh hoạt thiếu thốn của bộ đội trong kháng chiến': 'mới chỉ dừng ở nghĩa tả thực, chưa chạm tới điều mà phép điệp gợi ra',
              'Nhấn mạnh sức mạnh của vũ khí trong chiến đấu': '"súng bên súng" nói về sự sát cánh của con người, không nói về sức mạnh vũ khí',
              'Thể hiện nỗi nhớ quê hương của người lính nông dân': 'nỗi nhớ quê ở câu thơ khác, không phải tác dụng của hai dòng này' },
        v: 'Phép điệp "súng – súng", "đầu – đầu" đặt hai người lính ở thế sóng đôi tuyệt đối. '
          + 'Từ chung nhiệm vụ (súng), chung lí tưởng (đầu) tới chung cả cái rét (chung chăn) — ba tầng gắn bó dồn lại mới nảy ra hai chữ "tri kỉ".' },
      { nl: 'Ôi những cánh đồng quê chảy máu\nDây thép gai đâm nát trời chiều', bp: 'nhân hoá kết hợp ẩn dụ',
        d: 'Biến nỗi đau của đất nước bị giày xéo thành nỗi đau thân thể có thể nhìn thấy, khơi dậy lòng căm thù và tình yêu quê hương',
        s: ['Miêu tả chân thực màu sắc của ráng chiều trên cánh đồng',
            'Cho thấy kĩ thuật quân sự hiện đại của quân đội Pháp',
            'Thể hiện niềm vui của người nông dân được mùa'],
        sv: { 'Miêu tả chân thực màu sắc của ráng chiều trên cánh đồng': 'chỉ đọc được lớp nghĩa đen, bỏ mất nỗi đau mà hình ảnh muốn nói',
              'Cho thấy kĩ thuật quân sự hiện đại của quân đội Pháp': 'dây thép gai ở đây là biểu tượng của sự chia cắt và bạo tàn, không phải chi tiết kĩ thuật',
              'Thể hiện niềm vui của người nông dân được mùa': 'trái ngược hoàn toàn với sắc thái đau đớn của hai dòng thơ' },
        v: 'Cánh đồng vốn vô tri được nhân hoá thành cơ thể "chảy máu"; dây thép gai được cho hành động "đâm nát" bầu trời. '
          + 'Cả hai biến sự tàn phá trừu tượng thành vết thương cụ thể trên thân thể quê hương, khiến người đọc thấy đau chứ không chỉ biết là đau.' },
      { nl: 'Ngày ngày mặt trời đi qua trên lăng\nThấy một mặt trời trong lăng rất đỏ', bp: 'ẩn dụ kết hợp điệp ngữ',
        d: 'Ngợi ca sự vĩ đại và bất tử của Bác, đặt Bác ngang tầm với mặt trời của tự nhiên, đồng thời bộc lộ lòng thành kính của nhà thơ',
        s: ['Miêu tả hiện tượng mặt trời chiếu sáng lăng Bác mỗi ngày',
            'Cho thấy lăng Bác được xây ở hướng đón nắng sớm',
            'Nhấn mạnh màu đỏ là màu chủ đạo trong kiến trúc lăng'],
        sv: { 'Miêu tả hiện tượng mặt trời chiếu sáng lăng Bác mỗi ngày': 'chỉ đúng với "mặt trời" thứ nhất, bỏ qua ẩn dụ ở "mặt trời" thứ hai',
              'Cho thấy lăng Bác được xây ở hướng đón nắng sớm': 'suy diễn về kiến trúc, không liên quan tới giá trị biểu đạt của câu thơ',
              'Nhấn mạnh màu đỏ là màu chủ đạo trong kiến trúc lăng': 'chữ "rất đỏ" nói về lí tưởng cách mạng và trái tim Bác, không phải màu sơn' },
        v: 'Điệp ngữ "mặt trời" xuất hiện hai lần với hai lớp nghĩa: lần đầu là mặt trời thiên nhiên, lần sau là ẩn dụ chỉ Bác Hồ. '
          + 'Đặt cạnh nhau, câu thơ ngầm khẳng định Bác cũng vĩnh hằng và ấm áp như mặt trời, mà lại "rất đỏ" — nồng ấm hơn cả mặt trời của tự nhiên.' },
      { nl: 'Bác đã đi rồi sao, Bác ơi!\nMùa thu đang đẹp, nắng xanh trời', bp: 'nói giảm nói tránh kết hợp câu hỏi tu từ',
        d: 'Làm dịu nỗi mất mát quá lớn, đồng thời diễn tả tâm trạng bàng hoàng không muốn tin vào sự thật của nhà thơ',
        s: ['Thông báo khách quan về thời gian Bác qua đời',
            'Miêu tả vẻ đẹp của mùa thu Hà Nội',
            'Thể hiện niềm vui trước cảnh sắc thiên nhiên tươi đẹp'],
        sv: { 'Thông báo khách quan về thời gian Bác qua đời': 'câu thơ mang cảm xúc dồn nén chứ không phải một lời thông báo',
              'Miêu tả vẻ đẹp của mùa thu Hà Nội': 'cảnh thu ở đây tương phản để tô đậm nỗi đau, không phải để tả cảnh',
              'Thể hiện niềm vui trước cảnh sắc thiên nhiên tươi đẹp': 'ngược hẳn sắc thái, đây là hai dòng thơ đau đớn nhất bài' },
        v: 'Chữ "đi" thay cho chữ "mất" là nói giảm nói tránh, vừa kính trọng vừa như níu giữ. '
          + 'Kèm theo đó là câu hỏi tu từ "sao" — hỏi mà không cần trả lời, chỉ để bật ra sự bàng hoàng. Cảnh thu đẹp đặt ngay sau càng làm nỗi mất mát nhói lên.' }
    ]);
    return MC(R, `Nêu TÁC DỤNG của biện pháp tu từ ${it.bp} trong ngữ liệu sau:\n\n"${it.nl}"`, it,
      'Công thức trả lời câu hỏi tác dụng gồm ba ý: ① gọi tên biện pháp và chỉ ra nó nằm ở đâu '
      + '② nêu tác dụng về NỘI DUNG (làm nổi bật điều gì) ③ nêu tác dụng về NGHỆ THUẬT (gợi hình, gợi cảm, tạo nhịp). '
      + 'Phương án nào chỉ diễn xuôi nghĩa đen thì chắc chắn sai, vì đó không phải tác dụng của biện pháp tu từ.');
  } },

{ ma: 'van-m3-thongdiep', chuong: 'Đọc hiểu', muc: 3, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { nl: 'Nơi nào có ý chí, nơi đó có con đường. Kẻ bỏ cuộc không bao giờ chiến thắng, và người chiến thắng không bao giờ bỏ cuộc.',
        d: 'Ý chí và sự kiên trì là điều kiện quyết định để con người vượt qua khó khăn và đi tới thành công',
        s: ['Con người cần biết lượng sức mình để chọn mục tiêu vừa tầm',
            'Thành công chủ yếu phụ thuộc vào may mắn và hoàn cảnh',
            'Nên từ bỏ sớm khi thấy con đường quá nhiều chông gai'],
        sv: { 'Con người cần biết lượng sức mình để chọn mục tiêu vừa tầm': 'là một lời khuyên hợp lí nhưng ngữ liệu không hề bàn tới chuyện chọn mục tiêu',
              'Thành công chủ yếu phụ thuộc vào may mắn và hoàn cảnh': 'trái ngược hẳn: ngữ liệu đề cao yếu tố chủ quan là ý chí',
              'Nên từ bỏ sớm khi thấy con đường quá nhiều chông gai': 'đối lập trực tiếp với câu "kẻ bỏ cuộc không bao giờ chiến thắng"' },
        v: 'Cả hai câu trong ngữ liệu đều xoay quanh một trục: có ý chí thì có đường đi, bỏ cuộc thì mất tất cả. '
          + 'Thông điệp phải bao trùm được cả ngữ liệu chứ không chỉ đúng với một vế.' },
      { nl: 'Con người ta lớn lên không phải bằng những gì mình nhận được, mà bằng những gì mình cho đi. Cho đi rồi mới biết mình còn nhiều đến thế nào.',
        d: 'Sự cho đi và sẻ chia làm con người trưởng thành hơn, đồng thời giúp họ nhận ra giá trị của chính mình',
        s: ['Con người chỉ trưởng thành khi tích luỹ được nhiều của cải',
            'Nên cho đi để mong nhận lại được nhiều hơn trong tương lai',
            'Người nghèo thì không có gì để cho đi nên khó trưởng thành'],
        sv: { 'Con người chỉ trưởng thành khi tích luỹ được nhiều của cải': 'ngữ liệu phủ nhận đúng cái ý này ngay ở vế đầu tiên',
              'Nên cho đi để mong nhận lại được nhiều hơn trong tương lai': 'biến sự cho đi thành một cuộc trao đổi, làm hỏng tinh thần của ngữ liệu',
              'Người nghèo thì không có gì để cho đi nên khó trưởng thành': 'suy diễn sai, và câu cuối ngữ liệu nói ngược lại — cho đi mới thấy mình còn nhiều' },
        v: 'Vế đầu nêu quan niệm về sự trưởng thành (do cho đi chứ không do nhận về), vế sau bổ sung một hệ quả bất ngờ: '
          + 'cho đi còn giúp ta nhận ra mình giàu có đến mức nào. Thông điệp đúng phải chứa được cả hai vế đó.' },
      { nl: 'Đừng sợ đi chậm, chỉ sợ đứng yên. Mỗi bước chân dù nhỏ đến đâu, đi mãi cũng thành đường.',
        d: 'Điều quan trọng không phải là tốc độ mà là sự bền bỉ tiến về phía trước, những nỗ lực nhỏ tích luỹ lại sẽ tạo nên kết quả lớn',
        s: ['Cần đi thật nhanh để vượt qua người khác',
            'Nên dừng lại nghỉ ngơi khi cảm thấy mình đi quá chậm',
            'Chỉ những bước chân lớn mới có giá trị'],
        sv: { 'Cần đi thật nhanh để vượt qua người khác': 'ngữ liệu nói rõ "đừng sợ đi chậm", tức không đặt tốc độ làm thước đo',
              'Nên dừng lại nghỉ ngơi khi cảm thấy mình đi quá chậm': 'mâu thuẫn với vế "chỉ sợ đứng yên"',
              'Chỉ những bước chân lớn mới có giá trị': 'trái với "mỗi bước chân dù nhỏ đến đâu"' },
        v: 'Ngữ liệu đặt hai cái đối lập: chậm thì được, đứng yên thì không. Cộng thêm hình ảnh "đi mãi cũng thành đường", '
          + 'thông điệp là giá trị của sự bền bỉ và của tích luỹ dần dần.' },
      { nl: 'Không ai tắm hai lần trên một dòng sông. Dòng sông đã đổi, và người tắm cũng đã khác.',
        d: 'Mọi sự vật và cả con người đều vận động, đổi thay không ngừng nên cần biết trân trọng hiện tại',
        s: ['Không nên tắm sông vì nước sông không sạch',
            'Con người nên tránh lặp lại những việc đã làm',
            'Dòng sông là hình ảnh tượng trưng cho quê hương'],
        sv: { 'Không nên tắm sông vì nước sông không sạch': 'hiểu ngữ liệu theo nghĩa đen, bỏ mất tính triết lí',
              'Con người nên tránh lặp lại những việc đã làm': 'ngữ liệu nói việc lặp lại là bất khả, chứ không khuyên nên tránh',
              'Dòng sông là hình ảnh tượng trưng cho quê hương': 'ở đây dòng sông tượng trưng cho sự vận động của vạn vật, không phải quê hương' },
        v: 'Câu nói nổi tiếng của Hê-ra-clít nêu quy luật vận động: cả khách thể (dòng sông) lẫn chủ thể (người tắm) đều đã khác. '
          + 'Từ đó rút ra thái độ sống: không níu giữ cái đã qua, biết trân trọng và sống trọn với hiện tại.' },
      { nl: 'Có hai cách để sống: một là tin rằng chẳng có gì là phép màu, hai là tin rằng mọi thứ đều là phép màu.',
        d: 'Thái độ sống của mỗi người quyết định cách họ nhìn thế giới, biết trân trọng thì điều bình thường cũng hoá phi thường',
        s: ['Phép màu là có thật và ai cũng có thể tạo ra được',
            'Con người phải chọn một trong hai cách sống và không được thay đổi',
            'Người tin vào phép màu thì thiếu hiểu biết khoa học'],
        sv: { 'Phép màu là có thật và ai cũng có thể tạo ra được': 'ngữ liệu bàn về THÁI ĐỘ nhìn nhận, không khẳng định phép màu có thật',
              'Con người phải chọn một trong hai cách sống và không được thay đổi': 'thêm ý "không được thay đổi" mà ngữ liệu không có',
              'Người tin vào phép màu thì thiếu hiểu biết khoa học': 'suy diễn tiêu cực, đi ngược tinh thần trân trọng của ngữ liệu' },
        v: 'Câu nói của Anh-xtanh đặt hai cách nhìn cạnh nhau để nhấn mạnh: bản thân thế giới không đổi, chỉ có góc nhìn đổi. '
          + 'Thông điệp là biết sống trân trọng thì mỗi điều bình thường đều đáng kinh ngạc.' },
      { nl: 'Hạnh phúc không phải là đích đến, mà là cách ta đi trên con đường của mình.',
        d: 'Hạnh phúc nằm ngay trong quá trình sống và nỗ lực chứ không phải ở kết quả cuối cùng',
        s: ['Con người không nên đặt ra mục tiêu cho cuộc đời',
            'Hạnh phúc chỉ đến với người đã đạt được thành công',
            'Đi đường xa thì sẽ hạnh phúc hơn đi đường gần'],
        sv: { 'Con người không nên đặt ra mục tiêu cho cuộc đời': 'ngữ liệu không phủ nhận đích đến, chỉ nói hạnh phúc không nằm ở đó',
              'Hạnh phúc chỉ đến với người đã đạt được thành công': 'trái hẳn với vế "không phải là đích đến"',
              'Đi đường xa thì sẽ hạnh phúc hơn đi đường gần': 'hiểu hình ảnh con đường theo nghĩa đen' },
        v: 'Ngữ liệu dùng phép ẩn dụ hành trình: "đích đến" là kết quả, "cách ta đi" là quá trình. '
          + 'Đặt hạnh phúc vào quá trình nghĩa là khuyên con người sống trọn từng ngày thay vì trì hoãn hạnh phúc tới lúc thành công.' }
    ]);
    return MC(R, `Thông điệp có ý nghĩa nhất được rút ra từ ngữ liệu sau là gì?\n\n"${it.nl}"`, it,
      'Thông điệp đúng phải BAO TRÙM cả ngữ liệu, không chỉ đúng với một vế. '
      + 'Loại ngay ba loại phương án: (a) hiểu theo nghĩa đen, (b) nói ngược lại ngữ liệu, (c) thêm ý mà ngữ liệu không hề có.');
  } },

{ ma: 'van-m3-giongdieu', chuong: 'Đọc hiểu', muc: 3, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { nl: 'Ta làm con chim hót\nTa làm một cành hoa\nTa nhập vào hoà ca\nMột nốt trầm xao xuyến', d: 'Tha thiết, chân thành',
        s: ['Hào hùng, mạnh mẽ', 'Xót xa, đau đớn', 'Mỉa mai, châm biếm'],
        sv: { 'Hào hùng, mạnh mẽ': 'nhịp thơ năm chữ nhẹ và những hình ảnh nhỏ bé không tạo âm hưởng hùng tráng',
              'Xót xa, đau đớn': 'không có từ ngữ nào mang sắc thái đau thương trong đoạn thơ',
              'Mỉa mai, châm biếm': 'trái hẳn với thái độ trân trọng, tự nguyện của chủ thể trữ tình' },
        v: 'Điệp ngữ "ta làm" lặp ba lần như một lời nguyện thầm; các hình ảnh được chọn đều nhỏ bé, khiêm nhường (con chim, cành hoa, nốt trầm). '
          + 'Giọng điệu vì thế tha thiết và chân thành, thể hiện ước nguyện cống hiến lặng lẽ.' },
      { nl: 'Xẻ dọc Trường Sơn đi cứu nước\nMà lòng phơi phới dậy tương lai', d: 'Hào hùng, lạc quan',
        s: ['Buồn bã, tiếc nuối', 'Trầm tư, triết lí', 'Trang nghiêm, thành kính'],
        sv: { 'Buồn bã, tiếc nuối': 'từ "phơi phới" mang sắc thái vui tươi, hoàn toàn không buồn',
              'Trầm tư, triết lí': 'câu thơ là lời khẳng định khí thế, không có suy tư chiêm nghiệm',
              'Trang nghiêm, thành kính': 'sắc thái này hợp với thơ viết về Bác, không hợp với khí thế ra trận ở đây' },
        v: 'Động từ mạnh "xẻ dọc" kèm không gian lớn "Trường Sơn" tạo tầm vóc sử thi; từ láy "phơi phới" thêm sắc thái vui tươi. '
          + 'Hai yếu tố cộng lại thành giọng hào hùng mà lạc quan — nét đặc trưng của thơ ca kháng chiến chống Mỹ.' },
      { nl: 'Ôi kì lạ và thiêng liêng — bếp lửa!', d: 'Xúc động, ngợi ca',
        s: ['Bình thản, khách quan', 'Giận dữ, phẫn nộ', 'Hài hước, dí dỏm'],
        sv: { 'Bình thản, khách quan': 'thán từ "ôi" và dấu chấm than đã phá vỡ mọi sự bình thản',
              'Giận dữ, phẫn nộ': 'không có đối tượng nào bị phê phán trong câu thơ',
              'Hài hước, dí dỏm': 'trái hẳn với hai tính từ trang trọng "kì lạ" và "thiêng liêng"' },
        v: 'Câu cảm thán mở đầu bằng thán từ "ôi", ngắt nhịp bằng dấu gạch ngang rồi dồn vào hai chữ "bếp lửa". '
          + 'Cấu trúc ấy dồn nén cảm xúc rồi bật ra, tạo giọng điệu xúc động và ngợi ca trước một hình ảnh tưởng chừng bình dị.' },
      { nl: 'Lũ chúng ta ngủ trong giường chiếu hẹp\nGiấc mơ con đè nát cuộc đời con', d: 'Xót xa, tự vấn',
        s: ['Vui tươi, phấn khởi', 'Hào sảng, tự hào', 'Bình thản, kể lể'],
        sv: { 'Vui tươi, phấn khởi': 'hình ảnh "đè nát cuộc đời" là hình ảnh của bi kịch, không thể vui',
              'Hào sảng, tự hào': 'chủ thể đang tự phê phán chính mình chứ không tự hào',
              'Bình thản, kể lể': 'động từ mạnh "đè nát" cho thấy cảm xúc dồn nén chứ không bình thản' },
        v: 'Cách tự xưng "lũ chúng ta" kèm hình ảnh chật hẹp "giường chiếu hẹp", "giấc mơ con" cho thấy sự tự nhìn lại đầy phê phán. '
          + 'Động từ "đè nát" biến sự tầm thường trong khát vọng thành một sức nặng huỷ hoại, tạo giọng xót xa và tự vấn.' },
      { nl: 'Nhớ gì như nhớ người yêu\nTrăng lên đầu núi, nắng chiều lưng nương', d: 'Ngọt ngào, da diết',
        s: ['Gấp gáp, khẩn trương', 'Trang nghiêm, hùng tráng', 'Lạnh lùng, dửng dưng'],
        sv: { 'Gấp gáp, khẩn trương': 'nhịp lục bát chậm rãi cùng cảnh trăng, nắng gợi sự thư thái chứ không gấp gáp',
              'Trang nghiêm, hùng tráng': 'không có yếu tố nào tạo tầm vóc sử thi ở hai dòng thơ này',
              'Lạnh lùng, dửng dưng': 'phép so sánh "như nhớ người yêu" đã đặt cảm xúc ở mức nồng nàn nhất' },
        v: 'Phép so sánh nỗi nhớ Việt Bắc với nỗi nhớ người yêu đưa tình cảm cách mạng vào giọng điệu của ca dao tình yêu. '
          + 'Thể lục bát và những hình ảnh êm đềm (trăng lên, nắng chiều) làm giọng thơ ngọt ngào, da diết.' },
      { nl: 'Chúng nó đã đến rồi, lũ giặc kia\nMang tội ác đi khắp mọi miền quê', d: 'Căm phẫn, tố cáo',
        s: ['Nhẹ nhàng, sâu lắng', 'Bâng khuâng, tiếc nuối', 'Hóm hỉnh, tếu táo'],
        sv: { 'Nhẹ nhàng, sâu lắng': 'cách gọi miệt thị "chúng nó", "lũ giặc" đã loại bỏ mọi sự nhẹ nhàng',
              'Bâng khuâng, tiếc nuối': 'sắc thái này thuộc về thơ hoài niệm, không hợp với lời tố cáo',
              'Hóm hỉnh, tếu táo': 'trái hẳn với nội dung nói về tội ác' },
        v: 'Đại từ miệt thị "chúng nó", "lũ giặc" cộng với danh từ "tội ác" và phạm vi "khắp mọi miền quê" '
          + 'dồn lại thành lời kết tội. Giọng điệu vì thế là căm phẫn và tố cáo.' }
    ]);
    return MC(R, `Xác định GIỌNG ĐIỆU chủ đạo của ngữ liệu sau:\n\n"${it.nl}"`, it,
      'Căn cứ để xác định giọng điệu gồm bốn thứ: ① từ ngữ xưng hô và thán từ ② các từ ngữ giàu sắc thái cảm xúc '
      + '③ nhịp thơ và thể thơ ④ kiểu câu (cảm thán, câu hỏi tu từ, câu khẳng định). '
      + 'Đừng đoán giọng điệu từ tên tác giả hay hoàn cảnh bài thơ — phải bắt được bằng chứng ngay trong ngữ liệu.');
  } },

{ ma: 'van-m3-nhande', chuong: 'Đọc hiểu', muc: 3, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { nl: 'Người ta thường nói tuổi trẻ là quãng thời gian đẹp nhất đời người. Nhưng đẹp không phải vì nó dài, mà vì nó là quãng duy nhất ta được phép sai và còn kịp làm lại. Hãy dùng nó để thử, chứ đừng dùng để chờ.',
        d: 'Tuổi trẻ — thời gian để thử, không phải để chờ',
        s: ['Bàn về cách quản lí thời gian hiệu quả', 'Những sai lầm không thể sửa chữa', 'Vẻ đẹp của thiên nhiên tuổi học trò'],
        sv: { 'Bàn về cách quản lí thời gian hiệu quả': 'ngữ liệu không hướng dẫn kĩ năng quản lí thời gian',
              'Những sai lầm không thể sửa chữa': 'ngược lại, ngữ liệu nhấn mạnh tuổi trẻ CÒN KỊP làm lại',
              'Vẻ đẹp của thiên nhiên tuổi học trò': 'lạc hoàn toàn, ngữ liệu không tả cảnh' },
        v: 'Nhan đề tốt phải gói được ý chính và giữ được cách nói riêng của ngữ liệu. Câu chốt "dùng để thử, đừng dùng để chờ" chính là linh hồn của đoạn văn.' },
      { nl: 'Một cái cây muốn đứng vững trước gió thì rễ phải cắm sâu chứ không phải cành phải vươn cao. Con người cũng vậy: cái làm ta không ngã không nằm ở những gì người khác nhìn thấy.',
        d: 'Gốc rễ làm nên sức đứng vững',
        s: ['Kĩ thuật trồng và chăm sóc cây xanh', 'Lợi ích của việc vươn cao trong cuộc sống', 'Cách gây ấn tượng với người xung quanh'],
        sv: { 'Kĩ thuật trồng và chăm sóc cây xanh': 'hình ảnh cái cây chỉ là phép so sánh, không phải nội dung chính',
              'Lợi ích của việc vươn cao trong cuộc sống': 'ngữ liệu nói ngược — vươn cao không phải cái giữ cho ta vững',
              'Cách gây ấn tượng với người xung quanh': 'trái với ý "không nằm ở những gì người khác nhìn thấy"' },
        v: 'Ngữ liệu dùng hình ảnh rễ cây để nói về nội lực bên trong. Nhan đề đúng phải giữ được hình ảnh ẩn dụ ấy và nêu được ý nghĩa nó biểu đạt.' },
      { nl: 'Có những người đi qua đời ta chỉ vài phút mà để lại dấu vết cả đời, cũng có những người ở cạnh ta hàng chục năm mà chẳng để lại gì. Hoá ra chiều dài của một mối quan hệ không nói lên chiều sâu của nó.',
        d: 'Chiều dài không làm nên chiều sâu',
        s: ['Cách giữ gìn tình bạn lâu năm', 'Nỗi cô đơn của con người hiện đại', 'Ý nghĩa của những chuyến đi xa'],
        sv: { 'Cách giữ gìn tình bạn lâu năm': 'ngữ liệu không hướng dẫn cách giữ gìn quan hệ',
              'Nỗi cô đơn của con người hiện đại': 'không có sắc thái cô đơn trong ngữ liệu',
              'Ý nghĩa của những chuyến đi xa': 'chữ "đi qua đời ta" là cách nói bóng, không phải chuyến đi thật' },
        v: 'Câu cuối đã tự tổng kết ngữ liệu bằng cặp đối lập "chiều dài – chiều sâu". Nhan đề hay nhất chính là rút gọn của câu chốt đó.' },
      { nl: 'Biết ơn không phải là món nợ phải trả, mà là cách ta nhìn lại con đường mình đã đi và nhận ra mình chưa từng đi một mình.',
        d: 'Biết ơn — nhận ra mình chưa từng đi một mình',
        s: ['Bàn về việc trả nợ đúng hạn', 'Những khó khăn của người đi đường xa', 'Cách sống độc lập và tự chủ'],
        sv: { 'Bàn về việc trả nợ đúng hạn': 'chữ "món nợ" là cách nói ví von và còn bị ngữ liệu phủ định',
              'Những khó khăn của người đi đường xa': 'con đường ở đây là ẩn dụ cho hành trình cuộc đời',
              'Cách sống độc lập và tự chủ': 'trái ngược với ý "chưa từng đi một mình"' },
        v: 'Ngữ liệu định nghĩa lại lòng biết ơn bằng cách phủ định trước ("không phải món nợ") rồi khẳng định sau. '
          + 'Nhan đề phải bám vào vế khẳng định vì đó mới là điều tác giả muốn nói.' },
      { nl: 'Thất bại không phải là ngã xuống, mà là nằm lại chỗ vừa ngã. Người ta không đo một đời người bằng số lần vấp, mà bằng số lần đứng dậy.',
        d: 'Đo một đời người bằng số lần đứng dậy',
        s: ['Nguyên nhân của những cú vấp ngã', 'Cách phòng tránh tai nạn trong sinh hoạt', 'Sự cần thiết của việc nghỉ ngơi đúng lúc'],
        sv: { 'Nguyên nhân của những cú vấp ngã': 'ngữ liệu không phân tích nguyên nhân, chỉ bàn về thái độ sau khi ngã',
              'Cách phòng tránh tai nạn trong sinh hoạt': 'hiểu chữ "ngã" theo nghĩa đen',
              'Sự cần thiết của việc nghỉ ngơi đúng lúc': 'trái với ý phê phán việc "nằm lại chỗ vừa ngã"' },
        v: 'Cả hai câu đều dựng trên một cặp đối lập: ngã / nằm lại, số lần vấp / số lần đứng dậy. '
          + 'Nhan đề đúng phải lấy vế mang thông điệp tích cực ở câu chốt.' },
      { nl: 'Đọc sách không làm ta thông minh hơn ngay lập tức. Nhưng mỗi cuốn sách là một lần ta được sống thêm một cuộc đời khác, và người sống nhiều cuộc đời thì khó hẹp hòi.',
        d: 'Mỗi cuốn sách là một cuộc đời',
        s: ['Phương pháp đọc sách nhanh và nhớ lâu', 'Sách giáo khoa và vai trò trong nhà trường', 'Trí thông minh bẩm sinh của con người'],
        sv: { 'Phương pháp đọc sách nhanh và nhớ lâu': 'ngữ liệu không bàn tới kĩ thuật đọc',
              'Sách giáo khoa và vai trò trong nhà trường': 'thu hẹp sai phạm vi, ngữ liệu nói về sách nói chung',
              'Trí thông minh bẩm sinh của con người': 'ngữ liệu chỉ nhắc tới trí thông minh để phủ định, không phải chủ đề chính' },
        v: 'Ý chính nằm ở vế sau: đọc sách mở rộng trải nghiệm sống và nhờ vậy làm con người bao dung hơn. '
          + 'Nhan đề giữ được hình ảnh "một cuộc đời khác" vừa đúng ý vừa gợi.' }
    ]);
    return MC(R, `Đặt một nhan đề phù hợp nhất cho ngữ liệu sau:\n\n"${it.nl}"`, it,
      'Nhan đề tốt phải thoả ba điều kiện: ① đúng với ý chính chứ không chỉ một chi tiết ② đủ khái quát cho CẢ ngữ liệu '
      + '③ ngắn gọn và có sức gợi. Mẹo nhanh: câu chốt ở cuối ngữ liệu thường chính là nhan đề sau khi rút gọn.');
  } },

{ ma: 'van-m3-chitiet', chuong: 'Nghị luận văn học', muc: 3, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { tp: 'Vợ nhặt (Kim Lân)', ct: 'nồi cháo cám mà bà cụ Tứ bưng ra trong bữa cơm ngày đói',
        d: 'Vừa tô đậm cái đói đến cùng cực, vừa làm nổi bật tình thương và nỗ lực nhen nhóm hi vọng của người mẹ nghèo',
        s: ['Cho thấy gia đình Tràng vốn có truyền thống nấu ăn khéo léo',
            'Chứng minh nạn đói năm 1945 chỉ xảy ra ở vùng nông thôn',
            'Thể hiện sự keo kiệt của bà cụ Tứ với con dâu mới'],
        sv: { 'Cho thấy gia đình Tràng vốn có truyền thống nấu ăn khéo léo': 'cháo cám là món ăn của sự cùng đường, không phải dấu hiệu khéo léo',
              'Chứng minh nạn đói năm 1945 chỉ xảy ra ở vùng nông thôn': 'chi tiết văn học không dùng để chứng minh một luận điểm lịch sử như vậy',
              'Thể hiện sự keo kiệt của bà cụ Tứ với con dâu mới': 'ngược hẳn, bà cụ Tứ gọi đó là "chè khoán" để giữ thể diện và niềm vui cho các con' },
        v: 'Chi tiết đắt giá vì mang hai lớp nghĩa trái chiều cùng lúc: đắng chát của cái đói và ấm áp của tình người. '
          + 'Bà cụ Tứ gọi nồi cháo cám là "chè khoán" — một lời nói dối thương xót nhằm giữ lấy chút vui trong ngày các con nên vợ nên chồng.' },
      { tp: 'Chiếc thuyền ngoài xa (Nguyễn Minh Châu)', ct: 'tấm ảnh chụp chiếc thuyền trong sương sớm được treo ở nhiều gia đình sành nghệ thuật',
        d: 'Nêu lên khoảng cách giữa vẻ đẹp nghệ thuật bề ngoài và sự thật đời sống bên trong, đặt ra yêu cầu người nghệ sĩ phải nhìn sâu vào hiện thực',
        s: ['Ca ngợi kĩ thuật nhiếp ảnh điêu luyện của nhân vật Phùng',
            'Cho thấy nghề chài lưới đem lại cuộc sống sung túc',
            'Khẳng định nghệ thuật nên tránh xa những điều xấu xí'],
        sv: { 'Ca ngợi kĩ thuật nhiếp ảnh điêu luyện của nhân vật Phùng': 'dừng ở lớp nghĩa bề mặt, bỏ mất tư tưởng của tác phẩm',
              'Cho thấy nghề chài lưới đem lại cuộc sống sung túc': 'trái ngược với hiện thực nghèo khổ và bạo lực đằng sau bức ảnh',
              'Khẳng định nghệ thuật nên tránh xa những điều xấu xí': 'ngược hẳn thông điệp — tác phẩm đòi nghệ thuật phải nhìn thẳng vào sự thật' },
        v: 'Bức ảnh đẹp được treo ở nơi sang trọng, nhưng chỉ mình Phùng biết đằng sau nó là người đàn bà bị chồng đánh. '
          + 'Chi tiết khép lại tác phẩm bằng một nghịch lí, đặt ra vấn đề mối quan hệ giữa nghệ thuật và cuộc đời.' },
      { tp: 'Vợ chồng A Phủ (Tô Hoài)', ct: 'tiếng sáo gọi bạn tình vọng vào đêm tình mùa xuân ở Hồng Ngài',
        d: 'Là tác nhân đánh thức sức sống và khát vọng tự do tưởng đã tắt hẳn trong lòng Mị',
        s: ['Miêu tả phong tục âm nhạc đặc sắc của người Mông',
            'Báo hiệu A Phủ sắp bị trói đứng ở góc nhà',
            'Cho thấy nhà thống lí Pá Tra tổ chức lễ hội linh đình'],
        sv: { 'Miêu tả phong tục âm nhạc đặc sắc của người Mông': 'màu sắc phong tục chỉ là nền, không phải giá trị chính của chi tiết',
              'Báo hiệu A Phủ sắp bị trói đứng ở góc nhà': 'nhầm mạch truyện, tiếng sáo gắn với diễn biến tâm lí của Mị',
              'Cho thấy nhà thống lí Pá Tra tổ chức lễ hội linh đình': 'chi tiết không nhằm miêu tả nhà thống lí' },
        v: 'Tiếng sáo trở đi trở lại nhiều lần, mỗi lần một gần hơn, đi từ ngoài đầu núi vào tận trong đầu Mị. '
          + 'Nó kéo Mị về với kí ức thời con gái, khiến Mị "thấy phơi phới trở lại" — tức là sức sống tiềm tàng đã được đánh thức.' },
      { tp: 'Chí Phèo (Nam Cao)', ct: 'bát cháo hành mà Thị Nở mang sang cho Chí Phèo',
        d: 'Là biểu tượng của tình người, thứ đánh thức phần lương thiện và khát khao hoàn lương trong con quỷ dữ của làng Vũ Đại',
        s: ['Chứng tỏ Thị Nở có tài nấu ăn hơn người',
            'Cho thấy Chí Phèo bị bệnh nặng cần được chữa trị',
            'Thể hiện sự giàu có của gia đình Thị Nở'],
        sv: { 'Chứng tỏ Thị Nở có tài nấu ăn hơn người': 'giá trị của chi tiết nằm ở TẤM LÒNG chứ không ở món ăn',
              'Cho thấy Chí Phèo bị bệnh nặng cần được chữa trị': 'chỉ đúng lớp nghĩa tình huống, bỏ mất ý nghĩa tư tưởng',
              'Thể hiện sự giàu có của gia đình Thị Nở': 'bát cháo hành là thứ rẻ nhất, ý nghĩa nằm ở chỗ nó được cho đi bởi một người cũng khốn khổ' },
        v: 'Đây là lần đầu tiên trong đời Chí được người khác cho, mà lại cho không đòi hỏi. '
          + 'Bát cháo hành làm Chí "thèm lương thiện", nhận ra mình vẫn có thể làm người — chi tiết bản lề của toàn bộ tác phẩm.' },
      { tp: 'Rừng xà nu (Nguyễn Trung Thành)', ct: 'hình ảnh những cánh rừng xà nu nối tiếp chạy đến chân trời ở đầu và cuối tác phẩm',
        d: 'Tượng trưng cho sức sống bất diệt và sự tiếp nối không ngừng của các thế hệ dân làng Xô Man trong đấu tranh',
        s: ['Giới thiệu đặc điểm thực vật đặc trưng của vùng Tây Nguyên',
            'Cho thấy làng Xô Man có nguồn tài nguyên gỗ dồi dào',
            'Báo hiệu thời tiết khắc nghiệt sắp xảy ra với dân làng'],
        sv: { 'Giới thiệu đặc điểm thực vật đặc trưng của vùng Tây Nguyên': 'dừng ở nghĩa tả thực, bỏ mất tầng biểu tượng',
              'Cho thấy làng Xô Man có nguồn tài nguyên gỗ dồi dào': 'lạc hướng hoàn toàn khỏi tư tưởng tác phẩm',
              'Báo hiệu thời tiết khắc nghiệt sắp xảy ra với dân làng': 'suy diễn không có căn cứ trong văn bản' },
        v: 'Cây xà nu bị đạn đại bác chặt đứt vẫn có cây con mọc lên thay thế, giống hệt việc anh Xút, bà Nhan ngã xuống thì có Tnú, rồi có Dít, có bé Heng. '
          + 'Kết cấu vòng tròn đầu – cuối cùng một hình ảnh làm ý nghĩa nối tiếp thế hệ thêm đậm.' },
      { tp: 'Ai đã đặt tên cho dòng sông? (Hoàng Phủ Ngọc Tường)', ct: 'sông Hương được ví như "người tình dịu dàng và chung thuỷ" của cố đô Huế',
        d: 'Nhân hoá dòng sông thành một sinh thể có tâm hồn, qua đó bộc lộ tình yêu và niềm tự hào sâu nặng của tác giả với xứ Huế',
        s: ['Cung cấp thông tin thuỷ văn chính xác về lưu lượng sông Hương',
            'Chứng minh sông Hương dài hơn các con sông khác ở miền Trung',
            'Phê phán việc con người làm ô nhiễm dòng sông'],
        sv: { 'Cung cấp thông tin thuỷ văn chính xác về lưu lượng sông Hương': 'đây là bút kí giàu chất trữ tình, không phải văn bản khoa học',
              'Chứng minh sông Hương dài hơn các con sông khác ở miền Trung': 'so sánh độ dài không liên quan tới ý nghĩa của hình ảnh',
              'Phê phán việc con người làm ô nhiễm dòng sông': 'tác phẩm mang cảm hứng ngợi ca, không phải phê phán' },
        v: 'Cách ví von biến dòng sông vô tri thành một con người có tính cách, có mối tình thuỷ chung với thành phố. '
          + 'Nhờ đó bài bút kí không tả cảnh đơn thuần mà trở thành một áng văn về tình yêu quê hương.' }
    ]);
    return MC(R, `Nêu ý nghĩa của chi tiết ${it.ct} trong tác phẩm ${it.tp}.`, it,
      'Chi tiết nghệ thuật bao giờ cũng có hai lớp: lớp TẢ THỰC (nó là cái gì trong truyện) và lớp Ý NGHĨA '
      + '(nó nói lên điều gì về nhân vật, về tư tưởng tác phẩm). Phương án chỉ nhắc lại lớp tả thực là phương án nhiễu.');
  } }

]);

/* ============================================================
   ④ GDKT&PL — BA BỘ SINH MỨC 1
   ============================================================ */
/* Khuôn trắc nghiệm số: nhiễu là kết quả của những phép tính sai kinh điển */
const MCS = (R, de, dung, sai, giai, meo, fmt) => {
  const f = fmt || (x => S(x));
  const cD = f(dung), cS = [];
  for (const x of sai) { const c = f(x); if (c !== cD && cS.indexOf(c) < 0) cS.push(c); if (cS.length === 3) break; }
  if (cS.length < 3) return null;
  const opts = TD.xaoR(R, [cD].concat(cS));
  return { q: de, opts: opts, ans: opts.indexOf(cD), giai: giai, meo: meo };
};

TD.GEN.gdkt = (TD.GEN.gdkt || []).concat([

{ ma: 'gdkt-m1-conlai', chuong: 'Quản lí thu chi', muc: 1, dang: 'mc',
  tao(R) {
    const thu = R.nguyen(8, 25) * 1000000;
    const ty = R.chon([0.55, 0.6, 0.65, 0.7, 0.75]);
    const chi = Math.round(thu * ty / 100000) * 100000;
    const con = thu - chi;
    const tr = x => S(x / 1000000, 2) + ' triệu đồng';
    return MCS(R, `Gia đình ông A có tổng thu nhập ${tr(thu)} một tháng và chi tiêu hết ${tr(chi)}. `
      + `Số tiền gia đình ông A có thể tiết kiệm được trong tháng đó là bao nhiêu?`,
      con, [thu + chi, chi - thu, con / 2, thu],
      `Số tiền tiết kiệm = tổng thu nhập − tổng chi tiêu.\n`
      + `= ${tr(thu)} − ${tr(chi)} = ${tr(con)}.\n`
      + `Khoản này chính là phần "trả cho tương lai" trong kế hoạch thu chi của gia đình.`,
      'Nguyên tắc quản lí thu chi: lập kế hoạch phải bắt đầu từ khoản tiết kiệm rồi mới chia phần còn lại cho chi tiêu, '
      + 'chứ không phải chi hết rồi thừa bao nhiêu mới để dành.', tr);
  } },

{ ma: 'gdkt-m1-tytrong', chuong: 'Tăng trưởng – Phát triển', muc: 1, dang: 'mc',
  tao(R) {
    const tong = R.nguyen(300, 900) * 10;
    const nganh = R.chon(['nông nghiệp', 'công nghiệp – xây dựng', 'dịch vụ']);
    const gt = Math.round(tong * R.chon([0.12, 0.18, 0.25, 0.34, 0.41]) );
    const ty = gt / tong * 100;
    return MCS(R, `Tổng GDP của một quốc gia là ${S(tong)} tỉ USD, trong đó giá trị do ngành ${nganh} tạo ra là ${S(gt)} tỉ USD. `
      + `Tỉ trọng của ngành ${nganh} trong GDP là bao nhiêu?`,
      ty, [tong / gt * 100, gt / tong, ty * 2, 100 - ty],
      `Tỉ trọng = (giá trị của bộ phận / tổng thể) × 100%.\n`
      + `= ${S(gt)}/${S(tong)} × 100% = ${S(ty, 1)}%.`,
      'Tỉ trọng luôn lấy BỘ PHẬN chia TỔNG THỂ. Đảo ngược lại là ra số lớn hơn 100%, nhìn là biết sai ngay.',
      x => S(x, 1) + '%');
  } },

{ ma: 'gdkt-m1-laidon', chuong: 'Quản lí thu chi', muc: 1, dang: 'tln', duong: true,
  tao(R) {
    const von = R.nguyen(20, 200) * 1000000;
    const ls = R.chon([4.5, 5, 5.5, 6, 6.5, 7]);
    const lai = von * ls / 100;
    return {
      q: `Chị B gửi tiết kiệm ${S(von / 1000000)} triệu đồng với lãi suất ${S(ls, 1)}%/năm, trả lãi cuối kì. `
        + `Sau 1 năm chị B nhận được số tiền lãi là bao nhiêu triệu đồng? (làm tròn đến hàng phần trăm)`,
      ans: D(lai / 1000000, 2),
      giai: `Tiền lãi sau 1 năm = số tiền gửi × lãi suất năm.\n`
        + `= ${S(von / 1000000)} × ${S(ls, 1)}% = ${S(von / 1000000)} × ${S(ls / 100, 4)} = ${D(lai / 1000000, 2)} triệu đồng.\n`
        + `Tổng số tiền chị B nhận về khi tất toán là ${D((von + lai) / 1000000, 2)} triệu đồng.`,
      meo: 'Phân biệt tiền LÃI với tổng số tiền NHẬN VỀ — đề hỏi cái nào thì trả lời cái đó. '
        + 'Lãi suất ghi %/năm nên gửi 6 tháng thì phải nhân thêm 6/12.'
    };
  } }

]);

/* ============================================================
   ⑤ CẤM THƯ — BÙ CHO KHỐI XÃ HỘI
   Văn · Sử · Địa · GDKT · Sinh mỗi môn trước đây chỉ 7 thẻ, trong
   khi Toán 16 và Hoá 12. Mấy môn này cũng có mẹo phòng thi riêng
   chứ không phải chỉ học thuộc.
   ============================================================ */
const themCam = (mon, ds) => {
  const k = mon + '_cam';
  TD.KHO[k] = (TD.KHO[k] || []).concat(ds.map(x => (x.cd = '*', x)));
};

/* ---------------- NGỮ VĂN ---------------- */
themCam('van', [
{ nhom: '✍️ Khung viết', ten: 'Đoạn NLVH 200 chữ: khung 5 câu, viết trong 20 phút', cap: 2,
  ct: 'Câu 1 (mở): nêu thẳng vấn đề nghị luận mà đề hỏi, không vòng vo giới thiệu tác giả tác phẩm.<br>'
    + 'Câu 2 – 3 (thân): mỗi câu một luận điểm, mỗi luận điểm bám vào MỘT dẫn chứng cụ thể trong ngữ liệu (một hình ảnh, một từ ngữ, một chi tiết).<br>'
    + 'Câu 4 (nghệ thuật): chỉ ra một yếu tố nghệ thuật và tác dụng của nó — đây là câu ăn điểm phân hoá, đa số thí sinh bỏ qua.<br>'
    + 'Câu 5 (kết): đánh giá ngắn về giá trị của vấn đề hoặc tài năng tác giả.',
  khi: 'Câu 1 phần Viết (2,0 điểm), yêu cầu đúng 200 chữ.',
  vd: 'Đề hỏi "cảm nhận về vẻ đẹp bức tranh thiên nhiên trong đoạn thơ" → câu 1: "Đoạn thơ đã dựng nên một bức tranh thiên nhiên vừa tươi sáng vừa đượm buồn." '
    + 'rồi vào thẳng luận điểm, không cần "Nguyễn Du là đại thi hào dân tộc…".',
  bay: '200 chữ là khoảng 12 – 15 dòng viết tay. Viết dài quá vẫn bị trừ điểm hình thức mà lại mất thời gian của câu 4,0 điểm phía sau.',
  meo: 'Đếm chữ nhanh: đếm số chữ ở một dòng đầy (thường 10 – 12 chữ) rồi nhân với số dòng. Không cần đếm từng chữ.' },

{ nhom: '✍️ Khung viết', ten: 'Bài NLXH 600 chữ: dàn ý 6 đoạn, phân bổ 50 phút', cap: 3,
  ct: '① <b>Mở bài</b> (3 – 4 dòng): dẫn dắt ngắn + nêu vấn đề nghị luận.<br>'
    + '② <b>Giải thích</b>: cắt nghĩa từ khoá của đề, rồi chốt lại vấn đề bàn về điều gì.<br>'
    + '③ <b>Bàn luận – biểu hiện và lí giải</b>: vì sao lại như vậy, trả lời bằng 2 – 3 lí lẽ.<br>'
    + '④ <b>Dẫn chứng</b>: 1 – 2 dẫn chứng THỰC TẾ, có tên tuổi và số liệu, không kể chung chung.<br>'
    + '⑤ <b>Phản đề</b>: nêu mặt trái hoặc hiện tượng ngược lại rồi phê phán — đoạn này quyết định điểm khá hay giỏi.<br>'
    + '⑥ <b>Bài học và liên hệ bản thân</b>: nói cụ thể mình sẽ làm gì, tránh khẩu hiệu.',
  khi: 'Câu 2 phần Viết (4,0 điểm) — câu nặng điểm nhất của cả đề.',
  vd: 'Đề "Bàn về ý nghĩa của sự tử tế": ⑤ phản đề là "tử tế giả tạo, làm việc thiện để đánh bóng tên tuổi trên mạng xã hội" — '
    + 'nêu được ý này là bài lập tức khác hẳn số đông.',
  bay: 'Nhiều bài mất điểm vì thiếu hẳn đoạn ⑤ phản đề và đoạn ④ dẫn chứng thực tế, chỉ toàn lí lẽ chung chung nghe hay mà rỗng.',
  meo: 'Chuẩn bị sẵn một "kho dẫn chứng vạn năng" gồm 6 – 8 nhân vật đa lĩnh vực (một nhà khoa học, một vận động viên, một doanh nhân, một người bình dị). '
    + 'Hầu hết đề NLXH đều xoay quanh nghị lực, trách nhiệm, lòng nhân ái, khát vọng — cùng một kho dẫn chứng dùng được cho tất cả.' },

{ nhom: '👁 Nhìn là biết', ten: 'Nhận diện phong cách ngôn ngữ và phương thức biểu đạt trong 10 giây', cap: 1,
  ct: '<b>Phong cách ngôn ngữ</b> — nhìn nguồn trích dẫn ở cuối ngữ liệu:<br>'
    + '· trích báo, có số liệu, tên cơ quan → <b>báo chí</b><br>'
    + '· trích thơ, truyện, tuỳ bút → <b>nghệ thuật</b><br>'
    + '· trích luật, nghị định, văn bản hành chính → <b>hành chính</b><br>'
    + '· trích sách chuyên ngành, có thuật ngữ khoa học → <b>khoa học</b><br>'
    + '· trích bài phát biểu, xã luận, có lập luận thuyết phục → <b>chính luận</b><br>'
    + '· lời đối thoại đời thường → <b>sinh hoạt</b><br>'
    + '<b>Phương thức biểu đạt</b> — nhìn động từ chủ đạo: tả cảnh tả người → miêu tả · kể chuỗi sự việc → tự sự · '
    + 'bộc lộ cảm xúc → biểu cảm · đưa lí lẽ dẫn chứng → nghị luận · cung cấp tri thức khách quan → thuyết minh · kêu gọi, ra lệnh → hành chính công vụ.',
  khi: 'Câu 1 – 2 phần Đọc hiểu, gần như đề nào cũng có.',
  vd: 'Ngữ liệu kết thúc bằng "(Theo Báo Nhân Dân, 12 – 3 – 2024)" → phong cách báo chí, phương thức chính là thuyết minh hoặc nghị luận.',
  bay: 'Đề hỏi phương thức biểu đạt CHÍNH thì chỉ ghi một; hỏi "các phương thức" mới liệt kê nhiều. Đọc kĩ chữ "chính".',
  meo: 'Dòng ghi nguồn ở cuối ngữ liệu là thứ đáng đọc TRƯỚC khi đọc ngữ liệu — nó cho không một nửa đáp án của hai câu đầu.' },

{ nhom: '👁 Nhìn là biết', ten: 'Ba câu hỏi mở phần Đọc hiểu: công thức trả lời đủ ý', cap: 2,
  ct: 'Câu hỏi <b>"tác dụng của biện pháp tu từ"</b> → gọi tên biện pháp + chỉ ra ở đâu + tác dụng NỘI DUNG + tác dụng NGHỆ THUẬT. Thiếu vế nghệ thuật là mất nửa điểm.<br>'
    + 'Câu hỏi <b>"anh/chị hiểu thế nào về câu…"</b> → giải nghĩa từ khoá trước, rồi mới nêu ý nghĩa cả câu, cuối cùng liên hệ ngắn.<br>'
    + 'Câu hỏi <b>"thông điệp ý nghĩa nhất"</b> → nêu thông điệp bằng MỘT câu khẳng định rõ ràng, rồi giải thích vì sao chọn thông điệp đó (2 – 3 dòng). '
    + 'Không được chỉ nêu suông rồi hết.',
  khi: 'Ba câu cuối phần Đọc hiểu, tổng cộng 2,5 điểm.',
  vd: 'Hỏi tác dụng phép điệp "ta làm" → "Phép điệp ngữ ta làm lặp ba lần ở đầu ba dòng thơ (chỉ ra), nhấn mạnh ước nguyện cống hiến tự nguyện và tha thiết (nội dung), '
    + 'đồng thời tạo nhịp thơ dồn dập như một lời thề (nghệ thuật)."',
  bay: 'Câu hỏi mở không có đáp án duy nhất, nhưng vẫn phải BÁM NGỮ LIỆU. Trả lời bằng suy nghĩ cá nhân mà không dẫn được chữ nào trong bài thì vẫn mất điểm.',
  meo: 'Mỗi câu hỏi mở viết 3 – 5 dòng là vừa. Viết dài hơn không được thêm điểm vì đáp án chấm theo Ý, không theo độ dài.' },

{ nhom: '⏱ Chiến thuật', ten: 'Phân bổ 120 phút cho đề Ngữ văn 2025', cap: 2,
  ct: '<b>0 – 5 phút</b>: đọc lướt toàn đề, đọc dòng ghi nguồn của ngữ liệu trước.<br>'
    + '<b>5 – 30 phút</b>: làm trọn phần Đọc hiểu (4,0 điểm, 5 câu). Câu 1 – 2 chỉ nên mất 3 phút.<br>'
    + '<b>30 – 50 phút</b>: viết đoạn NLVH 200 chữ (2,0 điểm).<br>'
    + '<b>50 – 105 phút</b>: viết bài NLXH 600 chữ (4,0 điểm) — dành 5 phút đầu lập dàn ý ra nháp.<br>'
    + '<b>105 – 120 phút</b>: soát chính tả, bổ sung ý còn thiếu, đếm lại số chữ.',
  khi: 'Ngay khi nhận đề, ghi mốc thời gian ra góc nháp.',
  vd: 'Nếu đến phút 55 mà chưa viết xong đoạn 200 chữ thì bỏ đó, sang ngay câu 4,0 điểm — mất trọn 2,0 điểm còn hơn mất trọn 4,0 điểm.',
  bay: 'Sa đà vào phần Đọc hiểu vì thấy dễ là lỗi phổ biến nhất. Đọc hiểu chỉ 4,0 điểm mà phần Viết tới 6,0 điểm.',
  meo: 'Lập dàn ý ra nháp 5 phút không phải là phí thời gian — bài có dàn ý viết nhanh hơn và không bị lặp ý, lãi hơn nhiều so với 5 phút bỏ ra.' },

{ nhom: '👁 Nhìn là biết', ten: 'Phân biệt ẩn dụ – hoán dụ – so sánh chỉ bằng một câu hỏi', cap: 1,
  ct: 'Hỏi: <b>hai sự vật quan hệ với nhau kiểu gì?</b><br>'
    + '· <b>Giống nhau</b> ở một nét nào đó → <b>ẩn dụ</b> (mặt trời – đứa con: cùng là nguồn sống)<br>'
    + '· <b>Gần gũi</b>, đi liền với nhau trong thực tế → <b>hoán dụ</b> (áo chàm – người Việt Bắc: dấu hiệu và người mang dấu hiệu)<br>'
    + '· Giống nhau nhưng <b>nói ra cả hai vế</b> kèm từ so sánh (như, là, tựa) → <b>so sánh</b><br>'
    + 'Bốn kiểu hoán dụ thường gặp: bộ phận – toàn thể (bàn tay – người lao động), dấu hiệu – sự vật (áo chàm – người), '
    + 'vật chứa – vật bị chứa (cả làng – người trong làng), cụ thể – trừu tượng (một cây – cá nhân).',
  khi: 'Câu nhận diện biện pháp tu từ phần Đọc hiểu.',
  vd: '"Thuyền về có nhớ bến chăng" — thuyền và bến không giống nhau về bản chất mà gắn với người đi – người ở qua liên tưởng, đây là ẩn dụ (ẩn dụ hình tượng).',
  bay: 'Ẩn dụ hay bị nhầm với hoán dụ. Cứ tự hỏi "hai thứ này GIỐNG nhau hay ĐI LIỀN nhau" là tách được ngay.',
  meo: 'So sánh là biện pháp duy nhất hiện đủ CẢ HAI vế trên mặt chữ. Chỉ thấy một vế thì chắc chắn không phải so sánh.' }
]);

/* ---------------- LỊCH SỬ ---------------- */
themCam('su', [
{ nhom: '👁 Nhìn là biết', ten: 'Bốn chữ khoá tách nguyên nhân – nguyên cớ – điều kiện', cap: 3,
  ct: '<b>Nguyên nhân sâu xa</b> — gốc rễ, tồn tại lâu dài, thường là mâu thuẫn kinh tế – xã hội.<br>'
    + '<b>Nguyên nhân trực tiếp</b> — sự kiện châm ngòi ngay trước đó.<br>'
    + '<b>Nguyên cớ (duyên cớ)</b> — cái cớ được dựng lên để hành động, có thể là nguỵ tạo.<br>'
    + '<b>Điều kiện khách quan</b> — hoàn cảnh bên ngoài thuận lợi, KHÔNG phải nguyên nhân.<br>'
    + 'Đề rất hay đặt cả bốn loại vào bốn phương án, nên đọc sai một chữ trong câu hỏi là chọn sai.',
  khi: 'Mọi câu hỏi bắt đầu bằng "Nguyên nhân… là", "Vì sao…".',
  vd: 'Cách mạng tháng Tám 1945: nguyên nhân sâu xa là mâu thuẫn dân tộc gay gắt suốt 80 năm; '
    + 'điều kiện khách quan là Nhật đầu hàng Đồng minh; nguyên nhân quyết định là sự lãnh đạo của Đảng và sự chuẩn bị suốt 15 năm.',
  bay: '"Điều kiện khách quan thuận lợi" và "nguyên nhân quyết định" là hai thứ khác nhau. Nhật đầu hàng chỉ tạo THỜI CƠ; '
    + 'không có sự chuẩn bị của Đảng thì thời cơ đó cũng qua đi.',
  meo: 'Gạch chân chữ "sâu xa / trực tiếp / quyết định / khách quan" trong đề trước khi nhìn phương án. Ba giây đó cứu được 0,25 điểm.' },

{ nhom: '👁 Nhìn là biết', ten: 'Neo mốc thời gian bằng chuỗi 10 năm', cap: 2,
  ct: 'Thay vì học rời rạc từng năm, neo theo chuỗi cách nhau tròn số:<br>'
    + '<b>1930</b> Đảng ra đời → <b>1945</b> Cách mạng tháng Tám (15 năm) → <b>1954</b> Điện Biên Phủ & Giơ-ne-vơ (9 năm) → '
    + '<b>1975</b> thống nhất (21 năm) → <b>1986</b> Đổi mới (11 năm).<br>'
    + 'Chuỗi thế giới: <b>1917</b> Cách mạng tháng Mười → <b>1945</b> Liên hợp quốc & kết thúc Thế chiến II → <b>1949</b> NATO, SEV, Trung Quốc → '
    + '<b>1955</b> Vác-sa-va → <b>1967</b> ASEAN → <b>1989</b> kết thúc Chiến tranh lạnh → <b>1991</b> Liên Xô tan rã.',
  khi: 'Câu hỏi về trình tự sự kiện, khoảng cách năm, "sự kiện nào diễn ra trước".',
  vd: 'Hỏi "từ khi Đảng ra đời đến Cách mạng tháng Tám là bao nhiêu năm" → 1945 − 1930 = 15 năm, không cần nhớ riêng con số 15.',
  bay: 'Năm 1949 có tới ba sự kiện lớn (NATO, SEV, nước Cộng hoà Nhân dân Trung Hoa). Đề hay lấy chính năm này để gài câu sắp xếp trình tự.',
  meo: 'Vẽ một trục thời gian ra nháp ngay khi vào phòng thi, điền 7 – 8 mốc đã thuộc. Mọi câu hỏi trình tự sau đó chỉ là nhìn trục mà đọc.' },

{ nhom: '👁 Nhìn là biết', ten: 'Loại phương án bằng ba dấu hiệu tuyệt đối hoá', cap: 2,
  ct: 'Phương án chứa các từ <b>"duy nhất", "hoàn toàn", "tất cả", "mọi", "chấm dứt hẳn", "lần đầu tiên"</b> thì xác suất sai rất cao, '
    + 'vì lịch sử hiếm khi tuyệt đối.<br>'
    + 'Ngược lại, phương án chứa <b>"một trong những", "góp phần", "từng bước", "chủ yếu"</b> thì thường an toàn hơn.<br>'
    + 'Đây là mẹo LOẠI TRỪ, chỉ dùng khi đã bí — không thay được kiến thức, vì đề vẫn có câu mà "lần đầu tiên" là đúng.',
  khi: 'Câu Phần I còn phân vân giữa hai phương án.',
  vd: '"Chiến thắng Điện Biên Phủ đã chấm dứt hoàn toàn ách thống trị của chủ nghĩa thực dân trên thế giới" — chữ "hoàn toàn" và phạm vi "thế giới" quá rộng, sai.',
  bay: 'Mẹo này có ngoại lệ thật: "Cách mạng tháng Mười Nga là cuộc cách mạng vô sản đầu tiên giành thắng lợi" — chữ "đầu tiên" ở đây hoàn toàn đúng.',
  meo: 'Ưu tiên kiến thức trước, mẹo sau. Chỉ dùng mẹo khi đã loại được xuống còn hai phương án mà vẫn không chắc.' },

{ nhom: '⏱ Chiến thuật', ten: 'Câu hỏi tư liệu: đọc câu hỏi trước, đọc tư liệu sau', cap: 3,
  ct: 'Dạng cho một đoạn tư liệu rồi hỏi "rút ra nhận định nào" là dạng mức 4 phổ biến nhất của đề Sử 2025.<br>'
    + 'Quy trình 4 bước: ① đọc CÂU HỎI trước để biết cần tìm gì ② đọc tư liệu, gạch chân động từ và cụm từ khoá '
    + '③ xác định tư liệu nói về THỜI ĐIỂM nào, do AI viết ④ đối chiếu từng phương án với đúng chữ trong tư liệu.<br>'
    + 'Phương án đúng phải suy ra được TỪ TƯ LIỆU, không phải từ kiến thức chung mà tư liệu không nhắc tới.',
  khi: 'Câu vận dụng cao Phần I và các ý Phần II có kèm trích dẫn.',
  vd: 'Tư liệu "Chúng ta muốn hoà bình, chúng ta phải nhân nhượng…" → hai vế nhân nhượng và buộc phải cầm súng cho thấy '
    + 'tính chất CHÍNH NGHĨA và BẤT ĐẮC DĨ của cuộc kháng chiến, chứ không phải nói về đường lối quân sự.',
  bay: 'Bẫy hay gặp nhất: phương án nêu một sự thật lịch sử ĐÚNG nhưng tư liệu không hề đề cập. Đúng mà lạc đề thì vẫn sai.',
  meo: 'Sau khi chọn xong, thử chỉ ra được cụm từ nào trong tư liệu chống lưng cho phương án đó. Không chỉ ra được thì chọn lại.' }
]);

/* ---------------- ĐỊA LÍ ---------------- */
themCam('dia', [
{ nhom: '👁 Nhìn là biết', ten: 'Chọn dạng biểu đồ chỉ bằng từ khoá trong đề', cap: 2,
  ct: '· <b>"Cơ cấu", "tỉ trọng", "tỉ lệ"</b> + từ 1 – 3 năm → biểu đồ <b>TRÒN</b> (1 năm 1 hình tròn)<br>'
    + '· <b>"Cơ cấu"</b> + từ 4 năm trở lên → biểu đồ <b>MIỀN</b><br>'
    + '· <b>"Tốc độ tăng trưởng", "tốc độ phát triển"</b> → biểu đồ <b>ĐƯỜNG</b> (phải xử lí về % lấy năm đầu = 100)<br>'
    + '· <b>"Tình hình", "so sánh"</b> các đối tượng cùng đơn vị → biểu đồ <b>CỘT</b><br>'
    + '· Hai đối tượng <b>KHÁC ĐƠN VỊ</b> (ví dụ diện tích và sản lượng) → biểu đồ <b>KẾT HỢP</b> cột và đường',
  khi: 'Câu chọn dạng biểu đồ, đề nào cũng có ít nhất một câu.',
  vd: 'Bảng số liệu dân số (triệu người) và tỉ lệ gia tăng (%) qua 5 năm → khác đơn vị nên chọn KẾT HỢP, không chọn cột hay đường đơn lẻ.',
  bay: '"Cơ cấu 4 năm" mà chọn tròn là bẫy kinh điển — 4 hình tròn thì không đọc được xu hướng, phải dùng miền.',
  meo: 'Đếm số năm trong bảng trước, rồi mới đọc từ khoá. Hai thông tin đó cộng lại là ra dạng biểu đồ, không cần nhìn số liệu.' },

{ nhom: '⌨️ Casio', ten: 'Ba phép tính bắt buộc thuộc của bài bảng số liệu', cap: 2,
  ct: '<b>Mật độ dân số</b> (người/km²) = số dân / diện tích<br>'
    + '<b>Năng suất</b> (tạ/ha) = sản lượng (tạ) / diện tích (ha) — nhớ đổi nghìn tấn sang tạ bằng cách nhân 10 000<br>'
    + '<b>Bình quân đầu người</b> = tổng sản lượng / tổng số dân<br>'
    + '<b>Tốc độ tăng trưởng</b> (%) = giá trị năm sau / giá trị năm gốc × 100, năm gốc luôn bằng 100<br>'
    + '<b>Tỉ trọng</b> (%) = bộ phận / tổng thể × 100<br>'
    + '<b>Cán cân xuất nhập khẩu</b> = xuất khẩu − nhập khẩu (dương là xuất siêu, âm là nhập siêu)',
  khi: 'Mọi câu có bảng số liệu, cả Phần I lẫn Phần III.',
  vd: 'Sản lượng lúa 43 triệu tấn, diện tích 7,2 triệu ha → năng suất = 43 000 000 × 10 / 7 200 000 ≈ 59,7 tạ/ha.',
  bay: 'Đơn vị là chỗ chết người: nghìn tấn – triệu tấn – tạ, nghìn ha – triệu ha. Đổi sai một bậc là lệch 10 hoặc 1000 lần.',
  meo: 'Dùng chức năng TABLE của máy tính để tính hàng loạt tỉ trọng của cả bảng cùng lúc, nhanh hơn bấm từng dòng.' },

{ nhom: '👁 Nhìn là biết', ten: 'Nhận xét bảng số liệu: bốn ý luôn có điểm', cap: 2,
  ct: 'Khi đề yêu cầu nhận xét, viết đủ bốn ý theo thứ tự:<br>'
    + '① <b>Nhận xét chung</b>: nhìn tổng thể tăng hay giảm, chênh lệch nhiều hay ít.<br>'
    + '② <b>Nhận xét riêng</b>: đối tượng nào cao nhất, thấp nhất, kèm số liệu chứng minh.<br>'
    + '③ <b>Xu hướng</b>: tăng liên tục, giảm liên tục hay tăng giảm không ổn định (phải nêu năm cụ thể).<br>'
    + '④ <b>So sánh</b>: gấp bao nhiêu lần, chênh lệch bao nhiêu đơn vị.<br>'
    + 'Mỗi ý bắt buộc dẫn ít nhất một con số lấy từ bảng.',
  khi: 'Câu nhận xét bảng số liệu, và các ý Đúng/Sai dựa trên bảng.',
  vd: 'Với ý Đúng/Sai "Giai đoạn 2015 – 2022, sản lượng tăng liên tục" → phải rà TỪNG năm; chỉ cần một năm giảm là ý đó SAI.',
  bay: 'Chữ "liên tục" và "ổn định" trong ý Đúng/Sai là bẫy số một. Đừng nhìn năm đầu với năm cuối rồi kết luận — phải soi hết các năm ở giữa.',
  meo: 'Trước khi xét bốn ý, dành 30 giây tính sẵn cột tỉ trọng hoặc cột chênh lệch ra nháp. Cả bốn ý sau đó chỉ là đọc bảng nháp.' },

{ nhom: '👁 Nhìn là biết', ten: 'Bốn quy luật phân hoá thiên nhiên nhớ theo trục', cap: 1,
  ct: '<b>Bắc – Nam</b>: miền Bắc có mùa đông lạnh (nhiệt đới ẩm gió mùa có mùa đông lạnh), từ dãy Bạch Mã trở vào là cận xích đạo gió mùa, nóng quanh năm.<br>'
    + '<b>Đông – Tây</b>: vùng biển và thềm lục địa → đồng bằng ven biển → đồi núi. Càng vào sâu càng giảm ảnh hưởng biển.<br>'
    + '<b>Theo độ cao</b>: dưới 600 – 700 m là đai nhiệt đới gió mùa · 600 – 2600 m là đai cận nhiệt đới gió mùa trên núi · trên 2600 m là đai ôn đới gió mùa trên núi (chỉ có ở Hoàng Liên Sơn).<br>'
    + '<b>Theo mùa</b>: gió mùa Đông Bắc gây mùa đông lạnh ở miền Bắc, gió mùa Tây Nam gây mưa lớn cho cả nước vào mùa hạ.',
  khi: 'Câu hỏi về khí hậu, phân hoá thiên nhiên, đai cao.',
  vd: 'Hỏi vì sao Đà Lạt mát quanh năm dù ở vĩ độ thấp → do nằm ở độ cao khoảng 1500 m, thuộc đai cận nhiệt đới gió mùa trên núi.',
  bay: 'Đai ôn đới gió mùa trên núi chỉ có ở dãy Hoàng Liên Sơn (Fansipan 3143 m), không có ở Tây Nguyên hay bất kì nơi nào khác.',
  meo: 'Ranh giới nhớ theo cặp số: 600 – 2600 – 3143. Ba con số này trả lời được gần hết câu hỏi về đai cao.' }
]);

/* ---------------- GDKT & PHÁP LUẬT ---------------- */
themCam('gdkt', [
{ nhom: '👁 Nhìn là biết', ten: 'Bài tình huống: xác định chủ thể trước, hành vi sau', cap: 3,
  ct: 'Quy trình 4 bước cho mọi câu tình huống pháp luật:<br>'
    + '① <b>Liệt kê chủ thể</b> ra nháp: ai làm gì, ghi tên từng người.<br>'
    + '② <b>Gán hành vi</b> cho từng người, kể cả hành vi không hành động (biết mà im lặng, được giao mà không làm).<br>'
    + '③ <b>Đối chiếu</b> từng hành vi với quy định pháp luật để xác định vi phạm loại nào.<br>'
    + '④ <b>Đọc kĩ câu hỏi</b>: hỏi "những ai vi phạm" thì phải kể ĐỦ, thiếu một người là sai cả câu.<br>'
    + 'Bốn loại vi phạm: hình sự (tội phạm) · hành chính (xâm phạm quy tắc quản lí nhà nước) · dân sự (quan hệ tài sản, nhân thân) · kỉ luật (quan hệ lao động, công vụ).',
  khi: 'Câu tình huống nhiều nhân vật — dạng vận dụng cao thường gặp nhất của môn này.',
  vd: 'Tình huống có 4 người: người trực tiếp làm sai, người xúi giục, người bao che, người biết mà không tố giác. '
    + 'Câu hỏi "những ai vi phạm" thường bao gồm cả người bao che, đó là chỗ thí sinh hay bỏ sót.',
  bay: 'Người CHỨNG KIẾN mà không can thiệp thì tuỳ trường hợp mới vi phạm; nhưng người BAO CHE, GIÚP SỨC thì luôn là đồng phạm. Hai vai này khác nhau.',
  meo: 'Vẽ sơ đồ mũi tên giữa các nhân vật ra nháp. Bài tình huống 5 nhân vật mà đọc nhẩm trong đầu là chắc chắn sót.' },

{ nhom: '👁 Nhìn là biết', ten: 'Phân biệt bốn hình thức thực hiện pháp luật', cap: 2,
  ct: '<b>Sử dụng</b> pháp luật — làm điều pháp luật CHO PHÉP, có thể làm hoặc không (đi bầu cử, kinh doanh ngành không cấm).<br>'
    + '<b>Thi hành</b> pháp luật — làm điều pháp luật BẮT BUỘC phải làm (nộp thuế, đội mũ bảo hiểm, đăng kí kinh doanh).<br>'
    + '<b>Tuân thủ</b> pháp luật — KHÔNG làm điều pháp luật cấm (không buôn bán ma tuý, không vượt đèn đỏ).<br>'
    + '<b>Áp dụng</b> pháp luật — cơ quan NHÀ NƯỚC có thẩm quyền ra quyết định (toà tuyên án, cảnh sát ra quyết định xử phạt, uỷ ban cấp giấy phép).<br>'
    + 'Mẹo tách nhanh: chủ thể là cơ quan nhà nước → áp dụng. Là công dân thì hỏi tiếp: được phép (sử dụng) · phải làm (thi hành) · không được làm (tuân thủ).',
  khi: 'Câu hỏi "hành vi trên thuộc hình thức thực hiện pháp luật nào".',
  vd: 'Anh A nộp thuế đúng hạn → thi hành. Anh A không buôn hàng cấm → tuân thủ. Anh A mở cửa hàng tạp hoá → sử dụng. Chi cục thuế ra quyết định phạt anh A → áp dụng.',
  bay: 'Sử dụng và thi hành hay bị lẫn. Cứ hỏi "không làm thì có bị phạt không" — bị phạt là THI HÀNH, không sao cả là SỬ DỤNG.',
  meo: 'Chỉ có hình thức ÁP DỤNG mới cần chủ thể là cơ quan nhà nước. Nhìn thấy toà án, công an, uỷ ban là khoanh ngay.' },

{ nhom: '⌨️ Casio', ten: 'Ba công thức kinh tế phải thuộc lòng', cap: 2,
  ct: '<b>GDP bình quân đầu người</b> = GDP / tổng số dân<br>'
    + '<b>Tốc độ tăng trưởng GDP</b> (%) = (GDP năm sau − GDP năm trước) / GDP năm trước × 100<br>'
    + '<b>Tỉ lệ lạm phát</b> (%) = (CPI năm sau − CPI năm trước) / CPI năm trước × 100<br>'
    + '<b>Lãi kép</b>: số tiền sau n kì = A(1 + r)<sup>n</sup>, với r là lãi suất mỗi kì<br>'
    + '<b>Thuế GTGT</b>: giá thanh toán = giá chưa thuế × (1 + thuế suất)<br>'
    + '<b>Thuế thu nhập cá nhân</b>: tính trên thu nhập TÍNH THUẾ = thu nhập chịu thuế − giảm trừ bản thân − giảm trừ người phụ thuộc − bảo hiểm bắt buộc.',
  khi: 'Câu Phần III của môn GDKT&PL, mỗi đề 4 – 6 câu.',
  vd: 'GDP tăng từ 400 lên 430 tỉ USD → tốc độ tăng trưởng = (430 − 400)/400 × 100 = 7,5%.',
  bay: 'Tăng trưởng luôn chia cho năm TRƯỚC chứ không chia năm sau. Thuế thu nhập cá nhân thì luỹ tiến từng bậc, không nhân thẳng một thuế suất cho cả thu nhập.',
  meo: 'Bấm liền một mạch trên máy rồi mới làm tròn ở bước cuối. Làm tròn giữa chừng là sai số dồn, lệch đáp án ở chữ số thập phân thứ hai.' }
]);

/* ---------------- SINH HỌC ---------------- */
themCam('sinh', [
{ nhom: '👁 Nhìn là biết', ten: 'Sáu công thức DNA – gen ra đáp án trong một dòng', cap: 1,
  ct: '<b>N = 2A + 2G</b> · <b>A = T</b>, <b>G = X</b> · <b>%A + %G = 50%</b><br>'
    + '<b>Chiều dài</b> L = (N/2) × 3,4 Å ⇒ N = 2L/3,4<br>'
    + '<b>Số liên kết hydrogen</b> H = 2A + 3G<br>'
    + '<b>Khối lượng</b> M = N × 300 đvC<br>'
    + '<b>Số chu kì xoắn</b> C = N/20<br>'
    + '<b>Số amino acid</b> chuỗi hoàn chỉnh = N/6 − 2 (trừ bộ ba kết thúc và amino acid mở đầu)<br>'
    + '<b>Nhân đôi k lần</b>: số phân tử con = 2<sup>k</sup>, số nucleotide môi trường cung cấp = N(2<sup>k</sup> − 1).',
  khi: 'Mọi bài tập phần Di truyền phân tử.',
  vd: 'Gen dài 4080 Å → N = 2 × 4080/3,4 = 2400 nu → C = 120 chu kì xoắn, M = 720 000 đvC.',
  bay: 'Chuỗi polypeptide SƠ KHAI trừ 1, chuỗi HOÀN CHỈNH trừ 2. Đọc kĩ chữ trong đề trước khi trừ.',
  meo: 'Từ một dữ kiện bất kì (L, M, C, H) đều quy được về N. Cứ đưa hết về N rồi mới tính tiếp, đỡ phải nhớ nhiều đường.' },

{ nhom: '👁 Nhìn là biết', ten: 'Nhìn tỉ lệ kiểu hình đoán ngay quy luật di truyền', cap: 3,
  ct: 'Với phép lai hai cặp tính trạng, F1 dị hợp tự thụ:<br>'
    + '· <b>9 : 3 : 3 : 1</b> → phân li độc lập, trội hoàn toàn<br>'
    + '· <b>9 : 6 : 1</b> hoặc <b>9 : 7</b> hoặc <b>13 : 3</b> hoặc <b>12 : 3 : 1</b> → tương tác gen<br>'
    + '· <b>1 : 2 : 1</b> hoặc <b>3 : 1</b> (mà lẽ ra phải 9:3:3:1) → liên kết gen HOÀN TOÀN<br>'
    + '· Tỉ lệ lẻ, không rút gọn được về các bộ trên → <b>hoán vị gen</b>, phải tính tần số<br>'
    + '· Kết quả <b>khác nhau ở hai giới</b> → gen nằm trên nhiễm sắc thể giới tính<br>'
    + '· Đời con <b>giống hệt mẹ</b> ở mọi phép lai thuận nghịch → di truyền ngoài nhân.',
  khi: 'Câu quy luật di truyền, cả Phần I lẫn Phần II.',
  vd: 'F2 cho 1 : 2 : 1 ở phép lai hai cặp tính trạng → liên kết gen hoàn toàn, kiểu gen F1 là dị hợp tử đều hoặc chéo.',
  bay: 'Tổng của tỉ lệ luôn là 16 phần (hoặc bội của 16) khi phân li độc lập hai cặp gen. Tổng ra 4 phần là dấu hiệu của liên kết gen.',
  meo: 'Cộng các số trong tỉ lệ lại xem có bằng 16 không — đó là câu hỏi đầu tiên nên đặt ra, tách được ngay nhóm phân li độc lập với nhóm liên kết.' },

{ nhom: '⌨️ Casio', ten: 'Quần thể cân bằng: kiểm tra và tính trong 20 giây', cap: 2,
  ct: 'Cấu trúc cân bằng theo Hardy – Weinberg: <b>p²AA + 2pqAa + q²aa = 1</b> với p + q = 1.<br>'
    + '<b>Cách kiểm tra nhanh</b>: quần thể cân bằng khi và chỉ khi (2pq/2)² = p² × q², tức là '
    + '<b>(tần số Aa / 2)² = tần số AA × tần số aa</b>. Bấm hai vế trên máy, bằng nhau là cân bằng.<br>'
    + '<b>Tính tần số allele</b>: p = tần số AA + (tần số Aa)/2 · q = tần số aa + (tần số Aa)/2.<br>'
    + 'Biết tỉ lệ kiểu hình lặn thì q = √(tần số aa), rồi p = 1 − q.',
  khi: 'Câu di truyền quần thể, gần như đề nào cũng có một câu.',
  vd: 'Quần thể 0,36AA : 0,48Aa : 0,16aa → (0,48/2)² = 0,0576 và 0,36 × 0,16 = 0,0576, bằng nhau nên quần thể cân bằng, p = 0,6.',
  bay: 'Chỉ QUẦN THỂ NGẪU PHỐI mới đạt cân bằng. Quần thể tự thụ phấn qua các thế hệ thì tỉ lệ dị hợp giảm một nửa mỗi thế hệ, không bao giờ cân bằng.',
  meo: 'Đề cho tỉ lệ cây hoa trắng (lặn) là 16% thì q = √0,16 = 0,4 ngay, không cần lập hệ. Căn bậc hai của tỉ lệ lặn là đường tắt nhanh nhất.' }
]);

/* ============================================================
   ⑥ TÀNG KINH CÁC — THẺ CHO CHỦ ĐỀ SỬ MỚI BỔ SUNG
   Chủ đề nào cũng phải có thẻ tra cứu, không thì học sinh gặp câu
   hỏi mà không biết mở đâu ra đọc.
   ============================================================ */
TD.KHO.su_ct = (TD.KHO.su_ct || []).concat([
{ nhom: 'A. Thế giới', ten: 'Chủ nghĩa xã hội từ 1917 đến nay', cd: CD, cap: 2,
  ct: '<b>Ra đời:</b> Cách mạng tháng Mười Nga (1917) lập Nhà nước Xô viết — nhà nước xã hội chủ nghĩa đầu tiên. '
    + '<b>Liên Xô thành lập 12/1922</b> trên cơ sở liên hiệp bốn nước cộng hoà Xô viết đầu tiên.<br>'
    + '<b>Mở rộng thành hệ thống:</b> 1945 – 1949 các nước dân chủ nhân dân Đông Âu ra đời · '
    + '<b>1/10/1949</b> nước Cộng hoà Nhân dân Trung Hoa thành lập, nối chủ nghĩa xã hội từ châu Âu sang châu Á · '
    + '<b>1/1/1959</b> cách mạng Cuba thắng lợi, mở sang Mỹ Latinh.<br>'
    + '<b>Liên kết:</b> <b>SEV (1949)</b> về kinh tế và <b>Tổ chức Hiệp ước Vác-sa-va (1955)</b> về quân sự.<br>'
    + '<b>Thành tựu Liên Xô:</b> cường quốc công nghiệp <b>thứ hai thế giới</b> · <b>1957</b> phóng vệ tinh nhân tạo đầu tiên · '
    + '<b>1961</b> Ga-ga-rin bay vòng quanh Trái Đất · là chỗ dựa của phong trào giải phóng dân tộc.<br>'
    + '<b>Khủng hoảng và sụp đổ:</b> Đông Âu 1989 – 1991, <b>Liên Xô tan rã 25/12/1991</b>.<br>'
    + '<b>Từ 1991 đến nay:</b> Trung Quốc (cải cách mở cửa từ <b>1978</b>), Việt Nam (Đổi mới từ <b>1986</b>), Lào, Cuba tiếp tục con đường xã hội chủ nghĩa.',
  khi: 'Chủ đề 2 của Lịch sử 12, ra đều ở cả Phần I và Phần II.',
  vd: 'Hỏi "sự kiện nào đánh dấu chủ nghĩa xã hội vượt khỏi phạm vi một nước, trở thành hệ thống thế giới" → '
    + 'sự ra đời các nước dân chủ nhân dân Đông Âu (1945 – 1949) và nước Cộng hoà Nhân dân Trung Hoa (1949).',
  bay: '<b>1922</b> là năm thành lập Liên Xô, không phải 1917 — 1917 chỉ mới là Nhà nước Xô viết ở Nga. '
    + 'Và Liên Xô đứng <b>thứ hai</b> thế giới về công nghiệp chứ không phải thứ nhất.' },

{ nhom: 'A. Thế giới', ten: 'Vì sao Liên Xô sụp đổ mà Trung Quốc, Việt Nam thì không', cd: CD, cap: 3,
  ct: '<b>Nguyên nhân sụp đổ ở Liên Xô và Đông Âu</b><br>'
    + '· <b>Sâu xa:</b> duy trì quá lâu mô hình kinh tế kế hoạch hoá tập trung, quan liêu bao cấp; chậm sửa chữa khuyết tật khi thế giới bước vào cách mạng khoa học – kĩ thuật.<br>'
    + '· <b>Trực tiếp:</b> đường lối cải tổ (từ 1985) mắc sai lầm — chuyển trọng tâm sang cải cách chính trị, xa rời nguyên tắc, làm mất vai trò lãnh đạo của Đảng.<br>'
    + '· <b>Khách quan:</b> sự chống phá của các thế lực thù địch bên ngoài.<br>'
    + '<b>Vì sao Trung Quốc và Việt Nam vượt qua được</b><br>'
    + '· Lấy <b>phát triển kinh tế làm trọng tâm</b>, đổi mới chính trị thận trọng và từng bước.<br>'
    + '· <b>Kiên trì giữ vững vai trò lãnh đạo của Đảng Cộng sản</b> và định hướng xã hội chủ nghĩa.<br>'
    + '· Mở cửa hội nhập nhưng giữ độc lập tự chủ.',
  khi: 'Câu vận dụng và vận dụng cao dạng so sánh, rút bài học.',
  vd: 'Hỏi "bài học Việt Nam rút ra từ sự sụp đổ của Liên Xô" → đổi mới kinh tế phải đi đôi với giữ vững ổn định chính trị và sự lãnh đạo của Đảng.',
  bay: 'Sự sụp đổ năm 1991 là sụp đổ của một <b>mô hình</b> chủ nghĩa xã hội cụ thể, không phải sự phá sản của con đường xã hội chủ nghĩa. '
    + 'Phương án nào nói "chủ nghĩa xã hội chấm dứt tồn tại" là sai.' }
]);

})();
