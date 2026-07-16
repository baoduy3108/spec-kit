# Ghi công nguồn — Thư viện Kỹ năng nội bộ

Các file `.md` trong thư mục này là bản tuyển chọn/rút gọn từ các repo Claude Skills công khai
bên dưới, dùng làm tài liệu tham khảo tiêm vào chế độ ⚙️ Lumina Forge khi phù hợp. Tất cả đều
mã nguồn mở giấy phép cho phép tái sử dụng (yêu cầu ghi công tác giả gốc).

| Repo nguồn | Tác giả | Giấy phép | Link |
|---|---|---|---|
| `agent-skills` | Addy Osmani | MIT | https://github.com/addyosmani/agent-skills |
| `skills` (chính thức) | Anthropic | Apache-2.0 | https://github.com/anthropics/skills |
| `superpowers` | Jesse Vincent | MIT | https://github.com/obra/superpowers |
| `taste-skill` | Leonxlnx | MIT | https://github.com/Leonxlnx/taste-skill |
| `ui-ux-pro-max-skill` | Next Level Builder | MIT | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill |

Chỉ các skill THUẦN VĂN BẢN/PHƯƠNG PHÁP LUẬN (không cần chạy tool/MCP/browser/code-execution
thật) được tuyển vào — LUMINA là REST API chat, không có hạ tầng thực thi công cụ như một coding
agent thật (vd Claude Code). Nội dung gốc có thể đã bị cắt bớt (~12.000 ký tự) nếu quá dài. Mỗi
file có thêm trường `keywords_vi` (từ khóa kích hoạt tiếng Việt, tự viết khi tuyển chọn — không
thuộc nội dung gốc) để so khớp với tin nhắn người dùng. Xem `app/skills.py` để biết cách các
file này được nạp và so khớp.

Các repo `gstack`, `understand-anything`, `codebase-memory-mcp` (DeusData), `ruflo` (ruvnet) đã
được xem xét nhưng KHÔNG đưa vào — đều là MCP server/agent-orchestration framework thật, đòi hỏi
tiến trình chạy nền/vector DB/browser control mà LUMINA không có.
