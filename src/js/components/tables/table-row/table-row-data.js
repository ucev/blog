import React from 'react'

import './table-row.style.scss'

export default ({ type = '', subtype = '', onClick = () => {}, children }) => {
  let className = `content-row-${type}-data`
  if (subtype) {
    className += ` ${subtype}-row-${type}-data`
  }
  return (
    <td className={className} onClick={onClick}>
      {children}
    </td>
  )
}
