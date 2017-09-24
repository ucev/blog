import React from 'react'
import { connect } from 'react-redux'

import FilterInput from './filter-input'

const CategoryFilter = ({ value }) => (
  <FilterInput
    title = "分类"
    label = "category"
    value = {value} />
)

const mapStateToProps = (state) => ({
  value: state.filters.category || ''
})

const mapDispatchToProps = () => ({})

const _CategoryFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryFilter)
export default _CategoryFilter
