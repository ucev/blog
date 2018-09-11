import React from 'react'
import { connect } from 'react-redux'

import OperationButton from '$components/buttons/operation-button'

import { photoUpload } from '$actions/photos'

class PhotoUploadDiv extends React.Component {
  constructor (props) {
    super(props)
    this.click = this.click.bind(this)
    this.change = this.change.bind(this)
  }
  click () {
    this.uploadInput.click()
  }
  change () {
    var file = this.uploadInput.files[0]
    this.props.photoUpload(file)
  }
  render () {
    var uploadInputStyles = {
      display: 'none',
    }
    return (
      <div className="photo-operation-bar" id="photo-operation-bar-first">
        <OperationButton
          id="upload-image-button"
          title="上传图片"
          onClick={this.click}
        />
        <input
          id="upload-image-input"
          type="file"
          accept="image/*"
          style={uploadInputStyles}
          onChange={this.change}
          ref={input => {
            this.uploadInput = input
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  photoUpload: file => {
    dispatch(photoUpload(file))
  },
})

const _PhotoUploadDiv = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoUploadDiv)
export default _PhotoUploadDiv
