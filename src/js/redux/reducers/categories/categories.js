import { CATEGORIES } from '../../action-types'

const categories = (state = [], action) => {
  switch (action.type) {
    case CATEGORIES.CATEGORY_ORDER_CHANGE:
      var cats = [...state]
      for (var cat of cats) {
        if (cat.id === action.id) {
          cat.mainorder = order
          break
        }
      }
      return cats
    case CATEGORIES.FETCH_CATEGORY_DATA:
      return action.categories
    default:
      return state
  }
}

export default categories
