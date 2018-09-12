import React from 'react'

import {
  PhotoGroupCheckallCheckbox,
  PhotoGroupDeleteDiv,
  PhotoGroupMoveDiv,
} from '../../photo-group'
import PhotoOperationBar from '../../photo-operation-bar'
import PhotoUploadDiv from '../../photo-upload-div'

import './photo-flow-operation-bar.style.scss'

export default () => (
  <div>
    <PhotoUploadDiv />
    <PhotoOperationBar id="photo-operation-bar-second">
      <PhotoGroupCheckallCheckbox />
      <label>全选</label>
      <PhotoGroupMoveDiv />
      <PhotoGroupDeleteDiv />
    </PhotoOperationBar>
  </div>
)
