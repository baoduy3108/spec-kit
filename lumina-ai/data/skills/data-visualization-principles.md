---
name: data-visualization-principles
description: Choose and design charts that communicate honestly — pick the chart type for the data relationship (comparison/trend/distribution/composition/correlation), maximize data-ink, label directly, use color purposefully, don't truncate axes to mislead, and avoid chartjunk. Use when making a chart, graph, or dashboard, or choosing how to visualize data.
category: design
keywords_vi: trực quan hóa dữ liệu, data visualization, chọn loại biểu đồ, bar line pie chart, biểu đồ nào phù hợp, chart gây hiểu lầm, dashboard, thiết kế biểu đồ
---

# Data Visualization Principles

A chart's job is to make a pattern in data instantly clear — and to tell the truth. The two failures are picking the wrong chart and designing one that misleads.

## Match the Chart to the Relationship

Pick by what you're showing, not by what looks fancy:
- **Comparison across categories** → **bar chart** (horizontal if labels are long). The safest, most-readable default.
- **Trend over time** → **line chart**.
- **Distribution** of one variable → **histogram / box plot**.
- **Correlation** between two variables → **scatter plot**.
- **Composition / parts of a whole** → **stacked bar** or a treemap; use a **pie chart sparingly** (only 2–3 slices, and bars usually read better — humans compare lengths better than angles).
- **Part-to-whole over time** → stacked area.
Ranking, few numbers → just a table or a bar. Don't use a chart where a single number or sentence is clearer.

## Design for Clarity

- **Maximize data-ink** — remove everything that isn't data: heavy gridlines, 3D effects, drop shadows, backgrounds, redundant legends ("chartjunk"). Every non-data pixel is noise.
- **Label directly** where possible (label lines at their end) instead of forcing a legend lookup.
- **Sort** bars by value (not alphabetically) so the ranking is instant.
- **Color with purpose** — use it to encode a variable or highlight one series, not decoration. Limit the palette; ensure it's **colorblind-safe** and works in light/dark; don't rely on color alone (add labels/patterns).
- **Start bar-chart axes at zero** — truncating a bar axis exaggerates differences and misleads (bar length encodes the value). Line charts *can* use a non-zero axis to show variation, but note it.
- **Clear title stating the takeaway** ("Sales grew 40% in Q3"), axis labels with units, and a source.

## Honesty (don't lie with charts)

- **Truncated/manipulated axes** to exaggerate or hide a trend — the classic deception.
- **Dual axes** that imply a correlation by scaling — often misleading.
- **Wrong chart** (pie with 12 slices; 3D that distorts proportions).
- **Cherry-picked ranges** that hide the fuller picture.
The goal is to reveal the truth in the data, not to argue a point by distorting it.

## Practical

Know your **audience and the one message**; choose the chart that shows that relationship; strip it to the data; label and title so it's understandable without you there. If it needs a paragraph to explain, redesign it.

## Pitfalls

- **Wrong chart type** for the relationship.
- **Pie charts** with too many slices / comparing angles.
- **Truncated axes** and other misleading scaling.
- **Chartjunk** (3D, clutter) burying the signal.
- **Color as decoration**, not encoding; not colorblind-safe.
- No clear takeaway title.
