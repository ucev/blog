import React from 'react'
import { connect } from 'react-redux'

import OperationButton from '$components/buttons/operation-button'

import { photoUpload } from '$actions/article-edit'

import './upload-image-div.style.scss'

class UploadImageDiv extends React.Component {
  constructor (props) {
    super(props)
    this.chooseImage = this.chooseImage.bind(this)
    this.upload = this.upload.bind(this)
  }
  chooseImage () {
    this.uploader.click()
  }
  upload () {
    var file = this.uploader.files[0]
    this.props.upload(file)
  }
  render () {
    const style = { display: 'none' }
    return (
      <div id="choose-photo-div-upload-div">
        <OperationButton
          id="choose-photo-div-upload-button"
          title="上传图片"
          onClick={this.chooseImage}
        />
        <input
          id="upload-img-input"
          ref={input => {
            this.uploader = input
          }}
          type="file"
          accept="image/*"
          style={style}
          onChange={this.upload}
        />
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  upload: file => {
    dispatch(photoUpload(file))
  },
})

const _UploadImageDiv = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadImageDiv)

export default _UploadImageDiv
