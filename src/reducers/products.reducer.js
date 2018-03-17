import * as types from '../actions/product.action'

const initialState = {
    products: [],
};

export default function UserReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_PRODUCT: {
      let responseData = action.products;
      return Object.assign({}, state, {
         products: responseData.products
      });
    }
    default:
      return state;
  }
}
