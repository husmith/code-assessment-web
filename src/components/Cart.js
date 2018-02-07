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

const Cart  = ({ products, total, onCheckoutClicked, onRemoveProduct, onRemoveItem, onAddItem }) => {
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
            <Button onClick={() => onRemoveProduct(product.id, product.quantity)} className="remove">Remove</Button>
          </div>
        </InlineFlex>
        <Counter quantity={product.quantity} onAddItemClicked={() => onAddItem(product.id)} onRemoveItemClicked={() => onRemoveItem(product.id)}/>
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
