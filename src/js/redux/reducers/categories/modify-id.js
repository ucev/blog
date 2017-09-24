import { CATEGORIES } from '../../action-types'

const modifyId = (state = -1, action) => {
  switch (action.type) {
  case CATEGORIES.ADD_CATEGORY_DIV_STATE_CHANGE:
    return action.modifyId
  default:
    return state
  }
}

export default modifyId
