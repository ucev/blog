import { ARTICLE_EDIT } from '$redux/action-types'

const labelExist = (state = [], action) => {
  switch (action.type) {
  case ARTICLE_EDIT.LABEL_EXIST:
    return action.labels
  default:
    return state
  }
}

export default labelExist
