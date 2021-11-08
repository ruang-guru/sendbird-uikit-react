import React from 'react';

import Label, { LabelTypography, LabelColors } from '../Label';

import generateColorFromString from '../MessageContent/utils';
import { getClassName } from '../../../utils';

import './index.scss';

export type RepliedTextMessageItemBodyProps = {
  content: string;
  isByMe: boolean;
  nickname: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function RepliedTextMessageItemBody({
  content,
  isByMe,
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
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
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
        {content}
      </Label>
    </div>
  );
}
