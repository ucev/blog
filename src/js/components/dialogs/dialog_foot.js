const React = require('react');
const ReactDOM = require('react-dom');

var DialogFoot = (props) => {
  return (
    <div className = 'dialog-buttom-operation-bar'>
      {props.children}
    </div>
  )
}

module.exports = DialogFoot;