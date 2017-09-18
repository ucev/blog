import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import {
  addCategoryDivStateChange,
  categoryOrderChange,
  deleteCategoryHandle,
  updateCategoryOrder
} from '../../redux/actions/categories'

class CategoryRow extends React.Component {
  constructor(props) {
    super(props);
    this.categoryOperationClick = this.categoryOperationClick.bind(this);
    this.categoryOrderChange = this.categoryOrderChange.bind(this);
    this.categoryOrderKeyDown = this.categoryOrderKeyDown.bind(this);
  }
  categoryOperationClick(e) {
    var type = e.target.getAttribute('data-type')
    var id = e.target.parentNode.getAttribute('data-id')
    if (type == 'modify') {
      this.props.addDivStateChange(true, 'modify', this.props.category)
    } else if (type == 'delete') {
      this.props.delete(id)
    }
  }
  categoryOrderChange(e) {
    var id = this.props.category.id
    var order = e.target.value
    this.props.orderChange(id, order)
  }
  categoryOrderKeyDown(e) {
    if (e.which == 13) {
      var id = this.props.category.id
      var order = e.target.value
      this.props.orderChange(id, order)
    }
  }
  render() {
    var category = this.props.category
    var operationUl = (
      <ul className='content-operation-ul' data-id = {this.props.category.id}>
        <li data-type = 'modify' onClick = {this.categoryOperationClick}>修改</li>
        <li data-type='delete' onClick = {this.categoryOperationClick}>删除</li>
        <li data-type='refact'><a href = {'/admin/categories/refact/' + category.id}>重构</a></li>
      </ul>
    )
    return (
      <tr className = 'content-row-data category-row-data'>
        <td className = 'category-row-index-data'>{category.id}</td>
        <td className = 'category-row-name-data'><a href = {'/articles/category/' + category.id}>{category.name}</a></td>
        <td className = 'category-row-parent-data'>{category.parent}</td>
        <td className = 'category-row-descp-data'>{category.descp}</td>
        <td className = 'category-row-order-data'><input type='number' value={category.mainorder} onChange = {this.categoryOrderChange} onKeyDown = {this.categoryOrderKeyDown} /></td>
        <td className = 'category-row-articlecnt-data'>{category.articlecnt}</td>
        <td className = 'content-row-operation-data'>{operationUl}</td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  addDivStateChange: (visible, type, data) => {
    dispatch(addCategoryDivStateChange(visible, type, data))
  },
  delete: (id) => {
    dispatch(deleteCategoryHandle(id))
  },
  orderChange: (id, order) => {
    dispatch(updateCategoryOrder(id, order))
  }
})

const _CategoryRow = connect(
                       mapStateToProps,
                       mapDispatchToProps
                      )(CategoryRow)
export default _CategoryRow
