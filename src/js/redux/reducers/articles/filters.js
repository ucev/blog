import { ARTICLES } from '../../action-types'

const filters = (state = {}, action) => {
  switch (action.type) {
    case ARTICLES.FILTER_OPTION_CHANGE:
      var s = Object.assign({}, state)
      s[action.label] = action.value
      return s
    default:
      return state
  }
}

export default filters
