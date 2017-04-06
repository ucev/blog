const CategoryDispatcher = require('../dispatcher/dispatcher_category');

var CategoryActions = {
  addCategoryCancel: function() {
    CategoryDispatcher.dispatch({
      actionType: "ADD_CATEGORY_CANCEL"
    })
  },
  addCategoryConfirm: function(data) {
    CategoryDispatcher.dispatch({
      actionType: "ADD_CATEGORY_CONFIRM",
      data: data
    })
  },
  addCategoryValueChange: function(data) {
    CategoryDispatcher.dispatch({
      actionType: "ADD_CATEGORY_VALUE_CHANGE",
      data: data
    })
  },
  addCategoryDivStateChange: function(visible, type, data) {
    CategoryDispatcher.dispatch({
      actionType: "ADD_CATEGORY_DIV_STATE_CHANGE",
      visible: visible,
      type: type,
      data: data
    }) 
  },
  deleteCategoryCancel: function() {
    CategoryDispatcher.dispatch({
      actionType: "DELETE_CATEGORY_CANCEL"
    })
  },
  deleteCategoryConfirm: function() {
    CategoryDispatcher.dispatch({
      actionType: "DELETE_CATEGORY_CONFIRM"
    })
  },
  deleteCategoryHandle: function(id) {
    CategoryDispatcher.dispatch({
      actionType: "DELETE_CATEGORY_HANDLE",
      id: id
    })
  },
  categoryOrderChange: function(id, order) {
    CategoryDispatcher.dispatch({
      actionType: "CATEGORY_ORDER_CHANGE",
      id: id,
      order: order
    })
  },
  fetchCategoryData: function() {
    CategoryDispatcher.dispatch({
      actionType: "FETCH_CATEGORY_DATA"
    })
  },
  updateCategoryOrder: function(id, order) {
    CategoryDispatcher.dispatch({
      actionType: "UPDATE_CATEGORY_ORDER",
      id: id,
      order: order
    })
  }
};

module.exports = CategoryActions;