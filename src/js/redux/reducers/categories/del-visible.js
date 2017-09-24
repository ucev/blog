import { CATEGORIES } from '$redux/action-types'

const delVisible = (state = false, action) => {
  switch (action.type) {
  case CATEGORIES.DELETE_CATEGORY_STATE:
    return action.delVisible !== undefined ? action.delVisible : state
  default:
    return state
  }
}

export default delVisible
