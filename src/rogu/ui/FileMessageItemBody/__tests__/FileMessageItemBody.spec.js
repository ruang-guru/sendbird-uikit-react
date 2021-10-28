import React from 'react';
import renderer from 'react-test-renderer';

import FileMessageItemBody from '../index';

import { FILE_MESSAGE_DOC } from '../../../../../__mocks__/messagesMock';

describe('FileMessageItemBody', () => {
  it('should do a snapshot test of the FileMessageItemBody DOM', function () {
    const component = renderer.create(
      <FileMessageItemBody message={FILE_MESSAGE_DOC} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
