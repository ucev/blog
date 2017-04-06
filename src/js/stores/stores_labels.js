const BaseStore = require('./stores_base');

class LabelStore extends BaseStore {
  constructor() {
    super();
    this.current = 0;
    this.total = 0;
    this.orderby = 'id';
    this.orderDirect = 'asc';
    this.labels = [];
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
          that.current = returnData.current;
          that.total = returnData.total;
          that.orderby = orderby;
          that.orderDirect = orderDirect;
          that.labels = returnData.data;
          that.emitChange();
        }
      }
    })
  }
  getAll() {
    return {
      current: this.current,
      total: this.total,
      orderby: this.orderby,
      orderDirect: this.orderDirect,
      labels: this.labels
    }
  }
};

module.exports = new LabelStore();