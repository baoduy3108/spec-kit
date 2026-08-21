/* ============================================================
   BỔ SUNG MẪU VẬN DỤNG CAO — VẬT LÍ & SINH HỌC
   Hai môn này chỉ có 8 và 7 mẫu mức 4, ít nhất trong bốn môn tự
   nhiên, nên đề Cửu Trọng Lôi Kiếp không kéo nổi tỉ lệ câu khó lên
   mức đã hứa (Sinh 46%, Lí 50% so với mục tiêu 55%).
   Mỗi mẫu ở đây đều là bài nhiều bước, và sẽ tự có thêm một bản
   song sinh dạng trắc nghiệm cho Phần I.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const S = TD.soVN;
const T = TD.lamTron;
const D = TD.dapSo;

/* ==========================================================
   VẬT LÍ
   ========================================================== */
TD.GEN.ly = (TD.GEN.ly || []).concat([

/* --- Hai bình khí thông nhau rồi nung nóng: hai giai đoạn nối tiếp --- */
{ ma: 'ly-vdc-haibinh', chuong: 'Khí lí tưởng', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const V1 = R.nguyen(2, 8), V2 = R.nguyen(2, 8);
    const p1 = R.nguyen(2, 9), p2 = R.nguyen(1, 6);
    if (p1 === p2) return null;
    const t1 = R.chon([27, 37, 47, 57]);
    const t2 = t1 + R.chon([50, 80, 100, 150]);
    const T1 = t1 + 273, T2 = t2 + 273;
    const pChung = (p1 * V1 + p2 * V2) / (V1 + V2);
    const pCuoi = T(pChung * T2 / T1, 3);
    return {
      q: `Hai bình kín có thể tích ${S(V1)} lít và ${S(V2)} lít được nối với nhau bằng một ống nhỏ có khoá, `
        + `thể tích ống không đáng kể. Bình thứ nhất chứa khí ở áp suất ${S(p1)} atm, bình thứ hai chứa cùng loại khí `
        + `ở áp suất ${S(p2)} atm, cả hai cùng ở nhiệt độ ${S(t1)} °C. Mở khoá cho hai bình thông nhau, `
        + `sau đó nung nóng toàn bộ hệ lên ${S(t2)} °C. Tính áp suất của khí trong hệ khi đó. `
        + `(đơn vị atm, làm tròn đến hàng phần nghìn)`,
      ans: D(pCuoi, 3),
      giai: `Bước 1 — giai đoạn mở khoá, nhiệt độ chưa đổi nên đây là quá trình ĐẲNG NHIỆT.\n`
        + `  Lượng khí được bảo toàn: p₁V₁ + p₂V₂ = p·(V₁ + V₂)\n`
        + `  ${S(p1)}·${S(V1)} + ${S(p2)}·${S(V2)} = p·(${S(V1)} + ${S(V2)})\n`
        + `  ⇒ p = ${S(p1 * V1 + p2 * V2)}/${S(V1 + V2)} = ${S(pChung, 4)} atm\n`
        + `Bước 2 — giai đoạn nung nóng, thể tích không đổi nên đây là quá trình ĐẲNG TÍCH.\n`
        + `  Đổi ra nhiệt độ tuyệt đối: T₁ = ${S(t1)} + 273 = ${S(T1)} K · T₂ = ${S(t2)} + 273 = ${S(T2)} K\n`
        + `  p/T₁ = p′/T₂ ⇒ p′ = ${S(pChung, 4)} × ${S(T2)}/${S(T1)} = ${D(pCuoi, 3)} atm\n`
        + `Bước 3 — kiểm chứng: nhiệt độ tăng nên áp suất phải TĂNG so với ${S(pChung, 4)} atm, `
        + `và p′ phải nằm giữa hai giá trị ${S(Math.min(p1, p2))} và ${S(Math.max(p1, p2))} atm nhân với tỉ số ${S(T(T2 / T1, 3))}.\n`
        + `Chỗ dễ sai: gộp hai giai đoạn làm một rồi áp thẳng phương trình trạng thái với V ban đầu của một bình, `
        + `hoặc quên đổi °C sang Kelvin ở bước 2.`,
      meo: 'Bài hai bình thông nhau luôn tách làm hai giai đoạn: mở khoá (đẳng nhiệt, bảo toàn pV) rồi mới đổi nhiệt độ '
        + '(đẳng tích, p/T không đổi). Trộn hai bước là sai ngay.'
    };
  } },

/* --- Tỉ số hạt nhân con trên hạt nhân mẹ: phải giải phương trình mũ --- */
{ ma: 'ly-vdc-tisohatnhan', chuong: 'Vật lí hạt nhân', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const Tb = R.chon([5, 8, 12, 15, 20, 24, 30]);
    const dv = R.chon(['ngày', 'giờ', 'năm']);
    const k = R.chon([3, 7, 15, 5, 9]);
    const t = T(Tb * Math.log2(k + 1), 3);
    return {
      q: `Một mẫu chất phóng xạ X có chu kì bán rã ${S(Tb)} ${dv}, phân rã tạo thành hạt nhân con Y bền. `
        + `Ban đầu mẫu chỉ gồm chất X nguyên chất. Hỏi sau bao lâu thì số hạt nhân Y tạo thành gấp ${S(k)} lần `
        + `số hạt nhân X còn lại? (đơn vị ${dv}, làm tròn đến hàng phần nghìn)`,
      ans: D(t, 3),
      giai: `Bước 1 — số hạt nhân X còn lại sau thời gian t theo định luật phóng xạ:\n`
        + `  N(X) = N₀·2^(−t/T)\n`
        + `Bước 2 — mỗi hạt nhân X phân rã sinh đúng một hạt nhân Y, nên số hạt Y bằng số hạt X đã rã:\n`
        + `  N(Y) = N₀ − N(X) = N₀·(1 − 2^(−t/T))\n`
        + `Bước 3 — lập tỉ số, N₀ triệt tiêu:\n`
        + `  N(Y)/N(X) = (1 − 2^(−t/T)) / 2^(−t/T) = 2^(t/T) − 1 = ${S(k)}\n`
        + `Bước 4 — giải phương trình mũ:\n`
        + `  2^(t/T) = ${S(k + 1)} ⇒ t/T = log₂${S(k + 1)} = ${S(Math.log2(k + 1), 4)}\n`
        + `  t = ${S(Tb)} × ${S(Math.log2(k + 1), 4)} = ${D(t, 3)} ${dv}\n`
        + `Bước 5 — kiểm chứng: tỉ số ${S(k)} nghĩa là chỉ còn 1/${S(k + 1)} lượng chất ban đầu, `
        + `tức đã qua khoảng ${S(T(Math.log2(k + 1), 2))} chu kì bán rã — hợp lí.\n`
        + `Chỗ dễ sai: nhầm N(Y)/N(X) với N(X)/N₀, hoặc quên rằng số hạt con bằng số hạt mẹ ĐÃ RÃ chứ không phải số còn lại.`,
      meo: 'Nhớ công thức gọn: N(con)/N(mẹ còn lại) = 2^(t/T) − 1. Tỉ số bằng 1 ⇒ t = T; bằng 3 ⇒ t = 2T; bằng 7 ⇒ t = 3T. '
        + 'Ba mốc này bấm ra ngay không cần máy.'
    };
  } },

