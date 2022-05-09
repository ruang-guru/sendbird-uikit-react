import { a as _toConsumableArray, f as format, b as _objectSpread2, u as uuidv4, c as _slicedToArray, L as LocalizationContext, d as _defineProperty, e as _inherits, g as _createSuper, j as _createClass, h as _classCallCheck, i as _assertThisInitialized, w as withSendbirdContext } from './LocalizationContext-f7ac3bcb.js';
import React__default, { useEffect, useCallback, useRef, useMemo, useContext, useState, useLayoutEffect, Component, useReducer } from 'react';
import PropTypes from 'prop-types';
import { S as SEND_USER_MESSAGE, a as SEND_MESSAGE_START, b as SEND_FILE_MESSAGE, U as UPDATE_USER_MESSAGE, D as DELETE_MESSAGE, E as EmojiListItems, g as ContextMenu, I as IconButton, h as MenuItems, i as MenuItem, f as TextButton, k as UserProfileContext, l as ConnectedUserProfile, e as Modal, B as ButtonTypes, d as UserProfileProvider } from './index-b5696879.js';
import { g as getOutgoingMessageStates, a as getSendingMessageStatus, f as filterMessageListParams, B as getOutgoingMessageState, i as isSentStatus, n as isUserMessage, o as isFailedMessage, t as isPendingMessage, p as isSentMessage, d as getClassName, q as copyToClipboard, K as getEmojiListAll, L as getEmojiMapAll, M as isReactedBy, N as getEmojiTooltipString, P as isEditedMessage, Q as getUIKitFileType, J as truncateString, S as isVideoMessage, j as isGifMessage, D as isUrl, T as getUIKitFileTypes, U as isThumbnailMessage, V as isVideo, W as isGif, X as isFileMessage, Y as isSupportedFileView, s as getUIKitMessageTypes, w as getSenderName, x as isTextMessage, y as isOGMessage, C as getUIKitMessageType, Z as isImageMessage, _ as isAudioMessage } from './index-37a3224d.js';
import { c as compareIds, L as LinkLabel, D as DateSeparator, M as MessageInput, F as FileViewer } from './index-ce8c0027.js';
import { I as ImageRenderer, a as Icon, b as IconTypes, a8 as IconColors, ac as Loader, a9 as Label, ab as LabelTypography, aa as LabelColors, a4 as Avatar, a6 as PlaceHolder, a7 as PlaceHolderTypes, ad as LabelStringSet } from './index-83aac00c.js';
import { i as isSameDay } from './index-7f9764b1.js';
import { C as ChannelAvatar } from './index-3e33f9a0.js';

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
var ON_MESSAGE_THREAD_INFO_UPDATED = 'ON_MESSAGE_THREAD_INFO_UPDATED';
var ON_MESSAGE_DELETED = 'ON_MESSAGE_DELETED';
var ON_MESSAGE_DELETED_BY_REQ_ID = 'ON_MESSAGE_DELETED_BY_REQ_ID';
var SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';
var SET_CHANNEL_INVALID = 'SET_CHANNEL_INVALID';
var MARK_AS_READ = 'MARK_AS_READ';
var ON_REACTION_UPDATED = 'ON_REACTION_UPDATED';
var SET_EMOJI_CONTAINER = 'SET_EMOJI_CONTAINER';
var MESSAGE_LIST_PARAMS_CHANGED = 'MESSAGE_LIST_PARAMS_CHANGED';

getOutgoingMessageStates();
var UNDEFINED = 'undefined';

