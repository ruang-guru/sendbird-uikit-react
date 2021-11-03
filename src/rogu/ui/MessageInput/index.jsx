import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import PropTypes from 'prop-types';
import LinkPreview from '@ashwamegh/react-link-preview';

import { LocalizationContext } from '../../../lib/LocalizationContext';
import { getClassName, isUrl } from '../../../utils';
import IconButton from '../../../ui/IconButton';
import Button, { ButtonTypes, ButtonSizes } from '../../../ui/Button';


import { getMimeTypesString, isImage } from '../../utils';

import OGMessageItemBody from '../OGMessageItemBody';
import Icon, { IconTypes, IconColors } from '../Icon';
import Label, { LabelTypography, LabelColors } from '../Label';
import { FileViewerComponent } from '../FileViewer';
import Toast from '../Toast';

import { getUrlFromWords, debounce } from './utils';
import './index.scss';

const MAX_FILE_SIZE = 10000000; // 10MB;
const TOAST_AUTO_HIDE_DURATION = 3000;
const LINE_HEIGHT = 36;
const noop = () => {};
const KeyCode = {
  SHIFT: 16,
  ENTER: 13,
  DELETE: 46,
  BACKSPACE: 8,
};

const MessageInput = React.forwardRef((props, ref) => {
  const {
    isEdit,
    disabled,
    value,
    name,
    placeholder,
    maxLength,
    nickname,
    profileUrl,
    onFileUpload,
    onSendMessage,
    onCancelEdit,
    onStartTyping,
  } = props;

  const { stringSet } = useContext(LocalizationContext);
  const fileInputRef = useRef(null);
  const [imagePreviewFile, setImagePreviewFile] = useState(null);
  const [inputValue, setInputValue] = useState(value);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  // TODO: abstract the auto hide mechanism to the Toast component
  const [showUploadErrorToast, setShowUploadErrorToast] = useState(false);
  const autoHideTimer = useRef(null);
  useEffect(() => {
    if (showUploadErrorToast) {
      clearTimeout(autoHideTimer.current);
      autoHideTimer.current = setTimeout(() => {
        setShowUploadErrorToast(false);
      }, TOAST_AUTO_HIDE_DURATION);
    }

    return () => clearTimeout(autoHideTimer.current);
  }, [showUploadErrorToast]);

  const handleUploadFile = (upload) => (event) => {
    const file = event.target?.files[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setShowUploadErrorToast(true);
      } else if (isImage(file.type)) {
        setImagePreviewFile(file);
      } else {
        upload(file);
      }
    }
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };

  const setHeight = () => {
    try {
      const elem = ref.current;
      const MAX_HEIGHT = window.document.body.offsetHeight * 0.6;
      if (elem && elem.scrollHeight >= LINE_HEIGHT) {
        if (MAX_HEIGHT < elem.scrollHeight) {
          elem.style.height = 'auto';
          elem.style.height = `${MAX_HEIGHT}px`;
          elem.style.borderRadius = '12px';
        } else {
          elem.style.height = 'auto';
          elem.style.height = `${elem.scrollHeight}px`;
          elem.style.borderRadius = '12px';
        }
      } else {
        elem.style.height = '';
      }
    } catch (error) {
      // error
    }
  };

  const [url, setUrl] = useState({ hasUrl: false, text: '' });
  const renderPreviewUrl = ({ loading, preview }) => {
    const message = {
      sender: {
        profileUrl: '',
        nickname: '',
      },
      message: '',
      ogMetaData: {
        title: preview.title,
        description: preview.description,
        url: url.text,
        defaultImage: {
          url: preview.img,
          alt: 'test',
        },
      },
      createdAt: 0, 
    };

    if (loading) {
      return <Label
      className="rogu-message-input__text-loading"
      type={LabelTypography.BODY_1}
      color={LabelColors.ONBACKGROUND_1}
    >
      {stringSet.LABEL_LOADING}
    </Label>;
    }

    return <OGMessageItemBody message={message} isOnPreview onClosePreview={() => setUrl({ hasUrl: false, text: '' })} />;
  };

  // after setHeight called twice, the textarea goes to the initialized
  useEffect(() => {
    setHeight();
    debounce(getUrlFromWords(inputValue, setUrl), 1000);
    return setHeight;
  }, [inputValue]);

  const sendMessage = () => {
    setUrl({ hasUrl: false, text: '' });
    if (imagePreviewFile !== null) {
      // In order to change the file name, we need to create a copy of File object
      const modifiedFile = new Blob([imagePreviewFile], {
        type: imagePreviewFile.type,
        name: inputValue,
      });
      modifiedFile.name = inputValue;

      onFileUpload(modifiedFile);
      setImagePreviewFile(null);
      setInputValue('');
    } else if (inputValue && inputValue.trim().length > 0) {
      const trimmedInputValue = inputValue.trim();
      if (isEdit) {
        onSendMessage(name, trimmedInputValue, () => {
          onCancelEdit();
        });
      } else {
        onSendMessage(trimmedInputValue);
        setInputValue('');
      }
    }
  };

  return (
    <div className="rogu-message-input--wrapper">
      {
        url.hasUrl && isUrl(url.text) && <LinkPreview url={url.text} render={renderPreviewUrl} />
      }
      <form
        className={[
          'rogu-message-input--container',
          isEdit ? 'rogu-message-input__edit' : '',
          imagePreviewFile ? 'rogu-message-input--preview' : '',
          disabled ? 'rogu-message-input-form__disabled ' : '',
        ].join(' ')}
      >
        <div
          className={[
            'rogu-message-input',
            disabled ? 'rogu-message-input__disabled' : '',
          ].join(' ')}
        >
          <textarea
            className="rogu-message-input--textarea"
            disabled={disabled}
            ref={ref}
            name={name}
            value={inputValue}
            maxLength={maxLength}
            onChange={(e) => {
              setInputValue(e.target.value);
              onStartTyping();
            }}
            onKeyDown={(e) => {
              if (e.keyCode === KeyCode.SHIFT) {
                setIsShiftPressed(true);
              }
              if (!isShiftPressed && e.keyCode === KeyCode.ENTER) {
                e.preventDefault();
                sendMessage();
              }
            }}
            onKeyUp={(e) => {
              if (e.keyCode === KeyCode.SHIFT) {
                setIsShiftPressed(false);
              }
              if (e.keyCode === KeyCode.BACKSPACE || e.keyCode === KeyCode.DELETE) {
                setUrl({ hasUrl: false, text: '' });
              }
            }}
          />
          {/* placeholder */}
          {!inputValue && (
            <Label
              className="rogu-message-input--placeholder"
              type={LabelTypography.BODY_1}
              color={LabelColors.ONBACKGROUND_3}
            >
              {placeholder || stringSet.CHANNEL__MESSAGE_INPUT__PLACE_HOLDER}
            </Label>
          )}
          {/* send icon */}
          {/* {
          (!isEdit && inputValue && inputValue.trim().length > 0) && (
            <IconButton
              className="rogu-message-input--send"
              height="32px"
              width="32px"
              onClick={sendMessage}
            >
              <Icon
                type={IconTypes.SEND}
                fillColor={IconColors.PRIMARY}
                width="20px"
                height="20px"
              />
            </IconButton>
          )
        } */}
          {/* upload icon */}
          {!isEdit && !imagePreviewFile && (
            <IconButton
              className="rogu-message-input--attach"
              height="32px"
              width="32px"
              onClick={() => {
                // todo: clear previous input
                fileInputRef.current.click();
              }}
            >
              <Icon
                type={IconTypes.ATTACH}
                fillColor={IconColors.CONTENT_INVERSE}
                width="20px"
                height="20px"
              />
              <input
                accept={getMimeTypesString()}
                className="rogu-message-input--attach-input"
                type="file"
                ref={fileInputRef}
                onChange={handleUploadFile(onFileUpload)}
              />
            </IconButton>
          )}

          {!isEdit && (
            <IconButton
              className={getClassName([
                'rogu-message-input--send',
                disabled ? 'rogu-message-input--send-disabled' : '',
              ])}
              height="36px"
              width="36px"
              onClick={sendMessage}
            >
              <Icon
                type={IconTypes.SEND}
                fillColor={IconColors.WHITE}
                width="16px"
                height="16px"
              />
            </IconButton>
          )}
        </div>
        {/* Edit */}

        {isEdit && (
          <div className="rogu-message-input--edit-action">
            <Button
              className="rogu-message-input--edit-action__cancel"
              type={ButtonTypes.SECONDARY}
              size={ButtonSizes.SMALL}
              onClick={onCancelEdit}
            >
              {stringSet.BUTTON__CANCEL}
            </Button>
            <Button
              className="rogu-message-input--edit-action__save"
              type={ButtonTypes.PRIMARY}
              size={ButtonSizes.SMALL}
              onClick={() => {
                if (inputValue) {
                  const trimmedInputValue = inputValue.trim();
                  onSendMessage(name, trimmedInputValue, () => {
                    onCancelEdit();
                  });
                }
              }}
            >
              {stringSet.BUTTON__SAVE}
            </Button>
          </div>
        )}
      </form>

      {imagePreviewFile !== null && (
        <FileViewerComponent
          captionMsg="TODO: caption here"
          isByMe
          isPreview
          profileUrl={profileUrl}
          type={imagePreviewFile.type}
          url={URL.createObjectURL(imagePreviewFile)}
          userName={nickname}
          onClose={() => setImagePreviewFile(null)}
          onDelete={() => { }}
        />
      )}

      {showUploadErrorToast && (
        <Toast message={stringSet.TOAST__MAX_FILE_SIZE_ERROR} />
      )}
    </div>

  );
});

MessageInput.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isEdit: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  nickname: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired,
  onFileUpload: PropTypes.func,
  onSendMessage: PropTypes.func,
  onStartTyping: PropTypes.func,
  onCancelEdit: PropTypes.func,
};

MessageInput.defaultProps = {
  value: '',
  onSendMessage: noop,
  name: 'rogu-message-input',
  isEdit: false,
  disabled: false,
  placeholder: '',
  maxLength: 5000,
  onFileUpload: noop,
  onCancelEdit: noop,
  onStartTyping: noop,
};

export default MessageInput;
