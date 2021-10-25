import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MATERIAL_MESSAGE_A_1 } from '../../../../../__mocks__/messagesMock';

import MaterialMessageItemBody from '../index';

describe('MaterialMessageItemBody', () => {
  it('should do a snapshot test of the MaterialMessageItemBody DOM', function () {
    const text = 'example-text';
    const component = renderer.create(
      <MaterialMessageItemBody message={MATERIAL_MESSAGE_A_1} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
