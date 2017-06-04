const React = require('react');
const ReactDOM = require('react-dom');

const ConfirmDialog = require("../components/dialogs/confirm_dialog.js");
const InputDialog = require("../components/dialogs/input_dialog.js");
const OptionDialog = require("../components/dialogs/option_dialog.js");
const TableNavLink = require("../components/table_foot_nav.js");

var PhotoActions = null;
var PhotoStores = null;

const PhotoListener = require('../flux/photo_listener');

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
    PhotoActions.photoUpload(file);
  }

  hideDelDialog() {
    PhotoActions.pfobDeleteDialogVisible(false);
  }

  showDelDialog() {
    PhotoActions.pfobDeleteDialogVisible(true);
  }

  hideMoveDialog() {
    PhotoActions.pfobMoveDialogVisible(false);
  }

  showMoveDialog() {
    PhotoActions.pfobMoveDialogVisible(true);
  }

  handleMoveConfirm(newgid) {
    PhotoActions.photoMoveByGroup(newgid);
    this.hideMoveDialog();
  }

  handleMoveCancel() {
    this.hideMoveDialog();
  }

  handleDelConfirm() {
    PhotoActions.photoDeleteByGroup();
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
    PhotoActions.photoCheckStateChangeAll(allChecked);
  }
  render() {
    var uploadInputStyles = {
      display: 'none'
    };
    return (
      <div>
        <div className = 'photo-operation-bar' id = 'photo-operation-bar-first'>
          <button id = 'upload-image-button' className='operation-button' onClick = {this.handleUploadButtonClick} >上传图片</button>
          <input ref = {(input) => {this.uploadInput = input;}} id = 'upload-image-input' type = 'file' accept="image/*" style = {uploadInputStyles} onChange = {this.handleUploadInputChange} />
        </div>
        <div className = 'photo-operation-bar' id = 'photo-operation-bar-second'>
          <input type='checkbox' onChange = {this.handleAllCheckChanged}/><label>全选</label>
          <div id = 'photo-flow-opebar-move-div'>
            <button id = 'photo-flow-opebar-move-button' className = 'operation-button operation-button-confirm' onClick = {this.moveButtonClick}>移动分组</button>
            <OptionDialog title = "移动分组" optionItems = {this.props.groups} centerScreen = {false} visible = {this.props.moveVisible} confirm = {this.handleMoveConfirm} cancel = {this.handleMoveCancel}/>
          </div>
          <div id = 'photo-flow-opebar-del-div'>
            <button id = 'photo-flow-opebar-del-button' className = 'operation-button operation-button-cancel' onClick = {this.delButtonClick}>删除</button>
            <ConfirmDialog title = '确认删除?' centerScreen = {false} visible = {this.props.delVisible} confirm = {this.handleDelConfirm} cancel = {this.handleDelCancel}/>
          </div>
        </div>
      </div>
    );
  }
}

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
    PhotoActions.photoInputDialogVisible(photo.id, true);
  }
  hideInputDialog(e) {
    var photo = this.props.photo;
    PhotoActions.photoInputDialogVisible(photo.id, false);
  }
  showMoveDialog(e) {
    var photo = this.props.photo;
    PhotoActions.photoMoveDialogVisible(photo.id, true);
  }
  hideMoveDialog(e) {
    var photo = this.props.photo;
    PhotoActions.photoMoveDialogVisible(photo.id, false);
  }
  showDelDialog(e) {
    var photo = this.props.photo;
    PhotoActions.photoDeleteDialogVisible(photo.id, true);
  }
  hideDelDialog(e) {
    var photo = this.props.photo;
    PhotoActions.photoDeleteDialogVisible(photo.id, false);
  }
  handlePhotoCheck(e) {
    PhotoActions.photoCheckStateChange(e.target.value, e.target.checked);
  }
  handleInputConfirm(name) {
    var photo = this.props.photo;
    PhotoActions.photoRename(photo.id, name);
    this.hideInputDialog();
  }
  handleInputCancel() {
    this.hideInputDialog();
  }
  handleMoveConfirm(newgid) {
    var photo = this.props.photo;
    PhotoActions.photoMoveSingle(photo.id, newgid);
    this.hideMoveDialog();
  }
  handleMoveCancel() {
    this.hideMoveDialog();
  }
  handleDelConfirm() {
    var photo = this.props.photo;
    PhotoActions.photoDeleteSingle(photo.id);
    this.hideDelDialog();
  }
  handleDelCancel() {
    this.hideDelDialog();
  }
  photoOnLoad(e) {
    var img = e.target;
    var a = new Image();
    a.src = img.src;
    var sw = a.width;
    var sh = a.height;
    var min = sw < sh ? sw : sh;
    var scale = min / 200;
    var nw = sw / scale;
    var nh = sh / scale;
    img.style.width = nw + 'px';
    img.style.height = nh + 'px';
  }
  render() {
    var photo = this.props.photo;
    var photoSrc = '/images/blog/' + photo.name;
    var checked = photo.checked ? "checked" : "";
    return (
      <li className = 'photo-flow-item-li'>
        <div className = 'photo-flow-item-li-img-div'>
          <img className = 'photo-flow-item-li-img' src= {photoSrc} onLoad = {this.photoOnLoad}></img>
        </div>
        <div className = 'photo-flow-item-name-div'>
          <input className = 'photo-flow-item-name-checkbox' type='checkbox' value = {photo.id} checked = {checked} onChange = {this.handlePhotoCheck}/>
          <span className = 'photo-flow-item-name-span'>{photo.title}</span>
        </div>
        <div className = 'photo-flow-item-li-ope-bar'>
          <li className = 'photo-flow-item-ope-img photo-flow-item-mode-edit' onClick = {this.showInputDialog}></li>
          <li className = 'photo-flow-item-ope-img photo-flow-item-mode-swap' onClick = {this.showMoveDialog}></li>
          <li className = 'photo-flow-item-ope-img photo-flow-item-mode-del' onClick = {this.showDelDialog}></li>
        </div>
        <InputDialog title = '编辑名称' centerScreen = {false} confirm = {this.handleInputConfirm} cancel = {this.handleInputCancel} visible = {photo.inputVisible}/>
        <OptionDialog title = '移动分组' optionItems = {this.props.groups} confirm = {this.handleMoveConfirm} cancel = {this.handleMoveCancel} visible = {photo.moveVisible} centerScreen = {false} />
        <ConfirmDialog title = '确认删除?' centerScreen = {false} confirm = {this.handleDelConfirm} cancel = {this.handleDelCancel} visible = {photo.delVisible} />
      </li>
    );
  }
}

