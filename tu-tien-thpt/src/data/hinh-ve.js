/* ============================================================
   BỘ VẼ HÌNH — SVG SINH THEO THAM SỐ
   Đề thi thật đầy hình: bảng biến thiên và đồ thị hàm số ở Toán,
   sơ đồ phả hệ ở Sinh, đồ thị kết tủa ở Hoá, mạch điện ở Lý, biểu
   đồ ở Địa. Trước đây app chỉ có chữ, nên mất hẳn một mảng câu hỏi
   mà học sinh chắc chắn gặp trong phòng thi.
   Mọi hình ở đây đều vẽ bằng SVG dựng ngay tại chỗ theo tham số,
   nên mỗi lần sinh là một hình khác — không phải ảnh dán sẵn, và
   không cần tải gì từ mạng.
   ============================================================ */
window.TD = window.TD || {};

(function () {
/* Màu lấy theo biến CSS của giao diện để hình hợp tông cả sáng lẫn tối */
const M = {
  truc: 'var(--chu3)', net: 'var(--ngoc)', chu: 'var(--chu2)',
  nhan: 'var(--kim)', phu: 'var(--vien)', do: 'var(--lua)', tim: 'var(--tim)'
};
const so = n => (Math.round(n * 100) / 100);
/* Trục tung chia làm 4 vạch, nên đỉnh trục phải chọn sao cho mỗi vạch là một
   con số TRÒN. Trước đây lấy thẳng max×1,15 nên vạch ra 27,03 – 54,05 – 81,07,
   nhìn như lỗi in. */
const mocDep = raw => {
  if (!(raw > 0)) return 4;
  const mu = Math.pow(10, Math.floor(Math.log10(raw / 4)));
  for (const c of [1, 2, 2.5, 5, 10]) if (c * mu * 4 >= raw) return c * mu * 4;
  return 10 * mu * 4;
};
const boc = (rong, cao, than) =>
  `<div class="khung-hinh"><svg viewBox="0 0 ${rong} ${cao}" width="100%" `
  + `style="max-width:${rong}px;height:auto;display:block;margin:10px auto" `
  + `xmlns="http://www.w3.org/2000/svg" role="img">${than}</svg></div>`;

/* ============================================================
   ① ĐỒ THỊ HÀM SỐ — vẽ từ chính hàm số, không vẽ phác
   ============================================================ */
TD.hinhDoThi = function (f, cf) {
  const c = Object.assign({ xMin: -3.2, xMax: 3.2, yMin: -5, yMax: 5, rong: 320, cao: 260 }, cf || {});
  const W = c.rong, H = c.cao, le = 26;
  const X = x => le + (x - c.xMin) / (c.xMax - c.xMin) * (W - 2 * le);
  const Y = y => H - le - (y - c.yMin) / (c.yMax - c.yMin) * (H - 2 * le);

  /* Khi gốc toạ độ nằm NGOÀI vùng vẽ (đồ thị chỉ có phần y dương chẳng hạn)
     thì Y(0) rơi ra ngoài khung, kéo theo cả hàng nhãn trục biến mất. Kẹp lại
     đúng như sách: nhãn hoành độ chạy dọc mép dưới, nhãn tung độ dọc mép trái. */
  const kep = (v, min, max) => Math.min(Math.max(v, min), max);
  const yNhan = kep(Y(0) + 13, le + 11, H - 5);
  const xNhan = kep(X(0) - 6, 15, W - 5);
  /* Không ghi mọi số nguyên: đồ thị có biên độ lớn (nhiệt độ từ −30 đến 30
     chẳng hạn) sẽ xếp sáu chục nhãn chồng lên nhau thành một vệt đen. Chọn
     bước chia sao cho mỗi trục nhiều nhất mười vạch. */
  const buocChia = (min, max) => {
    const n = Math.floor(max) - Math.ceil(min);
    for (const b of [1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000, 2000, 5000]) if (n / b <= 10) return b;
    return Math.ceil(n / 10);
  };
  const bx = buocChia(c.xMin, c.xMax), by = buocChia(c.yMin, c.yMax);
  let luoi = '';
  /* Vạch sát mép khung thì bỏ nhãn: chữ nằm chồng lên chính đường viền, in ra
     giấy trông như số bị cắt mất một nửa. */
  for (let x = Math.ceil(c.xMin / bx) * bx; x <= c.xMax; x += bx) {
    if (x === 0) continue;
    luoi += `<line x1="${so(X(x))}" y1="${le}" x2="${so(X(x))}" y2="${H - le}" stroke="${M.phu}" stroke-width="1"/>`;
    if (X(x) > le + 7 && X(x) < W - le - 7)
      luoi += `<text x="${so(X(x))}" y="${so(yNhan)}" fill="${M.chu}" font-size="10" text-anchor="middle">${so(x)}</text>`;
  }
  for (let y = Math.ceil(c.yMin / by) * by; y <= c.yMax; y += by) {
    if (y === 0) continue;
    luoi += `<line x1="${le}" y1="${so(Y(y))}" x2="${W - le}" y2="${so(Y(y))}" stroke="${M.phu}" stroke-width="1"/>`;
    if (Y(y) > le + 7 && Y(y) < H - le - 7)
      luoi += `<text x="${so(xNhan)}" y="${so(Y(y) + 3.5)}" fill="${M.chu}" font-size="10" text-anchor="end">${so(y)}</text>`;
  }
  /* Trục chỉ vẽ khi nó thật sự nằm trong vùng hiển thị; nếu không thì thay
     bằng khung viền, và không ghi chữ O ở nơi không có gốc toạ độ. */
  const coX = c.yMin <= 0 && c.yMax >= 0, coY = c.xMin <= 0 && c.xMax >= 0;
  const truc = `<rect x="${le}" y="${le}" width="${W - 2 * le}" height="${H - 2 * le}" fill="none" stroke="${M.phu}" stroke-width="1.2"/>`
    + (coX ? `<line x1="${le}" y1="${so(Y(0))}" x2="${W - le + 6}" y2="${so(Y(0))}" stroke="${M.truc}" stroke-width="1.6"/>` : '')
    + (coY ? `<line x1="${so(X(0))}" y1="${le - 6}" x2="${so(X(0))}" y2="${H - le}" stroke="${M.truc}" stroke-width="1.6"/>` : '')
    + `<text x="${W - le + 9}" y="${so(kep(Y(0) - 5, le + 4, H - 4))}" fill="${M.chu}" font-size="11">x</text>`
    + `<text x="${so(kep(X(0) + 6, 4, W - 12))}" y="${le - 8}" fill="${M.chu}" font-size="11">y</text>`
    + (coX && coY ? `<text x="${so(xNhan)}" y="${so(yNhan)}" fill="${M.chu}" font-size="10" text-anchor="end">O</text>` : '');

  /* Vẽ theo từng đoạn liên tục: gặp tiệm cận đứng thì ngắt nét, không nối bừa */
  const doan = [];
  let hienTai = [];
  const buoc = (c.xMax - c.xMin) / 400;
  let truocY = null;
  for (let x = c.xMin; x <= c.xMax; x += buoc) {
    const y = f(x);
    /* Ra khỏi khung thì NGẮT nét, không kẹp giá trị lại. Kẹp thì đường cong
       bị bẻ thành một đoạn nằm ngang dính mép khung, nhìn như đồ thị có đoạn
       hằng số — sai hẳn bản chất hàm số. */
    const hopLe = Number.isFinite(y) && y >= c.yMin && y <= c.yMax;
    const nhay = truocY !== null && Math.abs(y - truocY) > (c.yMax - c.yMin) * 0.9;
    if (!hopLe || nhay) { if (hienTai.length > 1) doan.push(hienTai); hienTai = []; }
    if (hopLe) hienTai.push(`${so(X(x))},${so(Y(y))}`);
    truocY = Number.isFinite(y) ? y : null;
  }
  if (hienTai.length > 1) doan.push(hienTai);
  const net = doan.map(d => `<polyline points="${d.join(' ')}" fill="none" stroke="${M.net}" stroke-width="2.2"/>`).join('');

  const them = (c.tiemCan || []).map(t => t.doc !== undefined
    ? `<line x1="${so(X(t.doc))}" y1="${le}" x2="${so(X(t.doc))}" y2="${H - le}" stroke="${M.do}" stroke-width="1.3" stroke-dasharray="5 4"/>`
    : `<line x1="${le}" y1="${so(Y(t.ngang))}" x2="${W - le}" y2="${so(Y(t.ngang))}" stroke="${M.do}" stroke-width="1.3" stroke-dasharray="5 4"/>`).join('');
  const diem = (c.diem || []).map(d =>
    `<circle cx="${so(X(d.x))}" cy="${so(Y(d.y))}" r="3.4" fill="${M.nhan}"/>`
    + (d.ten ? `<text x="${so(X(d.x) + 7)}" y="${so(Y(d.y) - 6)}" fill="${M.nhan}" font-size="10.5">${d.ten}</text>` : '')).join('');
  const ngang = (c.duongNgang || []).map(y =>
    `<line x1="${le}" y1="${so(Y(y))}" x2="${W - le}" y2="${so(Y(y))}" stroke="${M.tim}" stroke-width="1.4" stroke-dasharray="7 4"/>`).join('');
  return boc(W, H, luoi + truc + them + ngang + net + diem);
};

/* ============================================================
   ② BẢNG BIẾN THIÊN — dạng bảng thật của SGK
   moc = [{x:'−∞'|số, y:'+∞'|'−∞'|số, dau:'+'|'−'}]
   ============================================================ */
TD.hinhBangBienThien = function (moc, nhanHam) {
  const n = moc.length;
  const rongCot = 92, le = 46;
  const W = le + rongCot * (n - 1) + 40, H = 150;
  const X = i => le + rongCot * i + 20;
  let ra = `<rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="${M.phu}"/>`;
  [38, 74].forEach(y => { ra += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${M.phu}"/>`; });
  ra += `<line x1="${le - 6}" y1="0" x2="${le - 6}" y2="${H}" stroke="${M.phu}"/>`;
  ra += `<text x="8" y="25" fill="${M.chu}" font-size="12.5">x</text>`
     + `<text x="8" y="61" fill="${M.chu}" font-size="12.5">y′</text>`
     + `<text x="8" y="112" fill="${M.chu}" font-size="12.5">${nhanHam || 'y'}</text>`;

  moc.forEach((m, i) => {
    ra += `<text x="${X(i)}" y="25" fill="${M.chu}" font-size="12.5" text-anchor="middle">${m.x}</text>`;
    if (i < n - 1) {
      const giua = (X(i) + X(i + 1)) / 2;
      ra += `<text x="${giua}" y="61" fill="${m.dau === '+' ? M.net : M.do}" font-size="14" font-weight="700" text-anchor="middle">${m.dau === '+' ? '+' : '−'}</text>`;
      /* mũi tên lên hoặc xuống trong ô giá trị */
      const y1 = m.dau === '+' ? 132 : 90, y2 = m.dau === '+' ? 90 : 132;
      ra += `<line x1="${X(i) + 22}" y1="${y1}" x2="${X(i + 1) - 22}" y2="${y2}" stroke="${M.net}" stroke-width="1.8" marker-end="url(#mt)"/>`;
    }
    if (m.mocDung) ra += `<line x1="${X(i)}" y1="42" x2="${X(i)}" y2="${H}" stroke="${M.phu}" stroke-dasharray="3 3"/>`;
    if (m.y !== undefined)
      ra += `<text x="${X(i)}" y="${m.tren ? 90 : 137}" fill="${M.nhan}" font-size="12.5" text-anchor="middle">${m.y}</text>`;
    if (m.khong) ra += `<text x="${X(i)}" y="61" fill="${M.chu}" font-size="12.5" text-anchor="middle">0</text>`;
  });
  const dinhNghia = `<defs><marker id="mt" markerWidth="7" markerHeight="7" refX="6" refY="3.2" orient="auto">`
    + `<path d="M0,0 L7,3.2 L0,6.4 Z" fill="${M.net}"/></marker></defs>`;
  return boc(W, H, dinhNghia + ra);
};

/* ============================================================
   ③ SƠ ĐỒ PHẢ HỆ — dạng vận dụng cao của Sinh
   nguoi = [{id, doi, x, nam:bool, benh:bool}] · cap = [[idChong,idVo]]
   con = [{cha, me, ds:[id...]}]
   ============================================================ */
TD.hinhPhaHe = function (nguoi, cap, con) {
  const W = 340, doiCao = 78, H = 40 + Math.max(...nguoi.map(x => x.doi)) * doiCao + 42;
  const X = x => 34 + x * 46;
  const Y = d => 34 + (d - 1) * doiCao;
  const tim = id => nguoi.find(n => n.id === id);
  let ra = '';
  /* nhãn thế hệ */
  [...new Set(nguoi.map(n => n.doi))].sort().forEach(d => {
    ra += `<text x="10" y="${Y(d) + 4}" fill="${M.chu}" font-size="11.5">${'I'.repeat(d)}</text>`;
  });
  /* đường nối vợ chồng và xuống con */
  cap.forEach(([a, b]) => {
    const p = tim(a), q = tim(b); if (!p || !q) return;
    ra += `<line x1="${X(p.x) + 11}" y1="${Y(p.doi)}" x2="${X(q.x) - 11}" y2="${Y(q.doi)}" stroke="${M.truc}" stroke-width="1.6"/>`;
  });
  con.forEach(nh => {
    const c1 = tim(nh.cha), c2 = tim(nh.me); if (!c1 || !c2) return;
    const gx = (X(c1.x) + X(c2.x)) / 2, gy = Y(c1.doi);
    const ds = nh.ds.map(tim).filter(Boolean); if (!ds.length) return;
    const cy = Y(ds[0].doi);
    ra += `<line x1="${gx}" y1="${gy}" x2="${gx}" y2="${(gy + cy) / 2}" stroke="${M.truc}" stroke-width="1.6"/>`;
    const xs = ds.map(d => X(d.x));
    ra += `<line x1="${Math.min(...xs)}" y1="${(gy + cy) / 2}" x2="${Math.max(...xs)}" y2="${(gy + cy) / 2}" stroke="${M.truc}" stroke-width="1.6"/>`;
    ds.forEach(d => { ra += `<line x1="${X(d.x)}" y1="${(gy + cy) / 2}" x2="${X(d.x)}" y2="${cy - 11}" stroke="${M.truc}" stroke-width="1.6"/>`; });
  });
  /* nam là hình vuông, nữ là hình tròn; bị bệnh thì tô đặc */
  nguoi.forEach(n => {
    const x = X(n.x), y = Y(n.doi), to = n.benh ? M.do : 'transparent';
    ra += n.nam
      ? `<rect x="${x - 11}" y="${y - 11}" width="22" height="22" fill="${to}" stroke="${M.truc}" stroke-width="1.8"/>`
      : `<circle cx="${x}" cy="${y}" r="11" fill="${to}" stroke="${M.truc}" stroke-width="1.8"/>`;
    ra += `<text x="${x}" y="${y + 24}" fill="${M.chu}" font-size="9.5" text-anchor="middle">${n.id}</text>`;
  });
  /* chú giải */
  const cy = H - 12;
  ra += `<rect x="34" y="${cy - 7}" width="12" height="12" fill="transparent" stroke="${M.truc}" stroke-width="1.5"/>`
     + `<text x="51" y="${cy + 3}" fill="${M.chu}" font-size="10">nam</text>`
     + `<circle cx="99" cy="${cy - 1}" r="6" fill="transparent" stroke="${M.truc}" stroke-width="1.5"/>`
     + `<text x="110" y="${cy + 3}" fill="${M.chu}" font-size="10">nữ</text>`
     + `<rect x="146" y="${cy - 7}" width="12" height="12" fill="${M.do}" stroke="${M.truc}" stroke-width="1.5"/>`
     + `<text x="163" y="${cy + 3}" fill="${M.chu}" font-size="10">bị bệnh</text>`;
  return boc(W, H, ra);
};

/* ============================================================
   ④ ĐỒ THỊ KẾT TỦA — dạng tam giác lệch kinh điển của Hoá
   ============================================================ */
TD.hinhKetTua = function (aMol, dinh, tenX, tenY) {
  const W = 320, H = 230, le = 42;
  const xMax = 4 * aMol * 1.12, yMax = aMol * 1.28;
  const X = x => le + x / xMax * (W - le - 22);
  const Y = y => H - le - y / yMax * (H - le - 24);
  let ra = `<line x1="${le}" y1="${H - le}" x2="${W - 12}" y2="${H - le}" stroke="${M.truc}" stroke-width="1.6"/>`
    + `<line x1="${le}" y1="16" x2="${le}" y2="${H - le}" stroke="${M.truc}" stroke-width="1.6"/>`
    + `<text x="${W - 10}" y="${H - le + 15}" fill="${M.chu}" font-size="10.5" text-anchor="end">${tenX || 'n(OH⁻)'}</text>`
    + `<text x="3" y="12" fill="${M.chu}" font-size="10.5">${tenY || 'n↓'}</text>`;
  /* nhánh lên tới đỉnh (3a) rồi nhánh xuống về 0 (4a) */
  ra += `<polyline points="${so(X(0))},${so(Y(0))} ${so(X(3 * aMol))},${so(Y(aMol))} ${so(X(4 * aMol))},${so(Y(0))}" `
     + `fill="none" stroke="${M.net}" stroke-width="2.4"/>`;
  ra += `<line x1="${so(X(3 * aMol))}" y1="${so(Y(aMol))}" x2="${so(X(3 * aMol))}" y2="${so(Y(0))}" stroke="${M.phu}" stroke-dasharray="4 3"/>`
     + `<line x1="${le}" y1="${so(Y(aMol))}" x2="${so(X(3 * aMol))}" y2="${so(Y(aMol))}" stroke="${M.phu}" stroke-dasharray="4 3"/>`
     + `<text x="${so(X(aMol * 3))}" y="${H - le + 14}" fill="${M.nhan}" font-size="10.5" text-anchor="middle">3a</text>`
     + `<text x="${so(X(aMol * 4))}" y="${H - le + 14}" fill="${M.nhan}" font-size="10.5" text-anchor="middle">4a</text>`
     + `<text x="${le - 5}" y="${so(Y(aMol) + 4)}" fill="${M.nhan}" font-size="10.5" text-anchor="end">a</text>`;
  (dinh || []).forEach(d => {
    ra += `<circle cx="${so(X(d.x))}" cy="${so(Y(d.y))}" r="3.6" fill="${M.do}"/>`
       + `<line x1="${so(X(d.x))}" y1="${so(Y(d.y))}" x2="${so(X(d.x))}" y2="${so(Y(0))}" stroke="${M.do}" stroke-width="1" stroke-dasharray="3 3"/>`
       + (d.ten ? `<text x="${so(X(d.x))}" y="${so(Y(d.y) - 8)}" fill="${M.do}" font-size="10.5" text-anchor="middle">${d.ten}</text>` : '');
  });
  return boc(W, H, ra);
};

/* Đồ thị tam giác lệch tổng quát: lên tới đỉnh rồi xuống về 0.
   Dùng chung cho kết tủa nhôm (3a, 4a) lẫn sục CO₂ vào Ca(OH)₂ (a, 2a). */
TD.hinhTamGiac = function (xDinh, xHet, yDinh, ten, dinh) {
  const W = 320, H = 230, le = 44;
  const xMax = xHet * 1.14, yMax = yDinh * 1.3;
  const X = x => le + x / xMax * (W - le - 22);
  const Y = y => H - le - y / yMax * (H - le - 24);
  let ra = `<line x1="${le}" y1="${H - le}" x2="${W - 12}" y2="${H - le}" stroke="${M.truc}" stroke-width="1.6"/>`
    + `<line x1="${le}" y1="16" x2="${le}" y2="${H - le}" stroke="${M.truc}" stroke-width="1.6"/>`
    + `<text x="${W - 10}" y="${H - le + 15}" fill="${M.chu}" font-size="10.5" text-anchor="end">${(ten && ten.x) || 'n'}</text>`
    + `<text x="3" y="12" fill="${M.chu}" font-size="10.5">${(ten && ten.y) || 'n↓'}</text>`
    + `<polyline points="${so(X(0))},${so(Y(0))} ${so(X(xDinh))},${so(Y(yDinh))} ${so(X(xHet))},${so(Y(0))}" fill="none" stroke="${M.net}" stroke-width="2.4"/>`
    + `<line x1="${so(X(xDinh))}" y1="${so(Y(yDinh))}" x2="${so(X(xDinh))}" y2="${so(Y(0))}" stroke="${M.phu}" stroke-dasharray="4 3"/>`
    + `<line x1="${le}" y1="${so(Y(yDinh))}" x2="${so(X(xDinh))}" y2="${so(Y(yDinh))}" stroke="${M.phu}" stroke-dasharray="4 3"/>`
    + `<text x="${so(X(xDinh))}" y="${H - le + 14}" fill="${M.nhan}" font-size="10.5" text-anchor="middle">${(ten && ten.dinh) || ''}</text>`
    + `<text x="${so(X(xHet))}" y="${H - le + 14}" fill="${M.nhan}" font-size="10.5" text-anchor="middle">${(ten && ten.het) || ''}</text>`;
  (dinh || []).forEach(d => {
    ra += `<circle cx="${so(X(d.x))}" cy="${so(Y(d.y))}" r="3.6" fill="${M.do}"/>`
       + `<line x1="${so(X(d.x))}" y1="${so(Y(d.y))}" x2="${so(X(d.x))}" y2="${so(Y(0))}" stroke="${M.do}" stroke-width="1" stroke-dasharray="3 3"/>`
       + (d.ten ? `<text x="${so(X(d.x))}" y="${so(Y(d.y) - 8)}" fill="${M.do}" font-size="10.5" text-anchor="middle">${d.ten}</text>` : '');
  });
  return boc(W, H, ra);
};

/* ============================================================
   ⑤ BIỂU ĐỒ CỘT / TRÒN — cho Địa lí và GDKT
   ============================================================ */
TD.hinhCot = function (ds, donVi) {
  const W = 330, H = 224, le = 44, day = H - 40, dinh = 32;
  const max = mocDep(Math.max(...ds.map(d => d.v)));
  const rong = (W - le - 16) / ds.length;
  /* tên đơn vị đặt ở góc trên bên TRÁI, canh trái — canh phải từ mép trục thì
     chuỗi dài như "g/100 g nước" bị đẩy ra ngoài khung và cụt mất đầu */
  let ra = `<line x1="${le}" y1="${day}" x2="${W - 8}" y2="${day}" stroke="${M.truc}" stroke-width="1.5"/>`
    + `<line x1="${le}" y1="${dinh - 6}" x2="${le}" y2="${day}" stroke="${M.truc}" stroke-width="1.5"/>`
    + `<text x="3" y="12" fill="${M.chu}" font-size="10">${donVi || ''}</text>`;
  for (let k = 0; k <= 4; k++) {
    const y = day - k / 4 * (day - dinh), gt = so(max * k / 4);
    ra += `<line x1="${le}" y1="${so(y)}" x2="${W - 8}" y2="${so(y)}" stroke="${M.phu}" stroke-width="1"/>`
       + `<text x="${le - 5}" y="${so(y + 3.5)}" fill="${M.chu}" font-size="9.5" text-anchor="end">${String(gt).replace('.', ',')}</text>`;
  }
  ds.forEach((d, i) => {
    const h = d.v / max * (day - dinh), x = le + i * rong + rong * 0.2;
    ra += `<rect x="${so(x)}" y="${so(day - h)}" width="${so(rong * 0.6)}" height="${so(h)}" fill="${i % 2 ? M.net : M.nhan}" opacity="0.85"/>`
       + `<text x="${so(x + rong * 0.3)}" y="${so(day - h - 5)}" fill="${M.chu}" font-size="9.5" text-anchor="middle">${String(d.v).replace('.', ',')}</text>`
       + `<text x="${so(x + rong * 0.3)}" y="${day + 14}" fill="${M.chu}" font-size="10" text-anchor="middle">${d.ten}</text>`;
  });
  return boc(W, H, ra);
};

TD.hinhTron = function (ds) {
  /* Chú giải tách làm HAI dòng (tên rồi tới tỉ lệ) và khung nới rộng ra:
     ghép "tên · nn%" trên một dòng thì tên dài như "Nông – lâm – thuỷ sản"
     chạy quá mép phải và bị cắt cụt. */
  const W = 344, H = Math.max(210, 34 + ds.length * 32), cx = 84, cy = 104, r = 70;
  const tong = ds.reduce((a, b) => a + b.v, 0);
  const mau = [M.net, M.nhan, M.tim, M.do, 'var(--lam)'];
  let goc = -Math.PI / 2, ra = '', chu = '';
  ds.forEach((d, i) => {
    const q = d.v / tong * Math.PI * 2, het = goc + q;
    const x1 = cx + r * Math.cos(goc), y1 = cy + r * Math.sin(goc);
    const x2 = cx + r * Math.cos(het), y2 = cy + r * Math.sin(het);
    ra += `<path d="M ${cx} ${cy} L ${so(x1)} ${so(y1)} A ${r} ${r} 0 ${q > Math.PI ? 1 : 0} 1 ${so(x2)} ${so(y2)} Z" `
       + `fill="${mau[i % mau.length]}" opacity="0.85" stroke="var(--nen)" stroke-width="1.5"/>`;
    chu += `<rect x="172" y="${22 + i * 32}" width="12" height="12" fill="${mau[i % mau.length]}" opacity="0.85"/>`
        + `<text x="190" y="${32 + i * 32}" fill="${M.chu}" font-size="10.5">${d.ten}</text>`
        + `<text x="190" y="${45 + i * 32}" fill="${M.nhan}" font-size="10.5" font-weight="700">${String(so(d.v / tong * 100)).replace('.', ',')}%</text>`;
    goc = het;
  });
  return boc(W, H, ra + chu);
};

/* ============================================================
   ⑦ KHỐI HÌNH HỌC KHÔNG GIAN — chóp và lăng trụ
   Vẽ theo phép chiếu song song như SGK: cạnh khuất nét đứt.
   ============================================================ */
TD.hinhKhoi = function (kieu, nhan) {
  const W = 300, H = 230;
  const t = nhan || {};
  const net = (x1, y1, x2, y2, dut) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${M.truc}" stroke-width="1.7"${dut ? ' stroke-dasharray="5 4"' : ''}/>`;
  const ten = (x, y, c) => `<text x="${x}" y="${y}" fill="${M.nhan}" font-size="11.5" text-anchor="middle">${c}</text>`;
  const canh = (x1, y1, x2, y2, c) =>
    c ? `<text x="${(x1 + x2) / 2 + 8}" y="${(y1 + y2) / 2}" fill="${M.chu}" font-size="10.5">${c}</text>` : '';
  let ra = '';
  if (kieu === 'chop') {
    /* đáy ABCD là hình bình hành nhìn nghiêng, đỉnh S ở trên A */
    const A = [70, 175], B = [200, 175], C = [245, 140], D = [115, 140], S = [70, 45];
    ra += net(A[0], A[1], B[0], B[1]) + net(B[0], B[1], C[0], C[1]) + net(C[0], C[1], D[0], D[1], true)
       + net(D[0], D[1], A[0], A[1], true)
       + net(S[0], S[1], A[0], A[1]) + net(S[0], S[1], B[0], B[1]) + net(S[0], S[1], C[0], C[1])
       + net(S[0], S[1], D[0], D[1], true);
    /* dấu góc vuông tại A cho biết SA ⊥ đáy */
    ra += `<path d="M ${A[0]} ${A[1] - 13} L ${A[0] + 13} ${A[1] - 13} L ${A[0] + 13} ${A[1]}" fill="none" stroke="${M.do}" stroke-width="1.4"/>`;
    ra += ten(S[0] - 10, S[1] - 6, 'S') + ten(A[0] - 12, A[1] + 6, 'A') + ten(B[0] + 4, B[1] + 15, 'B')
       + ten(C[0] + 12, C[1] - 2, 'C') + ten(D[0] - 6, D[1] - 8, 'D');
    ra += canh(A[0], A[1], B[0], B[1], t.day) + canh(S[0], S[1], A[0], A[1], t.cao);
  } else {
    /* lăng trụ đứng đáy tam giác */
    const A = [70, 180], B = [190, 180], C = [130, 148];
    const d = -85;
    const A2 = [A[0], A[1] + d], B2 = [B[0], B[1] + d], C2 = [C[0], C[1] + d];
    ra += net(A[0], A[1], B[0], B[1]) + net(B[0], B[1], C[0], C[1]) + net(C[0], C[1], A[0], A[1], true)
       + net(A2[0], A2[1], B2[0], B2[1]) + net(B2[0], B2[1], C2[0], C2[1]) + net(C2[0], C2[1], A2[0], A2[1])
       + net(A[0], A[1], A2[0], A2[1]) + net(B[0], B[1], B2[0], B2[1]) + net(C[0], C[1], C2[0], C2[1], true);
    ra += ten(A[0] - 12, A[1] + 6, 'A') + ten(B[0] + 12, B[1] + 6, 'B') + ten(C[0] + 12, C[1] + 2, 'C')
       + ten(A2[0] - 12, A2[1], "A′") + ten(B2[0] + 12, B2[1], "B′") + ten(C2[0] + 12, C2[1] - 4, "C′");
    ra += canh(A[0], A[1], B[0], B[1], t.day) + canh(A[0], A[1], A2[0], A2[1], t.cao);
  }
  return boc(W, H, ra);
};

/* ============================================================
   ⑧ BIỂU ĐỒ ĐƯỜNG / MIỀN / KẾT HỢP — cho Địa lí và GDKT
   ds = [{ten, v:[...]}]  ·  nhan = [nhãn trục hoành]
   ============================================================ */
const MAU_DAY = [M.net, M.nhan, M.tim, 'var(--lam)', M.do];

TD.hinhDuong = function (ds, nhan, donVi) {
  const W = 340, H = 248, le = 46, day = H - 64, dinh = 30;
  const max = mocDep(Math.max(...ds.flatMap(d => d.v)));
  const X = i => le + i * (W - le - 14) / Math.max(1, nhan.length - 1);
  const Y = v => day - v / max * (day - dinh);
  let ra = `<line x1="${le}" y1="${day}" x2="${W - 8}" y2="${day}" stroke="${M.truc}" stroke-width="1.5"/>`
    + `<line x1="${le}" y1="${dinh - 6}" x2="${le}" y2="${day}" stroke="${M.truc}" stroke-width="1.5"/>`
    + `<text x="3" y="12" fill="${M.chu}" font-size="10">${donVi || ''}</text>`;
  for (let k = 0; k <= 4; k++) {
    const y = day - k / 4 * (day - dinh);
    ra += `<line x1="${le}" y1="${so(y)}" x2="${W - 8}" y2="${so(y)}" stroke="${M.phu}" stroke-width="1"/>`
       + `<text x="${le - 5}" y="${so(y + 3.5)}" fill="${M.chu}" font-size="9.5" text-anchor="end">${String(so(max * k / 4)).replace('.', ',')}</text>`;
  }
  nhan.forEach((n, i) => { ra += `<text x="${so(X(i))}" y="${day + 15}" fill="${M.chu}" font-size="10" text-anchor="middle">${n}</text>`; });
  ds.forEach((d, k) => {
    const mau = MAU_DAY[k % MAU_DAY.length];
    ra += `<polyline points="${d.v.map((v, i) => so(X(i)) + ',' + so(Y(v))).join(' ')}" fill="none" stroke="${mau}" stroke-width="2.2"/>`;
    d.v.forEach((v, i) => { ra += `<circle cx="${so(X(i))}" cy="${so(Y(v))}" r="3" fill="${mau}"/>`; });
    /* chú giải chuyển xuống chân hình cho khỏi tranh chỗ với tên đơn vị */
    ra += `<rect x="${6 + k * 150}" y="${H - 17}" width="10" height="10" fill="${mau}"/>`
       + `<text x="${20 + k * 150}" y="${H - 8}" fill="${M.chu}" font-size="10">${d.ten}</text>`;
  });
  return boc(W, H, ra);
};

TD.hinhMien = function (ds, nhan) {
  const W = 340, H = 252, le = 40, day = H - 74;
  const X = i => le + i * (W - le - 14) / Math.max(1, nhan.length - 1);
  const Y = v => day - v / 100 * (day - 20);
  let ra = '', duoi = nhan.map(() => 0);
  ds.forEach((d, k) => {
    const tren = duoi.map((b, i) => b + d.v[i]);
    const diem = tren.map((v, i) => so(X(i)) + ',' + so(Y(v)))
      .concat(duoi.map((v, i) => so(X(i)) + ',' + so(Y(v))).reverse());
    ra += `<polygon points="${diem.join(' ')}" fill="${MAU_DAY[k % MAU_DAY.length]}" opacity="0.8" stroke="var(--nen)" stroke-width="1"/>`;
    /* chú giải đặt dưới chân hình, đứng trên nền trống — để ở đỉnh thì chữ
       nằm đè lên chính các dải màu của biểu đồ */
    ra += `<rect x="${4 + (k % 2) * 172}" y="${H - 32 + Math.floor(k / 2) * 15}" width="10" height="10" fill="${MAU_DAY[k % MAU_DAY.length]}" opacity="0.8"/>`
       + `<text x="${18 + (k % 2) * 172}" y="${H - 23 + Math.floor(k / 2) * 15}" fill="${M.chu}" font-size="9.5">${d.ten}</text>`;
    duoi = tren;
  });
  ra += `<line x1="${le}" y1="${day}" x2="${W - 8}" y2="${day}" stroke="${M.truc}" stroke-width="1.5"/>`
     + `<line x1="${le}" y1="18" x2="${le}" y2="${day}" stroke="${M.truc}" stroke-width="1.5"/>`
     + `<text x="${le - 4}" y="15" fill="${M.chu}" font-size="10" text-anchor="end">%</text>`;
  [0, 25, 50, 75, 100].forEach(v => {
    ra += `<text x="${le - 5}" y="${so(Y(v) + 3.5)}" fill="${M.chu}" font-size="9.5" text-anchor="end">${v}</text>`;
  });
  nhan.forEach((n, i) => { ra += `<text x="${so(X(i))}" y="${day + 15}" fill="${M.chu}" font-size="10" text-anchor="middle">${n}</text>`; });
  return boc(W, H, ra);
};

TD.hinhKetHop = function (cot, duong, nhan, dvCot, dvDuong) {
  const W = 340, H = 236, le = 46, phai = W - 42, day = H - 46, dinh = 34;
  const maxC = mocDep(Math.max(...cot)), maxD = mocDep(Math.max(...duong));
  const rong = (phai - le) / nhan.length;
  const Yc = v => day - v / maxC * (day - dinh);
  const Yd = v => day - v / maxD * (day - dinh);
  let ra = `<line x1="${le}" y1="${day}" x2="${phai}" y2="${day}" stroke="${M.truc}" stroke-width="1.5"/>`
    + `<line x1="${le}" y1="${dinh - 8}" x2="${le}" y2="${day}" stroke="${M.truc}" stroke-width="1.5"/>`
    + `<line x1="${phai}" y1="${dinh - 8}" x2="${phai}" y2="${day}" stroke="${M.truc}" stroke-width="1.5"/>`
    + `<text x="3" y="12" fill="${M.nhan}" font-size="9.5">${dvCot || ''}</text>`
    + `<text x="${W - 3}" y="12" fill="${M.net}" font-size="9.5" text-anchor="end">${dvDuong || ''}</text>`;
  cot.forEach((v, i) => {
    const x = le + i * rong + rong * 0.24;
    ra += `<rect x="${so(x)}" y="${so(Yc(v))}" width="${so(rong * 0.52)}" height="${so(day - Yc(v))}" fill="${M.nhan}" opacity="0.8"/>`
       + `<text x="${so(x + rong * 0.26)}" y="${day + 15}" fill="${M.chu}" font-size="10" text-anchor="middle">${nhan[i]}</text>`;
  });
  const X = i => le + i * rong + rong * 0.5;
  ra += `<polyline points="${duong.map((v, i) => so(X(i)) + ',' + so(Yd(v))).join(' ')}" fill="none" stroke="${M.net}" stroke-width="2.3"/>`;
  duong.forEach((v, i) => {
    ra += `<circle cx="${so(X(i))}" cy="${so(Yd(v))}" r="3.2" fill="${M.net}"/>`
       + `<text x="${so(X(i))}" y="${so(Yd(v) - 7)}" fill="${M.net}" font-size="9.5" text-anchor="middle">${String(v).replace('.', ',')}</text>`;
  });
  return boc(W, H, ra);
};

/* ============================================================
   ⑨ LƯỚI THỨC ĂN & THÁP SINH THÁI — cho Sinh
   ============================================================ */
TD.hinhLuoi = function (nut, cung) {
  /* Khoảng cách cột phải nới theo tên DÀI NHẤT, nếu không thì hai ô cạnh nhau
     chồng lên nhau và chữ của ô này bị ô kia đè mất. */
  const beRong = n => Math.max(30, n.ten.length * 3.4);
  const buoc = Math.max(74, 2 * Math.max.apply(null, nut.map(beRong)) + 12);
  const cotMax = Math.max.apply(null, nut.map(n => n.x));
  const W = Math.max(340, 36 + buoc * cotMax + 2 * Math.max.apply(null, nut.map(beRong)) + 20);
  const H = 40 + Math.max(...nut.map(n => n.h)) * 62 + 26;
  const X = x => 36 + x * buoc;
  const Y = h => H - 34 - h * 62;
  const tim = id => nut.find(n => n.id === id);
  let ra = `<defs><marker id="mtla" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto">`
    + `<path d="M0,0 L8,3.5 L0,7 Z" fill="${M.net}"/></marker></defs>`;
  cung.forEach(([a, b]) => {
    const p = tim(a), q = tim(b); if (!p || !q) return;
    const x1 = X(p.x), y1 = Y(p.h) - 11, x2 = X(q.x), y2 = Y(q.h) + 13;
    ra += `<line x1="${so(x1)}" y1="${so(y1)}" x2="${so(x2)}" y2="${so(y2)}" stroke="${M.net}" stroke-width="1.6" marker-end="url(#mtla)"/>`;
  });
  nut.forEach(n => {
    const x = X(n.x), y = Y(n.h);
    const r = beRong(n);
    ra += `<rect x="${so(x - r)}" y="${so(y - 11)}" width="${so(r * 2)}" height="22" rx="5" fill="var(--nen2)" stroke="${n.h === 0 ? M.nhan : M.truc}" stroke-width="1.6"/>`
       + `<text x="${so(x)}" y="${so(y + 4)}" fill="${M.chu}" font-size="10.5" text-anchor="middle">${n.ten}</text>`;
  });
  return boc(W, H, ra);
};

TD.hinhThap = function (bac, donVi) {
  /* Nhãn bậc dinh dưỡng phải nằm ở CỘT RIÊNG bên trái. Trước đây viết đè lên
     nền hình nên bậc đáy — rộng nhất — phủ mất chữ "Sinh vật sản xuất". */
  const le = 122, W = 344, H = 40 + bac.length * 40;
  const giua = le + (W - le - 10) / 2, toiDa = (W - le - 10) / 2 - 4;
  const max = Math.max(...bac.map(b => b.v));
  let ra = '';
  bac.forEach((b, i) => {
    const y = 22 + (bac.length - 1 - i) * 40;
    const r = 14 + b.v / max * (toiDa - 14);
    ra += `<rect x="${so(giua - r)}" y="${y}" width="${so(r * 2)}" height="30" fill="${MAU_DAY[i % MAU_DAY.length]}" opacity="0.82" stroke="var(--nen)" stroke-width="1.5"/>`
       + `<text x="${so(giua)}" y="${y + 20}" fill="var(--nen)" font-size="10.5" font-weight="700" text-anchor="middle">${String(b.v).replace('.', ',')}</text>`
       + `<text x="${le - 8}" y="${y + 20}" fill="${M.chu}" font-size="10" text-anchor="end">${b.ten}</text>`;
  });
  ra += `<text x="${W - 6}" y="${H - 6}" fill="${M.chu}" font-size="9.5" text-anchor="end">${donVi || ''}</text>`;
  return boc(W, H, ra);
};

/* ============================================================
   ⑩ GIẢN ĐỒ NĂNG LƯỢNG PHẢN ỨNG — cho Hoá
   ============================================================ */
TD.hinhGianDo = function (hDau, hCuoi, tenDau, tenCuoi) {
  const W = 320, H = 220, le = 46, day = H - 34;
  const lo = Math.min(hDau, hCuoi), hi = Math.max(hDau, hCuoi);
  const bien = (hi - lo) * 0.55 + 1;
  const Y = v => day - (v - (lo - bien)) / ((hi + bien) - (lo - bien)) * (day - 26);
  let ra = `<line x1="${le}" y1="18" x2="${le}" y2="${day}" stroke="${M.truc}" stroke-width="1.6"/>`
    + `<line x1="${le}" y1="${day}" x2="${W - 10}" y2="${day}" stroke="${M.truc}" stroke-width="1.6"/>`
    + `<text x="${le - 6}" y="16" fill="${M.chu}" font-size="10.5" text-anchor="end">H</text>`
    + `<text x="${W - 8}" y="${day + 14}" fill="${M.chu}" font-size="10.5" text-anchor="end">tiến trình phản ứng</text>`;
  /* Nhãn phải nằm PHÍA ĐỐI DIỆN với đường nối hai mức, nếu không thì nét đứt
     chạy xuyên qua chữ. Phản ứng toả nhiệt: đường nối đi xuống nên nhãn chất
     đầu ở trên, nhãn sản phẩm ở dưới; thu nhiệt thì ngược lại. */
  const thuNhiet = hCuoi > hDau;
  const yDau = thuNhiet ? Y(hDau) + 16 : Y(hDau) - 9;
  const yCuoi = thuNhiet ? Y(hCuoi) - 9 : Y(hCuoi) + 16;
  ra += `<line x1="${le + 20}" y1="${so(Y(hDau))}" x2="${le + 92}" y2="${so(Y(hDau))}" stroke="${M.nhan}" stroke-width="2.6"/>`
     + `<text x="${le + 56}" y="${so(yDau)}" fill="${M.nhan}" font-size="10.5" text-anchor="middle">${tenDau || 'chất đầu'}</text>`
     + `<line x1="${W - 106}" y1="${so(Y(hCuoi))}" x2="${W - 34}" y2="${so(Y(hCuoi))}" stroke="${M.net}" stroke-width="2.6"/>`
     + `<text x="${W - 70}" y="${so(yCuoi)}" fill="${M.net}" font-size="10.5" text-anchor="middle">${tenCuoi || 'sản phẩm'}</text>`;
  ra += `<line x1="${le + 92}" y1="${so(Y(hDau))}" x2="${W - 106}" y2="${so(Y(hCuoi))}" stroke="${M.chu}" stroke-width="1.4" stroke-dasharray="4 3"/>`;
  const giua = (le + 92 + W - 106) / 2;
  ra += `<line x1="${giua}" y1="${so(Y(hDau))}" x2="${giua}" y2="${so(Y(hCuoi))}" stroke="${M.do}" stroke-width="1.8" marker-end="url(#mtgd)"/>`
     + `<defs><marker id="mtgd" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto"><path d="M0,0 L8,3.5 L0,7 Z" fill="${M.do}"/></marker></defs>`
     + `<text x="${giua + 13}" y="${so((Y(hDau) + Y(hCuoi)) / 2)}" fill="${M.do}" font-size="11">ΔrH</text>`;
  return boc(W, H, ra);
};

/* ============================================================
   ⑥ MẠCH ĐIỆN NỐI TIẾP / SONG SONG — cho Vật lí
   ============================================================ */
TD.hinhMach = function (kieu, ds, nguon) {
  const W = 320, H = kieu === 'nt' ? 130 : 160;
  const t = 40, d = W - 40, tren = 40, duoi = H - 30;
  const day = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${M.truc}" stroke-width="1.8"/>`;
  const dienTro = (x, y, ten) =>
    `<rect x="${x - 17}" y="${y - 9}" width="34" height="18" fill="var(--nen2)" stroke="${M.net}" stroke-width="1.8"/>`
    + `<text x="${x}" y="${y - 14}" fill="${M.nhan}" font-size="10.5" text-anchor="middle">${ten}</text>`;
  let ra = `<text x="${(t + d) / 2}" y="20" fill="${M.chu}" font-size="10.5" text-anchor="middle">`
    + `${nguon || ''}</text>`;
  /* nguồn điện ở cạnh trái */
  ra += day(t, tren, t, duoi)
     + `<line x1="${t - 9}" y1="${(tren + duoi) / 2 - 8}" x2="${t + 9}" y2="${(tren + duoi) / 2 - 8}" stroke="${M.kim || M.nhan}" stroke-width="2.6"/>`
     + `<line x1="${t - 5}" y1="${(tren + duoi) / 2 + 2}" x2="${t + 5}" y2="${(tren + duoi) / 2 + 2}" stroke="${M.nhan}" stroke-width="1.6"/>`;
  if (kieu === 'nt') {
    const b = (d - t) / (ds.length + 1);
    ra += day(t, tren, d, tren) + day(t, duoi, d, duoi) + day(d, tren, d, duoi);
    ds.forEach((r, i) => { ra += dienTro(t + b * (i + 1), tren, r); });
  } else {
    ra += day(t, tren, d, tren) + day(t, duoi, d, duoi) + day(d, tren, d, duoi);
    const b = (duoi - tren) / (ds.length + 1);
    ds.forEach((r, i) => {
      const y = tren + b * (i + 1);
      ra += day((t + d) / 2 - 60, y, (t + d) / 2 + 60, y) + dienTro((t + d) / 2, y, r);
    });
  }
  return boc(W, H, ra);
};
})();
