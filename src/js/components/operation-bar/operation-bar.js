import React from 'react'

import './operation-bar.style.scss'

export default ({ children, id = ''}) => (
  <div
    id = {id}
    className = 'op-bar'>
    {children}
  </div>
)
