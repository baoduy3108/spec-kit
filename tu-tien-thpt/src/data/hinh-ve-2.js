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
  const dv = 28;
  const P = (x, y, z) => [O[0] + y * dv - x * dv * 0.55, O[1] - z * dv + x * dv * 0.42];
  const net = (a, b, mau, dut, to) =>
    `<line x1="${so(a[0])}" y1="${so(a[1])}" x2="${so(b[0])}" y2="${so(b[1])}" stroke="${mau || M.truc}" `
    + `stroke-width="${to || 1.6}"${dut ? ' stroke-dasharray="5 4"' : ''}/>`;
  let ra = `<defs>${mui('mtoxyz', M.truc)}</defs>`;
  /* ba trục */
  /* Trục kéo dài hơn kích thước hộp một quãng để tên trục không dính vào
     tên đỉnh nằm ngay trên trục đó (C trên Oy, O′ trên Oz, A trên Ox). */
  const gx = P(3.9, 0, 0), gy = P(0, 5.3, 0), gz = P(0, 0, 4);
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
    /* Tên đỉnh đẩy ra NGOÀI khối theo hướng từ tâm ra, đúng lối vẽ của sách.
       Đặt cứng ở góc trên bên phải mỗi đỉnh thì chữ nằm ngay trên cạnh hộp
       và hai đỉnh gần nhau ăn vào chữ của nhau. */
    const dinh = Object.keys(d).map(k => d[k]);
    const tam = [dinh.reduce((t, q) => t + q[0], 0) / dinh.length,
                 dinh.reduce((t, q) => t + q[1], 0) / dinh.length];
    /* Đẩy ra ngoài theo hướng tâm vẫn chưa đủ: hai đỉnh nằm sát nhau (B′ với
       C′ khi hộp dẹt) thì hai cái tên vẫn chồng lên nhau. Sau khi tính chỗ
       đặt, tách các nhãn gần nhau dưới 15px ra hai phía. */
    const nhan = Object.keys(ten).map(k => {
      const ex = d[k][0] - tam[0], ey = d[k][1] - tam[1];
      const L = Math.hypot(ex, ey) || 1;
      return { k, cx: d[k][0], cy: d[k][1], x: d[k][0] + ex / L * 15, y: d[k][1] + ey / L * 15 };
    });
    for (let v = 0; v < 24; v++) {
      let cham = false;
      for (let i = 0; i < nhan.length; i++) for (let j = i + 1; j < nhan.length; j++) {
        let dx = nhan[j].x - nhan[i].x, dy = nhan[j].y - nhan[i].y;
        const r = Math.hypot(dx, dy);
        if (r >= 16) continue;
        cham = true;
        if (r < 0.01) { dx = 1; dy = 0; }
        const k2 = (16 - r) / 2 / (r || 1);
        nhan[i].x -= dx * k2; nhan[i].y -= dy * k2;
        nhan[j].x += dx * k2; nhan[j].y += dy * k2;
      }
      if (!cham) break;
    }
    nhan.forEach(n => {
      const x = Math.min(Math.max(n.x, 9), W - 9), y = Math.min(Math.max(n.y, 12), H - 5);
      ra += `<circle cx="${so(n.cx)}" cy="${so(n.cy)}" r="2.6" fill="${M.nhan}"/>`
         + `<text x="${so(x)}" y="${so(y + 4)}" fill="${M.nhan}" `
         + `font-size="11.5" text-anchor="middle">${ten[n.k]}</text>`;
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
  /* Miền tô thì phải kẹp vào khung mới khép kín được đa giác, nhưng ĐƯỜNG
     CONG thì không: kẹp lại làm parabol mọc ra hai đoạn thẳng nằm bẹp dưới
     đáy khung, trông như đồ thị bị cắt cụt. Nét vẽ ra ngoài khung thì ngắt. */
  const ket = (h, tuX, denX) => {
    const d = [];
    for (let x = tuX; x <= denX + 1e-9; x += (denX - tuX) / 120) {
      const y = h(x);
      if (Number.isFinite(y)) d.push(so(X(x)) + ',' + so(Y(Math.max(c.yMin, Math.min(c.yMax, y)))));
    }
    return d;
  };
  const netDut = (h, mau, to) => {
    const doan = [];
    let nay = [];
    for (let x = c.xMin; x <= c.xMax + 1e-9; x += (c.xMax - c.xMin) / 240) {
      const y = h(x);
      if (Number.isFinite(y) && y >= c.yMin && y <= c.yMax) nay.push(so(X(x)) + ',' + so(Y(y)));
      else { if (nay.length > 1) doan.push(nay); nay = []; }
    }
    if (nay.length > 1) doan.push(nay);
    return doan.map(d => `<polyline points="${d.join(' ')}" fill="none" stroke="${mau}" stroke-width="${to}"/>`).join('');
  };
  let ra = '';
  for (let x = Math.ceil(c.xMin); x <= Math.floor(c.xMax); x++)
    ra += `<line x1="${so(X(x))}" y1="${le}" x2="${so(X(x))}" y2="${H - le}" stroke="${M.phu}" stroke-width="1"/>`
       + (x !== 0 ? `<text x="${so(X(x))}" y="${so(Y(0) + 13)}" fill="${M.chu}" font-size="10" text-anchor="middle">${String(x).replace('-', '\u2212')}</text>` : '');
  for (let y = Math.ceil(c.yMin); y <= Math.floor(c.yMax); y++)
    ra += `<line x1="${le}" y1="${so(Y(y))}" x2="${W - le}" y2="${so(Y(y))}" stroke="${M.phu}" stroke-width="1"/>`;
  /* miền tô: đi theo f rồi quay về theo g */
  const mien = ket(f, tu, den).concat(ket(g, den, tu));
  ra += `<polygon points="${mien.join(' ')}" fill="${M.net}" opacity="0.24" stroke="none"/>`;
  ra += `<line x1="${le}" y1="${so(Y(0))}" x2="${W - le + 6}" y2="${so(Y(0))}" stroke="${M.truc}" stroke-width="1.6"/>`
     + `<line x1="${so(X(0))}" y1="${le - 6}" x2="${so(X(0))}" y2="${H - le}" stroke="${M.truc}" stroke-width="1.6"/>`
     + `<text x="${W - le + 9}" y="${so(Y(0) - 5)}" fill="${M.chu}" font-size="11">x</text>`
     + `<text x="${so(X(0) + 6)}" y="${le - 8}" fill="${M.chu}" font-size="11">y</text>`;
  ra += netDut(f, M.net, 2.2) + netDut(g, M.nhan, 2);
  [tu, den].forEach(x => {
    ra += `<line x1="${so(X(x))}" y1="${so(Y(f(x)))}" x2="${so(X(x))}" y2="${so(Y(g(x)))}" stroke="${M.do}" stroke-width="1.4" stroke-dasharray="4 3"/>`
       + `<text x="${so(X(x))}" y="${H - 6}" fill="${M.do}" font-size="10.5" text-anchor="middle">${String(so(x)).replace('-', '\u2212')}</text>`;
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
    /* Đường sức từ đi RA khỏi cực N và VÀO cực S. Cực N vẽ bên trái nên nét
       phải xuất phát từ trái, vòng ra ngoài rồi chui vào đầu phải — trước
       đây vẽ ngược, và mũi tên đặt ở đầu nét nên nằm đè lên thanh nam châm. */
    [26, 50, 74].forEach(h => {
      const tN = x - 6, tS = x + r + 6, gy = y + c / 2;
      const giua = (tN + tS) / 2;
      const mui2 = yy => `<polygon points="${giua + 6},${so(yy)} ${giua - 3},${so(yy - 4.6)} ${giua - 3},${so(yy + 4.6)}" fill="${M.net}"/>`;
      ra += `<path d="M ${tN} ${gy} C ${tN - 46} ${gy - h} ${tS + 46} ${gy - h} ${tS} ${gy}" fill="none" stroke="${M.net}" stroke-width="1.7"/>`
         + mui2(gy - h * 0.75)
         + `<path d="M ${tN} ${gy} C ${tN - 46} ${gy + h} ${tS + 46} ${gy + h} ${tS} ${gy}" fill="none" stroke="${M.net}" stroke-width="1.7"/>`
         + mui2(gy + h * 0.75);
    });
    ra += `<text x="${W / 2}" y="${H - 6}" fill="${M.chu}" font-size="10.5" text-anchor="middle">Đường sức từ của nam châm thẳng</text>`;
  } else if (kieu === 'daythang') {
    const cx = 160, cy = 96;
    ra += `<line x1="${cx}" y1="14" x2="${cx}" y2="${H - 30}" stroke="${M.do}" stroke-width="3"/>`
       + `<polygon points="${cx - 5},34 ${cx + 5},34 ${cx},22" fill="${M.do}"/>`
       + `<text x="${cx + 9}" y="26" fill="${M.do}" font-size="11">I</text>`;
    /* Mũi tên phải nằm TIẾP TUYẾN với đường sức. Đặt ở mép phải hình elip
       rồi cho chỉ ngang là chỉ theo phương bán kính — sai hẳn chiều của B.
       Dòng điện hướng lên: nhìn từ trên xuống đường sức ngược chiều kim đồng
       hồ, nên nhánh gần người xem (đáy elip) chạy sang phải, nhánh xa (đỉnh
       elip) chạy sang trái. Ở hai chỗ đó tiếp tuyến mới nằm ngang. */
    /* Mũi tên phải TIẾP TUYẾN với đường sức chứ không chỉ theo phương bán
       kính. Dòng điện hướng lên: nhìn từ đầu mũi tên xuống, đường sức ngược
       chiều kim đồng hồ, nên nhánh gần người xem (nửa dưới elip) chạy sang
       phải, nhánh xa (nửa trên) chạy sang trái. Đặt mũi tên lệch khỏi đỉnh
       elip một góc để không đè lên dây dẫn vẽ dọc giữa hình. */
    const muiTiep = (r, ry, goc) => {
      const px = cx + r * Math.cos(goc), py = cy + ry * Math.sin(goc);
      /* chiều đi ứng với góc GIẢM dần: v = (r·sin, −ry·cos) */
      const vx = r * Math.sin(goc), vy = -ry * Math.cos(goc);
      const L = Math.hypot(vx, vy) || 1, ux = vx / L, uy = vy / L;
      const q = [so(px + ux * 5) + ',' + so(py + uy * 5),
                 so(px - ux * 4 - uy * 4) + ',' + so(py - uy * 4 + ux * 4),
                 so(px - ux * 4 + uy * 4) + ',' + so(py - uy * 4 - ux * 4)];
      return `<polygon points="${q.join(' ')}" fill="${M.net}"/>`;
    };
    [34, 56, 78].forEach(r => {
      const ry = r * 0.34;
      ra += `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${so(ry)}" fill="none" stroke="${M.net}" stroke-width="1.6"/>`
         + muiTiep(r, ry, Math.PI / 4) + muiTiep(r, ry, Math.PI * 1.25);
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
  /* Cao thêm một quãng để hai dòng chú thích (nhãn bình cầu và nhãn cách thu
     khí) nằm ở HAI dòng riêng — để chung một dòng thì chúng đè lên nhau. */
  const W = 330, H = 244;
  let ra = `<defs>${mui('mttn', M.net)}</defs>`;
  /* bình cầu có nhánh + đèn cồn */
  ra += `<path d="M 46 96 L 46 62 L 78 62 L 78 96 A 30 30 0 1 1 46 96 Z" fill="none" stroke="${M.truc}" stroke-width="1.8"/>`
     + `<path d="M 34 116 A 28 28 0 0 0 90 116 L 90 112 L 34 112 Z" fill="${M.lam}" opacity="0.5"/>`
     + `<text x="92" y="${H - 26}" fill="${M.chu}" font-size="10" text-anchor="middle">đun nóng hỗn hợp phản ứng</text>`
     + `<path d="M 52 176 q 10 -16 20 0 z" fill="${M.nhan}" opacity="0.9"/>`
     + `<rect x="50" y="176" width="24" height="14" fill="none" stroke="${M.truc}" stroke-width="1.5"/>`;
  /* ống dẫn khí */
  ra += `<path d="M 78 72 L 150 72" fill="none" stroke="${M.truc}" stroke-width="1.8"/>`;
  if (cach === 'daynuoc') {
    /* Cách thu này chỉ đúng khi ống nghiệm ÚP NGƯỢC, miệng chìm hẳn dưới mặt
       nước, và đầu ống dẫn luồn từ dưới lên vào miệng ống. Bản cũ vẽ ống
       nghiệm bo tròn cả bốn góc, nằm chồng lên mép chậu và hở miệng ra ngoài
       nước — khí thoát hết ra ngoài chứ không đẩy được nước xuống. */
    const cx = 236, mn = 116, dayChau = 194;  /* trục ống nghiệm · mặt nước · đáy chậu */
    const dayOng = 44, mieng = 180;           /* đáy ống ở trên, miệng ngập sâu dưới nước */
    const rOng = 19, mucKhi = 112;            /* khí chiếm phần trên tới đây */
    ra += `<rect x="172" y="${mn}" width="132" height="${dayChau - mn}" fill="none" stroke="${M.truc}" stroke-width="1.8"/>`
       + `<rect x="173" y="${mn + 1}" width="130" height="${dayChau - mn - 2}" fill="${M.lam}" opacity="0.42"/>`
       /* ống nghiệm úp ngược: đáy tròn ở TRÊN, miệng hở ở DƯỚI */
       + `<path d="M ${cx - rOng} ${mieng} L ${cx - rOng} ${dayOng + rOng} `
       + `A ${rOng} ${rOng} 0 0 1 ${cx + rOng} ${dayOng + rOng} L ${cx + rOng} ${mieng}" `
       + `fill="none" stroke="${M.truc}" stroke-width="1.8"/>`
       /* nước còn lại trong ống, phía dưới cột khí */
       + `<rect x="${cx - rOng + 1}" y="${mucKhi}" width="${rOng * 2 - 2}" height="${mieng - mucKhi}" fill="${M.lam}" opacity="0.42"/>`
       /* cột khí đã thu được, phía trên */
       + `<path d="M ${cx - rOng + 1} ${mucKhi} L ${cx - rOng + 1} ${dayOng + rOng} `
       + `A ${rOng - 1} ${rOng - 1} 0 0 1 ${cx + rOng - 1} ${dayOng + rOng} L ${cx + rOng - 1} ${mucKhi} Z" `
       + `fill="${M.net}" opacity="0.32"/>`
       /* ống dẫn khí: từ bình cầu chạy ngang, vòng xuống đáy chậu rồi ngoi lên
          đúng miệng ống nghiệm */
       + `<path d="M 150 72 L 150 ${dayChau - 8} L ${cx} ${dayChau - 8} L ${cx} ${mieng - 10}" `
       + `fill="none" stroke="${M.truc}" stroke-width="1.8"/>`
       /* vài bọt khí đang sủi lên trong ống — dấu hiệu khí đang được thu */
       + `<circle cx="${cx}" cy="${mieng - 16}" r="2.6" fill="${M.net}" opacity="0.75"/>`
       + `<circle cx="${cx - 5}" cy="${mieng - 27}" r="2" fill="${M.net}" opacity="0.6"/>`
       + `<circle cx="${cx + 4}" cy="${mieng - 38}" r="2.3" fill="${M.net}" opacity="0.6"/>`
       + `<text x="${cx}" y="${dayOng - 6}" fill="${M.net}" font-size="10.5" text-anchor="middle">${tenKhi || 'khí'}</text>`
       + `<text x="${W / 2}" y="${H - 6}" fill="${M.chu}" font-size="10.5" text-anchor="middle">Thu khí bằng cách đẩy nước</text>`;
  } else {
    const nguoc = cach === 'nguoc';
    ra += `<path d="M 150 72 L 218 72 L 218 ${nguoc ? 96 : 130}" fill="none" stroke="${M.truc}" stroke-width="1.8"/>`;
    if (nguoc)
      ra += `<path d="M 194 84 L 194 148 A 24 24 0 0 0 242 148 L 242 84 Z" fill="none" stroke="${M.truc}" stroke-width="1.8"/>`
         + `<path d="M 195 100 L 195 148 A 23 23 0 0 0 241 148 L 241 100 Z" fill="${M.net}" opacity="0.3"/>`
         + `<text x="218" y="${H - 6}" fill="${M.chu}" font-size="10.5" text-anchor="middle">Thu khí bằng cách đẩy không khí</text>`
         + `<text x="250" y="112" fill="${M.chu}" font-size="10">(úp ngược bình)</text>`;
    else
      ra += `<path d="M 194 96 L 194 160 A 24 24 0 0 0 242 160 L 242 96 Z" fill="none" stroke="${M.truc}" stroke-width="1.8"/>`
         + `<path d="M 195 128 L 195 160 A 23 23 0 0 0 241 160 L 241 128 Z" fill="${M.net}" opacity="0.3"/>`
         + `<text x="218" y="${H - 6}" fill="${M.chu}" font-size="10.5" text-anchor="middle">Thu khí bằng cách đẩy không khí</text>`
         + `<text x="250" y="112" fill="${M.chu}" font-size="10">(đặt đứng bình)</text>`;
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
     /* Ghi bên PHẢI điểm tương đương thì dòng chữ cắt ngang đúng đoạn đồ thị
        dựng đứng. Bên trái điểm đó đồ thị còn nằm thấp, chỗ trống. */
     + `<text x="${so(X(vTuongDuong) - 9)}" y="${so(Y(pHTuongDuong) - 6)}" fill="${M.do}" font-size="10.5" text-anchor="end">điểm tương đương</text>`
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
       /* nhãn nằm bên TRÁI điểm chạc, trên phần mạch kép — đặt giữa như cũ thì
          chữ vắt ngang đúng chỗ mạch khuôn trên vừa tách ra */
       + `<line x1="148" y1="83" x2="152" y2="88" stroke="${M.do}" stroke-width="1.1"/>`
       + `<text x="145" y="80" fill="${M.do}" font-size="10.5" text-anchor="end">chạc tái bản</text>`;
  } else if (kieu === 'phienma') {
    ra += `<text x="14" y="20" fill="${M.chu}" font-size="10.5">Phiên mã: RNA được tổng hợp từ mạch mã gốc</text>`;
    ra += `<line x1="24" y1="70" x2="300" y2="70" stroke="${M.truc}" stroke-width="2.4"/>`
       + `<text x="14" y="66" fill="${M.chu}" font-size="9.5" text-anchor="end"></text>`
       + `<text x="24" y="60" fill="${M.chu}" font-size="9.5">3′</text><text x="296" y="60" fill="${M.chu}" font-size="9.5">5′</text>`
       + `<line x1="24" y1="102" x2="300" y2="102" stroke="${M.truc}" stroke-width="2.4"/>`
       + `<text x="24" y="118" fill="${M.chu}" font-size="9.5">5′</text><text x="296" y="118" fill="${M.chu}" font-size="9.5">3′</text>`
       + `<text x="160" y="54" fill="${M.do}" font-size="10" text-anchor="middle">mạch mã gốc (3′ → 5′)</text>`
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
  /* Bẻ tên sự kiện thành nhiều dòng NGẮN. Trước đây chỉ cắt được hai dòng,
     dòng thứ hai ôm hết phần còn lại nên "Lần đầu là Uỷ viên không thường
     trực Hội đồng Bảo an" kéo dài ngang cả trục, đè lên số năm hai bên. */
  const beDong = ten => {
    const tu = String(ten || '').split(' ');
    const dong = [];
    tu.forEach(t => {
      const cuoi = dong[dong.length - 1];
      if (cuoi && (cuoi + ' ' + t).length <= 16) dong[dong.length - 1] = cuoi + ' ' + t;
      else dong.push(t);
    });
    return dong;
  };
  const cacDong = moc.map(m => beDong(m.ten));
  const soDong = Math.max(1, ...cacDong.map(d => d.length));
  const W = Math.max(340, 72 * n + 76), H = 176 + Math.max(0, soDong - 2) * 26;
  const y = 104 + Math.max(0, soDong - 2) * 13, le = 50;
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
    /* nhãn ở hai mốc ngoài cùng dễ lòi ra khỏi khung — kéo vào cho vừa */
    const dong = cacDong[i];
    const dai = Math.max(...dong.map(d => d.length)) * 2.75;
    const xN = so(Math.min(Math.max(x, 3 + dai), W - 3 - dai));
    /* nhãn phía trên xếp NGƯỢC lên để dòng cuối luôn sát trục */
    const yDau = tren ? yNhan - (dong.length - 1) * 13 : yNhan;
    dong.forEach((d, k) => {
      ra += `<text x="${xN}" y="${so(yDau + k * 13)}" fill="${M.chu}" font-size="10.5" text-anchor="middle">${d}</text>`;
    });
  });
  return boc(W, H, ra);
};
})();
