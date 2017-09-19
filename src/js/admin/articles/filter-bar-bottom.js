import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import GroupOperationSelect from './group-operation-select'

const BottomFilterBar = ({ }) => (
  <div className='table-filter-bar table-filter-bar-bottom'>
    <GroupOperationSelect />
  </div>
)

export default BottomFilterBar
