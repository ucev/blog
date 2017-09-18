import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import PhotoFlowOperationBar from './photo-flow-operation-bar'
import PhotoItem from './photo-item'

const PhotoFlow = ({ photos, groups }) => {
  const items = photos.map(photo =>
    <PhotoItem
      key={photo.id}
      photo={photo}
      id={photo.id}
      name={photo.name}
      checked={photo.checked}
      title={photo.title}
      inputVisible={photo.inputVisible}
      moveVisible={photo.moveVisible}
      delVisible={photo.delVisible}
    />
  )
  return (
    <div id='photo-flow-div'>
      <PhotoFlowOperationBar />
      <ul id='photo-flow-items-ul'>
        {items}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  photos: state.photos,
  groups: state.groups
})

const mapDispatchToProps = (dispatch) => ({})

const _PhotoFlow = connect(
                     mapStateToProps,
                     mapDispatchToProps
                    )(PhotoFlow)
export default _PhotoFlow
