// The story, which is not told to you.
//
// There is no cutscene in this game and no narrator. What exists is a list of
// beats, each one gated on something you have actually done — a boss felled,
// an area walked, a weapon in your hand — and `storySoFar()` returns the ones
// you have earned, in order. Play differently and you learn it in a different
// order; skip enough and you finish holding the lantern without ever being
// told what it is for.
//
// The conditions are structured rather than written into the prose, for the
// same reason the room names are: the language button has to be able to
// re-read the whole history in another language, and it cannot do that if a
// beat's meaning is buried in an English sentence.
//
// Everything here was already on the page before this file existed. The kiln
// makes bodies, the orchard plants them, the clock times the lanterns, the
// mirrors throw the light down the mountain, and every torch in the world was
// lit from one flame. This file only says the thing all of that adds up to.

import { AREAS } from './world.js';
import { BOSS_IDS } from './bosses.js';
import { WEAPONS } from './arms.js';

/** Seven acts. A beat belongs to one, and acts do not overlap. */
export const CHAPTERS = [
  { id: 'waking', name: { en: 'Waking', vi: 'Tỉnh Dậy' } },
  { id: 'the-works', name: { en: 'The Works', vi: 'Xưởng' } },
  { id: 'the-supply', name: { en: 'The Supply', vi: 'Nguồn Cung' } },
  { id: 'the-others', name: { en: 'The Others', vi: 'Những Kẻ Trước' } },
  { id: 'the-schedule', name: { en: 'The Schedule', vi: 'Lịch Trình' } },
  { id: 'the-carrier', name: { en: 'The Carrier', vi: 'Người Cầm' } },
  { id: 'the-choice', name: { en: 'The Choice', vi: 'Lựa Chọn' } },
];

const beats = [];
/** id, chapter, condition, the beat itself. */
const beat = (id, chapter, when, text) => beats.push({ id, chapter, when, text });

// --- I. Waking ------------------------------------------------------------
beat('the-floor', 'waking', { seen: ['undercroft'] }, {
  en: 'You come up off a floor that is not stone and not soil. It is soft, and pale, and it goes down further than you want to check.',
  vi: 'Bạn gượng dậy khỏi một mặt sàn không phải đá cũng không phải đất. Nó mềm, nhợt, và ăn xuống sâu hơn mức bạn muốn kiểm chứng.',
});
beat('everything-is-lit', 'waking', { seen: ['courtyard'] }, {
  en: 'Nothing here has been maintained in a long time, and everything here is lit. Nobody finds that strange except you.',
  vi: 'Ở đây đã lâu không có gì được chăm nom, mà chỗ nào cũng có ánh sáng. Không ai thấy điều đó lạ, trừ bạn.',
});
beat('the-torches', 'waking', { felled: ['the-bloated'] }, {
  en: 'Half the things that attack you are carrying fire. None of them made it. You start noticing which hand it is in.',
  vi: 'Một nửa số thứ tấn công bạn đều mang lửa. Không con nào tự tạo ra được. Bạn bắt đầu để ý xem chúng cầm ở tay nào.',
});

// --- II. The Works --------------------------------------------------------
beat('the-posts', 'the-works', { seen: ['drainage', 'cistern'] }, {
  en: 'The whole city is standing on posts somebody drove. Under the water, under the drains, under all of it: work.',
  vi: 'Cả thành phố đứng trên những cây cọc do ai đó đóng xuống. Dưới mặt nước, dưới lòng cống, dưới tất cả: là công việc của người.',
});
beat('the-watch-was-never-relieved', 'the-works', { felled: ['the-watchman'] }, {
  en: 'He was posted and never relieved. Whoever set that watch intended to come back, and did not, and the watch held anyway.',
  vi: 'Ông được cắt gác và không bao giờ được thay ca. Người ra lệnh gác ấy đã định quay lại, rồi không quay lại, mà phiên gác thì vẫn cứ giữ.',
});
beat('a-tool-for-everything', 'the-works', { seen: ['forge', 'bone-orchard'] }, {
  en: 'A forge that is still lit. An orchard planted in rows. Every room in this world is a room for doing something in.',
  vi: 'Một lò rèn vẫn cháy. Một vườn cây trồng thành hàng. Mọi căn phòng trong thế giới này đều là phòng để làm một việc gì đó.',
});
beat('he-would-like-it-back', 'the-works', { felled: ['the-smith'] }, {
  en: 'He made most of what you are carrying. That is not a boast in a dead world — it means somebody was still supplying somebody.',
  vi: 'Ông làm ra phần lớn những gì bạn đang mang. Trong một thế giới đã chết, đó không phải lời khoe — nó nghĩa là vẫn có người tiếp tế cho ai đó.',
});

