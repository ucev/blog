const React = require('react');
const ReactDOM = require('react-dom');
import { connect } from 'react-redux'

import LazyLoader from 'react-lazyload';

const ConfirmDialog = require("../../components/dialogs/confirm_dialog.js");
const InputDialog = require("../../components/dialogs/input_dialog.js");
const OptionDialog = require("../../components/dialogs/option_dialog.js");
import {
  photoCheckStateChange,
  photoDeleteDialogVisible,
  photoDeleteSingle,
  photoInputDialogVisible,
  photoMoveDialogVisible,
  photoMoveSingle,
  photoRename
} from '../../redux/actions/photos'

class PhotoItem extends React.Component {
  constructor(props) {
    super(props);
    //Dialog Visibility
    this.showInputDialog = this.showInputDialog.bind(this);
    this.hideInputDialog = this.hideInputDialog.bind(this);
    this.showMoveDialog = this.showMoveDialog.bind(this);
    this.hideMoveDialog = this.hideMoveDialog.bind(this);
    this.showDelDialog = this.showDelDialog.bind(this);
    this.hideDelDialog = this.hideDelDialog.bind(this);
    // CheckBox
    this.handlePhotoCheck = this.handlePhotoCheck.bind(this);
    // InputDialog
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
    this.handleInputCancel = this.handleInputCancel.bind(this);
    // MoveDialog
    this.handleMoveConfirm = this.handleMoveConfirm.bind(this);
    this.handleMoveCancel = this.handleMoveCancel.bind(this);
    // DeleteDialog
    this.handleDelConfirm = this.handleDelConfirm.bind(this);
    this.handleDelCancel = this.handleDelCancel.bind(this);
    this.photoOnLoad = this.photoOnLoad.bind(this);
  }
  showInputDialog(e) {
    var photo = this.props.photo;
    this.props.photoInputDialogVisible(photo.id, true);
  }
  hideInputDialog(e) {
    var photo = this.props.photo;
    this.props.photoInputDialogVisible(photo.id, false);
  }
  showMoveDialog(e) {
    var photo = this.props.photo;
    this.props.photoMoveDialogVisible(photo.id, true);
  }
  hideMoveDialog(e) {
    var photo = this.props.photo;
    this.props.photoMoveDialogVisible(photo.id, false);
  }
  showDelDialog(e) {
    var photo = this.props.photo;
    this.props.photoDeleteDialogVisible(photo.id, true);
  }
  hideDelDialog(e) {
    var photo = this.props.photo;
    this.props.photoDeleteDialogVisible(photo.id, false);
  }
  handlePhotoCheck(e) {
    this.props.photoCheckStateChange(e.target.value, e.target.checked);
  }
  handleInputConfirm(name) {
    var photo = this.props.photo;
    this.props.photoRename(photo.id, name);
    this.hideInputDialog();
  }
  handleInputCancel() {
    this.hideInputDialog();
  }
  handleMoveConfirm(newgid) {
    var photo = this.props.photo;
    this.props.photoMoveSingle(photo.id, newgid);
    this.hideMoveDialog();
  }
  handleMoveCancel() {
    this.hideMoveDialog();
  }
  handleDelConfirm() {
    var photo = this.props.photo;
    this.props.photoDeleteSingle(photo.id);
    this.hideDelDialog();
  }
  handleDelCancel() {
    this.hideDelDialog();
  }
  photoOnLoad(e) {
    var img = e.target;
    var a = new Image();
    a.onload = function () {
      var sw = a.width;
      var sh = a.height;
      var min = sw < sh ? sw : sh;
      var scale = min / 200;
      var nw = sw / scale;
      var nh = sh / scale;
      img.style.width = nw + 'px';
      img.style.height = nh + 'px';
    };
    a.src = img.src;
  }
  render() {
    var photo = this.props.photo;
    var photoSrc = '/images/blog/' + photo.name;
    var checked = photo.checked ? "checked" : "";
    return (
      <li className='photo-flow-item-li'>
        <div className='photo-flow-item-li-img-div'>
          <LazyLoader>
            <img className='photo-flow-item-li-img' width = {100} height = {100} src={photoSrc} onLoad={this.photoOnLoad} />
          </LazyLoader>
        </div>
        <div className='photo-flow-item-name-div'>
          <input className='photo-flow-item-name-checkbox' type='checkbox' value={photo.id} checked={checked} onChange={this.handlePhotoCheck} />
          <span className='photo-flow-item-name-span'>{photo.title}</span>
        </div>
        <ul className='photo-flow-item-li-ope-bar'>
          <li className='photo-flow-item-ope-img photo-flow-item-mode-edit' onClick={this.showInputDialog}></li>
          <li className='photo-flow-item-ope-img photo-flow-item-mode-swap' onClick={this.showMoveDialog}></li>
          <li className='photo-flow-item-ope-img photo-flow-item-mode-del' onClick={this.showDelDialog}></li>
        </ul>
        <InputDialog title='编辑名称' centerScreen={false} confirm={this.handleInputConfirm} cancel={this.handleInputCancel} visible={photo.inputVisible} />
        <OptionDialog title='移动分组' optionItems={this.props.groups} confirm={this.handleMoveConfirm} cancel={this.handleMoveCancel} visible={photo.moveVisible} centerScreen={false} />
        <ConfirmDialog title='确认删除?' centerScreen={false} confirm={this.handleDelConfirm} cancel={this.handleDelCancel} visible={photo.delVisible} />
      </li>
    );
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  photoCheckStateChange: (id, checked) => {
    dispatch(photoCheckStateChange(id, checked))
  },
  photoDeleteDialogVisible: (id, visible) => {
    dispatch(photoDeleteDialogVisible(id, visible))
  },
  photoDeleteSingle: (id) => {
    dispatch(photoDeleteSingle(id))
  },
  photoInputDialogVisible: (id, visible) => {
    dispatch(photoInputDialogVisible(id, visible))
  },
  photoMoveDialogVisible: (id, visible) => {
    dispatch(photoMoveDialogVisible(id, visible))
  },
  photoMoveSingle: (id, gid) => {
    dispatch(photoMoveSingle(id, gid))
  },
  photoRename: (id, name) => {
    dispatch(photoRename(id, name))
  }
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoItem)
