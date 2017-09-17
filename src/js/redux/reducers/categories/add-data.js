import { CATEGORIES } from '../../action-types'

const addData = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIES.ADD_CATEGORY_DIV_STATE_CHANGE:
      return action.addData
    case CATEGORIES.ADD_CATEGORY_VALUE_CHANGE:
      return action.addData
    default:
      return state
  }
}

export default addData
