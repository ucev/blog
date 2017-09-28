import { ARTICLE_EDIT } from '$redux/action-types'

const labelCurrent = (state = [], action) => {
  var labels
  var i
  switch (action.type) {
    case ARTICLE_EDIT.ADD_LABEL:
      labels = state.slice()
      labels = labels.concat(action.label)
      return Array.from(new Set(labels))
    case ARTICLE_EDIT.DELETE_LABEL:
      labels = state.slice()
      i = labels.indexOf(action.label)
      labels.splice(i, 1)
      return labels
    default:
      return state
  }
}

export default labelCurrent
