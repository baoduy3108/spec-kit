# Dữ liệu fine-tune — dùng cái nào, tránh cái nào

Phân loại các nguồn (gồm danh sách bạn gửi). **Fine-tune SFT/LoRA cần dataset
instruction/chat CÓ FORMAT**, không phải văn bản thô.

## ✅ NÊN dùng — dataset SFT/instruction sẵn sàng (tải từ HuggingFace)

| Dataset | HF id | Nội dung | Giấy phép (kiểm lại trước khi dùng!) |
|---|---|---|---|
| Dolly 15k | `databricks/databricks-dolly-15k` | 15k cặp instruction do người viết | **CC BY-SA 3.0** — dùng thương mại được, phải ghi công + share-alike |
| UltraChat 200k | `HuggingFaceH4/ultrachat_200k` | Hội thoại nhiều lượt đã lọc | **MIT** |
| OpenHermes 2.5 | `teknium/OpenHermes-2.5` | ~1M mẫu instruction chất lượng cao | Xem card — nhiều nguồn con, có ràng buộc; **kiểm từng phần** |
| OpenOrca | `Open-Orca/OpenOrca` | ~4M mẫu FLAN + phản hồi GPT | **MIT** (dữ liệu) — nhưng sinh từ output OpenAI: chú ý điều khoản OpenAI nếu mục đích thương mại |
| OpenCodeReasoning-2 | `nvidia/OpenCodeReasoning-2` | Suy luận code | Xem card (thường CC-BY-4.0) — kiểm |
| CodeXGLUE | `microsoft/CodeXGLUE` | Benchmark hiểu/sinh code | Theo repo Microsoft — nhiều task, kiểm từng cái |
| Các collection SFT | `HuggingFaceH4/awesome-sft-datasets`, `*/instruction-*` | Tổng hợp con trỏ tới nhiều dataset | Kiểm giấy phép TỪNG dataset con |

`prepare_data.py` hỗ trợ sẵn: `dolly`, `ultrachat`, `openhermes`, `openorca`
(thêm nguồn khác bằng cách viết một hàm map trong file đó).

## ❌ KHÔNG dùng cho fine-tune LoRA cá nhân (và vì sao)

| Nguồn | Vì sao không |
|---|---|
| `dumps.wikimedia.org`, `wikidatawiki/entities`, CommonCrawl, OpenAlex, Archive.org, Gutenberg, OpenLibrary | **Corpus PRE-TRAINING cỡ TB–PB.** Dùng để *huấn luyện model từ đầu* (cần cụm GPU + tuần/tháng), KHÔNG phải để LoRA một model nhỏ. Tải/xử lý bất khả trên máy cá nhân và vô nghĩa cho mục tiêu này. Nếu muốn "dạy kiến thức" thì dùng **skills-injection** (đã free) hoặc RAG, không phải nhồi corpus vào weights. |
| `github.com/ellisonleao/magictools`, `godotengine/godot-demo-projects`, `UnityTechnologies/open-project-1` | **Không phải dữ liệu text-instruction.** Là danh sách công cụ / project game Godot/Unity. Không có cặp "hỏi→đáp" để SFT. (Hữu ích như *tham khảo* cho skill game, không phải data fine-tune.) |
| `plato.stanford.edu/.../moral-particularism-generalism` | Một bài bách khoa lẻ — không phải dataset. Muốn dùng làm kiến thức → thêm vào knowledge/RAG, không fine-tune. |

## Nguyên tắc chọn data

- **Chất > lượng.** Vài nghìn–vài chục nghìn mẫu SẠCH, đúng phong cách bạn muốn, tốt hơn hàng triệu mẫu tạp.
- **Khớp mục tiêu fine-tune** (văn phong/định dạng/lĩnh vực) — đừng trộn tùm lum.
- **Khử trùng lặp + lọc rác + kiểm PII/độc hại** trước khi train.
- **Giữ kiến thức ở skills/RAG, không nhồi vào weights.**
- **Đọc kỹ giấy phép** — nhất là dataset sinh từ output model đóng (OpenOrca/OpenHermes) nếu bạn định thương mại.
