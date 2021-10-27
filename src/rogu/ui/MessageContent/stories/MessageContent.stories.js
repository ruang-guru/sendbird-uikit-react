import React from "react";

import MessageContent from "../index.tsx";

import SendbirdProvider from "../../../../lib/Sendbird";
import { MenuRoot } from "../../../../ui/ContextMenu";

import COLOR_SET from "../../../../../__mocks__/themeMock";
import { STRING_SET } from "../../../../../__mocks__/localizationMock";
import {
  BASIC_MESSAGE,
  BASIC_MESSAGE_A_1,
  BASIC_MESSAGE_A_2,
  BASIC_MESSAGE_A_3,
  LONG_MESSAGE,
  LONG_MESSAGE_A_1,
  OPERATOR_MESSAGE,
  USER_ID_A,
  ASSIGNMENT_MESSAGE_A_1,
  ASSIGNMENT_MESSAGE_A_2,
  MATERIAL_MESSAGE_A_1,
  MATERIAL_MESSAGE_A_2,
} from "../../../../../__mocks__/messagesMock";

export default { title: "ruangkelas/UI Components/MessageContent" };

export const Basic = () => (
  <SendbirdProvider colorSet={COLOR_SET} stringSet={STRING_SET}>

    <div style={{ backgroundColor: "#F1F7FF", padding: "1rem" }}>
      <MessageContent
        userId={"random-user-id"}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={BASIC_MESSAGE_A_1}
      />

      <MessageContent
        userId={USER_ID_A}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={BASIC_MESSAGE_A_1}
      />

      <MenuRoot />
    </div>
  </SendbirdProvider>
);

export const Chaining = () => (
  <SendbirdProvider colorSet={COLOR_SET} stringSet={STRING_SET}>
    <div style={{ backgroundColor: "#F1F7FF", padding: "1rem" }}>
      <MessageContent
        userId={"user-random-xxx"}
        message={BASIC_MESSAGE_A_1}
        chainTop={false}
        chainBottom={true}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
      />
      <MessageContent
        userId={"user-random-xxx"}
        message={BASIC_MESSAGE_A_2}
        chainTop={true}
        chainBottom={true}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
      />
      <MessageContent
        userId={"user-random-xxx"}
        message={BASIC_MESSAGE_A_3}
        chainTop={true}
        chainBottom={false}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
      />
      <MessageContent
        userId={USER_ID_A}
        message={BASIC_MESSAGE_A_1}
        chainTop={false}
        chainBottom={true}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
      />
      <MessageContent
        userId={USER_ID_A}
        message={BASIC_MESSAGE_A_2}
        chainTop={true}
        chainBottom={true}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
      />
      <MessageContent
        userId={USER_ID_A}
        message={BASIC_MESSAGE_A_3}
        chainTop={true}
        chainBottom={false}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
      />
      <MenuRoot />
    </div>
  </SendbirdProvider>
);

export const ClampedMessage = () => (
  <SendbirdProvider colorSet={COLOR_SET} stringSet={STRING_SET}>
    <div style={{ backgroundColor: "#F1F7FF", padding: "1rem" }}>
      <MessageContent
        userId={USER_ID_A}
        message={LONG_MESSAGE}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
      />
      <MessageContent
        userId={USER_ID_A}
        message={LONG_MESSAGE_A_1}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
      />
      <MenuRoot />
    </div>
  </SendbirdProvider>
);

export const NicknameColoring = () => (
  <SendbirdProvider colorSet={COLOR_SET}>
    <div style={{ backgroundColor: "#F1F7FF", padding: "1rem" }}>
      <MessageContent
        userId={"random-user-id"}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={{
          ...BASIC_MESSAGE,
          sender: { ...BASIC_MESSAGE.sender, nickname: "Agus Marto Wardoyo" },
        }}
      />
      <MessageContent
        userId={"random-user-id"}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={{
          ...BASIC_MESSAGE,
          sender: { ...BASIC_MESSAGE.sender, nickname: "Ekawati Hikmah" },
        }}
      />
      <MessageContent
        userId={"random-user-id"}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={{
          ...BASIC_MESSAGE,
          sender: { ...BASIC_MESSAGE.sender, nickname: "Kukuh Aji Sulistyo" },
        }}
      />
      <MessageContent
        userId={"random-user-id"}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={{
          ...BASIC_MESSAGE,
          sender: { ...BASIC_MESSAGE.sender, nickname: "Muhammad Abdul Abadi" },
        }}
      />
      <MessageContent
        userId={"random-user-id"}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={{
          ...BASIC_MESSAGE,
          sender: { ...BASIC_MESSAGE.sender, nickname: "Rashley Yeremia" },
        }}
      />

      <MessageContent
        userId={"random-user-id"}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={{
          ...BASIC_MESSAGE,
          sender: {
            ...BASIC_MESSAGE.sender,
            nickname: "Untari Wahyuni Mawardhi",
          },
        }}
      />

      <MessageContent
        userId={"random-user-id"}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={{
          ...BASIC_MESSAGE,
          sender: { ...BASIC_MESSAGE.sender, nickname: "Yazid Hafizh" },
        }}
      />
      <MenuRoot />
    </div>
  </SendbirdProvider>
);


export const Assignment = () => (
  <SendbirdProvider colorSet={COLOR_SET}>
    <div style={{ backgroundColor: "#F1F7FF", padding: "1rem" }}>
      <MessageContent
        userId={"random-user-id"}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={ASSIGNMENT_MESSAGE_A_1}
      />
      <MessageContent
        userId={USER_ID_A}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={ASSIGNMENT_MESSAGE_A_2}
      />

    </div>
  </SendbirdProvider>
);

export const Material = () => (
  <SendbirdProvider colorSet={COLOR_SET}>
    <div style={{ backgroundColor: "#F1F7FF", padding: "1rem" }}>
      <MessageContent
        userId={"random-user-id"}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={MATERIAL_MESSAGE_A_1}
      />
      <MessageContent
        userId={USER_ID_A}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={MATERIAL_MESSAGE_A_2}
      />

    </div>
  </SendbirdProvider>
);

export const OperatorMessage = () => (
  <SendbirdProvider colorSet={COLOR_SET} stringSet={STRING_SET}>
    <div style={{ backgroundColor: "#F1F7FF", padding: "1rem" }}>
      <MessageContent
        userId={"random-user-id"}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={OPERATOR_MESSAGE}
      />

      <MenuRoot />
    </div>
  </SendbirdProvider>
);

export const MediaPreviewMessage = () => (
  <SendbirdProvider colorSet={COLOR_SET} stringSet={STRING_SET}>
    <div style={{ backgroundColor: "#F1F7FF", padding: "1rem" }}>
      <MessageContent
        userId={"random-user-id"}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={OPERATOR_MESSAGE}
      />

      <MenuRoot />
    </div>
  </SendbirdProvider>
);
