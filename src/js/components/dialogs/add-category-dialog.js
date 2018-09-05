import React from 'react'

// 需要修改
import Dialog from './dialog'

class AddCategoryDialog extends React.Component {
  constructor(props) {
    super(props)
    this.valueChange = this.valueChange.bind(this)
    this.addCategoryCancel = this.addCategoryCancel.bind(this)
    this.addCategoryConfirm = this.addCategoryConfirm.bind(this)
  }
  valueChange(e) {
    var title = e.target.getAttribute('data-title')
    var value = e.target.value
    var data = {
      name: this.props.name,
      parent: this.props.parent,
      descp: this.props.descp,
    }
    data[title] = value
    this.props.valueChange(data)
  }
  addCategoryCancel(e) {
    this.props.cancel()
    e.preventDefault()
  }
  addCategoryConfirm(e) {
    var name = this.nameInput.value
    var parent = this.parentSelect.value
    var descp = this.descpArea.value
    var data = {
      name: name,
      parent: parent,
      descp: descp,
    }
    this.props.confirm(data)
    e.preventDefault()
  }
  render() {
    var categoryItems = this.props.categories.map(category => {
      return (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      )
    })
    var styles
    if (this.props.visible) {
      styles = {
        height: '300px',
        borderWidth: '1px',
        opacity: 1,
      }
    } else {
      styles = {
        height: '0',
        borderWidth: '0',
        opacity: 0,
      }
    }
    return (
      <Dialog
        className="add-category-dialog"
        visible={this.props.visible}
        styles={styles}>
        <form id="add-category-form">
          <legend id="add-category-div-title">{this.props.title}</legend>
          <li className="add-category-div-item" id="add-category-div-name">
            <label className="add-category-div-item-label">标题</label>
            <input
              ref={input => {
                this.nameInput = input
              }}
              className="add-category-div-item-input"
              id="add-category-div-item-input-name"
              type="text"
              data-title="name"
              value={this.props.name}
              onChange={this.valueChange}
            />
          </li>
          <li className="add-category-div-item" id="add-category-div-parent">
            <label className="add-category-div-item-label">父节点</label>
            <select
              ref={select => {
                this.parentSelect = select
              }}
              className="add-category-div-item-input"
              id="add-category-div-item-input-parent"
              value={this.props.parent}
              data-title="parent"
              onChange={this.valueChange}>
              {categoryItems}
            </select>
          </li>
          <li className="add-category-div-item" id="add-category-div-descp">
            <label className="add-category-div-item-label">描述</label>
            <textarea
              ref={textarea => {
                this.descpArea = textarea
              }}
              className="add-category-div-item-textarea"
              id="add-category-div-item-input-descp"
              value={this.props.descp}
              data-title="descp"
              onChange={this.valueChange}
            />
          </li>
          <li className="add-category-div-item add-category-div-opebar">
            <button
              className="operation-button operation-button-cancel"
              onClick={this.addCategoryCancel}>
              取消
            </button>
            <button
              className="operation-button operation-button-confirm"
              onClick={this.addCategoryConfirm}>
              添加
            </button>
          </li>
        </form>
      </Dialog>
    )
  }
}

export default AddCategoryDialog
