import React from 'react';

import Label, { LabelTypography, LabelColors } from '../Label';
import Icon, { IconTypes, IconColors } from '../Icon';
import IconButton from '../IconButton';

import generateColorFromString from '../MessageContent/utils';
import { getClassName } from '../../../utils';
import ImageRenderer from '../ImageRenderer';

import './index.scss';

export type RepliedMediaMessageItemBodyProps = {
  content: string;
  isByMe: boolean;
  nickname: string;
  mediaUrl: string;
  withCancelButton?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function RepliedMediaMessageItemBody({
  content,
  isByMe,
  nickname,
  mediaUrl,
  withCancelButton = false,
  onCancel,
  onClick,
}: RepliedMediaMessageItemBodyProps): JSX.Element {
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
        {mediaUrl &&
          <ImageRenderer
            className="rogu-media-message-item-body__reply-image"
            url={mediaUrl}
            alt="placeholder"
          />
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
                type={IconTypes.ROGU_IMAGE}
                width="18px"
                height="18px"
              />
            }
            <Label
              className="rogu-media-message-item-body__reply-message"
              color={LabelColors.ONBACKGROUND_1}
              type={LabelTypography.BODY_3}
            >
              {content && content !== 'EMPTY_MESSAGE' ? content : 'Foto'}
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
