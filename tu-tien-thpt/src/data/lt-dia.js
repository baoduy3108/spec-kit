/* ============================================================
   ĐỊA LÍ — KHO MỆNH ĐỀ TRỌNG ĐIỂM (Tà Đạo)
   Bám Địa lí 12 CT GDPT 2018 (có phần lớp 10, 11).
   ============================================================ */
window.TD = window.TD || {}; TD.KHO_LT = TD.KHO_LT || {};

TD.KHO_LT.dia = [
/* ========== VỊ TRÍ ĐỊA LÍ ========== */
{ cd: 'Vị trí địa lí', m: 1, a: true,  t: 'Lãnh thổ Việt Nam nằm hoàn toàn trong vùng nội chí tuyến bán cầu Bắc.', v: 'Từ 8°34′B đến 23°23′B, nên thiên nhiên mang tính chất nhiệt đới.' },
{ cd: 'Vị trí địa lí', m: 1, a: false, t: 'Một phần lãnh thổ Việt Nam nằm trong vùng ôn đới bán cầu Bắc.', v: 'Toàn bộ lãnh thổ nằm trong vùng NỘI CHÍ TUYẾN, không có phần nào thuộc ôn đới.' },
{ cd: 'Vị trí địa lí', m: 2, a: true,  t: 'Việt Nam nằm ở múi giờ số 7.', v: 'Giờ Việt Nam sớm hơn giờ GMT 7 tiếng.' },
{ cd: 'Vị trí địa lí', m: 2, a: true,  t: 'Nhờ giáp Biển Đông nên thiên nhiên Việt Nam xanh tốt quanh năm, khác hẳn các nước cùng vĩ độ ở Tây Á và Bắc Phi.', v: 'Biển Đông cung cấp lượng ẩm lớn, làm dịu tính khắc nghiệt của khí hậu.' },
{ cd: 'Vị trí địa lí', m: 2, a: false, t: 'Việt Nam có khí hậu hoang mạc giống các nước cùng vĩ độ ở Bắc Phi.', v: 'Nhờ Biển Đông và gió mùa nên nước ta có khí hậu nhiệt đới ẩm gió mùa, không hoang mạc.' },
{ cd: 'Vị trí địa lí', m: 2, a: true,  t: 'Vị trí nằm ở nơi giao thoa của nhiều luồng sinh vật khiến tài nguyên sinh vật nước ta rất phong phú.', v: 'Luồng từ Hoa Nam, Ấn Độ – Myanmar và Malaysia – Indonesia.' },
{ cd: 'Vị trí địa lí', m: 2, a: true,  t: 'Vị trí địa lí khiến nước ta chịu nhiều thiên tai như bão, lũ lụt, hạn hán.', v: 'Đây là mặt hạn chế bên cạnh những thuận lợi to lớn.' },
{ cd: 'Vị trí địa lí', m: 2, a: true,  t: 'Phần đất liền nước ta có diện tích khoảng 331 nghìn km².', v: 'Kéo dài trên nhiều vĩ độ nên thiên nhiên phân hoá rõ theo chiều Bắc – Nam.' },

/* ========== THIÊN NHIÊN NHIỆT ĐỚI ẨM GIÓ MÙA ========== */
{ cd: 'Khí hậu', m: 2, a: true,  t: 'Gió mùa Đông Bắc thổi từ áp cao Siberia gây ra mùa đông lạnh ở miền Bắc nước ta.', v: 'Nửa đầu mùa đông lạnh khô, nửa sau lạnh ẩm có mưa phùn.' },
{ cd: 'Khí hậu', m: 2, a: true,  t: 'Ảnh hưởng của gió mùa Đông Bắc giảm dần khi đi từ Bắc vào Nam.', v: 'Đến dãy Bạch Mã thì gió mùa Đông Bắc gần như bị chặn lại hoàn toàn.' },
{ cd: 'Khí hậu', m: 2, a: false, t: 'Gió mùa Đông Bắc gây ra mùa đông lạnh trên toàn bộ lãnh thổ Việt Nam.', v: 'Chỉ ảnh hưởng rõ ở miền Bắc; càng vào Nam càng suy yếu và bị chặn bởi dãy Bạch Mã.' },
{ cd: 'Khí hậu', m: 3, a: true,  t: 'Gió phơn Tây Nam khô nóng ở Bắc Trung Bộ hình thành do khối khí từ vịnh Bengal vượt dãy Trường Sơn.', v: 'Khối khí trút hết mưa ở sườn tây rồi biến tính khô nóng khi xuống sườn đông.' },
{ cd: 'Khí hậu', m: 3, a: false, t: 'Gió Lào khô nóng ở Bắc Trung Bộ có nguồn gốc là khối khí lạnh từ phương Bắc.', v: 'Gió Lào là gió TÂY NAM từ vịnh Bengal, khô nóng do hiệu ứng phơn khi vượt Trường Sơn.' },
{ cd: 'Khí hậu', m: 2, a: true,  t: 'Nước ta có lượng mưa trung bình năm khoảng 1500–2000 mm và độ ẩm không khí trên 80%.', v: 'Cân bằng ẩm luôn dương.' },
{ cd: 'Khí hậu', m: 3, a: true,  t: 'Tính chất nhiệt đới ẩm gió mùa của khí hậu làm cho quá trình xâm thực ở miền núi và bồi tụ ở đồng bằng diễn ra mạnh mẽ.', v: 'Đó là biểu hiện của địa hình vùng nhiệt đới ẩm gió mùa.' },
{ cd: 'Khí hậu', m: 2, a: true,  t: 'Sông ngòi nước ta nhiều nước, giàu phù sa và có chế độ nước theo mùa.', v: 'Hệ quả trực tiếp của khí hậu nhiệt đới ẩm gió mùa với mùa mưa – mùa khô rõ rệt.' },
{ cd: 'Khí hậu', m: 2, a: true,  t: 'Đất feralit là loại đất chủ yếu ở vùng đồi núi nước ta.', v: 'Do quá trình phong hoá mạnh trong điều kiện nhiệt ẩm cao.' },
{ cd: 'Khí hậu', m: 2, a: false, t: 'Đất phù sa là loại đất chiếm diện tích lớn nhất ở nước ta.', v: 'Đất FERALIT ở vùng đồi núi mới chiếm diện tích lớn nhất, vì 3/4 lãnh thổ là đồi núi.' },

/* ========== PHÂN HOÁ THIÊN NHIÊN ========== */
{ cd: 'Phân hoá thiên nhiên', m: 2, a: true,  t: 'Dãy Bạch Mã là ranh giới phân chia hai miền khí hậu Bắc và Nam nước ta.', v: 'Nằm khoảng vĩ tuyến 16°B, chặn gió mùa Đông Bắc.' },
{ cd: 'Phân hoá thiên nhiên', m: 2, a: true,  t: 'Phần lãnh thổ phía Nam có khí hậu cận xích đạo gió mùa với hai mùa mưa – khô rõ rệt.', v: 'Nền nhiệt cao quanh năm, biên độ nhiệt năm nhỏ.' },
{ cd: 'Phân hoá thiên nhiên', m: 2, a: false, t: 'Phần lãnh thổ phía Nam nước ta có biên độ nhiệt năm lớn hơn phần lãnh thổ phía Bắc.', v: 'Ngược lại — miền Nam nóng đều quanh năm nên biên độ nhiệt NHỎ hơn nhiều.' },
{ cd: 'Phân hoá thiên nhiên', m: 3, a: true,  t: 'Đai ôn đới gió mùa trên núi ở nước ta chỉ xuất hiện ở vùng núi Hoàng Liên Sơn từ độ cao 2600 m trở lên.', v: 'Đây là nơi duy nhất ở Việt Nam có đai này, do Fansipan cao 3143 m.' },
{ cd: 'Phân hoá thiên nhiên', m: 3, a: false, t: 'Đai ôn đới gió mùa trên núi xuất hiện ở nhiều vùng núi cao trên cả nước.', v: 'CHỈ có ở Hoàng Liên Sơn, vì chỉ nơi này mới đủ độ cao trên 2600 m.' },
{ cd: 'Phân hoá thiên nhiên', m: 2, a: true,  t: 'Thiên nhiên nước ta phân hoá theo ba chiều: Bắc – Nam, Đông – Tây và theo độ cao.', v: 'Tạo nên sự đa dạng của cảnh quan và tài nguyên.' },
{ cd: 'Phân hoá thiên nhiên', m: 2, a: true,  t: 'Đồi núi chiếm khoảng ba phần tư diện tích lãnh thổ nước ta nhưng chủ yếu là đồi núi thấp.', v: 'Địa hình dưới 1000 m chiếm khoảng 85% diện tích.' },
{ cd: 'Phân hoá thiên nhiên', m: 2, a: false, t: 'Địa hình núi cao trên 2000 m chiếm phần lớn diện tích đồi núi nước ta.', v: 'Núi cao trên 2000 m chỉ chiếm khoảng 1%. Chủ yếu là đồi núi THẤP dưới 1000 m.' },

/* ========== DÂN CƯ ========== */
{ cd: 'Dân cư', m: 2, a: true,  t: 'Dân cư nước ta phân bố không đều, tập trung đông ở đồng bằng và thưa thớt ở miền núi.', v: 'Đồng bằng sông Hồng có mật độ cao nhất cả nước.' },
{ cd: 'Dân cư', m: 2, a: false, t: 'Dân cư nước ta phân bố khá đồng đều giữa đồng bằng và miền núi.', v: 'Phân bố rất KHÔNG ĐỀU — đồng bằng chiếm 1/4 diện tích nhưng tập trung khoảng 3/4 dân số.' },
{ cd: 'Dân cư', m: 2, a: true,  t: 'Nước ta đang trong thời kì cơ cấu dân số vàng nhưng đồng thời cũng đang già hoá dân số.', v: 'Hai xu hướng này diễn ra đồng thời, vừa là cơ hội vừa là thách thức.' },
{ cd: 'Dân cư', m: 2, a: true,  t: 'Hạn chế lớn nhất của nguồn lao động nước ta là trình độ chuyên môn kĩ thuật còn thấp.', v: 'Tỉ lệ lao động qua đào tạo còn khiêm tốn so với các nước trong khu vực.' },
{ cd: 'Dân cư', m: 2, a: true,  t: 'Cơ cấu lao động nước ta đang chuyển dịch theo hướng giảm tỉ trọng khu vực nông – lâm – thuỷ sản.', v: 'Đồng thời tăng tỉ trọng công nghiệp – xây dựng và dịch vụ.' },
{ cd: 'Dân cư', m: 2, a: true,  t: 'Việt Nam có 54 dân tộc, trong đó dân tộc Kinh chiếm tỉ lệ lớn nhất.', v: 'Các dân tộc ít người chủ yếu cư trú ở miền núi và trung du.' },
{ cd: 'Dân cư', m: 3, a: true,  t: 'Tỉ lệ dân thành thị nước ta đang tăng nhưng vẫn còn thấp so với mức trung bình của khu vực.', v: 'Đô thị hoá gắn liền với quá trình công nghiệp hoá.' },

/* ========== CÁC VÙNG KINH TẾ ========== */
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Trung du và miền núi Bắc Bộ là vùng giàu tài nguyên khoáng sản nhất cả nước.', v: 'Có than, sắt, thiếc, apatit, đồng, chì – kẽm và tiềm năng thuỷ điện lớn.' },
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Trung du và miền núi Bắc Bộ có thế mạnh về cây công nghiệp cận nhiệt và ôn đới, tiêu biểu là cây chè.', v: 'Nhờ khí hậu có mùa đông lạnh và đất feralit trên đá phiến, đá vôi.' },
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Đồng bằng sông Hồng có mật độ dân số cao nhất cả nước.', v: 'Kéo theo sức ép lớn về việc làm, đất đai và môi trường.' },
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Bắc Trung Bộ có thế mạnh về cơ cấu kinh tế nông – lâm – ngư kết hợp nhờ lãnh thổ hẹp ngang, kéo dài.', v: 'Từ tây sang đông đều có núi, đồi, đồng bằng và biển.' },
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Duyên hải Nam Trung Bộ có thế mạnh nổi bật về kinh tế biển với nghề cá, làm muối và du lịch biển.', v: 'Vùng biển sâu, nhiều vũng vịnh kín thuận lợi xây cảng nước sâu.' },
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Tây Nguyên là vùng duy nhất của nước ta không giáp biển.', v: 'Do đó vùng không có thế mạnh về kinh tế biển.' },
{ cd: 'Vùng kinh tế', m: 2, a: false, t: 'Tây Nguyên có thế mạnh nổi bật về kinh tế biển và đánh bắt thuỷ sản.', v: 'Tây Nguyên là vùng DUY NHẤT không giáp biển nên không có thế mạnh này.' },
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Tây Nguyên có diện tích đất badan lớn nhất cả nước, thuận lợi phát triển cây công nghiệp lâu năm.', v: 'Cà phê là cây trồng chủ lực, đứng đầu cả nước về diện tích và sản lượng.' },
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Khó khăn lớn nhất của Tây Nguyên là thiếu nước nghiêm trọng vào mùa khô.', v: 'Mùa khô kéo dài 4–5 tháng, mực nước ngầm hạ thấp.' },
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Đông Nam Bộ là vùng có nền kinh tế phát triển nhất cả nước và thu hút vốn đầu tư nước ngoài lớn nhất.', v: 'Dẫn đầu về công nghiệp, dịch vụ và khai thác dầu khí.' },
{ cd: 'Vùng kinh tế', m: 2, a: false, t: 'Đồng bằng sông Cửu Long là vùng dẫn đầu cả nước về giá trị sản xuất công nghiệp.', v: 'Dẫn đầu công nghiệp là ĐÔNG NAM BỘ. ĐBSCL dẫn đầu về nông nghiệp và thuỷ sản.' },
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Đồng bằng sông Cửu Long là vựa lúa và vựa thuỷ sản lớn nhất cả nước.', v: 'Nhờ đất phù sa màu mỡ, mạng lưới sông ngòi kênh rạch dày đặc và khí hậu cận xích đạo ổn định.' },
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Khó khăn lớn nhất của Đồng bằng sông Cửu Long hiện nay là xâm nhập mặn và tác động của biến đổi khí hậu.', v: 'Cùng với diện tích đất phèn, đất mặn lớn và mùa khô thiếu nước ngọt.' },
{ cd: 'Vùng kinh tế', m: 3, a: false, t: 'Đồng bằng sông Cửu Long có diện tích đất phù sa ngọt chiếm phần lớn diện tích vùng.', v: 'Đất phèn và đất mặn chiếm diện tích LỚN HƠN đất phù sa ngọt.' },

/* ========== KỸ NĂNG BIỂU ĐỒ – SỐ LIỆU ========== */
{ cd: 'Kỹ năng', m: 2, a: true,  t: 'Khi đề yêu cầu thể hiện cơ cấu với bốn năm trở lên, biểu đồ thích hợp nhất là biểu đồ miền.', v: 'Biểu đồ tròn chỉ dùng khi có một đến ba mốc thời gian.' },
{ cd: 'Kỹ năng', m: 2, a: false, t: 'Khi đề yêu cầu thể hiện cơ cấu qua nhiều năm, biểu đồ thích hợp nhất là biểu đồ tròn.', v: 'Nhiều năm (từ 4 trở lên) thì phải dùng biểu đồ MIỀN.' },
{ cd: 'Kỹ năng', m: 2, a: true,  t: 'Khi đề yêu cầu thể hiện tốc độ tăng trưởng, biểu đồ thích hợp nhất là biểu đồ đường.', v: 'Phải xử lí số liệu về đơn vị phần trăm, lấy năm gốc bằng 100%.' },
{ cd: 'Kỹ năng', m: 2, a: true,  t: 'Khi bảng số liệu có hai đơn vị khác nhau, biểu đồ thích hợp là biểu đồ kết hợp cột và đường.', v: 'Mỗi trục tung biểu diễn một đơn vị.' },
{ cd: 'Kỹ năng', m: 2, a: true,  t: 'Công thức tính tốc độ tăng trưởng là lấy giá trị năm cần tính chia cho giá trị năm gốc rồi nhân 100.', v: 'Năm gốc luôn được quy về 100%.' },
{ cd: 'Kỹ năng', m: 2, a: true,  t: 'Năng suất cây trồng được tính bằng sản lượng chia cho diện tích gieo trồng.', v: 'Đơn vị thường dùng cho lúa là tạ/ha.' },
{ cd: 'Kỹ năng', m: 2, a: false, t: 'Năng suất cây trồng được tính bằng diện tích gieo trồng chia cho sản lượng.', v: 'Ngược — là SẢN LƯỢNG chia cho DIỆN TÍCH.' },
{ cd: 'Kỹ năng', m: 2, a: true,  t: 'Mật độ dân số được tính bằng số dân chia cho diện tích, đơn vị người trên kilômét vuông.', v: 'Là chỉ tiêu phản ánh mức độ tập trung dân cư.' },
{ cd: 'Kỹ năng', m: 3, a: true,  t: 'Tỉ trọng của một thành phần được tính bằng giá trị thành phần chia cho tổng rồi nhân 100.', v: 'Tổng các tỉ trọng trong một cơ cấu luôn bằng 100%.' },

/* ========== NGÀNH KINH TẾ ========== */
{ cd: 'Ngành kinh tế', m: 2, a: true,  t: 'Cơ cấu ngành kinh tế nước ta đang chuyển dịch theo hướng giảm tỉ trọng nông – lâm – thuỷ sản, tăng tỉ trọng công nghiệp – xây dựng và dịch vụ.', v: 'Phù hợp với yêu cầu công nghiệp hoá, hiện đại hoá đất nước.' },
{ cd: 'Ngành kinh tế', m: 2, a: true,  t: 'Ngành thuỷ sản nước ta phát triển mạnh cả về khai thác lẫn nuôi trồng, trong đó nuôi trồng ngày càng chiếm tỉ trọng cao.', v: 'Đồng bằng sông Cửu Long dẫn đầu cả nước.' },
{ cd: 'Ngành kinh tế', m: 2, a: true,  t: 'Công nghiệp khai thác dầu khí của nước ta tập trung chủ yếu ở thềm lục địa phía Nam.', v: 'Các mỏ lớn nằm ngoài khơi Bà Rịa – Vũng Tàu thuộc vùng Đông Nam Bộ.' },
{ cd: 'Ngành kinh tế', m: 2, a: false, t: 'Công nghiệp khai thác than của nước ta tập trung chủ yếu ở Tây Nguyên.', v: 'Than tập trung ở QUẢNG NINH thuộc Trung du và miền núi Bắc Bộ. Tây Nguyên có bôxit.' },
{ cd: 'Ngành kinh tế', m: 2, a: true,  t: 'Tây Nguyên là vùng có trữ lượng bôxit lớn nhất cả nước.', v: 'Là cơ sở để phát triển công nghiệp khai thác và chế biến alumin, nhôm.' },
{ cd: 'Ngành kinh tế', m: 2, a: true,  t: 'Giao thông vận tải đường biển của nước ta có vai trò quan trọng trong vận chuyển hàng hoá xuất nhập khẩu.', v: 'Nhờ đường bờ biển dài và nhiều cảng nước sâu.' },
{ cd: 'Ngành kinh tế', m: 2, a: true,  t: 'Du lịch nước ta có tài nguyên phong phú gồm cả tài nguyên tự nhiên và tài nguyên nhân văn.', v: 'Nhiều di sản được UNESCO công nhận như vịnh Hạ Long, phố cổ Hội An, quần thể Tràng An.' },
{ cd: 'Ngành kinh tế', m: 3, a: true,  t: 'Việc phát triển kinh tế phải đi đôi với sử dụng hợp lí tài nguyên và bảo vệ môi trường.', v: 'Đó là yêu cầu của phát triển bền vững.' }
];

