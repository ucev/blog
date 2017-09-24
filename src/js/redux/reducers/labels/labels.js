import { LABELS } from '$redux/action-types'

const labels = (state = [], action) => {
  switch (action.type) {
  case LABELS.FETCH_LABEL_DATA:
    return action.labels
  default:
    return state
  }
}

export default labels
