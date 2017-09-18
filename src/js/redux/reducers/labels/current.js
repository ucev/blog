import { LABELS } from '../../action-types'

const current = (state = 0, action) => {
  switch (action.type) {
    case LABELS.FETCH_LABEL_DATA:
      return action.current
    default:
      return state
  }
}

export default current