var _getSendingMessageSta$1 = getSendingMessageStatus(),
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
    var scrollDOM = document.querySelector('.sendbird-conversation__messages-padding'); // eslint-disable-next-line no-multi-assign

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
  subscriber.set(SEND_USER_MESSAGE, pubSub.subscribe(SEND_USER_MESSAGE, function (msg) {
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
  subscriber.set(SEND_MESSAGE_START, pubSub.subscribe(SEND_MESSAGE_START, function (msg) {
    var channel = msg.channel,
        message = msg.message;

    if (channel && channelUrl === channel.url) {
      dispatcher({
        type: SEND_MESSAGEGE_START,
        payload: message
      });
    }
  }));
  subscriber.set(SEND_FILE_MESSAGE, pubSub.subscribe(SEND_FILE_MESSAGE, function (msg) {
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
  subscriber.set(UPDATE_USER_MESSAGE, pubSub.subscribe(UPDATE_USER_MESSAGE, function (msg) {
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
  subscriber.set(DELETE_MESSAGE, pubSub.subscribe(DELETE_MESSAGE, function (msg) {
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
var getEmojiCategoriesFromEmojiContainer$1 = function getEmojiCategoriesFromEmojiContainer() {
  var emojiContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return emojiContainer.emojiCategories ? emojiContainer.emojiCategories : [];
};
var getAllEmojisFromEmojiContainer$1 = function getAllEmojisFromEmojiContainer() {
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
var getEmojisFromEmojiContainer$1 = function getEmojisFromEmojiContainer() {
  var emojiContainer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var emojiCategoryId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return emojiContainer.emojiCategories ? emojiContainer.emojiCategories.filter(function (emojiCategory) {
    return emojiCategory.id === emojiCategoryId;
  })[0].emojis : [];
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
  return format(message.createdAt, 'p');
};
var isSameGroup = function isSameGroup(message, comparingMessage) {
  var _message$sender, _comparingMessage$sen, _message$sender2, _comparingMessage$sen2;

  if (!(message && comparingMessage && (message === null || message === void 0 ? void 0 : message.messageType) !== 'admin' && (comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.messageType) !== 'admin' && message !== null && message !== void 0 && message.sender && comparingMessage !== null && comparingMessage !== void 0 && comparingMessage.sender && message !== null && message !== void 0 && message.createdAt && comparingMessage !== null && comparingMessage !== void 0 && comparingMessage.createdAt && message !== null && message !== void 0 && (_message$sender = message.sender) !== null && _message$sender !== void 0 && _message$sender.userId && comparingMessage !== null && comparingMessage !== void 0 && (_comparingMessage$sen = comparingMessage.sender) !== null && _comparingMessage$sen !== void 0 && _comparingMessage$sen.userId)) {
    return false;
  }

  return (message === null || message === void 0 ? void 0 : message.sendingStatus) === (comparingMessage === null || comparingMessage === void 0 ? void 0 : comparingMessage.sendingStatus) && (message === null || message === void 0 ? void 0 : (_message$sender2 = message.sender) === null || _message$sender2 === void 0 ? void 0 : _message$sender2.userId) === (comparingMessage === null || comparingMessage === void 0 ? void 0 : (_comparingMessage$sen2 = comparingMessage.sender) === null || _comparingMessage$sen2 === void 0 ? void 0 : _comparingMessage$sen2.userId) && getMessageCreatedAt(message) === getMessageCreatedAt(comparingMessage);
};
var compareMessagesForGrouping = function compareMessagesForGrouping(prevMessage, currMessage, nextMessage) {
  var sendingStatus = (currMessage === null || currMessage === void 0 ? void 0 : currMessage.sendingStatus) || '';
  var isAcceptable = sendingStatus !== 'pending' && sendingStatus !== 'failed';
  return [isSameGroup(prevMessage, currMessage) && isAcceptable, isSameGroup(currMessage, nextMessage) && isAcceptable];
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
      var messages = _toConsumableArray(allMessages);

      messages.splice(lastIndexOfSucceededMessage + 1, 0, newMessage);
      return messages;
    }
  }

  return [].concat(_toConsumableArray(allMessages), [newMessage]);
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

var _getSendingMessageSta = getSendingMessageStatus(),
    SUCCEEDED = _getSendingMessageSta.SUCCEEDED,
    FAILED = _getSendingMessageSta.FAILED,
    PENDING = _getSendingMessageSta.PENDING;

function reducer(state, action) {
  switch (action.type) {
    case RESET_STATE:
      return messagesInitialState;

    case RESET_MESSAGES:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        // when user switches channel, if the previous channel `hasMore`
        // the onScroll gets called twice, setting hasMore false prevents this
        hasMore: false,
        allMessages: []
      });

    case GET_PREV_MESSAGES_START:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        loading: true
      });

    case CLEAR_SENT_MESSAGES:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        allMessages: _toConsumableArray(state.allMessages.filter(function (m) {
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


        var duplicatedMessageIds = [];
        var updatedAllMessages = state.allMessages.map(function (msg) {
          var duplicatedMessage = receivedMessages.find(function (_ref) {
            var messageId = _ref.messageId;
            return compareIds(messageId, msg.messageId);
          });

          if (!duplicatedMessage) {
            return msg;
          }

          duplicatedMessageIds.push(duplicatedMessage.messageId);
          return duplicatedMessage.updatedAt > msg.updatedAt ? duplicatedMessage : msg;
        });
        var filteredNewMessages = duplicatedMessageIds.length > 0 ? receivedMessages.filter(function (msg) {
          return !duplicatedMessageIds.find(function (messageId) {
            return compareIds(messageId, msg.messageId);
          });
        }) : receivedMessages;
        var hasHasMoreToBottom = hasOwnProperty('hasMoreToBottom')(action.payload);
        var hasLatestFetchedMessageTimeStamp = hasOwnProperty('latestFetchedMessageTimeStamp')(action.payload);
        return _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, state), {}, {
          loading: false,
          initialized: true,
          hasMore: action.payload.hasMore,
          lastMessageTimeStamp: action.payload.lastMessageTimeStamp
        }, hasHasMoreToBottom && {
          hasMoreToBottom: action.payload.hasMoreToBottom
        }), hasLatestFetchedMessageTimeStamp && {
          latestFetchedMessageTimeStamp: action.payload.latestFetchedMessageTimeStamp
        }), {}, {
          allMessages: [].concat(_toConsumableArray(filteredNewMessages), _toConsumableArray(updatedAllMessages))
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


        var _duplicatedMessageIds = [];

        var _updatedAllMessages = state.allMessages.map(function (msg) {
          var duplicatedMessage = _receivedMessages.find(function (_ref2) {
            var messageId = _ref2.messageId;
            return compareIds(messageId, msg.messageId);
          });

          if (!duplicatedMessage) {
            return msg;
          }

          _duplicatedMessageIds.push(duplicatedMessage.messageId);

          return duplicatedMessage.updatedAt > msg.updatedAt ? duplicatedMessage : msg;
        });

        var _filteredNewMessages = _duplicatedMessageIds.length > 0 ? _receivedMessages.filter(function (msg) {
          return !_duplicatedMessageIds.find(function (messageId) {
            return compareIds(messageId, msg.messageId);
          });
        }) : _receivedMessages;

        return _objectSpread2(_objectSpread2({}, state), {}, {
          loading: false,
          initialized: true,
          hasMore: action.payload.hasMore,
          lastMessageTimeStamp: action.payload.lastMessageTimeStamp,
          hasMoreToBottom: action.payload.hasMoreToBottom,
          latestFetchedMessageTimeStamp: action.payload.latestFetchedMessageTimeStamp,
          allMessages: [].concat(_toConsumableArray(_updatedAllMessages), _toConsumableArray(_filteredNewMessages))
        });
      }

    case GET_NEXT_MESSAGES_FAILURE:
      {
        return _objectSpread2({}, state);
      }

    case SEND_MESSAGEGE_START:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        allMessages: [].concat(_toConsumableArray(state.allMessages), [_objectSpread2({}, action.payload)])
      });

    case SEND_MESSAGEGE_SUCESS:
      {
        var newMessages = state.allMessages.map(function (m) {
          return compareIds(m.reqId, action.payload.reqId) ? action.payload : m;
        });

        _toConsumableArray(newMessages).sort(function (a, b) {
          return a.sendingStatus && b.sendingStatus && a.sendingStatus === SUCCEEDED && (b.sendingStatus === PENDING || b.sendingStatus === FAILED) ? -1 : 1;
        });

        return _objectSpread2(_objectSpread2({}, state), {}, {
          allMessages: newMessages
        });
      }

    case SEND_MESSAGEGE_FAILURE:
      {
        // eslint-disable-next-line no-param-reassign
        action.payload.failed = true;
        return _objectSpread2(_objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(function (m) {
            return compareIds(m.reqId, action.payload.reqId) ? action.payload : m;
          })
        });
      }

    case SET_CURRENT_CHANNEL:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          currentGroupChannel: action.payload,
          isInvalid: false
        });
      }

    case SET_CHANNEL_INVALID:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
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

        if (!compareIds(channel.url, currentGroupChannelUrl)) {
          return state;
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
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

        if (!compareIds(_channel.url, _currentGroupChannelUrl)) {
          return state;
        } // Excluded overlapping messages


        if (state.allMessages.some(function (msg) {
          return msg.messageId === message.messageId;
        })) {
          return state;
        } // Filter by userFilledQuery


        if (state.messageListParams && !filterMessageListParams(state.messageListParams, message)) {
          return state;
        }

        _unreadCount = state.unreadCount + 1; // reset unreadCount if have to scrollToEnd

        if (scrollToEnd) {
          _unreadCount = 0;
        }

        if (message.isAdminMessage && message.isAdminMessage()) {
          return _objectSpread2(_objectSpread2({}, state), {}, {
            allMessages: passUnsuccessfullMessages(state.allMessages, message)
          });
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          unreadCount: _unreadCount,
          unreadSince: _unreadCount === 1 ? format(new Date(), 'HH.mm dd MMMM yyyy') : unreadSince,
          allMessages: passUnsuccessfullMessages(state.allMessages, message)
        });
      }

    case ON_MESSAGE_UPDATED:
      {
        var _action$payload2 = action.payload,
            _channel2 = _action$payload2.channel,
            _message = _action$payload2.message;

        var _currentGroupChannelUrl2 = state.currentGroupChannel && state.currentGroupChannel.url || '';

        if (!compareIds(_channel2.url, _currentGroupChannelUrl2)) {
          return state; // Ignore event when it is not for the current channel
        }

        if (state.messageListParams && !filterMessageListParams(state.messageListParams, _message)) {
          // Delete the message if it doesn't match to the params anymore
          return _objectSpread2(_objectSpread2({}, state), {}, {
            allMessages: state.allMessages.filter(function (m) {
              return !compareIds(m.messageId, _message === null || _message === void 0 ? void 0 : _message.messageId);
            })
          });
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(function (m) {
            return compareIds(m.messageId, action.payload.message.messageId) ? action.payload.message : m;
          })
        });
      }

    case ON_MESSAGE_THREAD_INFO_UPDATED:
      {
        var _action$payload3 = action.payload,
            _channel3 = _action$payload3.channel,
            event = _action$payload3.event;
        var channelUrl = event.channelUrl,
            threadInfo = event.threadInfo,
            targetMessageId = event.targetMessageId;

        var _currentGroupChannelUrl3 = state.currentGroupChannel && state.currentGroupChannel.url || '';

        if (!compareIds(_channel3.url, _currentGroupChannelUrl3) || !compareIds(_channel3.url, channelUrl)) {
          return state; // Ignore event when it is not for the current channel
        }

        return _objectSpread2(_objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(function (m) {
            if (compareIds(m.messageId, targetMessageId)) {
              // eslint-disable-next-line no-param-reassign
              m.threadInfo = threadInfo; // Upsert threadInfo to the target message
            }

            return m;
          })
        });
      }

    case RESEND_MESSAGEGE_START:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        allMessages: state.allMessages.map(function (m) {
          return compareIds(m.reqId, action.payload.reqId) ? action.payload : m;
        })
      });

    case MARK_AS_READ:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        unreadCount: 0,
        unreadSince: null
      });

    case ON_MESSAGE_DELETED:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        allMessages: state.allMessages.filter(function (m) {
          return !compareIds(m.messageId, action.payload);
        })
      });

    case ON_MESSAGE_DELETED_BY_REQ_ID:
      return _objectSpread2(_objectSpread2({}, state), {}, {
        allMessages: state.allMessages.filter(function (m) {
          return !compareIds(m.reqId, action.payload);
        })
      });

    case SET_EMOJI_CONTAINER:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          emojiContainer: action.payload
        });
      }

    case ON_REACTION_UPDATED:
      {
        return _objectSpread2(_objectSpread2({}, state), {}, {
          allMessages: state.allMessages.map(function (m) {
            if (compareIds(m.messageId, action.payload.messageId)) {
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
        return _objectSpread2(_objectSpread2({}, state), {}, {
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
      scrollRef = _ref2.scrollRef,
      setQuoteMessage = _ref2.setQuoteMessage;
  var channelUrl = currentGroupChannel && (currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.url);
  useEffect(function () {
    var messageReceiverId = uuidv4();

    if (channelUrl && sdk && sdk.ChannelHandler) {
      var ChannelHandler = new sdk.ChannelHandler();
      logger.info('Channel | useHandleChannelEvents: Setup event handler', messageReceiverId);

      ChannelHandler.onMessageReceived = function (channel, message) {
        // donot update if hasMoreToBottom
        if (compareIds(channel.url, channelUrl) && !hasMoreToBottom) {
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
                try {
                  currentGroupChannel.markAsRead();
                } catch (_unused) {//
                }

                scrollIntoLast();
              });
            } catch (error) {
              logger.warning('Channel | onMessageReceived | scroll to end failed');
            }
          }
        }

        if (compareIds(channel.url, channelUrl) && hasMoreToBottom) {
          messagesDispatcher({
            type: UPDATE_UNREAD_COUNT,
            payload: {
              channel: channel
            }
          });
        }
      };
      /**
       * We need to update current channel with the channel,
       * when onReadReceiptUpdated or onDeliveryReceiptUpdated are called,
       * because cachedReadReceiptStatus and cachedDeliveryReceiptStatus properties were changed
       */


      ChannelHandler.onReadReceiptUpdated = function (channel) {
        if (compareIds(channel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onReadReceiptUpdated', channel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: channel
          });
        }
      };

      ChannelHandler.onDeliveryReceiptUpdated = function (channel) {
        if (compareIds(channel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onDeliveryReceiptUpdated', channel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: channel
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

      ChannelHandler.onThreadInfoUpdated = function (channel, event) {
        logger.info('Channel | useHandleChannelEvents: onThreadInfoUpdated', event);
        messagesDispatcher({
          type: ON_MESSAGE_THREAD_INFO_UPDATED,
          payload: {
            channel: channel,
            event: event
          }
        });
      };

      ChannelHandler.onMessageDeleted = function (_, messageId) {
        logger.info('Channel | useHandleChannelEvents: onMessageDeleted', messageId);
        setQuoteMessage(null);
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
        if (compareIds(groupChannel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onChannelChanged', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onChannelFrozen = function (groupChannel) {
        if (compareIds(groupChannel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onChannelFrozen', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onChannelUnfrozen = function (groupChannel) {
        if (compareIds(groupChannel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onChannelUnFrozen', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserMuted = function (groupChannel) {
        if (compareIds(groupChannel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onUserMuted', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserUnmuted = function (groupChannel) {
        if (compareIds(groupChannel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onUserUnmuted', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onUserBanned = function (groupChannel) {
        if (compareIds(groupChannel.url, channelUrl)) {
          logger.info('Channel | useHandleChannelEvents: onUserBanned', groupChannel);
          messagesDispatcher({
            type: SET_CURRENT_CHANNEL,
            payload: groupChannel
          });
        }
      };

      ChannelHandler.onOperatorUpdated = function (groupChannel) {
        if (compareIds(groupChannel.url, channelUrl)) {
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
  useEffect(function () {
    if (channelUrl && sdkInit && sdk && sdk.GroupChannel) {
      logger.info('Channel | useSetChannel fetching channel', channelUrl);
      sdk.GroupChannel.getChannel(channelUrl).then(function (groupChannel) {
        logger.info('Channel | useSetChannel fetched channel', groupChannel);
        messagesDispatcher({
          type: SET_CURRENT_CHANNEL,
          payload: groupChannel
        });
        logger.info('Channel: Mark as read', groupChannel); // this order is important - this mark as read should update the event handler up above

        try {
          groupChannel.markAsRead();
        } catch (_unused) {//
        }
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
      intialTimeStamp = _ref.intialTimeStamp,
      replyType = _ref.replyType;
  var sdk = _ref2.sdk,
      logger = _ref2.logger,
      messagesDispatcher = _ref2.messagesDispatcher;
  var channelUrl = currentGroupChannel && currentGroupChannel.url;
  useEffect(function () {
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

      if (replyType && replyType === 'QUOTE_REPLY') {
        messageListParams.includeThreadInfo = true;
        messageListParams.includeParentMessageInfo = true;
        messageListParams.replyType = 'only_reply_to_channel';
      }

      if (userFilledMessageListQuery) {
        Object.keys(userFilledMessageListQuery).forEach(function (key) {
          messageListParams[key] = userFilledMessageListQuery[key];
        });
      }

      if (replyType && replyType === 'QUOTE_REPLY' || userFilledMessageListQuery) {
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
          nextMessageListParams.isInclusive = true;
          nextMessageListParams.includeReplies = false;
          nextMessageListParams.includeReaction = true;

          if (replyType && replyType === 'QUOTE_REPLY') {
            nextMessageListParams.includeThreadInfo = true;
            nextMessageListParams.includeParentMessageInfo = true;
            nextMessageListParams.replyType = 'only_reply_to_channel';
          }

          if (userFilledMessageListQuery) {
            Object.keys(userFilledMessageListQuery).forEach(function (key) {
              nextMessageListParams[key] = userFilledMessageListQuery[key];
            });
          }

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

          try {
            currentGroupChannel.markAsRead();
          } catch (_unused) {//
          }
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

          try {
            currentGroupChannel.markAsRead();
          } catch (_unused2) {//
          }
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

function useHandleReconnect(_a, _b) {
  var isOnline = _a.isOnline,
      replyType = _a.replyType;
  var logger = _b.logger,
      sdk = _b.sdk,
      currentGroupChannel = _b.currentGroupChannel,
      messagesDispatcher = _b.messagesDispatcher,
      userFilledMessageListQuery = _b.userFilledMessageListQuery;
  useEffect(function () {
    var wasOffline = !isOnline;
    return function () {
      var _a; // state changed from offline to online


      if (wasOffline && (currentGroupChannel === null || currentGroupChannel === void 0 ? void 0 : currentGroupChannel.url)) {
        logger.info('Refreshing conversation state');
        var useReaction = ((_a = sdk === null || sdk === void 0 ? void 0 : sdk.appInfo) === null || _a === void 0 ? void 0 : _a.isUsingReaction) || false;
        var messageListParams_1 = new sdk.MessageListParams();
        messageListParams_1.prevResultSize = 30;
        messageListParams_1.isInclusive = true;
        messageListParams_1.includeReplies = false;
        messageListParams_1.includeReaction = useReaction;

        if (replyType && replyType === 'QUOTE_REPLY') {
          messageListParams_1.includeThreadInfo = true;
          messageListParams_1.includeParentMessageInfo = true;
          messageListParams_1.replyType = 'only_reply_to_channel';
        }

        if (userFilledMessageListQuery) {
          Object.keys(userFilledMessageListQuery).forEach(function (key) {
            messageListParams_1[key] = userFilledMessageListQuery[key];
          });
        }

        logger.info('Channel: Fetching messages', {
          currentGroupChannel: currentGroupChannel,
          userFilledMessageListQuery: userFilledMessageListQuery
        });
        messagesDispatcher({
          type: GET_PREV_MESSAGES_START,
          payload: null
        });
        sdk.GroupChannel.getChannel(currentGroupChannel.url).then(function (groupChannel) {
          var lastMessageTime = new Date().getTime();
          groupChannel.getMessagesByTimestamp(lastMessageTime, messageListParams_1).then(function (messages) {
            messagesDispatcher({
              type: CLEAR_SENT_MESSAGES,
              payload: null
            });
            var hasMore = (messages === null || messages === void 0 ? void 0 : messages.length) > 0;
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
            var _a;

            try {
              (_a = currentGroupChannel.markAsRead) === null || _a === void 0 ? void 0 : _a.call(currentGroupChannel);
            } catch (_b) {//
            }
          });
        });
      }
    };
  }, [isOnline, replyType]);
}

function useScrollCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      lastMessageTimeStamp = _ref.lastMessageTimeStamp,
      userFilledMessageListQuery = _ref.userFilledMessageListQuery,
      replyType = _ref.replyType;
  var hasMore = _ref2.hasMore,
      logger = _ref2.logger,
      messagesDispatcher = _ref2.messagesDispatcher,
      sdk = _ref2.sdk;
  return useCallback(function (cb) {
    if (!hasMore) {
      return;
    }

    var _sdk$appInfo = sdk.appInfo,
        appInfo = _sdk$appInfo === void 0 ? {} : _sdk$appInfo;
    var useReaction = appInfo.isUsingReaction || false;
    var messageListParams = new sdk.MessageListParams();
    messageListParams.prevResultSize = 30;
    messageListParams.isInclusive = true;
    messageListParams.includeReplies = false;
    messageListParams.includeReaction = useReaction;

    if (replyType && replyType === 'QUOTE_REPLY') {
      messageListParams.includeThreadInfo = true;
      messageListParams.includeParentMessageInfo = true;
      messageListParams.replyType = 'only_reply_to_channel';
    }

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
      try {
        currentGroupChannel.markAsRead();
      } catch (_unused) {//
      }
    });
  }, [currentGroupChannel, lastMessageTimeStamp, replyType]);
}

var RESULT_SIZE = 30;

function useScrollDownCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      latestFetchedMessageTimeStamp = _ref.latestFetchedMessageTimeStamp,
      userFilledMessageListQuery = _ref.userFilledMessageListQuery,
      hasMoreToBottom = _ref.hasMoreToBottom,
      replyType = _ref.replyType;
  var logger = _ref2.logger,
      messagesDispatcher = _ref2.messagesDispatcher,
      sdk = _ref2.sdk;
  return useCallback(function (cb) {
    if (!hasMoreToBottom) {
      return;
    }

    var _sdk$appInfo = sdk.appInfo,
        appInfo = _sdk$appInfo === void 0 ? {} : _sdk$appInfo;
    var useReaction = appInfo.isUsingReaction || false;
    var messageListParams = new sdk.MessageListParams();
    messageListParams.nextResultSize = RESULT_SIZE;
    messageListParams.isInclusive = true;
    messageListParams.includeReplies = false;
    messageListParams.includeReaction = useReaction;

    if (replyType && replyType === 'QUOTE_REPLY') {
      messageListParams.includeThreadInfo = true;
      messageListParams.includeParentMessageInfo = true;
      messageListParams.replyType = 'only_reply_to_channel';
    }

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
      try {
        currentGroupChannel.markAsRead();
      } catch (_unused) {//
      }
    });
  }, [currentGroupChannel, latestFetchedMessageTimeStamp, hasMoreToBottom, replyType]);
}

function useDeleteMessageCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel,
      messagesDispatcher = _ref.messagesDispatcher;
  var logger = _ref2.logger;
  return useCallback(function (message, cb) {
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
  return useCallback(function (messageId, text, cb) {
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
        pubSub.publish(UPDATE_USER_MESSAGE, {
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
  return useCallback(function (failedMessage) {
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
  var messageInputRef = useRef(null);
  var sendMessage = useCallback(function () {
    var quoteMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var text = messageInputRef.current.value;

    var createParamsDefault = function createParamsDefault(txt) {
      var message = typeof txt === 'string' ? txt.trim() : txt;
      var params = new sdk.UserMessageParams();
      params.message = message;

      if (quoteMessage) {
        params.isReplyToChannel = true;
        params.parentMessageId = quoteMessage.messageId;
      }

      return params;
    };

    var createCustomPrams = onBeforeSendUserMessage && typeof onBeforeSendUserMessage === 'function';

    if (createCustomPrams) {
      logger.info('Channel: creating params using onBeforeSendUserMessage', onBeforeSendUserMessage);
    }

    var params = onBeforeSendUserMessage ? onBeforeSendUserMessage(text, quoteMessage) : createParamsDefault(text);
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
    pubSub.publish(SEND_MESSAGE_START, {
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
  var sendMessage = useCallback(function (file) {
    var quoteMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
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

      if (quoteMessage) {
        params.isReplyToChannel = true;
        params.parentMessageId = quoteMessage.messageId;
      }

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

            var params = createCustomParams ? onBeforeSendFileMessage(compressedFile, quoteMessage) : createParamsDefault(compressedFile);
            logger.info('Channel: Uploading file message start!', params);
            var pendingMessage = currentGroupChannel.sendFileMessage(params, function (response, err) {
              var swapParams = sdk.getErrorFirstCallback();

              var _ref3 = swapParams ? [err, response] : [response, err],
                  _ref4 = _slicedToArray(_ref3, 2),
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
            pubSub.publish(SEND_MESSAGE_START, {
              /* pubSub is used instead of messagesDispatcher
                to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
              message: _objectSpread2(_objectSpread2({}, pendingMessage), {}, {
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

      var params = onBeforeSendFileMessage ? onBeforeSendFileMessage(file, quoteMessage) : createParamsDefault(file);
      logger.info('Channel: Uploading file message start!', params);
      var pendingMsg = currentGroupChannel.sendFileMessage(params, function (response, err) {
        var swapParams = sdk.getErrorFirstCallback();

        var _ref5 = swapParams ? [err, response] : [response, err],
            _ref6 = _slicedToArray(_ref5, 2),
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
      pubSub.publish(SEND_MESSAGE_START, {
        /* pubSub is used instead of messagesDispatcher
          to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
        message: _objectSpread2(_objectSpread2({}, pendingMsg), {}, {
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

var ReactionButton = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var className = props.className,
      width = props.width,
      height = props.height,
      selected = props.selected,
      _onClick = props.onClick,
      children = props.children;
  return /*#__PURE__*/React__default.createElement("div", {
    className: [].concat(_toConsumableArray(Array.isArray(className) ? className : [className]), ["sendbird-reaction-button".concat(selected ? '--selected' : '')]).join(' '),
    ref: ref,
    role: "button",
    style: {
      width: typeof width === 'string' ? "".concat(width.slice(0, -2) - 2, "px") : "".concat(width - 2, "px"),
      height: typeof height === 'string' ? "".concat(height.slice(0, -2) - 2, "px") : "".concat(height - 2, "px")
    },
    onClick: function onClick(e) {
      return _onClick(e);
    },
    onKeyDown: function onKeyDown(e) {
      return _onClick(e);
    },
    tabIndex: 0
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-reaction-button__inner"
  }, children));
});
ReactionButton.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.element.isRequired
};
ReactionButton.defaultProps = {
  className: '',
  width: '36px',
  height: '36px',
  selected: false,
  onClick: function onClick() {}
};

function useMemoizedEmojiListItems(_ref, _ref2) {
  var emojiContainer = _ref.emojiContainer,
      toggleReaction = _ref.toggleReaction;
  var useReaction = _ref2.useReaction,
      logger = _ref2.logger,
      userId = _ref2.userId,
      emojiAllList = _ref2.emojiAllList;

  /* eslint-disable react/prop-types */
  return useMemo(function () {
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

      return /*#__PURE__*/React__default.createElement(EmojiListItems, {
        parentRef: parentRef,
        parentContainRef: parentContainRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: spaceFromTrigger
      }, emojiAllList.map(function (emoji) {
        var reactedReaction = message.reactions.filter(function (reaction) {
          return reaction.key === emoji.key;
        })[0];
        var isReacted = reactedReaction ? !(reactedReaction.userIds.indexOf(userId) < 0) : false;
        return /*#__PURE__*/React__default.createElement(ReactionButton, {
          key: emoji.key,
          width: "36px",
          height: "36px",
          selected: isReacted,
          onClick: function onClick() {
            closeDropdown();
            toggleReaction(message, emoji.key, isReacted);
          }
        }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
          url: emoji.url,
          width: "28px",
          height: "28px",
          defaultComponent: /*#__PURE__*/React__default.createElement(Icon, {
            width: "28px",
            height: "28px",
            type: IconTypes.QUESTION
          })
        }));
      }));
    };
  }, [emojiContainer, toggleReaction]);
}

function useToggleReactionCallback(_ref, _ref2) {
  var currentGroupChannel = _ref.currentGroupChannel;
  var logger = _ref2.logger;
  return useCallback(function (message, key, isReacted) {
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
      setAnimatedMessageId = _a.setAnimatedMessageId,
      allMessages = _a.allMessages;
  var logger = _b.logger;
  return useCallback(function (createdAt, messageId) {
    var isPresent = allMessages.find(function (m) {
      return m.messageId === messageId;
    });
    setAnimatedMessageId(null);
    setTimeout(function () {
      if (isPresent) {
        logger.info('Channel: scroll to message - message is present');
        setAnimatedMessageId(messageId);
      } else {
        logger.info('Channel: scroll to message - fetching older messages');
        setIntialTimeStamp(null);
        setIntialTimeStamp(createdAt);
        setAnimatedMessageId(messageId);
      }
    });
  }, [setIntialTimeStamp, setAnimatedMessageId, allMessages]);
}

var MessageStatusTypes = getOutgoingMessageStates();
function MessageStatus(_ref) {
  var _iconType, _iconColor, _channel$getUnreadMem, _channel$getUndeliver;

  var className = _ref.className,
      message = _ref.message,
      channel = _ref.channel;

  var _useContext = useContext(LocalizationContext),
      dateLocale = _useContext.dateLocale;

  var showMessageStatusIcon = (channel === null || channel === void 0 ? void 0 : channel.isGroupChannel()) && !(channel !== null && channel !== void 0 && channel.isSuper) && !(channel !== null && channel !== void 0 && channel.isPublic) && !(channel !== null && channel !== void 0 && channel.isBroadcast);
  var iconType = (_iconType = {}, _defineProperty(_iconType, MessageStatusTypes.SENT, IconTypes.DONE), _defineProperty(_iconType, MessageStatusTypes.DELIVERED, IconTypes.DONE_ALL), _defineProperty(_iconType, MessageStatusTypes.READ, IconTypes.DONE_ALL), _defineProperty(_iconType, MessageStatusTypes.FAILED, IconTypes.ERROR), _iconType);
  var iconColor = (_iconColor = {}, _defineProperty(_iconColor, MessageStatusTypes.SENT, IconColors.SENT), _defineProperty(_iconColor, MessageStatusTypes.DELIVERED, IconColors.SENT), _defineProperty(_iconColor, MessageStatusTypes.READ, IconColors.READ), _defineProperty(_iconColor, MessageStatusTypes.FAILED, IconColors.ERROR), _iconColor);
  var messageStatus = useMemo(function () {
    return getOutgoingMessageState(channel, message);
  }, [channel === null || channel === void 0 ? void 0 : (_channel$getUnreadMem = channel.getUnreadMemberCount) === null || _channel$getUnreadMem === void 0 ? void 0 : _channel$getUnreadMem.call(channel, message), channel === null || channel === void 0 ? void 0 : (_channel$getUndeliver = channel.getUndeliveredMemberCount) === null || _channel$getUndeliver === void 0 ? void 0 : _channel$getUndeliver.call(channel, message)]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: [].concat(_toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-message-status']).join(' ')
  }, showMessageStatusIcon && (messageStatus === MessageStatusTypes.PENDING ? /*#__PURE__*/React__default.createElement(Loader, {
    className: "sendbird-message-status__icon",
    width: "16px",
    height: "16px"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.SPINNER,
    fillColor: IconColors.PRIMARY,
    width: "16px",
    height: "16px"
  })) : /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-message-status__icon",
    type: iconType[messageStatus] || IconTypes.ERROR,
    fillColor: iconColor[messageStatus],
    width: "16px",
    height: "16px"
  })), isSentStatus(messageStatus) && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-message-status__text",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, format(message === null || message === void 0 ? void 0 : message.createdAt, 'p', {
    locale: dateLocale
  })));
}
MessageStatus.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  message: PropTypes.shape({
    createdAt: PropTypes.number,
    sender: PropTypes.shape({
      friendName: PropTypes.string,
      nickname: PropTypes.string,
      userId: PropTypes.string,
      profileUrl: PropTypes.string
    }),
    sendingStatus: PropTypes.string
  }),
  channel: PropTypes.shape({
    isGroupChannel: PropTypes.func,
    isSuper: PropTypes.bool,
    isBroadcast: PropTypes.bool,
    isPublic: PropTypes.bool,
    getUnreadMemberCount: PropTypes.func,
    getUndeliveredMemberCount: PropTypes.func
  })
};
MessageStatus.defaultProps = {
  className: '',
  message: null,
  channel: null
};

function MessageItemMenu(_a) {
  var _b;

  var className = _a.className,
      message = _a.message,
      channel = _a.channel,
      _c = _a.isByMe,
      isByMe = _c === void 0 ? false : _c,
      _d = _a.disabled,
      disabled = _d === void 0 ? false : _d,
      replyType = _a.replyType,
      showEdit = _a.showEdit,
      showRemove = _a.showRemove,
      resendMessage = _a.resendMessage,
      setQuoteMessage = _a.setQuoteMessage,
      setSupposedHover = _a.setSupposedHover;
  var stringSet = useContext(LocalizationContext).stringSet;
  var triggerRef = useRef(null);
  var containerRef = useRef(null);
  var showMenuItemCopy = isUserMessage(message);
  var showMenuItemReply = replyType === 'QUOTE_REPLY' && !isFailedMessage(channel, message) && !isPendingMessage(channel, message);
  var showMenuItemEdit = isUserMessage(message) && isSentMessage(channel, message) && isByMe;
  var showMenuItemResend = isFailedMessage(channel, message) && ((_b = message === null || message === void 0 ? void 0 : message.isResendable) === null || _b === void 0 ? void 0 : _b.call(message)) && isByMe;
  var showMenuItemDelete = !isPendingMessage(channel, message) && isByMe;

  if (!(showMenuItemCopy || showMenuItemReply || showMenuItemEdit || showMenuItemResend || showMenuItemDelete)) {
    return null;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName([className, 'sendbird-message-item-menu']),
    ref: containerRef
  }, /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default.createElement(IconButton, {
        className: "sendbird-message-item-menu__trigger",
        ref: triggerRef,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          setSupposedHover(true);
        },
        onBlur: function onBlur() {
          setSupposedHover(false);
        }
      }, /*#__PURE__*/React__default.createElement(Icon, {
        className: "sendbird-message-item-menu__trigger__icon",
        type: IconTypes.MORE,
        fillColor: IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(close) {
      var _a;

      var closeDropdown = function closeDropdown() {
        close();
        setSupposedHover(false);
      };

      return /*#__PURE__*/React__default.createElement(MenuItems, {
        className: "sendbird-message-item-menu__list",
        parentRef: triggerRef,
        parentContainRef: containerRef,
        closeDropdown: closeDropdown,
        openLeft: isByMe
      }, showMenuItemCopy && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-copy",
        onClick: function onClick() {
          var _a;

          copyToClipboard((_a = message) === null || _a === void 0 ? void 0 : _a.message);
          closeDropdown();
        }
      }, stringSet.MESSAGE_MENU__COPY), showMenuItemReply && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-reply",
        onClick: function onClick() {
          setQuoteMessage(message);
          closeDropdown();
        },
        disable: (message === null || message === void 0 ? void 0 : message.parentMessageId) > 0
      }, stringSet.MESSAGE_MENU__REPLY), showMenuItemEdit && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-edit",
        onClick: function onClick() {
          if (!disabled) {
            showEdit(true);
            closeDropdown();
          }
        }
      }, stringSet.MESSAGE_MENU__EDIT), showMenuItemResend && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-resend",
        onClick: function onClick() {
          if (!disabled) {
            resendMessage(message);
            closeDropdown();
          }
        }
      }, stringSet.MESSAGE_MENU__RESEND), showMenuItemDelete && /*#__PURE__*/React__default.createElement(MenuItem, {
        className: "sendbird-message-item-menu__list__menu-item menu-item-delete",
        onClick: function onClick() {
          if (!disabled) {
            showRemove(true);
            closeDropdown();
          }
        },
        disable: ((_a = message === null || message === void 0 ? void 0 : message.threadInfo) === null || _a === void 0 ? void 0 : _a.replyCount) > 0
      }, stringSet.MESSAGE_MENU__DELETE));
    }
  }));
}

function MessageItemReactionMenu(_a) {
  var className = _a.className,
      message = _a.message,
      channel = _a.channel,
      userId = _a.userId,
      _b = _a.spaceFromTrigger,
      spaceFromTrigger = _b === void 0 ? {} : _b,
      emojiContainer = _a.emojiContainer,
      toggleReaction = _a.toggleReaction,
      setSupposedHover = _a.setSupposedHover;
  var triggerRef = useRef(null);
  var containerRef = useRef(null);

  if (isPendingMessage(channel, message) || isFailedMessage(channel, message)) {
    return null;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName([className, 'sendbird-message-item-reaction-menu']),
    ref: containerRef
  }, /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default.createElement(IconButton, {
        className: "sendbird-message-item-reaction-menu__trigger",
        ref: triggerRef,
        width: "32px",
        height: "32px",
        onClick: function onClick() {
          toggleDropdown();
          setSupposedHover(true);
        },
        onBlur: function onBlur() {
          setSupposedHover(false);
        }
      }, /*#__PURE__*/React__default.createElement(Icon, {
        className: "sendbird-message-item-reaction-menu__trigger__icon",
        type: IconTypes.EMOJI_MORE,
        fillColor: IconColors.CONTENT_INVERSE,
        width: "24px",
        height: "24px"
      }));
    },
    menuItems: function menuItems(close) {
      var closeDropdown = function closeDropdown() {
        close();
        setSupposedHover(false);
      };

      return /*#__PURE__*/React__default.createElement(EmojiListItems, {
        parentRef: triggerRef,
        parentContainRef: containerRef,
        closeDropdown: closeDropdown,
        spaceFromTrigger: spaceFromTrigger
      }, getEmojiListAll(emojiContainer).map(function (emoji) {
        var _a, _b, _c;

        var isReacted = (_c = (_b = (_a = message === null || message === void 0 ? void 0 : message.reactions) === null || _a === void 0 ? void 0 : _a.filter(function (reaction) {
          return reaction.key === emoji.key;
        })[0]) === null || _b === void 0 ? void 0 : _b.userIds) === null || _c === void 0 ? void 0 : _c.some(function (reactorId) {
          return reactorId === userId;
        });
        return /*#__PURE__*/React__default.createElement(ReactionButton, {
          key: emoji.key,
          width: "36px",
          height: "36px",
          selected: isReacted,
          onClick: function onClick() {
            closeDropdown();
            toggleReaction(message, emoji.key, isReacted);
          }
        }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
          url: emoji.url,
          width: "28px",
          height: "28px",
          placeHolder: function placeHolder(style) {
            return /*#__PURE__*/React__default.createElement("div", {
              style: style
            }, /*#__PURE__*/React__default.createElement(Icon, {
              type: IconTypes.QUESTION,
              fillColor: IconColors.ON_BACKGROUND_3,
              width: "28px",
              height: "28px"
            }));
          }
        }));
      }));
    }
  }));
}

function Tooltip(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return /*#__PURE__*/React__default.createElement("div", {
    className: [].concat(_toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-tooltip']).join(' ')
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-tooltip__text",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONCONTENT_1
  }, children));
}
Tooltip.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.string), PropTypes.string])
};
Tooltip.defaultProps = {
  className: '',
  children: ''
};

var SPACE_FROM_TRIGGER = 8;
function TooltipWrapper(_ref) {
  var className = _ref.className,
      children = _ref.children,
      hoverTooltip = _ref.hoverTooltip;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showHoverTooltip = _useState2[0],
      setShowHoverTooltip = _useState2[1];

  var childrenRef = useRef(null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: [].concat(_toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-tooltip-wrapper']).join(' '),
    onMouseOver: function onMouseOver() {
      setShowHoverTooltip(true);
    },
    onFocus: function onFocus() {
      setShowHoverTooltip(true);
    },
    onMouseOut: function onMouseOut() {
      setShowHoverTooltip(false);
    },
    onBlur: function onBlur() {
      setShowHoverTooltip(false);
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-tooltip-wrapper__children",
    ref: childrenRef
  }, children), showHoverTooltip && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-tooltip-wrapper__hover-tooltip",
    style: {
      bottom: "calc(100% + ".concat(SPACE_FROM_TRIGGER, "px)")
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-tooltip-wrapper__hover-tooltip__inner"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-tooltip-wrapper__hover-tooltip__inner__tooltip-container",
    style: {
      left: childrenRef.current && "calc(".concat(childrenRef.current.offsetWidth / 2, "px - 50%)")
    }
  }, hoverTooltip))));
}
TooltipWrapper.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  children: PropTypes.element.isRequired,
  hoverTooltip: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};
TooltipWrapper.defaultProps = {
  className: ''
};

var ReactionBadge = /*#__PURE__*/React__default.forwardRef(function (props, ref) {
  var className = props.className,
      children = props.children,
      count = props.count,
      selected = props.selected,
      isAdd = props.isAdd,
      onClick = props.onClick;

  var getClassNameTail = function getClassNameTail() {
    if (selected && !isAdd) {
      return '--selected';
    }

    if (isAdd) {
      return '--is-add';
    }

    return '';
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: [].concat(_toConsumableArray(Array.isArray(className) ? className : [className]), ["sendbird-reaction-badge".concat(getClassNameTail())]).join(' '),
    role: "button",
    ref: ref,
    onClick: onClick,
    onKeyDown: onClick,
    tabIndex: 0
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-reaction-badge__inner"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-reaction-badge__inner__icon"
  }, children), /*#__PURE__*/React__default.createElement(Label, {
    className: children && count && 'sendbird-reaction-badge__inner__count',
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_1
  }, count)));
});
ReactionBadge.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  children: PropTypes.element.isRequired,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selected: PropTypes.bool,
  isAdd: PropTypes.bool,
  onClick: PropTypes.func
};
ReactionBadge.defaultProps = {
  className: '',
  count: '',
  selected: false,
  isAdd: false,
  onClick: function onClick() {}
};

function EmojiReactions2(_a) {
  var _b, _c;

  var className = _a.className,
      userId = _a.userId,
      message = _a.message,
      emojiContainer = _a.emojiContainer,
      memberNicknamesMap = _a.memberNicknamesMap,
      _d = _a.spaceFromTrigger,
      spaceFromTrigger = _d === void 0 ? {} : _d,
      _e = _a.isByMe,
      isByMe = _e === void 0 ? false : _e,
      toggleReaction = _a.toggleReaction;
  var stringSet = useContext(LocalizationContext).stringSet;
  var emojisMap = getEmojiMapAll(emojiContainer);
  var addReactionRef = useRef(null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName([className, 'sendbird-emoji-reactions', isByMe ? 'outgoing' : 'incoming'])
  }, ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 && message.reactions.map(function (reaction) {
    var _a, _b;

    var reactedByMe = isReactedBy(userId, reaction);
    return /*#__PURE__*/React__default.createElement(TooltipWrapper, {
      className: "sendbird-emoji-reactions__reaction-badge",
      key: reaction === null || reaction === void 0 ? void 0 : reaction.key,
      hoverTooltip: ((_a = reaction === null || reaction === void 0 ? void 0 : reaction.userIds) === null || _a === void 0 ? void 0 : _a.length) > 0 && /*#__PURE__*/React__default.createElement(Tooltip, null, getEmojiTooltipString(reaction, userId, memberNicknamesMap, stringSet))
    }, /*#__PURE__*/React__default.createElement(ReactionBadge, {
      count: reaction.userIds.length,
      selected: reactedByMe,
      onClick: function onClick() {
        return toggleReaction(message, reaction.key, reactedByMe);
      }
    }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
      circle: true,
      url: ((_b = emojisMap.get(reaction === null || reaction === void 0 ? void 0 : reaction.key)) === null || _b === void 0 ? void 0 : _b.url) || '',
      width: "20px",
      height: "20px",
      defaultComponent: /*#__PURE__*/React__default.createElement(Icon, {
        width: "20px",
        height: "20px",
        type: IconTypes.QUESTION
      })
    })));
  }), ((_c = message === null || message === void 0 ? void 0 : message.reactions) === null || _c === void 0 ? void 0 : _c.length) < emojisMap.size && /*#__PURE__*/React__default.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      return /*#__PURE__*/React__default.createElement(ReactionBadge, {
        className: "sendbird-emoji-reactions__add-reaction-badge",
        ref: addReactionRef,
        isAdd: true,
        onClick: toggleDropdown
      }, /*#__PURE__*/React__default.createElement(Icon, {
        type: IconTypes.EMOJI_MORE,
        fillColor: IconColors.ON_BACKGROUND_3,
        width: "20px",
        height: "20px"
      }));
    },
    menuItems: function menuItems(closeDropdown) {
      return /*#__PURE__*/React__default.createElement(EmojiListItems, {
        parentRef: addReactionRef,
        parentContainRef: addReactionRef,
        closeDropdown: closeDropdown,
        spacefromTrigger: spaceFromTrigger
      }, getEmojiListAll(emojiContainer).map(function (emoji) {
        var _a, _b, _c;

        var isReacted = (_c = (_b = (_a = message === null || message === void 0 ? void 0 : message.reactions) === null || _a === void 0 ? void 0 : _a.filter(function (reaction) {
          return reaction.key === emoji.key;
        })[0]) === null || _b === void 0 ? void 0 : _b.userIds) === null || _c === void 0 ? void 0 : _c.some(function (reactorId) {
          return reactorId === userId;
        });
        return /*#__PURE__*/React__default.createElement(ReactionButton, {
          key: emoji.key,
          width: "36px",
          height: "36px",
          selected: isReacted,
          onClick: function onClick() {
            closeDropdown();
            toggleReaction(message, emoji.key, isReacted);
          }
        }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
          url: (emoji === null || emoji === void 0 ? void 0 : emoji.url) || '',
          width: "28px",
          height: "28px",
          placeHolder: function placeHolder(style) {
            return /*#__PURE__*/React__default.createElement("div", {
              style: style
            }, /*#__PURE__*/React__default.createElement(Icon, {
              type: IconTypes.QUESTION,
              fillColor: IconColors.ON_BACKGROUND_3,
              width: "28px",
              height: "28px"
            }));
          }
        }));
      }));
    }
  }));
}

