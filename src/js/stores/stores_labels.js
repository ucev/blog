const BaseStore = require('./stores_base');

class LabelStore extends BaseStore {
  constructor() {
    super();
    this.setState({
      current: 0,
      total: 0,
      orderby: 'id',
      orderDirect: 'asc',
      labels: []
    }, false);
    this.filter = {
      start: 0
    };
  }
  handlePageChange(i) {
    this.filter.start = i;
    this.fetchLabelData(this.orderby, this.orderDirect);
  }
  handleOrderChange(orderby, orderDirect) {
    this.filter.start = 0;
    this.fetchLabelData(orderby, orderDirect);
  }
  fetchLabelData(orderby, orderDirect) {
    var that = this;
    var data = {
      start: this.filter.start,
      orderby: orderby,
      asc: orderDirect
    }
    $.ajax({
      url: '/admin/datas/labels/get',
      data: data,
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          var returnData = dt.data;
          that.setState({
            current: returnData.current,
            total: returnData.total,
            orderby: orderby,
            orderDirect: orderDirect,
            labels: returnData.data
          })
        }
      }
    })
  }
  getAll() {
    return this.getState();
  }
};

module.exports = new LabelStore();