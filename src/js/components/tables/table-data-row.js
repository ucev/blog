import React from 'react'

const TableDataRow = (props) => {
  var datas = props.datas.map(() => <td></td>)
  return (
    <tr className = "content-row-data">
      {datas}
    </tr>
  )
}

export default TableDataRow
