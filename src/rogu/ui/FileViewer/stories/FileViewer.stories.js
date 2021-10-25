import React from 'react';
import FileViewer from '../index.jsx';

export default { title: 'ruangkelas/UI Components/FileViewer' };

import SendbirdProvider from '../../../../lib/Sendbird';
import { msg1, msg0 } from '../data.mock';
import COLOR_SET from '../../../../../__mocks__/themeMock';

export const imageViewer = () => (
  <SendbirdProvider colorSet={COLOR_SET}>
    <FileViewer onClose={() => {}} onDelete={() => {}} message={msg0} />
  </SendbirdProvider>
);
export const movieViewer = () => (
  <SendbirdProvider colorSet={COLOR_SET}>
    <FileViewer onClose={() => {}} onDelete={() => {}} message={msg1} />
  </SendbirdProvider>
);
export const unSupportedViewer = () => (
  <SendbirdProvider colorSet={COLOR_SET}>
    <FileViewer
      onClose={() => {}}
      onDelete={() => {}}
      message={{ sender: {} }}
    />
  </SendbirdProvider>
);
