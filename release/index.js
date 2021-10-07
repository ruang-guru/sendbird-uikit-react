export { default as SendBirdProvider } from './SendbirdProvider.js';
export { default as App } from './App.js';
export { default as ChannelSettings } from './ChannelSettings.js';
export { default as ChannelList } from './ChannelList.js';
export { default as Channel, getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer } from './Channel.js';
import { S as SendbirdSdkContext } from './LocalizationContext-26bf9256.js';
export { g as getStringSet, w as withSendBird } from './LocalizationContext-26bf9256.js';
export { default as OpenChannel } from './OpenChannel.js';
export { default as OpenChannelSettings } from './OpenChannelSettings.js';
export { default as MessageSearch } from './MessageSearch.js';
export { s as sendBirdSelectors } from './index-844e790f.js';
import { useContext } from 'react';
import 'prop-types';
import 'sendbird';
import './actionTypes-411bd3db.js';
import 'css-vars-ponyfill';
import './index-cc114828.js';
import './LeaveChannel-b98abd31.js';
import './index-23047271.js';
import './index-2c7e8f74.js';
import './utils-e8be8032.js';
import './index-7f9be8e8.js';
import './index-40a81d90.js';
import './index-e9940cf5.js';
import './index-6caf0938.js';
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
