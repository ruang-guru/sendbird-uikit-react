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
  onClickRepliedMessage?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

export default function TextMessageItemBody({
  className,
  isByMe = false,
  message,
  onClickRepliedMessage,
}: Props): ReactElement {
  let repliedMessageNickname = '';
  let repliedMessageBody = '';
  let repliedMessageMimeType = '*';
  let repliedMessageType = RepliedMessageType.Text;
  let messageBody = message.message;
  let repliedMessageMediaUrl = '';

  const hasRepliedMessage = isReplyingMessage(message);

  if (hasRepliedMessage) {
    const {
      originalMessage,
      parentMessageBody,
      parentMessageNickname,
    } = formatedStringToRepliedMessage(messageBody);

    const repliedMessage = metaArraysToRepliedMessage(message.metaArrays);

    repliedMessageNickname = parentMessageNickname;
    repliedMessageBody = parentMessageBody;
    repliedMessageMimeType = repliedMessage.parentMessageMimeType;
    repliedMessageType = repliedMessage.parentMessageType;
    messageBody = originalMessage;
    repliedMessageMediaUrl = repliedMessage.parentMessageMediaUrl;
  }

  return (
    <>
      {hasRepliedMessage && (
        <RepliedMessageItemBody
          body={repliedMessageBody}
          isByMe={isByMe}
          mimeType={repliedMessageMimeType}
          nickname={repliedMessageNickname}
          type={repliedMessageType}
          onClick={onClickRepliedMessage}
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
