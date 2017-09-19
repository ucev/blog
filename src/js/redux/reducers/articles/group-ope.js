import { ARTICLES } from '../../action-types'

const groupOpe = (state = -1, action) => {
  switch(action.type) {
    case ARTICLES.CHECK_STATE_CHANGE:
    case ARTICLES.GROUP_OPERATION_CHANGE:
      return action.groupOpe
    default:
      return state
  }
}

export default groupOpe
