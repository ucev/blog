import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import articlesApp from './redux/reducers/articles'
import categoriesApp from './redux/reducers/categories'
import categoryRefactApp from './redux/reducers/category-refact'
import labelsApp from './redux/reducers/labels'
import photosApp from './redux/reducers/photos'

import Articles from './admin/articles'
import Categories from './admin/categories'
import CategoryRefact from './admin/category-refact'
import Labels from './admin/labels'
import Photos from './admin/photos'

const render = (Component, Reducer, ele) => {
  var store = createStore(
    Reducer,
    applyMiddleware(
      thunkMiddleware
    )
  )
  ReactDOM.render(
    <Provider store = { store }>
      <Component />
    </Provider>,
    document.getElementById(ele)
  )
  /**
   * <AppContainer></AppContainer>
   */
};

function adminArticlesInit () {
  render(Articles, articlesApp, 'table-div')
}

function adminCategoriesInit () {
  render(Categories, categoriesApp, 'table-div');
}

function adminCategoryRefactInit () {
  render(CategoryRefact, categoryRefactApp, 'reform-area')
}

function adminLabelsInit () {
  render(Labels, labelsApp, 'table-div')
}

function adminPhotosInit () {
  render(Photos, photosApp, 'photos-target-div')
}

module.exports = {
  articles: adminArticlesInit,
  categories: adminCategoriesInit,
  categoriesRefact: adminCategoryRefactInit,
  labels: adminLabelsInit,
  photos: adminPhotosInit
}
