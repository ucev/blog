const React = require('react');
const ReactDOM = require('react-dom');

class DialogFoot extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className = 'dialog-buttom-operation-bar'>
        {this.props.children}
      </div>
    )
  }
}

module.exports = DialogFoot;