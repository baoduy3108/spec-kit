/* ============================================================
   THIÊN ĐẠO LỘ — Vòng chơi & giao diện
   ============================================================ */
window.TD = window.TD || {};

const $ = s => document.querySelector(s);
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };

/* ---------------- THÔNG BÁO ---------------- */
TD.bao = function (chu, loai) {
  const h = $('#toast'); if (!h) return;
  const t = el('div', 'toast' + (loai ? ' ' + loai : ''), chu);
  h.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .4s'; setTimeout(() => t.remove(), 400); }, 2600);
};

/* ---------------- ĐỘT PHÁ CẢNH GIỚI ---------------- */
TD.moDotPha = function (cg) {
  const h = $('#dotpha'); if (!h) return;
  h.innerHTML = `<div>
    <div class="vong">☯</div>
    <div style="color:var(--chu2);letter-spacing:3px;font-size:13px">ĐỘT PHÁ CẢNH GIỚI</div>
    <h2>${cg.ten}</h2>
    <div style="color:var(--kim);font-size:15px">${cg.tang}</div>
    <p style="color:var(--chu2);max-width:430px;margin:16px auto">${cg.mo_ta}</p>
    <button class="nut kim" id="dp-dong">Tiếp tục tu luyện</button>
  </div>`;
  h.classList.add('hien');
  TD.keu('dotpha');
  $('#dp-dong').onclick = () => h.classList.remove('hien');
  TD.S.linh_thach += 50;
  TD.bao('💎 +50 linh thạch mừng đột phá!', 'kim');
};

/* ---------------- HUD ---------------- */
TD.veHud = function () {
  const cg = TD.canhGioi(TD.S.exp), sau = TD.canhGioiSau(TD.S.exp);
  const pt = TD.tienDoCanhGioi(TD.S.exp);
  const con = TD.ngayConLai();
  $('#hud').innerHTML = `
    <div class="hud-top">
      <div>
        <div class="hud-cg" style="color:${cg.mau}">${cg.ten}
          <span class="hud-tang">· ${cg.tang}</span></div>
      </div>
      <div class="hud-so">
        <span>💠 <b>${TD.S.exp.toLocaleString('vi-VN')}</b> linh khí</span>
        <span>💎 <b>${TD.S.linh_thach}</b></span>
        <span>🔥 <b>${TD.S.chuoi}</b> chuỗi</span>
        <span>📅 <b>${con >= 0 ? con : 0}</b> ngày tới kỳ thi</span>
      </div>
    </div>
    <div class="thanh"><i style="width:${pt}%"></i></div>
    <div style="font-size:11.5px;color:var(--chu3);margin-top:4px">
      ${sau ? `Còn <b style="color:var(--kim)">${(sau.exp - TD.S.exp).toLocaleString('vi-VN')}</b> linh khí để đột phá <b>${sau.ten} · ${sau.tang}</b>` : 'Đã đạt cảnh giới tối cao'}
    </div>`;
};

/* ---------------- ĐIỀU HƯỚNG ---------------- */
TD.MAN = [
  ['dongphu',  '🏔️ Động Phủ'],
  ['luyencong','⚔️ Luyện Công'],
  ['tamma',    '👹 Tâm Ma Kiếp'],
  ['tangkinh', '📜 Tàng Kinh Các'],
  ['tadao',    '☠️ Tà Đạo'],
  ['dokiep',   '⚡ Độ Kiếp'],
  ['thienmenh','🗓️ Thiên Mệnh Bảng'],
  ['biluc',    '🎯 Bí Lục'],
  ['caidat',   '⚙️ Cài Đặt']
];

