import { CATEGORY_REFACT } from '../../action-types'

//categoryExpandState
const cstate = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_REFACT.CATEGORY_EXPAND_CHANGE:
      var cs = Object.assign({}, cstate)
      cs[action.id] = cs[action.id] === false
      return cs
    default:
      return state
  }
}

export default cstate
