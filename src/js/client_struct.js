const React = require('react');
const ReactDOM = require('react-dom');

const ArticleList = require('./client/article_list');

function initArticleList() {
  ReactDOM.render(
    <ArticleList />,
    document.getElementById('articles-list-area')
  )
}

function initArticleListSearch() {
  var query = location.search.substr(1);
  query = query.split('&');
  var params = '';
  for(var q of query) {
    if (q.startsWith('args')) {
      params = q.substr(q.indexOf('=') + 1);
    }
  }
  console.log(params);
  ReactDOM.render(
    <ArticleList isSearch = {true} query = {params} />,
    document.getElementById('articles-list-area')
  )
}

module.exports = {
  initArticleList: initArticleList,
  initArticleListSearch: initArticleListSearch
}