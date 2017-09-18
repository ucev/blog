import React from 'react'
import ReactDOM from 'react-dom'

var DialogOperationButton = (props) => {
  var classes = `dialog-operation-button dialog-${props.type}-button`;
  return (
    <button className = {classes} onClick = {props.click}>{props.title}</button>
  )
}

export default DialogOperationButton
