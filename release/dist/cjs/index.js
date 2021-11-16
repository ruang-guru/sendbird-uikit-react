'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var SendbirdProvider = require('./SendbirdProvider.js');
var App = require('./App.js');
var LocalizationContext = require('./LocalizationContext-4fe85bc0.js');
var index$1 = require('./index-c20367e3.js');
var React$1 = require('react');
var PropTypes$1 = require('prop-types');
var index$2 = require('./index-2ea15f3c.js');
var index$3 = require('./index-f2387f01.js');
var dateFns = require('date-fns');
var Channel = require('./index-65b5d489.js');
var reactDom = require('react-dom');
require('sendbird');
require('./actionTypes-04f99617.js');
require('css-vars-ponyfill');
require('./ChannelList.js');
require('./index-52fd918b.js');
require('./utils-898f1912.js');
require('./LeaveChannel-81eeb4e4.js');
require('./index-c4c1b7b4.js');
require('./index-acc45933.js');
require('./index-d6aa2ffa.js');
require('./ChannelSettings.js');
require('./index-1afde0a5.js');
require('./MessageSearch.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__default$1 = /*#__PURE__*/_interopDefaultLegacy(React$1);
var React__namespace = /*#__PURE__*/_interopNamespace(React$1);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes$1);

var getDayString = function getDayString(dayNumber, strings) {
  return strings[dayNumber];
};

// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
var formatBytes = function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  var k = 1024;
  var decimal = 2;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimal)) + ' ' + sizes[i];
};

// TODO: consider to use enum instead
var RoguFileTypes = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  PDF: 'PDF',
  WORD: 'WORD',
  EXCEL: 'EXCEL',
  POWERPOINT: 'POWERPOINT',
  OTHERS: 'OTHERS'
}; // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types

var SUPPORTED_MIMES = {
  IMAGE: [{
    mimeType: 'image/jpeg',
    extension: 'JPEG'
  }, {
    mimeType: 'image/jpg',
    extension: 'JPG'
  }, {
    mimeType: 'image/png',
    extension: 'PNG'
  }, {
    mimeType: 'image/gif',
    extension: 'GIF'
  }],
  VIDEO: [{
    mimeType: 'video/mp4',
    extension: 'MP4'
  }, {
    mimeType: 'video/quicktime',
    extension: 'MOV'
  }],
  PDF: [{
    mimeType: 'application/pdf',
    extension: 'PDF'
  }],
  WORD: [{
    mimeType: 'application/msword',
    extension: 'DOC'
  }, {
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    extension: 'DOCX'
  }],
  EXCEL: [{
    mimeType: 'application/vnd.ms-excel',
    extension: 'XLS'
  }, {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    extension: 'XLSX'
  }],
  POWERPOINT: [{
    mimeType: 'application/vnd.ms-powerpoint',
    extension: 'PPT'
  }, {
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    extension: 'PPTX'
  }]
};
var isImage = function isImage(mimeType) {
  return SUPPORTED_MIMES.IMAGE.some(function (mime) {
    return mime.mimeType === mimeType;
  });
};
var isVideo = function isVideo(mimeType) {
  return SUPPORTED_MIMES.VIDEO.some(function (mime) {
    return mime.mimeType === mimeType;
  });
};
var isPDF = function isPDF(mimeType) {
  return SUPPORTED_MIMES.PDF.some(function (mime) {
    return mime.mimeType === mimeType;
  });
};
var isWord = function isWord(mimeType) {
  return SUPPORTED_MIMES.WORD.some(function (mime) {
    return mime.mimeType === mimeType;
  });
};
var isPPT = function isPPT(mimeType) {
  return SUPPORTED_MIMES.POWERPOINT.some(function (mime) {
    return mime.mimeType === mimeType;
  });
};
var isExcel = function isExcel(mimeType) {
  return SUPPORTED_MIMES.EXCEL.some(function (mime) {
    return mime.mimeType === mimeType;
  });
};
var isSupportedFileView = function isSupportedFileView(mimeType) {
  return isImage(mimeType) || isVideo(mimeType);
};
var getFileType = function getFileType(mimeType) {
  if (isImage(mimeType)) return RoguFileTypes.IMAGE;
  if (isVideo(mimeType)) return RoguFileTypes.VIDEO;
  if (isPDF(mimeType)) return RoguFileTypes.PDF;
  if (isWord(mimeType)) return RoguFileTypes.WORD;
  if (isPPT(mimeType)) return RoguFileTypes.POWERPOINT;
  if (isExcel(mimeType)) return RoguFileTypes.EXCEL;
  return RoguFileTypes.OTHERS;
};
var getMimeExtension = function getMimeExtension(mimeType) {
  for (var _i = 0, _a = Object.values(SUPPORTED_MIMES); _i < _a.length; _i++) {
    var mimes = _a[_i];
    var mimeFound = mimes.find(function (mime) {
      return mime.mimeType === mimeType;
    });

    if (mimeFound) {
      return mimeFound.extension;
    }
  }
};
var getMimeTypesString = function getMimeTypesString() {
  var mimeTypes = [];

  for (var _i = 0, _a = Object.values(SUPPORTED_MIMES); _i < _a.length; _i++) {
    var mimes = _a[_i];
    mimes.forEach(function (mime) {
      return mimeTypes.push(mime.mimeType);
    });
  }

  return mimeTypes.join(',');
};

var groupMessagesByDate = function groupMessagesByDate(messages) {
  return messages.reduce(function (groupedMessagesByDate, currMessage) {
    var messageDate = dateFns.format(currMessage.createdAt, 'dd/MM/yyyy');
    var currentGroup = groupedMessagesByDate.get(messageDate);

    if (currentGroup) {
      groupedMessagesByDate.set(messageDate, LocalizationContext.__spreadArray(LocalizationContext.__spreadArray([], currentGroup, true), [currMessage], false));
    } else {
      groupedMessagesByDate.set(messageDate, [currMessage]);
    }

    return groupedMessagesByDate;
  }, new Map());
};

var isFileMessage = function isFileMessage(message) {
  var _a;

  return message && (((_a = message.isFileMessage) === null || _a === void 0 ? void 0 : _a.call(message)) || message['messageType'] && message.messageType === 'file');
};
var isThumbnailMessage = function isThumbnailMessage(message) {
  return message && isFileMessage(message) && isSupportedFileView(message.type);
};
var isReplyingMessage = function isReplyingMessage(message) {
  var isReplying = false;

  if (message.metaArrays) {
    isReplying = message.metaArrays.some(function (meta) {
      return meta.key === 'parentMessageId';
    });
  }

  return isReplying;
};

var REGEX_URL = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*?)/g;
var K = '[[SPLIT_KEYWORD]]';
var extractUrls = function extractUrls(text) {
  // Array of extracted urls
  var urls = text.match(REGEX_URL) || []; // Array of splitted sentences without any url

  var sentences = text.replace(REGEX_URL, K).split(K) || [];
  return {
    urls: urls,
    sentences: sentences
  };
};

/**
 * Example:
 * const MyComponent = () => {
 *  const context = useSendbirdStateContext();
 *  const sdk = sendbirdSelectors.getSdk(context);
 *  return (<div>...</div>);
 * }
 */

function useSendbirdStateContext() {
  var context = React$1.useContext(LocalizationContext.SendbirdSdkContext);
  return context;
}

var RESET_MESSAGES = 'RESET_MESSAGES';
var RESET_STATE = 'RESET_STATE';
var CLEAR_SENT_MESSAGES = 'CLEAR_SENT_MESSAGES';
var GET_PREV_MESSAGES_START = 'GET_PREV_MESSAGES_START';
var GET_PREV_MESSAGES_SUCESS = 'GET_PREV_MESSAGES_SUCESS';
var GET_NEXT_MESSAGES_SUCESS = 'GET_NEXT_MESSAGES_SUCESS';
var GET_NEXT_MESSAGES_FAILURE = 'GET_NEXT_MESSAGES_FAILURE';
var SEND_MESSAGEGE_START = 'SEND_MESSAGEGE_START';
var SEND_MESSAGEGE_SUCESS = 'SEND_MESSAGEGE_SUCESS';
var SEND_MESSAGEGE_FAILURE = 'SEND_MESSAGEGE_FAILURE';
var RESEND_MESSAGEGE_START = 'RESEND_MESSAGEGE_START';
var ON_MESSAGE_RECEIVED = 'ON_MESSAGE_RECEIVED';
var UPDATE_UNREAD_COUNT = 'UPDATE_UNREAD_COUNT';
var ON_MESSAGE_UPDATED = 'ON_MESSAGE_UPDATED';
var ON_MESSAGE_DELETED = 'ON_MESSAGE_DELETED';
var ON_MESSAGE_DELETED_BY_REQ_ID = 'ON_MESSAGE_DELETED_BY_REQ_ID';
var SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';
var SET_CHANNEL_INVALID = 'SET_CHANNEL_INVALID';
var MARK_AS_READ = 'MARK_AS_READ';
var ON_REACTION_UPDATED = 'ON_REACTION_UPDATED';
var SET_EMOJI_CONTAINER = 'SET_EMOJI_CONTAINER';
var MESSAGE_LIST_PARAMS_CHANGED = 'MESSAGE_LIST_PARAMS_CHANGED';

index$1.getOutgoingMessageStates();
var UNDEFINED = 'undefined';

var _getSendingMessageSta$1 = index$1.getSendingMessageStatus(),
    SUCCEEDED$1 = _getSendingMessageSta$1.SUCCEEDED;
    _getSendingMessageSta$1.FAILED;
    var PENDING$1 = _getSendingMessageSta$1.PENDING;

var scrollIntoLast = function scrollIntoLast() {
  var intialTry = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var MAX_TRIES = 10;
  var currentTry = intialTry;

  if (currentTry > MAX_TRIES) {
    return;
  }

  try {
    var scrollDOM = document.querySelector('.rogu-conversation__scroll-container'); // eslint-disable-next-line no-multi-assign

    scrollDOM.scrollTop = scrollDOM.scrollHeight;
  } catch (error) {
    setTimeout(function () {
      scrollIntoLast(currentTry + 1);
    }, 500 * currentTry);
  }
};
var pubSubHandleRemover = function pubSubHandleRemover(subscriber) {
  subscriber.forEach(function (s) {
    try {
      s.remove();
    } catch (_unused) {//
    }
  });
};
var pubSubHandler = function pubSubHandler(channelUrl, pubSub, dispatcher) {
  var subscriber = new Map();
  if (!pubSub || !pubSub.subscribe) return subscriber;
  subscriber.set(index$1.SEND_USER_MESSAGE, pubSub.subscribe(index$1.SEND_USER_MESSAGE, function (msg) {
    var channel = msg.channel,
        message = msg.message;
    scrollIntoLast();

    if (channel && channelUrl === channel.url) {
      dispatcher({
        type: SEND_MESSAGEGE_SUCESS,
        payload: message
      });
    }
  }));
  subscriber.set(index$1.SEND_MESSAGE_START, pubSub.subscribe(index$1.SEND_MESSAGE_START, function (msg) {
    var channel = msg.channel,
        message = msg.message;

    if (channel && channelUrl === channel.url) {
      dispatcher({
        type: SEND_MESSAGEGE_START,
        payload: message
      });
    }
  }));
  subscriber.set(index$1.SEND_FILE_MESSAGE, pubSub.subscribe(index$1.SEND_FILE_MESSAGE, function (msg) {
    var channel = msg.channel,
        message = msg.message;
    scrollIntoLast();

    if (channel && channelUrl === channel.url) {
      dispatcher({
        type: SEND_MESSAGEGE_SUCESS,
        payload: message
      });
    }
  }));
  subscriber.set(index$1.UPDATE_USER_MESSAGE, pubSub.subscribe(index$1.UPDATE_USER_MESSAGE, function (msg) {
    var channel = msg.channel,
        message = msg.message,
        fromSelector = msg.fromSelector;

    if (fromSelector && channel && channelUrl === channel.url) {
      dispatcher({
        type: ON_MESSAGE_UPDATED,
        payload: {
          channel: channel,
          message: message
        }
      });
    }
  }));
  subscriber.set(index$1.DELETE_MESSAGE, pubSub.subscribe(index$1.DELETE_MESSAGE, function (msg) {
    var channel = msg.channel,
        messageId = msg.messageId;

    if (channel && channelUrl === channel.url) {
      dispatcher({
        type: ON_MESSAGE_DELETED,
        payload: messageId
      });
    }
  }));
  return subscriber;
};
var isOperator = function isOperator() {
  var groupChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var myRole = groupChannel.myRole;
  return myRole === 'operator';
};
var isDisabledBecauseFrozen = function isDisabledBecauseFrozen() {
  var groupChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isFrozen = groupChannel.isFrozen;
  return isFrozen && !isOperator(groupChannel);
};
var isDisabledBecauseMuted = function isDisabledBecauseMuted() {
  var groupChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var myMutedState = groupChannel.myMutedState;
  return myMutedState === 'muted';
};
var getAllEmojisFromEmojiContainer = function getAllEmojisFromEmojiContainer() {
  var emojiContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _emojiContainer$emoji = emojiContainer.emojiCategories,
      emojiCategories = _emojiContainer$emoji === void 0 ? [] : _emojiContainer$emoji;
  var allEmojis = [];

  for (var categoryIndex = 0; categoryIndex < emojiCategories.length; categoryIndex += 1) {
    var emojis = emojiCategories[categoryIndex].emojis;

    for (var emojiIndex = 0; emojiIndex < emojis.length; emojiIndex += 1) {
      allEmojis.push(emojis[emojiIndex]);
    }
  }

  return allEmojis;
};
var getAllEmojisMapFromEmojiContainer = function getAllEmojisMapFromEmojiContainer() {
  var emojiContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _emojiContainer$emoji2 = emojiContainer.emojiCategories,
      emojiCategories = _emojiContainer$emoji2 === void 0 ? [] : _emojiContainer$emoji2;
  var allEmojisMap = new Map();

  for (var categoryIndex = 0; categoryIndex < emojiCategories.length; categoryIndex += 1) {
    var emojis = emojiCategories[categoryIndex].emojis;

    for (var emojiIndex = 0; emojiIndex < emojis.length; emojiIndex += 1) {
      var _emojis$emojiIndex = emojis[emojiIndex],
          key = _emojis$emojiIndex.key,
          url = _emojis$emojiIndex.url;
      allEmojisMap.set(key, url);
    }
  }

  return allEmojisMap;
};
var getNicknamesMapFromMembers = function getNicknamesMapFromMembers() {
  var members = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var nicknamesMap = new Map();

  for (var memberIndex = 0; memberIndex < members.length; memberIndex += 1) {
    var _members$memberIndex = members[memberIndex],
        userId = _members$memberIndex.userId,
        nickname = _members$memberIndex.nickname;
    nicknamesMap.set(userId, nickname);
  }

  return nicknamesMap;
};
var getMessageCreatedAt = function getMessageCreatedAt(message) {
  return index$2.format(message.createdAt, 'p');
};
var isSameGroup = function isSameGroup(message, comparingMessage) {
  if (!message || !comparingMessage || !message.sender || !comparingMessage.sender || !message.createdAt || !comparingMessage.createdAt || !message.sender.userId || !comparingMessage.sender.userId) {
    return false;
  }

  return message.sendingStatus === comparingMessage.sendingStatus && message.sender.userId === comparingMessage.sender.userId && getMessageCreatedAt(message) === getMessageCreatedAt(comparingMessage);
};
var compareMessagesForGrouping = function compareMessagesForGrouping(prevMessage, currMessage, nextMessage) {
  return [isSameGroup(prevMessage, currMessage), isSameGroup(currMessage, nextMessage)];
};
var hasOwnProperty = function hasOwnProperty(property) {
  return function (payload) {
    // eslint-disable-next-line no-prototype-builtins
    if (payload && payload.hasOwnProperty && payload.hasOwnProperty(property)) {
      return true;
    }

    return false;
  };
};
var passUnsuccessfullMessages = function passUnsuccessfullMessages(allMessages, newMessage) {
  var _newMessage$sendingSt = newMessage.sendingStatus,
      sendingStatus = _newMessage$sendingSt === void 0 ? UNDEFINED : _newMessage$sendingSt;

  if (sendingStatus === SUCCEEDED$1 || sendingStatus === PENDING$1) {
    var lastIndexOfSucceededMessage = allMessages.map(function (message) {
      return message.sendingStatus || (message.isAdminMessage && message.isAdminMessage() ? SUCCEEDED$1 : UNDEFINED);
    }).lastIndexOf(SUCCEEDED$1);

    if (lastIndexOfSucceededMessage + 1 < allMessages.length) {
      var messages = LocalizationContext._toConsumableArray(allMessages);

      messages.splice(lastIndexOfSucceededMessage + 1, 0, newMessage);
      return messages;
    }
  }

  return [].concat(LocalizationContext._toConsumableArray(allMessages), [newMessage]);
};
var pxToNumber = function pxToNumber(px) {
  if (typeof px === 'number') {
    return px;
  }

  if (typeof px === 'string') {
    var parsed = Number.parseFloat(px);

    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  return null;
};

var messagesInitialState = {
  initialized: false,
  loading: false,
  allMessages: [],
  currentGroupChannel: {
    members: []
  },
  // for scrollup
  hasMore: false,
  lastMessageTimeStamp: 0,
  // for scroll down
  // onScrollDownCallback is added for navigation to different timestamps on messageSearch
  // hasMoreToBottom, onScrollDownCallback -> scroll down
  // hasMore, onScrollCallback -> scroll up(default behavior)
  hasMoreToBottom: false,
  latestFetchedMessageTimeStamp: 0,
  emojiContainer: {},
  unreadCount: 0,
  unreadSince: null,
  isInvalid: false,
  messageListParams: null
};

var _getSendingMessageSta = index$1.getSendingMessageStatus(),
    SUCCEEDED = _getSendingMessageSta.SUCCEEDED,
    FAILED = _getSendingMessageSta.FAILED,
    PENDING = _getSendingMessageSta.PENDING;

function reducer(state, action) {
  switch (action.type) {
    case RESET_STATE:
      return messagesInitialState;

    case RESET_MESSAGES:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        // when user switches channel, if the previous channel `hasMore`
        // the onScroll gets called twice, setting hasMore false prevents this
        hasMore: false,
        allMessages: []
      });

    case GET_PREV_MESSAGES_START:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        loading: true
      });

    case CLEAR_SENT_MESSAGES:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: LocalizationContext._toConsumableArray(state.allMessages.filter(function (m) {
          return m.sendingStatus !== SUCCEEDED;
        }))
      });

    case GET_PREV_MESSAGES_SUCESS:
      {
        var receivedMessages = action.payload.messages || [];
        var _action$payload$curre = action.payload.currentGroupChannel,
            currentGroupChannel = _action$payload$curre === void 0 ? {} : _action$payload$curre;
        var stateChannel = state.currentGroupChannel || {};
        var stateChannelUrl = stateChannel.url;
        var actionChannelUrl = currentGroupChannel.url;

        if (actionChannelUrl !== stateChannelUrl) {
          return state;
        } // remove duplicate messages


        var filteredAllMessages = state.allMessages.filter(function (msg) {
          return !receivedMessages.find(function (_ref) {
            var messageId = _ref.messageId;
            return index$3.compareIds(messageId, msg.messageId);
          });
        });
        var hasHasMoreToBottom = hasOwnProperty('hasMoreToBottom')(action.payload);
        var hasLatestFetchedMessageTimeStamp = hasOwnProperty('latestFetchedMessageTimeStamp')(action.payload);
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2(LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          loading: false,
          initialized: true,
          hasMore: action.payload.hasMore,
          lastMessageTimeStamp: action.payload.lastMessageTimeStamp
        }, hasHasMoreToBottom && {
          hasMoreToBottom: action.payload.hasMoreToBottom
        }), hasLatestFetchedMessageTimeStamp && {
          latestFetchedMessageTimeStamp: action.payload.latestFetchedMessageTimeStamp
        }), {}, {
          allMessages: [].concat(LocalizationContext._toConsumableArray(receivedMessages), LocalizationContext._toConsumableArray(filteredAllMessages))
        });
      }

    case GET_NEXT_MESSAGES_SUCESS:
      {
        var _receivedMessages = action.payload.messages || [];

        var _action$payload$curre2 = action.payload.currentGroupChannel,
            _currentGroupChannel = _action$payload$curre2 === void 0 ? {} : _action$payload$curre2;

        var _stateChannel = state.currentGroupChannel || {};

        var _stateChannelUrl = _stateChannel.url;
        var _actionChannelUrl = _currentGroupChannel.url;

        if (_actionChannelUrl !== _stateChannelUrl) {
          return state;
        } // remove duplicate messages


        var _filteredAllMessages = state.allMessages.filter(function (msg) {
          return !_receivedMessages.find(function (_ref2) {
            var messageId = _ref2.messageId;
            return index$3.compareIds(messageId, msg.messageId);
          });
        });

        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          loading: false,
          initialized: true,
          hasMore: action.payload.hasMore,
          lastMessageTimeStamp: action.payload.lastMessageTimeStamp,
          hasMoreToBottom: action.payload.hasMoreToBottom,
          latestFetchedMessageTimeStamp: action.payload.latestFetchedMessageTimeStamp,
          allMessages: [].concat(LocalizationContext._toConsumableArray(_filteredAllMessages), LocalizationContext._toConsumableArray(_receivedMessages))
        });
      }

    case GET_NEXT_MESSAGES_FAILURE:
      {
        return LocalizationContext._objectSpread2({}, state);
      }

    case SEND_MESSAGEGE_START:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: [].concat(LocalizationContext._toConsumableArray(state.allMessages), [LocalizationContext._objectSpread2({}, action.payload)])
      });

    case SEND_MESSAGEGE_SUCESS:
      {
        var newMessages = state.allMessages.map(function (m) {
          return index$3.compareIds(m.reqId, action.payload.reqId) ? action.payload : m;
        });

        LocalizationContext._toConsumableArray(newMessages).sort(function (a, b) {
          return a.sendingStatus && b.sendingStatus && a.sendingStatus === SUCCEEDED && (b.sendingStatus === PENDING || b.sendingStatus === FAILED) ? -1 : 1;
        });

        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          allMessages: newMessages
        });
      }

    case SEND_MESSAGEGE_FAILURE:
      {
        // eslint-disable-next-line no-param-reassign
        action.payload.failed = true;
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(function (m) {
            return index$3.compareIds(m.reqId, action.payload.reqId) ? action.payload : m;
          })
        });
      }

    case SET_CURRENT_CHANNEL:
      {
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          currentGroupChannel: action.payload,
          isInvalid: false
        });
      }

    case SET_CHANNEL_INVALID:
      {
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          isInvalid: true
        });
      }

    case UPDATE_UNREAD_COUNT:
      {
        var channel = action.payload.channel;

        var _state$currentGroupCh = state.currentGroupChannel,
            _currentGroupChannel2 = _state$currentGroupCh === void 0 ? {} : _state$currentGroupCh,
            unreadCount = state.unreadCount;

        var currentGroupChannelUrl = _currentGroupChannel2.url;

        if (!index$3.compareIds(channel.url, currentGroupChannelUrl)) {
          return state;
        }

        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          unreadSince: unreadCount + 1
        });
      }

    case ON_MESSAGE_RECEIVED:
      {
        var _action$payload = action.payload,
            _channel = _action$payload.channel,
            message = _action$payload.message,
            scrollToEnd = _action$payload.scrollToEnd;
        var _unreadCount = 0;

        var _state$currentGroupCh2 = state.currentGroupChannel,
            _currentGroupChannel3 = _state$currentGroupCh2 === void 0 ? {} : _state$currentGroupCh2,
            unreadSince = state.unreadSince;

        var _currentGroupChannelUrl = _currentGroupChannel3.url;

        if (!index$3.compareIds(_channel.url, _currentGroupChannelUrl)) {
          return state;
        } // Excluded overlapping messages


        if (state.allMessages.some(function (msg) {
          return msg.messageId === message.messageId;
        })) {
          return state;
        } // Filter by userFilledQuery


        if (state.messageListParams && !index$1.filterMessageListParams(state.messageListParams, message)) {
          return state;
        }

        _unreadCount = state.unreadCount + 1; // reset unreadCount if have to scrollToEnd

        if (scrollToEnd) {
          _unreadCount = 0;
        }

        if (message.isAdminMessage && message.isAdminMessage()) {
          return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
            allMessages: passUnsuccessfullMessages(state.allMessages, message)
          });
        }

        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          unreadCount: _unreadCount,
          unreadSince: _unreadCount === 1 ? index$2.format(new Date(), 'HH.mm dd MMM yyyy') : unreadSince,
          allMessages: passUnsuccessfullMessages(state.allMessages, message)
        });
      }

    case ON_MESSAGE_UPDATED:
      {
        var _message = action.payload.message;

        if (state.messageListParams && !index$1.filterMessageListParams(state.messageListParams, _message)) {
          // Delete the message if it doesn't match to the params anymore
          return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
            allMessages: state.allMessages.filter(function (m) {
              return !index$3.compareIds(m.messageId, _message === null || _message === void 0 ? void 0 : _message.messageId);
            })
          });
        }

        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(function (m) {
            return index$3.compareIds(m.messageId, action.payload.message.messageId) ? action.payload.message : m;
          })
        });
      }

    case RESEND_MESSAGEGE_START:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: state.allMessages.map(function (m) {
          return index$3.compareIds(m.reqId, action.payload.reqId) ? action.payload : m;
        })
      });

    case MARK_AS_READ:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        unreadCount: 0,
        unreadSince: null
      });

    case ON_MESSAGE_DELETED:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: state.allMessages.filter(function (m) {
          return !index$3.compareIds(m.messageId, action.payload);
        })
      });

    case ON_MESSAGE_DELETED_BY_REQ_ID:
      return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
        allMessages: state.allMessages.filter(function (m) {
          return !index$3.compareIds(m.reqId, action.payload);
        })
      });

    case SET_EMOJI_CONTAINER:
      {
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          emojiContainer: action.payload
        });
      }

    case ON_REACTION_UPDATED:
      {
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(function (m) {
            if (index$3.compareIds(m.messageId, action.payload.messageId)) {
              if (m.applyReactionEvent && typeof m.applyReactionEvent === 'function') {
                m.applyReactionEvent(action.payload);
              }

              return m;
            }

            return m;
          })
        });
      }

    case MESSAGE_LIST_PARAMS_CHANGED:
      {
        return LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, state), {}, {
          messageListParams: action.payload
        });
      }

    default:
      return state;
  }
}

/**
 * Handles ChannelEvents and send values to dispatcher using messagesDispatcher
 * messagesDispatcher: Dispatcher
 * sdk: sdkInstance
 * logger: loggerInstance
 * channelUrl: string
 * sdkInit: bool
 */

