export const urlEncode = obj => {
  if (typeof obj !== 'object') return ''
  var arr = Object.getOwnPropertyNames(obj).map(
    k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
  )
  return arr.join('&')
}

export const urlParamParser = () => {
  var query = location.search.substring(1)
  var parts = query.split('&')
  var params = {}
  parts.forEach(part => {
    var p = part.split('=')
    params[p[0]] = p[1]
  })
  return params
}

export const debounce = function (func, delay) {
  var timeout
  return function () {
    var args = arguments
    var that = this
    if (timeout) {
      clearTimeout(timeout)
      timeout = undefined
    }
    timeout = setTimeout(function () {
      func.apply(that, args)
    }, delay)
  }
}

export const dispatchDebounce = function (func, delay) {
  var timeout
  return function () {
    var args = arguments
    var that = this
    return dispatch => {
      if (timeout) {
        clearTimeout(timeout)
        timeout = undefined
      }
      timeout = setTimeout(function () {
        dispatch(func.apply(that, args))
      }, delay)
    }
  }
}
