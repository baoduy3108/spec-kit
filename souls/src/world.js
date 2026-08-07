// The world.
//
// 36 areas, 18 bosses, a few hundred rooms. The area graph is authored by
// hand — that is the part that decides whether a world feels like a place —
// and the rooms inside each area are grown from it deterministically, so the
// two can never disagree and there is no 400-line table to keep in sync.
//
// The property that makes a souls map a place rather than a level select is
// that it *folds back on itself*: you walk a long dangerous way out, open a
// lift, and suddenly you are thirty seconds from the fire you started at. So
// folding is measured here, not asserted. `shortcutValue()` reports how many
// rooms each fold actually saves, and a shortcut that saves nothing fails the
// tests, because that is scenery wearing a shortcut's clothes.

// --- what lives here ------------------------------------------------------
//
// Sixteen families, each with a few variants, the way Dark Souls counts its
// roughly seventy "types": a hollow with a spear and a hollow with a torch
// are the same creature with different intentions.

const FAMILIES = [
  { id: 'husk', hp: 34, damage: 9, speed: 62, poise: 12, windup: 0.55, tier: 0 },
  { id: 'hound', hp: 22, damage: 12, speed: 148, poise: 6, windup: 0.34, tier: 0 },
  { id: 'crawler', hp: 46, damage: 14, speed: 48, poise: 20, windup: 0.7, tier: 1 },
  { id: 'acolyte', hp: 40, damage: 16, speed: 74, poise: 14, windup: 0.62, tier: 1 },
  { id: 'knightling', hp: 62, damage: 18, speed: 96, poise: 28, windup: 0.6, tier: 2 },
  { id: 'ghoul', hp: 38, damage: 15, speed: 118, poise: 10, windup: 0.4, tier: 2 },
  { id: 'stonemask', hp: 88, damage: 21, speed: 58, poise: 44, windup: 0.85, tier: 3 },
  { id: 'moth', hp: 30, damage: 13, speed: 165, poise: 4, windup: 0.3, tier: 3 },
  { id: 'warder', hp: 104, damage: 24, speed: 84, poise: 52, windup: 0.72, tier: 4 },
  { id: 'kiln', hp: 72, damage: 27, speed: 90, poise: 30, windup: 0.55, tier: 4 },
  { id: 'drowned', hp: 96, damage: 22, speed: 66, poise: 40, windup: 0.8, tier: 5 },
  { id: 'chorister', hp: 68, damage: 30, speed: 78, poise: 24, windup: 0.9, tier: 5 },
  { id: 'ironclad', hp: 148, damage: 32, speed: 70, poise: 76, windup: 0.78, tier: 6 },
  { id: 'wisp', hp: 44, damage: 26, speed: 190, poise: 2, windup: 0.28, tier: 6 },
  { id: 'colossus', hp: 210, damage: 38, speed: 52, poise: 110, windup: 1.0, tier: 7 },
  { id: 'shade', hp: 120, damage: 35, speed: 130, poise: 34, windup: 0.42, tier: 7 },
];

/** What a family can be carrying. The numbers bend, the creature does not. */
const VARIANTS = [
  { suffix: '', hp: 1, damage: 1, speed: 1, windup: 1 },
  { suffix: '-spear', hp: 1.05, damage: 1.18, speed: 0.94, windup: 1.15, reach: 1.4 },
  { suffix: '-torch', hp: 0.92, damage: 0.86, speed: 1.08, windup: 0.88, burns: true },
  { suffix: '-heavy', hp: 1.45, damage: 1.35, speed: 0.8, windup: 1.3, poise: 1.6 },
  { suffix: '-swift', hp: 0.78, damage: 0.9, speed: 1.4, windup: 0.75 },
];

/** Every concrete foe: family × variant, flattened. */
export const FOES = {};
for (const family of FAMILIES) {
  for (const variant of VARIANTS) {
    // Not every family carries every thing — the fast ones do not lug shields.
    if (variant.suffix === '-heavy' && family.speed > 140) continue;
    if (variant.suffix === '-spear' && family.poise < 6) continue;
    FOES[family.id + variant.suffix] = {
      family: family.id,
      tier: family.tier,
      hp: Math.round(family.hp * variant.hp),
      damage: Math.round(family.damage * variant.damage),
      speed: Math.round(family.speed * variant.speed),
      poise: Math.round(family.poise * (variant.poise || 1)),
      windup: Number((family.windup * variant.windup).toFixed(2)),
      reach: variant.reach || 1,
      burns: !!variant.burns,
      essence: Math.round(family.hp * variant.hp * 0.55 + family.damage * variant.damage * 1.4),
    };
  }
}

export const FOE_IDS = Object.keys(FOES);
/**
 * Areas run to tier 11 but there are only eight tiers of creature, so an
 * area's tier is mapped onto the roster rather than indexed into it. Without
 * this the deepest third of the map picked foes out of an empty list and
 * filled its rooms with `undefined`.
 */
const byTier = (areaTier) => {
  const want = Math.min(7, Math.round((areaTier * 7) / 11));
  const pool = FOE_IDS.filter((id) => Math.abs(FOES[id].tier - want) <= 1);
  return pool.length ? pool : FOE_IDS;
};

// --- the areas ------------------------------------------------------------
//
// `to` is the way onward. `fold` is a shortcut back to somewhere you have
// already been, and it only ever opens from this side.

const area = (id, tier, size, extra = {}) => ({ id, tier, size, ...extra });

export const AREAS = [
  area('undercroft', 0, 7, { to: ['courtyard', 'drainage'], fires: 1 }),
  area('courtyard', 0, 9, { to: ['gatehouse'] }),
  area('drainage', 1, 8, { to: ['cistern'], boss: 'the-bloated' }),
  area('gatehouse', 1, 10, { to: ['ramparts', 'chapelyard'], fires: 1 }),
  area('cistern', 1, 9, { to: ['chapelyard'], fold: 'undercroft' }),
  area('ramparts', 2, 11, { to: ['bellfry'], boss: 'the-watchman' }),
  area('chapelyard', 2, 10, { to: ['ossuary'], fires: 1 }),
  area('bellfry', 2, 8, { to: ['upper-ward'], fold: 'courtyard' }),
  area('ossuary', 3, 12, { to: ['catacombs'], boss: 'the-chanter', fires: 1 }),
  area('upper-ward', 3, 9, { to: ['solarium'] }),
  area('catacombs', 3, 13, { to: ['deep-vault', 'marsh'] }),
  area('solarium', 4, 8, { to: ['aviary'], boss: 'the-gilded', fold: 'gatehouse' }),
  area('deep-vault', 4, 11, { to: ['forge'], fires: 1 }),
  area('marsh', 4, 12, { to: ['sunken-road'], boss: 'the-drowned-king' }),
  area('aviary', 5, 9, { to: ['spire'] }),
  area('forge', 5, 10, { to: ['ashlands'], boss: 'the-smith', fires: 1 }),
  area('sunken-road', 5, 11, { to: ['pale-wood'], fold: 'chapelyard' }),
  area('spire', 6, 8, { to: ['observatory'], boss: 'the-keeper' }),
  area('ashlands', 6, 13, { to: ['cinder-gate'], fires: 1 }),
  area('pale-wood', 6, 12, { to: ['hollow-tree'], boss: 'the-shepherd' }),
  area('observatory', 7, 9, { to: ['star-well'], fold: 'upper-ward' }),
  area('cinder-gate', 7, 10, { to: ['furnace'], boss: 'the-ember-knight' }),
  area('hollow-tree', 7, 11, { to: ['root-deep'], fires: 1 }),
  area('star-well', 8, 8, { to: ['vault-of-hours'], boss: 'the-astronomer' }),
  area('furnace', 8, 12, { to: ['slag'], fold: 'forge' }),
  area('root-deep', 8, 13, { to: ['heartwood'], boss: 'the-old-root', fires: 1 }),
  area('vault-of-hours', 9, 9, { to: ['clockwork'] }),
  area('slag', 9, 11, { to: ['crucible'], boss: 'the-slagborn' }),
  area('heartwood', 9, 10, { to: ['crucible'], fold: 'pale-wood' }),
  area('clockwork', 10, 12, { to: ['the-lantern'], boss: 'the-hourwright', fires: 1 }),
  area('crucible', 10, 13, { to: ['the-lantern'], boss: 'the-crucible-twins' }),
  area('drowned-city', 6, 14, { to: ['sunken-road'], boss: 'the-tide', fires: 1 }),
  area('bone-orchard', 5, 10, { to: ['drowned-city'], boss: 'the-gardener' }),
  area('winding-stair', 4, 9, { to: ['bone-orchard'], fold: 'ossuary' }),
  area('the-lantern', 11, 8, { to: [], boss: 'the-lantern-warden', fires: 1 }),
  area('kiln', 11, 9, { to: ['the-lantern'], boss: 'the-first-flame', fold: 'undercroft' }),
];

// `catacombs` also drops into the side branch, and the kiln hides behind it
AREAS.find((a) => a.id === 'catacombs').to.push('winding-stair');
AREAS.find((a) => a.id === 'crucible').to.push('kiln');

// --- rooms written by hand -------------------------------------------------
//
// The generator lays out a world of the right shape; this is where it becomes
// a place. Any area listed here replaces its generated rooms entirely — the
// name, what is in it, what it looks like, and exactly which creature stands
// where. Areas not listed here are still grown, so the game stays playable
// while the map is hand-written one area at a time.
//
// The undercroft is the template. Seven rooms, each one authored.

