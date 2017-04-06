const BaseStore = require('./stores_base');

class CategoryStore extends BaseStore {
  constructor() {
    super();
    this.categories = [];
    this.addVisible = false;
    this.addType = 'add';
    this.addData = {};
    this.delVisible = false

    this.addTitle = {
      add: '添加类别',
      modify: '修改类别'
    }
  } 
  addCategoryDivStateChange(visible, type = this.addType, data = {}) {
    this.addVisible = visible;
    this.addType = type;
    this.addData = data;
    this.emitChange();
  }
  addCategoryConfirm(data) {
    var url = '';
    if (this.addType == 'add') {
      url = '/admin/datas/categories/add';
    } else if (this.addType = 'modify') {
      url = '/admin/datas/categories/modify';
      data.id = this.addData.id;
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
    this.addData = data;
    this.emitChange();
  }
  deleteCategoryConfirm() {
    var that = this;
    $.ajax({
      url: '/admin/datas/categories/delete',
      data: {
        id: that.delCategoryId
      },
      type: 'post',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.delVisible = false;
          that.delCategoryId = -1;
          //
          that.emitChange();
          that.fetchCategoryData();
        }
      }
    })
  }
  deleteCategoryCancel() {
    this.delVisible = false;
    this.emitChange();
  }
  deleteCategoryHandle(id) {
    this.delVisible = true;
    this.delCategoryId = id;
    this.emitChange();
  }
  handleCategoryOrderChange(id, order) {
    var categories = this.categories;
    for (var i in categories) {
      if (categories[i].id == id) {
        categories[i].mainorder = order;
        this.categories = categories;
        this.emitChange();
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
          localStorage.setItem('categories', JSON.stringify(dt.data));
          that.categories = dt.data;
          that.emitChange();
        }
      }
    })
  }
  getAll() {
    return {
      categories: this.categories,
      addVisible: this.addVisible,
      addType: this.addType,
      addData: this.addData,
      delVisible: this.delVisible
    }
  }
};

module.exports = new CategoryStore();