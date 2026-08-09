// A hundred and fifty things to hit with.
//
// The unit of design here is the class, not the weapon. Fifteen classes,
// each with its own frames, reach, stamina cost and poise damage — that is
// what the hands feel. The hundred and fifty are what the world offers: a
// name, a sentence, a maker, and a tier that scales the class it belongs to.
//
// The claim this file has to defend is that no class is a strictly worse
// version of another one. That is the failure mode of every big weapon list
// ever shipped: forty entries, six of them viable. `tests/arms.test.js`
// checks it as Pareto dominance across damage, reach, poise damage, speed,
// recovery and stamina, for all two hundred and ten class pairs. If someone
// tunes a class into pointlessness, the test says so before a player does.
//
// Every weapon also names where it comes from, and that name has to resolve
// to a real area or a real boss on the real map. Loot that comes from
// nowhere is how a world stops being one place.

import { AREAS } from './world.js';
import { BOSS_IDS } from './bosses.js';

/**
 * `windup`/`recover` are seconds, `reach` is arena units, `stamina` is per
 * swing, `poise` is what it does to a foe's stagger meter. Damage is at
 * tier 0; tier scales it.
 */
const CLASSES = [
  { id: 'fist', damage: 9, windup: 0.16, active: 0.08, recover: 0.2, reach: 40, stamina: 6, poise: 4 },
  { id: 'dagger', damage: 12, windup: 0.18, active: 0.08, recover: 0.24, reach: 62, stamina: 8, poise: 5 },
  { id: 'rapier', damage: 16, windup: 0.22, active: 0.1, recover: 0.3, reach: 118, stamina: 11, poise: 6 },
  { id: 'twinblade', damage: 15, windup: 0.24, active: 0.18, recover: 0.44, reach: 92, stamina: 16, poise: 11 },
  // Retuned once, after measuring it. At 0.26/0.34/13 it was undominated but
  // never the best answer under any weighting of the six axes — a sample of
  // 200,000 random priorities picked it zero times. That is the quiet version
  // of a dead class. Its written identity is cheap and quick at real reach,
  // so the numbers now say that too.
  { id: 'curved-sword', damage: 18, windup: 0.24, active: 0.11, recover: 0.28, reach: 96, stamina: 11, poise: 9 },
  { id: 'straight-sword', damage: 20, windup: 0.28, active: 0.12, recover: 0.36, reach: 104, stamina: 14, poise: 14 },
  { id: 'flame-tool', damage: 21, windup: 0.3, active: 0.14, recover: 0.42, reach: 74, stamina: 14, poise: 8, burns: true },
  { id: 'spear', damage: 19, windup: 0.32, active: 0.1, recover: 0.4, reach: 148, stamina: 15, poise: 12 },
  { id: 'whip', damage: 13, windup: 0.34, active: 0.16, recover: 0.52, reach: 178, stamina: 17, poise: 3 },
  { id: 'axe', damage: 25, windup: 0.36, active: 0.13, recover: 0.46, reach: 92, stamina: 18, poise: 22 },
  { id: 'mace', damage: 26, windup: 0.38, active: 0.12, recover: 0.48, reach: 86, stamina: 19, poise: 28 },
  { id: 'halberd', damage: 27, windup: 0.44, active: 0.16, recover: 0.56, reach: 156, stamina: 22, poise: 24 },
  { id: 'greatsword', damage: 34, windup: 0.52, active: 0.16, recover: 0.66, reach: 130, stamina: 26, poise: 32 },
  { id: 'greataxe', damage: 40, windup: 0.6, active: 0.18, recover: 0.78, reach: 118, stamina: 30, poise: 38 },
  { id: 'great-hammer', damage: 44, windup: 0.66, active: 0.18, recover: 0.88, reach: 108, stamina: 33, poise: 48 },
];

