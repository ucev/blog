import { CATEGORY_REFACT } from '$redux/action-types'

const detail = (state = {}, action) => {
  switch (action.type) {
  case CATEGORY_REFACT.ARTICLE_ORDER_CHANGE:
  case CATEGORY_REFACT.GET_REFACT_DETAIL:
    return action.detail
  default:
    return state
  }
}

export default detail
