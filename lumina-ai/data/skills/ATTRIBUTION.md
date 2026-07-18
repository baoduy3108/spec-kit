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

**Skill do LUMINA tự biên soạn (không sao chép từ repo cụ thể):** một số năng lực lõi mà mọi
coding agent mạnh đều cần nhưng các repo công khai còn thiếu/hoặc chỉ có bản phụ thuộc tool — được
LUMINA **tự viết theo thông lệ ngành chuẩn** (không phải bản sao của bất kỳ repo nào, nên không kèm
giấy phép bên thứ ba): `prompt-engineering`, `sql-query-optimization`, `regular-expressions`,
`docker-containers`, `linux-command-line`, `database-schema-design`, `system-design-fundamentals`,
`concurrency-and-parallelism`, `data-analysis-pandas`, `algorithms-and-complexity`, `kubernetes-basics`,
`networking-fundamentals`, `authentication-and-authorization`, `caching-strategies`,
`message-queues-and-events`, `python-best-practices`, `react-patterns`, `css-layout`,
`functional-programming`, `object-oriented-design`, `datetime-and-timezones`, `encoding-and-unicode`,
`git-advanced`, `graphql-design`, `microservices-and-boundaries`, `dependency-management`,
`feature-flags-and-rollouts`, `nosql-data-modeling`, `memory-management`, `websockets-and-realtime`,
`i18n-and-localization`, `incident-response`, `mvp-and-validation`, `user-research`, `ab-testing`,
`testing-strategy`.
Nội dung là kiến thức/thông lệ phổ biến (không thuộc phạm vi bản quyền của riêng ai), diễn đạt bằng
lời của LUMINA.

**Nhóm skill "cơ chế X hoạt động bên trong" (how-X-works):** lấy cảm hứng từ danh sách chủ đề
`codecrafters-io/build-your-own-x` (giấy phép **CC0 1.0 — public domain**, tức miễn trừ mọi bản
quyền, dùng tự do không cần ghi công) — LUMINA **tự viết bản giải thích gốc** cho từng chủ đề (không
sao chép các bài hướng dẫn bên thứ ba được liên kết trong danh sách đó): `how-git-works-internally`,
`how-databases-work`, `how-docker-containers-work`, `how-web-servers-work`, `how-browsers-work`,
`how-compilers-work`, `how-shells-work`, `how-regex-engines-work`, `how-blockchain-works`,
`how-neural-networks-work`, `how-operating-systems-work`, `how-llms-work`, `how-search-engines-work`,
`how-cpus-work`, `how-3d-rendering-works`, `how-game-engines-work`, `how-frontend-frameworks-work`,
`how-memory-allocators-work`, `how-emulators-work`, `how-distributed-consensus-works`,
`how-text-editors-work`, `how-bittorrent-works`, `how-physics-engines-work` (và các how-X-works khác).
Nội dung là kiến thức phổ thông về nguyên lý hệ thống, diễn đạt bằng lời của LUMINA.

**Nhóm skill chạy/serve LLM local** (`running-llms-locally`, `llm-inference-optimization`): LUMINA tự
biên soạn theo thông lệ ngành, lấy bối cảnh từ các dự án mã nguồn mở `ollama/ollama`,
`ggml-org/llama.cpp`, `vllm-project/vllm`, `mudler/LocalAI`, `open-webui/open-webui`, `janhq/jan`
(đây là PHẦN MỀM chạy LLM, không phải repo skill — không có SKILL.md để trích; chỉ dùng làm bối
cảnh kiến thức, nội dung do LUMINA tự viết).

**Nhóm mẫu thuật toán** (`sliding-window-pattern`, `two-pointers-pattern`, `binary-search-patterns`,
`backtracking-pattern`, `dynamic-programming-patterns`, `greedy-algorithms`, `union-find`,
`monotonic-stack`, `graph-traversal`, `shortest-paths`, `topological-sort`, `trie-prefix-tree`,
`heap-priority-queue`, `bit-manipulation`): LUMINA tự biên soạn từ kiến thức khoa học máy tính chuẩn
(người dùng nhắc tới repo `labuladong/fucking-algorithm` như gợi ý chủ đề — repo đó có giấy phép hạn
chế/phi thương mại nên KHÔNG sao chép; các mẫu thuật toán là kiến thức phổ quát, không thuộc bản
quyền của riêng ai, được diễn đạt bằng lời của LUMINA).