/** What each class is, how it is held, and what it is honestly for. */
export const CLASS_LORE = {
  fist: {
    name: { en: 'Fists', vi: 'Nắm Đấm' },
    line: {
      en: 'What you have when you have nothing. It is not a joke — it costs almost no stamina, so it never runs out.',
      vi: 'Thứ bạn còn khi chẳng còn gì. Không phải trò đùa — nó gần như không tốn thể lực, nên không bao giờ cạn.',
    },
    feel: {
      en: 'You have to be close enough to be hit to be close enough to hit. Everything is decided inside one roll.',
      vi: 'Muốn đấm tới thì phải đứng đủ gần để bị đánh trúng. Mọi thứ được quyết trong đúng một cú lăn.',
    },
    against: {
      en: 'Fast light things you can out-tempo. Nothing armoured, ever.',
      vi: 'Những thứ nhẹ và nhanh mà bạn ép được nhịp. Đừng bao giờ dùng với thứ có giáp.',
    },
  },
  dagger: {
    name: { en: 'Dagger', vi: 'Dao Găm' },
    line: {
      en: 'Two hits in the time anything else takes for one, and you need all of them.',
      vi: 'Hai nhát trong khoảng thời gian thứ khác chỉ ra được một, và bạn cần cả hai nhát đó.',
    },
    feel: {
      en: 'The only class whose recovery is short enough to change your mind halfway through a fight.',
      vi: 'Lớp vũ khí duy nhất có thời gian thu đòn đủ ngắn để bạn đổi ý giữa chừng một pha giao tranh.',
    },
    against: {
      en: 'Anything with a long wind-up, because you get in and out inside it.',
      vi: 'Bất cứ thứ gì lấy đà lâu, vì bạn vào ra gọn trong khoảng lấy đà đó.',
    },
  },
  rapier: {
    name: { en: 'Thrusting Sword', vi: 'Kiếm Đâm' },
    line: {
      en: 'Long for how quick it is, and it buys that with never once knocking anything off balance.',
      vi: 'Dài so với độ nhanh của nó, và cái giá phải trả là chưa một lần làm thứ gì mất thăng bằng.',
    },
    feel: {
      en: 'A poking distance that nothing else has. You will win on points and never on force.',
      vi: 'Một tầm đâm mà không lớp nào khác có. Bạn thắng bằng điểm số, không bao giờ thắng bằng sức.',
    },
    against: {
      en: 'Unarmoured things that come to you. Useless against anything you need to stagger.',
      vi: 'Những thứ không giáp tự lao tới. Vô dụng với bất cứ thứ gì bạn cần làm cho choáng.',
    },
  },
  twinblade: {
    name: { en: 'Twinblade', vi: 'Song Đao' },
    line: {
      en: 'Two edges on one commitment. The swing is long because it is two swings wearing one coat.',
      vi: 'Hai lưỡi trên cùng một lần ra đòn. Cú vung dài vì thực ra là hai cú vung khoác chung một áo.',
    },
    feel: {
      en: 'It hits twice, so half-dodging it is worse than not dodging it. That applies to you too.',
      vi: 'Nó chém hai lần, nên né nửa vời còn tệ hơn không né. Điều đó cũng đúng với chính bạn.',
    },
    against: {
      en: 'Crowds, and anything whose poise breaks on the second hit rather than the first.',
      vi: 'Đám đông, và bất cứ thứ gì vỡ thăng bằng ở nhát thứ hai chứ không phải nhát đầu.',
    },
  },
  'curved-sword': {
    name: { en: 'Curved Sword', vi: 'Kiếm Cong' },
    line: {
      en: 'It cuts on the draw rather than on the impact, which is why it is fast and why it is shallow.',
      vi: 'Nó cắt lúc rút chứ không phải lúc chạm, nên nó nhanh, và cũng nên nó nông.',
    },
    feel: {
      en: 'The most forgiving fast class: enough reach to matter, enough recovery to survive a mistake.',
      vi: 'Lớp nhanh dễ tha thứ nhất: đủ tầm để có ý nghĩa, đủ thời gian thu đòn để sống sót sau một sai lầm.',
    },
    against: {
      en: 'Everything early, honestly. It stops scaling around the time armour starts.',
      vi: 'Thành thật thì là mọi thứ ở đoạn đầu. Nó ngừng theo kịp đúng lúc giáp bắt đầu xuất hiện.',
    },
  },
  'straight-sword': {
    name: { en: 'Straight Sword', vi: 'Kiếm Thẳng' },
    line: {
      en: 'Nothing is best about it, so nothing is wrong with it either. Most people finish the game holding one.',
      vi: 'Chẳng có gì nó giỏi nhất, nên cũng chẳng có gì nó dở. Phần lớn người chơi kết thúc trò chơi với một cây như vậy.',
    },
    feel: {
      en: 'The class the fight was tuned around. Every boss window fits a straight sword swing with room left over.',
      vi: 'Lớp mà trận đánh được cân bằng dựa theo. Mọi khe hở của boss đều vừa một nhát kiếm thẳng và còn thừa chỗ.',
    },
    against: {
      en: 'Everything, adequately. That is the whole pitch and it is a real one.',
      vi: 'Mọi thứ, ở mức vừa đủ. Đó là toàn bộ lời chào hàng, và nó là thật.',
    },
  },
  'flame-tool': {
    name: { en: 'Flame Tool', vi: 'Đồ Lửa' },
    line: {
      en: 'Short, hot, and it keeps hurting after it lands. Everything that carries one was lit at the lantern.',
      vi: 'Ngắn, nóng, và còn gây đau sau khi đã trúng. Mọi thứ mang nó đều được mồi từ cây đèn.',
    },
    feel: {
      en: 'You trade reach for damage that arrives twice. In the dark it also shows you the room.',
      vi: 'Bạn đổi tầm với lấy sát thương đến hai lần. Trong bóng tối nó còn soi rõ căn phòng cho bạn.',
    },
    against: {
      en: 'Anything made of wood, cloth or bone, which is more of this world than you would expect.',
      vi: 'Bất cứ thứ gì làm bằng gỗ, vải hay xương, vốn chiếm phần lớn thế giới này hơn bạn tưởng.',
    },
  },
  spear: {
    name: { en: 'Spear', vi: 'Giáo' },
    line: {
      en: 'It settles the argument about distance before the argument starts.',
      vi: 'Nó giải quyết xong tranh cãi về khoảng cách trước cả khi tranh cãi bắt đầu.',
    },
    feel: {
      en: 'A straight line and nothing else. Anything that gets past the point has already won.',
      vi: 'Một đường thẳng, không có gì khác. Thứ gì lách qua được mũi giáo là đã thắng rồi.',
    },
    against: {
      en: 'Everything that has to come to you. Bad in a corridor full of things that already have.',
      vi: 'Mọi thứ buộc phải tiến tới chỗ bạn. Dở tệ trong hành lang đầy những thứ đã tiến tới rồi.',
    },
  },
  whip: {
    name: { en: 'Whip', vi: 'Roi' },
    line: {
      en: 'The longest reach in the world and it will not stagger a bird. It is a leash, not a weapon.',
      vi: 'Tầm với dài nhất thế giới mà không làm nổi con chim mất thăng bằng. Nó là sợi dây dắt, không phải vũ khí.',
    },
    feel: {
      en: 'You are never where the fight is, which is either the whole point or the whole problem.',
      vi: 'Bạn không bao giờ đứng ở chỗ trận đánh đang diễn ra, đó vừa là toàn bộ ý đồ vừa là toàn bộ vấn đề.',
    },
    against: {
      en: 'Fast fragile things you can keep off you forever. Nothing that shrugs.',
      vi: 'Những thứ nhanh và giòn mà bạn có thể giữ ngoài tầm mãi. Không dùng được với thứ chịu đòn giỏi.',
    },
  },
  axe: {
    name: { en: 'Axe', vi: 'Rìu' },
    line: {
      en: 'The first class that makes things stop what they are doing. That is worth more than the damage.',
      vi: 'Lớp đầu tiên khiến mọi thứ phải ngưng việc đang làm. Điều đó đáng giá hơn cả sát thương.',
    },
    feel: {
      en: 'Heavy enough to matter, light enough to carry the whole game without changing how you fight.',
      vi: 'Đủ nặng để có sức, đủ nhẹ để mang suốt cả trò chơi mà không phải đổi lối đánh.',
    },
    against: {
      en: 'Anything you want to interrupt. It is the cheapest way to buy a turn.',
      vi: 'Bất cứ thứ gì bạn muốn cắt đòn. Đây là cách rẻ nhất để mua lấy một lượt.',
    },
  },
  mace: {
    name: { en: 'Mace', vi: 'Chuỳ' },
    line: {
      en: 'It does not care what the armour is made of, because it was never planning to get through it.',
      vi: 'Nó không quan tâm bộ giáp làm bằng gì, vì ngay từ đầu nó đã không định xuyên qua.',
    },
    feel: {
      en: 'Short and blunt and it lands like an argument you cannot answer.',
      vi: 'Ngắn, cùn, và nó giáng xuống như một lý lẽ bạn không cãi lại được.',
    },
    against: {
      en: 'The stonemask, the warder, the ironclad, and every wall of plate the deep half of the map is made of.',
      vi: 'Mặt Nạ Đá, Người Canh, Giáp Sắt, và mọi bức tường giáp tấm dựng nên nửa sâu của bản đồ.',
    },
  },
  halberd: {
    name: { en: 'Halberd', vi: 'Kích' },
    line: {
      en: 'Reach and weight in one shaft, paid for in the longest recovery any one-handed thing has.',
      vi: 'Tầm với và sức nặng trên cùng một cán, trả giá bằng thời gian thu đòn dài nhất trong các thứ cầm một tay.',
    },
    feel: {
      en: 'You commit early and from far away. When it is right it is the best feeling in the game.',
      vi: 'Bạn ra quyết định sớm và từ rất xa. Khi đúng, đó là cảm giác đã nhất trong cả trò chơi.',
    },
    against: {
      en: 'Anything big and slow, which is most of what stands between you and the last two areas.',
      vi: 'Bất cứ thứ gì to và chậm, tức phần lớn những gì đứng giữa bạn và hai khu cuối.',
    },
  },
  greatsword: {
    name: { en: 'Greatsword', vi: 'Đại Kiếm' },
    line: {
      en: 'Long and heavy at once, which nothing else manages. You give up the ability to be careful.',
      vi: 'Vừa dài vừa nặng cùng lúc, điều không lớp nào khác làm được. Cái bạn từ bỏ là khả năng đánh cẩn thận.',
    },
    feel: {
      en: 'Every swing is a decision about the next second and a half. Change your mind and you die.',
      vi: 'Mỗi nhát vung là một quyết định về một giây rưỡi kế tiếp. Đổi ý giữa chừng là chết.',
    },
    against: {
      en: 'Crowds, because it does not stop at the first thing it meets.',
      vi: 'Đám đông, vì nó không dừng lại ở thứ đầu tiên nó chạm phải.',
    },
  },
  greataxe: {
    name: { en: 'Greataxe', vi: 'Đại Rìu' },
    line: {
      en: 'Less reach than the greatsword and more of everything else. It is the honest heavy class.',
      vi: 'Tầm ngắn hơn Đại Kiếm và hơn ở mọi thứ còn lại. Đây là lớp hạng nặng thành thật nhất.',
    },
    feel: {
      en: 'Two swings per stamina bar. Make both of them count or go and sit down.',
      vi: 'Hai nhát mỗi thanh thể lực. Làm cả hai nhát đáng giá, không thì ngồi xuống nghỉ đi.',
    },
    against: {
      en: 'Anything you are willing to trade a full health bar to delete.',
      vi: 'Bất cứ thứ gì bạn sẵn sàng đổi trọn một thanh máu để xoá sổ.',
    },
  },
  'great-hammer': {
    name: { en: 'Great Hammer', vi: 'Đại Chuỳ' },
    line: {
      en: 'The slowest thing you can hold and the only thing that staggers a colossus.',
      vi: 'Thứ chậm nhất bạn có thể cầm, và là thứ duy nhất làm Khổng Lồ mất thăng bằng.',
    },
    feel: {
      en: 'You are not fighting the boss, you are scheduling one hit per opening and living around it.',
      vi: 'Bạn không đang đánh boss, bạn đang xếp lịch mỗi khe hở một nhát và sống quanh cái lịch đó.',
    },
    against: {
      en: 'The five armoured families, and the four bosses nothing else can interrupt.',
      vi: 'Năm họ quái có giáp, và bốn con boss mà không gì khác cắt đòn nổi.',
    },
  },
};

const AREA_IDS = new Set(AREAS.map((a) => a.id));
const BOSS_SET = new Set(BOSS_IDS);

const list = [];
/** id, class, tier, where it comes from, name, one line. */
const w = (id, cls, tier, from, name, line) => list.push({ id, cls, tier, from, name, line });

// --- fists ----------------------------------------------------------------
w('bare-hands', 'fist', 0, 'undercroft',
  { en: 'Bare Hands', vi: 'Tay Không' },
  { en: 'You woke up with these. They have never once let you down and they have never once been enough.',
    vi: 'Bạn tỉnh dậy với hai thứ này. Chúng chưa một lần phụ bạn và cũng chưa một lần là đủ.' });
w('wrapped-knuckles', 'fist', 0, 'courtyard',
  { en: 'Wrapped Knuckles', vi: 'Nắm Tay Quấn Vải' },
  { en: 'Somebody tore a banner into strips and wound them tight. The colours are still readable.',
    vi: 'Ai đó xé một lá cờ thành từng dải rồi quấn thật chặt. Màu cờ vẫn còn đọc ra được.' });
w('quarry-grips', 'fist', 1, 'cistern',
  { en: 'Quarry Grips', vi: 'Găng Thợ Đá' },
  { en: 'Leather palms worn to the shape of a chisel that is not in them any more.',
    vi: 'Lòng găng da mòn theo đúng hình cái đục, mà cái đục thì không còn ở đó nữa.' });
w('bellringers-grips', 'fist', 2, 'bellfry',
  { en: "Bellringer's Grips", vi: 'Găng Người Kéo Chuông' },
  { en: 'Built to hold a rope going up as hard as a rope going down.',
    vi: 'Làm ra để giữ sợi dây lúc kéo lên chắc như lúc thả xuống.' });
w('gravediggers-mitts', 'fist', 3, 'catacombs',
  { en: "Gravedigger's Mitts", vi: 'Găng Phu Đào Huyệt' },
  { en: 'Stiff with what they have been dipped in, which was not water.',
    vi: 'Cứng đờ vì thứ chúng từng nhúng vào, và đó không phải nước.' });
w('vault-clasps', 'fist', 4, 'deep-vault',
  { en: 'Vault Clasps', vi: 'Khoá Tay Hầm Kín' },
  { en: 'Iron rings across the knuckles, taken off a door rather than made for a hand.',
    vi: 'Những vòng sắt bắc ngang đốt tay, tháo từ một cánh cửa chứ không phải làm cho bàn tay.' });
