import { ARTICLES } from '../../action-types'

const moveVisible = (state = false, action) => {
  switch (action.type) {
  case ARTICLES.MOVE_CATEGORY_STATE:
    return action.moveVisible !== undefined ? action.moveVisible : state
  default:
    return state
  }
}

export default moveVisible
