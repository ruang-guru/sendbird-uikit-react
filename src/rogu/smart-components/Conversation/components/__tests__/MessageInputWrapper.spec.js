import React from 'react';
import { shallow } from 'enzyme';
import MessageInputWrapper from '../MessageInputWrapper';
import MessageInput from '../../../../ui/MessageInput';

describe('MessageInputWrapper', () => {
  it('should render renderMessageInput if present', () => {
    const component = shallow(
      <MessageInputWrapper
        channel={{}}
        user={{
          nickname: 'Kukuh Sulistyo',
          profileUrl:
            'https://imgix3.ruangguru.com/assets/avatar/avatar|6371.png?w=360',
        }}
        renderMessageInput={() => <div id="renderMessageInput"></div>}
      />
    );

    expect(component.find('#renderMessageInput').length).toEqual(1);
  });

  it('should render nothing if broadcast channel and not operator', () => {
    const component = shallow(
      <MessageInputWrapper
        channel={{
          isBroadcast: true,
          myRole: null,
        }}
        user={{
          nickname: 'Kukuh Sulistyo',
          profileUrl:
            'https://imgix3.ruangguru.com/assets/avatar/avatar|6371.png?w=360',
        }}
      />
    );

    expect(component.html()).toEqual(null);
  });

  it('should be disabled for normal user when frozen', () => {
    const component = shallow(
      <MessageInputWrapper
        channel={{
          isFrozen: true,
          myRole: null,
        }}
        isOnline={true}
        initialized={true}
        user={{
          nickname: 'Kukuh Sulistyo',
          profileUrl:
            'https://imgix3.ruangguru.com/assets/avatar/avatar|6371.png?w=360',
        }}
      />
    );

    expect(component.find(MessageInput).props().disabled).toEqual(true);
  });

  it('should be enabled for operator even when frozen', () => {
    const component = shallow(
      <MessageInputWrapper
        channel={{
          isFrozen: true,
          myRole: 'operator',
        }}
        isOnline={true}
        initialized={true}
        user={{
          nickname: 'Kukuh Sulistyo',
          profileUrl:
            'https://imgix3.ruangguru.com/assets/avatar/avatar|6371.png?w=360',
        }}
      />
    );

    expect(component.find(MessageInput).props().disabled).toEqual(false);
  });

  it('should be disabled if offline', () => {
    const component = shallow(
      <MessageInputWrapper
        channel={{}}
        isOnline={false}
        initialized={true}
        user={{
          nickname: 'Kukuh Sulistyo',
          profileUrl:
            'https://imgix3.ruangguru.com/assets/avatar/avatar|6371.png?w=360',
        }}
      />
    );

    expect(component.find(MessageInput).props().disabled).toEqual(true);
  });

  it('should be disabled if uninitialized', () => {
    const component = shallow(
      <MessageInputWrapper
        channel={{}}
        isOnline={true}
        initialized={false}
        user={{
          nickname: 'Kukuh Sulistyo',
          profileUrl:
            'https://imgix3.ruangguru.com/assets/avatar/avatar|6371.png?w=360',
        }}
      />
    );

    expect(component.find(MessageInput).props().disabled).toEqual(true);
  });
});
