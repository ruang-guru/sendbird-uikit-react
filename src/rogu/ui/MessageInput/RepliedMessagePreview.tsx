/**
 * TODO
 * [x] Handle reply text message
 * [ ] Handle reply file message
 * [ ] Handle reply assignment message
 * [ ] Handle reply material message
 * [ ] Handle reply image message
 * [ ] Handle reply video message
 * [ ] Handle reply replied message
 */

import React from 'react';
import { FileMessage, UserMessage } from 'sendbird';

import RepliedTextMessageItemBody from '../RepliedTextMessageItemBody';

import { isOGMessage, isTextMessage } from '../../../utils';

export type RepliedMessagePreviewProps = {
  className?: string;
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
  return (
    <div className={className}>
      {(isTextMessage(message as UserMessage) ||
        isOGMessage(message as UserMessage)) && (
        <RepliedTextMessageItemBody
          content={(message as UserMessage).message}
          isByMe={false}
          nickname={message.sender?.nickname}
          withCancelButton
          onClick={onClick}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}

export default RepliedMessagePreview;
