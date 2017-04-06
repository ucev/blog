const AppDispatcher = require('./dispatcher_app');
const CategoryRefactStore = require('../stores/stores_category_refact');

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case "ARTICLE_ORDER_CHANGE":
    CategoryRefactStore.articleOrderChange(action.newOrder, action.update);
      break;
    case "CATEGORY_EXPAND_CHANGE":
      CategoryRefactStore.categoryExpandChange(action.id);
      break;
    case "CATEGORY_PREFACE_CHANGE":
      CategoryRefactStore.categoryPrefaceChange(action.id, action.isSet);
      break;
    case "GET_CATEGORY_TREE":
      CategoryRefactStore.getCategoryTree();
      break;
    case "GET_REFACT_DETAIL":
      CategoryRefactStore.getRefactDetail(action.type, action.id, action.cid);
      break;
    default:
      break;
  }
});

module.exports = AppDispatcher;