/* ============================================================
   SINH HỌC — MẪU ĐỀ TỰ SINH
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const S = TD.soVN, T = TD.lamTron;

TD.GEN.sinh = [
{ ma: 'sinh-gene-N', chuong: 'Di truyền phân tử', muc: 2, dang: 'tln',
  tao(R) {
    const N = R.nguyen(15, 200) * 20;               /* bội của 20 để số chu kì xoắn nguyên */
    const L = T(N / 2 * 3.4, 2);
    const hoi = R.nguyen(1, 3);
    const C = N / 20, M = N * 300;
    const kq = hoi === 1 ? N : hoi === 2 ? C : M;
    const ten = hoi === 1 ? 'tổng số nucleotide của gene'
              : hoi === 2 ? 'số chu kì xoắn của gene'
                          : 'khối lượng phân tử của gene (đơn vị đvC)';
    return {
      q: `Một gene có chiều dài ${S(L)} Å. Tính ${ten}.`,
      ans: S(kq),
      giai: `Công thức: L = (N/2)·3,4 Å ⇒ N = 2L/3,4\n`
          + `N = 2·${S(L)}/3,4 = ${N} nucleotide\n`
          + (hoi === 1 ? `Vậy tổng số nucleotide là ${N}.`
             : hoi === 2 ? `Số chu kì xoắn: C = N/20 = ${N}/20 = ${C}.`
                         : `Khối lượng: M = N·300 = ${N}·300 = ${M} đvC.`),
      meo: 'Chiều dài tính theo SỐ CẶP nu (N/2), mỗi cặp dài 3,4 Å. Một chu kì xoắn gồm 10 cặp nu.'
    };
  } },

{ ma: 'sinh-lienket-H', chuong: 'Di truyền phân tử', muc: 3, dang: 'tln',
  tao(R) {
    const N = R.nguyen(60, 300) * 10;
    const A = R.nguyen(10, Math.floor(N / 2) - 10) * 1;
    const G = N / 2 - A;
    if (G <= 0) return null;
    const H = 2 * A + 3 * G;
    return {
      q: `Một gene có tổng số ${N} nucleotide, trong đó có ${A} nucleotide loại A. `
       + `Tính số liên kết hydrogen của gene.`,
      ans: S(H),
      giai: `Trong DNA mạch kép: A = T, G = C và A + G = N/2\n`
          + `G = N/2 − A = ${N / 2} − ${A} = ${G}\n`
          + `Số liên kết hydrogen: H = 2A + 3G = 2·${A} + 3·${G} = ${2 * A} + ${3 * G} = ${H}.`,
      meo: 'A–T có 2 liên kết hydrogen, G–C có 3. Gene giàu G–C thì bền nhiệt hơn.'
    };
  } },

{ ma: 'sinh-nhandoi', chuong: 'Nhân đôi DNA', muc: 3, dang: 'tln',
  tao(R) {
    const N = R.nguyen(30, 400) * 10;
    const k = R.nguyen(2, 6);
    const hoi = R.nguyen(1, 3);
    const soCon = Math.pow(2, k);
    const cungCap = N * (soCon - 1);
    const hoanToanMoi = soCon - 2;
    const kq = hoi === 1 ? cungCap : hoi === 2 ? soCon : hoanToanMoi;
    const ten = hoi === 1 ? 'số nucleotide mà môi trường nội bào phải cung cấp'
              : hoi === 2 ? 'số phân tử DNA con được tạo ra'
                          : 'số phân tử DNA con được cấu tạo hoàn toàn từ nucleotide mới của môi trường';
    return {
      q: `Một phân tử DNA có ${N} nucleotide, tiến hành nhân đôi ${k} lần liên tiếp. Tính ${ten}.`,
      ans: S(kq),
      giai: `Sau ${k} lần nhân đôi từ 1 phân tử mẹ:\n`
          + `· Số DNA con = 2^${k} = ${soCon}\n`
          + `· Số nu môi trường cung cấp = N·(2^${k} − 1) = ${N}·${soCon - 1} = ${cungCap}\n`
          + `· Số DNA con hoàn toàn mới = 2^${k} − 2 = ${hoanToanMoi} (vì theo nguyên tắc bán bảo toàn, luôn có đúng 2 phân tử còn giữ mạch của DNA mẹ)\n`
          + `Đáp án cần tìm: ${S(kq)}.`,
      meo: 'Nhớ trừ 1 ở công thức nu môi trường (2ᵏ − 1) và trừ 2 ở số DNA hoàn toàn mới (2ᵏ − 2).'
    };
  } },

