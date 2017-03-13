const React = require('react');
const ReactDOM = require('react-dom');

class Table extends React.Component {
  render() {
    var classes = `content-table ${this.props.type}-content-table`;
    return (
      <table className = {classes}>
        {this.props.children}
      </table>
    )
  }
}

module.exports = Table;