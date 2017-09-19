import { PHOTOS } from '../../action-types'
import { urlEncode } from '../../utils'

export const fetchPhotoGroups = () => {
  return (dispatch, getState) => {
    var url = '/admin/datas/photogroup/get'
    return fetch(url, {credentials: 'include'}).then(res => res.json())
             .then(res => {
               if (res.code !== 0) return
               var groups = res.data
               groups.forEach(group => {
                 group.inputVisible = false
                 group.delVisible = false
               })
               dispatch({
                 type: PHOTOS.FETCH_PHOTO_GROUPS,
                 groups: groups
               })
             })
  }
}

export const photoGroupChange = (gid) => {
  //this.setState({gid: gid, key: Date.now()});
  return (dispatch, getState) => {
    dispatch({
      type: PHOTOS.PHOTO_GROUP_CHANGE,
      gid: gid
    })
    dispatch(fetchGroupPhotos())
  }
}

// group stores start
export const groupAddCancel = () => ({
  type: PHOTOS.GROUP_ADD_CANCEL
})

export const groupAddConfirm = (groupname) => {
  return (dispatch, getState) => {
    dispatch({
      type: PHOTOS.GROUP_ADD_CONFIRM,
    })
    var params = {
      groupname: groupname
    }
    var url = '/admin/datas/photogroup/modify?' + urlEncode(params)
    return fetch(url, { credentials: 'include' }).then(res => res.json())
             .then(res => {
               if (res.code !== 0) return
               dispatch(fetchPhotoGroups())
             }).catch(err => {
               console.log(err)
             })
  }
}

export const groupOpeImgStateToggle = () => ({
  type: PHOTOS.GROUP_OPE_IMG_STATE_TOGGLE
})

export const groupShowAddDialog = () => ({
  type: PHOTOS.GROUP_SHOW_ADD_DIALOG
})
// group stores end

// group item stores start
export const groupItemHideDeleteDialog = (gid) => ({
  type: PHOTOS.GROUP_ITEM_HIDE_DELETE,
  gid: gid
})

export const groupItemShowDeleteDialog = (gid) => ({
  type: PHOTOS.GROUP_ITEM_SHOW_DELETE,
  gid: gid
})

export const groupItemDeleteState = (gid, visible) => ({
  type: PHOTOS.GROUP_ITEM_DELETE_STATE,
  gid: gid,
  visible: visible
})

export const groupItemInputState = (gid, visible) => ({
  type: PHOTOS.GROUP_ITEM_INPUT_STATE,
  gid: gid,
  visible: visible
})

export const groupItemClick = (gid) => {
  return photoGroupChange(gid)
}

export const groupItemDelete = (gid) => {
  return (dispatch, getState) => {
    var params = {
      gid: gid
    }
    var url = '/admin/datas/photogroup/remove?' + urlEncode(params)
    return fetch(url, {credentials: 'include'}).then(res => res.json())
             .then(res => {
               if (res.code !== 0) return
               var state = getState()
               if (gid === state.gid) {
                 return dispatch(photoGroupChange(-1))
               } else {
                 return dispatch(fetchPhotoGroups())
               }
             }).catch(err => {
               console.log(err)
             })
  }
}

export const groupItemRename = (gid, newname) => {
  return (dispatch, getState) => {
    var fd = new FormData()
    fd.append('gid', gid)
    fd.append('name', newname)
    var url = '/admin/datas/photogroup/rename'
    return fetch(url, {
              credentials: 'include',
              method: 'POST',
              body: fd
            }).then(res => res.json())
             .then(res => {
               if (res.code !== 0) return
               dispatch(fetchPhotoGroups())
             }).catch(err => {
               console.log(err)
             })
  }
}
// group item stores end
// photo flow stores start
/**
 * 这里在 photo flow 中添加、移动、删除时不能更新
 */
export const fetchGroupPhotos = () => {
  return (dispatch, getState) => {
    var state = getState()
    var params = {
      gid: state.gid
    }
    var url = '/admin/datas/photos/get?' + urlEncode(params)
    return fetch(url, {credentials: 'include'}).then(res => res.json())
            .then(res => {
              if (res.code !== 0) return
              var photos = res.data
              photos.forEach((photo) => {
                photo.checked = false
                photo.delVisible = false
                photo.inputVisible = false
                photo.moveVisible = false
              })
              dispatch({
                type: PHOTOS.FETCH_GROUP_PHOTOS,
                photos: photos
              })
            }).catch(err => {
              console.log(err)
            })
  }
}

