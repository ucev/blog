import React from 'react'
import { connect } from 'react-redux'

import TableRow, {
  TableRowData,
  TableRowDataOperationList,
} from '$components/tables/table-row'

import {
  articleStateChange,
  handleMoveCategory,
  checkStateChange,
  handleDeleteArticle,
  modifyArticle,
} from '$actions/articles'

class ArticleRow extends React.Component {
  constructor (props) {
    super(props)
    this.article_state_label = {
      on: '已上线',
      off: '已下线',
    }
    this.handleStateClick = this.handleStateClick.bind(this)
    this.handleCheckStateChange = this.handleCheckStateChange.bind(this)
    this.article_operation = {
      on: (
        <TableRowDataOperationList>
          <li data-type="off" onClick={this.handleStateClick}>
            下线
          </li>
          <li data-type="check" onClick={this.handleStateClick}>
            核查
          </li>
        </TableRowDataOperationList>
      ),
      off: (
        <TableRowDataOperationList>
          <li data-type="on" onClick={this.handleStateClick}>
            上线
          </li>
          <li data-type="move" onClick={this.handleStateClick}>
            移动
          </li>
          <li data-type="check" onClick={this.handleStateClick}>
            核查
          </li>
          <li data-type="del" onClick={this.handleStateClick}>
            删除
          </li>
        </TableRowDataOperationList>
      ),
    }
  }
  handleStateClick (e) {
    var id = this.props.id
    var type = e.target.getAttribute('data-type')
    if (type == 'on' || type == 'off') {
      this.props.articleState(id, type)
    } else if (type == 'del') {
      this.props.deleteArticle(id)
    } else if (type == 'check') {
      modifyArticle(id)
    } else if (type == 'move') {
      this.props.move(id)
    }
  }
  handleCheckStateChange (e) {
    var id = this.props.id
    var checked = e.target.checked
    this.props.checkState(id, checked)
  }
  render () {
    const url = '/articles/view/' + this.props.id
    const topStatus = this.props.top == 0 ? {} : { color: '#EF5350' }
    const articleState = this.article_state_label[this.props.state]
    const operation = this.article_operation[this.props.state]
    const checked = this.props.checked === true ? 'checked' : ''
    return (
      <TableRow>
        <TableRowData type="checkbox">
          <input
            type="checkbox"
            checked={checked}
            onChange={this.handleCheckStateChange}
          />
        </TableRowData>
        <TableRowData type="index" onClick={this.handleIndexClick}>
          {this.props.index + 1}
        </TableRowData>
        <TableRowData type="title" style={topStatus}>
          <a href={url}>{this.props.title}</a>
        </TableRowData>
        <TableRowData type="category">{this.props.categoryname}</TableRowData>
        <TableRowData type="label">{this.props.label}</TableRowData>
        <TableRowData type="status">{articleState}</TableRowData>
        <TableRowData type="pageview">{this.props.pageview}</TableRowData>
        <TableRowData type="operation">{operation}</TableRowData>
      </TableRow>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
  articleState: (id, type) => {
    dispatch(articleStateChange(id, type))
  },
  move: id => {
    dispatch(handleMoveCategory(id))
  },
  checkState: (id, checked) => {
    dispatch(checkStateChange(id, checked))
  },
  deleteArticle: id => {
    dispatch(handleDeleteArticle(id))
  },
})

const _ArticleRow = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleRow)
export default _ArticleRow
