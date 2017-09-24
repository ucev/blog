import React from 'react'
import { connect } from 'react-redux'

import {
  photoCheckStateChangeAll
} from '$actions/photos'

class PhotoGroupCheckAllCheckbox extends React.Component {
  constructor (props) {
    super(props)
    this.change = this.change.bind(this)
  }
  change () {
    this.props.change(this.input.checked)
  }
  render () {
    return (
      <input
        type="checkbox"
        checked = {this.props.checked}
        onChange={this.change}
        ref = {(input) => {this.input = input}}/>
    )
  }
}

const mapStateToProps = (state) => ({
  checked: state.photos.length > 0 && state.photos.every(photo => photo.checked === true)
})

const mapDispatchToProps = (dispatch) => ({
  change: (checked) => {
    dispatch(photoCheckStateChangeAll(checked))
  },
})

const _PhotoGroupCheckAllCheckbox = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGroupCheckAllCheckbox)
export default _PhotoGroupCheckAllCheckbox
