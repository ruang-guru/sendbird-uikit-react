import React from 'react';

import RepliedTextmessageItemBody from '../index.tsx';
import SendbirdProvider from '../../../../lib/Sendbird';

import COLOR_SET from '../../../../../__mocks__/themeMock';
import { STRING_SET } from '../../../../../__mocks__/localizationMock';

export default { title: 'ruangkelas/UI Components/RepliedTextMessageItemBody' };

export const outgoing = () => (
  <SendbirdProvider
    appId="dummy"
    userID="dummy"
    colorSet={COLOR_SET}
    stringSet={STRING_SET}
  >
    <RepliedTextmessageItemBody
      content="This is an outgoing message. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      isByMe={true}
      nickname="Fauzan"
      onClick={() => console.log('Scroll to the message')}
    />
  </SendbirdProvider>
);

export const incoming = () => (
  <SendbirdProvider
    appId="dummy"
    userID="dummy"
    colorSet={COLOR_SET}
    stringSet={STRING_SET}
  >
    <RepliedTextmessageItemBody
      content="This is an incoming message. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      isByMe={false}
      nickname="Fauzan"
      onClick={() => console.log('Scroll to the message')}
    />
  </SendbirdProvider>
);