**Nhóm backend/DevOps/kiến trúc** (`error-handling-patterns`, `api-pagination-and-filtering`,
`rate-limiting-algorithms`, `webhooks-design`, `idempotency`, `retries-and-resilience`,
`distributed-tracing`, `secrets-management`, `load-testing`, `chaos-engineering`,
`event-sourcing-cqrs`, `clean-architecture`, `code-smells`, `technical-debt`): LUMINA tự biên soạn
theo thông lệ ngành (kiến thức phổ thông, không sao chép repo cụ thể).

**Nhóm mạng/crypto (how-X-works) + AI + thống kê**: `how-tcp-works`, `how-dns-works`,
`how-https-tls-works`, `how-hash-tables-work`, `how-cdns-work`, `how-load-balancers-work`,
`how-compression-works`, `how-public-key-crypto-works`, `how-jwt-works`, `rag-fundamentals`,
`vector-embeddings`, `fine-tuning-vs-rag-vs-prompting`, `statistics-fundamentals`,
`probability-and-bayes`, `data-cleaning` — LUMINA tự biên soạn (kiến thức phổ thông).

**Nhóm ML/how-X + kỹ năng chuyên nghiệp/tư duy + data**: `how-async-await-works`,
`machine-learning-basics`, `how-recommendation-systems-work`, `time-management-and-prioritization`,
`decision-making-frameworks`, `giving-and-receiving-feedback`, `effective-meetings`,
`writing-effective-emails`, `presentations-and-storytelling`, `negotiation-basics`,
`learning-how-to-learn`, `critical-thinking`, `sql-joins-explained`, `data-visualization-principles`
— LUMINA tự biên soạn (kiến thức/thông lệ phổ thông).

**Nhóm how-X hệ thống/bảo mật + AI + kỹ năng đời sống**: `how-http-works`,
`how-cookies-and-sessions-work`, `how-vpns-work`, `how-2fa-works`, `how-payment-processing-works`,
`how-video-streaming-works`, `how-webassembly-works`, `how-bloom-filters-work`,
`how-consistent-hashing-works`, `nlp-basics`, `computer-vision-basics`, `mlops-basics`,
`copywriting-basics`, `habit-formation`, `goal-setting-okrs`, `personal-finance-basics` — LUMINA tự
biên soạn (kiến thức phổ thông; `personal-finance-basics` chỉ mang tính giáo dục, không phải tư vấn
tài chính cá nhân hóa).

**Nhóm how-X + AI/data + kỹ năng (đợt cán mốc 300)**: `how-qr-codes-work`, `how-gps-works`,
`how-machine-translation-works`, `how-speech-recognition-works`, `how-image-formats-work`,
`how-package-managers-work`, `how-serverless-works`, `how-face-recognition-works`,
`how-spam-filters-work`, `reinforcement-learning-basics`, `data-pipelines-etl`, `graph-databases`,
`stream-processing`, `feature-engineering`, `conflict-resolution`, `delegation`,
`brainstorming-techniques`, `mentoring-and-coaching`, `emotional-intelligence`, `note-taking-systems`
— LUMINA tự biên soạn (kiến thức/thông lệ phổ thông).

**Lưu ý về các skill lấy qua công cụ tải trang web** (domain-modeling → oauth-security, trừ
dashmotion đã ghi riêng ở trên): nội dung được lấy qua công cụ tải trang web (không tải trực tiếp
file gốc như các skill trong 5 repo đầu tiên) — tuy đã yêu cầu giữ nguyên văn và đối chiếu, bản
lưu trong LUMINA có thể là bản tóm lược/diễn đạt lại rất sát nội dung gốc chứ không đảm bảo khớp
byte-by-byte 100% với `SKILL.md` gốc trên GitHub. Không tác động tới độ chính xác của phương pháp
luận — chỉ khác về hình thức khớp nguyên văn.

Skill `recursive-decomposition` có thêm 1 đoạn được viết riêng (không thuộc bản gốc) làm rõ cách
áp dụng khi LUMINA không có công cụ grep/glob/wc thật.

Skill `acquire-codebase-knowledge` giả định chạy `scripts/scan.py` + ghi 7 file thật vào
`docs/codebase/` — LUMINA không làm được 2 việc này (không sandbox chạy code, không ghi file thật
lên hệ thống người dùng). Đã tận dụng khung 7 mục (STACK/STRUCTURE/ARCHITECTURE/CONVENTIONS/
INTEGRATIONS/TESTING/CONCERNS) làm cấu trúc trình bày NGAY TRONG CHAT dựa trên code người dùng
dán/đính kèm — không chạy script, không ghi file thật (xem chỉ thị caveat mạnh hơn trong
`build_skill_context()`).

