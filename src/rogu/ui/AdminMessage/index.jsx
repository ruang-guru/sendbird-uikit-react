import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import Label, { LabelColors, LabelTypography } from '../Label';

export default function AdminMessage({
  className,
  message,
}) {
  if (!(message.isAdminMessage || message.messageType) || !message.isAdminMessage() || message.messageType !== 'admin') {
    return null;
  }
  return (
    <div
      className={[
        ...(Array.isArray(className) ? className : [className]),
        'rogu-admin-message',
      ].join(' ')}
    >
      <div className="rogu-admin-message__container">
        <Label
          className="rogu-admin-message__text"
          type={LabelTypography.CAPTION_2}
          color={LabelColors.ONBACKGROUND_1}
        >
          {message.message}
        </Label>
      </div>
    </div>
  );
}

AdminMessage.propTypes = {
  message: PropTypes.shape({
    message: PropTypes.string,
    messageType: PropTypes.string,
    isAdminMessage: PropTypes.func,
  }),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

AdminMessage.defaultProps = {
  message: {},
  className: '',
};
