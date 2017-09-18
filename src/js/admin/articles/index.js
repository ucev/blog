import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import FilterInput from './filter-input'
import FilterSelect from './filter-select'
import ArticleTable from './article-table'
import ArticleDeleteDialog from './article-delete-dialog'
import ArticleMoveDialog from './article-move-dialog'
import OptionDialog from "../../components/dialogs/option-dialog"
import TableNavLink from './table-nav-link'


import {
  addArticle,
  fetchArticles,
  fetchCategories,
} from '../../redux/actions/articles'

// 😢 
class ArticleLayout extends React.Component {
  constructor(props) {
    super(props)
    this.stateOptions = [
      {value: '-1', title: '全部'},
      {value: 'on', title: '已上线'},
      {value: 'off', title: '已下线'}
    ]
    this.opeOptions = [
      {value: '-1', title: '--选择操作--'},
      {value: 'on', title: '上线'},
      {value: 'off', title: '下线'},
      {value: 'move', title: '移动'},
      {value: 'del', title: '删除'}
    ]
  }
  componentDidMount() {
    this.props.fetchArticles()
    this.props.fetchCategories()
  }
  render() {
    var groupopeReset = true;
    var categories = {};
    this.props.categories.forEach((category) => {
      categories[category.id] = category.name;
    })
    return ( 
      <div>
        <div className = 'table-filter-bar table-filter-bar-top'>
	        <button className = 'operation-button' onClick = {addArticle}>添加文章</button>
      	  <FilterInput key = 'label' title = 'label' label = '标签'/>
      	  <FilterInput key = 'category' title = 'category' label = '类别'/>
	        <FilterSelect key = 'state' title = 'state' label = '状态' options = {this.stateOptions}/>
        </div>
        <ArticleTable />
        <div className = 'table-filter-bar table-filter-bar-bottom'>
       	  <FilterSelect title = 'groupope' options = {this.opeOptions} reset = {groupopeReset} defaultVal = '-1'/>
        </div>
        <TableNavLink />
        <ArticleDeleteDialog />
        <ArticleMoveDialog />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  checkState: state.checkState,
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
