# Dữ liệu fine-tune — dùng cái nào, tránh cái nào

Phân loại các nguồn (gồm danh sách bạn gửi). **Fine-tune SFT/LoRA cần dataset
instruction/chat CÓ FORMAT** (cặp hỏi→đáp / hội thoại), không phải văn bản thô,
không phải benchmark đánh giá.

> `prepare_data.py --list` in đúng danh sách nguồn code trong script hỗ trợ +
> danh sách benchmark bị chặn cứng. File này giải thích **vì sao**.

## ✅ NÊN dùng — dataset SFT/instruction (fine-tune LoRA được)

### Instruction / hội thoại tổng quát
| Dataset | HF id | Nội dung | Giấy phép (kiểm lại!) |
|---|---|---|---|
| Dolly 15k | `databricks/databricks-dolly-15k` | 15k cặp instruction người viết | **CC BY-SA 3.0** (ghi công + share-alike) |
| UltraChat 200k | `HuggingFaceH4/ultrachat_200k` | Hội thoại nhiều lượt đã lọc | **MIT** |
| OpenHermes 2.5 | `teknium/OpenHermes-2.5` | ~1M mẫu chất lượng cao | Xem card — nhiều nguồn con, **kiểm từng phần** |
| OpenOrca | `Open-Orca/OpenOrca` | ~4M FLAN + phản hồi GPT | **MIT** (data); sinh từ GPT — chú ý điều khoản OpenAI nếu thương mại |

### Code reasoning / code instruction (MẠNH cho code)
| Dataset | HF id | Nội dung | Ghi chú |
|---|---|---|---|
| OpenCodeReasoning | `nvidia/OpenCodeReasoning` | ~735k lời giải code có suy luận | Có thể cần chọn config/split theo card |
| OpenCodeInstruct | `nvidia/OpenCodeInstruct` | ~5M instruction code | Lớn — giới hạn `--max-per-source` |
| CodeSearchNet | `code_search_net` | code + docstring (6 ngôn ngữ) | Tốt cho "giải thích/viết theo docstring" |

### Competitive programming (problem → solution)
| Dataset | HF id | Ghi chú |
|---|---|---|
| APPS | `codeparrot/apps` | **CHỈ split train.** Cẩn thận trùng benchmark |
| CodeContests | `deepmind/code_contests` | problem→solution |
| TACO | `BAAI/TACO` | problem→solution, khó |

> ⚠️ Competitive dataset dễ **nhiễm chéo** với HumanEval/MBPP/LiveCodeBench.
> Chỉ dùng split **train**; nếu định báo cáo điểm benchmark, khử trùng (dedup)
> với tập test trước.

### Toán + suy luận (dùng split TRAIN)
| Dataset | HF id | Ghi chú |
|---|---|---|
| NuminaMath-CoT | `AI-MO/NuminaMath-CoT` | CoT toán chất lượng cao |
| GSM8K | `gsm8k` (config `main`) | **CHỈ split train** — để `test` cho eval |
| MATH (Hendrycks) | `EleutherAI/hendrycks_math` | Chọn config môn (`algebra`…); **CHỈ train** |

### Agent / tool-use / function-calling
| Dataset | HF id | Ghi chú |
|---|---|---|
| xLAM function-calling | `Salesforce/xlam-function-calling-60k` | 60k mẫu gọi hàm |
| ToolBench | `ToolBench/ToolBench` | Tool-use nhiều bước; format phức tạp, có thể cần chỉnh |

`prepare_data.py` hỗ trợ sẵn các key: `dolly ultrachat openhermes openorca
opencodereasoning opencodeinstruct apps codecontests taco numinamath gsm8k
math xlam toolbench`. Thêm nguồn khác = viết một hàm map trong file đó.

## 🚫 BENCHMARK — TUYỆT ĐỐI KHÔNG train vào (chỉ để ĐÁNH GIÁ)

Train lên tập đánh giá = **nhiễm dữ liệu (contamination)** → điểm ảo, gian lận,
model chỉ "học thuộc đáp án" chứ không giỏi thật. `prepare_data.py` **chặn cứng**
các tên này (từ chối nếu bạn lỡ thêm vào `--sources`).

| Benchmark | HF id | Dùng để |
|---|---|---|
| HumanEval | `openai/openai_humaneval` | Đo pass@k code — **chỉ eval** |
| MBPP | `google-research-datasets/mbpp` | Đo code cơ bản — **chỉ eval** |
| AIME 2024 | `AIME_2024` | 30 bài toán — **chỉ eval** |
| BFCL | Berkeley Function-Calling Leaderboard | Đo tool-use — **chỉ eval** |
| SWE-bench | `princeton-nlp/SWE-bench` | Đo sửa bug repo thật — **chỉ eval** |

> GSM8K/MATH có **cả** train và test: dùng **train** để SFT, giữ **test** để eval —
> script tự lấy đúng split train.

## 🖼️ Đa phương thức (UI→code) — cần VLM, KHÔNG hợp pipeline LoRA-text này

| Dataset | Vì sao chưa dùng |
|---|---|
| Vision2UI, RICO, Pix2Code | Là **ảnh giao diện → code/annotation**. Fine-tune cần **model thị giác (VLM)** + pipeline ảnh, khác hẳn LoRA text ở đây. Muốn làm UI-from-image thì phải chọn model nền đa phương thức (Qwen2.5-VL…) và pipeline riêng — ngoài phạm vi scaffold hiện tại. |

## 🧱 Corpus PRE-TRAINING — KHÔNG dùng để LoRA model nhỏ

| Nguồn | Vì sao không |
|---|---|
| The Stack v2 (`bigcode/the-stack-v2`), FineWeb (`HuggingFaceFW/fineweb`), WikiText, Gutenberg, Wikimedia dumps, Wikidata, CommonCrawl, OpenAlex, Archive.org, OpenLibrary | **Corpus cỡ GB–PB để HUẤN LUYỆN TỪ ĐẦU** (cần cụm GPU + tuần/tháng). Không phải cặp hỏi→đáp để SFT; nhồi vào LoRA nhỏ là bất khả + vô nghĩa. Muốn "dạy kiến thức" → **skills-injection** (đã free) hoặc **RAG**, đừng nhồi corpus vào weights. |

## 🧰 Không phải dataset text-instruction

| Nguồn | Vì sao |
|---|---|
| `ellisonleao/magictools`, `godotengine/godot-demo-projects`, `UnityTechnologies/open-project-1` | Danh sách công cụ / project game — không có cặp "hỏi→đáp". Hữu ích làm **tham khảo cảm hứng** cho skill game, KHÔNG phải data fine-tune. |
| `plato.stanford.edu/.../moral-particularism` | Một bài bách khoa lẻ — thêm vào knowledge/RAG, không fine-tune. |

## Nguyên tắc chọn data

- **Chất > lượng.** Vài nghìn–vài chục nghìn mẫu SẠCH, đúng phong cách bạn muốn,
  hơn hàng triệu mẫu tạp.
- **Khớp mục tiêu fine-tune** (văn phong/định dạng/lĩnh vực) — đừng trộn tùm lum.
  Fine-tune để chỉnh **giọng/định dạng/hành vi**, KHÔNG phải để nhồi kiến thức.
- **Khử trùng lặp + lọc rác + kiểm PII/độc hại** trước khi train.
- **Không bao giờ train lên benchmark** (contamination). Dedup train với test.
- **Giữ kiến thức ở skills/RAG, không nhồi vào weights.**
- **Đọc kỹ giấy phép** — nhất là dataset sinh từ output model đóng
  (OpenOrca/OpenHermes) nếu bạn định thương mại.