// --- III. The Supply ------------------------------------------------------
beat('lit-at-the-lantern', 'the-supply', { seen: ['the-lantern'] }, {
  en: 'Every torch in the world was lit at one flame. Not a saying. There is a small fire up here, and a queue worn into the floor beside it.',
  vi: 'Mọi bó đuốc trên đời đều mồi từ một ngọn lửa. Không phải câu ví. Trên này có một bếp lửa nhỏ, và cạnh nó là vệt xếp hàng mòn xuống mặt sàn.',
});
beat('the-mirrors', 'the-supply', { seen: ['the-lantern'] }, {
  en: 'The light does not fall down the mountain. It is thrown, off mirrors, and somebody re-aims them by hand.',
  vi: 'Ánh sáng không tự rơi xuống núi. Nó được hắt đi bằng gương, và có người vẫn chỉnh lại từng tấm bằng tay.',
});
beat('four-shelves', 'the-supply', { seen: ['the-lantern'] }, {
  en: 'The wick store has four full shelves. It does not say four out of how many, and that is the only question that matters up here.',
  vi: 'Kho bấc còn bốn kệ đầy. Nó không nói bốn trên bao nhiêu, mà đó lại là câu hỏi duy nhất đáng hỏi ở trên này.',
});
beat('made-not-born', 'the-supply', { seen: ['kiln'] }, {
  en: 'The mould racks are shelved by shape and labelled. You have fought every shape on those shelves. So this is where they come from.',
  vi: 'Giá khuôn xếp theo hình dáng và có dán nhãn. Bạn đã đánh nhau với mọi hình dáng trên các giá đó. Vậy ra chúng ra đời từ đây.',
});
beat('the-ash-falls', 'the-supply', { seen: ['kiln', 'undercroft'] }, {
  en: 'Ash is raked out of the kiln and it falls. It has been falling the whole time. The floor you woke up on is what it lands as.',
  vi: 'Tro được cào ra khỏi lò và nó rơi xuống. Nó đã rơi như thế suốt từ đầu. Mặt sàn bạn tỉnh dậy trên đó chính là chỗ nó đọng lại.',
});

// --- IV. The Others -------------------------------------------------------
beat('it-fights-like-you', 'the-others', { seen: ['cinder-gate'] }, {
  en: 'One of them rolls. Nothing else in this world rolls. It rolls at the exact moment you would have.',
  vi: 'Có một loài biết lăn. Không thứ gì khác trong thế giới này biết lăn. Nó lăn đúng vào khoảnh khắc mà bạn cũng sẽ lăn.',
});
beat('only-one-place', 'the-others', { felled: ['the-ember-knight'] }, {
  en: 'It learned that somewhere. There is only one road up this mountain, and there is only one place at the top of it.',
  vi: 'Nó học được điều đó ở đâu đó. Chỉ có một con đường lên ngọn núi này, và trên đỉnh chỉ có đúng một nơi.',
});
beat('the-rows', 'the-others', { felled: ['the-gardener'] }, {
  en: 'Somebody has been planting them in rows, at even spacing, at the same depth. Somebody has had a great deal of practice.',
  vi: 'Có người vẫn trồng chúng thành hàng, cách đều nhau, cùng một độ sâu. Có người đã làm việc đó quen tay lắm rồi.',
});
beat('the-drift', 'the-others', { seen: ['the-lantern', 'winding-stair'] }, {
  en: 'The moths go up the middle of the spiral, all of them, towards the top. Ankle deep at the top, all pointed the same way.',
  vi: 'Đàn bướm bay lên giữa lòng xoắn ốc, tất cả, hướng lên đỉnh. Trên đỉnh chúng ngập tới mắt cá chân, và đều quay về một hướng.',
});
beat('you-are-not-the-first', 'the-others', { felled: ['the-old-root'], seen: ['the-lantern'] }, {
  en: 'The step outside the lantern door is worn hollow in one spot, the width of two feet. One spot. Everyone stood in the same place.',
  vi: 'Bậc thềm ngoài cửa phòng đèn mòn lõm đúng một chỗ, rộng bằng hai bàn chân. Đúng một chỗ. Ai cũng đứng vào cùng vị trí ấy.',
});

