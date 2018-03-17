import React from 'react';
import Header from './../../src/component/Header/index';
import renderer from 'react-test-renderer';

test('Footer component', () => {
  const component = renderer.create(
    <Header />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