export const HANDMADE = {
  // Eight rooms of light, which after eleven areas underground is its own
  // kind of threat. The Gilded's tell is light running down the blade — so
  // the area is lit brightly enough that a gleam is hard to pick out, and
  // teaches you to watch the arm instead. The fire and the fold share a room,
  // deliberately: the lift head is the safest place in the area and the
  // reason to have walked all the way here.
  solarium: [
    {
      key: 'the-gilded-stair',
      kind: 'stair',
      name: { en: 'The Gilded Stair', vi: 'Cầu Thang Mạ Vàng' },
      line: {
        en: 'Every tread edged in gold. It was never for walking on; it was for being seen on.',
        vi: 'Mỗi bậc viền vàng. Nó chưa bao giờ để bước lên; nó để người ta nhìn mình bước lên.',
      },
      foes: ['knightling-heavy'],
      layout: 'single',
      light: 'warm',
    },
    {
      key: 'the-antechamber-of-light',
      kind: 'hall',
      name: { en: 'The Antechamber of Light', vi: 'Tiền Sảnh Ánh Sáng' },
      line: {
        en: 'Windows on three sides and a fire in the middle that nobody needs.',
        vi: 'Cửa sổ ba mặt, và giữa phòng là ngọn lửa chẳng ai cần đến.',
      },
      foes: [],
      layout: 'single',
      fire: true,
      light: 'warm',
    },
    {
      key: 'the-long-window',
      kind: 'bridge',
      name: { en: 'The Long Window', vi: 'Cửa Sổ Dài' },
      line: {
        en: 'A gallery of glass, and the light off it comes in strips. So do the shadows.',
        vi: 'Một hành lang toàn kính, ánh sáng hắt vào thành từng vệt. Bóng tối cũng vậy.',
      },
      foes: ['warder-spear', 'moth'],
      layout: 'spread',
      light: 'warm',
      note: 'strips of light and dark — the room where reading a tell gets harder',
    },
    {
      key: 'the-leaf-room',
      kind: 'hall',
      name: { en: 'The Leaf Room', vi: 'Phòng Dát Vàng' },
      line: {
        en: 'Gold beaten thinner than paper, in stacks, and the air moves it when you do.',
        vi: 'Vàng dát mỏng hơn giấy, xếp thành chồng, và bạn động là không khí làm nó bay.',
      },
      foes: ['acolyte-swift', 'acolyte-swift', 'ghoul'],
      layout: 'pack',
      light: 'warm',
      note: 'the leaf moves before they do — the only honest warning in the area',
    },
    {
      key: 'the-mirror-walk',
      kind: 'hall',
      name: { en: 'The Mirror Walk', vi: 'Lối Gương' },
      line: {
        en: 'Polished bronze down both walls. Four of you, and only one is a problem.',
        vi: 'Đồng đánh bóng dọc cả hai bên tường. Có bốn cái bạn, và chỉ một cái là vấn đề.',
      },
      foes: ['stonemask', 'warder'],
      layout: 'ambush',
      light: 'warm',
    },
    {
      key: 'the-throne-approach',
      kind: 'hall',
      name: { en: 'The Throne Approach', vi: 'Đường Lên Ngai' },
      line: {
        en: 'A carpet, still red, running the length of it. Nothing has walked on it in years.',
        vi: 'Một tấm thảm, vẫn còn đỏ, trải suốt chiều dài. Nhiều năm rồi không ai bước lên.',
      },
      foes: ['warder', 'knightling', 'knightling'],
      layout: 'ring',
      light: 'warm',
      note: 'the hardest room here, and the last thing between you and the lift',
    },
    {
      key: 'the-lift-head',
      kind: 'hall',
      name: { en: 'The Lift Head', vi: 'Đầu Thang Máy' },
      line: {
        en: 'A counterweighted platform and a lever. It goes down to the gatehouse, in one drop.',
        vi: 'Một sàn nâng có đối trọng và một cái cần gạt. Nó xuống thẳng cổng gác, một mạch.',
      },
      foes: [],
      layout: 'single',
      fire: true,
      light: 'warm',
      note: 'fire and fold in one room — the safest place here, and the reward for the walk',
    },
    {
      key: 'the-solar',
      kind: 'fog',
      name: { en: 'The Solar', vi: 'Phòng Nắng' },
      line: {
        en: 'The brightest room in the world, and he has been standing in it, facing the window.',
        vi: 'Căn phòng sáng nhất thế gian, và ông ta vẫn đứng trong đó, quay mặt về phía cửa sổ.',
      },
      foes: [],
      layout: 'single',
      light: 'warm',
      note: 'the gilded — his tell is light on the blade, in a room already full of it',
    },
  ],
  // Thirteen rooms, the largest area yet, and it ends in three doors instead
  // of two. Everything here is corridors cut through the dead, so the area is
  // about *file order*: who reaches you first, and whether you chose that.
  // No fold leaves the catacombs — it is the one place the world does not
  // shrink, which is why getting lost in it means something.
  catacombs: [
    {
      key: 'the-way-down',
      kind: 'stair',
      name: { en: 'The Way Down', vi: 'Lối Xuống' },
      line: {
        en: 'Cut, not built. Whoever made this was going somewhere specific.',
        vi: 'Đục ra, không phải xây lên. Kẻ làm ra nó đang nhắm tới một chỗ cụ thể.',
      },
      foes: [],
      layout: 'single',
      light: 'dark',
    },
    {
      key: 'the-lamp-niche',
      kind: 'hall',
      name: { en: 'The Lamp Niche', vi: 'Hốc Đèn' },
      line: {
        en: 'A shelf cut for one lamp, at the height of a hand. It is still lit.',
        vi: 'Một cái hốc đục vừa một ngọn đèn, ngang tầm tay. Đèn vẫn còn cháy.',
      },
      foes: [],
      layout: 'single',
      fire: true,
      light: 'warm',
    },
    {
      key: 'the-first-gallery',
      kind: 'hall',
      name: { en: 'The First Gallery', vi: 'Dãy Hầm Đầu' },
      line: {
        en: 'Shelves in the walls, four high, and the top ones are empty.',
        vi: 'Những ngăn đục trong tường, xếp bốn tầng, và tầng trên cùng thì trống.',
      },
      foes: ['ghoul', 'ghoul', 'acolyte'],
      layout: 'spread',
      light: 'dark',
      note: 'the empty top shelves are where the ghouls come from, one beat later',
    },
    {
      key: 'the-narrow-file',
      kind: 'bridge',
      name: { en: 'The Narrow File', vi: 'Hàng Một' },
      line: {
        en: 'One wide. Whatever is at the front is the only thing you have to solve.',
        vi: 'Rộng đúng một người. Thứ đứng đầu hàng là vấn đề duy nhất bạn phải giải.',
      },
      foes: ['knightling', 'knightling', 'knightling'],
      layout: 'single',
      light: 'dark',
      note: 'three armoured things and a corridor that only lets one work',
    },
    {
      key: 'the-collapsed-vault',
      kind: 'cave',
      name: { en: 'The Collapsed Vault', vi: 'Hầm Sập' },
      line: {
        en: 'The ceiling came down and took two galleries with it. You can climb the rubble.',
        vi: 'Trần sập kéo theo hai dãy hầm. Bạn có thể trèo lên đống đổ nát.',
      },
      foes: ['crawler-heavy', 'crawler'],
      layout: 'ambush',
      light: 'dark',
    },
    {
      key: 'the-water-table',
      kind: 'yard',
      name: { en: 'The Water Table', vi: 'Mạch Nước' },
      line: {
        en: 'The floor is wet and it did not used to be. Something upstairs is broken.',
        vi: 'Nền ướt, mà trước kia thì không. Có thứ gì đó phía trên đã hỏng.',
      },
      foes: ['drowned'],
      layout: 'single',
      light: 'dark',
      note: 'first drowned, a long way from any marsh — the water arrived before you did',
    },
    {
      key: 'the-lost-count',
      kind: 'hall',
      name: { en: 'The Lost Count', vi: 'Đếm Sai' },
      line: {
        en: 'The numbers on the shelves stop agreeing here. Two rooms are numbered the same.',
        vi: 'Số ghi trên các ngăn bắt đầu lệch nhau ở đây. Hai căn phòng cùng mang một số.',
      },
      foes: ['moth', 'moth', 'ghoul-swift'],
      layout: 'pack',
      light: 'dark',
    },
    {
      key: 'the-masons-mark',
      kind: 'hall',
      name: { en: "The Mason's Mark", vi: 'Dấu Thợ Đá' },
      line: {
        en: 'The same mark on every stone, and on one of them it is upside down.',
        vi: 'Cùng một dấu khắc trên mọi phiến đá, và trên một phiến thì nó bị lộn ngược.',
      },
      foes: ['stonemask', 'stonemask'],
      layout: 'spread',
      light: 'dim',
      note: 'the upside-down stone is the door; the two of them are the reason to find it',
    },
    {
      key: 'the-deep-gallery',
      kind: 'hall',
      name: { en: 'The Deep Gallery', vi: 'Dãy Hầm Sâu' },
      line: {
        en: 'Older work, better work, and the shelves down here are all still full.',
        vi: 'Công trình cũ hơn, khéo hơn, và các ngăn dưới này vẫn còn đầy.',
      },
      foes: ['warder', 'acolyte-spear'],
      layout: 'spread',
      light: 'dark',
    },
    {
      key: 'the-black-stair',
      kind: 'stair',
      name: { en: 'The Black Stair', vi: 'Cầu Thang Đen' },
      line: {
        en: 'No lamp niches on this one. Nobody who cut it expected to come back up.',
        vi: 'Cầu thang này không có hốc đèn nào. Kẻ đục nó không định quay lên.',
      },
      foes: ['ghoul-swift', 'ghoul-swift'],
      layout: 'ambush',
      light: 'dark',
    },
    {
      key: 'the-wet-descent',
      kind: 'cave',
      name: { en: 'The Wet Descent', vi: 'Dốc Ướt' },
      line: {
        en: 'Down, and the wet gets worse, and you can hear it moving somewhere below.',
        vi: 'Đi xuống, càng lúc càng ướt, và nghe được tiếng nó chuyển động đâu đó phía dưới.',
      },
      foes: ['drowned', 'crawler'],
      layout: 'spread',
      light: 'dark',
    },
    {
      key: 'the-last-lamp',
      kind: 'hall',
      name: { en: 'The Last Lamp', vi: 'Ngọn Đèn Cuối' },
      line: {
        en: 'Someone carried a lamp this far and set it down. They did not pick it up again.',
        vi: 'Ai đó mang ngọn đèn tới tận đây rồi đặt xuống. Và không nhặt lên nữa.',
      },
      foes: [],
      layout: 'single',
      fire: true,
      light: 'warm',
    },
    {
      key: 'the-three-mouths',
      kind: 'cave',
      name: { en: 'The Three Mouths', vi: 'Ba Cửa Miệng' },
      line: {
        en: 'Three openings, all cut by different hands, none of them by the mason.',
        vi: 'Ba lối mở, do ba bàn tay khác nhau đục ra, và không tay nào là của người thợ đá.',
      },
      foes: [],
      layout: 'single',
      light: 'dark',
      note: 'the three-way fork: the vault, the marsh, and the stair nobody signposted',
    },
  ],
  // Everything until now was a place people worked. This is where they lived,
  // and it is the first area whose rooms had a use that was not defence — a
  // kitchen, a stable, a hall for eating in. The horror here is domestic, and
  // it is the last quiet before the gold.
  'upper-ward': [
    {
      key: 'the-inner-gate',
      kind: 'stair',
      name: { en: 'The Inner Gate', vi: 'Cổng Trong' },
      line: {
        en: 'Smaller than the outer one, and much better made. This was the door that mattered.',
        vi: 'Nhỏ hơn cổng ngoài, mà làm kỹ hơn nhiều. Đây mới là cánh cửa quan trọng.',
      },
      foes: ['knightling'],
      layout: 'single',
      light: 'grey',
    },
    {
      key: 'the-well-court',
      kind: 'yard',
      name: { en: 'The Well Court', vi: 'Sân Giếng' },
      line: {
        en: 'A well, a bucket, a rope, and a fire someone lit beside it out of habit.',
        vi: 'Một cái giếng, một cái gàu, một sợi dây, và ngọn lửa ai đó nhóm bên cạnh theo thói quen.',
      },
      foes: [],
      layout: 'single',
      fire: true,
      light: 'warm',
    },
    {
      key: 'the-stables',
      kind: 'hall',
      name: { en: 'The Stables', vi: 'Chuồng Ngựa' },
      line: {
        en: 'Twelve stalls. The doors are all open and they were opened from the inside.',
        vi: 'Mười hai ô chuồng. Cửa mở toang hết, và mở từ phía bên trong.',
      },
      foes: ['hound', 'hound', 'hound-swift'],
      layout: 'pack',
      light: 'dim',
      note: 'a pack in a room built to hold animals — the stalls are the cover',
    },
    {
      key: 'the-kitchens',
      kind: 'hall',
      name: { en: 'The Kitchens', vi: 'Nhà Bếp' },
      line: {
        en: 'A fire out, a pot on, and something in the pot that has been on a long time.',
        vi: 'Bếp đã tắt, nồi vẫn bắc, và thứ trong nồi đã ở đó rất lâu.',
      },
      foes: ['ghoul', 'ghoul', 'husk-heavy'],
      layout: 'spread',
      light: 'dark',
    },
    {
      key: 'the-servants-stair',
      kind: 'stair',
      name: { en: "The Servants' Stair", vi: 'Cầu Thang Gia Nhân' },
      line: {
        en: 'Narrow, unlit, and it goes everywhere. It is how the whole place worked.',
        vi: 'Hẹp, không đèn, và nó dẫn đi khắp nơi. Cả toà nhà này vận hành nhờ nó.',
      },
      foes: ['moth', 'acolyte'],
      layout: 'ambush',
      light: 'dark',
    },
    {
      key: 'the-hall-of-arms',
      kind: 'hall',
      name: { en: 'The Hall of Arms', vi: 'Sảnh Vũ Khí' },
      line: {
        en: 'Shields on the wall in a family order, and one of them is standing under its own.',
        vi: 'Những chiếc khiên treo tường theo thứ tự dòng họ, và một đứa đang đứng ngay dưới cái khiên của nó.',
      },
      foes: ['warder'],
      layout: 'single',
      light: 'dim',
      note: 'first warder — the poise wall proper, and the first thing that punishes greed twice',
    },
    {
      key: 'the-gallery-walk',
      kind: 'bridge',
      name: { en: 'The Gallery Walk', vi: 'Hành Lang Tranh' },
      line: {
        en: 'Portraits down one side, all facing the same way, all facing the far door.',
        vi: 'Chân dung treo dọc một bên, tất cả quay cùng một hướng, tất cả nhìn về cánh cửa cuối.',
      },
      foes: ['knightling', 'knightling'],
      layout: 'spread',
      light: 'dim',
    },
    {
      key: 'the-solar-stair',
      kind: 'stair',
      name: { en: 'The Solar Stair', vi: 'Cầu Thang Phòng Sáng' },
      line: {
        en: 'It gets warmer going up, and brighter, and neither of those is good news.',
        vi: 'Càng lên càng ấm, càng sáng, và cả hai đều không phải tin tốt.',
      },
      foes: ['stonemask'],
      layout: 'ambush',
      light: 'warm',
    },
    {
      key: 'the-gilded-door',
      kind: 'hall',
      name: { en: 'The Gilded Door', vi: 'Cửa Mạ Vàng' },
      line: {
        en: 'Gold leaf over oak, and the leaf is worn through where a hand goes.',
        vi: 'Lá vàng dát trên gỗ sồi, và chỗ đặt tay thì vàng đã mòn hết.',
      },
      foes: [],
      layout: 'single',
      light: 'warm',
      note: 'the worn patch is the only sign anyone still opens it',
    },
  ],
  // Twelve rooms of stacked bone, and the Chanter is keeping time for all of
  // it. Her verse is a ring of sound you get *outside* rather than behind, so
  // the area is built to teach the difference: rooms where backing away works
  // and rooms where only leaving the circle does.
  ossuary: [
    {
      key: 'the-bone-door',
      kind: 'stair',
      name: { en: 'The Bone Door', vi: 'Cửa Xương' },
      line: {
        en: 'Not carved to look like bone. Made of it, and fitted well.',
        vi: 'Không phải chạm cho giống xương. Làm bằng xương thật, và ghép rất khít.',
      },
      foes: [],
      layout: 'single',
      light: 'dark',
    },
    {
      key: 'the-antechamber',
      kind: 'hall',
      name: { en: 'The Antechamber', vi: 'Tiền Sảnh' },
      line: {
        en: 'A bench, a fire, and a place to leave your boots. Somebody was expected.',
        vi: 'Một băng ghế, một ngọn lửa, và chỗ để cởi giày. Ai đó từng được mong đợi.',
      },
      foes: [],
      layout: 'single',
      fire: true,
      light: 'warm',
    },
    {
      key: 'the-sorting-floor',
      kind: 'hall',
      name: { en: 'The Sorting Floor', vi: 'Sàn Phân Loại' },
      line: {
        en: 'Long tables, and the work is half done. The half that is done is very neat.',
        vi: 'Những chiếc bàn dài, công việc mới xong một nửa. Nửa đã xong thì rất ngăn nắp.',
      },
      foes: ['acolyte', 'acolyte', 'ghoul'],
      layout: 'spread',
      light: 'dim',
    },
    {
      key: 'the-femur-walk',
      kind: 'bridge',
      name: { en: 'The Femur Walk', vi: 'Lối Xương Đùi' },
      line: {
        en: 'A causeway built of the long bones, laid the same way, all of them.',
        vi: 'Một con đường đắp bằng xương dài, xếp cùng một chiều, không sót cái nào.',
      },
      foes: ['knightling'],
      layout: 'single',
      light: 'dark',
    },
    {
      key: 'the-skull-wall',
      kind: 'yard',
      name: { en: 'The Skull Wall', vi: 'Tường Sọ' },
      line: {
        en: 'They face outward. Whoever stacked them wanted them to be looking at something.',
        vi: 'Tất cả đều quay mặt ra ngoài. Người xếp chúng muốn chúng nhìn vào một thứ gì đó.',
      },
      foes: ['stonemask', 'ghoul'],
      layout: 'ambush',
      light: 'dim',
      note: 'a stonemask against a wall of faces — you cannot tell which one moved',
    },
    {
      key: 'the-echo',
      kind: 'cave',
      name: { en: 'The Echo', vi: 'Vọng Âm' },
      line: {
        en: 'Whatever you do here happens twice. The second time is behind you.',
        vi: 'Bạn làm gì ở đây cũng xảy ra hai lần. Lần thứ hai ở phía sau lưng.',
      },
      foes: ['moth', 'moth'],
      layout: 'ambush',
      light: 'dark',
      note: 'the sound cue lies here — the room teaches you to stop trusting your ears',
    },
    {
      key: 'the-lower-choir',
      kind: 'hall',
      name: { en: 'The Lower Choir', vi: 'Ca Đoàn Dưới' },
      line: {
        en: 'Rows of them, still in their places, and they have started keeping time.',
        vi: 'Từng hàng, vẫn đứng đúng chỗ, và chúng đã bắt đầu giữ nhịp.',
      },
      foes: ['acolyte', 'acolyte', 'acolyte', 'knightling'],
      layout: 'ring',
      light: 'dim',
      note: 'a rehearsal for the verse — the ring closes on a beat you can hear',
    },
    {
      key: 'the-reliquary',
      kind: 'hall',
      name: { en: 'The Reliquary', vi: 'Phòng Thánh Tích' },
      line: {
        en: 'Cases, mostly emptied, and one that has been opened from the inside.',
        vi: 'Những tủ kính, phần lớn đã trống, và một cái bị mở từ bên trong.',
      },
      foes: ['stonemask-heavy'],
      layout: 'single',
      light: 'warm',
    },
    {
      key: 'the-tallow-room',
      kind: 'cave',
      name: { en: 'The Tallow Room', vi: 'Phòng Nến Mỡ' },
      line: {
        en: 'They render something here to make the candles. There is a lot of candlelight.',
        vi: 'Người ta nấu thứ gì đó ở đây để làm nến. Và nến thì rất nhiều.',
      },
      foes: ['husk-torch', 'husk-torch', 'crawler-heavy'],
      layout: 'pack',
      light: 'warm',
    },
    {
      key: 'the-descant',
      kind: 'hall',
      name: { en: 'The Descant', vi: 'Bè Cao' },
      line: {
        en: 'A gallery above the nave, narrow, and four of them singing on it.',
        vi: 'Ban công hẹp phía trên gian giữa, và bốn đứa nó đang hát trên đó.',
      },
      foes: ['knightling', 'knightling', 'moth-swift', 'ghoul'],
      layout: 'ring',
      light: 'dim',
      note: 'the hardest room in the area, and the last one before the fire',
    },
    {
      key: 'the-cantors-step',
      kind: 'hall',
      name: { en: "The Cantor's Step", vi: 'Bậc Người Xướng' },
      line: {
        en: 'One step, worn in the middle, facing the loft. This is where she stood to begin.',
        vi: 'Một bậc đá, mòn lõm ở giữa, quay về phía gác. Đây là chỗ bà ta đứng để bắt nhịp.',
      },
      foes: [],
      layout: 'single',
      fire: true,
      light: 'warm',
    },
    {
      key: 'the-choir-loft',
      kind: 'fog',
      name: { en: 'The Choir Loft', vi: 'Gác Ca Đoàn' },
      line: {
        en: 'The bones are stacked in the shape of a choir, and the choir is facing her.',
        vi: 'Xương được xếp thành hình một dàn hợp xướng, và dàn hợp xướng đang hướng về bà ta.',
      },
      foes: [],
      layout: 'single',
      light: 'dim',
      note: 'the chanter — her verse is a ring: leave the circle, do not go behind her',
    },
  ],
  // A tower, so the area is read vertically: eight rooms stacked, each one
  // narrower than the last, and a rope down the middle of all of them. The
  // second fold is at the top — you cut the rope and it drops all the way to
  // the courtyard, which is the first time the world folds *downward*.
  bellfry: [
    {
      key: 'the-bell-stair',
      kind: 'stair',
      name: { en: 'The Bell Stair', vi: 'Cầu Thang Chuông' },
      line: {
        en: 'It spirals, and it is worn deepest on the outside edge. People came down it fast.',
        vi: 'Cầu thang xoắn, mòn sâu nhất ở mép ngoài. Người ta từng chạy xuống rất vội.',
      },
      foes: ['husk-spear'],
      layout: 'single',
      light: 'dim',
      note: 'a spear on a spiral — the wall does half its work for it',
    },
    {
      key: 'the-ringing-floor',
      kind: 'hall',
      name: { en: 'The Ringing Floor', vi: 'Sàn Kéo Chuông' },
      line: {
        en: 'Eight ropes through eight holes. Someone has tied seven of them off.',
        vi: 'Tám sợi dây xuyên qua tám cái lỗ. Ai đó đã buộc gọn bảy sợi.',
      },
      foes: [],
      layout: 'single',
      fire: true,
      light: 'warm',
    },
    {
      key: 'the-first-bell',
      kind: 'hall',
      name: { en: 'The First Bell', vi: 'Quả Chuông Đầu' },
      line: {
        en: 'Small, low, and still warm from being struck. Nothing here struck it.',
        vi: 'Nhỏ, treo thấp, và vẫn còn ấm vì vừa bị gõ. Chẳng có gì ở đây gõ nó cả.',
      },
      foes: ['acolyte', 'ghoul'],
      layout: 'spread',
      light: 'dim',
    },
    {
      key: 'the-frame',
      kind: 'bridge',
      name: { en: 'The Frame', vi: 'Khung Gỗ' },
      line: {
        en: 'Beams the width of your two feet, and a long way down between them.',
        vi: 'Những thanh dầm rộng bằng hai bàn chân, và giữa chúng là một khoảng rơi rất dài.',
      },
      foes: ['moth'],
      layout: 'ambush',
      light: 'dark',
      note: 'first moth — fastest thing in the game so far, on the narrowest floor',
    },
    {
      key: 'the-cracked-bell',
      kind: 'hall',
      name: { en: 'The Cracked Bell', vi: 'Chuông Nứt' },
      line: {
        en: 'Split from lip to crown. It still rings; it just rings wrong.',
        vi: 'Nứt từ vành lên đỉnh. Nó vẫn kêu; chỉ là kêu sai.',
      },
      foes: ['knightling', 'husk-heavy'],
      layout: 'spread',
      light: 'dim',
      note: 'two armoured things in a room with no room — the poise wall',
    },
    {
      key: 'the-roost',
      kind: 'cave',
      name: { en: 'The Roost', vi: 'Ổ' },
      line: {
        en: 'Above the bells, where nothing has been disturbed. Three of them lift at once.',
        vi: 'Phía trên đám chuông, nơi chưa gì bị quấy động. Ba con bay lên cùng một lúc.',
      },
      foes: ['moth', 'moth', 'moth-swift'],
      layout: 'pack',
      light: 'dark',
      note: 'the hardest room here: three fast fragile things, all at once',
    },
    {
      key: 'the-long-drop',
      kind: 'hall',
      name: { en: 'The Long Drop', vi: 'Khoảng Rơi Dài' },
      line: {
        en: 'The last rope, uncut, running all the way down to the yard you crossed on the first day.',
        vi: 'Sợi dây cuối cùng, chưa cắt, chạy suốt xuống cái sân bạn băng qua ngày đầu tiên.',
      },
      foes: [],
      layout: 'single',
      light: 'grey',
      note: 'the second fold, and the first that goes downward — empty, like the hatch',
    },
    {
      key: 'the-upper-door',
      kind: 'stair',
      name: { en: 'The Upper Door', vi: 'Cửa Trên' },
      line: {
        en: 'Out onto the roofs. From here you can see how much of this place there is.',
        vi: 'Ra thẳng mái nhà. Từ đây nhìn được nơi này rộng đến chừng nào.',
      },
      foes: ['knightling'],
      layout: 'single',
      light: 'grey',
    },
  ],
  // The other half of the fork, and deliberately the opposite of the wall.
  // The ramparts kill you with the edge; the chapelyard has no edges at all
  // and kills you with arithmetic — enclosed rooms, more of them than you,
  // and nowhere to back into. It is also where the singing starts.
  chapelyard: [
    {
      key: 'the-lychgate',
      kind: 'stair',
      name: { en: 'The Lychgate', vi: 'Cổng Đưa Tang' },
      line: {
        en: 'A roofed gate for setting a body down under. The roof is the only part still standing.',
        vi: 'Cái cổng có mái, dùng để đặt quan tài xuống nghỉ. Giờ chỉ còn cái mái là còn đứng.',
      },
      foes: [],
      layout: 'single',
      light: 'grey',
    },
    {
      key: 'the-porch',
      kind: 'hall',
      name: { en: 'The Porch', vi: 'Hiên Nhà Nguyện' },
      line: {
        en: 'Out of the rain at last, and there is a fire somebody keeps feeding.',
        vi: 'Cuối cùng cũng khuất mưa, và có một ngọn lửa ai đó vẫn tiếp củi.',
      },
      foes: [],
      layout: 'single',
      fire: true,
      light: 'warm',
    },
    {
      key: 'the-nave',
      kind: 'hall',
      name: { en: 'The Nave', vi: 'Gian Giữa' },
      line: {
        en: 'Long, and full of benches, and four of them are between you and the far end.',
        vi: 'Dài, đầy những băng ghế, và bốn đứa nó nằm giữa bạn và đầu bên kia.',
      },
      foes: ['husk', 'husk', 'acolyte', 'acolyte'],
      layout: 'spread',
      light: 'dim',
      note: 'the benches are cover, not decoration — four in the open would be too many',
    },
    {
      key: 'the-side-chapel',
      kind: 'cave',
      name: { en: 'The Side Chapel', vi: 'Nguyện Đường Phụ' },
      line: {
        en: 'A room off the room. Small enough that whatever is in it is already close.',
        vi: 'Một căn phòng nhỏ nép bên phòng lớn. Nhỏ đến mức thứ trong đó đã ở ngay sát bạn.',
      },
      foes: ['ghoul'],
      layout: 'ambush',
      light: 'dark',
    },
    {
      key: 'the-choir',
      kind: 'hall',
      name: { en: 'The Choir', vi: 'Ca Đoàn' },
      line: {
        en: 'Three rows facing each other, singing, and they close the aisle behind you.',
        vi: 'Ba hàng ghế đối mặt nhau, đang hát, và chúng khép lối đi lại sau lưng bạn.',
      },
      foes: ['acolyte', 'acolyte', 'acolyte'],
      layout: 'ring',
      light: 'dim',
      note: 'the first ring made of one enemy type — it is about the count, not the mix',
    },
    {
      key: 'the-crypt-stair',
      kind: 'stair',
      name: { en: 'The Crypt Stair', vi: 'Cầu Thang Hầm Mộ' },
      line: {
        en: 'Down, and the singing gets quieter, which is not the same as safer.',
        vi: 'Đi xuống, tiếng hát nhỏ dần — điều đó không đồng nghĩa với an toàn hơn.',
      },
      foes: ['husk-torch'],
      layout: 'single',
      light: 'dark',
    },
    {
      key: 'the-charnel',
      kind: 'cave',
      name: { en: 'The Charnel', vi: 'Nhà Chứa Xương' },
      line: {
        en: 'Stacked to the ceiling and sorted by length. Someone was very calm about this.',
        vi: 'Xếp lên tận trần và phân loại theo chiều dài. Ai đó đã làm việc này rất bình thản.',
      },
      foes: ['crawler', 'crawler', 'ghoul'],
      layout: 'pack',
      light: 'dark',
      note: 'no cover, no edges, three of them — the arithmetic room',
    },
    {
      key: 'the-bell-rope',
      kind: 'stair',
      name: { en: 'The Bell Rope', vi: 'Dây Chuông' },
      line: {
        en: 'A rope going up into the dark. Pulling it would be a decision.',
        vi: 'Một sợi dây chạy hút lên bóng tối. Kéo nó sẽ là một quyết định.',
      },
      foes: [],
      layout: 'single',
      light: 'dim',
      note: 'empty and quiet on purpose — the room before the stonemask',
    },
    {
      key: 'the-vestry',
      kind: 'hall',
      name: { en: 'The Vestry', vi: 'Phòng Áo Lễ' },
      line: {
        en: 'It has been standing in the corner long enough to be part of the wall.',
        vi: 'Nó đứng ở góc phòng lâu đến mức đã thành một phần của bức tường.',
      },
      foes: ['stonemask'],
      layout: 'ambush',
      light: 'dark',
      note: 'first stonemask — poise so high that trading is simply not available',
    },
    {
      key: 'the-ossuary-door',
      kind: 'hall',
      name: { en: 'The Ossuary Door', vi: 'Cửa Nhà Xương' },
      line: {
        en: 'Carved with a choir. The carving is a plan of what is on the other side.',
        vi: 'Chạm hình một dàn hợp xướng. Bức chạm là sơ đồ của thứ nằm bên kia cửa.',
      },
      foes: ['knightling'],
      layout: 'single',
      light: 'dim',
    },
  ],
  // Eleven rooms on top of a wall, and every one of them has an edge. The
  // Watchman's shove does twelve damage and wants the drop behind you — so
  // the area spends ten rooms teaching that the fall is worse than the hit,
  // and then hands you a boss whose cheapest move is a push.
  ramparts: [
    {
      key: 'the-tower-stair',
      kind: 'stair',
      name: { en: 'The Tower Stair', vi: 'Cầu Thang Tháp' },
      line: {
        en: 'Up and out into the weather. It has not stopped raining in some time.',
        vi: 'Đi lên, ra ngoài trời. Mưa đã không ngớt từ lâu.',
      },
      foes: [],
      layout: 'single',
      light: 'grey',
    },
    {
      key: 'the-roof-fire',
      kind: 'hall',
      name: { en: 'The Roof Fire', vi: 'Bếp Lửa Trên Mái' },
      line: {
        en: 'Under an awning, out of the rain, still burning. Someone was thorough.',
        vi: 'Dưới mái hiên, khuất mưa, vẫn cháy. Ai đó đã rất chu đáo.',
      },
      foes: [],
      layout: 'single',
      fire: true,
      light: 'warm',
    },
    {
      key: 'the-first-span',
      kind: 'bridge',
      name: { en: 'The First Span', vi: 'Nhịp Thứ Nhất' },
      line: {
        en: 'No rail on the left. It has been like that longer than the rail was there.',
        vi: 'Bên trái không có lan can. Nó thiếu lan can lâu hơn cả thời gian từng có.',
      },
      foes: ['husk-spear'],
      layout: 'single',
      light: 'grey',
      note: 'first edge — one spear, wide reach, and a drop to back into',
    },
    {
      key: 'the-arrow-slits',
      kind: 'hall',
      name: { en: 'The Arrow Slits', vi: 'Lỗ Châu Mai' },
      line: {
        en: 'Narrow windows and things behind them that can reach you through.',
        vi: 'Những khe cửa hẹp, và phía sau chúng là thứ có thể với tới bạn.',
      },
      foes: ['husk-spear', 'husk-spear'],
      layout: 'spread',
      light: 'dim',
      note: 'reach from cover — the room wants you to walk past, not clear it',
    },
    {
      key: 'the-broken-merlon',
      kind: 'yard',
      name: { en: 'The Broken Merlon', vi: 'Ụ Tường Vỡ' },
      line: {
        en: 'A gap in the battlement wide enough for two. The wind comes through it.',
        vi: 'Một khoảng tường vỡ đủ rộng cho hai người. Gió lùa qua đó.',
      },
      foes: ['ghoul', 'ghoul', 'hound'],
      layout: 'pack',
      light: 'grey',
      note: 'fast things beside a hole — the first room that kills by geometry',
    },
    {
      key: 'the-siege-ladder',
      kind: 'stair',
      name: { en: 'The Siege Ladder', vi: 'Thang Công Thành' },
      line: {
        en: 'Still leaning where they left it. They are still coming up it.',
        vi: 'Vẫn dựng nguyên chỗ chúng bỏ lại. Và chúng vẫn đang leo lên.',
      },
      foes: ['husk', 'husk', 'husk-heavy'],
      layout: 'ambush',
      light: 'dim',
      note: 'they arrive one at a time from below — hold the top and it is free',
    },
    {
      key: 'the-brazier-walk',
      kind: 'bridge',
      name: { en: 'The Brazier Walk', vi: 'Lối Lửa Hiệu' },
      line: {
        en: 'A line of iron baskets, all cold but one. Something keeps that one lit.',
        vi: 'Một hàng giỏ sắt, lạnh hết, trừ một cái. Có thứ gì đó vẫn giữ cái đó cháy.',
      },
      foes: ['acolyte', 'husk-torch'],
      layout: 'spread',
      light: 'warm',
    },
    {
      key: 'the-collapsed-span',
      kind: 'bridge',
      name: { en: 'The Collapsed Span', vi: 'Nhịp Sập' },
      line: {
        en: 'The middle is gone. There is a plank across it and it is not wide.',
        vi: 'Khúc giữa mất rồi. Có một tấm ván bắc qua, và nó không rộng.',
      },
      foes: ['hound-swift', 'hound-swift'],
      layout: 'pack',
      light: 'grey',
      note: 'fast, narrow, and a real gap — the hardest room before the fire',
    },
    {
      key: 'the-old-signal',
      kind: 'hall',
      name: { en: 'The Old Signal', vi: 'Trạm Hiệu Cũ' },
      line: {
        en: 'A shuttered lamp for talking to the next wall. Nobody has answered in years.',
        vi: 'Ngọn đèn có cánh chắn, dùng để ra hiệu sang tường bên. Nhiều năm rồi không ai đáp.',
      },
      foes: ['knightling'],
      layout: 'single',
      light: 'dim',
      note: 'first knightling — armour, poise, and it does not stagger from one hit',
    },
    {
      key: 'the-watchpost',
      kind: 'hall',
      name: { en: 'The Watchpost', vi: 'Chòi Canh' },
      line: {
        en: 'His chair, his brazier, his view of the road. He is not in it.',
        vi: 'Ghế của ông ta, lò lửa của ông ta, tầm nhìn ra con đường. Ông ta không có ở đó.',
      },
      foes: [],
      layout: 'single',
      fire: true,
      light: 'warm',
    },
    {
      key: 'the-north-tower',
      kind: 'fog',
      name: { en: 'The North Tower', vi: 'Tháp Bắc' },
      line: {
        en: 'The top of the wall, and the only thing up here still doing its job.',
        vi: 'Đỉnh tường thành, và thứ duy nhất trên này vẫn còn làm phận sự.',
      },
      foes: [],
      layout: 'single',
      light: 'grey',
      note: 'the watchman — his shove is cheap and the drop behind you is not',
    },
  ],
  // Where the first fold lives. Eight rooms of standing water and then a
  // hatch in the floor that drops you into the undercroft — the room you
  // started in, four areas ago. That moment is the whole reason this world is
  // a graph and not a list, so the room it happens in is built for it: quiet,
  // lit, and with nothing in it to interrupt you noticing.
  cistern: [
    {
      key: 'the-inflow',
      kind: 'cave',
      name: { en: 'The Inflow', vi: 'Miệng Nước Vào' },
      line: {
        en: 'The drain empties here. So does everything the drain was carrying.',
        vi: 'Cống đổ ra ở đây. Và mọi thứ cống mang theo cũng vậy.',
      },
      foes: [],
      layout: 'single',
      light: 'dark',
    },
    {
      key: 'the-dry-shelf',
      kind: 'hall',
      name: { en: 'The Dry Shelf', vi: 'Gờ Khô' },
      line: {
        en: 'A ledge the water never reached, and somebody made the most of it.',
        vi: 'Một cái gờ nước không bao giờ với tới, và ai đó đã tận dụng nó rất tốt.',
      },
      foes: [],
      layout: 'single',
      fire: true,
      light: 'warm',
    },
    {
      key: 'the-pillar-field',
      kind: 'hall',
      name: { en: 'The Pillar Field', vi: 'Rừng Cột' },
      line: {
        en: 'A hundred pillars holding up a ceiling nobody has seen. Sound goes a long way here.',
        vi: 'Trăm cây cột đỡ một cái trần chẳng ai từng thấy. Tiếng động ở đây đi rất xa.',
      },
      foes: ['husk', 'husk-torch', 'crawler'],
      layout: 'spread',
      light: 'dark',
      note: 'they hear you before they see you — the pillars cut both ways',
    },
    {
      key: 'the-wading',
      kind: 'yard',
      name: { en: 'The Wading', vi: 'Chỗ Lội' },
      line: {
        en: 'Knee-deep, and your roll is slower in it. Theirs is not.',
        vi: 'Nước ngang gối, cú lăn của bạn chậm hẳn đi. Của chúng nó thì không.',
      },
      foes: ['ghoul', 'ghoul'],
      layout: 'pack',
      light: 'dim',
      note: 'first ghouls, in the one place your best defence is worst',
    },
    {
      key: 'the-sunken-arch',
      kind: 'bridge',
      name: { en: 'The Sunken Arch', vi: 'Vòm Chìm' },
      line: {
        en: 'The top of an arch, which means the rest of the arch is under your feet.',
        vi: 'Đỉnh một vòm cuốn — nghĩa là phần còn lại của cái vòm nằm dưới chân bạn.',
      },
      foes: ['husk-spear'],
      layout: 'single',
      light: 'dim',
    },
    {
      key: 'the-deep-end',
      kind: 'cave',
      name: { en: 'The Deep End', vi: 'Đáy Sâu' },
      line: {
        en: 'It gets over your head here. Whatever is down there has never needed to come up.',
        vi: 'Chỗ này ngập quá đầu. Thứ ở dưới đó chưa bao giờ cần phải trồi lên.',
      },
      foes: ['crawler', 'crawler-heavy'],
      layout: 'ambush',
      light: 'dark',
      note: 'two crawlers where footing is worst — the hardest room in the area',
    },
    {
      key: 'the-overspill',
      kind: 'stair',
      name: { en: 'The Overspill', vi: 'Miệng Tràn' },
      line: {
        en: 'Up, out of the water, and your legs are glad of it.',
        vi: 'Đi lên, ra khỏi nước, và đôi chân bạn mừng vì điều đó.',
      },
      foes: ['acolyte', 'husk'],
      layout: 'spread',
      light: 'dim',
    },
    {
      key: 'the-hatch',
      kind: 'hall',
      name: { en: 'The Hatch', vi: 'Nắp Hầm' },
      line: {
        en: 'A hatch, bolted from this side. Under it is the room you woke up in.',
        vi: 'Một nắp hầm, chốt từ phía này. Dưới nó là căn phòng bạn tỉnh dậy.',
      },
      foes: [],
      layout: 'single',
      light: 'warm',
      note: 'the first fold. Nothing in the room, on purpose — the realisation is the event',
    },
    {
      key: 'the-chapel-stair',
      kind: 'stair',
      name: { en: 'The Chapel Stair', vi: 'Cầu Thang Nhà Nguyện' },
      line: {
        en: 'Dry stone, and singing somewhere above it.',
        vi: 'Đá khô, và tiếng hát ở đâu đó phía trên.',
      },
      foes: ['acolyte'],
      layout: 'single',
      light: 'grey',
    },
  ],
  // The first fork. Everything before this was a corridor with the illusion
  // of choice; the gatehouse ends in two doors and does not tell you which is
  // easier, because neither is. It also introduces the acolyte, the first
  // thing here that fights on purpose rather than out of habit.
  gatehouse: [
    {
      key: 'the-portcullis',
      kind: 'stair',
      name: { en: 'The Portcullis', vi: 'Cửa Lưới Sắt' },
      line: {
        en: 'Down, and the teeth of it are still up. Somebody won an argument here.',
        vi: 'Lưới sắt đã hạ, mà răng của nó vẫn giơ lên. Ai đó từng thắng một cuộc cãi vã ở đây.',
      },
      foes: [],
      layout: 'single',
      light: 'grey',
    },
    {
      key: 'the-guardroom',
      kind: 'hall',
      name: { en: 'The Guardroom', vi: 'Phòng Trực' },
      line: {
        en: 'Dry, and warm, and the chairs are still facing the fire.',
        vi: 'Khô ráo, ấm áp, và những chiếc ghế vẫn quay mặt về phía lửa.',
      },
      foes: [],
      layout: 'single',
      fire: true,
      light: 'warm',
    },
    {
      key: 'the-murder-hole',
      kind: 'hall',
      name: { en: 'The Murder Hole', vi: 'Lỗ Giết Người' },
      line: {
        en: 'The ceiling is open in a neat square. The spear comes down, not across.',
        vi: 'Trần nhà mở một ô vuông ngay ngắn. Cây giáo thọc từ trên xuống, không phải từ ngang.',
      },
      foes: ['husk-spear'],
      layout: 'ambush',
      light: 'dim',
      note: 'the first attack from a direction the game has not used yet',
    },
    {
      key: 'the-barracks',
      kind: 'hall',
      name: { en: 'The Barracks', vi: 'Trại Lính' },
      line: {
        en: 'Three bunks, three of them, and none of them have got up in a long while.',
        vi: 'Ba cái giường, ba đứa nó, và đã lâu rồi không đứa nào ngồi dậy.',
      },
      foes: ['husk', 'husk', 'husk-heavy'],
      layout: 'spread',
      light: 'dim',
      note: 'they wake one at a time — the room rewards a quiet approach',
    },
    {
      key: 'the-armoury',
      kind: 'hall',
      name: { en: 'The Armoury', vi: 'Kho Vũ Khí' },
      line: {
        en: 'Racks, mostly empty. What is missing from them is standing in front of you.',
        vi: 'Những giá vũ khí, phần lớn đã trống. Thứ thiếu trên giá đang đứng trước mặt bạn.',
      },
      foes: ['husk-heavy', 'husk-spear'],
      layout: 'spread',
      light: 'dim',
      note: 'heavy plus reach — the first pair that punishes one bad roll',
    },
    {
      key: 'the-winch',
      kind: 'cave',
      name: { en: 'The Winch', vi: 'Buồng Tời' },
      line: {
        en: 'A drum of chain thicker than your arm. Something has been sleeping in the slack.',
        vi: 'Cuộn xích to hơn cánh tay bạn. Có thứ gì đó vẫn ngủ trong đám xích chùng.',
      },
      foes: ['crawler'],
      layout: 'ambush',
      light: 'dark',
    },
    {
      key: 'the-lantern-keeper',
      kind: 'hall',
      name: { en: 'The Lantern Keeper', vi: 'Người Giữ Đèn' },
      line: {
        en: 'It is not fighting you because you are here. It is fighting you because it is awake.',
        vi: 'Nó đánh bạn không phải vì bạn ở đây. Nó đánh bạn vì nó đang tỉnh.',
      },
      foes: ['acolyte'],
      layout: 'single',
      light: 'warm',
      note: 'first acolyte — the first enemy with intent rather than habit',
    },
    {
      key: 'the-long-hall',
      kind: 'hall',
      name: { en: 'The Long Hall', vi: 'Hành Lang Dài' },
      line: {
        en: 'Pillars, evenly spaced, and four of them using the pillars better than you are.',
        vi: 'Những cây cột cách đều, và bốn đứa nó dùng cột giỏi hơn bạn.',
      },
      foes: ['husk', 'husk-spear', 'acolyte', 'hound'],
      layout: 'ring',
      light: 'dim',
      note: 'the hardest room before the fork — the pillars are the answer',
    },
    {
      key: 'the-wall-walk',
      kind: 'bridge',
      name: { en: 'The Wall Walk', vi: 'Đường Trên Tường' },
      line: {
        en: 'Open on both sides, and they come along it fast. There is nowhere to stand but forward.',
        vi: 'Hai bên trống hoác, và chúng lao tới rất nhanh. Không có chỗ nào để đứng ngoài phía trước.',
      },
      foes: ['hound', 'hound-swift'],
      layout: 'pack',
      light: 'grey',
    },
    {
      key: 'the-two-doors',
      kind: 'hall',
      name: { en: 'The Two Doors', vi: 'Hai Cánh Cửa' },
      line: {
        en: 'One goes up to the wall. One goes down towards the bells. Nothing here tells you which.',
        vi: 'Một cửa dẫn lên tường thành. Một cửa dẫn xuống phía chuông. Chẳng có gì mách bạn nên đi cửa nào.',
      },
      foes: [],
      layout: 'single',
      light: 'grey',
      note: 'the first real fork — deliberately unsignposted, both are tier 2',
    },
  ],
  // Everything the city does not want ends up here, and so does the first
  // boss. Eight rooms of moving water: the area teaches footing, then takes
  // the floor away from you at the end of it.
  drainage: [
    {
      key: 'sluice-gate',
      kind: 'stair',
      name: { en: 'The Sluice Gate', vi: 'Cửa Cống' },
      line: {
        en: 'The wheel that shuts it rusted open. Nobody was ever coming back to close it.',
        vi: 'Bánh xe đóng cống rỉ cứng ở vị trí mở. Chẳng ai định quay lại đóng nó cả.',
      },
      foes: [],
      layout: 'single',
      light: 'dim',
    },
    {
      key: 'the-overflow',
      kind: 'bridge',
      name: { en: 'The Overflow', vi: 'Máng Tràn' },
      line: {
        en: 'Fast water under a narrow plank. They do not mind falling in. You will.',
        vi: 'Nước chảy xiết dưới tấm ván hẹp. Chúng nó rơi xuống cũng chẳng sao. Bạn thì có.',
      },
      foes: ['husk', 'husk-torch'],
      layout: 'single',
      light: 'dark',
      note: 'the torch is the only light — killing it makes the room harder to read',
    },
    {
      key: 'silt-bank',
      kind: 'yard',
      name: { en: 'The Silt Bank', vi: 'Bãi Bùn' },
      line: {
        en: 'Soft ground. Something under it has been waiting for footsteps.',
        vi: 'Đất mềm. Thứ nằm dưới đã chờ tiếng bước chân từ lâu.',
      },
      foes: ['crawler'],
      layout: 'ambush',
      light: 'grey',
      note: 'first crawler — slow, heavy poise, punishes panic-rolling into it',
    },
    {
      key: 'the-weir',
      kind: 'bridge',
      name: { en: 'The Weir', vi: 'Đập Tràn' },
      line: {
        en: 'Two spears on the far side, and one way across. They know that.',
        vi: 'Hai cây giáo ở bờ bên kia, mà chỉ có một lối qua. Chúng nó biết điều đó.',
      },
      foes: ['husk-spear', 'husk-spear'],
      layout: 'spread',
      light: 'grey',
      note: 'the first room that is genuinely unfair if you rush it',
    },
    {
      key: 'drowned-cells',
      kind: 'cave',
      name: { en: 'The Drowned Cells', vi: 'Xà Lim Ngập' },
      line: {
        en: 'Cells with the water at chest height. Some of the doors are still locked.',
        vi: 'Những xà lim ngập nước ngang ngực. Vài cánh cửa vẫn còn khoá.',
      },
      foes: ['crawler', 'husk-torch'],
      layout: 'spread',
      light: 'dark',
    },
    {
      key: 'the-grate',
      kind: 'hall',
      name: { en: 'The Grate', vi: 'Song Chắn' },
      line: {
        en: 'A dead end with a grate you cannot lift, and three of them behind you.',
        vi: 'Ngõ cụt với tấm song bạn không nhấc nổi, và ba đứa nó phía sau lưng.',
      },
      foes: ['husk', 'husk-spear', 'crawler'],
      layout: 'ring',
      light: 'dark',
      note: 'the courtyard taught you to fear the ring; this one has no way out',
    },
    {
      key: 'the-keepers-step',
      kind: 'hall',
      name: { en: "The Keeper's Step", vi: 'Bậc Người Coi Cống' },
      line: {
        en: 'Dry stone, above the waterline. Somebody used to sit here and listen.',
        vi: 'Bậc đá khô, trên mực nước. Ai đó từng ngồi đây và lắng nghe.',
      },
      foes: [],
      layout: 'single',
      fire: true,
      light: 'warm',
      note: 'the fire before the first boss — close enough that dying is cheap',
    },
    {
      key: 'the-drain-head',
      kind: 'fog',
      name: { en: 'The Drain Head', vi: 'Đầu Cống' },
      line: {
        en: 'The room is a bowl and the bowl is full. It has been drinking here for years.',
        vi: 'Căn phòng là một cái lòng chảo, và lòng chảo thì đầy. Nó đã uống ở đây nhiều năm.',
      },
      foes: [],
      layout: 'single',
      light: 'dark',
      note: 'the bloated — the floor floods at half health and it swims, you wade',
    },
  ],
  // The first air you breathe. Open ground after seven rooms of drain, which
  // is why every fight here is about *space* rather than corridors — this is
  // where the game teaches that being surrounded is a thing that can happen.
  courtyard: [
    {
      key: 'gate-mouth',
      kind: 'stair',
      name: { en: 'The Gate Mouth', vi: 'Miệng Cổng' },
      line: {
        en: 'Daylight, of a sort. It has been raining for a long time.',
        vi: 'Có thứ gọi là ánh sáng ban ngày. Trời mưa đã lâu lắm rồi.',
      },
      foes: [],
      layout: 'single',
      light: 'grey',
    },
    {
      key: 'the-yard',
      kind: 'yard',
      name: { en: 'The Yard', vi: 'Khoảnh Sân' },
      line: {
        en: 'Three of them, well apart. You cannot fight all three at once, so do not.',
        vi: 'Ba đứa, đứng cách xa nhau. Bạn không đánh cùng lúc cả ba được, nên đừng.',
      },
      foes: ['husk', 'husk', 'husk-torch'],
      layout: 'spread',
      light: 'grey',
      note: 'first open ground — teaches pulling one at a time',
    },
    {
      key: 'the-well',
      kind: 'cave',
      name: { en: 'The Well', vi: 'Cái Giếng' },
      line: {
        en: 'Something came up out of it once. The lid is on the ground beside it.',
        vi: 'Có thứ gì đó từng bò lên từ đây. Nắp giếng nằm lăn bên cạnh.',
      },
      foes: ['hound-swift'],
      layout: 'ambush',
      light: 'dim',
      note: 'ambush — the one fast enemy the kennel already introduced',
    },
    {
      key: 'broken-cart',
      kind: 'hall',
      name: { en: 'The Broken Cart', vi: 'Chiếc Xe Gãy' },
      line: {
        en: 'Two spears behind a cart. The cart is the only reason this is fair.',
        vi: 'Hai cây giáo nấp sau chiếc xe. Chính chiếc xe làm chỗ này còn công bằng.',
      },
      foes: ['husk-spear', 'husk-spear'],
      layout: 'spread',
      light: 'grey',
      note: 'cover matters — two spears in the open would be unfair',
    },
    {
      key: 'the-shrine',
      kind: 'hall',
      name: { en: 'The Shrine', vi: 'Miếu Nhỏ' },
      line: {
        en: 'Nothing lives here. Someone left something, a long time ago.',
        vi: 'Không có gì sống ở đây. Ai đó để lại một thứ, từ rất lâu.',
      },
      foes: [],
      layout: 'single',
      light: 'warm',
      note: 'a breath between two hard rooms — pacing, not filler',
    },
    {
      key: 'north-walk',
      kind: 'bridge',
      name: { en: 'The North Walk', vi: 'Lối Đi Bắc' },
      line: {
        en: 'Narrow, with a drop on one side. They come at you in single file.',
        vi: 'Hẹp, một bên là vực. Chúng nó phải đi hàng một mà tới.',
      },
      foes: ['husk-torch', 'husk'],
      layout: 'single',
      light: 'grey',
      note: 'the reward room for anyone who learned the broken stair',
    },
    {
      key: 'the-thicket',
      kind: 'cave',
      name: { en: 'The Thicket', vi: 'Bụi Rậm' },
      line: {
        en: 'You hear the pack before you see it. That is the only warning you get.',
        vi: 'Bạn nghe thấy bầy chó trước khi thấy chúng. Chỉ được cảnh báo bấy nhiêu.',
      },
      foes: ['hound', 'hound', 'hound-swift'],
      layout: 'pack',
      light: 'dark',
      note: 'first pack — three fast things at once, deliberately near a way out',
    },
    {
      key: 'the-arch',
      kind: 'stair',
      name: { en: 'The Arch', vi: 'Vòm Cuốn' },
      line: {
        en: 'Up, at last. Whatever is above has been watching you cross the yard.',
        vi: 'Cuối cùng cũng lên cao. Thứ ở trên đã nhìn bạn băng qua sân từ nãy.',
      },
      foes: ['husk-heavy'],
      layout: 'single',
      light: 'dim',
      note: 'first heavy variant — same creature, twice the poise',
    },
    {
      key: 'the-outer-door',
      kind: 'hall',
      name: { en: 'The Outer Door', vi: 'Cửa Ngoài' },
      line: {
        en: 'They close around you here. Get your back to the door.',
        vi: 'Chúng khép vòng quanh bạn ở đây. Dựa lưng vào cửa mà đánh.',
      },
      foes: ['husk', 'husk', 'hound'],
      layout: 'ring',
      light: 'grey',
      note: 'first ring — the whole area was teaching you to avoid exactly this',
    },
  ],

  undercroft: [
    {
      key: 'cell',
      kind: 'hall',
      name: { en: 'The Cell', vi: 'Xà Lim' },
      line: {
        en: 'Straw, a drain, and a door someone left open a long time ago.',
        vi: 'Rơm, một cái cống, và cánh cửa ai đó bỏ ngỏ từ rất lâu rồi.',
      },
      foes: [],
      light: 'dim',
    },
    {
      key: 'ash-pit',
      kind: 'yard',
      name: { en: 'The Ash Pit', vi: 'Hố Tro' },
      line: {
        en: 'A fire that has been kept, badly, by nobody, for years.',
        vi: 'Một ngọn lửa được giữ, một cách tệ hại, bởi không ai, suốt nhiều năm.',
      },
      foes: [],
      fire: true,
      light: 'warm',
    },
    {
      key: 'long-drain',
      layout: 'spread',
      kind: 'bridge',
      name: { en: 'The Long Drain', vi: 'Rãnh Dài' },
      line: {
        en: 'Water runs the wrong way here. Two of them are standing in it.',
        vi: 'Nước ở đây chảy ngược. Hai đứa nó đang đứng trong đó.',
      },
      foes: ['husk', 'husk-torch'],
      light: 'dark',
    },
    {
      key: 'kennel',
      layout: 'pack',
      kind: 'cave',
      name: { en: 'The Kennel', vi: 'Chuồng Chó' },
      line: {
        en: 'It hears you before you are through the arch. It always does.',
        vi: 'Nó nghe thấy bạn trước khi bạn qua khỏi vòm cửa. Lúc nào cũng vậy.',
      },
      foes: ['hound', 'hound-swift'],
      light: 'dark',
      note: 'first fast enemy — teaches that rolling is not only for big swings',
    },
    {
      key: 'broken-stair',
      layout: 'single',
      kind: 'stair',
      name: { en: 'The Broken Stair', vi: 'Cầu Thang Gãy' },
      line: {
        en: 'Half the steps are gone. What is left is narrow enough to hold.',
        vi: 'Mất nửa số bậc. Chỗ còn lại hẹp vừa đủ để cầm chân chúng nó.',
      },
      foes: ['husk-spear'],
      light: 'dim',
      note: 'a spear in a chokepoint — the first room that rewards positioning',
    },
    {
      key: 'lamplighters-rest',
      layout: 'single',
      kind: 'hall',
      name: { en: "The Lamplighter's Rest", vi: 'Chỗ Nghỉ Người Thắp Đèn' },
      line: {
        en: 'Someone sat here with a lantern and did not get up again.',
        vi: 'Ai đó từng ngồi đây với cây đèn, và không đứng dậy nữa.',
      },
      foes: ['husk'],
      light: 'warm',
    },
    {
      key: 'undergate',
      layout: 'spread',
      kind: 'hall',
      name: { en: 'The Undergate', vi: 'Cổng Ngầm' },
      line: {
        en: 'Two ways out. Both of them are worse than here.',
        vi: 'Hai lối ra. Cả hai đều tệ hơn chỗ này.',
      },
      foes: ['husk', 'husk'],
      light: 'dim',
    },
  ],
};

