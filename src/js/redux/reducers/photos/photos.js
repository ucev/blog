import { PHOTOS } from '../../action-types'

const photos = (state = [], action) => {
  switch (action.type) {
    case PHOTOS.FETCH_GROUP_PHOTOS:
      return action.photos
    case PHOTOS.FETCH_SINGLE_PHOTO:
      var ps = [...state]
      var p = action.photo
      for (var i in ps) {
        if (ps[i].id === p.id) {
          Object.assign(p, {
            checked: ps[i].checked,
            delVisible: false,
            inputVisible: false,
            moveVisible: false
          })
          ps[i] = p
          break
        }
      }
      return ps
    case PHOTOS.PHOTO_CHECK_STATE_CHANGE:
      var ps = [...state]
      for (var p in ps) {
        if (p.id === action.id) {
          p.checked = action.checked
          break
        }
      }
      return ps
    case PHOTOS.PHOTO_CHECK_STATE_CHANGE_ALL:
      var ps = [...state]
      ps.forEach(p => p.checked = action.checked)
      return ps
    case PHOTOS.PHOTO_DELETE_DIALOG_VISIBLE:
      var ps = [...state]
      for (var p of ps) {
        if (p.id === action.id) {
          p.delVisible = action.visible
          break
        }
      }
      return ps
    case PHOTOS.PHOTO_INPUT_DIALOG_VISIBLE:
      var ps = [...state]
      for (var p of ps) {
        if (p.id === action.id) {
          p.inputVisible = action.visible
          break
        }
      }
      return ps
    case PHOTOS.PHOTO_MOVE_DIALOG_VISIBLE:
      var ps = [...state]
      for (var p of ps) {
        if (p.id === action.id) {
          p.moveVisible = action.visible
          break
        }
      }
      return ps
    default:
      return state
  }
}

export default photos
