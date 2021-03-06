import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import articlesApp from '$reducers/articles'
import categoriesApp from '$reducers/categories'
import categoryRefactApp from '$reducers/category-refact'
import labelsApp from '$reducers/labels'
import photosApp from '$reducers/photos'

import Articles from './admin/articles'
import Categories from './admin/categories'
import CategoryRefact from './admin/category-refact'
import Labels from './admin/labels'
import Photos from './admin/photos'

import '$css/admin.scss'

const render = (Component, Reducer, ele) => {
  var store = createStore(Reducer, applyMiddleware(thunkMiddleware))
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById(ele)
  )
  /**
   * <AppContainer></AppContainer>
   */
}

export function articles () {
  render(Articles, articlesApp, 'table-div')
}

export function categories () {
  render(Categories, categoriesApp, 'table-div')
}

export function categoriesRefact () {
  render(CategoryRefact, categoryRefactApp, 'reform-area')
}

export function labels () {
  render(Labels, labelsApp, 'table-div')
}

export function photos () {
  render(Photos, photosApp, 'photos-target-div')
}
