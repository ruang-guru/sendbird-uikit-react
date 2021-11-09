import { format } from 'date-fns';
import { MessageMetaArray } from 'sendbird';

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

export type RepliedMessage = {
  body: string;
  messageId: string;
  nickname: string;
};

export const getRepliedMessageFromMetaArrays = (
  metaArrays: Array<MessageMetaArray>
): RepliedMessage => {
  const messageId =
    metaArrays.find((meta) => meta.key === 'parentMessageId')?.value[0] || '';
  let nickname = '';
  let body = '';

  const parentMessageContent = metaArrays.find(
    (meta) => meta.key === 'parentMessageContent'
  )?.value[0];
  if (parentMessageContent) {
    const content = JSON.parse(parentMessageContent);
    body = content.body;
    nickname = content.nickname;
  }

  return {
    body,
    messageId,
    nickname,
  };
};

export const generateRepliedMessage = (
  message: string,
  parentMessageContent: string,
  parentMessageNickname: string
): string =>
  ['>', parentMessageNickname, '\n>', parentMessageContent, '\n', message].join(
    ''
  );

export const getParentMessageId = (
  message: CoreMessageType
): string[] | undefined => {
  return message?.metaArrays?.[0]?.value;
};
