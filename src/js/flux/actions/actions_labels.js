const BaseActions = require('./actions_base');

class LabelActions extends BaseActions {
  constructor(dispatcher) {
    super(dispatcher);
    this.dispatcher = dispatcher;
  }
  fetchLabelData(orderBy, orderDirect) {
    this.dispatcher.dispatch({
      actionType: "FETCH_LABEL_DATA",
      orderBy: orderBy,
      orderDirect: orderDirect
    })
  }
  orderChange(orderBy, orderDirect) {
    this.dispatcher.dispatch({
      actionType: "ORDER_CHANGE",
      orderBy: orderBy,
      orderDirect: orderDirect
    })
  }
  pageChange(page) {
    this.dispatcher.dispatch({
      actionType: "PAGE_CHANGE",
      page: page
    })
  }
};

module.exports = LabelActions;