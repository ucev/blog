const BaseStore = require('./stores_base');

class PhotoStore extends BaseStore {
  constructor() {
    super();
    this.setState({
      gid: -1,
      key: Date.now(),
      // photo group
      groups: [],
      groupAddVisible: false,
      groupOpeImgVisible: false,
      // photo item
      photos: [],
      photoStart: 0, //暂时没用到，做个标记😊 
      // PhotoFlowOperationBar
      pfobMoveVisible: false,
      pfobDelVisible: false
    }, false)
    this.gid = -1;
    this.key = new Date().getTime();
    // groups
    this.groups = [];
    this.groupAddVisible = false;
    this.groupOpeImgVisible = false;
  }
  fetchPhotoGroups() {
    var that = this;
    $.ajax({
      url: '/admin/datas/photogroup/get',
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          var groups = dt.data;
          groups.forEach((group) => {
            group.inputVisible = false;
            group.delVisible = false;
          })
          that.setState({
            groups: groups
          });
        }
      }
    });
  }
  photoGroupChange(gid) {
    //this.setState({gid: gid, key: Date.now()});
    this.setState({
      gid: gid
    });
    this.fetchGroupPhotos();
  }
  // group stores start
  groupAddCancel() {
    this.setState({
      groupAddVisible: false
    });
  }
  groupAddConfirm(groupname) {
    this.setState({
      groupAddVisible: false
    });
    var that = this;
    $.ajax({
      url: '/admin/datas/photogroup/modify',
      data: {
        groupname: groupname
      },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        that.fetchPhotoGroups();
      },
      error: function () {
        console.log('error');
      }
    });
  }
  groupOpeImgStateToggle() {
    this.setState({
      groupOpeImgVisible: !this.getState("groupOpeImgVisible")
    });
  }
  groupShowAddDialog() {
    this.setState({
      groupAddVisible: true
    });
  }
  // group stores end

  // group item stores start
  groupItemHideDeleteDialog(gid) {
    var groups = this.getState("groups");
    for (var i in groups) {
      if (groups[i].id == gid) {
        groups[i].delVisible = false;
        this.setState({
          groups: groups
        });
        break;
      }
    }
  }
  groupItemShowDeleteDialog(gid) {
    var groups = this.getState("groups");
    for (var i in groups) {
      if (groups[i].id == gid) {
        groups[i].delVisible = true;
        this.setState({
          groups: groups
        });
        break;
      }
    }
  }
  groupItemHideInputDialog(gid) {
    var groups = this.getState("groups");
    for (var i in groups) {
      if (groups[i].id == gid) {
        groups[i].inputVisible = false;
        this.setState({
          groups: groups
        });
        break;
      }
    }
  }
  groupItemShowInputDialog(gid) {
    var groups = this.getState("groups");
    for (var i in groups) {
      if (groups[i].id == gid) {
        groups[i].inputVisible = true;
        this.setState({
          groups: groups
        });
        break;
      }
    }
  }
  groupItemClick(gid) {
    this.photoGroupChange(gid);
  }
  groupItemDelete(gid) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photogroup/remove',
      data: {
        gid: gid
      },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          if (gid == that.gid) {
            that.photoGroupChange(-1);
          } else {
            that.fetchPhotoGroups();
          }
        }
      }
    });
  }
  groupItemRename(gid, newname) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photogroup/rename',
      data: {
        gid: gid,
        name: newname
      },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.fetchPhotoGroups();
        }
      }
    })
  }
  // group item stores end
  // photo flow stores start
  /**
   * 这里在 photo flow 中添加、移动、删除时不能更新
   */
  fetchGroupPhotos() {
    var that = this;
    // this or that 😊 在函数参数中，待查
    $.ajax({
      url: '/admin/datas/photos/get',
      data: {
        gid: this.getState("gid")
      },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          var photos = dt.data;
          photos.forEach((photo) => {
            photo.checked = false;
            photo.delVisible = false;
            photo.inputVisible = false;
            photo.moveVisible = false;
          })
          that.setState({
            photos: photos
          });
        }
      }
    })
  }
  fetchSinglePhoto(id) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photos/get',
      data: {
        id: id
      },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          var photos = that.getState("photos");
          for (let index in photos) {
            if (photos[index].id == id) {
              var photo = dt.data[0];
              photo.checked = photos[index].checked;
              photo.delVisible = false;
              photo.inputVisible = false;
              photo.moveVisible = false;
              photos[index] = photo;
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
  photoCheckStateChange(id, checked) {
    var photos = this.getState("photos");
    for (var i in photos) {
      if (photos[i].id == id) {
        photos[i].checked = checked;
        this.setState({
          photos: photos
        });
        break;
      }
    }
  }
  photoCheckStateChangeAll(checked) {
    var photos = this.getState("photos");
    photos.forEach((photo) => {
      photo.checked = checked;
    })
    this.setState({
      photos: photos
    });
  }
  photoMoveGroup(ids, newgid) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photos/move',
      data: {
        photos: ids,
        gid: newgid
      },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.fetchPhotoGroups();
          that.fetchGroupPhotos();
        }
      }
    })
  }
  // 上传图片
  photoUpload(file) {
    var that = this;
    var fd = new FormData();
    fd.append('file', file);
    fd.append('gid', this.getState("gid"));
    $.ajax({
      url: '/admin/datas/photos/add',
      data: fd,
      type: 'post',
      processData: false,
      contentType: false,
      dataType: 'json',
      success: function (dt) {
        that.fetchGroupPhotos();
      },
      error: function (err) {
        console.log('error');
      }
    });
  }
  // photo flow stores end
  // photo item stores start
  __deletePhotos(ids) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photos/delete',
      data: {
        photos: ids
      },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        that.fetchGroupPhotos();
      }
    })
  }
  photoDeleteSingle(id) {
    this.__deletePhotos([id].join(','));
  }
  photoDeleteByGroup() {
    var ids = [];
    var photos = this.getState("photos");
    for (var i in photos) {
      if (photos[i].checked) {
        ids.push(photos[i].id);
      }
    }
    this.__deletePhotos(ids.join(","));
  }
  photoMoveSingle(id, newgid) {
    this.photoMoveGroup([id].join(','), newgid);
  }
  photoMoveByGroup(newgid) {
    var ids = [];
    var photos = this.getState("photos");
    for (var i in photos) {
      if (photos[i].checked) {
        ids.push(photos[i].id);
      }
    }
    this.photoMoveGroup(ids.join(","), newgid);
  }
  photoDeleteDialogVisible(id, visible) {
    var photos = this.getState("photos");
    for (var i in photos) {
      if (photos[i].id == id) {
        photos[i].delVisible = visible;
        this.setState({
          photos: photos
        });
        break;
      }
    }
  }
  photoInputDialogVisible(id, visible) {
    var photos = this.getState("photos");
    for (var i in photos) {
      if (photos[i].id == id) {
        photos[i].inputVisible = visible;
        this.setState({
          photos: photos
        });
        break;
      }
    }
  }
  photoMoveDialogVisible(id, visible) {
    var photos = this.getState("photos");
    for (var i in photos) {
      if (photos[i].id == id) {
        photos[i].moveVisible = visible;
        this.setState({
          photos: photos
        });
        break;
      }
    }
  }
  photoRename(id, name) {
    var that = this;
    $.ajax({
      url: '/admin/datas/photos/rename',
      data: {
        id: id,
        title: name
      },
      type: 'get',
      dataType: 'json',
      success: function (dt) {
        if (dt.code == 0) {
          that.fetchSinglePhoto(id);
        }
      }
    })
  }
  // photo item stores end
  pfobDeleteDialogVisible(visible) {
    this.setState({
      pfobDelVisible: visible
    });
  }
  pfobMoveDialogVisible(visible) {
    this.setState({
      pfobMoveVisible: visible
    });
  }
  refetch() {
    this.setState({
      key: Date.now()
    });
  }
  getAll() {
    return this.getState();
  }
};

module.exports = PhotoStore;