import React from 'react'

import './table-data-row.style.scss'

const TableDataRow = props => {
  var datas = props.datas.map(() => <td />)
  return <tr className="content-row-data">{datas}</tr>
}

export default TableDataRow
