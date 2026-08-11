# KHU 1 — UNDERCROFT / HẦM MỘ
### Art brief đầy đủ · 7 phòng · dùng để vẽ

---

## 0. LUẬT CHUNG CHO CẢ KHU

**Thể loại:** 2D souls-like, side-scroller, nhìn ngang (side view), không phải top-down, không phải isometric.
**Tone:** hầm đá ẩm dưới lòng đất, bỏ hoang nhiều năm, có người từng sống ở đây và đã không ra được.
**Tier 0** — đây là khu đầu game. Người chơi chưa biết gì. Mọi thứ ở đây phải **đọc được**, không được rối.

### Bảng màu (bắt buộc — đã đo, đừng đổi)

Nguyên tắc: **một tông tối lạnh làm chủ đạo + ĐÚNG MỘT điểm nhấn ấm.** Điểm nhấn ấm chỉ đến từ lửa và từ đồ vật gỉ sét. Tường KHÔNG bao giờ được ấm.

| Vai trò | dim (phòng mờ) | dark (phòng tối) | warm (phòng có lửa) |
|---|---|---|---|
| ink (nét/bóng sâu nhất) | `#111014` | `#0e0e10` | `#111013` |
| near (khối tiền cảnh) | `#131216` | `#101013` | `#131216` |
| dark (khối chính) | `#23222e` | `#1e1e29` | `#20202b` |
| mid (trung cảnh) | `#363c52` | `#30384a` | `#31394b` |
| far (hậu cảnh xa) | `#4b6688` | `#44617b` | `#44617c` |
| lit (mặt bắt sáng) | `#5889af` | `#4e84a1` | `#4e82a2` |
| accent (gỉ, dây thừng, rơm) | `#a27650` | `#936b48` | `#936b48` |

**Lửa:** core `#fff6d8` → mid `#ffb04a` → low `#f2702a` → deep `#a8300f`.

**Quy tắc màu quan trọng nhất:**
- Chỗ tối **gần như phi màu** (độ bão hoà ~0.09). Màu chỉ tăng khi độ sáng tăng (bão hoà tối đa ~0.37 ở chỗ sáng nhất).
- **Hue shifting:** bóng đổ lệch về phía LẠNH hơn (xanh lam), mặt bắt sáng lệch về phía ẤM hơn (vàng cam). Không bao giờ chỉ tăng/giảm độ sáng của cùng một màu.
- Đừng bao giờ để tường ngả tím hoặc ngả xanh lá. Nếu thấy tím → bão hoà đang quá cao.

### Template 6 lớp (mỗi phòng phải đủ 6 lớp, vẽ theo đúng thứ tự này)

1. **BACKGROUND** — xa nhất, mất tương phản, mất bão hoà, ngả về màu môi trường. Không có chi tiết.
2. **MIDGROUND** — kiến trúc: phòng này *được xây bằng cái gì*. Đây là lớp phân biệt phòng này với phòng khác.
3. **GAMEPLAY** — mặt sàn người chơi đứng, đồ vật, quái, nguồn sáng. Lớp này phải sạch và đọc được nhất.
4. **FOREGROUND** — khối tối gần như đen, cắt ngang mép khung, tạo chiều sâu. Người chơi đi *sau* nó.
5. **LIGHTING** — nguồn sáng → vũng sáng → tắt dần → tối. Đúng thứ tự đó, không thứ tự nào khác.
6. **VFX** — bụi bay khắp phòng, tàn lửa CHỈ gần lửa.

**Công thức nội dung:** 60% tile lặp lại có kiểm soát + 20% props + 10% landmark + 10% VFX/ánh sáng.
**Đừng cố vẽ kín map.** Khoảng trống có chủ đích là nhịp thở; vẽ kín là nhiễu.