function useHandleChannelEvents(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      sdkInit = _ref.sdkInit,
      hasMoreToBottom = _ref.hasMoreToBottom;
  var messagesDispatcher = _ref2.messagesDispatcher,
      sdk = _ref2.sdk,
      logger = _ref2.logger,
      scrollRef = _ref2.scrollRef;
  var channelUrl = currentGroupChannel && currentGroupChannel.url;
  React$1.useEffect(function () {
    var messageReceiverId = LocalizationContext.uuidv4();

    if (channelUrl && sdk && sdk.ChannelHandler) {
      var ChannelHandler = new sdk.ChannelHandler();
      logger.info('Channel | useHandleChannelEvents: Setup event handler', messageReceiverId);

      ChannelHandler.onMessageReceived = function (channel, message) {
        // donot update if hasMoreToBottom
        if (index$3.compareIds(channel.url, currentGroupChannel.url) && !hasMoreToBottom) {
          var scrollToEnd = false;

          try {
            var current = scrollRef.current;
            scrollToEnd = current.offsetHeight + current.scrollTop >= current.scrollHeight;
          } catch (error) {//
          }

          logger.info('Channel | useHandleChannelEvents: onMessageReceived', message);
          messagesDispatcher({
            type: ON_MESSAGE_RECEIVED,
            payload: {
              channel: channel,
              message: message,
              scrollToEnd: scrollToEnd
            }
          });

          if (scrollToEnd) {
            try {
              setTimeout(function () {
                currentGroupChannel.markAsRead();
                scrollIntoLast();
              });
            } catch (error) {
              logger.warning('Channel | onMessageReceived | scroll to end failed');
            }
          }
        }

        if (index$3.compareIds(channel.url, currentGroupChannel.url) && hasMoreToBottom) {
          messagesDispatcher({
            type: UPDATE_UNREAD_COUNT,
            payload: {
              channel: channel
            }
          });
        }
      };

      ChannelHandler.onMessageUpdated = function (channel, message) {
        logger.info('Channel | useHandleChannelEvents: onMessageUpdated', message);
        messagesDispatcher({
          type: ON_MESSAGE_UPDATED,
          payload: {
            channel: channel,
            message: message
          }
        });
      };

      ChannelHandler.onMessageDeleted = function (_, messageId) {
        logger.info('Channel | useHandleChannelEvents: onMessageDeleted', messageId);
        messagesDispatcher({
          type: ON_MESSAGE_DELETED,
          payload: messageId
        });
      };

      ChannelHandler.onReactionUpdated = function (_, reactionEvent) {
        logger.info('Channel | useHandleChannelEvents: onReactionUpdated', reactionEvent);
        messagesDispatcher({
          type: ON_REACTION_UPDATED,
          payload: reactionEvent
        });
      };

      ChannelHandler.onChannelChanged = function (groupChannel) {
        if (index$3.compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onChannelChanged', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onChannelFrozen = function (groupChannel) {
        if (index$3.compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onChannelFrozen', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onChannelUnfrozen = function (groupChannel) {
        if (index$3.compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onChannelUnFrozen', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserMuted = function (groupChannel) {
        if (index$3.compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onUserMuted', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserUnmuted = function (groupChannel) {
        if (index$3.compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onUserUnmuted', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserBanned = function (groupChannel) {
        if (index$3.compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onUserBanned', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onOperatorUpdated = function (groupChannel) {
        if (index$3.compareIds(groupChannel.url, currentGroupChannel.url)) {
          logger.info('Channel | useHandleChannelEvents: onOperatorUpdated', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      }; // Add this channel event handler to the SendBird object.


      sdk.addChannelHandler(messageReceiverId, ChannelHandler);
    }

    return function () {
      if (sdk && sdk.removeChannelHandler) {
        logger.info('Channel | useHandleChannelEvents: Removing message reciver handler', messageReceiverId);
        sdk.removeChannelHandler(messageReceiverId);
      }
    };
  }, [channelUrl, sdkInit]);
}

function useSetChannel(_ref, _ref2) {
  var channelUrl = _ref.channelUrl,
      sdkInit = _ref.sdkInit;
  var messagesDispatcher = _ref2.messagesDispatcher,
      sdk = _ref2.sdk,
      logger = _ref2.logger;
  React$1.useEffect(function () {
    if (channelUrl && sdkInit && sdk && sdk.GroupChannel) {
      logger.info('Channel | useSetChannel fetching channel', channelUrl);
      sdk.GroupChannel.getChannel(channelUrl).then(function (groupChannel) {
        logger.info('Channel | useSetChannel fetched channel', groupChannel);
        messagesDispatcher({
          type: SET_CURRENT_CHANNEL,
          payload: groupChannel
        });
        logger.info('Channel: Mark as read', groupChannel); // this order is important - this mark as read should update the event handler up above

        groupChannel.markAsRead();
      }).catch(function (e) {
        logger.warning('Channel | useSetChannel fetch channel failed', {
          channelUrl: channelUrl,
          e: e
        });
        messagesDispatcher({
          type: SET_CHANNEL_INVALID
        });
      });
      sdk.getAllEmoji(function (emojiContainer_, err) {
        if (err) {
          logger.error('Channel: Getting emojis failed', err);
          return;
        }

        logger.info('Channel: Getting emojis success', emojiContainer_);
        messagesDispatcher({
          type: SET_EMOJI_CONTAINER,
          payload: emojiContainer_
        });
      });
    }
  }, [channelUrl, sdkInit]);
}

var PREV_RESULT_SIZE = 30;
var NEXT_RESULT_SIZE = 10;

var getLatestMessageTimeStamp = function getLatestMessageTimeStamp() {
  var messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var latestMessage = messages[messages.length - 1];
  return latestMessage && latestMessage.createdAt || null;
};

function useInitialMessagesFetch(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      userFilledMessageListQuery = _ref.userFilledMessageListQuery,
      intialTimeStamp = _ref.intialTimeStamp;
  var sdk = _ref2.sdk,
      logger = _ref2.logger,
      messagesDispatcher = _ref2.messagesDispatcher;
  var channelUrl = currentGroupChannel && currentGroupChannel.url;
  React$1.useEffect(function () {
    logger.info('Channel useInitialMessagesFetch: Setup started', currentGroupChannel);
    messagesDispatcher({
      type: RESET_MESSAGES
    });

    if (sdk && sdk.MessageListParams && currentGroupChannel && currentGroupChannel.getMessagesByTimestamp) {
      var messageListParams = new sdk.MessageListParams();
      messageListParams.prevResultSize = PREV_RESULT_SIZE;
      messageListParams.isInclusive = true;
      messageListParams.includeReplies = false;
      messageListParams.includeReaction = true;
      messageListParams.includeMetaArray = true;

      if (userFilledMessageListQuery) {
        Object.keys(userFilledMessageListQuery).forEach(function (key) {
          messageListParams[key] = userFilledMessageListQuery[key];
        });
        logger.info('Channel useInitialMessagesFetch: Setup messageListParams', messageListParams);
        messagesDispatcher({
          type: MESSAGE_LIST_PARAMS_CHANGED,
          payload: messageListParams
        });
      }

      logger.info('Channel: Fetching messages', {
        currentGroupChannel: currentGroupChannel,
        userFilledMessageListQuery: userFilledMessageListQuery
      });
      messagesDispatcher({
        type: GET_PREV_MESSAGES_START
      });

      if (intialTimeStamp) {
        messageListParams.nextResultSize = NEXT_RESULT_SIZE;
        currentGroupChannel.getMessagesByTimestamp(intialTimeStamp, messageListParams).then(function (messages) {
          var hasMore = messages && messages.length > 0;
          var lastMessageTimeStamp = hasMore ? messages[0].createdAt : null;
          var latestFetchedMessageTimeStamp = getLatestMessageTimeStamp(messages); // to make sure there are no more messages below

          var nextMessageListParams = new sdk.MessageListParams();
          nextMessageListParams.nextResultSize = NEXT_RESULT_SIZE;
          currentGroupChannel.getMessagesByTimestamp(latestFetchedMessageTimeStamp || new Date().getTime(), nextMessageListParams).then(function (nextMessages) {
            messagesDispatcher({
              type: GET_PREV_MESSAGES_SUCESS,
              payload: {
                messages: messages,
                hasMore: hasMore,
                lastMessageTimeStamp: lastMessageTimeStamp,
                currentGroupChannel: currentGroupChannel,
                latestFetchedMessageTimeStamp: latestFetchedMessageTimeStamp,
                hasMoreToBottom: nextMessages && nextMessages.length > 0
              }
            });
          });
        }).catch(function (error) {
          logger.error('Channel: Fetching messages failed', error);
          messagesDispatcher({
            type: GET_PREV_MESSAGES_SUCESS,
            payload: {
              messages: [],
              hasMore: false,
              lastMessageTimeStamp: 0,
              currentGroupChannel: currentGroupChannel
            }
          });
        }).finally(function () {
          if (!intialTimeStamp) {
            setTimeout(function () {
              return scrollIntoLast();
            });
          }

          currentGroupChannel.markAsRead();
        });
      } else {
        currentGroupChannel.getMessagesByTimestamp(new Date().getTime(), messageListParams).then(function (messages) {
          var hasMore = messages && messages.length > 0;
          var lastMessageTimeStamp = hasMore ? messages[0].createdAt : null;
          var latestFetchedMessageTimeStamp = getLatestMessageTimeStamp(messages);
          messagesDispatcher({
            type: GET_PREV_MESSAGES_SUCESS,
            payload: {
              messages: messages,
              hasMore: hasMore,
              lastMessageTimeStamp: lastMessageTimeStamp,
              currentGroupChannel: currentGroupChannel,
              latestFetchedMessageTimeStamp: latestFetchedMessageTimeStamp,
              hasMoreToBottom: false
            }
          });
        }).catch(function (error) {
          logger.error('Channel: Fetching messages failed', error);
          messagesDispatcher({
            type: GET_PREV_MESSAGES_SUCESS,
            payload: {
              messages: [],
              hasMore: false,
              lastMessageTimeStamp: 0,
              currentGroupChannel: currentGroupChannel
            }
          });
        }).finally(function () {
          if (!intialTimeStamp) {
            setTimeout(function () {
              return scrollIntoLast();
            });
          }

          currentGroupChannel.markAsRead();
        });
      }
    }
  }, [channelUrl, userFilledMessageListQuery, intialTimeStamp]);
  /**
   * Note - useEffect(() => {}, [currentGroupChannel])
   * was buggy, that is why we did
   * const channelUrl = currentGroupChannel && currentGroupChannel.url;
   * useEffect(() => {}, [channelUrl])
   * Again, this hook is supposed to execute when currentGroupChannel changes
   * The 'channelUrl' here is not the same memory reference from Conversation.props
   */
}

function useHandleReconnect(_ref, _ref2) {
  var isOnline = _ref.isOnline;
  var logger = _ref2.logger,
      sdk = _ref2.sdk,
      currentGroupChannel = _ref2.currentGroupChannel,
      messagesDispatcher = _ref2.messagesDispatcher,
      userFilledMessageListQuery = _ref2.userFilledMessageListQuery;
  React$1.useEffect(function () {
    var wasOffline = !isOnline;
    return function () {
      // state changed from offline to online
      if (wasOffline) {
        logger.info('Refreshing conversation state');
        var _sdk$appInfo = sdk.appInfo,
            appInfo = _sdk$appInfo === void 0 ? {} : _sdk$appInfo;
        var useReaction = appInfo.isUsingReaction || false;
        var messageListParams = new sdk.MessageListParams();
        messageListParams.prevResultSize = 30;
        messageListParams.includeMetaArray = true;
        messageListParams.includeReplies = false;
        messageListParams.includeReaction = useReaction;

        if (userFilledMessageListQuery) {
          Object.keys(userFilledMessageListQuery).forEach(function (key) {
            messageListParams[key] = userFilledMessageListQuery[key];
          });
        }

        logger.info('Channel: Fetching messages', {
          currentGroupChannel: currentGroupChannel,
          userFilledMessageListQuery: userFilledMessageListQuery
        });
        messagesDispatcher({
          type: GET_PREV_MESSAGES_START
        });
        sdk.GroupChannel.getChannel(currentGroupChannel.url).then(function (groupChannel) {
          var lastMessageTime = new Date().getTime();
          groupChannel.getMessagesByTimestamp(lastMessageTime, messageListParams).then(function (messages) {
            messagesDispatcher({
              type: CLEAR_SENT_MESSAGES
            });
            var hasMore = messages && messages.length > 0;
            var lastMessageTimeStamp = hasMore ? messages[0].createdAt : null;
            messagesDispatcher({
              type: GET_PREV_MESSAGES_SUCESS,
              payload: {
                messages: messages,
                hasMore: hasMore,
                lastMessageTimeStamp: lastMessageTimeStamp,
                currentGroupChannel: currentGroupChannel
              }
            });
            setTimeout(function () {
              return scrollIntoLast();
            });
          }).catch(function (error) {
            logger.error('Channel: Fetching messages failed', error);
          }).finally(function () {
            currentGroupChannel.markAsRead();
          });
        });
      }
    };
  }, [isOnline]);
}

function useScrollCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      lastMessageTimeStamp = _ref.lastMessageTimeStamp,
      userFilledMessageListQuery = _ref.userFilledMessageListQuery;
  var hasMore = _ref2.hasMore,
      logger = _ref2.logger,
      messagesDispatcher = _ref2.messagesDispatcher,
      sdk = _ref2.sdk;
  return React$1.useCallback(function (cb) {
    if (!hasMore) {
      return;
    }

    var messageListParams = new sdk.MessageListParams();
    messageListParams.prevResultSize = 30;
    messageListParams.includeMetaArray = true;
    messageListParams.includeReplies = false;
    messageListParams.includeReaction = true;

    if (userFilledMessageListQuery) {
      Object.keys(userFilledMessageListQuery).forEach(function (key) {
        messageListParams[key] = userFilledMessageListQuery[key];
      });
    }

    logger.info('Channel: Fetching messages', {
      currentGroupChannel: currentGroupChannel,
      userFilledMessageListQuery: userFilledMessageListQuery
    });
    currentGroupChannel.getMessagesByTimestamp(lastMessageTimeStamp || new Date().getTime(), messageListParams).then(function (messages) {
      var hasMoreMessages = messages && messages.length > 0;
      var lastMessageTs = hasMoreMessages ? messages[0].createdAt : null;
      messagesDispatcher({
        type: GET_PREV_MESSAGES_SUCESS,
        payload: {
          messages: messages,
          hasMore: hasMoreMessages,
          lastMessageTimeStamp: lastMessageTs,
          currentGroupChannel: currentGroupChannel
        }
      });
      cb([messages, null]);
    }).catch(function (error) {
      logger.error('Channel: Fetching messages failed', error);
      messagesDispatcher({
        type: GET_PREV_MESSAGES_SUCESS,
        payload: {
          messages: [],
          hasMore: false,
          lastMessageTimeStamp: 0,
          currentGroupChannel: currentGroupChannel
        }
      });
      cb([null, error]);
    }).finally(function () {
      currentGroupChannel.markAsRead();
    });
  }, [currentGroupChannel, lastMessageTimeStamp]);
}

var RESULT_SIZE = 30;

function useScrollDownCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      latestFetchedMessageTimeStamp = _ref.latestFetchedMessageTimeStamp,
      userFilledMessageListQuery = _ref.userFilledMessageListQuery,
      hasMoreToBottom = _ref.hasMoreToBottom;
  var logger = _ref2.logger,
      messagesDispatcher = _ref2.messagesDispatcher,
      sdk = _ref2.sdk;
  return React$1.useCallback(function (cb) {
    if (!hasMoreToBottom) {
      return;
    }

    var messageListParams = new sdk.MessageListParams();
    messageListParams.nextResultSize = RESULT_SIZE;
    messageListParams.includeMetaArray = true;
    messageListParams.includeReplies = false;
    messageListParams.includeReaction = true;

    if (userFilledMessageListQuery) {
      Object.keys(userFilledMessageListQuery).forEach(function (key) {
        messageListParams[key] = userFilledMessageListQuery[key];
      });
    }

    logger.info('Channel: Fetching later messages', {
      currentGroupChannel: currentGroupChannel,
      userFilledMessageListQuery: userFilledMessageListQuery
    });
    currentGroupChannel.getMessagesByTimestamp(latestFetchedMessageTimeStamp || new Date().getTime(), messageListParams).then(function (messages) {
      var messagesLength = messages && messages.length || 0;
      var hasMoreMessages = messagesLength > 0 && messageListParams.nextResultSize === messagesLength;
      var lastMessageTs = hasMoreMessages ? messages[messages.length - 1].createdAt : null;
      messagesDispatcher({
        type: GET_NEXT_MESSAGES_SUCESS,
        payload: {
          messages: messages,
          hasMoreToBottom: hasMoreMessages,
          latestFetchedMessageTimeStamp: lastMessageTs,
          currentGroupChannel: currentGroupChannel
        }
      });
      cb([messages, null]);
    }).catch(function (error) {
      logger.error('Channel: Fetching later messages failed', error);
      messagesDispatcher({
        type: GET_NEXT_MESSAGES_FAILURE,
        payload: {
          messages: [],
          hasMoreToBottom: false,
          latestFetchedMessageTimeStamp: 0,
          currentGroupChannel: currentGroupChannel
        }
      });
      cb([null, error]);
    }).finally(function () {
      currentGroupChannel.markAsRead();
    });
  }, [currentGroupChannel, latestFetchedMessageTimeStamp, hasMoreToBottom]);
}

function useDeleteMessageCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      messagesDispatcher = _ref.messagesDispatcher;
  var logger = _ref2.logger;
  return React$1.useCallback(function (message, cb) {
    logger.info('Channel | useDeleteMessageCallback: Deleting message', message);
    var requestState = message.requestState;
    logger.info('Channel | useDeleteMessageCallback: Deleting message requestState:', requestState); // Message is only on local

    if (requestState === 'failed' || requestState === 'pending') {
      logger.info('Channel | useDeleteMessageCallback: Deleted message from local:', message);
      messagesDispatcher({
        type: ON_MESSAGE_DELETED_BY_REQ_ID,
        payload: message.reqId
      });

      if (cb) {
        cb();
      }

      return;
    } // Message is on server


    currentGroupChannel.deleteMessage(message, function (err) {
      logger.info('Channel | useDeleteMessageCallback: Deleting message from remote:', requestState);

      if (cb) {
        cb(err);
      }

      if (!err) {
        logger.info('Channel | useDeleteMessageCallback: Deleting message success!', message);
        messagesDispatcher({
          type: ON_MESSAGE_DELETED,
          payload: message.messageId
        });
      } else {
        logger.warning('Channel | useDeleteMessageCallback: Deleting message failed!', err);
      }
    });
  }, [currentGroupChannel, messagesDispatcher]);
}

function useUpdateMessageCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      messagesDispatcher = _ref.messagesDispatcher,
      onBeforeUpdateUserMessage = _ref.onBeforeUpdateUserMessage;
  var logger = _ref2.logger,
      pubSub = _ref2.pubSub,
      sdk = _ref2.sdk;
  return React$1.useCallback(function (messageId, text, cb) {
    var createParamsDefault = function createParamsDefault(txt) {
      var params = new sdk.UserMessageParams();
      params.message = txt;
      return params;
    };

    var createCustomPrams = onBeforeUpdateUserMessage && typeof onBeforeUpdateUserMessage === 'function';

    if (createCustomPrams) {
      logger.info('Channel: creating params using onBeforeUpdateUserMessage', onBeforeUpdateUserMessage);
    }

    var params = onBeforeUpdateUserMessage ? onBeforeUpdateUserMessage(text) : createParamsDefault(text);
    currentGroupChannel.updateUserMessage(messageId, params, function (r, e) {
      logger.info('Channel: Updating message!', params);
      var swapParams = sdk.getErrorFirstCallback();
      var message = r;
      var err = e;

      if (swapParams) {
        message = e;
        err = r;
      }

      if (cb) {
        cb(err, message);
      }

      if (!err) {
        logger.info('Channel: Updating message success!', message);
        messagesDispatcher({
          type: ON_MESSAGE_UPDATED,
          payload: {
            channel: currentGroupChannel,
            message: message
          }
        });
        pubSub.publish(index$1.UPDATE_USER_MESSAGE, {
          message: message,
          channel: currentGroupChannel
        });
      } else {
        logger.warning('Channel: Updating message failed!', err);
      }
    });
  }, [currentGroupChannel.url, messagesDispatcher, onBeforeUpdateUserMessage]);
}

function useResendMessageCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      messagesDispatcher = _ref.messagesDispatcher;
  var logger = _ref2.logger;
  return React$1.useCallback(function (failedMessage) {
    logger.info('Channel: Resending message has started', failedMessage);
    var messageType = failedMessage.messageType,
        file = failedMessage.file;

    if (failedMessage && typeof failedMessage.isResendable === 'function' && failedMessage.isResendable()) {
      // eslint-disable-next-line no-param-reassign
      failedMessage.requestState = 'pending';
      messagesDispatcher({
        type: RESEND_MESSAGEGE_START,
        payload: failedMessage
      }); // userMessage

      if (messageType === 'user') {
        currentGroupChannel.resendUserMessage(failedMessage).then(function (message) {
          logger.info('Channel: Resending message success!', {
            message: message
          });
          messagesDispatcher({
            type: SEND_MESSAGEGE_SUCESS,
            payload: message
          });
        }).catch(function (e) {
          logger.warning('Channel: Resending message failed!', {
            e: e
          }); // eslint-disable-next-line no-param-reassign

          failedMessage.requestState = 'failed';
          messagesDispatcher({
            type: SEND_MESSAGEGE_FAILURE,
            payload: failedMessage
          });
        }); // eslint-disable-next-line no-param-reassign

        failedMessage.requestState = 'pending';
        messagesDispatcher({
          type: RESEND_MESSAGEGE_START,
          payload: failedMessage
        });
        return;
      }

      if (messageType === 'file') {
        currentGroupChannel.resendFileMessage(failedMessage, file).then(function (message) {
          logger.info('Channel: Resending file message success!', {
            message: message
          });
          messagesDispatcher({
            type: SEND_MESSAGEGE_SUCESS,
            payload: message
          });
        }).catch(function (e) {
          logger.warning('Channel: Resending file message failed!', {
            e: e
          }); // eslint-disable-next-line no-param-reassign

          failedMessage.requestState = 'failed';
          messagesDispatcher({
            type: SEND_MESSAGEGE_FAILURE,
            payload: failedMessage
          });
        }); // eslint-disable-next-line no-param-reassign

        failedMessage.requestState = 'pending';
        messagesDispatcher({
          type: RESEND_MESSAGEGE_START,
          payload: failedMessage
        });
      }
    } else {
      // to alert user on console
      // eslint-disable-next-line no-console
      console.error('Message is not resendable');
      logger.warning('Message is not resendable', failedMessage);
    }
  }, [currentGroupChannel, messagesDispatcher]);
}

function useSendMessageCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      onBeforeSendUserMessage = _ref.onBeforeSendUserMessage;
  var sdk = _ref2.sdk,
      logger = _ref2.logger,
      pubSub = _ref2.pubSub,
      messagesDispatcher = _ref2.messagesDispatcher;
  var messageInputRef = React$1.useRef(null);
  var sendMessage = React$1.useCallback(function (repliedMessage) {
    var text = messageInputRef.current.value;

    var createParamsDefault = function createParamsDefault(txt) {
      var message = typeof txt === 'string' ? txt.trim() : txt;
      var params = new sdk.UserMessageParams();
      params.message = message;
      return params;
    };

    var createCustomPrams = onBeforeSendUserMessage && typeof onBeforeSendUserMessage === 'function';

    if (createCustomPrams) {
      logger.info('Channel: creating params using onBeforeSendUserMessage', onBeforeSendUserMessage);
    }

    var params = onBeforeSendUserMessage ? onBeforeSendUserMessage(text) : createParamsDefault(text);

    if (repliedMessage) {
      params.metaArrays = [].concat(LocalizationContext._toConsumableArray(params.metaArrays), LocalizationContext._toConsumableArray(index$1.repliedMessageToMetaArrays(sdk, repliedMessage)));
      params.message = index$1.repliedMessageToFormatedString({
        originalMessage: text,
        parentMessageBody: repliedMessage.parentMessageBody,
        parentMessageNickname: repliedMessage.parentMessageNickname
      });
    }

    logger.info('Channel: Sending message has started', params);
    var pendingMsg = currentGroupChannel.sendUserMessage(params, function (res, err) {
      var swapParams = sdk.getErrorFirstCallback();
      var message = res;
      var error = err;

      if (swapParams) {
        message = err;
        error = res;
      } // sending params instead of pending message
      // to make sure that we can resend the message once it fails


      if (error) {
        logger.warning('Channel: Sending message failed!', {
          message: message
        });
        messagesDispatcher({
          type: SEND_MESSAGEGE_FAILURE,
          payload: message
        });
        return;
      }

      logger.info('Channel: Sending message success!', message);
      messagesDispatcher({
        type: SEND_MESSAGEGE_SUCESS,
        payload: message
      });
    });
    pubSub.publish(index$1.SEND_MESSAGE_START, {
      /* pubSub is used instead of messagesDispatcher
        to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
      message: pendingMsg,
      channel: currentGroupChannel
    });
    setTimeout(function () {
      return scrollIntoLast();
    });
  }, [currentGroupChannel, onBeforeSendUserMessage]);
  return [messageInputRef, sendMessage];
}

function useSendFileMessageCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      onBeforeSendFileMessage = _ref.onBeforeSendFileMessage,
      _ref$imageCompression = _ref.imageCompression,
      imageCompression = _ref$imageCompression === void 0 ? {} : _ref$imageCompression;
  var sdk = _ref2.sdk,
      logger = _ref2.logger,
      pubSub = _ref2.pubSub,
      messagesDispatcher = _ref2.messagesDispatcher;
  var sendMessage = React$1.useCallback(function (file, repliedMessage) {
    var compressionRate = imageCompression.compressionRate,
        resizingWidth = imageCompression.resizingWidth,
        resizingHeight = imageCompression.resizingHeight;
    var createCustomParams = onBeforeSendFileMessage && typeof onBeforeSendFileMessage === 'function';
    var compressibleFileType = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg';
    var compressibleRatio = compressionRate > 0 && compressionRate < 1; // pxToNumber returns null if values are invalid

    var compressibleDiamensions = pxToNumber(resizingWidth) || pxToNumber(resizingHeight);
    var canCompressImage = compressibleFileType && (compressibleRatio || compressibleDiamensions);

    var createParamsDefault = function createParamsDefault(file_) {
      var params = new sdk.FileMessageParams();
      params.file = file_;
      return params;
    };

    if (canCompressImage) {
      // Using image compression
      try {
        var image = document.createElement('img');
        image.src = URL.createObjectURL(file);

        image.onload = function () {
          URL.revokeObjectURL(image.src);
          var canvas = document.createElement('canvas');
          var imageWdith = image.naturalWidth || image.width;
          var imageHeight = image.naturalHeight || image.height;
          var targetWidth = pxToNumber(resizingWidth) || imageWdith;
          var targetHeight = pxToNumber(resizingHeight) || imageHeight; // In canvas.toBlob(callback, mimeType, qualityArgument)
          // qualityArgument doesnt work
          // so in case compressibleDiamensions are not present, we use ratio

          if (file.type === 'image/png' && !compressibleDiamensions) {
            targetWidth *= compressionRate;
            targetHeight *= compressionRate;
          }

          canvas.width = targetWidth;
          canvas.height = targetHeight;
          var context = canvas.getContext('2d');
          context.drawImage(image, 0, 0, targetWidth, targetHeight);
          context.canvas.toBlob(function (newImageBlob) {
            var compressedFile = new File([newImageBlob], file.name, {
              type: file.type
            });

            if (createCustomParams) {
              logger.info('Channel: Creating params using onBeforeSendFileMessage', onBeforeSendFileMessage);
            }

            var params = createCustomParams ? onBeforeSendFileMessage(compressedFile) : createParamsDefault(compressedFile); // Add meta arrays param for replied message

            if (repliedMessage) {
              params.metaArrays = [].concat(LocalizationContext._toConsumableArray(params.metaArrays), LocalizationContext._toConsumableArray(index$1.repliedMessageToMetaArrays(sdk, repliedMessage)));
            }

            logger.info('Channel: Uploading file message start!', params);
            var pendingMessage = currentGroupChannel.sendFileMessage(params, function (response, err) {
              var swapParams = sdk.getErrorFirstCallback();

              var _ref3 = swapParams ? [err, response] : [response, err],
                  _ref4 = LocalizationContext._slicedToArray(_ref3, 2),
                  message = _ref4[0],
                  error = _ref4[1];

              if (error) {
                // sending params instead of pending message
                // to make sure that we can resend the message once it fails
                logger.error('Channel: Sending file message failed!', {
                  message: message,
                  error: error
                });
                message.localUrl = URL.createObjectURL(compressedFile);
                message.file = compressedFile;
                messagesDispatcher({
                  type: SEND_MESSAGEGE_FAILURE,
                  payload: message
                });
                return;
              }

              logger.info('Channel: Sending file message success!', message);
              messagesDispatcher({
                type: SEND_MESSAGEGE_SUCESS,
                payload: message
              });
            });
            pubSub.publish(index$1.SEND_MESSAGE_START, {
              /* pubSub is used instead of messagesDispatcher
              to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
              message: LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, pendingMessage), {}, {
                url: URL.createObjectURL(compressedFile),
                // pending thumbnail message seems to be failed
                requestState: 'pending'
              }),
              channel: currentGroupChannel
            });
            setTimeout(function () {
              return scrollIntoLast();
            }, 1000);
          }, file.type, compressionRate);
        };
      } catch (error) {
        logger.error('Channel: Sending file message failed!', error);
      }
    } else {
      // Not using image compression
      if (createCustomParams) {
        logger.info('Channel: creating params using onBeforeSendFileMessage', onBeforeSendFileMessage);
      }

      var params = onBeforeSendFileMessage ? onBeforeSendFileMessage(file) : createParamsDefault(file); // Add meta arrays param for replied message

      if (repliedMessage) {
        params.metaArrays = [].concat(LocalizationContext._toConsumableArray(params.metaArrays), LocalizationContext._toConsumableArray(index$1.repliedMessageToMetaArrays(sdk, repliedMessage)));
      }

      logger.info('Channel: Uploading file message start!', params);
      var pendingMsg = currentGroupChannel.sendFileMessage(params, function (response, err) {
        var swapParams = sdk.getErrorFirstCallback();

        var _ref5 = swapParams ? [err, response] : [response, err],
            _ref6 = LocalizationContext._slicedToArray(_ref5, 2),
            message = _ref6[0],
            error = _ref6[1];

        if (error) {
          // sending params instead of pending message
          // to make sure that we can resend the message once it fails
          logger.error('Channel: Sending file message failed!', {
            message: message,
            error: error
          });
          message.localUrl = URL.createObjectURL(file);
          message.file = file;
          messagesDispatcher({
            type: SEND_MESSAGEGE_FAILURE,
            payload: message
          });
          return;
        }

        logger.info('Channel: Sending message success!', message);
        messagesDispatcher({
          type: SEND_MESSAGEGE_SUCESS,
          payload: message
        });
      });
      pubSub.publish(index$1.SEND_MESSAGE_START, {
        /* pubSub is used instead of messagesDispatcher
        to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
        message: LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, pendingMsg), {}, {
          url: URL.createObjectURL(file),
          // pending thumbnail message seems to be failed
          requestState: 'pending'
        }),
        channel: currentGroupChannel
      });
      setTimeout(function () {
        return scrollIntoLast();
      }, 1000);
    }
  }, [currentGroupChannel, onBeforeSendFileMessage, imageCompression]);
  return [sendMessage];
}

function useMemoizedEmojiListItems(_ref, _ref2) {
  var emojiContainer = _ref.emojiContainer,
      toggleReaction = _ref.toggleReaction;
  var useReaction = _ref2.useReaction,
      logger = _ref2.logger,
      userId = _ref2.userId,
      emojiAllList = _ref2.emojiAllList;

  /* eslint-disable react/prop-types */
  return React$1.useMemo(function () {
    return function (_ref3) {
      var parentRef = _ref3.parentRef,
          parentContainRef = _ref3.parentContainRef,
          message = _ref3.message,
          closeDropdown = _ref3.closeDropdown,
          _ref3$spaceFromTrigge = _ref3.spaceFromTrigger,
          spaceFromTrigger = _ref3$spaceFromTrigge === void 0 ? {} : _ref3$spaceFromTrigge;

      if (!useReaction || !(parentRef || parentContainRef || message || closeDropdown)) {
        logger.warning('Channel: Invalid Params in memoizedEmojiListItems');
        return null;
      }

      return /*#__PURE__*/React__default$1["default"].createElement(index$1.EmojiListItems, {
        parentRef: parentRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: spaceFromTrigger
      }, emojiAllList.map(function (emoji) {
        var reactedReaction = message.reactions.filter(function (reaction) {
          return reaction.key === emoji.key;
        })[0];
        var isReacted = reactedReaction ? !(reactedReaction.userIds.indexOf(userId) < 0) : false;
        return /*#__PURE__*/React__default$1["default"].createElement(Channel.ReactionButton, {
          key: emoji.key,
          width: "36px",
          height: "36px",
          selected: isReacted,
          onClick: function onClick() {
            closeDropdown();
            toggleReaction(message, emoji.key, isReacted);
          }
        }, /*#__PURE__*/React__default$1["default"].createElement(index$2.ImageRenderer, {
          url: emoji.url,
          width: "28px",
          height: "28px",
          defaultComponent: /*#__PURE__*/React__default$1["default"].createElement(index$2.Icon, {
            width: "28px",
            height: "28px",
            type: index$2.IconTypes.QUESTION
          })
        }));
      }));
    };
  }, [emojiContainer, toggleReaction]);
}

function useToggleReactionCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel;
  var logger = _ref2.logger;
  return React$1.useCallback(function (message, key, isReacted) {
    if (isReacted) {
      currentGroupChannel.deleteReaction(message, key).then(function (res) {
        logger.info('Delete reaction success', res);
      }).catch(function (err) {
        logger.warning('Delete reaction failed', err);
      });
      return;
    }

    currentGroupChannel.addReaction(message, key).then(function (res) {
      logger.info('Add reaction success', res);
    }).catch(function (err) {
      logger.warning('Add reaction failed', err);
    });
  }, [currentGroupChannel]);
}

function useScrollToMessage(_a, _b) {
  var setIntialTimeStamp = _a.setIntialTimeStamp,
      setHighLightedMessageId = _a.setHighLightedMessageId,
      allMessages = _a.allMessages;
  var logger = _b.logger;
  return React$1.useCallback(function (createdAt, messageId) {
    var isPresent = allMessages.find(function (m) {
      return m.messageId === messageId;
    });
    setHighLightedMessageId(null);
    setTimeout(function () {
      if (isPresent) {
        logger.info('Channel: scroll to message - message is present');
        setHighLightedMessageId(messageId);
      } else {
        logger.info('Channel: scroll to message - fetching older messages');
        setIntialTimeStamp(null);
        setIntialTimeStamp(createdAt);
        setHighLightedMessageId(messageId);
      }
    });
  }, [setIntialTimeStamp, setHighLightedMessageId, allMessages]);
}

var Typography = {
  H_1: 'H_1',
  H_2: 'H_2',
  H_3: 'H_3',
  SUBTITLE_1: 'SUBTITLE_1',
  SUBTITLE_2: 'SUBTITLE_2',
  BODY_1: 'BODY_1',
  BODY_2: 'BODY_2',
  BODY_3: 'BODY_3',
  BUTTON_1: 'BUTTON_1',
  BUTTON_2: 'BUTTON_2',
  CAPTION_1: 'CAPTION_1',
  CAPTION_2: 'CAPTION_2',
  CAPTION_3: 'CAPTION_3',
  TYPING_INDICATOR: 'TYPING_INDICATOR'
};
var Colors$1 = {
  ONBACKGROUND_1: 'ONBACKGROUND_1',
  ONBACKGROUND_2: 'ONBACKGROUND_2',
  ONBACKGROUND_3: 'ONBACKGROUND_3',
  ONBACKGROUND_4: 'ONBACKGROUND_4',
  ONBACKGROUND_5: 'ONBACKGROUND_5',
  ONCONTENT_1: 'ONCONTENT_1',
  ONCONTENT_2: 'ONCONTENT_2',
  PRIMARY: 'PRIMARY',
  ERROR: 'ERROR',
  SECONDARY_3: 'SECONDARY_3'
};

function changeTypographyToClassName(type) {
  switch (type) {
    case Typography.H_1:
      return 'sendbird-label--h-1';

    case Typography.H_2:
      return 'sendbird-label--h-2';

    case Typography.H_3:
      return 'rogu-label--h-3';

    case Typography.SUBTITLE_1:
      return 'sendbird-label--subtitle-1';

    case Typography.SUBTITLE_2:
      return 'sendbird-label--subtitle-2';

    case Typography.BODY_1:
      return 'sendbird-label--body-1';

    case Typography.BODY_2:
      return 'sendbird-label--body-2';

    case Typography.BODY_3:
      return 'rogu-label--body-3';

    case Typography.BUTTON_1:
      return 'sendbird-label--button-1';

    case Typography.BUTTON_2:
      return 'sendbird-label--button-2';

    case Typography.CAPTION_1:
      return 'sendbird-label--caption-1';

    case Typography.CAPTION_2:
      return 'sendbird-label--caption-2';

    case Typography.CAPTION_3:
      return 'sendbird-label--caption-3';

    case Typography.TYPING_INDICATOR:
      return 'sendbird-label--typing-indicator';

    default:
      return null;
  }
}
function changeColorToClassName$1(color) {
  switch (color) {
    case Colors$1.ONBACKGROUND_1:
      return 'sendbird-label--color-onbackground-1';

    case Colors$1.ONBACKGROUND_2:
      return 'sendbird-label--color-onbackground-2';

    case Colors$1.ONBACKGROUND_3:
      return 'sendbird-label--color-onbackground-3';

    case Colors$1.ONBACKGROUND_4:
      return 'sendbird-label--color-onbackground-4';

    case Colors$1.ONBACKGROUND_5:
      return 'rogu-label--color-onbackground-5';

    case Colors$1.ONCONTENT_1:
      return 'sendbird-label--color-oncontent-1';

    case Colors$1.ONCONTENT_2:
      return 'sendbird-label--color-oncontent-2';

    case Colors$1.PRIMARY:
      return 'sendbird-label--color-primary';
    // should be Primary-3 fix me

    case Colors$1.ERROR:
      return 'sendbird-label--color-error';

    case Colors$1.SECONDARY_3:
      return 'sendbird-label--color-secondary-3';

    default:
      return null;
  }
}

function Label(_ref) {
  var children = _ref.children,
      className = _ref.className,
      color = _ref.color,
      style = _ref.style,
      type = _ref.type;
  return /*#__PURE__*/React__default$1["default"].createElement("span", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-label', type ? changeTypographyToClassName(type) : '', color ? changeColorToClassName$1(color) : '']).join(' '),
    style: style
  }, children);
}
Label.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  type: PropTypes__default["default"].oneOf([].concat(LocalizationContext._toConsumableArray(Object.keys(Typography)), [''])),
  color: PropTypes__default["default"].oneOf([].concat(LocalizationContext._toConsumableArray(Object.keys(Colors$1)), [''])),
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number, PropTypes__default["default"].element, PropTypes__default["default"].any]),
  style: PropTypes__default["default"].object
};
Label.defaultProps = {
  className: [],
  type: '',
  color: '',
  children: null,
  style: undefined
};
var LabelTypography = Typography;
var LabelColors = Colors$1;

var Type$1 = {
  ADD: 'ADD',
  ARROW_LEFT: 'ARROW_LEFT',
  ATTACH: 'ATTACH',
  BAN: 'BAN',
  BROADCAST: 'BROADCAST',
  CAMERA: 'CAMERA',
  CHANNELS: 'CHANNELS',
  CHAT: 'CHAT',
  CHAT_FILLED: 'CHAT_FILLED',
  CHEVRON_DOWN: 'CHEVRON_DOWN',
  CHEVRON_RIGHT: 'CHEVRON_RIGHT',
  CLOSE: 'CLOSE',
  COLLAPSE: 'COLLAPSE',
  COPY: 'COPY',
  CREATE: 'CREATE',
  DELETE: 'DELETE',
  DISCONNECTED: 'DISCONNECTED',
  DOCUMENT: 'DOCUMENT',
  DONE: 'DONE',
  DONE_ALL: 'DONE_ALL',
  DOWNLOAD: 'DOWNLOAD',
  EDIT: 'EDIT',
  EMOJI_MORE: 'EMOJI_MORE',
  ERROR: 'ERROR',
  EXPAND: 'EXPAND',
  FILE_AUDIO: 'FILE_AUDIO',
  FILE_DOCUMENT: 'FILE_DOCUMENT',
  FREEZE: 'FREEZE',
  GIF: 'GIF',
  INFO: 'INFO',
  LEAVE: 'LEAVE',
  MEMBERS: 'MEMBERS',
  MESSAGE: 'MESSAGE',
  MODERATIONS: 'MODERATIONS',
  MORE: 'MORE',
  MUTE: 'MUTE',
  NOTIFICATIONS: 'NOTIFICATIONS',
  NOTIFICATIONS_OFF_FILLED: 'NOTIFICATIONS_OFF_FILLED',
  OPERATOR: 'OPERATOR',
  PHOTO: 'PHOTO',
  PLAY: 'PLAY',
  PLUS: 'PLUS',
  QUESTION: 'QUESTION',
  REFRESH: 'REFRESH',
  REPLY: 'REPLY',
  REMOVE: 'REMOVE',
  SEARCH: 'SEARCH',
  SEND: 'SEND',
  SETTINGS_FILLED: 'SETTINGS_FILLED',
  SPINNER: 'SPINNER',
  SUPERGROUP: 'SUPERGROUP',
  THUMBNAIL_NONE: 'THUMBNAIL_NONE',
  TOGGLE_OFF: 'TOGGLE_OFF',
  TOGGLE_ON: 'TOGGLE_ON',
  USER: 'USER',
  ROGU_PENDING: 'ROGU_PENDING',
  ROGU_SENT: 'ROGU_SENT',
  ROGU_READ_ALL: 'ROGU_READ_ALL',
  ROGU_ERROR: 'ROGU_ERROR',
  ROGU_COPY: 'ROGU_COPY',
  ROGU_REPLY: 'ROGU_REPLY',
  ROGU_RESEND: 'ROGU_RESEND',
  ROGU_CLOSE: 'ROGU_CLOSE',
  ROGU_DOWNLOAD: 'ROGU_DOWNLOAD',
  ROGU_DELETE: 'ROGU_DELETE',
  ROGU_ASSIGNMENT: 'ROGU_ASSIGNMENT',
  ROGU_MATERIAL: 'ROGU_MATERIAL',
  ROGU_FILE_OTHERS: 'ROGU_FILE_OTHERS',
  ROGU_FILE_WORD: 'ROGU_FILE_WORD',
  ROGU_FILE_EXCEL: 'ROGU_FILE_EXCEL',
  ROGU_FILE_PDF: 'ROGU_FILE_PDF',
  ROGU_FILE_POWERPOINT: 'ROGU_FILE_POWERPOINT',
  ROGU_VIEW: 'ROGU_VIEW',
  ROGU_SEND: 'ROGU_SEND',
  ROGU_IMAGE: 'ROGU_IMAGE',
  ROGU_VIDEO: 'ROGU_VIDEO'
};

var _path$j;

function _extends$k() { _extends$k = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$k.apply(this, arguments); }

function SvgRoguIconMsgFailed(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$k({
    width: 18,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$j || (_path$j = /*#__PURE__*/React__namespace.createElement("path", {
    className: "rogu-icon-msg-failed_svg__fill",
    d: "M8.25 11.25h1.5v1.5h-1.5v-1.5zm0-6h1.5v4.5h-1.5v-4.5zm.742-3.75C4.853 1.5 1.5 4.86 1.5 9c0 4.14 3.353 7.5 7.492 7.5 4.148 0 7.508-3.36 7.508-7.5 0-4.14-3.36-7.5-7.508-7.5zM9 15c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6z",
    fill: "currentColor"
  })));
}

var _circle, _circle2, _circle3, _circle4;

function _extends$j() { _extends$j = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$j.apply(this, arguments); }

function SvgRoguIconMsgPending(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$j({
    width: 18,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _circle || (_circle = /*#__PURE__*/React__namespace.createElement("circle", {
    cx: 4,
    cy: 7,
    r: 1,
    fill: "#BEC8D0"
  })), _circle2 || (_circle2 = /*#__PURE__*/React__namespace.createElement("circle", {
    cx: 7,
    cy: 7,
    r: 1,
    fill: "#BEC8D0"
  })), _circle3 || (_circle3 = /*#__PURE__*/React__namespace.createElement("circle", {
    cx: 10,
    cy: 7,
    r: 1,
    fill: "#BEC8D0"
  })), _circle4 || (_circle4 = /*#__PURE__*/React__namespace.createElement("circle", {
    cx: 7,
    cy: 7,
    r: 6.5,
    stroke: "#BEC8D0"
  })));
}

var _path$i;

function _extends$i() { _extends$i = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$i.apply(this, arguments); }

function SvgRoguIconMsgSent(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$i({
    width: 18,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$i || (_path$i = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M13.5 5.25l-1.058-1.058-4.755 4.755 1.057 1.058L13.5 5.25zm3.18-1.058l-7.936 7.935L5.61 9l-1.057 1.057 4.192 4.193 9-9-1.065-1.058zM.306 10.057l4.192 4.193 1.058-1.058L1.372 9 .307 10.057z",
    fill: "#BEC8D0"
  })));
}

var _path$h;

function _extends$h() { _extends$h = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$h.apply(this, arguments); }

function SvgRoguIconMsgReadAll(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$h({
    width: 18,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$h || (_path$h = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M13.5 5.25l-1.058-1.058-4.755 4.755 1.057 1.058L13.5 5.25zm3.18-1.058l-7.936 7.935L5.61 9l-1.057 1.057 4.192 4.193 9-9-1.065-1.058zM.306 10.057l4.192 4.193 1.058-1.058L1.372 9 .307 10.057z",
    fill: "#2EB5C0"
  })));
}

var _rect, _path$g;

function _extends$g() { _extends$g = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$g.apply(this, arguments); }

function SvgRoguIconCopy(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$g({
    width: 24,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _rect || (_rect = /*#__PURE__*/React__namespace.createElement("rect", {
    x: 3,
    y: 8,
    width: 11,
    height: 13,
    rx: 2,
    fill: "#434856"
  })), _path$g || (_path$g = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11 3a2 2 0 00-2 2v2h4a2 2 0 012 2v8h4a2 2 0 002-2V5a2 2 0 00-2-2h-8z",
    fill: "#434856"
  })));
}

