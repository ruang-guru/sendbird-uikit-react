import React, { useContext } from 'react';
import { LocalizationContext } from '../../../../lib/LocalizationContext';
import Label, { LabelColors, LabelTypography } from '../../../ui/Label';
import './archived-banner.scss';

function ArchivedBanner() {
  const { stringSet } = useContext(LocalizationContext);
  return (
    <div className="rogu-archived-banner__container">
      <Label className="rogu-archived-banner__message" type={LabelTypography.CAPTION_1} color={LabelColors.ONBACKGROUND_5}>
        {stringSet.CLASS_ARCHIVED_BANNER}
      </Label>
    </div>
  );
}

export default ArchivedBanner;
