import React from 'react'
import { connect } from 'react-redux'

import FilterInput from './filter-input'

const LabelFilter = ({ value }) => (
  <FilterInput
    title = "标签"
    label = "label"
    value = {value} />
)

const mapStateToProps = (state) => ({
  value: state.filters.label
})

const mapDispatchToProps = () => ({})

const _LabelFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelFilter)
export default _LabelFilter