Chỉ các skill THUẦN VĂN BẢN/PHƯƠNG PHÁP LUẬN (không cần chạy tool/MCP/browser/code-execution
thật) được tuyển vào — LUMINA là REST API chat, không có hạ tầng thực thi công cụ như một coding
agent thật (vd Claude Code). Nội dung gốc có thể đã bị cắt bớt (~12.000 ký tự) nếu quá dài. Mỗi
file có thêm trường `keywords_vi` (từ khóa kích hoạt tiếng Việt, tự viết khi tuyển chọn — không
thuộc nội dung gốc) để so khớp với tin nhắn người dùng. Xem `app/skills.py` để biết cách các
file này được nạp và so khớp.

Skill `dashmotion` (sơ đồ kỹ thuật động dạng HTML/SVG tự chứa) đã được **dịch + thích nghi sang
tiếng Việt** (không giữ nguyên văn tiếng Anh như các skill khác) vì bản gốc ưu tiên chạy
`scripts/layout.py` (Python) để tính bố cục — LUMINA không chạy được script, nên bản trong LUMINA
chỉ giữ lại "cách tính tay" (hand-computed fallback) mà chính tài liệu gốc đã mô tả, diễn đạt lại
rõ ràng hơn để LUMINA áp dụng đúng.

Repo `NeoLabHQ/context-engineering-kit` (chứa các plugin `ddd`, `kaizen`, `write-concisely`...) đã
được xem xét nhưng KHÔNG đưa vào — dùng giấy phép **GPLv3** (copyleft mạnh, khác hẳn MIT/Apache-2.0
đã dùng cho toàn bộ skill khác), không phù hợp trộn vào dự án có mục đích thương mại.

Repo `raintree-technology/apple-hig-skills` đã xem xét nhưng KHÔNG đưa vào — nội dung Apple Human
Interface Guidelines thật thuộc **bản quyền © Apple Inc.** (chỉ phần tooling/cấu trúc repo là MIT),
không được phép sao chép nội dung. Repo `K-Dense-AI/claude-scientific-skills` và
`mukul975/Anthropic-Cybersecurity-Skills` đã xem xét nhưng KHÔNG đưa vào — phần lớn skill cần cài
đặt công cụ/thư viện chuyên ngành thật (RDKit, Volatility3, Splunk, BloodHound...) và thuộc lĩnh
vực quá chuyên sâu/hẹp (khoa học sinh học, pháp y số) so với đối tượng người dùng LUMINA.

Repo `Digidai/product-manager-skills` đã xem xét nhưng KHÔNG đưa vào — dùng giấy phép
**CC BY-NC-SA 4.0** (cấm dùng thương mại), không phù hợp vì LUMINA có gói trả phí. Tương tự,
`lawvable/awesome-legal-skills` dùng **CC BY-NC-ND 4.0** (cấm thương mại + cấm tạo bản phái sinh)
— vi phạm cả 2 điều kiện của LUMINA (có gói trả phí + phải diễn đạt lại/thích nghi nội dung), nên
KHÔNG đưa vào. Repo
`hanfang/claude-memory-skill` đã xem xét nhưng KHÔNG đưa vào — cần agent nền chạy song song +
ghi file vào `~/.claude/memory/` thật, LUMINA không có hạ tầng này (đã có `memory-systems` ở trên
làm kiến thức khái niệm tương đương, không cần bản tool-dependent này).

**`ruvnet/ruflo`** (MIT) — chủ yếu là MCP/CLI orchestration tool — nhưng phần **phương pháp luận**
tách được: đã chưng cất `sparc-methodology` (quy trình 5 pha) + `goap-planning` (mẫu AI game/agent
kinh điển) thành văn bản gốc LUMINA, bỏ phần tool. **`donchitos/Claude-Code-Game-Studios`** (MIT) —
hybrid tool + lý thuyết game design; tách phần LÝ THUYẾT (MDA framework, Flow, Self-Determination
Theory — khung học thuật công khai) thành `game-design-fundamentals`, `game-feel-and-juice`,
`game-balancing`. **`harry0703/MoneyPrinterTurbo`** (MIT) là ỨNG DỤNG tạo video (phụ thuộc API trả
phí), không phải repo skill — chỉ lấy bối cảnh cho `ai-short-video-generation`. **`graphify-labs/
graphify`** là tool chạy (code→knowledge graph); khái niệm đã có ở `explaining-code-in-context`/
`codebase-onboarding-guide` nên KHÔNG thêm. `how-email-works`, `how-webrtc-works`, `how-captcha-works`,
`how-single-sign-on-works` do LUMINA tự biên soạn (kiến thức phổ thông).

