const React = require('react');
const ReactDOM = require('react-dom');
const DialogButton = require('./dialog_operation_button');

class DialogCancelButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <DialogButton type = 'cancel' title = {this.props.title} click = {this.props.click} />
    )
  }
}

module.exports = DialogCancelButton;