/* ============================================================
   CÂU HỎI CÓ HÌNH — ĐỢT 5: DẠNG ĐÚNG / SAI (PHẦN II)
   Phần II của đề thật rất hay đặt một hình rồi bắt soi bốn ý cùng
   lúc — đây mới là chỗ ăn điểm nặng (tối đa 1,0đ một câu). Trước
   đợt này toàn bộ mẫu có hình đều là trắc nghiệm hoặc trả lời
   ngắn, nên Phần II không bao giờ gặp hình.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const S = TD.soVN;
/* dấu trừ phải là U+2212 cho giống đề in, không dùng gạch nối ASCII */
const sn = v => String(v).replace('-', '−').replace('.', ',');

/* Chọn 4 ý từ kho, bắt buộc có cả ý đúng lẫn ý sai — đề thật không
   bao giờ cho cả bốn ý cùng đúng hoặc cùng sai. */
const chon4 = (R, kho) => {
  for (let lan = 0; lan < 30; lan++) {
    const y = TD.xaoR(R, kho).slice(0, 4);
    const d = y.filter(x => x.a).length;
    if (d >= 1 && d <= 3) return y;
  }
  return null;
};
const nhan = ['a', 'b', 'c', 'd'];
const ghepGiai = y => y.map((x, k) => `Ý ${nhan[k]} ${x.a ? 'ĐÚNG' : 'SAI'}: ${x.v}`).join('\n');

/* ============================================================
   TOÁN — ĐỒ THỊ HÀM BẬC BA, SOI BỐN Ý
   ============================================================ */
TD.GEN.toan = (TD.GEN.toan || []).concat([

{ ma: 'toan-hinh-dothi-ds', chuong: 'Đạo hàm – Khảo sát', muc: 3, dang: 'ds',
  tao(R) {
    const a = R.chon([1, -1]);
    const d = R.nguyen(-2, 2);
    /* y = a(x³ − 3x) + d ⇒ y′ = 3a(x² − 1), cực trị tại x = ±1, các giá trị đều nguyên */
    const f = x => a * (x * x * x - 3 * x) + d;
    const xCD = a > 0 ? -1 : 1, xCT = a > 0 ? 1 : -1;
    const yCD = f(xCD), yCT = f(xCT);
    const hinh = TD.hinhDoThi(f, {
      xMin: -2.6, xMax: 2.6, yMin: yCT - 2.5, yMax: yCD + 2.5,
      diem: [{ x: xCD, y: yCD, ten: '' }, { x: xCT, y: yCT, ten: '' }]
    });
    const kTung = R.chon([d, d + 1, d - 1]);
    const zCD = R.chon([-1, 1]);
    const vCD = R.chon([yCD, yCT]);
    const y = chon4(R, [
      { t: `Đồ thị hàm số cắt trục tung tại điểm có tung độ bằng ${sn(kTung)}.`, a: kTung === d,
        v: `thay x = 0 vào hàm số thì hai hạng tử chứa x đều triệt tiêu, còn lại đúng hệ số tự do, `
          + `nên đồ thị cắt trục tung tại tung độ ${sn(d)}${kTung === d ? '' : ' chứ không phải ' + sn(kTung)}.` },
      { t: `Hàm số đạt cực đại tại điểm x = ${sn(zCD)}.`, a: zCD === xCD,
        v: `nhìn hình, đỉnh "nhô lên" (cực đại) nằm ở x = ${sn(xCD)} còn đáy "trũng xuống" (cực tiểu) nằm ở x = ${sn(xCT)}`
          + `${zCD === xCD ? '' : ', nên ý này chỉ đúng nhãn mà sai vị trí'}.` },
      { t: `Hàm số nghịch biến trên khoảng (−1; 1).`, a: a > 0,
        v: a > 0
          ? `trong khoảng giữa hai điểm cực trị, đồ thị đi XUỐNG khi nhìn từ trái sang phải ⇒ hàm nghịch biến.`
          : `trong khoảng giữa hai điểm cực trị, đồ thị đi LÊN khi nhìn từ trái sang phải ⇒ hàm ĐỒNG biến chứ không nghịch biến.` },
      { t: `Giá trị cực đại của hàm số bằng ${sn(vCD)}.`, a: vCD === yCD,
        v: `giá trị cực đại là tung độ của đỉnh nhô lên, đọc trên hình được ${sn(yCD)}`
          + `${vCD === yCD ? '' : `; con số ${sn(vCD)} là giá trị cực TIỂU`}.` },
      { t: `Đồ thị hàm số có ${a > 0 ? 'nhánh bên phải đi lên' : 'nhánh bên phải đi xuống'} nên hệ số của x³ ${a > 0 ? 'dương' : 'âm'}.`, a: true,
        v: `với hàm bậc ba, dáng của nhánh ngoài cùng bên phải quyết định dấu hệ số bậc ba — đi lên thì dương, đi xuống thì âm.` },
      { t: `Hàm số đã cho có ba điểm cực trị.`, a: false,
        v: `đồ thị chỉ đổi chiều hai lần, và hàm bậc ba nhiều nhất cũng chỉ có hai điểm cực trị.` }
    ]);
    if (!y) return null;
    return { q: `Cho hàm số y = f(x) có đồ thị như hình vẽ.${hinh}Xét các phát biểu sau:`,
      items: y, giai: ghepGiai(y),
      meo: 'Câu đúng/sai về đồ thị luôn có ít nhất một ý chỉ cần NHÌN (cắt trục tung, nhánh phải lên hay xuống) '
        + 'và một ý phải phân biệt cực đại với cực tiểu. Làm hai ý nhìn được trước để chắc 0,25đ rồi mới cân nhắc phần còn lại.' };
  } }

]);

