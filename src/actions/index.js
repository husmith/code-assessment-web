import shop from '../api/shop'
import * as types from '../constants/ActionTypes'

export const getAllProducts = () => dispatch => shop.getProducts(products => dispatch({type: types.RECEIVE_PRODUCTS, payload: {products}}));

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  payload: {productId}
})

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId))
  }
}

export const removeFromCart = productId => (dispatch, getState) => {
  if (getState().cart.addedIds.indexOf(productId) !== -1) {
    dispatch({
      type: types.REMOVE_FROM_CART,
      payload: {productId}
    })
  }
}

// export const removeProductFromCart = productId => (dispatch, getState) => {
// if (getState().cart.addedIds.indexOf(productId) !== -1 && getState().cart.quantityById[productId] > 0) {
//
//     dispatch({
//       type: types.REMOVE_PRODUCT_FROM_CART,
//       payload: {productId, quantity: getState().cart.quantityById[productId]}
//     });
//   }
// }
//
// export const removeItemFromCart = productId => (dispatch, getState) => {
// if (getState().cart.addedIds.indexOf(productId) !== -1 && getState().cart.quantityById[productId] > 1) {
//     dispatch({
//       type: types.REMOVE_ITEM_FROM_CART,
//       productId
//     });
//   }
// }

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState()

  dispatch({
    type: types.CHECKOUT_REQUEST
  })
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart
    })
    // Replace the line above with line below to rollback on failure:
    // dispatch({ type: types.CHECKOUT_FAILURE, cart })
  })
}
