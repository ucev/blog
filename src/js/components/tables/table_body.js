const React = require('react');
const ReactDOM = require('react-dom');

var TableBody = (props) => {
  return (
    <tbody>
      {props.children}
    </tbody>
  )
}

module.exports = TableBody;