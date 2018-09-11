import React from 'react'
import { connect } from 'react-redux'

import PhotoGroupMoveDialog from './photo-group-move-dialog'
import OperationConfirmButton from '$components/buttons/operation-confirm-button'

import { pfobMoveDialogVisible } from '$actions/photos'

const PhotoGroupMoveDiv = ({ show }) => (
  <div id="photo-flow-opebar-move-div">
    <OperationConfirmButton
      id="photo-flow-opebar-move-button"
      title="移动分组"
      onClick={show}
    />
    <PhotoGroupMoveDialog />
  </div>
)

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  show: () => {
    dispatch(pfobMoveDialogVisible(true))
  },
})

const _PhotoGroupMoveDiv = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGroupMoveDiv)
export default _PhotoGroupMoveDiv