{ ma: 'sinh-dichma', chuong: 'Phiên mã – Dịch mã', muc: 3, dang: 'tln',
  tao(R) {
    const soBoBa = R.nguyen(80, 700);
    const rN = soBoBa * 3;
    const N = rN * 2;
    const hoi = R.nguyen(1, 3);
    const kq = hoi === 1 ? soBoBa : hoi === 2 ? soBoBa - 1 : soBoBa - 2;
    const ten = hoi === 1 ? 'số bộ ba trên phân tử mRNA'
              : hoi === 2 ? 'số amino acid mà môi trường cung cấp cho quá trình dịch mã'
                          : 'số amino acid trong chuỗi polypeptide hoàn chỉnh';
    return {
      q: `Một gene có ${N} nucleotide tiến hành phiên mã rồi dịch mã. Tính ${ten}.`,
      ans: S(kq),
      giai: `Số nu trên mRNA: rN = N/2 = ${N}/2 = ${rN}\n`
          + `Số bộ ba trên mRNA: ${rN}/3 = ${soBoBa}\n`
          + `Trừ 1 bộ ba kết thúc (không mã hoá amino acid) ⇒ môi trường cung cấp ${soBoBa - 1} amino acid\n`
          + `Chuỗi HOÀN CHỈNH bị cắt bỏ methionine mở đầu ⇒ còn ${soBoBa - 2} amino acid\n`
          + `Đáp án cần tìm: ${S(kq)}.`,
      meo: 'Ba con số khác nhau: số bộ ba, số aa môi trường cung cấp (−1), số aa chuỗi hoàn chỉnh (−2). Đọc kỹ đề.'
    };
  } },

{ ma: 'sinh-hardy', chuong: 'Di truyền quần thể', muc: 3, dang: 'tln',
  tao(R) {
    const q = R.nguyen(5, 45) / 100;
    const p = T(1 - q, 2);
    const hoi = R.nguyen(1, 3);
    const q2 = T(q * q * 100, 2), hai_pq = T(2 * p * q * 100, 2), p2 = T(p * p * 100, 2);
    const kq = hoi === 1 ? hai_pq : hoi === 2 ? p2 : T((hai_pq + p2), 2);
    const ten = hoi === 1 ? 'tỉ lệ cá thể mang gene bệnh nhưng không biểu hiện (thể dị hợp)'
              : hoi === 2 ? 'tỉ lệ cá thể có kiểu gene đồng hợp trội'
                          : 'tỉ lệ cá thể không bị bệnh';
    return {
      q: `Một quần thể ở trạng thái cân bằng di truyền, bệnh do allele lặn trên nhiễm sắc thể thường quy định. `
       + `Tỉ lệ người mắc bệnh là ${S(q2)}%. Tính ${ten}, tính theo phần trăm (làm tròn đến hàng phần trăm).`,
      ans: S(kq),
      giai: `Quần thể cân bằng: p²AA + 2pqAa + q²aa = 1\n`
          + `Người bệnh (aa) chiếm q² = ${S(q2)}% = ${S(T(q * q, 4))} ⇒ q = ${S(q)}\n`
          + `p = 1 − ${S(q)} = ${S(p)}\n`
          + `· Dị hợp Aa = 2pq = 2·${S(p)}·${S(q)} = ${S(T(2 * p * q, 4))} = ${S(hai_pq)}%\n`
          + `· Đồng hợp trội AA = p² = ${S(T(p * p, 4))} = ${S(p2)}%\n`
          + `· Không bị bệnh = AA + Aa = ${S(T(p2 + hai_pq, 2))}%\n`
          + `Đáp án cần tìm: ${S(kq)}%.`,
      meo: 'Từ tỉ lệ người bệnh phải CĂN BẬC HAI mới ra tần số allele lặn q.'
    };
  } },

