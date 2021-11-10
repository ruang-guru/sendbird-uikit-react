import React, { ReactElement } from 'react';
import { UserMessage } from 'sendbird';

import ClampedTextMessageItemBody from '../ClampedMessageItemBody';
import RepliedMessageItemBody, {
  RepliedMessageTypes,
} from '../RepliedMessageItemBody';
import { destructureRepliedMessage, isReplyingMessage } from '../../utils';

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

  const { senderNickname, parentMessage, originalMessage } =
    hasRepliedMessage && destructureRepliedMessage(messageContent);
  const resolvedMessageContent = hasRepliedMessage
    ? originalMessage
    : messageContent;
  return (
    <>
      {hasRepliedMessage && (
        <RepliedMessageItemBody
          isByMe={isByMe}
          nickname={senderNickname}
          messageContent={parentMessage}
          type={RepliedMessageTypes.Image}
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
