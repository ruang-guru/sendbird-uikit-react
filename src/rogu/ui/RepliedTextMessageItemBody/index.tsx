import React from 'react';

import Label, { LabelTypography, LabelColors } from '../Label';
import Icon, { IconTypes, IconColors } from '../Icon';
import IconButton from '../IconButton';

import generateColorFromString from '../MessageContent/utils';
import { getClassName } from '../../../utils';

import './index.scss';

export type RepliedTextMessageItemBodyProps = {
  content: string;
  isByMe: boolean;
  nickname: string;
  withCancelButton?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function RepliedTextMessageItemBody({
  content,
  isByMe,
  nickname,
  withCancelButton = false,
  onCancel,
  onClick,
}: RepliedTextMessageItemBodyProps): JSX.Element {
  return (
    <div
      className={getClassName([
        'rogu-replied-text-message-item-body',
        isByMe
          ? 'rogu-replied-text-message-item-body--outgoing'
          : 'rogu-replied-text-message-item-body--incoming',
      ])}
      role="button"
      tabIndex={0}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
    >
      <div className="rogu-replied-text-message-item-body__content">
        <Label
          color={LabelColors.ONBACKGROUND_2}
          style={{
            color: generateColorFromString(nickname || ''),
          }}
          type={LabelTypography.CAPTION_1}
        >
          {nickname}
        </Label>
        <Label
          className="rogu-replied-text-message-item-body__content__message"
          color={LabelColors.ONBACKGROUND_1}
          type={LabelTypography.BODY_3}
        >
          {content}
        </Label>
      </div>

      {withCancelButton && (
        <IconButton
          className="rogu-replied-text-message-item-body__cancel"
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
  );
}
