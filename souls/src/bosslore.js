// The eighteen, written out properly.
//
// `bosses.js` holds what a boss *is* — health, poise, three moves with their
// frames. This holds what it is *for*: how it is built, what the room it
// stands in is doing, which of its three moves you are supposed to live off,
// and what its death changes.
//
// The `punish` field is the load-bearing one. Every boss in this game obeys
// the same law — its heaviest attack is also its longest recovery, so the
// thing that can kill you outright is the thing you get paid for reading. The
// field names that move, and `tests/bosslore.test.js` checks the name against
// the frame data for all eighteen. If someone tunes a boss so its big hit
// stops being its best opening, that is a failing test rather than a player
// slowly learning the fight is unfair.
//
// `look` is a drawing brief, same as in the bestiary: silhouette, joints,
// what moves first. Nothing here is written to be admired, it is written to
// be built from.

import { BESTIARY, BOSS_IDS } from './bosses.js';
import { ROOMS } from './world.js';

export const BOSS_LORE = {
  'the-bloated': {
    look: {
      en: 'Wider than it is tall, no neck, skin drum-tight and shining. It moves by falling in a direction and catching itself.',
      vi: 'Bè ngang hơn là cao, không có cổ, da căng như mặt trống và bóng nhẫy. Nó đi bằng cách đổ về một hướng rồi chống lại.',
    },
    arena: {
      en: 'A sump with a lip around it. The lip is the only dry footing and it is also the only place it can corner you.',
      vi: 'Một hố lắng có gờ vòng quanh. Cái gờ là chỗ khô duy nhất, và cũng là chỗ duy nhất nó dồn được bạn vào góc.',
    },
    punish: 'flop',
    fight: {
      en: 'Nothing it does is quick and nothing it does is small. Stay off the lip, let it commit to the flop, and take the second it spends getting up.',
      vi: 'Không đòn nào của nó nhanh và cũng không đòn nào nhỏ. Tránh xa cái gờ, để nó dốc sức vào cú đè, rồi lấy trọn giây nó bò dậy.',
    },
    turn: {
      en: 'The floor floods and it swims where you wade. The fix is to stop moving so much, not to move faster.',
      vi: 'Sàn ngập nước và nó bơi ở chỗ bạn phải lội. Cách gỡ là bớt di chuyển lại, chứ không phải di chuyển nhanh hơn.',
    },
    after: {
      en: 'The sump drains. Half the drainage becomes walkable, which is the first time the world gets smaller instead of bigger.',
      vi: 'Hố lắng rút cạn. Nửa khu thoát nước đi lại được, lần đầu tiên thế giới nhỏ lại thay vì lớn thêm.',
    },
  },
  'the-watchman': {
    look: {
      en: 'Tall, thin, a coat too big for him and a helm he has not taken off in years. He stands the way tired men stand: one hip locked.',
      vi: 'Cao, gầy, khoác áo quá khổ và đội chiếc mũ giáp nhiều năm không cởi. Ông đứng theo kiểu người mệt: một bên hông cứng đờ.',
    },
    arena: {
      en: 'A rampart walk with no rail on one side. He knows exactly where that side is at all times.',
      vi: 'Đường tường thành không có lan can ở một bên. Lúc nào ông cũng biết chính xác bên đó ở đâu.',
    },
    punish: 'overhead',
    fight: {
      en: 'The shove is not an attack, it is a question about where you are standing. Fight with your back to the wall side and the answer stops mattering.',
      vi: 'Cú đẩy không phải đòn tấn công, mà là câu hỏi bạn đang đứng ở đâu. Đánh với lưng quay về phía có tường thì câu trả lời không còn quan trọng.',
    },
    turn: {
      en: 'He stops calling the alarm. Nobody was coming anyway, and now he is spending that breath on closing the gap.',
      vi: 'Ông thôi hô báo động. Vốn chẳng ai tới, và giờ ông dùng hơi đó để rút ngắn khoảng cách.',
    },
    after: {
      en: 'The alarm bell stays quiet for the rest of the game. Everything on the ramparts had been listening for it.',
      vi: 'Chuông báo động im lặng suốt phần còn lại của trò chơi. Mọi thứ trên tường thành vẫn luôn dỏng tai chờ tiếng đó.',
    },
  },
  'the-chanter': {
    look: {
      en: 'Kneeling height even when she stands, robes pooled around her, one hand keeping time on the air and never stopping.',
      vi: 'Đứng lên rồi vẫn thấp như đang quỳ, áo lễ xoã quanh chân, một tay gõ nhịp vào không khí và không bao giờ ngưng.',
    },
    arena: {
      en: 'A bone choir stacked in tiers on three sides. The fourth side is the door and she never puts herself between you and it.',
      vi: 'Dàn xương xếp thành tầng ở ba mặt. Mặt thứ tư là cửa, và bà không bao giờ chắn giữa bạn với nó.',
    },
    punish: 'kneel',
    fight: {
      en: 'The verse is a ring, so the answer is outward, never around. Behind her is inside the ring and it is the most common way to die here.',
      vi: 'Bài tụng lan thành vòng, nên lối thoát là ra ngoài, đừng vòng quanh. Đứng sau lưng bà là đứng trong vòng, và đó là cách chết phổ biến nhất ở đây.',
    },
    turn: {
      en: 'The choir joins in and the verses come back to back. The gap between them is the fight; there is still a gap.',
      vi: 'Dàn đồng ca hoà theo và các đoạn tụng nối liền nhau. Khe hở giữa chúng chính là trận đánh; khe hở vẫn còn đó.',
    },
    after: {
      en: 'The stacks stop being in tune. Several ossuary rooms go quiet, and quiet is how you find the doors.',
      vi: 'Những chồng xương thôi khớp nhịp. Vài phòng trong nhà xương lặng đi, và chính sự lặng ấy giúp bạn tìm ra các cánh cửa.',
    },
  },
  'the-gilded': {
    look: {
      en: 'A man-shaped ingot. The gold is thickest at the face, so the face is the part that cannot move at all.',
      vi: 'Một thỏi vàng mang hình người. Vàng dày nhất ở khuôn mặt, nên khuôn mặt là phần hoàn toàn không cử động được.',
    },
    arena: {
      en: 'A glass hall built to catch the sun. Every surface throws his own light back at him and none of it helps.',
      vi: 'Một gian kính dựng để hứng nắng. Mọi bề mặt hắt ánh sáng của chính ông trở lại, và chẳng ích gì.',
    },
    punish: 'genuflect',
    fight: {
      en: 'The crown comes back. Everything about the fight is fine until you celebrate a dodge by standing still where it left.',
      vi: 'Vương miện sẽ bay ngược lại. Mọi thứ trong trận đều ổn cho tới khi bạn ăn mừng một cú né bằng cách đứng yên đúng chỗ nó vừa rời đi.',
    },
    turn: {
      en: 'The gold cracks off in sheets and he can finally move. He is faster without the honour than he ever was with it.',
      vi: 'Vàng nứt ra thành từng mảng và cuối cùng ông cử động được. Không còn vinh dự trên người, ông nhanh hơn hẳn lúc còn mang nó.',
    },
    after: {
      en: 'The solarium keeps throwing light down into the gatehouse. That is the fold, and it is now lit.',
      vi: 'Gian kính vẫn hắt sáng xuống nhà cổng. Đó chính là lối tắt, và giờ nó đã có ánh sáng.',
    },
  },
  'the-drowned-king': {
    look: {
      en: 'Crowned, robed, and standing in water that reaches his knees wherever he goes. The court is always exactly behind him.',
      vi: 'Đội vương miện, khoác long bào, và đi tới đâu nước cũng ngập tới gối tới đó. Triều thần luôn ở đúng phía sau lưng ông.',
    },
    arena: {
      en: 'Marsh with firm ground in patches. The patches are where the court is standing, which is the whole cruelty of the room.',
      vi: 'Đầm lầy có vài mảng đất cứng. Những mảng ấy chính là chỗ triều thần đang đứng, và đó là toàn bộ sự ác nghiệt của căn phòng.',
    },
    punish: 'court-call',
    fight: {
      en: 'Kill the court between calls, not during them. Three standing at once is a different fight and it is not one you win.',
      vi: 'Diệt triều thần vào giữa các lần gọi, đừng diệt lúc đang gọi. Ba tên cùng đứng dậy là một trận khác hẳn, và là trận bạn không thắng.',
    },
    turn: {
      en: 'The court no longer waits to be called. The call was the only warning and it is gone; the tide-pull is now the warning.',
      vi: 'Triều thần không còn đợi được gọi. Tiếng gọi từng là lời báo duy nhất và nay đã mất; giờ cú kéo nước thay vào chỗ đó.',
    },
    after: {
      en: 'The marsh stops leaning. Water goes back to running downhill, which opens two paths that used to be current.',
      vi: 'Đầm lầy thôi nghiêng. Nước trở lại chảy xuôi, mở ra hai lối trước kia là dòng xiết.',
    },
  },
  'the-smith': {
    look: {
      en: 'Enormous through the shoulders and burned to the elbow on both arms. He never puts the hammer down, even to walk.',
      vi: 'Vai nở khủng khiếp và cả hai cánh tay cháy sém tới khuỷu. Ông không bao giờ đặt búa xuống, kể cả khi đi.',
    },
    arena: {
      en: 'His own forge, still lit, still tidy. The trough, the anvil and the coals are all where a working smith would want them.',
      vi: 'Chính lò rèn của ông, vẫn cháy, vẫn gọn gàng. Máng tôi, đe và than đều nằm đúng chỗ một người thợ đang làm việc muốn chúng nằm.',
    },
    punish: 'hammer-fall',
    fight: {
      en: 'He fights like the craftsman he is: the tongs set you up, the hammer finishes. Break the setup and there is no finish.',
      vi: 'Ông đánh đúng như một người thợ: cái kìm dọn chỗ, cây búa kết liễu. Phá được bước dọn chỗ thì không còn cú kết liễu.',
    },
    turn: {
      en: 'He stops working the metal and starts working you. Same craft, same rhythm, different object on the anvil.',
      vi: 'Ông thôi rèn kim loại và bắt đầu rèn bạn. Vẫn tay nghề đó, vẫn nhịp đó, chỉ đổi vật nằm trên đe.',
    },
    after: {
      en: 'The forge stays lit and unattended. Everything you carry that he made keeps working, which is worse than if it stopped.',
      vi: 'Lò rèn vẫn cháy và không còn ai trông. Mọi thứ ông làm ra mà bạn đang mang vẫn dùng tốt, điều đó còn tệ hơn là nếu chúng hỏng.',
    },
  },
  'the-gardener': {
    look: {
      en: 'Aproned, gloved, unhurried. She carries shears in one hand the entire fight and uses the other hand for everything else.',
      vi: 'Đeo tạp dề, mang găng, thong thả. Suốt trận bà cầm kéo tỉa ở một tay và dùng tay còn lại cho mọi việc khác.',
    },
    arena: {
      en: 'The oldest planting, fully grown, in rows. She works along a row while fighting you and does not lose her place.',
      vi: 'Luống trồng lâu năm nhất, đã lớn hết cỡ, xếp thành hàng. Bà vừa đánh vừa làm dọc theo hàng và không hề mất chỗ đang làm.',
    },
    punish: 'uproot',
    fight: {
      en: 'She is not in a hurry because the rows are doing the work. Fight down the row, never across it, or you meet all of it at once.',
      vi: 'Bà không vội vì đã có mấy luống cây làm thay. Hãy đánh dọc theo hàng, đừng cắt ngang, không thì bạn gặp cả hàng cùng lúc.',
    },
    turn: {
      en: 'The rows stand up and she keeps gardening around them. She was never the crowd control; she was the reason for the crowd.',
      vi: 'Cả luống đứng dậy còn bà thì vẫn làm vườn quanh chúng. Bà chưa bao giờ là kẻ điều khiển đám đông; bà là lý do có đám đông.',
    },
    after: {
      en: 'The shears go back on their peg, in order of size, in the tool store. The empty peg is filled and the room finally reads.',
      vi: 'Cây kéo được treo trở lại đúng đinh của nó, xếp theo cỡ, trong phòng kho dụng cụ. Cái đinh trống đã có chủ và căn phòng cuối cùng cũng đọc được.',
    },
  },
  'the-tide': {
    look: {
      en: 'A wave holding the shape of a street: railings, shutters and a cart turning over inside it, all still moving.',
      vi: 'Một con sóng mang hình dáng con phố: lan can, cửa chớp và một chiếc xe kéo lộn nhào bên trong, tất cả vẫn đang chuyển động.',
    },
    arena: {
      en: 'A flooded avenue with the sea at one end. There is no far wall — the far wall is where it gathers from.',
      vi: 'Một đại lộ ngập nước với biển ở một đầu. Không có bức tường phía xa — chỗ đó là nơi nó dồn nước lại.',
    },
    punish: 'break',
    fight: {
      en: 'Roll into the surge and you pass through the thin part. Roll away and you spend the whole wave inside it.',
      vi: 'Lăn ngược vào con sóng thì bạn xuyên qua phần mỏng của nó. Lăn ra xa thì bạn nằm trong lòng sóng suốt cả đợt.',
    },
    turn: {
      en: 'It stops receding between waves. The rest between attacks was the sea breathing, and it has stopped breathing.',
      vi: 'Nó thôi rút lui giữa các đợt sóng. Quãng nghỉ giữa hai đòn từng là hơi thở của biển, và biển đã ngừng thở.',
    },
    after: {
      en: 'The water level drops one storey across the drowned city. Roofs you fought on become halls you walk through.',
      vi: 'Mực nước khắp thành phố chìm hạ xuống một tầng. Những mái nhà bạn từng đánh nhau trên đó trở thành các gian phòng để đi qua.',
    },
  },
  'the-keeper': {
    look: {
      en: 'Straight-backed, hands empty until they are not, and she is always one step higher than you on the stair.',
      vi: 'Lưng thẳng, tay không cầm gì cho tới lúc có, và trên cầu thang bà luôn đứng cao hơn bạn đúng một bậc.',
    },
    arena: {
      en: 'The spire stair itself, with the bell hung above the last flight. The fight is vertical and the floor is never level.',
      vi: 'Chính cầu thang tháp chuông, với quả chuông treo trên nhịp cuối. Trận đánh diễn ra theo chiều dọc và sàn không bao giờ bằng phẳng.',
    },
    punish: 'toll',
    fight: {
      en: 'Height is her whole advantage, so take the step. Fighting from below means every one of her moves gets the drop for free.',
      vi: 'Độ cao là toàn bộ lợi thế của bà, nên hãy giành lấy bậc thang. Đánh từ dưới lên nghĩa là mọi đòn của bà đều được cộng thêm thế đổ xuống miễn phí.',
    },
    turn: {
      en: 'The bell rings on its own and she moves on it. The warning is still there — it just is not hers any more.',
      vi: 'Chuông tự ngân lên và bà cử động theo nó. Lời báo vẫn còn đó — chỉ là không còn thuộc về bà nữa.',
    },
    after: {
      en: 'The stair is unkept. Nothing guards it, and nothing has maintained it either, which you find out on the way down.',
      vi: 'Cầu thang không còn ai trông. Chẳng gì canh giữ nó, mà cũng chẳng gì tu sửa nó, điều bạn phát hiện ra trên đường xuống.',
    },
  },
  'the-shepherd': {
    look: {
      en: 'Weathered, unarmoured, carrying a crook and nothing else. He is the only boss who is not obviously dead.',
      vi: 'Dày dạn sương gió, không mặc giáp, chỉ mang theo một cây gậy móc. Ông là boss duy nhất trông không rõ ràng là đã chết.',
    },
    arena: {
      en: 'A clearing in the pale wood with the trees closer on every side than they were a minute ago.',
      vi: 'Một khoảng trống trong rừng nhợt, với hàng cây mỗi lúc một sát vào hơn so với một phút trước.',
    },
    punish: 'whistle',
    fight: {
      en: 'He is herding, not attacking. Every move is about where he wants you, so refuse the direction and half his kit does nothing.',
      vi: 'Ông đang lùa, không phải đang đánh. Mọi đòn đều nhằm đẩy bạn tới chỗ ông muốn, nên cứ từ chối hướng đó thì nửa bộ đòn của ông thành vô dụng.',
    },
    turn: {
      en: 'He stops whistling and the wood keeps moving anyway. It was taking instructions; now it has the idea.',
      vi: 'Ông thôi huýt sáo mà rừng vẫn cứ chuyển động. Trước đó rừng nghe lệnh; giờ rừng đã tự hiểu.',
    },
    after: {
      en: 'The flock stops. It does not disperse and it does not fall over — it simply stands where it was last driven.',
      vi: 'Đàn cây dừng lại. Chúng không tản ra và cũng không đổ xuống — chỉ đứng nguyên tại chỗ lần cuối bị lùa tới.',
    },
  },
  'the-ember-knight': {
    look: {
      en: 'Full plate with light in every seam, worn thin at the joints from the inside out. It is armour holding a fire, not a body.',
      vi: 'Giáp kín mít với ánh sáng rỉ ra từ mọi đường nối, các khớp mòn vẹt từ trong ra ngoài. Đó là bộ giáp đang giữ một ngọn lửa, không phải giữ một cơ thể.',
    },
    arena: {
      en: 'A gatehouse burnt out from within. The stone is still hot and it lights the danger zones for you, which is the only mercy in it.',
      vi: 'Nhà cổng cháy rụi từ bên trong. Đá vẫn còn nóng và soi rõ các vùng nguy hiểm giúp bạn, đó là điều tử tế duy nhất ở đây.',
    },
    punish: 'collapse',
    fight: {
      en: 'Roll into the charge like the tide, then read the seams. When the seams brighten together, the armour is about to open.',
      vi: 'Lăn ngược vào cú lao giống như với Con Nước, rồi đọc các đường nối. Khi các đường nối cùng sáng lên một lượt, bộ giáp sắp bung ra.',
    },
    turn: {
      en: 'The armour stops closing between attacks. Everything is now on show and none of it is any less dangerous for being visible.',
      vi: 'Giáp không còn khép lại giữa các đòn. Mọi thứ giờ phơi ra hết, và phơi ra không làm chúng bớt nguy hiểm chút nào.',
    },
    after: {
      en: 'The cinder gate cools enough to cross. It was never locked; it was simply hotter than a person.',
      vi: 'Cổng Than nguội đủ để đi qua. Nó chưa bao giờ bị khoá; nó chỉ đơn giản là nóng hơn sức chịu của một con người.',
    },
  },
  'the-astronomer': {
    look: {
      en: 'Bent from a lifetime of looking up, instruments strapped to both forearms, and he tracks you the way he tracks anything else.',
      vi: 'Lưng còng vì cả đời ngước nhìn, khí cụ buộc chặt vào hai cẳng tay, và ông theo dõi bạn đúng như theo dõi mọi thứ khác trên trời.',
    },
    arena: {
      en: 'The bottom of a well wide enough to fight in, with one circle of sky overhead and the light moving across the floor.',
      vi: 'Đáy một cái giếng đủ rộng để đánh nhau, với một vòng trời phía trên và vệt sáng di chuyển ngang qua mặt sàn.',
    },
    punish: 'eclipse',
    fight: {
      en: 'The transit line is a schedule, not an attack. Read where it will be, not where it is, and the whole fight becomes arithmetic.',
      vi: 'Vệt sáng đi ngang là một thời biểu, không phải một đòn đánh. Đọc chỗ nó sắp tới thay vì chỗ nó đang ở, và cả trận trở thành bài toán số học.',
    },
    turn: {
      en: 'Two transits at once, crossing. The crossing point is predictable; everybody dies there anyway the first time.',
      vi: 'Hai vệt sáng cùng lúc, cắt nhau. Điểm cắt hoàn toàn đoán được; ai lần đầu cũng chết đúng ở đó.',
    },
    after: {
      en: 'His instruments stay pointed. The star-well keeps taking readings and there is nobody left who can read them.',
      vi: 'Khí cụ của ông vẫn giữ nguyên hướng ngắm. Giếng Sao vẫn tiếp tục ghi số liệu và không còn ai đọc được chúng nữa.',
    },
  },
  'the-old-root': {
    look: {
      en: 'Not a figure. A knot the size of a room, with the bark worn smooth in the places it has been moving for centuries.',
      vi: 'Không phải một hình người. Một búi rễ to bằng cả căn phòng, vỏ nhẵn bóng ở những chỗ đã cử động suốt hàng thế kỷ.',
    },
    arena: {
      en: 'Under everything. The floor is the boss and so are three of the four walls, which is why standing still reads as safe and is not.',
      vi: 'Nằm dưới tất cả. Sàn nhà chính là boss, và ba trong bốn bức tường cũng vậy, nên đứng yên trông có vẻ an toàn mà thực ra không.',
    },
    punish: 'deepen',
    fight: {
      en: 'The floor lifts before it closes. That tell is the fight — everything else is a lash from the side you were not watching.',
      vi: 'Sàn phồng lên trước khi khép lại. Dấu hiệu đó chính là cả trận — mọi thứ còn lại chỉ là một nhát quất từ phía bạn không để mắt tới.',
    },
    turn: {
      en: 'It stops using roots and starts using the room. There is no longer a safe corner, because the corner is also it.',
      vi: 'Nó thôi dùng rễ và bắt đầu dùng cả căn phòng. Không còn góc nào an toàn nữa, vì cái góc ấy cũng là nó.',
    },
    after: {
      en: 'Everything above ground in this world stops being one plant. The pale wood is the first place you notice it, later.',
      vi: 'Mọi thứ mọc trên mặt đất trong thế giới này thôi là cùng một cái cây. Rừng Nhợt là nơi đầu tiên bạn nhận ra điều đó, về sau này.',
    },
  },
  'the-slagborn': {
    look: {
      en: 'A poured shape that hardened while trying to stand up, still glowing in the deep folds, shedding crust as it walks.',
      vi: 'Một khối rót ra rồi đông cứng ngay lúc đang cố đứng dậy, các nếp sâu vẫn còn rực, vừa đi vừa rụng lớp vảy.',
    },
    arena: {
      en: 'The tip outside the forge, a hundred years of waste on a slope. Nothing here is level and nothing here is cool.',
      vi: 'Bãi đổ ngoài lò rèn, cả trăm năm phế thải chất trên một sườn dốc. Ở đây không chỗ nào bằng phẳng và không chỗ nào nguội.',
    },
    punish: 'reforge',
    fight: {
      en: 'The scab flakes before the fast move and it hardens before the slow one. Two different warnings, and both are visible.',
      vi: 'Lớp vảy bong ra trước đòn nhanh và nó đông cứng lại trước đòn chậm. Hai lời báo khác nhau, và cả hai đều nhìn thấy được.',
    },
    turn: {
      en: 'It stops cooling between moves. The pause you were using was it losing heat, and it is no longer losing any.',
      vi: 'Nó thôi nguội đi giữa các đòn. Quãng ngưng bạn vẫn tận dụng chính là lúc nó mất nhiệt, và giờ nó không mất chút nào nữa.',
    },
    after: {
      en: 'The tip goes cold in one night. What the forge threw away is finally just waste again.',
      vi: 'Bãi đổ nguội hẳn chỉ sau một đêm. Thứ lò rèn vứt bỏ cuối cùng lại chỉ là phế thải, đúng nghĩa.',
    },
  },
  'the-hourwright': {
    look: {
      en: 'Precise, small, jointed like the thing she built. Her hands never stop and they never hurry, which is not the same thing.',
      vi: 'Chính xác, nhỏ nhắn, các khớp làm giống hệt cái máy bà chế ra. Đôi tay bà không bao giờ ngừng và cũng không bao giờ vội, hai điều đó không giống nhau.',
    },
    arena: {
      en: 'Inside the movement. The floor is a gear train and it is turning, so a safe spot is only safe for as long as it stays put.',
      vi: 'Bên trong bộ máy. Sàn nhà là một dàn bánh răng đang quay, nên một chỗ an toàn chỉ an toàn chừng nào nó còn đứng yên.',
    },
    punish: 'strike-twelve',
    fight: {
      en: 'The escapement is the same beat forever, so you can set your own rhythm by it. Strike-twelve is twelve — count them, move on the count.',
      vi: 'Bộ hồi luôn giữ nguyên một nhịp mãi mãi, nên bạn có thể lấy nó làm nhịp của mình. Đòn Điểm Mười Hai là đúng mười hai — đếm đi, và động theo tiếng đếm.',
    },
    turn: {
      en: 'The clock runs fast and everything she does moves onto the new beat. Nothing gets less readable, only less generous.',
      vi: 'Đồng hồ chạy nhanh lên và mọi đòn của bà chuyển sang nhịp mới. Không gì khó đọc hơn, chỉ là ít rộng lượng hơn.',
    },
    after: {
      en: 'The clock stops being wrong by stopping. Nothing tells the lanterns when to be lit any more, and nobody notices for a while.',
      vi: 'Đồng hồ thôi chạy sai bằng cách ngừng hẳn. Không còn gì báo cho các cây đèn biết lúc nào phải thắp, và một thời gian dài chẳng ai nhận ra.',
    },
  },
  'the-crucible-twins': {
    look: {
      en: 'Identical, mirrored, one always facing the other. Neither has a mark on it that the other does not have too.',
      vi: 'Giống hệt nhau, đối xứng như soi gương, luôn có một đứa quay mặt về phía đứa kia. Không đứa nào có vết nào mà đứa kia không có.',
    },
    arena: {
      en: 'A round floor with no cover, because the fight is about the line between the two of them and cover would ruin it.',
      vi: 'Sàn tròn không có chỗ nấp, vì trận đánh xoay quanh cái đường thẳng nối hai đứa, mà có chỗ nấp thì hỏng hết.',
    },
    punish: 'seal',
    fight: {
      en: 'They have half the health of anything else at this depth because there are two. Killing one early is the trap, not the plan.',
      vi: 'Chúng chỉ có nửa lượng máu so với mọi thứ khác ở độ sâu này, vì có tới hai đứa. Giết sớm một đứa là cái bẫy, không phải kế hoạch.',
    },
    turn: {
      en: 'Kill one and the other takes both jobs and both movesets. The fight gets shorter and twice as hard at the same moment.',
      vi: 'Giết một đứa thì đứa còn lại gánh cả hai vai và cả hai bộ đòn. Trận đấu ngắn lại và khó gấp đôi cùng một lúc.',
    },
    after: {
      en: 'The crucible cools with nothing in it. Which of them was the fire and which the vessel is not answered, and never is.',
      vi: 'Lò luyện nguội đi mà bên trong chẳng còn gì. Đứa nào là lửa và đứa nào là vại, câu đó không có lời đáp, và mãi mãi không có.',
    },
  },
  'the-first-flame': {
    look: {
      en: 'Not shaped like anything. It takes the shape of the chamber and pulls back from the walls, so it looks like it is flinching.',
      vi: 'Không mang hình dáng của bất cứ thứ gì. Nó ôm theo hình căn buồng rồi co lại khỏi các bức tường, nên trông như đang né tránh.',
    },
    arena: {
      en: 'The firing chamber, bricked shut from outside every firing. You broke in. Nothing about that was designed for your benefit.',
      vi: 'Buồng nung, mỗi mẻ đều bị xây bít từ bên ngoài. Bạn đã phá vào. Không chi tiết nào trong chuyện đó được thiết kế vì lợi ích của bạn.',
    },
    punish: 'kindle',
    fight: {
      en: 'It is trying to go out. The gutter is not an attack that starts, it is an attack that stops — the dark is the dangerous part.',
      vi: 'Nó đang cố tắt đi. Cú Lụi Tàn không phải đòn bắt đầu mà là đòn dừng lại — bóng tối mới là phần nguy hiểm.',
    },
    turn: {
      en: 'It stops trying to go out. Halfway through the last fight in the world, it changes its mind about wanting to die.',
      vi: 'Nó thôi không cố tắt nữa. Giữa chừng trận đánh cuối cùng của thế giới, nó đổi ý về việc muốn chết.',
    },
    after: {
      en: 'Every torch in the world is still lit, and there is nothing left to relight them from.',
      vi: 'Mọi bó đuốc trên đời vẫn còn cháy, và không còn gì để mồi lại chúng nữa.',
    },
  },
  'the-lantern-warden': {
    look: {
      en: 'It fights one-handed the entire fight. The other hand is holding the lantern and it never once considers putting it down.',
      vi: 'Suốt trận nó chỉ đánh bằng một tay. Tay còn lại đang cầm cây đèn và nó không một lần nghĩ tới chuyện đặt xuống.',
    },
    arena: {
      en: 'The lantern room, and it is the brightest place in the world. There is nowhere to be that it cannot see you.',
      vi: 'Căn phòng của cây đèn, nơi sáng nhất thế giới. Không có chỗ nào để đứng mà nó không nhìn thấy bạn.',
    },
    punish: 'slam',
    fight: {
      en: 'Roll into the lunge, never away — the same lesson the tide taught, asked again at the end to see whether you kept it.',
      vi: 'Lăn ngược vào cú lao, đừng lăn ra xa — đúng bài học Con Nước đã dạy, hỏi lại lần nữa ở cuối để xem bạn có còn giữ nó không.',
    },
    turn: {
      en: 'The lantern opens. Everything recovers faster and nothing telegraphs less, which is the promise the whole game made.',
      vi: 'Cây đèn mở ra. Mọi đòn thu về nhanh hơn và không đòn nào bớt báo trước, đúng lời hứa cả trò chơi đã đưa ra.',
    },
    after: {
      en: 'Somebody has to carry it. Nobody said the carrier gets to put it down, and now the carrier is you.',
      vi: 'Phải có ai đó cầm cây đèn. Không ai nói người cầm được phép đặt nó xuống, và bây giờ người cầm là bạn.',
    },
  },
};

export const LORE_IDS = Object.keys(BOSS_LORE);

/** The move a boss is best punished on, resolved to its actual frame data. */
export const punishOf = (id) =>
  BESTIARY[id].moves.find((m) => m.id === BOSS_LORE[id].punish);

/** The room a boss stands in, read off the map rather than written down. */
export const lairOf = (id) => ROOMS.find((r) => r.boss === id);

/** Everything about one boss in one language, for a menu or an item screen. */
export function describeBoss(id, lang = 'en') {
  const boss = BESTIARY[id];
  const lore = BOSS_LORE[id];
  const lair = lairOf(id);
  return {
    id,
    name: boss.name[lang],
    line: boss.line[lang],
    look: lore.look[lang],
    arena: lore.arena[lang],
    fight: lore.fight[lang],
    turn: lore.turn[lang],
    after: lore.after[lang],
    punish: punishOf(id),
    where: lair ? lair.name[lang] : null,
    order: BOSS_IDS.indexOf(id) + 1,
  };
}
