import React from 'react'
import { connect } from 'react-redux'

import PhotoItemList from './photo-item-list'
import PhotoGroupList from './photo-group-list'
import UploadImageDiv from './upload-image-div'

import {
  fetchPhotoGroups,
  fetchGroupPhotos
} from '$actions/article-edit'

class ChoosePhotoDialog extends React.Component {
  componentDidMount () {
    this.props.init()
  }
  render () {
    var styles = {}
    if (!this.props.visible) {
      styles.display = 'none'
    }
    return (
      <div id="choose-photo-div" style = {styles}>
        <div id="choose-photo-div-title">选择图片</div>
        <div id="choose-photo-div-main-div">
          <div id="choose-photo-div-groups">
            <PhotoGroupList />
          </div>
          <div id="choose-photo-div-right-div">
            <UploadImageDiv />
            <div id="choose-photo-div-photo-list-div">
              <PhotoItemList confirm = {this.props.confirm} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  visible: state.photoVisible
})

const mapDispatchToProps = (dispatch) => ({
  init: () => {
    dispatch(fetchPhotoGroups())
    dispatch(fetchGroupPhotos())
  }
})

const _ChoosePhotoDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChoosePhotoDialog)

export default _ChoosePhotoDialog
