import React, { ReactElement, useContext } from 'react';
import { UserMessage } from 'sendbird';
import './index.scss';

import Label, { LabelTypography, LabelColors } from '../Label';
import { getClassName } from '../../../utils';
import { LocalizationContext } from '../../../lib/LocalizationContext';
import Icon, { IconTypes } from '../Icon';
import { convertCtaLinkToWebLink } from '../../utils';
import { isIOSWebView } from '../../../utils/utils';

interface Props {
  className?: string | Array<string>;
  message: UserMessage;
  isByMe?: boolean;
}

export default function MaterialMessageItemBody({
  className,
  message,
  isByMe,
}: Props): ReactElement {
  const { stringSet } = useContext(LocalizationContext);
  const materialData = JSON.parse(message?.data);

  const openMaterial = (): void => {
    const target = isIOSWebView() ? '_top' : '_blank';

    if (materialData?.ctaWeb && materialData?.ctaWeb.length > 0) {
      window.open(`${materialData?.ctaWeb}?from=chatroom`, target);
    } else {
      window.open(
        convertCtaLinkToWebLink(materialData?.cta, 'material'),
        target
      );
    }
  };
  return (
    <div
      className={getClassName([
        className,
        'rogu-material-message-item-body',
        isByMe
          ? 'rogu-material-message-item-body--outgoing'
          : 'rogu-material-message-item-body--incoming',
        message?.reactions?.length > 0 ? 'reactions' : '',
      ])}
    >
      <div
        className="rogu-material-message-item-body__container"
        onClick={openMaterial}
      >
        <Icon
          className="rogu-material-message-item-body__icon"
          type={IconTypes.ROGU_MATERIAL}
          width="30"
          height="30"
        />
        <div className="rogu-material-message-item-body__text-container">
          <Label
            className="rogu-material-message-item-body__text-title"
            color={LabelColors.ONBACKGROUND_1}
            type={LabelTypography.SUBTITLE_2}
          >
            {materialData?.title}
          </Label>
          <Label
            color={LabelColors.ONBACKGROUND_2}
            type={LabelTypography.BODY_2}
          >
            {stringSet.MATERIAL}
          </Label>
        </div>
      </div>
    </div>
  );
}