class PhotoFlow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = this.props.photos.map((photo) => {
      return <PhotoItem photo = {photo} groups = {this.props.groups} />
    });
    return (
      <div id = 'photo-flow-div'>
        <PhotoFlowOperationBar groups = {this.props.groups} moveVisible = {this.props.pfobMoveVisible} delVisible = {this.props.pfobDelVisible}/>
        <ul id = 'photo-flow-items-ul'>
          {items}
        </ul>
      </div>
    );
  }
}

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
  showInputDialog(){
    var group = this.props.group;
    PhotoActions.groupItemShowInputDialog(group.id);
  }
  hideInputDialog() {
    var group = this.props.group;
    PhotoActions.groupItemHideInputDialog(group.id);
  }
  showDelDialog(){
    var group = this.props.group;
    PhotoActions.groupItemShowDeleteDialog(group.id);
  }
  hideDelDialog() {
    var group = this.props.group;
    PhotoActions.groupItemHideDeleteDialog(group.id);
  }
  handleInputConfirm(name) {
    var group = this.props.group;
    PhotoActions.groupItemRename(group.id, name);
    this.hideInputDialog();
  }
  handleInputCancel() {
    this.hideInputDialog();
  }
  handleDelConfirm() {
    var group = this.props.group;
    PhotoActions.groupItemDelete(group.id);
    this.hideDelDialog();
  }
  handleDelCancel() {
    this.hideDelDialog();
  }
  handleGroupItemClick(e) {
    var group = this.props.group;
    PhotoActions.groupItemClick(group.id);
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
        <li className = {classes}>
          <span className = 'photo-group-item-li-title-span' data-gid = {group.id} onClick = {this.handleGroupItemClick}>{group.name}({group.count})</span>
        </li>
      );
    }
    return (
      <li className = {classes}>
        <span className = 'photo-group-item-li-title-span' onClick = {this.handleGroupItemClick}>{group.name}({group.count})</span>
        <img className = 'photo-group-item-li-ope-img' src = '/images/icons/ic_mode_edit_black_24dp_2x.png' style = {opeImgStyles} onClick = {this.handleRenameGroup}/>
        <img className = 'photo-group-item-li-ope-img' src = '/images/icons/ic_close_black_24dp_2x.png' style = {opeImgStyles} onClick = {this.handleDeleteGroup}/>
        <InputDialog title = '编辑名称' centerScreen = {false} confirm = {this.handleInputConfirm} cancel = {this.handleInputCancel} visible = {group.inputVisible}/>
        <ConfirmDialog title = '确认删除?' centerScreen = {false} confirm = {this.handleDelConfirm} cancel = {this.handleDelCancel} visible = {group.delVisible} />
      </li>
    );
  }
}

class PhotoGroupBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() { 
    var opebarImg = this.props.opeImgVisible ? '/images/icons/ic_cancel_black_24dp_2x.png' :'/images/icons/ic_arrow_drop_down_circle_black_24dp_2x.png';
    var groupItems = this.props.groups.map((group) => (
      <PhotoGroupItem group = {group} gid = {this.props.gid} opeImgVisible = {this.props.opeImgVisible}/>
    ));
    var key = new Date().getTime();
    return (
      <div id = 'photo-group-div'>
        <div className = 'photo-group-operation-bar'>
          <div id = 'add-new-photo-group-div' onClick = {PhotoActions.groupShowAddDialog.bind(PhotoActions)}>新建分组</div>
          <InputDialog title = '新建分组' centerScreen = {false} visible = {this.props.addVisible} confirm = {PhotoActions.groupAddConfirm.bind(PhotoActions)} cancel = {PhotoActions.groupAddCancel.bind(PhotoActions)}/>
        </div>
        <div className = 'photo-group-operation-bar'>
          <div id = 'photo-group-opebar-title-div' >图片组</div>
          <img id = 'photo-group-opebar-img' src = {opebarImg} onClick = {PhotoActions.groupOpeImgStateToggle.bind(PhotoActions)}/>
        </div>
        <ul id = 'photo-group-items-ul'>
          {groupItems}
        </ul>
      </div>
    );
  }
}

class PhotoArea extends React.Component {
  constructor(props) {
    super(props);

    var listener = new PhotoListener();
    PhotoActions = listener.getAction();
    PhotoStores = listener.getStore();
    console.log(PhotoActions);
    console.log(PhotoStores);

    this.state = PhotoStores.getAll();
    this.__onChange = this.__onChange.bind(this);
  }
  componentDidMount() {
    PhotoStores.addChangeListener(this.__onChange);
    PhotoActions.fetchPhotoGroups();
    PhotoActions.fetchGroupPhotos();
  }
  componentWillUnmount() {
    PhotoStores.removeChangeListener(this.__onChange);
  }
  __onChange() {
    this.setState(PhotoStores.getAll());
  }
  render() {
    return (
      <div id='photo-div'>
        <PhotoFlow key = {this.state.key} gid = {this.state.gid} groups = {this.state.groups} photos = {this.state.photos} pfobMoveVisible = {this.state.pfobMoveVisible} pfobDelVisible = {this.state.pfobDelVisible}/>
        <PhotoGroupBar key = {this.state.key + 100} gid = {this.state.gid} groups = {this.state.groups} addVisible = {this.state.groupAddVisible} opeImgVisible = {this.state.groupOpeImgVisible}/>
      </div>
    );
  }
}

module.exports = PhotoArea;