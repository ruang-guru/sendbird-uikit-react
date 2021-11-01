import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './conversation-scroll.scss';
import * as messageActionTypes from '../dux/actionTypes';

import MessageHOC from './MessageHOC';
import { compareMessagesForGrouping } from '../utils';
import { groupMessagesByDate } from '../../../utils';
import DateSeparator from '../../../ui/DateSeparator';
import PlaceHolder, { PlaceHolderTypes } from '../../../../ui/PlaceHolder';
import Icon, { IconTypes, IconColors } from '../../../../ui/Icon';

export default class ConversationScroll extends Component {
  onScroll = (e) => {
    const {
      scrollRef,
      hasMore,
      messagesDispatcher,
      onScroll,
      onScrollDown,
      currentGroupChannel,
    } = this.props;

    const element = e.target;
    const { scrollTop, clientHeight, scrollHeight } = element;
    if (scrollTop === 0) {
      if (!hasMore) {
        return;
      }
      const nodes = scrollRef.current.querySelectorAll(
        '.sendbird-msg--scroll-ref',
      );
      const first = nodes && nodes[0];
      onScroll(([messages]) => {
        if (messages) {
          // https://github.com/scabbiaza/react-scroll-position-on-updating-dom
          try {
            first.scrollIntoView();
          } catch (error) {
            //
          }
        }
      });
    }

    if (clientHeight + scrollTop === scrollHeight) {
      const nodes = scrollRef.current.querySelectorAll(
        '.sendbird-msg--scroll-ref',
      );
      const last = nodes && nodes[nodes.length - 1];
      onScrollDown(([messages]) => {
        if (messages) {
          // https://github.com/scabbiaza/react-scroll-position-on-updating-dom
          try {
            last.scrollIntoView();
          } catch (error) {
            //
          }
        }
      });
    }

    // do this later
    setTimeout(() => {
      // mark as read if scroll is at end
      if (clientHeight + scrollTop === scrollHeight) {
        messagesDispatcher({
          type: messageActionTypes.MARK_AS_READ,
        });
        currentGroupChannel.markAsRead();
      }
    }, 500);
  };

