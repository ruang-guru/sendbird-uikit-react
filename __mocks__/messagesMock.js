export const USER_ID_A = 'user_id_a';

export const BASIC_MESSAGE = {
  appleCriticalAlertOptions: null,
  channelType: 'group',
  channelUrl:
    'sendbird_group_channel_337761017_9f2bf745b4e1d55a20c4b33a8f3a1cb6daecf47d',
  createdAt: 1632383106322,
  customType: '',
  data: '',
  errorCode: 0,
  isOperatorMessage: false,
  mentionType: 'users',
  mentionedUsers: [],
  message: 'Welcome to the classroom!',
  messageId: 1479690277,
  messageSurvivalSeconds: -1,
  messageType: 'user',
  metaArrays: [],
  ogMetaData: null,
  parentMessageId: 0,
  parentMessageText: null,
  plugins: [],
  poll: null,
  reactions: [],
  requestState: 'succeeded',
  requestedMentionUserIds: [],
  reqId: '1632382917015',
  silent: false,
  sender: {
    nickname: 'Kukuh Aji Sulistyo Bangun Jaya Abadi Mangkubumi',
    plainProfileUrl:
      'https://avatars3.githubusercontent.com/u/46333979?s=460&v=4',
    profileUrl: 'https://avatars3.githubusercontent.com/u/46333979?s=460&v=4',
    userId: 'random-user-id-xxx',
    connectionStatus: 'nonavailable',
    lastSeenAt: 0,
    metaData: {},
    isActive: true,
    friendDiscoveryKey: null,
    friendName: null,
    _preferredLanguages: null,
    requireAuth: false,
    role: 'none',
    isBlockedByMe: false,
  },
  sendingStatus: 'succeeded',
  threadInfo: {
    replyCount: 0,
    mostRepliedUsers: [],
    lastRepliedAt: 0,
    updatedAt: 0,
  },
  translations: {},
  updatedAt: 0,
};

export const BASIC_MESSAGE_A_1 = {
  ...BASIC_MESSAGE,
  sender: { ...BASIC_MESSAGE.sender, userId: USER_ID_A },
};
export const BASIC_MESSAGE_A_2 = {
  ...BASIC_MESSAGE,
  message:
    'Can you think of other strategies for ensuring a welcoming first day of school? Do you have ideas that you have used successfully over the years? Tell us about them n the comments field below.',
  sender: { ...BASIC_MESSAGE.sender, userId: USER_ID_A },
};
export const BASIC_MESSAGE_A_3 = {
  ...BASIC_MESSAGE,
  message: 'Of course, outside reading log',
  sender: { ...BASIC_MESSAGE.sender, userId: USER_ID_A },
};

export const ASSIGNMENT_MESSAGE_A_1 = {
  ...BASIC_MESSAGE,
  customType: 'assignment',
  data:
    '{"serial":"ASN-F8ES2S32KFTAR5S6","title":"Pilihan Ganda Template with deadline","description":"Pilihan Ganda Template","dueAt":"2022-01-01T13:20:00Z","creatorSerial":"JILLYU9G79PUXOHK","cta":"ruangguru://ruangkelas?page=assignment_detail\\u0026workspace_serial=LMS-WS-YPJJS4QTPQU89LR1\\u0026classroom_serial=LMS-CR-ARHSS4XK3RP1R0HQ\\u0026assignment_serial=ASN-F8ES2S32KFTAR5S6","ctaWeb":"https://kelas.sirogu.com/workspace/LMS-WS-YPJJS4QTPQU89LR1/classroom/LMS-CR-ARHSS4XK3RP1R0HQ/assignment/detail/ASN-F8ES2S32KFTAR5S6"}',
};

export const ASSIGNMENT_MESSAGE_A_2 = {
  ...ASSIGNMENT_MESSAGE_A_1,
  data:
    '{"serial":"ASN-IHB4XI1KY1HWRWPO","title":"Pilihan Ganda Template","description":"Pilihan Ganda Template","dueAt":"","creatorSerial":"JILLYU9G79PUXOHK","cta":"ruangguru://ruangkelas?page=assignment_detail\\u0026workspace_serial=LMS-WS-YPJJS4QTPQU89LR1\\u0026classroom_serial=LMS-CR-ARHSS4XK3RP1R0HQ\\u0026assignment_serial=ASN-IHB4XI1KY1HWRWPO","ctaWeb":"https://kelas.sirogu.com/workspace/LMS-WS-YPJJS4QTPQU89LR1/classroom/LMS-CR-ARHSS4XK3RP1R0HQ/assignment/detail/ASN-IHB4XI1KY1HWRWPO"}',
  sender: { ...BASIC_MESSAGE.sender, userId: USER_ID_A },
};

