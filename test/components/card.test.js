import React from 'react';
import renderer from 'react-test-renderer';

import Card from './../../src/component/Card/index';
import data from './../../src/actions/sample.js'

test('Card component', () => {
  const component = renderer.create(
    <Card listData={data.products} searchedData={null} inputData={'Camera'}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
