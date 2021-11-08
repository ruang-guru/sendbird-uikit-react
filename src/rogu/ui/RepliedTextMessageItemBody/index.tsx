import React from 'react';

import Label, { LabelTypography, LabelColors } from '../Label';

import generateColorFromString from '../MessageContent/utils';
import { getClassName } from '../../../utils';

import './index.scss';

export type RepliedTextMessageItemBodyProps = {
  isByMe: boolean;
  message: string;
  nickname: string;
  onClick: () => void;
};

export default function RepliedTextMessageItemBody({
  isByMe,
  message,
  nickname,
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
      onClick={onClick}
    >
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
        className="rogu-replied-text-message-item-body__reply-message"
        color={LabelColors.ONBACKGROUND_1}
        type={LabelTypography.BODY_3}
      >
        {message}
      </Label>
    </div>
  );
}
