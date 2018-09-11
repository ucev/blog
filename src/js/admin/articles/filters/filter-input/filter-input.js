import React from 'react'
import { connect } from 'react-redux'

import FilterItem, { FilterItemInput, FilterItemLabel } from '../filter-item'

import { filterOptionChange } from '$actions/articles'

class FilterInput extends React.Component {
  constructor (props) {
    super(props)
    this.change = this.change.bind(this)
    this.refHandle = this.refHandle.bind(this)
  }
  change (value) {
    var label = this.props.label
    this.props.change(label, value)
  }
  refHandle (e) {
    this.input = e
  }
  render () {
    return (
      <FilterItem>
        <FilterItemLabel title={this.props.title} />
        <FilterItemInput value={this.props.value} change={this.change} />
      </FilterItem>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
  change: (label, value) => {
    dispatch(filterOptionChange(label, value))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterInput)
