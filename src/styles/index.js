import styled, {injectGlobal} from 'styled-components';


injectGlobal`
  html {
    font-size: 16px;
    background-color: #f4f5f7;
  }
`

const colors = {
  white: '#ffffff',
  lightGray: '#dadada',
  gray: '#939393',
  blue: '#3f7ec0',
  background: '#f4f5f7'
};

const desktop = styles => {
  return `@media (min-width: 768px) and (max-width: 1034px) { ${styles} }`;
};
const tablet = styles => {
  return `@media (min-width: 376px) and (max-width: 768px) { ${styles} }`;
};

const App = styled.div`
  position: relative;
  margin: auto;
`;

export const Button = styled.button`
  background-color: ${colors.btn};
  font-size: 0.875em;
  padding: 0.813em 1.5em;
  color: ${colors.white};
  border-radius: 1.5em;
  border: none;
  text-transform: uppercase;
`;

export const CheckoutButton = Button.extend`
  border-radius: 0;
  width: 100%;
`;

export const StyledHeader = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5em 0 1em;
  border-bottom: 1px solid ${colors.lightGray};
`;

export const HeaderTitle = styled.h2`
  font-size: 3em;
  margin: 0;
`;

export const InlineFlex = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: ${props => props.alignItems};
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Card = styled.div`
  flex: 0 1 100%;
  margin-bottom: 1rem;
  background-color: ${colors.white};
  border-radius: 0.5em;
  overflow: hidden;
  ${desktop(`flex-wrap: nowrap; display: inline-flex;`)};
`;

export const CardImage = styled.img`
  height: auto;
  width: 100%;
  object-fit: cover;
  ${desktop`width: 40%; flex-shrink: 1;`};
`;

export const ProductTitle = styled.h4`
  font-size: 1.8em;
  margin: 0;
`;

export const ProductPrice = styled.h6`
  font-size: 1em;
  margin: 0;
`;

export const CardContent = styled.div`
  padding: 1rem 1rem 2rem;
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  .product-info {
    width: 100%;
  }

  ${desktop`
    width: 60%;
    padding: 2rem;`}
`;

export const ProductCount = styled.h6`
  text-transform: uppercase;
  font-size: 0.875em;
  color: ${colors.gray};
`;

export const CounterStyle = InlineFlex.extend`
  border: 1px solid ${colors.lightGray};
  background-color: ${colors.lightGray};
  border-radius: 1.7em;
  overflow: hidden;
  button,
  div {
    flex: 0 1 auto;
    padding: 1rem 0;
    width: 100%;
    text-align: center;
  }
  button {
    border: none;
    background: none;
  }
  div {
    background-color: white;
  }
`;

export const CalcStyles = styled.div`
  width: 100%;
  .total {
    text-align: right;
  }`;
