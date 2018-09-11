import React from 'react'

import './filter-item.style.scss'

export default ({ title = '' }) => (
  <label className="table-filter-item-label">{title}</label>
)
