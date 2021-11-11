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

  const hasRepliedMessage = isReplyingMessage(message);
  console.log(hasRepliedMessage);

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
  }

  return (
    <>
      {hasRepliedMessage && !hasMedia && (
        <RepliedMessageItemBody
          body={repliedMessageBody}
          isByMe={isByMe}
          mimeType={repliedMessageMimeType}
          nickname={repliedMessageNickname}
          type={repliedMessageType}
          onClick={onClickRepliedMessage}
        />
      )}

      {hasRepliedMessage && hasMedia && (
        <RepliedMessageItemBody
          isByMe={isByMe}
          nickname={parentMessageNickname}
          messageContent={parentMessageBody}
          type={RepliedMessageTypes.Image}
          onClick={onClickRepliedMessage}
          mediaUrl="https://sendbird-upload.s3.amazonaws.com/D74864D6-2283-48E1-8381-89719216DC7F/upload/n/f09296bcc9454448940a4830092377b0.png"
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