// --- V. The Schedule ------------------------------------------------------
beat('the-clock-decides', 'the-schedule', { seen: ['clockwork'] }, {
  en: 'There is a clock that decides when the lanterns are lit. Somebody built it so nobody would have to remember.',
  vi: 'Có một cỗ đồng hồ quyết định khi nào các cây đèn được thắp. Ai đó dựng nó lên để không ai phải nhớ nữa.',
});
beat('it-has-been-wrong', 'the-schedule', { felled: ['the-hourwright'] }, {
  en: 'It has been wrong for years and it kept running. That is worse than it stopping, and everyone downstream carried on regardless.',
  vi: 'Nó chạy sai suốt nhiều năm mà vẫn cứ chạy. Điều đó còn tệ hơn là nó dừng hẳn, và mọi mắt xích phía dưới vẫn cứ tiếp tục như thường.',
});
beat('one-plant', 'the-schedule', { felled: ['the-old-root'] }, {
  en: 'Everything above ground in this world was one plant. It was not a forest. It was a crop, and something was thinking about it.',
  vi: 'Mọi thứ mọc trên mặt đất trong thế giới này từng là cùng một cái cây. Đó không phải rừng. Đó là một vụ mùa, và có thứ gì đó đang tính toán về nó.',
});
beat('nobody-is-coming', 'the-schedule', { felled: ['the-hourwright', 'the-slagborn'] }, {
  en: 'Nobody built any of this to trap you. It is a working world with nobody left in it, still doing the work, on a schedule that is wrong.',
  vi: 'Không ai dựng nên chỗ này để bẫy bạn. Đây là một thế giới đang vận hành mà chẳng còn ai, vẫn cứ làm việc, theo một lịch trình đã sai.',
});

// --- VI. The Carrier ------------------------------------------------------
beat('bricked-from-outside', 'the-carrier', { seen: ['kiln'] }, {
  en: 'The firing chamber is bricked shut from the outside every firing, and unbricked after. It is bricked now, and it was bricked from out here.',
  vi: 'Buồng nung bị xây bít từ bên ngoài mỗi mẻ, xong mới phá ra. Bây giờ nó đang bít, và nó bị bít từ phía ngoài này.',
});
beat('trying-to-go-out', 'the-carrier', { felled: ['the-first-flame'] }, {
  en: 'It was not defending itself. It was trying to go out. Everything in this world — the kiln, the clock, the mirrors — exists to stop it.',
  vi: 'Nó không tự vệ. Nó đang cố tắt đi. Mọi thứ trong thế giới này — lò nung, đồng hồ, dàn gương — tồn tại để ngăn điều đó.',
});
beat('one-handed', 'the-carrier', { felled: ['the-lantern-warden'] }, {
  en: 'It fought you one-handed the whole way. The other hand never once let go, and it never once considered letting go.',
  vi: 'Suốt trận nó chỉ đánh bằng một tay. Tay còn lại không một lần buông ra, và cũng không một lần nghĩ tới chuyện buông.',
});
beat('the-carrier-is-you', 'the-carrier', { felled: ['the-lantern-warden'], holds: ['the-open-lantern'] }, {
  en: 'Somebody has to carry it. Nobody said the carrier gets to put it down. You are standing in the worn spot on the step.',
  vi: 'Phải có ai đó cầm nó. Không ai nói người cầm được phép đặt nó xuống. Bạn đang đứng đúng vào chỗ mòn lõm trên bậc thềm.',
});

