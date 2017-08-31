const React = require('react');
const ReactDOM = require('react-dom');

var DialogOperationButton = (props) => {
  var classes = `dialog-operation-button dialog-${props.type}-button`;
  return (
    <button className = {classes} onClick = {props.click}>{props.title}</button>
  )
}

module.exports = DialogOperationButton;