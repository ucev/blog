import React from 'react'

import CancelButton from '../dialog-cancel-button'
import ConfirmButton from '../dialog-confirm-button'
import Dialog from '../dialog'
import DialogBody from '../dialog-body'
import DialogFoot from '../dialog-foot'
import OptionDialogOptionItem from './option-dialog-option-item'

import './option-dialog.style.scss'

class OptionDialog extends React.Component {
  constructor (props) {
    super(props)
    this.handleConfirmClick = this.handleConfirmClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleGroupChange = this.handleGroupChange.bind(this)
    this.state = {
      newgroup: -1,
    }
  }

  handleConfirmClick () {
    this.props.confirm(this.state.newgroup)
  }

  handleCancelClick () {
    this.props.cancel()
  }

  handleGroupChange (e) {
    var radio = e.target
    if (radio.checked) {
      this.setState({
        newgroup: radio.value,
      })
    }
  }

  render () {
    var groupItems = this.props.optionItems.map(group => {
      if (group.id == -1) return ''
      return (
        <OptionDialogOptionItem
          key={group.id}
          id={group.id}
          name={group.name}
          handleGroupChange={this.handleGroupChange}
        />
      )
    })
    return (
      <Dialog
        className="option-dialog"
        centerScreen={this.props.centerScreen}
        visible={this.props.visible}>
        <DialogBody>
          <ul className="option-dialog-option-ul">{groupItems}</ul>
        </DialogBody>
        <DialogFoot>
          <ConfirmButton title="确定" click={this.handleConfirmClick} />
          <CancelButton title="取消" click={this.handleCancelClick} />
        </DialogFoot>
      </Dialog>
    )
  }
}

export default OptionDialog
