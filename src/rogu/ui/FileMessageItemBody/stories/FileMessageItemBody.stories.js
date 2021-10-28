import React from 'react';

import FileMessageItemBody from '../index.tsx';

import {
  FILE_MESSAGE,
  FILE_MESSAGE_DOC,
  FILE_MESSAGE_DOCX,
  FILE_MESSAGE_XLS,
  FILE_MESSAGE_XLSX,
  FILE_MESSAGE_PPT,
  FILE_MESSAGE_PPTX,
  FILE_MESSAGE_PDF,
} from '../../../../../__mocks__/messagesMock';

export default { title: 'ruangkelas/UI Components/FileMessageItemBody' };

export const withText = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <FileMessageItemBody message={FILE_MESSAGE_DOC} />
    <FileMessageItemBody message={FILE_MESSAGE_DOCX} isByMe={true} />
    <FileMessageItemBody message={FILE_MESSAGE_XLS} />
    <FileMessageItemBody message={FILE_MESSAGE_XLSX} isByMe={true} />
    <FileMessageItemBody message={FILE_MESSAGE_PPT} />
    <FileMessageItemBody message={FILE_MESSAGE_PPTX} isByMe={true} />
    <FileMessageItemBody message={FILE_MESSAGE_PDF} />
    <FileMessageItemBody message={FILE_MESSAGE} />
  </div>
);
