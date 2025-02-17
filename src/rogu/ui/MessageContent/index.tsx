/**
 * TODO:
 *
 * [x] Add created at to the metaarray
 * [ ] Handle click, scroll to the replied message
 * [ ] Add highlight upon click
 */

import React, { ReactElement, useRef, useContext } from 'react';
import { GroupChannel, AdminMessage, UserMessage, FileMessage } from 'sendbird';
import Label, { LabelTypography, LabelColors } from '../Label';
import MessageStatus from '../MessageStatus';
import OGMessageItemBody from '../OGMessageItemBody';
import FileMessageItemBody from '../FileMessageItemBody';
import ThumbnailMessageItemBody from '../ThumbnailMessageItemBody';
import TextMessageItemBody from '../TextMessageItemBody';

import Avatar from '../../../ui/Avatar';
import ClientAdminMessage from '../AdminMessage';
import UnknownMessageItemBody from '../../../ui/UnknownMessageItemBody'; // TODO: refine this component

import { LocalizationContext } from '../../../lib/LocalizationContext';
import { OutgoingMessageStates } from '../../../utils/index';

import {
  getClassName,
  getUIKitMessageTypes,
  getUIKitMessageType,
  isTextMessage,
  isOGMessage,
  isMessageSentByMe,
  isMessageSentByOperator,
  getOutgoingMessageState,
  getSenderName,
  getMessageCreatedAt,
  isSentMessage,
  isPendingMessage,
  CoreMessageType,
} from '../../../utils';

import {
  isAssignmentMessage,
  isMaterialMessage,
  isThumbnailMessage,
} from '../../utils';
import AssignmentMessageItemBody from '../AssignmentMessageItemBody';
import MaterialMessageItemBody from '../MaterialMessageItemBody';
import { generateColorFromString } from './utils';
import './index.scss';

import MessageItemMenu from '../MessageItemMenu';

interface Props {
  chainBottom?: boolean;
  chainTop?: boolean;
  channel: GroupChannel;
  className?: string | Array<string>;
  message: AdminMessage | UserMessage | FileMessage;
  nicknamesMap?: Map<string, string>;
  userId: string;
  useReplying?: boolean;
  resendMessage?: (message: UserMessage | FileMessage) => void;
  scrollToMessage?: (createdAt: number, messageId: number) => void;
  showEdit?: (bool: boolean) => void;
  showFileViewer?: (bool: boolean) => void;
  showRemove?: (bool: boolean) => void;
  showReply?: (bool: boolean) => void;
  toggleReaction?: (
    message: UserMessage | FileMessage,
    reactionKey: string,
    isReacted: boolean
  ) => void;
  disabled?: boolean;
}

