// The eighteen.
//
// Every one is written the same way: who it was, what it does, and what the
// second phase takes away from you. Numbers are in the same units as the
// Warden in rules.js — seconds for the frames, so a move here can be dropped
// straight into that fight loop without translation.
//
// The rule the tests enforce, on all of them: recovery is always longer than
// the active frames, and no wind-up is under 0.35s. A boss gets harder by
// giving you less time to *use* what you read, never by hiding it.

const move = (id, windup, active, recover, damage, reach, tell) => ({
  id,
  windup,
  active,
  recover,
  damage,
  reach,
  tell,
});

export const BESTIARY = {
  'the-bloated': {
    area: 'drainage',
    tier: 1,
    hp: 240,
    poise: 50,
    name: { en: 'The Bloated', vi: 'Kẻ Trương Phình' },
    line: {
      en: 'It drank the water the whole city drains into, and it kept drinking.',
      vi: 'Nó uống thứ nước mà cả thành phố thải xuống, rồi vẫn uống tiếp.',
    },
    moves: [
      move('wallow', 0.8, 0.16, 0.7, 16, [20, 130], 'it rolls its weight backwards first'),
      move('spew', 1.0, 0.3, 0.8, 20, [40, 220], 'the throat swells — leave the cone'),
      move('flop', 0.9, 0.12, 0.95, 24, [0, 110], 'it lifts, and everything under it dies'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'The floor floods. It moves faster in it than you do.', vi: 'Nước dâng. Trong nước nó nhanh hơn bạn.' },
      recoverScale: 0.82,
    },
  },
  'the-watchman': {
    area: 'ramparts',
    tier: 2,
    hp: 300,
    poise: 62,
    name: { en: 'The Watchman', vi: 'Người Canh Gác' },
    line: {
      en: 'Nobody relieved him. He is still doing the job, and you are on the wall.',
      vi: 'Không ai đến thay ca. Ông ta vẫn làm phận sự, còn bạn thì đang ở trên tường.',
    },
    moves: [
      move('halberd-sweep', 0.62, 0.14, 0.55, 19, [30, 190], 'the shaft goes back over his shoulder'),
      move('shove', 0.45, 0.1, 0.4, 12, [10, 90], 'a short push — it wants the drop behind you'),
      move('overhead', 1.0, 0.1, 0.9, 30, [10, 140], 'both hands up, a long beat, the biggest punish'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'He stops calling the alarm and starts closing distance.', vi: 'Ông ta thôi hô báo động và bắt đầu ép sát.' },
      recoverScale: 0.8,
    },
  },
  'the-chanter': {
    area: 'ossuary',
    tier: 3,
    hp: 340,
    poise: 46,
    name: { en: 'The Chanter', vi: 'Kẻ Tụng Kinh' },
    line: {
      en: 'The bones are stacked in the shape of a choir. She is keeping time for them.',
      vi: 'Xương được xếp thành hình một dàn hợp xướng. Bà ta đang giữ nhịp cho chúng.',
    },
    moves: [
      move('verse', 0.9, 0.2, 0.6, 18, [-160, 160], 'a ring of sound — get outside it, not behind her'),
      move('censer', 0.55, 0.12, 0.5, 17, [26, 150], 'the chain swings wide before it comes round'),
      move('kneel', 1.1, 0.4, 0.88, 26, [-90, 90], 'she kneels and the floor answers'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'The choir joins in. Two verses now, back to back.', vi: 'Dàn đồng ca hoà theo. Giờ là hai đoạn liền nhau.' },
      recoverScale: 0.78,
    },
  },
  'the-gilded': {
    area: 'solarium',
    tier: 4,
    hp: 380,
    poise: 70,
    name: { en: 'The Gilded', vi: 'Kẻ Mạ Vàng' },
    line: {
      en: 'They covered him in gold to honour him. He has not been able to move his face since.',
      vi: 'Người ta mạ vàng lên ông để tôn vinh. Từ đó ông không cử động nổi khuôn mặt mình nữa.',
    },
    moves: [
      move('gleam', 0.75, 0.14, 0.6, 21, [24, 170], 'light runs down the blade before it moves'),
      move('crown-toss', 0.85, 0.25, 0.7, 19, [60, 300], 'thrown — it comes back, so do not stand still after'),
      move('genuflect', 1.05, 0.12, 0.85, 32, [10, 130], 'he bows. What follows is not a bow'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'The gold cracks off him in sheets and he can finally move.', vi: 'Vàng nứt ra từng mảng, và cuối cùng ông ta cử động được.' },
      recoverScale: 0.74,
    },
  },
  'the-drowned-king': {
    area: 'marsh',
    tier: 4,
    hp: 420,
    poise: 84,
    name: { en: 'The Drowned King', vi: 'Vua Chết Đuối' },
    line: {
      en: 'He walked into the marsh with his court behind him. The court is still behind him.',
      vi: 'Ông ta lội vào đầm với cả triều đình theo sau. Triều đình vẫn còn theo sau.',
    },
    moves: [
      move('tide-pull', 0.9, 0.3, 0.65, 17, [-200, 200], 'the water leans towards him first'),
      move('sceptre', 0.7, 0.14, 0.6, 24, [30, 180], 'the sceptre lifts one beat early'),
      move('court-call', 1.15, 0.2, 0.9, 22, [-140, 140], 'he calls, and three of them stand up'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'The court no longer waits to be called.', vi: 'Triều đình không đợi được gọi nữa.' },
      recoverScale: 0.8,
    },
  },
  'the-smith': {
    area: 'forge',
    tier: 5,
    hp: 460,
    poise: 96,
    name: { en: 'The Smith', vi: 'Người Thợ Rèn' },
    line: {
      en: 'He made most of what you are carrying. He would like it back.',
      vi: 'Phần lớn thứ bạn đang cầm là do ông ta rèn. Ông ta muốn lấy lại.',
    },
    moves: [
      move('hammer-fall', 1.0, 0.12, 0.85, 34, [10, 140], 'the hammer goes up and the room goes quiet'),
      move('tongs', 0.5, 0.1, 0.45, 18, [20, 120], 'quick, and it grabs — do not be there'),
      move('quench', 0.85, 0.35, 0.7, 20, [-170, 170], 'steam, in a ring, from the trough'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'He stops working the metal and starts working you.', vi: 'Ông ta thôi rèn sắt và bắt đầu rèn bạn.' },
      recoverScale: 0.76,
    },
  },
  'the-gardener': {
    area: 'bone-orchard',
    tier: 5,
    hp: 430,
    poise: 60,
    name: { en: 'The Gardener', vi: 'Người Làm Vườn' },
    line: {
      en: 'Something has to plant them in rows. She has been very patient about it.',
      vi: 'Phải có ai đó trồng chúng thành hàng. Bà ta đã rất kiên nhẫn với việc đó.',
    },
    moves: [
      move('prune', 0.6, 0.14, 0.52, 20, [28, 175], 'the shears open — that is your beat'),
      move('sow', 0.95, 0.3, 0.75, 18, [-180, 180], 'she scatters, and the ground answers a moment later'),
      move('uproot', 1.05, 0.14, 0.9, 30, [10, 120], 'she reaches into the soil for something long'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'The rows stand up. She keeps gardening around them.', vi: 'Những hàng cây đứng dậy. Bà ta vẫn làm vườn giữa chúng.' },
      recoverScale: 0.8,
    },
  },
  'the-tide': {
    area: 'drowned-city',
    tier: 6,
    hp: 500,
    poise: 74,
    name: { en: 'The Tide', vi: 'Con Nước' },
    line: {
      en: 'Not a person. It wears the street it came down, and the street is still moving.',
      vi: 'Không phải một con người. Nó khoác lên mình con phố nó tràn qua, và con phố vẫn đang trôi.',
    },
    moves: [
      move('surge', 0.8, 0.34, 0.6, 22, [0, 260], 'it gathers at the far wall — roll through, not away'),
      move('undertow', 0.95, 0.22, 0.8, 20, [-190, 190], 'the floor pulls before it hits'),
      move('break', 1.1, 0.14, 0.9, 33, [10, 150], 'it rears. Everything under it goes flat'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'It stops receding between waves.', vi: 'Nó thôi rút đi giữa các đợt sóng.' },
      recoverScale: 0.72,
    },
  },
  'the-keeper': {
    area: 'spire',
    tier: 6,
    hp: 470,
    poise: 66,
    name: { en: 'The Keeper', vi: 'Người Trông Coi' },
    line: {
      en: 'She keeps the stair. Not from anything — she simply keeps it.',
      vi: 'Bà ta trông coi cầu thang. Không phải để chống ai — bà ta chỉ trông coi nó.',
    },
    moves: [
      move('descend', 0.72, 0.3, 0.66, 23, [0, 200], 'she steps down through you'),
      move('lash', 0.55, 0.12, 0.5, 19, [30, 165], 'short, fast, and it comes twice'),
      move('toll', 1.0, 0.25, 0.82, 27, [-150, 150], 'the bell above her rings first'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'The bell rings on its own now, and she moves on it.', vi: 'Chuông tự ngân, và bà ta chuyển động theo tiếng chuông.' },
      recoverScale: 0.74,
    },
  },
  'the-shepherd': {
    area: 'pale-wood',
    tier: 6,
    hp: 520,
    poise: 88,
    name: { en: 'The Shepherd', vi: 'Người Chăn' },
    line: {
      en: 'The pale wood is a flock. He is not protecting it from you.',
      vi: 'Rừng nhợt là một đàn gia súc. Ông ta không bảo vệ nó khỏi bạn đâu.',
    },
    moves: [
      move('crook', 0.68, 0.14, 0.58, 22, [30, 185], 'the crook hooks before it swings'),
      move('whistle', 0.9, 0.18, 0.72, 16, [-200, 200], 'two notes. The trees answer the second'),
      move('drive', 0.78, 0.32, 0.7, 26, [0, 230], 'he walks you backwards into the flock'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'He stops whistling and the wood keeps moving anyway.', vi: 'Ông ta ngừng huýt sáo, mà rừng vẫn cứ chuyển động.' },
      recoverScale: 0.76,
    },
  },
  'the-ember-knight': {
    area: 'cinder-gate',
    tier: 7,
    hp: 540,
    poise: 92,
    name: { en: 'The Ember Knight', vi: 'Hiệp Sĩ Than Hồng' },
    line: {
      en: 'The armour is the only thing holding the fire in the shape of a person.',
      vi: 'Bộ giáp là thứ duy nhất giữ ngọn lửa ở hình dạng một con người.',
    },
    moves: [
      move('sear', 0.6, 0.14, 0.52, 24, [26, 175], 'the blade brightens along its length'),
      move('charge', 0.75, 0.34, 0.68, 28, [0, 240], 'it comes at you — roll into it'),
      move('collapse', 1.05, 0.16, 0.88, 36, [-120, 120], 'the armour opens and everything comes out'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'The armour stops closing between attacks.', vi: 'Bộ giáp thôi khép lại giữa các đòn.' },
      recoverScale: 0.7,
    },
  },
  'the-astronomer': {
    area: 'star-well',
    tier: 8,
    hp: 560,
    poise: 58,
    name: { en: 'The Astronomer', vi: 'Nhà Thiên Văn' },
    line: {
      en: 'He went down the well to see the sky better. He was right.',
      vi: 'Ông ta xuống đáy giếng để nhìn bầu trời rõ hơn. Ông ta đã đúng.',
    },
    moves: [
      move('transit', 0.85, 0.22, 0.7, 25, [-210, 210], 'a slow line crosses the floor — it is a schedule'),
      move('parallax', 0.6, 0.12, 0.55, 21, [30, 170], 'he is not where he appears for one beat'),
      move('eclipse', 1.2, 0.35, 0.9, 34, [-160, 160], 'the room darkens from the edges inward'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'Two transits at once, crossing.', vi: 'Hai đường quá cảnh cùng lúc, cắt nhau.' },
      recoverScale: 0.72,
    },
  },
  'the-old-root': {
    area: 'root-deep',
    tier: 8,
    hp: 620,
    poise: 120,
    name: { en: 'The Old Root', vi: 'Rễ Già' },
    line: {
      en: 'Everything above ground in this world is one plant. This is the part that thinks.',
      vi: 'Mọi thứ mọc trên mặt đất ở thế giới này là một cái cây. Đây là phần biết nghĩ.',
    },
    moves: [
      move('grasp', 0.95, 0.18, 0.8, 26, [-170, 170], 'the floor lifts where it will close'),
      move('lash', 0.62, 0.14, 0.55, 23, [40, 210], 'one root, fast, from the side you are not watching'),
      move('deepen', 1.25, 0.4, 0.95, 38, [-140, 140], 'it pulls down. Standing still is the mistake'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'It stops using roots and starts using the room.', vi: 'Nó thôi dùng rễ và bắt đầu dùng cả căn phòng.' },
      recoverScale: 0.76,
    },
  },
  'the-slagborn': {
    area: 'slag',
    tier: 9,
    hp: 600,
    poise: 104,
    name: { en: 'The Slagborn', vi: 'Kẻ Sinh Từ Xỉ' },
    line: {
      en: 'What the forge threw away, cooling for a hundred years into a shape with intent.',
      vi: 'Thứ lò rèn vứt đi, nguội dần trăm năm thành một hình hài có ý đồ.',
    },
    moves: [
      move('pour', 0.9, 0.36, 0.72, 27, [-180, 180], 'it tips, and what comes out stays hot'),
      move('scab', 0.55, 0.12, 0.5, 22, [24, 160], 'a crust flakes off first'),
      move('reforge', 1.15, 0.16, 0.92, 37, [10, 150], 'it hardens, then it swings once'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'It stops cooling between moves.', vi: 'Nó thôi nguội đi giữa các đòn.' },
      recoverScale: 0.7,
    },
  },
  'the-hourwright': {
    area: 'clockwork',
    tier: 10,
    hp: 650,
    poise: 90,
    name: { en: 'The Hourwright', vi: 'Thợ Chế Giờ' },
    line: {
      en: 'She built the clock that decides when the lanterns are lit. It has been wrong for years.',
      vi: 'Bà ta chế ra cái đồng hồ quyết định giờ thắp đèn. Nó chạy sai đã nhiều năm rồi.',
    },
    moves: [
      move('escapement', 0.6, 0.14, 0.5, 26, [28, 180], 'tick — the same beat, every time, forever'),
      move('mainspring', 0.8, 0.3, 0.68, 29, [0, 250], 'she winds, then releases across the floor'),
      move('strike-twelve', 1.3, 0.5, 0.95, 40, [-200, 200], 'twelve of them. Count, and move on the count'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'The clock runs fast. Everything she does is on the new beat.', vi: 'Đồng hồ chạy nhanh lên. Mọi đòn của bà ta theo nhịp mới.' },
      recoverScale: 0.68,
    },
  },
  'the-crucible-twins': {
    area: 'crucible',
    tier: 10,
    hp: 340,
    poise: 56,
    twin: true,
    name: { en: 'The Crucible Twins', vi: 'Cặp Song Sinh Lò Luyện' },
    line: {
      en: 'One of them is the fire and one of them is the vessel. They will not tell you which.',
      vi: 'Một đứa là lửa, một đứa là cái lò. Chúng sẽ không nói cho bạn biết đứa nào.',
    },
    moves: [
      move('cross', 0.6, 0.14, 0.5, 22, [24, 170], 'they swing towards each other, and you are between'),
      move('pass', 0.75, 0.28, 0.62, 25, [0, 230], 'one throws the fire to the other, through you'),
      move('seal', 1.1, 0.2, 0.85, 33, [-150, 150], 'they meet in the middle. Do not be in the middle'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'Kill one and the other takes both jobs, and both movesets.', vi: 'Giết một đứa thì đứa kia nhận cả hai vai, và cả hai bộ đòn.' },
      recoverScale: 0.66,
    },
  },
  'the-first-flame': {
    area: 'kiln',
    tier: 11,
    hp: 700,
    poise: 130,
    name: { en: 'The First Flame', vi: 'Ngọn Lửa Đầu Tiên' },
    line: {
      en: 'It is not defending itself. It is trying to go out, and you are in the way.',
      vi: 'Nó không tự vệ. Nó đang cố tắt đi, và bạn thì đứng chắn đường.',
    },
    moves: [
      move('gutter', 0.7, 0.16, 0.58, 28, [-190, 190], 'it dims, and the dark is the dangerous part'),
      move('flare', 0.85, 0.3, 0.7, 32, [0, 250], 'it reaches, once, all the way across'),
      move('kindle', 1.35, 0.45, 1.0, 42, [-170, 170], 'the longest tell in the world, and the last one'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'It stops trying to go out.', vi: 'Nó thôi không cố tắt nữa.' },
      recoverScale: 0.66,
    },
  },
  'the-lantern-warden': {
    area: 'the-lantern',
    tier: 11,
    hp: 720,
    poise: 140,
    name: { en: 'The Lantern Warden', vi: 'Người Gác Đèn' },
    line: {
      en: 'Somebody has to carry it. Nobody said the carrier gets to put it down.',
      vi: 'Phải có ai đó cầm cây đèn. Không ai nói người cầm được phép đặt nó xuống.',
    },
    moves: [
      move('sweep', 0.62, 0.14, 0.52, 26, [26, 200], 'the lantern arm goes back'),
      move('slam', 1.0, 0.1, 0.9, 40, [10, 160], 'both hands overhead, the longest punish in the fight'),
      move('lunge', 0.72, 0.34, 0.72, 32, [0, 260], 'it crosses the room — roll into it, never away'),
    ],
    phase2: {
      at: 0.5,
      change: { en: 'The lantern opens. Everything recovers faster, nothing telegraphs less.', vi: 'Cây đèn mở ra. Mọi đòn hồi nhanh hơn, không đòn nào bớt báo trước.' },
      recoverScale: 0.76,
    },
  },
};

export const BOSS_IDS = Object.keys(BESTIARY);

/** Every move a boss has, including the ones its second phase hands it. */
export const movesOf = (id) => BESTIARY[id].moves;

/** How long one attack occupies the boss, at a given phase. */
export const lengthOf = (m, phase = 1, scale = 1) =>
  m.windup + m.active + m.recover * (phase >= 2 ? scale : 1);
