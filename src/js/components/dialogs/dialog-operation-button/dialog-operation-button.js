import React from 'react'

import './dialog-operation-button.style.scss'

export default ({ buttonType = '', title = '', click = () => {} }) => {
  let className = 'dialog-operation-button'
  if (buttonType) {
    className += ` dialog-${buttonType}-button`
  }
  return (
    <button className={className} onClick={click}>
      {title}
    </button>
  )
}
