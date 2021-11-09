// Logic required to handle message input rendering

import React, { useContext } from 'react';
import Sendbird, { FileMessage, UserMessage } from 'sendbird';

import { RenderGroupChannelMessageInputProps } from '../index';
import * as utils from '../utils.js';

import MessageInput from '../../../ui/MessageInput';
import { LocalizationContext } from '../../../../lib/LocalizationContext';

interface Props {
  channel: Sendbird.GroupChannel;
  user: Sendbird.User;
  isOnline: boolean;
  initialized: boolean;
  repliedMessage?: FileMessage | UserMessage;
  onSendMessage(): void;
  onFileUpload(): void;
  renderMessageInput(
    renderProps: RenderGroupChannelMessageInputProps
  ): JSX.Element;
  onClickRepliedMessage(): void;
  onCancelRepliedMessage(): void;
}

const MessageInputWrapper = (
  {
    channel,
    user,
    repliedMessage,
    onSendMessage,
    onFileUpload,
    renderMessageInput,
    isOnline,
    initialized,
    onClickRepliedMessage,
    onCancelRepliedMessage,
  }: Props,
  ref: React.RefObject<HTMLInputElement>
): JSX.Element => {
  const { stringSet } = useContext(LocalizationContext);
  const disabled =
    !initialized ||
    utils.isDisabledBecauseFrozen(channel) ||
    utils.isDisabledBecauseMuted(channel) ||
    !isOnline;

  const isOperator = utils.isOperator(channel);
  const { isBroadcast } = channel;

  // custom message
  if (renderMessageInput) {
    return renderMessageInput({ channel, user, disabled });
  }

  // broadcast channel + not operator
  if (isBroadcast && !isOperator) {
    return null;
  }

  // other conditions
  return (
    <MessageInput
      placeholder={
        (utils.isDisabledBecauseFrozen(channel) &&
          stringSet.CHANNEL__MESSAGE_INPUT__PLACE_HOLDER__DISABLED) ||
        (utils.isDisabledBecauseMuted(channel) &&
          stringSet.CHANNEL__MESSAGE_INPUT__PLACE_HOLDER__MUTED)
      }
      nickname={user.nickname || ''}
      profileUrl={user.profileUrl || ''}
      ref={ref}
      disabled={disabled}
      repliedMessage={repliedMessage}
      onStartTyping={() => {
        channel.startTyping();
      }}
      onSendMessage={onSendMessage}
      onFileUpload={onFileUpload}
      onCancelRepliedMessage={onCancelRepliedMessage}
      onClickRepliedMessage={onClickRepliedMessage}
    />
  );
};

export default React.forwardRef(MessageInputWrapper);
