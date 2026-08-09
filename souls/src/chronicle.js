// Two things the beats in `story.js` imply but never say outright: what
// happened here before you woke up, and what you are.
//
// The history is written as six ages, and every age has to point at evidence
// you can walk to — a room, a boss, a thing you can hold. `tests/chronicle.
// test.js` checks that every piece of evidence resolves. An age with no
// evidence is a paragraph in a wiki; an age with evidence is a reason a room
// looks the way it does.
//
// The character is written the same way as the beats: gated, discovered, and
// never announced. You are not told who you are at the start because the
// answer only means anything after you have seen the racks it came off.

import { AREAS, FIRES, ROOMS, START } from './world.js';
import { BOSS_IDS } from './bosses.js';
import { WEAPONS } from './arms.js';

/**
 * The world before you. `evidence` is the load-bearing field: each entry is
 * a real area, boss or weapon that is the reason we know this.
 */
export const AGES = [
  {
    n: 1,
    id: 'the-dark-working',
    name: { en: 'The Dark Working', vi: 'Thời Đào Trong Tối' },
    what: {
      en: 'People lived here before there was any light to live by, and they dug. Not for treasure — for room. The undercroft, the cistern and the deep vault are older than every wall above them and they were cut by hand, in the dark, by people who could not see what they were making.',
      vi: 'Người ta sống ở đây từ trước khi có ánh sáng nào để mà sống, và họ đào. Không phải đào tìm của cải — đào để lấy chỗ ở. Hầm dưới, bể chứa và hầm sâu đều già hơn mọi bức tường phía trên, và chúng được đục bằng tay, trong bóng tối, bởi những người không nhìn thấy thứ mình đang tạo ra.',
    },
    remains: {
      en: 'Chisel marks that run in the wrong direction for someone who could see the wall. The deepest vault in the world holds one plain sword with no maker on it, locked away for no reason anybody wrote down.',
      vi: 'Những vết đục chạy sai hướng so với người nhìn được bức tường. Căn hầm sâu nhất thế giới cất giữ đúng một cây kiếm trơn không tên thợ, bị khoá lại vì một lý do không ai chép lại.',
    },
    evidence: ['undercroft', 'cistern', 'deep-vault', 'quarry-grips', 'the-plain-sword'],
  },
  {
    n: 2,
    id: 'the-finding',
    name: { en: 'The Finding', vi: 'Cuộc Tìm Thấy' },
    what: {
      en: 'Somebody dug into a chamber that was already hot. The flame in it had not been lit by anyone and it was already going out — slowly, the way something goes out when it has been going out for longer than there have been people to watch.',
      vi: 'Có người đào trúng một căn buồng vốn đã nóng sẵn. Ngọn lửa trong đó không do ai thắp lên và nó vốn đã đang tắt dần — chậm rãi, theo cái cách một thứ tắt dần khi nó đã tắt dần lâu hơn cả lịch sử loài người ngồi nhìn.',
    },
    remains: {
      en: 'The firing chamber is bricked shut from the outside every firing. Nobody bricks a door from the outside to keep themselves in. The First Flame has been trying to go out since before it was found, and it is still trying.',
      vi: 'Buồng nung bị xây bít từ bên ngoài mỗi mẻ nung. Không ai xây bít một cánh cửa từ bên ngoài để nhốt chính mình. Ngọn Lửa Đầu Tiên đã cố tắt đi từ trước khi bị tìm thấy, và tới giờ vẫn đang cố.',
    },
    evidence: ['kiln', 'the-first-flame', 'a-piece-of-the-flame'],
  },
  {
    n: 3,
    id: 'the-works',
    name: { en: 'The Works', vi: 'Thời Dựng Xưởng' },
    what: {
      en: 'Everything you walk through was built in one long push to keep that flame alight. A kiln to fire bodies that could do the work. An orchard to plant the ones that wore out. A forge to arm them. A clock so nobody had to remember the hour. A bank of mirrors to throw the light far enough down the mountain that people could live by it.',
      vi: 'Mọi thứ bạn đi qua đều được dựng lên trong một đợt dốc sức duy nhất nhằm giữ ngọn lửa ấy cháy. Một cái lò để nung ra những thân xác biết làm việc. Một khu vườn để trồng những cái đã mòn. Một lò rèn để trang bị cho chúng. Một cỗ đồng hồ để không ai phải nhớ giờ. Một dàn gương để hắt ánh sáng đủ xa xuống núi cho người ta sống nhờ.',
    },
    remains: {
      en: 'A working world. Not a ruin — a ruin is a place that stopped. The forge is still lit, the clock still runs, the mould racks are still labelled, and the mirrors are still aimed.',
      vi: 'Một thế giới vẫn đang vận hành. Không phải phế tích — phế tích là nơi đã dừng lại. Lò rèn vẫn cháy, đồng hồ vẫn chạy, giá khuôn vẫn còn nhãn, và dàn gương vẫn đúng hướng.',
    },
    evidence: ['forge', 'clockwork', 'bone-orchard', 'the-lantern', 'the-smith', 'the-hourwright'],
  },
  {
    n: 4,
    id: 'the-carriers',
    name: { en: 'The Carriers', vi: 'Những Người Cầm' },
    what: {
      en: 'The lantern could not be left on a hook, because the mirrors had to be re-aimed and the wick had to be trimmed and both are done by hand. So somebody carried it. When that one stopped being able to, the next one came up the stair, fought the one holding it, and took it.',
      vi: 'Cây đèn không thể treo lên móc, vì gương phải chỉnh lại và bấc phải xén, mà cả hai việc đều làm bằng tay. Nên phải có người cầm nó. Khi người đó không cầm nổi nữa, người kế tiếp leo lên cầu thang, đánh nhau với kẻ đang cầm, rồi lấy nó.',
    },
    remains: {
      en: 'The step outside the lantern door is worn hollow in one spot the width of two feet. One spot. And a family of shades that roll, which nothing else in the world does, at exactly the moment you would have.',
      vi: 'Bậc thềm ngoài cửa phòng đèn mòn lõm đúng một chỗ, rộng bằng hai bàn chân. Đúng một chỗ. Và một họ Bóng biết lăn, thứ không gì khác trong thế giới này làm được, lăn đúng vào khoảnh khắc mà bạn cũng sẽ lăn.',
    },
    evidence: ['the-lantern', 'the-lantern-warden', 'winding-stair', 'the-free-hand'],
  },
  {
    n: 5,
    id: 'the-wrong-hour',
    name: { en: 'The Wrong Hour', vi: 'Giờ Sai' },
    what: {
      en: 'The clock drifted. Not by much and not all at once. The lanterns were lit late, then early, then at hours that matched nothing, and everything downstream kept working to it because that is what downstream does. Whole districts were lit for nobody and dark when the tide came.',
      vi: 'Đồng hồ chạy lệch. Không lệch nhiều và không lệch một lúc. Các cây đèn được thắp muộn, rồi thắp sớm, rồi thắp vào những giờ chẳng khớp với gì cả, mà mọi mắt xích phía dưới vẫn cứ làm theo, vì mắt xích phía dưới vốn là như vậy. Cả những khu phố sáng đèn cho không một ai, và tối om đúng lúc nước lên.',
    },
    remains: {
      en: 'A city under water that was lit when it drowned. Ash falling on a district that has nobody to sweep it. A tip of a hundred years of waste outside a forge that never stopped pouring.',
      vi: 'Một thành phố chìm dưới nước, chìm trong lúc vẫn đang sáng đèn. Tro rơi xuống một khu phố không còn ai quét. Một bãi đổ chất trăm năm phế thải ngoài cái lò chưa từng ngừng rót.',
    },
    evidence: ['drowned-city', 'ashlands', 'slag', 'the-tide', 'the-slagborn'],
  },
  {
    n: 6,
    id: 'the-standing-rows',
    name: { en: 'The Standing Rows', vi: 'Những Hàng Đứng' },
    what: {
      en: 'The people are gone. Not killed — finished. The apparatus did not notice. The kiln still fires on the wrong hour, the orchard still plants what the kiln wears out, and the racks still have shapes on them waiting to be poured.',
      vi: 'Con người đã hết. Không phải bị giết — mà là đã dùng hết. Bộ máy chẳng nhận ra điều đó. Lò vẫn nung vào giờ sai, khu vườn vẫn trồng những cái lò làm mòn, và trên giá vẫn còn những hình dáng chờ được rót.',
    },
    remains: {
      en: 'A fresh one still standing beside the mould racks, four tiers below everything guarding it. And you, on a floor of ash, at the bottom, with no memory of the walk down.',
      vi: 'Một cái vừa ra lò vẫn còn đứng cạnh giá khuôn, thấp hơn bốn bậc so với mọi thứ đang canh nó. Và bạn, trên một mặt sàn toàn tro, ở dưới cùng, không nhớ gì về quãng đường đi xuống.',
    },
    evidence: ['kiln', 'bone-orchard', 'the-gardener', 'undercroft', 'the-standing-blade'],
  },
];

