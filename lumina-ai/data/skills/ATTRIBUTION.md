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
| `acquire-codebase-knowledge` | không rõ (chỉ nhận được thư mục skill lẻ, không có repo gốc) | MIT (tự khai trong frontmatter `SKILL.md`) | không rõ |
| `dashmotion` | Mars (csthink) | MIT | https://github.com/csthink/dashmotion |
| `mattpocock/skills` (5 skill: domain-modeling, codebase-design, resolving-merge-conflicts, diagnosing-bugs, prototype) | Matt Pocock | MIT | https://github.com/mattpocock/skills |
| `uucz/moyu` (1 skill: anti-over-engineering) | uucz | MIT | https://github.com/uucz/moyu |
| `Agent-Skills-for-Context-Engineering` (3 skill: context-degradation, multi-agent-patterns, memory-systems) | muratcankoylan + contributors | MIT | https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering |

**Lưu ý về 9 skill mới nhất (domain-modeling → tool-design, trừ dashmotion đã ghi riêng ở trên)**:
nội dung được lấy qua công cụ tải trang web (không tải trực tiếp file gốc như các skill khác) —
tuy đã yêu cầu giữ nguyên văn và đối chiếu, bản lưu trong LUMINA có thể là bản tóm lược/diễn đạt
lại rất sát nội dung gốc chứ không đảm bảo khớp byte-by-byte 100% với `SKILL.md` gốc trên GitHub.
Không tác động tới độ chính xác của phương pháp luận — chỉ khác về hình thức khớp nguyên văn.

Skill `acquire-codebase-knowledge` giả định chạy `scripts/scan.py` + ghi 7 file thật vào
`docs/codebase/` — LUMINA không làm được 2 việc này (không sandbox chạy code, không ghi file thật
lên hệ thống người dùng). Đã tận dụng khung 7 mục (STACK/STRUCTURE/ARCHITECTURE/CONVENTIONS/
INTEGRATIONS/TESTING/CONCERNS) làm cấu trúc trình bày NGAY TRONG CHAT dựa trên code người dùng
dán/đính kèm — không chạy script, không ghi file thật (xem chỉ thị caveat mạnh hơn trong
`build_skill_context()`).

Chỉ các skill THUẦN VĂN BẢN/PHƯƠNG PHÁP LUẬN (không cần chạy tool/MCP/browser/code-execution
thật) được tuyển vào — LUMINA là REST API chat, không có hạ tầng thực thi công cụ như một coding
agent thật (vd Claude Code). Nội dung gốc có thể đã bị cắt bớt (~12.000 ký tự) nếu quá dài. Mỗi
file có thêm trường `keywords_vi` (từ khóa kích hoạt tiếng Việt, tự viết khi tuyển chọn — không
thuộc nội dung gốc) để so khớp với tin nhắn người dùng. Xem `app/skills.py` để biết cách các
file này được nạp và so khớp.

Skill `dashmotion` (sơ đồ kỹ thuật động dạng HTML/SVG tự chứa) đã được **dịch + thích nghi sang
tiếng Việt** (không giữ nguyên văn tiếng Anh như các skill khác) vì bản gốc ưu tiên chạy
`scripts/layout.py` (Python) để tính bố cục — LUMINA không chạy được script, nên bản trong LUMINA
chỉ giữ lại "cách tính tay" (hand-computed fallback) mà chính tài liệu gốc đã mô tả, diễn đạt lại
rõ ràng hơn để LUMINA áp dụng đúng.

Các repo `gstack`, `understand-anything`, `codebase-memory-mcp` (DeusData), `ruflo` (ruvnet),
`serena` (oraios), `cocoindex-code` đã được xem xét nhưng KHÔNG đưa vào — đều là MCP server/CLI/
agent-orchestration framework thật, đòi hỏi tiến trình chạy nền/vector DB/browser control/Language
Server Protocol mà LUMINA không có. `serena` chạy LSP server thật cho từng ngôn ngữ (0 file
SKILL.md). `cocoindex-code` chỉ có 1 SKILL.md nhưng toàn bộ nội dung là hướng dẫn gọi CLI `ccc`
(search/index/init) dựa trên semantic search + vector embeddings thật — không tách được thành nội
dung tư vấn thuần văn bản.

**Nhóm video/tạo ảnh AI đã rà nhưng KHÔNG đưa vào** (từ danh sách `awesome-agent-skills`): hầu hết
skill "tạo ảnh"/"edit video" trong danh sách công khai (fal.ai, MiniMax, OpenAI Sora/imagegen,
Venice.ai, NVIDIA VSS, Remotion, video-db, hand-drawn-diagrams...) đều gọi tới **API trả phí của
bên thứ ba cụ thể** (cần API key + tích hợp HTTP riêng cho từng dịch vụ) — khác với nhóm MCP/CLI
đã loại ở trên, đây là loại phụ thuộc "dịch vụ ngoài trả phí" mà LUMINA không có key/tích hợp.
LUMINA đã có sẵn tính năng vẽ ảnh (Pollinations/DALL-E) và lồng tiếng/phụ đề video (Gemini) — xem
README — không cần các skill này. Ngoại lệ duy nhất tìm được là `dashmotion` (sinh HTML/SVG tự
chứa, không gọi API ngoài) — đã đưa vào. Đã rà thêm các skill nhắc tới "Codex" (agent CLI khác)
trong danh sách — toàn bộ đều là tích hợp công cụ/API thật cụ thể (LinkedIn, VMware, dữ liệu
chứng khoán...), không có skill nào mô tả "năng lực chung của một coding agent" tách biệt được
thành nội dung văn bản mới (phần này đã được `agent-skills`/`superpowers` bao phủ đầy đủ).
