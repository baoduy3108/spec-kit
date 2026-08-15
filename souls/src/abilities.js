// Eight abilities and thirty-one skills.
//
// The rule every one of them obeys: it spends something the fiction already
// gave you. You carry an unlit lantern. Your body is fired clay with the kiln
// still burning in its cracks. You woke on a floor of ash and you came off a
// rack with a blank label. There is nothing here that could be moved into a
// different game without the name stopping making sense.
//
// Abilities are pressed. Skills are bought, and each one bends an ability or
// a stat — a skill with no prerequisite and no cost is a difficulty setting,
// so `tests/abilities.test.js` refuses both.

import { KNIGHT } from './rules.js';

/**
 * `spends` is the honest field: what this takes out of you. An ability that
 * spends nothing is a button, and the test rejects it.
 */
export const ABILITIES = {
  kindle: {
    n: 1,
    name: { en: 'Kindle', vi: 'Mồi Lửa' },
    spends: 'health',
    line: {
      en: 'Open the cracks and light the lantern off your own chest. You are the fuel, and there is only so much of you.',
      vi: 'Mở toác các vết nứt và châm cây đèn bằng chính lồng ngực mình. Bạn là nhiên liệu, mà trong người bạn chỉ có ngần ấy.',
    },
  },
  seal: {
    n: 2,
    name: { en: 'Seal', vi: 'Hàn Nứt' },
    spends: 'stamina',
    line: {
      en: 'Close the cracks. Almost nothing gets through, and nothing is feeding the fire either.',
      vi: 'Khép các vết nứt. Gần như không gì xuyên qua nổi, và cũng chẳng còn gì nuôi ngọn lửa.',
    },
  },
  draw: {
    n: 3,
    name: { en: 'Draw the Ember', vi: 'Rút Than' },
    spends: 'a parry window',
    line: {
      en: 'Reach into the staggered thing and take the fire out of it. Only in the second a parry opens.',
      vi: 'Thọc tay vào con đang choáng và lôi ngọn lửa ra khỏi nó. Chỉ trong đúng một giây mà cú đỡ chuẩn mở ra.',
    },
  },
  wedge: {
    n: 4,
    name: { en: 'Wedge', vi: 'Nhồi Đất' },
    spends: 'stamina',
    line: {
      en: 'Clay is beaten until the air is out of it, or it bursts in the fire. Beat yourself: nothing staggers you while you do.',
      vi: 'Đất bị nhồi cho hết khí, không thì nó nổ trong lò. Tự nhồi mình: trong lúc đó không gì làm bạn choáng được.',
    },
  },
  hook: {
    n: 9,
    name: { en: 'The Pole', vi: 'Cây Sào' },
    spends: 'stamina',
    line: {
      en: 'It was always long enough to reach a lamp. Nobody said that was all it could reach.',
      vi: 'Nó vốn dài vừa đủ để với tới một ngọn đèn. Không ai nói nó chỉ với tới được thế.',
    },
  },
  'ash-step': {
    n: 5,
    name: { en: 'Ash Step', vi: 'Bước Tro' },
    spends: 'stamina',
    line: {
      en: 'You have been walking in it since the first room. Kick it up behind you and whatever is following loses the line.',
      vi: 'Bạn đã lê nó theo từ căn phòng đầu tiên. Hất nó lên sau lưng và thứ đang bám theo mất dấu.',
    },
  },
  slake: {
    n: 6,
    name: { en: 'Slake', vi: 'Dội Nước' },
    spends: 'the lantern',
    line: {
      en: 'Straight into the trough. Everything comes back at once and you come out cold, and cold clay hits like clay.',
      vi: 'Thả thẳng vào máng tôi. Mọi thứ hồi lại cùng lúc và bạn nguội ngắt, mà đất nguội thì đánh như đất.',
    },
  },
  'mould-echo': {
    n: 7,
    name: { en: 'Mould Echo', vi: 'Vọng Khuôn' },
    spends: 'essence',
    line: {
      en: 'Something else came off the same rack. It repeats your last swing, half a second late, exactly as you threw it.',
      vi: 'Có thứ khác cũng ra từ giá khuôn ấy. Nó lặp lại nhát chém vừa rồi, chậm nửa giây, y hệt cách bạn đã vung.',
    },
  },
  stoke: {
    n: 8,
    name: { en: 'Stoke', vi: 'Khơi Lò' },
    spends: 'everything the lantern has left',
    line: {
      en: 'Pour what is left of the burn into one blow. The lantern goes out at the end of it, whatever was left.',
      vi: 'Dồn hết phần cháy còn lại vào một cú. Xong cú đó là đèn tắt, còn bao nhiêu cũng tắt.',
    },
  },
};

