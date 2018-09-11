import React from 'react'
import { connect } from 'react-redux'

import ArticleTable from '../article-table'
import ArticleDeleteDialog from '../article-delete-dialog'
import ArticleMoveDialog from '../article-move-dialog'
import TableNavLink from '../table-nav-link'

import TopFilterBar from '../filters/filter-bar-top'
import BottomFilterBar from '../filters/filter-bar-bottom'

import { fetchArticles, fetchCategories } from '$actions/articles'

// 😢
class ArticleLayout extends React.Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    this.props.fetchArticles()
    this.props.fetchCategories()
  }
  render () {
    var categories = {}
    this.props.categories.forEach(category => {
      categories[category.id] = category.name
    })
    return (
      <div>
        <TopFilterBar />
        <ArticleTable />
        <BottomFilterBar />
        <TableNavLink />
        <ArticleDeleteDialog />
        <ArticleMoveDialog />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  checkState: state.checkState,
})
const mapDispatchToProps = dispatch => ({
  fetchArticles: () => {
    dispatch(fetchArticles())
  },
  fetchCategories: () => {
    dispatch(fetchCategories())
  },
})

const _ArticleLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleLayout)
export default _ArticleLayout
