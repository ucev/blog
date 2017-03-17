const React = require('react');
const ReactDOM = require('react-dom');

const ArticleItem = require('./article_item');
const ArticleItemSearch = require('./article_item_search');

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var articles = this.props.articles.map((article) => {
      if (this.props.isSearch) {
        return <ArticleItemSearch key = {article.id} article = {article} query = {this.props.query} />;
      } else {
        return <ArticleItem key = {article.id} article = {article} />;
      }
    })
    return (
      <ul id = 'articles-list-ul'>
        {articles}
      </ul>
    )
  }
}

class QueryDataDiv extends React.Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }
  loadMore() {
    console.log('more1');
    this.props.more();
  }
  render() {
    var visible = this.props.visible;
    var styles = {};
    if (!visible) {
      styles['display'] = 'none';
    }
    return (
      <div>
        <div className = 'load-more-div' style = {styles} onClick = {this.loadMore}>继续加载</div>
      </div>
    )
  }
}

class ArticleDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      current: 0,
      articles: []
    }
    this.getArticleData = this.getArticleData.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.getArticleData();
  }
  loadMore() {
    console.log('more2');
    this.getArticleData(false);
  }
  /**
   * 
   * @param {*} replace 
   * replace -- where replace `articles` state
   */
  getArticleData(replace = false) {
    var that = this;
    var url;
    if (this.props.isSearch  === true) {
      url = `/articles/data/articles/search?start=${that.state.current}&args=${that.props.query}`;
    } else {
      url = '/articles/data/articles/get?start=' + that.state.current;
    }
    console.log(url);
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      success: function(dt) {
        if (dt.code == 0) {
          var data = dt.data;
          console.log('total: ' + data.total + ', current: ' + data.current);
          var articles = that.state.articles;
          if (replace === true) {
            articles = data.data;
          } else {
            articles = articles.concat(data.data);
          }
          that.setState({
            total: Number(data.total),
            current: Number(data.current) + 1,
            articles: articles
          })
        }
      }
    })
  }
  render() {
    var addMoreVisible = this.state.total > this.state.current;
    var articleList;
    return (
      <div>
        <ArticleList key = {1} articles = {this.state.articles} isSearch = {this.props.isSearch} query = {this.props.query} />
        <QueryDataDiv key = 'more' visible = {addMoreVisible} more = {this.loadMore} />
      </div>
    )
  }
}

module.exports = ArticleDiv;