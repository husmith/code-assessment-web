import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE,
  REMOVE_FROM_CART,
  REMOVE_ITEM_FROM_CART,
  REMOVE_PRODUCT_FROM_CART
} from '../constants/ActionTypes'
import * as R from 'rambda'


const initialState = {
  addedIds: [],
  quantityById: {}
}

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    case REMOVE_PRODUCT_FROM_CART:
      if (state.indexOf(action.payload.productId) === -1) {
        return state
      }
      return [
        ...state.slice(0, state.indexOf(action.payload.productId)),
                ...state.slice(state.indexOf(action.payload.productId) + 1)
         ]
    default:
      return state
  }
}

const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { productId } = action
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }
    case REMOVE_ITEM_FROM_CART:
      return { ...state,
        [productId]: state[productId] - 1
      }
    case REMOVE_PRODUCT_FROM_CART:
      return R.omit(action.payload.productId)
    default:
      return state
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}

export default cart
