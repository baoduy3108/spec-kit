/* ============================================================
   HOÁ HỌC — NGÂN HÀNG CÂU HỎI (3 dạng thức đề TN THPT)
   dang: 'mc'  = trắc nghiệm 4 lựa chọn (0,25đ)
         'ds'  = đúng/sai 4 ý (tối đa 1,0đ)
         'tln' = trả lời ngắn (0,25đ)
   muc:  1 Nhận biết · 2 Thông hiểu · 3 Vận dụng · 4 Vận dụng cao
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

TD.KHO.hoa = [
/* ---------------- MỨC 1 – NHẬN BIẾT ---------------- */
{ chuong: 'Đại cương kim loại', dang: 'mc', muc: 1,
  q: 'Kim loại nào sau đây có nhiệt độ nóng chảy thấp nhất?',
  opts: ['W', 'Hg', 'Cr', 'Cs'], ans: 1,
  giai: 'Hg nóng chảy ở −39 °C, là kim loại duy nhất ở thể lỏng tại điều kiện thường. W cao nhất (3410 °C), Cr cứng nhất, Cs mềm nhất.',
  meo: 'Bộ 4 kỉ lục: W – cao nhất; Hg – thấp nhất; Cr – cứng nhất; Cs – mềm nhất.' },

{ chuong: 'Ester – Lipid', dang: 'mc', muc: 1,
  q: 'Ester nào sau đây có mùi chuối chín và công thức CH₃COOCH₂CH₂CH(CH₃)₂?',
  opts: ['Ethyl acetate', 'Isoamyl acetate', 'Methyl formate', 'Benzyl acetate'], ans: 1,
  giai: 'Isoamyl acetate CH₃COOCH₂CH₂CH(CH₃)₂ có mùi chuối chín, là ester quen thuộc trong SGK mới.',
  meo: 'Ester mùi thơm: isoamyl acetate – chuối; ethyl butyrate – dứa; benzyl acetate – hoa nhài.' },

{ chuong: 'Carbohydrate', dang: 'mc', muc: 1,
  q: 'Chất nào sau đây không bị thuỷ phân trong môi trường acid?',
  opts: ['Saccharose', 'Tinh bột', 'Glucose', 'Cellulose'], ans: 2,
  giai: 'Glucose là monosaccharide — đơn vị nhỏ nhất, không thể thuỷ phân thêm. Ba chất còn lại là di- hoặc polysaccharide.',
  meo: 'Chỉ monosaccharide (glucose, fructose) là không thuỷ phân.' },

{ chuong: 'Polymer', dang: 'mc', muc: 1,
  q: 'Polymer nào sau đây được điều chế bằng phản ứng trùng ngưng?',
  opts: ['Polyethylene', 'Poly(vinyl chloride)', 'Nilon-6,6', 'Polystyrene'], ans: 2,
  giai: 'Nilon-6,6 tạo từ hexamethylenediamine và adipic acid — hai monomer đều có 2 nhóm chức, phản ứng loại H₂O ⇒ đồng trùng ngưng. Ba chất còn lại đều trùng hợp từ monomer có liên kết đôi.',
  meo: 'Có liên kết đôi C=C ⇒ trùng hợp. Có ≥ 2 nhóm chức (–OH, –COOH, –NH₂) ⇒ trùng ngưng.' },

{ chuong: 'Nguyên tố nhóm IA – IIA', dang: 'mc', muc: 1,
  q: 'Khi đốt, hợp chất của kim loại nào cho ngọn lửa màu tím?',
  opts: ['Na', 'K', 'Ba', 'Ca'], ans: 1,
  giai: 'K cho ngọn lửa tím; Na vàng; Ba lục; Ca đỏ cam.',
  meo: 'Ba màu bắt buộc thuộc: Na – vàng, K – tím, Ba – lục.' },

