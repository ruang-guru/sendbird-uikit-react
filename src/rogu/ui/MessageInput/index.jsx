import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import PropTypes from 'prop-types';
import LinkPreview from '@ashwamegh/react-link-preview';

import { LocalizationContext } from '../../../lib/LocalizationContext';
import { getClassName, isUrl } from '../../../utils';
import IconButton from '../../../ui/IconButton';

import OGMessageItemBody from '../OGMessageItemBody';
import Icon, { IconTypes, IconColors } from '../Icon';
import Label, { LabelTypography, LabelColors } from '../Label';
import { FileViewerComponent } from '../FileViewer';
import Toast from '../Toast';
import RepliedMessagePreview from './RepliedMessagePreview';

import {
  extractUrls,
  formatedStringToRepliedMessage,
  getMimeTypesString,
  isAssignmentMessage,
  isFileMessage,
  isImage,
  isMaterialMessage,
  isReplyingMessage,
  isThumbnailMessage,
  isVideo,
  REPLIED_MESSAGE_TYPE,
  SUPPORTED_MIMES,
} from '../../utils';
import { debounce } from './utils';

import './index.scss';

const MAX_FILE_SIZE = 10000000; // 10MB;
const TOAST_AUTO_HIDE_DURATION = 3000;
const LINE_HEIGHT = 36;
const noop = () => { };
const KeyCode = {
  SHIFT: 16,
  ENTER: 13,
  DELETE: 46,
  BACKSPACE: 8,
};