// --- growing the rooms ----------------------------------------------------

function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const hash = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

export const ROOMS = [];
export const LINKS = [];

const push = (a, b, extra = {}) => LINKS.push({ a, b, ...extra });

for (const spot of AREAS) {
  const rng = seeded(hash(spot.id));
  const ids = [];
  // A hand-written area brings its own rooms; the generator only fills the
  // parts of the world nobody has got to yet.
  const written = HANDMADE[spot.id];
  if (written) spot.size = written.length;

  for (let i = 0; i < spot.size; i++) {
    const id = `${spot.id}:${i}`;
    const last = i === spot.size - 1;
    // Every area gets a fire, and a boss always has one in the room before
    // it. The walk back after dying is a tax on learning, and a 35-room walk
    // is not difficulty — it is a reason to stop playing.
    const isFire = i === 1 || (spot.boss && i === spot.size - 2);
    const isBoss = last && spot.boss;

    const pool = byTier(spot.tier);
    const count = isFire || isBoss ? 0 : 1 + Math.floor(rng() * 3);
    const foes = [];
    for (let f = 0; f < count; f++) foes.push(pool[Math.floor(rng() * pool.length)]);

    const hand = written && written[i];
    ROOMS.push({
      id,
      area: spot.id,
      tier: spot.tier,
      kind: isBoss
        ? 'fog'
        : hand
          ? (hand.fire ? 'bonfire' : hand.kind)
          : isFire
            ? 'bonfire'
            : ['hall', 'stair', 'bridge', 'cave', 'yard'][Math.floor(rng() * 5)],
      boss: isBoss ? spot.boss : undefined,
      foes: hand ? [...hand.foes] : foes,
      name: hand ? hand.name : undefined,
      line: hand ? hand.line : undefined,
      light: hand ? hand.light : undefined,
      note: hand ? hand.note : undefined,
      layout: hand ? hand.layout || (hand.foes.length ? 'spread' : 'single') : undefined,
      handmade: !!hand,
    });
    ids.push(id);
  }

  // A spine with the occasional loop, so an area is not a corridor.
  for (let i = 1; i < ids.length; i++) push(ids[i - 1], ids[i]);
  for (let i = 2; i < ids.length - 1; i++) {
    if (rng() < 0.3) push(ids[i - 2], ids[i]);
  }
  spot.entrance = ids[0];
  spot.exit = ids[ids.length - 1];
  spot.roomIds = ids;
}

