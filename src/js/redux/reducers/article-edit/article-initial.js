import { ARTICLE_EDIT } from '$redux/action-types'

const article = (state = '', action) => {
  switch (action.type) {
  case ARTICLE_EDIT.ARTICLE_INITIAL:
    return action.article
  default:
    return state
  }
}

export default article