### 5 lỗi phải tránh (đây là 5 lỗi bản cũ đã mắc)
1. Hậu cảnh phẳng, chỉ một mảng màu → phải có ít nhất 3 mặt phẳng chiều sâu.
2. Không có landmark → mắt không nhớ được phòng nào ra phòng nào.
3. Sàn sạch bong → sàn phải có nứt, vụn, vệt bẩn, thứ ai đó đánh rơi.
4. Ánh sáng yếu, đều → phải có một nguồn duy nhất, mọi bóng đổ tuân theo nó.
5. Không kể chuyện → mỗi phòng phải có đồ vật nói lên chuyện đã xảy ra ở đó.

### Thư viện props dùng chung
cột đá nứt · lồng sắt treo · chuông/xích · băng vải rách (cờ) · cửa sắt cũ · thùng gỗ (3 mặt 3 sắc độ) · bàn gỗ · xương/sọ · đống đổ nát · đuốc/lửa · đèn lồng đứng · vũng nước

---

## 1. NHÂN VẬT CHÍNH — NGƯỜI THẮP ĐÈN (The Lamplighter)

> *Không phải hiệp sĩ. Một người thợ của xưởng, bị đẩy lên núi với một cây đèn rỗng và một bản danh sách.*

**Ngoại hình:** Cao và gù, do cả đời phải với lên cao. Áo choàng dài treo đầy những cây đèn lấy từ người chết — cả tá, không cây nào cháy, và chúng va lách cách mỗi khi bước; đó là cách mọi thứ trong phòng tối biết nó đang tới. Cánh tay phải từ khuỷu xuống là **đất nung**, thay cho phần cái lò đã lấy đi, và các vết nứt trên đó **chưa tắt** (rực cam trong khe nứt). Tay lành cầm một **cây sào thắp đèn**: dài quá khổ so với một căn phòng, dài vừa đủ để với tới một ngọn đèn.

**Vì sao nó đi:** Cỗ đồng hồ quyết định giờ thắp đèn đã chạy sai nhiều năm. Dưới kia vẫn còn một người đi tuần — đi theo danh sách, thấy đèn nào cũng tắt, và không thắp lại được cây nào, vì phía dưới chẳng còn gì để mồi. Nên nó đi lên.

**Áo choàng:** Mỗi cây đèn trên áo lấy từ một người không leo nổi hết cầu thang. **Chúng không phải chiến lợi phẩm. Chúng là việc còn tồn đọng.**

**5 luật cho silhouette (bắt buộc):**
1. Cao hơn mức khung hình muốn, và gù.
2. Áo choàng đọc thành **một chùm hình treo lủng lẳng**, không đọc thành vải.
3. Một cánh tay phát sáng ở các khớp nứt, tay kia thì không.
4. Cây sào **dài hơn chiều cao nhân vật**.
5. **Không có gì trên người nó đối xứng cả.**

---

## 2. QUÁI TRONG KHU 1

### Vỏ Người (Husk) — `husk`, `husk-torch`, `husk-spear`
> *Một người cứ đi tiếp sau khi chẳng còn gì để đi tới nữa.*

**Nhìn:** Đứng thẳng nhưng **lồng ngực rỗng**, đầu gục về phía trước vai, hai tay đung đưa **từ khuỷu chứ không bao giờ từ vai**.
**Dấu hiệu ra đòn:** **Đầu ngẩng lên trước.** Nó luôn ngẩng trước khi tay động, và đó là lời báo duy nhất bạn nhận được.
**Số liệu:** husk (HP 34, dmg 9, windup 0.55s) · husk-torch (HP 31, dmg 8, windup 0.48s, **cầm đuốc — nguồn sáng di động**) · husk-spear (HP 36, dmg 11, windup 0.63s, **tầm với 1.4× — dài nhất khu này**).
**Nhịp:** chậm. Không giáp.

### Chó Săn (Hound) — `hound`, `hound-swift`
> *Nó từng thuộc về ai đó. Giờ vẫn chạy về gót chân — chỉ là không phải gót chân bạn.*

