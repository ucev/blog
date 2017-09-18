import { CATEGORY_REFACT } from '../../action-types'

const article = (state = -1, action) => {
  switch (action.type) {
    case CATEGORY_REFACT.GET_REFACT_DETAIL:
      return action.article !== undefined ? action.article : state
    default:
      return state
  }
}

export default article
