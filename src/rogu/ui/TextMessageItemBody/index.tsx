import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  ReactElement,
} from "react";
import { UserMessage } from "sendbird";

import TextButton from "../TextButton";
import Label, { LabelTypography, LabelColors } from "../Label";
import { getClassName } from "../../../utils";
import { LocalizationContext } from "../../../lib/LocalizationContext";

import "./index.scss";

interface Props {
  className?: string | Array<string>;
  isByMe?: boolean;
  message: UserMessage;
}

type ClampType = "init" | "clamped" | "expanded";

export default function TextMessageItemBody({
  className,
  isByMe = false,
  message,
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
      ])}
    >
      <div ref={textRef} className="rogu-text-message-item-body__inner">
        {message?.message.split(/\r/).map((word, i) =>
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
          {stringSet.BUTTON__READ_MORE}
        </TextButton>
      )}
    </div>
  );
}