{ ma: 'sinh-tuthu', chuong: 'Di truyền quần thể', muc: 3, dang: 'tln',
  tao(R) {
    const n = R.nguyen(1, 8);
    const Aa0 = R.nguyen(20, 80);                    /* % dị hợp ban đầu */
    const AA0 = R.nguyen(0, 100 - Aa0);
    const aa0 = 100 - Aa0 - AA0;
    const Aa = Aa0 / Math.pow(2, n);
    const them = (Aa0 - Aa) / 2;
    const AA = AA0 + them, aa = aa0 + them;
    const hoi = R.nguyen(1, 3);
    const kq = T(hoi === 1 ? Aa : hoi === 2 ? AA : aa, 2);
    const ten = hoi === 1 ? 'Aa' : hoi === 2 ? 'AA' : 'aa';
    return {
      q: `Một quần thể có cấu trúc di truyền ban đầu ${S(AA0)}% AA : ${S(Aa0)}% Aa : ${S(aa0)}% aa, `
       + `tiến hành tự thụ phấn qua ${n} thế hệ. Tính tỉ lệ cá thể có kiểu gene ${ten} ở thế hệ thứ ${n}, `
       + `theo phần trăm (làm tròn đến hàng phần trăm).`,
      ans: S(kq),
      giai: `Tự thụ phấn chỉ làm biến đổi phần dị hợp; phần đồng hợp ban đầu giữ nguyên và được cộng thêm.\n`
          + `· Aa sau ${n} thế hệ = ${S(Aa0)}% × (1/2)^${n} = ${S(Aa0)}%/${Math.pow(2, n)} = ${S(T(Aa, 4))}%\n`
          + `· Phần dị hợp chuyển thành đồng hợp = ${S(Aa0)}% − ${S(T(Aa, 4))}% = ${S(T(Aa0 - Aa, 4))}%, chia đều cho AA và aa\n`
          + `  ⇒ mỗi bên nhận thêm ${S(T(them, 4))}%\n`
          + `· AA = ${S(AA0)}% + ${S(T(them, 4))}% = ${S(T(AA, 4))}%\n`
          + `· aa = ${S(aa0)}% + ${S(T(them, 4))}% = ${S(T(aa, 4))}%\n`
          + `Đáp án cần tìm: ${S(kq)}%.`,
      meo: 'Tự thụ làm TĂNG đồng hợp, GIẢM dị hợp, nhưng KHÔNG đổi tần số allele của quần thể.'
    };
  } },

