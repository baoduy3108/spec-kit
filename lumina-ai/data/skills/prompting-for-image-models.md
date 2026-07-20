---
name: prompting-for-image-models
description: How to prompt image-generation models — structuring prompts (subject, style, composition, lighting, quality), term weighting/emphasis, style and medium tokens, and how image prompting differs from chat prompting. Use to write better image prompts, understand prompt weighting, style tokens, or craft prompts for Stable Diffusion/Midjourney/DALL·E.
category: engineering
keywords_vi: prompt cho model vẽ ảnh, chủ thể phong cách, trọng số nhấn mạnh, token phong cách, prompt vẽ ảnh, prompt ảnh khác prompt chat, style token ảnh, cấu trúc prompt ảnh
---

# Prompting for Image Models

Prompting an image model is a **different craft** from prompting a chat model. Image models (Stable Diffusion, Midjourney, DALL·E) respond to **descriptive keywords and visual attributes**, not conversational instructions — you're describing a picture, not asking a question. Good image prompts are structured, specific about visual qualities, and tuned to how the model interprets terms (see how-diffusion-models-work, negative-prompts-and-cfg).

## Image Prompts ≠ Chat Prompts

A chat model follows instructions ("write me a…"); an image model matches your text against **visual concepts** it learned from captioned images. So:
- **Describe the image, don't command it** — "a red fox in a snowy forest, golden hour" beats "please draw me a fox."
- **Keywords carry weight** — models key off concrete visual nouns/adjectives more than grammar.
- **Order and emphasis matter** — earlier/weighted terms often influence more.
- The model has **no reasoning** about your intent — it blends the concepts you name; unnamed things are guessed or omitted.

## Structure: What to Specify

A strong prompt usually covers several dimensions:
- **Subject** — the main thing ("a young woman", "a mountain cabin"). Be specific.
- **Descriptors/attributes** — appearance, clothing, colors, materials, mood.
- **Composition/shot** — "close-up", "wide shot", "from above", "centered", "rule of thirds".
- **Style/medium** — "oil painting", "photorealistic", "watercolor", "3D render", "anime", or an art movement.
- **Lighting** — "golden hour", "soft studio lighting", "dramatic rim light", "neon".
- **Quality/detail cues** — "highly detailed", "sharp focus", "8k" (help on some models; less needed on newer ones).
- **Camera/lens** (for photoreal) — "35mm", "shallow depth of field", "bokeh".
Not every prompt needs all of these, but naming the dimensions you care about gives control; omitting them leaves the model to guess.

## Weighting and Emphasis

Most tools let you **emphasize** terms so some matter more:
- **Weighting syntax** — e.g. `(term:1.3)` boosts, `(term:0.7)` reduces (Stable Diffusion); `::` or `--` params (Midjourney). Use to push an attribute the model is underweighting.
- **Order** — front-loaded terms tend to dominate.
- **Don't over-weight** — extreme weights distort/fry the image.
- **Prompt length** — models have a token limit; beyond it, later terms are ignored. Be concise and prioritize.

## Negative Prompts and Guidance

Separately, you tell the model what to **avoid** (negative prompt) and how strictly to **follow** the prompt (CFG scale) — a big lever covered in negative-prompts-and-cfg.

## Design Guidance

- **Be specific and visual** — concrete nouns, materials, lighting, style.
- **Structure** across subject / style / composition / lighting.
- **Iterate** — change one thing at a time (fix the seed — see seed-and-reproducibility-image-gen) to learn what each term does.
- **Match style tokens to the model** — different models "know" different artists/styles; some are trained to ignore certain names.
- **Use weighting sparingly** to fix under/over-represented attributes.
- **Study what works** — image models have quirks; borrow structures from prompts that produced results you like.

## Pitfalls (in understanding/using)

- Writing **conversational instructions** ("please make…") → image models want description, not commands.
- **Vague** prompts → generic, unpredictable results; specificity gives control.
- **Over-weighting**/too many quality-booster tokens → distorted, "fried" images.
- Exceeding the **token limit** → later terms silently dropped.
- Expecting the model to **reason** (counting, text, precise spatial relations) → it blends concepts; it's weak at exact counts/text/layout (use ControlNet for structure — see controllable-image-generation).
- Copying prompts across **different models** and expecting identical results → each interprets terms differently.
