import { ARTICLES } from '$redux/action-types'

const current = (state = 0, action) => {
  switch (action.type) {
  case ARTICLES.FETCH_ARTICLES:
    return action.current
  default:
    return state
  }
}

export default current
