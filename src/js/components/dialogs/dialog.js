const React = require('react');
const ReactDOM = require('react-dom');

class Dialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var centerScreen = !(this.props.centerScreen === false);
    var classes = "dialog-div " + this.props.className;
    if (centerScreen) {
      classes += " dialog-div-center-screen";
    }
    var styles = this.props.styles;
    if (!this.props.visible)
      styles.display = 'none';
    else
      styles.display = 'block';
    return (
      <div className = {classes} style = {styles}>
        {this.props.children}
      </div>
    );
  }
}

Dialog.defaultProps = {
  centerScreen: true,
  visible: true,
  styles: {}
}

module.exports = Dialog;