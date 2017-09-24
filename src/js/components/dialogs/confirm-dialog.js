import React from 'react'

import CancelButton from './dialog-cancel-button'
import ConfirmButton from './dialog-confirm-button'
import Dialog from './dialog'
import DialogHeader from './dialog-header'
import DialogFoot from './dialog-foot'

class ConfirmDialog extends React.Component {
  constructor (props) {
    super(props)
    this.handleConfirmClick = this.handleConfirmClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
  }
  handleConfirmClick () {
    this.props.confirm()
  }
  handleCancelClick () {
    this.props.cancel()
  }
  render () {
    return (
      <Dialog className = "confirm-dialog" centerScreen = {this.props.centerScreen} visible = {this.props.visible}>
        <DialogHeader>
          <div className = "dialog-title-div">{this.props.title}</div>
        </DialogHeader>
        <DialogFoot>
          <ConfirmButton title = "确定" click = {this.handleConfirmClick} />
          <CancelButton title = "取消" click = {this.handleCancelClick} />
        </DialogFoot>
      </Dialog>
    )
  }
}

export default ConfirmDialog
