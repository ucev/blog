import { PHOTOS } from '../../action-types'

const groupAddVisible = (state = false, action) => {
  switch (action.type) {
  case PHOTOS.GROUP_ADD_CANCEL:
  case PHOTOS.GROUP_ADD_CONFIRM:
    return false
  case PHOTOS.GROUP_SHOW_ADD_DIALOG:
    return true
  default:
    return state
  }
}

export default groupAddVisible
