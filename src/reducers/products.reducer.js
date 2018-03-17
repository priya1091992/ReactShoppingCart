import * as types from '../actions/product.action'

const initialState = {
    products: [],
    AllProducts: [],
};

export default function UserReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_PRODUCT: {
      let responseData = action.products;
      return Object.assign({}, state, {
         products: responseData.products,
         AllProducts: responseData.products
      });
    }
    case types.SELECTED_PRODUCT: {
      return Object.assign({}, state, {
         products: action.product
      });
    }
    default:
      return state;
  }
}
