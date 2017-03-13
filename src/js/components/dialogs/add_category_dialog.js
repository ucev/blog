const React = require('react');
const ReactDOM = require('react-dom');

const CancelButton = require('./dialog_cancel_button');
const ConfirmButton = require('./dialog_confirm_button');
const Dialog = require('./dialog');
const DialogHeader = require('./dialog_header');
const DialogBody = require('./dialog_body');
const DialogFoot = require('./dialog_foot');

class AddCategoryDialog extends React.Component {
  constructor(props) {
    super(props);
    this.valueChange = this.valueChange.bind(this);
    this.addCategoryCancel = this.addCategoryCancel.bind(this);
    this.addCategoryConfirm = this.addCategoryConfirm.bind(this);
  }
  valueChange(e) {
    var title = e.target.getAttribute('data-title');
    var value = e.target.value;
    var data = this.props.data;
    data[title] = value;
    this.props.valueChange(data);
  }
  addCategoryCancel(e) {
    this.props.cancel();
    e.preventDefault();
  }
  addCategoryConfirm(e) {
    var name = this.nameInput.value;
    var parent = this.parentSelect.value;
    var descp = this.descpArea.value;
    var data = {
      name: name,
      parent: parent,
      descp: descp
    }
    this.props.confirm(data);
    e.preventDefault();
  }
  render() {
    var data = this.props.data == {} ? {} : this.props.data;
    var name = data.name ? data.name : '';
    var parent = data.parent ? data.parent : '';
    var descp = data.descp ? data.descp : '';
    var categoryItems = this.props.categories.map((category) => {
      if (category.id == parent) {
        return (<option value = {category.id} selected>{category.name}</option>);
      } else {
        return (<option value = {category.id}>{category.name}</option>);
      }
    });
    var styles;
    if (this.props.visible) {
      styles = {
        height: '300px',
        'border-width': '1px',
        opacity: 1
      }
    } else {
      styles = {
        height: '0',
        'border-width': '0',
        opacity: 0
      }
    }
    return (
      //<div id = 'add-category-div' style = {styles}>
      <Dialog className = 'add-category-dialog' visible = {this.props.visible} styles = {styles}>
        <form id = 'add-category-form'>
          <legend id = 'add-category-div-title'>{this.props.title}</legend>
          <li className = 'add-category-div-item' id = 'add-category-div-name'>
            <label className = 'add-category-div-item-label'>标题</label>
            <input ref = {(input) => {this.nameInput = input;}} className = 'add-category-div-item-input' id = 'add-category-div-item-input-name' type='text' data-title = 'name' value = {name} onChange = {this.valueChange}/>
          </li>
          <li className = 'add-category-div-item' id = 'add-category-div-parent'>
            <label className = 'add-category-div-item-label'>父节点</label>
            <select ref = {(select) => {this.parentSelect = select;}} className = 'add-category-div-item-input' id = 'add-category-div-item-input-parent' data-title = 'parent' onChange = {this.valueChange}>
              {categoryItems}
            </select>
          </li>
          <li className = 'add-category-div-item' id = 'add-category-div-descp'>
            <label className = 'add-category-div-item-label'>描述</label>
            <textarea ref = {(textarea) => {this.descpArea = textarea;}} className = 'add-category-div-item-textarea' id = 'add-category-div-item-input-descp' value = {descp} data-title = 'descp' onChange = {this.valueChange} />
          </li>
          <li className = 'add-category-div-item add-category-div-opebar'>
            <button className = 'operation-button operation-button-cancel' onClick = {this.addCategoryCancel}>取消</button>
            <button className = 'operation-button operation-button-confirm' onClick = {this.addCategoryConfirm}>添加</button>
          </li>
        </form>
      </Dialog>
      //</div>
    )
  }
}

module.exports = AddCategoryDialog;