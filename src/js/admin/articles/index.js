import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import FilterSelect from './filter-select'
import ArticleTable from './article-table'
import ArticleDeleteDialog from './article-delete-dialog'
import ArticleMoveDialog from './article-move-dialog'
import TableNavLink from './table-nav-link'

import TopFilterBar from './filter-bar-top'
import BottomFilterBar from './filter-bar-bottom'

import {
  fetchArticles,
  fetchCategories
} from '../../redux/actions/articles'

// 😢 
class ArticleLayout extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchArticles()
    this.props.fetchCategories()
  }
  render() {
    var categories = {};
    this.props.categories.forEach((category) => {
      categories[category.id] = category.name;
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
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  checkState: state.checkState
})
const mapDispatchToProps = (dispatch) => ({
  fetchArticles: () => {
    dispatch(fetchArticles())
  },
  fetchCategories: () => {
    dispatch(fetchCategories())
  }
})

const _ArticleLayout = connect(
                         mapStateToProps,
                         mapDispatchToProps
                        )(ArticleLayout)
export default _ArticleLayout
