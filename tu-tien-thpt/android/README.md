# Thiên Đạo Lộ — bản Android (APK)

Vỏ bọc mỏng quanh chính bản HTML một tệp: một `Activity`, một `WebView`,
**không thư viện ngoài, không quyền, không mạng**. APK khoảng 3–4 MB.

## Vì sao không nạp thẳng bằng `file://`

Nạp `file:///android_asset/index.html` thì trang chạy trên origin `null`,
mà `localStorage` ở origin đó WebView **không cam kết giữ** qua các lần mở
— tiến độ học có thể bay. Nên `MainActivity` tự phục vụ tệp ấy dưới origin
`https://appassets.androidplatform.net/`, chặn mọi request tới host đó rồi
đọc thẳng từ assets trong APK. Origin ổn định ⇒ `localStorage` ổn định, mà
vẫn không có một gói tin nào rời khỏi máy.

## Dựng ở đâu

**Không dựng được trong môi trường soạn thảo này** — mạng chặn
`dl.google.com`, mà cả Android SDK lẫn Android Gradle Plugin đều nằm ở đó.
Nên việc dựng đẩy sang GitHub Actions, nơi máy chủ có sẵn SDK:

Workflow **tự chạy** mỗi khi nhánh phát triển đụng vào phần app hoặc nội
dung game. Vào tab **Actions** → **Thiên Đạo Lộ · dựng APK** → mở lần chạy
mới nhất → kéo xuống mục **Artifacts** → tải `thien-dao-lo-apk-debug`.

Tải về là một file `.zip`, **bung ra mới thấy file `.apk`** — GitHub luôn
gói artifact vào zip. Cần đăng nhập GitHub mới tải được; artifact không
công khai như GitHub Pages.

Sau khi nhánh gộp vào nhánh chính thì nút **Run workflow** mới hiện, lúc đó
chạy tay được và chọn được `debug` hay `release`.

Đã dựng thật, không phải lý thuyết: APK **1,4 MB**, có đủ `assets/index.html`,
`classes.dex`, `resources.arsc`, icon, và `apksigner verify` xác nhận **ký
đúng chuẩn v2**.

**Dựng ở máy mình** (nếu có Android Studio hoặc SDK):

```bash
cd tu-tien-thpt
node build.mjs
cp thien-dao-lo.html android/app/src/main/assets/index.html
cd android && ./gradlew assembleDebug
# file ra: app/build/outputs/apk/debug/app-debug.apk
```

`assets/index.html` không nằm trong git (xem `.gitignore`) — nó là bản dựng,
luôn chép từ `thien-dao-lo.html` để không bao giờ lệch phiên bản.

## Cài lên điện thoại

Chép file `.apk` sang máy, mở ra, Android sẽ hỏi cho phép **cài từ nguồn
không xác định** — bật cho trình duyệt hoặc trình quản lý file rồi cài.

## debug hay release

| | `debug` | `release` |
|---|---|---|
| Cần cấu hình | không, chạy là có | phải nạp 4 secret |
| Cài được ngay | có | có |
| Cài đè bản mới sau này | **không** — chữ ký mỗi lần dựng một khác, phải gỡ rồi cài lại | có, giữ nguyên tiến độ |

Gỡ app là **mất sạch tiến độ**. Nên nếu định dùng lâu dài thì làm khoá
riêng một lần cho xong:

```bash
keytool -genkeypair -v -keystore thien-dao-lo.jks -keyalg RSA -keysize 2048 \
  -validity 10000 -alias thiendaolo
base64 -w0 thien-dao-lo.jks    # dán chuỗi này vào secret
```

Rồi vào Settings → Secrets and variables → Actions, thêm 4 secret:

| Secret | Giá trị |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | chuỗi base64 vừa in ra |
| `ANDROID_KEYSTORE_PASSWORD` | mật khẩu kho khoá |
| `ANDROID_KEY_ALIAS` | `thiendaolo` |
| `ANDROID_KEY_PASSWORD` | mật khẩu khoá |

**Giữ file `.jks` cẩn thận** — mất là vĩnh viễn không cài đè lên bản cũ
được nữa. `.gitignore` đã chặn không cho lỡ tay commit nó vào repo.

## Còn dùng bản debug thì sao lưu trước khi cài lại

Trong game: **Cài đặt → Xuất tiến độ**, copy chuỗi đó cất đi. Cài bản mới
xong vào **Cài đặt → Nhập tiến độ**, dán lại là về nguyên trạng.
