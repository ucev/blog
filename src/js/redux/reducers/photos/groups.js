import { PHOTOS } from '$redux/action-types'

const groups = (state = [], action) => {
  var gs, i
  switch (action.type) {
    case PHOTOS.FETCH_PHOTO_GROUPS:
      return action.groups
    case PHOTOS.GROUP_ITEM_DELETE_STATE:
      gs = state.slice()
      for (i in gs) {
        if (gs[i].id == action.gid) {
          gs[i].delVisible = action.visible
          break
        }
      }
      return gs
    case PHOTOS.GROUP_ITEM_INPUT_STATE:
      gs = state.slice()
      for (i in gs) {
        if (gs[i].id == action.gid) {
          gs[i].inputVisible = action.visible
          break
        }
      }
      return gs
    default:
      return state
  }
}

export default groups
