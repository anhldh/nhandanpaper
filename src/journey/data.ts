/* Content for "Hành trình đến độc lập" — ported verbatim from the
   Claude Design source `Journey to Independence v2 paper.dc.html`. */

export type Lang = "vi" | "en";

/** A bilingual string. */
export type L = { vi: string; en: string };

const M = (vi: string, en: string): L => ({ vi, en });

export type Stat = { value: number; suffix?: string | L; label: L };
export type Pin = {
  x: string;
  y: string;
  label: L;
  date: string;
  title: L;
  url: string;
};

/** Tinh chỉnh một ảnh phụ. Bỏ trống field nào thì field đó dùng mặc định. */
export type InsetBox = {
  /** Bề rộng, giá trị CSS bất kỳ. Mặc định `min(42%, 190px)`. */
  width?: string;
  /** Độ nghiêng tính bằng độ. Mặc định: img3 = 1.6, img2 = -1.4. */
  rotate?: number;
  /** Dịch ngang theo px, dương là sang phải. */
  dx?: number;
  /** Dịch dọc theo px, dương là xuống dưới. */
  dy?: number;
};

export type Chapter = {
  id: string;
  year: string;
  label: string;
  dateLabel: L;
  station: L;
  short: L;
  title: L;
  sub: L;
  img: string;
  alt: L;
  img2?: string;
  alt2?: L;
  /** Kích cỡ / vị trí của ảnh phụ bên phải. */
  img2Box?: InsetBox;
  img3?: string;
  alt3?: L;
  /** Kích cỡ / vị trí của ảnh phụ bên trái. */
  img3Box?: InsetBox;
  paras: Record<Lang, string[]>;
  quote?: L;
  quoteAttr?: L;
  stats?: Stat[];
  pins?: Pin[];
  /** Lay the chapter out as one full-width band instead of the two-column split. */
  wide?: boolean;
};

export const hero = {
  kicker: M("Hành trình đến độc lập", "Journey to Independence"),
  title: M("Hồ Chí Minh", "Ho Chi Minh"),
  sub: M("Từ Pác Bó đến Ba Đình", "From Pac Bo to Ba Dinh"),
  lead1: M(
    "Sau hơn 30 năm bôn ba tìm đường cứu nước, ngày 28/1/1941, Nguyễn Ái Quốc trở về Tổ quốc, đặt chân đến hang Pác Bó, tỉnh Cao Bằng. Từ đây, Người trực tiếp lãnh đạo phong trào cách mạng, xây dựng căn cứ địa, sáng lập Việt Nam độc lập đồng minh (Việt Minh) và dấy lên cao trào kháng Nhật cứu nước trong cả nước.",
    "After more than 30 years abroad seeking a path to national salvation, Nguyen Ai Quoc returned to his homeland on January 28, 1941, arriving at Pac Bo Cave in Cao Bang Province. From there, he directly led the revolutionary movement, established revolutionary bases, founded the Viet Minh Front (League for the Independence of Viet Nam), and launched a nationwide anti-Japanese resistance movement for national salvation.",
  ),
  lead2: M(
    "Đến tháng 8/1945, thời cơ cách mạng đã chín muồi. Dưới sự lãnh đạo của Người, cả dân tộc vùng lên trong Cách mạng Tháng Tám, giành chính quyền về tay nhân dân. Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, Hà Nội, khai sinh nước Việt Nam Dân chủ Cộng hòa.",
    "By August 1945, the opportunity for revolution had fully matured. Under his leadership, the entire nation rose up in the August Revolution, transferring power to the people. On September 2, 1945, President Ho Chi Minh read the Declaration of Independence at Ba Dinh Square in Ha Noi, marking the birth of the Democratic Republic of Viet Nam.",
  ),
};

export const closing = {
  date: M(
    "2 tháng 9, 1945 — Quảng trường Ba Đình",
    "September 2, 1945 — Ba Dinh Square",
  ),
  quote: M(
    "“Đó là những giây phút sung sướng nhất của đời tôi. Tôi đã viết nhiều, nhưng không có gì làm tôi vui hơn khi viết bản Tuyên ngôn Độc lập.”",
    "“This was the happiest moment of my life. I have written many things, but nothing brought me greater joy than writing the Declaration of Independence.”",
  ),
  attr: M("Chủ tịch Hồ Chí Minh", "President Ho Chi Minh"),
};

export const ui = {
  contents: M("Mục lục", "Contents"),
  begin: M("Bắt đầu hành trình", "Begin the journey"),
  scroll: M("Cuộn để đi tiếp", "Scroll to continue"),
  close: M("Đóng", "Close"),
  footerNote: M(
    "Bản web của tuyến bài infographic “Hành trình đến độc lập”. Chạm vào các điểm mốc trên ảnh để mở tour 360 của địa danh.",
    "Web edition of the infographic feature “Journey to Independence”. Tap the markers on each plate to open a 360° tour of the location.",
  ),
};

export const credits = [
  "Chỉ đạo: Ngọc Thanh, Hữu Việt",
  "Tổ chức sản xuất: Hoàng Nhật, Nam Đông, Lê Tiến Long, Nguyễn Ngọc Toàn",
  "Thực hiện: Kim Duẩn, Thi Uyên, Lưu Vượng Thịnh, Đường Vĩnh Khánh, Chí Đồ và YooLife",
];