/* --- Thả nước đá vào nước: phải xét có tan hết hay không --- */
{ ma: 'ly-vdc-nuocda', chuong: 'Vật lí nhiệt', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const m1 = R.nguyen(1, 5) / 10;               /* kg nước đá */
    const td = -R.chon([5, 10, 15, 20]);          /* °C nước đá */
    const m2 = R.nguyen(5, 20) / 10;              /* kg nước */
    const t2 = R.chon([40, 50, 60, 70, 80]);      /* °C nước */
    const c1 = 2100, c2 = 4200, L = 334000;
    const Qthu = m1 * c1 * (0 - td) + m1 * L;     /* đưa đá lên 0 rồi tan hết */
    const Qtoa = m2 * c2 * t2;                    /* nước hạ về 0 */
    if (Qtoa <= Qthu * 1.15) return null;         /* phải dư nhiệt để đá tan hết, và dư rõ rệt */
    const tcb = T((Qtoa - Qthu) / ((m1 + m2) * c2), 2);
    if (tcb <= 1 || tcb >= t2 - 1) return null;
    return {
      q: `Thả ${S(m1, 1)} kg nước đá ở ${S(td)} °C vào ${S(m2, 1)} kg nước ở ${S(t2)} °C đựng trong bình cách nhiệt. `
        + `Cho nhiệt dung riêng của nước đá là 2100 J/(kg·K), của nước là 4200 J/(kg·K), `
        + `nhiệt nóng chảy riêng của nước đá là 3,34·10⁵ J/kg. Bỏ qua nhiệt lượng bình thu vào. `
        + `Tính nhiệt độ của hỗn hợp khi đã cân bằng nhiệt. (đơn vị °C, làm tròn đến hàng phần trăm)`,
      ans: D(tcb, 2),
      giai: `Bước 1 — nhiệt lượng nước đá cần THU để lên tới 0 °C rồi tan hết:\n`
        + `  Q₁ = m₁·c(đá)·Δt = ${S(m1, 1)} × 2100 × ${S(-td)} = ${S(m1 * c1 * (0 - td))} J\n`
        + `  Q₂ = m₁·λ = ${S(m1, 1)} × 334000 = ${S(m1 * L)} J\n`
        + `  Tổng cần thu để đá tan hết: ${S(Qthu)} J\n`
        + `Bước 2 — nhiệt lượng nước TOẢ ra khi hạ từ ${S(t2)} °C xuống 0 °C:\n`
        + `  Q₃ = m₂·c(nước)·Δt = ${S(m2, 1)} × 4200 × ${S(t2)} = ${S(Qtoa)} J\n`
        + `Bước 3 — so sánh: Q₃ = ${S(Qtoa)} J > ${S(Qthu)} J nên đá TAN HẾT và hỗn hợp còn nóng trên 0 °C.\n`
        + `Bước 4 — phần nhiệt còn dư làm nóng toàn bộ ${S(T(m1 + m2, 1))} kg nước:\n`
        + `  ${S(Qtoa)} − ${S(Qthu)} = ${S(T(m1 + m2, 1))} × 4200 × t\n`
        + `  ⇒ t = ${S(Qtoa - Qthu)} / ${S(T((m1 + m2) * c2, 0))} = ${D(tcb, 2)} °C\n`
        + `Bước 5 — kiểm chứng: nhiệt độ cân bằng phải nằm giữa 0 °C và ${S(t2)} °C. Kết quả thoả.\n`
        + `Chỗ dễ sai: bỏ qua bước SO SÁNH ở bước 3. Nếu nhiệt nước toả ra ít hơn Q₁ + Q₂ thì đá chỉ tan một phần `
        + `và nhiệt độ cân bằng đúng bằng 0 °C, không phải một số dương.`,
      meo: 'Bài trộn có chuyển thể luôn phải hỏi trước: chất rắn có tan hết không. Tính Q cần để tan hết rồi so với '
        + 'Q mà chất kia toả ra. Chưa so mà đã đặt phương trình cân bằng là hỏng bài.'
    };
  } }

]);

