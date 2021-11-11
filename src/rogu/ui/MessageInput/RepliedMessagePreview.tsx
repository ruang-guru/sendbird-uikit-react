/**
 * TODO
 * [x] Handle reply text message
 * [ ] Handle reply file message
 * [ ] Handle reply assignment message
 * [ ] Handle reply material message
 * [ ] Handle reply image message
 * [ ] Handle reply video message
 * [x] Handle reply replied message
 */

import React from 'react';
import { FileMessage, UserMessage } from 'sendbird';

import RepliedTextMessageItemBody from '../RepliedTextMessageItemBody';

import { isOGMessage, isTextMessage } from '../../../utils';
import {
  formatedStringToRepliedMessage,
  isFileMessage,
  isReplyingMessage,
} from '../../utils';

export type RepliedMessagePreviewProps = {
  className?: string;
  isByMe: boolean;
  message: FileMessage | UserMessage;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onCancel?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export function RepliedMessagePreview({
  className = '',
  message,
  onCancel,
  onClick,
}: RepliedMessagePreviewProps): JSX.Element {
  const nickname = message.sender?.nickname;
  let body = isFileMessage(message as FileMessage)
    ? (message as FileMessage).name
    : (message as UserMessage).message;

  // if the replied message is replying another message
  if (isReplyingMessage(message)) {
    const { originalMessage } = formatedStringToRepliedMessage(body);

    body = originalMessage;
  }

  return (
    <div className={className}>
      {(isTextMessage(message as UserMessage) ||
        isOGMessage(message as UserMessage)) && (
        <RepliedTextMessageItemBody
          content={body}
          isByMe={false} // always false to match the styling
          nickname={nickname}
          withCancelButton
          onClick={onClick}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}

export default RepliedMessagePreview;
