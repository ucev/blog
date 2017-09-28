import { ARTICLE_EDIT } from '$redux/action-types'

const photoVisible = (state = false, action) => {
  switch (action.type) {
  case ARTICLE_EDIT.PHOTO_VISIBLE_STATE:
    return action.visible
  default:
    return state
  }
}

export default photoVisible
