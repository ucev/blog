import React from 'react'
import { connect } from 'react-redux'

import Dialog from '$components/dialogs/confirm-dialog'
import {
  deleteCategoryConfirm,
  deleteCategoryCancel,
} from '$actions/categories'

const ConfirmDialog = ({ visible, confirm, cancel }) => {
  return (
    <Dialog
      title="确认删除此类别?"
      visible={visible}
      confirm={confirm}
      cancel={cancel}
    />
  )
}

const mapStateToProps = state => ({
  visible: state.delVisible,
})

const mapDispatchToProps = dispatch => ({
  confirm: () => {
    dispatch(deleteCategoryConfirm())
  },
  cancel: () => {
    dispatch(deleteCategoryCancel())
  },
})

const _ConfirmDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmDialog)
export default _ConfirmDialog
