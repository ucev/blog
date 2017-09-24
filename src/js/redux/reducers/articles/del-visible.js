import { ARTICLES } from '$redux/action-types'

const delVisible = (state = false, action) => {
  switch (action.type) {
  case ARTICLES.DELETE_ARTICLE_STATE:
    return action.delVisible !== undefined ? action.delVisible : state
  default:
    return state
  }
}

export default delVisible
