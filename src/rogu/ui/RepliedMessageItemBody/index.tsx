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
          onClick={onClick}
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
          onClick={onClick}
          mediaUrl={mediaUrl}
        />
      );
    case RepliedMessageType.Assignment:
      return (
        <RepliedAssignmentMessageItemBody
          body={body}
          isByMe={isByMe}
          nickname={nickname}
          onClick={onClick}
        />
      );
    case RepliedMessageType.Material:
      return (
        <RepliedMaterialMessageItemBody
          body={body}
          isByMe={isByMe}
          nickname={nickname}
          onClick={onClick}
        />
      );
    default:
      return null;
  }
}

export default RepliedMessageItemBody;