const skills = [];
/** id, branch, what it needs first, what it costs, and what it actually does. */
const skill = (id, branch, requires, cost, name, line, effect) =>
  skills.push({ id, branch, requires, cost, name, line, effect });

// --- CLAY: the body you were fired as ------------------------------------
skill('wedged-twice', 'clay', 'wedge', 120, { en: 'Wedged Twice', vi: 'Nhồi Hai Lượt' },
  { en: 'They worked the air out of you longer than most. Wedge holds a second longer.', vi: 'Người ta nhồi khí ra khỏi bạn lâu hơn phần lớn những cái khác. Nhồi Đất giữ lâu thêm một giây.' },
  { key: 'wedge.time', mul: 1.5 });
skill('fine-grain', 'clay', 'wedged-twice', 260, { en: 'Fine Grain', vi: 'Thớ Mịn' },
  { en: 'Better clay, sieved. Poise up, and the cracks spread slower.', vi: 'Đất tốt hơn, đã rây. Thăng bằng tăng, và các vết nứt lan chậm hơn.' },
  { key: 'poise', add: 18 });
skill('thick-walled', 'clay', 'seal', 180, { en: 'Thick Walled', vi: 'Thành Dày' },
  { en: 'Cast heavier. Seal soaks more and you move slower while it is shut.', vi: 'Đúc dày hơn. Hàn Nứt chắn tốt hơn và bạn đi chậm lại trong lúc khép.' },
  { key: 'seal.soak', add: 0.12 });
skill('slip-glaze', 'clay', 'thick-walled', 300, { en: 'Slip Glaze', vi: 'Men Lót' },
  { en: 'A coat that sheds fire. Burning does half.', vi: 'Một lớp men trượt lửa. Cháy chỉ còn ăn nửa.' },
  { key: 'burn.taken', mul: 0.5 });
skill('unfinished-foot', 'clay', 'fine-grain', 340, { en: 'Unfinished Foot', vi: 'Chân Chưa Mài' },
  { en: 'The base was never ground flat, so it grips. You cannot be pushed off a ledge.', vi: 'Phần đế chưa từng được mài phẳng, nên nó bám. Không gì đẩy bạn khỏi mép được.' },
  { key: 'knockback', mul: 0 });
skill('hairline', 'clay', 'slip-glaze', 420, { en: 'Hairline', vi: 'Vết Rạn Tóc' },
  { en: 'One crack that never widened. Under a quarter health, damage taken drops hard.', vi: 'Một vết rạn chưa bao giờ toác ra. Dưới một phần tư máu, sát thương nhận vào giảm mạnh.' },
  { key: 'lowhp.soak', add: 0.3 });
skill('second-firing', 'clay', 'hairline', 560, { en: 'Second Firing', vi: 'Mẻ Nung Thứ Hai' },
  { en: 'Back in the kiln once. Everything about the body improves and nothing about the fire does.', vi: 'Vào lò thêm một lần. Mọi thứ thuộc về thân xác đều khá lên, và không thứ gì thuộc về lửa khá hơn.' },
  { key: 'hp', mul: 1.25 });

// --- FLAME: the lantern and what is in your chest -------------------------
skill('long-wick', 'flame', 'kindle', 140, { en: 'Long Wick', vi: 'Bấc Dài' },
  { en: 'Trimmed properly for once. The burn lasts four seconds longer.', vi: 'Lần này được xén tử tế. Thời gian cháy dài thêm bốn giây.' },
  { key: 'kindle.burn', add: 4 });
skill('cheap-fuel', 'flame', 'kindle', 160, { en: 'Cheap Fuel', vi: 'Nhiên Liệu Rẻ' },
  { en: 'You have learned which part of yourself to burn. Kindle costs less health.', vi: 'Bạn đã học được nên đốt phần nào của mình. Mồi Lửa tốn ít máu hơn.' },
  { key: 'kindle.hpCost', add: -5 });
skill('twice-lit', 'flame', 'long-wick', 380, { en: 'Twice Lit', vi: 'Thắp Hai Lần' },
  { en: 'A second kindling before you need a fire. The second one costs double.', vi: 'Được châm lần thứ hai trước khi phải tìm lửa. Lần thứ hai tốn gấp đôi.' },
  { key: 'kindle.charges', add: 1 });
skill('hot-edge', 'flame', 'cheap-fuel', 300, { en: 'Hot Edge', vi: 'Lưỡi Nóng' },
  { en: 'The blade takes the heat too. Lit swings set what they hit alight.', vi: 'Lưỡi kiếm cũng ăn nhiệt. Nhát chém khi đèn cháy làm thứ nó trúng bắt lửa.' },
  { key: 'lit.burnOnHit', add: 1 });
