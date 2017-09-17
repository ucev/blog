import { LABELS } from '../../action-types'
import { urlEncode } from '../../utils'

const __fetchData = (dispatch, getState) => {
  return (orderby, orderDirect, start) => {
    var params = {
      orderby: orderby,
      asc: orderDirect,
      start: start
    }
    var url = '/admin/datas/labels/get?' + urlEncode(params)
    return fetch(url, {credentials: 'include'}).then(res => res.json())
             .then((res) => {
               res = res.data
                var data = {
                  type: LABELS.FETCH_LABEL_DATA,
                  current: +res.current,
                  total: +res.total,
                  orderby: orderby,
                  orderDirect: orderDirect,
                  labels: res.data,
                  start: start
                }
                dispatch(data)
             }).catch((err) => {})
  }
}

export const fetchLabelData = (orderby, orderDirect) => {
  return (dispatch, getState) => {
    var state = getState()
    __fetchData(dispatch, getState)(orderby || state.orderby, orderDirect || state.orderDirect, state.start)
  }
}

export const orderChange = (orderby, orderDirect) => {
  return (dispatch, getState) => {
    var state = getState()
    return __fetchData(dispatch, getState)(orderby, orderDirect, state.start)
  }
}

export const pageChange = (page) => {
  return (dispatch, getState) => {
    var state = getState()
    return __fetchData(dispatch, getState)(state.orderby, state.orderDirect, page)
  }
}
