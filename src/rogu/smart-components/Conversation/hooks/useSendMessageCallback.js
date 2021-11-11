import { useRef, useCallback } from 'react';

import * as messageActionTypes from '../dux/actionTypes';
import * as utils from '../utils';
import * as topics from '../../../../lib/pubSub/topics';
import { repliedMessageToFormatedString } from '../../../utils';

export default function useSendMessageCallback(
  { currentGroupChannel, onBeforeSendUserMessage },
  {
    sdk, logger, pubSub, messagesDispatcher,
  },
) {
  const messageInputRef = useRef(null);

  const sendMessage = useCallback(
    (repliedMessage) => {
      console.log('repliedMessage', repliedMessage);
      const text = messageInputRef.current.value;

      const createParamsDefault = (txt) => {
        const message = typeof txt === 'string' ? txt.trim() : txt;
        const params = new sdk.UserMessageParams();
        params.message = message;
        return params;
      };

      const createCustomPrams = onBeforeSendUserMessage
        && typeof onBeforeSendUserMessage === 'function';

      if (createCustomPrams) {
        logger.info(
          'Channel: creating params using onBeforeSendUserMessage',
          onBeforeSendUserMessage,
        );
      }

      const params = onBeforeSendUserMessage
        ? onBeforeSendUserMessage(text)
        : createParamsDefault(text);

      if (repliedMessage) {
        const {
          parentMessageType,
          parentMessageBody,
          parentMessageId,
          parentMessageNickname,
          parentMessageImageUrl,
        } = repliedMessage;

        params.metaArrays = [
          ...params.metaArrays,
          new sdk.MessageMetaArray('parentMessageId', [
            String(parentMessageId),
          ]),
          new sdk.MessageMetaArray('parentMessageContent', [
            JSON.stringify({
              type: parentMessageType,
              body: parentMessageBody,
              messageId: parentMessageId,
              nickname: parentMessageNickname,
            }),
          ]),
          new sdk.MessageMetaArray('parentMessageImageUrl', [
            JSON.stringify({
              imageUrl: parentMessageImageUrl,
            }),
          ]),
        ];

        params.message = repliedMessageToFormatedString({
          originalMessage: text,
          parentMessageBody,
          parentMessageNickname,
        });
      }

      logger.info('Channel: Sending message has started', params);
      const pendingMsg = currentGroupChannel.sendUserMessage(
        params,
        (res, err) => {
          const swapParams = sdk.getErrorFirstCallback();
          let message = res;
          let error = err;
          if (swapParams) {
            message = err;
            error = res;
          }
          // sending params instead of pending message
          // to make sure that we can resend the message once it fails
          if (error) {
            logger.warning('Channel: Sending message failed!', {
              message,
            });
            messagesDispatcher({
              type: messageActionTypes.SEND_MESSAGEGE_FAILURE,
              payload: message,
            });
            return;
          }
          logger.info('Channel: Sending message success!', message);
          messagesDispatcher({
            type: messageActionTypes.SEND_MESSAGEGE_SUCESS,
            payload: message,
          });
        },
      );
      pubSub.publish(topics.SEND_MESSAGE_START, {
        /* pubSub is used instead of messagesDispatcher
          to avoid redundantly calling `messageActionTypes.SEND_MESSAGEGE_START` */
        message: pendingMsg,
        channel: currentGroupChannel,
      });
      setTimeout(() => utils.scrollIntoLast());
    },
    [currentGroupChannel, onBeforeSendUserMessage],
  );

  return [messageInputRef, sendMessage];
}
