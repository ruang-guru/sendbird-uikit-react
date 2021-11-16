import React, { ReactElement, useContext } from 'react';
import { UserMessage } from 'sendbird';
import './index.scss';

import LinkLabel from '../../../ui/LinkLabel';
import ImageRenderer from '../../../ui/ImageRenderer';

import {
  getClassName,
  isEditedMessage,
  isUrl,
} from '../../../utils';
import uuidv4 from '../../../utils/uuid';
import { LocalizationContext } from '../../../lib/LocalizationContext';

import Label, { LabelTypography, LabelColors } from '../Label';
import Icon, { IconTypes, IconColors } from '../Icon';

import IconButton from '../IconButton';

interface Props {
  className?: string | Array<string>;
  message: UserMessage;
  isByMe?: boolean;
  mouseHover?: boolean;
  isOnPreview?: boolean;
  onClosePreview?: () => void;
}

export default function OGMessageItemBody({
  className,
  message,
  isByMe = false,
  mouseHover = false,
  isOnPreview = false,
  onClosePreview,
}: Props): ReactElement {
  const { stringSet } = useContext(LocalizationContext);
  const openOGUrl = (): void => {
    if (message?.ogMetaData?.url) window.open(message?.ogMetaData?.url);
  };

  return (
    <div className={getClassName([
      className,
      'rogu-og-message-item-body',
      isByMe ? 'rogu-og-message--outgoing' : 'rogu-og-message--incoming',
      isOnPreview ? 'rogu-og-message-item-body--preview' : '',
      mouseHover ? 'mouse-hover' : '',
      message?.reactions?.length > 0 ? 'rogu-og-message-reactions' : '',
    ])}>

      <div className="rogu-og-message-item-body__og-wrapper" >
        <div className="rogu-og-message-item-body__og-container" onClick={openOGUrl}>
          <div
            className="rogu-og-message-item-body__og-thumbnail"
          >
            <ImageRenderer
              className="rogu-og-message-item-body__og-thumbnail__image"
              url={message?.ogMetaData?.defaultImage?.url || ''}
              alt={message?.ogMetaData?.defaultImage?.alt}
              width="60px"
              height="60px"
              defaultComponent={(
                <div className="rogu-og-message-item-body__og-thumbnail__place-holder">
                  <Icon
                    className="rogu-og-message-item-body__og-thumbnail__place-holder__icon"
                    type={IconTypes.THUMBNAIL_NONE}
                    width="60px"
                    height="60px"
                  />
                </div>
              )}
            />
          </div>
          <div className="rogu-og-message-item-body__description">
            {message?.ogMetaData?.title && (
              <Label
                className="rogu-og-message-item-body__description__title"
                type={LabelTypography.SUBTITLE_2}
                color={LabelColors.ONBACKGROUND_1}
              >
                {message.ogMetaData.title}
              </Label>
            )}
            {message?.ogMetaData?.description && (
              <Label
                className="rogu-og-message-item-body__description__description"
                type={LabelTypography.BODY_2}
                color={LabelColors.ONBACKGROUND_1}
              >
                {message.ogMetaData.description}
              </Label>
            )}
            {message?.ogMetaData?.url && (
              <Label
                className="rogu-og-message-item-body__description__url"
                type={LabelTypography.CAPTION_3}
                color={LabelColors.ONBACKGROUND_2}
              >
                {message.ogMetaData.url}
              </Label>
            )}
          </div>
        </div>
        {
          isOnPreview && <IconButton
            className="sendbird-chat-header__right__search"
            width="32px"
            height="32px"
            onClick={onClosePreview}
          >
            <Icon
              type={IconTypes.CLOSE}
              fillColor={IconColors.ON_BACKGROUND_1}
              width="24px"
              height="24px"
            />
          </IconButton>
        }
      </div>

      <div className="rogu-og-message-item-body__text-bubble">
        {message?.message.split(' ').map((word: string) => (
          isUrl(word)
            ? (
              <LinkLabel
                className="rogu-og-message-item-body__text-bubble__message"
                key={uuidv4()}
                src={word}
                type={LabelTypography.BODY_1}
                color={isByMe ? LabelColors.ONBACKGROUND_1 : LabelColors.SECONDARY_3}
              >
                {word}
              </LinkLabel>
            )
            : (
              <Label
                className="rogu-og-message-item-body__text-bubble__message"
                key={uuidv4()}
                type={LabelTypography.BODY_1}
                color={LabelColors.ONBACKGROUND_1}
              >
                {word + ' '}
              </Label>
            )
        )
        )}
        {isEditedMessage(message) && (
          <Label
            className="rogu-og-message-item-body__text-bubble__message"
            type={LabelTypography.BODY_1}
            color={isByMe ? LabelColors.ONCONTENT_2 : LabelColors.ONBACKGROUND_2}
          >
            {` ${stringSet.MESSAGE_EDITED} `}
          </Label>
        )}
      </div>
      <div className="rogu-og-message-item-body__cover" />
    </div>
  );
}
