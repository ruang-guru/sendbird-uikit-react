import React, { ReactElement } from 'react';
import { UserMessage } from 'sendbird';

import ClampedTextMessageItemBody from '../ClampedMessageItemBody';
import RepliedMessageItemBody from '../RepliedMessageItemBody';
import {
  formatedStringToRepliedMessage,
  isReplyingMessage,
  metaArraysToRepliedMessage,
  RepliedMessageType,
} from '../../utils';

interface Props {
  className?: string | Array<string>;
  isByMe?: boolean;
  message: UserMessage;
  onClickRepliedMessage?: (createdAt: number, messageId: number) => void;
}

export default function TextMessageItemBody({
  className,
  isByMe = false,
  message,
  onClickRepliedMessage,
}: Props): ReactElement {
  let messageBody = message.message;
  let repliedMessageBody = '';
  let repliedMessageCreatedAt = 0;
  let repliedMessageId = '';
  let repliedMessageMediaUrl = '';
  let repliedMessageMimeType = '*';
  let repliedMessageNickname = '';
  let repliedMessageType = RepliedMessageType.Text;

  const hasRepliedMessage = isReplyingMessage(message);

  if (hasRepliedMessage) {
    const {
      originalMessage,
      parentMessageBody,
      parentMessageNickname,
    } = formatedStringToRepliedMessage(messageBody);

    const repliedMessage = metaArraysToRepliedMessage(message.metaArrays);

    messageBody = originalMessage;
    repliedMessageBody = parentMessageBody;
    repliedMessageCreatedAt = repliedMessage.parentMessageCreatedAt;
    repliedMessageId = repliedMessage.parentMessageId;
    repliedMessageMediaUrl = repliedMessage.parentMessageMediaUrl;
    repliedMessageMimeType = repliedMessage.parentMessageMimeType;
    repliedMessageNickname = parentMessageNickname;
    repliedMessageType = repliedMessage.parentMessageType;
  }

  const handleScrollToRepliedMessage = () => {
    if (
      hasRepliedMessage &&
      onClickRepliedMessage &&
      typeof onClickRepliedMessage === 'function'
    ) {
      onClickRepliedMessage(
        Number(repliedMessageCreatedAt),
        Number(repliedMessageId)
      );
    }
  };

  return (
    <>
      {hasRepliedMessage && (
        <RepliedMessageItemBody
          body={repliedMessageBody}
          isByMe={isByMe}
          mimeType={repliedMessageMimeType}
          nickname={repliedMessageNickname}
          type={repliedMessageType}
          onClick={() => handleScrollToRepliedMessage()}
          mediaUrl={repliedMessageMediaUrl}
        />
      )}

      <ClampedTextMessageItemBody
        className={className}
        isByMe={isByMe}
        content={messageBody}
      />
    </>
  );
}
