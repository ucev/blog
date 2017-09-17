import { CATEGORY_REFACT } from '../../action-types'

const category = (state = -1, action) => {
  switch (action.type) {
    case CATEGORY_REFACT.GET_REFACT_DETAIL:
      return action.category
    default:
      return state
  }
}

export default category
