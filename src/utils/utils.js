import format from 'date-fns/format';

export const noop = () => {};

export const getMessageCreatedAt = (message) => format(message.createdAt, 'p');

export const getSenderName = (message) => message.sender
  && (message.sender.friendName
    || message.sender.nickname
    || message.sender.userId);

export const isIOSWebView = () => {
  let checkIOSWebView = false;

  const platform = navigator?.userAgentData?.platform || navigator?.platform || 'unknown';

  if (platform.substr(0, 2) === 'iP') {
    // iOS (iPhone, iPod or iPad)
    const lte9 = /constructor/i.test(window.HTMLElement);
    const nav = window.navigator;
    const ua = nav.userAgent;
    const idb = !!window.indexedDB;

    if (
      ua.indexOf('Safari') !== -1
      && ua.indexOf('Version') !== -1
      && !nav.standalone
    ) {
      // Safari (WKWebView/Nitro since 6+)
      checkIOSWebView = false;
    } else if ((!idb && lte9) || !window.statusbar.visible) {
      // UIWebView
      checkIOSWebView = true;
    } else if (
      (window.webkit && window.webkit.messageHandlers)
      || !lte9
      || idb
    ) {
      // WKWebView
      checkIOSWebView = true;
    }
  }

  return checkIOSWebView;
};

export const getSenderProfileUrl = (message) => message.sender && message.sender.profileUrl;

export default {
  getMessageCreatedAt,
  getSenderName,
  getSenderProfileUrl,
};
