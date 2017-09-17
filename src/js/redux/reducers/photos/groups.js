import { PHOTOS } from '../../action-types'

const groups = (state = [], action) => {
  switch (action.type) {
    case PHOTOS.FETCH_PHOTO_GROUPS:
      return action.groups
    case PHOTOS.GROUP_ITEM_HIDE_DELETE:
      var g = [...state]
      for (var _g of g) {
        if (_g.id === action.gid) {
          _g.delVisible = false
          break
        }
      }
      return g
    case PHOTOS.GROUP_ITEM_SHOW_DELETE:
      var g = [...state]
      for (var _g of g) {
        if (_g.id === action.gid) {
          _g.delVisible = true
          break
        }
      }
      return g
    case PHOTOS.GROUP_ITEM_HIDE_INPUT:
      var g = [...state]
      for (var _g of g) {
        if (_g.id === action.id) {
          _g.inputVisible = false
          break
        }
      }
      return g
    case PHOTOS.GROUP_ITEM_SHOW_INPUT:
      var g = [...state]
      for (var _g of g) {
        if (_g.id === action.id) {
          _g.inputVisible = true
          break
        }
      }
      return g
    default:
      return state
  }
}

export default groups
