import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import {CardContainer} from '../styles'

const headerSubtitle = (cartCount) => cartCount > 0 ? `${cartCount}` : 'Your cart is empty';

const ProductsList = ({ title, productsInCart, children }) => (
  <div>
    <Header title={title} subtitle={headerSubtitle(productsInCart)}/>
    <CardContainer>{children}</CardContainer>
  </div>
)

ProductsList.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
}

export default ProductsList