/* ============================================================
   VẬT LÍ — ĐỒ THỊ (V; p) CỦA ĐẲNG QUÁ TRÌNH
   ============================================================ */
TD.GEN.ly = (TD.GEN.ly || []).concat([

{ ma: 'ly-hinh-pv-ds', chuong: 'Khí lí tưởng', muc: 3, dang: 'ds',
  tao(R) {
    const loai = R.chon(['nhiet', 'tich', 'ap']);
    const p1 = R.nguyen(2, 4), V1 = R.nguyen(1, 2), he = p1 * V1;
    /* Đẳng tích = đường thẳng ĐỨNG tại V = V₁. Trước đây cố nặn nó ra từ
       hàm f(v) nên chỉ vẽ được một gạch ngang cụt vài pixel — nhìn không ra
       cái gì, mà đáp án lại bắt nhận diện đúng đường thẳng đứng. */
    const f = loai === 'nhiet' ? (v => he / v)
            : loai === 'tich' ? (() => NaN)
            : (() => p1);
    const hinh = TD.hinhDoThi(f, { xMin: 0.2, xMax: 5, yMin: 0, yMax: 6, tenX: 'V', tenY: 'p',
      duongDung: loai === 'tich' ? [V1] : [] });
    const ten = { nhiet: 'đẳng nhiệt', tich: 'đẳng tích', ap: 'đẳng áp' };
    const dangHoi = R.chon(['nhiet', 'tich', 'ap']);
    const y = chon4(R, [
      { t: `Đồ thị mô tả quá trình ${ten[dangHoi]}.`, a: dangHoi === loai,
        v: `trong hệ (V; p): đẳng nhiệt là đường cong hypebol, đẳng tích là đường thẳng ĐỨNG, đẳng áp là đường thẳng NẰM NGANG. `
          + `Hình đã cho ứng với quá trình ${ten[loai]}.` },
      { t: 'Trong quá trình này, tích của áp suất và thể tích giữ nguyên giá trị.', a: loai === 'nhiet',
        v: loai === 'nhiet'
          ? `đúng nội dung định luật Boyle cho quá trình đẳng nhiệt.`
          : `tích áp suất với thể tích chỉ không đổi ở quá trình đẳng nhiệt, còn hình này là quá trình ${ten[loai]}.` },
      { t: 'Trong quá trình này, nhiệt độ tuyệt đối của khối khí giữ nguyên.', a: loai === 'nhiet',
        v: loai === 'nhiet' ? `đẳng nhiệt nghĩa là nhiệt độ không đổi.`
          : `quá trình ${ten[loai]} giữ ${loai === 'tich' ? 'thể tích' : 'áp suất'} không đổi, còn nhiệt độ thì thay đổi.` },
      { t: 'Trong quá trình này, thể tích của khối khí giữ nguyên.', a: loai === 'tich',
        v: loai === 'tich' ? `đường thẳng đứng nghĩa là hoành độ (thể tích) không đổi.`
          : `thể tích chỉ giữ nguyên khi đường biểu diễn là đường thẳng đứng; hình này không phải như vậy.` },
      { t: 'Trong quá trình này, áp suất của khối khí giữ nguyên.', a: loai === 'ap',
        v: loai === 'ap' ? `đường thẳng nằm ngang nghĩa là tung độ (áp suất) không đổi.`
          : `áp suất chỉ giữ nguyên khi đường biểu diễn nằm ngang; hình này không phải như vậy.` },
      { t: 'Với một lượng khí lí tưởng xác định, thương của tích áp suất với thể tích chia cho nhiệt độ tuyệt đối luôn là hằng số.', a: true,
        v: `đây là phương trình trạng thái của khí lí tưởng, đúng cho mọi quá trình chứ không riêng ba đẳng quá trình.` },
      { t: 'Đường biểu diễn quá trình đẳng tích trong hệ toạ độ (T; p) là một đường thẳng đi qua gốc toạ độ.', a: true,
        v: `khi thể tích không đổi thì áp suất tỉ lệ thuận với nhiệt độ tuyệt đối, nên đồ thị là nửa đường thẳng xuất phát từ gốc.` }
    ]);
    if (!y) return null;
    return { q: `Một lượng khí lí tưởng biến đổi trạng thái theo đồ thị trong hệ toạ độ (V; p) sau, `
        + `trục hoành là thể tích V, trục tung là áp suất p.${hinh}Xét các phát biểu sau:`,
      items: y, giai: ghepGiai(y),
      meo: 'Bước một: đọc DÁNG đường để gọi tên quá trình. Bước hai: mỗi đẳng quá trình giữ nguyên đúng MỘT đại lượng — '
        + 'gạch tên đại lượng đó ra lề rồi soi từng ý sẽ không bị rối.' };
  } }

]);

