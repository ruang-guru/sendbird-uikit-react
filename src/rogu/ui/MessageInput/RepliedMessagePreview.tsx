/**
 * TODO
 * [x] Handle reply text message
 * [x] Handle reply file message
 * [ ] Handle reply assignment message
 * [ ] Handle reply material message
 * [x] Handle reply image message
 * [x] Handle reply video message
 * [x] Handle reply replied message
 */

import React from 'react';
import { FileMessage, UserMessage } from 'sendbird';

import RepliedAssignmentMessageItemBody from '../RepliedAssignmentMessageItemBody';
import RepliedMaterialMessageItemBody from '../RepliedMaterialMessageItemBody';
import RepliedFileMessageItemBody from '../RepliedFileMessageItemBody';
import RepliedMediaMessageItemBody from '../RepliedMediaMessageItemBody';
import RepliedTextMessageItemBody from '../RepliedTextMessageItemBody';

import {
  getUIKitMessageType,
  getUIKitMessageTypes,
  isOGMessage,
  isTextMessage,
} from '../../../utils';
import {
  formatedStringToRepliedMessage,
  isAssignmentMessage,
  isFileMessage,
  isMaterialMessage,
  isReplyingMessage,
  isThumbnailMessage,
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
  const messageTypes = getUIKitMessageTypes();

  const nickname = message.sender?.nickname;
  let body = (message as UserMessage).message;
  let mimeType = '*';

  if (isFileMessage(message as FileMessage)) {
    body = (message as FileMessage).name;
    mimeType = (message as FileMessage).type;
  } else if (
    isAssignmentMessage(message.customType) ||
    isMaterialMessage(message.customType)
  ) {
    const data = JSON.parse(message?.data);
    body = data?.title;
  }

  const mediaUrl = isThumbnailMessage(message as FileMessage)
    ? (message as FileMessage).url
    : '';

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

      {isThumbnailMessage(message as FileMessage) && (
        <RepliedMediaMessageItemBody
          body={body}
          isByMe={false} // always false to match the styling
          mimeType={mimeType}
          nickname={nickname}
          withCancelButton
          onClick={onClick}
          onCancel={onCancel}
          mediaUrl={mediaUrl}
        />
      )}

      {getUIKitMessageType(message as FileMessage) === messageTypes.FILE && (
        <RepliedFileMessageItemBody
          body={body}
          isByMe={false} // always false to match the styling
          mimeType={mimeType}
          nickname={nickname}
          withCancelButton
          onClick={onClick}
          onCancel={onCancel}
        />
      )}

      {isAssignmentMessage(message.customType) && (
        <RepliedAssignmentMessageItemBody
          body={body}
          isByMe={false} // always false to match the styling
          nickname={nickname}
          withCancelButton
          onClick={onClick}
          onCancel={onCancel}
        />
      )}

      {isMaterialMessage(message.customType) && (
        <RepliedMaterialMessageItemBody
          body={body}
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
