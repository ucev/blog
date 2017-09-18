import React from 'react'
import ReactDOM from 'react-dom'

const Table = (props) => {
  var classes = `content-table ${props.type}-content-table`;
  return (
    <table className = {classes}>
      {props.children}
    </table>
  )
}

export default Table
