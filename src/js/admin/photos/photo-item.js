import React from 'react'
import { connect } from 'react-redux'

import LazyLoader from 'react-lazyload'

import DeleteDialog from './photo-item-delete-dialog'
import MoveGroupDialog from './photo-item-move-group-dialog'
import RenameDialog from './photo-item-rename-dialog'
import {
  photoCheckStateChange,
  photoDeleteDialogVisible,
  photoInputDialogVisible,
  photoMoveDialogVisible,
} from '$actions/photos'

class PhotoItem extends React.Component {
  constructor (props) {
    super(props)
    // Dialog Visibility
    this.showRenameDialog = this.showRenameDialog.bind(this)
    this.showMoveDialog = this.showMoveDialog.bind(this)
    this.showDeleteDialog = this.showDeleteDialog.bind(this)
    // CheckBox
    this.handlePhotoCheck = this.handlePhotoCheck.bind(this)
    // DeleteDialog
    this.photoOnLoad = this.photoOnLoad.bind(this)
  }
  showRenameDialog () {
    this.props.showRenameDialog(this.props.id)
  }
  showMoveDialog () {
    this.props.showMoveDialog(this.props.id)
  }
  showDeleteDialog () {
    this.props.showDeleteDialog(this.props.id)
  }
  handlePhotoCheck (e) {
    this.props.photoCheckStateChange(e.target.value, e.target.checked)
  }
  photoOnLoad (e) {
    var img = e.target
    var a = new Image()
    a.onload = function () {
      var sw = a.width
      var sh = a.height
      var min = sw < sh ? sw : sh
      var scale = min / 200
      var nw = sw / scale
      var nh = sh / scale
      img.style.width = nw + 'px'
      img.style.height = nh + 'px'
    }
    a.src = img.src
  }
  render () {
    var photoSrc = '/images/blog/' + this.props.name
    var checked = this.props.checked ? 'checked' : ''
    return (
      <li className="photo-flow-item-li">
        <div className="photo-flow-item-li-img-div">
          <LazyLoader>
            <img
              className="photo-flow-item-li-img"
              width={100}
              height={100}
              src={photoSrc}
              onLoad={this.photoOnLoad}
            />
          </LazyLoader>
        </div>
        <div className="photo-flow-item-name-div">
          <input
            className="photo-flow-item-name-checkbox"
            type="checkbox"
            value={this.props.id}
            checked={checked}
            onChange={this.handlePhotoCheck}
          />
          <span className="photo-flow-item-name-span">{this.props.title}</span>
        </div>
        <ul className="photo-flow-item-li-ope-bar">
          <li
            className="photo-flow-item-ope-img photo-flow-item-mode-edit"
            onClick={this.showRenameDialog}
          />
          <li
            className="photo-flow-item-ope-img photo-flow-item-mode-swap"
            onClick={this.showMoveDialog}
          />
          <li
            className="photo-flow-item-ope-img photo-flow-item-mode-del"
            onClick={this.showDeleteDialog}
          />
        </ul>
        <DeleteDialog id={this.props.id} visible={this.props.delVisible} />
        <RenameDialog id={this.props.id} visible={this.props.inputVisible} />
        <MoveGroupDialog id={this.props.id} visible={this.props.moveVisible} />
      </li>
    )
  }
}

const mapStateToProps = state => ({
  groups: state.groups,
})

const mapDispatchToProps = dispatch => ({
  photoCheckStateChange: (id, checked) => {
    dispatch(photoCheckStateChange(id, checked))
  },
  showDeleteDialog: id => {
    dispatch(photoDeleteDialogVisible(id, true))
  },
  showRenameDialog: id => {
    dispatch(photoInputDialogVisible(id, true))
  },
  showMoveDialog: id => {
    dispatch(photoMoveDialogVisible(id, true))
  },
})

const _PhotoItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoItem)
export default _PhotoItem
