const BaseActions = require('./actions_base');

class CategoryRefactActions extends BaseActions {
  articleOrderChange(newOrder, update = false) {
    this.dispatcher.dispatch({
      actionType: "ARTICLE_ORDER_CHANGE",
      newOrder: newOrder,
      update: update
    })
  }
  categoryExpandChange(id) {
    this.dispatcher.dispatch({
      actionType: "CATEGORY_EXPAND_CHANGE",
      id: id
    })
  }
  categoryPrefaceChange(id, isSet = true) {
    this.dispatcher.dispatch({
      actionType: "CATEGORY_PREFACE_CHANGE",
      id: id,
      isSet: isSet
    })
  }
  getCategoryTree() {
    this.dispatcher.dispatch({
      actionType: "GET_CATEGORY_TREE"
    })
  }
  getRefactDetail(type, id, cid) {
    this.dispatcher.dispatch({
      actionType: "GET_REFACT_DETAIL",
      type: type,
      id: id,
      cid: cid
    })
  }
};

module.exports = CategoryRefactActions;