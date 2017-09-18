import React from 'react'
import ReactDOM from 'react-dom'

const TableDataRow = (props) => {
  var datas = this.props.datas.map((data) => <td></td>)
  return (
    <tr className = 'content-row-data'>
      {datas}
    </tr>
  )
}

export default TableDataRow
