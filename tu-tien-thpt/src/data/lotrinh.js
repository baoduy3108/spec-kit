/* ============================================================
   THIÊN MỆNH BẢNG — Lộ trình 20 tuần (5 tháng) chinh phục 28 điểm
   + Chiến thuật phòng thi
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

TD.GIAI_DOAN = [
  { id: 1, ten: 'TRÚC CƠ — Lấp lỗ hổng',   tuan: '1–6',   mau: '#48c9b0',
    muc_tieu: 'Đóng kín nền tảng. Đích: mỗi môn tự tin ăn trọn phần Nhận biết + Thông hiểu (≈ 6,5–7,0 điểm).',
    nguyen_tac: 'KHÔNG luyện đề vội. Giai đoạn này sai nhiều là bình thường — mục tiêu là biết mình hổng chỗ nào.' },
  { id: 2, ten: 'KIM ĐAN — Cày dạng bài',  tuan: '7–13',  mau: '#f5c76b',
    muc_tieu: 'Thành thạo từng DẠNG bài vận dụng. Đích: 8,0–8,5 điểm mỗi môn.',
    nguyen_tac: 'Học theo DẠNG chứ không theo bài. Mỗi dạng làm ít nhất 10 câu liên tiếp đến khi phản xạ tự động.' },
  { id: 3, ten: 'NGUYÊN ANH — Luyện đề',   tuan: '14–18', mau: '#bb8fce',
    muc_tieu: 'Luyện đề chuẩn cấu trúc + xử lí câu phân hoá. Đích: 9,0+ và ổn định về thời gian.',
    nguyen_tac: 'Mỗi đề phải bấm giờ NGHIÊM. Chữa đề kỹ hơn làm đề — dành gấp đôi thời gian để chữa.' },
  { id: 4, ten: 'ĐỘ KIẾP — Tổng ôn',       tuan: '19–20', mau: '#e74c3c',
    muc_tieu: 'Giữ phong độ, rà soát sổ lỗi sai, ổn định tâm lý và sức khoẻ.',
    nguyen_tac: 'KHÔNG học kiến thức mới. Chỉ đọc lại khẩu quyết, công thức và sổ lỗi sai của chính mình.' }
];

TD.LO_TRINH = [
  /* ---------- GIAI ĐOẠN 1: TRÚC CƠ ---------- */
  { tuan: 1, gd: 1, chu_de: 'Khởi động & định vị bản thân',
    viec: [
      'Làm 1 đề thi thử của mỗi môn trong tổ hợp để biết điểm xuất phát thật (đừng tra đáp án giữa chừng).',
      'Lập <b>SỔ LỖI SAI</b> — một quyển duy nhất, chia theo môn. Đây là tài sản quan trọng nhất trong 5 tháng.',
      'Toán: ôn đạo hàm, bảng đạo hàm, xét dấu, đơn điệu – cực trị.',
      'Hoá: đọc hết 88 khẩu quyết một lượt, đánh dấu cái nào chưa biết.',
      'Lý: chương Vật lí nhiệt (nhiệt lượng, chuyển thể, định luật I NĐLH).'
    ],
    chi_tieu: 25, moc: 'Biết chính xác mình đang ở đâu và hổng gì.' },
  { tuan: 2, gd: 1, chu_de: 'Nền tảng đại số & vô cơ',
    viec: [
      'Toán: GTLN – GTNN, tiệm cận (kể cả <b>tiệm cận xiên</b> của chương trình mới).',
      'Hoá: đại cương kim loại — dãy điện hoá, tính chất, điều chế, ăn mòn (khẩu quyết 1–8).',
      'Lý: khí lí tưởng — 3 định luật, phương trình trạng thái, Clapeyron–Mendeleev.',
      'Học <b>thuộc lòng</b> bảng nguyên tử khối và bảng đạo hàm — không tra nữa.'
    ],
    chi_tieu: 30, moc: 'Nhắm mắt viết được dãy điện hoá và 10 công thức đạo hàm.' },
  { tuan: 3, gd: 1, chu_de: 'Mũ – Logarit & hợp chất vô cơ',
    viec: [
      'Toán: công thức mũ – logarit, phương trình và bất phương trình cơ bản.',
      'Hoá: kim loại IA, IIA, nhôm, sắt, crom (khẩu quyết 8–24).',
      'Lý: từ trường — cảm ứng từ, lực từ, từ thông.',
      'Ôn lại toàn bộ lỗi sai tuần 1–2 trong sổ.'
    ],
    chi_tieu: 30, moc: 'Giải được phương trình mũ – logarit cơ bản không cần nhìn công thức.' },
  { tuan: 4, gd: 1, chu_de: 'Nguyên hàm & hữu cơ nhập môn',
    viec: [
      'Toán: bảng nguyên hàm, nguyên hàm mở rộng ∫f(ax+b)dx.',
      'Hoá: ester – lipid (khẩu quyết 40–49) + công thức chung dãy đồng đẳng.',
      'Lý: cảm ứng điện từ, định luật Lenz, máy biến áp.',
      'Sinh/Sử/Địa (môn thứ 3): học phần lý thuyết nền chương đầu.'
    ],
    chi_tieu: 30, moc: 'Thuộc bảng nguyên hàm; viết được phản ứng xà phòng hoá.' },
  { tuan: 5, gd: 1, chu_de: 'Tích phân & carbohydrate – nitrogen',
    viec: [
      'Toán: tích phân, đổi biến, từng phần ("nhất log, nhì đa, tam lượng, tứ mũ").',
      'Hoá: carbohydrate, amine, amino acid, peptide (khẩu quyết 50–58).',
      'Lý: vật lí hạt nhân — độ hụt khối, năng lượng liên kết, phóng xạ.',
      'Bổ sung phần <b>chỉ có ở chương trình mới</b>: enthalpy ΔH, pin điện, phức chất (khẩu quyết 73–88).'
    ],
    chi_tieu: 32, moc: 'Phân biệt được glucose / fructose / saccharose / maltose bằng thuốc thử.' },
  { tuan: 6, gd: 1, chu_de: 'Chốt nền tảng — kiểm tra giai đoạn',
    viec: [
      'Toán: Oxyz — vectơ, tích vô hướng, tích có hướng, phương trình mặt phẳng.',
      'Hoá: polymer + tổng ôn toàn bộ 88 khẩu quyết (lần 2).',
      '<b>Thi thử giai đoạn 1</b>: 1 đề đầy đủ mỗi môn, bấm giờ chuẩn.',
      'Chấm điểm, đối chiếu với mục tiêu 6,5–7,0. Rà lại sổ lỗi sai.'
    ],
    chi_tieu: 40, moc: '🏁 MỐC KIỂM TRA: đạt ≥ 6,5 mỗi môn. Chưa đạt thì kéo dài giai đoạn 1 thêm 1 tuần.' },

  /* ---------- GIAI ĐOẠN 2: KIM ĐAN ---------- */
  { tuan: 7, gd: 2, chu_de: 'Bốn định luật bảo toàn',
    viec: [
      'Hoá: nắm chắc <b>BTKL – BTNT – BTE – BTĐT</b>. Mỗi định luật làm 15 câu.',
      'Toán: ứng dụng tích phân — diện tích hình phẳng, thể tích tròn xoay.',
      'Lý: bài tập nhiệt lượng, cân bằng nhiệt, phương trình trạng thái có tính toán.',
      'Bắt đầu thói quen: mỗi tối trước khi ngủ đọc lại 10 khẩu quyết.'
    ],
    chi_tieu: 35, moc: 'Nhìn đề Hoá là biết ngay dùng định luật bảo toàn nào.' },
  { tuan: 8, gd: 2, chu_de: 'Kỹ thuật giải nhanh',
    viec: [
      'Hoá: quy đổi hỗn hợp, tăng giảm khối lượng, trung bình – đường chéo.',
      'Toán: Oxyz — đường thẳng, mặt cầu, vị trí tương đối.',
      'Lý: bài tập lực từ, suất điện động cảm ứng, máy biến áp.',
      'Môn thứ 3: luyện dạng câu <b>đúng/sai 4 ý</b> — đây là phần ăn điểm dễ nhất.'
    ],
    chi_tieu: 35, moc: 'Giải bài oxit sắt + HNO₃ bằng quy đổi trong dưới 3 phút.' },
  { tuan: 9, gd: 2, chu_de: 'Dạng đồ thị & bài toán tỉ lệ',
    viec: [
      'Hoá: đồ thị CO₂ – kiềm, OH⁻ – Al³⁺, H⁺ – AlO₂⁻. Thuộc 2 công thức đỉnh: n↓ = n(OH⁻) − n(CO₂) và n↓ = 4n(Al³⁺) − n(OH⁻).',
      'Toán: <b>thống kê mẫu ghép nhóm</b> (nội dung mới) — trung bình, tứ phân vị, phương sai.',
      'Lý: bài tập phóng xạ, chu kì bán rã.',
      'Chữa lại toàn bộ đề thi thử tuần 6 — làm lại các câu đã sai.'
    ],
    chi_tieu: 35, moc: 'Nhìn đồ thị là đọc ra được số liệu, không cần giải hệ.' },
  { tuan: 10, gd: 2, chu_de: 'Hữu cơ nâng cao',
    viec: [
      'Hoá: bài toán ester, chất béo (chỉ số, cộng H₂/Br₂), đốt cháy hợp chất hữu cơ.',
      'Toán: <b>xác suất có điều kiện, công thức Bayes</b> (nội dung mới) — vẽ sơ đồ hình cây.',
      'Lý: năng lượng phản ứng hạt nhân, phân hạch – nhiệt hạch.',
      'Bắt đầu làm <b>1 đề/tuần</b> cho môn yếu nhất.'
    ],
    chi_tieu: 38, moc: 'Làm trọn vẹn một bài chất béo bằng BTKL trong 4 phút.' },
  { tuan: 11, gd: 2, chu_de: 'Peptide & hình không gian',
    viec: [
      'Hoá: peptide — thuỷ phân, kỹ thuật <b>quy đổi về {C₂H₃NO; CH₂; H₂O}</b>.',
      'Toán: hình học không gian — thể tích, khoảng cách (mẹo d = 3V/S), góc.',
      'Lý: tổng ôn 4 chương, hệ thống lại toàn bộ công thức vào 2 trang giấy.',
      'Môn thứ 3: luyện phần vận dụng thực tế (biểu đồ, tình huống, số liệu).'
    ],
    chi_tieu: 38, moc: 'Giải được bài peptide mức vận dụng cao.' },
  { tuan: 12, gd: 2, chu_de: 'Điện phân & tổng hợp',
    viec: [
      'Hoá: điện phân (Faraday), pin điện – thế điện cực chuẩn, HNO₃ tổng quát.',
      'Toán: tổng ôn cấp số, lãi kép, bài toán thực tế tối ưu.',
      'Ghép 2 môn/ngày, mỗi môn 90 phút tập trung — bắt đầu mô phỏng nhịp thi.',
      'Rà soát: khẩu quyết nào vẫn chưa thuộc sau 3 lần đọc? Viết riêng ra giấy dán tường.'
    ],
    chi_tieu: 40, moc: 'Thuộc n(e) = It/96500 và giải được bài điện phân 2 cực.' },
  { tuan: 13, gd: 2, chu_de: 'Kiểm tra giai đoạn 2',
    viec: [
      '<b>Thi thử giai đoạn 2</b>: đề đầy đủ 3 môn trong 1 ngày, đúng khung giờ thi thật.',
      'Chấm điểm, đối chiếu mục tiêu 8,0–8,5.',
      'Phân tích: mất điểm ở MỨC ĐỘ nào (nhận biết / thông hiểu / vận dụng / VDC) và ở CHƯƠNG nào.',
      'Lập danh sách 10 dạng bài hay sai nhất — đây là ưu tiên của giai đoạn 3.'
    ],
    chi_tieu: 45, moc: '🏁 MỐC KIỂM TRA: đạt ≥ 8,0 mỗi môn. Chưa đạt thì quay lại cày dạng bài còn yếu.' },

  /* ---------- GIAI ĐOẠN 3: NGUYÊN ANH ---------- */
  { tuan: 14, gd: 3, chu_de: 'Vào guồng luyện đề',
    viec: [
      '<b>2 đề/môn/tuần</b>, bấm giờ nghiêm ngặt, không tra tài liệu.',
      'Chữa đề: mỗi câu sai phải viết vào sổ 3 dòng — sai vì gì, kiến thức nào, lần sau làm sao.',
      'Tập kỹ năng phân bổ thời gian: Phần I nhanh → Phần III → Phần II.',
      'Đọc lại 88 khẩu quyết Hoá lần 3 (lần này chỉ đọc phần chưa thuộc).'
    ],
    chi_tieu: 50, moc: 'Làm xong đề Hoá/Lý/Sinh trong 45 phút, còn 5 phút soát.' },
  { tuan: 15, gd: 3, chu_de: 'Xử lí câu phân hoá',
    viec: [
      'Tập trung riêng vào các câu <b>vận dụng cao</b> — mỗi ngày 3 câu, làm đến khi ra.',
      'Kỹ thuật: nếu 3 phút chưa ra hướng thì <b>bỏ qua, quay lại sau</b>. Luyện phản xạ này.',
      'Toán: luyện riêng 6 câu trả lời ngắn (3 điểm) — đây là phần quyết định điểm 9+.',
      'Ôn tập chéo: mỗi ngày dành 20 phút cho môn đang mạnh nhất để không bị tụt.'
    ],
    chi_tieu: 50, moc: 'Không còn hoảng khi gặp câu lạ — biết bỏ qua đúng lúc.' },
  { tuan: 16, gd: 3, chu_de: 'Rà chương yếu',
    viec: [
      'Thống kê từ 4 đề gần nhất: chương nào mất điểm nhiều nhất → dồn 60% thời gian tuần này vào đó.',
      'Luyện dạng đúng/sai: mẹo là <b>xét từng ý độc lập</b>, đừng để ý này ảnh hưởng ý kia.',
      'Ngữ văn: luyện viết 1 đoạn NLXH + 1 bài NLVH mỗi tuần, nhờ thầy cô chấm.',
      'Tiếng Anh (nếu thi): luyện riêng dạng sắp xếp câu và điền đoạn văn.'
    ],
    chi_tieu: 50, moc: 'Chương yếu nhất tăng ít nhất 1 điểm.' },
  { tuan: 17, gd: 3, chu_de: 'Tăng tốc',
    viec: [
      '<b>3 đề/môn/tuần</b>. Xen kẽ đề dễ và đề khó để giữ tâm lý.',
      'Luyện tô đáp án: dành đúng 5 phút cuối, tô dứt điểm, không để sót.',
      'Mô phỏng đúng lịch thi thật: sáng Toán, chiều môn tự chọn.',
      'Chú ý sức khoẻ: ngủ đủ 7 tiếng. Thức khuya từ tuần này trở đi là <b>lỗ</b>.'
    ],
    chi_tieu: 55, moc: 'Điểm các đề dao động trong biên độ hẹp (± 0,5) — dấu hiệu đã ổn định.' },
  { tuan: 18, gd: 3, chu_de: 'Kiểm tra giai đoạn 3',
    viec: [
      '<b>Thi thử tổng lực</b>: 3 môn đúng lịch, đúng giờ, đúng áp lực.',
      'Mục tiêu: tổng 3 môn ≥ 27,0.',
      'Chữa đề cực kỹ. Đây là lần chữa đề quan trọng nhất.',
      'Chốt lại danh sách "10 lỗi mình hay mắc nhất" — dán lên bàn học.'
    ],
    chi_tieu: 55, moc: '🏁 MỐC KIỂM TRA: tổng ≥ 27,0 điểm. Nếu đạt, 28 điểm nằm trong tầm tay.' },

  /* ---------- GIAI ĐOẠN 4: ĐỘ KIẾP ---------- */
  { tuan: 19, gd: 4, chu_de: 'Tổng ôn — không học mới',
    viec: [
      '<b>Ngừng học kiến thức mới hoàn toàn.</b> Chỉ đọc lại khẩu quyết, công thức, sổ lỗi sai.',
      'Mỗi ngày 1 đề nhẹ để giữ nhịp tay, không cần đề khó.',
      'Đọc lại toàn bộ sổ lỗi sai từ tuần 1 — bạn sẽ ngạc nhiên vì nhiều lỗi lặp lại.',
      'Chuẩn bị giấy tờ: CCCD, thẻ dự thi, bút, thước, máy tính cầm tay (loại được phép).'
    ],
    chi_tieu: 30, moc: 'Đọc trọn sổ lỗi sai ít nhất 2 lượt.' },
  { tuan: 20, gd: 4, chu_de: 'Vượt kiếp',
    viec: [
      'Giảm cường độ còn 50%. Ngủ đúng giờ, dậy đúng giờ thi (dậy 5h30–6h).',
      'Ba ngày cuối: chỉ đọc lướt khẩu quyết và công thức, <b>không làm đề mới</b>.',
      'Đi kiểm tra phòng thi trước, tính sẵn đường đi và thời gian.',
      'Ăn uống bình thường, tránh đồ lạ. Tuyệt đối không thức khuya đêm trước.',
      'Tin vào 20 tuần đã đi qua. Vào phòng thi với đầu óc tỉnh táo là đã thắng một nửa.'
    ],
    chi_tieu: 15, moc: '⚡ ĐỘ KIẾP — Chúc đạo hữu phi thăng.' }
];

