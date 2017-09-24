import React from 'react'

import PhotoGroupMoveDiv from './photo-group-move-div'
import PhotoGroupDeleteDiv from './photo-group-delete-div'
import PhotoUploadDiv from './photo-upload-div'
import PhotoGroupCheckallCheckbox from './photo-group-checkall-checkbox'

const PhotoFlowOperationBar = () => (
  <div>
    <PhotoUploadDiv />
    <div className="photo-operation-bar" id="photo-operation-bar-second">
      <PhotoGroupCheckallCheckbox /><label>全选</label>
      <PhotoGroupMoveDiv />
      <PhotoGroupDeleteDiv />
    </div>
  </div>
)

export default PhotoFlowOperationBar
