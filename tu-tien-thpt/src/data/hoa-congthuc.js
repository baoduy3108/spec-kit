/* ============================================================
   HOÁ HỌC — BÍ KÍP GIẢI NHANH (dành cho câu Vận dụng & VD cao)
   nhom: nhóm phương pháp · ct: công thức · khi: khi nào dùng
   vd: ví dụ mẫu · bay: bẫy thường gặp
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

TD.KHO.hoa_ct = [
/* ---------- I. BỐN ĐỊNH LUẬT BẢO TOÀN ---------- */
{ nhom: 'Bảo toàn', ten: 'Bảo toàn khối lượng (BTKL)', cd: '*', cap: 2,
  ct: '<b>Σm<sub>chất tham gia</sub> = Σm<sub>sản phẩm</sub></b><br>Dạng hay dùng: m<sub>muối</sub> = m<sub>kim loại</sub> + m<sub>anion tạo muối</sub><br>m<sub>dd sau</sub> = m<sub>chất tan thêm</sub> + m<sub>dd trước</sub> − m<sub>↓</sub> − m<sub>khí</sub>',
  khi: 'Bài cho khối lượng hỗn hợp đầu và hỏi khối lượng hỗn hợp sau (hoặc ngược lại) mà không cần biết từng chất.',
  vd: 'Cho 8,3 g hỗn hợp Al, Fe + HCl dư thu 5,6 lít H₂ (đktc). m<sub>muối</sub> = 8,3 + 0,25·2·35,5 = <b>26,05 g</b> (vì n<sub>Cl⁻</sub> = 2n<sub>H₂</sub>).',
  bay: 'Quên trừ khối lượng khí thoát ra hoặc kết tủa khi tính khối lượng dung dịch.' },

{ nhom: 'Bảo toàn', ten: 'Bảo toàn nguyên tố (BTNT)', cd: '*', cap: 2,
  ct: '<b>n<sub>X</sub> trước = n<sub>X</sub> sau</b> (với mọi nguyên tố X)<br>Hay dùng nhất: BTNT <b>O</b>, <b>C</b>, <b>H</b>, <b>N</b>, kim loại.<br>Đốt cháy: n<sub>O₂</sub>·2 + n<sub>O(trong chất)</sub> = 2n<sub>CO₂</sub> + n<sub>H₂O</sub>',
  khi: 'Bài nhiều giai đoạn nối tiếp (nung, khử, hoà tan…) — chỉ quan tâm đầu và cuối.',
  vd: 'Đốt m g ester no đơn hở thu 0,3 mol CO₂ và 0,3 mol H₂O. BTNT O: 2n<sub>ester</sub> + 2n<sub>O₂</sub> = 2·0,3 + 0,3.',
  bay: 'Bỏ sót nguồn O trong chính chất hữu cơ, hoặc quên O trong H₂O của dung dịch.' },

{ nhom: 'Bảo toàn', ten: 'Bảo toàn electron (BTE)', cap: 3,
  ct: '<b>Σn<sub>e cho</sub> = Σn<sub>e nhận</sub></b><br>n<sub>e</sub> = n<sub>chất</sub> × |Δ số oxi hoá|<br>Điện phân: n<sub>e</sub> = <b>It/96500</b>',
  khi: 'Mọi bài oxi hoá – khử: KL + HNO₃/H₂SO₄ đặc, điện phân, nhiệt nhôm, hỗn hợp khử oxit.',
  vd: 'Hỗn hợp Mg, Al + HNO₃ → 0,1 mol NO. Σn<sub>e cho</sub> = 2n<sub>Mg</sub> + 3n<sub>Al</sub> = 3·0,1 = <b>0,3 mol</b>.',
  bay: 'Quên sản phẩm khử <b>NH₄NO₃</b> (nhận 8e) khi bài có kim loại mạnh (Mg, Al, Zn) và dung dịch không có khí thoát ra hết.' },

{ nhom: 'Bảo toàn', ten: 'Bảo toàn điện tích (BTĐT)', cap: 2,
  ct: '<b>Σ(n<sub>cation</sub> × điện tích) = Σ(n<sub>anion</sub> × điện tích)</b><br>VD: 2n<sub>Ca²⁺</sub> + n<sub>Na⁺</sub> + 3n<sub>Al³⁺</sub> = n<sub>Cl⁻</sub> + 2n<sub>SO₄²⁻</sub> + n<sub>NO₃⁻</sub>',
  khi: 'Bài cho dung dịch chứa nhiều ion, hỏi nồng độ/khối lượng muối khan.',
  vd: 'Dung dịch có 0,1 mol Na⁺; 0,2 mol Mg²⁺; x mol Cl⁻; 0,15 mol SO₄²⁻ ⇒ 0,1 + 0,4 = x + 0,3 ⇒ x = <b>0,2</b>.',
  bay: 'Quên rằng dung dịch LUÔN trung hoà điện — kể cả khi đề không nhắc.' },

