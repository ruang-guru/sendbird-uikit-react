import React, { useRef, useState } from "react";
import SendbirdProvider from "../../../../../lib/Sendbird";

import Notification from "../Notification";
import COLOR_SET from "../../../../../../__mocks__/themeMock";

export default { title: "ruangkelas/Smart Components/Conversation" };

export const UnreadNotification = () => (
  <SendbirdProvider
    colorSet={COLOR_SET}
  >
    <div style={{ height: "100vh" }}>
      <Notification count={5} time="16.42 24 October 2021" onClick={() => { }} />
    </div>
  </SendbirdProvider>
);
