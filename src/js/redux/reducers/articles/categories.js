import { ARTICLES } from '../../action-types'

const categories = (state = [], action) => {
  switch (action.type) {
    case ARTICLES.FETCH_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

export default categories
