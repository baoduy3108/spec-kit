/* ============================================================
   BỘ VẼ HÌNH — ĐỢT 2
   Tám kiểu hình còn lại mà đề thật hay ra: hệ trục Oxyz, miền phẳng
   giới hạn bởi đồ thị, đường sức từ, khung dây trong từ trường, bộ
   dụng cụ thí nghiệm, đường chuẩn độ pH, sơ đồ nhân đôi – phiên mã
   – dịch mã, và sơ đồ đột biến nhiễm sắc thể.
   Mấy kiểu này vẽ khó hơn đồ thị nên tách riêng một file cho dễ soi.
   ============================================================ */
window.TD = window.TD || {};

(function () {
const M = {
  truc: 'var(--chu3)', net: 'var(--ngoc)', chu: 'var(--chu2)',
  nhan: 'var(--kim)', phu: 'var(--vien)', do: 'var(--lua)', tim: 'var(--tim)', lam: 'var(--lam)'
};
const so = n => Math.round(n * 100) / 100;
const boc = (rong, cao, than) =>
  `<div class="khung-hinh"><svg viewBox="0 0 ${rong} ${cao}" width="100%" `
  + `style="max-width:${rong}px;height:auto;display:block;margin:10px auto" `
  + `xmlns="http://www.w3.org/2000/svg" role="img">${than}</svg></div>`;
const mui = (id, mau) => `<marker id="${id}" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto">`
  + `<path d="M0,0 L8,3.5 L0,7 Z" fill="${mau}"/></marker>`;

/* ============================================================
   ⑪ HỆ TRỤC Oxyz — chiếu xiên như SGK
   diem = [{x,y,z,ten}] · hop = {a,b,c} vẽ hình hộp chữ nhật từ gốc
   ============================================================ */
TD.hinhOxyz = function (diem, hop) {
  const W = 320, H = 250;
  const O = [110, 175];
  /* Oz thẳng đứng, Oy sang phải, Ox chiếu xiên xuống trái */
  const dv = 26;
  const P = (x, y, z) => [O[0] + y * dv - x * dv * 0.55, O[1] - z * dv + x * dv * 0.42];
  const net = (a, b, mau, dut, to) =>
    `<line x1="${so(a[0])}" y1="${so(a[1])}" x2="${so(b[0])}" y2="${so(b[1])}" stroke="${mau || M.truc}" `
    + `stroke-width="${to || 1.6}"${dut ? ' stroke-dasharray="5 4"' : ''}/>`;
  let ra = `<defs>${mui('mtoxyz', M.truc)}</defs>`;
  /* ba trục */
  const gx = P(3.3, 0, 0), gy = P(0, 4.6, 0), gz = P(0, 0, 3.4);
  ra += `<line x1="${O[0]}" y1="${O[1]}" x2="${so(gx[0])}" y2="${so(gx[1])}" stroke="${M.truc}" stroke-width="1.7" marker-end="url(#mtoxyz)"/>`
     + `<line x1="${O[0]}" y1="${O[1]}" x2="${so(gy[0])}" y2="${so(gy[1])}" stroke="${M.truc}" stroke-width="1.7" marker-end="url(#mtoxyz)"/>`
     + `<line x1="${O[0]}" y1="${O[1]}" x2="${so(gz[0])}" y2="${so(gz[1])}" stroke="${M.truc}" stroke-width="1.7" marker-end="url(#mtoxyz)"/>`
     + `<text x="${so(gx[0] - 12)}" y="${so(gx[1] + 10)}" fill="${M.chu}" font-size="11.5">x</text>`
     + `<text x="${so(gy[0] + 6)}" y="${so(gy[1] + 4)}" fill="${M.chu}" font-size="11.5">y</text>`
     + `<text x="${so(gz[0] - 2)}" y="${so(gz[1] - 6)}" fill="${M.chu}" font-size="11.5">z</text>`
     + `<text x="${O[0] - 12}" y="${O[1] + 13}" fill="${M.chu}" font-size="11">O</text>`;
  /* hình hộp chữ nhật OABC.O′A′B′C′ */
  if (hop) {
    const a = hop.a, b = hop.b, c = hop.c;
    const d = {
      O: P(0, 0, 0), A: P(a, 0, 0), B: P(a, b, 0), C: P(0, b, 0),
      O2: P(0, 0, c), A2: P(a, 0, c), B2: P(a, b, c), C2: P(0, b, c)
    };
    ra += net(d.O, d.A, M.net) + net(d.A, d.B, M.net) + net(d.B, d.C, M.net, true) + net(d.C, d.O, M.net, true)
       + net(d.O2, d.A2, M.net) + net(d.A2, d.B2, M.net) + net(d.B2, d.C2, M.net) + net(d.C2, d.O2, M.net)
       + net(d.O, d.O2, M.net, true) + net(d.A, d.A2, M.net) + net(d.B, d.B2, M.net) + net(d.C, d.C2, M.net);
    const ten = { A: 'A', B: 'B', C: 'C', A2: "A′", B2: "B′", C2: "C′", O2: "O′" };
    Object.keys(ten).forEach(k => {
      ra += `<circle cx="${so(d[k][0])}" cy="${so(d[k][1])}" r="2.6" fill="${M.nhan}"/>`
         + `<text x="${so(d[k][0] + 7)}" y="${so(d[k][1] - 5)}" fill="${M.nhan}" font-size="11">${ten[k]}</text>`;
    });
  }
  (diem || []).forEach(p => {
    const q = P(p.x, p.y, p.z);
    ra += net(P(0, 0, 0), q, M.tim, true, 1.3)
       + `<circle cx="${so(q[0])}" cy="${so(q[1])}" r="3.4" fill="${M.do}"/>`
       + `<text x="${so(q[0] + 7)}" y="${so(q[1] - 6)}" fill="${M.do}" font-size="11">${p.ten || ''}</text>`;
  });
  return boc(W, H, ra);
};

/* ============================================================
   ⑫ MIỀN PHẲNG GIỚI HẠN BỞI ĐỒ THỊ — cho bài diện tích
   ============================================================ */
TD.hinhMienPhang = function (f, g, tu, den, cf) {
  const c = Object.assign({ xMin: tu - 1.4, xMax: den + 1.4, yMin: -1, yMax: 6, rong: 320, cao: 245 }, cf || {});
  const W = c.rong, H = c.cao, le = 28;
  const X = x => le + (x - c.xMin) / (c.xMax - c.xMin) * (W - 2 * le);
  const Y = y => H - le - (y - c.yMin) / (c.yMax - c.yMin) * (H - 2 * le);
  const ket = (h, tuX, denX) => {
    const d = [];
    for (let x = tuX; x <= denX + 1e-9; x += (denX - tuX) / 120) {
      const y = h(x);
      if (Number.isFinite(y)) d.push(so(X(x)) + ',' + so(Y(Math.max(c.yMin, Math.min(c.yMax, y)))));
    }
    return d;
  };
  let ra = '';
  for (let x = Math.ceil(c.xMin); x <= Math.floor(c.xMax); x++)
    ra += `<line x1="${so(X(x))}" y1="${le}" x2="${so(X(x))}" y2="${H - le}" stroke="${M.phu}" stroke-width="1"/>`
       + (x !== 0 ? `<text x="${so(X(x))}" y="${so(Y(0) + 13)}" fill="${M.chu}" font-size="10" text-anchor="middle">${x}</text>` : '');
  for (let y = Math.ceil(c.yMin); y <= Math.floor(c.yMax); y++)
    ra += `<line x1="${le}" y1="${so(Y(y))}" x2="${W - le}" y2="${so(Y(y))}" stroke="${M.phu}" stroke-width="1"/>`;
  /* miền tô: đi theo f rồi quay về theo g */
  const mien = ket(f, tu, den).concat(ket(g, den, tu));
  ra += `<polygon points="${mien.join(' ')}" fill="${M.net}" opacity="0.24" stroke="none"/>`;
  ra += `<line x1="${le}" y1="${so(Y(0))}" x2="${W - le + 6}" y2="${so(Y(0))}" stroke="${M.truc}" stroke-width="1.6"/>`
     + `<line x1="${so(X(0))}" y1="${le - 6}" x2="${so(X(0))}" y2="${H - le}" stroke="${M.truc}" stroke-width="1.6"/>`
     + `<text x="${W - le + 9}" y="${so(Y(0) - 5)}" fill="${M.chu}" font-size="11">x</text>`
     + `<text x="${so(X(0) + 6)}" y="${le - 8}" fill="${M.chu}" font-size="11">y</text>`;
  ra += `<polyline points="${ket(f, c.xMin, c.xMax).join(' ')}" fill="none" stroke="${M.net}" stroke-width="2.2"/>`;
  ra += `<polyline points="${ket(g, c.xMin, c.xMax).join(' ')}" fill="none" stroke="${M.nhan}" stroke-width="2"/>`;
  [tu, den].forEach(x => {
    ra += `<line x1="${so(X(x))}" y1="${so(Y(f(x)))}" x2="${so(X(x))}" y2="${so(Y(g(x)))}" stroke="${M.do}" stroke-width="1.4" stroke-dasharray="4 3"/>`
       + `<text x="${so(X(x))}" y="${H - 6}" fill="${M.do}" font-size="10.5" text-anchor="middle">${so(x)}</text>`;
  });
  return boc(W, H, ra);
};

/* ============================================================
   ⑬ ĐƯỜNG SỨC TỪ — nam châm thẳng, dây dẫn thẳng, ống dây
   ============================================================ */
TD.hinhTuTruong = function (kieu) {
  const W = 320, H = 210;
  let ra = `<defs>${mui('mttt', M.net)}</defs>`;
  if (kieu === 'namcham') {
    const x = 110, y = 92, r = 100, c = 26;
    ra += `<rect x="${x}" y="${y}" width="${r / 2}" height="${c}" fill="${M.do}" opacity="0.85"/>`
       + `<rect x="${x + r / 2}" y="${y}" width="${r / 2}" height="${c}" fill="${M.lam}" opacity="0.85"/>`
       + `<text x="${x + r / 4}" y="${y + 18}" fill="var(--nen)" font-size="13" font-weight="700" text-anchor="middle">N</text>`
       + `<text x="${x + r * 0.75}" y="${y + 18}" fill="var(--nen)" font-size="13" font-weight="700" text-anchor="middle">S</text>`;
    /* đường sức đi ra từ cực N, vòng về cực S */
    [26, 50, 74].forEach((h, i) => {
      const t = x + r + 6, d = x - 6, gy = y + c / 2;
      ra += `<path d="M ${t} ${gy} C ${t + 46} ${gy - h} ${d - 46} ${gy - h} ${d} ${gy}" fill="none" stroke="${M.net}" stroke-width="1.7" marker-end="url(#mttt)"/>`
         + `<path d="M ${t} ${gy} C ${t + 46} ${gy + h} ${d - 46} ${gy + h} ${d} ${gy}" fill="none" stroke="${M.net}" stroke-width="1.7" marker-end="url(#mttt)"/>`;
    });
    ra += `<text x="${W / 2}" y="${H - 6}" fill="${M.chu}" font-size="10.5" text-anchor="middle">Đường sức từ của nam châm thẳng</text>`;
  } else if (kieu === 'daythang') {
    const cx = 160, cy = 96;
    ra += `<line x1="${cx}" y1="14" x2="${cx}" y2="${H - 30}" stroke="${M.do}" stroke-width="3"/>`
       + `<polygon points="${cx - 5},34 ${cx + 5},34 ${cx},22" fill="${M.do}"/>`
       + `<text x="${cx + 9}" y="26" fill="${M.do}" font-size="11">I</text>`;
    [34, 56, 78].forEach(r => {
      ra += `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${so(r * 0.34)}" fill="none" stroke="${M.net}" stroke-width="1.6"/>`
         + `<polygon points="${cx + r},${cy} ${cx + r - 7},${cy - 5} ${cx + r - 7},${cy + 5}" fill="${M.net}"/>`;
    });
    ra += `<text x="${W / 2}" y="${H - 6}" fill="${M.chu}" font-size="10.5" text-anchor="middle">Đường sức từ của dòng điện thẳng dài</text>`;
  } else {
    const x = 70, y = 66, w = 180, h = 56;
    for (let i = 0; i < 7; i++) {
      const cx = x + 14 + i * 25;
      ra += `<ellipse cx="${cx}" cy="${y + h / 2}" rx="9" ry="${h / 2}" fill="none" stroke="${M.do}" stroke-width="2.2"/>`;
    }
    ra += `<line x1="${x - 22}" y1="${y + h / 2}" x2="${x + 14}" y2="${y + h / 2}" stroke="${M.do}" stroke-width="2.2"/>`
       + `<line x1="${x + w - 12}" y1="${y + h / 2}" x2="${x + w + 20}" y2="${y + h / 2}" stroke="${M.do}" stroke-width="2.2"/>`
       + `<text x="${x - 26}" y="${y + h / 2 - 8}" fill="${M.do}" font-size="11">I</text>`;
    ra += `<line x1="${x - 6}" y1="${y + h / 2}" x2="${x + w + 6}" y2="${y + h / 2}" stroke="${M.net}" stroke-width="1.8" marker-end="url(#mttt)"/>`
       + `<text x="${x + w / 2}" y="${y + h / 2 - 10}" fill="${M.net}" font-size="11" text-anchor="middle">B</text>`
       + `<text x="${W / 2}" y="${H - 6}" fill="${M.chu}" font-size="10.5" text-anchor="middle">Từ trường trong lòng ống dây</text>`;
  }
  return boc(W, H, ra);
};

/* ============================================================
   ⑭ BỘ DỤNG CỤ THÍ NGHIỆM — điều chế và thu khí
   ============================================================ */
TD.hinhThiNghiem = function (cach, tenKhi) {
  const W = 330, H = 220;
  let ra = `<defs>${mui('mttn', M.net)}</defs>`;
  /* bình cầu có nhánh + đèn cồn */
  ra += `<path d="M 46 96 L 46 62 L 78 62 L 78 96 A 30 30 0 1 1 46 96 Z" fill="none" stroke="${M.truc}" stroke-width="1.8"/>`
     + `<path d="M 34 116 A 28 28 0 0 0 90 116 L 90 112 L 34 112 Z" fill="${M.lam}" opacity="0.5"/>`
     + `<text x="62" y="150" fill="${M.chu}" font-size="10" text-anchor="middle">hỗn hợp phản ứng</text>`
     + `<path d="M 52 176 q 10 -16 20 0 z" fill="${M.nhan}" opacity="0.9"/>`
     + `<rect x="50" y="176" width="24" height="14" fill="none" stroke="${M.truc}" stroke-width="1.5"/>`;
  /* ống dẫn khí */
  ra += `<path d="M 78 72 L 150 72" fill="none" stroke="${M.truc}" stroke-width="1.8"/>`;
  if (cach === 'daynuoc') {
    ra += `<rect x="160" y="96" width="130" height="76" fill="none" stroke="${M.truc}" stroke-width="1.8"/>`
       + `<rect x="161" y="106" width="128" height="65" fill="${M.lam}" opacity="0.45"/>`
       + `<path d="M 150 72 L 150 150 L 196 150" fill="none" stroke="${M.truc}" stroke-width="1.8"/>`
       + `<path d="M 196 150 L 196 108" fill="none" stroke="${M.truc}" stroke-width="1.8"/>`
       + `<rect x="184" y="60" width="34" height="60" rx="4" fill="none" stroke="${M.truc}" stroke-width="1.8"/>`
       + `<rect x="185" y="61" width="32" height="28" fill="${M.net}" opacity="0.35"/>`
       + `<text x="201" y="52" fill="${M.net}" font-size="10.5" text-anchor="middle">${tenKhi || 'khí'}</text>`
       + `<text x="225" y="190" fill="${M.chu}" font-size="10.5" text-anchor="middle">Thu khí bằng cách đẩy nước</text>`;
  } else {
    const nguoc = cach === 'nguoc';
    ra += `<path d="M 150 72 L 218 72 L 218 ${nguoc ? 96 : 130}" fill="none" stroke="${M.truc}" stroke-width="1.8"/>`;
    if (nguoc)
      ra += `<path d="M 194 84 L 194 148 A 24 24 0 0 0 242 148 L 242 84 Z" fill="none" stroke="${M.truc}" stroke-width="1.8"/>`
         + `<path d="M 195 100 L 195 148 A 23 23 0 0 0 241 148 L 241 100 Z" fill="${M.net}" opacity="0.3"/>`
         + `<text x="218" y="176" fill="${M.chu}" font-size="10.5" text-anchor="middle">Thu khí bằng cách đẩy không khí</text>`
         + `<text x="278" y="120" fill="${M.chu}" font-size="10" text-anchor="middle">(úp ngược bình)</text>`;
    else
      ra += `<path d="M 194 96 L 194 160 A 24 24 0 0 0 242 160 L 242 96 Z" fill="none" stroke="${M.truc}" stroke-width="1.8"/>`
         + `<path d="M 195 128 L 195 160 A 23 23 0 0 0 241 160 L 241 128 Z" fill="${M.net}" opacity="0.3"/>`
         + `<text x="218" y="186" fill="${M.chu}" font-size="10.5" text-anchor="middle">Thu khí bằng cách đẩy không khí</text>`
         + `<text x="278" y="120" fill="${M.chu}" font-size="10" text-anchor="middle">(đặt đứng bình)</text>`;
  }
  return boc(W, H, ra);
};

/* ============================================================
   ⑮ ĐƯỜNG CHUẨN ĐỘ pH
   ============================================================ */
TD.hinhChuanDo = function (pHDau, pHTuongDuong, vTuongDuong) {
  const W = 320, H = 235, le = 42, day = H - 42;
  const vMax = vTuongDuong * 2;
  const X = v => le + v / vMax * (W - le - 18);
  const Y = p => day - p / 14 * (day - 22);
  const f = v => {
    const t = (v - vTuongDuong) / (vTuongDuong * 0.14);
    return pHDau + (14 - pHDau - 1.2) / (1 + Math.exp(-t)) * (pHTuongDuong > 7 ? 1 : 0.86);
  };
  let ra = '';
  [0, 2, 4, 6, 8, 10, 12, 14].forEach(p => {
    ra += `<line x1="${le}" y1="${so(Y(p))}" x2="${W - 10}" y2="${so(Y(p))}" stroke="${M.phu}" stroke-width="1"/>`
       + `<text x="${le - 5}" y="${so(Y(p) + 3.5)}" fill="${M.chu}" font-size="9.5" text-anchor="end">${p}</text>`;
  });
  ra += `<line x1="${le}" y1="16" x2="${le}" y2="${day}" stroke="${M.truc}" stroke-width="1.6"/>`
     + `<line x1="${le}" y1="${day}" x2="${W - 10}" y2="${day}" stroke="${M.truc}" stroke-width="1.6"/>`
     + `<text x="${le - 4}" y="13" fill="${M.chu}" font-size="10.5" text-anchor="end">pH</text>`
     + `<text x="${W - 8}" y="${day + 15}" fill="${M.chu}" font-size="10.5" text-anchor="end">V dung dịch chuẩn (mL)</text>`;
  const d = [];
  for (let v = 0; v <= vMax; v += vMax / 200) d.push(so(X(v)) + ',' + so(Y(Math.max(0, Math.min(14, f(v))))));
  ra += `<polyline points="${d.join(' ')}" fill="none" stroke="${M.net}" stroke-width="2.3"/>`;
  ra += `<line x1="${so(X(vTuongDuong))}" y1="${so(Y(0))}" x2="${so(X(vTuongDuong))}" y2="${so(Y(14))}" stroke="${M.do}" stroke-width="1.3" stroke-dasharray="5 4"/>`
     + `<circle cx="${so(X(vTuongDuong))}" cy="${so(Y(pHTuongDuong))}" r="4" fill="${M.do}"/>`
     + `<text x="${so(X(vTuongDuong) + 8)}" y="${so(Y(pHTuongDuong) + 4)}" fill="${M.do}" font-size="10.5">điểm tương đương</text>`
     + `<text x="${so(X(vTuongDuong))}" y="${day + 15}" fill="${M.do}" font-size="10.5" text-anchor="middle">${so(vTuongDuong)}</text>`;
  return boc(W, H, ra);
};

/* ============================================================
   ⑯ SƠ ĐỒ NHÂN ĐÔI – PHIÊN MÃ – DỊCH MÃ
   ============================================================ */
TD.hinhDNA = function (kieu) {
  const W = 330, H = kieu === 'dichma' ? 190 : 175;
  const bz = (x, y, w, mau, chu) =>
    `<rect x="${x}" y="${y}" width="${w}" height="17" rx="3" fill="${mau}" opacity="0.85"/>`
    + `<text x="${so(x + w / 2)}" y="${y + 12.5}" fill="var(--nen)" font-size="9.5" font-weight="700" text-anchor="middle">${chu}</text>`;
  let ra = `<defs>${mui('mtadn', M.net)}${mui('mtadn2', M.nhan)}</defs>`;
  if (kieu === 'nhandoi') {
    ra += `<text x="14" y="20" fill="${M.chu}" font-size="10.5">Chạc chữ Y khi DNA nhân đôi</text>`;
    ra += `<line x1="20" y1="88" x2="150" y2="88" stroke="${M.truc}" stroke-width="2.4"/>`
       + `<line x1="20" y1="104" x2="150" y2="104" stroke="${M.truc}" stroke-width="2.4"/>`;
    for (let x = 26; x < 148; x += 12) ra += `<line x1="${x}" y1="88" x2="${x}" y2="104" stroke="${M.phu}" stroke-width="1.3"/>`;
    ra += `<line x1="150" y1="88" x2="290" y2="52" stroke="${M.truc}" stroke-width="2.4"/>`
       + `<line x1="150" y1="104" x2="290" y2="140" stroke="${M.truc}" stroke-width="2.4"/>`;
    /* mạch mới: liên tục ở trên, từng đoạn Okazaki ở dưới */
    ra += `<line x1="164" y1="62" x2="286" y2="32" stroke="${M.net}" stroke-width="2.6" marker-end="url(#mtadn)"/>`
       + `<text x="228" y="28" fill="${M.net}" font-size="10" text-anchor="middle">mạch liên tục</text>`;
    [0, 1, 2].forEach(i => {
      const x1 = 176 + i * 40, x2 = x1 + 30, y1 = 116 + i * 9.6, y2 = y1 + 7.6;
      ra += `<line x1="${x2}" y1="${y2}" x2="${x1}" y2="${y1}" stroke="${M.nhan}" stroke-width="2.6" marker-end="url(#mtadn2)"/>`;
    });
    ra += `<text x="236" y="164" fill="${M.nhan}" font-size="10" text-anchor="middle">các đoạn Okazaki (mạch gián đoạn)</text>`
       + `<text x="150" y="82" fill="${M.do}" font-size="10.5" text-anchor="middle">chạc tái bản</text>`;
  } else if (kieu === 'phienma') {
    ra += `<text x="14" y="20" fill="${M.chu}" font-size="10.5">Phiên mã: RNA được tổng hợp từ mạch mã gốc</text>`;
    ra += `<line x1="24" y1="70" x2="300" y2="70" stroke="${M.truc}" stroke-width="2.4"/>`
       + `<text x="14" y="66" fill="${M.chu}" font-size="9.5" text-anchor="end"></text>`
       + `<text x="24" y="60" fill="${M.chu}" font-size="9.5">3′</text><text x="296" y="60" fill="${M.chu}" font-size="9.5">5′</text>`
       + `<line x1="24" y1="102" x2="300" y2="102" stroke="${M.truc}" stroke-width="2.4"/>`
       + `<text x="24" y="118" fill="${M.chu}" font-size="9.5">5′</text><text x="296" y="118" fill="${M.chu}" font-size="9.5">3′</text>`
       + `<text x="160" y="62" fill="${M.do}" font-size="10" text-anchor="middle">mạch mã gốc (3′ → 5′)</text>`
       + `<text x="160" y="118" fill="${M.chu}" font-size="10" text-anchor="middle">mạch bổ sung</text>`;
    ra += `<ellipse cx="150" cy="86" rx="42" ry="24" fill="${M.tim}" opacity="0.35" stroke="${M.tim}" stroke-width="1.6"/>`
       + `<text x="150" y="90" fill="${M.chu}" font-size="9.5" text-anchor="middle">RNA polymerase</text>`;
    ra += `<line x1="112" y1="140" x2="240" y2="140" stroke="${M.net}" stroke-width="2.8" marker-end="url(#mtadn)"/>`
       + `<text x="176" y="158" fill="${M.net}" font-size="10" text-anchor="middle">mRNA mới (5′ → 3′)</text>`;
  } else {
    ra += `<text x="14" y="20" fill="${M.chu}" font-size="10.5">Dịch mã: ribosome trượt trên mRNA theo chiều 5′ → 3′</text>`;
    ra += `<line x1="20" y1="104" x2="310" y2="104" stroke="${M.truc}" stroke-width="2.6"/>`
       + `<text x="22" y="122" fill="${M.chu}" font-size="9.5">5′</text><text x="302" y="122" fill="${M.chu}" font-size="9.5">3′</text>`;
    const bo = ['AUG', 'GXU', 'AAA', 'XGU', 'UAA'];
    bo.forEach((b, i) => {
      const x = 34 + i * 54;
      ra += bz(x, 88, 46, i === 0 ? M.nhan : i === bo.length - 1 ? M.do : M.lam, b);
    });
    ra += `<text x="57" y="80" fill="${M.nhan}" font-size="9.5" text-anchor="middle">mở đầu</text>`
       + `<text x="273" y="80" fill="${M.do}" font-size="9.5" text-anchor="middle">kết thúc</text>`;
    ra += `<ellipse cx="150" cy="132" rx="46" ry="20" fill="${M.tim}" opacity="0.35" stroke="${M.tim}" stroke-width="1.6"/>`
       + `<text x="150" y="136" fill="${M.chu}" font-size="9.5" text-anchor="middle">ribosome</text>`
       + `<line x1="200" y1="160" x2="262" y2="160" stroke="${M.net}" stroke-width="2.2" marker-end="url(#mtadn)"/>`
       + `<text x="180" y="176" fill="${M.net}" font-size="10" text-anchor="end">chiều trượt</text>`;
  }
  return boc(W, H, ra);
};

/* ============================================================
   ⑰ ĐỘT BIẾN CẤU TRÚC NHIỄM SẮC THỂ
   ============================================================ */
TD.hinhNST = function (goc, sau, ten) {
  const W = 330, H = 150;
  const ve = (ds, y, nhan, mau) => {
    let r = `<text x="14" y="${y + 14}" fill="${M.chu}" font-size="10.5">${nhan}</text>`;
    ds.forEach((c, i) => {
      const x = 108 + i * 30;
      r += `<rect x="${x}" y="${y}" width="27" height="22" rx="3" fill="${mau}" opacity="${c === '·' ? 0.15 : 0.85}" stroke="${M.truc}" stroke-width="1.2"/>`
        + (c === '·' ? '' : `<text x="${x + 13.5}" y="${y + 16}" fill="var(--nen)" font-size="11" font-weight="700" text-anchor="middle">${c}</text>`);
    });
    return r;
  };
  let ra = ve(goc, 30, 'Trước:', M.net) + ve(sau, 86, 'Sau:', M.nhan);
  ra += `<text x="${W / 2}" y="${H - 6}" fill="${M.chu}" font-size="10.5" text-anchor="middle">${ten || ''}</text>`;
  return boc(W, H, ra);
};

/* ============================================================
   ⑱ TRỤC THỜI GIAN — cho Lịch sử
   moc = [{nam, ten}] · các mốc chia đều cho dễ đọc, nhãn so le
   ============================================================ */
TD.hinhTrucThoiGian = function (moc, tieuDe) {
  const n = moc.length;
  const W = Math.max(340, 72 * n + 76), H = 176;
  const y = 104, le = 50;
  const X = i => le + (n === 1 ? (W - 2 * le) / 2 : i * (W - 2 * le) / (n - 1));
  let ra = `<defs>${mui('mttg', M.truc)}</defs>`
    + `<line x1="14" y1="${y}" x2="${W - 12}" y2="${y}" stroke="${M.truc}" stroke-width="2" marker-end="url(#mttg)"/>`;
  if (tieuDe) ra += `<text x="${W / 2}" y="18" fill="${M.chu}" font-size="11.5" text-anchor="middle">${tieuDe}</text>`;
  moc.forEach((m, i) => {
    const x = so(X(i));
    /* nhãn so le trên – dưới để chữ dài không đè nhau */
    const tren = i % 2 === 0;
    const yNhan = tren ? y - 30 : y + 44;
    const yChan = tren ? y - 12 : y + 12;
    ra += `<line x1="${x}" y1="${y - 7}" x2="${x}" y2="${y + 7}" stroke="${M.nhan}" stroke-width="2.2"/>`
       + `<circle cx="${x}" cy="${y}" r="4" fill="${M.nhan}"/>`
       + `<line x1="${x}" y1="${yChan}" x2="${x}" y2="${so(yNhan + (tren ? 6 : -12))}" stroke="${M.phu}" stroke-width="1.1" stroke-dasharray="3 3"/>`
       + `<text x="${x}" y="${so(tren ? y + 22 : y - 16)}" fill="${M.nhan}" font-size="12" font-weight="700" text-anchor="middle">${m.nam}</text>`;
    /* tên sự kiện cắt thành tối đa hai dòng */
    const chu = String(m.ten || '').split(' ');
    const d1 = [], d2 = [];
    chu.forEach(t => { (d1.join(' ').length + t.length <= 15 && !d2.length ? d1 : d2).push(t); });
    /* nhãn ở hai mốc ngoài cùng dễ lòi ra khỏi khung — kéo vào cho vừa */
    const dai = Math.max(d1.join(' ').length, d2.join(' ').length) * 2.75;
    const xN = so(Math.min(Math.max(x, 3 + dai), W - 3 - dai));
    ra += `<text x="${xN}" y="${so(yNhan)}" fill="${M.chu}" font-size="10.5" text-anchor="middle">${d1.join(' ')}</text>`;
    if (d2.length) ra += `<text x="${xN}" y="${so(yNhan + 13)}" fill="${M.chu}" font-size="10.5" text-anchor="middle">${d2.join(' ')}</text>`;
  });
  return boc(W, H, ra);
};
})();
