# Người Thắp Đèn — Godot 4

Mở thư mục này bằng **Godot 4.3+** rồi bấm F5.

## Điều luật của project

`godot/data/*.json` **được sinh ra, không viết tay.** Nguồn sự thật là `souls/src/`.

```
npm run godot     # sinh lại godot/data/ từ src/
npm test          # 124 test, trong đó có bộ gác không cho Godot lệch khỏi src/
```

Không một con số cân bằng nào được phép nằm dưới dạng hằng trong `godot/scripts/`.
`Player.gd` lấy toàn bộ từ `Data.player()`, `Foe.gd` lấy từ `Data.foes[id]`, và
test sẽ fail nếu chúng ngừng làm vậy.

## Phím

| Phím | Việc |
|---|---|
| A / D · ←→ | đi |
| Space | **nhảy** (cao 2.6m, xa 3.7m — không đánh/lăn khi đang bay) |
| Shift trái | lăn (bất tử 0.06–0.31s) |
| Chuột trái | đánh nhẹ |
| Chuột phải | đánh nặng |
| Ctrl | đỡ |
| Q | uống bình |
| R | chơi lại |

Đi hết mép phải phòng là sang phòng sau. Khu mặc định là `undercroft`,
đổi ở hằng `AREA` trong `scripts/Game.gd`.

## Cấu trúc

| Tệp | Việc |
|---|---|
| `scripts/Data.gd` | autoload, nạp JSON một lần |
| `scripts/Player.gd` | port máy trạng thái của `src/rules.js` |
| `scripts/Foe.gd` | AI quái, wind-up dài hơn để đọc được, recovery dài hơn active |
| `scripts/Room.gd` | dựng va chạm từ profile địa hình `tools/draw.js` xuất ra |
| `scripts/Game.gd` | vòng game, chuyển phòng, phân giải đòn, HUD |

Hình khối hiện là ColorRect — đây là **blockout chơi được**, chưa phải art.
Art bible nằm ở `souls/docs/area-1-brief.md`.
