import React, { ReactElement, useContext, useRef, useState } from 'react';
import { FileMessage, GroupChannel, OpenChannel, UserMessage } from 'sendbird';

import IconButton from '../../../ui/IconButton';
import {
  getClassName,
  copyToClipboard,
  isUserMessage,
  isSentMessage,
  isFailedMessage,
  isThumbnailMessage,
  isFileMessage,
} from '../../../utils';
import { LocalizationContext } from '../../../lib/LocalizationContext';

import Icon, { IconTypes, IconColors } from '../Icon';
import ContextMenu, { MenuItems, MenuItem } from '../ContextMenu';
import Toast from '../Toast';

import {formatedStringToRepliedMessage} from '../../utils/repliedMessage';

import './index.scss';

interface Props {
  className?: string | Array<string>;
  message: UserMessage | FileMessage;
  channel: GroupChannel | OpenChannel;
  isByMe?: boolean;
  disabled?: boolean;
  showEdit?: (bool: boolean) => void;
  showRemove?: (bool: boolean) => void;
  showReply?: (bool: boolean) => void;
  resendMessage?: (message: UserMessage | FileMessage) => void;
  setSupposedHover?: (bool: boolean) => void;
  showFileViewer?: (bool: boolean) => void;
}

export default function MessageItemMenu({
  className,
  message,
  channel,
  isByMe,
  disabled,
  showEdit,
  showRemove,
  showReply,
  resendMessage,
  setSupposedHover,
  showFileViewer,
}: Props): ReactElement {
  const { stringSet } = useContext(LocalizationContext);
  const [showToast, setShowToast] = useState(false);

  const triggerRef = useRef(null);
  const containerRef = useRef(null);

  const showMenuItemCopy: boolean = isUserMessage(message as UserMessage);
  const showMenuItemReply: boolean =
    isUserMessage(message as UserMessage) ||
    isFileMessage(message as FileMessage);
  const showMenuItemResend: boolean =
    isFailedMessage(channel, message) && message.isResendable() && isByMe;
  const showMenuItemDelete: boolean = isSentMessage(channel, message) && isByMe;
  {
    /* hide menu edit */
  }
  const showMenuItemEdit: boolean =
    false &&
    isUserMessage(message as UserMessage) &&
    isSentMessage(channel, message) &&
    isByMe;

  {
    /* show menu view on image or video */
  }
  const showMenuItemView: boolean = isFileMessage(message as FileMessage);

  if (
    !(
      showMenuItemCopy ||
      showMenuItemEdit ||
      showMenuItemResend ||
      showMenuItemDelete ||
      showMenuItemView
    )
  ) {
    return null;
  }

  

  const onCopyClick = (message: string) => {
    const {originalMessage} = formatedStringToRepliedMessage(message);
    copyToClipboard(originalMessage);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const onOpenFile = (message: FileMessage): void => {
    window.open(message.url);
  };

  return (
    <div
      className={getClassName([className, 'rogu-message-item-menu'])}
      ref={containerRef}
    >
      <ContextMenu
        menuTrigger={(toggleDropdown: () => void): ReactElement => (
          <IconButton
            className="rogu-message-item-menu__trigger"
            ref={triggerRef}
            width="16px"
            height="16px"
            onClick={(): void => {
              toggleDropdown();
              if (setSupposedHover && typeof setSupposedHover === 'function')
                setSupposedHover(true);
            }}
            onBlur={(): void => {
              if (setSupposedHover && typeof setSupposedHover === 'function')
                setSupposedHover(false);
            }}
          >
            <Icon
              className="rogu-message-item-menu__trigger__icon"
              type={IconTypes.CHEVRON_DOWN}
              fillColor={IconColors.ON_BACKGROUND_3}
              width="18px"
              height="18px"
            />
          </IconButton>
        )}
        menuItems={(close: () => void): ReactElement => {
          const closeDropdown = (): void => {
            close();
            if (setSupposedHover && typeof setSupposedHover === 'function')
              setSupposedHover(false);
          };
          return (
            <MenuItems
              className="rogu-message-item-menu__list"
              parentRef={triggerRef}
              parentContainRef={containerRef}
              closeDropdown={closeDropdown}
              openLeft={isByMe}
            >
              {showMenuItemReply && (
                <MenuItem
                  className="rogu-message-item-menu__list__menu-item"
                  onClick={() => {
                    if (
                      !disabled &&
                      showReply &&
                      typeof showReply == 'function'
                    ) {
                      showReply(true);
                      closeDropdown();
                    }
                  }}
                  disable={message?.parentMessageId > 0}
                  iconType={IconTypes.ROGU_REPLY}
                >
                  {stringSet.MESSAGE_MENU__REPLY}
                </MenuItem>
              )}
              {showMenuItemCopy && (
                <MenuItem
                  className="rogu-message-item-menu__list__menu-item"
                  onClick={() => {
                    onCopyClick((message as UserMessage)?.message);
                    closeDropdown();
                  }}
                  iconType={IconTypes.ROGU_COPY}
                >
                  {stringSet.MESSAGE_MENU__COPY}
                </MenuItem>
              )}
              {showMenuItemView && (
                <MenuItem
                  className="rogu-message-item-menu__list__menu-item"
                  onClick={() => {
                    if (isThumbnailMessage(message as FileMessage)) {
                      showFileViewer(true);
                    } else {
                      onOpenFile(message as FileMessage);
                    }
                    closeDropdown();
                  }}
                  iconType={IconTypes.ROGU_VIEW}
                >
                  {stringSet.MESSAGE_MENU__VIEW}
                </MenuItem>
              )}

              {showMenuItemEdit && (
                <MenuItem
                  className="rogu-message-item-menu__list__menu-item"
                  onClick={() => {
                    if (!disabled) {
                      showEdit(true);
                      closeDropdown();
                    }
                  }}
                >
                  {stringSet.MESSAGE_MENU__EDIT}
                </MenuItem>
              )}
              {showMenuItemResend && (
                <MenuItem
                  className="rogu-message-item-menu__list__menu-item"
                  onClick={() => {
                    if (!disabled) {
                      resendMessage(message);
                      closeDropdown();
                    }
                  }}
                  iconType={IconTypes.ROGU_RESEND}
                >
                  {stringSet.MESSAGE_MENU__RESEND}
                </MenuItem>
              )}
              {showMenuItemDelete && (
                <MenuItem
                  className="rogu-message-item-menu__list__menu-item"
                  onClick={() => {
                    if (!disabled) {
                      showRemove(true);
                      closeDropdown();
                    }
                  }}
                  disable={message?.threadInfo?.replyCount > 0}
                  iconType={IconTypes.ROGU_DELETE}
                >
                  {stringSet.MESSAGE_MENU__DELETE}
                </MenuItem>
              )}
            </MenuItems>
          );
        }}
      />
      {showToast && <Toast message={stringSet.TOAST__COPY} />}
    </div>
  );
}
