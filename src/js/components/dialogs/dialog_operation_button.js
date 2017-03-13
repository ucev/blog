const React = require('react');
const ReactDOM = require('react-dom');

class DialogOperationButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var classes = `dialog-operation-button dialog-${this.props.type}-button`;
    return (
      <button className = {classes} onClick = {this.props.click}>{this.props.title}</button>
    )
  }
}

module.exports = DialogOperationButton;