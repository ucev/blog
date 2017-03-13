const React = require('react');
const ReactDOM = require('react-dom');

const CancelButton = require('./dialog_cancel_button');
const ConfirmButton = require('./dialog_confirm_button');
const Dialog = require('./dialog');
const DialogHeader = require('./dialog_header');
const DialogBody = require('./dialog_body');
const DialogFoot = require('./dialog_foot');

class InputDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  handleConfirmClick() {
    var val = this.textInput.value;
    this.props.confirm(val);
    this.textInput.value = "";
  }
  handleCancelClick() {
    this.props.cancel();
  }
  handleKeyDown(e) {
    if (e.which == 13) {
      this.handleConfirmClick();
    }
  }
  render() {
    return (
      <Dialog className = 'input-dialog' centerScreen = {this.props.centerScreen} visible = {this.props.visible}>
        <DialogHeader>
          <div className = 'dialog-title-div'>{this.props.title}</div>
        </DialogHeader>
        <DialogBody>
          <input className = 'dialog-content-input' ref = {(input) => (this.textInput = input)} onKeyDown = {this.handleKeyDown} />
        </DialogBody>
        <DialogFoot>
          <ConfirmButton title = '确定' click = {this.handleConfirmClick} />
          <CancelButton title = '取消' click = {this.handleCancelClick} />
        </DialogFoot>
      </Dialog>
    );
  }
}

module.exports = InputDialog;