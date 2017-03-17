const React = require('react');
const ReactDOM = require('react-dom');

// 这个扩展是从网上复制过来的
Date.prototype.format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

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
    var searchExp = new RegExp(query, 'i');
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
      <li className = 'article-item-li' date-id = {article.id}>
        <h3 className = 'article-item-li-title'>
          {title}
          <SearchLabels labels = {article.label.split(',')} query = {this.props.query} />
        </h3>
        <div className = 'article-item-li-content'>{article.descp}</div>
        <div className = 'article-item-li-bottom-info'>
          <span className = 'article-item-li-pageview'>阅读量({article.pageview})</span>
          <span className = 'article-item-li-addtime'>{new Date(Number(article.modtime) * 1000).format('yyyy-MM-dd hh:mm:ss')}</span>
        </div>
      </li>
    )
  }
}

module.exports = ArticleItem;