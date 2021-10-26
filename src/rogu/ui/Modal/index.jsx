import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import './index.scss';

import { LocalizationContext } from '../../../lib/LocalizationContext';
import { MODAL_ROOT } from '../../../hooks/useModal/ModalRoot';
import IconButton from '../IconButton';
import Icon, { IconTypes, IconColors } from '../Icon';
import Button, { ButtonTypes } from '../Button';
import Label, { LabelTypography, LabelColors } from '../Label';

export const ModalHeader = ({ titleText }) => (
  <div className="rogu-modal__header">
    <Label className="rogu-modal__title" type={LabelTypography.H_3} color={LabelColors.ONBACKGROUND_1}>
      {titleText}
    </Label>
  </div>
);
ModalHeader.propTypes = {
  titleText: PropTypes.string.isRequired,
};

export const ModalBody = ({ children }) => (
  <div className="rogu-modal__body">{children}</div>
);
ModalBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element.isRequired,
    PropTypes.arrayOf(PropTypes.element.isRequired),
  ]),
};
ModalBody.defaultProps = {
  children: null,
};

export const ModalFooter = ({
  onSubmit,
  onCancel,
  disabled = false,
  submitText,
}) => {
  const { stringSet } = useContext(LocalizationContext);
  return (
    <div className="rogu-modal__footer">
      <Button className="rogu-modal-button" type={ButtonTypes.SECONDARY} disabled={disabled} onClick={onSubmit}>
        {submitText}
      </Button>
      <Button className="rogu-modal-button" type={ButtonTypes.PRIMARY} onClick={onCancel}>
        {stringSet.BUTTON__CANCEL}
      </Button>
    </div>
  );
};

ModalFooter.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
ModalFooter.defaultProps = {
  disabled: false,
};

function Modal(props) {
  const {
    children,
    onCancel,
    onSubmit,
    disabled,
    submitText,
    titleText,
    hideFooter,
    isWithClose,
  } = props;
  return createPortal((
    <div className="rogu-modal">
      <div className="rogu-modal__content">
        <ModalHeader titleText={titleText} />
        <ModalBody>{children}</ModalBody>
        {
          !hideFooter && (
            <ModalFooter
              disabled={disabled}
              onCancel={onCancel}
              onSubmit={onSubmit}
              submitText={submitText}
            />
          )
        }
        {isWithClose && (
          <div className="rogu-modal__close">
            <IconButton
              width="32px"
              height="32px"
              onClick={onCancel}
            >
              <Icon
                type={IconTypes.ROGU_CLOSE}
                fillColor={IconColors.DEFAULT}
                width="24px"
                height="24px"
              />
            </IconButton>
          </div>
        )}
      </div>
      <div className="rogu-modal__backdrop" />
    </div>
  ), document.getElementById(MODAL_ROOT));
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  hideFooter: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  isWithClose: PropTypes.bool,
};
Modal.defaultProps = {
  children: null,
  hideFooter: false,
  disabled: false,
  type: ButtonTypes.DANGER,
  isWithClose: true,
};

export default Modal;
