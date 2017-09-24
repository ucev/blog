import React from 'react'

import SearchLabel from './search-label'

class SearchLabels extends React.Component {
  render () {
    var labels = this.props.labels.map((label) => {
      if (label.trim() == '') {
        return
      }
      return <SearchLabel label = {label} query = {this.props.query} />
    })
    return (
      <ul className = "article-item-li-labels-ul">
        {labels}
      </ul>
    )
  }
}

export default SearchLabels
