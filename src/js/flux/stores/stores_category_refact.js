const BaseStore = require('./stores_base');

class CategoryRefactStore extends BaseStore {
  constructor() {
    super();
    var cidstr = location.pathname.match(/\/admin\/categories\/refact\/(\d+)/);
    this.setState({
      cid: cidstr ? Number(cidstr[1]) : -1,
      tree: [],
      detail: {},
      category: -1,
      article: -1,
      cstate: {} //categoryExpandState
    }, false)
  }
  articleOrderChange(newOrder, update = false) {
    var that = this;
    var id = this.getState("detail").id;
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
      var detail = this.getState("detail");
      detail.suborder = newOrder;
      this.setState({detail: detail});
    }
  }
  categoryExpandChange(id) {
    var cstate = this.getState("cstate");
    cstate[id] = cstate[id] === false;
    this.setState({cstate: cstate});
  }
  categoryPrefaceChange(id, isSet = true) {
    var that = this;
    var detail = this.getState("detail");
    var data = {
      category: this.getState("category"),
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
    var cid = this.getState("cid");
    $.ajax({
      url: '/admin/datas/categories/tree',
      data: {
        id: cid
      },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          var root = dt.data;
          var tid = that.getState("category") == -1 ? root.id : that.getState("category");
          that.setState({tree: root});
          that.__getRefactDetail(
            'dir',
            tid,
            function (dt1) {
              var detail = dt1.code == 0 ? dt1.data : {};
              that.setState({
                detail: detail,
                category: tid
              })
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
      that.setState({
        detail: detail,
        category: cid,
        article: aid
      })
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
    return this.getState();
  }
};

module.exports = CategoryRefactStore;