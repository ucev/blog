const React = require('../../node_modules/react');
const ReactDOM = require('../../node_modules/react-dom');

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
    var centerScreen = !(this.props.centerScreen === false);
    var classes = "dialog-div confirm-dialog";
    if (centerScreen) {
      classes += " dialog-div-center-screen";
    }
    var styles = {};
    if (!this.props.visible) styles.display = 'none';
    return (
      <div className = {classes} style = {styles}>
        <div className = 'dialog-header-div'>
          <div className = 'dialog-title-div'>{this.props.title}</div>
        </div>
        <div className = 'dialog-bottom-operation-bar'>
          <button className = 'dialog-operation-button dialog-confirm-button' onClick = {this.handleConfirmClick}>确定</button>
          <button className = 'dialog-operation-button dialog-cancel-button' onClick = {this.handleCancelClick}>取消</button>
        </div>
      </div>
    );
  }
}

module.exports = ConfirmDialog;