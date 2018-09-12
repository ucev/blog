import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import TableRow, { TableRowData } from '$components/tables/table-row'

import './label-row.style.scss'

const LabelRow = ({ id, name, articles, hotmark, addtime }) => {
  addtime = moment.unix(addtime).format('YYYY-MM-DD')
  return (
    <TableRow subtype="label">
      <TableRowData type="index" subtype="label">
        {id}
      </TableRowData>
      <TableRowData type="title" subtype="label">
        <a href={'/articles/search?args=' + name}>{name}</a>
      </TableRowData>
      <TableRowData type="article-count" subtype="label">
        {articles}
      </TableRowData>
      <TableRowData type="hotmark" subtype="label">
        {hotmark}
      </TableRowData>
      <TableRowData type="addtime" subtype="label">
        {addtime}
      </TableRowData>
    </TableRow>
  )
}

LabelRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  articles: PropTypes.number.isRequired,
  hotmark: PropTypes.number.isRequired,
  addtime: PropTypes.number.isRequired,
}

export default LabelRow
