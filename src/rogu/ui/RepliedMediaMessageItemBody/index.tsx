import React, { useContext } from 'react';

import Label, { LabelTypography, LabelColors } from '../Label';
import Icon, { IconTypes, IconColors } from '../Icon';
import IconButton from '../IconButton';

import generateColorFromString from '../MessageContent/utils';
import { getClassName } from '../../../utils';
import ImageRenderer from '../ImageRenderer';

import './index.scss';
import { isImage, isVideo } from '../../utils';
import { LocalizationContext } from '../../../lib/LocalizationContext';

export type RepliedMediaMessageItemBodyProps = {
  body: string;
  isByMe: boolean;
  mimeType: string;
  nickname: string;
  mediaUrl: string;
  withCancelButton?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function RepliedMediaMessageItemBody({
  body,
  isByMe,
  mimeType,
  nickname,
  mediaUrl,
  withCancelButton = false,
  onCancel,
  onClick,
}: RepliedMediaMessageItemBodyProps): JSX.Element {
  const { stringSet } = useContext(LocalizationContext);

  let content = '';

  if (body && body !== 'EMPTY_MESSAGE' && !isVideo(mimeType)) content = body;
  else if (isImage(mimeType)) content = stringSet.LABEL__IMAGE;
  else if (isVideo(mimeType)) content = stringSet.LABEL__VIDEO;

  return (
    <div
      className={getClassName([
        'rogu-replied-media-message-item-body',
        isByMe
          ? 'rogu-replied-media-message-item-body--outgoing'
          : 'rogu-replied-media-message-item-body--incoming',
      ])}
      role="button"
      tabIndex={0}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
    >
      <div className="rogu-media-message-item-body__metadata">
        {mediaUrl && isImage(mimeType) &&
          <ImageRenderer
            className="rogu-media-message-item-body__reply-image"
            url={mediaUrl}
            alt="placeholder"
          />
        }
        {mediaUrl && isVideo(mimeType) &&
          <video className="rogu-media-message-item-body__reply-image">
            <source src={mediaUrl} type={mimeType} />
          </video>
        }
        <div>
          <Label
            className="rogu-message-content__sender-name"
            color={LabelColors.ONBACKGROUND_2}
            style={{
              color: generateColorFromString(
                nickname || ''
              ),
            }}
            type={LabelTypography.CAPTION_1}
          >
            {nickname}
          </Label>
          <div className="rogu-media-message-item-body__caption-container">
            {mediaUrl &&
              <Icon
                className="rogu-media-message-item-body__caption-icon"
                type={isImage(mimeType) ? IconTypes.ROGU_IMAGE : IconTypes.ROGU_VIDEO}
                width="18px"
                height="18px"
              />
            }
            <Label
              className="rogu-media-message-item-body__reply-message"
              color={LabelColors.ONBACKGROUND_1}
              type={LabelTypography.BODY_3}
            >
              {content}
            </Label>
          </div>
        </div>
      </div>
      {withCancelButton && (
        <IconButton
          className="rogu-replied-media-message-item-body__cancel"
          width="24px"
          height="24px"
          onClick={(e) => {
            if (onCancel && typeof onCancel === 'function') {
              onCancel(e);
            }
          }}
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
  )
};
