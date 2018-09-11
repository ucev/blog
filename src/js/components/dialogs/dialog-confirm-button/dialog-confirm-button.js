import React from 'react'
import DialogButton from '../dialog-operation-button'

export default ({ title = '', click = () => {} }) => (
  <DialogButton buttonType="confirm" title={title} click={click} />
)
