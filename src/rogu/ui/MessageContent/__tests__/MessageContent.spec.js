import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import MessageContent from "../index";

import {
  BASIC_MESSAGE_A_1,
  USER_ID_A,
} from "../../../../../__mocks__/messagesMock";

describe("MessageContent", () => {
  it("should do a snapshot test of the MessageContent DOM", function () {
    const component = renderer.create(
      <MessageContent
        userId={"random-user-id"}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={BASIC_MESSAGE_A_1}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be rendered with the classname of `.rogu-message-content`", function () {
    const component = shallow(
      <MessageContent
        userId={"random-user-id"}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={BASIC_MESSAGE_A_1}
      />
    );
    expect(component.hasClass("rogu-message-content")).toBe(true);
  });

  it("should be rendered with the className of `.rogu-message-content--incoming` to outgoing message", function () {
    const component = shallow(
      <MessageContent
        userId={"random-user-id"}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={BASIC_MESSAGE_A_1}
      />
    );
    expect(component.hasClass("rogu-message-content--incoming")).toBe(true);
  });

  it("should be rendered with the className of `.rogu-message-content--outgoing` to incoming message", function () {
    const component = shallow(
      <MessageContent
        userId={USER_ID_A}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={BASIC_MESSAGE_A_1}
      />
    );
    expect(component.hasClass("rogu-message-content--outgoing")).toBe(true);
  });

  it("should be rendered with the className of `.rogu-message-content--chain-bottom` if chainBottom is true", function () {
    const component = shallow(
      <MessageContent
        userId={"random-user-id"}
        chainBottom={true}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={BASIC_MESSAGE_A_1}
      />
    );
    expect(component.hasClass("rogu-message-content--chain-bottom")).toBe(true);
  });

  it("should be rendered with the className of `.rogu-message-content--chain-top` if chainTop is true", function () {
    const component = shallow(
      <MessageContent
        userId={"random-user-id"}
        chainTop={true}
        channel={{
          isGroupChannel: () => true,
          getUnreadMemberCount: (_) => 10,
          getUndeliveredMemberCount: (_) => 0,
        }}
        message={BASIC_MESSAGE_A_1}
      />
    );
    expect(component.hasClass("rogu-message-content--chain-top")).toBe(true);
  });
});
