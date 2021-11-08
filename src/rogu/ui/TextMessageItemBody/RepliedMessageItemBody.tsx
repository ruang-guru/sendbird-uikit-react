/**
 * TODO
 * [ ] Handle normal text message
 * [ ] Handle file message
 * [ ] Handle assignment message
 * [ ] Handle material message
 * [ ] Handle image message
 * [ ] Handle video message
 */
import React from 'react';

import RepliedTextMessageItemBody from '../RepliedTextMessageItemBody';

export enum RepliedMessageTypes {
  Text,
}

export type RepliedMessageItemBodyProps = {
  type: RepliedMessageTypes;
  nickname: string;
  messageContent: string;
  isByMe: boolean;
  onClick;
};
export function RepliedMessageItemBody({
  isByMe,
  nickname,
  messageContent,
  type,
  onClick,
}: RepliedMessageItemBodyProps): JSX.Element {
  switch (type) {
    case RepliedMessageTypes.Text:
      return (
        <RepliedTextMessageItemBody
          isByMe={isByMe}
          nickname={nickname}
          content={messageContent}
          onClick={onClick}
        />
      );
    default:
      return null;
  }
}

export default RepliedMessageItemBody;
