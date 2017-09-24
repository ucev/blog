import { PHOTOS } from '../../action-types'

const pfobMoveVisible = (state = false, action) => {
  switch (action.type) {
  case PHOTOS.PFOB_MOVE_DIALOG_VISIBLE:
    return action.visible
  default:
    return state
  }
}

export default pfobMoveVisible
