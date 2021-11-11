import React from 'react';

import Label, { LabelTypography, LabelColors } from '../Label';
import Icon, { IconTypes, IconColors } from '../Icon';
import IconButton from '../IconButton';

import generateColorFromString from '../MessageContent/utils';
import { getClassName } from '../../../utils';
import { getFileType } from '../../utils';

import './index.scss';

export type RepliedFileMessageItemBodyProps = {
  body: string;
  isByMe: boolean;
  mimeType: string;
  nickname: string;
  withCancelButton?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function RepliedTextMessageItemBody({
  body,
  isByMe,
  mimeType,
  nickname,
  withCancelButton = false,
  onCancel,
  onClick,
}: RepliedFileMessageItemBodyProps): JSX.Element {
  return (
    <div
      className={getClassName([
        'rogu-replied-file-message-item-body',
        isByMe
          ? 'rogu-replied-file-message-item-body--outgoing'
          : 'rogu-replied-file-message-item-body--incoming',
      ])}
      role="button"
      tabIndex={0}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
    >
      <div className="rogu-replied-file-message-item-body__content">
        <Icon
          className={'rogu-replied-file-message-item-body__icon'}
          type={
            {
              WORD: IconTypes.ROGU_FILE_WORD,
              EXCEL: IconTypes.ROGU_FILE_EXCEL,
              POWERPOINT: IconTypes.ROGU_FILE_POWERPOINT,
              PDF: IconTypes.ROGU_FILE_PDF,
              OTHERS: IconTypes.ROGU_FILE_OTHERS,
            }[getFileType(mimeType)]
          }
          fillColor={IconColors.PRIMARY}
          width="28px"
          height="28px"
        />
        <div>
          <Label
            className="rogu-replied-file-message-item-body__content__nickname"
            color={LabelColors.ONBACKGROUND_2}
            style={{
              color: generateColorFromString(nickname || ''),
            }}
            type={LabelTypography.CAPTION_1}
          >
            {nickname}
          </Label>
          <Label
            className="rogu-replied-file-message-item-body__content__message"
            color={LabelColors.ONBACKGROUND_1}
            type={LabelTypography.BODY_3}
          >
            {body}
          </Label>
        </div>
      </div>

      {withCancelButton && (
        <IconButton
          className="rogu-replied-file-message-item-body__cancel"
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