  render() {
    const {
      userId,
      disabled,
      scrollRef,
      membersMap,
      allMessages,
      scrollToMessage,
      useReaction,
      emojiAllMap,
      editDisabled,
      deleteMessage,
      updateMessage,
      resendMessage,
      renderCustomMessage,
      renderChatItem,
      highLightedMessageId,
      emojiContainer,
      toggleReaction,
      useMessageGrouping,
      currentGroupChannel,
      memoizedEmojiListItems,
      showScrollBot,
      onClickScrollBot,
    } = this.props;

    if (allMessages.length < 1) {
      return (
        <PlaceHolder
          className="rogu-conversation__no-messages"
          type={PlaceHolderTypes.NO_MESSAGES}
        />
      );
    }

    return (
      <div className="rogu-conversation__messages">
        <div
          ref={scrollRef}
          className="rogu-conversation__scroll-container"
          onScroll={this.onScroll}
        >
          <div className="rogu-conversation__padding" />
          {/*
            To do: Implement windowing
            Implement windowing if you are dealing with large number of messages/channels
            https://github.com/bvaughn/react-window -> recommendation
            We hesitate to bring one more dependency to our library,
            we are planning to implement it inside the library
          */}
          <div className="rogu-conversation__messages-padding">
            {Array.from(groupMessagesByDate(allMessages).values()).map(
              (messages, i) => {
                const currentCreatedAt = messages[0]?.createdAt;

                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <React.Fragment key={i}>
                    <DateSeparator createdAt={currentCreatedAt} />
                    {messages.map((m, idx) => {
                      const previousMessage = messages[idx - 1];
                      const nextMessage = messages[idx + 1];
                      const [chainTop, chainBottom] = useMessageGrouping
                        ? compareMessagesForGrouping(
                          previousMessage,
                          m,
                          nextMessage,
                        )
                        : [false, false];

                      if (renderChatItem) {
                        return (
                          <div
                            key={m.messageId || m.reqId}
                            className="sendbird-msg--scroll-ref"
                          >
                            {renderChatItem({
                              message: m,
                              highLightedMessageId,
                              channel: currentGroupChannel,
                              // hasSeparator: hasSeparator,
                              onDeleteMessage: deleteMessage,
                              onUpdateMessage: updateMessage,
                              onResendMessage: resendMessage,
                              onScrollToMessage: scrollToMessage,
                              emojiContainer,
                              chainTop,
                              chainBottom,
                              menuDisabled: disabled,
                            })}
                          </div>
                        );
                      }

                      return (
                        <MessageHOC
                          highLightedMessageId={highLightedMessageId}
                          renderCustomMessage={renderCustomMessage}
                          key={m.messageId || m.reqId}
                          userId={userId}
                          // show status for pending/failed messages
                          message={m}
                          scrollToMessage={scrollToMessage}
                          currentGroupChannel={currentGroupChannel}
                          disabled={disabled}
                          membersMap={membersMap}
                          chainTop={chainTop}
                          useReaction={useReaction}
                          emojiAllMap={emojiAllMap}
                          emojiContainer={emojiContainer}
                          editDisabled={editDisabled}
                          // hasSeparator={hasSeparator}
                          chainBottom={chainBottom}
                          updateMessage={updateMessage}
                          deleteMessage={deleteMessage}
                          resendMessage={resendMessage}
                          toggleReaction={toggleReaction}
                          memoizedEmojiListItems={memoizedEmojiListItems}
                        />
                      );
                    })}
                  </React.Fragment>
                );
              },
            )}
            {/* {allMessages.map((m, idx) => {
              const previousMessage = allMessages[idx - 1];
              const nextMessage = allMessages[idx + 1];
              const [chainTop, chainBottom] = useMessageGrouping
                ? compareMessagesForGrouping(previousMessage, m, nextMessage)
                : [false, false];
              const previousMessageCreatedAt = previousMessage && previousMessage.createdAt;
              const currentCreatedAt = m.createdAt;
              // https://stackoverflow.com/a/41855608
              const hasSeparator = !(
                previousMessageCreatedAt
                && isSameDay(currentCreatedAt, previousMessageCreatedAt)
              );
              if (renderChatItem) {
                return (
                  <div
                    key={m.messageId || m.reqId}
                    className="sendbird-msg--scroll-ref"
                  >
                    {renderChatItem({
                      message: m,
                      highLightedMessageId,
                      channel: currentGroupChannel,
                      onDeleteMessage: deleteMessage,
                      onUpdateMessage: updateMessage,
                      onResendMessage: resendMessage,
                      onScrollToMessage: scrollToMessage,
                      emojiContainer,
                      chainTop,
                      chainBottom,
                      hasSeparator,
                      menuDisabled: disabled,
                    })}
                  </div>
                );
              }

              return (
                <MessageHOC
                  highLightedMessageId={highLightedMessageId}
                  renderCustomMessage={renderCustomMessage}
                  key={m.messageId || m.reqId}
                  userId={userId}
                  // show status for pending/failed messages
                  message={m}
                  scrollToMessage={scrollToMessage}
                  currentGroupChannel={currentGroupChannel}
                  disabled={disabled}
                  membersMap={membersMap}
                  chainTop={chainTop}
                  useReaction={useReaction}
                  emojiAllMap={emojiAllMap}
                  emojiContainer={emojiContainer}
                  editDisabled={editDisabled}
                  hasSeparator={hasSeparator}
                  chainBottom={chainBottom}
                  updateMessage={updateMessage}
                  deleteMessage={deleteMessage}
                  resendMessage={resendMessage}
                  toggleReaction={toggleReaction}
                  memoizedEmojiListItems={memoizedEmojiListItems}
                />
              );
            })} */}
          </div>
        </div>
        {showScrollBot && (
          <div
            className="rogu-conversation__scroll-bottom-button"
            onClick={onClickScrollBot}
            onKeyDown={onClickScrollBot}
            tabIndex={0}
            role="button"
          >
            <Icon
              width="24px"
              height="24px"
              type={IconTypes.CHEVRON_DOWN}
              fillColor={IconColors.PRIMARY}
            />
          </div>
        )}
      </div>
    );
  }
}

ConversationScroll.propTypes = {
  // https://stackoverflow.com/a/52646941
  scrollRef: PropTypes.shape({
    current: PropTypes.oneOfType([PropTypes.element, PropTypes.shape({})]),
  }).isRequired,
  hasMore: PropTypes.bool,
  messagesDispatcher: PropTypes.func.isRequired,
  onScroll: PropTypes.func,
  onScrollDown: PropTypes.func,
  editDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  userId: PropTypes.string,
  allMessages: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.number,
    }),
  ).isRequired,
  deleteMessage: PropTypes.func.isRequired,
  resendMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
  readStatus: PropTypes.shape({}).isRequired,
  currentGroupChannel: PropTypes.shape({
    markAsRead: PropTypes.func,
    members: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  highLightedMessageId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  renderChatItem: PropTypes.element,
  renderCustomMessage: PropTypes.func,
  scrollToMessage: PropTypes.func,
  useReaction: PropTypes.bool,
  showScrollBot: PropTypes.bool,
  onClickScrollBot: PropTypes.func,
  emojiContainer: PropTypes.shape({}),
  emojiAllMap: PropTypes.instanceOf(Map),
  membersMap: PropTypes.instanceOf(Map),
  useMessageGrouping: PropTypes.bool,
  toggleReaction: PropTypes.func,
  memoizedEmojiListItems: PropTypes.func,
};

ConversationScroll.defaultProps = {
  hasMore: false,
  editDisabled: false,
  disabled: false,
  userId: '',
  renderCustomMessage: null,
  renderChatItem: null,
  highLightedMessageId: null,
  onScroll: null,
  onScrollDown: null,
  useReaction: true,
  emojiContainer: {},
  showScrollBot: false,
  onClickScrollBot: () => {},
  scrollToMessage: () => {},
  emojiAllMap: new Map(),
  membersMap: new Map(),
  useMessageGrouping: true,
  toggleReaction: () => {},
  memoizedEmojiListItems: () => '',
};
