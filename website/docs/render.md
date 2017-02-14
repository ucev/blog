# react render 中 state 和 props 的问题

      class PhotoFlow extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            gid: this.props.gid,
            photos: [],
            // 这个状态需要同步 😊 
            checkState: {},
            start: 0, //暂时没用到，做个标记😊 

            // state for MovePhotoGroupDialog
            moveDialogVisible: false,
            moveDialogX: 0,
            moveDialogY: 0,
            moveTarget: [],

            // state for deletePhotoDialog
            delDialogVisible: false,
            delDialogX: 0,
            delDialogY: 0,
            delTarget: []
          };
          this.handleUploadButtonClick = this.handleUploadButtonClick.bind(this);
          this.handleUploadInputChange = this.handleUploadInputChange.bind(this);
          this.handleCheckChange = this.handleCheckChange.bind(this);
          this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
          this.handleDeleteCancel = this.handleDeleteCancel.bind(this);

          this.moveGroup = this.moveGroup.bind(this);

          this.renamePhoto = this.renamePhoto.bind(this);
          this.getSinglePhoto = this.getSinglePhoto.bind(this);
          this.getGroupPhotos = this.getGroupPhotos.bind(this);
          this.getGroupPhotos();
        }
        handleUploadButtonClick(e) {
          var input = this.uploadInput;
          input.click();
        }
        handleUploadInputChange(e) {
          var input = e.target;
          var file = input.files[0];
          var fd = new FormData();
          fd.append('file', file);
          fd.append('gid', this.state.gid);
          fetch('/admin/datas/photos/add', {
            data: fd,
            type: 'post',
            dataType: 'json',
            success: function(dt) {
              console.log('上传成功', JSON.stringify(dt));
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
        getGroupPhotos() {
          var that = this;
          // this or that 😊 在函数参数中，待查
          fetch('/admin/datas/photos/get', {
            data: {gid: this.state.gid},
            type: 'get',
            dataType: 'json',
            success: function(dt) {
              console.log('get group photos, ' + dt);
              if (dt.code == 0) {
                that.setState({
                  photos: dt.data,
                  checkState: {}
                });
              }
            }
          })
        }
        moveGroup(id, new_gid) {
          console.log('move group');
          var that = this;
          fetch('/admin/datas/photos/move', {
            data: {photos: [id].join(','), gid: new_gid},
            type: 'get',
            dataType: 'json',
            success: function(dt) {
              console.log('move group, ' + JSON.stringify(dt));
              if (dt.code == 0) {
                that.getGroupPhotos();
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
        handleDeleteConfirm() {
          alert('confirm');
          this.setState({
            delDialogVisible: false
          });
        }
        handleDeleteCancel() {
          this.setState({
            delDialogVisible: false
          });
        }
        render() {
          /**
           * ugly way(rerender or setState three time)
           * for later review
           */
           // 这种情况下不能更新
          if (this.state.gid != this.props.gid) {
            this.setState({
              gid: this.props.gid
            });
            this.getGroupPhotos();
          }
          const items = this.state.photos.map((photo) => {
            var checked = this.state.checkState[photo.id] ? true : false;
            return <PhotoItem photo = {photo} rename = {this.renamePhoto} movegroup = {this.moveGroup} handleCheckChange = {this.handleCheckChange} checked = {checked}/>
          });

          var uploadInputStyles = {
            display: 'none'
          };
          return (
            <div id = 'photo-flow-div'>
              <div className = 'photo-operation-bar' id = 'photo-operation-bar-first'>
                <button id = 'upload-image-button' className='operation-button' onClick = {this.handleUploadButtonClick} >上传图片</button>
                <input ref = {(input) => {this.uploadInput = input;}} id = 'upload-image-input' type = 'file' accept="image/*" style = {uploadInputStyles} onChange = {this.handleUploadInputChange} />
              </div>
              <div className = 'photo-operation-bar' id = 'photo-operation-bar-second'>
                <input type='checkbox' /><label>全选</label>
                <button className = 'operation-button'>移动分组</button>
                <button className = 'operation-button'>删除</button>
              </div>
              <ul id = 'photo-flow-items-ul'>
                {items}
              </ul>
              <MovePhotoGroupDialog visible = {this.state.moveDialogVisible} x = {this.state.moveDialogX} y = {this.state.moveDialogY} confirm = {this.handleMoveGroupConfirm} cancel = {this.handleMoveGroupCancel} />
              <ConfirmDialog visible = {this.state.delDialogVisible} x = {this.state.delDialogX} y = {this.state.delDialogY} confirm = {this.handleDeleteConfirm} cancel = {this.handleDeleteCancel}/>
            </div>
          );
        }
      }
      class PhotoArea extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            gid: 1
          }
          this.handlePhotoGroupChange = this.handlePhotoGroupChange.bind(this);
        }
        handlePhotoGroupChange(gid) {
          this.setState({
            gid: gid
          });
        }
        /**
         * 原本想把这个函数封进PhotoFlow 中
         * 但没有找到合适的更新方法
         * 暂且用 key 来更新
         * 以后再看一看有没有更好的方法
         * 现在这个做个记号😊 
         * 以示可以在这里拉取数据
         * 然后作为 PhotoFlow 的 props 传入
         * 这样封装性不太好
         */
        getGroupPhotos() {

        }
        render() {
          var groups = [];
          var key = new Date().getTime();
          return (
            <div id='photo-div'>
              <PhotoFlow gid = {this.state.gid} count = '200' />
              <PhotoGroupBar key = {key} gid = {this.state.gid} groups = {groups} groupChange = {this.handlePhotoGroupChange}/>
            </div>
          );
        }
      }