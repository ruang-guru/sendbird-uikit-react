import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { format } from 'date-fns';

import './index.scss';
import Avatar from '../Avatar/index';
import Label, { LabelTypography, LabelColors } from '../Label';
import Icon, { IconTypes } from '../Icon';
import { MODAL_ROOT } from '../../../hooks/useModal/ModalRoot';

import { isImage, isVideo, isSupportedFileView } from '../../../utils';
import { LocalizationContext } from '../../../lib/LocalizationContext';
import Toast from '../Toast';

export const FileViewerComponent = ({
  // sender
  profileUrl,
  userName,
  // file
  fileName,
  type,
  url,
  // others
  isByMe,
  onClose,
  onDelete,
  createdAt,
}) => {
  const { stringSet } = useContext(LocalizationContext);

  const [showToast, setShowToast] = useState(false);
  const onDownloadClick = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  return (
    <div className="rogu-fileviewer">
      <div className="rogu-fileviewer__header">
        <div className="rogu-fileviewer__header__left">
          <div className="rogu-fileviewer__header__left__avatar">
            <Avatar height="32px" width="32px" src={profileUrl} />
          </div>
          <div className="rogu-fileviewer__header__left__metadata">
            <div>
              <Label
                className="rogu-fileviewer__header__left__sender-name"
                type={LabelTypography.H_3}
                color={LabelColors.ONBACKGROUND_1}
              >
                {userName}
              </Label>
            </div>
            <div>
              <Label
                className="rogu-fileviewer__header__left__createdat"
                type={LabelTypography.BODY_1}
                color={LabelColors.ONBACKGROUND_2}
              >
                {format(createdAt, 'dd/MM/yyyy HH.mm')}
              </Label>
            </div>
          </div>
        </div>
        <div className="rogu-fileviewer__header__right">
          {
            isSupportedFileView(type) && (
              <div className="rogu-fileviewer__header__right__actions">
                <a
                  className="rogu-fileviewer__header__right__actions__download"
                  rel="noopener noreferrer"
                  href={url}
                  onClick={onDownloadClick}
                >
                  <Icon
                    type={IconTypes.ROGU_DOWNLOAD}
                    height="24px"
                    width="24px"
                  />
                </a>
                {
                  onDelete && isByMe && (
                    <div className="rogu-fileviewer__header__right__actions__delete">
                      <Icon
                        type={IconTypes.ROGU_DELETE}
                        height="24px"
                        width="24px"
                        onClick={onDelete}
                      />
                    </div>
                  )
                }
              </div>
            )
          }
          <div className="rogu-fileviewer__header__right__actions__close">
            <Icon
              type={IconTypes.ROGU_CLOSE}
              height="24px"
              width="24px"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
      <div className="rogu-fileviewer__content">
        {isVideo(type) && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video controls className="rogu-fileviewer__content__video">
            <source src={url} type={type} />
          </video>
        )}
        {
          isImage(type) && (
            <img
              src={url}
              alt={fileName}
              className="rogu-fileviewer__content__img"
            />
          )
        }
        {
          !isSupportedFileView(type) && (
            <div className="rogu-fileviewer__content__unsupported">
              <Label type={LabelTypography.H_1} color={LabelColors.ONBACKGROUND_1}>
                Unsupported message
              </Label>
            </div>
          )
        }
      </div>
      {showToast && (
        <Toast message={stringSet.TOAST__DOWNLOAD} />
      )}
    </div>
  );
};

FileViewerComponent.propTypes = {
  profileUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isByMe: PropTypes.bool,
  createdAt: PropTypes.number.isRequired,
};

FileViewerComponent.defaultProps = {
  isByMe: true,
};

export default function FileViewer(props) {
  const {
    message,
    isByMe,
    onClose,
    onDelete,
  } = props;
  const {
    sender,
    type,
    url,
    name: fileName = '',
    createdAt = 0,
  } = message;
  const { profileUrl, nickname: userName = '' } = sender;
  return createPortal(
    (
      <FileViewerComponent
        profileUrl={profileUrl}
        userName={userName}
        type={type}
        url={url}
        fileName={fileName}
        onClose={onClose}
        onDelete={onDelete}
        isByMe={isByMe}
        createdAt={createdAt}
      />
    ),
    document.getElementById(MODAL_ROOT),
  );
}

FileViewer.propTypes = {
  message: PropTypes.shape({
    sender: PropTypes.shape({
      profileUrl: PropTypes.string,
      userName: PropTypes.string,
    }),
    type: PropTypes.string,
    url: PropTypes.string,
    fileName: PropTypes.string,
  }).isRequired,
  isByMe: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

FileViewer.defaultProps = {
  isByMe: true,
};
