/* ============================================================
   BỔ SUNG DÒNG CHO CÁC THẺ QUÁ NGẮN
   Mấy thẻ dưới đây chỉ có 2–4 dòng nên bẻ ra chưa nổi 8 câu
   bám sát thẻ ⇒ không đủ điều kiện mở nút "Kiểm tra thẻ này".
   Ở đây nối thêm một bảng "nhãn — nội dung" gồm đúng những
   ý mà đề thi thật hay hỏi, để bộ sinh câu bẻ ra được nhiều
   câu hỏi nhỏ từ chính kiến thức của thẻ.
   ============================================================ */
window.TD = window.TD || {}; TD.KHO = TD.KHO || {};

(function () {
  const esc = s => String(s).replace(/&(?![a-z#0-9]+;)/gi, '&amp;');
  const bang = hang => '<table class="kq small">' +
    hang.map(h => `<tr><td>${esc(h[0])}</td><td>${esc(h[1])}</td></tr>`).join('') +
    '</table>';

  const BO = [

/* ---------------- TOÁN ---------------- */
{ kho: 'toan_ct', ten: 'Thể tích khối tròn xoay', hang: [
  ['Quay quanh Ox hình phẳng dưới y = f(x)', 'V = π∫ₐᵇ f²(x)dx'],
  ['Quay quanh Ox miền giữa hai đường', 'V = π∫ₐᵇ |f²(x) − g²(x)|dx'],
  ['Quay quanh Oy', 'V = π∫_c^d x²(y)dy, phải đổi cận sang y'],
  ['Vật thể có thiết diện S(x) vuông góc Ox', 'V = ∫ₐᵇ S(x)dx'],
  ['Diện tích hình phẳng dưới y = f(x)', 'S = ∫ₐᵇ |f(x)|dx'],
  ['Diện tích miền giữa hai đường', 'S = ∫ₐᵇ |f(x) − g(x)|dx'],
  ['Thể tích khối nón bán kính R chiều cao h', 'V = (1/3)πR²h'],
  ['Thể tích khối trụ bán kính R chiều cao h', 'V = πR²h'],
  ['Thể tích khối cầu bán kính R', 'V = (4/3)πR³'],
  ['Cận a và b lấy từ đâu', 'nghiệm của phương trình hoành độ giao điểm'] ] },

{ kho: 'toan_ct', ten: 'Nhị thức Newton', hang: [
  ['Khai triển của (a + b)ⁿ', 'tổng theo k từ 0 đến n của Cₙᵏ·aⁿ⁻ᵏ·bᵏ'],
  ['Khai triển của (a − b)ⁿ', 'tổng theo k của (−1)ᵏ·Cₙᵏ·aⁿ⁻ᵏ·bᵏ'],
  ['Số hạng tổng quát', 'Tₖ₊₁ = Cₙᵏ·aⁿ⁻ᵏ·bᵏ'],
  ['Số số hạng của khai triển bậc n', 'n + 1 số hạng'],
  ['Tổng các hệ số của khai triển', 'giá trị của biểu thức khi thay a = b = 1'],
  ['Tổng Cₙ⁰ + Cₙ¹ + … + Cₙⁿ', '2ⁿ'],
  ['Hệ số của xᵏ trong khai triển (1 + x)ⁿ', 'Cₙᵏ'],
  ['Tính chất đối xứng của tổ hợp', 'Cₙᵏ = Cₙⁿ⁻ᵏ'],
  ['Hằng đẳng thức Pascal', 'Cₙᵏ + Cₙᵏ⁺¹ = Cₙ₊₁ᵏ⁺¹'],
  ['Cách tìm số hạng không chứa x', 'cho số mũ của x trong Tₖ₊₁ bằng 0 rồi giải ra k'] ] },

/* ---------------- LÍ ---------------- */
{ kho: 'ly_ct', ten: 'Thang nhiệt độ & nội năng', hang: [
  ['Đổi từ độ C sang Kelvin', 'T(K) = t(°C) + 273'],
  ['Đổi từ độ C sang độ F', 't(°F) = 1,8·t(°C) + 32'],
  ['Độ không tuyệt đối', '0 K ứng với −273 °C'],
  ['Độ chênh lệch nhiệt độ hai thang', 'ΔT(K) = Δt(°C), bằng nhau'],
  ['Định nghĩa nội năng', 'tổng động năng chuyển động nhiệt và thế năng tương tác của các phân tử'],
  ['Nội năng phụ thuộc yếu tố nào', 'nhiệt độ và thể tích của vật'],
  ['Nội năng khí lí tưởng phụ thuộc', 'chỉ phụ thuộc nhiệt độ vì bỏ qua tương tác phân tử'],
  ['Hai cách làm biến đổi nội năng', 'thực hiện công và truyền nhiệt'],
  ['Đại lượng tỉ lệ với nhiệt độ tuyệt đối', 'động năng trung bình của phân tử'],
  ['Đơn vị đo nội năng', 'joule'] ] },

{ kho: 'ly_ct', ten: 'Thuyết động học phân tử', hang: [
  ['Động năng tịnh tiến trung bình một phân tử', 'W̄đ = (3/2)·k·T'],
  ['Hằng số Boltzmann k', '1,38·10⁻²³ J/K'],
  ['Liên hệ giữa R và k', 'R = k·NA'],
  ['Số Avogadro NA', '6,02·10²³ hạt trên một mol'],
  ['Áp suất khí theo mật độ phân tử', 'p = (2/3)·n₀·W̄đ = n₀·k·T'],
  ['Tốc độ căn quân phương theo khối lượng phân tử', 'v = √(3kT/m)'],
  ['Tốc độ căn quân phương theo khối lượng mol', 'v = √(3RT/M)'],
  ['Quan hệ giữa tốc độ và khối lượng mol', 'v tỉ lệ nghịch với căn bậc hai của M'],
  ['Nội dung về chuyển động của phân tử', 'các phân tử chuyển động hỗn loạn không ngừng'],
  ['Nội dung về kích thước phân tử', 'kích thước phân tử rất nhỏ so với khoảng cách giữa chúng'],
  ['Nội dung về va chạm', 'va chạm giữa các phân tử là va chạm đàn hồi'] ] },

{ kho: 'ly_ct', ten: 'Định luật Lenz', hang: [
  ['Nội dung định luật Lenz', 'dòng cảm ứng có chiều sao cho từ trường nó sinh ra chống lại sự biến thiên từ thông sinh ra nó'],
  ['Khi từ thông qua mạch tăng', 'từ trường cảm ứng ngược chiều từ trường ngoài'],
  ['Khi từ thông qua mạch giảm', 'từ trường cảm ứng cùng chiều từ trường ngoài'],
  ['Công thức suất điện động cảm ứng', 'e = −ΔΦ/Δt'],
  ['Ý nghĩa dấu trừ trong công thức Faraday', 'thể hiện chính định luật Lenz'],
  ['Công thức từ thông qua khung N vòng', 'Φ = N·B·S·cosα'],
  ['Đơn vị của từ thông', 'weber, kí hiệu Wb'],
  ['Đưa nam châm lại gần vòng dây', 'vòng dây đẩy nam châm ra xa'],
  ['Đưa nam châm ra xa vòng dây', 'vòng dây hút nam châm lại gần'],
  ['Cơ sở năng lượng của định luật Lenz', 'định luật bảo toàn năng lượng'],
  ['Quy tắc xác định chiều dòng cảm ứng trong ống dây', 'quy tắc nắm tay phải'] ] },

{ kho: 'ly_ct', ten: 'Đồ thị các đẳng quá trình', hang: [
  ['Dạng đường đẳng nhiệt trong hệ p–V', 'đường hypebol'],
  ['Dạng đường đẳng tích trong hệ p–T', 'đường thẳng kéo dài đi qua gốc toạ độ'],
  ['Dạng đường đẳng áp trong hệ V–T', 'nửa đường thẳng có phần kéo dài qua gốc O'],
  ['Vị trí đường đẳng nhiệt ứng với nhiệt độ cao hơn', 'nằm xa gốc toạ độ hơn trên đồ thị p–V'],
  ['Đại lượng không đổi ở quá trình đẳng nhiệt', 'tích của p và V'],
  ['Đại lượng không đổi ở quá trình đẳng tích', 'thương của p chia T'],
  ['Đại lượng không đổi ở quá trình đẳng áp', 'thương của V chia T'] ] },

{ kho: 'ly_ct', ten: 'Hiệu suất động cơ nhiệt', hang: [
  ['Công thức hiệu suất động cơ nhiệt', 'H = A/Q₁ = (Q₁ − Q₂)/Q₁'],
  ['Công có ích mà động cơ sinh ra', 'A = Q₁ − Q₂'],
  ['Nhiệt lượng nhận từ nguồn nóng', 'Q₁ = A/H'],
  ['Nhiệt lượng nhả cho nguồn lạnh', 'Q₂ = Q₁ − A'],
  ['Hiệu suất cực đại theo Carnot', 'Hmax = 1 − T₂/T₁'],
  ['Đơn vị nhiệt độ trong công thức Carnot', 'phải tính bằng Kelvin'],
  ['So sánh hiệu suất thực với hiệu suất Carnot', 'hiệu suất thực luôn nhỏ hơn Hmax'],
  ['Cách làm tăng hiệu suất động cơ', 'tăng nhiệt độ nguồn nóng hoặc hạ nhiệt độ nguồn lạnh'],
  ['Hai nguồn nhiệt của động cơ', 'nguồn nóng và nguồn lạnh'],
  ['Giới hạn trên của mọi hiệu suất', 'luôn nhỏ hơn 100 phần trăm'] ] },

{ kho: 'ly_ct', ten: 'Lực từ & lực Lorentz', hang: [
  ['Lực từ tác dụng lên đoạn dây mang dòng', 'F = B·I·ℓ·sinα'],
  ['Lực Lorentz tác dụng lên hạt mang điện', 'f = |q|·v·B·sinα'],
  ['Bán kính quỹ đạo tròn của hạt', 'R = mv/(|q|B)'],
  ['Chu kì chuyển động tròn của hạt', 'T = 2πm/(|q|B)'],
  ['Quy tắc xác định chiều lực từ', 'quy tắc bàn tay trái'],
  ['Đơn vị của cảm ứng từ B', 'tesla, kí hiệu T'],
  ['Khi dây dẫn song song với vectơ B', 'lực từ tác dụng lên dây bằng 0'],
  ['Khi vận tốc hạt song song với vectơ B', 'lực Lorentz bằng 0, hạt bay thẳng đều'],
  ['Công của lực Lorentz', 'luôn bằng 0 vì lực vuông góc với vận tốc'],
  ['Quỹ đạo hạt bay vuông góc vào từ trường đều', 'đường tròn nằm trong mặt phẳng vuông góc với B'] ] },

{ kho: 'ly_ct', ten: 'Dao động tắt dần – cưỡng bức – cộng hưởng', hang: [
  ['Nguyên nhân của dao động tắt dần', 'lực ma sát và lực cản của môi trường'],
  ['Đại lượng giảm dần khi dao động tắt dần', 'biên độ và cơ năng của vật'],
  ['Tần số của dao động cưỡng bức', 'bằng tần số của ngoại lực cưỡng bức'],
  ['Biên độ dao động cưỡng bức phụ thuộc', 'biên độ ngoại lực và độ chênh giữa tần số ngoại lực với tần số riêng'],
  ['Điều kiện xảy ra cộng hưởng', 'tần số ngoại lực bằng tần số riêng của hệ'],
  ['Hệ quả khi cộng hưởng xảy ra', 'biên độ dao động đạt giá trị cực đại'],
  ['Ảnh hưởng của lực cản tới đỉnh cộng hưởng', 'lực cản càng nhỏ thì đỉnh càng cao và càng nhọn'],
  ['Điểm khác của dao động duy trì', 'dao động với tần số riêng và biên độ giữ nguyên'],
  ['Ví dụ cộng hưởng có lợi', 'hộp cộng hưởng của đàn guitar làm tiếng đàn to lên'],
  ['Ví dụ cộng hưởng có hại', 'cầu rung mạnh khi đoàn người bước đều qua'] ] },

{ kho: 'ly_ct', ten: 'Điện xoay chiều & mạch RLC', hang: [
  ['Giá trị hiệu dụng của điện áp', 'U = U₀/√2'],
  ['Giá trị hiệu dụng của cường độ dòng điện', 'I = I₀/√2'],
  ['Cảm kháng của cuộn cảm', 'ZL = ωL'],
  ['Dung kháng của tụ điện', 'ZC = 1/(ωC)'],
  ['Tổng trở của mạch RLC nối tiếp', 'Z = √(R² + (ZL − ZC)²)'],
  ['Độ lệch pha giữa u và i', 'tanφ = (ZL − ZC)/R'],
  ['Công suất tiêu thụ của mạch', 'P = UI·cosφ = I²R'],
  ['Hệ số công suất của mạch', 'cosφ = R/Z'],
  ['Điều kiện xảy ra cộng hưởng điện', 'ZL = ZC'],
  ['Tần số góc khi có cộng hưởng', 'ω = 1/√(LC)'],
  ['Tổng trở khi có cộng hưởng', 'Z đạt giá trị nhỏ nhất và bằng R'],
  ['Cường độ dòng điện khi có cộng hưởng', 'I đạt cực đại và bằng U/R'],
  ['Mạch chỉ có tụ điện', 'dòng điện sớm pha π/2 so với điện áp'],
  ['Mạch chỉ có cuộn cảm thuần', 'dòng điện trễ pha π/2 so với điện áp'] ] },

/* ---------------- HOÁ ---------------- */
{ kho: 'hoa_kq', ten: 'Na + Al vào nước', hang: [
  ['Phản ứng thứ nhất khi cho Na vào nước', '2Na + 2H₂O → 2NaOH + H₂'],
  ['Phản ứng thứ hai của Al với kiềm', '2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂'],
  ['Khí thu được ở cả hai phản ứng', 'khí hydrogen'],
  ['Muối có trong dung dịch sau phản ứng', 'NaAlO₂'],
  ['Chất rắn còn lại nếu có', 'nhôm còn dư'],
  ['Điều kiện để Al tan hết', 'số mol Al nhỏ hơn hoặc bằng số mol Na'],
  ['Vai trò của Al trong phản ứng thứ hai', 'chất khử, bị kiềm hoà tan'],
  ['Kim loại có thể thay Na trong dạng bài này', 'K, Ba hoặc Ca'],
  ['Phản ứng khi thay Na bằng Ba', 'Ba + 2H₂O → Ba(OH)₂ + H₂'],
  ['Kim loại không tan trong dung dịch kiềm', 'Fe, Cu, Mg'] ] },

{ kho: 'hoa_kq', ten: 'Hợp chất sắt – bảng phản ứng', hang: [
  ['Tính chất vật lí riêng của sắt', 'có tính nhiễm từ nên bị nam châm hút'],
  ['Số electron Fe nhường khi lên Fe³⁺', 'nhường 3 electron'],
  ['Số electron FeO nhường khi lên Fe³⁺', 'nhường 1 electron'],
  ['Số electron Fe₃O₄ nhường khi lên Fe³⁺', 'nhường 1 electron'],
  ['Hợp chất sắt vừa oxi hoá vừa khử', 'FeO, Fe(OH)₂, FeCl₂, Fe₃O₄'],
  ['Hợp chất sắt chỉ có tính oxi hoá', 'Fe₂O₃, Fe(OH)₃, FeCl₃'],
  ['Màu của kết tủa Fe(OH)₂', 'trắng xanh rồi hoá nâu đỏ ngoài không khí'],
  ['Màu của kết tủa Fe(OH)₃', 'nâu đỏ'],
  ['Thuốc thử nhận biết ion Fe³⁺', 'dung dịch KSCN cho màu đỏ máu'],
  ['Dung dịch hoà tan Fe mà không tạo khí', 'dung dịch FeCl₃ hoặc CuSO₄'] ] },

{ kho: 'hoa_kq', ten: 'Phản ứng của carbohydrate', hang: [
  ['Phản ứng lên men rượu của glucose', 'C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂'],
  ['Phản ứng thuỷ phân tinh bột và cellulose', '(C₆H₁₀O₅)n + nH₂O → nC₆H₁₂O₆'],
  ['Sản phẩm khi khử glucose bằng H₂', 'sorbitol C₆H₁₄O₆'],
  ['Sản phẩm của cellulose với HNO₃ đặc', 'cellulose trinitrate, thuốc súng không khói'],
  ['Phương trình quang hợp ở cây xanh', '6nCO₂ + 5nH₂O → (C₆H₁₀O₅)n + 6nO₂'],
  ['Thuốc thử nhận biết hồ tinh bột', 'dung dịch iodine cho màu xanh tím'],
  ['Chất hoà tan Cu(OH)₂ cho dung dịch xanh lam', 'glucose, fructose, saccharose'],
  ['Chất tham gia phản ứng tráng bạc', 'glucose, fructose, maltose'],
  ['Carbohydrate không tráng bạc', 'saccharose, tinh bột, cellulose'],
  ['Công thức tính khối lượng ethanol từ tinh bột', 'm ethanol = m tinh bột × 92/162 × hiệu suất'],
  ['Sản phẩm thuỷ phân saccharose', 'glucose và fructose'] ] },

{ kho: 'hoa_kq', ten: 'Phản ứng điều chế quan trọng', hang: [
  ['Điều chế acetylene từ methane', '2CH₄ → C₂H₂ + 3H₂ ở 1500 °C làm lạnh nhanh'],
  ['Điều chế acetylene từ calcium carbide', 'CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂'],
  ['Điều chế methane trong phòng thí nghiệm', 'CH₃COONa + NaOH → CH₄ + Na₂CO₃'],
  ['Điều chế methane từ nhôm carbide', 'Al₄C₃ + 12H₂O → 3CH₄ + 4Al(OH)₃'],
  ['Điều chế ethanol từ ethylene', 'C₂H₄ + H₂O → C₂H₅OH'],
  ['Điều chế ethanol bằng con đường sinh hoá', 'lên men glucose thành rượu và khí carbonic'],
  ['Phản ứng hydrate hoá acetylene', 'C₂H₂ + H₂O → CH₃CHO'],
  ['Xúc tác của phản ứng vôi tôi xút', 'CaO đun nóng'],
  ['Xúc tác hydrate hoá ethylene', 'H₃PO₄ đun nóng'],
  ['Xúc tác hydrate hoá acetylene', 'HgSO₄ trong H₂SO₄ ở 80 °C'] ] },

{ kho: 'hoa_kq', ten: 'Số Ag khi tráng bạc', hang: [
  ['Số mol Ag do một nhóm CHO sinh ra', '2 mol Ag'],
  ['Số mol Ag do HCHO sinh ra', '4 mol Ag'],
  ['Số mol Ag do glyoxal (CHO)₂ sinh ra', '4 mol Ag'],
  ['Sản phẩm oxi hoá HCHO qua hai nấc', 'muối (NH₄)₂CO₃'],
  ['Ý nghĩa khi tỉ lệ mol Ag trên mol chất bằng 4', 'chất là HCHO hoặc aldehyde hai chức'],
  ['Thuốc thử của phản ứng tráng bạc', 'AgNO₃ trong dung dịch NH₃ dư'],
  ['Ứng dụng của glucose trong công nghiệp', 'tráng gương và tráng ruột phích'],
  ['Ứng dụng của glucose trong y học', 'thuốc tăng lực và dịch truyền'],
  ['Ester tráng bạc được', 'ester của acid formic như HCOOCH₃'],
  ['Carbohydrate cho phản ứng tráng bạc', 'glucose, fructose và maltose'] ] },

{ kho: 'hoa_kq', ten: 'Đếm đồng phân nâng cao', hang: [
  ['Công thức đếm triglyceride từ n acid béo', 'n²(n + 1)/2'],
  ['Công thức đếm đipeptide từ n amino acid', 'n²'],
  ['Số đồng phân alkane của C₅H₁₂', '3 đồng phân'],
  ['Số đồng phân alkane của C₆H₁₄', '5 đồng phân'],
  ['Số đồng phân ester của C₄H₈O₂', '4 đồng phân'],
  ['Số đồng phân ester của C₃H₆O₂', '2 đồng phân'],
  ['Số đồng phân amine của C₃H₉N', '4 đồng phân gồm 2 bậc một, 1 bậc hai, 1 bậc ba'],
  ['Số đồng phân alcohol no đơn hở của C₄H₁₀O', '4 đồng phân'],
  ['Số tripeptide chứa đủ ba amino acid khác nhau', '6 hoán vị'],
  ['Số đồng phân amino acid của C₃H₇NO₂', '2 đồng phân'] ] },

{ kho: 'hoa_kq', ten: 'Thành phần nguyên tố', hang: [
  ['Nguyên tố trong alkane, alkene và alkyne', 'chỉ có C và H'],
  ['Nguyên tố trong benzene, toluene, styrene', 'chỉ có C và H'],
  ['Nguyên tố trong alcohol, aldehyde, acid, ester', 'có C, H và O'],
  ['Nguyên tố trong carbohydrate', 'có C, H và O'],
  ['Nguyên tố trong amine', 'có C, H và N'],
  ['Nguyên tố trong amino acid và peptide', 'có C, H, O và N'],
  ['Nguyên tố protein phức tạp còn có thể chứa', 'S, P, Fe hoặc Zn'],
  ['Điều kiện để hydrocarbon ở thể khí', 'số nguyên tử carbon nhỏ hơn hoặc bằng 4'],
  ['Amine ở thể khí điều kiện thường', 'CH₃NH₂, (CH₃)₂NH, (CH₃)₃N và C₂H₅NH₂'],
  ['Hợp chất hữu cơ thể khí hay được hỏi', 'CH₄, C₂H₄, C₂H₂, C₃H₈, C₄H₁₀ và HCHO'] ] },

{ kho: 'hoa_ct', ten: 'H⁺ và NO₃⁻ đóng vai trò acid – chất oxi hoá', hang: [
  ['Bán phản ứng tạo khí NO', '4H⁺ + NO₃⁻ + 3e → NO + 2H₂O'],
  ['Bán phản ứng tạo khí NO₂', '2H⁺ + NO₃⁻ + 1e → NO₂ + H₂O'],
  ['Bán phản ứng tạo khí N₂O', '10H⁺ + 2NO₃⁻ + 8e → N₂O + 5H₂O'],
  ['Bán phản ứng tạo khí N₂', '12H⁺ + 2NO₃⁻ + 10e → N₂ + 6H₂O'],
  ['Bán phản ứng tạo ion amoni', '10H⁺ + NO₃⁻ + 8e → NH₄⁺ + 3H₂O'],
  ['Số mol H⁺ khi sản phẩm khử là NO', 'gấp 4 lần số mol NO'],
  ['Số mol H⁺ khi sản phẩm khử là NO₂', 'gấp 2 lần số mol NO₂'],
  ['Tính oxi hoá của hỗn hợp HCl và NaNO₃', 'giống hệt dung dịch HNO₃ loãng'],
  ['Số mol NO₃⁻ còn lại trong muối', 'bằng số mol electron mà kim loại nhường'],
  ['Dấu hiệu khí NO hoá nâu ngoài không khí', '2NO + O₂ → 2NO₂ màu nâu đỏ'] ] },

{ kho: 'hoa_ct', ten: 'Đốt cháy hợp chất hữu cơ', hang: [
  ['Quan hệ độ bất bão hoà với sản phẩm cháy', 'n chất × (k − 1) = nCO₂ − nH₂O'],
  ['Cách tính số C trung bình', 'lấy số mol CO₂ chia số mol chất'],
  ['Cách tính số H trung bình', 'lấy hai lần số mol H₂O chia số mol chất'],
  ['Bảo toàn nguyên tố oxygen khi đốt', 'nO trong chất + 2nO₂ = 2nCO₂ + nH₂O'],
  ['Dấu hiệu khi đốt alkane', 'số mol H₂O lớn hơn số mol CO₂'],
  ['Cách tính số mol alkane từ sản phẩm cháy', 'lấy số mol H₂O trừ số mol CO₂'],
  ['Dấu hiệu khi đốt alkene hoặc cycloalkane', 'số mol CO₂ đúng bằng số mol H₂O'],
  ['Dấu hiệu khi đốt alkyne hoặc alkadiene', 'số mol CO₂ lớn hơn số mol H₂O đúng bằng số mol chất'],
  ['Bảo toàn khối lượng khi đốt cháy', 'm chất + mO₂ = mCO₂ + mH₂O'],
  ['Công thức độ bất bão hoà của CxHyOz', 'k = (2x + 2 − y)/2'] ] },

{ kho: 'hoa_ct', ten: 'Amine & muối amoni', hang: [
  ['Công thức chung amine no đơn chức mạch hở', 'CₙH₂ₙ₊₃N'],
  ['Dấu hiệu đốt cháy amine no đơn hở', 'nH₂O − nCO₂ = 1,5 lần số mol amine'],
  ['Số mol HCl phản ứng với amine', 'bằng số nhóm NH₂ nhân số mol amine'],
  ['Bảo toàn khối lượng khi amine tạo muối', 'm muối = m amine + 36,5 nhân số mol HCl'],
  ['So sánh tính base của amine no với ammonia', 'amine no mạnh hơn ammonia'],
  ['So sánh tính base của aniline với ammonia', 'aniline yếu hơn ammonia'],
  ['Tác dụng của amine no với quỳ tím ẩm', 'làm quỳ tím hoá xanh'],
  ['Thuốc thử nhận biết aniline', 'nước bromine cho kết tủa trắng'],
  ['Dấu hiệu muối amoni tác dụng với kiềm', 'giải phóng khí làm xanh quỳ tím ẩm'],
  ['Cách xác định bậc của amine', 'đếm số nguyên tử H của NH₃ đã bị thay thế'] ] },

{ kho: 'hoa_ct', ten: 'Ăn mòn kim loại và cách chống', hang: [
  ['Bản chất của ăn mòn hoá học', 'kim loại nhường electron trực tiếp cho chất oxi hoá'],
  ['Bản chất của ăn mòn điện hoá', 'phát sinh dòng electron chạy giữa hai điện cực'],
  ['Điều kiện thứ nhất của ăn mòn điện hoá', 'hai điện cực khác bản chất'],
  ['Điều kiện thứ hai của ăn mòn điện hoá', 'hai điện cực tiếp xúc trực tiếp hoặc qua dây dẫn'],
  ['Điều kiện thứ ba của ăn mòn điện hoá', 'cùng nhúng trong một dung dịch chất điện li'],
  ['Điện cực bị ăn mòn trước', 'kim loại mạnh hơn đóng vai trò cực âm'],
  ['Quá trình xảy ra ở cực âm', 'kim loại bị oxi hoá thành ion và tan ra'],
  ['So sánh tốc độ hai kiểu ăn mòn', 'ăn mòn điện hoá nhanh hơn nhiều lần'],
  ['Cách chống ăn mòn bằng cách li', 'sơn, mạ, tráng men hoặc bôi dầu mỡ'],
  ['Cách chống ăn mòn bằng bảo vệ điện hoá', 'gắn khối kẽm vào vỏ tàu thép để kẽm bị ăn mòn thay'],
  ['Hiện tượng gang thép để trong không khí ẩm', 'bị ăn mòn điện hoá vì có sắt và carbon tiếp xúc nhau'] ] },

/* ---------------- SINH ---------------- */
{ kho: 'sinh_ct', ten: 'Tần số hoán vị & bản đồ di truyền', hang: [
  ['Công thức tính tần số hoán vị gene', 'lấy số cá thể tái tổ hợp chia tổng số cá thể rồi nhân 100 phần trăm'],
  ['Khoảng giá trị của tần số hoán vị', 'lớn hơn 0 và không vượt quá 50 phần trăm'],
  ['Tỉ lệ mỗi loại giao tử liên kết', 'bằng (1 − f) chia 2'],
  ['Tỉ lệ mỗi loại giao tử hoán vị', 'bằng f chia 2'],
  ['Đơn vị khoảng cách trên bản đồ di truyền', 'centiMorgan, một cM ứng với một phần trăm hoán vị'],
  ['Thời điểm xảy ra hoán vị gene', 'kì đầu của giảm phân I'],
  ['Vị trí xảy ra hoán vị gene', 'giữa hai chromatid khác nguồn trong cặp tương đồng'],
  ['Ý nghĩa của hoán vị gene', 'tạo biến dị tổ hợp làm tăng đa dạng di truyền'],
  ['Quan hệ giữa khoảng cách gene và tần số hoán vị', 'hai gene càng xa nhau thì tần số hoán vị càng lớn'],
  ['Ý nghĩa khi tần số hoán vị bằng 50 phần trăm', 'hai gene coi như phân li độc lập'] ] },

{ kho: 'sinh_ct', ten: 'Chuỗi & lưới thức ăn', hang: [
  ['Sinh vật khởi đầu chuỗi thức ăn', 'sinh vật sản xuất hoặc mùn bã hữu cơ'],
  ['Bậc dinh dưỡng cấp một', 'sinh vật sản xuất'],
  ['Bậc dinh dưỡng cấp hai', 'sinh vật tiêu thụ bậc một'],
  ['Bậc dinh dưỡng cấp ba', 'sinh vật tiêu thụ bậc hai'],
  ['Điều kiện hình thành lưới thức ăn', 'một loài tham gia đồng thời nhiều chuỗi thức ăn'],
  ['Quan hệ giữa độ phức tạp của lưới và độ ổn định', 'lưới càng phức tạp hệ sinh thái càng ổn định'],
  ['Hiệu suất sinh thái giữa hai bậc liền kề', 'khoảng 10 phần trăm'],
  ['Tháp sinh thái luôn có đáy rộng nhất', 'tháp năng lượng'],
  ['Vai trò của sinh vật phân giải', 'trả chất vô cơ về lại môi trường'],
  ['Lí do chuỗi thức ăn ít khi quá sáu mắt xích', 'năng lượng hao hụt rất lớn qua mỗi bậc'] ] },

{ kho: 'sinh_ct', ten: 'Tuần hoàn & cân bằng nội môi', hang: [
  ['Chiều biến đổi huyết áp trong hệ mạch', 'giảm dần từ động mạch chủ tới tĩnh mạch chủ'],
  ['Nơi có huyết áp lớn nhất', 'động mạch chủ'],
  ['Nơi có vận tốc máu nhỏ nhất', 'mao mạch'],
  ['Nguyên nhân vận tốc máu ở mao mạch nhỏ nhất', 'tổng tiết diện của mao mạch là lớn nhất'],
  ['Ý nghĩa của vận tốc máu chậm ở mao mạch', 'tạo điều kiện thuận lợi cho trao đổi chất'],
  ['Thời gian một chu kì tim ở người trưởng thành', 'khoảng 0,8 giây'],
  ['Thời gian pha co tâm nhĩ', '0,1 giây'],
  ['Thời gian pha co tâm thất', '0,3 giây'],
  ['Thời gian pha dãn chung', '0,4 giây'],
  ['Cách tính nhịp tim mỗi phút', 'lấy 60 chia cho thời gian một chu kì tim'],
  ['Hormone làm hạ đường huyết', 'insulin'],
  ['Hormone làm tăng đường huyết', 'glucagon'],
  ['Cơ quan chủ yếu điều hoà cân bằng nội môi', 'gan, thận và hệ nội tiết'],
  ['Bộ phận phát nhịp cho tim', 'nút xoang nhĩ'] ] },

{ kho: 'sinh_ct', ten: 'Trao đổi nước & dinh dưỡng khoáng ở thực vật', hang: [
  ['Cơ chế nước đi từ đất vào rễ', 'thẩm thấu theo chiều giảm thế nước'],
  ['Mạch vận chuyển nước và ion khoáng', 'mạch gỗ'],
  ['Mạch vận chuyển chất hữu cơ', 'mạch rây'],
  ['Động lực thứ nhất của dòng mạch gỗ', 'áp suất rễ đẩy từ dưới lên'],
  ['Động lực thứ hai của dòng mạch gỗ', 'lực hút do thoát hơi nước ở lá'],
  ['Động lực thứ ba của dòng mạch gỗ', 'lực liên kết giữa các phân tử nước với nhau và với thành mạch'],
  ['Động lực chủ yếu của dòng mạch gỗ', 'lực hút do thoát hơi nước ở lá'],
  ['Con đường thoát hơi nước chủ yếu', 'qua khí khổng ở lá'],
  ['Vai trò của thoát hơi nước', 'tạo lực hút, hạ nhiệt cho lá và mở đường cho CO₂ đi vào'],
  ['Các nguyên tố đa lượng', 'N, P, K, S, Ca và Mg'],
  ['Biểu hiện khi cây thiếu nitrogen', 'lá vàng nhạt và cây sinh trưởng kém'],
  ['Biểu hiện khi cây thiếu magnesium', 'vàng phần thịt lá ở giữa các gân lá'],
  ['Dạng nitrogen mà rễ hấp thụ được', 'ion NH₄⁺ và ion NO₃⁻'],
  ['Hiện tượng ứ giọt chứng minh điều gì', 'chứng minh cây có áp suất rễ'] ] },

/* ---------------- SỬ ---------------- */
{ kho: 'su_ct', ten: 'Công cuộc Đổi mới (1986 → nay)', hang: [
  ['Đại hội khởi xướng đường lối Đổi mới', 'Đại hội VI tháng 12 năm 1986'],
  ['Trọng tâm của đường lối Đổi mới', 'đổi mới về kinh tế'],
  ['Cơ chế kinh tế trước Đổi mới', 'tập trung quan liêu bao cấp'],
  ['Mô hình kinh tế từ sau Đổi mới', 'kinh tế thị trường định hướng xã hội chủ nghĩa'],
  ['Ba chương trình kinh tế lớn', 'lương thực thực phẩm, hàng tiêu dùng và hàng xuất khẩu'],
  ['Năm Việt Nam bắt đầu xuất khẩu gạo', 'năm 1989'],
  ['Năm Việt Nam gia nhập ASEAN', 'năm 1995'],
  ['Năm Việt Nam gia nhập APEC', 'năm 1998'],
  ['Năm Việt Nam gia nhập WTO', 'năm 2007'],
  ['Năm ký Hiệp định Thương mại Việt Nam và Hoa Kỳ', 'năm 2000'],
  ['Bài học về lực lượng tiến hành Đổi mới', 'lấy dân làm gốc'],
  ['Bài học về cách tiến hành Đổi mới', 'toàn diện và đồng bộ nhưng có bước đi phù hợp'] ] },

{ kho: 'su_ct', ten: 'Công thức phân tích một sự kiện lịch sử', hang: [
  ['Tầng thứ nhất của khung phân tích', 'bối cảnh trong nước và bối cảnh thế giới'],
  ['Tầng thứ hai của khung phân tích', 'diễn biến chính của sự kiện'],
  ['Tầng thứ ba của khung phân tích', 'kết quả đạt được'],
  ['Tầng thứ tư của khung phân tích', 'ý nghĩa lịch sử'],
  ['Tầng thứ năm của khung phân tích', 'bài học kinh nghiệm và tác động'],
  ['Nguyên nhân quyết định nhất thường thuộc về', 'nhân tố chủ quan như sự lãnh đạo của Đảng'],
  ['Nguyên nhân khách quan thường là', 'bối cảnh quốc tế thuận lợi và sự ủng hộ từ bên ngoài'],
  ['Câu hỏi ý nghĩa lớn nhất thường gắn với', 'bước ngoặt mở ra một kỉ nguyên mới'],
  ['Cách phân biệt kết quả với ý nghĩa', 'kết quả là cái đạt được ngay còn ý nghĩa là giá trị lâu dài'],
  ['Từ khoá nhận ra câu hỏi so sánh', 'điểm giống nhau, điểm khác nhau và điểm mới'] ] },

{ kho: 'su_ct', ten: 'Ba chặng của Đổi mới và những con số biết nói', hang: [
  ['Mốc mở đầu chặng thứ nhất', 'Đại hội VI tháng 12 năm 1986'],
  ['Chính sách nông nghiệp tiêu biểu chặng thứ nhất', 'Khoán 10'],
  ['Năm Việt Nam trở thành nước xuất khẩu gạo', 'năm 1989'],
  ['Nội dung chính của chặng thứ hai', 'đẩy mạnh công nghiệp hoá và hiện đại hoá'],
  ['Hiệp định thương mại ký năm 2000', 'Hiệp định Thương mại Việt Nam và Hoa Kỳ'],
  ['Sự kiện mở đầu chặng thứ ba', 'gia nhập WTO năm 2007'],
  ['Hiệp định thương mại thế hệ mới đã tham gia', 'CPTPP và EVFTA'] ] },

/* ---------------- VĂN ---------------- */
{ kho: 'van_ct', ten: 'Bộ câu trả lời mẫu cho 5 dạng câu đọc hiểu', hang: [
  ['Cách trả lời dạng câu nhận biết', 'trả lời thẳng một câu và không giải thích thêm'],
  ['Nội dung thường hỏi ở dạng nhận biết', 'thể thơ, phương thức biểu đạt, phong cách và ngôi kể'],
  ['Cách trả lời dạng chỉ ra chi tiết', 'trích đúng ý đã có sẵn trong văn bản'],
  ['Dấu hiệu nhận ra dạng chỉ ra chi tiết', 'câu hỏi mở đầu bằng cụm Theo tác giả'],
  ['Ba bước trả lời câu hỏi biện pháp tu từ', 'gọi tên biện pháp, chỉ ra biểu hiện rồi nêu tác dụng'],
  ['Nội dung phần nêu tác dụng', 'hiệu quả về hình ảnh nhịp điệu, về nội dung và về tình cảm tác giả'],
  ['Ba bước trả lời câu hiểu một ý kiến', 'giải thích từ khoá, diễn giải cả câu rồi nêu ý nghĩa'],
  ['Cách trả lời câu hỏi thông điệp', 'nêu rõ một thông điệp rồi lí giải ngắn bằng trải nghiệm'],
  ['Lỗi thường gặp ở câu nhận biết', 'viết dài dòng và giải thích thừa'],
  ['Lỗi thường gặp ở câu thông điệp', 'nêu nhiều thông điệp mà không lí giải cái nào'] ] },

{ kho: 'van_ct', ten: 'Bảng phân bổ thời gian & tiêu chí chấm', hang: [
  ['Thời gian dành cho phần đọc hiểu', '20 đến 25 phút'],
  ['Thời gian viết đoạn văn nghị luận', 'khoảng 25 phút'],
  ['Thời gian viết bài văn nghị luận', '65 đến 70 phút'],
  ['Thời gian dành để soát lại bài', 'khoảng 5 phút'],
  ['Điểm của phần đọc hiểu', '4,0 điểm'],
  ['Điểm của phần viết đoạn văn', '2,0 điểm'],
  ['Điểm của phần viết bài văn', '4,0 điểm'],
  ['Tiêu chí thứ nhất khi chấm phần viết', 'đảm bảo cấu trúc của đoạn hoặc của bài'],
  ['Tiêu chí thứ hai khi chấm phần viết', 'xác định đúng vấn đề nghị luận'],
  ['Tiêu chí thứ ba khi chấm phần viết', 'triển khai nội dung, chiếm nhiều điểm nhất'],
  ['Tiêu chí thứ tư khi chấm phần viết', 'chính tả, dùng từ và đặt câu'],
  ['Tiêu chí thứ năm khi chấm phần viết', 'sáng tạo trong suy nghĩ và diễn đạt'] ] },

{ kho: 'van_ct', ten: 'Truyện — tuỳ bút — tản văn: phân biệt bằng ba câu hỏi', hang: [
  ['Câu hỏi thứ nhất để phân loại văn bản', 'có nhân vật và chuỗi sự việc nối tiếp nhau hay không'],
  ['Dấu hiệu nhận ra thể loại truyện', 'có nhân vật có tên và có cốt truyện'],
  ['Dấu hiệu hình thức của truyện', 'lời thoại đặt sau dấu gạch ngang và có mốc thời gian đẩy sự việc'],
  ['Ba phần của một cốt truyện', 'mở đầu, diễn biến và kết thúc'],
  ['Dấu hiệu chung của tuỳ bút và tản văn', 'không có cốt truyện và người viết xưng tôi'],
  ['Đặc trưng riêng của tuỳ bút', 'nghiêng về cảm xúc và cái tôi trữ tình, mạch viết theo dòng cảm nghĩ'],
  ['Đặc trưng riêng của tản văn', 'ngắn gọn, bám một sự việc đời thường rồi chốt lại một ý'],
  ['Dấu hiệu của văn bản nghị luận', 'có luận điểm, lí lẽ và dẫn chứng để thuyết phục người đọc'],
  ['Dấu hiệu của văn bản thông tin', 'cung cấp số liệu và quy trình mà không bàn luận'],
  ['Ký là tên gọi chung của những thể nào', 'bút ký, phóng sự, hồi ký và tuỳ bút'] ] }

  ];

  let vaN = 0, thieu = [];
  BO.forEach(b => {
    const kho = TD.KHO[b.kho] || [];
    const gap = kho.filter(x => (x.chu_de || x.ten) === b.ten);
    if (!gap.length) { thieu.push(b.kho + ' · ' + b.ten); return; }
    gap.forEach(x => {
      const truong = ('ct' in x) ? 'ct' : ('dap' in x) ? 'dap' : 'than';
      /* KHÔNG dùng chú thích HTML làm dấu: chỗ nào escape dấu "<" là lòi ra
         nguyên cụm chú thích trên màn hình. Cắm cờ lên chính đối tượng thẻ. */
      if (x._chiBang) return;
      x._chiBang = true;
      x[truong] = String(x[truong] || '') + '<div class="mo-nhat" style="margin:.5rem 0 .2rem">Đề hay hỏi những ý sau:</div>' + bang(b.hang);
      vaN++;
    });
  });
  TD._boSungThe = { soThe: vaN, thieu: thieu };
})();
