import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout, removeProductFromCart, removeItemFromCart, addToCart } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'

const CartContainer = ({ products, total, checkout, addToCart, removeProductFromCart }) => (
  <Cart
    products={products}
    total={total}
    onCheckoutClicked={() => checkout(products)}
    onAddItem={(id) => addToCart(id)}
    onRemoveItem={(id) => removeItemFromCart(id)}
    onRemoveProduct={(id) => removeProductFromCart(id)}/>
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
  removeProductFromCart: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state)
})

export default connect(
  mapStateToProps,
  { checkout, removeProductFromCart, removeItemFromCart, addToCart }
)(CartContainer)
