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

## Tệp trong thư mục

- `DATASETS.md` — danh sách dataset nên dùng (kèm giấy phép) + cái KHÔNG nên dùng và vì sao.
- `requirements.txt` — thư viện (transformers, datasets, peft, trl, bitsandbytes…).
- `prepare_data.py` — tải & chuẩn hoá các dataset SFT về format chat JSONL thống nhất.
- `train_lora.py` — fine-tune QLoRA (4-bit) bằng TRL `SFTTrainer`.
- `export_ollama.md` — gộp LoRA, convert GGUF (llama.cpp), tạo Modelfile.
- `Modelfile.example` — mẫu Ollama Modelfile nạp model đã fine-tune.
