import React from 'react'
import { connect } from 'react-redux'

import InputDialog from '$components/dialogs/input-dialog'
import { photoInputDialogVisible, photoRename } from '$actions/photos'

class PhotoItemRenameDialog extends React.Component {
  constructor(props) {
    super(props)
    this.hide = this.hide.bind(this)
    this.confirm = this.confirm.bind(this)
    this.cancel = this.cancel.bind(this)
  }
  hide() {
    this.props.hide(this.props.id)
  }
  confirm(name) {
    this.props.rename(this.props.id, name)
    this.hide()
  }
  cancel() {
    this.hide()
  }
  render() {
    return (
      <InputDialog
        title="编辑名称"
        centerScreen={false}
        confirm={this.confirm}
        cancel={this.cancel}
        visible={this.props.visible}
      />
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  hide: id => {
    dispatch(photoInputDialogVisible(id, false))
  },
  rename: (id, name) => {
    dispatch(photoRename(id, name))
  },
})

const _PhotoItemRenameDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoItemRenameDialog)
export default _PhotoItemRenameDialog