w('tongsmans-hold', 'fist', 5, 'forge',
  { en: "Tongsman's Hold", vi: 'Găng Kẹp Lò' },
  { en: 'You can pick up something orange with these. Briefly.',
    vi: 'Đeo cái này thì nhặt được vật đang đỏ rực. Trong chốc lát.' });
w('drowned-fists', 'fist', 6, 'drowned-city',
  { en: 'Drowned Fists', vi: 'Nắm Đấm Chết Đuối' },
  { en: 'Swollen leather that never dried and now never will. Heavier wet, and it is always wet.',
    vi: 'Da phồng nước chưa từng khô và sẽ không bao giờ khô. Ướt thì nặng hơn, mà nó thì luôn ướt.' });
w('ember-gauntlets', 'fist', 7, 'the-ember-knight',
  { en: 'Ember Gauntlets', vi: 'Găng Than Hồng' },
  { en: 'The only pieces of that armour small enough to close. There is still something moving inside.',
    vi: 'Là mảnh duy nhất của bộ giáp ấy đủ nhỏ để khép lại. Bên trong vẫn còn thứ gì đó động đậy.' });
w('the-free-hand', 'fist', 7, 'the-lantern-warden',
  { en: 'The Free Hand', vi: 'Bàn Tay Rảnh' },
  { en: 'The one it was not using. It fought you the whole way with this hand doing nothing.',
    vi: 'Bàn tay nó không dùng đến. Suốt trận nó đánh bạn trong khi bàn tay này chẳng làm gì cả.' });

// --- daggers --------------------------------------------------------------
w('kitchen-knife', 'dagger', 0, 'undercroft',
  { en: 'Kitchen Knife', vi: 'Con Dao Bếp' },
  { en: 'Sharpened so many times the blade has gone narrow. Somebody down here was still cooking.',
    vi: 'Mài nhiều lần đến mức lưỡi đã hẹp lại. Ở dưới này từng có người vẫn còn nấu ăn.' });
w('bread-knife', 'dagger', 0, 'courtyard',
  { en: 'Bread Knife', vi: 'Dao Cắt Bánh' },
  { en: 'Serrated, which turns out to matter, and nobody is more surprised about that than you.',
    vi: 'Lưỡi răng cưa, hoá ra lại có tác dụng, và không ai ngạc nhiên về điều đó hơn bạn.' });
w('votive-pin', 'dagger', 1, 'chapelyard',
  { en: 'Votive Pin', vi: 'Trâm Dâng Lễ' },
  { en: 'Left in a wall by someone making a promise. The wall kept it and the promise did not.',
    vi: 'Ai đó cắm vào tường khi hứa một điều. Bức tường giữ lời, còn lời hứa thì không.' });
w('rib-splitter', 'dagger', 2, 'ossuary',
  { en: 'Rib Splitter', vi: 'Dao Tách Sườn' },
  { en: 'A tool for stacking, not for fighting. The stacks are very neat and this is why.',
    vi: 'Dụng cụ để xếp, không phải để đánh. Những chồng xương rất ngay ngắn, và đây là lý do.' });
w('grafting-knife', 'dagger', 3, 'bone-orchard',
  { en: 'Grafting Knife', vi: 'Dao Ghép Cành' },
  { en: 'Ground on one side only, for a cut that has to heal. She will want it back.',
    vi: 'Chỉ mài một mặt, để vết cắt còn liền lại được. Bà ta sẽ đòi lại nó.' });
w('lens-scribe', 'dagger', 4, 'observatory',
  { en: 'Lens Scribe', vi: 'Bút Khắc Kính' },
  { en: 'For scoring glass. It scores most other things too, and everyone found that out late.',
    vi: 'Dùng để vạch kính. Nó vạch được hầu hết thứ khác nữa, và ai cũng phát hiện ra điều đó quá muộn.' });
w('the-thin-key', 'dagger', 5, 'vault-of-hours',
  { en: 'The Thin Key', vi: 'Chiếc Chìa Mỏng' },
  { en: 'It opens nothing. It was filed down from something that did, by somebody in a hurry.',
    vi: 'Nó không mở được gì. Nó được giũa mỏng ra từ một chiếc chìa từng mở được, bởi một người đang vội.' });
w('escapement-tooth', 'dagger', 6, 'clockwork',
  { en: 'Escapement Tooth', vi: 'Răng Bộ Hồi' },
  { en: 'One tooth off the wheel that decides when. Holding it, you can feel it wanting the beat.',
    vi: 'Một chiếc răng gỡ từ bánh xe quyết định thời khắc. Cầm nó, bạn cảm được nó đang đòi đúng nhịp.' });
w('mothcutter', 'dagger', 6, 'winding-stair',
  { en: 'Mothcutter', vi: 'Dao Cắt Bướm' },
  { en: 'Someone stood on that stair for a season killing them one at a time. This is what they used.',
    vi: 'Có người đứng trên cầu thang ấy suốt một mùa, giết từng con một. Đây là thứ họ đã dùng.' });
w('the-shears-half', 'dagger', 7, 'the-gardener',
  { en: 'Half the Shears', vi: 'Nửa Cây Kéo' },
  { en: 'One blade of the pair, still with its pivot hole. The other half is on its peg now.',
    vi: 'Một lưỡi trong cặp, lỗ chốt vẫn còn đó. Nửa còn lại giờ đã nằm trên cái đinh của nó.' });

// --- thrusting swords -----------------------------------------------------
w('surveyors-rod', 'rapier', 0, 'gatehouse',
  { en: "Surveyor's Rod", vi: 'Thước Đo Đất' },
  { en: 'Marked in units nobody uses now. It measures reach very accurately, one body at a time.',
    vi: 'Khắc theo đơn vị giờ không ai dùng nữa. Nó đo tầm với rất chính xác, mỗi lần một cái xác.' });
w('court-rapier', 'rapier', 1, 'upper-ward',
  { en: 'Court Rapier', vi: 'Kiếm Đâm Cung Đình' },
  { en: 'Worn indoors, by people who were never going to need it, right up until they did.',
    vi: 'Đeo trong nhà, bởi những người vốn chẳng bao giờ cần đến nó, cho tới đúng lúc họ cần.' });
w('bodkin', 'rapier', 2, 'ramparts',
  { en: 'Bodkin', vi: 'Mũi Xuyên' },
  { en: 'Made to go through mail and nothing else. Against cloth it is a very long needle.',
    vi: 'Làm ra để xuyên giáp lưới và không gì khác. Với vải thì nó chỉ là một cây kim rất dài.' });
w('estoc-of-the-aviary', 'rapier', 3, 'aviary',
  { en: 'Estoc of the Aviary', vi: 'Kiếm Đâm Nhà Chim' },
  { en: 'Kept beside the cages for reaching in. The cages are open and it is still here.',
    vi: 'Để cạnh lồng chim để thò vào bên trong. Lồng đã mở, mà nó thì vẫn còn đây.' });
w('tide-needle', 'rapier', 4, 'sunken-road',
  { en: 'Tide Needle', vi: 'Kim Con Nước' },
  { en: 'Thin enough that the water never got a grip on it. Everything else on that road rusted.',
    vi: 'Mảnh đến mức nước không bám nổi. Mọi thứ khác trên con đường đó đều đã gỉ.' });
w('parallax', 'rapier', 5, 'the-astronomer',
  { en: 'Parallax', vi: 'Thị Sai' },
  { en: 'It is not quite where you think it is. Neither was he, and he built it that way on purpose.',
    vi: 'Nó không hẳn ở chỗ bạn nghĩ. Ông ta cũng vậy, và ông cố ý chế nó như thế.' });
w('hour-pin', 'rapier', 6, 'vault-of-hours',
  { en: 'Hour Pin', vi: 'Kim Giờ' },
  { en: 'The long hand off something enormous. It still points, and it is not pointing at you.',
    vi: 'Chiếc kim dài gỡ từ một cỗ máy khổng lồ. Nó vẫn chỉ, và nó không chỉ vào bạn.' });
w('glass-tongue', 'rapier', 7, 'star-well',
  { en: 'Glass Tongue', vi: 'Lưỡi Kính' },
  { en: 'Drawn out of the well floor in one piece by heat that has not been explained.',
    vi: 'Được kéo lên nguyên một mảnh từ đáy giếng bởi một nguồn nhiệt chưa ai giải thích được.' });
w('the-quill', 'rapier', 7, 'observatory',
  { en: 'The Quill', vi: 'Cây Bút Lông' },
  { en: 'Sharp enough to write with and sharp enough not to. He used it for both.',
    vi: 'Nhọn đủ để viết và nhọn đủ để không chỉ viết. Ông ta dùng nó cho cả hai việc.' });
w('the-last-reading', 'rapier', 7, 'the-astronomer',
  { en: 'The Last Reading', vi: 'Số Đo Cuối' },
  { en: 'An instrument arm, snapped off still pointing at a place in the sky. It has not moved since.',
    vi: 'Một cánh tay khí cụ, gãy rời trong lúc vẫn chỉ về một điểm trên trời. Từ đó nó không nhúc nhích.' });

