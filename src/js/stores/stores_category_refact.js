const BaseStore = require('./stores_base');

class CategoryRefactStore extends BaseStore {
  constructor() {
    super();
    var cidstr = location.pathname.match(/\/admin\/categories\/refact\/(\d+)/);
    this.cid = cidstr ? Number(cidstr[1]) : -1; 
    this.tree = [];
    this.detail = {};
    this.category = -1;
    this.article = -1;
    this.cstate = {}; //categoryExpandState
  }
  articleOrderChange(newOrder, update = false) {
    var that = this;
    var id = this.detail.id;
    if (update) {
      $.ajax({
        url: '/admin/datas/articles/order',
        data: {
          id: id,
          order: newOrder
        },
        type: 'get',
        dataType: 'json',
        success: function (dt) {
          if (dt.code == 0) {
            that.getCategoryTree();
          }
        }
      })
    } else {
      var detail = this.detail;
      detail.suborder = newOrder;
      that.detail = detail;
      that.emitChange();
    }
  }
  categoryExpandChange(id) {
    var cstate = this.cstate;
    cstate[id] = cstate[id] === false;
    this.cstate = cstate;
    this.emitChange();
  }
  categoryPrefaceChange(id, isSet = true) {
    var that = this;
    var detail = this.detail;
    var data = {
      category: this.category,
      preface: id,
      isSet: isSet
    }
    $.ajax({
      url: '/admin/datas/categories/preface',
      data: data,
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.getCategoryTree();
        }
      }
    })
  }
  getCategoryTree() {
    var that = this;
    var cid = this.cid;
    $.ajax({
      url: '/admin/datas/categories/tree',
      data: {
        id: cid
      },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          var data = dt.data;
          var root = data[0];
          var tid = that.category == -1 ? root.id : that.category;
          that.tree = data;
          that.emitChange();
          that.__getRefactDetail(
            'dir',
            tid,
            function (dt1) {
              var detail = dt1.code == 0 ? dt1.data : {};
              that.detail = detail;
              that.category = tid;
              that.emitChange();
            }
          )
        }
      }
    })
  }
  getRefactDetail(type, id, cid) {
    var that = this;
    cid = type == 'dir' ? id : cid;
    this.__getRefactDetail(type, id, function (dt) {
      var detail = dt.code == 0 ? dt.data : {};
      var aid = (type === 'art' && detail.id) ? detail.id : -1;
      that.detail = detail;
      that.category = cid;
      that.article = aid;
      that.emitChange();
    });
  }
  __getRefactDetail(type, id, cb) {
    $.ajax({
      url: '/admin/datas/categories/refact/get',
      data: {
        type: type,
        id: id
      },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        cb(dt);
      }
    })
  }
  getAll() {
    return {
      cid: this.cid,
      tree: this.tree,
      detail: this.detail,
      category: this.category,
      article: this.article,
      cstate: this.cstate
    }
  }
};

module.exports = new CategoryRefactStore();