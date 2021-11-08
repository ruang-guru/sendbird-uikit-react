import React from 'react';

import TextMessageItemBody from '../index';

import { LONG_MESSAGE } from '../../../../../__mocks__/messagesMock';

export default { title: 'ruangkelas/UI Components/TextMessageItemBody' };

export const withText = () => (
  <div style={{ maxWidth: '35rem' }}>
    <TextMessageItemBody
      message="This is an outgoing message. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      isByMe
    />
    <br />
    <br />

    <TextMessageItemBody
      message={'This is a long outgoing message. ' + LONG_MESSAGE.message}
      isByMe
    />

    <br />
    <br />
    <TextMessageItemBody
      message={'This is a long incoming message. ' + LONG_MESSAGE.message}
      isByMe={false}
    />
  </div>
);
