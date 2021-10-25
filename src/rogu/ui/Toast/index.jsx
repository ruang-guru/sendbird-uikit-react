import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import './index.scss';
import Label, { LabelColors, LabelTypography } from '../Label';

export default function Toast({ message }) {
  return createPortal(
    (
      <div className="rogu-fileviewer__toast__message show">
        <Label
          type={LabelTypography.BODY_3}
          color={LabelColors.ONBACKGROUND_5}
        >
          {message}
        </Label>
      </div>
    ),
    document.getElementById('rogu-toast-root'),
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
};
