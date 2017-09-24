import { ARTICLES } from '../../action-types'

const start = (state = 0, action) => {
  switch (action.type) {
  case ARTICLES.FETCH_ARTICLES:
    return action.start || state
  default:
    return state
  }
}

export default start
