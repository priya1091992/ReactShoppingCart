import React from 'react';
import Footer from './../../src/component/Footer/index';
import renderer from 'react-test-renderer';

test('Footer component', () => {
  const component = renderer.create(
    <Footer />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
