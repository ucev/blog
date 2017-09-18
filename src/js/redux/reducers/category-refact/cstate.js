import { CATEGORY_REFACT } from '../../action-types'

//categoryExpandState
const cstate = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_REFACT.CATEGORY_EXPAND_CHANGE:
      console.log("HERE")
      var cs = Object.assign({}, state)
      cs[action.id] = !cs[action.id]
      console.log(`state changed: ${action.id} ${cs[action.id]}`)
      return cs
    default:
      return state
  } 
}

export default cstate
