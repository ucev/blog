const React = require('react');
const ReactDOM = require('react-dom');
const AppContainer = require('react-hot-loader').AppContainer;

const ArticleList = require('./client/article_list');
function initArticleList() {
  ReactDOM.render(
    <AppContainer>
      <ArticleList />
    </AppContainer>,
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
    <AppContainer>
      <ArticleList isSearch = {true} query = {params} />
    </AppContainer>,
    document.getElementById('articles-list-area')
  )
}

module.exports = {
  initArticleList: initArticleList,
  initArticleListSearch: initArticleListSearch
}