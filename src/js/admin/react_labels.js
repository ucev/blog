const React = require('react');
const ReactDOM = require('react-dom');

const Table = require('../components/tables/table');
const TableLabel = require('../components/tables/table_label');
const TableBody = require('../components/tables/table_body');
const TableFoot = require('../components/tables/table_foot');
const TableNavLink = require("../components/table_foot_nav.js");

const LabelAction = require('../actions/actions_labels');
const LabelStore = require('../stores/stores_labels');

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
    this.handleOrderImgClick = this.handleOrderImgClick.bind(this);
  }
  handleOrderImgClick(e) {
    var orderby = e.target.getAttribute('data-label');
    var orderDirect = this.props.orderDirect == this.orderState.asc.label ? this.orderState.desc.label : this.orderState.asc.label;
    LabelAction.orderChange(orderby, orderDirect);
  }
  render() {
    var labels = [
      {name: 'index', val: '序号', sorted: true, sortname: 'id'},
      {name: 'title', val: '标题'},
      {name: 'articlecnt', val: '文章数', sorted: true, sortname: 'articles'},
      {name: 'hotmark', val: '热度', sorted: true, sortname: 'hotmark'},
      {name: 'addtime', val: '添加日期'}
    ];
    return (
      <TableLabel key = {1} type = 'label' labels = {labels} orderby = {this.props.orderby} orderDirect = {this.props.orderDirect} orderChange = {LabelAction.orderChange} />
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
      <tr key = {label.id} className = 'content-row-data'>
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
      <Table type = 'label'>
        <LabelTableLabel orderby = {this.props.orderby} orderDirect = {this.props.orderDirect}/>
        <TableBody>
          {labels}
        </TableBody>
        <TableFoot />
      </Table>
    )
  }
}

class LabelLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = LabelStore.getAll();
    this.__onChange = this.__onChange.bind(this);
  }
  componentDidMount() {
    LabelStore.addChangeListener(this.__onChange);
    LabelAction.fetchLabelData(this.state.orderby, this.state.orderDirect);
  }
  componentWillUnmount() {
    LabelStore.removeChangeListener(this.__onChange);
  }
  __onChange() {
    this.setState(LabelStore.getAll());
  }
  render() {
    return (
      <div id = 'label-table-div'>
        <LabelTable labels = {this.state.labels} orderby = {this.state.orderby} orderDirect = {this.state.orderDirect}/>
        <TableNavLink page = {this.state.current} total = {this.state.total} pagechange = {LabelAction.pageChange} />
      </div>
    );
  }
}

module.exports = LabelLayout;