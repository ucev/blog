const AppDispatcher = require('./dispatcher_app');
const CategoryStore = require('../stores/stores_category');
 
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case "ADD_CATEGORY_CANCEL":
      CategoryStore.addCategoryCancel();
      break;
    case "ADD_CATEGORY_CONFIRM":
      CategoryStore.addCategoryConfirm(action.data);
      break;
    case "ADD_CATEGORY_VALUE_CHANGE":
      CategoryStore.addCategoryValueChange(action.data);
      break;
    case "ADD_CATEGORY_DIV_STATE_CHANGE":
      CategoryStore.addCategoryDivStateChange(action.visible, action.type, action.data);
      break;
    case "CATEGORY_ORDER_CHANGE":
      CategoryStore.handleCategoryOrderChange(action.id, action.order);
      break;
    case "DELETE_CATEGORY_CANCEL":
      CategoryStore.deleteCategoryCancel();
      break;
    case "DELETE_CATEGORY_CONFIRM":
      CategoryStore.deleteCategoryConfirm();
      break;
    case "DELETE_CATEGORY_HANDLE":
      CategoryStore.deleteCategoryHandle(action.id);
      break;
    case "FETCH_CATEGORY_DATA":
      CategoryStore.fetchCategoryData();
      break;
    case "UPDATE_CATEGORY_ORDER":
      CategoryStore.updateCategoryOrder(action.id, action.order);
      break;
    default:
      break;
  }
});

module.exports = AppDispatcher;