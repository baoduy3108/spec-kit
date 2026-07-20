---
name: data-anonymization-and-pseudonymization
description: Anonymization vs pseudonymization — removing or replacing identifiers so data can be used more freely, why true anonymization is hard (re-identification, linkage), and techniques like masking, generalization, k-anonymity, and differential privacy. Use to anonymize data for analytics, understand pseudonymization vs anonymization, prevent re-identification, or de-identify datasets.
category: engineering
keywords_vi: ẩn danh và bí danh hóa dữ liệu, anonymization pseudonymization, loại bỏ hay thay định danh, tái định danh re-identification khó, masking generalization k-anonymity, differential privacy
---

# Data Anonymization and Pseudonymization

De-identifying data — removing or obscuring who it's about — lets you use it for analytics, testing, and sharing with less privacy risk. But there's a crucial distinction between **pseudonymization** (reversible, still personal data) and **anonymization** (irreversible, no longer personal data), and **true anonymization is much harder than it looks** because of re-identification (see gdpr-and-data-privacy, pii-handling-and-minimization).

## Pseudonymization vs Anonymization (the key distinction)

- **Pseudonymization** — replace direct identifiers with **pseudonyms** (tokens, hashed IDs), keeping a **separate mapping** to reverse it if needed. It reduces risk and links, but the data is **still personal data** (it *can* be re-identified with the key), so **privacy law still applies**. Useful internally (isolate the mapping, work with pseudonyms elsewhere — like tokenization).
- **Anonymization** — transform data so individuals **can no longer be identified**, **irreversibly**, by anyone. Truly anonymized data falls **outside** privacy law (it's no longer personal). But achieving genuine, irreversible anonymization is **hard** — much "anonymized" data isn't.

## Why True Anonymization Is Hard: Re-identification

Just removing names/emails is **not** anonymization. **Re-identification attacks** combine the remaining "quasi-identifiers" to single people out:
- **Quasi-identifiers** — fields like ZIP code + birthdate + gender can **uniquely identify** a large fraction of people even with names removed (a famous result: ~87% of Americans by ZIP+DOB+sex).
- **Linkage attacks** — cross-reference the "anonymized" dataset with **another** dataset (voter rolls, public records, a data breach) to re-attach identities (the classic Netflix Prize and AOL search-log re-identifications).
- **Rare/outlier records** — unusual combinations (a rare job in a small town) identify individuals.
So dropping obvious identifiers leaves data that's often re-identifiable — a common, dangerous mistake.

## Techniques

- **Masking / redaction** — hide or replace values (show last 4 digits).
- **Generalization** — reduce precision: exact age → age range, full address → city, timestamp → date. Fewer unique combinations.
- **Suppression** — remove rare/outlier records or fields that identify.
- **k-anonymity** — ensure every record is **indistinguishable from at least k−1 others** on quasi-identifiers (no group smaller than k). Guards against singling out — but has weaknesses (**l-diversity**, **t-closeness** address attribute disclosure within a group).
- **Perturbation / noise** — add random noise to values.
- **Differential privacy** — a rigorous, mathematical guarantee: add calibrated noise so that including or excluding **any one person** barely changes the output — bounding what an attacker can learn about any individual. The strongest modern approach (used by Apple, the US Census), at some accuracy cost.
- **Synthetic data** — generate artificial data with similar statistical properties, containing no real individuals.

## Design Guidance

- **Know which you're doing** — pseudonymization (reversible, still regulated) vs anonymization (irreversible, unregulated). Don't call pseudonymized data "anonymous."
- **Removing names isn't enough** — address **quasi-identifiers** (dates, locations, rare attributes) that enable linkage.
- **Generalize and suppress** quasi-identifiers; aim for k-anonymity or stronger.
- **Consider differential privacy** for releasing statistics/aggregates with a real guarantee.
- **Isolate the re-identification key** for pseudonymized data (tight access).
- **Assess re-identification risk** against realistic auxiliary data before sharing/releasing.

## Pitfalls (in understanding/using)

- Calling data "anonymized" when only **names were removed** → still re-identifiable via quasi-identifiers.
- Ignoring **linkage attacks** → cross-referencing external datasets re-identifies people.
- Treating **pseudonymized** data as **anonymous** → it's still personal data; law still applies.
- **Hashing** an identifier and thinking it's anonymous → a hash of an email is still a stable, linkable pseudonym (and often brute-forceable).
- Releasing **rare/outlier** records → outliers are trivially re-identified.
- Over-trusting **k-anonymity** alone → vulnerable to attribute-disclosure (needs l-diversity/t-closeness).
- Anonymizing so aggressively the data is **useless**, or so weakly it's re-identifiable — it's a utility-vs-privacy trade-off to tune.
