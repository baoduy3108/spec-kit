# Tham khảo địa hình — 15+ game

Tra cho câu hỏi "map Dead Cells cao cao lạ", và cái tìm được quan trọng hơn
chiều cao. Tài liệu này ghi **cái gì đã áp dụng vào code**, cái gì chỉ tham
khảo, và **cái gì tao không kiểm chứng được** — để sau này không ai tưởng mọi
dòng ở đây đều có nguồn.

> **Không xem được video.** Môi trường này không có công cụ xem gameplay.
> Toàn bộ dưới đây từ nguồn chữ. Chỗ nào tao chỉ biết chung chung về thể loại
> chứ không có nguồn cụ thể, tao ghi rõ *(kiến thức chung, chưa kiểm chứng)*.

---

## ĐÃ ÁP DỤNG VÀO CODE

### 1. Hollow Knight — địa hình vuông góc, không một cái dốc
**Nguồn:** [Ludonauta — The Hidden Genius Behind Hollow Knight's Terrain Design](https://ludonauta.itch.io/platformer-essentials/devlog/1084669/the-hidden-genius-behind-hollow-knights-terrain-design) · [Steam — "Does this game have slopes?"](https://steamcommunity.com/app/367520/discussions/0/135509823668195291/)

Va chạm địa hình toàn bộ là **hình chữ nhật góc 90°**. Không dốc, không đường
cong, không platform xuyên qua được. Hai hệ quả:

- Hình học đoán trước được → hệ thống di chuyển (nhảy tường, lướt) mới tin cậy.
- **Địa hình mới trở thành cổng khoá.** Không leo dốc được thì gờ cao mới là rào.

**Áp dụng:** `squareOff()` trong `tools/draw.js`. Trước đó **48% địa hình của
game này là dốc** (1366 đoạn, riêng hang 1025). Giờ **0/3585**. Mọi độ cao snap
về lưới 0.5m, nên "một cú nhảy" và "một cú nhảy + sào" là câu trả lời chính xác.

### 2. Dead Cells — giếng đứng khoá sau Spider Rune
**Nguồn:** [GamersHeroes — wall jump](https://www.gamersheroes.com/game-guides/how-to-wall-jump-in-dead-cells/) · [Deepnight — Level Design of Dead Cells](https://deepnight.net/tutorial/the-level-design-of-dead-cells-a-hybrid-approach/) *(bị proxy chặn, chỉ đọc được trích dẫn)*

Chiều cao có sẵn từ lần chơi đầu, **mở khoá về sau**. Cao là một cái *khoá*,
không phải một kích thước.

**Áp dụng:** ability `hook` (Cây Sào) — +2.6m trên cú nhảy. 227/1359 bệ (17%)
chỉ tới được bằng sào.

### 3. Hollow Knight / Celeste — nhảy biến thiên
**Nguồn:** [Ludonauta — HK movement](https://ludonauta.itch.io/platformer-essentials/devlog/1069670/hollow-knight-inspired-movement-with-the-moving-character-recipe) · [Variable height jump tutorial](https://www.youtube.com/watch?v=Mo1-sKYbks0)

Giữ nút = cung đầy, thả sớm = cắt độ cao.

**Áp dụng:** `jump.cut = 0.42` → chạm 0.46m, giữ 2.59m. Kèm coyote 0.1s,
buffer 0.12s. Có test fail nếu <10% bệ nằm ở tầm "chạm nhẹ".

### 4. Metroidvania nói chung — khoá mở LỐI ĐI, không chặn TIẾN ĐỘ
**Nguồn:** [Game Developer — Making Sense of Metroidvania Design](https://www.gamedeveloper.com/design/making-sense-of-metroidvania-game-design) · [Subtractive Design](http://subtractivedesign.blogspot.com/2013/01/guide-to-making-metroidvania-style_16.html) · [Nikles — Metroid-like World Design](https://nikles.it/2016/game-design/metroidvania-metroid-like-world-design/)

Khu vực mở sẵn từ đầu, chặn bằng **thiếu năng lực**. Màn chơi *khoe* lối đi
chưa vào được để cho lý do quay lại.

**Áp dụng:** test `the pole opens routes, and never blocks progress` — không
phòng nào được có lối ra sau sào; tỉ lệ khoá phải nằm trong 8–40%.

---

## ĐÃ THAM KHẢO, CHƯA ÁP DỤNG

| # | Game | Bài học địa hình | Trạng thái |
|---|---|---|---|
| 5 | **Blasphemous 2** | Không gian dọc kiểu nhà thờ; gai/hố tức chết làm rào thay vì quái | có `hazard` rồi nhưng chưa gây sát thương |
| 6 | **Ori and the Will of the Wisps** | Địa hình dạy kỹ năng trước khi thử thách; đoạn "trốn chạy" một chiều | chưa có phòng dạy riêng |
| 7 | **Nine Sols** | Chiến đấu kiểu Sekiro trong không gian **hẹp có chủ đích**, tường sau lưng | `kind` chưa có loại phòng hẹp |
| 8 | **Ender Magnolia / Ender Lilies** | Phòng nghỉ đặt ngay trước cụm khó | game này đã làm đúng (Miếu Nhỏ giữa 2 phòng khó) |
| 9 | **Rogue Legacy 2** | Phòng sinh ngẫu nhiên từ template tay, cửa ở nhiều độ cao | template có, **cửa nhiều độ cao chưa có** |
| 10 | **Salt and Sanctuary** | Souls 2D: đường tắt mở ngược về lửa trại | **chưa có đường tắt nào** |
| 11 | **Katana Zero** | Phòng = một màn hình, chết là làm lại ngay | ngược hướng thiết kế hiện tại |
| 12 | **Skul: The Hero Slayer** | Roguelite side-scroll, phòng ngắn nối nhanh | tham chiếu nhịp độ |
| 13 | **Celeste** | Mỗi màn dạy đúng một ý tưởng rồi bỏ | `note` trong `world.js` đã theo hướng này |
| 14 | **GRIME / Biomorph** | Địa hình hữu cơ nhưng va chạm vẫn vuông | củng cố bài học #1 |
| 15 | **Castlevania: SOTN** | Bản đồ ô lưới, phòng nối cả dọc lẫn ngang | **phòng hiện chỉ nối trái–phải** |
| 16 | **Shadow Labyrinth** | Mê cung dọc, nhiều tầng chồng | chưa có |
| 17 | **Prince of Persia: The Lost Crown** | Ghim vị trí trên bản đồ để nhớ chỗ chưa vào được | chưa có bản đồ |

**Nguồn danh sách:** [GameRant](https://gamerant.com/best-ps5-games-like-hollow-knight/) · [Eneba](https://www.eneba.com/hub/games/games-like-hollow-knight/) · [GameWhims](https://gamewhims.com/roundup/games-like-hollow-knight/) · [Rogueliker — Roguelike Platformers](https://rogueliker.com/roguelike-platformers/) · [GameSpot — Best Roguelikes](https://www.gamespot.com/gallery/best-roguelike-games/2900-6522/)

---

## HAI THIẾU SÓT LỚN NHẤT CÒN LẠI

Hai thứ **mọi game trong danh sách đều có mà game này không**:

1. **Cửa nối dọc.** Phòng hiện chỉ nối trái–phải. Dead Cells có "vertical door
   positions" trong template phòng; SOTN nối cả bốn hướng. Đây là lý do map vẫn
   cảm giác như một hàng ngang dù phòng đã cao 20m.

2. **Đường tắt.** Souls 2D (Salt and Sanctuary) và mọi metroidvania đều mở
   đường tắt ngược về chỗ nghỉ. Game này có 61 lửa trại mà **không một đường
   tắt nào** — chết là đi lại từ đầu khu.

*Sinh từ tra cứu ngày 2026-08-15. Số liệu đo từ `src/` và `tools/draw.js`.*