/* ---------- CHIẾN THUẬT PHÒNG THI ---------- */
TD.CHIEN_THUAT = [
  { ten: 'Phân bổ điểm để đạt 28/30', icon: '🎯',
    noi_dung: '<b>28 điểm = trung bình 9,33/môn.</b> Nghĩa là mỗi môn chỉ được mất ~0,67 điểm.<br>' +
      '<table class="kq"><tr><th>Phần</th><th>Lý/Hoá/Sinh</th><th>Chiến lược</th></tr>' +
      '<tr><td>Phần I — 18 câu × 0,25</td><td>4,5đ</td><td><b>Ăn trọn 100%</b>. Đây là phần không được phép sai.</td></tr>' +
      '<tr><td>Phần II — 4 câu đúng/sai</td><td>4,0đ</td><td>Mục tiêu <b>3,5/4,0</b>. Xét từng ý độc lập.</td></tr>' +
      '<tr><td>Phần III — 6 câu × 0,25</td><td>1,5đ</td><td>Mục tiêu <b>1,25/1,5</b> (được sai 1 câu khó nhất).</td></tr></table>' +
      '<b>Với Toán:</b> Phần I 12 câu (3đ) ăn trọn · Phần II 4 câu (4đ) lấy 3,5 · Phần III 6 câu × 0,5 (3đ) lấy 2,5.<br>' +
      '<b>Kết luận:</b> điểm 9+ đến từ việc <u>không sai câu dễ</u>, chứ không phải làm được câu khó nhất.' },

  { ten: 'Thang điểm câu Đúng/Sai — điểm mấu chốt', icon: '⚖️',
    noi_dung: 'Mỗi câu Phần II có 4 ý, chấm theo <b>thang luỹ tiến</b>:<br>' +
      '<table class="kq"><tr><td>Đúng 1 ý</td><td><b>0,10</b> điểm</td></tr>' +
      '<tr><td>Đúng 2 ý</td><td><b>0,25</b> điểm</td></tr>' +
      '<tr><td>Đúng 3 ý</td><td><b>0,50</b> điểm</td></tr>' +
      '<tr><td>Đúng 4 ý</td><td><b>1,00</b> điểm</td></tr></table>' +
      '<b>Ý nghĩa chiến thuật:</b> khoảng cách 3 ý → 4 ý là <b>0,5 điểm</b> — lớn gấp đôi bước 2→3.<br>' +
      '⇒ Đã chắc 3 ý thì <b>phải cố nốt ý thứ 4</b>. Ngược lại, đừng bỏ trắng cả câu chỉ vì không chắc — đúng 2 ý vẫn có 0,25đ.<br>' +
      '<b>Quan trọng:</b> 4 ý trong một câu <b>độc lập với nhau</b>. Đừng nghĩ "chắc phải có 2 đúng 2 sai" — hoàn toàn có thể cả 4 đều đúng.' },

  { ten: 'Trình tự làm bài & quản lí thời gian', icon: '⏱️',
    noi_dung: '<b>Môn 50 phút (Lý/Hoá/Sinh):</b><br>' +
      '&nbsp;&nbsp;① <b>0–15 phút:</b> quét Phần I, làm hết câu dễ. Câu nào &gt; 40 giây thì đánh dấu, bỏ qua.<br>' +
      '&nbsp;&nbsp;② <b>15–25 phút:</b> Phần III (trả lời ngắn) — làm câu tính toán quen thuộc trước.<br>' +
      '&nbsp;&nbsp;③ <b>25–42 phút:</b> Phần II (đúng/sai) — phần này cần đọc kỹ nhất, để lúc đầu óc còn tỉnh.<br>' +
      '&nbsp;&nbsp;④ <b>42–47 phút:</b> quay lại các câu đã đánh dấu.<br>' +
      '&nbsp;&nbsp;⑤ <b>47–50 phút:</b> soát và tô kín đáp án. <b>Không để trống câu nào.</b><br>' +
      '<b>Toán 90 phút:</b> Phần I 20 phút · Phần III 30 phút · Phần II 30 phút · soát 10 phút.<br>' +
      '<b>Nguyên tắc sắt:</b> không bao giờ để một câu ăn quá 3 phút ở lượt đầu.' },

  { ten: 'Kỹ thuật loại trừ & đoán có cơ sở', icon: '🔮',
    noi_dung: '<b>Phần I (4 lựa chọn) — không bao giờ bỏ trống, 25% vẫn hơn 0%.</b><br>' +
      '&nbsp;&nbsp;• Loại đáp án <b>sai đơn vị</b> hoặc sai bậc độ lớn (thường có 1–2 đáp án nhiễu kiểu này).<br>' +
      '&nbsp;&nbsp;• Với câu tính toán: <b>thử đáp án ngược</b> vào đề — nhanh hơn giải xuôi.<br>' +
      '&nbsp;&nbsp;• Đáp án chứa từ tuyệt đối (<b>luôn luôn, mọi, chỉ, không bao giờ</b>) thường sai.<br>' +
      '&nbsp;&nbsp;• Hai đáp án <b>trái ngược nhau</b> ⇒ khả năng cao một trong hai là đáp án đúng.<br>' +
      '<b>Phần III (trả lời ngắn):</b> đọc kỹ yêu cầu <b>làm tròn</b> và <b>đơn vị</b>. Sai đơn vị = mất trọn câu dù giải đúng.<br>' +
      '<b>Phần II:</b> ý nào đọc thấy "chắc chắn đúng theo SGK" thì tick ngay; ý nào có chi tiết lạ, thêm điều kiện thì soi kỹ — thường là ý sai.' },

  { ten: 'Sổ lỗi sai — vũ khí mạnh nhất', icon: '📓',
    noi_dung: 'Đây là thứ tạo ra khác biệt giữa 8 điểm và 9,5 điểm.<br>' +
      '<b>Mỗi câu sai ghi đúng 3 dòng:</b><br>' +
      '&nbsp;&nbsp;① <b>Sai vì gì?</b> (không thuộc công thức / đọc sót dữ kiện / tính nhầm / hiểu sai bản chất)<br>' +
      '&nbsp;&nbsp;② <b>Kiến thức cốt lõi</b> của câu này là gì?<br>' +
      '&nbsp;&nbsp;③ <b>Lần sau gặp dạng này mình sẽ làm thế nào?</b><br>' +
      '<b>Lịch ôn sổ lỗi sai:</b> sau 1 ngày → sau 3 ngày → sau 1 tuần → sau 1 tháng (giãn cách tăng dần).<br>' +
      '<b>Sự thật phũ phàng:</b> đa số học sinh mất điểm vì <b>lặp lại lỗi cũ</b>, không phải vì gặp câu mới. Chữa được lỗi lặp là lên 1–1,5 điểm.' },

  { ten: 'Sức khoẻ & tâm lý', icon: '🧘',
    noi_dung: '<b>Giấc ngủ:</b> ngủ đủ <b>7 tiếng</b>. Thức đến 2h sáng học thêm 1 chương nhưng hôm sau tiếp thu giảm 40% — đó là lỗ, không phải lãi.<br>' +
      '<b>Chu kỳ học:</b> áp dụng <b>50 phút học – 10 phút nghỉ</b>. Nghỉ là rời khỏi bàn, không phải lướt điện thoại.<br>' +
      '<b>Trước ngày thi:</b> không học bài mới, ngủ trước 23h, chuẩn bị sẵn giấy tờ và dụng cụ từ tối.<br>' +
      '<b>Trong phòng thi, nếu hoảng:</b> đặt bút xuống, hít sâu 4 giây – giữ 4 giây – thở ra 6 giây, lặp 3 lần. Mất 30 giây nhưng cứu được cả bài.<br>' +
      '<b>Gặp câu không làm được:</b> bình thường. Đề luôn có câu để phân loại thủ khoa. Bạn cần 28 điểm chứ không cần 30.' }
];
