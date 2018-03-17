import products from './sample.js'
export const SET_PRODUCT='SET_PRODUCT';
export const SELECTED_PRODUCT='SELECTED_PRODUCT';

export function fetchProducts() {
  return {
    type: 'SET_PRODUCT',
     products
  };
}

export function setSelectedProduct(product) {
  return {
    type: 'SELECTED_PRODUCT',
     product
  };
}
