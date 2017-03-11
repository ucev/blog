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
    var centerScreen = !(this.props.centerScreen === false);
    var classes = "dialog-div input-dialog";
    if (centerScreen) {
      classes += " dialog-div-center-screen";
    }
    var styles = {};
    if (!this.props.visible)
      styles.display = 'none';
    return (
      <div className = {classes} style = {styles}>
        <div className = 'dialog-header-div'>
          <div className = 'dialog-title-div'>{this.props.title}</div>
        </div>
        <div className = 'dialog-main-body-div'>
          <input className = 'dialog-content-input' ref = {(input) => (this.textInput = input)} onKeyDown = {this.handleKeyDown} />
        </div>
        <div className = 'dialog-buttom-operation-bar'>
          <button className = 'dialog-operation-button dialog-confirm-button' onClick = {this.handleConfirmClick}>确定</button>
          <button className = 'dialog-operation-button dialog-cancel-button' onClick = {this.handleCancelClick}>取消</button>
        </div>
      </div>
    );
  }
}

module.exports = InputDialog;