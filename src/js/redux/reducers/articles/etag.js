import { ARTICLES } from '$redux/action-types'

const etag = (state = 0, action) => {
  switch (action.type) {
    case ARTICLES.FETCH_ARTICLES:
      return action.etag
    default:
      return state
  }
}

export default etag
