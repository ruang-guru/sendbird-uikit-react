import React, { ReactElement } from 'react';
import { UserMessage } from 'sendbird';

import ClampedTextMessageItemBody from '../ClampedMessageItemBody';
import RepliedMessageItemBody, {
  RepliedMessageTypes,
} from './RepliedMessageItemBody';
import { destructureRepliedMessage, isReplyingMessage } from '../../utils';

interface Props {
  className?: string | Array<string>;
  isByMe?: boolean;
  message: UserMessage;
  onScrollToRepliedMessage?: () => void;
}

export default function TextMessageItemBody({
  className,
  isByMe = false,
  message,
  onScrollToRepliedMessage,
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
          type={RepliedMessageTypes.Text}
          onClick={onScrollToRepliedMessage}
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
