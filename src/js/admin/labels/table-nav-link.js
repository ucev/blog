import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import TableNavLink from '../../components/table-foot-nav'
import { pageChange } from '../../redux/actions/labels'

const LabelNavLink = (current = 0, total = 0, pagechange) => (
  <TableNavLink page = {current} total = {total} pagechange = {pagechange} />
)

LabelNavLink.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  pagechange: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    current: state.current,
    total: state.total
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pagechange: page => {
      dispatch(pageChange(page))
    }
  }
}

const _LabelNavLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(LabelNavLink)
export default _LabelNavLink
