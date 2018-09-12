import React from 'react'

import './photo-operation-bar.style.scss'

export default ({ id, children }) => (
  <div className="photo-operation-bar" id={id}>
    {children}
  </div>
)