TD.di = function (man, tham) {
  if (TD.man && TD.man !== man) TD.keu('cham');
  TD.man = man; TD.tham = tham || null;
  document.querySelectorAll('nav.tab button').forEach(b =>
    b.classList.toggle('on', b.dataset.m === man));
  TD.ve();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

TD.ve = function () {
  TD.veHud();
  const c = $('#noidung');
  c.innerHTML = '';
  const f = TD['man_' + TD.man];
  if (f) f(c); else c.innerHTML = '<p>Chưa có nội dung.</p>';
  TD.luu();
};

/* ============================================================
   MÀN 1 — ĐỘNG PHỦ (bảng điều khiển)
   ============================================================ */
TD.man_dongphu = function (c) {
  const h = TD.homNay();
  const daLam = TD.S.nhat_ky[h] || 0;
  const ct = TD.S.chi_tieu_ngay;
  const ptNgay = Math.min(100, Math.round((daLam / ct) * 100));
  const denHan = TD.SRS.denHan().length;
  const tuan = TD.tuanHienTai();
  const lt = TD.LO_TRINH.find(t => t.tuan === tuan);
  const gd = lt ? TD.GIAI_DOAN.find(g => g.id === lt.gd) : null;
  const uoc = TD.tongDiemToHop();

  /* --- nhiệm vụ hôm nay --- */
  c.appendChild(el('div', 'the vien-ngoc', `
    <h3>🎯 Nhiệm vụ hôm nay</h3>
    <div class="doc-thanh">
      <span class="ten">Chỉ tiêu</span>
      <div class="thanh"><i style="width:${ptNgay}%"></i></div>
      <span class="pt" style="color:${ptNgay >= 100 ? 'var(--dung)' : 'var(--kim)'}">${daLam}/${ct}</span>
    </div>
    <div style="display:flex;gap:22px;flex-wrap:wrap;margin-top:12px">
      <div><div class="so-to">${TD.S.ngay_lien_tiep}</div><div class="so-nhan">ngày liên tiếp</div></div>
      <div><div class="so-to" style="color:${denHan ? 'var(--lua)' : 'var(--chu3)'}">${denHan}</div><div class="so-nhan">tâm ma chờ</div></div>
      <div><div class="so-to">${TD.S.chuoi_max}</div><div class="so-nhan">chuỗi cao nhất</div></div>
    </div>
    <div class="hang-nut">
      <button class="nut" onclick="TD.di('luyencong')">Bắt đầu luyện công</button>
      ${denHan ? `<button class="nut lua" onclick="TD.di('tamma')">Trấn áp ${denHan} tâm ma</button>` : ''}
    </div>`));

  /* --- lộ trình tuần này --- */
  if (lt && gd) {
    c.appendChild(el('div', 'the', `
      <h3>🗓️ Tuần ${lt.tuan}/20 — ${lt.chu_de}</h3>
      <span class="nhan" style="color:${gd.mau};border-color:${gd.mau}">Giai đoạn ${gd.id}: ${gd.ten}</span>
      <div class="tuan" style="--g:${gd.mau};margin-top:10px">
        <ul>${lt.viec.slice(0, 3).map(v => `<li>${v}</li>`).join('')}</ul>
        <div class="moc">🏁 ${lt.moc}</div>
      </div>
      <div class="hang-nut"><button class="nut phu" onclick="TD.di('thienmenh')">Xem toàn bộ lộ trình</button></div>`));
  }

  /* --- ước lượng điểm --- */
  const dongMon = TD.S.to_hop.map(m => {
    const mon = TD.MON[m]; if (!mon) return '';
    const d = TD.uocLuongDiem(m);
    const n = TD.soCauDaLam(m);
    const pt = d === null ? 0 : Math.round(d * 10);
    return `<div class="doc-thanh">
      <span class="ten">${mon.icon} ${mon.ten}</span>
      <div class="thanh"><i style="width:${pt}%;background:${mon.mau}"></i></div>
      <span class="pt">${d === null ? '—' : d}</span>
    </div><div style="font-size:11.5px;color:var(--chu3);margin:-4px 0 8px 87px">
      ${n ? n + ' câu đã làm · chính xác ' + TD.doChinhXac(m) + '%' : 'chưa có dữ liệu'}</div>`;
  }).join('');

  c.appendChild(el('div', 'the vien-kim', `
    <h3>📊 Ước lượng điểm tổ hợp</h3>
    <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:12px">
      <div class="so-to" style="font-size:38px;color:${uoc.tong >= TD.S.muc_tieu ? 'var(--dung)' : 'var(--kim)'}">${uoc.du ? uoc.tong : '—'}</div>
      <div><div class="so-nhan">/ 30 điểm · mục tiêu ${TD.S.muc_tieu}</div>
      <div style="font-size:12.5px;color:var(--chu2)">${uoc.du ? TD.hamMucTieu(uoc.tong / 3) : 'Làm thêm câu hỏi để có ước lượng'}</div></div>
    </div>
    ${dongMon}
    <p class="mo-nhat tren12">Ước lượng dựa trên độ chính xác của bạn ở từng mức độ, có trọng số theo cấu trúc đề thật. Càng làm nhiều câu, con số càng sát.</p>`));

  /* --- túi đồ --- */
  const tui = Object.keys(TD.VAT_PHAM).map(k => {
    const v = TD.VAT_PHAM[k];
    return `<div style="display:flex;gap:9px;align-items:center;padding:6px 0">
      <span style="font-size:20px">${v.icon}</span>
      <div style="flex:1"><b>${v.ten}</b> <span class="mo-nhat">×${TD.S.tui[k] || 0}</span>
      <div style="font-size:12px;color:var(--chu3)">${v.mo_ta}</div></div>
      <button class="nut phu" style="padding:6px 11px;font-size:12px" onclick="TD.mua('${k}')">💎${v.gia}</button>
    </div>`;
  }).join('');
  c.appendChild(el('div', 'the', `<h3>🎒 Túi càn khôn</h3>${tui}`));
};

TD.mua = function (k) {
  const v = TD.VAT_PHAM[k];
  if (TD.S.linh_thach < v.gia) { TD.bao('Không đủ linh thạch. Làm thêm câu hỏi để tích luỹ.', 'lua'); return; }
  TD.S.linh_thach -= v.gia;
  TD.S.tui[k] = (TD.S.tui[k] || 0) + 1;
  TD.keu('thuong');
  TD.bao(`${v.icon} Đã mua ${v.ten}`, 'kim');
  TD.ve();
};

/* ============================================================
   MÀN 2 — LUYỆN CÔNG (chọn môn & mức độ)
   ============================================================ */
TD.man_luyencong = function (c) {
  c.appendChild(el('div', 'the', `<h3>⚔️ Luyện Công</h3>
    <p class="mo-nhat">Chọn môn phái để bắt đầu. Câu trả lời sai sẽ tự động biến thành <b>tâm ma</b> và quay lại tìm bạn theo lịch ôn giãn cách.</p>`));

  const luoi = el('div', 'luoi');
  TD.THU_TU_MON.forEach(m => {
    const mon = TD.MON[m];
    const khaDung = TD.soCauKhaDung(m);
    const soMau = TD.soMau(m);
    const cx = TD.doChinhXac(m);
    const t = el('div', 'the mon-the', `
      <div style="display:flex;gap:11px;align-items:center">
        <span class="mon-icon">${mon.icon}</span>
        <div><div class="mon-ten">${mon.ten}</div><div class="mon-phai">${mon.phai}</div></div>
      </div>
      <p style="font-size:12.6px;color:var(--chu2);margin:9px 0 6px">${mon.slogan}</p>
      <div style="font-size:12px;color:var(--chu3)">
        <b style="color:var(--tim)">≈ ${khaDung.toLocaleString('vi-VN')} câu khác nhau</b> · ${soMau} dạng bài${cx !== null ? ' · chính xác <b style="color:var(--kim)">' + cx + '%</b>' : ''}
      </div>`);
    t.style.setProperty('--m', mon.mau);
    t.onclick = () => TD.chonMuc(m);
    luoi.appendChild(t);
  });
  c.appendChild(luoi);
};

TD.chonMuc = function (mon) {
  const c = $('#noidung'); c.innerHTML = '';
  const M = TD.MON[mon];
  const kho = TD.KHO[mon] || [];

  if (!kho.length && !TD.soMau(mon)) {
    c.appendChild(el('div', 'the vien-kim', `<h3>${M.icon} ${M.ten}</h3>
      <p>Môn này chưa có ngân hàng câu hỏi trắc nghiệm${mon === 'van' ? ' (Ngữ văn thi tự luận)' : ''}.
      Hãy vào <b>Tàng Kinh Các</b> để học phần lý thuyết và kỹ năng.</p>
      <div class="hang-nut">
        <button class="nut" onclick="TD.di('tangkinh','${mon}')">Mở Tàng Kinh Các</button>
        <button class="nut phu" onclick="TD.di('luyencong')">Quay lại</button>
      </div>`));
    return;
  }

  const nut = [0, 1, 2, 3, 4].map(m => {
    const kd = TD.soCauKhaDung(mon, m === 0 ? null : m);
    const ten = m === 0 ? 'Tất cả' : `${TD.MUC[m].ten} <span class="mo-nhat">(${TD.MUC[m].ky})</span>`;
    return `<button class="nut ${m === 0 ? '' : 'phu'}" ${kd ? '' : 'disabled'}
      onclick="TD.batDauPhien('${mon}',${m},'luyen')">${ten}
      <span class="mo-nhat">· ${kd.toLocaleString('vi-VN')} câu</span></button>`;
  }).join('');
  const doDai = [15, 30, 50, 100].map(n =>
    `<button class="nut ${(TD.S.so_cau_phien || 30) === n ? 'kim' : 'phu'}" style="padding:6px 13px;font-size:12.5px"
      onclick="TD.S.so_cau_phien=${n};TD.luu();TD.chonMuc('${mon}')">${n} câu</button>`).join('');

  c.appendChild(el('div', 'the', `<h3>${M.icon} ${M.ten} — ${M.phai}</h3>
    <p class="mo-nhat">${M.slogan}</p>
    <p style="font-size:13px;color:var(--chu2);margin-top:10px">Cấu trúc đề: ${
      M.tuluan ? 'tự luận ' + M.phut + ' phút'
      : `Phần I ${M.p1} câu${M.p2 ? ' · Phần II ' + M.p2 + ' câu đúng/sai' : ''}${M.p3 ? ' · Phần III ' + M.p3 + ' câu trả lời ngắn' : ''} · ${M.phut} phút`}</p>
    <hr class="mo">
    <p style="font-size:13px;color:var(--tim);margin-bottom:9px">
      ♾ Môn này có <b>${TD.soMau(mon)} dạng bài tự sinh</b>, ghép ra
      <b>≈ ${TD.soCauKhaDung(mon).toLocaleString('vi-VN')} câu khác nhau</b>.
      Mỗi lần vào là đề mới — số liệu, mệnh đề và phương án nhiễu đều đổi.</p>
    <div style="font-size:12.5px;color:var(--chu2);margin-bottom:6px">Độ dài mỗi phiên:</div>
    <div class="hang-nut" style="margin:0 0 12px">${doDai}</div>
    <div class="hang-nut">${nut}</div>
    <div class="hang-nut"><button class="nut phu" onclick="TD.di('luyencong')">← Đổi môn</button></div>`));
};

/* ============================================================
   VÒNG CHƠI CHÍNH — PHIÊN LÀM CÂU HỎI
   che_do: 'luyen' | 'tamma' | 'dokiep'
   ============================================================ */
TD.batDauPhien = function (mon, muc, cheDo, danhSach, gioiHanPhut, soCauMuon) {
  let ds;
  if (danhSach) ds = danhSach;
  else {
    const soCau = soCauMuon || TD.S.so_cau_phien || 30;
    /* Ưu tiên chèn một phần câu viết tay (có lời giải chi tiết nhất),
       phần còn lại lấy từ bộ sinh — nhờ vậy phiên nào cũng đủ dài và không lặp. */
    const tinh = TD.xao(TD.layCauHoi(mon, muc || null)
      .map(q => ({ mon: mon, i: (TD.KHO[mon] || []).indexOf(q) })));
    const soTinh = Math.min(tinh.length, Math.round(soCau * 0.35));
    const sinh = TD.sinhNhieu(mon, muc || null, soCau - soTinh);
    ds = TD.xao(tinh.slice(0, soTinh).concat(sinh));
    /* không sinh được câu nào thì dùng toàn bộ câu cố định */
    if (!ds.length) ds = tinh;
  }
  if (!ds.length) { TD.bao('Không có câu hỏi phù hợp.', 'lua'); return; }

  TD.phien = {
    ds: ds, vt: 0, dung: 0, cheDo: cheDo, mon: mon,
    batDau: Date.now(),
    gioiHan: gioiHanPhut ? gioiHanPhut * 60000 : null,
    diem: 0, diemToiDa: 0, ketQua: []
  };
  TD.veCau();
};

TD.veCau = function () {
  const p = TD.phien, c = $('#noidung');
  if (p.vt >= p.ds.length) { TD.ketThucPhien(); return; }

  const m = p.ds[p.vt].mon;
  const q = TD.layCau(p.ds[p.vt]);
  if (!q) { p.vt++; TD.veCau(); return; }
  p.cauHienTai = q;
  const M = TD.MON[m], MU = TD.MUC[q.muc];
  c.innerHTML = '';

  /* thanh tiến trình + đồng hồ */
  const pt = Math.round((p.vt / p.ds.length) * 100);
  const dau = el('div', 'the', `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <div><b>${M.icon} ${M.ten}</b> <span class="mo-nhat">· câu ${p.vt + 1}/${p.ds.length}</span></div>
      <div>
        <span class="nhan m${q.muc}">${MU.ten}</span>
        <span class="nhan">${q.dang === 'mc' ? 'Phần I' : q.dang === 'ds' ? 'Phần II · Đúng/Sai' : 'Phần III · Trả lời ngắn'}</span>
        ${q._sinh ? '<span class="nhan" style="color:var(--tim);border-color:var(--tim)">Đề tự sinh</span>' : ''}
        ${p.gioiHan ? '<span class="nhan" id="dongho">--:--</span>' : ''}
      </div>
    </div>
    <div class="thanh thanh-nho" style="margin-top:9px"><i style="width:${pt}%"></i></div>`);
  c.appendChild(dau);

  /* thân câu hỏi */
  const than = el('div', 'the');
  than.appendChild(el('div', '', `<div style="font-size:12px;color:var(--chu3);margin-bottom:6px">${q.chuong || ''}</div>
    <div style="font-size:15.5px;line-height:1.65">${q.q}</div>`));
  const vung = el('div', '', ''); vung.style.marginTop = '14px';
  than.appendChild(vung);
  c.appendChild(than);

  if (q.dang === 'mc') TD.veMC(q, vung, m);
  else if (q.dang === 'ds') TD.veDS(q, vung, m);
  else TD.veTLN(q, vung, m);

  TD.veTui(q, vung, than);

  if (p.gioiHan) TD.chayDongHo();
};

TD.chayDongHo = function () {
  clearInterval(TD.dhTimer);
  TD.dhTimer = setInterval(() => {
    const p = TD.phien; if (!p || !p.gioiHan) { clearInterval(TD.dhTimer); return; }
    const con = p.gioiHan - (Date.now() - p.batDau);
    const o = document.getElementById('dongho');
    if (con <= 0) { clearInterval(TD.dhTimer); TD.bao('⏰ Hết giờ!', 'lua'); TD.ketThucPhien(); return; }
    if (o) {
      const ph = Math.floor(con / 60000), gi = Math.floor((con % 60000) / 1000);
      o.textContent = '⏱ ' + ph + ':' + String(gi).padStart(2, '0');
      o.style.color = con < 300000 ? 'var(--lua)' : '';
      /* nhắc một tiếng ở mốc 5 phút, rồi đếm từng giây trong 10 giây cuối */
      const giay = Math.ceil(con / 1000);
      if (giay !== p._giayCuoi) {
        p._giayCuoi = giay;
        if (giay === 300 || (giay <= 10 && giay > 0)) TD.keu('tich');
      }
    }
  }, 500);
};

/* ---------- THANH PHÁP BẢO ----------
   Mọi pháp bảo mua ở Động Phủ đều dùng được ngay tại đây.
   Thiên Cơ Phù chỉ hợp với câu 4 lựa chọn; Hồi Xuân Đan là bị động nên chỉ hiện trạng thái. */
TD.veTui = function (q, vung, than) {
  TD.S.tui = TD.S.tui || {};
  const tui = TD.S.tui;
  const thanh = el('div', 'tui-phap-bao', '');

  const nutPB = (khoa, dungDuoc, viSao, chay) => {
    const v = TD.VAT_PHAM[khoa], so = tui[khoa] || 0;
    const b = el('button', 'nut phu phap-bao', `${v.icon} ${v.ten} <span class="mo-nhat">×${so}</span>`);
    b.title = so <= 0 ? 'Hết — ra Động Phủ mua thêm' : (dungDuoc ? v.mo_ta : viSao);
    if (so <= 0 || !dungDuoc) b.disabled = true;
    else b.onclick = () => chay(b);
    thanh.appendChild(b);
    return b;
  };

  /* 🔮 Thiên Cơ Phù — loại 2 đáp án sai */
  nutPB('thien_co', q.dang === 'mc', 'Chỉ dùng được cho câu trắc nghiệm 4 lựa chọn.', b => {
    tui.thien_co--;
    const sai = [0, 1, 2, 3].filter(i => i !== q.ans);
    TD.xao(sai).slice(0, 2).forEach(i => {
      const x = vung.querySelectorAll('.dapan')[i];
      if (x) { x.classList.add('mo'); x.disabled = true; }
    });
    b.remove(); TD.luu(); TD.keu('phapbao');
    TD.bao('🔮 Thiên Cơ Phù đã xoá 2 đáp án nhiễu.', 'tim');
  });

  /* 🪞 Truy Hồn Kính — soi lời giải trước khi trả lời */
  nutPB('truy_hon', !!(q.giai || q.meo), 'Câu này không có lời giải chi tiết.', b => {
    tui.truy_hon--;
    q._soiGuong = true;
    b.remove(); TD.luu(); TD.keu('phapbao');
    than.appendChild(el('div', 'the vien-tim', `
      <b style="color:var(--tim)">🪞 Truy Hồn Kính — soi thấu câu này</b>
      ${q.giai ? `<div class="giai">${q.giai}</div>` : ''}
      ${q.meo ? `<div class="meo">${q.meo}</div>` : ''}
      <p class="mo-nhat tren12">Đã soi gương nên câu này không tính linh khí, và vẫn bị xếp lại lịch ôn.</p>`));
  });

  /* 🍵 Ngộ Đạo Trà — nhân đôi linh khí 10 câu */
  const conTra = TD.S.ngo_dao_con || 0;
  const bTra = nutPB('ngo_dao', conTra <= 0, `Đang có hiệu lực — còn ${conTra} câu.`, b => {
    tui.ngo_dao--;
    TD.S.ngo_dao_con = 10;
    b.disabled = true;
    b.innerHTML = `🍵 Ngộ Đạo Trà <span class="mo-nhat">còn 10 câu</span>`;
    TD.luu(); TD.keu('phapbao');
    TD.bao('🍵 Ngộ Đạo Trà — linh khí ×2 trong 10 câu kế!', 'ngoc');
  });
  if (conTra > 0) bTra.innerHTML = `🍵 Ngộ Đạo Trà <span class="mo-nhat">còn ${conTra} câu</span>`;

  /* 💊 Hồi Xuân Đan — bị động, tự nổ khi trả lời sai */
  const soDan = tui.hoi_xuan || 0;
  thanh.appendChild(el('span', 'nhan phap-bao-bi-dong',
    `💊 Hồi Xuân Đan ×${soDan}${soDan > 0 ? ' · tự giữ chuỗi khi sai' : ''}`));

  than.appendChild(thanh);
};

/* ---------- DẠNG 1: TRẮC NGHIỆM 4 LỰA CHỌN ---------- */
TD.veMC = function (q, vung, mon) {
  const KY = ['A', 'B', 'C', 'D'];
  q.opts.forEach((o, i) => {
    const b = el('button', 'dapan', `<span class="ky">${KY[i]}</span>${o}`);
    b.onclick = () => {
      const nut = vung.querySelectorAll('.dapan');
      nut.forEach((x, j) => {
        x.disabled = true;
        if (j === q.ans) x.classList.add('dung');
        else if (j === i) x.classList.add('sai');
      });
      TD.chotCau(q, mon, i === q.ans, i === q.ans ? 1 : 0, 1);
    };
    vung.appendChild(b);
  });
};

/* ---------- DẠNG 2: ĐÚNG / SAI 4 Ý ---------- */
TD.veDS = function (q, vung, mon) {
  const chon = [null, null, null, null];
  q.items.forEach((it, i) => {
    const d = el('div', 'ds-y', `<div class="noi"><b>${'abcd'[i]})</b> ${it.t}</div>
      <div class="ds-nut">
        <button data-i="${i}" data-v="1">Đúng</button>
        <button data-i="${i}" data-v="0">Sai</button>
      </div>`);
    vung.appendChild(d);
  });
  vung.querySelectorAll('.ds-nut button').forEach(b => {
    b.onclick = () => {
      const i = +b.dataset.i;
      chon[i] = b.dataset.v === '1';
      vung.querySelectorAll(`.ds-nut button[data-i="${i}"]`).forEach(x => x.classList.remove('chon'));
      b.classList.add('chon');
      nutNop.disabled = chon.some(x => x === null);
    };
  });

  const nutNop = el('button', 'nut', 'Nộp câu này');
  nutNop.disabled = true; nutNop.style.marginTop = '12px';
  nutNop.onclick = () => {
    let soDung = 0;
    q.items.forEach((it, i) => {
      const d = vung.querySelectorAll('.ds-y')[i];
      const ok = chon[i] === it.a;
      if (ok) soDung++;
      d.classList.add(ok ? 'dung' : 'sai');
      d.querySelector('.noi').innerHTML +=
        ` <span class="nhan" style="color:${it.a ? 'var(--dung)' : 'var(--lua)'};border-color:currentColor">Đáp án: ${it.a ? 'Đúng' : 'Sai'}</span>`;
    });
    vung.querySelectorAll('.ds-nut button').forEach(x => x.disabled = true);
    nutNop.remove();
    /* thang điểm chính thức: 1 ý 0,1 · 2 ý 0,25 · 3 ý 0,5 · 4 ý 1,0 */
    const bang = [0, 0.1, 0.25, 0.5, 1];
    TD.chotCau(q, mon, soDung === 4, bang[soDung], 1, `Đúng <b>${soDung}/4</b> ý → <b>${bang[soDung]}</b> điểm`);
  };
  vung.appendChild(nutNop);
};

/* ---------- DẠNG 3: TRẢ LỜI NGẮN ---------- */
TD.veTLN = function (q, vung, mon) {
  const o = el('input', 'o-nhap');
  o.placeholder = 'Nhập đáp án…'; o.autocomplete = 'off';
  vung.appendChild(o);
  const nutNop = el('button', 'nut', 'Nộp đáp án');
  nutNop.style.margin = '12px 0 0 9px';
  const nop = () => {
    const ok = TD.khopTLN(o.value, q.ans);
    o.disabled = true; nutNop.remove();
    o.style.borderColor = ok ? 'var(--dung)' : 'var(--lua)';
    vung.appendChild(el('div', '', `<div style="margin-top:10px">Đáp án đúng: <b style="color:var(--kim);font-size:17px">${q.ans}</b></div>`));
    TD.chotCau(q, mon, ok, ok ? 1 : 0, 1);
  };
  nutNop.onclick = nop;
  o.onkeydown = e => { if (e.key === 'Enter') nop(); };
  vung.appendChild(nutNop);
  setTimeout(() => o.focus(), 80);
};

/* ---------- CHỐT MỘT CÂU ---------- */
TD.chotCau = function (q, mon, dung, diem, diemToiDa, ghiChu) {
  const p = TD.phien;
  p.diem += diem; p.diemToiDa += diemToiDa;
  if (dung) p.dung++;
  p.ketQua.push({ mon: mon, muc: q.muc, chuong: q.chuong, de: q.q, dung: dung, diem: diem });

  /* đã soi Truy Hồn Kính thì không tính là tự làm được */
  const soi = !!q._soiGuong;
  document.querySelectorAll('.phap-bao').forEach(b => { b.disabled = true; });

  TD.ghiNhan(mon, q.muc, dung, soi);
  TD.SRS.capNhat(TD.idThe(p.ds[p.vt]), soi ? false : dung);

  /* tiếng phản hồi: chuỗi càng dài chuông càng cao, mốc 5 câu thì reo hẳn một quãng */
  if (dung) {
    if (TD.S.chuoi > 0 && TD.S.chuoi % 5 === 0) TD.keu('chuoi');
    else TD.keu('dung', TD.S.chuoi);
  } else if (diem > 0) TD.keu('vua');
  else TD.keu('sai');

  /* thưởng linh khí & linh thạch */
  let exp = 0, ls = 0, x2 = false;
  if (dung) {
    exp = TD.MUC[q.muc].exp;
    if (p.cheDo === 'tamma') exp = Math.round(exp * 1.5);      /* ôn lại thẻ khó được thưởng thêm */
    if (TD.S.chuoi >= 10) exp = Math.round(exp * 1.2);
  } else if (diem > 0) {
    exp = Math.round(TD.MUC[q.muc].exp * diem);                /* câu đúng/sai được điểm một phần */
  }
  if (soi) exp = 0;                                            /* soi gương thì miễn thưởng */
  /* 🍵 Ngộ Đạo Trà — nhân đôi linh khí, trừ dần từng câu */
  if (TD.S.ngo_dao_con > 0) {
    if (exp) { exp *= 2; x2 = true; }
    TD.S.ngo_dao_con--;
    if (TD.S.ngo_dao_con === 0) TD.bao('🍵 Ngộ Đạo Trà đã tan.');
  }
  if (exp && dung) { ls = Math.max(1, Math.round(exp / 5)); TD.S.linh_thach += ls; }
  const dotPha = exp ? TD.themExp(exp) : false;

  /* khu vực lời giải */
  const c = $('#noidung');
  const box = el('div', 'the ' + (dung ? 'vien-ngoc' : 'vien-lua'));
  box.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <b style="color:${dung ? 'var(--dung)' : 'var(--lua)'};font-size:16px">
        ${dung ? '✓ Chính xác' : (diem > 0 ? '◐ Đúng một phần' : '✗ Chưa đúng')}</b>
      <div>${exp ? `<span class="nhan" style="color:var(--ngoc);border-color:var(--ngoc)">+${exp} linh khí${x2 ? ' 🍵×2' : ''}</span>` : ''}
      ${soi ? '<span class="nhan" style="color:var(--tim);border-color:var(--tim)">🪞 đã soi — không tính linh khí</span>' : ''}
      ${ls ? `<span class="nhan" style="color:var(--kim);border-color:var(--kim)">+${ls} 💎</span>` : ''}</div>
    </div>
    ${ghiChu ? `<div style="margin-top:7px">${ghiChu}</div>` : ''}
    ${q.giai ? `<div class="giai">${q.giai}</div>` : ''}
    ${q.meo ? `<div class="meo">${q.meo}</div>` : ''}
    ${!dung ? `<p class="mo-nhat tren12">👹 Câu này đã hoá thành <b>tâm ma</b>. Nó sẽ quay lại tìm bạn — hãy trấn áp nó ở màn Tâm Ma Kiếp.</p>` : ''}`;

  const nut = el('div', 'hang-nut');
  const tiep = el('button', 'nut', p.vt + 1 >= p.ds.length ? 'Kết thúc' : 'Câu tiếp theo →');
  tiep.onclick = () => { p.vt++; TD.veCau(); };
  nut.appendChild(tiep);
  const thoat = el('button', 'nut phu', 'Dừng phiên');
  thoat.onclick = () => TD.ketThucPhien();
  nut.appendChild(thoat);
  box.appendChild(nut);
  c.appendChild(box);
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  if (dotPha) TD.bao('☯ Đột phá cảnh giới!', 'kim');

  /* lưu tiến độ bộ đề Tà Đạo để lần sau vào là học tiếp, không phải làm lại từ đầu */
  if (p.taDao) {
    TD.S.ta_dao_tien = TD.S.ta_dao_tien || {};
    TD.S.ta_dao_tien[p.taDao.khoa] = { vt: p.vt + 1, dung: p.dung, tong: p.ds.length };
  }
  TD.luu();
};

/* ---------- KẾT THÚC PHIÊN ---------- */
TD.ketThucPhien = function () {
  clearInterval(TD.dhTimer);
  const p = TD.phien; if (!p) { TD.di('dongphu'); return; }
  const c = $('#noidung'); c.innerHTML = '';
  const soLam = p.ketQua.length;
  const pt = soLam ? Math.round((p.dung / soLam) * 100) : 0;
  const phut = Math.round((Date.now() - p.batDau) / 60000);

  let tieuDe = '📕 Kết thúc phiên luyện công', them = '';
  if (p.taDao) {
    const t = p.taDao, xong = p.vt >= p.ds.length;
    if (xong) {
      TD.ghiTaDao(t.mon, t.so, t.loai, p.dung, p.ds.length);
      if (TD.S.ta_dao_tien) delete TD.S.ta_dao_tien[t.khoa];
      const pt2 = Math.round((p.dung / p.ds.length) * 100);
      tieuDe = pt2 >= 80 ? '☠️ TÀ ĐẠO — QUA ẢI' : '☠️ Tà Đạo — chưa qua ải';
      them = `<p style="color:var(--chu2)">Bộ đề <b>${t.loai === 'lythuyet' ? 'Lý thuyết' : 'Bài tập'} số ${t.so}</b> môn ${TD.MON[t.mon].ten}.
        ${pt2 >= 80 ? 'Đạt chuẩn qua ải (≥ 80%). Sang bộ đề tiếp theo.' : 'Chưa đạt 80%. Xem lại các câu sai rồi làm lại bộ đề này.'}</p>`;
    } else {
      tieuDe = '☠️ Tạm dừng Tà Đạo';
      them = `<p style="color:var(--chu2)">Đã lưu tiến độ ở câu <b>${p.vt}/${p.ds.length}</b>.
        Lần sau vào bộ đề này sẽ học tiếp từ đúng chỗ đang dở.</p>`;
    }
  }
  if (p.cheDo === 'dokiep') {
    const M = TD.MON[p.mon];
    const diem10 = Math.round(p.diem * 10) / 10;
    const K = p.kiep || TD.kiepTheoCanhGioi(TD.S.exp);
    const dat = diem10 >= K.nguong;
    tieuDe = dat ? '⚡ VƯỢT KIẾP THÀNH CÔNG' : '☁ Kiếp chưa qua';
    TD.S.do_kiep[p.mon] = TD.S.do_kiep[p.mon] || [];
    TD.S.do_kiep[p.mon].push({ ngay: TD.homNay(), diem: diem10, cap: K.cap });
    const capSau = (TD.KIEP || []).find(k => k.cap === K.cap + 1);
    them = `<div class="giua tren12">
      <div class="so-to" style="font-size:52px;color:${dat ? 'var(--dung)' : 'var(--kim)'}">${diem10}</div>
      <div class="so-nhan">điểm / 10 · môn ${M.ten} · ${K.ten}</div>
      <p style="color:var(--chu2);margin-top:10px">${dat
        ? `Vượt qua ${K.ten} (ngưỡng ${TD.soVN(K.nguong, 1)}).${capSau
            ? ` Muốn nặng hơn thì chọn <b>${capSau.ten}</b> — ${capSau.nhan}.`
            : ' Đây đã là tầng kiếp nặng nhất — không còn gì để sợ ở phòng thi.'}`
        : `Chưa đạt ngưỡng ${TD.soVN(K.nguong, 1)} của ${K.ten}. Xem lại các câu sai ở màn Tâm Ma Kiếp rồi thử lại${
            K.cap > 1 ? `, hoặc hạ xuống cấp ${K.cap - 1} cho chắc nền` : ''}.`}</p></div>`;
    TD.keu(dat ? 'thangkiep' : 'batkiep');
    if (dat) {
      const thuong = 60 + K.cap * 40;
      TD.S.linh_thach += thuong;
      TD.bao('💎 +' + thuong + ' linh thạch vượt ' + K.ten + '!', 'kim');
    }
  }

  c.appendChild(el('div', 'the vien-kim', `<h3>${tieuDe}</h3>${them}
    <div style="display:flex;gap:26px;flex-wrap:wrap;margin-top:14px">
      <div><div class="so-to">${p.dung}/${soLam}</div><div class="so-nhan">câu đúng</div></div>
      <div><div class="so-to" style="color:${pt >= 80 ? 'var(--dung)' : pt >= 50 ? 'var(--kim)' : 'var(--lua)'}">${pt}%</div><div class="so-nhan">chính xác</div></div>
      <div><div class="so-to">${phut}</div><div class="so-nhan">phút</div></div>
      <div><div class="so-to">${TD.S.chuoi}</div><div class="so-nhan">chuỗi hiện tại</div></div>
    </div>
    <div class="hang-nut">
      <button class="nut" onclick="TD.di('dongphu')">Về Động Phủ</button>
      <button class="nut phu" onclick="TD.di('luyencong')">Luyện tiếp</button>
      ${TD.SRS.denHan().length ? `<button class="nut lua" onclick="TD.di('tamma')">Trấn áp tâm ma (${TD.SRS.denHan().length})</button>` : ''}
    </div>`));

  /* danh sách câu sai để xem lại */
  const sai = p.ketQua.filter(k => !k.dung);
  if (sai.length) {
    const ds = sai.map(k =>
      `<li style="margin-bottom:9px"><b>${k.chuong}</b> · ${TD.MUC[k.muc].ten}<br>
        <span style="font-size:13.3px;color:var(--chu2)">${String(k.de).replace(/<[^>]+>/g, '').slice(0, 130)}…</span></li>`
    ).join('');
    c.appendChild(el('div', 'the vien-lua', `<h3>📓 Ghi vào sổ lỗi sai (${sai.length} câu)</h3>
      <ol style="padding-left:20px;margin:8px 0">${ds}</ol>
      <p class="mo-nhat">Hãy chép các câu này vào sổ lỗi sai thật của bạn, ghi rõ <b>sai vì gì</b> — đó là thứ tạo ra khác biệt giữa 8 và 9,5 điểm.</p>`));
  }
  TD.phien = null;
  TD.luu();
};

/* ============================================================
   MÀN 3 — TÂM MA KIẾP (ôn giãn cách)
   ============================================================ */
TD.man_tamma = function (c) {
  const han = TD.SRS.denHan();
  const hopLe = han.filter(id => TD.theThanhMuc(id) !== null);

  c.appendChild(el('div', 'the vien-lua', `<h3>👹 Tâm Ma Kiếp</h3>
    <p class="mo-nhat">Mỗi câu trả lời sai đọng lại thành tâm ma. Hệ thống dùng <b>thuật toán ôn giãn cách</b>:
    trả lời đúng thì khoảng cách ôn lại giãn dần (1 → 3 → 8 → 20 ngày…), trả lời sai thì nó quay lại ngay.
    Đây là cách chống quên hiệu quả nhất — và là nơi <b>linh khí nhận được ×1,5</b>.</p>
    <div style="display:flex;gap:26px;flex-wrap:wrap;margin-top:14px">
      <div><div class="so-to" style="color:${hopLe.length ? 'var(--lua)' : 'var(--dung)'}">${hopLe.length}</div><div class="so-nhan">đang chờ</div></div>
      <div><div class="so-to">${TD.SRS.sapToi(1)}</div><div class="so-nhan">trong 24h tới</div></div>
      <div><div class="so-to">${TD.SRS.sapToi(7)}</div><div class="so-nhan">trong 7 ngày tới</div></div>
      <div><div class="so-to">${Object.keys(TD.S.the).length}</div><div class="so-nhan">tổng số thẻ</div></div>
    </div>
    ${hopLe.length
      ? `<div class="hang-nut"><button class="nut lua" id="tm-batdau">Trấn áp ${hopLe.length} tâm ma</button></div>`
      : '<p class="tren12" style="color:var(--dung)">✓ Tâm cảnh thanh tịnh. Chưa có tâm ma nào đến hạn.</p>'}`));

  if (hopLe.length) {
    $('#tm-batdau').onclick = () => {
      const ds = TD.xao(hopLe).map(TD.theThanhMuc).filter(Boolean);
      TD.batDauPhien(null, null, 'tamma', ds);
    };
  }

  /* các thẻ sai nhiều nhất */
  const kho = Object.keys(TD.S.the)
    .map(id => ({ id: id, t: TD.S.the[id] }))
    .filter(x => x.t.sai >= 2)
    .sort((a, b) => b.t.sai - a.t.sai).slice(0, 10);
  if (kho.length) {
    const ds = kho.map(x => {
      const it = TD.theThanhMuc(x.id); if (!it) return '';
      const q = TD.layCau(it); if (!q) return '';
      return `<li style="margin-bottom:7px"><span class="nhan m${q.muc}">${TD.MON[it.mon].ten}</span>
        <b>${q.chuong}</b>${it.g ? ' <span class="mo-nhat">(dạng bài)</span>' : ''} — sai <b style="color:var(--lua)">${x.t.sai}</b> lần</li>`;
    }).join('');
    c.appendChild(el('div', 'the', `<h3>🔥 Tâm ma cứng đầu nhất</h3>
      <ol style="padding-left:20px">${ds}</ol>
      <p class="mo-nhat">Đây là những chỗ bạn <b>lặp lại lỗi cũ</b>. Ưu tiên xử lí dứt điểm chúng.</p>`));
  }
};

/* ============================================================
   MÀN 4 — TÀNG KINH CÁC (khẩu quyết & công thức)
   ============================================================ */
TD.NGUON_LT = {
  hoa:  [['hoa_kq', '88 Khẩu quyết trọng điểm'], ['hoa_cam', '📕 Cấm Thư — mẹo phòng thi'], ['hoa_ct', 'Bí kíp giải nhanh']],
  toan: [['toan_cam', '📕 Cấm Thư — mẹo phòng thi'], ['toan_ct', 'Công thức Toán 12']],
  ly:   [['ly_cam', '📕 Cấm Thư — mẹo phòng thi'], ['ly_ct', 'Công thức Vật lí']],
  sinh: [['sinh_cam', '📕 Cấm Thư — mẹo phòng thi'], ['sinh_ct', 'Công thức Sinh học']],
  su:   [['su_cam', '📕 Cấm Thư — mẹo phòng thi'], ['su_ct', 'Lịch sử trọng điểm']],
  dia:  [['dia_cam', '📕 Cấm Thư — mẹo phòng thi'], ['dia_ct', 'Địa lí trọng điểm']],
  gdkt: [['gdkt_cam', '📕 Cấm Thư — mẹo phòng thi'], ['gdkt_ct', 'GDKT & Pháp luật']],
  van:  [['van_cam', '📕 Cấm Thư — mẹo phòng thi'], ['van_ct', 'Kỹ năng Ngữ văn']],
  anh:  [['anh_cam', '📕 Cấm Thư — mẹo phòng thi'], ['anh_ct', 'Ngữ pháp & mẹo Tiếng Anh']]
};

TD.man_tangkinh = function (c) {
  const mon = TD.tham || TD.monTK || 'hoa';
  TD.monTK = mon;

  const chon = TD.THU_TU_MON.map(m =>
    `<button class="nut ${m === mon ? '' : 'phu'}" style="padding:8px 13px;font-size:13px"
      onclick="TD.monTK='${m}';TD.nhomTK=null;TD.di('tangkinh')">${TD.MON[m].icon} ${TD.MON[m].ten}</button>`).join('');
  c.appendChild(el('div', 'the', `<h3>📜 Tàng Kinh Các</h3>
    <p class="mo-nhat">Toàn bộ lý thuyết trọng điểm, công thức và mẹo nhớ nhanh. Bấm vào một mục để mở nội dung đầy đủ.</p>
    <div class="hang-nut">${chon}</div>`));

  /* Kho từ vựng chỉ có ở môn Anh và phải tra cứu được, không thể chỉ nằm sau câu hỏi */
  if (mon === 'anh') {
    const soTu = (TD.KHO_TU || []).length, soCol = (TD.KHO_COLLOC || []).length;
    const cdTu = new Set((TD.KHO_TU || []).map(x => x.cd)).size;
    const boxTV = el('div', 'the vien-kim', `
      <h3>📚 Kho từ vựng & Collocation</h3>
      <p style="font-size:13.5px;color:var(--chu2);margin:6px 0 0">
        <b style="color:var(--kim)">${soTu.toLocaleString('vi-VN')}</b> từ theo
        <b>${cdTu}</b> chủ đề và <b style="color:var(--kim)">${soCol}</b> collocation —
        tra được, lọc được, học được, không phải chỉ để sinh câu hỏi.</p>`);
    const hn = el('div', 'hang-nut', '');
    const b1 = el('button', 'nut kim', '📖 Mở kho từ vựng');
    b1.onclick = () => TD.manTuVung('tu');
    const b2 = el('button', 'nut', '🔗 Mở kho collocation');
    b2.onclick = () => TD.manTuVung('colloc');
    hn.appendChild(b1); hn.appendChild(b2);
    boxTV.appendChild(hn);
    c.appendChild(boxTV);
  }

  (TD.NGUON_LT[mon] || []).forEach(([khoa, ten]) => {
    const ds = TD.KHO[khoa] || [];
    if (!ds.length) return;

    /* gom nhóm */
    const nhom = {};
    ds.forEach((x, i) => {
      const k = x.chu_de ? (x.cap ? 'Khẩu quyết' : 'Khác') : (x.nhom || 'Khác');
      const key = x.nhom || 'Khẩu quyết trọng điểm';
      (nhom[key] = nhom[key] || []).push({ x: x, i: i });
    });

    const box = el('div', khoa.endsWith('_cam') ? 'the vien-tim' : 'the vien-ngoc');
    box.appendChild(el('h3', '', `${ten} <span class="mo-nhat">(${ds.length} mục)</span>`));

    Object.keys(nhom).forEach(k => {
      const g = el('div', ''); g.style.marginBottom = '14px';
      g.appendChild(el('div', '', `<div style="color:var(--kim);font-weight:700;font-size:13.5px;margin:12px 0 7px">${k}</div>`));
      nhom[k].forEach(({ x, i }) => {
        const ten2 = x.ten || (x.so ? `${x.so}. ${x.chu_de}` : x.chu_de);
        const b = el('button', 'dapan', `
          <div style="display:flex;justify-content:space-between;gap:9px;align-items:center">
            <span>${ten2}</span>
            <span style="flex:0 0 auto">
              ${x.moi ? '<span class="nhan moi">MỚI</span>' : ''}
              ${x.cap ? `<span class="nhan m${x.cap}">${TD.MUC[x.cap].ten}</span>` : ''}
            </span>
          </div>`);
        b.onclick = () => TD.moThe(khoa, i);
        g.appendChild(b);
      });
      box.appendChild(g);
    });
    c.appendChild(box);
  });
};

/* ============================================================
   KHO TỪ VỰNG TIẾNG ANH — TRA CỨU & HỌC
   Hơn hai nghìn từ nên phải có lọc chủ đề, lọc loại từ và ô tìm
   kiếm; danh sách dài thì cắt trang, bấm mới hiện thêm.
   ============================================================ */
TD.TV = { cd: null, loai: null, tim: '', hien: 120, nhom: null };

TD.manTuVung = function (che) {
  TD.TV.che = che || TD.TV.che || 'tu';
  const c = $('#noidung'); c.innerHTML = '';
  const laTu = TD.TV.che === 'tu';
  const kho = laTu ? (TD.KHO_TU || []) : (TD.KHO_COLLOC || []);

  const dau = el('div', 'the vien-kim', `<h3>${laTu ? '📚 Kho từ vựng Tiếng Anh' : '🔗 Kho Collocation'}</h3>
    <p class="mo-nhat">${laTu
      ? 'Từ vựng thường gặp trong đề thi tốt nghiệp, gom theo chủ đề. Gõ tiếng Anh hoặc tiếng Việt đều tìm được.'
      : 'Những cụm từ đi liền nhau mà đề hay hỏi. Học theo cụm chứ đừng học từ lẻ — đề không bao giờ hỏi từ đứng một mình.'}</p>`);
  const doiChe = el('div', 'hang-nut', '');
  [['tu', '📚 Từ vựng'], ['colloc', '🔗 Collocation']].forEach(([k, t]) => {
    const b = el('button', 'nut ' + (TD.TV.che === k ? 'kim' : 'phu'), t);
    b.style.padding = '7px 13px'; b.style.fontSize = '12.6px';
    b.onclick = () => { TD.TV.che = k; TD.TV.cd = null; TD.TV.nhom = null; TD.TV.tim = ''; TD.TV.hien = 120; TD.manTuVung(k); };
    doiChe.appendChild(b);
  });
  dau.appendChild(doiChe);
  c.appendChild(dau);

  /* ---- bộ lọc ---- */
  const loc = el('div', 'the', '');
  const oTim = el('input', 'o-nhap');
  oTim.placeholder = laTu ? 'Tìm từ hoặc nghĩa tiếng Việt…' : 'Tìm cụm hoặc nghĩa…';
  oTim.value = TD.TV.tim; oTim.style.width = '100%'; oTim.autocomplete = 'off';
  loc.appendChild(oTim);

  const nhomKhoa = laTu ? 'cd' : 'nhom';
  const dsNhom = [];
  const demNhom = {};
  kho.forEach(x => { demNhom[x[nhomKhoa]] = (demNhom[x[nhomKhoa]] || 0) + 1; });
  Object.keys(demNhom).forEach(k => dsNhom.push(k));

  const hangNhom = el('div', 'hang-nut', '');
  hangNhom.style.marginTop = '10px';
  const nutNhom = (gt, ten) => {
    const dangChon = (laTu ? TD.TV.cd : TD.TV.nhom) === gt;
    const b = el('button', 'nut ' + (dangChon ? 'kim' : 'phu'), ten);
    b.style.padding = '5px 10px'; b.style.fontSize = '11.8px';
    b.onclick = () => {
      if (laTu) TD.TV.cd = gt; else TD.TV.nhom = gt;
      TD.TV.hien = 120; TD.TV.tim = oTim.value; TD.manTuVung(TD.TV.che);
    };
    hangNhom.appendChild(b);
  };
  nutNhom(null, `Tất cả (${kho.length})`);
  dsNhom.forEach(k => nutNhom(k, `${k} (${demNhom[k]})`));
  loc.appendChild(hangNhom);

  if (laTu) {
    const hangLoai = el('div', 'hang-nut', '');
    hangLoai.style.marginTop = '8px';
    [[null, 'Mọi loại từ'], ['n', 'Danh từ'], ['v', 'Động từ'], ['adj', 'Tính từ'], ['adv', 'Trạng từ'], ['phr', 'Cụm từ']]
      .forEach(([gt, ten]) => {
        const b = el('button', 'nut ' + (TD.TV.loai === gt ? 'kim' : 'phu'), ten);
        b.style.padding = '5px 10px'; b.style.fontSize = '11.8px';
        b.onclick = () => { TD.TV.loai = gt; TD.TV.hien = 120; TD.TV.tim = oTim.value; TD.manTuVung('tu'); };
        hangLoai.appendChild(b);
      });
    loc.appendChild(hangLoai);
  }
  c.appendChild(loc);

  /* ---- danh sách ---- */
  const ra = el('div', 'the', '');
  c.appendChild(ra);

  const ve = () => {
    const q = TD.khongDau(TD.TV.tim.trim());
    let ds = kho;
    if (laTu) {
      if (TD.TV.cd) ds = ds.filter(x => x.cd === TD.TV.cd);
      if (TD.TV.loai) ds = ds.filter(x => x.l === TD.TV.loai);
      if (q) ds = ds.filter(x => TD.khongDau(x.w).indexOf(q) >= 0 || TD.khongDau(x.n).indexOf(q) >= 0);
    } else {
      if (TD.TV.nhom) ds = ds.filter(x => x.nhom === TD.TV.nhom);
      if (q) ds = ds.filter(x => TD.khongDau(x.tu + ' ' + x.cum).indexOf(q) >= 0 || TD.khongDau(x.n).indexOf(q) >= 0);
    }
    ra.innerHTML = '';
    ra.appendChild(el('div', 'mo-nhat', `Tìm thấy <b style="color:var(--kim)">${ds.length}</b> mục`
      + (ds.length > TD.TV.hien ? ` · đang hiện ${TD.TV.hien}` : '')));
    if (!ds.length) {
      ra.appendChild(el('p', '', 'Không có mục nào khớp. Thử từ khoá ngắn hơn.'));
      return;
    }
    const bang = el('div', 'bang-tu', '');
    ds.slice(0, TD.TV.hien).forEach(x => {
      bang.appendChild(el('div', 'dong-tu', laTu
        ? `<div><b class="tu-en">${x.w}</b> <span class="nhan loai-tu">${x.l}</span></div>
           <div class="tu-vi">${x.n}</div>`
        : `<div><b class="tu-en">${x.tu} ${x.cum}</b></div>
           <div class="tu-vi">${x.n}</div>`));
    });
    ra.appendChild(bang);
    if (ds.length > TD.TV.hien) {
      const b = el('button', 'nut phu', `Hiện thêm ${Math.min(200, ds.length - TD.TV.hien)} mục nữa`);
      b.onclick = () => { TD.TV.hien += 200; ve(); };
      ra.appendChild(b);
    }
  };
  ve();

  let hen;
  oTim.oninput = () => {
    clearTimeout(hen);
    hen = setTimeout(() => { TD.TV.tim = oTim.value; TD.TV.hien = 120; ve(); }, 180);
  };

  const cuoi = el('div', 'hang-nut', '');
  const bKT = el('button', 'nut kim', '📝 Kiểm tra 50 câu từ vựng & collocation');
  bKT.onclick = () => TD.kiemTraTuVung();
  cuoi.appendChild(bKT);
  const bVe = el('button', 'nut phu', '← Về Tàng Kinh Các');
  bVe.onclick = () => { TD.monTK = 'anh'; TD.di('tangkinh'); };
  cuoi.appendChild(bVe);
  c.appendChild(el('div', 'the', '')).appendChild(cuoi);
  window.scrollTo(0, 0);
};

/* Kiểm tra nhanh riêng phần từ vựng — chỉ lấy các mẫu đề dùng kho từ */
TD.kiemTraTuVung = function () {
  const ma = ['anh-nghia', 'anh-tu', 'anh-wordform', 'anh-colloc', 'anh-colloc-cum', 'anh-colloc-nghia', 'anh-gioitu'];
  const mau = (TD.GEN.anh || []).filter(t => ma.indexOf(t.ma) >= 0);
  if (!mau.length) { TD.bao('Chưa có mẫu đề từ vựng.', 'lua'); return; }
  const ds = [];
  for (let k = 0; ds.length < 50 && k < 400; k++) {
    const t = mau[k % mau.length];
    const s = (Math.random() * 4294967295) >>> 0;
    if (TD.sinhCau(t, s)) ds.push({ mon: 'anh', g: t.ma, s: s });
  }
  TD.batDauPhien('anh', null, 'luyen', TD.xao(ds));
};

TD.moThe = function (khoa, i) {
  const x = TD.KHO[khoa][i];
  const c = $('#noidung'); c.innerHTML = '';
  const ten = x.ten || (x.so ? `${x.so}. ${x.chu_de}` : x.chu_de);

  let than = '';
  if (x.hoi) {
    /* thẻ khẩu quyết: mặt hỏi – mặt đáp */
    than = `<div style="font-size:15px;color:var(--chu2);font-style:italic;margin-bottom:12px">❓ ${x.hoi}</div>
      <div class="cuon-ngang">${x.dap}</div>`;
  } else {
    than = `<div class="cuon-ngang">${x.ct}</div>
      ${x.khi ? `<div style="margin-top:12px;font-size:13.6px"><b style="color:var(--ngoc)">Khi nào dùng:</b> ${x.khi}</div>` : ''}
      ${x.vd ? `<div class="giai"><b>Ví dụ:</b> ${x.vd}</div>` : ''}`;
  }

  c.appendChild(el('div', 'the vien-kim', `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:9px;flex-wrap:wrap">
      <h3 style="margin:0">${ten}</h3>
      <div>${x.moi ? '<span class="nhan moi">CHƯƠNG TRÌNH MỚI</span>' : ''}
      ${x.cap ? `<span class="nhan m${x.cap}">${TD.MUC[x.cap].ten}</span>` : ''}</div>
    </div>
    <hr class="mo">${than}
    ${x.meo ? `<div class="meo">${x.meo}</div>` : ''}
    ${x.bay ? `<div class="dc" style="border-left-color:var(--tim)"><b style="color:var(--tim)">BẪY:</b> ${x.bay}</div>` : ''}
    ${x.dc ? `<div class="dc">${x.dc}</div>` : ''}
    <div class="hang-nut">
      <button class="nut" id="tk-khac">✅ Đã thuộc — khắc cốt ghi tâm</button>
      <span id="tk-thu"></span>
      <button class="nut phu" onclick="TD.di('tangkinh')">← Quay lại</button>
    </div>`));

  /* Kiểm tra ngay: chỉ ra câu ĐÚNG chuyên đề của thẻ vừa đọc.
     Không ghép được chuyên đề (thẻ kỹ thuật xuyên suốt) thì nói thẳng là kiểm tra
     tổng hợp cả môn, chứ không gán bừa một chủ đề rồi hỏi lạc đề. */
  const monTK = TD.monTK || 'hoa';
  const khoLT = TD.KHO_LT[monTK] || [];
  const khop = TD.chuDeCuaThe(monTK, x);
  if (khoLT.length >= 8) {
    const du = khop && khoLT.filter(z => z.cd === khop).length >= 4;
    const nut2 = el('button', 'nut kim', du
      ? `📝 Kiểm tra ngay — ${khop}`
      : `📝 Kiểm tra tổng hợp ${TD.MON[monTK].ten}`);
    nut2.onclick = () => TD.kiemTraNhanh(monTK, du ? khop : null);
    $('#tk-thu').replaceWith(nut2);
  }

  $('#tk-khac').onclick = () => {
    const id = khoa + '#' + i;
    if (TD.S.da_khac[id]) { TD.bao('Bạn đã khắc cốt mục này rồi.'); return; }
    TD.S.da_khac[id] = TD.homNay();
    TD.themExp(15); TD.S.linh_thach += 3;
    TD.keu('khac');
    TD.bao('📜 +15 linh khí · +3 💎 — khắc cốt ghi tâm!', 'kim');
    TD.luu(); TD.di('tangkinh');
  };
};

/* ============================================================
   MÀN 5 — ĐỘ KIẾP (đề mô phỏng đúng cấu trúc, bấm giờ)
   ============================================================ */
TD.man_dokiep = function (c) {
  const mac = TD.kiepTheoCanhGioi(TD.S.exp);
  const K = (TD.KIEP || []).find(k => k.cap === TD.S.kiep_chon) || mac;
  const cg = TD.canhGioi(TD.S.exp);

  c.appendChild(el('div', 'the vien-lua', `<h3>⚡ Độ Kiếp — thi thử đúng cấu trúc</h3>
    <p class="mo-nhat">Đề dựng theo <b>đúng cấu trúc và thang điểm thật</b> của kỳ thi tốt nghiệp THPT, có bấm giờ.
    Nhưng thiên kiếp thì <b>nặng dần theo cảnh giới</b>: lên cảnh giới mới là đề dồn về vận dụng cao,
    thời gian bị rút, ngưỡng vượt kiếp nâng lên.</p>`));

  const bang = TD.KIEP.map(k => {
    const dangChon = k.cap === K.cap;
    const moKhoa = k.cap <= mac.cap;
    return `<button class="nut ${dangChon ? 'lua' : 'phu'}" style="padding:7px 12px;font-size:12.4px;text-align:left"
      onclick="TD.S.kiep_chon=${k.cap};TD.luu();TD.di('dokiep')">
      🌩 Cấp ${k.cap} · ${k.ten}${moKhoa ? '' : ' <span class="mo-nhat">(vượt cấp)</span>'}</button>`;
  }).join('');

  c.appendChild(el('div', 'the', `
    <div style="font-size:13.4px">Cảnh giới <b style="color:${cg.mau}">${cg.ten}</b> ⇒ thiên kiếp mặc định là
      <b style="color:var(--kim)">${mac.ten}</b> <span class="mo-nhat">(cấp ${mac.cap}/5)</span></div>
    <div class="hang-nut" style="margin-top:9px">${bang}</div>
    <table class="kq" style="margin-top:12px">
      <tr><th>Cấp</th><th>Độ khó</th><th>Vận dụng<br>cả đề</th><th>Thời<br>gian</th><th>Ngưỡng</th></tr>
      ${TD.KIEP.map(k => `<tr${k.cap === K.cap ? ' style="background:rgba(243,156,18,.12)"' : ''}>
        <td>${k.cap}</td><td>${k.nhan}</td>
        <td>${Math.round((k.tong[3] + k.tong[4]) * 100)}%</td>
        <td>${Math.round(k.gio * 100)}%</td>
        <td><b>${TD.soVN(k.nguong, 1)}</b></td></tr>`).join('')}
    </table>
    <p class="mo-nhat tren12">Đang chọn: <b style="color:var(--kim)">${K.ten}</b> — ${K.nhan}.
    ${TD.S.kiep_chon ? `<a href="javascript:void(0)" onclick="TD.S.kiep_chon=null;TD.luu();TD.di('dokiep')">Trả về mặc định theo cảnh giới</a>` : 'Muốn thử nặng hơn thì bấm chọn cấp cao hơn.'}</p>`));

  const luoi = el('div', 'luoi');
  TD.THU_TU_MON.forEach(m => {
    const M = TD.MON[m];
    if (M.tuluan) { luoi.appendChild(TD.theDoKiepVan(M)); return; }
    const kho = TD.KHO[m] || [];
    const dem = d => kho.filter(q => q.dang === d).length + (TD.GEN[m] || []).filter(t => t.dang === d).length;
    const co = { mc: dem('mc'), ds: dem('ds'), tln: dem('tln') };
    const du = co.mc > 0 && (M.p2 === 0 || co.ds > 0) && (M.p3 === 0 || co.tln > 0);
    const ls = (TD.S.do_kiep[m] || []);
    const caoNhat = ls.length ? Math.max(...ls.map(x => x.diem)) : null;

    const t = el('div', 'the mon-the', `
      <div style="display:flex;gap:11px;align-items:center">
        <span class="mon-icon">${M.icon}</span>
        <div><div class="mon-ten">${M.ten}</div><div class="mon-phai">${M.phut} phút</div></div>
      </div>
      <div style="font-size:12.4px;color:var(--chu2);margin:9px 0">
        Phần I: ${M.p1} câu${M.p2 ? ` · Phần II: ${M.p2} câu` : ''}${M.p3 ? ` · Phần III: ${M.p3} câu` : ''}
      </div>
      <div style="font-size:12px;color:var(--chu3)">
        ${du ? `Đã vượt kiếp ${ls.length} lần${caoNhat !== null ? ` · cao nhất <b style="color:var(--kim)">${caoNhat}</b>` : ''}`
             : '⚠ Ngân hàng câu hỏi chưa đủ để dựng đề đầy đủ'}
      </div>`);
    t.style.setProperty('--m', M.mau);
    t.onclick = () => TD.dungDe(m, K.cap);
    luoi.appendChild(t);
  });
  c.appendChild(luoi);
};

/* ============================================================
   ĐỘ KIẾP MÔN NGỮ VĂN — ĐỀ TỰ LUẬN 120 PHÚT
   Máy không chấm được văn nên làm đúng cách của thầy cô: phát đề,
   bấm giờ, thu bài rồi mới mở đáp án và biểu điểm cho tự chấm.
   Điểm tự chấm vẫn vào sổ do_kiep như mọi môn khác.
   ============================================================ */
TD.theDoKiepVan = function (M) {
  const ls = TD.S.do_kiep.van || [];
  const caoNhat = ls.length ? Math.max.apply(null, ls.map(x => x.diem)) : null;
  const t = el('div', 'the mon-the', `
    <div style="display:flex;gap:11px;align-items:center">
      <span class="mon-icon">${M.icon}</span>
      <div><div class="mon-ten">${M.ten}</div><div class="mon-phai">${M.phut} phút · tự luận</div></div>
    </div>
    <div style="font-size:12.4px;color:var(--chu2);margin:9px 0">
      Đọc hiểu 4,0đ (5 câu) · Viết 6,0đ (đoạn 200 chữ + bài 600 chữ)
    </div>
    <div style="font-size:12px;color:var(--chu3)">
      ${TD.soDeVan()} bộ đề${ls.length ? ` · đã vượt kiếp ${ls.length} lần${caoNhat !== null ? ` · cao nhất <b style="color:var(--kim)">${caoNhat}</b>` : ''}` : ' · chấm theo biểu điểm chính thức'}
    </div>`);
  t.style.setProperty('--m', M.mau);
  t.onclick = () => TD.chonDeVan();
  return t;
};

TD.chonDeVan = function () {
  const c = $('#noidung'); c.innerHTML = '';
  const bo = TD.DE_VAN || [];
  c.appendChild(el('div', 'the vien-lua', `<h3>📖 Độ Kiếp môn Ngữ văn</h3>
    <p style="font-size:13.6px;color:var(--chu2)">Đề tự luận <b>120 phút</b>, đúng cấu trúc chính thức:
    Phần I Đọc hiểu <b>4,0 điểm</b> (5 câu, ngữ liệu ngoài sách giáo khoa) · Phần II Viết <b>6,0 điểm</b>
    (câu 1 nghị luận văn học ~200 chữ, câu 2 nghị luận xã hội ~600 chữ).</p>
    <p class="mo-nhat">Viết ra giấy hoặc gõ thẳng vào ô trong đề. Hết giờ mới được mở đáp án — mở sớm thì
    không còn là độ kiếp nữa. Chấm xong tự cho điểm theo biểu điểm, máy ghi vào sổ giúp.</p>`));

  TD.S.van_lam = TD.S.van_lam || {};
  const nut0 = el('div', 'hang-nut', '');
  const boc = el('button', 'nut kim', '🎲 Bốc ngẫu nhiên một bộ đề');
  boc.onclick = () => TD.thiVan(Math.floor(Math.random() * TD.soDeVan()));
  nut0.appendChild(boc);
  c.appendChild(el('div', 'the', `<p style="font-size:13.4px;color:var(--chu2);margin:0 0 4px">
    <b>${bo.length}</b> ngữ liệu × <b>${TD.SO_DE_MOI_NGU_LIEU}</b> biến thể câu nghị luận xã hội =
    <b style="color:var(--kim)">${TD.soDeVan()}</b> bộ đề khác nhau. Làm lại cùng một ngữ liệu vẫn ra
    câu 2 mới, nên đọc hiểu thì quen dần mà phần Viết thì luôn lạ.</p>`)).appendChild(nut0);

  const luoi = el('div', 'luoi');
  bo.forEach((d, i) => {
    const daLam = TD.S.van_lam[i] || 0;
    const t = el('div', 'the mon-the', `
      <div class="mon-ten" style="font-size:14.5px">${d.ten}</div>
      <div style="font-size:11.8px;color:var(--chu3);margin:5px 0">${d.loai}</div>
      <div style="font-size:11.6px;color:var(--chu2)">${daLam
        ? `đã làm <b>${daLam}</b>/${TD.SO_DE_MOI_NGU_LIEU} biến thể`
        : `${TD.SO_DE_MOI_NGU_LIEU} biến thể · chưa làm`}</div>`);
    t.style.setProperty('--m', TD.MON.van.mau);
    t.onclick = () => TD.thiVan(i + bo.length * (daLam % TD.SO_DE_MOI_NGU_LIEU));
    luoi.appendChild(t);
  });
  c.appendChild(luoi);
  c.appendChild(el('div', 'hang-nut', '')).appendChild(
    el('button', 'nut phu', '← Quay lại')).onclick = () => TD.di('dokiep');
};

TD.thiVan = function (i) {
  const d = TD.deVan(i); if (!d) return;
  const K = (TD.KIEP || []).find(k => k.cap === TD.S.kiep_chon) || TD.kiepTheoCanhGioi(TD.S.exp);
  const phut = Math.max(30, Math.round(TD.MON.van.phut * K.gio));
  const c = $('#noidung'); c.innerHTML = '';
  TD.phien = { mon: 'van', cheDo: 'dokiep', batDau: Date.now(), gioiHan: phut * 60000, deVan: i, kiep: K };

  c.appendChild(el('div', 'the vien-lua', `
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <b>📖 ĐỀ THI THỬ NGỮ VĂN — ĐỀ SỐ ${i + 1}</b>
      <span class="nhan" id="dongho">--:--</span>
    </div>
    <p class="mo-nhat" style="margin-top:6px">Ngữ liệu: <b>${d.ten}</b> · biến thể ${d.bienThe}/${TD.SO_DE_MOI_NGU_LIEU}
    · 🌩 ${K.ten} — thời gian <b>${phut} phút</b>, ngưỡng vượt kiếp <b>${TD.soVN(K.nguong, 1)}</b>.</p>`));

  /* --- Phần I: Đọc hiểu --- */
  const p1 = el('div', 'the', `<h3>I. ĐỌC HIỂU (4,0 điểm)</h3>
    <p style="font-size:13.5px;color:var(--chu2)">Đọc văn bản sau:</p>
    <div class="giai" style="white-space:pre-wrap;font-size:14.5px;line-height:1.75">${d.nguLieu}</div>
    <p style="font-size:12.6px;color:var(--chu3);text-align:right;margin-top:6px">${d.xuatXu}</p>
    <p style="font-size:13.5px;color:var(--chu2);margin-top:10px">Thực hiện các yêu cầu:</p>`);
  d.doc.forEach((x, k) => {
    p1.appendChild(el('div', '', `<div style="margin-top:12px;font-size:14.6px;line-height:1.6">
      <b>Câu ${k + 1}</b> <span class="nhan">${TD.soVN(x.d, 1)} điểm</span><br>${x.q}</div>`));
    const o = el('textarea', 'o-nhap'); o.rows = 3; o.placeholder = 'Bài làm câu ' + (k + 1) + '…';
    o.style.width = '100%'; o.style.marginTop = '7px'; o.id = 'van-doc-' + k;
    p1.appendChild(o);
  });
  c.appendChild(p1);

  /* --- Phần II: Viết --- */
  const p2 = el('div', 'the', `<h3>II. VIẾT (6,0 điểm)</h3>
    <div style="margin-top:6px;font-size:14.6px;line-height:1.6">
      <b>Câu 1</b> <span class="nhan">2,0 điểm</span><br>${d.nlvh.q}</div>`);
  const o1 = el('textarea', 'o-nhap'); o1.rows = 7; o1.placeholder = 'Đoạn văn khoảng 200 chữ…';
  o1.style.width = '100%'; o1.style.marginTop = '7px'; o1.id = 'van-nlvh';
  p2.appendChild(o1);
  p2.appendChild(el('div', '', `<div style="margin-top:16px;font-size:14.6px;line-height:1.6">
    <b>Câu 2</b> <span class="nhan">4,0 điểm</span><br>${d.nlxh.q}</div>`));
  const o2 = el('textarea', 'o-nhap'); o2.rows = 14; o2.placeholder = 'Bài văn khoảng 600 chữ…';
  o2.style.width = '100%'; o2.style.marginTop = '7px'; o2.id = 'van-nlxh';
  p2.appendChild(o2);

  /* đếm chữ để canh dung lượng — sai dung lượng là mất điểm hình thức */
  const dem = el('div', 'mo-nhat', ''); dem.style.marginTop = '7px';
  const capNhat = () => {
    const c1 = (o1.value.trim().match(/\S+/g) || []).length;
    const c2 = (o2.value.trim().match(/\S+/g) || []).length;
    dem.innerHTML = `Câu 1: <b>${c1}</b> chữ (chuẩn ~200) · Câu 2: <b>${c2}</b> chữ (chuẩn ~600)`;
  };
  o1.oninput = capNhat; o2.oninput = capNhat; capNhat();
  p2.appendChild(dem);
  c.appendChild(p2);

  const nut = el('div', 'hang-nut', '');
  const nop = el('button', 'nut lua', 'Nộp bài & mở đáp án');
  nop.onclick = () => TD.chamVan(i);
  nut.appendChild(nop);
  const bo = el('button', 'nut phu', 'Bỏ dở');
  bo.onclick = () => { clearInterval(TD.dhTimer); TD.phien = null; TD.di('dokiep'); };
  nut.appendChild(bo);
  c.appendChild(el('div', 'the', '')).appendChild(nut);
  TD.chayDongHo();
  window.scrollTo(0, 0);
};

TD.chamVan = function (i) {
  const d = TD.deVan(i); if (!d) return;
  const K = (TD.phien && TD.phien.kiep) || TD.kiepTheoCanhGioi(TD.S.exp);
  clearInterval(TD.dhTimer);
  const phut = TD.phien ? Math.round((Date.now() - TD.phien.batDau) / 60000) : 0;
  const c = $('#noidung'); c.innerHTML = '';

  c.appendChild(el('div', 'the vien-kim', `<h3>📕 Đáp án & biểu điểm — Đề số ${i + 1}</h3>
    <p class="mo-nhat">Ngữ liệu <b>${d.ten}</b> · làm bài trong <b>${phut} phút</b>. Đọc kĩ đáp án, đối chiếu từng ý rồi tự cho điểm
    thật thà bên dưới — chấm rộng tay với chính mình là tự lừa mình.</p>`));

  const oDiem = [];
  const themO = (nhan, toiDa) => {
    const o = el('input', 'o-nhap');
    o.type = 'number'; o.min = '0'; o.max = String(toiDa); o.step = '0.25'; o.value = '';
    o.placeholder = '0 – ' + TD.soVN(toiDa, 2);
    o.style.width = '110px'; o.style.marginLeft = '8px';
    oDiem.push({ o: o, toiDa: toiDa, nhan: nhan });
    return o;
  };

  /* --- đáp án đọc hiểu --- */
  const b1 = el('div', 'the', '<h3>I. ĐỌC HIỂU (4,0 điểm)</h3>');
  d.doc.forEach((x, k) => {
    const lam = (document.getElementById('van-doc-' + k) || {}).value;
    b1.appendChild(el('div', '', `<div style="margin-top:14px;font-size:14.4px">
      <b>Câu ${k + 1}</b> <span class="nhan">${TD.soVN(x.d, 1)} điểm</span> — ${x.q}</div>
      <div class="giai" style="white-space:pre-wrap">${x.a}</div>`));
    const hang = el('div', ''); hang.style.marginTop = '7px';
    hang.appendChild(el('span', 'mo-nhat', `Tự chấm câu ${k + 1} (tối đa ${TD.soVN(x.d, 1)}):`));
    hang.appendChild(themO('Đọc hiểu câu ' + (k + 1), x.d));
    b1.appendChild(hang);
  });
  c.appendChild(b1);

  /* --- đáp án phần viết --- */
  const b2 = el('div', 'the', '<h3>II. VIẾT (6,0 điểm)</h3>');
  [['Câu 1 — nghị luận văn học (2,0đ)', d.nlvh, 2], ['Câu 2 — nghị luận xã hội (4,0đ)', d.nlxh, 4]].forEach(([ten, x, toiDa]) => {
    b2.appendChild(el('div', '', `<div style="margin-top:14px;font-size:14.4px"><b>${ten}</b><br>${x.q}</div>
      <div class="giai" style="white-space:pre-wrap"><b>Dàn ý cần có:</b>\n${x.dan}</div>
      <div class="meo"><b>Biểu điểm:</b> ${x.diem}</div>`));
    const hang = el('div', ''); hang.style.marginTop = '7px';
    hang.appendChild(el('span', 'mo-nhat', `Tự chấm (tối đa ${TD.soVN(toiDa, 1)}):`));
    hang.appendChild(themO(ten, toiDa));
    b2.appendChild(hang);
  });
  c.appendChild(b2);

  const kq = el('div', 'the vien-lua', '<h3>Tổng kết</h3><div id="van-tong">Nhập điểm từng câu rồi bấm chốt.</div>');
  const nut = el('div', 'hang-nut', '');
  const chot = el('button', 'nut kim', 'Chốt điểm & ghi vào sổ');
  chot.onclick = () => {
    let tong = 0, thieu = false;
    oDiem.forEach(x => {
      const v = parseFloat(String(x.o.value).replace(',', '.'));
      if (isNaN(v)) { thieu = true; return; }
      tong += Math.max(0, Math.min(x.toiDa, v));
    });
    if (thieu) { TD.bao('Còn câu chưa chấm điểm.', 'lua'); return; }
    tong = TD.lamTron(tong, 2);
    TD.S.do_kiep.van = TD.S.do_kiep.van || [];
    TD.S.do_kiep.van.push({ ngay: TD.homNay(), diem: tong, cap: K.cap });
    /* ghi nhận đã làm ngữ liệu này để lần sau đổi sang biến thể khác */
    TD.S.van_lam = TD.S.van_lam || {};
    const iNL = i % (TD.NGU_LIEU_VAN || []).length;
    TD.S.van_lam[iNL] = Math.max(TD.S.van_lam[iNL] || 0, d.bienThe);
    /* thưởng linh khí theo điểm, đúng tinh thần cày cuốc của các môn khác */
    const exp = Math.round(tong * 12);
    TD.themExp(exp);
    TD.S.linh_thach += Math.round(exp / 5);
    TD.luu();
    $('#van-tong').innerHTML = `<div style="font-size:26px;font-weight:800;color:var(--kim)">${TD.soVN(tong, 2)} / 10</div>
      <p style="font-size:13.6px;color:var(--chu2)">${tong >= K.nguong
        ? `⚡ Vượt ${K.ten} (ngưỡng ${TD.soVN(K.nguong, 1)}) thành công!`
        : tong >= K.nguong - 1.5
          ? `Khá rồi, còn thiếu ${TD.soVN(K.nguong - tong, 2)} điểm nữa mới qua ${K.ten} — cày tiếp phần Viết.`
          : 'Chưa qua. Đọc lại dàn ý, viết lại câu 2 một lần nữa ngay hôm nay.'}</p>
      <span class="nhan" style="color:var(--ngoc);border-color:var(--ngoc)">+${exp} linh khí</span>`;
    chot.disabled = true;
    TD.veHud();
  };
  nut.appendChild(chot);
  const ve = el('button', 'nut phu', 'Về Độ Kiếp');
  ve.onclick = () => { TD.phien = null; TD.di('dokiep'); };
  nut.appendChild(ve);
  kq.appendChild(nut);
  c.appendChild(kq);
  window.scrollTo(0, 0);
};

/* Dựng đề theo cấu trúc; nếu ngân hàng thiếu thì rút gọn tỉ lệ nhưng GIỮ ĐÚNG trọng số điểm */
TD.dungDe = function (mon, cap) {
  const M = TD.MON[mon];
  const de = TD.deThiThat(mon, undefined, cap || TD.S.kiep_chon);
  const p1 = de.p1, p2 = de.p2, p3 = de.p3, ds = de.ds, K = de.kiep;

  if (!ds.length) { TD.bao('Chưa đủ câu hỏi để dựng đề môn này.', 'lua'); return; }

  const c = $('#noidung'); c.innerHTML = '';
  /* thời gian rút gọn tương ứng tỉ lệ số câu thực tế */
  const tiLe = ds.length / Math.max(1, M.p1 + M.p2 + M.p3);
  const phut = Math.max(5, Math.round(M.phut * tiLe * K.gio));
  const demMuc = d => { const o = { 1: 0, 2: 0, 3: 0, 4: 0 }; d.forEach(it => { const q = TD.layCau(it); if (q) o[q.muc]++; }); return o; };
  const mucAll = demMuc(ds);

  c.appendChild(el('div', 'the vien-lua', `<h3>⚡ ${M.icon} Độ Kiếp môn ${M.ten}</h3>
    <div class="the" style="background:rgba(243,156,18,.08);border-color:rgba(243,156,18,.35);margin-bottom:12px">
      <b style="color:var(--kim)">🌩 ${K.ten} — cấp ${K.cap}/5</b>
      <span class="mo-nhat"> · ${K.nhan}</span>
      <div style="font-size:12.6px;color:var(--chu2);margin-top:6px">
        Phân bố mức độ của đề này:
        <span class="nhan m1">Nhận biết ${mucAll[1]}</span>
        <span class="nhan m2">Thông hiểu ${mucAll[2]}</span>
        <span class="nhan m3">Vận dụng ${mucAll[3]}</span>
        <span class="nhan m4">Vận dụng cao ${mucAll[4]}</span>
      </div>
      <div style="font-size:12.6px;color:var(--chu2);margin-top:5px">
        Ngưỡng vượt kiếp: <b style="color:var(--kim)">${TD.soVN(K.nguong, 1)}</b> điểm
        ${K.gio !== 1 ? ` · thời gian ${K.gio < 1 ? 'bị rút còn' : 'được nới thành'} <b>${Math.round(K.gio * 100)}%</b>` : ''}
      </div>
    </div>
    <table class="kq">
      <tr><th>Phần</th><th>Số câu</th><th>Điểm mỗi câu</th><th>Tổng</th></tr>
      <tr><td>I — Nhiều lựa chọn</td><td>${p1.length}</td><td>${M.d1}</td><td>${(p1.length * M.d1).toFixed(2)}</td></tr>
      ${p2.length ? `<tr><td>II — Đúng/Sai (4 ý)</td><td>${p2.length}</td><td>tối đa 1,00</td><td>${p2.length.toFixed(2)}</td></tr>` : ''}
      ${p3.length ? `<tr><td>III — Trả lời ngắn</td><td>${p3.length}</td><td>${M.d3}</td><td>${(p3.length * M.d3).toFixed(2)}</td></tr>` : ''}
    </table>
    <p style="font-size:13.4px;color:var(--chu2)">Thời gian: <b>${phut} phút</b>
      <span class="mo-nhat">(đề thật ${M.phut} phút)</span></p>
    <div class="the" style="background:rgba(231,76,60,.07);border-color:rgba(231,76,60,.3);margin-top:12px">
      <b>⚠ Quy tắc vượt kiếp:</b>
      <ul style="margin:7px 0;padding-left:19px;font-size:13.6px">
        <li>Bấm giờ nghiêm — hết giờ là dừng, đúng như thi thật.</li>
        <li>Không tra tài liệu, không mở Tàng Kinh Các giữa chừng.</li>
        <li>Câu nào quá 3 phút thì bỏ qua, quay lại sau.</li>
        <li>Không bỏ trống câu nào ở Phần I — đoán vẫn hơn bỏ.</li>
      </ul>
    </div>
    <div class="hang-nut">
      <button class="nut lua" id="dk-batdau">Bắt đầu độ kiếp</button>
      <button class="nut phu" onclick="TD.di('dokiep')">← Quay lại</button>
    </div>`));

  $('#dk-batdau').onclick = () => {
    TD.keu('sam');
    TD.batDauPhien(mon, null, 'dokiep', ds, phut);
    TD.phien.kiep = K;
    /* quy đổi điểm về thang 10 khi kết thúc */
    const tong = p1.length * M.d1 + p2.length * 1 + p3.length * M.d3;
    TD.phien.heSo = tong > 0 ? 10 / tong : 1;
    TD.phien.tinhDiem = true;
  };
};

/* Ghi đè cách cộng điểm cho chế độ độ kiếp: nhân hệ số quy về thang 10 */
const _chotCauGoc = TD.chotCau;
TD.chotCau = function (q, mon, dung, diem, diemToiDa, ghiChu) {
  const p = TD.phien;
  if (p && p.cheDo === 'dokiep' && p.heSo) {
    const M = TD.MON[mon];
    const d = q.dang === 'mc' ? diem * M.d1 : q.dang === 'tln' ? diem * M.d3 : diem;
    _chotCauGoc.call(TD, q, mon, dung, d * p.heSo, diemToiDa, ghiChu);
  } else _chotCauGoc.call(TD, q, mon, dung, diem, diemToiDa, ghiChu);
};

/* ============================================================
   MÀN — TÀ ĐẠO (bộ đề trọng điểm, rút ngắn khoảng cách tu tiên)
   ============================================================ */
TD.man_tadao = function (c) {
  const mon = TD.tham || TD.monTD || 'hoa';
  TD.monTD = mon;
  const loai = TD.loaiTD || 'lythuyet';

  c.appendChild(el('div', 'the vien-lua', `<h3>☠️ Tà Đạo — rút ngắn khoảng cách tu tiên</h3>
    <p style="font-size:14px">Chính đạo tu luyện tuần tự, tà đạo đi thẳng vào <b>trọng điểm</b>. Mỗi môn có
    <b>${TD.SO_DE_TA_DAO} bộ đề Lý thuyết</b> và <b>${TD.SO_DE_TA_DAO} bộ đề Bài tập</b>, mỗi bộ
    <b>${TD.SO_CAU_TA_DAO} câu</b> — dựng từ kho mệnh đề trọng điểm và bộ sinh đề của chính môn đó.</p>
    <div class="the" style="background:rgba(231,76,60,.07);border-color:rgba(231,76,60,.3);margin-top:12px">
      <b>⚠ Lời cảnh báo của tiền bối</b>
      <p style="font-size:13.5px;margin:7px 0 0">Cày hết phần lý thuyết trọng điểm trong <b>1 tuần</b> thì phần
      Nhận biết – Thông hiểu của đề thi gần như ăn trọn, tương ứng khoảng <b>7–8 điểm</b>. Nhưng tà đạo có giá của nó:
      <b>phần Vận dụng cao vẫn phải cày chính đạo</b> ở Luyện Công và Độ Kiếp. Muốn 9+ thì không có đường tắt.</p>
    </div>`));

  const chonMon = TD.THU_TU_MON.map(m =>
    `<button class="nut ${m === mon ? '' : 'phu'}" style="padding:8px 13px;font-size:13px"
      onclick="TD.monTD='${m}';TD.di('tadao')">${TD.MON[m].icon} ${TD.MON[m].ten}</button>`).join('');
  const chonLoai = [['lythuyet', '📘 Lý thuyết trọng điểm'], ['baitap', '🧮 Bài tập trọng điểm']].map(([k, t]) =>
    `<button class="nut ${k === loai ? 'kim' : 'phu'}" style="padding:8px 15px"
      onclick="TD.loaiTD='${k}';TD.di('tadao')">${t}</button>`).join('');

  c.appendChild(el('div', 'the', `<div class="hang-nut" style="margin:0">${chonMon}</div>
    <hr class="mo"><div class="hang-nut" style="margin:0">${chonLoai}</div>`));

  if (!TD.taDaoSan(mon, loai)) {
    c.appendChild(el('div', 'the vien-kim', `<h3>Chưa mở được</h3>
      <p>Môn ${TD.MON[mon].ten} chưa có ${loai === 'baitap' ? 'bộ sinh bài tập' : 'kho mệnh đề lý thuyết'} đủ để dựng đề.
      ${loai === 'baitap' ? 'Hãy chuyển sang phần <b>Lý thuyết trọng điểm</b>.' : ''}</p>`));
    return;
  }

  /* thống kê tiến độ chung */
  let daQua = 0, tongPt = 0, coDiem = 0;
  for (let i = 1; i <= TD.SO_DE_TA_DAO; i++) {
    const kq = TD.ketQuaTaDao(mon, i, loai);
    if (kq) { coDiem++; tongPt += kq.pt; if (kq.pt >= 80) daQua++; }
  }
  const nguon = loai === 'lythuyet'
    ? `${TD.soMenhDe(mon)} mệnh đề trọng điểm`
    : `${TD.soMau(mon)} dạng bài tự sinh`;

  c.appendChild(el('div', 'the vien-kim', `
    <div style="display:flex;gap:26px;flex-wrap:wrap">
      <div><div class="so-to" style="color:${daQua ? 'var(--dung)' : 'var(--chu3)'}">${daQua}/${TD.SO_DE_TA_DAO}</div><div class="so-nhan">bộ đề đã qua ải</div></div>
      <div><div class="so-to">${coDiem ? Math.round(tongPt / coDiem) + '%' : '—'}</div><div class="so-nhan">chính xác trung bình</div></div>
      <div><div class="so-to">${TD.SO_DE_TA_DAO * TD.SO_CAU_TA_DAO}</div><div class="so-nhan">tổng số câu</div></div>
    </div>
    <p class="mo-nhat tren12">Nguồn đề: ${nguon} của môn ${TD.MON[mon].ten}. Qua ải = đúng từ <b>80%</b> trở lên.</p>`));

  /* lưới 20 bộ đề */
  const luoi = el('div', 'luoi');
  for (let i = 1; i <= TD.SO_DE_TA_DAO; i++) {
    const kq = TD.ketQuaTaDao(mon, i, loai);
    const tien = (TD.S.ta_dao_tien || {})[mon + '|' + loai + '|' + i];
    const qua = kq && kq.pt >= 80;
    const t = el('div', 'the mon-the');
    t.style.setProperty('--m', qua ? 'var(--dung)' : kq ? 'var(--kim)' : 'var(--vien)');
    t.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center">
        <b style="font-size:15px">Bộ đề ${i}</b>
        <span style="font-size:19px">${qua ? '✅' : kq ? '🔸' : '⬜'}</span>
      </div>
      <div style="font-size:12.5px;color:var(--chu2);margin-top:6px">
        ${kq ? `Cao nhất: <b style="color:${qua ? 'var(--dung)' : 'var(--kim)'}">${kq.pt}%</b> (${kq.dung}/${kq.tong})`
             : `${TD.SO_CAU_TA_DAO} câu · chưa làm`}
      </div>
      ${tien ? `<div style="font-size:12px;color:var(--tim);margin-top:4px">⏸ đang dở ở câu ${tien.vt}/${tien.tong}</div>` : ''}`;
    t.onclick = () => TD.moDeTaDao(mon, i, loai);
    luoi.appendChild(t);
  }
  c.appendChild(luoi);
};

