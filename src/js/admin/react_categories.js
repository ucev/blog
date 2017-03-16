const React = require('react');
const ReactDOM = require('react-dom');

const AddCategoryDialog = require('../components/dialogs/add_category_dialog');
const ConfirmDialog = require("../components/dialogs/confirm_dialog.js");

const Table = require('../components/tables/table');
const TableLabel = require('../components/tables/table_label');
const TableBody = require('../components/tables/table_body');
const TableFoot = require('../components/tables/table_foot');
const TableNavLink = require("../components/table_foot_nav.js");

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

class CategoryLabel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var labels = [
      {name: 'index', val: '序号'},
      {name: 'name', val: '名称'},
      {name: 'parent', val: '父节点'},
      {name: 'descp', val: '描述'},
      {name: 'order', val: '顺序'},
      {name: 'articlecnt', val: '文章数'},
      {name: 'operation', val: '操作'}
    ]
    return (
      <TableLabel key = {1} type = 'category' labels = {labels} />
    )
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
      <tr key = {category.id} className = 'content-row-data category-row-data'>
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
      <Table type = 'category'>
        <CategoryLabel />
        <TableBody>
          {categories}
        </TableBody>
        <TableFoot />
      </Table>
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
        <AddCategoryDialog type = {addType} title = {this.addTitle[addType]} data = {this.state.addData} categories = {categories} visible = {this.state.addVisible} confirm = {this.addCategoryDivConfirm} cancel = {this.addCategoryDivCancel} valueChange = {this.addCategoryDivValueChange} />
        <ConfirmDialog title = '确认删除此类别?' visible = {this.state.delVisible} confirm = {this.deleteCategoryConfirm} cancel = {this.deleteCategoryCancel} />
      </div>
    );
  }
}

module.exports = CategoryLayout;