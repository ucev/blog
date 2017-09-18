import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LabelTable from './label-table'
import TableNavLink from "./table-nav-link"
import { orderChange as _orderChange, fetchLabelData } from '../../redux/actions/labels'

class LabelLayout extends React.Component {
  componentDidMount() {
    this.props.init()
  }
  render() {
    return (
      <div id = 'label-table-div'>
        <LabelTable />
        <TableNavLink />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({})
const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => {
    dispatch(fetchLabelData())
  }
})

const _LabelLayout = connect(
                       mapStateToProps,
                       mapDispatchToProps
                      )(LabelLayout)
export default _LabelLayout
