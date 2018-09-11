import React from 'react'
import { connect } from 'react-redux'

import FilterItem, {
  FilterItemInput,
  FilterItemLabel,
} from '../filter-item'

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
  _ref = (e) => {
    this.input = e
  }
  render () {
    return (
      <FilterItem>
        <FilterItemLabel title = {this.props.title} />
        <FilterItemInput
          value={this.props.value}
          onChange={this.change}
          ref={_ref}
        />
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
