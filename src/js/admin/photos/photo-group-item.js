const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

const ConfirmDialog = require("../../components/dialogs/confirm_dialog.js")
const InputDialog = require("../../components/dialogs/input_dialog.js")
import {
  groupItemClick,
  groupItemDelete,
  groupItemHideDeleteDialog,
  groupItemHideInputDialog,
  groupItemRename,
  groupItemShowDeleteDialog,
  groupItemShowInputDialog,
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
    var group = this.props.group;
    this.props.groupItemShowInputDialog(group.id);
  }
  hideInputDialog() {
    var group = this.props.group;
    this.props.groupItemHideInputDialog(group.id);
  }
  showDelDialog() {
    var group = this.props.group;
    this.props.groupItemShowDeleteDialog(group.id);
  }
  hideDelDialog() {
    var group = this.props.group;
    this.props.groupItemHideDeleteDialog(group.id);
  }
  handleInputConfirm(name) {
    var group = this.props.group;
    this.props.groupItemRename(group.id, name);
    this.hideInputDialog();
  }
  handleInputCancel() {
    this.hideInputDialog();
  }
  handleDelConfirm() {
    var group = this.props.group;
    this.props.groupItemDelete(group.id);
    this.hideDelDialog();
  }
  handleDelCancel() {
    this.hideDelDialog();
  }
  handleGroupItemClick(e) {
    var group = this.props.group;
    this.props.groupItemClick(group.id);
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
    var group = this.props.group;
    var gid = group.id;
    var classes = 'photo-group-item-li';
    if (gid == this.props.gid) classes += ' photo-group-item-li-current';
    var imgSrc = '/images/icons/ic_close_black_24dp_2x.png';
    if (gid < 2) {
      return (
        <li className={classes}>
          <span className='photo-group-item-li-title-span' data-gid={group.id} onClick={this.handleGroupItemClick}>{group.name}({group.count})</span>
        </li>
      );
    }
    return (
      <li className={classes}>
        <span className='photo-group-item-li-title-span' onClick={this.handleGroupItemClick}>{group.name}({group.count})</span>
        <img className='photo-group-item-li-ope-img' src='/images/icons/ic_mode_edit_black_24dp_2x.png' style={opeImgStyles} onClick={this.handleRenameGroup} />
        <img className='photo-group-item-li-ope-img' src='/images/icons/ic_close_black_24dp_2x.png' style={opeImgStyles} onClick={this.handleDeleteGroup} />
        <InputDialog title='编辑名称' centerScreen={false} confirm={this.handleInputConfirm} cancel={this.handleInputCancel} visible={group.inputVisible} />
        <ConfirmDialog title='确认删除?' centerScreen={false} confirm={this.handleDelConfirm} cancel={this.handleDelCancel} visible={group.delVisible} />
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
  groupItemHideDeleteDialog: (gid) => {
    dispatch(groupItemHideDeleteDialog(gid))
  },
  groupItemHideInputDialog: (gid) => {
    dispatch(groupItemHideInputDialog(gid))
  },
  groupItemRename: (gid, name) => {
    dispatch(groupItemRename(gid, name))
  },
  groupItemShowDeleteDialog: (gid) => {
    dispatch(groupItemShowDeleteDialog(gid))
  },
  groupItemShowInputDialog: (gid) => {
    dispatch(groupItemShowInputDialog(gid))
  }
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGroupItem)
