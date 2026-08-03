# ✦ LUMINA — Fine-tune "bộ não local" của riêng bạn

Đây là khung (scaffold) để **fine-tune một model MỞ NHỎ (7B–14B)** thành bộ não
chạy local cho LUMINA — kết hợp với chế độ `LOCAL_ONLY=true` (xem README chính) để
có **"API LUMINA của riêng bạn": 0đ token, không phụ thuộc API ngoài nào**.

> ⚠️ **Đọc phần "Sự thật" bên dưới trước khi bắt tay** — để không tốn công/tiền vô ích.

---

## Sự thật (thành thật 100%)

1. **Fine-tune ≠ nhồi 875 skills.** Skills của LUMINA đã **miễn phí qua tiêm prompt lúc chạy**,
   hoạt động với **mọi** model (kể cả model bạn fine-tune). Nhồi skills vào trọng số là
   **lãng phí compute, kết quả kém hơn**, và mất khả năng sửa skill bằng cách edit file `.md`.
   → **Chỉ fine-tune để dạy VĂN PHONG / ĐỊNH DẠNG đầu ra / LĨNH VỰC hẹp / HÀNH VI** mà prompt
   không làm được. Kiến thức/phương pháp luận → để skills lo.

2. **Chỉ fine-tune được model NHỎ.** 7B–14B qua **LoRA/QLoRA** chạy được trên **1 GPU 24GB**
   (hoặc thuê A100/H100 cloud vài đô/giờ, vài giờ là xong). **KHÔNG** fine-tune được
   Kimi K3 2.8T / model frontier — train nặng gấp 3–4 lần chạy (cần cụm GPU triệu đô) + license.

3. **Data đúng loại = dataset instruction/chat (SFT), KHÔNG phải corpus thô.**
   OpenOrca / UltraChat / Dolly / OpenHermes = ĐÚNG. Wikipedia/CommonCrawl/Wikidata/OpenAlex
   dumps = corpus **pre-training cỡ TB–PB**, KHÔNG dùng cho LoRA cá nhân. Xem `DATASETS.md`.

4. **Môi trường build repo KHÔNG chạy training** (không GPU). Các script ở đây để **bạn chạy
   trên máy có GPU / cloud**. Repo chỉ chứa code + tài liệu.

5. **Tôn trọng giấy phép từng dataset** (một số phi thương mại / có điều khoản riêng) — xem `DATASETS.md`.

---

## Quy trình 4 bước

```bash
cd lumina-ai/finetune
pip install -r requirements.txt          # cần máy có CUDA GPU

# 1) Chuẩn bị dữ liệu → gộp các dataset SFT thật thành 1 file chat JSONL
python prepare_data.py --sources dolly,ultrachat,openhermes,openorca \
       --max-per-source 8000 --out data/train.jsonl

# 2) Fine-tune QLoRA trên 1 model nhỏ (mặc định Qwen2.5-7B-Instruct)
python train_lora.py --base Qwen/Qwen2.5-7B-Instruct \
       --data data/train.jsonl --out out/lumina-lora

# 3) Gộp adapter + xuất GGUF cho Ollama (xem hướng dẫn trong export_ollama.md)
#    → tạo file lumina-local.gguf

# 4) Nạp vào Ollama rồi trỏ LUMINA vào (chế độ local-only)
ollama create lumina-local -f Modelfile.example
#    .env của LUMINA:
#      OLLAMA_BASE_URL=http://localhost:11434/v1
#      LOCAL_MODELS=lumina-local
#      LOCAL_ONLY=true
```

Xong: LUMINA (router + 875 skills) + **model bạn tự fine-tune** = bộ não riêng, chạy 100%
trên máy bạn, không tốn token, không gọi API ngoài nào.

## Chạy trên KAGGLE (GPU miễn phí) — không cần máy có GPU

Không có GPU ở nhà? Dùng **`kaggle_lumina_lora.ipynb`** — chạy trọn quy trình QLoRA
trên GPU free của Kaggle (2×T4 16GB / P100), xuất **LoRA adapter** (~50–400MB) tải về.
1. kaggle.com → **New Notebook** → **File → Import Notebook** → chọn `kaggle_lumina_lora.ipynb`.
2. **Settings → Accelerator → GPU T4 x2**, bật **Internet**.
3. **Run All**. Xong thì tab **Output** → tải `lumina-lora.zip`.
> Kaggle free chỉ đủ cho model **≤ 7–8B** (mặc định Qwen2.5-7B). **22B KHÔNG train nổi** ở đây.

### Bake skills vào model (tùy chọn — KHÔNG khuyến nghị làm chính)
```bash
python prepare_data.py --sources skills --max-per-source 2000 --out data/skills.jsonl
# trộn với dataset thật:  --sources no_robots,dolly,skills
```
Skills đã **miễn phí qua tiêm prompt lúc chạy** (tốt hơn) — chỉ bake nếu bạn CỐ TÌNH
muốn nhét một phần hành vi skill vào trọng số, chấp nhận kém hơn + mất khả năng sửa `.md`.

## ❌ "Nén 22B từ 16-bit → 4-bit thành file < 400MB, làm model mới" — không thể

Giới hạn **vật lý**: 22B ở 4-bit = **~11–13GB**, không phải 400MB (400MB/22B ≈ 0,15
bit/tham số — dưới cả mức ternary 1.58-bit, model sẽ hỏng hoàn toàn).
- **AWQ** ([mit-han-lab/llm-awq](https://github.com/mit-han-lab/llm-awq)) là 4-bit THẬT,
  chất lượng gần nguyên bản — nhưng 22B AWQ vẫn ~11–13GB; nó để **chạy** 22B trên 1 GPU
  16–24GB, không phải thu nhỏ xuống 400MB.
- Cái **< 400MB** duy nhất hợp lý là **LoRA adapter** — *bản vá* cần model gốc kèm theo,
  không phải model 22B đứng một mình.
- Muốn *file nhỏ chạy tốt*: chọn model **3B–8B** rồi AWQ/GGUF 4-bit → ~2–5GB. Đó là
  đường thực tế. (Ô cuối trong notebook Kaggle giải thích kỹ hơn.)

## Tệp trong thư mục

- `kaggle_lumina_lora.ipynb` — **notebook chạy QLoRA trọn gói trên Kaggle GPU free** (dễ nhất).
- `DATASETS.md` — danh sách dataset nên dùng (kèm giấy phép) + cái KHÔNG nên dùng và vì sao.
- `requirements.txt` — thư viện (transformers, datasets, peft, trl, bitsandbytes…).
- `prepare_data.py` — tải & chuẩn hoá các dataset SFT về format chat JSONL (có nguồn `skills`).
- `train_lora.py` — fine-tune QLoRA (4-bit) bằng TRL `SFTTrainer`.
- `merge_lora.py` — **gộp adapter vào model nền (1 lệnh)** → model độc lập, không cần gửi file cho ai.
- `vlm/` — bản cho model NHÌN ẢNH (VLM): `prepare_vlm_data.py` (Rico/Vision2UI/WebCode2M) + `train_vlm_lora.py`.
- `export_ollama.md` — gộp LoRA, convert GGUF (llama.cpp), tạo Modelfile.
- `Modelfile.example` — mẫu Ollama Modelfile nạp model đã fine-tune.
