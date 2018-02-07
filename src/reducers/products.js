import { combineReducers } from 'redux'
import { RECEIVE_PRODUCTS } from '../constants/ActionTypes'
import { addToCartSafe, removeFromCart} from './cart'
import { createAction, handleActions, handleAction } from 'redux-actions'

export const receiveProducts = createAction(RECEIVE_PRODUCTS);

const products = handleActions({
  [addToCartSafe](state, action){
    return {
      ...state,
      inventory: state.inventory - 1
    }
  },
  [removeFromCart](state, action){
    return {
      ...state,
      inventory: state.inventory + 1
    }
  }
}, []);

const byId = (state = {}, action) => {
  let {type, payload} = action
  switch (type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...payload.products.reduce((obj, product) => {
          obj[product.id] = product
          return obj
        }, {})
      }
    default:
      if (payload && payload.productId) {
        return {
          ...state,
          [payload.productId]: products(state[payload.productId], action)
        }
      }
      return state
  }
}

const visibleIds = handleAction(
  [receiveProducts], (state, action) => action.payload.products.map(product => product.id), []
);

export default combineReducers({
  byId,
  visibleIds
})

export const getProduct = (state, id) =>
  state.byId[id]

export const getVisibleProducts = state =>
  state.visibleIds.map(id => getProduct(state, id))
