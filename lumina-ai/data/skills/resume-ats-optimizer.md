---
name: resume-ats-optimizer
description: Optimize a resume to pass Applicant Tracking Systems — ATS-safe formatting (no tables/columns/headers/images), standard section headers, keyword extraction from the job description, match-score calculation, and natural keyword placement without stuffing. Use when a resume isn't getting interviews or needs tailoring to a specific job posting.
category: design
keywords_vi: ats, qua ats, cv không qua vòng lọc, từ khóa cv, loại tự động, cv bị loại, viết cv qua máy lọc, cv không được phỏng vấn
---

# Resume ATS Optimizer

~75% of resumes are filtered by Applicant Tracking Systems before any human reads them. Optimize for the parser first, then keep it readable for people.

## ATS-Safe Formatting

- **File**: text-based `.docx` or `.pdf` (never a scanned image); name it `First_Last_Resume.pdf`.
- **No** tables, columns, text boxes, headers/footers, images, charts, or icons — parsers mangle them. Put contact info in the body, not the header.
- Standard fonts (Arial, Calibri, Georgia, Times), 10–12pt body; consistent `MM/YYYY` dates; standard bullets.
- **Standard section headers** the ATS recognizes: "Professional Experience" / "Work Experience", "Education", "Skills", "Summary" — not "My Journey" or "What I Bring."

## Keyword Optimization

1. **Extract JD keywords** in three buckets: hard/technical skills (Python, Salesforce, PMP, Agile), soft skills (leadership, stakeholder management), and industry terms (SaaS, B2B, ARR).
2. **Match analysis** — for each required keyword, check exact phrase, variations, frequency, and location in the resume.
3. **Match score** = (keywords matched / total required) × 100. **Target 80%+.**
4. **Placement priority**: Professional Summary (5–8 top keywords, natural sentence) → Skills section (explicit, exact JD phrasing) → Experience bullets (woven into achievements).
5. **Density**: critical keywords 2–4×, important 1–2×; vary phrasing ("led team" / "team leadership"); **never keyword-stuff**.

## Common Failure Patterns

- Creative two-column layouts with graphics → single column, text-only.
- Unconventional section names → standard headers.
- Paraphrasing instead of the JD's exact terms ("making charts" vs "Data Visualization") → mirror the JD's terminology.
- Keyword stuffing ("Python, Python programming, Python expert…") → list once, then use naturally in bullets.

## Output: ATS Compatibility Report

Overall score /100 · file-format check · formatting issues found · keyword analysis (critical/important, found N× vs missing, with the JD's frequency) · current match score · **specific before/after edits** with exact placements · estimated new score. Every recommendation names *where* to add the keyword, not just "add keywords."
