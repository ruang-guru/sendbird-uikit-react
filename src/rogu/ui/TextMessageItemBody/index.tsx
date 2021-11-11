import React, { ReactElement } from 'react';
import { UserMessage } from 'sendbird';

import ClampedTextMessageItemBody from '../ClampedMessageItemBody';
import RepliedMessageItemBody, {
  RepliedMessageTypes,
} from '../RepliedMessageItemBody';
import { formatedStringToRepliedMessage, isReplyingMessage } from '../../utils';

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
  const messageContent = message.message;

  const hasRepliedMessage = isReplyingMessage(message);
  hasRepliedMessage && console.log('message', message);
  const hasMedia = isReplyingMediaMessage(message);

  const { originalMessage, parentMessageBody, parentMessageNickname } =
    hasRepliedMessage && formatedStringToRepliedMessage(messageContent);

  const resolvedMessageContent = hasRepliedMessage
    ? originalMessage
    : messageContent;

  return (
    <>
      {hasRepliedMessage && !hasMedia && (
        <RepliedMessageItemBody
          isByMe={isByMe}
          nickname={parentMessageNickname}
          messageContent={parentMessageBody}
          type={RepliedMessageTypes.Text}
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
        content={resolvedMessageContent}
      />
    </>
  );
}
