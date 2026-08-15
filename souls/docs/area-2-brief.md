# KHU 2 — COURTYARD / SÂN NGOÀI
### Art brief · 9 phòng · tier 0 · không boss · nối sang `gatehouse`

> Đọc `docs/area-1-brief.md` trước. Luật chung — template 6 lớp, bảng màu,
> 5 lỗi phải tránh, công thức 60/20/10/10 — **giữ nguyên**, không lặp lại ở đây.
> Tài liệu này chỉ nói cái gì khác khu 1.

---

## KHU NÀY KHÁC KHU 1 Ở CHỖ NÀO

**Lên khỏi mặt đất.** Khu 1 là hầm mộ, không một tia sáng tự nhiên. Khu 2 mở đầu
bằng *"Có thứ gọi là ánh sáng ban ngày. Trời mưa đã lâu lắm rồi."*

Ba thay đổi lớn về hình ảnh:

1. **`grey` trở thành tông chủ đạo** (5/9 phòng), không phải `dim`. Sáng hơn, bạc
   hơn, ít bão hoà hơn. `#23222e → #4b6688` đổi sang `#2b2a34 → #5b7590`.
2. **Trời mưa.** Nước là lớp VFX mới, có mặt ở mọi phòng ngoài trời: sợi mưa xiên,
   vũng đọng phản chiếu, nước rỏ từ mép đá. **Đây là thứ gắn kết cả khu.**
3. **Có trần trời.** Phòng `yard` **không có trần** — 40% khung hình phía trên là
   mây thấp, xám, không thấy mặt trời. Đừng vẽ bầu trời đẹp: đây là trần mây dày.

**Vẫn giữ luật một điểm nhấn ấm.** Ngoài trời xám thì lửa/gỉ càng phải là thứ ấm
duy nhất, và nó càng quý hơn khu 1.

---

## KIẾN TRÚC MỚI: `yard` (ngoài trời)

Khu 1 chưa có kind này. Luật vẽ:
- **Không có trần.** Đường tường thành cắt ngang ở ~35% chiều cao khung.
- Tường có **lỗ châu mai (merlon)** — răng cưa đều đặn bị sứt chỗ.
- Phía trên tường là **mây, vẽ thành dải ngang mờ**, không có ngôi sao, không có
  mặt trời, không có tia nắng.
- **Landmark của `yard`: một cái tháp đã đổ**, được giữ đứng bởi chính bức tường
  nó ngã vào.

---

## QUÁI MỚI: VỎ NGƯỜI NẶNG (`husk-heavy`)

**HP 49 · DMG 12 · wind-up 0.72s · speed 50 · không giáp**

> Cùng một sinh vật, gấp đôi độ lì. Đây là biến thể nặng đầu tiên của game.

**Vẽ:** vẫn là Vỏ Người — lồng ngực rỗng, đầu gục trước vai, tay đung đưa từ
khuỷu — nhưng **to hơn một cỡ, dày hơn ở vai và đùi**, và **chậm hơn thấy rõ**.
Đừng cho nó thêm giáp: nó không có giáp, nó chỉ *nặng*.

**Wind-up 0.72s là dài nhất khu.** Silhouette lúc lấy đà phải đọc được từ xa —
người chơi có gần một giây để phản ứng, và bản vẽ phải xứng đáng với khoảng thời
gian đó: đầu ngẩng lên trước, rồi cả thân dồn về sau.

---

# CHÍN PHÒNG

| # | Phòng | kind · light · layout | Quái | Câu văn |
|---|---|---|---|---|
| 0 | **Miệng Cổng** · The Gate Mouth | stair · grey · single | — | *Có thứ gọi là ánh sáng ban ngày. Trời mưa đã lâu lắm rồi.* |
| 1 | **Khoảnh Sân** · The Yard | yard · grey · spread | husk ×2, husk-torch | *Ba đứa, đứng cách xa nhau. Bạn không đánh cùng lúc cả ba được, nên đừng.* |
| 2 | **Cái Giếng** · The Well | cave · dim · ambush | hound-swift | *Có thứ gì đó từng bò lên từ đây. Nắp giếng nằm lăn bên cạnh.* |
| 3 | **Chiếc Xe Gãy** · The Broken Cart | hall · grey · spread | husk-spear ×2 | *Hai cây giáo nấp sau chiếc xe. Chính chiếc xe làm chỗ này còn công bằng.* |
| 4 | **Miếu Nhỏ** · The Shrine | hall · warm · single | — | *Không có gì sống ở đây. Ai đó để lại một thứ, từ rất lâu.* |
| 5 | **Lối Đi Bắc** · The North Walk | bridge · grey · single | husk-torch, husk | *Hẹp, một bên là vực. Chúng nó phải đi hàng một mà tới.* |
| 6 | **Bụi Rậm** · The Thicket | cave · dark · pack | hound ×2, hound-swift | *Bạn nghe thấy bầy chó trước khi thấy chúng. Chỉ được cảnh báo bấy nhiêu.* |
| 7 | **Vòm Cuốn** · The Arch | stair · dim · single | husk-heavy | *Cuối cùng cũng lên cao. Thứ ở trên đã nhìn bạn băng qua sân từ nãy.* |
| 8 | **Cửa Ngoài** · The Outer Door | hall · grey · ring | husk ×2, hound | *Chúng khép vòng quanh bạn ở đây. Dựa lưng vào cửa mà đánh.* |

