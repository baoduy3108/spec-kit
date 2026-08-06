---
name: intellectual-property-law
description: Intellectual property law overview — copyright, patents, trademarks, and trade secrets: what each protects, how rights arise, duration, infringement, and licensing. Covers software/open-source licensing basics and fair use. General educational overview, not legal advice; laws vary by jurisdiction. Use when reasoning about IP, copyright, patents, trademarks, licensing, or protecting creative/technical work.
category: engineering
keywords_vi: luật sở hữu trí tuệ intellectual property, bản quyền copyright, bằng sáng chế patent, nhãn hiệu trademark, bí mật thương mại trade secret, xâm phạm infringement, cấp phép licensing mã nguồn mở, sử dụng hợp lý fair use
---

# Intellectual Property Law

Intellectual property (IP) law grants creators and inventors rights over intangible creations — ideas made concrete. There are four main types, each protecting something different. Principles are broadly international (via treaties) but **details vary by country** — this is a general educational overview, **not legal advice**.

## Copyright

- **Protects**: original *creative expression* fixed in a tangible form — writing, code, music, art, film, photos. It protects the *expression*, **not the underlying idea, facts, or method** (idea-expression dichotomy).
- **Arises**: automatically on creation/fixation — no registration required (though registration helps enforcement in some countries).
- **Duration**: long — commonly the author's life + 70 years (varies).
- **Rights**: reproduce, distribute, adapt, perform, display; and moral rights (attribution/integrity) in many countries.
- **Infringement**: copying a substantial part of the protected expression. **Fair use / fair dealing** allows limited use (criticism, comment, education, parody, research) judged by factors like purpose, amount, and market effect — a flexible, fact-specific defense, not a blanket right.

Software source code is copyrightable — the basis of software licensing.

## Patents

- **Protects**: *inventions* — new, useful, and **non-obvious** technical solutions (processes, machines, compositions).
- **Arises**: only by **application and grant** (a rigorous, expensive examination) — not automatic.
- **Duration**: ~20 years from filing, then it enters the public domain.
- **Trade-off**: you get a temporary monopoly in exchange for **publicly disclosing** how the invention works (teaching the field).
- **Requirements**: novelty (not previously disclosed — beware public disclosure before filing), inventive step, industrial applicability. Abstract ideas, laws of nature, and (in many places) pure software/algorithms per se are hard/impossible to patent.

## Trademarks

- **Protects**: brand identifiers — names, logos, slogans, sounds — that *distinguish* goods/services and prevent consumer confusion.
- **Arises**: through use and/or registration; **can last indefinitely** if renewed and used.
- **Infringement**: use likely to confuse consumers about source. Distinct from copyright — it protects brand *identity*, not creative content.

## Trade Secrets

- **Protects**: confidential business information with commercial value (formulas, processes, customer lists — e.g. the Coca-Cola recipe).
- **Arises**: by keeping it secret (reasonable security measures + NDAs) — **no registration, no expiry** as long as it stays secret.
- **Risk**: no protection against independent discovery or reverse engineering; once out, it's gone.

## Licensing

IP owners can **license** (permit) others to use their rights while retaining ownership:
- **Exclusive vs non-exclusive**, territory, field-of-use, royalties, term.
- **Open-source software licenses** are copyright licenses with conditions:
  - **Permissive** (MIT, Apache-2.0, BSD) — use freely, keep the notice; minimal restrictions.
  - **Copyleft** (GPL) — derivative works must also be open under the same license ("viral"); a real constraint for commercial use.
  - Apache-2.0 also grants patent rights. **Always check a dependency's license** before using it (see dependency licensing).
- **Assignment** transfers ownership outright (vs licensing, which permits use).

## Practical Takeaways

- Different work → different protection: creative expression → **copyright**; inventions → **patent**; brands → **trademark**; secrets → **trade secret** (and they can overlap).
- Copyright and trade secret are automatic; patents and trademarks benefit from/require registration.
- **Employment/contract** terms often assign IP created at work to the employer — check agreements.
- For anything of real value, consult an IP lawyer — jurisdiction, timing (patent novelty!), and drafting decide outcomes.

IP law is a toolkit of four protections for intangible creations — knowing *which* applies, how the right arises, how long it lasts, and how licensing works lets creators and builders protect their work and safely use others'.