{ ma: 'sinh-hoanvi', chuong: 'Hoán vị gene', muc: 4, dang: 'tln',
  tao(R) {
    const f = R.nguyen(2, 24) * 2;                   /* tần số hoán vị, % chẵn */
    const deu = R() < 0.5;                            /* dị hợp đều AB/ab hay chéo Ab/aB */
    const hoiHV = R() < 0.5;
    const gtHV = T(f / 2, 2), gtLK = T((100 - f) / 2, 2);
    const kg = deu ? 'AB/ab' : 'Ab/aB';
    const loaiHoi = deu ? (hoiHV ? 'Ab' : 'AB') : (hoiHV ? 'AB' : 'Ab');
    const laHoanVi = deu ? hoiHV : hoiHV;             /* với AB/ab: Ab là hoán vị; với Ab/aB: AB là hoán vị */
    const kq = laHoanVi ? gtHV : gtLK;
    return {
      q: `Một cơ thể có kiểu gene ${kg}, xảy ra hoán vị gene với tần số ${f}%. `
       + `Tính tỉ lệ giao tử ${loaiHoi} được tạo ra, theo phần trăm.`,
      ans: S(kq),
      giai: `Kiểu gene ${kg} là dị hợp ${deu ? 'ĐỀU' : 'CHÉO'}.\n`
          + `⇒ Giao tử liên kết (giống bố mẹ): ${deu ? 'AB và ab' : 'Ab và aB'}\n`
          + `⇒ Giao tử hoán vị: ${deu ? 'Ab và aB' : 'AB và ab'}\n`
          + `Tổng giao tử hoán vị = f = ${f}% ⇒ mỗi loại = ${f}/2 = ${S(gtHV)}%\n`
          + `Tổng giao tử liên kết = 100% − ${f}% = ${100 - f}% ⇒ mỗi loại = ${S(gtLK)}%\n`
          + `Giao tử ${loaiHoi} là giao tử ${laHoanVi ? 'HOÁN VỊ' : 'LIÊN KẾT'} ⇒ tỉ lệ = ${S(kq)}%.`,
      meo: 'Phải xác định đúng dị hợp ĐỀU hay CHÉO mới biết loại nào là giao tử hoán vị. f ≤ 50%.'
    };
  } },

{ ma: 'sinh-sokieugen', chuong: 'Quy luật Mendel', muc: 3, dang: 'tln',
  tao(R) {
    const n = R.nguyen(2, 8);
    const tuThu = R() < 0.5;
    const hoi = R.nguyen(1, 4);
    const kg = 'AaBbCcDdEeFfGgHh'.slice(0, n * 2);
    let kq, giaiThem;
    if (tuThu) {
      kq = hoi === 1 ? Math.pow(2, n) : hoi === 2 ? Math.pow(3, n)
         : hoi === 3 ? Math.pow(2, n) : Math.pow(4, n);
      giaiThem = `· Số loại giao tử = 2^${n} = ${Math.pow(2, n)}\n`
               + `· Số kiểu tổ hợp giao tử = 2^${n} × 2^${n} = 4^${n} = ${Math.pow(4, n)}\n`
               + `· Số loại kiểu gene ở đời con = 3^${n} = ${Math.pow(3, n)}\n`
               + `· Số loại kiểu hình (trội hoàn toàn) = 2^${n} = ${Math.pow(2, n)}`;
    } else {
      /* lai phân tích: cơ thể kia đồng hợp lặn, chỉ cho 1 loại giao tử */
      kq = hoi === 1 ? Math.pow(2, n) : hoi === 2 ? Math.pow(2, n)
         : hoi === 3 ? Math.pow(2, n) : Math.pow(2, n);
      giaiThem = `Cơ thể đồng hợp lặn chỉ cho 1 loại giao tử nên mọi số lượng đều bằng số loại giao tử của cơ thể dị hợp:\n`
               + `· Số loại giao tử của ${kg} = 2^${n} = ${Math.pow(2, n)}\n`
               + `· Số kiểu tổ hợp = 2^${n} × 1 = ${Math.pow(2, n)}\n`
               + `· Số loại kiểu gene và kiểu hình ở đời con đều = ${Math.pow(2, n)}`;
    }
    const ten = hoi === 1 ? `số loại giao tử tối đa mà cơ thể ${kg} tạo ra`
              : hoi === 2 ? 'số loại kiểu gene tối đa ở đời con'
              : hoi === 3 ? 'số loại kiểu hình ở đời con (các gene trội hoàn toàn)'
                          : 'số kiểu tổ hợp giao tử ở đời con';
    return {
      q: `Cho cơ thể có kiểu gene ${kg} (các cặp gene phân li độc lập) ${tuThu ? 'tự thụ phấn' : 'lai phân tích'}. Tính ${ten}.`,
      ans: S(kq),
      giai: `Cơ thể dị hợp ${n} cặp gene phân li độc lập${tuThu ? ', tự thụ phấn' : ', lai với cơ thể đồng hợp lặn'}:\n`
          + giaiThem + `\nĐáp án cần tìm: ${S(kq)}.`,
      meo: 'Tự thụ: giao tử 2ⁿ, kiểu gene 3ⁿ, kiểu hình 2ⁿ. Lai phân tích: mọi số đều bằng 2ⁿ vì bên kia chỉ cho 1 loại giao tử.'
    };
  } },

