import React from 'react'
import ReactDOM from 'react-dom'

var DialogHeader = (props) => {
  return (
    <div className = 'dialog-header-div'>
      {props.children}
    </div>
  )
}

export default DialogHeader
