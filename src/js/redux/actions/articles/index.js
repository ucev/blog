import { ARTICLES } from '$redux/action-types'
import { urlEncode, dispatchDebounce } from '$utils'

export const addArticle = () => {
  location.href = '/admin/articles/add'
}

export const modifyArticle = (id) => {
  location.href = `/admin/articles/modify?id=${id}`
}

export const articleStateChange = (id, type, isgroup = false) => {
  return (dispatch) => {
    var data = {
      id: id,
      state: type
    }
    var url = '/admin/datas/articles/state?' + urlEncode(data)
    return fetch(url, {credentials: 'include'}).then(res => res.json())
      .then(() => {
        if (isgroup) {
          return dispatch(fetchArticles())
        } else {
          return dispatch(fetchSingleArticle(id))
        }
      }).catch(err => {
        console.log(err)
      })
  }
}

export const articleGroupChange = (id, gid) => {
  return (dispatch, getState) => {
    var fd = new FormData()
    fd.append('id', id)
    fd.append('gid', gid)
    var url = '/admin/datas/articles/move'
    return fetch(url, {
      credentials: 'include',
      method: 'POST',
      body: fd
    }).then(res => res.json())
      .then((res) => {
        if (res.code != 0) return
        var state = getState()
        if (state.isgroup) {
          dispatch(fetchArticles()).then(() => {
            dispatch({
              type: ARTICLES.MOVE_CATEGORY_STATE,
              moveVisible: false,
              moveArticleId: -1,
              isgroup: false
            })
          })
        } else {
          dispatch(fetchSingleArticle(id)).then(() => {
            dispatch({
              type: ARTICLES.MOVE_CATEGORY_STATE,
              moveVisible: false,
              moveArticleId: -1
            })
          })
        }
      }).catch(err => {
        console.log(err)
      })
  }
}

export const checkStateChange = (id, checked) => ({
  type: ARTICLES.CHECK_STATE_CHANGE,
  id: id,
  checked: checked,
  //
  groupOpe: -1
})

export const allChecked = (checked) => {
  return (dispatch, getState) => {
    var state = getState()
    var articles = state.articles
    var ids = articles.map(article => article.id)
    dispatch({
      type: ARTICLES.CHECK_STATE_CHANGE,
      id: ids,
      checked: checked,
      groupOpe: -1
    })
  }
}

export const fetchSingleArticle = (id) => {
  return (dispatch) => {
    var data = {
      id: id
    }
    var url = '/admin/datas/articles/get?' + urlEncode(data)
    return fetch(url, {credentials: 'include'}).then(res => res.json())
      .then((res) => {
        if (res.code != 0) return
        var s = {
          type: ARTICLES.FETCH_SINGLE_ARTICLE,
          id: id,
          article: res.data
        }
        dispatch(s)
      }).catch(err => {
        console.log(err)
      })
  }
}

export const fetchArticles = dispatchDebounce((start, options) => {
  return (dispatch, getState) => {
    var state = getState()
    start = start || state.start
    var data = Object.assign({}, options || state.filters)
    data.start = start
    var etag = Date.now()
    var url = '/admin/datas/articles/get?' + urlEncode(data)
    return fetch(url, {credentials: 'include'}).then(res => res.json())
      .then((res) => {
        if (res.code !== 0) return
        state = getState()
        if (state.etag > etag) return
        res = res.data
        var s = {
          type: ARTICLES.FETCH_ARTICLES,
          articles: res.data,
          current: res.current,
          total: res.total,
          checkState: {},
          start: start,
          etag: etag
        }
        dispatch(s)
      }).catch((err) => {
        console.log(err)
      })
  }
}, 500)

export const fetchCategories = () => {
  return (dispatch) => {
    var url = '/admin/datas/categories/get'
    return fetch(url, {credentials: 'include'}).then(res => res.json())
      .then((res) => {
        if (res.code != 0) return
        dispatch({
          type: ARTICLES.FETCH_CATEGORIES,
          categories: res.data
        })
      }).catch((err) => {
        console.log(err)
      })
  }
}

export const handlePageChange = (start) => {
  return (dispatch) => {
    return dispatch(fetchArticles(start))
  }
}

export const handleFilterChange = (label, value) => {
  return (dispatch, getState) => {
    var state = getState()
    dispatch({
      type: ARTICLES.FILTER_OPTION_CHANGE,
      label: label,
      value: value
    })
    var s = state.filters
    s[label] = value
    dispatch(fetchArticles(0, s))
  }
}

export const handleDeleteArticle = (id) => ({
  type: ARTICLES.DELETE_ARTICLE_STATE,
  delVisible: true,
  delArticleId: id,
  isgroup: false
})

export const deleteArticleConfirm = () => {
  return (dispatch, getState) => {
    var state = getState()
    var fd = new FormData()
    fd.append('id', state.delArticleId)
    var url = '/admin/datas/articles/delete'
    return fetch(url, {
      credentials: 'include',
      method: 'POST',
      body: fd
    }).then(res => res.json())
      .then((res) => {
        if (res.code != 0) return
        dispatch({
          type: ARTICLES.DELETE_ARTICLE_STATE,
          delVisible: false,
          delArticleId: -1
        })
        dispatch(fetchArticles())
      }).catch(err => {
        console.log(err)
      })
  }
}

export const deleteArticleCancel = () => ({
  type: ARTICLES.DELETE_ARTICLE_STATE,
  delVisible: false
})

export const filterOptionChange = (title, value) => {
  if (title == 'group-ope') {
    return groupOpeChange(title, value)
  } else if (title != '') {
    return handleFilterChange(title, value)
  }
}

export const groupOpeChange = (title, value) => {
  return (dispatch, getState) => {
    var checkState = getState().checkState
    var ids = []
    for (let key in checkState) {
      if (checkState[key]) ids.push(key)
    }
    ids = ids.join(',')
    switch (value) {
    case 'on':
    case 'off':
      return dispatch(articleStateChange(ids, value, true))
    case 'move':
      return dispatch({
        type: ARTICLES.MOVE_CATEGORY_STATE,
        moveArticleId: ids,
        isgroup: true,
        moveVisible: true
      })
    case 'del':
      return dispatch({
        type: ARTICLES.DELETE_ARTICLE_STATE,
        delArticleId: ids,
        isgroup: true,
        delVisible: true
      })
    default:
      break
    }
  }
}

// category
export const moveCategoryConfirm = (gid) => {
  return (dispatch, getState) => {
    var state = getState()
    var moveArticleId = state.moveArticleId
    dispatch(articleGroupChange(moveArticleId, gid))
    dispatch(moveCategoryCancel())
  }
}

export const moveCategoryCancel = () => ({
  type: ARTICLES.MOVE_CATEGORY_STATE,
  moveVisible: false
})

export const handleMoveCategory = (id) => ({
  type: ARTICLES.MOVE_CATEGORY_STATE,
  moveArticleId: id,
  isgroup: false,
  moveVisible: true
})
