export const urlEncode = (obj) => {
  if (typeof obj !== 'object') return ''
  var arr = Object.getOwnPropertyNames(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]))
  return arr.join('&')
}
