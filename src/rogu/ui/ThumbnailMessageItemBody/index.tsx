import React, { ReactElement } from "react";
import { FileMessage } from "sendbird";
import "./index.scss";

import Icon, { IconTypes, IconColors } from "../Icon";
import ImageRenderer from "../ImageRenderer";
import { getClassName, isGifMessage, isVideoMessage } from "../../../utils";

interface Props {
  className?: string | Array<string>;
  message: FileMessage;
  isByMe?: boolean;
  mouseHover?: boolean;
  showFileViewer?: (bool: boolean) => void;
  isClickable: boolean;
}

export default function ThumbnailMessageItemBody({
  className,
  message,
  isByMe = false,
  mouseHover = false,
  showFileViewer,
  isClickable = true,
}: Props): ReactElement {
  const { thumbnails = [] } = message;
  const thumbnailUrl: string = thumbnails.length > 0 ? thumbnails[0]?.url : "";

  return (
    <div
      className={getClassName([
        className,
        "rogu-thumbnail-message-item-body",
        isByMe ? "outgoing" : "incoming",
        mouseHover ? "mouse-hover" : "",
        message?.reactions?.length > 0 ? "reactions" : "",
      ])}
      onClick={() => {
        if (isClickable) showFileViewer(true);
      }}
    >
      <ImageRenderer
        className="rogu-thumbnail-message-item-body__thumbnail"
        url={thumbnailUrl || message?.url}
        alt={message?.type}
        width="100%"
        height="270px"
        placeHolder={(style) => (
          <div
            className="rogu-thumbnail-message-item-body__placeholder"
            style={style}
          >
            <div className="rogu-thumbnail-message-item-body__placeholder__icon">
              <Icon
                type={
                  isVideoMessage(message) ? IconTypes.PLAY : IconTypes.PHOTO
                }
                fillColor={IconColors.ON_BACKGROUND_2}
                width="34px"
                height="34px"
              />
            </div>
          </div>
        )}
      />
      {isVideoMessage(message) && !thumbnailUrl && (
        <video className="rogu-thumbnail-message-item-body__video">
          <source src={message?.url} type={message?.type} />
        </video>
      )}
      <div className="rogu-thumbnail-message-item-body__image-cover" />
      {(isVideoMessage(message) || isGifMessage(message)) && (
        <div className="rogu-thumbnail-message-item-body__icon-wrapper">
          <div className="rogu-thumbnail-message-item-body__icon-wrapper__icon">
            <Icon
              type={isVideoMessage(message) ? IconTypes.PLAY : IconTypes.GIF}
              fillColor={IconColors.ON_BACKGROUND_2}
              width="34px"
              height="34px"
            />
          </div>
        </div>
      )}
    </div>
  );
}
