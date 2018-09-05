import { ARTICLE_EDIT } from '$redux/action-types'
import { urlEncode } from '$utils'
import MarkdownIt from 'markdown-it'

var markdownIt = new MarkdownIt()

// 取 content 中第一个段落(<p></p>)中的内容
function getContentDescription(content) {
  if (!content) return ''
  content = markdownIt.render(content)
  var p = content.match(/(<p[\s\S]*?>)([\s\S]*?)(<\/p>)/)
  return p ? p[2] : ''
}

export const addLabel = label => ({
  type: ARTICLE_EDIT.ADD_LABEL,
  label: label.split(','),
})

export const articleChange = article => ({
  type: ARTICLE_EDIT.ARTICLE_CURRENT,
  article: article,
})

export const deleteLabel = label => ({
  type: ARTICLE_EDIT.DELETE_LABEL,
  label: label,
})

// ?
export const fetchGroupPhotos = gid => {
  return (dispatch, getState) => {
    var state = getState()
    var params = {
      gid: gid || state.gid,
    }
    var url = '/admin/datas/photos/get?' + urlEncode(params)
    return fetch(url, { credentials: 'include' })
      .then(res => res.json())
      .then(res => {
        if (res.code !== 0) return
        var photos = res.data
        dispatch({
          type: ARTICLE_EDIT.PHOTOS,
          photos: photos,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const fetchPhotoGroups = () => {
  return dispatch => {
    var url = '/admin/datas/photogroup/get'
    return fetch(url, { credentials: 'include' })
      .then(res => res.json())
      .then(res => {
        if (res.code !== 0) return
        var groups = res.data
        dispatch({
          type: ARTICLE_EDIT.PHOTO_GROUPS,
          groups: groups,
        })
      })
  }
}

export const getImageUrl = name => {
  return `/images/blog/${name}`
}

export const init = (type, id) => {
  return dispatch => {
    dispatch({
      type: ARTICLE_EDIT.INIT,
      data: {
        type,
        id,
      },
    })
    var url = '/admin/datas/labels/getnames'
    fetch(url, { credentials: 'include' })
      .then(res => res.json())
      .then(res => {
        if (res.code !== 0) return
        dispatch({
          type: ARTICLE_EDIT.LABEL_EXIST,
          labels: res.data,
        })
      })
    if (type == 'modify' && id !== undefined) {
      url = '/admin/datas/articles/get?' + urlEncode({ id: id, modify: 1 })
      fetch(url, { credentials: 'include' })
        .then(res => res.json())
        .then(res => {
          if (res.code !== 0) return
          dispatch({
            type: ARTICLE_EDIT.ARTICLE_INITIAL,
            article: res.data.content,
          })
          dispatch({
            type: ARTICLE_EDIT.ADD_LABEL,
            label: res.data.label.split(','),
          })
        })
    }
  }
}

// 这种方法不完美
export const labelTypingChange = label => ({
  type: ARTICLE_EDIT.LABEL_TYPING,
  label: label,
})

export const photoGroupChange = gid => {
  return dispatch => {
    dispatch({
      type: ARTICLE_EDIT.PHOTO_GROUP_CHANGE,
      gid: gid,
    })
    dispatch(fetchGroupPhotos(gid))
  }
}

export const photoVisibleStateChange = visible => ({
  type: ARTICLE_EDIT.PHOTO_VISIBLE_STATE,
  visible: visible,
})

var isPublishing = false
export const publishArticle = () => {
  return (dispatch, getState) => {
    if (isPublishing) {
      return
    }
    isPublishing = true
    var state = getState()
    var article = state.articleCurrent
    var label = state.labelCurrent
    var type = state.type
    var url =
      type.type == 'add' ? '/admin/articles/add' : '/admin/articles/modify'
    var fd = new FormData()
    fd.append('md', article)
    fd.append('descp', getContentDescription(article))
    fd.append('label', label.join(','))
    if (type.type == 'modify') {
      fd.append('id', type.id)
    }
    return fetch(url, {
      credentials: 'include',
      method: 'POST',
      body: fd,
    })
      .then(res => res.json())
      .then(res => {
        isPublishing = false
        if (res.code === 0) {
          location.href = '/admin/articles'
        } else {
          alert(res.msg)
        }
      })
      .catch(err => {
        console.log(err)
        isPublishing = false
      })
  }
}

// 上传图片 ?
export const photoUpload = file => {
  return (dispatch, getState) => {
    var state = getState()
    var fd = new FormData()
    fd.append('file', file)
    fd.append('gid', state.gid)
    var url = '/admin/datas/photos/add'
    return fetch(url, {
      credentials: 'include',
      method: 'POST',
      body: fd,
    })
      .then(res => res.json())
      .then(res => {
        if (res.code !== 0) return
        dispatch(fetchPhotoGroups())
        dispatch(fetchGroupPhotos())
      })
      .catch(err => {
        console.log(err)
      })
  }
}

//
export const photoUploadReturnName = file => {
  var fd = new FormData()
  fd.append('file', file)
  fd.append('gid', -1)
  var url = '/admin/datas/photos/add'
  return fetch(url, {
    credentials: 'include',
    method: 'POST',
    body: fd,
  })
    .then(res => res.json())
    .then(res => {
      if (res.code !== 0) {
        return Promise.reject()
      }
      return Promise.resolve(res.data)
    })
    .catch(err => {
      console.log(err)
    })
}

export const insertUrlVisibleStateChange = visible => ({
  type: ARTICLE_EDIT.URL_VISIBLE_STATE,
  visible: visible,
})
