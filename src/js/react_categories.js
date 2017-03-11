const ConfirmDialog = require("./components/confirm_dialog.js");
const TableNavLink = require("./components/table_foot_nav.js");

class OperationBar extends React.Component {
  constructor(props) {
    super(props);
    this.addNewCategory = this.addNewCategory.bind(this);
  }
  addNewCategory() {
    this.props.addNewCategory(true, 'add');
  }
  render() {
    return (
      <div className = 'table-operation-bar table-operation-bar-top'>
        <button className = 'operation-button operation-button-confirm' onClick = {this.addNewCategory}>新建类别</button>
      </div>
    )
  }
}

class AddCategoryDiv extends React.Component {
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
      <div id = 'add-category-div' style = {styles}>
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
      </div>
    )
  }
}

class CategoryLabel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tr className = 'content-row-label category-row-label'>
        <th className = 'category-row-index-label'>序号</th>
        <th className = 'category-row-name-label'>名称</th>
        <th className = 'category-row-parent-label'>父节点</th>
        <th className = 'category-row-descp-label'>描述</th>
        <th className = 'category-row-order-label'>顺序</th>
        <th className = 'category-row-articlecnt-label'>文章数</th>
        <th className = 'content-row-operation-label category-row-operation-label'>操作</th>
      </tr>
    );
  }
}

class CategoryRow extends React.Component {
  constructor(props) {
    super(props);
    this.categoryOperationClick = this.categoryOperationClick.bind(this);
    this.categoryOrderChange = this.categoryOrderChange.bind(this);
    this.categoryOrderKeyDown = this.categoryOrderKeyDown.bind(this);
  }
  categoryOperationClick(e) {
    var type = e.target.getAttribute('data-type');
    var id = e.target.parentNode.getAttribute('data-id');
    if (type == 'modify') {
      this.props.modify(true, 'modify', this.props.category);
    } else if (type == 'delete') {
      this.props.delete(id);
    }
  }
  categoryOrderChange(e) {
    var id = this.props.category.id;
    var order = e.target.value;
    this.props.handleCategoryOrderChange(id, order);
  }
  categoryOrderKeyDown(e) {
    if (e.which == 13) {
      var id = this.props.category.id;
      var order = e.target.value;
      this.props.updateCategoryOrder(id, order);
    }
  }
  render() {
    var category = this.props.category;
    var operationUl = (
      <ul className='article-operation-ul' data-id = {this.props.category.id}>
        <li data-type = 'modify' onClick = {this.categoryOperationClick}>修改</li>
        <li data-type='delete' onClick = {this.categoryOperationClick}>删除</li>
        <li data-type='refact'><a href = {'/admin/categories/refact/' + category.id}>重构</a></li>
      </ul>
    );
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
    );
  }
}

class CategoryTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var categories = this.props.categories.map((category) => (
      <CategoryRow category = {category} modify = {this.props.modify} delete = {this.props.delete} handleCategoryOrderChange = {this.props.handleCategoryOrderChange} updateCategoryOrder = {this.props.updateCategoryOrder} />
    ));
    return (
      <table className = 'content-table category-content-table'>
        <thead>
          <CategoryLabel />
        </thead>
        <tbody>
          {categories}
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    );
  }
}

class CategoryLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      addVisible: false,
      addType: 'add',
      addData: {},
      
      delVisible: false
    }
    this.addTitle = {
      add: '添加类别',
      modify: '修改类别'
    }
    this.addCategoryDivStateChange = this.addCategoryDivStateChange.bind(this);
    this.addCategoryDivValueChange = this.addCategoryDivValueChange.bind(this);
    this.addCategoryDivConfirm = this.addCategoryDivConfirm.bind(this);
    this.addCategoryDivCancel = this.addCategoryDivCancel.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.deleteCategoryConfirm = this.deleteCategoryConfirm.bind(this);
    this.deleteCategoryCancel = this.deleteCategoryCancel.bind(this);
    // category order
    this.handleCategoryOrderChange = this.handleCategoryOrderChange.bind(this);
    this.updateCategoryOrder = this.updateCategoryOrder.bind(this);
    
    this.fetchCategoryDatas = this.fetchCategoryDatas.bind(this);
    this.fetchCategoryDatas();
  }
  addCategoryDivStateChange(visible, type = this.state.addType, data = {}) {
    this.setState({
      addVisible: visible,
      addType: type,
      addData: data
    })
  }
  addCategoryDivConfirm(data) {
    var url = '';
    if (this.state.addType == 'add') {
      url = '/admin/datas/categories/add';
    } else if (this.props.addType = 'modify') {
      url = '/admin/datas/categories/modify';
      data.id = this.state.addData.id;
    }
    var that = this;
    $.ajax({
      url:url,
      data: data,
      type: 'post',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          that.addCategoryDivStateChange(false);
          that.fetchCategoryDatas();
        }
      }
    })
  }
  addCategoryDivCancel() {
    this.addCategoryDivStateChange(false);
  }
  addCategoryDivValueChange(data) {
    this.setState({
      addData: data
    })
  }
  deleteCategoryConfirm() {
    var that = this;
    $.ajax({
      url: '/admin/datas/categories/delete',
      data: {id: that.state.delCategoryId},
      type: 'post',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          that.setState({
            delVisible: false,
            delCategoryId: -1
          })
          that.fetchCategoryDatas();
        }
      }
    })
  }
  deleteCategoryCancel() {
    this.setState({
      delVisible: false
    })
  }
  handleDeleteClick(id) {
    this.setState({
      delVisible: true,
      delCategoryId: id
    })
  }
  handleCategoryOrderChange(id, order) {
    var categories = this.state.categories;
    for (var i in categories) {
      if (categories[i].id == id) {
        categories[i].mainorder = order;
        this.setState({
          categories: categories
        })
        break;
      }
    }
  }
  updateCategoryOrder(id, order) {
    var that = this;
    $.ajax({
      url:'/admin/datas/categories/modify',
      data: {id: id, order: order},
      type: 'post',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          that.fetchCategoryDatas();
        }
      }
    })
  }
  fetchCategoryDatas() {
    var that = this;
    $.ajax({
      url: '/admin/datas/categories/get',
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          localStorage.setItem('categories', JSON.stringify(dt.data));
          that.setState({
            categories: dt.data
          })
        }
      }
    })
  }
  render() {
    var categories = this.state.categories;
    var addType = this.state.addType;
    return (
      <div>
        <OperationBar addNewCategory = {this.addCategoryDivStateChange}/>
        <CategoryTable categories = {categories} fetchCategoryDatas = {this.fetchCategoryDatas} modify= {this.addCategoryDivStateChange} delete = {this.handleDeleteClick} handleCategoryOrderChange = {this.handleCategoryOrderChange} updateCategoryOrder = {this.updateCategoryOrder}/>
        <AddCategoryDiv type = {addType} title = {this.addTitle[addType]} data = {this.state.addData} categories = {categories} visible = {this.state.addVisible} confirm = {this.addCategoryDivConfirm} cancel = {this.addCategoryDivCancel} valueChange = {this.addCategoryDivValueChange} />
        <ConfirmDialog title = '确认删除此类别?' visible = {this.state.delVisible} confirm = {this.deleteCategoryConfirm} cancel = {this.deleteCategoryCancel} />
      </div>
    );
  }
}

module.exports = CategoryLayout;