const AppDispatcher = require('./dispatcher_app');
const PhotoStore = require('../stores/stores_photos');

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case "FETCH_PHOTO_GROUPS":
      PhotoStore.fetchPhotoGroups();
      break;
    case "PHOTO_GROUP_CHANGE":
      PhotoStore.photoGroupChange(action.gid);
      break;
    // group dispatcher start
    case "GROUP_ADD_CANCEL":
      PhotoStore.groupAddCancel();
      break;
    case "GROUP_ADD_CONFIRM":
      PhotoStore.groupAddConfirm(action.gname);
      break;
    case "GROUP_OPE_IMG_STATE_TOGGLE":
      PhotoStore.groupOpeImgStateToggle();
      break;
    case "GROUP_SHOW_ADD_DIALOG":
      PhotoStore.groupShowAddDialog();
      break;
    // group dispatcher end
    // group item dispatcher start
    case "GROUP_ITEM_HIDE_DELETE":
      PhotoStore.groupItemHideDeleteDialog(action.gid);
      break;
    case "GROUP_ITEM_SHOW_DELETE":
      PhotoStore.groupItemShowDeleteDialog(action.gid);
      break;
    case "GROUP_ITEM_HIDE_INPUT":
      PhotoStore.groupItemHideInputDialog(action.gid);
      break;
    case "GROUP_ITEM_SHOW_INPUT":
      PhotoStore.groupItemShowInputDialog(action.gid);
      break;
    case "GROUP_ITEM_CLICK":
      PhotoStore.groupItemClick(action.gid);
      break;
    case "GROUP_ITEM_DELETE":
      PhotoStore.groupItemDelete(action.gid);
      break;
    case "GROUP_ITEM_RENAME":
      PhotoStore.groupItemRename(action.gid, action.newname);
      break;
    // group item dispatcher end
    // photo flow dispatcher start
    case "FETCH_GROUP_PHOTOS":
      PhotoStore.fetchGroupPhotos();
      break;
    case "FETCH_SINGLE_PHOTO":
      PhotoStore.fetchSinglePhoto(action.id);
      break;
    case "PHOTO_CHECK_STATE_CHANGE":
      PhotoStore.photoCheckStateChange(action.id, action.checked);
      break;
    case "PHOTO_CHECK_STATE_CHANGE_ALL":
      PhotoStore.photoCheckStateChangeAll(action.checked);
      break;
    case "PHOTO_MOVE_GROUP":
      PhotoStore.photoMoveGroup(action.ids, action.newgid);
      break;
    case "PHOTO_MOVE_GROUP_SINGLE":
      PhotoStore.photoMoveSingle(action.id, action.newgid);
      break;
    case "PHOTO_MOVE_BY_GROUP":
      PhotoStore.photoMoveByGroup(action.newgid);
      break;
    case "PHOTO_DELETE_DIALOG_VISIBLE":
      PhotoStore.photoDeleteDialogVisible(action.id, action.visible);
      break;
    case "PHOTO_INPUT_DIALOG_VISIBLE":
      PhotoStore.photoInputDialogVisible(action.id, action.visible);
      break;
    case "PHOTO_MOVE_DIALOG_VISIBLE":
      PhotoStore.photoMoveDialogVisible(action.id, action.visible);
      break;
    case "PHOTO_UPLOAD":
      PhotoStore.photoUpload(action.file);
      break;
    // photo flow dispatcher end
    // photo item dispatcher start
    case "PHOTO_DELETE_SINGLE":
      PhotoStore.photoDeleteSingle(action.id);
      break;
    case "PHOTO_DELETE_BY_GROUP":
      PhotoStore.photoDeleteByGroup();
      break;
    case "PHOTO_RENAME":
      PhotoStore.photoRename(action.id, action.newname);
      break;
    // photo item dispatcher end
    case "PFOB_DELETE_DIALOG_VISIBLE":
      PhotoStore.pfobDeleteDialogVisible(action.visible);
      break;
    case "PFOB_MOVE_DIALOG_VISIBLE":
      PhotoStore.pfobMoveDialogVisible(action.visible);
      break;
    case "REFETCH":
      PhotoStore.refetch();
      break;
    default:
      break;
  }
})

module.exports = AppDispatcher;