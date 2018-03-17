import * as actions from './../../src/actions/product.action.js'
import data from './../../src/actions/sample.js'

describe('actions', () => {
  it('should create an action to set product', () => {
    const products = data
    const expectedAction = {
      type: actions.SET_PRODUCT,
      products
    }
    expect(actions.fetchProducts(data)).toEqual(expectedAction)
  })
})
