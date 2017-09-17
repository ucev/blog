const React = require('react');
const ReactDOM = require('react-dom');
const AppContainer = require('react-hot-loader').AppContainer;

const Articles = require('./admin/react_articles.js');
const Categories = require('./admin/react_categories.js');
const CategoriesRefact = require('./admin/react_category_refact.js');
const Labels = require('./admin/react_labels.js');
const Photos = require('./admin/react_photos.js');

const render = (Component, ele) => {
  ReactDOM.render(
    <Component />,
    document.getElementById(ele)
  )
};

function adminArticlesInit() {
  render(Articles, 'table-div');
}

function adminCategoriesInit() {
  render(Categories, 'table-div');
}

function adminCategoryRefactInit() {
  render(CategoriesRefact, 'reform-area');
}

function adminLabelsInit() {
  render(Labels, 'table-div');
}

function adminPhotosInit() {
  render(Photos, 'photos-target-div');
}

module.exports = {
  articles: adminArticlesInit,
  categories: adminCategoriesInit,
  categoriesRefact: adminCategoryRefactInit,
  labels: adminLabelsInit,
  photos: adminPhotosInit
}