{ chuong: 'Hợp chất nitrogen', dang: 'mc', muc: 1,
  q: 'Dung dịch chất nào sau đây làm quỳ tím chuyển sang màu xanh?',
  opts: ['Glycine', 'Aniline', 'Methylamine', 'Acetic acid'], ans: 2,
  giai: 'Methylamine là base đủ mạnh nên làm quỳ hoá xanh. Aniline là base rất yếu (không đổi màu quỳ), glycine có 1 NH₂ và 1 COOH nên trung tính, acetic acid làm quỳ hoá đỏ.',
  meo: 'Aniline có tính base nhưng KHÔNG đổi màu quỳ — bẫy kinh điển.' },

/* ---------------- MỨC 2 – THÔNG HIỂU ---------------- */
{ chuong: 'Ester – Lipid', dang: 'mc', muc: 2,
  q: 'Thuỷ phân ester X trong dung dịch NaOH thu được sodium acetate và acetaldehyde. Công thức của X là',
  opts: ['CH₃COOCH=CH₂', 'CH₃COOC₂H₅', 'HCOOCH=CH₂', 'CH₃COOC₆H₅'], ans: 0,
  giai: 'Muối là CH₃COONa ⇒ gốc acid là CH₃COO–. Sản phẩm còn lại là CH₃CHO (aldehyde, không phải alcohol) ⇒ gốc alcohol phải là vinyl CH=CH₂. Vậy X là vinyl acetate CH₃COOCH=CH₂.',
  meo: 'Ester + NaOH cho aldehyde/ketone ⇒ chắc chắn là ester của vinyl (gốc –CH=CH₂).' },

{ chuong: 'Điện phân', dang: 'mc', muc: 2,
  q: 'Điện phân dung dịch CuSO₄ với điện cực trơ. Nhận định nào sau đây đúng?',
  opts: ['pH của dung dịch tăng dần', 'Ở anot thoát ra khí H₂', 'pH của dung dịch giảm dần', 'Khối lượng catot giảm dần'], ans: 2,
  giai: '2CuSO₄ + 2H₂O → 2Cu + O₂ + 2H₂SO₄. Sinh ra H₂SO₄ nên pH giảm. Anot thoát O₂ (SO₄²⁻ không bị điện phân). Catot có Cu bám vào nên khối lượng tăng.',
  meo: 'Điện phân muối của acid mạnh với KL sau Al ⇒ luôn sinh acid ⇒ pH giảm.' },

{ chuong: 'Đại cương kim loại', dang: 'mc', muc: 2,
  q: 'Cho các cặp: (1) Fe–Cu nhúng trong HCl; (2) Fe nguyên chất trong HCl; (3) Fe–Zn nhúng trong nước muối; (4) Fe tráng thiếc bị xước sâu để ngoài không khí ẩm. Số trường hợp xảy ra ăn mòn điện hoá là',
  opts: ['1', '2', '3', '4'], ans: 2,
  giai: 'Ăn mòn điện hoá cần đủ 3 điều kiện: 2 điện cực khác bản chất, tiếp xúc, cùng trong dung dịch điện li. (1), (3), (4) đều đủ. (2) chỉ có 1 kim loại nên là ăn mòn hoá học ⇒ có 3 trường hợp.',
  meo: 'Đếm ăn mòn điện hoá: soi đủ 3 điều kiện, thiếu 1 loại ngay.' },

{ chuong: 'Amino acid – Peptide', dang: 'mc', muc: 2,
  q: 'Peptide nào sau đây không có phản ứng màu biure?',
  opts: ['Ala-Gly-Val', 'Gly-Ala', 'Gly-Gly-Gly-Ala', 'Ala-Val-Gly-Gly'], ans: 1,
  giai: 'Phản ứng biure cần từ 2 liên kết peptide trở lên (tức tripeptide trở lên). Gly-Ala là đipeptide, chỉ có 1 liên kết peptide ⇒ không cho màu tím.',
  meo: 'Đipeptide là chất DUY NHẤT trong nhóm peptide không cho phản ứng biure.' },