/* ============================================================
   HOÁ — ĐỒ THỊ NHỎ NaOH VÀO DUNG DỊCH AlCl₃
   ============================================================ */
TD.GEN.hoa = (TD.GEN.hoa || []).concat([

{ ma: 'hoa-hinh-kettua-ds', chuong: 'IA – IIA – Nhôm', muc: 3, dang: 'ds',
  tao(R) {
    const a = R.nguyen(2, 20) * 0.05;                    /* mol AlCl₃ */
    const ba = TD.lamTron(3 * a, 4), bon = TD.lamTron(4 * a, 4);
    const hinh = TD.hinhKetTua(a, []);
    const vDinh = R.chon([ba, bon]);
    const vTan = R.chon([bon, ba]);
    const vMax = R.chon([a, TD.lamTron(2 * a, 4)]);
    const y = chon4(R, [
      { t: `Kết tủa đạt giá trị lớn nhất khi số mol NaOH đã dùng bằng ${S(vDinh, 2)} mol.`, a: vDinh === ba,
        v: `tới đỉnh đồ thị, toàn bộ Al³⁺ vừa chuyển hết thành Al(OH)₃ theo tỉ lệ mỗi ion nhôm cần ba ion hydroxide, `
          + `nên số mol NaOH ở đỉnh là ${S(ba, 2)} mol${vDinh === ba ? '' : ' chứ không phải ' + S(vDinh, 2) + ' mol'}.` },
      { t: `Kết tủa tan hết khi số mol NaOH đã dùng bằng ${S(vTan, 2)} mol.`, a: vTan === bon,
        v: `sau đỉnh, mỗi mol Al(OH)₃ cần thêm đúng một mol hydroxide nữa để tan thành aluminate, `
          + `nên tổng cộng hết ${S(bon, 2)} mol thì đồ thị chạm trục hoành${vTan === bon ? '' : `; con số ${S(vTan, 2)} mol mới chỉ là lúc kết tủa cực đại`}.` },
      { t: `Lượng kết tủa lớn nhất thu được là ${S(vMax, 2)} mol.`, a: vMax === TD.lamTron(a, 4),
        v: `mỗi ion nhôm cho đúng một phân tử hydroxide, nên kết tủa cực đại bằng đúng số mol muối ban đầu là ${S(a, 2)} mol`
          + `${vMax === TD.lamTron(a, 4) ? '' : ', không thể gấp đôi lượng nhôm có trong dung dịch'}.` },
      { t: 'Ở nhánh đi xuống của đồ thị, kết tủa bị hoà tan do phản ứng giữa aluminium hydroxide với dung dịch kiềm dư.', a: true,
        v: `Al(OH)₃ là hydroxide lưỡng tính nên tan được trong kiềm dư, tạo thành muối aluminate tan.` },
      { t: 'Ở nhánh đi lên của đồ thị, cứ một mol ion nhôm cần bốn mol ion hydroxide để tạo kết tủa cực đại.', a: false,
        v: `nhánh đi lên chỉ có phản ứng tạo kết tủa, tỉ lệ là một ion nhôm với ba ion hydroxide; con số bốn là tổng lượng cần dùng để vừa tạo rồi vừa hoà tan hết kết tủa.` },
      { t: 'Nếu thay dung dịch NaOH bằng dung dịch NH₃ dư thì đồ thị sẽ không có nhánh đi xuống.', a: true,
        v: `NH₃ là base yếu, không hoà tan được Al(OH)₃, nên kết tủa đạt cực đại rồi giữ nguyên chứ không tan trở lại.` }
    ]);
    if (!y) return null;
    return { q: `Nhỏ từ từ dung dịch NaOH vào dung dịch chứa ${S(a, 2)} mol AlCl₃. Số mol kết tủa thu được biến thiên `
        + `theo số mol NaOH như đồ thị sau (a = ${S(a, 2)} mol).${hinh}Xét các phát biểu sau:`,
      items: y, giai: ghepGiai(y),
      meo: 'Ba mốc phải thuộc lòng của đồ thị nhôm: đỉnh ở 3a · chạm trục hoành ở 4a · kết tủa cực đại đúng bằng a. '
        + 'Nhớ ba mốc này thì mọi ý đúng/sai chỉ còn là so số.' };
  } }

]);

