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



type ClampType = "init" | "clamped" | "expanded";
type originUsage = "bubble" | "viewerCaption" | "previewCaption";

interface Props {
  className?: string | Array<string>;
  isByMe?: boolean;
  message: string;
  origin?: originUsage;
  isHidden?: boolean;
}

export default function TextMessageItemBody({
  className,
  isByMe = false,
  message,
  origin = 'bubble',
  isHidden = false,
}: Props): ReactElement {
  const { stringSet } = useContext(LocalizationContext);
  const [clampState, setClampState] = useState<ClampType>("init");
  const textRef = useRef<HTMLDivElement>(null);

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
  }

  return (
    <div
      className={getClassName([
        className,
        "rogu-text-message-item-body",
        clampState == "expanded" ? "rogu-text-message-item-body--expanded" : "",
        !isByMe ? "rogu-text-message-item-body--incoming" : "",
        origin === "viewerCaption" ? "viewer-mode" : "",
        origin === "viewerCaption" && isHidden ? "hidden" : "",
        origin === "previewCaption" ? "preview-mode" : "",
      ])}
    >
      <div ref={textRef} className="rogu-text-message-item-body__inner">
        {message?.split(/\r/).map((word, i) =>
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
