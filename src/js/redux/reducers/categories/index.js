import { combineReducers } from 'redux'

import addData from './add-data'
import addType from './add-type'
import addVisible from './add-visible'
import categories from './categories'
import delCategoryId from './del-category-id'
import delVisible from './del-visible'
import modifyId from './modify-id'

var categoriesApp = combineReducers({
  addData,
  addType,
  addVisible,
  categories,
  delCategoryId,
  delVisible,
  modifyId,
})

export default categoriesApp
