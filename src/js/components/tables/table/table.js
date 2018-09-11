import React from 'react'

// import '$css/components/admin/content_table.scss';

const Table = props => {
  var classes = `content-table ${props.type}-content-table`
  return <table className={classes}>{props.children}</table>
}

export default Table
