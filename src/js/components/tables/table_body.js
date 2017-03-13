const React = require('react');
const ReactDOM = require('react-dom');

class TableBody extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tbody>
        {this.props.children}
      </tbody>
    );
  }
}

module.exports = TableBody;