import { CATEGORIES } from '../../action-types'

const addTitle = {
  add: '添加类别',
  modify: '修改类别'
}

export const addCategoryDivStateChange = (visible, type, data = {}) => {
  return (dispatch, getState) => {
    type = type || getState().addType
    dispatch({
      type: CATEGORIES.ADD_CATEGORY_DIV_STATE_CHANGE,
      addVisible: visible,
      addType: type,
      addData: data
    })
  }
}

export const addCategoryConfirm = (data) => {
  return (dispatch, getState) => {
    var url;
    var state = getState()
    if (state.addType == 'add') {
      url = '/admin/datas/categories/add';
    } else if (state.addType == 'modify') {
      url = '/admin/datas/categories/modify';
      data.id = this.getState("addData").id;
    }
    return fetch(url, {
               credentials: 'include',
               method: 'post',
               body: data
             }).then(res => res.json())
             .then((res) => {
               if (res.code !== 0) return
               dispatch(addCategoryDivStateChange(false))
               dispatch(fetchCategoryData())
             }).catch(err => {
               console.log(err)
             })
  }
}

export const addCategoryCancel = () => {
  return addCategoryDivStateChange(false)
}

export const addCategoryValueChange = (data) => ({
  type: CATEGORIES.ADD_CATEGORY_VALUE_CHANGE,
  addData: data
})

export const deleteCategoryConfirm = () => {
  return (dispatch, getState) => {
    var url = '/admin/datas/categories/delete'
    var state = getState()
    var fd = new FormData()
    fd.append('id', state.delCategoryId)
    return fetch(url, {
               credentials: 'includes',
               method: 'post',
               body: fd
              }).then(res => res.json())
              .then((res) => {
                if (res.code !== 0) return
                dispatch({
                  type: CATEGORIES.DELETE_CATEGORY_STATE,
                  delVisible: false,
                  delCategoryId: -1
                })
              }).catch(err => {
                console.log(err)
              })
  }
}

export const deleteCategoryCancel = () => ({
  type: CATEGORIES.DELETE_CATEGORY_STATE,
  delVisible: false
})

export const deleteCategoryHandle = (id) => ({
  type: CATEGORIES.DELETE_CATEGORY_STATE,
  delVisible: true,
  delCategoryId: id
})

export const handleCategoryOrderChange = (id, order) => ({
  type: CATEGORIES.CATEGORY_ORDER_CHANGE,
  id: id,
  order: order
})

export const updateCategoryOrder = (id, order) => {
  return (dispatch, getState) => {
    var url = '/admin/datas/categories/modify'
    var fd = new FormData()
    fd.append('id', id)
    fd.append('order', order)
    return fetch(url, {
               credentials: 'includes',
               method: 'post',
               body: fd
             }).then(res => res.json())
             .then((res) => {
               if (res.code !== 0) return
               dispatch(fetchCategoryData())
             })
  }
}

export const fetchCategoryData = () => {
  return (dispatch, getState) => {
    var url = '/admin/datas/categories/get'
    return fetch(url, {credentials: 'include'}).then(res => res.json())
             .then((res) => {
               if (res.code !== 0) return
               //localStorage.setItem('categories', JSON.stringify(dt.data))
               dispatch({
                 type: CATEGORIES.FETCH_CATEGORY_DATA,
                 categories: res.data
               })
             }).catch(err => {
               console.log(err)
             })
  }
}
