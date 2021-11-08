import { format } from 'date-fns';

import { CoreMessageType } from '../../utils';

export const groupMessagesByDate = (
  messages: Array<CoreMessageType>
): Map<string, CoreMessageType> => {
  return messages.reduce((groupedMessagesByDate, currMessage) => {
    const messageDate = format(currMessage.createdAt, 'dd/MM/yyyy');
    const currentGroup = groupedMessagesByDate.get(messageDate);

    if (currentGroup) {
      groupedMessagesByDate.set(messageDate, [...currentGroup, currMessage]);
    } else {
      groupedMessagesByDate.set(messageDate, [currMessage]);
    }

    return groupedMessagesByDate;
  }, new Map());
};

const QUOTE_FORMAT = '>';

const isQuoteFormat = (word: string): boolean => {
  return word.charAt(0) === QUOTE_FORMAT;
};

type StructuredRepliedMessage = {
  senderNickname: string;
  parentMessage: string;
  originalMessage: string;
};

export const destructureRepliedMessage = (
  message: string
): StructuredRepliedMessage => {
  // TODO: consider to use regex instead
  const repliedMessage = message
    .split('\n')
    .filter((word) => isQuoteFormat(word))
    .map((word) => word.substr(1));
  const [senderNickname, ...rest] = repliedMessage;
  const parentMessage = rest.join('\n');
  const originalMessage = message
    .split('\n')
    .filter((word) => !isQuoteFormat(word))
    .join('\n');
  return {
    senderNickname,
    parentMessage,
    originalMessage,
  };
};

export const getParentMessageId = (
  message: CoreMessageType
): string[] | undefined => {
  return message?.metaArrays?.[0]?.value;
};
