import React from 'react'

import './search-label.style.scss'

class SearchLabel extends React.Component {
  render() {
    var label = this.props.label
    if (this.props.query && label.search(this.props.query) == -1) {
      return <li className="article-item-li-label-li">{label}</li>
    } else {
      return (
        <li className="article-item-li-label-li article-item-li-label-li-selected">
          {label}
        </li>
      )
    }
  }
}

export default SearchLabel
