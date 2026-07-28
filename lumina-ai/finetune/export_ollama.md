# Gộp LoRA → GGUF → Ollama → trỏ LUMINA vào

Sau khi `train_lora.py` xong (có LoRA adapter ở `out/lumina-lora`), làm 3 bước để
biến nó thành model chạy được trong Ollama, rồi cho LUMINA dùng ở chế độ local-only.

## 1) Gộp LoRA adapter vào model nền (ra model FP16 đầy đủ)

```python
# merge.py — chạy trên máy GPU
from peft import AutoPeftModelForCausalLM
from transformers import AutoTokenizer
m = AutoPeftModelForCausalLM.from_pretrained("out/lumina-lora", torch_dtype="auto")
m = m.merge_and_unload()                       # gộp adapter vào weights
m.save_pretrained("out/lumina-merged")
AutoTokenizer.from_pretrained("out/lumina-lora").save_pretrained("out/lumina-merged")
```

## 2) Convert sang GGUF + quantize (dùng llama.cpp)

```bash
git clone https://github.com/ggerganov/llama.cpp && cd llama.cpp
pip install -r requirements.txt
python convert_hf_to_gguf.py ../out/lumina-merged --outfile lumina-local-f16.gguf
# Quantize cho nhẹ (Q4_K_M ~ tốt/nhẹ cho chạy CPU/GPU máy cá nhân):
./llama-quantize lumina-local-f16.gguf lumina-local.gguf Q4_K_M
```

## 3) Nạp vào Ollama

Sửa `Modelfile.example` cho trỏ đúng đường dẫn `lumina-local.gguf`, rồi:

```bash
ollama create lumina-local -f Modelfile.example
ollama run lumina-local "chào"        # thử nhanh
```

## 4) Cho LUMINA dùng (chế độ 100% local, 0 token)

Trong `.env` của LUMINA:

```env
OLLAMA_BASE_URL=http://localhost:11434/v1
LOCAL_MODELS=lumina-local
LOCAL_ONLY=true
```

Khởi động LUMINA → mọi câu trả lời do **model bạn tự fine-tune** sinh ra, chạy local,
**không gọi API ngoài nào, 0đ token** — cộng 875 skills tự tiêm lúc chạy.

> Lưu ý: chất lượng = mức model nền 7B–14B bạn chọn (khá, không bằng frontier cloud).
> Muốn mạnh hơn: chọn model nền lớn hơn (14B) nếu máy đủ VRAM, hoặc data fine-tune tốt hơn.
