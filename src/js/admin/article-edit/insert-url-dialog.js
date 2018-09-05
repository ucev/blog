import React from 'react'
import { connect } from 'react-redux'

import InputDialog from '$components/dialogs/input-dialog'

import { insertUrlVisibleStateChange } from '$actions/article-edit'

const InsertUrlDialog = ({ confirm, cancel, visible }) => (
  <InputDialog
    title="输入URL："
    confirm={confirm}
    cancel={cancel}
    visible={visible}
  />
)

const mapStateToProps = state => ({
  visible: state.urlVisible,
})

const mapDispatchToProps = dispatch => ({
  cancel: () => {
    dispatch(insertUrlVisibleStateChange(false))
  },
})

const _InsertUrlDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(InsertUrlDialog)

export default _InsertUrlDialog
