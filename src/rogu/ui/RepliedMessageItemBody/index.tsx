/**
 * TODO
 * [x] Handle normal text message
 * [ ] Handle file message
 * [ ] Handle assignment message
 * [ ] Handle material message
 * [ ] Handle image message
 * [ ] Handle video message
 */
import React from 'react';
import RepliedMediaMessageItemBody from '../RepliedMediaMessageItemBody';

import RepliedTextMessageItemBody from '../RepliedTextMessageItemBody';

export enum RepliedMessageTypes {
  Text,
  Image,
  Video,
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
    case RepliedMessageTypes.Image:
      return (
        <RepliedMediaMessageItemBody
          isByMe={isByMe}
          // nickname={nickname}
          nickname="Andaine"
          // content={messageContent}
          content="gimana gimana"
          onClick={onClick}
          mediaUrl="https://sendbird-upload.s3.amazonaws.com/D74864D6-2283-48E1-8381-89719216DC7F/upload/n/f09296bcc9454448940a4830092377b0.png"
        />
      );
    default:
      return null;
  }
}

export default RepliedMessageItemBody;