function AdminMessage(_ref) {
  var className = _ref.className,
      message = _ref.message;

  if (!(message.isAdminMessage || message.messageType) || !message.isAdminMessage() || message.messageType !== 'admin') {
    return null;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: [].concat(_toConsumableArray(Array.isArray(className) ? className : [className]), ['sendbird-admin-message']).join(' ')
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-admin-message__text",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, message.message));
}
AdminMessage.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string,
    messageType: PropTypes.string,
    isAdminMessage: PropTypes.func
  }),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
AdminMessage.defaultProps = {
  message: {},
  className: ''
};

function TextMessageItemBody(_a) {
  var _b;

  var className = _a.className,
      message = _a.message,
      _c = _a.isByMe,
      isByMe = _c === void 0 ? false : _c,
      _d = _a.mouseHover,
      mouseHover = _d === void 0 ? false : _d;
  var stringSet = useContext(LocalizationContext).stringSet;
  return /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.BODY_1,
    color: isByMe ? LabelColors.ONCONTENT_1 : LabelColors.ONBACKGROUND_1
  }, /*#__PURE__*/React__default.createElement("p", {
    className: getClassName([className, 'sendbird-text-message-item-body', isByMe ? 'outgoing' : 'incoming', mouseHover ? 'mouse-hover' : '', ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 ? 'reactions' : ''])
  }, message === null || message === void 0 ? void 0 : message.message, isEditedMessage(message) && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-text-message-item-body__message edited",
    type: LabelTypography.BODY_1,
    color: isByMe ? LabelColors.ONCONTENT_2 : LabelColors.ONBACKGROUND_2
  }, " " + stringSet.MESSAGE_EDITED + " ")));
}

