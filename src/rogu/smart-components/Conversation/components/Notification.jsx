import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import './notification.scss';
import { LocalizationContext } from '../../../../lib/LocalizationContext';
import Label, { LabelTypography, LabelColors } from '../../../../ui/Label';
import Icon, { IconTypes, IconColors } from '../../../../ui/Icon';

export default function Notification({
  count,
  time,
  onClick,
}) {
  const { stringSet } = useContext(LocalizationContext);
  // ex: time = '13.46 14 December 2021', then split into array
  const timeArray = time.split(' ');
  // add string 'on' after first element of timeArray
  // before: timeArray = ['13.46', '14', 'December', '2021']
  timeArray.splice(1, 0, stringSet.CHANNEL__MESSAGE_LIST__NOTIFICATION__ON);
  // after: timeArray = ['13.46', 'on', '14', 'December', '2021']
  return (
    // eslint-disable-next-line
    <div className="rogu-notification" onClick={onClick}>
      <Label className="rogu-notification__text" color={LabelColors.ONCONTENT_1} type={LabelTypography.CAPTION_2}>
        {`${count} `}
        {stringSet.CHANNEL__MESSAGE_LIST__NOTIFICATION__NEW_MESSAGE}
        {` ${timeArray.join(' ')}`}
      </Label>
      <Icon
        width="24px"
        height="24px"
        type={IconTypes.CHEVRON_DOWN}
        fillColor={IconColors.CONTENT}
      />
    </div>
  );
}

Notification.propTypes = {
  count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  time: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Notification.defaultProps = {
  count: 0,
  time: '',
};
