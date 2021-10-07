export { default as SendBirdProvider } from './SendbirdProvider.js';
export { default as App } from './App.js';
export { default as ChannelSettings } from './ChannelSettings.js';
export { default as ChannelList } from './ChannelList.js';
export { default as Channel, getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer } from './Channel.js';
import { S as SendbirdSdkContext } from './LocalizationContext-b073aeea.js';
export { g as getStringSet, w as withSendBird } from './LocalizationContext-b073aeea.js';
export { default as OpenChannel } from './OpenChannel.js';
export { default as OpenChannelSettings } from './OpenChannelSettings.js';
export { default as MessageSearch } from './MessageSearch.js';
export { s as sendBirdSelectors } from './index-61201d73.js';
import { useContext } from 'react';
import 'prop-types';
import 'sendbird';
import './actionTypes-0cb19ca5.js';
import 'css-vars-ponyfill';
import './index-6d440ba8.js';
import './LeaveChannel-1277d0a7.js';
import './index-5d32da31.js';
import './index-bd84968c.js';
import './utils-39dc6719.js';
import './index-264207ae.js';
import './index-58c41608.js';
import './index-d4c8ee84.js';
import './index-d6720ae1.js';
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