export const MATERIAL_MESSAGE_A_1 = {
  ...BASIC_MESSAGE,
  customType: 'material',
  data:
    '{"serial":"SUBTOPI-2N28ZO17","title":"Materi Google","creatorSerial":"JILLYU9G79PUXOHK","description":"","cta":"ruangguru://ruangkelas?page=material_detail\\u0026workspace_serial=LMS-WS-YPJJS4QTPQU89LR1\\u0026classroom_serial=LMS-CR-ARHSS4XK3RP1R0HQ\\u0026material_serial=SUBTOPI-2N28ZO17","ctaWeb":"https://kelas.sirogu.com/workspace/LMS-WS-YPJJS4QTPQU89LR1/classroom/LMS-CR-ARHSS4XK3RP1R0HQ/material/detail/SUBTOPI-2N28ZO17"}',
};

export const MATERIAL_MESSAGE_A_2 = {
  ...MATERIAL_MESSAGE_A_1,
  data:
    '{"serial":"SUBTOPI-2N28ZO17","title":"Understand how users behave on your site, what they need,  Understand how users behave on your site, and how they feel, fast ","creatorSerial":"JILLYU9G79PUXOHK","description":"","cta":"ruangguru://ruangkelas?page=material_detail\\u0026workspace_serial=LMS-WS-YPJJS4QTPQU89LR1\\u0026classroom_serial=LMS-CR-ARHSS4XK3RP1R0HQ\\u0026material_serial=SUBTOPI-2N28ZO17","ctaWeb":"https://kelas.sirogu.com/workspace/LMS-WS-YPJJS4QTPQU89LR1/classroom/LMS-CR-ARHSS4XK3RP1R0HQ/material/detail/SUBTOPI-2N28ZO17"}',
  sender: { ...BASIC_MESSAGE.sender, userId: USER_ID_A },
};
export const LONG_MESSAGE = {
  ...BASIC_MESSAGE,
  message:
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.',
};
export const LONG_MESSAGE_A_1 = {
  ...LONG_MESSAGE,
  sender: { ...LONG_MESSAGE.sender, userId: USER_ID_A },
};

export const OPERATOR_MESSAGE = {
  ...BASIC_MESSAGE,
  isOperatorMessage: true,
};

export const IMAGE_MESSAGE = {
  ...BASIC_MESSAGE,
  type: 'image/png',
  size: 2062393,
  messageType: 'file',
  url:
    'https://sendbird-upload.s3.amazonaws.com/D74864D6-2283-48E1-8381-89719216DC7F/upload/n/f332b95c14b240f181721ea695a9ca70.png',
  plainUrl:
    'https://sendbird-upload.s3.amazonaws.com/D74864D6-2283-48E1-8381-89719216DC7F/upload/n/f332b95c14b240f181721ea695a9ca70.png',
  name: `misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya

misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternyamisalkan pesan panjang misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya

misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternyamisalkan pesan panjang misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang misalkan pesan panjang trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya trus ada enternya`,
  thumbnails: [],
  requestState: 'succeeded',
  requestedMentionUserIds: [],
  errorCode: 0,
  messageSurvivalSeconds: -1,
};

export const IMAGE_MESSAGE_2 = {
  ...IMAGE_MESSAGE,
  sender: { ...IMAGE_MESSAGE.sender, userId: USER_ID_A },
};

export const VIDEO_MESSAGE = {
  ...IMAGE_MESSAGE,
  size: 771699,
  type: 'video/mp4',
  url:
    'https://sendbird-upload.s3.amazonaws.com/D74864D6-2283-48E1-8381-89719216DC7F/upload/n/360a8dad320646298788f68a0d417c1c.mp4',
  plainUrl:
    'https://sendbird-upload.s3.amazonaws.com/D74864D6-2283-48E1-8381-89719216DC7F/upload/n/360a8dad320646298788f68a0d417c1c.mp4',
};

