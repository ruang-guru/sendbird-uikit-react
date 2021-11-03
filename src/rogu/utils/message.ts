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


type structureRepliedMessage = {
  sender: string;
  parentMessage: string;
  originalMessage:string;
};

const QUOTE_FORMAT = ">";

let isQuoteFormat = (word:string):boolean => {
  return word.charAt(0) === QUOTE_FORMAT    
};

export const destructureRepliedMessage = (message:string):structureRepliedMessage => {
  let repliedMessage = message.split("\n").filter(word => isQuoteFormat(word)).map(word => word.substr(1));
  let [sender, ...rest] = repliedMessage;
  let parentMessage = rest.join("\n");
  let originalMessage = message.split("\n").filter(word => !isQuoteFormat(word)).join("\n");
  return {
    sender: sender,
    parentMessage,
    originalMessage,
  };
};

export const getParentMessageId = (message) => {
  return message?.metaArrays?.[0]?.value
}

export default groupMessagesByDate;
