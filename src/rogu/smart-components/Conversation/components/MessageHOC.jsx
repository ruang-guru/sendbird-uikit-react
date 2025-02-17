import React, {
  useState, useRef, useMemo, useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
// import format from 'date-fns/format';

// Rogu components
import MessageContent from '../../../ui/MessageContent';
// import Label, { LabelTypography, LabelColors } from '../../../ui/Label';
// import MessageInput from '../../../ui/MessageInput';
import RemoveMessageModal from './RemoveMessage';

// Sendbird original components
// import DateSeparator from '../../../ui/DateSeparator';
import FileViewer from '../../../ui/FileViewer';

import { getClassName } from '../../../../utils';

export default function MessageHoc({
  message,
  userId,
  disabled,
  // editDisabled,
  // hasSeparator,
  deleteMessage,
  // updateMessage,
  scrollToMessage,
  resendMessage,
  useReaction,
  chainTop,
  chainBottom,
  membersMap,
  emojiContainer,
  highLightedMessageId,
  toggleReaction,
  renderCustomMessage,
  currentGroupChannel,
  onReplyMessage,
}) {
  const { sender = {} } = message;
  // const [showEdit, setShowEdit] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [showFileViewer, setShowFileViewer] = useState(false);
  const [isHighlighted, setAsHighlighted] = useState(false);
  // const editMessageInputRef = useRef(null);
  const useMessageScrollRef = useRef(null);

  useLayoutEffect(() => {
    if (highLightedMessageId === message.messageId) {
      if (useMessageScrollRef && useMessageScrollRef.current) {
        useMessageScrollRef.current.scrollIntoView({
          behavior: 'smooth', // iOS Safari incompatible (https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)
          block: 'center',
          inline: 'center',
        });
        setTimeout(() => {
          setAsHighlighted(true);
        }, 500);
      }
    } else {
      setAsHighlighted(false);
    }
  }, [highLightedMessageId, useMessageScrollRef.current, message.messageId]);
  const RenderedMessage = useMemo(() => {
    if (renderCustomMessage) {
      return renderCustomMessage(
        message,
        currentGroupChannel,
        chainTop,
        chainBottom,
      );
      // TODO: Let's change this to object type on next major version up
      // and add params 'hasSeparator' and 'menuDisabled', scrollToMessage
    }
    return null;
  }, [message, message.message, renderCustomMessage]);

  const isByMe = userId === sender.userId
    || message.requestState === 'pending'
    || message.requestState === 'failed';

  if (RenderedMessage) {
    return (
      <div
        ref={useMessageScrollRef}
        className={getClassName([
          'rogu-message-hoc',
          chainBottom ? 'rogu-message-hoc--chain-bottom' : '',
          isHighlighted ? 'rogu-message-hoc--highlighted' : '',
        ])}
      >
        <RenderedMessage
          className="rogu-message-hoc__message-content"
          message={message}
        />
      </div>
    );
  }

  return (
    <div
      ref={useMessageScrollRef}
      className={getClassName([
        'rogu-message-hoc',
        chainBottom ? 'rogu-message-hoc--chain-bottom' : '',
        isHighlighted ? 'rogu-message-hoc--highlighted' : '',
      ])}
    >
      <MessageContent
        className="rogu-message-hoc__message-content"
        userId={userId}
        scrollToMessage={scrollToMessage}
        channel={currentGroupChannel}
        message={message}
        disabled={disabled}
        chainTop={chainTop}
        chainBottom={chainBottom}
        useReaction={useReaction}
        // useReplying={} TODO: Set useReplying
        nicknamesMap={membersMap}
        emojiContainer={emojiContainer}
        // showEdit={setShowEdit}
        showRemove={setShowRemove}
        showFileViewer={setShowFileViewer}
        showReply={() => onReplyMessage(message)}
        resendMessage={resendMessage}
        toggleReaction={toggleReaction}
      />
      {/* Modal */}
      {showRemove && (
        <RemoveMessageModal
          onCloseModal={() => setShowRemove(false)}
          onDeleteMessage={() => {
            deleteMessage(message);
          }}
        />
      )}
      {showFileViewer && (
        <FileViewer
          onClose={() => setShowFileViewer(false)}
          message={message}
          onDelete={() => {
            deleteMessage(message, () => {
              setShowFileViewer(false);
            });
          }}
          isByMe={isByMe}
        />
      )}
    </div>
  );
}

MessageHoc.propTypes = {
  userId: PropTypes.string,
  message: PropTypes.shape({
    isFileMessage: PropTypes.func,
    isAdminMessage: PropTypes.func,
    isUserMessage: PropTypes.func,
    isDateseparator: PropTypes.func,
    // should be a number, but there's a bug in SDK shich returns string
    messageId: PropTypes.number,
    type: PropTypes.string,
    createdAt: PropTypes.number,
    message: PropTypes.string,
    requestState: PropTypes.string,
    messageType: PropTypes.string,
    sender: PropTypes.shape({ userId: PropTypes.string }),
    ogMetaData: PropTypes.shape({}),
  }),
  highLightedMessageId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  renderCustomMessage: PropTypes.func,
  currentGroupChannel: PropTypes.shape({}),
  // hasSeparator: PropTypes.bool,
  disabled: PropTypes.bool,
  // editDisabled: PropTypes.bool,
  deleteMessage: PropTypes.func.isRequired,
  scrollToMessage: PropTypes.func,
  // updateMessage: PropTypes.func.isRequired,
  resendMessage: PropTypes.func.isRequired,
  useReaction: PropTypes.bool.isRequired,
  chainTop: PropTypes.bool.isRequired,
  chainBottom: PropTypes.bool.isRequired,
  membersMap: PropTypes.instanceOf(Map).isRequired,
  emojiContainer: PropTypes.shape({
    emojiCategories: PropTypes.arrayOf(
      PropTypes.shape({
        emojis: PropTypes.arrayOf(
          PropTypes.shape({
            key: PropTypes.string,
            url: PropTypes.string,
          }),
        ),
      }),
    ),
  }),
  toggleReaction: PropTypes.func,
  onReplyMessage: PropTypes.func,
};

MessageHoc.defaultProps = {
  userId: '',
  // editDisabled: false,
  renderCustomMessage: null,
  currentGroupChannel: {},
  message: {},
  // hasSeparator: false,
  disabled: false,
  highLightedMessageId: null,
  toggleReaction: () => {},
  scrollToMessage: () => {},
  onReplyMessage: () => {},
  emojiContainer: {},
};
