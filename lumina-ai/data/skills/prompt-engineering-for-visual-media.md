---
name: prompt-engineering-for-visual-media
description: How to write effective prompts for image/video generation — describing subject, style, composition, lighting, camera, and mood; specificity, references, negative prompts, and iterating; plus why visual prompting differs from text-LLM prompting. Use to write prompts for image/video AI (Midjourney, Sora, etc.), get better generated visuals, or control style/composition in generative media.
category: ai-agent
keywords_vi: prompt sinh ảnh, visual media, negative prompt, prompt ảnh video, mô tả phong cách bố cục ánh sáng camera, tham chiếu reference, guidance scale, khác prompt text llm
---

# Prompt Engineering for Visual Media

Writing prompts for image/video generators (see how-diffusion-models-work, how-video-generation-works) is a distinct skill from prompting text LLMs (see prompt-engineering). The model turns your words into pixels, so **describing the visual precisely** — subject, style, composition, lighting, mood — is what separates a generic result from the shot you want.

## Describe the Full Visual, Not Just the Subject

A weak prompt names only *what*: "a cat." A strong prompt specifies the whole image. Cover these dimensions:
- **Subject & action** — who/what, doing what, with what details (breed, color, expression, pose).
- **Style / medium** — photorealistic, oil painting, anime, 3D render, watercolor, cinematic film still, specific art movements. This dramatically changes output.
- **Composition & framing** — shot size, angle, rule of thirds, close-up vs wide (borrow cinematography terms — see camera-and-cinematography-basics).
- **Lighting** — golden hour, soft/hard light, rim light, moody low-key, studio (lighting defines mood — see color-grading-basics).
- **Color / mood / atmosphere** — warm/cool, vibrant/muted, the emotional tone.
- **Setting / background** — where, environment, time of day.
- **Technical cues** — for photorealism: lens/focal length, depth of field, film stock (borrowed from photography — see how-digital-cameras-work).
The more of the *visual* you specify, the more control you have — vague prompts let the model choose (often generically).

## Specificity & References

- **Be specific but coherent** — concrete details guide the model; but contradictory/overloaded prompts confuse it. Prioritize the key elements.
- **Reference images** (image-to-image, style/character references, IP-Adapter) often control style/composition/identity far better than words — use them when appearance matters (see controllable-image-generation, image-to-video-and-animation).
- **Style references** — naming a recognizable style/look conveys a lot compactly.

## Negative Prompts & Weighting

- **Negative prompts** — specify what to **exclude** ("no text, no extra limbs, no blur") — many models support steering away from unwanted content/artifacts.
- **Weighting / emphasis** — some tools let you weight terms (emphasize the important elements).
- **Guidance scale** — how strictly to follow the prompt (see how-diffusion-models-work) — higher = more literal, lower = more creative/loose.

## For Video: Add Motion & Camera

Video prompts add the **time** dimension (see how-video-generation-works): describe the **motion** (what moves, how) and **camera movement** (pan, dolly, zoom — see camera-and-cinematography-basics), plus pacing. "A slow dolly-in on..." gives very different results from a static prompt.

## Iterate

Generation is **stochastic and unpredictable** — the same prompt gives different results. Treat it as **iterative**: generate variations, see what the model does, refine the prompt (add/remove/reweight terms), fix specific issues, and re-roll. Prompting well is a feedback loop, not one-shot.

## Pitfalls (in understanding/using)

- **Vague prompts** (just the subject) → generic results; describe style, composition, lighting, mood.
- **Overloaded/contradictory** prompts → confused output; prioritize key elements coherently.
- Trying to control **exact appearance/identity/composition** with words alone — use **reference images/conditioning** (see controllable-image-generation).
- Ignoring **negative prompts** and **guidance scale** as control levers.
- Expecting **one-shot** perfection — it's iterative; refine and re-roll.
- For video: forgetting to specify **motion and camera** (see how-video-generation-works).
- Assuming prompts transfer between models — each model responds differently; learn its quirks.
- Fighting the model on things it's bad at (precise text, exact counts, hands) instead of working around them or using tools.
