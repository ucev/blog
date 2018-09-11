import React from 'react'

import './table-nav-link-li.style.scss'

class TableNavLinkLi extends React.Component {
  constructor (props) {
    super(props)
    this.click = this.click.bind(this)
  }
  click () {
    this.props.click(this.props.page)
  }
  render () {
    var classes = 'table-nav-ul-li'
    if (this.props.current == this.props.page)
      classes += ' table-nav-ul-li-current'
    return (
      <li className={classes} onClick={this.click}>
        {this.props.title}
      </li>
    )
  }
}

export default TableNavLinkLi
