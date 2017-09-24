import { CATEGORIES } from '../../action-types'

/* eslint-disable no-unused-vars */
const addTitle = {
  add: '添加类别',
  modify: '修改类别'
}

export const addCategoryDivStateChange = (visible, type, id) => {
  return (dispatch, getState) => {
    var state = getState()
    type = type || state.addType
    var s = {
      type: CATEGORIES.ADD_CATEGORY_DIV_STATE_CHANGE,
      addVisible: visible,
      addType: type,
      modifyId: type === 'add' || !visible ? -1 : id
    }
    if (type === 'modify') {
      var cats = state.categories
      for (var c of cats) {
        if (c.id === id) {
          var d = {
            name: c.name,
            parent: c.parent,
            descp: c.descp
          }
          s.addData = d
        }
      }
    } else {
      s.addData = {}
    }
    dispatch(s)
  }
}

export const addCategoryConfirm = () => {
  return (dispatch, getState) => {
    var url
    var state = getState()
    var data = state.addData
    var fd = new FormData()
    for (var k in data) {
      fd.append(k, data[k])
    }
    if (state.addType == 'add') {
      url = '/admin/datas/categories/add'
    } else if (state.addType == 'modify') {
      url = '/admin/datas/categories/modify'
      fd.append('id', state.modifyId)
    }
    return fetch(url, {
      credentials: 'include',
      method: 'post',
      body: fd
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
      credentials: 'include',
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
        dispatch(fetchCategoryData())
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
  return (dispatch) => {
    var url = '/admin/datas/categories/modify'
    var fd = new FormData()
    fd.append('id', id)
    fd.append('order', order)
    return fetch(url, {
      credentials: 'include',
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
  return (dispatch) => {
    var url = '/admin/datas/categories/get'
    return fetch(url, {credentials: 'include'}).then(res => res.json())
      .then((res) => {
        if (res.code !== 0) return
        dispatch({
          type: CATEGORIES.FETCH_CATEGORY_DATA,
          categories: res.data
        })
      }).catch(err => {
        console.log(err)
      })
  }
}
