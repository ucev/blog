import React from 'react'

import './filter-item.style.scss'

export default ({ value = '', onChange = () => {}, ref = () => {}, children = undefined}) => (
  <select
    className="table-filter-item-select"
    value={value}
    onChange={onChange}
    ref={ref}>
    {children}
  </select>
)
