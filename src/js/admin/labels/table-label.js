import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TableLabel from '../../components/tables/table-label'
import { orderChange } from '../../redux/actions/labels'

const LabelTableLabel = ({orderby = 'id', orderDirect = 'asc', orderChange}) => {
  var labels = [
    {name: 'index', val: '序号', sorted: true, sortname: 'id'},
    {name: 'title', val: '标题'},
    {name: 'articlecnt', val: '文章数', sorted: true, sortname: 'articles'},
    {name: 'hotmark', val: '热度', sorted: true, sortname: 'hotmark'},
    {name: 'addtime', val: '添加日期'}
  ]
  return (
    <TableLabel key = {1} type = 'label' labels = {labels} orderby = {orderby} orderDirect = {orderDirect} orderChange = {orderChange} />
  )
}

LabelTableLabel.propTypes = {
  orderby: PropTypes.string.isRequired,
  orderDirect: PropTypes.string.isRequired,
  orderChange: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    orderby: state.orderby,
    orderDirect: state.orderDirect
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    orderChange: (orderby, orderDirect) => {
      dispatch(orderChange(orderby, orderDirect))
    }
})

const _LabelTableLabel = connect(
                           mapStateToProps,
                           mapDispatchToProps
                          )(LabelTableLabel)
export default _LabelTableLabel
