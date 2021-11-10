import React from 'react';
import { shallow } from 'enzyme';

import MessageInput from '../index';

const noop = () => {};

describe('MessageInput', () => {
  it('should render upload icon if no text is present', () => {
    const component = shallow(
      <MessageInput
        onSendMessage={noop}
        value=""
        nickname="Kukuh Sulistyo"
        profileUrl="https://imgix3.ruangguru.com/assets/avatar/avatar|6371.png?w=360"
      />
    );
    // TODO: complete the test case
    // expect(
    //   component.find('.rogu-message-input--send').exists()
    // ).toBe(false);
    expect(component.find('.rogu-message-input__attach').exists()).toBe(true);
    // expect(component.find('.rogu-message-input--edit-action').exists()).toBe(
    //   false
    // );
  });

  it('should render send icon if text is present', () => {
    const component = shallow(
      <MessageInput
        onSendMessage={noop}
        value="example"
        nickname="Kukuh Sulistyo"
        profileUrl="https://imgix3.ruangguru.com/assets/avatar/avatar|6371.png?w=360"
      />
    );
    expect(component.find('.rogu-message-input__send').exists()).toBe(true);
    // TODO: complete the test case
    // expect(
    //   component.find('.rogu-message-input--attach').exists()
    // ).toBe(false);
    // expect(component.find('.rogu-message-input--edit-action').exists()).toBe(
    //   false
    // );
  });
});
