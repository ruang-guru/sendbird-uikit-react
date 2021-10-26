import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import './remove-message.scss';
import Modal from '../../../ui/Modal';
import { LocalizationContext } from '../../../../lib/LocalizationContext';
import Label, { LabelColors, LabelTypography } from '../../../ui/Label';

const RemoveMessage = (props) => {
  const {
    onCloseModal,
    onDeleteMessage,
  } = props;
  const { stringSet } = useContext(LocalizationContext);
  return (
    <Modal
      onCancel={onCloseModal}
      onSubmit={onDeleteMessage}
      submitText="Delete"
      titleText={stringSet.ROGU__MODAL__DELETE_MESSAGE__TITLE}
      isWithClose={false}
    >
      <Label className="rogu-delete-message__subtitle" type={LabelTypography.BODY_3} color={LabelColors.ONBACKGROUND_1}>
        {stringSet.ROGU__MODAL__DELETE_MESSAGE__SUBTITLE}
      </Label>
    </Modal>
  );
};

RemoveMessage.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  onDeleteMessage: PropTypes.func.isRequired,
};

export default RemoveMessage;
