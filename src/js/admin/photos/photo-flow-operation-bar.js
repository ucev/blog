const React = require('react')
const ReactDOM = require('react-dom')
import { connect } from 'react-redux'

const ConfirmDialog = require("../../components/dialogs/confirm_dialog.js")
const OptionDialog = require("../../components/dialogs/option_dialog.js")
import {
  pfobDeleteDialogVisible,
  pfobMoveDialogVisible,
  photoCheckStateChangeAll,
  photoDeleteByGroup,
  photoMoveByGroup,
  photoUpload
} from '../../redux/actions/photos'

class PhotoFlowOperationBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleUploadButtonClick = this.handleUploadButtonClick.bind(this);
    this.handleUploadInputChange = this.handleUploadInputChange.bind(this);

    // Dialog Visibility
    this.hideMoveDialog = this.hideMoveDialog.bind(this);
    this.showMoveDialog = this.showMoveDialog.bind(this);
    this.hideDelDialog = this.hideDelDialog.bind(this);
    this.showDelDialog = this.showDelDialog.bind(this);
    // MoveDialog
    this.handleMoveConfirm = this.handleMoveConfirm.bind(this);
    this.handleMoveCancel = this.handleMoveCancel.bind(this);
    // DeleteDialog
    this.handleDelConfirm = this.handleDelConfirm.bind(this);
    this.handleDelCancel = this.handleDelCancel.bind(this);
    // button action
    this.moveButtonClick = this.moveButtonClick.bind(this);
    this.delButtonClick = this.delButtonClick.bind(this);
    // all-check
    this.handleAllCheckChanged = this.handleAllCheckChanged.bind(this);
  }

  handleUploadButtonClick(e) {
    var input = this.uploadInput;
    input.click();
  }

  handleUploadInputChange(e) {
    var target = e.target;
    var file = target.files[0];
    this.props.photoUpload(file);
  }

  hideDelDialog() {
    this.props.pfobDeleteDialogVisible(false);
  }

  showDelDialog() {
    this.props.pfobDeleteDialogVisible(true);
  }

  hideMoveDialog() {
    this.props.pfobMoveDialogVisible(false);
  }

  showMoveDialog() {
    this.props.pfobMoveDialogVisible(true);
  }

  handleMoveConfirm(newgid) {
    this.props.photoMoveByGroup(newgid);
    this.hideMoveDialog();
  }

  handleMoveCancel() {
    this.hideMoveDialog();
  }

  handleDelConfirm() {
    this.props.photoDeleteByGroup();
    this.hideDelDialog();
  }

  handleDelCancel() {
    this.hideDelDialog();
  }

  moveButtonClick() {
    this.showMoveDialog();
  }

  delButtonClick() {
    this.showDelDialog();
  }

  handleAllCheckChanged(e) {
    var allChecked = e.target.checked;
    this.props.photoCheckStateChangeAll(allChecked);
  }
  render() {
    var uploadInputStyles = {
      display: 'none'
    };
    return (
      <div>
        <div className='photo-operation-bar' id='photo-operation-bar-first'>
          <button id='upload-image-button' className='operation-button' onClick={this.handleUploadButtonClick} >上传图片</button>
          <input ref={(input) => { this.uploadInput = input; }} id='upload-image-input' type='file' accept="image/*" style={uploadInputStyles} onChange={this.handleUploadInputChange} />
        </div>
        <div className='photo-operation-bar' id='photo-operation-bar-second'>
          <input type='checkbox' onChange={this.handleAllCheckChanged} /><label>全选</label>
          <div id='photo-flow-opebar-move-div'>
            <button id='photo-flow-opebar-move-button' className='operation-button operation-button-confirm' onClick={this.moveButtonClick}>移动分组</button>
            <OptionDialog title="移动分组" optionItems={this.props.groups} centerScreen={false} visible={this.props.moveVisible} confirm={this.handleMoveConfirm} cancel={this.handleMoveCancel} />
          </div>
          <div id='photo-flow-opebar-del-div'>
            <button id='photo-flow-opebar-del-button' className='operation-button operation-button-cancel' onClick={this.delButtonClick}>删除</button>
            <ConfirmDialog title='确认删除?' centerScreen={false} visible={this.props.delVisible} confirm={this.handleDelConfirm} cancel={this.handleDelCancel} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.groups,
  moveVisible: state.pfobMoveVisible,
  delVisible: state.pfobDelVisible
})

const mapDispatchToProps = (dispatch) => ({
  pfobDeleteDialogVisible: (visible) => {
    dispatch(pfobDeleteDialogVisible(visible))
  },
  pfobMoveDialogVisible: (visible) => {
    dispatch(pfobMoveDialogVisible(visible))
  },
  photoCheckStateChangeAll: (checked) => {
    dispatch(photoCheckStateChangeAll(checked))
  },
  photoDeleteByGroup: () => {
    dispatch(photoDeleteByGroup())
  },
  photoMoveByGroup: (gid) => {
    dispatch(photoMoveByGroup(gid))
  },
  photoUpload: (file) => {
    dispatch(photoUpload(file))
  }
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoFlowOperationBar)
