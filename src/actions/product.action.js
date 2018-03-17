import products from './sample.js'
export const SET_PRODUCT='SET_PRODUCT';

export function fetchProducts() {
  return {
    type: 'SET_PRODUCT',
     products
  };
}
