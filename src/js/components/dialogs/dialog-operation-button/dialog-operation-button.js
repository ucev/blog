import React from 'react'

import './dialog-operation-button.style.scss'

const DialogOperationButton = props => {
  const classes = `dialog-operation-button dialog-${props.type}-button`
  return (
    <button className={classes} onClick={props.click}>
      {props.title}
    </button>
  )
}

export default DialogOperationButton
