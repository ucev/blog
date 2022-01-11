import React from 'react'

import './filter-bar.style.scss'

export default ({ type = '', children = undefined }) => {
  let className = 'table-filter-bar'
  switch (type) {
    case 'top':
      className += ' table-filter-bar-top'
      break
    case 'bottom':
      className += ' table-filter-bar-bottom'
      break
    default:
      break
  }
  return <div className={className}>{children}</div>
}
