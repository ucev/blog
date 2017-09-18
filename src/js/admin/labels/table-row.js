import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import PropTypes from 'prop-types'

const LabelRow = ({ id, name, articles, hotmark, addtime }) => {
  addtime = moment.unix(addtime).format('YYYY-MM-DD');
  return (
    <tr className = 'content-row-data'>
      <td className = 'content-row-index-data'>{id}</td>
      <td className = 'content-row-title-data label-row-title-data'><a href = {'/articles/search?args=' + name}>{name}</a></td>
      <td className = 'content-row-article-count-data'>{articles}</td>
      <td className = 'content-row-hotmark-data'>{hotmark}</td>
      <td className = 'content-row-addtime-data'>{addtime}</td>
    </tr>
  )
}

LabelRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  articles: PropTypes.number.isRequired,
  hotmark: PropTypes.number.isRequired,
  addtime: PropTypes.number.isRequired
}

export default LabelRow
