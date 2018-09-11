import React from 'react'
import DialogButton from '../dialog-operation-button'

var DialogConfirmButton = props => {
  return <DialogButton type="confirm" title={props.title} click={props.click} />
}

export default DialogConfirmButton
