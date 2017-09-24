import { LABELS } from '$redux/action-types'

const start = (state = 0, action) => {
  switch (action.type) {
  case LABELS.FETCH_LABEL_DATA:
    return action.start
  default:
    return state
  }
}

export default start