**Nhóm skill framework** (`django-patterns`, `angular-patterns`, `dotnet-csharp-patterns`,
`spring-boot-patterns`, `vue-patterns`, `flutter-patterns`, `react-native-patterns`,
`kotlin-android`, `laravel-php`): LUMINA tự biên soạn theo thông lệ/tài liệu chính thức của từng
framework (lấy `affaan-m/ECC` — MIT, kho 278 skill — làm gợi ý chủ đề; nội dung là best-practice phổ
biến của framework, không sao chép). Các skill trùng với thư viện đã có (api-design, error-handling,
docker, e2e-testing, ADR, design-system, codebase-onboarding…) trong ECC KHÔNG thêm lại.

Các repo `gstack`, `codebase-memory-mcp` (DeusData), `ruflo` (ruvnet),
`serena` (oraios), `cocoindex-code` đã được xem xét nhưng KHÔNG đưa vào — đều là MCP server/CLI/
agent-orchestration framework thật, đòi hỏi tiến trình chạy nền/vector DB/browser control/Language
Server Protocol mà LUMINA không có. `serena` chạy LSP server thật cho từng ngôn ngữ (0 file
SKILL.md — không có văn bản nào để chưng cất). `cocoindex-code` chỉ có 1 SKILL.md nhưng toàn bộ nội
dung là hướng dẫn gọi CLI `ccc` (search/index/init) dựa trên semantic search + vector embeddings
thật — không tách được thành nội dung tư vấn thuần văn bản. `gstack` có nhiều SKILL.md nhưng đều
ràng buộc chặt với CLI `gstack` + thiết bị thật (StateServer/screenshot) và tham chiếu Apple HIG
(bản quyền), lại không kèm LICENSE — phần lõi tư vấn quá mỏng để tách.

**`Lum1104/Understand-Anything`** ban đầu bị xếp vào nhóm MCP (các skill gốc cần file
`.ua/knowledge-graph.json` do lệnh `/understand` sinh ra + ghi file thật) — nhưng **MÔ HÌNH TƯ DUY**
của nó (giải thích code theo tầng/liên kết/luồng; lộ trình onboarding có guided tour) thì tách được.
Repo **không kèm LICENSE rõ ràng**, nên **KHÔNG chép nguyên văn** — chỉ **chưng cất phương pháp/ý
tưởng thành văn bản gốc tiếng Anh của LUMINA** (ý tưởng/phương pháp không thuộc phạm vi bản quyền,
chỉ cách diễn đạt cụ thể mới thuộc), bỏ hoàn toàn phần đọc/ghi file JSON. Đã rút ra 2 skill:
`explaining-code-in-context`, `codebase-onboarding-guide` (khác góc với `acquire-codebase-knowledge`
đã có: một cái giải thích SÂU 1 thành phần, một cái làm LỘ TRÌNH cho người mới). Link:
https://github.com/Lum1104/Understand-Anything

**Nhóm video/tạo ảnh AI đã rà nhưng KHÔNG đưa vào** (từ danh sách `awesome-agent-skills`): hầu hết
skill "tạo ảnh"/"edit video" trong danh sách công khai (fal.ai, MiniMax, OpenAI Sora/imagegen,
Venice.ai, NVIDIA VSS, Remotion, video-db, hand-drawn-diagrams...) đều gọi tới **API trả phí của
bên thứ ba cụ thể** (cần API key + tích hợp HTTP riêng cho từng dịch vụ) — khác với nhóm MCP/CLI
đã loại ở trên, đây là loại phụ thuộc "dịch vụ ngoài trả phí" mà LUMINA không có key/tích hợp.
LUMINA đã có sẵn tính năng vẽ ảnh (Pollinations/DALL-E) và lồng tiếng/phụ đề video (Gemini) — xem
README — không cần các skill này. Ngoại lệ duy nhất tìm được là `dashmotion` (sinh HTML/SVG tự
chứa, không gọi API ngoài) — đã đưa vào. Đã rà thêm các skill nhắc tới "Codex" (agent CLI khác)
trong danh sách — toàn bộ đều là tích hợp công cụ/API thật cụ thể (LinkedIn, VMware, dữ liệu
chứng khoán...), không có skill nào mô tả "năng lực chung của một coding agent" tách biệt được
thành nội dung văn bản mới (phần này đã được `agent-skills`/`superpowers` bao phủ đầy đủ).
