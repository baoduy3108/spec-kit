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
diverse|adj|đa dạng
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

})();
