const React = require('react');
const ReactDOM = require('react-dom');

var DialogHeader = (props) => {
  return (
    <div className = 'dialog-header-div'>
      {props.children}
    </div>
  )
}

module.exports = DialogHeader;