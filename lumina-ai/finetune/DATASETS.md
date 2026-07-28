# Dữ liệu fine-tune — dùng cái nào, tránh cái nào

Phân loại các nguồn (gồm danh sách bạn gửi). **Fine-tune SFT/LoRA cần dataset
instruction/chat CÓ FORMAT** (cặp hỏi→đáp / hội thoại), không phải văn bản thô,
không phải benchmark đánh giá.

> `prepare_data.py --list` in đúng danh sách nguồn code trong script hỗ trợ +
> danh sách benchmark bị chặn cứng. File này giải thích **vì sao**.

## ✅ NÊN dùng — dataset SFT/instruction (fine-tune LoRA được)

### Instruction / hội thoại tổng quát
| Dataset | HF id (key) | Nội dung | Giấy phép (kiểm lại!) |
|---|---|---|---|
| Dolly 15k | `databricks/databricks-dolly-15k` (`dolly`) | 15k cặp instruction người viết | **CC BY-SA 3.0** (ghi công + share-alike) |
| UltraChat 200k | `HuggingFaceH4/ultrachat_200k` (`ultrachat`) | Hội thoại nhiều lượt đã lọc | **MIT** |
| OpenHermes 2.5 | `teknium/OpenHermes-2.5` (`openhermes`) | ~1M mẫu chất lượng cao | Xem card — nhiều nguồn con, **kiểm từng phần** |
| OpenOrca | `Open-Orca/OpenOrca` (`openorca`) | ~4M FLAN + phản hồi GPT | **MIT** (data); sinh từ GPT — chú ý điều khoản OpenAI |
| No Robots | `HuggingFaceH4/no_robots` (`norobots`) | 10k mẫu người viết, rất sạch | **CC BY-NC 4.0** — ⚠️ phi thương mại |
| Tulu v2 SFT | `allenai/tulu-v2-sft-mixture` (`tulu2`) | Hỗn hợp nhiều SFT chất lượng | **ODC-BY** — kiểm nguồn con |
| LIMA | `GAIR/lima` (`lima`) | 1k mẫu CỰC sạch (ít mà tinh) | **Gated** — cần đăng nhập HF + đồng ý điều khoản |
| Capybara | `LDJnr/Capybara` (`capybara`) | Hội thoại nhiều lượt, reasoning | **Apache-2.0** (kiểm card) |
| WizardLM Evol-Instruct 70k | `WizardLMTeam/WizardLM_evol_instruct_70k` (`wizardlm`) | Instruction tiến hóa độ khó | Sinh từ GPT — chú ý điều khoản |
| Aya (Cohere) | `CohereLabs/aya_dataset` (`aya`) | Đa ngôn ngữ 100+ (có tiếng Việt) | **Apache-2.0**; **gated** — cần đăng nhập HF |

### Code reasoning / code instruction (MẠNH cho code)
| Dataset | HF id (key) | Nội dung | Ghi chú |
|---|---|---|---|
| OpenCodeReasoning | `nvidia/OpenCodeReasoning` (`opencodereasoning`) | ~735k lời giải code có suy luận | Có thể cần chọn config/split theo card |
| OpenCodeReasoning-2 | `nvidia/OpenCodeReasoning-2` (`opencodereasoning2`) | ~2.16M, bản v2 mạnh hơn | Split theo ngôn ngữ (`python`/`cpp`) — mặc định `python` |
| OpenCodeInstruct | `nvidia/OpenCodeInstruct` (`opencodeinstruct`) | ~5M instruction code | Lớn — giới hạn `--max-per-source` |
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

### Agent / tool-use / SWE-agent
| Dataset | HF id (key) | Ghi chú |
|---|---|---|
| xLAM function-calling | `Salesforce/xlam-function-calling-60k` (`xlam`) | 60k mẫu gọi hàm |
| ToolBench | `ToolBench/ToolBench` (`toolbench`) | Tool-use nhiều bước; format phức tạp, có thể cần chỉnh |
| **SWE-smith** | `SWE-bench/SWE-smith` (`swesmith`) | ⚠️ **DỮ LIỆU TRAIN** cho SWE-agent — **KHÁC** benchmark `SWE-bench`. Map mô tả lỗi→patch. Bản trajectory (`SWE-bench/SWE-smith-trajectories`) là SFT hội thoại đầy đủ hơn nếu muốn. |

> **SWE-smith ≠ SWE-bench.** SWE-bench là **benchmark** (bị chặn train).
> SWE-smith là **tập huấn luyện** do chính nhóm đó phát hành để *dạy* agent —
> train được. Nhưng vẫn nên dedup với tập test SWE-bench trước khi báo cáo điểm.

`prepare_data.py --list` in đủ 22 key hỗ trợ (dolly ultrachat openhermes
openorca norobots tulu2 lima capybara wizardlm aya opencodereasoning
opencodereasoning2 opencodeinstruct apps codecontests taco numinamath gsm8k
math xlam toolbench swesmith). Thêm nguồn khác = viết một hàm map trong file đó.

> **Dataset gated** (`lima`, `aya`): phải `huggingface-cli login` + bấm "Agree"
> trên trang dataset trước, không thì tải sẽ 401. Script báo lỗi rõ nếu chưa.

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

## ⚙️ Cần xử lý thêm mới dùng được

| Nguồn | Vì sao chưa cắm thẳng |
|---|---|
| FLAN Collection (`github.com/google-research/FLAN/tree/main/flan/v2`) | Là **script sinh dữ liệu**, không phải file JSONL tải-là-chạy. Phải chạy pipeline của họ (hàng trăm task templates) để render ra data. Muốn nhanh: dùng bản mirror cộng đồng đã render (vd `SirNeural/flan_v2`) — **kiểm giấy phép + chất lượng bản mirror** trước. OpenOrca (đã hỗ trợ) vốn đã là FLAN + phản hồi GPT nên phần lớn giá trị FLAN bạn đã có. |

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
