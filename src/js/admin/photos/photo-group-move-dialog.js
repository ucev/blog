import React from 'react'
import { connect } from 'react-redux'

import OptionDialog from '../../components/dialogs/option-dialog'
import {
  pfobMoveDialogVisible,
  photoMoveByGroup,
} from '../../redux/actions/photos'

const PhotoGroupMoveDialog = ({ groups, visible, confirm, cancel}) => (
  <OptionDialog
    title="移动分组"
    optionItems={groups}
    centerScreen={false}
    visible={visible}
    confirm={confirm}
    cancel={cancel} />
)

const mapStateToProps = (state) => ({
  groups: state.groups,
  visible: state.pfobMoveVisible
})

const mapDispatchToProps = (dispatch) => ({
  cancel: () => {
    dispatch(pfobMoveDialogVisible(false))
  },
  confirm: (newgid) => {
    dispatch(photoMoveByGroup(newgid))
    dispatch(pfobMoveDialogVisible(false))
  }
})

const _PhotoGroupMoveDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGroupMoveDialog)
export default _PhotoGroupMoveDialog
