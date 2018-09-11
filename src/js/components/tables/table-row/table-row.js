import React from 'react'

import './table-row.style.scss'

export default ({ subtype = '', children }) => {
  let className = 'content-row-data'
  if (subtype) {
    className += ` ${subtype}-row-data`
  }
  return <tr className={className}>{children}</tr>
}
