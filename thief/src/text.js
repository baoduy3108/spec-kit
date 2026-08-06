// Two languages, one button.
//
// Nothing in the game stores a sentence. The house records *what happened*
// ({ id: 'lock', door: 'garden' }) and the words are chosen at the moment of
// drawing, so pressing EN/VI re-reads the whole night — including notes from
// twenty nights ago — instead of leaving half the screen in the old language.

let current = 'vi';

export function setLang(code) {
  current = code === 'en' ? 'en' : 'vi';
  return current;
}

export const langNow = () => current;
export const otherLang = () => (current === 'vi' ? 'en' : 'vi');

const WORDS = {
  vi: {
    title: 'KẺ TRỘM MỘT MÌNH',
    sub: 'bản vẽ {seed} · đêm {night} · {turn}',
    notIn: 'chưa vào',
    turnOf: 'lượt {turn}/{dawn}',
    loot: 'ĐÃ TRỘM',
    caught: 'BỊ BẮT',
    pred: 'DỄ ĐOÁN',
    legend: 'phím mũi tên / WASD · ◦ hoặc phím cách để đứng yên · chạm ô kế bên cũng đi được',
    again: 'ĐÊM SAU',

    'door.garden': 'cửa vườn',
    'door.chute': 'cửa hầm than',
    'door.stair': 'cầu thang gia nhân',

    'tip.first': 'Vào, lấy món đồ trong két, ra bằng một cửa. Mỗi lượt: bạn đi, rồi họ đi.',
    'tip.choose': 'Chọn cửa vào: bấm số 1–3 hoặc chạm vào vòng tròn trên bản vẽ.',
    'tip.chooseN': 'Chọn cửa vào ({open} cửa còn mở).',
    'tip.cone': 'Đỏ nhạt = họ sẽ nhìn ở lượt sau. Đừng đứng ở đó.',
    'tip.enter': 'Vào bằng {door}.',
    'tip.locked': '{door} đã bị khoá vì bạn dùng nó quá nhiều.',
    'tip.blocked': 'Tường. Không mất lượt.',
    'tip.took': 'Bạn cầm được món đồ. Giờ phải ra khỏi đây.',
    'tip.vault': 'Két nằm ở ô vàng phía trên. Lấy rồi quay ra bất kỳ cửa nào.',
    'tip.shadow': 'Trong bóng tối: không ai nhìn thấy bạn, kể cả khi đứng ngay trước mặt.',
    'tip.door': 'Đứng ở ngưỡng cửa thì không ai thấy bạn — chỗ để chờ họ đi qua.',

    'kick.night': 'ĐÊM {night}',
    'kick.dawn': 'TRỜI SÁNG',
    'kick.caught': 'BỊ TÓM',
    'head.escaped': 'RA ĐƯỢC',
    'head.dawn': 'HẾT ĐÊM',
    'head.caught': 'HỌ THẤY BẠN',
    'body.escaped': '{turn} lượt, vào bằng {door}. Sáng mai căn nhà sẽ đọc lại đường bạn đi.',
    'body.dawn': '{dawn} lượt và trời sáng trong khi bạn còn ở trong nhà. Đứng yên thì an toàn, nhưng không miễn phí.',
    'body.caught': 'Một người gác nhìn đúng chỗ bạn đứng ở lượt {turn}. Bóng tối vẫn ở đó — bạn chỉ không ở trong nó.',

    'note.none': 'Đêm nay căn nhà chưa đổi gì. Nó vẫn đang xem.',
    'note.lamp': 'Họ treo một ngọn đèn đúng chỗ bạn hay nấp.',
    'note.lock': 'Họ thay ổ khoá mới cho {door}.',
    'note.lockSwap': 'Họ thay ổ khoá mới cho {door}. Bù lại, {freed} lại mở.',
    'note.route': 'Một người gác được lệnh đi qua đúng lối bạn vẫn đi.',
    'note.hour': 'Có người đổi giờ đi tuần.',
    'note.hire': 'Họ thuê thêm một người nữa.',
  },
  en: {
    title: 'THE LONE THIEF',
    sub: 'plan {seed} · night {night} · {turn}',
    notIn: 'not in yet',
    turnOf: 'turn {turn}/{dawn}',
    loot: 'STOLEN',
    caught: 'CAUGHT',
    pred: 'PREDICTABLE',
    legend: 'arrow keys / WASD · ◦ or space to hold still · tapping an adjacent square works too',
    again: 'NEXT NIGHT',

    'door.garden': 'the garden door',
    'door.chute': 'the coal chute',
    'door.stair': 'the servants’ stair',

    'tip.first': 'Get in, take the thing in the vault, get out by a door. Each turn: you move, then they do.',
    'tip.choose': 'Pick your way in: press 1–3, or tap a circle on the plan.',
    'tip.chooseN': 'Pick your way in ({open} doors still open).',
    'tip.cone': 'Pale red = where they will be looking next turn. Do not be standing there.',
    'tip.enter': 'In by {door}.',
    'tip.locked': '{door} is bolted — you used it once too often.',
    'tip.blocked': 'Wall. That did not cost you a turn.',
    'tip.took': 'You have it. Now get out.',
    'tip.vault': 'The vault is the gold square at the top. Take it, then leave by any door.',
    'tip.shadow': 'In shadow no one can see you, even standing right in front of them.',
    'tip.door': 'A doorway is cover — somewhere to wait until they walk past.',

    'kick.night': 'NIGHT {night}',
    'kick.dawn': 'DAWN',
    'kick.caught': 'SEEN',
    'head.escaped': 'YOU’RE OUT',
    'head.dawn': 'NIGHT’S OVER',
    'head.caught': 'THEY SAW YOU',
    'body.escaped': '{turn} turns, in by {door}. In the morning the house will read your route back.',
    'body.dawn': '{dawn} turns, and morning came while you were still inside. Standing still is safe — it is not free.',
    'body.caught': 'A guard looked exactly where you were standing on turn {turn}. The shadows were still there. You were not in them.',

    'note.none': 'The house changed nothing tonight. It is still watching.',
    'note.lamp': 'They hung a lamp exactly where you like to wait.',
    'note.lock': 'They fitted a new lock to {door}.',
    'note.lockSwap': 'They fitted a new lock to {door}, and let {freed} open again.',
    'note.route': 'A guard was told to walk past the way you always come.',
    'note.hour': 'Someone changed the hour of their round.',
    'note.hire': 'They hired one more pair of eyes.',
  },
};

/** t('body.escaped', { turn: 12, door: 'garden' }) — door ids resolve too. */
export function t(key, params = {}) {
  const table = WORDS[current] || WORDS.vi;
  const raw = table[key] ?? WORDS.vi[key] ?? key;
  return raw.replace(/\{(\w+)\}/g, (_m, name) => {
    const value = params[name];
    if (value === undefined) return `{${name}}`;
    // A door is carried around as an id, never as a sentence.
    return table[`door.${value}`] ?? String(value);
  });
}

/** One structured note, in whichever language is on right now. */
export const noteText = (note) => t(`note.${note.id}`, note);