// --- twinblades -----------------------------------------------------------
w('shearing-pair', 'twinblade', 1, 'chapelyard',
  { en: 'Shearing Pair', vi: 'Cặp Lưỡi Xén' },
  { en: 'Two hedge blades bolted back to back by someone who had thought about it.',
    vi: 'Hai lưỡi xén hàng rào bắt ngược lưng nhau, bởi một người đã suy tính kỹ.' });
w('oar-and-oar', 'twinblade', 2, 'cistern',
  { en: 'Oar and Oar', vi: 'Mái Chèo Đôi' },
  { en: 'It was a boat once, briefly, and then it was not needed as a boat.',
    vi: 'Từng là một chiếc thuyền, trong chốc lát, rồi người ta không cần nó làm thuyền nữa.' });
w('splitfang', 'twinblade', 3, 'catacombs',
  { en: 'Splitfang', vi: 'Nanh Chẻ' },
  { en: 'Grown, not forged, and grown in two directions from one root.',
    vi: 'Mọc ra chứ không rèn ra, và mọc theo hai hướng từ cùng một gốc.' });
w('the-cull', 'twinblade', 4, 'pale-wood',
  { en: 'The Cull', vi: 'Nhát Tỉa' },
  { en: 'For thinning a stand of trees fast. It thins other things fast too.',
    vi: 'Dùng để tỉa bớt một vạt cây thật nhanh. Nó tỉa những thứ khác cũng nhanh không kém.' });
w('two-verses', 'twinblade', 5, 'the-chanter',
  { en: 'Two Verses', vi: 'Hai Đoạn Tụng' },
  { en: 'Back to back, no breath between them. She fought the same way she sang.',
    vi: 'Nối liền nhau, không lấy hơi ở giữa. Bà đánh đúng như cách bà tụng.' });
w('mirror-pair', 'twinblade', 5, 'solarium',
  { en: 'Mirror Pair', vi: 'Cặp Gương' },
  { en: 'Polished on both faces so it throws light into your own eyes half the time.',
    vi: 'Đánh bóng cả hai mặt nên nửa số lần nó hắt sáng vào chính mắt bạn.' });
w('root-and-branch', 'twinblade', 6, 'root-deep',
  { en: 'Root and Branch', vi: 'Rễ Và Cành' },
  { en: 'The same piece of wood, above and below, and it was never cut apart.',
    vi: 'Cùng một khúc gỗ, phần trên và phần dưới, và chưa bao giờ bị chẻ ra.' });
w('crossbeat', 'twinblade', 7, 'clockwork',
  { en: 'Crossbeat', vi: 'Nhịp Chéo' },
  { en: 'Two arms on one pivot, timed so that neither is ever still. It is exhausting to hold.',
    vi: 'Hai cánh trên một trục, canh giờ sao cho không cánh nào đứng yên. Cầm nó rất mỏi.' });
w('the-twins-halves', 'twinblade', 7, 'the-crucible-twins',
  { en: "The Twins' Halves", vi: 'Hai Nửa Song Sinh' },
  { en: 'One from each. You still cannot tell which was the fire and which was the vessel.',
    vi: 'Mỗi đứa một nửa. Bạn vẫn không phân được đứa nào là lửa và đứa nào là vại.' });
w('the-espalier', 'twinblade', 6, 'bone-orchard',
  { en: 'The Espalier', vi: 'Giàn Ép' },
  { en: 'Trained flat against a wall with wire until it grew into this shape and kept it.',
    vi: 'Bị uốn ép sát tường bằng dây thép cho tới khi mọc thành hình này và giữ nguyên như vậy.' });

// --- curved swords --------------------------------------------------------
w('reapers-hook', 'curved-sword', 0, 'courtyard',
  { en: "Reaper's Hook", vi: 'Liềm Gặt' },
  { en: 'The last harvest was brought in. Nobody has said what happened to the people who brought it.',
    vi: 'Vụ mùa cuối đã gặt xong. Chưa ai nói chuyện gì xảy ra với những người đã gặt nó.' });
w('drain-hook', 'curved-sword', 1, 'drainage',
  { en: 'Drain Hook', vi: 'Móc Cống' },
  { en: 'For pulling things out of a channel without going in after them.',
    vi: 'Dùng để kéo đồ ra khỏi rãnh mà không phải lội xuống theo.' });
w('sicklewing', 'curved-sword', 2, 'aviary',
  { en: 'Sicklewing', vi: 'Cánh Liềm' },
  { en: 'Named for the shape of a bird that used to live here and does not now.',
    vi: 'Đặt tên theo hình dáng một loài chim từng sống ở đây và giờ không còn.' });
w('marsh-knife', 'curved-sword', 3, 'marsh',
  { en: 'Marsh Knife', vi: 'Dao Đầm Lầy' },
  { en: 'Curved so it cuts reed on the pull. It works on most things on the pull.',
    vi: 'Cong để cắt sậy lúc kéo về. Kéo về thì nó cắt được gần như mọi thứ.' });
w('the-long-turn', 'curved-sword', 4, 'winding-stair',
  { en: 'The Long Turn', vi: 'Khúc Quanh Dài' },
  { en: 'Curved to the same radius as the stair. On the stair it never touches the wall.',
    vi: 'Cong đúng bằng bán kính cầu thang. Trên cầu thang nó không bao giờ chạm tường.' });
w('ashcutter', 'curved-sword', 5, 'ashlands',
  { en: 'Ashcutter', vi: 'Dao Rẽ Tro' },
  { en: 'It parts the fall in front of your face, which is worth more than the edge.',
    vi: 'Nó rẽ màn tro rơi trước mặt bạn, và điều đó đáng giá hơn cả lưỡi dao.' });
w('current', 'curved-sword', 6, 'drowned-city',
  { en: 'Current', vi: 'Dòng Chảy' },
  { en: 'Shaped by the water rather than for it. Nobody made this and it is very good.',
    vi: 'Được nước tạo hình chứ không phải làm ra để hợp với nước. Không ai chế ra nó, và nó rất tốt.' });
w('the-censer-chain', 'curved-sword', 6, 'the-chanter',
  { en: 'The Censer Chain', vi: 'Xích Bình Hương' },
  { en: 'Not a sword at all, but it swings wide and it comes round, and that is the whole class.',
    vi: 'Chẳng phải kiếm gì cả, nhưng nó quét rộng rồi vòng về, và đó đúng là cả lớp vũ khí này.' });
w('gutterline', 'curved-sword', 7, 'the-first-flame',
  { en: 'Gutterline', vi: 'Đường Lụi' },
  { en: 'It dims when you swing it and brightens when you stop. That is backwards and it is correct.',
    vi: 'Vung lên thì nó mờ đi, dừng lại thì nó sáng lên. Ngược đời, và đúng là như vậy.' });
w('the-shepherds-crook', 'curved-sword', 7, 'the-shepherd',
  { en: "The Shepherd's Crook", vi: 'Gậy Móc Người Chăn' },
  { en: 'It hooks before it cuts. You will find yourself herding things without deciding to.',
    vi: 'Nó móc trước rồi mới cắt. Bạn sẽ thấy mình đang lùa mọi thứ mà chẳng hề định làm vậy.' });

// --- straight swords ------------------------------------------------------
w('watch-sword', 'straight-sword', 0, 'courtyard',
  { en: 'Watch Sword', vi: 'Kiếm Lính Gác' },
  { en: 'Issued, not chosen. There were four hundred of these and they were all the same.',
    vi: 'Được cấp phát chứ không phải tự chọn. Có bốn trăm cây như thế này và cây nào cũng giống cây nào.' });
w('gate-sword', 'straight-sword', 1, 'gatehouse',
  { en: 'Gate Sword', vi: 'Kiếm Cửa Thành' },
  { en: 'Kept by the door for whoever was nearest. Nobody was nearest for a long time.',
    vi: 'Để cạnh cửa cho ai đứng gần nhất dùng. Đã lâu rồi không ai đứng gần nhất cả.' });
w('rampart-sword', 'straight-sword', 2, 'ramparts',
  { en: 'Rampart Sword', vi: 'Kiếm Tường Thành' },
  { en: 'Short in the blade because the wall is narrow. Everything up there was designed around the wall.',
    vi: 'Lưỡi ngắn vì mặt tường hẹp. Mọi thứ trên đó đều thiết kế theo bức tường.' });
w('the-relieved-blade', 'straight-sword', 2, 'the-watchman',
  { en: 'The Relieved Blade', vi: 'Lưỡi Kiếm Được Thay Ca' },
  { en: 'His. Nobody ever came to take the watch off him, so nobody ever took this either.',
    vi: 'Của ông ấy. Chưa ai từng đến thay ca cho ông, nên cũng chưa ai từng lấy cây này đi.' });
w('warders-sword', 'straight-sword', 3, 'upper-ward',
  { en: "Warder's Sword", vi: 'Kiếm Người Canh' },
  { en: 'Balanced to be held at rest for hours. It fights adequately and it waits beautifully.',
    vi: 'Cân bằng để cầm thủ thế hàng giờ. Nó đánh ở mức vừa đủ và chờ đợi thì tuyệt hảo.' });
w('the-plain-sword', 'straight-sword', 4, 'deep-vault',
  { en: 'The Plain Sword', vi: 'Cây Kiếm Trơn' },
  { en: 'No mark, no maker, no story. Locked in the deepest vault in the world for no stated reason.',
    vi: 'Không dấu, không tên thợ, không tích truyện. Bị khoá trong hầm sâu nhất thế giới mà chẳng nêu lý do.' });
