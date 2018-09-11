import React from 'react'

import './table-row.style.scss'

export default ({ type = '', onClick = () => {}, children}) => (
  <td
    className ={`content-row-${type}-data`}
    onClick={onClick}>
    {children}
  </td>
)
