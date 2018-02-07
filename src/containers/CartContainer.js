import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout, removeItemFromCart, addToCart, decrementCartCount } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'

const CartContainer = ({ products, total, checkout, addToCart, removeItemFromCart, decrementCartCount }) => (
  <Cart
    products={products}
    total={total}
    onCheckoutClicked={() => checkout(products)}
    onIncrement={(id) => addToCart(id, 1)}
    onDecrement={(id) => decrementCartCount(id, 1)}
    onRemoveItem={(id, quantity) => removeItemFromCart(id, quantity)}/>
)

CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state)
})

export default connect(
  mapStateToProps,
  { checkout, removeItemFromCart, addToCart, decrementCartCount }
)(CartContainer)