export const fetchSinglePhoto = (id) => {
  return (dispatch, getState) => {
    var params = {
      id: id
    }
    var url = '/admin/datas/photos/get?' + urlEncode(params)
    return fetch(url, {credentials: 'include'}).then(res => res.json())
             .then(res => {
               if (res.code !== 0) return
               dispatch({
                 type: PHOTOS.FETCH_SINGLE_PHOTO,
                 photo: res.data[0]
               })
             })
  }
}

export const photoCheckStateChange = (id, checked) => ({
  type: PHOTOS.PHOTO_CHECK_STATE_CHANGE,
  id: Number(id),
  checked: checked
})

export const photoCheckStateChangeAll = (checked) => ({
  type: PHOTOS.PHOTO_CHECK_STATE_CHANGE_ALL,
  checked: checked
})

export const photoMoveGroup = (ids, newgid) => {
  return (dispatch, getState) => {
    var params = {
      photos: ids,
      gid: newgid
    }
    var url = '/admin/datas/photos/move?' + urlEncode(params)
    return fetch(url, { credentials: 'include' }).then(res => res.json())
             .then(res => {
               if (res.code !== 0) return
               dispatch(fetchPhotoGroups())
               dispatch(fetchGroupPhotos())
             }).catch(err => {
               console.log(err)
             })
  }
}

// 上传图片
export const photoUpload = (file) => {
  return (dispatch, getState) => {
    var state = getState()
    var fd = new FormData()
    fd.append('file', file)
    fd.append('gid', state.gid)
    var url = '/admin/datas/photos/add'
    return fetch(url, {
               credentials: 'include',
               method: 'post',
               body: fd
             }).then(res => res.json())
             .then(res => {
               if (res.code !== 0) return
               dispatch(fetchPhotoGroups())
               dispatch(fetchGroupPhotos())
             }).catch(err => {
               console.log(err)
             })
  }
}
// photo flow stores end
// photo item stores start
function __deletePhotos(ids) {
  return (dispatch, getState) => {
    var params = {
      photos: ids
    }
    var url = '/admin/datas/photos/delete?' + urlEncode(params)
    return fetch(url, { credentials: 'include' }).then(res => res.json())
             .then(res => {
               if (res.code !== 0) return
               dispatch(fetchPhotoGroups())
               dispatch(fetchGroupPhotos())
             }).catch(err => {
               console.log(err)
             })
  }
}

export const photoDeleteSingle = (id) => {
  return (dispatch, getState) => {
    dispatch(__deletePhotos([id].join(',')))
  }
}

export const photoDeleteByGroup = () => {
  return (dispatch, getState) => {
    var photos = getState().photos
    var ids = photos.filter(photo => photo.checked).map(photo => photo.id)
    dispatch(__deletePhotos(ids.join(',')))
  }
}

export const photoMoveSingle = (id, newgid) => {
  return (dispatch, getState) => {
    dispatch(photoMoveGroup([id].join(','), newgid))
  }
}

export const photoMoveByGroup = (newgid) => {
  return (dispatch, getState) => {
    var photos = getState().photos
    var ids = photos.filter(photo => photo.checked).map(photo => photo.id)
    dispatch(photoMoveGroup(ids.join(','), newgid))
  }
}

export const photoDeleteDialogVisible = (id, visible) => ({
  type: PHOTOS.PHOTO_DELETE_DIALOG_VISIBLE,
  id: id,
  visible: visible
})

export const photoInputDialogVisible = (id, visible) => ({
  type: PHOTOS.PHOTO_INPUT_DIALOG_VISIBLE,
  id: id,
  visible: visible
})

export const photoMoveDialogVisible = (id, visible) => ({
  type: PHOTOS.PHOTO_MOVE_DIALOG_VISIBLE,
  id: id,
  visible: visible
})

export const photoRename = (id, name) => {
  return (dispatch, getState) => {
    var params = {
      id: id,
      title: name
    }
    var url = '/admin/datas/photos/rename?' + urlEncode(params)
    return fetch(url, { credentials: 'include' }).then(res => res.json())
             .then(res => {
               if (res.code !== 0) return
               dispatch(fetchSinglePhoto(id))
             }).catch(err => {
               console.log(err)
             })
  }
}
// photo item stores end
export const pfobDeleteDialogVisible = (visible) => ({
  type: PHOTOS.PFOB_DELETE_DIALOG_VISIBLE,
  visible: visible
})

export const pfobMoveDialogVisible = (visible) => ({
  type: PHOTOS.PFOB_MOVE_DIALOG_VISIBLE,
  visible: visible
})
