import React from 'react'
import {CounterStyle} from '../styles'

const Counter = () => (
  <CounterStyle alignItems={`center`}>
    <button className="left">-</button>
    <div className="value">2</div>
    <button className="right">+</button>
  </CounterStyle>
);

export default Counter
