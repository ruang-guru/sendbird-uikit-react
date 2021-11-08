import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  ReactElement,
} from 'react';
import { UserMessage } from 'sendbird';

import TextButton from '../TextButton';
import Label, { LabelTypography, LabelColors } from '../Label';
import LinkLabel from '../LinkLabel';
import RepliedMessageItemBody, {
  RepliedMessageTypes,
} from './RepliedMessageItemBody';
import {
  destructureRepliedMessage,
  extractUrls,
  isReplyingMessage,
} from '../../utils';
import { getClassName } from '../../../utils';
import uuidv4 from '../../../utils/uuid';
import { LocalizationContext } from '../../../lib/LocalizationContext';

import './index.scss';

type ClampType = 'init' | 'clamped' | 'expanded';
type ModeType = 'normal' | 'fileViewerCaption' | 'thumbnailCaption';

interface Props {
  className?: string | Array<string>;
  isByMe?: boolean;
  message: UserMessage;
  mode?: ModeType;
  isHidden?: boolean;
  onScrollToMessage?: () => void;
}

export default function TextMessageItemBody({
  className,
  isByMe = false,
  message,
  mode = 'normal',
  isHidden = false,
  onScrollToMessage,
}: Props): ReactElement {
  const { stringSet } = useContext(LocalizationContext);
  const [clampState, setClampState] = useState<ClampType>('init');
  const textRef = useRef<HTMLDivElement>(null);
  const messageContent = message.message;

  const hasRepliedMessage = isReplyingMessage(message);

  const { senderNickname, parentMessage, originalMessage } =
    hasRepliedMessage && destructureRepliedMessage(messageContent);
  const resolvedMessageContent = hasRepliedMessage
    ? originalMessage
    : messageContent;

  useEffect(() => {
    if (
      textRef.current &&
      textRef.current.scrollHeight > textRef.current.clientHeight
    ) {
      setClampState('clamped');
    }
  }, [textRef.current]);

  function handleExpand() {
    setClampState('expanded');
  }

  return (
    <div
      className={getClassName([
        className,
        'rogu-text-message-item-body',
        clampState == 'expanded' ? 'rogu-text-message-item-body--expanded' : '',
        !isByMe ? 'rogu-text-message-item-body--incoming' : '',
        mode === 'fileViewerCaption'
          ? 'rogu-text-message-item-body--viewer-mode'
          : '',
        mode === 'fileViewerCaption' && isHidden
          ? 'rogu-text-message-item-body--viewer-mode__hidden'
          : '',
        mode === 'thumbnailCaption'
          ? 'rogu-text-message-item-body--preview-mode'
          : '',
      ])}
    >
      <div ref={textRef} className="rogu-text-message-item-body__inner">
        {hasRepliedMessage && (
          <RepliedMessageItemBody
            isByMe={isByMe}
            nickname={senderNickname}
            messageContent={parentMessage}
            type={RepliedMessageTypes.Text}
            onClick={onScrollToMessage}
          />
        )}
        {resolvedMessageContent
          ?.split(/\r/)
          .map((words, i) =>
            words === '' ? <br key={i} /> : replaceUrlsWithLink(words)
          )}
      </div>
      {clampState === 'clamped' && (
        <TextButton
          className="rogu-text-message-item-body__read-more"
          onClick={handleExpand}
        >
          <Label>{stringSet.BUTTON__READ_MORE}</Label>
        </TextButton>
      )}
    </div>
  );
}

function replaceUrlsWithLink(text: string): Array<JSX.Element> {
  const { urls, sentences } = extractUrls(text);
  const elements = [];

  sentences.forEach((sentence, i) => {
    if (sentence !== '') {
      elements.push(
        <Label
          className="rogu-text-message-item-body__message"
          color={LabelColors.ONBACKGROUND_1}
          key={uuidv4()}
          type={LabelTypography.BODY_1}
        >
          {sentence}
        </Label>
      );
    }

    const currentUrl = urls[i];
    if (currentUrl) {
      elements.push(
        <LinkLabel
          className="rogu-text-message-item-body__message"
          color={LabelColors.SECONDARY_3}
          key={uuidv4()}
          src={currentUrl}
          type={LabelTypography.BODY_1}
        >
          {currentUrl}
        </LinkLabel>
      );
    }
  });

  return elements;
}