var _path$f, _path2$7;

function _extends$f() { _extends$f = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$f.apply(this, arguments); }

function SvgRoguIconReply(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$f({
    width: 24,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$f || (_path$f = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 3L2.605 8.673c-.826.733-.826 1.921 0 2.654L8.999 17V3z",
    fill: "#434856"
  })), _path2$7 || (_path2$7 = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M22 20C22 9.5 12.762 6.359 9 6v8c7.035 0 11.746 3.846 13 6z",
    fill: "#434856"
  })));
}

var _path$e;

function _extends$e() { _extends$e = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$e.apply(this, arguments); }

function SvgRoguIconResend(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$e({
    width: 24,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$e || (_path$e = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M19.802 4.865a.641.641 0 00-.468-.198.641.641 0 00-.47.198l-1.353 1.344a8.07 8.07 0 00-2.552-1.63A7.862 7.862 0 0012 4c-1.91 0-3.576.578-5 1.735C5.576 6.89 4.64 8.399 4.187 10.26v.073c0 .09.033.168.1.234a.32.32 0 00.234.099h2.073c.153 0 .257-.08.312-.24.292-.694.476-1.1.552-1.218a5.251 5.251 0 011.938-1.865A5.242 5.242 0 0112 6.667c1.396 0 2.608.475 3.636 1.427L14.198 9.53a.642.642 0 00-.198.47c0 .18.066.336.198.468a.641.641 0 00.469.198h4.667a.64.64 0 00.468-.198A.64.64 0 0020 10V5.333a.64.64 0 00-.198-.468zM19.406 13.333h-2c-.153 0-.257.08-.312.24-.292.694-.476 1.1-.552 1.219a5.256 5.256 0 01-1.938 1.864 5.241 5.241 0 01-2.604.677 5.2 5.2 0 01-1.948-.374 5.379 5.379 0 01-1.677-1.063l1.427-1.427a.64.64 0 00.198-.47.64.64 0 00-.198-.468.64.64 0 00-.468-.198H4.667a.64.64 0 00-.47.198A.64.64 0 004 14v4.667c0 .18.066.336.198.468a.642.642 0 00.469.198c.18 0 .337-.066.469-.198l1.343-1.343a7.957 7.957 0 002.537 1.635 7.803 7.803 0 002.943.573c1.902 0 3.562-.578 4.979-1.735 1.416-1.156 2.347-2.665 2.792-4.526a.32.32 0 00-.089-.307.322.322 0 00-.235-.099z",
    fill: "#434856"
  })));
}

var _path$d;

function _extends$d() { _extends$d = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$d.apply(this, arguments); }

function SvgRoguIconClose(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$d({
    width: 24,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$d || (_path$d = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 10.586l4.95-4.95a1 1 0 111.415 1.414L13.415 12l4.95 4.95a1 1 0 01-1.414 1.414L12 13.414l-4.95 4.95a1 1 0 01-1.414-1.414l4.95-4.95-4.95-4.95A1 1 0 017.05 5.636l4.95 4.95z",
    fill: "#434856"
  })));
}

var _path$c;

function _extends$c() { _extends$c = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$c.apply(this, arguments); }

function SvgRoguIconDownload(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$c({
    width: 24,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$c || (_path$c = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M13 5a1 1 0 10-2 0v7.586l-2.293-2.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L13 12.586V5zM8 19a1 1 0 011-1h6a1 1 0 110 2H9a1 1 0 01-1-1z",
    fill: "#434856"
  })));
}

var _path$b;

function _extends$b() { _extends$b = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$b.apply(this, arguments); }

function SvgRoguIconDelete(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$b({
    width: 24,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$b || (_path$b = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9 5a1 1 0 011-1h4a1 1 0 011 1v1H9V5zM7 6H5a2 2 0 00-2 2h18a2 2 0 00-2-2h-2V5a3 3 0 00-3-3h-4a3 3 0 00-3 3v1zM5 9h14l-.858 11.153A2 2 0 0116.148 22H7.852a2 2 0 01-1.994-1.847L5 9zm4 3a1 1 0 112 0v6a1 1 0 11-2 0v-6zm5-1a1 1 0 00-1 1v6a1 1 0 102 0v-6a1 1 0 00-1-1z",
    fill: "#434856"
  })));
}

var _path$a, _path2$6, _path3$6, _path4$1, _path5, _defs$5;

function _extends$a() { _extends$a = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$a.apply(this, arguments); }

function SvgRoguIconAssignment(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$a({
    width: 32,
    height: 32,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$a || (_path$a = /*#__PURE__*/React__namespace.createElement("path", {
    opacity: 0.25,
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M30.765 15.122v.072c-.025 2.284-.115 3.577-.33 4.882-.698 4.105-2.627 6.799-5.887 8.224-1.582.685-3.25 1.052-5.522 1.199-1.157.073-5.197.04-6.352-.052-2.268-.184-3.93-.578-5.496-1.289-3.23-1.479-5.103-4.203-5.715-8.319-.188-1.308-.251-2.603-.228-4.887l.001-.071c.025-2.239.115-3.52.328-4.811C2.574 4.115 6.185 1.093 12.841.653c1.032-.068 5.447-.038 6.484.046 2.269.184 3.93.578 5.496 1.289 3.23 1.48 5.103 4.203 5.715 8.32.187 1.294.25 2.576.229 4.814z",
    fill: "#D4DBFF"
  })), _path2$6 || (_path2$6 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10.598 5.21c1.495-.191 3.296-.287 5.403-.287 2.106 0 3.907.096 5.402.287a5.223 5.223 0 014.486 4.27c.382 2.174.573 4.347.573 6.52 0 2.173-.191 4.346-.573 6.52a5.223 5.223 0 01-4.485 4.27c-1.496.191-3.297.287-5.403.287-2.107 0-3.908-.096-5.403-.287a5.223 5.223 0 01-4.486-4.27A37.57 37.57 0 015.54 16c0-2.173.191-4.346.573-6.52a5.223 5.223 0 014.486-4.27z",
    fill: "#FDF7E0"
  })), _path3$6 || (_path3$6 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10.598 5.21c1.495-.191 3.296-.287 5.403-.287 2.106 0 3.907.096 5.402.287a5.223 5.223 0 014.486 4.27c.382 2.174.573 4.347.573 6.52 0 2.173-.191 4.346-.573 6.52a5.223 5.223 0 01-4.485 4.27c-1.496.191-3.297.287-5.403.287-2.107 0-3.908-.096-5.403-.287a5.223 5.223 0 01-4.486-4.27A37.57 37.57 0 015.54 16c0-2.173.191-4.346.573-6.52a5.223 5.223 0 014.486-4.27zM7.325 9.694A36.34 36.34 0 006.77 16c0 2.101.185 4.203.555 6.306a3.992 3.992 0 003.43 3.263c1.438.184 3.188.277 5.246.277 2.057 0 3.807-.093 5.246-.277a3.992 3.992 0 003.43-3.263c.37-2.103.554-4.205.554-6.306s-.184-4.203-.554-6.306a3.992 3.992 0 00-3.43-3.263c-1.439-.184-3.189-.277-5.246-.277-2.058 0-3.808.093-5.247.277a3.992 3.992 0 00-3.43 3.263z",
    fill: "url(#rogu-icon-assignment_svg__paint0_linear_2150:4656)"
  })), _path4$1 || (_path4$1 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10.495 11.903c1.528-.14 3.363-.21 5.505-.21 2.156 0 4.001.087 5.535.26.352.04.618.339.618.693a.682.682 0 01-.618.68c-1.52.141-3.365.213-5.536.213-2.155 0-3.99-.07-5.503-.21a.716.716 0 010-1.426zm0 3.692c1.528-.14 3.363-.21 5.505-.21 2.156 0 4.001.087 5.535.26.352.04.618.339.618.694a.682.682 0 01-.618.679c-1.52.142-3.365.213-5.536.213-2.155 0-3.99-.07-5.503-.21a.716.716 0 010-1.426zm2.735 3.482c-1.04 0-1.948.055-2.725.164a.766.766 0 000 1.519c.772.109 1.68.163 2.725.163 1.06 0 1.98-.056 2.758-.168a.732.732 0 00.627-.724.759.759 0 00-.628-.748c-.783-.137-1.702-.206-2.757-.206z",
    fill: "#E9DAB1"
  })), _path5 || (_path5 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M13.817 3.782a2.461 2.461 0 014.364 0c.52.047 1.002.112 1.447.196.75.14 1.294.796 1.294 1.56 0 .762-.541 1.415-1.29 1.556-1.027.194-2.238.29-3.633.29s-2.606-.096-3.633-.29a1.583 1.583 0 01-1.29-1.556c0-.764.544-1.42 1.295-1.56.444-.084.927-.149 1.446-.196z",
    fill: "#DF4141"
  })), _defs$5 || (_defs$5 = /*#__PURE__*/React__namespace.createElement("defs", null, /*#__PURE__*/React__namespace.createElement("linearGradient", {
    id: "rogu-icon-assignment_svg__paint0_linear_2150:4656",
    x1: 3.113,
    y1: 15.021,
    x2: 17.111,
    y2: 30.612,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React__namespace.createElement("stop", {
    stopColor: "#FFE641"
  }), /*#__PURE__*/React__namespace.createElement("stop", {
    offset: 1,
    stopColor: "#FFC918"
  })))));
}

var _path$9, _g$5, _g2, _g3, _path2$5, _path3$5, _path4, _defs$4;

function _extends$9() { _extends$9 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$9.apply(this, arguments); }

function SvgRoguIconMaterial(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$9({
    width: 32,
    height: 35,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$9 || (_path$9 = /*#__PURE__*/React__namespace.createElement("path", {
    opacity: 0.25,
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M30.765 16.353v.072c-.025 2.283-.115 3.577-.33 4.882-.698 4.105-2.627 6.798-5.887 8.224-1.582.685-3.25 1.052-5.522 1.198-1.157.073-5.197.04-6.352-.052-2.268-.183-3.93-.577-5.496-1.288-3.23-1.48-5.103-4.203-5.715-8.32-.188-1.308-.251-2.602-.228-4.886l.001-.072c.025-2.238.115-3.52.328-4.81 1.01-5.955 4.621-8.977 11.277-9.418 1.032-.067 5.447-.037 6.484.047 2.269.184 3.93.578 5.496 1.289 3.23 1.479 5.103 4.203 5.715 8.319.187 1.294.25 2.577.229 4.815z",
    fill: "#D4DBFF"
  })), _g$5 || (_g$5 = /*#__PURE__*/React__namespace.createElement("g", {
    filter: "url(#rogu-icon-material_svg__filter0_d_2150:4687)"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    d: "M23.385 2.461H8.615a2.46 2.46 0 00-2.46 2.462v19.692a2.46 2.46 0 002.46 2.462h14.77a2.46 2.46 0 002.462-2.462V4.923a2.46 2.46 0 00-2.462-2.462z",
    fill: "url(#rogu-icon-material_svg__paint0_linear_2150:4687)"
  }))), _g2 || (_g2 = /*#__PURE__*/React__namespace.createElement("g", {
    filter: "url(#rogu-icon-material_svg__filter1_d_2150:4687)"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    d: "M14.77 14.769l-3.078-1.846-3.077 1.846V6.154c0-.68.552-1.231 1.231-1.231h3.692c.68 0 1.231.551 1.231 1.23v8.616z",
    fill: "#FFFAE6"
  }))), _g3 || (_g3 = /*#__PURE__*/React__namespace.createElement("g", {
    filter: "url(#rogu-icon-material_svg__filter2_d_2150:4687)"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    transform: "rotate(50 22.758 15.472)",
    fill: "url(#rogu-icon-material_svg__paint1_linear_2150:4687)",
    d: "M22.758 15.472h6.154v13.539h-6.154z"
  }))), _path2$5 || (_path2$5 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M16.342 28.889l-3.955-4.714-.943.79a1.234 1.234 0 00-.152 1.735l2.374 2.828a1.234 1.234 0 001.733.152l.943-.791z",
    fill: "#E57373"
  })), _path3$5 || (_path3$5 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M26.715 20.186l.896-2.76-1.978-2.358-2.874.404 3.956 4.714z",
    fill: "#FFF1C4"
  })), _path4 || (_path4 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M28.012 16.186a1 1 0 00-1.09-1.299l-1.29.181 1.978 2.357.402-1.239z",
    fill: "#37474F"
  })), _defs$4 || (_defs$4 = /*#__PURE__*/React__namespace.createElement("defs", null, /*#__PURE__*/React__namespace.createElement("filter", {
    id: "rogu-icon-material_svg__filter0_d_2150:4687",
    x: 2.154,
    y: 0.461,
    width: 27.691,
    height: 32.615,
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, /*#__PURE__*/React__namespace.createElement("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/React__namespace.createElement("feColorMatrix", {
    in: "SourceAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
    result: "hardAlpha"
  }), /*#__PURE__*/React__namespace.createElement("feOffset", {
    dy: 2
  }), /*#__PURE__*/React__namespace.createElement("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/React__namespace.createElement("feColorMatrix", {
    values: "0 0 0 0 0.470588 0 0 0 0 0.835294 0 0 0 0 0.996078 0 0 0 0.5 0"
  }), /*#__PURE__*/React__namespace.createElement("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_2150:4687"
  }), /*#__PURE__*/React__namespace.createElement("feBlend", {
    in: "SourceGraphic",
    in2: "effect1_dropShadow_2150:4687",
    result: "shape"
  })), /*#__PURE__*/React__namespace.createElement("filter", {
    id: "rogu-icon-material_svg__filter1_d_2150:4687",
    x: 4.615,
    y: 2.923,
    width: 14.154,
    height: 17.846,
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, /*#__PURE__*/React__namespace.createElement("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/React__namespace.createElement("feColorMatrix", {
    in: "SourceAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
    result: "hardAlpha"
  }), /*#__PURE__*/React__namespace.createElement("feOffset", {
    dy: 2
  }), /*#__PURE__*/React__namespace.createElement("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/React__namespace.createElement("feColorMatrix", {
    values: "0 0 0 0 0.629143 0 0 0 0 0.851657 0 0 0 0 1 0 0 0 1 0"
  }), /*#__PURE__*/React__namespace.createElement("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_2150:4687"
  }), /*#__PURE__*/React__namespace.createElement("feBlend", {
    in: "SourceGraphic",
    in2: "effect1_dropShadow_2150:4687",
    result: "shape"
  })), /*#__PURE__*/React__namespace.createElement("filter", {
    id: "rogu-icon-material_svg__filter2_d_2150:4687",
    x: 8.387,
    y: 13.472,
    width: 22.326,
    height: 21.416,
    filterUnits: "userSpaceOnUse",
    colorInterpolationFilters: "sRGB"
  }, /*#__PURE__*/React__namespace.createElement("feFlood", {
    floodOpacity: 0,
    result: "BackgroundImageFix"
  }), /*#__PURE__*/React__namespace.createElement("feColorMatrix", {
    in: "SourceAlpha",
    values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
    result: "hardAlpha"
  }), /*#__PURE__*/React__namespace.createElement("feOffset", {
    dy: 2
  }), /*#__PURE__*/React__namespace.createElement("feGaussianBlur", {
    stdDeviation: 2
  }), /*#__PURE__*/React__namespace.createElement("feColorMatrix", {
    values: "0 0 0 0 0.972549 0 0 0 0 0.596078 0 0 0 0 0.145098 0 0 0 0.5 0"
  }), /*#__PURE__*/React__namespace.createElement("feBlend", {
    in2: "BackgroundImageFix",
    result: "effect1_dropShadow_2150:4687"
  }), /*#__PURE__*/React__namespace.createElement("feBlend", {
    in: "SourceGraphic",
    in2: "effect1_dropShadow_2150:4687",
    result: "shape"
  })), /*#__PURE__*/React__namespace.createElement("linearGradient", {
    id: "rogu-icon-material_svg__paint0_linear_2150:4687",
    x1: 1.89,
    y1: 22.179,
    x2: 19.887,
    y2: 29.553,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React__namespace.createElement("stop", {
    stopColor: "#0CB2FA"
  }), /*#__PURE__*/React__namespace.createElement("stop", {
    offset: 1,
    stopColor: "#057FF2"
  })), /*#__PURE__*/React__namespace.createElement("linearGradient", {
    id: "rogu-icon-material_svg__paint1_linear_2150:4687",
    x1: 22.758,
    y1: 15.472,
    x2: 22.758,
    y2: 29.011,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React__namespace.createElement("stop", {
    stopColor: "#FFD34E"
  }), /*#__PURE__*/React__namespace.createElement("stop", {
    offset: 1,
    stopColor: "#FFA726"
  })))));
}

var _path$8, _path2$4, _path3$4, _g$4, _defs$3;

function _extends$8() { _extends$8 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }

function SvgRoguIconFileWord(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$8({
    width: 30,
    height: 31,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$8 || (_path$8 = /*#__PURE__*/React__namespace.createElement("path", {
    opacity: 0.25,
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M29.765 15.431v.073c-.025 2.332-.115 3.653-.33 4.986-.698 4.193-2.627 6.943-5.887 8.4-1.582.7-3.25 1.074-5.522 1.223-1.157.075-5.197.041-6.352-.053-2.268-.187-3.93-.59-5.496-1.316-3.23-1.51-5.103-4.293-5.715-8.496-.188-1.336-.251-2.659-.228-4.99l.001-.074c.025-2.286.115-3.594.328-4.913C1.574 4.19 5.185 1.103 11.841.654c1.032-.07 5.447-.04 6.484.047 2.269.188 3.93.59 5.496 1.316 3.23 1.51 5.103 4.293 5.715 8.497.187 1.321.25 2.631.229 4.917z",
    fill: "#D4DBFF"
  })), _path2$4 || (_path2$4 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.194 27.692c-.914 0-1.655-.666-1.655-1.487V8.615l6.095-5.538h13.173c.914 0 1.655.666 1.655 1.488v21.64c0 .821-.74 1.487-1.655 1.487H6.194z",
    fill: "url(#rogu-icon-file-word_svg__paint0_linear_2150:4974)"
  })), /*#__PURE__*/React__namespace.createElement("mask", {
    id: "rogu-icon-file-word_svg__a",
    style: {
      maskType: "alpha"
    },
    maskUnits: "userSpaceOnUse",
    x: 4,
    y: 3,
    width: 22,
    height: 25
  }, _path3$4 || (_path3$4 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.194 27.692c-.914 0-1.655-.666-1.655-1.487V8.615l6.095-5.538h13.173c.914 0 1.655.666 1.655 1.488v21.64c0 .821-.74 1.487-1.655 1.487H6.194z",
    fill: "#fff"
  }))), _g$4 || (_g$4 = /*#__PURE__*/React__namespace.createElement("g", {
    mask: "url(#rogu-icon-file-word_svg__a)"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    d: "M3.924 1.846h6.77v4.77a2 2 0 01-2 2h-4.77v-6.77z",
    fill: "#fff"
  }))), _defs$3 || (_defs$3 = /*#__PURE__*/React__namespace.createElement("defs", null, /*#__PURE__*/React__namespace.createElement("linearGradient", {
    id: "rogu-icon-file-word_svg__paint0_linear_2150:4974",
    x1: 4.539,
    y1: 3.077,
    x2: 4.539,
    y2: 27.692,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React__namespace.createElement("stop", {
    stopColor: "#63ACE3"
  }), /*#__PURE__*/React__namespace.createElement("stop", {
    offset: 1,
    stopColor: "#4198DF"
  })))));
}

var _path$7, _path2$3, _path3$3, _g$3, _defs$2;

function _extends$7() { _extends$7 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }

function SvgRoguIconFileExcel(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$7({
    width: 30,
    height: 31,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$7 || (_path$7 = /*#__PURE__*/React__namespace.createElement("path", {
    opacity: 0.25,
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M29.765 15.431v.073c-.025 2.332-.115 3.653-.33 4.986-.698 4.193-2.627 6.943-5.887 8.4-1.582.7-3.25 1.074-5.522 1.223-1.157.075-5.197.041-6.352-.053-2.268-.187-3.93-.59-5.496-1.316-3.23-1.51-5.103-4.293-5.715-8.496-.188-1.336-.251-2.659-.228-4.99l.001-.074c.025-2.286.115-3.594.328-4.913C1.574 4.19 5.185 1.103 11.841.654c1.032-.07 5.447-.04 6.484.047 2.269.188 3.93.59 5.496 1.316 3.23 1.51 5.103 4.293 5.715 8.497.187 1.321.25 2.631.229 4.917z",
    fill: "#D4DBFF"
  })), _path2$3 || (_path2$3 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.194 27.692c-.914 0-1.655-.666-1.655-1.487V8.615l6.095-5.538h13.173c.914 0 1.655.666 1.655 1.488v21.64c0 .821-.74 1.487-1.655 1.487H6.194z",
    fill: "url(#rogu-icon-file-excel_svg__paint0_linear_2150:5020)"
  })), /*#__PURE__*/React__namespace.createElement("mask", {
    id: "rogu-icon-file-excel_svg__a",
    style: {
      maskType: "alpha"
    },
    maskUnits: "userSpaceOnUse",
    x: 4,
    y: 3,
    width: 22,
    height: 25
  }, _path3$3 || (_path3$3 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.194 27.692c-.914 0-1.655-.666-1.655-1.487V8.615l6.095-5.538h13.173c.914 0 1.655.666 1.655 1.488v21.64c0 .821-.74 1.487-1.655 1.487H6.194z",
    fill: "#fff"
  }))), _g$3 || (_g$3 = /*#__PURE__*/React__namespace.createElement("g", {
    mask: "url(#rogu-icon-file-excel_svg__a)"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    d: "M3.924 1.846h6.77v4.77a2 2 0 01-2 2h-4.77v-6.77z",
    fill: "#fff"
  }))), _defs$2 || (_defs$2 = /*#__PURE__*/React__namespace.createElement("defs", null, /*#__PURE__*/React__namespace.createElement("linearGradient", {
    id: "rogu-icon-file-excel_svg__paint0_linear_2150:5020",
    x1: 4.617,
    y1: 3.077,
    x2: 4.617,
    y2: 27.509,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React__namespace.createElement("stop", {
    stopColor: "#31B479"
  }), /*#__PURE__*/React__namespace.createElement("stop", {
    offset: 1,
    stopColor: "#31B475"
  })))));
}

var _path$6, _path2$2, _path3$2, _g$2;

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

function SvgRoguIconFileOthers(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$6({
    width: 30,
    height: 31,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$6 || (_path$6 = /*#__PURE__*/React__namespace.createElement("path", {
    opacity: 0.25,
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M29.765 15.431v.073c-.025 2.332-.115 3.653-.33 4.986-.698 4.193-2.627 6.943-5.887 8.4-1.582.7-3.25 1.074-5.522 1.223-1.157.075-5.197.041-6.352-.053-2.268-.187-3.93-.59-5.496-1.316-3.23-1.51-5.103-4.293-5.715-8.496-.188-1.336-.251-2.659-.228-4.99l.001-.074c.025-2.286.115-3.594.328-4.913C1.574 4.19 5.185 1.103 11.841.654c1.032-.07 5.447-.04 6.484.047 2.269.188 3.93.59 5.496 1.316 3.23 1.51 5.103 4.293 5.715 8.497.187 1.321.25 2.631.229 4.917z",
    fill: "#D4DBFF"
  })), _path2$2 || (_path2$2 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.194 27.692c-.914 0-1.655-.666-1.655-1.487V8.615l6.095-5.538h13.173c.914 0 1.655.666 1.655 1.488v21.64c0 .821-.74 1.487-1.655 1.487H6.194z",
    fill: "#8993A4"
  })), /*#__PURE__*/React__namespace.createElement("mask", {
    id: "rogu-icon-file-others_svg__a",
    style: {
      maskType: "alpha"
    },
    maskUnits: "userSpaceOnUse",
    x: 4,
    y: 3,
    width: 22,
    height: 25
  }, _path3$2 || (_path3$2 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.194 27.692c-.914 0-1.655-.666-1.655-1.487V8.615l6.095-5.538h13.173c.914 0 1.655.666 1.655 1.488v21.64c0 .821-.74 1.487-1.655 1.487H6.194z",
    fill: "#fff"
  }))), _g$2 || (_g$2 = /*#__PURE__*/React__namespace.createElement("g", {
    mask: "url(#rogu-icon-file-others_svg__a)"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    d: "M3.924 1.846h6.77v4.77a2 2 0 01-2 2h-4.77v-6.77z",
    fill: "#fff"
  }))));
}

var _path$5, _path2$1, _path3$1, _g$1, _defs$1;

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