skill('open-flame', 'flame', 'hot-edge', 440, { en: 'Open Flame', vi: 'Lửa Trần' },
  { en: 'Stop shielding it. Much brighter, much more damage, and everything can see you.', vi: 'Thôi che chắn cho nó. Sáng hơn hẳn, mạnh hơn hẳn, và mọi thứ đều nhìn thấy bạn.' },
  { key: 'kindle.bonus', add: 0.25 });
skill('banked', 'flame', 'twice-lit', 480, { en: 'Banked', vi: 'Ủ Lửa' },
  { en: 'Damp it rather than let it die. Sealing no longer puts the lantern out.', vi: 'Ủ nó lại thay vì để tắt. Hàn Nứt không còn dập tắt cây đèn nữa.' },
  { key: 'seal.keepsLit', add: 1 });
skill('the-whole-hearth', 'flame', 'open-flame', 620, { en: 'The Whole Hearth', vi: 'Cả Lò Lửa' },
  { en: 'Stoke takes the burn and the health you have left. There is no rule that says you have to survive it.', vi: 'Khơi Lò lấy cả phần cháy lẫn phần máu còn lại. Chẳng có luật nào bắt bạn phải sống sót sau đó.' },
  { key: 'stoke.overdraw', add: 1 });

// --- ASH: what you woke up on --------------------------------------------
skill('deep-tread', 'ash', 'ash-step', 130, { en: 'Deep Tread', vi: 'Vệt Sâu' },
  { en: 'It goes down further than you want to check, and it comes up further too.', vi: 'Nó ăn xuống sâu hơn mức bạn muốn kiểm chứng, và bốc lên cũng cao hơn.' },
  { key: 'ashstep.cloud', mul: 1.6 });
skill('cold-trail', 'ash', 'deep-tread', 280, { en: 'Cold Trail', vi: 'Dấu Nguội' },
  { en: 'Nothing follows you through it for a full second.', vi: 'Trong trọn một giây, không gì lần theo bạn xuyên qua được nó.' },
  { key: 'ashstep.blind', add: 1 });
skill('sure-footed', 'ash', 'ash-step', 190, { en: 'Sure Footed', vi: 'Chân Vững' },
  { en: 'Rolling costs less, because you have done nothing else for a long time.', vi: 'Lăn tốn ít hơn, vì đã lâu rồi bạn chẳng làm gì khác.' },
  { key: 'roll.cost', add: -6 });
skill('longer-frames', 'ash', 'sure-footed', 420, { en: 'Longer Frames', vi: 'Khung Dài Hơn' },
  { en: 'A wider stretch of the roll where nothing can touch you. The roll itself is no faster.', vi: 'Quãng bất tử trong cú lăn rộng ra. Bản thân cú lăn không nhanh hơn chút nào.' },
  { key: 'roll.iframes', add: 0.06 });
skill('kicked-up', 'ash', 'cold-trail', 460, { en: 'Kicked Up', vi: 'Hất Tung' },
  { en: 'The cloud burns if the lantern is lit. It is ash off a kiln floor; of course it does.', vi: 'Đám bụi bắt cháy nếu đèn đang thắp. Đó là tro từ nền lò nung; dĩ nhiên là nó cháy.' },
  { key: 'ashstep.ignites', add: 1 });
skill('the-walk-down', 'ash', 'longer-frames', 540, { en: 'The Walk Down', vi: 'Quãng Đi Xuống' },
  { en: 'You still do not remember it, but your legs do. Roll straight out of a stagger.', vi: 'Bạn vẫn không nhớ nó, nhưng đôi chân thì nhớ. Lăn thẳng ra khỏi một cú choáng.' },
  { key: 'stagger.cancel', add: 1 });

// --- MOULD: the rack you came off ----------------------------------------
skill('same-rack', 'mould', 'mould-echo', 200, { en: 'Same Rack', vi: 'Cùng Giá Khuôn' },
  { en: 'It knows the swing because it was cast from the shape that throws it.', vi: 'Nó thuộc nhát chém ấy vì nó được đúc từ chính cái hình dáng vung ra nhát đó.' },
  { key: 'echo.damage', mul: 1.3 });
skill('third-shelf', 'mould', 'same-rack', 360, { en: 'Third Shelf', vi: 'Kệ Thứ Ba' },
  { en: 'Near the end, where the label is one you do not have to read. A second echo.', vi: 'Gần cuối, chỗ có cái nhãn mà bạn không cần đọc. Thêm một tiếng vọng nữa.' },
  { key: 'echo.count', add: 1 });
