function photo_dispatcher(store) {
  return function (action) {
    switch (action.actionType) {
      case "FETCH_PHOTO_GROUPS":
        store.fetchPhotoGroups();
        break;
      case "PHOTO_GROUP_CHANGE":
        store.photoGroupChange(action.gid);
        break;
        // group dispatcher start
      case "GROUP_ADD_CANCEL":
        store.groupAddCancel();
        break;
      case "GROUP_ADD_CONFIRM":
        store.groupAddConfirm(action.gname);
        break;
      case "GROUP_OPE_IMG_STATE_TOGGLE":
        store.groupOpeImgStateToggle();
        break;
      case "GROUP_SHOW_ADD_DIALOG":
        store.groupShowAddDialog();
        break;
        // group dispatcher end
        // group item dispatcher start
      case "GROUP_ITEM_HIDE_DELETE":
        store.groupItemHideDeleteDialog(action.gid);
        break;
      case "GROUP_ITEM_SHOW_DELETE":
        store.groupItemShowDeleteDialog(action.gid);
        break;
      case "GROUP_ITEM_HIDE_INPUT":
        store.groupItemHideInputDialog(action.gid);
        break;
      case "GROUP_ITEM_SHOW_INPUT":
        store.groupItemShowInputDialog(action.gid);
        break;
      case "GROUP_ITEM_CLICK":
        store.groupItemClick(action.gid);
        break;
      case "GROUP_ITEM_DELETE":
        store.groupItemDelete(action.gid);
        break;
      case "GROUP_ITEM_RENAME":
        store.groupItemRename(action.gid, action.newname);
        break;
        // group item dispatcher end
        // photo flow dispatcher start
      case "FETCH_GROUP_PHOTOS":
        store.fetchGroupPhotos();
        break;
      case "FETCH_SINGLE_PHOTO":
        store.fetchSinglePhoto(action.id);
        break;
      case "PHOTO_CHECK_STATE_CHANGE":
        store.photoCheckStateChange(action.id, action.checked);
        break;
      case "PHOTO_CHECK_STATE_CHANGE_ALL":
        store.photoCheckStateChangeAll(action.checked);
        break;
      case "PHOTO_MOVE_GROUP":
        store.photoMoveGroup(action.ids, action.newgid);
        break;
      case "PHOTO_MOVE_GROUP_SINGLE":
        store.photoMoveSingle(action.id, action.newgid);
        break;
      case "PHOTO_MOVE_BY_GROUP":
        store.photoMoveByGroup(action.newgid);
        break;
      case "PHOTO_DELETE_DIALOG_VISIBLE":
        store.photoDeleteDialogVisible(action.id, action.visible);
        break;
      case "PHOTO_INPUT_DIALOG_VISIBLE":
        store.photoInputDialogVisible(action.id, action.visible);
        break;
      case "PHOTO_MOVE_DIALOG_VISIBLE":
        store.photoMoveDialogVisible(action.id, action.visible);
        break;
      case "PHOTO_UPLOAD":
        store.photoUpload(action.file);
        break;
        // photo flow dispatcher end
        // photo item dispatcher start
      case "PHOTO_DELETE_SINGLE":
        store.photoDeleteSingle(action.id);
        break;
      case "PHOTO_DELETE_BY_GROUP":
        store.photoDeleteByGroup();
        break;
      case "PHOTO_RENAME":
        store.photoRename(action.id, action.newname);
        break;
        // photo item dispatcher end
      case "PFOB_DELETE_DIALOG_VISIBLE":
        store.pfobDeleteDialogVisible(action.visible);
        break;
      case "PFOB_MOVE_DIALOG_VISIBLE":
        store.pfobMoveDialogVisible(action.visible);
        break;
      case "REFETCH":
        store.refetch();
        break;
      default:
        break;
    }
  }
}

module.exports = photo_dispatcher;