function SvgRoguIconFilePowerpoint(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$5({
    width: 30,
    height: 31,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$5 || (_path$5 = /*#__PURE__*/React__namespace.createElement("path", {
    opacity: 0.25,
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M29.765 15.431v.073c-.025 2.332-.115 3.653-.33 4.986-.698 4.193-2.627 6.943-5.887 8.4-1.582.7-3.25 1.074-5.522 1.223-1.157.075-5.197.041-6.352-.053-2.268-.187-3.93-.59-5.496-1.316-3.23-1.51-5.103-4.293-5.715-8.496-.188-1.336-.251-2.659-.228-4.99l.001-.074c.025-2.286.115-3.594.328-4.913C1.574 4.19 5.185 1.103 11.841.654c1.032-.07 5.447-.04 6.484.047 2.269.188 3.93.59 5.496 1.316 3.23 1.51 5.103 4.293 5.715 8.497.187 1.321.25 2.631.229 4.917z",
    fill: "#D4DBFF"
  })), _path2$1 || (_path2$1 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.194 27.692c-.914 0-1.655-.666-1.655-1.487V8.615l6.095-5.538h13.173c.914 0 1.655.666 1.655 1.488v21.64c0 .821-.74 1.487-1.655 1.487H6.194z",
    fill: "url(#rogu-icon-file-powerpoint_svg__paint0_linear_2150:4997)"
  })), /*#__PURE__*/React__namespace.createElement("mask", {
    id: "rogu-icon-file-powerpoint_svg__a",
    style: {
      maskType: "alpha"
    },
    maskUnits: "userSpaceOnUse",
    x: 4,
    y: 3,
    width: 22,
    height: 25
  }, _path3$1 || (_path3$1 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.194 27.692c-.914 0-1.655-.666-1.655-1.487V8.615l6.095-5.538h13.173c.914 0 1.655.666 1.655 1.488v21.64c0 .821-.74 1.487-1.655 1.487H6.194z",
    fill: "#fff"
  }))), _g$1 || (_g$1 = /*#__PURE__*/React__namespace.createElement("g", {
    mask: "url(#rogu-icon-file-powerpoint_svg__a)"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    d: "M3.924 1.846h6.77v4.77a2 2 0 01-2 2h-4.77v-6.77z",
    fill: "#fff"
  }))), _defs$1 || (_defs$1 = /*#__PURE__*/React__namespace.createElement("defs", null, /*#__PURE__*/React__namespace.createElement("linearGradient", {
    id: "rogu-icon-file-powerpoint_svg__paint0_linear_2150:4997",
    x1: 4.664,
    y1: 3.077,
    x2: 4.664,
    y2: 27.398,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React__namespace.createElement("stop", {
    stopColor: "#EB7328"
  }), /*#__PURE__*/React__namespace.createElement("stop", {
    offset: 1,
    stopColor: "#EB8A28"
  })))));
}

var _path$4, _path2, _path3, _g, _defs;

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

function SvgRoguIconFilePdf(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$4({
    width: 30,
    height: 31,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$4 || (_path$4 = /*#__PURE__*/React__namespace.createElement("path", {
    opacity: 0.25,
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M29.765 15.431v.073c-.025 2.332-.115 3.653-.33 4.986-.698 4.193-2.627 6.943-5.887 8.4-1.582.7-3.25 1.074-5.522 1.223-1.157.075-5.197.041-6.352-.053-2.268-.187-3.93-.59-5.496-1.316-3.23-1.51-5.103-4.293-5.715-8.496-.188-1.336-.251-2.659-.228-4.99l.001-.074c.025-2.286.115-3.594.328-4.913C1.574 4.19 5.185 1.103 11.841.654c1.032-.07 5.447-.04 6.484.047 2.269.188 3.93.59 5.496 1.316 3.23 1.51 5.103 4.293 5.715 8.497.187 1.321.25 2.631.229 4.917z",
    fill: "#D4DBFF"
  })), _path2 || (_path2 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.194 27.692c-.914 0-1.655-.666-1.655-1.487V8.615l6.095-5.538h13.173c.914 0 1.655.666 1.655 1.488v21.64c0 .821-.74 1.487-1.655 1.487H6.194z",
    fill: "url(#rogu-icon-file-pdf_svg__paint0_linear_2150:4928)"
  })), /*#__PURE__*/React__namespace.createElement("mask", {
    id: "rogu-icon-file-pdf_svg__a",
    style: {
      maskType: "alpha"
    },
    maskUnits: "userSpaceOnUse",
    x: 4,
    y: 3,
    width: 22,
    height: 25
  }, _path3 || (_path3 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.194 27.692c-.914 0-1.655-.666-1.655-1.487V8.615l6.095-5.538h13.173c.914 0 1.655.666 1.655 1.488v21.64c0 .821-.74 1.487-1.655 1.487H6.194z",
    fill: "#fff"
  }))), _g || (_g = /*#__PURE__*/React__namespace.createElement("g", {
    mask: "url(#rogu-icon-file-pdf_svg__a)"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    d: "M3.924 1.846h6.77v4.77a2 2 0 01-2 2h-4.77v-6.77z",
    fill: "#fff"
  }))), _defs || (_defs = /*#__PURE__*/React__namespace.createElement("defs", null, /*#__PURE__*/React__namespace.createElement("linearGradient", {
    id: "rogu-icon-file-pdf_svg__paint0_linear_2150:4928",
    x1: 4.539,
    y1: 3.077,
    x2: 4.539,
    y2: 27.692,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React__namespace.createElement("stop", {
    stopColor: "#FF745E"
  }), /*#__PURE__*/React__namespace.createElement("stop", {
    offset: 1,
    stopColor: "#DF4141"
  })))));
}

var _path$3;

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

function SvgRoguIconView(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$3({
    width: 24,
    height: 24,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$3 || (_path$3 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M21.85 11.546l.008.009c.19.254.19.636 0 .89a4.13 4.13 0 00-.047.056c-.512.608-4.628 5.499-9.803 5.499-5.353 0-9.572-5.211-9.843-5.546a.707.707 0 010-.908C2.436 11.21 6.655 6 12.008 6c5.352 0 9.572 5.211 9.843 5.546zM8.052 12c0 2.205 1.768 3.986 3.957 3.986s3.957-1.781 3.957-3.986-1.768-3.986-3.957-3.986S8.05 9.795 8.05 12zm6.356 0a2.408 2.408 0 01-2.4 2.417A2.408 2.408 0 019.61 12a2.408 2.408 0 012.399-2.417c1.325 0 2.4 1.082 2.4 2.417z",
    fill: "#434856"
  })));
}

var _path$2;

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

function SvgRoguIconSend(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$2({
    width: 17,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$2 || (_path$2 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.342 10.118L1.87 17.19a1.263 1.263 0 01-1.729-1.658L2.978 9.54a1.267 1.267 0 000-1.08L.14 2.468A1.263 1.263 0 011.871.809l13.471 7.072a1.263 1.263 0 010 2.238v-.001z",
    fill: "#fff"
  })));
}

var _path$1;

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

function SvgRoguIconImage(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends$1({
    width: 18,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path$1 || (_path$1 = /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5.435 3.21a37.362 37.362 0 017.885 0c1.09.12 2.051 1.026 2.191 2.069a29.1 29.1 0 010 7.45c-.14 1.036-1.102 1.942-2.196 2.063a37.513 37.513 0 01-7.885 0c-1.089-.121-2.051-1.027-2.191-2.07a29.103 29.103 0 010-7.449C3.38 4.236 4.342 3.33 5.436 3.21zM7.04 11h4.892a.5.5 0 00.384-.82L10.85 8.42a.5.5 0 00-.737-.033l-.76.76a.5.5 0 01-.707 0l-.251-.252a.5.5 0 00-.744.041L6.65 10.188a.5.5 0 00.39.812z",
    fill: "#434856"
  })));
}

var _path;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function SvgRoguIconVideo(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    width: 18,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/React__namespace.createElement("path", {
    d: "M10.05 4h-7.3C1.789 4 1 4.788 1 5.75v5.9c0 .963.788 1.75 1.75 1.75h7.3c.963 0 1.751-.787 1.751-1.75v-5.9c0-.98-.788-1.75-1.75-1.75zM15.704 4.963a.892.892 0 00-.297.122l-2.731 1.576v4.061l2.748 1.576a1.04 1.04 0 001.436-.385 1.07 1.07 0 00.14-.526V5.978c0-.648-.613-1.173-1.296-1.015z",
    fill: "#434856"
  })));
}

var Colors = {
  DEFAULT: 'DEFAULT',
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  CONTENT: 'CONTENT',
  CONTENT_INVERSE: 'CONTENT_INVERSE',
  WHITE: 'WHITE',
  SENT: 'SENT',
  READ: 'READ',
  ON_BACKGROUND_1: 'ON_BACKGROUND_1',
  ON_BACKGROUND_2: 'ON_BACKGROUND_2',
  ON_BACKGROUND_3: 'ON_BACKGROUND_3',
  BACKGROUND_3: 'BACKGROUND_3',
  ERROR: 'ERROR'
};

function changeColorToClassName(color) {
  switch (color) {
    case Colors.PRIMARY:
      return 'sendbird-icon-color--primary';

    case Colors.SECONDARY:
      return 'sendbird-icon-color--secondary';

    case Colors.CONTENT:
      return 'sendbird-icon-color--content';

    case Colors.CONTENT_INVERSE:
      return 'sendbird-icon-color--content-inverse';

    case Colors.WHITE:
      return 'sendbird-icon-color--white';

    case Colors.SENT:
      return 'sendbird-icon-color--sent';

    case Colors.READ:
      return 'sendbird-icon-color--read';

    case Colors.ON_BACKGROUND_1:
      return 'sendbird-icon-color--on-background-1';

    case Colors.ON_BACKGROUND_2:
      return 'sendbird-icon-color--on-background-2';

    case Colors.ON_BACKGROUND_3:
      return 'sendbird-icon-color--on-background-3';

    case Colors.BACKGROUND_3:
      return 'sendbird-icon-color--background-3';

    case Colors.ERROR:
      return 'sendbird-icon-color--error';

    default:
      return '';
  }
}

function changeTypeToIconComponent(type) {
  switch (type) {
    case Type$1.ADD:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconAdd, null);

    case Type$1.ARROW_LEFT:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconArrowLeft, null);

    case Type$1.ATTACH:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconAttach, null);

    case Type$1.BAN:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconBan, null);

    case Type$1.BROADCAST:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconBroadcast, null);

    case Type$1.CAMERA:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconCamera, null);

    case Type$1.CHANNELS:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconChannels, null);

    case Type$1.CHAT:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconChat, null);

    case Type$1.CHAT_FILLED:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconChatFilled, null);

    case Type$1.CHEVRON_DOWN:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconChevronDown, null);

    case Type$1.CHEVRON_RIGHT:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconChevronRight, null);

    case Type$1.CLOSE:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconClose, null);

    case Type$1.COLLAPSE:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconCollapse, null);

    case Type$1.COPY:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconCopy, null);

    case Type$1.CREATE:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconCreate, null);

    case Type$1.DELETE:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconDelete, null);

    case Type$1.DISCONNECTED:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconDisconnected, null);

    case Type$1.DOCUMENT:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconDocument, null);

    case Type$1.DONE:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconDone, null);

    case Type$1.DONE_ALL:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconDoneAll, null);

    case Type$1.DOWNLOAD:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconDownload, null);

    case Type$1.EDIT:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconEdit, null);

    case Type$1.EMOJI_MORE:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconEmojiMore, null);

    case Type$1.ERROR:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconError, null);

    case Type$1.EXPAND:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconExpand, null);

    case Type$1.FILE_AUDIO:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconFileAudio, null);

    case Type$1.FILE_DOCUMENT:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconFileDocument, null);

    case Type$1.FREEZE:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconFreeze, null);

    case Type$1.GIF:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconGif, null);

    case Type$1.INFO:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconInfo, null);

    case Type$1.LEAVE:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconLeave, null);

    case Type$1.MEMBERS:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconMembers, null);

    case Type$1.MESSAGE:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconMessage, null);

    case Type$1.MODERATIONS:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconModerations, null);

    case Type$1.MORE:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconMore, null);

    case Type$1.MUTE:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconMute, null);

    case Type$1.NOTIFICATIONS:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconNotifications, null);

    case Type$1.NOTIFICATIONS_OFF_FILLED:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconNotificationsOffFilled, null);

    case Type$1.OPERATOR:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconOperator, null);

    case Type$1.PHOTO:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconPhoto, null);

    case Type$1.PLAY:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconPlay, null);

    case Type$1.PLUS:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconPlus, null);

    case Type$1.QUESTION:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconQuestion, null);

    case Type$1.REFRESH:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconRefresh, null);

    case Type$1.REMOVE:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconRemove, null);

    case Type$1.REPLY:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconReplyFilled, null);

    case Type$1.SEARCH:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconSearch, null);

    case Type$1.SEND:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconSend, null);

    case Type$1.SETTINGS_FILLED:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconSettingsFilled, null);

    case Type$1.SPINNER:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconSpinner, null);

    case Type$1.SUPERGROUP:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconSupergroup, null);

    case Type$1.THUMBNAIL_NONE:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconThumbnailNone, null);

    case Type$1.TOGGLE_OFF:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconToggleoff, null);

    case Type$1.TOGGLE_ON:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconToggleon, null);

    case Type$1.USER:
      return /*#__PURE__*/React__default$1["default"].createElement(index$2.SvgIconUser, null);

    case Type$1.ROGU_PENDING:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconMsgPending, null);

    case Type$1.ROGU_SENT:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconMsgSent, null);

    case Type$1.ROGU_READ_ALL:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconMsgReadAll, null);

    case Type$1.ROGU_ERROR:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconMsgFailed, null);

    case Type$1.ROGU_COPY:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconCopy, null);

    case Type$1.ROGU_REPLY:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconReply, null);

    case Type$1.ROGU_RESEND:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconResend, null);

    case Type$1.ROGU_CLOSE:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconClose, null);

    case Type$1.ROGU_DOWNLOAD:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconDownload, null);

    case Type$1.ROGU_DELETE:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconDelete, null);

    case Type$1.ROGU_ASSIGNMENT:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconAssignment, null);

    case Type$1.ROGU_MATERIAL:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconMaterial, null);

    case Type$1.ROGU_FILE_WORD:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconFileWord, null);

    case Type$1.ROGU_FILE_EXCEL:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconFileExcel, null);

    case Type$1.ROGU_FILE_POWERPOINT:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconFilePowerpoint, null);

    case Type$1.ROGU_FILE_PDF:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconFilePdf, null);

    case Type$1.ROGU_FILE_OTHERS:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconFileOthers, null);

    case Type$1.ROGU_VIEW:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconView, null);

    case Type$1.ROGU_SEND:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconSend, null);

    case Type$1.ROGU_IMAGE:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconImage, null);

    case Type$1.ROGU_VIDEO:
      return /*#__PURE__*/React__default$1["default"].createElement(SvgRoguIconVideo, null);

    default:
      return 'icon';
    // If you see this text 'icon' replace icon for it
  }
}

function Icon(_ref) {
  var className = _ref.className,
      type = _ref.type,
      fillColor = _ref.fillColor,
      width = _ref.width,
      height = _ref.height,
      onClick = _ref.onClick,
      children = _ref.children;
  var iconStyle = {
    width: typeof width === 'string' ? width : "".concat(width, "px"),
    minWidth: typeof width === 'string' ? width : "".concat(width, "px"),
    height: typeof height === 'string' ? height : "".concat(height, "px"),
    minHeight: typeof height === 'string' ? height : "".concat(height, "px")
  };
  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-icon', changeColorToClassName(fillColor)]).join(' '),
    role: "button",
    onClick: onClick,
    onKeyDown: onClick,
    tabIndex: "0",
    style: iconStyle
  }, children || changeTypeToIconComponent(type));
}
Icon.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  type: PropTypes__default["default"].oneOfType([PropTypes__default["default"].oneOf(Object.keys(Type$1)), PropTypes__default["default"].string]).isRequired,
  fillColor: PropTypes__default["default"].oneOf(Object.keys(Colors)),
  width: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  height: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  onClick: PropTypes__default["default"].func,
  children: PropTypes__default["default"].element
};
Icon.defaultProps = {
  className: '',
  fillColor: Colors.DEFAULT,
  width: 26,
  height: 26,
  onClick: function onClick() {},
  children: null
};
var IconTypes = Type$1;
var IconColors = Colors;

var MessageStatusTypes = index$1.getOutgoingMessageStates();
function MessageStatus(_ref) {
  var _iconType;

  var className = _ref.className,
      message = _ref.message,
      status = _ref.status;
  var iconType = (_iconType = {}, LocalizationContext._defineProperty(_iconType, MessageStatusTypes.SENT, IconTypes.ROGU_SENT), LocalizationContext._defineProperty(_iconType, MessageStatusTypes.DELIVERED, IconTypes.ROGU_SENT), LocalizationContext._defineProperty(_iconType, MessageStatusTypes.READ, IconTypes.ROGU_READ_ALL), LocalizationContext._defineProperty(_iconType, MessageStatusTypes.FAILED, IconTypes.ROGU_ERROR), _iconType);
  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['rogu-message-status']).join(' ')
  }, index$1.isSentStatus(status) && /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-message-status__text",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, index$1.getMessageCreatedAt(message)), status === MessageStatusTypes.PENDING ? /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-flex"
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-message-status__text",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, "Mengirim"), /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    className: "rogu-message-status__icon",
    type: IconTypes.ROGU_PENDING,
    width: "18px",
    height: "18px"
  })) : /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-flex"
  }, status === MessageStatusTypes.FAILED && /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-message-status__text",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, "Gagal terkirim"), /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    className: "rogu-message-status__icon",
    type: iconType[status] || IconTypes.ERROR,
    width: "18px",
    height: "18px"
  })));
}
MessageStatus.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  message: PropTypes__default["default"].shape({
    createdAt: PropTypes__default["default"].number,
    sender: PropTypes__default["default"].shape({
      friendName: PropTypes__default["default"].string,
      nickname: PropTypes__default["default"].string,
      userId: PropTypes__default["default"].string,
      profileUrl: PropTypes__default["default"].string
    }),
    sendingStatus: PropTypes__default["default"].string
  }),
  status: PropTypes__default["default"].string
};
MessageStatus.defaultProps = {
  className: '',
  message: null,
  status: ''
};

var IconButton = /*#__PURE__*/React__default$1["default"].forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
      disabled = props.disabled,
      width = props.width,
      height = props.height,
      type = props.type,
      _onClick = props.onClick,
      _onBlur = props.onBlur,
      style = props.style;

  var _useState = React$1.useState(''),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      pressed = _useState2[0],
      setPressed = _useState2[1];

  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/button-has-type
    React__default$1["default"].createElement("button", {
      className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-iconbutton', pressed]).join(' '),
      disabled: disabled,
      ref: ref,
      type: type // eslint-disable-line react/button-has-type
      ,
      style: LocalizationContext._objectSpread2(LocalizationContext._objectSpread2({}, style), {}, {
        height: height,
        width: width
      }),
      onClick: function onClick(e) {
        if (disabled) {
          return;
        }

        setPressed('sendbird-iconbutton--pressed');

        _onClick(e);
      },
      onBlur: function onBlur(e) {
        setPressed('');

        _onBlur(e);
      }
    }, /*#__PURE__*/React__default$1["default"].createElement("span", {
      className: "sendbird-iconbutton__inner"
    }, children))
  );
});
IconButton.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].element, PropTypes__default["default"].arrayOf(PropTypes__default["default"].element), PropTypes__default["default"].any]).isRequired,
  disabled: PropTypes__default["default"].bool,
  width: PropTypes__default["default"].string,
  height: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  onClick: PropTypes__default["default"].func,
  onBlur: PropTypes__default["default"].func,
  style: PropTypes__default["default"].shape({})
};
IconButton.defaultProps = {
  className: '',
  disabled: false,
  width: '56px',
  height: '56px',
  type: 'button',
  onClick: function onClick() {},
  onBlur: function onBlur() {},
  style: {}
};

function TextButton(_ref) {
  var className = _ref.className,
      color = _ref.color,
      disabled = _ref.disabled,
      underline = _ref.underline,
      onClick = _ref.onClick,
      children = _ref.children;
  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), [index$1.changeColorToClassName(color), 'rogu-text-button', underline ? 'rogu-text-button--no-underline' : '', disabled ? 'rogu-text-button--disabled' : '']).join(' '),
    role: "button",
    tabIndex: 0,
    onClick: onClick,
    onKeyPress: onClick
  }, children);
}
TextButton.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  color: PropTypes__default["default"].string,
  disabled: PropTypes__default["default"].bool,
  underline: PropTypes__default["default"].bool,
  onClick: PropTypes__default["default"].func,
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].element]).isRequired
};
TextButton.defaultProps = {
  className: '',
  color: index$1.Colors.ONBACKGROUND_1,
  disabled: false,
  underline: false,
  onClick: function onClick() {}
};

var http = /https?:\/\//;
function LinkLabel(_ref) {
  var className = _ref.className,
      src = _ref.src,
      type = _ref.type,
      color = _ref.color,
      children = _ref.children;
  var url = http.test(src) ? src : "http://".concat(src);
  return /*#__PURE__*/React__default$1["default"].createElement("a", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['rogu-link-label', color ? changeColorToClassName$1(color) : '']).join(' '),
    href: url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-link-label__label",
    type: type,
    color: color
  }, children));
}
LinkLabel.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  src: PropTypes__default["default"].string.isRequired,
  type: PropTypes__default["default"].oneOf(Object.keys(LabelTypography)).isRequired,
  color: PropTypes__default["default"].oneOf(Object.keys(LabelColors)).isRequired,
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].element, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string), PropTypes__default["default"].arrayOf(PropTypes__default["default"].element)]).isRequired
};
LinkLabel.defaultProps = {
  className: ''
};

function TextMessageItemBody$1(_a) {
  var className = _a.className,
      _b = _a.isByMe,
      isByMe = _b === void 0 ? false : _b,
      content = _a.content,
      _c = _a.mode,
      mode = _c === void 0 ? 'normal' : _c,
      _d = _a.isHidden,
      isHidden = _d === void 0 ? false : _d;
  var stringSet = React$1.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _e = React$1.useState('init'),
      clampState = _e[0],
      setClampState = _e[1];

  var textRef = React$1.useRef(null);
  React$1.useEffect(function () {
    if (textRef.current && textRef.current.scrollHeight > textRef.current.clientHeight) {
      setClampState('clamped');
    }
  }, [textRef.current]);

  function handleExpand() {
    setClampState('expanded');
  }

  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: index$1.getClassName([className, 'rogu-clamped-message-item-body', clampState == 'expanded' ? 'rogu-clamped-message-item-body--expanded' : '', !isByMe ? 'rogu-clamped-message-item-body--incoming' : '', mode === 'fileViewerCaption' ? 'rogu-clamped-message-item-body--viewer-mode' : '', mode === 'fileViewerCaption' && isHidden ? 'rogu-clamped-message-item-body--viewer-mode__hidden' : '', mode === 'thumbnailCaption' ? 'rogu-clamped-message-item-body--preview-mode' : ''])
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    ref: textRef,
    className: "rogu-clamped-message-item-body__inner"
  }, content === null || content === void 0 ? void 0 : content.split(/\r/).map(function (words, i) {
    return words === '' ? /*#__PURE__*/React__default$1["default"].createElement("br", {
      key: i
    }) : replaceUrlsWithLink(words);
  })), clampState === 'clamped' && /*#__PURE__*/React__default$1["default"].createElement(TextButton, {
    className: "rogu-clamped-message-item-body__read-more",
    onClick: handleExpand
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    type: LabelTypography.BODY_1
  }, stringSet.BUTTON__READ_MORE)));
}

function replaceUrlsWithLink(text) {
  var _a = extractUrls(text),
      urls = _a.urls,
      sentences = _a.sentences;

  var elements = [];
  sentences.forEach(function (sentence, i) {
    if (sentence !== '') {
      elements.push( /*#__PURE__*/React__default$1["default"].createElement(Label, {
        className: "rogu-text-message-item-body__message",
        color: LabelColors.ONBACKGROUND_1,
        key: LocalizationContext.uuidv4(),
        type: LabelTypography.BODY_1
      }, sentence));
    }

    var currentUrl = urls[i];

    if (currentUrl) {
      elements.push( /*#__PURE__*/React__default$1["default"].createElement(LinkLabel, {
        className: "rogu-text-message-item-body__message",
        color: LabelColors.SECONDARY_3,
        key: LocalizationContext.uuidv4(),
        src: currentUrl,
        type: LabelTypography.BODY_1
      }, currentUrl));
    }
  });
  return elements;
}

var colorSet = {
  "#DF4141": ["A", "B", "C", "D"],
  "#61CE5E": ["E", "F", "G", "H"],
  "#6073E2": ["I", "J", "K", "L"],
  "#F89825": ["M", "N", "O", "P"],
  "#2EB5C0": ["Q", "R", "S", "T"],
  "#BB58D0": ["U", "V", "W", "X"],
  "#00A5FF": ["Y", "Z"]
};
var generateColorFromString = function generateColorFromString(str) {
  var firstChar = str[0] || "";
  var normalizedFirstChar = firstChar.toUpperCase();
  var color = "inherit";

  for (var _i = 0, _a = Object.entries(colorSet); _i < _a.length; _i++) {
    var _b = _a[_i],
        hex = _b[0],
        chars = _b[1];

    if (chars.includes(normalizedFirstChar)) {
      color = hex;
      break;
    }
  }

  return color;
};

function RepliedAssignmentMessageItemBody(_a) {
  var body = _a.body,
      isByMe = _a.isByMe,
      nickname = _a.nickname,
      _b = _a.withCancelButton,
      withCancelButton = _b === void 0 ? false : _b,
      onCancel = _a.onCancel,
      _onClick = _a.onClick;
  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: index$1.getClassName(['rogu-replied-assignment-message-item-body', isByMe ? 'rogu-replied-assignment-message-item-body--outgoing' : 'rogu-replied-assignment-message-item-body--incoming']),
    role: "button",
    tabIndex: 0,
    onClick: function onClick(e) {
      if (_onClick) _onClick(e);
    }
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-replied-assignment-message-item-body__content"
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    className: 'rogu-replied-assignment-message-item-body__icon',
    type: IconTypes.ROGU_ASSIGNMENT,
    fillColor: IconColors.PRIMARY,
    width: "28px",
    height: "28px"
  }), /*#__PURE__*/React__default$1["default"].createElement("div", null, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-replied-assignment-message-item-body__content__nickname",
    color: LabelColors.ONBACKGROUND_2,
    style: {
      color: generateColorFromString(nickname || '')
    },
    type: LabelTypography.CAPTION_1
  }, nickname), /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-replied-assignment-message-item-body__content__message",
    color: LabelColors.ONBACKGROUND_1,
    type: LabelTypography.BODY_3
  }, body))), withCancelButton && /*#__PURE__*/React__default$1["default"].createElement(IconButton, {
    className: "rogu-replied-assignment-message-item-body__cancel",
    width: "24px",
    height: "24px",
    onClick: function onClick(e) {
      if (onCancel && typeof onCancel === 'function') {
        onCancel(e);
      }
    }
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    type: IconTypes.CLOSE,
    fillColor: IconColors.ON_BACKGROUND_1,
    width: "24px",
    height: "24px"
  })));
}

function RepliedFileMessageItemBody(_a) {
  var body = _a.body,
      isByMe = _a.isByMe,
      mimeType = _a.mimeType,
      nickname = _a.nickname,
      _b = _a.withCancelButton,
      withCancelButton = _b === void 0 ? false : _b,
      onCancel = _a.onCancel,
      _onClick = _a.onClick;
  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: index$1.getClassName(['rogu-replied-file-message-item-body', isByMe ? 'rogu-replied-file-message-item-body--outgoing' : 'rogu-replied-file-message-item-body--incoming']),
    role: "button",
    tabIndex: 0,
    onClick: function onClick(e) {
      if (_onClick) _onClick(e);
    }
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-replied-file-message-item-body__content"
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    className: 'rogu-replied-file-message-item-body__icon',
    type: {
      WORD: IconTypes.ROGU_FILE_WORD,
      EXCEL: IconTypes.ROGU_FILE_EXCEL,
      POWERPOINT: IconTypes.ROGU_FILE_POWERPOINT,
      PDF: IconTypes.ROGU_FILE_PDF,
      OTHERS: IconTypes.ROGU_FILE_OTHERS
    }[getFileType(mimeType)],
    fillColor: IconColors.PRIMARY,
    width: "28px",
    height: "28px"
  }), /*#__PURE__*/React__default$1["default"].createElement("div", null, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-replied-file-message-item-body__content__nickname",
    color: LabelColors.ONBACKGROUND_2,
    style: {
      color: generateColorFromString(nickname || '')
    },
    type: LabelTypography.CAPTION_1
  }, nickname), /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-replied-file-message-item-body__content__message",
    color: LabelColors.ONBACKGROUND_1,
    type: LabelTypography.BODY_3
  }, body))), withCancelButton && /*#__PURE__*/React__default$1["default"].createElement(IconButton, {
    className: "rogu-replied-file-message-item-body__cancel",
    width: "24px",
    height: "24px",
    onClick: function onClick(e) {
      if (onCancel && typeof onCancel === 'function') {
        onCancel(e);
      }
    }
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    type: IconTypes.CLOSE,
    fillColor: IconColors.ON_BACKGROUND_1,
    width: "24px",
    height: "24px"
  })));
}

function RepliedMaterialMessageItemBody(_a) {
  var body = _a.body,
      isByMe = _a.isByMe,
      nickname = _a.nickname,
      _b = _a.withCancelButton,
      withCancelButton = _b === void 0 ? false : _b,
      onCancel = _a.onCancel,
      _onClick = _a.onClick;
  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: index$1.getClassName(['rogu-replied-material-message-item-body', isByMe ? 'rogu-replied-material-message-item-body--outgoing' : 'rogu-replied-material-message-item-body--incoming']),
    role: "button",
    tabIndex: 0,
    onClick: function onClick(e) {
      if (_onClick) _onClick(e);
    }
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-replied-material-message-item-body__content"
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    className: 'rogu-replied-material-message-item-body__icon',
    type: IconTypes.ROGU_MATERIAL,
    fillColor: IconColors.PRIMARY,
    width: "28px",
    height: "28px"
  }), /*#__PURE__*/React__default$1["default"].createElement("div", null, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-replied-material-message-item-body__content__nickname",
    color: LabelColors.ONBACKGROUND_2,
    style: {
      color: generateColorFromString(nickname || '')
    },
    type: LabelTypography.CAPTION_1
  }, nickname), /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-replied-material-message-item-body__content__message",
    color: LabelColors.ONBACKGROUND_1,
    type: LabelTypography.BODY_3
  }, body))), withCancelButton && /*#__PURE__*/React__default$1["default"].createElement(IconButton, {
    className: "rogu-replied-material-message-item-body__cancel",
    width: "24px",
    height: "24px",
    onClick: function onClick(e) {
      if (onCancel && typeof onCancel === 'function') {
        onCancel(e);
      }
    }
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    type: IconTypes.CLOSE,
    fillColor: IconColors.ON_BACKGROUND_1,
    width: "24px",
    height: "24px"
  })));
}

/*
  ImageRenderer displays image with url or source
  it checks if the source exist with img tag first
  if it exists onLoad is called, if not onError is called
  and those properties switch img tag to real purposing element
*/
// TODO: Set up the official constant of width and height with DesignTeam

function ImageRenderer(_ref) {
  var className = _ref.className,
      url = _ref.url,
      alt = _ref.alt,
      width = _ref.width,
      height = _ref.height,
      defaultComponent = _ref.defaultComponent,
      circle = _ref.circle,
      placeHolder = _ref.placeHolder;

  var _useState = React$1.useState(false),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      showDefaultComponent = _useState2[0],
      setShowDefaultComponent = _useState2[1];

  var _useState3 = React$1.useState(true),
      _useState4 = LocalizationContext._slicedToArray(_useState3, 2),
      showPlaceHolder = _useState4[0],
      setShowPlaceHolder = _useState4[1];

  var DefaultComponent = React$1.useMemo(function () {
    if (typeof defaultComponent === 'function') {
      return defaultComponent();
    }

    return defaultComponent;
  }, [defaultComponent]);
  var PlaceHolder = React$1.useMemo(function () {
    if (placeHolder && typeof placeHolder === 'function') {
      return placeHolder({
        style: {
          width: '100%',
          minWidth: width,
          height: height,
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      });
    }

    return null;
  }, [placeHolder]);
  var HiddenImageLoader = React$1.useMemo(function () {
    setShowDefaultComponent(false); // reset the state when url is changed

    return /*#__PURE__*/React__default$1["default"].createElement("img", {
      className: "rogu-image-renderer__hidden-image-loader",
      src: url,
      alt: alt,
      onLoad: function onLoad() {
        return setShowPlaceHolder(false);
      },
      onError: function onError() {
        return setShowDefaultComponent(true);
      }
    });
  }, [url]);
  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['rogu-image-renderer']).join(' ')
  }, showPlaceHolder && PlaceHolder, showDefaultComponent ? DefaultComponent : /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-image-renderer__image",
    style: {
      backgroundImage: "url(".concat(url, ")"),
      borderRadius: circle ? '50%' : null
    }
  }), HiddenImageLoader);
}
ImageRenderer.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].arrayOf(PropTypes__default["default"].string), PropTypes__default["default"].string]),
  url: PropTypes__default["default"].string.isRequired,
  alt: PropTypes__default["default"].string,
  width: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  height: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  defaultComponent: PropTypes__default["default"].oneOfType([PropTypes__default["default"].element, PropTypes__default["default"].func]),
  placeHolder: PropTypes__default["default"].func,
  circle: PropTypes__default["default"].bool
};
ImageRenderer.defaultProps = {
  className: '',
  defaultComponent: null,
  placeHolder: null,
  alt: '',
  width: null,
  height: null,
  circle: false
};

