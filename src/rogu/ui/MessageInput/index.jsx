import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import PropTypes from 'prop-types';

import { LocalizationContext } from '../../../lib/LocalizationContext';
import IconButton from '../../../ui/IconButton';
import Button, { ButtonTypes, ButtonSizes } from '../../../ui/Button';
import { getClassName } from '../../../utils';

import Icon, { IconTypes, IconColors } from '../Icon';
import Label, { LabelTypography, LabelColors } from '../Label';
import Toast from '../Toast';

import './index.scss';

const MAX_FILE_SIZE = 10000000; // 10MB;
const TOAST_AUTO_HIDE_DURATION = 3000;
const LINE_HEIGHT = 36;
const noop = () => {};
const KeyCode = {
  SHIFT: 16,
  ENTER: 13,
};

const MessageInput = React.forwardRef((props, ref) => {
  const {
    isEdit,
    disabled,
    value,
    name,
    placeholder,
    maxLength,
    onFileUpload,
    onSendMessage,
    onCancelEdit,
    onStartTyping,
  } = props;

  const { stringSet } = useContext(LocalizationContext);
  const fileInputRef = useRef(null);
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

  const handleUploadFile = (callback) => (event) => {
    const file = event.target?.files[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setShowUploadErrorToast(true);
      } else {
        callback(file);
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
        } else {
          elem.style.height = 'auto';
          elem.style.height = `${elem.scrollHeight}px`;
        }
      } else {
        elem.style.height = '';
      }
    } catch (error) {
      // error
    }
  };

  // after setHeight called twice, the textarea goes to the initialized
  useEffect(() => {
    setHeight();
    return setHeight;
  }, [inputValue]);

  const sendMessage = () => {
    if (inputValue && inputValue.trim().length > 0) {
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
    <>
      <form
        className={[
          isEdit ? 'rogu-message-input__edit' : '',
          disabled ? 'rogu-message-input-form__disabled ' : '',
        ].join(' rogu-message-input__container ')}
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
          {!isEdit && (
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
                accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf,image/*,.mov,.mp4"
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

      {showUploadErrorToast && (
        <Toast message={stringSet.TOAST__MAX_FILE_SIZE_ERROR} />
      )}
    </>
  );
});

MessageInput.propTypes = {
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  isEdit: PropTypes.bool,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
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