/* ---------- II. KỸ THUẬT NÂNG CAO ---------- */
{ nhom: 'Kỹ thuật', ten: 'Quy đổi hỗn hợp', cap: 4,
  ct: 'Quy hỗn hợp phức tạp về <b>các nguyên tố đơn giản</b> hoặc <b>ít chất hơn</b>, giữ nguyên tổng khối lượng và số mol nguyên tố.<br>VD: {Fe, FeO, Fe₂O₃, Fe₃O₄} → quy về <b>{Fe: a; O: b}</b>',
  khi: 'Hỗn hợp oxit sắt nhiều loại; hỗn hợp peptide; hỗn hợp chất béo; hỗn hợp S và hợp chất S.',
  vd: 'Hoà tan 11,2 g hỗn hợp oxit sắt bằng HNO₃ → 0,05 mol NO. Đặt Fe = a, O = b: 56a + 16b = 11,2 và 3a = 2b + 3·0,05.',
  bay: 'Sau khi quy đổi, số mol có thể ra ÂM — vẫn hợp lệ về mặt toán học, đừng loại nghiệm.' },

{ nhom: 'Kỹ thuật', ten: 'Tăng – giảm khối lượng', cd: '*', cap: 3,
  ct: 'Δm = n<sub>phản ứng</sub> × (M<sub>thay vào</sub> − M<sub>thay ra</sub>)',
  khi: 'KL + muối (thanh kim loại nhúng vào dung dịch); alcohol + CuO; ester hoá; muối carbonate + acid.',
  vd: 'Nhúng Fe vào CuSO₄, khối lượng thanh <b>tăng</b> 0,8 g ⇒ n<sub>Fe p/ứ</sub> = 0,8/(64−56) = <b>0,1 mol</b>.',
  bay: 'Nhầm chiều tăng/giảm. Nhớ: KL thay vào nặng hơn ⇒ thanh nặng lên.' },

{ nhom: 'Kỹ thuật', ten: 'Trung bình & đường chéo', cd: '*', cap: 3,
  ct: '<b>M̄ = Σ(mᵢ)/Σ(nᵢ)</b> ⇒ luôn có M₁ &lt; M̄ &lt; M₂<br><b>Đường chéo:</b> n₁/n₂ = |M₂ − M̄| / |M̄ − M₁|<br>d<sub>A/B</sub> = M<sub>A</sub>/M<sub>B</sub>; d<sub>A/kk</sub> = M<sub>A</sub>/29',
  khi: '2 chất đồng đẳng kế tiếp; pha trộn dung dịch; hỗn hợp khí biết tỉ khối.',
  vd: 'Hỗn hợp 2 alkane kế tiếp có M̄ = 36,5 ⇒ 30 (C₂H₆) &lt; 36,5 &lt; 44 (C₃H₈); tỉ lệ mol = (44−36,5):(36,5−30) = 7,5:6,5.',
  bay: 'Với "đồng đẳng kế tiếp", nhớ M chênh nhau đúng 14 (CH₂).' },

{ nhom: 'Kỹ thuật', ten: 'Đồ thị CO₂ – kiềm và OH⁻ – Al³⁺', cap: 4,
  ct: '<b>CO₂ vào Ca(OH)₂:</b> đồ thị tam giác. Nhánh lên n↓ = n<sub>CO₂</sub>; nhánh xuống n↓ = 2n<sub>Ca(OH)₂</sub> − n<sub>CO₂</sub>. Đỉnh tại n<sub>CO₂</sub> = n<sub>Ca(OH)₂</sub>.<br><b>OH⁻ vào Al³⁺:</b> nhánh lên n↓ = n<sub>OH⁻</sub>/3; nhánh xuống <b>n↓ = 4n<sub>Al³⁺</sub> − n<sub>OH⁻</sub></b>. Đỉnh tại n<sub>OH⁻</sub> = 3n<sub>Al³⁺</sub>.<br><b>H⁺ vào AlO₂⁻:</b> nhánh lên n↓ = n<sub>H⁺</sub>; nhánh xuống n↓ = (4n<sub>AlO₂⁻</sub> − n<sub>H⁺</sub>)/3.',
  khi: 'Đề cho đồ thị hoặc cho "2 giá trị thể tích khác nhau cùng cho một lượng kết tủa".',
  vd: 'Cùng thu 0,1 mol ↓ ở 2 giá trị n<sub>OH⁻</sub>: 0,3 và 0,7 với n<sub>Al³⁺</sub> = 0,2 ⇒ 0,1 = 0,3/3 và 0,1 = 4·0,2 − 0,7. ✓',
  bay: 'Đề hỏi "giá trị LỚN NHẤT/NHỎ NHẤT của V" ⇒ ứng với 2 nhánh khác nhau của đồ thị, đừng chỉ lấy 1 nghiệm.' },

