// The bestiary proper: what the sixteen families are, what they look like,
// what their wind-up looks like from the front, and how you are supposed to
// beat them.
//
// Three rules held while writing this.
//
// A description is a promise the numbers have to keep. Every entry carries
// `pace` and `armour` tags, and `tests/lore.test.js` checks them against the
// real stat block in `world.js`. Calling something fast when it is slower
// than the median is a failing test, not a matter of taste.
//
// Nothing here says where a creature lives. That is read off the map by
// `areasOf()`, because hand-written geography rots the moment the map moves —
// which is exactly how the belfry ended up labelled four levels deep when the
// graph said seven.
//
// And the `look` field is not decoration. It is the drawing brief: joints,
// silhouette, what leads the walk. When these get drawn it will be from
// these sentences, so they are written to be built from, not admired.

import { FAMILY_STATS, FOES, ROOMS } from './world.js';

/** One entry per family. The variants are described once, in CARRY, below. */
export const LORE = {
  husk: {
    name: { en: 'Husk', vi: 'Vỏ Người' },
    line: {
      en: 'Someone who kept walking after there was nothing left to walk towards.',
      vi: 'Một người cứ đi tiếp sau khi chẳng còn gì để đi tới nữa.',
    },
    look: {
      en: 'Upright but hollow at the chest, head hung forward of the shoulders, arms that swing from the elbow and never the shoulder.',
      vi: 'Đứng thẳng nhưng lồng ngực rỗng, đầu gục về phía trước vai, hai tay đung đưa từ khuỷu chứ không bao giờ từ vai.',
    },
    tell: {
      en: 'The head lifts first. It always lifts before the arm moves, and it is the only warning you get.',
      vi: 'Đầu ngẩng lên trước. Nó luôn ngẩng trước khi tay động, và đó là lời báo duy nhất bạn nhận được.',
    },
    fight: {
      en: 'The first thing in the world, and the lesson: watch, wait, hit once, step back. Everything after this is that with less time.',
      vi: 'Thứ đầu tiên trong thế giới này, và cũng là bài học: nhìn, chờ, đánh một nhát, lùi lại. Mọi thứ về sau chỉ là như thế với ít thời gian hơn.',
    },
    pace: 'slow',
    armour: false,
  },
  hound: {
    name: { en: 'Hound', vi: 'Chó Săn' },
    line: {
      en: 'It was somebody’s, once. It still runs to heel — just not to yours.',
      vi: 'Nó từng thuộc về ai đó. Giờ vẫn chạy về gót chân — chỉ là không phải gót chân bạn.',
    },
    look: {
      en: 'Low, long, all shoulder and no hip, the back legs a beat behind the front. It runs on three good legs out of four.',
      vi: 'Thấp, dài, toàn vai không hông, hai chân sau chậm hơn chân trước một nhịp. Nó chạy bằng ba chân lành trên bốn.',
    },
    tell: {
      en: 'It stops. A hound that stops is a hound that has decided, and the stop is shorter than a heartbeat.',
      vi: 'Nó khựng lại. Chó săn mà khựng là chó săn đã quyết, và cái khựng ấy ngắn hơn một nhịp tim.',
    },
    fight: {
      en: 'Two hits kill it and one hit from it barely stings. Never fight one — you are always fighting four, and the fourth comes from behind.',
      vi: 'Hai nhát là chết, còn đòn của nó gần như không đau. Đừng bao giờ đánh một con — bạn luôn đánh bốn con, và con thứ tư tới từ phía sau.',
    },
    pace: 'fast',
    armour: false,
  },
  crawler: {
    name: { en: 'Crawler', vi: 'Kẻ Bò' },
    line: {
      en: 'The legs stopped working a long time ago and it did not consider that a reason to stop.',
      vi: 'Đôi chân hỏng từ rất lâu rồi, và nó không coi đó là lý do để dừng lại.',
    },
    look: {
      en: 'Weight thrown forward onto the forearms, legs dragging in a line behind, the shoulders overbuilt from doing the work of four limbs.',
      vi: 'Dồn cả sức nặng lên hai cẳng tay, chân lê thành một vệt phía sau, hai vai nở quá cỡ vì phải làm việc của bốn chi.',
    },
    tell: {
      en: 'It gathers — pulls both arms in under the chest — and the further it gathers the further it comes.',
      vi: 'Nó thu người — kéo cả hai tay vào dưới ngực — và thu càng sâu thì lao càng xa.',
    },
    fight: {
      en: 'Slow enough to walk away from, tough enough that walking away is often right. It cannot follow you up a step.',
      vi: 'Chậm đủ để bỏ đi, dai đủ để bỏ đi thường là đúng. Nó không leo nổi một bậc thang theo bạn.',
    },
    pace: 'slow',
    armour: false,
  },
  acolyte: {
    name: { en: 'Acolyte', vi: 'Tập Sinh' },
    line: {
      en: 'Still performing the rite. Nobody has come to the service in a very long time.',
      vi: 'Vẫn đang hành lễ. Đã rất lâu rồi không còn ai đến dự.',
    },
    look: {
      en: 'Robed to the floor so the feet never show, hands kept together at the sternum until the last instant, hood holding its shape over nothing.',
      vi: 'Áo dài chấm đất nên không bao giờ thấy bàn chân, hai tay chắp trước ngực tới tận giây cuối, mũ trùm giữ nguyên dáng dù bên trong trống rỗng.',
    },
    tell: {
      en: 'The hands come apart. That is the whole tell — it is a small movement and it is the only one.',
      vi: 'Hai tay rời nhau. Chỉ có thế — một cử động rất nhỏ, và là cử động duy nhất.',
    },
    fight: {
      en: 'Hits harder than it looks and dies about as fast as it looks. Punish the moment the hands part; do not wait to see what they are holding.',
      vi: 'Đánh mạnh hơn vẻ ngoài và chết cũng nhanh đúng như vẻ ngoài. Phạt ngay khi hai tay rời nhau; đừng chờ xem trong tay có gì.',
    },
    pace: 'even',
    armour: false,
  },
  knightling: {
    name: { en: 'Knightling', vi: 'Tiểu Kỵ' },
    line: {
      en: 'Trained properly, by somebody who meant it, at about half your size.',
      vi: 'Được rèn tử tế, bởi một người rèn thật lòng, ở tầm vóc bằng nửa bạn.',
    },
    look: {
      en: 'Small frame in mail cut down to fit, guard held high and honest, a shield strapped rather than gripped so it never drops.',
      vi: 'Thân nhỏ trong bộ giáp lưới cắt lại cho vừa, thế thủ giữ cao và ngay ngắn, khiên buộc vào tay chứ không cầm nên không bao giờ rơi.',
    },
    tell: {
      en: 'The shield drops an inch before it swings. It is the one flaw in an otherwise correct guard.',
      vi: 'Khiên hạ xuống một đốt tay trước khi vung. Đó là lỗi duy nhất trong một thế thủ vốn rất chuẩn.',
    },
    fight: {
      en: 'It will actually block you, which nothing before it does. Bait a swing, take the recovery — do not trade, you will lose the trade.',
      vi: 'Nó đỡ được đòn của bạn thật, điều mà chưa con nào trước đó làm được. Dụ nó vung, ăn vào lúc nó thu đòn — đừng đổi đòn, đổi là bạn thiệt.',
    },
    pace: 'even',
    armour: false,
  },
  ghoul: {
    name: { en: 'Ghoul', vi: 'Quỷ Ăn Xác' },
    line: {
      en: 'It is not hunting you. It is hunting what you will be shortly, and it is patient about the difference.',
      vi: 'Nó không săn bạn. Nó săn cái mà bạn sắp trở thành, và nó kiên nhẫn chờ khoảng cách đó.',
    },
    look: {
      en: 'Long in the arm and short in the body, knees permanently bent, moves in bursts of four or five steps and then stands very still.',
      vi: 'Tay dài mình ngắn, đầu gối lúc nào cũng gập, di chuyển thành từng đợt bốn năm bước rồi đứng im phăng phắc.',
    },
    tell: {
      en: 'The stillness. It goes quiet a half-beat before it comes, and that half-beat is all you get.',
      vi: 'Sự đứng im. Nó lặng đi nửa nhịp trước khi lao tới, và nửa nhịp đó là tất cả những gì bạn có.',
    },
    fight: {
      en: 'Fast, brittle, and it will circle behind you while something slower holds your attention. Kill the fast one first, always.',
      vi: 'Nhanh, giòn, và nó sẽ vòng ra sau lưng trong lúc một con chậm hơn giữ chân bạn. Luôn giết con nhanh trước.',
    },
    pace: 'fast',
    armour: false,
  },
  stonemask: {
    name: { en: 'Stonemask', vi: 'Mặt Nạ Đá' },
    line: {
      en: 'The mask was carved to be worn on one day of the year. It has been that day for a while.',
      vi: 'Chiếc mặt nạ được tạc để đeo đúng một ngày trong năm. Đã là ngày đó khá lâu rồi.',
    },
    look: {
      en: 'Heavy at the head and light everywhere else, so it walks braced backwards. The mask does not move with the face beneath it.',
      vi: 'Nặng ở đầu và nhẹ ở mọi chỗ khác, nên nó bước với thế người ngả ra sau. Mặt nạ không động theo khuôn mặt bên dưới.',
    },
    tell: {
      en: 'It turns the whole body to aim, because the neck cannot carry the mask sideways. You can see it deciding.',
      vi: 'Nó xoay cả người để nhắm, vì cổ không đỡ nổi mặt nạ khi nghiêng. Bạn nhìn thấy được nó đang quyết định.',
    },
    fight: {
      en: 'The first thing that shrugs off a full swing. Slow enough to circle; get behind it and it has to start the whole turn again.',
      vi: 'Thứ đầu tiên chịu trọn một nhát chém mà không nao. Chậm đủ để đi vòng; ra sau lưng là nó phải xoay lại từ đầu.',
    },
    pace: 'slow',
    armour: true,
  },
  moth: {
    name: { en: 'Moth', vi: 'Bướm Đêm' },
    line: {
      en: 'Every one of them is on its way to the same room, and none of them will get there.',
      vi: 'Con nào cũng đang trên đường đến cùng một căn phòng, và không con nào tới nơi.',
    },
    look: {
      en: 'Wings too large for the body, so it never flies straight — it falls in one direction and corrects. Nothing about it is load-bearing.',
      vi: 'Cánh quá lớn so với thân, nên chẳng bao giờ bay thẳng — nó rơi về một hướng rồi chỉnh lại. Không bộ phận nào của nó chịu lực được.',
    },
    tell: {
      en: 'It rises. Height is the wind-up; whatever goes up is coming down on you.',
      vi: 'Nó vọt lên cao. Độ cao chính là đòn lấy đà; cái gì lên thì sẽ rơi xuống người bạn.',
    },
    fight: {
      en: 'Almost nothing kills it slower than one clean hit, and almost nothing is harder to hit cleanly. Swing where it is going, not where it is.',
      vi: 'Gần như không gì giết nó chậm hơn một nhát trúng, và cũng gần như không gì khó đánh trúng hơn nó. Chém vào chỗ nó sắp tới, đừng chém chỗ nó đang đứng.',
    },
    pace: 'fast',
    armour: false,
  },
  warder: {
    name: { en: 'Warder', vi: 'Người Canh' },
    line: {
      en: 'Posted to a door. The door is gone. The post is not, so neither is it.',
      vi: 'Được cắt canh một cánh cửa. Cửa đã mất. Nhiệm vụ thì chưa, nên nó cũng chưa.',
    },
    look: {
      en: 'Squared off at the shoulders by a coat of plates, feet planted wide, and it recovers to the exact same stance every single time.',
      vi: 'Vai vuông ra vì tấm giáp lá, chân đứng rộng, và lần nào thu đòn xong nó cũng về đúng một thế duy nhất.',
    },
    tell: {
      en: 'The lead foot turns out. It cannot swing without setting that foot, and the foot is a long way from its weapon.',
      vi: 'Bàn chân trước xoay ra ngoài. Nó không vung nổi nếu chưa đặt chân đó, mà bàn chân thì cách vũ khí rất xa.',
    },
    fight: {
      en: 'It never breaks its own pattern, which makes it the safest hard thing in the world to learn on. Learn it here or learn it later.',
      vi: 'Nó không bao giờ phá vỡ khuôn mẫu của chính mình, nên đây là con khó mà an toàn nhất để tập. Học ở đây, hoặc học muộn hơn.',
    },
    pace: 'even',
    armour: true,
  },
  kiln: {
    name: { en: 'Kiln-Fired', vi: 'Đồ Nung' },
    line: {
      en: 'Made, not born. There is a rack in the kiln with its shape on the label, and a fresh one still standing beside it.',
      vi: 'Được chế ra, không phải sinh ra. Trong lò nung có một giá đỡ ghi đúng hình dáng nó trên nhãn, và một cái vừa ra lò vẫn còn đứng bên cạnh.',
    },
    look: {
      en: 'A body of fired clay with the crack lines still glowing, held together by the heat inside rather than by anything outside.',
      vi: 'Thân bằng đất nung với những đường nứt còn rực đỏ, giữ được hình là nhờ hơi nóng bên trong chứ không nhờ thứ gì bên ngoài.',
    },
    tell: {
      en: 'The cracks brighten. All the heat runs to one limb, and that is the limb that is about to be used.',
      vi: 'Các vết nứt sáng lên. Toàn bộ hơi nóng dồn về một chi, và đó chính là chi sắp ra đòn.',
    },
    fight: {
      en: 'Hits far harder than its size argues for. Bricks do not bleed, so the whole plan is not being where the bright limb goes.',
      vi: 'Đánh mạnh hơn nhiều so với vóc dáng. Gạch thì không chảy máu, nên cả kế hoạch chỉ là đừng đứng vào chỗ cái chi đang sáng ấy nhắm tới.',
    },
    pace: 'even',
    armour: false,
  },
  drowned: {
    name: { en: 'Drowned', vi: 'Kẻ Chết Đuối' },
    line: {
      en: 'The water left. It has not been told, and nobody is going to be the one to tell it.',
      vi: 'Nước đã rút. Chưa ai báo cho nó biết, và cũng chẳng ai định làm người đi báo.',
    },
    look: {
      en: 'Swollen and slow in the joints, arms drifting as if still buoyed, hair and cloth lifting on a current that stopped years ago.',
      vi: 'Sưng phù, khớp cứng đờ, hai tay trôi lửng như còn được nước nâng, tóc và vải bay theo dòng chảy đã ngừng từ nhiều năm trước.',
    },
    tell: {
      en: 'It sinks. The whole body drops a hand’s width before the blow, the way something heavy does before it swings.',
      vi: 'Nó chìm xuống. Cả thân người hạ xuống chừng một gang tay trước khi ra đòn, kiểu một vật nặng lấy đà.',
    },
    fight: {
      en: 'Slow, armoured, and it does not stagger, so trading is a losing plan told slowly. Roll through, hit twice, leave.',
      vi: 'Chậm, có giáp, và không hề choáng, nên đổi đòn là kế hoạch thua được kể chậm lại. Lăn xuyên qua, đánh hai nhát, rồi rút.',
    },
    pace: 'slow',
    armour: true,
  },
  chorister: {
    name: { en: 'Chorister', vi: 'Ca Đồng' },
    line: {
      en: 'It has held the same note since the roof came in, and it has not needed to breathe once.',
      vi: 'Nó ngân đúng một nốt từ ngày mái sập, và chưa một lần cần lấy hơi.',
    },
    look: {
      en: 'Head tipped back, throat open, hands loose at the sides — the whole posture built around the sound and not around the fight.',
      vi: 'Đầu ngửa ra sau, cổ họng mở, hai tay buông lỏng bên sườn — cả dáng người dựng quanh tiếng hát chứ không phải quanh trận đánh.',
    },
    tell: {
      en: 'The note changes pitch. It cannot strike and hold the note, so the moment the sound moves, so does it.',
      vi: 'Nốt nhạc đổi cao độ. Nó không thể vừa đánh vừa giữ nốt, nên tiếng vừa động là người cũng động.',
    },
    fight: {
      en: 'The heaviest hit you have met by the time you meet it, hung off the longest wind-up you have met. That trade is the whole game in one creature.',
      vi: 'Đòn nặng nhất bạn từng gặp tính đến lúc gặp nó, treo trên cú lấy đà dài nhất bạn từng gặp. Trao đổi đó chính là cả trò chơi gói trong một con.',
    },
    pace: 'even',
    armour: false,
  },
  ironclad: {
    name: { en: 'Ironclad', vi: 'Giáp Sắt' },
    line: {
      en: 'Sealed in at the shoulder by a smith who was paid to make sure it never came off.',
      vi: 'Bị hàn kín ở vai bởi một người thợ rèn được trả tiền để bảo đảm bộ giáp không bao giờ tháo ra được.',
    },
    look: {
      en: 'No seams and no face, a shell that walks. The joints are the only thin part and they are behind the knee and inside the elbow.',
      vi: 'Không đường nối, không mặt mũi, một cái vỏ biết đi. Chỗ mỏng duy nhất là các khớp, nằm sau đầu gối và trong khuỷu tay.',
    },
    tell: {
      en: 'A grinding sound half a second before anything visible moves. Hear it, then look.',
      vi: 'Một tiếng nghiến vang lên nửa giây trước khi có gì đó động đậy. Nghe trước, rồi hãy nhìn.',
    },
    fight: {
      en: 'It cannot be staggered by anything you own. You do not out-poise it, you out-wait it — its recovery is enormous and it is the only opening.',
      vi: 'Không thứ gì bạn có làm nó choáng được. Đừng đấu độ lì, hãy đấu độ kiên nhẫn — thời gian thu đòn của nó rất dài, và đó là khe hở duy nhất.',
    },
    pace: 'slow',
    armour: true,
  },
  wisp: {
    name: { en: 'Wisp', vi: 'Đóm Lửa Ma' },
    line: {
      en: 'A piece of the lantern that got loose. It is still trying to get back.',
      vi: 'Một mảnh của cây đèn sổng ra ngoài. Nó vẫn đang tìm đường về.',
    },
    look: {
      en: 'No body worth the name — a bright core with a trailing wake that shows you where it has been, never where it is going.',
      vi: 'Chẳng có thân thể gì đáng kể — một lõi sáng kéo theo vệt đuôi cho bạn thấy nó đã đi qua đâu, chứ không bao giờ cho biết nó sắp đi đâu.',
    },
    tell: {
      en: 'The wake shortens. It gathers into itself right before it crosses, and it crosses the whole room.',
      vi: 'Vệt đuôi ngắn lại. Nó co vào chính mình ngay trước khi lao, và nó lao suốt chiều dài căn phòng.',
    },
    fight: {
      en: 'The fastest thing in the world and the flimsiest. One connected swing ends it; connecting is the entire problem.',
      vi: 'Thứ nhanh nhất và cũng mong manh nhất thế giới. Một nhát trúng là xong; vấn đề nằm trọn ở chữ trúng.',
    },
    pace: 'fast',
    armour: false,
  },
  colossus: {
    name: { en: 'Colossus', vi: 'Khổng Lồ' },
    line: {
      en: 'Built at this size on purpose, by people who wanted something that could not be argued with.',
      vi: 'Được dựng to như vậy một cách có chủ ý, bởi những người muốn có thứ không ai cãi lại được.',
    },
    look: {
      en: 'Everything scaled up except the head, which was never the point. It takes one step where you take four, and the ground reports it.',
      vi: 'Mọi thứ đều phóng to trừ cái đầu, vốn chưa bao giờ là điều quan trọng. Nó bước một bước bằng bạn bốn bước, và mặt đất báo lại điều đó.',
    },
    tell: {
      en: 'The far foot leaves the ground. It has to load the whole body, and there is nothing subtle about a body that size loading.',
      vi: 'Bàn chân xa nhấc khỏi mặt đất. Nó phải dồn lực cả thân, và một cái thân cỡ ấy dồn lực thì chẳng có gì kín đáo.',
    },
    fight: {
      en: 'Everything it does is readable a room away and none of it is survivable. You have all the time in the world and exactly one mistake.',
      vi: 'Mọi đòn của nó đọc được từ cách một căn phòng, và không đòn nào chịu nổi. Bạn có thừa thời gian và đúng một lần được phép sai.',
    },
    pace: 'slow',
    armour: true,
  },
  shade: {
    name: { en: 'Shade', vi: 'Bóng' },
    line: {
      en: 'It fights the way you do. It learned somewhere, and there is only one place to have learned it.',
      vi: 'Nó đánh theo cách bạn đánh. Nó học ở đâu đó, mà chỗ để học được điều ấy thì chỉ có một.',
    },
    look: {
      en: 'Your silhouette with the details taken out — same height, same guard, same length of step, and no light lands on any of it.',
      vi: 'Chính bóng dáng bạn nhưng bị xoá hết chi tiết — cùng chiều cao, cùng thế thủ, cùng độ dài bước chân, và không tia sáng nào đậu lại trên đó.',
    },
    tell: {
      en: 'It rolls. Nothing else in the roster rolls, and it rolls at exactly the moment you would have.',
      vi: 'Nó lăn. Không con nào khác trong danh sách biết lăn, và nó lăn đúng vào khoảnh khắc mà bạn cũng sẽ lăn.',
    },
    fight: {
      en: 'Fast and hard at once, which nothing else manages. Every habit that carried you this far is a habit it already has.',
      vi: 'Vừa nhanh vừa nặng cùng lúc, điều không con nào khác làm được. Mọi thói quen đưa bạn tới được đây đều là thói quen nó đã có sẵn.',
    },
    pace: 'fast',
    armour: false,
  },
};

