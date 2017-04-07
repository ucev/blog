const BaseActions = require('./actions_base');

class PhotoActions extends BaseActions {
  fetchPhotoGroups() {
    this.dispatcher.dispatch({
      actionType: "FETCH_PHOTO_GROUPS"
    })
  }
  photoGroupChange(gid) {
    this.dispatcher.dispatch({
      actionType: "PHOTO_GROUP_CHANGE",
      gid: gid
    })
  }
  // group action start
  groupAddCancel() {
    this.dispatcher.dispatch({
      actionType: "GROUP_ADD_CANCEL"
    })
  }
  groupAddConfirm(groupname) {
    this.dispatcher.dispatch({
      actionType: "GROUP_ADD_CONFIRM",
      gname: groupname
    })
  }
  groupOpeImgStateToggle() {
    this.dispatcher.dispatch({
      actionType: "GROUP_OPE_IMG_STATE_TOGGLE"
    })
  }
  groupShowAddDialog() {
    this.dispatcher.dispatch({
      actionType: "GROUP_SHOW_ADD_DIALOG"
    })
  }
  // group action end

  // group item action start
  groupItemHideDeleteDialog(gid) {
    this.dispatcher.dispatch({
      actionType: "GROUP_ITEM_HIDE_DELETE",
      gid: gid
    })
  }
  groupItemShowDeleteDialog(gid) {
    this.dispatcher.dispatch({
      actionType: "GROUP_ITEM_SHOW_DELETE",
      gid: gid
    })
  }
  groupItemHideInputDialog(gid) {
    this.dispatcher.dispatch({
      actionType: "GROUP_ITEM_HIDE_INPUT",
      gid: gid
    })
  }
  groupItemShowInputDialog(gid) {
    this.dispatcher.dispatch({
      actionType: "GROUP_ITEM_SHOW_INPUT",
      gid: gid
    })
  }
  groupItemClick(gid) {
    this.dispatcher.dispatch({
      actionType: "GROUP_ITEM_CLICK",
      gid: gid
    })
  }
  groupItemDelete(gid) {
    this.dispatcher.dispatch({
      actionType: "GROUP_ITEM_DELETE",
      gid: gid
    })
  }
  groupItemRename(gid, newname) {
    this.dispatcher.dispatch({
      actionType: "GROUP_ITEM_RENAME",
      gid: gid,
      newname: newname
    })
  }
  // group item action end
  // photo flow action start
  fetchGroupPhotos() {
    this.dispatcher.dispatch({
      actionType: "FETCH_GROUP_PHOTOS"
    })
  }
  fetchSinglePhoto(id) {
    this.dispatcher.dispatch({
      actionType: "FETCH_SINGLE_PHOTO",
      id: id
    })
  }
  photoCheckStateChange(id, checked) {
    this.dispatcher.dispatch({
      actionType: "PHOTO_CHECK_STATE_CHANGE",
      id: id,
      checked: checked
    })
  }
  photoCheckStateChangeAll(checked) {
    this.dispatcher.dispatch({
      actionType: "PHOTO_CHECK_STATE_CHANGE_ALL",
      checked: checked
    })
  }
  photoMoveGroup(ids, newgid) {
    this.dispatcher.dispatch({
      actionType: "PHOTO_MOVE_GROUP",
      ids: ids,
      newgid: newgid
    })
  }
  photoMoveSingle(id, newgid) {
    this.dispatcher.dispatch({
      actionType: "PHOTO_MOVE_GROUP_SINGLE",
      id: id,
      newgid: newgid
    })
  }
  photoMoveByGroup(newgid) {
    this.dispatcher.dispatch({
      actionType: "PHOTO_MOVE_BY_GROUP",
      newgid: newgid
    })
  }
  photoDeleteDialogVisible(id, visible) {
    this.dispatcher.dispatch({
      actionType: "PHOTO_DELETE_DIALOG_VISIBLE",
      id: id,
      visible: visible
    })
  }
  photoInputDialogVisible(id, visible) {
    this.dispatcher.dispatch({
      actionType: "PHOTO_INPUT_DIALOG_VISIBLE",
      id: id,
      visible: visible
    })
  }
  photoMoveDialogVisible(id, visible) {
    this.dispatcher.dispatch({
      actionType: "PHOTO_MOVE_DIALOG_VISIBLE",
      id: id,
      visible: visible
    })
  }
  photoUpload(file) {
    this.dispatcher.dispatch({
      actionType: "PHOTO_UPLOAD",
      file: file
    })
  }
  // photo flow action end
  // photo item action start
  photoDeleteSingle(id) {
    this.dispatcher.dispatch({
      actionType: "PHOTO_DELETE_SINGLE",
      id: id
    })
  }
  photoDeleteByGroup() {
    this.dispatcher.dispatch({
      actionType: "PHOTO_DELETE_BY_GROUP"
    })
  }
  photoRename(id, newname) {
    this.dispatcher.dispatch({
      actionType: "PHOTO_RENAME",
      id: id,
      newname: newname
    })
  }
  // photo item action end
  pfobDeleteDialogVisible(visible) {
    this.dispatcher.dispatch({
      actionType: "PFOB_DELETE_DIALOG_VISIBLE",
      visible: visible
    })
  }
  pfobMoveDialogVisible(visible) {
    this.dispatcher.dispatch({
      actionType: "PFOB_MOVE_DIALOG_VISIBLE",
      visible: visible
    })
  }
  refetch() {
    this.dispatcher.dispatch({
      actionType: "REFETCH"
    })
  }
};

module.exports = PhotoActions;