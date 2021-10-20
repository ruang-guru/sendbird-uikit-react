export const USER_ID_A = 'user_id_a';
export const BASIC_MESSAGE = {
  messageId: 1479690277,
  messageType: 'user',
  channelUrl:
    'sendbird_group_channel_337761017_9f2bf745b4e1d55a20c4b33a8f3a1cb6daecf47d',
  data: '',
  customType: '',
  silent: false,
  createdAt: 1632383106322,
  updatedAt: 0,
  channelType: 'group',
  metaArrays: [],
  reactions: [],
  mentionType: 'users',
  mentionedUsers: [],
  sendingStatus: 'succeeded',
  parentMessageId: 0,
  parentMessageText: null,
  threadInfo: {
    replyCount: 0,
    mostRepliedUsers: [],
    lastRepliedAt: 0,
    updatedAt: 0,
  },
  ogMetaData: null,
  isOperatorMessage: false,
  appleCriticalAlertOptions: null,
  message: 'Welcome to the classroom!',
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
  reqId: '1632382917015',
  translations: {},
  requestState: 'succeeded',
  requestedMentionUserIds: [],
  errorCode: 0,
  messageSurvivalSeconds: -1,
  plugins: [],
  poll: null,
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
  data: "{\"serial\":\"ASN-F8ES2S32KFTAR5S6\",\"title\":\"Pilihan Ganda Template with deadline\",\"description\":\"Pilihan Ganda Template\",\"dueAt\":\"2022-01-01T13:20:00Z\",\"creatorSerial\":\"JILLYU9G79PUXOHK\",\"cta\":\"ruangguru://ruangkelas?page=assignment_detail\\u0026workspace_serial=LMS-WS-YPJJS4QTPQU89LR1\\u0026classroom_serial=LMS-CR-ARHSS4XK3RP1R0HQ\\u0026assignment_serial=ASN-F8ES2S32KFTAR5S6\",\"ctaWeb\":\"https://kelas.sirogu.com/workspace/LMS-WS-YPJJS4QTPQU89LR1/classroom/LMS-CR-ARHSS4XK3RP1R0HQ/assignment/detail/ASN-F8ES2S32KFTAR5S6\"}",
};

export const ASSIGNMENT_MESSAGE_A_2 = {
  ...ASSIGNMENT_MESSAGE_A_1,
  data: "{\"serial\":\"ASN-IHB4XI1KY1HWRWPO\",\"title\":\"Pilihan Ganda Template\",\"description\":\"Pilihan Ganda Template\",\"dueAt\":\"\",\"creatorSerial\":\"JILLYU9G79PUXOHK\",\"cta\":\"ruangguru://ruangkelas?page=assignment_detail\\u0026workspace_serial=LMS-WS-YPJJS4QTPQU89LR1\\u0026classroom_serial=LMS-CR-ARHSS4XK3RP1R0HQ\\u0026assignment_serial=ASN-IHB4XI1KY1HWRWPO\",\"ctaWeb\":\"https://kelas.sirogu.com/workspace/LMS-WS-YPJJS4QTPQU89LR1/classroom/LMS-CR-ARHSS4XK3RP1R0HQ/assignment/detail/ASN-IHB4XI1KY1HWRWPO\"}",
  sender: { ...BASIC_MESSAGE.sender, userId: USER_ID_A },
};

export const MATERIAL_MESSAGE_A_1 = {
  ...BASIC_MESSAGE,
  customType: 'material',
  data: "{\"serial\":\"SUBTOPI-2N28ZO17\",\"title\":\"Materi Google\",\"creatorSerial\":\"JILLYU9G79PUXOHK\",\"description\":\"\",\"cta\":\"ruangguru://ruangkelas?page=material_detail\\u0026workspace_serial=LMS-WS-YPJJS4QTPQU89LR1\\u0026classroom_serial=LMS-CR-ARHSS4XK3RP1R0HQ\\u0026material_serial=SUBTOPI-2N28ZO17\",\"ctaWeb\":\"https://kelas.sirogu.com/workspace/LMS-WS-YPJJS4QTPQU89LR1/classroom/LMS-CR-ARHSS4XK3RP1R0HQ/material/detail/SUBTOPI-2N28ZO17\"}"
};

export const MATERIAL_MESSAGE_A_2 = {
  ...MATERIAL_MESSAGE_A_1,
  data: "{\"serial\":\"SUBTOPI-2N28ZO17\",\"title\":\"Understand how users behave on your site, what they need,  Understand how users behave on your site, and how they feel, fast \",\"creatorSerial\":\"JILLYU9G79PUXOHK\",\"description\":\"\",\"cta\":\"ruangguru://ruangkelas?page=material_detail\\u0026workspace_serial=LMS-WS-YPJJS4QTPQU89LR1\\u0026classroom_serial=LMS-CR-ARHSS4XK3RP1R0HQ\\u0026material_serial=SUBTOPI-2N28ZO17\",\"ctaWeb\":\"https://kelas.sirogu.com/workspace/LMS-WS-YPJJS4QTPQU89LR1/classroom/LMS-CR-ARHSS4XK3RP1R0HQ/material/detail/SUBTOPI-2N28ZO17\"}",
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
