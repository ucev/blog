import { PHOTOS } from '../../action-types'

const groups = (state = [], action) => {
  switch (action.type) {
    case PHOTOS.FETCH_PHOTO_GROUPS:
      return action.groups
    case PHOTOS.GROUP_ITEM_DELETE_STATE:
       var gs1 = state.slice()
       for (var i in gs1) {
         if (gs1[i].id == action.gid) {
           gs1[i].delVisible = action.visible
           break
         }
       }
       return gs1
    case PHOTOS.GROUP_ITEM_INPUT_STATE:
      var gs2 = state.slice()
      for (var i in gs2) {
        if (gs2[i].id == action.gid) {
          gs2[i].inputVisible = action.visible
          break
        }
      }
      return gs2
    default:
      return state
  }
}

export default groups
