# Thiên Đạo Lộ — bản PWA

Thư mục này là bản **cài được lên màn hình chính điện thoại** và chạy offline.
Toàn bộ do `build.mjs` sinh ra, đừng sửa tay ở đây — sửa trong `src/` rồi dựng lại.

| Tệp | Việc |
|---|---|
| `index.html` | Cả game trong một tệp, kèm thẻ manifest và đoạn đăng ký service worker |
| `manifest.webmanifest` | Tên app, icon, màu nền, mở dạng standalone (không thanh địa chỉ) |
| `sw.js` | Service worker: lần đầu vào có mạng là giữ sẵn cả game, sau đó tắt mạng vẫn mở |
| `icons/` | Icon 192, 512, maskable cho Android, apple-touch cho iPhone, favicon |
| `.nojekyll` | Để GitHub Pages không nuốt tệp bắt đầu bằng dấu gạch dưới |

## Vì sao phải có máy chủ

Service worker chỉ chạy trên **https** (hoặc `localhost`). Mở thẳng `index.html`
bằng `file://` thì **không cài được** — nhưng cũng chẳng cần, vì bản
`../thien-dao-lo.html` vốn đã offline sẵn rồi. Bản PWA giải quyết chuyện khác:
có icon riêng trên màn hình chính, mở toàn màn hình, không thanh địa chỉ.

## Cách đưa lên mạng

**GitHub Pages** — Settings → Pages → Source: *GitHub Actions*, rồi vào tab
Actions chạy tay workflow `Thiên Đạo Lộ · PWA lên Pages`. Lưu ý trang sẽ
**công khai**, ai có link đều mở được.

**Thử ở nhà trước** (máy tính và điện thoại cùng wifi):

```bash
cd tu-tien-thpt/pwa && python3 -m http.server 8000
```

Máy tính mở `http://localhost:8000` là cài được ngay. Điện thoại phải dùng
`http://<IP-máy-tính>:8000`, mà `http` thường không đủ điều kiện cài — muốn
thử trên điện thoại thì cần https, dùng Pages hoặc bất kỳ host tĩnh nào.

## Cách cài lên điện thoại

- **Android / Chrome** — mở link, hiện thanh *Cài đặt ứng dụng*; hoặc menu ⋮ →
  *Thêm vào Màn hình chính*.
- **iPhone / Safari** — nút Chia sẻ → *Thêm vào MH chính*. iOS bắt buộc dùng
  Safari, Chrome trên iPhone không cài được.

Cài xong rút mạng vẫn chơi bình thường. Tiến độ vẫn nằm trong máy như cũ.

## Khi có bản mới

`sw.js` mang mã bản dựng đổi theo nội dung. Vào app lúc có mạng, service
worker tải bản mới về nền và hiện nhắc *"Đã có bản mới — đóng rồi mở lại app"*.
Đóng hẳn app rồi mở lại là xong, tiến độ không mất.