/* ---------- III. HNO₃ VÀ HỖN HỢP KIM LOẠI ---------- */
{ nhom: 'HNO₃', ten: 'Công thức HNO₃ tổng quát', cap: 4,
  ct: '<b>n<sub>HNO₃ p/ứ</sub> = 2n<sub>NO₂</sub> + 4n<sub>NO</sub> + 10n<sub>N₂O</sub> + 12n<sub>N₂</sub> + 10n<sub>NH₄⁺</sub></b><br><b>n<sub>e</sub> = n<sub>NO₂</sub> + 3n<sub>NO</sub> + 8n<sub>N₂O</sub> + 10n<sub>N₂</sub> + 8n<sub>NH₄⁺</sub></b><br>m<sub>muối</sub> = m<sub>KL</sub> + 62·n<sub>e</sub> + 80·n<sub>NH₄NO₃</sub>',
  khi: 'Mọi bài kim loại hoặc hợp chất + HNO₃.',
  vd: '0,1 mol Al + HNO₃ → khí NO duy nhất: n<sub>e</sub> = 0,3 ⇒ n<sub>NO</sub> = 0,1; n<sub>HNO₃</sub> = 4·0,1 = <b>0,4 mol</b>.',
  bay: 'Kim loại mạnh (Mg, Al, Zn) + HNO₃ rất loãng ⇒ phải kiểm tra <b>NH₄NO₃</b>. Dấu hiệu: m<sub>muối</sub> tính ra lớn hơn m<sub>KL</sub> + 62n<sub>e</sub>.' },

{ nhom: 'HNO₃', ten: 'H⁺ và NO₃⁻ đóng vai trò acid – chất oxi hoá', cap: 4,
  ct: '<b>4H⁺ + NO₃⁻ + 3e → NO + 2H₂O</b><br>⇒ n<sub>H⁺</sub> = 4n<sub>NO</sub> (hoặc 2n<sub>NO₂</sub>, 10n<sub>N₂O</sub>…)<br>Hỗn hợp HCl + NaNO₃ có tính oxi hoá <b>y hệt HNO₃</b>.',
  khi: 'Đề cho dung dịch chứa H⁺ (HCl, H₂SO₄) cùng NO₃⁻ (KNO₃, NaNO₃, Fe(NO₃)₃) và có kim loại/Fe²⁺.',
  vd: 'Cu + dd (HCl + NaNO₃): Cu vẫn tan dù HCl không hoà tan được Cu — vì có mặt NO₃⁻ trong môi trường acid.',
  bay: 'Bài "Cu không tan trong HCl nhưng tan trong hỗn hợp HCl + KNO₃" là câu hỏi kinh điển, đừng trả lời sai.' },

/* ---------- IV. HỮU CƠ ---------- */
{ nhom: 'Hữu cơ', ten: 'Đốt cháy hợp chất hữu cơ', cap: 3,
  ct: '<b>n<sub>chất</sub>·(k − 1) = n<sub>CO₂</sub> − n<sub>H₂O</sub></b> &nbsp;(k = độ bất bão hoà)<br>C̄ = n<sub>CO₂</sub>/n<sub>chất</sub>; H̄ = 2n<sub>H₂O</sub>/n<sub>chất</sub><br>BTNT O: n<sub>O(chất)</sub> + 2n<sub>O₂</sub> = 2n<sub>CO₂</sub> + n<sub>H₂O</sub>',
  khi: 'Mọi bài đốt cháy — công thức duy nhất cần nhớ.',
  vd: 'Đốt 0,1 mol chất X (k = 2) thu n<sub>CO₂</sub> − n<sub>H₂O</sub> = 0,1·(2−1) = <b>0,1 mol</b>.',
  bay: 'k tính bằng (2C + 2 + N − H)/2. Chất chứa O không ảnh hưởng k.' },

