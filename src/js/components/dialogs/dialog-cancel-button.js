import React from 'react'
import ReactDOM from 'react-dom'
import DialogButton from './dialog-operation-button'

var DialogCancelButton = (props) => {
  return <DialogButton type = 'cancel' title = {props.title} click = {props.click} />
}

export default DialogCancelButton
