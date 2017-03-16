const React = require('react');
const ReactDOM = require('react-dom');

const ArticleList = require('./client/article_list');

function initArticleList() {
  ReactDOM.render(
    <ArticleList />,
    document.getElementById('article-list-area')
  )
}

module.exports = {
  initArticleList: initArticleList
}