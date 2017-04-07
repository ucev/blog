function article_dispatcher(store) {
  return function (action) {
    switch (action.actionType) {
      case "ADD_ARTICLE":
        store.addArticle();
        break;
      case "ALL_CHECKED":
        store.allChecked(action.checked);
        break;
      case "ARTICLE_STATE_CHANGE":
        store.articleStateChange(action.id, action.type, action.isgroup);
        break;
      case "CHECK_STATE_CHANGE":
        store.checkStateChange(action.id, action.state);
        break;
      case "DELETE_ARTICLE":
        store.handleDeleteArticle(action.id);
        break;
      case "DELETE_ARTICLE_CANCEL":
        store.deleteArticleCancel();
        break;
      case "DELETE_ARTICLE_CONFIRM":
        store.deleteArticleConfirm();
        break;
      case "FETCH_ARTICLES":
        store.fetchArticles();
        break;
      case "FETCH_CATEGORIES":
        store.fetchCategories();
        break;
      case "FILTER_OPTION_CHANGE":
        store.filterOptionChange(action.title, action.value);
        break;
      case "MOVE_CATEGORY":
        store.handleMoveCategory(action.id);
        break;
      case "MOVE_CATEGORY_CANCEL":
        store.moveCategoryCancel();
        break;
      case "MOVE_CATEGORY_CONFIRM":
        store.moveCategoryConfirm(action.gid);
        break;
      case "PAGE_CHANGE":
        store.handlePageChange(action.page);
        break;
      default:
        break;
    }
  }
}

module.exports = article_dispatcher;