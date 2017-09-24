import React from 'react'
import DialogButton from './dialog-operation-button'

var DialogCancelButton = (props) => {
  return (<DialogButton type = "cancel" title = {props.title} click = {props.click} />)
}

export default DialogCancelButton
