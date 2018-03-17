import React from 'react';
import renderer from 'react-test-renderer';

import {ProductDetail} from './../../src/container/product.container';
import data from './../../src/actions/sample'
import * as actions from './../../src/actions/product.action'


test('ProductDetail component', () => {
  const component = renderer.create(
    <ProductDetail product={data.products} fetchData={actions.fetchProducts}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
