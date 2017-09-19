import { ARTICLES } from '../../action-types'

const etag = (state = 0, action) => {
  switch (action.type) {
    case ARTICLES.ETAG_CHANGE:
      return action.etag
    default:
      return state
  }
}

export default etag