export const chapters: Chapter[] = [
  {
    id: "pacbo",
    year: "1941",
    label: "1941 Pác Bó",
    dateLabel: M("28/1/1941", "January 28, 1941"),
    station: M("Pác Bó, Cao Bằng", "Pac Bo, Cao Bang"),
    short: M("Pác Bó", "Pac Bo"),
    title: M("Trở về Tổ quốc", "Returning to the homeland"),
    sub: M("Pác Bó lịch sử", "Historic Pac Bo"),
    img: "assets/pacbo-rocks.jpg",
    alt: M("Cột mốc 108 tại Pác Bó", "Border Marker No. 108 at Pac Bo"),
    img2: "assets/soldiers-mist.jpg",
    alt2: M(
      "Các đồng chí trên đường về nước",
      "Comrades on the return journey",
    ),
    // img3: "assets/hcm-desk-teal.png",
    // alt3: M("Hồ Chí Minh tại Pác Bó", "Ho Chi Minh at Pac Bo"),
    // img3Box: { width: "120px", rotate: 3, dx: 12, dy: -20 },
    paras: {
      vi: [
        "Sáng ngày 28/1/1941 (mùng hai Tết Tân Tỵ), lãnh tụ Nguyễn Ái Quốc cùng một số đồng chí vượt cột mốc 108 trên biên giới Việt Nam – Trung Quốc, tại làng Pác Pó, xã Trường Hà, tỉnh Cao Bằng. Sau gần 30 năm xa cách, người con của làng Sen, Nghệ An, lại đặt chân lên đất thiêng của Tổ quốc.",
        "Từ Pác Bó, Người chuyển địa điểm làm việc đến Khuổi Nậm, trong rừng cách chỗ cũ hơn một ki-lô-mét, sau khi hai người dân địa phương giúp việc cho phong trào cách mạng bị mật vụ của chính quyền thực dân Pháp bắt trong khi làm nhiệm vụ liên lạc.",
      ],
      en: [
        "On the morning of January 28, 1941 (the second day of the Tan Ty Lunar New Year), leader Nguyen Ai Quoc, accompanied by several comrades, crossed the former Border Marker No. 108 on the Viet Nam–China border at Pac Po Village, Truong Ha Commune, Cao Bang Province. After nearly 30 years away, the son of Sen Village in Nghe An once again set foot on the sacred soil of his homeland.",
        "From Pac Bo, he later moved his working base to Khuoi Nam, in a forest just over one kilometre from the original site, after two local supporters of the revolutionary movement were captured by agents of the French colonial authorities while carrying out liaison duties.",
      ],
    },
    stats: [
      {
        value: 30,
        suffix: "",
        label: M(
          "năm bôn ba tìm đường cứu nước",
          "years abroad seeking national salvation",
        ),
      },
      {
        value: 108,
        suffix: "",
        label: M(
          "cột mốc biên giới nơi Người trở về",
          "the border marker he crossed",
        ),
      },
      {
        value: 1,
        suffix: " km",
        label: M(
          "từ Pác Bó đến căn cứ Khuổi Nậm",
          "from Pac Bo to the Khuoi Nam base",
        ),
      },
    ],
    pins: [
      {
        x: "25%",
        y: "44%",
        label: M("Pác Bó", "Pac Bo"),
        date: "28/1/1941",
        title: M("Hang Pác Bó, Cao Bằng", "Pac Bo Cave, Cao Bang"),
        url: "https://maps.google.com/maps?q=22.9856,106.0056&z=14&output=embed",
      },
    ],
  },
  {
    id: "khuoinam",
    year: "1941",
    label: "5/1941 Khuổi Nậm",
    dateLabel: M("10 – 19/5/1941", "May 10–19, 1941"),
    station: M("Khuổi Nậm, Cao Bằng", "Khuoi Nam, Cao Bang"),
    short: M("Khuổi Nậm", "Khuoi Nam"),
    title: M("Ngọn cờ đoàn kết dân tộc", "A banner of national unity"),
    sub: M(
      "Hội nghị Trung ương 8 và sự ra đời của Việt Minh",
      "The 8th Plenum and the founding of the Viet Minh",
    ),
    img: "assets/vietminh-flag.png",
    alt: M(
      "Nguyễn Ái Quốc làm việc tại căn cứ",
      "Nguyen Ai Quoc at work in the base",
    ),
    paras: {
      vi: [
        "Tháng 5/1941, với tư cách đại diện Quốc tế Cộng sản, Nguyễn Ái Quốc triệu tập và chủ trì Hội nghị lần thứ tám Ban Chấp hành Trung ương Đảng, họp từ ngày 10 đến 19/5/1941. Sau khi phân tích kỹ tình hình, vị trí và lực lượng của cách mạng Việt Nam, Hội nghị xác định “phải thay đổi chiến lược”.",
        "Theo đề nghị của Người, Hội nghị quyết định thành lập Việt Nam độc lập đồng minh, gọi tắt là Việt Minh. Ngày 19/5/1941, Mặt trận Việt Minh chính thức ra đời với hai mục tiêu: một là làm cho nước Việt Nam được hoàn toàn độc lập; hai là làm cho dân Việt Nam được tự do và có cuộc sống ấm no.",
        "Hội nghị bầu Ban Chấp hành Trung ương chính thức gồm Trường Chinh, Hoàng Văn Thụ, Hoàng Quốc Việt và Phùng Chí Kiên; Trường Chinh được cử làm Tổng Bí thư. Sau Hội nghị, ngày 6/6/1941, Người viết “Kính cáo đồng bào”, kêu gọi toàn dân đoàn kết đánh đổ đế quốc và bè lũ tay sai.",
      ],
      en: [
        "In May 1941, as a representative of the Communist International, Nguyen Ai Quoc convened and chaired the Eighth Plenum of the Party Central Committee, held from May 10 to 19, 1941. Following a thorough assessment of the situation and the strategic position and strength of the Vietnamese revolution, the Plenum resolved that “a change in strategy was necessary.”",
        "At his proposal, the plenum resolved to establish the League for the Independence of Viet Nam, or the Viet Minh Front. On May 19, 1941, the Viet Minh Front was officially founded with two principal objectives: to achieve complete independence for Viet Nam, and to secure freedom and a prosperous life for the Vietnamese people.",
        "The plenum elected the official Party Central Committee, comprising Truong Chinh, Hoang Van Thu, Hoang Quoc Viet and Phung Chi Kien, with Truong Chinh elected as Party General Secretary. Following the plenum, on June 6, 1941, Ho Chi Minh wrote the “Kinh cao dong bao” (Letter to the Compatriots), calling on the entire nation to unite in overthrowing the imperialists and their collaborators.",
      ],
    },
    quote: M(
      "“Trong lúc này quyền lợi của bộ phận, của giai cấp phải đặt dưới sự sinh tử, tồn vong của quốc gia, của dân tộc. Trong lúc này nếu không giải quyết được vấn đề dân tộc giải phóng, không đòi được độc lập, tự do cho toàn thể dân tộc, thì chẳng những toàn thể quốc gia dân tộc còn chịu mãi kiếp ngựa trâu, mà quyền lợi của bộ phận, giai cấp đến vạn năm cũng không đòi lại được.”",
      "“At this moment, the interests of individual groups and classes must be subordinated to the life-and-death interests and survival of the nation. If we cannot resolve the issue of national liberation now, and fail to regain independence and freedom for the entire nation, then not only will the whole country remain enslaved forever, but the rights of all classes and groups will never be reclaimed.”",
    ),
    quoteAttr: M(
      "Nghị quyết Hội nghị Trung ương 8, 5/1941",
      "Resolution of the 8th Plenum, May 1941",
    ),
    stats: [
      {
        value: 8,
        suffix: "",
        label: M(
          "Hội nghị Trung ương lần thứ tám",
          "the eighth Party Central Committee plenum",
        ),
      },
      {
        value: 10,
        suffix: M(" ngày", " days"),
        label: M("thời gian diễn ra hội nghị", "the length of the plenum"),
      },
      {
        value: 2,
        suffix: "",
        label: M(
          "mục tiêu của Mặt trận Việt Minh",
          "objectives of the Viet Minh Front",
        ),
      },
    ],
    pins: [
      {
        x: "20%",
        y: "88%",
        label: M("Khuổi Nậm", "Khuoi Nam"),
        date: "19/5/1941",
        title: M("Lán Khuổi Nậm, Pác Bó", "Khuoi Nam shelter, Pac Bo"),
        url: "https://maps.google.com/maps?q=22.9829,106.0129&z=14&output=embed",
      },
    ],
  },
  {
    id: "nguctrung",
    year: "1942",
    label: "1942 Ngục trung nhật ký",
    dateLabel: M("3/1942 – 9/1943", "March 1942 – September 1943"),
    station: M(
      "Lam Sơn, Cao Bằng → Quảng Tây, Trung Quốc",
      "Lam Son, Cao Bang → Guangxi, China",
    ),
    short: M("Quảng Tây", "Guangxi"),
    title: M("Ngục trung nhật ký", "Prison Diary"),
    sub: M(
      "Hơn một năm qua ba mươi nhà tù",
      "More than a year through thirty prisons",
    ),
    img: "assets/prison-scene.png",
    alt: M("Người trong nhà tù Quảng Tây", "Ho Chi Minh in a Guangxi prison"),
    // img2: "assets/clipping.png",
    // alt2: M("Báo Việt Nam độc lập", "The newspaper Viet Nam Doc Lap"),
    // img2Box: { width: "240px", rotate: -1.4, dx: -12, dy: -100 },
    paras: {
      vi: [
        "Tháng 3/1942, Hồ Chí Minh chuyển đến Lam Sơn, cách trung tâm tỉnh Cao Bằng khoảng 15 ki-lô-mét. Nằm ở huyện Hòa An, Lam Sơn là một thung lũng được núi cao bao bọc, địa thế lợi hại và an toàn. Từ đây, Người chỉ đạo phong trào cách mạng cả nước; báo “Việt Nam độc lập” in tại Pác Bó và Khuổi Nậm tiếp tục ra đều, phổ biến nghị quyết Hội nghị Trung ương 8 và vận động nhân dân thực hiện.",
        "Tháng 8/1942, nhận thấy lực lượng cách mạng trong nước còn yếu và thiếu sự hậu thuẫn từ bên ngoài, muốn tăng cường liên lạc với lực lượng cách mạng quốc tế, Nguyễn Ái Quốc — từ đây lấy tên Hồ Chí Minh — sang Quảng Tây, Trung Quốc.",
        "Ngày 27/8/1942, ít lâu sau khi tới Túc Vinh, Người bị lực lượng an ninh Trung Quốc bắt giữ. Hơn một năm bị giam, Người bị chuyển qua hơn 30 nhà tù thuộc 13 huyện của tỉnh Quảng Tây. Trong điều kiện khắc nghiệt, sức khỏe suy sụp nặng, răng rụng, tóc bạc thêm, nhưng tinh thần không hề suy sụp. Thời gian ấy, Người viết một loạt bài thơ chữ Hán giản dị mà sâu sắc, về sau tập hợp thành “Ngục trung nhật ký”.",
      ],
      en: [
        "In March 1942, Ho Chi Minh moved to Lam Son, about 15 kilometres from Cao Bang Province. Situated in Hoa An District, Lam Son is a valley surrounded by high mountains, making it a strategically advantageous and well-protected location. Lam Son became the principal base from which he directed the revolutionary movement across the country; the clandestine newspaper “Viet Nam Doc Lap”, printed at Pac Bo and Khuoi Nam, continued to appear regularly, disseminating the resolutions of the 8th Plenum.",
        "In August 1942, recognising that the revolutionary forces in Viet Nam remained weak and lacked significant external support, and seeking to strengthen ties with international revolutionary forces, Nguyen Ai Quoc — now using the name Ho Chi Minh — travelled to Guangxi, China.",
        "On August 27, 1942, shortly after arriving in Jurong, Ho Chi Minh was arrested by Chinese security forces. He remained imprisoned for more than a year, transferred through over 30 prisons across 13 counties in Guangxi Province. Under the harsh conditions of imprisonment his health deteriorated severely — he lost teeth, his hair turned noticeably greyer — yet his spirit remained unbroken. During this period he composed a series of simple yet profound poems in classical Chinese, later compiled as “Nguc trung nhat ky” (Prison Diary).",
      ],
    },
    stats: [
      {
        value: 30,
        suffix: "+",
        label: M(
          "nhà tù Người bị chuyển qua",
          "prisons he was transferred through",
        ),
      },
      {
        value: 13,
        suffix: "",
        label: M(
          "huyện thuộc tỉnh Quảng Tây",
          "counties across Guangxi Province",
        ),
      },
      {
        value: 1,
        suffix: M(" năm", " year"),
        label: M("thời gian bị giam giữ", "held in captivity"),
      },
    ],
    pins: [
      {
        x: "74%",
        y: "40%",
        label: M("Nhà tù Quế Lâm", "Guilin Prison"),
        date: "29/8/1942",
        title: M("Quế Lâm, Quảng Tây", "Guilin, Guangxi"),
        url: "https://maps.google.com/maps?q=25.2736,110.2900&z=12&output=embed",
      },
    ],
  },
  {
    id: "tantrao44",
    year: "1944",
    label: "1944 Tân Trào",
    dateLabel: M("3 – 12/1944", "March – December 1944"),
    station: M("Liễu Châu → Cao Bằng", "Liuzhou → Cao Bang"),
    short: M("Cao Bằng", "Cao Bang"),
    title: M("Thời cơ đã cận", "The hour draws near"),
    sub: M(
      "Trở lại nước và lập Đội Việt Nam Tuyên truyền Giải phóng quân",
      "The return home and the founding of the Liberation Army propaganda unit",
    ),
    img: "assets/hcm-planes.png",
    alt: M(
      "Hồ Chí Minh trong những năm chuẩn bị",
      "Ho Chi Minh in the years of preparation",
    ),
    img2: "assets/vietnamgiaiphong.jpg",
    alt2: M("Rừng Tân Trào", "The Tan Trao forest"),
    img2Box: { width: "240px", rotate: -1.4, dx: -12, dy: -100 },
    paras: {
      vi: [
        "Cuối tháng 3/1944, một hội nghị kín của đại biểu Việt Cách ở nước ngoài họp tại Liễu Châu, do tướng Trương Phát Khuê chủ trì. Hồ Chí Minh trình bày hai báo cáo: một về bộ phận Việt Nam trong Hội Quốc tế chống xâm lược, một về các đảng phái đang hoạt động trong nước. Ít lâu sau, Người trở thành ủy viên chính thức của Ban Chấp hành Trung ương Việt Cách.",
        "Tháng 8/1944, Trương Phát Khuê để Người hoàn toàn tự do chuẩn bị trở về. Ngày 20/9/1944, Hồ Chí Minh cùng 18 cán bộ rời Liễu Châu, qua Long Châu và Tĩnh Tây rồi về Cao Bằng. Tại đây, nhận tin Liên tỉnh ủy Cao – Bắc – Lạng quyết định phát động khởi nghĩa giành chính quyền tại địa phương, Người chỉ thị hoãn lại vì công việc chuẩn bị ở những nơi khác chưa xong.",
        "Tháng 10/1944, Người viết “Thư gửi đồng bào toàn quốc”, phân tích tình hình và nêu những nhiệm vụ cấp bách của cách mạng Việt Nam.",
        "Đầu tháng 12/1944, Hồ Chí Minh phái Võ Nguyên Giáp trở lại vùng Hoàng Hoa Thám gấp rút chuẩn bị thành lập Đội Việt Nam Tuyên truyền Giải phóng quân. Người nhắc: “Phải tuyệt đối giữ bí mật. Có thể ta ở đông mà địch tưởng ta ở tây. Đi không dấu, về không tăm”. Đội thành lập ngày 22/12/1944, ít lâu sau giành thắng lợi đầu tiên ở Phai Khắt và Nà Ngần, trở thành hạt nhân của lực lượng vũ trang cách mạng.",
      ],
      en: [
        "Towards the end of March 1944, a closed conference of overseas delegates of the Viet Cach convened in Liuzhou, chaired by General Zhang Fakui. Ho Chi Minh presented two reports: one on the Vietnamese branch of the International Anti-Aggression Organisation, and the other on the political parties operating within Viet Nam. A few months later, Ho Chi Minh became a full member of the Committee.",
        "It was not until August 1944 that Zhang Fakui granted him full freedom to prepare for his return. On September 20, 1944, Ho Chi Minh, accompanied by 18 cadres, departed Liuzhou, travelling via Longzhou and Jingxi before returning to Cao Bang. There, after receiving a report that the interprovincial Party Committee of Cao Bang, Bac Kan and Lang Son had decided to launch an uprising to seize power locally, he instructed that the uprising be postponed in order to avoid unnecessary difficulties and losses, as preparations elsewhere were still incomplete.",
        "In October 1944, he authored the “Thu gui dong bao toan quoc” (Letter to Compatriots Nationwide), analysing the situation and outlining the urgent tasks facing the Vietnamese revolution.",
        "In early December 1944, Ho Chi Minh dispatched Vo Nguyen Giap to return to the Hoang Hoa Tham area to accelerate preparations for the establishment of the Viet Nam Propaganda Unit of Liberation Army. He reminded him: “Maintain absolute secrecy. We may be in the east while the enemy believes we are in the west. Come without a trace; leave without a trace.” The unit was established on December 22, 1944. Soon afterwards it secured its first victories at the Phai Khat and Na Ngan military outposts, and became the core of Viet Nam’s revolutionary armed forces.",
      ],
    },
    quote: M(
      "“Cơ hội cho dân tộc ta giải phóng chỉ ở trong một năm hoặc năm rưỡi nữa. Thời gian rất gấp. Ta phải làm nhanh!”",
      "“The opportunity for our nation’s liberation lies within a year or a year and a half. Time is extremely limited. We must act quickly.”",
    ),
    quoteAttr: M(
      "Thư gửi đồng bào toàn quốc, 10/1944",
      "Letter to Compatriots Nationwide, October 1944",
    ),
    stats: [
      {
        value: 18,
        suffix: "",
        label: M(
          "cán bộ cùng Người rời Liễu Châu về nước",
          "cadres accompanying his return from Liuzhou",
        ),
      },
      {
        value: 22,
        suffix: "/12",
        label: M(
          "ngày thành lập Đội Việt Nam Tuyên truyền Giải phóng quân",
          "the Liberation Army propaganda unit was founded",
        ),
      },
      {
        value: 2,
        suffix: "",
        label: M(
          "thắng lợi đầu tiên: Phai Khắt, Nà Ngần",
          "first victories: Phai Khat and Na Ngan",
        ),
      },
    ],
    pins: [
      {
        x: "22%",
        y: "72%",
        label: M("Cao Bằng", "Cao Bang"),
        date: "9/1944",
        title: M("Căn cứ Cao Bằng", "The Cao Bang base"),
        url: "https://maps.google.com/maps?q=22.6657,106.2570&z=12&output=embed",
      },
    ],
  },
  {
    id: "tantrao45",
    year: "1945",
    label: "7–8/1945 Tân Trào",
    dateLabel: M("16/7 – 17/8/1945", "July 16 – August 17, 1945"),
    station: M("Tân Trào, Tuyên Quang", "Tan Trao, Tuyen Quang"),
    short: M("Tân Trào", "Tan Trao"),
    title: M(
      "Tân Trào — nơi quyết định vận nước",
      "Tan Trao, where the nation’s fate was decided",
    ),
    sub: M(
      "Toán OSS nhảy xuống Kim Long, lán Nà Nưa và Quốc dân Đại hội",
      "The OSS drop at Kim Long, the Na Nua hut, and the Tan Trao Congress",
    ),
    img: "assets/moment-1945.png",
    alt: M(
      "Lễ ra mắt lực lượng tại Tân Trào",
      "A parade of the forces at Tan Trao",
    ),
    img2: "assets/unghovietminh.jpg",
    alt2: M(
      "Nhân dân ủng hộ Việt Minh",
      "People rallying in support of the Viet Minh",
    ),
    img2Box: { width: "240px", rotate: -1.4, dx: -12, dy: -100 },
    img3: "assets/vietnamdoclap.jpg",
    alt3: M(
      "Báo Việt Nam độc lập, 7/1945",
      "The newspaper Viet Nam Doc Lap, July 1945",
    ),
    img3Box: { width: "180px", rotate: 1.6, dx: 12, dy: -70 },
    paras: {
      vi: [
        "Qua Phạm Việt Tú, một Việt kiều thông thạo tiếng Anh, Hồ Chí Minh liên lạc được với tướng Claire Chennault, chỉ huy Không đoàn 14 của Mỹ. Ngày 29/3/1945, Chennault tiếp Người tại sở chỉ huy, cảm ơn Việt Minh đã cứu phi công Rudolph Shaw. Người nêu rõ Việt Minh đứng cùng phe Đồng minh chống Nhật và đề nghị giúp đỡ vũ khí, thuốc men.",
        "Ngày 16/7/1945, theo thỏa thuận giữa Người và quân đội Mỹ ở Côn Minh, một toán thuộc Cơ quan Tình báo chiến lược (OSS) nhảy xuống thôn Kim Long (nay là thôn Tân Lập), xã Tân Trào, huyện Sơn Dương — nay thuộc tỉnh Tuyên Quang — cách nơi ở của Hồ Chí Minh không xa. Ngoài việc chuyển tin tình báo về Côn Minh, toán này huấn luyện khoảng 100 du kích Việt Minh sử dụng vũ khí Mỹ, gồm badôca, cácbin và lựu đạn, để đánh Nhật.",
        "Cuối tháng 7/1945, tại lán Nà Nưa, Tân Trào, Người lâm bệnh nặng, sốt cao liên tục, nhiều lúc mê đi. Một hôm, Võ Nguyên Giáp đến báo cáo tình hình, thấy Người sốt hầm hập, liền xin ở lại bên Người. Đêm ấy, sau khi tỉnh lại trong giây lát, Người nói với ông: “Lúc này thời cơ thuận lợi đã tới, dù hy sinh tới đâu, dù phải đốt cháy cả dãy Trường Sơn cũng phải kiên quyết giành cho được độc lập.”",
        "Sau khi Nhật tuyên bố đầu hàng Đồng minh vô điều kiện ngày 15/8/1945, Hồ Chí Minh đề nghị Hội nghị toàn quốc của Đảng kết thúc sớm để các đại biểu kịp trở về địa phương, phát động tổng khởi nghĩa giành chính quyền. Hội nghị thông qua nghị quyết gồm 11 vấn đề lớn và quyết định lập Ủy ban Khởi nghĩa toàn quốc cùng Bộ Tổng chỉ huy Quân giải phóng Việt Nam.",
        "Song song với Hội nghị toàn quốc của Đảng, Người triệu tập Quốc dân Đại hội Tân Trào, họp tại tỉnh Tuyên Quang từ ngày 16 đến 17/8/1945. Hơn 60 đại biểu lần lượt về Tân Trào, đại diện Bắc – Trung – Nam, Việt kiều, các đảng phái, đoàn thể, dân tộc thiểu số và tôn giáo. Đại hội tán thành chủ trương tổng khởi nghĩa của Đảng, thông qua Mười chính sách của Việt Minh, quyết định lấy cờ đỏ sao vàng năm cánh làm Quốc kỳ, bài Tiến quân ca của Văn Cao làm Quốc ca, và bầu Ủy ban Dân tộc giải phóng — tức Chính phủ lâm thời — do Hồ Chí Minh làm Chủ tịch.",
        "Chiều 17/8, ngày cuối của Đại hội, dù cơn sốt trở lại, Người vẫn gắng đến dự. Trước Đình Tân Trào, Người thay mặt Ủy ban Dân tộc giải phóng Việt Nam đọc lời tuyên thệ nhậm chức trước quốc dân.",
      ],
      en: [
        "Through Pham Viet Tu, an overseas Vietnamese fluent in English, Ho Chi Minh established contact with General Claire Chennault, commander of the US 14th Air Force. Chennault met him on March 29, 1945, and thanked Ho Chi Minh and the Viet Minh for rescuing the American pilot Rudolph Shaw. Ho Chi Minh articulated that the Viet Minh stood with the Allies in the fight against Japan, and requested assistance in the form of weapons and medical supplies.",
        "On July 16, 1945, under an agreement forged between President Ho Chi Minh and the US military stationed in Kunming, an Office of Strategic Services (OSS) team parachuted into Kim Long hamlet (now Tan Lap hamlet), Tan Trao Commune, Son Duong District — today Tuyen Quang Province — not far from Ho Chi Minh’s forest shelter. In addition to relaying intelligence to Kunming, the team trained around 100 Viet Minh guerrillas to use American weapons, including bazookas, carbines and hand grenades, in the fight against Japanese forces.",
        "In late July 1945, Ho Chi Minh was stricken by severe illness at Na Nua hut in Tan Trao. Although he took quinine and cold medicine, his high fever persisted and he frequently drifted in and out of delirium. One day, when General Vo Nguyen Giap came to report on the situation and saw that Ho Chi Minh was burning with fever, he asked permission to remain by his side. That night, after briefly regaining consciousness, he told Vo Nguyen Giap: “The opportune moment has now arrived. No matter the sacrifice, even if we must burn the entire Truong Son mountain range, we must secure independence.”",
        "After receiving news that Japan had formally announced its unconditional surrender to the Allies on August 15, 1945, Ho Chi Minh urged the National Party Conference to conclude as quickly as possible so that delegates could immediately return to their localities and mobilise the people to launch the general uprising and seize power. The conference adopted a resolution covering 11 major issues, and decided to establish the National Uprising Committee and the High Command of the Viet Nam Liberation Army.",
        "Running in parallel with the National Party Conference, Ho Chi Minh convened the Tan Trao Congress of People’s Representatives, held in Tuyen Quang Province from August 16 to 17, 1945. More than 60 delegates gradually gathered in Tan Trao, representing northern, central and southern Viet Nam, overseas Vietnamese communities, political parties, mass organisations, ethnic minority groups and religious communities. The congress endorsed the line adopted by the Party, approved the Viet Minh’s ten major policies, adopted the red flag with a five-pointed yellow star as the national flag, selected Tien Quan Ca (The Marching Song) by Van Cao as the national anthem, and elected the National Liberation Committee — the Provisional Government — with Ho Chi Minh serving as its president.",
        "That afternoon, Ho Chi Minh’s fever returned, preventing him from attending the departure ceremony of the Liberation Army. On August 17, the closing day of the Congress of People’s Representatives, he nevertheless struggled to attend. Standing before Tan Trao Communal House, he delivered, on behalf of the Viet Nam National Liberation Committee, the oath of office introducing the committee to the nation.",
      ],
    },
    quote: M(
      "“Chúng ta được đại biểu của quốc dân bầu ra để làm việc trong Ủy ban Dân tộc giải phóng, lãnh đạo cuộc cách mạng của nhân dân. Trước lá cờ thiêng liêng của Tổ quốc, chúng ta nguyện kiên quyết lãnh đạo nhân dân tiến lên, ra sức chiến đấu chống quân thù, giành lại độc lập cho Tổ quốc. Dù phải hy sinh đến giọt máu cuối cùng, quyết không lùi bước. Xin thề!”",
      "“We have been elected by the representatives of the people to serve on the National Liberation Committee and lead our people’s revolution. Before the sacred flag of the Fatherland, we solemnly pledge to lead our people forward with unwavering determination, to fight the enemy with all our strength, and to regain our nation’s independence. Even if we must sacrifice the last drop of our blood, we shall never retreat. This we solemnly swear.”",
    ),
    quoteAttr: M(
      "Lời tuyên thệ trước Đình Tân Trào, 17/8/1945",
      "The oath before Tan Trao Communal House, August 17, 1945",
    ),
    stats: [
      {
        value: 100,
        suffix: "",
        label: M(
          "du kích Việt Minh được huấn luyện vũ khí Mỹ",
          "Viet Minh guerrillas trained on American weapons",
        ),
      },
      {
        value: 14,
        suffix: "",
        label: M(
          "Không đoàn 14 của Mỹ tại Côn Minh",
          "the US 14th Air Force at Kunming",
        ),
      },
      {
        value: 60,
        suffix: "+",
        label: M(
          "đại biểu về dự Quốc dân Đại hội",
          "delegates at the Tan Trao Congress",
        ),
      },
      {
        value: 11,
        suffix: "",
        label: M(
          "vấn đề lớn trong nghị quyết Hội nghị toàn quốc",
          "major issues in the conference resolution",
        ),
      },
      {
        value: 5,
        suffix: "",
        label: M(
          "thành viên Thường trực Ủy ban Dân tộc giải phóng",
          "standing members of the Liberation Committee",
        ),
      },
    ],
    pins: [
      {
        x: "72%",
        y: "30%",
        label: M("Tân Trào", "Tan Trao"),
        date: "16/7/1945",
        title: M("Tân Trào, Tuyên Quang", "Tan Trao, Tuyen Quang"),
        url: "https://maps.google.com/maps?q=21.8117,105.4467&z=13&output=embed",
      },
      {
        // TODO: toạ độ cũ đo trên ảnh tantrao-clearing.png (đã bỏ), cần chỉnh
        // lại cho khớp ảnh moment-1945.png.
        x: "46%",
        y: "70%",
        label: M("Đình Tân Trào", "Tan Trao Communal House"),
        date: "17/8/1945",
        title: M(
          "Đình Tân Trào, Tuyên Quang",
          "Tan Trao Communal House, Tuyen Quang",
        ),
        url: "https://maps.google.com/maps?q=21.8106,105.4462&z=15&output=embed",
      },
    ],
  },
  {
    id: "hangngang",
    year: "1945",
    label: "8/1945 48 Hàng Ngang",
    wide: true,
    dateLabel: M("25/8 – 2/9/1945", "August 25 – September 2, 1945"),
    station: M("48 Hàng Ngang, Hà Nội", "48 Hang Ngang Street, Ha Noi"),
    short: M("Hà Nội", "Ha Noi"),
    title: M("Bản Tuyên ngôn", "The Declaration"),
    sub: M(
      "Căn phòng nhỏ ở 48 Hàng Ngang",
      "A small upstairs room at 48 Hang Ngang",
    ),
    img: "vi/5.jpg",
    alt: M("Nhà 48 Hàng Ngang, Hà Nội", "The house at 48 Hang Ngang, Ha Noi"),
    paras: {
      vi: [
        "Chiều 25/8/1945, Người vào nội thành Hà Nội và ở tại nhà số 48 Hàng Ngang, nhà của nhà tư sản yêu nước Trịnh Văn Bô. Sáng 26/8, Người triệu tập và chủ trì cuộc họp Thường vụ Trung ương Đảng tại Hà Nội, bàn những chủ trương đối nội, đối ngoại trong tình hình mới, thông qua thành phần Chính phủ lâm thời và quyết định tổ chức một cuộc mít tinh lớn ở Hà Nội để Chính phủ ra mắt nhân dân.",
        "Sau cuộc họp quan trọng ấy, phần lớn ngày 28/8/1945 Người dành cho việc soạn bản “Tuyên ngôn Độc lập” tại 48 Hàng Ngang. Bản Tuyên ngôn phải nói với thế giới về vị thế một quốc gia độc lập; vạch rõ những kẻ đã tước đi của người Việt Nam độc lập, tự do và gieo đau thương suốt hơn tám mươi năm; khẳng định chủ quyền của nhân dân và những quyền cơ bản mà một dân tộc độc lập phải được hưởng.",
        "Những đoạn trong Tuyên ngôn Nhân quyền và Dân quyền của Pháp và Tuyên ngôn Độc lập của Mỹ (1776) trở lại trong trí Người nhiều lần. Sau nhiều lần sửa, Người lại đánh máy nhanh trên chiếc máy chữ. Căn phòng nhỏ trên gác chứng kiến những giờ khắc lịch sử: Người làm việc không nghỉ bên chiếc bàn tròn, có lúc viết tay, có lúc đánh máy. Người trong nhà không hề biết “ông cụ” gầy gò, mặc bộ đồ nâu bạc màu thường không cài khuy trên ngực, tay luôn kẹp điếu thuốc, đang làm một việc gì.",
        "Ngày 30/8/1945, Người mời một số đồng chí đến góp ý cho bản dự thảo. Sau khi cân nhắc và sửa chữa, ngày 31/8, Người bổ sung thêm mấy điểm nữa để hoàn thành văn kiện khai sinh một nước Việt Nam độc lập, dân chủ, tự do.",
      ],
      en: [
        "On the afternoon of August 25, 1945, he entered central Ha Noi and took up residence at 48 Hang Ngang Street, the house of the patriotic businessman Trinh Van Bo. On the morning of August 26, Ho Chi Minh convened and chaired a meeting of the Party Central Committee’s Standing Committee in Ha Noi, which discussed major domestic and foreign policy orientations under the new circumstances, approved the membership of the Provisional Government, and decided to organise a mass rally in Ha Noi at which the government would formally present itself to the nation.",
        "Following this crucial meeting, Ho Chi Minh devoted much of August 28, 1945, to drafting the historic “Declaration of Independence” at 48 Hang Ngang Street. The declaration needed to proclaim to the world Viet Nam’s status as an independent nation; identify those who had deprived the Vietnamese people of independence and inflicted suffering upon them for the previous eighty years; affirm the people’s sovereignty and the fundamental rights that citizens of an independent nation should naturally enjoy.",
        "Passages from the French Declaration of the Rights of Man and of the Citizen and the US Declaration of Independence (1776) came repeatedly to mind. After making numerous revisions, he resumed typing briskly on his typewriter. The small upstairs room of the house witnessed those historic hours: he worked tirelessly at a round table, at times writing by hand, at others typing. Members of the household had no idea what “the elderly gentleman with bright eyes, a faded brown tunic usually left unbuttoned at the chest, and a constant cigarette between his fingers” was working on.",
        "On August 30, 1945, Ho Chi Minh invited a number of his comrades to review and comment on the draft Declaration of Independence that he had prepared. After careful consideration and revision, on August 31 he decided to add several further points to complete what would become the founding document of an independent, democratic and free Viet Nam.",
      ],
    },
    stats: [
      {
        value: 48,
        suffix: "",
        label: M(
          "phố Hàng Ngang — nơi Người viết Tuyên ngôn",
          "Hang Ngang Street, where the Declaration was written",
        ),
      },
      {
        value: 80,
        suffix: "+",
        label: M(
          "năm dân tộc bị tước độc lập, tự do",
          "years the nation was deprived of independence",
        ),
      },
      {
        value: 1776,
        suffix: "",
        label: M(
          "Tuyên ngôn Độc lập của Mỹ được Người dẫn lại",
          "the US Declaration of Independence he drew upon",
        ),
      },
    ],
    pins: [
      {
        x: "42%",
        y: "72%",
        label: M("48 Hàng Ngang", "48 Hang Ngang"),
        date: "28/8/1945",
        title: M("Nhà 48 Hàng Ngang, Hà Nội", "48 Hang Ngang Street, Ha Noi"),
        url: "https://maps.google.com/maps?q=21.0345,105.8515&z=17&output=embed",
      },
      {
        x: "80%",
        y: "26%",
        label: M("Ba Đình", "Ba Dinh"),
        date: "2/9/1945",
        title: M("Quảng trường Ba Đình, Hà Nội", "Ba Dinh Square, Ha Noi"),
        url: "https://maps.google.com/maps?q=21.0369,105.8345&z=16&output=embed",
      },
    ],
  },
];

/** Resolve a bilingual value (or a plain string) for the active language. */
export function t(value: L | string | undefined, lang: Lang): string {
  if (value == null) return "";
  return typeof value === "string" ? value : value[lang] || value.vi;
}

export const PAPER_TONES: Record<string, string> = {
  "Kem rất nhạt": "#fdf7f1",
  "Kem nhạt": "#fbeee2",
  "Kem đậm": "#f8e2cf",
  "Nguyên bản": "#f6d5bd",
};
