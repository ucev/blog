import { LABELS } from '$redux/action-types'

const orderDirect = (state = 'asc', action) => {
  switch (action.type) {
    case LABELS.FETCH_LABEL_DATA:
      return action.orderDirect
    default:
      return state
  }
}

export default orderDirect
