import { combineReducers } from 'redux'

import article from './article'
import category from './category'
import cid from './cid'
import cstate from './cstate'
import detail from './detail'
import tree from './tree'

const categoryRefactApp = combineReducers({
  article,
  category,
  cid,
  cstate,
  detail,
  tree
})

export default categoryRefactApp
