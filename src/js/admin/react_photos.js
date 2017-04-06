const React = require('react');
const ReactDOM = require('react-dom');

const ConfirmDialog = require("../components/dialogs/confirm_dialog.js");
const InputDialog = require("../components/dialogs/input_dialog.js");
const OptionDialog = require("../components/dialogs/option_dialog.js");
const TableNavLink = require("../components/table_foot_nav.js");

const PhotoActions = require('../actions/actions_photos');
const PhotoStores = require('../stores/stores_photos');

class PhotoFlowOperationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moveVisible: false,
      delVisible: false
    }
    this.handleUploadButtonClick = this.handleUploadButtonClick.bind(this);
    this.handleUploadInputChange = this.handleUploadInputChange.bind(this);
    
    // Dialog Visibility
    this.hideMoveDialog = this.hideMoveDialog.bind(this);
    this.hideDelDialog = this.hideDelDialog.bind(this);
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
    this.props.handleUploadInputChange(e);
  }

  hideMoveDialog() {
    this.setState({
      moveVisible: false
    });
  }

  hideDelDialog() {
    this.setState({
      delVisible: false
    });
  }

  handleMoveConfirm(new_gid) {
    this.props.handleMoveChecked(new_gid);
    this.hideMoveDialog();
  }

  handleMoveCancel() {
    this.hideMoveDialog();
  }

  handleDelConfirm() {
    this.props.handleDeleteChecked();
    this.hideDelDialog();
  }

  handleDelCancel() {
    this.hideDelDialog();
  }

  moveButtonClick() {
    this.setState({
      moveVisible: true
    });
  }

  delButtonClick() {
    this.setState({
      delVisible: true
    })
  }

  handleAllCheckChanged(e) {
    var allChecked = e.target.checked;
    this.props.handleAllCheckChanged(allChecked);
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
            <OptionDialog title = "移动分组" optionItems = {this.props.groups} centerScreen = {false} confirm = {this.handleMoveConfirm} cancel = {this.handleMoveCancel} visible = {this.state.moveVisible} />
          </div>
          <div id = 'photo-flow-opebar-del-div'>
            <button id = 'photo-flow-opebar-del-button' className = 'operation-button operation-button-cancel' onClick = {this.delButtonClick}>删除</button>
            <ConfirmDialog title = '确认删除?' centerScreen = {false} confirm = {this.handleDelConfirm} cancel = {this.handleDelCancel} visible = {this.state.delVisible} />
          </div>
        </div>
      </div>
    );
  }
}

class PhotoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // config for InputDialog (edit)
      inputVisible: false,
      // config for MoveDialog 
      moveVisible: false,
      // config for DelDialog
      delVisible: false
    };
    this.handlePhotoCheck = this.handlePhotoCheck.bind(this);
    //Dialog Visibility
    this.showInputDialog = this.showInputDialog.bind(this);
    this.hideInputDialog = this.hideInputDialog.bind(this);
    this.showMoveDialog = this.showMoveDialog.bind(this);
    this.hideMoveDialog = this.hideMoveDialog.bind(this);
    this.showDelDialog = this.showDelDialog.bind(this);
    this.hideDelDialog = this.hideDelDialog.bind(this);
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
  handlePhotoCheck(e) {
    this.props.handleCheckChange(e.target.value, e.target.checked);
  }
  showInputDialog(e) {
    this.setState({
      inputVisible: true
    });
  }
  hideInputDialog(e) {
    this.setState({
      inputVisible: false
    });
  }
  showMoveDialog(e) {
    this.setState({
      moveVisible: true
    });
  }
  showDelDialog(e) {
    this.setState({
      delVisible: true
    });
  }
  hideDelDialog(e) {
    this.setState({
      delVisible: false
    });
  }
  hideMoveDialog(e) {
    this.setState({
      moveVisible: false
    });
  }
  handleInputConfirm(name) {
    this.props.rename(this.props.photo.id, name);
    this.hideInputDialog();
  }
  handleInputCancel() {
    this.hideInputDialog();
  }
  handleMoveConfirm(new_gid) {
    this.props.movegroup(this.props.photo.id, new_gid);
    this.hideMoveDialog();
  }
  handleMoveCancel() {
    this.hideMoveDialog();
  }
  handleDelConfirm() {
    this.props.delphoto(this.props.photo.id);
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
    var photoSrc = '/images/blog/' + this.props.photo.name;
    var checked = this.props.checked ? "checked" : "";
    return (
      <li className = 'photo-flow-item-li'>
        <div className = 'photo-flow-item-li-img-div'>
          <img className = 'photo-flow-item-li-img' src= {photoSrc} onLoad = {this.photoOnLoad}></img>
        </div>
        <div className = 'photo-flow-item-name-div'>
          <input className = 'photo-flow-item-name-checkbox' type='checkbox' value = {this.props.photo.id} checked = {checked} onChange = {this.handlePhotoCheck}/>
          <span className = 'photo-flow-item-name-span'>{this.props.photo.title}</span>
        </div>
        <div className = 'photo-flow-item-li-ope-bar'>
          <li className = 'photo-flow-item-ope-img photo-flow-item-mode-edit' onClick = {this.showInputDialog}></li>
          <li className = 'photo-flow-item-ope-img photo-flow-item-mode-swap' onClick = {this.showMoveDialog}></li>
          <li className = 'photo-flow-item-ope-img photo-flow-item-mode-del' onClick = {this.showDelDialog}></li>
        </div>
        <InputDialog title = '编辑名称' centerScreen = {false} confirm = {this.handleInputConfirm} cancel = {this.handleInputCancel} visible = {this.state.inputVisible}/>
        <OptionDialog title = '移动分组' optionItems = {this.props.groups} confirm = {this.handleMoveConfirm} cancel = {this.handleMoveCancel} visible = {this.state.moveVisible} centerScreen = {false} />
        <ConfirmDialog title = '确认删除?' centerScreen = {false} confirm = {this.handleDelConfirm} cancel = {this.handleDelCancel} visible = {this.state.delVisible} />
      </li>
    );
  }
}

class PhotoFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      // 这个状态需要同步 😊 
      checkState: {},
      start: 0, //暂时没用到，做个标记😊 
    };
    this.handleUploadInputChange = this.handleUploadInputChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
  
    // all-check checkbox
    this.handleAllCheckChanged = this.handleAllCheckChanged.bind(this);
    this.handleDeleteChecked = this.handleDeleteChecked.bind(this);
    this.handleMoveChecked = this.handleMoveChecked.bind(this);

    this.moveGroup = this.moveGroup.bind(this);
    this.moveSingleGroup = this.moveSingleGroup.bind(this);
    this.renamePhoto = this.renamePhoto.bind(this);
    this.deletePhotos = this.deletePhotos.bind(this);
    this.deleteSinglePhoto = this.deleteSinglePhoto.bind(this);
    this.getSinglePhoto = this.getSinglePhoto.bind(this);
    this.getGroupPhotos = this.getGroupPhotos.bind(this);
    this.getGroupPhotos();
  }

  handleAllCheckChanged(checked) {
    var checkState = this.state.checkState;
    this.state.photos.forEach((photo) => {
      checkState[photo.id] = checked;
    });
    this.setState({
      checkState: checkState
    });
  }

  deletePhotos(ids) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photos/delete', 
      data: {photos: ids},
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        PhotoActions.refetch();
      }
    })
  }

  deleteSinglePhoto(id) {
    this.deletePhotos([id].join(','));
  }

  handleDeleteChecked() {
    var ids = [];
    for (let id in this.state.checkState) {
      if (this.state.checkState[id]) {
        ids.push(id);
      }
    }
    this.deletePhotos(ids);
  }

  moveGroup(ids, new_gid) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photos/move',
      data: {photos: ids, gid: new_gid},
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          PhotoActions.refetch();
        }
      }
    })
  }

  moveSingleGroup(id, new_gid) {
    this.moveGroup([id].join(','), new_gid);
  }

  handleMoveChecked(new_gid) {
    var ids = [];
    for (let id in this.state.checkState) {
      if (this.state.checkState[id]) {
        ids.push(id);
      }
    }
    this.moveGroup(ids.join(','), new_gid);
  }

  // 上传图片
  handleUploadInputChange(e) {
    var that = this;
    var input = e.target;
    var file = input.files[0];
    var fd = new FormData();
    fd.append('file', file);
    fd.append('gid', this.props.gid);
    $.ajax({
      url: '/admin/datas/photos/add',
      data: fd,
      type: 'post',
      dataType: 'json',
      success: function(dt) {
        PhotoActions.refetch();
      },
      error: function(err) {
        console.log('error');
      }
    });
  }

  renamePhoto(id, name) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photos/rename',
      data: {id: id, title: name},
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          that.getSinglePhoto(id);
        }
      }
    })
  }

  getSinglePhoto(id) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photos/get',
      data: {id: id},
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          var photos = that.state.photos;
          for (let index in photos) {
            if (photos[index].id == id) {
              photos[index] = dt.data[0];
              that.setState({
                photos: photos
              });
              break;
            }
          }
        }
      }
    })
  }
  /**
   * 这里在 photo flow 中添加、移动、删除时不能更新
   */
  getGroupPhotos() {
    var that = this;
    // this or that 😊 在函数参数中，待查
    $.ajax({
      url: '/admin/datas/photos/get',
      data: {gid: this.props.gid},
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          that.setState({
            photos: dt.data,
            checkState: {}
          });
        }
      }
    })
  }

  handleCheckChange(id, checked) {
    var checkState = this.state.checkState;
    checkState[id] = checked;
    this.setState({
      checkState: checkState
    });
  }

  render() {
    const items = this.state.photos.map((photo) => {
      var checked = this.state.checkState[photo.id] ? true : false;
      return <PhotoItem photo = {photo} groups = {this.props.groups} rename = {this.renamePhoto} movegroup = {this.moveSingleGroup} delphoto = {this.deleteSinglePhoto} handleCheckChange = {this.handleCheckChange} checked = {checked}/>
    });
    return (
      <div id = 'photo-flow-div'>
        <PhotoFlowOperationBar groups = {this.props.groups} handleUploadInputChange = {this.handleUploadInputChange} handleAllCheckChanged = {this.handleAllCheckChanged} handleDeleteChecked = {this.handleDeleteChecked} handleMoveChecked = {this.handleMoveChecked} />
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
    this.state = {
      inputVisible: false,
      delVisible: false
    }
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
    this.setState({
      inputVisible: true
    });
  }
  hideInputDialog() {
    this.setState({
      inputVisible: false
    });
  }
  showDelDialog(){
    this.setState({
      delVisible: true
    });
  }
  hideDelDialog() {
    this.setState({
      delVisible: false
    });
  }
  handleInputConfirm(name) {
    var gid = this.props.group.id;
    this.props.handleRenameGroup(gid, name);
    this.hideInputDialog();
  }
  handleInputCancel() {
    this.hideInputDialog();
  }
  handleDelConfirm() {
    var gid = this.props.group.id;
    this.props.handleDeleteGroup(gid);
    this.hideDelDialog();
  }
  handleDelCancel() {
    this.hideDelDialog();
  }
  handleGroupItemClick(e) {
    var gid = this.props.group.id;
    this.props.handleGroupItemClick(gid);
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
        <InputDialog title = '编辑名称' centerScreen = {false} confirm = {this.handleInputConfirm} cancel = {this.handleInputCancel} visible = {this.state.inputVisible}/>
        <ConfirmDialog title = '确认删除?' centerScreen = {false} confirm = {this.handleDelConfirm} cancel = {this.handleDelCancel} visible = {this.state.delVisible} />
      </li>
    );
  }
}

class PhotoGroupBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addVisible: false,
      opeImgVisible: false
    }
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleGroupItemClick = this.handleGroupItemClick.bind(this);
    this.showAddDialog = this.showAddDialog.bind(this);
    this.fetchGroupData = this.fetchGroupData.bind(this);
    this.toggleOpeImgState = this.toggleOpeImgState.bind(this);
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
    this.handleRenameGroup = this.handleRenameGroup.bind(this);
  
    this.fetchGroupData();
  }

  showAddDialog() {
    this.setState({
      addVisible: true
    });
  }
  
  fetchGroupData() {
    PhotoActions.fetchPhotoGroups();
  }

  handleConfirm(groupname) {
    this.setState({
      addVisible: false
    });
    var that = this;
    $.ajax({
      url: '/admin/datas/photogroup/modify',
      data: {groupname: groupname},
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        that.fetchGroupData();
      },
      error: function() {
        console.log('error');
      }
    });
  }

  handleCancel() {
    this.setState({
      addVisible: false
    });
  }

  handleGroupItemClick (gid) {
    PhotoActions.photoGroupChange(gid);
  }

  handleDeleteGroup(gid) {
    console.log('gid: ' + gid);
    var that = this;
    $.ajax({
      url: '/admin/datas/photogroup/remove',
      data: {gid: gid},
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        console.log(JSON.stringify(dt));
        if (dt.code == 0) {
          if (gid == that.props.gid) {
            PhotoActions.photoGroupChange(-1);
          } else {
            that.fetchGroupData();
          }
        }
      }
    });
  }

  handleRenameGroup(gid, name) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photogroup/rename',
      data: {gid: gid, name: name},
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          that.fetchGroupData();
        }
      }
    })
  }

  toggleOpeImgState() {
    this.setState(function(previous, props) {
      return {
        opeImgVisible: !previous.opeImgVisible
      };
    });
  }

  render() {
    var opebarImg = this.state.opeImgVisible ? '/images/icons/ic_cancel_black_24dp_2x.png' :'/images/icons/ic_arrow_drop_down_circle_black_24dp_2x.png';
    var groupItems = this.props.groups.map((group) => (
      <PhotoGroupItem group = {group} gid = {this.props.gid} opeImgVisible = {this.state.opeImgVisible} handleGroupItemClick = {this.handleGroupItemClick} handleDeleteGroup = {this.handleDeleteGroup} handleRenameGroup = {this.handleRenameGroup}/>
    ));
    var key = new Date().getTime();
    return (
      <div id = 'photo-group-div'>
        <div className = 'photo-group-operation-bar'>
          <div id = 'add-new-photo-group-div' onClick = {this.showAddDialog}>新建分组</div>
          <InputDialog title = '新建分组' centerScreen = {false} confirm = {this.handleConfirm} cancel = {this.handleCancel} visible = {this.state.addVisible}/>
        </div>
        <div className = 'photo-group-operation-bar'>
          <div id = 'photo-group-opebar-title-div' >图片组</div>
          <img id = 'photo-group-opebar-img' src = {opebarImg} onClick = {this.toggleOpeImgState}/>
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
    this.state = {
      gid: -1,
      key: new Date().getTime(),
      // groups
      groups: []
    }
    this.__onChange = this.__onChange.bind(this);
  }
  componentDidMount() {
    PhotoStores.addChangeListener(this.__onChange);
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
        <PhotoFlow key = {this.state.key} gid = {this.state.gid} groups = {this.state.groups}/>
        <PhotoGroupBar key = {this.state.key + 100} gid = {this.state.gid} groups = {this.state.groups}/>
      </div>
    );
  }
}

module.exports = PhotoArea;