import React from 'react'
import { connect } from 'react-redux'

import { photoUpload } from '$actions/article-edit'

class UploadImageDiv extends React.Component {
  constructor(props) {
    super(props)
    this.chooseImage = this.chooseImage.bind(this)
    this.upload = this.upload.bind(this)
  }
  chooseImage() {
    this.uploader.click()
  }
  upload() {
    var file = this.uploader.files[0]
    this.props.upload(file)
  }
  render() {
    var style = { display: 'none' }
    return (
      <div id="choose-photo-div-upload-div">
        <button
          className="operation-button"
          id="choose-photo-div-upload-button"
          onClick={this.chooseImage}>
          上传图片
        </button>
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