{ chuong: 'Năng lượng hoá học', dang: 'mc', muc: 2,
  q: 'Cho phản ứng: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), Δ<sub>r</sub>H°₂₉₈ = −890,3 kJ. Phát biểu nào đúng?',
  opts: ['Phản ứng thu nhiệt', 'Phản ứng toả nhiệt, năng lượng của sản phẩm thấp hơn chất đầu', 'Phản ứng cần cung cấp nhiệt liên tục để duy trì', 'Δ<sub>f</sub>H° của CH₄ bằng 0'], ans: 1,
  giai: 'ΔH < 0 ⇒ phản ứng toả nhiệt, tổng năng lượng sản phẩm thấp hơn chất đầu. Δ<sub>f</sub>H° = 0 chỉ đúng với đơn chất bền (như O₂), CH₄ là hợp chất.',
  meo: 'ΔH âm = toả nhiệt = "nhả năng lượng ra" ⇒ sản phẩm bền hơn, thấp năng lượng hơn.' },

/* ---------------- MỨC 3 – VẬN DỤNG ---------------- */
{ chuong: 'Ester – Lipid', dang: 'tln', muc: 3,
  q: 'Xà phòng hoá hoàn toàn 17,6 gam ethyl acetate bằng 300 ml dung dịch NaOH 1M. Cô cạn dung dịch sau phản ứng thu được m gam chất rắn khan. Giá trị của m là bao nhiêu? (làm tròn đến hàng phần mười)',
  ans: '20,4',
  giai: 'n(CH₃COOC₂H₅) = 17,6/88 = 0,2 mol; n(NaOH) = 0,3 mol ⇒ NaOH dư 0,1 mol.\nCH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH\nChất rắn khan = CH₃COONa (0,2 mol) + NaOH dư (0,1 mol) = 0,2·82 + 0,1·40 = 16,4 + 4 = 20,4 g.\nKiểm tra lại bằng BTKL: 17,6 + 0,3·40 = m + m(C₂H₅OH) ⇒ 29,6 = m + 0,2·46 = m + 9,2 ⇒ m = 20,4 g.',
  meo: 'Luôn kiểm tra NaOH dư — "chất rắn khan" bao gồm cả kiềm dư, không chỉ muối.' },

{ chuong: 'Kim loại + acid', dang: 'tln', muc: 3,
  q: 'Hoà tan hoàn toàn 8,3 gam hỗn hợp Al và Fe trong dung dịch HCl dư, thu được 5,6 lít khí H₂ (đktc). Khối lượng muối khan thu được sau khi cô cạn là bao nhiêu gam? (làm tròn đến hàng phần trăm)',
  ans: '26,05',
  giai: 'n(H₂) = 5,6/22,4 = 0,25 mol. Trong phản ứng KL + HCl: n(Cl⁻ tạo muối) = n(HCl) = 2n(H₂) = 0,5 mol.\nBTKL: m(muối) = m(KL) + m(Cl⁻) = 8,3 + 0,5·35,5 = 8,3 + 17,75 = 26,05 gam.',
  meo: 'Công thức tủ: m(muối clorua) = m(KL) + 71·n(H₂). Ở đây: 8,3 + 71·0,25 = 26,05.' },

{ chuong: 'CO₂ + kiềm', dang: 'tln', muc: 3,
  q: 'Hấp thụ hoàn toàn 0,5 mol CO₂ vào dung dịch chứa 0,4 mol Ca(OH)₂. Sau phản ứng thu được bao nhiêu mol kết tủa?',
  ans: '0,3',
  giai: 'n(OH⁻) = 0,8 mol; T = 0,8/0,5 = 1,6 ⇒ 1 < T < 2 ⇒ tạo cả 2 muối CaCO₃ và Ca(HCO₃)₂.\nÁp dụng: n(CO₃²⁻) = n(OH⁻) − n(CO₂) = 0,8 − 0,5 = 0,3 mol.\nVì n(Ca²⁺) = 0,4 > 0,3 nên toàn bộ CO₃²⁻ kết tủa ⇒ n(CaCO₃) = 0,3 mol.',
  meo: 'Công thức vàng khi có 2 muối: n↓ = n(OH⁻) − n(CO₂), sau đó so với n(Ca²⁺) để lấy giá trị nhỏ hơn.' },