w('forge-pattern', 'straight-sword', 5, 'forge',
  { en: 'Forge Pattern', vi: 'Kiếm Mẫu Lò Rèn' },
  { en: 'The one he kept on the wall to check the others against. It is better than all of them.',
    vi: 'Cây ông treo trên tường để đối chiếu với những cây khác. Nó tốt hơn tất cả những cây kia.' });
w('the-smiths-own', 'straight-sword', 6, 'the-smith',
  { en: "The Smith's Own", vi: 'Cây Của Thợ Rèn' },
  { en: 'He made most of what you are carrying. He carried this, and he would like it back.',
    vi: 'Ông làm ra phần lớn những gì bạn đang mang. Ông từng cầm cây này, và ông muốn đòi lại.' });
w('heartwood-sword', 'straight-sword', 7, 'heartwood',
  { en: 'Heartwood Sword', vi: 'Kiếm Lõi Gỗ' },
  { en: 'Cut from the dead centre of something enormous and living. It does not warp and it does not rot.',
    vi: 'Xẻ từ đúng lõi chết của một thứ khổng lồ đang sống. Nó không cong vênh và không mục.' });
w('the-standing-blade', 'straight-sword', 7, 'kiln',
  { en: 'The Standing Blade', vi: 'Lưỡi Kiếm Dựng' },
  { en: 'Fired, not forged. There is a mould for it on the racks, third shelf, still labelled.',
    vi: 'Được nung ra chứ không rèn ra. Trên giá vẫn còn khuôn của nó, kệ thứ ba, nhãn vẫn còn.' });

// --- flame tools ----------------------------------------------------------
w('rushlight', 'flame-tool', 0, 'undercroft',
  { en: 'Rushlight', vi: 'Bấc Cói' },
  { en: 'A reed dipped in fat. It burns for eleven minutes and you will learn to feel the tenth.',
    vi: 'Một cọng cói nhúng mỡ. Nó cháy được mười một phút và bạn sẽ học được cách cảm ra phút thứ mười.' });
w('pitch-brand', 'flame-tool', 1, 'drainage',
  { en: 'Pitch Brand', vi: 'Đuốc Nhựa Đường' },
  { en: 'It drips, and what it drips on keeps burning after you have walked away.',
    vi: 'Nó nhỏ giọt, và chỗ bị nhỏ vẫn cháy tiếp sau khi bạn đã bỏ đi.' });
w('censer', 'flame-tool', 2, 'chapelyard',
  { en: 'Censer', vi: 'Bình Hương' },
  { en: 'Swung on a chain to make a room holy. It does something else to a room now.',
    vi: 'Đung đưa trên dây xích để làm thánh hoá một căn phòng. Giờ nó làm chuyện khác với căn phòng.' });
w('signal-torch', 'flame-tool', 3, 'bellfry',
  { en: 'Signal Torch', vi: 'Đuốc Hiệu' },
  { en: 'One of the pair that used to answer the ramparts. The other one never lit again.',
    vi: 'Một trong cặp đuốc từng đáp lời tường thành. Cây còn lại không bao giờ cháy nữa.' });
w('kiln-rod', 'flame-tool', 4, 'kiln',
  { en: 'Kiln Rod', vi: 'Que Lò Nung' },
  { en: 'For reaching into the chamber without opening the door. It has been in there a long time.',
    vi: 'Dùng thò vào buồng nung mà không phải mở cửa. Nó đã nằm trong đó rất lâu.' });
w('quench-brand', 'flame-tool', 5, 'the-smith',
  { en: 'Quench Brand', vi: 'Đuốc Tôi Thép' },
  { en: 'Straight out of the trough, still steaming. It is hotter after the water, which should not work.',
    vi: 'Vừa nhấc khỏi máng tôi, còn bốc hơi. Sau khi nhúng nước nó lại nóng hơn, lẽ ra không thể như vậy.' });
w('slag-drip', 'flame-tool', 6, 'slag',
  { en: 'Slag Drip', vi: 'Giọt Xỉ' },
  { en: 'What ran off the tip and hardened around a stick. It is still orange in the middle.',
    vi: 'Thứ chảy xuống từ bãi đổ rồi đông lại quanh một khúc cây. Bên trong vẫn còn đỏ.' });
w('lamplighters-pole', 'flame-tool', 7, 'the-lantern',
  { en: "Lamplighter's Pole", vi: 'Sào Người Thắp Đèn' },
  { en: 'Long, light, and it has lit more fires in this world than everything else put together.',
    vi: 'Dài, nhẹ, và nó đã thắp nhiều lửa trong thế giới này hơn tất cả những thứ khác cộng lại.' });
w('the-open-lantern', 'flame-tool', 7, 'the-lantern-warden',
  { en: 'The Open Lantern', vi: 'Cây Đèn Mở' },
  { en: 'You are holding it now. Nobody said the carrier gets to put it down.',
    vi: 'Bây giờ bạn đang cầm nó. Không ai nói người cầm được phép đặt nó xuống.' });
w('a-piece-of-the-flame', 'flame-tool', 7, 'the-first-flame',
  { en: 'A Piece of the Flame', vi: 'Một Mảnh Ngọn Lửa' },
  { en: 'It is trying to go out in your hand. It has been trying for as long as there has been a world.',
    vi: 'Nó đang cố tắt đi ngay trong tay bạn. Nó đã cố như thế từ khi thế giới này có mặt.' });

// --- spears ---------------------------------------------------------------
w('pitchfork', 'spear', 0, 'courtyard',
  { en: 'Pitchfork', vi: 'Chĩa Rơm' },
  { en: 'Farm work. It has three points and only ever needed one.',
    vi: 'Đồ làm ruộng. Nó có ba mũi mà xưa nay chỉ cần dùng đúng một.' });
w('boat-pole', 'spear', 1, 'cistern',
  { en: 'Boat Pole', vi: 'Sào Chống Thuyền' },
  { en: 'Long enough to touch the bottom of the cistern. There is something down there it keeps touching.',
    vi: 'Dài đủ chạm đáy bể chứa. Dưới đó có thứ gì mà nó cứ chạm phải mãi.' });
w('watch-spear', 'spear', 2, 'ramparts',
  { en: 'Watch Spear', vi: 'Giáo Canh' },
  { en: 'Made for holding a doorway alone, which is the only situation where it is the best thing in the world.',
    vi: 'Làm ra để một mình giữ một lối cửa, tình huống duy nhất mà nó là thứ tốt nhất trên đời.' });
w('the-narrow-turn', 'spear', 3, 'winding-stair',
  { en: 'The Narrow Turn', vi: 'Khúc Quanh Hẹp' },
  { en: 'Taken off the thing that used that stair against you. It works exactly as well for you.',
    vi: 'Lấy từ chính con đã dùng cầu thang ấy để đối phó bạn. Trong tay bạn nó cũng hiệu quả y hệt.' });
w('reed-lance', 'spear', 4, 'marsh',
  { en: 'Reed Lance', vi: 'Thương Sậy' },
  { en: 'Light enough to carry through water all day. That is the entire design and it is a good one.',
    vi: 'Nhẹ đủ để vác lội nước cả ngày. Đó là toàn bộ thiết kế, và là một thiết kế tốt.' });
w('sceptre-of-the-court', 'spear', 5, 'the-drowned-king',
  { en: 'Sceptre of the Court', vi: 'Vương Trượng Triều Đình' },
  { en: 'It lifts one beat before it means anything. That was true when he held it too.',
    vi: 'Nó nhấc lên sớm một nhịp trước khi có ý nghĩa gì. Điều đó cũng đúng hồi ông ta còn cầm.' });
w('sounding-pole', 'spear', 6, 'drowned-city',
  { en: 'Sounding Pole', vi: 'Sào Dò Sâu' },
  { en: 'Marked in fathoms. Every mark on it is under water except the last one.',
    vi: 'Khắc vạch theo sải nước. Mọi vạch trên đó đều chìm dưới nước, trừ vạch cuối cùng.' });
w('transit-rod', 'spear', 7, 'star-well',
  { en: 'Transit Rod', vi: 'Sào Quá Cảnh' },
  { en: 'Set up to mark where a light crosses. It is very good at being exactly where something will be.',
    vi: 'Dựng lên để đánh dấu chỗ một tia sáng đi qua. Nó rất giỏi việc đứng đúng chỗ thứ gì đó sắp tới.' });
w('rootpike', 'spear', 7, 'root-deep',
  { en: 'Rootpike', vi: 'Thương Rễ' },
  { en: 'It grew straight for a hundred feet looking for a crack. It found one and kept going.',
    vi: 'Nó mọc thẳng suốt ba chục thước để tìm một khe nứt. Tìm được rồi nó vẫn mọc tiếp.' });
w('the-gardeners-dibber', 'spear', 6, 'the-gardener',
  { en: "The Gardener's Dibber", vi: 'Cọc Trồng Của Người Làm Vườn' },
  { en: 'For making a hole the right depth, every time, without measuring. She never measured.',
    vi: 'Dùng chọc lỗ đúng độ sâu, lần nào cũng vậy, mà không cần đo. Bà chưa bao giờ đo.' });

// --- whips ----------------------------------------------------------------
w('drovers-lash', 'whip', 0, 'courtyard',
  { en: "Drover's Lash", vi: 'Roi Lùa Gia Súc' },
  { en: 'It was never meant to hurt anything. It was meant to be heard.',
    vi: 'Nó chưa bao giờ nhằm làm đau thứ gì. Nó nhằm để được nghe thấy.' });
