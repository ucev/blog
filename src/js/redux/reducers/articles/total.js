import { ARTICLES } from '$redux/action-types'

const total = (state = 0, action) => {
  switch (action.type) {
  case ARTICLES.FETCH_ARTICLES:
    return action.total
  default:
    return state
  }
}

export default total
