import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

import Label, { LabelTypography, LabelColors } from '../Label';
import { getClassName } from '../../../utils';

import MenuItems_ from './items/MenuItems';

import Icon, { IconTypes, IconColors } from '../Icon';

const ENTER = 13;

export const MenuItems = MenuItems_;

export const MenuItem = ({
  className,
  children,
  onClick,
  disable,
  iconType,
}) => {
  const handleClickEvent = (e) => { if (!disable) onClick(e); };
  return (
    <li
      className={getClassName([className, 'rogu-dropdown__menu-item', disable ? 'disable' : ''])}
      role="menuitem"
      onClick={handleClickEvent}
      onKeyPress={(e) => { if (e.keyCode === ENTER) handleClickEvent(e); }}
      tabIndex={0}
    >
      <Icon
        className="rogu-dropdown__menu-item-icon"
        type={iconType}
        fillColor={disable ? IconColors.ON_BACKGROUND_3 : IconColors.ON_BACKGROUND_1}
        width="18px"
        height="18px"
      />
      <Label
        className="rogu-dropdown__menu-item__text"
        type={LabelTypography.BUTTON_2}
        color={disable ? LabelColors.ONBACKGROUND_4 : LabelColors.ONBACKGROUND_1}
      >
        {children}
      </Label>
    </li>
  );
};

MenuItem.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  disable: PropTypes.func,
  iconType: IconTypes,
};

MenuItem.defaultProps = {
  className: '',
  disable: false,
  iconType: IconTypes.ADD,
};

// Root components should be appended before ContextMenu is rendered
export const MenuRoot = () => (
  <div id="sendbird-dropdown-portal" />
);
export const EmojiReactionListRoot = () => (
  <div id="sendbird-emoji-list-portal" />
);

export default function ContextMenu({ menuTrigger, menuItems }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="sendbird-context-menu" style={{ display: 'inline' }}>
      {menuTrigger(() => setShowMenu(!showMenu))}
      {showMenu && menuItems(() => setShowMenu(false))}
    </div>
  );
}

ContextMenu.propTypes = {
  menuTrigger: PropTypes.func.isRequired,
  menuItems: PropTypes.func.isRequired,
};
