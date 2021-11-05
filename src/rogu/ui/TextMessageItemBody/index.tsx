import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  ReactElement,
} from 'react';

import TextButton from '../TextButton';
import Label, { LabelTypography, LabelColors } from '../Label';
import LinkLabel from '../LinkLabel';
import { destructureRepliedMessage, extractUrls } from '../../utils';
import { getClassName } from '../../../utils';
import uuidv4 from '../../../utils/uuid';
import generateColorFromString from '../MessageContent/utils';
import { LocalizationContext } from '../../../lib/LocalizationContext';

import './index.scss';

type ClampType = 'init' | 'clamped' | 'expanded';
type ModeType = 'normal' | 'fileViewerCaption' | 'thumbnailCaption';

interface Props {
  className?: string | Array<string>;
  isByMe?: boolean;
  message: string;
  mode?: ModeType;
  isHidden?: boolean;
  isRepliedMessage?: boolean;
  onScrollToMessage?: () => void;
}

export default function TextMessageItemBody({
  className,
  isByMe = false,
  message,
  mode = 'normal',
  isHidden = false,
  isRepliedMessage = false,
  onScrollToMessage,
}: Props): ReactElement {
  const { stringSet } = useContext(LocalizationContext);
  const [clampState, setClampState] = useState<ClampType>('init');
  const textRef = useRef<HTMLDivElement>(null);

  const { sender, parentMessage, originalMessage } =
    isRepliedMessage && destructureRepliedMessage(message);
  const msg = isRepliedMessage ? originalMessage : message;

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

  const renderRepliedMessage = (sender, parentMessage) => {
    return (
      <div
        className="rogu-text-message-item-body__reply-container"
        onClick={onScrollToMessage}
      >
        <Label
          className="rogu-message-content__sender-name"
          color={LabelColors.ONBACKGROUND_2}
          style={{
            color: generateColorFromString(sender || ''),
          }}
          type={LabelTypography.CAPTION_1}
        >
          {sender}
        </Label>
        <br />
        <Label
          className="rogu-text-message-item-body__reply-message"
          color={LabelColors.ONBACKGROUND_1}
          type={LabelTypography.BODY_3}
        >
          {parentMessage}
        </Label>
      </div>
    );
  };

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
        {isRepliedMessage && renderRepliedMessage(sender, parentMessage)}
        {msg
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
