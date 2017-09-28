import { ARTICLE_EDIT } from '$redux/action-types'

// 这个方法不完美，还得修改
const labelTyping = (state = '', action) => {
  switch (action.type) {
  case ARTICLE_EDIT.LABEL_TYPING:
    return action.label
  default:
    return state
  }
}

export default labelTyping
