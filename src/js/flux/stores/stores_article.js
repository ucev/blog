const BaseStore = require('./stores_base');

class ArticleStore extends BaseStore {
  constructor() {
    super();
    this.setState({
      articles: [],
      current: 0,
      total: 0,
      checkState: {},
      // delete dialog
      delVisible: false,
      delArticleId: -1,
      // move dialog
      moveVisible: false,
      categories: [],
      moveArticleId: -1,
      // group operation
      isgroup: false
    }, false)

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
            that.setState({
              moveVisible: false,
              moveArticleId: -1,
              isgroup: false
            })
          } else {
            that.setState({
              moveVisible: false,
              moveArticleId: -1
            })
            //
            that.fetchSingleArticle(id);
          }
        }
      }
    })
  }
  checkStateChange(id, checked) {
    var checkState = this.getState("checkState");
    checkState[id] = checked;
    this.setState({checkState: checkState});
  }
  allChecked(checked) {
    var articles = this.getState("articles");
    var checkState = {};
    for (let i = 0; i < articles.length; i++) {
      checkState[articles[i].id] = checked;
    }
    this.setState({checkState: checkState});
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
              that.setState({articles: articles});
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
          that.setState({
            articles: dt.data.data,
            current: dt.data.current,
            total: dt.data.total,
            checkState: {}
          })
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
          that.setState({categories: dt.data});
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
    this.setState({
      delVisible: true,
      delArticleId: id,
      isgroup: false
    })
  }
  deleteArticleConfirm() {
    var that = this;
    $.ajax({
      url: '/admin/datas/articles/delete',
      data: {
        id: that.getState("delArticleId")
      },
      type: 'post',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          //
          that.setState({
            delVisible: false,
            delArticleId: -1
          });
          that.fetchArticles();
        }
      }
    })
  }
  deleteArticleCancel() {
    this.setState({delVisible: false});
  }
  filterOptionChange(title, value) {
    if (title == 'groupope') {
      this.groupOpeChange(title,value);
    } else if (title != '') {
      this.handleFilterChange(title, value);
    }
  }
  groupOpeChange(title, value) {
    var that = this;
    var checkState = this.getState("checkState");
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
        that.setState({
          moveArticleId: ids,
          isgroup: true,
          moveVisible: true
        })
        break;
      case 'del':
        that.setState({
          delArticleId: ids,
          isgroup: true,
          delVisible: true
        })
        break;
      default:
        break;
    }
  }
  //category
  moveCategoryConfirm(gid) {
    this.articleGroupChange(this.getState("moveArticleId"), gid, false);
  }
  moveCategoryCancel() {
    this.setState({moveVisible: false});
  }
  handleMoveCategory(id) {
    this.setState({
      moveArticleId: id,
      isgroup: false,
      moveVisible: true
    })
  }
  getAll() {
    return this.getState();
  }
}

module.exports = ArticleStore;