function RepliedMediaMessageItemBody(_a) {
  var body = _a.body,
      isByMe = _a.isByMe,
      mimeType = _a.mimeType,
      nickname = _a.nickname,
      mediaUrl = _a.mediaUrl,
      _b = _a.withCancelButton,
      withCancelButton = _b === void 0 ? false : _b,
      onCancel = _a.onCancel,
      _onClick = _a.onClick;
  var stringSet = React$1.useContext(LocalizationContext.LocalizationContext).stringSet;
  var content = '';
  if (body && body !== 'EMPTY_MESSAGE' && !isVideo(mimeType)) content = body;else if (isImage(mimeType)) content = stringSet.LABEL__IMAGE;else if (isVideo(mimeType)) content = stringSet.LABEL__VIDEO;
  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: index$1.getClassName(['rogu-replied-media-message-item-body', isByMe ? 'rogu-replied-media-message-item-body--outgoing' : 'rogu-replied-media-message-item-body--incoming']),
    role: "button",
    tabIndex: 0,
    onClick: function onClick(e) {
      if (_onClick) _onClick(e);
    }
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-media-message-item-body__metadata"
  }, mediaUrl && isImage(mimeType) && /*#__PURE__*/React__default$1["default"].createElement(ImageRenderer, {
    className: "rogu-media-message-item-body__reply-image",
    url: mediaUrl,
    alt: "placeholder"
  }), mediaUrl && isVideo(mimeType) && /*#__PURE__*/React__default$1["default"].createElement("video", {
    className: "rogu-media-message-item-body__reply-image"
  }, /*#__PURE__*/React__default$1["default"].createElement("source", {
    src: mediaUrl,
    type: mimeType
  })), /*#__PURE__*/React__default$1["default"].createElement("div", null, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-message-content__sender-name",
    color: LabelColors.ONBACKGROUND_2,
    style: {
      color: generateColorFromString(nickname || '')
    },
    type: LabelTypography.CAPTION_1
  }, nickname), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-media-message-item-body__caption-container"
  }, mediaUrl && /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    className: "rogu-media-message-item-body__caption-icon",
    type: isImage(mimeType) ? IconTypes.ROGU_IMAGE : IconTypes.ROGU_VIDEO,
    width: "18px",
    height: "18px"
  }), /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-media-message-item-body__reply-message",
    color: LabelColors.ONBACKGROUND_1,
    type: LabelTypography.BODY_3
  }, content)))), withCancelButton && /*#__PURE__*/React__default$1["default"].createElement(IconButton, {
    className: "rogu-replied-media-message-item-body__cancel",
    width: "24px",
    height: "24px",
    onClick: function onClick(e) {
      if (onCancel && typeof onCancel === 'function') {
        onCancel(e);
      }
    }
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    type: IconTypes.CLOSE,
    fillColor: IconColors.ON_BACKGROUND_1,
    width: "24px",
    height: "24px"
  })));
}

function RepliedTextMessageItemBody(_a) {
  var content = _a.content,
      isByMe = _a.isByMe,
      nickname = _a.nickname,
      _b = _a.withCancelButton,
      withCancelButton = _b === void 0 ? false : _b,
      onCancel = _a.onCancel,
      _onClick = _a.onClick;
  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: index$1.getClassName(['rogu-replied-text-message-item-body', isByMe ? 'rogu-replied-text-message-item-body--outgoing' : 'rogu-replied-text-message-item-body--incoming']),
    role: "button",
    tabIndex: 0,
    onClick: function onClick(e) {
      if (_onClick) _onClick(e);
    }
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-replied-text-message-item-body__content"
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-replied-text-message-item-body__content__nickname",
    color: LabelColors.ONBACKGROUND_2,
    style: {
      color: generateColorFromString(nickname || '')
    },
    type: LabelTypography.CAPTION_1
  }, nickname), /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-replied-text-message-item-body__content__message",
    color: LabelColors.ONBACKGROUND_1,
    type: LabelTypography.BODY_3
  }, content)), withCancelButton && /*#__PURE__*/React__default$1["default"].createElement(IconButton, {
    className: "rogu-replied-text-message-item-body__cancel",
    width: "24px",
    height: "24px",
    onClick: function onClick(e) {
      if (onCancel && typeof onCancel === 'function') {
        onCancel(e);
      }
    }
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    type: IconTypes.CLOSE,
    fillColor: IconColors.ON_BACKGROUND_1,
    width: "24px",
    height: "24px"
  })));
}

function RepliedMessageItemBody(_a) {
  var body = _a.body,
      isByMe = _a.isByMe,
      mimeType = _a.mimeType,
      nickname = _a.nickname,
      type = _a.type,
      onClick = _a.onClick,
      _b = _a.mediaUrl,
      mediaUrl = _b === void 0 ? '' : _b;

  switch (type) {
    case index$1.RepliedMessageType.Text:
      return /*#__PURE__*/React__default$1["default"].createElement(RepliedTextMessageItemBody, {
        isByMe: isByMe,
        nickname: nickname,
        content: body,
        onClick: onClick
      });

    case index$1.RepliedMessageType.File:
      return /*#__PURE__*/React__default$1["default"].createElement(RepliedFileMessageItemBody, {
        body: body,
        isByMe: isByMe,
        mimeType: mimeType,
        nickname: nickname,
        onClick: onClick
      });

    case index$1.RepliedMessageType.Image:
    case index$1.RepliedMessageType.Video:
      return /*#__PURE__*/React__default$1["default"].createElement(RepliedMediaMessageItemBody, {
        body: body,
        isByMe: isByMe,
        mimeType: mimeType,
        nickname: nickname,
        onClick: onClick,
        mediaUrl: mediaUrl
      });

    case index$1.RepliedMessageType.Assignment:
      return /*#__PURE__*/React__default$1["default"].createElement(RepliedAssignmentMessageItemBody, {
        body: body,
        isByMe: isByMe,
        nickname: nickname,
        onClick: onClick
      });

    case index$1.RepliedMessageType.Material:
      return /*#__PURE__*/React__default$1["default"].createElement(RepliedMaterialMessageItemBody, {
        body: body,
        isByMe: isByMe,
        nickname: nickname,
        onClick: onClick
      });

    default:
      return null;
  }
}

function OGMessageItemBody(_a) {
  var _b, _c, _d, _e, _f, _g, _h, _j;

  var className = _a.className,
      _k = _a.isByMe,
      isByMe = _k === void 0 ? false : _k,
      _l = _a.isOnPreview,
      isOnPreview = _l === void 0 ? false : _l,
      message = _a.message,
      _m = _a.mouseHover,
      mouseHover = _m === void 0 ? false : _m,
      onClickRepliedMessage = _a.onClickRepliedMessage,
      onClosePreview = _a.onClosePreview;
  var messageBody = message.message;
  var repliedMessageBody = '';
  var repliedMessageCreatedAt = 0;
  var repliedMessageId = '';
  var repliedMessageMediaUrl = '';
  var repliedMessageMimeType = '*';
  var repliedMessageNickname = '';
  var repliedMessageType = index$1.RepliedMessageType.Text;
  var hasRepliedMessage = isReplyingMessage(message);

  if (hasRepliedMessage) {
    var _o = index$1.formatedStringToRepliedMessage(messageBody),
        originalMessage = _o.originalMessage,
        parentMessageBody = _o.parentMessageBody,
        parentMessageNickname = _o.parentMessageNickname;

    var repliedMessage = index$1.metaArraysToRepliedMessage(message.metaArrays);
    messageBody = originalMessage;
    repliedMessageBody = parentMessageBody;
    repliedMessageCreatedAt = repliedMessage.parentMessageCreatedAt;
    repliedMessageId = repliedMessage.parentMessageId;
    repliedMessageMediaUrl = repliedMessage.parentMessageMediaUrl;
    repliedMessageMimeType = repliedMessage.parentMessageMimeType;
    repliedMessageNickname = parentMessageNickname;
    repliedMessageType = repliedMessage.parentMessageType;
  }

  var handleScrollToRepliedMessage = function handleScrollToRepliedMessage() {
    if (hasRepliedMessage && onClickRepliedMessage && typeof onClickRepliedMessage === 'function') {
      onClickRepliedMessage(Number(repliedMessageCreatedAt), Number(repliedMessageId));
    }
  };

  var handleOpenOGUrl = function handleOpenOGUrl() {
    var _a, _b;

    if ((_a = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _a === void 0 ? void 0 : _a.url) window.open((_b = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _b === void 0 ? void 0 : _b.url);
  };

  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: index$1.getClassName([className, 'rogu-og-message-item-body', isByMe ? 'rogu-og-message--outgoing' : 'rogu-og-message--incoming', isOnPreview ? 'rogu-og-message-item-body--preview' : '', mouseHover ? 'mouse-hover' : '', ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 ? 'rogu-og-message-reactions' : ''])
  }, hasRepliedMessage && /*#__PURE__*/React__default$1["default"].createElement(RepliedMessageItemBody, {
    body: repliedMessageBody,
    isByMe: isByMe,
    mimeType: repliedMessageMimeType,
    nickname: repliedMessageNickname,
    type: repliedMessageType,
    onClick: function onClick() {
      return handleScrollToRepliedMessage();
    },
    mediaUrl: repliedMessageMediaUrl
  }), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-og-message-item-body__og-wrapper"
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-og-message-item-body__og-container",
    onClick: handleOpenOGUrl,
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-og-message-item-body__og-thumbnail"
  }, /*#__PURE__*/React__default$1["default"].createElement(index$2.ImageRenderer, {
    className: "rogu-og-message-item-body__og-thumbnail__image",
    url: ((_d = (_c = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _c === void 0 ? void 0 : _c.defaultImage) === null || _d === void 0 ? void 0 : _d.url) || '',
    alt: (_f = (_e = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _e === void 0 ? void 0 : _e.defaultImage) === null || _f === void 0 ? void 0 : _f.alt,
    width: "60px",
    height: "60px",
    defaultComponent: /*#__PURE__*/React__default$1["default"].createElement("div", {
      className: "rogu-og-message-item-body__og-thumbnail__place-holder"
    }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
      className: "rogu-og-message-item-body__og-thumbnail__place-holder__icon",
      type: IconTypes.THUMBNAIL_NONE,
      width: "60px",
      height: "60px"
    }))
  })), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-og-message-item-body__description"
  }, ((_g = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _g === void 0 ? void 0 : _g.title) && /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-og-message-item-body__description__title",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1
  }, message.ogMetaData.title), ((_h = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _h === void 0 ? void 0 : _h.description) && /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-og-message-item-body__description__description",
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_1
  }, message.ogMetaData.description), ((_j = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _j === void 0 ? void 0 : _j.url) && /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-og-message-item-body__description__url",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, message.ogMetaData.url))), isOnPreview && /*#__PURE__*/React__default$1["default"].createElement(IconButton, {
    className: "sendbird-chat-header__right__search",
    width: "32px",
    height: "32px",
    onClick: onClosePreview
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    type: IconTypes.CLOSE,
    fillColor: IconColors.ON_BACKGROUND_1,
    width: "24px",
    height: "24px"
  }))), /*#__PURE__*/React__default$1["default"].createElement(TextMessageItemBody$1, {
    className: className,
    isByMe: isByMe,
    content: messageBody
  }));
}

function FileMessageItemBody(_a) {
  var className = _a.className,
      message = _a.message,
      _b = _a.isByMe,
      isByMe = _b === void 0 ? false : _b;
  var stringSet = React$1.useContext(LocalizationContext.LocalizationContext).stringSet;
  return /*#__PURE__*/React__default$1["default"].createElement("a", {
    className: index$1.getClassName([className, 'rogu-file-message-item-body', isByMe ? 'rogu-file-message-item-body--outgoing' : 'rogu-file-message-item-body--incoming']),
    href: message.plainUrl,
    target: "_blank",
    rel: "noreferrer"
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    className: 'rogu-file-message-item-body__icon',
    type: {
      WORD: IconTypes.ROGU_FILE_WORD,
      EXCEL: IconTypes.ROGU_FILE_EXCEL,
      POWERPOINT: IconTypes.ROGU_FILE_POWERPOINT,
      PDF: IconTypes.ROGU_FILE_PDF,
      OTHERS: IconTypes.ROGU_FILE_OTHERS
    }[getFileType(message === null || message === void 0 ? void 0 : message.type)],
    fillColor: IconColors.PRIMARY,
    width: "28px",
    height: "28px"
  }), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-file-message-item-body__content"
  }, message.name && /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-file-message-item-body__name",
    color: LabelColors.ONBACKGROUND_1,
    type: LabelTypography.SUBTITLE_2
  }, message.name), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-file-message-item-body__meta"
  }, message.size && /*#__PURE__*/React__default$1["default"].createElement(Label, {
    color: LabelColors.ONBACKGROUND_2,
    type: LabelTypography.BODY_2
  }, formatBytes(message.size) + " \xB7 "), /*#__PURE__*/React__default$1["default"].createElement(Label, {
    color: LabelColors.ONBACKGROUND_2,
    type: LabelTypography.BODY_2
  }, getMimeExtension(message.type) || stringSet.LABEL__OTHER))));
}

function ThumbnailMessageItemBody(_a) {
  var _b, _c;

  var className = _a.className,
      message = _a.message,
      _d = _a.isByMe,
      isByMe = _d === void 0 ? false : _d,
      _e = _a.mouseHover,
      mouseHover = _e === void 0 ? false : _e,
      showFileViewer = _a.showFileViewer,
      _f = _a.isClickable,
      isClickable = _f === void 0 ? true : _f,
      onClickRepliedMessage = _a.onClickRepliedMessage;
  var _g = message.thumbnails,
      thumbnails = _g === void 0 ? [] : _g;
  var thumbnailUrl = thumbnails.length > 0 ? (_b = thumbnails[0]) === null || _b === void 0 ? void 0 : _b.url : '';
  var hasRepliedMessage = isReplyingMessage(message);

  var renderRepliedMessage = function renderRepliedMessage() {
    var _a = index$1.metaArraysToRepliedMessage(message.metaArrays),
        parentMessageBody = _a.parentMessageBody,
        parentMessageCreatedAt = _a.parentMessageCreatedAt,
        parentMessageId = _a.parentMessageId,
        parentMessageMediaUrl = _a.parentMessageMediaUrl,
        parentMessageMimeType = _a.parentMessageMimeType,
        parentMessageNickname = _a.parentMessageNickname,
        parentMessageType = _a.parentMessageType;

    return /*#__PURE__*/React__default$1["default"].createElement(RepliedMessageItemBody, {
      body: parentMessageBody,
      isByMe: isByMe,
      mediaUrl: parentMessageMediaUrl,
      mimeType: parentMessageMimeType,
      nickname: parentMessageNickname,
      type: parentMessageType,
      onClick: function onClick() {
        if (onClickRepliedMessage && typeof onClickRepliedMessage === 'function') {
          onClickRepliedMessage(Number(parentMessageCreatedAt), Number(parentMessageId));
        }
      }
    });
  };

  return /*#__PURE__*/React__default$1["default"].createElement(React__default$1["default"].Fragment, null, hasRepliedMessage && renderRepliedMessage(), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: index$1.getClassName([className, 'rogu-thumbnail-message-item-body', isByMe ? 'outgoing' : 'incoming', mouseHover ? 'mouse-hover' : '', ((_c = message === null || message === void 0 ? void 0 : message.reactions) === null || _c === void 0 ? void 0 : _c.length) > 0 ? 'reactions' : '']),
    onClick: function onClick() {
      if (isClickable) showFileViewer(true);
    }
  }, /*#__PURE__*/React__default$1["default"].createElement(ImageRenderer, {
    className: "rogu-thumbnail-message-item-body__thumbnail",
    url: thumbnailUrl || (message === null || message === void 0 ? void 0 : message.url),
    alt: message === null || message === void 0 ? void 0 : message.type,
    width: "100%",
    height: "270px",
    placeHolder: function placeHolder(style) {
      return /*#__PURE__*/React__default$1["default"].createElement("div", {
        className: "rogu-thumbnail-message-item-body__placeholder",
        style: style
      }, /*#__PURE__*/React__default$1["default"].createElement("div", {
        className: "rogu-thumbnail-message-item-body__placeholder__icon"
      }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
        type: index$1.isVideoMessage(message) ? IconTypes.PLAY : IconTypes.PHOTO,
        fillColor: IconColors.ON_BACKGROUND_2,
        width: "34px",
        height: "34px"
      })));
    }
  }), index$1.isVideoMessage(message) && !thumbnailUrl && /*#__PURE__*/React__default$1["default"].createElement("video", {
    className: "rogu-thumbnail-message-item-body__video"
  }, /*#__PURE__*/React__default$1["default"].createElement("source", {
    src: message === null || message === void 0 ? void 0 : message.url,
    type: message === null || message === void 0 ? void 0 : message.type
  })), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-thumbnail-message-item-body__image-cover"
  }), (index$1.isVideoMessage(message) || index$1.isGifMessage(message)) && /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-thumbnail-message-item-body__icon-wrapper"
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-thumbnail-message-item-body__icon-wrapper__icon"
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    type: index$1.isVideoMessage(message) ? IconTypes.PLAY : IconTypes.GIF,
    fillColor: IconColors.ON_BACKGROUND_2,
    width: "34px",
    height: "34px"
  })))), message.name && message.name !== 'EMPTY_MESSAGE' && /*#__PURE__*/React__default$1["default"].createElement(TextMessageItemBody$1, {
    isByMe: isByMe,
    mode: "thumbnailCaption",
    content: message.name
  }));
}

function TextMessageItemBody(_a) {
  var className = _a.className,
      _b = _a.isByMe,
      isByMe = _b === void 0 ? false : _b,
      message = _a.message,
      onClickRepliedMessage = _a.onClickRepliedMessage;
  var messageBody = message.message;
  var repliedMessageBody = '';
  var repliedMessageCreatedAt = 0;
  var repliedMessageId = '';
  var repliedMessageMediaUrl = '';
  var repliedMessageMimeType = '*';
  var repliedMessageNickname = '';
  var repliedMessageType = index$1.RepliedMessageType.Text;
  var hasRepliedMessage = isReplyingMessage(message);

  if (hasRepliedMessage) {
    var _c = index$1.formatedStringToRepliedMessage(messageBody),
        originalMessage = _c.originalMessage,
        parentMessageBody = _c.parentMessageBody,
        parentMessageNickname = _c.parentMessageNickname;

    var repliedMessage = index$1.metaArraysToRepliedMessage(message.metaArrays);
    messageBody = originalMessage;
    repliedMessageBody = parentMessageBody;
    repliedMessageCreatedAt = repliedMessage.parentMessageCreatedAt;
    repliedMessageId = repliedMessage.parentMessageId;
    repliedMessageMediaUrl = repliedMessage.parentMessageMediaUrl;
    repliedMessageMimeType = repliedMessage.parentMessageMimeType;
    repliedMessageNickname = parentMessageNickname;
    repliedMessageType = repliedMessage.parentMessageType;
  }

  var handleScrollToRepliedMessage = function handleScrollToRepliedMessage() {
    if (hasRepliedMessage && onClickRepliedMessage && typeof onClickRepliedMessage === 'function') {
      onClickRepliedMessage(Number(repliedMessageCreatedAt), Number(repliedMessageId));
    }
  };

  return /*#__PURE__*/React__default$1["default"].createElement(React__default$1["default"].Fragment, null, hasRepliedMessage && /*#__PURE__*/React__default$1["default"].createElement(RepliedMessageItemBody, {
    body: repliedMessageBody,
    isByMe: isByMe,
    mimeType: repliedMessageMimeType,
    nickname: repliedMessageNickname,
    type: repliedMessageType,
    onClick: function onClick() {
      return handleScrollToRepliedMessage();
    },
    mediaUrl: repliedMessageMediaUrl
  }), /*#__PURE__*/React__default$1["default"].createElement(TextMessageItemBody$1, {
    className: className,
    isByMe: isByMe,
    content: messageBody
  }));
}

function AdminMessage(_ref) {
  var className = _ref.className,
      message = _ref.message;

  if (!(message.isAdminMessage || message.messageType) || !message.isAdminMessage() || message.messageType !== 'admin') {
    return null;
  }

  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['rogu-admin-message']).join(' ')
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-admin-message__container"
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-admin-message__text",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_1
  }, message.message)));
}
AdminMessage.propTypes = {
  message: PropTypes__default["default"].shape({
    message: PropTypes__default["default"].string,
    messageType: PropTypes__default["default"].string,
    isAdminMessage: PropTypes__default["default"].func
  }),
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)])
};
AdminMessage.defaultProps = {
  message: {},
  className: ''
};

function AssignmentMessageItemBody(_a) {
  var _b;

  var className = _a.className,
      message = _a.message,
      isByMe = _a.isByMe,
      _c = _a.mouseHover,
      mouseHover = _c === void 0 ? false : _c;
  var stringSet = React$1.useContext(LocalizationContext.LocalizationContext).stringSet;
  var assignmentData = JSON.parse(message === null || message === void 0 ? void 0 : message.data);

  var openAssignment = function openAssignment() {
    if ((assignmentData === null || assignmentData === void 0 ? void 0 : assignmentData.ctaWeb) && (assignmentData === null || assignmentData === void 0 ? void 0 : assignmentData.ctaWeb.length) > 0) {
      window.open((assignmentData === null || assignmentData === void 0 ? void 0 : assignmentData.ctaWeb) + "?from=chatroom");
    } else {
      window.open(index$1.convertCtaLinkToWebLink(assignmentData === null || assignmentData === void 0 ? void 0 : assignmentData.cta, "assignment"));
    }
  };

  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: index$1.getClassName([className, 'rogu-assignment-message-item-body', isByMe ? 'rogu-assignment-message-item-body--outgoing' : 'rogu-assignment-message-item-body--incoming', mouseHover ? 'mouse-hover' : '', ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 ? 'reactions' : ''])
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    role: "button",
    tabIndex: 0,
    className: "rogu-assignment-message-item-body__container",
    onClick: openAssignment,
    onKeyPress: openAssignment
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    className: "rogu-assignment-message-item-body__icon",
    type: IconTypes.ROGU_ASSIGNMENT,
    width: "30",
    height: "30"
  }), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-assignment-message-item-body__text-container"
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-assignment-message-item-body__text-title",
    color: LabelColors.ONBACKGROUND_1,
    type: LabelTypography.SUBTITLE_2
  }, assignmentData === null || assignmentData === void 0 ? void 0 : assignmentData.title), /*#__PURE__*/React__default$1["default"].createElement("div", null, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    color: LabelColors.ONBACKGROUND_2,
    type: LabelTypography.BODY_2
  }, stringSet.ASSIGNMENT), (assignmentData === null || assignmentData === void 0 ? void 0 : assignmentData.dueAt) && (assignmentData === null || assignmentData === void 0 ? void 0 : assignmentData.dueAt.length) > 0 && /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-assignment-message-item-body__text-deadline",
    color: LabelColors.ONBACKGROUND_2,
    type: LabelTypography.BODY_2
  }, stringSet.ASSIGNMENT_DEADLINE + " " + index$1.convertAssignmentDueUTCtoLocale(assignmentData === null || assignmentData === void 0 ? void 0 : assignmentData.dueAt))))));
}

function MaterialMessageItemBody(_a) {
  var _b;

  var className = _a.className,
      message = _a.message,
      isByMe = _a.isByMe;
  var stringSet = React$1.useContext(LocalizationContext.LocalizationContext).stringSet;
  var materialData = JSON.parse(message === null || message === void 0 ? void 0 : message.data);

  var openMaterial = function openMaterial() {
    if ((materialData === null || materialData === void 0 ? void 0 : materialData.ctaWeb) && (materialData === null || materialData === void 0 ? void 0 : materialData.ctaWeb.length) > 0) {
      window.open((materialData === null || materialData === void 0 ? void 0 : materialData.ctaWeb) + "?from=chatroom");
    } else {
      window.open(index$1.convertCtaLinkToWebLink(materialData === null || materialData === void 0 ? void 0 : materialData.cta, "material"));
    }
  };

  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: index$1.getClassName([className, "rogu-material-message-item-body", isByMe ? 'rogu-material-message-item-body--outgoing' : 'rogu-material-message-item-body--incoming', ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 ? 'reactions' : ''])
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-material-message-item-body__container",
    onClick: openMaterial
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    className: "rogu-material-message-item-body__icon",
    type: IconTypes.ROGU_MATERIAL,
    width: "30",
    height: "30"
  }), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-material-message-item-body__text-container"
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-material-message-item-body__text-title",
    color: LabelColors.ONBACKGROUND_1,
    type: LabelTypography.SUBTITLE_2
  }, materialData === null || materialData === void 0 ? void 0 : materialData.title), /*#__PURE__*/React__default$1["default"].createElement(Label, {
    color: LabelColors.ONBACKGROUND_2,
    type: LabelTypography.BODY_2
  }, stringSet.MATERIAL))));
}

var MenuItems$1 = /*#__PURE__*/function (_Component) {
  LocalizationContext._inherits(MenuItems, _Component);

  var _super = LocalizationContext._createSuper(MenuItems);

  function MenuItems(props) {
    var _this;

    LocalizationContext._classCallCheck(this, MenuItems);

    _this = _super.call(this, props);

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "showParent", function () {
      var _this$props$parentCon = _this.props.parentContainRef,
          parentContainRef = _this$props$parentCon === void 0 ? {} : _this$props$parentCon;
      var current = parentContainRef.current;

      if (parentContainRef && current) {
        current.classList.add('rogu-icon--pressed');
      }
    });

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "hideParent", function () {
      var _this$props$parentCon2 = _this.props.parentContainRef,
          parentContainRef = _this$props$parentCon2 === void 0 ? {} : _this$props$parentCon2;
      var current = parentContainRef.current;

      if (parentContainRef && current) {
        current.classList.remove('rogu-icon--pressed');
      }
    });

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "setupEvents", function () {
      var closeDropdown = _this.props.closeDropdown;

      var _assertThisInitialize = LocalizationContext._assertThisInitialized(_this),
          menuRef = _assertThisInitialize.menuRef;

      var handleClickOutside = function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          closeDropdown();
        }
      };

      _this.setState({
        handleClickOutside: handleClickOutside
      });

      document.addEventListener('mousedown', handleClickOutside);
    });

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "cleanUpEvents", function () {
      var handleClickOutside = _this.state.handleClickOutside;
      document.removeEventListener('mousedown', handleClickOutside);
    });

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "getMenuPosition", function () {
      var _this$props = _this.props,
          parentRef = _this$props.parentRef,
          openLeft = _this$props.openLeft;
      var parentRect = parentRef.current.getBoundingClientRect();
      var x = parentRect.x || parentRect.left;
      var y = parentRect.y || parentRect.top;
      var menuStyle = {
        top: y,
        left: x
      };
      if (!_this.menuRef.current) return menuStyle;
      var _window = window,
          innerWidth = _window.innerWidth,
          innerHeight = _window.innerHeight;

      var rect = _this.menuRef.current.getBoundingClientRect();

      if (y + rect.height > innerHeight) {
        menuStyle.top -= rect.height;
      }

      if (x + rect.width > innerWidth && !openLeft) {
        menuStyle.left -= rect.width;
      }

      if (menuStyle.top < 0) {
        menuStyle.top = rect.height < innerHeight ? (innerHeight - rect.height) / 2 : 0;
      }

      if (menuStyle.left < 0) {
        menuStyle.left = rect.width < innerWidth ? (innerWidth - rect.width) / 2 : 0;
      }

      menuStyle.top += 32;

      if (openLeft) {
        var padding = Number.isNaN(rect.width - 30) ? 108 // default
        : rect.width - 30;
        menuStyle.left -= padding;
      }

      return _this.setState({
        menuStyle: menuStyle
      });
    });

    _this.menuRef = /*#__PURE__*/React__default$1["default"].createRef();
    _this.state = {
      menuStyle: {},
      handleClickOutside: function handleClickOutside() {}
    };
    return _this;
  }

  LocalizationContext._createClass(MenuItems, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setupEvents();
      this.getMenuPosition();
      this.showParent();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cleanUpEvents();
      this.hideParent();
    }
  }, {
    key: "render",
    value: function render() {
      var menuStyle = this.state.menuStyle;
      var _this$props2 = this.props,
          children = _this$props2.children,
          style = _this$props2.style;
      return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/React__default$1["default"].createElement(React__default$1["default"].Fragment, null, /*#__PURE__*/React__default$1["default"].createElement("div", {
        className: "rogu-dropdown__menu-backdrop"
      }), /*#__PURE__*/React__default$1["default"].createElement("ul", {
        className: "rogu-dropdown__menu",
        ref: this.menuRef,
        style: LocalizationContext._objectSpread2({
          display: 'inline-block',
          position: 'fixed',
          left: "".concat(Math.round(menuStyle.left), "px"),
          top: "".concat(Math.round(menuStyle.top), "px")
        }, style)
      }, children)), document.getElementById('sendbird-dropdown-portal'));
    }
  }]);

  return MenuItems;
}(React$1.Component);
MenuItems$1.propTypes = {
  closeDropdown: PropTypes__default["default"].func.isRequired,
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].element, PropTypes__default["default"].arrayOf(PropTypes__default["default"].element)]).isRequired,
  style: PropTypes__default["default"].shape({}),
  // https://stackoverflow.com/a/51127130
  parentRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].func, PropTypes__default["default"].shape({
    current: PropTypes__default["default"].instanceOf(Element)
  })]).isRequired,
  parentContainRef: PropTypes__default["default"].oneOfType([PropTypes__default["default"].func, PropTypes__default["default"].shape({
    current: PropTypes__default["default"].instanceOf(Element)
  })]).isRequired,
  openLeft: PropTypes__default["default"].bool
};
MenuItems$1.defaultProps = {
  style: {},
  openLeft: false
};

var ENTER = 13;
var MenuItems = MenuItems$1;
var MenuItem = function MenuItem(_ref) {
  var className = _ref.className,
      children = _ref.children,
      onClick = _ref.onClick,
      disable = _ref.disable,
      iconType = _ref.iconType;

  var handleClickEvent = function handleClickEvent(e) {
    if (!disable) onClick(e);
  };

  return /*#__PURE__*/React__default$1["default"].createElement("li", {
    className: index$1.getClassName([className, 'rogu-dropdown__menu-item', disable ? 'disable' : '']),
    role: "menuitem",
    onClick: handleClickEvent,
    onKeyPress: function onKeyPress(e) {
      if (e.keyCode === ENTER) handleClickEvent(e);
    },
    tabIndex: 0
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    className: "rogu-dropdown__menu-item-icon",
    type: iconType,
    fillColor: disable ? IconColors.ON_BACKGROUND_3 : IconColors.ON_BACKGROUND_1,
    width: "18px",
    height: "18px"
  }), /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-dropdown__menu-item__text",
    type: LabelTypography.BUTTON_2,
    color: disable ? LabelColors.ONBACKGROUND_4 : LabelColors.ONBACKGROUND_1
  }, children));
};
MenuItem.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].element]).isRequired,
  onClick: PropTypes__default["default"].func.isRequired,
  disable: PropTypes__default["default"].func,
  iconType: IconTypes
};
MenuItem.defaultProps = {
  className: '',
  disable: false,
  iconType: IconTypes.ADD
}; // Root components should be appended before ContextMenu is rendered
function ContextMenu(_ref2) {
  var menuTrigger = _ref2.menuTrigger,
      menuItems = _ref2.menuItems;

  var _useState = React$1.useState(false),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      showMenu = _useState2[0],
      setShowMenu = _useState2[1];

  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "sendbird-context-menu",
    style: {
      display: 'inline'
    }
  }, menuTrigger(function () {
    return setShowMenu(!showMenu);
  }), showMenu && menuItems(function () {
    return setShowMenu(false);
  }));
}
ContextMenu.propTypes = {
  menuTrigger: PropTypes__default["default"].func.isRequired,
  menuItems: PropTypes__default["default"].func.isRequired
};

function Toast(_ref) {
  var message = _ref.message;
  return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-fileviewer__toast__message show"
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    type: LabelTypography.BODY_3,
    color: LabelColors.ONBACKGROUND_5
  }, message)), document.getElementById('rogu-toast-root'));
}
Toast.propTypes = {
  message: PropTypes__default["default"].string.isRequired
};

