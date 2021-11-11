import { MessageMetaArray, SendBirdInstance } from 'sendbird';

import { CoreMessageType } from '../../utils';
import {
  META_ARRAY_VALUE_MAX_CHAR,
  REPLIED_MESSAGE_QUOTE_FORMAT,
} from './constants';

export type RepliedMessage = {
  originalMessage?: string;
  parentMessageId: string;
  parentMessageBody: string;
  parentMessageNickname: string;
};

export const formatedStringToRepliedMessage = (
  message: string
): RepliedMessage => {
  // TODO: consider to use regex instead
  const repliedMessage = message
    .split('\n')
    .filter((word) => isQuoteFormat(word))
    .map((word) => word.substr(1));
  const [parentMessageNickname, ...rest] = repliedMessage;
  const parentMessageBody = rest.join('\n');
  const originalMessage = message
    .split('\n')
    .filter((word) => !isQuoteFormat(word))
    .join('\n');
  return {
    originalMessage,
    parentMessageId: '',
    parentMessageBody,
    parentMessageNickname,
  };
};

export const repliedMessageToFormatedString = ({
  originalMessage,
  parentMessageBody,
  parentMessageNickname,
}: RepliedMessage): string =>
  [
    '>',
    parentMessageNickname,
    '\n>',
    parentMessageBody,
    '\n',
    originalMessage,
  ].join('');

export const getParentMessageId = (
  message: CoreMessageType
): string[] | undefined => {
  return message?.metaArrays?.[0]?.value;
};

const isQuoteFormat = (word: string): boolean => {
  return word.charAt(0) === REPLIED_MESSAGE_QUOTE_FORMAT;
};

export const stringToMetaArrayValue = (str: string): Array<string> => {
  const metaArrayValue: Array<string> = [];
  let end = META_ARRAY_VALUE_MAX_CHAR;
  for (let i = 0; i < str.length; i += META_ARRAY_VALUE_MAX_CHAR) {
    metaArrayValue.push(str.substring(i, end));
    end += META_ARRAY_VALUE_MAX_CHAR;
  }

  return metaArrayValue;
};

export const repliedMessageToMetaArrays = (
  sdk: SendBirdInstance,
  repliedMessage: RepliedMessage
): Array<MessageMetaArray> => {
  const metaArrays = [];

  Object.entries(repliedMessage).forEach(([key, value]) => {
    metaArrays.push(
      new sdk.MessageMetaArray(key, stringToMetaArrayValue(value))
    );
  });

  return metaArrays;
};

export const metaArraysToRepliedMessage = (
  metaArrays: Array<MessageMetaArray>
): RepliedMessage =>
  metaArrays.reduce(
    (repliedMessage: RepliedMessage, meta: MessageMetaArray) => {
      repliedMessage[meta.key] = meta.value?.join('');

      return repliedMessage;
    },
    {
      parentMessageId: '',
      parentMessageBody: '',
      parentMessageNickname: '',
    }
  );
