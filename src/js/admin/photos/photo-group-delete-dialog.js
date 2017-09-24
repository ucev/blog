import React from 'react'
import { connect } from 'react-redux'

import ConfirmDialog from '$components/dialogs/confirm-dialog'
import {
  pfobDeleteDialogVisible,
  photoDeleteByGroup
} from '$actions/photos'

const PhotoGroupDeleteDialog = ({ visible, confirm, cancel }) => (
  <ConfirmDialog
    title="确认删除?"
    centerScreen={false}
    visible={visible}
    confirm={confirm}
    cancel={cancel} />
)

const mapStateToProps = (state) => ({
  visible: state.pfobDelVisible
})

const mapDispatchToProps = (dispatch) => ({
  confirm: () => {
    dispatch(photoDeleteByGroup())
    dispatch(pfobDeleteDialogVisible(false))
  },
  cancel: () => {
    dispatch(pfobDeleteDialogVisible(false))
  }
})

const _PhotoGroupDeleteDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGroupDeleteDialog)
export default _PhotoGroupDeleteDialog
