import React from 'react';

import RepliedFileMessageItemBody from '../index.tsx';
import SendbirdProvider from '../../../../lib/Sendbird';

import COLOR_SET from '../../../../../__mocks__/themeMock';
import { STRING_SET } from '../../../../../__mocks__/localizationMock';

export default { title: 'ruangkelas/UI Components/RepliedFileMessageItemBody' };

export const outgoing = () => (
  <SendbirdProvider
    appId="dummy"
    userID="dummy"
    colorSet={COLOR_SET}
    stringSet={STRING_SET}
  >
    <RepliedFileMessageItemBody
      body="File Penting.pdf"
      isByMe={true}
      mimeType="application/pdf"
      nickname="Kukuh Sulistyo"
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
    <RepliedFileMessageItemBody
      body="File Penting.pdf"
      isByMe={false}
      mimeType="application/pdf"
      nickname="Kukuh Sulistyo"
      onClick={() => console.log('Scroll to the message')}
    />
  </SendbirdProvider>
);