{ chuong: 'Nhôm', dang: 'tln', muc: 3,
  q: 'Cho 0,7 mol NaOH vào dung dịch chứa 0,2 mol AlCl₃. Sau phản ứng thu được bao nhiêu mol kết tủa?',
  ans: '0,1',
  giai: 'T = n(OH⁻)/n(Al³⁺) = 0,7/0,2 = 3,5 ⇒ 3 < T < 4 ⇒ kết tủa đã tan một phần.\nÁp dụng: n↓ = 4n(Al³⁺) − n(OH⁻) = 4·0,2 − 0,7 = 0,8 − 0,7 = 0,1 mol.',
  meo: 'Hai công thức phải thuộc: T ≤ 3 ⇒ n↓ = n(OH⁻)/3; 3 < T < 4 ⇒ n↓ = 4n(Al³⁺) − n(OH⁻).' },

{ chuong: 'Carbohydrate', dang: 'tln', muc: 3,
  q: 'Lên men 162 gam tinh bột thành ethanol với hiệu suất toàn bộ quá trình là 80%. Khối lượng ethanol thu được là bao nhiêu gam? (làm tròn đến hàng phần mười)',
  ans: '73,6',
  giai: '(C₆H₁₀O₅)ₙ → nC₆H₁₂O₆ → 2nC₂H₅OH\nTỉ lệ khối lượng: 162 g tinh bột (1 mắt xích) → 2·46 = 92 g ethanol nếu H = 100%.\nVới H = 80%: m = 162·(92/162)·0,8 = 92·0,8 = 73,6 gam.',
  meo: 'Nhớ cặp số 162 → 92. Đi xuôi thì NHÂN hiệu suất, đi ngược thì CHIA.' },

{ chuong: 'Điện phân', dang: 'tln', muc: 3,
  q: 'Điện phân dung dịch CuSO₄ với điện cực trơ, cường độ dòng điện 5A trong thời gian 3860 giây. Khối lượng Cu bám vào catot là bao nhiêu gam? (làm tròn đến hàng phần mười)',
  ans: '6,4',
  giai: 'n(e) = It/F = 5·3860/96500 = 0,2 mol.\nCatot: Cu²⁺ + 2e → Cu ⇒ n(Cu) = 0,2/2 = 0,1 mol.\nm(Cu) = 0,1·64 = 6,4 gam.',
  meo: 'Bài điện phân luôn bắt đầu bằng n(e) = It/96500, rồi chia cho số e mà ion nhận.' },

/* ---------------- MỨC 4 – VẬN DỤNG CAO ---------------- */
{ chuong: 'Kim loại + HNO₃', dang: 'tln', muc: 4,
  q: 'Hoà tan hoàn toàn 11,2 gam hỗn hợp X gồm Fe, FeO, Fe₂O₃, Fe₃O₄ trong dung dịch HNO₃ loãng dư, thu được 0,05 mol khí NO (sản phẩm khử duy nhất). Số mol HNO₃ đã phản ứng là bao nhiêu? (làm tròn đến hàng phần trăm)',
  ans: '0,515',
  giai: 'Quy đổi hỗn hợp X về {Fe: a mol; O: b mol}.\n(1) Khối lượng: 56a + 16b = 11,2\n(2) Bảo toàn electron: Fe → Fe³⁺ + 3e (cho 3a); O + 2e → O²⁻ (nhận 2b); N⁺⁵ + 3e → NO (nhận 3·0,05 = 0,15)\n⇒ 3a = 2b + 0,15\nTừ (1): 56a + 16b = 11,2. Thế b = (3a − 0,15)/2:\n56a + 8(3a − 0,15) = 11,2 ⇒ 56a + 24a − 1,2 = 11,2 ⇒ 80a = 12,4 ⇒ a = 0,155\n⇒ b = (0,465 − 0,15)/2 = 0,1575\nBTNT N: n(HNO₃) = n(NO₃⁻ trong muối) + n(NO) = 3a + 0,05 = 3·0,155 + 0,05 = 0,515 mol.',
  meo: 'Kỹ thuật lõi: quy đổi về {Fe; O} + bảo toàn electron + bảo toàn nguyên tố N. Nhớ O nhận 2e.' },

