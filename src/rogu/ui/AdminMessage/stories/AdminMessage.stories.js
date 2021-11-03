import React from 'react';
import AdminMessage from '../index.jsx';
import COLOR_SET from '../../../../../__mocks__/themeMock';
import { STRING_SET } from '../../../../../__mocks__/localizationMock';
import SendbirdProvider from '../../../../lib/Sendbird';

import dummyAdminMessage from '../adminMessageDummyData.mock';

export default { title: 'ruangkelas/UI Components/AdminMessage' };

export const adminMessage = () => (
  <SendbirdProvider colorSet={COLOR_SET} stringSet={STRING_SET}>
    <div style={{ backgroundColor: '#F1F7FF', padding: '1rem' }}>
      <AdminMessage message={dummyAdminMessage} />
    </div>
  </SendbirdProvider>
);
