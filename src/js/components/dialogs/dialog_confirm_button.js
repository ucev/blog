const React = require('react');
const ReactDOM = require('react-dom');
const DialogButton = require('./dialog_operation_button');

var DialogConfirmButton = (props) => {
  return <DialogButton type = 'confirm' title = {props.title} click = {props.click} />
}

module.exports = DialogConfirmButton;