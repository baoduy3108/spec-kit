/* ✦ LUMINA AI — frontend: đăng nhập Google, SSE streaming, render markdown */

(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const state = {
    config: null,
    user: null,
    plan: null,
    conversationId: null,
    streaming: false,
    attachedImages: [],   // data URL các ảnh đang đính kèm cho lượt tới
    attachedVideo: null,  // { name, dataUrl } — chỉ 1 video/lượt
    attachedFiles: [],    // [{ name, dataUrl }] — PDF/Word/Excel/txt, tối đa 3
    forceMode: null,      // null | "image" | "research" | "subtitle" | "agent" — nút ép chế độ
    projectId: null,      // project mà hội thoại mới sẽ gắn vào (mặt bàn đang mở); null = ngoài project
  };

  const PLAN_LABELS = { free: "Miễn phí", monthly: "Tháng", yearly: "Năm" };

  function formatVnd(n) {
    return n.toLocaleString("vi-VN") + "đ";
  }

  // ── Markdown renderer gọn nhẹ (không cần CDN) ─────────────────────────────
  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function inlineMd(s) {
    return s
      .replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`)
      // Ảnh ![alt](url) — phải xử lý TRƯỚC link để không bị nuốt nhầm
      .replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g,
        '<img src="$2" alt="$1" class="gen-img" loading="lazy">')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|\W)\*([^*\n]+)\*(?=\W|$)/g, "$1<em>$2</em>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }

  function unescapeHtml(s) {
    return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'").replace(/&amp;/g, "&");
  }

  // ── Sơ đồ Mermaid (nạp lười, chỉ khi có sơ đồ) ────────────────────────────
  let _mermaidPromise = null;
  function ensureMermaid() {
    if (_mermaidPromise) return _mermaidPromise;
    _mermaidPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "/static/vendor/mermaid.min.js";
      s.onload = () => {
        try {
          window.mermaid.initialize({
            startOnLoad: false, securityLevel: "strict", theme: "dark",
            fontFamily: '"Segoe UI", system-ui, sans-serif',
            themeVariables: {
              primaryColor: "#1c1f2b", primaryTextColor: "#e8eaf2", primaryBorderColor: "#8b7cf8",
              lineColor: "#4fc3f7", secondaryColor: "#14161f", tertiaryColor: "#14161f",
              background: "#0d0e14", mainBkg: "#1c1f2b", textColor: "#e8eaf2",
            },
          });
          resolve(window.mermaid);
        } catch (e) { reject(e); }
      };
      s.onerror = () => reject(new Error("Không tải được thư viện sơ đồ."));
      document.head.appendChild(s);
    });
    return _mermaidPromise;
  }

  let _mmId = 0;
  async function renderMermaidIn(root) {
    const blocks = root.querySelectorAll(".mermaid-diagram:not([data-rendered])");
    if (!blocks.length) return;
    let mermaid;
    try { mermaid = await ensureMermaid(); }
    catch { return; } // giữ nguyên phần mã dự phòng nếu không tải được
    for (const el of blocks) {
      el.setAttribute("data-rendered", "1");
      const code = decodeURIComponent(el.getAttribute("data-code") || "");
      try {
        // Mermaid v9 render() trả về chuỗi SVG; v10+ trả về Promise<{svg}> — hỗ trợ cả hai.
        const res = mermaid.render("mm-" + (++_mmId), code);
        const svg = (res && typeof res.then === "function") ? (await res).svg
                  : (typeof res === "string") ? res : (res && res.svg);
        if (!svg) throw new Error("empty svg");
        el.innerHTML = svg;
        const btn = document.createElement("button");
        btn.className = "mm-zoom"; btn.title = "Phóng to sơ đồ"; btn.textContent = "⤢";
        btn.addEventListener("click", () => openDiagramZoom(el.querySelector("svg")));
        el.appendChild(btn);
      } catch {
        el.setAttribute("data-error", "1"); // để lại <pre> mã gốc cho người dùng thấy
      }
    }
  }

  function openDiagramZoom(svg) {
    if (!svg) return;
    const overlay = document.createElement("div");
    overlay.className = "mm-overlay";
    const stage = document.createElement("div");
    stage.className = "mm-stage";
    stage.innerHTML = svg.outerHTML;
    overlay.appendChild(stage);
    let scale = 1, tx = 0, ty = 0, drag = false, px = 0, py = 0;
    const apply = () => { stage.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`; };
    overlay.addEventListener("wheel", (e) => {
      e.preventDefault();
      scale = Math.min(6, Math.max(0.4, scale * (e.deltaY < 0 ? 1.12 : 0.89))); apply();
    }, { passive: false });
    stage.addEventListener("pointerdown", (e) => { drag = true; px = e.clientX; py = e.clientY; stage.setPointerCapture(e.pointerId); });
    stage.addEventListener("pointermove", (e) => { if (!drag) return; tx += e.clientX - px; ty += e.clientY - py; px = e.clientX; py = e.clientY; apply(); });
    stage.addEventListener("pointerup", () => { drag = false; });
    overlay.addEventListener("click", (e) => { if (e.target === overlay) document.body.removeChild(overlay); });
    document.addEventListener("keydown", function esc(e) { if (e.key === "Escape" && overlay.parentNode) { document.body.removeChild(overlay); document.removeEventListener("keydown", esc); } });
    document.body.appendChild(overlay);
  }

  // ── Widget sống trong chat (nối data local, tự cập nhật) ──────────────────
  // Bộ não xuất khối ```lumina-widget chứa JSON {type,title,query,interval,...}.
  // Frontend render thành thẻ sống, poll endpoint LUMINA định kỳ. Thẻ tự dừng
  // khi bị gỡ khỏi DOM (chuyển hội thoại) → không rò rỉ timer.
  const WIDGET_MIN_INTERVAL = { news: 30, knowledge: 30, clock: 1 };

  function fmtClock(d) { return d.toLocaleTimeString("vi-VN"); }

  function widgetCountdownText(spec) {
    const target = new Date(spec.target || 0).getTime();
    if (!target) return "—";
    let diff = Math.floor((target - Date.now()) / 1000);
    const past = diff < 0; diff = Math.abs(diff);
    const d = Math.floor(diff / 86400), h = Math.floor((diff % 86400) / 3600),
          m = Math.floor((diff % 3600) / 60), s = diff % 60;
    const parts = [d ? d + "n" : "", (h < 10 ? "0" : "") + h + "g",
                   (m < 10 ? "0" : "") + m + "p", (s < 10 ? "0" : "") + s + "s"].filter(Boolean);
    return (past ? "đã qua " : "") + parts.join(" ");
  }

  async function widgetFetch(type, query) {
    const r = await fetch(`/api/widget/${type}?q=${encodeURIComponent(query || "")}`,
                          { credentials: "same-origin" });
    if (!r.ok) throw new Error("HTTP " + r.status);
    return r.json();
  }

  function renderWidgetBody(type, box, data, spec) {
    box.innerHTML = "";
    if (type === "news" || type === "knowledge") {
      const items = (data && data.items) || [];
      if (!items.length) { box.appendChild(el("div", "widget-empty", "Chưa có dữ liệu.")); return; }
      const list = el("div", "widget-list");
      for (const it of items) {
        const row = el("div", "widget-item");
        const title = it.title || it.topic || "";
        if (it.url) {
          const a = el("a", "widget-link", title);
          a.href = it.url; a.target = "_blank"; a.rel = "noopener";
          row.appendChild(a);
        } else { row.appendChild(el("span", "widget-link", title)); }
        if (it.summary) row.appendChild(el("div", "widget-sub", it.summary));
        list.appendChild(row);
      }
      box.appendChild(list);
    } else if (type === "clock") {
      const big = el("div", "widget-clock");
      big.textContent = spec.mode === "countdown" ? widgetCountdownText(spec) : fmtClock(new Date());
      box.appendChild(big);
      if (spec.mode === "countdown" && spec.target)
        box.appendChild(el("div", "widget-sub", "→ " + new Date(spec.target).toLocaleString("vi-VN")));
    }
  }
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  async function renderWidgetsIn(root) {
    const blocks = root.querySelectorAll(".lumina-widget:not([data-ready])");
    for (const card of blocks) {
      card.setAttribute("data-ready", "1");
      let spec;
      try { spec = JSON.parse(decodeURIComponent(card.getAttribute("data-spec") || "")); }
      catch { card.setAttribute("data-error", "1"); continue; }
      const type = (spec.type || "").toLowerCase();
      if (!WIDGET_MIN_INTERVAL[type]) { card.setAttribute("data-error", "1"); continue; }
      const interval = Math.max(WIDGET_MIN_INTERVAL[type], Number(spec.interval) || 0) * 1000;

      card.innerHTML = "";
      const head = el("div", "widget-head");
      head.appendChild(el("span", "widget-title", spec.title || ({ news: "Tin tức trực tiếp", knowledge: "Tri thức đã học", clock: spec.mode === "countdown" ? "Đếm ngược" : "Đồng hồ" }[type])));
      const meta = el("span", "widget-meta", "");
      const btnRefresh = el("button", "widget-btn", "⟳"); btnRefresh.title = "Làm mới";
      const btnPause = el("button", "widget-btn", "⏸"); btnPause.title = "Tạm dừng / chạy";
      const ctrls = el("div", "widget-ctrls"); ctrls.append(meta, btnRefresh, btnPause);
      head.appendChild(ctrls);
      const body = el("div", "widget-body");
      card.append(head, body);

      let paused = false, timer = null;
      const isClient = type === "clock";
      async function tick() {
        if (!document.body.contains(card)) { if (timer) clearInterval(timer); return; }  // tự dọn khi gỡ
        if (paused) return;
        try {
          if (isClient) { renderWidgetBody(type, body, null, spec); meta.textContent = ""; }
          else {
            const data = await widgetFetch(type, spec.query);
            renderWidgetBody(type, body, data, spec);
            meta.textContent = "cập nhật " + fmtClock(new Date());
          }
        } catch { meta.textContent = "lỗi tải — thử lại sau"; }
      }
      btnRefresh.addEventListener("click", tick);
      btnPause.addEventListener("click", () => { paused = !paused; btnPause.textContent = paused ? "▶" : "⏸"; if (!paused) tick(); });
      await tick();
      timer = setInterval(tick, interval);
    }
  }

  // ── Live preview: chạy HTML/JS bộ não tạo ra, trong iframe sandbox an toàn ──
  // sandbox KHÔNG có allow-same-origin → mã chạy ở origin riêng, không đọc được
  // cookie/DOM của LUMINA. allow-scripts để JS/game chạy được.
  function buildRunFrame(code) {
    const frame = document.createElement("iframe");
    frame.className = "run-frame";
    frame.setAttribute("sandbox", "allow-scripts allow-pointer-lock allow-modals");
    frame.setAttribute("loading", "lazy");
    frame.srcdoc = code;
    return frame;
  }

  function renderRunnablesIn(root) {
    const blocks = root.querySelectorAll(".lumina-run:not([data-ready])");
    for (const box of blocks) {
      box.setAttribute("data-ready", "1");
      const code = decodeURIComponent(box.getAttribute("data-code") || "");
      box.innerHTML = "";
      const head = el("div", "run-head");
      head.appendChild(el("span", "run-title", "▶ Bản chạy thử (sandbox)"));
      const ctrls = el("div", "run-ctrls");
      const bReload = el("button", "run-btn", "↺"); bReload.title = "Chạy lại";
      const bCode = el("button", "run-btn", "</>"); bCode.title = "Xem mã nguồn";
      const bFull = el("button", "run-btn", "⤢"); bFull.title = "Toàn màn hình";
      ctrls.append(bReload, bCode, bFull);
      head.appendChild(ctrls);

      const stage = el("div", "run-stage");
      let frame = buildRunFrame(code);
      stage.appendChild(frame);
      const src = el("pre", "run-source hidden");
      src.appendChild(el("code", null, code));

      box.append(head, stage, src);

      bReload.addEventListener("click", () => {
        const nf = buildRunFrame(code);
        frame.replaceWith(nf); frame = nf;
      });
      let showSource = false;
      bCode.addEventListener("click", () => {
        showSource = !showSource;
        src.classList.toggle("hidden", !showSource);
        stage.classList.toggle("hidden", showSource);
        bCode.classList.toggle("active", showSource);
      });
      bFull.addEventListener("click", () => {
        if (box.requestFullscreen) box.requestFullscreen();
        else stage.classList.toggle("run-tall");
      });
    }
  }

  function renderMarkdown(text) {
    const lines = escapeHtml(text).split("\n");
    const out = [];
    let inCode = false, codeLines = [], codeLang = "", inList = null, inTable = false;

    const closeList = () => { if (inList) { out.push(`</${inList}>`); inList = null; } };
    const closeTable = () => { if (inTable) { out.push("</table>"); inTable = false; } };
    const flushCode = () => {
      const body = codeLines.join("\n");
      if (codeLang === "mermaid") {
        // Sơ đồ động: giữ mã gốc làm dự phòng, renderMermaidIn() sẽ thay bằng SVG.
        out.push(`<div class="mermaid-diagram" data-code="${encodeURIComponent(unescapeHtml(body))}">` +
                 `<pre class="mermaid-fallback"><code>${body}</code></pre></div>`);
      } else if (codeLang === "lumina-widget") {
        // Widget sống: giữ JSON gốc làm dự phòng, renderWidgetsIn() sẽ dựng thẻ.
        out.push(`<div class="lumina-widget" data-spec="${encodeURIComponent(unescapeHtml(body))}">` +
                 `<pre class="widget-fallback"><code>${body}</code></pre></div>`);
      } else if (codeLang === "lumina-run") {
        // Live preview: chạy HTML/JS trong iframe sandbox; giữ mã gốc làm dự phòng.
        out.push(`<div class="lumina-run" data-code="${encodeURIComponent(unescapeHtml(body))}">` +
                 `<pre class="run-fallback"><code>${body}</code></pre></div>`);
      } else {
        out.push(`<pre><code>${body}</code></pre>`);
      }
      codeLines = []; codeLang = "";
    };

    for (const line of lines) {
      const fence = line.trimStart().match(/^```(\w*)/);
      if (fence) {
        if (inCode) { flushCode(); }
        else { codeLang = (fence[1] || "").toLowerCase(); }
        inCode = !inCode;
        continue;
      }
      if (inCode) { codeLines.push(line); continue; }

      const h = line.match(/^(#{1,4})\s+(.*)/);
      if (h) { closeList(); closeTable(); out.push(`<h${h[1].length + 1}>${inlineMd(h[2])}</h${h[1].length + 1}>`); continue; }

      if (/^\s*[-*]\s+/.test(line)) {
        closeTable();
        if (inList !== "ul") { closeList(); out.push("<ul>"); inList = "ul"; }
        out.push(`<li>${inlineMd(line.replace(/^\s*[-*]\s+/, ""))}</li>`);
        continue;
      }
      if (/^\s*\d+[.)]\s+/.test(line)) {
        closeTable();
        if (inList !== "ol") { closeList(); out.push("<ol>"); inList = "ol"; }
        out.push(`<li>${inlineMd(line.replace(/^\s*\d+[.)]\s+/, ""))}</li>`);
        continue;
      }
      if (/^\s*\|.*\|\s*$/.test(line)) {
        closeList();
        if (/^\s*\|[\s|:-]+\|\s*$/.test(line)) continue; // dòng phân cách
        if (!inTable) { out.push("<table>"); inTable = true; }
        const cells = line.trim().slice(1, -1).split("|").map((c) => inlineMd(c.trim()));
        out.push("<tr>" + cells.map((c) => `<td>${c}</td>`).join("") + "</tr>");
        continue;
      }
      closeTable();
      if (/^\s*&gt;\s?/.test(line)) { closeList(); out.push(`<blockquote>${inlineMd(line.replace(/^\s*&gt;\s?/, ""))}</blockquote>`); continue; }
      if (line.trim() === "") { closeList(); continue; }
      closeList();
      out.push(`<p>${inlineMd(line)}</p>`);
    }
    if (inCode) out.push(`<pre><code>${codeLines.join("\n")}</code></pre>`);
    closeList(); closeTable();
    return out.join("\n");
  }

  // ── API helpers ───────────────────────────────────────────────────────────
  async function api(path, opts = {}) {
    const resp = await fetch(path, { credentials: "same-origin", ...opts });
    if (!resp.ok) {
      let detail = resp.statusText;
      try { detail = (await resp.json()).detail || detail; } catch {}
      throw new Error(detail);
    }
    return resp.json();
  }

  // ── Đăng nhập ─────────────────────────────────────────────────────────────
  async function refreshMe() {
    // Luôn lấy lại từ /api/me (không dùng trực tiếp response đăng nhập) vì nó
    // có thêm is_admin + plan mà endpoint đăng nhập không trả về.
    const me = await api("/api/me");
    state.user = me.user;
    state.plan = me.plan;
  }

  async function boot() {
    state.config = await api("/api/config");
    document.title = `${state.config.app_name} — ${state.config.tagline}`;
    try {
      await refreshMe();
      showApp();
    } catch {
      showLogin();
    }
  }

  function showLogin() {
    $("login-screen").classList.remove("hidden");
    $("app").classList.add("hidden");

    if (state.config.google_client_id && window.google?.accounts?.id) {
      google.accounts.id.initialize({
        client_id: state.config.google_client_id,
        callback: onGoogleCredential,
      });
      google.accounts.id.renderButton($("google-signin"), {
        theme: "filled_black", size: "large", shape: "pill", text: "signin_with", locale: "vi",
      });
    } else if (state.config.google_client_id) {
      // GIS script chưa tải xong — thử lại
      setTimeout(showLogin, 400);
      return;
    } else {
      $("google-signin").innerHTML =
        '<p style="color:#9aa0b5;font-size:13px">Máy chủ chưa cấu hình GOOGLE_CLIENT_ID.</p>';
    }
    if (state.config.dev_mode) $("dev-login").classList.remove("hidden");
  }

  async function onGoogleCredential(response) {
    try {
      await api("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });
      await refreshMe();
      showApp();
    } catch (err) {
      const el = $("login-error");
      el.textContent = "Đăng nhập thất bại: " + err.message;
      el.classList.remove("hidden");
    }
  }

  $("dev-login").addEventListener("click", async () => {
    await api("/api/auth/dev", { method: "POST" });
    await refreshMe();
    showApp();
  });

  $("logout").addEventListener("click", async () => {
    await api("/api/auth/logout", { method: "POST" });
    location.reload();
  });

  // ── App chính ─────────────────────────────────────────────────────────────
  function showApp() {
    $("login-screen").classList.add("hidden");
    $("app").classList.remove("hidden");
    $("user-name").textContent = state.user.name || state.user.email;
    if (state.user.picture) $("user-avatar").src = state.user.picture;
    else $("user-avatar").style.display = "none";
    if (state.user.is_admin) $("admin-btn").classList.remove("hidden");
    renderPlanBox();
    loadConversations();
    loadProjects();
  }

  function renderPlanBox() {
    const plan = state.plan;
    if (!plan) return;
    const label = $("plan-label");
    // plan.label đã có sẵn "Gói " ở gói trả phí (vd "Gói Tháng") — không thêm lần nữa.
    const rawLabel = plan.label || PLAN_LABELS[plan.key] || plan.key;
    label.textContent = rawLabel.startsWith("Gói") ? rawLabel : "Gói " + rawLabel;
    label.classList.toggle("paid", plan.key !== "free");
    // KHÔNG lộ con số giới hạn của gói Miễn phí — chỉ nói lời thân thiện.
    let usageText;
    if (plan.key === "free") {
      usageText = "Trò chuyện thoải mái · LUMINA tự chọn bộ não";
    } else {
      usageText = "Đang kích hoạt";
      if (plan.expires_at) {
        const daysLeft = Math.max(0, Math.ceil((plan.expires_at * 1000 - Date.now()) / 86400000));
        usageText = `Còn ${daysLeft} ngày · lượt dùng cao`;
      }
    }
    $("plan-usage").textContent = usageText;
  }

  async function refreshPlan() {
    const me = await api("/api/me");
    state.plan = me.plan;
    renderPlanBox();
  }

  // ── Modal Nâng cấp ────────────────────────────────────────────────────────
  let providers = { sepay: false, paypal: false, paypal_client_id: "" };
  let pollTimer = null;

  async function openUpgradeModal() {
    $("upgrade-modal").classList.remove("hidden");
    const data = await api("/api/plans");
    providers = data.providers || {};
    const anyProvider = providers.sepay || providers.paypal;
    $("no-provider-note").classList.toggle("hidden", anyProvider);

    const cardsBox = $("plan-cards");
    cardsBox.innerHTML = "";
    for (const p of data.plans) {
      const card = document.createElement("div");
      card.className = "plan-card" + (p.key === "monthly" ? " highlight" : "");
      const per = p.key === "monthly" ? "<small>/tháng</small>" : p.key === "yearly" ? "<small>/năm</small>" : "";
      const priceHtml = p.key === "free"
        ? '<div class="price">0đ</div>'
        : `<div class="price">${formatVnd(p.price_vnd)}${per}</div><div class="price-usd">hoặc $${p.price_usd}</div>`;
      const current = state.plan && state.plan.key === p.key ? ' <small style="color:var(--accent-2)">· đang dùng</small>' : "";

      let buttons = "";
      if (p.key !== "free" && anyProvider) {
        buttons = '<div class="pay-buttons">';
        if (providers.sepay) buttons += `<button class="pay-vn" data-plan="${p.key}">🇻🇳 Chuyển khoản VN</button>`;
        if (providers.paypal) buttons += `<button class="pay-pp" data-plan="${p.key}">💳 Thẻ quốc tế</button>`;
        buttons += "</div>";
      }
      card.innerHTML = `
        <h4>${p.label}${current}</h4>
        ${priceHtml}
        <ul>${(p.features || []).map((f) => `<li>${f}</li>`).join("")}</ul>
        ${buttons}`;
      cardsBox.appendChild(card);
    }
    cardsBox.querySelectorAll(".pay-vn").forEach((b) =>
      b.addEventListener("click", () => startSepay(b.dataset.plan)));
    cardsBox.querySelectorAll(".pay-pp").forEach((b) =>
      b.addEventListener("click", () => startPaypal(b.dataset.plan)));
  }

  $("upgrade-btn").addEventListener("click", openUpgradeModal);

  // ── Chuyển khoản VN (SePay): tạo đơn → hiện QR → poll tới khi paid ──────────
  async function startSepay(plan) {
    try {
      const order = await api("/api/orders", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, provider: "sepay" }),
      });
      $("upgrade-modal").classList.add("hidden");
      $("qr-img").src = order.qr_url;
      $("qr-info").innerHTML =
        `<div><b>Số tiền:</b> ${formatVnd(order.amount_vnd)}</div>` +
        `<div><b>Nội dung:</b> <code>${order.content}</code></div>` +
        `<div><b>Ngân hàng:</b> ${order.bank_name || ""} — ${order.bank_account} (${order.bank_owner})</div>`;
      $("qr-status").textContent = "⏳ Đang chờ thanh toán…";
      $("qr-status").className = "qr-status";
      $("qr-modal").classList.remove("hidden");
      pollOrder(order.order_id, "qr-status");
    } catch (err) {
      alert("Lỗi tạo đơn: " + err.message);
    }
  }

  function pollOrder(orderId, statusElId) {
    clearInterval(pollTimer);
    pollTimer = setInterval(async () => {
      try {
        const s = await api(`/api/orders/${orderId}`);
        if (s.status === "paid") {
          clearInterval(pollTimer);
          $(statusElId).textContent = "✅ Thanh toán thành công! Gói đã được nâng cấp.";
          $(statusElId).className = "qr-status ok";
          await refreshPlan();
          setTimeout(() => {
            $("qr-modal").classList.add("hidden");
            $("paypal-modal").classList.add("hidden");
          }, 2200);
        }
      } catch { /* đơn có thể chưa sẵn sàng — thử lại lượt sau */ }
    }, 3000);
  }

  // ── PayPal: nạp SDK, tạo đơn qua server, capture qua server ────────────────
  let paypalSdkLoaded = false;
  function loadPaypalSdk() {
    return new Promise((resolve, reject) => {
      if (paypalSdkLoaded && window.paypal) return resolve();
      const s = document.createElement("script");
      s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(providers.paypal_client_id)}&currency=USD`;
      s.onload = () => { paypalSdkLoaded = true; resolve(); };
      s.onerror = () => reject(new Error("Không tải được PayPal"));
      document.head.appendChild(s);
    });
  }

  async function startPaypal(plan) {
    $("upgrade-modal").classList.add("hidden");
    $("paypal-status").textContent = "";
    $("paypal-buttons").innerHTML = "Đang tải PayPal…";
    $("paypal-modal").classList.remove("hidden");
    try {
      await loadPaypalSdk();
    } catch (err) {
      $("paypal-buttons").textContent = err.message;
      return;
    }
    let ourOrderId = null;
    $("paypal-buttons").innerHTML = "";
    window.paypal.Buttons({
      createOrder: async () => {
        const order = await api("/api/orders", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan, provider: "paypal" }),
        });
        ourOrderId = order.order_id;
        return order.paypal_order_id;
      },
      onApprove: async (data) => {
        $("paypal-status").textContent = "⏳ Đang xác nhận thanh toán…";
        try {
          await api(`/api/orders/${ourOrderId}/paypal-capture`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ paypal_order_id: data.orderID }),
          });
          $("paypal-status").textContent = "✅ Thanh toán thành công! Gói đã được nâng cấp.";
          $("paypal-status").className = "qr-status ok";
          await refreshPlan();
          setTimeout(() => $("paypal-modal").classList.add("hidden"), 2200);
        } catch (err) {
          $("paypal-status").textContent = "✕ " + err.message;
          $("paypal-status").className = "qr-status err";
        }
      },
      onError: () => { $("paypal-status").textContent = "Có lỗi với PayPal — thử lại."; },
    }).render("#paypal-buttons");
  }

  // ── Modal Quản trị đơn hàng ───────────────────────────────────────────────
  async function openAdminModal() {
    $("admin-modal").classList.remove("hidden");
    await refreshAdminOrders();
  }

  async function refreshAdminOrders() {
    const data = await api("/api/admin/orders");
    const box = $("admin-orders");
    box.innerHTML = "";
    if (!data.orders.length) {
      box.innerHTML = '<p style="color:var(--text-dim);font-size:12.5px">Chưa có đơn nào.</p>';
      return;
    }
    for (const o of data.orders) {
      const row = document.createElement("div");
      row.className = "admin-code-row";
      const paid = o.status === "paid";
      const amount = o.provider === "paypal" ? `$${o.amount_usd}` : formatVnd(o.amount_vnd);
      const statusTag = paid
        ? '<span class="tag used">Đã thanh toán</span>'
        : '<span class="tag free">Chờ thanh toán</span>';
      let action = "";
      if (!paid) action = `<button class="confirm-order" data-id="${o.id}">Xác nhận</button>`;
      row.innerHTML = `<code>${o.id}</code><span class="tag">${PLAN_LABELS[o.plan] || o.plan} · ${amount}</span>` +
        `<span class="tag">${o.email || ""}</span>${statusTag}${action}`;
      box.appendChild(row);
    }
    box.querySelectorAll(".confirm-order").forEach((b) =>
      b.addEventListener("click", async () => {
        if (!confirm("Xác nhận đơn này đã nhận được tiền?")) return;
        try {
          await api(`/api/admin/orders/${b.dataset.id}/confirm`, { method: "POST" });
          await refreshAdminOrders();
        } catch (err) { alert("Lỗi: " + err.message); }
      }));
  }

  $("admin-btn").addEventListener("click", openAdminModal);

  document.querySelectorAll(".modal-close").forEach((btn) =>
    btn.addEventListener("click", () => {
      clearInterval(pollTimer); clearInterval(dubPollTimer);
      $(btn.dataset.close).classList.add("hidden");
    })
  );
  document.querySelectorAll(".modal-overlay").forEach((overlay) =>
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        clearInterval(pollTimer); clearInterval(dubPollTimer);
        overlay.classList.add("hidden");
      }
    })
  );

  async function loadConversations() {
    const data = await api("/api/conversations");
    const list = $("conv-list");
    list.innerHTML = "";
    for (const conv of data.conversations) {
      const item = document.createElement("div");
      item.className = "conv-item" + (conv.id === state.conversationId ? " active" : "");
      item.innerHTML = `<span class="title"></span><button class="del" title="Xóa">✕</button>`;
      item.querySelector(".title").textContent = conv.title || "(không tiêu đề)";
      item.addEventListener("click", () => openConversation(conv.id, conv.title));
      item.querySelector(".del").addEventListener("click", async (e) => {
        e.stopPropagation();
        await api(`/api/conversations/${conv.id}`, { method: "DELETE" });
        if (state.conversationId === conv.id) newChat();
        loadConversations();
      });
      list.appendChild(item);
    }
  }

  function newChat() {
    state.conversationId = null;
    state.projectId = null;              // "＋ Cuộc trò chuyện mới" = chat ngoài project
    closeDashboard();
    $("topbar-title").textContent = "Cuộc trò chuyện mới";
    $("messages").innerHTML = "";
    $("messages").appendChild($("welcome") || buildWelcomePlaceholder());
    $("welcome")?.classList.remove("hidden");
    loadConversations();
    loadProjects();
  }

  // ── Projects (mặt bàn riêng: nhóm hội thoại + bảng widget sống) ────────────
  async function loadProjects() {
    let data;
    try { data = await api("/api/projects"); } catch { return; }
    const list = $("project-list");
    list.innerHTML = "";
    for (const p of data.projects) {
      const item = document.createElement("div");
      item.className = "proj-item" + (p.id === state.projectId ? " active" : "");
      item.innerHTML = `<span class="title"></span><button class="del" title="Xóa project">✕</button>`;
      item.querySelector(".title").textContent = "◧ " + (p.name || "Project");
      item.addEventListener("click", () => openDashboard(p.id));
      item.querySelector(".del").addEventListener("click", async (e) => {
        e.stopPropagation();
        if (!confirm(`Xóa project "${p.name}"? (Các cuộc trò chuyện KHÔNG bị xóa, chỉ gỡ khỏi project.)`)) return;
        await api(`/api/projects/${p.id}`, { method: "DELETE" });
        if (state.projectId === p.id) newChat();
        loadProjects();
      });
      list.appendChild(item);
    }
  }

  async function createProject() {
    const name = prompt("Tên project (mặt bàn) mới:", "Project của tôi");
    if (name === null) return;
    const proj = await api("/api/projects", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim() || "Project mới" }),
    });
    await loadProjects();
    openDashboard(proj.id);
  }

  function closeDashboard() {
    $("dashboard").classList.add("hidden");
    $("messages").classList.remove("hidden");
    document.querySelector(".composer-wrap")?.classList.remove("hidden");
  }

  async function openDashboard(projectId) {
    let data;
    try { data = await api(`/api/projects/${projectId}`); }
    catch { return; }
    state.projectId = projectId;
    const proj = data.project;
    $("topbar-title").textContent = "◧ " + (proj.name || "Project");
    // Chuyển sang chế độ xem Dashboard (ẩn khung chat).
    $("messages").classList.add("hidden");
    document.querySelector(".composer-wrap")?.classList.add("hidden");
    const dash = $("dashboard");
    dash.classList.remove("hidden");
    dash.innerHTML = "";

    // Header dashboard
    const head = el("div", "dash-head");
    const h = el("div", "dash-title", "◧ " + (proj.name || "Project"));
    const actions = el("div", "dash-actions");
    const bNew = el("button", "dash-btn primary", "＋ Trò chuyện trong project");
    bNew.addEventListener("click", () => { state.projectId = projectId; closeDashboard(); newChatInProject(); });
    const bAdd = el("button", "dash-btn", "＋ Thêm widget");
    const bRename = el("button", "dash-btn", "✎ Đổi tên");
    bRename.addEventListener("click", async () => {
      const nn = prompt("Tên mới:", proj.name); if (nn === null) return;
      await api(`/api/projects/${projectId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: nn }) });
      loadProjects(); openDashboard(projectId);
    });
    actions.append(bNew, bAdd, bRename);
    head.append(h, actions);
    dash.appendChild(head);

    // Lưới widget sống (mặt bàn)
    const widgets = Array.isArray(proj.widgets) ? proj.widgets : [];
    const grid = el("div", "dash-grid");
    if (!widgets.length) grid.appendChild(el("div", "dash-empty", "Chưa có widget nào. Bấm “＋ Thêm widget” để ghim tin tức, đồng hồ, trạng thái… vào mặt bàn này."));
    widgets.forEach((spec, idx) => {
      const cell = el("div", "dash-cell");
      const card = el("div", "lumina-widget");
      card.setAttribute("data-spec", encodeURIComponent(JSON.stringify(spec)));
      const rm = el("button", "dash-remove", "✕"); rm.title = "Gỡ widget";
      rm.addEventListener("click", async () => {
        const next = widgets.slice(); next.splice(idx, 1);
        await saveWidgets(projectId, next); openDashboard(projectId);
      });
      cell.append(card, rm);
      grid.appendChild(cell);
    });
    dash.appendChild(grid);
    renderWidgetsIn(grid);

    // Danh sách hội thoại trong project
    const convWrap = el("div", "dash-convs");
    convWrap.appendChild(el("div", "dash-subhead", "Trò chuyện trong project"));
    if (!data.conversations.length) convWrap.appendChild(el("div", "dash-empty", "Chưa có cuộc trò chuyện nào."));
    for (const c of data.conversations) {
      const row = el("div", "dash-conv", c.title || "(không tiêu đề)");
      row.addEventListener("click", () => { closeDashboard(); openConversation(c.id, c.title); });
      convWrap.appendChild(row);
    }
    dash.appendChild(convWrap);

    bAdd.addEventListener("click", () => openAddWidget(projectId, widgets));
  }

  function newChatInProject() {
    state.conversationId = null;
    $("topbar-title").textContent = "Trò chuyện mới trong project";
    $("messages").innerHTML = "";
    $("messages").appendChild($("welcome") || buildWelcomePlaceholder());
    $("welcome")?.classList.remove("hidden");
  }

  async function saveWidgets(projectId, widgets) {
    await api(`/api/projects/${projectId}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ widgets }),
    });
  }

  function openAddWidget(projectId, widgets) {
    const type = prompt("Loại widget: news | knowledge | clock", "news");
    if (!type) return;
    const t = type.trim().toLowerCase();
    if (!["news", "knowledge", "clock"].includes(t)) { alert("Loại không hợp lệ."); return; }
    const spec = { type: t };
    if (t === "news" || t === "knowledge") {
      const q = prompt(t === "news" ? "Từ khoá tin tức cần theo dõi:" : "Chủ đề tri thức:", "");
      if (q === null) return;
      spec.query = q.trim(); spec.title = (t === "news" ? "Tin: " : "Tri thức: ") + spec.query;
    } else if (t === "clock") {
      const mode = prompt("clock (đồng hồ) hay countdown (đếm ngược)?", "clock");
      if (mode && mode.trim() === "countdown") {
        const target = prompt("Mốc đếm ngược (VD 2027-01-01T00:00:00):", "2027-01-01T00:00:00");
        if (!target) return;
        spec.mode = "countdown"; spec.target = target.trim(); spec.title = "Đếm ngược";
      } else { spec.mode = "clock"; spec.title = "Đồng hồ"; }
    }
    const next = (widgets || []).concat([spec]);
    saveWidgets(projectId, next).then(() => openDashboard(projectId));
  }

  function buildWelcomePlaceholder() {
    const div = document.createElement("div");
    div.id = "welcome"; div.className = "welcome";
    div.innerHTML = "<img class='logo-big' src='/static/images/logo-128.png' alt='LUMINA'><h2>Xin chào! Mình là LUMINA</h2>";
    return div;
  }

  async function openConversation(convId, title) {
    closeDashboard();
    state.conversationId = convId;
    $("topbar-title").textContent = title || "";
    const data = await api(`/api/conversations/${convId}`);
    const box = $("messages");
    box.innerHTML = "";
    for (const m of data.messages) {
      if (m.role === "user") addUserMessage(m.content);
      else {
        const el = addAssistantMessage(modeLabel(m.mode));
        el.content.innerHTML = renderMarkdown(m.content);
        renderMermaidIn(el.content);
        renderWidgetsIn(el.content);
        renderRunnablesIn(el.content);
        try {
          const cits = JSON.parse(m.citations || "[]");
          if (cits.length) renderCitations(el.body, cits);
        } catch {}
      }
    }
    box.scrollTop = box.scrollHeight;
    loadConversations();
  }

  function modeLabel(mode) {
    return { fast: "⚡ Phản hồi nhanh", balanced: "✨ Cân bằng", deep: "🧠 Tư duy sâu",
             search: "🔍 Tìm kiếm web", apex: "🌌 Đỉnh cao", image_gen: "🎨 Vẽ ảnh",
             research: "🔬 Nghiên cứu sâu", subtitle: "📝 Phụ đề", agent: "⚙️ Lumina Forge" }[mode] || "";
  }

  // ── Render tin nhắn ───────────────────────────────────────────────────────
  function hideWelcome() { $("welcome")?.classList.add("hidden"); }

  function addUserMessage(text, images, video, fileNames) {
    hideWelcome();
    const div = document.createElement("div");
    div.className = "msg user";
    div.innerHTML = `<div class="msg-avatar">🧑</div><div class="msg-body"><div class="msg-content"></div></div>`;
    div.querySelector(".msg-content").textContent = text;
    if (images && images.length) {
      const strip = document.createElement("div");
      strip.className = "msg-images";
      for (const src of images) {
        const im = document.createElement("img");
        im.src = src; im.className = "msg-img";
        strip.appendChild(im);
      }
      div.querySelector(".msg-body").appendChild(strip);
    }
    if (video) {
      const v = document.createElement("video");
      v.src = video; v.controls = true; v.className = "msg-video";
      div.querySelector(".msg-body").appendChild(v);
    }
    if (fileNames && fileNames.length) {
      const chips = document.createElement("div");
      chips.className = "msg-files";
      chips.textContent = "📄 " + fileNames.join(", ");
      div.querySelector(".msg-body").appendChild(chips);
    }
    $("messages").appendChild(div);
    $("messages").scrollTop = $("messages").scrollHeight;
  }

  function addAssistantMessage(badgeText) {
    hideWelcome();
    const div = document.createElement("div");
    div.className = "msg assistant";
    div.innerHTML = `<div class="msg-avatar">✦</div><div class="msg-body"></div>`;
    const body = div.querySelector(".msg-body");
    if (badgeText) {
      const badge = document.createElement("span");
      badge.className = "mode-badge";
      badge.textContent = badgeText;
      body.appendChild(badge);
    }
    const content = document.createElement("div");
    content.className = "msg-content";
    body.appendChild(content);
    $("messages").appendChild(div);
    return { root: div, body, content };
  }

  function renderCitations(body, items) {
    let box = body.querySelector(".citations");
    if (!box) {
      box = document.createElement("div");
      box.className = "citations";
      body.appendChild(box);
    }
    for (const c of items) {
      const a = document.createElement("a");
      a.className = "citation";
      a.href = c.url; a.target = "_blank"; a.rel = "noopener";
      a.textContent = "🔗 " + (c.title || c.url);
      box.appendChild(a);
    }
  }

  // ── Gửi + nhận stream ─────────────────────────────────────────────────────
  async function sendMessage() {
    const input = $("input");
    let text = input.value.trim();
    const images = state.attachedImages.slice();
    const video = state.attachedVideo;
    const attachedFiles = state.attachedFiles.slice();
    const mode = state.forceMode;
    const hasAttachment = images.length || video || attachedFiles.length;
    // Cho phép gửi chỉ đính kèm (không chữ) — tự thêm câu hỏi mặc định.
    if (!text && hasAttachment) {
      text = mode === "subtitle" ? "Tạo phụ đề cho video này giúp mình."
        : video ? "Xem video này giúp mình nhé."
        : "Xem giúp mình nhé.";
    }
    if ((!text && !hasAttachment) || state.streaming) return;
    input.value = "";
    autoResize();
    clearAttachments();
    state.streaming = true;
    $("send").disabled = true;

    addUserMessage(text, images, video?.dataUrl, attachedFiles.map((f) => f.name));
    const el = addAssistantMessage("");
    const badge = el.body.querySelector(".mode-badge") || (() => {
      const b = document.createElement("span");
      b.className = "mode-badge"; b.textContent = "✦ Đang định tuyến…";
      el.body.prepend(b);
      return b;
    })();

    let answer = "";
    let thinkingBox = null, thinkingText = "";
    el.content.classList.add("cursor-blink");

    try {
      const resp = await fetch("/api/chat/stream", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversation_id: state.conversationId,
          project_id: state.conversationId ? null : state.projectId,
          images: images,
          videos: video ? [video.dataUrl] : [],
          files: attachedFiles.map((f) => ({ name: f.name, data_url: f.dataUrl })),
          mode: mode,
        }),
      });
      if (!resp.ok) {
        let detail = resp.statusText;
        try { detail = (await resp.json()).detail || detail; } catch {}
        throw new Error(detail);
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop();
        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;
          let ev;
          try { ev = JSON.parse(line.slice(5)); } catch { continue; }
          handleEvent(ev);
        }
      }

      function handleEvent(ev) {
        switch (ev.type) {
          case "router":
            if (ev.label) badge.textContent = ev.label;
            if (ev.notice) badge.textContent = "🔁 " + ev.notice;
            if (ev.conversation_id) state.conversationId = ev.conversation_id;
            break;
          case "thinking":
            if (!thinkingBox) {
              thinkingBox = document.createElement("details");
              thinkingBox.className = "thinking active";
              thinkingBox.innerHTML = `<summary>Đang tư duy…</summary><div class="thinking-text"></div>`;
              el.body.insertBefore(thinkingBox, el.content);
            }
            thinkingText += ev.text;
            thinkingBox.querySelector(".thinking-text").textContent = thinkingText;
            break;
          case "search_status": {
            const chip = document.createElement("span");
            chip.className = "search-chip";
            const prefix = ev.tool === "image_gen" ? "🎨 Đang vẽ ảnh: "
              : ev.tool === "knowledge" ? "📚 Tra kho tri thức: "
              : ev.tool === "recall" ? "🧠 Nhớ lại cuộc trò chuyện: "
              : ev.tool === "web_fetch" ? "🌐 Đang đọc trang: "
              : ev.tool === "skill" ? "🧩 Áp dụng kỹ năng: "
              : ev.tool === "learned" ? "🧠 Đã tiếp thu & ghi nhớ: "
              : ev.tool === "video_frames" ? "🎞 Đã tách khung hình video: "
              : ev.tool === "video_link" ? "🎬 Đã xem video từ link: "
              : "🔍 Đang tìm kiếm: ";
            chip.textContent = prefix + (ev.query || "…");
            el.body.insertBefore(chip, el.content);
            break;
          }
          case "image":
            // Ảnh sẽ được render qua markdown ở sự kiện "text" kế tiếp — ở đây chỉ báo đang tải.
            break;
          case "text":
            answer += ev.text;
            el.content.innerHTML = renderMarkdown(answer);
            break;
          case "citations":
            renderCitations(el.body, ev.items || []);
            break;
          case "upsell": {
            const chip = document.createElement("button");
            chip.className = "upsell-chip";
            chip.textContent = "✦ " + ev.message;
            chip.addEventListener("click", openUpgradeModal);
            el.body.insertBefore(chip, el.content);
            break;
          }
          case "error": {
            const err = document.createElement("div");
            err.className = "msg-error";
            err.textContent = ev.message;
            el.body.appendChild(err);
            break;
          }
          case "done":
            if (ev.conversation_id) state.conversationId = ev.conversation_id;
            break;
        }
        $("messages").scrollTop = $("messages").scrollHeight;
      }
    } catch (err) {
      if (err.message.includes("Nâng cấp")) {
        const chip = document.createElement("button");
        chip.className = "upsell-chip";
        chip.textContent = "✦ " + err.message;
        chip.addEventListener("click", openUpgradeModal);
        el.body.appendChild(chip);
      } else {
        const errBox = document.createElement("div");
        errBox.className = "msg-error";
        errBox.textContent = "Lỗi: " + err.message;
        el.body.appendChild(errBox);
      }
    } finally {
      el.content.classList.remove("cursor-blink");
      renderMermaidIn(el.content);   // render sơ đồ Mermaid khi đã có đủ nội dung
      renderWidgetsIn(el.content);   // dựng widget sống khi tin nhắn hoàn tất
      renderRunnablesIn(el.content); // chạy bản preview HTML/JS (iframe sandbox)
      if (thinkingBox) {
        thinkingBox.classList.remove("active");
        thinkingBox.querySelector("summary").textContent =
          "Đã tư duy xong (bấm để xem)";
      }
      state.streaming = false;
      $("send").disabled = false;
      loadConversations();
    }
  }

  // ── Đính kèm ảnh/video/tệp (đa phương thức: LUMINA "xem" & "đọc") ──────────
  const MAX_IMAGES = 4;
  const MAX_VIDEO_BYTES = 18 * 1024 * 1024;   // khớp giới hạn backend (media.py)
  const MAX_FILES = 3;
  const DOC_EXT = /\.(pdf|docx|xlsx|txt|md|csv)$/i;

  function clearAttachments() {
    state.attachedImages = [];
    state.attachedVideo = null;
    state.attachedFiles = [];
    $("attach-preview").innerHTML = "";
    $("attach-preview").classList.add("hidden");
  }

  function renderAttachPreview() {
    const box = $("attach-preview");
    box.innerHTML = "";
    const hasAny = state.attachedImages.length || state.attachedVideo || state.attachedFiles.length;
    box.classList.toggle("hidden", !hasAny);

    state.attachedImages.forEach((src, i) => {
      const wrap = document.createElement("div");
      wrap.className = "attach-thumb";
      wrap.innerHTML = `<img src="${src}"><button class="attach-del" title="Bỏ ảnh">✕</button>`;
      wrap.querySelector(".attach-del").addEventListener("click", () => {
        state.attachedImages.splice(i, 1);
        renderAttachPreview();
      });
      box.appendChild(wrap);
    });

    if (state.attachedVideo) {
      const wrap = document.createElement("div");
      wrap.className = "attach-thumb attach-video";
      wrap.innerHTML = `<span class="attach-icon">🎬</span>` +
        `<button class="attach-del" title="Bỏ video">✕</button>`;
      wrap.querySelector(".attach-del").addEventListener("click", () => {
        state.attachedVideo = null;
        renderAttachPreview();
      });
      box.appendChild(wrap);
    }

    state.attachedFiles.forEach((f, i) => {
      const chip = document.createElement("div");
      chip.className = "attach-chip";
      chip.innerHTML = `<span>📄 ${f.name}</span><button class="attach-del" title="Bỏ tệp">✕</button>`;
      chip.querySelector(".attach-del").addEventListener("click", () => {
        state.attachedFiles.splice(i, 1);
        renderAttachPreview();
      });
      box.appendChild(chip);
    });
  }

  function readAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Không đọc được tệp"));
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }

  // Thu nhỏ ảnh về tối đa 1024px + nén JPEG để request nhẹ, gửi nhanh, đỡ tốn token.
  function downscaleImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Không đọc được ảnh"));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error("Ảnh lỗi"));
        img.onload = () => {
          const max = 1024;
          let { width, height } = img;
          if (width > max || height > max) {
            const r = Math.min(max / width, max / height);
            width = Math.round(width * r); height = Math.round(height * r);
          }
          const canvas = document.createElement("canvas");
          canvas.width = width; canvas.height = height;
          canvas.getContext("2d").drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.85));
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  async function addFiles(fileList) {
    for (const f of Array.from(fileList)) {
      try {
        if (f.type.startsWith("image/")) {
          if (state.attachedImages.length >= MAX_IMAGES) continue;
          state.attachedImages.push(await downscaleImage(f));
        } else if (f.type.startsWith("video/")) {
          if (f.size > MAX_VIDEO_BYTES) {
            alert(`Video "${f.name}" quá lớn (tối đa ~18MB) — hãy nén hoặc cắt ngắn video.`);
            continue;
          }
          state.attachedVideo = { name: f.name, dataUrl: await readAsDataUrl(f) };
        } else if (DOC_EXT.test(f.name) || f.type === "application/pdf") {
          if (state.attachedFiles.length >= MAX_FILES) continue;
          state.attachedFiles.push({ name: f.name, dataUrl: await readAsDataUrl(f) });
        }
      } catch { /* bỏ qua tệp lỗi, không chặn các tệp còn lại */ }
    }
    renderAttachPreview();
  }

  $("attach-btn").addEventListener("click", () => $("file-input").click());
  $("file-input").addEventListener("change", (e) => { addFiles(e.target.files); e.target.value = ""; });

  // ── Nói bằng giọng (Web Speech API — chạy ngay trong trình duyệt, miễn phí) ─
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognizer = null, listening = false;

  function setupVoice() {
    const mic = $("mic-btn");
    if (!SpeechRec) { mic.style.display = "none"; return; }  // trình duyệt không hỗ trợ
    mic.addEventListener("click", () => {
      if (listening) { recognizer && recognizer.stop(); return; }
      recognizer = new SpeechRec();
      recognizer.lang = "vi-VN";
      recognizer.interimResults = true;
      recognizer.continuous = false;
      const base = $("input").value;
      recognizer.onstart = () => { listening = true; mic.classList.add("listening"); };
      recognizer.onerror = () => { listening = false; mic.classList.remove("listening"); };
      recognizer.onend = () => { listening = false; mic.classList.remove("listening"); autoResize(); };
      recognizer.onresult = (e) => {
        let txt = "";
        for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript;
        $("input").value = (base ? base + " " : "") + txt;
        autoResize();
      };
      recognizer.start();
    });
  }
  setupVoice();

  // ── Nút ép chế độ 🎨 Vẽ ảnh / 🔬 Nghiên cứu sâu / 📝 Phụ đề / ⚙️ Lumina Forge ──
  document.querySelectorAll(".mode-toggle").forEach((btn) =>
    btn.addEventListener("click", () => {
      const m = btn.dataset.mode;
      state.forceMode = state.forceMode === m ? null : m;
      document.querySelectorAll(".mode-toggle").forEach((b) =>
        b.classList.toggle("active", b.dataset.mode === state.forceMode));
      const ph = state.forceMode === "image" ? "Mô tả ảnh muốn vẽ…"
        : state.forceMode === "research" ? "Chủ đề cần nghiên cứu sâu…"
        : state.forceMode === "subtitle" ? "Đính kèm 📎 video rồi bấm Gửi…"
        : state.forceMode === "agent" ? "Mô tả yêu cầu (dán kèm code/tài liệu nếu có)…"
        : "Nhắn tin cho LUMINA…";
      $("input").placeholder = ph;
    })
  );

  // ── UI events ─────────────────────────────────────────────────────────────
  function autoResize() {
    const input = $("input");
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 180) + "px";
  }

  $("input").addEventListener("input", autoResize);
  $("input").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  $("send").addEventListener("click", sendMessage);
  $("new-chat").addEventListener("click", newChat);
  $("new-project").addEventListener("click", createProject);
  $("toggle-sidebar").addEventListener("click", () => $("sidebar").classList.toggle("collapsed"));
  document.querySelectorAll(".suggestion").forEach((btn) =>
    btn.addEventListener("click", () => { $("input").value = btn.textContent; sendMessage(); })
  );

  // ── 🗣 Modal Lồng tiếng & gắn phụ đề video (job nền, có thể mất 1-3 phút) ──
  let dubPollTimer = null;

  function openDubModal() {
    $("dub-modal").classList.remove("hidden");
    $("dub-form").classList.remove("hidden");
    $("dub-progress").classList.add("hidden");
    $("dub-download").classList.add("hidden");
    $("dub-file-input").value = "";
  }
  $("dub-btn").addEventListener("click", openDubModal);

  const DUB_STATUS_TEXT = {
    pending: "⏳ Đang chuẩn bị…",
    transcribing: "🎧 Đang nghe & dịch lời thoại…",
    voicing: "🗣 Đang tạo giọng đọc mới…",
    muxing: "🎬 Đang ghép video…",
    done: "✅ Xong! Video đã sẵn sàng.",
    error: "✕ Có lỗi xảy ra.",
  };

  $("dub-submit").addEventListener("click", async () => {
    const fileInput = $("dub-file-input");
    const file = fileInput.files[0];
    if (!file) { alert("Hãy chọn một video trước."); return; }
    if (file.size > MAX_VIDEO_BYTES) {
      alert("Video quá lớn (tối đa ~18MB) — hãy nén hoặc cắt ngắn video."); return;
    }
    let dataUrl;
    try { dataUrl = await readAsDataUrl(file); }
    catch { alert("Không đọc được video."); return; }

    $("dub-form").classList.add("hidden");
    $("dub-progress").classList.remove("hidden");
    $("dub-download").classList.add("hidden");
    $("dub-progress-fill").style.width = "5%";
    $("dub-progress-text").textContent = DUB_STATUS_TEXT.pending;

    try {
      const res = await api("/api/dub", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          video: dataUrl,
          target_lang: $("dub-lang").value,
          burn_subtitles: $("dub-subs").checked,
        }),
      });
      pollDubJob(res.job_id);
    } catch (err) {
      $("dub-progress-text").textContent = "✕ " + err.message;
      $("dub-progress-text").className = "qr-status err";
      if (err.message.includes("Nâng cấp") || err.message.includes("gói")) {
        setTimeout(() => { $("dub-modal").classList.add("hidden"); openUpgradeModal(); }, 1800);
      }
    }
  });

  function pollDubJob(jobId) {
    clearInterval(dubPollTimer);
    dubPollTimer = setInterval(async () => {
      try {
        const s = await api(`/api/dub/${jobId}`);
        $("dub-progress-fill").style.width = Math.max(5, s.progress) + "%";
        $("dub-progress-text").textContent = DUB_STATUS_TEXT[s.status] || s.status;
        $("dub-progress-text").className = "qr-status";
        if (s.status === "done") {
          clearInterval(dubPollTimer);
          const dl = $("dub-download");
          dl.href = `/api/dub/${jobId}/download`;
          dl.classList.remove("hidden");
        } else if (s.status === "error") {
          clearInterval(dubPollTimer);
          $("dub-progress-text").textContent = "✕ " + (s.error || "Có lỗi xảy ra.");
          $("dub-progress-text").className = "qr-status err";
        }
      } catch { /* job có thể chưa sẵn sàng — thử lại lượt sau */ }
    }, 3000);
  }

  boot().catch((err) => {
    document.body.innerHTML = `<p style="padding:40px;color:#ff8a80">Không kết nối được máy chủ: ${escapeHtml(err.message)}</p>`;
  });
})();
