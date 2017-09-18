import React from 'react'
import ReactDOM from 'react-dom'

import ArticleList from './client/article-list'

function initArticleList() {
  ReactDOM.render(
    <ArticleList />,
    document.getElementById('articles-list-area')
  )
}

function initArticleListSearch() {
  var query = decodeURIComponent(location.search.substr(1));
  query = query.split('&');
  var params = '';
  for(var q of query) {
    if (q.startsWith('args')) {
      params = q.substr(q.indexOf('=') + 1);
    }
  }
  ReactDOM.render(
    <ArticleList isSearch = {true} query = {params} />,
    document.getElementById('articles-list-area')
  )
}

module.exports = {
  initArticleList: initArticleList,
  initArticleListSearch: initArticleListSearch
}