TD.moDeTaDao = function (mon, so, loai) {
  const ds = TD.deTaDao(mon, so, loai);
  if (!ds.length) { TD.bao('Không dựng được bộ đề này.', 'lua'); return; }
  const khoa = mon + '|' + loai + '|' + so;
  const tien = (TD.S.ta_dao_tien || {})[khoa];
  const kq = TD.ketQuaTaDao(mon, so, loai);
  const M = TD.MON[mon];

  const c = $('#noidung'); c.innerHTML = '';
  c.appendChild(el('div', 'the vien-lua', `
    <h3>☠️ ${M.icon} ${M.ten} — ${loai === 'lythuyet' ? 'Lý thuyết' : 'Bài tập'} · Bộ đề ${so}</h3>
    <p style="font-size:13.6px;color:var(--chu2)">Gồm <b>${ds.length} câu</b>
      ${loai === 'lythuyet'
        ? `(${ds.filter(x => x.lt !== undefined).length} câu nhiều lựa chọn + ${ds.filter(x => x.dsy).length} câu đúng/sai 4 ý)`
        : '(bài tập tính toán, số liệu sinh mới mỗi lần)'}.
      Không giới hạn thời gian — cứ dừng giữa chừng, tiến độ được lưu lại.</p>
    ${kq ? `<p style="font-size:13.5px">Lần làm tốt nhất: <b style="color:var(--kim)">${kq.pt}%</b> (${kq.dung}/${kq.tong}) ngày ${kq.ngay}</p>` : ''}
    <div class="hang-nut">
      ${tien ? `<button class="nut kim" id="td-tiep">Học tiếp từ câu ${tien.vt}</button>` : ''}
      <button class="nut ${tien ? 'phu' : ''}" id="td-batdau">${tien ? 'Làm lại từ đầu' : 'Bắt đầu'}</button>
      <button class="nut phu" onclick="TD.di('tadao')">← Quay lại</button>
    </div>`));

  const chay = (batDauTu) => {
    TD.batDauPhien(mon, null, 'tadao', ds);
    TD.phien.taDao = { mon: mon, so: so, loai: loai, khoa: khoa };
    if (batDauTu > 0 && batDauTu < ds.length) { TD.phien.vt = batDauTu; TD.veCau(); }
  };
  $('#td-batdau').onclick = () => chay(0);
  if (tien) $('#td-tiep').onclick = () => chay(tien.vt);
};

