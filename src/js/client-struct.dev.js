import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import ArticleList from './client/article-list'

export function initArticleList() {
  ReactDOM.render(
    <AppContainer>
      <ArticleList />
    </AppContainer>,
    document.getElementById('articles-list-area')
  )
}

export function initArticleListSearch() {
  var query = decodeURIComponent(location.search.substr(1));
  query = query.split('&');
  var params = '';
  for(var q of query) {
    if (q.startsWith('args')) {
      params = q.substr(q.indexOf('=') + 1);
    }
  }
  ReactDOM.render(
    <AppContainer>
      <ArticleList isSearch = {true} query = {params} />
    </AppContainer>,
    document.getElementById('articles-list-area')
  )
}
