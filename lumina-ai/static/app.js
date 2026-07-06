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
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|\W)\*([^*\n]+)\*(?=\W|$)/g, "$1<em>$2</em>")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }

  function renderMarkdown(text) {
    const lines = escapeHtml(text).split("\n");
    const out = [];
    let inCode = false, codeLines = [], inList = null, inTable = false;

    const closeList = () => { if (inList) { out.push(`</${inList}>`); inList = null; } };
    const closeTable = () => { if (inTable) { out.push("</table>"); inTable = false; } };

    for (const line of lines) {
      if (line.trimStart().startsWith("```")) {
        if (inCode) { out.push(`<pre><code>${codeLines.join("\n")}</code></pre>`); codeLines = []; }
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
  }

  function renderPlanBox() {
    const plan = state.plan;
    if (!plan) return;
    const label = $("plan-label");
    label.textContent = "Gói " + (plan.label || PLAN_LABELS[plan.key] || plan.key);
    label.classList.toggle("paid", plan.key !== "free");
    let usageText = `${plan.premium_daily_cap} lượt cao cấp/ngày · tối đa ${plan.total_daily_cap} tin nhắn/ngày`;
    if (plan.key !== "free" && plan.expires_at) {
      const daysLeft = Math.max(0, Math.ceil((plan.expires_at * 1000 - Date.now()) / 86400000));
      usageText += ` · còn ${daysLeft} ngày`;
    }
    $("plan-usage").textContent = usageText;
  }

  async function refreshPlan() {
    const me = await api("/api/me");
    state.plan = me.plan;
    renderPlanBox();
  }

  // ── Modal Nâng cấp ────────────────────────────────────────────────────────
  async function openUpgradeModal() {
    $("upgrade-modal").classList.remove("hidden");
    $("redeem-result").textContent = "";
    $("redeem-input").value = "";
    const data = await api("/api/plans");

    const cardsBox = $("plan-cards");
    cardsBox.innerHTML = "";
    for (const p of data.plans) {
      const card = document.createElement("div");
      card.className = "plan-card" + (p.key === "monthly" ? " highlight" : "");
      const price = p.price_vnd === 0 ? "0đ" : formatVnd(p.price_vnd);
      const per = p.key === "monthly" ? "<small>/tháng</small>" : p.key === "yearly" ? "<small>/năm</small>" : "";
      const current = state.plan && state.plan.key === p.key ? ' <small style="color:var(--accent-2)">· đang dùng</small>' : "";
      card.innerHTML = `
        <h4>${p.label}${current}</h4>
        <div class="price">${price}${per}</div>
        <ul>${(p.features || []).map((f) => `<li>${f}</li>`).join("")}</ul>`;
      cardsBox.appendChild(card);
    }

    const pay = data.payment || {};
    const rows = [];
    if (pay.bank_name) rows.push(`<div><b>Ngân hàng:</b> ${pay.bank_name}</div>`);
    if (pay.bank_account) rows.push(`<div><b>Số tài khoản:</b> ${pay.bank_account}</div>`);
    if (pay.bank_owner) rows.push(`<div><b>Chủ tài khoản:</b> ${pay.bank_owner}</div>`);
    if (pay.momo) rows.push(`<div><b>Momo:</b> ${pay.momo}</div>`);
    if (pay.note) rows.push(`<div>${pay.note}</div>`);
    $("payment-info").innerHTML = rows.length
      ? rows.join("")
      : '<span class="empty">Chủ web chưa cấu hình thông tin thanh toán — liên hệ trực tiếp để nâng cấp.</span>';
  }

  $("upgrade-btn").addEventListener("click", openUpgradeModal);

  $("redeem-btn").addEventListener("click", async () => {
    const code = $("redeem-input").value.trim();
    const result = $("redeem-result");
    if (!code) return;
    try {
      const data = await api("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      result.textContent = "✓ " + data.message;
      result.className = "redeem-result ok";
      await refreshPlan();
      setTimeout(() => $("upgrade-modal").classList.add("hidden"), 1400);
    } catch (err) {
      result.textContent = "✕ " + err.message;
      result.className = "redeem-result err";
    }
  });

  // ── Modal Quản trị ────────────────────────────────────────────────────────
  async function openAdminModal() {
    $("admin-modal").classList.remove("hidden");
    await refreshAdminCodes();
  }

  async function refreshAdminCodes() {
    const data = await api("/api/admin/codes");
    const box = $("admin-codes");
    box.innerHTML = "";
    if (!data.codes.length) {
      box.innerHTML = '<p style="color:var(--text-dim);font-size:12.5px">Chưa có mã nào.</p>';
      return;
    }
    for (const c of data.codes) {
      const row = document.createElement("div");
      row.className = "admin-code-row";
      const status = c.used_by
        ? `<span class="tag used">Đã dùng bởi ${c.used_by}</span>`
        : '<span class="tag free">Chưa dùng</span>';
      row.innerHTML = `<code>${c.code}</code><span class="tag">${PLAN_LABELS[c.plan] || c.plan}</span>${status}`;
      box.appendChild(row);
    }
  }

  $("admin-btn").addEventListener("click", openAdminModal);

  $("admin-create-btn").addEventListener("click", async () => {
    const plan = $("admin-plan").value;
    const count = parseInt($("admin-count").value, 10) || 1;
    try {
      await api("/api/admin/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, count }),
      });
      await refreshAdminCodes();
    } catch (err) {
      alert("Lỗi tạo mã: " + err.message);
    }
  });

  document.querySelectorAll(".modal-close").forEach((btn) =>
    btn.addEventListener("click", () => $(btn.dataset.close).classList.add("hidden"))
  );
  document.querySelectorAll(".modal-overlay").forEach((overlay) =>
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.classList.add("hidden"); })
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
    $("topbar-title").textContent = "Cuộc trò chuyện mới";
    $("messages").innerHTML = "";
    $("messages").appendChild($("welcome") || buildWelcomePlaceholder());
    $("welcome")?.classList.remove("hidden");
    loadConversations();
  }

  function buildWelcomePlaceholder() {
    const div = document.createElement("div");
    div.id = "welcome"; div.className = "welcome";
    div.innerHTML = "<div class='logo-big'>✦</div><h2>Xin chào! Mình là LUMINA</h2>";
    return div;
  }

  async function openConversation(convId, title) {
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
             search: "🔍 Tìm kiếm web", apex: "🌌 Đỉnh cao" }[mode] || "";
  }

  // ── Render tin nhắn ───────────────────────────────────────────────────────
  function hideWelcome() { $("welcome")?.classList.add("hidden"); }

  function addUserMessage(text) {
    hideWelcome();
    const div = document.createElement("div");
    div.className = "msg user";
    div.innerHTML = `<div class="msg-avatar">🧑</div><div class="msg-body"><div class="msg-content"></div></div>`;
    div.querySelector(".msg-content").textContent = text;
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
    const text = input.value.trim();
    if (!text || state.streaming) return;
    input.value = "";
    autoResize();
    state.streaming = true;
    $("send").disabled = true;

    addUserMessage(text);
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
        body: JSON.stringify({ message: text, conversation_id: state.conversationId }),
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
            chip.textContent = (ev.tool === "web_fetch" ? "🌐 Đang đọc trang: " : "🔍 Đang tìm kiếm: ")
              + (ev.query || "…");
            el.body.insertBefore(chip, el.content);
            break;
          }
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
  $("toggle-sidebar").addEventListener("click", () => $("sidebar").classList.toggle("collapsed"));
  document.querySelectorAll(".suggestion").forEach((btn) =>
    btn.addEventListener("click", () => { $("input").value = btn.textContent; sendMessage(); })
  );

  boot().catch((err) => {
    document.body.innerHTML = `<p style="padding:40px;color:#ff8a80">Không kết nối được máy chủ: ${escapeHtml(err.message)}</p>`;
  });
})();
