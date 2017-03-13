const React = require('react');
const ReactDOM = require('react-dom');

const Articles = require('./react_articles.js');
const Categories = require('./react_categories.js');
const CategoriesRefact = require('./react_category_refact.js');
const Labels = require('./react_labels.js');
const Photos = require('./react_photos.js');

function adminArticlesInit() {
  ReactDOM.render(
    <Articles />,
    document.getElementById('table-div')
  );
}

function adminCategoriesInit() {
  ReactDOM.render(
    <Categories />,
    document.getElementById('table-div')
  );
}

function adminCategoryRefactInit() {
  ReactDOM.render(
    <CategoriesRefact />,
    document.getElementById('reform-area')
  );
}

function adminLabelsInit() {
  ReactDOM.render(
    <Labels />,
    document.getElementById('table-div')
  );
}

function adminPhotosInit() {
  ReactDOM.render(
    <Photos />,
    document.getElementById('photos-target-div')
  );
}

module.exports = {
  articles: adminArticlesInit,
  categories: adminCategoriesInit,
  categoriesRefact: adminCategoryRefactInit,
  labels: adminLabelsInit,
  photos: adminPhotosInit
}