const React = require('react');
const ReactDOM = require('react-dom');

var TableDataRow = (props) => {
  var datas = this.props.datas.map((data) => <td></td>)
  return (
    <tr className = 'content-row-data'>
      {datas}
    </tr>
  )
}

module.exports = TableDataRow;