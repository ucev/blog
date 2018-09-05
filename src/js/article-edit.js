/**
 * 因为引入simplemde, markdown以及其他一些插件
 * 把它拆分出来
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import articleEditApp from '$reducers/article-edit'

import ArticleEdit from './admin/article-edit'
import { urlParamParser } from '$utils'

import '$css/article_edit.scss'

export function init({ ele, type }) {
  var params = urlParamParser()
  var id = params.id
  var store = createStore(articleEditApp, applyMiddleware(thunkMiddleware))
  ReactDOM.render(
    <Provider store={store}>
      <ArticleEdit type={type} id={id} />
    </Provider>,
    ele
  )
}
