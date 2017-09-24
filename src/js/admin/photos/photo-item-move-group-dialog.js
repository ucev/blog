import React from 'react'
import { connect } from 'react-redux'

import OptionDialog from '$components/dialogs/option-dialog'
import {
  photoMoveDialogVisible,
  photoMoveSingle
} from '$actions/photos'

class PhotoItemMoveGroupDialog extends React.Component {
  constructor (props) {
    super(props)
    this.hide = this.hide.bind(this)
    this.cancel = this.cancel.bind(this)
    this.confirm = this.confirm.bind(this)
  }
  hide () {
    this.props.hide(this.props.id)
  }
  cancel () {
    this.hide()
  }
  confirm (newgid) {
    this.props.move(this.props.id, newgid)
    this.hide()
  }
  render () {
    return (
      <OptionDialog
        title="移动分组"
        optionItems={this.props.groups}
        confirm={this.confirm}
        cancel={this.cancel}
        visible={this.props.visible}
        centerScreen={false} />
    )
  }
}

const mapStateToProps = (state) => ({
  groups: state.groups
})

const mapDispatchToProps = (dispatch) => ({
  hide: (id) => {
    dispatch(photoMoveDialogVisible(id, false))
  },
  move: (id, gid) => {
    dispatch(photoMoveSingle(id, gid))
  },
})

const _PhotoItemMoveGroupDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoItemMoveGroupDialog)
export default _PhotoItemMoveGroupDialog