/* Kiểm tra nhanh ngay trong Tàng Kinh Các: bốc câu hỏi đúng chủ đề vừa đọc */
TD.kiemTraNhanh = function (mon, cd) {
  const ds = TD.deChuyenDe(mon, cd, TD.SO_CAU_KIEM_TRA);
  if (ds.length < 4) { TD.bao('Chuyên đề này chưa đủ câu để kiểm tra.', 'lua'); return; }
  TD.batDauPhien(mon, null, 'luyen', ds);
};

/* ============================================================
   MÀN 6 — THIÊN MỆNH BẢNG (lộ trình 20 tuần)
   ============================================================ */
TD.man_thienmenh = function (c) {
  const tuanNay = TD.tuanHienTai();
  const con = TD.ngayConLai();
  c.appendChild(el('div', 'the vien-kim', `<h3>🗓️ Thiên Mệnh Bảng — 20 tuần chinh phục 28 điểm</h3>
    <div style="display:flex;gap:26px;flex-wrap:wrap;margin:12px 0">
      <div><div class="so-to">${tuanNay}</div><div class="so-nhan">tuần hiện tại</div></div>
      <div><div class="dem-nguoc">${con >= 0 ? con : 0}</div><div class="so-nhan">ngày tới kỳ thi</div></div>
      <div><div class="so-to">${Math.max(0, 20 - tuanNay)}</div><div class="so-nhan">tuần còn lại</div></div>
    </div>
    <p class="mo-nhat">Lộ trình tự tính từ ngày bạn bắt đầu (${TD.S.bat_dau}). Đổi ngày thi và ngày bắt đầu ở mục Cài Đặt.</p>`));

  TD.GIAI_DOAN.forEach(gd => {
    const box = el('div', 'the');
    box.style.borderLeft = '4px solid ' + gd.mau;
    box.innerHTML = `<h3 style="color:${gd.mau}">Giai đoạn ${gd.id}: ${gd.ten} <span class="mo-nhat">· tuần ${gd.tuan}</span></h3>
      <p style="font-size:13.8px"><b>Mục tiêu:</b> ${gd.muc_tieu}</p>
      <div class="moc" style="background:rgba(255,255,255,.04)"><b>Nguyên tắc:</b> ${gd.nguyen_tac}</div>`;

    TD.LO_TRINH.filter(t => t.gd === gd.id).forEach(t => {
      const dangO = t.tuan === tuanNay;
      const xong = t.tuan < tuanNay;
      const d = el('div', 'tuan');
      d.style.setProperty('--g', dangO ? gd.mau : xong ? 'var(--chu3)' : 'var(--vien)');
      d.style.opacity = xong ? '.55' : '1';
      d.innerHTML = `<div class="tuan-so" style="--g:${dangO ? gd.mau : 'var(--chu3)'}">
          Tuần ${t.tuan} — ${t.chu_de}
          ${dangO ? '<span class="nhan" style="color:' + gd.mau + ';border-color:' + gd.mau + '">ĐANG Ở ĐÂY</span>' : ''}
          ${xong ? '<span class="nhan">đã qua</span>' : ''}
        </div>
        <ul>${t.viec.map(v => `<li>${v}</li>`).join('')}</ul>
        <div class="moc">🎯 Chỉ tiêu: <b>${t.chi_tieu} câu/ngày</b> · ${t.moc}</div>`;
      box.appendChild(d);
    });
    c.appendChild(box);
  });
};

