import { ARTICLES } from '../../action-types'

const moveArticleId = (state = -1, action) => {
  switch (action.type) {
    case ARTICLES.MOVE_CATEGORY_STATE:
      return action.moveArticleId !== undefined ? action.moveArticleId : state
    default:
      return state
  }
}

export default moveArticleId