function FileMessageItemBody(_a) {
  var _b;

  var className = _a.className,
      message = _a.message,
      _c = _a.isByMe,
      isByMe = _c === void 0 ? false : _c,
      _d = _a.mouseHover,
      mouseHover = _d === void 0 ? false : _d;
  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName([className, "sendbird-file-message-item-body", isByMe ? "outgoing" : "incoming", mouseHover ? "mouse-hover" : "", ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 ? "reactions" : ""])
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-file-message-item-body__file-icon"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-file-message-item-body__file-icon__icon",
    type: {
      WORD: IconTypes.ROGU_FILE_WORD,
      EXCEL: IconTypes.ROGU_FILE_EXCEL,
      PPT: IconTypes.ROGU_FILE_POWERPOINT,
      PDF: IconTypes.ROGU_FILE_PDF,
      OTHERS: IconTypes.ROGU_FILE_OTHERS
    }[getUIKitFileType(message === null || message === void 0 ? void 0 : message.type)],
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })), /*#__PURE__*/React__default.createElement(TextButton, {
    className: "sendbird-file-message-item-body__file-name",
    onClick: function onClick() {
      window.open(message === null || message === void 0 ? void 0 : message.url);
    },
    color: isByMe ? LabelColors.ONCONTENT_1 : LabelColors.ONBACKGROUND_1
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-file-message-item-body__file-name__text",
    type: LabelTypography.BODY_1,
    color: isByMe ? LabelColors.ONCONTENT_1 : LabelColors.ONBACKGROUND_1
  }, truncateString((message === null || message === void 0 ? void 0 : message.name) || (message === null || message === void 0 ? void 0 : message.url)))));
}

function ThumbnailMessageItemBody(_a) {
  var _b, _c;

  var className = _a.className,
      message = _a.message,
      _d = _a.isByMe,
      isByMe = _d === void 0 ? false : _d,
      _e = _a.mouseHover,
      mouseHover = _e === void 0 ? false : _e,
      showFileViewer = _a.showFileViewer;
  var _f = message.thumbnails,
      thumbnails = _f === void 0 ? [] : _f;
  var thumbnailUrl = thumbnails.length > 0 ? (_b = thumbnails[0]) === null || _b === void 0 ? void 0 : _b.url : '';

  var _g = useState(false),
      imageRendered = _g[0],
      setImageRendered = _g[1];

  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName([className, 'sendbird-thumbnail-message-item-body', isByMe ? 'outgoing' : 'incoming', mouseHover ? 'mouse-hover' : '', ((_c = message === null || message === void 0 ? void 0 : message.reactions) === null || _c === void 0 ? void 0 : _c.length) > 0 ? 'reactions' : '']),
    onClick: function onClick() {
      return showFileViewer(true);
    }
  }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
    className: "sendbird-thumbnail-message-item-body__thumbnail",
    url: thumbnailUrl || (message === null || message === void 0 ? void 0 : message.url),
    alt: message === null || message === void 0 ? void 0 : message.type,
    width: "360px",
    height: "270px",
    onLoad: function onLoad() {
      setImageRendered(true);
    },
    placeHolder: function placeHolder(style) {
      return /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-thumbnail-message-item-body__placeholder",
        style: style
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-thumbnail-message-item-body__placeholder__icon"
      }, /*#__PURE__*/React__default.createElement(Icon, {
        type: isVideoMessage(message) ? IconTypes.PLAY : IconTypes.PHOTO,
        fillColor: IconColors.ON_BACKGROUND_2,
        width: "34px",
        height: "34px"
      })));
    }
  }), isVideoMessage(message) && !thumbnailUrl && !imageRendered && /*#__PURE__*/React__default.createElement("video", {
    className: "sendbird-thumbnail-message-item-body__video"
  }, /*#__PURE__*/React__default.createElement("source", {
    src: message === null || message === void 0 ? void 0 : message.url,
    type: message === null || message === void 0 ? void 0 : message.type
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thumbnail-message-item-body__image-cover"
  }), (isVideoMessage(message) || isGifMessage(message)) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thumbnail-message-item-body__icon-wrapper"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-thumbnail-message-item-body__icon-wrapper__icon"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: isVideoMessage(message) ? IconTypes.PLAY : IconTypes.GIF,
    fillColor: IconColors.GRAY,
    width: "34px",
    height: "34px"
  }))));
}

function OGMessageItemBody(_a) {
  var _b, _c, _d, _e, _f, _g, _h, _j;

  var className = _a.className,
      message = _a.message,
      _k = _a.isByMe,
      isByMe = _k === void 0 ? false : _k,
      _l = _a.mouseHover,
      mouseHover = _l === void 0 ? false : _l;
  var stringSet = useContext(LocalizationContext).stringSet;

  var openOGUrl = function openOGUrl() {
    var _a, _b;

    if ((_a = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _a === void 0 ? void 0 : _a.url) window.open((_b = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _b === void 0 ? void 0 : _b.url);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName([className, 'sendbird-og-message-item-body', isByMe ? 'outgoing' : 'incoming', mouseHover ? 'mouse-hover' : '', ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 ? 'reactions' : ''])
  }, /*#__PURE__*/React__default.createElement(Label, {
    key: uuidv4(),
    type: LabelTypography.BODY_1,
    color: isByMe ? LabelColors.ONCONTENT_1 : LabelColors.ONBACKGROUND_1
  }, /*#__PURE__*/React__default.createElement("p", {
    className: "sendbird-og-message-item-body__text-bubble"
  }, message === null || message === void 0 ? void 0 : message.message.split(' ').map(function (word) {
    return isUrl(word) ? /*#__PURE__*/React__default.createElement(LinkLabel, {
      className: "sendbird-og-message-item-body__text-bubble__message",
      key: uuidv4(),
      src: word,
      type: LabelTypography.BODY_1,
      color: isByMe ? LabelColors.ONCONTENT_1 : LabelColors.ONBACKGROUND_1
    }, word) : word + " ";
  }), isEditedMessage(message) && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-og-message-item-body__text-bubble__message",
    type: LabelTypography.BODY_1,
    color: isByMe ? LabelColors.ONCONTENT_2 : LabelColors.ONBACKGROUND_2
  }, " " + stringSet.MESSAGE_EDITED + " "))), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-og-message-item-body__og-thumbnail",
    onClick: openOGUrl
  }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
    className: "sendbird-og-message-item-body__og-thumbnail__image",
    url: ((_d = (_c = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _c === void 0 ? void 0 : _c.defaultImage) === null || _d === void 0 ? void 0 : _d.url) || '',
    alt: (_f = (_e = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _e === void 0 ? void 0 : _e.defaultImage) === null || _f === void 0 ? void 0 : _f.alt // TODO: Change fixing width and height lengths
    ,
    width: "320px",
    height: "180px",
    defaultComponent: /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-og-message-item-body__og-thumbnail__place-holder"
    }, /*#__PURE__*/React__default.createElement(Icon, {
      className: "sendbird-og-message-item-body__og-thumbnail__place-holder__icon",
      type: IconTypes.THUMBNAIL_NONE,
      width: "56px",
      height: "56px"
    }))
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-og-message-item-body__description",
    onClick: openOGUrl
  }, ((_g = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _g === void 0 ? void 0 : _g.title) && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-og-message-item-body__description__title",
    type: LabelTypography.SUBTITLE_2,
    color: LabelColors.ONBACKGROUND_1
  }, message.ogMetaData.title), ((_h = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _h === void 0 ? void 0 : _h.description) && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-og-message-item-body__description__description",
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_1
  }, message.ogMetaData.description), ((_j = message === null || message === void 0 ? void 0 : message.ogMetaData) === null || _j === void 0 ? void 0 : _j.url) && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-og-message-item-body__description__url",
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, message.ogMetaData.url)), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-og-message-item-body__cover"
  }));
}

