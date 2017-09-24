import { ARTICLES } from '../../action-types'

const checkState = (state = {}, action) => {
  switch (action.type) {
  case ARTICLES.FETCH_ARTICLES:
    return action.checkState
  case ARTICLES.CHECK_STATE_CHANGE:
    var ids = action.id instanceof Array ? action.id : [action.id]
    var s = Object.assign({}, state)
    ids.forEach((id) => {
      s[id] = action.checked
    })
    return s
  default:
    return state
  }
}

export default checkState
