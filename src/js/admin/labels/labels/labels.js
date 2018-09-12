import React from 'react'
import { connect } from 'react-redux'

import LabelTable from '../label-table'
import TableNavLink from '../table-nav-link'

import { fetchLabelData } from '$actions/labels'

import './labels.style.scss'

class LabelLayout extends React.Component {
  componentDidMount () {
    this.props.init()
  }
  render () {
    return (
      <div id="label-table-div">
        <LabelTable />
        <TableNavLink />
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
  init: () => {
    dispatch(fetchLabelData())
  },
})

const _LabelLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelLayout)
export default _LabelLayout
