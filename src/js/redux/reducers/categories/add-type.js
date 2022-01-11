import { CATEGORIES } from '$redux/action-types'

const addType = (state = 'add', action) => {
  switch (action.type) {
    case CATEGORIES.ADD_CATEGORY_DIV_STATE_CHANGE:
      return action.addType
    default:
      return state
  }
}

export default addType
