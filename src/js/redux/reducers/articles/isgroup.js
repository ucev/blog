import { ARTICLES } from '../../action-types'

const isgroup = (state = false, action) => {
  switch (action.type) {
    case ARTICLES.MOVE_CATEGORY_STATE:
    case ARTICLES.DELETE_ARTICLE_STATE:
      return action.isgroup !== undefined ? action.isgroup : state
    default:
      return state
  }
}

export default isgroup
