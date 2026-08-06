---
name: nlp-basics
description: Core natural language processing concepts — tokenization, stemming/lemmatization, stop words, bag-of-words and TF-IDF, word embeddings, and the common tasks (classification, NER, sentiment, translation, summarization) — plus how transformers changed the field. Use to understand NLP terminology and text-processing pipelines.
category: ai-agent
keywords_vi: nlp cơ bản, xử lý ngôn ngữ tự nhiên, tokenization stemming, bag of words tf-idf, word embedding, phân loại văn bản ner sentiment, tác vụ nlp, khái niệm nlp
---

# NLP Basics

Natural Language Processing gets computers to work with human language. Text is messy and unstructured, so most NLP starts by turning it into something numeric a model can use.

## Text Preprocessing

- **Tokenization** — split text into units (words, subwords, or characters). Subword tokenization (BPE) is what modern LLMs use — it handles rare/unknown words gracefully (see how-llms-work).
- **Normalization** — lowercasing, removing punctuation, Unicode normalization (see encoding-and-unicode).
- **Stemming / lemmatization** — reduce words to a root ("running" → "run") so variants match; stemming chops crudely, lemmatization uses real word forms.
- **Stop words** — dropping ultra-common words ("the", "is") in classic pipelines (not for modern transformers, which use context).

## Representing Text as Numbers

- **Bag-of-words** — count word occurrences, ignoring order. Simple, loses meaning/order.
- **TF-IDF** — weight words by how distinctive they are to a document (see how-search-engines-work). Good for classic search/classification.
- **Word embeddings** — map words to vectors where similar meanings are close (word2vec, GloVe, and contextual embeddings from transformers). This captures *meaning*, not just surface tokens (see vector-embeddings), and is the foundation of modern NLP.

## Common Tasks

- **Text classification** — spam/not-spam, topic, intent.
- **Sentiment analysis** — positive/negative/neutral.
- **Named Entity Recognition (NER)** — find people, places, orgs, dates.
- **Machine translation**, **summarization**, **question answering**, **text generation**.
- **Information extraction**, **semantic search**, **clustering/topic modeling**.

## The Transformer Shift

Classic NLP hand-engineered features (TF-IDF + a classifier). **Transformers** (BERT, GPT) learn context-aware representations and now dominate nearly every task — a single pretrained model fine-tuned or prompted beats task-specific pipelines. LLMs are the current frontier: many NLP tasks are now just prompting a large model (see how-llms-work, prompt-engineering). Understanding the classic pieces still helps for lightweight tasks, preprocessing, and reasoning about what models do.

## Pitfalls / Notes

- **Language-specific issues** — tokenization/stemming differ per language; many tools are English-biased (relevant for Vietnamese and other languages — word segmentation, diacritics, Unicode).
- **Ambiguity** — words have multiple meanings; context matters (why embeddings/transformers beat bag-of-words).
- **Bag-of-words loses order** — "dog bites man" vs "man bites dog" look identical.
- **Bias in data** → biased models (offensive or skewed outputs).
- Preprocessing choices (stemming, stop words) that help classic models can *hurt* transformer models — match the pipeline to the model.
