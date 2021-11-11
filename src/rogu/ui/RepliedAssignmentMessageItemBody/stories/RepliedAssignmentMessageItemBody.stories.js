import React from 'react';

import RepliedAssignmentMessageItemBody from '../index.tsx';
import SendbirdProvider from '../../../../lib/Sendbird';

import COLOR_SET from '../../../../../__mocks__/themeMock';
import { STRING_SET } from '../../../../../__mocks__/localizationMock';

export default {
  title: 'ruangkelas/UI Components/RepliedAssignmentMessageItemBody',
};

export const outgoing = () => (
  <SendbirdProvider
    appId="dummy"
    userID="dummy"
    colorSet={COLOR_SET}
    stringSet={STRING_SET}
  >
    <RepliedAssignmentMessageItemBody
      body="Tugas 4: Kalimat Majemuk"
      isByMe={true}
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
    <RepliedAssignmentMessageItemBody
      body="Tugas 4: Kalimat Majemuk"
      isByMe={false}
      nickname="Kukuh Sulistyo"
      onClick={() => console.log('Scroll to the message')}
    />
  </SendbirdProvider>
);