/* ============================================================
   SINH — SƠ ĐỒ PHẢ HỆ, SOI BỐN Ý
   ============================================================ */
TD.GEN.sinh = (TD.GEN.sinh || []).concat([

{ ma: 'sinh-hinh-phahe-ds', chuong: 'Di truyền người', muc: 3, dang: 'ds',
  tao(R) {
    const nguoi = [
      { id: '1', doi: 1, x: 1, nam: true, benh: false },
      { id: '2', doi: 1, x: 2, nam: false, benh: false },
      { id: '3', doi: 1, x: 4, nam: true, benh: false },
      { id: '4', doi: 1, x: 5, nam: false, benh: false },
      { id: '5', doi: 2, x: 1, nam: false, benh: true },
      { id: '6', doi: 2, x: 2.5, nam: true, benh: false },
      { id: '7', doi: 2, x: 4, nam: false, benh: false },
      { id: '8', doi: 2, x: 5.5, nam: true, benh: false },
      { id: '9', doi: 3, x: 3, nam: true, benh: true },
      { id: '10', doi: 3, x: 4.5, nam: false, benh: false }
    ];
    const hinh = TD.hinhPhaHe(nguoi,
      [['1', '2'], ['3', '4'], ['6', '7']],
      [{ cha: '1', me: '2', ds: ['5', '6'] }, { cha: '3', me: '4', ds: ['7', '8'] }, { cha: '6', me: '7', ds: ['9', '10'] }]);
    const xs = R.chon(['25%', '50%', '75%']);
    const y = chon4(R, [
      { t: 'Bệnh trên do một gen lặn nằm trên nhiễm sắc thể thường quy định.', a: true,
        v: `cặp (1) × (2) đều bình thường mà sinh con (5) bị bệnh ⇒ gen gây bệnh là gen LẶN. `
          + `Người (5) lại là NỮ; nếu gen lặn nằm trên X thì bố (1) phải bị bệnh, mà (1) bình thường ⇒ gen nằm trên nhiễm sắc thể THƯỜNG.` },
      { t: 'Bệnh trên do gen lặn nằm trên vùng không tương đồng của nhiễm sắc thể X quy định.', a: false,
        v: `nếu vậy thì người nữ (5) bị bệnh phải nhận allele bệnh từ bố, tức bố (1) cũng phải bị bệnh — trái với phả hệ.` },
      { t: 'Người số (9) chắc chắn có kiểu gen đồng hợp lặn.', a: true,
        v: `(9) biểu hiện bệnh mà bệnh do gen lặn quy định, nên chỉ có thể mang hai allele lặn.` },
      { t: 'Cả hai người số (1) và số (2) đều có kiểu gen dị hợp.', a: true,
        v: `hai người bình thường sinh ra con (5) đồng hợp lặn, nên mỗi người phải cho một allele lặn mà bản thân vẫn không biểu hiện bệnh.` },
      { t: 'Người số (8) chắc chắn có kiểu gen dị hợp.', a: false,
        v: `(8) là con của cặp (3) × (4), trong nhánh này chưa có ai biểu hiện bệnh nên (8) có thể đồng hợp trội hoặc dị hợp — không xác định chắc chắn được.` },
      { t: `Nếu cặp vợ chồng số (6) và số (7) sinh thêm một người con thì xác suất người con đó bị bệnh là ${xs}.`, a: xs === '25%',
        v: `(6) và (7) đều bình thường mà đã sinh con (9) bị bệnh nên cả hai đều dị hợp; phép lai giữa hai cơ thể dị hợp cho đời con `
          + `có một phần tư đồng hợp lặn, tức xác suất bị bệnh là 25%${xs === '25%' ? '' : ` chứ không phải ${xs}`}.` },
      { t: 'Người số (5) và người số (9) có kiểu gen giống nhau về gen gây bệnh.', a: true,
        v: `cả hai đều biểu hiện bệnh do gen lặn nên đều mang hai allele lặn.` }
    ]);
    if (!y) return null;
    return { q: `Cho sơ đồ phả hệ về một bệnh ở người, trong đó hình tô đậm là người bị bệnh:${hinh}Xét các phát biểu sau:`,
      items: y, giai: ghepGiai(y),
      meo: 'Trình tự đọc phả hệ không bao giờ đổi: ① bố mẹ bình thường sinh con bệnh ⇒ gen LẶN '
        + '② tìm một người NỮ bị bệnh, nếu bố cô ấy bình thường thì gen nằm trên nhiễm sắc thể THƯỜNG '
        + '③ người bệnh luôn đồng hợp lặn, bố mẹ bình thường của họ luôn dị hợp.' };
  } }

]);

