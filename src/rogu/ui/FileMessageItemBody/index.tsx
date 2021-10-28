import React, { ReactElement } from 'react';
import { FileMessage } from 'sendbird';
import './index.scss';

import Label, { LabelTypography, LabelColors } from '../Label';
import Icon, { IconTypes, IconColors } from '../Icon';
import { getClassName } from '../../../utils';
import { formatBytes, getFileType, getMimeExtension } from '../../utils';

interface Props {
  className?: string | Array<string>;
  message: FileMessage;
  isByMe?: boolean;
}

export default function FileMessageItemBody({
  className,
  message,
  isByMe = false,
}: Props): ReactElement {
  return (
    <a
      className={getClassName([
        className,
        'rogu-file-message-item-body',
        isByMe
          ? 'rogu-file-message-item-body--outgoing'
          : 'rogu-file-message-item-body--incoming',
      ])}
      href={message.plainUrl}
      target="_blank" rel="noreferrer"
    >
      <Icon
        className={'rogu-file-message-item-body__icon'}
        type={
          {
            WORD: IconTypes.ROGU_FILE_WORD,
            EXCEL: IconTypes.ROGU_FILE_EXCEL,
            POWERPOINT: IconTypes.ROGU_FILE_POWERPOINT,
            PDF: IconTypes.ROGU_FILE_PDF,
            OTHERS: IconTypes.ROGU_FILE_OTHERS,
          }[getFileType(message?.type)]
        }
        fillColor={IconColors.PRIMARY}
        width="28px"
        height="28px"
      />
      <div className="rogu-file-message-item-body__content">
        {message.name && (
          <Label
            className="rogu-file-message-item-body__name"
            color={LabelColors.ONBACKGROUND_1}
            type={LabelTypography.SUBTITLE_2}
          >
            {message.name}
          </Label>
        )}

        <div className="rogu-file-message-item-body__meta">
          {message.size && (
            <Label
              color={LabelColors.ONBACKGROUND_2}
              type={LabelTypography.BODY_2}
            >
              {`${formatBytes(message.size)} · `}
            </Label>
          )}
          <Label
            color={LabelColors.ONBACKGROUND_2}
            type={LabelTypography.BODY_2}
          >
            {getMimeExtension(message.type) || 'Others'}
          </Label>
        </div>
      </div>
    </a>
  );
}
