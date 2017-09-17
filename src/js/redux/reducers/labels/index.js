import { combineReducers } from 'redux'

import current from './current'
import labels from './labels'
import orderby from './orderby'
import orderDirect from './order-direct'
import start from './start'
import total from './total'

const labelsApp = combineReducers({
  current,
  labels,
  orderby,
  orderDirect,
  start,
  total
})

export default labelsApp