{ chuong: 'Peptide', dang: 'tln', muc: 4,
  q: 'Thuỷ phân hoàn toàn 0,1 mol pentapeptide mạch hở X (tạo từ các α-amino acid có 1 nhóm NH₂ và 1 nhóm COOH) bằng dung dịch NaOH vừa đủ. Số mol NaOH đã phản ứng và số mol H₂O sinh ra lần lượt là bao nhiêu? (ghi dạng a;b)',
  ans: '0,5;0,1',
  giai: 'Pentapeptide có 5 mắt xích ⇒ thuỷ phân bằng NaOH cần 5 NaOH cho mỗi phân tử:\nX + 5NaOH → 5 muối + 1 H₂O\n⇒ n(NaOH) = 5·0,1 = 0,5 mol; n(H₂O) = 1·0,1 = 0,1 mol.',
  meo: 'Quy tắc: n-peptide + nNaOH → n muối + 1 H₂O. H₂O sinh ra tính theo SỐ PHÂN TỬ peptide, không phải số liên kết peptide.' },

{ chuong: 'Chất béo', dang: 'tln', muc: 4,
  q: 'Đun nóng 44,5 gam hỗn hợp E gồm triolein và tristearin cần vừa đủ 0,15 mol NaOH, thu được m gam hỗn hợp muối và glycerol. Giá trị của m là bao nhiêu? (làm tròn đến hàng phần mười)',
  ans: '45,9',
  giai: 'Chất béo + 3NaOH → 3 muối + glycerol ⇒ n(chất béo) = 0,15/3 = 0,05 mol.\nn(glycerol) = n(chất béo) = 0,05 mol.\nBTKL: m(E) + m(NaOH) = m(muối) + m(glycerol)\n44,5 + 0,15·40 = m + 0,05·92\n44,5 + 6 = m + 4,6 ⇒ m = 45,9 gam.',
  meo: 'Bài chất béo gần như luôn giải bằng BTKL. Nhớ M(glycerol) = 92 và tỉ lệ NaOH : chất béo = 3 : 1.' },

{ chuong: 'Đốt cháy hữu cơ', dang: 'tln', muc: 4,
  q: 'Đốt cháy hoàn toàn 0,1 mol amine no, đơn chức, mạch hở X thu được 0,2 mol CO₂. Số đồng phân cấu tạo của X là bao nhiêu?',
  ans: '2',
  giai: 'Số C = n(CO₂)/n(X) = 0,2/0,1 = 2 ⇒ X là C₂H₇N (amine no đơn hở CₙH₂ₙ₊₃N với n = 2).\nCác đồng phân của C₂H₇N:\n(1) CH₃CH₂NH₂ — ethylamine (bậc I)\n(2) CH₃NHCH₃ — dimethylamine (bậc II)\n⇒ có 2 đồng phân cấu tạo.',
  meo: 'Amine no đơn hở: CₙH₂ₙ₊₃N. Đếm đồng phân phải xét cả bậc I, II, III.' },

{ chuong: 'Điện phân', dang: 'tln', muc: 4,
  q: 'Điện phân 200 ml dung dịch CuSO₄ 1M với điện cực trơ, cường độ dòng 5A. Sau thời gian t giây, khối lượng dung dịch giảm 15,2 gam. Giá trị của t là bao nhiêu giây? (làm tròn đến hàng đơn vị)',
  ans: '7334',
  giai: 'n(CuSO₄) = 0,2 mol. Giả sử chỉ có Cu bám catot và O₂ thoát anot, Cu²⁺ chưa hết.\nGọi n(e) = 2x ⇒ catot: n(Cu) = x; anot: 2H₂O → O₂ + 4H⁺ + 4e ⇒ n(O₂) = 2x/4 = x/2.\nm(dd giảm) = m(Cu) + m(O₂) = 64x + 32·(x/2) = 64x + 16x = 80x = 15,2 ⇒ x = 0,19 mol.\nKiểm tra: x = 0,19 < 0,2 ⇒ Cu²⁺ còn dư, giả thiết đúng.\nn(e) = 2·0,19 = 0,38 mol ⇒ t = n(e)·96500/I = 0,38·96500/5 = 7334 giây.',
  meo: 'Công thức lõi: m(dd giảm) = m(kim loại bám catot) + m(khí thoát ra ở cả hai cực).' },

