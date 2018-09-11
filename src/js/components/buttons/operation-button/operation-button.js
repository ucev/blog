import React from 'react'

import './operation-button.style.scss'

export default ({
  type = '',
  onClick = () => {},
  title = '',
  id = '',
  dataType = '',
  style = {},
}) => {
  let className = 'operation-button'
  switch (type) {
    case 'confirm':
      className += ' operation-button-confirm'
      break
    case 'cancel':
      className += ' operation-button-cancel'
      break
    default:
      break
  }
  return (
    <button
      className={className}
      id={id}
      data-type={dataType}
      style={style}
      onClick={onClick}>
      {title}
    </button>
  )
}
