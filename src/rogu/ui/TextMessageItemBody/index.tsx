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

  const { originalMessage, parentMessageBody, parentMessageNickname } =
    hasRepliedMessage && formatedStringToRepliedMessage(messageContent);
    
  const resolvedMessageContent = hasRepliedMessage
    ? originalMessage
    : messageContent;

  return (
    <>
      {hasRepliedMessage && (
        <RepliedMessageItemBody
          isByMe={isByMe}
          nickname={parentMessageNickname}
          messageContent={parentMessageBody}
          type={RepliedMessageTypes.Text}
          onClick={onClickRepliedMessage}
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
