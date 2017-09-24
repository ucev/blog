import React from 'react'
import { connect } from 'react-redux'

import { handlePageChange } from '$actions/articles'

import TableNavLink from '$components/table-foot-nav'

const ArticleTableNavLink = ({ page, total, pageChange }) => (
  <TableNavLink
    page = {page}
    total = {total}
    pagechange = {pageChange} />
)

const mapStateToProps = (state) => ({
  page: state.current,
  total: state.total
})

const mapDispatchToProps = (dispatch) => ({
  pageChange: (page) => {
    dispatch(handlePageChange(page))
  }
})

const _ArticleTableNavLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleTableNavLink)
export default _ArticleTableNavLink
