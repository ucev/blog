import React from 'react'
import { connect } from 'react-redux'

import FilterItem, {
  FilterItemLabel,
  FilterItemSelect,
} from '../filter-item'

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
  _ref = (e) => {
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
        <FilterItemLabel title = {this.props.label} />
        <FilterItemSelect
          value={this.props.value}
          onChange={this.change}
          ref={_ref}>
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
