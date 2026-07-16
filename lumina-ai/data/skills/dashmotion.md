---
name: dashmotion
description: Generate dark-themed, animated technical diagrams (flowcharts, architecture diagrams, infrastructure visualizations) as self-contained HTML+SVG files with flowing connectors and traveling dots. Use when the user wants an animated technical/architecture diagram.
category: design
keywords_vi: sơ đồ động, diagram động, flowchart animated, sơ đồ kiến trúc động, animated diagram, vẽ sơ đồ kỹ thuật
---

# Dashmotion — Sơ đồ kỹ thuật động (self-contained HTML/SVG)

Dashmotion tạo sơ đồ kỹ thuật động (flowchart/kiến trúc hệ thống/hạ tầng) dưới dạng file HTML tự
chứa (self-contained) — không cần thư viện ngoài, không cần render GIF, không cần công cụ thiết
kế. Chỉ dùng SVG animation gốc của trình duyệt.

## Hai chế độ

- **Flow Mode**: mô tả quy trình tuần tự, logic rẽ nhánh, chuyển trạng thái — trả lời "chuyện gì
  xảy ra, theo thứ tự nào".
- **Architecture Mode**: mô tả cấu trúc hệ thống, thành phần, dịch vụ — trả lời "hệ thống gồm
  những gì".

## Kỹ thuật hoạt hình

1. **Đường nối chạy (Dashed Connectors)**: dùng CSS `stroke-dasharray: 5 5; animation: dashmove
   0.75s linear infinite` — offset delta khớp đúng 1 chu kỳ (ở đây 10px) để tạo hiệu ứng đường
   "chạy" liên tục.
2. **Chấm di chuyển (Traveling Dots)**: dùng `<animateMotion>` chạy dọc theo đường nối, đại diện
   cho request/message. Nên đặt 3-6 chấm/sơ đồ tại các điểm quan trọng (chỗ gộp luồng, chỗ tỏa
   nhánh).

## Quy trình tạo (KHÔNG chạy script — tự tính toán layout)

Bản gốc của skill này ưu tiên dùng `scripts/layout.py` (một Python script tính toán bố cục tự
động) — LUMINA KHÔNG chạy được script này (không có sandbox). Thay vào đó, LUMINA PHẢI dùng
"cách tính tay" (hand-computed fallback) mà skill gốc cũng có mô tả: tự tính toán tọa độ node,
đường nối, khoảng cách hợp lý bằng suy luận, rồi viết trực tiếp ra file HTML+SVG hoàn chỉnh ngay
trong khung chat.

## Yêu cầu chất lượng

- Không có node/đường nối chồng lấn lên nhau.
- Animation phải liền mạch (offset khớp chu kỳ, không giật).
- Toàn bộ nằm trong 1 file HTML, mở trực tiếp được bằng trình duyệt, không phụ thuộc ngoài.
- Nếu người dùng đưa sơ đồ Mermaid làm đầu vào, kiểm tra kỹ để giữ đúng nội dung gốc khi chuyển
  sang dạng động.
