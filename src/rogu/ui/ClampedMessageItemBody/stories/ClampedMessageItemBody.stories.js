import React from "react";

import ClampedMessageItemBody from "../index.tsx";

import { LONG_MESSAGE } from "../../../../../__mocks__/messagesMock";

export default { title: "ruangkelas/UI Components/ClampedMessageItemBody" };

export const withText = () => (
  <div style={{ maxWidth: "35rem" }}>
    <ClampedMessageItemBody
      content="This is an outgoing message. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      isByMe
    />
    <br />
    <br />

    <ClampedMessageItemBody
      content={"This is a long outgoing message. " + LONG_MESSAGE.message}
      isByMe
    />

    <br />
    <br />
    <ClampedMessageItemBody
      content={"This is a long incoming message. " + LONG_MESSAGE.message}
      isByMe={false}
    />
  </div>
);
