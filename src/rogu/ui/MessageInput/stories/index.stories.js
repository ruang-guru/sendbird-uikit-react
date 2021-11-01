import React from 'react';

import MessageInput from '../index';
import SendbirdProvider from '../../../../lib/Sendbird';

import COLOR_SET from '../../../../../__mocks__/themeMock';
import { STRING_SET } from '../../../../../__mocks__/localizationMock';

export default { title: 'ruangkelas/ UI Components/MessageInput' };

export const basicMessageInput = () => {
  const ref = React.useRef();
  return (
    <SendbirdProvider
      appId="dummy"
      userID="dummy"
      colorSet={COLOR_SET}
      stringSet={STRING_SET}
    >
      <div>
        <MessageInput
          name="example"
          nickname="Kukuh Sulistyo"
          profileUrl="https://imgix3.ruangguru.com/assets/avatar/avatar|6371.png?w=360"
          ref={ref}
        />
      </div>
    </SendbirdProvider>
  );
};

// export const messageInputEdit = () => {
//   const ref = React.useRef();
//   return (
//     <MessageInput isEdit name="example" ref={ref} />
//   )
// };

export const disabledMessageInput = () => {
  const ref = React.useRef();
  return (
    <SendbirdProvider
      appId="dummy"
      userID="dummy"
      colorSet={COLOR_SET}
      stringSet={STRING_SET}
    >
      <MessageInput disabled name="example" ref={ref} />
    </SendbirdProvider>
  );
};
