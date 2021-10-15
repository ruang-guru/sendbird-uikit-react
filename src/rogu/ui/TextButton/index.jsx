import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { changeColorToClassName, Colors } from '../../../utils/color';

export default function TextButton({
  className,
  color,
  disabled,
  underline,
  onClick,
  children,
}) {
  return (
    <div
      className={[
        ...(Array.isArray(className) ? className : [className]),
        changeColorToClassName(color),
        'rogu-text-button',
        underline ? 'rogu-text-button--no-underline' : '',
        disabled ? 'rogu-text-button--disabled' : '',
      ].join(' ')}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={onClick}
    >
      {children}
    </div>
  );
}

TextButton.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  color: PropTypes.string,
  disabled: PropTypes.bool,
  underline: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
};

TextButton.defaultProps = {
  className: '',
  color: Colors.ONBACKGROUND_1,
  disabled: false,
  underline: false,
  onClick: () => {},
};
