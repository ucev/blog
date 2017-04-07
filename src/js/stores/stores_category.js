const BaseStore = require('./stores_base');

class CategoryStore extends BaseStore {
  constructor() {
    super();
    this.setState({
      categories: [],
      addVisible: false,
      addType: 'add',
      addData: {},
      delVisible: false
    }, false);

    this.addTitle = {
      add: '添加类别',
      modify: '修改类别'
    }
  } 
  addCategoryDivStateChange(visible, type = this.getState("addType"), data = {}) {
    this.setState({
      addVisible: visible,
      addType: type,
      addData: data
    })
  }
  addCategoryConfirm(data) {
    var url = '';
    if (this.getState("addType") == 'add') {
      url = '/admin/datas/categories/add';
    } else if (this.getState("addType") == 'modify') {
      url = '/admin/datas/categories/modify';
      data.id = this.getState("addData").id;
    }
    var that = this;
    $.ajax({
      url: url,
      data: data,
      type: 'post',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.addCategoryDivStateChange(false);
          that.fetchCategoryData();
        }
      }
    })
  }
  addCategoryCancel() {
    this.addCategoryDivStateChange(false);
  }
  addCategoryValueChange(data) {
    this.setState({addData: data});
  }
  deleteCategoryConfirm() {
    var that = this;
    $.ajax({
      url: '/admin/datas/categories/delete',
      data: {
        id: that.getState("delCategoryId")
      },
      type: 'post',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.setState({
            delVisible: false,
            delCategoryId: -1
          })
          //
          that.fetchCategoryData();
        }
      }
    })
  }
  deleteCategoryCancel() {
    this.setState({delVisible: false});
  }
  deleteCategoryHandle(id) {
    this.setState({delVisible: true, delCategoryId: id});
  }
  handleCategoryOrderChange(id, order) {
    var categories = this.getState("categories");
    for (var i in categories) {
      if (categories[i].id == id) {
        categories[i].mainorder = order;
        this.setState({categories: categories});
        break;
      }
    }
  }
  updateCategoryOrder(id, order) {
    var that = this;
    $.ajax({
      url: '/admin/datas/categories/modify',
      data: {
        id: id,
        order: order
      },
      type: 'post',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.fetchCategoryData();
        }
      }
    })
  }
  fetchCategoryData() {
    var that = this;
    $.ajax({
      url: '/admin/datas/categories/get',
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          // ?
          localStorage.setItem('categories', JSON.stringify(dt.data));
          that.setState({"categories": dt.data});
        }
      }
    })
  }
  getAll() {
    return this.getState();
  }
};

module.exports = new CategoryStore();