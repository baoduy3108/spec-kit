---
name: data-journalism-and-storytelling
description: How to turn data into a clear, honest story — finding the story in data, verifying and contextualizing, choosing the right visualization for the narrative, structuring a data-driven piece, and avoiding misleading charts/statistics. Use to communicate findings from data, write a data-driven report/story, or present monitoring/analysis results to an audience.
category: engineering
keywords_vi: data journalism storytelling, kể chuyện bằng dữ liệu, tìm câu chuyện trong dữ liệu, xác minh bối cảnh hóa, chọn biểu đồ đúng, cấu trúc bài dữ liệu, tránh biểu đồ thống kê gây hiểu lầm
---

# Data Journalism & Storytelling

Data journalism turns raw data and analysis into a **clear, honest, compelling story** an audience understands and trusts. Whether reporting monitoring findings, an investigation, or an analysis, the skill is bridging **rigorous data** and **human narrative** — without misleading. It's the "dissemination" end of the intelligence cycle (see osint-fundamentals) done well.

## Find the Story in the Data

Data alone isn't a story. The craft is finding the **angle**: what's surprising, important, or human here? Look for **patterns, outliers, changes over time, comparisons, and the "so what."** A good data story answers a question the audience cares about and reveals something they didn't know. Start from a question or a striking finding, not "here's a spreadsheet."

## Verify & Contextualize (don't mislead)

Before telling it, be sure it's **true and fair**:
- **Verify the data** — source, method, quality, limitations (see data-source-reliability, information-verification). Bad data → false story.
- **Context is everything** — a raw number is meaningless without a baseline/comparison. "1,000 cases" — up or down? per capita? vs last year? vs elsewhere? Absolute counts mislead without denominators and trends.
- **Correlation ≠ causation** — the #1 data-story error; don't imply cause from co-occurrence (see statistics-fundamentals, critical-thinking).
- **Acknowledge uncertainty** — margins of error, small samples, caveats. State what the data does *not* show.

## Choose the Right Visualization

Match the chart to the **message** (see data-visualization-principles, dataviz):
- **Trend over time** → line chart. **Comparison** → bar chart. **Part-to-whole** → carefully (pie/stacked, sparingly). **Distribution** → histogram. **Relationship** → scatter. **Geographic** → map (see geospatial-mapping-and-geocoding).
- The visual should make the point **instantly and honestly** — not decorate. Sometimes the clearest "visualization" is a single well-chosen number.

## Structure the Narrative

Guide the audience:
- **Lead with the finding** (inverted pyramid — the key point first, see technical-writing).
- **Show the evidence** — the data/visuals that support it, layered from overview to detail.
- **Provide context and caveats** honestly.
- **Make it human** — connect the numbers to real people/impact; abstract stats land better with a concrete face/example.
- **Let readers verify** — cite/link the data and method (transparency builds trust).

## Avoid Misleading (the ethical core)

Data can lie persuasively. Don't (even unintentionally):
- **Truncated/manipulated axes** exaggerating trends; misleading scales.
- **Cherry-picked** timeframes/comparisons that flip the story.
- **Confusing correlation with causation**; implying more than the data supports.
- **Missing denominators/context** (counts without rates/baselines).
Honesty isn't just ethics — misleading charts destroy credibility when caught.

## Pitfalls (in understanding/using)

- **Dumping data** instead of finding and telling a story (no angle, no "so what").
- **No context/baseline** — raw numbers that mislead (need comparison, per-capita, trend).
- **Correlation → causation** overreach.
- **Misleading visuals** — truncated axes, cherry-picked ranges, chart junk — intentional or not, they break trust.
- **Overstating certainty** — hiding caveats, small samples, or data limits.
- **Chart for decoration**, not communication — pick the visualization that serves the message.
- Forgetting the **human** — abstract stats without relatable impact don't land.
- Not showing your **sources/method** — transparency is what makes a data story trustworthy.
