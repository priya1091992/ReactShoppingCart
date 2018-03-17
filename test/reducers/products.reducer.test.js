import reducer from './../../src/reducers/products.reducer'
import * as types from './../../src/actions/product.action'
import data from './../../src/actions/sample'

describe('Product reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        products: [],
        AllProducts: []
      }
    )
  })

  it('should handle SET_PRODUCT', () => {
    expect(
      reducer([], {
        type: types.SET_PRODUCT,
        products: data,
        AllProducts: data
      })
    ).toEqual(
      {
        products: data.products,
        AllProducts: data.products
      }
    )
  })
})
