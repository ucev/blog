const React = require('react');
const ReactDOM = require('react-dom');

const CancelButton = require('./dialog_cancel_button');
const ConfirmButton = require('./dialog_confirm_button');
const Dialog = require('./dialog');
const DialogHeader = require('./dialog_header');
const DialogBody = require('./dialog_body');
const DialogFoot = require('./dialog_foot');

class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }
  handleConfirmClick(e) {
    this.props.confirm();
  }
  handleCancelClick(e) {
    this.props.cancel();
  }
  render() {
    var buttons = (
      <div>
      <ConfirmButton title = '确定' click = {this.handleConfirmClick} />
      <CancelButton title = '取消' click = {this.handleCancelClick} />
      </div>
    );
    return (
      <Dialog className = 'confirm-dialog' centerScreen = {this.props.centerScreen} visible = {this.props.visible}>
        <DialogHeader>
          <div className = 'dialog-title-div'>{this.props.title}</div>
        </DialogHeader>
        <DialogFoot>
          <ConfirmButton title = '确定' click = {this.handleConfirmClick} />
          <CancelButton title = '取消' click = {this.handleCancelClick} />
        </DialogFoot>
      </Dialog>
    );
  }
}

module.exports = ConfirmDialog;