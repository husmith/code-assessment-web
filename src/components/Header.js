import React from 'react'
import PropTypes from 'prop-types'
import {StyledHeader, HeaderTitle} from '../styles';


const Header = ({ title, subtitle }) => (
  <StyledHeader>
    <HeaderTitle>{title}</HeaderTitle>
    {subtitle}
  </StyledHeader>
);

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default Header
