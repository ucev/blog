import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import ConfirmDialog from "../../components/dialogs/confirm-dialog"
import InputDialog from "../../components/dialogs/input-dialog"
import {
  groupItemClick,
  groupItemDelete,
  groupItemDeleteState,
  groupItemInputState,
  groupItemRename,
} from '../../redux/actions/photos'

class PhotoGroupItem extends React.Component {
  constructor(props) {
    super(props);
    // Dialog Visibility
    this.showInputDialog = this.showInputDialog.bind(this);
    this.hideInputDialog = this.hideInputDialog.bind(this);
    this.showDelDialog = this.showDelDialog.bind(this);
    this.hideDelDialog = this.hideDelDialog.bind(this);
    // Dialog action
    this.handleInputConfirm = this.handleInputConfirm.bind(this);
    this.handleInputCancel = this.handleInputCancel.bind(this);
    this.handleDelConfirm = this.handleDelConfirm.bind(this);
    this.handleDelCancel = this.handleDelCancel.bind(this);
    this.handleGroupItemClick = this.handleGroupItemClick.bind(this);
    // Self-Owned action
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
    this.handleRenameGroup = this.handleRenameGroup.bind(this);
  }
  showInputDialog() {
    this.props.inputState(this.props.id, true)
  }
  hideInputDialog() {
    this.props.inputState(this.props.id, false)
  }
  showDelDialog() {
    this.props.deleteState(this.props.id, true)
  }
  hideDelDialog() {
    this.props.deleteState(this.props.id, false)
  }
  handleInputConfirm(name) {
    this.props.groupItemRename(this.props.id, name);
    this.hideInputDialog();
  }
  handleInputCancel() {
    this.hideInputDialog();
  }
  handleDelConfirm() {
    this.props.groupItemDelete(this.props.id);
    this.hideDelDialog();
  }
  handleDelCancel() {
    this.hideDelDialog();
  }
  handleGroupItemClick(e) {
    this.props.groupItemClick(this.props.id);
    e.stopPropagation();
  }
  handleDeleteGroup(e) {
    this.showDelDialog();
  }
  handleRenameGroup(e) {
    this.showInputDialog();
    e.stopPropagation();
  }
  render() {
    var opeImgStyles = {};
    if (!this.props.opeImgVisible) {
      opeImgStyles.display = 'none';
    }
    var gid = this.props.id;
    var classes = 'photo-group-item-li';
    if (gid == this.props.gid) classes += ' photo-group-item-li-current';
    var imgSrc = '/images/icons/ic_close_black_24dp_2x.png';
    if (gid < 1) {
      return (
        <li className={classes}>
          <span className='photo-group-item-li-title-span' data-gid={this.props.id} onClick={this.handleGroupItemClick}>{this.props.name}({this.props.count})</span>
        </li>
      );
    }
    return (
      <li className={classes}>
        <span className='photo-group-item-li-title-span' onClick={this.handleGroupItemClick}>{this.props.name}({this.props.count})</span>
        <img className='photo-group-item-li-ope-img' src='/images/icons/ic_mode_edit_black_24dp_2x.png' style={opeImgStyles} onClick={this.handleRenameGroup} />
        <img className='photo-group-item-li-ope-img' src='/images/icons/ic_close_black_24dp_2x.png' style={opeImgStyles} onClick={this.handleDeleteGroup} />
        <InputDialog title='编辑名称' centerScreen={false} confirm={this.handleInputConfirm} cancel={this.handleInputCancel} visible={this.props.inputVisible} />
        <ConfirmDialog title='确认删除?' centerScreen={false} confirm={this.handleDelConfirm} cancel={this.handleDelCancel} visible={this.props.delVisible} />
      </li>
    );
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  groupItemClick: (gid) => {
    dispatch(groupItemClick(gid))
  },
  groupItemDelete: (gid) => {
    dispatch(groupItemDelete(gid))
  },
  groupItemRename: (gid, name) => {
    dispatch(groupItemRename(gid, name))
  },
  inputState: (gid, visible) => {
    dispatch(groupItemInputState(gid, visible))
  },
  deleteState: (gid, visible) => {
    dispatch(groupItemDeleteState(gid, visible))
  }
})

const _PhotoGroupItem = connect(
                          mapStateToProps,
                          mapDispatchToProps
                        )(PhotoGroupItem)
export default _PhotoGroupItem