/* ============================================================
   ĐỊA LÍ — ĐỌC BIỂU ĐỒ CỘT, SOI BỐN Ý
   ============================================================ */
TD.GEN.dia = (TD.GEN.dia || []).concat([

{ ma: 'dia-hinh-cot-ds', chuong: 'Kỹ năng', muc: 2, dang: 'ds',
  tao(R) {
    const nam = [2015, 2018, 2020, 2022];
    /* Mỗi chỉ tiêu có một khoảng giá trị THẬT của nước ta. Dùng chung một
       thang 20 – 100 cho tất cả thì ra "62 triệu lượt khách quốc tế", gấp
       ba lần con số thật, học sinh học Địa nhìn là biết bịa. */
    const doiTuong = R.chon([
      { ten: 'sản lượng thuỷ sản nuôi trồng', dv: 'nghìn tấn', tu: 3300, den: 4200, buoc: 480 },
      { ten: 'sản lượng điện', dv: 'tỉ kWh', tu: 160, den: 200, buoc: 26 },
      { ten: 'số lượt khách du lịch quốc tế', dv: 'triệu lượt', tu: 6, den: 9, buoc: 4 },
      { ten: 'giá trị xuất khẩu hàng dệt may', dv: 'tỉ USD', tu: 22, den: 28, buoc: 6 }
    ]);
    const v = [R.nguyen(doiTuong.tu, doiTuong.den)];
    for (let i = 1; i < 4; i++) v.push(v[i - 1] + R.nguyen(-Math.round(doiTuong.buoc / 4), doiTuong.buoc));
    /* mọi năm phải khác nhau, nếu không thì ý "năm nào lớn nhất" mất nghĩa */
    if (v.some(x => x <= 0) || new Set(v).size < v.length) return null;
    const ds = nam.map((n, i) => ({ ten: String(n), v: v[i] }));
    const hinh = TD.hinhCot(ds, doiTuong.dv);
    const max = Math.max.apply(null, v), min = Math.min.apply(null, v);
    const iMax = v.indexOf(max), iMin = v.indexOf(min);
    const tang = v.every((x, i) => i === 0 || x > v[i - 1]);
    const namHoi = R.nguyen(0, 3), namSo = R.nguyen(0, 3);
    const gap = v[3] > 2 * v[0];
    const y = chon4(R, [
      { t: `Năm ${nam[iMax]} có ${doiTuong.ten} lớn nhất trong giai đoạn ${nam[0]} – ${nam[3]}.`, a: true,
        v: `cột năm ${nam[iMax]} cao nhất trên biểu đồ, ứng với ${sn(max)} ${doiTuong.dv}.` },
      { t: `Năm ${nam[iMin]} có ${doiTuong.ten} nhỏ nhất trong giai đoạn ${nam[0]} – ${nam[3]}.`, a: true,
        v: `cột năm ${nam[iMin]} thấp nhất trên biểu đồ, ứng với ${sn(min)} ${doiTuong.dv}.` },
      { t: `${doiTuong.ten.charAt(0).toUpperCase() + doiTuong.ten.slice(1)} tăng liên tục qua các năm.`, a: tang,
        v: tang ? `bốn cột cao dần đều từ trái sang phải, không có năm nào giảm.`
          : `có năm bị giảm so với năm trước đó (cột thấp hơn cột liền trước), nên không thể nói là tăng liên tục.` },
      { t: `Năm ${nam[3]} có ${doiTuong.ten} gấp hơn hai lần năm ${nam[0]}.`, a: gap,
        v: gap ? `so hai cột đầu và cuối: cột cuối cao hơn gấp đôi cột đầu.`
          : `cột năm ${nam[3]} có tăng so với cột năm ${nam[0]} nhưng chưa đạt gấp đôi.` },
      { t: `${doiTuong.ten.charAt(0).toUpperCase() + doiTuong.ten.slice(1)} năm ${nam[namHoi]} là ${sn(v[namSo])} ${doiTuong.dv}.`,
        a: v[namHoi] === v[namSo],
        v: v[namHoi] === v[namSo] ? `đọc số ghi ngay trên đỉnh cột năm ${nam[namHoi]}.`
          : `số ghi trên đỉnh cột năm ${nam[namHoi]} là ${sn(v[namHoi])} ${doiTuong.dv}, còn ${sn(v[namSo])} là số của năm ${nam[namSo]}.` },
      { t: 'Biểu đồ trên là dạng thích hợp nhất để thể hiện cơ cấu của đối tượng.', a: false,
        v: `biểu đồ cột thể hiện QUY MÔ và sự thay đổi qua các năm; muốn thể hiện cơ cấu phải dùng biểu đồ tròn hoặc biểu đồ miền.` }
    ]);
    if (!y) return null;
    return { q: `Cho biểu đồ về ${doiTuong.ten} của nước ta giai đoạn ${nam[0]} – ${nam[3]}:${hinh}Xét các phát biểu sau:`,
      items: y, giai: ghepGiai(y),
      meo: 'Câu biểu đồ chỉ có hai loại ý: ý ĐỌC SỐ (dóng đỉnh cột, so cao thấp) và ý NHẬN DẠNG biểu đồ. '
        + 'Ý đọc số làm trước cho chắc; ý nhận dạng thì nhớ: cột là quy mô, tròn và miền là cơ cấu, đường là tốc độ tăng trưởng.' };
  } }

]);

/* Đánh dấu mẫu có hình */
(function () {
  const MA = ['toan-hinh-dothi-ds', 'ly-hinh-pv-ds', 'hoa-hinh-kettua-ds',
              'sinh-hinh-phahe-ds', 'dia-hinh-cot-ds'];
  for (const mon of Object.keys(TD.GEN))
    for (const t of TD.GEN[mon]) if (MA.indexOf(t.ma) >= 0) t._hinh = true;
})();
})();
