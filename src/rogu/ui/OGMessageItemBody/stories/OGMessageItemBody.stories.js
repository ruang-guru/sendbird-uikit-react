import React from 'react';

import OGMessageItemBody from '../index.tsx';
import SendbirdProvider from '../../../../lib/Sendbird';

import COLOR_SET from '../../../../../__mocks__/themeMock';
import STRING_SET from '../../../../../__mocks__/localizationMock';
import { OG_MESSAGE } from '../../../../../__mocks__/messagesMock';

export default { title: 'ruangkelas/UI Components/OGMessageItemBody' };

export const withText = () => (
  <>
    <SendbirdProvider
      appId="dummy"
      userID="dummy"
      colorSet={COLOR_SET}
      stringSet={STRING_SET}
    >
      <OGMessageItemBody message={OG_MESSAGE} isByMe />
    </SendbirdProvider>
    <br />
    <br />

    <SendbirdProvider
      appId="dummy"
      userID="dummy"
      colorSet={COLOR_SET}
      stringSet={STRING_SET}
    >
      <OGMessageItemBody message={OG_MESSAGE} isByMe={false} />
    </SendbirdProvider>
  </>
);
