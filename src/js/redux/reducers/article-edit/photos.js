import { ARTICLE_EDIT } from '$redux/action-types'

const photos = (state = [], action) => {
  switch (action.type) {
  case ARTICLE_EDIT.PHOTOS:
    return action.photos.slice()
  default:
    return state
  }
}

export default photos