/* ============================================================
   MÀN 7 — BÍ LỤC (chiến thuật phòng thi)
   ============================================================ */
TD.man_biluc = function (c) {
  c.appendChild(el('div', 'the vien-kim', `<h3>🎯 Bí Lục Độ Kiếp</h3>
    <p class="mo-nhat">Chiến thuật phòng thi. Đọc kỹ phần "thang điểm câu Đúng/Sai" — đó là chỗ nhiều người mất điểm oan nhất.</p>`));
  TD.CHIEN_THUAT.forEach(x => {
    c.appendChild(el('div', 'the', `<h3>${x.icon} ${x.ten}</h3>
      <div class="cuon-ngang">${x.noi_dung}</div>`));
  });
};

/* ============================================================
   MÀN 8 — CÀI ĐẶT
   ============================================================ */
TD.man_caidat = function (c) {
  const oMon = TD.THU_TU_MON.map(m =>
    `<label style="display:inline-flex;gap:6px;align-items:center;margin:0 12px 9px 0;font-size:13.6px;cursor:pointer">
      <input type="checkbox" value="${m}" class="ck-mon" ${TD.S.to_hop.includes(m) ? 'checked' : ''}>
      ${TD.MON[m].icon} ${TD.MON[m].ten}</label>`).join('');

  c.appendChild(el('div', 'the', `<h3>⚙️ Cài Đặt</h3>
    <div style="margin-bottom:15px">
      <label class="so-nhan">Tên đạo hữu</label>
      <input class="o-nhap" id="cd-ten" value="${TD.S.ten}">
    </div>
    <div style="margin-bottom:15px">
      <label class="so-nhan">Ngày thi</label>
      <input class="o-nhap" id="cd-ngay" type="date" value="${TD.S.ngay_thi}">
      <p class="mo-nhat" style="margin-top:5px">Kỳ thi TN THPT thường diễn ra vào giữa tháng 6. Đặt đúng ngày để đếm ngược chính xác.</p>
    </div>
    <div style="margin-bottom:15px">
      <label class="so-nhan">Ngày bắt đầu lộ trình 20 tuần</label>
      <input class="o-nhap" id="cd-batdau" type="date" value="${TD.S.bat_dau}">
    </div>
    <div style="margin-bottom:15px">
      <label class="so-nhan">Chỉ tiêu số câu mỗi ngày</label>
      <input class="o-nhap" id="cd-chitieu" type="number" min="5" max="200" value="${TD.S.chi_tieu_ngay}">
    </div>
    <div style="margin-bottom:15px">
      <label class="so-nhan">Tổ hợp xét tuyển (chọn 3 môn)</label>
      <div style="margin-top:7px">${oMon}</div>
    </div>
    <div style="margin-bottom:15px;padding-top:13px;border-top:1px solid rgba(255,255,255,.08)">
      <label class="so-nhan">Âm thanh</label>
      <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-top:8px">
        <label style="display:inline-flex;gap:7px;align-items:center;cursor:pointer;font-size:13.6px">
          <input type="checkbox" id="cd-am" ${TD.AM && TD.AM.bat ? 'checked' : ''}>
          Bật tiếng chuông, sấm và đột phá
        </label>
        <span style="display:inline-flex;gap:8px;align-items:center;font-size:13.6px;color:var(--chu2)">
          🔊 <input type="range" id="cd-amluong" min="0" max="100" step="5"
            value="${Math.round((TD.AM ? TD.AM.am_luong : 0.5) * 100)}" style="width:130px;vertical-align:middle">
          <b id="cd-amso" style="color:var(--kim);min-width:38px;display:inline-block">${Math.round((TD.AM ? TD.AM.am_luong : 0.5) * 100)}%</b>
        </span>
        <button class="nut phu" id="cd-nghe" style="padding:6px 13px;font-size:13px">Nghe thử</button>
      </div>
      <p class="mo-nhat" style="margin-top:6px">Tiếng được tổng hợp ngay trong máy nên không cần mạng.
      Trình duyệt chỉ cho phát tiếng sau khi bạn chạm vào trang một lần — bấm "Nghe thử" là mở.</p>
    </div>
    <div class="hang-nut">
      <button class="nut" id="cd-luu">Lưu cài đặt</button>
      <button class="nut phu" id="cd-xuat">Xuất tiến độ</button>
      <button class="nut lua" id="cd-xoa">Xoá toàn bộ tiến độ</button>
    </div>`));

  const oAm = $('#cd-am'), oAL = $('#cd-amluong'), oSo = $('#cd-amso');
  const dat = () => {
    TD.datAmThanh(oAm.checked, +oAL.value / 100);
    oSo.textContent = oAL.value + '%';
  };
  oAm.onchange = () => { dat(); if (oAm.checked) TD.keu('dung', 2); };
  oAL.oninput = dat;
  oAL.onchange = () => { dat(); TD.keu('dung', 2); };
  $('#cd-nghe').onclick = () => { dat(); TD.ngheThu(); };

  $('#cd-luu').onclick = () => {
    TD.S.ten = $('#cd-ten').value.trim() || 'Đạo hữu';
    TD.S.ngay_thi = $('#cd-ngay').value || TD.S.ngay_thi;
    TD.S.bat_dau = $('#cd-batdau').value || TD.S.bat_dau;
    TD.S.chi_tieu_ngay = Math.max(5, Math.min(200, +$('#cd-chitieu').value || 30));
    const ch = [...document.querySelectorAll('.ck-mon:checked')].map(x => x.value);
    if (ch.length) TD.S.to_hop = ch;
    TD.luu(); TD.bao('✓ Đã lưu cài đặt', 'kim'); TD.di('dongphu');
  };

  $('#cd-xuat').onclick = () => {
    const d = JSON.stringify(TD.S, null, 2);
    const w = window.open('', '_blank');
    if (w) { w.document.write('<pre style="white-space:pre-wrap;word-break:break-all;font-size:12px">' +
      d.replace(/</g, '&lt;') + '</pre>'); w.document.close(); }
    else TD.bao('Trình duyệt chặn cửa sổ mới.', 'lua');
  };

  $('#cd-xoa').onclick = () => {
    if (!confirm('Xoá toàn bộ tiến độ tu luyện? Hành động này không thể hoàn tác.')) return;
    TD.xoaHet(); TD.bao('Đã trở về Phàm Nhân.', 'lua'); TD.di('dongphu');
  };

  /* thống kê chi tiết */
  const dong = TD.THU_TU_MON.map(m => {
    const t = TD.S.thong_ke[m]; if (!t) return '';
    const cot = [1, 2, 3, 4].map(mu => {
      const o = t[mu];
      return `<td>${o ? Math.round((o.dung / o.tong) * 100) + '% <span class="mo-nhat">(' + o.dung + '/' + o.tong + ')</span>' : '—'}</td>`;
    }).join('');
    return `<tr><td><b>${TD.MON[m].icon} ${TD.MON[m].ten}</b></td>${cot}
      <td><b style="color:var(--kim)">${TD.uocLuongDiem(m) ?? '—'}</b></td></tr>`;
  }).filter(Boolean).join('');

  if (dong) {
    c.appendChild(el('div', 'the', `<h3>📊 Thống kê chi tiết theo mức độ</h3>
      <div class="cuon-ngang"><table class="kq">
        <tr><th>Môn</th><th>Nhận biết</th><th>Thông hiểu</th><th>Vận dụng</th><th>VD cao</th><th>Điểm ước lượng</th></tr>
        ${dong}
      </table></div>
      <p class="mo-nhat tren12">Nhìn vào hàng nào có tỉ lệ thấp nhất — đó chính là chỗ cần dồn thời gian tuần tới.</p>`));
  }
};

/* ============================================================
   KHỞI ĐỘNG
   ============================================================ */
TD.khoiDong = function () {
  TD.S = TD.tai();
  if (TD.AM) { TD.AM.bat = TD.S.am_thanh !== false; TD.AM.am_luong = TD.S.am_luong === undefined ? 0.5 : TD.S.am_luong; }
  TD.dangKyMauTuMenhDe();     /* mọi môn đều có đề tự sinh, kể cả khối xã hội */
  TD.dangKyVdcMc();           /* bản trắc nghiệm của các mẫu vận dụng cao, cho Phần I có câu phân hoá */

  const nav = $('#tab');
  TD.MAN.forEach(([k, t]) => {
    const b = el('button', '', t);
    b.dataset.m = k;
    b.onclick = () => TD.di(k);
    nav.appendChild(b);
  });

  TD.diemDanh();
  TD.di('dongphu');

  /* chào mừng lần đầu */
  if (TD.S.exp === 0 && !Object.keys(TD.S.thong_ke).length) {
    setTimeout(() => TD.bao('☯ Chào mừng đạo hữu. Hãy bắt đầu từ Luyện Công.', 'kim'), 600);
  }
};

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', TD.khoiDong);
  else TD.khoiDong();
}