w('bell-rope', 'whip', 1, 'bellfry',
  { en: 'Bell Rope', vi: 'Dây Chuông' },
  { en: 'Cut down from the wheel. Somewhere above, the bell is still waiting to be told.',
    vi: 'Cắt xuống từ bánh xe kéo. Đâu đó phía trên, quả chuông vẫn đợi được bảo cho biết.' });
w('penance-cord', 'whip', 2, 'chapelyard',
  { en: 'Penance Cord', vi: 'Dây Sám Hối' },
  { en: 'Used on the person holding it, originally. The knots are on the wrong side for anything else.',
    vi: 'Ban đầu người ta dùng nó lên chính mình. Các nút thắt nằm sai phía nếu muốn dùng vào việc khác.' });
w('weed-line', 'whip', 3, 'marsh',
  { en: 'Weed Line', vi: 'Dây Rong' },
  { en: 'Grown, dried, and stronger than rope. The marsh made this without being asked.',
    vi: 'Mọc lên, phơi khô, và bền hơn thừng. Đầm lầy làm ra nó mà chẳng ai nhờ.' });
w('the-long-wire', 'whip', 4, 'bone-orchard',
  { en: 'The Long Wire', vi: 'Sợi Thép Dài' },
  { en: 'Off the espalier wall. It held a living thing flat against stone for sixty years.',
    vi: 'Gỡ từ bức tường giàn ép. Nó đã ép một sinh vật sống dí sát mặt đá suốt sáu mươi năm.' });
w('spirelash', 'whip', 5, 'spire',
  { en: 'Spirelash', vi: 'Roi Tháp' },
  { en: 'Long enough to reach two flights down. She used it that way and so will you.',
    vi: 'Dài đủ với xuống hai nhịp cầu thang. Bà đã dùng nó như vậy, và bạn cũng sẽ thế.' });
w('the-keepers-lash', 'whip', 6, 'the-keeper',
  { en: "The Keeper's Lash", vi: 'Roi Người Trông Coi' },
  { en: 'It comes twice. She never explained why and it does it anyway.',
    vi: 'Nó ra đòn hai lần. Bà chưa bao giờ giải thích tại sao, và nó vẫn cứ thế.' });
w('mainspring', 'whip', 7, 'the-hourwright',
  { en: 'Mainspring', vi: 'Dây Cót' },
  { en: 'Wound, then released across the floor. Holding it wound is the hard part.',
    vi: 'Lên cót, rồi bung ra chạy khắp sàn. Giữ cho nó cuộn mới là phần khó.' });
w('the-undertow', 'whip', 7, 'the-tide',
  { en: 'The Undertow', vi: 'Dòng Ngầm' },
  { en: 'It pulls before it hits. Everything the tide did, in something you can carry.',
    vi: 'Nó kéo trước rồi mới đánh. Tất cả những gì Con Nước làm, gói trong thứ bạn mang theo được.' });
w('hanging-root', 'whip', 6, 'hollow-tree',
  { en: 'Hanging Root', vi: 'Rễ Buông' },
  { en: 'Still alive at one end. Which end depends on the day.',
    vi: 'Một đầu vẫn còn sống. Đầu nào thì tuỳ hôm.' });

// --- axes -----------------------------------------------------------------
w('firewood-axe', 'axe', 0, 'undercroft',
  { en: 'Firewood Axe', vi: 'Rìu Bổ Củi' },
  { en: 'Somebody kept this building warm for a long time after there was nobody left to warm.',
    vi: 'Có người đã giữ ấm toà nhà này rất lâu sau khi chẳng còn ai để sưởi ấm cho.' });
w('sluice-axe', 'axe', 1, 'drainage',
  { en: 'Sluice Axe', vi: 'Rìu Cửa Cống' },
  { en: 'Hung by every gate in case a gate had to go. Two of them have been used.',
    vi: 'Treo cạnh mỗi cửa cống phòng khi phải phá cửa. Đã có hai cây được dùng tới.' });
w('boarding-axe', 'axe', 2, 'sunken-road',
  { en: 'Boarding Axe', vi: 'Rìu Leo Mạn' },
  { en: 'A spike on the back for climbing something that does not want you on it.',
    vi: 'Sống rìu có mũi nhọn để trèo lên thứ không muốn bạn trèo lên.' });
w('coffin-axe', 'axe', 3, 'catacombs',
  { en: 'Coffin Axe', vi: 'Rìu Phá Quan' },
  { en: 'Short haft, wide head, made for opening rather than closing. It has done a lot of opening.',
    vi: 'Cán ngắn, lưỡi bè, làm ra để mở chứ không phải để đóng. Nó đã mở rất nhiều.' });
w('the-wedge', 'axe', 4, 'winding-stair',
  { en: 'The Wedge', vi: 'Cái Chèn' },
  { en: 'It held the lower door open for years. The door will close now, behind you.',
    vi: 'Nó chèn cho cửa dưới mở suốt nhiều năm. Giờ cửa sẽ đóng lại, sau lưng bạn.' });
w('splitting-maul', 'axe', 5, 'pale-wood',
  { en: 'Splitting Maul', vi: 'Rìu Chẻ' },
  { en: 'For going with the grain. Everything in the pale wood has a grain and it all runs the same way.',
    vi: 'Dùng để bổ xuôi thớ. Mọi thứ trong Rừng Nhợt đều có thớ, và thớ nào cũng chạy cùng một hướng.' });
w('scab-axe', 'axe', 6, 'slag',
  { en: 'Scab Axe', vi: 'Rìu Cạy Vảy' },
  { en: 'For knocking the crust off something that is still hot underneath.',
    vi: 'Dùng để đập lớp vảy khỏi thứ bên dưới vẫn còn nóng.' });
w('the-uproot', 'axe', 7, 'the-gardener',
  { en: 'The Uproot', vi: 'Nhát Nhổ Rễ' },
  { en: 'She reached into the soil for something long. This was what she reached with.',
    vi: 'Bà thọc tay xuống đất tìm một thứ dài. Đây chính là thứ bà đã thọc xuống bằng nó.' });
w('crosscut', 'axe', 7, 'heartwood',
  { en: 'Crosscut', vi: 'Rìu Cắt Ngang' },
  { en: 'It goes against the grain on purpose. In the heartwood that is the only thing that works.',
    vi: 'Nó cố tình đi ngược thớ. Trong Lõi Gỗ, đó là cách duy nhất có tác dụng.' });
w('the-ember-hatchet', 'axe', 7, 'cinder-gate',
  { en: 'Ember Hatchet', vi: 'Rìu Nhỏ Than Hồng' },
  { en: 'Small, and it stays warm in your hand between rooms. That is not comforting.',
    vi: 'Nhỏ, và nó giữ ấm trong tay bạn suốt quãng đi giữa các phòng. Điều đó không hề dễ chịu.' });

// --- maces ----------------------------------------------------------------
w('paving-maul', 'mace', 0, 'courtyard',
  { en: 'Paving Maul', vi: 'Vồ Lát Đường' },
  { en: 'For setting stones flat. It sets most things flat.',
    vi: 'Dùng để nện cho đá nằm phẳng. Nó nện cho gần như mọi thứ nằm phẳng.' });
w('flanged-mace', 'mace', 1, 'gatehouse',
  { en: 'Flanged Mace', vi: 'Chuỳ Cánh' },
  { en: 'Ridged so it does not skid off a helm. Whoever designed that had watched one skid off a helm.',
    vi: 'Có gờ để không trượt khỏi mũ giáp. Người thiết kế hẳn đã tận mắt thấy một cây trượt khỏi mũ giáp.' });
w('sexton-hammer', 'mace', 2, 'ossuary',
  { en: 'Sexton Hammer', vi: 'Búa Người Coi Xương' },
  { en: 'For seating a bone into a wall so the wall holds. Nine thousand times, by hand.',
    vi: 'Dùng để nêm một khúc xương vào tường cho tường đứng vững. Chín nghìn lần, hoàn toàn bằng tay.' });
w('reliquary-mace', 'mace', 3, 'chapelyard',
  { en: 'Reliquary Mace', vi: 'Chuỳ Hộp Thánh Tích' },
  { en: 'There is something in the head of it and the head does not open.',
    vi: 'Trong đầu chuỳ có thứ gì đó, và đầu chuỳ thì không mở được.' });
w('bell-clapper', 'mace', 4, 'bellfry',
  { en: 'Bell Clapper', vi: 'Quả Lắc Chuông' },
  { en: 'The bell has been silent since this came out of it. That was not an accident.',
    vi: 'Quả chuông im tiếng từ khi thứ này bị lấy ra khỏi nó. Đó không phải chuyện tình cờ.' });
w('vault-key', 'mace', 5, 'deep-vault',
  { en: 'Vault Key', vi: 'Chìa Hầm Kín' },
  { en: 'Not a key. It is what they used on the doors when the keys ran out.',
    vi: 'Không phải chìa khoá. Đây là thứ họ dùng lên các cánh cửa khi hết chìa.' });
w('tide-breaker', 'mace', 6, 'the-tide',
  { en: 'Tide Breaker', vi: 'Chuỳ Phá Sóng' },
  { en: 'Taken off a harbour wall. It spent two hundred years being hit by the thing it now hits.',
    vi: 'Gỡ từ một bức tường cảng. Nó đã chịu đòn suốt hai trăm năm từ chính thứ giờ nó đánh lại.' });