{ nhom: 'Hữu cơ', ten: 'Ester – xà phòng hoá', cap: 3,
  ct: 'Ester đơn chức: n<sub>NaOH</sub> = n<sub>ester</sub> · <b>BTKL:</b> m<sub>ester</sub> + m<sub>NaOH</sub> = m<sub>muối</sub> + m<sub>alcohol</sub><br>Ester của phenol: n<sub>NaOH</sub> = <b>2</b>n<sub>ester</sub>, sinh thêm H₂O<br>Chất béo: n<sub>NaOH</sub> = <b>3</b>n<sub>chất béo</sub>; n<sub>glycerol</sub> = n<sub>chất béo</sub>',
  khi: 'Mọi bài thuỷ phân ester/chất béo trong kiềm.',
  vd: 'Thuỷ phân 8,8 g ethyl acetate (0,1 mol) bằng 0,15 mol NaOH: m<sub>rắn</sub> = 8,8 + 0,15·40 − 0,1·46 = <b>10,2 g</b> (gồm CH₃COONa + NaOH dư).',
  bay: 'Đề hỏi "khối lượng chất rắn khan" ⇒ phải cộng cả <b>NaOH dư</b>, không chỉ muối.' },

{ nhom: 'Hữu cơ', ten: 'Chất béo & chỉ số', cap: 4,
  ct: 'n<sub>H₂</sub> hoặc n<sub>Br₂</sub> = n<sub>chất béo</sub> × <b>số liên kết π C=C</b><br>Triolein: 3π C=C ⇒ 1 mol cộng 3 mol Br₂<br>m<sub>xà phòng</sub> = m<sub>chất béo</sub> + 40·3n − 92n &nbsp;(n = n<sub>chất béo</sub>)<br><b>Chỉ số acid</b> = số mg KOH trung hoà acid béo tự do trong 1 g chất béo<br><b>Chỉ số xà phòng hoá</b> = số mg KOH xà phòng hoá hết 1 g chất béo',
  khi: 'Bài chất béo có phản ứng cộng H₂/Br₂ hoặc hỏi chỉ số.',
  vd: 'Hỗn hợp triolein + tristearin cộng tối đa 0,15 mol Br₂ ⇒ n<sub>triolein</sub> = 0,15/3 = <b>0,05 mol</b>.',
  bay: 'π trong nhóm C=O (3 cái) KHÔNG cộng Br₂/H₂ ở điều kiện thường — chỉ tính π của C=C.' },

{ nhom: 'Hữu cơ', ten: 'Peptide – thuỷ phân', cap: 4,
  ct: 'M<sub>n-peptide</sub> = ΣM<sub>amino acid</sub> − <b>18(n−1)</b><br><b>+ NaOH:</b> n<sub>NaOH</sub> = n·n<sub>peptide</sub>; n<sub>H₂O sinh ra</sub> = n<sub>peptide</sub><br>&nbsp;&nbsp;BTKL: m<sub>peptide</sub> + m<sub>NaOH</sub> = m<sub>muối</sub> + m<sub>H₂O</sub><br><b>+ HCl:</b> n<sub>HCl</sub> = n·n<sub>peptide</sub>; n<sub>H₂O thêm vào</sub> = (n−1)·n<sub>peptide</sub><br><b>Đốt cháy:</b> quy đổi peptide về {C₂H₃NO ; CH₂ ; H₂O}',
  khi: 'Bài peptide — luôn là câu VDC.',
  vd: 'Thuỷ phân 0,1 mol tripeptide bằng NaOH vừa đủ: n<sub>NaOH</sub> = 0,3; n<sub>H₂O</sub> = <b>0,1</b>. BTKL cho khối lượng muối.',
  bay: 'Thuỷ phân bằng NaOH sinh 1 H₂O cho MỖI phân tử peptide (không phải mỗi liên kết peptide).' },

{ nhom: 'Hữu cơ', ten: 'Quy đổi peptide (kỹ thuật đỉnh cao)', cap: 4,
  ct: 'Mọi peptide tạo từ Gly, Ala, Val đều quy về:<br><b>{ C₂H₃NO : a &nbsp;;&nbsp; CH₂ : b &nbsp;;&nbsp; H₂O : c }</b><br>với a = n<sub>N</sub> = tổng số mắt xích, c = n<sub>peptide</sub><br>Gly = C₂H₃NO + H₂O · Ala = C₂H₃NO + CH₂ + H₂O · Val = C₂H₃NO + 3CH₂ + H₂O',
  khi: 'Bài đốt cháy hỗn hợp peptide, hoặc hỗn hợp peptide + amino acid.',
  vd: 'Đốt hỗn hợp peptide: n<sub>CO₂</sub> = 2a + b; n<sub>H₂O</sub> = 1,5a + b + c; n<sub>N₂</sub> = a/2.',
  bay: 'Nhớ hệ số: C₂H₃NO cho 2 CO₂ và 1,5 H₂O; mỗi CH₂ cho 1 CO₂ và 1 H₂O.' },

