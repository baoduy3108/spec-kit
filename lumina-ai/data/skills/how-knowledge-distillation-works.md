---
name: how-knowledge-distillation-works
description: How knowledge distillation works — training a small "student" model to mimic a large "teacher", learning from the teacher's soft probability outputs (dark knowledge) rather than just hard labels, and why the student can be much smaller yet nearly as good. Use to understand knowledge distillation, model compression, teacher-student training, or making a small model as good as a big one.
category: ai-agent
keywords_vi: knowledge distillation, dark knowledge, chưng cất tri thức, student teacher, student nhỏ bắt chước teacher lớn, học từ xác suất mềm soft label, nén mô hình, nhỏ mà gần bằng lớn
---

# How Knowledge Distillation Works

Knowledge distillation trains a **small "student" model** to reproduce the behavior of a **large "teacher" model** — compressing the teacher's capability into a model that's much smaller, faster, and cheaper to run, with surprisingly little quality loss. It's a key model-compression technique (alongside quantization — see model-quantization, and pruning).

## The Problem: Big Models Are Expensive to Serve

A large model may be too slow/costly to deploy at scale (see llm-cost-and-latency-optimization, how-gpus-work). You want a **small** model with similar quality. Training a small model from scratch on the raw data usually underperforms — but distillation lets the small model **learn from the big one**, closing much of the gap.

## The Core Idea: Learn From Soft Outputs ("Dark Knowledge")

The insight is *what* the student learns from. Instead of just the **hard labels** (the correct answer), the student learns to match the teacher's full **probability distribution** over outputs — the "soft" outputs:
- A hard label says "this image is a dog" (one answer).
- The teacher's soft output says "90% dog, 8% wolf, 1.5% cat, 0.5% ..." — this **richer signal** reveals the teacher's learned similarities and uncertainties ("dogs look somewhat like wolves"). This extra information is called **dark knowledge**.
Learning to match these soft probabilities transfers far more of the teacher's understanding than hard labels alone. A **temperature** (see how-llm-sampling-works) is used to soften the distributions during distillation, exposing more of the fine-grained structure. The student's loss combines matching the teacher's soft outputs and (often) the true labels.

## Why the Student Can Be Small Yet Good

The teacher has effectively done the hard work of learning good representations and the structure of the problem; the student just has to **imitate** that learned function, which is easier than discovering it from scratch. So a much smaller student can approximate a large teacher's behavior far better than training that small model directly on the original data. You compress capability, not just parameters.

## Variants for LLMs

- **Response/sequence distillation** — train a small LLM on the **outputs** of a large LLM (the teacher generates training data / target distributions). Widely used to make small, fast models that mimic big ones.
- **Feature/intermediate distillation** — match internal representations, not just outputs.
- **Combine with quantization/pruning** — distill *then* quantize for maximum compression (see model-quantization).
Many small, capable open models are distilled from larger ones.

## The Trade-offs

- The student **approximates** the teacher — it's usually slightly worse, and can inherit the teacher's **biases and errors** (it learns to imitate, mistakes included).
- The student is **bounded by the teacher** — distillation transfers existing capability, it doesn't create new capability beyond the teacher.
- Quality depends on the **distillation data/coverage** — the student only learns the behavior it's shown.

## Pitfalls (in understanding/using)

- Training the student only on **hard labels** — you lose the "dark knowledge"; match the teacher's **soft** distributions.
- Expecting the student to **exceed** the teacher — it imitates; it's bounded by the teacher's quality.
- Inheriting the teacher's **biases/errors/hallucinations** (the student copies them).
- Poor **distillation-data coverage** → the student mimics the teacher only on seen cases and fails elsewhere.
- Forgetting the **temperature** softening that exposes the useful fine-grained probabilities.
- Assuming distillation replaces the need for a **good teacher** — a weak teacher yields a weak student.
- Confusing distillation (imitate a teacher) with quantization (lower precision) or pruning (remove weights) — complementary compression methods.
