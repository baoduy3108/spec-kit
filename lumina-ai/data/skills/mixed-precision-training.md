---
name: mixed-precision-training
description: How models train ~2× faster with half the memory using lower-precision numbers — mixed precision (FP16/BF16 with FP32 master weights). Covers why FP16 underflows gradients (loss scaling fixes it), why BF16 is easier (same exponent range as FP32), what must stay in FP32, and the memory/throughput wins. Use to understand FP16 vs BF16 vs FP32, loss scaling, and numerical stability in training.
category: ai-ml-internals
keywords_vi: huấn luyện độ chính xác hỗn hợp mixed precision nhanh gấp đôi nửa bộ nhớ, fp16 tràn dưới gradient cần nhân tỉ lệ loss scaling, bf16 dễ hơn cùng dải mũ với fp32, giữ trọng số gốc master weights ở fp32, phần nào phải ở fp32 để ổn định số học, tăng thông lượng và giảm bộ nhớ tensor core
---

# Mixed-Precision Training

By default neural networks train in **FP32** (32-bit floats). But GPUs run **much faster** on 16-bit numbers (2×+ throughput on Tensor Cores), which also **halve memory** for activations and gradients — letting you fit bigger models and batches. The catch: naively switching everything to 16-bit **breaks training** (values underflow/overflow, accuracy collapses). **Mixed-precision training** captures the speed and memory wins while keeping numerical stability by using low precision for the heavy math and **FP32 where it matters** (see gradient-checkpointing-and-activation-memory, tensor-and-pipeline-parallelism, how-neural-networks-learn).

## FP16 vs BF16 vs FP32 (the trade is range vs precision)

A float spends bits on **exponent** (dynamic range) and **mantissa** (precision):
- **FP32** — 8-bit exponent, 23-bit mantissa: wide range, high precision, the safe baseline.
- **FP16** — 5-bit exponent, 10-bit mantissa: good precision but **narrow range** (~6e-5 to 65504). Small gradients **underflow to zero**; large values **overflow to inf**. Needs care.
- **BF16** (bfloat16) — 8-bit exponent (**same range as FP32**), only 7-bit mantissa: **less precise** but rarely under/overflows. Much **easier** — usually no loss scaling needed. The modern default where hardware supports it (A100/H100/TPU).

The key insight: **FP16's problem is range, not precision** — which is exactly what BF16 fixes.

## The FP16 Recipe: Loss Scaling + FP32 Master Weights

To make **FP16** work:
- **FP32 master weights** — keep an FP32 copy of the weights for the optimizer update; tiny weight updates would vanish in FP16. Forward/backward use FP16 copies; the update accumulates in FP32.
- **Loss scaling** — multiply the loss by a large factor **before** backprop so small gradients get scaled **up** into FP16's representable range (avoiding underflow to zero), then **unscale** before the optimizer step. **Dynamic loss scaling** auto-adjusts the factor (back off on inf/nan, grow when stable).
- **Keep sensitive ops in FP32** — reductions like softmax, layernorm, and loss are computed in FP32 for stability; matmuls/convs run in FP16.

**BF16** typically needs **no loss scaling** (its range already covers gradients), which is why it's simpler — though its lower mantissa can matter for some sensitive computations, still kept in FP32.

## The Payoff

- **~2× throughput** on Tensor Cores.
- **~50% activation/gradient memory** → bigger batches/models.
- **Same final accuracy** when done right — this is standard practice, not a hack.

## Design Guidance (for understanding/using)

- **Prefer BF16 where supported** — simplest path, no loss scaling, robust range.
- **Use FP16 + dynamic loss scaling + FP32 master weights** on hardware without BF16.
- **Let the framework handle it** — `torch.cuda.amp.autocast` / `GradScaler`, `bf16=True` in trainers; don't hand-cast.
- **Keep reductions/norms/loss in FP32** — autocast does this; don't force everything to 16-bit.
- **Watch for nan/inf** — if they appear with FP16, it's usually loss-scaling/overflow; BF16 or scaling tuning fixes it.

## Pitfalls (in understanding/using)

- Casting **everything** to FP16 with no loss scaling / master weights → gradients underflow, training diverges.
- Assuming FP16 and BF16 are interchangeable → FP16 needs loss scaling; BF16 usually doesn't (range difference).
- Doing **softmax/layernorm/loss** in 16-bit → numerical instability; keep them FP32.
- Expecting lower precision to hurt final accuracy → done correctly, it matches FP32.
- Forgetting the **FP32 master copy** for the optimizer → tiny updates lost, model won't converge well.