w('the-toll', 'mace', 7, 'the-keeper',
  { en: 'The Toll', vi: 'Tiếng Đổ Chuông' },
  { en: 'It rings when it lands. Everything in the room turns, including whatever you were sneaking past.',
    vi: 'Trúng đòn là nó ngân lên. Cả phòng quay lại nhìn, kể cả thứ bạn đang cố lẻn qua.' });
w('reforge', 'mace', 7, 'the-slagborn',
  { en: 'Reforge', vi: 'Rèn Lại' },
  { en: 'It hardens, then it swings once. You get one and you had better have picked the moment.',
    vi: 'Nó đông cứng lại, rồi vung đúng một nhát. Bạn chỉ có một nhát, nên tốt hơn hết là đã chọn đúng lúc.' });
w('the-empty-peg', 'mace', 6, 'bone-orchard',
  { en: 'The Empty Peg', vi: 'Cái Đinh Trống' },
  { en: 'A mallet, from the tool store, hung in order of size between two others. She left in a hurry.',
    vi: 'Một cái vồ, lấy từ phòng kho dụng cụ, treo theo cỡ giữa hai cái khác. Bà ấy đã đi rất vội.' });

// --- halberds -------------------------------------------------------------
w('gate-bill', 'halberd', 1, 'gatehouse',
  { en: 'Gate Bill', vi: 'Kích Cửa Thành' },
  { en: 'Hook one side, blade the other, for pulling a rider down and then dealing with him.',
    vi: 'Một bên móc, một bên lưỡi, để giật kỵ sĩ xuống rồi mới xử lý.' });
w('rampart-halberd', 'halberd', 2, 'the-watchman',
  { en: 'Rampart Halberd', vi: 'Kích Tường Thành' },
  { en: 'His. The shaft went back over his shoulder before every sweep and it still wants to.',
    vi: 'Của ông ấy. Trước mỗi cú quét, cán kích lại đưa ngược qua vai, và nó vẫn còn muốn làm thế.' });
w('lock-hook', 'halberd', 3, 'cistern',
  { en: 'Lock Hook', vi: 'Móc Cửa Âu' },
  { en: 'For working a sluice gate from the bank, so nobody has to stand in the channel.',
    vi: 'Dùng để điều khiển cửa cống từ trên bờ, để không ai phải đứng dưới lòng rãnh.' });
w('the-plank', 'halberd', 4, 'winding-stair',
  { en: 'The Plank', vi: 'Tấm Ván' },
  { en: 'It bridged nine missing treads. Somebody bolted a blade to it and made it worse at both jobs.',
    vi: 'Nó từng bắc qua chín bậc bị mất. Ai đó bắt thêm một lưỡi dao vào, khiến nó tệ hơn ở cả hai việc.' });
w('crook-and-blade', 'halberd', 5, 'the-shepherd',
  { en: 'Crook and Blade', vi: 'Móc Và Lưỡi' },
  { en: 'It hooks before it swings, and you find yourself driving things rather than killing them.',
    vi: 'Nó móc trước khi vung, và bạn thấy mình đang lùa mọi thứ thay vì giết chúng.' });
w('lucerne', 'halberd', 6, 'upper-ward',
  { en: 'Lucerne', vi: 'Búa Kích' },
  { en: 'Four prongs and a hammer face. Designed by a committee and it shows, and it works.',
    vi: 'Bốn chấu và một mặt búa. Do một hội đồng thiết kế ra, nhìn là biết, và nó vẫn hiệu quả.' });
w('furnace-rake', 'halberd', 7, 'furnace',
  { en: 'Furnace Rake', vi: 'Cào Lò' },
  { en: 'Long because it has to be. Everything at the near end of it is on fire.',
    vi: 'Dài vì buộc phải dài. Mọi thứ ở đầu gần của nó đều đang cháy.' });
w('the-long-tell', 'halberd', 7, 'clockwork',
  { en: 'The Long Tell', vi: 'Dấu Báo Dài' },
  { en: 'You see it coming from across the room. So does everything else, and that is the trade.',
    vi: 'Bạn thấy nó tới từ đầu kia căn phòng. Mọi thứ khác cũng thấy, và đó là cái giá.' });
w('deepen', 'halberd', 7, 'the-old-root',
  { en: 'Deepen', vi: 'Xuống Sâu' },
  { en: 'It pulls down rather than across. Standing still is the mistake with this one too.',
    vi: 'Nó kéo xuống chứ không quét ngang. Với cây này, đứng yên cũng vẫn là sai lầm.' });
w('the-mirror-arm', 'halberd', 7, 'the-lantern',
  { en: 'The Mirror Arm', vi: 'Cánh Tay Gương' },
  { en: 'It held one of the mirrors at the correct angle. Somebody re-aimed them by hand with this.',
    vi: 'Nó từng giữ một tấm gương ở đúng góc. Có người đã dùng chính nó để chỉnh lại từng tấm bằng tay.' });

// --- greatswords ----------------------------------------------------------
w('two-hand-sword', 'greatsword', 2, 'ramparts',
  { en: 'Two-Hand Sword', vi: 'Kiếm Hai Tay' },
  { en: 'It was on a wall as a decoration for a hundred years and it is still better than most things.',
    vi: 'Nó treo tường làm cảnh suốt cả trăm năm, và vẫn tốt hơn phần lớn các thứ khác.' });
w('executioners-blade', 'greatsword', 3, 'upper-ward',
  { en: "Executioner's Blade", vi: 'Đại Kiếm Đao Phủ' },
  { en: 'Square at the tip, because it was never going to need a point.',
    vi: 'Đầu vuông, vì nó chưa bao giờ cần đến một mũi nhọn.' });
w('the-genuflect', 'greatsword', 4, 'the-gilded',
  { en: 'The Genuflect', vi: 'Nhát Quỳ Gối' },
  { en: 'He bowed with it. What followed the bow was not a bow.',
    vi: 'Ông cúi chào bằng nó. Cái theo sau lời chào thì không phải lời chào.' });
w('flamberge', 'greatsword', 5, 'the-ember-knight',
  { en: 'Flamberge', vi: 'Kiếm Lượn Sóng' },
  { en: 'Waved along the edge so it saws on the way out. It was already shaped like fire before the fire.',
    vi: 'Lưỡi uốn lượn nên lúc rút ra nó cưa theo. Nó đã mang hình ngọn lửa từ trước khi có lửa.' });
w('the-court-sword', 'greatsword', 5, 'the-drowned-king',
  { en: 'The Court Sword', vi: 'Đại Kiếm Triều Đình' },
  { en: 'Too big to draw indoors, which is where it was always worn.',
    vi: 'To đến mức không rút nổi trong nhà, mà nó thì luôn được đeo trong nhà.' });
w('ashen-greatsword', 'greatsword', 6, 'ashlands',
  { en: 'Ashen Greatsword', vi: 'Đại Kiếm Tro' },
  { en: 'Grey through the whole blade, not just the surface. Nobody knows how to do that any more.',
    vi: 'Xám suốt cả lưỡi chứ không riêng bề mặt. Không còn ai biết làm được như thế nữa.' });
w('the-surge', 'greatsword', 7, 'the-tide',
  { en: 'The Surge', vi: 'Đợt Dâng' },
  { en: 'It does not stop at the first thing it meets. Neither did the thing that dropped it.',
    vi: 'Nó không dừng ở thứ đầu tiên nó chạm phải. Thứ để rơi nó lại cũng vậy.' });
w('the-eclipse', 'greatsword', 7, 'star-well',
  { en: 'The Eclipse', vi: 'Nhật Thực' },
  { en: 'The room darkens from the edges inward when it swings. That is not an effect, it is the swing.',
    vi: 'Khi nó vung, căn phòng tối lại từ rìa vào giữa. Đó không phải hiệu ứng, đó chính là cú vung.' });
w('sealed-blade', 'greatsword', 7, 'the-crucible-twins',
  { en: 'Sealed Blade', vi: 'Lưỡi Kiếm Niêm' },
  { en: 'They met in the middle holding this between them. It has two grips and one edge.',
    vi: 'Chúng gặp nhau ở giữa với cây này kẹp giữa hai đứa. Nó có hai chỗ cầm và một lưỡi.' });
w('the-standing-rows', 'greatsword', 7, 'bone-orchard',
  { en: 'The Standing Rows', vi: 'Những Hàng Đứng' },
  { en: 'Grown to this length in the ground, in a row, alongside eleven others exactly like it.',
    vi: 'Mọc dài tới cỡ này ngay dưới đất, thành một hàng, bên cạnh mười một cây giống hệt.' });

// --- greataxes ------------------------------------------------------------
w('felling-axe', 'greataxe', 2, 'pale-wood',
  { en: 'Felling Axe', vi: 'Rìu Đốn Cây' },
  { en: 'Whoever brought this into the pale wood was optimistic and did not come out.',
    vi: 'Kẻ mang cây rìu này vào Rừng Nhợt đã rất lạc quan, và không đi ra được.' });
w('breach-axe', 'greataxe', 3, 'gatehouse',
  { en: 'Breach Axe', vi: 'Rìu Phá Cổng' },
  { en: 'Two people used to carry it. You are managing, and it shows.',
    vi: 'Trước đây phải hai người mới khiêng nổi. Bạn xoay xở được, và nhìn là thấy rõ.' });
