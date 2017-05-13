function label_dispatcher(store) {
  return function (action) {
    switch (action.actionType) {
      case "FETCH_LABEL_DATA":
        store.fetchLabelData(action.orderBy, action.orderDirect);
        break;
      case "ORDER_CHANGE":
        store.handleOrderChange(action.orderBy, action.orderDirect);
        break;
      case "PAGE_CHANGE":
        store.handlePageChange(action.page);
        break;
      default:
        break;
    }
  }
}

module.exports = label_dispatcher;