const React = require('react');
const ReactDOM = require('react-dom');
const DialogButton = require('./dialog_operation_button');

var DialogCancelButton = (props) => {
  return <DialogButton type = 'cancel' title = {props.title} click = {props.click} />
}

module.exports = DialogCancelButton;