w('the-flop', 'greataxe', 4, 'the-bloated',
  { en: 'Dead Weight', vi: 'Sức Nặng Chết' },
  { en: 'It lifts, and everything under it dies. That was true of the thing it came off, too.',
    vi: 'Nó nhấc lên, và mọi thứ bên dưới đều chết. Điều đó cũng đúng với con đã để rơi nó.' });
w('quarrymans-greataxe', 'greataxe', 5, 'deep-vault',
  { en: "Quarryman's Greataxe", vi: 'Đại Rìu Thợ Đá' },
  { en: 'It was cutting the vault out of the rock. The vault is finished and it is still down there.',
    vi: 'Nó từng khoét căn hầm ra khỏi đá. Hầm đã xong, mà nó thì vẫn nằm dưới đó.' });
w('slagfall', 'greataxe', 6, 'slag',
  { en: 'Slagfall', vi: 'Xỉ Rơi' },
  { en: 'Cast in one pour into a mould that cracked. The crack is the part that cuts.',
    vi: 'Đúc một lần rót vào cái khuôn đã nứt. Chính vết nứt là phần chém được.' });
w('the-collapse', 'greataxe', 7, 'cinder-gate',
  { en: 'The Collapse', vi: 'Sập Đổ' },
  { en: 'The armour opens and everything comes out. This is what came out.',
    vi: 'Bộ giáp bung ra và mọi thứ tràn khỏi nó. Đây chính là thứ đã tràn ra.' });
w('hammer-fall', 'greataxe', 7, 'the-smith',
  { en: 'Anvil Cleaver', vi: 'Rìu Chẻ Đe' },
  { en: 'He kept it for the work he did not talk about. The anvil has a notch in it.',
    vi: 'Ông giữ nó cho những việc ông không kể ra. Cái đe có một vết khuyết.' });
w('the-drive', 'greataxe', 7, 'pale-wood',
  { en: 'The Drive', vi: 'Cú Lùa' },
  { en: 'It walks whatever you hit backwards. Into the flock, if you are not thinking.',
    vi: 'Nó đẩy thứ bạn đánh lùi về sau. Lùi thẳng vào giữa đàn, nếu bạn không để ý.' });
w('kilnbreaker', 'greataxe', 7, 'kiln',
  { en: 'Kilnbreaker', vi: 'Rìu Phá Lò' },
  { en: 'The chamber is bricked shut from outside every firing. Somebody has to unbrick it.',
    vi: 'Buồng nung bị xây bít từ bên ngoài mỗi mẻ. Phải có ai đó phá lớp gạch ấy ra.' });
w('the-deep-cut', 'greataxe', 7, 'root-deep',
  { en: 'The Deep Cut', vi: 'Nhát Sâu' },
  { en: 'Everything above ground in this world was one plant. This is where somebody tried to change that.',
    vi: 'Mọi thứ mọc trên mặt đất trong thế giới này từng là một cái cây. Đây là chỗ có người đã thử thay đổi điều đó.' });

// --- great hammers --------------------------------------------------------
w('pile-driver', 'great-hammer', 3, 'drainage',
  { en: 'Pile Driver', vi: 'Búa Đóng Cọc' },
  { en: 'The whole city is standing on posts this thing put in. It is tired and it still works.',
    vi: 'Cả thành phố đứng trên những cây cọc do thứ này đóng xuống. Nó đã mỏi mệt và vẫn còn dùng được.' });
w('sledge', 'great-hammer', 4, 'forge',
  { en: 'Sledge', vi: 'Búa Tạ' },
  { en: 'The striker swings this while the smith holds the work. There is no striker any more.',
    vi: 'Người phụ nện búa này trong khi thợ chính giữ phôi. Giờ không còn người phụ nào nữa.' });
w('the-overhead', 'great-hammer', 4, 'the-watchman',
  { en: 'The Overhead', vi: 'Nhát Bổ Đỉnh' },
  { en: 'Both hands up, a long beat, the biggest punish. Now it is yours to be punished for.',
    vi: 'Hai tay giơ cao, một nhịp dài, cú phạt lớn nhất. Giờ nó là của bạn, và đến lượt bạn bị phạt.' });
w('cornerstone', 'great-hammer', 5, 'upper-ward',
  { en: 'Cornerstone', vi: 'Đá Góc' },
  { en: 'A block on a handle. Whoever thought of the handle changed nothing about the block.',
    vi: 'Một khối đá gắn cán. Người nghĩ ra cái cán chẳng thay đổi gì ở khối đá cả.' });
w('the-deepening', 'great-hammer', 6, 'root-deep',
  { en: 'Rootmaul', vi: 'Vồ Rễ' },
  { en: 'The floor lifts where it lands. It learned that from the thing underneath.',
    vi: 'Nó giáng xuống đâu thì sàn phồng lên ở đó. Nó học được điều ấy từ thứ nằm bên dưới.' });
w('strike-twelve', 'great-hammer', 7, 'the-hourwright',
  { en: 'Strike Twelve', vi: 'Điểm Mười Hai' },
  { en: 'Twelve of them. Count, and move on the count — this time you are the one counting.',
    vi: 'Đúng mười hai tiếng. Đếm, và động theo tiếng đếm — lần này người đếm là bạn.' });
w('the-quench', 'great-hammer', 7, 'furnace',
  { en: 'Quenched Maul', vi: 'Vồ Tôi Nước' },
  { en: 'Dropped in the trough glowing and left there. It came out harder and it came out wrong.',
    vi: 'Bị thả vào máng tôi lúc đang rực đỏ rồi bỏ quên. Nó ra khỏi đó cứng hơn, và cũng hỏng đi.' });
w('the-break', 'great-hammer', 7, 'drowned-city',
  { en: 'The Break', vi: 'Sóng Vỡ' },
  { en: 'It rears, and everything under it goes flat. You have seen this before from the other side.',
    vi: 'Nó dựng lên, và mọi thứ bên dưới nằm bẹp. Bạn từng thấy cảnh này rồi, từ phía bên kia.' });
w('the-first-mould', 'great-hammer', 7, 'kiln',
  { en: 'The First Mould', vi: 'Khuôn Đầu Tiên' },
  { en: 'Third shelf, top rack, oldest label. Everything else on those shelves came after it.',
    vi: 'Kệ thứ ba, giá trên cùng, nhãn cũ nhất. Mọi thứ khác trên các giá đó đều có sau nó.' });
w('kindle', 'great-hammer', 7, 'the-first-flame',
  { en: 'Kindle', vi: 'Nhóm Lửa' },
  { en: 'The longest tell in the world, and the last one. Everything you learned is in this swing.',
    vi: 'Dấu báo dài nhất thế giới, và cũng là dấu báo cuối cùng. Mọi thứ bạn học được đều nằm trong cú vung này.' });

// --- assembly -------------------------------------------------------------

/** Damage grows with tier; everything else is the class, untouched. */
const CLASS_BY_ID = Object.fromEntries(CLASSES.map((c) => [c.id, c]));

export const WEAPONS = {};
for (const entry of list) {
  const base = CLASS_BY_ID[entry.cls];
  WEAPONS[entry.id] = {
    id: entry.id,
    cls: entry.cls,
    tier: entry.tier,
    from: entry.from,
    name: entry.name,
    line: entry.line,
    damage: Math.round(base.damage * (1 + entry.tier * 0.18)),
    windup: base.windup,
    active: base.active,
    recover: base.recover,
    reach: base.reach,
    stamina: base.stamina,
    poise: base.poise,
    burns: !!base.burns,
  };
}

export const WEAPON_IDS = Object.keys(WEAPONS);
export const CLASS_IDS = CLASSES.map((c) => c.id);
export const classStats = (id) => CLASS_BY_ID[id];

/** Whether a source is a place you can walk to or a thing you have to fell. */
export const sourceKind = (from) =>
  BOSS_SET.has(from) ? 'boss' : AREA_IDS.has(from) ? 'area' : null;

export const weaponsOfClass = (cls) => WEAPON_IDS.filter((id) => WEAPONS[id].cls === cls);

/**
 * Is class `a` strictly worse than class `b` at everything? Damage, reach and
 * poise want to be high; wind-up, recovery and stamina want to be low. A yes
 * here means one of the fifteen is a trap, and the test refuses to ship it.
 */
export function dominates(b, a) {
  const hi = ['damage', 'reach', 'poise'];
  const lo = ['windup', 'recover', 'stamina'];
  const B = CLASS_BY_ID[b];
  const A = CLASS_BY_ID[a];
  if (A.burns && !B.burns) return false;
  const notWorse = hi.every((k) => B[k] >= A[k]) && lo.every((k) => B[k] <= A[k]);
  const better = hi.some((k) => B[k] > A[k]) || lo.some((k) => B[k] < A[k]);
  return notWorse && better;
}

/** One weapon, in one language, ready to print on a menu. */
export function describeWeapon(id, lang = 'en') {
  const it = WEAPONS[id];
  const lore = CLASS_LORE[it.cls];
  return {
    id,
    name: it.name[lang],
    line: it.line[lang],
    className: lore.name[lang],
    feel: lore.feel[lang],
    against: lore.against[lang],
    from: it.from,
    kind: sourceKind(it.from),
    stats: it,
  };
}
