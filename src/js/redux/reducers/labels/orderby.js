import { LABELS } from '../../action-types'

const orderby = (state = 'id', action) => {
  switch (action.type) {
    case LABELS.FETCH_LABEL_DATA:
      return action.orderby
    default:
      return state
  }
}

export default orderby