export const GIF_MESSAGE = {
  ...IMAGE_MESSAGE,
  size: 2676798,
  type: 'image/gif',
  url:
    'https://sendbird-upload.s3.amazonaws.com/D74864D6-2283-48E1-8381-89719216DC7F/upload/n/65bd937a3a4641bb98c0fe878eabafa3.gif',
  plainUrl:
    'https://sendbird-upload.s3.amazonaws.com/D74864D6-2283-48E1-8381-89719216DC7F/upload/n/65bd937a3a4641bb98c0fe878eabafa3.gif',
};

export const FILE_MESSAGE = {
  ...BASIC_MESSAGE_A_1,
  messageType: 'file',
};
export const FILE_MESSAGE_DOC = {
  ...FILE_MESSAGE,
  name: 'Some Document.doc',
  plainUrl:
    'https://sendbird-upload.s3.amazonaws.com/D74864D6-2283-48E1-8381-89719216DC7F/upload/n/a08c8904a53b491da98093f7e502e51e.doc',
  size: 103320,
  type: 'application/msword',
};
export const FILE_MESSAGE_DOCX = {
  ...FILE_MESSAGE,
  name: 'Some Document.docx',
  plainUrl:
    'https://sendbird-upload.s3.amazonaws.com/D74864D6-2283-48E1-8381-89719216DC7F/upload/n/11bc351cf64f4351a536a8a9ad4f4b67.docx',
  size: 84,
  type:
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
export const FILE_MESSAGE_XLS = {
  ...FILE_MESSAGE,
  name: 'Some Document.xls',
  plainUrl:
    'https://sendbird-upload.s3.amazonaws.com/D74864D6-2283-48E1-8381-89719216DC7F/upload/n/303487f63f084b6ead0150df555ad20f.xls',
  type: 'application/vnd.ms-excel',
};
export const FILE_MESSAGE_XLSX = {
  ...FILE_MESSAGE,
  name: 'Some Document.xlsx',
  plainUrl:
    'https://sendbird-upload.s3.amazonaws.com/D74864D6-2283-48E1-8381-89719216DC7F/upload/n/3b96c8fb509441daa47ce345ef0a37fa.xlsx',
  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};
export const FILE_MESSAGE_PPT = {
  ...FILE_MESSAGE,
  name: 'Some Document.ppt',
  plainUrl:
    'https://sendbird-upload.s3.amazonaws.com/D74864D6-2283-48E1-8381-89719216DC7F/upload/n/0518c35bd6184499a5679e7e98e0db5a.ppt',
  size: 5605000,
  type: 'application/vnd.ms-powerpoint',
};
export const FILE_MESSAGE_PPTX = {
  ...FILE_MESSAGE,
  name: 'Some Document.pptx',
  plainUrl:
    'https://sendbird-upload.s3.amazonaws.com/D74864D6-2283-48E1-8381-89719216DC7F/upload/n/f0dd718d96384248bd202f059f1d178e.pptx',
  size: 9803000,
  type:
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};
export const FILE_MESSAGE_PDF = {
  ...FILE_MESSAGE,
  name: 'Some Document.pdf',
  plainUrl:
    'https://sendbird-upload.s3.amazonaws.com/D74864D6-2283-48E1-8381-89719216DC7F/upload/n/ba3f15a990f84cef9f87f2d88fd30712.pdf',
  size: 8900,
  type: 'application/pdf',
};

export const OG_MESSAGE = {
  ...BASIC_MESSAGE,
  message: 'Visit https://suliskh.com!',
  ogMetaData: {
    title: 'Kukuh Sulistyo — Insinyur Perangkat Lunak',
    url: 'https://suliskh.com',
    description:
      'Insinyur perangkat lunak berfokus di web. Tertarik dengan design system dan aksesibilitas',
    defaultImage: {
      url:
        'https://ik.imagekit.io/dnha0dbp86x/suliskh_com/Home_1__8lvqRSrdOB.png',
      secureUrl: null,
      type: null,
      width: 0,
      height: 0,
      alt: null,
    },
  },
};
