import { CATEGORY_REFACT } from '$redux/action-types'
import { urlEncode } from '$utils'

export const articleOrderChange = (newOrder, update = false) => {
  return (dispatch, getState) => {
    var state = getState()
    if (update) {
      var fd = new FormData()
      fd.append('id', state.detail.id)
      fd.append('order', newOrder)
      var url = '/admin/datas/articles/order'
      return fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: fd,
      })
        .then(res => res.json())
        .then(res => {
          if (res.code !== 0) return
          dispatch(getCategoryTree())
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      var detail = Object.assign({}, state.detail)
      detail.suborder = newOrder
      dispatch({
        type: CATEGORY_REFACT.ARTICLE_ORDER_CHANGE,
        detail: detail,
      })
    }
  }
}

export const categoryExpandChange = id => ({
  type: CATEGORY_REFACT.CATEGORY_EXPAND_CHANGE,
  id: id,
})

export const categoryPrefaceChange = (id, isSet = true) => {
  return (dispatch, getState) => {
    var state = getState()
    var data = {
      category: state.category,
      preface: id,
      isSet: isSet,
    }
    var url = '/admin/datas/categories/preface?' + urlEncode(data)
    return fetch(url, { credentials: 'include' })
      .then(res => res.json())
      .then(res => {
        if (res.code !== 0) return
        dispatch(getCategoryTree())
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const getCategoryTree = () => {
  return (dispatch, getState) => {
    var state = getState()
    var cid = state.cid
    var params = { id: cid }
    var url = '/admin/datas/categories/tree?' + urlEncode(params)
    return fetch(url, { credentials: 'include' })
      .then(res => res.json())
      .then(res => {
        if (res.code !== 0) return
        var root = res.data
        var tid = state.category === -1 ? root.id : state.category
        dispatch({
          type: CATEGORY_REFACT.GET_CATEGORY_TREE,
          tree: root,
        })
        __getRefactDetail('dir', tid)
          .then(dt1 => {
            var detail = dt1.code === 0 ? dt1.data : {}
            dispatch({
              type: CATEGORY_REFACT.GET_REFACT_DETAIL,
              detail: detail,
              category: tid,
            })
          })
          .catch(err => {
            console.log(err)
          })
      })
  }
}

export const getRefactDetail = (type, id, cid) => {
  return _dispatch => {
    cid = type === 'dir' ? id : cid
    __getRefactDetail(type, id)
      .then(dt => {
        let detail = dt.code === 0 ? dt.data : {}
        let aid = type === 'art' && detail.id ? detail.id : -1
        _dispatch({
          type: CATEGORY_REFACT.GET_REFACT_DETAIL,
          detail: detail,
          category: cid,
          article: aid,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

function __getRefactDetail (type, id) {
  /* eslint-disable no-unused-vars */
  let params = {
    type: type,
    id: id,
  }
  let url = '/admin/datas/categories/refact/get?' + urlEncode(params)
  return fetch(url, { credentials: 'include' })
    .then(res => res.json())
    .then(res => {
      return res
    })
}
