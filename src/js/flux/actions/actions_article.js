const BaseActions = require('./actions_base');

class ArticleActions extends BaseActions {
  addArticle() {
    this.dispatcher.dispatch({
      actionType: "ADD_ARTICLE"
    })
  }
  allChecked(checked) {
    this.dispatcher.dispatch({
      actionType: "ALL_CHECKED",
      checked: checked
    })
  }
  articleStateChange(id, type, isgroup = false) {
    this.dispatcher.dispatch({
      actionType: "ARTICLE_STATE_CHANGE",
      id: id,
      type: type,
      isgroup: isgroup
    })
  }
  checkStateChange(id, state) {
    this.dispatcher.dispatch({
      actionType: "CHECK_STATE_CHANGE",
      id: id,
      state: state
    })
  }
  deleteArticle(id) {
    this.dispatcher.dispatch({
      actionType: "DELETE_ARTICLE",
      id: id
    })
  }
  deleteArticleCancel() {
    this.dispatcher.dispatch({
      actionType: "DELETE_ARTICLE_CANCEL"
    })
  }
  deleteArticleConfirm() {
    this.dispatcher.dispatch({
      actionType: "DELETE_ARTICLE_CONFIRM"
    })
  }
  fetchArticles() {
    this.dispatcher.dispatch({
      actionType: "FETCH_ARTICLES"
    })
  }
  fetchCategories() {
    this.dispatcher.dispatch({
      actionType: "FETCH_CATEGORIES"
    })
  }
  filterOptionChange(title, value) {
    this.dispatcher.dispatch({
      actionType: "FILTER_OPTION_CHANGE",
      title: title,
      value: value
    })
  }
  moveCategory(id) {
    this.dispatcher.dispatch({
      actionType: "MOVE_CATEGORY",
      id: id
    })
  }
  moveCategoryCancel() {
    this.dispatcher.dispatch({
      actionType: "MOVE_CATEGORY_CANCEL"
    })
  }
  moveCategoryConfirm(gid) {
    this.dispatcher.dispatch({
      actionType: "MOVE_CATEGORY_CONFIRM",
      gid: gid
    })
  }
  pageChange(page) {
    this.dispatcher.dispatch({
      actionType: "PAGE_CHANGE",
      page: page
    })
  }
};

module.exports = ArticleActions;