**Nhìn:** Thấp, dài, **toàn vai không hông**, hai chân sau chậm hơn chân trước một nhịp. Nó **chạy bằng ba chân lành trên bốn**.
**Dấu hiệu ra đòn:** **Nó khựng lại.** Chó săn mà khựng là chó săn đã quyết, và cái khựng ấy ngắn hơn một nhịp tim.
**Số liệu:** hound (HP 22, dmg 12, speed 148, windup **0.34s**) · hound-swift (HP 17, dmg 11, speed **207**, windup **0.26s** — nhanh nhất khu).
**Nhịp:** nhanh. Không giáp.

---

# 3. BẢY PHÒNG

---

## PHÒNG 0 — XÀ LIM · *The Cell*
`kind: hall` · `light: dim` · `layout: single` · **không có quái** · lối vào của cả game

> **"Rơm, một cái cống, và cánh cửa ai đó bỏ ngỏ từ rất lâu rồi."**
> *"Straw, a drain, and a door someone left open a long time ago."*

**MIDGROUND — kiến trúc:** Vòm đá trên trụ. Vòm **võng xuống** ở giữa, không phải cung tròn hoàn hảo. Ba trụ đá: nghiêng, phình ở giữa thân, sứt mẻ; một trong ba trụ **gãy cụt ngang chừng**, không chạm tới trần. Tường sau là đá xếp lớp, thể hiện bằng **nét gạch chéo (hatching)** chứ không phải vẽ từng viên gạch.

**Landmark:** Không có landmark riêng — **cánh cửa mở là landmark**. Nó phải là thứ mắt bắt đầu tiên.

**Props bắt buộc (theo đúng câu văn):**
- **Rơm** rải rác, dồn vào các góc bị đá vào, màu accent, nét mảnh loạn hướng.
- **Cống sắt** chìm dưới sàn: khung tối, 5–6 song sắt, gỉ.
- **Cửa mở**: khung cửa tối om phía sau, cánh cửa đu vào trong nhìn nghiêng, còn **một bản lề**, có nẹp ngang. Cửa mở ra bóng tối — không thấy gì bên kia.
- **Vết cào trên tường** ngang tầm tay người: từng cụm 4–5 vạch. Ai đó đếm ngày.

**Bố cục:** Cửa bên trái ⅓ khung. Cống ở ⅔ phải, dưới sàn. Người chơi vào từ trái. Sàn phải trống ở giữa — đây là phòng đầu tiên, không được rối.

**Ánh sáng:** Không có nguồn trong phòng. Ánh sáng lọt từ trên cao bên trái, ngoài khung. Bóng đổ về phải-dưới.

---

## PHÒNG 1 — HỐ TRO · *The Ash Pit*
`kind: bonfire` · `light: warm` · `layout: single` · **không có quái** · **checkpoint duy nhất của khu**

> **"Một ngọn lửa được giữ, một cách tệ hại, bởi không ai, suốt nhiều năm."**
> *"A fire that has been kept, badly, by nobody, for years."*

**MIDGROUND — kiến trúc:** **KHÔNG PHẢI SẢNH.** Đây là một **góc tường còn sót lại**. Một bên tường còn đứng, gãy ngang ở tầm đầu; bên kia là **chỗ sập, hở thẳng ra bóng tối**. Bờ đá đổ chất đống dưới chỗ sập. Một trụ đá duy nhất còn đứng, **nửa thân bị chôn trong đống đổ nát của chính toà nhà mình**.

> Người chơi nghỉ ở đây **vì mái đã sập** — nhìn thấy được thứ gì đang tới.

**Landmark: TƯỢNG BỊ XÍCH.** Đứng sau ngọn lửa, cao gấp đôi người. **Đầu đã mất**, cổ là một vết gãy nham nhở. Hai sợi **xích thả từ trần xuống cắm vào hai vai tượng** — xích vẽ thành chuỗi mắt xích thật, không phải đường thẳng. Tượng là khối tối, chỉ mặt hướng về lửa mới bắt sáng.

