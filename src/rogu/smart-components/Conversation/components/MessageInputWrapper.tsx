// Logic required to handle message input rendering

import React, { ReactElement, useContext, useEffect } from 'react';
import Sendbird, { UserMessage } from 'sendbird';

import { RenderGroupChannelMessageInputProps } from '../index';
import * as utils from '../utils.js';

import MessageInput from '../../../ui/MessageInput';
import { LocalizationContext } from '../../../../lib/LocalizationContext';


interface Props {
  channel: Sendbird.GroupChannel;
  user: Sendbird.User;
  isOnline: boolean;
  initialized: boolean;
  onSendMessage(): void;
  onFileUpload(): void;
  renderMessageInput(
    renderProps: RenderGroupChannelMessageInputProps
  ): JSX.Element;
};



const MessageInputWrapper = (
  {
    channel,
    user,
    onSendMessage,
    onFileUpload,
    renderMessageInput,
    isOnline,
    initialized,
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

  useEffect(() => {
    if(ref.current){
      console.log(ref.current.value);
    }
  }, [ref.current]);

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
      onStartTyping={() => {
        channel.startTyping();
      }}
      onSendMessage={onSendMessage}
      onFileUpload={onFileUpload}
    />
  );
};

export default React.forwardRef(MessageInputWrapper);