const areaById = (id) => AREAS.find((a) => a.id === id);

for (const spot of AREAS) {
  for (const next of spot.to) {
    const target = areaById(next);
    if (target) push(spot.exit, target.entrance, { gate: `${spot.id}>${next}` });
  }
  if (spot.fold) {
    const target = areaById(spot.fold);
    // The fold lands you near the *start* of somewhere old — that is the
    // whole feeling: the world you struggled through becomes a corridor.
    push(spot.roomIds[Math.max(0, spot.roomIds.length - 2)], target.roomIds[1], {
      shortcut: `${spot.id}-fold`,
      shut: true,
      opensFrom: spot.roomIds[Math.max(0, spot.roomIds.length - 2)],
    });
  }
}

export const START = AREAS[0].roomIds[1];

// --- moving through it ----------------------------------------------------

export function newWorld() {
  return {
    at: START,
    /** The last fire you sat at: where you come back. */
    fire: START,
    opened: [],
    cleared: [],
    felled: [],
    seen: [START],
  };
}

const roomIndex = new Map(ROOMS.map((r) => [r.id, r]));
export const roomOf = (id) => roomIndex.get(id);

export function exitsFrom(world, id) {
  const out = [];
  for (const edge of LINKS) {
    if (edge.shut && !world.opened.includes(edge.shortcut)) continue;
    if (edge.a === id) out.push(edge.b);
    if (edge.b === id) out.push(edge.a);
  }
  return out;
}