/**
 * You. Gated exactly like the story beats, and in the same order the fight
 * teaches them. The answer is never announced — it is assembled out of things
 * that were already true about how the game plays.
 */
const self = [];
const note = (id, when, text) => self.push({ id, when, text });

note('no-name', { seen: ['undercroft'] }, {
  en: 'Nothing in this world asks your name. Not the fires, not the shops, not the things that kill you. It is not a courtesy — nobody wrote one on the label.',
  vi: 'Không thứ gì trong thế giới này hỏi tên bạn. Không phải những bếp lửa, không phải hàng quán, không phải những thứ giết bạn. Đó không phải phép lịch sự — chỉ là không ai ghi tên nào lên nhãn cả.',
});
note('the-walk-down', { seen: ['undercroft'] }, {
  en: 'You remember waking. You do not remember arriving. Those are different things and the gap between them is exactly the length of a staircase.',
  vi: 'Bạn nhớ lúc tỉnh dậy. Bạn không nhớ lúc tới nơi. Đó là hai chuyện khác nhau, và khoảng trống giữa chúng dài đúng bằng một cầu thang.',
});
note('sitting-at-a-fire', { fires: 2 }, {
  en: 'Sitting at a fire does not rest you. You come away harder than you sat down, the way clay does. Resting is not what is happening at a bonfire.',
  vi: 'Ngồi bên lửa không làm bạn nghỉ ngơi. Bạn đứng dậy cứng hơn lúc ngồi xuống, giống như đất sét. Cái diễn ra ở bếp lửa không phải là nghỉ.',
});
note('the-heat-you-take', { felled: ['the-bloated'] }, {
  en: 'What you take off the things you kill is the heat in them. It buys you vigour, endurance, strength. It was all lit from one place and you are walking it back up the mountain.',
  vi: 'Thứ bạn lấy được từ những kẻ bạn giết chính là hơi nóng trong chúng. Nó mua cho bạn sinh lực, sức bền, sức mạnh. Tất cả đều được mồi từ một nơi, và bạn đang mang chúng ngược lên núi.',
});
note('coming-back', { felled: ['the-watchman'] }, {
  en: 'You die and you are at a fire again. Nobody carried you. Fire is where you were made, and a thing goes back to where it was made.',
  vi: 'Bạn chết đi rồi lại thấy mình bên một bếp lửa. Chẳng ai khiêng bạn về. Lửa là nơi bạn được tạo ra, và một vật thì quay về nơi nó được tạo ra.',
});
note('the-same-roll', { seen: ['cinder-gate'] }, {
  en: 'The shade rolled when you would have rolled. Not because it is copying you. Because it came off the same rack.',
  vi: 'Con Bóng lăn đúng lúc bạn cũng sẽ lăn. Không phải vì nó bắt chước bạn. Mà vì nó ra từ cùng một giá khuôn.',
});
note('third-shelf', { seen: ['kiln'] }, {
  en: 'The mould racks are shelved by shape and labelled. Third shelf, near the end, there is one you do not have to read the label of.',
  vi: 'Giá khuôn xếp theo hình dáng và có dán nhãn. Kệ thứ ba, gần cuối, có một cái mà bạn không cần đọc nhãn cũng biết.',
});
note('fired-not-forged', { seen: ['kiln'], holds: ['the-standing-blade'] }, {
  en: 'The sword was fired, not forged. So were you. The air left in a body is what breaks it in the fire, which is why you were wedged first, and why you do not remember that either.',
  vi: 'Cây kiếm được nung ra, không phải rèn ra. Bạn cũng vậy. Khí còn sót trong một cái thân là thứ làm nó vỡ khi gặp lửa, nên bạn đã bị nhồi cho hết khí trước, và đó cũng là điều bạn không nhớ.',
});
note('what-you-are-for', { felled: ['the-gardener', 'the-hourwright'] }, {
  en: 'You were poured on the wrong hour, like everything else made since the clock drifted. Nobody sent you. The kiln simply had a shape on the rack and the schedule said now.',
  vi: 'Bạn được rót ra vào một giờ sai, như mọi thứ khác được làm ra từ khi đồng hồ chạy lệch. Không ai phái bạn đi cả. Chỉ đơn giản là trên giá lò có một cái khuôn, và lịch trình bảo rằng bây giờ.',
});
note('the-one-holding-it', { felled: ['the-lantern-warden'] }, {
  en: 'It was made the same way, on an earlier hour, and it came up the same stair. It fought you one-handed because it was already doing the job you have come to take.',
  vi: 'Nó cũng được làm ra như vậy, vào một giờ sớm hơn, và nó cũng leo lên chính cầu thang này. Nó đánh bạn bằng một tay vì nó đang làm sẵn cái công việc mà bạn tới để giành lấy.',
});
note('the-worn-spot', { felled: ['the-lantern-warden'], holds: ['the-open-lantern'] }, {
  en: 'You are standing in the hollow on the step and your feet fit it. Of course they fit it. Everyone who ever stood here came off the same shelf.',
  vi: 'Bạn đang đứng vào chỗ lõm trên bậc thềm và bàn chân bạn vừa khít. Dĩ nhiên là vừa khít. Ai từng đứng đây cũng ra từ cùng một kệ khuôn.',
});

export const SELF = self;

const met = (when, world) =>
  (when.felled || []).every((b) => world.felled.includes(b)) &&
  (when.seen || []).every((a) => world.seen.some((id) => id.startsWith(`${a}:`))) &&
  (when.holds || []).every((w) => (world.holds || []).includes(w)) &&
  (when.fires === undefined ||
    world.seen.filter((id) => FIRES.includes(id)).length >= when.fires);

/** What you have worked out about yourself, in the order it becomes knowable. */
export const selfSoFar = (world) => SELF.filter((n) => met(n.when, world));

/** Whether an age's evidence is a place, a boss or a thing you can hold. */
export function evidenceKind(id) {
  if (AREAS.some((a) => a.id === id)) return 'area';
  if (BOSS_IDS.includes(id)) return 'boss';
  if (WEAPONS[id]) return 'weapon';
  return null;
}

/** The room the sixth age points at, so the claim can be checked, not trusted. */
export const mouldRacks = () => ROOMS.find((r) => r.name && r.name.en === 'The Mould Racks');

/** The fire you start at. The character notes lean on this being real. */
export const firstFire = () => START;
