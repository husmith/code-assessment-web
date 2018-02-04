import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import Counter from './Counter'
import {CardItem, CalcStyles, CardContainer, CheckoutButton, InlineFlex} from '../styles'


  const PriceCalcs = ({ total, totalTax }) => (
    <CalcStyles>
      <InlineFlex>
        <div className="label">Subtotal</div>
        <div className="text">${total}</div>
      </InlineFlex>
      <InlineFlex>
        <div className="label">Taxes</div>
        <div className="text">${totalTax}</div>
      </InlineFlex>
      <div className="total">${total + totalTax}</div>
    </CalcStyles>
  );

const Cart  = ({ products, total, onCheckoutClicked }) => {
  const hasProducts = products.length > 0

  const totalTax = total * 0.01 / 100;

  const nodes = hasProducts ? (
    products.map(product =>
      <div>
        <InlineFlex>
          <div className="product-img">
            <img src={product.img}/>
          </div>
          <div className="product-info">
            <div className="product-title">{product.title}</div>
            <div className="product-price">{product.price}</div>
            <a className="remove">Remove</a>
          </div>
        </InlineFlex>
        <Counter />
      </div>
    )
  ) : (
    <em>Please add some products to cart.</em>
  )

  return (
    <div>
       <CardContainer>
      <h3>Your Cart</h3>
      <div>{nodes}</div>
      <PriceCalcs total={total} totalTax={totalTax}/>
    <CheckoutButton onClick={onCheckoutClicked} disabled={hasProducts ? '' : 'disabled'}>Checkout</CheckoutButton>
    </CardContainer>
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
}

export default Cart
