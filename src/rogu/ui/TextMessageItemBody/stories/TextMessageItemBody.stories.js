import React from "react";

import TextMessageItemBody from "../index.tsx";

import { LONG_MESSAGE } from "../../../../../__mocks__/messagesMock";

export default { title: "ruangkelas/UI Components/TextMessageItemBody" };

export const withText = () => (
  <div style={{ maxWidth: "35rem" }}>
    <TextMessageItemBody
      // message={{
      //   message:
      //     "This is an outgoing message. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      //   sender: {
      //     userId: "hoon-army-001",
      //   },
      //   messageType: "user",
      //   updatedAt: 0,
      // }}
      message="This is an outgoing message. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
      isByMe
    />
    <br />
    <br />

    <TextMessageItemBody
      // message={{
      //   message: "This is a long outgoing message. " + LONG_MESSAGE.message,
      //   sender: {
      //     userId: "hoon-army-002",
      //   },
      //   messageType: "user",
      //   updatedAt: 0,
      // }}
      message={"This is a long outgoing message. " + LONG_MESSAGE.message}
      isByMe
    />

    <br />
    <br />
    <TextMessageItemBody
      // message={{
      //   message: "This is a long incoming message. " + LONG_MESSAGE.message,
      //   sender: {
      //     userId: "hoon-army-002",
      //   },
      //   messageType: "user",
      //   updatedAt: 0,
      // }}
      message={"This is a long incoming message. " + LONG_MESSAGE.message}
      isByMe={false}
    />
  </div>
);