export default function MessageContent({
  channel,
  chainBottom = false,
  chainTop = false,
  className,
  message,
  // nicknamesMap,
  userId,
  // useReaction = false,
  // useReplying,
  scrollToMessage,
  showEdit,
  showFileViewer,
  showRemove,
  showReply,
  resendMessage,
  disabled = false,
}: // showRemove,
// toggleReaction,
Props): ReactElement {
  const { stringSet } = useContext(LocalizationContext);
  const messageTypes = getUIKitMessageTypes();
  const avatarRef = useRef(null);

  const isByMe: boolean =
    isPendingMessage(channel, message as UserMessage | FileMessage) ||
    !isSentMessage(channel, message as UserMessage | FileMessage) ||
    isMessageSentByMe(userId, message as UserMessage | FileMessage);

  const isOperatorMessage: boolean = isMessageSentByOperator(
    message as CoreMessageType
  );

  const isByMeClassName = isByMe
    ? 'rogu-message-content--outgoing'
    : 'rogu-message-content--incoming';
  const chainBottomClassName = chainBottom
    ? 'rogu-message-content--chain-bottom'
    : '';
  const chainTopClassName = chainTop ? 'rogu-message-content--chain-top' : '';

  if (message?.isAdminMessage?.() || message?.messageType === 'admin') {
    return <ClientAdminMessage message={message} />;
  }

  return (
    <div
      className={getClassName([
        className,
        'rogu-message-content',
        isByMeClassName,
        chainBottomClassName,
        chainTopClassName,
      ])}
    >
      {/* Profile picture */}
      {!isByMe && !chainTop && (
        <Avatar
          className="rogu-message-content__avatar"
          src={message?.sender?.profileUrl || ''}
          ref={avatarRef}
          height="32px"
          width="32px"
        />
      )}

      <div className="rogu-message-content__content">
        {/* Bubble wrapper */}
        <div className="rogu-message-content__bubble">
          <div className="rogu-message-content__bubble__header">
            {!isByMe && !chainTop && (
              <>
                <div className="rogu-message-content__id-container">
                  {/* Sender's name */}
                  <Label
                    className="rogu-message-content__sender-name"
                    color={LabelColors.ONBACKGROUND_2}
                    style={{
                      color: generateColorFromString(
                        message?.sender?.nickname || ''
                      ),
                    }}
                    type={LabelTypography.CAPTION_1}
                  >
                    {getSenderName(message)}
                  </Label>
                  {/* Teacher label */}
                  {isOperatorMessage && !chainTop && (
                    <Label
                      className="rogu-message-content__operator-label"
                      type={LabelTypography.CAPTION_3}
                    >
                      {stringSet.LABEL__OPERATOR}
                    </Label>
                  )}
                </div>

                {!channel.isFrozen && (
                  <MessageItemMenu
                    className="rogu-message-content__menu"
                    channel={channel}
                    message={message as UserMessage | FileMessage}
                    isByMe={isByMe}
                    disabled={disabled}
                    showEdit={showEdit}
                    showRemove={showRemove}
                    resendMessage={resendMessage}
                    showFileViewer={showFileViewer}
                    showReply={showReply}
                  />
                )}
              </>
            )}
          </div>
          <div className="rogu-message-content__bubble__body">
            <div className="rogu-message-content__bubble__body__inner">
              {/* Message content */}
              {isTextMessage(message as UserMessage) && (
                <TextMessageItemBody
                  isByMe={isByMe}
                  message={message as UserMessage}
                  onClickRepliedMessage={scrollToMessage}
                />
              )}
              {isOGMessage(message as UserMessage) && (
                <OGMessageItemBody
                  message={message as UserMessage}
                  isByMe={isByMe}
                  onClickRepliedMessage={scrollToMessage}
                />
              )}
              {isAssignmentMessage(message.customType) && (
                <AssignmentMessageItemBody
                  message={message as UserMessage}
                  isByMe={isByMe}
                />
              )}
              {isMaterialMessage(message.customType) && (
                <MaterialMessageItemBody
                  message={message as UserMessage}
                  isByMe={isByMe}
                />
              )}
              {isThumbnailMessage(message as FileMessage) && (
                <ThumbnailMessageItemBody
                  message={message as FileMessage}
                  isByMe={isByMe}
                  showFileViewer={showFileViewer}
                  isClickable={
                    getOutgoingMessageState(channel, message) !==
                    OutgoingMessageStates.PENDING
                  }
                  onClickRepliedMessage={scrollToMessage}
                />
              )}
              {!isThumbnailMessage(message as FileMessage) &&
                getUIKitMessageType(message as FileMessage) ===
                  messageTypes.FILE && (
                  <FileMessageItemBody
                    message={message as FileMessage}
                    isByMe={isByMe}
                  />
                )}
              {getUIKitMessageType(message as FileMessage) ===
                messageTypes.UNKNOWN && (
                <UnknownMessageItemBody message={message} isByMe={isByMe} />
              )}
            </div>
            {((!isByMe && chainTop) || isByMe) && !channel.isFrozen && (
              <MessageItemMenu
                className="rogu-message-content__menu"
                channel={channel}
                message={message as UserMessage | FileMessage}
                isByMe={isByMe}
                disabled={disabled}
                showEdit={showEdit}
                showRemove={showRemove}
                resendMessage={resendMessage}
                showFileViewer={showFileViewer}
                showReply={showReply}
              />
            )}
          </div>
        </div>

        {/* Message status */}
        {!chainBottom && (
          <div className={'rogu-message-content__misc'}>
            {isByMe ? (
              <MessageStatus
                message={message}
                status={getOutgoingMessageState(channel, message)}
              />
            ) : (
              <Label
                className={'rogu-message-content__created-at'}
                type={LabelTypography.CAPTION_3}
                color={LabelColors.ONBACKGROUND_2}
              >
                {getMessageCreatedAt(message)}
              </Label>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