export function reachable(world, from = world.at) {
  const seen = new Set([from]);
  const queue = [from];
  while (queue.length) {
    for (const next of exitsFrom(world, queue.shift())) {
      if (seen.has(next)) continue;
      seen.add(next);
      queue.push(next);
    }
  }
  return seen;
}

export function routeBetween(world, from, to) {
  if (from === to) return [from];
  const previous = new Map([[from, null]]);
  const queue = [from];
  while (queue.length) {
    const here = queue.shift();
    for (const next of exitsFrom(world, here)) {
      if (previous.has(next)) continue;
      previous.set(next, here);
      if (next === to) {
        const path = [next];
        let step = here;
        while (step !== null) {
          path.unshift(step);
          step = previous.get(step);
        }
        return path;
      }
      queue.push(next);
    }
  }
  return null;
}

export function moveTo(world, id) {
  if (!exitsFrom(world, world.at).includes(id)) return false;
  world.at = id;
  if (!world.seen.includes(id)) world.seen.push(id);
  if (roomOf(id).kind === 'bonfire') world.fire = id;
  return true;
}

/** A fold has to be earned from the long way round, or it is just a door. */
export function openShortcut(world, name) {
  const edge = LINKS.find((l) => l.shortcut === name);
  if (!edge || world.opened.includes(name)) return false;
  if (world.at !== edge.opensFrom) return false;
  world.opened.push(name);
  return true;
}

