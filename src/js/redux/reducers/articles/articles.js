import { ARTICLES } from '../../action-types'

const articles = (state = [], action) => {
  switch (action.type) {
  case ARTICLES.FETCH_ARTICLES:
    return action.articles
  case ARTICLES.FETCH_SINGLE_ARTICLE:
    var as = [...state]
    for (let i in as) {
      if (as[i].id === action.id) {
        as[i] = action.article
        break
      }
    }
    return as
  default:
    return state
  }
}

export default articles
