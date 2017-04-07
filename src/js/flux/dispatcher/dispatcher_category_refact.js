function category_refact_dispatcher(store) {
  return function (action) {
    switch (action.actionType) {
      case "ARTICLE_ORDER_CHANGE":
        store.articleOrderChange(action.newOrder, action.update);
        break;
      case "CATEGORY_EXPAND_CHANGE":
        store.categoryExpandChange(action.id);
        break;
      case "CATEGORY_PREFACE_CHANGE":
        store.categoryPrefaceChange(action.id, action.isSet);
        break;
      case "GET_CATEGORY_TREE":
        store.getCategoryTree();
        break;
      case "GET_REFACT_DETAIL":
        store.getRefactDetail(action.type, action.id, action.cid);
        break;
      default:
        break;
    }
  }
}

module.exports = category_refact_dispatcher;