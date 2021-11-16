import React from 'react';
import renderer from 'react-test-renderer';

import OGMessageItemBody from '../index';

import { OG_MESSAGE } from '../../../../../__mocks__/messagesMock';

describe('OGMessageItemBody', () => {
  it('should do a snapshot test of the OGMessageItemBody DOM', function () {
    const component = renderer.create(
      <OGMessageItemBody message={OG_MESSAGE} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
