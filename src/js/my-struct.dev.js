const React = require('react');
const ReactDOM = require('react-dom');
const AppContainer = require('react-hot-loader').AppContainer;
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import articlesApp from './redux/reducers/articles'
import categoriesApp from './redux/reducers/categories'
import categoryRefactApp from './redux/reducers/category-refact'
import labelsApp from './redux/reducers/labels'
import photosApp from './redux/reducers/photos'

const Articles = require('./admin/articles')
const Categories = require('./admin/categories')
const CategoryRefact = require('./admin/category-refact')
const Labels = require('./admin/labels')
const Photos = require('./admin/photos');

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

function adminArticlesInit() {
  render(Articles, articlesApp, 'table-div')
}

function adminCategoriesInit() {
  render(Categories, categoriesApp, 'table-div');
}

function adminCategoryRefactInit() {
  render(CategoryRefact, categoryRefactApp, 'reform-area')
}

function adminLabelsInit() {
  render(Labels, labelsApp, 'table-div')
}

function adminPhotosInit() {
  render(Photos, photosApp, 'photos-target-div')
}

module.exports = {
  articles: adminArticlesInit,
  categories: adminCategoriesInit,
  categoriesRefact: adminCategoryRefactInit,
  labels: adminLabelsInit,
  photos: adminPhotosInit
}