{ nhom: 'Hữu cơ', ten: 'Amine & muối amoni', cap: 3,
  ct: 'Amine no đơn hở CₙH₂ₙ₊₃N: đốt cháy cho <b>n<sub>H₂O</sub> − n<sub>CO₂</sub> = 1,5n<sub>amine</sub></b><br>n<sub>HCl</sub> = số nhóm NH₂ × n<sub>amine</sub><br>BTKL: m<sub>muối</sub> = m<sub>amine</sub> + 36,5·n<sub>HCl</sub>',
  khi: 'Bài amine tác dụng acid hoặc đốt cháy.',
  vd: 'X là amine no đơn hở, đốt cho 0,2 mol CO₂ và 0,35 mol H₂O ⇒ n<sub>X</sub> = (0,35−0,2)/1,5 = 0,1 ⇒ C = 2 ⇒ <b>C₂H₇N</b>.',
  bay: 'Muối amoni hữu cơ (CH₃COONH₄, HCOOH₃NCH₃) cũng + NaOH cho khí — dễ nhầm với ester.' },

{ nhom: 'Hữu cơ', ten: 'Bài toán hiệu suất', cap: 2,
  ct: 'H% = (lượng thực tế / lượng lý thuyết) × 100%<br>Đi <b>xuôi</b> (từ đầu → sản phẩm): <b>nhân</b> H%<br>Đi <b>ngược</b> (từ sản phẩm → nguyên liệu): <b>chia</b> H%<br>Qua nhiều giai đoạn: H<sub>tổng</sub> = H₁ × H₂ × …',
  khi: 'Bài lên men, ester hoá, tổng hợp NH₃, sản xuất polymer.',
  vd: 'Từ 162 g tinh bột, H = 80% ⇒ m<sub>ethanol</sub> = 162 · (92/162) · 0,8 = <b>73,6 g</b>.',
  bay: 'Đề hỏi "khối lượng nguyên liệu cần dùng" ⇒ phải CHIA cho H%, không nhân.' },

/* ---------- V. CÁC CÔNG THỨC NỀN ---------- */
{ nhom: 'Nền tảng', ten: 'Bộ công thức mol cơ bản', cd: '*', cap: 1,
  ct: 'n = m/M = V<sub>khí(đktc)</sub>/22,4 = V<sub>khí(25°C, 1 bar)</sub>/<b>24,79</b> = C<sub>M</sub>·V<sub>dd(L)</sub> = N/6,022·10²³<br>C% = (m<sub>ct</sub>/m<sub>dd</sub>)·100 · C<sub>M</sub> = (10·D·C%)/M<br>m<sub>dd</sub> = V<sub>dd</sub>(mL) × D (g/mL)',
  khi: 'Mọi bài tính toán.',
  vd: '2,479 lít khí ở 25 °C, 1 bar = <b>0,1 mol</b> (SGK mới dùng điều kiện chuẩn này thay cho đktc 22,4).',
  bay: '<b>SGK 2018 dùng 24,79 L/mol (25 °C, 1 bar)</b>, không phải 22,4 L/mol. Đọc kỹ điều kiện đề cho!' },

{ nhom: 'Nền tảng', ten: 'Bảng nguyên tử khối phải thuộc', cd: '*', cap: 1,
  ct: 'H=1 · C=12 · N=14 · O=16 · Na=23 · Mg=24 · Al=27 · Si=28 · P=31 · S=32 · Cl=35,5 · K=39 · Ca=40 · Cr=52 · Mn=55 · <b>Fe=56</b> · Ni=59 · <b>Cu=64</b> · Zn=65 · Br=80 · Ag=108 · Ba=137 · I=127 · Pb=207',
  khi: 'Luôn luôn.',
  vd: 'M<sub>Fe₂O₃</sub> = 56·2 + 16·3 = <b>160</b>; M<sub>CuSO₄</sub> = 64 + 32 + 64 = <b>160</b>; M<sub>CaCO₃</sub> = <b>100</b>.',
  bay: 'Đề thi mới KHÔNG cho bảng tuần hoàn ở một số dạng — phải thuộc nằm lòng.' }
];

