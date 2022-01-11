import React from 'react'
import OperationButton from '../operation-button'

export default ({
  id = '',
  title = '',
  onClick = () => {},
  dataType = '',
  style = {},
}) => (
  <OperationButton
    type="confirm"
    id={id}
    title={title}
    dataType={dataType}
    onClick={onClick}
    style={style}
  />
)
