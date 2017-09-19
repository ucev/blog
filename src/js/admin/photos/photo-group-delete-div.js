import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import PhotoGroupDeleteDialog from './photo-group-delete-dialog'
import {
  pfobDeleteDialogVisible
} from '../../redux/actions/photos'

const PhotoGroupDeleteDiv = ({ show }) => (
  <div id='photo-flow-opebar-del-div'>
    <button className='operation-button operation-button-cancel'
      id='photo-flow-opebar-del-button'
      onClick={show}>删除</button>
    <PhotoGroupDeleteDialog />
  </div>
)

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  show: () => {
    dispatch(pfobDeleteDialogVisible(true))
  }
})

const _PhotoGroupDeleteDiv = connect(
                               mapStateToProps,
                               mapDispatchToProps
                              )(PhotoGroupDeleteDiv)
export default _PhotoGroupDeleteDiv