function UnknownMessageItemBody(_a) {
  var _b;

  var className = _a.className,
      message = _a.message,
      _c = _a.isByMe,
      isByMe = _c === void 0 ? false : _c,
      _d = _a.mouseHover,
      mouseHover = _d === void 0 ? false : _d;
  var stringSet = useContext(LocalizationContext).stringSet;
  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName([className, 'sendbird-unknown-message-item-body', isByMe ? 'outgoing' : 'incoming', mouseHover ? 'mouse-hover' : '', ((_b = message === null || message === void 0 ? void 0 : message.reactions) === null || _b === void 0 ? void 0 : _b.length) > 0 ? 'reactions' : ''])
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-unknown-message-item-body__header",
    type: LabelTypography.BODY_1,
    color: isByMe ? LabelColors.ONCONTENT_1 : LabelColors.ONBACKGROUND_1
  }, stringSet.UNKNOWN__UNKNOWN_MESSAGE_TYPE), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-unknown-message-item-body__description",
    type: LabelTypography.BODY_1,
    color: isByMe ? LabelColors.ONCONTENT_2 : LabelColors.ONBACKGROUND_2
  }, stringSet.UNKNOWN__CANNOT_READ_MESSAGE));
}

function QuoteMessage(_a) {
  var _b;

  var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;

  var message = _a.message,
      _p = _a.userId,
      userId = _p === void 0 ? '' : _p,
      _q = _a.isByMe,
      isByMe = _q === void 0 ? false : _q,
      className = _a.className,
      _onClick = _a.onClick;
  var stringSet = useContext(LocalizationContext).stringSet;
  var parentMessage = message.parentMessage;
  var parentMessageSender = (_c = parentMessage) === null || _c === void 0 ? void 0 : _c.sender;
  var parentMessageSenderNickname = userId === (parentMessageSender === null || parentMessageSender === void 0 ? void 0 : parentMessageSender.userId) ? stringSet.QUOTED_MESSAGE__CURRENT_USER : parentMessageSender === null || parentMessageSender === void 0 ? void 0 : parentMessageSender.nickname;
  var parentMessageUrl = ((_d = parentMessage) === null || _d === void 0 ? void 0 : _d.url) || '';
  var parentMessageType = (_e = parentMessage) === null || _e === void 0 ? void 0 : _e.type;
  var currentMessageSenderNickname = userId === ((_f = message === null || message === void 0 ? void 0 : message.sender) === null || _f === void 0 ? void 0 : _f.userId) ? stringSet.QUOTED_MESSAGE__CURRENT_USER : (_g = message === null || message === void 0 ? void 0 : message.sender) === null || _g === void 0 ? void 0 : _g.nickname;

  var _r = useState(false),
      isThumbnailLoaded = _r[0],
      setThumbnailLoaded = _r[1];

  var uikitFileTypes = getUIKitFileTypes();
  var splitFileName = ((_h = parentMessage) === null || _h === void 0 ? void 0 : _h.name) ? parentMessage.name.split('/') : parentMessageUrl.split('/');
  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName([className, 'sendbird-quote-message', isByMe ? 'outgoing' : 'incoming']),
    key: parentMessage === null || parentMessage === void 0 ? void 0 : parentMessage.messageId,
    onClick: function onClick() {
      if (_onClick) _onClick();
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-quote-message__replied-to"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-quote-message__replied-to__icon",
    type: IconTypes.REPLY,
    fillColor: IconColors.ON_BACKGROUND_3,
    width: "12px",
    height: "12px"
  }), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-quote-message__replied-to__text",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_3
  }, currentMessageSenderNickname + " " + stringSet.QUOTED_MESSAGE__REPLIED_TO + " " + parentMessageSenderNickname)), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-quote-message__replied-message"
  }, isUserMessage(parentMessage) && ((_k = (_j = parentMessage) === null || _j === void 0 ? void 0 : _j.message) === null || _k === void 0 ? void 0 : _k.length) > 0 && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-quote-message__replied-message__text-message"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-quote-message__replied-message__text-message__word",
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_1
  }, (_l = parentMessage) === null || _l === void 0 ? void 0 : _l.message)), isThumbnailMessage(parentMessage) && parentMessageUrl && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-quote-message__replied-message__thumbnail-message"
  }, /*#__PURE__*/React__default.createElement(ImageRenderer, {
    className: "sendbird-quote-message__replied-message__thumbnail-message__image",
    url: parentMessageUrl,
    alt: parentMessageType,
    width: "144px",
    height: "108px",
    onLoad: function onLoad() {
      return setThumbnailLoaded(true);
    },
    defaultComponent: /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-quote-message__replied-message__thumbnail-message__placeholder"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-quote-message__replied-message__thumbnail-message__placeholder__icon"
    }, /*#__PURE__*/React__default.createElement(Icon, {
      type: isVideo(parentMessageType) ? IconTypes.PLAY : IconTypes.PHOTO,
      fillColor: IconColors.ON_BACKGROUND_2,
      width: "22px",
      height: "22px"
    })))
  }), isVideo(parentMessageType) && !(((_o = (_m = parentMessage) === null || _m === void 0 ? void 0 : _m.thumbnails) === null || _o === void 0 ? void 0 : _o.length) > 0) && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("video", {
    className: "sendbird-quote-message__replied-message__thumbnail-message__video"
  }, /*#__PURE__*/React__default.createElement("source", {
    src: parentMessageUrl,
    type: parentMessageType
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-quote-message__replied-message__thumbnail-message__cover"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-quote-message__replied-message__thumbnail-message__cover__icon"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.PLAY,
    fillColor: IconColors.GRAY,
    width: "14px",
    height: "14px"
  })))), isThumbnailLoaded && isGif(parentMessageType) && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-quote-message__replied-message__thumbnail-message__cover"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-quote-message__replied-message__thumbnail-message__cover__icon"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.GIF,
    fillColor: IconColors.GRAY,
    width: "14px",
    height: "14px"
  })))), isFileMessage(parentMessage) && !isSupportedFileView(parentMessage.type) && parentMessageUrl && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-quote-message__replied-message__file-message"
  }, /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-quote-message__replied-message__file-message__type-icon",
    type: (_b = {}, _b[uikitFileTypes.IMAGE] = IconTypes.PHOTO, _b[uikitFileTypes.VIDEO] = IconTypes.PLAY, _b[uikitFileTypes.AUDIO] = IconTypes.FILE_AUDIO, _b[uikitFileTypes.GIF] = IconTypes.GIF, _b[uikitFileTypes.OTHERS] = IconTypes.FILE_DOCUMENT, _b)[getUIKitFileType(parentMessageType)],
    fillColor: IconColors.ON_BACKGROUND_3,
    width: "16px",
    height: "16px"
  }), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-quote-message__replied-message__file-message__file-name",
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_3
  }, truncateString(splitFileName[splitFileName.length - 1])))));
}

function MessageContent(_a) {
  var _b, _c, _d, _e;

  var className = _a.className,
      userId = _a.userId,
      channel = _a.channel,
      message = _a.message,
      _f = _a.disabled,
      disabled = _f === void 0 ? false : _f,
      _g = _a.chainTop,
      chainTop = _g === void 0 ? false : _g,
      _h = _a.chainBottom,
      chainBottom = _h === void 0 ? false : _h,
      _j = _a.useReaction,
      useReaction = _j === void 0 ? false : _j,
      replyType = _a.replyType,
      nicknamesMap = _a.nicknamesMap,
      emojiContainer = _a.emojiContainer,
      scrollToMessage = _a.scrollToMessage,
      showEdit = _a.showEdit,
      showRemove = _a.showRemove,
      showFileViewer = _a.showFileViewer,
      resendMessage = _a.resendMessage,
      toggleReaction = _a.toggleReaction,
      setQuoteMessage = _a.setQuoteMessage;
  var messageTypes = getUIKitMessageTypes();

  var _k = useContext(UserProfileContext),
      disableUserProfile = _k.disableUserProfile,
      renderUserProfile = _k.renderUserProfile;

  var dateLocale = useContext(LocalizationContext).dateLocale;
  var avatarRef = useRef(null);

  var _l = useState(false),
      mouseHover = _l[0],
      setMouseHover = _l[1];

  var _m = useState(false),
      supposedHover = _m[0],
      setSupposedHover = _m[1];

  var isByMe = userId === ((_c = (_b = message) === null || _b === void 0 ? void 0 : _b.sender) === null || _c === void 0 ? void 0 : _c.userId) || message.sendingStatus === 'pending' || message.sendingStatus === 'failed';
  var isByMeClassName = isByMe ? 'outgoing' : 'incoming';
  var chainTopClassName = chainTop ? 'chain-top' : '';
  var useReactionClassName = useReaction ? 'use-reactions' : '';
  var supposedHoverClassName = supposedHover ? 'supposed-hover' : '';
  var useReplying = !!(replyType === 'QUOTE_REPLY' && (message === null || message === void 0 ? void 0 : message.parentMessageId) && (message === null || message === void 0 ? void 0 : message.parentMessage));
  var useReplyingClassName = useReplying ? 'use-quote' : '';

  if (((_d = message === null || message === void 0 ? void 0 : message.isAdminMessage) === null || _d === void 0 ? void 0 : _d.call(message)) || (message === null || message === void 0 ? void 0 : message.messageType) === 'admin') {
    return /*#__PURE__*/React__default.createElement(AdminMessage, {
      message: message
    });
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName([className, 'sendbird-message-content', isByMeClassName]),
    onMouseOver: function onMouseOver() {
      return setMouseHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setMouseHover(false);
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content__left', useReactionClassName, isByMeClassName, useReplyingClassName])
  }, !isByMe && !chainBottom &&
  /*#__PURE__*/

  /** user profile */
  React__default.createElement(ContextMenu, {
    menuTrigger: function menuTrigger(toggleDropdown) {
      var _a;

      return /*#__PURE__*/React__default.createElement(Avatar, {
        className: "sendbird-message-content__left__avatar",
        src: ((_a = message === null || message === void 0 ? void 0 : message.sender) === null || _a === void 0 ? void 0 : _a.profileUrl) || '',
        ref: avatarRef,
        width: "28px",
        height: "28px",
        onClick: function onClick() {
          if (!disableUserProfile) toggleDropdown();
        }
      });
    },
    menuItems: function menuItems(closeDropdown) {
      return /*#__PURE__*/React__default.createElement(MenuItems
      /**
      * parentRef: For catching location(x, y) of MenuItems
      * parentContainRef: For toggling more options(menus & reactions)
      */
      , {
        parentRef: avatarRef,
        parentContainRef: avatarRef,
        closeDropdown: closeDropdown,
        style: {
          paddingTop: 0,
          paddingBottom: 0
        }
      }, renderUserProfile ? renderUserProfile({
        user: message === null || message === void 0 ? void 0 : message.sender,
        close: closeDropdown
      }) : /*#__PURE__*/React__default.createElement(ConnectedUserProfile, {
        user: message.sender,
        onSuccess: closeDropdown
      }));
    }
  }), isByMe && /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content-menu', useReactionClassName, supposedHoverClassName, isByMeClassName])
  }, /*#__PURE__*/React__default.createElement(MessageItemMenu, {
    className: "sendbird-message-content-menu__normal-menu",
    channel: channel,
    message: message,
    isByMe: isByMe,
    replyType: replyType,
    disabled: disabled,
    showEdit: showEdit,
    showRemove: showRemove,
    resendMessage: resendMessage,
    setQuoteMessage: setQuoteMessage,
    setSupposedHover: setSupposedHover
  }), useReaction && /*#__PURE__*/React__default.createElement(MessageItemReactionMenu, {
    className: "sendbird-message-content-menu__reaction-menu",
    message: message,
    channel: channel,
    userId: userId,
    spaceFromTrigger: {},
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction,
    setSupposedHover: setSupposedHover
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message-content__middle"
  }, !isByMe && !chainTop && !useReplying && /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-message-content__middle__sender-name",
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, getSenderName(message)), useReplying ? /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content__middle__quote-message', isByMe ? 'outgoing' : 'incoming', useReplyingClassName])
  }, /*#__PURE__*/React__default.createElement(QuoteMessage, {
    message: message,
    userId: userId,
    isByMe: isByMe,
    onClick: function onClick() {
      var _a;

      if (((_a = message === null || message === void 0 ? void 0 : message.parentMessage) === null || _a === void 0 ? void 0 : _a.createdAt) && (message === null || message === void 0 ? void 0 : message.parentMessageId)) {
        scrollToMessage(message.parentMessage.createdAt, message.parentMessageId);
      }
    }
  })) : null, /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content__middle__body-container'])
  }, isByMe && !chainBottom && /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content__middle__body-container__created-at', 'left', supposedHoverClassName])
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message-content__middle__body-container__created-at__component-container"
  }, /*#__PURE__*/React__default.createElement(MessageStatus, {
    message: message,
    channel: channel
  }))), isTextMessage(message) && /*#__PURE__*/React__default.createElement(TextMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover
  }), isOGMessage(message) && /*#__PURE__*/React__default.createElement(OGMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover
  }), getUIKitMessageType(message) === messageTypes.FILE && /*#__PURE__*/React__default.createElement(FileMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover
  }), isThumbnailMessage(message) && /*#__PURE__*/React__default.createElement(ThumbnailMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover,
    showFileViewer: showFileViewer
  }), getUIKitMessageType(message) === messageTypes.UNKNOWN && /*#__PURE__*/React__default.createElement(UnknownMessageItemBody, {
    className: "sendbird-message-content__middle__message-item-body",
    message: message,
    isByMe: isByMe,
    mouseHover: mouseHover
  }), useReaction && ((_e = message === null || message === void 0 ? void 0 : message.reactions) === null || _e === void 0 ? void 0 : _e.length) > 0 && /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content-reactions', !isByMe || isThumbnailMessage(message) || isOGMessage(message) ? '' : 'primary', mouseHover ? 'mouse-hover' : ''])
  }, /*#__PURE__*/React__default.createElement(EmojiReactions2, {
    userId: userId,
    message: message,
    isByMe: isByMe,
    emojiContainer: emojiContainer,
    memberNicknamesMap: nicknamesMap,
    toggleReaction: toggleReaction
  })), !isByMe && !chainBottom && /*#__PURE__*/React__default.createElement(Label, {
    className: getClassName(['sendbird-message-content__middle__body-container__created-at', 'right', supposedHoverClassName]),
    type: LabelTypography.CAPTION_3,
    color: LabelColors.ONBACKGROUND_2
  }, format(message.createdAt, 'p', {
    locale: dateLocale
  })))), /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content__right', chainTopClassName, useReactionClassName, useReplyingClassName])
  }, !isByMe && /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-message-content-menu', chainTopClassName, supposedHoverClassName, isByMeClassName])
  }, useReaction && /*#__PURE__*/React__default.createElement(MessageItemReactionMenu, {
    className: "sendbird-message-content-menu__reaction-menu",
    message: message,
    channel: channel,
    userId: userId,
    spaceFromTrigger: {},
    emojiContainer: emojiContainer,
    toggleReaction: toggleReaction,
    setSupposedHover: setSupposedHover
  }), /*#__PURE__*/React__default.createElement(MessageItemMenu, {
    className: "sendbird-message-content-menu__normal-menu",
    channel: channel,
    message: message,
    isByMe: isByMe,
    replyType: replyType,
    disabled: disabled,
    showEdit: showEdit,
    showRemove: showRemove,
    resendMessage: resendMessage,
    setQuoteMessage: setQuoteMessage,
    setSupposedHover: setSupposedHover
  }))));
}

