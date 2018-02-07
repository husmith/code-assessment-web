import React from 'react'
import {CounterStyle} from '../styles'

const Counter = ({quantity, onDecrementClicked, onIncrementClicked}) => (
  <CounterStyle alignItems={`center`}>
    <button onClick={onDecrementClicked} className="left">-</button>
    <div className="value">{quantity}</div>
    <button onClick={onIncrementClicked} className="right">+</button>
  </CounterStyle>
);

export default Counter
