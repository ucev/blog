const React = require('react')
const ReactDOM = require('react-dom')

const TableLabel = require('../../components/tables/table_label')

class CategoryLabel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var labels = [
      {name: 'index', val: '序号1'},
      {name: 'name', val: '名称'},
      {name: 'parent', val: '父节点'},
      {name: 'descp', val: '描述'},
      {name: 'order', val: '顺序'},
      {name: 'articlecnt', val: '文章数'},
      {name: 'operation', val: '操作'}
    ]
    return (
      <TableLabel key = {1} type = 'category' labels = {labels} />
    )
  }
}

module.exports = CategoryLabel