const MessageInput = React.forwardRef((props, ref) => {
  const {
    disabled,
    value,
    name,
    placeholder,
    maxLength,
    nickname,
    profileUrl,
    repliedMessage,
    onFileUpload,
    onSendMessage,
    onStartTyping,
    onCancelRepliedMessage,
    onClickRepliedMessage,
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
        setInputValue(inputValue.slice(0, 930));
        setImagePreviewFile(file);
      } else {
        upload(file);
      }
    }
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };

  const elem = ref && ref.current;

  const setHeight = () => {
    try {
      const MAX_HEIGHT = window.document.body.offsetHeight * 0.6;
      if (elem && elem.scrollHeight >= LINE_HEIGHT) {
        elem.style.borderRadius = '12px';
        elem.style.height = '36px';
        if (MAX_HEIGHT < elem.scrollHeight) elem.style.height = `${MAX_HEIGHT}px`;
        else elem.style.height = `${elem.scrollHeight}px`;
      }
      if (inputValue === '') elem.style.borderRadius = '42px';
    } catch (error) {
      // error
    }
  };

  const [url, setUrl] = useState({ hasUrl: false, text: '' });
  const handleUrlCheck = (sentence) => {
    const { urls } = extractUrls(sentence);
    let firstLink = urls[0];

    if (firstLink) {
      // Add `https://` since LinkPreview only support url with 'https://'
      if (
        firstLink.indexOf('http://') === -1
        || firstLink.indexOf('https://') === -1
      ) {
        firstLink = `https://${firstLink}`;
      }
      setUrl({ hasUrl: true, text: firstLink });
    }
  };

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
      return (
        <Label
          className="rogu-message-input__url-loading"
          type={LabelTypography.BODY_1}
          color={LabelColors.ONBACKGROUND_1}
        >
          {stringSet.LABEL_LOADING}
        </Label>
      );
    }

    return (
      <OGMessageItemBody
        message={message}
        isOnPreview
        onClosePreview={() => setUrl({ hasUrl: false, text: '' })}
      />
    );
  };

  // after setHeight called twice, the textarea goes to the initialized
  useEffect(() => {
    setHeight();
    // TODO: this call is not debounced correctly. Consider to use lodash.debounce instead
    debounce(handleUrlCheck(inputValue), 3000);
    return setHeight;
  }, [inputValue]);

  const sendMessage = () => {
    if (imagePreviewFile !== null) {
      // In order to change the file name, we need to create a copy of File object
      const modifiedFile = new Blob([imagePreviewFile], {
        type: imagePreviewFile.type,
        name: inputValue.slice(0, 930),
      });
      modifiedFile.name = inputValue.slice(0, 930);

      if (repliedMessage) {
        let repliedMessageBody = repliedMessage.message;
        let repliedMessageMediaUrl = '';
        let repliedMessageMimeType = '*';
        let repliedMessageType = REPLIED_MESSAGE_TYPE.Text;

        if (isThumbnailMessage(repliedMessage)) {
          repliedMessageMimeType = repliedMessage.type;
          repliedMessageMediaUrl = repliedMessage.url;

          if (isImage(repliedMessageMimeType)) {
            repliedMessageBody = repliedMessage.name;
            repliedMessageType = REPLIED_MESSAGE_TYPE.Image;
          } else if (isVideo(repliedMessageMimeType)) {
            repliedMessageType = REPLIED_MESSAGE_TYPE.Video;
          }
        } else if (isFileMessage(repliedMessage)) {
          repliedMessageBody = repliedMessage.name;
          repliedMessageMimeType = repliedMessage.type;
          repliedMessageType = REPLIED_MESSAGE_TYPE.File;
        } else if (isMaterialMessage(repliedMessage.customType)) {
          const materialData = JSON.parse(repliedMessage?.data);
          repliedMessageBody = materialData?.title;
          repliedMessageType = REPLIED_MESSAGE_TYPE.Material;
        } else if (isAssignmentMessage(repliedMessage.customType)) {
          const materialData = JSON.parse(repliedMessage?.data);
          repliedMessageBody = materialData?.title;
          repliedMessageType = REPLIED_MESSAGE_TYPE.Assignment;
        }

        // if the replied message is replying another message
        if (isReplyingMessage(repliedMessage)) {
          const { originalMessage } = formatedStringToRepliedMessage(
            repliedMessageBody,
          );

          repliedMessageBody = originalMessage;
        }
        onFileUpload(modifiedFile, {
          parentMessageBody: repliedMessageBody,
          parentMessageCreatedAt: repliedMessage.createdAt,
          parentMessageId: repliedMessage.messageId,
          parentMessageMediaUrl: repliedMessageMediaUrl,
          parentMessageMimeType: repliedMessageMimeType,
          parentMessageNickname: repliedMessage.sender?.nickname,
          parentMessageType: repliedMessageType,
        });
      } else {
        onFileUpload(modifiedFile);
      }
    } else if (inputValue && inputValue.trim().length > 0) {
      if (repliedMessage) {
        let repliedMessageBody = repliedMessage.message;
        let repliedMessageMediaUrl = '';
        let repliedMessageMimeType = '*';
        let repliedMessageType = REPLIED_MESSAGE_TYPE.Text;

        if (isThumbnailMessage(repliedMessage)) {
          repliedMessageMimeType = repliedMessage.type;
          repliedMessageMediaUrl = repliedMessage.url;

          if (isImage(repliedMessageMimeType)) {
            repliedMessageBody = repliedMessage.name;
            repliedMessageType = REPLIED_MESSAGE_TYPE.Image;
          } else if (isVideo(repliedMessageMimeType)) {
            repliedMessageType = REPLIED_MESSAGE_TYPE.Video;
          }
        } else if (isFileMessage(repliedMessage)) {
          repliedMessageBody = repliedMessage.name;
          repliedMessageMimeType = repliedMessage.type;
          repliedMessageType = REPLIED_MESSAGE_TYPE.File;
        } else if (isMaterialMessage(repliedMessage.customType)) {
          const materialData = JSON.parse(repliedMessage?.data);
          repliedMessageBody = materialData?.title;
          repliedMessageType = REPLIED_MESSAGE_TYPE.Material;
        } else if (isAssignmentMessage(repliedMessage.customType)) {
          const materialData = JSON.parse(repliedMessage?.data);
          repliedMessageBody = materialData?.title;
          repliedMessageType = REPLIED_MESSAGE_TYPE.Assignment;
        }

        // if the replied message is replying another message
        if (isReplyingMessage(repliedMessage)) {
          const { originalMessage } = formatedStringToRepliedMessage(
            repliedMessageBody,
          );

          repliedMessageBody = originalMessage;
        }

        onSendMessage({
          parentMessageBody: repliedMessageBody,
          parentMessageCreatedAt: repliedMessage.createdAt,
          parentMessageId: repliedMessage.messageId,
          parentMessageMediaUrl: repliedMessageMediaUrl,
          parentMessageMimeType: repliedMessageMimeType,
          parentMessageNickname: repliedMessage.sender?.nickname,
          parentMessageType: repliedMessageType,
        });
      } else {
        onSendMessage();
      }

      if (elem) {
        elem.style.height = `${LINE_HEIGHT}px`;
      }
    }

    // Reset
    setImagePreviewFile(null);
    setInputValue('');
    onCancelRepliedMessage();
    setUrl({ hasUrl: false, text: '' });
  };

  return (
    <div
      className={getClassName([
        'rogu-message-input',
        disabled ? 'rogu-message-input--disabled ' : '',
        imagePreviewFile ? 'rogu-message-input--preview' : '',
      ])}
    >
      {/* Replied message */}
      {repliedMessage && (
        <RepliedMessagePreview
          className="rogu-message-input__replied-preview"
          message={repliedMessage}
          onCancel={onCancelRepliedMessage}
          onClick={onClickRepliedMessage}
        />
      )}

      {/* URL preview */}
      {url.hasUrl && isUrl(url.text) && (
        <LinkPreview url={url.text} render={renderPreviewUrl} />
      )}

      {/* Input form */}
      <form className={['rogu-message-input__form'].join(' ')}>
        <textarea
          className="rogu-message-input__textarea"
          disabled={disabled}
          ref={ref}
          name={name}
          value={inputValue}
          maxLength={imagePreviewFile ? 930 : maxLength}
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
            if (
              e.keyCode === KeyCode.BACKSPACE
              || e.keyCode === KeyCode.DELETE
            ) {
              setUrl({ hasUrl: false, text: '' });
            }
          }}
        />
        {/* placeholder */}
        {!inputValue && (
          <Label
            className="rogu-message-input__placeholder"
            type={LabelTypography.BODY_1}
            color={LabelColors.ONBACKGROUND_3}
          >
            {placeholder || stringSet.CHANNEL__MESSAGE_INPUT__PLACE_HOLDER}
          </Label>
        )}
        {/* upload icon */}
        {!imagePreviewFile && (
          <IconButton
            className="rogu-message-input__attach"
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
              accept={
                repliedMessage
                  ? SUPPORTED_MIMES.IMAGE.map((mime) => mime.mimeType)
                  : getMimeTypesString()
              }
              className="rogu-message-input__attach__input"
              type="file"
              ref={fileInputRef}
              onChange={handleUploadFile(onFileUpload)}
            />
          </IconButton>
        )}

        <IconButton
          className="rogu-message-input__send"
          height="36px"
          width="36px"
          onClick={sendMessage}
        >
          <Icon
            type={IconTypes.ROGU_SEND}
            fillColor={IconColors.WHITE}
            width="16px"
            height="16px"
          />
        </IconButton>
      </form>

      {imagePreviewFile !== null && (
        <FileViewerComponent
          captionMsg=""
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
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  nickname: PropTypes.string.isRequired,
  profileUrl: PropTypes.string.isRequired,
  repliedMessage: PropTypes.object,
  onFileUpload: PropTypes.func,
  onSendMessage: PropTypes.func,
  onStartTyping: PropTypes.func,
  onCancelRepliedMessage: PropTypes.func,
  onClickRepliedMessage: PropTypes.func,
};

MessageInput.defaultProps = {
  value: '',
  onSendMessage: noop,
  name: 'rogu-message-input',
  disabled: false,
  placeholder: '',
  maxLength: 3000,
  repliedMessage: null,
  onFileUpload: noop,
  onStartTyping: noop,
  onCancelRepliedMessage: noop,
  onClickRepliedMessage: noop,
};

export default MessageInput;