export function clearRoom(world, id) {
  if (!world.cleared.includes(id)) world.cleared.push(id);
  const room = roomOf(id);
  if (room.boss && !world.felled.includes(room.boss)) world.felled.push(room.boss);
  return world;
}

export function foesIn(world, id) {
  if (world.cleared.includes(id)) return [];
  return (roomOf(id).foes || []).map((kind) => ({ kind, ...FOES[kind] }));
}

// --- the measurements the design has to survive ---------------------------

export function depths() {
  const shut = { opened: [] };
  const out = new Map([[START, 0]]);
  const queue = [START];
  while (queue.length) {
    const here = queue.shift();
    for (const next of exitsFrom(shut, here)) {
      if (out.has(next)) continue;
      out.set(next, out.get(here) + 1);
      queue.push(next);
    }
  }
  return out;
}

export function threatOf(id) {
  return (roomOf(id).foes || []).reduce((sum, kind) => sum + FOES[kind].hp * FOES[kind].damage, 0);
}

export const BOSSES = AREAS.filter((a) => a.boss).map((a) => ({ id: a.boss, area: a.id, tier: a.tier }));
export const FIRES = ROOMS.filter((r) => r.kind === 'bonfire').map((r) => r.id);

/** How many rooms a fold saves off the walk from the nearest fire to the end. */
export function shortcutValue(name, target = AREAS[AREAS.length - 2].exit) {
  const shut = newWorld();
  const open = newWorld();
  open.opened = [name];
  let best = 0;
  for (const fire of FIRES) {
    const before = routeBetween(shut, fire, target);
    const after = routeBetween(open, fire, target);
    if (!before || !after) continue;
    best = Math.max(best, before.length - after.length);
  }
  return best;
}

export function fullyConnected() {
  const everything = { opened: LINKS.map((l) => l.shortcut).filter(Boolean) };
  return reachable(everything, START).size === ROOMS.length;
}

/** A room you can enter but never leave is not difficulty, it is a lost save. */
export function strandedRooms() {
  const shut = newWorld();
  return ROOMS.filter((room) => !FIRES.some((fire) => routeBetween(shut, room.id, fire))).map(
    (r) => r.id,
  );
}