---

## GHI CHÚ TỪNG PHÒNG

**0 · Miệng Cổng** — `stair`, **4 hố mỗi hố 1.5m**. Không quái: phòng này dạy
nhảy/lăn qua hố trước khi có ai đánh bạn. Ánh sáng ban ngày lọt xuống từ trên
đầu cầu thang — **tia sáng là landmark**, và nó phải là chỗ sáng nhất khu 1+2
cộng lại. Mưa hắt vào theo tia sáng.

**1 · Khoảnh Sân** — *first open ground — teaches pulling one at a time.*
Ba con đứng ở **4m, 12m, 20m** — cách nhau 8m, xa hơn tầm nhận biết 7.6m của
chúng. **Bố cục phải cho thấy điều đó**: ba silhouette tách bạch, khoảng trống
thật giữa chúng, không có gì che tầm nhìn. Đây là phòng dạy luật, nên nó phải
đọc được như một bài học.

**2 · Cái Giếng** — `ambush`. Cái giếng là landmark, **nắp giếng nằm lăn bên
cạnh** — đó là câu chuyện. Con `hound-swift` (0.26s wind-up, nhanh nhất game)
nấp khuất. Ánh sáng `dim`, và cái giếng phải tối hơn mọi thứ quanh nó.

**3 · Chiếc Xe Gãy** — *cover matters.* **Chiếc xe là vật che, và nó là lý do
phòng này còn công bằng.** Vẽ nó đủ to để đứng nấp sau được, đặt giữa phòng, và
hai cây giáo (tầm 1.4×) ở hai bên. Nếu chiếc xe vẽ nhỏ hoặc lệch, phòng thành
bất công.

**4 · Miếu Nhỏ** — `warm`, không quái. *Nhịp thở giữa hai phòng khó — pacing,
không phải phần độn.* Nguồn sáng ấm duy nhất giữa khu xám. **Ai đó để lại một
thứ** — vật đó phải là điểm nhấn ấm, nhỏ, và là thứ duy nhất còn nguyên vẹn
trong cả khu.

**5 · Lối Đi Bắc** — `bridge` nhưng **không phải cống**: là lối đi hẹp trên cao,
**một bên là vực**. Chúng phải đi hàng một. Vẽ: bờ vực bên trái tối đen không
đáy, tường bên phải. *Phần thưởng cho ai học được Cầu Thang Gãy ở khu 1.*

**6 · Bụi Rậm** — `pack`, `dark`, **ba con chó cùng lúc**. Tối nhất khu. Người
chơi **nghe thấy trước khi thấy** — nên vẽ: chỉ thấy silhouette và mắt, thân
chìm trong bụi. *Cố ý đặt gần một lối thoát.*

**7 · Vòm Cuốn** — `stair`, cũng **4 hố 1.5m**, và `husk-heavy` đứng trên cao.
*Thứ ở trên đã nhìn bạn băng qua sân từ nãy* — vậy từ đây phải **nhìn ngược
xuống thấy Khoảnh Sân**. Đó là chi tiết nối hai phòng.

**8 · Cửa Ngoài** — `ring`, ba con vây quanh. *Cả khu đã dạy bạn tránh đúng
tình huống này.* **Cánh cửa là chỗ dựa lưng** — vẽ nó chắc, ở giữa, và đủ rộng
để lưng người chơi tựa vào không bị đánh sau.

---

## SỐ LIỆU CÂN BẰNG (đọc từ `src/`)

| Phòng | Tổng HP | Chết sau | Báo ngắn nhất | Hố |
|---|---|---|---|---|
| Miệng Cổng | 0 | — | — | 1.5m ×4 |
| Khoảnh Sân | 99 | 12 đòn | 0.48s | không |
| Cái Giếng | 17 | 10 đòn | **0.26s** | không |
| Chiếc Xe Gãy | 72 | 10 đòn | 0.63s | không |
| Miếu Nhỏ | 0 | — | — | không |
| Lối Đi Bắc | 65 | 12 đòn | 0.48s | không |
| **Bụi Rậm** | 61 | **9 đòn** | **0.26s** | không |
| Vòm Cuốn | 49 | 9 đòn | 0.72s | 1.5m ×4 |
| **Cửa Ngoài** | 90 | **9 đòn** | 0.34s | không |

Hai phòng khó nhất là **Bụi Rậm** và **Cửa Ngoài** — và Miếu Nhỏ nằm đúng giữa
chúng. Đó không phải tình cờ.

---

*Hình học chính xác: `dist/blockout-courtyard.svg`. Cảnh Godot sẽ dựng:
`dist/godot-courtyard-*.svg`. Cả hai sinh từ `src/world.js`.*
