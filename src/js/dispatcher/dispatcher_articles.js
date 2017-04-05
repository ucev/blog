const AppDispatcher = require('./dispatcher_app');
const ArticleStore = require('../stores/stores_article');

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case "ALL_CHECKED":
      ArticleStore.allChecked(action.checked);
      break;
    case "ARTICLE_STATE_CHANGE":
      ArticleStore.articleStateChange(action.id, action.type, action.isgroup);
      break;
    case "CHECK_STATE_CHANGE":
      ArticleStore.checkStateChange(action.id, action.state);
      break;
    case "DELETE_ARTICLE":
      ArticleStore.handleDeleteArticle(action.id);
      break;
    case "FETCH_ARTICLES":
      ArticleStore.fetchArticles();
      break;
    case "FETCH_CATEGORIES":
      ArticleStore.fetchCategories();
      break;
    case "FILTER_OPTION_CHANGE":
      ArticleStore.filterOptionChange(action.label, action.value);
      break;
    case "MOVE_CATEGORY":
      ArticleState.handleMoveCategory(action.id);
      break;
    case "PAGE_CHANGE":
      ArticleState.handlePageChange(action.page);
      break;
    default:
      break;
  }
});

module.exports = AppDispatcher;