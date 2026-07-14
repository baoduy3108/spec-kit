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
    $("topbar-title").textContent = "Cuộc trò chuyện mới";
    $("messages").innerHTML = "";
    $("messages").appendChild($("welcome") || buildWelcomePlaceholder());
    $("welcome")?.classList.remove("hidden");
    loadConversations();
  }

  function buildWelcomePlaceholder() {
    const div = document.createElement("div");
    div.id = "welcome"; div.className = "welcome";
    div.innerHTML = "<img class='logo-big' src='/static/images/logo-128.png' alt='LUMINA'><h2>Xin chào! Mình là LUMINA</h2>";
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
