import { ARTICLE_EDIT } from '$redux/action-types'

const photoGroups = (state = [], action) => {
  switch (action.type) {
  case ARTICLE_EDIT.PHOTO_GROUPS:
    return action.groups.slice()
  default:
    return state
  }
}

export default photoGroups
