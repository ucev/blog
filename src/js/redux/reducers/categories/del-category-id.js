import { CATEGORIES } from '../../action-types'

const delCategoryId = (state = -1, action) => {
  switch (action) {
    case CATEGORIES.DELETE_CATEGORY_STATE:
      return action.delCategoryId !== undefined ? action.delCategoryId : state
    default:
      return state
  }
}

export default delCategoryId
