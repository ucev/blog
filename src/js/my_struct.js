const React = require('react');
const ReactDOM = require('react-dom');

const Articles = require('./admin/react_articles.js');
const Categories = require('./admin/react_categories.js');
const CategoriesRefact = require('./admin/react_category_refact.js');
const Labels = require('./admin/react_labels.js');
const Photos = require('./admin/react_photos.js');

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