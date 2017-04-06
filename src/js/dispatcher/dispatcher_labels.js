const AppDispatcher = require('./dispatcher_app');
const LabelStore = require('../stores/stores_labels');

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case "FETCH_LABEL_DATA":
      LabelStore.fetchLabelData(action.orderBy, action.orderDirect);
      break;
    case "ORDER_CHANGE":
      LabelStore.handleOrderChange(action.orderBy, action.orderDirect);
      break;
    case "PAGE_CHANGE":
      LabelStore.handlePageChange(action.page);
      break;
    default:
      break;
  }
});

module.exports = AppDispatcher;