var RemoveMessage = function RemoveMessage(props) {
  var _message$threadInfo;

  var onCloseModal = props.onCloseModal,
      onDeleteMessage = props.onDeleteMessage,
      message = props.message;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  return /*#__PURE__*/React__default.createElement(Modal, {
    type: ButtonTypes.DANGER,
    disabled: (message === null || message === void 0 ? void 0 : (_message$threadInfo = message.threadInfo) === null || _message$threadInfo === void 0 ? void 0 : _message$threadInfo.replyCount) > 0,
    onCancel: onCloseModal,
    onSubmit: onDeleteMessage,
    submitText: "Delete",
    titleText: stringSet.MODAL__DELETE_MESSAGE__TITLE
  });
};

RemoveMessage.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  onDeleteMessage: PropTypes.func.isRequired,
  message: PropTypes.shape({
    threadInfo: PropTypes.shape({
      replyCount: PropTypes.number
    })
  }).isRequired
};

function MessageHoc(_ref) {
  var _message$reactions;

  var message = _ref.message,
      userId = _ref.userId,
      disabled = _ref.disabled,
      editDisabled = _ref.editDisabled,
      hasSeparator = _ref.hasSeparator,
      deleteMessage = _ref.deleteMessage,
      updateMessage = _ref.updateMessage,
      scrollToMessage = _ref.scrollToMessage,
      resendMessage = _ref.resendMessage,
      useReaction = _ref.useReaction,
      replyType = _ref.replyType,
      chainTop = _ref.chainTop,
      chainBottom = _ref.chainBottom,
      membersMap = _ref.membersMap,
      emojiContainer = _ref.emojiContainer,
      animatedMessageId = _ref.animatedMessageId,
      highLightedMessageId = _ref.highLightedMessageId,
      toggleReaction = _ref.toggleReaction,
      quoteMessage = _ref.quoteMessage,
      setQuoteMessage = _ref.setQuoteMessage,
      renderCustomMessage = _ref.renderCustomMessage,
      currentGroupChannel = _ref.currentGroupChannel,
      handleScroll = _ref.handleScroll;
  var _message$sender = message.sender,
      sender = _message$sender === void 0 ? {} : _message$sender;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showEdit = _useState2[0],
      setShowEdit = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showRemove = _useState4[0],
      setShowRemove = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showFileViewer = _useState6[0],
      setShowFileViewer = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isAnimated = _useState8[0],
      setIsAnimated = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      isHighlighted = _useState10[0],
      setIsHighlighted = _useState10[1];

  var editMessageInputRef = useRef(null);
  var useMessageScrollRef = useRef(null);

  var _useContext = useContext(LocalizationContext),
      dateLocale = _useContext.dateLocale;

  useLayoutEffect(function () {
    handleScroll();
  }, [showEdit, message === null || message === void 0 ? void 0 : (_message$reactions = message.reactions) === null || _message$reactions === void 0 ? void 0 : _message$reactions.length]);
  useLayoutEffect(function () {
    if (highLightedMessageId === message.messageId) {
      if (useMessageScrollRef && useMessageScrollRef.current) {
        useMessageScrollRef.current.scrollIntoView({
          block: 'center',
          inline: 'center'
        });
        setIsAnimated(false);
        setTimeout(function () {
          setIsHighlighted(true);
        }, 500);
      }
    } else {
      setIsHighlighted(false);
    }
  }, [highLightedMessageId, useMessageScrollRef.current, message.messageId]);
  useLayoutEffect(function () {
    if (animatedMessageId === message.messageId) {
      if (useMessageScrollRef && useMessageScrollRef.current) {
        useMessageScrollRef.current.scrollIntoView({
          block: 'center',
          inline: 'center'
        });
        setIsHighlighted(false);
        setTimeout(function () {
          setIsAnimated(true);
        }, 500);
      }
    } else {
      setIsAnimated(false);
    }
  }, [animatedMessageId, useMessageScrollRef.current, message.messageId]);
  var RenderedMessage = useMemo(function () {
    if (renderCustomMessage) {
      return renderCustomMessage(message, currentGroupChannel, chainTop, chainBottom); // TODO: Let's change this to object type on next major version up
      // and add params 'hasSeparator' and 'menuDisabled', scrollToMessage
    }

    return null;
  }, [message, message.message, renderCustomMessage]);
  var isByMe = userId === (sender === null || sender === void 0 ? void 0 : sender.userId) || message.requestState === 'pending' || message.requestState === 'failed';

  if (RenderedMessage) {
    return /*#__PURE__*/React__default.createElement("div", {
      ref: useMessageScrollRef,
      className: getClassName(['sendbird-msg-hoc sendbird-msg--scroll-ref', isAnimated ? 'sendbird-msg-hoc__animated' : '', isHighlighted ? 'sendbird-msg-hoc__highlighted' : ''])
    }, hasSeparator && /*#__PURE__*/React__default.createElement(DateSeparator, null, /*#__PURE__*/React__default.createElement(Label, {
      type: LabelTypography.CAPTION_2,
      color: LabelColors.ONBACKGROUND_2
    }, format(message === null || message === void 0 ? void 0 : message.createdAt, 'MMMM dd, yyyy', {
      locale: dateLocale
    }))), /*#__PURE__*/React__default.createElement(RenderedMessage, {
      message: message
    }));
  }

  if (showEdit) {
    return /*#__PURE__*/React__default.createElement(MessageInput, {
      isEdit: true,
      disabled: editDisabled,
      ref: editMessageInputRef,
      name: message.messageId,
      onSendMessage: updateMessage,
      onCancelEdit: function onCancelEdit() {
        setShowEdit(false);
      },
      value: message.message
    });
  }

  return /*#__PURE__*/React__default.createElement("div", {
    ref: useMessageScrollRef,
    className: getClassName(['sendbird-msg-hoc sendbird-msg--scroll-ref', isAnimated ? 'sendbird-msg-hoc__animated' : '', isHighlighted ? 'sendbird-msg-hoc__highlighted' : '']),
    style: {
      marginBottom: '2px'
    }
  }, hasSeparator && /*#__PURE__*/React__default.createElement(DateSeparator, null, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, format(message === null || message === void 0 ? void 0 : message.createdAt, 'MMMM dd, yyyy', {
    locale: dateLocale
  }))), /*#__PURE__*/React__default.createElement(MessageContent, {
    className: "sendbird-message-hoc__message-content",
    userId: userId,
    scrollToMessage: scrollToMessage,
    channel: currentGroupChannel,
    message: message,
    disabled: disabled,
    chainTop: chainTop,
    chainBottom: chainBottom,
    useReaction: useReaction,
    replyType: replyType,
    nicknamesMap: membersMap,
    emojiContainer: emojiContainer,
    showEdit: setShowEdit,
    showRemove: setShowRemove,
    showFileViewer: setShowFileViewer,
    resendMessage: resendMessage,
    toggleReaction: toggleReaction,
    quoteMessage: quoteMessage,
    setQuoteMessage: setQuoteMessage
  }), showRemove && /*#__PURE__*/React__default.createElement(RemoveMessage, {
    message: message,
    onCloseModal: function onCloseModal() {
      return setShowRemove(false);
    },
    onDeleteMessage: function onDeleteMessage() {
      deleteMessage(message);

      if ((message === null || message === void 0 ? void 0 : message.messageId) === (quoteMessage === null || quoteMessage === void 0 ? void 0 : quoteMessage.messageId)) {
        setQuoteMessage(null);
      }
    }
  }), showFileViewer && /*#__PURE__*/React__default.createElement(FileViewer, {
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
  userId: PropTypes.string,
  message: PropTypes.shape({
    isFileMessage: PropTypes.func,
    isAdminMessage: PropTypes.func,
    isUserMessage: PropTypes.func,
    isDateseparator: PropTypes.func,
    // should be a number, but there's a bug in SDK shich returns string
    messageId: PropTypes.number,
    type: PropTypes.string,
    createdAt: PropTypes.number,
    message: PropTypes.string,
    requestState: PropTypes.string,
    messageType: PropTypes.string,
    sender: PropTypes.shape({
      userId: PropTypes.string
    }),
    ogMetaData: PropTypes.shape({}),
    parentMessageId: PropTypes.number,
    reactions: PropTypes.arrayOf(PropTypes.number)
  }),
  animatedMessageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  highLightedMessageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  renderCustomMessage: PropTypes.func,
  currentGroupChannel: PropTypes.shape({}),
  hasSeparator: PropTypes.bool,
  disabled: PropTypes.bool,
  editDisabled: PropTypes.bool,
  deleteMessage: PropTypes.func.isRequired,
  scrollToMessage: PropTypes.func,
  updateMessage: PropTypes.func.isRequired,
  resendMessage: PropTypes.func.isRequired,
  useReaction: PropTypes.bool.isRequired,
  replyType: PropTypes.oneOf(['NONE', 'QUOTE_REPLY', 'THREAD']).isRequired,
  chainTop: PropTypes.bool.isRequired,
  chainBottom: PropTypes.bool.isRequired,
  membersMap: PropTypes.instanceOf(Map).isRequired,
  emojiContainer: PropTypes.shape({
    emojiCategories: PropTypes.arrayOf(PropTypes.shape({
      emojis: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        url: PropTypes.string
      }))
    }))
  }),
  toggleReaction: PropTypes.func,
  quoteMessage: PropTypes.shape({
    messageId: PropTypes.string
  }),
  setQuoteMessage: PropTypes.func.isRequired,
  handleScroll: PropTypes.func.isRequired
};
MessageHoc.defaultProps = {
  userId: '',
  editDisabled: false,
  renderCustomMessage: null,
  currentGroupChannel: {},
  message: {},
  hasSeparator: false,
  disabled: false,
  animatedMessageId: null,
  highLightedMessageId: null,
  toggleReaction: function toggleReaction() {},
  scrollToMessage: function scrollToMessage() {},
  emojiContainer: {},
  quoteMessage: null
};

var SCROLL_REF_CLASS_NAME = '.sendbird-msg--scroll-ref';