TD.KHO_LT.dia.push(
{ cd: 'Vị trí địa lí', m: 2, a: false, t: 'Việt Nam nằm ở múi giờ số 8 nên cùng giờ với Trung Quốc.', v: 'Việt Nam thuộc múi giờ số 7, sớm hơn GMT 7 tiếng.' },
{ cd: 'Vị trí địa lí', m: 2, a: false, t: 'Điểm cực Bắc phần đất liền nước ta thuộc tỉnh Cao Bằng.', v: 'Điểm cực Bắc ở Lũng Cú thuộc tỉnh HÀ GIANG.' },
{ cd: 'Vị trí địa lí', m: 2, a: true,  t: 'Điểm cực Nam phần đất liền nước ta ở Đất Mũi, tỉnh Cà Mau.', v: 'Vĩ độ khoảng 8°34′B.' },
{ cd: 'Vị trí địa lí', m: 2, a: false, t: 'Vùng biển nước ta không tiếp giáp với vùng biển của quốc gia nào khác.', v: 'Vùng biển nước ta tiếp giáp với vùng biển của nhiều nước như Trung Quốc, Philippines, Malaysia, Indonesia, Thái Lan, Campuchia.' },
{ cd: 'Vị trí địa lí', m: 3, a: true,  t: 'Vị trí nằm gần trung tâm Đông Nam Á tạo thuận lợi cho nước ta giao lưu kinh tế với các nước trong khu vực.', v: 'Nằm trên các tuyến đường biển và đường hàng không quốc tế quan trọng.' },

{ cd: 'Khí hậu', m: 2, a: false, t: 'Miền Nam nước ta có bốn mùa xuân, hạ, thu, đông rõ rệt.', v: 'Miền Nam chỉ có hai mùa MƯA và KHÔ. Miền Bắc mới có bốn mùa tương đối rõ.' },
{ cd: 'Khí hậu', m: 2, a: false, t: 'Nhiệt độ trung bình năm của nước ta dưới 20 °C.', v: 'Trên 20 °C ở hầu khắp cả nước, đúng chuẩn khí hậu nhiệt đới.' },
{ cd: 'Khí hậu', m: 2, a: true,  t: 'Nước ta chịu ảnh hưởng của bão nhiều nhất vào các tháng mùa hạ và đầu mùa thu.', v: 'Mùa bão chậm dần từ Bắc vào Nam.' },
{ cd: 'Khí hậu', m: 2, a: true,  t: 'Tín phong bán cầu Bắc hoạt động quanh năm ở nước ta nhưng bị gió mùa lấn át.', v: 'Tín phong chỉ mạnh lên vào thời kì chuyển tiếp giữa hai mùa gió.' },
{ cd: 'Khí hậu', m: 3, a: true,  t: 'Mưa vào thu đông là đặc điểm nổi bật của khí hậu vùng Duyên hải miền Trung.', v: 'Do địa hình chắn gió kết hợp với dải hội tụ nhiệt đới và bão.' },
{ cd: 'Khí hậu', m: 2, a: false, t: 'Cả nước ta đều có lượng mưa lớn nhất vào các tháng đầu mùa hạ.', v: 'Duyên hải miền Trung có mưa cực đại vào THU ĐÔNG, khác hẳn các vùng còn lại.' },

{ cd: 'Phân hoá thiên nhiên', m: 2, a: false, t: 'Đồng bằng chiếm khoảng ba phần tư diện tích lãnh thổ nước ta.', v: 'ĐỒI NÚI chiếm 3/4. Đồng bằng chỉ chiếm khoảng 1/4 diện tích.' },
{ cd: 'Phân hoá thiên nhiên', m: 2, a: true,  t: 'Hướng nghiêng chung của địa hình nước ta là tây bắc – đông nam.', v: 'Thể hiện qua hướng chảy của phần lớn các sông lớn.' },
{ cd: 'Phân hoá thiên nhiên', m: 2, a: true,  t: 'Hai hướng núi chính của nước ta là tây bắc – đông nam và vòng cung.', v: 'Hướng vòng cung tiêu biểu ở vùng Đông Bắc và Trường Sơn Nam.' },
{ cd: 'Phân hoá thiên nhiên', m: 2, a: false, t: 'Đồng bằng sông Hồng có diện tích lớn hơn Đồng bằng sông Cửu Long.', v: 'ĐBSCL rộng khoảng 40 nghìn km², lớn hơn ĐBSH khoảng 15 nghìn km².' },
{ cd: 'Phân hoá thiên nhiên', m: 2, a: true,  t: 'Đồng bằng sông Hồng có hệ thống đê điều ngăn lũ nên trong đê không còn được bồi phù sa hằng năm.', v: 'Khác với ĐBSCL không có hệ thống đê bao lớn nên vẫn được bồi tự nhiên.' },
{ cd: 'Phân hoá thiên nhiên', m: 2, a: true,  t: 'Thiên nhiên vùng biển và thềm lục địa, vùng đồng bằng ven biển và vùng đồi núi thể hiện sự phân hoá theo chiều Đông – Tây.', v: 'Ba dải này có quan hệ chặt chẽ với nhau.' },

{ cd: 'Dân cư', m: 2, a: false, t: 'Nước ta có 63 dân tộc cùng sinh sống.', v: 'Việt Nam có 54 dân tộc. 63 là số đơn vị hành chính cấp tỉnh trước đây.' },
{ cd: 'Dân cư', m: 2, a: false, t: 'Tỉ lệ gia tăng dân số tự nhiên của nước ta hiện nay vẫn ở mức rất cao trên 2%.', v: 'Đã giảm mạnh xuống khoảng 1% nhờ chính sách dân số.' },
{ cd: 'Dân cư', m: 2, a: true,  t: 'Quá trình đô thị hoá ở nước ta diễn ra chưa tương xứng với trình độ công nghiệp hoá.', v: 'Dẫn tới nhiều vấn đề về hạ tầng, việc làm và môi trường đô thị.' },
{ cd: 'Dân cư', m: 3, a: true,  t: 'Giải pháp quan trọng cho tình trạng phân bố dân cư chưa hợp lí là phân bố lại dân cư và lao động giữa các vùng.', v: 'Kết hợp với phát triển kinh tế ở vùng thưa dân.' },
{ cd: 'Dân cư', m: 2, a: false, t: 'Lao động nước ta chủ yếu tập trung trong khu vực dịch vụ.', v: 'Tỉ trọng khu vực nông – lâm – thuỷ sản tuy giảm nhưng vẫn còn lớn; cơ cấu đang chuyển dịch dần.' },

{ cd: 'Vùng kinh tế', m: 2, a: false, t: 'Trung du và miền núi Bắc Bộ là vùng có mật độ dân số cao nhất cả nước.', v: 'Đây là vùng thưa dân. ĐỒNG BẰNG SÔNG HỒNG mới có mật độ cao nhất.' },
{ cd: 'Vùng kinh tế', m: 2, a: false, t: 'Cây chè được trồng nhiều nhất ở Tây Nguyên.', v: 'Chè trồng nhiều nhất ở TRUNG DU VÀ MIỀN NÚI BẮC BỘ. Tây Nguyên nổi bật với cà phê.' },
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Tây Nguyên đứng đầu cả nước về diện tích và sản lượng cà phê.', v: 'Đắk Lắk là tỉnh trọng điểm.' },
{ cd: 'Vùng kinh tế', m: 2, a: false, t: 'Đồng bằng sông Hồng là vùng có diện tích trồng lúa lớn nhất cả nước.', v: 'ĐỒNG BẰNG SÔNG CỬU LONG mới đứng đầu về cả diện tích lẫn sản lượng lúa.' },
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Thế mạnh nổi bật của Đồng bằng sông Hồng là nguồn lao động dồi dào có trình độ và cơ sở hạ tầng tốt.', v: 'Có thủ đô Hà Nội là trung tâm chính trị, kinh tế, văn hoá.' },
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Bắc Trung Bộ là vùng chịu nhiều thiên tai nhất cả nước.', v: 'Bão, lũ lụt, gió phơn khô nóng, cát bay cát chảy.' },
{ cd: 'Vùng kinh tế', m: 3, a: true,  t: 'Việc phát triển thuỷ điện ở Tây Nguyên vừa cung cấp điện vừa cung cấp nước tưới cho mùa khô.', v: 'Đồng thời phát triển nuôi trồng thuỷ sản và du lịch.' },
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Đông Nam Bộ dẫn đầu cả nước về diện tích và sản lượng cao su.', v: 'Nhờ đất xám và đất badan cùng khí hậu cận xích đạo ổn định.' },
{ cd: 'Vùng kinh tế', m: 2, a: false, t: 'Duyên hải Nam Trung Bộ có diện tích đồng bằng lớn nhất cả nước.', v: 'Đồng bằng ở đây NHỎ HẸP, bị chia cắt bởi các dãy núi đâm ngang ra biển.' },
{ cd: 'Vùng kinh tế', m: 2, a: true,  t: 'Nghề làm muối phát triển mạnh ở Duyên hải Nam Trung Bộ nhờ nắng nhiều, ít mưa và nước biển có độ mặn cao.', v: 'Tiêu biểu là Cà Ná và Sa Huỳnh.' },
{ cd: 'Vùng kinh tế', m: 3, a: true,  t: 'Vấn đề lương thực của Đồng bằng sông Cửu Long gắn chặt với việc cải tạo đất phèn, đất mặn và chủ động nguồn nước ngọt.', v: 'Cùng với thích ứng biến đổi khí hậu và nước biển dâng.' },

{ cd: 'Kỹ năng', m: 2, a: false, t: 'Biểu đồ cột là biểu đồ thích hợp nhất để thể hiện cơ cấu qua nhiều năm.', v: 'Cột dùng để so sánh độ lớn. Thể hiện cơ cấu nhiều năm phải dùng biểu đồ MIỀN.' },
{ cd: 'Kỹ năng', m: 2, a: false, t: 'Tổng các tỉ trọng trong một cơ cấu có thể lớn hơn 100%.', v: 'Tổng luôn bằng đúng 100%.' },
{ cd: 'Kỹ năng', m: 2, a: true,  t: 'Bình quân lương thực đầu người được tính bằng sản lượng lương thực chia cho tổng số dân.', v: 'Đơn vị thường là kg/người.' },
{ cd: 'Kỹ năng', m: 2, a: true,  t: 'Khi nhận xét bảng số liệu, cần nêu được xu hướng chung trước rồi mới đi vào chi tiết và dẫn chứng số liệu.', v: 'Tránh liệt kê lại số liệu mà không rút ra nhận xét.' },
{ cd: 'Kỹ năng', m: 3, a: true,  t: 'Cán cân xuất nhập khẩu dương khi giá trị xuất khẩu lớn hơn giá trị nhập khẩu, gọi là xuất siêu.', v: 'Ngược lại là nhập siêu.' },
{ cd: 'Kỹ năng', m: 3, a: false, t: 'Nhập siêu là tình trạng giá trị xuất khẩu lớn hơn giá trị nhập khẩu.', v: 'Đó là XUẤT siêu. Nhập siêu là nhập khẩu lớn hơn xuất khẩu.' },

{ cd: 'Ngành kinh tế', m: 2, a: false, t: 'Ngành chăn nuôi hiện chiếm tỉ trọng lớn hơn ngành trồng trọt trong cơ cấu giá trị sản xuất nông nghiệp nước ta.', v: 'Trồng trọt vẫn chiếm tỉ trọng lớn hơn, dù chăn nuôi đang tăng dần.' },
{ cd: 'Ngành kinh tế', m: 2, a: true,  t: 'Vùng nuôi trồng thuỷ sản lớn nhất nước ta là Đồng bằng sông Cửu Long.', v: 'Nhờ diện tích mặt nước lớn và hệ thống sông ngòi, kênh rạch dày đặc.' },
{ cd: 'Ngành kinh tế', m: 2, a: true,  t: 'Công nghiệp chế biến lương thực thực phẩm là ngành công nghiệp trọng điểm của nước ta.', v: 'Có thế mạnh lâu dài, hiệu quả kinh tế cao và tác động mạnh tới các ngành khác.' },
{ cd: 'Ngành kinh tế', m: 2, a: true,  t: 'Hai trung tâm công nghiệp lớn nhất nước ta là Thành phố Hồ Chí Minh và Hà Nội.', v: 'Tập trung nhiều ngành với quy mô và giá trị sản xuất lớn.' },
{ cd: 'Ngành kinh tế', m: 2, a: false, t: 'Ngành công nghiệp khai thác bôxit tập trung chủ yếu ở Đông Nam Bộ.', v: 'Bôxit tập trung ở TÂY NGUYÊN. Đông Nam Bộ nổi bật với dầu khí.' },
{ cd: 'Ngành kinh tế', m: 3, a: true,  t: 'Việc đẩy mạnh giao thông vận tải và bưu chính viễn thông tạo điều kiện thúc đẩy các ngành kinh tế khác phát triển.', v: 'Hạ tầng là điều kiện tiên quyết cho phát triển vùng.' },
{ cd: 'Ngành kinh tế', m: 2, a: true,  t: 'Rừng phòng hộ có vai trò hạn chế thiên tai, bảo vệ nguồn nước và chống xói mòn đất.', v: 'Bên cạnh rừng đặc dụng và rừng sản xuất.' },
{ cd: 'Ngành kinh tế', m: 2, a: false, t: 'Rừng sản xuất là loại rừng có chức năng chính là bảo tồn các hệ sinh thái tự nhiên quý hiếm.', v: 'Đó là chức năng của rừng ĐẶC DỤNG (vườn quốc gia, khu bảo tồn).' },
{ cd: 'Ngành kinh tế', m: 3, a: true,  t: 'Suy giảm tài nguyên rừng làm gia tăng xói mòn đất, lũ lụt và suy giảm đa dạng sinh học.', v: 'Vì vậy bảo vệ rừng gắn liền với bảo vệ môi trường và phòng chống thiên tai.' },
{ cd: 'Ngành kinh tế', m: 2, a: true,  t: 'Ngành du lịch nước ta có tính mùa vụ rõ rệt ở nhiều địa phương.', v: 'Do phụ thuộc khí hậu, mùa lễ hội và kì nghỉ.' },
{ cd: 'Ngành kinh tế', m: 3, a: true,  t: 'Cơ cấu thành phần kinh tế nước ta chuyển dịch theo hướng phát huy vai trò của kinh tế tư nhân và khu vực có vốn đầu tư nước ngoài.', v: 'Trong khi kinh tế nhà nước vẫn giữ vai trò chủ đạo ở các lĩnh vực then chốt.' },

/* ========== BỔ SUNG MỨC 3–4: VẬN DỤNG & VẬN DỤNG CAO ========== */
{ cd: 'Vị trí địa lí', m: 4, a: true,  t: 'Do nằm hoàn toàn trong vùng nội chí tuyến bán cầu Bắc nên mọi địa điểm trên đất liền nước ta đều có hai lần Mặt Trời lên thiên đỉnh trong năm.', v: 'Đây là hệ quả trực tiếp của vị trí nội chí tuyến, tạo nền nhiệt cao và tổng bức xạ lớn quanh năm.' },
{ cd: 'Vị trí địa lí', m: 4, a: true,  t: 'Vị trí tiếp giáp Biển Đông làm cho thiên nhiên nước ta khác hẳn các nước cùng vĩ độ ở Tây Nam Á và Bắc Phi vốn khô hạn hoang mạc.', v: 'Biển Đông cung cấp ẩm, làm khí hậu điều hoà và mang lại lượng mưa lớn cho lãnh thổ.' },
{ cd: 'Vị trí địa lí', m: 3, a: true,  t: 'Vị trí nằm trên ngã tư đường hàng hải và hàng không quốc tế tạo điều kiện cho nước ta phát triển kinh tế biển và hội nhập.', v: 'Đồng thời cũng đặt ra yêu cầu cao về bảo vệ chủ quyền biển đảo và an ninh quốc phòng.' },
{ cd: 'Khí hậu', m: 4, a: true,  t: 'Gió phơn Tây Nam gây khô nóng cho Bắc Trung Bộ là do khối khí từ vịnh Bengal vượt dãy Trường Sơn, trút mưa ở sườn Tây rồi biến tính khô nóng khi xuống sườn Đông.', v: 'Hiệu ứng phơn: lên cao giảm nhiệt và gây mưa, xuống thấp nén đoạn nhiệt nên nóng và khô.' },
{ cd: 'Khí hậu', m: 4, a: false, t: 'Miền Nam nước ta có biên độ nhiệt độ trung bình năm lớn hơn miền Bắc.', v: 'Ngược lại. Miền Bắc có mùa đông lạnh do gió mùa Đông Bắc nên biên độ nhiệt năm lớn; miền Nam nóng quanh năm, biên độ nhỏ.' },
{ cd: 'Khí hậu', m: 4, a: true,  t: 'Mưa vào thu đông ở Trung Bộ là do gió Đông Bắc gặp dãy Trường Sơn kết hợp bão, dải hội tụ nhiệt đới và áp thấp.', v: 'Vì vậy Trung Bộ có mùa mưa lệch hẳn về thu đông so với cả nước.' },
{ cd: 'Khí hậu', m: 4, a: true,  t: 'Cùng thời điểm tháng 7, gió mùa Tây Nam gây mưa lớn cho Nam Bộ và Tây Nguyên nhưng lại gây khô nóng cho ven biển Trung Bộ.', v: 'Cùng một khối khí nhưng địa hình chắn gió tạo ra hai kiểu thời tiết trái ngược ở hai sườn Trường Sơn.' },
{ cd: 'Phân hoá thiên nhiên', m: 4, a: true,  t: 'Đai ôn đới gió mùa trên núi ở nước ta chỉ xuất hiện ở dãy Hoàng Liên Sơn, từ độ cao khoảng 2600 m trở lên.', v: 'Vì chỉ nơi này đủ độ cao; đó cũng là đai hẹp nhất và duy nhất có nhiệt độ trung bình năm dưới 15 °C.' },
{ cd: 'Phân hoá thiên nhiên', m: 4, a: true,  t: 'Ranh giới đai nhiệt đới gió mùa ở miền Bắc thấp hơn miền Nam khoảng 300–400 m.', v: 'Miền Bắc có mùa đông lạnh nên nền nhiệt thấp hơn, đai nhiệt đới kết thúc sớm hơn theo độ cao.' },
{ cd: 'Phân hoá thiên nhiên', m: 3, a: true,  t: 'Thiên nhiên nước ta phân hoá theo cả ba chiều: Bắc – Nam, Đông – Tây và theo độ cao.', v: 'Nguyên nhân lần lượt là vĩ độ kết hợp gió mùa, ảnh hưởng của biển kết hợp địa hình, và quy luật đai cao.' },
{ cd: 'Dân cư', m: 4, a: true,  t: 'Nước ta đang trong thời kì cơ cấu dân số vàng nhưng đồng thời cũng đã bước vào giai đoạn già hoá dân số.', v: 'Hai đặc điểm cùng tồn tại: tỉ lệ người trong tuổi lao động cao, nhưng tỉ trọng người từ 65 tuổi trở lên tăng nhanh.' },
{ cd: 'Dân cư', m: 4, a: true,  t: 'Tỉ lệ gia tăng dân số tự nhiên giảm nhưng quy mô dân số nước ta vẫn tiếp tục tăng thêm mỗi năm.', v: 'Vì quy mô dân số nền đã rất lớn, nên dù tỉ lệ giảm thì số người tăng tuyệt đối vẫn đáng kể.' },
{ cd: 'Dân cư', m: 4, a: false, t: 'Đô thị hoá ở nước ta hiện nay đã tương xứng với trình độ phát triển công nghiệp.', v: 'Đô thị hoá nước ta vẫn diễn ra chưa tương xứng, còn tự phát ở nhiều nơi, gây sức ép về hạ tầng, việc làm và môi trường.' },
{ cd: 'Vùng kinh tế', m: 4, a: true,  t: 'Đồng bằng sông Cửu Long mạnh về lúa gạo, thuỷ sản và cây ăn quả nhưng hạn chế lớn nhất là xâm nhập mặn và thiếu nước ngọt vào mùa khô.', v: 'Biến đổi khí hậu và nước biển dâng làm vấn đề này ngày càng gay gắt, đòi hỏi chuyển đổi cơ cấu mùa vụ.' },
{ cd: 'Vùng kinh tế', m: 4, a: true,  t: 'Tây Nguyên có mùa khô kéo dài sâu sắc nên thuỷ lợi là vấn đề quan trọng hàng đầu của vùng.', v: 'Mùa khô 4–5 tháng, mực nước ngầm hạ thấp, ảnh hưởng trực tiếp đến cây công nghiệp lâu năm như cà phê.' },
{ cd: 'Vùng kinh tế', m: 4, a: true,  t: 'Đông Nam Bộ dẫn đầu cả nước về thu hút vốn đầu tư nước ngoài nhờ cơ sở hạ tầng, lao động kĩ thuật và vị trí đầu mối giao thông.', v: 'Đây là vùng có GRDP bình quân đầu người và tỉ trọng công nghiệp – dịch vụ cao nhất cả nước.' },
{ cd: 'Vùng kinh tế', m: 4, a: false, t: 'Trung du và miền núi Bắc Bộ có thế mạnh nổi bật nhất là nuôi trồng thuỷ sản nước lợ.', v: 'Thế mạnh của vùng là khoáng sản, thuỷ điện, cây công nghiệp cận nhiệt và chăn nuôi gia súc lớn. Thuỷ sản nước lợ là thế mạnh của các vùng đồng bằng ven biển.' },
{ cd: 'Vùng kinh tế', m: 4, a: true,  t: 'Duyên hải Nam Trung Bộ có lợi thế phát triển nghề cá và du lịch biển nhưng lại thiếu nước và hay hạn hán ở đồng bằng ven biển.', v: 'Đây là vùng khô hạn nhất cả nước, đặc biệt là khu vực Ninh Thuận – Bình Thuận.' },
{ cd: 'Kỹ năng', m: 4, a: true,  t: 'Khi bảng số liệu có nhiều năm và đề yêu cầu thể hiện TỐC ĐỘ TĂNG TRƯỞNG, biểu đồ thích hợp nhất là biểu đồ đường.', v: 'Trước khi vẽ phải xử lí số liệu về dạng chỉ số %, lấy năm đầu bằng 100 %.' },
{ cd: 'Kỹ năng', m: 4, a: true,  t: 'Muốn thể hiện đồng thời quy mô và cơ cấu của hai hoặc ba năm, biểu đồ thích hợp nhất là biểu đồ tròn có bán kính khác nhau.', v: 'Bán kính tỉ lệ với căn bậc hai của tổng giá trị để phản ánh đúng quy mô.' },
{ cd: 'Kỹ năng', m: 4, a: true,  t: 'Biểu đồ miền thích hợp nhất để thể hiện sự chuyển dịch cơ cấu qua nhiều năm (thường từ 4 năm trở lên).', v: 'Nếu chỉ có 1–3 năm thì dùng biểu đồ tròn hoặc cột chồng.' },
{ cd: 'Kỹ năng', m: 4, a: false, t: 'Khi đề cho số liệu tuyệt đối và yêu cầu thể hiện cơ cấu, có thể vẽ ngay biểu đồ tròn mà không cần xử lí số liệu.', v: 'Phải chuyển sang số liệu tương đối (%) trước rồi mới vẽ; bỏ bước này là mất điểm xử lí số liệu.' },
{ cd: 'Kỹ năng', m: 3, a: true,  t: 'Khi khai thác Atlat, phải đọc kí hiệu ở trang 3 trước rồi mới đọc bản đồ chuyên đề.', v: 'Trang 3 là bảng chú giải chung, nắm được nó thì đọc mọi trang khác đều nhanh và chính xác.' },
{ cd: 'Ngành kinh tế', m: 4, a: true,  t: 'Công nghiệp năng lượng nước ta dựa trên thế mạnh than ở Quảng Ninh, dầu khí ở thềm lục địa phía Nam và thuỷ điện trên các hệ thống sông lớn.', v: 'Gần đây bổ sung mạnh điện gió, điện mặt trời ở Nam Trung Bộ và Tây Nguyên.' },
{ cd: 'Ngành kinh tế', m: 4, a: true,  t: 'Việc đẩy mạnh chế biến sâu nông sản giúp nâng cao giá trị gia tăng và giảm phụ thuộc vào xuất khẩu thô.', v: 'Đây là hướng chuyển dịch trọng tâm để thoát khỏi tình trạng "được mùa mất giá".' },
{ cd: 'Ngành kinh tế', m: 4, a: false, t: 'Ngành chăn nuôi nước ta đã chiếm tỉ trọng lớn hơn trồng trọt trong cơ cấu giá trị sản xuất nông nghiệp.', v: 'Chăn nuôi đang tăng tỉ trọng nhưng trồng trọt vẫn chiếm tỉ trọng lớn hơn.' },
{ cd: 'Ngành kinh tế', m: 3, a: true,  t: 'Giao thông vận tải đường biển có vai trò quan trọng nhất trong vận chuyển hàng hoá xuất nhập khẩu của nước ta.', v: 'Nhờ khối lượng lớn, giá rẻ và đường bờ biển dài với nhiều cảng nước sâu.' }
);
