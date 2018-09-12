import React from 'react'

import './table.style.scss'

const Table = ({ type = '', children = undefined }) => {
  let className = 'content-table'
  if (type) {
    className += ` ${type}-content-table`
  }
  return <table className={className}>{children}</table>
}

export default Table
