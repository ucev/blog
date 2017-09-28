import { ARTICLE_EDIT } from '$redux/action-types'

const urlVisible = (state = false, action) => {
  switch (action.type) {
  case ARTICLE_EDIT.URL_VISIBLE_STATE:
    return action.visible
  default:
    return state
  }
}

export default urlVisible