var ConversationScroll = /*#__PURE__*/function (_Component) {
  _inherits(ConversationScroll, _Component);

  var _super = _createSuper(ConversationScroll);

  function ConversationScroll(props) {
    var _this;

    _classCallCheck(this, ConversationScroll);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleScroll", function () {
      var _assertThisInitialize2;

      var _assertThisInitialize = (_assertThisInitialize2 = _assertThisInitialized(_this)) === null || _assertThisInitialize2 === void 0 ? void 0 : _assertThisInitialize2.props,
          scrollRef = _assertThisInitialize.scrollRef;

      var current = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current;

      if (current) {
        var bottom = current.scrollHeight - current.scrollTop - current.offsetHeight;
        var _this$state$scrollBot = _this.state.scrollBottom,
            scrollBottom = _this$state$scrollBot === void 0 ? 0 : _this$state$scrollBot;

        if (scrollBottom < bottom) {
          current.scrollTop += bottom - scrollBottom;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onScroll", function (e) {
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

        var nodes = scrollRef.current.querySelectorAll(SCROLL_REF_CLASS_NAME);
        var first = nodes && nodes[0];
        onScroll(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 1),
              messages = _ref2[0];

          if (messages) {
            // https://github.com/scabbiaza/react-scroll-position-on-updating-dom
            // Set block to nearest to prevent unexpected scrolling from outer components
            try {
              first.scrollIntoView({
                block: 'nearest'
              });
            } catch (error) {//
            }
          }
        });
      }

      if (clientHeight + scrollTop === scrollHeight) {
        var _nodes = scrollRef.current.querySelectorAll(SCROLL_REF_CLASS_NAME);

        var last = _nodes && _nodes[_nodes.length - 1];
        onScrollDown(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 1),
              messages = _ref4[0];

          if (messages) {
            // https://github.com/scabbiaza/react-scroll-position-on-updating-dom
            try {
              last.scrollIntoView({
                block: 'nearest'
              });
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
        } // save the lastest scroll bottom value


        if (scrollRef !== null && scrollRef !== void 0 && scrollRef.current) {
          var current = scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current;

          _this.setState(function (state) {
            return _objectSpread2(_objectSpread2({}, state), {}, {
              scrollBottom: current.scrollHeight - current.scrollTop - current.offsetHeight
            });
          }, function () {});
        }
      }, 500);
    });

    _this.state = {};
    return _this;
  }

  _createClass(ConversationScroll, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          userId = _this$props2.userId,
          disabled = _this$props2.disabled,
          scrollRef = _this$props2.scrollRef,
          membersMap = _this$props2.membersMap,
          allMessages = _this$props2.allMessages,
          scrollToMessage = _this$props2.scrollToMessage,
          useReaction = _this$props2.useReaction,
          replyType = _this$props2.replyType,
          emojiAllMap = _this$props2.emojiAllMap,
          editDisabled = _this$props2.editDisabled,
          deleteMessage = _this$props2.deleteMessage,
          updateMessage = _this$props2.updateMessage,
          resendMessage = _this$props2.resendMessage,
          renderCustomMessage = _this$props2.renderCustomMessage,
          renderChatItem = _this$props2.renderChatItem,
          animatedMessageId = _this$props2.animatedMessageId,
          highLightedMessageId = _this$props2.highLightedMessageId,
          emojiContainer = _this$props2.emojiContainer,
          toggleReaction = _this$props2.toggleReaction,
          useMessageGrouping = _this$props2.useMessageGrouping,
          currentGroupChannel = _this$props2.currentGroupChannel,
          memoizedEmojiListItems = _this$props2.memoizedEmojiListItems,
          showScrollBot = _this$props2.showScrollBot,
          onClickScrollBot = _this$props2.onClickScrollBot,
          quoteMessage = _this$props2.quoteMessage,
          setQuoteMessage = _this$props2.setQuoteMessage;

      if (allMessages.length < 1) {
        return /*#__PURE__*/React__default.createElement(PlaceHolder, {
          className: "sendbird-conversation__no-messages",
          type: PlaceHolderTypes.NO_MESSAGES
        });
      }

      return /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-conversation__messages"
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-conversation__scroll-container"
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-conversation__padding"
      }), /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-conversation__messages-padding",
        ref: scrollRef,
        onScroll: this.onScroll
      }, allMessages.map(function (m, idx) {
        var previousMessage = allMessages[idx - 1];
        var nextMessage = allMessages[idx + 1];

        var _ref5 = useMessageGrouping ? compareMessagesForGrouping(previousMessage, m, nextMessage) : [false, false],
            _ref6 = _slicedToArray(_ref5, 2),
            chainTop = _ref6[0],
            chainBottom = _ref6[1];

        var previousMessageCreatedAt = previousMessage && previousMessage.createdAt;
        var currentCreatedAt = m.createdAt; // https://stackoverflow.com/a/41855608

        var hasSeparator = !(previousMessageCreatedAt && isSameDay(currentCreatedAt, previousMessageCreatedAt));

        if (renderChatItem) {
          return /*#__PURE__*/React__default.createElement("div", {
            key: m.messageId || m.reqId,
            className: "sendbird-msg--scroll-ref"
          }, renderChatItem({
            message: m,
            animatedMessageId: animatedMessageId,
            highLightedMessageId: highLightedMessageId,
            channel: currentGroupChannel,
            onDeleteMessage: deleteMessage,
            onUpdateMessage: updateMessage,
            onResendMessage: resendMessage,
            onScrollToMessage: scrollToMessage,
            onReplyMessage: setQuoteMessage,
            emojiContainer: emojiContainer,
            chainTop: chainTop,
            chainBottom: chainBottom,
            hasSeparator: hasSeparator,
            menuDisabled: disabled
          }));
        }

        return /*#__PURE__*/React__default.createElement(MessageHoc, {
          animatedMessageId: animatedMessageId,
          highLightedMessageId: highLightedMessageId,
          renderCustomMessage: renderCustomMessage,
          key: m.messageId || m.reqId,
          userId: userId,
          handleScroll: _this2.handleScroll,
          message: m,
          quoteMessage: quoteMessage,
          scrollToMessage: scrollToMessage,
          currentGroupChannel: currentGroupChannel,
          disabled: disabled,
          membersMap: membersMap,
          chainTop: chainTop,
          useReaction: useReaction,
          replyType: replyType,
          emojiAllMap: emojiAllMap,
          emojiContainer: emojiContainer,
          editDisabled: editDisabled,
          hasSeparator: hasSeparator,
          chainBottom: chainBottom,
          updateMessage: updateMessage,
          deleteMessage: deleteMessage,
          resendMessage: resendMessage,
          toggleReaction: toggleReaction,
          setQuoteMessage: setQuoteMessage,
          memoizedEmojiListItems: memoizedEmojiListItems
        });
      }))), showScrollBot && /*#__PURE__*/React__default.createElement("div", {
        className: "sendbird-conversation__scroll-bottom-button",
        onClick: onClickScrollBot,
        onKeyDown: onClickScrollBot,
        tabIndex: 0,
        role: "button"
      }, /*#__PURE__*/React__default.createElement(Icon, {
        width: "24px",
        height: "24px",
        type: IconTypes.CHEVRON_DOWN,
        fillColor: IconColors.PRIMARY
      })));
    }
  }]);

  return ConversationScroll;
}(Component);
ConversationScroll.propTypes = {
  // https://stackoverflow.com/a/52646941
  scrollRef: PropTypes.shape({
    current: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({})])
  }).isRequired,
  hasMore: PropTypes.bool,
  messagesDispatcher: PropTypes.func.isRequired,
  onScroll: PropTypes.func,
  onScrollDown: PropTypes.func,
  editDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  userId: PropTypes.string,
  allMessages: PropTypes.arrayOf(PropTypes.shape({
    createdAt: PropTypes.number
  })).isRequired,
  deleteMessage: PropTypes.func.isRequired,
  resendMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  currentGroupChannel: PropTypes.shape({
    markAsRead: PropTypes.func,
    members: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  animatedMessageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  highLightedMessageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  renderChatItem: PropTypes.func,
  renderCustomMessage: PropTypes.func,
  scrollToMessage: PropTypes.func,
  useReaction: PropTypes.bool,
  replyType: PropTypes.oneOf(['NONE', 'QUOTE_REPLY', 'THREAD']),
  showScrollBot: PropTypes.bool,
  onClickScrollBot: PropTypes.func,
  emojiContainer: PropTypes.shape({}),
  emojiAllMap: PropTypes.instanceOf(Map),
  membersMap: PropTypes.instanceOf(Map),
  useMessageGrouping: PropTypes.bool,
  toggleReaction: PropTypes.func,
  memoizedEmojiListItems: PropTypes.func,
  quoteMessage: PropTypes.shape({}),
  setQuoteMessage: PropTypes.func.isRequired
};
ConversationScroll.defaultProps = {
  hasMore: false,
  editDisabled: false,
  disabled: false,
  userId: '',
  renderCustomMessage: null,
  renderChatItem: null,
  animatedMessageId: null,
  highLightedMessageId: null,
  onScroll: null,
  onScrollDown: null,
  useReaction: true,
  replyType: 'NONE',
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
  quoteMessage: null
};

function Notification(_ref) {
  var count = _ref.count,
      time = _ref.time,
      onClick = _ref.onClick;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  var timeArray = time.split(' ');
  timeArray.splice(-2, 0, stringSet.CHANNEL__MESSAGE_LIST__NOTIFICATION__ON);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line
    React__default.createElement("div", {
      className: "sendbird-notification",
      onClick: onClick
    }, /*#__PURE__*/React__default.createElement(Label, {
      className: "sendbird-notification__text",
      color: LabelColors.ONCONTENT_1,
      type: LabelTypography.CAPTION_2
    }, "".concat(count, " "), stringSet.CHANNEL__MESSAGE_LIST__NOTIFICATION__NEW_MESSAGE, " ".concat(timeArray.join(' '))), /*#__PURE__*/React__default.createElement(Icon, {
      width: "24px",
      height: "24px",
      type: IconTypes.CHEVRON_DOWN,
      fillColor: IconColors.CONTENT
    }))
  );
}
Notification.propTypes = {
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  time: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
Notification.defaultProps = {
  count: 0,
  time: ''
};

var FrozenNotification = function FrozenNotification() {
  var stringSet = useContext(LocalizationContext).stringSet;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-notification sendbird-notification--frozen"
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-notification__text",
    type: LabelTypography.CAPTION_2
  }, stringSet.CHANNEL_FROZEN));
};

var TypingIndicatorText = function TypingIndicatorText(_ref) {
  var members = _ref.members;

  var _useContext = useContext(LocalizationContext),
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

function TypingIndicator(props) {
  var className = props.className,
      channelUrl = props.channelUrl,
      sb = props.sb,
      logger = props.logger;

  var _useState = useState(uuidv4()),
      _useState2 = _slicedToArray(_useState, 2),
      handlerId = _useState2[0],
      setHandlerId = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      typingMembers = _useState4[0],
      setTypingMembers = _useState4[1];

  useEffect(function () {
    if (sb && sb.ChannelHandler) {
      sb.removeChannelHandler(handlerId);
      var newHandlerId = uuidv4();
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
  }, [channelUrl]);
  return /*#__PURE__*/React__default.createElement(Label, {
    className: className,
    type: LabelTypography.CAPTION_2,
    color: LabelColors.ONBACKGROUND_2
  }, /*#__PURE__*/React__default.createElement(TypingIndicatorText, {
    members: typingMembers
  }));
}

TypingIndicator.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  channelUrl: PropTypes.string.isRequired,
  sb: PropTypes.shape({
    ChannelHandler: PropTypes.func,
    removeChannelHandler: PropTypes.func,
    addChannelHandler: PropTypes.func
  }).isRequired,
  logger: PropTypes.shape({
    info: PropTypes.func
  }).isRequired
};
TypingIndicator.defaultProps = {
  className: ''
};

var componentClassname = 'sendbird-quote_message_input__avatar';
function QuoteMessageThumbnail(_a) {
  var message = _a.message;

  if (!isFileMessage(message)) {
    return null;
  }

  var thumbnailUrl = message.thumbnails && message.thumbnails.length > 0 && message.thumbnails[0].url || isImageMessage(message) && message.url;

  if (isThumbnailMessage(message) && thumbnailUrl) {
    return /*#__PURE__*/React__default.createElement(ImageRenderer, {
      className: componentClassname,
      url: thumbnailUrl,
      alt: message.type,
      width: "44px",
      height: "44px",
      fixedSize: true
    });
  } else if (isAudioMessage(message)) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: componentClassname
    }, /*#__PURE__*/React__default.createElement(Icon, {
      type: IconTypes.FILE_AUDIO,
      fillColor: IconColors.ON_BACKGROUND_2,
      width: "24px",
      height: "24px"
    }));
  } else {
    return /*#__PURE__*/React__default.createElement("div", {
      className: componentClassname
    }, /*#__PURE__*/React__default.createElement(Icon, {
      type: IconTypes.FILE_DOCUMENT,
      fillColor: IconColors.ON_BACKGROUND_2,
      width: "24px",
      height: "24px"
    }));
  }
}

function QuoteMessageInput(_a) {
  var _b;

  var className = _a.className,
      replyingMessage = _a.replyingMessage,
      onClose = _a.onClose;
  var stringSet = useContext(LocalizationContext).stringSet;
  var fileMessage = replyingMessage;
  var sender = (_b = replyingMessage) === null || _b === void 0 ? void 0 : _b.sender;
  return /*#__PURE__*/React__default.createElement("div", {
    className: getClassName(['sendbird-quote_message_input', className])
  }, /*#__PURE__*/React__default.createElement(QuoteMessageThumbnail, {
    message: fileMessage
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-quote_message_input__body",
    style: {
      width: "calc(100% - " + (fileMessage.isFileMessage() ? '164px' : '120px') + ")",
      left: fileMessage.isFileMessage() ? '92px' : '40px'
    }
  }, /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-quote_message_input__body__sender-name",
    type: LabelTypography.CAPTION_1,
    color: LabelColors.ONBACKGROUND_1
  }, stringSet.QUOTE_MESSAGE_INPUT__REPLY_TO + " " + (sender && sender.nickname ? sender.nickname : stringSet.NO_NAME)), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-quote_message_input__body__message-content",
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_3
  }, isImageMessage(fileMessage) && !isGifMessage(fileMessage) && stringSet.QUOTE_MESSAGE_INPUT__FILE_TYPE_IMAGE, isVideoMessage(fileMessage) && stringSet.QUOTE_MESSAGE_INPUT__FILE_TYPE__VIDEO, isGifMessage(fileMessage) && stringSet.QUOTE_MESSAGE_INPUT__FILE_TYPE_GIF, isUserMessage(replyingMessage) && replyingMessage.message, isFileMessage(fileMessage) && !isThumbnailMessage(fileMessage) && fileMessage.name)), /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-quote_message_input__close-button",
    type: IconTypes.CLOSE,
    fillColor: IconColors.ON_BACKGROUND_2,
    width: "24px",
    height: "24px",
    onClick: function onClick() {
      return onClose(replyingMessage);
    }
  }));
}

// Logic required to handle message input rendering

var MessageInputWrapper = function MessageInputWrapper(_a, ref) {
  var channel = _a.channel,
      user = _a.user,
      isOnline = _a.isOnline,
      initialized = _a.initialized,
      quoteMessage = _a.quoteMessage,
      _onSendMessage = _a.onSendMessage,
      _onFileUpload = _a.onFileUpload,
      setQuoteMessage = _a.setQuoteMessage,
      renderMessageInput = _a.renderMessageInput;
  var stringSet = useContext(LocalizationContext).stringSet;
  var disabled = !initialized || isDisabledBecauseFrozen(channel) || isDisabledBecauseMuted(channel) || !isOnline;
  var isOperator$1 = isOperator(channel);
  var isBroadcast = channel.isBroadcast; // custom message

  if (renderMessageInput) {
    return renderMessageInput({
      channel: channel,
      user: user,
      disabled: disabled,
      quoteMessage: quoteMessage
    });
  } // broadcast channel + not operator


  if (isBroadcast && !isOperator$1) {
    return null;
  } // other conditions


  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message-input-wrapper"
  }, quoteMessage && /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-message-input-wrapper__quote-message-input"
  }, /*#__PURE__*/React__default.createElement(QuoteMessageInput, {
    replyingMessage: quoteMessage,
    onClose: function onClose() {
      return setQuoteMessage(null);
    }
  })), /*#__PURE__*/React__default.createElement(MessageInput, {
    className: "sendbird-message-input-wrapper__message-input",
    channelUrl: channel === null || channel === void 0 ? void 0 : channel.url,
    placeholder: quoteMessage && stringSet.MESSAGE_INPUT__QUOTE_REPLY__PLACE_HOLDER || isDisabledBecauseFrozen(channel) && stringSet.MESSAGE_INPUT__PLACE_HOLDER__DISABLED || isDisabledBecauseMuted(channel) && stringSet.MESSAGE_INPUT__PLACE_HOLDER__MUTED,
    ref: ref,
    disabled: disabled,
    onStartTyping: function onStartTyping() {
      channel.startTyping();
    },
    onSendMessage: function onSendMessage() {
      _onSendMessage(quoteMessage);

      setQuoteMessage(null);
    },
    onFileUpload: function onFileUpload(file) {
      _onFileUpload(file, quoteMessage);

      setQuoteMessage(null);
    }
  }));
};

var MessageInputWrapper$1 = /*#__PURE__*/React__default.forwardRef(MessageInputWrapper);

function ConnectionStatus() {
  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-connection-status"
  }, /*#__PURE__*/React__default.createElement(Label, {
    type: LabelTypography.BODY_2,
    color: LabelColors.ONBACKGROUND_2
  }, stringSet.TRYING_TO_CONNECT), /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.DISCONNECTED,
    fillColor: IconColors.SENT,
    width: "14px",
    height: "14px"
  }));
}

var getChannelTitle = function getChannelTitle() {
  var channel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var currentUserId = arguments.length > 1 ? arguments[1] : undefined;
  var stringSet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : LabelStringSet;

  if (!channel || !channel.name && !channel.members) {
    return stringSet.NO_TITLE;
  }

  if (channel.name && channel.name !== 'Group Channel') {
    return channel.name;
  }

  if (channel.members.length === 1) {
    return stringSet.NO_MEMBERS;
  }

  return channel.members.filter(function (_ref) {
    var userId = _ref.userId;
    return userId !== currentUserId;
  }).map(function (_ref2) {
    var nickname = _ref2.nickname;
    return nickname || stringSet.NO_NAME;
  }).join(', ');
};

var noop$1 = function noop() {};

