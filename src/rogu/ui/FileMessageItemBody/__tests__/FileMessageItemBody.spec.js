import React from 'react';
import renderer from 'react-test-renderer';

import FileMessageItemBody from '../index';

import { FILE_MESSAGE_DOC } from '../../../../../__mocks__/messagesMock';

const createMockMessage = (process) => {
  const mockMessage = {
    type: 'image/png',
    url: 'https://sendbird.com',
    name: 'My name is name',
    reactions: [],
  };
  return process ? process(mockMessage) : mockMessage;
};

describe('FileMessageItemBody', () => {
  it('should do a snapshot test of the FileMessageItemBody DOM', function () {
    const component = renderer.create(
      <FileMessageItemBody message={FILE_MESSAGE_DOC} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
