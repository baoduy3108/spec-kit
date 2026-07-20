---
name: sentiment-and-trend-analysis
description: How to analyze sentiment and detect trends in text streams — sentiment/emotion classification (lexicon vs ML/LLM), aspect-based sentiment, the hard parts (sarcasm, context, negation), trend detection over time with baselines, and turning it into signal. Use to measure sentiment, detect emerging trends/topics, track opinion over time, or gauge public reaction.
category: engineering
keywords_vi: sentiment analysis trend, phân tích cảm xúc xu hướng, tích cực tiêu cực, lexicon vs ml llm, aspect-based sentiment, sarcasm ngữ cảnh phủ định, phát hiện trend theo thời gian baseline
---

# Sentiment & Trend Analysis

Sentiment analysis measures the **tone/opinion** in text (positive/negative/neutral, or finer emotions); trend analysis tracks **how topics and sentiment change over time**. Together they turn a stream of text (reviews, social posts, news) into a read on public opinion and emerging themes (see media-monitoring-and-social-listening, nlp-basics).

## Sentiment Analysis Approaches

- **Lexicon-based** — score text by counting positive/negative words from a sentiment dictionary. Simple, fast, transparent, no training — but misses context, sarcasm, and domain nuance.
- **Machine learning classifiers** — trained on labeled examples to classify sentiment; better at context, but need training data and domain adaptation.
- **LLM / transformer-based** — modern models (see how-transformers-work) capture context, nuance, and even emotion/intent far better, and work zero-shot — the current best for quality, at higher cost/latency.
Match the approach to needs: lexicon for cheap/scale, ML/LLM for accuracy/nuance.

## Aspect-Based Sentiment

Overall sentiment is often too coarse. **Aspect-based** sentiment attributes opinion to **specific aspects**: "the food was great but the service was slow" is positive about *food*, negative about *service*. This granularity (per feature/topic) is far more actionable than one blended score — it tells you *what* people like/dislike, not just the average.

## The Hard Parts

Sentiment is deceptively tricky:
- **Sarcasm / irony** — "Oh great, another outage" is negative despite "great." Hard even for good models.
- **Negation** — "not good" flips polarity; naive word-counting gets it wrong.
- **Context & domain** — "unpredictable" is bad for a car, good for a thriller. Words shift meaning by domain.
- **Mixed/neutral** — much text is neutral or genuinely mixed; forcing binary labels distorts.
- **Language, emoji, slang** — real-world text is messy.
Because of these, **sentiment scores are approximate** — treat them as signals, and read actual content for important decisions.

## Trend Detection

Tracking **change over time** is where monitoring value lives:
- **Volume trends** — is a topic rising, peaking, or fading? (See event-detection-and-alerting for spike/burst detection.)
- **Sentiment trends** — is opinion shifting? A downward swing can be an early crisis signal (see crisis-monitoring).
- **Emerging topics** — detect *new* themes appearing (cluster/topic-model over time — see how-clustering-works).
- **Baselines are essential** — a "trend" only means something relative to **normal**. Account for seasonality, day-of-week, and typical volume, or you'll flag routine rhythms as trends (see time-series-databases).

## Pitfalls (in understanding/using)

- Treating **sentiment scores as precise truth** — they're approximate; sarcasm/negation/context break them. Read content for high-stakes calls.
- **Overall sentiment** hiding aspect-level reality (loved X, hated Y) — use aspect-based when actionable.
- **No baseline** for trends — normal fluctuation misread as a meaningful trend; account for seasonality.
- **Naive lexicon** methods ignoring negation/context on nuanced text.
- **Domain mismatch** — a general model on specialized text (finance, medical) misreads tone.
- Ignoring **language/emoji/slang** in social data.
- Confusing **volume** with **sentiment** — lots of mentions ≠ positive (could be outrage).
