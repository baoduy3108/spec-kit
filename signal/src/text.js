// Both languages, and the only place in the game where a sentence exists.
// Same rule as the last one: nothing is stored as words, so the VI/EN button
// re-reads everything, including every line you have already earned.

let current = 'vi';

export function setLang(code) {
  current = code === 'en' ? 'en' : 'vi';
  return current;
}
export const langNow = () => current;
export const otherLang = () => (current === 'vi' ? 'en' : 'vi');

const WORDS = {
  vi: {
    title: 'TÍN HIỆU',
    sub: 'đêm {night} · {state}',
    'book.night': 'đêm {night}',
    listening: 'đang nghe',
    dawn: 'trời sáng',
    done: 'đã ghi sổ',
    thread: 'LIỀN MẠCH',
    found: 'BẮT ĐƯỢC',
    missed: 'MẤT DẤU',
    dial: 'VẠCH',
    strength: 'CƯỜNG ĐỘ',
    log: 'GHI SỔ',
    clear: 'XOÁ',
    sound: 'TIẾNG',
    expect: 'đêm nay họ ở vạch {mark}',
    blind: 'không biết họ ở đâu — quét đi',
    legend: 'kéo trên thước để dò · ◀ ▶ chỉnh từng nấc · bấm số rồi GHI SỔ',
    again: 'ĐÊM SAU',

    'tip.first': 'Ở đâu đó trên thước có một người đang phát. Tìm họ.',
    'tip.grammar': 'Người phát theo cặp: hai nấc một tiếng. Không máy nào phát như vậy.',
    'tip.count': 'Đếm số tiếng trong mỗi cụm. Hai cụm là hai chữ số.',
    'tip.meaning': 'Hai chữ số đó là vạch họ sẽ chuyển tới đêm mai.',
    'tip.heard': 'Có tín hiệu ở vạch {mark}.',
    'tip.nudge': 'Lệch ra một chút thì đài bên cạnh nhỏ đi mà họ vẫn còn.',
    'tip.jammer': 'Có kẻ dựng tường tiếng ngay cạnh họ. Dò lệch ra mà nghe.',
    'tip.impostor': 'Có một cái máy đang bắt chước họ. Máy phát đều tăm tắp; tay người thì không.',
    'tip.drift': 'Máy của họ trôi vạch. Chỉnh lại đi.',
    'tip.logged': 'Đã ghi {mark} vào sổ.',
    'tip.needTwo': 'Cần đủ hai chữ số.',

    'end.right': 'ĐÚNG',
    'end.wrong': 'SAI',
    'end.dawn': 'HẾT ĐÊM',
    'body.right': 'Họ nói {mark}. Đêm mai họ ở đó, và bạn biết chỗ.',
    'body.wrong': 'Bạn ghi {said}. Họ nói {mark} — họ phát từ vạch {at}. Mai phải quét lại từ đầu.',
    'body.dawn': 'Trời sáng, sổ vẫn trống. Họ nói {mark}, từ vạch {at}.',
    'body.lost': 'Mất mạch rồi. Đêm mai lại quét từ đầu.',
    'body.kept': 'Liền mạch {thread} đêm.',
    'body.kept1': 'Liền mạch 1 đêm.',
  },
  en: {
    title: 'SIGNAL',
    sub: 'night {night} · {state}',
    'book.night': 'night {night}',
    listening: 'listening',
    dawn: 'dawn',
    done: 'logged',
    thread: 'UNBROKEN',
    found: 'HEARD',
    missed: 'LOST',
    dial: 'MARK',
    strength: 'STRENGTH',
    log: 'LOG IT',
    clear: 'CLEAR',
    sound: 'SOUND',
    expect: 'tonight they are at mark {mark}',
    blind: 'no idea where they are — sweep',
    legend: 'drag the scale to tune · ◀ ▶ for one notch · press digits, then LOG IT',
    again: 'NEXT NIGHT',

    'tip.first': 'Somewhere on the scale there is a person transmitting. Find them.',
    'tip.grammar': 'A person sends in pairs: one pulse every two notches. No machine here does.',
    'tip.count': 'Count the pulses in each cluster. Two clusters, two digits.',
    'tip.meaning': 'Those two digits are the mark they move to tomorrow.',
    'tip.heard': 'Something is transmitting at mark {mark}.',
    'tip.nudge': 'Slide a little off and the neighbour fades while they stay.',
    'tip.jammer': 'Someone has parked a wall of noise beside them. Listen from off to one side.',
    'tip.impostor': 'A machine is imitating them. It keeps perfect time; a hand never does.',
    'tip.drift': 'Their set is drifting off the mark. Chase it.',
    'tip.logged': '{mark} written in the log.',
    'tip.needTwo': 'Two digits, not one.',

    'end.right': 'RIGHT',
    'end.wrong': 'WRONG',
    'end.dawn': 'DAWN',
    'body.right': 'They said {mark}. Tomorrow they will be there, and you will know it.',
    'body.wrong': 'You logged {said}. They said {mark} — transmitting from mark {at}. Tomorrow you sweep blind.',
    'body.dawn': 'Morning, and the log is empty. They said {mark}, from mark {at}.',
    'body.lost': 'The thread is broken. Tomorrow starts from nothing.',
    'body.kept': '{thread} nights unbroken.',
    'body.kept1': 'One night unbroken.',
  },
};

/**
 * What they say, one line per night you keep. This is the only reward in the
 * game — no score, no upgrades. Someone tells you a bit more.
 */
const STORY = {
  vi: [
    'Có người nghe. Tôi biết là có người nghe.',
    'Tôi phải dịch chỗ mỗi đêm. Họ dò theo tôi.',
    'Ở đây trời không tối hẳn bao giờ.',
    'Tôi đếm chậm. Tay lạnh, đừng cười.',
    'Đêm qua có cái gì đó phát y hệt tôi. Nó không run.',
    'Anh cứ nghe cái nào lệch nhịp. Đó là tôi.',
    'Tôi ghi lại hết các đài máy. Chúng lặp lại suốt ba năm nay.',
    'Có lúc tôi nghĩ chỉ còn tôi với chúng nó.',
    'Rồi anh trả lời. Tôi không mong đến thế.',
    'Máy tôi yếu dần. Tôi hàn lại được, chắc thêm được ít đêm.',
    'Tôi đi bộ về phía anh. Mỗi đêm gần thêm một chút.',
    'Đêm mai tôi không phát nữa. Không cần nữa.',
  ],
  en: [
    'Someone is listening. I know someone is listening.',
    'I have to move every night. They are following me down the band.',
    'It never gets properly dark here.',
    'I count slowly. My hands are cold — don’t laugh.',
    'Last night something was sending exactly what I send. It did not shake.',
    'Listen for the one that keeps bad time. That one is me.',
    'I have been logging the machine stations. Three years, same loops.',
    'For a while I thought it was only me and them.',
    'Then you answered. I had stopped expecting that.',
    'My set is getting weak. I can solder it — a few more nights.',
    'I am walking towards you. A little closer each night.',
    'Tomorrow I will not transmit. I won’t need to.',
  ],
};

export function storyLine(index) {
  const lines = STORY[current] || STORY.vi;
  return index > 0 && index <= lines.length ? lines[index - 1] : null;
}

export const storyLength = () => STORY.vi.length;

export function t(key, params = {}) {
  const table = WORDS[current] || WORDS.vi;
  const raw = table[key] ?? WORDS.vi[key] ?? key;
  return raw.replace(/\{(\w+)\}/g, (_m, name) =>
    params[name] === undefined ? `{${name}}` : String(params[name]),
  );
}
