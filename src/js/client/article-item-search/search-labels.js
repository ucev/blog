import React from 'react'

import SearchLabel from './search-label'

import './search-labels.style.scss'

class SearchLabels extends React.Component {
  render() {
    var labels = this.props.labels.map((label, index) => {
      if (label.trim() == '') {
        return
      }
      return <SearchLabel key={index} label={label} query={this.props.query} />
    })
    return <ul className="article-item-li-labels-ul">{labels}</ul>
  }
}

export default SearchLabels
