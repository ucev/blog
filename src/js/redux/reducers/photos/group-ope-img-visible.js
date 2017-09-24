import { PHOTOS } from '../../action-types'

const groupOpeImgVisible = (state = false, action) => {
  switch (action.type) {
  case PHOTOS.GROUP_OPE_IMG_STATE_TOGGLE:
    return !state
  default:
    return state
  }
}

export default groupOpeImgVisible
