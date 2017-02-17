
      class InputDialog extends React.Component {
        constructor(props) {
          super(props);
          this.handleConfirmClick = this.handleConfirmClick.bind(this);
          this.handleCancelClick = this.handleCancelClick.bind(this);
          this.handleKeyDown = this.handleKeyDown.bind(this);
        }
        handleConfirmClick() {
          var val = this.textInput.value;
          this.props.confirm(val);
          this.textInput.value = "";
        }
        handleCancelClick() {
          this.props.cancel();
        }
        handleKeyDown(e) {
          if (e.which == 13) {
            this.handleConfirmClick();
          }
        }
        render() {
          var styles = {};
          if (!this.props.visible)
            styles.display = 'none';
          return (
              <div className = 'dialog-div input-dialog' style = {styles}>
                <div className = 'dialog-header-div'>
                  <div className = 'dialog-title-div'>{this.props.title}</div>
                </div>
                <div className = 'dialog-main-body-div'>
                  <input className = 'dialog-content-input' ref = {(input) => (this.textInput = input)} onKeyDown = {this.handleKeyDown} />
                </div>
                <div className = 'dialog-buttom-operation-bar'>
                  <button className = 'dialog-operation-button dialog-confirm-button' onClick = {this.handleConfirmClick}>确定</button>
                  <button className = 'dialog-operation-button dialog-cancel-button' onClick = {this.handleCancelClick}>取消</button>
                </div>
              </div>
          );
        }
      }

      class MovePhotoGroupDialog extends React.Component {
        constructor(props) {
          super(props);
          this.handleConfirmClick = this.handleConfirmClick.bind(this);
          this.handleCancelClick = this.handleCancelClick.bind(this);
          this.handleGroupChange = this.handleGroupChange.bind(this);
          this.state = {
            newgroup : -1
          };
        }

        handleConfirmClick(e) {
          this.props.confirm(this.state.newgroup);
        }

        handleCancelClick(e) {
          this.props.cancel();
        }

        handleGroupChange(e) {
          var radio = e.target;
          if (radio.checked) {
            this.setState({
              newgroup: radio.value
            });
          }
        }

        render() {
          var styles = {}, groups = [];
          if (!this.props.visible) styles.display = 'none';
          if (localStorage.getItem('photo_group')) {
            groups = JSON.parse(localStorage.getItem("photo_group"));
          }

          var groupItems = groups.map((group) => {
            if (group.id == -1) return '';
            return (
              <li className = 'move-group-radio-li'>
                <input type = 'radio' name = 'photogroup' value = {group.id} onChange = {this.handleGroupChange}/>
                <label>{group.name}</label>
              </li>
            );
          });
          return (
            <div className = 'dialog-div option-dialog' style = {styles}>
              <div className = 'dialog-main-body-div'>
                <ul id = 'move-group-radio-ul'>
                  {groupItems}
                </ul>
              </div>
              <div className = 'dialog-bottom-operation-bar'>
                <button className = 'dialog-operation-button dialog-confirm-button' onClick = {this.handleConfirmClick}>确定</button>
                <button className = 'dialog-operation-button dialog-cancel-button' onClick = {this.handleCancelClick}>取消</button>
              </div>
            </div>
          );
        }
      }

      class ConfirmDialog extends React.Component {
        constructor(props) {
          super(props);
          this.handleConfirmClick = this.handleConfirmClick.bind(this);
          this.handleCancelClick = this.handleCancelClick.bind(this);
        }
        handleConfirmClick(e) {
          this.props.confirm();
        }
        handleCancelClick(e) {
          this.props.cancel();
        }
        render() {
          var styles = {};
          if (!this.props.visible) styles.display = 'none';
          return (
            <div className = 'dialog-div' style = {styles}>
              <div className = 'dialog-header-div'>
                <div className = 'dialog-title-div'>{this.props.title}</div>
              </div>
              <div className = 'dialog-bottom-operation-bar'>
                <button className = 'dialog-operation-button dialog-confirm-button' onClick = {this.handleConfirmClick}>确定</button>
                <button className = 'dialog-operation-button dialog-cancel-button' onClick = {this.handleCancelClick}>取消</button>
              </div>
            </div>
          );
        }
      }

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
                  <MovePhotoGroupDialog confirm = {this.handleMoveConfirm} cancel = {this.handleMoveCancel} visible = {this.state.moveVisible}/>
                </div>
                <div id = 'photo-flow-opebar-del-div'>
                  <button id = 'photo-flow-opebar-del-button' className = 'operation-button operation-button-cancel' onClick = {this.delButtonClick}>删除</button>
                  <ConfirmDialog title = '确认删除?' confirm = {this.handleDelConfirm} cancel = {this.handleDelCancel} visible = {this.state.delVisible} />
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
              <InputDialog title = '编辑名称' confirm = {this.handleInputConfirm} cancel = {this.handleInputCancel} visible = {this.state.inputVisible}/>
              <MovePhotoGroupDialog confirm = {this.handleMoveConfirm} cancel = {this.handleMoveCancel} visible = {this.state.moveVisible}/>
              <ConfirmDialog title = '确认删除?' confirm = {this.handleDelConfirm} cancel = {this.handleDelCancel} visible = {this.state.delVisible} />
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
          fetch('/admin/datas/photos/delete', {
            data: {photos: ids},
            type: 'get',
            dataType: 'json',
            success: function(dt) {
              that.props.handleRefetch();
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
          fetch('/admin/datas/photos/move', {
            data: {photos: ids, gid: new_gid},
            type: 'get',
            dataType: 'json',
            success: function(dt) {
              if (dt.code == 0) {
                that.props.handleRefetch();
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
          fetch('/admin/datas/photos/add', {
            data: fd,
            type: 'post',
            dataType: 'json',
            success: function(dt) {
              that.props.handleRefetch();
            },
            error: function(err) {
              console.log('error');
            }
          });
        }

        renamePhoto(id, name) {
          var that = this;
          fetch('/admin/datas/photos/rename', {
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
          fetch('/admin/datas/photos/get', {
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
          fetch('/admin/datas/photos/get', {
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
            return <PhotoItem photo = {photo} rename = {this.renamePhoto} movegroup = {this.moveSingleGroup} delphoto = {this.deleteSinglePhoto} handleCheckChange = {this.handleCheckChange} checked = {checked}/>
          });
          return (
            <div id = 'photo-flow-div'>
              <PhotoFlowOperationBar handleUploadInputChange = {this.handleUploadInputChange} handleAllCheckChanged = {this.handleAllCheckChanged} handleDeleteChecked = {this.handleDeleteChecked} handleMoveChecked = {this.handleMoveChecked} />
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
              <InputDialog title = '编辑名称' confirm = {this.handleInputConfirm} cancel = {this.handleInputCancel} visible = {this.state.inputVisible}/>
              <ConfirmDialog title = '确认删除?' confirm = {this.handleDelConfirm} cancel = {this.handleDelCancel} visible = {this.state.delVisible} />
            </li>
          );
        }
      }

      class PhotoGroupBar extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            groups: this.props.groups,
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
          var that = this;
          fetch('/admin/datas/photogroup/get', {
            type: 'get',
            dataType: 'json',
            success: function(dt) {
              if (dt.code == 0) {
                localStorage.setItem('photo_group', JSON.stringify(dt.data));
                that.setState({
                  groups: dt.data
                });
              }
            }
          });
        }

        handleConfirm(groupname) {
          this.setState({
            addVisible: false
          });
          var that = this;
          fetch('/admin/datas/photogroup/modify',{
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
          this.props.groupChange(gid);
        }

        handleDeleteGroup(gid) {
          console.log('gid: ' + gid);
          var that = this;
          fetch('/admin/datas/photogroup/remove', {
            data: {gid: gid},
            type: 'get',
            dataType: 'json',
            success: function(dt) {
              console.log(JSON.stringify(dt));
              if (dt.code == 0) {
                if (gid == that.props.gid) {
                  that.props.groupChange(-1);
                } else {
                  that.fetchGroupData();
                }
              }
            }
          });
        }

        handleRenameGroup(gid, name) {
          alert(gid + ', ' + name);
          var that = this;
          fetch('/admin/datas/photogroup/rename', {
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
          var opebarImg = this.state.opeImgVisible ? 
              '/images/icons/ic_cancel_black_24dp_2x.png' :
              '/images/icons/ic_arrow_drop_down_circle_black_24dp_2x.png';
          var groupItems = this.state.groups.map((group) => (
            <PhotoGroupItem group = {group} gid = {this.props.gid} opeImgVisible = {this.state.opeImgVisible} handleGroupItemClick = {this.handleGroupItemClick} handleDeleteGroup = {this.handleDeleteGroup} handleRenameGroup = {this.handleRenameGroup}/>
          ));
          var key = new Date().getTime();
          return (
            <div id = 'photo-group-div'>
              <div className = 'photo-group-operation-bar'>
                <div id = 'add-new-photo-group-div' onClick = {this.showAddDialog}>新建分组</div>
                <InputDialog title = '新建分组' confirm = {this.handleConfirm} cancel = {this.handleCancel} visible = {this.state.addVisible}/>
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
            key: new Date().getTime()
          }
          this.handlePhotoGroupChange = this.handlePhotoGroupChange.bind(this);
          this.handleRefetch = this.handleRefetch.bind(this);
        }
        handlePhotoGroupChange(gid) {
          this.setState({
            gid: gid,
            key: new Date().getTime()
          });
        }
        handleRefetch() {
          this.setState({
            key: new Date().getTime()
          });
        }
        /**
         * 原本想把这个函数封进PhotoFlow 中
         * 但没有找到合适的更新方法
         * 暂且用 key 来更新
         * 以后再看一看有没有更好的方法
         * 现在这个做个记号😊 🔥 
         * 以示可以在这里拉取数据
         * 然后作为 PhotoFlow 的 props 传入
         * 这样封装性不太好
         */
        getGroupPhotos() {

        }
        render() {
          var groups = [];
          return (
            <div id='photo-div'>
              <PhotoFlow key = {this.state.key} gid = {this.state.gid} handleRefetch = {this.handleRefetch}/>
              <PhotoGroupBar key = {this.state.key + 100} gid = {this.state.gid} groups = {groups} groupChange = {this.handlePhotoGroupChange} handleRefetch = {this.handleRefetch}/>
            </div>
          );
        }
      }
      ReactDOM.render(
        <PhotoArea />,
        document.getElementById('main-div')
      );
      function fetch(url, {
          data = {}, 
          type = 'get', 
          dataType = 'text', 
          success = function(){}, 
          error = function(){}, 
          complete = function(){}}) {
        function urlParamsEncode(obj) {
          var param = '';
          for (let key in obj) {
            param += (encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]) + '&');
          }
          return param.substring(0, param.length - 1);
        }
        var xhr = new XMLHttpRequest();
        if (xhr == null) return;
        if (type == 'get') {
          var params = urlParamsEncode(data);
          if (!url.endsWith('?')) url += '?';
          url += params;
        }
        xhr.open(type, url);
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            complete();
            if (xhr.status == 200) {
              switch (dataType) {
                case 'json':
                  success(JSON.parse(xhr.responseText));
                  break;
                case 'xml':
                  success(xhr.responseXML);
                  break;
                case 'text':
                default:
                  success(xhr.responseText);
                  break;
              }
            } else {
              // 此处没有参数
              error();
            }
          }
        };
        if (type == 'post') {
          if (data instanceof FormData) {
            //xhr.setRequestHeader('content-type', 'multipart/form-data');
            xhr.send(data);
          } else {
            var params = urlParamsEncode(data);
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send(params)
          }
        } else {
          xhr.send();
        }
      }