**Props:**
- **Lửa:** không phải hình tam giác. Là **chồng nhiều lưỡi lửa không đồng ý với nhau** — 4 lớp (deep/low/mid/core), mép lửa lượn sóng, ngọn lệch mỗi lớp một hướng. Bên dưới có **củi** xếp chụm.
- **Đống tro** thấp, tràn ra quanh hố.
- **Cái cào** ai đó dựng lại, cắm nghiêng trong tro.
- 2 **thùng gỗ/thùng phuy** (3 mặt 3 sắc độ, có đai, có nắp nhìn hơi từ trên).

**Ánh sáng:** **Lửa là nguồn sáng duy nhất và là tâm của cả bức.** Vũng sáng trên sàn phải **tán dần**, không được là hình elip mép cứng. Mọi bóng trong phòng đổ xuyên tâm ra khỏi lửa.

**VFX:** Tàn lửa bay lên **chỉ trong bán kính quanh lửa**. Bụi lơ lửng khắp phòng.

---

## PHÒNG 2 — RÃNH DÀI · *The Long Drain*
`kind: bridge` · `light: dark` · `layout: spread` · **quái: husk + husk-torch**

> **"Nước ở đây chảy ngược. Hai đứa nó đang đứng trong đó."**
> *"Water runs the wrong way here. Two of them are standing in it."*

**MIDGROUND — kiến trúc:** **Miệng cống vòm tròn**, nhìn thẳng vào. Vẽ thành **5 vòng vòm lồng nhau thụt dần vào trong**, mỗi vòng nhỏ hơn và tối hơn vòng trước; vòng trong cùng đen đặc. Vòm ngoài cùng có **đá vòm (voussoir)** — các nét xoè ra từ tâm — để nó đọc là *được xây*, không phải một cái lỗ. Tường hai bên xếp lớp ngang.

**Landmark:** Chính miệng cống. Không thêm cửa nào nữa.

**Sàn:** Hai **bệ đi** hai bên, **rãnh nước cắt sâu ở giữa**. Người chơi đi trên bệ.

**Props:**
- **Nước** trong rãnh: mặt nước tối, các vệt sáng ngang mảnh.
- **Chi tiết quan trọng nhất: dòng chảy NGƯỢC.** Các mũi chevron của dòng nước **chỉ ngược lên phía trong ống** — tức là nước đang chảy vào chứ không chảy ra. Đây là điều duy nhất trong phòng nói cho người chơi biết thế giới này đã hỏng.
- **Rác trôi ngược dòng** — 4–5 mảnh gỗ nổi, cùng chiều với chevron.
- 2 **lưới cống** cao trên tường hai bên.

**Quái:** Hai con **đứng trong rãnh nước**, không đứng trên bệ. `husk-torch` cầm đuốc → **nó là nguồn sáng thứ hai của phòng**, và bóng đổ quanh nó phải theo cây đuốc chứ không theo nguồn chính.

**Ánh sáng:** Phòng `dark`. Chỉ có cây đuốc của husk-torch. Phần còn lại rơi vào đen.

---

## PHÒNG 3 — CHUỒNG CHÓ · *The Kennel*
`kind: cave` · `light: dark` · `layout: pack` · **quái: hound + hound-swift**
> Ghi chú thiết kế: *quái nhanh đầu tiên — dạy rằng lăn không chỉ để né đòn to.*

> **"Nó nghe thấy bạn trước khi bạn qua khỏi vòm cửa. Lúc nào cũng vậy."**
> *"It hears you before you are through the arch. It always does."*

**MIDGROUND — kiến trúc: KHÔNG CÓ MỘT VIÊN GẠCH NÀO.** Không ai xây chỗ này.
- **Trần đá thô** dạng thuỳ, lồi lõm không đều.
- **Nhũ đá chĩa xuống** — khoảng 15 cái, dài ngắn khác nhau, không đều nhau.
- **Vách đá khép vào từ hai bên** thành các khối thuỳ tròn, không phải mặt phẳng.
- **Măng đá mọc lên từ sàn** — khoảng 9 cái.
- Hatching **chạy theo thớ đá** (gần như nằm ngang), tuyệt đối không hatching dọc như tường xây.

**Landmark:** Cụm tảng đá lớn giữa phòng.