{ ma: 'sinh-giamphan', chuong: 'Giảm phân', muc: 2, dang: 'tln',
  tao(R) {
    const so = R.nguyen(3, 60);
    const laDuc = R() < 0.5;
    const kq = laDuc ? so * 4 : so;
    return {
      q: `Có ${so} tế bào sinh ${laDuc ? 'tinh' : 'trứng'} của một loài động vật tiến hành giảm phân bình thường. `
       + `Số ${laDuc ? 'tinh trùng' : 'trứng'} được tạo ra là bao nhiêu?`,
      ans: S(kq),
      giai: laDuc
        ? `Mỗi tế bào sinh tinh giảm phân tạo 4 tinh trùng đều có khả năng thụ tinh.\nSố tinh trùng = ${so} × 4 = ${kq}.`
        : `Mỗi tế bào sinh trứng giảm phân tạo 4 tế bào con nhưng chỉ 1 phát triển thành trứng, 3 tế bào còn lại thoái hoá thành thể cực.\n`
          + `Số trứng = ${so} × 1 = ${kq}.\n(Số thể cực tạo ra là ${so * 3}.)`,
      meo: 'Tế bào sinh tinh → 4 tinh trùng. Tế bào sinh trứng → chỉ 1 trứng + 3 thể cực. Bẫy kinh điển.'
    };
  } },

{ ma: 'sinh-nguyenphan', chuong: 'Nguyên phân', muc: 2, dang: 'tln',
  tao(R) {
    const so = R.nguyen(1, 12);
    const k = R.nguyen(2, 8);
    const con = so * Math.pow(2, k);
    const hoi = R() < 0.5;
    const moi = con - so;
    return {
      q: `Có ${so} tế bào tiến hành nguyên phân liên tiếp ${k} lần. `
       + `Tính ${hoi ? 'tổng số tế bào con được tạo ra' : 'số tế bào con mới được sinh thêm so với ban đầu'}.`,
      ans: S(hoi ? con : moi),
      giai: `Sau ${k} lần nguyên phân, mỗi tế bào tạo ra 2^${k} = ${Math.pow(2, k)} tế bào con.\n`
          + `Tổng số tế bào con = ${so} × 2^${k} = ${con}\n`
          + (hoi ? `Đáp án: ${con}.` : `Số tế bào sinh thêm = ${con} − ${so} = ${moi}.`),
      meo: 'Nguyên phân giữ nguyên bộ nhiễm sắc thể 2n; giảm phân mới làm giảm một nửa.'
    };
  } },

{ ma: 'sinh-hieusuat', chuong: 'Sinh thái học', muc: 3, dang: 'tln',
  tao(R) {
    const mu = R.nguyen(4, 8);
    const E0 = Math.pow(10, mu);
    const H = R.chon([10, 12, 15, 20, 8, 5]) / 100;
    const bac = R.nguyen(2, 4);
    const E = T(E0 * Math.pow(H, bac - 1), 4);
    if (E < 1) return null;
    return {
      q: `Trong một chuỗi thức ăn, sinh vật sản xuất tích luỹ được ${S(E0)} kcal. Hiệu suất sinh thái giữa các bậc `
       + `dinh dưỡng liền kề đều bằng ${S(H * 100)}%. Tính năng lượng tích luỹ ở bậc dinh dưỡng cấp ${bac} (kcal).`,
      ans: S(E),
      giai: `Sinh vật sản xuất là bậc dinh dưỡng cấp 1.\n`
          + `Từ cấp 1 lên cấp ${bac} phải qua ${bac - 1} lần chuyển hoá.\n`
          + `E = ${S(E0)} × ${S(H)}^${bac - 1} = ${S(E)} kcal.`,
      meo: 'Sinh vật SẢN XUẤT là bậc dinh dưỡng cấp 1. Từ cấp 1 lên cấp n phải nhân hiệu suất (n−1) lần.'
    };
  } },

