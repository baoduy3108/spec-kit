# Fine-tune VLM cho "ảnh UI → code" (Rico / Vision2UI / WebCode2M)

Đây là scaffold RIÊNG cho việc dạy một **model thị giác-ngôn ngữ (VLM)** biến
**ảnh giao diện → code** (HTML/JSX…). KHÁC với `../` (LoRA text-only): ở đây đầu
vào có **ẢNH**, nên phải dùng model nền đa phương thức + pipeline xử lý ảnh.

> ⚠️ **Sự thật, đọc trước khi kỳ vọng:**
> - **Cần GPU CUDA mạnh** (VLM 7B QLoRA ≈ 1 GPU 24–48GB; nhiều hơn nếu ảnh lớn/độ phân giải cao). Máy không GPU **không chạy được** bước train.
> - LUMINA lúc CHẠY vốn **đã "nhìn" được ảnh** qua Claude/Gemini vision (skill `image-to-code`). Việc train VLM riêng ở đây là để **tự sở hữu** một model ảnh→code chạy local — không bắt buộc để LUMINA làm được ảnh→code.
> - Không chạy được trong môi trường web này (không GPU). Cầm về Kaggle/Colab/GPU cloud để chạy.

## Dữ liệu (đều là ảnh→code/annotation)

| Dataset | HF id | Nội dung |
|---|---|---|
| Vision2UI | `xcodemind/vision2ui` | ảnh trang web → HTML |
| WebCode2M | `xcodemind/webcode2m` | ảnh trang web → HTML/CSS (2M) |
| RICO | `creative-graphic-design/Rico` | ảnh app Android → cây layout/annotation |

> Schema từng dataset khác nhau và hay đổi — `prepare_vlm_data.py` in ra cột thật
> của mỗi dataset và cố gắng tự nhận diện cặp (ảnh, code). Nếu tên cột không khớp,
> chỉnh map trong file đó theo card dataset (giống pipeline text).

## 4 bước

```bash
# 1) Cài (trên máy GPU CUDA)
pip install -r requirements.txt

# 2) Chuẩn bị: tải dataset → lưu ảnh ra đĩa + manifest JSONL {image, prompt, code}
python prepare_vlm_data.py --sources vision2ui --max 5000 \
    --img-dir data/img --out data/vlm_train.jsonl

# 3) Fine-tune QLoRA trên VLM nền (mặc định Qwen2.5-VL-7B-Instruct)
python train_vlm_lora.py --base Qwen/Qwen2.5-VL-7B-Instruct \
    --data data/vlm_train.jsonl --out out/lumina-vlm-lora --epochs 1

# 4) Gộp adapter + dùng: xem ../export_ollama.md (Ollama hỗ trợ một số VLM;
#    hoặc chạy trực tiếp bằng transformers). Ảnh→code do model BẠN tự train.
```

## Vì sao KHÔNG nhét vào pipeline text (`../train_lora.py`)?

`../train_lora.py` chỉ `apply_chat_template` trên **text** rồi tokenize. VLM cần:
- **Processor** riêng (xử lý cả ảnh + text, token ảnh, resize/patch).
- **Kiến trúc model** khác (vision encoder + projector + LLM).
- Collator/loss có phần ảnh.

Nên đây là một nhánh độc lập, đúng như đã nói: *runtime vision thì LUMINA có sẵn;
train một VLM riêng thì cần scaffold này + GPU.*
