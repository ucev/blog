import { CATEGORIES } from '$redux/action-types'

const categories = (state = [], action) => {
  var cats, cat
  switch (action.type) {
    case CATEGORIES.CATEGORY_ORDER_CHANGE:
      cats = [...state]
      for (cat of cats) {
        if (cat.id === action.id) {
          cat.mainorder = action.order
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
