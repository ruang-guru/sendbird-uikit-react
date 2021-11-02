import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  ReactElement,
} from "react";

import TextButton from "../TextButton";
import Label, { LabelTypography, LabelColors } from "../Label";
import { getClassName } from "../../../utils";
import { LocalizationContext } from "../../../lib/LocalizationContext";

import "./index.scss";
import { destructureRepliedMessage } from "../../utils";
import generateColorFromString from "../MessageContent/utils";


type ClampType = "init" | "clamped" | "expanded";
type ModeType = "normal" | "fileViewerCaption" | "thumbnailCaption"

interface Props {
  className?: string | Array<string>;
  isByMe?: boolean;
  message: string;
  mode?: ModeType;
  isHidden?: boolean;
  isRepliedMessage?: boolean;
  onScrollToMessage?: () => void;
}

const QUOTE_FORMAT = ">";


export default function TextMessageItemBody({
  className,
  isByMe = false,
  message,
  mode = 'normal',
  isHidden = false,
  isRepliedMessage = false,
  onScrollToMessage
}: Props): ReactElement {
  const { stringSet } = useContext(LocalizationContext);
  const [clampState, setClampState] = useState<ClampType>("init");
  const textRef = useRef<HTMLDivElement>(null);

  let {sender, parentMessage, originalMessage} = isRepliedMessage && destructureRepliedMessage(message);
  let msg = isRepliedMessage ? originalMessage : message;
  

  useEffect(() => {
    if (
      textRef.current &&
      textRef.current.scrollHeight > textRef.current.clientHeight
    ) {
      setClampState("clamped");
    }
  }, [textRef.current]);

  function handleExpand() {
    setClampState("expanded");
  };

  let renderText = (i, word) => {
    return <Label
        className="rogu-text-message-item-body__message"
        color={LabelColors.ONBACKGROUND_1}
        key={i}
        type={LabelTypography.BODY_1}
      >
        {word}
      </Label>
  };

  let renderRepliedMessage = (sender, parentMessage) => {
    return <div className="rogu-text-message-item-body__reply-container" onClick={onScrollToMessage} >
      <Label
        className="rogu-message-content__sender-name"
        color={LabelColors.ONBACKGROUND_2}
        style={{
          color: generateColorFromString(
            sender || ''
          ),
        }}
        type={LabelTypography.CAPTION_1}
      >
        {sender}
      </Label>
      <br/>
      <Label
        className="rogu-text-message-item-body__message"
        color={LabelColors.ONBACKGROUND_1}
        type={LabelTypography.BODY_3}
      >
        {parentMessage}
      </Label>
    </div>
  };

  

  return (
    <div
      className={getClassName([
        className,
        "rogu-text-message-item-body",
        clampState == "expanded" ? "rogu-text-message-item-body--expanded" : "",
        !isByMe ? "rogu-text-message-item-body--incoming" : "",
        mode === "fileViewerCaption" ? "rogu-text-message-item-body--viewer-mode" : "",
        mode === "fileViewerCaption" && isHidden ? "rogu-text-message-item-body--viewer-mode__hidden" : "",
        mode === "thumbnailCaption" ? "rogu-text-message-item-body--preview-mode" : "",
      ])}
    >
      <div ref={textRef} className="rogu-text-message-item-body__inner">
        {isRepliedMessage && renderRepliedMessage(sender, parentMessage)}
        {msg?.split(/\r/).map((word, i) =>
          word === "" ? (
            <br key={i} />
          ) : (
            <Label
              className="rogu-text-message-item-body__message"
              color={LabelColors.ONBACKGROUND_1}
              key={i}
              type={LabelTypography.BODY_1}
            >
              {word}
            </Label>
          )
        )}
      </div>

      {clampState === "clamped" && (
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
