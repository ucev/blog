import React from 'react'
import { connect } from 'react-redux'

import FilterItem, { FilterItemLabel, FilterItemSelect } from '../filter-item'

import { filterOptionChange } from '$actions/articles'

class FilterSelect extends React.Component {
  constructor (props) {
    super(props)
    this.change = this.change.bind(this)
  }
  change (value) {
    var title = this.props.title
    this.props.change(title, value)
  }
  refHandle (e) {
    this.select = e
  }
  render () {
    const options = this.props.options.map(opt => (
      <option value={opt.value} key={opt.value}>
        {opt.title}
      </option>
    ))
    return (
      <FilterItem>
        <FilterItemLabel title={this.props.label} />
        <FilterItemSelect value={this.props.value} change={this.change}>
          {options}
        </FilterItemSelect>
      </FilterItem>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
  change: (title, value) => {
    dispatch(filterOptionChange(title, value))
  },
})

const _FilterSelect = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterSelect)
export default _FilterSelect