/**
 * What a creature is carrying. The family does not change — the numbers bend
 * around it — so these are described once here rather than seventy-five times.
 */
export const CARRY = {
  '': {
    name: { en: 'bare', vi: 'tay không' },
    line: {
      en: 'Nothing in its hands. The family as it comes, and the numbers you should learn first.',
      vi: 'Không cầm gì trong tay. Là dòng giống nguyên bản, và là bộ số bạn nên học đầu tiên.',
    },
  },
  '-spear': {
    name: { en: 'spear', vi: 'giáo' },
    line: {
      en: 'Reach longer by two fifths, and slower to bring round. It owns the space in front of it and nothing else — the fix is to be beside it.',
      vi: 'Tầm với dài thêm hai phần năm, và xoay trở chậm hơn. Nó làm chủ khoảng ngay trước mặt và không gì khác — cách hoá giải là đứng cạnh sườn nó.',
    },
  },
  '-torch': {
    name: { en: 'torch', vi: 'đuốc' },
    line: {
      en: 'Lighter, quicker, and it burns. Every torch in the world was lit at the lantern, which is why they are all still burning.',
      vi: 'Nhẹ hơn, nhanh hơn, và nó gây bỏng. Mọi bó đuốc trên đời đều mồi từ cây đèn, nên chúng vẫn còn cháy tới giờ.',
    },
  },
  '-heavy': {
    name: { en: 'heavy', vi: 'nặng' },
    line: {
      en: 'Loaded down with plate and shield. Hits harder, takes far more, and will not stagger — so stop trying to stagger it.',
      vi: 'Chất đầy giáp tấm và khiên. Đánh nặng hơn, chịu đòn dai hơn nhiều, và không hề choáng — nên đừng cố làm nó choáng nữa.',
    },
  },
  '-swift': {
    name: { en: 'swift', vi: 'nhẹ' },
    line: {
      en: 'Stripped of everything that slowed it down, including the armour it needed. It arrives first and it dies first.',
      vi: 'Vứt bỏ mọi thứ làm nó chậm lại, kể cả bộ giáp mà nó cần. Nó tới trước và cũng chết trước.',
    },
  },
};

