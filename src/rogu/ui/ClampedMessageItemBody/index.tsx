import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  ReactElement,
} from 'react';

import TextButton from '../TextButton';
import Label, { LabelTypography, LabelColors } from '../Label';
import { getClassName } from '../../../utils';
import { LocalizationContext } from '../../../lib/LocalizationContext';

import './index.scss';

type ClampType = 'init' | 'clamped' | 'expanded';
type ModeType = 'normal' | 'fileViewerCaption' | 'thumbnailCaption';

interface Props {
  className?: string | Array<string>;
  isByMe?: boolean;
  content: string;
  mode?: ModeType;
  isHidden?: boolean;
}

export default function TextMessageItemBody({
  className,
  isByMe = false,
  content,
  mode = 'normal',
  isHidden = false,
}: Props): ReactElement {
  const { stringSet } = useContext(LocalizationContext);
  const [clampState, setClampState] = useState<ClampType>('init');
  const textRef = useRef<HTMLDivElement>(null);

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
        'rogu-clamped-message-item-body',
        clampState == 'expanded'
          ? 'rogu-clamped-message-item-body--expanded'
          : '',
        !isByMe ? 'rogu-clamped-message-item-body--incoming' : '',
        mode === 'fileViewerCaption'
          ? 'rogu-clamped-message-item-body--viewer-mode'
          : '',
        mode === 'fileViewerCaption' && isHidden
          ? 'rogu-clamped-message-item-body--viewer-mode__hidden'
          : '',
        mode === 'thumbnailCaption'
          ? 'rogu-clamped-message-item-body--preview-mode'
          : '',
      ])}
    >
      <div ref={textRef} className="rogu-clamped-message-item-body__inner">
        {content?.split(/\r/).map((word, i) =>
          word === '' ? (
            <br key={i} />
          ) : (
            <Label
              className="rogu-clamped-message-item-body__message"
              color={LabelColors.ONBACKGROUND_1}
              key={i}
              type={LabelTypography.BODY_1}
            >
              {word}
            </Label>
          )
        )}
      </div>

      {clampState === 'clamped' && (
        <TextButton
          className="rogu-clamped-message-item-body__read-more"
          onClick={handleExpand}
        >
          <Label type={LabelTypography.BODY_1}>
            {stringSet.BUTTON__READ_MORE}
          </Label>
        </TextButton>
      )}
    </div>
  );
}
