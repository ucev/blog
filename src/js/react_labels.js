const TableNavLink = require("./components/table_foot_nav.js");
// 这个扩展是从网上复制过来的
Date.prototype.format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

class LabelTableLabel extends React.Component {
  constructor(props) {
    super(props);
    this.orderState = {
      asc: {
        label: 'asc',
        imgsrc: '/images/icons/ic_arrow_drop_down_white_24dp_2x.png'
      },
      desc: {
        label: 'desc',
        imgsrc: '/images/icons/ic_arrow_drop_up_white_24dp_2x.png'
      }
    }
    this.handleOrderImgClick = this.handleOrderImgClick.bind(this);
  }
  handleOrderImgClick(e) {
    var orderby = e.target.getAttribute('data-label');
    var orderDirect = this.props.orderDirect == this.orderState.asc.label ? this.orderState.desc.label : this.orderState.asc.label;
    this.props.orderChange(orderby, orderDirect);
  }
  render() {
    var targetsrc, othersrc;
    if (this.props.orderDirect == this.orderState.asc.label) {
      targetsrc = this.orderState.asc.imgsrc;
    } else {
      targetsrc = this.orderState.desc.imgsrc;
    }
    othersrc = this.orderState.asc.imgsrc;
    return (
      <tr className = 'content-row-label'>
        <th className = 'content-row-index-label label-row-index-label'>序号<img className = 'label-row-hotmark-order-img' src = {this.props.orderby == 'id' ? targetsrc : othersrc} data-label = 'id' onClick =  {this.handleOrderImgClick} ></img></th>
        <th className = 'content-row-title-label label-row-title-label'>标题</th>
        <th className = 'content-row-article-count-label label-row-articlecnt-label'>文章数<img className = 'label-row-hotmark-order-img' src = {this.props.orderby == 'id' ? targetsrc : othersrc} data-label = 'articles' onClick =  {this.handleOrderImgClick} ></img></th>
        <th className = 'content-row-hotmark-label label-row-hotmark-label'>热度<img className = 'label-row-hotmark-order-img' src = {this.props.orderby == 'hotmark' ? targetsrc : othersrc} data-label = 'hotmark' onClick =  {this.handleOrderImgClick} ></img></th>
        <th className = 'content-row-addtime-label label-row-addtime-label'>添加日期</th>
      </tr>
    )
  }
}

class LabelRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const label = this.props.label;
    var addtime = new Date(label.addtime * 1000).format('yyyy-MM-dd');
    return (
      <tr className = 'content-row-data'>
        <td className = 'content-row-index-data'>{label.id}</td>
        <td className = 'content-row-title-data label-row-title-data'><a href = {'/articles/search?args=' + label.name}>{label.name}</a></td>
        <td className = 'content-row-article-count-data'>{label.articles}</td>
        <td className = 'content-row-hotmark-data'>{label.hotmark}</td>
        <td className = 'content-row-addtime-data'>{addtime}</td>
      </tr>
    )
  }
}

class LabelTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const labels = this.props.labels.map((label) => (
      <LabelRow label = {label} />
    ))
    return (
      <table className = 'content-table'>
        <thead>
          <LabelTableLabel orderby = {this.props.orderby} orderDirect = {this.props.orderDirect} orderChange = {this.props.orderChange} />
        </thead>
        <tbody>
          {labels}
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    )
  }
}

class LabelLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      total: 0,
      orderby: 'id',
      orderDirect: 'asc',
      labels: []
    }
    this.filter = {start : 0};
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.fetchLabelData = this.fetchLabelData.bind(this);
    this.fetchLabelData(this.state.orderby, this.state.orderDirect);
  }
  handlePageChange(i) {
    this.filter.start = i;
    this.fetchLabelData();
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
      success: function(dt) {
        if (dt.code == 0) {
          var returnData = dt.data;
          that.setState({
            current: returnData.current,
            total: returnData.total,
            orderby: orderby,
            orderDirect: orderDirect,
            labels: returnData.data
          });
        }
      }
    })
  }
  render() {
    return (
      <div id = 'label-table-div'>
        <LabelTable labels = {this.state.labels} orderby = {this.state.orderby} orderDirect = {this.state.orderDirect} orderChange = {this.handleOrderChange} />
        <TableNavLink page = {this.state.current} total = {this.state.total} pagechange = {this.handlePageChange} />
      </div>
    );
  }
}

module.exports = LabelLayout;