{ ma: 'sinh-lechboi', chuong: 'Đột biến NST', muc: 2, dang: 'tln',
  tao(R) {
    const loai = R.chon([
      { t: 'người', n2: 46 }, { t: 'ruồi giấm', n2: 8 }, { t: 'đậu Hà Lan', n2: 14 },
      { t: 'ngô', n2: 20 }, { t: 'lúa nước', n2: 24 }, { t: 'cà chua', n2: 24 },
      { t: 'tinh tinh', n2: 48 }, { t: 'lúa mì', n2: 42 }, { t: 'khoai tây', n2: 48 },
      { t: 'bắp cải', n2: 18 }, { t: 'củ cải', n2: 18 }, { t: 'gà', n2: 78 },
      { t: 'bò', n2: 60 }, { t: 'mèo', n2: 38 }, { t: 'chó', n2: 78 }, { t: 'thỏ', n2: 44 }
    ]);
    const the = R.chon([
      { t: 'thể một', d: -1 }, { t: 'thể ba', d: +1 }, { t: 'thể không', d: -2 },
      { t: 'thể bốn', d: +2 }, { t: 'thể tam bội', d: 'x1.5' }, { t: 'thể tứ bội', d: 'x2' }
    ]);
    let kq, gt;
    if (the.d === 'x1.5') { if (loai.n2 % 2) return null; kq = loai.n2 / 2 * 3; gt = `Thể tam bội có bộ 3n = 3 × ${loai.n2 / 2} = ${kq}`; }
    else if (the.d === 'x2') { kq = loai.n2 * 2; gt = `Thể tứ bội có bộ 4n = 2 × ${loai.n2} = ${kq}`; }
    else { kq = loai.n2 + the.d; gt = `${the.t} có bộ 2n ${the.d > 0 ? '+ ' + the.d : '− ' + (-the.d)} = ${loai.n2} ${the.d > 0 ? '+ ' + the.d : '− ' + (-the.d)} = ${kq}`; }
    return {
      q: `Ở ${loai.t} có bộ nhiễm sắc thể lưỡng bội 2n = ${loai.n2}. Một ${the.t} của loài này có bao nhiêu nhiễm sắc thể?`,
      ans: S(kq),
      giai: `Bộ lưỡng bội 2n = ${loai.n2} ⇒ n = ${loai.n2 / 2}\n${gt}.`,
      meo: 'Lệch bội thay đổi số NST ở MỘT vài cặp (2n±1, 2n±2). Đa bội thay đổi CẢ BỘ (3n, 4n).'
    };
  } },

{ ma: 'sinh-tansoallele', chuong: 'Di truyền quần thể', muc: 3, dang: 'tln',
  tao(R) {
    const AA = R.nguyen(5, 60), Aa = R.nguyen(5, 60);
    const aa = 100 - AA - Aa;
    if (aa < 5) return null;
    const p = T((AA + Aa / 2) / 100, 4);
    const hoiP = R() < 0.5;
    return {
      q: `Một quần thể có cấu trúc di truyền ${S(AA / 100)} AA : ${S(Aa / 100)} Aa : ${S(aa / 100)} aa. `
       + `Tính tần số allele ${hoiP ? 'A' : 'a'} của quần thể. (làm tròn đến hàng phần trăm)`,
      ans: S(T(hoiP ? p : 1 - p, 2)),
      giai: `Tần số allele A: p = (tỉ lệ AA) + (tỉ lệ Aa)/2 = ${S(AA / 100)} + ${S(Aa / 100)}/2 = ${S(p)}\n`
          + `Tần số allele a: q = 1 − p = ${S(T(1 - p, 4))}\n`
          + `Đáp án cần tìm: ${S(T(hoiP ? p : 1 - p, 2))}.`,
      meo: 'Công thức: p = AA + Aa/2 và q = aa + Aa/2. Kiểm tra p + q phải bằng 1.' 
    };
  } },