/* ==========================================================
   SINH HỌC
   ========================================================== */
TD.GEN.sinh = (TD.GEN.sinh || []).concat([

/* --- Chọn lọc loại bỏ kiểu hình lặn qua nhiều thế hệ --- */
{ ma: 'sinh-vdc-chonloc', chuong: 'Di truyền quần thể', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const q0 = R.chon([0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6]);
    const n = R.nguyen(2, 8);
    const L = R.chon([
      { loai: 'thực vật giao phấn', tt: 'quả nhỏ', dv: 'cây' },
      { loai: 'thực vật giao phấn', tt: 'hạt lép', dv: 'cây' },
      { loai: 'động vật giao phối ngẫu nhiên', tt: 'lông trắng', dv: 'con' },
      { loai: 'động vật giao phối ngẫu nhiên', tt: 'chân ngắn', dv: 'con' }
    ]);
    const qn = q0 / (1 + n * q0);
    const tiLe = T(qn * qn * 100, 3);
    return {
      q: `Một quần thể ${L.loai} đang ở trạng thái cân bằng di truyền có tỉ lệ kiểu hình lặn (${L.tt}) chiếm `
        + `${S(T(q0 * q0 * 100, 2))}%. Do kiểu hình lặn không có giá trị kinh tế, người ta loại bỏ hoàn toàn `
        + `các cá thể mang kiểu hình lặn trước khi chúng tham gia sinh sản, thực hiện liên tục qua ${S(n)} thế hệ. `
        + `Theo lí thuyết, ở thế hệ thứ ${S(n)} tỉ lệ ${L.dv} mang kiểu hình lặn chiếm bao nhiêu phần trăm? `
        + `(làm tròn đến hàng phần nghìn)`,
      ans: D(tiLe, 3),
      giai: `Bước 1 — quần thể cân bằng nên tỉ lệ kiểu hình lặn chính là q₀²:\n`
        + `  q₀² = ${S(T(q0 * q0, 4))} ⇒ q₀ = √${S(T(q0 * q0, 4))} = ${S(q0, 2)}\n`
        + `Bước 2 — mỗi thế hệ loại bỏ hoàn toàn cá thể lặn thì tần số allele lặn giảm theo công thức:\n`
        + `  qₙ = q₀ / (1 + n·q₀)\n`
        + `Bước 3 — thay số với n = ${S(n)}:\n`
        + `  q${S(n)} = ${S(q0, 2)} / (1 + ${S(n)} × ${S(q0, 2)}) = ${S(q0, 2)}/${S(T(1 + n * q0, 3))} = ${S(qn, 5)}\n`
        + `Bước 4 — tỉ lệ kiểu hình lặn ở thế hệ thứ ${S(n)}:\n`
        + `  q${S(n)}² = ${S(qn, 5)}² = ${S(T(qn * qn, 6))} = ${D(tiLe, 3)}%\n`
        + `Bước 5 — kiểm chứng: chọn lọc chỉ làm giảm chứ không xoá được allele lặn, vì allele lặn vẫn ẩn trong các thể dị hợp. `
        + `Kết quả phải nhỏ hơn ${S(T(q0 * q0 * 100, 2))}% ban đầu nhưng luôn lớn hơn 0.\n`
        + `Chỗ dễ sai: lấy tỉ lệ kiểu hình lặn ban đầu chia cho n, hoặc dùng công thức của quần thể tự thụ phấn. `
        + `Hai tình huống đó khác hẳn nhau: tự thụ phấn KHÔNG đổi tần số allele, còn chọn lọc thì có.`,
      meo: 'Thuộc đúng một công thức là xong: qₙ = q₀/(1 + n·q₀). Nhớ nó xuất phát từ chỗ mỗi thế hệ chỉ có các thể '
        + 'dị hợp còn giữ allele lặn, nên tốc độ đào thải chậm dần chứ không tuyến tính.'
    };
  } },

/* --- Bệnh liên kết giới tính: suy kiểu gene bố mẹ rồi tính xác suất --- */
{ ma: 'sinh-vdc-lienketx', chuong: 'Di truyền người', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const benh = R.chon(['mù màu', 'máu khó đông', 'loạn dưỡng cơ Duchenne']);
    const soCon = R.nguyen(2, 4);
    const hoi = R.chon([
      { t: `cả ${soCon} người con đều không bị bệnh`, p: Math.pow(0.75, soCon) },
      { t: `có ít nhất một người con bị bệnh`, p: 1 - Math.pow(0.75, soCon) },
      { t: `cả ${soCon} người con đều là con gái không mang allele gây bệnh`, p: Math.pow(0.25, soCon) },
      { t: `cả ${soCon} người con đều là con gái`, p: Math.pow(0.5, soCon) },
      { t: `có đúng một người con bị bệnh`, p: soCon * 0.25 * Math.pow(0.75, soCon - 1) },
      { t: `cả ${soCon} người con đều là con trai không bị bệnh`, p: Math.pow(0.25, soCon) },
      { t: `có ít nhất một người con là con gái mang allele gây bệnh`, p: 1 - Math.pow(0.75, soCon) }
    ]);
    const kq = T(hoi.p * 100, 3);
    return {
      q: `Ở người, bệnh ${benh} do một allele lặn nằm trên vùng không tương đồng của nhiễm sắc thể giới tính X quy định. `
        + `Một cặp vợ chồng đều không bị bệnh, sinh được một người con trai bị bệnh ${benh}. `
        + `Cặp vợ chồng này dự định sinh thêm ${S(soCon)} người con nữa. Theo lí thuyết, xác suất để `
        + `${hoi.t} là bao nhiêu phần trăm? (làm tròn đến hàng phần nghìn)`,
      ans: D(kq, 3),
      giai: `Bước 1 — suy kiểu gene của bố mẹ từ dữ kiện người con trai bị bệnh.\n`
        + `  Con trai bị bệnh có kiểu gene XᵃY; allele Xᵃ chỉ có thể nhận từ MẸ (bố cho Y).\n`
        + `  Mẹ không bị bệnh mà vẫn mang Xᵃ ⇒ mẹ là thể mang XᴬXᵃ. Bố không bị bệnh ⇒ bố là XᴬY.\n`
        + `Bước 2 — lập sơ đồ lai XᴬXᵃ × XᴬY, bốn tổ hợp có xác suất bằng nhau:\n`
        + `  XᴬXᴬ (gái bình thường, không mang) · XᴬXᵃ (gái bình thường, mang) · XᴬY (trai bình thường) · XᵃY (trai bị bệnh)\n`
        + `  ⇒ mỗi lần sinh: xác suất con bị bệnh = 1/4 = 0,25 · con không bị bệnh = 3/4 = 0,75\n`
        + `  ⇒ xác suất là con gái không mang allele bệnh = 1/4 = 0,25\n`
        + `Bước 3 — các lần sinh ĐỘC LẬP với nhau nên nhân xác suất:\n`
        + `  P = ${S(T(hoi.p, 6))} = ${D(kq, 3)}%\n`
        + `Bước 4 — kiểm chứng: xác suất phải nằm trong khoảng 0% đến 100%, và biến cố "ít nhất một người bị bệnh" `
        + `phải bằng 100% trừ đi biến cố "không ai bị bệnh".\n`
        + `Chỗ dễ sai: nghĩ rằng đã sinh một con trai bị bệnh rồi thì lần sau xác suất giảm đi. `
        + `Mỗi lần sinh là một phép thử độc lập, xác suất luôn giữ nguyên 1/4.`,
      meo: 'Với bệnh lặn liên kết X, mẹ của người con trai bị bệnh CHẮC CHẮN là thể mang — đây là điểm tựa để suy '
        + 'kiểu gene bố mẹ mà đề không cho trực tiếp. Dạng "ít nhất một" thì luôn dùng phần bù cho nhanh.'
    };
  } },