function MessageItemMenu(_a) {
  var className = _a.className,
      message = _a.message,
      channel = _a.channel,
      isByMe = _a.isByMe,
      disabled = _a.disabled;
      _a.showEdit;
      var showRemove = _a.showRemove,
      showReply = _a.showReply,
      resendMessage = _a.resendMessage,
      setSupposedHover = _a.setSupposedHover,
      showFileViewer = _a.showFileViewer;
  var stringSet = React$1.useContext(LocalizationContext.LocalizationContext).stringSet;

  var _b = React$1.useState(false),
      showToast = _b[0],
      setShowToast = _b[1];

  var triggerRef = React$1.useRef(null);
  var containerRef = React$1.useRef(null);
  var showMenuItemCopy = index$1.isUserMessage(message);
  var showMenuItemReply = index$1.isUserMessage(message) || index$1.isFileMessage(message);
  var showMenuItemResend = index$1.isFailedMessage(channel, message) && message.isResendable() && isByMe;
  var showMenuItemDelete = index$1.isSentMessage(channel, message) && isByMe;
  var showMenuItemEdit = false   ;
  var showMenuItemView = index$1.isFileMessage(message);

  if (!(showMenuItemCopy || showMenuItemEdit || showMenuItemResend || showMenuItemDelete || showMenuItemView)) {
    return null;
  }

  var onCopyClick = function onCopyClick(message) {
    index$1.copyToClipboard(message);
    setShowToast(true);
    setTimeout(function () {
      setShowToast(false);
    }, 3000);
  };

  var onOpenFile = function onOpenFile(message) {
    window.open(message.url);
  };

  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: index$1.getClassName([className, 'rogu-message-item-menu']),
    ref: containerRef
  }, /*#__PURE__*/React__default$1["default"].createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default$1["default"].createElement(index$1.IconButton, {
        className: "rogu-message-item-menu__trigger",
        ref: triggerRef,
        width: "16px",
        height: "16px",
        onClick: function onClick() {
          toggleDropdown();
          if (setSupposedHover && typeof setSupposedHover === 'function') setSupposedHover(true);
        },
        onBlur: function onBlur() {
          if (setSupposedHover && typeof setSupposedHover === 'function') setSupposedHover(false);
        }
      }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
        className: "rogu-message-item-menu__trigger__icon",
        type: IconTypes.CHEVRON_DOWN,
        fillColor: IconColors.ON_BACKGROUND_3,
        width: "18px",
        height: "18px"
      }));
    },
    menuItems: function menuItems(close) {
      var _a;

      var closeDropdown = function closeDropdown() {
        close();
        if (setSupposedHover && typeof setSupposedHover === 'function') setSupposedHover(false);
      };

      return /*#__PURE__*/React__default$1["default"].createElement(MenuItems, {
        className: "rogu-message-item-menu__list",
        parentRef: triggerRef,
        parentContainRef: containerRef,
        closeDropdown: closeDropdown,
        openLeft: isByMe
      }, showMenuItemReply && /*#__PURE__*/React__default$1["default"].createElement(MenuItem, {
        className: "rogu-message-item-menu__list__menu-item",
        onClick: function onClick() {
          if (!disabled && showReply && typeof showReply == 'function') {
            showReply(true);
            closeDropdown();
          }
        },
        disable: (message === null || message === void 0 ? void 0 : message.parentMessageId) > 0,
        iconType: IconTypes.ROGU_REPLY
      }, stringSet.MESSAGE_MENU__REPLY), showMenuItemCopy && /*#__PURE__*/React__default$1["default"].createElement(MenuItem, {
        className: "rogu-message-item-menu__list__menu-item",
        onClick: function onClick() {
          var _a;

          onCopyClick((_a = message) === null || _a === void 0 ? void 0 : _a.message);
          closeDropdown();
        },
        iconType: IconTypes.ROGU_COPY
      }, stringSet.MESSAGE_MENU__COPY), showMenuItemView && /*#__PURE__*/React__default$1["default"].createElement(MenuItem, {
        className: "rogu-message-item-menu__list__menu-item",
        onClick: function onClick() {
          if (index$1.isThumbnailMessage(message)) {
            showFileViewer(true);
          } else {
            onOpenFile(message);
          }

          closeDropdown();
        },
        iconType: IconTypes.ROGU_VIEW
      }, stringSet.MESSAGE_MENU__VIEW), showMenuItemEdit , showMenuItemResend && /*#__PURE__*/React__default$1["default"].createElement(MenuItem, {
        className: "rogu-message-item-menu__list__menu-item",
        onClick: function onClick() {
          if (!disabled) {
            resendMessage(message);
            closeDropdown();
          }
        },
        iconType: IconTypes.ROGU_RESEND
      }, stringSet.MESSAGE_MENU__RESEND), showMenuItemDelete && /*#__PURE__*/React__default$1["default"].createElement(MenuItem, {
        className: "rogu-message-item-menu__list__menu-item",
        onClick: function onClick() {
          if (!disabled) {
            showRemove(true);
            closeDropdown();
          }
        },
        disable: ((_a = message === null || message === void 0 ? void 0 : message.threadInfo) === null || _a === void 0 ? void 0 : _a.replyCount) > 0,
        iconType: IconTypes.ROGU_DELETE
      }, stringSet.MESSAGE_MENU__DELETE));
    }
  }), showToast && /*#__PURE__*/React__default$1["default"].createElement(Toast, {
    message: stringSet.TOAST__COPY
  }));
}

/**
 * TODO:
 *
 * [x] Add created at to the metaarray
 * [ ] Handle click, scroll to the replied message
 * [ ] Add highlight upon click
 */
function MessageContent(_a) {
  var _b, _c, _d;

  var channel = _a.channel,
      _e = _a.chainBottom,
      chainBottom = _e === void 0 ? false : _e,
      _f = _a.chainTop,
      chainTop = _f === void 0 ? false : _f,
      className = _a.className,
      message = _a.message,
      // nicknamesMap,
  userId = _a.userId,
      // useReaction = false,
  // useReplying,
  scrollToMessage = _a.scrollToMessage,
      showEdit = _a.showEdit,
      showFileViewer = _a.showFileViewer,
      showRemove = _a.showRemove,
      showReply = _a.showReply,
      resendMessage = _a.resendMessage,
      _g = _a.disabled,
      disabled = _g === void 0 ? false : _g;
  var stringSet = React$1.useContext(LocalizationContext.LocalizationContext).stringSet;
  var messageTypes = index$1.getUIKitMessageTypes();
  var avatarRef = React$1.useRef(null);
  var isByMe = index$1.isPendingMessage(channel, message) || !index$1.isSentMessage(channel, message) || index$1.isMessageSentByMe(userId, message);
  var isOperatorMessage = index$1.isMessageSentByOperator(message);
  var isByMeClassName = isByMe ? 'rogu-message-content--outgoing' : 'rogu-message-content--incoming';
  var chainBottomClassName = chainBottom ? 'rogu-message-content--chain-bottom' : '';
  var chainTopClassName = chainTop ? 'rogu-message-content--chain-top' : '';

  if (((_b = message === null || message === void 0 ? void 0 : message.isAdminMessage) === null || _b === void 0 ? void 0 : _b.call(message)) || (message === null || message === void 0 ? void 0 : message.messageType) === 'admin') {
    return /*#__PURE__*/React__default$1["default"].createElement(AdminMessage, {
      message: message
    });
  }

  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: index$1.getClassName([className, 'rogu-message-content', isByMeClassName, chainBottomClassName, chainTopClassName])
  }, !isByMe && !chainTop && /*#__PURE__*/React__default$1["default"].createElement(index$2.Avatar, {
    className: "rogu-message-content__avatar",
    src: ((_c = message === null || message === void 0 ? void 0 : message.sender) === null || _c === void 0 ? void 0 : _c.profileUrl) || '',
    ref: avatarRef,
    height: "32px",
    width: "32px"
  }), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-message-content__content"
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-message-content__bubble"
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-message-content__bubble__header"
  }, !isByMe && !chainTop && /*#__PURE__*/React__default$1["default"].createElement(React__default$1["default"].Fragment, null, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-message-content__id-container"
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-message-content__sender-name",
    color: LabelColors.ONBACKGROUND_2,
    style: {
      color: generateColorFromString(((_d = message === null || message === void 0 ? void 0 : message.sender) === null || _d === void 0 ? void 0 : _d.nickname) || '')
    },
    type: LabelTypography.CAPTION_1
  }, index$1.getSenderName(message)), isOperatorMessage && !chainTop && /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-message-content__operator-label",
    type: LabelTypography.CAPTION_3
  }, stringSet.LABEL__OPERATOR)), !channel.isFrozen && /*#__PURE__*/React__default$1["default"].createElement(MessageItemMenu, {
    className: "rogu-message-content__menu",
    channel: channel,
    message: message,
    isByMe: isByMe,
    disabled: disabled,
    showEdit: showEdit,
    showRemove: showRemove,
    resendMessage: resendMessage,
    showFileViewer: showFileViewer,
    showReply: showReply
  }))), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-message-content__bubble__body"
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-message-content__bubble__body__inner"
  }, index$1.isTextMessage(message) && /*#__PURE__*/React__default$1["default"].createElement(TextMessageItemBody, {
    isByMe: isByMe,
    message: message,
    onClickRepliedMessage: scrollToMessage
  }), index$1.isOGMessage(message) && /*#__PURE__*/React__default$1["default"].createElement(OGMessageItemBody, {
    message: message,
    isByMe: isByMe,
    onClickRepliedMessage: scrollToMessage
  }), index$1.isAssignmentMessage(message.customType) && /*#__PURE__*/React__default$1["default"].createElement(AssignmentMessageItemBody, {
    message: message,
    isByMe: isByMe
  }), index$1.isMaterialMessage(message.customType) && /*#__PURE__*/React__default$1["default"].createElement(MaterialMessageItemBody, {
    message: message,
    isByMe: isByMe
  }), index$1.getUIKitMessageType(message) === messageTypes.FILE && /*#__PURE__*/React__default$1["default"].createElement(FileMessageItemBody, {
    message: message,
    isByMe: isByMe
  }), isThumbnailMessage(message) && /*#__PURE__*/React__default$1["default"].createElement(ThumbnailMessageItemBody, {
    message: message,
    isByMe: isByMe,
    showFileViewer: showFileViewer,
    isClickable: index$1.getOutgoingMessageState(channel, message) !== index$1.OutgoingMessageStates.PENDING,
    onClickRepliedMessage: scrollToMessage
  }), index$1.getUIKitMessageType(message) === messageTypes.UNKNOWN && /*#__PURE__*/React__default$1["default"].createElement(Channel.UnknownMessageItemBody, {
    message: message,
    isByMe: isByMe
  })), (!isByMe && chainTop || isByMe) && !channel.isFrozen && /*#__PURE__*/React__default$1["default"].createElement(MessageItemMenu, {
    className: "rogu-message-content__menu",
    channel: channel,
    message: message,
    isByMe: isByMe,
    disabled: disabled,
    showEdit: showEdit,
    showRemove: showRemove,
    resendMessage: resendMessage,
    showFileViewer: showFileViewer,
    showReply: showReply
  }))), !chainBottom && /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: 'rogu-message-content__misc'
  }, isByMe ? /*#__PURE__*/React__default$1["default"].createElement(MessageStatus, {
    message: message,
    status: index$1.getOutgoingMessageState(channel, message)
  }) : /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: 'rogu-message-content__created-at',
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, index$1.getMessageCreatedAt(message)))));
}

var Type = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  DANGER: 'DANGER',
  DISABLED: 'DISABLED'
};
var Size = {
  BIG: 'BIG',
  SMALL: 'SMALL'
};

function changeTypeToClassName(type) {
  switch (type) {
    case Type.PRIMARY:
      return 'rogu-button--primary';

    case Type.SECONDARY:
      return 'rogu-button--secondary';

    case Type.DANGER:
      return 'rogu-button--danger';

    case Type.DISABLED:
      return 'rogu-button--disabled';

    default:
      return null;
  }
}
function changeSizeToClassName(size) {
  switch (size) {
    case Size.BIG:
      return 'rogu-button--big';

    case Size.SMALL:
      return 'rogu-button--small';

    default:
      return null;
  }
}

function Button(_ref) {
  var className = _ref.className,
      type = _ref.type,
      size = _ref.size,
      children = _ref.children,
      disabled = _ref.disabled,
      onClick = _ref.onClick;
  var injectingClassNames = [].concat(LocalizationContext._toConsumableArray(Array.isArray(className) ? className : [className]), ['rogu-button', disabled ? 'rogu-button__disabled' : '', changeTypeToClassName(type), changeSizeToClassName(size)]).join(' ');
  return /*#__PURE__*/React__default$1["default"].createElement("button", {
    className: injectingClassNames,
    type: "button",
    onClick: onClick,
    disabled: disabled
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-button__text",
    type: LabelTypography.BODY_3,
    color: LabelColors.ONCONTENT_1
  }, children));
}
var ButtonTypes = Type;
Button.propTypes = {
  className: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)]),
  type: PropTypes__default["default"].oneOf(Object.keys(Type)),
  size: PropTypes__default["default"].oneOf(Object.keys(Size)),
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].element, PropTypes__default["default"].arrayOf(PropTypes__default["default"].element)]),
  disabled: PropTypes__default["default"].bool,
  onClick: PropTypes__default["default"].func
};
Button.defaultProps = {
  className: '',
  type: Type.PRIMARY,
  size: Size.BIG,
  children: 'Button',
  disabled: false,
  onClick: function onClick() {}
};

var ModalHeader = function ModalHeader(_ref) {
  var titleText = _ref.titleText;
  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-modal__header"
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-modal__title",
    type: LabelTypography.H_3,
    color: LabelColors.ONBACKGROUND_1
  }, titleText));
};
ModalHeader.propTypes = {
  titleText: PropTypes__default["default"].string.isRequired
};
var ModalBody = function ModalBody(_ref2) {
  var children = _ref2.children;
  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-modal__body"
  }, children);
};
ModalBody.propTypes = {
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].element.isRequired, PropTypes__default["default"].arrayOf(PropTypes__default["default"].element.isRequired)])
};
ModalBody.defaultProps = {
  children: null
};
var ModalFooter = function ModalFooter(_ref3) {
  var onSubmit = _ref3.onSubmit,
      onCancel = _ref3.onCancel,
      _ref3$disabled = _ref3.disabled,
      disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
      submitText = _ref3.submitText;

  var _useContext = React$1.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-modal__footer"
  }, /*#__PURE__*/React__default$1["default"].createElement(Button, {
    className: "rogu-modal-button",
    type: ButtonTypes.SECONDARY,
    disabled: disabled,
    onClick: onSubmit
  }, submitText), /*#__PURE__*/React__default$1["default"].createElement(Button, {
    className: "rogu-modal-button",
    type: ButtonTypes.PRIMARY,
    onClick: onCancel
  }, stringSet.BUTTON__CANCEL));
};
ModalFooter.propTypes = {
  onCancel: PropTypes__default["default"].func.isRequired,
  onSubmit: PropTypes__default["default"].func.isRequired,
  submitText: PropTypes__default["default"].string.isRequired,
  disabled: PropTypes__default["default"].bool
};
ModalFooter.defaultProps = {
  disabled: false
};

function Modal(props) {
  var children = props.children,
      onCancel = props.onCancel,
      onSubmit = props.onSubmit,
      disabled = props.disabled,
      submitText = props.submitText,
      titleText = props.titleText,
      hideFooter = props.hideFooter,
      isWithClose = props.isWithClose;
  return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-modal"
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-modal__content"
  }, /*#__PURE__*/React__default$1["default"].createElement(ModalHeader, {
    titleText: titleText
  }), /*#__PURE__*/React__default$1["default"].createElement(ModalBody, null, children), !hideFooter && /*#__PURE__*/React__default$1["default"].createElement(ModalFooter, {
    disabled: disabled,
    onCancel: onCancel,
    onSubmit: onSubmit,
    submitText: submitText
  }), isWithClose && /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-modal__close"
  }, /*#__PURE__*/React__default$1["default"].createElement(IconButton, {
    width: "32px",
    height: "32px",
    onClick: onCancel
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    type: IconTypes.ROGU_CLOSE,
    fillColor: IconColors.DEFAULT,
    width: "24px",
    height: "24px"
  })))), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-modal__backdrop"
  })), document.getElementById(index$1.MODAL_ROOT));
}

Modal.propTypes = {
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].element, PropTypes__default["default"].arrayOf(PropTypes__default["default"].element)]),
  onCancel: PropTypes__default["default"].func.isRequired,
  onSubmit: PropTypes__default["default"].func.isRequired,
  hideFooter: PropTypes__default["default"].bool,
  disabled: PropTypes__default["default"].bool,
  type: PropTypes__default["default"].string,
  isWithClose: PropTypes__default["default"].bool
};
Modal.defaultProps = {
  children: null,
  hideFooter: false,
  disabled: false,
  type: ButtonTypes.DANGER,
  isWithClose: true
};

var RemoveMessage = function RemoveMessage(props) {
  var onCloseModal = props.onCloseModal,
      onDeleteMessage = props.onDeleteMessage;

  var _useContext = React$1.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  return /*#__PURE__*/React__default$1["default"].createElement(Modal, {
    onCancel: onCloseModal,
    onSubmit: onDeleteMessage,
    submitText: "Delete",
    titleText: stringSet.ROGU__MODAL__DELETE_MESSAGE__TITLE,
    isWithClose: false
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-delete-message__subtitle",
    type: LabelTypography.BODY_3,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.ROGU__MODAL__DELETE_MESSAGE__SUBTITLE));
};

RemoveMessage.propTypes = {
  onCloseModal: PropTypes__default["default"].func.isRequired,
  onDeleteMessage: PropTypes__default["default"].func.isRequired
};

var imageRendererClassName = 'sendbird-avatar-img';

var DefaultComponent = function DefaultComponent(_a) {
  var width = _a.width,
      height = _a.height;
  var iconWidth = index$2.pxToNumber(width);
  var iconHeight = index$2.pxToNumber(height);

  if (typeof iconWidth === 'number') {
    iconWidth *= 0.575;
  }

  if (typeof iconHeight === 'number') {
    iconHeight *= 0.575;
  }

  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "sendbird-avatar-img--default",
    style: {
      width: width,
      height: height
    }
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    type: IconTypes.USER,
    fillColor: IconColors.CONTENT,
    width: iconWidth,
    height: iconHeight
  }));
};

var _defaultComponent = function _defaultComponent(_a) {
  var width = _a.width,
      height = _a.height;
  return /*#__PURE__*/React__default$1["default"].createElement(DefaultComponent, {
    width: width,
    height: height
  });
};

var AvatarInner = function AvatarInner(_a) {
  var _b = _a.src,
      src = _b === void 0 ? '' : _b,
      _c = _a.alt,
      alt = _c === void 0 ? '' : _c,
      height = _a.height,
      width = _a.width,
      customDefaultComponent = _a.customDefaultComponent;

  var defaultComponent = function defaultComponent() {
    return customDefaultComponent ? customDefaultComponent({
      width: width,
      height: height
    }) : _defaultComponent({
      width: width,
      height: height
    });
  };

  if (typeof src === 'string') {
    return /*#__PURE__*/React__default$1["default"].createElement(ImageRenderer, {
      className: imageRendererClassName,
      url: src,
      height: height,
      width: width,
      alt: alt,
      defaultComponent: defaultComponent
    });
  }

  if (src && src.length) {
    if (src.length === 1) {
      return /*#__PURE__*/React__default$1["default"].createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[0],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      });
    }

    if (src.length === 2) {
      return /*#__PURE__*/React__default$1["default"].createElement("div", {
        className: "sendbird-avatar--inner__two-child"
      }, /*#__PURE__*/React__default$1["default"].createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[0],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      }), /*#__PURE__*/React__default$1["default"].createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[1],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      }));
    }

    if (src.length === 3) {
      return /*#__PURE__*/React__default$1["default"].createElement(React__default$1["default"].Fragment, null, /*#__PURE__*/React__default$1["default"].createElement("div", {
        className: "sendbird-avatar--inner__three-child--upper"
      }, /*#__PURE__*/React__default$1["default"].createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[0],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      })), /*#__PURE__*/React__default$1["default"].createElement("div", {
        className: "sendbird-avatar--inner__three-child--lower"
      }, /*#__PURE__*/React__default$1["default"].createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[1],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      }), /*#__PURE__*/React__default$1["default"].createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: src[2],
        height: height,
        width: width,
        alt: alt,
        defaultComponent: defaultComponent
      })));
    }

    return /*#__PURE__*/React__default$1["default"].createElement("div", {
      className: "sendbird-avatar--inner__four-child"
    }, src.slice(0, 4).map(function (i) {
      return /*#__PURE__*/React__default$1["default"].createElement(ImageRenderer, {
        className: imageRendererClassName,
        url: i,
        height: height,
        width: width,
        alt: alt,
        key: LocalizationContext.uuidv4(),
        defaultComponent: defaultComponent
      });
    }));
  } // default img


  return /*#__PURE__*/React__default$1["default"].createElement(ImageRenderer, {
    className: imageRendererClassName,
    url: "",
    height: height,
    width: width,
    alt: alt,
    defaultComponent: defaultComponent
  });
};

function Avatar(_a, ref) {
  var _b = _a.className,
      className = _b === void 0 ? '' : _b,
      _c = _a.src,
      src = _c === void 0 ? '' : _c,
      _d = _a.alt,
      alt = _d === void 0 ? '' : _d,
      _e = _a.width,
      width = _e === void 0 ? '56px' : _e,
      _f = _a.height,
      height = _f === void 0 ? '56px' : _f,
      onClick = _a.onClick,
      customDefaultComponent = _a.customDefaultComponent;
  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: LocalizationContext.__spreadArray(LocalizationContext.__spreadArray([], Array.isArray(className) ? className : [className], true), ['sendbird-avatar'], false).join(' '),
    role: "button",
    ref: ref,
    style: {
      height: height,
      width: width
    },
    onClick: onClick,
    onKeyDown: onClick,
    tabIndex: 0
  }, /*#__PURE__*/React__default$1["default"].createElement(AvatarInner, {
    src: src,
    width: width,
    height: height,
    alt: alt,
    customDefaultComponent: customDefaultComponent
  }));
}

var Avatar$1 = /*#__PURE__*/React__default$1["default"].forwardRef(Avatar);

var FileViewerComponent = function FileViewerComponent(_ref) {
  var profileUrl = _ref.profileUrl,
      userName = _ref.userName,
      captionMsg = _ref.captionMsg,
      type = _ref.type,
      url = _ref.url,
      isByMe = _ref.isByMe,
      isPreview = _ref.isPreview,
      onClose = _ref.onClose,
      onDelete = _ref.onDelete,
      createdAt = _ref.createdAt;

  var _useContext = React$1.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  var _useState = React$1.useState(false),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      showToast = _useState2[0],
      setShowToast = _useState2[1];

  var _useState3 = React$1.useState(false),
      _useState4 = LocalizationContext._slicedToArray(_useState3, 2),
      isCaptionHidden = _useState4[0],
      setIsCaptionHidden = _useState4[1];

  var contentRef = React$1.useRef();

  var onMediaFocus = function onMediaFocus() {
    setIsCaptionHidden(true);
  };

  var onMediaBlur = function onMediaBlur() {
    setIsCaptionHidden(false);
  };

  var onDownloadClick = function onDownloadClick() {
    setShowToast(true);
    setTimeout(function () {
      setShowToast(false);
    }, 3000);
  };

  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-fileviewer"
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-fileviewer__header"
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-fileviewer__header__left"
  }, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-fileviewer__header__left__avatar"
  }, /*#__PURE__*/React__default$1["default"].createElement(Avatar$1, {
    height: "32px",
    width: "32px",
    src: profileUrl
  })), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-fileviewer__header__left__metadata"
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-fileviewer__header__left__sender-name",
    type: LabelTypography.H_3,
    color: LabelColors.ONBACKGROUND_1
  }, userName), !isPreview && /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-fileviewer__header__left__createdat",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, dateFns.format(createdAt, 'dd/MM/yyyy HH.mm')))), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-fileviewer__header__right"
  }, !isPreview && isSupportedFileView(type) && /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-fileviewer__header__right__actions"
  }, /*#__PURE__*/React__default$1["default"].createElement("a", {
    className: "rogu-fileviewer__header__right__actions__download",
    rel: "noopener noreferrer",
    href: url,
    onClick: onDownloadClick,
    target: "_blank"
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    type: IconTypes.ROGU_DOWNLOAD,
    height: "24px",
    width: "24px"
  })), onDelete && isByMe && /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-fileviewer__header__right__actions__delete"
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    type: IconTypes.ROGU_DELETE,
    height: "24px",
    width: "24px",
    onClick: onDelete
  }))), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-fileviewer__header__right__actions__close"
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    type: IconTypes.ROGU_CLOSE,
    height: "24px",
    width: "24px",
    onClick: onClose
  })))), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-fileviewer__content"
  }, isVideo(type) &&
  /*#__PURE__*/
  // eslint-disable-next-line jsx-a11y/media-has-caption
  React__default$1["default"].createElement("video", {
    onFocus: onMediaFocus,
    onBlur: onMediaBlur,
    controls: true,
    className: "rogu-fileviewer__content__video",
    ref: contentRef
  }, /*#__PURE__*/React__default$1["default"].createElement("source", {
    src: url,
    type: type
  })), isImage(type) && /*#__PURE__*/React__default$1["default"].createElement("img", {
    onFocus: onMediaFocus,
    onBlur: onMediaBlur // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    ,
    tabIndex: "0",
    ref: contentRef,
    src: url,
    alt: "Uploaded by ".concat(userName),
    className: "rogu-fileviewer__content__img"
  }), !isPreview && captionMsg && /*#__PURE__*/React__default$1["default"].createElement(TextMessageItemBody$1, {
    content: captionMsg,
    mode: "fileViewerCaption",
    isHidden: isCaptionHidden
  }), !isSupportedFileView(type) && /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-fileviewer__content__unsupported"
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    type: LabelTypography.H_1,
    color: LabelColors.ONBACKGROUND_1
  }, "Unsupported message"))), showToast && /*#__PURE__*/React__default$1["default"].createElement(Toast, {
    message: stringSet.TOAST__DOWNLOAD
  }));
};
FileViewerComponent.propTypes = {
  profileUrl: PropTypes__default["default"].string.isRequired,
  userName: PropTypes__default["default"].string.isRequired,
  type: PropTypes__default["default"].string.isRequired,
  url: PropTypes__default["default"].string.isRequired,
  captionMsg: PropTypes__default["default"].string.isRequired,
  onClose: PropTypes__default["default"].func.isRequired,
  onDelete: PropTypes__default["default"].func.isRequired,
  isByMe: PropTypes__default["default"].bool,
  isPreview: PropTypes__default["default"].bool,
  createdAt: PropTypes__default["default"].number
};
FileViewerComponent.defaultProps = {
  isByMe: true,
  isPreview: false,
  createdAt: new Date().getTime()
};
function FileViewer(props) {
  var message = props.message,
      isByMe = props.isByMe,
      isPreview = props.isPreview,
      onClose = props.onClose,
      onDelete = props.onDelete;
  var sender = message.sender,
      type = message.type,
      url = message.url,
      _message$name = message.name,
      captionMsg = _message$name === void 0 ? '' : _message$name,
      createdAt = message.createdAt;
  var profileUrl = sender.profileUrl,
      _sender$nickname = sender.nickname,
      userName = _sender$nickname === void 0 ? '' : _sender$nickname;
  return /*#__PURE__*/reactDom.createPortal( /*#__PURE__*/React__default$1["default"].createElement(FileViewerComponent, {
    profileUrl: profileUrl,
    userName: userName,
    type: type,
    url: url,
    captionMsg: captionMsg,
    onClose: onClose,
    onDelete: onDelete,
    isByMe: isByMe,
    isPreview: isPreview,
    createdAt: createdAt
  }), document.getElementById(index$1.MODAL_ROOT));
}
FileViewer.propTypes = {
  message: PropTypes__default["default"].shape({
    sender: PropTypes__default["default"].shape({
      profileUrl: PropTypes__default["default"].string,
      userName: PropTypes__default["default"].string
    }),
    type: PropTypes__default["default"].string,
    url: PropTypes__default["default"].string,
    fileName: PropTypes__default["default"].string,
    createdAt: PropTypes__default["default"].number
  }).isRequired,
  isByMe: PropTypes__default["default"].bool,
  isPreview: PropTypes__default["default"].bool,
  onClose: PropTypes__default["default"].func.isRequired,
  onDelete: PropTypes__default["default"].func.isRequired
};
FileViewer.defaultProps = {
  isByMe: true,
  isPreview: false
};

function MessageHoc(_ref) {
  var message = _ref.message,
      userId = _ref.userId,
      disabled = _ref.disabled,
      deleteMessage = _ref.deleteMessage,
      scrollToMessage = _ref.scrollToMessage,
      resendMessage = _ref.resendMessage,
      useReaction = _ref.useReaction,
      chainTop = _ref.chainTop,
      chainBottom = _ref.chainBottom,
      membersMap = _ref.membersMap,
      emojiContainer = _ref.emojiContainer,
      highLightedMessageId = _ref.highLightedMessageId,
      toggleReaction = _ref.toggleReaction,
      renderCustomMessage = _ref.renderCustomMessage,
      currentGroupChannel = _ref.currentGroupChannel,
      onReplyMessage = _ref.onReplyMessage;
  var _message$sender = message.sender,
      sender = _message$sender === void 0 ? {} : _message$sender; // const [showEdit, setShowEdit] = useState(false);

  var _useState = React$1.useState(false),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      showRemove = _useState2[0],
      setShowRemove = _useState2[1];

  var _useState3 = React$1.useState(false),
      _useState4 = LocalizationContext._slicedToArray(_useState3, 2),
      showFileViewer = _useState4[0],
      setShowFileViewer = _useState4[1];

  var _useState5 = React$1.useState(false),
      _useState6 = LocalizationContext._slicedToArray(_useState5, 2),
      isHighlighted = _useState6[0],
      setAsHighlighted = _useState6[1]; // const editMessageInputRef = useRef(null);


  var useMessageScrollRef = React$1.useRef(null);
  React$1.useLayoutEffect(function () {
    if (highLightedMessageId === message.messageId) {
      if (useMessageScrollRef && useMessageScrollRef.current) {
        useMessageScrollRef.current.scrollIntoView({
          behavior: 'smooth',
          // iOS Safari incompatible (https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)
          block: 'center',
          inline: 'center'
        });
        setTimeout(function () {
          setAsHighlighted(true);
        }, 500);
      }
    } else {
      setAsHighlighted(false);
    }
  }, [highLightedMessageId, useMessageScrollRef.current, message.messageId]);
  var RenderedMessage = React$1.useMemo(function () {
    if (renderCustomMessage) {
      return renderCustomMessage(message, currentGroupChannel, chainTop, chainBottom); // TODO: Let's change this to object type on next major version up
      // and add params 'hasSeparator' and 'menuDisabled', scrollToMessage
    }

    return null;
  }, [message, message.message, renderCustomMessage]);
  var isByMe = userId === sender.userId || message.requestState === 'pending' || message.requestState === 'failed';

  if (RenderedMessage) {
    return /*#__PURE__*/React__default$1["default"].createElement("div", {
      ref: useMessageScrollRef,
      className: index$1.getClassName(['rogu-message-hoc', chainBottom ? 'rogu-message-hoc--chain-bottom' : '', isHighlighted ? 'rogu-message-hoc--highlighted' : ''])
    }, /*#__PURE__*/React__default$1["default"].createElement(RenderedMessage, {
      className: "rogu-message-hoc__message-content",
      message: message
    }));
  }

  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    ref: useMessageScrollRef,
    className: index$1.getClassName(['rogu-message-hoc', chainBottom ? 'rogu-message-hoc--chain-bottom' : '', isHighlighted ? 'rogu-message-hoc--highlighted' : ''])
  }, /*#__PURE__*/React__default$1["default"].createElement(MessageContent, {
    className: "rogu-message-hoc__message-content",
    userId: userId,
    scrollToMessage: scrollToMessage,
    channel: currentGroupChannel,
    message: message,
    disabled: disabled,
    chainTop: chainTop,
    chainBottom: chainBottom,
    useReaction: useReaction // useReplying={} TODO: Set useReplying
    ,
    nicknamesMap: membersMap,
    emojiContainer: emojiContainer // showEdit={setShowEdit}
    ,
    showRemove: setShowRemove,
    showFileViewer: setShowFileViewer,
    showReply: function showReply() {
      return onReplyMessage(message);
    },
    resendMessage: resendMessage,
    toggleReaction: toggleReaction
  }), showRemove && /*#__PURE__*/React__default$1["default"].createElement(RemoveMessage, {
    onCloseModal: function onCloseModal() {
      return setShowRemove(false);
    },
    onDeleteMessage: function onDeleteMessage() {
      deleteMessage(message);
    }
  }), showFileViewer && /*#__PURE__*/React__default$1["default"].createElement(FileViewer, {
    onClose: function onClose() {
      return setShowFileViewer(false);
    },
    message: message,
    onDelete: function onDelete() {
      deleteMessage(message, function () {
        setShowFileViewer(false);
      });
    },
    isByMe: isByMe
  }));
}
MessageHoc.propTypes = {
  userId: PropTypes__default["default"].string,
  message: PropTypes__default["default"].shape({
    isFileMessage: PropTypes__default["default"].func,
    isAdminMessage: PropTypes__default["default"].func,
    isUserMessage: PropTypes__default["default"].func,
    isDateseparator: PropTypes__default["default"].func,
    // should be a number, but there's a bug in SDK shich returns string
    messageId: PropTypes__default["default"].number,
    type: PropTypes__default["default"].string,
    createdAt: PropTypes__default["default"].number,
    message: PropTypes__default["default"].string,
    requestState: PropTypes__default["default"].string,
    messageType: PropTypes__default["default"].string,
    sender: PropTypes__default["default"].shape({
      userId: PropTypes__default["default"].string
    }),
    ogMetaData: PropTypes__default["default"].shape({})
  }),
  highLightedMessageId: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  renderCustomMessage: PropTypes__default["default"].func,
  currentGroupChannel: PropTypes__default["default"].shape({}),
  // hasSeparator: PropTypes.bool,
  disabled: PropTypes__default["default"].bool,
  // editDisabled: PropTypes.bool,
  deleteMessage: PropTypes__default["default"].func.isRequired,
  scrollToMessage: PropTypes__default["default"].func,
  // updateMessage: PropTypes.func.isRequired,
  resendMessage: PropTypes__default["default"].func.isRequired,
  useReaction: PropTypes__default["default"].bool.isRequired,
  chainTop: PropTypes__default["default"].bool.isRequired,
  chainBottom: PropTypes__default["default"].bool.isRequired,
  membersMap: PropTypes__default["default"].instanceOf(Map).isRequired,
  emojiContainer: PropTypes__default["default"].shape({
    emojiCategories: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
      emojis: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
        key: PropTypes__default["default"].string,
        url: PropTypes__default["default"].string
      }))
    }))
  }),
  toggleReaction: PropTypes__default["default"].func,
  onReplyMessage: PropTypes__default["default"].func
};
MessageHoc.defaultProps = {
  userId: '',
  // editDisabled: false,
  renderCustomMessage: null,
  currentGroupChannel: {},
  message: {},
  // hasSeparator: false,
  disabled: false,
  highLightedMessageId: null,
  toggleReaction: function toggleReaction() {},
  scrollToMessage: function scrollToMessage() {},
  onReplyMessage: function onReplyMessage() {},
  emojiContainer: {}
};

