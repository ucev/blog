import { CATEGORIES } from '../../action-types'

const delCategoryId = (state = -1, action) => {
  switch (action.type) {
  case CATEGORIES.DELETE_CATEGORY_STATE:
    return action.delCategoryId
  default:
    return state
  }
}

export default delCategoryId
