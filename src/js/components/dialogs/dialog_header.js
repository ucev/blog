const React = require('react');
const ReactDOM = require('react-dom');

class DialogHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className = 'dialog-header-div'>
        {this.props.children}
      </div>
    )
  }
}

module.exports = DialogHeader;