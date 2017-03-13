const React = require('react');
const ReactDOM = require('react-dom');

class DialogBody extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className = 'dialog-main-body-div'>
        {this.props.children}
      </div>
    )
  }
}

module.exports = DialogBody;