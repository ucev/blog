import React from 'react'

import './filter-item.style.scss'

export default ({ value = '', onChange = () => {}, ref = () => {}}) => (
  <input
    className="table-filter-item-input"
    value={value}
    onChange={onChange}
    ref={ref}
  />
)
