const React = require('react');
const ReactDOM = require('react-dom');

const ArticleList = require('./client/article_list');

function initArticleList() {
  ReactDOM.render(
    <ArticleList />,
    document.getElementById('articles-list-area')
  )
}

module.exports = {
  initArticleList: initArticleList
}