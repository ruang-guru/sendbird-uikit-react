import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import DateSeparator from '../index';

describe('DateSeparator', () => {
  it('should contain className', function () {
    const className = 'example-classname';
    const component = shallow(
      <DateSeparator className={className} createdAt={new Date()} />
    );

    expect(component.find('.rogu-date-separator').hasClass(className)).toBe(
      true
    );
  });

  it('should do a snapshot test of the DateSeparator DOM', function () {
    const className = 'ß-classname';
    const component = renderer.create(
      <DateSeparator className={className} createdAt={new Date()} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
