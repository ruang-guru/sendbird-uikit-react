import { useCallback } from 'react';

import * as messageActionTypes from '../dux/actionTypes';

function useScrollCallback({
  currentGroupChannel,
  lastMessageTimeStamp,
  userFilledMessageListQuery,
}, {
  hasMore,
  logger,
  messagesDispatcher,
  sdk,
}) {
  return useCallback((cb) => {
    if (!hasMore) { return; }
    const messageListParams = new sdk.MessageListParams();
    messageListParams.prevResultSize = 30;
    messageListParams.includeMetaArray = true;
    messageListParams.includeReplies = false;
    messageListParams.includeReaction = true;

    if (userFilledMessageListQuery) {
      Object.keys(userFilledMessageListQuery).forEach((key) => {
        messageListParams[key] = userFilledMessageListQuery[key];
      });
    }
    logger.info('Channel: Fetching messages', { currentGroupChannel, userFilledMessageListQuery });

    currentGroupChannel.getMessagesByTimestamp(
      lastMessageTimeStamp || new Date().getTime(),
      messageListParams,
    )
      .then((messages) => {
        const hasMoreMessages = (messages && messages.length > 0);
        const lastMessageTs = hasMoreMessages
          ? messages[0].createdAt
          : null;

        messagesDispatcher({
          type: messageActionTypes.GET_PREV_MESSAGES_SUCESS,
          payload: {
            messages,
            hasMore: hasMoreMessages,
            lastMessageTimeStamp: lastMessageTs,
            currentGroupChannel,
          },
        });
        cb([messages, null]);
      })
      .catch((error) => {
        logger.error('Channel: Fetching messages failed', error);
        messagesDispatcher({
          type: messageActionTypes.GET_PREV_MESSAGES_SUCESS,
          payload: {
            messages: [],
            hasMore: false,
            lastMessageTimeStamp: 0,
            currentGroupChannel,
          },
        });
        cb([null, error]);
      })
      .finally(() => {
        currentGroupChannel.markAsRead();
      });
  }, [currentGroupChannel, lastMessageTimeStamp]);
}

export default useScrollCallback;
