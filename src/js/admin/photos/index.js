import React from 'react'
import { connect } from 'react-redux'

import PhotoFlow from './photo-flow'
import PhotoGroupBar from './photo-group-bar'
import {
  fetchGroupPhotos,
  fetchPhotoGroups
} from '$actions/photos'

class PhotoArea extends React.Component {
  componentDidMount () {
    this.props.fetchPhotoGroups()
    this.props.fetchGroupPhotos()
  }
  render () {
    return (
      <div id="photo-div">
        <PhotoFlow />
        <PhotoGroupBar />
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  fetchGroupPhotos: () => {
    dispatch(fetchGroupPhotos())
  },
  fetchPhotoGroups: () => {
    dispatch(fetchPhotoGroups())
  }
})

const _PhotoArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoArea)
export default _PhotoArea