/* ---------------- DẠNG ĐÚNG / SAI (4 ý) ---------------- */
{ chuong: 'Ester – Lipid', dang: 'ds', muc: 3,
  q: 'Cho ester X có công thức phân tử C₄H₈O₂. Thuỷ phân X trong dung dịch NaOH thu được sodium acetate. Xét các phát biểu sau:',
  items: [
    { t: 'Công thức cấu tạo của X là CH₃COOC₂H₅.', a: true },
    { t: 'X có phản ứng tráng bạc.', a: false },
    { t: 'Thuỷ phân X thu được alcohol ethylic.', a: true },
    { t: 'X là ester no, đơn chức, mạch hở.', a: true }
  ],
  giai: 'Ý a ĐÚNG: muối là CH₃COONa ⇒ gốc acid là CH₃COO–; C₄H₈O₂ trừ CH₃COO còn C₂H₅ ⇒ X là CH₃COOC₂H₅.\nÝ b SAI: chỉ ester của formic acid (HCOOR) mới tráng bạc vì có nhóm –CHO. X là ester của acetic acid nên không tráng bạc.\nÝ c ĐÚNG: sản phẩm còn lại là C₂H₅OH.\nÝ d ĐÚNG: C₄H₈O₂ có k = (2·4+2−8)/2 = 1, ứng với nhóm C=O ⇒ ester no, đơn chức, mạch hở.',
  meo: 'Chỉ HCOOR mới tráng bạc trong họ ester — kiểm tra ngay khi thấy ý này.' },

{ chuong: 'Đại cương kim loại', dang: 'ds', muc: 3,
  q: 'Tiến hành thí nghiệm: nhúng thanh Fe vào dung dịch CuSO₄. Xét các phát biểu sau:',
  items: [
    { t: 'Có lớp kim loại màu đỏ bám vào thanh Fe.', a: true },
    { t: 'Màu xanh của dung dịch nhạt dần.', a: true },
    { t: 'Xảy ra ăn mòn điện hoá học.', a: true },
    { t: 'Khối lượng thanh Fe giảm sau phản ứng.', a: false }
  ],
  giai: 'Fe + CuSO₄ → FeSO₄ + Cu.\nÝ a ĐÚNG: Cu sinh ra bám vào thanh Fe, có màu đỏ.\nÝ b ĐÚNG: Cu²⁺ (xanh) bị tiêu thụ, thay bằng Fe²⁺ (lục rất nhạt) ⇒ màu xanh nhạt dần.\nÝ c ĐÚNG: khi Cu bám lên Fe, hình thành cặp điện cực Fe–Cu tiếp xúc trong dung dịch điện li ⇒ đủ 3 điều kiện ăn mòn điện hoá.\nÝ d SAI: mỗi mol Fe (56) tan đi được thay bằng 1 mol Cu (64) bám vào ⇒ khối lượng thanh TĂNG 8 g/mol.',
  meo: 'Tăng giảm khối lượng: Δm = n·(M vào − M ra) = n·(64 − 56) = 8n ⇒ thanh nặng thêm.' },

