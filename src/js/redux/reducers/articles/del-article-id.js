import { ARTICLES } from '../../action-types'

const delArticleId = (state = -1, action) => {
  switch (action.type) {
  case ARTICLES.DELETE_ARTICLE_STATE:
    return action.delArticleId !== undefined ? action.delArticleId : state
  default:
    return state
  }
}

export default delArticleId
