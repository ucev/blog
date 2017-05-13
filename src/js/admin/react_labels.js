const React = require('react');
const ReactDOM = require('react-dom');
const moment = require('moment');

const Table = require('../components/tables/table');
const TableLabel = require('../components/tables/table_label');
const TableBody = require('../components/tables/table_body');
const TableFoot = require('../components/tables/table_foot');
const TableNavLink = require("../components/table_foot_nav.js");

var LabelAction = null;
var LabelStore = null;

const LabelListener = require('../flux/label_listener');

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
      <TableLabel key = {1} type = 'label' labels = {labels} orderby = {this.props.orderby} orderDirect = {this.props.orderDirect} orderChange = {LabelAction.orderChange.bind(LabelAction)} />
    )
  }
}

class LabelRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const label = this.props.label;
    var addtime = moment.unix(label.addtime).format('YYYY-MM-DD');
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

    var listener = new LabelListener();
    LabelAction = listener.getAction();
    LabelStore = listener.getStore();

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
        <TableNavLink page = {this.state.current} total = {this.state.total} pagechange = {LabelAction.pageChange.bind(LabelAction)} />
      </div>
    );
  }
}

module.exports = LabelLayout;