**Props (đây là phòng kể chuyện nặng nhất khu):**
- **Xích bắt vít vào vách, đầu xích là VÒNG CỔ — và vòng cổ rỗng.** 4 sợi, treo dọc hai bên vách (không treo giữa không trung giữa phòng). Vẽ thành chuỗi mắt xích, có võng.
- **Máng ăn** bằng đá/gỗ, dài, ở giữa phòng.
- **Xương và sọ** rải khắp sàn — ~22 mảnh. Sọ vẽ 3/4, **không có hàm dưới**, hai hốc mắt đen.
- **Vết cào trên vách** — ở **đúng tầm cao của thứ đã cào ra nó** (thấp, ngang hông người). Từng cụm 4 vạch chéo.

**Quái:** Đàn (pack). Con `hound-swift` phải đọc ra **thấp hơn, gầy hơn, dài hơn**. Cả hai con: **toàn vai không hông**.

**Ánh sáng:** Tối nhất khu. Không có nguồn trong phòng. Chỉ đủ thấy silhouette và ánh mắt.

---

## PHÒNG 4 — CẦU THANG GÃY · *The Broken Stair*
`kind: stair` · `light: dim` · `layout: single` · **quái: husk-spear**
> Ghi chú thiết kế: *một cây giáo ở chỗ hẹp — phòng đầu tiên thưởng cho việc chọn chỗ đứng.*

> **"Mất nửa số bậc. Chỗ còn lại hẹp vừa đủ để cầm chân chúng nó."**
> *"Half the steps are gone. What is left is narrow enough to hold."*

**MIDGROUND — kiến trúc:** Một **thang đá chạy từ dưới-trái lên trên-phải**, 13 bậc. **Khúc giữa (3–4 bậc) đã mất hẳn** — chỉ còn mấu đá thừa nhô ra từ tường. Vòm trần **chạy nghiêng theo độ dốc của thang**, không nằm ngang.

**Bậc thang phải có HAI mặt:**
- **mặt đứng (riser)** — mặt mình sẽ đâm vào, tối, quay lưng với ánh sáng.
- **mặt nằm (tread)** — mặt mình đứng lên, sáng hơn một bậc, và là mặt duy nhất bắt sáng.
> Bậc thang vẽ một mảng phẳng = tấm bìa lơ lửng. Đây là lỗi phải tránh.

**Chỗ hụt:** Vẽ thành **vết cắn nham nhở**, mép lởm chởm, đổ xuống bóng tối. Không được là hình chữ nhật đen.

**Props:**
- **Bậc đá rơi** nằm vỡ dưới chân thang — 6 khối.
- **Dây thừng thay lan can**: **VÕNG XUỐNG** theo trọng lực (catenary), màu dây thừng cũ tối, chỉ có một vệt accent mảnh làm highlight ở mặt trên, và vài sợi tưa rủ xuống. **Không được là một đường gấp khúc màu cam.**

**Quái:** `husk-spear` đứng **đúng chỗ hẹp nhất** — trên bậc còn lại, phía sau chỗ hụt. Tầm với 1.4× phải nhìn thấy được: cây giáo dài hơn hẳn.

**Bố cục:** Đường chéo của cầu thang là đường dẫn mắt chính. Tiền cảnh tối cắt góc dưới-trái.

---

## PHÒNG 5 — CHỖ NGHỈ NGƯỜI THẮP ĐÈN · *The Lamplighter's Rest*
`kind: hall` · `light: warm` · `layout: single` · **quái: husk**

> **"Ai đó từng ngồi đây với cây đèn, và không đứng dậy nữa."**
> *"Someone sat here with a lantern and did not get up again."*

**MIDGROUND — kiến trúc:** Vòm trên trụ, giống Xà Lim nhưng **nguyên vẹn hơn** — đây từng là chỗ người ta thật sự làm việc. Hai **cửa sổ vòm** trên tường cao: phải vẽ **thành lỗ xuyên tường** — có **mặt thành tường (reveal)** dày, có **bệ cửa sổ (sill)**, và có **vệt nước chảy xuống dưới bệ**. Vẽ cửa sổ như hình dán phẳng là lỗi.

