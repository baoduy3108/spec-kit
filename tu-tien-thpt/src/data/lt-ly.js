/* ============================================================
   VẬT LÍ — KHO MỆNH ĐỀ LÝ THUYẾT TRỌNG ĐIỂM (Tà Đạo)
   Bám Vật lí 12 CT GDPT 2018: Nhiệt · Khí lí tưởng · Từ trường · Hạt nhân
   ============================================================ */
window.TD = window.TD || {}; TD.KHO_LT = TD.KHO_LT || {};

TD.KHO_LT.ly = [
/* ========== VẬT LÍ NHIỆT ========== */
{ cd: 'Vật lí nhiệt', m: 1, a: true,  t: 'Nội năng của một vật là tổng động năng chuyển động nhiệt của các phân tử và thế năng tương tác giữa chúng.', v: 'Nội năng phụ thuộc vào nhiệt độ và thể tích của vật.' },
{ cd: 'Vật lí nhiệt', m: 1, a: false, t: 'Nội năng của vật chỉ phụ thuộc vào nhiệt độ của vật.', v: 'Nội năng phụ thuộc cả nhiệt độ (động năng phân tử) lẫn thể tích (thế năng tương tác).' },
{ cd: 'Vật lí nhiệt', m: 1, a: true,  t: 'Có hai cách làm thay đổi nội năng của vật: thực hiện công và truyền nhiệt.', v: 'Đây chính là hai số hạng A và Q trong định luật I nhiệt động lực học.' },
{ cd: 'Vật lí nhiệt', m: 2, a: true,  t: 'Trong thang nhiệt độ Kelvin, độ chênh lệch nhiệt độ có giá trị bằng độ chênh lệch trong thang Celsius.', v: 'T = t + 273 nên ΔT = Δt, chỉ khác nhau ở gốc tính chứ không khác ở khoảng chia.' },
{ cd: 'Vật lí nhiệt', m: 2, a: false, t: 'Nhiệt độ 0 °C tương ứng với 0 K.', v: '0 °C = 273 K. Còn 0 K (độ không tuyệt đối) tương ứng −273 °C.' },
{ cd: 'Vật lí nhiệt', m: 2, a: true,  t: 'Nhiệt dung riêng của một chất là nhiệt lượng cần cung cấp để làm 1 kg chất đó tăng thêm 1 K.', v: 'Đơn vị J/(kg·K); nước có c = 4200 J/(kg·K), rất lớn nên nước điều hoà khí hậu tốt.' },
{ cd: 'Vật lí nhiệt', m: 2, a: true,  t: 'Trong quá trình chuyển thể, nhiệt độ của chất không thay đổi dù vẫn nhận nhiệt.', v: 'Nhiệt lượng nhận vào dùng để phá vỡ liên kết giữa các phân tử chứ không làm tăng động năng.' },
{ cd: 'Vật lí nhiệt', m: 2, a: false, t: 'Khi nước đá đang tan, nếu tiếp tục cung cấp nhiệt thì nhiệt độ của hỗn hợp sẽ tăng lên.', v: 'Nhiệt độ giữ nguyên 0 °C cho đến khi toàn bộ đá tan hết.' },
{ cd: 'Vật lí nhiệt', m: 2, a: true,  t: 'Nhiệt nóng chảy riêng λ là nhiệt lượng cần cung cấp để làm nóng chảy hoàn toàn 1 kg chất rắn ở nhiệt độ nóng chảy.', v: 'Công thức Q = λm; với nước đá λ = 3,34·10⁵ J/kg.' },
{ cd: 'Vật lí nhiệt', m: 3, a: true,  t: 'Theo định luật I nhiệt động lực học ΔU = A + Q, khi hệ nhận nhiệt thì Q mang dấu dương.', v: 'Quy ước: nhận nhiệt Q > 0, toả nhiệt Q < 0; nhận công A > 0, sinh công A < 0.' },
{ cd: 'Vật lí nhiệt', m: 3, a: false, t: 'Khi khí giãn nở và thực hiện công lên môi trường ngoài thì công A mang dấu dương.', v: 'Khí SINH công nên A < 0. A dương là khi khí NHẬN công, tức bị nén.' },
{ cd: 'Vật lí nhiệt', m: 3, a: true,  t: 'Trong quá trình đẳng tích, độ biến thiên nội năng đúng bằng nhiệt lượng hệ nhận được.', v: 'Thể tích không đổi nên khí không sinh công: A = 0, do đó ΔU = Q.' },
{ cd: 'Vật lí nhiệt', m: 3, a: true,  t: 'Trong quá trình đoạn nhiệt, hệ không trao đổi nhiệt với môi trường nên ΔU = A.', v: 'Q = 0, mọi thay đổi nội năng đều do công.' },
{ cd: 'Vật lí nhiệt', m: 2, a: true,  t: 'Phương trình cân bằng nhiệt phát biểu rằng nhiệt lượng do vật toả ra bằng nhiệt lượng do vật thu vào.', v: 'Đây là hệ quả của định luật bảo toàn năng lượng trong hệ cô lập về nhiệt.' },

/* ========== KHÍ LÍ TƯỞNG ========== */
{ cd: 'Khí lí tưởng', m: 2, a: true,  t: 'Trong quá trình đẳng nhiệt, áp suất và thể tích của một lượng khí xác định tỉ lệ nghịch với nhau.', v: 'Định luật Boyle: pV = hằng số.' },
{ cd: 'Khí lí tưởng', m: 2, a: false, t: 'Trong quá trình đẳng nhiệt, áp suất tỉ lệ thuận với thể tích của khí.', v: 'Tỉ lệ NGHỊCH. Nén khí lại thì áp suất tăng lên.' },
{ cd: 'Khí lí tưởng', m: 2, a: true,  t: 'Trong quá trình đẳng tích, áp suất của một lượng khí tỉ lệ thuận với nhiệt độ tuyệt đối.', v: 'Định luật Charles: p/T = hằng số, với T tính bằng Kelvin.' },
{ cd: 'Khí lí tưởng', m: 2, a: true,  t: 'Trong quá trình đẳng áp, thể tích của một lượng khí tỉ lệ thuận với nhiệt độ tuyệt đối.', v: 'Định luật Gay-Lussac: V/T = hằng số.' },
{ cd: 'Khí lí tưởng', m: 2, a: false, t: 'Trong các định luật chất khí, nhiệt độ có thể tính bằng độ Celsius.', v: 'Bắt buộc dùng nhiệt độ tuyệt đối Kelvin, nếu không tỉ lệ sẽ sai hoàn toàn.' },
{ cd: 'Khí lí tưởng', m: 2, a: true,  t: 'Phương trình Clapeyron–Mendeleev có dạng pV = nRT với R ≈ 8,31 J/(mol·K).', v: 'Áp dụng cho mọi lượng khí lí tưởng, khác với phương trình trạng thái chỉ dùng cho cùng một lượng khí.' },
{ cd: 'Khí lí tưởng', m: 3, a: true,  t: 'Động năng trung bình của phân tử khí lí tưởng tỉ lệ thuận với nhiệt độ tuyệt đối và không phụ thuộc bản chất chất khí.', v: 'W̄đ = (3/2)kT với k là hằng số Boltzmann.' },
{ cd: 'Khí lí tưởng', m: 3, a: false, t: 'Ở cùng nhiệt độ, phân tử khí có khối lượng lớn hơn thì có động năng trung bình lớn hơn.', v: 'Động năng trung bình chỉ phụ thuộc nhiệt độ. Phân tử nặng hơn thì chuyển động CHẬM hơn để bù lại.' },
{ cd: 'Khí lí tưởng', m: 2, a: true,  t: 'Áp suất chất khí lên thành bình được gây ra bởi va chạm của các phân tử khí vào thành bình.', v: 'Đó là nội dung cốt lõi của thuyết động học phân tử chất khí.' },
{ cd: 'Khí lí tưởng', m: 2, a: true,  t: 'Trong mô hình khí lí tưởng, thể tích riêng của các phân tử được bỏ qua và chúng chỉ tương tác khi va chạm.', v: 'Va chạm được coi là hoàn toàn đàn hồi.' },
{ cd: 'Khí lí tưởng', m: 2, a: false, t: 'Trong mô hình khí lí tưởng, các phân tử luôn hút nhau bằng lực tương tác phân tử.', v: 'Khí lí tưởng bỏ qua tương tác giữa các phân tử, trừ lúc va chạm.' },

/* ========== TỪ TRƯỜNG ========== */
{ cd: 'Từ trường', m: 1, a: true,  t: 'Đơn vị của cảm ứng từ trong hệ SI là tesla (T).', v: 'Weber là đơn vị của từ thông, henry là của độ tự cảm.' },
{ cd: 'Từ trường', m: 1, a: false, t: 'Đơn vị của cảm ứng từ trong hệ SI là weber (Wb).', v: 'Weber là đơn vị TỪ THÔNG. Cảm ứng từ có đơn vị tesla.' },
{ cd: 'Từ trường', m: 2, a: true,  t: 'Lực từ tác dụng lên đoạn dây dẫn mang dòng điện đặt song song với đường sức từ bằng không.', v: 'F = BIL·sinα, với α = 0 thì sinα = 0.' },
{ cd: 'Từ trường', m: 2, a: false, t: 'Lực từ tác dụng lên đoạn dây dẫn mang dòng điện đạt cực đại khi dây song song với các đường sức từ.', v: 'Cực đại khi dây VUÔNG GÓC với đường sức (α = 90°). Song song thì lực bằng 0.' },
{ cd: 'Từ trường', m: 2, a: true,  t: 'Từ thông qua một khung dây được tính bằng Φ = NBS·cosα, trong đó α là góc giữa vectơ cảm ứng từ và vectơ pháp tuyến của mặt phẳng khung.', v: 'Nếu mặt phẳng khung song song với B thì α = 90° và Φ = 0.' },
{ cd: 'Từ trường', m: 3, a: false, t: 'Trong công thức từ thông Φ = NBS·cosα, góc α là góc giữa vectơ cảm ứng từ và mặt phẳng khung dây.', v: 'α là góc với vectơ PHÁP TUYẾN của mặt phẳng khung, không phải với chính mặt phẳng đó.' },
{ cd: 'Từ trường', m: 2, a: true,  t: 'Suất điện động cảm ứng xuất hiện trong mạch kín khi từ thông qua mạch biến thiên.', v: 'Định luật Faraday: e = −ΔΦ/Δt.' },
{ cd: 'Từ trường', m: 2, a: false, t: 'Chỉ cần có từ thông qua mạch kín là trong mạch xuất hiện dòng điện cảm ứng.', v: 'Phải có từ thông BIẾN THIÊN. Từ thông lớn nhưng không đổi thì không sinh dòng cảm ứng.' },
{ cd: 'Từ trường', m: 3, a: true,  t: 'Theo định luật Lenz, dòng điện cảm ứng có chiều sao cho từ trường do nó sinh ra chống lại sự biến thiên từ thông đã sinh ra nó.', v: 'Đây là hệ quả trực tiếp của định luật bảo toàn năng lượng.' },
{ cd: 'Từ trường', m: 3, a: true,  t: 'Khi đưa một cực của nam châm lại gần ống dây kín, ống dây sẽ đẩy nam châm ra.', v: 'Từ thông tăng nên dòng cảm ứng sinh từ trường chống lại, tạo lực đẩy — đúng định luật Lenz.' },
{ cd: 'Từ trường', m: 2, a: true,  t: 'Máy biến áp hoạt động dựa trên hiện tượng cảm ứng điện từ và chỉ dùng được với dòng điện xoay chiều.', v: 'Dòng một chiều không đổi không tạo từ thông biến thiên nên không có suất điện động cảm ứng ở cuộn thứ cấp.' },
{ cd: 'Từ trường', m: 2, a: false, t: 'Máy biến áp có thể dùng để thay đổi hiệu điện thế của dòng điện một chiều không đổi.', v: 'Không được — dòng một chiều không đổi không tạo ra từ thông biến thiên.' },
{ cd: 'Từ trường', m: 3, a: true,  t: 'Trong máy biến áp lí tưởng, nếu hiệu điện thế ở cuộn thứ cấp giảm thì cường độ dòng điện ở cuộn đó tăng.', v: 'Công suất bảo toàn: U₁I₁ = U₂I₂.' },
{ cd: 'Từ trường', m: 3, a: false, t: 'Máy hạ áp làm giảm cả hiệu điện thế lẫn cường độ dòng điện ở cuộn thứ cấp.', v: 'Hạ áp thì U giảm nhưng I TĂNG, vì công suất được bảo toàn.' },
{ cd: 'Từ trường', m: 3, a: true,  t: 'Khi truyền tải điện năng đi xa, tăng hiệu điện thế lên k lần thì công suất hao phí trên đường dây giảm k² lần.', v: 'P_hp = P²R/(U²cos²φ) nên hao phí tỉ lệ nghịch với bình phương hiệu điện thế.' },
{ cd: 'Từ trường', m: 3, a: false, t: 'Để giảm hao phí khi truyền tải điện năng, người ta giảm hiệu điện thế trước khi truyền đi.', v: 'Phải TĂNG hiệu điện thế. Đó là lý do có đường dây cao thế 500 kV.' },
{ cd: 'Từ trường', m: 2, a: true,  t: 'Giá trị hiệu dụng của dòng điện xoay chiều bằng giá trị cực đại chia cho căn bậc hai của 2.', v: 'I = I₀/√2; các thiết bị đo thông thường đều chỉ giá trị hiệu dụng.' },

/* ========== VẬT LÍ HẠT NHÂN ========== */
{ cd: 'Vật lí hạt nhân', m: 1, a: true,  t: 'Hạt nhân ᴬZX có Z proton và (A − Z) neutron.', v: 'A là số khối (tổng số nuclon), Z là số hiệu nguyên tử.' },
{ cd: 'Vật lí hạt nhân', m: 1, a: false, t: 'Hạt nhân ᴬZX có A proton và Z neutron.', v: 'Ngược. Z là số proton, A − Z mới là số neutron.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: true,  t: 'Khối lượng của hạt nhân luôn nhỏ hơn tổng khối lượng các nuclon tạo nên nó.', v: 'Phần chênh lệch là độ hụt khối Δm, ứng với năng lượng liên kết theo E = Δmc².' },
{ cd: 'Vật lí hạt nhân', m: 2, a: false, t: 'Khối lượng hạt nhân bằng đúng tổng khối lượng các proton và neutron tạo nên nó.', v: 'Luôn NHỎ HƠN. Chênh lệch đó chính là độ hụt khối.' },
{ cd: 'Vật lí hạt nhân', m: 3, a: true,  t: 'Để so sánh độ bền vững của các hạt nhân, phải dùng năng lượng liên kết riêng chứ không dùng năng lượng liên kết.', v: 'ε = W_lk/A; hạt nhân nặng có W_lk lớn nhưng chưa chắc bền hơn.' },
{ cd: 'Vật lí hạt nhân', m: 3, a: false, t: 'Hạt nhân có năng lượng liên kết càng lớn thì càng bền vững.', v: 'Phải so NĂNG LƯỢNG LIÊN KẾT RIÊNG W_lk/A. Hạt nhân bền nhất nằm quanh vùng số khối 50–80.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: true,  t: 'Trong phóng xạ β⁻, số khối A không đổi còn số hiệu nguyên tử Z tăng một đơn vị.', v: 'Một neutron biến thành proton: n → p + e⁻ + phản neutrino.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: false, t: 'Trong phóng xạ β⁻, số hiệu nguyên tử Z giảm một đơn vị.', v: 'Z TĂNG một đơn vị. Z giảm một đơn vị là phóng xạ β⁺.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: true,  t: 'Trong phóng xạ α, số khối giảm 4 đơn vị và số hiệu nguyên tử giảm 2 đơn vị.', v: 'Hạt α chính là hạt nhân ⁴₂He.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: true,  t: 'Tia γ là sóng điện từ, có khả năng đâm xuyên mạnh nhất trong ba loại tia phóng xạ α, β, γ.', v: 'Tia α đâm xuyên yếu nhất, bị chặn bởi tờ giấy; tia γ cần lớp chì dày.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: false, t: 'Tia α có khả năng đâm xuyên mạnh nhất trong ba loại tia phóng xạ.', v: 'Tia α đâm xuyên YẾU nhất nhưng ion hoá mạnh nhất. Tia γ mới đâm xuyên mạnh nhất.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: true,  t: 'Trong phóng xạ γ, số khối và số hiệu nguyên tử của hạt nhân đều không đổi.', v: 'Hạt nhân chỉ chuyển từ trạng thái kích thích về trạng thái cơ bản.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: true,  t: 'Chu kì bán rã là khoảng thời gian để một nửa số hạt nhân phóng xạ ban đầu bị phân rã.', v: 'Sau k chu kì bán rã, còn lại 1/2ᵏ số hạt ban đầu.' },
{ cd: 'Vật lí hạt nhân', m: 3, a: true,  t: 'Chu kì bán rã của một chất phóng xạ không phụ thuộc vào nhiệt độ, áp suất hay trạng thái hoá học của chất đó.', v: 'Phóng xạ là quá trình xảy ra bên trong hạt nhân, không chịu ảnh hưởng của điều kiện bên ngoài.' },
{ cd: 'Vật lí hạt nhân', m: 3, a: false, t: 'Có thể làm tăng tốc độ phân rã của một chất phóng xạ bằng cách tăng nhiệt độ.', v: 'Phóng xạ hoàn toàn không phụ thuộc điều kiện bên ngoài — đây là điểm khác hẳn phản ứng hoá học.' },
{ cd: 'Vật lí hạt nhân', m: 3, a: true,  t: 'Trong phản ứng hạt nhân, số nuclon và điện tích được bảo toàn nhưng khối lượng nghỉ thì không.', v: 'Phần khối lượng hụt đi chuyển thành năng lượng theo hệ thức E = mc².' },
{ cd: 'Vật lí hạt nhân', m: 3, a: false, t: 'Trong phản ứng hạt nhân, tổng khối lượng nghỉ của các hạt luôn được bảo toàn.', v: 'KHÔNG bảo toàn. Chỉ bảo toàn số nuclon, điện tích, động lượng và năng lượng toàn phần.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: true,  t: 'Phản ứng nhiệt hạch là phản ứng kết hợp hai hạt nhân rất nhẹ thành một hạt nhân nặng hơn.', v: 'Ví dụ phản ứng trong lòng Mặt Trời, cần nhiệt độ cỡ 10⁸ K.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: false, t: 'Phản ứng phân hạch là phản ứng kết hợp hai hạt nhân nhẹ thành hạt nhân nặng hơn.', v: 'Đó là NHIỆT HẠCH. Phân hạch là hạt nhân nặng vỡ thành các hạt nhân nhẹ hơn.' },
{ cd: 'Vật lí hạt nhân', m: 3, a: true,  t: 'Phản ứng nhiệt hạch toả ra năng lượng lớn hơn phân hạch nếu tính trên mỗi nuclon tham gia.', v: 'Tuy nhiên một phản ứng phân hạch đơn lẻ (~200 MeV) lại toả nhiều hơn một phản ứng nhiệt hạch (~17,6 MeV).' },
{ cd: 'Vật lí hạt nhân', m: 2, a: true,  t: 'Để phản ứng phân hạch dây chuyền tự duy trì, hệ số nhân neutron phải lớn hơn hoặc bằng 1.', v: 'k < 1 thì phản ứng tắt dần; k = 1 là chế độ kiểm soát trong lò phản ứng; k > 1 gây bùng nổ.' },

/* ========== KIẾN THỨC LỚP 10 – 11 THƯỜNG GẶP ========== */
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Trong va chạm mềm, động lượng được bảo toàn nhưng động năng thì không.', v: 'Một phần động năng chuyển thành nhiệt và biến dạng.' },
{ cd: 'Lớp 10 – 11', m: 2, a: false, t: 'Trong mọi va chạm, cả động lượng lẫn động năng đều được bảo toàn.', v: 'Chỉ va chạm đàn hồi mới bảo toàn cả hai. Va chạm mềm chỉ bảo toàn động lượng.' },
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Lực có phương vuông góc với độ dịch chuyển thì không sinh công.', v: 'A = F·s·cosα, với α = 90° thì cosα = 0.' },
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Trong dao động điều hoà, gia tốc luôn hướng về vị trí cân bằng và ngược dấu với li độ.', v: 'a = −ω²x, nên tại biên gia tốc cực đại còn tại vị trí cân bằng gia tốc bằng 0.' },
{ cd: 'Lớp 10 – 11', m: 2, a: false, t: 'Trong dao động điều hoà, tại vị trí biên vật có tốc độ lớn nhất.', v: 'Tại biên tốc độ bằng 0 còn gia tốc cực đại. Tốc độ cực đại ở vị trí cân bằng.' },
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Chu kì dao động của con lắc đơn không phụ thuộc vào khối lượng vật nặng.', v: 'T = 2π√(l/g) chỉ phụ thuộc chiều dài dây và gia tốc trọng trường.' },
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Tốc độ truyền sóng phụ thuộc vào môi trường truyền sóng chứ không phụ thuộc tần số nguồn.', v: 'Khi sóng truyền sang môi trường khác, tần số không đổi còn bước sóng thay đổi.' },
{ cd: 'Lớp 10 – 11', m: 2, a: false, t: 'Khi sóng truyền từ môi trường này sang môi trường khác, tần số của sóng thay đổi.', v: 'Tần số do NGUỒN quyết định nên không đổi. Tốc độ và bước sóng mới thay đổi.' },
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Trong đoạn mạch mắc nối tiếp, cường độ dòng điện qua các điện trở là như nhau.', v: 'Còn mắc song song thì hiệu điện thế trên các nhánh mới bằng nhau.' },
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Nhiệt lượng toả ra trên vật dẫn tỉ lệ với bình phương cường độ dòng điện qua nó.', v: 'Định luật Joule–Lenz: Q = I²Rt.' }
];

TD.KHO_LT.ly.push(
/* --- Nhiệt (bổ sung) --- */
{ cd: 'Vật lí nhiệt', m: 2, a: true,  t: 'Nhiệt hoá hơi riêng của nước lớn hơn nhiệt nóng chảy riêng của nước đá rất nhiều.', v: 'L ≈ 2,26·10⁶ J/kg so với λ ≈ 3,34·10⁵ J/kg — vì hoá hơi phải tách hẳn phân tử ra khỏi chất lỏng.' },
{ cd: 'Vật lí nhiệt', m: 2, a: true,  t: 'Sự bay hơi xảy ra ở mọi nhiệt độ còn sự sôi chỉ xảy ra ở nhiệt độ sôi xác định.', v: 'Bay hơi diễn ra trên bề mặt; sôi diễn ra cả trong lòng chất lỏng.' },
{ cd: 'Vật lí nhiệt', m: 2, a: false, t: 'Sự bay hơi của chất lỏng chỉ xảy ra khi chất lỏng đạt tới nhiệt độ sôi.', v: 'Bay hơi xảy ra ở MỌI nhiệt độ, đó là lý do quần áo phơi ngoài trời vẫn khô.' },
{ cd: 'Vật lí nhiệt', m: 2, a: true,  t: 'Khi nén khí đoạn nhiệt, nhiệt độ của khí tăng lên.', v: 'Q = 0 nên ΔU = A > 0 (khí nhận công) ⇒ nội năng tăng ⇒ nhiệt độ tăng.' },
{ cd: 'Vật lí nhiệt', m: 3, a: false, t: 'Khi khí giãn nở đoạn nhiệt, nhiệt độ của khí tăng lên.', v: 'Khí sinh công mà không nhận nhiệt nên nội năng GIẢM, nhiệt độ giảm.' },
{ cd: 'Vật lí nhiệt', m: 2, a: true,  t: 'Nước có nhiệt dung riêng lớn nên được dùng làm chất tải nhiệt trong các hệ thống làm mát.', v: 'Nước hấp thụ nhiều nhiệt mà nhiệt độ tăng ít, rất phù hợp để vận chuyển nhiệt.' },
{ cd: 'Vật lí nhiệt', m: 2, a: false, t: 'Hai vật có cùng nhiệt độ thì có cùng nội năng.', v: 'Nội năng còn phụ thuộc khối lượng, bản chất và thể tích của vật.' },
{ cd: 'Vật lí nhiệt', m: 2, a: true,  t: 'Nhiệt luôn tự truyền từ vật có nhiệt độ cao sang vật có nhiệt độ thấp hơn.', v: 'Quá trình ngược lại không tự xảy ra — đó là nội dung của nguyên lí II nhiệt động lực học.' },
{ cd: 'Vật lí nhiệt', m: 2, a: false, t: 'Vật có nhiệt độ cao hơn thì chứa nhiều nhiệt lượng hơn.', v: 'Nhiệt lượng là phần năng lượng TRAO ĐỔI, không phải đại lượng chứa sẵn trong vật. Vật chứa nội năng.' },

/* --- Khí lí tưởng (bổ sung) --- */
{ cd: 'Khí lí tưởng', m: 2, a: true,  t: 'Ở cùng điều kiện nhiệt độ và áp suất, các thể tích khí bằng nhau chứa cùng số phân tử.', v: 'Đó là định luật Avogadro.' },
{ cd: 'Khí lí tưởng', m: 3, a: true,  t: 'Trên đồ thị p–V, đường đẳng nhiệt là một nhánh hypebol.', v: 'Vì pV = hằng số nên p tỉ lệ nghịch với V.' },
{ cd: 'Khí lí tưởng', m: 3, a: false, t: 'Trên đồ thị p–V, đường đẳng nhiệt là một đường thẳng đi qua gốc toạ độ.', v: 'Đó là hình dạng của đường đẳng tích trên đồ thị p–T, không phải đẳng nhiệt trên p–V.' },
{ cd: 'Khí lí tưởng', m: 3, a: true,  t: 'Trên đồ thị p–T, đường đẳng tích là đường thẳng kéo dài đi qua gốc toạ độ.', v: 'Vì p tỉ lệ thuận với T khi thể tích không đổi.' },
{ cd: 'Khí lí tưởng', m: 2, a: true,  t: 'Khi làm lạnh một lượng khí trong bình kín, áp suất của khí giảm.', v: 'Quá trình đẳng tích, p tỉ lệ thuận với T.' },
{ cd: 'Khí lí tưởng', m: 3, a: true,  t: 'Khối lượng riêng của một lượng khí lí tưởng tỉ lệ thuận với áp suất và tỉ lệ nghịch với nhiệt độ tuyệt đối.', v: 'Từ pV = (m/M)RT suy ra ρ = pM/(RT).' },
{ cd: 'Khí lí tưởng', m: 2, a: false, t: 'Áp suất của một lượng khí trong bình kín không đổi khi ta thay đổi nhiệt độ của bình.', v: 'Đó là quá trình đẳng tích: nhiệt độ tăng thì áp suất tăng theo.' },
{ cd: 'Khí lí tưởng', m: 2, a: true,  t: 'Không nên để bình chứa khí nén dưới ánh nắng gay gắt vì áp suất trong bình sẽ tăng, có nguy cơ nổ.', v: 'Đây là ứng dụng thực tế trực tiếp của định luật Charles.' },

/* --- Từ trường (bổ sung) --- */
{ cd: 'Từ trường', m: 1, a: true,  t: 'Đường sức từ là những đường cong khép kín hoặc vô hạn ở hai đầu.', v: 'Khác đường sức điện — đường sức điện xuất phát từ điện tích dương và kết thúc ở điện tích âm.' },
{ cd: 'Từ trường', m: 1, a: false, t: 'Đường sức từ xuất phát từ cực Bắc và kết thúc ở cực Nam, không khép kín.', v: 'Bên ngoài nam châm thì đi từ Bắc sang Nam, nhưng bên trong nam châm chúng đi ngược lại nên KHÉP KÍN.' },
{ cd: 'Từ trường', m: 2, a: true,  t: 'Từ trường chỉ tác dụng lực lên điện tích đang chuyển động.', v: 'Điện tích đứng yên trong từ trường không chịu lực từ.' },
{ cd: 'Từ trường', m: 2, a: false, t: 'Từ trường tác dụng lực lên mọi điện tích đặt trong nó, kể cả điện tích đứng yên.', v: 'Chỉ tác dụng lên điện tích CHUYỂN ĐỘNG. Điện tích đứng yên chỉ chịu lực điện.' },
{ cd: 'Từ trường', m: 3, a: true,  t: 'Lực Lorentz luôn vuông góc với vận tốc nên không sinh công và không làm thay đổi độ lớn vận tốc của hạt.', v: 'Vì vậy hạt mang điện bay vuông góc vào từ trường đều sẽ chuyển động tròn đều.' },
{ cd: 'Từ trường', m: 2, a: true,  t: 'Máy phát điện xoay chiều hoạt động dựa trên hiện tượng cảm ứng điện từ.', v: 'Khung dây quay trong từ trường làm từ thông biến thiên tuần hoàn.' },
{ cd: 'Từ trường', m: 3, a: true,  t: 'Dòng điện Foucault (dòng xoáy) được ứng dụng trong phanh điện từ và bếp từ.', v: 'Dòng xoáy sinh ra trong khối kim loại đặt trong từ trường biến thiên, toả nhiệt hoặc tạo lực cản.' },
{ cd: 'Từ trường', m: 2, a: false, t: 'Cuộn sơ cấp của máy biến áp là cuộn nối với tải tiêu thụ điện.', v: 'Cuộn SƠ CẤP nối với nguồn; cuộn THỨ CẤP mới nối với tải.' },
{ cd: 'Từ trường', m: 3, a: true,  t: 'Máy biến áp có số vòng cuộn thứ cấp lớn hơn cuộn sơ cấp là máy tăng áp.', v: 'U₂/U₁ = N₂/N₁ nên N₂ > N₁ thì U₂ > U₁.' },
{ cd: 'Từ trường', m: 2, a: true,  t: 'Suất điện động cảm ứng trong khung dây tỉ lệ thuận với tốc độ biến thiên của từ thông.', v: 'Từ thông biến thiên càng nhanh thì suất điện động càng lớn.' },

/* --- Hạt nhân (bổ sung) --- */
{ cd: 'Vật lí hạt nhân', m: 1, a: true,  t: 'Các đồng vị của cùng một nguyên tố có cùng số proton nhưng khác số neutron.', v: 'Vì cùng Z nên chúng có cùng tính chất hoá học.' },
{ cd: 'Vật lí hạt nhân', m: 1, a: false, t: 'Các đồng vị của cùng một nguyên tố có cùng số khối nhưng khác số proton.', v: 'Ngược lại — cùng số PROTON, khác số NEUTRON nên khác số khối.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: true,  t: 'Lực hạt nhân là lực tương tác mạnh, chỉ có tác dụng trong phạm vi kích thước hạt nhân.', v: 'Bán kính tác dụng cỡ 10⁻¹⁵ m, đủ để thắng lực đẩy Coulomb giữa các proton.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: false, t: 'Lực hạt nhân là lực hút tĩnh điện giữa các proton và neutron.', v: 'Neutron không mang điện nên không thể là lực tĩnh điện. Đó là lực tương tác mạnh.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: true,  t: 'Một đơn vị khối lượng nguyên tử u tương đương 931,5 MeV/c².', v: 'Đây là hệ số quy đổi bắt buộc thuộc để tính năng lượng liên kết.' },
{ cd: 'Vật lí hạt nhân', m: 3, a: true,  t: 'Độ phóng xạ của một mẫu chất giảm theo thời gian với cùng chu kì bán rã như số hạt nhân.', v: 'H = λN nên H cũng tuân theo quy luật H = H₀·2^(−t/T).' },
{ cd: 'Vật lí hạt nhân', m: 2, a: true,  t: 'Đơn vị của độ phóng xạ trong hệ SI là becquerel (Bq), bằng một phân rã trên giây.', v: 'Một curie (Ci) bằng 3,7·10¹⁰ Bq.' },
{ cd: 'Vật lí hạt nhân', m: 3, a: true,  t: 'Sau ba chu kì bán rã, lượng chất phóng xạ còn lại bằng một phần tám lượng ban đầu.', v: '1/2³ = 1/8; phần đã phân rã là 7/8.' },
{ cd: 'Vật lí hạt nhân', m: 3, a: false, t: 'Sau ba chu kì bán rã, lượng chất phóng xạ đã phân rã bằng một phần tám lượng ban đầu.', v: 'Đã phân rã là 7/8. Còn LẠI mới là 1/8.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: true,  t: 'Phương pháp xác định tuổi cổ vật bằng carbon-14 dựa trên quy luật phân rã phóng xạ.', v: 'Chu kì bán rã của ¹⁴C khoảng 5730 năm, phù hợp với thang thời gian khảo cổ.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: true,  t: 'Năng lượng Mặt Trời có nguồn gốc từ phản ứng nhiệt hạch.', v: 'Các hạt nhân hydrogen kết hợp thành helium trong lõi Mặt Trời.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: false, t: 'Nhà máy điện hạt nhân hiện nay hoạt động dựa trên phản ứng nhiệt hạch có điều khiển.', v: 'Hiện nay dùng phản ứng PHÂN HẠCH có điều khiển. Nhiệt hạch có điều khiển vẫn đang nghiên cứu.' },
{ cd: 'Vật lí hạt nhân', m: 2, a: true,  t: 'Trong lò phản ứng hạt nhân, các thanh điều khiển có tác dụng hấp thụ bớt neutron để giữ hệ số nhân neutron bằng 1.', v: 'Nhờ vậy phản ứng dây chuyền diễn ra ổn định, không bùng nổ.' },

/* --- Lớp 10 – 11 (bổ sung) --- */
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Trong chuyển động tròn đều, gia tốc luôn hướng vào tâm và độ lớn vận tốc không đổi.', v: 'Gia tốc hướng tâm chỉ làm đổi hướng vận tốc, không đổi độ lớn.' },
{ cd: 'Lớp 10 – 11', m: 2, a: false, t: 'Trong chuyển động tròn đều, vật không có gia tốc vì tốc độ không đổi.', v: 'Vẫn có gia tốc hướng tâm vì HƯỚNG của vận tốc luôn thay đổi.' },
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Hai vật rơi tự do từ cùng độ cao sẽ chạm đất cùng lúc bất kể khối lượng.', v: 'Gia tốc rơi tự do g không phụ thuộc khối lượng, với điều kiện bỏ qua sức cản không khí.' },
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Định luật III Newton phát biểu rằng lực và phản lực có cùng độ lớn, ngược chiều và đặt vào hai vật khác nhau.', v: 'Vì đặt vào hai vật khác nhau nên chúng không triệt tiêu lẫn nhau.' },
{ cd: 'Lớp 10 – 11', m: 2, a: false, t: 'Lực và phản lực trong định luật III Newton triệt tiêu lẫn nhau nên vật đứng yên.', v: 'Chúng đặt vào HAI VẬT KHÁC NHAU nên không thể triệt tiêu.' },
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Cơ năng của vật được bảo toàn khi vật chỉ chịu tác dụng của lực thế.', v: 'Nếu có ma sát thì một phần cơ năng chuyển thành nhiệt và cơ năng giảm.' },
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Trong dao động điều hoà, động năng và thế năng biến thiên tuần hoàn với tần số gấp đôi tần số dao động.', v: 'Còn cơ năng toàn phần thì không đổi theo thời gian.' },
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Hai nguồn sóng kết hợp phải có cùng tần số và độ lệch pha không đổi theo thời gian.', v: 'Đây là điều kiện để xảy ra hiện tượng giao thoa ổn định.' },
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Sóng âm không truyền được trong chân không.', v: 'Sóng âm là sóng cơ, cần môi trường vật chất để lan truyền.' },
{ cd: 'Lớp 10 – 11', m: 2, a: false, t: 'Sóng âm truyền trong chân không nhanh hơn trong không khí.', v: 'Sóng âm hoàn toàn KHÔNG truyền được trong chân không.' },
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Trong đoạn mạch chỉ chứa điện trở thuần, cường độ dòng điện tỉ lệ thuận với hiệu điện thế.', v: 'Định luật Ohm: I = U/R.' },
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Suất điện động của nguồn điện đặc trưng cho khả năng thực hiện công của nguồn để dịch chuyển điện tích.', v: 'ξ = A/q, đơn vị vôn.' },
{ cd: 'Lớp 10 – 11', m: 2, a: false, t: 'Hiệu điện thế giữa hai cực của nguồn điện luôn bằng suất điện động của nguồn.', v: 'Chỉ bằng nhau khi mạch hở. Khi có dòng chạy qua thì U = ξ − I·r.' },
{ cd: 'Lớp 10 – 11', m: 2, a: true,  t: 'Điện trở của kim loại tăng khi nhiệt độ tăng.', v: 'Dao động nhiệt của ion trong mạng tinh thể cản trở dòng electron nhiều hơn.' },
{ cd: 'Lớp 10 – 11', m: 2, a: false, t: 'Điện trở của kim loại giảm khi nhiệt độ tăng.', v: 'Kim loại thì TĂNG. Chất bán dẫn mới có điện trở giảm khi nhiệt độ tăng.' }
);
