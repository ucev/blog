const LabelDispatcher = require('../dispatcher/dispatcher_labels');

var LabelActions = {
  fetchLabelData: function(orderBy, orderDirect) {
    LabelDispatcher.dispatch({
      actionType: "FETCH_LABEL_DATA",
      orderBy: orderBy,
      orderDirect: orderDirect
    })
  },
  orderChange: function(orderBy, orderDirect) {
    LabelDispatcher.dispatch({
      actionType: "ORDER_CHANGE",
      orderBy: orderBy,
      orderDirect: orderDirect
    })
  },
  pageChange: function(page) {
    LabelDispatcher.dispatch({
      actionType: "PAGE_CHANGE",
      page: page
    })
  }
};

module.exports = LabelActions;