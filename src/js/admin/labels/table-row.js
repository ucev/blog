import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import PropTypes from 'prop-types'

const LabelRow = ({label}) => {
  var addtime = moment.unix(label.addtime).format('YYYY-MM-DD');
  return (
    <tr key = {label.id} className = 'content-row-data'>
      <td className = 'content-row-index-data'>{label.id}</td>
      <td className = 'content-row-title-data label-row-title-data'><a href = {'/articles/search?args=' + label.name}>{label.name}</a></td>
      <td className = 'content-row-article-count-data'>{label.articles}</td>
      <td className = 'content-row-hotmark-data'>{label.hotmark}</td>
      <td className = 'content-row-addtime-data'>{addtime}</td>
    </tr>
  )
}

LabelRow.propTypes = {
  label: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    articles: PropTypes.number.isRequired,
    hotmark: PropTypes.number.isRequired,
    addtime: PropTypes.number.isRequired
  })
}

export default LabelRow
