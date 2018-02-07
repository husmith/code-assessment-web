import {
ADD_TO_CART,
REMOVE_FROM_CART,
UPDATE_CART_COUNT,
INCREMENT_CART,
DECREMENT_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from '../constants/ActionTypes'
import * as R from 'rambda'
import {createAction, createActions, combineActions, handleActions } from 'redux-actions'

export const addToCartSafe = createAction(ADD_TO_CART);
export const removeFromCart = createAction(REMOVE_FROM_CART);
export const checkoutRequest = createAction(CHECKOUT_REQUEST);
export const checkoutFailure = createAction(CHECKOUT_FAILURE);
export const decrementCart = createAction(DECREMENT_CART, ({productId, amount}) => ({productId, amount: -1 }));
export const incrementCart = createAction(INCREMENT_CART, (productId, amount) => ({productId, amount }));

// export const updateCartCount = combineActions(incrementCart, decrementCart);

const initialState = {
  addedIds: [],
  quantityById: {}
}

const addedIds = handleActions({
  [addToCartSafe](state, {payload: { productId }}) {
    return state.indexOf(productId) === -1 ? [ ...state, productId ] : state;
  },
  [removeFromCart](state, {payload: {productId}}) {
    return state.indexOf(productId) === -1 ? state :  [
      ...state.slice(0, state.indexOf(productId)),
      ...state.slice(state.indexOf(productId) + 1)
    ];
  }
}, initialState.addedIds);

const quantityById = handleActions({
  [addToCartSafe](state, {payload: {productId}}) {
    return { ...state,
      [productId]: (state[productId] || 0) + 1
    }
  },
  [removeFromCart](state, {payload: {productId}}) {
    return R.omit(`${productId}`, state);
  },
  [decrementCart](state, {payload: {productId, amount}}) {
    return {
      ...state,
      [productId]: state[productId] - amount
    }
  },
  [incrementCart](state, {payload: {productId, amount}}) {
    return {
      ...state,
      [productId]: state[productId] + amount
    }
  },
  // [updateCartCount](state, { payload: { productId, amount } }){
  //     return {
  //       ...state,
  //       [productId]: state[productId] + amount
  //     }
  //   }
},initialState.quantityById);

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
