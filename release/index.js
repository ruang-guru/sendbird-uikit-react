export { default as SendBirdProvider } from './SendbirdProvider.js';
export { default as App } from './App.js';
export { default as ChannelSettings } from './ChannelSettings.js';
export { default as ChannelList } from './ChannelList.js';
export { default as Channel, getAllEmojisFromEmojiContainer, getEmojiCategoriesFromEmojiContainer, getEmojisFromEmojiContainer } from './Channel.js';
import { S as SendbirdSdkContext } from './LocalizationContext-ad24a23c.js';
export { g as getStringSet, w as withSendBird } from './LocalizationContext-ad24a23c.js';
export { default as OpenChannel } from './OpenChannel.js';
export { default as OpenChannelSettings } from './OpenChannelSettings.js';
export { default as MessageSearch } from './MessageSearch.js';
export { s as sendBirdSelectors } from './index-fdb4da25.js';
import { useContext } from 'react';
import 'prop-types';
import 'sendbird';
import './actionTypes-639b680d.js';
import 'css-vars-ponyfill';
import './index-9b47b921.js';
import './LeaveChannel-c73c4f8a.js';
import './index-27ace2cf.js';
import './index-3d7e6458.js';
import './utils-1e867fdd.js';
import './index-a31d01a5.js';
import './index-877fee0e.js';
import './index-9db978fb.js';
import './index-96985754.js';
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
