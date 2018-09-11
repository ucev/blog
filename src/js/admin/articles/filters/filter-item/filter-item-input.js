import React from 'react'

import './filter-item.style.scss'

class FilterItemInput extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.refHandle = this.refHandle.bind(this)
  }
  onChange () {
    let value = this.input.value
    this.props.change(value)
  }
  refHandle (e) {
    this.input = e
  }
  render () {
    return (
      <input
        className="table-filter-item-input"
        value={this.props.value}
        onChange={this.onChange}
        ref={this.refHandle}
      />
    )
  }
}

export default FilterItemInput
