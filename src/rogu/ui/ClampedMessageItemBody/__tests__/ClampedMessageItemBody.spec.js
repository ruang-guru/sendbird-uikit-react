import React from 'react';
import renderer from 'react-test-renderer';

import ClampedMessageItemBody from "../index";

describe('ClampedMessageItemBody', () => {
  it('should do a snapshot test of the ClampedMessageItemBody DOM', function() {
    const text = "example-text";
    const component = renderer.create(
      <ClampedMessageItemBody content="Some message here" />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
