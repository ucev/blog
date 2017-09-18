import { CATEGORIES } from '../../action-types'

const addData = (state = {}, action) => {
  switch (action.type) {
    case CATEGORIES.ADD_CATEGORY_DIV_STATE_CHANGE:
      return Object.assign({}, action.addData)
    case CATEGORIES.ADD_CATEGORY_VALUE_CHANGE:
      return Object.assign({}, action.addData)
    default:
      return state
  }
}

export default addData
