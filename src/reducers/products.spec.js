import reducer, * as products from './products'

describe('reducers', () => {
  describe('products', () => {
    let state

    describe('when products are received', () => {

      beforeEach(() => {
        state = reducer({}, {
          type: 'RECEIVE_PRODUCTS',
          payload: {
            products: [
            {
              id: 1,
              title: 'Product 1',
              inventory: 2
            },
            {
              id: 2,
              title: 'Product 2',
              inventory: 1
            }
          ]}
        })
      })

      it('contains the products from the action', () => {
        expect(products.getProduct(state, 1)).toEqual({
          id: 1,
          title: 'Product 1',
            inventory: 2
        })
        expect(products.getProduct(state, 2)).toEqual({
          id: 2,
          title: 'Product 2',
            inventory: 1
        })
      })

      it ('contains no other products', () => {
        expect(products.getProduct(state, 3)).toEqual(undefined)
      })

      it('lists all of the products as visible', () => {
        expect(products.getVisibleProducts(state)).toEqual([
          {
            id: 1,
            title: 'Product 1',
            inventory: 2
          }, {
            id: 2,
            title: 'Product 2',
            inventory: 1
          }
        ])
      })

      describe('when an item is added to the cart', () => {
        beforeEach(() => {
          state = reducer(state, { type: 'ADD_TO_CART', payload: {productId: 1} })
        })

        it('the inventory is reduced', () => {
          expect(products.getVisibleProducts(state)).toEqual([
            {
              id: 1,
              title: 'Product 1',
              inventory: 1
            }, {
              id: 2,
              title: 'Product 2',
              inventory: 1
            }
          ])
        })

      })
      describe('when cart item is decremented', () => {
        beforeEach(() => {
          state = reducer(state, { type: 'DECREMENT_CART', payload: {productId: 1, amount: 2} })
        })

        it('the inventory is increased', () => {
          expect(products.getVisibleProducts(state)).toEqual([
            {
              id: 1,
              title: 'Product 1',
              inventory: 4
            }, {
              id: 2,
              title: 'Product 2',
              inventory: 1
            }
          ])
        })

      })
      describe('when cart item is incremented', () => {
        beforeEach(() => {
          state = reducer(state, { type: 'INCREMENT_CART', payload: {productId: 1, amount: 2} })
        })

        it('the inventory is decreased', () => {
          expect(products.getVisibleProducts(state)).toEqual([
            {
              id: 1,
              title: 'Product 1',
              inventory: 0
            }, {
              id: 2,
              title: 'Product 2',
              inventory: 1
            }
          ])
        })

      })
      describe('when an item is removed from the cart', () => {
        beforeEach(() => {
          state = reducer(state, { type: 'REMOVE_FROM_CART', payload: {productId: 2, amount: 3} })
        })

        it('the inventory is increased', () => {
          expect(products.getVisibleProducts(state)).toEqual([
            {
              id: 1,
              title: 'Product 1',
              inventory: 2
            }, {
              id: 2,
              title: 'Product 2',
              inventory: 4
            }
          ])
        })

      })

    })
  })
})
