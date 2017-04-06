const ArticleDispatcher = require('../dispatcher/dispatcher_articles');

var ArticleActions = {
  addArticle: function() {
    ArticleDispatcher.dispatch({
      actionType: "ADD_ARTICLE"
    })
  },
  allChecked: function(checked) {
    ArticleDispatcher.dispatch({
      actionType: "ALL_CHECKED",
      checked: checked
    })
  },
  articleStateChange: function(id, type, isgroup = false) {
    ArticleDispatcher.dispatch({
      actionType: "ARTICLE_STATE_CHANGE",
      id: id,
      type: type,
      isgroup: isgroup
    })
  },
  checkStateChange: function(id, state) {
    ArticleDispatcher.dispatch({
      actionType: "CHECK_STATE_CHANGE",
      id: id,
      state: state
    })
  },
  deleteArticle: function(id) {
    ArticleDispatcher.dispatch({
      actionType: "DELETE_ARTICLE",
      id: id
    })
  },
  deleteArticleCancel: function() {
    ArticleDispatcher.dispatch({
      actionType: "DELETE_ARTICLE_CANCEL"
    })
  },
  deleteArticleConfirm: function() {
    ArticleDispatcher.dispatch({
      actionType: "DELETE_ARTICLE_CONFIRM"
    })
  },
  fetchArticles: function() {
    ArticleDispatcher.dispatch({
      actionType: "FETCH_ARTICLES"
    })
  },
  fetchCategories: function() {
    ArticleDispatcher.dispatch({
      actionType: "FETCH_CATEGORIES"
    })
  },
  filterOptionChange: function(title, value) {
    ArticleDispatcher.dispatch({
      actionType: "FILTER_OPTION_CHANGE",
      title: title,
      value: value
    })
  },
  moveCategory: function(id) {
    ArticleDispatcher.dispatch({
      actionType: "MOVE_CATEGORY",
      id: id
    })
  },
  moveCategoryCancel: function() {
    ArticleDispatcher.dispatch({
      actionType: "MOVE_CATEGORY_CANCEL"
    })
  },
  moveCategoryConfirm: function(gid) {
    ArticleDispatcher.dispatch({
      actionType: "MOVE_CATEGORY_CONFIRM",
      gid: gid
    })
  },
  pageChange: function(page) {
    ArticleDispatcher.dispatch({
      actionType: "PAGE_CHANGE",
      page: page
    })
  }
};

module.exports = ArticleActions;