import React from 'react';

import RepliedTextmessageItemBody from '../index.tsx';
import SendbirdProvider from '../../../../lib/Sendbird';

import COLOR_SET from '../../../../../__mocks__/themeMock';
import { STRING_SET } from '../../../../../__mocks__/localizationMock';

export default { title: 'ruangkelas/UI Components/RepliedTextmessageItemBody' };

export const outgoing = () => (
  <SendbirdProvider
    appId="dummy"
    userID="dummy"
    colorSet={COLOR_SET}
    stringSet={STRING_SET}
  >
    <RepliedTextmessageItemBody
      isByMe={true}
      message="This is an outgoing message. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
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
      isByMe={false}
      message="This is an incoming message. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      nickname="Fauzan"
      onClick={() => console.log('Scroll to the message')}
    />
  </SendbirdProvider>
);
