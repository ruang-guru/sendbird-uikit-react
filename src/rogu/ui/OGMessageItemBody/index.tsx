import React, { ReactElement } from 'react';
import { UserMessage } from 'sendbird';

import './index.scss';

import ImageRenderer from '../../../ui/ImageRenderer';

import Label, { LabelTypography, LabelColors } from '../Label';
import Icon, { IconTypes, IconColors } from '../Icon';
import IconButton from '../IconButton';
import ClampedTextMessageItemBody from '../ClampedMessageItemBody';
import RepliedMessageItemBody from '../RepliedMessageItemBody';

import { getClassName } from '../../../utils';

import {
  formatedStringToRepliedMessage,
  isReplyingMessage,
  metaArraysToRepliedMessage,
  RepliedMessageType,
} from '../../utils';

interface Props {
  className?: string | Array<string>;
  isByMe?: boolean;
  isOnPreview?: boolean;
  message: UserMessage;
  mouseHover?: boolean;
  onClickRepliedMessage?: (createdAt: number, messageId: number) => void;
  onClosePreview?: () => void;
}

export default function OGMessageItemBody({
  className,
  isByMe = false,
  isOnPreview = false,
  message,
  mouseHover = false,
  onClickRepliedMessage,
  onClosePreview,
}: Props): ReactElement {
  let messageBody = message.message;
  let repliedMessageBody = '';
  let repliedMessageCreatedAt = 0;
  let repliedMessageId = '';
  let repliedMessageMediaUrl = '';
  let repliedMessageMimeType = '*';
  let repliedMessageNickname = '';
  let repliedMessageType = RepliedMessageType.Text;

  const hasRepliedMessage = isReplyingMessage(message);

  if (hasRepliedMessage) {
    const {
      originalMessage,
      parentMessageBody,
      parentMessageNickname,
    } = formatedStringToRepliedMessage(messageBody);

    const repliedMessage = metaArraysToRepliedMessage(message.metaArrays);

    messageBody = originalMessage;
    repliedMessageBody = parentMessageBody;
    repliedMessageCreatedAt = repliedMessage.parentMessageCreatedAt;
    repliedMessageId = repliedMessage.parentMessageId;
    repliedMessageMediaUrl = repliedMessage.parentMessageMediaUrl;
    repliedMessageMimeType = repliedMessage.parentMessageMimeType;
    repliedMessageNickname = parentMessageNickname;
    repliedMessageType = repliedMessage.parentMessageType;
  }

  const handleScrollToRepliedMessage = () => {
    if (
      hasRepliedMessage &&
      onClickRepliedMessage &&
      typeof onClickRepliedMessage === 'function'
    ) {
      onClickRepliedMessage(
        Number(repliedMessageCreatedAt),
        Number(repliedMessageId)
      );
    }
  };

  const handleOpenOGUrl = (): void => {
    if (message?.ogMetaData?.url) window.open(message?.ogMetaData?.url);
  };

  return (
    <div
      className={getClassName([
        className,
        'rogu-og-message-item-body',
        isByMe ? 'rogu-og-message--outgoing' : 'rogu-og-message--incoming',
        isOnPreview ? 'rogu-og-message-item-body--preview' : '',
        mouseHover ? 'mouse-hover' : '',
        message?.reactions?.length > 0 ? 'rogu-og-message-reactions' : '',
      ])}
    >
      {/* Replied message */}
      {hasRepliedMessage && (
        <RepliedMessageItemBody
          body={repliedMessageBody}
          isByMe={isByMe}
          mimeType={repliedMessageMimeType}
          nickname={repliedMessageNickname}
          type={repliedMessageType}
          onClick={() => handleScrollToRepliedMessage()}
          mediaUrl={repliedMessageMediaUrl}
        />
      )}

      {/* OG preview */}
      <div className="rogu-og-message-item-body__og-wrapper">
        <div
          className="rogu-og-message-item-body__og-container"
          onClick={handleOpenOGUrl}
          role="button"
          tabIndex={0}
        >
          <div className="rogu-og-message-item-body__og-thumbnail">
            <ImageRenderer
              className="rogu-og-message-item-body__og-thumbnail__image"
              url={message?.ogMetaData?.defaultImage?.url || ''}
              alt={message?.ogMetaData?.defaultImage?.alt}
              width="60px"
              height="60px"
              defaultComponent={(
                <div className="rogu-og-message-item-body__og-thumbnail__place-holder">
                  <Icon
                    className="rogu-og-message-item-body__og-thumbnail__place-holder__icon"
                    type={IconTypes.THUMBNAIL_NONE}
                    width="60px"
                    height="60px"
                  />
                </div>
              )}
            />
          </div>
          <div className="rogu-og-message-item-body__description">
            {message?.ogMetaData?.title && (
              <Label
                className="rogu-og-message-item-body__description__title"
                type={LabelTypography.SUBTITLE_2}
                color={LabelColors.ONBACKGROUND_1}
              >
                {message.ogMetaData.title}
              </Label>
            )}
            {message?.ogMetaData?.description && (
              <Label
                className="rogu-og-message-item-body__description__description"
                type={LabelTypography.BODY_2}
                color={LabelColors.ONBACKGROUND_1}
              >
                {message.ogMetaData.description}
              </Label>
            )}
            {message?.ogMetaData?.url && (
              <Label
                className="rogu-og-message-item-body__description__url"
                type={LabelTypography.CAPTION_3}
                color={LabelColors.ONBACKGROUND_2}
              >
                {message.ogMetaData.url}
              </Label>
            )}
          </div>
        </div>

        {isOnPreview && (
          <IconButton
            className="sendbird-chat-header__right__search"
            width="32px"
            height="32px"
            onClick={onClosePreview}
          >
            <Icon
              type={IconTypes.CLOSE}
              fillColor={IconColors.ON_BACKGROUND_1}
              width="24px"
              height="24px"
            />
          </IconButton>
        )}
      </div>

      {/* Message body */}
      <ClampedTextMessageItemBody
        className={className}
        isByMe={isByMe}
        content={messageBody}
      />
    </div >
  );
}
