# Ghi công nguồn — Thư viện Kỹ năng nội bộ

Các file `.md` trong thư mục này là bản tuyển chọn/rút gọn từ các repo Claude Skills công khai
bên dưới, dùng làm tài liệu tham khảo tiêm vào chế độ ⚙️ Lumina Forge khi phù hợp. Tất cả đều
mã nguồn mở giấy phép cho phép tái sử dụng (yêu cầu ghi công tác giả gốc).

| Repo nguồn | Tác giả | Giấy phép | Link |
|---|---|---|---|
| `agent-skills` | Addy Osmani | MIT | https://github.com/addyosmani/agent-skills |
| `skills` (chính thức) | Anthropic | Apache-2.0 | https://github.com/anthropics/skills |
| `superpowers` (6 skill: brainstorming, systematic-debugging, writing-plans, receiving-code-review, requesting-code-review, verification-before-completion) | Jesse Vincent | MIT | https://github.com/obra/superpowers |
| `taste-skill` | Leonxlnx | MIT | https://github.com/Leonxlnx/taste-skill |
| `ui-ux-pro-max-skill` | Next Level Builder | MIT | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill |
| `acquire-codebase-knowledge` | không rõ (chỉ nhận được thư mục skill lẻ, không có repo gốc) | MIT (tự khai trong frontmatter `SKILL.md`) | không rõ |
| `dashmotion` | Mars (csthink) | MIT | https://github.com/csthink/dashmotion |
| `mattpocock/skills` (7 skill: domain-modeling, codebase-design, resolving-merge-conflicts, diagnosing-bugs, prototype, grilling, teaching-framework) | Matt Pocock | MIT | https://github.com/mattpocock/skills |
| `uucz/moyu` (1 skill: anti-over-engineering) | uucz | MIT | https://github.com/uucz/moyu |
| `Agent-Skills-for-Context-Engineering` (8 skill: context-degradation, multi-agent-patterns, memory-systems, tool-design, context-fundamentals, context-compression, context-optimization, evaluation) | muratcankoylan + contributors | MIT | https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering |
| `ehmo/platform-design-skills` (2 skill: platform-design-web, platform-design-android) | ehmo | MIT | https://github.com/ehmo/platform-design-skills |
| `zscole/model-hierarchy-skill` (1 skill: model-hierarchy) | zscole | MIT | https://github.com/zscole/model-hierarchy-skill |
| `massimodeluisa/recursive-decomposition-skill` (1 skill: recursive-decomposition) | massimodeluisa | MIT | https://github.com/massimodeluisa/recursive-decomposition-skill |
| `mcollina/skills` (7 skill: documentation-diataxis, typescript-magician, oauth-security, eslint-neostandard-linting, nodejs-typescript, nodejs-core, fastify-best-practices) | Matteo Collina | MIT | https://github.com/mcollina/skills |
| `mattpocock/skills` — bổ sung (vertical-slice-tickets từ folder `to-tickets`; các folder còn lại như research/triage/wayfinder/handoff phụ thuộc issue-tracker/background-agent thật nên KHÔNG lấy) | Matt Pocock | MIT | https://github.com/mattpocock/skills |
| `antonbabenko/terraform-skill` (1 skill: terraform-and-opentofu — phần terraform-ls/MCP chỉ là tùy chọn, đã lược bỏ, giữ phần tư vấn thuần) | Anton Babenko | Apache-2.0 | https://github.com/antonbabenko/terraform-skill |
| `GanyuanRan/Aegis` (3 skill: first-principles-review, goal-framing, communicating-concisely — phần lớn repo là fork superpowers đã có sẵn, chỉ lấy 3 skill phương pháp riêng biệt) | GanyuanRan | MIT | https://github.com/GanyuanRan/Aegis |
| `dembrandt/dembrandt-skills` (31 skill: nielsen-usability-heuristics, information-architecture, modular-scale-typography, gestalt-ui-organisation, loading-states-perceived-performance, status-colors-and-errors, form-design, micro-interactions, responsive-paradigms, notifications-and-recovery, data-display-and-selection, wcag-accessibility, button-states, color-mode-and-theme, elevation-and-depth, modal-and-overlay-patterns, tab-navigation, scroll-areas, sticky-and-fixed-elements, ui-density, semantic-html-and-seo, visual-emphasis-and-hierarchy, user-flows-and-guided-paths, layout-paradigms-and-consistency, component-family-consistency, real-world-metaphors, algorithmic-color-palette, brand-visual-language, performance-web-vitals, motion-and-storytelling, coordinated-data-views, authentic-product-representation, global-toolbar-controls, repeated-component-alignment, ui-context-and-scope, operational-expert-tool-ui — repo có 40 skill, mới tuyển 36; 4 folder còn lại `extract-design`/`generate-ui-from-brand`/`dembrandt`/`domain-expert-configuration` KHÔNG đưa vào vì là CLI/MCP tool orchestration, không phải nội dung tư vấn thuần văn bản) | dembrandt | MIT | https://github.com/dembrandt/dembrandt-skills |
| `BehiSecc/VibeSec-Skill` (1 skill: vibesec) | BehiSecc | Apache-2.0 | https://github.com/BehiSecc/VibeSec-Skill |
| `meodai/skill.color-expert` (1 skill: color-expert) | meodai | **CC BY 4.0** (khác MIT/Apache — yêu cầu ghi công, cho phép dùng thương mại) | https://github.com/meodai/skill.color-expert |
| `MohamedAbdallah-14/unslop` (1 skill: unslop) | MohamedAbdallah-14 | MIT | https://github.com/MohamedAbdallah-14/unslop |
| `AvdLee/SwiftUI-Agent-Skill` (1 skill: swiftui-expert) | Antoine van der Lee | MIT | https://github.com/AvdLee/SwiftUI-Agent-Skill |
| `greensock/gsap-skills` (2 skill: gsap-animation, gsap-scrolltrigger — chưng cất từ 8 skill gốc thành 2 bản súc tích) | GreenSock | MIT | https://github.com/greensock/gsap-skills |
| `ethos-link/rails-conventions` (1 skill: rails-conventions) | Ethos Link | MIT | https://github.com/ethos-link/rails-conventions |
| `smixs/creative-director-skill` (1 skill: creative-director — chỉ lấy phương pháp 5 pha + kỹ thuật ideation, không lấy thư viện 569 case) | smixs | MIT | https://github.com/smixs/creative-director-skill |
| `robzolkos/skill-rails-upgrade` (1 skill: rails-upgrade — lõi phương pháp; phần gọi `gh`/API chỉ là tùy chọn) | robzolkos | MIT | https://github.com/robzolkos/skill-rails-upgrade |
| `BrianRWagner/ai-marketing-skills` (4 skill: marketing-principles, positioning-basics, homepage-audit, cold-outreach-sequence — chỉ lấy skill methodology thuần; các skill phụ thuộc API LinkedIn/Reddit/YouTube như last30days/reddit-insights KHÔNG lấy) | Brian Wagner | MIT | https://github.com/BrianRWagner/ai-marketing-skills |
| `testdino-hq/playwright-skill` (1 skill: playwright-testing — tuyển tập 70 pattern, chưng cất phần cốt lõi) | testdino-hq | MIT | https://github.com/testdino-hq/playwright-skill |
| `CosmoBlk/email-marketing-bible` (1 skill: email-marketing — lấy lõi tư vấn 19 chương, bỏ phần connector MCP Klaviyo/Resend/Mailchimp) | CosmoBlk | MIT | https://github.com/CosmoBlk/email-marketing-bible |
| `Paramchoudhary/ResumeSkills` (4 skill: resume-ats-optimizer, resume-bullet-writer, interview-prep, salary-negotiation — chỉ lấy skill methodology thuần; các skill cần dữ liệu LinkedIn/thị trường lương thời gian thực KHÔNG lấy) | Param Choudhary | MIT | https://github.com/Paramchoudhary/ResumeSkills |
| `EveryInc/charlie-cfo-skill` (1 skill: bootstrapped-cfo) | Every Inc | MIT | https://github.com/EveryInc/charlie-cfo-skill |
| `ognjengt/founder-skills` (2 skill: prd-writing từ `prd-generator`, sop-writing từ `sop-creator` — chỉ lấy lõi phương pháp, bỏ bước `md-to-pdf`/đọc file context/tool) | ognjengt | MIT | https://github.com/ognjengt/founder-skills |


---

**Toàn bộ kỹ năng còn lại trong thư mục này (phần lớn thư viện — các chủ đề how-X, thuật toán,
backend/DevOps/hạ tầng, frontend, sản phẩm/kinh doanh, AI/ML, bảo mật...) là NỘI DUNG GỐC do LUMINA
tự biên soạn từ kiến thức ngành phổ thông (giáo trình, chuẩn RFC/IEEE, thông lệ kỹ thuật).** Đây là
tri thức/nguyên lý phổ quát không thuộc bản quyền của riêng ai, được diễn đạt bằng lời của LUMINA —
KHÔNG sao chép câu chữ từ nguồn nào, nên không cần và không kèm ghi công bên thứ ba.

LUMINA chủ động **KHÔNG** đưa vào bất kỳ nội dung nào từ nguồn có giấy phép hạn chế (GPL, phi thương
mại/NC, hay tài liệu có bản quyền doanh nghiệp) — chỉ giữ lại phần bảng trên là các skill chuyển thể
từ nguồn mã nguồn mở giấy phép cho phép (MIT/Apache-2.0/CC-BY), theo đúng điều khoản ghi công của
các giấy phép đó.
