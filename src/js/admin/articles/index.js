const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

const FilterInput = require('./filter-input')
const FilterSelect = require('./filter-select')
const ArticleTable = require('./article-table')
const ConfirmDialog = require("../../components/dialogs/confirm_dialog.js");
const OptionDialog = require("../../components/dialogs/option_dialog.js");
const TableNavLink = require("../../components/table_foot_nav.js");
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
    console.log('h1 ')
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
    /**
     * 这样感觉封装性稍差一点
     * 以后更有体会了再来看看😊
     * 先做一个标记
     */
    var groupopeReset = true;
    var categories = {};
    this.props.categories.forEach((category) => {
      categories[category.id] = category.name;
    })
    console.log(categories)
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
    alert('del cancel')
    dispatch(deleteArticleCancel())
  },
  deleteConfirm: () => {
    alert('del confirm')
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

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleLayout)