**Landmark:** **Người ngồi tựa tường.** Khối tối, đầu gục ra trước, **áo choàng vẫn còn trên người**, và **3 cây đèn vẫn treo trên đó**. Không có mặt. Không cần có mặt.

**Props (đây là phòng nói về nhân vật chính):**
- **Cây đèn rơi nằm nghiêng — VÀ NÓ VẪN CHÁY.** Đó là chi tiết sai, và là chi tiết quan trọng nhất phòng. Ngọn lửa nhỏ, ấm, là nguồn sáng chính.
- **Dãy đèn treo chưa ai lấy** — 6 cây, treo trên móc, **khoảng cách KHÔNG ĐỀU, độ cao KHÔNG ĐỀU** (đều nhau là đọc thành icon UI). Tất cả đều tắt — **trừ đúng một cây còn leo lét.**
- 2 thùng gỗ.

**Ánh sáng:** Nguồn là cây đèn rơi, **thấp và nhỏ hơn lửa trại nhiều**. Vũng sáng nhỏ, tắt nhanh. Bóng đổ dài và thấp vì nguồn nằm sát sàn.

---

## PHÒNG 6 — CỔNG NGẦM · *The Undergate*
`kind: hall` · `light: dim` · `layout: spread` · **quái: husk × 2** · **lối ra của khu**

> **"Hai lối ra. Cả hai đều tệ hơn chỗ này."**
> *"Two ways out. Both of them are worse than here."*

**MIDGROUND — kiến trúc:** Sảnh vòm rộng nhất khu. Đây là nút giao — khu này nối sang `courtyard` và `drainage`.

**Landmark: HAI Ô CỬA.** Đặt ở ~22% và ~74% chiều ngang khung. **Vẽ GIỐNG HỆT NHAU** — cùng kích thước, cùng hình, cùng độ tối. Cả hai đều đen đặc, không thấy gì bên trong. Mỗi cửa có **đố cửa (jamb)** hai bên để nó đọc là ô cửa chứ không phải vết bẩn.

> Sự giống hệt nhau **chính là câu đùa của phòng**. Đừng làm một cửa hấp dẫn hơn cửa kia. Người chơi không có manh mối nào để chọn.

**Props:**
- **Vạch đếm ai đó khắc lên tường CHÍNH GIỮA HAI CỬA** — 5 vạch dọc. Ai đó đã đứng đây rất lâu để quyết định.
- 3 thùng gỗ/thùng phuy.

**Quái:** Hai con husk, **mỗi con đứng trong một ô cửa**. Đối xứng. Cố ý.

**Bố cục:** Đối xứng gần như hoàn hảo — phòng duy nhất trong khu được phép đối xứng, vì sự đối xứng *là* nội dung.

---

## 4. PROMPT NGẮN GỌN (nếu chỉ vẽ được 1 phòng)

> 2D side-scrolling souls-like game background, hand-drawn painterly style, dark stone undercroft.
> Six layers, back to front: hazy far background losing contrast and saturation; architecture midground; clean readable gameplay floor; near-black foreground mass cropping the frame edge; single light source with a soft falling-off pool; dust motes and embers.
> Palette: cool desaturated slate blue dominant (`#1e1e29` → `#4e84a1`), near-neutral in the darks, saturation rising only with value. Exactly one warm accent (`#936b48` rust, and firelight `#a8300f`→`#ffb04a`→`#fff6d8`). Shadows shift cooler, lit faces shift warmer.
> Irregular organic silhouettes — sagging vaults, leaning swollen piers, broken edges. No straight lines, no perfect arcs, no geometric primitives.
> Don't fill the whole frame; leave deliberate negative space.
> **[dán mô tả phòng ở đây]**

---

*Nguồn: `souls/src/world.js` (368 phòng, 36 khu), `souls/src/lore.js` (16 họ quái), `souls/src/hero.js` (Người Thắp Đèn). Renderer hiện tại: `souls/tools/draw.js`.*
