import { CATEGORY_REFACT } from '$redux/action-types'

const tree = (state = [], action) => {
  switch (action.type) {
    case CATEGORY_REFACT.GET_CATEGORY_TREE:
      return action.tree
    default:
      return state
  }
}

export default tree
