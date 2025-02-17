import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import MessageStatus, { MessageStatusTypes } from "../index";
import dummyMessage from '../messageDummyData.mock';

// mock date-fns to avoid problems from snapshot timestamping
// between testing in different locations
// ideally we want to mock date-fns globally - needs more research
jest.mock('date-fns/format', () => () => ('mock-date'));

describe('MessageStatus', () => {
  it('should contain className', function () {
    const text = "example-text";
    const component = shallow(<MessageStatus className={text} />);

    expect(
      component.find(".rogu-message-status").hasClass(text)
    ).toBe(true);
  });

  it('should do a snapshot test of the MessageStatus DOM', function () {
    const text = "example-text";
    const component = renderer.create(
      <MessageStatus className={text} status={MessageStatusTypes.SENT} message={dummyMessage} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should do a snapshot test of the failed MessageStatus DOM when isResendable: true', function () {
    const text = "example-text";
    const failedMsg = {
      ...dummyMessage,
      isResendable: () => { return true; },
    };
    const component = renderer.create(
      <MessageStatus className={text} status={MessageStatusTypes.FAILED} message={failedMsg} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should do a snapshot test of the failed MessageStatus DOM when isResendable: false', function () {
    const text = "example-text";
    const failedMsg = {
      ...dummyMessage,
    };
    const component = renderer.create(
      <MessageStatus className={text} status={MessageStatusTypes.FAILED} message={failedMsg} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
