export { default as SendBirdProvider } from './SendbirdProvider.js';
export { default as App } from './App.js';
export { default as ChannelSettings } from './ChannelSettings.js';
export { default as ChannelList } from './ChannelList.js';
export { default as Channel, getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer } from './Channel.js';
import { S as SendbirdSdkContext } from './LocalizationContext-ff18809f.js';
export { g as getStringSet, w as withSendBird } from './LocalizationContext-ff18809f.js';
export { default as OpenChannel } from './OpenChannel.js';
export { default as OpenChannelSettings } from './OpenChannelSettings.js';
export { default as MessageSearch } from './MessageSearch.js';
export { s as sendBirdSelectors } from './index-64e752e5.js';
import { useContext } from 'react';
import 'prop-types';
import 'sendbird';
import './actionTypes-d1ff0d32.js';
import 'css-vars-ponyfill';
import './index-6dfc306e.js';
import './LeaveChannel-682dd463.js';
import './index-7c9ecdfd.js';
import './index-e56b5023.js';
import './utils-1c8195a2.js';
import './index-85c14f31.js';
import './index-ce126f8c.js';
import './index-758d29bc.js';
import './index-91d6af1c.js';
import 'react-dom';

/**
 * Example:
 * const MyComponent = () => {
 *  const context = useSendbirdStateContext();
 *  const sdk = sendbirdSelectors.getSdk(context);
 *  return (<div>...</div>);
 * }
 */

function useSendbirdStateContext() {
  var context = useContext(SendbirdSdkContext);
  return context;
}

export { useSendbirdStateContext };
//# sourceMappingURL=index.js.map
