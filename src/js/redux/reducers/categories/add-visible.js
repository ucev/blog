import { CATEGORIES } from '$redux/action-types'

const addVisible = (state = false, action) => {
  switch (action.type) {
    case CATEGORIES.ADD_CATEGORY_DIV_STATE_CHANGE:
      return action.addVisible
    default:
      return state
  }
}

export default addVisible
