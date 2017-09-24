import { LABELS } from '$redux/action-types'

const total = (state = 0, action) => {
  switch (action.type) {
  case LABELS.FETCH_LABEL_DATA:
    return action.total
  default:
    return state
  }
}

export default total
