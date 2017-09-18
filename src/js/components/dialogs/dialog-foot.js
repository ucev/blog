import React from 'react'
import ReactDOM from 'react-dom'

var DialogFoot = (props) => {
  return (
    <div className = 'dialog-buttom-operation-bar'>
      {props.children}
    </div>
  )
}

export default DialogFoot