var getDateSeparatorDifference = function getDateSeparatorDifference(createdAt, strings) {
  var diffWithToday = dateFns.differenceInCalendarDays(new Date(), createdAt);

  if (diffWithToday === 0) {
    return strings.today;
  } else if (diffWithToday === 1) {
    return strings.yesterday;
  } else if (diffWithToday <= 7) {
    return getDayString(dateFns.getDay(createdAt), strings.days);
  } else {
    return dateFns.format(createdAt, "dd/MM/yyyy");
  }
};

function DateSeparator(_a) {
  var className = _a.className,
      createdAt = _a.createdAt;
  var stringSet = React$1.useContext(LocalizationContext.LocalizationContext).stringSet;
  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: index$1.getClassName([className, "rogu-date-separator"])
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-date-separator__content",
    type: LabelTypography.CAPTION_1
  }, getDateSeparatorDifference(createdAt, {
    today: stringSet.LABEL__DATE_TODAY,
    yesterday: stringSet.LABEL__DATE_YESTERDAY,
    days: {
      0: stringSet.LABEL__DAY_SUNDAY,
      1: stringSet.LABEL__DAY_MONDAY,
      2: stringSet.LABEL__DAY_TUESDAY,
      3: stringSet.LABEL__DAY_WEDNESDAY,
      4: stringSet.LABEL__DAY_THURSDAY,
      5: stringSet.LABEL__DAY_FRIDAY,
      6: stringSet.LABEL__DAY_SATURDAY
    }
  })));
}

var ConversationScroll = /*#__PURE__*/function (_Component) {
  LocalizationContext._inherits(ConversationScroll, _Component);

  var _super = LocalizationContext._createSuper(ConversationScroll);

  function ConversationScroll() {
    var _this;

    LocalizationContext._classCallCheck(this, ConversationScroll);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    LocalizationContext._defineProperty(LocalizationContext._assertThisInitialized(_this), "onScroll", function (e) {
      var _this$props = _this.props,
          scrollRef = _this$props.scrollRef,
          hasMore = _this$props.hasMore,
          messagesDispatcher = _this$props.messagesDispatcher,
          onScroll = _this$props.onScroll,
          onScrollDown = _this$props.onScrollDown,
          currentGroupChannel = _this$props.currentGroupChannel;
      var element = e.target;
      var scrollTop = element.scrollTop,
          clientHeight = element.clientHeight,
          scrollHeight = element.scrollHeight;

      if (scrollTop === 0) {
        if (!hasMore) {
          return;
        }

        var nodes = scrollRef.current.querySelectorAll('.sendbird-msg--scroll-ref');
        var first = nodes && nodes[0];
        onScroll(function (_ref) {
          var _ref2 = LocalizationContext._slicedToArray(_ref, 1),
              messages = _ref2[0];

          if (messages) {
            // https://github.com/scabbiaza/react-scroll-position-on-updating-dom
            try {
              first.scrollIntoView();
            } catch (error) {//
            }
          }
        });
      }

      if (clientHeight + scrollTop === scrollHeight) {
        var _nodes = scrollRef.current.querySelectorAll('.sendbird-msg--scroll-ref');

        var last = _nodes && _nodes[_nodes.length - 1];
        onScrollDown(function (_ref3) {
          var _ref4 = LocalizationContext._slicedToArray(_ref3, 1),
              messages = _ref4[0];

          if (messages) {
            // https://github.com/scabbiaza/react-scroll-position-on-updating-dom
            try {
              last.scrollIntoView();
            } catch (error) {//
            }
          }
        });
      } // do this later


      setTimeout(function () {
        // mark as read if scroll is at end
        if (clientHeight + scrollTop === scrollHeight) {
          messagesDispatcher({
            type: MARK_AS_READ
          });
          currentGroupChannel.markAsRead();
        }
      }, 500);
    });

    return _this;
  }

  LocalizationContext._createClass(ConversationScroll, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          userId = _this$props2.userId,
          disabled = _this$props2.disabled,
          scrollRef = _this$props2.scrollRef,
          membersMap = _this$props2.membersMap,
          allMessages = _this$props2.allMessages,
          scrollToMessage = _this$props2.scrollToMessage,
          useReaction = _this$props2.useReaction,
          emojiAllMap = _this$props2.emojiAllMap,
          editDisabled = _this$props2.editDisabled,
          deleteMessage = _this$props2.deleteMessage,
          updateMessage = _this$props2.updateMessage,
          resendMessage = _this$props2.resendMessage,
          renderCustomMessage = _this$props2.renderCustomMessage,
          renderChatItem = _this$props2.renderChatItem,
          highLightedMessageId = _this$props2.highLightedMessageId,
          emojiContainer = _this$props2.emojiContainer,
          toggleReaction = _this$props2.toggleReaction,
          useMessageGrouping = _this$props2.useMessageGrouping,
          currentGroupChannel = _this$props2.currentGroupChannel,
          memoizedEmojiListItems = _this$props2.memoizedEmojiListItems,
          showScrollBot = _this$props2.showScrollBot,
          onClickScrollBot = _this$props2.onClickScrollBot,
          onReplyMessage = _this$props2.onReplyMessage;

      if (allMessages.length < 1) {
        return /*#__PURE__*/React__default$1["default"].createElement(index$2.PlaceHolder, {
          className: "rogu-conversation__no-messages",
          type: index$2.PlaceHolderTypes.NO_MESSAGES
        });
      }

      return /*#__PURE__*/React__default$1["default"].createElement("div", {
        className: "rogu-conversation__messages"
      }, /*#__PURE__*/React__default$1["default"].createElement("div", {
        ref: scrollRef,
        className: "rogu-conversation__scroll-container",
        onScroll: this.onScroll
      }, Array.from(groupMessagesByDate(allMessages).values()).map(function (messages, i) {
        var _messages$;

        var currentCreatedAt = (_messages$ = messages[0]) === null || _messages$ === void 0 ? void 0 : _messages$.createdAt;
        return (
          /*#__PURE__*/
          // eslint-disable-next-line react/no-array-index-key
          React__default$1["default"].createElement("div", {
            key: i
          }, /*#__PURE__*/React__default$1["default"].createElement(DateSeparator, {
            createdAt: currentCreatedAt
          }), messages.map(function (m, idx) {
            var previousMessage = messages[idx - 1];
            var nextMessage = messages[idx + 1];

            var _ref5 = useMessageGrouping ? compareMessagesForGrouping(previousMessage, m, nextMessage) : [false, false],
                _ref6 = LocalizationContext._slicedToArray(_ref5, 2),
                chainTop = _ref6[0],
                chainBottom = _ref6[1];

            if (renderChatItem) {
              return /*#__PURE__*/React__default$1["default"].createElement("div", {
                key: m.messageId || m.reqId,
                className: "sendbird-msg--scroll-ref"
              }, renderChatItem({
                message: m,
                highLightedMessageId: highLightedMessageId,
                channel: currentGroupChannel,
                // hasSeparator: hasSeparator,
                onDeleteMessage: deleteMessage,
                onUpdateMessage: updateMessage,
                onResendMessage: resendMessage,
                onScrollToMessage: scrollToMessage,
                emojiContainer: emojiContainer,
                chainTop: chainTop,
                chainBottom: chainBottom,
                menuDisabled: disabled
              }));
            }

            return /*#__PURE__*/React__default$1["default"].createElement(MessageHoc, {
              highLightedMessageId: highLightedMessageId,
              renderCustomMessage: renderCustomMessage,
              key: m.messageId || m.reqId,
              userId: userId // show status for pending/failed messages
              ,
              message: m,
              scrollToMessage: scrollToMessage,
              currentGroupChannel: currentGroupChannel,
              disabled: disabled,
              membersMap: membersMap,
              chainTop: chainTop,
              useReaction: useReaction,
              emojiAllMap: emojiAllMap,
              emojiContainer: emojiContainer,
              editDisabled: editDisabled // hasSeparator={hasSeparator}
              ,
              chainBottom: chainBottom,
              updateMessage: updateMessage,
              deleteMessage: deleteMessage,
              resendMessage: resendMessage,
              toggleReaction: toggleReaction,
              memoizedEmojiListItems: memoizedEmojiListItems,
              onReplyMessage: onReplyMessage
            });
          }))
        );
      })), showScrollBot && /*#__PURE__*/React__default$1["default"].createElement("div", {
        className: "rogu-conversation__scroll-bottom-button",
        onClick: onClickScrollBot,
        onKeyDown: onClickScrollBot,
        tabIndex: 0,
        role: "button"
      }, /*#__PURE__*/React__default$1["default"].createElement(index$2.Icon, {
        width: "24px",
        height: "24px",
        type: index$2.IconTypes.CHEVRON_DOWN,
        fillColor: index$2.IconColors.PRIMARY
      })));
    }
  }]);

  return ConversationScroll;
}(React$1.Component);
ConversationScroll.propTypes = {
  // https://stackoverflow.com/a/52646941
  scrollRef: PropTypes__default["default"].shape({
    current: PropTypes__default["default"].oneOfType([PropTypes__default["default"].element, PropTypes__default["default"].shape({})])
  }).isRequired,
  hasMore: PropTypes__default["default"].bool,
  messagesDispatcher: PropTypes__default["default"].func.isRequired,
  onScroll: PropTypes__default["default"].func,
  onScrollDown: PropTypes__default["default"].func,
  editDisabled: PropTypes__default["default"].bool,
  disabled: PropTypes__default["default"].bool,
  userId: PropTypes__default["default"].string,
  allMessages: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({
    createdAt: PropTypes__default["default"].number
  })).isRequired,
  deleteMessage: PropTypes__default["default"].func.isRequired,
  resendMessage: PropTypes__default["default"].func.isRequired,
  updateMessage: PropTypes__default["default"].func.isRequired,
  readStatus: PropTypes__default["default"].shape({}).isRequired,
  currentGroupChannel: PropTypes__default["default"].shape({
    markAsRead: PropTypes__default["default"].func,
    members: PropTypes__default["default"].arrayOf(PropTypes__default["default"].shape({}))
  }).isRequired,
  highLightedMessageId: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  renderChatItem: PropTypes__default["default"].element,
  renderCustomMessage: PropTypes__default["default"].func,
  scrollToMessage: PropTypes__default["default"].func,
  useReaction: PropTypes__default["default"].bool,
  showScrollBot: PropTypes__default["default"].bool,
  onClickScrollBot: PropTypes__default["default"].func,
  emojiContainer: PropTypes__default["default"].shape({}),
  emojiAllMap: PropTypes__default["default"].instanceOf(Map),
  membersMap: PropTypes__default["default"].instanceOf(Map),
  useMessageGrouping: PropTypes__default["default"].bool,
  toggleReaction: PropTypes__default["default"].func,
  memoizedEmojiListItems: PropTypes__default["default"].func,
  onReplyMessage: PropTypes__default["default"].func
};
ConversationScroll.defaultProps = {
  hasMore: false,
  editDisabled: false,
  disabled: false,
  userId: '',
  renderCustomMessage: null,
  renderChatItem: null,
  highLightedMessageId: null,
  onScroll: null,
  onScrollDown: null,
  useReaction: true,
  emojiContainer: {},
  showScrollBot: false,
  onClickScrollBot: function onClickScrollBot() {},
  scrollToMessage: function scrollToMessage() {},
  emojiAllMap: new Map(),
  membersMap: new Map(),
  useMessageGrouping: true,
  toggleReaction: function toggleReaction() {},
  memoizedEmojiListItems: function memoizedEmojiListItems() {
    return '';
  },
  onReplyMessage: function onReplyMessage() {}
};

function Notification(_ref) {
  var count = _ref.count,
      time = _ref.time,
      onClick = _ref.onClick;

  var _useContext = React$1.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet; // ex: time = '13.46 14 December 2021', then split into array


  var timeArray = time.split(' '); // add string 'on' after first element of timeArray
  // before: timeArray = ['13.46', '14', 'December', '2021']

  timeArray.splice(1, 0, stringSet.CHANNEL__MESSAGE_LIST__NOTIFICATION__ON); // after: timeArray = ['13.46', 'on', '14', 'December', '2021']

  return (
    /*#__PURE__*/
    // eslint-disable-next-line
    React__default$1["default"].createElement("div", {
      className: "rogu-notification",
      onClick: onClick
    }, /*#__PURE__*/React__default$1["default"].createElement(index$2.Label, {
      className: "rogu-notification__text",
      color: index$2.LabelColors.ONCONTENT_1,
      type: index$2.LabelTypography.CAPTION_2
    }, "".concat(count, " "), stringSet.CHANNEL__MESSAGE_LIST__NOTIFICATION__NEW_MESSAGE, " ".concat(timeArray.join(' '))), /*#__PURE__*/React__default$1["default"].createElement(index$2.Icon, {
      width: "24px",
      height: "24px",
      type: index$2.IconTypes.CHEVRON_DOWN,
      fillColor: index$2.IconColors.CONTENT
    }))
  );
}
Notification.propTypes = {
  count: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  time: PropTypes__default["default"].string,
  onClick: PropTypes__default["default"].func.isRequired
};
Notification.defaultProps = {
  count: 0,
  time: ''
};

var TypingIndicatorText = function TypingIndicatorText(_ref) {
  var members = _ref.members;

  var _useContext = React$1.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  if (!members || members.length === 0) {
    return '';
  }

  if (members && members.length === 1) {
    return "".concat(members[0].nickname, " ").concat(stringSet.TYPING_INDICATOR__IS_TYPING);
  }

  if (members && members.length === 2) {
    return "".concat(members[0].nickname, " ").concat(stringSet.TYPING_INDICATOR__AND, " ").concat(members[1].nickname, " ").concat(stringSet.TYPING_INDICATOR__ARE_TYPING);
  }

  return stringSet.TYPING_INDICATOR__MULTIPLE_TYPING;
};

function TypingIndicator(_ref2) {
  var channelUrl = _ref2.channelUrl,
      sb = _ref2.sb,
      logger = _ref2.logger;

  var _useState = React$1.useState(LocalizationContext.uuidv4()),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      handlerId = _useState2[0],
      setHandlerId = _useState2[1];

  var _useState3 = React$1.useState([]),
      _useState4 = LocalizationContext._slicedToArray(_useState3, 2),
      typingMembers = _useState4[0],
      setTypingMembers = _useState4[1];

  React$1.useEffect(function () {
    if (sb && sb.ChannelHandler) {
      sb.removeChannelHandler(handlerId);
      var newHandlerId = LocalizationContext.uuidv4();
      var handler = new sb.ChannelHandler(); // there is a possible warning in here - setState called after unmount

      handler.onTypingStatusUpdated = function (groupChannel) {
        logger.info('Channel > Typing Indicator: onTypingStatusUpdated', groupChannel);
        var members = groupChannel.getTypingMembers();

        if (groupChannel.url === channelUrl) {
          setTypingMembers(members);
        }
      };

      sb.addChannelHandler(newHandlerId, handler);
      setHandlerId(newHandlerId);
    }

    return function () {
      setTypingMembers([]);

      if (sb && sb.removeChannelHandler) {
        sb.removeChannelHandler(handlerId);
      }
    };
  }, [sb, channelUrl]);
  return /*#__PURE__*/React__default$1["default"].createElement(Label, {
    type: LabelTypography.TYPING_INDICATOR,
    color: LabelColors.ONBACKGROUND_2
  }, /*#__PURE__*/React__default$1["default"].createElement(TypingIndicatorText, {
    members: typingMembers
  }));
}

TypingIndicator.propTypes = {
  channelUrl: PropTypes__default["default"].string.isRequired,
  sb: PropTypes__default["default"].shape({
    ChannelHandler: PropTypes__default["default"].func,
    removeChannelHandler: PropTypes__default["default"].func,
    addChannelHandler: PropTypes__default["default"].func
  }).isRequired,
  logger: PropTypes__default["default"].shape({
    info: PropTypes__default["default"].func
  }).isRequired
};

function _interopDefault$1 (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = React__default$1["default"];
var React__default = _interopDefault$1(React);
var PropTypes = _interopDefault$1(PropTypes__default["default"]);

var styles = {"link-preview-section":"_3elLK","animated-background":"_Z-Tng","link-image-loader":"_13bre","img":"_1Igjx","placeHolderShimmer":"_yKlsy","link-description":"_3IjjD","domain":"_3Y4Nu","link-url":"_CZu1J","link-url-loader":"_2immM","link-data":"_2bWne","link-title":"_35AKc","link-data-loader":"_322CG","p1":"_3rFBW","p2":"_L7vLm","link-image":"_3EjBn"};

var isValidUrlProp = function isValidUrlProp(props, propName, componentName) {
  if (!props) {
    return new Error("Required parameter URL was not passed.");
  }

  if (!isValidUrl(props[propName])) {
    return new Error("Invalid prop '" + propName + "' passed to '" + componentName + "'. Expected a valid url.");
  }
};

var isValidUrl = function isValidUrl(url) {
  var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
  var validUrl = regex.test(url);
  return validUrl;
};

function LinkPreview(props) {
  var _useState = React.useState(true),
      loading = _useState[0],
      setLoading = _useState[1];

  var _useState2 = React.useState({}),
      preview = _useState2[0],
      setPreviewData = _useState2[1];

  var _useState3 = React.useState(false),
      isUrlValid = _useState3[0],
      setUrlValidation = _useState3[1];

  var url = props.url,
      width = props.width,
      maxWidth = props.maxWidth,
      marginTop = props.marginTop,
      marginBottom = props.marginBottom,
      marginRight = props.marginRight,
      marginLeft = props.marginLeft,
      onClick = props.onClick,
      render = props.render;
  var api = 'https://lpdg.herokuapp.com/parse/link';
  var style = {
    width: width,
    maxWidth: maxWidth,
    marginTop: marginTop,
    marginBottom: marginBottom,
    marginRight: marginRight,
    marginLeft: marginLeft
  };
  React.useEffect(function () {
    var fetchData = function fetchData() {
      try {
        var fetch = window.fetch;

        if (isValidUrl(url)) {
          setUrlValidation(true);
        } else {
          return Promise.resolve({});
        }

        setLoading(true);
        return Promise.resolve(fetch(api, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: url
          })
        })).then(function (response) {
          return Promise.resolve(response.json()).then(function (data) {
            setPreviewData(data);
            setLoading(false);
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };

    fetchData();
  }, [url]);

  if (!isUrlValid) {
    console.error('LinkPreview Error: You need to provide url in props to render the component');
    return null;
  }

  if (render) {
    return render({
      loading: loading,
      preview: preview
    });
  } else if (loading) {
    return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
      className: styles['link-preview-section'],
      style: style
    }, /*#__PURE__*/React__default.createElement("div", {
      className: styles['link-description']
    }, /*#__PURE__*/React__default.createElement("div", {
      className: styles.domain
    }, /*#__PURE__*/React__default.createElement("span", {
      className: (styles['animated-background'])
    }, "facebook.com")), /*#__PURE__*/React__default.createElement("div", {
      className: styles['link-data-loader']
    }, /*#__PURE__*/React__default.createElement("div", {
      className: (styles['animated-background'])
    }, "Shashank Shekhar"), /*#__PURE__*/React__default.createElement("div", {
      className: (styles['animated-background'])
    }, "This is some description"))), /*#__PURE__*/React__default.createElement("div", {
      className: styles['link-image-loader']
    }, /*#__PURE__*/React__default.createElement("div", {
      className: styles.img
    }))));
  } else {
    return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
      className: styles['link-preview-section'],
      style: style,
      onClick: onClick
    }, /*#__PURE__*/React__default.createElement("div", {
      className: styles['link-description']
    }, /*#__PURE__*/React__default.createElement("div", {
      className: styles.domain
    }, /*#__PURE__*/React__default.createElement("span", {
      className: styles['link-url']
    }, preview.domain)), /*#__PURE__*/React__default.createElement("div", {
      className: styles['link-data']
    }, /*#__PURE__*/React__default.createElement("div", {
      className: styles['link-title']
    }, preview.title), /*#__PURE__*/React__default.createElement("div", {
      className: styles['link-description']
    }, preview.description))), /*#__PURE__*/React__default.createElement("div", {
      className: styles['link-image']
    }, preview.img && /*#__PURE__*/React__default.createElement("img", {
      src: preview.img,
      alt: preview.description
    }))));
  }
}

LinkPreview.defaultProps = {
  onClick: function onClick() {},
  width: '90%',
  maxWidth: '700px',
  marginTop: '18px',
  marginBottom: '18px',
  marginRight: 'auto',
  marginLeft: 'auto'
};
LinkPreview.propTyps = {
  url: isValidUrlProp,
  onClick: PropTypes.func,
  render: PropTypes.func,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  marginRight: PropTypes.string,
  marginLeft: PropTypes.string
};

var dist = LinkPreview;

/**
 * TODO
 * [x] Handle reply text message
 * [x] Handle reply file message
 * [ ] Handle reply assignment message
 * [ ] Handle reply material message
 * [x] Handle reply image message
 * [x] Handle reply video message
 * [x] Handle reply replied message
 */
function RepliedMessagePreview(_a) {
  var _b;

  var _c = _a.className,
      className = _c === void 0 ? '' : _c,
      message = _a.message,
      onCancel = _a.onCancel,
      onClick = _a.onClick;
  var messageTypes = index$1.getUIKitMessageTypes();
  var nickname = (_b = message.sender) === null || _b === void 0 ? void 0 : _b.nickname;
  var body = message.message;
  var mimeType = '*';

  if (isFileMessage(message)) {
    body = message.name;
    mimeType = message.type;
  } else if (index$1.isAssignmentMessage(message.customType) || index$1.isMaterialMessage(message.customType)) {
    var data = JSON.parse(message === null || message === void 0 ? void 0 : message.data);
    body = data === null || data === void 0 ? void 0 : data.title;
  }

  var mediaUrl = isThumbnailMessage(message) ? message.url : ''; // if the replied message is replying another message

  if (isReplyingMessage(message)) {
    var originalMessage = index$1.formatedStringToRepliedMessage(body).originalMessage;
    body = originalMessage;
  }

  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: className
  }, (index$1.isTextMessage(message) || index$1.isOGMessage(message)) && /*#__PURE__*/React__default$1["default"].createElement(RepliedTextMessageItemBody, {
    content: body,
    isByMe: false // always false to match the styling
    ,
    nickname: nickname,
    withCancelButton: true,
    onClick: onClick,
    onCancel: onCancel
  }), isThumbnailMessage(message) && /*#__PURE__*/React__default$1["default"].createElement(RepliedMediaMessageItemBody, {
    body: body,
    isByMe: false // always false to match the styling
    ,
    mimeType: mimeType,
    nickname: nickname,
    withCancelButton: true,
    onClick: onClick,
    onCancel: onCancel,
    mediaUrl: mediaUrl
  }), index$1.getUIKitMessageType(message) === messageTypes.FILE && /*#__PURE__*/React__default$1["default"].createElement(RepliedFileMessageItemBody, {
    body: body,
    isByMe: false // always false to match the styling
    ,
    mimeType: mimeType,
    nickname: nickname,
    withCancelButton: true,
    onClick: onClick,
    onCancel: onCancel
  }), index$1.isAssignmentMessage(message.customType) && /*#__PURE__*/React__default$1["default"].createElement(RepliedAssignmentMessageItemBody, {
    body: body,
    isByMe: false // always false to match the styling
    ,
    nickname: nickname,
    withCancelButton: true,
    onClick: onClick,
    onCancel: onCancel
  }), index$1.isMaterialMessage(message.customType) && /*#__PURE__*/React__default$1["default"].createElement(RepliedMaterialMessageItemBody, {
    body: body,
    isByMe: false // always false to match the styling
    ,
    nickname: nickname,
    withCancelButton: true,
    onClick: onClick,
    onCancel: onCancel
  }));
}

