export { default as SendBirdProvider } from './SendbirdProvider.js';
export { default as App } from './App.js';
export { default as ChannelSettings } from './ChannelSettings.js';
export { default as ChannelList } from './ChannelList.js';
export { default as Channel, getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer } from './Channel.js';
import { S as SendbirdSdkContext } from './LocalizationContext-a46e6f0b.js';
export { g as getStringSet, w as withSendBird } from './LocalizationContext-a46e6f0b.js';
export { default as OpenChannel } from './OpenChannel.js';
export { default as OpenChannelSettings } from './OpenChannelSettings.js';
export { default as MessageSearch } from './MessageSearch.js';
export { s as sendBirdSelectors } from './index-83f4c9fd.js';
import { useContext } from 'react';
import 'prop-types';
import 'sendbird';
import './actionTypes-c1f7f7c1.js';
import 'css-vars-ponyfill';
import './index-1ed0a81a.js';
import './LeaveChannel-c089a7db.js';
import './index-6682ea9b.js';
import './index-5c5ad7a8.js';
import './utils-62f02f5e.js';
import './index-653a296f.js';
import './index-077d5a4f.js';
import './index-6906bfcb.js';
import './index-474c0677.js';
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
