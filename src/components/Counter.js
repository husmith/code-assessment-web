import React from 'react'
import {CounterStyle} from '../styles'

const Counter = ({quantity, onAddItemClicked, onRemoveItemClicked}) => (
  <CounterStyle alignItems={`center`}>
    <button onClick={onRemoveItemClicked} className="left">-</button>
    <div className="value">{quantity}</div>
    <button onClick={onAddItemClicked} className="right">+</button>
  </CounterStyle>
);

export default Counter
