class OptionDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.state = {
      newgroup : -1
    };
  }
  
  handleConfirmClick(e) {
    this.props.confirm(this.state.newgroup);
  }
  
  handleCancelClick(e) {
    this.props.cancel();
  }

  handleGroupChange(e) {
    var radio = e.target;
    if (radio.checked) {
      this.setState({
        newgroup: radio.value
      });
    }
  }

  render() {
    var centerScreen = !(this.props.centerScreen === false);
    var classes = "dialog-div option-dialog";
    if (centerScreen) {
      classes += " dialog-div-center-screen";
    }
    var styles = {};
    if (!this.props.visible) styles.display = 'none';
    var groupItems = this.props.optionItems.map((group) => {
      if (group.id == -1) return '';
      return (
        <li className = 'option-dialog-option-li'>
          <input type = 'radio' name = 'photogroup' value = {group.id} onChange = {this.handleGroupChange}/>
          <label>{group.name}</label>
        </li>
      );
    });
    return (
      <div className = {classes} style = {styles} data-title = {this.props.title}>
        <div className = 'dialog-main-body-div'>
          <ul className = 'option-dialog-option-ul'>
            {groupItems}
          </ul>
        </div>
        <div className = 'dialog-bottom-operation-bar'>
          <button className = 'dialog-operation-button dialog-confirm-button' onClick = {this.handleConfirmClick}>确定</button>
          <button className = 'dialog-operation-button dialog-cancel-button' onClick = {this.handleCancelClick}>取消</button>
        </div>
      </div>
    );
  }
}

module.exports = OptionDialog;