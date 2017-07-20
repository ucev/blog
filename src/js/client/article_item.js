const React = require('react');
const ReactDOM = require('react-dom');
const moment = require('moment');

class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var article = this.props.article;
    return (
      <li className = 'article-item-li' data-id = {article.id}>
        <h3 className = 'article-item-li-title'>
          <a href = {'/articles/view/' + article.id}>{article.title}</a>
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
