const React = require('react');
const ReactDOM = require('react-dom');
const moment = require('moment');

class SearchLabel extends React.Component {
  render() {
    var label = this.props.label;
    if (this.props.query && label.search(this.props.query) == -1) {
      return <li className = 'article-item-li-label-li'>{label}</li>;
    } else {
      return <li className = 'article-item-li-label-li article-item-li-label-li-selected'>{label}</li>;
    }
  }
}
class SearchLabels extends React.Component {
  render() {
    var labels = this.props.labels.map((label) => {
      if (label.trim() == '') {
        return;
      }
      return <SearchLabel label = {label} query = {this.props.query} />
    })
    return (
      <ul className = 'article-item-li-labels-ul'>
        {labels}
      </ul>
    )
  }
}
class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
    this.genTitle = this.genTitle.bind(this);
  }
  genTitle(id, title, query) {
    var searchExp = new RegExp(query, 'iu');
    var ele;
    var pos = title.search(searchExp);
    if (query== undefined || pos == -1) {
      ele = (
        <a href = {'/articles/view/' + id}>{title}</a>
      )
    } else {
      ele = (
        <a href = {'/articles/view/' + id}>
          {title.substr(0, pos)}
          <mark>{title.substr(pos, pos + query.length)}</mark>
          {title.substr(pos + query.length)}
        </a>
      )
    }
    return ele;
  }
  render() {
    var article = this.props.article;
    var title = this.genTitle(article.id, article.title, this.props.query);
    return (
      <li className = 'article-item-li' data-id = {article.id}>
        <h3 className = 'article-item-li-title'>
          {title}
          <SearchLabels labels = {article.label.split(',')} query = {this.props.query} />
        </h3>
        <div className = 'article-item-li-content'>{article.descp}</div>
        <div className = 'article-item-li-bottom-info'>
          <span className = 'article-item-li-pageview'>阅读量({article.pageview})</span>
          <span className = 'article-item-li-addtime'>{moment.unix(Number(article.modtime)).format('YYYY-MM-DD HH:mm:ss')}</span>
        </div>
      </li>
    )
  }
}

module.exports = ArticleItem;