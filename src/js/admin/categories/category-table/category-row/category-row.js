import React from 'react'
import { connect } from 'react-redux'

import TableRow, {
  TableRowData,
  TableRowDataOperationList,
} from '$components/tables/table-row'

import {
  addCategoryDivStateChange,
  deleteCategoryHandle,
  updateCategoryOrder,
} from '$actions/categories'

import './category-row.style.scss'

class CategoryRow extends React.Component {
  constructor (props) {
    super(props)
    this.categoryOperationClick = this.categoryOperationClick.bind(this)
    this.categoryOrderChange = this.categoryOrderChange.bind(this)
    this.categoryOrderKeyDown = this.categoryOrderKeyDown.bind(this)
  }
  categoryOperationClick (e) {
    var type = e.target.getAttribute('data-type')
    var id = this.props.id
    if (type == 'modify') {
      this.props.addDivStateChange(true, 'modify', id)
    } else if (type == 'delete') {
      this.props.delete(id)
    }
  }
  categoryOrderChange (e) {
    var id = this.props.id
    var order = e.target.value
    this.props.orderChange(id, order)
  }
  categoryOrderKeyDown (e) {
    if (e.which == 13) {
      var id = this.props.id
      var order = e.target.value
      this.props.orderChange(id, order)
    }
  }
  render () {
    return (
      <TableRow subtype="category">
        <TableRowData type="index" subtype="category">{this.props.id}</TableRowData>
        <TableRowData type="name" subtype="category">
          <a href={'/articles/category/' + this.props.id}>{this.props.name}</a>
        </TableRowData>
        <TableRowData type="parent" subtype="category">{this.props.parent}</TableRowData>
        <TableRowData type="descp" subtype="category">{this.props.descp}</TableRowData>
        <TableRowData type="order" subtype="category">
          <input
            type="number"
            value={this.props.mainorder}
            onChange={this.categoryOrderChange}
            onKeyDown={this.categoryOrderKeyDown}
          />
        </TableRowData>
        <TableRowData type="articlecnt" subtype="category">
          {this.props.articlecnt}
        </TableRowData>
        <TableRowData type="operation" subtype="category">
          <TableRowDataOperationList>
            <li data-type="modify" onClick={this.categoryOperationClick}>
              修改
            </li>
            <li data-type="delete" onClick={this.categoryOperationClick}>
              删除
            </li>
            <li data-type="refact">
              <a href={'/admin/categories/refact/' + this.props.id}>重构</a>
            </li>
          </TableRowDataOperationList>
        </TableRowData>
      </TableRow>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
  addDivStateChange: (visible, type, data) => {
    dispatch(addCategoryDivStateChange(visible, type, data))
  },
  delete: id => {
    dispatch(deleteCategoryHandle(id))
  },
  orderChange: (id, order) => {
    dispatch(updateCategoryOrder(id, order))
  },
})

const _CategoryRow = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryRow)
export default _CategoryRow
