import React from 'react'
import { connect } from 'react-redux'

import FilterSelect from './filter-select'

const OPERATION_OPTIONS = [
  {value: '-1', title: '--选择操作--'},
  {value: 'on', title: '上线'},
  {value: 'off', title: '下线'},
  {value: 'move', title: '移动'},
  {value: 'del', title: '删除'}
]

const GroupOperationSelect = ({ value }) => {
  return (
    <FilterSelect title="group-ope" options={OPERATION_OPTIONS} value = {value} />
  )
}

const mapStateToProps = (state) => ({
  value: state.groupOpe
})

const mapDispatchToProps = () => ({})

const _GroupOperationSelect = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupOperationSelect)
export default _GroupOperationSelect
