import React from 'react'

import './dialog.style.scss'

class Dialog extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    let centerScreen = !(this.props.centerScreen === false)
    let className = 'dialog-div ' + this.props.className
    if (centerScreen) {
      className += ' dialog-div-center-screen'
    }
    let styles = Object.assign(
      {},
      this.props.styles,
      !this.props.visible
        ? {
          display: 'none',
        }
        : {
          display: 'block',
        }
    )
    return (
      <div className={className} style={styles}>
        {this.props.children}
      </div>
    )
  }
}

Dialog.defaultProps = {
  centerScreen: true,
  visible: true,
  styles: {},
}

export default Dialog
