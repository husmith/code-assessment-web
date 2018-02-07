import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import Counter from './Counter'
import {Card, Button, CardItem, CardImage, CalcStyles, CardContainer, CheckoutButton, InlineFlex} from '../styles'

const moneyFormat = x => Number.parseFloat(x).toFixed(2);

  const PriceCalcs = ({ total, totalTax }) => (
    <CalcStyles>
      <InlineFlex>
        <div className="label">Subtotal</div>
        <div className="text">${moneyFormat(total)}</div>
      </InlineFlex>
      <InlineFlex>
        <div className="label">Taxes</div>
        <div className="text">${moneyFormat(totalTax)}</div>
      </InlineFlex>
      <div className="total">${moneyFormat(total + totalTax)}</div>
    </CalcStyles>
  );

const Cart  = ({ products, total, onCheckoutClicked, onRemoveItem, onDecrement, onIncrement }) => {
  const hasProducts = products.length > 0

  const totalTax = total * 0.01 / 100;

  const nodes = hasProducts ? (
    products.map(product =>
      <Card key={product.id}>
        <InlineFlex>
          <div className="cart-product-img">
          <CardImage src={product.img}/>
          </div>
          <div className="cart-product-info">
            <div className="product-title">{product.title}</div>
            <div className="product-price">{product.price}</div>
            <Button onClick={() => onRemoveItem(product.id, product.quantity)} className="remove">Remove</Button>
          </div>
        </InlineFlex>
        <Counter quantity={product.quantity} onIncrementClicked={() => onIncrement(product.id)} onDecrementClicked={() => onDecrement(product.id)}/>
      </Card>
    )
  ) : (
    <em>Please add some products to cart.</em>
  )

  return (
    <CardContainer>
      {nodes}
    <PriceCalcs total={total} totalTax={totalTax}/>
    <CheckoutButton onClick={onCheckoutClicked} disabled={hasProducts ? '' : 'disabled'}>Checkout</CheckoutButton>
    </CardContainer>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
}

export default Cart
