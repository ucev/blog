import React from 'react'
import { connect } from 'react-redux'

import ConfirmDialog from '$components/dialogs/confirm-dialog'
import { photoDeleteSingle, photoDeleteDialogVisible } from '$actions/photos'

class PhotoItemDeleteDialog extends React.Component {
  constructor (props) {
    super(props)
    this.hide = this.hide.bind(this)
    this.confirm = this.confirm.bind(this)
    this.cancel = this.cancel.bind(this)
  }
  hide () {
    this.props.hide(this.props.id)
  }
  confirm () {
    this.props.delete(this.props.id)
    this.hide()
  }
  cancel () {
    this.hide()
  }
  render () {
    return (
      <ConfirmDialog
        title="确认删除?"
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
  delete: id => {
    dispatch(photoDeleteSingle(id))
  },
  hide: id => {
    dispatch(photoDeleteDialogVisible(id, false))
  },
})

const _PhotoItemDeleteDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoItemDeleteDialog)
export default _PhotoItemDeleteDialog
