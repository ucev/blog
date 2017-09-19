import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import PhotoGroupMoveDialog from './photo-group-move-dialog'
import {
  pfobMoveDialogVisible
} from '../../redux/actions/photos'

const PhotoGroupMoveDiv = ({ show }) => (
  <div id='photo-flow-opebar-move-div'>
    <button className='operation-button operation-button-confirm'
      id='photo-flow-opebar-move-button'
      onClick={show}>移动分组</button>
    <PhotoGroupMoveDialog />
  </div>
)

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  show: () => {
    dispatch(pfobMoveDialogVisible(true))
  }
})

const _PhotoGroupMoveDiv = connect(
                             mapStateToProps,
                             mapDispatchToProps
                            )(PhotoGroupMoveDiv)
export default _PhotoGroupMoveDiv
