import React from 'react';
import PropTypes from 'prop-types';

import Label, { LabelTypography, LabelColors } from '../Label';
import { changeColorToClassName } from '../Label/utils';
import './index.scss';
import { isIOSWebView } from '../../../utils/utils';

const http = /https?:\/\//;

export default function LinkLabel({
  className, src, type, color, children,
}) {
  const url = http.test(src) ? src : `http://${src}`;
  const target = isIOSWebView() ? '_top' : '_blank';

  return (
    <a
      className={[
        ...(Array.isArray(className) ? className : [className]),
        'rogu-link-label',
        color ? changeColorToClassName(color) : '',
      ].join(' ')}
      href={url}
      target={target}
      rel="noopener noreferrer"
    >
      <Label className="rogu-link-label__label" type={type} color={color}>
        {children}
      </Label>
    </a>
  );
}

LinkLabel.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  src: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(LabelTypography)).isRequired,
  color: PropTypes.oneOf(Object.keys(LabelColors)).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

LinkLabel.defaultProps = {
  className: '',
};

export const LinkLabelTypography = LabelTypography;
export const LinkLabelColors = LabelColors;
