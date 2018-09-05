import { PHOTOS } from '$redux/action-types'

const gid = (state = -1, action) => {
  switch (action.type) {
    case PHOTOS.PHOTO_GROUP_CHANGE:
      return action.gid
    default:
      return state
  }
}

export default gid