// https://davidwalsh.name/javascript-debounce-function
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function _debounce() {
    var context = this; // eslint-disable-next-line prefer-rest-params

    var args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

var MAX_FILE_SIZE = 10000000; // 10MB;

var TOAST_AUTO_HIDE_DURATION = 3000;
var LINE_HEIGHT = 36;

var noop$1 = function noop() {};

var KeyCode = {
  SHIFT: 16,
  ENTER: 13,
  DELETE: 46,
  BACKSPACE: 8
};
var MessageInput = /*#__PURE__*/React__default$1["default"].forwardRef(function (props, ref) {
  var disabled = props.disabled,
      value = props.value,
      name = props.name,
      placeholder = props.placeholder,
      maxLength = props.maxLength,
      nickname = props.nickname,
      profileUrl = props.profileUrl,
      repliedMessage = props.repliedMessage,
      onFileUpload = props.onFileUpload,
      onSendMessage = props.onSendMessage,
      onStartTyping = props.onStartTyping,
      onCancelRepliedMessage = props.onCancelRepliedMessage,
      onClickRepliedMessage = props.onClickRepliedMessage;

  var _useContext = React$1.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  var fileInputRef = React$1.useRef(null);

  var _useState = React$1.useState(null),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      imagePreviewFile = _useState2[0],
      setImagePreviewFile = _useState2[1];

  var _useState3 = React$1.useState(value),
      _useState4 = LocalizationContext._slicedToArray(_useState3, 2),
      inputValue = _useState4[0],
      setInputValue = _useState4[1];

  var _useState5 = React$1.useState(false),
      _useState6 = LocalizationContext._slicedToArray(_useState5, 2),
      isShiftPressed = _useState6[0],
      setIsShiftPressed = _useState6[1]; // TODO: abstract the auto hide mechanism to the Toast component


  var _useState7 = React$1.useState(false),
      _useState8 = LocalizationContext._slicedToArray(_useState7, 2),
      showUploadErrorToast = _useState8[0],
      setShowUploadErrorToast = _useState8[1];

  var autoHideTimer = React$1.useRef(null);
  React$1.useEffect(function () {
    if (showUploadErrorToast) {
      clearTimeout(autoHideTimer.current);
      autoHideTimer.current = setTimeout(function () {
        setShowUploadErrorToast(false);
      }, TOAST_AUTO_HIDE_DURATION);
    }

    return function () {
      return clearTimeout(autoHideTimer.current);
    };
  }, [showUploadErrorToast]);

  var handleUploadFile = function handleUploadFile(upload) {
    return function (event) {
      var _event$target;

      var file = (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.files[0];

      if (file) {
        if (file.size > MAX_FILE_SIZE) {
          setShowUploadErrorToast(true);
        } else if (isImage(file.type)) {
          setInputValue(inputValue.slice(0, 930));
          setImagePreviewFile(file);
        } else {
          upload(file);
        }
      } // eslint-disable-next-line no-param-reassign


      event.target.value = '';
    };
  };

  var elem = ref && ref.current;

  var setHeight = function setHeight() {
    try {
      var MAX_HEIGHT = window.document.body.offsetHeight * 0.6;

      if (elem && elem.scrollHeight >= LINE_HEIGHT) {
        elem.style.borderRadius = '12px';
        elem.style.height = '36px';
        if (MAX_HEIGHT < elem.scrollHeight) elem.style.height = "".concat(MAX_HEIGHT, "px");else elem.style.height = "".concat(elem.scrollHeight, "px");
      }

      if (inputValue === '') elem.style.borderRadius = '42px';
    } catch (error) {// error
    }
  };

  var _useState9 = React$1.useState({
    hasUrl: false,
    text: ''
  }),
      _useState10 = LocalizationContext._slicedToArray(_useState9, 2),
      url = _useState10[0],
      setUrl = _useState10[1];

  var handleUrlCheck = function handleUrlCheck(sentence) {
    var _extractUrls = extractUrls(sentence),
        urls = _extractUrls.urls;

    var firstLink = urls[0];

    if (firstLink) {
      // Add `https://` since LinkPreview only support url with 'https://'
      if (firstLink.indexOf('http://') === -1 || firstLink.indexOf('https://') === -1) {
        firstLink = "https://".concat(firstLink);
      }

      setUrl({
        hasUrl: true,
        text: firstLink
      });
    }
  };

  var renderPreviewUrl = function renderPreviewUrl(_ref) {
    var loading = _ref.loading,
        preview = _ref.preview;
    var message = {
      sender: {
        profileUrl: '',
        nickname: ''
      },
      message: '',
      ogMetaData: {
        title: preview.title,
        description: preview.description,
        url: url.text,
        defaultImage: {
          url: preview.img,
          alt: 'test'
        }
      },
      createdAt: 0
    };

    if (loading) {
      return /*#__PURE__*/React__default$1["default"].createElement(Label, {
        className: "rogu-message-input__url-loading",
        type: LabelTypography.BODY_1,
        color: LabelColors.ONBACKGROUND_1
      }, stringSet.LABEL_LOADING);
    }

    return /*#__PURE__*/React__default$1["default"].createElement(OGMessageItemBody, {
      message: message,
      isOnPreview: true,
      onClosePreview: function onClosePreview() {
        return setUrl({
          hasUrl: false,
          text: ''
        });
      }
    });
  }; // after setHeight called twice, the textarea goes to the initialized


  React$1.useEffect(function () {
    setHeight(); // TODO: this call is not debounced correctly. Consider to use lodash.debounce instead

    debounce(handleUrlCheck(inputValue), 3000);
    return setHeight;
  }, [inputValue]);

  var sendMessage = function sendMessage() {
    if (imagePreviewFile !== null) {
      // In order to change the file name, we need to create a copy of File object
      var modifiedFile = new Blob([imagePreviewFile], {
        type: imagePreviewFile.type,
        name: inputValue.slice(0, 930)
      });
      modifiedFile.name = inputValue.slice(0, 930);

      if (repliedMessage) {
        var _repliedMessage$sende;

        var repliedMessageBody = repliedMessage.message;
        var repliedMessageMediaUrl = '';
        var repliedMessageMimeType = '*';
        var repliedMessageType = index$1.REPLIED_MESSAGE_TYPE.Text;

        if (isThumbnailMessage(repliedMessage)) {
          repliedMessageMimeType = repliedMessage.type;
          repliedMessageMediaUrl = repliedMessage.url;

          if (isImage(repliedMessageMimeType)) {
            repliedMessageBody = repliedMessage.name;
            repliedMessageType = index$1.REPLIED_MESSAGE_TYPE.Image;
          } else if (isVideo(repliedMessageMimeType)) {
            repliedMessageType = index$1.REPLIED_MESSAGE_TYPE.Video;
          }
        } else if (isFileMessage(repliedMessage)) {
          repliedMessageBody = repliedMessage.name;
          repliedMessageMimeType = repliedMessage.type;
          repliedMessageType = index$1.REPLIED_MESSAGE_TYPE.File;
        } else if (index$1.isMaterialMessage(repliedMessage.customType)) {
          var materialData = JSON.parse(repliedMessage === null || repliedMessage === void 0 ? void 0 : repliedMessage.data);
          repliedMessageBody = materialData === null || materialData === void 0 ? void 0 : materialData.title;
          repliedMessageType = index$1.REPLIED_MESSAGE_TYPE.Material;
        } else if (index$1.isAssignmentMessage(repliedMessage.customType)) {
          var _materialData = JSON.parse(repliedMessage === null || repliedMessage === void 0 ? void 0 : repliedMessage.data);

          repliedMessageBody = _materialData === null || _materialData === void 0 ? void 0 : _materialData.title;
          repliedMessageType = index$1.REPLIED_MESSAGE_TYPE.Assignment;
        } // if the replied message is replying another message


        if (isReplyingMessage(repliedMessage)) {
          var _formatedStringToRepl = index$1.formatedStringToRepliedMessage(repliedMessageBody),
              originalMessage = _formatedStringToRepl.originalMessage;

          repliedMessageBody = originalMessage;
        }

        onFileUpload(modifiedFile, {
          parentMessageBody: repliedMessageBody,
          parentMessageCreatedAt: repliedMessage.createdAt,
          parentMessageId: repliedMessage.messageId,
          parentMessageMediaUrl: repliedMessageMediaUrl,
          parentMessageMimeType: repliedMessageMimeType,
          parentMessageNickname: (_repliedMessage$sende = repliedMessage.sender) === null || _repliedMessage$sende === void 0 ? void 0 : _repliedMessage$sende.nickname,
          parentMessageType: repliedMessageType
        });
      } else {
        onFileUpload(modifiedFile);
      }
    } else if (inputValue && inputValue.trim().length > 0) {
      if (repliedMessage) {
        var _repliedMessage$sende2;

        var _repliedMessageBody = repliedMessage.message;
        var _repliedMessageMediaUrl = '';
        var _repliedMessageMimeType = '*';
        var _repliedMessageType = index$1.REPLIED_MESSAGE_TYPE.Text;

        if (isThumbnailMessage(repliedMessage)) {
          _repliedMessageMimeType = repliedMessage.type;
          _repliedMessageMediaUrl = repliedMessage.url;

          if (isImage(_repliedMessageMimeType)) {
            _repliedMessageBody = repliedMessage.name;
            _repliedMessageType = index$1.REPLIED_MESSAGE_TYPE.Image;
          } else if (isVideo(_repliedMessageMimeType)) {
            _repliedMessageType = index$1.REPLIED_MESSAGE_TYPE.Video;
          }
        } else if (isFileMessage(repliedMessage)) {
          _repliedMessageBody = repliedMessage.name;
          _repliedMessageMimeType = repliedMessage.type;
          _repliedMessageType = index$1.REPLIED_MESSAGE_TYPE.File;
        } else if (index$1.isMaterialMessage(repliedMessage.customType)) {
          var _materialData2 = JSON.parse(repliedMessage === null || repliedMessage === void 0 ? void 0 : repliedMessage.data);

          _repliedMessageBody = _materialData2 === null || _materialData2 === void 0 ? void 0 : _materialData2.title;
          _repliedMessageType = index$1.REPLIED_MESSAGE_TYPE.Material;
        } else if (index$1.isAssignmentMessage(repliedMessage.customType)) {
          var _materialData3 = JSON.parse(repliedMessage === null || repliedMessage === void 0 ? void 0 : repliedMessage.data);

          _repliedMessageBody = _materialData3 === null || _materialData3 === void 0 ? void 0 : _materialData3.title;
          _repliedMessageType = index$1.REPLIED_MESSAGE_TYPE.Assignment;
        } // if the replied message is replying another message


        if (isReplyingMessage(repliedMessage)) {
          var _formatedStringToRepl2 = index$1.formatedStringToRepliedMessage(_repliedMessageBody),
              _originalMessage = _formatedStringToRepl2.originalMessage;

          _repliedMessageBody = _originalMessage;
        }

        onSendMessage({
          parentMessageBody: _repliedMessageBody,
          parentMessageCreatedAt: repliedMessage.createdAt,
          parentMessageId: repliedMessage.messageId,
          parentMessageMediaUrl: _repliedMessageMediaUrl,
          parentMessageMimeType: _repliedMessageMimeType,
          parentMessageNickname: (_repliedMessage$sende2 = repliedMessage.sender) === null || _repliedMessage$sende2 === void 0 ? void 0 : _repliedMessage$sende2.nickname,
          parentMessageType: _repliedMessageType
        });
      } else {
        onSendMessage();
      }

      if (elem) {
        elem.style.height = "".concat(LINE_HEIGHT, "px");
      }
    } // Reset


    setImagePreviewFile(null);
    setInputValue('');
    onCancelRepliedMessage();
    setUrl({
      hasUrl: false,
      text: ''
    });
  };

  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: index$1.getClassName(['rogu-message-input', disabled ? 'rogu-message-input--disabled ' : '', imagePreviewFile ? 'rogu-message-input--preview' : ''])
  }, repliedMessage && /*#__PURE__*/React__default$1["default"].createElement(RepliedMessagePreview, {
    className: "rogu-message-input__replied-preview",
    message: repliedMessage,
    onCancel: onCancelRepliedMessage,
    onClick: onClickRepliedMessage
  }), url.hasUrl && index$1.isUrl(url.text) && /*#__PURE__*/React__default$1["default"].createElement(dist, {
    url: url.text,
    render: renderPreviewUrl
  }), /*#__PURE__*/React__default$1["default"].createElement("form", {
    className: ['rogu-message-input__form'].join(' ')
  }, /*#__PURE__*/React__default$1["default"].createElement("textarea", {
    className: "rogu-message-input__textarea",
    disabled: disabled,
    ref: ref,
    name: name,
    value: inputValue,
    maxLength: imagePreviewFile ? 930 : maxLength,
    onChange: function onChange(e) {
      setInputValue(e.target.value);
      onStartTyping();
    },
    onKeyDown: function onKeyDown(e) {
      if (e.keyCode === KeyCode.SHIFT) {
        setIsShiftPressed(true);
      }

      if (!isShiftPressed && e.keyCode === KeyCode.ENTER) {
        e.preventDefault();
        sendMessage();
      }
    },
    onKeyUp: function onKeyUp(e) {
      if (e.keyCode === KeyCode.SHIFT) {
        setIsShiftPressed(false);
      }

      if (e.keyCode === KeyCode.BACKSPACE || e.keyCode === KeyCode.DELETE) {
        setUrl({
          hasUrl: false,
          text: ''
        });
      }
    }
  }), !inputValue && /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-message-input__placeholder",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_3
  }, placeholder || stringSet.CHANNEL__MESSAGE_INPUT__PLACE_HOLDER), !imagePreviewFile && /*#__PURE__*/React__default$1["default"].createElement(index$1.IconButton, {
    className: "rogu-message-input__attach",
    height: "32px",
    width: "32px",
    onClick: function onClick() {
      // todo: clear previous input
      fileInputRef.current.click();
    }
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    type: IconTypes.ATTACH,
    fillColor: IconColors.CONTENT_INVERSE,
    width: "20px",
    height: "20px"
  }), /*#__PURE__*/React__default$1["default"].createElement("input", {
    accept: repliedMessage ? SUPPORTED_MIMES.IMAGE.map(function (mime) {
      return mime.mimeType;
    }) : getMimeTypesString(),
    className: "rogu-message-input__attach__input",
    type: "file",
    ref: fileInputRef,
    onChange: handleUploadFile(onFileUpload)
  })), /*#__PURE__*/React__default$1["default"].createElement(index$1.IconButton, {
    className: "rogu-message-input__send",
    height: "36px",
    width: "36px",
    onClick: sendMessage
  }, /*#__PURE__*/React__default$1["default"].createElement(Icon, {
    type: IconTypes.ROGU_SEND,
    fillColor: IconColors.WHITE,
    width: "16px",
    height: "16px"
  }))), imagePreviewFile !== null && /*#__PURE__*/React__default$1["default"].createElement(FileViewerComponent, {
    captionMsg: "",
    isByMe: true,
    isPreview: true,
    profileUrl: profileUrl,
    type: imagePreviewFile.type,
    url: URL.createObjectURL(imagePreviewFile),
    userName: nickname,
    onClose: function onClose() {
      return setImagePreviewFile(null);
    },
    onDelete: function onDelete() {}
  }), showUploadErrorToast && /*#__PURE__*/React__default$1["default"].createElement(Toast, {
    message: stringSet.TOAST__MAX_FILE_SIZE_ERROR
  }));
});
MessageInput.propTypes = {
  placeholder: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].bool]),
  name: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  value: PropTypes__default["default"].string,
  disabled: PropTypes__default["default"].bool,
  maxLength: PropTypes__default["default"].number,
  nickname: PropTypes__default["default"].string.isRequired,
  profileUrl: PropTypes__default["default"].string.isRequired,
  repliedMessage: PropTypes__default["default"].object,
  onFileUpload: PropTypes__default["default"].func,
  onSendMessage: PropTypes__default["default"].func,
  onStartTyping: PropTypes__default["default"].func,
  onCancelRepliedMessage: PropTypes__default["default"].func,
  onClickRepliedMessage: PropTypes__default["default"].func
};
MessageInput.defaultProps = {
  value: '',
  onSendMessage: noop$1,
  name: 'rogu-message-input',
  disabled: false,
  placeholder: '',
  maxLength: 3000,
  repliedMessage: null,
  onFileUpload: noop$1,
  onStartTyping: noop$1,
  onCancelRepliedMessage: noop$1,
  onClickRepliedMessage: noop$1
};

// Logic required to handle message input rendering

var MessageInputWrapper = function MessageInputWrapper(_a, ref) {
  var channel = _a.channel,
      user = _a.user,
      repliedMessage = _a.repliedMessage,
      onSendMessage = _a.onSendMessage,
      onFileUpload = _a.onFileUpload,
      renderMessageInput = _a.renderMessageInput,
      isOnline = _a.isOnline,
      initialized = _a.initialized,
      onClickRepliedMessage = _a.onClickRepliedMessage,
      onCancelRepliedMessage = _a.onCancelRepliedMessage;
  var stringSet = React$1.useContext(LocalizationContext.LocalizationContext).stringSet;
  var disabled = !initialized || isDisabledBecauseFrozen(channel) || isDisabledBecauseMuted(channel) || !isOnline;
  var isOperator$1 = isOperator(channel);
  var isBroadcast = channel.isBroadcast; // custom message

  if (renderMessageInput) {
    return renderMessageInput({
      channel: channel,
      user: user,
      disabled: disabled
    });
  } // broadcast channel + not operator


  if (isBroadcast && !isOperator$1) {
    return null;
  } // other conditions


  return /*#__PURE__*/React__default$1["default"].createElement(MessageInput, {
    placeholder: isDisabledBecauseFrozen(channel) && stringSet.CHANNEL__MESSAGE_INPUT__PLACE_HOLDER__DISABLED || isDisabledBecauseMuted(channel) && stringSet.CHANNEL__MESSAGE_INPUT__PLACE_HOLDER__MUTED,
    nickname: user.nickname || '',
    profileUrl: user.profileUrl || '',
    ref: ref,
    disabled: disabled,
    repliedMessage: repliedMessage,
    onStartTyping: function onStartTyping() {
      channel.startTyping();
    },
    onSendMessage: onSendMessage,
    onFileUpload: onFileUpload,
    onCancelRepliedMessage: onCancelRepliedMessage,
    onClickRepliedMessage: onClickRepliedMessage
  });
};

var MessageInputWrapper$1 = /*#__PURE__*/React__default$1["default"].forwardRef(MessageInputWrapper);

function ArchivedBanner() {
  var _useContext = React$1.useContext(LocalizationContext.LocalizationContext),
      stringSet = _useContext.stringSet;

  return /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-archived-banner"
  }, /*#__PURE__*/React__default$1["default"].createElement(Label, {
    className: "rogu-archived-banner__message",
    type: LabelTypography.CAPTION_1,
    color: LabelColors.ONBACKGROUND_5
  }, stringSet.CLASS_ARCHIVED_BANNER));
}

var noop = function noop() {};

var ConversationPanel = function ConversationPanel(props) {
  var channelUrl = props.channelUrl,
      _props$stores = props.stores,
      sdkStore = _props$stores.sdkStore,
      userStore = _props$stores.userStore,
      _props$config = props.config,
      userId = _props$config.userId,
      logger = _props$config.logger,
      pubSub = _props$config.pubSub,
      isOnline = _props$config.isOnline,
      theme = _props$config.theme,
      imageCompression = _props$config.imageCompression,
      reconnect = props.dispatchers.reconnect,
      _props$queries = props.queries,
      queries = _props$queries === void 0 ? {} : _props$queries,
      startingPoint = props.startingPoint,
      highlightedMessage = props.highlightedMessage,
      useReaction = props.useReaction,
      showSearchIcon = props.showSearchIcon,
      onSearchClick = props.onSearchClick,
      renderChatItem = props.renderChatItem,
      renderChatHeader = props.renderChatHeader,
      renderCustomMessage = props.renderCustomMessage,
      renderUserProfile = props.renderUserProfile,
      disableUserProfile = props.disableUserProfile,
      renderMessageInput = props.renderMessageInput,
      useMessageGrouping = props.useMessageGrouping,
      onChatHeaderActionClick = props.onChatHeaderActionClick,
      onBeforeSendUserMessage = props.onBeforeSendUserMessage,
      onBeforeSendFileMessage = props.onBeforeSendFileMessage,
      onBeforeUpdateUserMessage = props.onBeforeUpdateUserMessage;
  var sdk = sdkStore.sdk;
  var config = props.config;
  var sdkError = sdkStore.error;
  var sdkInit = sdkStore.initialized;
  var user = userStore.user;

  if (queries.messageListQuery) {
    // eslint-disable-next-line no-console
    console.warn('messageListQuery has been deprecated, please use messageListParams instead');
  }

  var _useState = React$1.useState(startingPoint),
      _useState2 = LocalizationContext._slicedToArray(_useState, 2),
      intialTimeStamp = _useState2[0],
      setIntialTimeStamp = _useState2[1];

  React$1.useEffect(function () {
    setIntialTimeStamp(startingPoint);
  }, [startingPoint, channelUrl]);

  var _useState3 = React$1.useState(highlightedMessage),
      _useState4 = LocalizationContext._slicedToArray(_useState3, 2),
      highLightedMessageId = _useState4[0],
      setHighLightedMessageId = _useState4[1];

  React$1.useEffect(function () {
    setHighLightedMessageId(highlightedMessage);
  }, [highlightedMessage]);
  var userFilledMessageListQuery = queries.messageListParams;

  var _useReducer = React$1.useReducer(reducer, messagesInitialState),
      _useReducer2 = LocalizationContext._slicedToArray(_useReducer, 2),
      messagesStore = _useReducer2[0],
      messagesDispatcher = _useReducer2[1];

  var scrollRef = React$1.useRef(null);
  var allMessages = messagesStore.allMessages,
      loading = messagesStore.loading,
      initialized = messagesStore.initialized,
      unreadCount = messagesStore.unreadCount,
      unreadSince = messagesStore.unreadSince,
      isInvalid = messagesStore.isInvalid,
      _messagesStore$curren = messagesStore.currentGroupChannel,
      currentGroupChannel = _messagesStore$curren === void 0 ? {} : _messagesStore$curren,
      hasMore = messagesStore.hasMore,
      lastMessageTimeStamp = messagesStore.lastMessageTimeStamp,
      hasMoreToBottom = messagesStore.hasMoreToBottom,
      latestFetchedMessageTimeStamp = messagesStore.latestFetchedMessageTimeStamp,
      emojiContainer = messagesStore.emojiContainer,
      readStatus = messagesStore.readStatus;
  var isFrozen = currentGroupChannel.isFrozen,
      isBroadcast = currentGroupChannel.isBroadcast,
      isSuper = currentGroupChannel.isSuper;
  var _sdk$appInfo = sdk.appInfo,
      appInfo = _sdk$appInfo === void 0 ? {} : _sdk$appInfo;
  var usingReaction = appInfo.isUsingReaction && !isBroadcast && !isSuper && useReaction;
  var userDefinedDisableUserProfile = disableUserProfile || config.disableUserProfile;
  var userDefinedRenderProfile = renderUserProfile || config.renderUserProfile;
  var showScrollBot = hasMoreToBottom; // Reply message

  var _useState5 = React$1.useState(),
      _useState6 = LocalizationContext._slicedToArray(_useState5, 2),
      repliedMessage = _useState6[0],
      setRepliedMessage = _useState6[1]; // TODO: emojiAllMap, emoijAllList, nicknamesMap => should be moved to messagesStore


  var emojiAllMap = React$1.useMemo(function () {
    return usingReaction ? getAllEmojisMapFromEmojiContainer(emojiContainer) : new Map();
  }, [emojiContainer]);
  var emojiAllList = React$1.useMemo(function () {
    return usingReaction ? getAllEmojisFromEmojiContainer(emojiContainer) : [];
  }, [emojiContainer]);
  var nicknamesMap = React$1.useMemo(function () {
    return usingReaction ? getNicknamesMapFromMembers(currentGroupChannel.members) : new Map();
  }, [currentGroupChannel.members]); // Scrollup is default scroll for channel

  var onScrollCallback = useScrollCallback({
    currentGroupChannel: currentGroupChannel,
    lastMessageTimeStamp: lastMessageTimeStamp,
    userFilledMessageListQuery: userFilledMessageListQuery
  }, {
    hasMore: hasMore,
    logger: logger,
    messagesDispatcher: messagesDispatcher,
    sdk: sdk
  });
  var scrollToMessage = useScrollToMessage({
    setIntialTimeStamp: setIntialTimeStamp,
    setHighLightedMessageId: setHighLightedMessageId,
    allMessages: allMessages
  }, {
    logger: logger
  }); // onScrollDownCallback is added for navigation to different timestamps on messageSearch
  // hasMoreToBottom, onScrollDownCallback -> scroll down
  // hasMore, onScrollCallback -> scroll up(default behavior)

  var onScrollDownCallback = useScrollDownCallback({
    currentGroupChannel: currentGroupChannel,
    latestFetchedMessageTimeStamp: latestFetchedMessageTimeStamp,
    userFilledMessageListQuery: userFilledMessageListQuery,
    hasMoreToBottom: hasMoreToBottom
  }, {
    logger: logger,
    messagesDispatcher: messagesDispatcher,
    sdk: sdk
  });
  var toggleReaction = useToggleReactionCallback({
    currentGroupChannel: currentGroupChannel
  }, {
    logger: logger
  });
  var memoizedEmojiListItems = useMemoizedEmojiListItems({
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction
  }, {
    useReaction: usingReaction,
    logger: logger,
    userId: userId,
    emojiAllList: emojiAllList
  }); // to create message-datasource
  // this hook sets currentGroupChannel asynchronously

  useSetChannel({
    channelUrl: channelUrl,
    sdkInit: sdkInit
  }, {
    messagesDispatcher: messagesDispatcher,
    sdk: sdk,
    logger: logger
  }); // Hook to handle ChannelEvents and send values to useReducer using messagesDispatcher

  useHandleChannelEvents({
    currentGroupChannel: currentGroupChannel,
    sdkInit: sdkInit,
    hasMoreToBottom: hasMoreToBottom
  }, {
    messagesDispatcher: messagesDispatcher,
    sdk: sdk,
    logger: logger,
    scrollRef: scrollRef
  }); // hook that fetches messages when channel changes
  // to be clear here useGetChannel sets currentGroupChannel
  // and useInitialMessagesFetch executes when currentGroupChannel changes
  // p.s This one executes on intialTimeStamp change too

  useInitialMessagesFetch({
    currentGroupChannel: currentGroupChannel,
    userFilledMessageListQuery: userFilledMessageListQuery,
    intialTimeStamp: intialTimeStamp
  }, {
    sdk: sdk,
    logger: logger,
    messagesDispatcher: messagesDispatcher
  }); // handles API calls from withSendbird

  React$1.useEffect(function () {
    var subScriber = pubSubHandler(channelUrl, pubSub, messagesDispatcher);
    return function () {
      pubSubHandleRemover(subScriber);
    };
  }, [channelUrl, sdkInit]); // handling connection breaks

  useHandleReconnect({
    isOnline: isOnline
  }, {
    logger: logger,
    sdk: sdk,
    currentGroupChannel: currentGroupChannel,
    messagesDispatcher: messagesDispatcher,
    userFilledMessageListQuery: userFilledMessageListQuery
  }); // callbacks for Message CURD actions

  var deleteMessage = useDeleteMessageCallback({
    currentGroupChannel: currentGroupChannel,
    messagesDispatcher: messagesDispatcher
  }, {
    logger: logger
  });
  var updateMessage = useUpdateMessageCallback({
    currentGroupChannel: currentGroupChannel,
    messagesDispatcher: messagesDispatcher,
    onBeforeUpdateUserMessage: onBeforeUpdateUserMessage
  }, {
    logger: logger,
    sdk: sdk,
    pubSub: pubSub
  });
  var resendMessage = useResendMessageCallback({
    currentGroupChannel: currentGroupChannel,
    messagesDispatcher: messagesDispatcher
  }, {
    logger: logger
  });

  var _useSendMessageCallba = useSendMessageCallback({
    currentGroupChannel: currentGroupChannel,
    onBeforeSendUserMessage: onBeforeSendUserMessage
  }, {
    sdk: sdk,
    logger: logger,
    pubSub: pubSub,
    messagesDispatcher: messagesDispatcher
  }),
      _useSendMessageCallba2 = LocalizationContext._slicedToArray(_useSendMessageCallba, 2),
      messageInputRef = _useSendMessageCallba2[0],
      onSendMessage = _useSendMessageCallba2[1];

  var _useSendFileMessageCa = useSendFileMessageCallback({
    currentGroupChannel: currentGroupChannel,
    onBeforeSendFileMessage: onBeforeSendFileMessage,
    imageCompression: imageCompression
  }, {
    sdk: sdk,
    logger: logger,
    pubSub: pubSub,
    messagesDispatcher: messagesDispatcher
  }),
      _useSendFileMessageCa2 = LocalizationContext._slicedToArray(_useSendFileMessageCa, 1),
      onSendFileMessage = _useSendFileMessageCa2[0];

  if (!channelUrl) {
    return /*#__PURE__*/React__default$1["default"].createElement("div", {
      className: "rogu-conversation"
    }, /*#__PURE__*/React__default$1["default"].createElement(index$2.PlaceHolder, {
      type: index$2.PlaceHolderTypes.NO_CHANNELS
    }));
  }

  if (isInvalid) {
    return /*#__PURE__*/React__default$1["default"].createElement("div", {
      className: "rogu-conversation"
    }, /*#__PURE__*/React__default$1["default"].createElement(index$2.PlaceHolder, {
      type: index$2.PlaceHolderTypes.WRONG
    }));
  }

  if (sdkError) {
    return /*#__PURE__*/React__default$1["default"].createElement("div", {
      className: "rogu-conversation"
    }, /*#__PURE__*/React__default$1["default"].createElement(index$2.PlaceHolder, {
      type: index$2.PlaceHolderTypes.WRONG,
      retryToConnect: function retryToConnect() {
        logger.info('Channel: reconnecting');
        reconnect();
      }
    }));
  }

  return /*#__PURE__*/React__default$1["default"].createElement(index$1.UserProfileProvider, {
    className: "rogu-conversation",
    disableUserProfile: userDefinedDisableUserProfile,
    renderUserProfile: userDefinedRenderProfile
  }, renderChatHeader ? renderChatHeader({
    channel: currentGroupChannel,
    user: user
  }) : /*#__PURE__*/React__default$1["default"].createElement(Channel.ChatHeader, {
    theme: theme,
    currentGroupChannel: currentGroupChannel,
    currentUser: user,
    showSearchIcon: showSearchIcon,
    onSearchClick: onSearchClick,
    onActionClick: onChatHeaderActionClick,
    subTitle: currentGroupChannel.members && currentGroupChannel.members.length !== 2,
    isMuted: false
  }), unreadCount > 0 && /*#__PURE__*/React__default$1["default"].createElement(Notification, {
    count: unreadCount,
    onClick: function onClick() {
      if (intialTimeStamp) {
        setIntialTimeStamp(null);
        setHighLightedMessageId(null);
      } else {
        scrollIntoLast(); // there is no scroll

        if (scrollRef.current.scrollTop === 0) {
          currentGroupChannel.markAsRead();
          messagesDispatcher({
            type: MARK_AS_READ
          });
        }
      }
    },
    time: unreadSince
  }), loading ? /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-conversation"
  }, /*#__PURE__*/React__default$1["default"].createElement(index$2.PlaceHolder, {
    type: index$2.PlaceHolderTypes.LOADING
  })) : /*#__PURE__*/React__default$1["default"].createElement(ConversationScroll, {
    swapParams: sdk && sdk.getErrorFirstCallback && sdk.getErrorFirstCallback(),
    highLightedMessageId: highLightedMessageId,
    userId: userId,
    hasMore: hasMore,
    disabled: !isOnline,
    onScroll: onScrollCallback,
    onScrollDown: onScrollDownCallback,
    scrollRef: scrollRef,
    readStatus: readStatus,
    useReaction: usingReaction,
    allMessages: allMessages,
    scrollToMessage: scrollToMessage,
    emojiAllMap: emojiAllMap,
    membersMap: nicknamesMap,
    editDisabled: isDisabledBecauseFrozen(currentGroupChannel),
    deleteMessage: deleteMessage,
    updateMessage: updateMessage,
    resendMessage: resendMessage,
    toggleReaction: toggleReaction,
    emojiContainer: emojiContainer,
    renderChatItem: renderChatItem,
    showScrollBot: showScrollBot,
    onClickScrollBot: function onClickScrollBot() {
      setIntialTimeStamp(null);
      setHighLightedMessageId(null);
    },
    renderCustomMessage: renderCustomMessage,
    useMessageGrouping: useMessageGrouping,
    messagesDispatcher: messagesDispatcher,
    currentGroupChannel: currentGroupChannel,
    memoizedEmojiListItems: memoizedEmojiListItems,
    onReplyMessage: function onReplyMessage(message) {
      return setRepliedMessage(message);
    }
  }), /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-conversation__footer"
  }, isFrozen ? /*#__PURE__*/React__default$1["default"].createElement(ArchivedBanner, null) : /*#__PURE__*/React__default$1["default"].createElement(React__default$1["default"].Fragment, null, /*#__PURE__*/React__default$1["default"].createElement("div", {
    className: "rogu-conversation__typing-indicator"
  }, /*#__PURE__*/React__default$1["default"].createElement(TypingIndicator, {
    channelUrl: channelUrl,
    sb: sdk,
    logger: logger
  })), /*#__PURE__*/React__default$1["default"].createElement(MessageInputWrapper$1, {
    channel: currentGroupChannel,
    user: user,
    ref: messageInputRef,
    onSendMessage: onSendMessage,
    onFileUpload: onSendFileMessage,
    renderMessageInput: renderMessageInput,
    isOnline: isOnline,
    initialized: initialized,
    repliedMessage: repliedMessage,
    onClickRepliedMessage: function onClickRepliedMessage() {// TODO: scroll to the replied message
    },
    onCancelRepliedMessage: function onCancelRepliedMessage() {
      return setRepliedMessage(null);
    }
  }), !isOnline && /*#__PURE__*/React__default$1["default"].createElement(Channel.ConnectionStatus, {
    sdkInit: sdkInit,
    sb: sdk,
    logger: logger
  }))));
};
ConversationPanel.propTypes = {
  channelUrl: PropTypes__default["default"].string,
  stores: PropTypes__default["default"].shape({
    sdkStore: PropTypes__default["default"].shape({
      initialized: PropTypes__default["default"].bool,
      sdk: PropTypes__default["default"].shape({
        getErrorFirstCallback: PropTypes__default["default"].func,
        removeChannelHandler: PropTypes__default["default"].func,
        GroupChannel: PropTypes__default["default"].any,
        ChannelHandler: PropTypes__default["default"].any,
        addChannelHandler: PropTypes__default["default"].func,
        UserMessageParams: PropTypes__default["default"].any,
        FileMessageParams: PropTypes__default["default"].any,
        getAllEmoji: PropTypes__default["default"].func,
        appInfo: PropTypes__default["default"].shape({})
      }),
      error: PropTypes__default["default"].bool
    }),
    userStore: PropTypes__default["default"].shape({
      user: PropTypes__default["default"].shape({})
    })
  }).isRequired,
  dispatchers: PropTypes__default["default"].shape({
    reconnect: PropTypes__default["default"].func
  }).isRequired,
  config: PropTypes__default["default"].shape({
    disableUserProfile: PropTypes__default["default"].bool,
    renderUserProfile: PropTypes__default["default"].func,
    userId: PropTypes__default["default"].string.isRequired,
    isOnline: PropTypes__default["default"].bool.isRequired,
    theme: PropTypes__default["default"].string,
    logger: PropTypes__default["default"].shape({
      info: PropTypes__default["default"].func,
      error: PropTypes__default["default"].func,
      warning: PropTypes__default["default"].func
    }),
    pubSub: PropTypes__default["default"].shape({
      subscribe: PropTypes__default["default"].func,
      publish: PropTypes__default["default"].func
    }),
    imageCompression: PropTypes__default["default"].shape({
      compressionRate: PropTypes__default["default"].number,
      resizingWidth: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string]),
      resizingHeight: PropTypes__default["default"].oneOfType([PropTypes__default["default"].number, PropTypes__default["default"].string])
    })
  }).isRequired,
  queries: PropTypes__default["default"].shape({
    messageListParams: PropTypes__default["default"].shape({
      includeMetaArray: PropTypes__default["default"].bool,
      includeParentMessageText: PropTypes__default["default"].bool,
      includeReaction: PropTypes__default["default"].bool,
      includeReplies: PropTypes__default["default"].bool,
      includeThreadInfo: PropTypes__default["default"].bool,
      limit: PropTypes__default["default"].number,
      reverse: PropTypes__default["default"].bool,
      senderUserIdsFilter: PropTypes__default["default"].arrayOf(PropTypes__default["default"].string)
    })
  }),
  startingPoint: PropTypes__default["default"].number,
  highlightedMessage: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].number]),
  onBeforeSendUserMessage: PropTypes__default["default"].func,
  // onBeforeSendUserMessage(text)
  onBeforeSendFileMessage: PropTypes__default["default"].func,
  // onBeforeSendFileMessage(File)
  onBeforeUpdateUserMessage: PropTypes__default["default"].func,
  renderChatItem: PropTypes__default["default"].oneOfType([PropTypes__default["default"].element, PropTypes__default["default"].func]),
  renderCustomMessage: PropTypes__default["default"].func,
  renderMessageInput: PropTypes__default["default"].oneOfType([PropTypes__default["default"].element, PropTypes__default["default"].func]),
  renderChatHeader: PropTypes__default["default"].oneOfType([PropTypes__default["default"].element, PropTypes__default["default"].func]),
  showSearchIcon: PropTypes__default["default"].bool,
  onSearchClick: PropTypes__default["default"].func,
  onChatHeaderActionClick: PropTypes__default["default"].func,
  useReaction: PropTypes__default["default"].bool,
  disableUserProfile: PropTypes__default["default"].bool,
  renderUserProfile: PropTypes__default["default"].func,
  useMessageGrouping: PropTypes__default["default"].bool
};
ConversationPanel.defaultProps = {
  channelUrl: null,
  queries: {},
  onBeforeSendUserMessage: null,
  onBeforeSendFileMessage: null,
  onBeforeUpdateUserMessage: null,
  startingPoint: null,
  highlightedMessage: null,
  renderChatItem: null,
  renderCustomMessage: null,
  renderMessageInput: null,
  renderChatHeader: null,
  useReaction: true,
  showSearchIcon: false,
  onSearchClick: noop,
  disableUserProfile: false,
  renderUserProfile: null,
  useMessageGrouping: true,
  onChatHeaderActionClick: noop
};
var index = LocalizationContext.withSendbirdContext(ConversationPanel);

exports.SendBirdProvider = SendbirdProvider;
exports.App = App;
exports.withSendBird = LocalizationContext.withSendbirdContext;
exports.sendBirdSelectors = index$1.selectors;
exports.Channel = index;
exports.useSendbirdStateContext = useSendbirdStateContext;
//# sourceMappingURL=index.js.map
