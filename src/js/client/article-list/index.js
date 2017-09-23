import React from 'react'
import ReactDOM from 'react-dom'

import ArticleList from './article-list'
import QueryDataDiv from './query-data-div'

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
  }
  loadMore() {
    this.getArticleData(false);
  }
  componentDidMount() {
    this.getArticleData()
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
    fetch(url, {credentials: 'include'}).then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.code !== 0) return
        var data = res.data;
        var articles = that.state.articles;
        if (replace === true) {
          articles = data.data;
        } else {
          articles = articles.concat(data.data);
        }
        console.log(articles)
        that.setState({
          total: Number(data.total),
          current: Number(data.current) + 1,
          articles: articles
        })
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

export default ArticleDiv
