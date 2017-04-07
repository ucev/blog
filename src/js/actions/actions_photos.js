const PhotoDispatcher = require('../dispatcher/dispatcher_photos');

const PhotoActions = {
  fetchPhotoGroups: function() {
    PhotoDispatcher.dispatch({
      actionType: "FETCH_PHOTO_GROUPS"
    })
  },
  photoGroupChange: function(gid) {
    PhotoDispatcher.dispatch({
      actionType: "PHOTO_GROUP_CHANGE",
      gid: gid
    })
  },
  // group action start
  groupAddCancel: function() {
    PhotoDispatcher.dispatch({
      actionType: "GROUP_ADD_CANCEL"
    })
  },
  groupAddConfirm: function(groupname) {
    PhotoDispatcher.dispatch({
      actionType: "GROUP_ADD_CONFIRM",
      gname: groupname
    })
  },
  groupOpeImgStateToggle: function() {
    PhotoDispatcher.dispatch({
      actionType: "GROUP_OPE_IMG_STATE_TOGGLE"
    })
  },
  groupShowAddDialog: function() {
    PhotoDispatcher.dispatch({
      actionType: "GROUP_SHOW_ADD_DIALOG"
    })
  },
  // group action end

  // group item action start
  groupItemHideDeleteDialog: function(gid) {
    PhotoDispatcher.dispatch({
      actionType: "GROUP_ITEM_HIDE_DELETE",
      gid: gid
    })
  },
  groupItemShowDeleteDialog: function(gid) {
    PhotoDispatcher.dispatch({
      actionType: "GROUP_ITEM_SHOW_DELETE",
      gid: gid
    })
  },
  groupItemHideInputDialog: function(gid) {
    PhotoDispatcher.dispatch({
      actionType: "GROUP_ITEM_HIDE_INPUT",
      gid: gid
    })
  },
  groupItemShowInputDialog: function(gid) {
    PhotoDispatcher.dispatch({
      actionType: "GROUP_ITEM_SHOW_INPUT",
      gid: gid
    })
  },
  groupItemClick: function(gid) {
    PhotoDispatcher.dispatch({
      actionType: "GROUP_ITEM_CLICK",
      gid: gid
    })
  },
  groupItemDelete: function(gid) {
    PhotoDispatcher.dispatch({
      actionType: "GROUP_ITEM_DELETE",
      gid: gid
    })
  },
  groupItemRename: function(gid, newname) {
    PhotoDispatcher.dispatch({
      actionType: "GROUP_ITEM_RENAME",
      gid: gid,
      newname: newname
    })
  },
  // group item action end
  // photo flow action start
  fetchGroupPhotos: function() {
    PhotoDispatcher.dispatch({
      actionType: "FETCH_GROUP_PHOTOS"
    })
  },
  fetchSinglePhoto: function(id) {
    PhotoDispatcher.dispatch({
      actionType: "FETCH_SINGLE_PHOTO",
      id: id
    })
  },
  photoCheckStateChange: function(id, checked) {
    PhotoDispatcher.dispatch({
      actionType: "PHOTO_CHECK_STATE_CHANGE",
      id: id,
      checked: checked
    })
  },
  photoCheckStateChangeAll: function(checked) {
    PhotoDispatcher.dispatch({
      actionType: "PHOTO_CHECK_STATE_CHANGE_ALL",
      checked: checked
    })
  },
  photoMoveGroup: function(ids, newgid) {
    PhotoDispatcher.dispatch({
      actionType: "PHOTO_MOVE_GROUP",
      ids: ids,
      newgid: newgid
    })
  },
  photoMoveSingle: function(id, newgid) {
    PhotoDispatcher.dispatch({
      actionType: "PHOTO_MOVE_GROUP_SINGLE",
      id: id,
      newgid: newgid
    })
  },
  photoMoveByGroup: function(newgid) {
    PhotoDispatcher.dispatch({
      actionType: "PHOTO_MOVE_BY_GROUP",
      newgid: newgid
    })
  },
  photoDeleteDialogVisible: function(id, visible) {
    PhotoDispatcher.dispatch({
      actionType: "PHOTO_DELETE_DIALOG_VISIBLE",
      id: id,
      visible: visible
    })
  },
  photoInputDialogVisible: function(id, visible) {
    PhotoDispatcher.dispatch({
      actionType: "PHOTO_INPUT_DIALOG_VISIBLE",
      id: id,
      visible: visible
    })
  },
  photoMoveDialogVisible: function(id, visible) {
    PhotoDispatcher.dispatch({
      actionType: "PHOTO_MOVE_DIALOG_VISIBLE",
      id: id,
      visible: visible
    })
  },
  photoUpload: function(file) {
    PhotoDispatcher.dispatch({
      actionType: "PHOTO_UPLOAD",
      file: file
    })
  },
  // photo flow action end
  // photo item action start
  photoDeleteSingle: function(id) {
    PhotoDispatcher.dispatch({
      actionType: "PHOTO_DELETE_SINGLE",
      id: id
    })
  },
  photoDeleteByGroup: function() {
    PhotoDispatcher.dispatch({
      actionType: "PHOTO_DELETE_BY_GROUP"
    })
  },
  photoRename: function(id, newname) {
    PhotoDispatcher.dispatch({
      actionType: "PHOTO_RENAME",
      id: id,
      newname: newname
    })
  },
  // photo item action end
  pfobDeleteDialogVisible: function(visible) {
    PhotoDispatcher.dispatch({
      actionType: "PFOB_DELETE_DIALOG_VISIBLE",
      visible: visible
    })
  },
  pfobMoveDialogVisible: function(visible) {
    PhotoDispatcher.dispatch({
      actionType: "PFOB_MOVE_DIALOG_VISIBLE",
      visible: visible
    })
  },
  refetch: function() {
    PhotoDispatcher.dispatch({
      actionType: "REFETCH"
    })
  },
};

module.exports = PhotoActions;