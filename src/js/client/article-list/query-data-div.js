import React from 'react'

import './query-data-div.style.scss'

class QueryDataDiv extends React.Component {
  constructor(props) {
    super(props)
    this.loadMore = this.loadMore.bind(this)
  }
  loadMore() {
    this.props.more()
  }
  render() {
    var visible = this.props.visible
    var styles = {}
    if (!visible) {
      styles['display'] = 'none'
    }
    return (
      <div>
        <div className="load-more-div" style={styles} onClick={this.loadMore}>
          继续加载
        </div>
      </div>
    )
  }
}

export default QueryDataDiv
