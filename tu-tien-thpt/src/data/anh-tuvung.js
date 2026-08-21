/* ============================================================
   TIẾNG ANH — KHO TỪ VỰNG & COLLOCATION THI THPT
   Ghi dạng "từ|loại từ|nghĩa" cho gọn, nạp xong mới dựng thành đối tượng.
   Gom theo CHỦ ĐỀ để câu hỏi lấy phương án nhiễu cùng chủ đề — khó hơn
   và sát đề thật hơn là lấy nhiễu ngẫu nhiên khắp kho.
   Loại từ: n danh · v động · adj tính · adv trạng · phr cụm
   ============================================================ */
window.TD = window.TD || {};
TD.KHO_TU = TD.KHO_TU || [];

(function () {
const nap = (cd, tho) => {
  tho.trim().split('\n').forEach(d => {
    const p = d.split('|');
    if (p.length < 3) return;
    TD.KHO_TU.push({ w: p[0].trim(), l: p[1].trim(), n: p[2].trim(), cd: cd });
  });
};

nap('Giáo dục & học tập', `
academic|adj|thuộc về học thuật, hàn lâm
achievement|n|thành tựu, thành tích
apply for|phr|nộp đơn xin (học bổng, việc làm)
assignment|n|bài tập được giao
attend|v|tham dự, đi học
bachelor's degree|n|bằng cử nhân
campus|n|khuôn viên trường
certificate|n|chứng chỉ, giấy chứng nhận
compulsory|adj|bắt buộc
concentrate on|phr|tập trung vào
credit|n|tín chỉ
curriculum|n|chương trình giảng dạy
deadline|n|hạn chót
degree|n|bằng cấp, học vị
diploma|n|bằng tốt nghiệp, văn bằng
discipline|n|kỉ luật; môn học
dormitory|n|kí túc xá
drop out|phr|bỏ học giữa chừng
elective|adj|tự chọn
enrol|v|ghi danh, nhập học
entrance exam|n|kì thi tuyển sinh
extracurricular|adj|ngoại khoá
faculty|n|khoa (trong trường đại học)
fail|v|trượt, thi hỏng
fluent|adj|trôi chảy, lưu loát
graduate|v|tốt nghiệp
grade|n|điểm số; lớp học
handout|n|tài liệu phát tay
higher education|n|giáo dục đại học
homework|n|bài tập về nhà
knowledge|n|kiến thức
laboratory|n|phòng thí nghiệm
lecture|n|bài giảng
lecturer|n|giảng viên
literacy|n|khả năng đọc viết, sự biết chữ
major in|phr|học chuyên ngành
memorise|v|học thuộc lòng
mock exam|n|kì thi thử
motivation|n|động lực
peer|n|bạn đồng trang lứa
plagiarism|n|đạo văn
primary school|n|trường tiểu học
principal|n|hiệu trưởng
qualification|n|bằng cấp, trình độ chuyên môn
reference|n|tài liệu tham khảo
revise|v|ôn tập
scholarship|n|học bổng
semester|n|học kì
seminar|n|buổi hội thảo, xê-mi-na
submit|v|nộp (bài, đơn)
syllabus|n|đề cương môn học
take notes|phr|ghi chép
term|n|học kì, kì
textbook|n|sách giáo khoa
transcript|n|bảng điểm
tuition fee|n|học phí
tutor|n|gia sư, giáo viên phụ đạo
undergraduate|n|sinh viên đại học
vocational|adj|thuộc về dạy nghề
distance learning|n|học từ xa
lifelong learning|n|học tập suốt đời
`);

nap('Nghề nghiệp & việc làm', `
applicant|n|người nộp đơn, ứng viên
apprentice|n|người học việc
be in charge of|phr|chịu trách nhiệm về
benefit|n|phúc lợi, quyền lợi
candidate|n|ứng cử viên
career|n|sự nghiệp
colleague|n|đồng nghiệp
commute|v|đi lại giữa nhà và nơi làm việc
competent|adj|có năng lực, đủ trình độ
CV|n|bản lí lịch xin việc
deadline pressure|n|áp lực về hạn chót
dedicated|adj|tận tuỵ, hết lòng
demanding|adj|đòi hỏi cao, vất vả
dismiss|v|sa thải
employee|n|nhân viên, người làm công
employer|n|người sử dụng lao động
freelance|adj|làm việc tự do
full-time|adj|toàn thời gian
income|n|thu nhập
interview|n|cuộc phỏng vấn
job satisfaction|n|sự hài lòng với công việc
labour force|n|lực lượng lao động
manual work|n|lao động chân tay
occupation|n|nghề nghiệp
overtime|n|giờ làm thêm
part-time|adj|bán thời gian
pay rise|n|sự tăng lương
promote|v|thăng chức
recruit|v|tuyển dụng
redundant|adj|bị dư thừa, bị cho thôi việc
resign|v|từ chức, xin thôi việc
retire|v|nghỉ hưu
salary|n|lương tháng
self-employed|adj|tự làm chủ, tự kinh doanh
shift|n|ca làm việc
skilled worker|n|công nhân lành nghề
staff|n|đội ngũ nhân viên
teamwork|n|làm việc nhóm
unemployment|n|tình trạng thất nghiệp
vacancy|n|vị trí còn trống
wage|n|tiền công (theo giờ, ngày)
workforce|n|lực lượng lao động
workload|n|khối lượng công việc
work-life balance|n|cân bằng giữa công việc và cuộc sống
`);

nap('Gia đình & đời sống', `
adopt|v|nhận làm con nuôi
ancestor|n|tổ tiên
be close to|phr|thân thiết với
bring up|phr|nuôi dạy
chore|n|việc vặt trong nhà
conflict|n|xung đột, mâu thuẫn
divorce|n|sự li hôn
elderly|adj|cao tuổi
engagement|n|lễ đính hôn
extended family|n|gia đình nhiều thế hệ
generation gap|n|khoảng cách thế hệ
get along with|phr|hoà thuận với
household|n|hộ gia đình
in-laws|n|họ hàng bên vợ hoặc chồng
look after|phr|chăm sóc
marital status|n|tình trạng hôn nhân
nuclear family|n|gia đình hạt nhân (bố mẹ và con)
obedient|adj|vâng lời
parenting|n|việc nuôi dạy con cái
relative|n|họ hàng
responsibility|n|trách nhiệm
sibling|n|anh chị em ruột
spouse|n|vợ hoặc chồng
supportive|adj|luôn ủng hộ, động viên
take after|phr|giống (người thân)
tolerant|adj|khoan dung, độ lượng
upbringing|n|sự nuôi dạy
value|n|giá trị (sống)
`);

nap('Sức khoẻ & y tế', `
addiction|n|sự nghiện
balanced diet|n|chế độ ăn cân bằng
cardiovascular|adj|thuộc tim mạch
contagious|adj|dễ lây lan
cure|v|chữa khỏi
diagnose|v|chẩn đoán
disease|n|bệnh tật
epidemic|n|dịch bệnh
fatigue|n|sự mệt mỏi
first aid|n|sơ cứu
healthcare|n|chăm sóc sức khoẻ
hygiene|n|vệ sinh
immune system|n|hệ miễn dịch
infection|n|sự nhiễm trùng
injury|n|chấn thương
insomnia|n|chứng mất ngủ
mental health|n|sức khoẻ tinh thần
nutrition|n|dinh dưỡng
obesity|n|bệnh béo phì
outbreak|n|sự bùng phát (dịch)
patient|n|bệnh nhân
prescription|n|đơn thuốc
prevent|v|ngăn ngừa
recover|v|hồi phục
sedentary|adj|ít vận động, ngồi nhiều
side effect|n|tác dụng phụ
stress|n|sự căng thẳng
surgery|n|ca phẫu thuật
symptom|n|triệu chứng
treatment|n|sự điều trị
vaccination|n|sự tiêm chủng
well-being|n|trạng thái khoẻ mạnh, hạnh phúc
`);

nap('Môi trường & phát triển bền vững', `
biodiversity|n|đa dạng sinh học
carbon footprint|n|dấu chân carbon, lượng khí thải gây ra
climate change|n|biến đổi khí hậu
conservation|n|sự bảo tồn
contaminate|v|làm ô nhiễm, nhiễm bẩn
deforestation|n|nạn phá rừng
degradation|n|sự suy thoái
discharge|v|thải ra, xả ra
drought|n|hạn hán
ecosystem|n|hệ sinh thái
emission|n|khí thải
endangered species|n|loài có nguy cơ tuyệt chủng
environmentally friendly|adj|thân thiện với môi trường
erosion|n|sự xói mòn
extinction|n|sự tuyệt chủng
fossil fuel|n|nhiên liệu hoá thạch
global warming|n|sự nóng lên toàn cầu
greenhouse effect|n|hiệu ứng nhà kính
habitat|n|môi trường sống của sinh vật
landfill|n|bãi chôn lấp rác
natural resources|n|tài nguyên thiên nhiên
non-renewable|adj|không tái tạo được
organic|adj|hữu cơ
overfishing|n|đánh bắt cá quá mức
pesticide|n|thuốc trừ sâu
pollutant|n|chất gây ô nhiễm
preserve|v|bảo tồn, giữ gìn
recycle|v|tái chế
reduce|v|giảm bớt
renewable energy|n|năng lượng tái tạo
reuse|v|tái sử dụng
sea level rise|n|mực nước biển dâng
sewage|n|nước thải sinh hoạt
solar power|n|năng lượng mặt trời
sustainable|adj|bền vững
waste treatment|n|xử lí chất thải
wildlife|n|động vật hoang dã
`);

nap('Khoa học & công nghệ', `
artificial intelligence|n|trí tuệ nhân tạo
automation|n|sự tự động hoá
breakthrough|n|bước đột phá
cutting-edge|adj|tối tân, tiên tiến nhất
cyberbullying|n|bắt nạt trên mạng
data|n|dữ liệu
device|n|thiết bị
digital literacy|n|năng lực số
download|v|tải xuống
experiment|n|thí nghiệm
gadget|n|đồ dùng công nghệ nhỏ gọn
innovation|n|sự đổi mới sáng tạo
install|v|cài đặt
invention|n|phát minh
laptop|n|máy tính xách tay
launch|v|ra mắt, phóng (vệ tinh)
network|n|mạng lưới
online platform|n|nền tảng trực tuyến
password|n|mật khẩu
privacy|n|quyền riêng tư
programme|v|lập trình
remote control|n|điều khiển từ xa
research|n|nghiên cứu
robot|n|người máy
satellite|n|vệ tinh
screen time|n|thời gian nhìn màn hình
software|n|phần mềm
solve|v|giải quyết
technology|n|công nghệ
update|v|cập nhật
upload|v|tải lên
user-friendly|adj|dễ sử dụng
virtual reality|n|thực tế ảo
virus|n|vi-rút (máy tính, sinh học)
`);

nap('Du lịch & văn hoá', `
accommodation|n|chỗ ở
adventure|n|cuộc phiêu lưu
attraction|n|điểm thu hút khách
authentic|adj|nguyên bản, đích thực
booking|n|việc đặt chỗ
cultural identity|n|bản sắc văn hoá
custom|n|phong tục
delayed|adj|bị hoãn, bị trễ
departure|n|sự khởi hành
destination|n|điểm đến
diverse range|phr|phạm vi đa dạng
festival|n|lễ hội
guided tour|n|chuyến tham quan có hướng dẫn
heritage|n|di sản
hospitality|n|lòng hiếu khách
itinerary|n|lịch trình
landmark|n|địa danh nổi tiếng
landscape|n|phong cảnh
luggage|n|hành lí
package tour|n|tour trọn gói
passport|n|hộ chiếu
ritual|n|nghi lễ
scenery|n|phong cảnh
sightseeing|n|việc ngắm cảnh
souvenir|n|đồ lưu niệm
tradition|n|truyền thống
traveller|n|người đi du lịch
visa|n|thị thực
`);

nap('Xã hội & truyền thông', `
advertisement|n|quảng cáo
audience|n|khán giả, độc giả
broadcast|v|phát sóng
campaign|n|chiến dịch
charity|n|tổ chức từ thiện
citizen|n|công dân
community|n|cộng đồng
discrimination|n|sự phân biệt đối xử
donate|v|quyên góp
equality|n|sự bình đẳng
gender|n|giới tính
headline|n|tiêu đề tin
influence|v|ảnh hưởng
journalist|n|nhà báo
literate|adj|biết đọc biết viết
media|n|phương tiện truyền thông
poverty|n|sự nghèo đói
prejudice|n|định kiến
promote a campaign|phr|đẩy mạnh một chiến dịch
public opinion|n|dư luận
raise awareness|phr|nâng cao nhận thức
reliable|adj|đáng tin cậy
social network|n|mạng xã hội
subscribe|v|đăng kí theo dõi
survey|n|cuộc khảo sát
urbanisation|n|đô thị hoá
viewer|n|người xem
volunteer|n|tình nguyện viên
`);

nap('Từ học thuật hay gặp trong bài đọc', `
abundant|adj|dồi dào, phong phú
accelerate|v|tăng tốc, đẩy nhanh
accurate|adj|chính xác
adapt|v|thích nghi
adequate|adj|đầy đủ, thoả đáng
alter|v|thay đổi
approach|n|cách tiếp cận
assess|v|đánh giá
assume|v|cho rằng, giả định
beneficial|adj|có lợi
comprehensive|adj|toàn diện
consequence|n|hậu quả, kết quả
considerable|adj|đáng kể
constant|adj|không đổi, liên tục
crucial|adj|then chốt, cốt yếu
decline|v|suy giảm
demonstrate|v|chứng minh, thể hiện
diminish|v|giảm bớt
distinguish|v|phân biệt
dramatic|adj|đột ngột, mạnh mẽ
eliminate|v|loại bỏ
emerge|v|xuất hiện, nổi lên
enhance|v|nâng cao, cải thiện
essential|adj|thiết yếu
evidence|n|bằng chứng
evolve|v|tiến hoá, phát triển dần
exceed|v|vượt quá
facilitate|v|tạo điều kiện thuận lợi
factor|n|yếu tố
fluctuate|v|dao động, lên xuống
generate|v|tạo ra, sinh ra
gradual|adj|dần dần
hypothesis|n|giả thuyết
identify|v|nhận diện, xác định
impact|n|tác động
implement|v|thực thi, triển khai
imply|v|hàm ý
inevitable|adj|không thể tránh khỏi
initial|adj|ban đầu
integrate|v|hợp nhất, tích hợp
interpret|v|diễn giải
maintain|v|duy trì
minimise|v|giảm thiểu
modify|v|sửa đổi
obtain|v|thu được, đạt được
occur|v|xảy ra
overcome|v|vượt qua
phenomenon|n|hiện tượng
potential|n|tiềm năng
predict|v|dự đoán
previous|adj|trước đó
principle|n|nguyên tắc
priority|n|ưu tiên
reduce significantly|phr|giảm đáng kể
regardless of|phr|bất kể
relevant|adj|liên quan, thích đáng
reluctant|adj|miễn cưỡng, ngần ngại
require|v|đòi hỏi, yêu cầu
resource|n|nguồn lực
restrict|v|hạn chế
reveal|v|tiết lộ
significant|adj|đáng kể, quan trọng
substantial|adj|đáng kể, lớn
sufficient|adj|đủ
tendency|n|xu hướng
transform|v|biến đổi
undergo|v|trải qua
vary|v|thay đổi, khác nhau
widespread|adj|lan rộng, phổ biến
`);

nap('Tính từ mô tả tính cách & cảm xúc', `
ambitious|adj|có tham vọng
anxious|adj|lo lắng
arrogant|adj|kiêu ngạo
brave|adj|dũng cảm
cautious|adj|thận trọng
cheerful|adj|vui vẻ
confident|adj|tự tin
considerate|adj|chu đáo, biết nghĩ cho người khác
courageous|adj|can đảm
creative|adj|sáng tạo
curious|adj|tò mò, ham hiểu biết
determined|adj|quyết tâm
diligent|adj|siêng năng
disappointed|adj|thất vọng
enthusiastic|adj|nhiệt tình
generous|adj|hào phóng
grateful|adj|biết ơn
honest|adj|trung thực
humble|adj|khiêm tốn
independent|adj|độc lập
jealous|adj|ghen tị
loyal|adj|trung thành
optimistic|adj|lạc quan
be patient with|phr|kiên nhẫn với
persistent|adj|kiên trì
pessimistic|adj|bi quan
polite|adj|lịch sự
punctual|adj|đúng giờ
reliable person|phr|người đáng tin cậy
responsible|adj|có trách nhiệm
selfish|adj|ích kỉ
sensitive|adj|nhạy cảm
sincere|adj|chân thành
sociable|adj|hoà đồng
stubborn|adj|bướng bỉnh
sympathetic|adj|thông cảm
thoughtful|adj|ân cần, chu đáo
`);

nap('Cụm động từ (phrasal verbs)', `
break down|phr|hỏng hóc; suy sụp
bring about|phr|gây ra, dẫn đến
call off|phr|huỷ bỏ
carry out|phr|tiến hành, thực hiện
come across|phr|tình cờ gặp, bắt gặp
cut down on|phr|cắt giảm
deal with|phr|giải quyết, đối phó
figure out|phr|hiểu ra, tìm ra
find out|phr|phát hiện ra
get over|phr|vượt qua, hồi phục
give up|phr|từ bỏ
go on|phr|tiếp tục
grow up|phr|lớn lên
hand in|phr|nộp bài
hold on|phr|chờ máy, đợi một chút
keep up with|phr|theo kịp
look forward to|phr|mong đợi
look into|phr|điều tra, xem xét
look up|phr|tra cứu
make up|phr|bịa ra; làm hoà
put off|phr|hoãn lại
put up with|phr|chịu đựng
run out of|phr|hết, cạn kiệt
set up|phr|thành lập, dựng lên
take on|phr|đảm nhận
take part in|phr|tham gia
take up|phr|bắt đầu (sở thích)
turn down|phr|từ chối; vặn nhỏ
turn up|phr|xuất hiện; vặn to
work out|phr|tập thể dục; tính ra
`);

nap('Thể thao & giải trí', `
amateur|n|người nghiệp dư
athlete|n|vận động viên điền kinh
championship|n|giải vô địch
cheer|v|cổ vũ
coach|n|huấn luyện viên
compete|v|thi đấu
defeat|v|đánh bại
endurance|n|sức bền
fitness|n|thể lực, sự sung sức
gym|n|phòng tập
league|n|giải đấu
opponent|n|đối thủ
Olympic Games|n|Thế vận hội Olympic
participant|n|người tham gia
performance|n|màn trình diễn, thành tích
professional|adj|chuyên nghiệp
qualify|v|giành quyền vào vòng trong
referee|n|trọng tài
score|v|ghi điểm, ghi bàn
spectator|n|khán giả xem thi đấu
sportsmanship|n|tinh thần thể thao
stadium|n|sân vận động
teammate|n|đồng đội
tournament|n|giải đấu
train|v|luyện tập
trophy|n|cúp vô địch
warm up|phr|khởi động
audition|n|buổi thử vai
blockbuster|n|phim bom tấn
cast|n|dàn diễn viên
comedy|n|phim hài
concert|n|buổi hoà nhạc
director|n|đạo diễn
entertainment|n|sự giải trí
genre|n|thể loại
plot|n|cốt truyện
release|v|phát hành
review|n|bài đánh giá
soundtrack|n|nhạc phim
subtitle|n|phụ đề
`);

nap('Ẩm thực & dinh dưỡng', `
appetite|n|sự thèm ăn
bake|v|nướng bằng lò
beverage|n|đồ uống
boil|v|luộc, đun sôi
canteen|n|căng tin
cuisine|n|nền ẩm thực
delicious|adj|ngon
dessert|n|món tráng miệng
diet|n|chế độ ăn
dish|n|món ăn
edible|adj|ăn được
fast food|n|đồ ăn nhanh
flavour|n|hương vị
fresh|adj|tươi
fry|v|rán, chiên
grill|v|nướng vỉ
ingredient|n|nguyên liệu
junk food|n|đồ ăn vặt kém dinh dưỡng
leftover|n|thức ăn thừa
meal|n|bữa ăn
nutritious|adj|bổ dưỡng
portion|n|khẩu phần
preservative|n|chất bảo quản
recipe|n|công thức nấu ăn
seasoning|n|gia vị
snack|n|đồ ăn nhẹ
spicy|adj|cay
steam|v|hấp
tasteless|adj|nhạt nhẽo
vegetarian|n|người ăn chay
`);

nap('Nhà ở & đô thị', `
apartment|n|căn hộ
architecture|n|kiến trúc
balcony|n|ban công
brick|n|viên gạch
ceiling|n|trần nhà
congestion|n|sự tắc nghẽn
construction|n|việc xây dựng
cottage|n|nhà tranh, nhà nhỏ ở quê
downtown|n|khu trung tâm
facility|n|tiện ích, cơ sở vật chất
furnished|adj|có sẵn nội thất
infrastructure|n|cơ sở hạ tầng
landlord|n|chủ nhà cho thuê
maintenance|n|việc bảo trì
neighbourhood|n|khu phố, hàng xóm
overcrowded|adj|quá đông đúc
pavement|n|vỉa hè
rent|v|thuê, cho thuê
residence|n|nơi cư trú
residential area|n|khu dân cư
rural|adj|thuộc nông thôn
skyscraper|n|toà nhà chọc trời
slum|n|khu ổ chuột
suburb|n|vùng ngoại ô
tenant|n|người thuê nhà
urban|adj|thuộc thành thị
utilities|n|các dịch vụ điện nước
`);

nap('Mua sắm & tiêu dùng', `
afford|v|đủ tiền mua
bargain|n|món hời
brand|n|thương hiệu
budget|n|ngân sách
consumer|n|người tiêu dùng
customer|n|khách hàng
delivery|n|việc giao hàng
discount|n|khoản giảm giá
exchange|v|đổi hàng
expense|n|khoản chi tiêu
expensive|adj|đắt đỏ
guarantee|n|sự bảo hành
inexpensive|adj|không đắt
in stock|phr|còn hàng
invoice|n|hoá đơn
loyalty card|n|thẻ khách hàng thân thiết
purchase|v|mua
receipt|n|biên lai
refund|n|khoản hoàn tiền
retail|n|bán lẻ
sale|n|đợt giảm giá
second-hand|adj|đã qua sử dụng
shopaholic|n|người nghiện mua sắm
supplier|n|nhà cung cấp
wholesale|n|bán buôn
window shopping|n|đi ngắm đồ không mua
`);

nap('Giao thông & đi lại', `
accident|n|tai nạn
board|v|lên (tàu, xe, máy bay)
boarding pass|n|thẻ lên máy bay
breakdown|n|sự hỏng xe
carriage|n|toa tàu
crossroads|n|ngã tư
cyclist|n|người đi xe đạp
destination point|phr|điểm đến cuối cùng
detour|n|đường vòng
driving licence|n|bằng lái xe
fare|n|tiền vé
fasten|v|thắt (dây an toàn)
helmet|n|mũ bảo hiểm
highway|n|đường cao tốc
jam|n|sự ùn tắc
lane|n|làn đường
overtake|v|vượt xe
passenger|n|hành khách
pedestrian|n|người đi bộ
petrol|n|xăng
platform|n|sân ga
public transport|n|giao thông công cộng
rush hour|n|giờ cao điểm
seat belt|n|dây an toàn
speed limit|n|giới hạn tốc độ
timetable|n|thời gian biểu, lịch chạy
traffic light|n|đèn giao thông
vehicle|n|phương tiện giao thông
`);

nap('Thời tiết & thiên tai', `
avalanche|n|trận tuyết lở
blizzard|n|bão tuyết
breeze|n|làn gió nhẹ
chilly|adj|lạnh buốt
cyclone|n|xoáy thuận nhiệt đới
damp|adj|ẩm ướt
disaster|n|thảm hoạ
earthquake|n|trận động đất
evacuate|v|sơ tán
flood|n|trận lụt
forecast|n|dự báo
freezing|adj|đóng băng, rất lạnh
hail|n|mưa đá
humid|adj|ẩm
hurricane|n|bão lớn
landslide|n|sạt lở đất
lightning|n|tia chớp
mild|adj|ôn hoà, dịu
rainfall|n|lượng mưa
relief|n|cứu trợ
rescue|v|giải cứu
shelter|n|nơi trú ẩn
storm|n|cơn bão
temperature|n|nhiệt độ
thunder|n|sấm
tsunami|n|sóng thần
volcanic eruption|n|sự phun trào núi lửa
`);

nap('Kinh tế & tiền bạc', `
account|n|tài khoản
asset|n|tài sản
borrow|v|vay, mượn
capital|n|vốn
currency|n|tiền tệ
debt|n|khoản nợ
deposit|v|gửi tiền
economy|n|nền kinh tế
exchange rate|n|tỉ giá hối đoái
export|v|xuất khẩu
finance|n|tài chính
import|v|nhập khẩu
inflation|n|lạm phát
insurance|n|bảo hiểm
interest rate|n|lãi suất
invest|v|đầu tư
lend|v|cho vay
loan|n|khoản vay
market|n|thị trường
mortgage|n|khoản vay thế chấp
profit|n|lợi nhuận
recession|n|suy thoái kinh tế
revenue|n|doanh thu
savings|n|tiền tiết kiệm
share|n|cổ phần
supply and demand|n|cung và cầu
tax|n|thuế
transaction|n|giao dịch
withdraw|v|rút tiền
`);

nap('Pháp luật & công lí', `
accuse|v|buộc tội
arrest|v|bắt giữ
authority|n|nhà chức trách
ban|v|cấm
court|n|toà án
crime|n|tội phạm
criminal|n|tội phạm (người)
defendant|n|bị cáo
enforce|v|thực thi (luật)
evidence in court|phr|chứng cứ trước toà
fine|n|khoản tiền phạt
guilty|adj|có tội
illegal|adj|bất hợp pháp
innocent|adj|vô tội
judge|n|thẩm phán
jury|n|bồi thẩm đoàn
justice|n|công lí
lawyer|n|luật sư
legal|adj|hợp pháp
offence|n|hành vi phạm tội
penalty|n|hình phạt
prison|n|nhà tù
prohibit|v|nghiêm cấm
regulation|n|quy định
sentence|v|kết án
suspect|n|nghi phạm
trial|n|phiên toà xét xử
victim|n|nạn nhân
witness|n|nhân chứng
`);

nap('Động từ thông dụng', `
abandon|v|từ bỏ, bỏ rơi
accompany|v|đi cùng
acquire|v|thu nhận, có được
admire|v|ngưỡng mộ
recommend strongly|phr|khuyên dùng mạnh mẽ
announce|v|thông báo
appreciate|v|đánh giá cao, trân trọng
approve|v|chấp thuận
argue|v|tranh luận
arrange|v|sắp xếp
attract|v|thu hút
avoid|v|tránh
blame|v|đổ lỗi
celebrate|v|kỉ niệm, ăn mừng
combine|v|kết hợp
compare|v|so sánh
complain|v|phàn nàn
confirm|v|xác nhận
consider|v|cân nhắc
convince|v|thuyết phục
cooperate|v|hợp tác
decrease|v|giảm
deny|v|phủ nhận
describe|v|mô tả
develop|v|phát triển
discover|v|khám phá
discuss|v|thảo luận
emphasise|v|nhấn mạnh
encourage|v|khuyến khích
estimate|v|ước tính
examine|v|xem xét, khám
expand|v|mở rộng
explore|v|khám phá, thăm dò
express|v|bày tỏ
forbid|v|cấm đoán
hesitate|v|do dự
ignore|v|phớt lờ
improve|v|cải thiện
increase|v|tăng lên
inspire|v|truyền cảm hứng
introduce|v|giới thiệu
involve|v|liên quan, bao gồm
justify|v|biện minh
manage|v|xoay xở, quản lí
mention|v|đề cập
negotiate|v|đàm phán
observe|v|quan sát
organise|v|tổ chức
participate|v|tham gia
persuade|v|thuyết phục
postpone|v|hoãn lại
prefer|v|thích hơn
prepare|v|chuẩn bị
pretend|v|giả vờ
protect|v|bảo vệ
provide|v|cung cấp
recognise|v|nhận ra
recommend|v|giới thiệu, khuyên dùng
refuse|v|từ chối
remind|v|nhắc nhở
replace|v|thay thế
represent|v|đại diện cho
respond|v|phản hồi
suggest|v|gợi ý, đề nghị
supply|v|cung cấp
support|v|ủng hộ
survive|v|sống sót
warn|v|cảnh báo
`);

nap('Danh từ & tính từ thông dụng', `
ability|n|khả năng
advantage|n|lợi thế
guidance|n|sự chỉ dẫn, hướng dẫn
aim|n|mục tiêu
alternative|n|lựa chọn thay thế
attitude|n|thái độ
attempt|n|nỗ lực, cố gắng
behaviour|n|hành vi
belief|n|niềm tin
challenge|n|thách thức
circumstance|n|hoàn cảnh
comparison|n|sự so sánh
competition|n|cuộc cạnh tranh, cuộc thi
concern|n|mối lo ngại
condition|n|điều kiện
confidence|n|sự tự tin
contribution|n|sự đóng góp
convenience|n|sự tiện lợi
cooperation|n|sự hợp tác
creativity|n|sự sáng tạo
curiosity|n|sự tò mò
decision|n|quyết định
difficulty|n|khó khăn
disadvantage|n|bất lợi
effort|n|nỗ lực
emotion|n|cảm xúc
encouragement|n|sự khích lệ
experience|n|kinh nghiệm, trải nghiệm
freedom|n|sự tự do
goal|n|mục tiêu
habit|n|thói quen
honesty|n|sự trung thực
imagination|n|trí tưởng tượng
improvement|n|sự cải thiện
independence|n|sự độc lập
intention|n|ý định
interaction|n|sự tương tác
method|n|phương pháp
mistake|n|lỗi lầm
obstacle|n|trở ngại
opportunity|n|cơ hội
patience|n|sự kiên nhẫn
perspective|n|góc nhìn
pressure|n|áp lực
purpose|n|mục đích
quality|n|chất lượng
quantity|n|số lượng
reaction|n|phản ứng
reason|n|lí do
relationship|n|mối quan hệ
reputation|n|danh tiếng
result|n|kết quả
role|n|vai trò
situation|n|tình huống
solution|n|giải pháp
strength|n|điểm mạnh
success|n|sự thành công
suggestion|n|lời gợi ý
trust|n|sự tin tưởng
weakness|n|điểm yếu
appropriate|adj|phù hợp, thích đáng
available|adj|có sẵn
aware|adj|nhận thức được
common|adj|phổ biến
complex|adj|phức tạp
convenient|adj|tiện lợi
dangerous|adj|nguy hiểm
difficult|adj|khó khăn
effective|adj|hiệu quả
efficient|adj|hiệu suất cao
equal|adj|bằng nhau, ngang bằng
flexible|adj|linh hoạt
frequent|adj|thường xuyên
harmful|adj|có hại
impressive|adj|ấn tượng
necessary|adj|cần thiết
obvious|adj|hiển nhiên
particular|adj|cụ thể, riêng biệt
permanent|adj|lâu dài, vĩnh viễn
practical|adj|thực tế, thiết thực
rare|adj|hiếm
reasonable|adj|hợp lí
temporary|adj|tạm thời
typical|adj|điển hình
unique|adj|độc nhất
useful|adj|hữu ích
valuable|adj|có giá trị
various|adj|đa dạng, khác nhau
willing|adj|sẵn lòng
`);

nap('Trạng từ & từ nối', `
absolutely|adv|hoàn toàn
actually|adv|thực ra
additionally|adv|thêm vào đó
apparently|adv|có vẻ như
approximately|adv|xấp xỉ, khoảng
barely|adv|hầu như không
carefully|adv|một cách cẩn thận
certainly|adv|chắc chắn
clearly|adv|rõ ràng
consequently|adv|do đó
currently|adv|hiện nay
definitely|adv|chắc chắn
easily|adv|một cách dễ dàng
effectively|adv|một cách hiệu quả
entirely|adv|hoàn toàn
especially|adv|đặc biệt là
eventually|adv|cuối cùng thì
extremely|adv|cực kì
fortunately|adv|may thay
frequently|adv|thường xuyên
furthermore|adv|hơn nữa
gradually|adv|dần dần
hardly|adv|hầu như không
however|adv|tuy nhiên
immediately|adv|ngay lập tức
increasingly|adv|ngày càng
indeed|adv|quả thực
instead|adv|thay vào đó
likely|adv|có khả năng
meanwhile|adv|trong khi đó
moreover|adv|hơn thế nữa
namely|adv|cụ thể là
nevertheless|adv|tuy nhiên, dù vậy
obviously|adv|rõ ràng là
occasionally|adv|thỉnh thoảng
otherwise|adv|nếu không thì
particularly|adv|đặc biệt
possibly|adv|có thể
previously|adv|trước đây
probably|adv|có lẽ
rarely|adv|hiếm khi
recently|adv|gần đây
relatively|adv|tương đối
seldom|adv|hiếm khi
seriously|adv|nghiêm túc
similarly|adv|tương tự
slightly|adv|hơi, một chút
therefore|adv|vì vậy
thoroughly|adv|kĩ lưỡng
thus|adv|do đó
unfortunately|adv|không may là
usually|adv|thường thường
whereas|adv|trong khi (đối lập)
`);

nap('Nông nghiệp & tài nguyên', `
agriculture|n|nông nghiệp
breed|v|nhân giống, chăn nuôi
crop|n|vụ mùa, cây trồng
cultivate|v|trồng trọt, canh tác
drought-resistant|adj|chịu hạn
fertiliser|n|phân bón
grain|n|ngũ cốc
harvest|n|vụ thu hoạch
irrigation|n|hệ thống tưới tiêu
livestock|n|gia súc
mineral|n|khoáng sản
paddy field|n|ruộng lúa
plantation|n|đồn điền
poultry|n|gia cầm
soil|n|đất trồng
sow|v|gieo hạt
yield|n|sản lượng thu hoạch
aquaculture|n|nuôi trồng thuỷ sản
exploit|v|khai thác
extract|v|chiết xuất, khai thác
mine|v|khai mỏ
timber|n|gỗ xẻ
`);

nap('Cảm xúc & giao tiếp', `
admit|v|thừa nhận
agree|v|đồng ý
amuse|v|làm vui thích
annoy|v|làm phiền, chọc tức
apologise|v|xin lỗi
appreciate help|phr|trân trọng sự giúp đỡ
astonish|v|làm sửng sốt
beg|v|van xin
boast|v|khoe khoang
comfort|v|an ủi
compliment|n|lời khen
congratulate|v|chúc mừng
criticise|v|phê bình
disagree|v|không đồng ý
embarrass|v|làm xấu hổ
frighten|v|làm sợ hãi
greet|v|chào hỏi
insult|v|lăng mạ
interrupt|v|ngắt lời
mislead|v|dẫn dắt sai lệch
promise|v|hứa
quarrel|v|cãi nhau
refuse politely|phr|từ chối lịch sự
regret|v|hối tiếc
satisfy|v|làm hài lòng
scold|v|mắng
sympathise|v|đồng cảm
threaten|v|đe doạ
whisper|v|thì thầm
`);

nap('Từ dễ nhầm lẫn', `
affect|v|(động từ) tác động đến
effect|n|(danh từ) tác động, hiệu ứng
advise|v|(động từ) khuyên
advice|n|(danh từ) lời khuyên
practise|v|(động từ) luyện tập
practice|n|(danh từ) sự luyện tập
economic|adj|thuộc kinh tế
economical|adj|tiết kiệm, không tốn kém
historic|adj|mang tính lịch sử, trọng đại
historical|adj|liên quan đến lịch sử
sensible|adj|khôn ngoan, hợp lí
sensitive person|phr|người nhạy cảm
successful|adj|thành công
successive|adj|liên tiếp
industrial|adj|thuộc công nghiệp
industrious|adj|chăm chỉ
respectful|adj|tôn trọng người khác
respectable|adj|đáng kính
literal|adj|theo nghĩa đen
literary|adj|thuộc văn chương
continual|adj|lặp đi lặp lại có ngắt quãng
continuous|adj|liên tục không ngắt
lie|v|nằm; nói dối
lay|v|đặt, để nằm xuống
rise|v|tăng lên (tự thân)
raise|v|nâng lên (tác động lên vật khác)
borrow money|phr|vay tiền của ai
lend money|phr|cho ai vay tiền
bring|v|mang tới (chỗ người nói)
take away|phr|mang đi (khỏi chỗ người nói)
`);

nap('Thành ngữ & cách diễn đạt', `
a piece of cake|phr|dễ như ăn bánh
better late than never|phr|muộn còn hơn không
break the ice|phr|phá tan bầu không khí ngượng ngùng
once in a blue moon|phr|hoạ hoằn lắm mới xảy ra
under the weather|phr|thấy trong người không khoẻ
hit the books|phr|vùi đầu vào học
learn by heart|phr|học thuộc lòng
keep in touch|phr|giữ liên lạc
make ends meet|phr|xoay xở đủ sống
be on the same page|phr|cùng chung quan điểm
get the hang of|phr|nắm được cách làm
pull someone's leg|phr|trêu chọc ai đó
cost an arm and a leg|phr|đắt cắt cổ
be all ears|phr|sẵn sàng lắng nghe
in the long run|phr|về lâu về dài
from scratch|phr|từ đầu, từ con số không
on the whole|phr|nhìn chung
as a matter of fact|phr|thực ra là
in terms of|phr|xét về mặt
due to|phr|do bởi
thanks to|phr|nhờ có
in spite of|phr|mặc dù
as long as|phr|miễn là
as soon as|phr|ngay khi
no longer|phr|không còn nữa
sooner or later|phr|sớm muộn gì
by no means|phr|hoàn toàn không
for the time being|phr|tạm thời lúc này
`);

nap('Bổ sung học thuật', `
allocate|v|phân bổ
anticipate|v|dự đoán trước
appropriate response|phr|phản ứng phù hợp
categorise|v|phân loại
coincide|v|trùng khớp, xảy ra đồng thời
compensate|v|bù đắp, đền bù
comply with|phr|tuân thủ
conduct research|phr|tiến hành nghiên cứu
constitute|v|cấu thành, chiếm
correlate|v|có mối tương quan
derive from|phr|bắt nguồn từ
deteriorate|v|xấu đi, suy giảm
deviate|v|đi chệch khỏi
diverse background|phr|xuất thân đa dạng
elaborate|v|trình bày chi tiết
encounter|v|gặp phải
equivalent|adj|tương đương
exclude|v|loại trừ
exhibit|v|trưng bày, biểu lộ
formulate|v|xây dựng, soạn thảo
illustrate|v|minh hoạ
incorporate|v|kết hợp, đưa vào
indicate|v|chỉ ra
inhibit|v|kìm hãm
initiate|v|khởi xướng
intervene|v|can thiệp
justification|n|sự biện minh
manipulate|v|thao túng, điều khiển
notion|n|khái niệm
outcome|n|kết quả đầu ra
predominant|adj|chiếm ưu thế
prospect|n|triển vọng
scenario|n|kịch bản, viễn cảnh
scope|n|phạm vi
sequence|n|trình tự
simulate|v|mô phỏng
sustain|v|duy trì, chống đỡ
terminate|v|chấm dứt
underlying|adj|nằm bên dưới, cốt lõi
utilise|v|tận dụng
validate|v|xác nhận tính đúng đắn
`);


nap('Kĩ năng thế kỉ 21', `
adaptability|n|khả năng thích ứng
analytical|adj|có tính phân tích
autonomy|n|quyền tự chủ
brainstorm|v|động não tìm ý tưởng
collaborate|v|cộng tác
commitment|n|sự cam kết
communication skill|n|kĩ năng giao tiếp
competence|n|năng lực chuyên môn
critical thinking|n|tư duy phản biện
delegate|v|giao việc, uỷ quyền
digital skill|n|kĩ năng số
empathy|n|sự thấu cảm
entrepreneurial|adj|có tinh thần khởi nghiệp
initiative|n|tính chủ động, sáng kiến
interpersonal|adj|thuộc quan hệ giữa người với người
leadership|n|khả năng lãnh đạo
mindset|n|lối tư duy
multitask|v|làm nhiều việc cùng lúc
negotiation|n|sự thương lượng
networking|n|việc xây dựng quan hệ
problem-solving|n|khả năng giải quyết vấn đề
proactive|adj|chủ động đi trước
resilience|n|khả năng phục hồi sau khó khăn
self-discipline|n|tính tự kỉ luật
teamwork skill|n|kĩ năng làm việc nhóm
time management|n|quản lí thời gian
versatile|adj|đa năng, linh hoạt
work ethic|n|đạo đức nghề nghiệp
`);

nap('Trí tuệ nhân tạo & dữ liệu', `
algorithm|n|thuật toán
automate|v|tự động hoá
big data|n|dữ liệu lớn
bias|n|thiên lệch, định kiến trong dữ liệu
chatbot|n|phần mềm trò chuyện tự động
cloud computing|n|điện toán đám mây
cybersecurity|n|an ninh mạng
database|n|cơ sở dữ liệu
digital divide|n|khoảng cách số
encryption|n|sự mã hoá
facial recognition|n|nhận diện khuôn mặt
hardware|n|phần cứng
machine learning|n|học máy
misinformation|n|thông tin sai lệch
personal data|n|dữ liệu cá nhân
processing power|n|năng lực xử lí
prompt|n|câu lệnh đưa cho máy
self-driving|adj|tự lái
simulation|n|sự mô phỏng
smart device|n|thiết bị thông minh
streaming|n|truyền phát trực tuyến
surveillance|n|sự giám sát
transparency|n|tính minh bạch
troubleshoot|v|khắc phục sự cố
`);

nap('Vũ trụ & khám phá', `
asteroid|n|tiểu hành tinh
astronaut|n|phi hành gia
astronomy|n|thiên văn học
atmosphere layer|phr|tầng khí quyển
comet|n|sao chổi
constellation|n|chòm sao
eclipse|n|hiện tượng nhật thực, nguyệt thực
expedition|n|cuộc thám hiểm
galaxy|n|thiên hà
gravity|n|trọng lực
launch pad|n|bệ phóng
lunar|adj|thuộc mặt trăng
meteor|n|sao băng
orbit|n|quỹ đạo
planet|n|hành tinh
probe|n|tàu thăm dò
rocket|n|tên lửa
solar system|n|hệ mặt trời
spacecraft|n|tàu vũ trụ
telescope|n|kính thiên văn
universe|n|vũ trụ
weightlessness|n|trạng thái không trọng lượng
`);

nap('Lịch sử & khảo cổ', `
ancient|adj|cổ đại
archaeologist|n|nhà khảo cổ
artefact|n|hiện vật khảo cổ
century|n|thế kỉ
civilisation|n|nền văn minh
colonial|adj|thuộc địa
decade|n|thập niên
dynasty|n|triều đại
empire|n|đế chế
excavate|v|khai quật
heritage site|n|di tích di sản
independence day|n|ngày độc lập
inscription|n|dòng chữ khắc
manuscript|n|bản chép tay
medieval|adj|thuộc thời trung cổ
monument|n|đài tưởng niệm
preserve relics|phr|bảo tồn di vật
prehistoric|adj|tiền sử
restore|v|phục dựng, trùng tu
ruins|n|phế tích
temple|n|đền, chùa
tomb|n|lăng mộ
`);

nap('Động vật & thực vật', `
adapt to habitat|phr|thích nghi với môi trường sống
amphibian|n|động vật lưỡng cư
breed in captivity|phr|nhân giống trong điều kiện nuôi nhốt
camouflage|n|sự nguỵ trang
carnivore|n|động vật ăn thịt
extinct|adj|đã tuyệt chủng
herbivore|n|động vật ăn cỏ
hibernate|v|ngủ đông
insect|n|côn trùng
mammal|n|động vật có vú
migrate|v|di cư
nocturnal|adj|hoạt động về đêm
poach|v|săn trộm
predator|n|động vật săn mồi
prey|n|con mồi
reptile|n|bò sát
sanctuary|n|khu bảo tồn
species diversity|phr|sự đa dạng loài
survival rate|n|tỉ lệ sống sót
tropical forest|n|rừng nhiệt đới
vegetation|n|thảm thực vật
`);

nap('Kinh doanh & khởi nghiệp', `
budget plan|n|kế hoạch ngân sách
client|n|khách hàng doanh nghiệp
competitor|n|đối thủ cạnh tranh
corporation|n|tập đoàn
cost-effective|adj|hiệu quả về chi phí
customer service|n|dịch vụ khách hàng
deal|n|thoả thuận
entrepreneur|n|doanh nhân khởi nghiệp
expand the market|phr|mở rộng thị trường
franchise|n|nhượng quyền thương mại
launch a product|phr|tung ra sản phẩm
merger|n|sự sáp nhập
partnership|n|quan hệ đối tác
productivity|n|năng suất
profit margin|n|biên lợi nhuận
promotion campaign|n|chiến dịch khuyến mãi
prototype|n|mẫu thử
stakeholder|n|bên liên quan
start-up|n|công ty khởi nghiệp
strategy|n|chiến lược
supply chain|n|chuỗi cung ứng
target audience|n|đối tượng khách hàng mục tiêu
turnover|n|doanh thu; tỉ lệ thay nhân sự
venture|n|dự án mạo hiểm
`);

nap('Nghệ thuật & âm nhạc', `
album|n|đĩa nhạc
audience reaction|phr|phản ứng của khán giả
composer|n|nhà soạn nhạc
craft|n|nghề thủ công
exhibition|n|triển lãm
gallery|n|phòng trưng bày
handicraft|n|đồ thủ công mĩ nghệ
instrument|n|nhạc cụ
lyrics|n|lời bài hát
masterpiece|n|kiệt tác
melody|n|giai điệu
mural|n|tranh tường
painting|n|bức tranh
perform live|phr|biểu diễn trực tiếp
poetry|n|thơ ca
portrait|n|chân dung
rehearse|v|tập dượt
sculpture|n|tác phẩm điêu khắc
stage|n|sân khấu
talent show|n|chương trình tìm kiếm tài năng
traditional music|n|nhạc truyền thống
`);

nap('Kiến trúc & đô thị bền vững', `
blueprint|n|bản thiết kế
brick and mortar|phr|cửa hàng vật lí
carbon neutral|adj|trung hoà carbon
demolish|v|phá dỡ
energy-efficient|adj|tiết kiệm năng lượng
green building|n|công trình xanh
green space|n|không gian xanh
insulation|n|lớp cách nhiệt
landmark building|n|công trình biểu tượng
public housing|n|nhà ở xã hội
renovate|v|cải tạo
roof garden|n|vườn trên mái
smart city|n|thành phố thông minh
solar panel|n|tấm pin mặt trời
sustainable design|n|thiết kế bền vững
urban planning|n|quy hoạch đô thị
walkable|adj|thuận tiện đi bộ
waste sorting|n|phân loại rác
water recycling|n|tái chế nước
zoning|n|phân khu chức năng
`);


nap('Sức khoẻ tinh thần & lối sống', `
anxiety disorder|n|rối loạn lo âu
burnout|n|tình trạng kiệt sức
cope with stress|phr|đối phó với căng thẳng
counselling|n|việc tư vấn tâm lí
depression|n|trầm cảm
emotional support|n|sự hỗ trợ tinh thần
loneliness|n|sự cô đơn
meditation|n|thiền định
mindfulness|n|sự chú tâm
peer pressure|n|áp lực từ bạn bè
positive thinking|n|suy nghĩ tích cực
recharge|v|nạp lại năng lượng
relaxation|n|sự thư giãn
self-esteem|n|lòng tự trọng
sleep quality|n|chất lượng giấc ngủ
social isolation|n|sự cô lập xã hội
therapy|n|liệu pháp điều trị
work-related stress|n|căng thẳng do công việc
`);

nap('Nông nghiệp & lương thực bền vững', `
crop rotation|n|luân canh cây trồng
drip irrigation|n|tưới nhỏ giọt
famine|n|nạn đói
food security|n|an ninh lương thực
genetically modified|adj|biến đổi gene
greenhouse|n|nhà kính
harvest season|n|mùa thu hoạch
hydroponics|n|thuỷ canh
malnutrition|n|suy dinh dưỡng
organic farming|n|canh tác hữu cơ
pest control|n|kiểm soát sâu bệnh
salinity|n|độ mặn
seedling|n|cây giống
soil fertility|n|độ phì nhiêu của đất
subsistence farming|n|canh tác tự cung tự cấp
surplus|n|phần dư thừa
sustainable yield|n|sản lượng bền vững
`);

nap('Giao thông đô thị & di chuyển', `
bus lane|n|làn dành cho xe buýt
car park|n|bãi đỗ xe
carpool|v|đi chung xe
congestion charge|n|phí chống ùn tắc
electric vehicle|n|xe điện
emission standard|n|tiêu chuẩn khí thải
ferry|n|phà
freight|n|hàng hoá vận chuyển
infrastructure project|n|dự án hạ tầng
metro system|n|hệ thống tàu điện ngầm
mobility|n|khả năng di chuyển
pedestrian zone|n|khu vực đi bộ
ride-hailing|n|dịch vụ gọi xe
road safety|n|an toàn giao thông
toll|n|phí cầu đường
transit|n|sự trung chuyển
`);

nap('Truyền thông số & mạng xã hội', `
algorithm feed|n|dòng tin do thuật toán chọn
clickbait|n|tiêu đề câu view
content creator|n|người sáng tạo nội dung
digital footprint|n|dấu vết số
echo chamber|n|buồng vọng thông tin
engagement rate|n|tỉ lệ tương tác
fake news|n|tin giả
follower|n|người theo dõi
go viral|phr|lan truyền chóng mặt
hashtag|n|thẻ chủ đề
influencer|n|người có sức ảnh hưởng
livestream|n|buổi phát trực tiếp
online reputation|n|danh tiếng trên mạng
podcast|n|chương trình âm thanh
scroll|v|lướt màn hình
screen addiction|n|nghiện màn hình
share widely|phr|chia sẻ rộng rãi
trending topic|n|chủ đề đang thịnh hành
`);

nap('Tình nguyện & cộng đồng', `
awareness campaign|n|chiến dịch nâng cao nhận thức
charity event|n|sự kiện từ thiện
civic duty|n|nghĩa vụ công dân
community service|n|hoạt động phục vụ cộng đồng
disadvantaged|adj|thiệt thòi, khó khăn
fundraise|v|gây quỹ
grassroots|adj|từ cơ sở, từ người dân
homeless|adj|vô gia cư
humanitarian|adj|nhân đạo
local authority|n|chính quyền địa phương
non-profit|adj|phi lợi nhuận
orphanage|n|trại trẻ mồ côi
outreach|n|hoạt động tiếp cận cộng đồng
philanthropy|n|hoạt động từ thiện
solidarity|n|tình đoàn kết
sponsor|v|tài trợ
underprivileged|adj|kém may mắn
welfare|n|phúc lợi
`);

nap('Động từ học thuật mở rộng', `
accumulate|v|tích luỹ
address an issue|phr|giải quyết một vấn đề
advocate|v|ủng hộ, cổ vũ cho
alleviate|v|làm giảm nhẹ
attribute to|phr|quy cho, cho là do
augment|v|làm tăng thêm
clarify|v|làm rõ
compile|v|biên soạn, tổng hợp
comprise|v|bao gồm
conceive|v|hình dung, nghĩ ra
condense|v|cô đọng lại
confront|v|đối mặt
consolidate|v|củng cố
contradict|v|mâu thuẫn với
convert|v|chuyển đổi
curb|v|kiềm chế
deduce|v|suy ra
depict|v|khắc hoạ, mô tả
deploy|v|triển khai
devise|v|nghĩ ra, thiết kế
differentiate|v|phân biệt
disrupt|v|làm gián đoạn
distort|v|bóp méo
diversify|v|đa dạng hoá
dominate|v|chiếm ưu thế
enforce a rule|phr|thi hành một quy định
enrich|v|làm giàu thêm
entail|v|kéo theo, đòi hỏi
evaluate|v|đánh giá
exaggerate|v|phóng đại
foster|v|nuôi dưỡng, thúc đẩy
generalise|v|khái quát hoá
highlight|v|làm nổi bật
hinder|v|cản trở
implement a policy|phr|thực thi một chính sách
impose|v|áp đặt
induce|v|gây ra, dẫn tới
integrate into|phr|hoà nhập vào
interpret data|phr|diễn giải dữ liệu
intervene early|phr|can thiệp sớm
monitor|v|theo dõi, giám sát
outweigh|v|lớn hơn, vượt trội
prioritise|v|ưu tiên
prohibit strictly|phr|nghiêm cấm
pursue|v|theo đuổi
reinforce|v|củng cố
resolve a conflict|phr|giải quyết xung đột
restrain|v|kìm giữ
retain|v|giữ lại
speculate|v|suy đoán
stimulate|v|kích thích
streamline|v|tinh gọn
subsidise|v|trợ cấp
supplement|v|bổ sung
tackle|v|xử lí, đương đầu
transmit|v|truyền đi
undermine|v|làm suy yếu
unify|v|thống nhất
verify|v|kiểm chứng
withstand|v|chịu đựng được
`);

nap('Tính từ mô tả mở rộng', `
accessible|adj|dễ tiếp cận
accurate data|phr|dữ liệu chính xác
ambiguous|adj|mơ hồ, đa nghĩa
apparent|adj|rõ ràng, có vẻ như
arbitrary|adj|tuỳ tiện
authentic experience|phr|trải nghiệm chân thực
beneficial effect|phr|tác động có lợi
challenging|adj|đầy thử thách
coherent|adj|mạch lạc
compulsory subject|phr|môn học bắt buộc
consistent|adj|nhất quán
controversial|adj|gây tranh cãi
credible|adj|đáng tin
crucial role|phr|vai trò then chốt
cumulative|adj|tích luỹ dần
deliberate|adj|có chủ ý
distinct|adj|khác biệt rõ rệt
diverse|adj|đa dạng
dramatic increase|phr|sự tăng mạnh
dynamic|adj|năng động
elaborate plan|phr|kế hoạch công phu
enormous|adj|khổng lồ
excessive|adj|quá mức
explicit|adj|rõ ràng, tường minh
feasible|adj|khả thi
fundamental|adj|căn bản
genuine|adj|thật, chân thành
gradual decline|phr|sự giảm dần
implicit|adj|ngầm hiểu
inadequate|adj|không đầy đủ
inevitable outcome|phr|kết cục tất yếu
innovative|adj|mang tính đổi mới
intense|adj|dữ dội, mãnh liệt
irrelevant|adj|không liên quan
marginal|adj|không đáng kể
moderate|adj|vừa phải
mutual|adj|lẫn nhau
notable|adj|đáng chú ý
outstanding|adj|xuất sắc, nổi bật
persistent problem|phr|vấn đề dai dẳng
plausible|adj|nghe có lí
precise|adj|chính xác đến từng chi tiết
prevalent|adj|phổ biến, thịnh hành
profound|adj|sâu sắc
radical|adj|triệt để, cấp tiến
remarkable|adj|đáng kinh ngạc
robust|adj|vững chắc
severe|adj|nghiêm trọng
subsequent|adj|tiếp theo sau
subtle|adj|tinh tế, khó nhận ra
superficial|adj|hời hợt
transparent process|phr|quy trình minh bạch
unprecedented|adj|chưa từng có
viable|adj|có thể thực hiện được
vulnerable|adj|dễ bị tổn thương
`);

nap('Cụm động từ mở rộng', `
account for|phr|chiếm tỉ lệ; giải thích cho
add up to|phr|cộng lại thành
back up|phr|sao lưu; ủng hộ
bring up a topic|phr|nêu một chủ đề
call for|phr|kêu gọi, đòi hỏi
carry on|phr|tiếp tục
catch up on|phr|bù lại phần bị chậm
come up with|phr|nghĩ ra
count on|phr|trông cậy vào
cut off|phr|cắt đứt, ngắt
do away with|phr|xoá bỏ
drop by|phr|ghé qua
end up|phr|rốt cuộc lại
fall behind|phr|tụt lại phía sau
get along|phr|hoà hợp
get rid of|phr|loại bỏ
give in|phr|nhượng bộ
go through|phr|trải qua
hold back|phr|kìm lại
keep track of|phr|theo dõi sát
lay off|phr|cho thôi việc
live up to|phr|sống xứng với kì vọng
look after children|phr|trông nom trẻ
make up for|phr|bù đắp cho
opt for|phr|chọn lấy
pass on|phr|truyền lại
pick up a skill|phr|học lỏm một kĩ năng
point out|phr|chỉ ra
put forward|phr|đề xuất
result in failure|phr|dẫn tới thất bại
rule out|phr|loại trừ
set aside|phr|dành riêng ra
sort out|phr|sắp xếp, giải quyết
stand for|phr|viết tắt của; ủng hộ
stick to|phr|bám sát, kiên trì với
take over|phr|tiếp quản
turn out|phr|hoá ra là
wear off|phr|nhạt dần, hết tác dụng
`);


nap('Họ từ — gốc từ và các dạng phái sinh', `
analyse|v|phân tích
analysis|n|sự phân tích
analyst|n|nhà phân tích
apply|v|áp dụng; nộp đơn
application|n|đơn xin; ứng dụng
applicable|adj|có thể áp dụng
argument|n|lập luận, cuộc tranh cãi
argumentative|adj|hay tranh cãi
competitive|adj|có tính cạnh tranh
competitor company|phr|công ty đối thủ
conclude|v|kết luận
conclusion|n|kết luận
conclusive|adj|có tính quyết định
create|v|tạo ra
creation|n|sự sáng tạo, tác phẩm
creator|n|người sáng tạo
decide|v|quyết định
decisive|adj|dứt khoát, quyết định
depend on|phr|phụ thuộc vào
dependent|adj|phụ thuộc
independent thinking|phr|tư duy độc lập
differ|v|khác nhau
difference|n|sự khác biệt
differently|adv|một cách khác biệt
educate|v|giáo dục
education|n|nền giáo dục
educational|adj|thuộc giáo dục
educator|n|nhà giáo dục
employ|v|thuê làm việc
employment|n|việc làm
unemployed|adj|thất nghiệp
environment|n|môi trường
environmental|adj|thuộc môi trường
environmentalist|n|nhà hoạt động môi trường
examine closely|phr|xem xét kĩ
examination|n|kì thi, sự kiểm tra
explain|v|giải thích
explanation|n|lời giải thích
explanatory|adj|có tính giải thích
inform|v|thông báo
information|n|thông tin
informative|adj|nhiều thông tin
introduction|n|phần mở đầu
introductory|adj|nhập môn
invent|v|phát minh
inventor|n|nhà phát minh
inventive|adj|giàu sáng chế
know|v|biết
knowledgeable|adj|hiểu biết rộng
maintain quality|phr|duy trì chất lượng
maintenance cost|phr|chi phí bảo trì
observe carefully|phr|quan sát cẩn thận
observation|n|sự quan sát
observant|adj|tinh ý
produce|v|sản xuất
production|n|sự sản xuất
productive|adj|hiệu quả, năng suất
protection|n|sự bảo vệ
protective|adj|có tính bảo vệ
receive|v|nhận
reception|n|sự tiếp nhận, quầy lễ tân
recipient|n|người nhận
reduce waste|phr|giảm rác thải
reduction|n|sự cắt giảm
succeed|v|thành công
successfully|adv|một cách thành công
suggestion box|phr|hộp góp ý
vary widely|phr|khác nhau rất nhiều
variety|n|sự đa dạng
variation|n|sự biến thiên
`);

nap('Danh từ trừu tượng thường gặp', `
achievement gap|n|khoảng cách thành tích
adaptation|n|sự thích nghi
alternative solution|n|giải pháp thay thế
assumption|n|giả định
awareness|n|nhận thức
barrier|n|rào cản
benefit package|n|gói phúc lợi
burden|n|gánh nặng
capacity|n|sức chứa, năng lực
consensus|n|sự đồng thuận
consequence of action|phr|hệ quả của hành động
constraint|n|ràng buộc
context|n|bối cảnh
contradiction|n|sự mâu thuẫn
controversy|n|cuộc tranh cãi
criterion|n|tiêu chí
dilemma|n|tình thế tiến thoái lưỡng nan
disparity|n|sự chênh lệch
dominance|n|sự thống trị
efficiency|n|hiệu suất
emphasis|n|sự nhấn mạnh
equivalent value|phr|giá trị tương đương
exception|n|ngoại lệ
expectation|n|kì vọng
exposure|n|sự tiếp xúc, phơi nhiễm
framework|n|khung khổ
implication|n|hàm ý, hệ quả
incentive|n|động lực khuyến khích
indicator|n|chỉ số, dấu hiệu
inequality|n|sự bất bình đẳng
influence on|phr|ảnh hưởng tới
insight|n|sự thấu hiểu sâu sắc
integrity|n|sự chính trực
interference|n|sự can thiệp, nhiễu
limitation|n|hạn chế
mechanism|n|cơ chế
norm|n|chuẩn mực
obligation|n|nghĩa vụ
occurrence|n|sự xuất hiện
perception|n|nhận thức, cảm nhận
phenomenon of nature|phr|hiện tượng tự nhiên
preference|n|sự ưa thích hơn
prevalence|n|mức độ phổ biến
procedure|n|thủ tục, quy trình
proportion|n|tỉ lệ
recognition|n|sự công nhận
regulation of traffic|phr|việc điều tiết giao thông
requirement|n|yêu cầu bắt buộc
restriction|n|sự hạn chế
significance|n|tầm quan trọng
stability|n|sự ổn định
standard of living|n|mức sống
sustainability|n|tính bền vững
tendency to|phr|xu hướng làm gì
threshold|n|ngưỡng
transition|n|sự chuyển tiếp
variable|n|biến số
`);

nap('Cụm giới từ và cụm cố định', `
at first glance|phr|thoạt nhìn
at the expense of|phr|với cái giá phải trả là
at the mercy of|phr|phó mặc cho
by and large|phr|nhìn chung
by means of|phr|bằng cách
for the sake of|phr|vì lợi ích của
in accordance with|phr|phù hợp với
in addition to|phr|ngoài ra còn
in charge of|phr|phụ trách
in comparison with|phr|so với
in contrast to|phr|trái ngược với
in favour of|phr|ủng hộ
in general|phr|nói chung
in light of|phr|xét theo, dựa trên
in line with|phr|phù hợp với
in need of|phr|đang cần
in order that|phr|để mà
in particular|phr|đặc biệt là
in place of|phr|thay cho
in response to|phr|để đáp lại
in return for|phr|đổi lại
in search of|phr|đi tìm
in spite of the fact that|phr|mặc dù thực tế là
in terms of quality|phr|xét về chất lượng
in the event of|phr|trong trường hợp
in the long term|phr|về dài hạn
in the short term|phr|trong ngắn hạn
on account of|phr|vì, do bởi
on behalf of|phr|thay mặt cho
on condition that|phr|với điều kiện là
on the contrary|phr|trái lại
on the grounds that|phr|với lí do rằng
on the increase|phr|đang gia tăng
on the verge of|phr|bên bờ vực của
regardless of cost|phr|bất kể chi phí
subject to change|phr|có thể thay đổi
with regard to|phr|liên quan tới
with respect to|phr|xét về
`);

nap('Mô tả số liệu và xu hướng', `
account for a share|phr|chiếm một tỉ lệ
climb steadily|phr|tăng đều đặn
decline sharply|phr|giảm mạnh
double|v|tăng gấp đôi
drop dramatically|phr|giảm đột ngột
fluctuate around|phr|dao động quanh mức
gradual rise|phr|sự tăng dần
halve|v|giảm một nửa
hit a peak|phr|đạt đỉnh
level off|phr|đi ngang, chững lại
majority|n|đa số
minority|n|thiểu số
outnumber|v|nhiều hơn về số lượng
overall trend|phr|xu hướng chung
peak at|phr|đạt cực đại ở mức
plummet|v|lao dốc
proportionately|adv|một cách tương ứng
quadruple|v|tăng gấp bốn
ratio|n|tỉ số
remain stable|phr|giữ ổn định
rise steadily|phr|tăng ổn định
roughly|adv|khoảng chừng
significant gap|phr|khoảng cách đáng kể
soar|v|tăng vọt
steady decline|phr|sự giảm đều
substantially|adv|một cách đáng kể
surge|v|tăng vọt đột ngột
triple|v|tăng gấp ba
`);

nap('Trạng từ và từ nối mở rộng', `
accordingly|adv|theo đó
admittedly|adv|phải thừa nhận rằng
alternatively|adv|hoặc là, cách khác
arguably|adv|có thể cho rằng
basically|adv|về cơ bản
briefly|adv|một cách ngắn gọn
conversely|adv|ngược lại
deliberately|adv|một cách cố ý
essentially|adv|về bản chất
explicitly|adv|một cách rõ ràng
finally|adv|cuối cùng
firstly|adv|thứ nhất
genuinely|adv|một cách chân thành
hence|adv|do đó
ideally|adv|lí tưởng nhất là
inevitably|adv|không tránh khỏi
initially|adv|ban đầu
largely|adv|phần lớn là
literally|adv|theo nghĩa đen
mainly|adv|chủ yếu
merely|adv|chỉ đơn thuần
mostly|adv|hầu hết
naturally|adv|một cách tự nhiên
notably|adv|đáng chú ý là
overall|adv|nhìn chung
partly|adv|một phần
precisely|adv|một cách chính xác
presumably|adv|có lẽ là
primarily|adv|trước hết là
rapidly|adv|một cách nhanh chóng
readily|adv|sẵn sàng, dễ dàng
regularly|adv|đều đặn
respectively|adv|theo thứ tự tương ứng
secondly|adv|thứ hai
significantly higher|phr|cao hơn đáng kể
simultaneously|adv|đồng thời
specifically|adv|cụ thể là
steadily|adv|đều đặn
strictly|adv|nghiêm ngặt
subsequently|adv|sau đó
surprisingly|adv|đáng ngạc nhiên là
typically|adv|thường thì
ultimately|adv|rốt cuộc
undoubtedly|adv|không nghi ngờ gì
virtually|adv|hầu như
widely|adv|rộng rãi
`);

nap('Từ vựng lễ hội và văn hoá Việt Nam', `
altar|n|bàn thờ
ancestor worship|n|tục thờ cúng tổ tiên
bamboo|n|cây tre
banh chung|n|bánh chưng
calligraphy|n|thư pháp
ceremony|n|buổi lễ
conical hat|n|nón lá
craft village|n|làng nghề
dragon dance|n|múa rồng
firecracker|n|pháo
folk song|n|dân ca
generosity|n|lòng hào phóng
harvest festival|n|lễ hội mùa màng
incense|n|hương, nhang
lantern|n|đèn lồng
lion dance|n|múa lân
lunar new year|n|Tết Nguyên đán
offering|n|đồ cúng lễ
pagoda|n|ngôi chùa
paddy|n|lúa nước
red envelope|n|bao lì xì
reunion dinner|n|bữa cơm đoàn viên
rice cake|n|bánh làm từ gạo
ritual ceremony|phr|nghi lễ
superstition|n|sự mê tín
tray of five fruits|phr|mâm ngũ quả
worship|v|thờ cúng
`);

nap('Từ vựng trường học và du học', `
academic year|n|năm học
admission|n|việc nhận vào học
alumni|n|cựu học sinh, cựu sinh viên
application form|n|đơn đăng kí
boarding school|n|trường nội trú
career guidance|n|hướng nghiệp
class monitor|n|lớp trưởng
coursework|n|bài tập trong khoá học
credit transfer|n|chuyển đổi tín chỉ
cultural shock|n|sốc văn hoá
deadline extension|n|gia hạn nộp bài
dissertation|n|luận văn
exchange programme|n|chương trình trao đổi
extracurricular activity|n|hoạt động ngoại khoá
final exam|n|kì thi cuối kì
grading system|n|hệ thống chấm điểm
homesick|adj|nhớ nhà
intake|n|đợt tuyển sinh
internship|n|kì thực tập
learning outcome|n|chuẩn đầu ra
mentor|n|người hướng dẫn
oral presentation|n|bài thuyết trình
pass mark|n|điểm đạt
placement test|n|bài kiểm tra xếp lớp
research paper|n|bài nghiên cứu
scholarship recipient|n|người nhận học bổng
student loan|n|khoản vay sinh viên
study abroad|phr|du học
timetable clash|n|trùng lịch học
tuition waiver|n|miễn học phí
`);


nap('Từ thông dụng trong bài đọc', `
according|adj|theo như
achieve a goal|phr|đạt được mục tiêu
afterwards|adv|sau đó
aim at|phr|nhắm tới
allow access|phr|cho phép tiếp cận
amount|n|lượng, số lượng
appear|v|xuất hiện, có vẻ
arise|v|nảy sinh
avoid mistakes|phr|tránh sai sót
belong|v|thuộc về
benefit from|phr|hưởng lợi từ
carry out research|phr|tiến hành nghiên cứu
cause|n|nguyên nhân
choice|n|sự lựa chọn
connect|v|kết nối
contain|v|chứa đựng
continue|v|tiếp tục
control|v|kiểm soát
cover|v|bao gồm, che phủ
decrease sharply|phr|giảm mạnh
degree of change|phr|mức độ thay đổi
demand|n|nhu cầu
design|v|thiết kế
detail|n|chi tiết
develop skills|phr|phát triển kĩ năng
discovery|n|khám phá
divide|v|chia
effort to change|phr|nỗ lực thay đổi
encourage students|phr|khuyến khích học sinh
ensure|v|bảo đảm
example|n|ví dụ
exist|v|tồn tại
expect|v|mong đợi
experiment with|phr|thử nghiệm với
face difficulties|phr|đối mặt khó khăn
figure|n|con số; hình vẽ
follow|v|theo sau, tuân theo
form|v|hình thành
gain experience|phr|tích luỹ kinh nghiệm
happen|v|xảy ra
hold a meeting|phr|tổ chức cuộc họp
image|n|hình ảnh
include|v|bao gồm
increase gradually|phr|tăng dần
issue|n|vấn đề
item|n|món, mục
keep records|phr|lưu hồ sơ
lack|n|sự thiếu hụt
lead a team|phr|dẫn dắt một nhóm
level|n|mức độ
limit|v|giới hạn
link|n|mối liên hệ
manner|n|cách thức
matter|v|có ý nghĩa quan trọng
measure|v|đo lường
mention briefly|phr|nhắc qua
note|v|ghi nhận
notice|v|nhận thấy
offer|v|đề nghị, cung cấp
operate|v|vận hành
order|n|thứ tự; đơn hàng
own|v|sở hữu
period|n|giai đoạn
place|n|nơi chốn
point|n|điểm, luận điểm
position|n|vị trí
prepare for|phr|chuẩn bị cho
present|v|trình bày
prevent damage|phr|ngăn thiệt hại
process|n|quá trình
produce goods|phr|sản xuất hàng hoá
provide support|phr|cung cấp hỗ trợ
raise a question|phr|đặt ra một câu hỏi
range|n|phạm vi
reach agreement|phr|đạt được thoả thuận
realise|v|nhận ra
receive feedback|phr|nhận phản hồi
record|v|ghi lại
refer to|phr|nhắc tới, quy chiếu
reflect|v|phản ánh
regard as|phr|coi như là
relate to|phr|liên quan tới
remain|v|vẫn còn
remove|v|loại bỏ
report|v|báo cáo
represent a group|phr|đại diện cho một nhóm
require effort|phr|đòi hỏi nỗ lực
respond quickly|phr|phản hồi nhanh
return|v|trở lại
select|v|lựa chọn
sense|n|giác quan; ý nghĩa
serve|v|phục vụ
show|v|cho thấy
similar to|phr|tương tự như
source of energy|phr|nguồn năng lượng
spread|v|lan rộng
state|v|phát biểu, nêu rõ
step|n|bước
structure|n|cấu trúc
suffer damage|phr|chịu thiệt hại
supply water|phr|cung cấp nước
support the view|phr|ủng hộ quan điểm
suppose|v|cho rằng
system|n|hệ thống
test|v|kiểm tra
treat|v|đối xử, xử lí
type|n|loại
view|n|quan điểm
whole|adj|toàn bộ
`);

nap('Cặp từ và sắc thái nghĩa', `
affordable|adj|có giá phải chăng
ancient tradition|phr|truyền thống lâu đời
brand-new|adj|hoàn toàn mới
compulsory attendance|phr|việc đi học bắt buộc
countless|adj|vô số
crowded|adj|đông đúc
current situation|phr|tình hình hiện tại
daily routine|phr|thói quen hằng ngày
dense|adj|dày đặc
distant|adj|xa xôi
early stage|phr|giai đoạn đầu
elderly people|phr|người cao tuổi
endless|adj|vô tận
fragile|adj|mong manh, dễ vỡ
gigantic|adj|khổng lồ
harsh|adj|khắc nghiệt
identical|adj|giống hệt
immediate|adj|tức thời
inexpensive option|phr|lựa chọn không tốn kém
lengthy|adj|dài dòng
lifelong|adj|suốt đời
massive|adj|đồ sộ
minor|adj|nhỏ, thứ yếu
modest|adj|khiêm tốn
numerous|adj|nhiều
ongoing|adj|đang diễn ra
optional|adj|không bắt buộc
ordinary|adj|bình thường
overwhelming|adj|áp đảo, choáng ngợp
peaceful|adj|yên bình
permanent job|phr|công việc lâu dài
potential risk|phr|rủi ro tiềm ẩn
previous experience|phr|kinh nghiệm trước đó
private|adj|riêng tư
recent survey|phr|khảo sát gần đây
relevant information|phr|thông tin liên quan
reliable source|phr|nguồn đáng tin
scarce|adj|khan hiếm
sensible choice|phr|lựa chọn khôn ngoan
sheer|adj|thuần tuý, hoàn toàn
sudden|adj|đột ngột
temporary solution|phr|giải pháp tạm thời
tiny|adj|tí hon
tremendous|adj|to lớn
unexpected|adj|bất ngờ
unfamiliar|adj|xa lạ
unique feature|phr|đặc điểm độc nhất
unlikely|adj|khó xảy ra
urgent|adj|khẩn cấp
worthwhile|adj|đáng công sức
`);


nap('Từ vựng bổ sung cuối', `
abolish|v|bãi bỏ
abundance|n|sự dồi dào
accelerate growth|phr|đẩy nhanh tăng trưởng
accommodate|v|chứa được, đáp ứng
acknowledge|v|thừa nhận
acquire knowledge|phr|thu nhận kiến thức
adhere to|phr|tuân thủ
adjacent|adj|kề bên
affluent|adj|giàu có
aggregate|n|tổng hợp
allocate resources|phr|phân bổ nguồn lực
ambiguity|n|sự mơ hồ
amend|v|sửa đổi
anonymous|adj|ẩn danh
appraisal|n|sự đánh giá
apprehension|n|sự lo ngại
articulate|v|diễn đạt rõ ràng
ascertain|v|xác định chắc chắn
aspiration|n|khát vọng
assemble|v|tập hợp, lắp ráp
assert|v|khẳng định
assign a task|phr|giao một nhiệm vụ
attain|v|đạt tới
attribute|n|thuộc tính
authorise|v|cho phép chính thức
bilateral|adj|song phương
biodegradable|adj|phân huỷ sinh học được
boost morale|phr|nâng cao tinh thần
brevity|n|sự ngắn gọn
capitalise on|phr|tận dụng lợi thế
census|n|cuộc tổng điều tra dân số
certify|v|chứng nhận
cite a source|phr|trích dẫn nguồn
coincidence|n|sự trùng hợp
collective|adj|tập thể
commence|v|bắt đầu
compensate for|phr|bù đắp cho
compile data|phr|tổng hợp dữ liệu
comply|v|tuân thủ
comprehend|v|hiểu thấu
concede|v|nhượng bộ, thừa nhận
conform to|phr|tuân theo
confine|v|giới hạn trong
conserve|v|bảo tồn
contemplate|v|ngẫm nghĩ
contemporary|adj|đương đại
convey a message|phr|truyền tải thông điệp
correspond to|phr|tương ứng với
counterpart|n|người, vật tương đương
credibility|n|độ tin cậy
cultivate a habit|phr|nuôi dưỡng một thói quen
deficiency|n|sự thiếu hụt
delegate authority|phr|phân quyền
deteriorating|adj|đang xấu đi
deterrent|n|yếu tố răn đe
discrepancy|n|sự sai lệch
disseminate|v|phổ biến rộng rãi
distinguish between|phr|phân biệt giữa
elicit|v|khơi gợi ra
eloquent|adj|hùng hồn
embrace change|phr|đón nhận thay đổi
eradicate|v|xoá sổ hoàn toàn
exemplify|v|minh hoạ điển hình
exert influence|phr|gây ảnh hưởng
exploit resources|phr|khai thác tài nguyên
feasibility|n|tính khả thi
fluctuation|n|sự dao động
forecast demand|phr|dự báo nhu cầu
formulate a plan|phr|xây dựng một kế hoạch
gauge|v|đo lường, đánh giá
hierarchy|n|hệ thống thứ bậc
impartial|adj|khách quan, không thiên vị
imperative|adj|cấp thiết
inclusive|adj|bao trùm, không loại trừ ai
incorporate feedback|phr|tiếp thu phản hồi
incur costs|phr|phát sinh chi phí
indispensable|adj|không thể thiếu
inherent|adj|vốn có
innovate|v|đổi mới sáng tạo
insufficient|adj|không đủ
intact|adj|còn nguyên vẹn
intricate|adj|phức tạp tinh vi
lucrative|adj|sinh lợi cao
mandatory|adj|bắt buộc
mitigate|v|làm giảm nhẹ
negligible|adj|không đáng kể
nurture talent|phr|nuôi dưỡng tài năng
obsolete|adj|lỗi thời
optimal|adj|tối ưu
paradox|n|nghịch lí
persistent effort|phr|nỗ lực bền bỉ
pinpoint|v|xác định chính xác
precede|v|đi trước
predominantly|adv|chủ yếu là
proponent|n|người ủng hộ
reciprocal|adj|có đi có lại
redundant staff|phr|nhân sự dôi dư
refute|v|bác bỏ
reluctance|n|sự miễn cưỡng
render|v|làm cho trở nên
replicate|v|nhân bản, lặp lại
resilient|adj|kiên cường, phục hồi tốt
scrutinise|v|xem xét kĩ lưỡng
sequential|adj|theo trình tự
substantiate|v|chứng minh bằng bằng chứng
surpass|v|vượt qua
tangible|adj|hữu hình
thrive|v|phát triển mạnh
transcend|v|vượt lên trên
unanimous|adj|nhất trí hoàn toàn
underestimate|v|đánh giá thấp
uphold|v|giữ vững, duy trì
utilise resources|phr|tận dụng nguồn lực
versatility|n|tính linh hoạt đa năng
vigorous|adj|mạnh mẽ, hăng hái
warrant|v|đủ để biện minh cho
widespread adoption|phr|sự áp dụng rộng rãi
yield results|phr|mang lại kết quả
`);

/* ---------- COLLOCATION: động từ + danh từ, tính từ + giới từ ---------- */
TD.KHO_COLLOC = TD.KHO_COLLOC || [];
const nc = (nhom, tho) => {
  tho.trim().split('\n').forEach(d => {
    const p = d.split('|');
    if (p.length < 3) return;
    TD.KHO_COLLOC.push({ tu: p[0].trim(), cum: p[1].trim(), n: p[2].trim(), nhom: nhom });
  });
};

nc('make / do / take / have', `
make|a decision|đưa ra quyết định
make|an effort|nỗ lực
make|progress|tiến bộ
make|a mistake|mắc lỗi
make|friends|kết bạn
make|a difference|tạo ra khác biệt
make|an appointment|hẹn gặp
make|a suggestion|đưa ra gợi ý
do|homework|làm bài tập về nhà
do|housework|làm việc nhà
do|research|nghiên cứu
do|business|kinh doanh
do|a favour|giúp một việc
do|the washing-up|rửa bát
do|exercise|tập thể dục
take|care of|chăm sóc
take|part in|tham gia
take|place|diễn ra
take|advantage of|tận dụng
take|responsibility|nhận trách nhiệm
take|a risk|chấp nhận rủi ro
take|notes|ghi chép
have|a good time|có khoảng thời gian vui vẻ
have|an effect on|có ảnh hưởng tới
have|difficulty in|gặp khó khăn khi
have|access to|có quyền tiếp cận
have|a chat|trò chuyện
have|breakfast|ăn sáng
`);

nc('Tính từ + giới từ', `
good|at|giỏi về
bad|at|kém về
interested|in|quan tâm tới
afraid|of|sợ
proud|of|tự hào về
aware|of|nhận thức được
capable|of|có khả năng
fond|of|thích
tired|of|chán ngán
famous|for|nổi tiếng vì
responsible|for|chịu trách nhiệm về
suitable|for|phù hợp với
grateful|for|biết ơn vì
different|from|khác với
absent|from|vắng mặt ở
similar|to|giống với
addicted|to|nghiện
harmful|to|có hại cho
married|to|kết hôn với
satisfied|with|hài lòng với
familiar|with|quen thuộc với
crowded|with|đông đúc
disappointed|with|thất vọng về
worried|about|lo lắng về
`);

nc('Động từ + giới từ', `
depend|on|phụ thuộc vào
concentrate|on|tập trung vào
insist|on|khăng khăng đòi
rely|on|dựa vào
believe|in|tin vào
succeed|in|thành công trong
result|in|dẫn đến kết quả là
result|from|bắt nguồn từ
suffer|from|chịu đựng, mắc phải
prevent|from|ngăn không cho
apologise|for|xin lỗi vì
apply|for|nộp đơn xin
search|for|tìm kiếm
wait|for|chờ đợi
belong|to|thuộc về
contribute|to|góp phần vào
lead|to|dẫn tới
object|to|phản đối
agree|with|đồng ý với
deal|with|giải quyết
provide|with|cung cấp cho
compare|with|so sánh với
accuse|of|buộc tội
consist|of|bao gồm
`);

nc('Cụm danh từ thường gặp', `
heavy|rain|mưa lớn
strong|wind|gió mạnh
heavy|traffic|giao thông đông đúc
high|salary|lương cao
close|friend|bạn thân
serious|problem|vấn đề nghiêm trọng
huge|impact|tác động to lớn
key|role|vai trò then chốt
main|reason|lí do chính
wide|range|phạm vi rộng
growing|concern|mối lo ngại ngày càng tăng
major|challenge|thách thức lớn
significant|improvement|sự cải thiện đáng kể
valuable|experience|kinh nghiệm quý báu
`);

nc('Động từ + danh từ', `
achieve|a goal|đạt được mục tiêu
break|a promise|thất hứa
break|a record|phá kỉ lục
catch|a cold|bị cảm
cause|damage|gây thiệt hại
change|one's mind|đổi ý
commit|a crime|phạm tội
conduct|a survey|tiến hành khảo sát
draw|a conclusion|rút ra kết luận
earn|a living|kiếm sống
face|a challenge|đối mặt thách thức
fill in|a form|điền vào mẫu đơn
follow|instructions|làm theo hướng dẫn
gain|experience|tích luỹ kinh nghiệm
give|a speech|đọc diễn văn
hold|a meeting|tổ chức cuộc họp
keep|a promise|giữ lời hứa
keep|a secret|giữ bí mật
lose|touch|mất liên lạc
lose|weight|giảm cân
meet|a deadline|kịp hạn chót
meet|demand|đáp ứng nhu cầu
miss|an opportunity|bỏ lỡ cơ hội
pass|an exam|thi đỗ
pay|a fine|nộp phạt
play|a role|đóng vai trò
raise|awareness|nâng cao nhận thức
raise|money|gây quỹ
reach|an agreement|đạt thoả thuận
run|a business|điều hành doanh nghiệp
save|energy|tiết kiệm năng lượng
save|time|tiết kiệm thời gian
set|a record|lập kỉ lục
set|an example|làm gương
solve|a problem|giải quyết vấn đề
spend|time|dành thời gian
tell|the truth|nói thật
throw|a party|tổ chức tiệc
waste|money|lãng phí tiền
win|a prize|đoạt giải
`);

nc('Tính từ + danh từ', `
bitter|disappointment|nỗi thất vọng cay đắng
broad|range|phạm vi rộng
deep|impression|ấn tượng sâu sắc
extreme|weather|thời tiết khắc nghiệt
firm|belief|niềm tin vững chắc
golden|opportunity|cơ hội vàng
hard|work|sự chăm chỉ
heavy|smoker|người nghiện thuốc nặng
high|standard|tiêu chuẩn cao
keen|interest|sự quan tâm sâu sắc
long|history|lịch sử lâu đời
narrow|escape|thoát hiểm trong gang tấc
outstanding|performance|màn trình diễn xuất sắc
practical|experience|kinh nghiệm thực tế
public|opinion|dư luận
rapid|growth|sự tăng trưởng nhanh
rough|estimate|ước tính sơ bộ
severe|shortage|sự thiếu hụt nghiêm trọng
sharp|rise|sự tăng đột ngột
strong|evidence|bằng chứng thuyết phục
tight|schedule|lịch trình chặt
vital|role|vai trò sống còn
warm|welcome|sự chào đón nồng nhiệt
wide|gap|khoảng cách lớn
`);

nc('Cụm với danh từ trừu tượng', `
a sense|of belonging|cảm giác thuộc về
a source|of income|nguồn thu nhập
a lack|of confidence|sự thiếu tự tin
a means|of transport|phương tiện đi lại
a matter|of time|chỉ là vấn đề thời gian
a piece|of advice|một lời khuyên
a range|of options|một loạt lựa chọn
a shortage|of water|sự thiếu nước
a waste|of time|sự lãng phí thời gian
an act|of kindness|một hành động tử tế
in the process|of learning|trong quá trình học
on the basis|of evidence|dựa trên bằng chứng
the impact|of technology|tác động của công nghệ
the level|of pollution|mức độ ô nhiễm
the risk|of failure|nguy cơ thất bại
the role|of education|vai trò của giáo dục
`);

nc('Động từ + trạng từ', `
apologise|sincerely|xin lỗi chân thành
behave|responsibly|cư xử có trách nhiệm
change|dramatically|thay đổi đột ngột
consider|carefully|cân nhắc kĩ
cooperate|closely|hợp tác chặt chẽ
decline|steadily|giảm đều
depend|heavily|phụ thuộc nặng nề
differ|slightly|khác nhau đôi chút
disagree|strongly|phản đối mạnh mẽ
grow|rapidly|tăng nhanh
improve|significantly|cải thiện đáng kể
listen|attentively|lắng nghe chăm chú
plan|ahead|lên kế hoạch trước
react|immediately|phản ứng ngay
speak|fluently|nói trôi chảy
support|fully|hoàn toàn ủng hộ
work|efficiently|làm việc hiệu quả
`);

nc('Cụm học thuật trong bài viết', `
draw attention|to|thu hút sự chú ý tới
give rise|to|làm nảy sinh
have an impact|on|có tác động tới
lead|to consequences|dẫn tới hệ quả
place emphasis|on|đặt trọng tâm vào
play a part|in|góp phần vào
put pressure|on|gây áp lực lên
take account|of|tính tới, xét tới
take advantage|of|tận dụng
take into consideration|the cost|cân nhắc chi phí
take responsibility|for|chịu trách nhiệm về
take steps|to solve|tiến hành các bước để giải quyết
bear in mind|the risk|ghi nhớ rủi ro
come to a conclusion|about|đi đến kết luận về
make a contribution|to|đóng góp cho
make a difference|to|tạo khác biệt cho
`);

nc('Cụm thời gian và tần suất', `
at|the moment|ngay lúc này
at|the same time|cùng lúc
by|the end of|vào cuối
for|the time being|tạm thời
from|time to time|thỉnh thoảng
in|advance|trước, sớm
in|due course|đến lúc thích hợp
in|no time|rất nhanh
in|the meantime|trong khi chờ đợi
on|a daily basis|hằng ngày
on|a regular basis|thường xuyên
on|time|đúng giờ
once|in a while|thi thoảng
over|the past decade|trong thập niên qua
sooner|than expected|sớm hơn dự kiến
up|to now|cho tới nay
`);

nc('Cụm nguyên nhân – kết quả', `
as a consequence|of|hậu quả của việc
be attributed|to|được cho là do
be responsible|for the rise|chịu trách nhiệm cho sự gia tăng
bring|about change|mang lại thay đổi
contribute|to the problem|góp phần vào vấn đề
give|rise to concern|làm dấy lên lo ngại
result|in improvement|dẫn tới cải thiện
stem|from poverty|bắt nguồn từ nghèo đói
trigger|a reaction|kích hoạt một phản ứng
arise|from misunderstanding|nảy sinh từ hiểu lầm
`);

nc('Cụm về vấn đề và giải pháp', `
address|the root cause|xử lí gốc rễ vấn đề
alleviate|poverty|xoá đói giảm nghèo
cope|with pressure|chịu được áp lực
find|a solution|tìm ra giải pháp
implement|measures|triển khai biện pháp
overcome|obstacles|vượt qua trở ngại
pose|a threat|đặt ra mối đe doạ
raise|concerns|dấy lên quan ngại
tackle|climate change|đối phó biến đổi khí hậu
resolve|the issue|giải quyết vấn đề
`);

nc('Cụm về học tập và công việc', `
attend|a course|tham dự một khoá học
apply|for a scholarship|nộp đơn xin học bổng
broaden|one's horizons|mở mang tầm mắt
develop|a strategy|xây dựng chiến lược
enrol|on a programme|ghi danh một chương trình
fulfil|requirements|đáp ứng yêu cầu
gain|qualifications|đạt được bằng cấp
hand|in an assignment|nộp bài tập
hold|a degree|có bằng cấp
meet|expectations|đáp ứng kì vọng
pursue|a career|theo đuổi sự nghiệp
sit|an exam|dự thi
submit|an application|nộp hồ sơ
take|a gap year|nghỉ một năm trước khi học tiếp
undertake|research|thực hiện nghiên cứu
work|under pressure|làm việc dưới áp lực
`);

nc('Cụm về môi trường và xã hội', `
combat|pollution|chống ô nhiễm
conserve|natural resources|bảo tồn tài nguyên
cut|carbon emissions|cắt giảm khí thải carbon
promote|sustainability|thúc đẩy phát triển bền vững
protect|biodiversity|bảo vệ đa dạng sinh học
reduce|waste|giảm rác thải
restore|ecosystems|phục hồi hệ sinh thái
bridge|the gap|thu hẹp khoảng cách
close|the digital divide|xoá khoảng cách số
foster|social inclusion|thúc đẩy hoà nhập xã hội
narrow|inequality|thu hẹp bất bình đẳng
strengthen|community ties|củng cố gắn kết cộng đồng
`);

nc('Cụm động từ + danh từ mở rộng', `
answer|the phone|nghe điện thoại
book|a ticket|đặt vé
build|confidence|xây dựng sự tự tin
carry|the risk|mang theo rủi ro
cause|concern|gây lo ngại
create|opportunities|tạo ra cơ hội
deliver|a service|cung cấp dịch vụ
develop|a habit|hình thành thói quen
express|an opinion|bày tỏ ý kiến
generate|income|tạo ra thu nhập
grant|permission|cấp phép
issue|a warning|đưa ra cảnh báo
launch|a campaign|phát động chiến dịch
maintain|balance|giữ cân bằng
offer|assistance|đề nghị giúp đỡ
provide|evidence|đưa ra bằng chứng
receive|treatment|được điều trị
reduce|the risk|giảm rủi ro
seek|advice|xin lời khuyên
serve|a purpose|phục vụ một mục đích
share|responsibility|chia sẻ trách nhiệm
show|improvement|cho thấy sự tiến bộ
take|action|hành động
undergo|training|trải qua đào tạo
`);

nc('Cụm tính từ + danh từ mở rộng', `
common|misconception|hiểu lầm phổ biến
considerable|amount|một lượng đáng kể
critical|factor|yếu tố then chốt
essential|requirement|yêu cầu thiết yếu
growing|demand|nhu cầu ngày càng tăng
harsh|reality|thực tế phũ phàng
increasing|awareness|nhận thức ngày càng cao
limited|resources|nguồn lực hạn chế
mutual|benefit|lợi ích chung
potential|consequence|hệ quả tiềm tàng
primary|concern|mối quan tâm hàng đầu
serious|consequence|hậu quả nghiêm trọng
significant|contribution|đóng góp đáng kể
substantial|evidence|bằng chứng vững chắc
`);

})();
