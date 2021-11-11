/**
 * TODO
 * [x] Handle normal text message
 * [x] Handle file message
 * [ ] Handle assignment message
 * [ ] Handle material message
 * [ ] Handle image message
 * [ ] Handle video message
 */
import React from 'react';

import RepliedAssignmentMessageItemBody from '../RepliedAssignmentMessageItemBody';
import RepliedFileMessageItemBody from '../RepliedFileMessageItemBody';
import RepliedMaterialMessageItemBody from '../RepliedMaterialMessageItemBody';
import RepliedMediaMessageItemBody from '../RepliedMediaMessageItemBody';
import RepliedTextMessageItemBody from '../RepliedTextMessageItemBody';

import { RepliedMessageType } from '../../utils';

export type RepliedMessageItemBodyProps = {
  type: RepliedMessageType;
  body: string;
  mimeType?: string;
  nickname: string;
  isByMe: boolean;
  mediaUrl?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export function RepliedMessageItemBody({
  body,
  isByMe,
  mimeType,
  nickname,
  type,
  onClick,
  mediaUrl = '',
}: RepliedMessageItemBodyProps): JSX.Element {
  switch (type) {
    case RepliedMessageType.Text:
      return (
        <RepliedTextMessageItemBody
          isByMe={isByMe}
          nickname={nickname}
          content={body}
          onClick={onClick}
        />
      );
    case RepliedMessageType.File:
      return (
        <RepliedFileMessageItemBody
          body={body}
          isByMe={isByMe}
          mimeType={mimeType}
          nickname={nickname}
          onClick={() => console.log('Scroll to the message')}
        />
      );
    case RepliedMessageType.Image:
    case RepliedMessageType.Video:
      return (
        <RepliedMediaMessageItemBody
          body={body}
          isByMe={isByMe}
          mimeType={mimeType}
          nickname={nickname}
          onClick={() => console.log('Scroll to the message')}
          mediaUrl={mediaUrl}
        />
      );
    case RepliedMessageType.Assignment:
      return (
        <RepliedAssignmentMessageItemBody
          body={body}
          isByMe={isByMe} // always false to match the styling
          nickname={nickname}
          onClick={onClick}
        />
      );
    case RepliedMessageType.Material:
      return (
        <RepliedMaterialMessageItemBody
          body={body}
          isByMe={isByMe} // always false to match the styling
          nickname={nickname}
          onClick={onClick}
        />
      );
    default:
      return null;
  }
}

export default RepliedMessageItemBody;
