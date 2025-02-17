import React, { ReactElement } from 'react';
import { FileMessage } from 'sendbird';
import './index.scss';

import Icon, { IconTypes, IconColors } from '../Icon';
import ImageRenderer from '../ImageRenderer';
import RepliedMessageItemBody from '../RepliedMessageItemBody';
import ClampedMessageItemBody from '../ClampedMessageItemBody';
import {
  isReplyingMessage,
  isVideo,
  metaArraysToRepliedMessage,
} from '../../utils';
import { getClassName, isGifMessage } from '../../../utils';

interface Props {
  className?: string | Array<string>;
  message: FileMessage;
  isByMe?: boolean;
  mouseHover?: boolean;
  showFileViewer?: (bool: boolean) => void;
  isClickable: boolean;
  onClickRepliedMessage?: (createdAt: number, messageId: number) => void;
}

export default function ThumbnailMessageItemBody({
  className,
  message,
  isByMe = false,
  mouseHover = false,
  showFileViewer,
  isClickable = true,
  onClickRepliedMessage,
}: Props): ReactElement {
  const { thumbnails = [] } = message;
  const thumbnailUrl: string = thumbnails.length > 0 ? thumbnails[0]?.url : '';

  const hasRepliedMessage = isReplyingMessage(message);

  const renderRepliedMessage = () => {
    const {
      parentMessageBody,
      parentMessageCreatedAt,
      parentMessageId,
      parentMessageMediaUrl,
      parentMessageMimeType,
      parentMessageNickname,
      parentMessageType,
    } = metaArraysToRepliedMessage(message.metaArrays);

    return (
      <RepliedMessageItemBody
        body={parentMessageBody}
        isByMe={isByMe}
        mediaUrl={parentMessageMediaUrl}
        mimeType={parentMessageMimeType}
        nickname={parentMessageNickname}
        type={parentMessageType}
        onClick={() => {
          if (
            onClickRepliedMessage &&
            typeof onClickRepliedMessage === 'function'
          ) {
            onClickRepliedMessage(
              Number(parentMessageCreatedAt),
              Number(parentMessageId)
            );
          }
        }}
      />
    );
  };

  return (
    <>
      {hasRepliedMessage && renderRepliedMessage()}

      <div
        className={getClassName([
          className,
          'rogu-thumbnail-message-item-body',
          isByMe ? 'outgoing' : 'incoming',
          mouseHover ? 'mouse-hover' : '',
          message?.reactions?.length > 0 ? 'reactions' : '',
        ])}
        onClick={() => {
          if (isClickable) showFileViewer(true);
        }}
      >
        <ImageRenderer
          className="rogu-thumbnail-message-item-body__thumbnail"
          url={thumbnailUrl || message?.url}
          alt={message?.type}
          width="100%"
          height="270px"
          placeHolder={(style) => (
            <div
              className="rogu-thumbnail-message-item-body__placeholder"
              style={style}
            >
              <div className="rogu-thumbnail-message-item-body__placeholder__icon">
                <Icon
                  type={
                    isVideo(message.type) ? IconTypes.PLAY : IconTypes.PHOTO
                  }
                  fillColor={IconColors.ON_BACKGROUND_2}
                  width="34px"
                  height="34px"
                />
              </div>
            </div>
          )}
        />
        {isVideo(message.type) && !thumbnailUrl && (
          <video className="rogu-thumbnail-message-item-body__video">
            <source src={message?.url} type={message?.type} />
          </video>
        )}
        <div className="rogu-thumbnail-message-item-body__image-cover" />
        {(isVideo(message.type) || isGifMessage(message)) && (
          <div className="rogu-thumbnail-message-item-body__icon-wrapper">
            <div className="rogu-thumbnail-message-item-body__icon-wrapper__icon">
              <Icon
                type={isVideo(message.type) ? IconTypes.PLAY : IconTypes.GIF}
                fillColor={IconColors.ON_BACKGROUND_2}
                width="34px"
                height="34px"
              />
            </div>
          </div>
        )}
      </div>

      {message.name && message.name !== 'EMPTY_MESSAGE' && (
        <ClampedMessageItemBody
          isByMe={isByMe}
          mode="thumbnailCaption"
          content={message.name}
        />
      )}
    </>
  );
}
