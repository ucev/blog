import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import FilterInput from './filter-input'
import FilterSelect from './filter-select'
import ArticleTable from './article-table'
import ConfirmDialog from "../../components/dialogs/confirm-dialog"
import OptionDialog from "../../components/dialogs/option-dialog"
import TableNavLink from "../../components/table-foot-nav"

import {
  addArticle,
  deleteArticleCancel,
  deleteArticleConfirm,
  fetchArticles as _fetchArticles,
  fetchCategories as _fetchCategories,
  handlePageChange,
  moveCategoryCancel,
  moveCategoryConfirm
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
        <TableNavLink page = {this.props.current} total = {this.props.total} pagechange = {this.props.pageChange} />
        <ConfirmDialog title = '确认删除?' confirm = {this.props.deleteConfirm} cancel = {this.props.deleteCancel} visible = {this.props.delVisible} />
        <OptionDialog title = '移动文章分组' optionItems = {this.props.categories} visible = {this.props.moveVisible} confirm = {this.props.moveConfirm} cancel = {this.props.moveCancel} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: state.categories,
  checkState: state.checkState,
  current: state.current,
  delVisible: state.delVisible,
  moveVisible: state.moveVisible,
  total: state.total,
})
const mapDispatchToProps = (dispatch) => ({
  deleteCancel: () => {
    dispatch(deleteArticleCancel())
  },
  deleteConfirm: () => {
    dispatch(deleteArticleConfirm())
  },
  fetchArticles: () => {
    dispatch(_fetchArticles())
  },
  fetchCategories: () => {
    dispatch(_fetchCategories())
  },
  moveCancel: () => {
    dispatch(moveCategoryCancel())
  },
  moveConfirm: (gid) => {
    dispatch(moveCategoryConfirm(gid))
  },
  pageChange: (page) => {
    dispatch(handlePageChange(page))
  }
})

const _ArticleLayout = connect(
            mapStateToProps,
  mapDispatchToProps
)(ArticleLayout)
export default _ArticleLayout
