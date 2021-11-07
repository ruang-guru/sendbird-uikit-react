import { FileMessage } from 'sendbird';
import { CoreMessageType } from '../../utils';
import { isSupportedFileView } from './fileType';

export const isFileMessage = (message: FileMessage): boolean =>
  message &&
  (message.isFileMessage?.() ||
    (message['messageType'] && message.messageType === 'file'));

export const isThumbnailMessage = (message: FileMessage): boolean =>
  message && isFileMessage(message) && isSupportedFileView(message.type);

export const isRepliedMessage = (message: CoreMessageType): boolean => {
  return message?.metaArrays?.[0]?.key === 'parentMessageId';
};
