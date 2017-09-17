import { combineReducers } from 'redux'

import articles from './articles'
import categories from './categories'
import checkState from './check-state'
import current from './current'
import delArticleId from './del-article-id'
import delVisible from './del-visible'
import isgroup from './isgroup'
import moveArticleId from './move-article-id'
import moveVisible from './move-visible'
import start from './start'
import total from './total'

const articlesApp = combineReducers({
  articles,
  categories,
  checkState,
  current,
  delArticleId,
  delVisible,
  isgroup,
  moveArticleId,
  moveVisible,
  start,
  total
})

export default articlesApp
