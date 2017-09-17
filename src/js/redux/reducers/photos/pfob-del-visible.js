import { PHOTOS } from '../../action-types'

const pfobDelVisible = (state = false, action) => {
  switch (action.type) {
    case PHOTOS.PFOB_DELETE_DIALOG_VISIBLE:
      return action.visible
    default:
      return state
  }
}

export default pfobDelVisible
