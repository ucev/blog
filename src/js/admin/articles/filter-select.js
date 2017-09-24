import React from 'react'
import { connect } from 'react-redux'

import { filterOptionChange } from '$actions/articles'

class FilterSelect extends React.Component {
  constructor (props) {
    super(props)
    this.change = this.change.bind(this)
  }
  change () {
    var title = this.props.title
    var value = this.select.value
    this.props.change(title, value)
  }
  render () {
    const options = this.props.options.map((opt) => (
      <option value = {opt.value}>{opt.title}</option>
    ))
    return (
      <div className = "table-filter-item">
        <label className = "table-filter-item-label">{this.props.label}</label>
        <select
          className = "table-filter-item-select"
          value = {this.props.value}
          onChange = {this.change}
          ref = {(select) => { this.select = select }} >
          {options}
        </select>
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => ({
  change: (title, value) => {
    dispatch(filterOptionChange(title, value))
  }
})

const _FilterSelect = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterSelect)
export default _FilterSelect
