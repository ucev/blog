import React from 'react'

// import '$css/components/admin/content_table.scss';

const Table = ({type = '', children = undefined}) => {
  let className = 'content-table'
  if (type) {
    className += ` ${type}-content-table`
  }
  return (
    <table className={className}>
      {children}
    </table>
  )
}

export default Table
