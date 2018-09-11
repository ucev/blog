import React from 'react'

import './filter-item.style.scss'

class FilterItemSelect extends React.PureComponent {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.refHandle = this.refHandle.bind(this)
  }
  onChange () {
    let value = this.select.value
    this.props.change(value)
  }
  refHandle (e) {
    this.select = e
  }
  render () {
    return (
      <select
        className="table-filter-item-select"
        value={this.props.value}
        onChange={this.onChange}
        ref={this.refHandle}>
        {this.props.children}
      </select>
    )
  }
}

export default FilterItemSelect
