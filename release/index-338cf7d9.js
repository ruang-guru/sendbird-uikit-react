import React__default, { useMemo } from 'react';
import { a as Icon, b as IconTypes, a9 as IconColors, a5 as Avatar } from './index-7fd309fe.js';
import { u as useDefaultAvatar, g as getChannelAvatarSource } from './utils-74869f1f.js';

function ChannelAvatar(_a) {
  var channel = _a.channel,
      userId = _a.userId,
      theme = _a.theme,
      _b = _a.width,
      width = _b === void 0 ? 56 : _b,
      _c = _a.height,
      height = _c === void 0 ? 56 : _c;
  var isBroadcast = channel.isBroadcast;
  var memoizedAvatar = useMemo(function () {
    return isBroadcast ? useDefaultAvatar(channel) ? /*#__PURE__*/React__default.createElement("div", {
      className: "sendbird-chat-header--default-avatar",
      style: {
        width: width,
        height: height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React__default.createElement(Icon, {
      type: IconTypes.BROADCAST,
      fillColor: IconColors.CONTENT,
      width: width * 0.575,
      height: height * 0.575
    })) : /*#__PURE__*/React__default.createElement(Avatar, {
      className: "sendbird-chat-header--avatar--broadcast-channel",
      src: getChannelAvatarSource(channel, userId),
      width: width,
      height: height,
      alt: channel.name
    }) : /*#__PURE__*/React__default.createElement(Avatar, {
      className: "sendbird-chat-header--avatar--group-channel",
      src: getChannelAvatarSource(channel, userId),
      width: width + "px",
      height: height + "px",
      alt: channel.name
    });
  }, [channel.members, channel.coverUrl, theme]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, memoizedAvatar);
}

export { ChannelAvatar as C };
//# sourceMappingURL=index-338cf7d9.js.map
