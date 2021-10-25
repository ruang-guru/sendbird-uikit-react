import { format } from 'date-fns';

import { CoreMessageType } from '../../utils';

export const groupMessagesByDate = (messages: Array<CoreMessageType>) => {
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

export default groupMessagesByDate;