/* --- Đột biến thay thế cặp nucleotide: nối chiều dài với số liên kết hydrogen --- */
{ ma: 'sinh-vdc-dotbiengen', chuong: 'Di truyền phân tử', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const N = R.nguyen(60, 200) * 10;             /* tổng nucleotide */
    const A = R.nguyen(Math.round(N * 0.15), Math.round(N * 0.3));
    const G = N / 2 - A;
    if (G < 30 || A < 30) return null;
    const chieuDai = N / 2 * 3.4;
    const H0 = 2 * A + 3 * G;
    const kieu = R.chon([
      { t: 'thay thế một cặp A–T bằng một cặp G–C', dH: 1 },
      { t: 'thay thế một cặp G–C bằng một cặp A–T', dH: -1 }
    ]);
    const H1 = H0 + kieu.dH;
    return {
      q: `Một gene ở sinh vật nhân sơ có chiều dài ${S(chieuDai)} Å và có ${S(A)} nucleotide loại adenine. `
        + `Gene này bị đột biến điểm dạng <b>${kieu.t}</b>, không làm thay đổi chiều dài gene. `
        + `Tính số liên kết hydrogen của gene sau đột biến.`,
      ans: D(H1, 0),
      giai: `Bước 1 — từ chiều dài suy ra tổng số nucleotide:\n`
        + `  L = (N/2) × 3,4 Å ⇒ N = 2L/3,4 = 2 × ${S(chieuDai)} / 3,4 = ${S(N)} nucleotide\n`
        + `Bước 2 — tính số nucleotide từng loại của gene ban đầu, dùng nguyên tắc bổ sung A = T và G = C:\n`
        + `  A = T = ${S(A)}\n`
        + `  G = C = N/2 − A = ${S(N / 2)} − ${S(A)} = ${S(G)}\n`
        + `Bước 3 — số liên kết hydrogen của gene ban đầu (A–T có 2 liên kết, G–C có 3 liên kết):\n`
        + `  H₀ = 2A + 3G = 2 × ${S(A)} + 3 × ${S(G)} = ${S(H0)}\n`
        + `Bước 4 — đột biến ${kieu.t} nên số liên kết hydrogen ${kieu.dH > 0 ? 'TĂNG' : 'GIẢM'} đúng 1:\n`
        + `  H = ${S(H0)} ${kieu.dH > 0 ? '+' : '−'} 1 = ${D(H1, 0)} liên kết\n`
        + `Bước 5 — kiểm chứng: đột biến THAY THẾ không đổi tổng số nucleotide nên chiều dài gene giữ nguyên, `
        + `chỉ số liên kết hydrogen đổi. Nếu là đột biến thêm hoặc mất cặp thì cả chiều dài lẫn H đều đổi.\n`
        + `Chỗ dễ sai: quên chia đôi khi đổi chiều dài ra số nucleotide (L tính theo số cặp, tức N/2), `
        + `hoặc nhớ nhầm A–T có 3 liên kết còn G–C có 2.`,
      meo: 'Ba công thức phải thuộc: N = 2L/3,4 · N = 2A + 2G · H = 2A + 3G. '
        + 'Thay một cặp A–T bằng G–C thì H tăng 1; thay ngược lại thì H giảm 1 — nhớ theo hướng "G–C bền hơn".'
    };
  } }

]);

})();