skill('blank-label', 'mould', 'mould-echo', 240, { en: 'Blank Label', vi: 'Nhãn Trống' },
  { en: 'Nobody wrote a name on it, so nothing knows which of you to attack first.', vi: 'Không ai ghi tên lên đó, nên chẳng gì biết nên đánh đứa nào trước.' },
  { key: 'echo.taunt', add: 1 });
skill('the-seam', 'mould', 'blank-label', 400, { en: 'The Seam', vi: 'Đường Ghép' },
  { en: 'The line down your side where the halves met. Echoes strike it too, and it does not hurt.', vi: 'Đường chạy dọc sườn nơi hai nửa gặp nhau. Tiếng vọng cũng đánh vào đó, và nó không đau.' },
  { key: 'echo.safe', add: 1 });
skill('it-rolls-too', 'mould', 'third-shelf', 580, { en: 'It Rolls Too', vi: 'Nó Cũng Biết Lăn' },
  { en: 'Nothing else in this world rolls. It came off the same rack, so it rolls when you would have.', vi: 'Không gì khác trong thế giới này biết lăn. Nó ra từ cùng giá khuôn, nên nó lăn đúng lúc bạn cũng sẽ lăn.' },
  { key: 'echo.rolls', add: 1 });

// --- KILN: the deep end ---------------------------------------------------
skill('bricked-in', 'kiln', 'seal', 320, { en: 'Bricked In', vi: 'Xây Bít' },
  { en: 'They brick the chamber shut from the outside every firing. Seal cannot be broken by anything.', vi: 'Mỗi mẻ nung, buồng lò đều bị xây bít từ bên ngoài. Hàn Nứt không gì phá nổi.' },
  { key: 'seal.unbreakable', add: 1 });
skill('cone-six', 'kiln', 'bricked-in', 400, { en: 'Cone Six', vi: 'Nón Số Sáu' },
  { en: 'The little cones bend when it is hot enough. Yours have all bent.', vi: 'Những chiếc nón nhỏ cong xuống khi đủ nóng. Nón của bạn cong hết rồi.' },
  { key: 'lit.stagger', add: 1 });
skill('rake-out', 'kiln', 'draw', 260, { en: 'Rake Out', vi: 'Cào Tro' },
  { en: 'Take more than the ember. Drawing hits harder and the window opens wider.', vi: 'Lấy nhiều hơn cả cục than. Rút Than mạnh hơn và cửa sổ mở rộng hơn.' },
  { key: 'draw.window', add: 0.4 });
skill('two-embers', 'kiln', 'rake-out', 480, { en: 'Two Embers', vi: 'Hai Cục Than' },
  { en: 'One for the flask and one for the lantern. Drawing relights it, spent or not.', vi: 'Một cho bình thuốc, một cho cây đèn. Rút Than châm lại nó, dù đã dùng hết hay chưa.' },
  { key: 'draw.relights', add: 1 });
skill('the-first-mould', 'kiln', 'two-embers', 700, { en: 'The First Mould', vi: 'Khuôn Đầu Tiên' },
  { en: 'Top rack, oldest label. Everything on those shelves came after it, including you.', vi: 'Giá trên cùng, nhãn cũ nhất. Mọi thứ trên các kệ đó đều có sau nó, kể cả bạn.' },
  { key: 'all', mul: 1.1 });
skill('trying-to-go-out', 'kiln', 'the-first-mould', 900, { en: 'Trying to Go Out', vi: 'Đang Cố Tắt Đi' },
  { en: 'What is in your chest wants what the First Flame wants. Let it, and for ten seconds nothing can put you out.', vi: 'Thứ trong lồng ngực bạn muốn đúng cái Ngọn Lửa Đầu Tiên muốn. Cứ để vậy, và trong mười giây không gì dập tắt bạn nổi.' },
  { key: 'death.deny', add: 1 });

export const SKILLS = skills;
export const ABILITY_IDS = Object.keys(ABILITIES);
export const BRANCHES = [...new Set(skills.map((s) => s.branch))];
export const skillById = (id) => skills.find((s) => s.id === id);
export const skillsOf = (branch) => skills.filter((s) => s.branch === branch);

/** What a skill needs before it: an ability, or another skill. */
export const requirementKind = (id) =>
  ABILITIES[id] ? 'ability' : skillById(id) ? 'skill' : null;

/** The three that already exist in the fight, so the data cannot drift from it. */
export const LIVE = ['kindle', 'seal', 'draw'].filter((id) => KNIGHT.skills[id]);
