const BaseStore = require('./stores_base');

class ArticleStore extends BaseStore {
  constructor() {
    super();
    this.articles = [];
    this.current = 0;
    this.total = 0;
    this.checkState = {};
    // delete dialog
    this.delVisible = false;
    this.delArticleId = -1;
    // move dialog
    this.moveVisible = false;
    this.categories = [];
    this.moveArticleId = -1;
    // group operation
    this.isgroup = false;

    // query filter
    this.filter = {
      start: 0
    };
  }
  addArticle() {
    location.href = '/admin/articles/add';
  }
  articleStateChange(id, type, isgroup = false) {
    var that = this;
    $.ajax({
      url: '/admin/datas/articles/state',
      data: {
        id: id,
        state: type
      },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (isgroup) {
          that.fetchArticles();
        } else {
          that.fetchSingleArticle(id);
        }
      },
      error: function () {
        console.log(error);
      }
    });
  }
  articleGroupChange(id, gid, isgroup = false) {
    var that = this;
    $.ajax({
      url: '/admin/datas/articles/move',
      data: {
        id: id,
        gid: gid
      },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          if (that.isgroup) {
            that.fetchArticles();
            that.moveVisible = false;
            that.moveArticleId = -1;
            that.isgroup = false;
            that.emitChange();
          } else {
            that.moveVisible = false;
            that.moveArticleId = -1;
            //
            that.emitChange();
            that.fetchSingleArticle(id);
          }
        }
      }
    })
  }
  checkStateChange(id, checked) {
    var checkState = this.checkState;
    checkState[id] = checked;
    this.checkState = checkState;
    this.emitChange();
  }
  allChecked(checked) {
    var articles = this.articles;
    var checkState = {};
    for (let i = 0; i < articles.length; i++) {
      checkState[articles[i].id] = checked;
    }
    this.checkState = checkState;
    this.emitChange();
  }
  fetchSingleArticle(id) {
    var that = this;
    $.ajax({
      url: '/admin/datas/articles/get',
      type: 'get',
      data: {
        id: id
      },
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          var articles = that.articles;
          for (let i in articles) {
            if (articles[i].id == id) {
              articles[i] = dt.data;
              that.articles = articles;
              that.emitChange();
              break;
            }
          }
        }
      }
    })
  }
  fetchArticles() {
    var that = this;
    $.ajax({
      url: '/admin/datas/articles/get',
      type: 'get',
      data: that.filter,
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.articles = dt.data.data;
          that.current = dt.data.current;
          that.total = dt.data.total;
          that.checkState = {};
          that.emitChange();
        }
      }
    });
  }
  fetchCategories() {
    var that = this;
    $.ajax({
      url: '/admin/datas/categories/get',
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.categories = dt.data;
          that.emitChange();
        }
      }
    })
  }
  handlePageChange(i) {
    this.filter.start = i;
    this.fetchArticles();
  }
  handleFilterChange(label, value) {
    if (this.filter[label] == value) return;
    this.filter[label] = value;
    this.filter.start = 0;
    this.fetchArticles();
  }
  handleDeleteArticle(id) {
    this.delVisible = true;
    this.delArticleId = id;
    this.isgroup = false;
    this.emitChange();
  }
  deleteArticleConfirm() {
    var that = this;
    $.ajax({
      url: '/admin/datas/articles/delete',
      data: {
        id: that.delArticleId
      },
      type: 'post',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          //
          that.delVisible = false;
          that.delArticleId = -1;
          that.emitChange();
          that.fetchArticles();
        }
      }
    })
  }
  deleteArticleCancel() {
    this.delVisible = false;
    this.emitChange();
  }
  filterOptionChange(title, value) {
    if (title == 'groupope') {
      this.groupOpeChange(title,value);
    } else if (title == '') {
      handleFilterChange(title, value);
    }
  }
  groupOpeChange(title, value) {
    var that = this;
    var checkState = this.checkState;
    var ids = [];
    for (let key in checkState) {
      if (checkState[key]) ids.push(key);
    }
    ids = ids.join(',');
    switch (value) {
      case 'on':
      case 'off':
        that.articleStateChange(ids, value, true);
        break;
      case 'move':
        that.moveArticleId = ids;
        that.isgroup = true;
        that.moveVisible = true;
        that.emitChange();
        break;
      case 'del':
        that.delArticleId = ids;
        that.isgroup = true;
        that.delVisible = true;
        that.emitChange();
        break;
      default:
        break;
    }
  }
  //category
  moveCategoryConfirm(gid) {
    this.articleGroupChange(this.moveArticleId, gid, false);
  }
  moveCategoryCancel() {
    this.moveVisible = false;
    this.emitChange();
  }
  handleMoveCategory(id) {
    this.moveArticleId = id;
    this.isgroup = false;
    this.moveVisible = true;
    this.emitChange();
  }
  getAll() {
    return {
      articles: this.articles,
      current: this.current,
      total: this.total,
      checkState: this.checkState,
      // delete dialog
      delVisible: this.delVisible,
      delArticleId: this.delArticleId,
      // move dialog
      moveVisible: this.moveVisible,
      categories: this.categories,
      moveArticleId: this.moveArticleId,
      // group operation
      isgroup: this.isgroup
    }
  }
}

module.exports = new ArticleStore();