function ChatHeader(props) {
  var currentGroupChannel = props.currentGroupChannel,
      currentUser = props.currentUser,
      title = props.title,
      subTitle = props.subTitle,
      isMuted = props.isMuted,
      theme = props.theme,
      showSearchIcon = props.showSearchIcon,
      onSearchClick = props.onSearchClick,
      onActionClick = props.onActionClick;
  var userId = currentUser.userId;

  var _useContext = useContext(LocalizationContext),
      stringSet = _useContext.stringSet;

  return /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-chat-header"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-chat-header__left"
  }, /*#__PURE__*/React__default.createElement(ChannelAvatar, {
    theme: theme,
    channel: currentGroupChannel,
    userId: userId,
    height: 32,
    width: 32
  }), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-chat-header__left__title",
    type: LabelTypography.H_2,
    color: LabelColors.ONBACKGROUND_1
  }, title || getChannelTitle(currentGroupChannel, userId, stringSet)), /*#__PURE__*/React__default.createElement(Label, {
    className: "sendbird-chat-header__left__subtitle",
    type: LabelTypography.BODY_1,
    color: LabelColors.ONBACKGROUND_2
  }, subTitle)), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-chat-header__right"
  }, (typeof isMuted === 'string' && isMuted === 'true' || typeof isMuted === 'boolean' && isMuted) && /*#__PURE__*/React__default.createElement(Icon, {
    className: "sendbird-chat-header__right__mute",
    type: IconTypes.NOTIFICATIONS_OFF_FILLED,
    width: "24px",
    height: "24px"
  }), showSearchIcon && /*#__PURE__*/React__default.createElement(IconButton, {
    className: "sendbird-chat-header__right__search",
    width: "32px",
    height: "32px",
    onClick: onSearchClick
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.SEARCH,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  })), /*#__PURE__*/React__default.createElement(IconButton, {
    className: "sendbird-chat-header__right__info",
    width: "32px",
    height: "32px",
    onClick: onActionClick
  }, /*#__PURE__*/React__default.createElement(Icon, {
    type: IconTypes.INFO,
    fillColor: IconColors.PRIMARY,
    width: "24px",
    height: "24px"
  }))));
}
ChatHeader.propTypes = {
  currentGroupChannel: PropTypes.shape({
    members: PropTypes.arrayOf(PropTypes.shape({})),
    coverUrl: PropTypes.string
  }),
  currentUser: PropTypes.shape({
    userId: PropTypes.string
  }),
  title: PropTypes.string,
  subTitle: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  isMuted: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  theme: PropTypes.string,
  showSearchIcon: PropTypes.bool,
  onSearchClick: PropTypes.func,
  onActionClick: PropTypes.func
};
ChatHeader.defaultProps = {
  currentGroupChannel: {},
  currentUser: {},
  title: '',
  subTitle: '',
  isMuted: false,
  theme: 'light',
  showSearchIcon: false,
  onSearchClick: noop$1,
  onActionClick: noop$1
};

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
      replyType = props.replyType,
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

  useEffect(function () {
    if (renderCustomMessage) {
      // eslint-disable-next-line no-console
      console.info('The parameter type of renderCustomMessage will be changed to the object in the next minor update.');
    }
  }, []);

  var _useState = useState(startingPoint),
      _useState2 = _slicedToArray(_useState, 2),
      intialTimeStamp = _useState2[0],
      setIntialTimeStamp = _useState2[1];

  useEffect(function () {
    setIntialTimeStamp(startingPoint);
  }, [startingPoint, channelUrl]);

  var _useState3 = useState(''),
      _useState4 = _slicedToArray(_useState3, 2),
      animatedMessageId = _useState4[0],
      setAnimatedMessageId = _useState4[1];

  var _useState5 = useState(highlightedMessage),
      _useState6 = _slicedToArray(_useState5, 2),
      highLightedMessageId = _useState6[0],
      setHighLightedMessageId = _useState6[1];

  useEffect(function () {
    setHighLightedMessageId(highlightedMessage);
  }, [highlightedMessage]);
  var userFilledMessageListQuery = queries.messageListParams;

  var _useState7 = useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      quoteMessage = _useState8[0],
      setQuoteMessage = _useState8[1];

  var _useReducer = useReducer(reducer, messagesInitialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      messagesStore = _useReducer2[0],
      messagesDispatcher = _useReducer2[1];

  var scrollRef = useRef(null);
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
  var usingReaction = appInfo.isUsingReaction && !isBroadcast && !isSuper && useReaction // TODO: Make useReaction independent from appInfo.isUsingReaction
  ;
  var userDefinedDisableUserProfile = disableUserProfile || config.disableUserProfile;
  var userDefinedRenderProfile = renderUserProfile || config.renderUserProfile;
  var showScrollBot = hasMoreToBottom; // TODO: emojiAllMap, emoijAllList, nicknamesMap => should be moved to messagesStore

  var emojiAllMap = useMemo(function () {
    return usingReaction ? getAllEmojisMapFromEmojiContainer(emojiContainer) : new Map();
  }, [emojiContainer]);
  var emojiAllList = useMemo(function () {
    return usingReaction ? getAllEmojisFromEmojiContainer$1(emojiContainer) : [];
  }, [emojiContainer]);
  var nicknamesMap = useMemo(function () {
    return usingReaction ? getNicknamesMapFromMembers(currentGroupChannel.members) : new Map();
  }, [currentGroupChannel.members]); // Scrollup is default scroll for channel

  var onScrollCallback = useScrollCallback({
    currentGroupChannel: currentGroupChannel,
    lastMessageTimeStamp: lastMessageTimeStamp,
    userFilledMessageListQuery: userFilledMessageListQuery,
    replyType: replyType
  }, {
    hasMore: hasMore,
    logger: logger,
    messagesDispatcher: messagesDispatcher,
    sdk: sdk
  });
  var scrollToMessage = useScrollToMessage({
    setIntialTimeStamp: setIntialTimeStamp,
    setAnimatedMessageId: setAnimatedMessageId,
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
    hasMoreToBottom: hasMoreToBottom,
    replyType: replyType
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
  });
  useEffect(function () {
    setQuoteMessage(null);
  }, [channelUrl]); // Hook to handle ChannelEvents and send values to useReducer using messagesDispatcher

  useHandleChannelEvents({
    currentGroupChannel: currentGroupChannel,
    sdkInit: sdkInit,
    hasMoreToBottom: hasMoreToBottom
  }, {
    messagesDispatcher: messagesDispatcher,
    sdk: sdk,
    logger: logger,
    scrollRef: scrollRef,
    setQuoteMessage: setQuoteMessage
  }); // hook that fetches messages when channel changes
  // to be clear here useGetChannel sets currentGroupChannel
  // and useInitialMessagesFetch executes when currentGroupChannel changes
  // p.s This one executes on intialTimeStamp change too

  useInitialMessagesFetch({
    currentGroupChannel: currentGroupChannel,
    userFilledMessageListQuery: userFilledMessageListQuery,
    intialTimeStamp: intialTimeStamp,
    replyType: replyType
  }, {
    sdk: sdk,
    logger: logger,
    messagesDispatcher: messagesDispatcher
  }); // handles API calls from withSendbird

  useEffect(function () {
    var subScriber = pubSubHandler(channelUrl, pubSub, messagesDispatcher);
    return function () {
      pubSubHandleRemover(subScriber);
    };
  }, [channelUrl, sdkInit]); // handling connection breaks

  useHandleReconnect({
    isOnline: isOnline,
    replyType: replyType
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
      _useSendMessageCallba2 = _slicedToArray(_useSendMessageCallba, 2),
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
      _useSendFileMessageCa2 = _slicedToArray(_useSendFileMessageCa, 1),
      onSendFileMessage = _useSendFileMessageCa2[0];

  if (!channelUrl) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-conversation"
    }, /*#__PURE__*/React__default.createElement(PlaceHolder, {
      type: PlaceHolderTypes.NO_CHANNELS
    }));
  }

  if (isInvalid) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-conversation"
    }, /*#__PURE__*/React__default.createElement(PlaceHolder, {
      type: PlaceHolderTypes.WRONG
    }));
  }

  if (sdkError) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-conversation"
    }, /*#__PURE__*/React__default.createElement(PlaceHolder, {
      type: PlaceHolderTypes.WRONG,
      retryToConnect: function retryToConnect() {
        logger.info('Channel: reconnecting');
        reconnect();
      }
    }));
  }

  return /*#__PURE__*/React__default.createElement(UserProfileProvider, {
    className: "sendbird-conversation",
    disableUserProfile: userDefinedDisableUserProfile,
    renderUserProfile: userDefinedRenderProfile
  }, renderChatHeader ? renderChatHeader({
    channel: currentGroupChannel,
    user: user
  }) : /*#__PURE__*/React__default.createElement(ChatHeader, {
    theme: theme,
    currentGroupChannel: currentGroupChannel,
    currentUser: user,
    showSearchIcon: showSearchIcon,
    onSearchClick: onSearchClick,
    onActionClick: onChatHeaderActionClick,
    subTitle: currentGroupChannel.members && currentGroupChannel.members.length !== 2,
    isMuted: false
  }), isFrozen && /*#__PURE__*/React__default.createElement(FrozenNotification, null), unreadCount > 0 && /*#__PURE__*/React__default.createElement(Notification, {
    count: unreadCount,
    onClick: function onClick() {
      if (intialTimeStamp) {
        setIntialTimeStamp(null);
        setAnimatedMessageId(null);
        setHighLightedMessageId(null);
      } else {
        scrollIntoLast(); // there is no scroll

        if (scrollRef.current.scrollTop === 0) {
          try {
            currentGroupChannel.markAsRead();
          } catch (_unused) {//
          }

          messagesDispatcher({
            type: MARK_AS_READ
          });
        }
      }
    },
    time: unreadSince
  }), loading ? /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-conversation"
  }, /*#__PURE__*/React__default.createElement(PlaceHolder, {
    type: PlaceHolderTypes.LOADING
  })) : /*#__PURE__*/React__default.createElement(ConversationScroll, {
    swapParams: sdk && sdk.getErrorFirstCallback && sdk.getErrorFirstCallback(),
    animatedMessageId: animatedMessageId,
    highLightedMessageId: highLightedMessageId,
    userId: userId,
    hasMore: hasMore,
    disabled: !isOnline,
    onScroll: onScrollCallback,
    onScrollDown: onScrollDownCallback,
    scrollRef: scrollRef,
    readStatus: readStatus,
    useReaction: usingReaction,
    replyType: replyType,
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
    quoteMessage: quoteMessage,
    setQuoteMessage: setQuoteMessage,
    showScrollBot: showScrollBot,
    onClickScrollBot: function onClickScrollBot() {
      setIntialTimeStamp(null);
      setAnimatedMessageId(null);
      setHighLightedMessageId(null);
    },
    renderCustomMessage: renderCustomMessage,
    useMessageGrouping: useMessageGrouping,
    messagesDispatcher: messagesDispatcher,
    currentGroupChannel: currentGroupChannel,
    memoizedEmojiListItems: memoizedEmojiListItems
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-conversation__footer"
  }, /*#__PURE__*/React__default.createElement(MessageInputWrapper$1, {
    channel: currentGroupChannel,
    user: user,
    ref: messageInputRef,
    isOnline: isOnline,
    initialized: initialized,
    onSendMessage: onSendMessage,
    onFileUpload: onSendFileMessage,
    quoteMessage: quoteMessage,
    setQuoteMessage: setQuoteMessage,
    renderMessageInput: renderMessageInput
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "sendbird-conversation__footer__typing-indicator"
  }, /*#__PURE__*/React__default.createElement(TypingIndicator, {
    className: "sendbird-conversation__footer__typing-indicator__text",
    channelUrl: channelUrl,
    sb: sdk,
    logger: logger
  }), !isOnline && /*#__PURE__*/React__default.createElement(ConnectionStatus, {
    sdkInit: sdkInit,
    sb: sdk,
    logger: logger
  }))));
};
ConversationPanel.propTypes = {
  channelUrl: PropTypes.string,
  stores: PropTypes.shape({
    sdkStore: PropTypes.shape({
      initialized: PropTypes.bool,
      sdk: PropTypes.shape({
        getErrorFirstCallback: PropTypes.func,
        removeChannelHandler: PropTypes.func,
        GroupChannel: PropTypes.any,
        ChannelHandler: PropTypes.any,
        addChannelHandler: PropTypes.func,
        UserMessageParams: PropTypes.any,
        FileMessageParams: PropTypes.any,
        getAllEmoji: PropTypes.func,
        appInfo: PropTypes.shape({})
      }),
      error: PropTypes.bool
    }),
    userStore: PropTypes.shape({
      user: PropTypes.shape({})
    })
  }).isRequired,
  dispatchers: PropTypes.shape({
    reconnect: PropTypes.func
  }).isRequired,
  config: PropTypes.shape({
    disableUserProfile: PropTypes.bool,
    renderUserProfile: PropTypes.func,
    userId: PropTypes.string.isRequired,
    isOnline: PropTypes.bool.isRequired,
    theme: PropTypes.string,
    logger: PropTypes.shape({
      info: PropTypes.func,
      error: PropTypes.func,
      warning: PropTypes.func
    }),
    pubSub: PropTypes.shape({
      subscribe: PropTypes.func,
      publish: PropTypes.func
    }),
    imageCompression: PropTypes.shape({
      compressionRate: PropTypes.number,
      resizingWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      resizingHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  }).isRequired,
  queries: PropTypes.shape({
    messageListParams: PropTypes.shape({
      includeMetaArray: PropTypes.bool,
      includeParentMessageText: PropTypes.bool,
      includeReaction: PropTypes.bool,
      includeReplies: PropTypes.bool,
      includeThreadInfo: PropTypes.bool,
      limit: PropTypes.number,
      reverse: PropTypes.bool,
      senderUserIdsFilter: PropTypes.arrayOf(PropTypes.string)
    })
  }),
  startingPoint: PropTypes.number,
  highlightedMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBeforeSendUserMessage: PropTypes.func,
  // onBeforeSendUserMessage(text)
  onBeforeSendFileMessage: PropTypes.func,
  // onBeforeSendFileMessage(File)
  onBeforeUpdateUserMessage: PropTypes.func,
  renderChatItem: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  renderCustomMessage: PropTypes.func,
  renderMessageInput: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  renderChatHeader: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  showSearchIcon: PropTypes.bool,
  onSearchClick: PropTypes.func,
  onChatHeaderActionClick: PropTypes.func,
  useReaction: PropTypes.bool,
  replyType: PropTypes.oneOf(['NONE', 'QUOTE_REPLY', 'THREAD']),
  disableUserProfile: PropTypes.bool,
  renderUserProfile: PropTypes.func,
  useMessageGrouping: PropTypes.bool
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
  replyType: 'NONE',
  showSearchIcon: false,
  onSearchClick: noop,
  disableUserProfile: false,
  renderUserProfile: null,
  useMessageGrouping: true,
  onChatHeaderActionClick: noop
};
var getEmojiCategoriesFromEmojiContainer = getEmojiCategoriesFromEmojiContainer$1,
    getAllEmojisFromEmojiContainer = getAllEmojisFromEmojiContainer$1,
    getEmojisFromEmojiContainer = getEmojisFromEmojiContainer$1;
var Conversation = withSendbirdContext(ConversationPanel);

export { ChatHeader as C, ReactionButton as R, UnknownMessageItemBody as U, ConnectionStatus as a, Conversation as b, ConversationPanel as c, getAllEmojisFromEmojiContainer as d, getEmojisFromEmojiContainer as e, getEmojiCategoriesFromEmojiContainer as g };
//# sourceMappingURL=index-22a657c6.js.map
