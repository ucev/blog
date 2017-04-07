const BaseActions = require('./actions_base');

class CategoryActions extends BaseActions {
  addCategoryCancel() {
    this.dispatcher.dispatch({
      actionType: "ADD_CATEGORY_CANCEL"
    })
  }
  addCategoryConfirm(data) {
    this.dispatcher.dispatch({
      actionType: "ADD_CATEGORY_CONFIRM",
      data: data
    })
  }
  addCategoryValueChange(data) {
    this.dispatcher.dispatch({
      actionType: "ADD_CATEGORY_VALUE_CHANGE",
      data: data
    })
  }
  addCategoryDivStateChange(visible, type, data) {
    this.dispatcher.dispatch({
      actionType: "ADD_CATEGORY_DIV_STATE_CHANGE",
      visible: visible,
      type: type,
      data: data
    })
  }
  deleteCategoryCancel() {
    this.dispatcher.dispatch({
      actionType: "DELETE_CATEGORY_CANCEL"
    })
  }
  deleteCategoryConfirm() {
    this.dispatcher.dispatch({
      actionType: "DELETE_CATEGORY_CONFIRM"
    })
  }
  deleteCategoryHandle(id) {
    this.dispatcher.dispatch({
      actionType: "DELETE_CATEGORY_HANDLE",
      id: id
    })
  }
  categoryOrderChange(id, order) {
    this.dispatcher.dispatch({
      actionType: "CATEGORY_ORDER_CHANGE",
      id: id,
      order: order
    })
  }
  fetchCategoryData() {
    this.dispatcher.dispatch({
      actionType: "FETCH_CATEGORY_DATA"
    })
  }
  updateCategoryOrder(id, order) {
    this.dispatcher.dispatch({
      actionType: "UPDATE_CATEGORY_ORDER",
      id: id,
      order: order
    })
  }
};

module.exports = CategoryActions;