const React = require('react');
const ReactDOM = require('react-dom');

const AddCategoryDialog = require('../components/dialogs/add_category_dialog');
const ConfirmDialog = require("../components/dialogs/confirm_dialog.js");

const Table = require('../components/tables/table');
const TableLabel = require('../components/tables/table_label');
const TableBody = require('../components/tables/table_body');
const TableFoot = require('../components/tables/table_foot');
const TableNavLink = require("../components/table_foot_nav.js");

var CategoryActions = null;
var CategoryStore = null;

const CategoryListener = require('../flux/category_listener');

class OperationBar extends React.Component {
  constructor(props) {
    super(props);
    this.addNewCategory = this.addNewCategory.bind(this);
  }
  addNewCategory() {
    CategoryActions.addCategoryDivStateChange(true, 'add');
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
      {name: 'index', val: '序号1'},
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
      CategoryActions.addCategoryDivStateChange(true, 'modify', this.props.category);
    } else if (type == 'delete') {
      CategoryActions.deleteCategoryHandle(id);
    }
  }
  categoryOrderChange(e) {
    var id = this.props.category.id;
    var order = e.target.value;
    CategoryActions.categoryOrderChange(id, order);
  }
  categoryOrderKeyDown(e) {
    if (e.which == 13) {
      var id = this.props.category.id;
      var order = e.target.value;
      CategoryActions.updateCategoryOrder(id, order);
    }
  }
  render() {
    var category = this.props.category;
    var operationUl = (
      <ul className='content-operation-ul' data-id = {this.props.category.id}>
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
      <CategoryRow category = {category}/>
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
    this.addTitle = {
      add: '添加类别',
      modify: '修改类别'
    }
    
    var listener = new CategoryListener();
    CategoryActions = listener.getAction();
    CategoryStore = listener.getStore();

    this.state = CategoryStore.getAll();
    this.__onChange = this.__onChange.bind(this);
  }
  componentDidMount() {
    CategoryStore.addChangeListener(this.__onChange);
    CategoryActions.fetchCategoryData();
  }
  componentWillUnmount() {
    CategoryStore.removeChangeListener(this.__onChange);
  }
  __onChange() {
    this.setState(CategoryStore.getAll());
  }
  render() {
    var categories = this.state.categories;
    var addType = this.state.addType;
    return (
      <div>
        <OperationBar/>
        <CategoryTable categories = {categories}/>
        <AddCategoryDialog type = {addType} title = {this.addTitle[addType]} data = {this.state.addData} categories = {categories} visible = {this.state.addVisible} confirm = {CategoryActions.addCategoryConfirm.bind(CategoryActions)} cancel = {CategoryActions.addCategoryCancel.bind(CategoryActions)} valueChange = {CategoryActions.addCategoryValueChange.bind(CategoryActions)} />
        <ConfirmDialog title = '确认删除此类别?' visible = {this.state.delVisible} confirm = {CategoryActions.deleteCategoryConfirm.bind(CategoryActions)} cancel = {CategoryActions.deleteCategoryCancel.bind(CategoryActions)} />
      </div>
    );
  }
}

module.exports = CategoryLayout;