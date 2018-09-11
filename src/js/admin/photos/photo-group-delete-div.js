import React from 'react'
import { connect } from 'react-redux'

import PhotoGroupDeleteDialog from './photo-group-delete-dialog'
import OperationCancelButton from '$components/buttons/operation-cancel-button'

import { pfobDeleteDialogVisible } from '$actions/photos'

const PhotoGroupDeleteDiv = ({ show }) => (
  <div id="photo-flow-opebar-del-div">
    <OperationCancelButton
      id="photo-flow-opebar-del-button"
      title="删除"
      onClick={show}
    />
    <PhotoGroupDeleteDialog />
  </div>
)

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  show: () => {
    dispatch(pfobDeleteDialogVisible(true))
  },
})

const _PhotoGroupDeleteDiv = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGroupDeleteDiv)
export default _PhotoGroupDeleteDiv
