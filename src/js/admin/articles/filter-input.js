import React from 'react'
import { connect } from 'react-redux'

import { filterOptionChange } from '$actions/articles'

class FilterInput extends React.Component {
  constructor (props) {
    super(props)
    this.change = this.change.bind(this)
  }
  change () {
    var label = this.props.label
    var value = this.input.value
    this.props.change(label, value)
  }
  render () {
    return (
      <div className = "table-filter-item">
        <label className = "table-filter-item-label">{this.props.title}</label>
        <input
          className = "table-filter-item-input"
          value = {this.props.value}
          onChange = {this.change}
          ref = {(input) => {this.input = input }} />
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({
  change: (label, value) => {
    dispatch(filterOptionChange(label, value))
  }
})

const _FilterInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterInput)
export default _FilterInput