{ chuong: 'Carbohydrate', dang: 'ds', muc: 3,
  q: 'Cho các chất: glucose, fructose, saccharose, tinh bột. Xét các phát biểu sau:',
  items: [
    { t: 'Cả 4 chất đều hoà tan Cu(OH)₂ ở nhiệt độ thường tạo dung dịch xanh lam.', a: false },
    { t: 'Có thể dùng nước bromine để phân biệt glucose và fructose.', a: true },
    { t: 'Thuỷ phân hoàn toàn saccharose thu được hai monosaccharide khác nhau.', a: true },
    { t: 'Tinh bột và cellulose là đồng phân của nhau.', a: false }
  ],
  giai: 'Ý a SAI: tinh bột không tan trong nước nên không hoà tan Cu(OH)₂. Chỉ glucose, fructose, saccharose làm được.\nÝ b ĐÚNG: glucose làm mất màu nước bromine (có –CHO), fructose thì không (nhóm C=O ketone, và môi trường Br₂ không đủ base để chuyển hoá thành glucose).\nÝ c ĐÚNG: saccharose → glucose + fructose.\nÝ d SAI: cả hai đều có công thức (C₆H₁₀O₅)ₙ nhưng giá trị n khác nhau rất nhiều ⇒ phân tử khối khác nhau ⇒ KHÔNG phải đồng phân.',
  meo: 'Đồng phân đòi hỏi CÙNG công thức phân tử. Tinh bột và cellulose chỉ cùng công thức thực nghiệm, khác n.' },

{ chuong: 'Pin điện – Điện phân', dang: 'ds', muc: 4,
  q: 'Cho pin Galvani Zn–Cu với E°(Zn²⁺/Zn) = −0,76 V và E°(Cu²⁺/Cu) = +0,34 V. Xét các phát biểu sau:',
  items: [
    { t: 'Sức điện động chuẩn của pin là 1,10 V.', a: true },
    { t: 'Điện cực Zn là cathode.', a: false },
    { t: 'Trong quá trình pin hoạt động, khối lượng điện cực Zn giảm dần.', a: true },
    { t: 'Electron di chuyển từ điện cực Cu sang điện cực Zn qua dây dẫn.', a: false }
  ],
  giai: 'Ý a ĐÚNG: E°pin = E°(+) − E°(−) = 0,34 − (−0,76) = 1,10 V.\nÝ b SAI: Zn có E° nhỏ hơn ⇒ Zn là ANODE (cực âm), nơi xảy ra oxi hoá.\nÝ c ĐÚNG: Zn → Zn²⁺ + 2e ⇒ Zn tan ra, điện cực mòn dần.\nÝ d SAI: electron đi từ nơi bị oxi hoá (anode Zn) sang cathode Cu, tức từ Zn → Cu.',
  meo: 'Trong PIN: E° nhỏ hơn = anode = cực âm = bị ăn mòn. Electron luôn chạy từ anode sang cathode.' },

{ chuong: 'Thực hành', dang: 'ds', muc: 2,
  q: 'Về an toàn và thao tác trong phòng thí nghiệm hoá học, xét các phát biểu sau:',
  items: [
    { t: 'Khi pha loãng H₂SO₄ đặc, rót từ từ acid vào nước và khuấy đều.', a: true },
    { t: 'Khi đun ống nghiệm, hướng miệng ống về phía mình để dễ quan sát.', a: false },
    { t: 'Dùng bột lưu huỳnh để xử lí thuỷ ngân rơi vãi.', a: true },
    { t: 'Nút bông tẩm dung dịch NaOH ở miệng bình giúp hấp thụ khí Cl₂ dư.', a: true }
  ],
  giai: 'Ý a ĐÚNG: acid vào nước (không làm ngược) để nhiệt toả ra được phân tán, tránh bắn.\nÝ b SAI: phải hướng miệng ống về phía KHÔNG có người, tránh hoá chất bắn vào mặt.\nÝ c ĐÚNG: Hg + S → HgS (rắn, không bay hơi) ngay ở nhiệt độ thường.\nÝ d ĐÚNG: Cl₂ + 2NaOH → NaCl + NaClO + H₂O, giữ khí độc không thoát ra ngoài.',
  meo: 'Câu thực hành ở dạng đúng/sai là phần dễ ăn điểm nhất phần II — chỉ cần nắm quy tắc an toàn cơ bản.' }
];