{ ma: 'sinh-peptide-lk', chuong: 'Dịch mã', muc: 3, dang: 'tln',
  tao(R) {
    const aa = R.nguyen(50, 500);
    const hoi = R() < 0.5;
    return {
      q: `Một chuỗi polypeptide hoàn chỉnh có ${aa} amino acid. Tính ${hoi ? 'số liên kết peptide trong chuỗi' : 'số phân tử nước được giải phóng khi hình thành chuỗi'}.`,
      ans: S(aa - 1),
      giai: `Cứ hai amino acid liên kết với nhau thì tạo 1 liên kết peptide và giải phóng 1 phân tử nước.\n`
          + `Chuỗi có ${aa} amino acid ⇒ số liên kết peptide = số phân tử nước = ${aa} − 1 = ${aa - 1}.`,
      meo: 'Số liên kết peptide = số phân tử nước = số amino acid − 1. Hai đại lượng luôn bằng nhau.'
    };
  } },

{ ma: 'sinh-mtcungcap-aa', chuong: 'Dịch mã', muc: 3, dang: 'tln',
  tao(R) {
    const aa = R.nguyen(50, 400);
    const soRibo = R.nguyen(2, 10);
    const tong = aa * soRibo;
    return {
      q: `Có ${soRibo} ribosome cùng trượt qua một phân tử mRNA (không lặp lại). Biết mỗi chuỗi polypeptide `
       + `được tổng hợp cần môi trường cung cấp ${aa} amino acid. Tính tổng số amino acid môi trường phải cung cấp.`,
      ans: S(tong),
      giai: `Mỗi ribosome trượt qua mRNA tổng hợp được 1 chuỗi polypeptide.\n`
          + `${soRibo} ribosome ⇒ tạo ${soRibo} chuỗi polypeptide.\n`
          + `Tổng amino acid cần cung cấp = ${soRibo} × ${aa} = ${tong}.`,
      meo: 'Nhiều ribosome cùng dịch mã trên một mRNA tạo thành polysome, giúp tăng nhanh số chuỗi polypeptide.'
    };
  } },

{ ma: 'sinh-adn-tile', chuong: 'Di truyền phân tử', muc: 3, dang: 'tln',
  tao(R) {
    const N = R.nguyen(60, 300) * 10;
    const ptA = R.nguyen(10, 40);                     /* %A */
    const A = Math.round(N * ptA / 100);
    const G = N / 2 - A;
    if (G <= 0) return null;
    const hoi = R() < 0.5;
    const ptG = T(G / N * 100, 2);
    return {
      q: `Một gene có ${N} nucleotide, trong đó nucleotide loại A chiếm ${ptA}% tổng số nucleotide. `
       + `Tính ${hoi ? 'số nucleotide loại G của gene' : 'tỉ lệ phần trăm nucleotide loại G của gene'}. `
       + (hoi ? '' : '(làm tròn đến hàng phần trăm)'),
      ans: S(hoi ? G : ptG),
      giai: `Số nu loại A: A = ${N} × ${ptA}% = ${A}\n`
          + `Trong DNA mạch kép: A + G = N/2 = ${N / 2}\n`
          + `⇒ G = ${N / 2} − ${A} = ${G} nucleotide\n`
          + `Tỉ lệ: %G = ${G}/${N} × 100 = ${S(ptG)}%\n`
          + `Đáp án cần tìm: ${S(hoi ? G : ptG)}.`,
      meo: 'Luôn nhớ %A + %G = 50% và A = T, G = C trong DNA mạch kép.'
    };
  } }
];
})();
