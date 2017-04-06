const CategoryRefactDispatcher = require('../dispatcher/dispatcher_category_refact');

var CategoryRefactActions = {
  articleOrderChange: function(newOrder, update = false) {
    CategoryRefactDispatcher.dispatch({
      actionType: "ARTICLE_ORDER_CHANGE",
      newOrder: newOrder,
      update: update
    })
  },
  categoryExpandChange: function(id) {
    CategoryRefactDispatcher.dispatch({
      actionType: "CATEGORY_EXPAND_CHANGE",
      id: id
    })
  },
  categoryPrefaceChange: function(id, isSet = true) {
    CategoryRefactDispatcher.dispatch({
      actionType: "CATEGORY_PREFACE_CHANGE",
      id: id,
      isSet: isSet
    })
  },
  getCategoryTree: function() {
    CategoryRefactDispatcher.dispatch({
      actionType: "GET_CATEGORY_TREE"
    })
  },
  getRefactDetail: function(type, id, cid) {
    CategoryRefactDispatcher.dispatch({
      actionType: "GET_REFACT_DETAIL",
      type: type,
      id: id,
      cid: cid
    })
  }
};

module.exports = CategoryRefactActions;