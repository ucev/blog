function category_dispatcher(store) {
  return function (action) {
    switch (action.actionType) {
      case "ADD_CATEGORY_CANCEL":
        store.addCategoryCancel();
        break;
      case "ADD_CATEGORY_CONFIRM":
        store.addCategoryConfirm(action.data);
        break;
      case "ADD_CATEGORY_VALUE_CHANGE":
        store.addCategoryValueChange(action.data);
        break;
      case "ADD_CATEGORY_DIV_STATE_CHANGE":
        store.addCategoryDivStateChange(action.visible, action.type, action.data);
        break;
      case "CATEGORY_ORDER_CHANGE":
        store.handleCategoryOrderChange(action.id, action.order);
        break;
      case "DELETE_CATEGORY_CANCEL":
        store.deleteCategoryCancel();
        break;
      case "DELETE_CATEGORY_CONFIRM":
        store.deleteCategoryConfirm();
        break;
      case "DELETE_CATEGORY_HANDLE":
        store.deleteCategoryHandle(action.id);
        break;
      case "FETCH_CATEGORY_DATA":
        store.fetchCategoryData();
        break;
      case "UPDATE_CATEGORY_ORDER":
        store.updateCategoryOrder(action.id, action.order);
        break;
      default:
        break;
    }
  }
}

module.exports = category_dispatcher;