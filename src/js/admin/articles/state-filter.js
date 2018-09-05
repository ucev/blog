import React from 'react'
import { connect } from 'react-redux'

import FilterSelect from './filter-select'

const STATE_OPTIONS = [
  { value: '-1', title: '全部' },
  { value: 'on', title: '已上线' },
  { value: 'off', title: '已下线' },
]

const StateFilter = ({ value }) => (
  <FilterSelect
    key="state"
    title="state"
    label="状态"
    value={value}
    options={STATE_OPTIONS}
  />
)

const mapStateToProps = state => ({
  value: state.filters.state,
})

const mapDispatchToProps = () => ({})

const _StateFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(StateFilter)
export default _StateFilter
