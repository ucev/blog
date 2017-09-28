import { ARTICLE_EDIT } from '$redux/action-types'

const type = (state = {type: 'add'}, action) => {
  switch (action.type) {
  case ARTICLE_EDIT.INIT:
    return action.data
  default:
    return state
  }
}

export default type