// --- VII. The Choice ------------------------------------------------------
beat('both-doors', 'the-choice', { felled: ['the-first-flame', 'the-lantern-warden'] }, {
  en: 'There are two things you can do with a flame that wants to go out, and only one of them has ever been tried.',
  vi: 'Có hai việc bạn có thể làm với một ngọn lửa đang muốn tắt, và từ trước tới nay người ta chỉ thử đúng một việc.',
});

export const BEATS = beats;

/**
 * The two endings. Both need the last two bosses down; what separates them is
 * what you are holding when you walk back into the chamber.
 */
export const ENDINGS = {
  carry: {
    name: { en: 'Carry It', vi: 'Cầm Lấy Nó' },
    when: { felled: ['the-first-flame', 'the-lantern-warden'], holds: ['the-open-lantern'] },
    text: {
      en: 'You light the wick from what is left and you take the step. The mirrors want re-aiming. The wick store has four full shelves. Somebody will come up the stair in a while and they will fight you, and you will be holding it one-handed.',
      vi: 'Bạn mồi bấc từ phần còn lại rồi bước lên bậc thềm. Dàn gương cần chỉnh lại. Kho bấc còn bốn kệ đầy. Ít lâu nữa sẽ có người leo lên cầu thang này và họ sẽ đánh bạn, còn bạn thì cầm cây đèn bằng một tay.',
    },
  },
  let: {
    name: { en: 'Let It Go Out', vi: 'Để Nó Tắt' },
    when: { felled: ['the-first-flame', 'the-lantern-warden'], holds: ['a-piece-of-the-flame'] },
    text: {
      en: 'You do not relight it. The mirrors go dark one bank at a time, all the way down the mountain, in the order the light was thrown. The kiln cools. Nothing further gets made. The moths stop coming up the stair, because there is nothing at the top to come up to.',
      vi: 'Bạn không mồi lại. Dàn gương tối đi từng dàn một, suốt dọc sườn núi, theo đúng thứ tự ánh sáng từng được hắt đi. Lò nung nguội. Không còn gì được chế ra nữa. Đàn bướm thôi bay lên cầu thang, vì trên đỉnh chẳng còn gì để bay tới.',
    },
  },
};

const met = (when, world) =>
  (when.felled || []).every((b) => world.felled.includes(b)) &&
  (when.seen || []).every((a) => world.seen.some((id) => id.startsWith(`${a}:`))) &&
  (when.holds || []).every((w) => (world.holds || []).includes(w));

/** The beats you have earned, in the order the acts run. */
export function storySoFar(world) {
  const order = CHAPTERS.map((c) => c.id);
  return BEATS.filter((b) => met(b.when, world)).sort(
    (a, b) => order.indexOf(a.chapter) - order.indexOf(b.chapter),
  );
}

/** Which ending you are standing in, if either. */
export const endingFor = (world) =>
  Object.keys(ENDINGS).find((k) => met(ENDINGS[k].when, world)) || null;

/** Everything a beat's condition points at, for checking it points at something. */
export function referencesOf(when) {
  return [
    ...(when.felled || []).map((id) => ['boss', id]),
    ...(when.seen || []).map((id) => ['area', id]),
    ...(when.holds || []).map((id) => ['weapon', id]),
  ];
}

export const KNOWN = {
  boss: new Set(BOSS_IDS),
  area: new Set(AREAS.map((a) => a.id)),
  weapon: new Set(Object.keys(WEAPONS)),
};
