---
name: rag-evaluation
description: How to evaluate a RAG system — separating retrieval metrics (recall/precision@k, context relevance) from generation metrics (faithfulness/groundedness, answer relevance), building a test set, using LLM-as-judge, and diagnosing whether failures are retrieval or generation. Use to measure RAG quality, debug a RAG pipeline, or set up RAG evals.
category: ai-agent
keywords_vi: rag evaluation, đánh giá rag, tách retrieval vs generation metrics, recall precision context relevance, faithfulness groundedness, answer relevance, llm as judge, test set
---

# RAG Evaluation

You can't improve a RAG system you can't measure. RAG evaluation quantifies quality and — crucially — **localizes failures**: is the problem that you retrieved the wrong context (retrieval), or that the model answered badly from good context (generation)? Without this split, you optimize blind (see rag-fundamentals, rag-retrieval-and-reranking).

## Separate Retrieval From Generation

RAG has two stages that fail differently — evaluate them **separately**:
- **Retrieval quality** — did you fetch the right context? Metrics:
  - **Context recall** — did the retrieved chunks contain the info needed to answer? (Missing it → retrieval failure.)
  - **Context precision / relevance** — how much of what you retrieved is actually relevant (vs noise).
  - Classic IR metrics: recall@k, precision@k, MRR, nDCG.
- **Generation quality** — given the retrieved context, was the answer good? Metrics:
  - **Faithfulness / groundedness** — is the answer **supported by the retrieved context**, or did the model hallucinate/add unsupported claims? (The key RAG metric — see hallucination-mitigation.)
  - **Answer relevance** — does it actually address the question?
  - **Correctness** — is it right (vs a reference answer)?
Diagnosing which stage failed tells you what to fix (better chunking/retrieval vs better prompting/model).

## Build a Test Set

You need **evaluation data**: representative questions with (ideally) reference answers and/or the ground-truth relevant chunks. Sources: real user queries, hand-curated Q&A, or **LLM-generated** question/answer pairs from your documents (bootstrap a test set, then human-review). Cover the range: easy lookups, multi-hop, edge cases, and "unanswerable" questions (to test that the system says "I don't know" rather than hallucinating).

## LLM-as-Judge

Many RAG qualities (faithfulness, relevance) are hard to score with string-matching. **LLM-as-judge** — using a capable LLM to grade answers against context/references on these dimensions — is the common approach (frameworks: RAGAS, and others — see evaluation). It's scalable and correlates reasonably with humans, **but**: judges have biases (verbosity, position, self-preference), so validate the judge against human labels, use clear rubrics, and don't treat its scores as ground truth. Keep some human evaluation in the loop.

## Diagnose & Iterate

Use the split to drive fixes:
- **Low context recall** → fix retrieval: chunking (see rag-chunking-strategies), hybrid search/reranking (see rag-retrieval-and-reranking), embeddings, top-k.
- **Good context, bad answer** → fix generation: the prompt, instructions to stay grounded, the model, output format.
- **Hallucination despite good context** → strengthen grounding/faithfulness (see hallucination-mitigation).
Re-evaluate after each change (regression-test your RAG like code).

## Pitfalls (in understanding/using)

- **One end-to-end score** only → you know it's bad but not *why*; separate retrieval vs generation.
- **No test set** → optimizing on vibes; build representative eval data (include unanswerable questions).
- Trusting **LLM-as-judge** blindly → validate against humans; mind judge biases and use rubrics.
- Measuring only **answer correctness**, not **faithfulness** → missing hallucinations that happen to sound right.
- Not testing the **"I don't know"** case → system confidently hallucinates on unanswerable questions.
- Evaluating **once** instead of continuously (regressions as you change chunking/prompts/models).
- Optimizing retrieval metrics that don't translate to answer quality — tie evals to end outcomes.
