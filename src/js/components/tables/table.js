const React = require('react');
const ReactDOM = require('react-dom');

var Table = (props) => {
  var classes = `content-table ${props.type}-content-table`;
  return (
    <table className = {classes}>
      {props.children}
    </table>
  )
}

module.exports = Table;