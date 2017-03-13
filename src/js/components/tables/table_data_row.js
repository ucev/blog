const React = require('react');
const ReactDOM = require('react-dom');

class TableDataRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var datas = this.props.datas.map((data) => {
      return (
        <td></td>
      )
    })
    return (
      <tr className = 'content-row-data'>
        {datas}
      </tr>
    );
  }
}

module.exports = TableDataRow;