TD.KHO.hoa_ct.push(

/* ============ BỔ SUNG: PHỦ KÍN CÔNG THỨC CÓ THỂ RA THI ============ */
{ nhom: 'Nền tảng', ten: 'Nồng độ dung dịch & pha trộn', cd: '*', cap: 1,
  ct: '<b>C<sub>M</sub> = n/V</b> (mol/L) &nbsp;·&nbsp; <b>C% = m<sub>ct</sub>/m<sub>dd</sub> · 100 %</b><br>Liên hệ: C<sub>M</sub> = 10·D·C%/M (D là khối lượng riêng g/mL)<br>m<sub>dd</sub> = V(mL)·D &nbsp;·&nbsp; m<sub>dd sau</sub> = m<sub>chất cho vào</sub> + m<sub>dd đầu</sub> − m<sub>kết tủa</sub> − m<sub>khí</sub><br>Pha loãng: C₁V₁ = C₂V₂.',
  khi: 'Mọi bài dung dịch — bước tính khối lượng dung dịch sau phản ứng.',
  vd: 'Cho 5,6 g Fe vào HCl dư thu 0,1 mol H₂: m<sub>dd tăng</sub> = 5,6 − 0,1·2 = <b>5,4 g</b>.',
  bay: 'Nhớ TRỪ khối lượng khí thoát ra và kết tủa khi tính khối lượng dung dịch sau phản ứng.' },

{ nhom: 'Nền tảng', ten: 'pH và môi trường dung dịch', cap: 2,
  ct: '<b>pH = −log[H⁺]</b> &nbsp;·&nbsp; pOH = −log[OH⁻] &nbsp;·&nbsp; <b>pH + pOH = 14</b> (25 °C)<br>[H⁺]·[OH⁻] = 10⁻¹⁴<br>pH &lt; 7 acid · pH = 7 trung tính · pH &gt; 7 base.<br>Acid mạnh nồng độ C: [H⁺] = C (nếu đơn chức). Base mạnh: [OH⁻] = C.<br>Trộn acid với base: tính n<sub>H⁺</sub> − n<sub>OH⁻</sub> rồi chia thể tích tổng.',
  khi: 'Bài tính pH, chuẩn độ, trung hoà.',
  vd: 'Trộn 100 mL HCl 0,1 M với 100 mL NaOH 0,05 M: n<sub>H⁺</sub> dư = 0,01 − 0,005 = 0,005 mol; [H⁺] = 0,005/0,2 = 0,025 ⇒ pH ≈ <b>1,6</b>.',
  bay: 'Acid yếu (CH₃COOH) KHÔNG điện li hoàn toàn nên [H⁺] &lt; C, pH lớn hơn tính theo acid mạnh.' },

{ nhom: 'Kỹ thuật', ten: 'Điện phân & định luật Faraday', cap: 3,
  ct: '<b>m = A·I·t/(n·F)</b> với F = 96500 C/mol<br>Số mol electron trao đổi: <b>n<sub>e</sub> = I·t/F</b><br>Thứ tự điện phân ở catot: Ag⁺ &gt; Fe³⁺ &gt; Cu²⁺ &gt; H⁺ &gt; H₂O (ion kim loại mạnh như Na⁺, K⁺, Al³⁺ không bị điện phân trong dung dịch).<br>Anot: S²⁻ &gt; I⁻ &gt; Br⁻ &gt; Cl⁻ &gt; H₂O (điện cực trơ).<br>Hai điện cực luôn nhận/nhường CÙNG số mol electron.',
  khi: 'Bài điện phân dung dịch, tính khối lượng kim loại bám catot.',
  vd: 'I = 5 A, t = 1930 s ⇒ n<sub>e</sub> = 5·1930/96500 = 0,1 mol ⇒ Cu bám = 0,05 mol = <b>3,2 g</b>.',
  bay: 'Khi cation hết thì nước bị điện phân, khí H₂ thoát ra ở catot — đồ thị khí gãy khúc tại đó.' },

{ nhom: 'Kỹ thuật', ten: 'Pin điện hoá & thế điện cực chuẩn', cap: 2,
  ct: '<b>E°<sub>pin</sub> = E°<sub>catot (+)</sub> − E°<sub>anot (−)</sub></b><br>Anot: xảy ra OXI HOÁ (kim loại mạnh hơn, E° nhỏ hơn) — cực âm.<br>Catot: xảy ra KHỬ — cực dương.<br>E°<sub>pin</sub> &gt; 0 thì phản ứng tự xảy ra.<br>Dãy điện hoá: K, Na, Mg, Al, Zn, Fe, Ni, Sn, Pb, (H), Cu, Ag, Au.',
  khi: 'Nội dung [MỚI] CT 2018 — pin Galvani, ăn mòn điện hoá.',
  vd: 'Pin Zn–Cu: E° = 0,34 − (−0,76) = <b>+1,10 V</b>.',
  bay: 'Trong ăn mòn điện hoá, kim loại MẠNH hơn bị ăn mòn trước (đóng vai trò cực âm). Đó là nguyên lí bảo vệ bằng kẽm.' },

{ nhom: 'Kỹ thuật', ten: 'Nhiệt phản ứng ΔrH và năng lượng liên kết', cd: '*', cap: 3,
  ct: '<b>Δ<sub>r</sub>H°₂₉₈ = Σ Δ<sub>f</sub>H°(sản phẩm) − Σ Δ<sub>f</sub>H°(chất đầu)</b><br>Tính theo năng lượng liên kết: Δ<sub>r</sub>H = Σ E<sub>lk</sub>(chất đầu) − Σ E<sub>lk</sub>(sản phẩm)<br>Δ<sub>r</sub>H &lt; 0: phản ứng TOẢ nhiệt. Δ<sub>r</sub>H &gt; 0: THU nhiệt.<br>Δ<sub>f</sub>H° của đơn chất bền ở trạng thái chuẩn = 0.',
  khi: 'Nội dung [MỚI] CT 2018 — chắc chắn xuất hiện trong đề.',
  vd: 'Đốt cháy nhiên liệu luôn có Δ<sub>r</sub>H &lt; 0. Biết Δ<sub>r</sub>H và số mol thì Q toả = |Δ<sub>r</sub>H|·n.',
  bay: 'Hai công thức trên NGƯỢC chiều nhau: theo Δ<sub>f</sub>H lấy sau trừ trước, theo E<sub>lk</sub> lấy trước trừ sau.' },

{ nhom: 'Kỹ thuật', ten: 'Tốc độ phản ứng & cân bằng hoá học', cd: '*', cap: 2,
  ct: '<b>v = ΔC/Δt</b>; hệ số nhiệt độ Van’t Hoff: v₂/v₁ = γ^((T₂−T₁)/10)<br><b>Hằng số cân bằng:</b> K<sub>C</sub> = [C]^c[D]^d / ([A]^a[B]^b) — chỉ tính chất khí và chất tan.<br><b>Nguyên lí Le Chatelier:</b> cân bằng chuyển dịch theo chiều chống lại tác động bên ngoài.<br>Tăng nhiệt độ ⇒ chuyển theo chiều THU nhiệt. Tăng áp suất ⇒ chuyển theo chiều GIẢM số mol khí.',
  khi: 'Câu lí thuyết định lượng về cân bằng, bài toán tổng hợp NH₃.',
  vd: 'N₂ + 3H₂ ⇌ 2NH₃ (Δ<sub>r</sub>H &lt; 0): tăng áp suất và giảm nhiệt độ đều làm tăng hiệu suất tạo NH₃.',
  bay: 'Chất rắn và dung môi KHÔNG có mặt trong biểu thức K. Chất xúc tác không làm chuyển dịch cân bằng.' },

{ nhom: 'Hữu cơ', ten: 'Độ bất bão hoà k và công thức phân tử', cap: 2,
  ct: '<b>k = (2C + 2 + N − H − X)/2</b><br>k = số liên kết π + số vòng.<br>· k = 0: no, mạch hở · k = 1: 1 nối đôi hoặc 1 vòng · k = 4 thường có vòng benzene.<br>Ester no đơn hở: C<sub>n</sub>H<sub>2n</sub>O₂ (k = 1). Acid no đơn hở cũng vậy.<br>Amino acid no, 1 NH₂, 1 COOH: C<sub>n</sub>H<sub>2n+1</sub>O₂N.',
  khi: 'Bước đầu tiên khi biện luận công thức phân tử.',
  vd: 'C₄H₆O₂ ⇒ k = (8 + 2 − 6)/2 = <b>2</b> ⇒ có 2 π hoặc 1 π + 1 vòng.',
  bay: 'k luôn là số nguyên không âm. Ra số lẻ hoặc âm nghĩa là công thức phân tử sai.' },

{ nhom: 'Hữu cơ', ten: 'Carbohydrate — phản ứng đặc trưng', cap: 2,
  ct: 'Glucose (C₆H₁₂O₆) + AgNO₃/NH₃ ⇒ <b>2Ag</b> (n<sub>Ag</sub> = 2n<sub>glucose</sub>)<br>Saccharose KHÔNG tráng bạc; thuỷ phân ⇒ glucose + fructose.<br>Tinh bột, cellulose (C₆H₁₀O₅)<sub>n</sub> thuỷ phân ⇒ n glucose.<br>Lên men: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (nhớ nhân hiệu suất).<br>Cellulose + 3HNO₃ ⇒ cellulose trinitrat (M = 297n).',
  khi: 'Bài tráng bạc, lên men rượu, sản xuất thuốc súng không khói.',
  vd: 'Lên men 180 g glucose, H = 80 % ⇒ n<sub>CO₂</sub> = 2·1·0,8 = <b>1,6 mol</b>.',
  bay: 'Fructose vẫn tráng bạc được (chuyển hoá thành glucose trong môi trường base). Saccharose thì không.' },

{ nhom: 'Hữu cơ', ten: 'Amino acid & điểm đẳng điện', cap: 2,
  ct: 'Amino acid lưỡng tính: phản ứng cả với HCl và NaOH.<br>n<sub>HCl</sub> = số nhóm NH₂ × n<sub>aa</sub> &nbsp;·&nbsp; n<sub>NaOH</sub> = số nhóm COOH × n<sub>aa</sub><br>Số NH₂ &gt; số COOH ⇒ quỳ hoá XANH (lysine). Số COOH &gt; số NH₂ ⇒ quỳ hoá ĐỎ (glutamic).<br>Glycine 75 · Alanine 89 · Valine 117 · Glutamic 147 · Lysine 146.',
  khi: 'Bài amino acid tác dụng acid/base, nhận biết bằng quỳ tím.',
  vd: '0,1 mol glutamic (2 COOH) cần <b>0,2 mol NaOH</b>.',
  bay: 'Bài cho tác dụng lần lượt với HCl rồi NaOH: phải tính cả lượng NaOH trung hoà HCl dư.' },

{ nhom: 'Hữu cơ', ten: 'Polymer & hệ số polymer hoá', cap: 1,
  ct: '<b>n = M<sub>polymer</sub> / M<sub>mắt xích</sub></b><br>Trùng hợp: monome có liên kết đôi hoặc vòng kém bền (ethylene, vinyl chloride, styrene, buta-1,3-diene).<br>Trùng ngưng: monome có ≥ 2 nhóm chức, giải phóng phân tử nhỏ (nylon-6,6, tơ lapsan, nhựa phenol formaldehyde).<br>Cao su buna-S: buta-1,3-diene + styrene. Nylon-6,6: hexamethylenediamine + adipic acid.',
  khi: 'Câu nhận biết loại phản ứng và tính hệ số polymer hoá.',
  vd: 'PE có M = 56 000 ⇒ n = 56 000/28 = <b>2000</b>.',
  bay: 'Trùng ngưng LUÔN giải phóng phân tử nhỏ (thường là H₂O); trùng hợp thì không.' },

{ nhom: 'Bảo toàn', ten: 'Kim loại tác dụng acid & muối', cap: 2,
  ct: '<b>Với HCl, H₂SO₄ loãng:</b> n<sub>H₂</sub> = ½ n<sub>e nhường</sub> = ½ n<sub>HCl</sub> = n<sub>H₂SO₄</sub><br>m<sub>muối</sub> = m<sub>KL</sub> + 71·n<sub>H₂</sub> (clorua) = m<sub>KL</sub> + 96·n<sub>H₂</sub> (sunfat)<br><b>Kim loại đẩy kim loại:</b> áp dụng tăng giảm khối lượng theo chênh lệch nguyên tử khối.<br>Thứ tự phản ứng: kim loại mạnh nhất đẩy ion kim loại yếu nhất trước.',
  khi: 'Bài kim loại + acid, kim loại + dung dịch muối.',
  vd: 'n<sub>H₂</sub> = 0,1 mol từ hỗn hợp KL nặng 5 g ⇒ m<sub>muối clorua</sub> = 5 + 7,1 = <b>12,1 g</b>.',
  bay: 'Cu, Ag KHÔNG tan trong HCl và H₂SO₄ loãng. Al, Fe, Cr bị THỤ ĐỘNG trong HNO₃ và H₂SO₄ đặc nguội.' },

{ nhom: 'Bảo toàn', ten: 'CO₂ / SO₂ tác dụng dung dịch kiềm', cap: 3,
  ct: 'Đặt <b>T = n<sub>OH⁻</sub>/n<sub>CO₂</sub></b>:<br>· T ≤ 1: chỉ tạo HCO₃⁻ &nbsp;·&nbsp; T ≥ 2: chỉ tạo CO₃²⁻ &nbsp;·&nbsp; 1 &lt; T &lt; 2: tạo cả hai<br>Khi tạo cả hai: n<sub>CO₃²⁻</sub> = n<sub>OH⁻</sub> − n<sub>CO₂</sub>; n<sub>HCO₃⁻</sub> = 2n<sub>CO₂</sub> − n<sub>OH⁻</sub><br>Với Ca(OH)₂, Ba(OH)₂: kết tủa cực đại rồi TAN DẦN khi CO₂ dư.',
  khi: 'Bài sục CO₂ vào kiềm, đồ thị kết tủa.',
  vd: 'n<sub>CO₂</sub> = 0,3; n<sub>NaOH</sub> = 0,5 ⇒ T = 1,67 ⇒ n<sub>CO₃²⁻</sub> = 0,2; n<sub>HCO₃⁻</sub> = <b>0,1 mol</b>.',
  bay: 'Đồ thị kết tủa có hai đoạn: đi lên (tạo kết tủa) rồi đi xuống (kết tủa tan). Một giá trị kết tủa thường ứng với HAI giá trị n<sub>CO₂</sub>.' }
);
