import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

import {ProductCount,ProductTitle,ProductPrice, Card, CardImage, CardContent, InlineFlex, Button} from './../styles';

const ProductItem = ({ product, onAddToCartClicked }) => (
<Card>
  <CardImage src={product.img} />
  <CardContent>
    <InlineFlex alignItems={`baseline`}>
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>{product.price}</ProductPrice>
    </InlineFlex>
      <ProductCount>{product.inventory} REMAINING</ProductCount>
    <Button
      onClick={onAddToCartClicked}
      disabled={product.inventory > 0 ? '' : 'disabled'}>
      {product.inventory > 0 ? 'Add to cart' : 'Sold Out'}
    </Button>
    </CardContent>
  </Card>
)

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string,
    inventory: PropTypes.number.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default ProductItem