export const FAMILY_IDS = Object.keys(LORE);

/**
 * Where a family actually lives, read off the finished map. Hand-writing this
 * is how a description starts lying: the map moves, the sentence does not.
 */
export function areasOf(family) {
  const seen = new Set();
  for (const room of ROOMS) {
    for (const id of room.foes) {
      if (FOES[id].family === family) seen.add(room.area);
    }
  }
  return [...seen];
}

/** Every concrete foe of a family, with what each one is carrying. */
export const variantsOf = (family) =>
  Object.keys(FOES).filter((id) => FOES[id].family === family);

/** The full entry for one concrete foe: family lore, carry note, real stats. */
export function describeFoe(id, lang = 'en') {
  const foe = FOES[id];
  const lore = LORE[foe.family];
  const carry = CARRY[id.slice(foe.family.length)];
  return {
    id,
    name: `${lore.name[lang]} (${carry.name[lang]})`,
    line: lore.line[lang],
    look: lore.look[lang],
    tell: lore.tell[lang],
    fight: lore.fight[lang],
    carry: carry.line[lang],
    stats: foe,
  };
}

/** Median speed across the families, so `pace` has something to be true about. */
export function medianSpeed() {
  const sorted = FAMILY_STATS.map((f) => f.speed).sort((a, b) => a - b);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}
